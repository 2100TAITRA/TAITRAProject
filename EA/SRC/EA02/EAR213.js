/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* 程式修改歷程 
* -------------------------------------------------------------------------------------------------
* 日期			系統分析師	修改人	單號			概要
* -------------------------------------------------------------------------------------------------
* 1070124       Kevin_C     Zen     1050087         二代升級
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
    //1070123 Zen 1050087 二代升級
    //var xObjectName = document.activeElement.id;
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
//1070123 Zen 1050087 二代升級
//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
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

    //1070123 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !CheckBeforePrint();
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


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforePrint()
{
    var strDateS = jf_Trim(document.all.txFileDateS.value);//上傳日期起
    var strDateE = jf_Trim(document.all.txFileDateE.value);//上傳日期迄
    var bRtn = true;

    if (!CheckDATE("txFileDateS", "上傳日期(起)"))
    {
        bRtn = false;
        $('#txFileDateS').focus();
        return;
    }
    if (!CheckDATE("txFileDateE", "上傳日期(迄)"))
    {
        bRtn = false;
        $('#txFileDateE').focus();
        return;
    }
    if (strDateS != "" && strDateE != "" && strDateS > strDateE)
    {
        document.all.txFileDateE.value = strDateS;
        document.all.txFileDateS.value = strDateE;
    }
    if (strDateS == "" && strDateE != "")
    {
        document.all.txFileDateS.value = strDateE;

    }
    if (strDateS != "" && strDateE == "")
    {
        document.all.txFileDateE.value = strDateS;
    }
    
    var strDocS = jf_Trim(document.all.txDocnoS.value);//
    var strDocE = jf_Trim(document.all.txDocnoE.value);//
    if (strDocS != "" && strDocE != "" && strDocS > strDocE) {
        document.all.txDocnoE.value = strDocS;
        document.all.txDocnoS.value = strDocE;
    }

    if (strDocS == "" && strDocE != "") {
        document.all.txDocnoS.value = strDocE;
    }

    if (strDocS != "" && strDocE == "") {
        document.all.txDocnoE.value = strDocS;
    }

    if (strDateS == "" && strDateE == "" && strDocS == "" && strDocE=="") {
        alert("上傳日期或是文號至少需輸入一項。");
        $('#txFileDateS').focus();
        bRtn = false;
        return;
    }


    return bRtn;
}
var bHasCheck = false;
function CheckDATE(argObj, strMsg)
{
    if (bHasCheck)
    {
        bHasCheck = false;
        return;
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
