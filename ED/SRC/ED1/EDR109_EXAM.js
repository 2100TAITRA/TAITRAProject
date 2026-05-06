/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	   概要
 * -------------------------------------------------------------------------------------------------
 * 1110319      Cloud   1101524     新增
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

function ClientButtonControl(event)
{

    var xObjectName = event.target.id;

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
        /*
		case "":
			break;
		*/
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
            Page_BlockSubmit = true;
            if (jf_Trim(document.all.txDocNo.value) == "")
            {
                alert("原機密案件資料(欲降解密公文))不可為空白");
                $('txDocNo').focus();
                return;
            }
            Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            if (jf_Trim(document.all.txRcvDoc.value) == "") {
                alert("核定機關來文資料公文文號不可為空白");
                Page_BlockSubmit = true;
                $('txRcvDoc').focus();
                return;
            }
            if (jf_Trim(document.all.txOdocFromSubject.value) == "") {
                alert("案由不可為空白");
                Page_BlockSubmit = true;
                $('txOdocFromSubject').focus();
                return;
            }
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
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function txRcvDocOnBlur()
{
    if (jf_Trim(document.all.txRcvDoc.value) == "") {
        document.all["txRcvDocOrg"].value = "";
        document.all["txRcvDocFileNo"].value = "";
        document.all["txRcvDocFromDate"].value = "";
        document.all["txRcvDocFromWord"].value = "";
        document.all["txKeepYear"].value = "";
        document.all["txRcvDate"].value = "";
        document.all["txRcvEmpname"].value = "";
        document.all["txRcvDeptname"].value = "";
        return;
    }
    document.all.txRcvDoc.value = jf_Trim(document.all.txRcvDoc.value);
    var SearchParam = new Array(2);
    SearchParam[0] = document.all["SourceNo"].value;
    SearchParam[1] = document.all["txRcvDoc"].value;
    var EDR109RcvObj = ED1.EDR109_EXAM.SearchRcvProcData(SearchParam).value;
    if (EDR109RcvObj.strErrMsg != "")
    {
        alert(EDR109RcvObj.strErrMsg);
    }
    else
    {
        if (EDR109RcvObj.bHasData) {
            document.all["txRcvDocOrg"].value = EDR109RcvObj.FormOrg;
            document.all["txRcvDocFileNo"].value = EDR109RcvObj.FileNo;
            document.all["txRcvDocFromDate"].value = EDR109RcvObj.FormDate;
            document.all["txRcvDocFromWord"].value = EDR109RcvObj.FormWord;
            document.all["txKeepYear"].value = EDR109RcvObj.KeepYear;
            document.all["txRcvDate"].value = EDR109RcvObj.RcvDate;
            document.all["txRcvEmpname"].value = EDR109RcvObj.RpsEmpName;
            document.all["txRcvDeptname"].value = EDR109RcvObj.RpsDeptName;
        }
        else {
            alert("查無該公文資料。");
        }
           
    }

}


