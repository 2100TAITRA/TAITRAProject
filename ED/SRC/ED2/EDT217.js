/*
DATE	SA		PRG		MGR_NO			DESC
1061016	David	David	1060748			將成大預排流程設定作業改為共通版使用
1061106	David	David	1060748			問題修正
1061130	David	David	-------			修正取得目前人員帳號錯誤問題
1070508	David	David	1070536			修正替換預排流程內，誤植功能導致異常問題
1070712 Kevin	Justin  1070678		    弱掃Client Potential XSS修正
1070830 Kevin   Justin  1070678         弱掃AJAX修改
1080416	David	David	1080022			新增內會選項
1080604	David	David	1080022			修正判斷邏輯，避免非RRB機關使用異常
1080910	David	David	1080729			調整設定屬性方式統一使用Jquery語法，避免瀏覽器不同導致異常
1081204	David	David	1080729			修正切換個人化預排流程異常問題
1100319	David	David	1100229			支援二級單位後會處理
1100506	Kevin	David	1100473			弱掃修正Client DOM Stored XSS
1100716	David	David	1100433			1.儲存前檢核未走過的OD01前要有OD05。2.開啟時判斷未走過的流程人員是否還有扮演，無扮演時依最新資料設定
1100906	David	David	1101132			修正判斷未走過的流程人員是否還有扮演時，有指定人員的流程才需判斷
1101109	David	David	-------			1.修正GridDiv高度問題，避免多出右邊BAR。2.支援環境變數WWKF_INTERNAL_USER_TXNAME設定內會至人功能
1101206	David	David	1101392			新增檢核會辦對象單位角色是否有扮演人員
1110119	David	David	1101462			支援會辦單位使用模式
1110812	David	David	-------			儲存時將是否有異動資訊設定給theAOL.docObj.wwkfModified，供公文關閉時判斷是否需提醒
1110819	David	David	-------			支援會辦單位依設定判斷可否維護預排流程功能
1110926	David	Joe		1110629			調整UI
1111007	David	David	1111027			支援會辦單位依設定判斷可否新增預排流程功能
1111012	David	David	-------			(陸委會)長官角色判斷新增OD14、OD15
1120926	David	Joe		1120526			調整一層決行判斷依原始代碼判斷，避免英文代碼轉數字型別判斷錯誤
1121024	David	Joe		序281			補上單位展開後收起功能
1121110	David	Joe		--				修正分會檢核邏輯(須至少選取兩個分會對象)
1121207	David	Joe		序295			調整未走過的流程才可異動排序
1121208	David	Joe		1120854			修正會辦至單位預設角色為分辦人員
1130626	David	Joe		1130047			新增內分會選項
1130716	David	Joe		序145			調整邏輯，開放內分會可直接分給不同科別人員
1131001 Kevin	Kevin	1130916			弱掃修正
1131104	Joe		Joe		1130986			新增取得主流程簽核異動別
1131115	Joe		Joe		1130986			調整當使用者直接選取單位時，直接用單位代碼判斷異動別
1150109	David	David	序13			修正儲存後分會內節點SIGN_F資料異常問題
1150109	David	David	1141613			修正新增機關共用流程，有選則插入位置時，插入順序會相反問題
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

//1070830 Justin [1070678]弱掃AJAX修改
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

var gAppLvlIndex = 0;
var dgColumnLength = 6;
var nTableRowNow = 1;
var nTableRowMax = 0;
var theAOL;
var theSSO;
var ModelObj;
var arrOldCowork = [];
var defTarget = { TxName: '', OUId: '', RoleId: '', UserId: '', OUName: '', RoleName: '', UserName: '' };
var IsDefChange = false;
var gDocInfo = {
//基資
uOrgNo : "", DocNo : "", SignType : "", IcOuId : "", AppUserName : "", Folder : "", SubFolder : "", IcUserId : "", OwnOuId : "", OwnRoleId : "",
//系統參數
COWORK_APP_OUID : "",
//環境變數
OD_COWORK_DEPT_MOD_FLOW : ""
}
var bFirstWWKF = true;//判斷是否為預排流程第一關(預排流程沒有已完成簽核的流程)
var bChange = false;//1061106 David 1060748 紀錄是否有異動

//1061106 David 1060748 設定有勾選時的底色
var uSelectedColor = 'orange';//勾選
var uDoubleRowColor = "#C9F5F3";//雙數列底色
var uSingleRowColor = "#FFFFFF";//單數列底色

var theUserInfo;//1061130 David 紀錄theUserInfo物件

var wwkfItem = {
	ADDBY : "",
	CREATE_BY : "",
	OWN_OU_ID : "",
	OWN_OU_NAME : "",
	OWN_ROLE_ID : "",
	OWN_ROLE_NAME : "",
	OWN_USER_ID : "",
	OWN_USER_NAME : "",
	RADIO_SELECTED_1 : "",
	SEND_BY : "",
	SEND_TIME : "",
	SIGN_F : "",
	TX_NAME : "",
};

var wwkfCoworkItem = {
	ADDBY : "",
	CREATE_BY : "",
	OWN_OU_ID : "",
	OWN_OU_NAME : "",
	OWN_ROLE_ID : "",
	OWN_ROLE_NAME : "",
	OWN_USER_ID : "",
	OWN_USER_NAME : "",
	RADIO_SELECTED_1 : "",
	SEND_BY : "",
	SEND_TIME : "",
	SIGN_F : "",
	TX_NAME : "",
	COWORK_OPTIONS : []
};

var gTxNameForExternalOu = "順會";
var gTxNameForInternalOu = "內會";
var gTxNameForAfterAPPOu = "後會";
var gProgressRoleId = "";
var gProgressRoleName = "";

//1101109 David 紀錄環境變數WWKF_INTERNAL_USER_TXNAME設定值
var gTxNameForInternalUser = "";

//1131104	Joe		1130986		新增取得主流程簽核異動別
var arrWWKFMain = new Array();
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	if(!parent)
	{
		alert("沒有從流程設定開啟");
	}
	theAOL = parent.theAOL;
	theSSO = parent.theSSO;
	theUserInfo = parent.theUserInfo;//1061130 David 紀錄theUserInfo物件

	var wwkf = theAOL.docObj.getODWWKF();
	if(!wwkf)
	{
		theAOL.docObj.initODWWKF();
		wwkf = theAOL.docObj.getODWWKF();
	}

	init();
	
	InitNewPoint();

	LoadXmlToTable(wwkf);

	setPersonalFlowSet();

	//1061103 David 1060748 觸發DeptOnChang依預設一級單位選單帶出後續資料
	dlDeptOnChang();
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
			Page_BlockSubmit = true;
			//1110926	Joe		1110629		調整UI
			//fnAddPoint();
			fnAddFlowNew();
			break;
		case "btAddWorkFlow":
			Page_BlockSubmit = true;
			fnAddWorkFlow();
			break;
		case "btAddCowork":
			Page_BlockSubmit = true;
			fnAddThread();
			break;
		case "btChangePersonalFlowSet":
			Page_BlockSubmit = true;
			ChangePersonalFlowSet();
			break;
		case "btDgSelectAll":
			Page_BlockSubmit = true;
			fnSelectAll();
			break;
		case "btDgInverse":
			Page_BlockSubmit = true;
			fnSelectInverse();
			break;
		case "btDgDelete":
			Page_BlockSubmit = true;
			fnDelete();
			break;
		case "btDgMoveUp":
			Page_BlockSubmit = true;
			fnMoveUp();
			break;
		case "btDgMoveDown":
			Page_BlockSubmit = true;
			fnMoveDown();
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
		case "btSave":
			Page_BlockSubmit = true;
			fnSave();
			break;
		case "btCancel":
			//1061103 David 1060748 調整取消功能鍵行為
			//Page_BlockSubmit = !jf_ConfirmCancel();
			//Page_BlockSubmit = true;
			//parent.$('#simplemodal-container a.simplemodal-close').trigger('click');
			Page_BlockSubmit = true;
			if(!bChange)
				parent.$('#simplemodal-container a.simplemodal-close').trigger('click');
			else if(window.confirm("您已修改過內容,確定要取消嗎?"))
				parent.$('#simplemodal-container a.simplemodal-close').trigger('click');
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;

	if (jf_CheckBeforSave())
		bRtnbool = true;

	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}

	return bRtnbool;
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//清空選單
function fnClearDropDownList(obj)
{
    while (obj.options.length > 0)
        obj.options.remove(0);
}

function dlDeptOnChang()
{
    var strDeptNo = document.all.dlDept.options[document.all.dlDept.selectedIndex].value;

    fnClearDropDownList(document.all.dlSect);
	fnClearDropDownList(document.all.dlUser);

    if (strDeptNo == "")
        return;

	//初始化二級選單
    //1070830 Justin [1070678]弱掃AJAX修改
    //var SectObj = EDT217.GetSectInfo(jf_GetArtifact(), strDeptNo).value;
    var SectObj = ED2.EDT217.GetSectInfo(jf_GetArtifact(), strDeptNo).value;
	if(SectObj)
	{
		if(SectObj.bSuccess)
		{
			if (SectObj.SectInfo.length > 0)
			{
				document.all.dlSect.options.add(new Option("", ""));
				for (var iSect = 0; iSect < SectObj.SectInfo.length; iSect++)
				{
					var strSect = SectObj.SectInfo[iSect];
					document.all.dlSect.options.add(new Option(strSect.split('|')[0], strSect.split('|')[1]));
				}
			}
		}
		else
		{
			alert(SectObj.ErrMsg);
		}
	}

	//初始化人員選單
    //1070830 Justin [1070678]弱掃AJAX修改
	//var RoleUserObj = EDT217.GetUserInfo(jf_GetArtifact(), document.all.OrgNo.value, strDeptNo).value;
	var RoleUserObj = ED2.EDT217.GetUserInfo(jf_GetArtifact(), document.all.OrgNo.value, strDeptNo).value;
	if(RoleUserObj)
	{
		if(RoleUserObj.bSuccess)
		{
			if (RoleUserObj.RoleInfo.length > 0)
			{
				document.all.dlUser.options.add(new Option("", ""));
				for (var iRole = 0; iRole < RoleUserObj.RoleInfo.length; iRole++)
				{
					var RoleObj = RoleUserObj.RoleInfo[iRole];
					if(RoleObj)
					{
						var strRoleNo = RoleObj.RoleNo;
						var strRoleName = RoleObj.RoleName;

						if(RoleObj.Userinfo.length == 0)
							continue;

						for (var iUser = 0; iUser < RoleObj.Userinfo.length; iUser++)
						{
							var UserObj = RoleObj.Userinfo[iUser];
							var strUserName = UserObj.UserName;
							var strEmpName = UserObj.EmpName;
							
							var dlUserText = strRoleName + "-" + strEmpName;
							var dlUserValue = strRoleNo + "-" + strUserName;

							document.all.dlUser.options.add(new Option(dlUserText, dlUserValue));
						}
					}
				}
			}
		}
		else
		{
			alert(RoleUserObj.ErrMsg);
		}
	}
}

function dlSectOnChang()
{
	var strSectNo = document.all.dlSect.options[document.all.dlSect.selectedIndex].value;

	fnClearDropDownList(document.all.dlUser);

    if (strSectNo == "")
	{
		dlDeptOnChang();
        return;
	}

	//初始化人員選單
    //1070830 Justin [1070678]弱掃AJAX修改
    //var RoleUserObj = EDT217.GetUserInfo(jf_GetArtifact(), document.all.OrgNo.value, strSectNo).value;
    var RoleUserObj = ED2.EDT217.GetUserInfo(jf_GetArtifact(), document.all.OrgNo.value, strSectNo).value;
	if(RoleUserObj)
	{
		if(RoleUserObj.bSuccess)
		{
			if (RoleUserObj.RoleInfo.length > 0)
			{
				document.all.dlUser.options.add(new Option("", ""));
				for (var iRole = 0; iRole < RoleUserObj.RoleInfo.length; iRole++)
				{
					var RoleObj = RoleUserObj.RoleInfo[iRole];
					//1061103 David 1060748 新增當角色物件不為NULL再處理
					if(RoleObj)
					{
						var strRoleNo = RoleObj.RoleNo;
						var strRoleName = RoleObj.RoleName;

						if(RoleObj.Userinfo.length == 0)
							continue;

						for (var iUser = 0; iUser < RoleObj.Userinfo.length; iUser++)
						{
							var UserObj = RoleObj.Userinfo[iUser];
							var strUserName = UserObj.UserName;
							var strEmpName = UserObj.EmpName;

							var dlUserText = strRoleName + "-" + strEmpName;
							var dlUserValue = strRoleNo + "-" + strUserName;

							document.all.dlUser.options.add(new Option(dlUserText, dlUserValue));
						}
					}
				}
			}
		}
		else
		{
			alert(RoleUserObj.ErrMsg);
		}
	}
}

//將 ODWWKF.XML load 進來後，顯示在流程table中
function LoadXmlToTable(objwwkf)
{
	var pNodeVal = "";
	ClearTable(document.all.dg1);
	nTableRowNow = 1;
	nTableRowMax = 0;
	var bChangeRolePlay = false;//1100716 David 1100433 紀錄是否有替換不存在人員

	for (var iRow = 0; iRow < objwwkf.length; iRow++)
	{
		var nRowIdx = iRow + 1;
		//Insert Row
		//1061106 David 1060748 調整寫法
		//document.all.dg1.insertRow(nRowIdx);
		var NewRow = document.all.dg1.insertRow(nRowIdx);
		nTableRowNow++;
		nTableRowMax++;

		for (var j = 0; j < dgColumnLength; j++)
		{
			document.all.dg1.rows[nRowIdx].insertCell(j);
		}

		var strInnerHtml = "";

		var trStyle = "text-align:center;";
		var ItemDisable = "";
		//1110119 David 1101462 新增會辦單位使用處理
		var CheckBoxHidden = "";
		//選
		if (objwwkf[iRow].SIGN_F.toUpperCase()=="Y")
		{
			trStyle += "background-color: darkgray;";
			ItemDisable = "disabled";
			//判斷是否為預排流程第一關(預排流程沒有已完成簽核的流程)
			bFirstWWKF = false;
			//1110119 David 1101462 已走過流程不顯示CheckBox
			CheckBoxHidden = "hidden";
		}
		else
		{
			//1110119 David 1101462 會辦單位開啟處理
			//1110819 David 支援會辦單位依設定判斷可否維護預排流程功能
			//if(document.all.txMode.value == "2")
			if(gDocInfo.OD_COWORK_DEPT_MOD_FLOW == "1" && document.all.txMode.value == "2")
			{
				//新增會辦單位使用處理，僅能勾選未走過的會辦預排流程
				if(objwwkf[iRow].ADDBY != "2")
					CheckBoxHidden = "hidden";
			}

			if (defTarget.TxName == '')
			{
				defTarget.TxName = objwwkf[iRow].TX_NAME;
				defTarget.OUId = objwwkf[iRow].OWN_OU_ID;
				defTarget.RoleId = objwwkf[iRow].OWN_ROLE_ID;
				defTarget.UserId = objwwkf[iRow].OWN_USER_ID;
				defTarget.OUName = objwwkf[iRow].OWN_OU_NAME;
				defTarget.RoleName = objwwkf[iRow].OWN_ROLE_NAME;
				defTarget.UserName = objwwkf[iRow].OWN_USER_NAME;
			}
		}

		//分會相關處理
		//1130626	Joe		1130047		新增內分會選項
		//if (objwwkf[iRow].TX_NAME != "分會")
		if (objwwkf[iRow].TX_NAME != "分會" && objwwkf[iRow].TX_NAME != "內分會")
		{
			//1100716 David 1100433 開啟時判斷未走過的流程人員是否還有扮演，無扮演時依最新資料設定
			//1100906 David 1101132 修正判斷未走過的流程人員是否還有扮演時，有指定人員的流程才需判斷
			//if(objwwkf[iRow].SIGN_F.toUpperCase()=="N")
			if(objwwkf[iRow].SIGN_F.toUpperCase()=="N" && objwwkf[iRow].OWN_USER_ID != "")
			{
				var CheckRolePlayObj = CheckRolePlayExist(objwwkf[iRow].OWN_OU_ID, objwwkf[iRow].OWN_ROLE_ID, objwwkf[iRow].OWN_USER_ID)
				if(CheckRolePlayObj[0] == "N")
				{
					objwwkf[iRow].OWN_USER_ID = CheckRolePlayObj[1];
					objwwkf[iRow].OWN_USER_NAME = CheckRolePlayObj[2];
					bChangeRolePlay = true;
				}
			}

			//隱藏欄位
			//1131001 Kevin 1130916 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].OWN_USER_ID);
			strInnerHtml = "<INPUT id=\"txOwnUserId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = htmlencode(objwwkf[iRow].OWN_OU_ID);
			strInnerHtml += "<INPUT id=\"txOwnOuId" + nTableRowMax + "\" type=\"hidden\" name=\"txOwnOuId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = htmlencode(objwwkf[iRow].OWN_ROLE_ID);
			strInnerHtml += "<INPUT id=\"txOwnRoleId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRoleId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = htmlencode(objwwkf[iRow].CREATE_BY);
			strInnerHtml += "<INPUT id=\"txCreateBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = htmlencode(objwwkf[iRow].SEND_BY);
			strInnerHtml += "<INPUT id=\"txSendBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = htmlencode(objwwkf[iRow].SEND_TIME);
			strInnerHtml += "<INPUT id=\"txSendTime" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

			//1131001 Kevin 1130916 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].ADDBY); //ADDBY  -- 加入方式 (0:加入流程, 1:加入流程點)
			if (pNodeVal == null) //ADDBY  -- 加入方式 (0:加入流程, 1:加入流程點)
				pNodeVal == "0"; //舊資料一律視為「加入流程」方式加入
			strInnerHtml += "<INPUT id=\"txAddBy" + nTableRowMax + "\" type=\"hidden\" name=\"txAddBy" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

			//1131001 Kevin 1130916 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].RADIO_SELECTED_1);
			if (pNodeVal == null) //RadioSelected1  (1:改分, 2:順會, 3:分會) 
				pNodeVal = "2"; //舊資料一律視為順會
			strInnerHtml += "<INPUT id=\"txRadioSelected1" + nTableRowMax + "\" type=\"hidden\" name=\"txRadioSelected1" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

			//選+隱藏欄位
			//1061106 David 1060748 新增選勾選後底色處理
			//document.all.dg1.rows[nRowIdx].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" " + ItemDisable + "  >" + strInnerHtml;
			//1110119 David 1101462 新增會辦單位使用處理，僅能勾選未走過的會辦預排流程
			//document.all.dg1.rows[nRowIdx].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" " + ItemDisable + " onclick=\"fnSetColor("+nTableRowMax+")\" >" + strInnerHtml;
			if(CheckBoxHidden != "")
				document.all.dg1.rows[nRowIdx].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" " + ItemDisable + " " +CheckBoxHidden + ">" + strInnerHtml;
			else
				document.all.dg1.rows[nRowIdx].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" " + ItemDisable + " onclick=\"fnSetColor("+nTableRowMax+")\" >" + strInnerHtml;
			//單位
			//1131001 Kevin 1130916 弱掃修正
			document.all.dg1.rows[nRowIdx].cells[1].innerHTML = htmlencode(objwwkf[iRow].OWN_OU_NAME);
			//角色
			//1131001 Kevin 1130916 弱掃修正
			document.all.dg1.rows[nRowIdx].cells[2].innerHTML = htmlencode(objwwkf[iRow].OWN_ROLE_NAME);
			//人員
			//1131001 Kevin 1130916 弱掃修正
			document.all.dg1.rows[nRowIdx].cells[3].innerHTML = htmlencode(objwwkf[iRow].OWN_USER_NAME);
			//異動別
			//1131001 Kevin 1130916 弱掃修正
			document.all.dg1.rows[nRowIdx].cells[4].innerHTML = htmlencode(objwwkf[iRow].TX_NAME);
			//分會明細按鈕
			//1110925	Joe		1110629		UI調整
			//document.all.dg1.rows[nRowIdx].cells[5].innerHTML = "";
			//1121207	Joe		序295	調整未走過的流程才可異動排序
			if(objwwkf[iRow].SIGN_F.toUpperCase()!="Y")
			{				
				document.all.dg1.rows[nRowIdx].cells[5].innerHTML = "<INPUT id=\"btMoveUp" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveUp(" + nTableRowMax + ")\" name=\"btMoveUp" + nTableRowMax + "\" value=\"↑\">";
				document.all.dg1.rows[nRowIdx].cells[5].innerHTML += "<INPUT id=\"btMoveDown" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveDown(" + nTableRowMax + ")\" name=\"btMoveDown" + nTableRowMax + "\" value=\"↓\">";
				document.all.dg1.rows[nRowIdx].cells[5].innerHTML += "<INPUT id=\"btDelete" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleDelete(" + nTableRowMax + ")\" name=\"btDelete" + nTableRowMax + "\" value=\"刪\">";
			}
		}
		else
		{
			//隱藏欄位
			pNodeVal = objwwkf[iRow].OWN_USER_ID;
			strInnerHtml = "<INPUT id=\"txOwnUserId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = objwwkf[iRow].OWN_OU_ID;
			strInnerHtml += "<INPUT id=\"txOwnOuId" + nTableRowMax + "\" type=\"hidden\" name=\"txOwnOuId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = objwwkf[iRow].OWN_ROLE_ID;
			strInnerHtml += "<INPUT id=\"txOwnRoleId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRoleId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = objwwkf[iRow].CREATE_BY;
			strInnerHtml += "<INPUT id=\"txCreateBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = objwwkf[iRow].SEND_BY;
			strInnerHtml += "<INPUT id=\"txSendBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = objwwkf[iRow].SEND_TIME;
			strInnerHtml += "<INPUT id=\"txSendTime" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = "1"; //ADDBY  -- 加入方式 (0:加入流程, 1:加入流程點)
			strInnerHtml += "<INPUT id=\"txAddBy" + nTableRowMax + "\" type=\"hidden\" name=\"txAddBy" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = 3;//RadioSelected1  (1:改分, 2:順會, 3:分會) 
			strInnerHtml += "<INPUT id=\"txRadioSelected1" + nTableRowMax + "\" type=\"hidden\" name=\"txRadioSelected1" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
	
			//由wwkf中取出分會單位資訊
			var strOuId = "";
			var strOuName = "";
			var strRoleId = "";
			var strRoleName = "";
			var strUserId = "";
			var strUserName = "";
			var strOuNameList ="";
			var iCoworkOptionLength = objwwkf[iRow].COWORK_OPTIONS.length;
			for(var inum = 0 ; inum < iCoworkOptionLength ; inum++)
			{
				strOuId += objwwkf[iRow].COWORK_OPTIONS[inum].OWN_OU_ID;
				if(inum != iCoworkOptionLength-1)
					strOuId += "|";
				strOuName += objwwkf[iRow].COWORK_OPTIONS[inum].OWN_OU_NAME;
				if(inum != iCoworkOptionLength-1)
					strOuName += "|";
				strRoleId += objwwkf[iRow].COWORK_OPTIONS[inum].OWN_ROLE_ID;
				if(inum != iCoworkOptionLength-1)
					strRoleId += "|";
				strRoleName += objwwkf[iRow].COWORK_OPTIONS[inum].OWN_ROLE_NAME;
				if(inum != iCoworkOptionLength-1)
					strRoleName += "|";
				strUserId += objwwkf[iRow].COWORK_OPTIONS[inum].OWN_USER_ID;
				if(inum != iCoworkOptionLength-1)
					strUserId += "|";
				strUserName += objwwkf[iRow].COWORK_OPTIONS[inum].OWN_USER_NAME;
				if(inum != iCoworkOptionLength-1)
					strUserName += "|";
				strOuNameList += objwwkf[iRow].COWORK_OPTIONS[inum].OWN_OU_NAME;
				if(inum != iCoworkOptionLength-1)
					strOuNameList += ",";
			}

			//選+隱藏欄位
			//1061106 David 1060748 新增選勾選後底色處理
			//document.all.dg1.rows[nRowIdx].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" " + ItemDisable + "  >" + strInnerHtml + "<INPUT id=\"txTreadInfo"+nTableRowMax+"\" type=\"hidden\" name=\"txTreadInfo"+nTableRowMax+"\" OwnOuId="+strOuId+" OwnRoleId="+strRoleId+" OwnUserId="+strUserId+" OwnOuName="+strOuName+" OwnRoleName="+strRoleName+" OwnUserName="+strUserName+">";;
			document.all.dg1.rows[nRowIdx].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" " + ItemDisable + " onclick=\"fnSetColor("+nTableRowMax+")\" >" + strInnerHtml + "<INPUT id=\"txTreadInfo"+nTableRowMax+"\" type=\"hidden\" name=\"txTreadInfo"+nTableRowMax+"\" OwnOuId="+strOuId+" OwnRoleId="+strRoleId+" OwnUserId="+strUserId+" OwnOuName="+strOuName+" OwnRoleName="+strRoleName+" OwnUserName="+strUserName+">";;
			//單位
			//1131001 Kevin 1130916 弱掃修正
			document.all.dg1.rows[nRowIdx].cells[1].innerHTML = htmlencode(strOuNameList);
			//角色
			document.all.dg1.rows[nRowIdx].cells[2].innerHTML = "";
			//人員
			document.all.dg1.rows[nRowIdx].cells[3].innerHTML = "";
			//異動別
			//1130626	Joe		1130047		新增內分會選項
			//document.all.dg1.rows[nRowIdx].cells[4].innerHTML = "分會";
			//1131001 Kevin 1130916 弱掃修正
			document.all.dg1.rows[nRowIdx].cells[4].innerHTML = htmlencode(objwwkf[iRow].TX_NAME);
			//分會明細按鈕
			//1110119 David 1101462 修正已走過的分會流程不可使用明細按鈕
			//document.all.dg1.rows[nRowIdx].cells[5].innerHTML = "<INPUT id=\"btShowDetail"+nTableRowMax+"\" type=\"button\" onclick=\"fnOpenThread("+nTableRowMax+")\" name=\"btShowDetail"+nTableRowMax+"\" value=\"明細\">" ;
			//1110925	Joe		1110629		UI調整
			//document.all.dg1.rows[nRowIdx].cells[5].innerHTML = "<INPUT id=\"btShowDetail"+nTableRowMax+"\" type=\"button\" " + ItemDisable + " onclick=\"fnOpenThread("+nTableRowMax+")\" name=\"btShowDetail"+nTableRowMax+"\" value=\"明細\">" ;
			//1121207	Joe		序295	調整未走過的流程才可異動排序
			if(objwwkf[iRow].SIGN_F.toUpperCase()!="Y")
			{
				document.all.dg1.rows[nRowIdx].cells[5].innerHTML = "<INPUT id=\"btMoveUp" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveUp(" + nTableRowMax +")\" name=\"btMoveUp"+nTableRowMax+"\" value=\"↑\">" ;
				document.all.dg1.rows[nRowIdx].cells[5].innerHTML += "<INPUT id=\"btMoveDown" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveDown(" + nTableRowMax +")\" name=\"btMoveDown"+nTableRowMax+"\" value=\"↓\">" ;
				document.all.dg1.rows[nRowIdx].cells[5].innerHTML += "<INPUT id=\"btDelete" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleDelete(" + nTableRowMax +")\" name=\"btDelete"+nTableRowMax+"\" value=\"刪\">" ;
			}
		}

		//1080910 David 1080729 調整設定屬性方式統一使用Jquery語法
		/*if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
			document.all.dg1.rows[nRowIdx].style = trStyle;
		else
		{
			document.all.dg1.rows[nRowIdx].style.setAttribute("text-align", "center");
			if(objwwkf[iRow].SIGN_F.toUpperCase()=="Y")
				document.all.dg1.rows[nRowIdx].style.setAttribute("background-color", "darkgray");
		}*/
		$(NewRow).attr('style','text-align:center');
		if(objwwkf[iRow].SIGN_F.toUpperCase()=="Y")
			$(NewRow).attr('style','text-align:center; background-color:darkgray');

		//1061106 David 1060748 新增點選處理
		//1110119 David 1101462 新增會辦單位使用處理，可勾選方塊時才新增點選處理
		if(CheckBoxHidden == "")
			$(NewRow).bind('click', rowsOnClick);
	}

	//1100716 David 1100433 調整資料後顯示提示訊息
	if(bChangeRolePlay)
		alert("檢核尚未傳送流程有離職人員資訊，已更新為目前扮演人員，離開時請儲存以記錄最新資訊");
}

function ClearTable(argTable)
{
	var MaxRow = argTable.rows.length - 1;
	for (var i = 0; i < MaxRow; i++)
	{
		argTable.deleteRow(1);
	}
}

function init()
{
	//基資
	gDocInfo.uOrgNo = theAOL.docObj.get("ODWMSG", "SOURCE_ORGNO");
	gDocInfo.DocNo = theAOL.docObj.get("ODWMSG", "DOC_NO");
	gDocInfo.SignType = theAOL.docObj.get("ODWMSG", "SIGN_TYPE");
	gDocInfo.IcOuId = theAOL.docObj.get("ODWMSG", "INCHARGE_OU");
	gDocInfo.AppUserName = theAOL.docObj.get("ODWMSG", "APP_USER_NAME");
	gDocInfo.Folder = theAOL.docObj.get("ODWMSG", "FOLDER");
	gDocInfo.SubFolder = theAOL.docObj.get("ODWMSG", "SUBFOLDER");
	gDocInfo.IcUserId = theAOL.docObj.get("ODWMSG", "IC_USER_ID");
	gDocInfo.OwnOuId = theAOL.docObj.get("ODWMSG", "OWN_OU_ID");
	gDocInfo.OwnRoleId = theAOL.docObj.get("ODWMSG", "OWN_ROLE_ID");
	//環境變數
	gDocInfo.OD_COWORK_DEPT_MOD_FLOW = theSSO.User.EnvSettings.get("OD_COWORK_DEPT_MOD_FLOW");
	if(gDocInfo.OD_COWORK_DEPT_MOD_FLOW != "0" && gDocInfo.OD_COWORK_DEPT_MOD_FLOW != "1")
		gDocInfo.OD_COWORK_DEPT_MOD_FLOW = "1";
	//1101109 David 紀錄環境變數WWKF_INTERNAL_USER_TXNAME設定值
	gTxNameForInternalUser = theSSO.User.EnvSettings.get("WWKF_INTERNAL_USER_TXNAME");
	if(gTxNameForInternalUser == "")
		gTxNameForInternalUser = gTxNameForInternalOu;

	//1101109 David 修正GridDiv高度問題，避免多出右邊BAR
	$('.GridDiv').each(function () {
		var oldHeight = $(this).height();
		var newHeight = window.innerHeight - $(this).offset().top - ($('.footStatus').height() | 0) - 90;
		if (oldHeight < newHeight)
			$(this).height(newHeight);
	});

	//1110119 David 1101462 會辦單位開啟處理
	//1111007 David 1111027 支援會辦單位依設定判斷可否新增預排流程功能
	//if(document.all.txMode.value == "2")
	if(gDocInfo.OD_COWORK_DEPT_MOD_FLOW == "1" && document.all.txMode.value == "2")
	{
		//1110926	Joe		1110629		變更為鎖定會辦單位選單--S
		/*
		$("#CoworkHide1").hide();
		$("#CoworkHide2").hide();
		$("#CoworkHide3").hide();
		//會辦單位承辦人使用時，一級選單固定為目前一級單位
		var NowDeptNo = gDocInfo.OwnOuId.substr(0,2);
		$('#dlDept').val(NowDeptNo);
		dlDeptOnChang();
		$("#dlDept").prop("disabled", true);
		*/
		document.all.rbDeptFirst.disabled = true;
		document.all.rbDeptCowork.disabled = true;
		document.all.rbDeptOther.disabled = true;
		document.all.rbDeptNow.checked = true;
		//1110926	Joe		1110629		變更為鎖定會辦單位選單--E
	}
	//1110926	Joe		1110629		新增單位選單
	else
		document.all.rbDeptFirst.checked = true;
	DeptTypeChange();
	
	//1131104	Joe		1130986		新增取得主流程簽核異動別
	GetMainFlow();
}

//1131104	Joe		1130986		新增取得主流程簽核異動別--S
function GetMainFlow()
{
	arrWWKFMain.clear();
	if(document.all.WWKF_MAINFLOW.value != "")
	{
		var MAINFLOWset = document.all.WWKF_MAINFLOW.value.split(';');
		for(var i = 0; i < MAINFLOWset.length; i++){
			var MAINFLOWDetail = MAINFLOWset[i].split('-');
			if(MAINFLOWDetail.length != 4)
				continue;
			
			let tmpWWKF = {RoleId: "", OUIdLen: "", OUId: "", TxName: ""};
			tmpWWKF.RoleId = MAINFLOWDetail[0];
			tmpWWKF.OUIdLen = MAINFLOWDetail[1];
			tmpWWKF.OUId = MAINFLOWDetail[2];
			tmpWWKF.TxName = MAINFLOWDetail[3];
			
			arrWWKFMain.push(tmpWWKF);
		}
	}
}
function GetTxNameFromWWKFMain(argRoleId, argOUId)
{
	if(argRoleId != "")
	{
		var OuIdLen = argOUId.length;
		for(var i = 0; i < arrWWKFMain.length; i++){
			if(arrWWKFMain[i].RoleId == argRoleId && arrWWKFMain[i].OUIdLen == OuIdLen && (arrWWKFMain[i].OUId == "" || arrWWKFMain[i].OUId == argOUId))
				return arrWWKFMain[i].TxName;
		}		
	}
	//1131115	Joe		1130986		調整當使用者直接選取單位時，直接用單位代碼判斷異動別
	else
	{
		var OuIdLen = argOUId.length;
		for(var i = 0; i < arrWWKFMain.length; i++){
			if(arrWWKFMain[i].OUIdLen == OuIdLen && arrWWKFMain[i].OUId == argOUId)
				return arrWWKFMain[i].TxName;
		}		
	}
	return "送請簽核";
}
//1131104	Joe		1130986		新增取得主流程簽核異動別--E

//插入流程點
//1110926	Joe		1110629		UI調整，取消關鍵字功能，資料來源由DG傳入
//function fnAddPoint()
function fnAddPoint(pOuId, pOuName, pRoleNo, pRoleName, pUserName, pEmpName)
{
	var wmsgOwnOuId = gDocInfo.OwnOuId;
	//1110119 David 1101462 支援會辦單位使用
	if(document.all.txMode.value == "2")
		wmsgOwnOuId = gDocInfo.OwnOuId;

	if (wmsgOwnOuId.length >= 3)
		wmsgOwnOuId = wmsgOwnOuId.substr(0, 2);

	//1110926	Joe		1110629		UI調整，取消關鍵字功能，資料來源由DG傳入
	/*
	if(document.all.rbMode1.checked)
	{
		//選單
		//1070712 Justin [1070678] 弱掃Client Potential XSS修正
		//pOuId = document.all.dlDept.options[document.all.dlDept.selectedIndex].value;
		//pOuName = document.all.dlDept.options[document.all.dlDept.selectedIndex].text;
		pOuId = htmlencode(document.all.dlDept.options[document.all.dlDept.selectedIndex].value);
		pOuName = htmlencode(document.all.dlDept.options[document.all.dlDept.selectedIndex].text);
		if(document.all.dlSect.selectedIndex > 0)
		{
			//1070712 Justin [1070678] 弱掃Client Potential XSS修正
			//pOuId = document.all.dlSect.options[document.all.dlSect.selectedIndex].value;
			//pOuName = document.all.dlSect.options[document.all.dlSect.selectedIndex].text;
			pOuId = htmlencode(document.all.dlSect.options[document.all.dlSect.selectedIndex].value);
			pOuName = htmlencode(document.all.dlSect.options[document.all.dlSect.selectedIndex].text);
		}

		if(document.all.dlUser.selectedIndex > 0)
		{
			//1070712 Justin [1070678] 弱掃Client Potential XSS修正
			//var RoleUserTextInfo = document.all.dlUser.options[document.all.dlUser.selectedIndex].text;
			//var RoleUserValueInfo = document.all.dlUser.options[document.all.dlUser.selectedIndex].value;
			var RoleUserTextInfo = htmlencode(document.all.dlUser.options[document.all.dlUser.selectedIndex].text);
			var RoleUserValueInfo = htmlencode(document.all.dlUser.options[document.all.dlUser.selectedIndex].value);
			pUserName = RoleUserValueInfo.split('-')[1];
			pEmpName = RoleUserTextInfo.split('-')[1];
			pRoleNo = RoleUserValueInfo.split('-')[0];
			pRoleName = RoleUserTextInfo.split('-')[0];
		}
	}
	else
	{
		//關鍵字
		$InputData = $("input#txNewPoint").data("acInputData");

		pOuId = $InputData.unitNo != null ? $InputData.unitNo : '';
		pOuName = $InputData.unitName != null ? $InputData.unitName : '';
		pUserName = $InputData.account != null ? $InputData.account : '';
		pEmpName = $InputData.name != null ? $InputData.name : '';
		pRoleNo = $InputData.roleNo != null ? $InputData.roleNo : '';
		pRoleName = $InputData.roleName != null ? $InputData.roleName : '';
	}
	*/

	if (pUserName == "" && pRoleNo == "" && pOuId == "")
	{
		alert('單位、角色、人員不得全為空白');
		return false;
	}

	//1110119 David 1101462 新增會辦單位使用插入檢核
	//1111007 David 1111027 支援會辦單位依設定判斷可否新增預排流程功能
	//if(document.all.txMode.value == "2")
	if(gDocInfo.OD_COWORK_DEPT_MOD_FLOW == "1" && document.all.txMode.value == "2")
	{
		if(pOuId.length == 2 && pUserName == "" && pRoleNo == "")
		{
			alert('角色、人員不得全為空白');
			return false;
		}

		if (pOuId.length == 2 && pUserName == "")
		{
			alert('人員不得為空白');
			return false;
		}

		if(pOuId == gDocInfo.OwnOuId && pUserName == "")
		{
			alert(' 人員不得為空白');
			return false;
		}
	}

	//異動別
	var pRadioSelected1 = "2"; //RadioSelected1  (1:改分, 2:順會, 3:分會, 4:後會) 預設值 2
	//1110926	Joe		1110629		UI調整
	//if(document.all.rb2.checked)
	if(document.all.rbCoworkType2.checked)
		pRadioSelected1 = "4";
	//1130626	Joe		1130047		新增內分會選項
	else if (document.all.rbDeptNow.checked && document.all.rbCoworkTypeInside2.checked)
		pRadioSelected1 = "6";


	//1120926	Joe		1120526		調整該依原始代碼判斷
	// var iTargetOuId = parseInt(pOuId.substr(0, 2), 10);
	var TargetOuId = pOuId.substr(0, 2);

	var pTxName = GetTxName(pOuId, gDocInfo.IcOuId, true, pRoleNo, pRoleName, pRadioSelected1, pUserName, wmsgOwnOuId);
	if (pTxName == "")
	{
		alert('無法判定異動別，請重新點選');
		return false;
	}
	
	//1101206 David 1101392 新增檢核會辦對象單位角色是否有扮演人員
	if(pTxName == gTxNameForExternalOu || pTxName == gTxNameForAfterAPPOu)
	{
		//1121208	Joe		1120854		修正會辦至單位預設角色為分辦人員
		if(pRoleNo == "")
		{
			pRoleNo = "OD16";
			pRoleName = "分辦人員";
		}
		let strCheckMsg = "";
		let strTargetRoleNo = pRoleNo;
		if(strTargetRoleNo == "")
		{
			strTargetRoleNo = "OD16";
			if(theAOL.docObj.signType == "P")
				strTargetRoleNo = "OD17";
		}

		let RolePlayObj = ED2.EDT217.CheckRolePlay(jf_GetArtifact(), document.all.OrgNo.value, pOuId, strTargetRoleNo).value;
		if(RolePlayObj)
		{
			if(RolePlayObj.bSuccess)
			{
				if (RolePlayObj.CheckMsg != "")
				{
					if(strCheckMsg != "")
						strCheckMsg += "，";
					strCheckMsg += RolePlayObj.CheckMsg;
				}
			}
			else
			{
				alert("無法加入會辦流程：" + RolePlayObj.ErrMsg);
				return;
			}
		}

		if(strCheckMsg != "")
		{
			alert(strCheckMsg + "，請重新確認會辦對象後重新設定");
			return;
		}
	}

	//1120926	Joe		1120526		調整該依原始代碼判斷
	// AddFlowPoint(pUserName, pEmpName, pOuId, pOuName, pRoleNo, pRoleName, pRadioSelected1, pTxName, iTargetOuId);
	AddFlowPoint(pUserName, pEmpName, pOuId, pOuName, pRoleNo, pRoleName, pRadioSelected1, pTxName, TargetOuId);
}

function AddFlowPoint(pUserName, pEmpName, pOuId, pOuName, pRoleNo, pRoleName, pRadioSelected1, pTxName, iTargetOuId)
{
	var InsertIndex = fnGetInsertRowIndex();

	//Insert Row
	var NewRow = document.all.dg1.insertRow(InsertIndex);
	nTableRowNow++;
	nTableRowMax++;

	for (var j = 0; j < dgColumnLength; j++)
		document.all.dg1.rows[InsertIndex].insertCell(j);

	var strInnerHtml = "";

	//隱藏欄位
	//1131001 Kevin 1130916 弱掃修正
	var pNodeVal = htmlencode(pUserName);
	strInnerHtml = "<INPUT id=\"txOwnUserId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
	//1131001 Kevin 1130916 弱掃修正
	pNodeVal = htmlencode(pOuId);
	strInnerHtml += "<INPUT id=\"txOwnOuId" + nTableRowMax + "\" type=\"hidden\" name=\"txOwnOuId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
	//1131001 Kevin 1130916 弱掃修正
	pNodeVal = htmlencode(pRoleNo);
	strInnerHtml += "<INPUT id=\"txOwnRoleId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRoleId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
	//1131001 Kevin 1130916 弱掃修正
	pNodeVal = htmlencode(parent.theUserInfo.UserName);
	strInnerHtml += "<INPUT id=\"txCreateBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
	pNodeVal = "";//SEND_BY
	strInnerHtml += "<INPUT id=\"txSendBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
	pNodeVal = "";//SEND_TIME
	strInnerHtml += "<INPUT id=\"txSendTime" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

	pNodeVal = "1"//加入方式 (0:加入流程, 1:加入流程點)
	//1110119 David 1101462 新增紀錄會辦預排流程
	if(document.all.txMode.value == "2")
		pNodeVal = "2";
	strInnerHtml += "<INPUT id=\"txAddBy" + nTableRowMax + "\" type=\"hidden\" name=\"txAddBy" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

	//1131001 Kevin 1130916 弱掃修正
	pNodeVal = htmlencode(pRadioSelected1);//(1:改分, 2:順會, 3:分會)
	strInnerHtml += "<INPUT id=\"txRadioSelected1" + nTableRowMax + "\" type=\"hidden\" name=\"txRadioSelected1" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

	//選+隱藏欄位
	//1061106 David 1060748 新增選勾選後底色處理
	//document.all.dg1.rows[InsertIndex].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\">" + strInnerHtml;
	document.all.dg1.rows[InsertIndex].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" onclick=\"fnSetColor("+nTableRowMax+")\">" + strInnerHtml;
	//單位
	//1131001 Kevin 1130916 弱掃修正
	document.all.dg1.rows[InsertIndex].cells[1].innerHTML = htmlencode(pOuName);
	//角色
	//1131001 Kevin 1130916 弱掃修正
	document.all.dg1.rows[InsertIndex].cells[2].innerHTML = htmlencode(pRoleName);
	//人員
	//1131001 Kevin 1130916 弱掃修正
	document.all.dg1.rows[InsertIndex].cells[3].innerHTML = htmlencode(pEmpName);
	//異動別
	//1131001 Kevin 1130916 弱掃修正
	document.all.dg1.rows[InsertIndex].cells[4].innerHTML = htmlencode(pTxName);
	//分會明細按鈕
	//1110925	Joe		1110629		UI調整
	//document.all.dg1.rows[InsertIndex].cells[5].innerHTML = "";
	document.all.dg1.rows[InsertIndex].cells[5].innerHTML = "<INPUT id=\"btMoveUp" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveUp(" + nTableRowMax + ")\" name=\"btMoveUp" + nTableRowMax + "\" value=\"↑\">";
	document.all.dg1.rows[InsertIndex].cells[5].innerHTML += "<INPUT id=\"btMoveDown" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveDown(" + nTableRowMax + ")\" name=\"btMoveDown" + nTableRowMax + "\" value=\"↓\">";
	document.all.dg1.rows[InsertIndex].cells[5].innerHTML += "<INPUT id=\"btDelete" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleDelete(" + nTableRowMax + ")\" name=\"btDelete" + nTableRowMax + "\" value=\"刪\">";

	//1080910 David 1080729 調整設定屬性方式統一使用Jquery語法
	/*if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
		document.all.dg1.rows[InsertIndex].style = "text-align:center;";
	else
		document.all.dg1.rows[InsertIndex].style.setAttribute("text-align", "center");*/
	$(NewRow).attr('style','text-align:center');

	bChange = true;//1061106 David 1060748 紀錄是否有異動

	//1061106 David 1060748 新增點選處理
	$(NewRow).bind('click', rowsOnClick);
}

function fnGetInsertRowIndex()
{
	//1110119 David 1101462 紀錄是否有取得勾選項目
	var bGetChecked = false;

	var nRowStart = document.all.dg1.rows.length;
	for(var idg = document.all.dg1.rows.length-1 ; idg > 0 ; idg--)
	{
		var cbCheckObj = document.all.dg1.rows[idg].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked)//判斷最後一個勾選的流程
		{
			//1110119 David 1101462 紀錄是否有取得勾選項目
			bGetChecked = true;

			nRowStart = idg+1
			break;
		}
	}
	var nRowIdx = nRowStart;

	//1110119 David 1101462 新增會辦單位使用處理
	//1111007 David 1111027 支援會辦單位依設定判斷可否新增預排流程功能
	//if(document.all.txMode.value == "2")
	if(gDocInfo.OD_COWORK_DEPT_MOD_FLOW == "1" && document.all.txMode.value == "2")
	{
		//如有勾選，依勾選的項目位置插入，如未勾選，依流程合理性判斷回傳Index
		if(!bGetChecked)
		{
			//取得會辦單位可插入的範圍
			var bGetCoworkEnd = false;
			var nCoworkEnd = document.all.dg1.rows.length;
			for(var idg = document.all.dg1.rows.length-1 ; idg > 0 ; idg--)
			{
				var cbCheckObj = document.all.dg1.rows[idg].cells[0].childNodes[0];
				if(cbCheckObj && !cbCheckObj.disabled && !cbCheckObj.hidden)
				{
					nCoworkEnd = idg+1;
					bGetCoworkEnd = true;
					break;
				}
			}
			nRowIdx = nCoworkEnd;

			//無會辦單位流程時，取得第一個未走過流程
			if(!bGetCoworkEnd)
			{
				for (var idg = 1 ; idg < document.all.dg1.rows.length ; idg++)
				{
					var strSignF = document.all.dg1.rows[idg].cells[0].childNodes[0].disabled ? 'Y' : 'N';
					if(strSignF == "N")
					{
						nRowIdx = idg;
						break;
					}
				}
			}
		}
	}

	return nRowIdx;
}

function GetTxName(argOwnOuId, argInChargeOu, argIsAddPoint, argRoleId, argRoleName, argRadioSelected1, argToUserId, argWmsgOwnOuId)
{
	//1120926	Joe		1120526		調整該依原始代碼判斷，避免parseInt(9A)被轉換為9
	// var T = parseInt(argOwnOuId.substr(0, 2), 10);
	var T = argOwnOuId.substr(0, 2);
	var M = parseInt(argInChargeOu.substr(0, 2), 10);
	var nOwnOuIdLen = argOwnOuId.length;
	var strTxName = "";

	//初始化
	gProgressRoleId = "";
	gProgressRoleName = "";

	//1120926	Joe		1120526		調整該依原始代碼判斷
	// if (T == 91) //1 ===========================================================================
	if (T == "91") //1 ===========================================================================
	{
		SetRole(argRoleId, argRoleName, "OD91", "收文人員");
		return "退文";
	}
	//1120926	Joe		1120526		調整該依原始代碼判斷
	// else if (T == 92) //2,3,4 ===========================================================================
	else if (T == "92") //2,3,4 ===========================================================================
	{
		if (argRoleId == "" || argRoleId == "OD92") //2
		{
			SetRole(argRoleId, argRoleName, "OD92", "繕印人員");
			//如果是由發文人員、校對人員所點選，則為"送繕"
			if (gDocInfo.SubFolder == "待發文" || gDocInfo.SubFolder == "待校對")
				return "送繕";
			else
				return "送總發文";
		}
		else if (argRoleId == "OD93") //3
		{
			SetRole(argRoleId, argRoleName, "", "");
			return "送校";

		}
		else if (argRoleId == "OD94") //4
		{
			SetRole(argRoleId, argRoleName, "", "");
			return "送發";
		}
	}
	//1120926	Joe		1120526		調整該依原始代碼判斷
	// else if (T == 93) //new 2004-05-24 ===========================================================================
	else if (T == "93") //new 2004-05-24 ===========================================================================
	{
		SetRole(argRoleId, argRoleName, "OD96", "研考人員");
		return "送銷號";
	}
	//1120926	Joe		1120526		調整該依原始代碼判斷
	// else if (T == 94) //5 ===========================================================================
	else if (T == "94") //5 ===========================================================================
	{
		SetRole(argRoleId, argRoleName, "OD95", "檔管人員");
		return "歸檔";
	}
	//1120926	Joe		1120526		調整該依原始代碼判斷
	// else if (T >= 95)	//6 ===========================================================================
	else if (T.indexOf("9") == 0 && T != "90")	//6 ===========================================================================
	{
		SetRole(argRoleId, argRoleName, "", "");
		if (gDocInfo.AppUserName != "") //若核決者不為空白
			return "複閱";
		else
			//1131104	Joe		1130986		新增依主流程簽核異動別帶出預設名稱
			// return "送請簽核";
			return GetTxNameFromWWKFMain(gProgressRoleId, argOwnOuId);
	}
	//1080604 David 1080022 修正判斷邏輯，避免非RRB機關使用異常
	//else if(document.all.rb3.checked)//1080416 David 1080022 新增內會處理
	//1110926	Joe		1110629		UI調整
	/*
	else if(document.all.rbCoworkType3 && document.all.rbCoworkType3.checked)
	{
		if(argToUserId != "" && argRoleId != "OD16")
			return "內會至人";
		else
			return "內會";
	}
	*/
	else
	{
		//6.5 ===========================================================================
		if (argOwnOuId.substr(0, 2) == argInChargeOu.substr(0, 2)) //6.5
		{
			if (argWmsgOwnOuId == argOwnOuId.substr(0, 2))
			{
				if (argToUserId == gDocInfo.IcUserId) //當user=承辦人
				{
					SetRole(argRoleId, argRoleName, "", "");
					if (gDocInfo.AppUserName != "") //若核決者不為空白
						return "辦畢退回";
					else
						return "退回";
				}
				else
				{
					if (argRoleId == "OD11" || argRoleId == "OD12" || argRoleId == "OD13"
					//1111012 David 長官角色判斷新增OD14、OD15
					|| argRoleId == "OD14" || argRoleId == "OD15"
					|| argRoleId == "OD21" || argRoleId == "OD22"
					|| argRoleId == "OD31" || argRoleId == "OD32"
					|| argRoleId == "OD41" || argRoleId == "OD42"
					|| argRoleId == "OD51" || argRoleId == "OD52") //8
					{
						SetRole(argRoleId, argRoleName, "", "");
						//1131104	Joe		1130986		新增依主流程簽核異動別帶出預設名稱
						// return "送請簽核";
						return GetTxNameFromWWKFMain(gProgressRoleId, argOwnOuId);
					}
				}
			}
			else
			{
				if (argToUserId == gDocInfo.IcUserId) //當user=承辦人
				{
					SetRole(argRoleId, argRoleName, "", "");
					if (gDocInfo.AppUserName != "") //若核決者不為空白
						return "辦畢退回";
					else
						return "退回";
				}
				else
				{
					SetRole(argRoleId, argRoleName, "", "");
					if (gDocInfo.AppUserName != "") //若核決者不為空白
						return "辦畢退回";
					else
						return "退回";
				}
			}
		}
		//7,8,8.5 ===========================================================================
		if (argOwnOuId == argInChargeOu.substr(0, nOwnOuIdLen)) //7,8, 8.5
		{
			if (argRoleId == "OD15")	//7
			{
				SetRole(argRoleId, argRoleName, "", "");
				return "送單位發文";
			}
			else if (argRoleId == "OD11" || argRoleId == "OD12" || argRoleId == "OD13"
					//1111012 David 長官角色判斷新增OD14、OD15
					|| argRoleId == "OD14" || argRoleId == "OD15"
					|| argRoleId == "OD21" || argRoleId == "OD22"
					|| argRoleId == "OD31" || argRoleId == "OD32"
					|| argRoleId == "OD41" || argRoleId == "OD42"
					|| argRoleId == "OD51" || argRoleId == "OD52") //8
			{
				SetRole(argRoleId, argRoleName, "", "");
				//1131104	Joe		1130986		新增依主流程簽核異動別帶出預設名稱
				// return "送請簽核";
				return GetTxNameFromWWKFMain(gProgressRoleId, argOwnOuId);
			}
			else
			{
				if(nOwnOuIdLen == 4 && argInChargeOu.length == 4 && argOwnOuId != argInChargeOu)
				{
					SetRole(argRoleId, argRoleName, "", "");
					return "內會";
				}
				else
				{
					SetRole(argRoleId, argRoleName, "", "");
					//1101109 David 如傳送對象為個人，依環境變數設定的異動別帶入
					//return gTxNameForInternalOu;
					if(argToUserId != "")
						return gTxNameForInternalUser;
					else
						return gTxNameForInternalOu;
				}
			}
		}
		//9 ===========================================================================
		if (argOwnOuId.substr(0, 2) == argInChargeOu.substr(0, 2)) //9
		{
			if(nOwnOuIdLen == 4 && argInChargeOu.length == 4 && argOwnOuId != argInChargeOu)
			{
				SetRole(argRoleId, argRoleName, "", "");
				return "內會";
			}
			else
			{
				SetRole(argRoleId, argRoleName, "", "");
				//1101109 David 如傳送對象為個人，依環境變數設定的異動別帶入
				//return gTxNameForInternalOu;
				if(argToUserId != "")
					return gTxNameForInternalUser;
				else
					return gTxNameForInternalOu;
			}
		}
		//10 ===========================================================================
		//1120926	Joe		1120526		調整該依原始代碼判斷
		// if (nOwnOuIdLen == 2 && T < 91 && argOwnOuId != argInChargeOu.substr(0, 2) && (argRoleId == "" || argRoleId == "OD16")) //10
		if (nOwnOuIdLen == 2 && (T.indexOf("9") != 0 || T == "90") && argOwnOuId != argInChargeOu.substr(0, 2) && (argRoleId == "" || argRoleId == "OD16")) //10
		{
			SetRole(argRoleId, argRoleName, "OD16", "分辦人員");
			if (argIsAddPoint) //插入流程點
			{
				if (argRadioSelected1 == "1")
					return "改分";
				else if (argRadioSelected1 == "2")
					return gTxNameForExternalOu;
				else if (argRadioSelected1 == "3")
					return "分會";
				else if (argRadioSelected1 == "4")
					return gTxNameForAfterAPPOu;
					//1130626	Joe		1130047		新增內分會選項
				else if (argRadioSelected1 == "6")
					return "內分會";
				else
					return gTxNameForExternalOu;
			}
			else
				return gTxNameForExternalOu;
		}
		//11 ===========================================================================
			//1120926	Joe		1120526		調整該依原始代碼判斷
		// if (nOwnOuIdLen > 2 && T < 91 && argOwnOuId != argInChargeOu.substr(0, 2)) //11
		if (nOwnOuIdLen > 2 && (T.indexOf("9") != 0 || T == "90") && argOwnOuId != argInChargeOu.substr(0, 2)) //11
		{
			if (argWmsgOwnOuId != "" && argWmsgOwnOuId != argOwnOuId.substr(0, 2))
			{
				SetRole(argRoleId, argRoleName, "", "");
				//1100319 David 1100229 二級單位支援後會
				//return gTxNameForExternalOu;
				if (argRadioSelected1 == "4")
					return gTxNameForAfterAPPOu;
				else
					return gTxNameForExternalOu;
			}
			else if (argWmsgOwnOuId != "" && argWmsgOwnOuId == argOwnOuId.substr(0, 2))
			{
				if (argRoleId == "OD11" || argRoleId == "OD12" || argRoleId == "OD13"
					//1111012 David 長官角色判斷新增OD14、OD15
					|| argRoleId == "OD14" || argRoleId == "OD15"
					|| argRoleId == "OD21" || argRoleId == "OD22"
					|| argRoleId == "OD31" || argRoleId == "OD32"
					|| argRoleId == "OD41" || argRoleId == "OD42"
					|| argRoleId == "OD51" || argRoleId == "OD52") //8
				{
					SetRole(argRoleId, argRoleName, "", "");
					//1131104	Joe		1130986		新增依主流程簽核異動別帶出預設名稱
					// return "送請簽核";
					return GetTxNameFromWWKFMain(gProgressRoleId, argOwnOuId);
				}
				else
				{
					SetRole(argRoleId, argRoleName, "", "");
					//1100319 David 1100229 二級單位支援後會
					//return gTxNameForInternalOu;
					//1101109 David 如傳送對象為個人，依環境變數設定的異動別帶入
					if(argToUserId != "")
						return gTxNameForInternalUser;
					else
					{
						if (argRadioSelected1 == "4")
							return gTxNameForAfterAPPOu;
						else if(document.all.txMode.value == "2") //1110119 David 1101462 會辦單位使用時視為內會
							return gTxNameForInternalOu;
						else
							return gTxNameForExternalOu;
					}
				}
			}
			else if (argInChargeOu.substr(0, 2) == argOwnOuId.substr(0, 2))
				return "退回";
			else
			{
				//1100319 David 1100229 二級單位支援後會
				//return gTxNameForExternalOu;
				if (argRadioSelected1 == "4")
					return gTxNameForAfterAPPOu;
				else
					return gTxNameForExternalOu;
			}
		}
		//12 ===========================================================================
			//1120926	Joe		1120526		調整該依原始代碼判斷
		// if (nOwnOuIdLen == 2 && T < 91 && argOwnOuId != argInChargeOu.substr(0, 2) && argRoleId != "") //12
		if (nOwnOuIdLen == 2 && (T.indexOf("9") != 0 || T == "90") && argOwnOuId != argInChargeOu.substr(0, 2) && argRoleId != "") //12
		{
			if (argOwnOuId.substr(0, 2) == argWmsgOwnOuId)
			{
				
				if (argRoleId == "OD11" || argRoleId == "OD12" || argRoleId == "OD13"
					//1111012 David 長官角色判斷新增OD14、OD15
					|| argRoleId == "OD14" || argRoleId == "OD15"
					|| argRoleId == "OD21" || argRoleId == "OD22"
					|| argRoleId == "OD31" || argRoleId == "OD32"
					|| argRoleId == "OD41" || argRoleId == "OD42"
					|| argRoleId == "OD51" || argRoleId == "OD52") //8
				{
					SetRole(argRoleId, argRoleName, "", "");
					//1131104	Joe		1130986		新增依主流程簽核異動別帶出預設名稱
					// return "送請簽核";
					return GetTxNameFromWWKFMain(gProgressRoleId, argOwnOuId);
				}
				else
				{
					SetRole(argRoleId, argRoleName, "", "");
					//1101109 David 如傳送對象為個人，依環境變數設定的異動別帶入
					//return gTxNameForInternalOu;
					if(argToUserId != "")
						return gTxNameForInternalUser;
					else
						return gTxNameForInternalOu;
				}
			}
			else
			{
				SetRole(argRoleId, argRoleName, "", "");
				//1120721 David 支援後會
				//return gTxNameForExternalOu;
				if (argRadioSelected1 == "4")
					return gTxNameForAfterAPPOu;
				else
					return gTxNameForExternalOu;
			}
		}
	}

	if (gProgressRoleId == "")  //不符合以上條件
		return "";

	return strTxName;
}

function SetRole(argRoleId, argRoleName, argRoleIdDefault, argRoleNameDefault)
{
	if (argRoleId == "") //若未指定roleId則自動帶default
	{
		gProgressRoleId = argRoleIdDefault;
		gProgressRoleName = argRoleNameDefault;
	}
	else
	{
		gProgressRoleId = argRoleId;
		gProgressRoleName = argRoleName;
	}
}
//全選的FUNCTION
function fnSelectAll()
{
	for (var i = 1 ; i < document.all.dg1.rows.length ; i++)
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		//1110119 David 1101462 支援會辦使用，調整判斷
		//if(cbCheckObj && !cbCheckObj.disabled)
		if(cbCheckObj && !cbCheckObj.disabled && !cbCheckObj.hidden)
			cbCheckObj.checked = true;
	}
}

//反向的FUNCTION
function fnSelectInverse()
{
	var len = document.all.dg1.rows.length;
	for (var i = 1 ; i < len ; i++)
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		//1110119 David 1101462 支援會辦使用，調整判斷
		//if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked)
		if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked && !cbCheckObj.hidden)
			cbCheckObj.checked = false;
	}
}

//刪除流程點
function fnDelete()
{
	if (!IsRowSelected()) return;

	//會辦單位不可刪除非自已新增的流程
	var OdCoworkDeptModFlow = gDocInfo.OD_COWORK_DEPT_MOD_FLOW;
	//公文承辦單位
	var DeptNo = gDocInfo.IcOuId;
	//目前單位
	var OwnOuId = gDocInfo.OwnOuId;

	if (DeptNo.length >= 3)
		DeptNo = DeptNo.substr(0, 2);
	if (OwnOuId.length >= 3)
		OwnOuId = OwnOuId.substr(0, 2);

	for (var i = document.all.dg1.rows.length -1; i > 0 ; i--)//刪除流程時要由大到小逐一刪除
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		//1110926	Joe		1110629		UI調整，新增單筆刪除功能
		//if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked)
		if ((cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked && singleRowIndex == "") || i == singleRowIndex)
		{
			var nRowIdx = GetTableRowIdx(document.all.dg1.rows[i].cells[0].innerHTML, "cbCheck");
			if (OdCoworkDeptModFlow == "1")
			{
				var CreatUser = document.all["txCreateBy" + nRowIdx].value;//流程建立者

				if (OwnOuId != DeptNo) //單位不同代表會辦
				{
					//1061130 David 修正取得目前人員帳號錯誤問題
					//if (CreatUser != OwnUserName)//不是自已建立的
					if (CreatUser.toUpperCase() != theUserInfo.UserName.toUpperCase())//不是自已建立的
					{
						alert("會辦人員不可刪除非自已維護的流程");
						return;
					}
				}
			}

			document.all.dg1.deleteRow(i);
			nTableRowNow--;
		}
	}
	
	bChange = true;//1061106 David 1060748 紀錄是否有異動
	SetDgColor();//1061106 David 1060748 新增底色處理
}

//判斷是否選取
function IsRowSelected()
{
	var bSelect = false;
	for (var i = 1 ; i < document.all.dg1.rows.length ; i++)
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked)
		{
			bSelect = true;
			break;
		}
	}

	//1110926	Joe		1110629		新增判斷單筆刪除
	// if (!bSelect)
	if (!bSelect && singleRowIndex == "")
	{
		alert("請先選擇流程");
		return false;
	}
	return true;
}

function GetelectedIndex()
{
	var rtnArr = new Array();
	for (var i = 1 ; i < document.all.dg1.rows.length ; i++)
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked)
			rtnArr.push(i);
	}
	return rtnArr;
}

function CheckTop(argIndex)
{
	if(argIndex == 1)
		return true;

	var cbCheckObj = document.all.dg1.rows[argIndex-1].cells[0].childNodes[0];
	if(cbCheckObj && cbCheckObj.disabled)
		return true;

	return false;
}

function fnMoveUp()
{
	if (!IsRowSelected()) return;

	//1110925	Joe		1110629		UI調整--S
	//取得有勾選的Index
	//var nRowSelectedIndex = GetelectedIndex();
	var nRowSelectedIndex;
	if (singleRowIndex == "")
		nRowSelectedIndex = GetelectedIndex();
	else
	{
		var rtnArr = new Array();
		rtnArr.push(singleRowIndex);
		nRowSelectedIndex = rtnArr;
		singleRowIndex = "";
	}
	//1110925	Joe		1110629		UI調整--E


	if (CheckTop(nRowSelectedIndex[0]))
	{
		alert('已至最上筆');
		return;
	}

	var nRowIdx = GetTableRowIdx(document.all.dg1.rows[nRowSelectedIndex[0]].cells[0].innerHTML, "cbCheck");

	var len = nRowSelectedIndex.length;
	for (var i = 0 ; i < len ; i++)//由小到大移動
	{
		var idx = nRowSelectedIndex[i];
		fnExchangeTableRow(idx, idx - 1);
		nRowSelectedIndex[i] = idx - 1;
	}
	bChange = true;//1061106 David 1060748 紀錄是否有異動
	SetDgColor();//1061106 David 1060748 新增底色處理
}

function fnMoveDown()
{
	if (!IsRowSelected()) return;

	//1110925	Joe		1110629		UI調整--S

	//取得有勾選的Index
	//var nRowSelectedIndex = GetelectedIndex();
	var nRowSelectedIndex;
	if (singleRowIndex == "")
		nRowSelectedIndex = GetelectedIndex();
	else {
		var rtnArr = new Array();
		rtnArr.push(singleRowIndex);
		nRowSelectedIndex = rtnArr;
		singleRowIndex = "";
	}
	//1110925	Joe		1110629		UI調整--E
	var endIdx = nRowSelectedIndex[nRowSelectedIndex.length - 1];
	if (endIdx == document.all.dg1.rows.length - 1)
	{
		alert('已至最末筆');
		return;
	}

	//1110119 David 1101462 會辦預排流程，不允許移動到主辦排出的流程之後
	//1110819 David 支援會辦單位依設定判斷可否維護預排流程功能
	//if(document.all.txMode.value == "2")
	if(gDocInfo.OD_COWORK_DEPT_MOD_FLOW == "1" && document.all.txMode.value == "2")
	{
		var cbCheckObj = document.all.dg1.rows[endIdx+1].cells[0].childNodes[0];
		if(cbCheckObj && cbCheckObj.hidden)
		{
			alert('不允許移動到主辦排出的流程之後');
			return;
		}
	}

	var nRowIdx = GetTableRowIdx(document.all.dg1.rows[endIdx].cells[0].innerHTML, "cbSignF");

	var len = nRowSelectedIndex.length - 1;
	for (var i = len ; i > -1 ; i--)//由大到小移動
	{
		var idx = nRowSelectedIndex[i];
		fnExchangeTableRow(idx, idx + 1);
		nRowSelectedIndex[i] = idx + 1;
	}
	bChange = true;//1061106 David 1060748 紀錄是否有異動
	SetDgColor();//1061106 David 1060748 新增底色處理
}

//對調兩筆table row
function fnExchangeTableRow(nRowIdxSelected, nRowIdxNext)
{
	var pTmpAry = Array()
	var bNowItemChecked = false;//紀錄原本的"選"是否勾選
	var bNextItemChecked = false;//紀錄要被交換的"選"是否勾選

	//keep target row(nRowIdxNext) value
	for (var i = 0; i < dgColumnLength; i++)
	{
		pTmpAry[i] = document.all.dg1.rows[nRowIdxNext].cells[i].innerHTML;
		if(i == 0)//紀錄原本的"選"是否勾選
		{
			var cbNextSelectCheckObj = document.all.dg1.rows[nRowIdxNext].cells[0].childNodes[0];
			bNextItemChecked = cbNextSelectCheckObj.checked;
		}
	}
	//Set Target row value = selected row value
	for (var i = 0; i < dgColumnLength; i++)
	{
		if(i == 0)//紀錄要被交換的"選"是否勾選
		{
			var cbNowSelectCheckObj = document.all.dg1.rows[nRowIdxSelected].cells[0].childNodes[0];
			bNowItemChecked = cbNowSelectCheckObj.checked;
		}

		document.all.dg1.rows[nRowIdxNext].cells[i].innerHTML = document.all.dg1.rows[nRowIdxSelected].cells[i].innerHTML;

		if(i == 0)
		{
			var cbNowSelectCheckObj = document.all.dg1.rows[nRowIdxNext].cells[0].childNodes[0];
			cbNowSelectCheckObj.checked = bNowItemChecked;
		}
	}

	//Set source row = target row old value
	for (var i = 0; i < dgColumnLength; i++)
	{
		document.all.dg1.rows[nRowIdxSelected].cells[i].innerHTML = pTmpAry[i];
		if(i == 0)
		{
			var cbNextSelectCheckObj = document.all.dg1.rows[nRowIdxSelected].cells[0].childNodes[0];
			cbNextSelectCheckObj.checked = bNextItemChecked;
		}
	}
}

//因為寫入Table可能是用insert的方式加入，因此每個table的row，在要取得隱藏欄位的值時
//所使用的RowIdx可能沒有按照順序，所以用此function來取得RowIdx
function GetTableRowIdx(argHtml, argKeyWord)
{
	var pI = argHtml.indexOf(argKeyWord);
	var nRowIdx = 0;
	var pTmpStr = "";

	if (pI != -1)
	{
		pTmpStr = argHtml.substr(pI + argKeyWord.length);
		pI = pTmpStr.indexOf(" ");
		pTmpStr = pTmpStr.substr(0, pI);
		try
		{
			nRowIdx = parseInt(pTmpStr);
		}
		catch (e)
		{
			nRowIdx = 0;
		}
	}
	return nRowIdx;
}

//儲存處理
function fnSave()
{
	var wwkfSaveObj = [];
	var IsHandleNextFlow = false;
	var CoworkAppOuId = "";
	var CoworkEndType = "0";
	//1100716 David 1100433 高大儲存時檢核OD01前要有OD05
	var bNukHasOD01 = false;
	var bNukHasOD05 = false;

	for (var iRow = 1 ; iRow < document.all.dg1.rows.length ; iRow++)
	{
		var nRowIdx = GetTableRowIdx(document.all.dg1.rows[iRow].cells[0].innerHTML,"cbCheck");
		var SaveItem;

		var HideInfos = document.all.dg1.rows[iRow].cells[0];

		var SIGN_F = HideInfos.childNodes[0].disabled ? 'Y' : 'N';
		var nowUserId = HideInfos.childNodes[1].value;
		var nowOuId = HideInfos.childNodes[2].value;
		var nowRoleId = HideInfos.childNodes[3].value;

		var nowOuName = document.all.dg1.rows[iRow].cells[1].innerText;
		var nowRoleName = document.all.dg1.rows[iRow].cells[2].innerText;
		var nowUserName = document.all.dg1.rows[iRow].cells[3].innerText;
		var nowTxName = document.all.dg1.rows[iRow].cells[4].innerText;

		//1130626	Joe		1130047		新增內分會選項
		//if(nowTxName != "分會")
		if(nowTxName != "分會" && nowTxName != "內分會")
		{
			SaveItem = $.extend({}, wwkfItem);
			
			//1100716 David 1100433 高大儲存時檢核OD01前要有OD05
			if(parent.SSO_CONFIG.OrgNickName == "NUK")
			{
				if(SIGN_F == "N")
				{
					if(nowRoleId == "OD05")
						bNukHasOD05 = true;
					else if(nowRoleId == "OD01")
						bNukHasOD01 = true;
				}
				
				if(bNukHasOD01 && !bNukHasOD05)
				{
					alert("流程預計傳送至校長，需先傳送給主秘，請調整預排流程後再儲存");
					return;
				}
			}
		}
		else
		{
			SaveItem = $.extend({}, wwkfCoworkItem);
			SaveItem.COWORK_OPTIONS = [];
		}

		SaveItem.OWN_USER_ID = nowUserId;
		SaveItem.OWN_USER_NAME = nowUserName;
		SaveItem.OWN_OU_ID = nowOuId;
		SaveItem.OWN_OU_NAME = nowOuName;
		SaveItem.OWN_ROLE_ID = nowRoleId;
		SaveItem.OWN_ROLE_NAME = nowRoleName;
		SaveItem.CREATE_BY = HideInfos.childNodes[4].value;
		SaveItem.SEND_BY = HideInfos.childNodes[5].value;
		SaveItem.SEND_TIME = HideInfos.childNodes[6].value;
		SaveItem.ADDBY = HideInfos.childNodes[7].value;
		SaveItem.RADIO_SELECTED_1 = HideInfos.childNodes[8].value;
		SaveItem.SIGN_F = HideInfos.childNodes[0].disabled ? 'Y' : 'N';
		SaveItem.TX_NAME = nowTxName;

		//當tx_name為分會時要增加COWORK_OPTIONS節點
		//1130626	Joe		1130047		新增內分會選項
		//if(nowTxName == "分會" && document.all["txTreadInfo"+nRowIdx])
		if ((nowTxName == "分會" || nowTxName == "內分會")  && document.all["txTreadInfo"+nRowIdx])
		{
			var $txTreadInfo = $(document.all["txTreadInfo"+nRowIdx]);

			var strOuId   = $txTreadInfo.attr("OwnOuId").split('|');
			var strOuName   = $txTreadInfo.attr("OwnOuName").split('|');
			var strRoleId = $txTreadInfo.attr("OwnRoleId").split('|');
			var strRoleName = $txTreadInfo.attr("OwnRoleName").split('|');
			var strUserId = $txTreadInfo.attr("OwnUserId").split('|');
			var strUserName = $txTreadInfo.attr("OwnUserName").split('|');

			for( OuNum = 0 ; OuNum < strOuId.length ; OuNum++)
			{
				var CoworkItem = $.extend({}, wwkfItem);

				CoworkItem.OWN_USER_ID = strUserId[OuNum];
				CoworkItem.OWN_USER_NAME = strUserName[OuNum];
				CoworkItem.OWN_OU_ID = strOuId[OuNum];
				CoworkItem.OWN_OU_NAME = strOuName[OuNum];
				CoworkItem.OWN_ROLE_ID = strRoleId[OuNum];
				CoworkItem.OWN_ROLE_NAME = strRoleName[OuNum];
				CoworkItem.CREATE_BY = document.all["txCreateBy"+nRowIdx].value;
				CoworkItem.SEND_BY = "";
				CoworkItem.SEND_TIME = "";
				CoworkItem.ADDBY = document.all["txAddBy"+nRowIdx].value;
				CoworkItem.RADIO_SELECTED_1 = document.all["txRadioSelected1"+nRowIdx].value;
				//1150109 David 序13 修正儲存後分會內節點SIGN_F資料異常問題
				//CoworkItem.SIGN_F = document.all["cbCheck"+nRowIdx].disabled ? 'Y' : 'N';
				CoworkItem.SIGN_F = SIGN_F;
				//1130626	Joe		1130047		新增內分會選項
				//CoworkItem.TX_NAME = "分會";
				CoworkItem.TX_NAME = nowTxName;
				
				SaveItem.COWORK_OPTIONS[OuNum] = CoworkItem;
			}
		}

		wwkfSaveObj[wwkfSaveObj.length] = SaveItem;

		var cbCheckObj = document.all.dg1.rows[iRow].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled && !IsHandleNextFlow)
		{
			IsHandleNextFlow = true;

			if (nowUserId != defTarget.UserId || nowOuId != defTarget.OUId || nowRoleId != defTarget.RoleId || nowTxName != defTarget.TxName)
			{
				IsDefChange = true;
				defTarget.TxName = nowTxName;
				defTarget.OUId = nowOuId;
				defTarget.RoleId = nowRoleId;
				defTarget.UserId = nowUserId;
				defTarget.OUName = nowOuName;
				defTarget.RoleName = nowRoleName;
				defTarget.UserName = nowUserName;
			}
		}
	}
	//1061103 David 1060748 修正回傳物件轉為JSONstr後回傳，避免IE因物件回傳後關閉網頁，導致後續程式異常
	//theAOL.docObj.updateODWWKF(wwkfSaveObj);
	var swwkfSaveObj = JSON.stringify(wwkfSaveObj);
	theAOL.docObj.updateODWWKF_Str(swwkfSaveObj);

	if(window.confirm('儲存完畢，是否離開？'))
	{
		//1110812 David 儲存時將是否有異動資訊設定給theAOL.docObj.wwkfModified，供公文關閉時判斷是否需提醒
		if(bChange)
			theAOL.docObj.wwkfModified = true;

		//1061011 David 將預計傳送對象資訊同步至畫面傳送選項
		parent.SSOUtil.updateTransTarget_WWKF(defTarget);

		parent.$('#simplemodal-container a.simplemodal-close').trigger('click');
	}
}

//新增機關共用流程
function fnAddWorkFlow()
{
	var strFlowNo = document.all.ddlWorkFlow.options[document.all.ddlWorkFlow.selectedIndex].value;
    //1070830 Justin [1070678]弱掃AJAX修改
    //var FlowObj = EDT217.GetFlow(gDocInfo.uOrgNo, strFlowNo).value;
    var FlowObj = ED2.EDT217.GetFlow(gDocInfo.uOrgNo, strFlowNo).value;
	if(FlowObj)
	{
		if(FlowObj.bSuccess)
		{
			if (FlowObj.OuId.length > 0)
			{
				var pRadioSelected1 = "2"; //RadioSelected1  (1:改分, 2:順會, 3:分會, 4:後會) 預設值 2
				if(gDocInfo.AppUserName != "")
					pRadioSelected1 = "4";

				//1150109 David 1141613 修正新增機關共用流程，有選則插入位置時，插入順序會相反問題
				/*for (var iFlows = 0; iFlows < FlowObj.OuId.length ; iFlows++)
				{
					var strOuId = FlowObj.OuId[iFlows];
					var strOuName = FlowObj.OuName[iFlows];
					var strRoleNo = FlowObj.RoleNo[iFlows];
					var strRoleName = FlowObj.RoleName[iFlows];
					var strUserName = FlowObj.UserName[iFlows];
					var strEmpName = FlowObj.EmpName[iFlows];
					var strTxName = FlowObj.TxName[iFlows];
					
					//1120926	Joe		1120526		調整該依原始代碼判斷
					// var iTargetOuId = parseInt(strOuId.substr(0, 2), 10);
					var TargetOuId = strOuId.substr(0, 2);
					
					// AddFlowPoint(strUserName, strEmpName, strOuId, strOuName, strRoleNo, strRoleName, pRadioSelected1, strTxName, iTargetOuId);
					AddFlowPoint(strUserName, strEmpName, strOuId, strOuName, strRoleNo, strRoleName, pRadioSelected1, strTxName, TargetOuId);
				}*/
				let bHasChecked = false;
				for(let idg = document.all.dg1.rows.length-1 ; idg > 0 ; idg--)
				{
					let cbCheckObj = document.all.dg1.rows[idg].cells[0].childNodes[0];
					if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked)//判斷最後一個勾選的流程
					{
						bHasChecked = true;
						break;
					}
				}

				let len = FlowObj.OuId.length;
				for (let iFlows = 0; iFlows < len; iFlows++) {
					// 當 bHasChecked 為 true 時，計算出的idx索引會從後面開始
					let idx = bHasChecked ? (len - 1 - iFlows) : iFlows;
					let strOuId = FlowObj.OuId[idx];
					let strOuName = FlowObj.OuName[idx];
					let strRoleNo = FlowObj.RoleNo[idx];
					let strRoleName = FlowObj.RoleName[idx];
					let strUserName = FlowObj.UserName[idx];
					let strEmpName = FlowObj.EmpName[idx];
					let strTxName = FlowObj.TxName[idx];
					
					let TargetOuId = strOuId.substr(0, 2);
					AddFlowPoint(strUserName, strEmpName, strOuId, strOuName, strRoleNo, strRoleName, pRadioSelected1, strTxName, TargetOuId);
				}
			}
		}
		else
		{
			alert(FlowObj.ErrMsg);
		}
	}
}

//新增分會流程
//1110926	Joe		1110629		調整UI
//function fnAddThread()
function fnAddThread(argOuList)
{
	//1110926	Joe		1110629		調整UI，資料來源改由畫面取得
	/*
	var ThreadUrl = GetThreadWapeUrl();

	var $dlg = $("#EDT217");
	var w = $dlg.width() + 5;
	var h = $dlg.height() + 5;
	var $pane = $dlg.find("div#WWKF_COWORK_DIV");
	$("div#WWKF_COWORK_DIV")[0].style="width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:0"
	$("div#WWKF_COWORK_DIV").show();

	var $frame = $pane.find('#WWKF-CoworkPage');
	if ($frame.length && ThreadUrl.length) {
		$("#BaseTable").hide();
		$("#tbTool").hide();
		$("#SetupBtn").hide();
		$frame[0].style = "width: 100%; height: 98%;";
		$frame[0].src = ThreadUrl;
	}
	
	$("div#WWKF_COWORK_DIV").find("#Dlg_NewThread_close_btn").click(function(event, obj)
	{
		var $pane = $("div#WWKF_COWORK_DIV");
		var $frame = $pane.find('#WWKF-CoworkPage');
		$frame[0].src = "";
		$("div#WWKF_COWORK_DIV").hide();
		$("div#WWKF_COWORK_DIV").find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
		$("div#WWKF_COWORK_DIV").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
		$("#BaseTable").show();
		$("#tbTool").show();
		$("#SetupBtn").show();

	*/
		//1110926	Joe		1110629		調整分會UI
		// if(localStorage.MsCoworkRtn && localStorage.MsCoworkRtn != "")
		// {
			// var arrOuList = localStorage.MsCoworkRtn.split("|");
			// localStorage.MsCoworkRtn = "";
		if(argOuList != "")
		{
			var arrOuList = argOuList.split("|");
			
			//1121110	Joe		--			修正分會檢核邏輯
			if(arrOuList.length <= 1)
			{
				alert("分會對象至少選取兩位以上");
				return;
			}

			//1101206 David 1101392 新增檢核會辦單位是否有登記桌人員
			//1130723	Joe		內分會不檢核
			if (!(document.all.rbDeptNow.checked == true && document.all.rbCoworkTypeInside2.checked == true))
			{
				let strCheckMsg = "";
				let strTargetRoleNo = "OD16";
				if(theAOL.docObj.signType == "P")
					strTargetRoleNo = "OD17";
				for(let i=0;i < arrOuList.length;i++)
				{
					let arrOuInfo = arrOuList[i].split(";");
					let strOuId = arrOuInfo[0];
					let RolePlayObj = ED2.EDT217.CheckRolePlay(jf_GetArtifact(), document.all.OrgNo.value, strOuId, strTargetRoleNo).value;
					if(RolePlayObj)
					{
						if(RolePlayObj.bSuccess)
						{
							if (RolePlayObj.CheckMsg != "")
							{
								if(strCheckMsg != "")
									strCheckMsg += "，";
								strCheckMsg += RolePlayObj.CheckMsg;
							}
						}
						else
						{
							alert("無法加入分會流程：" + RolePlayObj.ErrMsg);
							return;
						}
					}
				}
				if(strCheckMsg != "")
				{
					alert("無法加入分會流程：" + strCheckMsg + "，請重新確認會辦對象後重新設定");
					return;
				}
			}
				
			var InsertIndex = fnGetInsertRowIndex();

			//Insert Row
			var NewRow = document.all.dg1.insertRow(InsertIndex);
			nTableRowNow++;
			nTableRowMax++;

			for (var j = 0; j < dgColumnLength; j++)
				document.all.dg1.rows[InsertIndex].insertCell(j);
			
			var strInnerHtml = "";

			//隱藏欄位
			var pNodeVal = "";
			strInnerHtml = "<INPUT id=\"txOwnUserId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = "";
			strInnerHtml += "<INPUT id=\"txOwnOuId" + nTableRowMax + "\" type=\"hidden\" name=\"txOwnOuId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = "";
			strInnerHtml += "<INPUT id=\"txOwnRoleId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRoleId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = parent.theUserInfo.UserName;
			strInnerHtml += "<INPUT id=\"txCreateBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = "";//SEND_BY
			strInnerHtml += "<INPUT id=\"txSendBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = "";//SEND_TIME
			strInnerHtml += "<INPUT id=\"txSendTime" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

			pNodeVal = "1"//加入方式 (0:加入流程, 1:加入流程點)
			strInnerHtml += "<INPUT id=\"txAddBy" + nTableRowMax + "\" type=\"hidden\" name=\"txAddBy" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

			pNodeVal = "3";//(1:改分, 2:順會, 3:分會) 
			strInnerHtml += "<INPUT id=\"txRadioSelected1" + nTableRowMax + "\" type=\"hidden\" name=\"txRadioSelected1" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

			var strOuId = "";
			var strOuName = "";
			var strRoleId = "";
			var strRoleName = "";
			var strUserId = "";
			var strUserName = "";
			var strOuNameList ="";
			//1130626	Joe		1130047		新增內分會選項
			let strOuInfoStamp = "";
			let strOuShowStamp = "";
			for(var i=0;i < arrOuList.length;i++)
			{
				//1130626	Joe		1130047		新增內分會選項
				/*var arrOuInfo = arrOuList[i].split(";");
				strOuId += arrOuInfo[0];
				if(i !=arrOuList.length-1)
					strOuId += "|";
				strOuName += arrOuInfo[1];
				if(i != arrOuList.length-1)
					strOuName += "|";
				strRoleId += "";
				if(i != arrOuList.length-1)
					strRoleId += "|";
				strRoleName += "";
				if(i != arrOuList.length-1)
					strRoleName += "|";
				strUserId += "";
				if(i != arrOuList.length-1)
					strUserId += "|";
				strUserName += "";
				if(i != arrOuList.length-1)
					strUserName += "|";
				strOuNameList += arrOuInfo[1];
				if(i != arrOuList.length-1)
					strOuNameList += ",";*/
				let arrOuInfo = arrOuList[i].split(";");
				strOuId += strOuInfoStamp + arrOuInfo[0];
				strOuName += strOuInfoStamp + arrOuInfo[1];
				strRoleId += strOuInfoStamp + arrOuInfo[2];
				strRoleName += strOuInfoStamp + arrOuInfo[3];
				strUserId += strOuInfoStamp + arrOuInfo[4];
				strUserName += strOuInfoStamp + arrOuInfo[5];

				strOuNameList += strOuShowStamp + arrOuInfo[1];
				if(arrOuInfo[5] != "")
					strOuNameList += "(" + arrOuInfo[5] + ")";

				strOuInfoStamp = "|";
				strOuShowStamp = ",";
			}
			//1100506 David 1100473 弱掃修正Client DOM Stored XSS
			//strInnerHtml += "<INPUT id=\"txTreadInfo"+nTableRowMax+"\" type=\"hidden\" name=\"txTreadInfo"+nTableRowMax+"\" OwnOuId="+strOuId+" OwnRoleId="+strRoleId+" OwnUserId="+strUserId+" OwnOuName="+strOuName+" OwnRoleName="+strRoleName+" OwnUserName="+strUserName+">"
			strInnerHtml += "<INPUT id=\"txTreadInfo"+nTableRowMax+"\" type=\"hidden\" name=\"txTreadInfo"+nTableRowMax+"\" OwnOuId="+htmlencode(strOuId)+" OwnRoleId="+htmlencode(strRoleId)+" OwnUserId="+htmlencode(strUserId)+" OwnOuName="+htmlencode(strOuName)+" OwnRoleName="+htmlencode(strRoleName)+" OwnUserName="+htmlencode(strUserName)+">"

			//選+隱藏欄位
			//1061106 David 1060748 新增選勾選後底色處理
			//document.all.dg1.rows[InsertIndex].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\">" + strInnerHtml;
			document.all.dg1.rows[InsertIndex].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" onclick=\"fnSetColor("+nTableRowMax+")\">" + strInnerHtml;
			//單位
			//1100506 David 1100473 弱掃修正Client DOM Stored XSS
			//document.all.dg1.rows[InsertIndex].cells[1].innerHTML = strOuNameList;
			document.all.dg1.rows[InsertIndex].cells[1].innerHTML = htmlencode(strOuNameList);
			//角色
			document.all.dg1.rows[InsertIndex].cells[2].innerHTML = "";
			//人員
			document.all.dg1.rows[InsertIndex].cells[3].innerHTML = "";
			//異動別
			//1130626	Joe		1130047		新增內分會選項
			//document.all.dg1.rows[InsertIndex].cells[4].innerHTML = "分會";
			if (document.all.rbDeptCowork.checked && document.all.rbCoworkType3.checked == true)
				document.all.dg1.rows[InsertIndex].cells[4].innerHTML = "分會";
			else
				document.all.dg1.rows[InsertIndex].cells[4].innerHTML = "內分會";

			//分會明細按鈕
			//1110925	Joe		1110629		UI調整
			//document.all.dg1.rows[InsertIndex].cells[5].innerHTML = "<INPUT id=\"btShowDetail"+nTableRowMax+"\" type=\"button\" onclick=\"fnOpenThread("+nTableRowMax+")\" name=\"btShowDetail"+nTableRowMax+"\" value=\"明細\">" ;	
			document.all.dg1.rows[InsertIndex].cells[5].innerHTML = "<INPUT id=\"btMoveUp" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveUp(" + nTableRowMax + ")\" name=\"btMoveUp" + nTableRowMax + "\" value=\"↑\">";
			document.all.dg1.rows[InsertIndex].cells[5].innerHTML += "<INPUT id=\"btMoveDown" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveDown(" + nTableRowMax + ")\" name=\"btMoveDown" + nTableRowMax + "\" value=\"↓\">";
			document.all.dg1.rows[InsertIndex].cells[5].innerHTML += "<INPUT id=\"btDelete" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleDelete(" + nTableRowMax + ")\" name=\"btDelete" + nTableRowMax + "\" value=\"刪\">";

			//1080910 David 1080729 調整設定屬性方式統一使用Jquery語法
			/*if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
				document.all.dg1.rows[InsertIndex].style = "text-align:center;";
			else
				document.all.dg1.rows[InsertIndex].style.setAttribute("text-align", "center");*/
			$(NewRow).attr('style','text-align:center');

			bChange = true;//1061106 David 1060748 紀錄是否有異動

			//1061106 David 1060748 新增點選處理
			$(NewRow).bind('click', rowsOnClick);
		}
	//1110926	Joe		1110629		調整UI，資料來源改由畫面取得
	//});
}

//由既有的分會流程開啟設定視窗
function fnOpenThread(RowNum)
{
	var ThreadUrl = GetThreadWapeUrl();

	// 2017.6.3 - Eric - 1060292 - add RowNum
	var rowNum = parseInt(RowNum);
	if (!isNaN(rowNum)) {
		ThreadUrl += '&RowNum=' + RowNum;
	}
	
	//目前設定的分會單位資料
	var ArrOuList= fnGetTreadArray(RowNum);
	var ParamOuList = "";
	var ParamOuListStamp = "";
	for(var i = 0 ; i < ArrOuList.length ; i++)
	{
		ParamOuList += ParamOuListStamp + ArrOuList[i][0];
		ParamOuListStamp = "|";
	}
	ThreadUrl += "&OuList=" + ParamOuList;

	var $dlg = $("#EDT217");
	var w = $dlg.width() + 5;
	var h = $dlg.height() + 5;
	var $pane = $dlg.find("div#WWKF_COWORK_DIV");
	$("div#WWKF_COWORK_DIV")[0].style="width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:0"
	$("div#WWKF_COWORK_DIV").show();

	var $frame = $pane.find('#WWKF-CoworkPage');
	if ($frame.length && ThreadUrl.length){
		$("#BaseTable").hide();
		$("#tbTool").hide();
		$("#SetupBtn").hide();
		$frame[0].style = "width: 100%; height: 98%;";
		$frame[0].src = ThreadUrl;
	}
	$("div#WWKF_COWORK_DIV").find("#Dlg_ModifyThread_close_btn").click(function(event, obj)
	{
		var $pane = $("div#WWKF_COWORK_DIV");
		var $frame = $pane.find('#WWKF-CoworkPage');
		$frame[0].src = "";
		$("div#WWKF_COWORK_DIV").hide();
		$("div#WWKF_COWORK_DIV").find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
		$("div#WWKF_COWORK_DIV").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
		$("#BaseTable").show();
		$("#tbTool").show();
		$("#SetupBtn").show();

		if(localStorage.MsCoworkRtn && localStorage.MsCoworkRtn != "")
		{
			var arrOuList = localStorage.MsCoworkRtn.split("|");
			localStorage.MsCoworkRtn = "";

			var strOuId = "";
			var strOuName = "";
			var strRoleId = "";
			var strRoleName = "";
			var strUserId = "";
			var strUserName = "";
			var strOuNameList ="";
			for(var i=0;i < arrOuList.length;i++)
			{
				var arrOuInfo = arrOuList[i].split(";");
				strOuId += arrOuInfo[0];
				if(i !=arrOuList.length-1)
					strOuId += "|";
				strOuName += arrOuInfo[1];
				if(i != arrOuList.length-1)
					strOuName += "|";
				strRoleId += "";
				if(i != arrOuList.length-1)
					strRoleId += "|";
				strRoleName += "";
				if(i != arrOuList.length-1)
					strRoleName += "|";
				strUserId += "";
				if(i != arrOuList.length-1)
					strUserId += "|";
				strUserName += "";
				if(i != arrOuList.length-1)
					strUserName += "|";
				strOuNameList += arrOuInfo[1];
				if(i != arrOuList.length-1)
					strOuNameList += ",";
			}
			
			var $txTreadInfo = $(document.all["txTreadInfo"+RowNum]);

			$txTreadInfo.attr("OwnOuId", strOuId);
			$txTreadInfo.attr("OwnOuName", strOuName);
			$txTreadInfo.attr("OwnRoleId", strRoleId);
			$txTreadInfo.attr("OwnRoleName", strRoleName);
			$txTreadInfo.attr("OwnUserId", strUserId);
			$txTreadInfo.attr("OwnUserName", strUserName);
			for (var iRow = 1 ; iRow < document.all.dg1.rows.length ; iRow++)
			{
				if(document.all.dg1.rows[iRow].cells[0].innerHTML.indexOf("\"cbCheck" + RowNum  + "\"") != -1)
				{
					//1100506 David 1100473 弱掃修正Client DOM Stored XSS
					//document.all.dg1.rows[iRow].cells[1].innerHTML = strOuNameList;
					document.all.dg1.rows[iRow].cells[1].innerHTML = htmlencode(strOuNameList);
					break;
				}
			}
		}

		bChange = true;//1061106 David 紀錄是否有異動
	});
}

//取得分會資料
function fnGetTreadArray(RowNum)
{
	var rtn = new Array();
	var $txTreadInfo = $(document.all["txTreadInfo"+RowNum]);

	var strOuId   = $txTreadInfo.attr("OwnOuId").split('|');
	var strOuName   = $txTreadInfo.attr("OwnOuName").split('|');
	var strRoleId = $txTreadInfo.attr("OwnRoleId").split('|');
	var strRoleName = $txTreadInfo.attr("OwnRoleName").split('|');
	var strUserId = $txTreadInfo.attr("OwnUserId").split('|');
	var strUserName = $txTreadInfo.attr("OwnUserName").split('|');

	for(i = 0 ; i < strOuId.length ; i++)
	{
		rtn[i] = new Array(6);
		rtn[i][0] = strOuId[i];
		rtn[i][1] = strOuName[i];
		rtn[i][2] = strRoleId[i];
		rtn[i][3] = strRoleName[i];
		rtn[i][4] = strUserId[i];
		rtn[i][5] = strUserName[i];
	}
	return rtn;
}

//取得分會設定視窗網址
function GetThreadWapeUrl()
{
	var filename = "MS-Cowork_" + theAOL.docObj.sourceOrgNo + ".htm?Mode=3";
	var _href = window.location.href;
	var idxHttp = _href.indexOf('://');
	var idxFirstSlash = _href.substr(idxHttp+3).indexOf('/');
	var strHttp = _href.substr(0, idxHttp);
	var strServer = _href.substr(idxHttp+3, idxFirstSlash);
	var WebPage = strHttp + "://" + strServer + "/MS/" + filename;

	var tempTxName = "分會";
	WebPage += "&TX_NAME=" + escape(encodeURIComponent(tempTxName)) + "&SEQ_NO=";
	//單位代碼
	WebPage += "&DEPT_NO="+gDocInfo.IcOuId;
	//Artifact
	WebPage += "&SAMLart=" + jf_GetArtifact();
	//環境變數DeptShowMode
	WebPage += "&DeptShowMode=" + theSSO.User.EnvSettings.get("DeptShowMode");

	return WebPage;
}

//設定個人化預排流程選項選單
var iCallID_GetPerSonalWWKF = null;
function setPersonalFlowSet()
{
	if(bFirstWWKF)
	{
		//取得ODMSSP網址
		if(document.all.ODMSSP && document.all.ODMSSP.value != "")
		{
			//透過ODMSSP.GetPerSonalWWKF()取得目前角色個人化預排流程選項
			var param = new Array();
			param[0] = jf_GetArtifact();
			param[1] = gDocInfo.uOrgNo;
			param[2] = gDocInfo.OwnOuId;
			param[3] = gDocInfo.OwnRoleId != "" ? gDocInfo.OwnRoleId : "OD99";
			param[4] = gDocInfo.IcUserId;
			param[5] = "M";
			var callObj = jf_CallWS(document.all.ODMSSP.value,"GetPerSonalWWKF",false,param);
			iCallID_GetPerSonalWWKF = callObj.id;
			OnWSResult(callObj);
		}
	}
	else
		document.all.divHidePersonal.style.display = "none";
}

//設定可替換個人化預排流程功能
var iCallID_ProcPeraonalWWKF = null;
function ChangePersonalFlowSet()
{
	var strFlowSetSeq = document.all.dlPersonalFlowSet.options[document.all.dlPersonalFlowSet.selectedIndex].value;

	//透過ODMSSP.GetPerSonalWWKF()取得目前角色個人化預排流程選項
	var param = new Array();
	param[0] = jf_GetArtifact();
	param[1] = gDocInfo.uOrgNo;
	param[2] = strFlowSetSeq;
	var callObj = jf_CallWS(document.all.ODMSSP.value,"ProcPeraonalWWKF",false,param);
	iCallID_ProcPeraonalWWKF = callObj.id;
	OnWSResult(callObj);
}

function OnWSResult(argResult)
{
	if(argResult.id == iCallID_GetPerSonalWWKF)
	{
		var objPersonWWKF = argResult.value;
		if(objPersonWWKF.bSuccess)
		{
			var arrPersonalFlowSetValue = objPersonWWKF.arrValue;
			var arrPersonalFlowSetText = objPersonWWKF.arrText;

			if(arrPersonalFlowSetValue.length != 0)
			{
				fnClearDropDownList(document.all.dlPersonalFlowSet);
				for(var i = 0 ; i < arrPersonalFlowSetValue.length ; i++)
				{
					var objOption = new Option(arrPersonalFlowSetText[i], arrPersonalFlowSetValue[i]);
					document.all.dlPersonalFlowSet.options.add(objOption);
				}
				document.all.divHidePersonal.style.display = "";
			}
			else
			{
				//無個人化預排流程，選單不顯示
				document.all.divHidePersonal.style.display = "none";
			}
		}
		else
		{
			//取得個人化預排流程選項錯誤，選單不顯示
			document.all.divHidePersonal.style.display = "none";
			alert("取得個人化預排流程選項錯誤:" + objPersonWWKF.ErrMsg);
		}
	}
	else if(argResult.id == iCallID_ProcPeraonalWWKF)
	{
		var PersonalFlowSetName = document.all.dlPersonalFlowSet.options[document.all.dlPersonalFlowSet.selectedIndex].text;
		var objPersonFlowSet = argResult.value;
		if(objPersonFlowSet.m_bSuccess)
		{
			//將取得的預排流程XML字串轉成XML物件
			var xdoc = jQuery.parseXML(objPersonFlowSet.m_strRetStr);
			var $xml = $(xdoc);
			var $title = $xml.find( "item" );
			if($title.length == 0)
			{
				alert("流程選項[" + PersonalFlowSetName + "]未設定，無法替換");
			}
			else
			{
				var pNodeVal = "";
				ClearTable(document.all.dg1);
				nTableRowNow = 1;
				nTableRowMax = 0;

				for (var iRow = 0; iRow < $title.length; iRow++)
				{
					//1131001 Kevin 1130916 弱掃修正
					var OuId = htmlencode($($title[iRow]).find("OWN_OU_ID")[0].textContent);
					var OuName = htmlencode($($title[iRow]).find("OWN_OU_NAME")[0].textContent);
					var RoleId = htmlencode($($title[iRow]).find("OWN_ROLE_ID")[0].textContent);
					var RoleName = htmlencode($($title[iRow]).find("OWN_ROLE_NAME")[0].textContent);
					var UserId = htmlencode($($title[iRow]).find("OWN_USER_ID")[0].textContent);
					var UserName = htmlencode($($title[iRow]).find("OWN_USER_NAME")[0].textContent);
					var TxName = htmlencode($($title[iRow]).find("TX_NAME")[0].textContent);
					var CreateBy = htmlencode($($title[iRow]).find("CREATE_BY")[0].textContent);
					var SendBy = htmlencode($($title[iRow]).find("SEND_BY")[0].textContent);
					var SendTime = htmlencode($($title[iRow]).find("SEND_TIME")[0].textContent);
					var AddBy = htmlencode($($title[iRow]).find("ADDBY")[0].textContent);
					var RadioSekected1 = htmlencode($($title[iRow]).find("RADIO_SELECTED_1")[0].textContent);

					var nRowIdx = iRow + 1;
					//Insert Row
					//1081204 David 1080729 調整寫法
					//document.all.dg1.insertRow(nRowIdx);
					var NewRow = document.all.dg1.insertRow(nRowIdx);
					nTableRowNow++;
					nTableRowMax++;

					for (var j = 0; j < dgColumnLength; j++)
					{
						document.all.dg1.rows[nRowIdx].insertCell(j);
					}

					var strInnerHtml = "";

					if(iRow == 0)
					{
						defTarget.TxName = TxName;
						defTarget.OUId = OuId;
						defTarget.RoleId = RoleId;
						defTarget.UserId = UserId;
						defTarget.OUName = OuName;
						defTarget.RoleName = RoleName;
						defTarget.UserName = UserName;
					}

					//隱藏欄位
					pNodeVal = UserId;
					strInnerHtml = "<INPUT id=\"txOwnUserId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
					pNodeVal = OuId;
					strInnerHtml += "<INPUT id=\"txOwnOuId" + nTableRowMax + "\" type=\"hidden\" name=\"txOwnOuId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
					pNodeVal = RoleId;
					strInnerHtml += "<INPUT id=\"txOwnRoleId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRoleId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
					pNodeVal = CreateBy;
					strInnerHtml += "<INPUT id=\"txCreateBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
					pNodeVal = SendBy;
					strInnerHtml += "<INPUT id=\"txSendBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
					pNodeVal = SendTime;
					strInnerHtml += "<INPUT id=\"txSendTime" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

					pNodeVal = AddBy; //ADDBY  -- 加入方式 (0:加入流程, 1:加入流程點)
					if (pNodeVal == null) //ADDBY  -- 加入方式 (0:加入流程, 1:加入流程點)
						pNodeVal == "0"; //舊資料一律視為「加入流程」方式加入
					strInnerHtml += "<INPUT id=\"txAddBy" + nTableRowMax + "\" type=\"hidden\" name=\"txAddBy" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

					pNodeVal = RadioSekected1;
					if (pNodeVal == null) //RadioSelected1  (1:改分, 2:順會, 3:分會) 
						pNodeVal = "2"; //舊資料一律視為順會
					strInnerHtml += "<INPUT id=\"txRadioSelected1" + nTableRowMax + "\" type=\"hidden\" name=\"txRadioSelected1" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

					//選+隱藏欄位
					//1061106 David 1060748 新增選勾選後底色處理
					//document.all.dg1.rows[nRowIdx].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" >" + strInnerHtml;
					document.all.dg1.rows[nRowIdx].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" onclick=\"fnSetColor("+nTableRowMax+")\">" + strInnerHtml;
					//單位
					//1131001 Kevin 1130916 弱掃修正
					document.all.dg1.rows[nRowIdx].cells[1].innerHTML = htmlencode(OuName);
					//角色
					//1131001 Kevin 1130916 弱掃修正
					document.all.dg1.rows[nRowIdx].cells[2].innerHTML = htmlencode(RoleName);
					//人員
					//1131001 Kevin 1130916 弱掃修正
					document.all.dg1.rows[nRowIdx].cells[3].innerHTML = htmlencode(UserName);
					//異動別
					//1131001 Kevin 1130916 弱掃修正
					document.all.dg1.rows[nRowIdx].cells[4].innerHTML = htmlencode(TxName);
					//分會明細按鈕
					//1110925	Joe		1110629		UI調整
					//document.all.dg1.rows[nRowIdx].cells[5].innerHTML = "";
					document.all.dg1.rows[nRowIdx].cells[5].innerHTML = "<INPUT id=\"btMoveUp" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveUp(" + nTableRowMax + ")\" name=\"btMoveUp" + nTableRowMax + "\" value=\"↑\">";
					document.all.dg1.rows[nRowIdx].cells[5].innerHTML += "<INPUT id=\"btMoveDown" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveDown(" + nTableRowMax + ")\" name=\"btMoveDown" + nTableRowMax + "\" value=\"↓\">";
					document.all.dg1.rows[nRowIdx].cells[5].innerHTML += "<INPUT id=\"btDelete" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleDelete(" + nTableRowMax + ")\" name=\"btDelete" + nTableRowMax + "\" value=\"刪\">";

					//1080910 David 1080729 調整設定屬性方式統一使用Jquery語法
					/*if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
						document.all.dg1.rows[nRowIdx].style = "text-align:center;";
					else
					{
						document.all.dg1.rows[nRowIdx].style.setAttribute("text-align", "center");
						//1070508 David 1070536 修正誤植功能
						//if(objwwkf[iRow].SIGN_F.toUpperCase()=="Y")
						//	document.all.dg1.rows[nRowIdx].style.setAttribute("background-color", "darkgray");
					}*/
					$(NewRow).attr('style','text-align:center');

					bChange = true;//1061106 David 1060748 紀錄是否有異動
				}
			}
		}
		else
		{
			alert("取得[" + PersonalFlowSetName + "]流程設定錯誤:" + objPersonFlowSet.m_strErrMsg);
		}
	}
}

function fnModeChange()
{
	if(document.all.rbMode1.checked)
	{
		document.all.Mode1.style.display = "";
		document.all.Mode2.style.display = "none";
	}
	else
	{
		document.all.Mode1.style.display = "none";
		document.all.Mode2.style.display = "";
	}
}

function InitNewPoint()
{
	var sOrgInfoXML = window.localStorage['orgInfo_' + gDocInfo.uOrgNo];
	if (typeof sOrgInfoXML === 'undefined')
	{
		parent.SSOUtil.getOrgInfo(localStorage.Artifact, gDocInfo.uOrgNo);
	}
	var orgInfoDOM = (new DOMParser()).parseFromString(sOrgInfoXML, 'text/xml');
	var $dlg = $("#EDT217");
	$("#txNewPoint").acInput(orgInfoDOM, {
		theme: "facebook",
		relativeRootElem: $dlg.get(0),
		onBeforeDropdown: function (pos)
		{
			pos.width = $dlg.find("input#txNewPoint").outerWidth();
			return pos;
		}
	});
}

//1061106 David 1060748 新增DataGrid點選列的底色處理
function rowsOnClick()
{
	try
	{
		if(event && event.srcElement && event.srcElement.parentElement && event.srcElement.parentElement.rowIndex >= 0)
		{
			var iSelected = event.srcElement.parentElement.rowIndex;
			var cbCheckObj = document.all.dg1.rows[iSelected].cells[0].childNodes[0];
			if(cbCheckObj && !cbCheckObj.disabled)
			{
				cbCheckObj.checked = !cbCheckObj.checked;
				if(cbCheckObj.checked)
				{
					event.srcElement.parentElement.style.backgroundColor = uSelectedColor;
				}
				else
				{
					if(iSelected % 2 == 0)
						event.srcElement.parentElement.style.backgroundColor = uDoubleRowColor;
					else
						event.srcElement.parentElement.style.backgroundColor = uSingleRowColor;
				}
			}
		}
	}
	catch(e)
	{
		alert('點選流程時發生錯誤');
	}
}

//1061106 David 1060748 新增DataGrid底色處理
function SetDgColor()
{
	for (var i = 1 ; i < document.all.dg1.rows.length ; i++)
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled)
		{
			if(cbCheckObj.checked)
			{
				document.all.dg1.rows[i].style.backgroundColor = uSelectedColor;
			}
			else
			{
				if(i % 2 == 0)
					document.all.dg1.rows[i].style.backgroundColor = uDoubleRowColor;
				else
					document.all.dg1.rows[i].style.backgroundColor = uSingleRowColor;
			}
		}
	}
}

//1061106 David 1060748 新增選勾選後底色處理
function fnSetColor(argIndex)
{
	for (var i = 1 ; i < document.all.dg1.rows.length ; i++)
	{
		var cbCheckName = "cbCheck" + argIndex;
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.id == cbCheckName)
		{
			if(cbCheckObj.checked)
			{
				document.all.dg1.rows[i].style.backgroundColor = uSelectedColor;
			}
			else
			{
				if(i % 2 == 0)
					document.all.dg1.rows[i].style.backgroundColor = uDoubleRowColor;
				else
					document.all.dg1.rows[i].style.backgroundColor = uSingleRowColor;
			}
			break;
		}
	}
}

//1070712 Justin [1070678] 弱掃Client Potential XSS修正
function htmlencode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

//1080416 David 1080022 新增內會選項連動處理
function CoworkTypeChange()
{
	//1110926	Joe		1110629		UI調整
	// if(document.all.rb1.checked || document.all.rb2.checked)
	if(document.all.rbCoworkType1.checked || document.all.rbCoworkType2.checked)
	{
		document.all.dlDept.disabled = false;
	}
	else
	{
		var strOwnOuId = theAOL.docObj.ODWMSG.OWN_OU_ID;
		var strDeptNo = document.all.dlDept.options[document.all.dlDept.selectedIndex].value;
		//一級選單不為目前流程所在單位時，進行連動處理
		if(strOwnOuId != "" && strOwnOuId.substr(0,2) != strDeptNo)
		{
			for (var iDept = 0; iDept < document.all.dlDept.options.length; iDept++)
			{
				if(strOwnOuId.substr(0,2) == document.all.dlDept.options[iDept].value)
				{
					document.all.dlDept.selectedIndex = iDept;
					dlDeptOnChang();
					break;
				}
			}
		}
		document.all.dlDept.disabled = true;
	}
}

//1100716 David 1100433 判斷單位角色人員是存在
var OrgInfoObj;
function CheckRolePlayExist(argOuId, argRoleId, argUserName)
{
	var bExist = false;
	var strFirstUserName = "";
	var strFirstEmpName = "";

	if (typeof OrgInfoObj === 'undefined')
		OrgInfoObj = parent.SSOUtil.getOrgNode(gDocInfo.uOrgNo);
	var $orgNode = $(OrgInfoObj);
	
	//取得單位Node
	var xpath = 'Unit[UnitCode="' + argOuId + '"]';
	var unitNode = ($orgNode.find(xpath))[0];
	if(!unitNode)
		return;

	//取得角色Node
	var rolePath = 'Role[RoleNo="' + argRoleId + '"]';
	var roleNode = ($(unitNode).find(rolePath));
	if (roleNode)
	{
		for(var iroleNode = 0 ; iroleNode < roleNode.length ; iroleNode++)
		{
			var roleNodeChild = roleNode[iroleNode];
			var RoleName = $(roleNodeChild).find("RoleName").text();

			var iPlayRole = $(roleNodeChild).find("RoleOccupant").length;
			for(var iPlay = 0 ; iPlay < iPlayRole ; iPlay++)
			{
				var $RoleOccupant = $($(roleNodeChild).find("RoleOccupant")[iPlay]);
				var PlayAccount = $RoleOccupant.find("Account").text().toUpperCase();
				var PlayEmpName = $RoleOccupant.find("Name").text();

				//紀錄第一個扮演人員資訊
				if(iPlay == 0)
				{
					strFirstUserName = PlayAccount;
					strFirstEmpName = PlayEmpName;
				}

				//判斷角色人員存在
				if(PlayAccount.toUpperCase() == argUserName.toUpperCase())
				{
					bExist = true;
					break;
				}
			}
		}
	}
	
	var Rtn = [];
	
	if(!bExist)
	{
		Rtn.push("N");
		Rtn.push(strFirstUserName);
		Rtn.push(strFirstEmpName);
	}
	else
		Rtn.push("Y");
	
	return Rtn;
}

//1110925	Joe		1110629		UI調整--S
var singleRowIndex = "";
function fnSingleMoveUp(argIndex) {
	singleRowIndex = fnGetdg1SingleCtrlIndex(argIndex);
	fnMoveUp();
	singleRowIndex = "";
}
function fnSingleMoveDown(argIndex) {
	singleRowIndex = fnGetdg1SingleCtrlIndex(argIndex);
	fnMoveDown();
	singleRowIndex = "";
}
function fnSingleDelete(argIndex) {
	singleRowIndex = fnGetdg1SingleCtrlIndex(argIndex);
	fnDelete();
	singleRowIndex = "";
}

function fnGetdg1SingleCtrlIndex(argIndex)
{
	var rtnIndex=1;
	for (var i = 1; i < document.all.dg1.rows.length; i++)
	{
		if (document.all.dg1.rows[i].cells[0].childNodes[0].id == "cbCheck" + argIndex)
		{
			rtnIndex = i;
			break;
		}
	}
	return rtnIndex;
}

var DeptType = "";
function DeptTypeChange()
{
	if (document.all.rbDeptCowork.checked)
		document.all.DivCoworkType.className = "dTD";
	else
		document.all.DivCoworkType.className = "hide";

	//1130626	Joe		1130047		新增內分會選項
	if (document.all.rbDeptNow.checked && document.all.UseInnerThread.value == "Y")
		document.all.DivCoworkTypeInside.className = "dTD";
	else
		document.all.DivCoworkTypeInside.className = "hide";

	if (document.all.rbDeptFirst.checked) DeptType = "F";
	else if (document.all.rbDeptCowork.checked) {
		DeptType = "C";
		document.all.rbCoworkType1.checked = true;
	}
	else if (document.all.rbDeptNow.checked)
	{
		DeptType = "N";
		//1130626	Joe		1130047		新增內分會選項
		document.all.rbCoworkTypeInside1.checked = true;
	}
	else DeptType = "O";
	
	nDeptInsertRow = 1;
	
	for (var i = document.all.dgDept.rows.length -1; i > 0 ; i--)//刪除流程時要由大到小逐一刪除
	{
		document.all.dgDept.deleteRow(i);
	}
	initDeptDg();
}

function initDeptDg()
{
	if (document.all.rbDeptFirst.checked)		DeptType = "F";
	else if (document.all.rbDeptCowork.checked) DeptType = "C";
	else if (document.all.rbDeptNow.checked)	DeptType = "N";
    else										DeptType = "O";

	var DeptObj = ED2.EDT217.GetDeptRoleInfo(document.all.OrgNo.value, gDocInfo.OwnOuId.substr(0, 2), DeptType).value;
	if (DeptObj) {
		if (DeptObj.bSuccess)
		{
			if (DeptObj.DeptRoleInfo.length > 0)
			{
				for (var iDept = 0; iDept < DeptObj.DeptRoleInfo.length; iDept++)
				{
					var strDept = DeptObj.DeptRoleInfo[iDept];
					if (strDept.split('|')[2] != "")
						AddDept(strDept.split('|')[0], strDept.split('|')[1], strDept.split('|')[2], strDept.split('|')[3], strDept.split('|')[4], strDept.split('|')[5], "R");
					else if (strDept.split('|')[0].length >= 3)
						AddDept(strDept.split('|')[0], strDept.split('|')[1], strDept.split('|')[2], strDept.split('|')[3], strDept.split('|')[4], strDept.split('|')[5], "S");
					else
						AddDept(strDept.split('|')[0], strDept.split('|')[1], strDept.split('|')[2], strDept.split('|')[3], strDept.split('|')[4], strDept.split('|')[5], "D");
				}
			}
		}
		else
		{
			alert(DeptObj.ErrMsg);
		}
	}
}

var nDeptMaxRow = 1;
var nDeptInsertRow = 1;
var showName = "";

//Type: D-Dept S-Sect R-Role
//argInsertType: N-New I-Insert
function AddDept(argOuId, argOuName, argRoleId, argRoleName, argUsername, argEmpname, argType)
{
	var InsertIndex = nDeptInsertRow;
	var NewRow = document.all.dgDept.insertRow(InsertIndex);
	
	for (var j = 0; j < 2; j++)
		document.all.dgDept.rows[InsertIndex].insertCell(j);

	//隱藏欄位
	//1131001 Kevin 1130916 弱掃修正
	strInnerHtml = "<INPUT id=\"txOuId" + nDeptMaxRow + "\" type=\"hidden\" name=\"txOuId" + nDeptMaxRow + "\" value=\"" + htmlencode(argOuId) + "\">";
	strInnerHtml += "<INPUT id=\"txOuName" + nDeptMaxRow + "\" type=\"hidden\" name=\"txOuName" + nDeptMaxRow + "\" value=\"" + htmlencode(argOuName) + "\">";
	strInnerHtml += "<INPUT id=\"txRoleId" + nDeptMaxRow + "\" type=\"hidden\" name=\"txRoleId" + nDeptMaxRow + "\" value=\"" + htmlencode(argRoleId) + "\">";
	strInnerHtml += "<INPUT id=\"txRoleName" + nDeptMaxRow + "\" type=\"hidden\" name=\"txRoleName" + nDeptMaxRow + "\" value=\"" + htmlencode(argRoleName) + "\">";
	strInnerHtml += "<INPUT id=\"txUserId" + nDeptMaxRow + "\" type=\"hidden\" name=\"txUserId" + nDeptMaxRow + "\" value=\"" + htmlencode(argUsername) + "\">";
	strInnerHtml += "<INPUT id=\"txEmpName" + nDeptMaxRow + "\" type=\"hidden\" name=\"txEmpName" + nDeptMaxRow + "\" value=\"" + htmlencode(argEmpname) + "\">";
	strInnerHtml += "<INPUT id=\"txSpread" + nDeptMaxRow + "\" type=\"hidden\" name=\"txSpread" + nDeptMaxRow + "\" value=\"N\">";

	//選+隱藏欄位
	document.all.dgDept.rows[nDeptInsertRow].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nDeptMaxRow + "\" type=\"checkbox\">" + strInnerHtml;

	var showName = "";

	if (argType == "D")
	{
		//1131001 Kevin 1130916 弱掃修正
		showName = htmlencode(argOuName);
	}
	else if (argType == "S")
	{
		//1131001 Kevin 1130916 弱掃修正
		showName = "&nbsp;&nbsp;" + htmlencode(argOuName);
	}
	else if (argType == "R") {
		if (argOuId.length == 2)
			//1131001 Kevin 1130916 弱掃修正
			showName = "&nbsp;&nbsp;" + htmlencode(argRoleName) + "-" + htmlencode(argEmpname);
		else
			//1131001 Kevin 1130916 弱掃修正
			showName = "&nbsp;&nbsp;&nbsp;&nbsp;" + htmlencode(argRoleName) + "-" + htmlencode(argEmpname);
	}
	if(argType == "D" || argType == "S")
		document.all.dgDept.rows[nDeptInsertRow].cells[1].innerHTML = "<a href=\"javascript:fnSpread('" + nDeptMaxRow + "')\">" + showName + "</a>";
	else
		document.all.dgDept.rows[nDeptInsertRow].cells[1].innerHTML = showName;

	$(NewRow).attr('style', 'text-align:left');
	nDeptMaxRow++;
	nDeptInsertRow++;
}

function fnGetDgDpetInsertRowIndex(argMastRowId)
{
	var nDeptInsertRow=1;
	for (var i = 1; i < document.all.dgDept.rows.length; i++)
	{
		if (document.all.dgDept.rows[i].cells[0].childNodes[0].id == "cbCheck" + argMastRowId)
		{
			nDeptInsertRow = i+1;
			break;
		}
	}
	return nDeptInsertRow;
}

function fnSpread(argRowId) {
	//單位已展開
	if (document.all["txSpread" + argRowId].value == "Y")
	{
		//1121024	Joe		序281		補上單位展開後收起功能
		fnClosed(argRowId);
		return;
	}

	nDeptInsertRow = fnGetDgDpetInsertRowIndex(argRowId);

	document.all["txSpread" + argRowId].value = "Y";
	var SpreadList = ED2.EDT217.GetSectRole(document.all.OrgNo.value, document.all["txOuId" + argRowId].value, DeptType).value;
	if (SpreadList) {
		if (SpreadList.bSuccess) {
			if (SpreadList.DeptRoleInfo.length > 0) {
				for (var iDept = 0; iDept < SpreadList.DeptRoleInfo.length; iDept++) {
					var strDept = SpreadList.DeptRoleInfo[iDept];
					if (strDept.split('|')[2] != "")
						AddDept(strDept.split('|')[0], strDept.split('|')[1], strDept.split('|')[2], strDept.split('|')[3], strDept.split('|')[4], strDept.split('|')[5], "R");
					else if (strDept.split('|')[0].length >= 3)
						AddDept(strDept.split('|')[0], strDept.split('|')[1], strDept.split('|')[2], strDept.split('|')[3], strDept.split('|')[4], strDept.split('|')[5], "S");
					else
						AddDept(strDept.split('|')[0], strDept.split('|')[1], strDept.split('|')[2], strDept.split('|')[3], strDept.split('|')[4], strDept.split('|')[5], "D");
				}
			}
		}
		else {
			alert(SpreadList.ErrMsg);
		}
	}
	nDeptInsertRow = 0;
}

//1121024	Joe		序281		補上單位展開後收起功能--S
function fnClosed(argRowId)
{
	var DeptNo = document.all["txOuId" + argRowId].value;
	
	for(var i = document.all.dgDept.children[0].children.length -1 ; i > 0; i--){
		if(DeptNo.length == 3)
		{
			//二級單位底下的角色
			if(document.all.dgDept.children[0].children[i].children[0].children[1].value == DeptNo && document.all.dgDept.children[0].children[i].children[0].children[3].value != "")
				document.all.dgDept.children[0].children[i].remove();
		}
		else if(DeptNo.length == 2){
			//同單位底下的角色 或 底下科別的資料刪除
			if((document.all.dgDept.children[0].children[i].children[0].children[1].value == DeptNo && document.all.dgDept.children[0].children[i].children[0].children[3].value != "") || document.all.dgDept.children[0].children[i].children[0].children[1].value.length == 3 && document.all.dgDept.children[0].children[i].children[0].children[1].value.substring(0,2) == DeptNo)
				document.all.dgDept.children[0].children[i].remove();
		}
	}
		
	//展開收回
	document.all["txSpread" + argRowId].value = 'N';
}
//1121024	Joe		序281		補上單位展開後收起功能--E

function fnAddFlowNew()
{
	if(document.all.rbDeptCowork.checked == true && document.all.rbCoworkType3.checked == true)
	{
		var oulist = "";
		var ThreadAlertMsg = "";
		var Stamp = "";
		for (var i = 1; i < document.all.dgDept.rows.length; i++) 
		{
			if (document.all.dgDept.rows[i].cells[0].childNodes[0].checked) 
			{
				if(document.all.dgDept.rows[i].cells[0].childNodes[3].value != "")
				{
					ThreadAlertMsg = "分會流程僅可選取單位";
				}
				else
				{
					//1130626	Joe		1130047		新增內分會選項，調整分會格式
					// oulist += Stamp + document.all.dgDept.rows[i].cells[0].childNodes[1].value + ";" +  document.all.dgDept.rows[i].cells[0].childNodes[2].value;
					// Stamp = "|";
					let strOuId = document.all.dgDept.rows[i].cells[0].childNodes[1].value;
					let strOuName = document.all.dgDept.rows[i].cells[0].childNodes[2].value;
					let strRoleId = document.all.dgDept.rows[i].cells[0].childNodes[3].value;
					let strRoleName = document.all.dgDept.rows[i].cells[0].childNodes[4].value;
					let strUserName = document.all.dgDept.rows[i].cells[0].childNodes[5].value;
					let strEmpName = document.all.dgDept.rows[i].cells[0].childNodes[6].value;
					oulist += Stamp + strOuId + ";" + strOuName + ";" + strRoleId + ";" + strRoleName + ";" + strUserName + ";" + strEmpName;
					Stamp = "|";
				}
				document.all.dgDept.rows[i].cells[0].childNodes[0].checked = false;
			}
		}
		if(ThreadAlertMsg != "")
			alert(ThreadAlertMsg);
		if(oulist != "")
			fnAddThread(oulist);
	}
	//1130626	Joe		1130047		新增內分會選項
	else if (document.all.rbDeptNow.checked == true && document.all.rbCoworkTypeInside2.checked == true) {
		let oulist = "";
		let oulistbuffer = "";
		var ThreadAlertMsg = "";

		for (var i = 1; i < document.all.dgDept.rows.length; i++) {
			if (document.all.dgDept.rows[i].cells[0].childNodes[0].checked) {
				let bCheck = true;
				let strOuId = document.all.dgDept.rows[i].cells[0].childNodes[1].value;
				let strOuName = document.all.dgDept.rows[i].cells[0].childNodes[2].value;
				let strRoleId = document.all.dgDept.rows[i].cells[0].childNodes[3].value;
				let strRoleName = document.all.dgDept.rows[i].cells[0].childNodes[4].value;
				let strUserName = document.all.dgDept.rows[i].cells[0].childNodes[5].value;
				let strEmpName = document.all.dgDept.rows[i].cells[0].childNodes[6].value;
				//1130716	Joe		序145		調整邏輯，開放內分會可直接分給不同科別人員
				/*
				//同級單位
				if (gDocInfo.OwnOuId == strOuId && strUserName == "")
					bCheck = false
				//不同級單位人員
				else if (gDocInfo.OwnOuId != strOuId && strUserName != "")
					bCheck = false
				*/
				if (gDocInfo.OwnOuId == strOuId && strUserName == "")
					bCheck = false;
				if (!bCheck)
					//1130716	Joe		序145		調整邏輯，開放內分會可直接分給不同科別人員
					// ThreadAlertMsg = "內分會僅可選取同級單位不同人員或不同級單位。"
					ThreadAlertMsg = "內分會僅可選取同單位不同人員或不同單位/人員。"
				else {
					oulist += oulistbuffer + strOuId + ";" + strOuName + ";" + strRoleId + ";" + strRoleName + ";" + strUserName + ";" + strEmpName;
					oulistbuffer = "|";
				}
				document.all.dgDept.rows[i].cells[0].childNodes[0].checked = false;
			}
		}
		if (ThreadAlertMsg != "")
			alert(ThreadAlertMsg);
		else if (oulist.split('|').length == 1)
			alert("分會對象至少選取兩位以上");
		else if (oulist.split('|').length > 1)
			fnAddThread(oulist);
	}
	else
	{
		for (var i = 1; i < document.all.dgDept.rows.length; i++) 
		{
			if (document.all.dgDept.rows[i].cells[0].childNodes[0].checked) 
			{
				fnAddPoint(document.all.dgDept.rows[i].cells[0].childNodes[1].value, document.all.dgDept.rows[i].cells[0].childNodes[2].value, document.all.dgDept.rows[i].cells[0].childNodes[3].value, document.all.dgDept.rows[i].cells[0].childNodes[4].value, document.all.dgDept.rows[i].cells[0].childNodes[5].value, document.all.dgDept.rows[i].cells[0].childNodes[6].value);
				document.all.dgDept.rows[i].cells[0].childNodes[0].checked = false;
			}
		}
	}
}
//1110925	Joe		1110629		UI調整--E