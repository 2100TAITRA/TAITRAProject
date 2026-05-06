/*
日期	SA		PG		單號		DESC
0980918	--		Leslie	0980455		修正呼叫WebFileIO之參數，傳入正確之Artifact
0991224	Leslie	Debra	0990673		因修改台科大版本發現檔號和案由在清除時未被清空而修正
1000906	--		Jeff	無			檔管局驗證，文號欄位onblur檢核時，如輸入檔號自動轉回文號，且把檔號紀錄至隱藏欄位
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
1040716	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
1050809 Kevin   Zen     1050700     弱掃XSS修正
1060123 Cloud   Kenny   1051332     調整子視窗帶回書審編號方式
1060503 Cloud   Joe		1050087     二代系統升級
1061103 Kevin   Zen		1061071     修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
1080423	Cloud	Kevin_C	1080047		增加字數檢核
1100622 Cloud   Zen     驗證序13    修正二代升級衍生之儲存後跳出錯誤訊息之問題
1110519 Cloud   Cloud   1110484     修正取消需點擊2次才能顯示正確按鈕問題
1120608 Cloud   Cloud   1120073     修改開啟僅需輸入書號
1130930 Kevin   Jason   1130941     航港局弱掃修正Reflected XSS Specific Clients
1140505 Cloud   Andy    1140264     新增匯出EXCEL、ODS功能
1140717 Cloud   Andy	1140954  	新增傳入機關代碼，避免ASP、多機關架構撈到別的機關的文、調整顯示的錯誤訊息
*/

var LayoutModeNew = 0;
var LayoutModeModify = 1;

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060503	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1060503	Joe	1050087	二代系統升級
    // if (document.all["ValidationSummary1"].textContent != "")
    // alert(document.all["ValidationSummary1"].textContent);
    jf_ShowValidator();
}

//1060503	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060503	Joe	1050087	二代系統升級
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btKeyHelp": //申請書號查詢
            var pUrl = "";
            pUrl = "AKI850.aspx?k1=" + escape(document.all["txPubName"].value) + "&k2=" + document.all["txPubBirth"].value + "&k3=" + document.all["txPubId"].value;
            jf_OpenChildWin(pUrl, "AKI850", 750, 500);
            Page_BlockSubmit = true;
            break;
    }
}

//1060503	Joe	1050087	二代系統升級，傳入參數event
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
    {
        //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1060503	Joe	1050087	二代系統升級
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = false;
            if (!CheckBeforeOpen())
            {
                Page_BlockSubmit = true;
            }
            //1060503	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            Page_BlockSubmit = false;
            if (!CheckBeforeSave())
            {
                Page_BlockSubmit = true;
            }
            else
            {
                if (!CheckActionType())
                    Page_BlockSubmit = true;
            }
            //1060503	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060503	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060503	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            var pDg1Len = document.all.dg1.rows.length;  //有header,筆數為實際筆數+1
            var pDocNoAry = new Array(pDg1Len - 1)
            var pSubjectAry = new Array(pDg1Len - 1)
            //Keep Value(for 不清)
            if (pDg1Len > 1)
            {
                var strtxDocNo = "";
                var strtxSubject = "";
                for (var i = 2; i < pDg1Len + 1; i++)
                {
                    strtxDocNo = "dg1__ctl" + i + "_txDocNo";
                    strtxSubject = "dg1__ctl" + i + "_txSubject";
                    pDocNoAry[i - 2] = document.all[strtxDocNo].value;
                    pSubjectAry[i - 2] = document.all[strtxSubject].value;
                }
            }
            var strFileNoSep = document.all.txFileNoSep.value;

            if (jf_ConfirmClean())
            {
                //Clean Value(template未清: textarea)
                document.all.txPubAddress.value = "";
                document.all.txBehalfAddress.value = "";
                document.all.txProxyAddress.value = "";

                //Restore Value(不清)
                if (pDg1Len > 1)
                {
                    var strtxDocNo = "";
                    var strtxSubject = "";
                    for (var i = 2; i < pDg1Len + 1; i++)
                    {
                        strtxDocNo = "dg1__ctl" + i + "_txDocNo";
                        strtxSubject = "dg1__ctl" + i + "_txSubject";
                        //debra marked
                        //						document.all[strtxDocNo].value = pDocNoAry[i-2];
                        //						document.all[strtxSubject].value = pSubjectAry[i-2];
                        //0991224			Debra	0990673		因修改台科大版本發現檔號和案由在清除時未被清空
                        //清除檔號 & 案由
                        document.all[strtxDocNo].value = "";
                        document.all[strtxSubject].value = "";
                    }
                }
                document.all.txFileNoSep.value = strFileNoSep;
            }
            //1060503	Joe	1050087	二代系統升級，調整focus寫法
            //document.all.txApplyNo.focus();
            $('#' + document.all.txApplyNo.id).focus();
            Page_BlockSubmit = true;
            break;
        case "btSearch":
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();

            //1060503	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();

            //1060503	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btApplyInfo":  //申請需知
            jf_OpenChildWin("AKT850C.aspx", "AKT850C", 700, 600);
            Page_BlockSubmit = true;
            break;
        case "btGetEcFile":
            Page_BlockSubmit = true;
            document.all["BF"].Title = "請選擇待存檔路徑";//Leslie  0980922 修改子視窗Title "請選擇待上傳檔案路徑";
            if (document.all["BF"].ShowDialog(0) != 0) //有指定值
            {
                document.all["txClientPath"].value = document.all["BF"].Path;
                DownloadFile();
            }
            break;
        //1140505 Andy 1140264 新增匯出EXCEL、ODS功能
        case "btODS":
        case "btExcel":
            Page_BlockSubmit = !jf_ConfirmPrint();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{
    //1060123   Kenny   [1051332]   調整子視窗帶回書審編號方式--Start--
    if (argCallerId == "AKI850")
    {
        document.all["txApplyNo"].value = document.all["lbReturnValue"].options[0].text;
        //1060503	Joe	1050087	二代系統升級，調整focus寫法
        //document.all["txApplyNo"].focus();
        $('#txApplyNo').focus();

        IsServerHandling = true;
        Page_BlockSubmit = false;
        //1110519   Cloud   1110484     修正取消需點擊2次才能顯示正確按鈕問題
        //__doPostBack("", "");
        jf_OpenButtonSubmit();
        
    }

    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
    //1060123   Kenny   [1051332]   調整子視窗帶回書審編號方式--End--
}

function ClientOnLoad()
{
    //1100622 Zen 驗證序13 修正二代升級衍生之儲存後跳出錯誤訊息之問題
    //jf_CallWS("Lib/AK_LIB.asmx", "BubbleFun", false, null);
    ShowMsg();
	
    $(window).trigger('resize');

    //1130930   Jason   1130941     航港局弱掃修正Reflected XSS Specific Clients
    jf_SetSubjectDecode();
}

function OnWSResult(argResult, OnblurNum)
{
    if (argResult.id == iCallID_ChkPubAddress)
    {
        if (jf_IsWebServiceSuccessNoAlert(argResult))
        {
            if (document.all.txPubAddress.value == "")
            {
                if (!argResult.value.ErrorClass.IsErr && argResult.value.RtnField0[0] != "")
                    document.all.txPubAddress.value = argResult.value.RtnField0[0];
            }
        }
    }
    else if (argResult.id == iCallID_CheckPID)
    {
        if (jf_IsWebServiceSuccessNoAlert(argResult))
        {
            if (!argResult.value.RtnBool)
            {
                alert("身分證字號輸入不合法!");
                //1060503	Joe	1050087	二代系統升級，調整focus寫法
                //document.all[Id].focus();
                $('#' + Id).focus();
            }
        }
    }

    if (argResult.id == ws_ApplyCallID)
    {
        if (jf_IsWebServiceSuccessNoAlert(argResult))
        {
            if (!argResult.value.RtnBool)
            {
                document.all["dg1__ctl" + OnblurNum + "_txSubject"].value = argResult.value.Subject;
            }
        }
    }
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060503	Joe	1050087	二代系統升級
    // document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

var iCallID_ChkPubAddress = null;
var iCallID_CheckPID = null;
var Id = null;
function TbOnBlur(strObjName)
{
    var pIsValid = true;
    var pStr = "";
    var pVal1 = "";

    if (strObjName == "txApplyDate" || strObjName == "txPubBirth" || strObjName == "txBehalfBirth")
    {
        pVal1 = jf_Trim(document.all[strObjName].value);
        if (pVal1 != "")
        {
            document.all[strObjName].value = jf_PADL(pVal1, 7, "0");
            if (!jf_CheckCDATE(pVal1))
            {
                pStr = pStr + "日期格式錯誤：" + pVal1 + "\n\r";
                //1060503	Joe	1050087	二代系統升級，調整focus寫法
                //if (pIsValid) document.all[strObjName].focus();
                if (pIsValid)
                    $('#' + strObjName).focus();
                pIsValid = false;
            }
        }
    }

    if (pStr != "")
    {
        alert(pStr);
        return;
    }

    // 身分證字號檢查
    //95.09.20 David 應驗證需求，不要求檢核身份證
    /*
	if(strObjName == "txPubId" || strObjName == "txBehalfId")
	{
		Id = strObjName;
		if(document.all[strObjName].value == "")
			return;
		var param = new Array(1);
		param[0] = document.all[strObjName].value;
		callObj = jf_CallWS("lib/AK_LIB.asmx","CheckPID",false,param);
		iCallID_CheckPID = callObj.id;
		OnWSResult( callObj );
	}
	*/

    //自動帶出申請人住址
    if (strObjName == "txPubName" || strObjName == "txPubBirth" || strObjName == "txPubId")
    {
		//1140717 Andy 1140954  新增傳入機關代碼，避免ASP、多機關架構撈到別的機關的文、調整顯示的錯誤訊息
        //var KeyName = new Array(3)
		var KeyName = new Array(4)
		KeyName[3] = "SOURCE_ORGNO";
        KeyName[0] = "PUB_NAME";
        KeyName[1] = "PUB_BIRTH";
        KeyName[2] = "PUB_ID";

        if (document.all["txPubName"].value == "" || document.all["txPubBirth"].value == "" || document.all["txPubId"].value == "" || document.all["txPubAddress"].value != "") return;
		//1140717 Andy 1140954  新增傳入機關代碼，避免ASP、多機關架構撈到別的機關的文、調整顯示的錯誤訊息
        //var KeyValue = new Array(3);
		var KeyValue = new Array(4);
		KeyValue[3] = document.all["nOrgID"].value;
        KeyValue[0] = document.all["txPubName"].value;
        KeyValue[1] = document.all["txPubBirth"].value;
        KeyValue[2] = document.all["txPubId"].value;

        //1050809 Zen 1050700 弱掃XSS修正
        KeyValue[0] = encodeURI(KeyValue[0]);
        KeyValue[1] = encodeURI(KeyValue[1]);
        KeyValue[2] = encodeURI(KeyValue[2]);

        var RtnFldName = new Array(1);
        RtnFldName[0] = "PUB_ADDRESS";
        var OrdFldName = new Array(1);
        OrdFldName[0] = "APPLY_DATE DESC";

        var param = new Array(5);
        param[0] = "APPLY_MAIN";
        param[1] = KeyName;
        param[2] = KeyValue;
        param[3] = RtnFldName;
        param[4] = OrdFldName;

        callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, param);
        iCallID_ChkPubAddress = callObj.id;
        OnWSResult(callObj);
    }

}

//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    if (CheckBeforeSave())
    {
        // 新增模式需檢查鍵值是否已存在
        /*
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist())//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
				bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
		*/
        bRtnbool = true;
    }
    return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
var pEmptyColumn = "";
var pEmptyColumnFocusValid = true;
function CheckBeforeSave()
{
    var pIsValid = true;
    pEmptyColumn = "";
    pEmptyColumnFocusValid = true;
    HasValue("txApplyDate", "申請日期");
    HasValue("txPubName", "申請人姓名");
    HasValue("txPubBirth", "申請人出生年月日");
    HasValue("txPubId", "申請人身分證明文件字號");
    HasValue("txPubAddress", "申請人住址");
    //電話至少需輸入一個
    if (jf_Trim(document.all.txPubHTel.value) == "" && jf_Trim(document.all.txPubOTel.value) == "")
    {
        //if(pEmptyColumn != "") pEmptyColumn +="、";
        pEmptyColumn += "申請人電話(至少需輸入一個)\n\r";
        if (pEmptyColumnFocusValid)
        {
            //1060503	Joe	1050087	二代系統升級，調整focus寫法
            //document.all["txPubHTel"].focus();
            $('#txPubHTel').focus();
            pEmptyColumnFocusValid = false;
        }
    }

    if (jf_Trim(document.all["txBehalfName"].value) != "")
    {
        HasValue("txBehalfBirth", "代理人出生年月日(代理人有輸入時)");
        HasValue("txBehalfId", "代理人身分證明文件字號(代理人有輸入時)");
        HasValue("txBehalfAddress", "代理人住址(代理人有輸入時)");
        //電話至少需輸入一個
        if (jf_Trim(document.all.txBehalfHTel.value) == "" && jf_Trim(document.all.txBehalfOTel.value) == "")
        {
            //if(pEmptyColumn != "") pEmptyColumn +="、";
            pEmptyColumn += "代理人電話(代理人有輸入時至少需輸入一個)\n\r";
            if (pEmptyColumnFocusValid)
            {
                //1060503	Joe	1050087	二代系統升級，調整focus寫法
                //document.all["txBehalfHTel"].focus();
                $('#txBehalfHTel').focus();
                pEmptyColumnFocusValid = false;
            }
        }
        HasValue("txRelation", "代理人與申請人的關係(代理人有輸入時)\n\r");
    }

    //至少需一項申請目的	
    if (!document.all["cbPurpose1"].checked
	 && !document.all["cbPurpose2"].checked
	 && !document.all["cbPurpose3"].checked
	 && !document.all["cbPurpose4"].checked
	 && !document.all["cbPurpose5"].checked
	 && !document.all["cbPurpose6"].checked)
    {
        //if(pEmptyColumn != "") pEmptyColumn +="、";
        pEmptyColumn += "申請目的(至少需勾選一項)\n\r";
        if (pEmptyColumnFocusValid)
        {
            //1060503	Joe	1050087	二代系統升級，調整focus寫法
            //document.all["cbPurpose1"].focus();
            $('#cbPurpose1').focus();
            pEmptyColumnFocusValid = false;
        }
    }
    //申請目的--其他
    if (document.all["cbPurpose6"].checked)
    {
        HasValue("txOtherPurpose", "申請目的-其他(勾選其他項目時)\n\r");
    }

    //申請原件說明(判斷是否有選擇原件)
    var pDg1Len = document.all.dg1.rows.length;  //有header,筆數為實際筆數+1
    var strDlApplyView = "";
    var strDlApplyCopy = "";
    var strtxDocNo = "";
    var pHasOrigin = false;  //借原件
    for (var i = 2; i < pDg1Len + 1; i++)
    {
        strDlApplyView = "dg1__ctl" + i + "_dlApplyView";
        strDlApplyCopy = "dg1__ctl" + i + "_dlApplyCopy";
        strtxDocNo = "dg1__ctl" + i + "_txDocNo";

        if (jf_Trim(document.all[strtxDocNo].value) == "") continue;

        if (document.all[strDlApplyView].value == "1") //原件
        {
            pHasOrigin = true;
        }
        if (document.all[strDlApplyView].value == "" && document.all[strDlApplyCopy].value == "") //都沒勾選
        {
            //if(pEmptyColumn != "") pEmptyColumn +="、";
            pEmptyColumn += "明細-序 " + (i - 1) + " (抄錄閱覽、提供複製品至少需選擇一項)\n\r";
            if (pEmptyColumnFocusValid)
            {
                //1060503	Joe	1050087	二代系統升級，調整focus寫法
                //document.all[strDlApplyView].focus();
                $('#' + strDlApplyView).focus();
                pEmptyColumnFocusValid = false;
            }
        }
    }

    if (pHasOrigin)
    {
        HasValue("txOriginReason", "閱覽檔案原件事由(申請原件時)");
    }

    if (pEmptyColumn != "")
    {
        alert("以下欄位不可空白：\n\r" + pEmptyColumn);
        return false
    }

    return true;
}

//開啟前檢查
function CheckBeforeOpen()
{
    var bRtnbool = false;
    var strObjName = "txApplyDate";
    var pIsValid = true;
    pEmptyColumn = "";
    HasValue("txApplyNo", "申請書號");
    //1120608 Cloud     1120073     修改開啟僅需輸入書號
    //HasValue("txPubName", "申請人姓名");
    //HasValue("txPubBirth", "申請人出生年月日");
    //HasValue("txPubId", "申請人身分證明文件字號");

    if (pEmptyColumn != "")
    {
        alert("以下欄位不可空白：\n\r" + pEmptyColumn);
        return false
    }

    return true;
}

function HasValue(strObjName, strObjDesc)
{
    if (jf_Trim(document.all[strObjName].value) == "")
    {
        //if(pEmptyColumn != "") pEmptyColumn +="、";
        pEmptyColumn += strObjDesc + "\n\r";
        if (pEmptyColumnFocusValid)
        {
            //1060503	Joe	1050087	二代系統升級，調整focus寫法
            //document.all[strObjName].focus();
            $('#' + strObjName).focus();
            pEmptyColumnFocusValid = false;
        }
    }
}

function jf_IsWebServiceSuccessNoAlert(argResult)
{
    if (argResult.error)
    {
        alert(argResult.errorDetail.string);
        return false;
    }
    else
    {
        obj = argResult.value;
        if (obj.ErrorClass.IsErr)
        {
            if (obj.ErrorClass.IsRedirect)
            {
                jf_RedirectToCustomErrPage();
                return false;
            }
            else
                return true;
        }
    }
    return true;
}
//95.09.14 David
var ws_ApplyCallID = "";
function DgDocNoOnblur(objId, Count, TargetDg)
{
    var param = new Array(1);
    param[0] = document.all[objId].value;

    //1050809 Zen 1050700 弱掃XSS修正
    param[0] = encodeURI(param[0]);

    if (param[0] != "")
    {
        var CallApplyObj = jf_CallWS("Lib/AK_LIB.asmx", "GetApplyDocInfo", false, param);
        ws_ApplyCallID = CallApplyObj.id;
        OnWSResult(CallApplyObj, Count);
    }
}
//95.09.14 David
function CheckActionType()
{
    var ActionType = jf_GetActionMode();
    if (ActionType == LayoutModeNew)
    {
        if (document.all["txApplyNo"].value != "")
        {
            alert("新增模式：申請書號不必輸入，請檢查");
            return false;
        }
        else
            return true;
    }
    else
        return true;

}

function DownloadFile()
{
    var strFullPath = document.all["txFileName"].value;
    if (strFullPath == "") //未設定(不上傳)
        return true;

    var bRtn = true;

    var strErrMsg = "";
    var strFileName = "";
    var strClientPath = "";
    var start = strFullPath.lastIndexOf("/");

    if (start != -1)
    {
        document.all["FileUpload"].value = "YES";
        strFileName = strFullPath.substring(start + 1);
        strClientPath = strFullPath.substring(0, start);
    }
    else
    {
        document.all["FileUpload"].value = "";
        return true; //已設定過(不上傳)
    }

    var soap = new ActiveXObject("WSWrapper.WebFileIO");

    //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
    //soap.Init(document.all["AP_FILEIO_WS"].value);
    var serviceURL = document.all["AP_FILEIO_WS"].value;
    if (document.all.II_USE_SSL != null)
    {
        if (document.all.II_USE_SSL.value == "Y")
            serviceURL = serviceURL.replace("http://", "https://");
    }
    //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
    try
    {
        soap.Init(serviceURL);

        //soap.Init("http://deva.nfa.com.tw/WebFileIO/T2100FileIOService.asmx");		

        soap.AddFile(document.all["AP_WORK_PATH"].value, strFileName);
        //alert(document.all["AP_WORK_PATH"].value+","+strFileName+","+ strClientPath);
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        if (!fso.FolderExists(document.all["txClientPath"].value)) //下載目的資料夾不存在時建立資料夾
            fso.CreateFolder(document.all["txClientPath"].value);
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        //try
        //{
        //soap.Upload(jf_GetSessionID(), true);		
        //0980918	Leslie	0980455	修改WebFileIO之參數，必需傳入Artifact
        //soap.Download(jf_GetSessionID(), true, document.all["txClientPath"].value);		
        soap.Download(document.all["H_Artifact"].value, true, document.all["txClientPath"].value);
        //soap.Download(jf_GetSessionID(), true, "C:\\");		
        //alert(document.all["AP_WORK_PATH"].value);
        //alert(strFileName);
        //alert(document.all["txClientPath"].value);
    }
    catch (e)
    {
        strErrMsg = e.message;
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        if (soap.hasError)
            strErrMsg += soap.ErrorMessage;
        //1040716 Gabby[1040324]增加WebFileIO錯誤訊息處理		
        alert("連接伺服器" + serviceURL + "下載檔案發生錯誤，錯誤訊息為:" + strErrMsg);
    }
    //alert(strErrMsg);
    if (strErrMsg != "")
    {
        bRtn = false;

        //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
    }

    return bRtn;
}

var iCallID_GetApplyDocInfo = null;
function txDocNoOnBlur(argSeq)
{
    //自動帶出主旨/案名
    var strTxDocNo = "dg1__ctl" + argSeq + "_txDocNo";
    var strTxSubject = "dg1__ctl" + argSeq + "_txSubject";
    //1000906	Jeff	多設一隱藏欄位紀錄檔號
    var strTxDocFileNo = "dg1__ctl" + argSeq + "_txDocFileNo";
    var pTemp = jf_Trim(document.all[strTxDocNo].value);
    if (pTemp == "") return;
    var pTempAry = pTemp.split(document.all["txFileNoSep"].value);
    var param = new Array(6);
    if (pTempAry.length == 5) //檔號
    {
        param[0] = "";
        param[1] = pTempAry[0];
        param[2] = pTempAry[1];
        param[3] = pTempAry[2];
        param[4] = pTempAry[3];
        param[5] = pTempAry[4];
    }
    else  //文號
    {
        param[0] = pTemp;
        param[1] = "";
        param[2] = "";
        param[3] = "";
        param[4] = "";
        param[5] = "";
    }

    callObj = jf_CallWS("lib/AK_LIB.asmx", "GetApplyDocInfo", false, param);
    iCallID_GetApplyDocInfo = callObj.id;
    //1000906	Jeff	增加一個參數傳入
    //OnWSResult2( callObj ,strTxSubject, strTxDocNo);
    OnWSResult2(callObj, strTxDocFileNo, strTxSubject, strTxDocNo);

}
//1000906	Jeff	增加一個參數傳入
//function OnWSResult2(argResult, argObjResult, argObjFocus)
function OnWSResult2(argResult, argHideObj, argObjResult, argObjFocus)
{
    if (argResult.id == iCallID_GetApplyDocInfo)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            document.all[argObjResult].value = argResult.value.Subject;
            //1000906	Jeff	文號欄位只顯示文號，檔號紀錄在隱藏欄位
            document.all[argObjFocus].value = argResult.value.DocNo;
            document.all[argHideObj].value = argResult.value.FileNo;
        }
        else
        {
            //1060503	Joe	1050087	二代系統升級，調整focus寫法
            //document.all[argObjFocus].focus();
            $('#' + argObjFocus).focus();
        }
    }
}

//1080423	Kevin_C	1080047	增加字數檢核 -S
function isMaxLength(obj,argText,argMaxNum)
{
	var nMaxNum = parseInt(argMaxNum);
    if (obj.value.length == nMaxNum)
    {
		var nCode = parseInt(event.keyCode);
        if (nCode != 8 && nCode!=9 && nCode != 13 && nCode != 16 && nCode != 46 && (nCode < 33 || nCode > 40))
		{
            event.returnValue = false;
			jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
		}
    } else if (obj.value.length > nMaxNum)
    {
        bHasCheck = true;
        jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
        bHasCheck = false;
        obj.value = obj.value.substring(0, nMaxNum)
    }
}
//1080423	Kevin_C	1080047	增加字數檢核 -E
//1130930   Jason   1130941     航港局弱掃修正Reflected XSS Specific Clients--S
function jf_SetSubjectDecode()
{
        for (var isubject = 2; isubject <= document.all.dg1.rows.length; isubject++) {
        jf_htmlDecode("dg1__ctl" + isubject + "_txSubject");
    }
}
function jf_htmlDecode(argId) {
    var tempVal = document.all[argId].value;
    if (tempVal != "") {
        var div = document.createElement('div');
        div.innerHTML = tempVal;
        document.all[argId].value = div.textContent;
    }
}

//1130930   Jason   1130941     航港局弱掃修正Reflected XSS Specific Clients--E