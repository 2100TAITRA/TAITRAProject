/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2007.02.09
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2006.11.06	David	951086	以完整網頁呼叫WS避免因單位採用不同的FILENO_SEP(ex:/)而導致網頁導向參考錯誤
 * 2006.12.07	David	955218	交通部 - 櫥位號
 * 2006.12.15	Whay  	950522	文檔號分開
 * 2006.12.15 	Whay	950721  增加資訊流程傳送鈕 
 * 2007.02.09 	Andy	000243  於儲存前增加判斷調閱明細內容是否皆可調閱
 * 2008.01.25	Leslie	951141	增加處理整卷中有部分公文已被(或申請中)檢調時，PostBack回Server進行案/卷的展開
 * 2008.03.13	Leslie	0970164	桃園環保局，增加外機關借調相關欄位及相關Event
 * 2008.07.08	Leslie	0970512	額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
 * 2011.09.01	Jeff	1000671	增加專人核可功能按鈕相對應button onclick事件
 * 2012.08.10	Ken		1010339	增加檢核公文保存狀況
 * 2013.05.01	Cloud	1020298	修正開啟時切換調案方式異常的bug 
 * 2013.08.01	Erin	1020357 修正確認後無法正常關閉問題(將onload時第一次call webservice mark掉)
 * 2014.01.13	Eileen	1021079	[高港警]新增『列印申請單(直式)』功能
 * 2014.11.12	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 2015.03.27	Gabby	1040100	[FDA]修正多判斷可調檔分類號
 * 2016.01.22   Kenny   1041039 依公文承辦單位調整主旨顯示；清除時增加保留不可見公文單位隱藏欄位值
 * 2016.02.01   Kenny   1041039 增加判斷當RPSDEPT_NO未設定時處理
 * 2016.05.11   Cloud   1050087 升級二代
 * 1051019      Joe		1050087	二代修正配合行動平台
 * 1060907      Justin	1060636	(中興)修改訊息內容
 * 1061103		Zen		1061071	修正點擊核可多次會收到重複通知之問題
 * 1061208      Zen     1061206 (中興)再修改訊息內容
 * 1070412      Zen     1061071 修正檢核失敗後無法postback之問題
 * 1080111		Kevin_C	1071259	修正AKS502帶回調按單號無法開啟的問題
 * 1080423		Kevin_C	1080047	增加字數檢核
 * 1080916      Kevin_C 1080774 新增撤回功能
 * 1090421		Kevin_C	1090250	增加檢核預計歸還日
 * 1090504 		Cloud 	1080750 判斷由通知開啟時，文號提供超連結直接可線上瀏覽-s
 * 1090527		Cloud	1090250	修正此單bug
 * 1100906		Cloud	1090868	增加檢核，調案運用類型不可空白
 * 1110103      Zen     1101292 修正多次點擊重複PostBack之問題
 * 1110105      Cloud   1101431 for 舊系統影像轉入，調整單文瀏覽行為
 * 1110207      Cloud   1101502 [考試院]新增調案性質選項
 * 1110812      Cloud   1110404、1110405 增加整櫥申請紀錄
 * 2023.09.12	Cloud 	1120723	Merge1050994新增審核流程明細表列印/預覽功能
 * 1140919      Cloud   1141137 修改支援外貿檔號拆開顯示
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var id_nowDataGrid = null;
var iCallID_qBorrowDetail = null;
var IsServerHandling = new Boolean();
var bAlertForMsg;
IsServerHandling = false;
var wsCheckDataKeyID = null;

//window.focus();
//2016.05.11   Cloud   1050087 升級二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle
//if (document.all["ValidationSummary1"].innerText != "")
//alert(document.all["ValidationSummary1"].innerText);
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
        case 'btKeyHelp':
            Page_BlockSubmit = true;
            //新增模式下才可查詢
            if (jf_GetActionMode() == LayoutModeNew && !document.all["txBorNo"].readOnly)
            {
                var k1 = document.all["dlBorType"].value;
                // xOldKey = document.all["TextBox2"].value;
                var strUrl = "AKS502.aspx?rtnObj=lbReturnValue&k1=" + k1;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
                jf_OpenChildWin(strUrl, "AKS502_customwindow", 700, 500);
            }
            break;
            //1050511 Cloud 1050087 升級二代
            /*case 'btCalendar':
                Page_BlockSubmit=true;
                jf_CallCalendar(document.all["dateApply"], event.screenX, event.screenY);
                break;
            //0970164	Leslie	新增外機關借調，預計歸檔日期
            case 'btDueCalendar':
                Page_BlockSubmit=true;
                jf_CallCalendar(document.all["txDueDate"], event.screenX, event.screenY);
                CheckDueDate();			
                break;*/
    }
}
//1050518 Cloud	1050087 升級二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
    {
        //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    //1050511 Cloud 1050087 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;
    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //Page_BlockSubmit = (document.all["txBorNo"].value == "");
            //1050511 Cloud 1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1000901	Jeff	1000671		新增核可功能
        case "btApprove":
        case "btSave":
            Page_BlockSubmit = false;
            bBorrowDetailFalse = false;
			

            if (document.all["dg1"] == null || document.all["dg1"].rows.length < 2)
            {
                alert("沒有調案資料可供儲存");
                Page_BlockSubmit = true;
                return;
            }
            //* 1100906		Cloud	1090868	增加檢核，調案運用類型不可空白
            if (document.all["AKT800_USE_USAGR_TYPE"] && document.all["AKT800_USE_USAGR_TYPE"].value == "Y") {
                if (document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].value == "") {
                    alert("調案運用類型不可為空白。");
                    Page_BlockSubmit = true;
                    return;
                }
            }
            if (document.all["dateApply"].value == "")
            {
                alert("請輸入申請日期");
                Page_BlockSubmit = true;
                return;
            }
            var bHasRecord = false;
            //950522 以檔號為檢核條件 by whay
            for (i = 2; i <= document.all["dg1"].rows.length; i++)
            {
                tag = "dg1__ctl" + i + "_txFileNo";

                if (document.all[tag] == null || document.all[tag].value == "")
                    continue;
                bHasRecord = true;
            }
            if (bHasRecord == false)
            {
                for (i = 2; i <= document.all["dg1"].rows.length; i++)
                {
                    tag = "dg1__ctl" + i + "_txDocNo";

                    if (document.all[tag] == null || document.all[tag].value == "")
                        continue;
                    bHasRecord = true;
                }
            }
            if (bHasRecord == false)
            {
                alert("沒有調案資料可供儲存");
                Page_BlockSubmit = true;
                return;
            }

            //950522 以檔號為檢核是否範圍重複條件 by whay
            for (i = 2; i <= document.all["dg1"].rows.length; i++)
            {
                tag = "dg1__ctl" + i + "_txFileNo";
                str = document.all[tag].value;
                if (str != "")
                {
                    for (j = i; j <= document.all["dg1"].rows.length; j++)
                    {
                        tag2 = "dg1__ctl" + j + "_txFileNo";
                        str2 = document.all[tag2].value;

                        if (i == j)
                            continue;

                        if (str == str2.substring(0, str.length))
                        {
                            //連同文號進行檢核 #2007.03.05 Andy
                            var strDoc1 = jf_Trim(document.all["dg1__ctl" + i + "_txDocNo"].value);
                            var strDoc2 = jf_Trim(document.all["dg1__ctl" + j + "_txDocNo"].value);
                            if (strDoc1 == strDoc2 || strDoc1 == "" || strDoc2 == "")
                            {
                                alert("第" + (i - 1) + "筆和第" + (j - 1) + "筆申請範圍重覆");
                                Page_BlockSubmit = true;
                                break;
                            }
                        }
                    }
                }
                /*if (str != "")
				{
					for (j=i; j <= document.all["dg1"].rows.length; j++)
					{
						tag2 = "dg1__ctl" + j + "_txDocNo";
						str2 = document.all[tag2].value;
						
						if (i == j)
							continue;

						if (str == str2.substring(0, str.length))
						{
							alert("第" + (i-1) + "筆和第" + (j-1) + "筆申請範圍重覆");
							Page_BlockSubmit = true;
							break;
						}
					}
				}*/
            }

            if (document.all["dlBorType"].value == "2")
            {
                for (i = 2; i <= document.all["dg1"].rows.length; i++)
                {
                    tag = "dg1__ctl" + i + "_lbFileExist";

                    if (document.all[tag] == null)
                        continue;

                    str = document.all[tag].value;
                    if (str == "0")
                    {
                        msg = "序號" + (i - 1) + "無數位內容，不允許申請線上調檔";
                        alert(msg);
                        Page_BlockSubmit = true;
                        break;
                    }
                }
            }
            if (CheckSecDocHasReason())
                Page_BlockSubmit = Page_BlockSubmit || false;
            else
                Page_BlockSubmit = true;
            // 新增模式需檢查此調案單號是否存在
            if (Page_BlockSubmit == false && jf_GetActionMode() == LayoutModeNew)
            {
                var arKeyName = new Array(1);
                var arKeyValue = new Array(1);
                arKeyName[0] = "BOR_NO";
                arKeyValue[0] = document.all["txBorNo"].value;

                var arWSParam = new Array(3);
                arWSParam[0] = "BORROW_MAIN";
                arWSParam[1] = arKeyName;
                arWSParam[2] = arKeyValue;

                //95.11.06 951086 David 避免因單位採用不同的FILENO_SEP而導致網頁導向參考錯誤，所以重新組出網頁路徑
                callObj = jf_CallWS(ServerHeadPath + "template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
                if (callObj.error)
                    alert(callObj.errorDetail.string);
                else
                {
                    {
                        if (jf_IsWebServiceSuccess(callObj))
                        {
                            if (callObj.value.RtnBool == true)
                            {
                                alert('調案單號' + document.all["txBorNo"].value + '已存在，不允許儲存');
                                Page_BlockSubmit = true;
                            }
                            else
                                Page_BlockSubmit = false;
                        }
                    }
                }
            }

            //儲存前檢核是否檔案已借出 #2007.02.09 Andy
            for (i = 2; i <= document.all["dg1"].rows.length; i++)
            {
                if (bBorrowDetailFalse)
                    break;
                var strNo = jf_Trim(document.all["dg1__ctl" + i + "_txDocNo"].value);
                if (strNo != "")
                {
                    //1050518 Cloud	1050087 升級二代
                    //queryBorrowDetail(strNo, "dg1__ctl" + i + "_txDocNo");
                    queryBorrowDetail(event, strNo, "dg1__ctl" + i + "_txDocNo");
                }
                else
                {
                    strNo = jf_Trim(document.all["dg1__ctl" + i + "_txFileNo"].value);
                    if (strNo != "")
                    {
                        //1050518 Cloud	1050087 升級二代
                        //queryBorrowDetail(strNo, "dg1__ctl" + i + "_txFileNo");
                        queryBorrowDetail(event, strNo, "dg1__ctl" + i + "_txFileNo");
                    }
                }
            }

            //0970164	環保局新增外機關借調，需檢核預計歸還日
            //1110208 Cloud 1101502 [考試院]依調案性質判斷
            if (document.all["OrgNickName"].value == "EXAM")
            {
                if (!Checkdlurg())
                    Page_BlockSubmit = true;
            }
            else
            {
                if (!CheckDueDate())
                    Page_BlockSubmit = true;
            }

            //調閱明細中有不可調閱者則不可儲存 #2007.02.09 Andy
            if (bBorrowDetailFalse)
            {
                Page_BlockSubmit = true;
                bBorrowDetailFalse = false;
                return;
            }
			
			//1090421	Kevin_C	1090250	儲存前檢核預計歸還日
			//* 1090527		Cloud	1090250	修正此單bug
			//if(document.all["LIMIT_BOR_DUE_DATE"].value="Y")
			if(document.all["LIMIT_BOR_DUE_DATE"].value=="Y")
			{
				//有密件公文，則用DUE_DATE_SEC檢核預計歸還日，否則用DUE_DATE
				var strMaxDate = document.all["DUE_DATE"].value;
				var strDateNum = document.all["DUE_DATE_NUM"].value;
				for (i = 2; i < (document.all["dg1"].rows.length + 1) ; i++)
				{
					var IdtxSEC_NO = "dg1__ctl" + i + "_txSEC_NO";
					if (document.all[IdtxSEC_NO].value == "1") {
						strMaxDate = document.all["DUE_DATE_SEC"].value;
						strDateNum = document.all["DUE_DATE_SEC_NUM"].value;
						break;
					}
				}
				
				if(document.all.txDueDate.value!="")
				{
					if(document.all.txDueDate.value>strMaxDate)
					{
						alert("不可超過最大借閱天數："+strDateNum+"，系統將預設為可借閱最大日期");
						document.all.txDueDate.value = strMaxDate;
						Page_BlockSubmit = true;
					}
				}
				else
				{
					alert("未填入預計歸還日期，系統將自動依設定天數："+strDateNum+"，系統將預設為可借閱最大日期");
					document.all.txDueDate.value = strMaxDate;
					Page_BlockSubmit = true;
				}
			}

            //1050511 Cloud 1050087 升級二代
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050511 Cloud 1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDeleteMsg":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050511 Cloud 1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050511 Cloud 1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            //var k1 = document.all["dlBorType"].value;
            //caesar 0930815
            //先備份DropDownList dlBorType之值.再存回
            //以避免呼叫AKS502.ASPX時,所傳過去之K1變數值為空白,導致AKS502當掉
            var valBak = document.all["dlBorType"].value;
            //1010339	Ken	 101/08/10 新增
            var valBakLBT = document.all.txLastBorType.value;
            var valBakCBKN = document.all.txCantBorKeepNo.value;
            //1050122   Kenny   [1041039]   增加保留不可見公文單位隱藏欄位
            var valH_SpDeptlist = document.all.h_SpDeptlist.value;
            jf_ConfirmClean();
            fnCleanDg();
            document.all["dlBorType"].value = valBak;
            //0970164	Leslie	以下為外機關借調之"唯讀"欄位，進行手動清除內容
            document.all["txFromNo"].value = "";
            document.all["txFromOrg"].value = "";
            document.all["txFromSubject"].value = "";
            //1010339	Ken	 101/08/10 新增
            document.all.txLastBorType.value = valBakLBT;
            document.all.txCantBorKeepNo.value = valBakCBKN;
            //1050122   Kenny   [1041039]   增加保留不可見公文單位隱藏欄位
            document.all.h_SpDeptlist.value = valH_SpDeptlist;
            break;

            //950721 新增資訊流程按鈕 whay 
        case "btSearch":
            Page_BlockSubmit = true;
            if (jf_CheckKeyObject())
            {
                var strArtifact = document.all.nArtifact.value;

                //var strDocNo = document.all.txBorNo.value;
                //修改傳入正確參數值 #2007.04.09 Andy
                var strDocNo = document.all["dg1__ctl2_txDocNo"].value;
                var strBorNo = document.all.txBorNo.value;
                var strHttp = document.all.nHttp.value;
                var strSourceOrgno = document.all.nSourceOrgno.value;

                //var strUrl =strHttp+"ODI260.aspx?nFrom=AKT800&pDocNo = "+strDocNo+"&uApplyNo=" +strDocNo+"&SAMLart=" + strArtifact;
                //修改傳入正確參數值 #2007.04.09 Andy
                //var strUrl =strHttp+"ODI260.aspx?nFrom=AKT800&pDocNo="+strDocNo+"&uApplyNo="+strBorNo+"&SAMLart="+strArtifact;
                //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
                var strUrl = strHttp + "EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argMsgFrom=AKT800&argMsgFromId=" + strBorNo + "&SAMLart=" + strArtifact;

                jf_OpenChildWin(strUrl, "EDI200", 700, 500);
            }
            //1050511 Cloud 1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //2014.01.13 Eileen [1021079] 新增『列印申請單(直式)』功能
        case "btPrintVertical":
        case "btPrint":
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
            //1050511 Cloud 1050087 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btTransfer":
            //var strUrl = "AKT800C1.aspx?BOR_NO=" + document.all.txBorNo.value+"&USER=" + document.all["USER"].value;
            //jf_OpenChildWin(strUrl, "", 400, 250 );
            //Page_BlockSubmit = true;
            //jf_ToolBarSubmit();
            Page_BlockSubmit = false;
            //2014.01.13 Eileen [1021079] 調整「線上簽核傳送」toolbar index --start
            //var ddlIdx=5;
            var ddlIdx = 6;
            //Eileen --end
            //1050511 Cloud [1050087] 升級二代-無用 mark
            //var nextOpt = GetToolbarCtrl(ddlIdx);
            //if(nextOpt==null)
            //alert('null');
            //CAESAR DEBUGGING CODE
            /*
			var aOptions = nextOpt.getOptions();	
				alert(aOptions.value);
				alert(aOptions.selectedIndex);
				if(aOptions!=null)
				{
					alert(aOptions[0].innerText);
					alert(aOptions[0].value);
				}
			}
			*/
            //1050511 Cloud [1050087] 升級二代-改由選單直接取得
            //var aOptions = nextOpt.getOptions();	
            //document.all.SelectedUser.value = aOptions.value;
            //document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;
            document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
        	//1090421	Kevin_C	1090250	儲存前檢核預計歸還日
			//* 1090527		Cloud	1090250	修正此單bug
            //if (document.all["LIMIT_BOR_DUE_DATE"].value = "Y")
			if (document.all["LIMIT_BOR_DUE_DATE"].value == "Y")
            {
            	//有密件公文，則用DUE_DATE_SEC檢核預計歸還日，否則用DUE_DATE
            	var strMaxDate = document.all["DUE_DATE"].value;
            	var strDateNum = document.all["DUE_DATE_NUM"].value;
            	for (i = 2; i < (document.all["dg1"].rows.length + 1) ; i++)
            	{
            		var IdtxSEC_NO = "dg1__ctl" + i + "_txSEC_NO";
            		if (document.all[IdtxSEC_NO].value == "1")
            		{
            			strMaxDate = document.all["DUE_DATE_SEC"].value;
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
            			Page_BlockSubmit = true;
            		}
            	}
            	else
            	{
            		alert("未填入預計歸還日期，系統將自動依設定天數：" + strDateNum + "，系統將預設為可借閱最大日期");
            		document.all.txDueDate.value = strMaxDate;
            		Page_BlockSubmit = true;
            	}
			}
            //* 1100906		Cloud	1090868	增加檢核，調案運用類型不可空白
			if (document.all["AKT800_USE_USAGR_TYPE"] && document.all["AKT800_USE_USAGR_TYPE"].value == "Y") {
			    if (document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].value == "") {
			        alert("調案運用類型不可為空白。");
			        Page_BlockSubmit = true;
			        return;
			    }
			}
            //1050511 Cloud 1050087 升級二代
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "ddlNextUser":
            //1050511 Cloud	不知道為啥alert，mark
            //alert('');
            break;
		//1080916   Kevin_C   1080774 新增撤回功能
        case "btBack":
            Page_BlockSubmit = !window.confirm("確定要撤回嗎?");
            jf_ToolBarSubmit(xObjectName);
            break;
            //* 2023.09.12	Cloud 	1120723	Merge1050994新增審核流程明細表列印/預覽功能
		case "btPreviewDetail":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
    }
}


/*function GetToolbarCtrl(argId)
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

function CallBack(argCallerId)
{
    if (argCallerId == "AKS502")
    {
        document.all["txBorNo"].value = document.all["lbReturnValue"].options[0].value;
        document.all["autoPB"].value = "1";
        //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
		//1080111	Kevin_C	1071259	修正AKS502帶回調按單號無法開啟的問題
        //IsServerHandling = true;
        //__doPostBack("", ""); //for .NET Framework 1.1
		Page_BlockSubmit = false;
		jf_OpenButtonSubmit();
    }
    else if (argCallerId == "AKT800C1")
    {
        if (document.all["lbReturnValue"].options[0].value == '1')
            alert("傳送成功");
        else if (document.all["lbReturnValue"].options[0].value != '2')
            alert("傳送失敗，錯誤訊息如下：" + document.all["lbReturnValue"].options[0].text);
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

//Leslie	常用申請理由下拉式選單的動作
function DLLPhraseNoChanged(event)
{
    //1050518 Cloud	1050087	升級二代
    //id_nowDataGrid = event.srcElement.id;
    id_nowDataGrid = event.target.id;
    var index = document.all[id_nowDataGrid].selectedIndex;
    //1050518 Cloud	1050087	升級二代
    //var val		= document.all[id_nowDataGrid].options[index].innerText;
    var val = document.all[id_nowDataGrid].options[index].textContent;
    id_secs = id_nowDataGrid.split("_", 4);
    var idTxReason = id_secs[0] + "__" + id_secs[2] + "_txReason";
    document.all[idTxReason].value += val;
    document.all[id_nowDataGrid].options[0].selected = true;
    //105011 Cloud  [1050087] 升級二代
    //document.all[idTxReason].focus();
    $('idTxReason').focus();
}

//function queryBorrowDetail(file_no)
function queryBorrowDetail(event, file_no)
{
    //queryBorrowDetail(file_no, "");
    queryBorrowDetail(event, file_no, "");
}

var strBorrowType = ""; //1：文號調單文；2：檔號調多文 #2007.03.01 Andy

//1010339	Ken	 101/08/10	檢核用變數
var bBorTypeChange = false;
//1010339	Ken	 101/08/10	調案方式改變
function GetBorTypeChange()
{
    var bMoreOne = 0;
    for (i = 2; i < (document.all["dg1"].rows.length) ; i++)
    {
        if (document.all["dg1__ctl" + i + "_txRealCanBor"].value != "")
        {
            bMoreOne = 1;
            break;
        }
    }
    //1020501 Cloud	[1020298]	修改判斷邏輯
    //if(bMoreOne!=0 && !bBorTypeChange && confirm("切換調案方式將重新檢核公文是否可供調案，是否繼續？"))
    if (bMoreOne != 0)
    {
        if (!bBorTypeChange && confirm("切換調案方式將重新檢核公文是否可供調案，是否繼續？"))
        {
            for (i = 2; i < (document.all["dg1"].rows.length) ; i++)
            {
                var bCheck = true;

                if ((document.all.dlBorType[0].selected || document.all.dlBorType[2].selected) && document.all["dg1__ctl" + i + "_txRealCanBor"].value == "0")
                    bCheck = false;
                else if (document.all.dlBorType[1].selected && document.all["dg1__ctl" + i + "_lbFileExist"].value == "0")
                    bCheck = false;

                if (!bCheck)
                {
                    document.all["dg1__ctl" + i + "_txDocNo"].value = "";
                    document.all["dg1__ctl" + i + "_txFileNo"].value = "";
                    document.all["dg1__ctl" + i + "_txDept"].value = "";
                    document.all["dg1__ctl" + i + "_txSubject"].value = "";
                    document.all["dg1__ctl" + i + "_lbFileExist"].value = "";
                    document.all["dg1__ctl" + i + "_txSEC_NO"].value = "";
                    document.all["dg1__ctl" + i + "_txStockNo"].value = "";
                    //document.all["dg1__ctl" + i + "_lbAttInfo"].innerText	= "";
                    //document.all["dg1__ctl" + i + "_lbAttInfo"].href		= "";
                    document.all["dg1__ctl" + i + "_txRealCanBor"].value = "";
                }
            }
        }
        else
        {
            document.all.dlBorType.value = document.all.txLastBorType.value;
        }
        document.all.txLastBorType.value = document.all.dlBorType.value;
        bBorTypeChange = false;
    }
}

//修改為可傳入指定控制項id #2007.02.09 Andy
//function queryBorrowDetail(file_no, id)
function queryBorrowDetail(event, file_no, id)
{
    var gotoCASE_MAIN = false;
    var param = new Array(6);

    var NoSecs = new Array(5);

    if (id)
        id_nowDataGrid = id;
    else
        //id_nowDataGrid = event.srcElement.id;
        id_nowDataGrid = event.target.id;


    if (file_no == "")
    {
        var id_secs = new Array(4);

        id_secs = id_nowDataGrid.split("_", 4);
        var idTxDept = id_secs[0] + "__" + id_secs[2] + "_txDept";
        var idTxSubject = id_secs[0] + "__" + id_secs[2] + "_txSubject";

        //95.12.07 955218 David
        var idTxStock = id_secs[0] + "__" + id_secs[2] + "_txStockNo";
        var idTxDocNo = id_secs[0] + "__" + id_secs[2] + "_txDocNo";
        var idTxFileNo = id_secs[0] + "__" + id_secs[2] + "_txFileNo";

        //觸發onblur的文號無值但檔號有值時以檔號取得公文資訊 #2007.03.01 Andy
        if (id_nowDataGrid.indexOf("txDocNo") != -1 && jf_Trim(document.all[idTxFileNo].value) != "")
            file_no = jf_Trim(document.all[idTxFileNo].value);
        //觸發onblur的檔號無值但文號有值時以文號取得公文資訊 #2007.03.01 Andy
        if (id_nowDataGrid.indexOf("txFileNo") != -1 && jf_Trim(document.all[idTxDocNo].value) != "")
            file_no = jf_Trim(document.all[idTxDocNo].value);
        //文號及檔號均無值則清空該列 #2007.03.01 Andy
        if (file_no == "")
        {
            document.all[id_nowDataGrid].value = "";
            document.all[idTxDept].value = document.all[idTxSubject].value = "";

            //95.12.07 955218 David
            document.all[idTxStock].value = "";
            document.all[idTxDocNo].value = "";
            document.all[idTxFileNo].value = "";
            return;
        }
    }

    NoSecs = file_no.split(document.all["fileno_sep"].value, 5);

    var KeyName;
    var KeyValue

    if (NoSecs.length == 1)			//<!-- 單純文號 -->
    {
        strBorrowType = "1";

        param[0] = file_no;
        param[1] = "";
        param[2] = "";
        param[3] = "";
        param[4] = "";
        param[5] = "";
    }
        //檔號各部份要有值才算完整檔號 #2007.03.01 Andy
    else if (NoSecs.length == 5 && NoSecs[0] != "" && NoSecs[1] != "" && NoSecs[2] != "" && NoSecs[3] != "" && NoSecs[4] != "")	//<!-- 完整檔號 -->
    {
        strBorrowType = "2";

        id_secs = id_nowDataGrid.split("_", 4);
        param[0] = jf_Trim(document.all[id_secs[0] + "__" + id_secs[2] + "_txDocNo"].value); //有文號時仍傳入 #2007.03.05 Andy
        //param[0] = "";
        param[1] = NoSecs[0];
        param[2] = NoSecs[1];
        param[3] = NoSecs[2];
        param[4] = NoSecs[3];
        param[5] = NoSecs[4];
    }
        //檔號各部份要有值才算完整卷號 #2007.03.01 Andy
    else if (NoSecs.length == 4 && NoSecs[0] != "" && NoSecs[1] != "" && NoSecs[2] != "" && NoSecs[3] != "")	//<!-- 檔號只輸到卷號 -->
    {
        strBorrowType = "2";

        id_secs = id_nowDataGrid.split("_", 4);
        param[0] = jf_Trim(document.all[id_secs[0] + "__" + id_secs[2] + "_txDocNo"].value); //有文號時仍傳入 #2007.03.05 Andy
        //param[0] = "";
        param[1] = NoSecs[0];
        param[2] = NoSecs[1];
        param[3] = NoSecs[2];
        param[4] = NoSecs[3];
        param[5] = "";
    }
        //檔號各部份要有值才算完整案號 #2007.03.01 Andy
    else if (NoSecs.length == 3 && NoSecs[0] != "" && NoSecs[1] != "" && NoSecs[2] != "")	//<!-- 檔號只輸到案號 -->
    {
        /*
		strBorrowType = "2";
		
		id_secs = id_nowDataGrid.split("_", 4);
		param[0] = jf_Trim(document.all[id_secs[0] + "__" + id_secs[2] + "_txDocNo"].value); //有文號時仍傳入 #2007.03.05 Andy
		//param[0] = "";
		param[1] = NoSecs[0];
		param[2] = NoSecs[1];
		param[3] = NoSecs[2];
		param[4] = "";
		param[5] = "";	
		*/
        alert("檔號不完整,不可以整案調出!");
        //1050511 Cloud 1050087 升級二代
        //document.all[id_nowDataGrid].focus();
        $(id_nowDataGrid).focus();
        bBorrowDetailFalse = true;
        return;
    }
    else
    {
        var id_secs = new Array(4);
        id_secs = id_nowDataGrid.split("_", 4);
        var idTxDept = id_secs[0] + "__" + id_secs[2] + "_txDept";
        var idTxSubject = id_secs[0] + "__" + id_secs[2] + "_txSubject";
        var idTxStock = id_secs[0] + "__" + id_secs[2] + "_txStockNo";
        var idTxDocNo = id_secs[0] + "__" + id_secs[2] + "_txDocNo";
        var idTxFileNo = id_secs[0] + "__" + id_secs[2] + "_txFileNo";

        //觸發onblur的檔號不完整但文號有值時以文號取得公文資訊 #2007.03.01 Andy
        if (id_nowDataGrid.indexOf("txFileNo") != -1 && jf_Trim(document.all[idTxDocNo].value) != "")
        {
            strBorrowType = "1";

            param[0] = jf_Trim(document.all[idTxDocNo].value);
            param[1] = "";
            param[2] = "";
            param[3] = "";
            param[4] = "";
            param[5] = "";
        }
        else //檔號不完整則清空該列 #2007.03.01 Andy
        {
            strBorrowType = "";

            document.all[idTxDept].value = "";
            document.all[idTxSubject].value = "";
            document.all[idTxStock].value = "";
            document.all[idTxDocNo].value = "";
            document.all[idTxFileNo].value = "";

            alert("檔號不完整");
            return;
        }
    }
    //RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetApplyDocInfo", false, param);
    //95.11.06 951076 David	避免因單位採用不同的FILENO_SEP而導致網頁導向參考錯誤，所以重新組出網頁路徑
    RtnObj = jf_CallWS(ServerHeadPath + "lib/AK_LIB.asmx", "GetApplyDocInfo", false, param);

    iCallID_qBorrowDetail = RtnObj.id;
    OnWSResult(RtnObj);
}
//95.11.06 951086 David 避免因單位採用不同的FILENO_SEP而導致網頁導向參考錯誤，所以重新組出網頁路徑
var ServerHeadPath = "";
AccessServerPath();

function AccessServerPath()
{
    ServerHeadPath = document.URL;
    var arr1 = ServerHeadPath.split('?');
    var arr2 = arr1[0].split('/');
    var temp = "";
    for (i = 0; i < arr2.length - 1; i++)
    {
        if (temp != "")
            temp += "/";
        temp += arr2[i];
    }
    ServerHeadPath = temp + "/";
}

function ClientOnLoad()
{
    // dummy ws caller
    //95.11.06 951086 David 避免因單位採用不同的FILENO_SEP而導致網頁導向參考錯誤，所以重新組出網頁路徑
    //1020801  Erin [1020537] mark掉第一次call webservice，避免影響window close無法正常關閉視窗
    //jf_CallWS(ServerHeadPath+"lib/AK_LIB.asmx", "Dummy", false, null);	
    //jf_CallWS(ServerHeadPath+"template/lib/sys.asmx", "Dummy", false, null);
    if (bAlertForMsg == true)
    {
        //1060907 Justin [1060636] (中興)修改訊息內容
        if (document.all["OrgNickName"].value == "NCHU")
            //1061208 Zen 1061206 (中興)再修改訊息內容
            //alert('您目前所申請調檔之檔案，不符合同一單位同一承辦人的條件，請重新提出申請或聯絡檔案管理人員。');
            alert('本調案申請單內之檔案，因跨單位或分屬不同承辦人，無法送出。請調整申請單內的檔案皆為同一單位內之同一位承辦人。');
        else
            alert('您目前所申請調檔之檔案,同時包含同科、跨科或跨組之調案申請流程,\n系統將不提供線上調案申請之流程(含不同承辦人),請自行列印調案單或重新提出調案之申請!!');
    }

    //95.12.07 955218 David	
    if (document.all["hidStockUse"].value == "N")
    {
        //document.all["MainDGTable"].style.width = 848;
        //document.all["pTitle"].style.width = 800;
    }
    //1110207      Cloud   1101502 [考試院]新增調案性質選項
    if (document.all["OrgNickName"].value == "EXAM")
        SetOtherInfo();
    //* 1140919      Cloud   1141137 外貿檔號拆開顯示
    if (document.all["OrgNickName"].value == "TAITRA") {
        document.all["colNameHeader"][0].textContent = "文號";
    }
}

var bBorrowDetailFalse = false;
function OnWSResult(argResult)
{
    //增加文號onblur帶出檔號 by whay
    if (argResult.id == iCallID_qBorrowDetail)
    {
        //1010339	Ken	 101/08/14 改放到外面宣告
        var bCanBorrow = true;
        var id_secs = new Array(4);
        id_secs = id_nowDataGrid.split("_", 4);
        var idTxDocNo = id_secs[0] + "__" + id_secs[2] + "_txDocNo";
        var idTxFile_no = id_secs[0] + "__" + id_secs[2] + "_txFileNo";
        var idTxDept = id_secs[0] + "__" + id_secs[2] + "_txDept";
        var idTxSubject = id_secs[0] + "__" + id_secs[2] + "_txSubject";
        var idTxFileExist = id_secs[0] + "__" + id_secs[2] + "_lbFileExist";
        var idTxSEC_NO = id_secs[0] + "__" + id_secs[2] + "_txSEC_NO";
        var idTxStock = id_secs[0] + "__" + id_secs[2] + "_txStockNo";
        var idtxRealCanBor = id_secs[0] + "__" + id_secs[2] + "_txRealCanBor";
        //2015.03.27 Gabby[1040100][FDA]修正多判斷可調檔分類號
        var idlbHCLS_KEY = id_secs[0] + "__" + id_secs[2] + "_txHCLS_KEY";
        //111.02.08 Cloud 1101502 增加取得最上層分類號-及放入預設原因
        var idHUpCLS_KEY = id_secs[0] + "__" + id_secs[2] + "_H_txUpestClsKey";
        var IdtxReason = id_secs[0] + "__" + id_secs[2] + "_txReason";
        //* 1110812      Cloud   1110404、1110405 增加整櫥申請紀錄
        var IdtxAllStock = id_secs[0] + "__" + id_secs[2] + "_h_AllStock";

        

        WSResult = argResult.value;
        if (jf_IsWebServiceSuccess(argResult))
        {
            //1010339	Ken	 101/08/14	 線上調檔則不作以下檢核
            //if(WSResult.IsBor != "0" && WSResult.BorNo != document.all["txBorNo"].value)
            if ((WSResult.IsBor != "0" && WSResult.BorNo != document.all["txBorNo"].value) && !document.all.dlBorType[1].selected)
            {
                var bIsBorrowPartOf = false;
                if (WSResult.IsBor == "2")
                {
                    if (strBorrowType == "2" && WSResult.BorCount != "0")	//951141	Leslie	顯示已有XX份公文被借出
                        bIsBorrowPartOf = window.confirm("共有 " + WSResult.BorCount + " 件已被檢調，是否仍要檢調本案/卷中其他未被調用之檔案？");
                    else
                        alert("您輸入的公文已被借出，調案單號為 " + WSResult.BorNo);
                }
                else
                {
                    
                    //* 1110812      Cloud   1110404、1110405 增加整櫥申請紀錄
                    if (WSResult.IsBor == "3" && document.all["OrgNickName"].value == "MOTC") {
                        alert("您輸入的公文已被其他使用者申請整櫥借出中，調案單號為 " + WSResult.BorNo + "，調案單位：" + WSResult.BorDept + "，調案人：" + WSResult.BorEmp);
                    }
                    else {
                        if (strBorrowType == "2" && WSResult.BorCount != "0")
                            bIsBorrowPartOf = window.confirm("共有 " + WSResult.BorCount + " 件已被申請檢調，是否仍要檢調本案/卷中其他未被調用之檔案？");
                        else
                            alert("您輸入的公文已被其他使用者申請，調案單號為 " + WSResult.BorNo);
                    }
                    
                }

                //1010339	Ken	 101/08/14 改放到外面宣告
                //var id_secs = new Array(4);
                //id_secs = id_nowDataGrid.split("_", 4);
                //var idTxDocNo		= id_secs[0] + "__" + id_secs[2] + "_txDocNo";
                //var idTxFile_no     = id_secs[0] + "__" + id_secs[2] + "_txFileNo";
                //var idTxDept		= id_secs[0] + "__" + id_secs[2] + "_txDept";
                //var idTxSubject		= id_secs[0] + "__" + id_secs[2] + "_txSubject";
                //var idTxFileExist	= id_secs[0] + "__" + id_secs[2] + "_lbFileExist";
                //var idTxSEC_NO		= id_secs[0] + "__" + id_secs[2] + "_txSEC_NO";
                ////95.12.07 955218 David
                //var idTxStock		= id_secs[0] + "__" + id_secs[2] + "_txStockNo";

                document.all[idTxDocNo].value = "";

                if (!bIsBorrowPartOf)
                    //1010339	Ken	 101/08/14 檢核不通過最後一併處理
                    //document.all[idTxFile_no].value		= "";
                    bCanBorrow = false;
                else	//951141	Leslie	若使用者欲申請整卷調案，而該檔案"已有部分公文被借出"時，PostBack回Server端進行DataGrid展開
                {
                    document.all[idTxFile_no].value = WSResult.FileNo;
                    //* 1140917      Cloud   1141137 修改支援外貿檔號拆開顯示
                    if (document.all["OrgNickName"].value == "TAITRA")
                        SetFileNoToColumn(WSResult.FileNo, id_secs);

                    document.all.IsBorrowPartOf.value = "true";
                    IsServerHandling = true;
                    __doPostBack("", 0);
                    return;
                }

                //1010339	Ken	 101/08/14 檢核不通過最後一併處理
                //document.all[idTxDept].value		= "";
                //document.all[idTxSubject].value		= "";
                //document.all[idTxFileExist].value	= "";
                //document.all[idTxSEC_NO].value		= "";
                ////95.12.07 955218 David
                //document.all[idTxStock].value		= "";
                //bBorrowDetailFalse = true;
                //strBorrowType = "";
                //return;
            }
            else
            {
                //1010339	Ken	 101/08/14 改放到外面宣告
                //var id_secs = new Array(4);
                //id_secs = id_nowDataGrid.split("_", 4);
                //var idTxDocNo		= id_secs[0] + "__" + id_secs[2] + "_txDocNo";
                //var idTxFile_no		= id_secs[0] + "__" + id_secs[2] + "_txFileNo";
                //var idTxDept		= id_secs[0] + "__" + id_secs[2] + "_txDept";
                //var idTxSubject		= id_secs[0] + "__" + id_secs[2] + "_txSubject";
                //var idTxFileExist	= id_secs[0] + "__" + id_secs[2] + "_lbFileExist";
                //var idTxSEC_NO		= id_secs[0] + "__" + id_secs[2] + "_txSEC_NO";
                ////95.12.07 955218 David
                //var idTxStock		= id_secs[0] + "__" + id_secs[2] + "_txStockNo";

                //1010339	Ken	 101/08/14 改寫 -Start
                //if (!fnCheckDocState1(WSResult.DocState))
                //{
                // bCanBorrow = false;
                // document.all[idTxDocNo].value		= "";
                // document.all[idTxFile_no].value		= "";
                // document.all[idTxDept].value		= "";
                // document.all[idTxSubject].value		= "";
                // document.all[idTxFileExist].value	= "";
                // document.all[idTxSEC_NO].value		= "";
                // jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號："+WSResult.DocNo+"尚未點收，無法進行調案"])),"");
                // bBorrowDetailFalse = true;
                // strBorrowType = "";
                // return;
                //}
                //if (!fnCheckDocState2(WSResult.DocState))
                //{
                // bCanBorrow = false;
                // document.all[idTxDocNo].value		= "";
                // document.all[idTxFile_no].value		= "";
                // document.all[idTxDept].value		= "";
                // document.all[idTxSubject].value		= "";
                // document.all[idTxFileExist].value	= "";
                // document.all[idTxSEC_NO].value		= "";
                // jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號："+WSResult.DocNo+fnGetStatusName(WSResult.DocState)+"，無法進行調案"])),"");
                // bBorrowDetailFalse = true;
                // strBorrowType = "";
                // return;
                //}

                var strDocState = "";
                var strErrMsg = "";
                var bDocState = true;

                //公文狀態
                bDocState = fnCheckDocState1(WSResult.DocState)

                if (!bDocState)
                    strDocState = "尚未點收";
                else
                {
                    bDocState = fnCheckDocState2(WSResult.DocState)
                    if (!bDocState)
                        strDocState = fnGetStatusName(WSResult.DocState);
                }

                //保存狀況
                if (WSResult.KeepState != "" && bDocState)
                {
                    if (document.all.txCantBorKeepNo.value.indexOf(WSResult.KeepState + ";") != -1)
                    {
                        bDocState = false;

                        for (i = 0; i < document.all.ddlKeepState.length; i++)
                        {
                            if (WSResult.KeepState == document.all.ddlKeepState[i].value)
                            {
                                strDocState = document.all.ddlKeepState[i].text;
                                break;
                            }
                        }
                    }
                }

                var bMoreOne = 0;
                for (i = 2; i < (document.all["dg1"].rows.length) ; i++)
                {
                    if (document.all["dg1__ctl" + i + "_txRealCanBor"].value != "")
                        bMoreOne += 1;
                }

                if ((document.all.dlBorType[0].selected || document.all.dlBorType[2].selected) && !bDocState)//原件or複製品
                {
                    if (WSResult.Volume != "")
                    {
                        //借調兩筆公文
                        if (bMoreOne > 0)
                        {
                            bCanBorrow = false;
                            alert("公文" + WSResult.DocNo + "狀態為：" + strDocState + "，僅供線上調檔。");
                        }
                            //第一筆借調公文
                        else if (confirm("公文" + WSResult.DocNo + "狀態為：" + strDocState + "，僅供線上調檔，是否轉為線上調檔？"))
                        {
                            bBorTypeChange = true;
                            document.all.dlBorType[1].selected = true;
                            //1020501	Cloud	[1020298] 放入調案方式	
                            document.all.txLastBorType.value = document.all.dlBorType[1].value;
                        }
                        else
                        {
                            bCanBorrow = false;
                        }
                    }
                    else
                    {
                        bCanBorrow = false;
                        alert("公文" + WSResult.DocNo + "狀態為：" + strDocState + "，且無正版影像，無法提供調檔。");
                    }
                }
                else if (document.all.dlBorType[1].selected && WSResult.Volume == "")//線上調檔
                {
                    if (bDocState)
                    {
                        //借調兩筆公文
                        if (bMoreOne > 0)
                        {
                            bCanBorrow = false;
                            alert("公文" + WSResult.DocNo + "無正版影像，僅供實體調檔。");
                        }
                            //第一筆借調公文
                        else if (confirm("公文" + WSResult.DocNo + "無正版影像，僅供實體調檔，是否轉為實體調檔？"))
                        {
                            bBorTypeChange = true;
                            document.all.dlBorType[0].selected = true;
                            //1020501	Cloud	[1020298] 放入調案方式	
                            document.all.txLastBorType.value = document.all.dlBorType[0].value;
                        }
                        else
                        {
                            bCanBorrow = false;
                        }
                    }
                    else
                    {
                        bCanBorrow = false;
                        alert("公文" + WSResult.DocNo + "無正版影像，且狀態為：" + strDocState + "，無法提供調檔。");
                    }
                }
                //1010339	Ken	 101/08/14 改寫 -End

                //1010339	Ken	 101/08/14 新增檢核
                if (bCanBorrow)
                {
                    //1010339	Ken	 101/08/14 新增是否可實體借調紀錄
                    if (bDocState)
                        document.all[idtxRealCanBor].value = "1";
                    else
                        document.all[idtxRealCanBor].value = "0";

                    if (strBorrowType != "2") //檔號調多文時不需要文號 #2007.03.01 Andy
                        document.all[idTxDocNo].value = WSResult.DocNo;

                    if (WSResult.Subject == "")
                        document.all[idTxFile_no].value = "";
                    else
                        document.all[idTxFile_no].value = WSResult.FileNo;
                    //1140919   Cloud   1141137 外貿檔號改拆開顯示
                    if (document.all["OrgNickName"].value == "TAITRA") {
                        if (WSResult.Subject == "")
                            SetFileNoToColumn("", id_secs);
                        else
                            SetFileNoToColumn(WSResult.FileNo, id_secs);
                    }
                    

                    if (WSResult.Subject == "")
                        document.all[idTxDept].value = "";
                    else
                        document.all[idTxDept].value = WSResult.DeptName;

                    document.all[idTxSubject].value = WSResult.Subject;
                    //1050122   Kenny   [1041039]   依公文承辦單位調整主旨顯示--Start--
                    var strH_SpDeptlist = document.all.h_SpDeptlist.value;
                    if (jf_Trim(strH_SpDeptlist) != "")
                    {
                        //1050201	Kenny	[1041039]	增加判斷當RPSDEPT_NO未設定時處理
                        //if ( strH_SpDeptlist.indexOf(WSResult.RpsDeptNo) != -1 )
                        if (WSResult.RpsDeptNo != "" && strH_SpDeptlist.indexOf(WSResult.RpsDeptNo) != -1)
                            document.all[idTxSubject].value = strH_SpDeptlist.split(":")[0];
                    }
                    //1050122   Kenny   [1041039]   依公文承辦單位調整主旨顯示--End--

                    if (WSResult.IsSec)
                        document.all[idTxSEC_NO].value = "1";
                    else
                        document.all[idTxSEC_NO].value = "0";

                    if (WSResult.Volume != "")
                        document.all[idTxFileExist].value = "1";
                    else
                        document.all[idTxFileExist].value = "0";

                    //95.12.07 955218 David
                    //document.all[idTxStock].value = WSResult.StockNo;
                    //#2007.03.02 Andy
                    if (WSResult.StockNo)
                        document.all[idTxStock].value = WSResult.StockNo;
                    else
                        document.all[idTxStock].value = "";

                    //2015.03.27 Gabby[1040100][FDA]修正多判斷可調檔分類號
                    if (WSResult.ClsKey) {
                        document.all[idlbHCLS_KEY].value = WSResult.ClsKey;
                        //111.02.08 Cloud 1101502 增加取得最上層分類號
                        var strUpClsKey = AK.AKT800.GetUpestClsKey(document.all.nSourceOrgno.value, WSResult.ClsKey).value;
                        if (strUpClsKey.indexOf("ERR")!=-1) {
                            console.log("取得最上層分類號發生異常-" + strUpClsKey);
                        }
                        else { document.all[idHUpCLS_KEY].value = strUpClsKey;}
                    }
                    else
                        document.all[idlbHCLS_KEY].value = "";
                    //1050511 Cloud [1050087]	 升級二代
                    //document.all[id_secs[0] + "__" + id_secs[2] + "_txReason"].focus(); //取得調案資料成功後focus到調案原因 #2007.03.01 Andy
                    $(id_secs[0] + "__" + id_secs[2] + "_txReason").focus(); //取得調案資料成功後focus到調案原因 #2007.03.01 Andy
                    //1110208 Cloud 1101502 判斷調案性質 放入預設原因
                    if (document.all["OrgNickName"].value == "EXAM")
                    {
                        if (document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].text != "機關內借調")
                        { document.all[IdtxReason].value = document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].text }
                    }

                    strBorrowType = "";
                    //* 1110812      Cloud   1110404、1110405 增加整櫥申請紀錄
                    if (WSResult.IsBor == "3" && WSResult.IS_PART_BOR=="1")
                        document.all[IdtxAllStock].value = "0";
                    else
                        document.all[IdtxAllStock].value = "1";
                }
            }
        }
            //1010339	Ken	 101/08/14 新增不能調案處理
        else
            bCanBorrow = false;

        //1010339	Ken	 101/08/14 重寫不能調案處理
        //else
        if (!bCanBorrow)
        {
            //1010339	Ken	 101/08/14 改放到外面宣告
            //var id_secs = new Array(4);
            //id_secs = id_nowDataGrid.split("_", 4);
            //var idTxDocNo		= id_secs[0] + "__" + id_secs[2] + "_txDocNo";
            //var idTxFile_no     = id_secs[0] + "__" + id_secs[2] + "_txFileNo";
            //var idTxDept		= id_secs[0] + "__" + id_secs[2] + "_txDept";
            //var idTxSubject		= id_secs[0] + "__" + id_secs[2] + "_txSubject";
            //var idTxFileExist	= id_secs[0] + "__" + id_secs[2] + "_lbFileExist";
            //var idTxSEC_NO		= id_secs[0] + "__" + id_secs[2] + "_txSEC_NO";
            ////95.12.07 955218 David
            //var idTxStock		= id_secs[0] + "__" + id_secs[2] + "_txStockNo";

            //1010339	Ken	 101/08/14 Mark
            //document.all[id_nowDataGrid].value	= "";
            document.all[idTxDocNo].value = "";
            document.all[idTxFile_no].value = "";
            //1140919   Cloud   1141137 外貿檔號改拆開顯示
            if (document.all["OrgNickName"].value == "TAITRA") {
                SetFileNoToColumn("", id_secs);
            }
            //1010339	Ken	 101/08/14 分開處理
            //document.all[idTxDept].value		= document.all[idTxSubject].value = "";
            document.all[idTxDept].value = "";
            document.all[idTxSubject].value = "";
            document.all[idTxFileExist].value = "";
            document.all[idTxSEC_NO].value = "";
            //95.12.07 955218 David
            document.all[idTxStock].value = "";
            //1010339	Ken	 101/08/14
            document.all[idtxRealCanBor].value = "N";
            //1050511 Cloud 1050087 升級二代
            //document.all[id_nowDataGrid].focus();
            $(id_nowDataGrid).focus();
            bBorrowDetailFalse = true;
            strBorrowType = "";
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
            document.all["txFromDocNo"].value = "";
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
    document.all[argLabelId].innerText = obj.value;
}

function CheckSecDocHasReason()
{
    var ErrId = "";
    for (i = 2; i < (document.all["dg1"].rows.length + 2) ; i++)
    {
        var IdtxSEC_NO = "dg1__ctl" + i + "_txSEC_NO";
        var IdtxReason = "dg1__ctl" + i + "_txReason";

        if (document.all[IdtxSEC_NO] == null)
            continue;

        if (document.all[IdtxSEC_NO].value == "1" && document.all[IdtxReason].value == "")
        {
            if (ErrId == "")
                ErrId = (i - 1);
            else
                ErrId += "," + (i - 1);
        }
    }
    if (ErrId != "")
    {
        var msg = "序號" + ErrId + "屬於密件，必須輸入調案原因";
        alert(msg);
        return false;
    }
    else
        return true;
}

function ReturnValue(argVal, argMeg)
{
    alert(argMeg);
}

function fnCheckDocState1(argDocState)
{
    if (argDocState == "")//空白代表並非調閱單文
        return true;
    if (Number(argDocState) < 20)//20:點收
        return false;
    return true;
}

function fnCheckDocState2(argDocState)
{
    if (argDocState == "")//空白代表並非調閱單文
        return true;
    if (Number(argDocState) > 27)//30:已銷毀
        return false;
    return true;
}

function fnGetStatusName(argDocState)
{
    switch (argDocState)
    {
        case "30":
        default:
            return "已銷毀";
        case "35":
            return "提供文史機關使用";
        case "40":
            return "已移轉";
        case "50":
            return "已移交";
        case "90":
            return "待刪除";
    }
}

function fnCleanDg()
{
    //for (i=2; i < (document.all["dg1"].rows.length +2); i++)
    //95.12.08 955218 David 修正清除時js發生錯誤
    for (i = 2; i < (document.all["dg1"].rows.length + 1) ; i++)
    {
        var Dept = "dg1__ctl" + i + "_txDept";
        var Subject = "dg1__ctl" + i + "_txSubject";

        //95.12.08 955218 David 增加清除櫥位號欄位
        var StockNo = "dg1__ctl" + i + "_txStockNo";
        document.all[StockNo].value = "";

        document.all[Dept].value = "";
        document.all[Subject].value = "";
    }
}

var bHasCheck = false;

//檢查日期格式
function CheckCDATE(argObj, strMsg)
{
    if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
    bHasCheck = true;
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
            //1050511 Cloud 1050087 升級二代
            //document.all[argObj].focus();
            $(argObj).focus();
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bHasCheck = false;
            return false;
        }
    }
    bHasCheck = false;
    return true;
}

//0970164	Leslie	檢核預計歸還日
function CheckDueDate()
{
    var strFromDocNo = document.all["txFromDocNo"].value;
    var strDueDate = document.all["txDueDate"].value;
    var strDateApply = document.all["dateApply"].value;

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

//0970164	Leslie	取得外機關借調的來文資訊
function GetFromDocInfo()
{
    if (document.all["txFromDocNo"].value != "")
    {
        var param = new Array(2);
        param[0] = document.all["txFromDocNo"].value;
        param[1] = document.all["fileno_sep"].value;
        RtnObj = jf_CallWS(ServerHeadPath + "lib/AK_LIB.asmx", "ChkDocInfo", false, param);
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
//1080423	Kevin_C	1080047	增加字數檢核 -S
function isMaxLength(obj,argText,argMaxNum)
{
	var nMaxNum = parseInt(argMaxNum);
    if (obj.value.length == nMaxNum)
    {
		var nCode = parseInt(event.keyCode);
        if (nCode != 8 && nCode!=9 && nCode != 13 && nCode != 16 && nCode != 46 && (nCode < 33 || nCode > 40))
		{
            event.returnValue = false;
			jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
		}
    } else if (obj.value.length > nMaxNum)
    {
        bHasCheck = true;
        jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
        bHasCheck = false;
        obj.value = obj.value.substring(0, nMaxNum)
    }
}
//1080423	Kevin_C	1080047	增加字數檢核 -E
//1090504 		Cloud 	1080750 核可通知 增加線上瀏覽功能-s
function fnOpenView(argDocNo, argSignType)
{
    try
    {
        var wsUrl = encodeURI(document.all.fileiows.value);
        var param = [];
        param[0] = encodeURI(document.all.nArtifact.value);
        param[1] = encodeURI(argDocNo);
        param[2] = encodeURI(document.all.nSourceOrgno.value);
        //* 1110105      Cloud   1101431 for 舊系統影像轉入，調整單文瀏覽行為-S
        //var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
        
        var rtnObj = jf_CallW(wsUrl, 'GetDocInfo', false, param);
        var params = new SOAPClientParameters();
        params.add('argArtifact', encodeURI(document.all.nArtifact.value));
        params.add('argDocNo', encodeURI(argDocNo));
        params.add('argOrgNo', encodeURI(document.all.nSourceOrgno.value));
        var rtnObj = SOAPClient.invokeJSON(rtnObj.value.RtnStr, "GetOnLineApplyDocUnvByJSON", params, false, null);
        //* 1110105      Cloud   1101431 for 舊系統影像轉入，調整單文瀏覽行為-E
        if (!rtnObj.error)
        {
            if (rtnObj.value.m_bSuccess)
            {
                var sUnvObj = rtnObj.value.RtnStr;
                if (sUnvObj !== "")
                {
                    var UnvObj = JSON.parse(sUnvObj);
                    //1110105      Cloud   1101431 for 舊系統影像轉入，調整單文瀏覽行為-S
                    var OpenType = argSignType == "E" ? "AOL" : "UniView";
                    let _unvDoc = UnvObj.UnvRoot.Doc;
                    let _firstAtt = null;

                    if (typeof _unvDoc == 'object' && _unvDoc != null) {
                        if ($.isArray(_unvDoc.Att)) {
                            _firstAtt = _unvDoc.Att[0];
                        }
                        else {
                            _firstAtt = _unvDoc.Att;
                        }
                    }

                    if (_firstAtt.Type != '7')
                        OpenType = 'UniView';
                    //1110105      Cloud   1101431 for 舊系統影像轉入，調整單文瀏覽行為-E
                    var objViewDoc = {
                        UNVObj: UnvObj,
                        docInfoPage: "AKT881",
                        //1110105      Cloud   1101431 for 舊系統影像轉入，調整單文瀏覽行為
                        //openDocModule: argSignType == "E" ? "AOL" : "UniView",
                        openDocModule: OpenType,
                        signType: argSignType,
                        readOnlyMode: true
                    };
                    var $docId = jf_GetSessionID() + "_" + (+new Date());
                    localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                    var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
                    jf_OpenChildWin(unvUrl, "AKT881ViewDoc");
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
//1090504 		Cloud 	1080750 核可通知 增加線上瀏覽功能-e
//1110207      Cloud   1101502 [考試院]新增調案性質選項-S
function SetOtherOrgInfo(argTarget)
{
    var bOrgWork = false;
    var strNewReason = "空白";
    //檢查是否已經有原因
    
        var bhasSeaSon = false;
        if (document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].value != "1") {
            strNewReason = document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].text;
        }
        for (i = 2; i <= document.all["dg1"].rows.length ; i++) {
            if (document.all["dg1__ctl" + i + "_txDocNo"].value == "")
                continue;

            var IdtxReason = "dg1__ctl" + i + "_txReason";
            if (document.all[IdtxReason].value != "" && document.all[IdtxReason].value != strNewReason) {
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
                document.all["txFromDocNo"].value = "";
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

        var IdtxReason = "dg1__ctl" + i + "_txReason";

        if (document.all["dg1__ctl" + i + "_txDocNo"].value == "" && document.all["dg1__ctl" + i + "_txFileNo"].value == "")
            continue;
        document.all[IdtxReason].value = strDgReason;
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
function SetOtherInfo()
{
    var bOrgWork = true;
    if (document.all.dlUsageType.options[document.all.dlUsageType.selectedIndex].value != "1") {
        bOrgWork = false;
    }
    document.all["txFromDocNo"].disabled = bOrgWork;
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
        if (document.all["txFromDocNo"].value == "") {
            errstring = "公文文號";
        }
        if (document.all["txDueDate"].value == "") {
            if(errstring!="")
                errstring += "、";
            errstring += "預計歸還日期";   
        }
        if (errstring!="")
        { alert("調案性質非[機關內借調]時他機關借調之" + errstring + "不可為空白。"); rtn = false; }
    }
    return rtn;
}
//1110207      Cloud   1101502 [考試院]新增調案性質選項-E
//* 1140917      Cloud   1141137 修改支援外貿檔號拆開顯示
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