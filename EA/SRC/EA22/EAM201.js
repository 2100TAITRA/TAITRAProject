/*****************************************************************************************************
   程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2025.09.05	CLOUD	  1141137   新增作業
 * 2025.11.06 	Cloud 	  序352     修正子視窗串錯問題
 * 2026.02.13	Cloud 	  [外貿]序159 (彙整表69)修正當輸入錯誤分類號清空版本別後，又修正版本別但卻不會帶回分類號鍵值造成儲存後FILE_MAIN分類號鍵值為0問題
 ****************************************************************************************************/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
    
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/

function ClientButtonControl(e)
{

	var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        case "btCountryCodeHelp":
			var pUrl = "";
			pUrl = "../../EA/EA01/EAI014.aspx";
			jf_OpenChildWin(pUrl, "EAI014", 1024, 768);
			Page_BlockSubmit = true;
			break;
        case "btProductCodeHelp":
			var pUrl = "";
            //* 2025.11.06 	Cloud 	  序352     修正子視窗串錯問題
            //pUrl = "../..EA/EA01/EAI015.aspx";
            pUrl = "../../EA/EA01/EAI015.aspx";
			jf_OpenChildWin(pUrl, "EAI015", 1024, 768);
			Page_BlockSubmit = true;
			break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }
    
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btOpen":
            SetValueToFileCase();
            Page_BlockSubmit = !CheckBeforOpen();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
				//* 2026.02.13	Cloud 	  [外貿]序159 (彙整表69)修正當輸入錯誤分類號清空版本別後，又修正版本別但卻不會帶回分類號鍵值造成儲存後FILE_MAIN分類號鍵值為0問題
				if(document.all["txVerNo"].value!="" && document.all["txVerNo"].value!="" && document.all["H_ClsKey"].value=="")//鍵值為空時，增加取得鍵值
				{
					var arWSParam = new Array(3);
					arWSParam[0] = document.all["tbOrgNo"].value;
					arWSParam[1] = document.all["txVerNo"].value;
					arWSParam[2] = document.all["txClsNo"].value;
					arWSParam[3] = "";
					callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, arWSParam);
					iCallID_Cls = callObj.id;
					OnWSResult(callObj);					
				}
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !(jf_ConfirmDelete());
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = false;
            jf_ConfirmClean(true);
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            var strUrl = "";
            strUrl = "EAM201C1.aspx?rtnObj=lbReturnValue";
            jf_OpenChildWin(strUrl, "EAM012C1", 1024, 768);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave() {
    var bRtnbool = true;

    bRtnbool = jf_CheckBeforSave();
    if (!bRtnbool)
        return;

    var bRtnbool = false;

    if (jf_GetActionMode() == LayoutModeNew) {
        SetValueToFileCase();
        //檢查卷次號是否已存在
        //CheckDup(string argOrgNo, string argCaseYear, string argClsKey, string argCaseNo, string argVolNo)
        var rtnObj = EA22.EAM201.CheckDup(document.all["tbOrgNo"].value, document.all["txFileYear"].value, document.all["H_ClsKey"].value, document.all["txCaseNo"].value, document.all["txVolNo"].value).value;
        if (rtnObj != "") {
            if (rtnObj.indexOf("ERR-") == -1) {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else
                alert(rtnObj);
        }
        else
            bRtnbool = true;
    }
    else
        bRtnbool = true;
    return bRtnbool;
}
var strErrMsg = "";
//儲存前之欄位檢查
function jf_CheckBeforSave() {
    var bRtnbool = true;
    var strControlName = "";
    if (document.all["txFileYear"].value == "") {
        strErrMsg += "年度號\n";
    }
    if (document.all["txVerNo"].value == "") {
        strErrMsg += "版本別\n";
    }
    if (document.all["txClsNo"].value == "") {
        strErrMsg += "分類號\n";
    }
    if (document.all["txVolNo"].value == "") {
        strErrMsg += "卷次號\n";
    }
    else {
        if (document.all["txVolNo"].value == "0000") {
            alert('立卷請從0001起');
            return false;
        }
    }
    if (document.all["txVolName"].value == "") {
        strErrMsg += "案卷名\n";
    }
    if (document.all["txKeepYear"].value == "") {
        strErrMsg += "保存年限\n";
    }

    if (strErrMsg != "") {
        strErrMsg += "不可空白。";
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    strErrMsg = "";
    return bRtnbool;

}
function CheckBeforOpen() {
    var bRtnbool = true;
    if (document.all["txFileYear"].value == "") {
        strErrMsg += "年度號\n";
    }
    if (document.all["txVerNo"].value == "") {
        strErrMsg += "版本別\n";
    }
    if (document.all["txClsNo"].value == "") {
        strErrMsg += "分類號\n";
    }
    if (document.all["txVerNo"].value == "") {
        strErrMsg += "卷次號\n";
    }
    if (strErrMsg != "") {
        strErrMsg += "不可空白。";
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    strErrMsg = "";
    return bRtnbool;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
var iCallID_Cls;
var iCallID_YearVerNo;
function OnWSResult(argResult) {
    if (argResult.id == iCallID_Cls) {
        
        if (!jf_IsWebServiceSuccess(argResult)) {
            //如果不是提示區間的提示訊息 就清空
            if (obj.m_strMsg.indexOf("啟用區間為") == -1) {
                document.all[CurrentObjId].focus();
                document.all["lbClsName"].textContent = "";
                document.all.txClsName.value = "";
                document.all["H_LastYear"].value = "";
                document.all["H_LastVerNo"].value = "";
                document.all["H_LastClsNo"].value = "";
                document.all["txClsNo"].value = "";
            }
        }
        else {
            document.all["lbClsName"].textContent = argResult.value.ClsName;
            document.all.txClsName.value = argResult.value.ClsName;
            document.all["txVerNo"].value = argResult.value.VerNo;
            document.all["H_ClsKey"].value = argResult.value.ClsKey;
            document.all["H_LastYear"].value = document.all["txFileYear"].value;
            document.all["H_LastVerNo"].value = document.all["txVerNo"].value;
            document.all["H_LastClsNo"].value = document.all["txClsNo"].value;
            
        }
    }
    else if (argResult.id == iCallID_YearVerNo)//
    {
        argResult
        if (!jf_IsWebServiceSuccess(argResult)) {
            //修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息
            var bAlert = true;
            if (argResult.value.m_strErrMsg.indexOf("輸入區間含有多個版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
            {
                //修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-e
                if (document.all["txVerNo"].value != "") {
                    var checkmsg = argResult.value.m_strErrMsg.split('版本')
                    for (var i = 0; i < checkmsg.length; i++) {
                        if (checkmsg[i].indexOf("啟用區間為") != -1) {
                            if (checkmsg[i].split('啟用區間為')[0] == document.all["txVerNo"].value) {
                                bAlert = false;
                                break;
                            }
                        }
                    }
                }
                if (bAlert) {
                    document.all["H_LastYear"].value = document.all["txFileYear"].value;
                    document.all["H_LastVerNo"].value = document.all["txVerNo"].value = "";
                    document.all["txVerNo"].focus();
                    alert(argResult.value.m_strErrMsg);
                }

            }
            else {
                document.all[CurrentObjId].value = "";
                document.all["H_LastYear"].value = "";
                document.all["H_LastVerNo"].value = "";
                //修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息
                alert(argResult.value.m_strErrMsg);
            }
        }
        else {
            if (CurrentObjId == "txFileYear")//年度號ONLBUR-帶回版本別一律設定
            {
                document.all["txVerNo"].value = argResult.value.strVerNo;
            }
            else//版本別onblur
            {
                var dt = new Date();
                var strSysYear = dt.getFullYear() - 1911;
                if (argResult.value.strEdate == "" || argResult.value.strEdate >= strSysYear)//啟用中-無停用日或是停用日大於等於系統日
                {
                    if (document.all["txFileYear"].value == "" || document.all["txFileYear"].value < argResult.value.strSdate)//年度為空或是輸入年度小於起日則跳出訊息後直接帶入
                    {
                        if (document.all["txFileYear"].value != "")//不為空再跳提醒
                            alert("該版本啟用中，系統將預設帶入系統年。");
                        document.all["txFileYear"].value = strSysYear;
                    }
                }
                else//停用版本
                {

                    //年度為空白或是輸入年度不合理(小於起日或是大於停止日)則跳出訊息預設代最大
                    if (document.all["txFileYear"].value == "" || document.all["txFileYear"].value < argResult.value.strSdate || document.all["txFileYear"].value > argResult.value.strEdate) {
                        if (document.all["txFileYear"].value != "")//不為空再跳提醒
                        {
                            if (argResult.value.strSdate != argResult.value.strEdate)
                                alert("該版本使用於：" + argResult.value.strSdate + "~" + argResult.value.strEdate + "年，系統將預設帶入最大年度。");
                            else
                                alert("該版本使用於：" + argResult.value.strSdate + "年，系統將預設帶入。");
                        }
                        document.all["txFileYear"].value = argResult.value.strEdate;
                    }
                }

            }
            document.all["H_LastYear"].value = document.all["txFileYear"].value;
            document.all["H_LastVerNo"].value = document.all["txVerNo"].value;
			
        }

    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId) {

    if (argCallerId == "EAM012C1") {
        if (document.all["lbReturnValue"].length > 0) {
            document.all.txFileYear.value = document.all.lbReturnValue.options[0].value;
            document.all.txClsNo.value = document.all.lbReturnValue.options[1].value;
       
            if (document.all.lbReturnValue.options[2].value.split('-').length == 3) {
                document.all.txCountryCode.value = document.all.lbReturnValue.options[2].value.split('-')[0];
                document.all.txOfficeCode.value = document.all.lbReturnValue.options[2].value.split('-')[1];
                document.all.txProductCode.value = document.all.lbReturnValue.options[2].value.split('-')[2];
            }
            else
                document.all.txProductCode.value = document.all.lbReturnValue.options[2].value;
            document.all.txVolNo.value = document.all.lbReturnValue.options[3].value;
            document.all.txVerNo.value = document.all.lbReturnValue.options[4].value;
            SetValueToFileCase();
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
    }
	else if (argCallerId == "EAI014") {
		if (document.all["lbReturnValue"].length > 0) {
			document.all.txCountryCode.value = document.all.lbReturnValue.options[0].value;
			
		}
	}
	else if (argCallerId == "EAI015") {
		if (document.all["lbReturnValue"].length > 0) {
			document.all.txProductCode.value = document.all.lbReturnValue.options[0].value;
		}
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
var CurrentObjId;
var IsCls = true;
var IsYear = true;
var IsVer = true;
function TbOnBlur(argTb) {

    CurrentObjId = argTb;
    if (argTb == "txClsNo") {
        ResetTag();
        if (IsCls) {
            GetClsName();
            IsVer = false;
            IsYear = false;
        }
        else
            IsCls = true;
    }
    else if (argTb == "txFileYear")//年度
    {
        jf_txFileYear_Onblur();

        ResetTag();
        jf_GetClassVer("Year");
        if (IsYear) {
            GetClsName();
            IsCls = false;
            IsVer = false;
        }
        else
            IsYear = true;
    }
    else if (argTb == "txVerNo")//版本
    {
        ResetTag();
        jf_GetClassVer("VerNo");
        if (IsVer) {
            GetClsName();
            IsCls = false;
            IsYear = false;
        }
        else
            IsVer = true;
    }
    //國別
    if (argTb == "txCountryCode") {
        if (document.all["txCountryCode"].value == "")
            return;
        else
            document.all["txCountryCode"].value = jf_PADR(document.all["txCountryCode"].value, 3, '0');
    }
    //處別
    if (argTb == "txOfficeCode") {
        if (document.all["txOfficeCode"].value == "")
            return;
        else
            document.all["txOfficeCode"].value = jf_PADL(document.all["txOfficeCode"].value, 3, '0');
    }
    //細目號/產品別
    if (argTb == "txProductCode") {
        if (document.all["txProductCode"].value == "")
            return;
        else
            document.all["txProductCode"].value = jf_PADR(document.all["txProductCode"].value, 3, '0');
    }
    if (argTb == "txVolNo") {
        if (jf_Trim(document.all["txVolNo"].value) == "")
            return;
        else
            document.all["txVolNo"].value = jf_PADL(jf_Trim(document.all["txVolNo"].value), 4, "0");
    }
    
}
function ResetTag() {
    if (document.activeElement.id == "txClsNo")
        return false;
    if (document.activeElement.id == "txFileYear")
        return false;
    if (document.activeElement.id == "txVerNo")
        return false;
    IsVer = true;
    IsCls = true;
    IsYear = true;
    return true;
}
function IsFireOnblur(argYear, argVerNo, argClsNo) {
    //若有一個不同則觸發
    if (argYear != document.all["H_LastYear"].value)
        return true;
    if (argVerNo != document.all["H_LastVerNo"].value)
        return true;
    if (argClsNo != document.all["H_LastClsNo"].value)
        return true;
    return false;
}
function jf_txFileYear_Onblur() {
    var txObj = jf_Trim(document.all["txFileYear"].value);
    if (txObj.length > 0 && txObj.length < 3) {
        document.all["txFileYear"].value = jf_PADL(txObj, 3, "0");
    }
}
function jf_GetClassVer(argCallFrom) {

    var strYear = document.all["txFileYear"].value;
    var strVerNo = document.all["txVerNo"].value;
    //是否觸發ws
    if (!IsFireOnblur(strYear, strVerNo))
        return;
    if ((strYear == "" && argCallFrom == "Year") || (strVerNo == "" && argCallFrom == "VerNo"))
        return;
    var param1 = new Array(3);
    param1[0] = strYear;
    param1[1] = strVerNo;
    param1[2] = argCallFrom;
    var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetVerYear", false, param1);
    iCallID_YearVerNo = callObj.id;
    OnWSResult(callObj);
}
function GetClsName() {
    var strYear = document.all["txFileYear"].value;
    var strVerNo = document.all["txVerNo"].value;
    var strClsNo = document.all["txClsNo"].value;
    if (strClsNo == "") {
        document.all["lbClsName"].textContent = "";
        document.all.txClsName.value = "";
        document.all["H_LastYear"].value = strYear;
        document.all["H_LastVerNo"].value = strVerNo;
        document.all["H_LastClsNo"].value = strClsNo;
        return;
    }
    //是否觸發ws
    if (!IsFireOnblur(strYear, strVerNo, strClsNo))
        return;

    var arWSParam = new Array(3);
    arWSParam[0] = document.all["tbOrgNo"].value;
    arWSParam[1] = document.all["txVerNo"].value;
    arWSParam[2] = document.all["txClsNo"].value;
    arWSParam[3] = "";
    callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, arWSParam);
    iCallID_Cls = callObj.id;
    OnWSResult(callObj);
}

function SetValueToFileCase() {
    document.all.txCaseNo.value = document.all.txCountryCode.value + "-" + document.all.txOfficeCode.value + "-" + document.all.txProductCode.value;
}
function SetFileCaseToTaitraValue(argFileCase) {
    if (argFileCase == "") {//傳入空白表示清空
        document.all.txCountryCode.value = "";
        document.all.txOfficeCode.value = "";
        document.all.txProductCode.value = "";
    }
    else {
        document.all.txCountryCode.value = document.all[argFileCase].value.split('-')[0];
        document.all.txOfficeCode.value = document.all[argFileCase].value.split('-')[1];
        document.all.txProductCode.value = document.all[argFileCase].value.split('-')[2];
    }
}