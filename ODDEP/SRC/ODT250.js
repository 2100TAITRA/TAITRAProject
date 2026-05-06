/*
DATE	SA	    PRG		MGR_NO		DESC
0951211 Stella  Whay	950721      新增[流程資訊]按鈕
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
0991124	Zola	Howard	0990695		因應人民申請案件(綠標)，修改辨理天數計算若為包含工作天時，應再判斷是否為連休假日
1000117 Howard  Davis   1000301     新增判斷申請天數若小於三十天，無法進行申請
1010423	Kevin	Ivory	1010174		新增特殊性案件申請作業
1020801 Kevin	Erin	1020537		修正確認後無法正常關閉問題(將onload時第一次call webservice mark掉)
1030627	Kevin	Eric	1030365		新增取得BUSINESS_TYPE.DUE_RULE欄位以及是否使用GetUnHoliday函式
1031022	Cloud	Kevin_C	1030722		Merge[0990579]相關功能
1031222 Cloud	Kevin_C	1030722		onblur檢查修改
1040602	Cloud	Gabby	1040329		(航港局)增加客製化需求，將天數、名稱、理由、時程改為必要欄位
1041001	Cloud	Kenny	1040329		退單修正，判斷系統參數，檢核不同必要欄位；修正檢核項目及檢核邏輯
1041102	Cloud	Kenny	1040915		修正點選線上簽核傳送後出現錯誤訊息
1050425 Cloud   Justin  1050087     二代公文修改
1050816 Cloud	Justin	1050700		弱掃Client Potential Code Injection修正
1050817 Cloud   Kenny   1050827     新增取得辦理天數範圍client端檢核邏輯
1051130	Cloud	Kevin_C	1051181		新增申請天數檢核，鐵工局客製化報表，鐵工局客製化邏輯[申請單號、預定作業流程、畫面說明]
1060307 Cloud	Cloud	序-2854		修改增加IsServerHandling時，設定Page_BlockSubmit = true;
1060412 Cloud   Cloud	1060240     鐵改調整，申請天數改為儲存/傳送前取得細項日期最大值計算
1060510	Cloud	Justin	1060215		INNERTEXT修正
1060726 Kevin	Justin	1060543		(鐵改局)取得是否要計算假日成功才計算申請天數
1060726 Kevin	Justin	1060507		預定作業事項欄位長度改為100，加入超過100字檢核，機關代碼為RRB時，檢核改為超過20字
1060830 Kevin	Justin	1060742		弱掃XSS修正
1061103 Kevin   Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
1070507 Kevin	Justin	1070508		(鐵改局)修正漏算最末行預定作業流程問題
1080423	Cloud	Kevin_C	1080047		字數合併邏輯合併，並修正訊息會跳兩次的問題
1080514	Cloud	Kevin_C	1080047		修正使用物件錯誤的問題
1080820	Cloud	Cloud	1080569		(港務公司)預定事項，檢核僅能輸入20字
1080916 Kevin	Kevin_C	1080774		新增撤回功能
1090602 Cloud	Cloud	1090374		整合輸入檢核，鍵入檢核字數行為，皆改為鍵入
1101021	Cloud	Joe		1100325		修改為當申請天數超過180天時，訊息詢問使用者是否繼續執行
1120721 Cloud   Cloud   1120285     增加檢核最後一項事件迄日須為申請後限辦日期   
1120328 Cloud   Cloud   1130139     新增核可功能
1130522 Cloud 	Jason	1130387     修改說明欄位顯示資訊
1130918 Cloud   Cloud   1130941     弱掃XSS修改
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

/*1050425 Justin 1050087 二代公文修改 
document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

if (document.all["ValidationSummary1"].innerText != "")
    alert(document.all["ValidationSummary1"].innerText);
*/
jf_ShowValidator();

//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    //1031022	Kevin_C	1030722	取得確實按下的是哪個？鍵	-S
    var ibCalS;
    var ibCalE;
    var pNo;

    if (xObjectName.indexOf("_ibCalS") != "-1")
    {
        pNo = xObjectName.substring(15, xObjectName.indexOf("_ibCalS"));

        if (document.all["dgSchedule__ctl" + pNo + "_ibCalS"] != null)
        {
            ibCalS = document.all["dgSchedule__ctl" + pNo + "_ibCalS"].id;
        }
    }
    if (xObjectName.indexOf("_ibCalE") != "-1")
    {
        pNo = xObjectName.substring(15, xObjectName.indexOf("_ibCalE"));

        if (document.all["dgSchedule__ctl" + pNo + "_ibCalE"] != null)
        {
            ibCalE = document.all["dgSchedule__ctl" + pNo + "_ibCalE"].id;
        }
    }
    //1031022	Kevin_C	1030722	取得確實按下的是哪個？鍵	-E
    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    //1031022	Kevin_C	1030722	如果argMsgIdExist存在，取消小日曆功能
    var strUrl = location.search;
    var getPara, ParaVal;
    var aryPara = [];
    var argMsgIdExist;
    if (strUrl.indexOf("?") != -1)
    {
        var getSearch = strUrl.split("?");
        getPara = getSearch[1].split("&");
        for (i = 0; i < getPara.length; i++)
        {
            ParaVal = getPara[i].split("=");
            if (ParaVal[0] == "argMsgId")
                argMsgIdExist = true;
        }
    }

    switch (xObjectName)
    {

        //1031022	Kevin_C	1030722	加入小日曆功能
        /*1050425 Justin 1050087 二代公文修改 
		case ibCalS:
			Page_BlockSubmit = true;
			if(!argMsgIdExist)
				jf_CallCalendar(document.all["dgSchedule__ctl"+pNo+"_txDateS"], event.screenX, event.screenY);
			break;
		case ibCalE:
			Page_BlockSubmit = true;
			if(!argMsgIdExist)
				jf_CallCalendar(document.all["dgSchedule__ctl"+pNo+"_txDateE"], event.screenX, event.screenY);
			break;
        */
    }
}

//1050425 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
    {
        //1060307 Cloud	序-2854		修改增加IsServerHandling時，設定Page_BlockSubmit = true;
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050425 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btCheck":
            Page_BlockSubmit = false;
            //1050425 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btOpen":
            if (jf_CheckKeyObject())
                SetCanSubmit();
            else
                SetCanNotSubmit();
            //1050425 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btTransfer":
            if (ConfirmSave())//是否通過儲存前必要檢查
                SetCanSubmit();
            else
                SetCanNotSubmit();
            //1050425 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (ConfirmSave())//是否通過儲存前必要檢查
                SetCanSubmit();
            else
                SetCanNotSubmit();
            //1050425 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            if (jf_ConfirmDelete())
                SetCanSubmit();
            else
                SetCanNotSubmit();
            //1050425 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            if (jf_ConfirmCancel())
                SetCanSubmit();
            else
                SetCanNotSubmit();
            //1050425 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
        case "btPreview":
            if (ConfirmSave())
                SetCanSubmit();
            else
                SetCanNotSubmit();
            //1050425 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //950721 新增[流程資訊]按鈕 by whay
        case "btSearch":
            Page_BlockSubmit = true;
            if (jf_CheckKeyObject())
            {
                var strArtifact = document.all.nArtifact.value;
                var strDocNo = document.all["txDocNo"].value;
                var strSourceOrgno = document.all.nSourceOrgno.value;
                var strUrl = document.all.nHttp.value;
                //var strUrl ="ODI260.aspx?nFrom=ODT250&pDocNo="+strDocNo+"&SAMLart=" + strArtifact;
                //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
                var strUrl = strUrl + "/ED/ED2/EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argMsgFrom=ODT250&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
                jf_OpenChildWin(strUrl, "EDI200", 700, 500);
            }
            //1050425 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
		//1080916	Kevin_C		1080774		新增撤回
		case "btBack":
			Page_BlockSubmit = !window.confirm("確定要撤回嗎?");
			jf_ToolBarSubmit(xObjectName);
			break;
        //1120328 Cloud      1130139     新增核可功能-s
        case "btCommit":
            if (ConfirmSave())//是否通過儲存前必要檢查
                SetCanSubmit();
            else
                SetCanNotSubmit();
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        //1120328 Cloud      1130139     新增核可功能-e
    }
}

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
    //1020801  Erin [1020537] mark掉第一次call webservice，避免影響window close無法正常關閉視窗
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
    //jf_CallWS("lib/OD_LIB.asmx","GetWorkDate" ,false, null);
    //jf_CallWS("lib/TIME_LIB.asmx","GetBTypeNo" ,false, null);
    //jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false, null);
    //jf_CallWS("lib/OD_LIB.asmx","GetUnHoliday", false,null);

    //ZOEY [951034]
    if (document.all["dgSchedule"] == null)
    {
        document.all.DivDgSche.outerHTML = "";
        document.all.Label17.outerHTML = "";
    }
	//1080820	Cloud	1080569		(港務公司)預定事項，檢核僅能輸入20字
	else
	{
		if (document.all["txOrgNickName"].value == "TWP")
			document.all.DivDgSche.style.height = 325;
	}
    //1000422	Howard 1000346	修正開啟後，其申請後限辦日期為空之問題
    if (document.all.txApplyDay.value != "" && document.all.H_txStartDate.value != "" && document.all.txNDueDate.value == "")
        txApplyDay_Onblur();
    //1051130	Kevin_C	1051181	增加UI下方說明
    if (document.all.txOrgNickName.value == "RRB")
    {
        document.all.lbDesc.className = "";
        document.all.lbTitleDesc.className = "";
        if (!document.all.dg1)
            document.all.AuditDiv.className = "hide";
        document.all.DivDgSche.style.height = "160px";
        //1060412 Cloud [1060240] 設定申請天數為唯獨
        document.all.txApplyDay.className = "";
        document.all.txApplyDay.style["background-color"] = "LightGrey"
    }
    //1130522 	Jason	1130387     修改說明欄位顯示資訊
    if (document.all["H_ShowDecList"].value == "N")
        document.all["divDescList"].style.display = "none";//隱藏資訊
    //1130918 Cloud     1130941     弱掃XSS修改
    SetDescDecode();
}

function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsGetWorkDateID)
    {
        //檢查執行是否成功
        if (jf_IsWebServiceSuccess(argResult))
        {
            //document.all["lbNDueDate"].innerText = DateFormat(argResult.value.RtnWorkDate);
            document.all.txNDueDate.value = argResult.value.RtnWorkDate;
        }
        else
        {
            //document.all["lbNDueDate"].innerText = "";
            //1050607 Justin 1050087 二代公文修改
            //document.all["txApplyDay"].focus();
            $('#txApplyDay').focus();
        }
    }
    else if (argResult.id == wsGetFieldValue)  //由業務類別判斷辦理天數是否含假日
    {
        //檢查執行是否成功
        if (jf_IsWebServiceSuccess(argResult))
            //1030627 Eric	1030365		新增回傳H_DueRule隱藏欄位欄位
        {
            //1050425 Justin 1050087 二代公文修改
            //document.all["H_txIncHd"].innerText = argResult.value.RtnField0[0];
            //document.all["H_txDueRule"].innerText = argResult.value.RtnField1[0];
            //1060413 Cloud 調整放入欄位屬性 以免後續取不到
            /*document.all["H_txIncHd"].textContent = argResult.value.RtnField0[0];
			document.all["H_txDueRule"].textContent = argResult.value.RtnField1[0];*/
            document.all["H_txIncHd"].value = argResult.value.RtnField0[0];
            document.all["H_txDueRule"].value = argResult.value.RtnField1[0];
        }
        else
        {
            //1050425 Justin 1050087 二代公文修改
            //document.all["H_txIncHd"].innerText = "";
            //document.all["H_txDueRule"].innerText = "";
            //1060413 Cloud 調整放入欄位屬性 以免後續娶不到
            /*document.all["H_txIncHd"].textContent = "";
		    document.all["H_txDueRule"].textContent = "";*/
            document.all["H_txIncHd"].value = "";
            document.all["H_txDueRule"].value = "";
        }
    }
    else if (argResult.id == wsGetBTypeNo)  //由公文性質取得業務類別
    {
        if (jf_IsWebServiceSuccessNoAlert(argResult))
        {
            //clear 業務類別 dlWorkType
            ClearDL(document.all.dlWorkType);
            if (argResult.value.IsErr || argResult.value.RtnStr == "")
            {
                document.all.dlWorkType.disabled = true;
                document.all.dlWorkType.options.add(new Option("", "")); //第一筆空白
                return false;
            }

            if (argResult.value.RtnStr != "")
            {
                document.all.dlWorkType.disabled = false;
                var pTmpAry = argResult.value.RtnStr.split(":");

                //將值塞入 dlWorkType
                if (pTmpAry.length == 0)
                {
                    document.all.dlWorkType.options.add(new Option("", "")); //第一筆空白
                    document.all.dlWorkType.selectedIndex = 0;
                }
                else
                {
                    for (var i = 0; i < pTmpAry.length; i++)
                    {
                        var pTmpAry2 = pTmpAry[i].split(",");
                        var objOption = new Option(pTmpAry2[1], pTmpAry2[0]);
                        document.all.dlWorkType.options.add(objOption);
                    }
                    document.all.dlWorkType.selectedIndex = 0;
                }
            }
            else
            {
                document.all.dlWorkType.options.add(new Option("", "")); //第一筆空白
                document.all.dlWorkType.selectedIndex = 0;
            }
        }
    }
        //1060412 Cloud 1060240 新增函式調整天數由細項日期回推天數
    else if (argResult.id == iCallID_GetWorkDays) //帶出辦理天數
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.RtnStr == "0")
            {

                return false;
            }
            return true;
        }
    }
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050425 Justin 1050087 二代公文修改
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

//###############################################################################
//							Button Click Function
//###############################################################################
//預覽/列印前欄位檢查
function CheckBeforPrint()
{
    var bRtnbool = true;
    return bRtnbool;
}

//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    //1031222	Kevin_C	1030722	onblur檢查修改
	//1080423	Kevin_C	1080047	合併檢核邏輯 -S
    //if (!checkOnBlur(document.all["txReason"]))
	//return false;
    //1090602 Cloud	Cloud	1090374		整合輸入檢核，鍵入檢核字數行為，皆改為鍵入-s
	/*if (!isMaxLength(document.all.txReason,'申請理由','100'))
        return false;
	if (!isMaxLength(document.all.txSchedule,'擬定作業時程','400'))
        return false;
	if(document.all.dgSchedule)
	{
		for(var i=2; i<document.all.dgSchedule.rows.length+1; i++)
		{
			//1080514	Kevin_C	1080047	修正使用物件錯誤的問題
			//if (!isMaxLength("document.all.dgSchedule__ctl"+i+"_txPlan",'預定作業事項','100'))
			if (!isMaxLength(document.all["dgSchedule__ctl"+i+"_txPlan"],'預定作業事項','100'))
				return false;
		}
	}*/
	//1090602 Cloud	Cloud	1090374		整合輸入檢核，鍵入檢核字數行為，皆改為鍵入-e
	//1080423	Kevin_C	1080047	合併檢核邏輯 -E
    //1031022	Kevin_C	1030722	onblur檢查
    //if(checkOnBlur(document.all["txReason"]))
    //	return true;
    //else
    //	return false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
    {
        if (CheckBeforSave())
            bRtnbool = true;
        else
            bRtnbool = false;
    }
    //alert(bRtnbool);
    return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
    //1010423	ivory	1010174	新增公文性質為特殊性案件時申請天數限制為7~29天,專案名稱不需輸入、檢核
    var strProperty = document.all["dlProperty"].value;
    //檢查本次申請展期天數不能為空白
    //1040602 Gabby[1040329](航港局)增加客製化需求，將天數、名稱、理由、時程改為必要欄位--START
    //1051208 Cloud    1051181 傳送或儲存時，需檢核-改為由系統參數判斷
    //if(document.all["txOrgNickName"].value=="MPB")
    if (document.all["OD_ODT250_PLAN_SCHEDULE_DETAIL"].value == "Y")
    {
        //1060412 Cloud   1060240     鐵改調整，申請天數改為儲存/傳送前取得細項日期最大值計算
        if (document.all.txOrgNickName.value != "RRB")
        {
            if (!CheckNotEmptyAndAlert("txApplyDay", "本次專案申請天數"))
                return false;
        }
        if (!CheckNotEmptyAndAlert("txCaseName", "專案名稱"))
            return false;
        if (!CheckNotEmptyAndAlert("txReason", "申請理由"))
            return false;
        //1041001	Kenny	[1040329]	退單修正，判斷系統參數，檢核不同必要欄位--Start--
        //if(!CheckNotEmptyAndAlert("txSchedule","擬定作業時程"))
        //	return false;
        if (document.all["OD_ODT250_PLAN_SCHEDULE_DETAIL"].value != "Y")
        {
            if (!CheckNotEmptyAndAlert("txSchedule", "擬定作業時程"))
                return false;
        }
        else
        {
            var blEmptyRow = false;  // 紀錄空白列；只要資料列輸入完整，輸入時穿插空白列仍須能儲存
            var strTargetId = "";
            var strEmptyText = "";
            var strTmp = "";
            var bcheck = false;
            //1060412 Cloud   1060240     鐵改調整，申請天數改為儲存/傳送前取得細項日期最大值計算
            var maxScheduledate = "";
            //1120721 Cloud     1120285     增加檢核最後一項事件迄日須為申請後限辦日期
            var LastRow ="";
            //1070507 Justin 1070508 (鐵改局)修正漏算最末行預定作業流程問題
            //for (var iRow = 2; iRow < document.all["dgSchedule"].rows.length; iRow++)
            for (var iRow = 2; iRow <= document.all["dgSchedule"].rows.length; iRow++)
            {
                strEmptyText = "";
                if (document.all["dgSchedule__ctl" + iRow + "_txPlan"].value != "" && document.all["dgSchedule__ctl" + iRow + "_txDateS"].value != "" && document.all["dgSchedule__ctl" + iRow + "_txDateE"].value != "")
                {
                    bcheck = true;
                    document.all["dgSchedule__ctl" + iRow + "_txDateS"].value = jf_PADL(document.all["dgSchedule__ctl" + iRow + "_txDateS"].value, 7, "0");
                    document.all["dgSchedule__ctl" + iRow + "_txDateE"].value = jf_PADL(document.all["dgSchedule__ctl" + iRow + "_txDateE"].value, 7, "0");
                    if (document.all["dgSchedule__ctl" + iRow + "_txDateS"].value > document.all["dgSchedule__ctl" + iRow + "_txDateE"].value)
                    {
                        strTmp = document.all["dgSchedule__ctl" + iRow + "_txDateS"].value;
                        document.all["dgSchedule__ctl" + iRow + "_txDateS"].value = document.all["dgSchedule__ctl" + iRow + "_txDateE"].value;
                        document.all["dgSchedule__ctl" + iRow + "_txDateE"].value = strTmp;
                    }
                    //1060726 Justin [1060507] 預定作業事項欄位長度改為100，加入超過100字檢核，機關代碼為RRB時，檢核改為超過20字--S
					//1080820	Cloud	1080569		(港務公司)預定事項，檢核僅能輸入20字
                	//if (document.all.txOrgNickName.value == "RRB")
                	//1090602 Cloud	Cloud	1090374		整合輸入檢核，鍵入檢核字數行為，皆改為鍵入-s
					/*if (document.all["txOrgNickName"].value == "TWP" || document.all.txOrgNickName.value == "RRB")
                    {
                        if (document.all["dgSchedule__ctl" + iRow + "_txPlan"].value.length > 20)
                        {
                            alert("序" + (iRow - 1).toString() + "中預定作業事項欄位最多僅能輸入20字");
                            bcheck = false;
                            break;
                        }
                    }
                    else if (document.all["dgSchedule__ctl" + iRow + "_txPlan"].value.length > 100)
                    {
                        alert("序" + (iRow - 1).toString() + "中預定作業事項欄位最多僅能輸入100字");
                        bcheck = false;
                        break;
                    }*/
                	//1090602 Cloud	Cloud	1090374		整合輸入檢核，鍵入檢核字數行為，皆改為鍵入-e
                    //1060726 Justin [1060507]--E
                    //1120721 Cloud     1120285     增加檢核最後一項事件迄日須為申請後限辦日期
                    maxScheduledate = document.all["dgSchedule__ctl" + iRow + "_txDateE"].value;
                    LastRow = iRow;
                }
                else if (document.all["dgSchedule__ctl" + iRow + "_txPlan"].value == "" && document.all["dgSchedule__ctl" + iRow + "_txDateS"].value == "" && document.all["dgSchedule__ctl" + iRow + "_txDateE"].value == "")
                {
                    blEmptyRow = true;
                    if (iRow == (document.all["dgSchedule"].rows.length - 1))
                    {
                        if (blEmptyRow && !bcheck)
                            bcheck = CheckNotEmptyAndAlert("dgSchedule__ctl2_txPlan", "預定作業時程");
                    }
                }
                else
                {
                    if (document.all["dgSchedule__ctl" + iRow + "_txDateE"].value == "")
                    {
                        strTargetId = "dgSchedule__ctl" + iRow + "_txDateE";
                        strEmptyText = "進度訖";
                    }
                    if (document.all["dgSchedule__ctl" + iRow + "_txDateS"].value == "")
                    {
                        strTargetId = "dgSchedule__ctl" + iRow + "_txDateS";
                        if (strEmptyText != "")
                            strEmptyText = "、" + strEmptyText;
                        strEmptyText = "進度起" + strEmptyText;
                    }
                    if (document.all["dgSchedule__ctl" + iRow + "_txPlan"].value == "")
                    {
                        strTargetId = "dgSchedule__ctl" + iRow + "_txPlan";
                        if (strEmptyText != "")
                            strEmptyText = "、" + strEmptyText;
                        strEmptyText = "預定作業事項" + strEmptyText;
                    }
                    bcheck = CheckNotEmptyAndAlert(strTargetId, strEmptyText);
                    break;
                }
                //1060412 Cloud   1060240     鐵改調整，申請天數改為儲存/傳送前取得細項日期最大值計算
                if (document.all["txOrgNickName"].value == "RRB")
                {

                    if (maxScheduledate == "")
                        maxScheduledate = document.all["dgSchedule__ctl" + iRow + "_txDateE"].value;
                    else
                    {
                        if (maxScheduledate < document.all["dgSchedule__ctl" + iRow + "_txDateE"].value)
                            maxScheduledate = document.all["dgSchedule__ctl" + iRow + "_txDateE"].value;
                    }

                }

            }
            //1120721 Cloud     1120285     增加檢核最後一項事件迄日須為申請後限辦日期
            if (maxScheduledate != "" && document.all["txNDueDate"].value!="" && maxScheduledate != document.all["txNDueDate"].value)
            {
                if (window.confirm("作業事項最後1項的進度迄日期與限辦日期不符，系統將自動修正為申請後限辦日期")) {
                    document.all["dgSchedule__ctl" + LastRow + "_txDateE"].value = document.all["txNDueDate"].value;
                }
                else
                    bcheck = false;
            }
            //1041102	Kenny	[1040915]	修正檢核完畢直接return 行為，避免後續行為未設定到參數導致線上簽核傳送出現錯誤
            //return bcheck;
            if (!bcheck)
                return bcheck;
        }
        //1060412 Cloud   1060240     鐵改調整，申請天數改為儲存/傳送前取得細項日期最大值計算-取得業務類別判斷計算日期時是否要計算假日
        if (document.all["txOrgNickName"].value == "RRB")
        {
            if (!fnGetWorkDays(maxScheduledate))
                return false;
        }
        //1041001	Kenny	[1040329]	退單修正，判斷系統參數，檢核不同必要欄位--End--
    }
        //1040602 Gabby[1040329](航港局)增加客製化需求，將天數、名稱、理由、時程改為必要欄位--END
    else
    {
        if (!CheckNotEmptyAndAlert("txApplyDay", "本次專案申請天數"))
            return false;
        //if(!CheckNotEmptyAndAlert("txCaseName","專案名稱"))
        //	return false;	
        if (strProperty == "3")
        {

            if (!CheckNotEmptyAndAlert("txCaseName", "專案名稱"))
                return false;
        }
        //	if(document.all.cbReason8.checked)
        //	{
        if (!CheckNotEmptyAndAlert("txReason", "申請理由"))
            return false;
        //	}
        //1051208 Cloud 1051181 修改以系統參數為檢核基準
        if (!CheckNotEmptyAndAlert("txSchedule", "擬定作業時程"))
            return false;
    }


    //	if((!document.all.cbReason1.checked)&&(!document.all.cbReason2.checked)&&(!document.all.cbReason3.checked)&&(!document.all.cbReason4.checked)&&
    //	(!document.all.cbReason5.checked)&&(!document.all.cbReason6.checked)&&(!document.all.cbReason7.checked)&&(!document.all.cbReason8.checked))
    //	{
    //		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少要勾選一樣申請理由"])),"");	
    //		return false;
    //	}
    //[1000117] 1000301 Davis 新增判斷申請天數若小於三十天，無法進行申請
    //1010423	ivory	1010174	新增公文性質為特殊性案件時申請天數限制為7~29天
    if (strProperty == "3")//專案管制
    {
        if (parseInt(document.all["txApplyDay"].value) < 30)
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["依文書流程管理作業規範第七章規定專案申請天數需30日以上"])), "");
            //1050607 Justin 1050087 二代公文修改
            //document.all["txApplyDay"].focus();
            $('#txApplyDay').focus();
            return false;
        }
    }
    else if (strProperty == "9")//特殊性案件申請天數限制為7~29天
    {
        if (parseInt(document.all["txApplyDay"].value) > 29 || parseInt(document.all["txApplyDay"].value) < 7)
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["特殊性案件申請天數為7~29日"])), "");
            //1050607 Justin 1050087 二代公文修改
            //1051130	Kevin_C	1051181	升二代，舊行為應取消
            //document.all["txApplyDay"].focus();
            $('#txApplyDay').focus();
            return false;
        }
    }
    //1051130	Kevin_C	1051181	新增檢核申請天數不可大於180天
	//1101021	Joe		1100325		修改為當申請天數超過180天時，訊息詢問使用者是否繼續執行
	/*
    if (parseInt(document.all["txApplyDay"].value) > 180)
    {
        // jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["依文書處理手冊第78點第1款第5目及第6目規定，專案管制案件，申請之處理時限最長不得超過6個月"])), "");
        // ('#txApplyDay').focus();
        // return false;
		
    }
	*/
    /*1050426 Justin 1050087 二代公文修改
	var ddlIdx=9;
	var nextOpt = GetToolbarCtrl(ddlIdx);
	if(nextOpt==null)
		alert('null');
	var aOptions = nextOpt.getOptions();
	document.all.SelectedUser.value = aOptions.value;*/
    document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
    //紀錄Client端所選的業務類別
    document.all["H_WorkType"].value = document.all["dlWorkType"].options[document.all["dlWorkType"].selectedIndex].value;
    //1060412 Cloud   1060240     鐵改調整，申請天數改為儲存/傳送前取得細項日期最大值計算-取得業務類別判斷計算日期時是否要計算假日
    if (document.all["txOrgNickName"].value == "RRB")
    {
        if (!window.confirm("本次申請天數:" + document.all.txApplyDay.value + "天  申請後日期：" + document.all.txNDueDate.value + "\n是否確認儲存/傳送?"))
        { return false; }
    }
    return true;
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName, argFieldName)
{
    if (document.all[argObjName].value == "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName + "不可為空白"])), "");
        //1050607 Justin 1050087 二代公文修改
        //document.all[argObjName].focus();
        $('#' + argObjName).focus();
        return false;
    }
        //1050817   Kenny   [1050827]   系統參數OD_ODT250_OPEN_PROPERTY有正確設定時增加檢核範圍邏輯--Start--
    else
    {
        if (argObjName == "txApplyDay")
        {
            var strApplyDayMin = document.all.argApplyDayMin.value;
            var strApplyDayMax = document.all.argApplyDayMax.value;
            var strApplyDay = document.all.txApplyDay.value;
            if (strApplyDay != "" && (strApplyDayMin != "" && strApplyDayMax != "" && (parseInt(strApplyDayMin, 10) < parseInt(strApplyDayMax, 10))))
            {
                if ((parseInt(strApplyDay, 10) < parseInt(strApplyDayMin, 10)) || (parseInt(strApplyDay, 10) > parseInt(strApplyDayMax, 10)))
                {
                    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["申請天數範圍為" + strApplyDayMin + "~" + strApplyDayMax + "天，請重新輸入"])), "");
                    $('#' + argObjName).focus();
                    return false;
                }
            }
        }
    }
    //1050817   Kenny   [1050827]   系統參數OD_ODT250_OPEN_PROPERTY有正確設定時增加檢核範圍邏輯--End--
    return true;
}

/*1050426 Justin 1050087 二代公文修改
function GetToolbarCtrl(argId)
{
	return document.all.tbTool.getItem(argId);
	for(var i=0;i<20;i++)
	{
		var o=document.all.tbTool.getItem(i);
		if(o!=null)
		{
			alert(o.getAttribute("ID"));
			if(o.getAttribute("ID")==argId)
				return o;
		}
	}
	return null;
}*/
//###############################################################################
//						Server端Register之Function
//###############################################################################
//function dlReason_Onchange()
//{
//var index = document.all["dlReason"].selectedIndex;
//if (index != 0)
//{
//	document.all["txReason"].value = document.all["dlReason"].options[index].text;
//}
//}

//常用申請理由
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050425 Justin 1050087 二代公文修改 
    //var val = document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    if (document.all["txReason"].value != "")
        val = "，" + val;
    document.all["txReason"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    //1050607 Justin 1050087 二代公文修改
    //document.all["txReason"].focus();
    $('#txReason').focus();
}

var wsGetWorkDateID;//宣告webserver回傳值id
var wsGetFieldValue;//宣告webserver回傳值id

function txApplyDay_Onblur()
{
    //1051130	Kevin_C	1051181	新增檢核申請天數不可大於180天
    if (parseInt(document.all["txApplyDay"].value) > 180)
    {
		//1101021	Joe		1100325		修改為當申請天數超過180天時，訊息詢問使用者是否繼續執行
        // jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["依文書處理手冊第78點第1款第5目及第6目規定，專案管制案件，申請之處理時限最長不得超過6個月"])), "");
		// $('#txApplyDay').focus();
		// return;
		if(!window.confirm("申請專案管制案件之處理時限最長不得超過6個月。但屬行政調查權之調查事項且有法規依據者，不受申請專案管制案件之處理時限不得超過6個月之限制，且於提出申請時應併同敘明法規名稱及條文內容。是否繼續？"))
		{
			document.all["txApplyDay"].value= "";
			$('#txApplyDay').focus();
			return;
		}
    }
    var index = document.all["dlWorkType"].selectedIndex;
    var obj = document.all["dlWorkType"].options[index];
    var wsAKParam = new Array(5);
    var KeyName = new Array(2);
    var KeyValue = new Array(2);
    //1030627 Eric	1030365	修改宣告空間
    //var RtnFldName = new Array(1);
    var RtnFldName = new Array(2);
    var OrdFldName = new Array(1);

    KeyName[0] = "SOURCE_ORG";
    KeyName[1] = "B_TYPE_NO";
    /*1050816 Justin 1050700 弱掃Client Potential Code Injection修正
	KeyValue[0]  = document.all.H_txSourceOrgNo.value;
	KeyValue[1]  = obj.value;*/
    KeyValue[0] = encodeURI(document.all.H_txSourceOrgNo.value);
    KeyValue[1] = encodeURI(obj.value);
    RtnFldName[0] = "LT_INC_HD";
    //1030627 Eric	1030365	新增回傳值DUE_RULE
    RtnFldName[1] = "DUE_RULE";

    OrdFldName[0] = "";
    wsAKParam[0] = "BUSINESS_TYPE";
    wsAKParam[1] = KeyName;
    wsAKParam[2] = KeyValue;
    wsAKParam[3] = RtnFldName;
    wsAKParam[4] = OrdFldName;
    //根據BUSINESS_TYPE中LT_INC_HD決定計算辦理天數是否包含假日  stella 0941129
    callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, wsAKParam);
    wsGetFieldValue = callObj.id;
    OnWSResult(callObj);

    var strDay = document.all["txApplyDay"].value;
    if (strDay == "")
    {
        //1050425 Justin 1050087 二代公文修改
        //document.all["txNDueDate"].innerText = "";
        //1060510 Justin [1060215] INNERTEXT修正
        //document.all["txNDueDate"].textContent = "";
        document.all["txNDueDate"].value = "";
        return;
    }
    else
    {
        var wsParam = new Array(3);
        //1050816 Justin 1050700 弱掃Client Potential Code Injection修正
        //wsParam[0] = document.all["H_txStartDate"].value; //zoey [950817]  95/10/04 原本是 "txDueDate"
        wsParam[0] = encodeURI(document.all["H_txStartDate"].value);
        wsParam[1] = Number(strDay) - 1;
        if (document.all.H_txIncHd.value == "Y")
            wsParam[2] = "1";
            //0991124	Howard	0990695	因應人民申請案件(綠標)，修改辨理天數計算若為包含工作天時，應再判斷是否為連休假日
        else if (document.all.H_txIncHd.value == "H")
            wsParam[2] = "3";
        else
            wsParam[2] = "2";
        //callObj = jf_CallWS("lib/OD_LIB.asmx","GetWorkDate" ,false, wsParam);	
        //1030627 Eric 1030365	判斷DUE_RULE是否使用GetUnHoliday函式
        //callObj = jf_CallWS("lib/OD_LIB.asmx","GetUnHoliday" ,false, wsParam);  //zoey [950817]  95/10/04
        if (document.all.H_txDueRule.value == "Y")
            callObj = jf_CallWS("lib/OD_LIB.asmx", "GetUnHoliday", false, wsParam);
        else
            callObj = jf_CallWS("lib/OD_LIB.asmx", "GetWorkDate", false, wsParam);
        wsGetWorkDateID = callObj.id;
        OnWSResult(callObj);
    }
}


function dlProperty_onchange()
{
    var index = document.all["dlProperty"].selectedIndex;
    var obj = document.all["dlProperty"].options[index];

    if (obj.value == "9")
        document.all.txApplyDay.value = "7";
    else
        document.all.txApplyDay.value = "30";

    //取得業務類別
    GetBTypeNo(obj.value);

    txApplyDay_Onblur();
}

//由公文性質取得業務類別
var wsGetBTypeNo = null;
function GetBTypeNo(strDocProperty)
{
    var param = new Array(1);
    param[0] = "";
    param[1] = strDocProperty;
    callObj = jf_CallWS("lib/TIME_LIB.asmx", "GetBTypeNo", false, param);
    wsGetBTypeNo = callObj.id;
    OnWSResult(callObj);
}

function jf_IsWebServiceSuccessNoAlert(argResult)
{
    var L_NotReady_Text = "Service unavailable";

    if (argResult.error)
    {
        if (argResult.errorDetail.string == L_NotReady_Text)
        {
            //
        }
        else
        {
            alert(argResult.errorDetail.string);
        }
        return false;
    }
    else
    {
        obj = argResult.value;
        if (obj.ErrorClass.IsErr)
        {
            if (obj.ErrorClass.IsRedirect)
            {
                jf_RedirectToCustomErrPage();
                return false;
            }
            else
                return true;
        }
    }
    return true;
}

//將DropDownList裡的item清除
function ClearDL(argObj)
{
    for (var i = 0 ; i < argObj.length; i++)
        argObj.remove(0);

    argObj.length = 0;
    return;

}
//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################
//取消TextBox中enter的功能
function fnHandleTextarea()
{
    if (event.keyCode == 13)
        event.cancelBubble = false;
}

function SetCanSubmit()
{
    IsServerHandling = true;
    jf_ShowWaitState();
    Page_BlockSubmit = false;
}

function SetCanNotSubmit()
{
    Page_BlockSubmit = true;
}

//日期格式轉換
function DateFormat(argDate)
{
    if (argDate.length == 7)
        return argDate.substring(0, 3) + "/" + argDate.substring(3, 5) + "/" + argDate.substring(5, 7);
    if (argDate.length == 11)
        return argDate.substring(0, 3) + "/" + argDate.substring(3, 5) + "/" + argDate.substring(5, 7) + " " + argDate.substring(9, 2) + ":" + argDate.substring(11, 2);
    return argDate;
}

function cbReasonOnClick()
{
    if (document.all.cbReason8.checked)
    {
        document.all.txReason.readOnly = "";
        document.all.txReason.className = "";
    }
    else
    {
        document.all.txReason.readOnly = "readonly";
        document.all.txReason.className = "DisplayOnly";
    }
}
//1031022	Kevin_C	1030722	新增檢核日期欄位
function CheckDate(argObj, argObjName)
{
    var dateObj = document.all[argObj];
    if (dateObj.value != "")
    {
        jf_PADL(dateObj.value, 7, '0');
        if (!jf_CheckCDATE(dateObj.value))
        {
            dateObj.value = "";
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
            //1050607 Justin 1050087 二代公文修改
            //dateObj.focus();
            $('#' + argObj).focus();
        }
    }
}
//1031022	Kevin_C	1030722	新增檢核申請理由欄位
//1080423	Kevin_C	1080047	合併檢核邏輯，並修正訊息會跳兩次的問題 -S
// function isMaxLength(obj)
// {
    // fnHandleTextarea();
    // if (obj.value.length == 100)
    // {
        // if (event.keyCode != '8' && event.keyCode != '46' && event.keyCode != '37' && event.keyCode != '38' && event.keyCode != '39' && event.keyCode != '40' && event.keyCode != '16')
            // if (document.selection != undefined)
            // {
                // var sel = document.selection.createRange();
                // selectedText = sel.text;
                // if (selectedText == "")
                // {
                    // event.returnValue = false;
                    // jf_ShowMsg("", "備註長度不可超過100!");
                // }
            // }

    // } else if (obj.value.length > 100)
    // {
        // bHasCheck = true;
        // jf_ShowMsg("", "備註長度不可超過100!");
        // bHasCheck = false;
        // obj.value = obj.value.substring(0, 100)
    // }
// }
// var bHasCheck = false;
// function checkOnBlur(obj)
// {
    // if (bHasCheck)
    // {
        // bHasCheck = false;
        // return;
    // }
    // bHasCheck = true;
    // if (obj.value.length > 100)
    // {
        // jf_ShowMsg("", "備註長度不可超過100!");
        // obj.value = obj.value.substring(0, 100)
        // return false;
    // }
    // bHasCheck = false;
    // return true;
// }
var bHasCheck = false;
function isMaxLength(obj,argText,argMaxNum)
{
	if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
	bHasCheck = true;
	var nMaxNum = parseInt(argMaxNum);
	//1090602 Cloud	1090374		整合輸入檢核，鍵入檢核字數行為，皆改為鍵入
	if (typeof (obj) == "string")
		obj = document.all[obj];

    if (obj.value.length == nMaxNum)
    {
		var nCode = parseInt(event.keyCode);
        if (nCode != 8 && nCode!=9 && nCode != 13 && nCode != 16 && nCode != 46 && (nCode < 33 || nCode > 40))
		{
            event.returnValue = false;
			jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
			bHasCheck = false;
			return false;
		}
    } else if (obj.value.length > nMaxNum)
    {
		event.returnValue = false;
        jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
		obj.value = obj.value.substring(0, nMaxNum);
		bHasCheck = false;
		return false;
    }
	bHasCheck = false;
	return true;
}
//1080423	Kevin_C	1080047	合併檢核邏輯，並修正訊息會跳兩次的問題 -E
//1060412 Cloud   1060240     鐵改調整，申請天數改為儲存/傳送前取得細項日期最大值計算-取得業務類別判斷計算日期時是否要計算假日-
var iCallID_GetWorkDays = null;
function fnGetWorkDays(argCloseDate)
{
    var index = document.all["dlWorkType"].selectedIndex;
    var obj = document.all["dlWorkType"].options[index];
    var wsAKParam = new Array(5);
    var KeyName = new Array(2);
    var KeyValue = new Array(2);
    var RtnFldName = new Array(2);
    var OrdFldName = new Array(1);

    KeyName[0] = "SOURCE_ORG";
    KeyName[1] = "B_TYPE_NO";
    KeyValue[0] = encodeURI(document.all.H_txSourceOrgNo.value);
    KeyValue[1] = encodeURI(obj.value);
    RtnFldName[0] = "LT_INC_HD";
    RtnFldName[1] = "DUE_RULE";

    OrdFldName[0] = "";
    wsAKParam[0] = "BUSINESS_TYPE";
    wsAKParam[1] = KeyName;
    wsAKParam[2] = KeyValue;
    wsAKParam[3] = RtnFldName;
    wsAKParam[4] = OrdFldName;
    callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, wsAKParam);
    wsGetFieldValue = callObj.id;
    OnWSResult(callObj);


    var param = new Array(3);
    //1060726 Justin [1060543] 取得是否要計算假日成功才計算申請天數--S
    if (jf_IsWebServiceSuccess(callObj))
    {
        //1060830 Justin [1060742] 弱掃XSS修正
        //param[0] = document.all.H_txStartDate.value;
        //param[1] = argCloseDate; //使用者輸入的限辦日期
        param[0] = encodeURI(document.all.H_txStartDate.value);
        param[1] = encodeURI(argCloseDate);
        if (document.all.H_txIncHd.value == "Y") //含假日
            param[2] = "1";
        else if (document.all.H_txIncHd.value == "H") //連續假日(連休3日Mode)
            param[2] = "3";
        else
            param[2] = "2";

        callObj = jf_CallWS("lib/TIME_LIB.asmx", "GetWorkDays", false, param);
        iCallID_GetWorkDays = callObj.id;
        if (!OnWSResult(callObj))
        {
            document.all.txApplyDay.value = "";
            document.all.txNDueDate.value = "";
            alert("申請後限辦日期不可小於起算日期，請重新輸入");
            return false;
        }
        else
        {
            document.all.txApplyDay.value = callObj.value.RtnStr;
            document.all.txNDueDate.value = argCloseDate;
            return true;
        }
    }
    else
    {
        alert("以業務類別判斷是否要計算假日時，取得失敗，KeyValue：'" + KeyValue[0] + "','" + KeyValue[1] + "'。");
        return false;
    }
    //1060726 Justin [1060543] 取得是否要計算假日成功才計算申請天數--E

}
//1130918   Cloud   1130941     弱掃XSS修正-S
var arrDesc = new Array("lbDesc", "DescList1", "DescList2", "DescList3", "DescList4", "DescList5");
function SetDescDecode() {
    for (var iDsc = 0; iDsc < arrDesc.length; iDsc++) {
        htmlDecode(arrDesc[iDsc]);
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
//1130918   Cloud   1130941     弱掃XSS修正-E
