/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2007.02.09
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2020.10.16	Cloud	1090561 新增信保AKT800
 * 2020.12.14	Cloud   1090949 修改增加取得最大紙本/電子卷號及銷燬卷
 * 2020.12.21	Cloud	序105	修正專案/逾期調閱檢核異常問題
 * 2020.12.23	Cloud 	序112 	修正專案/逾期未檢核是否已被調閱問題
 * 2020.12.29	Cloud	序129	補上檢核單文調案時，不可借閱AA、BB下公文
 * 2021.01.13	Cloud	序164	輸入卷號檢核未通過時，清空卷號欄位
 * 2021.02.03	Joe		1100053	新增調檔時判斷公文狀態，切換調案方式
 * 2021.02.08	Cloud	1100154	修改整卷借調支援線上瀏覽
 * 1100420		Zen     1100142	以AKS502為基底新增AKS502_SMEG供信保專用
 * 2021.05.14   Cloud   --      修改線上簽核公文僅提供線上瀏覽-如無影像直接不可調閱
 * 1100712      Zen     1100814 (信保)修正連續申請時因預設值錯誤導致無法於MP開啟通知及重複PostBack送出異常通知之問題
 * 2021.10.13   Cloud   1101078 應修正-現行公文不該可以選擇負責單位
 * 2022.01.07   Joe     1101566 修正卷次號檢核時，一律轉大寫
 * 2022.04.13   Cloud   1110017、1110064、1110026 借出資訊增加借閱單位、人、狀態，增加顯示收創文日期，增加相關案件顯示
 * 2022.07.01	Cloud	1110668	修改為純線上簽核公文時，自動切換調案方式
 * 2023.02.16   Cloud	1120099	一併補上急件原因字數檢核
 * 2024.11.07	Cloud	無單號	信保-現場會發生列管卷可同時調閱電子卷、紙本卷問題-約1個月有1筆-補強儲存、預覽、傳送前加檢核
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var id_nowDataGrid = null;
var iCallID_qBorrowDetail = null;
var IsServerHandling = new Boolean();
var bAlertForMsg;
IsServerHandling = false;
var wsCheckDataKeyID = null;

jf_ShowValidator();
//* 2022.04.13   Cloud   1110026 借出資訊增加借閱單位、人、狀態，增加顯示收創文日期，增加相關案件顯示
$('a[id$="hyComNo"]').click(function () {
    jf_GetComBineDoc(this);
})
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
        case 'btKeyHelp':
            Page_BlockSubmit = true;
            //新增模式下才可查詢
            if (jf_GetActionMode() == LayoutModeNew && !document.all["txBorNo"].readOnly)
            {
                var k1 = document.all["dlBorType"].value;
                // xOldKey = document.all["TextBox2"].value;
                //1100420 Zen 1100142 以AKS502為基底新增AKS502_SMEG供信保專用
				//var strUrl = "AKS502.aspx?rtnObj=lbReturnValue&k1=" + k1;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
				var strUrl = "AKS502_SMEG.aspx?rtnObj=lbReturnValue&k1=" + k1;
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
    
    xObjectName = event.target.id;
    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btApprove":
        case "btSave":
            Page_BlockSubmit = false;
            bBorrowDetailFalse = false;
			//* 2024.11.07	Cloud	無單號	信保-現場會發生列管卷可同時調閱電子卷、紙本卷問題-約1個月有1筆-補強儲存、預覽、傳送前加檢核-不可同時調閱紙本、電子卷
			if(!CheckManaNoApply())
			{
				Page_BlockSubmit = true;
                return;				
			}
			

            if (document.all["dg1"] == null || document.all["dg1"].rows.length < 2)
            {
                alert("沒有調案資料可供儲存");
                Page_BlockSubmit = true;
                return;
            }
            if (document.all["dateApply"].value == "")
            {
                alert("請輸入申請日期");
                Page_BlockSubmit = true;
                return;
            }
            if (document.all["txUrgentReason"].value == "" && document.all["ckUrgent"].checked) {
                alert("急件需輸入急件原因。");
                Page_BlockSubmit = true;
                $("#txUrgentReason").focus();
                return;
            }
                //* 2023.02.16   Cloud	1120099	一併補上急件原因字數檢核
            else {
                if (document.all["txUrgentReason"].value.length > 200)
                {
                    alert("急件原因字數不可超過200字。");
                    Page_BlockSubmit = true;
                    $("#txUrgentReason").focus();
                }
            }
            

            //1100420 Zen 1100144 (信保)支援填寫急件申請原因後自動勾選急件申請
            txUrgentReason_onblur();
			
            var bHasRecord = false;
            //判斷新增隱藏欄位卷號起訖是否有值即可
            if (document.all.rbNormal.checked==false &&( document.all["dg1__ctl2_txFileNos"].value != "" || document.all["dg1__ctl2_txFileNoe"].value != ""))
            {
            	bHasRecord = true;
            	var Vols = document.all["dg1__ctl2_txFileNos"].value;
            	var Vole = document.all["dg1__ctl2_txFileNoe"].value;
            	var TempVol = "";
            	//空白及大小互換
            	if (Vols == "" && Vole != "")
            		document.all["dg1__ctl2_txFileNos"].value = document.all["dg1__ctl2_txFileNoe"].value;

            	if (Vols != "" && Vole == "")
            		document.all["dg1__ctl2_txFileNoe"].value = document.all["dg1__ctl2_txFileNos"].value;
            	if (Vols > Vole)
            	{
            		TempVol = document.all["dg1__ctl2_txFileNoe"].value;
            		document.all["dg1__ctl2_txFileNoe"].value = document.all["dg1__ctl2_txFileNos"].value;
            		document.all["dg1__ctl2_txFileNos"].value = TempVol;
            	}
            	
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
            var CheckBak = "";
            if (document.all.rbNormal.checked && document.all["txLastBorType"].value == "2")//單文才需檢核
            {
            	
            	for (i = 2; i <= document.all["dg1"].rows.length; i++)
            	{
            		tag = "dg1__ctl" + i + "_lbFileExist";

            		if (document.all[tag] == null)
            			continue;

            		str = document.all[tag].value;
            		if (str == "0")
            		{
						//1100203	Joe		1100053		順手修正
            		    // msg = "文號："+document.all[ "dg1__ctl" + i + "_txDocNo"]+"無數位內容，不允許申請線上調檔";
            			msg = "文號："+document.all[ "dg1__ctl" + i + "_txDocNo"].value+"無數位內容，不允許申請線上調檔";
            			alert(msg);
            			Page_BlockSubmit = true;
            			break;
            		}
            	}
            }
        	//檢核是否含實體附件或紙本來文併同歸檔
			//1091221 Cloud 序105 修正專案/逾期調閱檢核異常問題
			if(document.all.rbNormal.checked)//單文才有線上調檔
			{
				CheckBak = AK.AKT800_SMEG.CheckSinglDocFileAndDept(document.all.nSourceOrgno.value, document.all["dg1__ctl2_txDocNo"].value).value;
				//單位不合法
				if (CheckBak.indexOf("ERR") != -1)
				{
					alert(strRtn.split('-')[1]);
					return;
				}
				if (CheckBak.split('|')[0] == "true" && document.all["txLastBorType"].value == "2")
				{
						msg = "公文含有紙本來文併同歸檔或實體附件，不允許申請線上調檔。";
						alert(msg);
						Page_BlockSubmit = true;
						return;
				}
			
                if (CheckBak.split('|')[1] == "false" && (document.all["H_Dept"].value=="" && document.all["H_Sect"].value==""))
                {
                	alert('當前公文負責單位不存在，指定負責單位不可空白。');
                	Page_BlockSubmit = true;
                	return;
                }
			    //* 2021.10.13   Cloud   1101078 應修正-現行公文不該可以選擇負責單位
                if (CheckBak.split('|')[1] == "true" && (document.all["H_Dept"].value != "")) {
                    alert('當前公文負責單位存在，不可選擇指定負責單位。');
                    Page_BlockSubmit = true;
                    return;
                }
			}
            
        	//檢核案卷是否屬於同一承辦單位
            if (!document.all.rbNormal.checked)
            {
            	if (document.all.rbClient.checked)
            		CheckBak = AK.AKT800_SMEG.CheckVolDocDeptCount(document.all.nSourceOrgno.value, "AA", document.all["dg1__ctl2_txFileNos"].value, document.all["dg1__ctl2_txFileNoe"].value, document.all["fileno_sep"].value).value;
            	else
            		CheckBak = AK.AKT800_SMEG.CheckVolDocDeptCount(document.all.nSourceOrgno.value, "BB", document.all["dg1__ctl2_txFileNos"].value, document.all["dg1__ctl2_txFileNoe"].value, document.all["fileno_sep"].value).value;
            	if (CheckBak.indexOf("ERR") != -1)
            	{
            		alert(strRtn.split('-')[1]);
            		return;
            	}
            	if(CheckBak!="1"&& (document.all["H_Dept"].value=="" && document.all["H_Sect"].value==""))
            	{
            		alert('調閱案卷負責單位繁多，指定負責單位不可空白。');
            		Page_BlockSubmit = true;
            		return;
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

            //儲存前檢核是否檔案已借出
            for (i = 2; i <= document.all["dg1"].rows.length; i++)
            {
                if (bBorrowDetailFalse)
                    break;
                var strNo = jf_Trim(document.all["dg1__ctl" + i + "_txDocNo"].value);
                if (strNo != "")
                {
                    queryBorrowDetail(event, strNo, "dg1__ctl" + i + "_txDocNo");
                }
                else
                {
                    
                	if (document.all["rbClient"].checked)//專案案卷-檢核檔案是否已被借出
                	{
                		queryBorrowDetail(undefined, document.all["dg1__ctl2_txFileNos"].value, "dg1__ctl2_txFileNos");
                		queryBorrowDetail(undefined, document.all["dg1__ctl2_txFileNoe"].value, "dg1__ctl2_txFileNoe");

                	}
                	else if (document.all["rbManaNo"].checked)
                	{
                		var ints = 0;
                		var inte = 0;
                		var bIsEdoc = false;
                		var Vols = document.all["dg1__ctl2_txManageNoVOLS"].value;
                		var Vole = document.all["dg1__ctl2_txManageNoVOLE"].value;
                		var TempVol = "";
						//空白及大小互換
                		if (Vols == "" && Vole != "")
                			document.all["dg1__ctl2_txManageNoVOLS"].value = document.all["dg1__ctl2_txManageNoVOLE"].value;

                		if (Vols != "" && Vole == "")
                			document.all["dg1__ctl2_txManageNoVOLE"].value = document.all["dg1__ctl2_txManageNoVOLS"].value;
                		if (Vols > Vole)
                		{
                			TempVol = document.all["dg1__ctl2_txManageNoVOLE"].value;
                			document.all["dg1__ctl2_txManageNoVOLE"].value = document.all["dg1__ctl2_txManageNoVOLS"].value;
                			document.all["dg1__ctl2_txManageNoVOLS"].value = TempVol;
                		}
                		if (Vols.indexOf(document.all["INIT_EVOLNO"].value) != -1)
                		{
                			ints = parseInt(document.all["dg1__ctl2_txManageNoVOLS"].value.substring(0, 2));
                			inte = parseInt(document.all["dg1__ctl2_txManageNoVOLE"].value.substring(0, 2));
                			bIsEdoc = true;
                		}
                		else
                		{
                			ints = parseInt(document.all["dg1__ctl2_txManageNoVOLS"].value);
                			inte = parseInt(document.all["dg1__ctl2_txManageNoVOLE"].value);
                		}
                		var volNo ="";
                		for (var ivol = ints; ivol <= inte; ivol++)
                		{
                			if(bIsEdoc)
                				volNo = document.all["INIT_EVOLNO"].value + ivol.toString().PadLeft(4-document.all["INIT_EVOLNO"].value.Length, '0');
                			else
                				volNo = jf_PADL(ivol.toString(), 4, '0');
                			GManSingleVol = volNo;
                			queryBorrowDetail(undefined, "BB" + document.all["fileno_sep"].value + document.all["dg1__ctl2_txManageNo"].value + document.all["fileno_sep"].value + volNo, "dg1__ctl2_txFileNos");
                		}	
                	}
                }
            }

            
            if (!CheckDueDate())
                Page_BlockSubmit = true;

            //調閱明細中有不可調閱者則不可儲存 #2007.02.09 Andy
            if (bBorrowDetailFalse)
            {
                Page_BlockSubmit = true;
                bBorrowDetailFalse = false;
                return;
            }
			
			//信保歸還日期登錄時才處理 此段先MARK
			/*if(document.all["LIMIT_BOR_DUE_DATE"].value=="Y")
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
			}*/
            if (document.all.rbNormal.checked)
            	document.all["h_BORROW_FILE_TYPE"].value = "0";
            else if (document.all.rbClient.checked)
            	document.all["h_BORROW_FILE_TYPE"].value = "1";
            else
            	document.all["h_BORROW_FILE_TYPE"].value = "2";
            
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDeleteMsg":
            Page_BlockSubmit = !jf_ConfirmDelete();
            
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;

            var valBak = document.all["dlBorType"].value;
            
            var valBakLBT = document.all.txLastBorType.value;
            var valBakCBKN = document.all.txCantBorKeepNo.value;
            
            var valH_SpDeptlist = document.all.h_SpDeptlist.value;
            jf_ConfirmClean();
            fnCleanDg();
            document.all["dlBorType"].value = valBak;
            
            document.all["txFromNo"].value = "";
            document.all["txFromOrg"].value = "";
            document.all["txFromSubject"].value = "";
            
            document.all.txLastBorType.value = valBakLBT;
            document.all.txCantBorKeepNo.value = valBakCBKN;
            
            document.all.h_SpDeptlist.value = valH_SpDeptlist;
            document.all["rbNormal"].checked = true;
            ShowInput();
            document.all["h_BORROW_FILE_TYPE"].value = "";
            break;

            //950721 新增資訊流程按鈕 whay 
        case "btSearch":
            Page_BlockSubmit = true;
            if (jf_CheckKeyObject())
            {
                var strArtifact = document.all.nArtifact.value;
                var strDocNo = document.all["dg1__ctl2_txDocNo"].value;
                var strBorNo = document.all.txBorNo.value;
                var strHttp = document.all.nHttp.value;
                var strSourceOrgno = document.all.nSourceOrgno.value;

                var strUrl = strHttp + "EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argMsgFrom=AKT800&argMsgFromId=" + strBorNo + "&SAMLart=" + strArtifact;

                jf_OpenChildWin(strUrl, "EDI200", 700, 500);
            }
            
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrintVertical":
    	case "btPrint":
			//* 2024.11.07	Cloud	無單號	信保-現場會發生列管卷可同時調閱電子卷、紙本卷問題-約1個月有1筆-補強儲存、預覽、傳送前加檢核-不可同時調閱紙本、電子卷
			if(!CheckManaNoApply())
			{
				Page_BlockSubmit = true;
                return;				
			}
    		if (document.all.rbNormal.checked)
    			document.all["h_BORROW_FILE_TYPE"].value = "0";
    		else if (document.all.rbClient.checked)
    			document.all["h_BORROW_FILE_TYPE"].value = "1";
    		else
    			document.all["h_BORROW_FILE_TYPE"].value = "2";
            
            Page_BlockSubmit = false;
            
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btTransfer":
            Page_BlockSubmit = false;
			//* 2024.11.07	Cloud	無單號	信保-現場會發生列管卷可同時調閱電子卷、紙本卷問題-約1個月有1筆-補強儲存、預覽、傳送前加檢核-不可同時調閱紙本、電子卷
			if(!CheckManaNoApply())
			{
				Page_BlockSubmit = true;
                return;				
			}
            var ddlIdx = 6;
            document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
        	/*
			if (document.all["LIMIT_BOR_DUE_DATE"].value == "Y")
            {
            
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
            }*/
            if (document.all.rbNormal.checked)
            	document.all["h_BORROW_FILE_TYPE"].value = "0";
            else if (document.all.rbClient.checked)
            	document.all["h_BORROW_FILE_TYPE"].value = "1";
            else
            	document.all["h_BORROW_FILE_TYPE"].value = "2";
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btBack":
            Page_BlockSubmit = !window.confirm("確定要撤回嗎?");
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}




function CallBack(argCallerId)
{
    if (argCallerId == "AKS502")
    {
        document.all["txBorNo"].value = document.all["lbReturnValue"].options[0].value;
        //1100712 Zen 1100814 (信保)修正重複PostBack送出異常通知之問題
        //document.all["autoPB"].value = "1";
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
    
    id_nowDataGrid = event.target.id;
    var index = document.all[id_nowDataGrid].selectedIndex;
    
    var val = document.all[id_nowDataGrid].options[index].textContent;
    id_secs = id_nowDataGrid.split("_", 4);
    var idTxReason = id_secs[0] + "__" + id_secs[2] + "_txReason";
    document.all[idTxReason].value += val;
    document.all[id_nowDataGrid].options[0].selected = true;
    
    $('idTxReason').focus();
}
function queryBorrowDetail(event, file_no)
{
    
    queryBorrowDetail(event, file_no, "");
}

var strBorrowType = ""; //1：文號調單文；2：檔號調多文
var bBorTypeChange = false;
//調案方式改變-僅有單文才有線上調檔切換時需要檢核
function GetBorTypeChange()
{
    
	if (document.all["dg1__ctl2_txDocNo"].value != "" && document.all.rbNormal.checked)
    {
        if (!bBorTypeChange && confirm("切換調案方式將重新檢核公文是否可供調案，是否繼續？"))
        {
            for (i = 2; i < (document.all["dg1"].rows.length) ; i++)
            {
                var bCheck = true;

                if ((document.all.dlBorType[0].selected || document.all.dlBorType[2].selected) && document.all["dg1__ctl" + i + "_txRealCanBor"].value == "0")
                    bCheck = false;
                if (document.all.dlBorType[1].selected && document.all["dg1__ctl" + i + "_lbFileExist"].value == "0")
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
                    document.all["dg1__ctl" + i + "_txRealCanBor"].value = "";
                }
            }
        }
        else
        {
            document.all.dlBorType.value = document.all.txLastBorType.value;
        }
        bBorTypeChange = false;
	}
	document.all.txLastBorType.value = document.all.dlBorType.value;
}


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
        //1110415 Cloud 1110017-補上清空收創文日跟隱藏相關案件
        var idlbRcvDate = id_secs[0] + "__" + id_secs[2] + "_lbRcvDate";
        var idTxComNo = id_secs[0] + "__" + id_secs[2] + "_txComNo";
        var idaComNo = id_secs[0] + "__" + id_secs[2] + "_hyComNo";

        //觸發onblur的文號無值但檔號有值時以檔號取得公文資訊 #2007.03.01 Andy
        if (id_nowDataGrid.indexOf("txDocNo") != -1 && jf_Trim(document.all[idTxFileNo].value) != "") {
            //1110415 Cloud 1110017 -信保單一案件只能靠文號輸入 如為空白則file_no清空
            if(document.all[id_nowDataGrid].value == "")
                file_no = "";
        }
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
            //1110415 Cloud 1110017-補上清空收創文日跟隱藏相關案件-s
            document.all[idlbRcvDate].textContent = "";
            document.all[idTxComNo].value = "";
            document.all[idaComNo].className = "hide";
            //1110415 Cloud 1110017-補上清空收創文日跟隱藏相關案件-e

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
    else if (NoSecs.length == 3 &&  NoSecs[1] != "" && NoSecs[2] != "" && NoSecs[3] != "")	//<!-- 檔號只輸到卷號 -->-信保用卷借調不須檢核年度是否為空白
    {
        strBorrowType = "2";

        id_secs = id_nowDataGrid.split("_", 4);
        param[0] = jf_Trim(document.all[id_secs[0] + "__" + id_secs[2] + "_txDocNo"].value); //有文號時仍傳入 #2007.03.05 Andy
        param[1] = "999";//信保調卷的案次號 都不須年度號-傳入固定職for ws檢核
        param[2] = NoSecs[0];
        param[3] = NoSecs[1];
        param[4] = NoSecs[2];
        param[5] = "";
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
        //* 2022.04.13   Cloud   1110017、1110064、1110026 借出資訊增加借閱單位、人、狀態，增加顯示收創文日期，增加開啟併案視窗
        var idlbRcvDate = id_secs[0] + "__" + id_secs[2] + "_lbRcvDate";
        var idTxComNo = id_secs[0] + "__" + id_secs[2] + "_txComNo";
        var idaComNo = id_secs[0] + "__" + id_secs[2] + "_hyComNo";
        

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
            //* 2022.04.13   Cloud   1110017、1110064、1110026 借出資訊增加借閱單位、人、狀態，增加顯示收創文日期-一般檔案不跳此訊息，增加開啟併案視窗
            document.all[idlbRcvDate].textContent = "";
            document.all[idaComNo].className = "hide";
            
            if (!document.all["rbNormal"].checked)
                alert("檔號不完整");
            return;
        }
    }
    
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
    //新信保跨組也不會經過承辦人，此段MARK
	/*if (bAlertForMsg == true)
	{
		alert('您目前所申請調檔之檔案,同時包含同科、跨科或跨組之調案申請流程,\n系統將不提供線上調案申請之流程(含不同承辦人),請自行列印調案單或重新提出調案之申請!!');
	}*/
	//ShowInput("1");
	ShowInput();
	//2020.12.14	Cloud   1090949 修改增加取得最大紙本/電子卷號及銷燬卷
	if (document.all["dg1__ctl2_H_TXVolINFO"].value != "")
	{
		var CaseInfo = document.all["dg1__ctl2_H_TXVolINFO"].value.split('|');
		document.all["dg1__ctl2_LBDesVolList"].textContent = CaseInfo[0];
		if (document.all["dg1__ctl2_LBDesVolList"].textContent != "")
		{
			document.all["dg1__ctl2_LBDesVolList"].className = "";
			document.all["dg1__ctl2_LBDesVol"].className = "";
			if (CaseInfo[3] > "5")
			{
				document.all["dg1__ctl2_LBDesVolList"].title = CaseInfo[4];
			}
		}
		else
		{
			document.all["dg1__ctl2_LBDesVolList"].className = "hide";
			document.all["dg1__ctl2_LBDesVol"].className = "hide";
		}
		document.all["dg1__ctl2_lbMaxVol"].className = "";
		document.all["dg1__ctl2_lbMaxVolInfo"].className = "";
		document.all["dg1__ctl2_lbMaxVolInfo"].textContent = "(紙本)" + CaseInfo[2] + "、(電子)" + CaseInfo[1];
	}
}

var bBorrowDetailFalse = false;
function OnWSResult(argResult)
{
    //增加文號onblur帶出檔號 by whay
    if (argResult.id == iCallID_qBorrowDetail)
    {
        
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
        //1110413 Cloud 1110064、1110026 單文增加顯示收創文日期、提供開啟相關案件功能
        var idlbRcvDate = id_secs[0] + "__" + id_secs[2] + "_lbRcvDate";
        var idTxComNo = id_secs[0] + "__" + id_secs[2] + "_txComNo";
        var idaComNo = id_secs[0] + "__" + id_secs[2] + "_hyComNo";
        

        WSResult = argResult.value;
        if (jf_IsWebServiceSuccess(argResult))
        {
        	
        	if ((WSResult.IsBor != "0" && WSResult.BorNo != document.all["txBorNo"].value) && document.all.txLastBorType.value!="2")
            {
                var bIsBorrowPartOf = false;
                if (WSResult.IsBor == "2")
                {
					//信保整卷中被借出則跳出提示不改為單件
                    /*if (strBorrowType == "2" && WSResult.BorCount != "0")	//951141	Leslie	顯示已有XX份公文被借出
                        bIsBorrowPartOf = window.confirm("共有 " + WSResult.BorCount + " 件已被檢調，是否仍要檢調本案/卷中其他未被調用之檔案？");
                    else*/
                	// 2020.12.23	Cloud 	序112 	修正專案/逾期未檢核是否已被調閱問題
                	//alert("您輸入的公文已被借出，調案單號為 " + WSResult.BorNo);
                    if(GManSingleVol=="")
                        //1110413 Cloud 1110017 借出資訊增加調案單位、人員、狀態
                        //alert("您輸入的公文已被借出，調案單號為 " + WSResult.BorNo);
                        alert("您輸入的公文已被借出，調案單號為 " + WSResult.BorNo + "，調案單位：" + WSResult.BorDept + "，調案人：" + WSResult.BorEmp + "，調案狀態：" + WSResult.BorStatus);
                    else
                        //1110413 Cloud 1110017 借出資訊增加調案單位、人員、狀態
                        //alert("卷號：" + GManSingleVol + "　已被借出，調案單號為 " + WSResult.BorNo+"，請重新輸入範圍。");
                        alert("卷號：" + GManSingleVol + "　已被借出，調案單號為 " + WSResult.BorNo + "，調案單位：" + WSResult.BorDept + "，調案人：" + WSResult.BorEmp + "，調案狀態：" + WSResult.BorStatus + "，請重新輸入範圍。");

					//1091223 Cloud 序112 補上未檢核是否被借出
					GManSingleVolCheckOK = false;
					GManSingleVol = "";
                }
                else
                {
                	//信保整卷中被借出則跳出提示不改為單件
                    /*if (strBorrowType == "2" && WSResult.BorCount != "0")
                        bIsBorrowPartOf = window.confirm("共有 " + WSResult.BorCount + " 件已被申請檢調，是否仍要檢調本案/卷中其他未被調用之檔案？");
                    else*/
                	// 2020.12.23	Cloud 	序112 	修正專案/逾期未檢核是否已被調閱問題
                	//alert("您輸入的公文已被其他使用者申請，調案單號為 " + WSResult.BorNo);
                    if (GManSingleVol == "")
                        //1110413 Cloud 1110017 借出資訊增加調案單位、人員、狀態
                        //alert("您輸入的公文已被其他使用者申請，調案單號為 " + WSResult.BorNo);
                        alert("您輸入的公文已被其他使用者申請，調案單號為 " + WSResult.BorNo + "，調案單位：" + WSResult.BorDept + "，調案人：" + WSResult.BorEmp + "，調案狀態：" + WSResult.BorStatus);
                    else
                        //1110413 Cloud 1110017 借出資訊增加調案單位、人員、狀態
                        //alert("卷號：" + GManSingleVol + "　您輸入的公文已被其他使用者申請，調案單號為 " + WSResult.BorNo + "，請重新輸入範圍。");
                        alert("卷號：" + GManSingleVol + "　您輸入的公文已被其他使用者申請，調案單號為 " + WSResult.BorNo + "，調案單位：" + WSResult.BorDept + "，調案人：" + WSResult.BorEmp + "，調案狀態：" + WSResult.BorStatus + "，請重新輸入範圍。");
                	//1091223 Cloud 序112 補上未檢核是否被借出
                	GManSingleVolCheckOK = false;
                	GManSingleVol = "";
                }
                document.all[idTxDocNo].value = "";

                if (!bIsBorrowPartOf)
                    //1010339	Ken	 101/08/14 檢核不通過最後一併處理
                    //document.all[idTxFile_no].value		= "";
                    bCanBorrow = false;
                else	//951141	Leslie	若使用者欲申請整卷調案，而該檔案"已有部分公文被借出"時，PostBack回Server端進行DataGrid展開
                {
                    document.all[idTxFile_no].value = WSResult.FileNo;
                    document.all.IsBorrowPartOf.value = "true";
                    IsServerHandling = true;
                    __doPostBack("", 0);
                    return;
                }

            }
            else
            {
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
				// 2020.12.29	Cloud	序129	補上檢核單文調案時，不可借閱AA、BB下公文
				if (document.all.rbNormal.checked)
				{
					var strCls = WSResult.FileNo.split(document.all["fileno_sep"].value)[1];
					if(strCls=="AA" || strCls=="BB")
					{
						var strDocType = "專案件";
						if(strCls=="BB")
							strDocType = "列管件";
						alert("該文號為"+strDocType+"，不允許單筆借出。");
						document.all[idTxDocNo].value = "";
						return;
					}
				}
        	    //* 2021.05.14   Cloud   修改線上簽核公文僅提供線上瀏覽-如無影像直接不可調閱-解析檔號、判斷簽核類型-FOR 單文
				if (document.all.rbNormal.checked && WSResult.FileNo.split(document.all["fileno_sep"].value)[3].indexOf(document.all["INIT_EVOLNO"].value) != -1 && WSResult.Volume == "") {
				    bCanBorrow = false;
				    alert("您申請調案的案卷(件)為電子卷(線上簽核公文)，而且尚未完成歸檔加簽，故無法申請調案。請通知檔管人員為該案卷(件)公文進行歸檔加簽。");
				}
				else {
				    if ((document.all.txLastBorType.value == "1" || document.all.txLastBorType.value == "3") && !bDocState)//原件or複製品-調卷bDocState一定為TRUE不會走到
				    {
				        if (document.all.rbNormal.checked && WSResult.Volume != "")//單文且有影像才提供下面方式
				        {
				            //借調兩筆公文
				            if (bMoreOne > 0 && document.all.rbNormal.checked) {
				                bCanBorrow = false;
				                alert("公文" + WSResult.DocNo + "狀態為：" + strDocState + "，僅供線上調檔。");
				            }
				                //第一筆借調公文
				            else if (document.all.rbNormal.checked && confirm("公文" + WSResult.DocNo + "狀態為：" + strDocState + "，僅供線上調檔，是否轉為線上調檔？")) {
				                bBorTypeChange = true;
				                document.all.dlBorType[1].selected = true;
				                //1020501	Cloud	[1020298] 放入調案方式	
				                document.all.txLastBorType.value = document.all.dlBorType[1].value;
				            }
				            else {
				                bCanBorrow = false;
				            }
				        }
				        else {
				            bCanBorrow = false;
				            alert("公文" + WSResult.DocNo + "狀態為：" + strDocState + "，且無正版影像，無法提供調檔。");

				        }
				    }
				    if (document.all.rbNormal.checked && document.all.txLastBorType.value == "2" && WSResult.Volume == "")//線上調檔//單文調檔的時候dlBorType[1] 才會是線上
				    {
				        if (bDocState) {
				            //借調兩筆公文
				            if (bMoreOne > 0) {
				                bCanBorrow = false;
				                alert("公文" + WSResult.DocNo + "無正版影像，僅供實體調檔。");
				            }
				                //第一筆借調公文
				            else if (confirm("公文" + WSResult.DocNo + "無正版影像，僅供實體調檔，是否轉為實體調檔？")) {
				                bBorTypeChange = true;
				                document.all.dlBorType[0].selected = true;
				                document.all.txLastBorType.value = document.all.dlBorType[0].value;
				            }
				            else {
				                var rtn =
                                bCanBorrow = false;
				            }
				        }
				        else {
				            bCanBorrow = false;
				            alert("公文" + WSResult.DocNo + "無正版影像，且狀態為：" + strDocState + "，無法提供調檔。");
				        }
				    }
				}
                if (bCanBorrow)
                 {
                    if (bDocState)
                        document.all[idtxRealCanBor].value = "1";
                    else
                        document.all[idtxRealCanBor].value = "0";

                    if (strBorrowType == "1")//單文調檔才需要異動以下資訊
                    {
                        document.all[idTxDocNo].value = WSResult.DocNo;


                        document.all[idTxFile_no].value = WSResult.FileNo;


                        document.all[idTxDept].value = WSResult.DeptName;


                        document.all[idTxSubject].value = WSResult.Subject;
                        //1100514 Cloud 隱藏主旨-單文再提供-卷只看案名不會有機密問題
                        //}
                        //1110413 Cloud 1110064、1110026 單文增加顯示收創文日期，提供開啟併案視窗-S
                        document.all[idlbRcvDate].textContent = WSResult.RcvDate;
                        document.all[idTxComNo].value = WSResult.ComNo;
                        if (WSResult.ComNo != "")
                            document.all[idaComNo].className = "";
                        else
                            document.all[idaComNo].className = "hide";
                        //1110413 Cloud 1110064、1110026 單文增加顯示收創文日期，提供開啟併案視窗-E
                        
                        var strH_SpDeptlist = document.all.h_SpDeptlist.value;
                        if (jf_Trim(strH_SpDeptlist) != "") {
                            if (WSResult.RpsDeptNo != "" && strH_SpDeptlist.indexOf(WSResult.RpsDeptNo) != -1)
                                document.all[idTxSubject].value = strH_SpDeptlist.split(":")[0];
                        }
                    }

                    if (WSResult.IsSec)
                        document.all[idTxSEC_NO].value = "1";
                    else
                        document.all[idTxSEC_NO].value = "0";

                    if (WSResult.Volume != "")
                        document.all[idTxFileExist].value = "1";
                    else
                        document.all[idTxFileExist].value = "0";

                    if (WSResult.StockNo)
                        document.all[idTxStock].value = WSResult.StockNo;
                    else
                        document.all[idTxStock].value = "";

                    $(id_secs[0] + "__" + id_secs[2] + "_txReason").focus(); //取得調案資料成功後focus到調案原因 #2007.03.01 Andy

                    strBorrowType = "";

					//1100203	Joe		1100053		新增調檔時判斷公文狀態，切換調案方式--S
					//無實體影像不轉線上調檔
                    if (!WSResult.Volume == "" && document.all.rbNormal.checked)
                    {
                    	//* 2021.02.08	Cloud	1100154	修改整卷借調支援線上瀏覽
                    	//var strRtn = AK.AKT800_SMEG.CheckBorTypeFromDoc(document.all.nSourceOrgno.value, WSResult.DocNo).value;
                    	var strRtn = AK.AKT800_SMEG.CheckBorTypeFromDoc(document.all.nSourceOrgno.value, WSResult.DocNo,"","","","").value;
						if(strRtn[1] != ""){
							alert(strRtn[1]);
						}
						else if (strRtn[0] == "false" && document.all.dlBorType.selectedIndex != 1) {
							//* 2022.07.01	Cloud	1110668	修改為純線上簽核公文時，自動切換調案方式
							//if (window.confirm('當前公文為線上簽核公文且未含有實體附件，是否直接切換調案方式為線上調檔?')){
								//bBorTypeChange = true;
								document.all.dlBorType.selectedIndex = 1;	
								document.all.txLastBorType.value = document.all.dlBorType.value;
							//* 2022.07.01	Cloud	1110668	修改為純線上簽核公文時，自動切換調案方式
							//}
						}
					}
                	//1100203	Joe		1100053		新增調檔時判斷公文狀態，切換調案方式--E
                }
            }
        }
        else
            bCanBorrow = false;

        if (!bCanBorrow)
        {
           
            document.all[idTxDocNo].value = "";
            document.all[idTxFile_no].value = "";
            if (strBorrowType != "2") //單文不可調閱才需清空
            {
            	document.all[idTxDept].value = "";
            	document.all[idTxSubject].value = "";
				//1110414 Cloud 1110017、1110026 增加顯示收創文日期、相關案件-S
				document.all[idlbRcvDate].textContent = "";
				document.all[idTxComNo].value = "";
				document.all[idaComNo].className = "hide";
				//1110414 Cloud 1110017、1110026 增加顯示收創文日期、相關案件-E
            	$(id_nowDataGrid).focus();
            }
            else//依清空卷號欄位
            {
				//* 2021.01.13	Cloud	序164	輸入卷號檢核未通過時，清空卷號欄位
            	//document.all[GVolEntid].value == "";
				document.all[GVolEntid].value = "";
            	$("#" + GVolEntid).focus();
            	GVolEntid = "";
            }
            document.all[idTxFileExist].value = "";
            document.all[idTxSEC_NO].value = "";
            document.all[idTxStock].value = "";
            document.all[idtxRealCanBor].value = "N"; 
            bBorrowDetailFalse = true;
            strBorrowType = "";
        }
    }
    else if (argResult.id == iCallID_GetFromDocInfo)
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
    
    for (i = 2; i < (document.all["dg1"].rows.length + 1) ; i++)
    {
        var Dept = "dg1__ctl" + i + "_txDept";
        var Subject = "dg1__ctl" + i + "_txSubject";

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

function ShowInput(argMode)
{
	if (document.all.rbNormal.checked)
	{
		document.all["dg1__ctl2_Label11"].className = "";
		document.all["dg1__ctl2_txDocNo"].className = "";
		document.all["dg1__ctl2_Label12"].className = "hide";
		document.all["dg1__ctl2_txClientNo"].className = "hide";
		document.all["dg1__ctl2_txClientVOLS"].className = "hide";
		document.all["dg1__ctl2_Label28"].className = "hide";
		document.all["dg1__ctl2_Label29"].className = "hide";
		document.all["dg1__ctl2_txClientVOLE"].className = "hide";
		document.all["dg1__ctl2_Label22"].className = "hide";
		document.all["dg1__ctl2_txManageNo"].className = "hide";
		document.all["dg1__ctl2_txManageNoVOLS"].className = "hide";
		document.all["dg1__ctl2_Label27"].className = "hide";
		document.all["dg1__ctl2_txManageNoVOLE"].className = "hide";
		document.all["dg1__ctl2_LBDesVolList"].className = "hide";
		document.all["dg1__ctl2_LBDesVol"].className = "hide";
		document.all["dg1__ctl2_txClientNo"].value = "";
		document.all["dg1__ctl2_txClientVOLS"].value = "";
		document.all["dg1__ctl2_txClientVOLE"].value = "";
		document.all["dg1__ctl2_txManageNo"].value = "";
		document.all["dg1__ctl2_txManageNoVOLS"].value = "";
		document.all["dg1__ctl2_txManageNoVOLE"].value = "";
		document.all["h_BORROW_FILE_TYPE"].value = "0";
		//1091214 Cloud 1090949 增加顯示最大電子、紙本卷及銷毀卷
		document.all["dg1__ctl2_lbMaxVol"].className = "hide";
		document.all["dg1__ctl2_lbMaxVolInfo"].className = "hide";
        //1110413 Cloud 1110064、1110026 單文增加顯示收創文日期，提供開啟併案視窗
		document.all["dg1__ctl2_lbRcvDate"].className = "";
        document.all["dg1__ctl2_Label30"].className = "";
        

		
	}
	else if (document.all.rbClient.checked)
	{
		document.all["dg1__ctl2_Label11"].className = "hide";
		document.all["dg1__ctl2_txDocNo"].className = "hide";
		document.all["dg1__ctl2_Label29"].className = "";
		document.all["dg1__ctl2_Label12"].className = "";
		document.all["dg1__ctl2_txClientNo"].className = "";
		document.all["dg1__ctl2_txClientVOLS"].className = "";
		document.all["dg1__ctl2_Label28"].className = "";
		document.all["dg1__ctl2_txClientVOLE"].className = "";
		document.all["dg1__ctl2_Label22"].className = "hide";
		document.all["dg1__ctl2_txManageNo"].className = "hide";
		document.all["dg1__ctl2_txManageNoVOLS"].className = "hide";
		document.all["dg1__ctl2_Label27"].className = "hide";
		document.all["dg1__ctl2_txManageNoVOLE"].className = "hide";

		document.all["dg1__ctl2_txDocNo"].value = "";
		document.all["dg1__ctl2_txManageNo"].value = "";
		document.all["dg1__ctl2_txManageNoVOLS"].value = "";
		document.all["dg1__ctl2_txManageNoVOLE"].value = "";
		document.all["h_BORROW_FILE_TYPE"].value = "1";
		//1091214 Cloud 1090949 增加顯示最大電子、紙本卷及銷毀卷
		document.all["dg1__ctl2_lbMaxVol"].className = "";
		document.all["dg1__ctl2_lbMaxVolInfo"].className = "";
	    //1110413 Cloud 1110064、1110026 單文增加顯示收創文日期，提供開啟併案視窗
		document.all["dg1__ctl2_lbRcvDate"].className = "hide";
		document.all["dg1__ctl2_lbRcvDate"].textContent = "";
        document.all["dg1__ctl2_Label30"].className = "hide";
        document.all["dg1__ctl2_hyComNo"].className = "hide";
	}
	else
	{
		document.all["dg1__ctl2_Label11"].className = "hide";
		document.all["dg1__ctl2_txDocNo"].className = "hide";
		document.all["dg1__ctl2_Label29"].className = "";
		document.all["dg1__ctl2_Label12"].className = "hide";
		document.all["dg1__ctl2_txClientNo"].className = "hide";
		document.all["dg1__ctl2_txClientVOLS"].className = "hide";
		document.all["dg1__ctl2_Label28"].className = "hide";
		document.all["dg1__ctl2_txClientVOLE"].className = "hide";
		document.all["dg1__ctl2_Label22"].className = "";
		document.all["dg1__ctl2_txManageNo"].className = "";
		document.all["dg1__ctl2_txManageNoVOLS"].className = "";
		document.all["dg1__ctl2_Label27"].className = "";
		document.all["dg1__ctl2_txManageNoVOLE"].className = "";

		document.all["dg1__ctl2_txDocNo"].value = "";
		document.all["dg1__ctl2_txClientNo"].value = "";
		document.all["dg1__ctl2_txClientVOLS"].value = "";
		document.all["dg1__ctl2_txClientVOLE"].value = "";
		document.all["h_BORROW_FILE_TYPE"].value = "2";
		//1091214 Cloud 1090949 增加顯示最大電子、紙本卷及銷毀卷
		document.all["dg1__ctl2_lbMaxVol"].className = "";
		document.all["dg1__ctl2_lbMaxVolInfo"].className = "";
	    //1110413 Cloud 1110064、1110026 單文增加顯示收創文日期，提供開啟併案視窗
		document.all["dg1__ctl2_lbRcvDate"].className = "hide";
		document.all["dg1__ctl2_lbRcvDate"].textContent = "";
        document.all["dg1__ctl2_Label30"].className = "hide";
        document.all["dg1__ctl2_hyComNo"].className = "hide";
	}
	if (argMode == "Change")
	{
		document.all["dg1__ctl2_txDept"].value = "";
		document.all["dg1__ctl2_txSubject"].value = "";
		//1091214 Cloud 1090949 增加顯示最大電子、紙本卷及銷毀卷
		document.all["dg1__ctl2_lbMaxVolInfo"].textContent = "";
		document.all["dg1__ctl2_LBDesVolList"].textContent = "";
		//1100203	Joe		1100053		併此單修正選單連動問題，應於change時選單才進行重設--S
		SetDLBor();
	}
	//SetDLBor();
	//1100203	Joe		1100053		併此單修正選單連動問題，應於change時選單才進行重設--E
}
//取得銷毀案卷以及案相關資訊-公司-案名
function fnGetDesVollist(argEntID, argCls)
{
	if (jf_Trim(document.all[argEntID].value) == "")
		return;
	if (argCls == "AA")
		document.all[argEntID].value = jf_PADL(document.all[argEntID].value, 8, '0')
	else
		document.all[argEntID].value = jf_PADL(document.all[argEntID].value, 9, '0')
	//調整叫用順序-先判斷案次號是否存在
	var strRtn = AK.AKT800_SMEG.GetCaseCompFrosubject(document.all.nSourceOrgno.value, document.all[argEntID].value, argCls).value
	if (strRtn.indexOf("ERR") != -1)
	{
		alert(strRtn.split('-')[1]);
		document.all[argEntID].focus();
		return;
	}
	document.all["dg1__ctl2_txDept"].value = strRtn.split('|')[0];//借戶名稱
	document.all["dg1__ctl2_txSubject"].value = strRtn.split('|')[1];//案名
	//取得銷毀卷
	var strRtn = AK.AKT800_SMEG.GetDesVolList(document.all.nSourceOrgno.value, document.all[argEntID].value, argCls).value
	if (strRtn.indexOf("ERR") != -1)
	{
		alert(strRtn.split('-')[1]);		
		document.all[argEntID].value = "";
		return;
	}
	//1091214 Cloud 1090949 增加顯示最大電子、紙本卷及銷毀卷
	//document.all["dg1__ctl2_LBDesVolList"].textContent = strRtn;
	document.all["dg1__ctl2_H_TXVolINFO"].value = strRtn;
	var CaseInfo = strRtn.split('|');
	document.all["dg1__ctl2_LBDesVolList"].textContent = CaseInfo[0];
	if (document.all["dg1__ctl2_LBDesVolList"].textContent != "") {
	    document.all["dg1__ctl2_LBDesVolList"].className = "";
	    document.all["dg1__ctl2_LBDesVol"].className = "";
	    if (CaseInfo[3] >= "5")
	    {
	    	document.all["dg1__ctl2_LBDesVolList"].title = CaseInfo[4];
	    }
	}
	else {
	    document.all["dg1__ctl2_LBDesVolList"].className = "hide";
	    document.all["dg1__ctl2_LBDesVol"].className = "hide";
	}
	//1091214 Cloud 1090949 增加顯示最大電子、紙本卷及銷毀卷
	document.all["dg1__ctl2_lbMaxVol"].className = "";
	document.all["dg1__ctl2_lbMaxVolInfo"].className = "";
	document.all["dg1__ctl2_lbMaxVolInfo"].textContent = "(紙本)" + CaseInfo[2] + "、(電子)" + CaseInfo[1];
	
	//取得案相關資訊
	//調整叫用順序
	/*var strRtn = AK.AKT800_SMEG.GetCaseCompFrosubject(document.all.nSourceOrgno.value, document.all[argEntID].value, argCls).value
	if (strRtn.indexOf("ERR") != -1)
	{
		alert(strRtn.split('-')[1]);
		document.all[argEntID].focus();
		return;
	}
	document.all["dg1__ctl2_txDept"].value = strRtn.split('|')[0];//借戶名稱
	document.all["dg1__ctl2_txSubject"].value = strRtn.split('|')[1];//案名*/
}
//設定完整檔號至隱藏欄位-檢核是否同時調閱電子及紙本卷
var GVolEntid = "";
// 2020.12.23	Cloud 	序112 	修正專案/逾期未檢核是否已被調閱問題
var GManSingleVolCheckOK = true;
var GManSingleVol = "";
function fnSetFileinfo(argEntID, argCls)
{
	//* 2021.02.08	Cloud	1100154	修改整卷借調支援線上瀏覽-欄位後，檢查另一個欄位是否有值，有則檢查是否可進行線上調檔
	var strFileCASE = "";
	var strOtherVol = "";
    //* 2021.05.14   Cloud   修改線上簽核公文僅提供線上瀏覽-如無影像直接不可調閱-解析檔號、判斷簽核類型-FOR 卷
	var strOtherEntID = "";
	//1100107	Joe		1101566		修正卷次號檢核時，一律轉大寫
	document.all[argEntID].value = document.all[argEntID].value.toUpperCase();
	if (jf_Trim(document.all[argEntID].value) == "")
	{
		//* 2021.02.08	Cloud	1100154	修改整卷借調支援線上瀏覽-欄位後，檢查另一個欄位是否有值，有則檢查是否可進行線上調檔-S
		if (argCls == "AA")
			strFileCASE = document.all["dg1__ctl2_txClientNo"].value;
		else
			strFileCASE = document.all["dg1__ctl2_txManageNo"].value;
		//取得另一邊的卷號-一併清空實際運作欄位
		if (argEntID.indexOf("VOLS") != -1)
		{
			//1100107	Joe		1101566		修正卷次號檢核時，一律轉大寫
			document.all[argEntID.replace("VOLS", "VOLE")].value = document.all[argEntID.replace("VOLS", "VOLE")].value.toUpperCase();
			strOtherVol = document.all[argEntID.replace("VOLS", "VOLE")].value;
			document.all["dg1__ctl2_txManageNoVOLS"].value = "";
			document.all["dg1__ctl2_txClientVOLS"].value = "";
		    //* 2021.05.14   Cloud   修改線上簽核公文僅提供線上瀏覽-如無影像直接不可調閱-解析檔號、判斷簽核類型-FOR 卷
			strOtherEntID = argEntID.replace("VOLS", "VOLE");
		}
		else
		{
			//1100107	Joe		1101566		修正卷次號檢核時，一律轉大寫
			document.all[argEntID.replace("VOLE", "VOLS")].value = document.all[argEntID.replace("VOLE", "VOLS")].value.toUpperCase();
			strOtherVol = document.all[argEntID.replace("VOLE", "VOLS")].value;
			document.all["dg1__ctl2_txManageNoVOLE"].value = "";
			document.all["dg1__ctl2_txClientVOLE"].value = "";
		    //* 2021.05.14   Cloud   修改線上簽核公文僅提供線上瀏覽-如無影像直接不可調閱-解析檔號、判斷簽核類型-FOR 卷
			strOtherEntID = argEntID.replace("VOLE", "VOLS");
		}
		if (strOtherVol != "")
		{
			var strRtn = "";
			//1100107	Joe		1101566		修正卷次號檢核時，一律轉大寫
			// if (strOtherVol.indexOf(document.all["INIT_EVOLNO"].value) != -1) {
			if (strOtherVol.indexOf(document.all["INIT_EVOLNO"].value.toUpperCase()) != -1) {
			    strRtn = AK.AKT800_SMEG.CheckBorTypeFromEsingDoc(document.all.nSourceOrgno.value, argCls, strFileCASE, strOtherVol, strOtherVol).value;
			    //* 2021.05.14   Cloud   修改線上簽核公文僅提供線上瀏覽-如無影像直接不可調閱-解析檔號、判斷簽核類型-FOR 卷-s
			    if (strRtn[0] == "true")//不可線上調檔
			    {
			        alert("您申請調案的案卷(件)為電子卷(線上簽核公文)，而且尚未完成歸檔加簽，故無法申請調案。請通知檔管人員為該案卷(件)公文進行歸檔加簽。");
			        if (strOtherEntID.indexOf("VOLS") != -1)
			            document.all["dg1__ctl2_txFileNos"].value = "";
			        else
			            document.all["dg1__ctl2_txFileNoe"].value = "";
			        document.all[strOtherEntID].value = "";
			        document.all[strOtherEntID].focus();
			        SetDLBor("");
			        return;
			    }
			    //* 2021.05.14   Cloud   修改線上簽核公文僅提供線上瀏覽-如無影像直接不可調閱-解析檔號、判斷簽核類型-FOR 卷-e
			}
			else
			    strRtn = AK.AKT800_SMEG.CheckBorTypeFromDoc(document.all.nSourceOrgno.value, "", argCls, strFileCASE, strOtherVol, strOtherVol).value;
			if (strRtn[1] != "")
			{ alert(strRtn[1]); }
			else if (strRtn[0] == "false")//可線上調檔
			{
				if (document.all[argEntID].value.indexOf(document.all["INIT_EVOLNO"].value) != -1)//電子卷且可調案則僅留線上
					SetDLBor("SetOnlyOnLine");
				else
					SetDLBor("AddOnLine");
			}
			else if (strRtn[0] == "true")//不可線上調檔
			{ SetDLBor(""); }
		}
		//* 2021.02.08	Cloud	1100154	修改整卷借調支援線上瀏覽-欄位後，檢查另一個欄位是否有值，有則檢查是否可進行線上調檔-E
		return;
	}
	//* 2021.02.08	Cloud	1100154	修改整卷借調支援線上瀏覽-欄位後，檢查另一個欄位是否有值，有則檢查是否可進行線上調檔
	//var strFileCASE = "";
	if (argCls == "AA")
		strFileCASE = document.all["dg1__ctl2_txClientNo"].value;
	else
		strFileCASE = document.all["dg1__ctl2_txManageNo"].value;
	document.all[argEntID].value = jf_PADL(document.all[argEntID].value, 4, '0');
	//檢核起訖是否包含電子跟紙本
	var bHasEdocAndPdoc = false;
	if (argEntID.indexOf("VOLS") != -1)
	{
		if(document.all[argEntID.replace("VOLS","VOLE")].value!="" && document.all[argEntID].value.substring(0,2)!=document.all[argEntID.replace("VOLS","VOLE")].value.substring(0,2))
			bHasEdocAndPdoc = true;
	}
	else
	{
		if (document.all[argEntID.replace("VOLE", "VOLS")].value != "" && document.all[argEntID].value.substring(0, 2) != document.all[argEntID.replace("VOLE", "VOLS")].value.substring(0, 2))
			bHasEdocAndPdoc = true;
	}
	if (bHasEdocAndPdoc)
	{
		alert("同一調案單不可同時借調電子及紙本卷。");
		$("#" + argEntID).focus();
		return;
	}
	//大小檢核-列管案卷才需要
	/*if (document.all.rbManaNo.checked)
	{
		var Vols = document.all["dg1__ctl2_txManageNoVOLS"].value;
		var Vole = document.all["dg1__ctl2_txManageNoVOLE"].value;
		var TempVol = "";
		//空白及大小互換
		if (Vols == "" && Vole != "")
			document.all["dg1__ctl2_txManageNoVOLS"].value = document.all["dg1__ctl2_txManageNoVOLE"].value;

		if (Vols != "" && Vole == "")
			document.all["dg1__ctl2_txManageNoVOLE"].value = document.all["dg1__ctl2_txManageNoVOLS"].value;
		if (Vols > Vole)
		{
			TempVol = document.all["dg1__ctl2_txManageNoVOLE"].value;
			document.all["dg1__ctl2_txManageNoVOLE"].value = document.all["dg1__ctl2_txManageNoVOLS"].value;
			document.all["dg1__ctl2_txManageNoVOLS"].value = TempVol;
		}
	}*/

	document.all["dg1__ctl2_txFileNo"].value = argCls + document.all["fileno_sep"].value + strFileCASE + document.all["fileno_sep"].value + document.all[argEntID].value;
	GVolEntid = argEntID;
	queryBorrowDetail(undefined, document.all["dg1__ctl2_txFileNo"].value, "dg1__ctl2_txFileNo");
	//* 2021.02.08	Cloud	1100154	修改整卷借調支援線上瀏覽-S
	if (document.all[argEntID].value != "")
	{
		//電子卷檢核是否已做完AKP360
		var strRtn = "";
		//取得另一邊的卷號
		if (argEntID.indexOf("VOLS") != -1)
			strOtherVol = document.all[argEntID.replace("VOLS", "VOLE")].value;
		else
			strOtherVol = document.all[argEntID.replace("VOLE", "VOLS")].value;
		if (strOtherVol == "")
			strOtherVol = document.all[argEntID].value;
		//進行大小互換
		var Vols = document.all[argEntID].value;
		var Vole = strOtherVol;
		var TempVol = "";
		if (Vols > Vole)
		{
			TempVol = Vole;
			Vole = Vols;
			Vols = TempVol;
		}
		//1100107	Joe		1101566		修正卷次號檢核時，一律轉大寫
		// if (document.all[argEntID].value.indexOf(document.all["INIT_EVOLNO"].value) != -1) {
		if (document.all[argEntID].value.indexOf(document.all["INIT_EVOLNO"].value.toUpperCase()) != -1) {
		    strRtn = AK.AKT800_SMEG.CheckBorTypeFromEsingDoc(document.all.nSourceOrgno.value, argCls, strFileCASE, Vols, Vole).value;
		    //* 2021.05.14   Cloud   修改線上簽核公文僅提供線上瀏覽-如無影像直接不可調閱-解析檔號、判斷簽核類型-FOR 卷-s
		    if (strRtn[0] == "true")//不可線上調檔
		    {
		        alert("您申請調案的案卷(件)為電子卷(線上簽核公文)，而且尚未完成歸檔加簽，故無法申請調案。請通知檔管人員為該案卷(件)公文進行歸檔加簽。");
		        if (argEntID.indexOf("VOLS") != -1)
		            document.all["dg1__ctl2_txFileNos"].value = "";
		        else
		            document.all["dg1__ctl2_txFileNoe"].value = "";
		        document.all[GVolEntid].value = "";
		        return;
		    }
		    //* 2021.05.14   Cloud   修改線上簽核公文僅提供線上瀏覽-如無影像直接不可調閱-解析檔號、判斷簽核類型-FOR 卷-e
		}
		else
		    strRtn = AK.AKT800_SMEG.CheckBorTypeFromDoc(document.all.nSourceOrgno.value, "", argCls, strFileCASE, Vols, Vole).value;
		if (strRtn[1] != "")
		{ alert(strRtn[1]); }
		else if (strRtn[0] == "false")//可線上調檔
		{
			if (document.all[argEntID].value.indexOf(document.all["INIT_EVOLNO"].value) != -1)//電子卷且可調案則僅留線上
				SetDLBor("SetOnlyOnLine");
			else
				SetDLBor("AddOnLine");
		}
		else if (strRtn[0] == "true")//不可線上調檔
		{ SetDLBor(""); }
	}
	//* 2021.02.08	Cloud	1100154	修改整卷借調支援線上瀏覽-E
	// 2020.12.23	Cloud 	序112 	修正專案/逾期未檢核是否已被調閱問題
	//* 2021.01.13	Cloud	序164-起值為空白輸入迄值時，執行以下邏輯會把迄值補入起值進行相同檢核，故不需要
	//if (document.all["rbManaNo"].checked && GManSingleVolCheckOK && document.all["dg1__ctl2_txManageNoVOLE"].value!="")
	if (document.all["rbManaNo"].checked && GManSingleVolCheckOK && document.all["dg1__ctl2_txManageNoVOLS"].value!="" && document.all["dg1__ctl2_txManageNoVOLE"].value!="")
	{
		var ints = 0;
		var inte = 0;
		var bIsEdoc = false;
		var Vols = document.all["dg1__ctl2_txManageNoVOLS"].value;
		var Vole = document.all["dg1__ctl2_txManageNoVOLE"].value;
		var TempVol = "";
		
		//空白及大小互換
		if (Vols == "" && Vole != "")
			document.all["dg1__ctl2_txManageNoVOLS"].value = document.all["dg1__ctl2_txManageNoVOLE"].value;

		if (Vols != "" && Vole == "")
			document.all["dg1__ctl2_txManageNoVOLE"].value = document.all["dg1__ctl2_txManageNoVOLS"].value;
		if (Vols > Vole)
		{
			TempVol = document.all["dg1__ctl2_txManageNoVOLE"].value;
			document.all["dg1__ctl2_txManageNoVOLE"].value = document.all["dg1__ctl2_txManageNoVOLS"].value;
			document.all["dg1__ctl2_txManageNoVOLS"].value = TempVol;
		}
		if (Vols.indexOf(document.all["INIT_EVOLNO"].value) != -1)
		{
			ints = parseInt(document.all["dg1__ctl2_txManageNoVOLS"].value.substring(0, 2));
			inte = parseInt(document.all["dg1__ctl2_txManageNoVOLE"].value.substring(0, 2));
			bIsEdoc = true;
		}
		else
		{
			ints = parseInt(document.all["dg1__ctl2_txManageNoVOLS"].value);
			inte = parseInt(document.all["dg1__ctl2_txManageNoVOLE"].value);
		}
		var volNo = "";
		if (ints != inte)
		{
			for (var ivol = ints; ivol <= inte; ivol++)
			{
				if (bIsEdoc)
					volNo = document.all["INIT_EVOLNO"].value + ivol.toString().PadLeft(4 - document.all["INIT_EVOLNO"].value.Length, '0');
				else
					volNo = jf_PADL(ivol.toString(), 4, '0');
				GManSingleVol = volNo;
				queryBorrowDetail(undefined, "BB" + document.all["fileno_sep"].value + document.all["dg1__ctl2_txManageNo"].value + document.all["fileno_sep"].value + volNo, "dg1__ctl2_txFileNos");
			}
		}
	}
	//1091223 Cloud 序112 補上未檢核是否被借出
	GManSingleVolCheckOK = true;

	//
	//放入搜尋用欄位
	if (argEntID.indexOf("VOLS")!=-1)
		document.all["dg1__ctl2_txFileNos"].value = document.all["dg1__ctl2_txFileNo"].value;
	else
		document.all["dg1__ctl2_txFileNoe"].value = document.all["dg1__ctl2_txFileNo"].value;
	document.all["dg1__ctl2_txFileNo"].value = "";
	
}
//調卷類型不可借調線上
//1100208 Cloud 1100154 調卷支援線上調檔
//function SetDLBor()
function SetDLBor(argMode)
{
	/*<asp:ListItem Value="1">檔案原件</asp:ListItem>
      <asp:ListItem Value="2">線上調檔</asp:ListItem>
      <asp:ListItem Value="3" Selected="True">檔案複製品</asp:ListItem>*/
	ClearDL(document.all["dlBorType"]);
	//1100208 Cloud 1100154 調卷支援線上調檔-純電子卷且皆做過AKP360僅留線上
	if (argMode == "SetOnlyOnLine")
	{
		DropListChild = document.createElement("OPTION");
		DropListChild.text = "線上調檔";
		DropListChild.value = "2";
		document.all["dlBorType"].options.add(DropListChild);
		document.all["dlBorType"].selectedIndex = 0;
		document.all.txLastBorType.value = "2";
		return;
	}
	var DropListChild = document.createElement("OPTION");
	DropListChild.text = "檔案原件";
	DropListChild.value = "1";
	document.all["dlBorType"].options.add(DropListChild);
	//1100208 Cloud 1100154 調卷支援線上調檔
	//if (document.all["rbNormal"].checked)
	if (document.all["rbNormal"].checked || argMode=="AddOnLine")
	{
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
	//1100208 Cloud 1100154 調卷支援線上調檔
	if (argMode == "AddOnLine")
	{
		document.all["dlBorType"].selectedIndex = 1;
		document.all.txLastBorType.value = "2";
	}
}
function ClearDL(argObj)
{
	for (var i = 0 ; i < argObj.length; i++)
		argObj.remove(0);

	argObj.length = 0;
	return;
}
function dlDept_Text_onblur()
{
	var bCheckOK = true;
	if (document.all["dlDept"].value != document.all["H_Dept"].value)
	{
		
		document.all["H_Dept"].value = document.all["dlDept"].value;
		
		if (document.all["H_Dept"].value == "")
		{
			document.all["H_Dept_Value"].value = "";
			document.all["H_Dept_Text"].value = "";
		}
		else
		{
			var arr = document.all["H_Dept"].value.split(":");
			document.all["H_Dept_Value"].value = arr[0];
			document.all["H_Dept_Text"].value = arr[1];
		}
		
		
		akjf_SetdlDropDownListDept(document.all["H_Dept_Value"].value, "dlSect", false, false);	//初始dlSect、dlUser的處理

		document.all["H_Sect"].value = "";
		document.all["H_Sect_Value"].value = "";
		
		document.all["H_dlSect_Value"].value = SaveCurrDL(document.all["dlSect"]);
	}
	if(document.all["dlSect"].options.length <=1)
	{		
		document.all["dlSect"].disabled=true;
	}
	else
		document.all["dlSect"].disabled=false;
	return bCheckOK;
}

function dlSect_Text_onblur()
{
	var bCheckOK = true;
	var Inx = document.all["dlSect"].selectedIndex;
	var strSectText=document.all["dlSect"].options[Inx].text;
	//值若變更時作處理
	if (strSectText == "")
	{
		document.all["H_Sect"].value = "";
		document.all["H_Sect_Text"].value = "";
		document.all["H_Sect_Value"].value = "";
	}
	if (document.all["dlSect"].value != document.all["H_Sect"].value)
	{
		//存ComboBox_Text的value
		document.all["H_Sect"].value = document.all["dlSect"].value;
		document.all["H_Sect_Text"].value = strSectText;
		//存所選擇的ComboBox項目的value
		document.all["H_Sect_Value"].value = akjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect_Text"].value);
	}
	else 
	{
		document.all["H_Sect"].value = strSectText;
		document.all["H_Sect_Value"].value = akjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect_Text"].value);
	}
		
	return bCheckOK;
}
//將下拉選單裡的options轉成字串相加再回傳，格式： [項目Text;項目Value|項目Text;項目Value|...]
function SaveCurrDL(argSource)
{
	var strTemp = "";
	for(var i=0 ; i < argSource.options.length ; i++ )
	{
		if(argSource.options[i].text!="")
		{
			//僅含一級單位選項無value值，故在此另外判斷並加入隱藏dropdownlist，避免postback後無法將值keep在畫面上
			if(argSource.options[i].text.indexOf("僅含一級單位")==1)
				strTemp += argSource.options[i].text + ";"+"(僅含一級單位)|";
			else
				strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
		}
	}
	
	return strTemp.substr(0,strTemp.length-1);
}

//1100420 Zen 1100144 (信保)支援填寫急件申請原因後自動勾選急件申請
function txUrgentReason_onblur()
{
    if ($('#txUrgentReason').val() != '')
        $('#ckUrgent').prop("checked", true);
    
}

//--以下功能不會有 但保留避免未來需要
/*function GetFromDocInfo()//不會有 先mark
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
}*/
//1080423	Kevin_C	1080047	增加字數檢核 -E
//1090504 		Cloud 	1080750 核可通知 增加線上瀏覽功能-s-此段不會有 先MERK
/*function fnOpenView(argDocNo, argSignType)
{
    try
    {
        var wsUrl = encodeURI(document.all.fileiows.value);
        var param = [];

        param[0] = encodeURI(document.all.nArtifact.value);
        param[1] = encodeURI(argDocNo);
        param[2] = encodeURI(document.all.nSourceOrgno.value);

        var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
        if (!rtnObj.error)
        {
            if (rtnObj.value.m_bSuccess)
            {
                var sUnvObj = rtnObj.value.RtnStr;
                if (sUnvObj !== "")
                {
                    var UnvObj = JSON.parse(sUnvObj);
                    var objViewDoc = {
                        UNVObj: UnvObj,
                        docInfoPage: "AKT881",
                        openDocModule: argSignType == "E" ? "AOL" : "UniView",
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
}*/
//1090504 		Cloud 	1080750 核可通知 增加線上瀏覽功能-e
//1110414 Cloud 1110026-增加開啟AKI811-S
function jf_GetComBineDoc(obj) {
    
    var ParaList = new Array();
    var valueList = new Array();

    for (var i = 0; i < 3; i++) {
        switch (String(i)) {
            case "0":
                ParaList[i] = "_PageSize";
                valueList[i] = "15";
                break;
            case "1":
                ParaList[i] = "H_txHideDept";
                valueList[i] = document.all.h_SpDeptlist.value.split(":")[1];
                break;
            case "2":
                ParaList[i] = "H_txSubject";
                valueList[i] = document.all.h_SpDeptlist.value.split(":")[0];
                break;

        }
        
    }
    var ComNoList = document.all["dg1__ctl2_txComNo"].value;
    var rtn = AK.AKI801.lkCOMBINE_Click(document.all.nArtifact.value, -1, ComNoList, ParaList, valueList);
    if (rtn.value) {
        if (rtn.value.indexOf('ERR:') != -1)
            alert(rtn.value);
        else
            jf_OpenSumDocWin(encodeURI(rtn.value+"&argFrom=AKT800_SMEG"));
    }
    else
        alert(rtn.error);
}

function jf_OpenSumDocWin(sUrl)
{
	SumDocWin = open("about:blank", "SumComWin", "fullscreen=no,Height=546,Width=1024,Top=" + String((window.screen.height - 600) / 2) + ",Left=" + String((window.screen.width - 1024) / 2) + ",Scrollbars=yes,titlebar=yes,status=yes,resizable=no");
	SumDocWin.location = sUrl;
  SumDocWin.focus();
}
//1110414 Cloud 1110026-增加開啟AKI811-E
//* 2024.11.07	Cloud	無單號	信保-現場會發生列管卷可同時調閱電子卷、紙本卷問題-約1個月有1筆-補強儲存、預覽、傳送前加檢核
function CheckManaNoApply()
{
	
	if(document.all["rbManaNo"].checked)
	{
		//檢核起訖是否包含電子跟紙本
		if(document.all["dg1__ctl2_txManageNoVOLS"].value!="" && document.all["dg1__ctl2_txManageNoVOLE"].value!="")
		{
			if(document.all["dg1__ctl2_txManageNoVOLS"].value.substring(0,2)!=document.all["dg1__ctl2_txManageNoVOLE"].value.substring(0,2))
			{
				alert('同一調案單不可同時借調電子及紙本卷。');
				return false;
			}
			else
				return true;
		}
		else
			return true;
		
	}
	else if(document.all["rbClient"].checked)
	{
		//檢核起訖是否包含電子跟紙本
		if(document.all["dg1__ctl2_txClientVOLS"].value!="" && document.all["dg1__ctl2_txClientVOLE"].value!="")
		{
			if(document.all["dg1__ctl2_txClientVOLS"].value.substring(0,2)!=document.all["dg1__ctl2_txClientVOLE"].value.substring(0,2))
			{
				alert('同一調案單不可同時借調電子及紙本卷。');
				return false;
			}
			else
				return true;
		}
		else
			return true;
		
	}
	else
		return true;
	
}
