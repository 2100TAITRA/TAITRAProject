/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.10.16
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2006.09.28	Whay	950940	調案時應檢查DataGrid中是否有輸入任意一筆文號,有才可儲存
 * 2006.11.20	Whay	950942	調案時輸入檔號不自動帶出文號
 * 2006.12.08	David	955218	交通部 - 櫥位號
 * 2007.08.01	Matte	001207	AKS502網址參數新增nFrom=AKT811
 * 2008.01.31	Leslie	0970084	藥檢局，以文號帶出的檔號不完整時，不可併件/整卷調案
 * 2008.03.13	Leslie	0970164	桃園環保局，增加外機關借調相關欄位及相關Event
 * 2008.05.19	Leslie	--	增加檢核"無數位內容"時，不可儲存為"線上調檔"
 * 2008.05.21	Howard	0980229	修正應歸還日期應依照系統參數值設定
 * 2011.09.27   Ken     1000817 新增交通部預覽列印調案單
 * 2014.11.12	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 104.08.12    Kevin_C	1040582	調案登入作業增加展期、歸還功能
 * 104.08.28	Kevin_C	1040582	機關暱稱非榮總不開啟榮總客製化功能
 * 2015.12.04	Kenny	1040879	增加取得Email寄送前取得檢核欄位所需條件(SOURCE_ORGNO)
 * 2016.04.21	Kenny	1050087 二代公文系統相關修改
 * 2106.08.09   Zen     1050700 弱掃XSS修正
 * 2016.10.19	Joe		1050087	二代修正配合行動平台
 * 2016.12.07   Kenny   1050087 調整由子視窗帶回調案單號後doPostBack前行為；避免帶回後無法自動開啟
 * 1060714		Justin	1060420	新增流程資訊
 * 1061208      Zen     1061227 修正帶入歸還日期功能失效之問題
 * 1061211      Joe     1061227 修正前次修改Chrome會一直跳出錯誤訊息的問題
 * 1061225      Zen     1061095 修正開啟後調案人資訊為空之問題
 * 1070709      Zen     1070678 弱掃XSS修正
 * 1080116		Kevin_C	1070678	修正弱掃Client Potential Code Injection
 * 1090421		Kevin_C	1090250	儲存前檢核預計歸還日
 * 1090608		Zen		1090250	修正語法錯誤導致調案內容包含無限辦日期之案件時無法登錄之問題
 * 1100906		Cloud	1090868	增加檢核，調案運用類型不可空白	
 * 1101111		Cloud	1101277	修正線上調檔未檢核是否有影像問題
 * 1110103      Zen     1101292 修正多次點擊重複PostBack之問題
 * 1110207      Cloud   1101502 [考試院]新增調案性質選項，增加紀錄最上層鍵值
 * 1111103      Cloud   1111049 修正同單位有同姓名人員時，會通知錯人問題，主因為二代combobox物件造成，調整改為使用dropdownlist
 * 1120606      Cloud   1120361 弱掃修正
 * 1120614      Cloud   1120361 弱掃修正
 * 2023.09.12	Cloud 	1120723	Merge1050994	新增審核流程明細表列印/預覽功能
 * 1130621		Cloud	1130551	新增模式才提供查詢按鈕
 * 1131009      Cloud   1130941 XSS弱掃
 * 1140109		Cloud	驗證測到 修正輸入文號未帶出主旨問題
 * 1140113      Cloud   驗證序16 修正使用akt811新增調案單調案人姓名為空白問題
 * 1140416      Cloud   1140148 增加註冊備註欄位ONBLUR檢核
 * 1140919      Cloud   1141137 外貿檔號拆開顯示
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var bUserExit = false;
var IsServerHandling = new Boolean();
IsServerHandling = false;
var id_nowDataGrid = null;

//1050421	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050421	Kenny	[1050087]   二代公文系統相關修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//* 1110207      Cloud   1101502 [考試院]新增調案性質選項-增加取得最上層分類號鑑值-S
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
//* 1110207      Cloud   1101502 [考試院]新增調案性質選項-增加取得最上層分類號鑑值-E


//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019	Joe		1050087		配合行動平台進行修正
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

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

    switch (xObjectName)
    {
        case "btHelp":
            strUrl = "AKS502.aspx?nFrom=AKT811&rtnObj=lbReturnValue&k1=1"; //Matte 001207
            jf_OpenChildWin(strUrl, "AKS502", 700, 500);
            Page_BlockSubmit = true;
            break;
    }
}

//1050421	Kenny	[1050087]   二代公文系統相關修改
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

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050421	Kenny	[1050087]   二代公文系統相關修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id
    bUserExit = false;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //* 1100906		Cloud	1090868	增加檢核，調案運用類型不可空白
            if (document.all["AKT800_USE_USAGR_TYPE"] && document.all["AKT800_USE_USAGR_TYPE"].value == "Y") {
                if (document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].value == "") {
                    alert("調案運用類型不可為空白。");
                    Page_BlockSubmit = true;
                    return;
                }
            }
            if (ConfirmSave())//是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            bUserExit = true;
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            bUserExit = true;
            Page_BlockSubmit = true;
            CleanProc();
            document.all["dlBorType"].selectedIndex = 0;

            //96.03.23 David
            document.all["dlBorFlag"].selectedIndex = 0;
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //document.all["txBorNo"].focus();
            $('#txBorNo').focus();
            break;
        case "btEmail":
            Page_BlockSubmit = !fnCheckBeforeMail();
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btIsdn":
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1060714 Justin [1060420] 新增流程資訊
        case "btSearch":
            Page_BlockSubmit = true;
            if (jf_CheckKeyObject())
            {
                var strArtifact = document.all.nArtifact.value;
                var strBorNo = document.all.txBorNo.value;
                var strHttp = document.all.nHttp.value;
                var strSourceOrgno = document.all.SourceOrgNo.value;
                var strUrl = strHttp + "EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argMsgFrom=AKT800&argMsgFromId=" + strBorNo + "&SAMLart=" + strArtifact;

                jf_OpenChildWin(strUrl, "EDI200", 800, 600);
            }
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":

            //2011.09.27   Ken     1000817 新增預覽列印
        case "btPreview":
        case "btPrintT":

            /*
			if (jf_IsModified())
			{
				if(window.confirm("您已修改過內容,是否要先儲存再列印?"))
					Page_BlockSubmit = false;
				else
					Page_BlockSubmit = true;	
			}
			else
				Page_BlockSubmit = false;
			*/
            Page_BlockSubmit = false;
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //2023.09.12	Cloud 	1120723	Merge1050994	新增審核流程明細表列印/預覽功能
		case "btPreviewDetail":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
    }
}

function CallBack(argCallerId)
{
    if (argCallerId == "AKS502")
    {
        document.all["txBorNo"].value = document.all["lbReturnValue"].options[0].value;
        document.all["txHid"].value = document.all["txBorNo"].value;
        //回傳值為鍵值時，觸動TextChange事件
        //__doPostBack();//for .NET Framework 1.0
        //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
        IsServerHandling = true;
        //1051207   Kenny   [1050087]   修改doPostBack前行為
        Page_BlockSubmit = false;
        __doPostBack("", "");//for .NET Framework 1.1
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    //paul解析DATAGRID裡的txDoc欄位,並且將影響DATAGRID裡的cbAll與cbCom
    DEALDG();
    jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);

    //設定調案人下拉選單長度為10 修改人：FERDY 問題單：950215 日期：950503 
    //* 1111103      Cloud   1111049 修正同單位有同姓名人員時，會通知錯人問題，主因為二代combobox物件造成，調整改為使用dropdownlist
    //document.all["dlName"].size = 10;

    //提供從調案核可待登錄開啟AKT811後馬上開啟進修改模式之TemplateMode強制修正 #2007.04.17 Andy
    if (document.all["ForceTemplateMode"])
    {
        if (document.all["ForceTemplateMode"].value != "")
        {
            document.all["TemplateMode"].value = document.all["ForceTemplateMode"].value;
            document.all["ForceTemplateMode"].value = "";
        }
    }
    //1040812   Kevin_C 1040582 顯示或隱藏列
    ShowHideRow();
    //1110207      Cloud   1101502 [考試院]新增調案性質選項
    if (document.all["OrgNickName"].value == "EXAM")
        SetOtherInfo();
	// 1130621		Cloud	1130551	新增模式才提供查詢按鈕
	document.all["btHelp"].className ="";
	if (document.all["txBorNo"].readOnly)
        document.all["btHelp"].className = "hide";
    //* 1140919      Cloud   1141137 外貿檔號拆開顯示
    if (document.all["OrgNickName"].value == "TAITRA") {
        document.all["colNameHeader"][0].textContent = "文號";
    }

}
//paul DEALDG()
//paul解析DATAGRID裡的txDoc欄位,並且將影響DATAGRID裡的cbAll與cbCom
function DEALDG()
{
    if (document.all["dg1"] == null)
        return;
    var len = document.all["dg1"].rows.length + 1;
    for (i = 2; i < len; i++)
    {

        var tmpObjtxCase = document.all["dg1__ctl" + i + "_txCase"];
        var tmpObjcbAll = document.all["dg1__ctl" + i + "_cbAll"];
        var tmpObjcbCom = document.all["dg1__ctl" + i + "_cbCom"];

        if (tmpObjtxCase.value != "" && CheckCase(tmpObjtxCase.value))
        {
            tmpObjcbAll.checked = false;
            tmpObjcbAll.disabled = true;

            tmpObjcbCom.checked = false;
            tmpObjcbCom.disabled = true;
        }
        else
        {
            tmpObjcbAll.disabled = false;
            tmpObjcbCom.disabled = false;
        }

    }
}
function CheckCase(argCase)
{
    //09700084	Leslie	檢核檔號是否完整，不應寫死'-'，而是各機關自訂的檔號間隔
    //var arraycase = argCase.split("-");

    var arraycase = argCase.split(document.all["fileno_sep"].value);
    for (var tmpi in arraycase)
    {
        if (arraycase[tmpi] == "")
            return true;
    }

    return false
}

function OnWSResult(argResult)
{
    if (argResult.id == wsGetLimitDateID)
    {
        //檢查執行是否成功
        if (!argResult.error)
            document.all["txLimit"].value = argResult.value;
    }
    else if (argResult.id == ws_wDaysID)		//96.03.22 951353 David
    {
        //alert(1);
        WSResult = argResult.value;
        document.all["txLimit"].value = WSResult.RtnStr;
        //alert(WSResult.RtnStr);
    }
    else if (argResult.id == iCallID_qBorrowDetail)
    {
        WSResult = argResult.value;
        var id_secs = new Array(4);
        id_secs = id_nowDataGrid.split("_", 4);
        var idtxDoc = id_secs[0] + "__" + id_secs[2] + "_txDoc";
        var idtxCase = id_secs[0] + "__" + id_secs[2] + "_txCase";
        var idtxDesc = id_secs[0] + "__" + id_secs[2] + "_txDesc";
        var idtxVolume = id_secs[0] + "__" + id_secs[2] + "_txVolume";
        var idtxAttNo = id_secs[0] + "__" + id_secs[2] + "_txAttNo";
        var idtxDocNum = id_secs[0] + "__" + id_secs[2] + "_txDocNum";
        var idtxPageNum = id_secs[0] + "__" + id_secs[2] + "_txPageNum";
        var idtxVolNum = id_secs[0] + "__" + id_secs[2] + "_txVolNum";

        var idcbAll = id_secs[0] + "__" + id_secs[2] + "_cbAll";
        var idcbCom = id_secs[0] + "__" + id_secs[2] + "_cbCom";

        //95.12.08 955218 David
        var idtxStock = id_secs[0] + "__" + id_secs[2] + "_lbStockNo";
        //0980521	0980229	Howard 判斷是否調閱密件公文
        var idcbIsSecDoc = id_secs[0] + "__" + id_secs[2] + "_cbIsSecDoc";
        //111.02.08 Cloud 1101502 增加取得最上層分類號-及放入預設原因
        var idHUpCLS_KEY = id_secs[0] + "__" + id_secs[2] + "_H_txUpestClsKey";
        var IdtxReason = "dg1__ctl" + i + "_lbReason";

        if (jf_IsWebServiceSuccess(argResult))
        {
            //950942 輸入檔號onblur不帶出文號 by whay  0951120
            //document.all[idtxDoc].value = WSResult.DocNo;
            document.all[idtxCase].value = WSResult.FileNo;
            document.all[idtxDesc].value = WSResult.Subject;
            //* 1140109		Cloud	驗證測到 修正輸入文號未帶出主旨問題
            //document.all[idtxDesc].value = WSResult.Subject;
			document.all[idtxDesc].textContent = WSResult.Subject;
            document.all[idtxVolume].value = WSResult.Volume;
            document.all[idtxAttNo].value = WSResult.AttSeq;
            document.all[idtxDocNum].value = WSResult.TotalDoc;
            document.all[idtxPageNum].value = WSResult.TotalPage;
            document.all[idtxVolNum].value = WSResult.TotalVol;
            //1110208 Cloud 1101502 判斷調案性質 放入預設原因，增加取得最上層分類號-S
            if (document.all["OrgNickName"].value == "EXAM") {
                if (document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].text != "機關內借調")
                { document.all[IdtxReason].textContent = document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].text }
            }
            var strUpClsKey = AK.AKT811.GetUpestClsKey(document.all.SourceOrgNo.value, WSResult.ClsKey).value;
            if (strUpClsKey.indexOf("ERR") != -1) {
                alert(strUpClsKey);
            }
            else { document.all[idHUpCLS_KEY].value = strUpClsKey; }
            //1110208 Cloud 1101502 判斷調案性質 放入預設原因，增加取得最上層分類號-E

            /*
			//95.12.08 955218 David
			document.all[idtxStock].innerHTML = WSResult.StockNo;
			*/
            //#2007.01.07 Andy
            if (WSResult.StockNo)
                //1120606   Cloud   1120361 弱掃修正
                //document.all[idtxStock].innerHTML = WSResult.StockNo;
                //1140922   Cloud   1141137 外貿檔號改拆開顯示--升二代未改到
                //document.all[idtxStock].innerHTML = HtmlEncode(WSResult.StockNo);
                document.all[idtxStock].textContent = HtmlEncode(WSResult.StockNo);
            else
                //1140922   Cloud   1141137 外貿檔號改拆開顯示--升二代未改到
                //document.all[idtxStock].innerHTML = "";
                document.all[idtxStock].textContent = "";

            //0980521	0980229	Howard	取得調案公文是否為密件
            document.all[idcbIsSecDoc].checked = WSResult.IsSec;
            //1140922   Cloud   1141137 外貿檔號改拆開顯示
            if (document.all["OrgNickName"].value == "TAITRA") {
                SetFileNoToColumn(WSResult.FileNo, id_secs);
            }
            CheckDate();

        }
        else
        {
            document.all[idtxDoc].value = "";
            document.all[idtxCase].value = "";
            document.all[idtxDesc].value = "";
            document.all[idtxVolume].value = "";
            document.all[idtxAttNo].value = "";
            document.all[idtxDocNum].value = "";
            document.all[idtxPageNum].value = "";
            document.all[idtxVolNum].value = "";

            //95.12.08 955218 David
            document.all[idtxStock].innerHTML = "";
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //document.all[id_nowDataGrid].focus();
            //1140922   Cloud   1141137 外貿檔號改拆開顯示
            if (document.all["OrgNickName"].value == "TAITRA") {
                SetFileNoToColumn("", id_secs);
            }
            $('#' + id_nowDataGrid).focus();
        }

        if (document.all[idtxCase].value != "" && CheckCase(document.all[idtxCase].value))
        {
            document.all[idcbAll].checked = false;
            document.all[idcbAll].disabled = true;

            document.all[idcbCom].checked = false;
            document.all[idcbCom].disabled = true;
            if (document.all[idtxDoc].value != "")
                alert("公文文號" + document.all[idtxDoc].value + "尚未進行編目，僅可單文借出");
        }
        else
        {
            document.all[idcbAll].disabled = false;
            document.all[idcbCom].disabled = false;
        }
    }
    else if (argResult.id == iCallID_GetFromDocInfo)	//0970164	Leslie	增加取得來文的公文資訊
    {
        WSResult = argResult.value;
        if (jf_IsWebServiceSuccess(argResult))
        {
            var strFromNo = WSResult.FromNo;
            if (strFromNo == "字第號")
                strFromNo = "";
            document.all["txFromNo"].value = strFromNo;
            document.all["txFromOrg"].value = WSResult.FromOrgName;
            document.all["txFromSubject"].value = WSResult.FromSubject;
        }
        else
        {
            document.all["txDocNo"].value = "";
            document.all["txFromNo"].value = "";
            document.all["txFromOrg"].value = "";
            document.all["txFromSubject"].value = "";
        }
    }
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050421	Kenny	[1050087]   二代公文系統相關修改
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    if (true)//jf_CheckKeyObject())//檢查key值是否輸入
    {
        if (CheckBeforSave())
        {
            // 新增模式需檢查鍵值是否已存在
            if (jf_GetActionMode() == LayoutModeNew)
            {
                if (jf_CheckDataExist(""))//檢查鍵值是否已存在
                {
                    //所顯示訊息請各自系統自行規劃
                    if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
                        bRtnbool = true;
                    else
                        bRtnbool = false;
                }
                else
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
    }
    return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
    var bRtnbool = false;
    if (CheckEmpty())
        bRtnbool = CheckDetail();
    //0970519	Leslie	增加檢核是否可進行"線上調檔"，以防止純紙本填單申請時公文無數位內容
	//* 1101111		Cloud	1101277	修正線上調檔未檢核是否有影像問題
    //if (document.all["dlBorType"].value == "2-5")
	if (document.all["dlBorType"].value == "2"+document.all["fileno_sep"].value+"5")
    {
        for (i = 2; i <= document.all["dg1"].rows.length; i++)
        {
            tag = "dg1__ctl" + i + "_txVolume";

            //if (document.all[tag] == null)	//0970626	Leslie	修正選擇"線上調檔"時，會去檢核到空的欄位"無數位內容"
            if (document.all["dg1__ctl" + i + "_txDoc"].value == "")
                continue;

            str = jf_Trim(document.all[tag].value);
            if (str == "")
            {
                msg = "序號" + (i - 1) + "無數位內容，不允許申請線上調檔";
                alert(msg);
                bRtnbool = false;
                break;
            }
        }
    }
    if (document.all["AlreadyReturn"])
    {
        alert("檔案已歸還，不可異動資料")
        bRtnbool = false
    }
    //1040812   Kevin_C 1040582 檢核展期
    if (document.all["rbEXT"].checked == true)
    {
        if (document.all["lbExtTimesWarn"])
        {
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //alert(document.all["lbExtTimesWarn"].innerText)
            alert(document.all["lbExtTimesWarn"].textContent)
            return false;
        }
        var strLastRow = document.all["dg2"].rows.length;
        if (document.all["dg2__ctl" + strLastRow + "_dlReason"].selectedIndex == 0)
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr),
	              new Array(["展期原因 不可為空白"])), "");
            bRtnbool = false;
        }
        if (jf_Trim(document.all["dg2__ctl" + strLastRow + "_txComment"].value) == "")
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr),
	              new Array(["原因說明 不可為空白"])), "");
            bRtnbool = false;
        }
    }
    //1090421	Kevin_C	1090250	儲存前檢核預計歸還日
    //1090608 Zen 1090250	修正語法錯誤導致調案內容包含無限辦日期之案件時無法登錄之問題
    //if (document.all["LIMIT_BOR_DUE_DATE"].value = "Y")
    if (document.all["LIMIT_BOR_DUE_DATE"].value == "Y")
    {
        //有密件公文，則用DUE_DATE_SEC檢核預計歸還日，否則用DUE_DATE
        var strMaxDate = document.all["DUE_DATE"].value;
        var strDateNum = document.all["DUE_DATE_NUM"].value;
        for (i = 2; i < (document.all["dg1"].rows.length + 1) ; i++)
        {
            var IdtxSEC_NO = "dg1__ctl" + i + "_cbIsSecDoc";
            if (document.all[IdtxSEC_NO].checked)
            {
                strMaxDate = document.all["DUE_DATE_SEC"].value;;
                strDateNum = document.all["DUE_DATE_SEC_NUM"].value;
                break;
            }
        }

        if (document.all.txDueDate.value != "")
        {
            if (document.all.txDueDate.value > strMaxDate)
            {
                alert("不可超過最大借閱天數：" + strDateNum + "，系統將預設為可借閱最大日期");
                document.all.txDueDate.value = strMaxDate;
                bRtnbool = false;
            }
        }
        else
        {
            alert("未填入預計歸還日期，系統將自動依設定天數：" + strDateNum + "，系統將預設為可借閱最大日期");
            document.all.txDueDate.value = strMaxDate;
            bRtnbool = false;
        }
    }
    //1040812   Kevin_C 1040582 檢核歸還
    if (document.all["rbReturn"].checked == true)
        if (jf_Trim(document.all["txReturnDate"].value) == "")
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr),
	              new Array(["實際歸還日期 不可為空白"])), "");
            bRtnbool = false;
        }
    //111.02.08 Cloud 1101502 考試院新增檢核他機關相關欄位-S
    if (document.all["OrgNickName"].value == "EXAM") {
        if (!Checkdlurg())
            bRtnbool = false;
    }
    //111.02.08 Cloud 1101502 考試院新增檢核他機關相關欄位-E
    return bRtnbool;
}

function CheckEmpty()
{
    var strErrMsg = "";
    if (!CheckDueDate() || !CheckEntryDate())	//0970164	Leslie	儲存前檢核登錄日期及預計歸還日(外機關借調時)
        return false;

    if (document.all["txLimit"].value == "")
    {
        strErrMsg = "調案期限不可空白" + "\n" + strErrMsg;
        //1050421	Kenny	[1050087]   二代公文系統相關修改
        //document.all["txLimit"].focus();
        $('#txLimit').focus();
    }
    if (document.all["txDate"].value == "")
    {
        strErrMsg = "調案日期不可空白" + "\n" + strErrMsg;
        //1050421	Kenny	[1050087]   二代公文系統相關修改
        //document.all["txDate"].focus();
        $('#txDate').focus();
    }
    if (document.all["txFromOrg"].value != "")
    {
        if (document.all["txDocNo"].value == "")
        {
            strErrMsg = "調案機關有值，文號不可空白" + "\n" + strErrMsg;
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //document.all["txDocNo"].focus();
            $('#txDocNo').focus();
        }
    }
    //* 1111103      Cloud   1111049 修正同單位有同姓名人員時，會通知錯人問題，主因為二代combobox物件造成，調整改為使用dropdownlist
    //if (document.all["dlName_Text"].value == "")
    if (document.all["dlName"].options[document.all["dlName"].selectedIndex].value == "")
    {
        strErrMsg = "調案人不可空白" + "\n" + strErrMsg;
        //1050421	Kenny	[1050087]   二代公文系統相關修改
        //document.all["dlName_Text"].focus();
        //* 1111103      Cloud   1111049 修正同單位有同姓名人員時，會通知錯人問題，主因為二代combobox物件造成，調整改為使用dropdownlist
        $('#dlName').focus();
    }
    //* 1111103      Cloud   1111049 修正同單位有同姓名人員時，會通知錯人問題，主因為二代combobox物件造成，調整改為使用dropdownlist
    //if (document.all["dlUnit_Text"].value == "")
    if (document.all["dlUnit"].options[document.all["dlUnit"].selectedIndex].value == "")
    {
        strErrMsg = "調案單位不可空白" + "\n" + strErrMsg;
        //1050421	Kenny	[1050087]   二代公文系統相關修改
        //document.all["dlUnit_Text"].focus();
        //* 1111103      Cloud   1111049 修正同單位有同姓名人員時，會通知錯人問題，主因為二代combobox物件造成，調整改為使用dropdownlist
        //$('#dlUnit_Text').focus();
        $('#dlUnit').focus();
    }

    if (strErrMsg != "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        return false;
    }
    else
        return true;
}

//950940 檢核至少需輸入一筆文號 #2006.09.28 Whay
function CheckDetail()
{
    var bRtnBool = false;
    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
    {
        if (jf_Trim(document.all["dg1__ctl" + iRow + "_txDoc"].value) != "" ||
            jf_Trim(document.all["dg1__ctl" + iRow + "_txCase"].value) != "")
        {
            bRtnBool = true;
            if (jf_Trim(document.all["dg1__ctl" + iRow + "_txCase"].value) != "")
            {
                if (document.all["dg1__ctl" + iRow + "_dlRange"].selectedIndex == 0)
                {
                    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr),
							  new Array(["文號(檔號)有值時，調案範圍不可空白"])),
							  "");
                    //1050421	Kenny	[1050087]   二代公文系統相關修改
                    //document.all["dg1__ctl"+iRow+"_dlRange"].focus();
                    $('#dg1__ctl' + iRow + '_dlRange').focus();
                    return false;
                }
            }
        }
        if (document.all["dg1__ctl" + iRow + "_txRemark"].value.length > 30) {
            alert('備註文字不可超過30字。')
            $("#dg1__ctl" + iRow + "_txRemark").focus();
            return false;
        }
    }
    if (bRtnBool == false)
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr),
	              new Array(["文號、檔號不可皆為空白"])), "");
        //1050421	Kenny	[1050087]   二代公文系統相關修改
        //document.all["dg1__ctl2_txDoc"].focus(); 
        $('#dg1__ctl2_txDoc').focus();
    }
    return bRtnBool;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
    var bRtnbool = false;
    return bRtnbool;
}

//Client端物件OnExit事項檢查範例
/*//範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btCancel") ) return;
	
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		if (document.all["txGrp_No"].value != "")
		{
			Page_BlockSubmit=true;
			
			arKeyName[0]    = "GRP_NO";
			arKeyValue[0]   = document.all["txGrp_No"].value;
			arRtnFldName[0] = "GRP_NAME";
			arOrdFldName[0] = "GRP_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "GRP_HEADER";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
			wsGetGrpNameID = callObj.id;
			OnWSResult(callObj);
		}
	}
}
*/
//文號(檔號)onblur()檢查
var iCallID_qBorrowDetail = null;
function queryBorrowDetail(file_no, argtype)
{
    var gotoCASE_MAIN = false;
    var param = new Array(6);


    var NoSecs = new Array(5);

    id_nowDataGrid = event.srcElement.id;
    if (argtype == "3")
    {
        //因為事件是註冊在span上，所以取srcElement.id 如果按到checkBox 的說明欄位span會取不到id，
        //所以要找到id內有cbCom的才行
        //<span onclick="queryBorrowDetail(this,'3')"><input id="dg1__ctl2_cbCom" type="checkbox" name="dg1:_ctl2:cbCom" /><label for="dg1__ctl2_cbCom">併件借出</label></span>
        if (event.srcElement.tagName == "LABEL")
        {
            //id_nowDataGrid = event.srcElement.parentElement.childNodes[0].id;
            //event.cancelBubble = true;
            return;
        }
        else if (event.srcElement.tagName == "SPAN")
        {
            id_nowDataGrid = event.srcElement.childNodes[0].id;
        }
        if (id_nowDataGrid.indexOf('_cbCom') == -1)
            return;
        var id_secs = new Array(4);
        id_secs = id_nowDataGrid.split("_", 4);
        var idtxCase = id_secs[0] + "__" + id_secs[2] + "_txCase";
        var idtxDoc = id_secs[0] + "__" + id_secs[2] + "_txDoc";
        if (file_no.checked)
            file_no = document.all[idtxCase].value;
        else
            file_no = document.all[idtxDoc].value;
    }
    if (file_no == "")
    {
        var id_secs = new Array(4);

        id_secs = id_nowDataGrid.split("_", 4);
        var idtxDoc = id_secs[0] + "__" + id_secs[2] + "_txDoc";
        var idtxCase = id_secs[0] + "__" + id_secs[2] + "_txCase";
        var idtxDesc = id_secs[0] + "__" + id_secs[2] + "_txDesc";
        var idtxVolume = id_secs[0] + "__" + id_secs[2] + "_txVolume";
        var idtxAttNo = id_secs[0] + "__" + id_secs[2] + "_txAttNo";
        var idtxDocNum = id_secs[0] + "__" + id_secs[2] + "_txDocNum";
        var idtxPageNum = id_secs[0] + "__" + id_secs[2] + "_txPageNum";
        var idtxVolNum = id_secs[0] + "__" + id_secs[2] + "_txVolNum";

        var idcbAll = id_secs[0] + "__" + id_secs[2] + "_cbAll";
        var idcbCom = id_secs[0] + "__" + id_secs[2] + "_cbCom";

        //95.12.08 955218 David
        var idStock = id_secs[0] + "__" + id_secs[2] + "_lbStockNo";

        //0980521	0980229	Howard	設定密件公文之欄位
        var idcbIsSecDoc = id_secs[0] + "__" + id_secs[2] + "_cbIsSecDoc";

        document.all[idtxDoc].value = "";
        document.all[idtxCase].value = "";
        //* 1140109		Cloud	驗證測到 修正輸入文號未帶出主旨問題
            //document.all[idtxDesc].value = "";
			document.all[idtxDesc].textContent = "";
        document.all[idtxVolume].value = "";
        document.all[idtxAttNo].value = "";
        document.all[idtxDocNum].value = "";
        document.all[idtxPageNum].value = "";
        document.all[idtxVolNum].value = "";

        //95.12.08 955218 David
        document.all[idStock].innerHTML = "";

        document.all[idcbAll].checked = false;
        document.all[idcbCom].checked = false;

        document.all[idcbAll].disabled = false;
        document.all[idcbCom].disabled = false;
        //0980521	0980229	Howard	設定密件公文之欄位並重新計算應歸還日期
        document.all[idcbIsSecDoc].checked = false;
        CheckDate();

        return;
    }

    NoSecs = file_no.split(document.all["fileno_sep"].value, 5);

    var KeyName;
    var KeyValue

    if (NoSecs.length == 1)			//<!-- 單純文號 -->
    {
        //1070709 Zen 1070678 弱掃XSS修正
        //param[0] = file_no;
        param[0] = encodeURI(file_no);
        param[1] = "";
        param[2] = "";
        param[3] = "";
        param[4] = "";
        param[5] = "";
    }
    else if (NoSecs.length == 5 && NoSecs[0] != "" && NoSecs[1] != "" && NoSecs[2] != "" && NoSecs[3] != "" && NoSecs[4] != "")	//<!-- 完整檔號 -->
    {	//Leslie	從AKT800.js Copy來的，判斷完整檔號
        if (NoSecs[0] == "" || NoSecs[1] == "" || NoSecs[2] == "" || NoSecs[3] == "" || NoSecs[4] == "")
            return;
        param[0] = "";
        //1080116	Kevin_C	1070678	修正弱掃Client Potential Code Injection
        //param[1] = NoSecs[0];
        // param[2] = NoSecs[1];
        // param[3] = NoSecs[2];
        // param[4] = NoSecs[3];
        // param[5] = NoSecs[4];
        param[1] = encodeURI(NoSecs[0]);
        param[2] = encodeURI(NoSecs[1]);
        param[3] = encodeURI(NoSecs[2]);
        param[4] = encodeURI(NoSecs[3]);
        param[5] = encodeURI(NoSecs[4]);
    }
    else if (NoSecs.length == 4 && NoSecs[0] != "" && NoSecs[1] != "" && NoSecs[2] != "" && NoSecs[3] != "")	//<!-- 檔號只輸到卷號 -->
    {	//Leslie	從AKT800.js Copy來的，判斷完整檔號
        if (NoSecs[0] == "" || NoSecs[1] == "" || NoSecs[2] == "" || NoSecs[3] == "")
            return;
        param[0] = "";
        //1080116	Kevin_C	1070678	修正弱掃Client Potential Code Injection
        // param[1] = NoSecs[0];
        // param[2] = NoSecs[1];
        // param[3] = NoSecs[2];
        // param[4] = NoSecs[3];
        param[1] = encodeURI(NoSecs[0]);
        param[2] = encodeURI(NoSecs[1]);
        param[3] = encodeURI(NoSecs[2]);
        param[4] = encodeURI(NoSecs[3]);
        param[5] = "";
    }
    else if (NoSecs.length == 3 && NoSecs[0] != "" && NoSecs[1] != "" && NoSecs[2] != "")	//<!-- 檔號只輸到案號 -->
    {
        if (NoSecs[0] == "" || NoSecs[1] == "" || NoSecs[2] == "")
            return;
        param[0] = "";
        //1080116	Kevin_C	1070678	修正弱掃Client Potential Code Injection
        // param[1] = NoSecs[0];
        // param[2] = NoSecs[1];
        // param[3] = NoSecs[2];
        param[1] = encodeURI(NoSecs[0]);
        param[2] = encodeURI(NoSecs[1]);
        param[3] = encodeURI(NoSecs[2]);
        param[4] = "";
        param[5] = "";
    }
    else
    {

        var id_secs = new Array(4);

        id_secs = id_nowDataGrid.split("_", 4);
        var idtxDoc = id_secs[0] + "__" + id_secs[2] + "_txDoc";
        var idtxCase = id_secs[0] + "__" + id_secs[2] + "_txCase";
        var idtxDesc = id_secs[0] + "__" + id_secs[2] + "_txDesc";
        var idtxVolume = id_secs[0] + "__" + id_secs[2] + "_txVolume";
        var idtxAttNo = id_secs[0] + "__" + id_secs[2] + "_txAttNo";
        var idtxDocNum = id_secs[0] + "__" + id_secs[2] + "_txDocNum";
        var idtxPageNum = id_secs[0] + "__" + id_secs[2] + "_txPageNum";
        var idtxVolNum = id_secs[0] + "__" + id_secs[2] + "_txVolNum";

        var idcbAll = id_secs[0] + "__" + id_secs[2] + "_cbAll";
        var idcbCom = id_secs[0] + "__" + id_secs[2] + "_cbCom";

        //95.12.08 955218 David
        var idStock = id_secs[0] + "__" + id_secs[2] + "_lbStockNo";
        //0980521	0980229	Howard	設定密件公文之欄位
        var idcbIsSecDoc = id_secs[0] + "__" + id_secs[2] + "_cbIsSecDoc";

        //0970131	Leslie	以下判斷由AKT800 Copy來....
        //觸發onblur的檔號不完整但文號有值時以文號取得公文資訊 #2007.03.01 Andy
        if (id_nowDataGrid.indexOf("txCase") != -1 && jf_Trim(document.all[idtxDoc].value) != "")
        {
            //1070709 Zen 1070678 弱掃XSS修正
            //param[0] = jf_Trim(document.all[idtxDoc].value);
            param[0] = encodeURI(jf_Trim(document.all[idtxDoc].value));
            param[1] = "";
            param[2] = "";
            param[3] = "";
            param[4] = "";
            param[5] = "";
        }
        else //檔號不完整則清空該列 #2007.03.01 Andy
        {
            document.all[idtxDoc].value = "";
            document.all[idtxCase].value = "";
			//* 1140109		Cloud	驗證測到 修正輸入文號未帶出主旨問題
            //document.all[idtxDesc].value = "";
			document.all[idtxDesc].textContent = "";
            document.all[idtxVolume].value = "";
            document.all[idtxAttNo].value = "";
            document.all[idtxDocNum].value = "";
            document.all[idtxPageNum].value = "";
            document.all[idtxVolNum].value = "";

            //95.12.08 955218 David
            document.all[idStock].innerHTML = "";

            document.all[idcbAll].checked = false;
            document.all[idcbCom].checked = false;

            document.all[idcbAll].disabled = false;
            document.all[idcbCom].disabled = false;
            //0980521	0980229	Howard	設定密件公文之欄位
            document.all[idcbIsSecDoc].checked = false;

            alert("檔號不完整");
            return;
        }
    }
    RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetApplyDocInfo", false, param);

    iCallID_qBorrowDetail = RtnObj.id;

    OnWSResult(RtnObj);
}

//調案期限日期格式檢查
function CheckCDATE(argObj, strMsg)
{
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
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //document.all[argObj].focus(); 
            $('#' + argObj).focus();
            return false;
        }
    }

    //1061208 Zen 1061227 檢核歸還日期不可小於調案日期
    if (argObj == 'txLimit')
    {
        var txLimit = document.all['txLimit'].value;
        var txDate = document.all['txDate'].value;

        //1061211	Joe		1061227		修正前次修改Chrome會一直跳出錯誤訊息的問題
        // if (txLimit.localeCompare(txDate) < 0)
        if (txLimit != "" && txLimit.localeCompare(txDate) < 0)
        {
            //1061211	Joe		1061227		修正前次修改Chrome會一直跳出錯誤訊息的問題
            document.all['txLimit'].value = "";
            //1061211	Joe		1061227		修正錯誤訊息內容
            // alert('歸還日期不可小於調案日期');
            alert('應歸還日期不可小於調案日期：' + txDate.substring(0, 3) + '/' + txDate.substring(3, 5) + '/' + txDate.substring(5, 7));
            $('#' + argObj).focus();
            return false;
        }
    }

    return true;
}

//96.03.22 951353 David
var ws_wDaysID = "";

//txDate_onblur
function CheckDate()
{
    //1050809 Zen 1050700 弱掃XSS修正
    //var strDate = document.all["txDate"].value;
    var strDate = encodeURI(document.all["txDate"].value);
    var strValue;
    var argValue;

    // 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
    //會導致只有第一次load會觸發CheckDate()
    //if ((bUserExit) || (document.activeElement.id == "oLabel2"))
    //	return;
    if (document.all["txLimit"].ReadOnly)
        return;

    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all["txDate"].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //document.all["txDate"].focus(); 
            $('#txDate').focus();
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["調案日期"])), "");

        }
        else
        {
            //95.12.22 951353 David
            var index = document.all["dlBorFlag"].selectedIndex;
            //1061208 Zen 1061227 修正帶入歸還日期功能失效之問題
            //var value = document.all["dlBorFlag"].options(index).value;
            var value = document.all["dlBorFlag"].options[index].value;
            //0980521	080229	Howard 判斷是否有調閱密件公文以利重新計算調閱日期
            var bHasSecDoc = CheckSecDoc();

            var iDueDay = "0";
            if (value == "1")
                iDueDay = "7";
            if (value == "2")
                iDueDay = "15";
            if (value == "3")
                iDueDay = "365";

            //96.03.22 951353 David
            //var Param1 = new Array(2);
            var Param1 = new Array(3);
            Param1[0] = strDate;
            Param1[1] = iDueDay;
            //0980521	080229	Howard 判斷是否有調閱密件公文重新計算調閱日期
            Param1[2] = bHasSecDoc;

            var ws_wDay_Obj = jf_CallWS("lib/AK_LIB.asmx", "ws_GetWorkDate", false, Param1);
            ws_wDaysID = ws_wDay_Obj.id;
            OnWSResult(ws_wDay_Obj);

            /*
        strValue = document.all["lbHideParam"].innerText;
        argValue = strValue.split('-');
        
        if (argValue[0] == "1")			//不含假日
            GetLimitDate2(iDueDay);
        else if (argValue[0] == "2")	//含假日
            document.all["txLimit"].value = GetLimitDate1(strDate,iDueDay);	*/
            /*
			if (document.all["txLimit"].value == "")
			{
				strValue = document.all["lbHideParam"].innerText;
				argValue = strValue.split('-');
				if (argValue[0] == "1")			//不含假日
					GetLimitDate2(argValue[1]);
				else if (argValue[0] == "2")	//含假日
					document.all["txLimit"].value = GetLimitDate1(strDate,argValue[1]);	
			}
			*/
        }
    }
}

function GetLimitDate1(argDate, argNum)
{
    argDate = String(Number(argDate) + Number(argNum));
    if (argDate.length < 7) argDate = "0" + argDate;
    var strYY = argDate.substring(0, 3);
    var strMM = argDate.substring(3, 5);
    var strDD = argDate.substring(5, 7);
    var pYear;
    switch (strMM)
    {
        case "01":
        case "03":
        case "05":
        case "07":
        case "08":
        case "10":
        case "12":
            if (strDD > 31)
            {
                strDD = Number(strDD) - 31;
                strMM = Number(strMM) + 1;
                if (strMM > 12)
                {
                    strMM = "0" + (Number(strMM) - 12);
                    strYY = "0" + (Number(strYY) + 1);
                }
                if (strDD > 31)
                    GetLimitDate1(strYY + strMM + strDD, 0);
            }
            break;
        case "04":
        case "06":
        case "09":
        case "11":
            if (strDD > 30)
            {
                strDD = Number(strDD) - 30;
                strMM = Number(strMM) + 1;
                if (strMM > 12)
                {
                    strMM = "0" + (Number(strMM) - 12);
                    strYY = "0" + (Number(strYY) + 1);
                }
                if (strDD > 30)
                    GetLimitDate1(strYY + strMM + strDD, 0);
            }
            break;
        case "02":
            pYear = GetLeapYear(strYY);
            if (strDD > pYear)
            {
                strDD = Number(strDD) - pYear;
                strMM = Number(strMM) + 1;
                if (strMM > 12)
                {
                    strMM = "0" + (Number(strMM) - 12);
                    strYY = "0" + (Number(strYY) + 1);
                }
                if (strDD > pYear)
                    GetLimitDate1(strYY + strMM + strDD, 0);
            }
            break;
    }
    if (String(strMM).length < 2) strMM = "0" + strMM;
    if (String(strDD).length < 2) strDD = "0" + strDD;

    return strYY + strMM + strDD;
}


function GetLeapYear(strYY)
{
    var pYear = new String(Number(strYY) + 1911);
    var strRtnDate;
    //XX00年時,可以整除400的年份為潤年
    if (pYear.substring(2, 2) == "00")
    {
        if (pYear % 400 == 0)
            strRtnDate = "29";
        else
            strRtnDate = "28";
    }
    else	//非XX00年時,可以整除4的年份為潤年
    {
        if (pYear % 4 == 0)
            strRtnDate = "29";
        else
            strRtnDate = "28";
    }
}

var wsGetLimitDateID;
function GetLimitDate2(strDateNum)
{
    var argWSParam = new Array(2);

    argWSParam[0] = document.all["txDate"].value;
    argWSParam[1] = strDateNum;

    //1050809 Zen 1050700 弱掃XSS修正
    argWSParam[0] = encodeURI(argWSParam[0]);

    callObj = jf_CallWS("Template/lib/SYS.asmx", "Get_WorkDate", false, argWSParam);
    wsGetLimitDateID = callObj.id;
    OnWSResult(callObj);
}

//輸入值檢查
function Combobox_onblur(argId)
{
    var bRtnBool = false;
    var strValue = document.all[argId + "_Text"].value;

    // 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
    //if ( (document.activeElement.id == "btCancel") ) return;

    if (strValue != "")
    {
        for (var iItem = 0; iItem < document.all[argId].options.length; iItem++)
        {
            if (strValue == document.all[argId].options[iItem].text)
                bRtnBool = true;
        }
        if (!bRtnBool)
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入資料不存在"])), "");
            //1050421	Kenny	[1050087]   二代公文系統相關修改
            //document.all[argId+"_Text"].focus();
            $('#' + argId + '_Text').focus();
        }
    }
}

//檔號輸入限制:英文 & 數字 & -
function jf_InpFileNumEng()
{
    //A~Z keyCode 65~90 小寫為97~122
    //0~9 keyCode 48~57
    //-   keyCode 45
    if ((event.keyCode < 48 && event.keyCode != 45) || (event.keyCode > 57 && event.keyCode < 65) || (event.keyCode > 90 && event.keyCode < 97) || (event.keyCode > 122))
    {
        event.returnValue = false;
    }
    else
    {
        if (window.event.keyCode >= 97 && window.event.keyCode <= 122)
        {
            window.event.keyCode = window.event.keyCode - 32;
        }
    }
}

function UserOnBlur(Userobj)
{
    if (Userobj.options == null)
    {
        document.all["txUserValue"].value = "";
        //* 1140113      Cloud   驗證序16 修正使用akt811新增調案單調案人姓名為空白問題
        document.all["txUserName"].value = "";
        return;
    }
    if (Userobj.options.length == 0)
    {
        document.all["txUserValue"].value = "";
        //* 1140113      Cloud   驗證序16 修正使用akt811新增調案單調案人姓名為空白問題
        document.all["txUserName"].value = "";
        return;
    }
    var index = Userobj.selectedIndex;
    if (index == -1)
    {
        document.all["txUserValue"].value = "";
        //* 1140113      Cloud   驗證序16 修正使用akt811新增調案單調案人姓名為空白問題
        document.all["txUserName"].value = "";
        return;
    }
    document.all["txUserValue"].value = Userobj.options[index].value;
    //* 1140113      Cloud   驗證序16 修正使用akt811新增調案單調案人姓名為空白問題
    document.all["txUserName"].value = Userobj.options[index].text;

}

function CleanProc()
{
    jf_ConfirmClean();
    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
    {
        var strHeader = "dg1__ctl" + iRow;
        document.all[strHeader + "_txDesc"].value = "";
        document.all[strHeader + "_txVolume"].value = "";
        document.all[strHeader + "_txAttNo"].value = "";
        document.all[strHeader + "_txDocNum"].value = "";
        document.all[strHeader + "_txPageNum"].value = "";
        //96.03.20 David
        //1050421	Kenny	[1050087]   二代公文系統相關修改
        //document.all[strHeader + "_lbStockNo"].innerText = "";
        document.all[strHeader + "_lbStockNo"].textContent = "";
    }
}
//查核是否可寄出mail
function fnCheckBeforeMail()
{
    var arKeyName = new Array();
    var arKeyValue = new Array();
    var arRtnFldName = new Array();
    var arOrdFldName = new Array();
    arKeyName[0] = "BOR_NO";
    //1041204	Kenny	[1040879]	增加取得檢核欄位所需條件(SOURCE_ORGNO)
    arKeyName[1] = "SOURCE_ORGNO";
    arKeyValue[0] = document.all.txBorNo.value;
    //1041204	Kenny	[1040879]	增加取得檢核欄位所需條件(SOURCE_ORGNO)
    arKeyValue[1] = document.all.SourceOrgNo.value;
    arRtnFldName[0] = "STATUS";
    arOrdFldName[0] = "";
    var arWSParam = new Array(5);
    arWSParam[0] = "BORROW_MAIN";
    arWSParam[1] = arKeyName;
    arWSParam[2] = arKeyValue;
    arWSParam[3] = arRtnFldName;
    arWSParam[4] = arOrdFldName;
    callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
    var argResult = callObj;
    if (jf_IsWebServiceSuccess(argResult))
    {
        //RtnField0 STATUS 

        if (argResult.value.RtnField0[0] != "4" && argResult.value.RtnField0[0] != "5")
        {//未登錄或已歸還(調電子檔)
            alert("本調案單尚未登錄，請登錄後再執行E-Mail通知");
            return false;
        }
        else
            return true;
    }
    else
        return false;
}

//0970164	Leslie	取得外機關借調的來文資訊
function GetFromDocInfo()
{
    if (document.all["txDocNo"].value != "")
    {
        var param = new Array(2);
        param[0] = document.all["txDocNo"].value;
        param[1] = document.all["fileno_sep"].value;

        //1050809 Zen 1050700 弱掃XSS修正
        param[0] = encodeURI(param[0]);
        param[1] = encodeURI(param[1]);

        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "ChkDocInfo", false, param);
        iCallID_GetFromDocInfo = RtnObj.id;
        OnWSResult(RtnObj);
    }
    else
    {
        document.all["txFromNo"].value = "";
        document.all["txFromOrg"].value = "";
        document.all["txFromSubject"].value = "";
    }
}

//0970164	Leslie	檢核預計歸還日
function CheckDueDate()
{
    var strFromDocNo = document.all["txDocNo"].value;	//外機關來文文號
    var strDueDate = document.all["txDueDate"].value;	//外機關預計歸還日
    var strDateApply = document.all["txDate"].value;	//調案日期

    if (strFromDocNo != "")
    {
        if (strDueDate != "")
        {
            if (CheckCDATE("txDueDate", "預計歸還日"))
            {
                if (strDueDate <= strDateApply)
                {
                    alert("預計歸還日應大於申請日期！");
                    return false;
                }
            }
            else
                return false;
        }
        else
        {
            alert("外機關借調申請時，預計歸還日不可為空白！");
            return false;
        }
    }

    return true;
}

//0970164	Leslie	檢核登錄日期
function CheckEntryDate()
{
    var now = new Date();
    var strCYear = jf_PADL((now.getFullYear() - 1911) + "", 3, "0");
    var strCMon = jf_PADL((now.getMonth() + 1) + "", 2, "0");
    var strCDate = jf_PADL(now.getDate() + "", 2, "0");
    var strNowDate = strCYear + strCMon + strCDate;
    var strEntryDate = document.all["txEntryDate"].value;

    //1061225 Zen 1061095 修正新增模式檢核登陸日期之問題(Bonus)
    if (document.all['TemplateMode'].value == '0')
        return true;

    if (strEntryDate != "")
    {
        if (CheckCDATE("txEntryDate", "登錄日期"))
        {
            if (strEntryDate > strNowDate)
            {
                alert("登錄日期不可大於今天！");
                //1050421	Kenny	[1050087]   二代公文系統相關修改
                //document.all["txEntryDate"].focus();
                $('#txEntryDate').focus();
                return false;
            }
        }
        else
            return false;
    }
    else
    {
        alert("登錄日期不可為空白！");
        //1050421	Kenny	[1050087]   二代公文系統相關修改
        //document.all["txEntryDate"].focus();
        $('#txEntryDate').focus();
        return false;
    }
    return true;
}

//0980521	0980229	Howard	檢查是否有密件公文
function CheckSecDoc()
{
    var hasSecDoc = false;
    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
    {
        var strHeader = "dg1__ctl" + iRow;
        if (document.all[strHeader + "_cbIsSecDoc"].checked == true)
        {
            hasSecDoc = true;
            break;
        }
    }
    return hasSecDoc;
}
//1040812   Kevin_C 1040582 顯示或隱藏列
function ShowHideRow()
{
    //1040828	Kevin_C	1040582	機關暱稱非榮總不開啟榮總客製化功能
    if (document.all["CloseVGH"])
    {
        document.getElementById("trReturn").style.display = "none";
        document.getElementById("trDG").style.display = "none";
        document.getElementById("trMode").style.display = "none";
    }
    else
        if (document.all["rbRecord"].checked == true)
        {
            document.getElementById("trReturn").style.display = "none";
            document.getElementById("trDG").style.display = "none";
            document.all["txLimit"].disabled = false;
        }
        else if (document.all["rbReturn"].checked == true)
        {
            document.getElementById("trReturn").style.display = "table-row";
            document.getElementById("trDG").style.display = "none";
            document.all["txLimit"].disabled = false;
            document.all["txLimit"].ReadOnly = true;
            document.all["txLimit"].style.backgroundColor = "LightGrey";
        }
        else if (document.all["rbEXT"].checked == true)
        {
            document.getElementById("trReturn").style.display = "none";
            document.getElementById("trDG").style.display = "table-row";
            document.all["txLimit"].ReadOnly = true;
            document.all["txLimit"].style.backgroundColor = "LightGrey";
        }
}
//1110207      Cloud   1101502 [考試院]新增調案性質選項-S
function SetOtherOrgInfo(argTarget) {
    var bOrgWork = false;
    var strNewReason = "空白";
    //檢查是否已經有原因

    var bhasSeaSon = false;
    if (document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].value != "1") {
        strNewReason = document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].text;
    }
    for (i = 2; i <= document.all["dg1"].rows.length ; i++) {
        if (document.all["dg1__ctl" + i + "_txDoc"].value == "")
            continue;

        var IdtxReason = "dg1__ctl" + i + "_lbReason";
        if (document.all[IdtxReason].textContent != "" && document.all[IdtxReason].textContent != strNewReason) {
            bhasSeaSon = true;
            break;
        }
    }
    if (bhasSeaSon) {
        if (!window.confirm("切換調案性質，調案原因將會一併調整，\n(按[確定]將一併調整為「" + strNewReason + "」，按[取消]則不進行切換。)")) {
            //設定為原調案性質
            document.all.dlUsageType.selectedIndex = document.all["h_txUsageTypeIndex"].value;
            return;
        }
    }

    switch (document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].value) {
        case "1":
            bOrgWork = true;
            document.all["txDocNo"].value = "";
            document.all["txFromNo"].value = "";
            document.all["txFromOrg"].value = "";
            document.all["txFromSubject"].value = "";
            document.all["txFromTel"].value = "";
            document.all["txFromEmp"].value = "";
            document.all["txDueDate"].value = "";
            break;
        case "2":
        case "3":
            bOrgWork = false;
            document.all["txDueDate"].value = "";
            strNewReason = document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].text;
            break;
        case "4":
            bOrgWork = false;
            document.all["txDueDate"].value = "1991231";
            strNewReason = document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].text;
            break;
    }
    SetOtherInfo();

    var strDgReason = "";
    if (!bOrgWork) {
        //非機關內，設定-移除線上調檔-設定原因
        SetDLBor("NoOnLine");
        strDgReason = document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].text;
    }
    else {
        //機關內，設定-增加線上調檔-移除原因
        SetDLBor("AddOnLine");
    }
    //設定原因
    for (i = 2; i <= document.all["dg1"].rows.length ; i++) {

        var IdtxReason = "dg1__ctl" + i + "_lbReason";

        if (document.all["dg1__ctl" + i + "_txDoc"].value == "" && document.all["dg1__ctl" + i + "_txCase"].value == "")
            continue;
        document.all[IdtxReason].textContent = strDgReason;
    }
    //紀錄當前所選的index
    document.all["h_txUsageTypeIndex"].value = document.all.dlUsageType.selectedIndex;
}
function SetDLBor(argMode) {
    /*<asp:ListItem Value="1">檔案原件</asp:ListItem>
      <asp:ListItem Value="2">線上調檔</asp:ListItem>
      <asp:ListItem Value="3" Selected="True">檔案複製品</asp:ListItem>*/
    ClearDL(document.all["dlBorType"]);

    var DropListChild = document.createElement("OPTION");
    DropListChild.text = "檔案原件";
    DropListChild.value = "1";
    document.all["dlBorType"].options.add(DropListChild);

    if (argMode == "AddOnLine") {
        DropListChild = document.createElement("OPTION");
        DropListChild.text = "線上調檔";
        DropListChild.value = "2";
        document.all["dlBorType"].options.add(DropListChild);
    }

    DropListChild = document.createElement("OPTION");
    DropListChild.text = "檔案複製品";
    DropListChild.value = "3";
    document.all["dlBorType"].options.add(DropListChild);
    document.all.txLastBorType.value = "1";

}
function ClearDL(argObj) {
    for (var i = 0 ; i < argObj.length; i++)
        argObj.remove(0);

    argObj.length = 0;
    return;
}
function SetOtherInfo() {
    var bOrgWork = true;
    if (document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].value != "1") {
        bOrgWork = false;
    }
    document.all["txDocNo"].disabled = bOrgWork;
    document.all["txFromTel"].disabled = bOrgWork;
    document.all["txFromEmp"].disabled = bOrgWork;
    document.all["txDueDate"].disabled = bOrgWork;
}
function Checkdlurg()//檢核調案性質為他機關時-1.儲存/傳送前他機關區塊需有文號、預計歸還日期
{
    var rtn = true;
    var errstring = "";
    if (document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].value != "1")//他機關借調
    {
        if (document.all["txDocNo"].value == "") {
            errstring = "來文文號";
        }
        if (document.all["txDueDate"].value == "") {
            if (errstring != "")
                errstring += "、";
            errstring += "預計歸還日期";
        }
        if (errstring != "")
        { alert("調案性質非[機關內借調]時他機關借調之" + errstring + "不可為空白。"); rtn = false; }
    }
    return rtn;
}
//1110207      Cloud   1101502 [考試院]新增調案性質選項-E
//1120614   Cloud   1120361 弱掃修正
function HtmlEncode(s) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}
//1130924 Cloud 1130941 弱掃修改
var arrDesc = new Array("txDesc");
function SetDescDecode() {
    for (var iDsc = 0; iDsc < arrDesc.length; iDsc++) {
        htmlDecode("dg1__ctl2_" + arrDesc[iDsc]);
    }
}
function htmlDecode(argId) {
    var tempVal = document.all[argId].textContent;
    if (tempVal != "") {
        var div = document.createElement('div');
        div.innerHTML = tempVal;
        document.all[argId].textContent = div.textContent;
    }
}
//* 1140416      Cloud   1140148 增加註冊備註欄位ONBLUR檢核
function CheckRemark(argId) {
   
}

//* 1140922     Cloud   1141137 修改支援外貿檔號拆開顯示
function SetFileNoToColumn(argFileNo, argIndex) {
    if (argFileNo == "") {
        document.all[argIndex[0] + "__" + argIndex[2] + "_lbYear"].value = "";
        document.all[argIndex[0] + "__" + argIndex[2] + "_lbCls"].value = "";
        document.all[argIndex[0] + "__" + argIndex[2] + "_lbCountry"].value = "";
        document.all[argIndex[0] + "__" + argIndex[2] + "_lbOffice"].value = "";
        document.all[argIndex[0] + "__" + argIndex[2] + "_lbProduct"].value = "";
        document.all[argIndex[0] + "__" + argIndex[2] + "_lbVol"].value = "";
        document.all[argIndex[0] + "__" + argIndex[2] + "_lbSeq"].value = "";
    }
    else {
        var arrFileNo = argFileNo.split(document.all["fileno_sep"].value);
        if (arrFileNo.length == 5) {
            document.all[argIndex[0] + "__" + argIndex[2] + "_lbYear"].value = arrFileNo[0];
            document.all[argIndex[0] + "__" + argIndex[2] + "_lbCls"].value = arrFileNo[1];
            if (arrFileNo[2].split('-').length == 3) {
                document.all[argIndex[0] + "__" + argIndex[2] + "_lbCountry"].value = arrFileNo[2].split('-')[0];
                document.all[argIndex[0] + "__" + argIndex[2] + "_lbOffice"].value = arrFileNo[2].split('-')[1];
                document.all[argIndex[0] + "__" + argIndex[2] + "_lbProduct"].value = arrFileNo[2].split('-')[2];
            }
            else
                document.all[argIndex[0] + "__" + argIndex[2] + "_lbCountry"].value = arrFileNo[2];
            document.all[argIndex[0] + "__" + argIndex[2] + "_lbVol"].value = arrFileNo[3];
            document.all[argIndex[0] + "__" + argIndex[2] + "_lbSeq"].value = arrFileNo[4];
        }
        else if (arrFileNo.length == 7)//避免檔號分割符號設定成-
        {
            document.all[argIndex[0] + "__" + argIndex[2] + "_lbYear"].value = arrFileNo[0];
            document.all[argIndex[0] + "__" + argIndex[2] + "_lbCls"].value = arrFileNo[1];
            document.all[argIndex[0] + "__" + argIndex[2] + "_lbCountry"].value = arrFileNo[2];
            document.all[argIndex[0] + "__" + argIndex[2] + "_lbOffice"].value = arrFileNo[3];
            document.all[argIndex[0] + "__" + argIndex[2] + "_lbProduct"].value = arrFileNo[4];
            document.all[argIndex[0] + "__" + argIndex[2] + "_lbVol"].value = arrFileNo[5];
            document.all[argIndex[0] + "__" + argIndex[2] + "_lbSeq"].value = arrFileNo[6];
        }
        else {//-拆不開時...?
            document.all[argIndex[0] + "__" + argIndex[2] + "_lbYear"].value = argFileNo;
        }
    }
}