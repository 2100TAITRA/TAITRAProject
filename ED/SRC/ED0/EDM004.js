/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060811   Justin   1060378     新增特定業務流程維護作業
 * 1070710   Justin   1070678     弱掃XSS修正
 * 1070830   Justin   1070678     弱掃AJAX修改
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
//指定DataGrid欄位
var strTableFields = new Array("_lbOWN_OU_NAME", "_H_OWN_OU_ID", "_lbOWN_ROLE_NAME", "_H_OWN_ROLE_ID", "_lbOWN_USER_NAME", "_H_OWN_USER_ID", "_lbTX_NAME");
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
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    document.all.txOuId.value = document.all.dlDept.options[document.all.dlDept.selectedIndex].value;
    document.all.txRoleId.value = document.all.dlRole.options[document.all.dlRole.selectedIndex].value;
    document.all.txUserId.value = document.all.dlUser.options[document.all.dlUser.selectedIndex].value;

    DeptChang();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btSet":
            Page_BlockSubmit = true;
            var strFlowNo = document.all["txFLOW_NO"].value;
            var strUseDept = document.all["H_OU_ID"].value;
            var strOrgNo = document.all["SourceOrgNo"].value;
            var strUrl = "EDM004C1.aspx?Return=true&argOrgNo=" + strOrgNo + "&argFlowNo=" + strFlowNo + "&argUseDept=" + strUseDept;
            jf_OpenChildWin(strUrl, "EDM004C1", 800, 600);
            break;
        case "btClear":
            Page_BlockSubmit = true;
            document.all["txOU_ID_Name"].value = "";
            document.all["H_OU_ID"].value = "";
            document.all["H_OU_Name"].value = "";
            break;
        case "btAdd":
            Page_BlockSubmit = false;
            if (jf_CheckBeforAdd())
            {
                IsServerHandling = true;
                __doPostBack("btAdd", 0);
            }
            break;
        //以下屬於DataGrid ToolBar
        case "btDeleteSelected":
            Page_BlockSubmit = false;
            jf_SelectBarSubmit(xObjectName);
            break;
        case "btUp":
            Page_BlockSubmit = true;
            jf_RowUp("dg1", "_cbSelect", strTableFields);
            break;
        case "btDown":
            Page_BlockSubmit = true;
            jf_RowDown("dg1", "_cbSelect", strTableFields);
            break;
    }
}

//新增流程前檢查
function jf_CheckBeforAdd()
{
    var bRtnbool = true;
    var strErrMsg = "";
    var strErrMsgOu = "";
    var strErrMsgRole = "";
    
    if (document.all["txOuId"].value == "" || document.all["txOuName"].value == "") {
        if (document.all["txOuId"].value == "" && document.all["txOuName"].value != "")
            strErrMsg += "單位資訊代碼欄位不可空白\n";
        else if(document.all["txOuId"].value != "" && document.all["txOuName"].value == "")
            strErrMsg += "單位資訊名稱欄位不可空白\n";
        else
            strErrMsgOu += "單位";
    }

    if (document.all["txRoleId"].value == "" || document.all["txRoleName"].value == "") {
        if (document.all["txRoleId"].value == "" && document.all["txRoleName"].value != "")
            strErrMsg += "角色資訊代碼欄位不可空白\n";
        else if (document.all["txRoleId"].value != "" && document.all["txRoleName"].value == "")
            strErrMsg += "角色資訊名稱欄位不可空白\n";
        else
            strErrMsgRole += "角色";
    }

    if (strErrMsgOu != "" && strErrMsgRole != "") {
        strErrMsg += strErrMsgOu + "及" + strErrMsgRole + "資訊不可皆為空白\n";
    }

    if (document.all["txUserId"].value == "" && document.all["txUserName"].value != "")
        strErrMsg += "人員資訊帳號欄位不可空白\n";
    if (document.all["txUserId"].value != "" && document.all["txUserName"].value == "")
        strErrMsg += "人員資訊姓名欄位不可空白\n";

    if (document.all["txTX_NAME"].value == "") {
        strErrMsg += "異動別欄位不可空白\n";
        $('#txTX_NAME').focus();
    }

    if (strErrMsg != "") {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
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
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
			    var strTemp = "";
			    document.all["H_txOU_NAME_Order"].value = "";
			    document.all["H_txOU_ID_Order"].value = "";
			    document.all["H_txROLE_NAME_Order"].value = "";
			    document.all["H_txROLE_ID_Order"].value = "";
			    document.all["H_txUSER_NAME_Order"].value = "";
			    document.all["H_txUSER_ID_Order"].value = "";
			    document.all["H_txTX_NAME_Order"].value = "";
			    for (var i = 2; i <= document.all.dg1.rows.length; i++)
			    {
			        document.all["H_txOU_NAME_Order"].value += strTemp + document.all["dg1__ctl" + i + "_lbOWN_OU_NAME"].textContent;
			        document.all["H_txOU_ID_Order"].value += strTemp + document.all["dg1__ctl" + i + "_H_OWN_OU_ID"].value;
			        document.all["H_txROLE_NAME_Order"].value += strTemp + document.all["dg1__ctl" + i + "_lbOWN_ROLE_NAME"].textContent;
			        document.all["H_txROLE_ID_Order"].value += strTemp + document.all["dg1__ctl" + i + "_H_OWN_ROLE_ID"].value;
			        document.all["H_txUSER_NAME_Order"].value += strTemp + document.all["dg1__ctl" + i + "_lbOWN_USER_NAME"].textContent;
			        document.all["H_txUSER_ID_Order"].value += strTemp + document.all["dg1__ctl" + i + "_H_OWN_USER_ID"].value;
			        document.all["H_txTX_NAME_Order"].value += strTemp + document.all["dg1__ctl" + i + "_lbTX_NAME"].textContent;
			        strTemp = ";";
			    }

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
			var strUrl = "";
			var strFlowNo = jf_Trim(document.all["txFLOW_NO"].value);
			var strFlowName = jf_Trim(document.all["txFLOW_NAME"].value);
			strUrl = "EDI004.aspx?rtnObj=lbReturnValue&argFrom=EDM004&argFlowNo=" + strFlowNo + "&argFlowName=" + strFlowName;
			jf_OpenChildWin(strUrl, "EDI004", 800, 600);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
		    if (jf_CheckDataExists())//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}		
	return bRtnbool;
}

//檢查鍵值是否已存在
function jf_CheckDataExists()
{
    //1070830 Justin [1070678]弱掃AJAX修改
    //return EDM004.CheckKeyExist(document.all["SourceOrgNo"].value, document.all["txFLOW_NO"].value).value;
    return ED0.EDM004.CheckKeyExist(document.all["SourceOrgNo"].value, document.all["txFLOW_NO"].value).value;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txFLOW_NO"].value == "")
	{
	    strErrMsg += "流程代碼欄位不可空白\n";
	    $('#txFLOW_NO').focus();
	}
	
	if (document.all["txFLOW_NAME"].value == "")
	{
	    strErrMsg += "流程名稱欄位不可空白\n";
	    $('#txFLOW_NAME').focus();
	}

	if (document.all.dg1.rows.length < 2 || document.all["dg1__ctl2_H_OWN_ROLE_ID"].value == "") {
	    strErrMsg += "請先新增流程\n";
	}

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
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
		}
		else
		{
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
    if (argCallerId == "EDI004")
	{
		document.all["txFLOW_NO"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txFLOW_NO"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		$('#txFLOW_NO').focus();
    }
    else if (argCallerId == "EDM004C1") {
        var Cnt = document.all["lbReturnValue"].options.length;
        var strIDName = "";
        var strTempID = "";
        var strTempName = "";
        var strTemp = "";

        for (var n = 0; n < Cnt; n++) {
            if (n != 0)
                strTemp = ",";
            strIDName += strTemp + "(" + jf_Trim(document.all.lbReturnValue.options[n].value) + ")";
            strIDName += jf_Trim(document.all.lbReturnValue.options[n].text);
            strTempID += jf_Trim(document.all.lbReturnValue.options[n].value) + ",";
            strTempName += jf_Trim(document.all.lbReturnValue.options[n].text) + ",";
        }
        document.all["txOU_ID_Name"].value = strIDName;
        document.all["H_OU_ID"].value = strTempID;
        document.all["H_OU_Name"].value = strTempName;
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
//單位資訊一級選單
function DeptChang() {
    //1070710 Justin [1070678] 弱掃XSS修正
	//var argDept = document.all.dlDept.options[document.all.dlDept.selectedIndex].value;
	var argDept = encodeURI(document.all.dlDept.options[document.all.dlDept.selectedIndex].value);
    var objSect = document.all.dlSect.options[document.all.dlSect.selectedIndex];
    var argSect = "";
    var strSectIndex = document.all.dlSect.selectedIndex;
    var strRoleIndex = document.all.dlRole.selectedIndex;

    fnClearDropDownList(document.all.dlSect);
    if (argDept == "") {
        fnClearDropDownList(document.all.dlRole);
        fnClearDropDownList(document.all.dlUser);
        document.all.txOuId.value = "";
        document.all.txOuName.value = "";
        document.all.txRoleId.value = "";
        document.all.txRoleName.value = "";
        document.all.txUserId.value = "";
        document.all.txUserName.value = "";
        HandleDlStatus("dlSect");
        return;
    }

    //1070830 Justin [1070678]弱掃AJAX修改
    //var Subvalue = EDM004.GetSub(document.all["SsoArtifact"].value, argDept).value;
    var Subvalue = ED0.EDM004.GetSub(document.all["SsoArtifact"].value, argDept).value;
    if (Subvalue.length > 0) {
        for (var j = 1 ; j < document.all.dlSect.options.length ; j++) {
            document.all.dlSect.options.remove(1);
        }
        for (var i = 0; i < Subvalue.length; i++) {
            var strSect = Subvalue[i];
            document.all.dlSect.options.add(new Option(strSect.split('|')[0], strSect.split('|')[1]));
        }
    }
    if (argDept == document.all.txOuId.value)
        document.all.dlSect.selectedIndex = strSectIndex;
    else
        document.all.dlSect.selectedIndex = 0;
    HandleDlStatus("dlSect");

    var arWSParam = new Array(1);
    arWSParam[0] = argDept;
    var CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetSubRole", false, arWSParam);
    if (CallWsObj.error) {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["找不到單位下角色資訊。"])), "");
        fnClearDropDownList(document.all.dlRole);
        fnClearDropDownList(document.all.dlUser);
        return;
    }
    else {
        var dlLen = document.all.dlRole.options.length;
        for (var j = 1 ; j < dlLen ; j++) {
            document.all.dlRole.options.remove(1);
        }
        for (var i = 0 ; i < CallWsObj.value.RoleNo.length ; i++) {
            var oOption = document.createElement("OPTION");
            document.all.dlRole.options.add(oOption);
            oOption.text = CallWsObj.value.RoleName[i];
            oOption.value = CallWsObj.value.RoleNo[i];
        }
    }
    if (objSect != null && document.all.dlSect.selectedIndex != -1) {
        argSect = document.all.dlSect.options[document.all.dlSect.selectedIndex].value;
    }
    if (argDept == document.all.txOuId.value || argSect == document.all.txOuId.value)
        document.all.dlRole.selectedIndex = strRoleIndex;
    else {
        document.all.dlRole.selectedIndex = 0;
        document.all.dlUser.selectedIndex = 0;
    }

    document.all.txOuId.value = argDept;
    document.all.txOuName.value = document.all.dlDept.options[document.all.dlDept.selectedIndex].text;

    RoleChang();
}

//單位資訊二級選單
function SectChang() {
	//1070710 Justin [1070678] 弱掃XSS修正
    //var argDept = document.all.dlDept.options[document.all.dlDept.selectedIndex].value;
    //var argSect = document.all.dlSect.options[document.all.dlSect.selectedIndex].value;
	var argDept = encodeURI(document.all.dlDept.options[document.all.dlDept.selectedIndex].value);
    var argSect = encodeURI(document.all.dlSect.options[document.all.dlSect.selectedIndex].value);
    var strRoleIndex = document.all.dlRole.selectedIndex;
    var strOuId = "";

    if (argSect == "") {
        strOuId = argDept;
        document.all.txOuName.value = document.all.dlDept.options[document.all.dlDept.selectedIndex].text;
    }
    else {
        strOuId = argSect;
        document.all.txOuName.value = document.all.dlSect.options[document.all.dlSect.selectedIndex].text;
    }
    if (strOuId == "")
        return;

    var arWSParam = new Array(1);
    arWSParam[0] = strOuId;
    var CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetSubRole", false, arWSParam);
    if (CallWsObj.error) {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["找不到單位下角色資訊。"])), "");
        fnClearDropDownList(document.all.dlRole);
        fnClearDropDownList(document.all.dlUser);
        return;
    }
    else {
        var dlLen = document.all.dlRole.options.length;
        for (var j = 1 ; j < dlLen ; j++) {
            document.all.dlRole.options.remove(1);
        }
        for (var i = 0 ; i < CallWsObj.value.RoleNo.length ; i++) {
            var oOption = document.createElement("OPTION");
            document.all.dlRole.options.add(oOption);
            oOption.text = CallWsObj.value.RoleName[i];
            oOption.value = CallWsObj.value.RoleNo[i];
        }
    }

    if (argSect == document.all.txOuId.value)
        document.all.dlRole.selectedIndex = strRoleIndex;
    else {
        document.all.dlRole.selectedIndex = 0;
        document.all.dlUser.selectedIndex = 0;
    }

    document.all.txOuId.value = strOuId;

    RoleChang();
}

//角色資訊選單
function RoleChang() {
    //1070710 Justin [1070678] 弱掃XSS修正
	//var argRole = document.all.dlRole.options[document.all.dlRole.selectedIndex].value;
	var argRole = encodeURI(document.all.dlRole.options[document.all.dlRole.selectedIndex].value);
    var strUserIndex = document.all.dlUser.selectedIndex;

    if (document.all.dlDept.selectedIndex == 0)
        return;
    else
    {
        if (document.all.dlSect.selectedIndex == 0)
            document.all.txOuId.value = document.all.dlDept.options[document.all.dlDept.selectedIndex].value;
        else
            document.all.txOuId.value = document.all.dlSect.options[document.all.dlSect.selectedIndex].value;
    }


    var arWSParam = new Array(2);
	//1070710 Justin [1070678] 弱掃XSS修正
    //arWSParam[0] = document.all.txOuId.value;
	arWSParam[0] = encodeURI(document.all.txOuId.value);
    arWSParam[1] = argRole;
    var CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetAllUsersOfRole", false, arWSParam);
    if (CallWsObj.error) {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["找不到單位角色下帳號資訊。"])), "");
        fnClearDropDownList(document.all.dlUser);
        return;
    }
    else {
        var dlLen = document.all.dlUser.options.length;
        for (var j = 1 ; j < dlLen ; j++) {
            document.all.dlUser.options.remove(1);
        }
        for (var i = 0 ; i < CallWsObj.value.EmpName.length ; i++) {
            var oOption = document.createElement("OPTION");
            document.all.dlUser.options.add(oOption);
            oOption.text = CallWsObj.value.EmpName[i];
            oOption.value = CallWsObj.value.UserName[i];
        }
    }

    if (argRole == document.all.txRoleId.value)
        document.all.dlUser.selectedIndex = strUserIndex;
    else
        document.all.dlUser.selectedIndex = 0;

    document.all.txRoleId.value = argRole;
    document.all.txRoleName.value = document.all.dlRole.options[document.all.dlRole.selectedIndex].text;

    UserChang()
}

//人員資訊選單
function UserChang() {
    var argUser = document.all.dlUser.options[document.all.dlUser.selectedIndex].value;
    document.all.txUserId.value = argUser;
    document.all.txUserName.value = document.all.dlUser.options[document.all.dlUser.selectedIndex].text;
}

//清空選單
function fnClearDropDownList(obj)
{
    while (obj.options.length > 1)
        obj.options.remove(1);
}

//選單無值不顯示
function HandleDlStatus(argDlID)
{
    if (document.all[argDlID].options.length <= 1)
        document.all[argDlID].className = "hide";
    else
        document.all[argDlID].className = "";
}