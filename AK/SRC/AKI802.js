/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.11.09
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2006.11.07	David	955179	(藥檢局驗收需求)加上查詢來文電子檔功能
 * 2007.02.12	David	000256	基港局以離線模式登入公文系統無法開啟附件資訊子視窗
 * 2007.04.13	Andy	000761	修正000256衍生問題，開啟舊稿件應該是使用Open而不是New
 * 2007.05.25	Caesar	------	消防署回報多機關開啟公文製作未傳入機關代碼
 * 2007.06.16	Caesar	000232	IE 7.0修正問題
 * 2008.04.23   Cola	0970387	限制AKI801不能按下Ctrl+N 
 * 2008.05.19	Cola	0970321	開啟之公文製作應為唯讀模式
 * 97.06.19		Cola	0970547	新增跳至某頁按鈕
 * 97.06.19		Cola	0970507	新增展期資訊按鈕 
 * 2008.09.19	Leo		--		為聯合大學新增瀏覽舊公文功能
 * 2008.12.17	Leo		0970815	花港局-新增瀏覽電子檔 button。
 * 2009.01.06	Leslie	0971140	開啟公文製作時應傳入正確之簽核類型
 * 2009.05.22	Albert	0960123	開啟AKT800時，視窗與從系統選單開啟時大小相同
 * 2009.08.25	Albert	0980467	執行"申請調檔"之前判斷是否選取公文超過AKT800可顯示數量
 * 2010.01.06	Albert	0980336	修正IE8設定開啟子視窗大小
 * 2010.01.07	Albert	0990009	將點選"文稿編輯"時，暫存目錄改到2100目錄下
 * 2010.05.27   Jim     0990347 新增檢核雲科大機關代碼310060000Q
 * 2010.07.27	Leslie	0990148	中企處新增解密電子檔下載功能
 * 2012.03.27	Leslie	--		修正由AKI888開啟時會發生錯誤的問題
 * 2012.04.19	Leslie	1010290	國合會退單處理，於開啟AKI802時增加檢核是否已有公文系統首頁
 * 2013.04.30	Jagle	1020324	增加紀錄系統參數USE_T2100_OD的值，以判斷是否需要自動登入公文系統
 * 2013.05.31	Cloud	1000751	修改以機關別稱判斷使用機關	
 * 2013.12.18	Cloud	1021003	增加ajax開啟公文製作時，增加寫入紀錄檔
 * 2014.02.05	Cloud	1021003	修正開啟公文製作、來文電子檔時，DESC 未正確寫入的BUG
 * 2014.02.05	Cloud	1021003	修正傳錯參數的bug
 * 2014.10.28	Kenny	1030836	配合SSL修改傳入元件之URL
 * 2014.11.14	Gabby	1030792	關閉前將Client端C:\2100\AKI802_EDIT_TEMP的暫存檔清除
 * 2014.12.05	Cloud	因net4.0環境使用舊版ajax元件設定可讀寫session時會出現異常，修改使用新版ajax元件
 * 2015.07.30	Cloud	1030160	修改for外陳外會，增加判斷doc_extra.ComeOthers欄位開啟公文製作時取得稿件路徑增加機關代碼
 * 2016.06.16   Cloud   1050087 升級二代
 * 2016.06.16	Kevin_C	1050087	innerText改成textContent
 * 2016.07.26	Leslie	1050087	升級二代
 * 1051019   Joe		1050087		二代修正配合行動平台
 * 2017.07.27   CLOUD   1060645 增加判斷系統參數，公文產生日期小於系統參數公文不可使用線上瀏覽及文稿編輯
 * 2017.12.05	Cloud	1060934	配合國合會，調整線上瀏覽邏輯
 * 2018.11.28	Kevin_C	1070583	增加其他參考檔案按鈕
 * 1070731      Zen     1070678 弱掃Hardcoded Absolute Path修正
 * 1100504      Zen     1100473 弱掃Client DOM XSS修正
 * 1100528      Leslie  1100610 弱掃Client DOM XSS修正
 * 1101001      Joe     1100991 弱掃Client DOM XSS修正
 * 1110815      Cloud   1110517 修改調案檢核訊息可自訂
 * 1110816		Kevin	1110633	Merge[1070583]其他參考檔案功能
 * 1120117		Zen		1110883	(銓敘部)新增任審發文檔案按鈕
 * 1120605		Leslie	1120361	修正Client Potential Code Injection弱點，把舊的Code全Mark掉
 * 1121120      Zen     1120634	(信保基金)修正勾選兩筆公文後申請調檔異常之問題
 * 1130411      Cloud   1130054 (銓敘部)判斷為銓敘部時，如仍有可申請調檔公文，則依然開啟AKT800
 * 1140609      Zen     1140147 支援顯示歷史公文流程功能
 * 1140611      Zen     1140166 修改支援AI分文
 * 1140619		Leslie	1131121	修正97年版封裝檔，無法於二代系統執行「文稿編輯」
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

var iCallID_ToDoList = null;
//2016.06.16   Cloud   1050087 升級二代
//var fso = new ActiveXObject("Scripting.FileSystemObject");
var uEditWin, uTimerID;
var uClientPath = "";

//1010419	Leslie	國合會退單處理，於開啟AKI802時增加檢核是否已有公文系統首頁
var uTimerMainPage;

//2016.06.16   Cloud   1050087 升級二代
/*document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
if (document.all["ValidationSummary1"].innerText != "")
    alert(document.all["ValidationSummary1"].innerText);*/

var iCallID = 0;

var SumDocWin, SumComWin;
var DetDocWin, DetComWin;
var PDFWin;
//2014.12.05	Cloud	新版AJAX非同步時會有TIMEOUT異常，增加此段避開異常-S
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
//2014.12.05	Cloud	新版AJAX非同步時會有TIMEOUT異常，增加此段避開異常-E
function getOpenerValue(key)
{
    if (document.all["h_tbFlag"].value == "")
    {
        document.all["h_tbFlag"].value = "PostBack";
        document.all[key].value = opener.document.all[key].value;

        setSelect(key);
    }
}

function setSelect(key)
{
    var Info = document.all[key].value;
    var flag;
    var SEQ_NO = document.all["lbSEQ_NO"].innerHTML;

    flag = Info.substr(parseInt(SEQ_NO) - 1, 1);
    if (flag == "1")
        document.all["cbSELECT"].checked = true;
    else
        document.all["cbSELECT"].checked = false;
}

function jf_OpenSumDocWin(sUrl)
{
    //alert(sUrl);
    //SumDocWin = open(sUrl,"SumDocWin","fullscreen=nos,Height=480,Width=720,Top=20,Left=40,Scrollbars=yes");
    SumDocWin = open(sUrl, "SumDocWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    SumDocWin.focus();
    //moveBy(screen.width,screen.height);
}

function jf_OpenDetDocWin(sUrl)
{
    //alert(sUrl);
    //DetDocWin = open(sUrl,"DetDocWin","fullscreen=no,Height=480,Width=720,Top=20,Left=40,Scrollbars=yes");
    DetDocWin = open(sUrl, "SumDocWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    DetDocWin.focus();
    //moveBy(screen.width,screen.height);
}

function jf_OpenSumComWin(sUrl)
{
    //alert(sUrl);
    //SumComWin = open(sUrl,"SumComWin","fullscreen=no,Height=480,Width=720,Top=20,Left=40,Scrollbars=yes");
    SumComWin = open(sUrl, "SumComWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    SumComWin.focus();
    //moveBy(screen.width,screen.height);
}

function jf_OpenDetComWin(sUrl)
{
    //alert(sUrl);
    //DetComWin = open(sUrl,"DetComWin","fullscreen=no,Height=480,Width=720,Top=20,Left=40,Scrollbars=yes");
    DetComWin = open(sUrl, "SumComWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    DetComWin.focus();
    //moveBy(screen.width,screen.height);
}

function jf_OpenPDFWin(sUrl)
{
    //alert(sUrl);
    //DetComWin = open(sUrl,"DetComWin","fullscreen=no,Height=480,Width=720,Top=20,Left=40,Scrollbars=yes");
    PDFWin = open(sUrl, "PDFWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    PDFWin.focus();
    //moveBy(screen.width,screen.height);
}

function jf_OII800Service(argUser, argWorkGrp, argDoc_no, argSource_orgno, argChkPriv)
{
    service.useService("/OII800.asmx?WSDL", "OII800");
    iCallID = service.OII800.callService("GetDocPdf", String(argUser), "", String(argWorkGrp), String(argDoc_no), String(argSource_orgno), String(argChkPriv));
}

function OnWSresult()
{

    if ((event.result.error) && (iCallID == event.result.id))
    {
        var xfaultcode = event.result.errorDetail.code;
        var xfaultstring = event.result.errorDetail.string;
        var xfaultsoap = event.result.errorDetail.raw;
    }
    else if ((!event.result.error) && (iCallID == event.result.id))
    {
        var result = event.result.value;
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
        alert("Something else fired the event!");
    }
}


//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019	Joe		1050087		配合行動平台進行修正
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

        case "btOpenEdit":
            Page_BlockSubmit = true;
            DownloadDocument();
            break;
        //95.11.07 955179 David 電子來文開啟功能
        case "btElcFile":
            Page_BlockSubmit = true;
            OpenElcFile();
            break;
        //0970919 Leo 為聯合大學新增瀏覽舊公文功能
        case "btShowOldInfo":
            Page_BlockSubmit = true;
            OpenOldInfoPage();
            break;
        //0990727	Leslie[0990148]	中企處新增「解密電子檔」功能鍵
        case "btGetDeSecret":
            Page_BlockSubmit = true;
            OpenDownLoadPage();
            break;
        //1071128	Kevin_C	1070583	增加其他參考檔案按鈕
        case "btRefOther":
            Page_BlockSubmit = true;
            var xUrl = "/ED/ED1/EDT139.aspx?argDocNo=" + document.all["lbDOC_NO"].textContent + "&SAMLart=" + document.all["Artifact"].value + "&argType=1";
            jf_OpenChildWin(xUrl, "ViewRcvRefAtt", 750, 450);
            break;
        //1120117 Zen 1110883 (銓敘部)新增任審發文檔案按鈕
        case "btTAFile":
            Page_BlockSubmit = true;
            OpenTAFile();
            break;
    }
}

//1050407 Cloud   1050087     升級二代
//function jf_ToolBarHandle(event)
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    //2016.06.16   Cloud   1050087 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btEXIT1":
            ret = window.confirm("確定要離開本程式嗎？");
            Page_BlockSubmit = true;
            if (ret) window.close();
            break;
        case "btSUM1":		// 顯示摘要
            //1050913	Leslie	修改801與802切換行為，以避免opener錯亂
            if (location.search.indexOf("argFrom") == -1)
            {
                //1100526	Leslie[1100610]	弱掃Client DOM XSS修正
                //var sUrlHeader = window.location.origin;
                var sUrlHeader = encodeURI(window.location.origin);
                var sUrlFolder = window.location.pathname;
                var sPara = window.location.search;
                var pRecNo = GetParam("gRecNo");
                var pPageSize = GetParam("gPageSize");
                var PageNo = Math.floor(pRecNo / pPageSize);
                if (pRecNo % pPageSize > 0)
                    PageNo += 1;

                //1100504 Zen 1100473 弱掃Client DOM XSS修正
                //window.location.href = sUrlHeader + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + "AKI801.aspx" + sPara + "&gPageNo=" + PageNo;
                //1100818 Joe 1100991 弱掃Client DOM XSS修正
                // window.location.href = HtmlEncode(sUrlHeader) + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + "AKI801.aspx" + sPara + "&gPageNo=" + PageNo;
                //1101001 Joe 1100991 弱掃Client DOM XSS修正
                // window.location.href = HtmlEncode(sUrlHeader) + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + "AKI801.aspx" + HtmlEncode(sPara) + "&gPageNo=" + PageNo;
                window.location.href = HtmlEncode(sUrlHeader) + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + "AKI801.aspx" + encodeURI(sPara) + "&gPageNo=" + PageNo;
                Page_BlockSubmit = true;
                return;
            }
        case "btDetailPrint": // 明細列印
            Page_BlockSubmit = false;
            //2016.06.16   Cloud   1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //	上下頁鍵	
        case "btFIRSTDOC1":
        case "btPRIORDOC1":
        case "btNEXTDOC1":
        case "btLASTDOC1":
            Page_BlockSubmit = false;
            //2016.06.16   Cloud   1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //[0970547]Add by Cola
        case "btSELECTPAGE":
            //1080104 Cloud 修正bug
            //if(document.all.tbTool.getItem(14).getAttribute("VALUE") == "")
            if (document.all.txSelectNumber.value == "")
            {
                alert("請於後方輸入欲跳至之筆數");
                Page_BlockSubmit = true;
            }
            //1080104 Cloud 修正bug
            //else if(parseInt(document.all.tbTool.getItem(14).getAttribute("VALUE")) > parseInt(document.all.tbTool.getItem(4).getAttribute("VALUE")) || document.all.tbTool.getItem(14).getAttribute("VALUE") == "0" )
            else if (parseInt(document.all.txSelectNumber.value) > parseInt(document.all.txTotNum.value) || document.all.txSelectNumber.value == "0")
            {
                //1080104 Cloud 修正bug
                //alert("輸入之筆數必須介於 1 ~ "+document.all.tbTool.getItem(4).getAttribute("VALUE")+" 之間");
                //document.all.tbTool.getItem(14).setAttribute("VALUE","");
                alert("輸入之筆數必須介於 1 ~ " + document.all.txTotNum.value + " 之間");
                document.all.txSelectNumber.value = "";
                Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = false;

            //2016.06.16   Cloud   1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //Cola -- end --			
        //1050722	Leslie	升二代，調整線上調檔部分為不限筆數(一律帶回側屜
        //case "btIMAGE1":		// 線上調檔
        case "btAPPLY1":		// 申請調檔
            //0980825 Albert 0980467 增加判斷勾選公文數量是否超過AKT800可顯示數量
            if (IsOverAKT800DgSize())
                return;
            //1050912	Leslie	[1050087]	升級二代，修正調案申請邏輯
            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                alert('請至少勾選一筆資料!!');
                return;
            }

            //1121120 Zen 1120634 (信保基金)修正勾選兩筆公文後申請調檔異常之問題
            if (document.all['H_txOrgnickname'].value == 'SMEG' && GetSelectedCnt() != '1')
            {
                Page_BlockSubmit = true;
                alert('僅允許勾選一筆資料!!');
                return;
            }
            jf_btApply1Click();
            Page_BlockSubmit = true;
            break;
        //1050722	Leslie	升二代，調整線上調檔部分為不限筆數(一律帶回側屜
        case "btIMAGE1":		// 線上調檔

            if (document.all.cbSELECT.checked == false)
            {
                document.all.cbSELECT.checked = true;
                SelectItem('DOC_CHECK');
            }
            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                alert('請至少勾選一筆資料!!');
                return;
            }
            else
            {
                // 2017.07.27   CLOUD   1060645 增加判斷系統參數，公文產生日期小於系統參數公文不可使用線上瀏覽及文稿編輯
                if (document.all.IS97DTD && document.all.IS97DTD.value == "Y")
                {
                    alert('此公文屬97法規版本，請改用點選相關電子檔之連結方式，來開啟PDF影像檔。');
                    Page_BlockSubmit = true;
                }
                else
                {
                    Page_BlockSubmit = false;
                    //2016.06.16   Cloud   1050087 升級二代
                    //jf_ToolBarSubmit();
                    jf_ToolBarSubmit(xObjectName);
                }

            }
            break;
        case "btQueryProcess":
            Page_BlockSubmit = true;
            //1140609 Zen 1140147 支援顯示歷史公文流程功能
            //if(CheckBeforeQueryProcess())
            if (CheckBeforeQueryProcess("NEW"))
            {
                //2016.07.07   Kevin_C   1050087 升級二代
                //var xUrl = document.all["ODWebPath"].value + "ODI260.aspx?pDocNo="+document.all["lbDOC_NO"].innerText+"&SAMLart="+document.all["Artifact"].value+"&SOURCE_ORGNO="+document.all["txOrgNo"].value;
                var xUrl = document.all["ODWebPath"].value + "ODI260.aspx?pDocNo=" + document.all["lbDOC_NO"].textContent + "&SAMLart=" + document.all["Artifact"].value + "&SOURCE_ORGNO=" + document.all["txOrgNo"].value;
                jf_OpenChildWin(xUrl, "ODI260", 750, 450);
            }
            else
            {
                //1140609 Zen 1140147 支援顯示歷史公文流程功能
                if (document.all.AK_HAS_GDOCFLOW && document.all.AK_HAS_GDOCFLOW.value == "Y" && CheckBeforeQueryProcess("OLD"))
                {
                    var xUrl = "../../EA/EA01/EAI021.aspx?argDocNo=" + document.all["lbDOC_NO"].textContent + "&SAMLart=" + document.all["Artifact"].value + "&SOURCE_ORGNO=" + document.all["txOrgNo"].value;
                    jf_OpenChildWin(xUrl, "EAI021", 750, 450);
                }
                else
                    alert("歷史檔案未提供公文辦理流程紀錄");
            }
            //2016.06.16   Cloud   1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //[0970507]Add by Cola 新增展期資訊按鈕
        case "btEXTENT":
            Page_BlockSubmit = false;
            //2016.06.16   Cloud   1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}



function ClientOnLoad()
{

    //[0970547]Add by Cola 設定回0，避免server無法正確判斷是否為按下enter
    document.all["txFlag"].value = "0";

    //1010419	Leslie	國合會退單處理，於開啟AKI802時增加檢核是否已有公文系統首頁 --Start--
    //1020430	Jagle	[1020324]	增加判斷前端是否使用2100公文系統
    if (document.all.H_USE_T2100_OD.value == "1")
    {
        //2016.06.16   Cloud   1050087 升級二代
        /*resizeTo(screen.availWidth,screen.availHeight);
        moveTo(0,0);
        var artifact = document.all.Artifact.value;
        if(artifact != "" && !document.all["btOpenEdit"].disabled)
        {
            var ret;
            ret = document.all.ocx.SetTargetUser(artifact);
            if(ret == false)
            {
                gMainPageState = false;
                document.all["btOpenEdit"].disabled = true;
                var s = "file://c:/2100/SSO/deploy.htm?SAMLart=" + artifact;

                var oShell = new ActiveXObject("Shell.Application");
                var strFeature = "";
                var strWidth = "";	
                var strHeight = "";
                var strWinName = "";
                var param = "file:///C:/2100/SSO/Medium.html?Feature="+strFeature+"&TargetUrl="+ escape(encodeURIComponent(s))+"&WinName="+strWinName+"&Feature="+strFeature+"&Width="+strWidth+"&Height="+strHeight;

                //0970130 Stella 修正因IE7.0後無法取得網址參數，故配合AKI802方式一律寫出txt檔
                var fsolog = new ActiveXObject("Scripting.FileSystemObject");
                var pLogFile = fsolog.CreateTextFile("c:\\2100\\SSO\\WebEdit.TXT",true);
                pLogFile.write(param);
                pLogFile.close();
        	
                try
                {
                    oShell.ShellExecute("IEXPLORE.EXE", param, null, null, 8);
                }
                catch(e)
                {
                }
                uTimerMainPage = setInterval("EnablebtWebEdit();",500);
            }
        }*/
    }
    //1010419	Leslie	國合會退單處理，於開啟AKI802時增加檢核是否已有公文系統首頁 --End--

    //解決StartupScript問題 #2007.04.14 Andy
    //1010327	Leslie	修正由AKI888開啟時會發生錯誤的問題，因來源頁面可能為其他系統頁面(經AKI888開啟)，故以Try-Catch處理
    try
    {
        if (opener && opener.document.all['DOC_CHECK'])
            if (document.all["CALL_DOC_CHECK"])
            {
                var s = document.all["CALL_DOC_CHECK"].value;
                if (s == "1")
                {
                    getOpenerValue('DOC_CHECK');
                    document.all["CALL_DOC_CHECK"].value = "";
                }
            }
    }
    catch (e)
    { }
    //2016.06.16   Cloud   1050087 升級二代
    //jf_CallWS("LIB/AK_LIB.asmx","BubbleFun"  ,false,  null);
    //OpenUnv();

    //1050726	Leslie	升級二代，呼叫公文清單已準備完成，呼叫母視窗函式
    var DocList = $('#DocListPrepared');
    if (DocList && DocList.val() == '1')
    {
        //* 2017.12.05	Cloud	1060934	配合國合會，調整線上瀏覽邏輯
        //if(opener.CallBackByImgView())
        //if( opener && ('CallBackByImgView' in opener)){
        //1110520 Leslie[1110371] 純檔管升級二代
        var useT2100OD = $('#h_UseT2100OD').val();
        if (useT2100OD != '1')
        {
            // window.open('AKI800View.ashx', 'AKI800View');
            jf_ShowModal('AKI800View.ashx');
        }
        else
            if (!document.all.IsOpenByAki888)
            {
                //1140611 Zen 1140166 修改支援AI分文
                //opener.CallBackByImgView();
                //alert("檢索清單已準備完成，請由檢索側屜調閱公文影像。");
                if (typeof opener.CallBackByImgView === 'function') 
                {
                    if (opener.CallBackByImgView())
                        alert("檢索清單已準備完成，請由檢索側屜調閱公文影像。");
                }
                else 
                {
                    if (opener.parent.GetSSOPage().theSSO.MP.queryDocList.CallBackByImgView())
                        alert("檢索清單已準備完成，請由檢索側屜調閱公文影像。");
                }
            }
            else
            {
                localStorage.AKI888OPENR = Date.now();
                alert("檢索清單已準備完成，請由檢索側屜調閱公文影像。");
            }
    }

    //解決StartupScript問題 #2007.04.14 Andy
    if (document.all["CALLAKI801"])
    {
        var s = document.all["CALLAKI801"].value;
        if (s != "")
        {
            jf_OpenSumDocWin(s);
            document.all["CALLAKI801"].value = "";
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
            //0980522 Albert 0960123 開啟AKT800時，視窗與從系統選單開啟時大小相同
            //0990106 Albert 0980336 修正IE8設定開啟子視窗大小，調整為四個參數
            //jf_OpenChildWin(s,'AKT800', 800, 530);
            //jf_OpenChildWin(s,"AKT800", "fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizable=yes");
            jf_OpenChildWin(s + "&Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizable=yes", "AKT800", window.screen.availHeight - 54, window.screen.availWidth - 8);
            document.all["APPLY2"].value = "";
        }
    }
}

function jf_MenuInit()
{
}
//1140609 Zen 1140147 支援顯示歷史公文流程功能
//function CheckBeforeQueryProcess()
function CheckBeforeQueryProcess(argType)
{
    //1031216   Cloud     找不到ws會壞掉的原因-修改ws為ajax-快解
    /*var KeyName = new Array(2);
    KeyName[0] = "SOURCE_ORGNO";
    KeyName[1] = "DOC_NO";*/
    var KeyValue = new Array(2);
    KeyValue[0] = document.all["txOrgNo"].value;
    //2016.07.07   Kevin_C   1050087 升級二代
    //KeyValue[1] = document.all["lbDOC_NO"].innerText;
    KeyValue[1] = document.all["lbDOC_NO"].textContent;
    //1031216   Cloud     找不到ws會壞掉的原因-修改ws為ajax-快解
    /*var RtnFldName = new Array(1);
    RtnFldName[0] = "MSG_ID";
    var OrdFldName = new Array(1);
    OrdFldName[0] = "MSG_ID";
    var param = new Array(5);
    param[0] = "TODO_LIST";
    param[1] = KeyName;
    param[2] = KeyValue;
    param[3] = RtnFldName;
    param[4] = OrdFldName;
    RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,param);
    if(RtnObj.error)
    {
        return false;
    }
    if (RtnObj.value.ErrorClass.IsErr)
    {
        return false;
    }
    else
        return true;*/
    //1140609 Zen 1140147 支援顯示歷史公文流程功能
    //RtnObj = AK.AKI802.GetFieldValue(KeyValue[0],KeyValue[1]).value;
    RtnObj = AK.AKI802.GetFieldValue(KeyValue[0], KeyValue[1], argType).value;
    if (RtnObj != "")
        return false;
    else
        return true;

}

function OpenWindow(sUrl)
{
    var pWidth = (screen.availWidth - 250) / 2;    //螢幕解析度之寬
    var pHeight = (screen.availHeight - 300) / 2;  //螢幕解析度之高

    oWindowID = open(sUrl, "OII300C1", "width=230,height=280,top=" + pHeight + ",left=" + pWidth + "");
    oWindowID.focus();
    //moveBy(screen.width,screen.height);
}

function jf_DETAIL(argSEQ_NO)
{
    frDETAIL.gRECCTN.value = document.all["_RecCtn"].value;
    frDETAIL.gRECNO.value = String(argSEQ_NO);
    frDETAIL.gTOTPAGE.value = document.all["_TotPage"].value;
    frDETAIL.gPAGESIZE.value = document.all["_PageSize"].value;
    frDETAIL.action = "OII210.ASPX";
    frDETAIL.submit();
}
/******************************************************
 
 #---------------------------------------- Date
 CallCal        開啟小日曆
 ChkDateFmt     檢查西元｜民國日期是否正確

 #---------------------------------------------- String
 IsNum          檢查字串是否為數字格式（含負數）
 PadL           指定字元補足字串的左邊
 PadR           指定字元補足字串的右邊
 Trim           去除字串首尾的空白

 #---------------------------- Cookie
 ReadCookie     讀取cookie變數
 SaveCookie     儲存cookie變數

 #-------------------------------------------------------- CheckBox Select
 SelectItem         處理選取的checkbox
 ClearAllItem       不選全部的checkbox，並回存cookie
 SelectAllItem      選取全部的checkbox，並回存cookie
 ClearPageItem      不選本頁的checkbox，並回存cookie
 SelectPageItem     選取本頁的checkbox，並回存cookie
 SelectReverseItem  反向選取  checkbox，並回存cookie
 SelectRangeItem    處理選擇範圍內的checkbox，並回存cookie
 CallSel            開啟選取提示子視窗

 #-------------------------------------------------- Obj
 InpNumOnly     只允許動作物件輸入數字（僅對IE有效）
 UpperCase      將Text物件的內容值轉為大寫
 SelDDMenu      根據傳入值選取DropDownMenu值

 #------------------------------------- Change Page/Rec
 ChangePage     切換至 summary 的新頁面
 ChangeRec      切換至 detail  的新頁面

******************************************************/

/******************************************************
 name : CallCal
 param: 年度: Text
        月: Text
        日期: Text
        中/英顯示:   CH/EN
        民國/西元年: CHY/ENY
 rtn  : none
 desc : 開啟小日曆
******************************************************/
//1050616 Cloud	1050087	升級二代-此函式根本無用mark
/*function CallCal(argYr, argMn, argDy, argLang, argYrTp)
{
    screen_height = window.screen.height
    screen_width  = window.screen.width
    subwin_height = 240
    subwin_width  = 300
    subwin_top    = (screen_height - subwin_height) / 2
    subwin_left   = (screen_width  - subwin_width ) / 2

    //  ARGUMENTS //
    pYrObj  = argYr
    pMnObj  = argMn
    pDyObj  = argDy
    pLang   = argLang.toUpperCase()
    pYrTp   = argYrTp.toUpperCase()

    pYr     = argYr.value
    pMn     = argMn.value
    pDy     = argDy.value

    if (Trim(pYr) != '') { if (IsNum(pYr)) { pYr = parseInt(pYr) } }
    if (Trim(pMn) != '') { if (IsNum(pMn)) { pMn = parseInt(pMn) } }
    if (Trim(pDy) != '') { if (IsNum(pDy)) { pDy = parseInt(pDy) } }

    if (pYrTp == "ENY") { subwin_width  = 250 }

    //  OPTIONS //
    pDir    = "directories=no"
    pLcn    = "location=no"
    pMenu   = "menubar=no"
    pStatus = "status=no"
    pTool   = "toolbar=no"
    pScroll = "scrollbars=no"
    pResize = "resizable=no"
    pHeight = "height=" + subwin_height
    pWidth  = "width=" + subwin_width
    pTop    = "top=" + subwin_top
    pLeft   = "left=" + subwin_left

    pUrl    = "lib/cal.htm"
    pOption = pDir+','+pHeight+','+pLcn+','+pMenu+','+pStatus+','+pTool+','+pScroll+','+pResize+','+pWidth+','+pTop+','+pLeft

    calWin = window.open(pUrl,"calWin",pOption)
    calWin.focus()
}*/

/*********************************************************************
 name : ChkDateFmt
 param: 年度: Text
        月: Text
        日期: Text
        是否可空白: 0 NO / 1 YES
        西元/民國:  ENY/CHY
        是否補滿0:  0 NO / 1 YES        
 rtn  : Boolean
 desc : 檢查日期格式是否正確
*********************************************************************/
//1050616 Cloud	1050087	升級二代-此函式根本無用mark
/*
function ChkDateFmt(argYr, argMn, argDy, argCanNull, argYrTp, argFull)
{
    var argTmp

    pYr = Trim(argYr.value)
    pMn = Trim(argMn.value)
    pDy = Trim(argDy.value)
    argYrTp = argYrTp.toUpperCase()

    // ***************** Check Is Nullable ?
    if (argCanNull == 0)
    {
        if (pYr.length == 0) 
        { 
            alert("請輸入年！")
            argYr.focus()
            return false
        }
        if (pMn.length == 0) 
        {
            alert("請輸入月！")
            argMn.focus()
            return false
        }
        if (pDy.length == 0)
        {
            alert("請輸入日期！")
            argDy.focus()
            return false
        }
    }

    // ***************** Check Is DD or YYDD or MMDD Format
    if (pDy.length != 0) 
    {
        if (pYr.length == 0)
        { 
            alert("請輸入年！")
            argYr.focus()
            return false
        }
        if (pMn.length == 0)
        {
            alert("請輸入月！")
            argMn.focus()
            return false
        }
    }

    if (pMn.length != 0)
    {
        if (pYr.length == 0)
        {
            alert("請輸入年！")
            argYr.focus()
            return false
        }
    }
    // ***************** Check Date Value -- YR
    if (pYr.length != 0)
    {
        argTmp = IsNum(parseFloat(pYr))
        if (! IsNum(pYr))
        { 
            alert("年格式錯誤！")
            argYr.focus()
            return false
        }
        else
        {
            if (parseFloat(pYr) < 1)
            {
                alert("年格式錯誤！")
                argYr.focus()
                return false
            }
            if (argYrTp == "CHY") { pYr = parseFloat(pYr) + 1911 }
        }
    }

    // ***************** Check Date Value -- MN
    if (pMn.length != 0)
    {
        if (! IsNum(pMn))
        {
            alert("月格式錯誤！")
            argMn.focus()
            return false
        }
        else
        {
            if ( (parseFloat(pMn) > 12) || (parseFloat(pMn) < 1) )
            {
                alert("月格式錯誤！")
                argMn.focus()
                return false
            }
        }
    }

    // ***************** Check Date Value -- DY
    if (pDy.length != 0)
    {
        if (! IsNum(pDy))
        {
            alert("日期格式錯誤！")
            argDy.focus()
            return false
        }
        else
        {
            if (parseFloat(pDy) < 1)
            {
                alert("日期格式錯誤！")
                argDy.focus()
                return false
            }

            // February
            if (parseFloat(pMn) == 2)
            {
                if ( (parseFloat(pYr) % 400 == 0) ||
                     ( (parseFloat(pYr) % 4 == 0) && (parseFloat(pYr) % 100 != 0) ) )
                {
                    if (parseFloat(pDy) > 29)
                    {
                        alert("日期格式錯誤！")
                        argDy.focus()
                        return false
                    }
                }
                else
                {
                    if (parseFloat(pDy) > 28)
                    {
                        alert("日期格式錯誤！")
                        argDy.focus()
                        return false
                    }
                }
            }
            // January March May July August October December
            else if ( (parseFloat(pMn) == 1) || (parseFloat(pMn) == 3)  ||
                      (parseFloat(pMn) == 5) || (parseFloat(pMn) == 7)  ||
                      (parseFloat(pMn) == 8) || (parseFloat(pMn) == 10) ||
                      (parseFloat(pMn) == 12) )
            {
                if (parseFloat(pDy) > 31)
                {
                    alert("日期格式錯誤！")
                    argDy.focus()
                    return false
                }
            }
            // April June September November
            else
            {
                if (parseFloat(pDy) > 30)
                { 
                    alert("日期格式錯誤！")
                    argDy.focus()
                    return false
                }
            }
        }
    }

    if (argFull == 1)
    {
        if (pYr.length != 0)
        {
            if (argYrTp == "ENY") { argYr.value = PadL(argYr.value, 4, "0") }
            else if (argYrTp == "CHY") { argYr.value = PadL(argYr.value, 3, "0") }
        }
        if (pMn.length != 0) { argMn.value = PadL(pMn, 2, "0") }
        if (pDy.length != 0) { argDy.value = PadL(pDy, 2, "0") }
    }
    
    return true
}*/

/*****************************************
 name: IsNum
 desc: 檢查字串是否為數字格式（含負數）
*****************************************/
//1050616 Cloud	1050087	升級二代-此函式根本無用mark
/*
function IsNum(argStr)
{
  pTmpChar  = ''

  for (pIdx = 0; pIdx < argStr.length; pIdx++)
  {
       pTmpChar = argStr.substring(pIdx, pIdx+1)

       if (pIdx == 0) { if (pTmpChar == '-') { continue } }

       if ( (pTmpChar != '0') && (pTmpChar != '1') && (pTmpChar != '2') && (pTmpChar != '3') &&
            (pTmpChar != '4') && (pTmpChar != '5') && (pTmpChar != '6') && (pTmpChar != '7') &&
            (pTmpChar != '8') && (pTmpChar != '9') )
       { return false }
  }
  return true
}*/

/************************************
 name: PadL
 desc: 指定字元補足字串的左邊
************************************/
//1050616 Cloud	1050087	升級二代-此函式根本無用mark
/*
function PadL(sAString, bSize, cChar)
{ 

  var trimStr     = Trim(sAString)
  var sAStringLen = trimStr.length
  var LeftStrLen  = bSize - sAStringLen
  var LeftStr     = ""

  for (i = 0; i < LeftStrLen; i++) 
  { 
       LeftStr = LeftStr + cChar
  }
  return LeftStr + trimStr
  
}*/

/************************************
 name: PadR
 desc: 指定字元補足字串的右邊
************************************/
//1050616 Cloud	1050087	升級二代-此函式根本無用mark
/*
function PadR(sAString, bSize, cChar)
{
  var trimStr     = Trim(sAString)
  var bSrcLength  = trimStr.length
  var RightStrLen = bSize - bSrcLength
  var RightStr    = ""

  for (i = 0; i < RightStrLen; i++) 
  { 
       RightStr = RightStr + cChar
  }
  return trimStr + RightStr
  
}*/

/***************************
 name: Trim
 desc: 去除字串首尾的空白
***************************/
//1050616 Cloud	1050087	升級二代-此函式根本無用mark
/*
function Trim(argStr)
{ 

  var StrLen    = argStr.length
  var trimStr   = ""
  var returnStr = ""

  for (i = 0; i < StrLen ; i++) 
  { 
       argStr.substring(i,i+1)
       trimStr = argStr.substring(i,i+1)
       if ((trimStr == " ") && (i != StrLen )) { trimStr = "" }
       returnStr = returnStr + trimStr
  }
  return  returnStr
}*/

/************************
 name: ReadCookie
 desc: 讀取cookie變數
************************/
//1050616 Cloud	1050087	升級二代-此函式根本無用mark
/*
function ReadCookie(name)
{
  var namex = name + "="

  if (document.cookie.length == 0) { return null }
  nameat = document.cookie.indexOf(namex)
  if (nameat == -1) { return null } // 找不到 name 時
  ValueAt = nameat + namex.length
  endPos = document.cookie.indexOf(';', ValueAt)
  if (endPos == -1) { return document.cookie.substring(ValueAt) }
  else { return document.cookie.substring(ValueAt, endPos) }
}
*/
/*******************************
 name: SaveCookie
 desc: 儲存cookie變數
*******************************/
//1050616 Cloud	1050087	升級二代-此函式根本無用mark
/*
function SaveCookie(name, value)
{
  document.cookie = name + '=' + escape(value)
}*/

/*****************************************************
 name: SelectItem
 desc: 處理選取checkbox
*****************************************************/
function SelectItem(argCookie_nm)
{
    //pStr  = ReadCookie(argCookie_nm);
    var pStr = document.all[argCookie_nm].value;
    pStr1 = '';
    pStr2 = '';
    pType = 0;

    //2016.07.07   Kevin_C   1050087 升級二代
    //var pi_index = Number(document.all["lbSEQ_NO"].innerText);
    var pi_index = Number(document.all["lbSEQ_NO"].textContent);

    if (document.all.cbSELECT.checked) { pType = '1' }
    else { pType = '0' }

    if (pi_index == 1) { pStr1 = '' }
    else { pStr1 = pStr.substring(0, pi_index - 1) }
    pStr2 = pStr.substring(pi_index, pStr.length)

    pStr = pStr1 + pType + pStr2
    //SaveCookie(argCookie_nm,pStr)
    document.all[argCookie_nm].value = pStr;
    //1010327	Leslie	修正由AKI888開啟時會發生錯誤的問題，因來源頁面可能為其他系統頁面(經AKI888開啟)，故以Try-Catch處理
    try
    {
        if (opener && opener.document.all[argCookie_nm])
            opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
    } catch (e) { }
}

/****************************************************************
 name: ClearPageItem
 desc: 不選本頁的checkbox，並回存cookie
****************************************************************/
function ClearPageItem(argCookie_nm, argPageBeg, argPagesize, argSender)
{
    //pStr  = ReadCookie(argCookie_nm)
    var pStr = document.all[argCookie_nm].value;
    pStr1 = ''
    pStr2 = ''
    pType = PadR('', argPagesize, '0')
    pIdx = 0

    if (argPageBeg == 1) { pStr1 = '' }
    else { pStr1 = pStr.substring(0, argPageBeg - 1) }
    pStr2 = pStr.substring(argPageBeg + 9, pStr.length)

    pStr = pStr1 + pType + pStr2
    //SaveCookie(argCookie_nm,pStr)
    document.all[argCookie_nm].value = pStr;
    opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;

    if (argSender.length > 1)
    {
        while (pIdx < argSender.length)
        {
            argSender[pIdx].checked = false
            pIdx++
        }
    }
    else { argSender.checked = false }
}

/*****************************************************************
 name: SelectPageItem
 desc: 選取本頁的checkbox，並回存cookie
*****************************************************************/
function SelectPageItem(argCookie_nm, argPageBeg, argPagesize, argSender)
{
    //pStr  = ReadCookie(argCookie_nm)
    var pStr = document.all[argCookie_nm].value;
    pStr1 = ''
    pStr2 = ''
    pType = PadR('', argPagesize, '1')
    pIdx = 0

    if (argPageBeg == 1) { pStr1 = '' }
    else { pStr1 = pStr.substring(0, argPageBeg - 1) }
    pStr2 = pStr.substring(argPageBeg + 9, pStr.length)

    pStr = pStr1 + pType + pStr2
    //SaveCookie(argCookie_nm,pStr)
    document.all[argCookie_nm].value = pStr;
    opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;

    if (argSender.length > 1)
    {
        while (pIdx < argSender.length)
        {
            argSender[pIdx].checked = true
            pIdx++
        }
    }
    else { argSender.checked = true }
}

/********************************************
 name: ClearAllItem
 desc: 不選全部的checkbox，並回存cookie
********************************************/
function ClearAllItem(argCookie_nm, argSender)
{
    pIdx = 0

    //pStr = ReadCookie(argCookie_nm)
    pStr = document.all[argCookie_nm].value;

    if (pStr != null)
    {
        //SaveCookie(argCookie_nm,PadR('',pStr.length,'0'))
        document.all[argCookie_nm].value = PadR('', pStr.length, '0');
        opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
    }
}

/*********************************************
 name: SelectAllItem
 desc: 選取全部的checkbox，並回存cookie
*********************************************/
function SelectAllItem(argCookie_nm)
{
    //pStr = ReadCookie(argCookie_nm)
    pStr = document.all[argCookie_nm].value;

    if (pStr != null)
    {
        //SaveCookie(argCookie_nm,PadR('',pStr.length,'1'))
        document.all[argCookie_nm].value = PadR('', pStr.length, '1');
        opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
    }

    document.all["cbSELECT"].checked = true;

}

/********************************************************************
 name: SelectReverseItem
 desc: 反向選取checkbox，並回存cookie
********************************************************************/
function SelectReverseItem(argCookie_nm)
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
    opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;

    document.all["cbSELECT"].checked = !document.all["cbSELECT"].checked;
}

/********************************************************************
 name: SelectRangeItem
 desc: 處理選擇範圍內的checkbox，並回存cookie
********************************************************************/
function SelectRangeItem(argCookie_nm, argIndex, argBegnum, argEndnum, argType)
{
    argBegnum = parseInt(argBegnum)
    argEndnum = parseInt(argEndnum)

    //var pStr  = ReadCookie(argCookie_nm)
    var pStr = document.all[argCookie_nm].value;
    var pStr1 = ''
    var pStr2 = ''
    var pType = PadR('', argEndnum - argBegnum + 1, argType)

    var pIdx = 0

    if (argBegnum == 1) { pStr1 = '' }
    else { pStr1 = pStr.substring(0, argBegnum - 1) }

    if (argEndnum == (pStr.length)) { pStr2 = '' }
    else { pStr2 = pStr.substring(argEndnum, pStr.length) }

    pStr = pStr1 + pType + pStr2

    //SaveCookie(argCookie_nm,pStr)
    document.all[argCookie_nm].value = pStr;
    opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;

    pIdx = 0

    //2016.07.07   Kevin_C   1050087 升級二代
    //pi_SEQ=Number(document.all["lbSEQ_NO"].innerText);
    pi_SEQ = Number(document.all["lbSEQ_NO"].textContent);
    if (argBegnum <= pi_SEQ && argEndnum >= pi_SEQ)
    {
        document.all["cbSELECT"].checked = argType == 1 ? true : false;
    }
}

/***********************************************************
 name : CallSel
 desc : 開啟選取提示子視窗
***********************************************************/
function CallSel(argCookie_nm, argRecCount, argIndex)
{
    var screen_height = window.screen.height
    var screen_width = window.screen.width
    var subwin_height = 140
    var subwin_width = 250
    var subwin_top = (screen_height - subwin_height) / 2
    var subwin_left = (screen_width - subwin_width) / 2

    //  OPTIONS //
    var pDir = "directories=no"
    var pLcn = "location=no"
    var pMenu = "menubar=no"
    var pStatus = "status=no"
    var pTool = "toolbar=no"
    var pScroll = "scrollbars=no"
    var pResize = "resizable=no"
    var pHeight = "height=" + subwin_height
    var pWidth = "width=" + subwin_width
    var pTop = "top=" + subwin_top
    var pLeft = "left=" + subwin_left

    var pUrl = "Range.aspx?gCookie_nm=" + argCookie_nm + "&gRecCount=" + argRecCount + "&gIndex=" + argIndex;

    var pOption = pDir + ',' + pHeight + ',' + pLcn + ',' + pMenu + ',' + pStatus + ','
        + pTool + ',' + pScroll + ',' + pResize + ',' + pWidth + ',' + pTop + ',' + pLeft

    selWin = window.open(pUrl, "selWin", pOption)

    selWin.focus()
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

/**************************************
 name : UpperCase
 param: 動作物件: Text
 rtn  : none
 desc : 將 TEXT 物件的內容值轉為大寫
**************************************/
function UpperCase(argObj)
{
    if (argObj.value.length != 0) { argObj.value = argObj.value.toUpperCase() }
}

/*************************************
 name : SelDDMenu
 param: 動作物件: DropDownMenu
        比較值  : String
 rtn  : none
 desc : 根據傳入值選取DropDownMenu值
*************************************/
function SelDDMenu(argObj, argVal)
{
    var pIdx = 0

    for (pIdx = 0; pIdx < argObj.length; pIdx++)
    {
        if (argObj.options[pIdx].value == argVal)
        {
            argObj.options.selectedIndex = pIdx
            return
        }
    }
}

/************************************************
 name : ChangeRage
 param: 欲移至的頁碼
        頁碼: Text/HIDDEN
        上述物件隸屬的FORM: FORM
 rtn  : none
 desc : 切換至 summary 的新頁面
************************************************/
function ChangePage(argPagePos, argPage, argForm)
{
    argPage.value = argPagePos
    argForm.submit()
}

/******************************************************************
 name : ChangeRec
 param: 目前頁碼
        欲移至的記錄碼
        頁碼: Text/HIDDEN
        記錄碼: Text/HIDDEN
        上述物件隸屬的FORM: FORM
 rtn  : none
 desc : 切換至 detail  的新頁面
******************************************************************/
function ChangeRec(argPagePos, argRecPos, argPage, argRec, argForm)
{
    argPage.value = argPagePos
    argRec.value = argRecPos
    argForm.submit()
}

function HiddenRow(Ishide)
{
    if (Ishide == true)
        document.all.RowAttInfo.style.display = "none";
    else
        document.all.RowAttInfo.style.display = "";
}

function HidRow(Ishide)
{
    if (Ishide == true)
        document.all.RowBorInfo.style.display = "none";
    else
        document.all.RowBorInfo.style.display = "";
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //2016.07.07   Kevin_C   1050087 升級二代
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

//1050616 Cloud	1050087	升級二代-此函式根本無用mark
/*
function OpenUnv()
{
    if(document.all.txUnvFile.value =="") return;
	
    DownLoadByHttpTrans();
	
    var oShell = new ActiveXObject("Shell.Application");
    var param = "";
    //var param = " /filename="+strPath + " /userid=frank /stampPath="+pPath+"\\StampBox.xml" ;
    var commandtoRun = document.all.txUnvFileLocal.value;
    oShell.ShellExecute(commandtoRun, param, "", "", "0");
	
    document.all.txUnvFile.value =""; //reset
}*/

function DownLoadByHttpTrans()
{
    //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
    //document.all.dnFile.Servername = document.all["txServerName"].value; 
    var strWebService = document.all["txServerName"].value;
    if (document.all.II_USE_SSL != null)
    {
        if (document.all.II_USE_SSL.value == "Y")
            strWebService = strWebService.replace("http://", "https://");
    }
    document.all.dnFile.Servername = strWebService;

    document.all.dnFile.Port = document.all["txServerPort"].value;
    document.all.dnFile.displayProgress = true;

    var strFile = document.all.txUnvFile.value;
    document.all.dnFile.addItem(strFile);

    if (document.all.dnFile.download() == 0)
    {
        document.all.dnFile.resetItem();
        window.status = "下載完畢!";
    }
    else
    {
        document.all.dnFile.resetItem();
        alert("下載失敗!\n" + document.all.dnFile.ErrorString);
        window.status = "下載失敗!";
    }
}

function DownloadDocument()
{
    //1050616 Cloud	1050087	升級二代-改為使用二代模組使用
    /*var artifact = document.all.Artifact.value;
    var strDocNo = document.all["lbDOC_NO"].innerText;
    var ret;
    ret = document.all.ocx.SetTargetUser(artifact);
    if(ret==false)
    {
        alert("使用者權杖(Artifact) 驗證失敗，無法執行文稿調閱");
        return;
    }
    GetTempPath();
	
    ret =document.all.ocx.DownloadDocument3(	artifact,document.all["txOrgNo"].value,strDocNo,uClientPath);
        	
    if(ret)
        OpenEdit(strDocNo);
    else
        alert("歷史檔案未提供文稿調閱功能");*/
	//1140619	Leslie[1131121]	修正97年DTD可支援以純紙本方式開啟文稿編輯
	var sSignType = ($('#lbSignType').text() == "紙本簽核") ? "P" : "E";
	
    // 2017.07.27   CLOUD   1060645 增加判斷系統參數，公文產生日期小於系統參數公文不可使用線上瀏覽及文稿編輯
    if (document.all.IS97DTD && document.all.IS97DTD.value == "Y")
    {
		//1140619	Leslie[1131121]	修正97年DTD可支援以純紙本方式開啟文稿編輯
        //alert('此公文屬97法規版本，不可開啟文稿編輯');
        //return;
		if(sSignType == 'E')
			sSignType = 'P';	//強制改成紙本模式
    }
    //1050913	Leslie	以二代模組開啟
    try
    {
		//1140619	Leslie[1131121]	修正97年DTD可支援以純紙本方式開啟文稿編輯，移到前面去
        //var sSignType = ($('#lbSignType').text() == "紙本簽核") ? "P" : "E";
        //1051031	Leslie	修正紙本因尚無影像，造成無法開啟文稿編輯之問題
        var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
        unvSrc = unvSrc.replace('#artifact#', document.all.Artifact.value);
        unvSrc = unvSrc.replace('#DocNo#', document.all["lbDOC_NO"].innerText);
        unvSrc = unvSrc.replace(/#SourceOrgNo#/g, document.all["txOrgNo"].value);
        var objViewDoc = {
            UNVObj: JSON.parse(unvSrc),
            docInfoPage: "AKI802",
            openDocModule: 'AOL',
            signType: sSignType,
            readOnlyMode: false,
            disableSave: true
        };
        var $docId = jf_GetSessionID() + "_" + (+new Date());
        localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
        var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + document.all.Artifact.value + "&DocId=" + $docId;
        jf_OpenChildWin(unvUrl, "AKI802ViewDoc");
        /*var wsUrl = GetSSOPage().theWebServices.url('fileiows');
        var param = [];
        param[0] = document.all.Artifact.value;;
        param[1] = document.all["lbDOC_NO"].innerText;
        param[2] = document.all["txOrgNo"].value;

        var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
        if (!rtnObj.error) {
            if (rtnObj.value.m_bSuccess) {
                var sUnvObj = rtnObj.value.RtnStr;
                if (sUnvObj !== "") {
                    var UnvObj = JSON.parse(sUnvObj);
                    var objViewDoc = {
                        UNVObj: UnvObj,
                        docInfoPage: "AKI802",
                        openDocModule: 'AOL',
                        signType: sSignType,
                        readOnlyMode: false,
                        disableSave: true
                    };
                    var $docId = jf_GetSessionID() + "_" + (+new Date());
                    localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                    var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + param[0] + "&DocId=" + $docId;
                    jf_OpenChildWin(unvUrl, "AKI802ViewDoc");
                }
            }
            else{
                alert(rtnObj.value.m_strErrMsg);
            }
        }
        else{
            alert(rtnObj.error.errorDetail.string)
        }*/
        //1051031	Leslie	修正紙本因尚無影像，造成無法開啟文稿編輯之問題	--END--
    } catch (e)
    {
        alert('開啟失敗');
    }
}

//95.11.07 955179 David 電子來文開啟功能
function OpenElcFile()
{
    var artifact = document.all.Artifact.value;
    //2016.07.07   Kevin_C   1050087 升級二代
    //var strDocNo = document.all["lbDOC_NO"].innerText;
    var strDocNo = document.all["lbDOC_NO"].textContent;
    //1050926	Leslie	改用新版程式開啟
    /*
    var ret;
    ret = document.all.ocx.SetTargetUser(artifact);	
    if(ret==false)
    {
        alert("使用者權杖(Artifact) 驗證失敗，無法查看來文電子檔");
        return;
    }
    //2013.12.18	Cloud	[1021003]	開啟來文電子時增加寫入紀錄檔
    //2014.02.05	Cloud	[1021003]	增加寫入DESC
    //AKI802.InsetSysUse(document.all["nOrgID"].value,strDocNo,document.all["H_FILE_CLS"].value,"ATWEB","來文電子檔","AT")
    // 2014.02.05	Cloud	1021003	修正傳錯參數的bug
    //var strerr =  AKI802.InsetSysUse(document.all["nOrgID"].value,strDocNo,document.all["H_FILE_CLS"].value,"ATWEB","來文電子檔","AT","來文電子調閱",document.all.Artifact.value)
    //2014.12.05	Cloud	因net4.0環境使用舊版ajax元件設定可讀寫session時會出現異常，修改使用新版ajax元件
    //AKI802.InsetSysUse(document.all["nOrgID"].value,strDocNo,document.all["H_FILE_CLS"].value,"ATWEB","來文電子檔","AT","來文電子調閱",document.all.SessionID.value)
    try
    {
        AK.AKI802.InsetSysUse(document.all["nOrgID"].value,strDocNo,document.all["H_FILE_CLS"].value,"ATWEB","來文電子檔","AT","來文電子調閱",document.all.SessionID.value)
    }
    catch(e)
    {}
	
    var AT21_SrvName = document.all.ocx.GetEnvSet("AT21_SVRNAME");
    var AT21_VirPath = document.all.ocx.GetEnvSet("AT21_VIRPATH");
    var SYSID = document.all["txSysid"].value;
    var UrlPath = "http://"+AT21_SrvName+"/"+AT21_VirPath+"/ATI011.aspx?kv1="+SYSID+"&kv2=od"+"&SAMLart="+document.all.Artifact.value;	
    jf_OpenChildWin(UrlPath,"ATI011",750,450);	
    */
    try
    {
        AK.AKI802.InsetSysUse(document.all["nOrgID"].value, strDocNo, document.all["H_FILE_CLS"].value, "ATWEB", "來文電子檔", "AT", "來文電子調閱", document.all.SessionID.value)
    }
    catch (e)
    { }
    var SYSID = document.all["txSysid"].value;
    var UrlPath = document.all["hWS_ED_SITE"].value + "/ED0/EDI011.aspx?kv1=" + SYSID + "&kv2=od" + "&SAMLart=" + artifact;
    jf_OpenChildWin(UrlPath, "EDI011");
    //1050926	Leslie	改用新版程式開啟	--END--
}

//0970919 Leo 聯合大學新增瀏覽舊公文頁面
//0971215 Leo 0970815 花港局 開啟花港局的查詢頁面
function OpenOldInfoPage()
{
    var artifact = document.all.Artifact.value;
    //2016.07.07   Kevin_C   1050087 升級二代
    //var strDocNo = document.all["lbDOC_NO"].innerText;
    var strDocNo = document.all["lbDOC_NO"].textContent;
    var ret;
    /*ret = document.all.ocx.SetTargetUser(artifact);	
    if(ret==false)
    {
        alert("使用者權杖(Artifact) 驗證失敗，無法查看舊公文資訊");
        return;
    }*/

    var UrlPath = "";
    // 2013.05.31	Cloud	1000751	修改以機關別稱判斷使用機關
    //switch(document.all["txOrgNo"].value)
    switch (document.all["H_txOrgNickName"].value)
    {
        //0990527 Jim 0990347 新增雲科大機關代碼
        // 2013.05.31	Cloud	1000751	修改以機關別稱判斷使用機關
        //case "310060000Q"://雲科大
        //case "392350000Q"://聯合大學
        case "YUNT"://雲科大
        case "NUU"://聯合大學
            UrlPath = "AKI808.aspx?DocNo=" + strDocNo + "&SAMLart=" + document.all.Artifact.value;
            break;
        // 2013.05.31	Cloud	1000751	修改以機關別稱判斷使用機關
        //case"315220000M"://花港局
        case "HLHB"://花港局
            if (document.all.OtherODPage.value)
            {

                UrlPath = document.all.OtherODPage.value + "?DocNo=" + strDocNo + "&SAMLart=" + document.all.Artifact.value;
            }
            else
            {
                alert("無法取得公文系統電子檔案");
                return;
            }
            break;
    }

    jf_OpenChildWin(UrlPath, "AKI808", 750, 450);
}

//1070731 Zen 1070678 弱掃Hardcoded Absolute Path修正
//function OpenEdit(argDocNo)
//{
//	//96.02.13 000256 David Maked
//	//var EditPath = "file:///C:/2100/公文製作/MainCtrl.html?MODE=2&ID="+document.all["USERNAME"].value +"&PW="+document.all["Artifact"].value+"&ReadOnly=Yes&Action=Open&Location=";
//	var EditPath = "";

//	//96.02.12 000256 David
//	EditPath = "file:///C:/2100/公文製作/MainCtrl.html?"+QueryStr(argDocNo);

//	//找尋是否有製作檔 FOLDER = 文號-00-99
//	var IsFolderExist = false;
//	// 公文製作檔目錄
//	var pDocFolder = uClientPath + "\\" + argDocNo + "-00-99";
//    //1040730   Cloud   [1030160] 修改for外陳外會，增加判斷doc_extra.ComeOthers欄位開啟公文製作時取得稿件路徑增加機關代碼
//	if(document.all.IsComeOthers)//他機關外陳外會公文
//	    pDocFolder = uClientPath + "\\" + argDocNo + "-" + document.all["txOrgNo"].value + "-00-99";

//	if(fso.FolderExists(pDocFolder))
//		IsFolderExist = true;
//	if(IsFolderExist)
//	{
//		//96.02.13 000256 David Marked 網址參數已在上方指定完畢
//		/*
//		while(pDocFolder.indexOf("\\") != -1)
//		{
//			pDocFolder = pDocFolder.replace("\\","/");
//		}
//		EditPath += pDocFolder + "/";
//		*/
//		try
//		{
//			//96.02.13 000256 David Marked 網址參數已在上方指定完畢
//		    //EditPath +="&OrgID="+document.all.nOrgID.value;
//		    //2014.12.05	Cloud	因net4.0環境使用舊版ajax元件設定可讀寫session時會出現異常，修改使用新版ajax元件    
//		    AK.AKI802.InsetSysUse(document.all["nOrgID"].value,argDocNo,document.all["H_FILE_CLS"].value,"WEBEDIT","文稿編輯","WE","文稿編輯調閱",document.all.SessionID.value)
//			if(document.all.ocx.GetEnvSet("AKI802_WEBEDIT_BY_SHELL")=="Y")
//			{
//				//caesar 0940519 避免XP SP2問題
//				//改以ShellExecute開啟公文製作


//				var oShell = new ActiveXObject("Shell.Application");
//				var strFeature = "";
//   				var strWidth = "";	
//   				var strHeight = "";
//   				var strWinName = "";
//				//Stella 修改會出現IE網址列問題
//				var param = "file:///C:/2100/SSO/Medium.html?Feature="+strFeature+"&TargetUrl="+ escape(encodeURIComponent(EditPath))+"&WinName="+strWinName+"&Feature="+strFeature+"&Width="+strWidth+"&Height="+strHeight;
//				var commandtoRun ="";
//				//0960616 000232 Caesar 修正於IE7.0環境下,以ShellExecute執行Iexplore.exe時
//				//		所傳入指址參數無法於網頁中正確取得,修正將參數先寫入C:\2100\sso\WebEdit.TXT中.
//				//		再於開啟時讀取之				
//				var fsolog = new ActiveXObject("Scripting.FileSystemObject");
//				var pLogFile = fsolog.CreateTextFile("c:\\2100\\SSO\\WebEdit.TXT",true);
//				pLogFile.write(param);
//				pLogFile.close();
//				//
//				oShell.ShellExecute("IEXPLORE.EXE", param, null, null, "0");
//			}
//			else
//			{
//				uEditWin = jf_OpenChildWin(EditPath);
//				uTimerID = setInterval("WaitClose();",500);
//			}
//			// 2013.12.18	Cloud	[1021003]	增加ajax開啟公文製作時，增加寫入紀錄檔
//		    //2014.02.05	Cloud	[1021003]	增加寫入DESC
//		    //2014.12.05	Cloud	因net4.0環境使用舊版ajax元件設定可讀寫session時會出現異常，修改使用新版ajax元件
//			//AKI802.InsetSysUse(document.all["nOrgID"].value,argDocNo,document.all["H_FILE_CLS"].value,"WEBEDIT","文稿編輯","WE")


//		}
//		catch(e)
//		{
//			alert(e.message);
//			DeleteTmpFolder();
//		}
//	}
//	else
//	{
//		alert("公文製作檔不存在");
//		DeleteTmpFolder();
//	}

//}

//96.02.12 000256 David 仿照ODC010 登入公文製作 採線上模式
function QueryStr(argDocNo)
{
    var pQueryStr = "";
    //pQueryStr += "&Action=NEW";
    pQueryStr += "&Action=Open"; //開啟舊稿件應該是使用Open而不是New #2007.04.13 Andy
    var gWebDocDir = uClientPath + "\\" + argDocNo + "-00-99\\";
    while (gWebDocDir.indexOf("\\") != -1)
    {
        gWebDocDir = gWebDocDir.replace("\\", "/");
    }
    pQueryStr += "&LOCATION=" + gWebDocDir + "&WSREQUEST=NO&DOCNO=" + argDocNo;
    var ws_loacation = document.all.ocx.GetEnvSet("OD_WS_LOCATION");
    pQueryStr += "&WSDL4USERINFO=" + ws_loacation;
    pQueryStr += "&MODE=3";
    pQueryStr += "&ID=" + document.all["USERNAME"].value + "&PW=" + document.all["Artifact"].value;
    pQueryStr += "&OrgID=" + document.all.nOrgID.value;
    //以下為參考用Code，ODC010有~但於此傳出之參數經測試可不用傳入以下資訊
    /*pQueryStr += "&USERNAME=DAVID";
    pQueryStr += "&USERCOLOR=0";
    pQueryStr += "&SIGNTYPE=P";
    pQueryStr += "&OrgID=301060000C";
    pQueryStr += "&OrgName=內政部消防署";
    pQueryStr += "&DepartID=011";
    pQueryStr += "&DepartName=秘書室"*/
    pQueryStr += "&ReadOnly=Yes";//[0970321]Add by Cola 額外傳入唯讀參數
    //0980106	Leslie[0971140]	增加傳入正確的簽核類型
    var strSignType = "P";
    //2016.07.07   Kevin_C   1050087 升級二代
    //if(document.all["lbSignType"].innerText == "線上簽核")
    if (document.all["lbSignType"].textContent == "線上簽核")
        strSignType = "E";
    pQueryStr += "&SignType=" + strSignType;
    return pQueryStr;
}

function GetTempPath()
{
    var x;
    var e = new Enumerator(fso.Drives);
    while (!e.atEnd())
    {
        x = e.item();
        if (x.DriveType == 2)
            break;
        e.moveNext();
    }
    //0990107 Albert 0990009 將點選"文稿編輯"時，暫存目錄改到2100目錄下
    //uClientPath = x.DriveLetter + ":\\AKI802_EDIT_TMP";
    uClientPath = x.DriveLetter + ":\\2100\\AKI802_EDIT_TMP";
    if (!fso.FolderExists(uClientPath))
        fso.CreateFolder(uClientPath)
}

function WaitClose()
{
    if (uEditWin.closed) 
    {
        clearInterval(uTimerID);
        DeleteTmpFolder();
    }
}

function DeleteTmpFolder()
{
    if (fso.FolderExists(uClientPath))
        fso.DeleteFolder(uClientPath);
}
//[0970387]Add by Cola限制AKI801不能按下Ctrl+N
function KeyDown()
{
    if ((event.ctrlKey) && (event.keyCode == 78))
        event.returnValue = false;
}
//0980825 Albert 0980467 計算勾選公文數量是否超過AKT800可顯示數量
function IsOverAKT800DgSize()
{
    //* 1110815      Cloud   1110517 修改調案檢核訊息可自訂
    //var AKT800DgSize = document.all["H_txAKT800DgSize"].value;
    var AKT800DgSize = document.all["H_txAKT800DgSize"].value.split('|')[0];
    var AKT800DgMsg = document.all["H_txAKT800DgSize"].value.split('|')[1];
    var count = 0;
    var pStr = document.all["DOC_CHECK"].value;
    var pos = pStr.indexOf('1');
    while (pos != -1)
    {
        count++;
        pos = pStr.indexOf('1', pos + 1);
    }
    if (count > AKT800DgSize)
    {
        //* 1110815      Cloud   [1110517]         修改調案檢核訊息可自訂
        if (AKT800DgMsg != "")
            alert(AKT800DgMsg);
        else
            alert('每張調案單最多只能調閱 ' + AKT800DgSize + ' 筆');
        //* 1110815      Cloud   [1110517]         修改調案檢核訊息可自訂
        Page_BlockSubmit = true;
        return true;
    }
}

//0990727	Leslie[0990148]	處理點選「解密電子檔」功能鍵，顯示下載子視窗
//1120605	Leslie[1120361]	修正Client Potential Code Injection弱點，把舊的Code全Mark掉
/*var LiHTML = "";
function OpenDownLoadPage()
{
    var cDlObj = new cDLpara();
    //2014.12.05	Cloud	因net4.0環境使用舊版ajax元件設定可讀寫session時會出現異常，修改使用新版ajax元件
    //var FileList = AKI802.GetDeSecretFile(document.all["Artifact"].value,document.all["nOrgID"].value,document.all["lbDOC_NO"].innerText).value;
    //2016.07.07   Kevin_C   1050087 升級二代
    //var FileList = AK.AKI802.GetDeSecretFile(document.all["Artifact"].value,document.all["nOrgID"].value,document.all["lbDOC_NO"].innerText).value;
    var FileList = AK.AKI802.GetDeSecretFile(document.all["Artifact"].value,document.all["nOrgID"].value,document.all["lbDOC_NO"].textContent).value;
    if(FileList.indexOf('ERR') != -1)
    {
        alert(FileList);
        return;
    }
    //alert(FileList);
    var arrFile = FileList.split('::');
	
    var w = 280,h = 180;
    var popObj = window.createPopup();
    var strLiHTML = '<li><a onclick="javascript:cDlObj.DownLoad(\'$FileName$\')" style="cursor: hand;"><FONT color="#0000ff"><U>$FileName$</U></FONT></a></li>';
	
    for(var i=0;i<arrFile.length;i++)
    {
        cDlObj.LiHTML += strLiHTML.replace(/\$FileName\$/g,arrFile[i]);	
    }
    window.showModalDialog("AKI802DL.htm", cDlObj, "dialogWidth: 700 px;dialogHeight:500px")
}

function DownLoadFile(FileName)
{
    //下載檔案	
    //2014.12.05	Cloud	因net4.0環境使用舊版ajax元件設定可讀寫session時會出現異常，修改使用新版ajax元件
    //var url = AKI802.DownLoadFile(document.all["nOrgID"].value,document.all["lbDOC_NO"].innerText,FileName);
    //2016.07.07   Kevin_C   1050087 升級二代
    //var url = AK.AKI802.DownLoadFile(document.all["nOrgID"].value,document.all["lbDOC_NO"].innerText,FileName);
    var url = AK.AKI802.DownLoadFile(document.all["nOrgID"].value,document.all["lbDOC_NO"].textContent,FileName);
    if(url.value.indexOf('ERR') != -1)
    {
        alert(url.value);
        return;
    }
    eval(url.value);
}
//0990727	Leslie[0990148]	END

//0991011	Leslie	用於傳入下載子視窗之物件，後續由子視窗中被點選時，直接叫用物件中的DownLoad()，即可間接叫用到DownLoadFile()函式
function cDLpara()
{
    this.LiHTML = "";
    this.DownLoad = DownLoadFile;
}
//1010419	Leslie	國合會退單處理，於開啟AKI802時增加檢核是否已有公文系統首頁
function EnablebtWebEdit()
{	
    var ret;
        ret = document.all.ocx.SetTargetUser(document.all.Artifact.value);
    if(ret != false)
    {
        window.focus();
        document.all["btOpenEdit"].disabled = false;
        clearInterval(uTimerMainPage);
    }
}
*/	//1120605	Leslie[1120361]	修正Client Potential Code Injection弱點，把舊的Code全Mark掉	==END==
//1031114 Gabby[1030792] 關閉前將Client端C:\2100\AKI802_EDIT_TEMP的暫存檔清除
/*function window.onbeforeunload(){
   DeleteTmpFolder();
}*/

//1050912	Leslie	[1050087]	升級二代，修正調案申請邏輯
function jf_btApply1Click()
{
    var sDocCheck = $('#DOC_CHECK').val();
    var rtn = AK.AKI802.btAPPLY1Click(jf_GetArtifact(), sDocCheck);
    if (rtn.value)
    {
        var arRtn = rtn.value;
        if (arRtn[3] != "")
            alert(arRtn[3]);
        else
        {
            //1130411 Cloud 1130054 判斷為銓敘部使用時，如線上簽核、個人檔外有可供申請公文，則依然開啟AKT800-S
            if (document.all['H_txOrgnickname'].value == 'MOCS')
            {
                if (arRtn[4] != "")
                    alert(arRtn[4]);
                if (arRtn[1] != "" || arRtn[2] != "")
                {
                    var strQueryString = ((arRtn[2] != "") ? "FILE_NO=" + arRtn[2] + "&" : "") + ((arRtn[1] != "") ? "DOC_NO=" + arRtn[1] + "&" : "") + "SAMLart=" + jf_GetArtifact();
                    jf_OpenChildWin(arRtn[0] + ".aspx?" + strQueryString, arRtn[0], window.screen.availWidth - 8, window.screen.availHeight - 54);
                }
            }
            //1130411 Cloud 1130054 判斷為銓敘部使用時，如線上簽核、個人檔外有可供申請公文，則依然開啟AKT800-E
            else
            {
                var strQueryString = ((arRtn[2] != "") ? "FILE_NO=" + arRtn[2] + "&" : "") + ((arRtn[1] != "") ? "DOC_NO=" + arRtn[1] + "&" : "") + "SAMLart=" + jf_GetArtifact();
                jf_OpenChildWin(arRtn[0] + ".aspx?" + strQueryString, arRtn[0], window.screen.availWidth - 8, window.screen.availHeight - 54);
            }
        }
    }
    else
        alert(rtn.error);
}

//1050726	Leslie	升級二代，呼叫母視窗函式
function CallBackByImgView()
{
    //1140611 Zen 1140166 修改支援AI分文
    if (typeof opener.CallBackByImgView === 'function')
    {
        return opener.CallBackByImgView();
    }
    else
    {
        return opener.parent.GetSSOPage().theSSO.MP.queryDocList.CallBackByImgView();
    }
}

//1100504 Zen 1100473 弱掃Client DOM XSS修正
function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

function OpenTAFile()
{
    var UrlPath = document.all["hWS_ED_SITE"].value + "/ED0/EDI011_MOCS.aspx?argGUID=" + $('#H_txTAGuid').val();
    jf_OpenChildWin(UrlPath, "EDI011_MOCS");
}

//1121120 Zen 1120634 (信保基金)修正勾選兩筆公文後申請調檔異常之問題
function GetSelectedCnt()
{
    var strDOC_CHECK = document.all['DOC_CHECK'].value;
    var regex = new RegExp('1', 'g');
    var matches = strDOC_CHECK.match(regex);
    return matches ? matches.length : 0;
}