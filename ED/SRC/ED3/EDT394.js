/*
DATE	SA		PRG		MGR_NO			DESC
1111207	Joe		Joe		1110828			新增程式
1111220	Joe		Joe		序65、68、80	郵務需求調整，調整寄件類別為逐筆受文者紀錄、新增紀錄註記欄位
1120329	Joe		Joe		1110828			新增匯入功能
1120504 Joe		Joe     序280           調整其他受文者寄件類別檢核
1120602	Joe		Joe		--				新增輸入機關名稱後帶出下拉選單的功能
1120915 Joe		Joe		1120709			弱掃修正XSS
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
var uSelectSectOuId = document.all.txSelectOuId.value;
var uPostTypeSelectIndex = "";
var uRegisterSelectIndex = "";
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	if(document.all.dg1)
		document.all.divSelect.className = "DgSelectToolBar";
	document.all.H_IssueWord.value = "";

	if(document.all.SaveMsg)
		alert(document.all.SaveMsg.value);

	if(uSelectSectOuId.length > 2)
	{
		for(var i = 0 ; i < document.all.dlSect.options.length ; i++)
		{
			if(document.all.dlSect.options[i].value == uSelectSectOuId)
			{
				document.all.dlSect.selectedIndex = i;
				dlSectOnChang();
				break;
			}
		}
	}

	uPostTypeSelectIndex = document.all.dlPostType.selectedIndex;

	if(document.all.txIssueNo.value != "")
		GetPostIssue(true);

	jf_ShowDetail();
    cbIssueTypeOnclick();
	if(document.all.dg1 && document.all.H_AddControl.value != "")
	{
		var tableHeight = $("#dg1").height();
		document.getElementById("Dg1Div").scrollTop = tableHeight;
		//1120915  Joe		1120709			弱掃修正XSS
		// $('#' + document.all.H_AddControl.value).focus();
		$('#' + htmlencode(document.all.H_AddControl.value)).focus();
		document.all.H_AddControl.value = "";
	}
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
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
		case "btAdd":
			Page_BlockSubmit = false;
            if (jf_CheckBeforAdd())
            {
                IsServerHandling = true;
				document.all.H_AddControl.value = "dlIssueOrg";
                __doPostBack("btAdd", 0);
            }
			else
				Page_BlockSubmit = true;
            break;
		case "btAdd2":
			//1111220	Joe		序65	修正新增受文者檢核寄件類別
			/*
			if (document.all.txNoneDocIssue.value == "")
			{
				Page_BlockSubmit = true;
				alert('非公文欄位不可為空');
				$('#txNoneDocIssue').focus();
			}
			else if (document.all.H_Dept_Value.value  == ""){
				Page_BlockSubmit = true;
				alert('非公文單位選單不可為空');
			}
				*/
			if (jf_CheckBeforAdd2())
			{
				Page_BlockSubmit = false;
				IsServerHandling = true;
				document.all.H_AddControl.value = "txNoneDocIssue";
				__doPostBack("btAdd2", 0);
			}
			break;
		//1120329	Joe		1110828		新增匯入功能
		case "btAdd3":
			Page_BlockSubmit = true;
			document.all.txFile.click();
			break;
		case "btDgDelete":
			Page_BlockSubmit = false;
			if (fnCheckBeforDgDelete())
            {
                IsServerHandling = true;
                __doPostBack("btDgDelete", 0);
            }
			else
				Page_BlockSubmit = true;
			break;
		case "btDgMoveUp":
			Page_BlockSubmit = false;
			if (fnCheckBeforDgMove("1"))
            {
                IsServerHandling = true;
                __doPostBack("btDgMoveUp", 0);
            }
			else
				Page_BlockSubmit = true;
			break;
		case "btDgMoveDown":
			Page_BlockSubmit = false;
			if (fnCheckBeforDgMove("2"))
            {
                IsServerHandling = true;
                __doPostBack("btDgMoveDown", 0);
            }
			else
				Page_BlockSubmit = true;
			break;
		case "btDgMoveTo":
			Page_BlockSubmit = false;
			if (fnCheckBeforDgMove("3"))
            {
                IsServerHandling = true;
                __doPostBack("btDgMoveTo", 0);
            }
			else
				Page_BlockSubmit = true;
			break;
		case "btEdit":
			Page_BlockSubmit = true;
			jf_EditBulkNo();
			break;
		case "btCleanEdit":
			Page_BlockSubmit = true;
			CleanEdit();
			break;
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbdgSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbdgSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbdgSelect");
			break;
		case "btBulkClear":
			Page_BlockSubmit = true;
			jf_SelectClearBulkNo("dg1", "_cbdgSelect", "_txdgBulkNo");
			break;
		case "btCombine":
			Page_BlockSubmit = true;
			if (jf_CheckBeforeCombine()) {
				jf_CombineData();
			}
			break;
		//1120602	Joe		--		新增WEM010C1查詢功能
		case "btSearchOrg":
			Page_BlockSubmit=true;
			var strUrl = "";
			var strOrgID  = document.all["OrgNo"].value;
			strUrl = "../../WEDEP/WEM010C1.aspx?rtnObj=lbReturnValue&OrgID="+strOrgID+"&K1=WEM010";
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 600 );
		break;
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
		case "btOpen":
			Page_BlockSubmit = false;
			if(document.all.txPostSeq.value=="")
			{
				alert('郵寄批號不可為空');
				Page_BlockSubmit = true;
			}
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			if(jf_CheckBeforSave())
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
			Page_BlockSubmit = true;
			var _href = window.location.href;
			var idxLastSlash = _href.lastIndexOf('/');
			var WebPage = _href.substr(0, idxLastSlash+1) + "EDT394C1.aspx?SAMLart=" + jf_GetArtifact();
			jf_OpenChildWin(WebPage, "EDT394C1", 700, 500 );
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;

	if (jf_GetActionMode()==LayoutModeNew && document.all.txPostSeq.value != "")
	{
		alert("新增模式儲存時不需輸入郵寄編號，系統會自動編制");
		document.all.txPostSeq.value = "";
		return false;
	}
	if (jf_CheckBeforSave())
		bRtnbool = true;

	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";

	var strPostNo = document.all.dlPostType.options[document.all.dlPostType.selectedIndex].value;
	if(strPostNo == "")
		strErrMsg += "請選擇郵寄方式\n";

	var strPostDate = document.all.txPostDate.value;
	if(strPostDate == "")
		strErrMsg += "請輸入郵寄日期\n";

	if(!document.all.dg1)
		strErrMsg += "請先加入郵寄資料後再進行儲存功能\n";
	else
	{
		var strBulkNoList = "";
		var strBulkNoMsg = "";
		var strBuffer = "";
		var iSeq = 1;

		for (var i = 2; i < document.all.dg1.rows.length + 1; i++) {

			var strBulkNo = document.all["dg1__ctl" + i + "_txdgBulkNo"].value;
			if (strBulkNo == ""){
				strBulkNoMsg += strBuffer + iSeq;
				strBuffer = "、";
			}
			else{
				if(strBulkNoList.indexOf(strBulkNo) != -1){
					strErrMsg += "序" + iSeq + "掛號號碼" + strBulkNo + "重覆。\n";
				}
				else
					strBulkNoList += strBuffer + strBulkNo;
			}
			iSeq++;
		}
	}
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	else if(strBulkNoMsg != "")
	{
		bRtnbool = window.confirm("以下資料未輸入掛號號碼，是否繼續儲存？序" + strBulkNoMsg);
	}

	return bRtnbool;
}

function jf_CheckBeforAdd()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (!document.all.cbAddAllIssue.checked)
    {
		//1111220	Joe		自測修正
    	//if (document.all.dg1) {
    	if (document.all.dg1 && document.all["dlIssueOrg"].options.length > 0) {
			var strIssueNo = document.all["dlIssueOrg"].options[document.all["dlIssueOrg"].selectedIndex].value.split('|')[3] + document.all["dlIssueOrg"].options[document.all["dlIssueOrg"].selectedIndex].value.split('|')[5];
			strErrMsg += jf_checkDgData(strIssueNo, document.all["txIssueOrgName"].value, document.all["txIssueOrgNo"].value);
    		if (strErrMsg != "")
    			strErrMsg += "\n";
    	}
	}
	if (document.all["txIssueNo"].value == "") {
		strErrMsg += "郵寄資料請輸入發文號\n";
		$('#txIssueNo').focus();
	}
	if (!document.all.cbAddAllIssue.checked) {
		if (document.all["txIssueOrgName"].value == "") {
			strErrMsg += "受文者名稱欄位不可空白\n";
			$('#txIssueOrgName').focus();
		}
	}
	//1111220	Joe		序65	修正新增受文者檢核寄件類別--S
	if(document.all["dlPostType_MOCS"].options.length > 1)
	{
		if (document.all["dlPostType_MOCS"].options[document.all["dlPostType_MOCS"].selectedIndex].value == "") {
			strErrMsg += "寄件類別不可為空\n";
		}
		else if (document.all["dlPostType_MOCS"].options[document.all["dlPostType_MOCS"].selectedIndex].value.indexOf('A') == -1) {
			strErrMsg += "公文受文者寄件類別僅可選取A類\n";
		}
	}
	//1111220	Joe		序65	修正新增受文者檢核寄件類別--E
			
	if (strErrMsg != "") {
		bRtnbool = false;
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
	}
    return bRtnbool;
}

//1111220	Joe		序65	修正新增非公文受文者檢核寄件類別--S
function jf_CheckBeforAdd2()
{
    var bRtnbool = true;
	var strErrMsg = "";

	if (document.all.txNoneDocIssue.value == "") {
		strErrMsg += "非公文欄位不可為空\n";
		$('#txNoneDocIssue').focus();
	}
	else if (document.all.H_Dept_Value.value == "") {
		strErrMsg += "非公文單位選單不可為空\n";
	}
	if(document.all["dlPostType_MOCS"].options.length > 1)
	{
        //1120504   Joe     序280    調整其他受文者寄件類別檢核
	    var PostTypeMOCS = document.all["dlPostType_MOCS"].options[document.all["dlPostType_MOCS"].selectedIndex].value;
	    if (PostTypeMOCS == "") {
	        strErrMsg += "寄件類別不可為空\n";
	    }
	    else if (PostTypeMOCS.indexOf('A') == 0 && PostTypeMOCS != "A09" && PostTypeMOCS != "A10" && PostTypeMOCS != "A11") {
	        strErrMsg += "其他郵寄受文者寄件類別僅可選取A09、A10、A11、B、C、D類\n";
	    }
        /*
	    if (document.all["dlPostType_MOCS"].options[document.all["dlPostType_MOCS"].selectedIndex].value == "") {
			strErrMsg += "寄件類別不可為空\n";
		}
		else if (document.all["dlPostType_MOCS"].options[document.all["dlPostType_MOCS"].selectedIndex].value.indexOf('A') == 0) {
			strErrMsg += "其他郵寄受文者寄件類別僅可選取B、C、D類\n";
		}
        */
	}
			
	if (strErrMsg != "") {
		bRtnbool = false;
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
	}
    return bRtnbool;
}
//1111220	Joe		序65	修正新增非公文受文者檢核寄件類別--E
function jf_EditBulkNo()
{
	var strErrMsg = "";
	var strCheckNull = "";
	//檢核使用空間不可皆為空白
	for (var i = 1 ; i <= 6; i++) {
		strCheckNull += document.all["txRegister" + i].value;
	}
	if (strCheckNull.trim() == "")
	{
		strErrMsg += "掛號號碼使用空間不可皆為空白";
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
		return;
	}

    //補0
	for (var i = 1 ; i <= 6; i++) {
	    if (document.all["txRegister" + i].value.trim() != "")
	        document.all["txRegister" + i].value = jf_PADL(document.all["txRegister" + i].value, 6, '0');
	}

	//檢核後段區間不可比前段區間小
	if (document.all["txRegister3"].value < document.all["txRegister2"].value && document.all["txRegister3"].value != "")
		strErrMsg += "掛號號碼使用空間第二區間不可小於第一區間\n";
	if (document.all["txRegister5"].value < document.all["txRegister2"].value && document.all["txRegister5"].value != "")
		strErrMsg += "掛號號碼使用空間第三區間不可小於第一區間\n";
	if (document.all["txRegister5"].value < document.all["txRegister4"].value && document.all["txRegister5"].value != "")
		strErrMsg += "掛號號碼使用空間第三區間不可小於第二區間";

	//若通過檢核
	if (strErrMsg != "") {
		bRtnbool = false;
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
	}
	else
	{
		//紀錄目前DataGrid行數
		var iRow = 2;
		//紀錄DataGrid總行數
		var dgRowTotal = document.all.dg1.rows.length;
		//新增至DG
		jf_InsertBulkNo(document.all["txRegister1"].value, document.all["txRegister2"].value, iRow, dgRowTotal);
		jf_InsertBulkNo(document.all["txRegister3"].value, document.all["txRegister4"].value, iRow, dgRowTotal);
		jf_InsertBulkNo(document.all["txRegister5"].value, document.all["txRegister6"].value, iRow, dgRowTotal);
	}
}
function jf_CompareBulkNo(argId1, argId2)
{
	if (document.all[argId1].value != "" && document.all[argId2].value == "")
		document.all[argId2].value = document.all[argId1].value;
	else if (document.all[argId1].value == "" && document.all[argId2].value != "")
		document.all[argId1].value = document.all[argId2].value;
	else if(document.all[argId1].value > document.all[argId2].value)
	{
		var temp = "";
		temp = document.all[argId1].value;
		document.all[argId1].value = document.all[argId2].value;
		document.all[argId2].value = temp;
	}
}
function jf_InsertBulkNo(nNumS, nNumE, iRow, dgRowTotal)
{
	while (iRow <= dgRowTotal)
	{
		if ((nNumS > nNumE && nNumE != "") || nNumS == "")
			break;
		if (document.all["dg1__ctl" + iRow + "_txdgBulkNo"].value.trim() != "")
			iRow++;
		else {
			document.all["dg1__ctl" + iRow + "_txdgBulkNo"].value = nNumS;
			nNumS = jf_PADL((parseInt(nNumS, 10) + 1).toString(), 6, '0');
			iRow++;
		}
	}
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	if(argCallerId == "EDT394C1")
	{
		document.all.txPostSeq.value = document.all["lbReturnValue"].options[0].value;
		Page_BlockSubmit = false;
		jf_ToolBarSubmit("btOpen");
	}
	if (argCallerId == "EDT394C2") {
		jf_ShowDetail();
	}
	//1120602	Joe		--		新增WEM010C1查詢功能
	if (argCallerId == "WEM010C1") {
		
		var RtnStr = document.all["lbReturnValue"].options[0].value;
		var RtnArr = RtnStr.split('^');
		if(RtnStr.length >= 2){
			document.all.txNoneDocIssue.value = RtnArr[1];
		}
	}

	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			document.all[argObj].focus();
		}
	}
}

function FocusAt(argObj)
{
	if(!argObj.disabled)
		argObj.focus();
}

function fnCheckFull()
{
	if(event.keyCode==9)
		return;
	if(event.keyCode==16)
		return;

	if(document.activeElement.value==null)
		return;
		
	var len1=document.activeElement.value.length;
	var len2=document.activeElement.maxLength;
	var currentMatch=null;

	if(len1 == len2)
	{
		if (document.activeElement.tabIndex>-1)
		{
			for(i=0;i< document.activeElement.form.elements.length;i++)
			{
				if(currentMatch == null)
				{
					if(document.activeElement.form.elements[i].tabIndex > document.activeElement.tabIndex)
					{
						if(document.activeElement.form.elements[i].style.visibility == "hidden")continue;
						if(document.activeElement.form.elements[i].className=="hidden")continue;
						if(document.activeElement.form.elements[i].style.display == "none")continue;
						if(document.activeElement.form.elements[i].className=="hide")continue;
						if(document.activeElement.form.elements[i].disabled == true)continue;
						currentMatch = document.activeElement.form.elements[i];
					}
				}
				else
				{
					if((document.activeElement.form.elements[i].tabIndex < currentMatch.tabIndex)&&
						(document.activeElement.form.elements[i].tabIndex > document.activeElement.tabIndex))
					{
						if(document.activeElement.form.elements[i].style.visibility == "hidden")continue;
						if(document.activeElement.form.elements[i].className=="hidden")continue;
						if(document.activeElement.form.elements[i].style.display == "none")continue;
						if(document.activeElement.form.elements[i].className=="hide")continue;
						if(document.activeElement.form.elements[i].disabled == true)continue;
						currentMatch = document.activeElement.form.elements[i];
					}
				}
			}
		}

		if(currentMatch !=null)
			currentMatch.focus();
	}

}

var strDocNoLastKey = '-1';

function InsertIssueNoSeq(event)
{
	var strCurrentId = event.target.id;

    if (event.keyCode == "229")
    {
        if (/[^0-9a-zA-Z-]/g.test(document.all[strCurrentId].value))
            document.all[strCurrentId].value = document.all[strCurrentId].value.replace(/[^0-9a-zA-Z-]/g, '');

        if (event.code == 'Minus' && strCurrentId != 'txRegNo')
            strDocNoLastKey = '-';

        if (event.code.indexOf('Digit') > -1 || event.code.indexOf('Key') > -1)
            strDocNoLastKey = event.code.slice(-1);
    }
}

function CheckIssueNoSeq()
{
    var strCurrentId = event.target.id;
    if (/[^0-9a-zA-Z-]/g.test(document.all[strCurrentId].value))
        document.all[strCurrentId].value = document.all[strCurrentId].value.replace(/[^0-9a-zA-Z-]/g, '');
    if (strCurrentId == 'txIssueNo')
        document.all[strCurrentId].value = document.all[strCurrentId].value.replace('-', '');

    if (strDocNoLastKey != '-1')
        document.all[strCurrentId].value += strDocNoLastKey;

    strDocNoLastKey = '-1';
	fnCheckFull();
}

//清空選單
function fnClearDropDownList(obj)
{
    while (obj.options.length > 0)
        obj.options.remove(0);
}

function GetPostIssue(argInit)
{
	if (document.all.txIssueNo.value == "")
	{
		fnClearDropDownList(document.all.dlIssueOrg);
		document.all.txIssueOrgName.value = "";
		return;
	}

	if (jf_Trim(document.all.txIssueNo.value).length != 10)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公文文號" + jf_Trim(document.all.txIssueNo.value) + "長度必須為" + 10 + "碼"])), "");
		FocusAt(document.all.txIssueNo);
		fnClearDropDownList(document.all.dlIssueOrg);
		document.all.txIssueOrgName.value = "";
		return;
	}
	if(document.all["cbAddAllIssue"].checked){
		document.all.H_dlIssueOrgSelectIndex.value = 0;
		document.all.txIssueOrgName.value = "";
	}

	var PostIssueObj = ED3.EDT394.GetPostIssue(jf_GetArtifact(), document.all.OrgNo.value, document.all.txIssueNo.value).value;
	if(PostIssueObj)
	{
		fnClearDropDownList(document.all.dlIssueOrg);
		document.all.txIssueOrgName.value = "";

		if(PostIssueObj.bSuccess)
		{
			if (PostIssueObj.OrgName.length > 0)
			{
				document.all.dlIssueOrg.options.add(new Option("", ""));
				for (var i = 0; i < PostIssueObj.OrgName.length; i++)
				{
					var OrgName = PostIssueObj.OrgName[i];
					var OrgId = PostIssueObj.OrgId[i];
					var PostCode = PostIssueObj.PostCode[i];
					var Address = PostIssueObj.Address[i];
					var IssueNo = PostIssueObj.IssueNo[i];
					var IssueWord = PostIssueObj.IssueWord[i];
					var SubNo = PostIssueObj.SubNo[i];
					var OuId = PostIssueObj.OuId;
					document.all.txOuId.value = OuId;
					var dlValue = OrgId + "|" + PostCode + "|" + Address + "|" + IssueNo + "|" + IssueWord + "|" + SubNo + "|" + OrgName;
					document.all.dlIssueOrg.options.add(new Option(OrgName, dlValue));
				}
				document.all.txIssueOuId.value = PostIssueObj.OuId;

				if (argInit)
				{
					document.all.dlIssueOrg.selectedIndex = document.all.H_dlIssueOrgSelectIndex.value;
					document.all.txIssueOrgName.value = document.all.dlIssueOrg.selectedOptions[0].text;
				}
			}
			else
			{
				document.all.txIssueNo.value = "";
				document.all.txIssueOuId.value = "";
				alert(PostIssueObj.ErrMsg);
			}
		}
		else
		{
			document.all.txIssueNo.value = "";
			document.all.txIssueOuId.value = "";
			alert(PostIssueObj.ErrMsg);
		}
	}
}
function dlIssueOrgNoChange()
{
	if(document.all.dlIssueOrg.selectedIndex == -1)
		return;

	var OrgName = document.all.dlIssueOrg.options[document.all.dlIssueOrg.selectedIndex].text;
	var dlValue = document.all.dlIssueOrg.options[document.all.dlIssueOrg.selectedIndex].value;
	if (dlValue != "")
	{
	    var OrgId = dlValue.split('|')[0];
	    var PostCode = dlValue.split('|')[1];
	    var Address = dlValue.split('|')[2];
	    var IssueNo = dlValue.split('|')[3];
	    var IssueWord = dlValue.split('|')[4];
	    var SubNo = dlValue.split('|')[5];
	    var OrgName = dlValue.split('|')[6];

	    document.all.txIssueOrgNo.value = OrgId;
	    document.all.txIssueOrgName.value = OrgName;
	    document.all.txPostalCode.value = PostCode;
	    document.all.txAddress.value = Address;
	    document.all.H_IssueNo.value = IssueNo;
	    document.all.H_IssueWord.value = IssueWord;
	    document.all.H_SubNo.value = SubNo;
	}
	else
	{
		document.all.txIssueOrgNo.value = "";
	    document.all.txIssueOrgName.value = "";
	    document.all.txPostalCode.value = "";
	    document.all.txAddress.value = "";
	    document.all.H_IssueNo.value = "";
	    document.all.H_IssueWord.value = "";
	    document.all.H_SubNo.value = "";
	}

	document.all.H_dlIssueOrgSelectIndex.value = document.all.dlIssueOrg.selectedIndex;
}

function fnPostTypeChange(argType)
{
	var strPostNo = document.all.dlPostType.options[document.all.dlPostType.selectedIndex].value;
	if(strPostNo == "")
	{
		uPostTypeSelectIndex = 0;
		return;
	}

	if(document.all.dg1)
	{
		if(!window.confirm("有已輸入完成的郵寄資料，切換時會依所選資料重新依重量計算對應郵資，請問是否切換")){
			document.all.dlPostType.selectedIndex = uPostTypeSelectIndex;
			return;
		}
	}

	var PostInfoObj = ED3.EDT394.GetPostInfo(jf_GetArtifact(), document.all.OrgNo.value, strPostNo).value;
	if(PostInfoObj)
	{
		if(PostInfoObj.bSuccess)
		{
			uPostTypeSelectIndex = document.all.dlPostType.selectedIndex;

			if(document.all.dg1)
			{
				for (var i = 2; i < document.all.dg1.rows.length+1; i++)
				{
					var WeightItem = "dg1__ctl" + i + "_txdgPostWeight";
					var CostItem = "dg1__ctl" + i + "_txdgPostCost";
					if(!getCost(WeightItem, CostItem))
						break;
				}
			}
		}
		else
		{
			alert(PostInfoObj.ErrMsg);
			document.all.dlPostType.selectedIndex = uPostTypeSelectIndex;
		}
	}

}

function getCost(argWeightObj, argCostObj)
{
	if(!document.all[argWeightObj] || !document.all[argCostObj])
		return false;
	
	if (document.all[argWeightObj].value == "")
		return false;
	else
	{
		var iWeight = parseFloat(document.all[argWeightObj].value);
		if( 0 >= iWeight)
		{
			alert("重量欄位請輸入正數");
			return false;
		}
	}

	var strWeight = document.all[argWeightObj].value;
	var strPostNo = document.all.dlPostType.options[document.all.dlPostType.selectedIndex].value;
	if(strPostNo == "")
		return false;

	var CostObj = ED3.EDT394.GetWeightCost(jf_GetArtifact(), document.all.OrgNo.value, strPostNo, strWeight).value;
	if (CostObj)
	{
		if(CostObj.bSuccess)
		{
			document.all[argCostObj].value = CostObj.strCost;
			return true;
		}
		else
		{
			alert(CostObj.ErrMsg);
			return false;
		}
	}
	else
		return false;
}

function fnGetDgPostCost(argRowNum)
{
	var RowNum = argRowNum;
	if(!RowNum)
		RowNum = getRowIndex();

	var WeightItem = "dg1__ctl" + RowNum + "_txdgPostWeight";
	var CostItem = "dg1__ctl" + RowNum + "_txdgPostCost";
	getCost(WeightItem, CostItem);
}

//取得在Datagrid中動作時之Control Row index
function getRowIndex()
{
	var xObjectName = event.srcElement.id;
	return xObjectName.substring(8,xObjectName.indexOf("_",8));   
}

function fnCheckCost(argRowNum)
{
	var RowNum = argRowNum;
	if(!RowNum)
		RowNum = getRowIndex();

	var CostItem = "dg1__ctl" + RowNum + "_txdgPostCost";
	var strCost = document.all[CostItem].value;

	if (isNaN(strCost))
	{
		alert("郵資欄位請輸入數字");
		$('#' + CostItem + '').focus();
	}
	else
	{
		if(strCost.lastIndexOf('.') != -1 && strCost.lastIndexOf('.') != strCost.length-2)
		{
			alert("郵資欄位僅能輸入至小數點後一位");
			$('#' + CostItem + '').focus();
		}
	}
	return true;
}

function fnCheckBeforDgDelete()
{
	var bHasChecked = false;
	for (var i = 2; i < document.all.dg1.rows.length+1; i++)
	{
		var CheckItem = "dg1__ctl" + i + "_cbdgSelect";
		if(document.all[CheckItem].checked)
		{
			bHasChecked = true;
			break;
		}
	}

	if(!bHasChecked)
		alert("請勾選預刪除的項目");

	return bHasChecked;
}

function fnCheckBeforDgMove(argType)
{
	var bSelect = false;
	var iChecked = 0;
	var iDgSelect = 0;
	for (var i = 2; i < document.all.dg1.rows.length+1; i++)
	{
		var CheckItem = "dg1__ctl" + i + "_cbdgSelect";
		if(document.all[CheckItem].checked)
		{
			bSelect = true;
			iChecked++;
			iDgSelect = i;
		}
	}
	if(!bSelect)
	{
		alert("請勾選要異動的項目");
		return false;
	}

	if(iChecked > 1)
	{
		alert("僅能勾選1個項目進行移動");
		return false;
	}

	if(argType == "1" && iDgSelect == 2)
	{
		alert('已至最上筆');
		return false;
	}
	else if(argType == "2" && iDgSelect == document.all.dg1.rows.length)
	{
		alert('已至最下筆');
		return false;
	}
	else if(argType == "3")
	{
		var iMoveTo = parseInt(document.all.txDgMoveTo.value, 10);
		document.all.txDgMoveTo.value = iMoveTo.toString();

		if(iMoveTo == 0 || iMoveTo > document.all.dg1.rows.length-1)
		{
			alert('超出可移動範圍');
			return false;
		}
		if(iDgSelect == iMoveTo+1)
		{
			alert('預計移動位置與目前位置相同');
			return false;
		}
	}
	return true;
}
function CleanEdit()
{
	document.all.txRegister1.value = "";
	document.all.txRegister2.value = "";
	document.all.txRegister3.value = "";
	document.all.txRegister4.value = "";
	document.all.txRegister5.value = "";
	document.all.txRegister6.value = "";
}

//清除選取
function jf_SelectClearBulkNo(argTableName, argCheckBoxName, argBulkNo) {
	if (document.all[argTableName] == null)
		return;

	var len = document.all[argTableName].rows.length + 1;
	for (i = 2; i < len; i++) {
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		if (obj.checked)
			document.all[argTableName + "__ctl" + i + argBulkNo].value = "";
	}
}
function jf_CheckBeforeCombine()
{
	var strErrMsg = "";
	var bRtnbool = true;
	if (document.all.txCombineSeq.value == "")
	{
		strErrMsg += "使用併封時，序號欄位不可為空。\n";
		$('#txCombineSeq').focus();
	}
	else if (document.all.txCombineSeq.value > document.all.dg1.rows.length - 1 || document.all.txCombineSeq.value < 1)
	{
		strErrMsg += "不可輸入不存在於表格內的序號。\n";
		$('#txCombineSeq').focus();
	}

	if (document.all.txIssueNo.value == "") {
		strErrMsg += "公文號不可為空。\n";
		$('#txIssueNo').focus();
	}
	else if (document.all.dlIssueOrg.options.selectedIndex <= 0)
	{
		strErrMsg += "請選取受文者。\n";
		$('#dlIssueOrg').focus();
	}

	if (strErrMsg != "") {
		bRtnbool = false;
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
	}

	return bRtnbool;
	
}

function jf_CombineData() {

	var iCombineSeq = parseInt(document.all.txCombineSeq.value) + 1;
	var strIssueNo = document.all["dlIssueOrg"].options[document.all["dlIssueOrg"].selectedIndex].value.split('|')[3] + document.all["dlIssueOrg"].options[document.all["dlIssueOrg"].selectedIndex].value.split('|')[5];
	var strErrMsg = jf_checkDgData(strIssueNo, document.all["txIssueOrgName"].value, document.all["txIssueOrgNo"].value);
	if (strErrMsg != "")
		strErrMsg += "\n";
	if (document.all["txIssueOrgName"].value == "")
		strErrMsg += "受文者名稱欄位不可空白";
	
	if (strErrMsg != "") {
		alert(strErrMsg);
	}
	else {
		var newData = strIssueNo + "、" + document.all["txIssueOrgName"].value + "、" + document.all["txIssueOrgNo"].value;
		var strBuffer = "";
		if (document.all["dg1__ctl" + iCombineSeq + "_txdgCombineData"].value != "")
			strBuffer = "|";
		document.all["dg1__ctl" + iCombineSeq + "_txdgCombineData"].value += strBuffer + newData;
		document.all["dg1__ctl" + iCombineSeq + "_btDeatil"].className = "";
		document.all["dg1__ctl" + iCombineSeq + "_btDeatil"].onclick = function () { jf_detail(iCombineSeq); };

		document.all["txIssueOrgName"].value = "";
		document.all["dlIssueOrg"].selectedIndex = 0;
	}
}

function jf_detail(argRow) {
	jf_ShowModal("EDT394C2.aspx?" + jf_GetArtifact() + "&Row=" + argRow, "800", "600");
}

function jf_ShowDetail() {
	if (document.all.dg1)
	{
		for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++) {
			if (document.all["dg1__ctl" + iRow + "_txdgCombineData"].value != "")
			{
				let iSeq = iRow;
				document.all["dg1__ctl" + iRow + "_btDeatil"].className = "";
				document.all["dg1__ctl" + iRow + "_btDeatil"].onclick = function () { jf_detail(iSeq); };
			}
			else
				document.all["dg1__ctl" + iRow + "_btDeatil"].className = "hide";
		}
	}
}

//依文號、受文者名稱、受文者代碼
function jf_checkDgData(argIssuNo, argIssueOrgUsername, argIssueOrgNo) {

	var strErrMsg = "";

	for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++) {
		var newData = argIssuNo + "、" + argIssueOrgUsername + "、" + argIssueOrgNo;
		var DgData = "";
		DgData = document.all["dg1__ctl" + iRow + "_txdgIssueNo"].value + "、" + document.all["dg1__ctl" + iRow + "_lbdgOrgName"].textContent + "、" + document.all["dg1__ctl" + iRow + "_txdgOrgId"].value;
		if (DgData == newData) {
			strErrMsg = '已有此受文者資料';
			break;
		}
		else if (document.all["dg1__ctl" + iRow + "_txdgCombineData"].value.indexOf(newData) != -1) {
			strErrMsg = '此受文者已併封至序' + (iRow - 1) + '。';
			break;
		}
	}

	return strErrMsg;
}

function cbIssueTypeOnclick() {
	if (document.all["cbAddAllIssue"].checked)
	{
		document.all["dlIssueOrg"].selectedIndex = -1;
		document.all["dlIssueOrg"].disabled = true;
		document.all["txIssueOrgName"].value = "";
	}
	else{
		document.all["dlIssueOrg"].disabled = false;
	}
	GetPostIssue(false);
}
function dlDeptOnChange() {
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
	{
		//檢查值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
		}
	}
}

//1120329	Joe		1110828		新增匯入功能
function txFileOnChange() {
	if (document.all.txFile.value != "" && !IsServerHandling)
	{
		IsServerHandling = true;
		Page_BlockSubmit = false;
		jf_ToolBarSubmit('btImport');
    }
}

//1120602	Joe		--		新增輸入機關名稱後帶出下拉選單的功能
SetAutoOrgMenu(document.all.txNoneDocIssue, document.all.DivOrgMenu1);
function SetAutoOrgMenu(argOrgNameId, argDivMenuId) {
	var searchTimeout;
	$(argOrgNameId).on("input", function () {
		if ($(this).prop('comStart')) return;	//中文輸入未完成時，不做查詢
		if ($(this).val() == "" || $(this).val().length < 3)
			return;
		clearTimeout(searchTimeout);
		var that = this;
		searchTimeout = setTimeout(function () {
			var params = new SOAPClientParameters();
			params.add('argOrgNo', document.all.OrgNo.value);
			params.add('argQueryString', $(argOrgNameId).val());
			params.add('argOwner', document.all.OrgNo.value);
			var GetDicInfoWS = document.all.H_Wed010C1Path.value + "weorginfo.asmx";
			SOAPClient.invokeJSON(GetDicInfoWS, "GetDictInfo", params, true,
				function (r) {
					if (!$(argOrgNameId).is(":focus"))
						return;

					var availabelTags = new Array();
					var strTemp = $(argOrgNameId).val();
					for (var vl in r.value) {
						var vlObj = r.value[vl];
						if ($.type(vlObj) == "array") {
							for (var i = 0, o; o = vlObj[i]; i++) {
								availabelTags.push(o.v);
							}
						}
					}
					$(argOrgNameId).autocomplete({
						source: availabelTags,
						appendTo: argDivMenuId,
						select: function (event, ui) {
							if (ui.item.value.lastIndexOf("（") != -1)
								ui.item.value = ui.item.value.substr(0, ui.item.value.lastIndexOf("（"));
							else
								ui.item.value = ui.item.value;
						},
						open: function (event, ui) {
							$(argDivMenuId.firstElementChild).css('width', '20em');
							$('.ui-menu-item-wrapper').css('overflow', 'hidden');
						}
					}).autocomplete("search", strTemp);
				}
			)
		}, 300);	//TimeOut時間
	}).on('compositionstart', function () {
		$(this).prop('comStart', true);
		console.log('中文輸入，start');
	}).on('compositionend', function () {
		$(this).prop('comStart', false);
		console.log('中文輸入，end');
		$(this).trigger("input");
	});
}


//1120915  Joe		1120709			弱掃修正XSS
function htmlencode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}
