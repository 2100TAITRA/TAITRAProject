/*
DATE	SA		PRG		MGR_NO		DESC
1111207	David	David	1110898		新增程式
1120210	David	David	-------		(需求序10、彙整表序115)支援開啟DOCVIEW檢視
1120214	David	David	-------		(需求序41、彙整表序135)新增「全部」選項，不需區分資料夾，該選項僅能進行分辦/分文傳送
1130308	David	David	1130018		支援開啟ODI260
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	cbSelectOnClick();

	//調整傳送選項顯示，若原先選取隱藏選項，則調整為預設值
	//1120214 David 新增「全部」選項，不需區分資料夾，該選項僅能進行分辦/分文傳送
	if (document.all.ddlSubFolder.value == "全部") {
		document.all.dTRTransferDeptOri.className = 'hide';
		document.all.dTRTransferRcv.className = 'hide';
		document.all.rbTransferDeptOther.checked = true;
	}
	else if (document.all.ddlSubFolder.value == "主辦待分辦") {
		document.all.dTRTransferDeptOri.className = 'hide';
		document.all.dTRTransferRcv.className = 'dTR';
		if (document.all.rbTransferDeptOri.checked)
			document.all.rbTransferDeptOther.checked = true;
	}
	else if (document.all.ddlSubFolder.value == "會辦待分辦" || document.all.ddlSubFolder.value == "分會待分辦") {
		document.all.dTRTransferRcv.className = 'hide';
		document.all.dTRTransferDeptOri.className = 'dTR';
		if (document.all.rbTransferRcv.checked)
			document.all.rbTransferDeptOther.checked = true;
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	if(IsServerHandling)
	   return;

	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSubFolder":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btTransfer":
			Page_BlockSubmit = true;
			if(CheckBeforeTransfer())
			{
				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			cbSelectOnClick();
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			cbSelectOnClick();
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			cbSelectOnClick();
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function cbSelectOnClick() {
	if (document.all['dg1'])
	{
		var iCnt = 0;
		for (var i = 2; i <= document.all['dg1'].rows.length; i++)
			if (document.all["dg1__ctl" + i + "_cbSelect"].checked == true)
				iCnt++

		document.all.CheckSendCount.textContent = iCnt;
	}
}

function SelectDgFromDocNo() {
	var bSet = false;

	if (document.all.txDocNo2.value == "")
		return;

	for (var i = 2; i <= document.all['dg1'].rows.length; i++) {
		if (document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent == document.all.txDocNo2.value) {
			document.all["dg1__ctl" + i + "_cbSelect"].checked = true;
			bSet = true;
			break;
        }
	}

	if (!bSet)
		alert('查無符合文號：' + document.all.txDocNo2.value);

	document.all.txDocNo2.value = '';
	cbSelectOnClick();
}

function GetTodolist() {
	Page_BlockSubmit = false;
	jf_ToolBarSubmit("btSubFolder");
}


function dlSectOnChange() {
	var str = $('#dlSect option:selected').val();//使用者點選選單，選到的是哪個index值
	var dlUser = document.all["dlUser"];
	document.all["h_SectInfo"].value = str + "|" + $('#dlSect option:selected').text();//將科別放入隱藏欄位
	document.all["h_UserInfo"].value = "";
	fnClearDropDownList(dlUser);
	document.all.UserList.value = "";
	if (document.all["dlSect"].selectedIndex > 0)//index有可能是0"空白"的情況
	{
		document.all["dlUser"].className = "";
		var Uservalue = ED2.EDT272_MOCS.GetUser(document.all["SsoArtifact"].value, str).value;
		dlUser.options.add(new Option("", ""));//DropDownList新增一個空白
		if (Uservalue.length > 0) {
			for (var i = 0; i < Uservalue.length; i++) {
				var strUser = Uservalue[i];
				dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
				document.all.UserList.value += strUser + ";"
			}
		}
		else//無人員清空下拉選單
		{
			fnClearDropDownList(dlUser);
		}
	}
	else//有二級單位選單，選擇空白時，應帶出一級單位所有人員
	{
		fnClearDropDownList(dlUser);
		dlUser.options.add(new Option("", ""));//DropDownList新增一個空白
		//1120327 David 修正傳入單位代碼錯誤問題
		//var Uservalue = ED2.EDT272_MOCS.GetUser(document.all["SsoArtifact"].value, document.all["h_DeptInfo"].value).value;
		var Uservalue = ED2.EDT272_MOCS.GetUser(document.all["SsoArtifact"].value, $('#dlDept option:selected').val()).value;
		if (Uservalue.length > 0) {
			for (var i = 0; i < Uservalue.length; i++) {
				var strUser = Uservalue[i];
				dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
				document.all.UserList.value += strUser + ";"
			}
		}
	}
}
function dlUserOnChange() {
	document.all["h_UserInfo"].value = $('#dlUser option:selected').val() + "|" + $('#dlUser option:selected').text();//將帳號資訊放入隱藏欄位
}

function fnClearDropDownList(obj)//專用呼叫清空
{
	while (obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
		obj.options.remove(0);
}

function CheckBeforeTransfer()
{
	if(document.all.CheckSendCount.textContent != "0")
	{
		if($('#rbTransferDeptOther')[0].checked)
		{
			if($('#h_SectInfo').val() == "" && $('#h_UserInfo').val() == "")
			{
				alert("請選擇傳送對象單位或人員");
				return false;
			}
			if($('#dlSect')[0].disabled && $('#h_UserInfo').val() == "")
			{
				alert("請選擇傳送人員");
				return false;
			}
		}
		else if($('#rbTransferRcv')[0].checked)
		{
			let arrErrDoc = [];
			for (var i = 2; i <= document.all.dg1.rows.length; i++)
			{
				let arrErr = [];
				let strDocNo = document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent;

				if(!document.all["dg1__ctl" + i + "_cbSelect"].checked)
					continue;

				let strNewByOu = document.all["dg1__ctl" + i + "_hNewByOu"].value;
				if (strNewByOu == "Y" && strCloseType != "2")
					arrErr.push("創稿公文不可退回總收");

				if(arrErr.length > 0)
				{
					let strDocErr = "文號[" + strDocNo + "]" + arrErr.join("、");
					arrErrDoc.push(strDocErr)
				}
			}

			if(arrErrDoc.length > 0)
			{
				alert(arrErrDoc.join("\n"));
				return false;
			}
		}
	}
	else
	{
		alert("請先勾選要傳送的公文");
		return false;
	}

	return true;
}

//1120210 David 新增開啟DocView功能
function ViewPaper(argOrgNo,argDocNo,argSignType)
{
	try
	{
		var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
		unvSrc = unvSrc.replace('#artifact#',$('#SsoArtifact').val());
		unvSrc = unvSrc.replace('#DocNo#',argDocNo);
		unvSrc = unvSrc.replace(/#SourceOrgNo#/g,argOrgNo);
		var objViewDoc = {
			UNVObj: JSON.parse(unvSrc),
			docInfoPage: "AKI802",
			openDocModule: 'AOL',
			signType: argSignType,
			readOnlyMode: false,
			disableSave: true
		};
		var $docId = jf_GetSessionID() + "_" + (+new Date());
		localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
		var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + $('#SsoArtifact').val() + "&DocId=" + $docId;
		jf_OpenChildWin(unvUrl, "AKI802ViewDoc");
	} catch (e) {
		alert('開啟失敗');
	}
}

//1130308 David 1130018 支援開啟ODI260
function OpenODI260(argOrgNo, argDocNo)
{
    var url = location.origin + "/ODDEP/ODI260.aspx?pDocNo=" + argDocNo + "&SOURCE_ORGNO=" + argOrgNo + "&SAMLart=" + jf_GetArtifact();
    jf_OpenChildWin(url, "ODI260");
}
