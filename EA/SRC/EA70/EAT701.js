/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.10.16
 * -------------------------------------------------------------------------------------------------
 * 日期             修改人      單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2006.12.06       Shelly      951278	修改原本取得之系統時間,並在開啟時直接帶出解密日期
 * 2008.11.07       Cola        0970988	密等與應用限制之連動關係設定
 * 2009.08.24       Albert      0980447	修改畫面欄位名稱
 * 2011.08.02       Jeff        1000631	配合公文文號改為文(編)號 警示訊息一併更動	
 * 1061113          Kevin_C     1061120	修正ReadOnly欄位顏色
 * 1070601          Zen		    1070498 新密等為普通時清空並鎖定新解密條件欄位
 * 1080529		Kevin_C	1070678 弱掃問題修正，主旨有單引號，經過HtmlEncode後未在Client端Decode導致公文開啟後無法POSTBACK，會被IIS偵測到危險字元
 * 1090414			Kevin_C		1090035	降密時，改成帶入FROM_SUBJECT
 * 1100204          Zen         1090927 取消使用document.activeElement
 * 1140609          Joeko       1140609 新增核定解密文號(註銷通知單號)欄位，提供匯出Excel、ODS功能。
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

//1060706	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

document.all.dlSecNo.onchange = dlSecNo_OnChange;

if (document.all.txSec.value != "")
    dlSecNo_OnChange();

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060706	Kevin_C	1050087	升二代 -S
    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmp", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //1060706	Kevin_C	1050087	升二代 -E
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

    //1070601 Zen 1070498 新密等為普通時清空並鎖定新解密條件欄位
    SetSecDesp();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100204 Zen 1090927 取消使用document.activeElement
//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement
    //var xObjectName = document.activeElement.id;
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
//1060706	Kevin_C	1050087	升二代
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

    //1060706	Kevin_C	1050087	升二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = true;
            if (jf_Trim(document.all.txDocNo.value) == "" && jf_Trim(document.all.txFileNo.value) == "")
            {
                //100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
                //alert("公文文號及檔號不可皆為空白");
                alert("文(編)號及檔號不可皆為空白");
                //1060706	Kevin_C	1050087	升二代
                //document.all.txDocNo.focus();
                $('txDocNo').focus();
                return;
            }
            if (jf_Trim(document.all.txFileNo.value) != "")
            {
                //Modify By Cola 000988 透過txFILENO_SEP取得儲存之系統變數之值(檔號之分格符號)
                //var tempstr = document.all.txFileNo.value.split("-");
                var tempstr = document.all.txFileNo.value.split(document.all.txFILENO_SEP.value);
                if (tempstr.length != 5)
                {
                    //Modify By Cola 000988 透過txFILENO_SEP取得儲存之系統變數之值(檔號之分格符號)
                    //alert("錯誤之檔號格式，必須為完整年度號-分類號-案次號-卷次號-項次號格式");
                    alert("錯誤之檔號格式，必須為完整年度號" + document.all.txFILENO_SEP.value + "分類號" + document.all.txFILENO_SEP.value + "案次號" + document.all.txFILENO_SEP.value + "卷次號" + document.all.txFILENO_SEP.value + "目次號格式");
                    //1060706	Kevin_C	1050087	升二代
                    //document.all.txFileNo.focus();
                    $('txFileNo').focus();
                    return;
                }
            }

            Page_BlockSubmit = false;
            //1060706	Kevin_C	1050087	升二代
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
            //1060706	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();	
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060706	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060706	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1060706	Kevin_C	1050087	升二代
            //document.all["txKeyFld"].focus();
            $('txKeyFld').focus();
            break;
        case "btSearch":
            /*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			*/
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1060706	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060706	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1140609          Joeko       1140609 提供匯出Excel、ODS功能。
        case "btExcel":
        case "btODS":
            Page_BlockSubmit = !jf_ConfirmPreview();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
    {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew)
        {
            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
            {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
        else
            bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txNotifyOrg"].value == "")
    {
        //2009.08.24	Albert	0980447	修改畫面欄位名稱
        //strErrMsg += "來文通知機關不可為空白\n";
        strErrMsg += "核定解密機關不可為空白\n";
        //1060706	Kevin_C	1050087	升二代
        //document.all["txNotifyOrg"].focus();
        $('txNotifyOrg').focus();
    }

    //1140609          Joeko       1140609 核定解密文號(註銷通知單號)為必要欄位。
    if (document.all["H_txOrgName"].value == "VAC") {
        if (document.all["txAppDocNo"].value == "") {
            strErrMsg += "核定解密文號(註銷通知單號)不可為空白\n";
            $('txAppDocNo').focus();
        }
    }

    if (document.all["txRcvDate"].value == "")
    {
        //2009.08.24	Albert	0980447	修改畫面欄位名稱
        //strErrMsg += "對方發文日期不可為空白\n";
        strErrMsg += "來文發文日期或公文核定日期不可為空白\n";
        //1060706	Kevin_C	1050087	升二代
        //document.all["txRcvDate"].focus();
        $('txRcvDate').focus();
    }
    /*else
	{
		if(jf_CheckCDATE(document.all.txRcvDate.value)==false)
		strErrMsg += "發文日期格式錯誤\n";
		document.all["txRcvDate"].focus();
	}*/

    if (document.all["txRcvNo"].value == "")
    {
        //2009.08.24	Albert	0980447	修改畫面欄位名稱
        //strErrMsg += "對方發文字號不可為空白\n";
        //2011.08.02   Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
        //strErrMsg += "來文發文字號或核定公文字號不可為空白\n";
        //1140609          Joeko       1140609 來文發文字號或核定文(編)號更名成來文發文字號。
        if (document.all["H_txOrgName"].value != "VAC")
            strErrMsg += "來文發文字號或核定文(編)號不可為空白\n";
        else
            strErrMsg += "來文發文字號不可為空白\n";
        //1060706	Kevin_C	1050087	升二代
        //document.all["txRcvNo"].focus();
        $('txRcvNo').focus();
    }

    //1060706	Kevin_C	1050087	升二代
    //if (document.all["dlSecNo"].options(document.all["dlSecNo"].selectedIndex).value=="1")
    if (document.all["dlSecNo"].options[document.all["dlSecNo"].selectedIndex].value == "1")
    {
        if (document.all["txRmvSecDate"].value == "")
        {
            strErrMsg += "解密日期不可為空白\n";
            //1060706	Kevin_C	1050087	升二代
            //document.all["txRmvSecDate"].focus();
            $('txRmvSecDate').focus();
        }
    }
    else
    {
        if (document.all["txNSecDate"].value == "")
        {
            strErrMsg += "應解密日期不可為空白\n";
            //1060706	Kevin_C	1050087	升二代
            //document.all["txNSecDate"].focus();
            $('txNSecDate').focus();
        }
    }


    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
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

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function ObjOnBlur(argCallObj, argMsgStr)
{
    jf_CallCheckCDATE(argCallObj, argMsgStr);
}

function dlSecNo_OnChange()
{
    var currSecNum = getSecValueByText(document.all.txSec.value);
    //1060706	Kevin_C	1050087	升二代
    //var selectNum = document.all.dlSecNo.options(document.all.dlSecNo.selectedIndex).value;
    var selectNum = document.all.dlSecNo.options[document.all.dlSecNo.selectedIndex].value;

    if (selectNum > currSecNum)
    {
        alert("新密等必須比舊密等之機密等級低");
        document.all.dlSecNo.selectedIndex = 0;
        //1070601 Zen 1070498 新密等為普通時清空並鎖定新解密條件欄位
        SetSecDesp();
    }

    //解密日期、應解密日期欄位控制
    if (document.all.dlSecNo.selectedIndex == 0)
    {
        document.all["txRmvSecDate"].readOnly = false;
        document.all["txRmvSecDate"].className = "RequireField";
        document.all["txNSecDate"].readOnly = true;
        //1061113	Kevin_C	1061120	修正ReadOnly欄位顏色
        document.all["txNSecDate"].style = "Width:4.5em";
        document.all["txNSecDate"].className = "DisplayOnly";
        document.all["txRmvSecDate"].value = jf_GetSys_Date();

        //[0970144] Add by Cola 密等為普通時，案由透過DOC_EXTRA取得IN_SUBJECT			
		//1080529	Kevin_C	1070678 修正弱掃錯誤
        //document.all["txFromSubject"].value = document.all["H_Subject"].value
		//1080826	Joe		1070678	弱掃修正Reflected XSS Specific Clients
		// document.all["txFromSubject"].value = document.all["H_Subject"].innerText;
		document.all["txFromSubject"].value = document.all["H_Subject"].value;

        //2008.11.7 Modify by Cola 新增應用限制之控制		
        if (document.all["ENV_OD_APPLY_LIMIT_BY_SEC"].value.substring(0, 1) == "Y")
            document.all["rb2"].checked = true;
        else if (document.all["ENV_OD_APPLY_LIMIT_BY_SEC"].value.substring(0, 1) == "N")
            document.all["rb3"].checked = true;
        else if (document.all["ENV_OD_APPLY_LIMIT_BY_SEC"].value.substring(0, 1) == "R")
            document.all["rb4"].checked = true;
        //1070601 Zen 1070498 新密等為普通時清空並鎖定新解密條件欄位
        SetSecDesp();
    }
    else
    {
        document.all["txRmvSecDate"].readOnly = true;
        //1061113	Kevin_C	1061120	修正ReadOnly欄位顏色
        document.all["txRmvSecDate"].style = "Width:4.5em";
        document.all["txRmvSecDate"].className = "DisplayOnly";
        document.all["txRmvSecDate"].value = "";
        document.all["txNSecDate"].readOnly = false;
        document.all["txNSecDate"].className = "RequireField";

        //[0970144] Add by Cola 密等不為普通時，案由顯示密不錄由
		//1090414	Kevin_C	1090035	降密時，改成帶入FROM_SUBJECT
        //document.all["txFromSubject"].value = "密不錄由";
		document.all["txFromSubject"].value = document.all["H_FromSubject"].value;

        //2008.11.7 Modify by Cola 新增應用限制之控制		
        if (document.all["ENV_OD_APPLY_LIMIT_BY_SEC"].value.substring(1, 2) == "Y")
            document.all["rb2"].checked = true;
        else if (document.all["ENV_OD_APPLY_LIMIT_BY_SEC"].value.substring(1, 2) == "N")
            document.all["rb3"].checked = true;
        else if (document.all["ENV_OD_APPLY_LIMIT_BY_SEC"].value.substring(1, 2) == "R")
            document.all["rb4"].checked = true;
        //1070601 Zen 1070498 新密等為普通時清空並鎖定新解密條件欄位
        document.all['txSecDesp_New'].value = document.all['txSecDesp'].value;
        document.all['txSecDesp_New'].className = 'RequireField';
        document.all['txSecDesp_New'].disabled = false;
    }
}

//根據密等text來讀取相對應的value
function getSecValueByText(argText)
{
    for (i = 0; i < document.all.dlSecNo.options.length; i++)
    {
        //1060706	Kevin_C	1050087	升二代
        //if (document.all.dlSecNo.options(i).text == argText)
        if (document.all.dlSecNo.options[i].text == argText)
        {
            //1060706	Kevin_C	1050087	升二代
            //return document.all.dlSecNo.options(i).value;
            return document.all.dlSecNo.options[i].value;
        }
    }
    return -1;
}

//取得系統時間YYY/MM/DD
function jf_GetSys_Date()
{
    var dttoday = new Date();
    var strYear = "" + (dttoday.getFullYear() - 1911);
    strYear = jf_PADLs(strYear, 3, '0');
    var strMonth = "" + (dttoday.getMonth() + 1);
    strMonth = jf_PADLs(strMonth, 2, '0');
    var strDate = "" + dttoday.getDate();
    strDate = jf_PADLs(strDate, 2, '0');
    var today = strYear + strMonth + strDate;
    return today;
}

function jf_CheckFileNo()
{
    if (jf_Trim(document.all.txFileNo.value) != "")
    {
        var param = new Array(1);
        param[0] = jf_Trim(document.all.txFileNo.value);
        var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckFileNo", false, param);
        if (callObj.value.RtnStr != "")
        {
            //2011.08.02   Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動	
            //alert("以下公文文號皆符合輸入檔號條件，請選擇一筆手動輸入公文文號：\n"+callObj.value.RtnStr);
            alert("以下文(編)號皆符合輸入檔號條件，請選擇一筆手動輸入文(編)號：\n" + callObj.value.RtnStr);
            //1060706	Kevin_C	1050087	升二代
            //document.all.txDocNo.focus();
            $('txDocNo').focus();
        }
    }
}

//將字串左邊補足特定字元,取自SYS_utf8.js	by Shelly
function jf_PADLs(argString, argLength, argFillStr)
{
    var pi_length;
    pi_length = argString.length;
    if (pi_length < argLength)
    {
        return jf_PADLs(argFillStr + argString, argLength, argFillStr);
    }
    return argString;
}

//1070601 Zen 1070498 新密等為普通時清空並鎖定新解密條件欄位
function SetSecDesp()
{
    document.all['txSecDesp_New'].value = '';
    document.all['txSecDesp_New'].className = 'DisplayOnly';
    document.all['txSecDesp_New'].style.backgroundColor = '';
    document.all['txSecDesp_New'].disabled = true;
}

//1140609          Joeko       1140609  核定解密文號(註銷通知單號)onblur
function CheckAppDocInfo() {
    var docNo = jf_Trim(document.all["txAppDocNo"].value);
    var orgNo = document.all["H_txOrgNo"].value;

    if (docNo === "") return;

    var res = EA70.EAT701.GetAppDocInfo(orgNo, docNo).value;

    if (res[0] === "OK") {
        document.all["txRcvNo"].value = res[1];     // 來發文字號
        document.all["txRcvDate"].value = res[2];   // 日期
    } else {
        alert(res[1]);
        document.all["txAppDocNo"].focus();
    }
}

