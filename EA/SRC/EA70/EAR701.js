/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* 程式修改歷程 
* -------------------------------------------------------------------------------------------------
* 日期			修改人	單號	概要
* -------------------------------------------------------------------------------------------------
* 1060419      Joe  	1050087 二代系統升級
* 1090226		Kevin_C	1081154	修正連動邏輯
* 1090529		Cloud	[1090316]			交通部新增匯出excel功能
* 1100722      Zen     1100434	(高雄大學)新增匯出Excel功能
* 1130523      Jason    1130208 排序方式選擇為密件流水號的的時候其他欄位設為唯讀
* 1140603      Joeko   1140066         修改EAR701畫面新增跳頁條件下拉選項、報表新增欄位、非檔管格式開放Excel、一律提供跳頁及匯出ODS功能
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1060419	Joe		1050087		二代公文修改
// if(document.all.tbTool)
// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    // 1060419	Joe		1050087		二代公文修改--S
    // jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmp", false, null); //使用WebService前必須先呼叫一次
    // jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //1060419	Joe		1050087		二代公文修改--E
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    document.all["empUserId"].value = "";

    //Joeko   1140066    交通部密件流水號時保持不可跳頁
    if (document.all["ORGNICKNAME"].value == "MOTC") {
        if (document.all["rbSort1"].checked)
            SearchType("rbSort1");
        else if (document.all["rbSort2"].checked)
            SearchType("rbSort2");
        else if (document.all["rbORDER_STOCK"].checked)
            SearchType("rbORDER_STOCK");
        else if (document.all["rbSecSeq"].checked)
            SearchType("rbSecSeq");
    }
    CtrlExcelWork();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060419	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060419	joe		1050087		二代修改配合行動平台
    // var xObjectName = document.activeElement.id;
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
        case "btHelp": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060419 Joe 1050087 二代公文修改，傳入參數event
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

    //1060419 Joe 1050087 二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {

        case "btClean":
            Page_BlockSubmit = true;
            //1130523      Jason   1130208 交通部預設勾選密件流水號--S
            var strOrgNickName = document.all["ORGNICKNAME"].value;//紀錄清除前的資訊
            jf_ConfirmClean(true);
            document.all["ORGNICKNAME"].value = strOrgNickName;
            //1130523      Jason   1130208 交通部預設勾選密件流水號--E
            //1060419	Joe	1050087	二代系統升級，調整focus寫法
            //document.all["txPlanNo"].focus();
            $('#txPlanNo').focus();
            //[0970649]Add by Cola 清除後預設勾選之值	
            //1130523      Jason   1130208 交通部預設勾選密件流水號--S
            if (document.all["ORGNICKNAME"].value == "MOTC")
            {
                document.all["rbSecSeq"].checked = true;
                document.all["rbNONE"].checked = true;
                document.all["rbGROUP_FILENO"].disabled = true;
                document.all["rbGROUP_DEPT"].disabled = true;
                document.all["rbGROUP_STOCK"].disabled = true;
            }
            else
            {
                document.all["cbFM"].checked = true;
                document.all["rbSort1"].checked = true;
                document.all["rbNONE"].checked = true;
            }
            //1130523      Jason   1130208 交通部預設勾選密件流水號--E
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1060419 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060419 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btExcel":
        //1140603      Joeko   1140066         提供ODS功能
        case "btODS":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060419 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
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
    /*
    if(argCallerId == "SII020")
    {
        document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
        document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
        if(document.all["txKeyFld"].value != "")
        {
            Page_BlockSubmit=false;
            jf_OpenButtonSubmit();
        }
        document.all["txKeyFld"].focus();
    }
    */
    if (argCallerId == "EAT400C1")
    {
        document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
        //1060419	Joe	1050087	二代系統升級，調整focus寫法
        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
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
function ObjOnBlur(argObjName)
{
    switch (argObjName)
    {
        case "txPlanNo": //清理批號檢查Plan_Main有無存在

            if (document.all.txPlanNo.value != "")
            {
                var param = new Array(1);
                param[0] = document.all.txPlanNo.value;
                var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, param);
                var iCallID_txPlanNo = callObj.id;
                if (callObj.value.RtnStr == "nodata")
                {
                    alert("無此計畫編號，請重新輸入");
                }
                else
                    document.all.txDesc.value = callObj.value.RtnStr;
            }
            break;
    }
}

//紀錄Client端所選擇之UserID
function jf_dlUserChange()
{
    //1090226		Kevin_C	1081154			修正連動邏輯
    //var empUserInfo = document.all["dlUser"].options(document.all["dlUser"].selectedIndex).value;
    var empUserInfo = document.all["dlUser"].options[document.all["dlUser"].selectedIndex].value;
    var tempstr = empUserInfo.split(":");
    document.all["empUserId"].value = tempstr[2];
}
//1090601 Cloud [1090316] 交通部新增excel功能
function CtrlExcelWork()
{
    if (document.all["ORGNICKNAME"].value == "MOTC")
    {

        if (document.all["cbFM"].checked)
        {
            document.all["btExcel"].disabled = true;
            ////1140603      Joeko   1140066         修非檔管格式開放ODS
            document.all["btODS"].disabled = true;
        }
        else
        {
            document.all["btExcel"].disabled = false;
            ////1140603      Joeko   1140066         修非檔管格式開放ODS
            document.all["btODS"].disabled = false;
        }
    }
    //1100722 Zen 1100434 (高雄大學)新增匯出Excel功能
    else
    {
        //1140603      Joeko   1140066         修非檔管格式開放Excel
        //if (document.all["cbFM"].checked)
        //    document.all["btExcel"].disabled = false;
        //else
        //    document.all["btExcel"].disabled = true;
        document.all["btExcel"].disabled = false;
        //1140603      Joeko   1140066         修非檔管格式開放Excel
        if (document.all["ORGNICKNAME"].value != "SMEG")
            document.all["btODS"].disabled = false;
    }
}

//1130523      Jason   1130208         排序方式選擇為密件流水號的的時候其他欄位設為唯讀
function SearchType(argType) {
    //JOE1140603      Joeko   1140066 交通部排序選擇密件流水號，保持不可跳頁行為
    /*if (argType == "rbSecSeq")*/
    if (argType == "rbSecSeq" && document.all["ORGNICKNAME"].value == "MOTC"){
        document.all["rbGROUP_FILENO"].disabled = true;
        document.all["rbGROUP_DEPT"].disabled = true;
        document.all["rbGROUP_STOCK"].disabled = true;
        rbNONE.checked = true;
    }
    else
    {
        document.all["rbGROUP_FILENO"].disabled = false;
        document.all["rbGROUP_DEPT"].disabled = false;
        document.all["rbGROUP_STOCK"].disabled = false;
    }
}

//1140603      Joeko   1140066     增加必要欄位檢查
function jf_ConfirmPreview()
{
    var strErrMsg = '';
    var strPlanNo = $('#txPlanNo').val();
    if (document.all['txPlanNo'].value == '')
        strErrMsg += '清理批號不可為空';
    if (strErrMsg != '') {
        alert(strErrMsg);
        return false;
    }
    return true;
}
