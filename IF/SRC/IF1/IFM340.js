/*
 * DATE    SA	   PRG		MGR_NO		DESC
 * 1050414 Kevin   Justin   1050087     二代公文修改
 * 1050718 Kevin   Justin   1050087     二代ShowModalDialog修改
 * 1050815 Kevin   Justin	1050700		弱掃Client Potential Code Injection修正
 * 1051019	Leslie	Joe		1050087		二代修改配合行動平台
 * 1060613	Kevin	Joe		1060456		弱掃修改
 * 1070803	Kevin	Joe		1070678		修正弱掃Client Cookies Inspection
 * 1070905	Kevin	Joe		1070678		修正弱掃Client Cookies Inspection
 * 1150206	Zen		Andy	序63        修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050414 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
var UserId = "";
var UserName = "";

function ShowMsg() {
    //1050414 Justin 1050087 二代公文修改 
    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    Page_BlockSubmit = true;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        /*
		case "":
			break;
		*/
    }
}

//1050414 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    //1050414 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050414 Justin 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            Page_BlockSubmit = !jf_CheckBeforeSav();
            //1050414 Justin 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050414 Justin 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050414 Justin 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            break;
        case "btSearch":
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            break;
    }
}

function CallBack(argCallerId) {
    //1050718 Justin 1050087 二代ShowModalDialog修改，行為改成與window.open() 相似，都由CallBack()負責取得回傳值與執行後續行為
    if (argCallerId == "IFC021") {
        if (IsRationalValue(document.all["lbReturnValue"].options)) {
            document.all[UserId].value = document.all.lbReturnValue.options[0].value;
            document.all[UserName].textContent = document.all.lbReturnValue.options[2].value;
            UserId = "";
            UserName = "";
            //修改showmodaldialog開啟視窗，清除Cookie
			//1070905	Joe		1070678		修正弱掃Client Cookies Inspection
            // jf_SaveCookie("iic021OrgNo", "");
        }
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
    //1050718 Justin 1050087 二代ShowModalDialog修改--END--
}
//1050718 Justin 1050087 二代ShowModalDialog修改
function IsRationalValue(val) {
    if (val == undefined)
        return false;
    if (val == null)
        return false;
    return true;
}

function ClientOnLoad() {
    //var sAuthws = document.all.authWS.value;
    //fnCallWS(sAuthws, "GetAccountNameWithOrgNo", null);
    ShowMsg();
}

function OnWSResult(argResult) {
    if (jf_IsWebServiceSuccess(argResult)) {
    }
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId) {
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050418 Justin 1050087 二代公文修改 
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}
CheckCount = 0;
function fnCheckDate(argEventObj) {
    if (CheckCount != 0) {
        CheckCount = 0;
        return;
    }
    if (argEventObj.value != "") {
        var strDate = argEventObj.value;
        if (strDate.length < 7) {
            strDate = jf_PADL(strDate, 7, '0');
            argEventObj.value = strDate;
        }
        if (jf_CheckCDATE(argEventObj.value) == false) {
            CheckCount = 1;
            argEventObj.focus();
            alert("日期格式不正確。");
            argEventObj.value = "";
            CheckCount = 0;
            return false;
        }
        return true;
    }
    return true;
}
function jf_CheckBeforeSav() {
    for (var i = 2; i <= document.all.dg1.rows.length; i++) {
        if (document.all["dg1__ctl" + i + "_txUser"].value != "") {
            if (!fnCheckDate(document.all["dg1__ctl" + i + "_txStartDate"]))
                return false;
            if (!fnCheckDate(document.all["dg1__ctl" + i + "_txEndDate"]))
                return false;
        }
    }
    return true;
}
/*1050815 Justin 1050700 用不到
function CallGetAccountName(argEventObj) {
    var sArt = document.all.SsoArtifact.value;
    var sAuthws = document.all.authWS.value;
    var sUserAccount = jf_Trim(argEventObj.value)

    var lbUserNameObj = fnFindControl(argEventObj, "lbUserName");
    if (sUserAccount == "")
        fnCleanDataOfTheSameRow(argEventObj);

    if (sArt == "" || sAuthws == "" || sUserAccount == "")
        return;

    var param = new Array(3);
	param[0] = sArt;
    param[1] = sUserAccount;
    param[1] = sOrgNo;
	var result = fnCallWS(sAuthws, "GetAccountNameWithOrgNo", param);

    if (result.error == false) {
        lbUserNameObj.innerText = result.value;
        if (result.value == "") {
            fnCleanDataOfTheSameRow(argEventObj);
            argEventObj.focus();
            alert("帳號不存在");
        }
    }
    else
        alert(result.errorDetail.string);
}*/

function fnCleanDataOfTheSameRow(argSiblingObj) {
    var txUserObj = fnFindControl(argSiblingObj, "txUser");
    var lbUserNameObj = fnFindControl(argSiblingObj, "lbUserName");
    var txStartDateObj = fnFindControl(argSiblingObj, "txStartDate");
    var txEndDateObj = fnFindControl(argSiblingObj, "txEndDate");

    txUserObj.value = "";
    //1050418 Justin 1050087 二代公文修改 
    //lbUserNameObj.innerText = "";
    lbUserNameObj.textContent = "";
    txStartDateObj.value = "";
    txEndDateObj.value = "";
}


function fnFindControl(argSiblingObj, argTargetId) {
    var idx = argSiblingObj.id.lastIndexOf("_");
    var headName = argSiblingObj.id.substring(0, idx);
    return document.all[headName + "_" + argTargetId];
}

function fnCallW(argWS, argFuncName, argParam) {
    var callObj = new Object();
    callObj.funcName = argFuncName;      // Name of the remote function.
    callObj.async = false;         // A Boolean that specifies the type of call
    callObj.timeout = 20;         // Timeout value for the method call (seconds)
    // SOAP header information
    callObj.SOAPHeader = "<SOAP-ENV:Header>";
    callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
    callObj.SOAPHeader += 5;
    callObj.SOAPHeader += "</t:Transaction>";
    callObj.SOAPHeader += "</SOAP-ENV:Header>";

    service.useService(argWS + "?WSDL", "Serv");

    if (argParam == null || argParam.length == 0)
        return service.Serv.callService(callObj, argParam);
    else {
        var s = "service.Serv.callService(callObj ";
        for (var i = 0; i < argParam.length; i++)
            s += ", argParam[" + i + "]";
        s += ");";
        callID = eval(s);
    }
    return callID;
}
function fnCallWS(argWS, argFuncName, argParam) {
    var callObj = new Object();
    callObj.funcName = argFuncName;      // Name of the remote function.
    callObj.async = false;         // A Boolean that specifies the type of call
    callObj.timeout = 20;         // Timeout value for the method call (seconds)
    // SOAP header information
    callObj.SOAPHeader = "<SOAP-ENV:Header>";
    callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
    callObj.SOAPHeader += 5;
    callObj.SOAPHeader += "</t:Transaction>";
    callObj.SOAPHeader += "</SOAP-ENV:Header>";

    service.useService(argWS + "?WSDL", "Serv");

    if (argParam == null || argParam.length == 0)
        return service.Serv.callService(callObj, argParam);
    else if (argParam.length == 1)
        callID = service.Serv.callService(callObj, argParam[0]);
    else if (argParam.length == 2)
        callID = service.Serv.callService(callObj, argParam[0], argParam[1]);

    return callID;
}
//查詢使用者
function fnQueryUser(argUserId_ID, argUserName_ID) {
    Page_BlockSubmit = true;
    /*1050718 Justin 1050087 二代ShowModalDialog修改
    var ret = jf_ShowOrgDialogForAllWithOrgNo(document.all["txActiveOrgNo"].value);
    if (ret) {
        document.all[argUserId_ID].value = ret.Code;
        document.all[argUserName_ID].innerText = ret.Name;
    }*/
    UserId = argUserId_ID;
    UserName = argUserName_ID;
    jf_ShowOrgDialogForAllWithOrgNo(document.all["txActiveOrgNo"].value);
}

function jf_ShowOrgDialogForAllWithOrgNo(argOrgNo) {
    var arrSelectType = new Array(3);
    arrSelectType[0] = "Unit";
    arrSelectType[1] = "Role";
    arrSelectType[2] = "Account";
    /*1050718 Justin 1050087 二代ShowModalDialog修改
    var ret = jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
    return ret;*/
    jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
}
function CheckAccountWithOrgNo(argCodeId, argNameId) {
    var oCode = document.all[argCodeId];
    var oName = document.all[argNameId];
    var oOrgNo = document.all["txActiveOrgNo"];
    oCode.value = jf_Trim(oCode.value);

    if (oCode.value == "") {
        oName.value = "";
        return true;
    }

	//1060613	Joe		1060456		弱掃修正
    // var sAuthws = document.all.authWS.value;
    var sAuthws = encodeURI(document.all.authWS.value);
    var argWSParam = new Array(2);
	/*1050815 Justin 1050700 弱掃Client Potential Code Injection修正
	argWSParam[0] = document.all.SsoArtifact.value;
	argWSParam[1] = oCode.value;
	argWSParam[2] = oOrgNo.value;
	var CallWsObj = fnCallW(sAuthws, "GetAccountNameWithOrgNo", argWSParam);*/
	argWSParam[0] = encodeURI(oCode.value);
	argWSParam[1] = encodeURI(oOrgNo.value);
    var CallWsObj = jf_CallWS(sAuthws, "GetAccountNameWithOrgNo", false, argWSParam);

    if (!CallWsObj.error && CallWsObj.value && CallWsObj.value != "") {
        if (oName.tagName.toUpperCase() == "INPUT")
            oName.value = jf_Trim(CallWsObj.value);
        else if (oName.tagName.toUpperCase() == "SPAN") {
            //1050418 Justin 1050087 二代公文修改 
            //oName.innerText = jf_Trim(CallWsObj.value);
            oName.textContent = jf_Trim(CallWsObj.value);
        }
        else
            oName.value = jf_Trim(CallWsObj.value);
        return true;
    }
    else {
        //alert("找不到使用者[" + oCode.value + "]的資料，請重新輸入。");
        //oCode.focus();
        if (oName.tagName.toUpperCase() == "INPUT")
            oName.value = "";
        else if (oName.tagName.toUpperCase() == "SPAN"){
            //1050418 Justin 1050087 二代公文修改
            //oName.innerText = "";
            oName.textContent = "";
        }
        else
            oName.value = "";
        return false;
    }
}
function jf_ShowOrgDialogByLevel(argParam, argSelectType, argOrgNo) {
    var sSelectType = "";
    for (var i = 0; i < argSelectType.length; i++) {
        if (i != 0)
            sSelectType += ",";
		//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
        // sSelectType += "'" + argSelectType[i] + "'";
        sSelectType += argSelectType[i];
    }
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--S
    // jf_SaveCookie("iic021StrctureType", argParam);
    // jf_SaveCookie("iic021SelectType", sSelectType);
    // if (argOrgNo)
        // jf_SaveCookie("iic021OrgNo", argOrgNo);
    /*1050718 Justin 1050087 二代ShowModalDialog修改
    var ret = fnOpen("IFC021.htm", "288", "470");*/
    // jf_ShowModal("IFC021.aspx" + GetAllParamStr(), "288", "470");
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--S
    if (argOrgNo)
        //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "288", "470");
        jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo);
	else
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--E
        //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
        //jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType, "288", "470");
        jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType);
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--E
    //清除Cookie
    //if (argOrgNo)
    //    jf_SaveCookie("iic021OrgNo", "");
    /*1050718 Justin 1050087 二代ShowModalDialog修改
    return ret;*/
}
/*1050718 Justin 1050087 二代ShowModalDialog修改
function fnOpen(arg, argW, argH) {
    var sFeatures = "dialogWidth: " + argW + "px;dialogHeight:" + argH + "px";
    var ret = window.showModalDialog(arg, "", sFeatures);
    return ret;
}*/
function jf_SaveCookie(argCookieName, argValue) {
    document.cookie = argCookieName + '=' + escape(argValue) + ';path=/';
}