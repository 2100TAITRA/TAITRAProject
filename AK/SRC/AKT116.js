/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.08.22
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2006.08.17	Caesar	950825	點收公文若主旨有特定字元,導致呼叫WebService失敗
 * 2006.08.20	Ferdy	950786	輸入公文文號不存在而focus到該欄位時未清空造成刷條碼點收不便,改為會清空
 * 2006.10.04	Whay	950898	調整開啟AKS116時的預設視窗大小並開放最大化選項
 * 2006.12.01	David	950852併950786併950860 依照清除或保留模式，決定是否清空畫面欄位
 * 2006.12.21	Whay	951354  提供批次更動作業別與註記及畫面美工
 * 2007.05.02	Mob		000388	修正當條碼機讀入條碼時，最前面會多出一個空格
 * 2007.05.08	Andy	000290	避免Barcode Reader會多一個無法處理的Enter事件故直接取消Enter事件
 * 2007.07.10	Leo	000290	取消Andy 000290的修改
 * 2007.07.12   Cola    000991  交通部退文相關處理 (可選擇退至承辦單位or歸檔單位)
 * 2007.08.31   Cola    001480  [國合會]依系統參數決定是否額外顯示結案別
 * 2007.10.09	Cola	001478	國合會-新增一Function:GetAllComNo，搭配AKT116，輸入一文號(不論母文或子文)，帶回所有相關文號 
 * 2007.10.11	Cola	001694	若公文不能點收，依照公文狀態顯示警告訊息
 * 2007.11.06	Cola	MAC610002	AKT116開啟AKM330後帶回AKT116時，修正相關資訊處理  
 * 2007.11.26	Cola	001697	[橋委會]依系統參數決定是否額外顯示DOC_D中資訊  
 * 2008.01.29	Cola	0970055	[橋委會]刷入條碼先至DOC_D查詢，若符合DOC_NO1即帶回DOC_NO至AKT116
 * 2008.03.28   Cola    0970255 [橋委會]修改或新增點收資訊時未重新抓取對應資訊
 * 2008.05.08	Cola	950754	提供附件抽存功能 
 * 2009.11.11	Howard	0980587	配合藥檢局四局合一修改依庫房管理模式ChkUserDocPriv()新增公文文號之參數並調整警示訊息
 * 2010.06.30	Leslie	0990357	修改程式UI控制，於處理線上簽核公文時，將"歸檔單位"選項Disable
 * 2010.12.10	Debra	0990593	[雲科大]調整Layout新增分頁號及頁數的資料
 * 2011.07.13	Davy	1000129	[檔管局]新增紙本來文併同歸檔相關功能
 * 2011.08.25   Ivory   1000825 欄位顯示校正,並將下方Scroll Bar顯示移除
 * 2012.07.18	Jagle	1010745	點選公文基資開啟AKM330時，增加傳入權仗
 * 2012.09.10	Jagle	1010914	桃機：線上簽核公文選擇退文、輸入原因註記，點選確定後，待處理清單會被清空
 * 2012.12.19	Jagle	1011204	取得公文承辦單位時增加傳入機關代碼，避免多機關架構下回傳的承辦單位錯誤
 * 2013.06.13	Jagle	1020477	增加顯示核決者
 * 2013.08.05	Cloud	--		因開啟查詢待點收子視窗時會將查詢過的公文以網址參數傳入子視窗，但會因過常被截斷導致出現異常，修改傳入查詢過公文方式
 * 2013.11.25	Cloud	1020904 修正實際歸檔日期欄位名稱為送件歸檔日期，並修正撈取欄位
 * 2014.02.12	Gabby	1040075 新增點收時顯示密等與展期公文資訊功能
 * 2015.03.27	Cloud	1040185	修改退文至歸檔為退回總發
 * 2015.03.30	Gabby	1040141	修正弱點
 * 2015.04.01	Gabby	1040172	避免Barcode Reader會多一個無法處理的Enter事件
 * 2015.07.07   Kenny   1040504 點選文號超連結增加顯示主旨欄位資訊；及點選清除時需一併清除主旨欄位
 * 2015.07.14   Kenny   1040504 點收及確認後需清除主旨欄位
 * 2016.10.05   Kenny   1050313 因回傳值並無使用，移除對CheckCaseMain叫用
 * 2016.02.22   Cloud   1050087 升級二代
 * 2017.07.24	Cloud	1060724	開啟子視窗提供SCROLLBAR
 * 2017.08.17	Kevin_C	1060719	focus轉為JQuery形式
 * 2017.09.30	Kevin_C	1060839	修正AKT116清除後，資料列樣式不正確
 * 2017.10.27   Cloud   1061030 修改，彙併辦公文不可單退子文-子文CHECKBOX 不可單獨勾選
 * 1070709      Zen     1070678 弱掃XSS修正
 * 1070830      Zen     1070678 弱掃Ajax修正
 * 1070907      Cloud   1070678 修改不使用client端存取cookie
 * 1071017      Zen     1070678 弱掃Client Potential XSS修正
 * 1071025      Zen     1070678 修正弱掃Client Potential XSS衍生錯誤
 * 1080116		Kevin_C	1070678	修正弱掃Client Potential XSS
 * 2019.11.19   Cloud   1080980 修改，彙併辦公文不可單退子文-子文CHECKBOX 不可單獨勾選-補強取消部分
 * 1090310		Kevin_C	1090087	系統參數COM_ACCEPT增加支援僅帶回併件公文功能
 * 2020.07.06	Cloud	1071087	修正備註使用兩個不同大小寫屬性紀錄，導致叫用ws寫入時不正確的bug
 * 2020.11.20	Cloud	1090828	修改彙併辦子文不可單獨異動
 * 2021.01.15	Cloud	1090997	修正新增單筆公文時退文對象一律使用系統參數的bug
 * 2021.02.02	Cloud	1090927	修改支援Safari，移除document.activeElement，調整超連結回傳物件
 * 2021.02.19	Cloud	1090927	配合手機使用調整最小寬度
 * 1100623      Joe     1100789 弱掃修正Client Potential XSS
 * 2021.09.17   Cloud   1100991 弱掃修正Client Potential XSS
 * 1110103      Zen     1101292 修正多次點擊重複PostBack之問題
 * 2023.01.19   Cloud   銓敘部序108  歸檔單位資訊換成公文主旨
 * 1120605 		Joe 	1120361 弱掃修正XSS
 * 1120612 		Joe 	1120361 弱掃修正XSS
 * 1121101		Cloud	領務局序68 因檔管人員解析度較低，發生序號3碼折行問題-調整寬度
 * 2023.12.13   Cloud 屏東序301 修正無法退回總發問題
 * 1130820      Jason   中榮序74   升級二代
 * 2024.10.09   Cloud   1130941 弱掃修改
 * 2024.10.17   Cloud   1130941 弱掃修改XSS
 * 2024.12.11	Cloud	1130983	參照0990500調整程式新增附件抽存相關行為
 * 2025.03.03	Cloud	1140305 修正附件抽存使用錯誤屬性問題
 * 2025.07.17	Cloud 	1140954 修正Call GetFieldValue 未使用機關代碼問題
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

var RecordNO = 1;
var ErrMsgTitle = "您輸入之資料有誤，明細如下，請更正後重試";
var rowscount = 0;
var UpdateFlag = 0;
var AKT116_DocList = new Object();
AKT116_DocList.Info = new Array();
AKT116_DocList.Att = new Array();
var AKT116_Detail = new Object();
var IsClsChecked = false;		// 是否檢查過分類號
var IsCanUseInitCase = false;	// 是否可使用通案 
var CheckFlag = true;
var CompareFlag = true

//951354 當註記從退文改為點收紀錄日期  by whay
var uExtfileDate;
var uCloseDate;
//alert(typeof(jf_BlockContextMenu))
//document.oncontextmenu= jf_BlockContextMenu
//document.onkeydown = jf_DocumentOnKeyDown

//1131211	Cloud	1130983	參照0990500	紀錄目前選取公文的抽存附件預計歸檔日期
var uCurrDocAttExtFileDate = "";

//控制基資欄位的顯示 
//DisplayDocInfo();

var ComType = 0;	// 併案狀態

var strDefaultType = "rbType";	//退文至之預設選項
//2016.02.22   Cloud   1050087 升級二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//2016.02.23   Cloud   1050087 升級二代
/*function ShowMsg()
{
	if (document.all["ValidationSummary1"].innerText != "")
		alert(document.all["ValidationSummary1"].innerText);
}*/

//1070830 Zen 1070678 弱掃Ajax修正
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

//demo
//document.all["DATA1"].outerHTML="<TABLE id=DATA1 style=\"TABLE-LAYOUT: fixed; Z-INDEX: 104; WIDTH: 724px; HEIGHT: 36px\" borderColor=#ffffff cellSpacing=1 cellPadding=1 width=684 border=2><TBODY><TR id=1><TD style=\"WIDTH: 48px\" align=middle bgColor=#f7f7de><INPUT id=cbCLEAR1 onclick=ClearCheck() tabIndex=-1 type=checkbox name=cbCLEAR1></TD><TD style=\"WIDTH: 56px\" align=middle bgColor=#f7f7de>1</TD><TD style=\"WIDTH: 100px\" align=left bgColor=#f7f7de><A id=NO1 tabIndex=-1 href=\"javascript:SelectRow()\">009110249</A></TD><TD style=\"WIDTH: 50px\" align=middle bgColor=#f7f7de>點收</TD><TD style=\"WIDTH: 230px\" align=left bgColor=#f7f7de></TD><TD align=left bgColor=#f7f7de></TD></TR><TR id=2><TD style=\"WIDTH: 48px\" align=middle bgColor=#f7f7de><INPUT id=cbCLEAR2 onclick=ClearCheck() tabIndex=-1 type=checkbox name=cbCLEAR2></TD><TD style=\"WIDTH: 56px\" align=middle bgColor=#f7f7de>2</TD><TD style=\"WIDTH: 100px\" align=left bgColor=#f7f7de><A id=NO2 tabIndex=-1 href=\"javascript:SelectRow()\">009111512</A></TD><TD style=\"WIDTH: 50px\" align=middle bgColor=#f7f7de>點收</TD><TD style=\"WIDTH: 230px\" align=left bgColor=#f7f7de></TD><TD align=left bgColor=#f7f7de></TD></TR><TR id=3><TD style=\"WIDTH: 48px\" align=middle bgColor=#f7f7de><INPUT id=cbCLEAR3 onclick=ClearCheck() tabIndex=-1 type=checkbox name=cbCLEAR3></TD><TD style=\"WIDTH: 56px\" align=middle bgColor=#f7f7de>3</TD><TD style=\"WIDTH: 100px\" align=left bgColor=#f7f7de><A id=NO3 tabIndex=-1 href=\"javascript:SelectRow()\">009112196</A></TD><TD style=\"WIDTH: 50px\" align=middle bgColor=#f7f7de>點收</TD><TD style=\"WIDTH: 230px\" align=left bgColor=#f7f7de></TD><TD align=left bgColor=#f7f7de></TD></TR><TR id=4><TD style=\"WIDTH: 48px\" align=middle bgColor=#f7f7de><INPUT id=cbCLEAR4 onclick=ClearCheck() tabIndex=-1 type=checkbox name=cbCLEAR4></TD><TD style=\"WIDTH: 56px\" align=middle bgColor=#f7f7de>4</TD><TD style=\"WIDTH: 100px\" align=left bgColor=#f7f7de><A id=NO4 tabIndex=-1 href=\"javascript:SelectRow()\">009113316</A></TD><TD style=\"WIDTH: 50px\" align=middle bgColor=#f7f7de>點收</TD><TD style=\"WIDTH: 230px\" align=left bgColor=#f7f7de></TD><TD align=left bgColor=#f7f7de></TD></TR><TR id=5><TD style=\"WIDTH: 48px\" align=middle bgColor=#f7f7de><INPUT id=cbCLEAR5 onclick=ClearCheck() tabIndex=-1 type=checkbox name=cbCLEAR5></TD><TD style=\"WIDTH: 56px\" align=middle bgColor=#f7f7de>5</TD><TD style=\"WIDTH: 100px\" align=left bgColor=#f7f7de><A id=NO5 tabIndex=-1 href=\"javascript:SelectRow()\">009113639</A></TD><TD style=\"WIDTH: 50px\" align=middle bgColor=#f7f7de>點收</TD><TD style=\"WIDTH: 230px\" align=left bgColor=#f7f7de></TD><TD align=left bgColor=#f7f7de></TD></TR><TR id=6><TD style=\"WIDTH: 48px\" align=middle bgColor=#f7f7de><INPUT id=cbCLEAR6 onclick=ClearCheck() tabIndex=-1 type=checkbox name=cbCLEAR6></TD><TD style=\"WIDTH: 56px\" align=middle bgColor=#f7f7de>6</TD><TD style=\"WIDTH: 100px\" align=left bgColor=#f7f7de><A id=NO6 tabIndex=-1 href=\"javascript:SelectRow()\">009114296</A></TD><TD style=\"WIDTH: 50px\" align=middle bgColor=#f7f7de>點收</TD><TD style=\"WIDTH: 230px\" align=left bgColor=#f7f7de></TD><TD align=left bgColor=#f7f7de></TD></TR><TR id=7><TD style=\"WIDTH: 48px\" align=middle bgColor=#f7f7de><INPUT id=cbCLEAR7 onclick=ClearCheck() tabIndex=-1 type=checkbox name=cbCLEAR7></TD><TD style=\"WIDTH: 56px\" align=middle bgColor=#f7f7de>7</TD><TD style=\"WIDTH: 100px\" align=left bgColor=#f7f7de><A id=NO7 tabIndex=-1 href=\"javascript:SelectRow()\">009115208</A></TD><TD style=\"WIDTH: 50px\" align=middle bgColor=#f7f7de>點收</TD><TD style=\"WIDTH: 230px\" align=left bgColor=#f7f7de></TD><TD align=left bgColor=#f7f7de></TD></TR><TR id=8><TD style=\"WIDTH: 48px\" align=middle bgColor=#f7f7de><INPUT id=cbCLEAR8 onclick=ClearCheck() tabIndex=-1 type=checkbox name=cbCLEAR8></TD><TD style=\"WIDTH: 56px\" align=middle bgColor=#f7f7de>8</TD><TD style=\"WIDTH: 100px\" align=left bgColor=#f7f7de><A id=NO8 tabIndex=-1 href=\"javascript:SelectRow()\">009115597</A></TD><TD style=\"WIDTH: 50px\" align=middle bgColor=#f7f7de>點收</TD><TD style=\"WIDTH: 230px\" align=left bgColor=#f7f7de></TD><TD align=left bgColor=#f7f7de></TD></TR><TR id=9><TD style=\"WIDTH: 48px\" align=middle bgColor=#f7f7de><INPUT id=cbCLEAR9 onclick=ClearCheck() tabIndex=-1 type=checkbox name=cbCLEAR9></TD><TD style=\"WIDTH: 56px\" align=middle bgColor=#f7f7de>9</TD><TD style=\"WIDTH: 100px\" align=left bgColor=#f7f7de><A id=NO9 tabIndex=-1 href=\"javascript:SelectRow()\">009115598</A></TD><TD style=\"WIDTH: 50px\" align=middle bgColor=#f7f7de>點收</TD><TD style=\"WIDTH: 230px\" align=left bgColor=#f7f7de></TD><TD align=left bgColor=#f7f7de></TD></TR><TR id=10><TD style=\"WIDTH: 48px\" align=middle bgColor=#f7f7de><INPUT id=cbCLEAR10 onclick=ClearCheck() tabIndex=-1 type=checkbox name=cbCLEAR10></TD><TD style=\"WIDTH: 56px\" align=middle bgColor=#f7f7de>10</TD><TD style=\"WIDTH: 100px\" align=left bgColor=#f7f7de><A id=NO10 tabIndex=-1 href=\"javascript:SelectRow()\">009115795</A></TD><TD style=\"WIDTH: 50px\" align=middle bgColor=#f7f7de>點收</TD><TD style=\"WIDTH: 230px\" align=left bgColor=#f7f7de></TD><TD align=left bgColor=#f7f7de></TD></TR></TBODY></TABLE>";
//1060223 Cloud 1050087 升級二代
//function jf_ToolBarHandle()
// 2016.03.01   Cloud   1050087 升級二代
var Deptlength = "";
var SendDeptlength = "";
var lbdectlength = "5em";
//* 1121101		Cloud	領務局序68 因檔管人員解析度較低，發生序號3碼折行問題-調整寬度
//var lbErrmsglength = "5.5em";
var lbErrmsglength = "4.5em";
function jf_ToolBarHandle(e)
{
    var xObjectName;
    var evBtn;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    //1060222 Cloud 1050087 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            var xUrl = "";
            //* 2013.08.05	Cloud	--		因開啟查詢待點收子視窗時會將查詢過的公文以網址參數傳入子視窗，但會因過常被截斷導致出現異常，修改傳入查詢過公文方式
            //xUrl = "AKS116.aspx?RtnObj=lbReturnValue&DocNo="+document.all.tbSaveDocNo.value+"&SAMLart="+jf_ReadCookie("SAMLart");
            //* 1070907      Cloud   1070678 修改不使用client端存取cookie
            //jf_SaveCookie("AKT116DocList", document.all.tbSaveDocNo.value);
            AK.AKT116.SaveDocList(document.all.tbSaveDocNo.value, jf_GetSessionID());
            xUrl = "AKS116.aspx?RtnObj=lbReturnValue&SAMLart=" + jf_ReadCookie("SAMLart");
            OpenWindow(xUrl);
            Page_BlockSubmit = true;
            break;
        case "btSave": //點收

            if (document.all["Record"].length == 0)
            {
                jf_ShowMeg("您尚未輸入點收資料!!", ErrMsgTitle);
                Page_BlockSubmit = true;
                return;
            }

            //檢核退文必須有退文註記 #2007.02.28 Andy
            for (var x = 0; x < AKT116_DocList.Info.length; x++)
            {
                if (AKT116_DocList.Info[x].Doc_State == "15" && AKT116_DocList.Info[x].Tx_No == "")
                {
                    jf_ShowMeg("作業別為退文時必須輸入退文註記!!", ErrMsgTitle);
                    Page_BlockSubmit = true;
                    return;
                }
            }

            var IsSelectData = false;
            for (i = 0; i < document.all["Record"].length; i++)
            {
                if (document.all["cbCLEAR" + (i + 1)].checked) //不點收
                    AKT116_DocList.Info[i].Flag = "1";
                else
                {
                    //1020319	Jagle	避免判斷錯誤，不點收的FLAG應該要為0(土銀測出之問題，一併修正)
                    AKT116_DocList.Info[i].Flag = "0";
                    IsSelectData = true;
                }
            }

            if (!IsSelectData)
            {
                jf_ShowMeg("您尚未輸入點收資料(全部選取不點收)!!", ErrMsgTitle);
                Page_BlockSubmit = true;
                return;
            }

            //document.all["tbRecord"].value = Content;
            jf_ShowWaitState();
            //IsServerHandling = true;
            Page_BlockSubmit = true;
            document.all["tbDocNo"].value = "";
            document.all["tbSaveDocNo"].value = "";
            document.all["tbComNo"].value = "";
            //1040714   Kenny   [1040504]   點收後需清除主旨欄位
            document.all["txDocSubject"].value = "";
            document.all["txDocSubject"].disabled = false;
            /*********************************************************************/
            //1060301	Cloud 升級二代，此段程式碼已無用，mark
            //document.all["txSubject"].value="";
            //document.all["txDept"].value="";
            //document.all["dlDept"].selectedIndex=0;
            //document.all["txEmp"].value="";
            //document.all.dlEmp.options.length = 0;
            //1060301	Cloud 升級二代，此段程式碼已無用，mark
            /*document.all["dlSecNo"].selectedIndex=0;
			document.all["txCnt"].value="";
			document.all["dlUnit"].selectedIndex=0;*/
            document.all["txClsNo"].value = "";
            //document.all["txKeepYear"].value="";
            //document.all["dlKeepYear"].selectedIndex=0;
            document.all["txComNo"].value = "";
            document.all["txCaseNo"].value = "";
            document.all["txCaseName"].value = "";
            //附件
            //1060301	Cloud 升級二代，此段程式碼已無用，mark
            /*for(var i=2;i<12;i++)
			{
				document.all["dg1__ctl"+i+"_txDesc"].value="";
				document.all["dg1__ctl"+i+"_dlMedia"].selectedIndex=0;
				document.all["dg1__ctl"+i+"_txCnt1"].value="";
				document.all["dg1__ctl"+i+"_dlUnit1"].selectedIndex=0;
			}*/
            /*********************************************************************/
            document.all["btSelectAll"].style.visibility = "hidden";
            document.all["btClearSelect"].style.visibility = "hidden";
            document.all["btReverse"].style.visibility = "hidden";
            /******************************資料處理WS********************************************/
            //var ObjClass = new Array(1);
            //ObjClass[0]=AKT116_DocList;
            var Param = new Array(1);
            //2006.08.17 Caesar 點收公文若主旨有特定字元,導致呼叫WebService失敗
            //	              因伺服器端未使用Subject屬性,故先清除之.
            for (var x = 0; x < AKT116_DocList.Info.length; x++)
                AKT116_DocList.Info[x].Subject = "";
            Param[0] = AKT116_DocList;

            //service.useService("AKT116WS.asmx?WSDL","SR1");
            //RtnObj  = service.SR1.callService("ModifyTable", document.all["Test"].value, ObjClass[0]);
            RtnObj = jf_CallWS("AKT116WS.asmx", "ModifyTable", false, Param);
            iCallID_Save = RtnObj.id;
            OnWSResult(RtnObj);
            /**********************************************************************************/
            if (CompareFlag == false)
            {
                Page_BlockSubmit = true;
            }
            //1060222 Cloud 1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            document.all["txExtfileDate"].value = "";
            document.all["txCloseDate"].value = "";
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060222 Cloud 1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            var pUser = document.all.txUser.value;
            Page_BlockSubmit = !window.confirm("確定要清除全部待點收資料嗎?");
            if (!Page_BlockSubmit)
            {
                document.all["tbSaveDocNo"].value = "";
                //1060301	Cloud 升級二代，此段程式碼已無用，mark
                /*document.all["tbComNo"].value = "";*/
                /*********************************************************************/
                //document.all["txSubject"].value="";
                //document.all["txDept"].value="";
                //document.all["dlDept"].selectedIndex=0;
                //document.all["txEmp"].value="";
                //document.all.dlEmp.options.length = 0;
                //1060301	Cloud 升級二代，此段程式碼已無用，mark
                /*document.all["dlSecNo"].selectedIndex=0;
				document.all["txCnt"].value="";
				document.all["dlUnit"].selectedIndex=0;*/
                document.all["txClsNo"].value = "";
                //document.all["txKeepYear"].value="";
                //document.all["dlKeepYear"].selectedIndex=0;
                document.all["txComNo"].value = "";
                document.all["txCaseNo"].value = "";
                document.all["txCaseName"].value = "";
                //1060301	Cloud 升級二代，此段程式碼已無用，mark
                //document.all["txFileYear"].value="";
                //附件
                //1060301	Cloud 升級二代，此段程式碼已無用，mark
                /*for(var i=2;i<12;i++)
				{
					document.all["dg1__ctl"+i+"_txDesc"].value="";
					document.all["dg1__ctl"+i+"_dlMedia"].selectedIndex=0;
					document.all["dg1__ctl"+i+"_txCnt1"].value="";
					document.all["dg1__ctl"+i+"_dlUnit1"].selectedIndex=0;
				}*/
                /*********************************************************************/
                document.all.txUser.value = pUser;
                document.all["Record"].length = 0;
                //document.all["DATA1"].outerHTML ="<TABLE id=DATA1 style=\"TABLE-LAYOUT: fixed; Z-INDEX: 104; WIDTH: 724px; HEIGHT: 36px\" borderColor=#ffffff cellSpacing=1 cellPadding=1 width=684 border=2><TBODY></TBODY></TABLE>";
                //1060301 Cloud	1050087	升級二代
                //document.all["DATA1"].outerHTML ="<TABLE id=DATA1 style=\"TABLE-LAYOUT: fixed; Z-INDEX: 104; HEIGHT: 36px\"width=728 border=1 bordercolor=#ffffff  cellSpacing=0 cellPadding=0><TBODY></TBODY></TABLE>";
                //1060930	Kevin_C	1060839	修正AKT116清除後，資料列樣式不正確
                //document.all["DATA1"].outerHTML = "<div class='DivTable' id='DATA1' style='text-align:center;BACKGROUND-COLOR: #5f9cc5;'></div>";
                document.all["DATA1"].outerHTML = "<div id=\"DATA1\" style=\"text-align:center;border-bottom-style:outset\"></div>";
                RecordNO = 1;
                //951354 清除不會將畫面所有欄位清空修正 by whay 0951220 
                document.all.tbDocNo.value = "";
                document.all.tbTxDesc.value = "";
                document.all.txExtfileDate.value = "";
                document.all.txCloseDate.value = "";
                document.all["dlAcceptDoc"].selectedIndex = 0;
                document.all["lbMsg"].value = "";

                /*AKT116_DocList = "";				*/
                AKT116_DocList.Info = new Array();
                rowscount = 0; //951354 延伸問題clean沒有把暫存的資料清空 by whay 0951220

                //1040707   Kenny   [1040504]   清除時需清除新增的主旨欄位
                document.all["txDocSubject"].value = "";
                //1040714   Kenny   [1040504]   清除同時回復欄位狀態
                document.all["txDocSubject"].disabled = false;
            }

            break;
        case "btAcpList":
            //1060601 Cloud 1050087 補上權杖
            //var pUrl = "AKR110.aspx"
            var pUrl = "AKR110.aspx?SAMLart=" + jf_ReadCookie("SAMLart");
            jf_OpenChildWin(pUrl, "AKR110", 750, 500);
            //window.open(pUrl);
            Page_BlockSubmit = true;
            break;
        case "btRejectList":
            //1060601 Cloud 1050087 補上權杖
            //var pUrl = "AKR120.aspx"
            var pUrl = "AKR120.aspx?SAMLart=" + jf_ReadCookie("SAMLart");
            jf_OpenChildWin(pUrl, "AKR110", 750, 500);
            //window.open(pUrl);
            Page_BlockSubmit = true;
            break;
    }
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060223 Cloud 1050087 升級二代
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
//* 2021.02.02	Cloud	1090927	修改支援Safari，移除document.activeElement，調整超連結回傳物件
//function ClientButtonControl()
function ClientButtonControl(e)
{
    if (!IsServerHandling)
    {
		//* 2021.02.02	Cloud	1090927	修改支援Safari，移除document.activeElement，調整超連結回傳物件
        //var xObjectName = document.activeElement.id;
		var xObjectName = e.target.id;

        if ((xObjectName != "btExit") && (xObjectName != "btExitImg"))
        {
            if (jf_IsTimeOut())
            {
                Page_BlockSubmit = true;
                return;
            }
        }

        var ret;

        switch (xObjectName)
        {
            case "btOpen":
                Page_BlockSubmit = !jf_CheckKeyObject();
                break;
                /* Using ... */
            case "btCls":	//清除
                //1010718	Jagle	[1010745]	紀錄權仗的隱藏欄位資料要保留
                var strArtif = document.all["H_Artif"].value;
                Page_BlockSubmit = true;
                /*********************************************************************/
                //document.all["txSubject"].value="";
                //document.all["txDept"].value="";
                //document.all["dlDept"].selectedIndex=0;
                //document.all["txEmp"].value="";
                //document.all.dlEmp.options.length = 0;
                //document.all["dlSecNo"].selectedIndex=0;
                //document.all["txCnt"].value="";
                //document.all["dlUnit"].selectedIndex=0;
                document.all["txClsNo"].value = "";
                //document.all["txKeepYear"].value="";
                //document.all["dlKeepYear"].selectedIndex=0;
                document.all["txComNo"].value = "";
                document.all["txCaseNo"].value = "";
                document.all["txCaseName"].value = "";
                //附件
                /*for(var i=2;i<12;i++)
                {
                    document.all["dg1__ctl"+i+"_txDesc"].value="";
                    document.all["dg1__ctl"+i+"_dlMedia"].selectedIndex=0;
                    document.all["dg1__ctl"+i+"_txCnt1"].value="";
                    document.all["dg1__ctl"+i+"_dlUnit1"].selectedIndex=0;
                }*/
                /*********************************************************************/
                //jf_Clean();
                //if (document.all["btMode"].value=="清除模式")
                //{
                document.all["rbAcceptDoc"].checked = true;
                document.all["dlAcceptDoc"].options.selectedIndex = 0;
                //document.all["dlRejectDoc"].options.selectedIndex=0;
                document.all["tbTxDesc"].value = "";
                //}

                document.all["tbDocNo"].value = "";
                //1060817	Kevin_C	1060719	focus轉為JQuery形式
                //document.all["tbDocNo"].focus();
                $('#tbDocNo').focus();
                document.all["btConfirm"].disabled = true;
                document.all["btCls"].disabled = true;
                //1010718	Jagle	[1010745]	紀錄權仗的隱藏欄位資料要保留
                document.all["H_Artif"].value = strArtif;
                break;


            case "btConfirm":  //確定
                //1060223 Cloud 升級二代
                /*document.all["ValidationSummary1"].innerText = "";
				document.all["Validator"].innerText = "";
				document.all["lbMsg"].innerText = "";*/
                document.all["ValidationSummary1"].textContent = "";
                document.all["Validator"].textContent = "";
                document.all["lbMsg"].textContent = "";
                Page_BlockSubmit = true;

                if (!ChkExtDateIsEmpty())
                {
                    Page_BlockSubmit = true;
                    return;
                }
                if (document.all["tbDocNo"].value == "")
                {
                    var ErrMsg = "下列欄位不可空白：\n";
                    if (document.all["tbDocNo"].value == "")
                        ErrMsg += "文號\n";
                    jf_ShowMeg(ErrMsg, ErrMsgTitle);
                    //1060817	Kevin_C	1060719	focus轉為JQuery形式
                    //document.all["tbDocNo"].focus();
                    $('#tbDocNo').focus();
                    return;
                }
                else //[950754]Modify by Cola 增加判斷附件抽存部份
                {
                    if (document.all["rbRejectDoc"].checked && document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value == "")
                    {
                        var ErrMsg = "下列欄位不可空白：\n";
                        if (document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value == "")
                            ErrMsg += "註記\n";
                        jf_ShowMeg(ErrMsg, ErrMsgTitle);
                        //document.all["tbRejectDoc"].focus();
                        return;
                    }
                    //[950754]Add by Cola 若有勾選附件抽存但附件應歸日期確為空，則跳出訊息
                    if (document.all["cbDelayAttFlag"].checked && document.all["txExtfileDate"].value == "")
                    {
                        var ErrMsg = "在有勾選附件抽存情況下，附件預計歸檔日期不可為空";
                        jf_ShowMeg(ErrMsg, ErrMsgTitle);
                        return;
                    }
                    //Cola -- end --
                }

                /**************************************附件*******************************************/
                var pMsg = "";
                /*var ptbDesc="";
				var pdlRem="";
				var ptbCnt="";
				var pdlUnit="";
				var pMsg="";
				var IsFocus=true;
																	
				for(var i=2;i<12;i++)
				{
					ptbDesc ="dg1__ctl"+i+"_txDesc";
					pdlRem="dg1__ctl"+i+"_dlMedia";
					ptbCnt="dg1__ctl"+i+"_txCnt1";
					pdlUnit="dg1__ctl"+i+"_dlUnit1";
					if ((document.all[ptbDesc].value=="" || document.all[pdlRem].options[document.all[pdlRem].selectedIndex].value=="" || document.all[ptbCnt].value=="" || document.all[pdlUnit].options[document.all[pdlUnit].selectedIndex].value=="") && (document.all[ptbDesc].value!="" || document.all[pdlRem].options[document.all[pdlRem].selectedIndex].value!="" || document.all[ptbCnt].value!="" || document.all[pdlUnit].options[document.all[pdlUnit].selectedIndex].value!=""))
					{
						pMsg+="序號"+(i-1);
						if (document.all[ptbDesc].value=="")
						{
							pMsg+="，附件說明欄位";
							
							if (IsFocus)
							{document.all[ptbDesc].focus();}
							
							IsFocus=false;
						}
						
						if (document.all[pdlRem].options[document.all[pdlRem].selectedIndex].value=="")
						{
							pMsg+="，媒體型式欄位";
							
							if (IsFocus)
							{document.all[pdlRem].focus();}
							
							IsFocus=false;
						}
							
						if (document.all[ptbCnt].value=="")
						{
							pMsg+="，數量欄位";
							
							if (IsFocus)
							{document.all[ptbCnt].focus();}
							
							IsFocus=false;
						}
						
						if (document.all[pdlUnit].options[document.all[pdlUnit].selectedIndex].value=="")
						{
							pMsg+="，計量單位欄位";
							
							if (IsFocus)
							{document.all[pdlUnit].focus();}
							
							IsFocus=false;
						}
												
						pMsg+="不可空白\n";
					}
				}*/
                //Jagle	1010914	桃機：線上簽核公文選擇退文、輸入原因註記，點選確定後，待處理清單會被清空
                // 案次號檢查 (如果有案次號有顯示時才檢查)
                /*if(document.all["txCaseNo"].style.display!="none")
				{
					if(document.all["txCaseNo"].value!="")
					{
						// 案次號有值,則分類號不可為空白並判斷分類號是否可使用通案)
						if(document.all["txClsNo"].value=="")
								pMsg += "分類號不可為空白\n";
						else
						{
							if(!IsClsChecked) // 分類號尚未檢查, 先檢查後,再做案次號檢查
								TbOnBlur("txClsNo");
							
							var IsCaseExist = false;
							if(IsClsChecked)
							{
								// 檢查案次號是否存在
								var ChkRtnObj = new Object();
								ChkRtnObj = ChkCaseNoExist(document.all["txClsNo"].value,document.all["txCaseNo"].value);
								if (ChkRtnObj.error)
								{
									alert(ChkRtnObj.errorDetail.string);
									return;
								}
								else
								{
									if( ChkRtnObj.value.ErrorClass.IsRedirect)
									{
										document.location = "customErr.aspx";
									}
									if (ChkRtnObj.value.ErrorClass.IsErr == false)
									{
										IsCaseExist = true;
										if(document.all["txCaseName"].value=="")
											document.all["txCaseName"].value=ChkRtnObj.value.CaseName;
									}
								}
								
								if(IsCaseExist)
								{
									if(document.all["txCaseName"].value!=ChkRtnObj.value.CaseName)	// 已存在的案名與使用者輸入案名不同
									{
										if(!window.confirm("您輸入的案次號 "+document.all["txCaseNo"].value +" 已存在，案名為 [ "+ChkRtnObj.value.CaseName+" ] 與現在輸入的案名不同\n"+
														  "是否要變更系統紀錄之案名？\n"+
														  "按 確定 : 保留目前輸入的案名\n"+
														  "按 取消 : 案名欄位以系統紀錄案名取代"))
										{
											document.all["txCaseName"].value=ChkRtnObj.value.CaseName;
										}
									}
								}
								else	// 案次號不存在
								{
									 // 案次號 = 通案案次號
									if(document.all["txCaseNo"].value==document.all["h_lbInitCase"].options[0].value || 
									document.all["txCaseNo"].value==document.all["h_lbInitCase"].options[1].value)
									{
										if(!IsCanUseInitCase) // 分類號不可使用通案
										{
											if(document.all["txCaseName"].value=="")
											{
												pMsg += "分類號 "+document.all["txClsNo"].value+" 不可使用通案，"+
														"案次號 "+document.all["txCaseNo"].value+" 不存在立案主檔，\n新增案次號時案名不可為空白\n";
												document.all["txCaseName"].focus();
											}
										}							
									}
									else	// 案次號 != 通案案次號
									{
										if(document.all["txCaseName"].value=="")
										{
											pMsg += "案次號 "+document.all["txCaseNo"].value+" 不存在立案主檔，\n新增案次號時案名不可為空白\n";
											document.all["txCaseName"].focus();
										}
											
									} // end if 案次號 = 通案案次號
								} // end if (IsCaseExist)
							} //end if (IsClsChecked)							
						} // end if(document.all["txClsNo"].value=="")
					}
					// 案名檢查 (如果有輸入,則分類號不可為空白)
					else if(document.all["txCaseName"].value!="")
					{
						if(document.all["txClsNo"].value=="")
						{
							pMsg += "案名有輸入時，分類號不可為空白\n";
						}
					}
				}*/

                if (pMsg != "")
                {
                    alert(pMsg);

                    return;
                }

                /*********************************************************************************/
                var DOCNO_Exist_Row_NO;
                //1070709 Zen 1070678 弱掃XSS修正
                //var strDocNo = document.all["tbDocNo"].value;
                var strDocNo = HtmlEncode(document.all["tbDocNo"].value);
                if (RecordNO > 1)
                    DOCNO_Exist_Row_NO = Check_DOCNO_Exist(strDocNo);
                else
                    DOCNO_Exist_Row_NO = -1;
				//1091120 Cloud 1090828 增加判斷是否為彙併辦子文-不可單獨異動
				if(bWorkSubDoc)
				{
					//bWorkSubDoc = false;
					return;
				}

                if (DOCNO_Exist_Row_NO == -1)
                {
                    //1000713 Davy [1000129] Insert_Table()新增參數，判斷是否顯示併同歸檔提示訊息
                    //1060823	Leslie	二代的IE效能調校，增加傳入參數，大量新增時改為最後一次塞入DOM
                    //Insert_Table(strDocNo , true);
					//1100623	Joe		1100789		弱掃修正Client Potential XSS
                    // Insert_Table(strDocNo, true, false);
                    Insert_Table(HtmlEncode(strDocNo), true, false);
                    RecordNO++;
                }
                else
                {
                    Update_Table(strDocNo, DOCNO_Exist_Row_NO + 1);
					//1091123 Cloud 1090828 文號存在時，檢核是否有子文需一併更新
					SetSubDoc(strDocNo);
					
                }
                document.all["tbDocNo"].value = "";
                document.all["tbTxDesc"].value = "";
                /*********************************************************************/
                //document.all["txSubject"].value="";
                //document.all["txDept"].value="";
                //document.all["dlDept"].selectedIndex=0;
                //document.all["txEmp"].value="";
                //document.all.dlEmp.options.length = 0;
                //document.all["dlSecNo"].selectedIndex=0;
                //document.all["txCnt"].value="";
                //document.all["dlUnit"].selectedIndex=0;
                document.all["txClsNo"].value = "";
                //document.all["txKeepYear"].value="";
                //document.all["dlKeepYear"].selectedIndex=0;
                document.all["txComNo"].value = "";
                document.all["txCaseNo"].value = "";
                document.all["txCaseName"].value = "";
                //document.all["txFileYear"].value="";

                //附件
                /*for(var i=2;i<AKT116_DocList.Att[DOCNO_Exist_Row_NO].Doc_No.length+2;i++)
				{
					document.all["dg1__ctl"+i+"_txDesc"].value="";
					document.all["dg1__ctl"+i+"_dlMedia"].selectedIndex=0;
					document.all["dg1__ctl"+i+"_txCnt1"].value="";
					document.all["dg1__ctl"+i+"_dlUnit1"].selectedIndex=0;
					//document.all["dg1__ctl"+i+"_txRemark"].value="";
					//document.all["dg1__ctl"+i+"_txPlace"].value="";
				}*/
                /*********************************************************************/


                if (event.type.substr(0, 3) != "key")
                    //1060817	Kevin_C	1060719	focus轉為JQuery形式
                    //document.all["tbDocNo"].focus();
                    $('#tbDocNo').focus();

                if (RecordNO > 1)
                    document.all["TableTitle"].style.visibility = "visible";

                //新版尚不知如何判斷
                //if (document.all["btMode"].value=="清除模式")
                //{
                document.all["rbAcceptDoc"].checked = true;
                document.all["dlAcceptDoc"].options.selectedIndex = 0;
                //document.all["dlRejectDoc"].options.selectedIndex=0;
                document.all["tbTxDesc"].value = "";
                //}

                document.all["btConfirm"].disabled = true;
                document.all["btCls"].disabled = true;
                document.all["txExtfileDate"].value = "";
                document.all["txCloseDate"].value = "";
                //1040714   Kenny   [1040504]   點選確定功能鍵後需清除主旨欄位
                document.all["txDocSubject"].value = "";
                document.all["txDocSubject"].disabled = false;
                break;
            case "btSelectAll"://全選
                Page_BlockSubmit = true;
                for (i = 1; i <= rowscount; i++)
                    document.all["cbCLEAR" + i].checked = true;
                break;
            case "btClearSelect"://清除
                Page_BlockSubmit = true;
                for (i = 1; i <= rowscount; i++)
                    document.all["cbCLEAR" + i].checked = false;
                break;
            case "btReverse"://反向
                Page_BlockSubmit = true;
                for (i = 1; i <= rowscount; i++)
                {
                    if (document.all["cbCLEAR" + i].checked)
                        document.all["cbCLEAR" + i].checked = false;
                    else
                        document.all["cbCLEAR" + i].checked = true;
                }
                break;

            case "btDocInfo": //公文基本資料收合 -> 改為開啟AKM330
                if (document.all.tbDocNo.value == "")
                {
                    alert("公文文號不可空白");
                    //1060817	Kevin_C	1060719	focus轉為JQuery形式
                    //document.all.tbDocNo.focus();
                    $('#tbDocNo').focus();
                    Page_BlockSubmit = true;
                    return;
                }
                //1010718	Jagle	[1010745]	增加傳入權杖
                //var pUrl = "AKM330.aspx?argDocNo=" + document.all.tbDocNo.value + "&argMode=m&Caller=AKT116";//Cola 額外傳Caller用以判斷是否為AKT116呼叫
                var pUrl = "AKM330.aspx?argDocNo=" + document.all.tbDocNo.value + "&argMode=m&Caller=AKT116&SAMLart=" + document.all.H_Artif.value;
                //1060601 Cloud 1050087 升級二代，調整開啟寬度
                //jf_OpenChildWin(pUrl, "AKM330", 800, 600);
                jf_OpenChildWin(pUrl, "AKM330", 1200, 600);
                //window.open(pUrl);
                Page_BlockSubmit = true;
                break;
                /*
                case "btDocInfo": //公文基本資料收合
                    Page_BlockSubmit = true;
                    var DocInfoState = document.all["DocInfo"].style.display;
                    if(DocInfoState=="")
                    {
                        document.all["DocInfo"].style.display = "none";
                        document.all["htxShowDocInfo"].value = "false";
                        document.all["btDocInfo"].value = "顯示基資[H]";
                    }
                    else
                    {
                        document.all["DocInfo"].style.display = "";
                        document.all["htxShowDocInfo"].value = "true";
                        document.all["btDocInfo"].value = "隱藏基資[H]";
                    }
                    break;
                */

            case "btChange":
                //檢核必須有選擇退文註記才可更新註記 #2007.02.28 Andy
                if (document.all["rbRejectDoc"].checked && document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value == "")
                {
                    var ErrMsg = "下列欄位不可空白：\n";
                    if (document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value == "")
                        ErrMsg += "註記\n";
                    jf_ShowMeg(ErrMsg, ErrMsgTitle);
                    Page_BlockSubmit = true;
                    return;
                }

                var indexDesc;
                for (i = 1; i < rowscount + 1; i++)
                {
					if (document.all["cbChange"+i].checked ==  true){
                        var strDocNo = AKT116_DocList.Info[i - 1].Doc_No;
                        Update_Table(strDocNo, i);

                    }
                    else
                        continue;
                }

                //不論點收或退文執行後皆跳回點收避免誤退文 #2007.02.28 Andy
                document.all["rbAcceptDoc"].checked = true;
                document.all["dlAcceptDoc"].options.selectedIndex = 0;
                document.all["tbTxDesc"].value = "";

                Page_BlockSubmit = true;
                break;
        }
    }
}



/********************************* 畫面欄位處理 ********************************************/
//避免使用者輸入 "," 與 ";"  <---特殊用途
function DoFilterStr(argColName)
{
    var strTag = document.all[argColName].value;
    var strTmp = "";
    var strBuf = "";
    for (i = 0; i < strTag.length; i++)
    {
        strBuf = strTag.substring(i, i + 1);
        if (strBuf == "," || strBuf == ";") strBuf = "";
        strTmp += strBuf;
    }
    document.all[argColName].value = strTmp;
}

function DoClick(argColName)
{
    if (argColName == "rbAcceptDoc")
    {
        //document.all["dlRejectDoc"].options.selectedIndex=0;
        document.all["dlAcceptDoc"].options.selectedIndex = 0;
        /*document.all["tbRejectDoc"].value = "";
		document.all["lbRejectDoc"].innerText = "";
		document.all["tbAcceptDoc"].onblur();
		document.all["tbAcceptDoc"].focus();*/
        //[950754]Add by Cola 若勾選為點收，則附件抽存欄位解除反白
        document.all["cbDelayAttFlag"].disabled = false;

    }
    else if (argColName == "rbRejectDoc")
    {
        document.all["dlAcceptDoc"].options.selectedIndex = 0;
        /*document.all["tbAcceptDoc"].value = "";
		document.all["lbAcceptDoc"].innerText = "";
		document.all["tbRejectDoc"].onblur();
		document.all["tbRejectDoc"].focus();*/
        //[950754]Add by Cola 若勾選為退文，則附件抽存欄位反白
        document.all["cbDelayAttFlag"].disabled = true;
    }

}

function CallSearchData(argDocNo)
{
    //1060223 Cloud	1050087	升級二代-放入陣列意義不明，直接放入字串
    /*var KeyValue = new Array(1);
	KeyValue[0] = argDocNo;*/
    var param = new Array(1);
    //param[0] = KeyValue;
    param[0] = argDocNo;
    RtnObj = jf_CallWS("AKT116WS.asmx", "SearchData", false, param);

    if (jf_IsWebServiceSuccess(RtnObj))
    { return RtnObj.value; }
}

function TbOnBlur(argTextBox)
{
	//* 2021.02.02	Cloud	1090927	修改支援Safari，移除document.activeElement-此斷已不會被呼叫，以此註記
	
    //alert(event.srcElement.id)
    var xObjectName = document.activeElement.id;

    if ((xObjectName == "btExit") || (xObjectName == "btExitImg") || (xObjectName == "btCancelImg") || (xObjectName == "btCancel"))
        return;

    //密等 
    /*if (argTextBox=="txSecNo")
	{
		if (document.all["txSecNo"].value=="")
		{
			document.all["dlSecNo"].selectedIndex=0;
			return;
		}
		var IsExist=false;
		for(var i=0;i<document.all["dlSecNo"].length;i++)
		{
			if (document.all["dlSecNo"].options[i].value==document.all["txSecNo"].value)
			{
				document.all["dlSecNo"].selectedIndex=i;
				IsExist=true;
			}
		}
		if (!IsExist)
		{
			alert("無此密等代碼");
			document.all["txSecNo"].focus();
			return;
		}
	}*/

    //承辦單位
    /*
	if (argTextBox=="txDept")
	{
		var IsExist=false;
		if (document.all["txDept"].value=="")
		{
			document.all["dlDept"].selectedIndex=0;
			document.all.dlEmp.options.length = 0;
			return;
		}
		else
		{
			for(var i=0;i<document.all["dlDept"].length;i++)
			{
				if (document.all["dlDept"].options[i].value==document.all["txDept"].value)
				{
					document.all["dlDept"].selectedIndex=i;
					IsExist=true;
				}
				if (document.all["dlDept"].options[i].text==document.all["txDept"].value)
				{
					document.all["txDept"].value=document.all["dlDept"].options[i].value;
					document.all["dlDept"].selectedIndex=i;
					IsExist=true;
				}
			}
			if (!IsExist)
			{
				alert("無此承辦單位");
				document.all.dlEmp.options.length = 0;
				document.all["txDept"].focus();
				return;
			}
		}
		
		var KeyValue = new Array(1);
		KeyValue[0] = document.all["txDept"].value;	
		
		var param = new Array(1);
		param[0] = KeyValue;	
		
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetEmp",false,param);
		iCallID_Dept = RtnObj.id;
		OnWSResult(RtnObj);
	}
	
	//承辦人
	if (argTextBox=="txEmp")
	{
		var IsExist=false;
		if (document.all["txEmp"].value=="")
		{
			document.all["dlEmp"].selectedIndex=0;
			return;
		}
		else
		{
			if (document.all["dlEmp"].length!=0)
			{
				for(var i=0;i<document.all["dlEmp"].length;i++)
				{
					if (document.all["dlEmp"].options[i].value==document.all["txEmp"].value)
					{
						document.all["dlEmp"].selectedIndex=i;
						IsExist=true;
					}
					if (document.all["dlEmp"].options[i].text==document.all["txEmp"].value)
					{
						document.all["txEmp"].value=document.all["dlEmp"].options[i].value;
						document.all["dlEmp"].selectedIndex=i;
						IsExist=true;
					}
				}
				if (!IsExist)
				{
					alert("無此承辦人");
					document.all["txEmp"].focus();
					return;
				}
			}
				
		}
		
		if (document.all["txDept"].value=="")
		{
			var KeyValue = new Array(1);
			KeyValue[0] = document.all["txEmp"].value;
			var param = new Array(1);
			param[0] = KeyValue;
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetEmpDept",false,param);
			iCallID_Emp = RtnObj.id;
			OnWSResult(RtnObj);
		}
	}
	// 保存年限
	if (argTextBox=="txKeepYear")
	{
		if (document.all["txKeepYear"].value=="")
		{
			document.all["dlKeepYear"].selectedIndex=0;
			return;
		}
		var IsExist=false;
		for(var i=0;i<document.all["dlKeepYear"].length;i++)
		{
			if (document.all["dlKeepYear"].options[i].value==document.all["txKeepYear"].value)
			{
				document.all["dlKeepYear"].selectedIndex=i;
				IsExist=true;
			}
		}
		if (!IsExist)
		{
			alert("無此保存年限");
			document.all["txKeepYear"].focus();
			return;
		}
	}
	*/

    //分類號
    if (argTextBox == "txClsNo")
    {
        if (document.all["txClsNo"].value == "")
            return;
        var KeyValue1 = new Array(1);
        KeyValue1[0] = document.all["txClsNo"].value;
        var param1 = new Array(1);
        param1[0] = KeyValue1;
        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA", false, param1);
        iCallID_CLS = RtnObj.id;
        OnWSResult(RtnObj);
        /* 改到按下確定鍵時才檢查
		if(document.all["txCaseNo"].value!="")
			ChkCaseNoExist(document.all["txClsNo"].value,document.all["txCaseNo"].value);
		*/
    }

    // 案次號
    // 改到按下確定鍵時才檢查
    if (argTextBox == "txCaseNo")
    {
        if (document.all["txCaseNo"].value != "" && document.all["txClsNo"].value != "")
            ChkCaseNoExist(document.all["txClsNo"].value, document.all["txCaseNo"].value);
    }


    //併案文號 -> 改叫 參照文號
    if (argTextBox == "txComNo")
    {
        // 原為母文,改變併案狀態
        if (ComType == 1)
        {
            if (document.all["txComNo"].value == document.all["tbDocNo"].value)
                return;	// 沒有改變併案狀態
            alert("公文為母文，不可改變併案文號。");
            document.all["txComNo"].value = document.all["tbDocNo"].value;
        }
        else
        {
            if (document.all["txComNo"].value == "")
                return;
            var KeyValue1 = new Array(1);
            KeyValue1[0] = document.all["txComNo"].value;
            var param1 = new Array(1);
            param1[0] = KeyValue1;
            RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckMonDoc", false, param1);
            iCallID_COM = RtnObj.id;
            OnWSResult(RtnObj);
        }
    }


}

function DlOnBlur(argDl)
{
    //密等
    /*if (argDl=="dlSecNo")
	{
		document.all["txSecNo"].value=document.all["dlSecNo"].options[document.all["dlSecNo"].selectedIndex].value;
		
	}*/

    //承辦單位
    /*
	if (argDl=="dlDept")
	{
		document.all["txDept"].value=document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;
		//if (document.all["txDept"].value!="")
		document.all["txDept"].onblur();
	}
	
	//承辦人
	if (argDl=="dlEmp")
	{
		document.all["txEmp"].value=document.all["dlEmp"].options[document.all["dlEmp"].selectedIndex].value;
		if (document.all["txEmp"].value!="")
			document.all["txEmp"].onblur();
	}
	//保存年限
	if (argDl=="dlKeepYear")
	{
		document.all["txKeepYear"].value=document.all["dlKeepYear"].options[document.all["dlKeepYear"].selectedIndex].value;
		
	}
	*/

}
function RepForChar(argStr, argCharFrom, argCharTo)
{
    var idx = argStr.indexOf(argCharFrom);
    while (idx != -1)
    {
        argStr = argStr.replace(argCharFrom, argCharTo);
        idx = argStr.indexOf(argCharFrom);
    }
    return argStr;
}
var iCallID_ChkUserDocPriv = null;
var strStoreNo = "";
//1000713 Davy [1000129] Insert_Table()新增參數，判斷是否顯示併同歸檔提示訊息
//function Insert_Table(argDocNo)

//1060823	Leslie	二代的IE效能調校，增加傳入參數，大量新增時改為最後一次塞入DOM
var gInsertContent = "";
//function Insert_Table(argDocNo , IsBatch)
function Insert_Table(argDocNo, IsBatch, IsInsertFinally)
{
    //var DeptNo = Array(2);
    //95.10.23 David
    var DeptNo = Array(4);
    DeptNo = GetDeptNo(argDocNo);
    if (DeptNo[1] == "")
    {
        Msg = "公文文號:" + argDocNo + " 無承辦單位資訊!!" + "\n" + "註：本份公文仍可點收。";
        strErrMsg = FormatStr(jf_GetErrMsg(CustErr), new Array([Msg])) + "\n";
        jf_ShowMeg(strErrMsg, "");
    }
    else
    {
        //檢查此帳號是否可點收、維護此份公文
        //0981111	Howard	0980587	ChkUserDocPriv()新增公文文號之參數
        //var param = new Array(2);
        var param = new Array(3);
        param[0] = DeptNo[0];
        param[1] = document.all.txUser.value;
        param[2] = argDocNo;
        //alert(DeptNo[0] );
        //alert(document.all.txUser.value);
        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "ChkUserDocPriv", false, param);
        iCallID_ChkUserDocPriv = RtnObj.id;
        strStoreNo = "";
        OnWSResult(RtnObj);

        if (strStoreNo == "")  //無庫房代碼=無權限
        {
            CompareFlag = false;
            //0981111	Howard	0980587	判斷目前庫房管理模式調整顯示訊息
            if (document.all.h_StoreMode && document.all.h_StoreMode.value == "1")
            {
                //依據公文歸檔庫房
                //1070830 Zen 1070678 弱掃Ajax修正
                //var StoreName = AKT116.GetStoreName(document.all["H_ORGNO"].value, document.all.tbDocNo.value).value;
                var StoreName = AK.AKT116.GetStoreName(document.all["H_ORGNO"].value, document.all.tbDocNo.value).value;
                Msg = "抱歉!!公文文號:" + document.all.tbDocNo.value + " 歸檔庫房為" + StoreName + " 非您所管理歸檔庫房公文，系統不允許您點收。";

            }
            else
            {
                Msg = "抱歉!!公文文號:" + document.all.tbDocNo.value + " 承辦單位為" + DeptNo[1] +
					"非您所管理的承辦單位公文，系統不允許您點收。";
            }
            strErrMsg = FormatStr(jf_GetErrMsg(CustErr), new Array([Msg])) + "\n";
            jf_ShowMeg(strErrMsg, "");
            RecordNO--;
            //1060817	Kevin_C	1060719	focus轉為JQuery形式
            //document.all.tbDocNo.focus();
            $('#tbDocNo').focus();
            return;
        }
    }  // if (DeptNo == "")

    var strDOC_NO = argDocNo;
    var strType = "";
    var strTypeDesc = "";
    var strTxNo = "";
    var strTxNoDesc = "";
    var strTxDesc = "";
    var strErrType = "";
    var stridx = "";
    if (document.all["rbAcceptDoc"].checked)  //作業別
    {
        strType = "20";
        strTypeDesc = "點收";
        strTxNo = document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value;
        //1070709 Zen 1070678 弱掃XSS修正
        //strTxNoDesc = document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].text;
        strTxNoDesc = HtmlEncode(document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].text);
        stridx = document.all["dlAcceptDoc"].selectedIndex;
    }
    else if (document.all["rbRejectDoc"].checked)
    {
        strType = "15";
        strTypeDesc = "退文";
        strTxNo = document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value;
        //1070709 Zen 1070678 弱掃XSS修正
        //strTxNoDesc = document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].text;
        strTxNoDesc = HtmlEncode(document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].text);
        stridx = document.all["dlAcceptDoc"].selectedIndex;
        //strTxNo = document.all["dlRejectDoc"].options[document.all["dlRejectDoc"].selectedIndex].value;
        //strTxNoDesc = document.all["dlRejectDoc"].options[document.all["dlRejectDoc"].selectedIndex].text;
        //stridx=document.all["dlRejectDoc"].selectedIndex;
    }
    //1070709 Zen 1070678 弱掃XSS修正
    //var strTxDesc = document.all["tbTxDesc"].value;
    var strTxDesc = HtmlEncode(document.all["tbTxDesc"].value);
    //1060303 Cloud 升級二代改用Jquery
    //var oldHTML =  document.all["DATA1"].outerHTML;

    var strDelayAttFlag;
    /*var strCloseDate = document.all["txCloseDate"].value;
	document.all["txCloseDate"].value="";
	var strExtfileDate = document.all["txExtfileDate"].value;*/

    //95.10.23 David 帶出文號下的歸檔日期	
    // 2013.11.25	Cloud	1020904 修正實際歸檔日期欄位名稱為送件歸檔日期，並修正撈取欄位
    //var strCloseDate = DeptNo[2];	

    uCloseDate = DeptNo[2];
    //[950754]Modify by Cola 預設為空，不應帶入本文預計歸檔日期，該欄位為附件應歸檔日期，應由檔管人員自行輸入
    //var strExtfileDate = DeptNo[3];
    var strExtfileDate = "";
    uExtfileDate = DeptNo[3];

    if (document.all.cbDelayAttFlag.checked == true)
        strDelayAttFlag = "Y";
    else
        strDelayAttFlag = "N";
    //1060303 Cloud 升級二代改用Jquery
    //oldHTML = oldHTML.substring(0,oldHTML.lastIndexOf("</TBODY>"));
    var insertContent = "";
    var newHTML = "";

    //new position for get DocFileType
    AKT116_Detail = CallSearchData(argDocNo);
    //1120605	Joe		1120361		弱掃修正XSS--S
	/*
    // 2013.11.25	Cloud	1020904 修正實際歸檔日期欄位名稱為送件歸檔日期，並修正撈取欄位
    var strCloseDate = AKT116_Detail.Info.DOC_EXEC_DATE;
    //2014.02.12 Gabby[1040075]新增點收時顯示密等與展期公文資訊功能
    //1060601 Cloud 1050087 升級二代取消SEC_NO本來已有Sec_No直接使用Sec_No
    //var strSecNo=AKT116_Detail.Info.SEC_NO;
    var strSecNo = AKT116_Detail.Info.Sec_No;
    var strSecName = AKT116_Detail.Info.SEC_NAME;
    var strSecDate = AKT116_Detail.Info.EXTRMVSEC_DATE;
    var strSecCond = AKT116_Detail.Info.RMVSEC_COND;
    var strPDueDate = AKT116_Detail.Info.PDUE_DATE;
    ////2014.02.12 Gabby[1040075]--END

    var strDocFileType = AKT116_Detail.Info.DocFile_Type;
    var strSEND_DNM = AKT116_Detail.Info.SEND_DNM;
    //Cola 000991 新增帶出承辦單位 -- start --
    var strDept_Name = AKT116_Detail.Info.Dept_Name;
    //Cola -- end --

    //[001480]Cola 新增帶出結案別
    var strCLOSE_TYPE = AKT116_Detail.Info.CLOSE_TYPE;
    //[001697]Cola 新增帶出DOC_D資訊
    var strDOC_D = AKT116_Detail.Info.DOC_NO1;
	*/
    var strCloseDate = HtmlEncode(AKT116_Detail.Info.DOC_EXEC_DATE);
    var strSecNo = HtmlEncode(AKT116_Detail.Info.Sec_No);
    var strSecName = HtmlEncode(AKT116_Detail.Info.SEC_NAME);
    var strSecDate = HtmlEncode(AKT116_Detail.Info.EXTRMVSEC_DATE);
    var strSecCond = HtmlEncode(AKT116_Detail.Info.RMVSEC_COND);
    var strPDueDate = HtmlEncode(AKT116_Detail.Info.PDUE_DATE);

    var strDocFileType = HtmlEncode(AKT116_Detail.Info.DocFile_Type);
    var strSEND_DNM = HtmlEncode(AKT116_Detail.Info.SEND_DNM);
    var strDept_Name = HtmlEncode(AKT116_Detail.Info.Dept_Name);
    var strCLOSE_TYPE = HtmlEncode(AKT116_Detail.Info.CLOSE_TYPE);
    var strDOC_D = HtmlEncode(AKT116_Detail.Info.DOC_NO1);
    //1120605	Joe		1120361		弱掃修正XSS--E

    //Cola 000991 將退文單位(承辦/歸檔)塞入 -- start --
    if (document.all["rbType1"].checked)  //退文至承辦單位
        AKT116_Detail.Info.RTN_UNIT_TYPE = "1";
    else if (document.all["rbType2"].checked)
        AKT116_Detail.Info.RTN_UNIT_TYPE = "2";

    //1120605	Joe		1120361		弱掃修正XSS
    // var strRTN_UNIT_TYPE = AKT116_Detail.Info.RTN_UNIT_TYPE;
    var strRTN_UNIT_TYPE = HtmlEncode(AKT116_Detail.Info.RTN_UNIT_TYPE);
    //Cola -- end

    //var strErrMsg = AKT116_Detail.Info.Err_Msg;
    var idx = AKT116_Detail.Info.Err_Msg.indexOf("<br>");
    while (idx != -1)
    {
        AKT116_Detail.Info.Err_Msg = AKT116_Detail.Info.Err_Msg.replace("<br>", "");
        idx = AKT116_Detail.Info.Err_Msg.indexOf("<br>");
    }
    AKT116_Detail.Info.Subject = RepForChar(AKT116_Detail.Info.Subject, "<", "＜");
    AKT116_Detail.Info.Subject = RepForChar(AKT116_Detail.Info.Subject, ">", "＞");
    AKT116_Detail.Info.Subject = RepForChar(AKT116_Detail.Info.Subject, "&", "＆");
    //1120612	Joe		1120361		弱掃修正XSS，特殊符號已處理過
	AKT116_Detail.Info.Subject = HtmlEncode(AKT116_Detail.Info.Subject);
    //1120119   Cloud 銓敘部序108 -銓敘部歸檔單位換成主旨
    if (document.all["OrgNickName"].value == "MOCS")
    {
        strSEND_DNM = AKT116_Detail.Info.Subject;
    }

    var tempDelayAttFlag = "";
    //1131211	Cloud	1130983	參照0990500	帶出附件預計歸檔日期(由ODC010所輸入)
    strExtfileDate = jf_Trim(AKT116_Detail.Info.ATT_EXTFILE_DATE);
	
	if(strExtfileDate != "")
		strDelayAttFlag = "Y";
		
    if (strDelayAttFlag == "Y")
        tempDelayAttFlag = "有";
    else if (strDelayAttFlag == "N")
        tempDelayAttFlag = "無";
	
        
    //Modify by Cola 000991 新增兩欄位 strDept_Name:承辦單位, strRTN_UNIT_TYPE:退文類型 -- start --		
    //[001480]Cola 新增結案別,[001697]Cola 新增DOC_D

    //2010.12.10	Debra	0990593	[雲科大]調整Layout新增分頁號及頁數的資料
    //1120605	Joe		1120361		弱掃修正XSS--S
    // var strFile_CLS = AKT116_Detail.Info.Cls_No;
    // var strFile_CNT = AKT116_Detail.Info.File_Cnt;     ////2010.12.10	Debra	0990593	[雲科大]調整Layout新增分頁號及頁數的資料--add strFile_CLS,strFile_CNT
    var strFile_CLS = HtmlEncode(AKT116_Detail.Info.Cls_No);
    var strFile_CNT = HtmlEncode(AKT116_Detail.Info.File_Cnt);     ////2010.12.10	Debra	0990593	[雲科大]調整Layout新增分頁號及頁數的資料--add strFile_CLS,strFile_CNT
    //1120605	Joe		1120361		弱掃修正XSS--E
    //1020613	Jagle	[1020477]	增加顯示核決者
    //insertContent = Insert_One_TableRow(RecordNO,strDOC_NO,strTypeDesc,strTxNo, strTxNoDesc,strTxDesc, strDocFileType, strSEND_DNM, tempDelayAttFlag, strExtfileDate, strCloseDate, strDept_Name, strRTN_UNIT_TYPE, strCLOSE_TYPE,strDOC_D,strFile_CLS,strFile_CNT,AKT116_Detail.Info.IS_RCVFILE,AKT116_Detail.Info.RCVFILE_CNT);	//1000713 Davy [1000129] 增加傳入IS_RCVFILE、RCVFILE_CNT
    //1120605	Joe		1120361		弱掃修正XSS
    // var strAPP_USER_NAME = AKT116_Detail.Info.APP_USER_NAME;
    var strAPP_USER_NAME = HtmlEncode(AKT116_Detail.Info.APP_USER_NAME);
    //2017.10.27   Cloud   1061030 修改，彙併辦公文不可單退子文-子文CHECKBOX 不可單獨勾選
    //insertContent = Insert_One_TableRow(RecordNO,strDOC_NO,strTypeDesc,strTxNo, strTxNoDesc,strTxDesc, strDocFileType, strSEND_DNM, tempDelayAttFlag, strExtfileDate, strCloseDate, strDept_Name, strRTN_UNIT_TYPE, strCLOSE_TYPE,strDOC_D,strFile_CLS,strFile_CNT,AKT116_Detail.Info.IS_RCVFILE,AKT116_Detail.Info.RCVFILE_CNT,strAPP_USER_NAME);
    var idChild = false;
    if (AKT116_Detail.Info.COMBINE_TYPE == "1" || AKT116_Detail.Info.COMBINE_TYPE == "2")
    {
        if (AKT116_Detail.Info.Com_No != argDocNo)
            idChild = true;
    }
    //1131009   Cloud   1130941 弱掃XSS 修正
    //insertContent = Insert_One_TableRow(RecordNO, strDOC_NO, strTypeDesc, strTxNo, strTxNoDesc, strTxDesc, strDocFileType, strSEND_DNM, tempDelayAttFlag, strExtfileDate, strCloseDate, strDept_Name, strRTN_UNIT_TYPE, strCLOSE_TYPE, strDOC_D, strFile_CLS, strFile_CNT, AKT116_Detail.Info.IS_RCVFILE, AKT116_Detail.Info.RCVFILE_CNT, strAPP_USER_NAME, idChild, AKT116_Detail.Info.Com_No);
    var strIsRcv = HtmlEncode(AKT116_Detail.Info.IS_RCVFILE);
    var strRcvFileCnt = HtmlEncode(AKT116_Detail.Info.RCVFILE_CNT);
    var strComNo = HtmlEncode(AKT116_Detail.Info.Com_No);
    insertContent = Insert_One_TableRow(RecordNO, strDOC_NO, strTypeDesc, strTxNo, strTxNoDesc, strTxDesc, strDocFileType, strSEND_DNM, tempDelayAttFlag, strExtfileDate, strCloseDate, strDept_Name, strRTN_UNIT_TYPE, strCLOSE_TYPE, strDOC_D, strFile_CLS, strFile_CNT, strIsRcv, strRcvFileCnt, strAPP_USER_NAME, idChild, strComNo);

    //Cola -- end --
    //1050224 CLOUD 升級二代
    //newHTML = oldHTML + insertContent + "</TBODY></TABLE>";

    //1060823	Leslie	IE效能調校
    if (!IsInsertFinally)
        $(document.all["DATA1"]).append(insertContent);
    else
        gInsertContent += insertContent;
    //document.all["DATA1"].innerHTML = "";

    //David 95.05.10
    //Modify by Cola 000991 新增退文類型 -- start --
    var objOption = new Option(RecordNO + "," + strDOC_NO + "," + strType + "," + strTxNo + "," + strTxNoDesc + "," + strTxDesc + "," + strErrType + "," + stridx + "," + strDelayAttFlag + "," + strExtfileDate + "," + strCloseDate + "," + strRTN_UNIT_TYPE + ",0", RecordNO + "," + strDOC_NO + "," + strType + "," + strTxNo + "," + strTxNoDesc + "," + strTxDesc + "," + stridx + "," + strErrType + "," + strDelayAttFlag + "," + strExtfileDate + "," + strCloseDate + "," + strRTN_UNIT_TYPE + ",0");
    //Cola -- end --
    //1050224 CLOUD 升級二代
    //document.all["DATA1"].outerHTML = newHTML;
    //document.all["Record"].length = RecordNO;
    /************************************************/
    //AKT116_Detail=CallSearchData(argDocNo).value;

    //old position 
    //AKT116_Detail=CallSearchData(argDocNo);

    AKT116_Detail.Info.Doc_State = strType;
    AKT116_Detail.Info.Tx_No = strTxNo;
    AKT116_Detail.Info.Tx_Desc = strTxDesc;

    AKT116_Detail.Info.DELAY_EXTFILE_DATE = strExtfileDate;
    //1060627 Cloud	mark 用不到的屬性
    //AKT116_Detail.Info.DELAY_ATT_FLAG=strDelayAttFlag;
    //1131211	Cloud	1130983	參照0990500	啟用此屬性，增加由承辦人設定附件抽存 故insertinto也要記錄-一併增加寫入附件預計歸檔日
    //1140303	Cloud	1140305 因會影響使用 修正使用錯誤屬性問題
    //AKT116_Detail.Info.DELAY_ATT_FLAG = strDelayAttFlag;
	AKT116_Detail.Info.Delay_Att_Flag = strDelayAttFlag;
	AKT116_Detail.Info.Extfile_Date=strExtfileDate;
    //1060601 Cloud 本來已有Doc_No 直接使用Doc_No
    //AKT116_Detail.Info.DOC_NO=strDOC_NO;
    AKT116_Detail.Info.Doc_No = strDOC_NO;
    //* 2020.07.06	Cloud	1071087	修正備註使用兩個不同大小寫屬性紀錄，導致叫用ws寫入時不正確的bug-註記時僅寫入Tx_Desc，多這個空白會導致寫入db為空白
	//AKT116_Detail.Info.TX_DESC=strTxDesc;
	


    AKT116_DocList.Info[RecordNO - 1] = AKT116_Detail.Info;
    AKT116_DocList.Att[RecordNO - 1] = AKT116_Detail.Att;
    /************************************************/
    document.all["Record"].options[(RecordNO - 1)] = objOption;
    if (document.all["tbSaveDocNo"].value != "")
        document.all["tbSaveDocNo"].value += ",";
    document.all["tbSaveDocNo"].value += "'" + strDOC_NO + "'";
    //1060817	Kevin_C	1060719	focus轉為JQuery形式
    //document.all["cbCLEAR" + RecordNO].focus();

	if(!IsInsertFinally){
        $('#cbCLEAR' + RecordNO).focus();
        document.all["cbCLEAR" + RecordNO].blur();
    }
    else
        ClearCheck(RecordNO);


    rowscount++;

    //2014.02.12 Gabby[1040075]新增點收時顯示密等與展期公文資訊功能
    if (document.all["H_ISALERT"].value == "Y")
    {
        if ((strSecNo != "1" && strSecNo != "") || strPDueDate != "")
        {
            var strOrgNo = document.all["H_ORGNO"].value;
            var strUrl = "AKT116C5.aspx?DocNo=" + strDOC_NO + "&OrgNo=" + strOrgNo + "&SecNo=" + strSecNo + "&SecName=" + escape(strSecName) + "&SecDate=" + strSecDate + "&SecCond=" + escape(strSecCond) + "&PDueDate=" + strPDueDate;
            //1130819   Jason   中榮序74    升級二代
            //var ret = jf_ShowModal(strUrl, 500, 350);
			jf_OpenChildWin(strUrl,"AKT116C5", 1024, 768);
        }
    }
    //2014.02.12 Gabby[1040075]--END

    //1000713 Davy [1000129] 若為單筆輸入，直接顯示訊息
    if (AKT116_Detail.Info.IS_RCVFILE == "是")
        if (!IsBatch)
            //1060601 Cloud 本來已有Doc_No 直接使用Doc_No
            //alert("公文文號："+AKT116_Detail.Info.DOC_NO+"有紙本來文需要歸檔！");
            alert("公文文號：" + AKT116_Detail.Info.Doc_No + "有紙本來文需要歸檔！");
        else
            return true;

    return false;
}

function ClientOnLoad()
{
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
    //jf_CallWS("lib/AK_LIB.asmx","BubbleFun"  ,false,  null);

    //[001697]Cola 新增判斷DOC_D資訊
    //[001480]Cola 依系統參數決定是否隱藏結案別 -- start --
    //Zola
	//* 2021.02.19	Cloud	1090927	配合手機使用調整最小寬度
	if(window.screen.width<1280)
		$('html').css("width","1280px");
    if (document.all["IS_MOTC"].value == "0")
    {
        if (document.all["txAK_AKT116_SHOW_CLOSETYPE"].value != "Y")
        {
            if (document.all["AKT116_DOC_D"].value != "Y")
            {
                document.all["lbCloseType"].style.display = "none";
                document.all["lbDOC_D"].style.display = "none";
                document.all["TableTitle"].style.width = "100%";
                //1020613	Jagle	[1020477]	增加核決者配合調整寬度
                //document.all["divSignArea"].style.width = "1048px"; //[1000825]Add by Ivory 增加寬度以容下資料,不造成下方SCROLL BAR出現
                //1060224 Cloud	1050087 升級二代
                //document.all["divSignArea"].style.width = "1108px";
                document.all["divSignArea"].style.width = "100%";
                document.all["lbDect"].style.width = "5em";
                document.all["lbSendDept"].style.width = "8em";
                document.all["lbDept"].style.width = "8.5em";
                Deptlength = "8.5em";
                SendDeptlength = "8em";
            }
            else
            {
                document.all["lbCloseType"].style.display = "none";
                document.all["TableTitle"].style.width = "100%";
                //1060224 Cloud	1050087 升級二代
                /*document.all["lbDOC_D"].style.width = "80px";
				document.all["lbDOC_D"].innerHTML = "<FONT size='2'>相關文號</FONT>";*/
                document.all["lbDOC_D"].style.width = "5.5em";
                document.all["lbDOC_D"].innerHTML = "相關文號";
                document.all["lbDect"].style.width = "5em";

                //document.all["WorkArea"].style.width = "1200px";
                document.all["WorkArea"].style.width = "100%";
                //document.all["divSignArea"].style.width = "1110px";//[1000825]Marked by Ivory 該寬度塞不下資料寬,造成下方出現SCROLL BAR
                //1020613	Jagle	[1020477]	增加核決者配合調整寬度
                //document.all["divSignArea"].style.width = "1128px";  //[1000825]Add by Ivory 增加寬度以容下資料,不造成下方SCROLL BAR出現

                //document.all["divSignArea"].style.width = "1188px";
                document.all["divSignArea"].style.width = "100%";
                document.all["DATA1"].style.width = "100%";
                document.all["lbSendDept"].style.width = "5.5em";
                document.all["lbDept"].style.width = "5.5em";
                Deptlength = "5.5em";
                SendDeptlength = "5.5em";
            }

        }
        else
        {
            if (document.all["AKT116_DOC_D"].value != "Y")
            {
                //1020613	Jagle	[1020477]	增加核決者配合調整寬度
                //document.all["divSignArea"].style.width = "1078px"; // [1000825]Add by Ivory 增加寬度以容下資料,不造成下方SCROLL BAR出現
                //1060224 Cloud	1050087 升級二代
                //document.all["divSignArea"].style.width = "1138px";
                document.all["divSignArea"].style.width = "100%";
                document.all["lbDOC_D"].style.display = "none";
                //1060224 Cloud	1050087 升級二代
                //document.all["TableTitle"].style.width = "830px";
                document.all["TableTitle"].style.width = "100%";
                document.all["lbSendDept"].style.width = "7em";
                document.all["lbDept"].style.width = "7.5em";
                SendDeptlength = "7em";
                Deptlength = "7.5em";

            }
            else
            {
                //1060224 Cloud	1050087 升級二代
                /*document.all["TableTitle"].style.width = "860px";
				document.all["lbDOC_D"].style.width = "80px";
				document.all["lbDOC_D"].innerHTML = "<FONT size='2'>相關文號</FONT>";*/
                document.all["TableTitle"].style.width = "100%";
                document.all["lbDOC_D"].style.width = "5.5em";
                document.all["lbDOC_D"].innerHTML = "相關文號";

                //1060224 Cloud	1050087 升級二代
                //document.all["WorkArea"].style.width = "1068px";
                document.all["WorkArea"].style.width = "100%";
                //document.all["divSignArea"].style.width = "1140px";//[1000825]Marked by Ivory 該寬度塞不下資料寬,造成下方出現SCROLL BAR
                //1020613	Jagle	[1020477]	增加核決者配合調整寬度
                //document.all["divSignArea"].style.width = "1158px";  //[1000825]Add by Ivory 增加寬度以容下資料,不造成下方SCROLL BAR出現
                //1060224 Cloud	1050087 升級二代
                //document.all["divSignArea"].style.width = "1218px";
                //document.all["DATA1"].style.width = "1140px";
                document.all["divSignArea"].style.width = "100%";
                document.all["DATA1"].style.width = "100%";
                document.all["lbSendDept"].style.width = "4.5em";
                document.all["lbDept"].style.width = "4.5em";
                Deptlength = "4.5em";
                SendDeptlength = "4.5em";
                document.all["lbDect"].style.width = "5em";
                lbdectlength = "5em";
            }

        }
    }
        //[0970650]Add by Cola 若為交通部
    else
    {
        //1020613	Jagle	[1020477]	增加核決者配合調整寬度
        //document.all["divSignArea"].style.width = "984px";// [1000825]Add by Ivory 增加寬度以容下資料,不造成下方SCROLL BAR出現
        //1060224 Cloud	1050087 升級二代
        //document.all["divSignArea"].style.width = "1044px";
        document.all["divSignArea"].style.width = "100%";
        document.all["lbWorkType"].style.display = "none";//作業別
        document.all["lbRejectType"].style.display = "none";//退文類型
        document.all["lbCloseType"].style.display = "none";
        document.all["lbDOC_D"].style.display = "none";
        //1060224 Cloud	1050087 升級二代
        //document.all["TableTitle"].style.width = "736px";			
        document.all["TableTitle"].style.width = "100%";
        document.all["lbMark"].innerHTML = "點收註記";
        //1060224 Cloud	1050087 升級二代
        document.all["lbSendDept"].style.width = "9em";
        document.all["lbDept"].style.width = "8.5em";
        Deptlength = "8.5em";
        SendDeptlength = "9em";
        document.all["lbDect"].style.width = "7em";
        document.all["lbErrMsg"].style.width = "7m";
        lbdectlength = "7em";
        lbErrmsglength = "7em";

    }
    //Cola -- end -- 	
    document.all["TableTitle"].style.display = "";
    //10602223 Cloud 1050087 升級二代
    //ShowMsg();
    //1120119   Cloud 銓敘部序108 -銓敘部歸檔單位換成主旨
    if (document.all["OrgNickName"].value == "MOCS")
    { document.all["lbSendDept"].textContent = "公文主旨"; }
    jf_ShowValidator();

    if (document.all["Label13"].className.toLowerCase() != "hide")	//系統參數RTN_RCVDEPT設為"3,4,5"時，才作下列處理
	{
        strDefaultType = strDefaultType + document.all.H_DefaultType.value;	//組成"rbType1"或"rbType2"
		//* 2021.01.15	Cloud	1090997	修正新增單筆公文時退文對象一律使用系統參數的bug-僅開啟時使用預設值
		document.all[strDefaultType].checked = true;
	}

    //1040330 Gabby[1040141]修正弱點	
    if (document.all["txMsg"].value != "")
    {
        //1120606   Joe     1120361     弱掃修正XSS--S
        //document.all["lbMsg"].innerHTML = document.all["txMsg"].value.replace('&lt;/g', '<');
        var Msg = document.all["txMsg"].value.split('|');
        var MsgC = document.all["txMsgColor"].value.split('|');
        var Rtn = '';

        for (var i = 0 ; i < Msg.length; i++) {
            if (Rtn != "") {
                Rtn += "<br><br>"
            }
            if (MsgC[i] == "B")
                Rtn += "<font color='blue'>";
            else if (MsgC[i] == "R")
                Rtn += "<font color='red'>";

            Rtn += HtmlEncode(Msg[i]) + '</font>';
        }
        document.all["lbMsg"].innerHTML = Rtn;
        //1120606   Joe     1120361     弱掃修正XSS--E
    }
    //1040330 Gabby[1040141]修正弱點--END
	
	
}


//confirm or 確定鍵
function Update_Table(argDocNo, rowNo)
{
    var strDOC_NO = argDocNo;
    var strType = "";
    var strTypeDesc = "";
    var strTxNo = "";
    var strTxNoDesc = "";
    var strTxDesc = "";
    var stridx = "";
    var strErrType = "";
    //var strCloseDate = "";//[950754]Marked by Cola 該變數以在下面重新宣告，因此在此宣告沒有意義
    //var strExtfileDate = "";//[950754]Marked by Cola 該變數以在下面重新宣告，因此在此宣告沒有意義
    if (document.all["rbAcceptDoc"].checked)  //作業別
    {
        strType = "20";
        strTypeDesc = "點收";
        strTxNo = document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value;
        //1070709 Zen 1070678 弱掃XSS修正
        //strTxNoDesc = document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].text;
        strTxNoDesc = HtmlEncode(document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].text);
        stridx = document.all["dlAcceptDoc"].selectedIndex;
        //951354 避免從退回更改為點收時日期不見 by whay 0951220
        //strCloseDate = uCloseDate;//[950754]Marked by Cola 該變數以在下面重新宣告，因此在此宣告沒有意義
        //strExtfileDate = uExtfileDate;//[950754]Marked by Cola 該變數以在下面重新宣告，因此在此宣告沒有意義
    }
    else if (document.all["rbRejectDoc"].checked)
    {
        strType = "15";
        strTypeDesc = "退文";
        strTxNo = document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value;
        //1070709 Zen 1070678 弱掃XSS修正
        //strTxNoDesc = document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].text;
        strTxNoDesc = HtmlEncode(document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].text);
        stridx = document.all["dlAcceptDoc"].selectedIndex;
        //strTxNo = document.all["dlRejectDoc"].options[document.all["dlRejectDoc"].selectedIndex].value;
        //strTxNoDesc = document.all["dlRejectDoc"].options[document.all["dlRejectDoc"].selectedIndex].text;
        //stridx=document.all["dlRejectDoc"].selectedIndex;
    }
    //1071017 Zen 1070678 弱掃Client Potential XSS修正
    //var strTxDesc = document.all["tbTxDesc"].value;
    var strTxDesc = HtmlEncode(document.all["tbTxDesc"].value);
    //1060303 Cloud	1050087 修改寫法改用jQuery
    //var oldHTML =  document.all["DATA1"].outerHTML;
    var oldHTML_Head;
    var oldHTML_Back;
    var InsertContent = "";
    var newHTML = "";

    var strDelayAttFlag;
    //1070709 Zen 1070678 弱掃XSS修正--begin
    //var strCloseDate = document.all["txCloseDate"].value;
    //var strExtfileDate = document.all["txExtfileDate"].value;
    var strCloseDate = HtmlEncode(document.all["txCloseDate"].value);
    var strExtfileDate = HtmlEncode(document.all["txExtfileDate"].value);
    //1070709 Zen 1070678 弱掃XSS修正--end
    if (document.all.cbDelayAttFlag.checked == true)
        strDelayAttFlag = "Y";
    else
        strDelayAttFlag = "N";
    //1060303 Cloud	1050087 修改寫法改用jQuery	
    /*oldHTML_Head = oldHTML.substring(0,oldHTML.indexOf("<TR id=" + rowNo + ">"));
	if(rowNo<RecordNO-1)
		oldHTML_Back = oldHTML.substring(oldHTML.indexOf("<TR id=" + (rowNo+1) + ">"),oldHTML.length)
	else
		oldHTML_Back = "</TBODY></TABLE>";*/
    /*if(rowNo<RecordNO-1)
		oldHTML_Back = oldHTML.substring(oldHTML.indexOf("<TR id=" + (rowNo+1) + ">"),oldHTML.length)
	else
		oldHTML_Back = "</TBODY></TABLE>";*/

    var strDocFileType = GetDocFileType(strDOC_NO);

    //0970328 Cola 0970255 Add
    //new position for get DocFileType
    AKT116_Detail = CallSearchData(argDocNo);
    //* 2024.10.17   Cloud   1130941 弱掃修改XSS
    //var strSEND_DNM = AKT116_Detail.Info.SEND_DNM;
    var strSEND_DNM = HtmlEncode(AKT116_Detail.Info.SEND_DNM);

    //Cola 000991 新增帶出承辦單位 -- start --
    //* 2024.10.17   Cloud   1130941 弱掃修改XSS
    //var strDept_Name = AKT116_Detail.Info.Dept_Name;
    var strDept_Name = HtmlEncode(AKT116_Detail.Info.Dept_Name);
    //Cola -- end --

    //[001480]Cola 新增結案別
    //* 2024.10.17   Cloud   1130941 弱掃修改XSS
    //var strCLOSE_TYPE = AKT116_Detail.Info.CLOSE_TYPE;
    var strCLOSE_TYPE = HtmlEncode(AKT116_Detail.Info.CLOSE_TYPE);

    //[001697]Cola 新增帶出DOC_D資訊
    //2024.10.17   Cloud   1130941 弱掃修改XSS
    //var strDOC_D = AKT116_Detail.Info.DOC_NO1;
    var strDOC_D = HtmlEncode(AKT116_Detail.Info.DOC_NO1);


    //Cola 000991 將退文單位(承辦/歸檔)塞入 -- start --
    var strRTN_UNIT_TYPE = "";
    if (document.all["rbType1"].checked)  //退文至承辦單位
        strRTN_UNIT_TYPE = "1";
    else if (document.all["rbType2"].checked)
        strRTN_UNIT_TYPE = "2";
    //Cola -- end		

    //var strErrMsg = GetDocErrMsg(strDOC_NO);

    var tempDelayAttFlag = "";
    if (strDelayAttFlag == "Y")
        tempDelayAttFlag = "有";
    else if (strDelayAttFlag == "N")
        tempDelayAttFlag = "無";

    //Modify by Cola 000991 新增兩欄位 strDept_Name:承辦單位, strRTN_UNIT_TYPE:退文類型 -- start --		
    //[001480]新增結案別,[001697]新增DOC_D資訊

    //1000308	Leslie	補修正未取得分類號及頁數之錯誤
    //2024.10.17   Cloud   1130941 弱掃修改XSS
    //var strFile_CLS = AKT116_Detail.Info.Cls_No;
    //var strFile_CNT = AKT116_Detail.Info.File_Cnt;
    var strFile_CLS = HtmlEncode(AKT116_Detail.Info.Cls_No);
    var strFile_CNT = HtmlEncode(AKT116_Detail.Info.File_Cnt);
    //1120119   Cloud 銓敘部序108 -銓敘部歸檔單位換成主旨
    if (document.all["OrgNickName"].value == "MOCS") {
        //2024.10.17   Cloud   1130941 弱掃修改XSS
        //strSEND_DNM = AKT116_Detail.Info.Subject;
        AKT116_Detail.Info.Subject = RepForChar(AKT116_Detail.Info.Subject, "<", "＜");
        AKT116_Detail.Info.Subject = RepForChar(AKT116_Detail.Info.Subject, ">", "＞");
        AKT116_Detail.Info.Subject = RepForChar(AKT116_Detail.Info.Subject, "&", "＆");
        strSEND_DNM = HtmlEncode(AKT116_Detail.Info.Subject);
    }
    //1020613	Jagle	[1020477]	增加顯示核決者
    //insertContent = Insert_One_TableRow(rowNo,strDOC_NO,strTypeDesc,strTxNo,strTxNoDesc,strTxDesc, strDocFileType, strSEND_DNM, tempDelayAttFlag, strExtfileDate, strCloseDate, strDept_Name, strRTN_UNIT_TYPE, strCLOSE_TYPE,strDOC_D,strFile_CLS,strFile_CNT,AKT116_Detail.Info.IS_RCVFILE,AKT116_Detail.Info.RCVFILE_CNT);	//1000308	Leslie	補傳入分類號及頁數；1000713 Davy [1000129] 增加傳入IS_RCVFILE、RCVFILE_CNT
    //2024.10.17   Cloud   1130941 弱掃修改XSS
    //var strAPP_USER_NAME = AKT116_Detail.Info.APP_USER_NAME;
    var strAPP_USER_NAME = HtmlEncode(AKT116_Detail.Info.APP_USER_NAME);
    //insertContent = Insert_One_TableRow(rowNo,strDOC_NO,strTypeDesc,strTxNo,strTxNoDesc,strTxDesc, strDocFileType, strSEND_DNM, tempDelayAttFlag, strExtfileDate, strCloseDate, strDept_Name, strRTN_UNIT_TYPE, strCLOSE_TYPE,strDOC_D,strFile_CLS,strFile_CNT,AKT116_Detail.Info.IS_RCVFILE,AKT116_Detail.Info.RCVFILE_CNT,strAPP_USER_NAME);
    //2017.10.27   Cloud   1061030 修改，彙併辦公文不可單退子文-子文CHECKBOX 不可單獨勾選
    var idChild = false;
    if (AKT116_Detail.Info.COMBINE_TYPE == "1" || AKT116_Detail.Info.COMBINE_TYPE == "2")
    {
        if (AKT116_Detail.Info.Com_No != argDocNo)
            idChild = true;
    }
    //1131009   Cloud   1130941 弱掃XSS 修正
    //insertContent = Insert_One_TableRow(rowNo, strDOC_NO, strTypeDesc, strTxNo, strTxNoDesc, strTxDesc, strDocFileType, strSEND_DNM, tempDelayAttFlag, strExtfileDate, strCloseDate, strDept_Name, strRTN_UNIT_TYPE, strCLOSE_TYPE, strDOC_D, strFile_CLS, strFile_CNT, AKT116_Detail.Info.IS_RCVFILE, AKT116_Detail.Info.RCVFILE_CNT, strAPP_USER_NAME, idChild, AKT116_Detail.Info.Com_No);
    var strIsRcv = HtmlEncode(AKT116_Detail.Info.IS_RCVFILE);
    var strRcvFileCnt = HtmlEncode(AKT116_Detail.Info.RCVFILE_CNT);
    var strComNo = HtmlEncode(AKT116_Detail.Info.Com_No);
    insertContent = Insert_One_TableRow(rowNo, strDOC_NO, strTypeDesc, strTxNo, strTxNoDesc, strTxDesc, strDocFileType, strSEND_DNM, tempDelayAttFlag, strExtfileDate, strCloseDate, strDept_Name, strRTN_UNIT_TYPE, strCLOSE_TYPE, strDOC_D, strFile_CLS, strFile_CNT, strIsRcv, strRcvFileCnt, strAPP_USER_NAME, idChild, strComNo);
    //Cola -- end --
    //1060303 Cloud	1050087 修改寫法改用jQuery	
    //newHTML = oldHTML_Head + insertContent + oldHTML_Back;
    //document.all["DATA1"].outerHTML = newHTML;
    $(document.all["DATA1"]).find("DIV[id='" + rowNo + "']").replaceWith(insertContent);
    /**************************************************************************************************/
    if (UpdateFlag == 0)
    {
        //AKT116_DocList.Info[rowNo-1].Doc_No=document.all["tbDocNo"].value;
        AKT116_DocList.Info[rowNo - 1].Doc_No = strDOC_NO; //951354 註記更改時抓不到tbDocNo by whay
        AKT116_DocList.Info[rowNo - 1].Doc_State = strType;
        //1060301	Cloud 升級二代，此段程式碼已無用，mark
        /*if(document.all["txSubject"].value != "")
		   AKT116_DocList.Info[rowNo-1].Subject=document.all["txSubject"].value;*/

        //Cola 000991 將退文單位(承辦/歸檔)塞入 -- start --
        if (document.all["rbType1"].checked)  //退文至承辦單位
            AKT116_DocList.Info[rowNo - 1].RTN_UNIT_TYPE = "1";
        else if (document.all["rbType2"].checked)
            AKT116_DocList.Info[rowNo - 1].RTN_UNIT_TYPE = "2";
        //Cola -- end		   

        //AKT116_DocList.Info[rowNo-1].Dept_No=document.all["txDept"].value;
        //AKT116_DocList.Info[rowNo-1].Dept_Name=document.all["dlDept"].options[document.all["dlDept"].selectedIndex].text;
        //AKT116_DocList.Info[rowNo-1].Username=document.all["txEmp"].value;
        //if (document.all["dlEmp"].selectedIndex > -1)
        //			AKT116_DocList.Info[rowNo-1].Emp_Name=document.all["dlEmp"].options[document.all["dlEmp"].selectedIndex].text;
        /*AKT116_DocList.Info[rowNo-1].Sec_No=document.all["dlSecNo"].options[document.all["dlSecNo"].selectedIndex].value;
		AKT116_DocList.Info[rowNo-1].File_Cnt=document.all["txCnt"].value;
		AKT116_DocList.Info[rowNo-1].File_Unit=document.all["dlUnit"].options[document.all["dlUnit"].selectedIndex].text;
		AKT116_DocList.Info[rowNo-1].Cls_No=document.all["txClsNo"].value;*/
        //1060301	Cloud 升級二代，此段程式碼已無用，mark
        /*if(document.all["dlSecNo"].options[document.all["dlSecNo"].selectedIndex].value != "")
		   AKT116_DocList.Info[rowNo-1].Sec_No=document.all["dlSecNo"].options[document.all["dlSecNo"].selectedIndex].value;
		if(document.all["txCnt"].value != "")
		   AKT116_DocList.Info[rowNo-1].File_Cnt=document.all["txCnt"].value;
		if(document.all["dlUnit"].options[document.all["dlUnit"].selectedIndex].text != "")
		   AKT116_DocList.Info[rowNo-1].File_Unit=document.all["dlUnit"].options[document.all["dlUnit"].selectedIndex].text;*/
        if (document.all["txClsNo"].value != "")
            AKT116_DocList.Info[rowNo - 1].Cls_No = document.all["txClsNo"].value;
        //AKT116_DocList.Info[rowNo-1].Keep_Year=document.all["txKeepYear"].value;
        if (document.all["txComNo"].value != "")
            AKT116_DocList.Info[rowNo - 1].Com_No = document.all["txComNo"].value;
        if (document.all["txCaseNo"].value != "")
            AKT116_DocList.Info[rowNo - 1].Case_No = document.all["txCaseNo"].value;
        if (document.all["txCaseName"].value != "")
            AKT116_DocList.Info[rowNo - 1].Case_Name = document.all["txCaseName"].value;
        //1060301	Cloud 升級二代，此段程式碼已無用，mark
        /*if(document.all["txFileYear"].value != "")
		   AKT116_DocList.Info[rowNo-1].File_Year=document.all["txFileYear"].value;		*/

        AKT116_DocList.Info[rowNo - 1].Tx_No = strTxNo;
        AKT116_DocList.Info[rowNo - 1].Tx_Desc = strTxDesc;
        AKT116_DocList.Info[rowNo - 1].Err_Type = strErrType;

        AKT116_DocList.Info[rowNo - 1].Extfile_Date = strExtfileDate;
        AKT116_DocList.Info[rowNo - 1].Delay_Att_Flag = strDelayAttFlag;
        
        //1131211   Cloud   1130983 參照0990500抽存附件的預計歸檔日期，udate時如檔管人員有設定改由以下屬性紀錄之
		if(strExtfileDate != "")
			AKT116_DocList.Info[rowNo-1].ATT_EXTFILE_DATE = strExtfileDate;

        //附件
        //1060301	Cloud 升級二代，此段程式碼已無用，mark
        /*for(var i=2;i<AKT116_DocList.Att[rowNo-1].Doc_No.length+2;i++)
		{
			AKT116_DocList.Att[rowNo-1].Doc_No[i-2]=document.all["tbDocNo"].value;
			AKT116_DocList.Att[rowNo-1].File_Desc[i-2]=document.all["dg1__ctl"+i+"_txDesc"].value;
			AKT116_DocList.Att[rowNo-1].Media_Type[i-2]=document.all["dg1__ctl"+i+"_dlMedia"].options[document.all["dg1__ctl"+i+"_dlMedia"].selectedIndex].value;
			AKT116_DocList.Att[rowNo-1].File_Cnt[i-2]=document.all["dg1__ctl"+i+"_txCnt1"].value;
			AKT116_DocList.Att[rowNo-1].File_Unit[i-2]=document.all["dg1__ctl"+i+"_dlUnit1"].options[document.all["dg1__ctl"+i+"_dlUnit1"].selectedIndex].text;
			//AKT116_DocList.Att[rowNo-1].Remark[i-2]=document.all["dg1__ctl"+i+"_txRemark"].value;
			//AKT116_DocList.Att[rowNo-1].Att_Location[i-2]=document.all["dg1__ctl"+i+"_txPlace"].value;
			AKT116_DocList.Info[rowNo-1].Tx_Desc=strTxDesc;
			AKT116_DocList.Info[rowNo-1].Extfile_Date=strExtfileDate;
			AKT116_DocList.Info[rowNo-1].Delay_Att_Flag=strDelayAttFlag;
		}*/
    }
    else if (UpdateFlag == 1)
    {
        UpdateFlag = 0;
        //Cola 000991 將退文單位(承辦/歸檔)塞入 -- start --
        if (document.all["rbType1"].checked)  //退文至承辦單位
            AKT116_DocList.Info[rowNo - 1].RTN_UNIT_TYPE = "1";
        else if (document.all["rbType2"].checked)
            AKT116_DocList.Info[rowNo - 1].RTN_UNIT_TYPE = "2";
        //Cola -- end		
        AKT116_DocList.Info[rowNo - 1].Doc_State = strType;
        AKT116_DocList.Info[rowNo - 1].Tx_No = strTxNo;
        AKT116_DocList.Info[rowNo - 1].Tx_Desc = strTxDesc;
        
		//1131211   Cloud   1130983 參照0990500抽存附件的預計歸檔日期，udate時如檔管人員有設定改由以下屬性紀錄之
		if(strExtfileDate != "")
			AKT116_DocList.Info[rowNo-1].ATT_EXTFILE_DATE = strExtfileDate;
    }
    /**************************************************************************************************/
    //David 95.05.10
    //Modify by Cola 000991 新增退文類型欄位 strRTN_UNIT_TYPE -- start --
    //[001480]新增結案別
    document.all["Record"].options[rowNo - 1].text = rowNo + "," + strDOC_NO + "," + strType + "," + strTxNo + "," + strTxNoDesc + "," + strTxDesc + "," + strErrType + "," + stridx + "," + strDelayAttFlag + "," + strExtfileDate + "," + strCloseDate + "," + strRTN_UNIT_TYPE;
    document.all["Record"].options[rowNo - 1].value = rowNo + "," + strDOC_NO + "," + strType + "," + strTxNo + "," + strTxNoDesc + "," + strTxDesc + "," + strErrType + "," + stridx + "," + strDelayAttFlag + "," + strExtfileDate + "," + strCloseDate + "," + strRTN_UNIT_TYPE;
    //Cola -- end --
    document.all["cbCLEAR" + (rowNo)].checked = false;

}

/******************************************************************
新增資料至Table中
SEQ:序
DOC_NO:文號
TYPE:檔案種類
TxNo:
TxNoDesc:
TxDesc:備註
DocFileType:檔案種類
argSEND_DNM:歸檔單位
******************************************************************/
//2010.12.10	Debra	0990593	[雲科大]調整Layout新增分頁號及頁數的資料 --add argFile_CLS,argFile_CNT
//1020613	Jagle	[1020477]	增加核決者欄位
//function Insert_One_TableRow(SEQ, DOC_NO, Type, TxNo, TxNoDesc, TxDesc, DocFileType, argSEND_DNM, argDelayAttFlag, argExtfileDate, argCloseDate, argDept_Name, argRTN_UNIT_TYPE, argCLOSE_TYPE, argDOC_D,argFile_CLS,argFile_CNT, argIS_RCVFILE, argRCVFILE_CNT)	//1000713 Davy [1000129] 增加傳入IS_RCVFILE、RCVFILE_CNT
//2017.10.27   Cloud   1061030 修改，彙併辦公文不可單退子文-子文CHECKBOX 不可單獨勾選
//function Insert_One_TableRow(SEQ, DOC_NO, Type, TxNo, TxNoDesc, TxDesc, DocFileType, argSEND_DNM, argDelayAttFlag, argExtfileDate, argCloseDate, argDept_Name, argRTN_UNIT_TYPE, argCLOSE_TYPE, argDOC_D,argFile_CLS,argFile_CNT, argIS_RCVFILE, argRCVFILE_CNT, argAPP_USER_NAME)
function Insert_One_TableRow(SEQ, DOC_NO, Type, TxNo, TxNoDesc, TxDesc, DocFileType, argSEND_DNM, argDelayAttFlag, argExtfileDate, argCloseDate, argDept_Name, argRTN_UNIT_TYPE, argCLOSE_TYPE, argDOC_D, argFile_CLS, argFile_CNT, argIS_RCVFILE, argRCVFILE_CNT, argAPP_USER_NAME, argIsChild, argComNo)
{
    //1060224 Cloud	1050087 升級二代
    //var param = new Array(new Array(DOC_NO));
    var param = new Array(DOC_NO);
    RtnObj = jf_CallWS("AKT116WS.asmx", "GetCl_Inf", false, param);
    var Err_Type = "";
    var Err_Msg = "";
    if (jf_IsWebServiceSuccess(RtnObj))
    {
        Err_Type = RtnObj.value.Info.Err_Type;
		//1120605	Joe		1120361		弱掃修正XSS
        // Err_Msg = RtnObj.value.Info.Err_Msg;
        Err_Msg = HtmlEncode(RtnObj.value.Info.Err_Msg);
    }
    // AKT116 畫面美工 by whay
    if (TxNoDesc == "")
        TxNoDesc = "&nbsp;";
    if (argExtfileDate == "")
        argExtfileDate = "&nbsp;";
    if (argCloseDate == "")
        argCloseDate = "&nbsp;";
    if (TxDesc == "")
        TxDesc = "&nbsp;";
    if (Err_Msg == "")
        Err_Msg = "&nbsp;";
    var InsertContent = "";
    var InsertContentBegin = "";
    var InsertContentErrType = "";
    var InsertContentEnd = "";

    /* before 2003.10.29
	InsertContentBegin = "<TR id=" + SEQ + ">"+
					"<TD style='WIDTH: 48px' bgColor='#F7F7DE' align='middle'>";
	InsertContentEnd = "</TD><TD style='WIDTH: 52px' bgColor='#F7F7DE' align='middle'>"+
					"<input id='cbCLEAR" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' onclick='ClearCheck()' tabindex='-1'/></TD>"+
					"<TD style='WIDTH: 56px' align='middle' bgColor='#F7F7DE'>"+ SEQ + "</TD>" +
					"<TD style='WIDTH: 100px' bgColor='#F7F7DE' align='left'><a id='NO" + SEQ + "' href='javascript:SelectRow()' tabindex='-1'>"+ DOC_NO + "</a></TD>"  +
					"<TD style='WIDTH: 100px' bgColor='#F7F7DE' align='left'>"+ GetDocFileTypeDesc(DocFileType) +"</TD>"+  //2003.10.28 add by mk
					"<TD style='WIDTH: 52px' bgColor='#F7F7DE' align='middle'>"+ Type + "</TD>" +
					"<TD style='WIDTH: 230px' bgColor='#F7F7DE' align='left'>" +TxNoDesc + "</TD>" +
					"<TD bgColor='#F7F7DE' align='left'>"+ TxDesc + "</TD>" +
					"<TD style='WIDTH: 100px' bgColor='#F7F7DE' align='left'>"+ ErrMsg +"</TD>"+  //2003.10.28 add by mk
					"</TR>";

*************
	InsertContentBegin = "<TR id=" + SEQ + ">"+
					"<TD style='WIDTH: 54px' bgColor='#F7F7DE' align='middle'>";

	InsertContentEnd = "</TD><TD style='WIDTH: 29px' bgColor='#F7F7DE' align='middle'>"+
					"<input id='cbCLEAR" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' onclick='ClearCheck()' tabindex='-1'/></TD>"+
					"<TD style='WIDTH: 32px' align='middle' bgColor='#F7F7DE'>"+ SEQ + "</TD>" +
					"<TD style='WIDTH: 91px' bgColor='#F7F7DE' align='left'><a id='NO" + SEQ + "' href='javascript:SelectRow()' tabindex='-1'><font size='2'>"+ DOC_NO + "</font></a></TD>"  +
					"<TD style='WIDTH: 59px' bgColor='#F7F7DE' align='left'><font size='2'>"+ GetDocFileTypeDesc(DocFileType) +"</font></TD>"+  //2003.10.28 add by mk
					"<TD style='WIDTH: 52px' bgColor='#F7F7DE' align='middle'><font size='2'>"+ Type + "</font></TD>" +
					"<TD style='WIDTH: 91px' bgColor='#F7F7DE' align='left'><font size='2'>" +TxNoDesc + "</font></TD>" +
					"<TD style='WIDTH: 122px' bgColor='#F7F7DE' align='left'><font size='2'>"+ TxDesc + "</font></TD>" +
					"<TD bgColor='#F7F7DE' align='left'><font size='2'>"+ Err_Msg +"</font></TD>"+  //2003.10.28 add by mk
					"</TR>";

					
				<TD style="WIDTH: 30px" align="middle"><FONT face="新細明體" size="2">詮釋資料</FONT></TD>
				<TD style="WIDTH: 29px" align="middle"><FONT size="2">取消</FONT></TD>
				<TD style="WIDTH: 32px" align="middle"><FONT size="2">序</FONT></TD>
				<TD style="WIDTH: 91px" align="middle"><FONT size="2">公文文號</FONT></TD>
				<TD style="WIDTH: 30px" align="middle"><FONT size="2"><FONT size="2">檔案種類</FONT></FONT></FONT></FONT></TD>
				<TD style="WIDTH: 60px" align="middle"><FONT size="2"><FONT size="2">歸檔單位</FONT></FONT></FONT></FONT></TD>
									
				<TD style="WIDTH: 30px" align="middle"><FONT size="2"><FONT size="2">作業別</FONT></FONT></TD>
				<TD style="WIDTH: 80px" align="middle"><FONT size="2">點收 / 退文註記</FONT></TD>
				<TD align="middle" style="WIDTH: 80px"><FONT size="2">備註</FONT></TD>
				<TD align="middle" style="WIDTH: 100px"><FONT face="新細明體" size="2">異常訊息</FONT></TD>

					
	*/

    //Cola 000991 依據傳入之退文類型轉換為中文字 -- start -- (當作業別為點收時, 顯示空值)
    var RTN_UNIT_TYPE = "無";
    if (Type == "退文")
    {
        if (argRTN_UNIT_TYPE == "1")
            RTN_UNIT_TYPE = "承辦";
        else if (argRTN_UNIT_TYPE == "2")
        {
            //1040327	Cloud	[1040185] (中榮)改為退回發文	
            if (document.all.AK_BackToIssue.value == "Y")
                RTN_UNIT_TYPE = "總發";
            else
                RTN_UNIT_TYPE = "歸檔";
        }
    }

    //[001480]Cola 依據CLOSE_TYPE轉為發 or 存
    var CLOSE_TYPE = "";
    if (argCLOSE_TYPE == "1" || argCLOSE_TYPE == "2")
        CLOSE_TYPE = "發";
    else
        CLOSE_TYPE = "&nbsp;";
    //Cola -- end --

    //[001697]Cola
    var DOC_D = "";
    if (argDOC_D == "")
        DOC_D = "&nbsp;";
    else
        DOC_D = argDOC_D;
    //Cola -- end --		


    //1060224 	Cloud	1050087 升級二代
    /*InsertContentBegin = "<TR id=" + SEQ + ">"+
					"<TD style='WIDTH: 30px' bgColor='#F7F7DE' align='middle'><font size='2'>";*/
    InsertContentBegin = "<DIV class='dTR' id=" + SEQ + ">" +
					"<DIV style='width: 2em' align='middle' class='Datalist' >";
    /*InsertContentBegin = "<TR id=" + SEQ + ">"+
					"<TD style='WIDTH: 30px' bgColor='#F7F7DE' align='middle'><font size='2'>";*/

    //[001480]Modify by Cola 透過系統參數決定要塞入之資訊 -- start --
    if (document.all["txAK_AKT116_SHOW_CLOSETYPE"].value == "N")
    {
        //1060224 	Cloud	1050087 升級二代
        /*InsertContentEnd = "</TD><TD style='WIDTH: 29px' bgColor='#F7F7DE' align='middle'><font size='2'>";
		InsertContentEnd+= "<input id='cbCLEAR" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' onclick='ClearCheck()' tabindex='-1'/></TD>";
		InsertContentEnd+="<TD style='WIDTH: 29px' bgColor='#F7F7DE' align='middle'><font size='2'>";
		InsertContentEnd+="<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + " tabindex='-1'/></font></TD>";     //951354增加註記checkbox by whay 0951220
		InsertContentEnd+="<TD style='WIDTH: 30px' bgColor='#F7F7DE' align='middle'><font size='2'>"+ SEQ + "</TD>" ;
		InsertContentEnd+="<TD style='WIDTH: 80px' bgColor='#F7F7DE' align='left'><a id='NO" + SEQ + "' href='javascript:SelectRow()' tabindex='-1'><font size='2'>"+ DOC_NO + "</a></TD>"  ;
		InsertContentEnd+="<TD style='WIDTH: 34px' bgColor='#F7F7DE' align='left'><font size='2'>"+ GetDocFileTypeDesc(DocFileType) +"</font></TD>";  //2003.10.28 add by mk
		//1000713 Davy [1000129] 調整欄位顯示位置
		InsertContentEnd+="<TD style='WIDTH: 38px' bgColor='#F7F7DE' align='center'><font size='2'>"+ argFile_CNT +"</font></TD>";
		InsertContentEnd+="<TD style='WIDTH: 34px' bgColor='#F7F7DE' align='left'><font size='2'>"+ argIS_RCVFILE +"</font></TD>";
		InsertContentEnd+="<TD style='WIDTH: 38px' bgColor='#F7F7DE' align='center'><font size='2'>"+ argRCVFILE_CNT +"</font></TD>";*/

        //1060823	Leslie	效能調校
        /*InsertContentEnd = "</DIV><DIV class='Datalist' style='WIDTH: 1em' align='middle'>";
		InsertContentEnd += "<input id='cbCLEAR" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' onclick='ClearCheck()' tabindex='-1'/></DIV>";
		InsertContentEnd += "<DIV class='Datalist' style='WIDTH: 1em' align='middle'>";
		InsertContentEnd += "<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + " tabindex='-1'/></DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 1.5em' class='Datalist' >" + SEQ + "</DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 5.5em' class='Datalist' ><a id='NO" + SEQ + "' href='javascript:SelectRow()' tabindex='-1'>" + DOC_NO + "</a></DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist' >" + GetDocFileTypeDesc(DocFileType) + "</DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist' >" + argFile_CNT + "</DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist' >" + argIS_RCVFILE + "</DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist' >" + argRCVFILE_CNT + "</DIV>";*/
        InsertContentEnd = "</DIV><DIV class='Datalist WD_1' align='middle'>";
		//1081119 Cloud [1080980] 彙併辦子文不可單獨退文-補強取消部分
		if (argIsChild)
			InsertContentEnd += "<input id='cbCLEAR" + SEQ + "' childSeqNo='" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' tabindex='-1' style='opacity: 0.4;pointer-events: none;' ClearComNo='" + argComNo + "'/></DIV>";
		else
			InsertContentEnd += "<input id='cbCLEAR" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' onclick='ClearCheck()' tabindex='-1'/></DIV>";
        
        InsertContentEnd += "<DIV class='Datalist WD_1' align='middle'>";
        //1061027 Cloud [1061030] 彙併辦子文不可單獨退文
        if (argIsChild)
            InsertContentEnd += "<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + " tabindex='-1' style='opacity: 0.4;pointer-events: none;' ComNo='" + argComNo + "'/></DIV>";
        else
            InsertContentEnd += "<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + "' onclick='CheckChild(cbChange" + SEQ + "," + DOC_NO + ")' tabindex='-1'/></DIV>";

        InsertContentEnd += "<DIV class='Datalist WD_1H' >" + SEQ + "</DIV>";
		//1091120 Cloud 1090828 修改彙併辦子文不提供超連結
		if (argIsChild)
			InsertContentEnd += "<DIV class='Datalist WD_5H' id='NO" + SEQ + "' tabindex='-1' >" + DOC_NO + "</DIV>";
		else
			InsertContentEnd += "<DIV class='Datalist WD_5H' ><a id='NO" + SEQ + "' href='javascript:SelectRow()' tabindex='-1'>" + DOC_NO + "</a></DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2' >" + GetDocFileTypeDesc(DocFileType) + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2' >" + argFile_CNT + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2' >" + argIS_RCVFILE + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2' >" + argRCVFILE_CNT + "</DIV>";
        if (argIS_RCVFILE == "是" && argRCVFILE_CNT == "0")
        {
            if (Err_Msg != "")
                Err_Msg += "<BR>";
            Err_Msg += "紙本來文併同歸檔數量不可為0";
        }
        //1060224 	Cloud	1050087 升級二代
        /*InsertContentEnd+="<TD style='WIDTH: 65px' bgColor='#F7F7DE' align='left'><font size='2'>"+ argSEND_DNM +"</font></TD>";
		InsertContentEnd+="<TD style='WIDTH: 65px' bgColor='#F7F7DE' align='left'><font size='2'>"+ argDept_Name +"</font></TD>";  //add by Cola*/
        //1120119   Cloud   序16 銓敘部歸檔單位換成主旨
        if (document.all["OrgNickName"].value == "MOCS") {
            
            if (argSEND_DNM.length > 20)
            { InsertContentEnd += "<DIV style='WIDTH: " + SendDeptlength + "' class='Datalist' title='" + argSEND_DNM + "' >" + argSEND_DNM.substring(0, 20) + "</DIV>"; }
            else
            { InsertContentEnd += "<DIV style='WIDTH: " + SendDeptlength + "' class='Datalist' title='" + argSEND_DNM + "' >" + argSEND_DNM + "</DIV>"; }
                
        }
        else {
            InsertContentEnd += "<DIV style='WIDTH: " + SendDeptlength + "' class='Datalist'>" + argSEND_DNM + "</DIV>";
        }
        InsertContentEnd += "<DIV style='WIDTH: " + Deptlength + "' class='Datalist'>" + argDept_Name + "</DIV>";

        //[0970650]Modify by Cola 若為交通部不顯示
        if (document.all["IS_MOTC"].value != "1")
        {
            //1060224 	Cloud	1050087 升級二代
            /*InsertContentEnd+="<TD style='WIDTH: 30px' bgColor='#F7F7DE' align='middle'><font size='2'>"+ Type + "</font></TD>" ;
			InsertContentEnd+="<TD style='WIDTH: 34px' bgColor='#F7F7DE' align='center'><font size='2'>"+ RTN_UNIT_TYPE +"</font></TD>";  //add by Cola*/

            //1060823	Leslie	效能調校
            //InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist'>" + Type + "</DIV>";
            //InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist'>" + RTN_UNIT_TYPE + "</DIV>";
            InsertContentEnd += "<DIV class='Datalist WD_2'>" + Type + "</DIV>";
            InsertContentEnd += "<DIV class='Datalist WD_2'>" + RTN_UNIT_TYPE + "</DIV>";
        }
        //Cola -- end --
        //1060224 	Cloud	1050087 升級二代
        /*InsertContentEnd+="<TD style='WIDTH: 93px' bgColor='#F7F7DE' align='left'><font size='2'>" +TxNoDesc + "</font></TD>" ;
					
		InsertContentEnd+="<TD style='WIDTH: 32px' bgColor='#F7F7DE' align='center'><font size='2'>"+ argDelayAttFlag +"</font></TD>";
		InsertContentEnd+="<TD style='WIDTH: 60px' bgColor='#F7F7DE' align='left'><font size='2'>"+ argExtfileDate +"</font></TD>";				
		InsertContentEnd+="<TD style='WIDTH: 60px' bgColor='#F7F7DE' align='left'><font size='2'>"+ argCloseDate +"</font></TD>";*/

        //1060823	Leslie	效能調校
        /*InsertContentEnd += "<DIV style='WIDTH: 7em' class='Datalist'>" + TxNoDesc + "</DIV>";
					
		InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist'>" + argDelayAttFlag + "</DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 4em' class='Datalist'>" + argExtfileDate + "</DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 4em' class='Datalist'>" + argCloseDate + "</DIV>";*/
        InsertContentEnd += "<DIV class='Datalist WD_7'>" + TxNoDesc + "</DIV>";

        InsertContentEnd += "<DIV class='Datalist WD_2'>" + argDelayAttFlag + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_4'>" + argExtfileDate + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_4'>" + argCloseDate + "</DIV>";


        //[001697]Modify by Cola 判斷DOC_D是否額外取出資訊	
        //2010.12.10	Debra	0990593	[雲科大]調整Layout新增分頁號及頁數的資料
        //1060224 	Cloud	1050087 升級二代
        /*InsertContentEnd+="<TD style='WIDTH: 60px' bgColor='#F7F7DE' align='center'><font size='2'>"+ argFile_CLS +"</font></TD>"; 
		//1020613	Jagle	[1020477]	增加核決者欄位
		InsertContentEnd+="<TD style='WIDTH: 60px' bgColor='#F7F7DE' align='center'><font size='2'>"+ argAPP_USER_NAME +"</font></TD>"; 
		//1000713 Davy [1000129] 調整欄位顯示位置
		//InsertContentEnd+="<TD style='WIDTH: 38px' bgColor='#F7F7DE' align='center'><font size='2'>"+ argFile_CNT +"</font></TD>"; 
		//end				
		InsertContentEnd+="<TD style='WIDTH: 81px' bgColor='#F7F7DE' align='left'><font size='2'>"+ TxDesc + "</font></TD>";
		InsertContentEnd+="<TD style='WIDTH: 107px' bgColor='#F7F7DE' align='left'><font size='2'>"+ Err_Msg +"</font></TD>";  //2003.10.28 add by mk*/

        //1060823	Leslie	效能調校
        //InsertContentEnd += "<DIV style='WIDTH: 4.5em' class='Datalist'>" + argFile_CLS + "</DIV>";
        //InsertContentEnd += "<DIV style='WIDTH: 3em' class='Datalist'>" + argAPP_USER_NAME + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_4H'>" + argFile_CLS + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_3'>" + argAPP_USER_NAME + "</DIV>";

        //1050301 Cloud	1050087 升級二代
        InsertContentEnd += "<DIV style='WIDTH: " + lbdectlength + "' class='Datalist'>" + TxDesc + "</DIV>";
        InsertContentEnd += "<DIV style='WIDTH: " + lbErrmsglength + "' class='Datalist'>" + Err_Msg + "</DIV>";
        //[001697]Modify by Cola 判斷DOC_D是否額外取出資訊		
        if (document.all["AKT116_DOC_D"].value == "Y" && document.all["IS_MOTC"].value == "0")
        {
            //1060224 	Cloud	1050087 升級二代
            //InsertContentEnd+= "<TD style='WIDTH: 80px' bgColor='#F7F7DE' align='center'><font size='2'>"+ DOC_D.replace(/,/gi,"<br>") +"</TD>";		
            InsertContentEnd += "<DIV style='WIDTH: 5.5em' class='Datalist'>" + DOC_D.replace(/,/gi, "<br>") + "</DIV>";
        }

        //1060224 	Cloud	1050087 升級二代					
        //InsertContentEnd+="</font></TR>";
        InsertContentEnd += "</div>";
    }
    else if (document.all["txAK_AKT116_SHOW_CLOSETYPE"].value == "Y")
    {
        //1060224 	Cloud	1050087 升級二代
        /*InsertContentEnd = "</TD><TD style='WIDTH: 29px' bgColor='#F7F7DE' align='middle'><font size='2'>";
		InsertContentEnd+="<input id='cbCLEAR" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' onclick='ClearCheck()' tabindex='-1'/></TD>";
		InsertContentEnd+="<TD style='WIDTH: 29px' bgColor='#F7F7DE' align='middle'><font size='2'>";
		InsertContentEnd+="<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + " tabindex='-1'/></font></TD>";     //951354增加註記checkbox by whay 0951220
		InsertContentEnd+="<TD style='WIDTH: 30px' bgColor='#F7F7DE' align='middle'><font size='2'>"+ SEQ + "</TD>" ;
		InsertContentEnd+="<TD style='WIDTH: 80px' bgColor='#F7F7DE' align='left'><a id='NO" + SEQ + "' href='javascript:SelectRow()' tabindex='-1'><font size='2'>"+ DOC_NO + "</a></TD>"  ;
		InsertContentEnd+="<TD style='WIDTH: 34px' bgColor='#F7F7DE' align='left'><font size='2'>"+ GetDocFileTypeDesc(DocFileType) +"</font></TD>";  //2003.10.28 add by mk
		//1000713 Davy [1000129] 調整欄位顯示位置
		InsertContentEnd+="<TD style='WIDTH: 38px' bgColor='#F7F7DE' align='center'><font size='2'>"+ argFile_CNT +"</font></TD>"; 
		InsertContentEnd+="<TD style='WIDTH: 34px' bgColor='#F7F7DE' align='left'><font size='2'>"+ argIS_RCVFILE +"</font></TD>";
		InsertContentEnd+="<TD style='WIDTH: 38px' bgColor='#F7F7DE' align='center'><font size='2'>"+ argRCVFILE_CNT +"</font></TD>";

		InsertContentEnd+="<TD style='WIDTH: 65px' bgColor='#F7F7DE' align='left'><font size='2'>"+ argSEND_DNM +"</font></TD>"; 
		InsertContentEnd+="<TD style='WIDTH: 65px' bgColor='#F7F7DE' align='left'><font size='2'>"+ argDept_Name +"</font></TD>";  //add by Cola*/

        //1060823	Leslie	效能調校
        /*InsertContentEnd = "</DIV><DIV style='WIDTH: 1em' class='Datalist' align='middle'>";
		InsertContentEnd += "<input id='cbCLEAR" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' onclick='ClearCheck()' tabindex='-1'/></DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 1em' class='Datalist'  align='middle'>";
		InsertContentEnd += "<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + " tabindex='-1'/></DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 1.5em' class='Datalist'>" + SEQ + "</DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 5.5em' class='Datalist'><a id='NO" + SEQ + "' href='javascript:SelectRow()' tabindex='-1'>" + DOC_NO + "</a></DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist'>" + GetDocFileTypeDesc(DocFileType) + "</DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist'>" + argFile_CNT + "</DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist'>" + argIS_RCVFILE + "</DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist'>" + argRCVFILE_CNT + "</DIV>";*/
        InsertContentEnd = "</DIV><DIV class='Datalist WD_1' align='middle'>";
		//1081119 Cloud [1080980] 彙併辦子文不可單獨退文-補強取消部分
		if (argIsChild)
			InsertContentEnd += "<input id='cbCLEAR" + SEQ + "' childSeqNo='" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' tabindex='-1' style='opacity: 0.4;pointer-events: none;' ClearComNo='" + argComNo + "'/></DIV>";
		else
        InsertContentEnd += "<input id='cbCLEAR" + SEQ + "' type='checkbox' name='cbCLEAR" + SEQ + "' onclick='ClearCheck()' tabindex='-1'/></DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_1'  align='middle'>";
        //1061027 Cloud [1061030] 彙併辦子文不可單獨退文
        //InsertContentEnd += "<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + " tabindex='-1'/></DIV>";
        if (argIsChild)
            InsertContentEnd += "<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + " tabindex='-1' style='opacity: 0.4;pointer-events: none;' ComNo='" + argComNo + "'/></DIV>";
        else
            //1121213   Cloud   踩到bug 一併修正
            //InsertContentEnd += "<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + "' onclick='CheckChild('cbChange" + SEQ + "','" + DOC_NO + "')' tabindex='-1'/></DIV>";
            InsertContentEnd += "<input id='cbChange" + SEQ + "' type='checkbox' name='cbChange" + SEQ + "' onclick='CheckChild(cbChange" + SEQ + "," + DOC_NO + ")' tabindex='-1'/></DIV>";

        InsertContentEnd += "<DIV class='Datalist WD_1H'>" + SEQ + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_5H'><a id='NO" + SEQ + "' href='javascript:SelectRow()' tabindex='-1'>" + DOC_NO + "</a></DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2'>" + GetDocFileTypeDesc(DocFileType) + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2'>" + argFile_CNT + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2'>" + argIS_RCVFILE + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_2'>" + argRCVFILE_CNT + "</DIV>";
        //1120119   Cloud   序16 銓敘部歸檔單位換成主旨
        if (document.all["OrgNickName"].value == "MOCS") {
            
            if (argSEND_DNM.length > 20)
            { InsertContentEnd += "<DIV style='WIDTH: " + SendDeptlength + "' class='Datalist' title='" + argSEND_DNM + "' >" + argSEND_DNM.substring(0, 20) + "</DIV>"; }
            else
            { InsertContentEnd += "<DIV style='WIDTH: " + SendDeptlength + "' class='Datalist' title='" + argSEND_DNM + "' >" + argSEND_DNM + "</DIV>"; }

        }
        else {
            InsertContentEnd += "<DIV style='WIDTH: " + SendDeptlength + "' class='Datalist'>" + argSEND_DNM + "</DIV>";
        }
        InsertContentEnd += "<DIV style='WIDTH: " + Deptlength + "' class='Datalist'>" + argDept_Name + "</DIV>";

        //[0970650]Modify by Cola 若為交通部不顯示
        if (document.all["IS_MOTC"].value != "1")
        {
            //1060224 	Cloud	1050087 升級二代
            /*InsertContentEnd+="<TD style='WIDTH: 30px' bgColor='#F7F7DE' align='middle'><font size='2'>"+ Type + "</font></TD>" ;
			InsertContentEnd+="<TD style='WIDTH: 34px' bgColor='#F7F7DE' align='center'><font size='2'>"+ RTN_UNIT_TYPE +"</font></TD>";  //add by Cola*/

            //1060823	Leslie	效能調校
            //InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist'>" + Type + "</DIV>";
            //InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist'>" + RTN_UNIT_TYPE + "</DIV>";
            InsertContentEnd += "<DIV class='Datalist WD_2'>" + Type + "</DIV>";
            InsertContentEnd += "<DIV class='Datalist WD_2'>" + RTN_UNIT_TYPE + "</DIV>";
        }
        //Cola -- end --						
        //1060224 	Cloud	1050087 升級二代
        /*InsertContentEnd+="<TD style='WIDTH: 93px' bgColor='#F7F7DE' align='left'><font size='2'>" +TxNoDesc + "</font></TD>" ;
						
		InsertContentEnd+="<TD style='WIDTH: 32px' bgColor='#F7F7DE' align='center'><font size='2'>"+ argDelayAttFlag +"</font></TD>";
		InsertContentEnd+="<TD style='WIDTH: 60px' bgColor='#F7F7DE' align='left'><font size='2'>"+ argExtfileDate +"</font></TD>";				
		InsertContentEnd+="<TD style='WIDTH: 60px' bgColor='#F7F7DE' align='left'><font size='2'>"+ argCloseDate +"</font></TD>"; */

        //1060823	Leslie	效能調校
        /*InsertContentEnd += "<DIV style='WIDTH: 7em' class='Datalist'>" + TxNoDesc + "</DIV>";
						
		InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist'>" + argDelayAttFlag + "</DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 4em' class='Datalist'>" + argExtfileDate + "</DIV>";
		InsertContentEnd += "<DIV style='WIDTH: 4em' class='Datalist'>" + argCloseDate + "</DIV>";*/
        InsertContentEnd += "<DIV class='Datalist WD_7'>" + TxNoDesc + "</DIV>";

        InsertContentEnd += "<DIV class='Datalist WD_2'>" + argDelayAttFlag + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_4'>" + argExtfileDate + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_4'>" + argCloseDate + "</DIV>";

        //[1000825]Modify by Ivory 若為交通部不顯示
        if (document.all["IS_MOTC"].value != "1")
            //1060224 	Cloud	1050087 升級二代
            //InsertContentEnd+="<TD style='WIDTH: 30px' bgColor='#F7F7DE' align='center'><font size='2'>"+ CLOSE_TYPE +"</font></TD>";  //add by Cola
            //1060823	Leslie	效能調校
            //InsertContentEnd += "<DIV style='WIDTH: 2em' class='Datalist'>" + CLOSE_TYPE + "</DIV>";
            InsertContentEnd += "<DIV class='Datalist WD_2'>" + CLOSE_TYPE + "</DIV>";

        //2010.12.10	Debra	0990593	[雲科大]調整Layout新增分頁號及頁數的資料
        //1060224 	Cloud	1050087 升級二代
        //InsertContentEnd += "<TD style='WIDTH: 60px' class='Datalist'><font size='2'>" + argFile_CLS + "</font></TD>";
        //1060823	Leslie	效能調校
        //InsertContentEnd += "<DIV style='WIDTH: 4.5em' class='Datalist'>" + argFile_CLS + "</DIV>";
        InsertContentEnd += "<DIV class='Datalist WD_4H'>" + argFile_CLS + "</DIV>";

        //1020613	Jagle	[1020477]	增加核決者欄位
        //1060224 	Cloud	1050087 升級二代
        //InsertContentEnd += "<TD style='WIDTH: 60px' class='Datalist'><font size='2'>" + argAPP_USER_NAME + "</font></TD>";
        //InsertContentEnd += "<TD style='WIDTH: 81px' class='Datalist'><font size='2'>" + TxDesc + "</font></TD>";
        //InsertContentEnd += "<TD style='WIDTH: 107px' class='Datalist'><font size='2'>" + Err_Msg + "</font></TD>";  //2003.10.28 add by mk
        InsertContentEnd += "<DIV style='WIDTH: 3em' class='Datalist'>" + argAPP_USER_NAME + "</DIV>";
        InsertContentEnd += "<DIV style='WIDTH: " + lbdectlength + "' class='Datalist'>" + TxDesc + "</DIV>";
        InsertContentEnd += "<DIV style='WIDTH: " + lbErrmsglength + "' class='Datalist'>" + Err_Msg + "</DIV>";




        //2010.12.10	Debra	0990593	[雲科大]調整Layout新增分頁號及頁數的資料
        //InsertContentEnd+="<TD style='WIDTH: 60px' bgColor='#F7F7DE' align='center'><font size='2'>"+ argFile_CLS +"</font></TD>";  //zola 位置不對
        //1000713 Davy [1000129] 調整欄位顯示位置
        //InsertContentEnd+="<TD style='WIDTH: 38px' bgColor='#F7F7DE' align='center'><font size='2'>"+ argFile_CNT +"</font></TD>"; 
        //end

        //[001697]Modify by Cola 判斷DOC_D是否額外取出資訊
        //[1000825]Modify by Ivory 若為交通部不顯示		
        if (document.all["AKT116_DOC_D"].value == "Y" && document.all["IS_MOTC"].value != "1")
            //1060224 	Cloud	1050087 升級二代
            //InsertContentEnd+= "<TD style='WIDTH: 80px' bgColor='#F7F7DE' align='center'><font size='2'>"+ DOC_D.replace(/,/gi,"<br>") +"</TD>";		
            InsertContentEnd += "<DIV style='WIDTH: 5.5em' class='Datalist'>" + DOC_D.replace(/,/gi, "<br>") + "</DIV>";

        //1060224 	Cloud	1050087 升級二代						
        //InsertContentEnd+="</font></TR>";
        InsertContentEnd += "</DIV>";
    }
    /* Reference
                    <TD style="WIDTH: 57px" align="middle"><FONT face="新細明體" size="2">詮釋資料</FONT></TD>
                    <TD style="WIDTH: 29px" align="middle"><FONT size="2">取消</FONT></TD>
                    <TD style="WIDTH: 32px" align="middle"><FONT size="2">序</FONT></TD>
                    <TD style="WIDTH: 101px" align="middle"><FONT size="2">公文文號</FONT></TD>
                    <TD style="WIDTH: 60px" align="middle"><FONT size="2"><FONT size="2"><FONT size="2"><FONT size="2">檔案種類</FONT></FONT></FONT></FONT></TD>
                    <TD style="WIDTH: 52px" align="middle"><FONT size="2"><FONT size="2">作業別</FONT></FONT></TD>
                    <TD style="WIDTH: 91px" align="middle"><FONT size="2">點收 / 退文註記</FONT></TD>
                    <TD align="middle" style="WIDTH: 125px"><FONT size="2">備註</FONT></TD>
                    <TD align="middle"><FONT face="新細明體" size="2">異常訊息</FONT></TD>
    */

    switch (Err_Type)
    {
        case "W"://警告
            //InsertContentErrType = "<a id= 'img_"+SEQ+"' href='javascript:jf_OpenAKT116C2(\""+DOC_NO+"\")' tabindex ='-1'>"+
            //	"<IMG SRC ='./Template/images/DOC_W.gif' ALT='公文轉檔時有異常' style='border-style: none'></a>";
            //1071017 Zen 1070678 弱掃Client Potential XSS修正
            //InsertContentErrType = "<a id= 'img_" + SEQ + "' href='javascript:jf_OpenAKT116C2(\"" + DOC_NO + "\")' tabindex ='-1'><font color='red' size='2'>錯誤</font></a>";
            InsertContentErrType = "<a id= 'img_" + SEQ + "' href='javascript:jf_OpenAKT116C2(\"" + HtmlEncode(DOC_NO) + "\")' tabindex ='-1'><font color='red' size='2'>錯誤</font></a>";
            break;
        case "E"://錯誤
            //InsertContentErrType = "<a id= 'img_"+SEQ+"' href='javascript:jf_OpenAKT116C2(\""+DOC_NO+"\")' tabindex ='-1'>"+
            //	"<IMG SRC ='./Template/images/DOC_E.gif' ALT='公文轉檔時有錯誤' style='border-style: none'></a>";
            //1071017 Zen 1070678 弱掃Client Potential XSS修正
            //InsertContentErrType = "<a id= 'img_" + SEQ + "' href='javascript:jf_OpenAKT116C2(\"" + DOC_NO + "\")' tabindex ='-1'><font color='red' size='2'>錯誤</font></a>";
            InsertContentErrType = "<a id= 'img_" + SEQ + "' href='javascript:jf_OpenAKT116C2(\"" + HtmlEncode(DOC_NO) + "\")' tabindex ='-1'><font color='red' size='2'>錯誤</font></a>";
            break;
        case "1"://有錯誤且有警告
            //InsertContentErrType = "<a id= 'img_"+SEQ+"' href='javascript:jf_OpenAKT116C2(\""+DOC_NO+"\")' tabindex ='-1'>"+
            //	"<IMG SRC ='./Template/images/DOC_E.gif' ALT='公文轉檔時有錯誤且有異常' style='border-style: none'></a> ";
            //1071017 Zen 1070678 弱掃Client Potential XSS修正
            //InsertContentErrType = "<a id= 'img_" + SEQ + "' href='javascript:jf_OpenAKT116C2(\"" + DOC_NO + "\")' tabindex ='-1'><font color='red' size='2'>錯誤</font></a>";
            InsertContentErrType = "<a id= 'img_" + SEQ + "' href='javascript:jf_OpenAKT116C2(\"" + HtmlEncode(DOC_NO) + "\")' tabindex ='-1'><font color='red' size='2'>錯誤</font></a>";
            break;
        default:
            //InsertContentErrType = "<IMG SRC ='./images/DOC_E00.gif' style='border-style: none' >";
            //InsertContentErrType = "<IMG SRC ='./Template/images/DOC_O.gif' ALT='正常' style='border-style: none'></a> ";
            InsertContentErrType = "<font color='green' size='2'>正常</font>";
            break;
    }
    InsertContent = InsertContentBegin + InsertContentErrType + InsertContentEnd;
    return InsertContent;
}

function SelectRow()
{
    IsClsChecked = false;
    IsCanUseInitCase = false;

    var xObjectName = document.activeElement.id;
    var rowNO = xObjectName.substring(2, xObjectName.length);
    var Record = document.all["Record"].options[rowNO - 1].text;	//David	95.05.10
    var DATA = new Array(Record.length);		//David
    DATA = Record.split(",");
    document.all["tbDocNo"].value = DATA[1];
    //David	95.05.10	
    if (DATA[10] == null)
        document.all["txCloseDate"].value = "";
    else
        document.all["txCloseDate"].value = DATA[10];

    if (DATA[9] == null)
        document.all["txExtfileDate"].value = "";
    else
        document.all["txExtfileDate"].value = DATA[9];

    if (DATA[8] == "Y")
    {
        document.all["cbDelayAttFlag"].checked = true;
    }
    if (DATA[8] == "N")
    {
        document.all["cbDelayAttFlag"].checked = false;
    }
    if (DATA[2] == "20")
    {
        document.all["rbAcceptDoc"].checked = true;
        //document.all["tbAcceptDoc"].value = DATA[3];
        //document.all["lbAcceptDoc"].innerText = DATA[4];
        document.all["dlAcceptDoc"].options.selectedIndex = parseInt(DATA[3], 10);		//David 95.05.11
        //document.all["dlRejectDoc"].options.selectedIndex=0;
    }
    else if (DATA[2] == "15")
    {
        document.all["rbRejectDoc"].checked = true;
        //document.all["tbRejectDoc"].value = DATA[3];
        //document.all["lbRejectDoc"].innerText = DATA[4];
        //document.all["dlRejectDoc"].options.selectedIndex=parseInt(DATA[6],10);
        //document.all["dlAcceptDoc"].options.selectedIndex=0;
        document.all["dlAcceptDoc"].options.selectedIndex = parseInt(DATA[3], 10);		//David	95.05.11
    }
    document.all["tbTxDesc"].value = DATA[5];
    /*************************************************************************/
    //1060301	Cloud 升級二代，此段程式碼已無用，mark-S
    //document.all["txSubject"].value=AKT116_DocList.Info[rowNO-1].Subject;
    //1060301	Cloud 升級二代，此段程式碼已無用，mark-E
    //document.all["txDept"].value=AKT116_DocList.Info[rowNO-1].Dept_No;
    //document.all["txDept"].onblur();
    //document.all["txEmp"].value=AKT116_DocList.Info[rowNO-1].Username;
    //document.all["txEmp"].onblur();
    //1060301	Cloud 升級二代，此段程式碼已無用，mark
    /*if (AKT116_DocList.Info[rowNO-1].Sec_No!="")
	{
		for(var i=0;i<document.all["dlSecNo"].length;i++)
		{
			if (document.all["dlSecNo"].options[i].value==AKT116_DocList.Info[rowNO-1].Sec_No)
			{
				document.all["dlSecNo"].selectedIndex=i;
				break;
			}
		}
	}
	document.all["txCnt"].value=AKT116_DocList.Info[rowNO-1].File_Cnt;
	if (AKT116_DocList.Info[rowNO-1].File_Unit!="")
	{
		for(var i=0;i<document.all["dlUnit"].length;i++)
		{
			if (document.all["dlUnit"].options[i].value==AKT116_DocList.Info[rowNO-1].File_Unit)
			{
				document.all["dlUnit"].selectedIndex=i;
				break;
			}
		}
	}*/
    document.all["txClsNo"].value = AKT116_DocList.Info[rowNO - 1].Cls_No;
    /*
	document.all["txKeepYear"].value=AKT116_DocList.Info[rowNO-1].Keep_Year;
	if (AKT116_DocList.Info[rowNO-1].Keep_Year!="")
	{
		for(var i=0;i<document.all["dlKeepYear"].length;i++)
		{
			if (document.all["dlKeepYear"].options[i].value==AKT116_DocList.Info[rowNO-1].Keep_Year)
			{
				document.all["dlKeepYear"].selectedIndex=i;
				break;
			}
		}
	}
	*/
    document.all["txComNo"].value = AKT116_DocList.Info[rowNO - 1].Com_No;
    document.all["txCaseNo"].value = AKT116_DocList.Info[rowNO - 1].Case_No;
    document.all["txCaseName"].value = AKT116_DocList.Info[rowNO - 1].Case_Name;
    //1060301	Cloud 升級二代，此段程式碼已無用
    //document.all["txFileYear"].value=AKT116_DocList.Info[rowNO-1].File_Year;

    if (AKT116_DocList.Info[rowNO - 1].Com_No != "")
    {
        if (AKT116_DocList.Info[rowNO - 1].Com_No == AKT116_DocList.Info[rowNO - 1].Doc_No)
            ComType = 1;
        else
            ComType = 2;
    }
    else
        ComType = 0;
    //1060223 Cloud 1050087 升級二代
    //document.all["txErrMsg"].innerText=AKT116_DocList.Info[rowNO-1].Err_Msg;
    //document.all["txErrMsg"].textContent = AKT116_DocList.Info[rowNO - 1].Err_Msg;
    document.all.txDocFileType.value = AKT116_DocList.Info[rowNO - 1].DocFile_Type;

    //1040707   Kenny  [1040504]   增加寫入主旨欄位
    //1060223 Cloud 1050087 升級二代
    //document.all["txDocSubject"].innerText = AKT116_DocList.Info[rowNO - 1].Subject;
    //1060824 CLOUD 修正使用錯誤屬性
    //document.all["txDocSubject"].textContent = AKT116_DocList.Info[rowNO - 1].Subject;
    document.all["txDocSubject"].value = AKT116_DocList.Info[rowNO - 1].Subject;
    //1040714   Kenny  [1040504]   帶入主旨欄位後Disable
    document.all["txDocSubject"].disabled = true;

    //附件
    //1060301	Cloud 升級二代，此段程式碼已無用
    /*for(var i=2;i<AKT116_DocList.Att[rowNO-1].Doc_No.length+2;i++)
	{
		//附件說明
		if(AKT116_DocList.Att[rowNO-1].Att_Scan[i-2] == "1")
			document.all["dg1__ctl"+i+"_txDesc"].checked=true;
		else
		

		//附件說明
		document.all["dg1__ctl"+i+"_txDesc"].value=AKT116_DocList.Att[rowNO-1].File_Desc[i-2];
		//媒體型式
		for(var j=0;j<document.all["dg1__ctl"+i+"_dlMedia"].length;j++)
		{
			if (document.all["dg1__ctl"+i+"_dlMedia"].options[j].value==AKT116_DocList.Att[rowNO-1].Media_Type[i-2])
			{
				document.all["dg1__ctl"+i+"_dlMedia"].selectedIndex=j;
				break;
			}
		}
		//數量
		document.all["dg1__ctl"+i+"_txCnt1"].value=AKT116_DocList.Att[rowNO-1].File_Cnt[i-2];
		//單位
		for(var j=0;j<document.all["dg1__ctl"+i+"_dlUnit1"].length;j++)
		{
			if (document.all["dg1__ctl"+i+"_dlUnit1"].options[j].value==AKT116_DocList.Att[rowNO-1].File_Unit[i-2])
			{
				document.all["dg1__ctl"+i+"_dlUnit1"].selectedIndex=j;
				break;
			}
		}
		//附件序
		//document.all["dg1__ctl"+i+"_txRemark"].value=AKT116_DocList.Att[rowNO-1].Remark[i-2];
		//儲位
		//document.all["dg1__ctl"+i+"_txPlace"].value=AKT116_DocList.Att[rowNO-1].Att_Location[i-2];
	}*/
    /*************************************************************************/
    document.all["btConfirm"].disabled = false;
    //document.all["btCls"].disabled=false;
    //[950754]Add by Cola 附件歸檔日預設為反白
    if (document.all["cbDelayAttFlag"].checked)
    {
        document.all["txExtfileDate"].style.backgroundColor = "FFFFFF";
        document.all["txExtfileDate"].disabled = false;
        document.all["txExtfileDate"].readOnly = false;
    }
    else
    {
        document.all["txExtfileDate"].style.backgroundColor = "LightGrey";
        document.all["txExtfileDate"].readOnly = true;
        document.all["txExtfileDate"].disabled = true;
        document.all["txExtfileDate"].value = "";
    }

    //0990630	Leslie[0990357]	取得公文之簽核類型，以決定退文至"歸檔單位"是否Disable
    //1040327	Cloud	[1040185] 修改退文時為退回總發，且線上公文也可退回
    /*if(document.all["Label13"].className.toLowerCase() != "hide")	//系統參數RTN_RCVDEPT設為"3,4,5"時，才作下列判斷
	{
		var strSignType = AKT116.GetDocSignType(document.all["H_ORGNO"].value,DATA[1]).value;
		if(strSignType == "E")
		{
			document.all["rbType2"].disabled = true;
			document.all["rbType1"].checked = true;
		}
		else
		{
			document.all["rbType2"].disabled = false;
			if(DATA[2]=="15")
			{
				if(DATA[11] == "1")
					document.all["rbType1"].checked = true;
				else		
					document.all["rbType2"].checked = true;				
			}
			else	//0990707	Leslie	依系統參數設定預設選項
			{
				document.all[strDefaultType].checked = true;
			}
		}
	}*/
    if (AKT116_DocList.Info[rowNO - 1].CLOSE_TYPE == "3")
    {
        document.all["rbType2"].disabled = true;
        document.all["rbType1"].checked = true;
    }
    else
    {
        document.all["rbType2"].disabled = false;
        if (DATA[2] == "15")
        {
            if (DATA[11] == "1")
                document.all["rbType1"].checked = true;
            else
                document.all["rbType2"].checked = true;
        }
        else	//0990707	Leslie	依系統參數設定預設選項
        {
			//* 2021.01.15	Cloud	1090997	修正新增單筆公文時退文對象一律使用系統參數的bug
            //document.all[strDefaultType].checked = true;
        }
    }
	//1131211	Cloud	1130983 設定全域變數
    uCurrDocAttExtFileDate = AKT116_DocList.Info[rowNO-1].ATT_EXTFILE_DATE;	//把目前公文的抽存附件預計歸檔日期先存起來
}


//1060823	Leslie	IE效能調校
//function ClearCheck()
function ClearCheck(cRow)
{
	if(cRow){
        var rowNO = cRow;
        var oldDATA = document.all["Record"].options[rowNO - 1].text;
        var newDATA = oldDATA.substring(0, oldDATA.length - 1);
        newDATA += "0";
        document.all["Record"].options[rowNO - 1].text = newDATA;
        document.all["Record"].options[rowNO - 1].value = newDATA;
    }
	else{
        var xObject = document.activeElement;
        var rowNO = xObject.id.substring(7, xObject.id.length);
        var oldDATA = document.all["Record"].options[rowNO - 1].text;
		var strDocNo = oldDATA.split(',')[1];
        var newDATA = oldDATA.substring(0, oldDATA.length - 1);
		//1081119 Cloud [1080980] 彙併辦子文不可單獨退文-增加處理子文
		var childType = "";
        if (xObject.checked)
		{
            newDATA += "1";
			//1081119 Cloud [1080980] 彙併辦子文不可單獨退文-增加處理子文 
			childType = "1";
		}
        else
		{
            newDATA += "0";
			//1081119 Cloud [1080980] 彙併辦子文不可單獨退文-增加處理子文 
			childType = "0";
		}
        document.all["Record"].options[rowNO - 1].text = newDATA;
        document.all["Record"].options[rowNO - 1].value = newDATA;
		//1081119 Cloud [1080980] 彙併辦子文不可單獨退文-增加處理子文
		var objChildList = $("#WorkArea").find("input[ClearComNo^='" + strDocNo + "']");
		if (childType=="1")
			objChildList.prop("checked", true);
		else
			objChildList.prop("checked", false);
		
		for (var iChild = 0; iChild < objChildList.length; iChild++)
		{
			ClearCheckChild(objChildList.attr("childSeqNo"), childType);
		}
    }
}
function ClearCheckChild(cRow, argType) {
	var rowNO = cRow;
	var oldDATA = document.all["Record"].options[rowNO - 1].text;
	var strDocNo = oldDATA.split(',')[1];
	var newDATA = oldDATA.substring(0, oldDATA.length - 1);
	newDATA += argType;
	document.all["Record"].options[rowNO - 1].text = newDATA;
	document.all["Record"].options[rowNO - 1].value = newDATA;
}
//1091120 Cloud 1090828 增加判斷是否為彙併辦子文
var bWorkSubDoc = false;
function Check_DOCNO_Exist(DOC_NO)
{
    for (i = 0; i < (RecordNO - 1) ; i++)
    {
        var DATA = new Array(7);
        var Record;
        Record = document.all["Record"].options[i].text;
        DATA = Record.split(",");
        if (DOC_NO == DATA[1])
        {
			//1091120 Cloud 1090828 增加判斷是否為彙併辦子文-S
			var Uiseq = i+1;
			if($("#WorkArea").find("input[id='cbChange"+Uiseq+"']").attr("comno")!=undefined && !CallByGetComNO)
			{
				alert('不可單獨異動彙併辦子文，請輸入母文文號或點擊母文進行操作。');
				bWorkSubDoc = true;
				document.all["tbDocNo"].value="";
			}
			//1091120 Cloud 1090828 增加判斷是否為彙併辦子文-E
            return i;
            break;
        }
    }
    return -1;
}
function OnDocument()
{
    if (event.keyCode == 13)
    {
        var xObject = event.srcElement;
        if (xObject.type == "submit" || xObject.type == "image")
        {
            //xObject.onclick();
            document.all["AKT116"].onsubmit();
        }
        else
            jf_CancelEnterKey();
    }
}


function AutoTab(previous_obj, obj, next_obj)
{
    var KeyCode = event.keyCode;
    var MaxLength = obj.maxLength;
    var CurrentLength = obj.value.length;
    switch (KeyCode)
    {
        case 13:
            if (next_obj != null)
                next_obj.focus();
            break;
        case 9:
            break;
        default:
            if (CurrentLength == MaxLength && next_obj != null)
                next_obj.focus();
            break;
    }
    event.cancelBubble = true;
}

//避免使用者輸入 "," 與 ";"  <---分隔資料用字元
function AvoidChar()
{

    //44 -> "," 59 -> ";"
    if ((event.keyCode == 44) || (event.keyCode == 59))
    {
        event.returnValue = false;
    }
    ///////////////////MOB 修改 20070502 當系統設定AKT116_DOC_NO_ALLOW_SPACE為"N"，則擋掉空白
    if (document.all.hAllowSpace.value == "N" && event.keyCode == 32)
    {
        event.returnValue = false;
    }
    ///////////////////
}

/********************************* 子視窗 ********************************************/
function OpenWindow(argUrl)
{
    //var gChidkWinStyle = "left=0,top=0,height="+(screen.height-50)+",width="+(screen.width-10)+",titlebar=yes,status=yes,resizeable";//toolbar=no,resizeable=yes";//,fullscreen=no";
    //950898AKS116視窗大小調整  by whay 0951004
    //* 2017.07.24	Cloud	1060724	開啟子視窗提供SCROLLBAR
    //var gChidkWinStyle = "left=10, top=10, height="+(screen.height-120)+",width="+(screen.width-20)+", resizable=yes, status=yes";
    var gChidkWinStyle = "left=10, top=10, height=" + (screen.height - 120) + ",width=" + (screen.width - 20) + ", resizable=yes, status=yes,scrollbars=yes";
    uChildWinHandle = open(argUrl, null, gChidkWinStyle);
    uChildWinHandle.strWindowName = "AKT116";
}

function ClickConfirm(argDocNo)
{
    var DOCNO_Exist_Row_NO;
    var strDocNo = argDocNo;// document.all["tbDocNo"].value;
    //1060223 Cloud 1050087 升級二代
    //document.all["ValidationSummary1"].innerText = "";
    //document.all["Validator"].innerText = "";
    //document.all["lbMsg"].innerText = "";
    document.all["ValidationSummary1"].textContent = "";
    document.all["Validator"].textContent = "";
    document.all["lbMsg"].textContent = "";

    document.all["tbDocNo"].value = "";

    if (document.all["rbRejectDoc"].checked && document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value == "")
    {
        var ErrMsg = "下列欄位不可空白：\n";
        if (document.all["dlAcceptDoc"].options[document.all["dlAcceptDoc"].selectedIndex].value == "")
            ErrMsg += "註記\n";
        jf_ShowMeg(ErrMsg, ErrMsgTitle);
        return "1";
    }
    //[950754]Add by Cola 若有勾選附件抽存但附件應歸日期確為空，則跳出訊息
    if (document.all["cbDelayAttFlag"].checked && document.all["txExtfileDate"].value == "")
    {
        var ErrMsg = "在有勾選附件抽存情況下，附件預計歸檔日期不可為空";
        jf_ShowMeg(ErrMsg, ErrMsgTitle);
        return "1";
    }
    //Cola -- end --

    if (RecordNO > 1)
        DOCNO_Exist_Row_NO = Check_DOCNO_Exist(strDocNo);
    else
        DOCNO_Exist_Row_NO = -1;
	//1091120 Cloud 1090828 增加判斷是否為彙併辦子文
	if(bWorkSubDoc)
	{
		//bWorkSubDoc = false;
		return;
	}

    //0990630	Leslie[0990357]	取得公文之簽核類型，以決定退文至"歸檔單位"是否Disable
    if (document.all["Label13"].className.toLowerCase() != "hide")	//系統參數RTN_RCVDEPT設為"3,4,5"時，才作下列判斷
    {
        //1040327	Cloud	[1040185]	修改線上公文也可退回
        /*var strSignType = AKT116.GetDocSignType(document.all["H_ORGNO"].value,strDocNo).value;
		if(strSignType == "E")
			document.all["rbType1"].checked = true;
		else*/
		//* 2021.01.15	Cloud	1090997	修正新增單筆公文時退文對象一律使用系統參數的bug
        //document.all[strDefaultType].checked = true;		//0990707	Leslie	依系統參數設定預設選項
		
    }

    if (DOCNO_Exist_Row_NO == -1)
    {
        //1000713 Davy [1000129] Insert_Table()新增參數，判斷是否顯示併同歸檔提示訊息
        //1060823	Leslie	二代的IE效能調校，增加傳入參數，大量新增時改為最後一次塞入DOM
        //Insert_Table(strDocNo , false)
		//1100623	Joe		1100789		弱掃修正Client Potential XSS
        // Insert_Table(strDocNo, false, false);
        Insert_Table(HtmlEncode(strDocNo), false, false);
        RecordNO++;

    }
    else
    {
        UpdateFlag = 1;
        Update_Table(strDocNo, DOCNO_Exist_Row_NO + 1);
		//1091123 Cloud 1090828 文號存在時，檢核是否有子文需一併更新
		SetSubDoc(strDocNo);
    }
    //if(event.type.substr(0,3)!="key")					
    //	document.all["tbDocNo"].focus();

    if (RecordNO > 1)
        document.all["TableTitle"].style.visibility = "visible";

    document.all["btSelectAll"].style.visibility = "visible";
    document.all["btClearSelect"].style.visibility = "visible";
    document.all["btReverse"].style.visibility = "visible";
}
//1091123 Cloud 1090828 文號存在時，檢核是否有子文需一併更-S
function SetSubDoc(strDocNo)
{
	var SubDocCount = $("#WorkArea").find("input[ComNo='"+strDocNo+"']").length;
	var Seq = "";
	for(var iSubDoc=0;iSubDoc<SubDocCount;iSubDoc++)
	{
	    Seq = $("#WorkArea").find("input[ComNo='" + strDocNo + "']")[iSubDoc].id.replace("cbChange", "");
	    //1100917   Cloud   1100991 弱掃修正Client Potential XSS
	    //Update_Table($("#WorkArea").find("div[id='NO"+Seq+"']").text(), Seq);
	    Update_Table(HtmlEncode($("#WorkArea").find("div[id='NO"+Seq+"']").text()), Seq);
	}
	
}
//1091123 Cloud 1090828 文號存在時，檢核是否有子文需一併更-E

function CallBack(argCallerId)
{
    var oldlength = document.all["lbReturnValue"].length;

    //1000713 Davy [1000129] 記錄有紙本來文的文號
    var RcvfileList = "";

    if (argCallerId == "AKS116")
    {
        if (document.all["lbReturnValue"].length > 0)
        {

            //1060823	Leslie	增加滑鼠外觀調整
            $('html').css('cursor', 'wait');

            /*if(oldlength ==1)
			{
				document.all["tbDocNo"].value = document.all["lbReturnValue"].options[0].value;
				document.all["tbDocNo"].focus();
				ClickConfirm(document.all["tbDocNo"].value);
				
			}
			else
			{*/
            //預設全部設為已點收
            for (idx = 0; idx < oldlength; idx++)
            {
                //1000713 Davy [1000129] 取得是否有紙本來文
                var IsRcvfile = false;
				//1090310		Kevin_C	1090087	系統參數COM_ACCEPT增加支援僅帶回併件公文功能
                //if (document.all["tbCom_Acc"].value != "" && document.all["tbCom_Acc"].value == "1")
				// 2020.11.23	Cloud	1090828 彙並辦公文子文應與母文一起，不應依系統參數[COM_ACCEPT]設定而可分開
				var str = AK.AKT116.GetDocState(document.all["lbReturnValue"][idx].value, document.all["H_ORGNO"].value).value;
				gCombineType = str.split('|')[1];
				//if (document.all["tbCom_Acc"].value != "" && document.all["tbCom_Acc"].value == "1" || document.all["tbCom_Acc"].value == "2")
					if (document.all["tbCom_Acc"].value != "" && document.all["tbCom_Acc"].value == "1" || document.all["tbCom_Acc"].value == "2" || gCombineType == "1" || gCombineType == "2")
                {
                    if (document.all["lbReturnValue"].options[idx].text != "")
                    {
                        //[001478]Modify by Cola 不論母子文皆設定IsNoOk為true，同時不將值塞入tbComNo，因爾後在塞入下方table時已會進行判斷是否重覆 -- start --

                        //if (document.all["lbReturnValue"].options[idx].text==document.all["lbReturnValue"].options[idx].value)//母文
                        //{
                        //1000713 Davy [1000129] 取得是否有紙本來文
                        //1070709 Zen 1070678 弱掃XSS修正
                        //IsRcvfile = ProcessRecord(document.all["lbReturnValue"].options[idx].value);
                        IsRcvfile = HtmlEncode(ProcessRecord(document.all["lbReturnValue"].options[idx].value));
                        //由公文文號(母文)，帶回其子文(不含自己)
                        //1060224 Cloud	1050087 升級二代-不知為何要先放進array，調整直接放入ws使用的array
                        /*var KeyValue = new Array(1);
                        KeyValue[0] = document.all["lbReturnValue"].options[idx].value;
                        var KeyValue1 = new Array(1);
                        KeyValue1[0] = document.all["tbComNo"].value;*/
                        var param = new Array(2);
                        /*param[0] = KeyValue;
                        param[1] = KeyValue1;*/
                        param[0] = document.all["lbReturnValue"].options[idx].value;
                        param[1] = document.all["tbComNo"].value;
                        //[001478]Cola 改為呼叫GetAllComNo
                        //RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetComNo",false,param);
                        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetAllComNo", false, param);
                        iCallID_ComNo = RtnObj.id;
                        OnWSResult(RtnObj);
                        //}
                        //else//子文
                        //{
                        //if (document.all["tbComNo"].value!="")
                        //	document.all["tbComNo"].value+=",";
                        //document.all["tbComNo"].value+="'"+document.all["lbReturnValue"].options[idx].value+"'";
                        //	ProcessRecord(document.all["lbReturnValue"].options[idx].value);
                        //}				
                        //Cola -- end --
						// 2020.11.23	Cloud	1090828 彙並辦公文子文應與母文一起，不應依系統參數[COM_ACCEPT]設定而可分開
						gCombineType = "";
                    }
                    else//無併案狀態
                    {
                        //1000713 Davy [1000129] 取得是否有紙本來文
                        //1070709 Zen 1070678 弱掃XSS修正
                        //IsRcvfile = ProcessRecord(document.all["lbReturnValue"].options[idx].value);
                        IsRcvfile = HtmlEncode(ProcessRecord(document.all["lbReturnValue"].options[idx].value));
                    }
                }
                else
                    //1000713 Davy [1000129] 取得是否有紙本來文
                    //1070709 Zen 1070678 弱掃XSS修正
                    //IsRcvfile = ProcessRecord(document.all["lbReturnValue"].options[idx].value);
                    IsRcvfile = HtmlEncode(ProcessRecord(document.all["lbReturnValue"].options[idx].value));

                //1000713 Davy [1000129] 記錄有紙本來文的文號
                // 1071025 Zen 1070678 修正弱掃Client Potential XSS衍生錯誤
                //if (IsRcvfile)
                if (IsRcvfile == 'true')
                    RcvfileList += document.all["lbReturnValue"].options[idx].value + ";";

            }

            //1060823	Leslie	二代的IE效能調校，增加傳入參數，大量新增時改為最後一次塞入DOM
			if(gInsertContent != ""){
                document.all["DATA1"].innerHTML += gInsertContent;
                gInsertContent = "";
                $('#divSignArea').animate({ scrollTop: $('#DATA1').height() }, 50);
            }

            //1060823	Leslie	增加滑鼠外觀調整
            $('html').css('cursor', '')

            //rowscount=oldlength;
            document.all["TableTitle"].style.visibility = "visible";
            //1060223 Cloud 1050087 升級二代
            //document.all["Validator"].innerText = "";
            //document.all["lbMsg"].innerText = "";
            document.all["Validator"].textContent = "";
            document.all["lbMsg"].textContent = "";
            document.all["btSelectAll"].style.visibility = "visible";
            document.all["btClearSelect"].style.visibility = "visible";
            document.all["btReverse"].style.visibility = "visible";

            //不論點收或退文執行後皆跳回點收避免誤退文 #2007.02.28 Andy
            document.all["rbAcceptDoc"].checked = true;
            document.all["dlAcceptDoc"].options.selectedIndex = 0;
            document.all["tbTxDesc"].value = "";

            //}

            for (i = 0; i < oldlength; i++)
            {
                document.all["lbReturnValue"].remove(0);
            }

            //1000713 Davy [1000129] 顯示有紙本來文文號
            if (RcvfileList != "")
                alert("下列公文有紙本來文需要歸檔：\n" + RcvfileList.replace(/;/g, "\n"));
            //* 2013.08.05	Cloud	--		因開啟查詢待點收子視窗時會將查詢過的公文以網址參數傳入子視窗，但會因過常被截斷導致出現異常，修改傳入查詢過公文方式
            //* 1070907      Cloud   1070678 修改不使用client端存取cookie
            //jf_SaveCookie("AKT116DocList", "");
            AK.AKT116.SaveDocList("", jf_GetSessionID());
        }
    } // end if (argCallerId=="AKS116")


    if (argCallerId == "AKM330")
    {
        var strDocNo, strClsNo, strCaseNo, strCaseName, strComStatus, strClsKey;
        var intDOCNO_Exist_Row_NO;

        if (document.all["lbReturnValue"].length > 0)
        {
            //1070709 Zen 1070678 弱掃XSS修正
            //strDocNo = document.all["lbReturnValue"].options[0].value;
            strDocNo = HtmlEncode(document.all["lbReturnValue"].options[0].value);
            strClsNo = document.all["lbReturnValue"].options[1].value;
            strCaseNo = document.all["lbReturnValue"].options[2].value;
            strCaseName = document.all["lbReturnValue"].options[3].value;
            strComStatus = document.all["lbReturnValue"].options[4].value;
            strClsKey = document.all["lbReturnValue"].options[5].value;

            if (RecordNO > 1) intDOCNO_Exist_Row_NO = Check_DOCNO_Exist(strDocNo);//補註記2帶不會走到此處
			
            if (intDOCNO_Exist_Row_NO >= 0)
            {
				//1091120 Cloud 1090828 增加判斷是否為彙併辦子文
				if(bWorkSubDoc)
				{
					//bWorkSubDoc = false;
					return;
				}
                //[MAC610002]Modify By Cola 修正將值傳往的地方，update_table時取到的值才是正確的 -- start --
                //AKT116_DocList.Info[intDOCNO_Exist_Row_NO].Cls_No     = strClsNo;
                //AKT116_DocList.Info[intDOCNO_Exist_Row_NO].Case_No    = strCaseNo;
                //AKT116_DocList.Info[intDOCNO_Exist_Row_NO].Case_Name  = strCaseName;
                document.all["txClsNo"].value = strClsNo;
                document.all["txCaseNo"].value = strCaseNo;
                document.all["txCaseName"].value = strCaseName;
                //Cola -- end --
                AKT116_DocList.Info[intDOCNO_Exist_Row_NO].COM_STATUS = strComStatus;
                AKT116_DocList.Info[intDOCNO_Exist_Row_NO].Cls_Key = strClsKey;

                AKT116_DocList.Info[intDOCNO_Exist_Row_NO].Err_Msg = "";
                Update_Table(strDocNo, intDOCNO_Exist_Row_NO + 1);
            }
        } // end if(document.all["lbReturnValue"].length > 0)

        for (i = 0; i < oldlength; i++)
        {
            document.all["lbReturnValue"].remove(0);
        }
    }


}

/************************************ Web Sevice ****************************************************/


// Call WS : ChkPlanNo 
var iCallID_ChkCodeNo = null;
function CheckCodeNo(argColName)
{
    var strType = "";
    var strTxNo = "";
    if (argColName == "tbAcceptDoc" && document.all["tbAcceptDoc"].value != "")
    {
        document.all["tbAcceptDoc"].value = jf_PADL(document.all["tbAcceptDoc"].value, 2, "0");
        document.all["tbRejectDoc"].value = "";
        document.all["rbAcceptDoc"].checked = true;
        strType = "20";	//點收
        strTxNo = document.all["tbAcceptDoc"].value;
    }
    else if (argColName == "tbRejectDoc" && document.all["tbRejectDoc"].value != "")
    {
        document.all["tbRejectDoc"].value = jf_PADL(document.all["tbRejectDoc"].value, 2, "0");
        document.all["tbAcceptDoc"].value = "";
        document.all["rbRejectDoc"].checked = true;
        strType = "15";	//退文
        strTxNo = document.all["tbRejectDoc"].value;
    }
    else return;

    service.useService("lib/AK_LIB.asmx?WSDL", "SR1");
    //iCallID_ChkCodeNo  = service.SR1.callService("ChkCodeNo", document.all["SessionID"].value, strType, strTxNo);
    var param = new Array(2);
    param[0] = strType;
    param[1] = strTxNo;
    callObj = jf_CallWS("lib/AK_LIB.asmx", "ChkCodeNo", false, param);
    iCallID_ChkCodeNo = callObj.id;
    OnWSResult(callObj);
}

// Call WS : ChkDocState
var iCallID_ChkDocState = null;
var iCallID_ComNo = null;
var iCallID_Dept = null;
var iCallID_Emp = null;
var iCallID_Save = null;
var iCallID_CLS = null;
var iCallID_COM = null;
var iCallID_CASE = null;
var iCallID_ComNo1 = null;
var IsNoOk = false;
// 2019.11.19	Cloud	1080980 修改AJAX 增加取得公文併案狀態，彙並辦公文子文應與母文一起，不應依系統參數[COM_ACCEPT]設定而可分開
var gCombineType = "";
function ChkDocState()
{
    //0990630	Leslie[0990357]	復原退文至"歸檔單位"選項為Enable
    //1040327	Cloud	[1040185]	修改線上簽核公文之退文選項，使其可退回"歸檔單位"
    //if(document.all["Label13"].className.toLowerCase() != "hide")	//系統參數RTN_RCVDEPT設為"3,4,5"時，才需進行設定
    //document.all["rbType2"].disabled = false;

    CheckFlag = true;
    var xObjectName = document.activeElement.id;
    if ((xObjectName == "btExit") || (xObjectName == "btExitImg") || (xObjectName == "btCancel") || (xObjectName == "btCancelImg") || (xObjectName == "btClean") || (xObjectName == "btCleanImg") || (xObjectName == "btSearch") || (xObjectName == "btSearchImg"))
        return;
    if (document.all["tbDocNo"].value == "")
        return;

    //[0970055]Add by Cola 以Ajax 抓取這份公文對應之DOC_D.DOC_NO之後將畫面上資料設定為讀取到之公文文號 -- start --
    //1070830 Zen 1070678 弱掃Ajax修正
    //var str = AKT116.GetDocD(document.all["tbDocNo"].value, document.all["H_ORGNO"].value).value;
    var str = AK.AKT116.GetDocD(document.all["tbDocNo"].value, document.all["H_ORGNO"].value).value;
    document.all["tbDocNo"].value = str;
    //Cola -- end -- 		

    //[001694]Cola 以Ajax 判斷此份公文是否存在，或其狀態是否不可點收，並回傳公文狀態 -- start --
    //1070830 Zen 1070678 弱掃Ajax修正
    //var str = AKT116.GetDocState(document.all["tbDocNo"].value, document.all["H_ORGNO"].value).value;
    var str = AK.AKT116.GetDocState(document.all["tbDocNo"].value, document.all["H_ORGNO"].value).value;
	// 2019.11.19	Cloud	1080980 修改AJAX 增加取得公文併案狀態，彙並辦公文子文應與母文一起，不應依系統參數[COM_ACCEPT]設定而可分開
	gCombineType = str.split('|')[1];
	str = str.split('|')[0];
    if (str != "")
    {
        alert(str);
        document.all["tbDocNo"].value = "";
        //1060817	Kevin_C	1060719	focus轉為JQuery形式
        //document.all["tbDocNo"].focus();
        $('#tbDocNo').focus();
        return;
    }
    //Cola -- end -- 

    service.useService("lib/AK_LIB.asmx?WSDL", "SR1");
    //iCallID_ChkDocState  = service.SR1.callService("ChkDocState", document.all["SessionID"].value, document.all["tbDocNo"].value);

    callObj = jf_CallWS("lib/AK_LIB.asmx", "ChkDocState", false, document.all["tbDocNo"].value);
    iCallID_ChkDocState = callObj.id;
    document.all.txCloseDate.value = callObj.value.CloseDate;		//David	95.05.10
    OnWSResult(callObj);
    //1091123 Cloud 1090828 補強不可單獨異動子文
	if(bWorkSubDoc)
	{
		bWorkSubDoc = false;
		return;
	}
    if (IsNoOk)//由公文文號(母文)，帶回其子文(不含自己)
    {
        IsNoOk = false;
        //1060224 Cloud	1050087 升級二代-不知為何要先放進array，調整直接放入ws使用的array
        /*var KeyValue = new Array(1);
		KeyValue[0] = strDocNo;
		var KeyValue1 = new Array(1);
		KeyValue1[0] = document.all["tbComNo"].value;*/
        var param = new Array(2);
        /*param[0] = KeyValue;
		param[1] = KeyValue1;*/
        param[0] = strDocNo;
        param[1] = document.all["tbComNo"].value;;
        //[001478]Cola 改為呼叫GetAllComNo 取出所有相關文號
        //RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetComNo",false,param);
        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetAllComNo", false, param);
        iCallID_ComNo = RtnObj.id;
        OnWSResult(RtnObj);
    }
}

function GetDeptNo(argDocNo)
{
    argsField = new Array(5);
    var TableName = "DOC_MAIN";
    //1011219	Jagle	[1011204]	增加傳入機關代碼做為條件
    /*var WhereField	= new Array(1);
	var WhereCon	= new Array(1);*/
    var WhereField = new Array(2);
    var WhereCon = new Array(2);
    //var RtnField	= new Array(2);
    //95.10.23 David 修改帶出單位時一併帶出歸檔日期
    var RtnField = new Array(4);

    var Order = new Array(1);
    //95.10.23 David 修改帶出單位時一併帶出歸檔日期
    //var arrRtnValue = new Array(2);
    var arrRtnValue = new Array(4);

    arrRtnValue[0] = "";
    arrRtnValue[1] = "";
    WhereField[0] = "Doc_No";
    WhereCon[0] = argDocNo;
    //1011219	Jagle	[1011204]	增加傳入機關代碼做為條件
    WhereField[1] = "SOURCE_ORGNO";
    WhereCon[1] = document.all["H_ORGNO"].value;
    RtnField[0] = "DEPT_NO";
    RtnField[1] = "DEPT_NAME";

    //95.10.23 David 修改帶出單位時一併帶出歸檔日期、預計歸檔日期
    RtnField[2] = "CLOSE_DATE";
    RtnField[3] = "EXTFILE_DATE";

    Order[0] = "";

    argsField[0] = TableName;
    argsField[1] = WhereField;
    argsField[2] = WhereCon;
    argsField[3] = RtnField;
    argsField[4] = Order;
    RtnObj = jf_CallWS("Lib/AK_LIB.asmx", "GetFieldValue", false, argsField);

    if (jf_IsWebServiceSuccess(RtnObj))
    {
        //1062023 Cloud	1050087 升級二代
        /*arrRtnValue[0] = RtnObj.value.RtnField0;
		arrRtnValue[1] = RtnObj.value.RtnField1;
		//95.10.23 David 修改帶出單位時一併帶出歸檔日期	
		arrRtnValue[2] = RtnObj.value.RtnField2;
		arrRtnValue[3] = RtnObj.value.RtnField3;*/
        arrRtnValue[0] = RtnObj.value.RtnField0[0];
        arrRtnValue[1] = RtnObj.value.RtnField1[0];
        arrRtnValue[2] = RtnObj.value.RtnField2[0];
        arrRtnValue[3] = RtnObj.value.RtnField3[0];
        return arrRtnValue;
    }
}

var strDocNo = "";
function OnWSResult(argResult)
{
    if (argResult.id == iCallID_ChkCodeNo)	//原因代碼
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (document.all["rbAcceptDoc"].checked)
            {
                //1060223 Cloud 1050087 升級二代
                /*document.all["lbAcceptDoc"].innerText = argResult.value.CodeDesc;	
				document.all["lbRejectDoc"].innerText = "";	*/
                document.all["lbAcceptDoc"].textContent = argResult.value.CodeDesc;
                document.all["lbRejectDoc"].textContent = "";
            }
            else if (document.all["rbRejectDoc"].checked)
            {
                //1060223 Cloud 1050087 升級二代
                /*document.all["lbAcceptDoc"].innerText = "";
				document.all["lbRejectDoc"].innerText = argResult.value.CodeDesc;*/
                document.all["lbAcceptDoc"].textContent = "";
                document.all["lbRejectDoc"].textContent = argResult.value.CodeDesc;
            }
        }
        else
        {
            if (document.all["rbAcceptDoc"].checked)
                //1060817	Kevin_C	1060719	focus轉為JQuery形式
                //document.all["tbAcceptDoc"].focus();
                $('#tbAcceptDoc').focus();
            else if (document.all["rbRejectDoc"].checked)
                //1060817	Kevin_C	1060719	focus轉為JQuery形式
                //document.all["tbRejectDoc"].focus();
                $('#tbRejectDoc').focus();
        }
    }
    else if (argResult.id == iCallID_ChkDocState)	//公文文號/狀態
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            //檢查公文狀態Doc_State
            if (parseInt(argResult.value.DocState, 10) > 19)	//已結案
            {
                //alert("此公文的狀態代碼為 " + GetDocStateDesc(argResult.value.DocState) + ", 不是可點收的公文!")
                alert("該筆公文不在點收範圍");

                //95.11.30 950852併950786併950860 David				
                if (jf_Trim(jf_ReadCookie("Mode")) == "Clean")
                {
                    document.all["tbDocNo"].value = "";
                }
                //1060817	Kevin_C	1060719	focus轉為JQuery形式
                //document.all["tbDocNo"].focus();
                $('#tbDocNo').focus();
                /*
				//ferdy no.950786 清除tbDocNo
				document.all["tbDocNo"].value = "";
				document.all["tbDocNo"].focus();
				*/
            }
            else
            {
                strDocNo = document.all["tbDocNo"].value;
                //1070709 Zen 1070678 弱掃XSS修正
                //if (ClickConfirm(document.all["tbDocNo"].value) == "1")
                if (ClickConfirm(HtmlEncode(document.all["tbDocNo"].value)) == "1")
                    return;
				// 2019.11.19	Cloud	1080980 修改AJAX 增加取得公文併案狀態，彙並辦公文子文應與母文一起，不應依系統參數[COM_ACCEPT]設定而可分開
				//if (document.all["tbCom_Acc"].value!="" && document.all["tbCom_Acc"].value=="1")
				//1090310		Kevin_C	1090087	系統參數COM_ACCEPT增加支援僅帶回併件公文功能
                //if (document.all["tbCom_Acc"].value != "" && document.all["tbCom_Acc"].value == "1" || gCombineType == "1" || gCombineType == "2")
				if (document.all["tbCom_Acc"].value != "" && document.all["tbCom_Acc"].value == "1" || document.all["tbCom_Acc"].value == "2" || gCombineType == "1" || gCombineType == "2")
                {
                    if (argResult.value.ComNo != "")
                    {
                        //[001478]Modify by Cola 不論母子文皆設定IsNoOk為true，同時不將值塞入tbComNo，因爾後在塞入下方table時已會進行判斷是否重覆 -- start --
                        IsNoOk = true;
                        //Cola -- end --

                        /*if (argResult.value.ComNo==argResult.value.DocNo)//母文
							IsNoOk=true;
						else//子文
						{
							if (document.all["tbComNo"].value!="")
								document.all["tbComNo"].value+=",";
							document.all["tbComNo"].value+="'"+argResult.value.DocNo+"'";
						}*/
                    }
                	// 2019.11.19	Cloud	1080980 修改AJAX 增加取得公文併案狀態，彙並辦公文子文應與母文一起，不應依系統參數[COM_ACCEPT]設定而可分開
					gCombineType = "";
                }
                //1060817	Kevin_C	1060719	focus轉為JQuery形式
                //document.all["tbDocNo"].focus();
                $('#tbDocNo').focus();
            }
        }
        else
        {
            //95.11.30 950852併950786併950860 David				
            if (jf_Trim(jf_ReadCookie("Mode")) == "Clean")
            {
                document.all["tbDocNo"].value = "";
            }
            //1060817	Kevin_C	1060719	focus轉為JQuery形式
            //document.all["tbDocNo"].focus();
            $('#tbDocNo').focus();
            /*
			//ferdy no.950786 清除tbDocNo
			document.all["tbDocNo"].value = "";
			document.all["tbDocNo"].focus();
			*/
        }
    }
    else if (argResult.id == iCallID_ComNo)
    {
        if (argResult.value.ErrorClass.IsRedirect != true)
        {
            if (argResult.value.ErrorClass.ErrMessage.length == 0)//有子文
            {
                //1060823	Leslie	增加滑鼠外觀調整
                $('html').css('cursor', 'wait')
				//1091120 Cloud 1090828 增加判斷如是透過取回子文函式叫用則直接更新，非直接透過異動子文
				CallByGetComNO = true;

                for (var idx = 0; idx < argResult.value.ComNo.length; idx++)
                {
                    ProcessRecord(argResult.value.ComNo[idx]);
                }
								//1091120 Cloud 1090828 增加判斷如是透過取回子文函式叫用則直接更新，非直接透過異動子文
				CallByGetComNO = false;

                //1060823	Leslie	二代的IE效能調校，增加傳入參數，大量新增時改為最後一次塞入DOM
				if(gInsertContent != ""){
                    document.all["DATA1"].innerHTML += gInsertContent;
                    gInsertContent = "";
                    $('#divSignArea').animate({ scrollTop: $('#DATA1').height() }, 50);
                }

                //1060823	Leslie	增加滑鼠外觀調整
                $('html').css('cursor', '')

                //1060817	Kevin_C	1060719	focus轉為JQuery形式
                //document.all["tbDocNo"].focus(); 
                $('#tbDocNo').focus();
            }
            else//無子文
            {
                //1060817	Kevin_C	1060719	focus轉為JQuery形式
                //document.all["tbDocNo"].focus();
                $('#tbDocNo').focus();
            }
        }
    }
        /*
        else if(argResult.id == iCallID_Dept)
        {
            if(jf_IsWebServiceSuccess(argResult))
            {
                WSResult = argResult.value;
                document.all.dlEmp.options.length = 0;
                var pItem = new Option("","",false,false);
                document.all.dlEmp.options[document.all.dlEmp.options.length] = pItem;
                if (document.all["txEmp"].value=="")
                {
                    for(var i=0;i<WSResult.UserName.length;i++)
                    {
                        var pItem1 = new Option(WSResult.EmpName[i],WSResult.UserName[i],false,false);
                        document.all.dlEmp.options[document.all.dlEmp.options.length] = pItem1;
                    }
                }
                else
                {
                    var ret=0;
                    for(var i=0;i<WSResult.UserName.length;i++)
                    {
                        if (document.all["txEmp"].value==WSResult.UserName[i])
                            ret=i+1;
                        var pItem1 = new Option(WSResult.EmpName[i],WSResult.UserName[i],false,false);
                        document.all.dlEmp.options[document.all.dlEmp.options.length] = pItem1;
                    }
                    if (ret!=0)
                        document.all["dlEmp"].selectedIndex=ret;
                    else
                    {
                        for(var i=0;i<WSResult.UserName.length;i++)
                        {
                            if (document.all["txEmp"].value==WSResult.EmpName[i])
                            {
                                document.all["txEmp"].value=WSResult.UserName[i];
                                ret=i+1;
                            }
                        }
                        if (ret!=0)
                            document.all["dlEmp"].selectedIndex=ret;
                    }
                }
            }
            else
                document.all["txDept"].focus();
        }
        else if(argResult.id == iCallID_Emp)
        {
            WSResult = argResult.value;
            if(jf_IsWebServiceSuccess(argResult))
            {
                document.all["txDept"].value = WSResult.EmpDeptNo;
                document.all["txDept"].onblur(); 
            }
            else
                document.all["txEmp"].focus();
        }
        */
    else if (argResult.id == iCallID_Save)
    {
        WSResult = argResult.value;
        if (jf_IsWebServiceSuccess(argResult))
        {
            //document.all["lbMsg"].innerHTML=WSResult.strMsg;
            document.all["txMsg"].value = WSResult.strMsg;
            //1120606   Joe     1120361     弱掃修正XSS
            document.all["txMsgColor"].value = WSResult.strMsgColor;
            if (argResult.value.ErrorClass.IsErr)
                alert(argResult.value.ErrorClass.ErrMessage[0]);
            Page_BlockSubmit = false;
        }
    }
    else if (argResult.id == iCallID_CLS)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            WSResult = argResult.value;
            /*
			if (document.all["txKeepYear"].value=="")
			{
				document.all["txKeepYear"].value = WSResult.KeepYear;
				TbOnBlur("txKeepYear");
			}
			*/
            IsClsChecked = true;		// 是否檢查過分類號
            if (WSResult.GenCase == 1)
                IsCanUseInitCase = true;	// 可使用通案
            else
                IsCanUseInitCase = false;	// 不可使用通案
        }
        else
            //1060817	Kevin_C	1060719	focus轉為JQuery形式
            //document.all["txClsNo"].focus();
            $('#txClsNo').focus();
    }
    else if (argResult.id == iCallID_COM)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            WSResult = argResult.value;
            var str = WSResult.ComType;
            if (str == "2")
            {
                alert("輸入的併案文號為子文\n其母文為" + WSResult.Com_No + "，請重新輸入");
                //1060817	Kevin_C	1060719	focus轉為JQuery形式
                //document.all["txComNo"].focus();
                $('#txComNo').focus();
            }
        }
        else
            //1060817	Kevin_C	1060719	focus轉為JQuery形式
            //document.all["txComNo"].focus();
            $('#txComNo').focus();
    }/*
    else if(argResult.id == iCallID_CASE)
    {
    	WSResult = argResult.value;
    	if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.IsErr == false)
			{
				if (window.confirm("輸入的案次號已存在，是否要重新輸入？"))
				{
					document.all["txCaseNo"].focus();
				}
			}
		}
    }*/
    else if (argResult.id == iCallID_ComNo1)
    {
        var Msg = "";
        if (argResult.value.ErrorClass.IsRedirect != true)
        {
            if (argResult.value.ErrorClass.IsErr)//有子文
            {
                for (var idx = 0; idx < argResult.value.ComNo.length; idx++)
                {
                    Msg += argResult.value.ComNo + "\n";
                }
                if (Msg != "")
                    alert("本公文為母文,有下列子文：\n" + Msg + "不可改變併案文號！")
                //1060817	Kevin_C	1060719	focus轉為JQuery形式
                //document.all["txComNo"].focus(); 
                $('#txComNo').focus();
            }
        }
    }

    if (argResult.id == iCallID_ChkUserDocPriv)
    {
        if (argResult.value.ErrorClass.IsRedirect != true)
        {
            if (!argResult.value.ErrorClass.IsErr)
                strStoreNo = argResult.value.RtnStr;
            else
                strStoreNo = argResult.value.RtnStr;
        }
        else
            strStoreNo = argResult.value.RtnStr;
    }

}

function GetDocStateDesc(argDocState)
{
    switch (argDocState)
    {
        case "10":
            return "已結案";
        case "20":
            return "已點收未掃描";
        case "25":
            return "已點收已掃描";
        case "30":
            return "已銷毀";
        case "35":
            return "提供文史機關使用";
        case "40":
            return "已移轉";
        case "50":
            return "已遺失";
        case "90":
            return "待刪除";
    }
    return "未知";
}
//1091120 Cloud 1090828 增加判斷如是透過取回子文函式叫用則直接更新，非直接透過異動子文
var CallByGetComNO = false;
function ProcessRecord(argDocNo)
{
    //1000713 Davy [1000129] 取得是否有紙本來文
    var IsRcvfile = false;
    /*	
	Insert_Table(argDocNo);
	RecordNO++;
	*/
    //避免帶回重覆文 #2007.04.13 Andy
    var DOCNO_Exist_Row_NO;
	
    DOCNO_Exist_Row_NO = Check_DOCNO_Exist(argDocNo);
	
    if (DOCNO_Exist_Row_NO == -1)
    {
        //1000713 Davy [1000129] 取得是否有紙本來文
        //1060823	Leslie	二代的IE效能調校，增加傳入參數，大量新增時改為最後一次塞入DOM
        //IsRcvfile = Insert_Table(argDocNo , true);
		//1080116	Kevin_C	1070678	修正弱掃Client Potential XSS
        //IsRcvfile = Insert_Table(argDocNo, true, true);
		IsRcvfile = Insert_Table(HtmlEncode(argDocNo), true, true);
        RecordNO++;
    }
    /*
	else
		Update_Table(argDocNo, DOCNO_Exist_Row_NO+1);
	*/
    //1000713 Davy [1000129] 回傳是否有紙本來文
    return IsRcvfile;
}

function DisplayDocInfo()
{
    var IsShow = document.all["htxShowDocInfo"].value;
    if (IsShow == "True")
    {
        document.all["DocInfo"].style.display = "";
        document.all["btDocInfo"].value = "隱藏基資[H]";
    }
    else
    {
        document.all["DocInfo"].style.display = "none";
        document.all["btDocInfo"].value = "顯示基資[H]";
    }
}

function ChkCaseNoExist(ClsNo, CaseNo)
{
    if (ClsNo != "" && CaseNo != "")
    {

        var param = new Array(4);
        param[0] = document.all["txFileYear"].value;
        param[1] = ClsNo;
        param[2] = CaseNo;
        param[3] = "";

        //1051005   Kenny   [1050313]   因回傳值並無使用，移除對CheckCaseMain叫用
        //RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
        //iCallID_CASE = RtnObj.id;
        //OnWSResult(RtnObj);
        //return RtnObj;
    }
}

//呼叫錯誤訊息子視窗
function jf_OpenAKT116C2(argDocNo)
{
    var xUrl = "AKT116C2.aspx?k1=" + argDocNo + "&k2=116";
    jf_OpenChildWin(xUrl, "AKT116C2", 500, 300);
}

function GetDocFileTypeDesc(argDocFileType)
{
    switch (argDocFileType)
    {
        case "1": return "紙本";
        case "2": return "電子";
        default: return "未知格式";
    }
}

function GetDocFileType(argDocNo)
{

    argsField = new Array(5);
    var TableName = "DOC_MAIN";
	//* 2025.07.17	Cloud 	1140954 修正Call GetFieldValue 未使用機關代碼問題
    //var WhereField = new Array(1);
    //var WhereCon = new Array(1);
	var WhereField = new Array(2);
	var WhereCon = new Array(2);
    var RtnField = new Array(1);
    var Order = new Array(1);

    WhereField[0] = "Doc_No";
	//* 2025.07.17	Cloud 	1140954 修正Call GetFieldValue 未使用機關代碼問題
	WhereField[1] = "SOURCE_ORGNO";
	
    WhereCon[0] = argDocNo;
	//* 2025.07.17	Cloud 	1140954 修正Call GetFieldValue 未使用機關代碼問題
	WhereCon[1] = document.all["H_ORGNO"].value;
    RtnField[0] = "DOCFILE_TYPE";
    Order[0] = "";

    argsField[0] = TableName;
    argsField[1] = WhereField;
    argsField[2] = WhereCon;
    argsField[3] = RtnField;
    argsField[4] = Order;
    RtnObj = jf_CallWS("Lib/AK_LIB.asmx", "GetFieldValue", false, argsField);

    if (jf_IsWebServiceSuccess(RtnObj))
    { return RtnObj.value.RtnField0[0]; }

}

/*
function GetDocErrMsg(argDocNo)
{	
	
	var param	= new Array(1);
	param[0] = argDocNo;
	RtnObj	= jf_CallWS("AKT116WS.asmx","GetDocErrMsgFromClInf",false, param);
	
	if(jf_IsWebServiceSuccess(RtnObj))
	{return RtnObj.value.RtnStr;}
	
}
*/
/***************************************************************************
新增專屬程式
***************************************************************************/

function ChkExtDateIsEmpty()
{
    var Msg = "";
    var Num = "";
    var bRtnbool = true;
    if (document.all.txExtfileDate.value == "")
    {
        Num += document.all.tbDocNo.value + "\n";

        if (Num != "")
        {
            if (document.all.cbDelayAttFlag.checked == true)
            {
                //Page_BlockSubmit = true;
                Msg += "公文文號：" + Num + "註記為附件抽存,預計歸還日期不可空白\n";
            }
        }
    }
    if (document.all.txExtfileDate.value != "")
    {
        var tempExtDate = jf_PADL(document.all.txExtfileDate.value, 7, 0);
        if (!jf_CheckCDATE(tempExtDate))
        {
            //Page_BlockSubmit = true;
            Msg += "日期格式不正確\n";
        }
        else
            document.all.txExtfileDate.value = tempExtDate;
    }
    if (document.all.txExtfileDate.value < document.all.txCloseDate.value)
    {
        if (document.all["cbDelayAttFlag"].checked)
        {
            Msg += "預計歸檔日期 不可小於 實際歸檔日期\n";
            //1060817	Kevin_C	1060719	focus轉為JQuery形式
            //document.all.txExtfileDate.focus();
            $('#txExtfileDate').focus();
        }
    }

    if (Msg != "")
    {
        bRtnbool = false;
        alert(Msg);
    }
    return bRtnbool;
}

function OpenCalendar()
{
    Page_BlockSubmit = true;
    jf_CallCalendar(document.all.txExtfileDate, event.screenX, event.screenY);
}
//[950754]Add by Cola 新增日期格式檢查
function Check_DATE(obj)
{
    if (obj.value != "")
    {
        obj.value = jf_PADL(obj.value, 7, "0");

        if (!jf_CheckCDATE(obj.value))
        {
            alert("輸入的日期不合法,請重新輸入");
            obj.value = "";
            obj.focus();
        }
    }
}
function cbDelay()
{
    if (document.all["tbDocNo"].value != "")
    {
        if (document.all["cbDelayAttFlag"].checked)
        {
            //透過Ajax檢核有無附件
            //1070830 Zen 1070678 弱掃Ajax修正
            //if (AKT116.CheckAttach(document.all["tbDocNo"].value, document.all["H_ORGNO"].value).value == "0")
            if (AK.AKT116.CheckAttach(document.all["tbDocNo"].value, document.all["H_ORGNO"].value).value == "0")
            {
                alert("本公文目前並沒有附件資訊，若有附件資訊需註記，請先點選基資維護開啟AKM330維護後再勾選。");
                document.all["cbDelayAttFlag"].checked = false;
                return;
            }
            document.all["txExtfileDate"].style.backgroundColor = "FFFFFF";
            document.all["txExtfileDate"].readOnly = false;
            document.all["txExtfileDate"].disabled = false;
            //1131211   Cloud   1130983 參照0990500	有文號時，帶出承辦人設定的預歸檔日期
			if(uCurrDocAttExtFileDate != "")
				document.all["txExtfileDate"].value= uCurrDocAttExtFileDate;
        }
        else if (!document.all["cbDelayAttFlag"].checked)
        {
            document.all["txExtfileDate"].style.backgroundColor = "LightGrey";
            document.all["txExtfileDate"].readOnly = true;
            document.all["txExtfileDate"].disabled = true;
            document.all["txExtfileDate"].value = "";
        }
    }
    else
    {
        if (document.all["cbDelayAttFlag"].checked)
        {
            document.all["txExtfileDate"].style.backgroundColor = "FFFFFF";
            document.all["txExtfileDate"].readOnly = false;
            document.all["txExtfileDate"].disabled = false;
        }
        else if (!document.all["cbDelayAttFlag"].checked)
        {
            document.all["txExtfileDate"].style.backgroundColor = "LightGrey";
            document.all["txExtfileDate"].readOnly = true;
            document.all["txExtfileDate"].disabled = true;
            document.all["txExtfileDate"].value = "";
        }
    }
}
//1040401 Gabby[1040172]避免Barcode Reader會多一個無法處理的Enter事件
function Enter()
{
    if (event.keyCode == 13 && document.all["tbDocNo"].value == "")
        event.returnValue = false;
}
//1061027 Cloud [1061030] 增加函式勾選子文選項
function CheckChild(argId, argDocNo)
{
    if ($(argId)[0].checked)
    {
        $("#WorkArea").find("input[ComNo^='" + argDocNo + "']").prop("checked", true);
    }
    else
    {
        $("#WorkArea").find("input[ComNo^='" + argDocNo + "']").prop("checked", false);
    }
}

//1070709 Zen 1070678 弱掃XSS修正
function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}