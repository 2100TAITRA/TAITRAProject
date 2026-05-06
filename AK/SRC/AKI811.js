/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.10.16
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2007.11.16	Cola	0960193	於呼叫opener.document時先行判斷opener有無該object
 * 2008.11.28	Leslie	0971041	一併修正AKI811與AKI812視窗的開啟行為(兩個程式應該是共用一個視窗，行為與AKI801、AKI802相同)
 * 2009.05.22	Albert	0960123	開啟AKT800時，視窗與從系統選單開啟時大小相同
 * 2009.07.28	Albert	0980405	仿Leslie[0980014]公文若有副版影像時，提供HyperLink供使用者直接點選開啟
 * 2009.08.25	Albert	0980467	執行"申請調檔"之前判斷是否選取公文超過AKT800可顯示數量
 * 2009.12.03	Albert	0980336	調整jf_OpenChildWin輸入參數為四個
 * 2013.12.08	Cloud	1021003	調閱電子檔增加寫入紀錄TABLE SYS_USE_DETAIL-增加傳入使用程式ID、名稱
 * 2014.10.28	Kenny	1030836	配合SSL修改傳入元件之URL
 * 2016.01.20   Kenny   1041039 增加取得網址參數
 * 2016.06.20   Cloud   1050087 升級二代
 * 2016.09.12	Leslie	1050087	升級二代，修正調案申請邏輯
 * 2016.10.19	Joe		1050087	二代修正配合行動平台
 * 2019.01.30	Leslie	1080091	修正open()至原視窗的行為，改用location指定url，以避免視窗的opener錯亂
 * 1100204      Zen     1090927 取消使用document.activeElement
 * 1100504      Zen     1100473 弱掃Client DOM XSS修正
 * 1110415		Leslie	1110026	信保客製化功能，由AKT800_SMEG開啟時隱藏部分衝突的功能
 * 1110815      Cloud   1110517 修改調案檢核訊息可自訂
 * 1121120      Zen     1120634	(信保基金)修正勾選兩筆公文後申請調檔異常之問題
 * 1130412      Cloud   1130054 銓敘部，新增檢核調案不可申請線上簽核公文
 * 1131015      Zen     1130941 弱掃Client Dynamic File Inclusion修正
 * 1140609      Zen     1140147 支援顯示歷史公文流程功能
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//2016.06.20   Cloud   1050087 升級二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

/*if (document.all["ValidationSummary1"].innerText != "")
    alert(document.all["ValidationSummary1"].innerText);*/

//1110415	Leslie	信保客製化功能，由AKT800_SMEG開啟時隱藏部分衝突的功能
document.addEventListener("DOMContentLoaded", function ()
{
    if (opener.location.pathname.indexOf('AKT800_SMEG') > 0)
    {
        $('#btIMAGE1').hide();
        $('#btAPPLY1').hide();
        $('#btSELECTALL1').hide();
        $('#btUNSELECT1').hide();
    }
})
//1130412      Cloud   1130054 銓敘部，新增檢核調案不可申請線上簽核公文-S
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
//1130412      Cloud   1130054 銓敘部，新增檢核調案不可申請線上簽核公文-E

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

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    //2016.06.20   Cloud   1050087 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSELECTALL1":	// 全部勾選
            //2016.06.20   Cloud   1050087 升級二代
            //SelectAllItem('COM_CHECK',3);
            SelectAllItem('COM_CHECK', 2);
            Page_BlockSubmit = true;
            break;
        case "btUNSELECT1":		// 取消勾選
            //2016.06.20   Cloud   1050087 升級二代
            //UnSelectAllItem('COM_CHECK',3);
            UnSelectAllItem('COM_CHECK', 2);
            Page_BlockSubmit = true;
            break;
        case "btEXIT1":			// 離開
            ret = window.confirm("確定要離開本程式嗎？");
            Page_BlockSubmit = true;
            if (ret)
            {
                if (opener && !opener.closed)
                    if (opener.name == "AKI811")
                        opener.close();
                window.close();
            }
            //2016.06.20   Cloud   1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDETAIL1":		// 顯示明細
            Page_BlockSubmit = false;
            //2016.06.20   Cloud   1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //	上下頁鍵	
        case "btFIRSTPAGE1":
        case "btPRIORPAGE1":
        case "btNEXTPAGE1":
        case "btLASTPAGE1":
            Page_BlockSubmit = false;
            //2016.06.20   Cloud   1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //case "btIMAGE1":		// 線上調檔		//1050901	Leslie	升二代，調整線上調檔部分為不限筆數(一律帶回側屜
        case "btAPPLY1":		// 申請調檔
            //0980825 Albert 0980467 增加判斷勾選公文數量是否超過AKT800可顯示數量
            if (IsOverAKT800DgSize())
                return;
            //1050912	Leslie	[1050087]	升級二代，修正調案申請邏輯
            pStr = document.all["COM_CHECK"].value;
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
        //1050901	Leslie	升二代，調整線上調檔部分為不限筆數(一律帶回側屜
        case "btIMAGE1":		// 線上調檔		
            pStr = document.all["COM_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                alert('請至少勾選一筆資料!!');
                return;
            }
            else
            {
                Page_BlockSubmit = false;
                //2016.06.20   Cloud   1050087 升級二代
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
    }
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
        //[0960193]Add by Cola 先判斷opener有無此document
        if (opener.document.all[key] != null)
            if (opener.document.all[key].value != "") //0960926 Leo 因為aki811開啟時是同一個視窗開新程式不會有opener，所以使用前現判斷有沒有值再設定。
                document.all[key].value = opener.document.all[key].value;
        setSelect(key);
        IsInit = false;
    }
}

function setSelect(key)
{
    var Info = document.all[key].value;//註記-表示總共有多少筆-CLOUD
    var flag;
    var ClientID;
    //1050621 Cloud	1050087	升級二代
    //var RowNo = 3;
    //var start = parseInt(document.all["dgDETAIL__ctl3_hlSEQ_NO"].innerHTML) - 1;
    var RowNo = 2;
    var start = parseInt(document.all["dgDETAIL__ctl2_hlSEQ_NO"].textContent) - 1;
    var end = start + 10;
    if (end > Info.length)
        end = Info.length;
    for (i = start; i < end; i++)
    {
        ClientID = "dgDETAIL__ctl" + RowNo + "_cbSELECT";
        //1050621 Cloud	1050087	升級二代-如果設定每頁顯示筆數少於併案筆數即會異常-增加判斷當document.all[ClientID]為null時則break-表示這個畫面已經沒有這之後的資料
        if (!document.all[ClientID])
            break;
        flag = Info.substr(i, 1);
        if (flag == "1")
            document.all[ClientID].checked = true;
        else
            document.all[ClientID].checked = false;

        RowNo++;
    }
}
//2016.06.20   Cloud   1050087 升級二代-無用函式-S
/*function jf_OpenSumDocWin(sUrl)
{
  SumDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
  //SumDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");

  SumDocWin.focus();
}

function jf_OpenDetDocWin(sUrl)
{
  DetDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
  DetDocWin.focus();
}

function jf_OpenSumComWin(sUrl)
{
  SumComWin = open(sUrl,"SumComWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
  SumComWin.focus();
}*/
//2016.06.20   Cloud   1050087 升級二代-無用函式-E

function jf_OpenDetComWin(sUrl)
{
    //1080130	Leslie[1080091]	修正open()至原視窗的行為，改用location指定url，以避免視窗的opener錯亂
    //DetComWin = open(sUrl,"SumComWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    //DetComWin.focus();
    //1131015 Zen 1130941 弱掃Client Dynamic File Inclusion修正
    //var sUrlHeader = window.location.origin;
    var sUrlFolder = window.location.pathname;
    //1100504 Zen 1100473 弱掃Client DOM XSS修正
    //window.location.href = sUrlHeader + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
    //1131015 Zen 1130941 弱掃Client Dynamic File Inclusion修正
    //window.location.href = HtmlEncode(sUrlHeader) + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
    window.location.href = sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
}

function jf_OpenPDFWin(sUrl)
{
    PDFWin = open(sUrl, "PDFWin", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    PDFWin.focus();
}

function jf_OII800Service(argUser, argWorkGrp, argDoc_no, argSource_orgno, argChkPriv)
{
    service.useService("/OII800.asmx?WSDL", "OII800");
    iCallID = service.OII800.callService("GetDocPdf", String(argUser), "", String(argWorkGrp), String(argDoc_no), String(argSource_orgno), String(argChkPriv));
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
//2016.06.20   Cloud   1050087 升級二代-無用函式-S
/*function OpenWindow(sUrl)
{
    //oWindowID = open(sUrl,null,"fullscreen=yes");
    var pWidth=(screen.availWidth-250)/2;    //螢幕解析度之寬
    var pHeight=(screen.availHeight-300)/2;  //螢幕解析度之高  
  oWindowID = open(sUrl,"OII300C1","width=230,height=280,top="+pHeight+",left="+pWidth+"");
  oWindowID.focus();
  
  //moveBy(screen.width,screen.height);
}*/
//2016.06.20   Cloud   1050087 升級二代-無用函式-E

function jf_OpenTreeWin(sUrl)
{
    TreeWin = open(sUrl, "AKI803", "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    TreeWin.focus();
}
function jf_DETAIL(argSEQ_NO)
{
    jf_OpenDetComWin("AKI812.ASPX?gRecCtn=" + document.all["_RecCtn"].value +
        "&gRecNo=" + String(argSEQ_NO) + "&gChkP=" + document.all["_ChkP"].value +
        "&gTotPage=" + document.all["_TotPage"].value +
        "&gPageSize=" + document.all["_PageSize"].value +
        "&gDocNo=" + document.all["_DocNo"].value +
        //1050120    Kenny   [1041039]   增加傳入網址參數
        //"&COM_CHECK=" + document.all["COM_CHECK"].value.length);
        "&COM_CHECK=" + document.all["COM_CHECK"].value.length +
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
//2016.06.20   Cloud   1050087 升級二代-無用函式-MARK
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
/*function ChkDateFmt(argYr, argMn, argDy, argCanNull, argYrTp, argFull)
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
/*function IsNum(argStr)
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
/*function PadL(sAString, bSize, cChar)
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
//2016.06.20   Cloud   1050087 升級二代-無用函式-MARK-E

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
//2016.06.20   Cloud   1050087 升級二代-無用函式-MARK-S
/*function ReadCookie(name)
{
  var namex = name + "="

  if (document.cookie.length == 0) { return null }
  nameat = document.cookie.indexOf(namex)
  if (nameat == -1) { return null } // 找不到 name 時
  ValueAt = nameat + namex.length
  endPos = document.cookie.indexOf(';', ValueAt)
  if (endPos == -1) { return document.cookie.substring(ValueAt) }
  else { return document.cookie.substring(ValueAt, endPos) }
}*/


/*******************************
 name: SaveCookie
 desc: 儲存cookie變數
*******************************/
/*function SaveCookie(name, value)
{
  document.cookie = name + '=' + escape(value)
}*/
//2016.06.20   Cloud   1050087 升級二代-無用函式-MARK-E

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

    //pStr  = ReadCookie(argCookie_nm);
    pStr = document.all[argCookie_nm].value;
    pStr1 = '';
    pStr2 = '';
    pType = 0;

    var pi_index = Number(document.all["dgDETAIL__ctl" + pNo + "_hlSEQ_NO"].innerText);

    //1100204 Zen 1090927 取消使用document.activeElement
    //if (document.activeElement.checked) { pType = '1' }
    if (event.target.checked) { pType = '1' }
    else { pType = '0' }

    if (pi_index == 1) { pStr1 = '' }
    else { pStr1 = pStr.substring(0, pi_index - 1) }
    pStr2 = pStr.substring(pi_index, pStr.length)

    pStr = pStr1 + pType + pStr2
    //SaveCookie(argCookie_nm,pStr)
    document.all[argCookie_nm].value = pStr;

    //[0960193]Add by Cola 先判斷opener有無此document
    if (opener.document.all[argCookie_nm] != null)
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

    //[0960193]Add by Cola 先判斷opener有無此document
    if (opener.document.all[argCookie_nm] != null)
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

    //[0960193]Add by Cola 先判斷opener有無此document
    if (opener.document.all[argCookie_nm] != null)
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
        //[0960193]Add by Cola 先判斷opener有無此document
        if (opener.document.all[argCookie_nm] != null)
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
        //[0960193]Add by Cola 先判斷opener有無此document
        if (opener.document.all[argCookie_nm] != null)
            opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
        //SaveCookie(argCookie_nm,PadR('',pStr.length,'1'))
    }

    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {
        while (pIdx < pi_PageSize)
        {
            //			alert("dgDETAIL__ctl"+(argIndex+pIdx)+"_cbSELECT");
            pi_SEQ = Number(document.all["dgDETAIL__ctl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].innerText);
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
        //[0960193]Add by Cola 先判斷opener有無此document
        if (opener.document.all[argCookie_nm] != null)
            opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
    }

    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {
        while (pIdx < pi_PageSize)
        {
            //			alert("dgDETAIL__ctl"+(argIndex+pIdx)+"_cbSELECT");
            pi_SEQ = Number(document.all["dgDETAIL__ctl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].innerText);
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
    //[0960193]Add by Cola 先判斷opener有無此document
    if (opener.document.all[argCookie_nm] != null)
        opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;

    pIdx = 0
    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {
        while (pIdx < pi_PageSize)
        {
            pi_SEQ = Number(document.all["dgDETAIL__ctl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].innerText);
            document.all["dgDETAIL__ctl" + (argIndex + pIdx) + "_cbSELECT"].checked = !document.all["dgDETAIL__ctl" + (argIndex + pIdx) + "_cbSELECT"].checked;

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
        document.all["dgDETAIL__ctl" + argIndex + "_cbSELECT"].checked = !document.all["dgDETAIL__ctl" + argIndex + "_cbSELECT"].checked;
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
    //[0960193]Add by Cola 先判斷opener有無此document
    if (opener.document.all[argCookie_nm] != null)
        opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;

    pIdx = 0

    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {
        while ((pIdx < pi_PageSize) && (pIdx < pi_RecCnt))
        {
            pi_SEQ = Number(document.all["dgDETAIL__ctl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].innerText);
            if (argBegnum <= pi_SEQ && argEndnum >= pi_SEQ)
            {
                document.all["dgDETAIL__ctl" + (Number(argIndex) + pIdx) + "_cbSELECT"].checked = argType == 1 ? true : false;
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
        document.all["dgDETAIL__ctl" + argIndex + "_cbSELECT"].checked = argType == 1 ? true : false;
    }


}

/***********************************************************
 name : CallSel
 desc : 開啟選取提示子視窗
***********************************************************/
//2016.06.20   Cloud   1050087 升級二代-根本不會用到-MARK
/*function CallSel(argCookie_nm,argRecCount,argIndex)
{
    var screen_height = window.screen.height
    var screen_width  = window.screen.width
    var subwin_height = 140
    var subwin_width  = 250
    var subwin_top    = (screen_height - subwin_height) / 2
    var subwin_left   = (screen_width  - subwin_width ) / 2

    //  OPTIONS //
    var pDir      = "directories=no"
    var pLcn      = "location=no"
    var pMenu     = "menubar=no"
    var pStatus   = "status=no"
    var pTool     = "toolbar=no"
    var pScroll   = "scrollbars=no"
    var pResize   = "resizable=no"
    var pHeight   = "height=" + subwin_height
    var pWidth    = "width=" + subwin_width
    var pTop      = "top=" + subwin_top
    var pLeft     = "left=" + subwin_left

    //var pUrl    = "range.asp?gCookie_nm=" +argCookie_nm+ "&gRecCount=" + argRecCount+ "&gIndex=" + argIndex;	
    var pUrl    = "Range.aspx?gCookie_nm=" +argCookie_nm+ "&gRecCount=" + argRecCount+ "&gIndex=" + argIndex;

    var pOption = pDir + ',' + pHeight + ',' + pLcn + ',' + pMenu + ',' + pStatus + ',' 
                + pTool + ',' + pScroll + ',' + pResize+','+pWidth+','+pTop+','+pLeft

    selWin = window.open(pUrl,"selWin",pOption)

    selWin.focus()
}*/

/*********************************************
 name : InpNumOnly
 param: 動作物件: Text
 rtn  : none
 desc : 只允許動作物件輸入數字（僅對IE有效）
*********************************************/
function InpNumOnly()
{
    if ((event.keyCode < 48) || (event.keyCode > 57)) { event.returnValue = false }
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
    //解決StartupScript問題 #2007.04.14 Andy
    if (document.all["CALL_COM_CHECK"])
    {
        var s = document.all["CALL_COM_CHECK"].value;
        if (s == "1")
        {
            getOpenerValue('COM_CHECK');
            document.all["CALL_COM_CHECK"].value = "";
        }
    }
    //2016.06.20   Cloud   1050087 升級二代
    //jf_CallWS("OII800.asmx", "GetDocPdf", false, null);
    //OpenUnv();//2016.06.20   Cloud   1050087 升級二代-功能根本不會執行到-MARK

    //1050726	Leslie	升級二代，呼叫公文清單已準備完成，呼叫母視窗函式
    var DocList = $('#DocListPrepared');
    if (DocList && DocList.val() == '1')
    {
        //1110520 Leslie[1110371] 純檔管升級二代
        var useT2100OD = $('#h_UseT2100OD').val();
        if (useT2100OD != '1')
        {
            // window.open('AKI800View.ashx', 'AKI800View');
            jf_ShowModal('AKI800View.ashx');
        }
        else
            if (opener.CallBackByImgView())
                alert("檢索清單已準備完成，請由檢索側屜調閱公文影像。");
    }

    //解決StartupScript問題 #2007.04.14 Andy
    if (document.all["CALLAKI812"])
    {
        var s = document.all["CALLAKI812"].value;
        if (s != "")
        {
            //0971128	Leslie	修正AKI811、812的開啟行為
            jf_OpenDetComWin(s);
            //jf_OpenDetDocWin(s);
            document.all["CALLAKI812"].value = "";
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
            jf_OpenChildWin(s + "&fullscreen=no,Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizable=yes", "AKT800", window.screen.height - 54, window.screen.width - 8);
            document.all["APPLY2"].value = "";
        }
    }
}
//2016.06.20   Cloud   1050087 升級二代-無用MARK
/*function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
    var index	= document.all[argDDLId].selectedIndex;
    var obj		= document.all[argDDLId].options[index];
	
    document.all[argTextBoxId].value = obj.text;
    document.all[argLabelId].innerText = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}*/
//功能根本不會執行到-MARK-S-txUnvFile.value根本不會有値
/*function OpenUnv()
{
    if(document.all.txUnvFile.value =="") return;
	
    DownLoadByHttpTrans();
	
    var oShell = new ActiveXObject("Shell.Application");
    var param = "";
    //var param = " /filename="+strPath + " /userid=frank /stampPath="+pPath+"\\StampBox.xml" ;
    var commandtoRun = document.all.txUnvFileLocal.value;
    oShell.ShellExecute(commandtoRun, param, "", "", "0");
	
    document.all.txUnvFile.value =""; //reset
}
function DownLoadByHttpTrans()
{
    //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
    //document.all.dnFile.Servername = document.all["txServerName"].value; 
    var strWebService = document.all["txServerName"].value; 
    if ( document.all.II_USE_SSL != null )
    {
        if ( document.all.II_USE_SSL.value == "Y" )
            strWebService = strWebService.replace("http://", "https://") ;
    }
    document.all.dnFile.Servername = strWebService ;
	
    document.all.dnFile.Port = document.all["txServerPort"].value;
    document.all.dnFile.displayProgress = true;

    var strFile = document.all.txUnvFile.value;
    document.all.dnFile.addItem(strFile);
	
    if (document.all.dnFile.download()== 0)
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
}*/
//2016.06.20   Cloud   1050087 升級二代-功能根本不會執行到-MARK-E


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
        if (document.all.AK_HAS_GDOCFLOW && document.all.AK_HAS_GDOCFLOW.value == "Y")//有啟用舊公文流程功能，檢核是否有舊公文流程
        {
            if (CheckBeforeQueryProcess(argOrgNo, argDocNo, "GDOCFLOW", "DOC_NO", "DOC_NO"))
            {
                var xUrl = "../../EA/EA01/EAI021.aspx?argDocNo=" + argDocNo + "&SAMLart=" + Artifact + "&SOURCE_ORGNO=" + argOrgNo;
                jf_OpenChildWin(xUrl, "EAI021", 750, 450);

            }
        }
        else
            alert("歷史檔案未提供公文辦理流程紀錄");
    }
}
//1140609 Zen 1140147 支援顯示歷史公文流程功能
//function CheckBeforeQueryProcess(argOrgNo,argDocNo)
function CheckBeforeQueryProcess(argOrgNo, argDocNo, argTable, argWhereColumn, argBackColumn)
{
    var KeyName = new Array(2);
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
//0980728 Albert 0980405 仿Leslie[0980014]公文若有副版影像時，提供HyperLink供使用者直接點選開啟
var wsGetDocPdf = null;
function jf_GetDocPdf(argDoc_no)
{
    // 2013.12.08	Cloud	[1021003]調閱電子檔增加寫入紀錄TABLE SYS_USE_DETAIL-增加傳入使用程式ID、名稱	
    //var param = new Array(1);
    var param = new Array(3);
    param[0] = String(argDoc_no);
    // 2013.12.08	Cloud	[1021003]調閱電子檔增加寫入紀錄TABLE SYS_USE_DETAIL-增加傳入使用程式ID、名稱
    param[1] = "AKI811";
    param[2] = "檔案目錄併案摘要瀏覽";

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
}
//0980825 Albert 0980467 計算勾選公文數量是否超過AKT800可顯示數量
function IsOverAKT800DgSize()
{
    //* 1110815    Cloud   [1110517]     修改調案檢核訊息可自訂
    //var AKT800DgSize = document.all["H_txAKT800DgSize"].value;
    var AKT800DgSize = document.all["H_txAKT800DgSize"].value.split('|')[0];
    var AKT800DgMsg = document.all["H_txAKT800DgSize"].value.split('|')[1];
    var count = 0;
    var pStr = document.all["COM_CHECK"].value;
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

//1050912	Leslie	[1050087]	升級二代，修正調案申請邏輯
function jf_btApply1Click()
{
    var sDocCheck = $('#COM_CHECK').val();
    var rtn = AK.AKI811.btAPPLY1Click(jf_GetArtifact(), sDocCheck);
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
    return opener.CallBackByImgView();
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
    var strCOM_CHECK = document.all['COM_CHECK'].value;
    var regex = new RegExp('1', 'g');
    var matches = strCOM_CHECK.match(regex);
    return matches ? matches.length : 0;
}