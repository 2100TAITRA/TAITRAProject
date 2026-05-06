/*
DATE 	 SA     PRG	    MGR_NO		DESC
1060417  David  Zen     1050087     二代公文修改
1120915	 David  Joe		1120709		弱掃修正XSS
1131009  Kevin  Jason   1130941     航港局弱掃復掃修正XSS
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
var strTableFields = new Array("_hlLink", "_lbRead1", "_lbRead2");

if (document.all.tbTool)
    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060417 Zen 1050087 二代公文修改    //jf_CallWA("EDT200WS.asmx", "GetDocScoreInfo", false, null);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060417 Zen 1050087 二代公文修改//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060417 Zen 1050087 二代公文修改    //var xObjectName = document.activeElement.id;
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
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060417 Zen 1050087 二代公文修改//function jf_ToolBarHandle()
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

    //1060417 Zen 1050087 二代公文修改    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSave":
            if (jf_CheckDataGridDuplicate("dg1", "txDocNo", "公文文號欄位", true)) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060417 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(false);
            for (var i = 2; i < 22; i++)
            {
                //1060417 Zen 1050087 二代公文修改--begin                //document.getElementById("dg1__ctl" + i + "_lbUser").innerText = "";
                //document.getElementById("dg1__ctl" + i + "_txSub").innerText = "";
                document.getElementById("dg1__ctl" + i + "_lbUser").textContent = "";
                document.getElementById("dg1__ctl" + i + "_txSub").textContent = "";
                //1060417 Zen 1050087 二代公文修改--end            }
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

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_CallWebService(argDocNo, argUser, argExScore, argFinalScore, argSub)
{
    var strDocNo = jf_Trim(argDocNo.value);

    if (strDocNo == "")
    {
        argDocNo.value = "";
        //1060417 Zen 1050087 二代公文修改        //argUser.innerText = "";
        argUser.textContent = "";
        argExScore.value = "";
        argFinalScore.value = "";
        //1060417 Zen 1050087 二代公文修改        //argSub.innerText = "";
        argSub.textContent = "";
        return;
    }
    var arWSParam = new Array(4);
    //1131007   Jason	1130941 航港局弱掃復掃修正Client Potential XSS
    //arWSParam[0] = strDocNo;
    arWSParam[0] = encodeURI(strDocNo);
	//1120915	Joe		1120709		弱掃修正XSS
    // arWSParam[1] = document.all.H_Right.value;
    // arWSParam[2] = document.all.H_OrgNo.value;
    // arWSParam[3] = document.all.H_UnitCode.value;
    arWSParam[1] = encodeURI(document.all.H_Right.value);
    arWSParam[2] = encodeURI(document.all.H_OrgNo.value);
    arWSParam[3] = encodeURI(document.all.H_UnitCode.value);
    CallWsObj = jf_CallWA("EDT200WS.asmx", "GetDocScoreInfo", false, arWSParam);
    if (jf_IsWebServiceSuccess(CallWsObj))
    {
        argDocNo.value = CallWsObj.value.DocNo;
        if (!CallWsObj.value.Exist)
        {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["該公文文號不存在！"])), "");
            //1060417 Zen 1050087 二代公文修改            //argDocNo.focus();
            $('#' + argDocNo).focus();
            return;
        }
        else if (!CallWsObj.value.Right)
        {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["權限不足，您無法評比此份公文的辦理成績！"])), "");
            return;
        }
        //1060417 Zen 1050087 二代公文修改--begin        //argUser.innerText = CallWsObj.value.UserName;
        //argSub.innerText = CallWsObj.value.Subject;
        argUser.textContent = CallWsObj.value.UserName;
        argSub.textContent = CallWsObj.value.Subject;
        //1060417 Zen 1050087 二代公文修改--end        argExScore.value = CallWsObj.value.ExpectScore;
        argFinalScore.value = CallWsObj.value.FinalScore;
    }
    else
    {
        return;
    }
}


