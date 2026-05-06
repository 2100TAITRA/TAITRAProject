/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號			概要
 * -------------------------------------------------------------------------------------------------
 * 95.11.08		David	951072併950524	修正使用者欲查詢不存在的組室或人員時，查不到資料的情況
 * 96.02.13		Andy	000419			公文文號欄位可允許輸入-
 * 96.08.27     Matte   001474          新增日期查詢區間及依系統參數帶出承辦人
 * 97.03.06     Andy     Matte          0960321新增保存欄位 
 * 97.03.21     Matte   MERGE           [95.12.06     Zoey    951249          新增業務類別查詢 (AKI800.aspx, AKI800.js, AK_LIB.asmx)]
 * 97.08.27		Cola	0970558			新增查詢已銷毀公文
 * 97.10.02		Cola	0970649			新增顯示櫥位號區間
 * 97.10.20		Cola	0970725			PAGE每次刷新/關閉時透過Ajax關閉Session連線, 避免造成過多Session連線未關閉
 * 97.11.28		Leslie	0971041			變更AKI801視窗開啟時為最大化
 * 98.02.25		Leslie	0971089			配合調整AKI800畫面顯示欄位
 * 98.11.04		Albert	0980551			為避免承辦單位DDL有相同text的項目postback會送出第一個，選擇時就記錄到隱藏欄位
 * 99.09.08		Leslie	0990456			[疾管局]AKI800系列功能調整
 * 99.11.30		Debra	0990922			1.預設開啟程式日期條件為收(創)日期 2.檢核是否輸入起訖日
 * 100.01.24	Leslie					增加依參數設定，決定是否啟用日期限制條件功能
 * 101.03.01    Jeff	1010119			承辦人選單依照姓名排列jf_DOC_NO_BLUR
 * 101.03.26	Cloud	1010262			全文檢索取消一個字不查詢的檢核
 * 102.01.24	Cloud	1011177			修正清除時，畫面部分欄位並未恢復預設值的問題
 * 103.03.28	Eileen	1030182			清查將原使用AKC320分類號查詢改使用EAC005
 * 103.12.05	Cloud	--              因net4.0環境使用舊版ajax元件設定可讀寫session時會出現異常，修改使用新版ajax元件
 * 104.03.17	Cloud	1040158		    [中榮]於畫面下方增加查詢及清除建
 * 104.11.13	Cloud	1040921			(merge)1010877配合法規增加清理處置查詢欄位，並增加定期保存年限下拉式選單
 * 104.11.26	Cloud	1040924			[陸委會]新增密件主旨查詢功能
 * 105.01.18	Cloud	1041039			清理時不可清除紀錄不可見隱藏欄位
 * 105.04.13    Cloud   1050087         升級二代
 * 105.06.13    Cloud   1050087         升級二代
 * 2016.10.19	Joe		1050087	        二代修正配合行動平台
 * 2016.11.28	Kevin_C	1051175			新增案件編號查詢條件欄位
 * 2017.06.19	Kevin_C 1060456 		弱掃Client Potential Code Injection修正
 * 1070830      Zen     1070678         弱掃Ajax修正
 * 1100204      Zen     1090927         取消使用document.activeElement
 * 1100813		Leslie	1100811			[高大]新增紀錄查詢條件功能
 * 1111025		Leslie	1110873			[銓敘部]新增客製化功能，含[1110891]
 * 1111212		Leslie	1111231			[Merge並修改]公文狀態查詢條件可依設定顯示"已銷毀、提供史政機關、已移轉及已移交"等，並取消「查詢已銷毀公文」功能 
 * 1120215		Zen		考試院序10	    支援以離職人員查詢
 * 1120724		Leslie	1120490			[領務局]新增全文檢索"W4"搜尋條件for「受文者」，且當機關為領務局時，強制要求全文檢索搜尋需加上日期條件
 * 1121031      Zen     1111231         修正清除畫面後角色代碼隱藏欄位未還原回預設值之問題
 * 1130919      Cloud   1130762         新增承辦人條件支援僅查詢承辦人或負責人功能-皆為勾選視同皆勾選
 * 1141021      Zen     1141137         (外貿)支援客製化檔號結構配合調整相關邏輯
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var xOldKey;
var oWindowID;
var oTimerID;
var SumDocWin, SumComWin;
var DetDocWin, DetComWin;
var PDFWin;
var wsGetEmpID;
//1060619	Kevin_C	1060456	註解不用的CODE
//var wsGetEmpDeptID;
var wsCheckDataKeyID;
var ActiveBtn = "";
window.focus();
var alertTitle = "您輸入之資料有誤，明細如下，請更正後重試";

// Bella 修改 092/10/02
/*if(document.all["_UserType"].value == "2")
    HiddenRow();
else
    HiddenRow2();
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;
//105.04.13    Cloud   1050087         升級二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
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

//[0970725]Add by Cola PAGE每次刷新/關閉時透過Ajax關閉Session連線, 避免造成過多Session連線未關閉
//1050413 Cloud	[1050087] 升級二代-mark
/*function window.onbeforeunload()
{
   //103.12.05	Cloud  因net4.0環境使用舊版ajax元件設定可讀寫session時會出現異常，修改使用新版ajax元件
    //AKI800.SessionClose(jf_GetSessionID());
    AK.AKI800.SessionClose(jf_GetSessionID());
}*/
window.onbeforeunload = function ()
{
    AK.AKI800.SessionClose(jf_GetSessionID());
};



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
        case "btCls":   //分類號子視窗
            var pUrl = "";
            document.all("SubWinRtn").length = 0;
            //1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
            /*pUrl = "AKC320.aspx?rtnObj=lbReturnValue&k1="+document.all["tbCLS"].value;
            jf_OpenChildWin(pUrl,"AKC320",750,550);*/
            pUrl = "../../EA/EA01/EAC005.aspx?nFrom=AKI800&MODE=1&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.tbYEAR.value) + "&FILE_CLS=" + jf_Trim(document.all.tbCLS.value) + "&SAMLart=" + GetParam("SAMLart");
            jf_OpenChildWin(pUrl, "EAC005", 750, 550);
            //Eileen -- end
            ActiveBtn = "btCls";
            //uTimerID = setInterval("WaitClose();",500);
            Page_BlockSubmit = true;
            break;
        case "btECls":   //迄止分類號子視窗
            var pUrl = "";
            document.all("SubWinRtn").length = 0;
            //1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
            /*pUrl = "AKC320.aspx?rtnObj=lbReturnValue&k1="+document.all["txECLS"].value;
            jf_OpenChildWin(pUrl,"AKC320",750,550);*/
            pUrl = "../../EA/EA01/EAC005.aspx?nFrom=AKI800&MODE=1&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txEYear.value) + "&FILE_CLS=" + jf_Trim(document.all.txECLS.value) + "&SAMLart=" + GetParam("SAMLart");
            jf_OpenChildWin(pUrl, "EAC005", 750, 550);
            //Eileen -- end
            ActiveBtn = "btECls";
            //uTimerID = setInterval("WaitClose();",500);
            Page_BlockSubmit = true;
            break;
        case "btClass": //案次號子視窗
            var pUrl = "";
            document.all("SubWinRtn").length = 0;
            //1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
            /*pUrl = "AKC320.aspx?rtnObj=lbReturnValue&k1="+document.all["tbCLS"].value;
            jf_OpenChildWin(pUrl,"AKC320",750,550);*/
            pUrl = "../../EA/EA01/EAC005.aspx?nFrom=AKI800&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.tbYEAR.value) + "&FILE_CLS=" + jf_Trim(document.all.tbCLS.value) + "&SAMLart=" + GetParam("SAMLart");
            jf_OpenChildWin(pUrl, "EAC005", 750, 550);
            //Eileen -- end
            ActiveBtn = "btClass";
            //uTimerID = setInterval("WaitClose2();",500);
            Page_BlockSubmit = true;
            break;
        case "btECase": //迄止案次號子視窗
            var pUrl = "";
            document.all("SubWinRtn").length = 0;
            //1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
            /*pUrl = "AKC320.aspx?rtnObj=lbReturnValue&k1="+document.all["txECLS"].value;
            jf_OpenChildWin(pUrl,"AKC320",750,550);*/
            pUrl = "../../EA/EA01/EAC005.aspx?nFrom=AKI800&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txEYear.value) + "&FILE_CLS=" + jf_Trim(document.all.txECLS.value) + "&SAMLart=" + GetParam("SAMLart");
            jf_OpenChildWin(pUrl, "EAC005", 750, 550);
            //Eileen -- end
            ActiveBtn = "btECase";
            //uTimerID = setInterval("WaitClose2();",500);
            Page_BlockSubmit = true;
            break;

        case "btCls2":   //民眾 分類號子視窗
            var pUrl = "";
            document.all("SubWinRtn").length = 0;
            //1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
            /*pUrl = "AKC320.aspx?rtnObj=lbReturnValue&k1="+document.all["tbCLS2"].value;
            jf_OpenChildWin(pUrl,"AKC320",750,550);*/
            pUrl = "../../EA/EA01/EAC005.aspx?nFrom=AKI800&MODE=1&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txCustomYear.value) + "&FILE_CLS=" + jf_Trim(document.all.tbCLS2.value) + "&SAMLart=" + GetParam("SAMLart");
            jf_OpenChildWin(pUrl, "EAC005", 750, 550);
            //Eileen -- end
            ActiveBtn = "btCls2";
            //uTimerID = setInterval("WaitClose();",500);
            Page_BlockSubmit = true;
            break;
        //1050413 Cloud [1050087] 升級二代
        /*case 'btCalendar':
            Page_BlockSubmit=true;
            jf_CallCalendar(document.all["tbDATES"], event.screenX, event.screenY);
            break;
        case 'btCalendar2':
            Page_BlockSubmit=true;
            jf_CallCalendar(document.all["tbDATEE"], event.screenX, event.screenY);
            break;*/
        // 104.03.17	Cloud	1040158		    [中榮]於畫面下方增加查詢及清除建-s
        case 'btSearch1':
            if (jf_CheckBeforSearch())
            {
                CheckBeforeSearch();
                //--	end
                if (document.all.TblC1.style.display == "none")//民眾使用
                {
                    if (!Check_NOT_Allow_Empty_Field("2"))
                    {
                        Page_BlockSubmit = true;
                    }
                    else
                    {
                        /*
                        document.all.tbDATES.value = "0000000";
                        document.all.tbDATEE.value = "9999999";
                        */
                        Page_BlockSubmit = false;
                    }
                }
                else//機關內使用者 
                {
                    Page_BlockSubmit = !IsValidToSearch();
                }
                jf_KEEPYEAR_BLUR();

                if (jf_Trim(document.all["dlUSER_Text"].value) != "")
                    UserOnBlur(document.all['dlUSER']);

                //1051102	Joe		1050087	新增doPostBack--S
                if (Page_BlockSubmit == false)
                    __doPostBack(xObjectName, event.flatIndex);
                //1051102	Joe		1050087	新增doPostBack--E
            }
            else { Page_BlockSubmit = true; }
            break;
        case 'btClean1':
            Page_BlockSubmit = false;
            ConfirmClean(true);
            //1051102	Joe		1050087	新增doPostBack--S
            if (Page_BlockSubmit == false)
                __doPostBack(xObjectName, event.flatIndex);
            //1051102	Joe		1050087	新增doPostBack--E
            break;
        // 104.03.17	Cloud	1040158		    [中榮]於畫面下方增加查詢及清除建-e

        //1141021 Zen 1141137 (外貿)支援客製化檔號結構配合調整相關邏輯，國別、產品別子視窗
        case 'btCountryNoS':
        case 'btCountryNoE':
            Page_BlockSubmit = true;
            var pUrl = `../../EA/EA01/EAI014.aspx?SAMLart=${jf_GetArtifact()}`;
            jf_OpenChildWin(pUrl, "EAI014", 1024, 768);
            ActiveBtn = xObjectName;
            break;
        case 'btProductNoS':
        case 'btProductNoE':
            Page_BlockSubmit = true;
            var pUrl = `../../EA/EA01/EAI015.aspx?SAMLart=${jf_GetArtifact()}`;
            jf_OpenChildWin(pUrl, "EAI015", 1024, 768);
            ActiveBtn = xObjectName;
            break;
    }
}

//1050407 Cloud   1050087     升級二代
//function jf_ToolBarHandle(event)
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;
    /*dd		
        if(jf_Check_Session_Timeout() && xObjectName != "btExit1" && xObjectName != "btExit")
        {
            SumDocWin = window.open("Range.aspx","SumDocWin");
            SumDocWin.close();
            SumComWin = window.open("Range.aspx","SumComWin");
            SumComWin.close();
                	
            jf_Redirect_2_Login("ReLogin.aspx","OII110.aspx","1");
            Page_BlockSubmit = true;
            return;
        }
*/
    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050413 Cloud [1050087]   升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050413 Cloud [1050087]   升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave"://搜尋
            //if(Check_NOT_Allow_Empty_Field())
            //	{

            //99.11.30		Debra	0990922		檢核是否輸入起訖日--start 
            if (jf_CheckBeforSearch())
            {
                CheckBeforeSearch();
                //--	end
                if (document.all.TblC1.style.display == "none")//民眾使用
                {
                    if (!Check_NOT_Allow_Empty_Field("2"))
                    {
                        Page_BlockSubmit = true;
                    }
                    else
                    {
                        /*
                        document.all.tbDATES.value = "0000000";
                        document.all.tbDATEE.value = "9999999";
                        */
                        Page_BlockSubmit = false;
                    }
                }
                else//機關內使用者 
                {
                    Page_BlockSubmit = !IsValidToSearch();
                    //1041127	Cloud	[1040924]	選密旨增加檢核
                    if (document.all.ckInSubject.checked)
                    {
                        if (document.all["UserPrivlevel"] && document.all["UserPrivlevel"].value != "4")//調檔權限非全機關時，至少需輸入承辦單位
                        {
                            if (document.all["dlSECDEPT_Text"].value == "")
                            {
                                alert('勾選密件主旨查詢時，需輸入承辦單位條件。');
                                Page_BlockSubmit = true;
                                return;
                            }
                        }
                        if (document.all["tbKEYWORD"].value == "")
                        {
                            alert('勾選密件主旨查詢時，需輸入關鍵字。');
                            Page_BlockSubmit = true;
                            return;
                        }
                    }
                }
                //	}
                //	else
                //		Page_BlockSubmit = true;

                //Matte 0970306 0960321
                jf_KEEPYEAR_BLUR();

                if (jf_Trim(document.all["dlUSER_Text"].value) != "")
                    UserOnBlur(document.all['dlUSER']);
                //1041127	CLOUD	[1040924]-勾選查詢密旨 重建密旨用承辦人選單
                if (document.all.ckInSubject.checked)
                {
                    if (jf_Trim(document.all["dlSECUSER_Text"].value) != "")
                        UserOnBlur(document.all['dlSECUSER']);
                }
            }//99.11.30		Debra	0990922		檢核是否輸入起訖日--start
            else { Page_BlockSubmit = true; }
            //--	end
            //1050413 Cloud [1050087]   升級二代
            //jf_ToolBarSubmit();

            //1050711	Leslie[1050087]	升級二代，避免遇到快顯封鎖
            //jf_ToolBarSubmit(xObjectName);
            if (!Page_BlockSubmit)
            {
                Page_BlockSubmit = true;
                var strUrl = btSearchClientSideProc('btSave');
                if (strUrl.indexOf("ERR：") != -1)
                {
                    alert(strUrl);
                    return;
                }
                jf_OpenSumDocWin(strUrl);
            }
            break;
        case "btDelete":
            Page_BlockSubmit = true;
            var strUrl = "AKI850.aspx?rtnObj=lbReturnValue";
            jf_OpenChildWin(strUrl, "AKI850", 740, 550);
            //1050413 Cloud [1050087]   升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = false;
            //1050413 Cloud [1050087]   升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = false;
            //102.01.24	Cloud	1011177			修正清除時，畫面部分欄位並未恢復預設值的問題
            //Clear_Data();
            ConfirmClean(true);
            break;
        case "btSearch":
            Page_BlockSubmit = false;
            //1050413 Cloud [1050087]   升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1111212	Leslie[1111231]	[Merge並修改]公文狀態查詢條件可依設定顯示"已銷毀、提供史政機關、已移轉及已移交"等，並取消「查詢已銷毀公文」功能
        /*case "btSearchDestroy"://[0970558]Add by Cola 新增按鈕：查詢已銷毀公文
            if (document.all["dlDocNo"].selectedIndex != 0 && (document.all["tbDOC_NOS"].value != "" || document.all["tbDOC_NOE"].value != "")) {
                Page_BlockSubmit = true;
                alert('查詢已銷毀公文時，不應選擇公文文號以外之條件');
                document.all["dlDocNo"].focus();
            }
            else
                Page_BlockSubmit = false;
            //1050413 Cloud [1050087]   升級二代
            //jf_ToolBarSubmit();
            //1050711	Leslie[1050087]	升級二代，避免遇到快顯封鎖
            //jf_ToolBarSubmit(xObjectName);
            if (!Page_BlockSubmit) {
                Page_BlockSubmit = true;
                var strUrl = btSearchClientSideProc('btSearchDestroy');
                if (strUrl.indexOf("ERR：") != -1) {
                    alert(strUrl);
                    return;
                }
                jf_OpenSumDocWin(strUrl);
            }
            break;*/
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            break;
        //1100813	Leslie[1100811]	[高大]新增紀錄查詢條件功能
        case "btCondRecord":
            Page_BlockSubmit = true;	//不做PostBack
            btCondRecord();
            break;
    }
}


function ClientOnLoad()
{
    //1050413    Cloud   1050087 升級二代
    /*if (document.all["ValidationSummary1"].innerText != "")
    alert(document.all["ValidationSummary1"].innerText);*/
    jf_ShowValidator();

    //[0970649]Add by Cola 若STOCK_DATA為1 , 則顯示櫥位號相關欄位
    if (document.all["STOCK_DATA"].value == "1")
        document.all.row3.style.display = "";

    //解決StartupScript問題 #2007.04.11 Andy
    if (document.all["StartField"])
    {

        var s = document.all["StartField"].value;
        if (s != "")
        {
            jf_OpenSumDocWin(s);
            document.all["StartField"].value = "";
        }

    }

    //0980225	Leslie[0971089]	配合調整畫面
    if (!document.all["txMailRcvNo"])
    {
        document.all["trMailRow"].style.display = "none";
    }
    if (!document.all["cbRpdFile"])
    {
        document.all["trFileRow"].style.display = "none";
    }
    //end
    //1041126	Cloud	[1040924] 隱藏密件承辦單位承辦人選單-s
    if (document.all.ckInSubject.checked)
    {
        //1081031	Leslie	版更後修正，comboBox改用正規方式設定顯示或隱藏
        /*document.all.dlSECDEPT.className= "";
        document.all.dlSECDEPT_Text.className= "";
        //1050413 Cloud [1050087] 升級二代
        //document.all.dlSECDEPT_Container.className= "";
        document.all.dlSECDEPT_Container.className= "custom-combobox";
        	
        document.all.dlSECUSER.className= "";
        document.all.dlSECUSER_Text.className= "";
        //1050413 Cloud [1050087] 升級二代
        //document.all.dlSECUSER_Container.className= "";
        document.all.dlSECUSER_Container.className= "custom-combobox";*/
        $('#dlSECDEPT').combobox().combobox('show');
        $('#dlSECUSER').combobox().combobox('show');

        document.all.dlSECDOC_SEC.className = "";

        //1050413 Cloud [1050087] 升級二代
        /*document.all.dlDEPT.className= "HIDE";
        document.all.dlDEPT_Text.className= "HIDE";
        document.all.dlDEPT_Container.className= "HIDE";
        	
        document.all.dlUSER.className= "HIDE";
        document.all.dlUSER_Text.className= "HIDE";
        document.all.dlUSER_Container.className= "HIDE";
    	
        document.all.dlDOC_SEC.className= "HIDE";
    	
        document.all.ckSubject.className= "HIDE"; 
        document.all.ckSubject.nextSibling.className= "HIDE";*/

        //1081031	Leslie	版更後修正，comboBox改用正規方式設定顯示或隱藏
        /*document.all.dlDEPT.className= "hide";
        document.all.dlDEPT_Text.className= "hide";
        document.all.dlDEPT_Container.className= "hide";
        	
        document.all.dlUSER.className= "hide";
        document.all.dlUSER_Text.className= "hide";
        document.all.dlUSER_Container.className= "hide";*/
        $('#dlDEPT').combobox().combobox('hide');
        $('#dlUSER').combobox().combobox('hide');

        document.all.dlDOC_SEC.className = "hide";

        document.all.ckSubject.className = "hide";
        document.all.ckSubject.nextSibling.className = "hide";

        if (document.all["UserPrivlevel"] && document.all["UserPrivlevel"].value == "1")//權限為本人時不可動密件承辦人選單
        {
            //1081031	Leslie	版更後修正，comboBox改用正規方式設定是否啟用
            /*document.all.dlSECUSER.disabled= true;
            document.all.dlSECUSER_Text.disabled= true;
            document.all.dlSECUSER_Container.disabled= true;*/
            $('#dlSECUSER').combobox().combobox('setDisable');
        }
    }
    else
    {
        //1081031	Leslie	版更後修正，comboBox改用正規方式設定顯示或隱藏
        /*document.all.dlDEPT.className= "";
        document.all.dlDEPT_Text.className= "";
        //1050413 Cloud [1050087] 升級二代
        //document.all.dlDEPT_Container.className= "";
        document.all.dlDEPT_Container.className= "custom-combobox";
        	
        document.all.dlUSER.className= "";
        document.all.dlUSER_Text.className= "";
        //1050413 Cloud [1050087] 升級二代
        //document.all.dlUSER_Container.className= "";
        document.all.dlUSER_Container.className= "custom-combobox";*/
        $('#dlDEPT').combobox().combobox('show');
        $('#dlUSER').combobox().combobox('show');

        document.all.dlDOC_SEC.className = "";
        //1050413 Cloud [1050087] 升級二代
        /*document.all.dlSECDEPT.className= "HIDE";
        document.all.dlSECDEPT_Text.className= "HIDE";
        document.all.dlSECDEPT_Container.className= "HIDE";
        	
        document.all.dlSECUSER.className= "HIDE";
        document.all.dlSECUSER_Text.className= "HIDE";
        document.all.dlSECUSER_Container.className= "HIDE";
    	
        document.all.dlSECDOC_SEC.className= "HIDE";*/
        //1081031	Leslie	版更後修正，comboBox改用正規方式設定顯示或隱藏
        /*document.all.dlSECDEPT.className= "hide";
        document.all.dlSECDEPT_Text.className= "hide";
        document.all.dlSECDEPT_Container.className= "hide";
        	
        document.all.dlSECUSER.className= "hide";
        document.all.dlSECUSER_Text.className= "hide";
        document.all.dlSECUSER_Container.className= "hide";*/
        $('#dlSECDEPT').combobox().combobox('hide');	//初始ASPX設定的Class=hide，故需先跑一次正規設定
        $('#dlSECUSER').combobox().combobox('hide');

        document.all.dlSECDOC_SEC.className = "hide";
        document.all.ckSubject.className = "";
        document.all.ckSubject.nextSibling.className = "";

    }
    if (document.all.NO_SECDEPTDATA)
    {
        //1050413 Cloud [1050087] 升級二代
        /*document.all.ckInSubject.className= "HIDE";
        document.all.ckInSubject.nextSibling.className= "HIDE";*/
        document.all.ckInSubject.className = "hide";
        document.all.ckInSubject.nextSibling.className = "hide";
    }

    //1041126	Cloud	[1040924] 隱藏密件承辦單位承辦人選單-e
    //1051128	Kevin_C	1051175	新增案件編號查詢條件欄位
    if (document.all.RRB)
        document.all["RRBSection"].className = "";

    //1100813	Leslie[1100811]	[高大]新增紀錄查詢條件功能
    if (!('DefaultCond' in sessionStorage))
    {
        var ctrlList = $(':input:not([type="image"],[type="submit"])');  //以JQuery一次取得所有可見的控制項
        var ParaList = new Array();
        var valueList = new Array();

        for (var i = 0, iMax = ctrlList.length; i < iMax; i++)
        {
            if (ctrlList[i].id)
            {
                ParaList[i] = ctrlList[i].id;
                if (ctrlList[i].type == "checkbox" || ctrlList[i].type == "radio")
                    valueList[i] = ctrlList[i].checked.toString();
                else
                    valueList[i] = $(ctrlList[i]).val();
            }
        }
        sessionStorage['DefaultCond'] = JSON.stringify({ ctrlID: ParaList, value: valueList });
    }

    //1111025 Leslie [1110873、1110891]  [銓敘部]新增客製化功能
    if (document.all.MOCS)
    {
        $('div[id*="rowMOCS"]').removeClass('hide');
        $('#rowSTATE :checkbox').on('click', function ()
        {
            if (this.checked)
            {
                if ('ckClosed;ckWorking;cbDel'.indexOf(this.id) > -1)
                {
                    $('#cbBeDestoryed,#cbBeTran35,#cbBeTran40,#cbBeTran50').prop('checked', false)
                }
                else
                {
                    $('#ckClosed,#ckWorking,#cbDel').prop('checked', false)
                }
            }
        })
    }
}


//document.all["tbDOC_NOS"].focus();
//1050614 Cloud	1050087 配合二代，修改程式撰寫方式
//function jf_DOC_NO_BLUR(obj) {
function jf_DOC_NO_BLUR(argid)
{
    var obj = document.all[argid];
    if (obj.value == "")
        return;

    //var pMatch = /\W{1}/;
    var pMatch = /\W{1,-}/; //可允許輸入- #2007.02.13 Andy
    if (pMatch.test(obj.value))
    {
        alert("文號欄位不可輸入非英文字母,非數字的字元。");
        obj.focus();
    }
    if (obj.id == "tbDOC_NOS")
    {
        if (!pMatch.test(obj.value))
        {
            document.all.tbDOC_NOE.value = obj.value;
        }
    }
}

function DOC_NO_KEYPRESS()
{
    //A~Z keyCode 65~90 小寫為97~122
    //0~9 keyCode 48~57
    //<- keyCode 8 
    //TAB keyCode 9
    //enter keyCode 13
    //Del keyCode 46
    //- keyCode 45
    jf_UPPERCASE();
    var pRtn = true;
    var pKeyCode = event.keyCode;
    if (pKeyCode >= 48 && pKeyCode <= 122)
    {
        if (pKeyCode > 57 && pKeyCode < 65)
            pRtn = false;
        else if (pKeyCode > 90 && pKeyCode < 97 && pKeyCode != 95)
            pRtn = false;
    }
    else if (pKeyCode == 45) //可允許輸入- #2007.02.13 Andy
    {
        pRtn = true;
    }
    else
    {
        pRtn = false;
    }


    event.returnValue = pRtn
}

//Matte 0970306 0960321
function jf_KEEPYEAR_BLUR()
{
    if (document.all.txKeepYearS.value == "" && document.all.txKeepYearE.value == "")
        return;
    if (document.all.txKeepYearS.value.length == 2 && document.all.txKeepYearS.value.substr(0, 1) == "0")
        document.all.txKeepYearS.value = document.all.txKeepYearS.value.substr(1, 1);
    if (document.all.txKeepYearE.value.length == 2 && document.all.txKeepYearE.value.substr(0, 1) == "0")
        document.all.txKeepYearE.value = document.all.txKeepYearE.value.substr(1, 1);
    if (parseInt(document.all.txKeepYearE.value) < parseInt(document.all.txKeepYearS.value) && document.all.txKeepYearS.value != "" && document.all.txKeepYearE.value != "")
    {
        var temp = "";
        temp = document.all.txKeepYearE.value;
        document.all.txKeepYearE.value = document.all.txKeepYearS.value;
        document.all.txKeepYearS.value = temp;
    }
}
/*1050614 Cloud [1050087]  升級二代 此函式已無使用直接mark-s
function Clear_Data() {
    var fr = document.AKI800;
    //fr.tbDATEE.value = fr.h_lbSYS.options[2].value;
    //fr.tbDATES.value = fr.h_lbSYS.options[3].value;
    fr.tbDOC_NOS.value = "";
    fr.tbDOC_NOE.value = "";
    fr.tbYEAR.value = "";
    fr.tbCLS.value = "";
    fr.tbCASE.value = "";
    fr.tbVOL.value = "";
    fr.tbSEQ.value = "";
    fr.tbKEYWORD.value = "";
    //fr.tbUNIT.value = "";	//Mark by Leslie[0971089]
    fr.tbNO.value = "";
    //--0921023新增欄位
    fr.txEYear.value = "";
    fr.txECLS.value = "";
    fr.txECase.value = "";
    fr.txEVol.value = "";
    fr.txESeq.value = "";
    fr.dlDEPT.selectedIndex = 0;
    fr.dlUSER.selectedIndex = 0;
    fr.dlDEPT_Text.value = "";
    fr.dlUSER_Text.value = "";
      
    fr.dlDATE_TYPE.selectedIndex = 1;
    fr.tbDATES.value = "";
    fr.tbDATEE.value = "";
    //fr.dlNO.selectedIndex = 0;//Marked by Cola 此下拉選單已移除
    fr.dlDEPT.selectedIndex = -1;
    fr.dlUSER.selectedIndex = -1;
    fr.dlORDER.selectedIndex = 0;
	
    //Matte 0970306 0960321
    fr.txKeepYearS.value = "";
    fr.txKeepYearE.value = "";
    // 102.01.24	Cloud	[1011177]修正清除時，畫面部分欄位並未恢復預設值的問題
    fr.tbUNIT.value = "";//來文者
    fr.tbDelivUnit.value = "";//受文者
    fr.txWorkDay.value = "";//辦理天數
    fr.dlDOC_SEC.selectedIndex = 0;//密等
    fr.ddlBTypeNo.selectedIndex = 0;//業務類別
    fr.dlDocCategory.selectedIndex = 0;//文別
    fr.dlDOC_PROPERTY.selectedIndex = 0;//公文性質
    fr.dlDocType.selectedIndex = 0;//公文類別
    fr.dlDocSource.selectedIndex = 0;//公文來源
    //1041113	Cloud[1040921]	(merge)[1010877]	加上保存年限及清理處置選單
    fr.dlKeepYear.selectedIndex = 0;
    fr.dlClearProc.selectedIndex = 0;
    //1041126	Cloud	[1040924]	清理密件用查詢選單-s
    fr.dlSECDEPT.selectedIndex = 0;
    fr.dlSECDEPT_Text.value = "";
    if(document.all["UserPrivlevel"] && document.all["UserPrivlevel"].value!="1")//權限為本人時不可動密件承辦人選單
    {
        fr.dlSECUSER.selectedIndex = 0;
        fr.dlSECUSER_Text.value = "";
    }
    //1041126	Cloud	[1040924]	清理密件用查詢選單-e
}
1050614 Cloud [1050087]  升級二代 此函式已無使用直接mark-e*/


// 日期格式檢查
//1050614 Cloud	1050087	升級二代-修改寫法
//function Check_DATE(obj, focus_obj) {
function Check_DATE(argid, focus_obj)
{
    {
        var obj = document.all[argid];
        if (obj.value != "")
            obj.value = jf_PADL(obj.value, 7, "0");
        else
            return;
        /*
        if(obj.value.length!=7)
        {
            jf_ShowMeg("請輸入七碼的合法日期!!",alertTitle);
            obj.focus();
            Page_BlockSubmit = true;
        }
        */
        if (!jf_CheckCDATE(obj.value))
        {
            jf_ShowMeg("輸入的日期不合法,請重新輸入", alertTitle);
            obj.focus();
            Page_BlockSubmit = true;
        }
        else
        {
            if (focus_obj != null)
            {
                focus_obj.focus();
            }
        }
    }
}
//1050614 Cloud	1050087	升級二代修改寫法
//function PADZERO(obj, num) {
//if (obj.value != "") {
function PADZERO(argid, num)
{
    var obj = document.all[argid];
    //1090807	Leslie	可能傳入是字串或物件
    if (typeof argid == "object")
        obj = argid;
    if (obj.value != "")
    {
        obj.value = jf_PADL(obj.value, num, "0");
    }
}



//將 TEXTBOX 的 Value 補足
//Page.RegisterStartupScript("jf_tbYEARS_2" , "<script for=\"tbYEARS\" event=\"onblur()\" language=\"javascript\">jf_TEXTBOX_PADL(this,3,'0');</script>");	
//配合Function
//function jf_PADL(argString,argLength,argFillStr)
//1050614 Cloud [1050087]   升級二代-無用mark
/*function jf_TEXTBOX_PADL(argObject, argLength, argFillStr) {
    var ps_Str;
    ps_Str = argObject.value;	
	
    if (ps_Str == '') return;
	
    ps_Str = jf_PADL(ps_Str,argLength,argFillStr);		
    argObject.value = ps_Str;
}*/

//將左邊字串補足	
function jf_PADL(argString, argLength, argFillStr)
{
    var pi_length;
    //	alert(argString);
    pi_length = argString.length;
    if (pi_length < argLength)
    {
        return jf_PADL(argFillStr + argString, argLength, argFillStr);
    }
    return argString;
}
//1050614 Cloud [1050087]   升級二代-無用mark-s
/*function jf_ShowSug(argDOC_NO, argCOM_DOCNO) {
    var xObjectName = document.activeElement.id;
    var xobjname=xObjectName.substring(xObjectName.indexOf("hlDOC_NO"),xObjectName.length);
    var pNo = xObjectName.substring(13,xObjectName.indexOf("_hlDOC_NO"));
	

    var psSAVE = "";
    if (document.all["dgDETAIL_ctrl"+pNo+"_cbSAVE"].checked){
        psSAVE = "1";
    }
	
    var psFILESTR = "";	
	
    psFILESTR = psFILESTR+document.all["dgDETAIL_ctrl"+pNo+"_lbFILE_YEAR"].innerText + "/";
    psFILESTR = psFILESTR+document.all["dgDETAIL_ctrl"+pNo+"_lbFILE_CLS"].innerText + "/";
    psFILESTR = psFILESTR+document.all["dgDETAIL_ctrl"+pNo+"_lbFILE_CASE"].innerText + "/";
    psFILESTR = psFILESTR+document.all["dgDETAIL_ctrl"+pNo+"_lbFILE_VOL"].innerText ;	
	
	
    var xUrl ="";
    xUrl = "AKT321.aspx?DOC_NO="+argDOC_NO+"&COM_DOCNO="+argCOM_DOCNO+"&SAVECHECK="+psSAVE+"&FILESTR="+psFILESTR;
    OpenWindow(xUrl);
    oTimerID = setInterval("WaitClose();",500);
    Page_BlockSubmit = true;
}//1050614 Cloud [1050087]   升級二代-無用mark-e*/

function Check_NOT_Allow_Empty_Field(argType) // 1:機關使用者 2:民眾
{
    var fr = document.AKI800;
    var pIsValid = true;
    var errMsg = "";
    var focusField = "";


    if (argType == "1")	//機關使用者
    {
        if (fr.tbDOC_NOS.value == "" && fr.tbDOC_NOE.value == "" && fr.tbYEAR.value == "")
        {
            if (fr.tbDATES.value == "" || fr.tbDATEE.value == "")
            {
                errMsg += "文號,檔號-年,日期起訖\n";
                focusField += "D";
            }
        }
        /*
        if(fr.tbUNIT.value == "")
        {
            errMsg += "來(受)文機關\n";
            focusField += "U";
        }
    	
        if(pIsValid && fr.tbKEYWORD.value == "")
        {
            errMsg += "關鍵詞\n";
            focusField += "K";
        }
        */
        if (errMsg != "")
        {
            errMsg = "以下欄位至少選擇一組輸入:\n" + errMsg;
            jf_ShowMeg(errMsg, alertTitle);
            switch (focusField.substr(0, 1))
            {
                case "D":
                    fr.tbDATES.focus();
                    break;
                case "U":
                    fr.tbUNIT.focus();
                    break;
                case "K":
                    fr.tbKEYWORD.focus();
            }
            pIsValid = false;
        }

        if (pIsValid)
        {
            if (fr.tbDATES.value > fr.tbDATEE.value)
            {
                jf_ShowMeg("起始日期不可大於迄止日期", alertTitle);
                fr.tbDATES.focus();
                pIsValid = false;
            }
        }
    }
    else	//民眾
    {
        if (fr.tbKEYWORD.value == "" && fr.tbUNIT.value == "" && fr.txCustomYear.value == "" && fr.txCustomNo.value == "" && fr.txCustomDate.value == "")
        {
            alert("請至少輸入一項條件");
            fr.tbKEYWORD.focus();
            pIsValid = false;
        }
    }

    return pIsValid;
}
//1050614 Cloud [1050087]   升級二代-無用mark-s
/*
function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId) {
    var index	= document.all[argDDLId].selectedIndex;
    var obj		= document.all[argDDLId].options[index];
	
    document.all[argTextBoxId].value = obj.text;
    document.all[argLabelId].innerText = obj.value;
}
//1050614 Cloud [1050087]   升級二代-無用mark-e
*/


function CallBack(argCallerId)
{
    //1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
    /*if (argCallerId=="AKC320")
    {
        if(ActiveBtn == "btCls" || ActiveBtn == "btClass")
        {
            if(document.all["lbReturnValue"].length>0)
            {
                document.all["tbCLS"].value=document.all["lbReturnValue"].options[0].value;
                document.all["tbCASE"].value=document.all["lbReturnValue"].options[0].text;
                if(document.all["lbReturnValue"].options[1].text!="")
                    document.all["tbYEAR"].value=document.all["lbReturnValue"].options[1].text;
                	
            }
        }
        else if (ActiveBtn == "btECls" || ActiveBtn == "btECase")
        {
            if(document.all["lbReturnValue"].length>0)
            {
                document.all["txECLS"].value=document.all["lbReturnValue"].options[0].value;
                document.all["txECase"].value=document.all["lbReturnValue"].options[0].text;
                if(document.all["lbReturnValue"].options[1].text!="")
                    document.all["txEYear"].value=document.all["lbReturnValue"].options[1].text;					
            }

        }
    }*/
    //lbReturnValue[0]=年度號
    //lbReturnValue[1]=分類號
    //lbReturnValue[2]=案次號
    //lbReturnValue[3]=案次號鍵值case_key
    //lbReturnValue[4]=分類號鍵值cls_key
    //lbReturnValue[5]=版本別
    //lbReturnValue[6]=分類號名稱
    if (argCallerId == "EAC005")
    {
        if (ActiveBtn == "btCls" || ActiveBtn == "btClass") // 起
        {
            document.all.tbCLS.value = document.all.lbReturnValue.options[1].value;
            document.all.tbCASE.value = document.all.lbReturnValue.options[2].value;
            if (document.all.lbReturnValue.options[0].value != "")
                document.all.tbYEAR.value = document.all.lbReturnValue.options[0].value;
        }
        else if (ActiveBtn == "btECls" || ActiveBtn == "btECase") // 迄
        {
            document.all.txECLS.value = document.all.lbReturnValue.options[1].value;
            document.all.txECase.value = document.all.lbReturnValue.options[2].value;
            if (document.all.lbReturnValue.options[0].value != "")
                document.all.txEYear.value = document.all.lbReturnValue.options[0].value;
        }
    }
    //1100816	Leslie[1100811]	[高大]新增紀錄查詢條件功能
    else if (argCallerId == "AKI800C1")
    {
        //1120612	Leslie[1120361]	弱掃Client DOM Stored XSS修正
        // var cond = JSON.parse(localStorage["USER_CONDITION_"+jf_GetArtifact()]);
        var cond = JSON.parse(HtmlEncode(localStorage["USER_CONDITION_" + jf_GetArtifact()]));
        var idxCond = 0;
        // var DefaultCond = JSON.parse(sessionStorage.DefaultCond);
        var DefaultCond = JSON.parse(HtmlEncode(sessionStorage.DefaultCond));

        for (let i = 0, iMax = DefaultCond.ctrlID.length; i < iMax; i++)
        {
            let $obj = $('#' + DefaultCond.ctrlID[i]);
            let domObj = $obj[0];
            let bModify = (idxCond < cond.Conds.length && DefaultCond.ctrlID[i] == cond.Conds[idxCond].CondID);
            console.log(DefaultCond.ctrlID[i]);
            let strVal = (bModify) ? cond.Conds[idxCond].CondValue : DefaultCond.value[i];

            if (domObj.type == "checkbox" || domObj.type == "radio")
            {
                $obj.prop('checked', strVal == 'true')
            }
            else if (domObj.type == "select-one")
            {
                if (domObj.options.length > 0)
                {	//&& $obj.is(':Visible')
                    for (let idx = 0, idxMax = domObj.options.length; idx < idxMax; idx++)
                        if (domObj.options[idx].value == strVal)
                        {
                            domObj.selectedIndex = idx;
                            if ($obj.hasClass('comboBox'))
                                $(domObj).parent().find('#' + domObj.id + '_Text').val(domObj.options[idx].textContent);
                            break;
                        }
                }
            }
            else
            {
                if (!$obj.hasClass('custom-combobox-input'))
                    $obj.val(strVal);
            }

            if (bModify) idxCond++;
        }
    }
    //1141021 Zen 1141137 (外貿)支援客製化檔號結構配合調整相關邏輯，國別、產品別子視窗
    else if (argCallerId == "EAI014")
    {
        if (ActiveBtn == 'btCountryNoS')
            document.all['txCountryNoS'].value = document.all.lbReturnValue.options[0].value;
        else if (ActiveBtn == 'btCountryNoE')
            document.all['txCountryNoE'].value = document.all.lbReturnValue.options[0].value;
    }
    else if (argCallerId == "EAI015")
    {
        if (ActiveBtn == 'btProductNoS')
            document.all['txProductNoS'].value = document.all.lbReturnValue.options[0].value;
        else if (ActiveBtn == 'btProductNoE')
            document.all['txProductNoE'].value = document.all.lbReturnValue.options[0].value;
    }


    if (document.all.lbReturnValue.options != null)//清空lbReturnValue物件
        document.all.lbReturnValue.options.length = 0;
    //Eileen -- end
}


//------------------------------------------------------------
//分類號
//1050614 Cloud [1050087]   升級二代-無用mark-s
/*function OpenWindow(argUrl) {
    var gChidkWinStyle = "left=0,top=0,height="+(screen.height-50)+",width="+(screen.width-10)+",titlebar=yes,status=yes,resizeable=yes";//"fullscreen=yes";
    uChildWinHandle=open(argUrl,null,gChidkWinStyle);
    //moveBy(screen.width,screen.height);
}*/
//1050614 Cloud [1050087]   升級二代-無用mark-e



//1050614 Cloud [1050087]   升級二代-無用mark-s
/*function WaitClose() {
    if (uChildWinHandle.closed) {
        clearInterval(uTimerID);
        if (document.all("SubWinRtn").length > 0) {
            document.all("tbCLS").value=document.all("SubWinRtn").options[0].value;
            var oldlength = document.all("SubWinRtn").length;
            for (i = 0; i < oldlength; i++) {
                document.all["SubWinRtn"].remove(0);
            }	
        }
        if(screenLeft>400)
            moveTo(0,0);
    }
} 


//-------------------------------------------------------------
//案號
function OpenWindow2(argUrl) {
    var gChidkWinStyle = "left=0,top=0,height="+(screen.height-50)+",width="+(screen.width-10)+",titlebar=yes,status=yes,resizeable=yes";//"fullscreen=yes";
    uChildWinHandle=open(argUrl,null,gChidkWinStyle);
    moveBy(screen.width,screen.height);
}


function WaitClose2() {
    if (uChildWinHandle.closed) {
        clearInterval(uTimerID);
        if (document.all("SubWinRtn").length > 0) {
            document.all("tbCLS").value=document.all("SubWinRtn").options[0].value;
            //document.all("tbFILE_CLS2").value=document.all("SubWinRtn").options[1].value;
            //document.all("tbFILE_CASE1").value=document.all("SubWinRtn").options[2].value;
            document.all("tbCASE").value=document.all("SubWinRtn").options[2].value;
            var oldlength = document.all("SubWinRtn").length;
            for (i = 0; i < oldlength; i++) {
                document.all["SubWinRtn"].remove(0);
            }	
        }
        if(screenLeft>400)
            moveTo(0,0);
    }
}*/


function jf_OpenSumDocWin(sUrl)
{
    //alert(sUrl);
    //SumDocWin = open(sUrl,"SumDocWin","fullscreen=nos,Height=480,Width=720,Top=20,Left=40,Scrollbars=yes");
    //SumDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    //0971127	Leslie[0971041]	變更開啟AKI801時為最大化
    //SumDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height=546,Width=792,Top="+String((window.screen.height-600)/2)+",Left="+String((window.screen.width-800)/2)+",Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
    //SumDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizable=no");
    //Leslie	new	[無網址列，可調大小]SumDocWin = open(sUrl,"SumDocWin","Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizable=yes");
    //1050815	Leslie	配合升級二代，修改AKI801子視窗開至New Tab
    //SumDocWin = open(sUrl,"SumDocWin","Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizable=yes");
    SumDocWin = open(sUrl, "SumDocWin", "");
    SumDocWin.focus();

    //1110928	Leslie	修正AKI801可於登出時，一併被關閉
    var oOpener = GetSSOPage();
    if (oOpener.theStart)
        oOpener.theStart.ChildWin.push(SumDocWin);
    //moveBy(screen.width,screen.height);
}

//1050614 Cloud [1050087]   升級二代-無用mark-s
/*function jf_OpenDetDocWin(sUrl) {
  //alert(sUrl);
  //DetDocWin = open(sUrl,"DetDocWin","fullscreen=no,Height=480,Width=720,Top=20,Left=40,Scrollbars=yes");
  DetDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
  DetDocWin.focus();
  //moveBy(screen.width,screen.height);
}


function jf_OpenSumComWin(sUrl) {
  //alert(sUrl);
  //SumComWin = open(sUrl,"SumComWin","fullscreen=no,Height=480,Width=720,Top=20,Left=40,Scrollbars=yes");
  SumComWin = open(sUrl,"SumComWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
  SumComWin.focus();
  //moveBy(screen.width,screen.height);
}


function jf_OpenDetComWin(sUrl) {
  //alert(sUrl);
  //DetComWin = open(sUrl,"DetComWin","fullscreen=no,Height=480,Width=720,Top=20,Left=40,Scrollbars=yes");
  DetComWin = open(sUrl,"SumComWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
  DetComWin.focus();
  //moveBy(screen.width,screen.height);
}

function jf_OpenPDFWin(sUrl) {
  //alert(sUrl);
  //DetComWin = open(sUrl,"DetComWin","fullscreen=no,Height=480,Width=720,Top=20,Left=40,Scrollbars=yes");
  PDFWin = open(sUrl,"PDFWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
  PDFWin.focus();
  //moveBy(screen.width,screen.height);
}*/
//1050614 Cloud [1050087]   升級二代-無用mark-e

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
//1050614 Cloud [1050087]   升級二代-無用mark-s
/*function CallCal(argYr, argMn, argDy, argLang, argYrTp) {
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
}*///1050614 Cloud [1050087]   升級二代-無用mark-e

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
///1050614 Cloud [1050087]   升級二代-無用mark-s
/*function ChkDateFmt(argYr, argMn, argDy, argCanNull, argYrTp, argFull) {
    var argTmp

    pYr = Trim(argYr.value)
    pMn = Trim(argMn.value)
    pDy = Trim(argDy.value)
    argYrTp = argYrTp.toUpperCase()

    // ***************** Check Is Nullable ?
    if (argCanNull == 0) {
        if (pYr.length == 0) {
            alert("請輸入年！")
            argYr.focus()
            return false
        }
        if (pMn.length == 0) {
            alert("請輸入月！")
            argMn.focus()
            return false
        }
        if (pDy.length == 0) {
            alert("請輸入日期！")
            argDy.focus()
            return false
        }
    }

    // ***************** Check Is DD or YYDD or MMDD Format
    if (pDy.length != 0) {
        if (pYr.length == 0) {
            alert("請輸入年！")
            argYr.focus()
            return false
        }
        if (pMn.length == 0) {
            alert("請輸入月！")
            argMn.focus()
            return false
        }
    }

    if (pMn.length != 0) {
        if (pYr.length == 0) {
            alert("請輸入年！")
            argYr.focus()
            return false
        }
    }
    // ***************** Check Date Value -- YR
    if (pYr.length != 0) {
        argTmp = IsNum(parseFloat(pYr))
        if (!IsNum(pYr)) {
            alert("年格式錯誤！")
            argYr.focus()
            return false
        }
        else {
            if (parseFloat(pYr) < 1) {
                alert("年格式錯誤！")
                argYr.focus()
                return false
            }
            if (argYrTp == "CHY") { pYr = parseFloat(pYr) + 1911 }
        }
    }

    // ***************** Check Date Value -- MN
    if (pMn.length != 0) {
        if (!IsNum(pMn)) {
            alert("月格式錯誤！")
            argMn.focus()
            return false
        }
        else {
            if ((parseFloat(pMn) > 12) || (parseFloat(pMn) < 1)) {
                alert("月格式錯誤！")
                argMn.focus()
                return false
            }
        }
    }

    // ***************** Check Date Value -- DY
    if (pDy.length != 0) {
        if (!IsNum(pDy)) {
            alert("日期格式錯誤！")
            argDy.focus()
            return false
        }
        else {
            if (parseFloat(pDy) < 1) {
                alert("日期格式錯誤！")
                argDy.focus()
                return false
            }

            // February
            if (parseFloat(pMn) == 2) {
                if ( (parseFloat(pYr) % 400 == 0) ||
                     ((parseFloat(pYr) % 4 == 0) && (parseFloat(pYr) % 100 != 0))) {
                    if (parseFloat(pDy) > 29) {
                        alert("日期格式錯誤！")
                        argDy.focus()
                        return false
                    }
                }
                else {
                    if (parseFloat(pDy) > 28) {
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
                      (parseFloat(pMn) == 12)) {
                if (parseFloat(pDy) > 31) {
                    alert("日期格式錯誤！")
                    argDy.focus()
                    return false
                }
            }
            // April June September November
            else {
                if (parseFloat(pDy) > 30) {
                    alert("日期格式錯誤！")
                    argDy.focus()
                    return false
                }
            }
        }
    }

    if (argFull == 1) {
        if (pYr.length != 0) {
            if (argYrTp == "ENY") { argYr.value = PadL(argYr.value, 4, "0") }
            else if (argYrTp == "CHY") { argYr.value = PadL(argYr.value, 3, "0") }
        }
        if (pMn.length != 0) { argMn.value = PadL(pMn, 2, "0") }
        if (pDy.length != 0) { argDy.value = PadL(pDy, 2, "0") }
    }
    
    return true
}*/
//1050614 Cloud [1050087]   升級二代-無用mark-e
/*****************************************
 name: IsNum
 desc: 檢查字串是否為數字格式（含負數）
*****************************************/
//1050614 Cloud [1050087]   升級二代-無用mark-s
/*function IsNum(argStr) {
  pTmpChar  = ''

    for (pIdx = 0; pIdx < argStr.length; pIdx++) {
       pTmpChar = argStr.substring(pIdx, pIdx+1)

       if (pIdx == 0) { if (pTmpChar == '-') { continue } }

       if ( (pTmpChar != '0') && (pTmpChar != '1') && (pTmpChar != '2') && (pTmpChar != '3') &&
            (pTmpChar != '4') && (pTmpChar != '5') && (pTmpChar != '6') && (pTmpChar != '7') &&
            (pTmpChar != '8') && (pTmpChar != '9') )
       { return false }
  }
  return true
}//1050614 Cloud [1050087]   升級二代-無用mark-e*/

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
    var pNo = xObjectName.substring(13, xObjectName.indexOf("_cbSELECT"));

    //pStr  = ReadCookie(argCookie_nm);
    pStr = document.all[argCookie_nm].value;
    pStr1 = '';
    pStr2 = '';
    pType = 0;

    var pi_index = Number(document.all["dgDETAIL_ctrl" + pNo + "_hlSEQ_NO"].innerText);

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
        document.all[argCookie_nm].value = PadR('', pStr.length, '0');
    //SaveCookie(argCookie_nm,PadR('',pStr.length,'0'))
    //SaveCookie(argCookie_nm,PadR('',1000,'0'))
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
        document.all[argCookie_nm].value = PadR('', pStr.length, '1');
    //SaveCookie(argCookie_nm,PadR('',pStr.length,'1'))
    // SaveCookie(argCookie_nm,PadR('',1000,'1'))

    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {
        while (pIdx < pi_PageSize)
        {
            //			alert("dgDETAIL_ctrl"+(argIndex+pIdx)+"_cbSELECT");
            pi_SEQ = Number(document.all["dgDETAIL_ctrl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].innerText);
            document.all["dgDETAIL_ctrl" + (argIndex + pIdx) + "_cbSELECT"].checked = true;
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
        document.all["dgDETAIL_ctrl" + argIndex + "_cbSELECT"].checked = true;
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

    pIdx = 0
    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {
        while (pIdx < pi_PageSize)
        {
            pi_SEQ = Number(document.all["dgDETAIL_ctrl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].innerText);
            document.all["dgDETAIL_ctrl" + (argIndex + pIdx) + "_cbSELECT"].checked = !document.all["dgDETAIL_ctrl" + (argIndex + pIdx) + "_cbSELECT"].checked;

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
        document.all["dgDETAIL_ctrl" + argIndex + "_cbSELECT"].checked = !document.all["dgDETAIL_ctrl" + argIndex + "_cbSELECT"].checked;
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

    pIdx = 0

    var pi_PageSize = Number(document.all["_PageSize"].value);
    var pi_RecCnt = Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {
        while (pIdx < pi_PageSize)
        {
            pi_SEQ = Number(document.all["dgDETAIL_ctrl" + (Number(argIndex) + pIdx) + "_hlSEQ_NO"].innerText);
            if (argBegnum <= pi_SEQ && argEndnum >= pi_SEQ)
            {
                document.all["dgDETAIL_ctrl" + (Number(argIndex) + pIdx) + "_cbSELECT"].checked = argType == 1 ? true : false;
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
        document.all["dgDETAIL_ctrl" + argIndex + "_cbSELECT"].checked = argType == 1 ? true : false;
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
    var subwin_height = 160
    var subwin_width = 200
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
    argPage.value = argPagePos;
    argRec.value = argRecPos;
    argForm.submit();
}
/******************************************************************
 name : Find_dlDEPT
 param: none        
 rtn  : none
 desc : 當txDEPT onblur時，自動變動dlDEPT以對應txDEPT
******************************************************************/
//1060619	Kevin_C	1060456	清所有專案，確定已不使用
// function Find_dlDEPT() {
// for (i = 0; i <= document.all.dlDEPT.length; i++) {
// if (i == document.all.dlDEPT.length) {
// document.all.dlDEPT.options[0].selected=true;
// document.all.lbDeptErr.className = "";
// document.all.htxDeptName.value = "XXX";
// }
// else if((DiscodeDeptValue(document.all.dlDEPT.options[i].value,false)==document.all.txDEPT.value)
// || (document.all.dlDEPT.options[i].text == document.all.txDEPT.value)) {
// document.all.dlDEPT.options[i].selected=true;
// document.all.htxDeptName.value = document.all.dlDEPT.options[document.all.dlDEPT.selectedIndex].text;
// document.all.lbDeptErr.className = "hidden";
// dlDEPT_Change();
// Find_txDEPT();
// Find_dlUSER();
// return;
// }
// }
// }
//由dlDEPT中對應出txDEPT之值
function Find_txDEPT()
{
    document.all.txDEPT.value = DiscodeDeptValue(document.all.dlDEPT.options[document.all.dlDEPT.selectedIndex].value, false);
    document.all.lbDeptErr.className = "hidden";
}
//依傳入之字串取得處級或組室級代號
function DiscodeDeptValue(argDeptString, argGetDeptNo)
{
    //紀錄冒號之位置
    var CommaPosition = argDeptString.indexOf(":");
    var AfterComma = argDeptString.substring(CommaPosition + 1, CommaPosition + 2);
    if (argGetDeptNo)//取得處級代號(冒號前之單位代號)
    {
        return argDeptString.substring(0, CommaPosition);
    }
    else//依據代號取得處級或組室級代號
    {
        if (AfterComma == " ")
        {
            return argDeptString.substring(0, CommaPosition);
        }
        else
        {
            return argDeptString.substring(CommaPosition + 1, argDeptString.length);
        }
    }
}

/******************************************************************
 name : Find_dlUSER
 param: none        
 rtn  : none
 desc : 當txUSER onblur時，自動變動dlUSER以對應txUSER
******************************************************************/
//1060619	Kevin_C	1060456	清所有專案，確定已不使用
// function Find_dlUSER() {
// for (i = 0; i <= document.all.dlUSER.length; i++) {
// var pUserName = "";
// if (document.all.dlUSER.options[i] != null) {
// if(document.all.dlUSER.options[i].text.indexOf(")")!=-1)
// pUserName = document.all.dlUSER.options[i].text.split(")")[1];
// }
// if (i == document.all.dlUSER.length) {
// if (CurrentInfo != null) {
// document.all.dlUSER.options.length = document.all.dlUSER.options.length+1;
// document.all.dlUSER.options[document.all.dlUSER.options.length-1].text=CurrentInfo.text;
// document.all.dlUSER.options[document.all.dlUSER.options.length-1].value=CurrentInfo.value;
// document.all.dlUSER.options[document.all.dlUSER.options.length-1].selected=true;
// document.all.lbUserErr.className = "hidden";
// if(CurrentInfo.text.indexOf(")")!=-1)
// document.all.htxUserName.value = CurrentInfo.text;
// else
// document.all.htxUserName.value = "XXX";
// document.all.txUSER.value = CurrentInfo.value;
// CurrentInfo = null;
// return;
// }
// else {
// document.all.dlUSER.options[0].selected=true;
// document.all.lbUserErr.className = "";
// document.all.htxUserName.value = "XXX";
// }
// }
// else if((DiscodeUserValue(document.all.dlUSER.options[i].value)==document.all.txUSER.value)
// || (pUserName) == document.all.txUSER.value) {
// document.all.dlUSER.options[i].selected=true;
// document.all.lbUserErr.className = "hidden";
// document.all.htxUserName.value = document.all.dlUSER.options[document.all.dlUSER.selectedIndex].text;
// document.all.txUSER.value = document.all.dlUSER.options[document.all.dlUSER.selectedIndex].value
// return;
// }
// }
// }
//由dlUSER中對應出txUSER之值
function Find_txUSER()
{
    if (document.all.txUSER.value == "")
        document.all.dlUSER.options[0].selected = true;
    else
    {
        document.all.txUSER.value = DiscodeUserValue(document.all.dlUSER.options[document.all.dlUSER.selectedIndex].value);
    }
    document.all.lbUserErr.className = "hidden";
    document.all.htxUserName.value = document.all.dlUSER.options[document.all.dlUSER.selectedIndex].text;
}
//由字串中取得使用者之代號
function DiscodeUserValue(argUserString)
{
    //紀錄冒號之位置
    var CommaPosition = argUserString.lastIndexOf(":");
    return argUserString.substring(CommaPosition + 1, argUserString.length);
}
/******************************************************************
 name : BuliddlUser
 param: none        
 rtn  : none
 desc : 當dlDEPT onchange時，則填入dlUSER適當之使用者
******************************************************************/
//1060619	Kevin_C	1060456	清所有專案，確定已不使用 -S
//var CurrentInfo = null;
// function BuliddlUser() {
// if (document.all.dlUSER.options[document.all.dlUSER.selectedIndex].text != "") {
// CurrentInfo = new Object();
// CurrentInfo.text = document.all.dlUSER.options[document.all.dlUSER.selectedIndex].text;
// CurrentInfo.value = document.all.dlUSER.options[document.all.dlUSER.selectedIndex].value;
// }
////刪除dlUSER中所有之option
////document.all.txUSER.value = "";
// var dlUSERCount=document.all.dlUSER.length;
// for(j=0;j<dlUSERCount;j++)
// {document.all.dlUSER.options[0]=null;}
// var objOptionSpace = new Option("","");
// document.all.dlUSER.options[0] = objOptionSpace;

// var argWSPara = new Array(1);
////處理當dlDEPT為空白時之處理
// if (document.all.dlDEPT.selectedIndex == 0) {
////argWSPara[0] = "ALLDEPT";
// argWSPara[0] = "XXX";	
// }
// else {
// if(document.all.cbDeptNotMatch.checked)
// argWSPara[0]=DiscodeDeptValue(document.all.dlDEPT.options[document.all.dlDEPT.selectedIndex].value,true);
// else
// argWSPara[0]=DiscodeDeptValue(document.all.dlDEPT.options[document.all.dlDEPT.selectedIndex].value,false);
// }	
// callObj = jf_CallWS("lib/AK_LIB.asmx", "GetEmp", false, argWSPara);
// if (callObj.error) {
// alert(callObj.errorDetail.string);
// }
// else {
// wsGetEmpID = callObj.id;
// OnWSResult(callObj);
// }

// }
//1060619	Kevin_C	1060456	清所有專案，確定已不使用 -E
/******************************************************************
 name : USERGetDEPT
 param: none        
 rtn  : none
 desc : 由txUSER取得其部門代號，並帶入到txDEPT中
******************************************************************/
//1060619	Kevin_C	1060456	清查所有專案，確定已不使用
// function USERGetDEPT() {
// var argWSPara = new Array(1);
// argWSPara[0] = document.all.txUSER.value;
// callObj = jf_CallWS("lib/AK_LIB.asmx", "GetEmpDept", false, argWSPara);
// if (callObj.error) {
// alert(callObj.errorDetail.string);
// }
// else {
// wsGetEmpDeptID = callObj.id;
// if(OnWSResult(callObj))
// return true;
// else {
// document.all.dlUSER.options[0].selected=true;
////alert("警告：無此負責人");
// document.all.lbUserErr.className = "";
// document.all.htxUserName.value = "XXX";
// return false;
// }
// }

// }
//1110719	Leslie[1110498]	修正萬年Bug，不應在任何WS回傳異常時，就清空業務類別選單
var iCallID_GetBTypeNo;

function OnWSResult(argResult)
{
    if (argResult.error || argResult.value.ErrorClass.IsErr)
    {
        //95.11.07 951072 David 
        //呼叫失敗，提示使用者承辦人帳號輸入錯誤
        //if(argResult.id = WsId_GetEmpAccount && jf_Trim(document.all["dlUSER_Text"].value) != "")
        //{			
        var userName = document.all["dlUSER_Text"].value;
        document.all["txUserValue"].value = ":::" + userName;
        //alert("承辦人帳號輸入錯誤");		
        //}
        //ZOEY [951249, 95/12/06]
        //1110719	Leslie[1110498]	修正萬年Bug，不應在任何WS回傳異常時，就清空業務類別選單
        if (argResult.id == iCallID_GetBTypeNo)
            if (argResult.value.ErrorClass.IsErr || argResult.value.RtnStr == "")
            {
                for (var i = 0; i < document.all.ddlBTypeNo.length; i++)
                    document.all.ddlBTypeNo.remove(0);
                document.all.ddlBTypeNo.length = 0;
                document.all.ddlBTypeNo.options.add(new Option("", "")); //第一筆空白
            }
    }
    else
    {
        if (argResult.id == wsGetEmpID)
        {
            //將所取得之使用者資訊塞入Select物件中
            for (i = 0; i < argResult.value.EmpName.length; i++)
            {
                var strDeptName = "";
                if (argResult.value.SectName[i] == "")
                    strDeptName = "(" + argResult.value.DeptName[i] + ")";
                else
                    strDeptName = "(" + argResult.value.DeptName[i] + "-" + argResult.value.SectName[i] + ")";
                var objOption = new Option(strDeptName + argResult.value.EmpName[i], argResult.value.UserName[i]);
                document.all.dlUSER.options[i + 1] = objOption;
            }
        }
        //1060619	Kevin_C	1060456	註解不用的CODE -S
        // else if (argResult.id == wsGetEmpDeptID) {
        ////將所取得之部門代號塞入txDEPT中	
        // if (argResult.value.EmpDeptNo != "") {
        // var Msg = "";
        // if (document.all.txDEPT.value == "" || document.all.txDEPT.value != argResult.value.EmpDeptNo) {
        // var text = "";
        // if(argResult.value.EmpSectName=="")
        // text = "("+argResult.value.EmpDeptName+")"+argResult.value.EmpName;
        // else
        // text = "("+argResult.value.EmpDeptName+"-"+argResult.value.EmpSectName+")"+argResult.value.EmpName;
        // CurrentInfo = new Object();
        // CurrentInfo.text = text;
        // CurrentInfo.value = argResult.value.EmpNo;

        // Find_dlUSER();

        // Msg = "您是否要設定/改變負責單位條件？";
        // ret = window.confirm(Msg);
        // if (ret) {
        // document.all.txDEPT.value = argResult.value.EmpDeptNo;
        // Find_dlDEPT();
        // }				
        // }				
        // return true;
        // }
        // else {
        // return false;
        // }
        // }
        //1060619	Kevin_C	1060456	註解不用的CODE -E
        //95.11.07 951072 David 呼叫WS - GetEmpDept後，組出 單位:組室:帳號:姓名 字串存回txUserValue
        if (argResult.id == WsId_GetEmpAccount)
        {
            var userDeptNo = argResult.value.EmpDeptNo.substring(0, 2);
            var userSectNo = argResult.value.EmpDeptNo;
            if (userDeptNo == userSectNo)
                userSectNo = "";
            var userAccount = argResult.value.EmpNo;
            var userName = argResult.value.EmpName;
            document.all["txUserValue"].value = userDeptNo + ":" + userSectNo + ":" + userAccount + ":" + userName;
            return true;
        }
        //1041127	Cloud	增加處理密件
        if (argResult.id == WsId_GetEmpSecAccount)
        {
            var userDeptNo = argResult.value.EmpDeptNo.substring(0, 2);
            var userSectNo = argResult.value.EmpDeptNo;
            if (userDeptNo == userSectNo)
                userSectNo = "";
            var userAccount = argResult.value.EmpNo;
            var userName = argResult.value.EmpName;
            document.all["txSecUserValue"].value = userDeptNo + ":" + userSectNo + ":" + userAccount + ":" + userName;
            return true;
        }
        //Zoey [951249,95/12/06] 由公文性質取得業務類別,設定dlBTypeNO值
        if (argResult.id == iCallID_GetBTypeNo)
        {
            for (var i = 0; i < document.all.ddlBTypeNo.length; i++)
                document.all.ddlBTypeNo.remove(0);
            document.all.ddlBTypeNo.length = 0;
            document.all.ddlBTypeNo.options.add(new Option("", "")); //第一筆空白		

            //1110719	Leslie[1110498]	修正萬年Bug，重置後，應清空業務類別條件
            document.all.txBTypeNo.value = "";

            var pTmpAry = argResult.value.RtnStr.split(":");

            for (var i = 0; i < pTmpAry.length; i++)
            {
                var pTmpAry2 = pTmpAry[i].split(",");
                var objOption = new Option(pTmpAry2[1], pTmpAry2[0]);
                document.all.ddlBTypeNo.options.add(objOption);
                document.all.ddlBTypeNo.selectedIndex = 0;
            }
            return true;
        }
    }
}

/******************************************************************
 desc : tx_USER ,dl_USER , tx_DEPT, dl_DEPT ,cbDeptNotMatch之事件
******************************************************************/
//1060619	Kevin_C	1060456	清所有專案，確定已不使用 -S
// function txUSER_Blur() {
// if (document.all.txUSER.value != "") {
// USERGetDEPT();
////if(USERGetDEPT())
////	Find_dlDEPT();
// }
// else {
// if(document.all.dlUSER.options[0]!=null)
// document.all.dlUSER.options[0].selected = true;
// document.all.htxUserName.value = "XXX";
// }	
// }
// function txDEPT_Blur() {
// Find_dlDEPT();
// }
// function dlDEPT_Change() {
// BuliddlUser();
// Find_txDEPT();
// Find_dlUSER();
// }
// function dlUSER_Change() {
// Find_txUSER();
// }
// function cbDeptNotMatch_Click() {
// BuliddlUser();
// Find_dlUSER();
// }
//1060619	Kevin_C	1060456	清所有專案，已不使用 -E
function HiddenRow()//民眾
{
    document.all.TblC1.style.display = "none";
    document.all.TblC4.style.display = "none";
    //document.all.TblC5.style.display = "none";
    /*
    document.all.row1.style.display="none";
    document.all.row2.style.display="none";
    document.all.row3.style.display="none";
    document.all.row4.style.display="none";
    document.all.row7.style.display="none";
    document.all.row8.style.display="none";
    document.all.row9.style.display="none";
    */
    //--0921023
    document.all.TrdlNO.style.display = "none";

}
function HiddenRow2()//內部使用
{
    document.all.TblC3.style.display = "none";
    //document.all.row6.style.display="none";
}

function IsValidToSearch()
{
    if (document.all["dlUSER_Text"].value == "")
        document.all.txUserValue.value = "";
    if (document.all.nNotCheckFileNo.value == "Y")
        return true;

    //1141021 Zen 1141137 (外貿)支援客製化檔號結構配合調整相關邏輯
    if (document.all.TAITRA)
    {
        let strVolNoS = document.all['tbVOL'].value;
        let strVolNoE = document.all['txEVol'].value;
        let strCountryNoS = document.all['txCountryNoS'].value;
        let strCountryNoE = document.all['txCountryNoE'].value;
        let strDivisionNoS = document.all['txDivisionNoS'].value;
        let strDivisionNoE = document.all['txDivisionNoE'].value;
        let strProductNoS = document.all['txProductNoS'].value;
        let strProductNoE = document.all['txProductNoE'].value;

        let strCaseNoS = '';
        let strCaseNoE = '';

        if (strCountryNoS + strDivisionNoS + strProductNoS == '' && strVolNoS != "")
            strCaseNoS = '--';
        else if (strCountryNoS + strDivisionNoS + strProductNoS != "")
            strCaseNoS = `${strCountryNoS}-${strDivisionNoS}-${strProductNoS}`;

        if (strCountryNoE + strDivisionNoE + strProductNoE == '' && strVolNoE != "")
            strCaseNoE = '--';
        else if (strCountryNoE + strDivisionNoE + strProductNoE != "")
            strCaseNoE = `${strCountryNoE}-${strDivisionNoE}-${strProductNoE}`;

        document.all['tbCASE'].value = strCaseNoS;
        document.all['txECase'].value = strCaseNoE;
    }

    //檢查起始檔號是否合法
    if (!(document.all.tbYEAR.value == "" && document.all.tbCLS.value == "" && document.all.tbCASE.value == "" && document.all.tbVOL.value == "" && document.all.tbSEQ.value == ""))
    {
        if (!CheckFileNo("tbYEAR", "tbCLS", "tbCASE", "tbVOL", "tbSEQ"))
        {
            FocusAtEmpty("tbYEAR", "tbCLS", "tbCASE", "tbVOL", "tbSEQ");
            return false;
        }
    }
    //檢查迄止檔號是否合法
    if (!(document.all.txEYear.value == "" && document.all.txECLS.value == "" && document.all.txECase.value == "" && document.all.txEVol.value == "" && document.all.txESeq.value == ""))
    {
        if (!CheckFileNo("txEYear", "txECLS", "txECase", "txEVol", "txESeq"))
        {
            FocusAtEmpty("txEYear", "txECLS", "txECase", "txEVol", "txESeq");
            return false;
        }
    }

    //0980303	Leslie[0971089]	全文檢索時，需先檢核使用者輸入的字數是否大於2
    if (document.all.h_lbSYS.options[0].value != "0")
    {
        if (!fnCheckBeforeFullTextSearch())
        {
            alert("關鍵詞條件請輸入完整字詞。");
            return false;
        }
    }

    //0990831	Leslie[0990456]	選擇"自訂筆數"時，其筆數欄位不可為空
    if (document.all["dlNumPerPage"].options[document.all["dlNumPerPage"].selectedIndex].value == "S")
    {
        if (jf_Trim(document.all["txPageSize"].value) == "")
        {
            alert("選擇使用[自訂筆數]時，其筆數欄位不可為空。");
            return false;
        }
    }

    return true;
}

function FocusAtEmpty()
{
    for (var argNum = 0; argNum < arguments.length; argNum++)
    {
        if (document.all[FocusAtEmpty.arguments[argNum]].value == "")
        {
            document.all[FocusAtEmpty.arguments[argNum]].focus();
            break;
        }
    }
}
//95.11.07 951072 David 新增
var WsId_GetEmpAccount = "";
//1041126	Cloud	[1040924]	增加處理密件用承辦人選單
var WsId_GetEmpSecAccount = "";

//95.11.08 951072 David
//修正承辦單位、承辦人對應行為
function UserOnBlur(Userobj)
{
    var index = Userobj.selectedIndex;
    //if(Userobj.options == null || Userobj.options.length == 0 || index == -1)
    //1041126	Cloud	[1040924]	增加判斷id
    //if(jf_Trim(document.all["dlUSER_Text"].value)!="")
    //1050812	Leslie	修正承辦人選單異常
    //if (Userobj.id = "dlUSER" && jf_Trim(document.all["dlUSER_Text"].value) != "") {
    if (Userobj.id == "dlUSER" && jf_Trim(document.all["dlUSER_Text"].value) != "")
    {
        //95.11.07 951072 David
        document.all["txUserValue"].value = "";
        var arrPar1 = new Array(1);
        //1060613 Kevin_C 1060456 弱掃Client Potential Code Injection修正
        //arrPar1[0] = jf_Trim(document.all["dlUSER_Text"].value);
        arrPar1[0] = encodeURI(jf_Trim(document.all["dlUSER_Text"].value));
        callObj = jf_CallWS("lib/AK_LIB.asmx", "GetEmpDept", false, arrPar1);
        WsId_GetEmpAccount = callObj.id;
        if (!OnWSResult(callObj))
            document.all["txUserValue"].value = ":::" + document.all["dlUSER_Text"].value;
        return;
    }
    //1041126	Cloud	[1040924]	增加處理密件用承辦人選單
    //1050812	Leslie	修正承辦人選單異常
    //else if (Userobj.id = "" && jf_Trim(document.all["dlSECUSER_Text"].value) != "") {
    else if (Userobj.id == "" && jf_Trim(document.all["dlSECUSER_Text"].value) != "")
    {
        document.all["txSecUserValue"].value = "";
        var arrPar1 = new Array(1);
        //1060613 Kevin_C 1060456 弱掃Client Potential Code Injection修正
        //arrPar1[0] = jf_Trim(document.all["dlSECUSER_Text"].value);
        arrPar1[0] = encodeURI(jf_Trim(document.all["dlSECUSER_Text"].value));
        callObj = jf_CallWS("lib/AK_LIB.asmx", "GetEmpDept", false, arrPar1);
        WsId_GetEmpSecAccount = callObj.id;
        if (!OnWSResult(callObj))
            document.all["txSecUserValue"].value = ":::" + document.all["dlSECUSER_Text"].value;
        return;
    }
    //95.11.08 951072 David
    //如使用者只輸入名字，則以輸入名字為主，組成字串存入txUserValue
    /*if(jf_Trim(document.all["dlUSER_Text"].value) != "")
    {
        var userName = document.all["dlUSER_Text"].value;
        document.all["txUserValue"].value = ":::"+userName;				
        return;
    }*/
    /*		
        if(Userobj.options == null)
        {
            document.all["txUserValue"].value = "";
            return;
        }
        if(Userobj.options.length == 0)
        {
            document.all["txUserValue"].value = "";
            return;
        }
        var index = Userobj.selectedIndex;
        if(index == -1)
        {
            document.all["txUserValue"].value = "";
            return;
        }
    */
    if (Userobj.options == null || Userobj.options.length == 0 || index == -1)
    { }
    else
        document.all["txUserValue"].value = Userobj.options[index].value;
}

//95.11.08 951072 David
//先進行清空承辦人欄位動作，再進行加入對應單位下的承辦人，避免使用者誤解不存在的承辦人
//1041126	Cloud	[1040924]	增加傳入id用於判斷為密件或原單位
//function BeforeSyncComboDept()
function BeforeSyncComboDept(argDlid)
{
    //1120215 Zen 考試院序10 支援以離職人員查詢
    let bHasLeaver = document.all['cbLeaver'].checked;

    var UserLength = document.all["dlUSER"].options.length;
    if (argDlid == 'dlDEPT')
    {
        for (i = 0; i < UserLength; i++)
            document.all["dlUSER"].remove(0);
        document.all["dlUSER_Text"].value = "";
        //1120215 Zen 考試院序10 支援以離職人員查詢
        //akjf_DeptCheck('dlDEPT', 'dlUSER');
        akjf_DeptCheck('dlDEPT', 'dlUSER', bHasLeaver);
    }
    else//1041126	Cloud	[1040924]增加密件單位選單異動
    {
        if (document.all["UserPrivlevel"] && document.all["UserPrivlevel"].value == "1")//權限為本人時不連動
            return;
        UserLength = document.all["dlSECUSER"].options.length;
        for (i = 0; i < UserLength; i++)
            document.all["dlSECUSER"].remove(0);
        document.all["dlSECUSER_Text"].value = "";
        //1120215 Zen 考試院序10 支援以離職人員查詢
        //akjf_DeptCheck('dlSECDEPT', 'dlSECUSER');
        akjf_DeptCheck('dlSECDEPT', 'dlSECUSER', bHasLeaver);
    }

    //1010301	Jeff 1010119   承辦人選單依照姓名排列
    var dlUser = document.all["dlUSER"];
    //1041126	Cloud	[1040924]	密件選單時替換選單對象
    if (argDlid == 'dlSECDEPT')
        dlUser = document.all["dlSECUSER"];
    arrSorted = new Array();
    for (var i = 0; i < dlUser.length; i++)
    {
        arrSorted[i] = dlUser.options[i].text;
        arrSorted[i] += "|";
        arrSorted[i] += dlUser.options[i].value;
    }
    arrSorted.sort();
    for (var i = 0; i < dlUser.length; i++)
    {
        dlUser.options[i].text = arrSorted[i].split("|")[0];
        dlUser.options[i].value = arrSorted[i].split("|")[1];
    }

    //1051108	Leslie	補修正JQueryUI下，ComboBox不會連動觸發
    $('#' + argDlid).trigger("change");
}
//Zoey [951249,95/12/06]  //由公文性質取得業務類別
function jf_Property_Onchange()
{
    if (document.all.dlDOC_PROPERTY.selectedIndex == -1) return;
    var ddlValue = document.all.dlDOC_PROPERTY.options[document.all.dlDOC_PROPERTY.selectedIndex].value;

    var param = new Array(2);
    //1060613 Kevin_C 1060456 弱掃Client Potential Code Injection修正 -S
    //param[0] = document.all.dlSOURCE_ORGNO.options[document.all.dlSOURCE_ORGNO.selectedIndex].value;
    //param[1] = ddlValue;
    param[0] = encodeURI(document.all.dlSOURCE_ORGNO.options[document.all.dlSOURCE_ORGNO.selectedIndex].value);
    param[1] = encodeURI(ddlValue);
    //1060613 Kevin_C 1060456 弱掃Client Potential Code Injection修正 -E

    callObj = jf_CallWS("Lib/AK_LIB.asmx", "GetBTypeNo", false, param);
    iCallID_GetBTypeNo = callObj.id;
    OnWSResult(callObj);
}

function dlBTypeNo_onblur()
{
    //0990909	Leslie[0990456]	為了條件列印的功能，把文字部分也一併回傳至Server
    var strBTypeText = document.all.ddlBTypeNo.options[document.all.ddlBTypeNo.selectedIndex].innerText;
    var strBTypeValue = document.all.ddlBTypeNo.options[document.all.ddlBTypeNo.selectedIndex].value;

    //document.all.txBTypeNo.value=document.all.ddlBTypeNo.options[document.all.ddlBTypeNo.selectedIndex].value;
    document.all.txBTypeNo.value = strBTypeValue + "|" + strBTypeText;
}

function Dateonclick(type)//0960827 001474 Matte
{
    if (type == '0')
    {
        document.all.tbDATEE.value = "";
        document.all.tbDATES.value = "";
        document.all["tbDATES"].focus();
    } else
    {
        //1070830 Zen 1070678 弱掃Ajax修正
        //var resultE = AKI800.CalculateDate('1');
        var resultE = AK.AKI800.CalculateDate('1');
        document.all.tbDATEE.value = resultE.value.Rtn;
        //1070830 Zen 1070678 弱掃Ajax修正
        //var resultS = AKI800.CalculateDate(type);
        var resultS = AK.AKI800.CalculateDate(type);
        if (resultS.value.bSuccess)
            document.all.tbDATES.value = resultS.value.Rtn;
        else
            alert(resultS.value.sErrMsg);
    }
}

function fnCheckBeforeFullTextSearch()
{
    var ret = false;
    if (document.all.tbKEYWORD.value != "")
    {
        var arKeyWord = document.all.tbKEYWORD.value.split(",");
        for (var i = 0; i < arKeyWord.length; i++)
        {
            //if(arKeyWord[i].length > 1)
            //1010326 Cloud 全文檢索取消一個字不查詢的檢核
            ret = true;
        }
        return ret;
    }
    else
        return true;
}

//0981104 Albert 0980551 承辦單位改變時，將選取值存入隱藏欄位H_txDeptNo
//1041126	Cloud	[1040924] 增加傳入id判斷使用不同隱藏欄位
//function Get_dlDEPT()
function Get_dlDEPT(argDdeptid)
{
    if (argDdeptid == "dlDEPT")
        document.all.H_txDeptNo.value = document.all.dlDEPT.options[document.all.dlDEPT.selectedIndex].value;
    else if (argDdeptid == "dlSECDEPT")
        document.all.H_txSecDeptNo.value = document.all.dlSECDEPT.options[document.all.dlSECDEPT.selectedIndex].value;
}

//0990831	Leslie[0990456]	自訂筆數動作
function dlNumPerPageChange(obj)
{
    if (obj.options[obj.selectedIndex].value == "S")
        document.all["txPageSize"].className = "";
    else
        document.all["txPageSize"].className = "hide";
}

//99.11.30		Debra	0990922		2.檢核是否輸入起訖日--start
function jf_CheckBeforSearch()
{
    //1111025 Leslie [1110873、1110891]  [銓敘部]新增客製化功能，查詢Koda系統時，一律要求要文號or檔號or日期區間
    var bCheckKoda = !!(document.all.MOCS && $('#rbKoda').is(":checked"))

    //1120724	Leslie[1120490]	[領務局]當機關為領務局時，強制要求全文檢索搜尋需加上日期條件
    var bBOCAKeyWord = !!(document.all.BOCA && $('#tbKEYWORD').val() != '');

    //1000124	Leslie	依參數設定，決定是否檢核有無輸入日期條件
    //1111025 Leslie [1110873、1110891]  [銓敘部]新增客製化功能，查詢Koda系統時，一律要求要文號or檔號or日期區間
    //if(document.all["hCheckDate"] && document.all["hCheckDate"].value == "N")
    //1120724	Leslie[1120490]	[領務局]當機關為領務局時，強制要求全文檢索搜尋需加上日期條件
    // if ((document.all["hCheckDate"] && document.all["hCheckDate"].value == "N") && !bCheckKoda)
    if ((document.all["hCheckDate"] && document.all["hCheckDate"].value == "N") && !bCheckKoda && !bBOCAKeyWord)
        return true;	//設為"N"時，不檢核日期有無輸入，一律回傳true
    var bRtnbool = true;
    var strErrMsg = "";
    var DOC_NOS = document.all["tbDOC_NOS"].value;
    var DOC_NOE = document.all["tbDOC_NOE"].value;
    var YEARS = document.all["tbYEAR"].value;
    var YEARE = document.all["txEYear"].value;
    var CLS = document.all["tbCLS"].value;
    var ECLS = document.all["txECLS"].value;
    var CASE = document.all["tbCASE"].value;
    var ECASE = document.all["txECase"].value;
    var VOL = document.all["tbVOL"].value;
    var EVOL = document.all["txEVol"].value;
    var SEQ = document.all["tbSEQ"].value;
    var ESEQ = document.all["txESeq"].value;
    //1041113	Cloud[1040921]	(merge)[1010877]	加上保存年限及清理處置選單
    var KEEP_YEARS = jf_Trim(document.all["txKeepYearS"].value);
    var KEEP_YEARE = jf_Trim(document.all["txKeepYearE"].value);
    var CLEAR_PROC = document.all["dlClearProc"].options[document.all["dlClearProc"].selectedIndex].value;
    //1051129	Kevin_C	1051175	加上案件編號
    var CASE_NOS = jf_Trim(document.all["txCaseNoS"].value);
    var CASE_NOE = jf_Trim(document.all["txCaseNoE"].value);
    //如有輸入檔號 或文號 則不用檢查日期
    if (DOC_NOS == "" && DOC_NOE == "" && YEARS == "" && YEARE == "" && CLS == "" && ECLS == "" && CASE == "" && ECASE == "" && VOL == "" && EVOL == "" && SEQ == "" && ESEQ == "")
    {
        //1041113	Cloud[1040921]	(merge)[1010877]	加上保存年限及清理處置選單
        if (KEEP_YEARS != "" || KEEP_YEARE != "" || CLEAR_PROC != "")
        {
            strErrMsg += "以保存年限或清理處置為條件時，至少需輸入檔號年度起迄\n";
            document.all["tbYEAR"].focus();
        }
        //1051129	Kevin_C	1051175	如有輸入案件編號 不用檢查日期
        else if (CASE_NOS != "" || CASE_NOE != "") { }
        else if (document.all["tbDATES"].value == "" && document.all["tbDATEE"].value == "")//1041113	Cloud[1040921]	(merge)[1010877]作為第二組條件(未輸入保存年限或清理處置時
        {
            strErrMsg += "日期條件不可空白\n";
            //1111025 Leslie [1110873、1110891]  [銓敘部]新增客製化功能，查詢Koda系統時，一律要求要文號or檔號or日期區間
            if (bCheckKoda)
                strErrMsg = "查詢 [Koda] 系統公文時，公文文號、檔號或日期條件不可空白\n";
            //1120724	Leslie[1120490]	[領務局]當機關為領務局時，強制要求全文檢索搜尋需加上日期條件
            if (bBOCAKeyWord)
                strErrMsg = "以關鍵詞查詢時，日期條件不可為空\n";
            document.all["tbDATES"].focus();
        }
        if (strErrMsg != "")
        {
            bRtnbool = false;
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        }
    }
    return bRtnbool;
}
//日期比大小 & 2邊日期街有值
function CheckBeforeSearch()
{
    var strDateS = document.all.tbDATES.value;
    var strDateE = document.all.tbDATEE.value;

    if (strDateS == "" && strDateE != "")
        document.all.tbDATES.value = strDateE;
    if (strDateE == "" && strDateS != "")
        document.all.tbDATEE.value = strDateS;

    if (strDateS != "" && strDateE != "" && strDateS > strDateE)
    {
        document.all.tbDATES.value = strDateE;
        document.all.tbDATEE.value = strDateS;
    }
}
//--end
//1020226	Cloud 新增函式清理畫面
function ConfirmClean(argIsCleanAnyway)
{
    var ret = window.confirm("確定要清除嗎?");
    if (ret)
        Clean(argIsCleanAnyway);
    return ret;
}
function Clean(argIsCleanAnyway)
{
    for (i = 0; i < document.forms[0].elements.length; i++)
    {
        if (argIsCleanAnyway != true)
        {
            if (document.forms[0].elements[i].readOnly)
                continue;
        }

        if (document.forms[0].elements[i].type == 'text')
        {
            //1050118 Cloud	[1041039]	紀錄不可見公文單位隱藏欄位不清除
            switch (document.forms[0].elements[i].id)
            {
                case "h_SpDeptlist":
                //1121031 Zen 1111231 修正清除畫面後角色代碼隱藏欄位未還原回預設值之問題
                case "txRoleNo":
                    break;
                default:
                    document.forms[0].elements[i].value = '';
                    break;
            }
        }
        if (document.forms[0].elements[i].type == 'select-one')
        {
            if (document.forms[0].elements[i].id == "dlSOURCE_ORGNO")//所屬機關不清除
                document.forms[0].elements[i].selectedIndex = 0;
            else if (document.forms[0].elements[i].id == "dlDATE_TYPE")//收創文日期
                document.forms[0].elements[i].selectedIndex = 1;
            else
                document.forms[0].elements[i].selectedIndex = 0;
        }
        if (document.forms[0].elements[i].type == 'checkbox')
        {
            switch (document.forms[0].elements[i].id)
            {
                case "ckSubject":
                    //1041127	Cloud	[1040924]	清除時如有勾選密件主旨查詢，不復原案由(主旨)
                    if (!document.all.ckInSubject.checked)
                    {
                        if (document.all.AKI800_KEYWORD.value.indexOf("案由(主旨)") != -1 || document.all.USER_TYPE.value == "2")
                            document.forms[0].elements[i].checked = true;
                        else
                            document.forms[0].elements[i].checked = false;
                    }
                    break;
                case "cbOtherSubject":
                    if (document.all.AKI800_KEYWORD.value.indexOf("並列及其他案由") != -1 || document.all.AK_AKI800_ALL_KEYWORD.value == "Y")
                        document.forms[0].elements[i].checked = true;
                    else
                        document.forms[0].elements[i].checked = false;
                    break;
                case "ckKeyWord":
                    if (document.all.AKI800_KEYWORD.value.indexOf("關鍵字") != -1 || document.all.AK_AKI800_ALL_KEYWORD.value == "Y")
                        document.forms[0].elements[i].checked = true;
                    else
                        document.forms[0].elements[i].checked = false;
                    break;
                case "ckTheme":
                    if (document.all.AKI800_KEYWORD.value.indexOf("主題項") != -1 || document.all.AK_AKI800_ALL_KEYWORD.value == "Y")
                        document.forms[0].elements[i].checked = true;
                    else
                        document.forms[0].elements[i].checked = false;
                    break;
                case "cbUNIT":
                    if (document.all.AKI800_KEYWORD.value.indexOf("來文者") != -1 || document.all.AK_AKI800_ALL_KEYWORD.value == "Y")
                        document.forms[0].elements[i].checked = true;
                    else
                        document.forms[0].elements[i].checked = false;
                    break;
                case "cbDelivUnit":
                    if (document.all.AKI800_KEYWORD.value.indexOf("受文者") != -1 || document.all.AK_AKI800_ALL_KEYWORD.value == "Y")
                        document.forms[0].elements[i].checked = true;
                    else
                        document.forms[0].elements[i].checked = false;
                    break;
                case "cbRpdFile":
                    if (document.all.cbRpdFile && (document.all.AKI800_KEYWORD.value.indexOf("來文電子檔") != -1 || document.all.AK_AKI800_ALL_KEYWORD.value == "Y"))
                        document.forms[0].elements[i].checked = true;
                    else
                        document.forms[0].elements[i].checked = false;
                    break;
                case "cbEditFile":
                    if (document.all.AKI800_KEYWORD.value.indexOf("稿件電子檔") != -1 || document.all.AK_AKI800_ALL_KEYWORD.value == "Y")
                        document.forms[0].elements[i].checked = true;
                    else
                        document.forms[0].elements[i].checked = false;
                    break;
                case "ckCaseName":
                    if (document.all.AKI800_KEYWORD.value.indexOf("案名") != -1 || document.all.AK_AKI800_ALL_KEYWORD.value == "Y")
                        document.forms[0].elements[i].checked = true;
                    else
                        document.forms[0].elements[i].checked = false;
                    break;
                case "ckClosed":
                case "ckWorking":
                case "cbDel":
                case "ckOnLine":
                case "ckPaper":
                case "cbISSUE_NO":
                case "cbFROM_NO":
                case "cbRCV_NO":
                case "cbOrgStore":
                case "cbUnitStore":
                case "cbSend":
                case "cbSave":
                case "cbCaseConY":
                case "cbCaseConN":
                    document.forms[0].elements[i].checked = true;
                    break;
                //1041127	Cloud	[1040924]	增加處理密件主旨
                case "ckInSubject":
                    if (document.all.ckInSubject.checked)
                        document.all.ckInSubject.checked;
                    break;
                default:
                    document.forms[0].elements[i].checked = false;
                    break;
            }
        }
        if (document.forms[0].elements[i].type == 'radio')
        {
            switch (document.forms[0].elements[i].id)
            {

                case "rbCol":
                    if (document.all.AKI800_KEYWORD.value.indexOf("交集") != -1)
                        document.forms[0].elements[i].checked = true;
                    else
                        document.forms[0].elements[i].checked = false;
                    break;
                case "rbUni":
                    if (document.all.AKI800_KEYWORD.value.indexOf("聯集") != -1)
                        document.forms[0].elements[i].checked = true;
                    else
                        document.forms[0].elements[i].checked = false;
                    break;
                case "rbDIY":
                    document.forms[0].elements[i].checked = true;
                    break;
                default:
                    document.forms[0].elements[i].checked = false;
                    break;
            }
        }
        if (document.forms[0].elements[i].type == 'textarea')
            document.forms[0].elements[i].value = '';
    }
}

//1030328 Eileen [1030182] 取得SAMLart網址參數
function GetParam(p)
{
    var strUrl = document.location.toString();
    strUrl = unescape(strUrl);
    var rg_szItems = strUrl.split("?");
    if (rg_szItems.length == 2)
    {
        var rg_szItems2 = rg_szItems[1].split("&");
        for (var i = 0; i < rg_szItems2.length; i++)
        {
            var rg_items = rg_szItems2[i].split("=");
            if (rg_items[0] == "SAMLart")
                return rg_items[1];
        }
    }
}
//1041113	Cloud[1040921]	(merge)[1010877]	加上保存年限及清理處置選單
function fnSetKeepYear(argObj)
{
    document.all["txKeepYearS"].value = argObj.options[argObj.selectedIndex].value;
    document.all["txKeepYearE"].value = argObj.options[argObj.selectedIndex].value;
}
//104.11.26	Cloud	[1040924]	[陸委會]新增密件主旨查詢功能-勾密件主旨時
//1.顯示密件查詢用選單 2.隱藏原主旨選項 3.顯示密件密等選單
function fnSetcdSubject()
{

    if (document.all["UserPrivlevel"] && document.all["UserPrivlevel"].value != "2" && document.all["UserPrivlevel"].value != "3" && document.all["UserPrivlevel"].value != "4" && document.all["UserPrivlevel"].value != "1")//調檔權限非一般權限時，不支援
    {
        var srtPrivlevel = "";
        switch (document.all["UserPrivlevel"].value)
        {
            case "0":
                srtPrivlevel = "不開放";
                break;

            case "5":
                srtPrivlevel = "特殊權限";
                break;

            case "6":
                srtPrivlevel = "可調閱經本人發文";
                break;
        }
        alert('此帳號調檔權限為：' + srtPrivlevel + '，不支援使用此種查詢功能，請聯絡系統管理員');
        document.all.ckInSubject.checked = false;
        return;
    }
    if (document.all.ckInSubject.checked)//勾密件主旨
    {
        //1050413 Cloud [1050087] 升級二代
        //document.all.dlDOC_SEC.className= "HIDE";
        document.all.dlDOC_SEC.className = "hide";
        document.all.dlSECDOC_SEC.className = "";
        //1050413 Cloud [1050087] 升級二代
        /*document.all.ckSubject.className= "HIDE"; 
        document.all.ckSubject.nextSibling.className= "HIDE";
        document.all.dlDEPT.className= "HIDE";
        document.all.dlDEPT_Text.className= "HIDE";
        document.all.dlDEPT_Container.className= "HIDE";*/
        document.all.ckSubject.className = "hide";
        document.all.ckSubject.nextSibling.className = "hide";
        //1081031	Leslie	版更後修正，comboBox改用正規方式設定顯示或隱藏
        /*document.all.dlDEPT.className= "hide";
        document.all.dlDEPT_Text.className= "hide";
        document.all.dlDEPT_Container.className= "hide";*/
        $('#dlDEPT').combobox('hide');
        document.all.dlDEPT.selectedIndex = 0;
        document.all.dlDEPT_Text.value = "";
        //1050413 Cloud [1050087] 升級二代
        /*document.all.dlUSER.className= "HIDE";
        document.all.dlUSER_Text.className= "HIDE";
        document.all.dlUSER_Container.className= "HIDE";*/
        //1081031	Leslie	版更後修正，comboBox改用正規方式設定顯示或隱藏
        /*document.all.dlUSER.className= "hide";
        document.all.dlUSER_Text.className= "hide";
        document.all.dlUSER_Container.className= "hide";*/
        $('#dlUSER').combobox('hide');
        document.all.dlUSER.selectedIndex = 0;
        document.all.dlUSER_Text.value = "";

        //1081031	Leslie	版更後修正，comboBox改用正規方式設定顯示或隱藏
        /*document.all.dlSECDEPT.className= "";
        document.all.dlSECDEPT_Text.className= "";
        //1050413 Cloud [1050087] 升級二代
        //document.all.dlSECDEPT_Container.className= "";
        document.all.dlSECDEPT_Container.className= "custom-combobox";
    	
        document.all.dlSECUSER.className= "";
        document.all.dlSECUSER_Text.className= "";
        //1050413 Cloud [1050087] 升級二代
        //document.all.dlSECUSER_Container.className= "";
        document.all.dlSECUSER_Container.className= "custom-combobox";*/
        $('#dlSECDEPT').combobox('show');
        $('#dlSECUSER').combobox('show');
        if (document.all["UserPrivlevel"] && document.all["UserPrivlevel"].value == "1")//權限為本人時不可動密件承辦人選單
        {
            //1081031	Leslie	版更後修正，comboBox改用正規方式設定是否啟用
            /*document.all.dlSECUSER.disabled= true;
            document.all.dlSECUSER_Text.disabled= true;
            document.all.dlSECUSER_Container.disabled= true;*/
            $('#dlSECUSER').combobox('setDisable');
        }

    }
    else
    {
        document.all.ckSubject.className = "";
        document.all.ckSubject.nextSibling.className = "";

        //1081031	Leslie	版更後修正，comboBox改用正規方式設定顯示或隱藏
        /*document.all.dlDEPT.className= "";
        document.all.dlDEPT_Text.className= "";
        //1050413 Cloud [1050087] 升級二代
        //document.all.dlDEPT_Container.className= "";
        document.all.dlDEPT_Container.className= "custom-combobox";
    	
        document.all.dlUSER.className= "";
        document.all.dlUSER_Text.className= "";
        //1050413 Cloud [1050087] 升級二代
        //document.all.dlUSER_Container.className= "";
        document.all.dlUSER_Container.className= "custom-combobox";*/
        $('#dlDEPT').combobox('show');
        $('#dlUSER').combobox('show');

        //1050413 Cloud [1050087] 升級二代
        /*document.all.dlSECDEPT.className= "HIDE";
        document.all.dlSECDEPT_Text.className= "HIDE";
        document.all.dlSECDEPT_Container.className= "HIDE";*/
        //1081031	Leslie	版更後修正，comboBox改用正規方式設定顯示或隱藏
        /*document.all.dlSECDEPT.className= "hide";
        document.all.dlSECDEPT_Text.className= "hide";
        document.all.dlSECDEPT_Container.className= "hide";*/
        $('#dlSECDEPT').combobox('hide');
        if (document.all["UserPrivlevel"] && document.all["UserPrivlevel"].value == "4")//權限為全機關才需要清空
        {
            document.all.dlSECDEPT.selectedIndex = 0;
            document.all.dlSECDEPT_Text.value = "";
        }
        //1050413 Cloud [1050087] 升級二代
        /*document.all.dlSECUSER.className= "HIDE";
        document.all.dlSECUSER_Text.className= "HIDE";
        document.all.dlSECUSER_Container.className= "HIDE";*/
        //1081031	Leslie	版更後修正，comboBox改用正規方式設定顯示或隱藏
        /*document.all.dlSECUSER.className= "hide";
        document.all.dlSECUSER_Text.className= "hide";
        document.all.dlSECUSER_Container.className= "hide";*/
        $('#dlSECUSER').combobox('hide');
        if (document.all["UserPrivlevel"] && document.all["UserPrivlevel"].value != "1")//權限為本人時不可動密件承辦人選單
        {
            document.all.dlSECUSER.selectedIndex = 0;
            document.all.dlSECUSER_Text.value = "";
        }
        document.all.dlDOC_SEC.className = "";
        //1050413 Cloud [1050087] 升級二代
        //document.all.dlSECDOC_SEC.className= "HIDE";
        document.all.dlSECDOC_SEC.className = "hide";

    }



}

//1050707   Leslie  二代升級功能，以AJAX方式進行查詢以避開快顯封鎖
function btSearchClientSideProc(argBtName)
{
    var ctrlList = $(':input:not([type="image"],[type="submit"])');  //以JQuery一次取得所有可見的控制項
    var ParaList = new Array();
    var valueList = new Array();

    for (var i = 0, iMax = ctrlList.length; i < iMax; i++)
    {
        if (ctrlList[i].id)
        {
            ParaList[i] = ctrlList[i].id;
            if (ctrlList[i].type == "checkbox" || ctrlList[i].type == "radio")
                valueList[i] = ctrlList[i].checked.toString();
            else
                valueList[i] = $(ctrlList[i]).val();
        }
    }
    //1130919   Cloud   1130762 承辦人條件支援僅查詢承辦人、負責人
    if (document.all["ckEmpName"].checked == false && document.all["ckRpsEmpName"].checked == false)
    {
        document.all["ckEmpName"].checked = true; document.all["ckRpsEmpName"].checked = true;
    }
    var rtn = AK.AKI800.btSaveAjax(jf_GetArtifact(), ParaList, valueList, argBtName);
    if (rtn.error)
    {
        return "ERR：" + rtn.error.Message;
    }
    return rtn.value;
}

function CallBackByImgView()
{
    return opener.theSSO.MP.queryDocList.CallBackByImgView();
    opener.window.focus();
}
//1051128	Kevin_C	1051175	新增案件編號查詢條件欄位
function CaseNoOnBlur(strOnblurId)
{
    if (document.all.txCaseNoS.value == "" && document.all.txCaseNoE.value == "")
        return;
    if (strOnblurId == "txCaseNoS" && document.all.txCaseNoE.value == "")
        document.all.txCaseNoE.value = document.all.txCaseNoS.value;
    else if (strOnblurId == "txCaseNoE" && document.all.txCaseNoS.value == "")
        document.all.txCaseNoS.value = document.all.txCaseNoE.value;
    else if (parseInt(document.all.txCaseNoE.value) < parseInt(document.all.txCaseNoS.value) && document.all.txCaseNoS.value != "" && document.all.txCaseNoE.value != "")
    {
        var temp = "";
        temp = document.all.txCaseNoE.value;
        document.all.txCaseNoE.value = document.all.txCaseNoS.value;
        document.all.txCaseNoS.value = temp;
    }
}

//1100813	Leslie[1100811]	[高大]新增紀錄查詢條件功能
function btCondRecord()
{
    var ctrlList = $(':input:not([type="image"],[type="submit"])');  //以JQuery一次取得所有可見的控制項
    var ParaList = new Array();
    var valueList = new Array();

    for (var i = 0, iMax = ctrlList.length; i < iMax; i++)
    {
        if (ctrlList[i].id)
        {
            ParaList[i] = ctrlList[i].id;
            if (ctrlList[i].type == "checkbox" || ctrlList[i].type == "radio")
                valueList[i] = ctrlList[i].checked.toString();
            else
                valueList[i] = $(ctrlList[i]).val();
        }
    }
    //以上為取得目前的查詢條件，以下進行比對
    var condRecord = { DESC: "", Conds: [] };
    var DefaultCond = JSON.parse(sessionStorage.DefaultCond);
    for (let j = 0, jMax = ParaList.length; j < jMax; j++)
    {
        if (ParaList[j] == DefaultCond.ctrlID[j] && valueList[j] != DefaultCond.value[j] && valueList[j] != null && valueList[j] != undefined)
        {
            let $obj = $('#' + ParaList[j]);
            if ($obj.attr('data-CN') || $obj.parent().attr('data-CN'))
            {
                condRecord.Conds.push({
                    CondID: ParaList[j],
                    CondName: $obj.attr('data-CN') || $obj.parent().attr('data-CN'),
                    CondValue: valueList[j],
                    CondType: $obj[0].type
                })
            }
        }
    }
    localStorage["USER_CONDITION_" + jf_GetArtifact()] = JSON.stringify({ Root: [condRecord] });
    jf_OpenChildWin('AKI800C1.aspx', "AKI800C1", 750, 550);
}

//1120215 Zen 考試院序10 支援以離職人員查詢
function cbLeaverOnclick()
{
    let bInSubject = document.all['ckInSubject'].checked;

    if (bInSubject)
        BeforeSyncComboDept('dlSECDEPT');
    else
        BeforeSyncComboDept('dlDEPT');
}

//1120612	Leslie[1120361]	弱掃Client DOM Stored XSS修正
function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}