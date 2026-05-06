/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號			概要
 * -------------------------------------------------------------------------------------------------
 * 97.04.23     Cola	0970387			限制AKI801不能按下Ctrl+N
 * 97.06.19		Cola	0970547			新增跳至某頁按鈕
 * 97.06.19		Cola	0970507			新增展期資訊按鈕
 * 97.11.27		Leslie	0971041			修改AKI801視窗開啟時為最大化
 * 98.02.27		Leslie	0980014			公文有副版影像時，提供超連結供使用者直接點選開啟
 * 98.05.22		Albert	0960123			開啟AKT800時，視窗與從系統選單開啟時大小相同
 * 98.08.25		Albert	0980467			執行"申請調檔"之前判斷是否選取公文超過AKT800可顯示數量
 * 98.12.03		Albert	0980336			調整jf_OpenChildWin輸入參數為四個
 * 99.09.08		Leslie	0990456			[CDC]新增條件列印及排序，增加處理邏輯
 * 100.01.21	Leslie	9000008			修改本作業可依系統參數「AK_AKI801_USED_NEW_DATAGRID」支援新舊版面，並修改所有"dgDETAIL"加上版本之變數strPageVer
 * 100.05.04	Davy	1000411			修正解析度為800*600時，會出現錯誤。
 * 100.05.19	Davy	1000397			於點選文號連結時增加傳入角色之網址參數，以避免回到本作業時顯示異常
 * 102.12.18	Cloud	1021003			增加寫入調檔、查詢時增加寫入紀錄檔	
 * 103.10.28	Kenny	1030836			配合SSL修改傳入元件之URL
 * 103.11.12	Kevin_C	1020726			於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 105.01.20    Kenny   1041039         開啟AKI802時增加傳入取得的網址參數
 * 105.04.14    Cloud   1050087         升級二代
 * 105.06.14    Cloud   1050087         升級二代
 * 105.07.22	Leslie	1050087			升級二代
 * 1051019   Joe		1050087		二代修正配合行動平台
 * 1061108		Kevin_C	1061069			AKI811增加併案類型欄位，增加AKI811子視窗寬度
 * 1070907		Cloud	--				修正相關案建會取得奇怪視窗的無ID按鈕，快解
 * 1100204      Zen     1090927         取消使用document.activeElement
 * 1100504      Zen     1100473         弱掃Client DOM XSS修正
 * 1110815      Cloud   1110517         修改調案檢核訊息可自訂
 * 1121120      Zen     1120634         (信保基金)修正勾選兩筆公文後申請調檔異常之問題
 * 1121206      Zen     1121052         (考試院)支援公文含電子檔時可直接點擊開啟聞稿編輯頁面
 * 1130411      Cloud   1130054         (銓敘部)判斷為銓敘部時，如仍有可申請調檔公文，則依然開啟AKT800
 * 1130930      Cloud   1130764         新增產生DFT400移交用公文EXCEL
 * 1131015      Zen     1130941         弱掃Client Dynamic File Inclusion修正
 * 1140609      Zen     1140147			支援顯示歷史公文流程功能
 * 1140611      Zen     1140166         修改支援AI分文
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;
//105.06.14    Cloud   1050087         升級二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1000121	Leslie	新增版本別變數，預設為舊版本
var strPageVer = "V1";
//105.04.14    Cloud   1050087         升級二代
/*if (document.all["ValidationSummary1"].innerText != "")
    alert(document.all["ValidationSummary1"].innerText);*/

//1050712	Leslie	升級二代，由此註冊相關案件的Event
$('a[id$="COMBINE"]:contains("有")').click(function ()
{
    jf_GetComBineDoc(this);
})

//1050712	Leslie	升級二代需求，由AKI800.js複製本段至此
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

function jf_MenuInit()
{
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
        /*
        case "":
            break;
        */
    }
}

//1050407 Cloud   1050087     升級二代
//function jf_ToolBarHandle(event)
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;
    var pPageNo = parseInt(document.all._PageNo.value);
    var pTotPage = parseInt(document.all._TotPage.value);
    //0980331	Leslie	修正"選取的筆數"應該是公文筆數，而不是"總頁數"
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    //105.04.14    Cloud   1050087         升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSELECTALL1":	// 全部勾選
            //JEFF 20060707 預防超過預設筆數全選
            //0980331	Leslie	修正"選取的筆數"應該是公文筆數，而不是"總頁數"
            //if (pTotPage > Number(document.all["_lbDefCnt"].value))
            if (pi_RecCnt > Number(document.all["_lbDefCnt"].value))
            {
                alert("超過系統設定之明細列印筆數上限" + document.all["_lbDefCnt"].value + "筆，不進行選取動作");
                return;
            }
            //1050615 Cloud	1050087	升級二代
            //SelectAllItem('DOC_CHECK', 2);
            SelectAllItem('DOC_CHECK', 2);
            Page_BlockSubmit = true;
            break;
        case "btUNSELECT1":		// 取消勾選
            //JEFF 20060707 預防超過預設筆數取消全選
            //0980331	Leslie	修正"選取的筆數"應該是公文筆數，而不是"總頁數"
            //if (pTotPage > Number(document.all["_lbDefCnt"].value))
            if (pi_RecCnt > Number(document.all["_lbDefCnt"].value))
            {
                alert("超過系統設定之明細列印筆數上限" + document.all["_lbDefCnt"].value + "筆，不進行選取動作");
                return;
            }
            //1050615 Cloud	1050087	升級二代
            //UnSelectAllItem('DOC_CHECK', 3);
            UnSelectAllItem('DOC_CHECK', 2);
            Page_BlockSubmit = true;
            break;
        case "btEXIT1":			// 離開
            ret = window.confirm("確定要離開本程式嗎？");
            Page_BlockSubmit = true;
            if (ret)
            {
                if (opener && !opener.closed)
                    if (opener.name == "AKI801")
                        opener.close();
                window.close();
            }
            //105.04.14    Cloud   1050087         升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDETAIL1":		// 顯示明細
            Page_BlockSubmit = false;
            //105.04.14    Cloud   1050087         升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
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
                //1110921	Leslie	應該不做PostBack
                Page_BlockSubmit = true;
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

            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                //1110921	Leslie	應該不做PostBack
                Page_BlockSubmit = true;
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
        case "btFIRSTPAGE1":	// 畫面切換到第一頁
        case "btPRIORPAGE1":	// 畫面切換到上一頁
        case "btNEXTPAGE1":		// 畫面切換到下一頁
        case "btLASTPAGE1":		// 畫面切換到最末頁
            Page_BlockSubmit = false;
            //105.04.14    Cloud   1050087         升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //[0970547]Add by Cola
        case "btSELECTPAGE":
            //105.06.15    Cloud   1050087         升級二代
            //if(document.all.tbTool.getItem(15).getAttribute("VALUE") == "")
            var strToPage = document.all["txSelectNumber"].value;
            var strLasttPage = document.all["txPage1"].value;
            if (strToPage == "")
            {
                alert("請於後方輸入欲跳至之頁數");
                Page_BlockSubmit = true;
            }
            //105.06.15    Cloud   1050087         升級二代
            //else if(parseInt(document.all.tbTool.getItem(15).getAttribute("VALUE")) > parseInt(document.all.tbTool.getItem(1).getAttribute("VALUE").split('/')[1]) || document.all.tbTool.getItem(15).getAttribute("VALUE") == "0" )
            else if (parseInt(strToPage) > parseInt(strLasttPage.split('/')[1]) || strToPage == "0" || parseInt(strToPage) < 0)
            {
                //105.06.15    Cloud   1050087         升級二代
                //alert("輸入之頁數必須介於 1 ~ "+document.all.tbTool.getItem(1).getAttribute("VALUE").split('/')[1]+" 之間");
                //document.all.tbTool.getItem(15).setAttribute("VALUE","");
                alert("輸入之頁數必須介於 1 ~ " + strLasttPage.split('/')[1] + " 之間");
                document.all["txSelectNumber"].value = "";

                Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = false;

            //105.04.14    Cloud   1050087         升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //Cola -- end --


        case "btPRINTDETAIL":
            pStr = document.all["DOC_CHECK"].value;
            var selCounter = 0;
            for (var i = 0; i < 2 * Number(document.all["_lbDefCnt"].value); i++)
            {
                if (pStr.substring(i, i + 1) == "1")
                    selCounter++;
            }

            //2006.07.03 JEFF 修改
            if (selCounter > Number(document.all["_lbDefCnt"].value))
            {
                alert("超過系統設定之明細列印筆數上限" + document.all["_lbDefCnt"].value + "筆，不進行列印動作");
                return;
            }
            if (pStr.indexOf('1') == -1)
            {
                //1110921	Leslie	應該不做PostBack
                Page_BlockSubmit = true;
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
        case "btPRINTLIST":
            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                //1110921	Leslie	應該不做PostBack
                Page_BlockSubmit = true;
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
        //[0970507]Add by Cola 新增展期資訊按鈕
        case "btEXTENT":
            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                //1110921	Leslie	應該不做PostBack
                Page_BlockSubmit = true;
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
        case "btExcel":
        //1130930      Cloud   1130764         新增產生DFT400移交用公文EXCEL
        case "btExcel2":
            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                //1110921	Leslie	應該不做PostBack
                Page_BlockSubmit = true;
                alert('請至少勾選一筆資料!!');
                return;
            }
            else
            {
                Page_BlockSubmit = false;
                //105.04.14    Cloud   1050087         升級二代
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
                IsServerHandling = false;

                //1050815	Leslie	升級二代，拿掉不合宜的UI控制
                /*for(var i=0;i<document.all.length;i++)
                {		
                    document.all[i].style.cursor = "";
                }
            	
                for(var i=0;i<document.all.tags("input").length;i++)
                {
                    if(document.all.tags("input")[i].type == "text")
                        document.all.tags("input")[i].readOnly = false;
                }
                window.status = "";*/
            }
            break;
        case "btCOND":
            //105.04.14    Cloud   1050087         升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function ChkParent()
{
    if (opener == null)
    {
        alert('因為查詢視窗已關閉，所以請重新查詢');
        Page_BlockSubmit = true;
        return false;
    }
    return true;
}

function SetDocNoList(pPageNo)
{
    var pPageSize = parseInt(document.all._PageSize.value);
    var pBegIdx = pPageSize * (pPageNo - 1);
    var strDocNoList = "";

    for (var i = 0; i < pPageSize; i++)
    {
        if ((pBegIdx + i) >= opener.document.all.dlDocNoList.length)
            break;
        strDocNoList += "," + opener.document.all.dlDocNoList.options[i + pBegIdx].value;
    }
    if (strDocNoList != "")
        strDocNoList = strDocNoList.substring(1, strDocNoList.length);
    document.all._DocNoList.value = strDocNoList;
    //alert(document.all._DocNoList.value);
}

var iCallID = 0;
var SumDocWin, SumComWin;
var DetDocWin, DetComWin;
var PDFWin;
var IsInit = true;




function getOpenerValue(key)
{
    if (IsInit)
    {
        document.all[key].value = opener.document.all[key].value;
        setSelect(key);
        IsInit = false;
    }
}

function setSelect(key)
{
    var Info = document.all[key].value;
    var flag;
    var ClientID;
    //1050620 Cloud	1050087 升級二代
    //var RowNo = 3;
    //var start = parseInt(document.all["dgDETAIL"+strPageVer+"__ctl3_hlSEQ_NO"].innerHTML)-1;	//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
    var RowNo = 2;
    var start = parseInt(document.all["dgDETAIL" + strPageVer + "__ctl2_hlSEQ_NO"].textContent) - 1;
    var end = start + 10;
    if (end > Info.length)
        end = Info.length;
    for (i = start; i < end; i++)
    {
        ClientID = "dgDETAIL" + strPageVer + "__ctl" + RowNo + "_cbSELECT";		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
        flag = Info.substr(i, 1);
        if (flag == "1")
            document.all[ClientID].checked = true;
        else
            document.all[ClientID].checked = false;

        RowNo++;
    }
}

function jf_OpenSumDocWin(sUrl)
{
    //0971128	Leslie	一併修正開啟AKI811及AKI812的行為
    //1061108	Kevin_C	1061069	增加併案類型欄位，增加子視窗寬度
    //SumDocWin = open("about:blank", "SumComWin", "fullscreen=no,Height=546,Width=800,Top=" + String((window.screen.height - 600) / 2) + ",Left=" + String((window.screen.width - 800) / 2) + ",Scrollbars=yes,titlebar=yes,status=yes,resizable=no");
    //1110919	Leslie	取消老舊的視窗設定
    //SumDocWin = open("about:blank", "SumComWin", "fullscreen=no,Height=546,Width=872,Top=" + String((window.screen.height - 600) / 2) + ",Left=" + String((window.screen.width - 872) / 2) + ",Scrollbars=yes,titlebar=yes,status=yes,resizable=no");
    SumDocWin = open("about:blank", "SumComWin", "fullscreen=no");
    SumDocWin.location = sUrl;
    //SumDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    //SumDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");

    SumDocWin.focus();

    //1110928	Leslie	修正子視窗可於登出時，一併被關閉
    var oOpener = GetSSOPage();
    if (oOpener.theStart)
        oOpener.theStart.ChildWin.push(SumDocWin);
}

function jf_OpenDetDocWin(sUrl)
{
    //1050913	Leslie	修正open()至原視窗的行為，改用location指定url，以避免視窗的opener錯亂
    //1131015 Zen 1130941 弱掃Client Dynamic File Inclusion修正
    //var sUrlHeader = window.location.origin;
    var sUrlFolder = window.location.pathname;
    //1100504 Zen 1100473 弱掃Client DOM XSS修正
    //window.location.href = sUrlHeader + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
    //1131015 Zen 1130941 弱掃Client Dynamic File Inclusion修正
    //window.location.href = HtmlEncode(sUrlHeader) + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
    window.location.href = sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
    //DetDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    //DetDocWin.focus();
}

function jf_OpenSumComWin(sUrl)
{
    SumComWin = open(sUrl, "SumComWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    SumComWin.focus();
}

function jf_OpenDetComWin(sUrl)
{
    DetComWin = open(sUrl, "SumComWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    DetComWin.focus();
}

function jf_OpenPDFWin(sUrl)
{
    PDFWin = open(sUrl, "PDFWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    PDFWin.focus();
}

//0980226	Leslie[0980014]	公文若有副版影像時，提供HyperLink供使用者直接點選開啟
//function jf_OII800Service(argUser,argWorkGrp,argDoc_no,argSource_orgno,argChkPriv)
var wsGetDocPdf = null;
function jf_GetDocPdf(argDoc_no)
{
    // 102.12.18	Cloud	[1021003]增加寫入調檔、查詢時增加寫入紀錄檔-增加傳入程式代碼，名稱
    //var param = new Array(1);
    var param = new Array(3);
    param[0] = String(argDoc_no);
    // 102.12.18	Cloud	[1021003]增加寫入調檔、查詢時增加寫入紀錄檔-增加傳入程式代碼，名稱
    param[1] = "AKI801";
    param[2] = "檔案目錄摘要瀏覽";
    callObj = jf_CallWS("lib/AK_LIB.asmx", "GetDocPdf", false, param);

    if (callObj.error)
    {
        alert(callObj.errorDetail.string);
    }
    else
    {
        if (callObj.value.ErrorClass.IsErr == true)
            alert(callObj.value.ErrorClass.ErrMessage[0].text);
        else
            jf_OpenPDFWin(callObj.value.RtnStr);
    }

    //service.useService("/OII800.asmx?WSDL","OII800");    
    //iCallID = service.OII800.callService("GetDocPdf", String(argUser), "", String(argWorkGrp), String(argDoc_no), String(argSource_orgno), String(argChkPriv));  
}

function OnWSResult()
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
function OpenWindow(sUrl)
{
    //oWindowID = open(sUrl,null,"fullscreen=yes");
    var pWidth = (screen.availWidth - 250) / 2;    //螢幕解析度之寬
    var pHeight = (screen.availHeight - 300) / 2;  //螢幕解析度之高  
    oWindowID = open(sUrl, "OII300C1", "width=230,height=280,top=" + pHeight + ",left=" + pWidth + "");
    oWindowID.focus();

    //moveBy(screen.width,screen.height);
}

function jf_OpenTreeWin(sUrl)
{
    TreeWin = open(sUrl, "AKI803", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    TreeWin.focus();
}
function jf_DETAIL(argSEQ_NO)
{
    jf_OpenDetDocWin("AKI802.ASPX?gRecCtn=" + document.all["_RecCtn"].value +
        "&gRecNo=" + String(argSEQ_NO) + "&gChkP=" + document.all["_ChkP"].value +
        "&gTotPage=" + document.all["_TotPage"].value +
        "&gPageSize=" + document.all["_PageSize"].value +
        "&DOC_CHECK=" + document.all["DOC_CHECK"].value.length +
        //1000397	Davy	
        //"&COM_CHECK="+document.all["COM_CHECK"].value);
        "&COM_CHECK=" + document.all["COM_CHECK"].value +
        //1050120    Kenny   [1041039]   增加傳入網址參數
        //"&gRoleNo="+document.all["txRoleNo"].value);
        "&gRoleNo=" + document.all["txRoleNo"].value +
        "&argSubject=" + document.all["H_txSubject"].value +
        "&argHideDept=" + document.all["H_txHideDept"].value);
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
function CallCal(argYr, argMn, argDy, argLang, argYrTp)
{
    screen_height = window.screen.height
    screen_width = window.screen.width
    subwin_height = 240
    subwin_width = 300
    subwin_top = (screen_height - subwin_height) / 2
    subwin_left = (screen_width - subwin_width) / 2

    //  ARGUMENTS //
    pYrObj = argYr
    pMnObj = argMn
    pDyObj = argDy
    pLang = argLang.toUpperCase()
    pYrTp = argYrTp.toUpperCase()

    pYr = argYr.value
    pMn = argMn.value
    pDy = argDy.value

    if (Trim(pYr) != '') { if (IsNum(pYr)) { pYr = parseInt(pYr) } }
    if (Trim(pMn) != '') { if (IsNum(pMn)) { pMn = parseInt(pMn) } }
    if (Trim(pDy) != '') { if (IsNum(pDy)) { pDy = parseInt(pDy) } }

    if (pYrTp == "ENY") { subwin_width = 250 }

    //  OPTIONS //
    pDir = "directories=no"
    pLcn = "location=no"
    pMenu = "menubar=no"
    pStatus = "status=no"
    pTool = "toolbar=no"
    pScroll = "scrollbars=no"
    pResize = "resizable=no"
    pHeight = "height=" + subwin_height
    pWidth = "width=" + subwin_width
    pTop = "top=" + subwin_top
    pLeft = "left=" + subwin_left

    pUrl = "lib/cal.htm"
    pOption = pDir + ',' + pHeight + ',' + pLcn + ',' + pMenu + ',' + pStatus + ',' + pTool + ',' + pScroll + ',' + pResize + ',' + pWidth + ',' + pTop + ',' + pLeft

    calWin = window.open(pUrl, "calWin", pOption)
    calWin.focus()
}

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
        if (!IsNum(pYr))
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
        if (!IsNum(pMn))
        {
            alert("月格式錯誤！")
            argMn.focus()
            return false
        }
        else
        {
            if ((parseFloat(pMn) > 12) || (parseFloat(pMn) < 1))
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
        if (!IsNum(pDy))
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
                if ((parseFloat(pYr) % 400 == 0) ||
                    ((parseFloat(pYr) % 4 == 0) && (parseFloat(pYr) % 100 != 0)))
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
            else if ((parseFloat(pMn) == 1) || (parseFloat(pMn) == 3) ||
                (parseFloat(pMn) == 5) || (parseFloat(pMn) == 7) ||
                (parseFloat(pMn) == 8) || (parseFloat(pMn) == 10) ||
                (parseFloat(pMn) == 12))
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
}

/*****************************************
 name: IsNum
 desc: 檢查字串是否為數字格式（含負數）
*****************************************/
function IsNum(argStr)
{
    pTmpChar = ''

    for (pIdx = 0; pIdx < argStr.length; pIdx++)
    {
        pTmpChar = argStr.substring(pIdx, pIdx + 1)

        if (pIdx == 0) { if (pTmpChar == '-') { continue } }

        if ((pTmpChar != '0') && (pTmpChar != '1') && (pTmpChar != '2') && (pTmpChar != '3') &&
            (pTmpChar != '4') && (pTmpChar != '5') && (pTmpChar != '6') && (pTmpChar != '7') &&
            (pTmpChar != '8') && (pTmpChar != '9'))
        { return false }
    }
    return true
}

/************************************
 name: PadL
 desc: 指定字元補足字串的左邊
************************************/
function PadL(sAString, bSize, cChar)
{

    var trimStr = Trim(sAString)
    var sAStringLen = trimStr.length
    var LeftStrLen = bSize - sAStringLen
    var LeftStr = ""

    for (i = 0; i < LeftStrLen; i++) 
    {
        LeftStr = LeftStr + cChar
    }
    return LeftStr + trimStr

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

    for (i = 0; i < StrLen; i++) 
    {
        argStr.substring(i, i + 1)
        trimStr = argStr.substring(i, i + 1)
        if ((trimStr == " ") && (i != StrLen)) { trimStr = "" }
        returnStr = returnStr + trimStr
    }
    return returnStr
}

/************************
 name: ReadCookie
 desc: 讀取cookie變數
************************/
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

/*******************************
 name: SaveCookie
 desc: 儲存cookie變數
*******************************/
function SaveCookie(name, value)
{
    document.cookie = name + '=' + escape(value)
}

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
    //1000121	Leslie	修改取得序號之方式，應避免使用固定長度
    //var pNo = xObjectName.substring(13,xObjectName.indexOf("_cbSELECT"));	
    var pNo = xObjectName.substring(xObjectName.indexOf("__ctl") + 5, xObjectName.indexOf("_cbSELECT"));

    //pStr  = ReadCookie(argCookie_nm);
    pStr = document.all[argCookie_nm].value;
    pStr1 = '';
    pStr2 = '';
    pType = 0;
    //105.04.14    Cloud   1050087         升級二代
    //var pi_index = Number(document.all["dgDETAIL"+strPageVer+"__ctl"+pNo+"_hlSEQ_NO"].innerText);		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
    var pi_index = Number(document.all["dgDETAIL" + strPageVer + "__ctl" + pNo + "_hlSEQ_NO"].textContent);

    //1100204 Zen 1090927 取消使用document.activeElement
    //if (document.activeElement.checked) { pType = '1'; }
    if (event.target.checked) { pType = '1'; }
    else { pType = '0' }

    if (pi_index == 1) { pStr1 = '' }
    else { pStr1 = pStr.substring(0, pi_index - 1) }
    pStr2 = pStr.substring(pi_index, pStr.length)

    pStr = pStr1 + pType + pStr2
    //SaveCookie(argCookie_nm,pStr)
    document.all[argCookie_nm].value = pStr;
    opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
}

/****************************************************************
 name: ClearPageItem
 desc: 不選本頁的checkbox，並回存cookie
****************************************************************/
function ClearPageItem(argCookie_nm, argPageBeg, argPagesize, argSender)
{
    //pStr  = ReadCookie(argCookie_nm)
    pStr = document.all[argCookie_nm].value;
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
    pStr = document.all[argCookie_nm].value;

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
        document.all[argCookie_nm].value = PadR('', pStr.length, '0');
        opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
    }
    //SaveCookie(argCookie_nm,PadR('',pStr.length,'0'))    	

}

/*********************************************
 name: SelectAllItem
 desc: 選取全部的checkbox，並回存cookie
*********************************************/
function SelectAllItem(argCookie_nm, argIndex)
{
    pIdx = 0
    //pStr = ReadCookie(argCookie_nm)
    pStr = document.all[argCookie_nm].value;

    if (pStr != null)
    {
        document.all[argCookie_nm].value = PadR('', pStr.length, '1');
        opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
        //SaveCookie(argCookie_nm,PadR('',pStr.length,'1'))
    }

    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);


    if (pi_RecCnt > 1)
    {
        while (pIdx < pi_PageSize)
        {
            //			alert("dgDETAIL"+strPageVer+"__ctl"+(argIndex+pIdx)+"_cbSELECT");
            //105.04.14    Cloud   1050087         升級二代
            //pi_SEQ=Number(document.all["dgDETAIL"+strPageVer+"__ctl"+(Number(argIndex)+pIdx)+"_hlSEQ_NO"].innerText);			//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
            pi_SEQ = Number(document.all["dgDETAIL" + strPageVer + "__ctl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].textContent);
            document.all["dgDETAIL" + strPageVer + "__ctl" + (argIndex + pIdx) + "_cbSELECT"].checked = true;		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
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
        document.all["dgDETAIL" + strPageVer + "__ctl" + argIndex + "_cbSELECT"].checked = true;			//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
    }


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
        opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
    }

    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {
        while (pIdx < pi_PageSize)
        {
            //			alert("dgDETAIL"+strPageVer+"__ctl"+(argIndex+pIdx)+"_cbSELECT");
            //105.04.14    Cloud   1050087         升級二代
            //pi_SEQ=Number(document.all["dgDETAIL"+strPageVer+"__ctl"+(Number(argIndex)+pIdx)+"_hlSEQ_NO"].innerText);			//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
            pi_SEQ = Number(document.all["dgDETAIL" + strPageVer + "__ctl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].textContent);			//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
            document.all["dgDETAIL" + strPageVer + "__ctl" + (argIndex + pIdx) + "_cbSELECT"].checked = false;		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
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
        document.all["dgDETAIL" + strPageVer + "__ctl" + argIndex + "_cbSELECT"].checked = false;			//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
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
    opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;

    pIdx = 0
    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {
        while (pIdx < pi_PageSize)
        {
            //105.04.14    Cloud   1050087         升級二代
            //pi_SEQ=Number(document.all["dgDETAIL"+strPageVer+"__ctl"+(Number(argIndex)+pIdx)+"_hlSEQ_NO"].innerText);		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
            pi_SEQ = Number(document.all["dgDETAIL" + strPageVer + "__ctl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].textContent);		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
            document.all["dgDETAIL" + strPageVer + "__ctl" + (argIndex + pIdx) + "_cbSELECT"].checked = !document.all["dgDETAIL" + strPageVer + "__ctl" + (argIndex + pIdx) + "_cbSELECT"].checked;		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer

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
        document.all["dgDETAIL" + strPageVer + "__ctl" + argIndex + "_cbSELECT"].checked = !document.all["dgDETAIL" + strPageVer + "__ctl" + argIndex + "_cbSELECT"].checked;			//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
    }
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

    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {
        while ((pIdx < pi_PageSize) && (pIdx < pi_RecCnt))
        {
            //105.04.14    Cloud   1050087         升級二代
            //pi_SEQ=Number(document.all["dgDETAIL"+strPageVer+"__ctl"+(Number(argIndex)+pIdx)+"_hlSEQ_NO"].innerText);		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
            pi_SEQ = Number(document.all["dgDETAIL" + strPageVer + "__ctl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].textContent);		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
            if (argBegnum <= pi_SEQ && argEndnum >= pi_SEQ)
            {
                document.all["dgDETAIL" + strPageVer + "__ctl" + (Number(argIndex) + pIdx) + "_cbSELECT"].checked = argType == 1 ? true : false;		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
            }
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
        document.all["dgDETAIL" + strPageVer + "__ctl" + argIndex + "_cbSELECT"].checked = argType == 1 ? true : false;		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
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

    //var pUrl    = "range.asp?gCookie_nm=" +argCookie_nm+ "&gRecCount=" + argRecCount+ "&gIndex=" + argIndex;	
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

function ClientOnLoad()
{
    //1070921	Leslie	配合IE畫面高度算法，直接加上100，以避免在各種解析度下去擋到最後一列
    //1081203	Leslie	針對IE的效能太慢，而可能會出現的時間差攻擊，延後執行設定GridDiv高度以避免有些電腦執行時出現異常
    // if("ActiveXObject" in window)
    // $('.GridDiv').height($('.GridDiv').height() + 100).attr('data-oldHeight',$('.GridDiv').height());
    if ("ActiveXObject" in window)
    {
        setTimeout(function () { $('.GridDiv').height($('.GridDiv').height() + 100).attr('data-oldHeight', $('.GridDiv').height()); }, 500)
    }

    //1050414 Cloud 1050087 升級二代
    jf_ShowValidator();
    //1000121	Leslie	取得設定值以決定版面版本
    if (document.all["h_IS_USED_NEW_DG"] && document.all["h_IS_USED_NEW_DG"].value.toUpperCase() == "TRUE")
        strPageVer = "V2";

    //0971127	Leslie[0971041]	直接視窗開到最大.....
    //resizeTo(screen.availWidth,screen.availHeight);
    //moveTo(0,0);
    if (window.screen.width < 801)	//Leslie	若使用者設定的解析度為800*600，重設主旨的長度為170，以免超出畫面
    {
        //1100218	Leslie[1090927]	配合跨平台修正
        $('.PopUp[id*="txFROM_SUBJECT"]').css('width', '170px')
        /*var len = document.all["dgDETAIL"+strPageVer].rows.length+2;		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer	//1000504 Davy[1000411] 前人只寫註解，沒有加上版本變數，與本單補上。
        for(var i=3;i<len;i++)
        {
            document.all["dgDETAIL"+strPageVer+"__ctl"+i+"_txFROM_SUBJECT"].style.width = "170px";		//1000121	Leslie[90000008]	dgDETAIL加上版本的變數strPageVer
        }*/
    }
    //leslie-end

    //[0970547]Add by Cola 設定回0，避免server無法正確判斷是否為按下enter
    document.all["txFlag"].value = "0";

    //1050712	Leslie	升級二代，經查不確定本段功能，暫時Mark
    //解決StartupScript問題 #2007.04.14 Andy
    /*if(document.all["CALL_DOC_CHECK"])
    {
        var s = document.all["CALL_DOC_CHECK"].value;
        if (s == "1")
        {
            getOpenerValue('DOC_CHECK');
            document.all["CALL_DOC_CHECK"].value = "";
        }
    }*/
    //1050712	Leslie	升級二代，經查不確定本段功能，暫時Mark	--END--

    //0980226	Leslie[0980014]	OII800早幾百年沒在用了，現在改到AK_LIB.asmx
    //jf_CallWS("OII800.asmx", "GetDocPdf", false, null);
    //1060523 Cloud 1050087 升級二代
    //jf_CallWS("lib/AK_LIB.asmx","GetDocPdf",false,null);
    //OpenUnv();

    //解決StartupScript問題 #2007.04.14 Andy
    //1050712	Leslie	升級二代，本段功能移除
    /*if(document.all["CALLAKI811"])
    {
        var s = document.all["CALLAKI811"].value;
        if (s != "")
        {
            //0971128	Leslie	一併修正開啟AKI811及AKI812的行為
            jf_OpenSumDocWin(s); //Matte 0961205
            //jf_OpenChildWin(s,'AKI811', 800, 530);
            document.all["CALLAKI811"].value = "";
        }
    }*/
    //1050712	Leslie	升級二代，本段功能移除	--END--

    //1050712	Leslie	升級二代，呼叫公文清單已準備完成，呼叫母視窗函式
    var DocList = $('#DocListPrepared');
    if (DocList && DocList.val() == '1')
    {
        //1110520 Leslie[1110371] 純檔管升級二代
        var useT2100OD = $('#h_UseT2100OD').val();
        if (useT2100OD != '1')
        {
            //window.open('AKI800View.ashx', 'AKI800View');
            jf_ShowModal('AKI800View.ashx');
        }
        else
        {
            //1140611 Zen 1140166 修改支援AI分文
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
    }

    if (document.all["CALLAKI802"])
    {
        var s = document.all["CALLAKI802"].value;
        if (s != "")
        {
            jf_OpenDetDocWin(s);
            document.all["CALLAKI802"].value = "";
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
            //jf_OpenChildWin(s,'AKT800', 800, 530);
            //0981203 Albert 0980336 調整jf_OpenChildWin輸入參數為四個
            //jf_OpenChildWin(s,"AKT800", "fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizable=yes");
            jf_OpenChildWin(s + "&fullscreen=no,Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizable=yes", "AKT800", window.screen.availHeight - 54, window.screen.availWidth - 8);
            document.all["APPLY2"].value = "";
        }
    }
    //jf_ToolBarHandle();
    $(window).trigger('resize');	//1080508	Leslie[1080357]	觸發表頭自動調整欄寬(因為最後才出現的卷軸，會影響寬度)

    //1100218	Leslie[1090927]	配合跨平台修正
    $('.SortLinkTitle').css('cursor', 'pointer').on('click touchstart', function (e)
    {
        reSort(e.target.id);
    })
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //105.04.14    Cloud   1050087         升級二代
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

function OpenUnv()
{
    if (document.all.txUnvFile.value == "") return;

    DownLoadByHttpTrans();

    var oShell = new ActiveXObject("Shell.Application");
    var param = "";
    //var param = " /filename="+strPath + " /userid=frank /stampPath="+pPath+"\\StampBox.xml" ;
    var commandtoRun = document.all.txUnvFileLocal.value;
    oShell.ShellExecute(commandtoRun, param, "", "", "0");

    document.all.txUnvFile.value = ""; //reset
}

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


function QueryProcess(argOrgNo, argODWebPath, argDocNo, Artifact)
{

    //1140609 Zen 1140147 支援顯示歷史公文流程功能
    //if (CheckBeforeQueryProcess(argOrgNo, argDocNo)) {
    if (CheckBeforeQueryProcess(argOrgNo, argDocNo, "TODO_LIST", "DOC_NO", "MSG_ID"))
    {
        var xUrl = argODWebPath + "ODI260.aspx?pDocNo=" + argDocNo + "&SAMLart=" + Artifact + "&SOURCE_ORGNO=" + argOrgNo;
        jf_OpenChildWin(xUrl, "ODI260", 750, 450);
    }
    else
    {
        //1140609 Zen 1140147 支援顯示歷史公文流程功能
        if (document.all.AK_HAS_GDOCFLOW && document.all.AK_HAS_GDOCFLOW.value == "Y" &&
            CheckBeforeQueryProcess(argOrgNo, argDocNo, "GDOCFLOW", "DOC_NO", "DOC_NO"))//有啟用舊公文流程功能，檢核是否有舊公文流程
        {
            var xUrl = "../../EA/EA01/EAI021.aspx?argDocNo=" + argDocNo + "&SAMLart=" + Artifact + "&SOURCE_ORGNO=" + argOrgNo;
            jf_OpenChildWin(xUrl, "EAI021", 750, 450);
        }
        else
            alert("歷史檔案未提供公文辦理流程紀錄");
    }
}

//1140609 Zen 1140147 支援顯示歷史公文流程功能
//function CheckBeforeQueryProcess(argOrgNo,argDocNo)
function CheckBeforeQueryProcess(argOrgNo, argDocNo, argTable, argWhereColumn, argBackColumn)
{
    var KeyName = new Array(1);
    KeyName[0] = "SOURCE_ORGNO";
    //1140609 Zen 1140147 支援顯示歷史公文流程功能
    //KeyName[1] = "DOC_NO";
    KeyName[1] = argWhereColumn;
    var KeyValue = new Array(2);
    KeyValue[0] = argOrgNo;
    KeyValue[1] = argDocNo;
    var RtnFldName = new Array(1);
    //1140609 Zen 1140147 支援顯示歷史公文流程功能
    //RtnFldName[0] = "MSG_ID";
    RtnFldName[0] = argBackColumn;
    var OrdFldName = new Array(1);
    //1140609 Zen 1140147 支援顯示歷史公文流程功能
    //OrdFldName[0] = "MSG_ID";
    OrdFldName[0] = argBackColumn;

    var param = new Array(5);
    //1140609 Zen 1140147 支援顯示歷史公文流程功能
    //param[0] = "TODO_LIST";
    param[0] = argTable;
    param[1] = KeyName;
    param[2] = KeyValue;
    param[3] = RtnFldName;
    param[4] = OrdFldName;

    RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, param);

    if (RtnObj.error)
    {
        return false;
    }
    if (RtnObj.value.ErrorClass.IsErr)
    {
        return false;
    }
    else
        return true;

}
//[0970387]Add by Cola限制AKI801不能按下Ctrl+N
function KeyDown()
{
    /*if ((event.ctrlKey)&&(event.keyCode==78)) 
        event.returnValue=false;*/
}
//0980825 Albert 0980467 計算勾選公文數量是否超過AKT800可顯示數量
function IsOverAKT800DgSize()
{
    //* 1110815      Cloud   [1110517]         修改調案檢核訊息可自訂
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

//0990908	Leslie[0990456]	增加處理標題於點選後之排序功能
//1100218	Leslie[1090927]	配合跨平台修正
//function reSort()
function reSort(strTitle)
{
    //1100218	Leslie[1090927]	配合跨平台修正
    //var strTitle = document.activeElement.id;
    var arTmp = strTitle.split('_');
    var strSortTitle = arTmp[arTmp.length - 1];
    document.all["txSortBy"].value = strSortTitle;
    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
    IsServerHandling = true;
    __doPostBack("ReSort", 0);
}

function jf_GetComBineDoc(obj)
{
    var ctrlList = $(':input:hidden:not([type="submit"],textarea,[name="__VIEWSTATE"])');  //以JQuery一次取得所有程式可能需要的隱藏欄位
    var ParaList = new Array();
    var valueList = new Array();

    for (var i = 0, iMax = ctrlList.length; i < iMax; i++)
    {
        //* 1070907		Cloud	修正相關案建會取得奇怪視窗的無ID按鈕，快解
        if (ctrlList[i].id == "")
            continue;
        ParaList[i] = ctrlList[i].id;
        valueList[i] = $(ctrlList[i]).val();
    }

    var idx = $('a[id$="COMBINE"]').index(obj);
    var ComNoList = $('#txComNo').val();
    var rtn = AK.AKI801.lkCOMBINE_Click(jf_GetArtifact(), idx, ComNoList, ParaList, valueList);
    if (rtn.value)
    {
        if (rtn.value.indexOf('ERR:') != -1)
            alert(rtn.value);
        else
            jf_OpenSumDocWin(encodeURI(rtn.value));
    }
    else
        alert(rtn.error);
}

//1050912	Leslie	[1050087]	升級二代，修正調案申請邏輯
function jf_btApply1Click()
{
    var sDocCheck = $('#DOC_CHECK').val();
    var rtn = AK.AKI801.btAPPLY1Click(jf_GetArtifact(), sDocCheck);
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

//1121120 Zen 1120634 (信保基金)修正勾選兩筆公文後申請調檔異常之問題
function GetSelectedCnt()
{
    var strDOC_CHECK = document.all['DOC_CHECK'].value;
    var regex = new RegExp('1', 'g');
    var matches = strDOC_CHECK.match(regex);
    return matches ? matches.length : 0;
}

//1121206 Zen 1121052 (考試院)支援公文含電子檔時可直接點擊開啟聞稿編輯頁面
function DownloadDocument(argDocNo, argSignType)
{
    try
    {
        let strArtifact = jf_GetArtifact();
        let strDocNo = argDocNo;
        let strSourceOrgno = document.all['H_txSourceOrgno'].value;

        let strOpenModule = 'AOL';
        if (argSignType == 'P')
            strOpenModule = 'UniView'
        var param = [];
        param[0] = strArtifact;
        param[1] = strDocNo;
        param[2] = strSourceOrgno;
        var rtnObj = jf_CallW(document.all['H_txFileiows'].value, 'GetDocInfo', false, param);
        let strFileServerWs = rtnObj.value.RtnStr;

        let params = new SOAPClientParameters();
        params.add('argArtifact', strArtifact);
        params.add('argDocNo', strDocNo);
        params.add('argOrgNo', strSourceOrgno);
        //1121208 Zen 1121052 (考試院)修正取得Unv之函式
        //var rtnObj = SOAPClient.invokeJSON(strFileServerWs, "GetOnLineApplyDocUnvByJSON", params, false, null);
        var rtnObj = SOAPClient.invokeJSON(strFileServerWs, "getDocUnvDataByJSON", params, false, null);
        if (!rtnObj.error)
        {
            if (rtnObj.value.m_bSuccess)
            {
                var sUnvObj = rtnObj.value.RtnStr;
                if (sUnvObj !== "")
                {
                    var UnvObj = JSON.parse(sUnvObj);

                    if (typeof UnvObj.UnvRoot.Doc == 'undefined' || UnvObj.UnvRoot.Doc === null)
                    {
                        alert('無效的UNV物件資訊. [invalid UnvObj.UnvRoot.Doc]');
                        return;
                    }
                    let doc = null;

                    if (_typeOf(UnvObj.UnvRoot.Doc) == 'array' && UnvObj.UnvRoot.Doc.length)
                    {
                        doc = UnvObj.UnvRoot.Doc[0];
                    }
                    else
                    {
                        doc = UnvObj.UnvRoot.Doc;
                    }

                    let _openModul = (argSignType == 'E') ? 'AOL' : 'UniView'
                    let _HistoryDoc = false;

                    if (doc.Att.length)
                    {
                        // 1. 取出所有ATT.Type='8'項目(歷史公文DI), 將其置換為一個AOL項目.
                        // 2. 其它項目
                        let mainAttArr = [], historyAttArr = [], extraPDocAtt = null;
                        if (_typeOf(doc.Att) == 'array' && doc.Att.length > 1)
                        {
                            let i = 0;
                            for (i = 0; i < doc.Att.length; i++)
                            {
                                let _att = doc.Att[i];
                                if (_att.Type === '8')
                                {
                                    historyAttArr.push(_att);
                                }
                                else
                                {
                                    mainAttArr.push(_att);
                                }
                            }
                        }

                        if (historyAttArr.length)
                        {
                            if (mainAttArr.length >= 1)
                            {
                                extraPDocAtt = {
                                    Type: '99', // 歷史公文一律給'99', 另以RD-ViewDoc.html內嵌AOL開啟
                                    Alias: '"來文及文稿檔',
                                    PrintEnable: 'TRUE',
                                    File: {
                                        Pages: '1',
                                        FileName: doc.DocNo + '-X.XML',
                                        FilePath: historyAttArr[0].File.FilePath,
                                        WSDL: historyAttArr[0].File.WSDL
                                    },
                                    Group: { GrpName: '來文附件檔-1', StartPO: '0' }
                                };
                                _openModul = 'UniView';  // 使用UniView模組開啟公文
                            }
                            else
                            { // 只有一個ATT, Type='8'
                                extraPDocAtt = {
                                    Type: '0', // 單一歷史公文DI, 給'0', 以紙本簽核公文方式開啟
                                    Alias: '"來文及文稿檔',
                                    PrintEnable: 'TRUE',
                                    File: {
                                        Pages: '1',
                                        FileName: doc.DocNo + '-X.XML',
                                        FilePath: historyAttArr[0].FilePath,
                                        WSDL: historyAttArr[0].WSDL
                                    },
                                    Group: { GrpName: '來文附件檔-1', StartPO: '0' }
                                };
                                _HistoryDoc = true; // for 歷史公文
                                _openModul = 'AOL'; // 使用AOL模組開啟公文
                            }

                            mainAttArr.push(extraPDocAtt);
                            UnvObj.UnvRoot.Doc.Att = mainAttArr;
                            argSignType = 'P'; // 將公文標記為紙本簽核公文
                        }
                        else
                        {
                            if (mainAttArr.length && mainAttArr[0].Type != '7')
                                _openModul = 'UniView';
                            else if (_typeOf(doc.Att) == 'array' && doc.Att[0].Type != '7')
                                _openModul = 'UniView';
                            else if ('Type' in doc.Att && doc.Att.Type != '7')
                                _openModul = 'UniView';
                        }
                    }
                    if (_openModul == 'UniView')
                    {
                        let _firstAtt = null;
                        if (Array.isArray(doc.Att))
                        {
                            _firstAtt = doc.Att[0];
                        }
                        else
                        {
                            _firstAtt = doc.Att;
                        }


                        // (1)是否沒有任何Att? (2)是否第一個Att的File內容異常(空字串)?
                        if (typeof _firstAtt != 'object' || typeof _firstAtt.File != 'object')
                        {
                            alert('UNV內容異常 [1stAtt or 1stAtt.File is not an object]');
                            theLogger.warn('-W- 無效的UNV內容, 第一個Doc.Att or Doc.Att.File 不為物件!');
                            return;
                        }
                        else if (!Array.isArray(_firstAtt.File) &&
                            (typeof _firstAtt.File.FileName != 'string' || _firstAtt.File.FileName.length === 0 ||
                                typeof _firstAtt.File.FilePath != 'string' || _firstAtt.File.FilePath.length === 0))
                        {
                            alert('UNV內容異常 [第一個頁面群組檔案路徑/名稱異常!]');
                            theLogger.warn('-W- 無效的UNV內容, 第一個Doc.Att.File之FileName or FilePath不為有效字串!');
                            return;
                        }
                    }

                    var objViewDoc = {
                        UNVObj: UnvObj,
                        docInfoPage: "AKI802",
                        openDocModule: _openModul,
                        signType: argSignType,
                        readOnlyMode: true
                    };

                    if (_HistoryDoc)
                        objViewDoc.HistoryDoc = true;

                    var $docId = jf_GetSessionID() + "_" + (+new Date());
                    localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                    var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + strArtifact + "&DocId=" + $docId;
                    jf_OpenChildWin(unvUrl, "AKI801ViewDoc");
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

function _typeOf(_obj)
{
    return Object.prototype.toString.call(_obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
}