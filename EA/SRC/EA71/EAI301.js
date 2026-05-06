/*
日期	SA		PG		單號		DESC
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1060626 Cloud   Zen     1050087     二代升級
1060808 Cloud   Zen     1050087     二代升級，改用location指定url避免視窗的opener錯亂
1100204 Leslie  Zen     1090927     取消使用document.activeElement
1100504 Kevin   Zen     1100473     弱掃Client DOM XSS修正
1110630 Leslie  Zen     1110371     純檔管線上瀏覽功能補修改至EAI300系列程式
1140724 Kevin   Zen     1141011     弱掃Client Dynamic File Inclusion修正
1140815 Kevin   Zen     1141011     弱掃Client Dynamic File Inclusion修正
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

//1060626 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

var iCallID = 0;
var SumDocWin, SumComWin;
var DetDocWin, DetComWin;
var PDFWin;
var IsInit = true;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060626 Zen 1050087 二代升級
    ////解決StartupScript問題 #2007.07.19 Andy
    //if (document.all["CALL_DOC_CHECK"])
    //{
    //    var s = document.all["CALL_DOC_CHECK"].value;
    //    if (s == "1")
    //    {
    //        getOpenerValue('DOC_CHECK');
    //        document.all["CALL_DOC_CHECK"].value = "";
    //    }
    //}

    //1060626 Zen 1050087 二代升級
    //jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, null); //使用WebService前必須先呼叫一次

    //1060626 Zen 1050087 二代升級，註解無用程式碼
    //OpenUnv();

    //解決StartupScript問題 #2007.07.19 Andy
    if (document.all["CALLAKI811"])
    {
        var s = document.all["CALLAKI811"].value;
        if (s != "")
        {
            jf_OpenSumDocWin(s);
            document.all["CALLAKI811"].value = "";
        }
    }
    if (document.all["CALLEAI302"])
    {
        var s = document.all["CALLEAI302"].value;
        if (s != "")
        {
            //1060808 Zen 1050087 二代升級，改用location指定url避免視窗的opener錯亂
            //jf_OpenDetDocWin(s);
            EAI301fn.jf_OpenDetDocWin(s);
            document.all["CALLEAI302"].value = "";
        }
    }
    if (document.all["CALLEAI304"])
    {
        var s = document.all["CALLEAI304"].value;
        if (s != "")
        {
            jf_OpenTreeWin(s);
            document.all["CALLEAI304"].value = "";
        }
    }
    if (document.all["APPLY1"])
    {
        var s = document.all["APPLY1"].value;
        if (s != "")
        {
            jf_OpenChildWin(s, 'AKT850', 800, 530);
            document.all["APPLY1"].value = "";
        }
    }
    if (document.all["APPLY2"])
    {
        var s = document.all["APPLY2"].value;
        if (s != "")
        {
            jf_OpenChildWin(s, 'AKT800', 800, 530);
            document.all["APPLY2"].value = "";
        }
    }

    //1050712	Leslie	升級二代，呼叫公文清單已準備完成，呼叫母視窗函式
    var DocList = $('#DocListPrepared');
    if (DocList && DocList.val() == '1')
    {
        //1110630 Zen 1110371 純檔管線上瀏覽功能補修改至EAI300系列程式
        var useT2100OD = $('#h_UseT2100OD').val();
        if (useT2100OD != '1')
            jf_ShowModal('EAI300View.ashx');
        else
            if (opener.CallBackByImgView())
                alert("檢索清單已準備完成，請由檢索側屜調閱公文影像。");
    }

    //1060808 Zen 1050087 二代升級，避免子視窗錯誤
    opener.document.all["DOC_CHECK"].value = document.all["DOC_CHECK"].value;
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060626 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060626 Zen 1050087 二代升級
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
//1060626 Zen 1050087 二代升級
//function jf_ToolBarHandle()
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

    //1060626 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id

    switch (xObjectName)
    {
        case "btDETAIL1":		// 顯示明細
            //1060626 Zen 1050087 二代升級
            //document.all["DETAIL_DATA_TYPE"].value = document.all["dgDETAIL__ctl2_lbDATA_TYPE"].innerText;
            document.all["DETAIL_DATA_TYPE"].value = document.all["dgDETAIL__ctl2_lbDATA_TYPE"].textContent;
            Page_BlockSubmit = false;
            //1060626 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSELECTALL1":	// 全部勾選
            SelectAllItem('DOC_CHECK', 2);
            Page_BlockSubmit = true;
            break;
        case "btUNSELECT1":		// 取消勾選
            UnSelectAllItem('DOC_CHECK', 2);
            Page_BlockSubmit = true;
            break;
        case "btFIRSTPAGE1":	// 畫面切換到第一頁
        case "btPRIORPAGE1":	// 畫面切換到上一頁
        case "btNEXTPAGE1":		// 畫面切換到下一頁
        case "btLASTPAGE1":		// 畫面切換到最末頁
            Page_BlockSubmit = false;
            //1060626 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btIMAGE1":		// 線上瀏覽
        ////1060626 Zen 1050087 二代升級，使用二代模組進行線上瀏覽--begin
        //Page_BlockSubmit = true;
        //var Artifact = jf_GetArtifact();
        //var OrgNo = jf_Trim(document.all.H_txOrgNo.value);
        //var strDocNoList = GetCheckedData();

        //if(strDocNoList == '')
        //    alert("檢視欄位至少需勾選一筆明細資料");
        //else if (strDocNoList.split(",").length > 1)
        //    alert("線上瀏覽不支援多筆公文");
        //else
        //    DownloadDocument(Artifact, strDocNoList, OrgNo);
        //break;
        ////1060626 Zen 1050087 二代升級，使用二代模組進行線上瀏覽--end
        case "btIMAGE1":		// 線上調檔

            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                alert('請至少勾選一筆資料!!');
                return;
            }
            else
            {
                Page_BlockSubmit = false;
                //105.04.14    Cloud   1050087         升級二代
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btAPPLY1":		// 申請調檔
            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                alert('請至少勾選一筆資料!!');
                return;
            }
            else
            {
                if (xObjectName == "btAPPLY1")
                    alert('僅提供案件之申請調檔，若勾選案卷項目將忽略不計。');
                Page_BlockSubmit = false;
                //1060626 Zen 1050087 二代升級
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btPRINTDETAIL":	// 明細列印
            //1060626 Zen 1050087 二代升級
            Page_BlockSubmit = false;
            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                alert('請至少勾選一筆資料!!');
                return;
            }
            else
            {
                Page_BlockSubmit = false;
                //1060626 Zen 1050087 二代升級
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btPRINTLIST":		// 清單列印
            //1060626 Zen 1050087 二代升級
            Page_BlockSubmit = false;
            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                alert('請至少勾選一筆資料!!');
                return;
            }
            else
            {
                Page_BlockSubmit = false;
                //1060626 Zen 1050087 二代升級
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btEXIT1":			// 離開
            ret = window.confirm("確定要離開本程式嗎？");
            Page_BlockSubmit = true;
            if (ret)
            {
                if (opener && !opener.closed)
                    if (opener.name == "AKI801")
                        opener.close();
                //1060626 Zen 1050087 二代升級
                //window.close();
                jf_CloseSelf();
            }
            //1060626 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
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
            var result = argResult.value;
            if (result.substring(0, 1) == "0")
                jf_OpenPDFWin(result.substring(1, result.length), null, "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
            else
            {
                if (result.substring(0, 1) == "1" || result.substring(0, 1) == "2")
                    alert(result.substring(1, result.length));
                else
                    alert(result);
            }
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

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
    /*
    try
    {
        opener.document.all.lbReturnValue.length = 3;
        opener.document.all.lbReturnValue.options[0].value = argLink;
        opener.document.all.lbReturnValue.options[1].value = argRead1;
        opener.document.all.lbReturnValue.options[2].value = argRead2;
        opener.window.CallBack("SII020");
        close();
    }
    catch (e) {}
    */
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1060626 Zen 1050087 二代升級
//function getOpenerValue(key)
//{
//    if (IsInit)
//    {
//        document.all[key].value = opener.document.all[key].value;
//        setSelect(key);
//        IsInit = false;
//    }
//}

//1060626 Zen 1050087 二代升級
//function setSelect(key)
//{
//    var Info = document.all[key].value;
//    var flag;
//    var ClientID;
//    var RowNo = 2;
//    var start = parseInt(document.all["dgDETAIL__ctl" + RowNo + "_hlSEQ_NO"].innerHTML) - 1;
//    var end = start + 10;
//    if (end > Info.length)
//        end = Info.length;
//    for (i = start; i < end; i++)
//    {
//        ClientID = "dgDETAIL__ctl" + RowNo + "_cbSELECT";
//        flag = Info.substr(i, 1);
//        if (flag == "1")
//            document.all[ClientID].checked = true;
//        else
//            document.all[ClientID].checked = false;

//        RowNo++;
//    }
//}

/*****************************************************
 name: SelectItem
 desc: 處理選取checkbox
*****************************************************/
function SelectItem(argCookie_nm)
{
    //1100204 Zen 1090927 取消使用document.activeElement
    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;
    var xobjname = xObjectName.substring(xObjectName.indexOf("cbSELECT"), xObjectName.length);
    var pNo = xObjectName.substring(13, xObjectName.indexOf("_cbSELECT"));

    pStr = document.all[argCookie_nm].value;
    pStr1 = '';
    pStr2 = '';
    pType = 0;

    //1060626 Zen 1050087 二代升級
    //var pi_index = Number(document.all["dgDETAIL__ctl" + pNo + "_hlSEQ_NO"].innerText);
    var pi_index = Number(document.all["dgDETAIL__ctl" + pNo + "_hlSEQ_NO"].textContent);

    //1100204 Zen 1090927 取消使用document.activeElement
    //if (document.activeElement.checked) { pType = '1' }
    if (event.target.checked) { pType = '1' }
    else { pType = '0' }

    if (pi_index == 1) { pStr1 = '' }
    else { pStr1 = pStr.substring(0, pi_index - 1) }
    pStr2 = pStr.substring(pi_index, pStr.length)

    pStr = pStr1 + pType + pStr2
    document.all[argCookie_nm].value = pStr;
    opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
}

/*********************************************
 name: SelectAllItem
 desc: 選取全部的checkbox，並回存cookie
*********************************************/
function SelectAllItem(argCookie_nm, argIndex)
{
    pIdx = 0
    pStr = document.all[argCookie_nm].value;

    if (pStr != null)
    {
        document.all[argCookie_nm].value = jf_PADR('', pStr.length, '1');
        opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
    }

    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {
        while (pIdx < pi_PageSize)
        {
            //1060626 Zen 1050087 二代升級
            //pi_SEQ = Number(document.all["dgDETAIL__ctl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].innerText);
            pi_SEQ = Number(document.all["dgDETAIL__ctl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].textContent);
            document.all["dgDETAIL__ctl" + (argIndex + pIdx) + "_cbSELECT"].checked = true;
            if (pi_SEQ >= pi_RecCnt)
            {
                pIdx = pi_PageSize + 1;
            } else
            {
                pIdx++;
            }
        }
    }
    else
    {
        document.all["dgDETAIL__ctl" + argIndex + "_cbSELECT"].checked = true;
    }
}

/*********************************************
 name: UnSelectAllItem
 desc: 取消選取全部的checkbox
*********************************************/
function UnSelectAllItem(argCookie_nm, argIndex)
{
    pIdx = 0
    pStr = document.all[argCookie_nm].value;

    if (pStr != null)
    {
        document.all[argCookie_nm].value = jf_PADR('', pStr.length, '0');
        opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
    }

    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {
        while (pIdx < pi_PageSize)
        {
            //1060626 Zen 1050087 二代升級
            //pi_SEQ = Number(document.all["dgDETAIL__ctl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].innerText);
            pi_SEQ = Number(document.all["dgDETAIL__ctl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].textContent);
            document.all["dgDETAIL__ctl" + (argIndex + pIdx) + "_cbSELECT"].checked = false;
            if (pi_SEQ >= pi_RecCnt)
            {
                pIdx = pi_PageSize + 1;
            } else
            {
                pIdx++;
            }
        }
    }
    else
    {
        document.all["dgDETAIL__ctl" + argIndex + "_cbSELECT"].checked = false;
    }
}

/**************************************************
  以下處理顯示明細
 **************************************************/
function jf_DETAIL(argDataType, argSEQ_NO)
{
    var strUrl = "";
    if (argDataType == "1") //案件
        strUrl = "EAI302.aspx";
    else if (argDataType == "2") //案卷
        strUrl = "EAI303.aspx";

    //1060808 Zen 1050087 二代升級，改用location指定url避免視窗的opener錯亂
    //jf_OpenDetDocWin(strUrl + "?nTotCnt=" + document.all["_RecCtn"].value
    EAI301fn.jf_OpenDetDocWin(strUrl + "?nTotCnt=" + document.all["_RecCtn"].value
        + "&nRecNo=" + String(argSEQ_NO) + "&gChkP=" + document.all["_ChkP"].value
        + "&nTotPage=" + document.all["_TotPage"].value
        + "&nPageSize=" + document.all["_PageSize"].value
        + "&DOC_CHECK=" + document.all["DOC_CHECK"].value.length
        + "&COM_CHECK=" + document.all["COM_CHECK"].value);
}

/**************************************************
  以下處理線上瀏覽
 **************************************************/
//1060626 Zen 1050087 二代升級，改用二代線上瀏覽模組
//function OpenUnv()
//{
//    if (document.all.txUnvFile.value == "") return;

//    DownLoadByHttpTrans();

//    var oShell = new ActiveXObject("Shell.Application");
//    var param = "";
//    //var param = " /filename="+strPath + " /userid=frank /stampPath="+pPath+"\\StampBox.xml" ;
//    var commandtoRun = document.all.txUnvFileLocal.value;
//    oShell.ShellExecute(commandtoRun, param, "", "", "0");

//    document.all.txUnvFile.value = ""; //reset
//}

//function DownLoadByHttpTrans()
//{
//    //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//    //document.all.dnFile.Servername = document.all["txServerName"].value; 
//    var serviceURL = document.all["txServerName"].value;
//    if (document.all.II_USE_SSL != null)
//    {
//        if (document.all.II_USE_SSL.value == "Y")
//            serviceURL = serviceURL.replace("http://", "https://");
//    }
//    document.all.dnFile.Servername = serviceURL;

//    document.all.dnFile.Port = document.all["txServerPort"].value;
//    document.all.dnFile.displayProgress = true;

//    var strFile = document.all.txUnvFile.value;
//    document.all.dnFile.addItem(strFile);

//    if (document.all.dnFile.download() == 0)
//    {
//        document.all.dnFile.resetItem();
//        window.status = "下載完畢!";
//    }
//    else
//    {
//        document.all.dnFile.resetItem();
//        alert("下載失敗!\n" + document.all.dnFile.ErrorString);
//        window.status = "下載失敗!";
//    }
//}

/**************************************************
  以下處理流程查詢
 **************************************************/
function CheckBeforeQueryProcess(argOrgNo, argDocNo)
{
    var KeyName = new Array(2);
    KeyName[0] = "SOURCE_ORGNO";
    KeyName[1] = "DOC_NO";
    var KeyValue = new Array(2);
    KeyValue[0] = argOrgNo;
    KeyValue[1] = argDocNo;
    var RtnFldName = new Array(1);
    RtnFldName[0] = "MSG_ID";
    var OrdFldName = new Array(1);
    OrdFldName[0] = "MSG_ID";

    var param = new Array(5);
    param[0] = "TODO_LIST";
    param[1] = KeyName;
    param[2] = KeyValue;
    param[3] = RtnFldName;
    param[4] = OrdFldName;

    RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, param);

    if (jf_IsWebServiceSuccess(RtnObj))
        return true;
    else
        return false;
}

function QueryProcess(argOrgNo, argODWebPath, argDocNo, Artifact)
{
    if (CheckBeforeQueryProcess(argOrgNo, argDocNo))
    {
        var xUrl = argODWebPath + "ODI260.aspx?pDocNo=" + argDocNo + "&SAMLart=" + Artifact + "&SOURCE_ORGNO=" + argOrgNo;
        jf_OpenChildWin(xUrl, "ODI260", 750, 450);
    }
    else
    {
        alert("歷史檔案未提供公文辦理流程紀錄");
    }
}

//1060626 Zen 1050087 二代升級，取得被勾選之公文
function GetCheckedData()
{
    var dgRows = document.all.dgDETAIL.rows.length + 1;
    var nCheckedCount = 0;
    var strDocNoList = '';
    for (i = 2; i < dgRows; i++)
        if (document.all["dgDETAIL__ctl" + i + "_cbSELECT"].checked)
            strDocNoList += document.all["dgDETAIL__ctl" + i + "_lkDOC_NO"].textContent + ',';

    return strDocNoList.slice(0, -1);
}

//1060626 Zen 1050087 二代升級，二代線上瀏覽
function DownloadDocument(argArt, argDocNo, argOrgNo)
{
    var artifact = argArt;
    var strDocNo = argDocNo;
    var strOrgNo = argOrgNo;
    var ret;

    try
    {
        var wsUrl = "";
        if (opener.theWebServices)
            wsUrl = opener.theWebServices.url('fileiows');
        else
            wsUrl = opener.opener.theWebServices.url('fileiows');
        var param = [];
        param[0] = artifact;
        param[1] = strDocNo;
        param[2] = strOrgNo;

        var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
        if (!rtnObj.error)
        {
            if (rtnObj.value.m_bSuccess)
            {
                var sUnvObj = rtnObj.value.RtnStr;
                if (sUnvObj !== "")
                {
                    var UnvObj = JSON.parse(sUnvObj);
                    var objViewDoc = {
                        UNVObj: UnvObj,
                        docInfoPage: "AKI802",
                        openDocModule: 'AOL',
                        signType: 'E',
                        readOnlyMode: true
                    };
                    var $docId = jf_GetSessionID() + "_" + (+new Date());
                    localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                    var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
                    jf_OpenChildWin(unvUrl, "ODT251ViewDoc");
                }
            }
            else
            {
                alert(rtnObj.value.m_strErrMsg);
            }
        }
        else
        {
            alert(rtnObj.error.errorDetail.string)
        }
    } catch (e)
    {
        alert('開啟失敗');
    }
}


//1060808 Zen 1050087 二代升級，改用location指定url避免視窗的opener錯亂
var EAI301fn = {
    jf_OpenDetDocWin: function jf_OpenDetDocWin(sUrl)
    {
        //1140723 Zen 1141011 弱掃Client Dynamic File Inclusion修正
        //var sUrlHeader = window.location.origin;
        //var sUrlFolder = window.location.pathname;
		//1140815 Zen 1141011 弱掃Client Dynamic File Inclusion修正
        //var nEAI301 = window.location.href.indexOf('EAI301.aspx');

        //1100504 Zen 1100473 弱掃Client DOM XSS修正
        //window.location.href = sUrlHeader + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
        //1140723 Zen 1141011 弱掃Client Dynamic File Inclusion修正
        //window.location.href = HtmlEncode(sUrlHeader) + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
        //1140815 Zen 1141011 弱掃Client Dynamic File Inclusion修正
		//window.location.href = window.location.href.slice(0, nEAI301) + sUrl;
		
		//1140815 Zen 1141011 弱掃Client Dynamic File Inclusion修正
		if (!isSafeUrl(sUrl) 
			|| /[\/\\]/.test(sUrl) 
			|| /^https?:/i.test(sUrl)) 
			return;
		
		const basePath = `${window.location.protocol}//${window.location.host}/${window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/") + 1)}`;
		const safeUrl = basePath + sUrl
		window.location.href = safeUrl;
    }
}

//1100504 Zen 1100473 弱掃Client DOM XSS修正
function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

//1140815 Zen 1141011 弱掃Client Dynamic File Inclusion修正
function isSafeUrl(url) {
    const allowedPages = ["EAI302.aspx", "EAI303.aspx"];
    return allowedPages.some(prefix => url.startsWith(prefix));
}