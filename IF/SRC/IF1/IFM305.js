/*
DATE	SA		PRG		MGR_NO			DESC
1060823	Kevin	Kevin	1060510			新增程式
1070717	Kevin  	Joe		1070678			弱掃修正Client Potential Code Injection
1070803	Kevin	Joe		1070678			修正弱掃Client Cookies Inspection
1070810	Kevin	Joe		1070678			修正弱掃Client Potential Code Injection
1070904	Kevin	Justin	1070678			弱掃修正CookieHttpOnly
1070905	Kevin	Joe		1070678			修正弱掃Client Cookies Inspection
1071001	Kevin	Joe		--				cookie錯誤修正
1110803	Joe		Joe		--				修正代理人設定子視窗未正確接收回傳值的問題
1150206	Zen		Andy	序63            修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

var UserId = "";
var UserName = "";

function ClientOnLoad()
{

}

function ClientButtonControl(e)
{
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    Page_BlockSubmit = true;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btAdd":
            Page_BlockSubmit = !jf_CheckBeforeAdd();
            jf_SelectBarSubmit(xObjectName);
            break;
        case "btDeleteSelected":
            Page_BlockSubmit = !CheckBeforeDeleteSelected("dgData", "_cbSelect");
            jf_SelectBarSubmit(xObjectName);
            break;
    }
}

function CheckBeforeDeleteSelected(argTableName, argCheckBoxName)
{
	if (document.all[argTableName] == null)
		return false;

	//至少要勾選一筆才return true
	for (iRow = 2; iRow < document.all[argTableName].rows.length + 1; iRow++)
	{
		if (document.all[argTableName + "__ctl" + iRow + argCheckBoxName].checked)
			return true;
	}
	return false;
}

function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
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
            Page_BlockSubmit = !jf_CheckBeforeSave();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
    	case "btPreview":
    		Page_BlockSubmit = false;
    		jf_ToolBarSubmit(xObjectName);
    		break;
    }
}

function jf_SetProxy(argAccountId, argNameId)
{
    Page_BlockSubmit = true;
    var arrSelectType = new Array(1);
    arrSelectType[0] = "Account";

    jf_ShowOrgDialogByLevel(0, arrSelectType);
    currAccountId = argAccountId;
    currNameId = argNameId;
}

var currAccountId;
var currNameId;

function CallBack(argCallerId)
{
    if (argCallerId == "IFC021")
    {
        if (IsRationalValue(document.all["lbReturnValue"].options))
        {
            document.all[currAccountId].value = document.all.lbReturnValue.options[0].value;
			//1110803	Joe		--		修正代理人設定子視窗未正確接收回傳值的問題
            // document.all[currNameId].textContent = document.all.lbReturnValue.options[2].value;
            document.all[currNameId].value = document.all.lbReturnValue.options[2].value;
            currAccountId = "";
            currNameId = "";
            //修改showmodaldialog開啟視窗，清除Cookie
			//1070904 Justin [1070678]弱掃修正CookieHttpOnly
            //jf_SaveCookie("iic021OrgNo", "");
        }
    }

    if (argCallerId == "IFM210C2")
    {
		//1070904 Justin [1070678]弱掃修正CookieHttpOnly
    	//jf_SaveCookie("nObject", document.all.nObject.value);
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function jf_SetPrivilege(argUser, argProxy)
{
	Page_BlockSubmit = true;
	/*1070904 Justin [1070678]弱掃修正CookieHttpOnly
	jf_SaveCookie("nObject", argProxy);
	jf_SaveCookie("nPrivPool", argUser);
	jf_ShowModal("IFM210C2.htm", "600", "800");*/
    //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFM210C2.htm" + "?nObject=" +argProxy+ "&nPrivPool=" +argUser, "600", "800");
    jf_ShowModal("IFM210C2.htm" + "?nObject=" + argProxy + "&nPrivPool=" + argUser);
}

function IsRationalValue(val)
{
    if (val == undefined)
        return false;
    if (val == null)
        return false;
    return true;
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
}

var bHasCheck = false;
function CheckDATE(argObj, strMsg)
{
    if (bHasCheck)
    {
        bHasCheck = false;
        return true;
    }
    bHasCheck = true;
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            $('#' + argObj).focus();
            if (strMsg)
                jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bHasCheck = false;
            return false;
        }
    }
    bHasCheck = false;
    return true;
}

function jf_CheckBeforeSave()
{
	var bSaveCheck = false;

	if (document.all.txDelAgentIdentity.value != "")
		bSaveCheck = true;

	if(document.all.dgData)
	{
		for (var i = 2; i <= document.all.dgData.rows.length; i++)
		{
			if (document.all["dgData__ctl" + i + "_lbAgentIdentity"].textContent == "0")
				bSaveCheck = true;
		}
	}
	if(!bSaveCheck)
	{
		alert('請先加入或刪除代理後再儲存。');
		return false;
	}
    return true;
}

function jf_CheckBeforeAdd()
{
	if (document.all.txBegDate.value == "" || document.all.txEndDate.value == "" || document.all.txProxyUser.value == "")
	{
		alert('代理起訖以及代理人不可為空白');
		return false;
	}
	if (!CheckDATE("txBegDate", "代理起始日"))
		return false;

	if (!CheckDATE("txEndDate", "代理結束日"))
		return false;

	if (document.all.txBegDate.value > document.all.txEndDate.value)
	{
		alert('代理起始日不可大於代理結束日');
		return false;
	}

	if (document.all.H_txNowDate.value > document.all.txEndDate.value)
	{
		alert('代理結束日不可小於系統日期');
		return false;
	}

	if (document.all.txProxyUser.value.toUpperCase() == document.all.txAccount.value.toUpperCase())
	{
		alert('代理人不可同請假人');
		return false;
	}

	return true;
}

function fnCleanDataOfTheSameRow(argSiblingObj)
{
    var txUserObj = fnFindControl(argSiblingObj, "txUser");
    var lbUserNameObj = fnFindControl(argSiblingObj, "lbUserName");
    var txStartDateObj = fnFindControl(argSiblingObj, "txStartDate");
    var txEndDateObj = fnFindControl(argSiblingObj, "txEndDate");

    txUserObj.value = "";

    lbUserNameObj.textContent = "";
    txStartDateObj.value = "";
    txEndDateObj.value = "";
}

function fnFindControl(argSiblingObj, argTargetId)
{
    var idx = argSiblingObj.id.lastIndexOf("_");
    var headName = argSiblingObj.id.substring(0, idx);
    return document.all[headName + "_" + argTargetId];
}

//查詢使用者
function fnQueryUser(argUserId_ID, argUserName_ID)
{
    Page_BlockSubmit = true;
    UserId = argUserId_ID;
    UserName = argUserName_ID;
    jf_ShowOrgDialogForAllWithOrgNo(document.all["txActiveOrgNo"].value);
}

function jf_ShowOrgDialogForAllWithOrgNo(argOrgNo)
{
    var arrSelectType = new Array(3);
    arrSelectType[0] = "Unit";
    arrSelectType[1] = "Role";
    arrSelectType[2] = "Account";

    jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
}

function jf_ShowOrgDialogByLevel(argParam, argSelectType, argOrgNo)
{
    var sSelectType = "";
    for (var i = 0; i < argSelectType.length; i++)
    {
        if (i != 0)
            sSelectType += ",";
		//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
        //sSelectType += "'" + argSelectType[i] + "'";
		sSelectType += argSelectType[i];
    }
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--S
    // jf_SaveCookie("iic021StrctureType", argParam);
    // jf_SaveCookie("iic021SelectType", sSelectType);
    // if (argOrgNo)
        // jf_SaveCookie("iic021OrgNo", argOrgNo);
    // jf_ShowModal("IFC021.aspx" + GetAllParamStr(), "400", "600");
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--S	
	//1071001	Joe		--		錯誤修正--S
	var paramstr = GetAllParamStr();
	if(paramstr == "")
		paramstr = "?";
	else
		paramstr = paramstr + "&";
	//1071001	Joe		--		錯誤修正--E
	if(argOrgNo)
		//1071001	Joe		--		錯誤修正
		// jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "400", "600");
        //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx" + paramstr + "iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "400", "600");
        jf_ShowModal("IFC021.aspx" + paramstr + "iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo);
	else
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--E
		//1071001	Joe		--		錯誤修正
		// jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType, "400", "600");
        //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx" + paramstr + "iic021SelectType=" + sSelectType, "400", "600");
        jf_ShowModal("IFC021.aspx" + paramstr + "iic021SelectType=" + sSelectType);
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--E
}

function jf_SaveCookie(argCookieName, argValue)
{
    document.cookie = argCookieName + '=' + escape(argValue) + ';path=/';
}

function CallGetAccountName(argAccountId, argNameId)
{
    var sArt = document.all.SsoArtifact.value;
    var sAuthws = document.all.H_AuthWS.value;

    if (sArt == "" || sAuthws == "")
        return;

    document.all[argAccountId].value = jf_Trim(document.all[argAccountId].value);
    if (document.all[argAccountId].value == "")
    {
        document.all[argNameId].value = "";
        return;
    }

	// 1070810	Joe		1070678		弱掃修正Client Potential Code Injection
	sAuthws = encodeURI(sAuthws)
    var param = new Array(2);
	// 1070717	Joe		1070678		弱掃修正Client Potential Code Injection--S
    // param[0] = sArt;
    // param[1] = document.all[argAccountId].value;
    param[0] = encodeURI(sArt);
    param[1] = encodeURI(document.all[argAccountId].value);
	// 1070717	Joe		1070678		弱掃修正Client Potential Code Injection--E

    var result = jf_CallW(sAuthws, "GetAccountName", false, param);

    if (result.error == false)
    {
        if (result.value == "")
        {
            document.all[argAccountId].value = "";
            document.all[argNameId].value = "";
            $('#' + argAccountId).focus();
            alert(document.all[argAccountId].value + "帳號不存在。");
        }
        else
        {
            document.all[argNameId].value = result.value;
        }
    }
    else
        alert(result.errorDetail.string);
}

function ddlAgentDesc_onchange()
{
	var index = document.all["ddlAgentDesc"].selectedIndex;

	var val = document.all["ddlAgentDesc"].options[index].textContent;
	document.all["txAgentDesc"].value += val;
	document.all["ddlAgentDesc"].options[0].selected = true;
	document.all["txAgentDesc"].focus();
}