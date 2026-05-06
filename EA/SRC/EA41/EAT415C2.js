/*
日期	SA		PG		單號		DESC
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
1060621 Cloud   Zen     1050087     二代升級
1100204 Leslie  Zen     1090927     取消使用document.activeElement
1110103 Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
1131024 Cloud   Cloud   1130321     修正切換頁、下載檔案功能，優化線上瀏覽操作方式
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

//1060621 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if (document.all.dg1)
//    document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //[0970547]Add by Cola 設定回0，避免server無法正確判斷是否為按下enter
    document.all["txFlag"].value = "0";
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

    if (document.all["txClose"].value == "Y")
    {
        opener.document.all["btCancel2"].click();
        //1060621 Zen 1050087 二代升級
        //window.close();
        jf_CloseSelf();
    }

    /*if (jf_Trim(document.all.txZipFile.value) != "")
	{
		DownloadFile();
		document.all.txZipFile.value = "";
	}*/
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060621 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060621 Zen 1050087 二代升級
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

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
        /*
		case "":
			break;
		*/
        //1060621 Zen 1050087 二代升級，移至ClientButtonControl
        case "btSelectAll":
            Page_BlockSubmit = true;
            SelectAllItem('DOC_CHECK', 3);
            jf_SelectAll("dg1", "_cbSELECT");
            break;
        case "btSelectInverse":
            SelectReverseItem('DOC_CHECK', 3);
            jf_SelectInverse("dg1", "_cbSELECT");
            Page_BlockSubmit = true;
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            UnSelectAllItem('DOC_CHECK', 3);
            jf_SelectClear("dg1", "_cbSELECT");
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060621 Zen 1050087 二代升級
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
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

    //1060621 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {

        //以下屬於DataGrid ToolBar
        //1060621 Zen 1050087 二代升級，移至ClientButtonControl
        //case "btSelectAll":
        //    Page_BlockSubmit = true;
        //    SelectAllItem('DOC_CHECK', 3);
        //    jf_SelectAll("dg1", "_cbSELECT");
        //    break;
        //case "btSelectInverse":
        //    SelectReverseItem('DOC_CHECK', 3);
        //    jf_SelectInverse("dg1", "_cbSELECT");
        //    Page_BlockSubmit = true;
        //    break;
        //case "btSelectClear":
        //    Page_BlockSubmit = true;
        //    UnSelectAllItem('DOC_CHECK', 3);
        //    jf_SelectClear("dg1", "_cbSELECT");
        //    break;
        case "btFIRSTPAGE1":	// 畫面切換到第一頁
        case "btPRIORPAGE1":	// 畫面切換到上一頁
        case "btNEXTPAGE1":		// 畫面切換到下一頁
        case "btLASTPAGE1":		// 畫面切換到最末頁
            Page_BlockSubmit = false;
            //1060621 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //[0970547]Add by Cola
        case "btSELECTPAGE":
            //1131024 Cloud   1130321     修正切換頁功能
            //if (document.all.tbTool.getItem(10).getAttribute("VALUE") == "")
            if (document.all.txSelectNumber.value == "")
            {
                alert("請於後方輸入欲跳至之頁數");
                Page_BlockSubmit = true;
            }
            //1131024 Cloud   1130321     修正切換頁功能
            //else if (parseInt(document.all.tbTool.getItem(10).getAttribute("VALUE")) > parseInt(document.all.tbTool.getItem(1).getAttribute("VALUE").split('/')[1]) || document.all.tbTool.getItem(10).getAttribute("VALUE") == "0")
            else if (parseInt(document.all.txSelectNumber.value) > parseInt(document.all.txPage1.value.split('/')[1]) || document.all.txSelectNumber.value == "0")
            {
                //1131024 Cloud   1130321     修正切換頁功能
                //alert("輸入之頁數必須介於 1 ~ " + document.all.tbTool.getItem(1).getAttribute("VALUE").split('/')[1] + " 之間");
                //document.all.tbTool.getItem(10).setAttribute("VALUE", "");
                alert("輸入之頁數必須介於 1 ~ " + document.all.txPage1.value.split('/')[1] + " 之間");
                document.all.tbTool.txSelectNumber.value = "";
                Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = false;

            //1060621 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //Cola -- end --
        //1131024   Cloud   1130321 優化瀏覽方式
        //case "btIMAGE1":
        //    //1060621 Zen 1050087 二代升級，改用二代模組--begin
        //    Page_BlockSubmit = true;
        //    var Artifact = jf_GetArtifact();
        //    var OrgNo = jf_Trim(document.all.H_txOrgNo.value);
        //    var strDocNoList = GetCheckedData();
        //    if (strDocNoList == '')
        //        alert("檢視欄位至少需勾選一筆明細資料");
        //    else if (strDocNoList.split(",").length > 1)
        //        alert("線上瀏覽不支援多筆公文");
        //    else
        //        DownloadDocument(Artifact, strDocNoList, OrgNo);
        //    break;
            //1060621 Zen 1050087 二代升級，改用二代模組end
        case "btPRINTDETAIL":
            //1060621 Zen 1050087 二代升級
            Page_BlockSubmit = true;
            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                alert('請至少勾選一筆資料!!');
                return;
            }
            else
            {
                
                Page_BlockSubmit = false;
                //1060621 Zen 1050087 二代升級
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btDOWNLOAD":
            //1060621 Zen 1050087 二代升級
            Page_BlockSubmit = true;
            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                alert('請至少勾選一筆資料!!');
                return;
            }
            else
            {
                //Page_BlockSubmit = !CheckBeforeCreate();
                Page_BlockSubmit = false;
                //1060621 Zen 1050087 二代升級
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060621 Zen 1050087 二代升級
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
    var pNo = xObjectName.substring(8, xObjectName.indexOf("_cbSELECT"));

    //pStr  = ReadCookie(argCookie_nm);
    pStr = document.all[argCookie_nm].value;
    pStr1 = '';
    pStr2 = '';
    pType = 0;

    //1060621 Zen 1050087 二代升級
    //var pi_index = Number(document.all["dg1__ctl" + pNo + "_lbRealSEQ_NO"].innerText);
    var pi_index = Number(document.all["dg1__ctl" + pNo + "_lbRealSEQ_NO"].textContent);

    //1100204 Zen 1090927 取消使用document.activeElement
    //if (document.activeElement.checked)
    if (event.target.checked)
    {
        pType = '1';
    }
    else
    { pType = '0' }

    if (pi_index == 1) { pStr1 = '' }
    else { pStr1 = pStr.substring(0, pi_index - 1) }
    pStr2 = pStr.substring(pi_index, pStr.length)

    pStr = pStr1 + pType + pStr2
    //SaveCookie(argCookie_nm,pStr)
    document.all[argCookie_nm].value = pStr;
}
function SelectAllItem(argCookie_nm, argIndex)
{
    pIdx = 0
    //pStr = ReadCookie(argCookie_nm)
    pStr = document.all[argCookie_nm].value;

    if (pStr != null)
    {
        document.all[argCookie_nm].value = PadR('', pStr.length, '1');
        //opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
        //SaveCookie(argCookie_nm,PadR('',pStr.length,'1'))
    }

    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);



}
/*********************************************
 name: SelectAllItem
 desc: 取消選取全部的checkbox
*********************************************/
function UnSelectAllItem(argCookie_nm, argIndex)
{
    pIdx = 0
    //pStr = ReadCookie(argCookie_nm)
    pStr = document.all[argCookie_nm].value;

    if (pStr != null)
    {
        document.all[argCookie_nm].value = PadR('', pStr.length, '0');
    }
}
/********************************************************************
 name: SelectReverseItem
 desc: 反向選取checkbox，並回存cookie
********************************************************************/
function SelectReverseItem(argCookie_nm, argIndex)
{
    //pStr = ReadCookie(argCookie_nm)
    pStr = document.all[argCookie_nm].value;
    pRtn = ''

    pIdx = 0

    while (pIdx < pStr.length)
    {
        if (pStr.substring(pIdx, pIdx + 1) == '0') { pRtn = pRtn + '1' }
        else if (pStr.substring(pIdx, pIdx + 1) == '1') { pRtn = pRtn + '0' }
        pIdx++
    }
    //SaveCookie(argCookie_nm,pRtn)
    document.all[argCookie_nm].value = pRtn;
}
/************************************
 name: PadR
 desc: 指定字元補足字串的右邊
************************************/
function PadR(sAString, bSize, cChar)
{
    var trimStr = Trim(sAString)
    var bSrcLength = trimStr.length
    var RightStrLen = bSize - bSrcLength
    var RightStr = ""

    for (i = 0; i < RightStrLen; i++)
    {
        RightStr = RightStr + cChar
    }
    return trimStr + RightStr

}

/***************************
 name: Trim
 desc: 去除字串首尾的空白
***************************/
function Trim(argStr)
{

    var StrLen = argStr.length
    var trimStr = ""
    var returnStr = ""

    for (i = 0; i < StrLen ; i++)
    {
        argStr.substring(i, i + 1)
        trimStr = argStr.substring(i, i + 1)
        if ((trimStr == " ") && (i != StrLen)) { trimStr = "" }
        returnStr = returnStr + trimStr
    }
    return returnStr
}
/*********************************************
 name : InpNumOnly
 param: 動作物件: Text
 rtn  : none
 desc : 只允許動作物件輸入數字（僅對IE有效）
*********************************************/
function InpNumOnly()
{
    if (event.keyCode == 13)
    {
        //[0970547]Add by Cola 若直接按下Enter ，則先設定該Flag為1
        //方便server端判斷是否為按下enter
        document.all["txFlag"].value = "1";
    }
    //[0970547]Add by Cola 提供user可使用backspace鍵	
    if (event.keyCode != 8)
    {
        if ((event.keyCode < 48) || (event.keyCode > 57)) { event.keyCode = 0; }
    }
}

function OpenError(argDocNo, argSamNo, argOrgNo)
{
    Page_BlockSubmit = true;
    strUrl = "EAT415C3.aspx?DOC_NO=" + argDocNo + "&SAMPLING_NO=" + argSamNo;
    //1060621 Zen 1050087 二代升級
    //jf_OpenChildWin(strUrl, "EAT415C3", 700, 500);
    jf_OpenChildWin(strUrl, "EAT415C3", 800, 600);
}
//1060621 Zen 1050087 二代升級，註解無用程式碼
//function CheckBeforeCreate()
//{
//    var bRtnbool = false;

//    document.all["BF"].Title = "請選擇轉出檔案所存放的目錄";
//    if (document.all["BF"].ShowDialog(0) != 0)  //有指定值
//    {
//        document.all.txClientDLPath.value = document.all["BF"].Path;
//        bRtnbool = true;
//    }
//    else
//        bRtnbool = false;

//    return bRtnbool;
//}

//1060621 Zen 1050087 二代升級，註解無用程式碼
//function DownloadFile()
//{
//    //下載檔案至Client端
//    //上傳檔案至server
//    var strClientPath = document.all.txClientDLPath.value;


//    var showFilePath;

//    var soap = new ActiveXObject("WSWrapper.WebFileIO");
//    //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//    //soap.Init(document.all["AP_FILEIO_WS"].value);	
//    var serviceURL = document.all["AP_FILEIO_WS"].value;
//    if (document.all.II_USE_SSL != null)
//    {
//        if (document.all.II_USE_SSL.value == "Y")
//            serviceURL = serviceURL.replace("http://", "https://");
//    }
//    //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
//    try
//    {
//        soap.Init(serviceURL);

//        soap.AddFile(document.all["AP_WORK_PATH"].value, document.all["txZipFile"].value);

//        var fso = new ActiveXObject("Scripting.FileSystemObject");
//        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
//        //try
//        //{
//        soap.Download(jf_GetSessionID(), true, strClientPath);
//    }
//    catch (e)
//    {
//        var strErrMsg = e.message;
//        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
//        if (soap.hasError)
//            strErrMsg += soap.ErrorMessage;
//        alert("連接伺服器" + serviceURL + "下載檔案發生錯誤，錯誤訊息為:" + strErrMsg);
//        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
//    }

//}

//1060626 Zen 1050087 二代升級，取得被勾選之公文
function GetCheckedData()
{
    var dgRows = document.all.dg1.rows.length + 1;
    var nCheckedCount = 0;
    var strDocNoList = '';
    for (i = 2 ; i < dgRows; i++)
        if (document.all["dg1__ctl" + i + "_cbSELECT"].checked)
            strDocNoList += document.all["dg1__ctl" + i + "_lbDOC_NO"].textContent + ',';

    return strDocNoList.slice(0, -1);
}

//1060626 Zen 1050087 二代升級，二代線上瀏覽
//1131024 Cloud    1130321     修正切換頁、下載檔案功能，優化線上瀏覽操作方式
//function DownloadDocument(argArt, argDocNo, argOrgNo)
function DownloadDocument(argDocNo,argSignType)
{
    //1131024   Cloud   1130321 優化瀏覽方式
    //var artifact = argArt;
    var artifact = jf_GetArtifact();
    var strDocNo = argDocNo;
    //1131024   Cloud   1130321 優化瀏覽方式
    //var strOrgNo = argOrgNo;
    var strOrgNo = jf_Trim(document.all.H_txOrgNo.value);
    if (argSignType == "2")
        argSignType = "E";
    else
        argSignType = "P";
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
                    //1131024 Cloud    1130321     優化線上瀏覽操作方式
                    var OpenType = argSignType == "E" ? "AOL" : "UniView";
                    let _unvDoc = UnvObj.UnvRoot.Doc;
                    let _firstAtt = null;

                    if (typeof _unvDoc == 'object' && _unvDoc != null) {
                        if ($.isArray(_unvDoc.Att)) {
                            _firstAtt = _unvDoc.Att[0];
                        }
                        else {
                            _firstAtt = _unvDoc.Att;
                        }
                    }

                    if (_firstAtt.Type != '7')
                        OpenType = 'UniView';
                    var objViewDoc = {
                        UNVObj: UnvObj,
                        docInfoPage: "AKI802",
                        //1131024 Cloud    1130321     優化線上瀏覽操作方式
                        //openDocModule: 'AOL',
                        //signType: 'E',
                        openDocModule: OpenType,
                        signType: argSignType,
                        readOnlyMode: true
                    };
                    var $docId = jf_GetSessionID() + "_" + (+new Date());
                    localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                    var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
                    //1131024 Cloud    1130321     優化線上瀏覽操作方式
                    //jf_OpenChildWin(unvUrl, "ODT251ViewDoc");
                    jf_OpenChildWin(unvUrl, "Eat415c2ViewDoc");
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