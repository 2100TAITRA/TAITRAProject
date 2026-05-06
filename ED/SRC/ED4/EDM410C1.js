/*
DATE    SA      PRG     MGR_NO		DESC
1051229 David   Zen     1050087     二代公文修改
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

//1051229 Zen 1050087 二代公文修改//if (document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051229 Zen 1050087 二代公文修改//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051229 Zen 1050087 二代公文修改    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

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
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051229 Zen 1050087 二代公文修改//function jf_ToolBarHandle()
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

    //1051229 Zen 1050087 二代公文修改    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1051229 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1051229 Zen 1050087 二代公文修改            //document.all["txTranReason"].focus();
            $('#txTranReason').focus();
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1051229 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1051229 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

    }
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
        if (jf_IsWebServiceSuccess(argResult))
        {
            //document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
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
    if (argCallerId == "EDM410C1")
    {
        var strTranStatus = jf_Trim(document.all.lbReturnValue.options[0].value);
        if (strTranStatus == "1")
            document.all["rbAudit"].checked == true;
        else if (strTranStatus == "2")
            document.all["rbDeAudit"].checked == true;
        document.all["txTranReason"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        if (document.all["txSuppCode"].value != "" && (document.all["rbAudit"].checked || document.all["rbDeAudit"].checked))
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
        //1051229 Zen 1050087 二代公文修改        //document.all["txTranReason"].focus();
        $('#txTranReason').focus();
    }


    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}
//組出回傳值
function ReturnValue(argLink, argRead1)
{

    try
    {
        opener.document.all.lbReturnValue.length = 2;
        opener.document.all.lbReturnValue.options[0].value = argLink;
        opener.document.all.lbReturnValue.options[1].value = argRead1;
        opener.window.CallBack("EDM410C1");
        close();
    }
    catch (e) { }

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
