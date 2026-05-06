/*
DATE 	SA		PRG		MGR_NO		DESC
1030409			Kenny	1020969		增加撈取彙併辦子文，並顯示於查詢清單中
1030424			Kenny	1020969		增加判斷相關案件文號相同才打勾
1040721	David	Gabby	1040600		增加庫房歸檔類別條件
1040901	David	Kevin_C	1040726		把訊息放到一起顯示
1050329	David	David	1050087		二代公文修改
1050715 David	Joe 	1050087		二代公文修改，修改ShowModalDialog開啟子視窗方法
1050817 Kevin   Zen     1050700     弱掃XSS修正
1051019 Leslie  Kenny   1050087     二代公文修改
1051215 David   Kenny   1050087     調整callBack中子視窗程式名稱避免無法帶回帳號問題
1060915	David	Kevin_C	1060803		修正PostBack後，單位下拉選單未重新設定，以及寄信失敗訊息有角括號導致IIS判斷有資安風險字元而無法PostBack的問題
1070904	Kevin	Justin	1070678		弱掃修正CookieHttpOnly
1080816 Kevin	Joe		1080628		修正開啟子視窗前需進行編碼
1100804 Zen     Zen     1100826     移交前檢核同公文只可移交給一人
1101109 Zen     Zen     1101293		修正取消勾選彙併辦母文後子文未同步取消之問題
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
var SPLIT = "|";

//1050715	Joe		1050087		因應新版ShowModalDialog開啟子視窗方法，新增全域變數--S
var u_strUserNameFld="";
var u_strType="";
var u_strUserFld="";
//1050715	Joe		1050087		因應新版ShowModalDialog開啟子視窗方法，新增全域變數--E

//指定DataGrid欄位
var strTableFields = new Array("_lbDocNo","_lbDeptName","_lbEmpName");

//1050329 David 1050087 二代公文修改
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;*/
	
//各function回傳資料用的
function RtnVal()
{
	this.bSuccess	= false;
	this.strErrMsg	= "";
	this.strMsg		= "";
	this.rtnVal		= new Object;
	//1010183	ken		101/06/18	存放接管人角色名稱用
	this.rtnRoleName  = new Object;
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
var oTimerId ;
function ClientOnLoad()
{
	//1050329 David 1050087 二代公文修改
	/*jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	jf_CallWS("../EDLIB/EDWS.asmx", "GetAccountInfo", false, null); //使用WebService前必須先呼叫一次*/
	if(document.all.dg1)
	{
		if(document.all.dg1.style.display == "")
			document.all.tbSelect.style = "";
	}

	//初始化畫面	
	fnInitDisplay();
	//1060915	Kevin_C	1060803	修正PostBack後，下拉選單變空的問題
	if (document.all["txTakeUser"].value != "")
	{
		document.all["txOldTakeUser"].value = "";
		fnGetTakeName("txTakeUser", "txTakeUserName", document.all["h_PrivInfo"].value);
	}
	//ClientOnLoad完成後要做的事	
	oTimerId = setInterval("fnAfterPageLoad()", 10);
}

function fnAfterPageLoad()
{	
	clearInterval(oTimerId); //clear
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	/*var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}*/
	
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
		/*case btHelp:

			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );

			break;*/
		//1050329 David 1050087 二代公文修改
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050329 David 1050087 二代公文修改
//function jf_ToolBarHandle()
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

	//1050329 David 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050329 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
			if(jf_ConfirmSearch()) //查詢前檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050329 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btMove":
			if(jf_ConfirmMove()) //移交前檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050329 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1050329 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1010338	Ken	 101/08/08	增加預覽已辦畢未歸檔清單選項
		case "btPreview2":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1050329 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;

		//以下屬於DataGrid ToolBar
		//1050329 David 1050087 二代公文修改
		/*case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;*/
	}
}

//查詢前檢查
function jf_ConfirmSearch()
{
	var bRtnbool = false;

	if (jf_CheckBeforSearch())
	{
		 bRtnbool = true;
	}

	return bRtnbool;
}

//查詢前之欄位檢查
function jf_CheckBeforSearch()
{
	var bRtnbool = true;
	var strErrMsg= "";

	if (document.all["txUser"].value == "")
	{
		strErrMsg += "移交人不可空白\n";
		document.all["txUser"].focus();
	}
	else
	{
		var rtn = new RtnVal()
	    //1050817 Zen 1050700 弱掃XSS修正
	    //rtn = fnCheckUser(document.all["txUser"].value, document.all["h_PrivInfo"].value)
	    rtn = fnCheckUser(encodeURI(document.all["txUser"].value), encodeURI(document.all["h_PrivInfo"].value));
		if(rtn.bSuccess == true)
		{
			document.all["txUserName"].value = rtn.strMsg;
		}
		else
		{
			strErrMsg += rtn.strErrMsg+"\n";
			bRtnbool = false;
			document.all["txUser"].value = "";
			document.all["txUserName"].value = "";
		}
	}
	//1010183	Ken 101/06/13 增加第三個勾選條件
	//1010338	Ken	 101/08/07	勾選條件檢查
	//if(document.all["cbxUnClosedDoc"].checked == false && document.all["cbxClosedDoc"].checked == false)
	//if(document.all["cbxUnClosedDoc"].checked == false && document.all["cbxClosedDoc"].checked == false && document.all["cbxMsgNotice"].checked==false )
	if(document.all["cbxUnClosedDoc"].checked == false && document.all["cbClose"].checked == false && document.all["cbxMsgNotice"].checked==false&& document.all["cbContinue"].checked==false&& document.all["cbWaitCheck"].checked==false )
	{
		strErrMsg += "查詢範圍至少需勾選一個選項\n";
		bRtnbool = false;
	}
	//1040721 Gabby[1040600]增加庫房歸檔類別條件--START
	if(document.all["cbOrgStore"].checked == false && document.all["cbUnitStore"].checked == false )
	{
		strErrMsg += "至少需選擇一個歸檔庫房類別\n";
		bRtnbool = false;
	}
	//1040721 Gabby[1040600]增加庫房歸檔類別條件--END		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}

	return bRtnbool;
}
//移交前檢查(檢核是否有設定移交人)
function jf_ConfirmMove()
{
	var bRtnbool = false;

	var dgCount = document.all.dg1.rows.length;

	if(dgCount < 2)
	{
		alert("請先執行查詢後，再移交。")
		return bRtnbool;
	}

	for(var i = 2; i <= dgCount ; i++)
	{
		if(document.all["dg1__ctl" + i + "_txTakeName"].value != "")
		{
			bRtnbool = true;
		}
	}

	//1100804 Zen 1100826 移交前檢核同公文只可移交給一人
	if (bRtnbool == false)
	{
		alert("尚未設定接管人，請先完成接管人設定後再移交。")
		return bRtnbool;
	}

	//1100804 Zen 1100826 移交前檢核同公文只可移交給一人
	var strErrMsg = '';
	for (var i = 2; i < dgCount; i++)
		for (var j = i + 1; j < dgCount; j++)
		{
			if (document.all['dg1__ctl' + i + '_lbDocNo'].textContent == document.all['dg1__ctl' + j + '_lbDocNo'].textContent && document.all['dg1__ctl' + i + '_txTakeId'].value != document.all['dg1__ctl' + j + '_txTakeId'].value)
				strErrMsg += '序'+document.all['dg1__ctl' + i + '_lbSEQ_NO'].textContent+'和序'+document.all['dg1__ctl' + j + '_lbSEQ_NO'].textContent+'屬同份公文，接管人必須相同\n';
		}

	if (strErrMsg != '')
	{
		alert(strErrMsg);
		bRtnbool = false;
    }

	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";

	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			//txInput2不可空白
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
				//1050329 David 1050087 二代公文修改
				//jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent+"之列中,"+InValidName])),"");
				document.all[InValidControlName].focus();
				return false;
			}
		}
	}
	return true;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txUser"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	/*
	if(argCallerId == "SII020")
	{
		document.all["txUser"].value = jf_Trim(document.all.lbReturnValue.options[0].value);


		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txUser"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txUser"].focus();
	}
	*/
	
	//1050715 Joe 1050087 二代公文修改，因應ShowModalDialog--S
    //1051215   Kenny   [1050087]   修改子視窗程式名稱，應為IFC020
	//if (argCallerId == "IIC020") 
    if (argCallerId == "IFC020") 
	{
		var strRtnValue = jf_Trim(document.all.lbReturnValue.options[0].value).split('|');
		document.all[u_strUserFld].value  = strRtnValue[0];
		var strPrivInfo = document.all["h_PrivInfo"].value;
		if(u_strType == "GetEmpName")
		{
			fnGetEmpName(u_strUserFld,u_strUserNameFld ,strPrivInfo)
		}
		else
		{
			fnGetTakeName(u_strUserFld,u_strUserNameFld ,strPrivInfo)
		}
	}
	//1050715 Joe 1050087 二代公文修改，因應ShowModalDialog--E

	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//將畫面初始化
function fnInitDisplay()
{
	if(document.all.ShowDisableAccount && document.all.ShowDisableAccount.value=="YES")
		document.all.trOtherSettings.style.display = "";///系統管理人可以看到其它設定

	if(jf_GetActionMode()==LayoutModeNew)
	{
		document.all['btSetTakeUser'].style.display='none';
	}
	else
	{
		document.all['btSetTakeUser'].style.display='';
	}

	//1040901	Kevin_C	1040726	把訊息放到一起顯示	-S
	//if(document.all.MoveSuccessed && document.all.MoveSuccessed.value=="YES")
	//	alert('移交完成');
	if (document.all.MoveSuccessed)
	{
		alert(document.all.MoveSuccessed.value);
		//1060915	Kevin_C	1060803	修正寄信失敗錯誤訊息有角括號導致被IIS判斷有資安風險字元，無法PostBack
		document.all.MoveSuccessed.value = "";
	}
	//1040901	Kevin_C	1040726	把訊息放到一起顯示	-E
		
	fnOtherSetClick("cbxDeleteRole")
	
}
//帶出移交人姓名
function fnGetEmpName(strUserFld,strUserNameFld ,strPrivInfo)
{
	if(document.all[strUserFld].value=="")
	{
		document.all[strUserNameFld].value = "";
		return rtn;
	}

	var rtn = new RtnVal();
    //1050817 Zen 1050700 弱掃XSS修正
	//var strUserId = document.all[strUserFld].value
	var strUserId = encodeURI(document.all[strUserFld].value);

	rtn = fnCheckUser(strUserId ,strPrivInfo)

	if(rtn.bSuccess == true)
	{
		document.all[strUserNameFld].value = rtn.strMsg;//將姓名顯示出來
		return true;
	}
	else
	{
		alert(rtn.strErrMsg)
		document.all[strUserNameFld].value = "";
		document.all[strUserFld].value = "";
		return false;
	}
}
//帶出接管人姓名
function fnGetTakeName(strUserFld,strUserNameFld ,strPrivInfo)
{

	if(document.all[strUserFld].value=="")
	{
		document.all[strUserNameFld].value = "";
		document.all["txOldTakeUser"].value = document.all[strUserFld].value;
		//1050329 David 1050087 二代公文修改
		ClearDL(document.all.ddlTakeUserRoleList);
		document.all["txTakeDeptNo"].value = "";
		document.all["txTakeDeptName"].value = "";
		document.all.txTakeRoleNametemp.value = "";
		return true;
	}
	//如果接管人沒有變動就不再檢核
	if(document.all["txOldTakeUser"].value == document.all[strUserFld].value)
		return true;

	var rtn = new RtnVal();
    //1050817 Zen 1050700 弱掃XSS修正
	//var strUserId = document.all[strUserFld].value
	var strUserId = encodeURI(document.all[strUserFld].value);

	rtn = fnGetUserInfo(strUserId);

	if(rtn.bSuccess == false)
	{
		alert(rtn.strErrMsg)
		document.all[strUserNameFld].value = "";
		document.all[strUserFld].value = "";
		document.all["txTakeDeptNo"].value = "";
		document.all["txTakeDeptName"].value = "";
		document.all["txOldTakeUser"].value = "";
		//1050329 David 1050087 二代公文修改
		ClearDL(document.all.ddlTakeUserRoleList);
		return false
	}

	rtn = fnShowChooseDlg(rtn,strPrivInfo);

	if(rtn.bSuccess == true)
	{
		document.all[strUserNameFld].value = rtn.strMsg;//將姓名顯示出來
		//1050329 David 1050087 二代公文修改，不使用showModalDialog，改由選單供使用者選取
		/*document.all["txTakeDeptNo"].value = rtn.rtnVal[0];
		document.all["txTakeDeptName"].value = rtn.rtnVal[1];*/
		document.all["txTakeDeptNo"].value = "";
		document.all["txTakeDeptName"].value = "";
		//紀錄本次檢核的接管人　
		document.all["txOldTakeUser"].value = document.all[strUserFld].value;
		//1010183	Ken		101/06/18		抓取接管人角色
		document.all.txTakeRoleNametemp.value = rtn.rtnRoleName[0];
		return true;
	}
	else
	{
		alert(rtn.strErrMsg)
		document.all[strUserNameFld].value = "";
		document.all[strUserFld].value = "";
		document.all["txTakeDeptNo"].value = "";
		document.all["txTakeDeptName"].value = "";
		document.all["txOldTakeUser"].value = "";
		//1010183	Ken		101/06/18		接管人角色
		document.all.txTakeRoleNametemp.value = "";
		return false
	}
}
//設定接管人
function fnSetTakeUser()
{
	if(document.all["txTakeUser"].value=="")
	{
		alert("接管人不可為空白")
		return false;
	}
	if(document.all["txTakeUser"].value== document.all["txUser"].value)
	{
		alert("移交人與接管人不可相同")
		return false;
	}
	if(!fnGetTakeName("txTakeUser","txTakeUserName" ,document.all["h_PrivInfo"].value))
		return false;

	var dgCount = document.all.dg1.rows.length
	var strTakeUser = document.all["txTakeUser"].value;
	var strTakeName = document.all["txTakeUserName"].value;
	//1050329 David 1050087 二代公文修改，不使用showModalDialog，改由選單供使用者選取
	/*var strDeptNo = document.all["txTakeDeptNo"].value;
	var strDeptName = document.all["txTakeDeptName"].value;*/
	var strDeptNo = document.all.ddlTakeUserRoleList.options[document.all.ddlTakeUserRoleList.selectedIndex].value;
	var strDeptName = document.all.ddlTakeUserRoleList.options[document.all.ddlTakeUserRoleList.selectedIndex].text;

	//1010183	Ken		101/06/18  接管人角色
	var strTakeRoleName = document.all.txTakeRoleNametemp.value;

	if(dgCount < 2)
	{
		alert("請先執行查詢後，再設定接管人")
		return false;
	}

	var HadSet = false;
	for(var i = 2; i <= dgCount ; i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
		{
			//1050329 David 1050087 二代公文修改
			/*document.all["dg1__ctl" + i + "_txTakeId"].innerText = strTakeUser
			document.all["dg1__ctl" + i + "_txTakeName"].innerText = strTakeName
			document.all["dg1__ctl" + i + "_txTakeDeptNo"].innerText = strDeptNo
			document.all["dg1__ctl" + i + "_txTakeDeptName"].innerText = strDeptName*/
			document.all["dg1__ctl" + i + "_txTakeId"].value = strTakeUser
			document.all["dg1__ctl" + i + "_txTakeName"].value = strTakeName
			document.all["dg1__ctl" + i + "_txTakeDeptNo"].value = strDeptNo
			document.all["dg1__ctl" + i + "_txTakeDeptName"].value = strDeptName
			//1010183	Ken		101/06/18	接管人角色放入dg
			document.all["dg1__ctl" + i + "_txTakeRoleName"].value = strTakeRoleName
			document.all["dg1__ctl" + i + "_cbSelect"].checked = false;
			HadSet = true;
		}
	}

	if(HadSet == false)
	{
		alert("請先勾選要移交的公文")
		return false
	}

	return true;
}

//開啟人員帳號子視窗
function fnQueryUser(strUserFld, strUserNameFld,argType)
{
	Page_BlockSubmit = true;
	var rtn = new RtnVal();
	//1050715 Joe 1050087 二代公文修改，修改開啟子視窗方法--S
	//var ret = jf_ShowPersonDialog("");
	jf_ShowPersonDialog("");
	u_strUserFld = strUserFld;
	u_strUserNameFld=strUserNameFld;
	u_strType=argType;
	// if(ret)
	// {
		// document.all[strUserFld].value = GetElement(ret, 0);
		// var strPrivInfo = document.all["h_PrivInfo"].value;
		// if(argType == "GetEmpName")
		// {
			// fnGetEmpName(strUserFld,strUserNameFld ,strPrivInfo)
		// }
		// else
		// {
			// fnGetTakeName(strUserFld,strUserNameFld ,strPrivInfo)
		// }
	// }
	//1050715 Joe 1050087 二代公文修改，修改開啟子視窗方法--S
}

//檢核使用者是否有權限移交此帳號
function fnCheckUser(strUserId ,strPrivInfo)
{
	var rtn = new RtnVal();
	rtn = fnGetUserInfo(strUserId);

	if(rtn.bSuccess == false)
		return rtn;

	rtn = fnChectPriv(rtn,strPrivInfo);	
	return rtn;
}
//取得帳號之姓名，及其所扮演承辦人的角色資訊
function fnGetUserInfo(strUserId)
{
	var rtn = new RtnVal();
	rtn.bSuccess = true;
	rtn.strErrMsg = "";
	rtn.rtnVal = new Array(2);

	var arWSParam = new Array(2);
    //1050817 Zen 1050700 弱掃XSS修正
	//arWSParam[0] = document.all["h_SourceOrgno"].value;
	arWSParam[0] = encodeURI(document.all["h_SourceOrgno"].value);
	arWSParam[1] = strUserId;
	var callObj = jf_CallWA("../EDLIB/EDWS.asmx", "GetAccountInfo", false, arWSParam);
	if (!callObj.error && callObj.value.m_bSuccess)
	{
		var objWsRtn = callObj.value;
		var DeptCount = objWsRtn.Count;
		var DeptNoList = new Array();
		var DeptNameList = new Array();
		//1010183	Ken		101/06/18  接管人角色用
		var RoleNameList = new Array();

		rtn.strMsg = objWsRtn.EmpName;//將姓名儲存起來

		//取得有承辦人角色的單位
		for(idx = 0 ; idx < DeptCount ; idx++)
		{
			//1010183	Ken		101/06/18  取得接管人角色名稱
			//RoleNameList.push (objWsRtn.RoleName[idx])
			
			if(objWsRtn.RoleNo[idx] == "OD99")
			{
				DeptNoList.push(objWsRtn.DeptNo[idx])
				DeptNameList.push(objWsRtn.DeptName[idx])
			}
		}
		rtn.rtnVal[0] = DeptNoList;
		rtn.rtnVal[1] = DeptNameList;
		//1010183	Ken		101/06/18	存入接管人角色名稱
		rtn.rtnRoleName[0]=objWsRtn.RoleName[0];
	}
	else
	{
		if(callObj.error)
			rtn.strErrMsg = callObj.errorDetail.string;
		else
			rtn.strErrMsg = callObj.value.m_strErrMsg;
	}

	if(rtn.strErrMsg != "")
	{
		rtn.bSuccess = false;
		return rtn;
	}
	if(rtn.rtnVal[0].length == 0)
	{
		rtn.bSuccess = false;
		rtn.strErrMsg = "此人無承辦人角色"
		return rtn;
	}
	else
	{
		return rtn;
	}
}
function fnOtherSetClick(cbxfld)
{
	if(document.all[cbxfld].checked)
	{
		if(cbxfld == "cbxDeleteRole")
		{
			document.all["cbxDisableAccount"].checked = false
			document.all["ddlNewDeptNo"].disabled = false;
		}
		else
		{
			document.all["cbxDeleteRole"].checked = false
			document.all["ddlNewDeptNo"].disabled = true;
		}
	}
	else
		document.all["ddlNewDeptNo"].disabled = true;
}

//檢核權限
function fnChectPriv(CheckObj,strPrivInfo)
{
	var rtn = "";
	var strDeptNo = document.all["h_DeptNo"].value;
	var strSectNo = document.all["h_SectNo"].value;

	if(strSectNo =="")
		strSectNo = strDeptNo;
	if(strDeptNo.length >2)
		strDeptNo=strDeptNo.substring(0,2);

	var arrDeptNoList	= CheckObj.rtnVal[0];
	var arrLeagth		= arrDeptNoList.length;
	switch(strPrivInfo)
	{
		case "0":
		//"可移交所有承辦人"
		break;
		case "1":
		rtn = "只可移交同組室人員公文"
		for(ArrIdx = 0 ; ArrIdx < arrLeagth ; ArrIdx++)
		{
			if(arrDeptNoList[ArrIdx].indexOf(strDeptNo) != -1)
				rtn = "";
		}
		break;
		case "2":
		rtn = "只可移交同科人員公文"
		for(ArrIdx = 0 ; ArrIdx < arrLeagth ; ArrIdx++)
		{
			if(arrDeptNoList[ArrIdx] == strSectNo)
				rtn = "";
		}
		break;
		case "3":
		rtn = "只可移交同科人員公文"
		for(ArrIdx = 0 ; ArrIdx < arrLeagth ; ArrIdx++)
		{
			if(arrDeptNoList[ArrIdx] == strSectNo)
				rtn = "";
		}
		break;
	}

	if(rtn == "")
	{
		CheckObj.bSuccess = true;
	}
	else
	{
		CheckObj.bSuccess = false;
		CheckObj.strErrMsg = rtn;
	}

	return CheckObj;
}
function fnShowChooseDlg(argRtn,strPrivInfo)
{
	var strDeptNo = document.all["h_DeptNo"].value;
	var strSectNo = document.all["h_SectNo"].value;
	
	if(strSectNo =="")
		strSectNo = strDeptNo;
	if(strDeptNo.length >2)
		strDeptNo=strDeptNo.substring(0,2);

	var rtn ="";
	var arrDeptNoList	= argRtn.rtnVal[0];
	var arrDeptNameList	= argRtn.rtnVal[1];
	var arrLeagth		= arrDeptNoList.length;
	var CurrDeptNoList = new Array();
	var CurrDeptNameList = new Array();

	//依權限，將多餘的單位角色移除
	switch(strPrivInfo)
	{
		case "0":
		//可移交所有承辦人
		CurrDeptNoList = argRtn.rtnVal[0];
		CurrDeptNameList =argRtn.rtnVal[1];
		break;
		case "1":
		rtn = "只可移交同組室人員公文"
		for(ArrIdx = 0 ; ArrIdx < arrLeagth ; ArrIdx++)
		{
			if(arrDeptNoList[ArrIdx].indexOf(strDeptNo) != -1)
			{
				CurrDeptNoList.push(arrDeptNoList[ArrIdx]);
				CurrDeptNameList.push(arrDeptNameList[ArrIdx]);
			}
		}
		break;
		case "2":
		rtn = "只可移交同科人員公文"
		for(ArrIdx = 0 ; ArrIdx < arrLeagth ; ArrIdx++)
		{
			if(arrDeptNoList[ArrIdx] == strSectNo)
			{
			
				CurrDeptNoList.push(arrDeptNoList[ArrIdx]);
				CurrDeptNameList.push(arrDeptNameList[ArrIdx]);
			}
		}
		break;
		case "3":
		rtn = "只可移交同科人員公文"
		for(ArrIdx = 0 ; ArrIdx < arrLeagth ; ArrIdx++)
		{
			if(arrDeptNoList[ArrIdx] == strSectNo)
			{
				CurrDeptNoList.push(arrDeptNoList[ArrIdx]);
				CurrDeptNameList.push(arrDeptNameList[ArrIdx]);
			}
		}
		break;
	}

	argRtn.rtnVal[0] = CurrDeptNoList;
	argRtn.rtnVal[1] = CurrDeptNameList;
	if(CurrDeptNoList.length == 0)
	{
		argRtn.bSuccess = false;
		argRtn.strErrMsg = rtn;
	}
	//1050329 David 1050087 二代公文修改，不使用showModalDialog，改由選單供使用者選取
	/*else if(CurrDeptNoList.length > 1)
	{
		var artifact = document.all.SsoArtifact.value;
		var sFeatures="dialogWidth: 480px;dialogHeight:370px";
		var argUrl = "EDT241C1.ASPX?SAMLart=" + artifact;
		var rtnfromwin = window.showModalDialog(argUrl, argRtn, sFeatures);
		if(rtnfromwin != null)
		{
			argRtn = rtnfromwin;
		}
		else
		{
			//若是直接關閉就取得第一個單位 
			argRtn.rtnVal[0] = CurrDeptNoList[0];
			argRtn.rtnVal[1] = CurrDeptNameList[0];
		}
	}*/
	else
	{
		ClearDL(document.all.ddlTakeUserRoleList);
		for(var iRoles = 0 ; iRoles < CurrDeptNoList.length ; iRoles++)
		{
			var objOption = new Option(CurrDeptNameList[iRoles], CurrDeptNoList[iRoles]);
			document.all.ddlTakeUserRoleList.options.add(objOption);
		}
	}
	return argRtn;
}

function GetElement(argStr,argIdx)
{
	var ss =argStr.split(SPLIT);
   	return ss[argIdx];
}
function jf_ShowPersonDialog(argParam)
{
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
	//jf_SaveCookie("nSearch",argParam);
	var artifact = document.all.SsoArtifact.value;
	//1050715 Joe 1050087 二代公文修改，修改開啟子視窗方法--S
	// var ret= jf_ShowModal("../../../IF/IF1/IFC020.htm?SAMLart=" + artifact,"480","370"); //回傳值：CN, displayName, Path
    //1051215   Kenny   修正無法由子視窗帶回帳號問題；一併修改開啟的子視窗大小
	//jf_ShowModal("../../../IF/IF1/IFC020.htm?SAMLart=" + artifact,"480","370");
	//1080816	Joe		1080628		新增開啟子視窗前轉碼
    // jf_ShowModal("../../../IF/IF1/IFC020.htm?SAMLart=" + artifact + "&nSearch=" + argParam,"800","600");
    jf_ShowModal("../../../IF/IF1/IFC020.htm?SAMLart=" + artifact + "&nSearch=" + encodeURIComponent(argParam),"800","600");
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
	// return ret;
	//1050715 Joe 1050087 二代公文修改，修改開啟子視窗方法--E
}

//1030409	Kenny	[1020969]	選擇彙併辦母文，子文一併勾選
function jf_SelectComNo()
{
	for (var iRow=2 ; iRow < document.all["dg1"].rows.length + 1 ; iRow++)
	{
		//1101109 Zen 1101293 修正取消勾選彙併辦母文後子文未同步取消之問題
		let bSelected = document.all["dg1__ctl"+iRow+"_cbSelect"].checked;
		
		//1101109 Zen 1101293 修正取消勾選彙併辦母文後子文未同步取消之問題
		//if ( document.all["dg1__ctl"+iRow+"_cbSelect"].checked && document.all["dg1__ctl"+iRow+"_txComNo"].value != "" && document.all["dg1__ctl"+iRow+"_txComType"].value == "1" )
		if ( document.all["dg1__ctl"+iRow+"_txComNo"].value != "" && document.all["dg1__ctl"+iRow+"_txComType"].value == "1" )
		{
			for (var iRow2=iRow+1 ; iRow2 < document.all["dg1"].rows.length + 1 ; iRow2++)
			//1030424	Kenny	[1020969]	增加判斷相關案件文號相同才打勾
			//document.all["dg1__ctl"+iRow2+"_cbSelect"].checked = true ;
			{
				if ( document.all["dg1__ctl"+iRow+"_txComNo"].value == document.all["dg1__ctl"+iRow2+"_txComNo"].value )
					//1101109 Zen 1101293 修正取消勾選彙併辦母文後子文未同步取消之問題
					//document.all["dg1__ctl"+iRow2+"_cbSelect"].checked = true ;
					document.all["dg1__ctl"+iRow2+"_cbSelect"].checked = bSelected ;
			}
		}
	}
}

//1050329 David 1050087 二代公文修改，將DropDownList裡的item清除
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);

	argObj.length = 0;
	return;
}