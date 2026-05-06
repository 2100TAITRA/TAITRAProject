/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 95.12.26		David	951280	列印表有資料卻無法列印
 * 97.03.31		Cola	0970269	修正當未執行降解密核定資訊時，就點選更新註記或完成降解密時，程式處理會錯誤之問題
 * 97.03.31		Cola	0970284	修正當解密為普通件時，新主旨應抓取DOC_EXTRA.IN_SUBJECT
 * 97.07.25		Cola	0970689	修正按下設定，僅能將前幾筆資訊更新之Bug
 * 97.10.01		Cola	0970649	(交通部)新增櫥位號加入功能
 *100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
 * 1041026		Kenny	1040759	修正帶回通知機關後出現機關代碼格式不正確錯誤訊息 
 * 1050429		Kenny	1040759	修正使用欄位錯誤
 * 1050801      Kenny   1050710 增加密等檢核，當新密等高於原密等時增加以提示訊息告知
 * 1060608      Justin  1050087 二代公文修改
 * 1070103		Cloud	1061244	修改支援同密等時，設定降解密條件及應解密日期
 * 1070830      Zen     1070678 弱掃Ajax修正
 * 1090917      Cloud	1090571 (信保)調整目次號欄位長度為6碼
 * 1110110      Cloud   1111275 增加刪除通知功能
 * 1140609	    Daniel	1140794  修正在未設定任何解密相關資訊的情況下，系統仍可正常執行
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var iCallID_txPlanNo;
var iCallID_txDocNo;

//DataGrid選取陣列
var selectedKeyArr = new Array();
var selectedKeyIdx = 0;

//指定DataGrid欄位
var strTableFields = new Array("_txDocNo1", "_lbFileNo", "_lbOldSec", "_lbNewSec", "_lbSecDate", "_lbApplyLimit", "_lbCond");
//1060608 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

//1070830 Zen 1070678 弱掃Ajax修正
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
function ClientOnLoad() {
    //1050801   Kenny   [1050710]   一併移除無用CODE--Start--
    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmp", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //1050801   Kenny   [1050710]   一併移除無用CODE--End--
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    jf_SecOnChange();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060608 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e) {
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    /*var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}*/

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        //95.12.28 951280 David
        case "ibtSourceOrgNo": //產生機關提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C2.aspx";
            jf_OpenChildWin(pUrl, "EAT400C2", 750, 500);
            break;
        case "btSet":
            Page_BlockSubmit = true;
            btSetProcess();
            break;
        case "btHelp": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
            break;
        case "btAdd2": //所有待降解密公文
            //檢核清理批號不可空白
            if (document.all["txPlanNo"].value == "") {
                alert("清理批號不可空白");
                //1060608 Justin [1050087] 二代公文修改
                //document.all["txPlanNo"].focus();
                $('#txPlanNo').focus();
                Page_BlockSubmit = true;
            }
            else {
                if (window.confirm("批號內公文可能過多，是否仍要加入?")) {
                    Page_BlockSubmit = false;
                    //1060608 Justin [1050087] 二代公文修改
                    IsServerHandling = true;
                    __doPostBack("btAdd2", "");
                }
                else
                    Page_BlockSubmit = true;
            }
            break;
        case "btAdd1": //依照承辦單位、承辦人加入
            //檢核承辦單位不可空白
            if (document.all["dlDept"].options(document.all["dlDept"].selectedIndex).text == "") {
                alert("承辦單位不可空白");
                //document.all["dlDept"].focus();
                Page_BlockSubmit = true;
            }
            else if (document.all["txPlanNo"].value == "") {
                alert("清理批號不可空白");
                //1060608 Justin [1050087] 二代公文修改
                //document.all["txPlanNo"].focus();
                $('#txPlanNo').focus();
                Page_BlockSubmit = true;
            }
            else {
                Page_BlockSubmit = false;
                //1060608 Justin [1050087] 二代公文修改
                IsServerHandling = true;
                __doPostBack("btAdd1", "");
            }
            break;
        case "btAdd3":
            if (document.all["txDocNo"].value == "") {
                //100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
                //alert("公文文號不可空白");
                alert("文(編)號不可空白");
                //1060608 Justin [1050087] 二代公文修改
                //document.all["txDocNo"].focus();
                $('#txDocNo').focus();
                Page_BlockSubmit = true;
            }
            else if (document.all["txPlanNo"].value == "") {
                alert("清理批號不可空白");
                //1060608 Justin [1050087] 二代公文修改
                //document.all["txPlanNo"].focus();
                $('#txPlanNo').focus();
                Page_BlockSubmit = true;
            }
            else {
                Page_BlockSubmit = false;
                //1060608 Justin [1050087] 二代公文修改
                IsServerHandling = true;
                __doPostBack("btAdd3", "");
            }
            break;
            //[0970649]Add by Cola 新增櫥位號加入功能
        case "btAdd_Stock":
            if (document.all["txStockNoS"].value == "" && document.all["txStockNoE"].value == "") {
                alert("櫥位號區間不可均為空白");
                //1060608 Justin [1050087] 二代公文修改
                //document.all["txStockNoS"].focus();
                $('#txStockNoS').focus();
                Page_BlockSubmit = true;
            }
            else if (document.all["txPlanNo"].value == "") {
                alert("清理批號不可空白");
                //1060608 Justin [1050087] 二代公文修改
                //document.all["txPlanNo"].focus();
                $('#txPlanNo').focus();
                Page_BlockSubmit = true;
            }
            else {
                Page_BlockSubmit = false;
                //1060608 Justin [1050087] 二代公文修改
                IsServerHandling = true;
                __doPostBack("btAdd_Stock", "");
            }
            break;
        case "btAdd5":
            //檢核規則：分類號、案次號、卷次號、項次號所組成的次序，重頭檢查到最後一個
            //除了最後一項有值的可不一樣之外，其他欄位必須相等。
            //此外，如果四項皆有值且相同，則允許年度號可填入不同的起迄年度
            //如果沒輸入滿，則只允許年度不填，或是填相同年度的值
            //STEP 1：檢核分類號、案次號、卷次號、項次號
            Page_BlockSubmit = true;
            var strErrMsg = "";
            var strFileYearS = jf_Trim(document.all.txFileYearS.value);
            var strFileYearE = jf_Trim(document.all.txFileYearE.value);
            var strFileClsS = jf_Trim(document.all.txFileClsS.value);
            var strFileClsE = jf_Trim(document.all.txFileClsE.value);
            var strFileCaseS = jf_Trim(document.all.txFileCaseS.value);
            var strFileCaseE = jf_Trim(document.all.txFileCaseE.value);
            var strFileVolS = jf_Trim(document.all.txFileVolS.value);
            var strFileVolE = jf_Trim(document.all.txFileVolE.value);
            var strFileSeqS = jf_Trim(document.all.txFileSeqS.value);
            var strFileSeqE = jf_Trim(document.all.txFileSeqE.value);

            if ((strFileYearE == "") && (strFileClsE == "") && (strFileCaseE == "") && (strFileVolE == "") && (strFileSeqE == "")) {
                if ((strFileYearS == "") && (strFileClsS == "") && (strFileCaseS == "") && (strFileVolS == "") && (strFileSeqS == "")) {
                    alert("請輸入檔號起訖值");
                    return;
                }
                else {
                    document.all.txFileYearE.value = strFileYearS;
                    document.all.txFileClsE.value = strFileClsS;
                    document.all.txFileCaseE.value = strFileCaseS;
                    document.all.txFileVolE.value = strFileVolS;
                    document.all.txFileSeqE.value = strFileSeqS;

                    strFileYearE = strFileYearS;
                    strFileClsE = strFileClsS;
                    strFileCaseE = strFileCaseS;
                    strFileVolE = strFileVolS;
                    strFileSeqE = strFileSeqS;
                }
            }


            //檢查項次號兩者其中之一是否有輸入，有表示分類號、案次號、卷次號需相同
            if ((strFileSeqS != "") || (strFileSeqE != "")) {
                if ((strFileVolE == strFileVolS) && (strFileCaseE == strFileCaseS) && (strFileClsE == strFileClsS)) {
                    //子檢查 1. 起必須小於迄
                    if (strFileSeqS > strFileSeqE) {
                        strErrMsg += "項次號起必須小於迄，請重新輸入\n";
                    }
                    //子檢查 2. 以上層級不能為空白
                    if ((strFileVolS == "") || (strFileCaseS == "") || (strFileClsS == "")) {
                        strErrMsg += "項次號以上之層級必須相同但不能為空白\n";
                    }
                    //子檢查3. 案次號以下層級，則年度號必須有值，且除非四個都一樣，否則年度號都要一樣
                    if ((strFileYearS == "") && (strFileYearE == "")) {
                        strErrMsg += "輸入到案次號以下層級，年度號必須有值\n";
                    }
                    else {
                        if (strFileSeqS != strFileSeqE) {
                            if (strFileYearS != strFileYearE)
                                strErrMsg += "不同檔號之年度號必須相等\n";
                        }
                        else {
                            //相同檔號只需檢核年度號起必須小於迄
                            if (strFileYearS > strFileYearE) {
                                strErrMsg += "項次號起必須小於迄，請重新輸入\n";
                            }
                        }
                    }
                }
                else {
                    strErrMsg += "項次號以上之層級必須相同但不能為空白\n";
                }
            }
            else if ((strFileVolS != "") || (strFileVolE != "")) {
                if ((strFileCaseE == strFileCaseS) && (strFileClsE == strFileClsS)) {
                    //子檢查 1. 起必須小於迄
                    if (strFileVolS > strFileVolE) {
                        strErrMsg += "卷次號起必須小於迄，請重新輸入\n";
                    }
                    //子檢查 2. 以上層級不能為空白
                    if ((strFileCaseS == "") || (strFileClsS == "")) {
                        strErrMsg += "卷次號以上之層級必須相同但不能為空白\n";
                    }
                    //子檢查3. File_Year有值則檢核年度號是否相同
                    if ((strFileYearS == "") && (strFileYearE == "")) {
                    }
                    else {
                        if (strFileYearS != strFileYearE)
                            strErrMsg += "年度號起迄必須相同或兩者為空白\n";
                    }
                }
                else {
                    strErrMsg += "卷次號以上之層級必須相同但不能為空白\n";
                }
            }
            else if ((strFileCaseE != "") || (strFileCaseS != "")) {
                if (strFileClsE == strFileClsS) {
                    //子檢查 1. 起必須小於迄
                    if (strFileCaseE > strFileCaseS) {
                        strErrMsg += "案次號起必須小於迄，請重新輸入\n";
                    }
                    //子檢查 2. 以上層級不能為空白
                    if (strFileCaseS == "") {
                        strErrMsg += "案次號以上之層級必須相同但不能為空白\n";
                    }
                    //子檢查3. File_Year有值則檢核年度號是否相同
                    if ((strFileYearS == "") && (strFileYearE == "")) {
                    }
                    else {
                        if (strFileYearS != strFileYearE)
                            strErrMsg += "年度號起迄必須相同或兩者為空白\n";
                    }
                }
                else {
                    strErrMsg += "案次號以上之層級必須相同但不能為空白\n";
                }
            }

            if (strErrMsg != "") {
                alert(strErrMsg);
                //1060608 Justin [1050087] 二代公文修改
                //document.all.txFileClsS.focus();
                $('#txFileClsS').focus();
                return;
            }
            else if (document.all["txPlanNo"].value == "") {
                alert("清理批號不可空白");
                //1060608 Justin [1050087] 二代公文修改
                //document.all["txPlanNo"].focus();
                $('#txPlanNo').focus();
                Page_BlockSubmit = true;
                return;
            }
            else {
                Page_BlockSubmit = false;
                //1060608 Justin [1050087] 二代公文修改
                IsServerHandling = true;
                __doPostBack("btAdd5", "");
            }
            break;
    }
}

//處理設定之Client Button
//document.all.btSet.onclick = btSetProcess;
function btSetProcess() {
    Page_BlockSubmit = true;
    var SetCount = 0;
    if (document.all["dlSec"].selectedIndex != -1)
        SetCount++;

    if (jf_Trim(document.all["txSecret"].value) != "")
        SetCount++;
    if (document.all["txSecret"].className == "DisplayOnly")
        SetCount++;

    if (document.all["dlApplyLimit"].selectedIndex != -1)
        SetCount++;

    if (jf_Trim(document.all["txCond"].value) != "")
        SetCount++;
    if (document.all["txCond"].className == "DisplayOnly")
        SetCount++;

    if (jf_Trim(document.all["txComment"].value) != "")
        SetCount++;
    if (jf_Trim(document.all["txInspect"].value) != "")
        SetCount++;

    //alert(SetCount);

    if (SetCount != 6) {
        alert("相關設定資訊欄位不可為空");
    }
    else {
        jf_CheckSetUpdateNote();
        BringToNextCb("", "2");
    }

}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060608 Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
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

    //1060608 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;
    var Index = ChooseType();
    switch (xObjectName) {
        case "btOpen":
            if (jf_Trim(document.all["txPlanNo"].value) != "")
                Page_BlockSubmit = false;
            else {
                alert("清理批號不可為空白");
                Page_BlockSubmit = true;
                //1060608 Justin [1050087] 二代公文修改
                //document.all["txPlanNo"].focus();
                $('#txPlanNo').focus();
            }
            //1060608 Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
        case "btClean":
            Page_BlockSubmit = false;
            //1060608 Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave": //更新註記
            Page_BlockSubmit = !jf_CheckBeforSave();
            //1060608 Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btDelete": //刪除註記
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060608 Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btFinish": //完成降解密
            Page_BlockSubmit = false;
            //[0970269]Add by Cola 判斷新密等是否為空 -- start --
            if (!CheckSet())
                Page_BlockSubmit = true;
            //Cola -- end --			
            //1060608 Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btSearch": //查詢註記現況 依計畫批號開啟dg1		
            if (document.all["txPlanNo"].value == "") {
                alert("清理批號不可空白");
                Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = false;
            //1060608 Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btPrint": //紀錄單列印
            //Page_BlockSubmit = !jf_ConfirmPrint();
            //95.12.26 951280 David
            if (CheckcbSelect2())
                Page_BlockSubmit = false;
            else {
                Page_BlockSubmit = true;
                //alert("請至少勾選一筆欲列印項目");
            }

            //1060608 Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btPreview": //意見表列印
            //Page_BlockSubmit = !jf_ConfirmPreview();
            //95.12.26 951280 David
            if (CheckcbSelect2())
                Page_BlockSubmit = false;
            else {
                Page_BlockSubmit = true;
                //alert("請至少勾選一筆欲列印項目");
            }
            //1060608 Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

            //以下屬於DataGrid ToolBar
        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dg1", "_cbSelect" + Index);
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dg1", "_cbSelect" + Index);
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_SelectClear("dg1", "_cbSelect" + Index);
            break;
        case "btDeleteSelected":
            Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect3", strTableFields);
            //1060608 Justin [1050087] 二代公文修改
            //jf_SelectBarSubmit();
            jf_SelectBarSubmit(xObjectName);
            break;
            /*case "btUp":
                Page_BlockSubmit = true;
                jf_RowUp("dg1", "_cbSelect", strTableFields);
                break;
            case "btDown":
                Page_BlockSubmit = true;
                jf_RowDown("dg1", "_cbSelect", strTableFields);
                break;*/
            //* 1110110      Cloud   1111275 增加刪除通知功能
        case "btCheck":
            Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave() {
    var bRtnbool = false;

    if (jf_CheckBeforSave()) {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew) {
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
function jf_CheckBeforSave() {
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txPlanNo"].value == "") {
        strErrMsg += "計畫批號不可空白\n";
        //1060608 Justin [1050087] 二代公文修改
        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
    }

    if (document.all.dg1.rows.length < 2) {
        strErrMsg += "至少必須有一筆資料以上\n";
        //1060608 Justin [1050087] 二代公文修改
        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
    }

    //[0970269]Modify by Cola 修正處理方式，避免Alert訊息讓使用者困擾 -- start --
    var CurrCount = document.all.dg1.rows.length;
    var CheckCount = 0;
    var DocNoCount = 0;
    for (m = 2; m < CurrCount + 1; m++) {
        if (document.all["dg1__ctl" + m + "_cbSelect2"].checked) {
            CheckCount++;
        }
        if (jf_Trim(document.all["dg1__ctl" + m + "_txDocNo1"].value) != "") {
            DocNoCount++;
        }
    }
    var ErrMsg = "";
    if (CheckCount == 0)
        strErrMsg += "請至少勾選一筆欲更新項目";
    if (DocNoCount == 0)
        strErrMsg += "請先加入資料";

    /*if(!CheckcbSelect2())
	{
		strErrMsg += "未勾選更新項目\n";
	}*/
    //Cola -- end --

    /*if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
	}
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;*/

    if (strErrMsg != "") {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    //[0970269]Add by Cola 若過關則檢查有無設定過 -- start --
    //1040416 Cloud	Merge 因密等普通改為空白，取消判斷。
    /*
	else 
	{
		var CurrCount = document.all.dg1.rows.length;
		var ErrMsg = "";
		for(m=2;m<CurrCount+1;m++)
		{		
			if(jf_Trim(document.all["dg1__ctl"+m+"_lbNewSec"].value) == "" && document.all["dg1__ctl"+m+"_cbSelect2"].checked)
			{
				//100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
				//ErrMsg += "第"+jf_Trim(document.all["dg1__ctl"+m+"_lbSEQ_NO"].innerText)+"筆：公文文號 "+jf_Trim(document.all["dg1__ctl"+m+"_txDocNo1"].value)+"\n";
				ErrMsg += "第"+jf_Trim(document.all["dg1__ctl"+m+"_lbSEQ_NO"].innerText)+"筆：文(編)號 "+jf_Trim(document.all["dg1__ctl"+m+"_txDocNo1"].value)+"\n";
			}
		}		

		if(ErrMsg != "")
			alert(ErrMsg+"尚未進行『降解密核定資訊』之設定，請先將所有資料都執行過該設定後，再執行更新註記或完成降解密。");
		
		if(ErrMsg != "")
			bRtnbool = false;
		else
			bRtnbool = true;
	}
	*/
    //Cola -- end --

    return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert() {
    var InValidName = "";
    var InValidControlName = "";

    for (var i = 2; i <= document.all.dg1.rows.length; i++) {
        //txInput1不為空白時
        if (document.all["dg1__ctl" + i + "_txInput1"].value != "") {
            //txInput2不可空白
            if (document.all["dg1__ctl" + i + "_txInput2"].value == "") {
                InValidName += ",Input2不可空白";
                InValidControlName = "dg1__ctl" + i + "_txInput2";
            }

            if (InValidName != "") {
                InValidName = InValidName.substr(1, InValidName.length);
                //1060608 Justin [1050087] 二代公文修改
                //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
                //document.all[InValidControlName].focus();
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
                $('#' + InValidControlName).focus();
                return false;
            }
        }
    }
    return true;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult) {
    //webserver回傳後動作
    if (argResult.id == iCallID_txPlanNo) {
        if (jf_IsWebServiceSuccess(argResult)) {
            if (argResult.value.RtnStr == "nodata") {
                alert("無此清理批號，請重新輸入");
                //1060608 Justin [1050087] 二代公文修改
                //document.all.txPlanNo.focus();
                $('#txPlanNo').focus();
            }
            else if (argResult.value.RtnStr == "fail") {
                alert("呼叫WebService CheckPlanMainByKey失敗");
                //1060608 Justin [1050087] 二代公文修改
                //document.all.txPlanNo.focus();
                document.all.txDocNo.value = "";
                $('#txPlanNo').focus();
            }
            else {
                //95.10.04 David
                //1060608 Justin [1050087] 二代公文修改
                //if(jf_Trim(document.all["dg1__ctl2_txDocNo1"].value) != "" && jf_Trim(document.all["dg1__ctl2_lbFileNo"].innerText) != "" )//[0970649]Modify by Cola 因應FileNo更換為label屬性, 因此value改為innerText
                if (jf_Trim(document.all["dg1__ctl2_txDocNo1"].value) != "" && jf_Trim(document.all["dg1__ctl2_lbFileNo"].textContent) != "") {	/*				
					var Rtnbool = window.confirm("更換批號將會清空DataGrid項目，是否繼續執行?");	
					if (Rtnbool)
					{
						if (document.getElementById("GridTable"))
							document.getElementById("GridTable").removeNode(true);
						previousPlanNo = document.all.txPlanNo.value;						
					}
					else
					{
						if(jf_Trim(previousPlanNo) != "")
							document.all.txPlanNo.value = previousPlanNo;
					}
				
					if (argResult.value.RtnStr == "cleanok")
					{
						//document.all.btFinish.disabled = false;
					}
					else
					{
						//alert(document.all.btFinish.id);
					
					}*/
                }
            }
        }
        else {
            //document.all["txReadOnly"].value = "";
        }
    }
    else if (argResult.id == iCallID_txDocNo) {
        if (jf_IsWebServiceSuccess(argResult)) {
            if (!argResult.value.RtnBool) {
                //100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
                //alert("清理計畫中無此公文文號，請重新輸入");
                alert("清理計畫中無此文(編)號，請重新輸入");
                //1060608 Justin [1050087] 二代公文修改
                //document.all.txDocNo.focus();
                $('#txDocNo').focus();
            }
            else {


            }
        }
        else {
            //document.all["txReadOnly"].value = "";
        }
    }

    //95.12.28 951280 David
    if (argResult.id == ws_OrgID) {
        if (argResult.value.m_bSuccess) {
            var tempOrgName = argResult.value.RtnField0;
            //1041026	Kenny	[1040759]	修改把txSourceOrgName欄位值設定給txTempOrg行為....
            //var tempOrgNo = jf_Trim(document.all["txSourceOrgName"].value);
            var tempOrgNo = jf_Trim(document.all["txTempOrg"].value);
            document.all["txSourceOrgName"].value = tempOrgName;
            document.all["txTempOrg"].value = tempOrgNo;
        }
        else {
            //document.all["txSourceOrgName"].value = argResult.value.RtnField0;
            alert("所輸入的機關代碼不合法，請確認");
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

    if (argCallerId == "EAT400C1") {
        document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
        if (document.all["txPlanNo"].value != "") {
            Page_BlockSubmit = false;
            document.all.ToolBarSenderID.value = "btOpen";
            if (Page_BlockSubmit == false) {
                IsServerHandling = true;
                jf_ShowWaitState();
                __doPostBack("tbTool", 0);
            }
        }
        //1060608 Justin [1050087] 二代公文修改
        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
    }

    //95.12.28 951280 David
    if (argCallerId == "EAT400C2") {
        //1041026	Kenny	[1040759]	修正承接回傳值使用參數，改為使用txTempOrg
        //document.all["txOrgNo"].value  = document.all["lbReturnValue"].options[0].text;
        document.all["txTempOrg"].value = document.all["lbReturnValue"].options[0].text;
        document.all["txSourceOrgName"].value = document.all["lbReturnValue"].options[0].value;
        //1060608 Justin [1050087] 二代公文修改
        //document.all["txSourceOrgName"].focus();
        $('#txSourceOrgName').focus();
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
//新密等為普通時，保密期限和解密條件ReadOnly
//為密以上，保密期限與解密條件Enable
function jf_SecOnChange() {
    //1060609 Justin [1050087] 二代公文修改
    //var selectNum = document.all.dlSec.options(document.all.dlSec.selectedIndex).value;
    //1140609	Daniel	1140794 設定隱藏欄位紀錄新密等代碼
    var CurrCount = document.all.dg1.rows.length;
    var selectNum = document.all.dlSec.options[document.all.dlSec.selectedIndex].value;
    if (selectNum > 1) {
        document.all["txSecret"].readOnly = false;
        document.all["txSecret"].className = "RequireField";
        document.all["txCond"].readOnly = false;
        document.all["txCond"].className = "RequireField";

        //2008.11.7 Modify by Cola 新增應用限制之控制		
        ddlSelect("dlApplyLimit", document.all["ENV_OD_APPLY_LIMIT_BY_SEC"].value.substring(1, 2));
    }
    else {
        document.all["txSecret"].readOnly = true;
        document.all["txSecret"].className = "DisplayOnly";
        document.all["txSecret"].value = "";
        document.all["txCond"].readOnly = true;
        document.all["txCond"].className = "DisplayOnly";
        document.all["txCond"].value = "";

        //2008.11.7 Modify by Cola 新增應用限制之控制		
        ddlSelect("dlApplyLimit", document.all["ENV_OD_APPLY_LIMIT_BY_SEC"].value.substring(0, 1));
    }
}
function ddlSelect(argSelectId, argSelectValue) {
    var a = 0;
    if (argSelectValue == "")
        return;
    for (var i = 0; i < document.all[argSelectId].length; i++) {
        if (document.all[argSelectId].options[i].value == argSelectValue) {
            a = i;
        }
    }
    document.all[argSelectId].selectedIndex = a;
}

var previousPlanNo = "";
function ObjOnBlur(argObjName) {
    //1090917 Zen 1090571 (信保)調整目次號欄位長度為6碼
    var nFileSeqLength = 3;
    if (document.all['H_OrgNickName'].value == 'SMEG')
        nFileSeqLength = 6;

    switch (argObjName) {
        case "txPlanNo": //清理批號檢查Plan_Main有無存在
            if (document.all.txPlanNo.value != "") {
                var param = new Array(1);
                param[0] = document.all.txPlanNo.value;
                var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckPlanMainByKey", false, param);
                iCallID_txPlanNo = callObj.id;
                OnWSResult(callObj);
            }
            break;
        case "txDocNo":
            if (jf_Trim(document.all.txDocNo.value) != "") {
                var param = new Array(1);
                param[0] = jf_Trim(document.all.txDocNo.value);
                var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckDMPDByDocNo", false, param);
                iCallID_txDocNo = callObj.id;
                OnWSResult(callObj);
            }
            break;
        case "txFileYearS":
            if (document.all.txFileYearS.value != "") {
                document.all.txFileYearS.value = jf_PADL(document.all.txFileYearS.value, 3, '0');
                if (!jf_IsNum(document.all.txFileYearS.value)) {
                    alert("年度號(起)必須為數字格式，請重新輸入");
                    //1060608 Justin [1050087] 二代公文修改
                    //document.all.txFileYearS.focus();
                    $('#txFileYearS').focus();
                }
                else {
                    document.all.txFileYearS.value = jf_PADL(document.all.txFileYearS.value, 3, '0');
                }
            }
            break;
        case "txFileYearE":
            if (document.all.txFileYearE.value != "") {
                document.all.txFileYearE.value = jf_PADL(document.all.txFileYearE.value, 3, '0');
                if (!jf_IsNum(document.all.txFileYearE.value)) {
                    alert("年度號(迄)必須為數字格式，請重新輸入");
                    //1060608 Justin [1050087] 二代公文修改
                    //document.all.txFileYearE.focus();
                    $('#txFileYearE').focus();
                }
                else {

                }
            }
            break;
        case "txSecret":
            if (document.all.txSecret.value != "") {
                if (jf_CheckCDATE(document.all.txSecret.value)) {
                    if (document.all.txSecret.value.length < 7) {
                        document.all.txSecret.value = jf_PADL(document.all.txSecret.value, 7, '0');
                    }
                }
                else {
                    alert("保密期限日期格式錯誤，請重新輸入");
                    //1060608 Justin [1050087] 二代公文修改
                    //document.all.txSecret.focus();
                    $('#txSecret').focus();
                }
            }
            break;
        case "txFileSeqS":
            if (document.all.txFileSeqS.value != "") {
                //1090917 Zen 1090571 (信保)調整目次號欄位長度為6碼--begin
                //if (document.all.txFileSeqS.length != 3) {
                //    document.all.txFileSeqS.value = jf_PADL(document.all.txFileSeqS.value, 3, '0');
                //}
                if (document.all.txFileSeqS.length != nFileSeqLength) {
                    document.all.txFileSeqS.value = jf_PADL(document.all.txFileSeqS.value, nFileSeqLength, '0');
                }
                //1090917 Zen 1090571 (信保)調整目次號欄位長度為6碼--end
            }
            break;
        case "txFileSeqE":
            if (document.all.txFileSeqE.value != "") {
                //1090917 Zen 1090571 (信保)調整目次號欄位長度為6碼--begin
                //if (document.all.txFileSeqE.length != 3) {
                //    document.all.txFileSeqE.value = jf_PADL(document.all.txFileSeqE.value, 3, '0');
                //}
                if (document.all.txFileSeqE.length != nFileSeqLength) {
                    document.all.txFileSeqE.value = jf_PADL(document.all.txFileSeqE.value, nFileSeqLength, '0');
                }
                //1090917 Zen 1090571 (信保)調整目次號欄位長度為6碼--end
            }
            break;
        case "txFileVolE":
            if (document.all.txFileVolE.value != "") {
                if (document.all.txFileVolE.length != 4) {
                    document.all.txFileVolE.value = jf_PADL(document.all.txFileVolE.value, 4, '0');
                }
            }
            break;
        case "txFileVolS":
            if (document.all.txFileVolS.value != "") {
                if (document.all.txFileVolS.length != 4) {
                    document.all.txFileVolS.value = jf_PADL(document.all.txFileVolS.value, 4, '0');
                }
            }
            break;


    }
}

//設定降解密核定資訊副程式
function jf_CheckSetUpdateNote() {
    //STEP 1. 檢核至少有勾選一筆
    if (document.all["dg1"] == null) {
        alert("無資料加入");
        return;
    }

    var len = document.all["dg1"].rows.length + 1;
    var blDataExist = false;
    selectedKeyArr = new Array();
    selectedKeyIdx = 0;
    //1050801   Kenny   [1050710]   增加檢核密等資訊
    var blSecChecked = true;

    //紀錄DataGrid所選取項目之Index陣列
    for (i = 2; i < len; i++) {
        var obj = document.all["dg1" + "__ctl" + i + "_cbSelect"];
        if (obj.checked) {
            blDataExist = true;
            selectedKeyArr[selectedKeyIdx] = i;
            selectedKeyIdx++;
            //1050801   Kenny   [1050710]   增加檢核密等資訊
            if (document.all["dlSec"].options[document.all["dlSec"].selectedIndex].value > document.all["dg1" + "__ctl" + i + "_H_txOldSec"].value)
                blSecChecked = false;
        }
    }

    if (blDataExist == false) {
        alert("至少必須選取一筆資料");
        return;
    }

    //1050801   Kenny   [1050710]   增加檢核密等資訊--Start--
    if (blSecChecked == false) {
        alert("新密等必須比舊密等之機密等級低");
        return;
    }
    //1050801   Kenny   [1050710]   增加檢核密等資訊--End--

    //STEP 2. 檢核至少有勾選一筆
    if (document.all["dlSec"].options[document.all["dlSec"].selectedIndex].value == "") {
        alert("必須選取新密等");
        return;
    }
    else if (document.all["dlSec"].options[document.all["dlSec"].selectedIndex].value != "1") {
        if (document.all["txSecret"].value == "") {
            alert("保密期限不可為空白");
            //1060608 Justin [1050087] 二代公文修改
            //document.all["txSecret"].focus();
            $('#txSecret').focus();
            return;
        }
        else if (document.all["txCond"].value == "") {
            alert("解密條件不可為空白");
            //1060608 Justin [1050087] 二代公文修改
            //document.all["txCond"].focus();
            $('#txCond').focus();
            return;
        }
    }
    //alert("start");	
    //STEP 3. 檢核成功後開始更新DataGrid項目
    if (document.all["dlSec"].options[document.all["dlSec"].selectedIndex].value == "1") //如果選取為普通
    {
        for (i = 0; i < selectedKeyIdx; i++)	//更新選取項目之應用限制、新密等，並將保密期限、解密條件設為空白
        {
            var objVal = LookUpSecNoBySecName(document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbOldSec"].value);
            if (objVal > "1") {
                //update 應用限制
                if (document.all["dlApplyLimit"].options[document.all["dlApplyLimit"].selectedIndex].value != "")
                    document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbApplyLimit"].value = document.all["dlApplyLimit"].options[document.all["dlApplyLimit"].selectedIndex].text;
                //update 新密等
                document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbNewSec"].value = document.all["dlSec"].options[document.all["dlSec"].selectedIndex].text;
                //1140609	Daniel	1140794 設定隱藏欄位紀錄新密等代碼
                document.all["dg1__ctl" + selectedKeyArr[i] + "_H_txNewSec"].value = document.all.dlSec.options[document.all.dlSec.selectedIndex].value
                //set 保密期限
                document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbSecDate"].value = "";
                //set 解密條件
                document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbCond"].value = "";
                //set 檢討意見		
                document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbComment"].value = document.all["txComment"].value;
                //set 審核結果	
                document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbInspect"].value = document.all["txInspect"].value;

                //95.12.28 951280 David
                //[0970284]Modify by Cola 若新密等為普通時，不應直接將目前主旨帶為新主旨，應至DOC_EXTRA.IN_SUBJECT抓取密等主旨後帶至新主旨
                if (jf_Trim(document.all["txFromSubject"].value) != "")
                    document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbNewSubject"].value = document.all["txFromSubject"].value;
                else {
                    //[0970284] Modify by Cola 密等為普通時，案由透過DOC_EXTRA取得IN_SUBJECT			
                    //1070830 Zen 1070678 弱掃Ajax修正
                    //document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbNewSubject"].value = EAT702.GetSubject(document.all["H_OrgNo"].value, jf_Trim(document.all["dg1__ctl" + selectedKeyArr[i] + "_txDocNo1"].value)).value;
                    document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbNewSubject"].value = EA70.EAT702.GetSubject(document.all["H_OrgNo"].value, jf_Trim(document.all["dg1__ctl" + selectedKeyArr[i] + "_txDocNo1"].value)).value;
                }
                //Cola -- end --
                if (jf_Trim(document.all["txSourceOrgName"].value) != "")
                    document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbFromOrg"].value = document.all["txSourceOrgName"].value;
            }
        }
    }
    else //如果選取項目新密等不為普通
    {
        for (i = 0; i < selectedKeyIdx; i++) //更新選取項目之應用限制、新密等、保密期限、解密條件、檢討意見、審核結果
        {
            var objVal = LookUpSecNoBySecName(document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbOldSec"].value);
            // 1070103		Cloud	1061244	修改支援同密等時，設定降解密條件及應解密日期
            //if (parseInt(objVal) > parseInt(document.all["dlSec"].options[document.all["dlSec"].selectedIndex].value))
            if (parseInt(objVal) >= parseInt(document.all["dlSec"].options[document.all["dlSec"].selectedIndex].value)) {
                //update 應用限制
                if (document.all["dlApplyLimit"].options[document.all["dlApplyLimit"].selectedIndex].value != "")
                    document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbApplyLimit"].value = document.all["dlApplyLimit"].options[document.all["dlApplyLimit"].selectedIndex].text;
                //update 新密等
                document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbNewSec"].value = document.all["dlSec"].options[document.all["dlSec"].selectedIndex].text;
                //1140609	Daniel	1140794 設定隱藏欄位紀錄新密等代碼
                document.all["dg1__ctl" + selectedKeyArr[i] + "_H_txNewSec"].value = document.all.dlSec.options[document.all.dlSec.selectedIndex].value
                //set 保密期限
                document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbSecDate"].value = document.all["txSecret"].value;
                //set 解密條件
                document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbCond"].value = document.all["txCond"].value;
                //set 檢討意見		
                document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbComment"].value = document.all["txComment"].value;
                //set 審核結果	
                document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbInspect"].value = document.all["txInspect"].value;

                //95.12.28 951280 David
                if (jf_Trim(document.all["txFromSubject"].value) != "")
                    document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbNewSubject"].value = document.all["txFromSubject"].value;
                else
                    document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbNewSubject"].value = document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbFromSubject"].value;
                if (jf_Trim(document.all["txSourceOrgName"].value) != "")
                    document.all["dg1" + "__ctl" + selectedKeyArr[i] + "_lbFromOrg"].value = document.all["txSourceOrgName"].value;
            }

        }
    }
}

//根據密等名稱查詢密等號碼
function LookUpSecNoBySecName(argSecName) {
    for (j = 0; j < document.all["dlSec"].options.length; j++)//[0970689]Modify by Cola 變數i 改為變數j 才合理
    {
        if (document.all["dlSec"].options[j].text == argSecName)
            return document.all["dlSec"].options[j].value;
    }
    return "";
}

//紀錄Client端所選擇之UserID
function jf_dlUserChange() {
    var empUserInfo = document.all["dlUser"].options(document.all["dlUser"].selectedIndex).value;
    //alert( empUserInfo);
    var tempstr = empUserInfo.split(":");
    //alert( tempstr[0] + "     and    " +  tempstr[1] + "     and     " + tempstr[2]);
    document.all["empUserId"].value = tempstr[2];
}
function ChooseType() {
    if (document.all["rb1"].checked)
        return "";
    if (document.all["rb2"].checked)
        return "2";
    if (document.all["rb3"].checked)
        return "3";
}

function BringToNextCb(argStartIndex, argTargetIndex) {
    var CurrCount = document.all.dg1.rows.length;
    for (m = 2; m < CurrCount + 1; m++) {
        if (document.all["dg1__ctl" + m + "_cbSelect" + argStartIndex].checked) {
            document.all["dg1__ctl" + m + "_cbSelect" + argTargetIndex].checked = true;
            document.all["dg1__ctl" + m + "_cbSelect" + argStartIndex].checked = false;
        }
    }
}

function CheckcbSelect2() {
    var CurrCount = document.all.dg1.rows.length;
    var CheckCount = 0;
    //95.12.28 951280 David
    var DocNoCount = 0;
    for (m = 2; m < CurrCount + 1; m++) {
        if (document.all["dg1__ctl" + m + "_cbSelect2"].checked) {
            CheckCount++;
        }
        if (jf_Trim(document.all["dg1__ctl" + m + "_txDocNo1"].value) != "") {
            DocNoCount++;
        }
    }
    var ErrMsg = "";
    if (CheckCount == 0)
        ErrMsg = "請至少勾選一筆欲列印項目";
    if (DocNoCount == 0)
        ErrMsg = "請先加入資料";
    if (ErrMsg != "")
        alert(ErrMsg);

    if (CheckCount == 0 || DocNoCount == 0)
        return false;
    else
        return true;
}

//95.12.28 951280 David
var ws_OrgID = "";
function CheckOrgNo() {
    var param = new Array(2);
    //1050429	Kenny	[1040759]	修正檢核使用機關代碼欄位錯誤
    //param[0] = document.all["txTempOrg"].value;
    param[0] = document.all["H_OrgNo"].value;
    param[1] = document.all["txSourceOrgName"].value;
    if (param[1] != "") {
        var callObj_Org = jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, param); //使用WebService前必須先呼叫一次
        ws_OrgID = callObj_Org.id;
        OnWSResult(callObj_Org);
    }
    else
        document.all["txSourceOrgName"].value = "";
}
//[0970269]Add by Cola 判斷下方DataGrid之新密等是否為空，用以判斷是否執行過降解密核定資訊
function CheckSet() {
    var CurrCount = document.all.dg1.rows.length;
    var ErrMsg = "";
    //1040416 Cloud	Merge 因密等普通改為空白，取消判斷。
    /*for(m=2;m<CurrCount+1;m++)
	{		
		if(jf_Trim(document.all["dg1__ctl"+m+"_lbNewSec"].value) == "")
		{
			//100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
			//ErrMsg += "第"+jf_Trim(document.all["dg1__ctl"+m+"_lbSEQ_NO"].innerText)+"筆：公文文號 "+jf_Trim(document.all["dg1__ctl"+m+"_txDocNo1"].value)+"\n";
			ErrMsg += "第"+jf_Trim(document.all["dg1__ctl"+m+"_lbSEQ_NO"].innerText)+"筆：文(編)號 "+jf_Trim(document.all["dg1__ctl"+m+"_txDocNo1"].value)+"\n";
		}
	}*/
    //1140609	Daniel	1140794 判斷要更新的資料新密等代碼是否為空，若為空跳出原提示訊息
    for (m = 2; m < CurrCount + 1; m++) {
        if (document.all["dg1__ctl" + m + "_H_txNewSec"].value == "" && document.all["dg1__ctl" + m + "_cbSelect2"].checked) {
            ErrMsg += "第" + jf_Trim(document.all["dg1__ctl" + m + "_lbSEQ_NO"].innerText) + "筆：文(編)號 " + jf_Trim(document.all["dg1__ctl" + m + "_txDocNo1"].value) + "\n";
        }
    }
    
    if (ErrMsg != "")
        alert(ErrMsg + "尚未進行『降解密核定資訊』之設定，請先將所有資料都執行過該設定後，再執行更新註記或完成降解密。");

    if (ErrMsg != "")
        return false;
    else
        return true;
}
//Cola -- end --