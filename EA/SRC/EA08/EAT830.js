/*
DATE	SA		PRG		MGR_NO	DESC
1070709 Kevin   Zen     1070678 弱掃XSS修正
1080311	Kevin	Joe		1080098	弱掃修正Client Potential Code Injection
1110103 Kevin   Zen     1101292 修正多次點擊重複PostBack之問題
1110815 Cloud   Cloud   1110405 增加勾選整櫥時檢核
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

//1070116 Zen 1050087 二代升級
//if(document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
//1110815 Cloud      1110405 增加勾選整櫥時檢核
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
function ClientOnLoad()
{
    //1070116 Zen 1050087 二代升級
    //jf_CallWS(ServerHeadPath+"../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS(ServerHeadPath+"../EALIB/EA_LIB.asmx", "GetApplyDocInfo", false, null);
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    if (document.all["hidStockUse"].value == "N")
    {
        //document.all["MainDGTable"].style.width = 724;
        //document.all["pTitle"].style.width = 800;
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1070116 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1070116 Zen 1050087 二代升級
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pBtDelRowNo = xObjectName.substring(8, xObjectName.indexOf("_btDelRow"));
    var btDelRow;

    //取得確實按下的是哪個「刪除」鍵
    if (document.all["dg1__ctl" + pBtDelRowNo + "_btDelRow"] != null)
    {
        btDelRow = document.all["dg1__ctl" + pBtDelRowNo + "_btDelRow"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pBtDelRowNo + "_lbBorNo"];
    }

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        //1070116 Zen 1050087 二代升級
        //case 'btCalendar':
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all["txApplyDate"], event.screenX, event.screenY);
        //    break;
        case btDelRow:
            //document.all["dg1"].deleteRow(pBtDelRowNo-1);
            if (window.confirm("是否確定要刪除此調案單？"))
                DeleteRow(parseInt(pBtDelRowNo));
            Page_BlockSubmit = true;
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1070116 Zen 1050087 二代升級
//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
{
    var xObjectName;
    var evBtn;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1070116 Zen 1050087 二代升級
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1070116 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1070116 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1070116 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            var dept = document.all["txBorDept"].value;
            var user = document.all["txBorUser"].value;
            var applyDate = document.all["txApplyDate"].value;
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            document.all["txBorDept"].value = dept;
            document.all["txBorUser"].value = user;
            document.all["txApplyDate"].value = applyDate;
            //1070116 Zen 1050087 二代升級
            //document.all["txBorNoS"].focus();
            $('#txBorNoS').focus();
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmSave();
            //1070116 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmSave();
            //1070116 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreviewList":
            Page_BlockSubmit = !jf_ConfirmSave();
            //1070116 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

            //以下屬於DataGrid ToolBar

    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
    {
        bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (!jf_CheckBlankAndAlert())
        bRtnbool = false;

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
    bBorrowDetailFalse = false;

    if (document.all["dg1"] == null || document.all["dg1"].rows.length < 2)
    {
        alert("沒有調案資料可供儲存");
        return false;
    }
    if (document.all["txApplyDate"].value == "")
    {
        alert("請輸入申請日期");
        return false;
    }
    var bHasRecord = false;
    //950522 以檔號為檢核條件 by whay
    for (i = 2; i <= document.all["dg1"].rows.length; i++)
    {
        tag = "dg1__ctl" + i + "_txFileNo";

        if (document.all[tag] == null || document.all[tag].value == "")
            continue;
        bHasRecord = true;
    }
    if (bHasRecord == false)
    {
        for (i = 2; i <= document.all["dg1"].rows.length; i++)
        {
            tag = "dg1__ctl" + i + "_txDocNo";

            if (document.all[tag] == null || document.all[tag].value == "")
                continue;
            bHasRecord = true;
        }
    }
    if (bHasRecord == false)
    {
        alert("沒有調案資料可供儲存");
        return false;
    }
    //950522 以檔號為檢核是否範圍重複條件 by whay
    for (i = 2; i <= document.all["dg1"].rows.length; i++)
    {
        tag = "dg1__ctl" + i + "_txFileNo";
        str = document.all[tag].value;
        if (str != "")
        {
            for (j = i; j <= document.all["dg1"].rows.length; j++)
            {
                tag2 = "dg1__ctl" + j + "_txFileNo";
                str2 = document.all[tag2].value;

                if (i == j)
                    continue;
                if (str == str2.substring(0, str.length))
                {
                    //連同文號進行檢核 #2007.03.05 Andy
                    var strDoc1 = jf_Trim(document.all["dg1__ctl" + i + "_txDocNo"].value);
                    var strDoc2 = jf_Trim(document.all["dg1__ctl" + j + "_txDocNo"].value);
                    if (strDoc1 == strDoc2 || strDoc1 == "" || strDoc2 == "")
                    {
                        alert("第" + (i - 1) + "筆和第" + (j - 1) + "筆申請範圍重覆");
                        return false;
                    }
                }
            }
        }
    }
    if (document.all["dlBorType"].value == "2")
    {
        for (i = 2; i <= document.all["dg1"].rows.length; i++)
        {
            tag = "dg1__ctl" + i + "_lbFileExist";

            if (document.all[tag] == null)
                continue;

            str = document.all[tag].value;
            if (str == "0")
            {
                msg = "序號" + (i - 1) + "無數位內容，不允許申請線上調檔";
                alert(msg);
                return false;
            }
        }
    }
    if (!CheckSecDocHasReason())
        return false;

    //儲存前檢核是否檔案已借出 #2007.02.09 Andy
    for (i = 2; i <= document.all["dg1"].rows.length; i++)
    {
        if (bBorrowDetailFalse)
            break;
        //1070709 Zen 1070678 弱掃XSS修正
        //var strNo = jf_Trim(document.all["dg1__ctl" + i + "_txDocNo"].value);
        var strNo = jf_Trim(encodeURI(document.all["dg1__ctl" + i + "_txDocNo"].value));
        if (strNo != "")
        {
            queryBorrowDetail(strNo, "dg1__ctl" + i + "_txDocNo");
        }
        else
        {
            //1070709 Zen 1070678 弱掃XSS修正
            //strNo = jf_Trim(document.all["dg1__ctl" + i + "_txFileNo"].value);
            strNo = jf_Trim(encodeURI(document.all["dg1__ctl" + i + "_txFileNo"].value));
            if (strNo != "")
            {
                queryBorrowDetail(strNo, "dg1__ctl" + i + "_txFileNo");
            }
        }
    }

    //調閱明細中有不可調閱者則不可儲存 #2007.02.09 Andy
    if (bBorrowDetailFalse)
    {
        bBorrowDetailFalse = false;
        return false;
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
    if (argResult.id == iCallID_qBorrowDetail)
    {
        WSResult = argResult.value;

        if (fnIsWebServiceSuccess(argResult))	//改為呼叫自訂的判斷函式
        {
            if (WSResult.IsBor != "0" && !CheckBorNo(WSResult.BorNo))
            {
                var bIsBorrowPartOf = false;
                if (WSResult.IsBor == "2")
                {
                    alert("您輸入的公文已被借出，調案單號為 " + WSResult.BorNo);
                }
                else
                {
                    alert("您輸入的公文已被其他使用者申請，調案單號為 " + WSResult.BorNo);
                }
                var id_secs = new Array(4);
                id_secs = id_nowDataGrid.split("_", 4);
                var idTxDocNo = id_secs[0] + "__" + id_secs[2] + "_txDocNo";
                var idTxFile_no = id_secs[0] + "__" + id_secs[2] + "_txFileNo";
                var idTxDept = id_secs[0] + "__" + id_secs[2] + "_lbDeptName";
                var idTxSubject = id_secs[0] + "__" + id_secs[2] + "_txSubject";
                var idTxFileExist = id_secs[0] + "__" + id_secs[2] + "_lbFileExist";
                var idTxSEC_NO = id_secs[0] + "__" + id_secs[2] + "_txSEC_NO";
                var idTxStock = id_secs[0] + "__" + id_secs[2] + "_txStockNo";
                var idcbAllStock = id_secs[0] + "__" + id_secs[2] + "_cbAllStock";

                document.all[idTxDocNo].value = "";
                document.all[idTxDept].value = "";
                document.all[idTxSubject].value = "";
                document.all[idTxFileExist].value = "";
                document.all[idTxSEC_NO].value = "";
                document.all[idTxStock].value = "";
                document.all[idcbAllStock].disabled = false;
                //1070116 Zen 1050087 二代升級
                //document.all[id_nowDataGrid].focus();
                $('#' + id_nowDataGrid).focus();
                bBorrowDetailFalse = true;
                strBorrowType = "";
                return;
            }
            else
            {
                var id_secs = new Array(4);
                id_secs = id_nowDataGrid.split("_", 4);
                var idTxDocNo = id_secs[0] + "__" + id_secs[2] + "_txDocNo";
                var idTxFile_no = id_secs[0] + "__" + id_secs[2] + "_txFileNo";
                var idTxDept = id_secs[0] + "__" + id_secs[2] + "_lbDeptName";
                var idTxSubject = id_secs[0] + "__" + id_secs[2] + "_txSubject";
                var idTxFileExist = id_secs[0] + "__" + id_secs[2] + "_lbFileExist";
                var idTxSEC_NO = id_secs[0] + "__" + id_secs[2] + "_txSEC_NO";
                var idTxStock = id_secs[0] + "__" + id_secs[2] + "_txStockNo";
                var idcbAllStock = id_secs[0] + "__" + id_secs[2] + "_cbAllStock";

                if (!fnCheckDocState1(WSResult.DocState))
                {
                    document.all[idTxDocNo].value = "";
                    document.all[idTxFile_no].value = "";
                    document.all[idTxDept].value = "";
                    document.all[idTxSubject].value = "";
                    document.all[idTxFileExist].value = "";
                    document.all[idTxSEC_NO].value = "";
                    //1070116 Zen 1050087 二代升級
                    //document.all[id_nowDataGrid].focus();
                    $('#' + id_nowDataGrid).focus();
                    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號：" + WSResult.DocNo + "尚未點收，無法進行調案"])), "");
                    bBorrowDetailFalse = true;

                    strBorrowType = "";
                    return;
                }
                if (!fnCheckDocState2(WSResult.DocState))
                {
                    document.all[idTxDocNo].value = "";
                    document.all[idTxFile_no].value = "";
                    document.all[idTxDept].value = "";
                    document.all[idTxSubject].value = "";
                    document.all[idTxFileExist].value = "";
                    document.all[idTxSEC_NO].value = "";
                    //1070116 Zen 1050087 二代升級
                    //document.all[id_nowDataGrid].focus();
                    $('#' + id_nowDataGrid).focus();
                    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號：" + WSResult.DocNo + fnGetStatusName(WSResult.DocState) + "，無法進行調案"])), "");
                    bBorrowDetailFalse = true;

                    strBorrowType = "";
                    return;
                }

                if (strBorrowType != "2") //檔號調多文時不需要文號
                    document.all[idTxDocNo].value = WSResult.DocNo;

                if (WSResult.Subject == "")
                    document.all[idTxFile_no].value = "";
                else
                    document.all[idTxFile_no].value = WSResult.FileNo;
                if (WSResult.Subject == "")
                    document.all[idTxDept].value = "";
                else
                    document.all[idTxDept].value = WSResult.DeptName;

                document.all[idTxSubject].value = WSResult.Subject;
                if (WSResult.IsSec)
                    document.all[idTxSEC_NO].value = "1";
                else
                    document.all[idTxSEC_NO].value = "0";
                if (WSResult.Volume != "")
                    document.all[idTxFileExist].value = "1";
                else
                    document.all[idTxFileExist].value = "0";

                if (WSResult.StockNo)
                    document.all[idTxStock].value = WSResult.StockNo;
                else
                {
                    if (jf_Trim(WSResult.StockNo) == "")
                        document.all[idcbAllStock].disabled = true;
                    document.all[idTxStock].value = "";
                }

                //1070116 Zen 1050087 二代升級
                //document.all[id_secs[0] + "__" + id_secs[2] + "_txReason"].focus(); //取得調案資料成功後focus到調案原因
                $('#' + id_secs[0] + "__" + id_secs[2] + "_txReason").focus();

                strBorrowType = "";
            }
        }
        else
        {
            var id_secs = new Array(4);
            id_secs = id_nowDataGrid.split("_", 4);
            var idTxDocNo = id_secs[0] + "__" + id_secs[2] + "_txDocNo";
            var idTxFile_no = id_secs[0] + "__" + id_secs[2] + "_txFileNo";
            var idTxDept = id_secs[0] + "__" + id_secs[2] + "_lbDeptName";
            var idTxSubject = id_secs[0] + "__" + id_secs[2] + "_txSubject";
            var idTxFileExist = id_secs[0] + "__" + id_secs[2] + "_lbFileExist";
            var idTxSEC_NO = id_secs[0] + "__" + id_secs[2] + "_txSEC_NO";
            var idTxStock = id_secs[0] + "__" + id_secs[2] + "_txStockNo";
            var idcbAllStock = id_secs[0] + "__" + id_secs[2] + "_cbAllStock";

            document.all[id_nowDataGrid].value = "";
            document.all[idTxDocNo].value = "";
            document.all[idTxFile_no].value = "";
            document.all[idTxDept].value = document.all[idTxSubject].value = "";
            document.all[idTxFileExist].value = "";
            document.all[idTxSEC_NO].value = "";
            document.all[idTxStock].value = "";
            document.all[idcbAllStock].disabled = false;

            strBorrowType = "";
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

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var bHasCheck = false;
//檢查日期格式
function CheckCDATE(argObj, strMsg)
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
            //1070116 Zen 1050087 二代升級
            //document.all[argObj].focus();
            $('#' + argObj).focus();
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bHasCheck = false;
            return false;
        }
    }
    bHasCheck = false;
    return true;
}

//Leslie	常用申請理由下拉式選單的動作
function DLLPhraseNoChanged()
{
    id_nowDataGrid = event.srcElement.id;
    var index = document.all[id_nowDataGrid].selectedIndex;
    //1070116 Zen 1050087 二代升級
    //var val = document.all[id_nowDataGrid].options[index].innerText;
    var val = document.all[id_nowDataGrid].options[index].textContent;
    id_secs = id_nowDataGrid.split("_", 4);
    var idTxReason = id_secs[0] + "__" + id_secs[2] + "_txReason";
    document.all[idTxReason].value += val;
    document.all[id_nowDataGrid].options[0].selected = true;
    //1070116 Zen 1050087 二代升級
    //document.all[idTxReason].focus();
    $('#' + idTxReason).focus();
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1070116 Zen 1050087 二代升級
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

/**********************************************
處理公文資訊的段落
**********************************************/

function fnCheckDocState1(argDocState)
{
    if (argDocState == "")//空白代表並非調閱單文
        return true;
    if (Number(argDocState) < 20)//20:點收
        return false;
    return true;
}

function fnCheckDocState2(argDocState)
{
    if (argDocState == "")//空白代表並非調閱單文
        return true;
    if (Number(argDocState) > 27)//30:已銷毀
        return false;
    return true;
}


function fnGetStatusName(argDocState)
{
    switch (argDocState)
    {
        case "30":
        default:
            return "已銷毀";
        case "35":
            return "提供文史機關使用";
        case "40":
            return "已移轉";
        case "50":
            return "已移交";
        case "90":
            return "待刪除";
    }
}

function CheckSecDocHasReason()
{
    var ErrId = "";
    for (i = 2; i < (document.all["dg1"].rows.length + 2) ; i++)
    {
        var IdtxSEC_NO = "dg1__ctl" + i + "_txSEC_NO";
        var IdtxReason = "dg1__ctl" + i + "_txReason";

        if (document.all[IdtxSEC_NO] == null)
            continue;

        if (document.all[IdtxSEC_NO].value == "1" && document.all[IdtxReason].value == "")
        {
            if (ErrId == "")
                ErrId = (i - 1);
            else
                ErrId += "," + (i - 1);
        }
    }
    if (ErrId != "")
    {
        var msg = "序號" + ErrId + "屬於密件，必須輸入調案原因";
        alert(msg);
        return false;
    }
    else
        return true;
}

function queryBorrowDetail(file_no)
{
    queryBorrowDetail(file_no, "");
}

var strBorrowType = ""; //1：文號調單文；2：檔號調多文 #2007.03.01 Andy

//修改為可傳入指定控制項id #2007.02.09 Andy
function queryBorrowDetail(file_no, id)
{
    var gotoCASE_MAIN = false;
    var param = new Array(6);

    var NoSecs = new Array(5);

    if (id)
        id_nowDataGrid = id;
    else
        id_nowDataGrid = event.srcElement.id;

    if (file_no == "")
    {
        var id_secs = new Array(4);

        id_secs = id_nowDataGrid.split("_", 4);
        var idTxDept = id_secs[0] + "__" + id_secs[2] + "_lbDeptName";
        var idTxSubject = id_secs[0] + "__" + id_secs[2] + "_txSubject";

        //95.12.07 955218 David
        var idTxStock = id_secs[0] + "__" + id_secs[2] + "_txStockNo";
        var idTxDocNo = id_secs[0] + "__" + id_secs[2] + "_txDocNo";
        var idTxFileNo = id_secs[0] + "__" + id_secs[2] + "_txFileNo";
        var idcbAllStock = id_secs[0] + "__" + id_secs[2] + "_cbAllStock";

        //觸發onblur的文號無值但檔號有值時以檔號取得公文資訊 #2007.03.01 Andy
        if (id_nowDataGrid.indexOf("txDocNo") != -1 && jf_Trim(document.all[idTxFileNo].value) != "")
            //1070709 Zen 1070678 弱掃XSS修正
            //file_no = jf_Trim(document.all[idTxFileNo].value);
            file_no = jf_Trim(encodeURI(document.all[idTxFileNo].value));
        //觸發onblur的檔號無值但文號有值時以文號取得公文資訊 #2007.03.01 Andy
        if (id_nowDataGrid.indexOf("txFileNo") != -1 && jf_Trim(document.all[idTxDocNo].value) != "")
            //1070709 Zen 1070678 弱掃XSS修正
            //file_no = jf_Trim(document.all[idTxDocNo].value);
            file_no = jf_Trim(encodeURI(document.all[idTxDocNo].value));
        //文號及檔號均無值則清空該列 #2007.03.01 Andy
        if (file_no == "")
        {
            document.all[id_nowDataGrid].value = "";
            document.all[idTxDept].value = document.all[idTxSubject].value = "";

            //95.12.07 955218 David
            document.all[idTxStock].value = "";
            document.all[idTxDocNo].value = "";
            document.all[idTxFileNo].value = "";
            document.all[idcbAllStock].disabled = false;
            return;
        }
    }

    NoSecs = file_no.split(document.all["fileno_sep"].value, 5);

    var KeyName;
    var KeyValue

    if (NoSecs.length == 1)//			<!-- 單純文號 -->
    {
        strBorrowType = "1";

        param[0] = file_no;
        param[1] = "";
        param[2] = "";
        param[3] = "";
        param[4] = "";
        param[5] = "";
    }
        //檔號各部份要有值才算完整檔號 #2007.03.01 Andy
    else if (NoSecs.length == 5 && NoSecs[0] != "" && NoSecs[1] != "" && NoSecs[2] != "" && NoSecs[3] != "" && NoSecs[4] != "")//	<!-- 完整檔號 -->
    {
        strBorrowType = "2";

        id_secs = id_nowDataGrid.split("_", 4);
        //1070709 Zen 1070678 弱掃XSS修正
        //param[0] = jf_Trim(document.all[id_secs[0] + "__" + id_secs[2] + "_txDocNo"].value); //有文號時仍傳入 #2007.03.05 Andy
        param[0] = jf_Trim(encodeURI(document.all[id_secs[0] + "__" + id_secs[2] + "_txDocNo"].value));
        //param[0] = "";
        param[1] = NoSecs[0];
        param[2] = NoSecs[1];
        param[3] = NoSecs[2];
        param[4] = NoSecs[3];
        param[5] = NoSecs[4];
    }
        //檔號各部份要有值才算完整卷號 #2007.03.01 Andy
    else if (NoSecs.length == 4 && NoSecs[0] != "" && NoSecs[1] != "" && NoSecs[2] != "" && NoSecs[3] != "")//	<!-- 檔號只輸到卷號 -->
    {
        strBorrowType = "2";

        id_secs = id_nowDataGrid.split("_", 4);
        //1070709 Zen 1070678 弱掃XSS修正
        //param[0] = jf_Trim(document.all[id_secs[0] + "__" + id_secs[2] + "_txDocNo"].value); //有文號時仍傳入 #2007.03.05 Andy
        param[0] = jf_Trim(encodeURI(document.all[id_secs[0] + "__" + id_secs[2] + "_txDocNo"].value)); 
        //param[0] = "";
        param[1] = NoSecs[0];
        param[2] = NoSecs[1];
        param[3] = NoSecs[2];
        param[4] = NoSecs[3];
        param[5] = "";
    }
        //檔號各部份要有值才算完整案號 #2007.03.01 Andy
    else if (NoSecs.length == 3 && NoSecs[0] != "" && NoSecs[1] != "" && NoSecs[2] != "")//	<!-- 檔號只輸到案號 -->
    {
        alert("檔號不完整,不可以整案調出!");
        //1070116 Zen 1050087 二代升級
        //document.all[id_nowDataGrid].focus();
        $('#' + id_nowDataGrid).focus();
        bBorrowDetailFalse = true;
        return;
    }
    else
    {
        var id_secs = new Array(4);
        id_secs = id_nowDataGrid.split("_", 4);
        var idTxDept = id_secs[0] + "__" + id_secs[2] + "_lbDeptName";
        var idTxSubject = id_secs[0] + "__" + id_secs[2] + "_txSubject";
        var idTxStock = id_secs[0] + "__" + id_secs[2] + "_txStockNo";
        var idTxDocNo = id_secs[0] + "__" + id_secs[2] + "_txDocNo";
        var idTxFileNo = id_secs[0] + "__" + id_secs[2] + "_txFileNo";
        var idcbAllStock = id_secs[0] + "__" + id_secs[2] + "_cbAllStock";

        //觸發onblur的檔號不完整但文號有值時以文號取得公文資訊 #2007.03.01 Andy
        if (id_nowDataGrid.indexOf("txFileNo") != -1 && jf_Trim(document.all[idTxDocNo].value) != "")
        {
            strBorrowType = "1";

            //1070709 Zen 1070678 弱掃XSS修正
            //param[0] = jf_Trim(document.all[idTxDocNo].value);
            param[0] = jf_Trim(encodeURI(document.all[idTxDocNo].value));
            param[1] = "";
            param[2] = "";
            param[3] = "";
            param[4] = "";
            param[5] = "";
        }
        else //檔號不完整則清空該列 #2007.03.01 Andy
        {
            strBorrowType = "";

            document.all[idTxDept].value = "";
            document.all[idTxSubject].value = "";
            document.all[idTxStock].value = "";
            document.all[idTxDocNo].value = "";
            document.all[idTxFileNo].value = "";
            document.all[idcbAllStock].disabled = false;

            alert("檔號不完整");
            return;
        }
    }
	//1080311	Joe		1080098	弱掃修正Client Potential Code Injection--S
	param[0] = encodeURI(param[0]);
	param[1] = encodeURI(param[1]);
	param[2] = encodeURI(param[2]);
	param[3] = encodeURI(param[3]);
	param[4] = encodeURI(param[4]);
	param[5] = encodeURI(param[5]);
	ServerHeadPath = encodeURI(ServerHeadPath);
	//1080311	Joe		1080098	弱掃修正Client Potential Code Injection--E
    RtnObj = jf_CallWS(ServerHeadPath + "../EALIB/EA_LIB.asmx", "GetApplyDocInfo", false, param);

    iCallID_qBorrowDetail = RtnObj.id;
    OnWSResult(RtnObj);
}
//95.11.06 951086 David 避免因單位採用不同的FILENO_SEP而導致網頁導向參考錯誤，所以重新組出網頁路徑
var ServerHeadPath = "";
AccessServerPath();

function AccessServerPath()
{
    ServerHeadPath = document.URL;
    var arr1 = ServerHeadPath.split('?');
    var arr2 = arr1[0].split('/');
    var temp = "";
    for (i = 0; i < arr2.length - 1; i++)
    {
        if (temp != "")
            temp += "/";
        temp += arr2[i];
    }
    ServerHeadPath = temp + "/";
}

function fnIsWebServiceSuccess(argResult)
{
    if (argResult.error)
    {
        alert(argResult.errorDetail.string);
        return false;
    }
    else
    {
        var strAttach = "";

        obj = argResult.value.RtnMsg;
        if (obj.m_bSuccess == null || obj.m_bSuccess == "undefined")
            return true;

        if (!obj.m_bSuccess)
        {
            if (obj.m_strMsg == "")
            {
                if (obj.m_bRedirect)
                {
                    if (window.document.all["txLogFileName"] != null)
                        strAttach = window.document.all["txLogFileName"].value;

                    var strLogFilePath = obj.m_strErrPageQueryStr + "&argAttach=New_" + strAttach;
                    jf_OpenMsgWin(strLogFilePath, "CustomErrPage");
                }
                else
                {
                    if (obj.m_strErrMsg != "")
                        alert("錯誤來源：" + obj.m_strErrSource + "\n" + "錯誤訊息：" + obj.m_strErrMsg + "\n" + "堆疊追蹤：\n" + obj.m_strErrStack);
                }
            }
            else
            {
                alert(obj.m_strMsg);
            }
            return false;
        }
    }
    return true;
}

function CheckBorNo(argBorNo)
{
    var Start = document.all.txBorNoS.value;
    var End = document.all.txBorNoE.value;
    if (jf_Trim(Start) != "" && jf_Trim(End) != "")
    {
        if (parseInt(argBorNo) >= parseInt(Start) && parseInt(argBorNo) <= parseInt(End))
            return true;
    }
    return false
}

function DeleteRow(argRowIdx)
{
    if (document.all["dg1"].rows.length == 2)
    {
        if (confirm("是否確認刪除所有調案單？"))
        {
            document.all.ToolBarSenderID.value = "btSave";
            document.all["dg1"].deleteRow(1);	//把最後一列刪除

            if (Page_BlockSubmit == false)
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                __doPostBack("tbTool", 0);
            }
        }
        else
            return;
    }
    for (var i = argRowIdx; i <= document.all["dg1"].rows.length; i++)
    {
        var j = i + 1;
        if (i < document.all["dg1"].rows.length)
        {
            var Arr = new Array(9);//"dg1__ctl" + i + 
            Arr[0] = "_lbBorNo";
            Arr[1] = "_txBorNo";
            Arr[2] = "_txDocNo";
            Arr[3] = "_txFileNo";
            Arr[4] = "_txStockNo";
            Arr[5] = "_lbDeptName";
            Arr[6] = "_txSubject";
            Arr[7] = "_lbFileExist";
            Arr[8] = "_txReason";
            Arr[9] = "_txSEC_NO";
            for (var k = 0; k < Arr.length; k++)
            {
                if (document.all["dg1__ctl" + i + Arr[k]].tagName == "INPUT")
                    document.all["dg1__ctl" + i + Arr[k]].value = document.all["dg1__ctl" + j + Arr[k]].value;//document.all["dg1"].rows[i+1].cells[k].innerHTML;
                else
                    //1070116 Zen 1050087 二代升級
                    //document.all["dg1__ctl" + i + Arr[k]].innerText = document.all["dg1__ctl" + j + Arr[k]].innerText;
                    document.all["dg1__ctl" + i + Arr[k]].textContent = document.all["dg1__ctl" + j + Arr[k]].textContent;
            }
            //alert(rowObj.innerText);
        }
        else
            document.all["dg1"].deleteRow(i - 1);
    }
}
//1110815 Cloud   Cloud   1110405 增加勾選整櫥時檢核
function CheckAllStock(argObjID,argStockNo,argBorNo)
{
    if (document.all[argObjID].checked)
    {
        var rtn = EA08.EAT830.CheckBtStock(argStockNo, document.all["h_SourceNo"].value, argBorNo).value;
        if (rtn != "")
        {
            alert(rtn);
            document.all[argObjID].checked = false;
        }
    }
}