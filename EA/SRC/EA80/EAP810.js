/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	    概要
 * -------------------------------------------------------------------------------------------------
 * 96.10.18		Cola	000982	    提供支援輸入編號起迄
 * 98.09.22     Jane    0980455     WebFileIo元件多傳入權杖進入以進行身分檢核
 * 1001109		Ken		1000863     修改XML附註項第二碼有"_"底線分隔
 * 100.08.29	Leslie	--		    [檔管驗證]增加下載ZIP檔
 * 101.01.07	Cloud	--		    修正無資料時，不產出ZIP檔
 * 102.04.26	Jagle	1020183	    新增"轉出歷程"功能，並增加一"轉出記錄查詢"按鈕，開啟AKP310C1
 *								    修正前單1000863未MERGE好的部份
 * 103.10.28	Kenny	1030836	    配合SSL修改傳入元件之URL
 * 104.04.21	Cloud	1040211	    配合104法規修改，增加新選項
 * 104.06.17	Gabby	1040324	    增加WebFileIO錯誤訊息處理
 * 106.11.17	Kevin_C	1050087	    修正小日曆
 * 1071116      Zen     1050087     批號欄位修改為可輸入英文
 * 1100115      Zen     1090605     (國教院)新增年度條件以匯出整年度之檔案目錄
 * 1100204      Zen     1090927     取消使用document.activeElement
 * 1110103      Zen     1101292     修正多次點擊重複PostBack之問題
 * 1110817      Zen     1110419     新增檔案產生日期查詢條件
 * 1110930      Zen     1110419     新增檢核文件產生日期區間不可超過12個月
 * 1111014      Zen     1111065     修正重複以批號產出檔案目錄時結果錯誤之問題
 * 1111214      Cloud   1110860     支援銓敘部個人檔目錄彙送
 * 1120824      Zen     彙整表序171 修正無法以案卷格式產出95年前銷毀、移轉交目錄之問題
 * 1140114      Zen     驗證序19    修正無法以附錄5(104年)格式產出095年前檔案目錄之問題
 * 1140627      Zen     1140307     修正切換檔案目錄單位後產出之目錄格式與畫面選項不符之問題
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
var whoCallMe;

//1060712	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

document.all.rbType1.onclick = jf_chText;
document.all.rbType2.onclick = jf_chText;
document.all.rbType3.onclick = jf_chText;
document.all.rbType4.onclick = jf_chText;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060712	Kevin_C	1050087	升二代
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //1060712	Kevin_C	1050087	升二代
    // if (jf_Trim(document.all.XmlFileName.value) != "")
    // {
    // DownloadFile();
    // }
    //[000982]Add by Cola clienonload時即依照目前check之radiobutton顯示相關連動

    //1111014 Zen 1111065 修正重複以批號產出檔案目錄時結果錯誤之問題
    jf_chText();
    //1111214   Cloud 1110860 支援個人檔一併補上，整併畫面為選項及選單
    SendTypeOnClick();
    FileTypeOnClick();

    if (document.all["rbType1"].checked)
    {
        document.all.txStatus.value = "異動日期：";
        //1061117	Kevin_C	1050087	修正小日曆
        //document.all.btBaseDateFrom.className = "";
        //document.all.btBaseDateTo.className = "";	
        $(".ui-datepicker-trigger").css('display', '');
        document.all.btKeyHelpFrom.className = "hide";
        document.all.btKeyHelpTo.className = "hide";

        //[000982]Cola 按下相關radiobutton產生之連動
        document.all.tr_tplan.className = "hide";

        //1100115 Zen 1090605 (國教院)新增年度條件以匯出整年度之檔案目錄
        document.all['divFileYear'].className = 'dTR';
        //1110817 Zen 1110419 新增檔案產生日期查詢條件
        document.all['divCrtDate'].className = 'dTR';
        txFileYear_onblur(false);
        //1111214   Cloud 1110860 一併補上，畫面初始未卡95年前才能使用案件三
        cbBefore95_onclick();
    }
    else if (document.all["rbType2"].checked)
    {
        document.all.txStatus.value = "移轉清理批號：";
        //1061117	Kevin_C	1050087	修正小日曆
        //document.all.btBaseDateFrom.className = "hide";
        //document.all.btBaseDateTo.className = "hide";
        $(".ui-datepicker-trigger").css('display', 'none');
        document.all.btKeyHelpFrom.className = "";
        document.all.btKeyHelpTo.className = "";

        //[000982]Cola 按下相關radiobutton產生之連動
        document.all.lbTPLAN_NO.value = "移轉計畫編號：";
        document.all.btTRANS.className = "";
        document.all.btTRANE.className = "";
        document.all.btDES.className = "hide";
        document.all.btDEE.className = "hide";
        document.all.tr_tplan.className = "";

        //1100115 Zen 1090605 (國教院)新增年度條件以匯出整年度之檔案目錄
        document.all['divFileYear'].className = 'hide';
        //1110817 Zen 1110419 新增檔案產生日期查詢條件
        document.all['divCrtDate'].className = 'hide';
        cbBefore95_onclick();
    }
    else if (document.all["rbType3"].checked)
    {
        document.all.txStatus.value = "移交清理批號：";
        //1061117	Kevin_C	1050087	修正小日曆
        //document.all.btBaseDateFrom.className = "hide";
        //document.all.btBaseDateTo.className = "hide";	
        $(".ui-datepicker-trigger").css('display', 'none');
        document.all.btKeyHelpFrom.className = "";
        document.all.btKeyHelpTo.className = "";

        //[000982]Cola 按下相關radiobutton產生之連動
        document.all.lbTPLAN_NO.value = "移交計畫編號：";
        document.all.btTRANS.className = "";
        document.all.btTRANE.className = "";
        document.all.btDES.className = "hide";
        document.all.btDEE.className = "hide";
        document.all.tr_tplan.className = "";

        //1100115 Zen 1090605 (國教院)新增年度條件以匯出整年度之檔案目錄
        document.all['divFileYear'].className = 'hide';
        //1110817 Zen 1110419 新增檔案產生日期查詢條件
        document.all['divCrtDate'].className = 'hide';
        cbBefore95_onclick();
    }
    else if (document.all["rbType4"].checked)
    {
        document.all.txStatus.value = "銷毀清理批號：";
        //1061117	Kevin_C	1050087	修正小日曆
        //document.all.btBaseDateFrom.className = "hide";
        //document.all.btBaseDateTo.className = "hide";	
        $(".ui-datepicker-trigger").css('display', 'none');
        document.all.btKeyHelpFrom.className = "";
        document.all.btKeyHelpTo.className = "";

        //[000982]Cola 按下相關radiobutton產生之連動
        document.all.lbTPLAN_NO.value = "銷毀計畫編號：";
        document.all.btTRANS.className = "hide";
        document.all.btTRANE.className = "hide";
        document.all.btDES.className = "";
        document.all.btDEE.className = "";
        document.all.tr_tplan.className = "";

        //1100115 Zen 1090605 (國教院)新增年度條件以匯出整年度之檔案目錄
        document.all['divFileYear'].className = 'hide';
        //1110817 Zen 1110419 新增檔案產生日期查詢條件
        document.all['divCrtDate'].className = 'hide';
        cbBefore95_onclick();
    }
    ClsCaseCheck();//[0970690]Add by Cola 判斷是否enabled分類表及案名表checkbox
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
        //1060712	Kevin_C	1050087	升二代 -S
        // case "btBurrow":
        // Page_BlockSubmit=true;
        // if(document.all["BF"].ShowDialog(0) !=0 )
        // {
        // document.all["txFilePath"].value = document.all["BF"].Path;			
        // }	
        // break;
        //1060712	Kevin_C	1050087	升二代 -E
        //1061117	Kevin_C	1050087	修正小日曆 -S
        //case "btBaseDateFrom":
        //	Page_BlockSubmit = true;
        //	jf_CallCalendar(document.all.txFrom, event.screenX, event.screenY);
        //	break;
        //case "btBaseDateTo":
        //	Page_BlockSubmit = true;
        //	jf_CallCalendar(document.all.txTo, event.screenX, event.screenY);
        //	break;
        //1061117	Kevin_C	1050087	修正小日曆 -E
        case "btKeyHelpFrom": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            whoCallMe = "btKeyHelpFrom";
            pUrl = "../EA40/EAT400C1.aspx";
            jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
            break;
        case "btKeyHelpTo": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            whoCallMe = "btKeyHelpTo";
            pUrl = "../EA40/EAT400C1.aspx";
            jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
            break;

        //[000982]Cola 提供編號輸入起迄及帶出查詢視窗 -- start --

        case "btTRANS":
            Page_BlockSubmit = true;
            var pUrl = "";
            whoCallMe = "btTRANS";
            pUrl = "../EA60/EAT602C1.aspx";
            jf_OpenChildWin(pUrl, "EAT602C1", 750, 500);
            break;
        case "btTRANE":
            Page_BlockSubmit = true;
            var pUrl = "";
            whoCallMe = "btTRANE";
            pUrl = "../EA60/EAT602C1.aspx";
            jf_OpenChildWin(pUrl, "EAT602C1", 750, 500);
            break;
        case "btDES":
            Page_BlockSubmit = true;
            var pUrl = "";
            whoCallMe = "btDES";
            pUrl = "../EA50/EAT501C1.aspx";
            jf_OpenChildWin(pUrl, "EAT501C1", 750, 500);
            break;
        case "btDEE":
            Page_BlockSubmit = true;
            var pUrl = "";
            whoCallMe = "btDEE";
            pUrl = "../EA50/EAT501C1.aspx";
            jf_OpenChildWin(pUrl, "EAT501C1", 750, 500);
            break;
        //Cola -- end --

    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060712	Kevin_C	1050087	升二代
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

    //1060712	Kevin_C	1050087	升二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = true;
            //轉出前檢查分割檔案目錄打小是否介於100~3000
            if (document.all.txFileMaxCnt.value != "")
            {
                if (parseInt(document.all.txFileMaxCnt.value) < 100)
                {
                    alert("檔案分割筆數不得小於100筆");
                    return;
                }
                else if (parseInt(document.all.txFileMaxCnt.value) > 3000)
                {
                    alert("檔案分割筆數不得大於3000筆");
                    return;
                }
            }
            else
            {
                alert("必須輸入檔案分割筆數等資訊");
                return;
            }

            //檢核輸入範圍
            if (document.all.rbType1.checked)
            {
                //1071116 Zen 1050087 批號欄位修改為可輸入英文
                SetUpdateDate();

                //1001109	Ken		1000863 檢核
                /*if (!jf_CheckCDATE(document.all.txFrom.value))
                {					
                    alert("(起始)日期格式輸入錯誤");					
                    document.all.txFrom.focus();
                    return;
                }
                if (!jf_CheckCDATE(document.all.txTo.value))
                {					
                    alert("(迄)日期格式輸入錯誤");					
                    document.all.txTo.focus();
                    return;
                }*/
                if (!plan_onblur1())
                    return;
                if (!plan_onblur3())
                    return;
                //Ken End				

                if (document.all.txFrom.value > document.all.txTo.value)
                {
                    //1001109	Ken		1000863 交換
                    //alert("輸入日期起必須小於迄")
                    //1060712	Kevin_C	1050087	升二代
                    ////document.all.txTo.focus();
                    $('txTo').focus();
                    //return;
                    //1020426	Jagle	修正前單1000863未MERGE好的部份
                    var Fr = document.all.txFrom.value;
                    document.all.txFrom.value = document.all.txTo.value;
                    document.all.txTo.value = Fr;
                    //Ken End					
                }

                //1100115 Zen 1090605 (國教院)新增年度條件以匯出整年度之檔案目錄
                //if (!txFileYear_onblur(true))
                if (!txFileYear_onblur(true) || !txCrtDate_onblur(true))
                {
                    return;
                }
            }
            else
            {
                //[000982]Modify by Cola 修正檢核方式 -- start --
                if ((document.all.txFrom.value == "" && document.all.txTo.value == "") && (document.all.txFromT.value == "" && document.all.txToT.value == ""))
                {
                    alert("批號與編號必須擇一輸入，請選擇一輸入區間輸入。");
                    //1060712	Kevin_C	1050087	升二代
                    //document.all.txFrom.focus();
                    $('txFrom').focus();
                    return;
                }


                if ((document.all.txFrom.value != "" || document.all.txTo.value != "") && (document.all.txFromT.value != "" || document.all.txToT.value != ""))
                {
                    alert("批號與編號不可同時輸入，請擇一輸入區間輸入。");
                    //1060712	Kevin_C	1050087	升二代
                    //document.all.txFrom.focus();
                    $('txFrom').focus();
                    return;
                }
                if (document.all.txFrom.value != "" || document.all.txTo.value != "")
                {
                    if (document.all.txFrom.value.length != 8)
                    {
                        alert("(起)清理計畫長度必須為8碼");
                        //1060712	Kevin_C	1050087	升二代
                        //document.all.txFrom.focus();
                        $('txFrom').focus();
                        return;
                    }
                    if (document.all.txTo.value.length != 8)
                    {
                        alert("(迄)清理計畫長度必須為8碼");
                        //1060712	Kevin_C	1050087	升二代
                        //document.all.txTo.focus();
                        $('txTo').focus();
                        return;
                    }
                    if (document.all.txFrom.value > document.all.txTo.value)
                    {
                        alert("清理批號起必須小於迄")
                        //1060712	Kevin_C	1050087	升二代
                        //document.all.txTo.focus();
                        $('txTo').focus();
                        return;
                    }
                }
                else if (document.all.txFromT.value != "" || document.all.txToT.value != "")
                {
                    if (document.all.txFromT.value.length != 8)
                    {
                        alert("(起)計畫編號長度必須為8碼");
                        //1060712	Kevin_C	1050087	升二代
                        //document.all.txFromT.focus();
                        $('txFromT').focus();
                        return;
                    }
                    if (document.all.txToT.value.length != 8)
                    {
                        alert("(迄)計畫編號長度必須為8碼");
                        //1060712	Kevin_C	1050087	升二代
                        //document.all.txToT.focus();
                        $('txToT').focus();
                        return;
                    }
                    if (document.all.txFromT.value > document.all.txToT.value)
                    {
                        alert("計畫編號起必須小於迄")
                        //1060712	Kevin_C	1050087	升二代
                        //document.all.txToT.focus();
                        $('txToT').focus();
                        return;
                    }
                }
                //Cola -- end --
            }
            //1111214 Cloud 11100860 修改支援銓敘個人檔及整併畫面
            if (document.all["rbVolType"].checked)//案卷記錄案卷選項
            { document.all.txSendType.value = document.all["dlSedVolType"].options[document.all["dlSedVolType"].selectedIndex].value; }
            else
            {
                document.all.txSendType.value = document.all["dlSedSeqType"].options[document.all["dlSedSeqType"].selectedIndex].value;
            }

            Page_BlockSubmit = false;
            //1060712	Kevin_C	1050087	升二代
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
            //1060712	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();	
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060712	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060712	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1060712	Kevin_C	1050087	升二代
            //document.all["txKeyFld"].focus();
            $('txKeyFld').focus();
            break;
        case "btSearch":
            //1020426	Jagle	[1020183]	增加查詢子視窗
            var strUrl = "";
            var strArtifact = document.all.SsoArtifact.value;
            strUrl = "../../../AK/AKP310C1.aspx?rtnObj=lbReturnValue&SAMLart=" + strArtifact;
            jf_OpenChildWin(strUrl, "EAP810", 700, 500);
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1060712	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060712	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
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

    if (document.all["txKeyFld"].value == "")
    {
        strErrMsg += "鍵值欄位不可空白\n";
        //1060712	Kevin_C	1050087	升二代
        //document.all["txKeyFld"].focus();
        $('txKeyFld').focus();
    }

    if (document.all["txRequireFld"].value == "")
    {
        strErrMsg += "必要欄位不可空白\n";
        //1060712	Kevin_C	1050087	升二代
        //document.all["txRequireFld"].focus();
        $('txRequireFld').focus();
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
    if (argCallerId == "EAT400C1")
    {
        if (whoCallMe == "btKeyHelpFrom")
        {
            document.all["txFrom"].value = document.all["lbReturnValue"].options[0].value;
            //1060712	Kevin_C	1050087	升二代
            //document.all["txFrom"].focus();
            $('txFrom').focus();
        }
        if (whoCallMe == "btKeyHelpTo")
        {
            document.all["txTo"].value = document.all["lbReturnValue"].options[0].value;
            //1060712	Kevin_C	1050087	升二代
            //document.all["txTo"].focus();
            $('txTo').focus();
        }
    }

    //[000982]Cola 新增子視窗傳回母視窗 -- start --
    if (argCallerId == "EAT501C1")
    {
        if (whoCallMe == "btDES")
        {
            document.all["txFromT"].value = document.all["lbReturnValue"].options[0].value;
            //1060712	Kevin_C	1050087	升二代
            //document.all["txFromT"].focus();
            $('txFromT').focus();
        }
        if (whoCallMe == "btDEE")
        {
            document.all["txToT"].value = document.all["lbReturnValue"].options[0].value;
            //1060712	Kevin_C	1050087	升二代
            //document.all["txToT"].focus();
            $('txToT').focus();
        }
    }
    if (argCallerId == "EAT602C1")
    {
        if (whoCallMe == "btTRANS")
        {
            document.all["txFromT"].value = document.all["lbReturnValue"].options[0].value;
            //1060712	Kevin_C	1050087	升二代
            //document.all["txFromT"].focus();
            $('txFromT').focus();
        }
        if (whoCallMe == "btTRANE")
        {
            document.all["txToT"].value = document.all["lbReturnValue"].options[0].value;
            //1060712	Kevin_C	1050087	升二代
            //document.all["txToT"].focus();
            $('txToT').focus();
        }
    }
    //Cola -- end --

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1071116 Zen 1050087 已無用註解
//function DownloadFile()
//{
//    //下載檔案至Client端
//    //上傳檔案至server
//    var strClientPath = document.all.txFilePath.value;
//    var fileNameList = new Array();
//    fileNameList = document.all["XmlFileName"].value.split("|");
//    var showFilePath;

//    //0980922 取得權杖,並於呼叫webfileio元件時傳入[0980455]-Jane
//    var strArtifact = document.all.SsoArtifact.value;
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

//        for (i = 0; i < fileNameList.length - 1; i++)
//            soap.AddFile(document.all["AP_WORK_PATH"].value, fileNameList[i]);

//        //1000829	Leslie	增加下載ZIP檔
//        if (fileNameList.length == 1)
//            soap.AddFile(document.all["AP_WORK_PATH"].value, fileNameList[0]);

//        var fso = new ActiveXObject("Scripting.FileSystemObject");

//        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
//        //try
//        //{
//        //0980922 多傳入權杖,以便檢核使用者身份[0980455]-Jane
//        //soap.Download(jf_GetSessionID(), true , strClientPath);
//        soap.Download(strArtifact, true, strClientPath);
//        //[0970690]Modify by Cola 列出詳細XML
//        // 101.01.07	Cloud	--		修正無資料時，不產出ZIP檔
//        //alert("匯出XML檔案路徑為"+strClientPath+"\\\n\n"+document.all["XmlFileDetail"].value.replace(/、/gi,"\n"));	
//        if (document.all.HaveDate)
//        {
//            if (document.all.HaveDate.value == "Y")
//                alert("匯出XML檔案路徑為" + strClientPath + "\\\n\n" + document.all["XmlFileDetail"].value.replace(/、/gi, "\n"));
//        }
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

function jf_chText()
{
    //1071116 Zen 1050087 批號欄位修改為可輸入英文
    document.all['txDateOnlyS'].className = 'DatePicker hide';
    document.all['txDateOnlyE'].className = 'DatePicker hide';
    document.all['txFrom'].className = '';
    document.all['txTo'].className = '';

    if (document.all['rbType1'].checked)
    {
        document.all.txStatus.value = "異動日期：";
        //1061117	Kevin_C	1050087	修正小日曆
        //document.all.btBaseDateFrom.className = "";
        //document.all.btBaseDateTo.className = "";	
        $(".ui-datepicker-trigger").css('display', '');
        document.all.btKeyHelpFrom.className = "hide";
        document.all.btKeyHelpTo.className = "hide";

        //[000982]Cola 按下相關radiobutton產生之連動
        document.all.tr_tplan.className = "hide";

        //1071116 Zen 1050087 批號欄位修改為可輸入英文
        document.all['txDateOnlyS'].className = 'DatePicker';
        document.all['txDateOnlyE'].className = 'DatePicker';
        document.all['txFrom'].className = 'hide';
        document.all['txTo'].className = 'hide';

        //1100115 Zen 1090605 (國教院)新增年度條件以匯出整年度之檔案目錄
        document.all['divFileYear'].className = 'dTR';
        //1110817 Zen 1110419 新增檔案產生日期查詢條件
        document.all['divCrtDate'].className = 'dTR';
        txFileYear_onblur(false);

        //1120824 Zen 彙整表序171 修正無法以案卷格式產出95年前銷毀、移轉交目錄之問題
        cbBefore95_onclick();
    }
    if (document.all['rbType2'].checked)
    {
        document.all.txStatus.value = "移轉清理批號：";
        //1061117	Kevin_C	1050087	修正小日曆
        //document.all.btBaseDateFrom.className = "hide";
        //document.all.btBaseDateTo.className = "hide";
        $(".ui-datepicker-trigger").css('display', 'none');
        document.all.btKeyHelpFrom.className = "";
        document.all.btKeyHelpTo.className = "";

        //[000982]Cola 按下相關radiobutton產生之連動
        document.all.lbTPLAN_NO.value = "移轉計畫編號：";
        document.all.btTRANS.className = "";
        document.all.btTRANE.className = "";
        document.all.btDES.className = "hide";
        document.all.btDEE.className = "hide";
        document.all.tr_tplan.className = "";

        //1100115 Zen 1090605 (國教院)新增年度條件以匯出整年度之檔案目錄
        document.all['divFileYear'].className = 'hide';
        //1110817 Zen 1110419 新增檔案產生日期查詢條件
        document.all['divCrtDate'].className = 'hide';
        cbBefore95_onclick();
    }
    if (document.all['rbType3'].checked)
    {
        document.all.txStatus.value = "移交清理批號：";
        //1061117	Kevin_C	1050087	修正小日曆
        //document.all.btBaseDateFrom.className = "hide";
        //document.all.btBaseDateTo.className = "hide";	
        $(".ui-datepicker-trigger").css('display', 'none');
        document.all.btKeyHelpFrom.className = "";
        document.all.btKeyHelpTo.className = "";

        //[000982]Cola 按下相關radiobutton產生之連動
        document.all.lbTPLAN_NO.value = "移交計畫編號：";
        document.all.btTRANS.className = "";
        document.all.btTRANE.className = "";
        document.all.btDES.className = "hide";
        document.all.btDEE.className = "hide";
        document.all.tr_tplan.className = "";

        //1100115 Zen 1090605 (國教院)新增年度條件以匯出整年度之檔案目錄
        document.all['divFileYear'].className = 'hide';
        //1110817 Zen 1110419 新增檔案產生日期查詢條件
        document.all['divCrtDate'].className = 'hide';
        cbBefore95_onclick();
    }
    if (document.all['rbType4'].checked)
    {
        document.all.txStatus.value = "銷毀清理批號：";
        //1061117	Kevin_C	1050087	修正小日曆
        //document.all.btBaseDateFrom.className = "hide";
        //document.all.btBaseDateTo.className = "hide";	
        $(".ui-datepicker-trigger").css('display', 'none');
        document.all.btKeyHelpFrom.className = "";
        document.all.btKeyHelpTo.className = "";

        //[000982]Cola 按下相關radiobutton產生之連動
        document.all.lbTPLAN_NO.value = "銷毀計畫編號：";
        document.all.btTRANS.className = "hide";
        document.all.btTRANE.className = "hide";
        document.all.btDES.className = "";
        document.all.btDEE.className = "";
        document.all.tr_tplan.className = "";

        //1100115 Zen 1090605 (國教院)新增年度條件以匯出整年度之檔案目錄
        document.all['divFileYear'].className = 'hide';
        //1110817 Zen 1110419 新增檔案產生日期查詢條件
        document.all['divCrtDate'].className = 'hide';
        cbBefore95_onclick();
    }
    ClsCaseCheck();

}


function plan_onblur1()
{
    if (document.all["txFrom"].value == "")
        //1001109	Ken		1000863 檢核
        //return;
        return true;

    //1001109	Ken		1000863 檢核
    if (cnt == 1)
    {
        cnt = 0;
        return false;
    }
    if (document.all.rbType1.checked)
    {
        var Fr = document.all.txFrom.value;
        if (Fr != "")
        {
            if (Fr.length < 7)
            {
                Fr = jf_PADL(Fr, 7, '0');
                document.all.txFrom.value = Fr;
            }
        }
        if (!jf_CheckCDATE(document.all.txFrom.value))
        {
            document.all.txFrom.value = "";
            cnt = 1;
            alert("(起始)日期格式輸入錯誤");
            //1060712	Kevin_C	1050087	升二代
            //document.all.txFrom.focus();
            $('txFrom').focus();
            cnt = 0;
            return false;
        }
    }
    //Ken End
    if (document.all["txTo"].value != "")
        //1001109	Ken		1000863 檢核
        //return;
        return true;
    else
        document.all["txTo"].value = document.all["txFrom"].value;
    return true;
}
function plan_onblur2()
{
    if (document.all["txFromT"].value == "")
        return;

    if (document.all["txToT"].value != "")
        return;
    else
        document.all["txToT"].value = document.all["txFromT"].value;

}
//1001109	Ken		1000863 檢核
var cnt = 0;
function plan_onblur3()
{
    if (document.all["txTo"].value == "")
        return true;
    if (cnt == 1)
    {
        cnt = 0;
        //1020426	Jagle	修正前單1000863未MERGE好的部份
        //return;
        return false;
    }

    if (document.all.rbType1.checked)
    {
        var To = document.all.txTo.value;
        if (To != "")
        {
            if (To.length < 7)
            {
                To = jf_PADL(To, 7, '0');
                document.all.txTo.value = To;
            }
        }
        if (!jf_CheckCDATE(document.all.txTo.value))
        {
            document.all.txTo.value = "";
            cnt = 1;
            alert("(迄)日期格式輸入錯誤");
            //1060712	Kevin_C	1050087	升二代
            //document.all.txTo.focus();
            $('txTo').focus();
            cnt = 0;
            //1020426	Jagle	修正前單1000863未MERGE好的部份
            //return;
            return false;
        }
    }
    return true;
}
//Ken End	
//[0970690]Add by Cola 
function ClsCaseCheck()
{
    //1111214 Cloud 1110860 配合介面調整，調整種類選項判斷依據
    if (document.all["rbVolType"].checked)
    {
        switch (document.all["dlSedVolType"].options[document.all["dlSedVolType"].selectedIndex].value)
        {
            case "1":
                rbUnit6.checked = true;
                break;
            case "2":
                rbUnit4.checked = true;
                break;
            case "3":
                rbUnit1.checked = true;
                break;
        }
    }
    else
    {
        switch (document.all["dlSedSeqType"].options[document.all["dlSedSeqType"].selectedIndex].value)
        {
            case "1":
                rbUnit7.checked = true;
                break;
            case "2":
                rbUnit5.checked = true;
                break;
            case "3":
                rbUnit2.checked = true;
                break;
            case "4":
                rbUnit3.checked = true;
                break;
        }

    }
    //0991222	Leslie[0990661]	退單修正，配合0991207版之分類表DTD格式，修正99年法規所產出之分類表
    //if (document.all["rbUnit2"].checked && (document.all["rbType2"].checked || document.all["rbType3"].checked))
    // 104.04.21	Cloud	1040211	配合104法規修改，增加新選項
    //if ((document.all["rbUnit2"].checked || document.all["rbUnit5"].checked ) && (document.all["rbType2"].checked || document.all["rbType3"].checked))
    if ((document.all["rbUnit2"].checked || (document.all["rbUnit5"].checked || document.all["rbUnit7"].checked)) && (document.all["rbType2"].checked || document.all["rbType3"].checked))
    {
        document.all["cbClsCase"].disabled = false;
    }
    //else if(document.all["rbUnit1"].checked && (document.all["rbType2"].checked || document.all["rbType3"].checked))
    // 104.04.21	Cloud	1040211	配合104法規修改，增加新選項
    //else if((document.all["rbUnit1"].checked || document.all["rbUnit4"].checked ) && (document.all["rbType2"].checked || document.all["rbType3"].checked))
    else if ((document.all["rbUnit1"].checked || (document.all["rbUnit4"].checked || document.all["rbUnit6"].checked)) && (document.all["rbType2"].checked || document.all["rbType3"].checked))
    {
        document.all["cbClsCase"].disabled = false;
    }
    else
        document.all["cbClsCase"].disabled = true;
}

//1071116 Zen 1050087 批號欄位修改為可輸入英文
function SetUpdateDate()
{
    if (document.all['rbType1'].checked)
    {
        document.all['txFrom'].value = document.all['txDateOnlyS'].value;
        document.all['txTo'].value = document.all['txDateOnlyE'].value;
    }
}

//1100115 Zen 1090605 (國教院)新增年度條件以匯出整年度之檔案目錄
function txFileYear_onblur(argFromTbtool)
{

    var strFileYear = document.all['txFileYear'].value;
    if (strFileYear == '')
    {
        //1110817 Zen 1110419 新增檔案產生日期查詢條件，調整啟用檔案目錄單位選項邏輯
        //EnableAllUnit();
        return true;
    }

    //補零
    document.all['txFileYear'].value = jf_PADL(strFileYear, 3, '0');

    //1140114 Zen 驗證序19 修正無法以附錄5(104年)格式產出095年前檔案目錄之問題
    if (document.all['H_OrgNickName'].value == 'MOTC')
        if (Number(strFileYear) <= 95)
        {
            DisableAllUnitExceptUnit3();
        }
        else
        {
            EnableAllUnit();

            if (argFromTbtool == true && rbUnit3.checked)
            {
                document.all['rbUnit4'].checked = true;
                alert('附表三僅支援顯示95年前案件。');
                return false;
            }
        }

    return true;
}

function EnableAllUnit()
{

    document.all['rbUnit1'].disabled = false;
    document.all['rbUnit2'].disabled = false;
    document.all['rbUnit4'].disabled = false;
    document.all['rbUnit5'].disabled = false;
    document.all['rbUnit6'].disabled = false;
    document.all['rbUnit7'].disabled = false;

    //1110930 Zen 1110419 新增檢核文件產生日期區間不可超過12個月
    if (document.all['rbUnit3'].disabled == false && document.all['rbUnit3'].checked == true)
        document.all['rbUnit4'].checked = true;
    document.all['rbUnit3'].disabled = true;
    //1111214   Cloud 1110860 一併補上，整併畫面為選項及選單
    document.all['rbVolType'].disabled = false;
    document.all['rbSeqType'].disabled = false;
    document.all['dlSedVolType'].disabled = false;
    document.all['dlSedSeqType'].disabled = false;
    document.all['dlSedSeqType'].className = "";
    SendTypeOnClick();
}

//1110817 Zen 1110419 新增檔案產生日期查詢條件
function txCrtDate_onblur(argFromTbtool)
{
    var strErrMsg = '';
    var strCrtDateS = $('#txCrtDateS').val();
    var strCrtDateE = $('#txCrtDateE').val();

    document.all['txCrtDateS'].disabled = true;
    document.all['txCrtDateE'].disabled = true;

    if (strCrtDateS == '' && strCrtDateE == '')
    {
        EnableCrtDate();
        return true;
    }

    if (strCrtDateS != '' && strCrtDateE != '' && Number(strCrtDateS) > (Number(strCrtDateE)))
    {
        $('#txCrtDateS').val(strCrtDateE);
        $('#txCrtDateE').val(strCrtDateS);
    }

    strErrMsg += CheckDate('txCrtDateS', '文件產生日期(起)', true, 7);
    strErrMsg += CheckDate('txCrtDateE', '文件產生日期(訖)', true, 7);

    strCrtDateS = $('#txCrtDateS').val();
    strCrtDateE = $('#txCrtDateE').val();

    //1140114 Zen 驗證序19 修正無法以附錄5(104年)格式產出095年前檔案目錄之問題
    if (document.all['H_OrgNickName'].value == 'MOTC')
    {
        //1110930 Zen 1110419 新增檢核文件產生日期區間不可超過12個月
        //if (Number(strCrtDateS.slice(0, 3) <= 95) && Number(strCrtDateE.slice(0, 3) >= 96))
        if (strCrtDateS != '' && strCrtDateE != '' && Number(strCrtDateS.slice(0, 3) <= 95) && Number(strCrtDateE.slice(0, 3) >= 96))
            strErrMsg += '應輸入文件產生年月均在95年12月(含)以前或均在96年1月以後(含)的日期區間，不可輸入跨越95年12月前後的起迄年月。\n';

        //1110930 Zen 1110419 新增檢核文件產生日期區間不可超過12個月
        if (strCrtDateS != '' && strCrtDateE != '' && Number(strCrtDateE.slice(0, 5)) - Number(strCrtDateS.slice(0, 5)) > 100)
            strErrMsg += '文件產生日期區間不可超過一年。\n';
    }

    if (strErrMsg != '')
    {
        alert(strErrMsg);
        EnableCrtDate();
        return false;
    }

    //1140114 Zen 驗證序19 修正無法以附錄5(104年)格式產出095年前檔案目錄之問題
    if (document.all['H_OrgNickName'].value == 'MOTC')
        if (Number(strCrtDateS.slice(0, 3)) <= 95)
        {
            DisableAllUnitExceptUnit3();
            document.all['cbBefore95'].checked = true;
        }
        else
        {
            EnableAllUnit();
            document.all['cbBefore95'].checked = false;

            if (argFromTbtool == true && rbUnit3.checked)
            {
                document.all['rbUnit4'].checked = true;
                alert('附表三僅支援顯示95年前案件。');
                EnableCrtDate();
                return false;
            }
        }

    EnableCrtDate();
    return true;
}

//1110817 Zen 1110419 新增點擊處理095年(含)以前檔案之連動
function CheckDate(argObj, argMsg, argFromTbtool, argLength) 
{
    var strErrMsg = '';
    var strDate = $('#' + argObj).val();
    if (strDate != '')
    {
        if (strDate.length < argLength) 
        {
            strDate = jf_PADL(strDate, argLength, '0');//YYYMMDD
            $('#' + argObj).val(strDate);
        }

        if (!jf_CheckCDATE(strDate)) 
        {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            if (argFromTbtool == false)
                jf_ShowMsg(strErrMsg, '');
        }
    }
    return strErrMsg;
}

function cbBefore95_onclick()
{
    //1120824 Zen 彙整表序171 修正無法以案卷格式產出95年前銷毀、移轉交目錄之問題，調整為僅定期檔案目錄鎖定
    //if ($('#cbBefore95')[0].checked)
    //1140114 Zen 驗證序19 修正無法以附錄5(104年)格式產出095年前檔案目錄之問題
    //if ($('#cbBefore95')[0].checked && $('#rbType1')[0].checked)
    if ($('#cbBefore95')[0].checked && $('#rbType1')[0].checked && document.all['H_OrgNickName'].value == 'MOTC')
        DisableAllUnitExceptUnit3();
    else
        EnableAllUnit();
}

function DisableAllUnitExceptUnit3()
{
    document.all['rbUnit3'].checked = true;

    document.all['rbUnit1'].disabled = true;
    document.all['rbUnit2'].disabled = true;
    document.all['rbUnit4'].disabled = true;
    document.all['rbUnit5'].disabled = true;
    document.all['rbUnit6'].disabled = true;
    document.all['rbUnit7'].disabled = true;

    document.all['rbUnit3'].disabled = false;
    //1111214   Cloud 1110860 一併補上，整併畫面為選項及選單
    SetDLBor("Incloud95");
    document.all['rbVolType'].disabled = true;
    document.all['rbSeqType'].disabled = false;
    document.all['rbSeqType'].checked = true;
    document.all['dlSedSeqType'].options[3].selected = true;
    document.all['dlSedVolType'].disabled = true;
    SendTypeOnClick();
    document.all['dlSedSeqType'].disabled = true;
}

function EnableCrtDate()
{
    document.all['txCrtDateS'].disabled = false;
    document.all['txCrtDateE'].disabled = false;
}
//1111214   Cloud 1110860 支援個人檔一併補上，整併畫面為選項及選單-S
//目錄種類
function SendTypeOnClick()
{
    if (document.all['rbVolType'].checked)
    {
        document.all['dlSedVolType'].className = "";
        document.all['dlSedSeqType'].className = "hide";
    }
    else
    {
        document.all['dlSedVolType'].className = "hide";
        document.all['dlSedSeqType'].className = "";
        if ($('#cbBefore95')[0].checked)
        { SetDLBor("Incloud95"); }
        else
        { SetDLBor("NIncloud95"); }
    }
    //1140627 Zen 修正切換檔案目錄單位後產出之目錄格式與畫面選項不符之問題
    ClsCaseCheck();
}
//檔案種類
function FileTypeOnClick()
{
    if (document.all['rbOrg'].checked)
    {
        document.all['rbType2'].disabled = false;
        document.all['rbType3'].disabled = false;
        document.all['rbType4'].disabled = false;
        document.all['rbSeqType'].disabled = false;
        document.all['cbBefore95'].disabled = false;
        if (document.all['rbType2'].checked == true || document.all['rbType3'].checked == true)
            document.all['cbClsCase'].disabled = false;
        else
            document.all['cbClsCase'].disabled = true;
        document.all['txCrtDateS'].disabled = false;
        document.all['txCrtDateE'].disabled = false;
        document.all['txDateOnlyS'].disabled = false;
        document.all['txDateOnlyE'].disabled = false;
    }
    else
    {
        document.all['rbVolType'].checked = true;
        document.all['rbType2'].disabled = true;
        document.all['rbType3'].disabled = true;
        document.all['rbType4'].disabled = true;
        document.all['rbSeqType'].disabled = true;
        document.all['cbBefore95'].disabled = true;
        document.all['cbClsCase'].disabled = true;
        document.all['txCrtDateS'].disabled = true;
        document.all['txCrtDateE'].disabled = true;
        document.all['txDateOnlyS'].disabled = true;
        document.all['txDateOnlyE'].disabled = true;
        document.all['rbType1'].checked = true;
        jf_chText();
        SendTypeOnClick();
    }
}
function SetDLBor(argMode)
{

    if (argMode == "NIncloud95")
    {
        for (var i = 0; i < document.all["dlSedSeqType"].length; i++)
        {
            if (document.all["dlSedSeqType"].options[i].text == "附表三")
                document.all["dlSedSeqType"].remove(i);
        }
        document.all["dlSedSeqType"].selectedIndex = 0;
        document.all.txSendType.value = "1";
    }
    else
    {
        var bhas = false;
        for (var i = 0; i < document.all["dlSedSeqType"].length; i++)
        {
            if (document.all["dlSedSeqType"].options[i].text == "附表三")
            {
                bhas = true;
                break;
            }
        }
        if (!bhas)
        {
            var DropListChild = document.createElement("OPTION");
            DropListChild.text = "附表三";
            DropListChild.value = "4";
            document.all["dlSedSeqType"].options.add(DropListChild);
        }
    }
}//1111214   Cloud 1110860 支援個人檔一併補上，整併畫面為選項及選單-e