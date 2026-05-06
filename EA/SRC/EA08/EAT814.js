/*
DATE	SA		PRG		MGR_NO	DESC
1061005 Kevin   Joe		1060099 新增程式
1070709 Kevin   Zen     1070678 弱掃XSS修正
1070803 Kevin   Justin	1070678 弱掃修正Client Cookies Inspection
1091124	Leslie	Leslie	1090885		取消網址列的權杖，配合修正取得網址參數邏輯*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{

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
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "ibHelp":
			//1070803 Justin [1070678]弱掃修正Client Cookies Inspection--S
            //jf_SaveCookie("iic021StrctureType", "0");
            //jf_SaveCookie("iic021SelectType", "'Account'");
            Page_BlockSubmit = true;
            //jf_ShowModal("../../../IF/IF1/IFC021.aspx" + GetAllParamStr(), "800", "600");
			jf_ShowModal("../../../IF/IF1/IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=Account", "800", "600");
			//1070803 Justin [1070678]弱掃修正Client Cookies Inspection--E
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

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckBeforOpen();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            Page_BlockSubmit = !jf_CheckBeforSave();
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
            strUrl = "EAI812.aspx";
            jf_OpenChildWin(strUrl, "EAI812", 800, 600);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";
    if (document.all.txUserName_S.value == "")
    {
        strErrMsg += "簽核者不可為空白\n";
    }
    if (document.all.txSignReason.value == "")
    {
        strErrMsg += "簽核意見不可為空白\n";
    }
    else if (document.all.txSignReason.value.length > 200)
    {
        strErrMsg += "簽核意見不可超過200字，目前共" + document.all.txSignReason.value.length + "字";
    }
    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}
//儲存前之欄位檢查
function jf_CheckBeforOpen()
{
    var bRtnbool = true;
    if (document.all.txApplyNo.value == "")
    {
        alert('申請單號不可為空白');
        bRtnbool = false;
    }
    return bRtnbool;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/



/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{

    if (argCallerId == "EAI812")
    {
        if (document.all["txApplyNo"] != null)
            document.all["txApplyNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        jf_ToolBarSubmit("btOpen");
    }
    if (argCallerId == "IFC021")
    {
        if (document.all["txUserName_S"] != null)
            document.all["txUserName_S"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        if (document.all["txEmpName_S"] != null)
            document.all["txEmpName_S"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function CallGetAccountName(argAccountId, argNameId)
{
    var sArt = document.all.SsoArtifact.value;
    //1070709 Zen 1070678 弱掃XSS修正
    //var sAuthws = document.all.authWS.value;
    var sAuthws = encodeURI(document.all.authWS.value);

    if (sArt == "" || sAuthws == "")
        return;
    document.all[argAccountId].value = jf_Trim(document.all[argAccountId].value);
    if (document.all[argAccountId].value == "")
    {
        document.all[argNameId].value = "";
        return;
    }

    var param = new Array(2);
    param[0] = encodeURI(sArt);
    param[1] = encodeURI(document.all[argAccountId].value);
    var result = jf_CallW(sAuthws, "GetAccountName", false, param);

    if (result.error == false)
    {
        if (result.value == "")
        {
            document.all[argAccountId].value = "";
            document.all[argNameId].value = "";
            $('#' + argAccountId).focus();
            alert("帳號不存在。");
        }
        else
        {
            document.all[argNameId].value = result.value;
        }
    }
    else
        alert(result.errorDetail.string);
}
function GetAllParamStr()
{
    var strParam = "";
    var pUrl = unescape(this.location.search);	//一樣要經過解碼
    //1091124	Leslie[1090885]	取消網址列的權杖
    /*if (pUrl != -1)
        return pUrl;*/
	if( pUrl != -1 )
	{
		var i = pUrl.indexOf("?");
		if(i != -1)
			strParam = pUrl.substr(i); 
		else
			strParam = "?";	//串上"?"以避免外部呼叫端會串上各程式專用的參數
	}
    return strParam;
}