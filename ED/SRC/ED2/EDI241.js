/*
DATE		SA		PRG			MGR_NO		DESC
1020410		Kevin	Jagle		1020227		新增本作業
1020620		Kevin	Jagle		1020454		增加匯出EXCEL功能
1040326		David	Kenny		1040180		榮總開啟程式時直接帶入簽核單位及簽核者
1040330		David	Kenny		1040180		修正因未執行OnChange動作而造成查詢時取不到FROM_USER_ID問題
1040417		David	Kenny		1040253		(榮總)異動簽核單位後需同時執行一次SignUserOnChange()避免沒設定到隱藏欄位
1051111     David   Zen         1050087     二代公文修改
1051226     David   Zen         1050087     二代公文修改，修正線上瀏覽功能
1070830     Kevin   Justin      1070678     弱掃AJAX修改
1080820		Kevin	Joe			1080618		修改查詢檢核邏輯，因取消簽核者為必要欄位
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
//var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");

//1051111 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1070830 Justin [1070678]弱掃AJAX修改
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
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

    //1040326	Kenny	[1040180]	榮總開啟程式時直接帶入簽核單位，需使簽核單位下拉選單執行onChange Event使簽核者選單出來
    var strOrgNick = document.all.strOrgNick.value;
    if (strOrgNick == "TPVGH" || strOrgNick == "TVGH" || strOrgNick == "KVGH")
    {
        SignDeptOnChange();
        //1040330	Kenny	[1040180]	修正因未執行OnChange動作而造成查詢時取不到FROM_USER_ID問題
        SignUserOnChange();
    }
    if (document.all.H_dlSignUser.value != "")
    {
        //先清空dlSignUser物件
        fnClearDropDownList(document.all.dlSignUser);
        var strdlSignUserValue = document.all.H_dlSignUser.value.split('|');
        for (var i = 0; i < strdlSignUserValue.length; i++)
        {
            document.all.dlSignUser.options.add(new Option(strdlSignUserValue[i].split(';')[0], strdlSignUserValue[i].split(';')[1]));
            if (document.all.H_SignUser.value == strdlSignUserValue[i].split(';')[1])
                document.all.dlSignUser.selectedIndex = i;
        }
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051111 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051111 Zen 1050087 二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = d.target.id;

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
        //1051111 Zen 1050087 二代公文修改
        //case "btTxDateS":
        //	Page_BlockSubmit=true; 
        //	jf_CallCalendar(document.all["txTxDateS"], event.screenX, event.screenY);
        //	break;
        //case "btTxDateE":
        //	Page_BlockSubmit=true; 
        //	jf_CallCalendar(document.all["txTxDateE"], event.screenX, event.screenY);
        //	break;
        //case "btAppDateS":
        //	Page_BlockSubmit=true; 
        //	jf_CallCalendar(document.all["txAppDateS"], event.screenX, event.screenY);
        //	break;
        //case "btAppDateE":
        //	Page_BlockSubmit=true; 
        //	jf_CallCalendar(document.all["txAppDateE"], event.screenX, event.screenY);
        //	break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051111 Zen 1050087 二代公文修改
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

    //1051111 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        //1020620	Jagle	[1020454]	增加匯出EXCEL功能
        case "btExcel":
        case "btSearch":
            Page_BlockSubmit = !CheckBeforeSearch();
            //1051111 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = false;
            if (jf_ConfirmClean(true))
            {
                document.all.rbAll.checked = true;
                SignDeptOnChange();
                //1051111 Zen 1050087 二代公文修改
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            /*document.all.txAppDateE.value = document.all.SsoArtifact.value;
			jf_ToolBarSubmit();*/
            break;
    }
}

function CheckBeforeSearch()
{
    var obj = document.all;
    var ErrMsg = "";

    //必要條件檢核
    //1040326	Kenny	[1040180]	調整檢核條件
    //if(obj.dlSignDept.selectedIndex == 0)
    //	ErrMsg += "簽核單位不可為空白\n";
    //if(obj.dlSignUser.selectedIndex == 0)
    //	ErrMsg += "簽核者不可為空白\n";
    if (obj.dlSignDept.value == "")
        ErrMsg += "簽核單位不可為空白\n";
	//1080820	Joe	1080618		修改查詢前檢核條件--S
	// if(obj.dlSignUser.value == "")
		// ErrMsg += "簽核者不可為空白\n";
	if(obj.dlSignUser.value == "" && obj.txTxDateS.value == "" && obj.txTxDateE.value == "" && obj.txDocNoS.value == "" && obj.txDocNoE.value == "")
		ErrMsg += "公文文號、簽核者、傳送時間須至少輸入一條件\n";
	//1080820	Joe	1080618		修改查詢前檢核條件--E
		

    if (ErrMsg != "")
    {
        alert(ErrMsg);
        return false;
    }

    //日期及時間檢核
    if (!DateCheck("txTxDateS", "傳送日期(起)") || !DateCheck("txTxDateE", "傳送日期(迄)") || !DateCheck("txAppDateS", "核決日期(起)") || !DateCheck("txAppDateE", "核決日期(迄)") || !TimeCheck("txTxTimeS", "傳送時間(起)") || !TimeCheck("txTxTimeE", "傳送時間(迄)"))
        return false;

    //文號調整
    var DocNoS = jf_Trim(obj.txDocNoS.value);
    var DocNoE = jf_Trim(obj.txDocNoE.value);
    if (DocNoS != "" && DocNoE != "")
    {
        if (DocNoS > DocNoE)
        {
            obj.txDocNoS.value = DocNoE;
            obj.txDocNoE.value = DocNoS;
        }
    }
    else
    {
        if (DocNoS == "")
            obj.txDocNoS.value = DocNoE;
        if (DocNoE == "")
            obj.txDocNoE.value = DocNoS;
    }

    //傳送時間調整
    var TxDateS = jf_Trim(obj.txTxDateS.value);
    var TxDateE = jf_Trim(obj.txTxDateE.value);
    var TxTimeS = jf_Trim(obj.txTxTimeS.value);
    var TxTimeE = jf_Trim(obj.txTxTimeE.value);
    //有輸入時間則日期不可為空
    if ((TxTimeS != "" && TxDateS == "") || (TxTimeE != "" && TxDateE == ""))
    {
        alert("傳送時間有值時，傳送日期不可為空");
        return false;
    }
    if (TxDateS != "" && TxDateE != "")
    {
        if (TxDateS > TxDateE)
        {
            obj.txTxDateS.value = TxDateE;
            obj.txTxDateE.value = TxDateS;

            if (TxTimeS != "" && TxTimeS != "")
            {
                obj.txTxTimeS.value = TxTimeE;
                obj.txTxTimeE.value = TxTimeS;
            }
            else
            {
                if (TxTimeS == "")
                    obj.txTxTimeE.value = "2400";
                else
                    obj.txTxTimeE.value = TxTimeS;

                if (TxTimeE == "")
                    obj.txTxTimeS.value = "0001";
                else
                    obj.txTxTimeS.value = TxTimeE;
            }
        }
    }
    else
    {
        if (TxDateS == "")
            obj.txTxDateS.value = TxDateE;
        if (TxDateE == "")
            obj.txTxDateE.value = TxDateS;

        if (obj.txTxDateS.value != "" && TxTimeS == "")
            obj.txTxTimeS.value = "0001";
        if (obj.txTxDateE.value != "" && TxTimeE == "")
            obj.txTxTimeE.value = "2400";
    }

    //核決日期調整
    var AppDateS = jf_Trim(obj.txAppDateS.value);
    var AppDateE = jf_Trim(obj.txAppDateE.value);
    if (AppDateS != "" && AppDateE != "")
    {
        if (AppDateS > AppDateE)
        {
            obj.txAppDateS.value = AppDateE;
            obj.txAppDateE.value = AppDateS;
        }
    }
    else
    {
        if (AppDateS == "")
            obj.txAppDateS.value = AppDateE;
        if (AppDateE == "")
            obj.txAppDateE.value = AppDateS;
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
//簽核單位下拉選單變動時相關處理
function SignDeptOnChange()
{
    var dlSignUser = document.all["dlSignUser"];

    //紀錄使用者選擇的選項VALUE值
    var strSignDeptNo = document.all["dlSignDept"].options[document.all["dlSignDept"].selectedIndex].value;

    //排除index = 0("空白")的情況
    if (document.all["dlSignDept"].selectedIndex > 0)
    {
        //將選擇的單位代碼紀錄至隱藏欄位
        document.all.H_SignDeptNo.value = strSignDeptNo;

        //1070830 Justin [1070678]弱掃AJAX修改
        //var alSignUser = EDI241.GetSignUser(document.all["SsoArtifact"].value, strSignDeptNo).value;
        var alSignUser = ED2.EDI241.GetSignUser(document.all["SsoArtifact"].value, strSignDeptNo).value;

        if (alSignUser.length > 0)
        {
            //先清空dlSignUser物件
            fnClearDropDownList(dlSignUser);
            //1040326	Kenny	[1040180]	當榮總使用時，直接指定簽核者為第一個選項，故第一個選項不給空白值；一般機關則維持原邏輯
            //dlSignUser.options.add(new Option("",""));
            var strOrgNick = document.all.strOrgNick.value;
            if (strOrgNick != "TPVGH" && strOrgNick != "TVGH" && strOrgNick != "KVGH")
                dlSignUser.options.add(new Option("", ""));

            for (var j = 0; j < alSignUser.length; j++)
            {
                var strUser = alSignUser[j];
                //將name和value分別存入dlUser中
                dlSignUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
            }

            //將下拉選單的值紀錄到隱藏欄位
            document.all.H_dlSignUser.value = odjf_SaveCurrDL(dlSignUser);

            //1040417	Kenny	[1040253]	(榮總)異動簽核單位後需同時執行一次SignUserOnChange()避免沒設定到隱藏欄位
            SignUserOnChange();
        }
    }
    else
    {
        //選擇空白時，簽核者下拉選單僅塞入一項空白
        fnClearDropDownList(dlSignUser);
        dlSignUser.options.add(new Option("", ""));
        document.all.H_SignUser.value = "";
        document.all.H_dlSignUser.value = "";
    }
}

//簽核者下拉選單變動時相關處理
function SignUserOnChange()
{
    //紀錄使用者選擇的選項VALUE值
    document.all.H_SignUser.value = document.all["dlSignUser"].options[document.all["dlSignUser"].selectedIndex].value;
    document.all.H_SignName.value = document.all["dlSignUser"].options[document.all["dlSignUser"].selectedIndex].text;
}

//將下拉選單裡的options轉成字串相加再回傳，格式： [項目Text;項目Value|項目Text;項目Value|...]
function odjf_SaveCurrDL(argSource)
{
    var strTemp = "";
    for (var i = 0 ; i < argSource.options.length ; i++)
        strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";

    return strTemp.substr(0, strTemp.length - 1);
}

//清空DropDownList
function fnClearDropDownList(obj)
{
    //當list長度大於0的時候，從第一個刪，刪到沒有為止
    while (obj.options.length > 0)
        obj.options.remove(0);
}

//檢核日期格式
var bDateCheck = false;
function DateCheck(argObj, strMsg)
{
    if (bDateCheck)
    {
        bDateCheck = false;
        return;
    }
    bDateCheck = true;
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
            //1051111 Zen 1050087 二document.all[]代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
            if (strMsg)
                jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bDateCheck = false;
            return false;
        }
    }
    bDateCheck = false;
    return true;
}

//檢核時間格式
var bTimeCheck = false;
function TimeCheck(argObj, strMsg)
{
    if (bTimeCheck)
    {
        bTimeCheck = false;
        return;
    }
    bTimeCheck = true;
    var strTime = document.all[argObj].value;
    if (strTime != "")
    {
        if (strTime.length < 4)
        {
            strTime = jf_PADR(strTime, 0, '0');
            document.all[argObj].value = strTime;
        }
        var strH = strTime.substr(0, 2);
        var strM = strTime.substr(2, 2);
        if ((strH == "24" && strM != "00") || ((strH != "24" && strH > 23) || strM > 59))
        {
            //1051111 Zen 1050087 二document.all[]代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
            if (strMsg)
                jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bTimeCheck = false;
            return false;
        }
    }
    bTimeCheck = false;
    return true;
}

//線上瀏覽
//1051226 David Zen 1050087 二代公文修改，修正線上瀏覽功能
//function DownLoadUNI(argDocNo, argFromSubject, argFileCls)
function DownLoadUNI(argArt, argDocNo, argOrgNo)
{
    //1051226 David Zen 1050087 二代公文修改，修正線上瀏覽功能--begin
    //var strUniview = EDI241.DownLoadUNI(document.all.H_SessionString.value, document.all.SsoArtifact.value, document.all.SessionID.value, argDocNo, argFromSubject, argFileCls).value;
    //if (strUniview.indexOf("公文調閱失敗") == -1)
    //    window.open(strUniview, "UnView", "left=0,top=0,height=" + (screen.height - 80) + ",width=" + (screen.width - 10) + ",menubar=yes,titlebar=no,toolbar=no,resizeable=yes");
    //else
    //    alert(strUniview);
    var artifact = argArt;
    var strDocNo = argDocNo;
    var strOrgNo = argOrgNo;

    try
    {
        var wsUrl = opener.theWebServices.url('fileiows');
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
    }
    catch (e)
    {
        alert('開啟失敗');
    }
    //1051226 David Zen 1050087 二代公文修改，修正線上瀏覽功能--end
}