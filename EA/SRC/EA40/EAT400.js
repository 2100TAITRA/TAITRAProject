/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2008.02.27	Cola	0970081	Marked 與 dlDestroyUnit 相關之Code, 目前銷毀單位直接依法規預設單位:案
 * 2008.08.04	Cola	0970753	按下清除後, radiobutton應恢復為default value, 不應清空
 * 2009.03.31	Howard	0971128	新增無解密日期之案件欄位檢核及修改選擇移轉計畫時保存年限改為隱藏
 * 2014.09.12	Cloud	-------	修正儲位號欄位檢核是未檢核到的異常
 * 2015.11.13	Cloud	1040921	(merge)1010877	配合新版法規，增加"鑑定"清理項目之相關UI邏輯
 * 2016.01.25   Cloud   1040846	(MERGE)增加電子檔案無法修復，銷毀
 * 2017.06.02	Kevin_C	1050087	升二代
 * 2018.01.22   Cloud   1080049 弱掃Reflected XSS Specific Clients修正
 * 2018.01.30	Cloud   1080049 經評估此系統參數不會使用特別字元，故直接移除htmldecode
 * 2019.06.06   Cloud   1080454 修改僅降解密可使用承辦單位條件
 * 2019.08.14   Cloud   1080623 調整庫房檢核機制，ONBLUR時即檢核是否有權限
 * 2020.02.14	Cloud	1090040	修改選擇鍵定時密等條件可選擇全部
 * 2020.07.21	CLOUD	1090519	修改移轉公文可產生鑑定批號
 * 1100204      Zen     1090927 取消使用document.activeElement
 * 1110103		Zen     1101292	修正多次點擊重複PostBack之問題
 * 1111215      Cloud   1110860 修改個人檔不支援使用   
 * 2023.03.07   Cloud   1120063  1070201 新增支援單文銷毀功能
 * 2025.10.13	Cloud	1141137	修改支援外貿三欄位
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1060602	Kevin_C	1050087	升二代
//if(document.all.tbTool)
	//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060602	Kevin_C	1050087	升二代 -S
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	////f_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	// jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, null); //使用WebService前必須先呼叫一次
	// jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetStoreInfo", false, null);
	//1060602	Kevin_C	1050087	升二代 -E
	InitObj();
//* 2018.01.22   Cloud   1080049 弱掃Reflected XSS Specific Clients修正
// 2018.01.30	Cloud   1080049 經評估此系統參數不會使用特別字元，故直接移除htmldecode
	//document.all["txFileNoSep"].value = htmldecode(document.all["txFileNoSep"].value);
	// 2023.03.07   Cloud      1070201 新增支援單文銷毀功能-S
	fnSetKeepYear();
}
//* 2018.01.22   Cloud   1080049 弱掃Reflected XSS Specific Clients修正
function htmldecode(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    return div.innerText || div.textContent;
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100204 Zen 1090927 取消使用document.activeElement
//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement
    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btKeyHelp": //計畫批號提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "EAT400C1.aspx";
			jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
			break;
		case "ibtSourceOrgNo": //產生機關提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "EAT400C2.aspx";
			jf_OpenChildWin(pUrl, "EAT400C2", 750, 500);
			break;
		case "ibtStoreNo": //產生機關提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "EAT400C3.aspx";
			jf_OpenChildWin(pUrl, "EAT400C3", 750, 500);
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060602	Kevin_C	1050087	升二代
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
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1060602	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060602	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			//0951212 JEFF 判斷計畫種類決定是否應打基準日
		    //1050125   Cloud   [1040846] (MERGE)勾選電子檔案無法修復銷毀時，不做儲存前判斷直接增加一個空的計畫編號
		    if (!document.all["rbPlanType_6"].checked) 
			{
				if(document.all["rbPlanType_2"].checked) //銷毀計畫必須有基準日
				{
					if (!document.all["cbDestroy2"].checked || document.all["txDBaseDate"].value == "")
					{
						Page_BlockSubmit = true;
						alert("請輸入銷毀計畫基準日期等相關資訊");
						return;
					}
				}
				
				if(document.all["rbPlanType_3"].checked) //銷毀計畫必須有基準日
				{
					if (!document.all["cbTransfer2"].checked || document.all["txDBaseDate2"].value == "")
					{
						Page_BlockSubmit = true;
						alert("請輸入移轉計畫基準日期等相關資訊");
						return;
					}
				}		
			
				if(!CheckBeforeSave())
				{
					Page_BlockSubmit = true;
				}
				else
				{
					if(jf_ConfirmSave()) //是否通過儲存前必要檢查
					{
						IsServerHandling = true;
						jf_ShowWaitState();	
						Page_BlockSubmit = false;
					}
					else
						Page_BlockSubmit = true;
					//1060602	Kevin_C	1050087	升二代
					//jf_ToolBarSubmit();					
					jf_ToolBarSubmit(xObjectName);					
				}
		    }
		    else
		    {
		        IsServerHandling = true;
		        jf_ShowWaitState();
		        Page_BlockSubmit = false;
		//1060602	Kevin_C	1050087	升二代
		        //jf_ToolBarSubmit();
		        jf_ToolBarSubmit(xObjectName);
		    }
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060602	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060602	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			//將欄位值保存避免清除後會出現錯誤 #2007.06.09 Andy
			var tmp1 = document.all.txFileNoSep.value;
			var tmp2 = document.all.txOrgNo.value;
		    //*2019.08.14   Cloud   1080623 修正庫房權限檢核邏輯錯誤問題
			var tmp3 = document.all.h_storenoList.value;
			var tmp4 = document.all.h_username.value;
			jf_ConfirmClean(true);
			document.all.txFileNoSep.value = tmp1;
			document.all.txOrgNo.value = tmp2;
		    //*2019.08.14   Cloud   1080623 修正庫房權限檢核邏輯錯誤問題
			document.all.h_storenoList.value = tmp3;
			document.all.h_username.value = tmp4;
			//Add by Cola -- radio button 回復初始化 --
			document.all["rbPlanType_0"].checked = true;//清查
			document.all["rbSecNo_6"].checked = true;	//全部
			document.all["rbDocFileType_4"].checked = true;	//全部
			//Cola -- end --
			//1060602	Kevin_C	1050087	升二代
		    //document.all["txPlanNo"].focus();
		    
			$('txPlanNo').focus();
			InitObj();
			break;
		case "btSearch":
			/*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			*/
			break;
		case "btPrint":
			Page_BlockSubmit = true;
			var xPlanNo;
			if(document.all["txPlanNo"].value !="")
			{
			xPlanNo = document.all["txPlanNo"].value;
			strUrl = "EAR401.aspx?argPlanNo="+xPlanNo;
			jf_OpenChildWin(strUrl, "EAR401", 750, 500);
			}
			else
			{
			strUrl = "EAR401.aspx";
			jf_OpenChildWin(strUrl, "EAR401", 750, 500);
			}
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1060602	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
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
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	/*	
	if (document.all["txPlanNo"].value == "")
	{
		strErrMsg += "清理批號不可空白\n";
		document.all["txPlanNo"].focus();
	}
	*/
	/*
	if (document.all["txSourceOrgName"].value == "")
	{
		strErrMsg += "檔案產生機關不可空白\n";
		document.all["txSourceOrgName"].focus();
	}
	*/
		
	if(document.all["rbPlanType"].value == "")
	{
		strErrMsg += "至少需勾選一項計畫內容\n";
		//1060602	Kevin_C	1050087	升二代
		//document.all["txPlanNo"].focus();
		$('txPlanNo').focus();
	}
	
	if(document.all["cbSec2"].checked == true)
	{
		if(document.all["txDBaseDate0"].value == "")
		{
			strErrMsg += "基準日期不可空白\n";
			//1060602	Kevin_C	1050087	升二代
			//document.all["txDBaseDate0"].focus();
			$('txDBaseDate0').focus();
		}
	}
		
	if(document.all["cbDestroy2"].checked == true)
	{
		if(document.all["txDBaseDate"].value == "")
		{
			strErrMsg += "基準日期不可空白\n";
			//1060602	Kevin_C	1050087	升二代
			//document.all["txDBaseDate"].focus();
			$('txDBaseDate').focus();
		}
	}
	
	if(document.all["cbTransfer2"].checked == true)
	{
		if(document.all["txDBaseDate2"].value == "")
		{
			strErrMsg += "基準日期不可空白\n";
			//1060602	Kevin_C	1050087	升二代
			//document.all["txDBaseDate2"].focus();
			$('txDBaseDate2').focus();
		}
	}
	
	strErrMsg = CheckFileNoRange(strErrMsg);
	
	if(document.all["txYearS"].value == "" && document.all["txYearE"].value == "" && document.all["txKeepYearS"].value == "" &&  
	   document.all["txKeepYearE"].value == "" && document.all["txStoreNo"].value == "" && document.all["txSourceOrgName"].value == "" &&
	   document.all["txCrtDateS"].value == "" && document.all["txCrtDateE"].value == ""
	   // 2014.09.12	Cloud修正儲位號欄位檢核是未檢核到的異常
	   //&& document.all["txClsS"].value == "" && document.all["txClsE"].value == "")
	   && document.all["txClsS"].value == "" && document.all["txClsE"].value == "" && document.all["txStockNoS"].value == "" && document.all["txStockNoE"].value == "")
	{
		// 2014.09.12	Cloud修正儲位號欄位檢核是未檢核到的異常
		
		strErrMsg += "請至少輸入一項條件以進行合理清理範圍設定\n";
	}
	//* 2020.07.21	CLOUD	1090519	修改移轉公文可產生鑑定批號
	if (document.all["rbPlanType_5"].checked == true)
	{
		if (!document.all["cbDestroy2"].checked && !document.all["cbTransfer2"].checked )
		{
			strErrMsg += "產生鑑定批號時，以下條件至少需勾選一個：\n 1.[已屆銷毀年限之案卷]\n2.[已屆移轉年限之案卷]";
		}
		else if (document.all["cbDestroy2"].checked && document.all["cbTransfer2"].checked)
		{
			strErrMsg += "產生鑑定批號時，以下條件僅能勾選一個：\n 1.[已屆銷毀年限之案卷]\n2.[已屆移轉年限之案卷]";
		}
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}

	return bRtnbool;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
    }   
    if(argResult.id == ws_OrgID)
    {
		if(argResult.value.m_bSuccess)
		{
			var tempOrgName = argResult.value.RtnField0;
			var tempOrgNo = jf_Trim(document.all["txSourceOrgName"].value);
			document.all["txSourceOrgName"].value = tempOrgName;
			document.all["txTempOrg"].value = tempOrgNo;
		}
		else
		{
			//document.all["txSourceOrgName"].value = argResult.value.RtnField0;
			alert("所輸入的機關代碼不合法，請確認");			
		}
    }
    if(argResult.id == "")
    {
		
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
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
	if (argCallerId == "EAT400C1")
	{
		document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
		//1060602	Kevin_C	1050087	升二代
		//document.all["txPlanNo"].focus();
		$('txPlanNo').focus();
		Page_BlockSubmit=false;
		jf_OpenButtonSubmit();
	}
	
	if (argCallerId == "EAT400C2")
	{
		//document.all["txOrgNo"].value  = document.all["lbReturnValue"].options[0].text;//Mob 20070425修改
		document.all["txSourceOrgName"].value = document.all["lbReturnValue"].options[0].value;
		//1060602	Kevin_C	1050087	升二代
		//document.all["txSourceOrgName"].focus();
		$('txSourceOrgName').focus();
	}
	
	if (argCallerId == "EAT400C3")
	{
		if(document.all["txStoreNo"].value == "")
			document.all["txStoreNo"].value  = document.all["lbReturnValue"].options[0].value;
		else
			document.all["txStoreNo"].value += ";" + document.all["lbReturnValue"].options[0].value;	
		
		if(document.all["txStoreName"].value == "")
			document.all["txStoreName"].value  = document.all["lbReturnValue"].options[1].value;
		else 
			document.all["txStoreName"].value  += ";" + document.all["lbReturnValue"].options[1].value;
		//1060602	Kevin_C	1050087	升二代
		//document.all["txStoreNo"].focus();
		$('txStoreNo').focus();
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}



/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function cbSecOnclick()
{
	if( document.all.cbSec2.checked == true )
	{	
		document.all.dlNotify.disabled = false;
		document.all.cbNotifyUser.parentNode.disabled = false;
		document.all.cbNotifyUser.disabled = false;
		document.all.cbNotifyUser.checked = true;
	}
	else 
	{
		document.all.dlNotify.disabled = true;
		document.all.cbNotifyUser.parentNode.disabled = true;
		document.all.cbNotifyUser.disabled = true;
		document.all.cbNotifyUser.checked = false;
	}
}

//1100204 Zen 1090927 取消使用document.activeElement
//function rbGroupOnclick()
//{	
//	document.all.cbReposited2.checked = false;
//	document.all.cbSec2.checked = false;
//	document.all.cbDestroy2.checked = false;
//	document.all.cbTransfer2.checked = false;
//	document.all.cbTran.checked = false;
//	document.all.cbFileUpd.checked = false;
//	document.all.cbUnRecovery.checked = false;
//	SetOtherSecCheckBox(false);
//	cbSecOnclick();
	
//	switch( document.activeElement.id)
//	{
//		case "rbReposited": //清查
//			document.all.cbReposited2.checked = true;
//			break;
//		case "rbSec": //降解密
//			document.all.cbSec2.checked = true;
//			cbSecOnclick();
//			break;
//		case "rbDestroy": //銷毀
//			document.all.cbDestroy2.checked = true;
//			document.all.rbNor.checked = true;
//			SetOtherSecCheckBox(true);
//			break;
//		case "rbTransfer": //移轉
//			document.all.cbTransfer2.checked = true;
//			break;
//		case "rbTran":
//			document.all.cbTran.checked = true;
//			break;
//	}
//}
//980331	Howard [0971128]	制定移轉計畫時保存年限欄位需修改為disabled
function SetKeepYearDisable(bCheckYear)
{
	if(bCheckYear)
	{
		document.all["txKeepYearS"].className	= "displayOnly";
		document.all["txKeepYearS"].value			="";		
		document.all["txKeepYearE"].className	= "displayOnly";
		document.all["txKeepYearE"].value			="";
	}
	else
	{	
		document.all["txKeepYearS"].className	= "";
		document.all["txKeepYearE"].className	= "";
	}
	document.all["txKeepYearS"].disabled	= bCheckYear;
	document.all["txKeepYearE"].disabled	= bCheckYear;
}

function SetOtherSecCheckBox(bCheck) //設定機密等級disabled
{
	document.all["rbSecNo_1"].disabled = bCheck;
	document.all["rbSecNo_2"].disabled = bCheck;
	document.all["rbSecNo_3"].disabled = bCheck;
	document.all["rbSecNo_4"].disabled = bCheck;
	document.all["rbSecNo_5"].disabled = bCheck;
	document.all["rbSecNo_6"].disabled = bCheck;
}

function CleanCheckBox()
{	
	for(i=0;i< document.forms[0].elements.length;i++)
	{
		if(document.forms[0].elements[i].type=='checkbox')
		   document.forms[0].elements[i].checked = false;		
		if(document.forms[0].elements[i].type=='radio')
		   document.forms[0].elements[i].disabled = false;
	}
}

function InitObj()
{
//mark
	var strObjName = "rbPlanType_0";
	
	document.all["dlNotify"].disabled = true;	
	document.all["cbNotifyUser"].disabled = true;
	
	//document.all["rbPlanType_0"].checked = true;
	//document.all["rbSecNo_0"].checked = true;
	
	RadioButtonOnClick(strObjName);	
		
	dt = new Date();
	var arr1 = new Array(3);
	var y = dt.getFullYear();
	arr1[0] = dt.getFullYear()-1911;
	arr1[1] = dt.getMonth()+1;	
	arr1[2] = dt.getDate();
	
	arr1[0] = jf_PADL(arr1[0].toString(),3,"0");
	arr1[1] = jf_PADL(arr1[1].toString(),2,"0");
	arr1[2] = jf_PADL(arr1[2].toString(),2,"0");
	show2 = arr1[0]+arr1[1]+arr1[2];
	show2 = jf_PADL(show2,7,"0");
	if (document.all["txDBaseDate"].value == "")	//Add by Cola 若為空才自動帶入
		document.all["txDBaseDate"].value = show2;
	
	y = y - 1911;	
	show1 = (y-1)+"1231";
	show1 = jf_PADL(show1,7,"0")
	if (document.all["txDBaseDate0"].value == "")		//Add by Cola 若為空才自動帶入
		document.all["txDBaseDate0"].value = show1;
	if (document.all["txDBaseDate2"].value == "")		//Add by Cola 若為空才自動帶入	
		document.all["txDBaseDate2"].value = show1;
	
	GetStoreNoFromDL();	
}

function RadioButtonOnClick(strObjName)
{
	//970331	Howard[0971128]	新增isClick判斷是否點選RadioButton
	var isClick = false;
	if(strObjName == null)
	{
	    //1100204 Zen 1090927 取消使用document.activeElement
	    //strObjName = document.activeElement.id;
	    strObjName = event.target.id;
		CleanCheckBox();
		isClick = true;
	}
	SetOtherSecCheckBox(false);
    // 2019.06.06   Cloud   1080454 修改僅降解密可使用承辦單位條件-S
	var tempdldeptIndex = document.all["dlDept"].selectedIndex;
	document.all["dlDept"].disabled = true;
	document.all["dlDept"].selectedIndex = 0;
    // 2019.06.06   Cloud   1080454 修改僅降解密可使用承辦單位條件-E
	//if (strObjName == "rbPlanType_0")//清查
	if(document.all["rbPlanType_0"].checked)
	{					
		document.all["txDBaseDate0"].className	= "displayOnly";
		document.all["txDBaseDate0"].disabled	= true;
		document.all["txDBaseDate"].className	= "displayOnly";
		document.all["txDBaseDate"].disabled	= true;
		document.all["txDBaseDate2"].className	= "displayOnly";
		document.all["txDBaseDate2"].disabled	= true;
		
		document.all["cbReposited2"].disabled	= false;
		document.all["cbFileUpd"].disabled		= false;
		document.all["cbUnRecovery"].disabled	= false;
		
		document.all["dlNotify"].className		= "displayOnly";
		//document.all["dlDestroyUnit"].className	= "displayOnly";
		document.all["dlNotify"].disabled		= true;
		//document.all["dlDestroyUnit"].disabled	= true;
		document.all["cbSec2"].disabled			= true;
		//980331 Howard[0971128]  無解密日期之案件檢核	
		document.all["cbSec3"].disabled			= true;
		//980331	Howard[0971128]	針對清查案件保存年限視為Enable	
		SetKeepYearDisable(false);
		
		document.all["cbNotifyUser"].disabled	= true;
		document.all["cbDestroy2"].disabled		= true;
		document.all["cbTransfer2"].disabled	= true;
		document.all["cbTran"].disabled	= true;
		//980331	Howard[0971128]	若為新增模式及RadioButton被點選時	
		if (jf_GetActionMode()==LayoutModeNew || isClick)
			document.all["cbReposited2"].checked		= true;	
		//document.all[strObjName+"2"].checked = (document.all[strObjName].checked);			
		//95.09.29 David
		//Marked by Cola 已由server端帶出值，因此不需再由js端給checked (2008.08.04)
		//document.all["rbSecNo_6"].checked			= true;	//全部
		
		//1041113	Cloud	1040921	(merge)1010877新增清理處置項目，僅於"銷毀"及"鑑定"時使用
		document.all["cbClearProc"].checked		= false;
		document.all["cbClearProc"].disabled	= true;
		document.all["dlClearProc"].disabled	= true;
	    //1050125 cloud [1040846] (MERGE)增加電子檔案無法修復銷毀選項-清理範圍輸入欄位選擇其他類別時需可使用
		SetInfoText(false);
		//1070627 Cloud 1070201 修正復原銷毀單位啟用停用行為
	    document.all["dlDestroyUnit"].className	= "displayOnly";
	    document.all["dlDestroyUnit"].disabled = true;
	    //1070627 Cloud 1070201 控制保存年限選項
	    fnSetKeepYear(false);
	}
	//else if (strObjName == "rbPlanType_1")//降解密
	else if(document.all["rbPlanType_1"].checked)
	{
		//0980311 Howard[0971120] 修正由清查改為降解密時，檔案類型預設選為所有密件
		if ( document.all["rbSecNo_0"].checked || document.all["rbSecNo_6"].checked)
		{
			document.all["rbSecNo_5"].checked = true;
		}
		document.all["txDBaseDate0"].className	= "InputFieldText";		//1041113	Cloud	1040921	(merge)1010877一併修正顯示樣式，"" → "InputFieldText"
		document.all["txDBaseDate0"].disabled	= false;
		document.all["txDBaseDate"].className	= "displayOnly";
		document.all["txDBaseDate"].disabled	= true;
		document.all["txDBaseDate2"].className	= "displayOnly";
		document.all["txDBaseDate2"].disabled	= true;
		
		document.all["cbSec2"].disabled			= false;
		//980331 Howard[0971128]  無解密日期之案件檢核
		document.all["cbSec3"].disabled			= false;
		//980331	Howard[0971128]	針對降解密案件保存年限視為Enable	
		SetKeepYearDisable(false);
		
		document.all["cbNotifyUser"].disabled	= false;
		document.all["dlNotify"].disabled		= false;
		document.all["dlNotify"].disabled		= false;
		
		document.all["dlNotify"].className		= "InputFieldText";		//1041113	Cloud	1040921	(merge)1010877一併修正顯示樣式，"" → "InputFieldText"
		//document.all["dlDestroyUnit"].className	= "displayOnly";
		
		//document.all["dlDestroyUnit"].disabled	= true;
		document.all["cbReposited2"].disabled	= true;
		document.all["cbFileUpd"].disabled		= true;		
		document.all["cbUnRecovery"].disabled	= true;
		document.all["cbDestroy2"].disabled		= true;		
		document.all["cbTransfer2"].disabled	= true;
		document.all["cbTran"].disabled	= true;
		//970331	Howard[0971128]	若為新增模式及RadioButton被點選時	
		if (jf_GetActionMode()==LayoutModeNew || isClick)
		{
			document.all["cbSec2"].checked			= true;	
			document.all["cbNotifyUser"].checked	= true;		
		}
		cbSecOnclick();
		//document.all[strObjName+"2"].checked = (document.all[strObjName].checked);	
		//document.all["cbNotifyUser"].checked	= true;		
		//95.09.29 David
		//Marked by Cola 已由server端帶出值，因此不需再由js端給checked (2008.08.04)
		//document.all["rbSecNo_5"].checked			= true;	//全部密件
		//1090214 Cloud	1090040 調整設定時機，修正降解密密等可選全部/普通問題
		SetInfoText(false);
		document.all["rbSecNo_0"].disabled			= true;
		document.all["rbSecNo_6"].disabled			= true;
		
		//1041113	Cloud	1040921	(merge)1010877新增清理處置項目，僅於"銷毀"及"鑑定"時使用
		document.all["cbClearProc"].checked		= false;
		document.all["cbClearProc"].disabled	= true;
		document.all["dlClearProc"].disabled	= true;
	    //1050125 cloud [1040846] (MERGE)增加電子檔案無法修復銷毀選項-清理範圍輸入欄位選擇其他類別時需可使用
		//1090214 Cloud	1090040 調整設定時機，修正降解密密等可選全部/普通問題
		//SetInfoText(false);
	    // 2019.06.06   Cloud   1080454 修改僅降解密可使用承辦單位條件
		document.all["dlDept"].disabled = false;
		document.all["dlDept"].selectedIndex = tempdldeptIndex;
		//1070627 Cloud 1070201 修正復原銷毀單位啟用停用行為
		document.all["dlDestroyUnit"].className = "displayOnly";
		document.all["dlDestroyUnit"].disabled = true;
		SetInfoText(false);
	    //1070627 Cloud 1070201 控制保存年限選項
		fnSetKeepYear(false);
	}
	//else if (strObjName == "rbPlanType_2")//銷毀
	//1041113	Cloud	1040921	(merge)1010877新增"鑑定"清理項目之UI邏輯(主要項目均與"銷毀"相同，故寫在同一段落)
	//else if(document.all["rbPlanType_2"].checked)
	else if((document.all["rbPlanType_2"].checked) || (document.all["rbPlanType_5"].checked))//rbPlanType_5：鑑定
	{	
		document.all["txDBaseDate0"].className	= "displayOnly";
		document.all["txDBaseDate0"].disabled	= true;
		document.all["txDBaseDate"].className	= "InputFieldText";		//1041113	Cloud	1040921	(merge)1010877一併修正顯示樣式，"" → "InputFieldText"
		document.all["txDBaseDate"].disabled	= false;
		document.all["txDBaseDate2"].className	= "displayOnly";
		document.all["txDBaseDate2"].disabled	= true;
		
		document.all["cbDestroy2"].disabled		= false;
		document.all["cbUnRecovery"].disabled	= false;
		//document.all["dlDestroyUnit"].disabled	= false;
		
		//document.all["dlDestroyUnit"].className	= "";
		document.all["dlNotify"].className		= "displayOnly";		
		
		document.all["dlNotify"].disabled		= true;
		document.all["cbSec2"].disabled			= true;
		//980331	Howard[0971128]	無解密日期之案件檢核	
		document.all["cbSec3"].disabled			= true;	
		//980331	Howard[0971128]	針對銷毀案件保存年限視為Enable	
		SetKeepYearDisable(false);
		
		document.all["cbReposited2"].disabled	= true;
		document.all["cbFileUpd"].disabled		= true;		
		document.all["cbNotifyUser"].disabled	= true;		
		document.all["cbTransfer2"].disabled	= true;
		document.all["cbTran"].disabled	= true;
		//970331	Howard[0971128]	若為新增模式及RadioButton被點選時	
		if (jf_GetActionMode()==LayoutModeNew || isClick)
		{
			//* 2020.07.21	CLOUD	1090519	修改移轉公文可產生鑑定批號-選擇鑑定不做預設
			if (!document.all["rbPlanType_5"].checked)
			{
			document.all["rbSecNo_0"]	.checked		= true;
			document.all["cbDestroy2"].checked		= true;	
		}
		}
		//document.all[strObjName+"2"].checked = (document.all[strObjName].checked);		
		//Marked by Cola 已由server端帶出值，因此不需再由js端給checked (2008.08.04)
		//document.all["rbSecNo_0"].checked			= true;	//普通
		//1090214 cloud [1090040] 調整叫用時機，銷毀密等應只能選擇普通，移至設定密等條件前
		SetInfoText(false);
		SetOtherSecCheckBox(true);
		
		//1041113	Cloud	1040921	(merge)1010877新增鑑定相關選項
		if(document.all["rbPlanType_5"].checked)
		{
			document.all["cbClearProc"].className	= "hide";
			document.all["cbClearProc"].disabled	= false;
			document.all["cbClearProc"].checked		= true;
			document.all["dlClearProc"].selectedIndex = 1;
			document.all["dlClearProc"].disabled	= true;
			//* 2020.07.21	CLOUD	1090519	修改移轉公文可產生鑑定批號
			document.all["cbTransfer2"].disabled = false;
			document.all["txDBaseDate2"].className = "InputFieldText";
			document.all["txDBaseDate2"].disabled = false;
		}
		else
		{
			document.all["cbClearProc"].disabled	= false;
			document.all["cbClearProc"].className	= "InputFieldText";
			document.all["dlClearProc"].disabled	= false;			
		}
	    //1050125 cloud [1040846] (MERGE)增加電子檔案無法修復銷毀選項-清理範圍輸入欄位選擇其他類別時需可使用
		//1090214 cloud [1090040] 調整叫用時機，銷毀密等應只能選擇普通，移至設定密等條件前
		//SetInfoText(false);
		if(document.all["rbPlanType_5"].checked)
		{
			document.all["rbSecNo_6"].disabled		= false;
			document.all["rbSecNo_6"].checked		= true;
			document.all["rbSecNo_0"].disabled		= true;
		}
		//1090214 Cloud	[1090040] 修改選擇鑑定時密等條件可選擇全部-E
		//1070627 Cloud 1070201 修正復原銷毀單位啟用停用行為
		document.all["dlDestroyUnit"].className = "";
		document.all["dlDestroyUnit"].disabled = false;
		SetInfoText(false);
		
	}
	//else if (strObjName == "rbPlanType_3")//移轉
	else if(document.all["rbPlanType_3"].checked)
	{
		document.all["txDBaseDate0"].className	= "displayOnly";
		document.all["txDBaseDate0"].disabled	= true;
		document.all["txDBaseDate"].className	= "displayOnly";
		document.all["txDBaseDate"].disabled	= true;
		document.all["txDBaseDate2"].className	= "InputFieldText";		//1041113	Cloud	1040921	(merge)1010877一併修正顯示樣式，"" → "InputFieldText"
		document.all["txDBaseDate2"].disabled	= false;
		
		document.all["cbTransfer2"].disabled	= false;
		
		document.all["dlNotify"].className		= "InputFieldText";		//1041113	Cloud	1040921	(merge)1010877一併修正顯示樣式，"" → "InputFieldText"
		//document.all["dlDestroyUnit"].className	= "";
		
		document.all["dlNotify"].disabled		= true;
		//document.all["dlDestroyUnit"].disabled	= true;
		document.all["cbDestroy2"].disabled		= true;
		document.all["cbUnRecovery"].disabled	= true;		
		document.all["cbSec2"].disabled			= true;
		//980331 Howard[0971128]  無解密日期之案件檢核及保存年限	
		document.all["cbSec3"].disabled			= true;	
		//980331	Howard[0971128]	修正移轉公文僅取得keepyear=99之公文，將保存年限設為disable
		SetKeepYearDisable(true);
		
		document.all["cbReposited2"].disabled	= true;
		document.all["cbFileUpd"].disabled		= true;		
		document.all["cbNotifyUser"].disabled	= true;		
		document.all["cbUnRecovery"].disabled	= true;
		//970331	Howard[0971128]	若為新增模式及RadioButton被點選時			
		if (jf_GetActionMode()==LayoutModeNew || isClick)
			document.all["cbTransfer2"].checked		= true;	
		//document.all[strObjName+"2"].checked = (document.all[strObjName].checked);			
		//95.09.29 David
		//Marked by Cola 已由server端帶出值，因此不需再由js端給checked (2008.08.04)
		//document.all["rbSecNo_6"].checked			= true;	//全部
		
		//1041113	Cloud	1040921	(merge)1010877新增清理處置項目，僅於"銷毀"及"鑑定"時使用
		document.all["cbClearProc"].checked		= false;
		document.all["cbClearProc"].disabled	= true;
		document.all["dlClearProc"].disabled	= true;
 		//1050125 cloud [1040846] (MERGE)增加電子檔案無法修復銷毀選項-清理範圍輸入欄位選擇其他類別時需可使用
	    //1070627 Cloud 1070201 修正復原銷毀單位啟用停用行為
		document.all["dlDestroyUnit"].className = "displayOnly";
		document.all["dlDestroyUnit"].disabled = true;
 		//1050125 cloud [1040846] (MERGE)增加電子檔案無法修復銷毀選項-清理範圍輸入欄位選擇其他類別時需可使用
		SetInfoText(false);
		//1070627 Cloud 1070201 控制保存年限選項
		fnSetKeepYear(false);
	}
	//else if (strObjName == "rbPlanType_4")//移交
	else if(document.all["rbPlanType_4"].checked)
	{
		document.all["txDBaseDate0"].className	= "displayOnly";
		document.all["txDBaseDate0"].disabled	= true;
		document.all["txDBaseDate"].className	= "displayOnly";
		document.all["txDBaseDate"].disabled	= true;
		document.all["txDBaseDate2"].className	= "displayOnly";
		document.all["txDBaseDate2"].disabled	= true;
		
		document.all["cbTran"].disabled	= false;
		
		document.all["dlNotify"].className		= "displayOnly";
		//document.all["dlDestroyUnit"].className	= "displayOnly";
		
		document.all["dlNotify"].disabled		= true;
		//document.all["dlDestroyUnit"].disabled	= true;
		document.all["cbTransfer2"].disabled	= true;		
		document.all["cbDestroy2"].disabled		= true;
		document.all["cbUnRecovery"].disabled	= true;		
		document.all["cbSec2"].disabled			= true;
		//980331 Howard[0971128]  無解密日期之案件檢核	
		document.all["cbSec3"].disabled			= true;	
		//980331	Howard[0971128]	針對移交案件保存年限視為Enable	
		SetKeepYearDisable(false);
		
		document.all["cbReposited2"].disabled	= true;
		document.all["cbFileUpd"].disabled		= true;		
		document.all["cbNotifyUser"].disabled	= true;		
		//970331	Howard[0971128]	若為新增模式及RadioButton被點選時	
		if (jf_GetActionMode()==LayoutModeNew || isClick)
			document.all["cbTran"].checked			= true;			
		//95.09.29 David
		//Marked by Cola 已由server端帶出值，因此不需再由js端給checked (2008.08.04)
		//document.all["rbSecNo_6"].checked			= true;	//全部
		
		//1041113	Cloud	1040921	(merge)1010877新增清理處置項目，僅於"銷毀"及"鑑定"時使用
		document.all["cbClearProc"].checked		= false;
		document.all["cbClearProc"].disabled	= true;
		document.all["dlClearProc"].disabled	= true;
		//1050125 cloud [1040846] (MERGE)增加電子檔案無法修復銷毀選項-清理範圍輸入欄位選擇其他類別時需可使用
		//1070627 Cloud 1070201 修正復原銷毀單位啟用停用行為
		document.all["dlDestroyUnit"].className = "displayOnly";
		document.all["dlDestroyUnit"].disabled = true;
		SetInfoText(false);
		//1070627 Cloud 1070201 控制保存年限選項
		fnSetKeepYear(false);
	}
	//1050125 cloud [1040846] (MERGE)增加電子檔案無法修復銷毀選項-清理範圍輸入欄位一率不可使用
	else if (document.all["rbPlanType_6"].checked)
	{
	    document.all["txDBaseDate0"].className = "displayOnly";
	    document.all["txDBaseDate0"].disabled = true;
	    document.all["txDBaseDate"].className = "displayOnly";
	    document.all["txDBaseDate"].disabled = true;
	    document.all["txDBaseDate2"].className = "displayOnly";
	    document.all["txDBaseDate2"].disabled = true;
	    document.all["dlNotify"].className = "displayOnly";
	    document.all["dlNotify"].disabled = true;
	    document.all["cbSec2"].disabled = true;
	    document.all["cbSec3"].disabled = true;
	    SetKeepYearDisable(false);
	    document.all["cbNotifyUser"].disabled = true;
	    document.all["cbDestroy2"].disabled = true;
	    document.all["cbTransfer2"].disabled = true;
	    document.all["cbTran"].disabled = true;
        document.all["cbReposited2"].checked = false;
	    document.all["cbClearProc"].checked = false;
	    document.all["cbClearProc"].disabled = true;
	    document.all["dlClearProc"].disabled = true;

	    SetInfoText(true);
	    
	    document.all["cbFileUpd"].disabled = true;
	    document.all["cbUnRecovery"].disabled = true;
	    document.all["dlDestroyUnit"].disabled = true;
	    document.all["cbReposited2"].disabled = true;
		//1090214 Cloud	[1090040] 一併修改預設密等為全部
		document.all["rbSecNo_6"].checked			= true;	//全部
		//1070627 Cloud 1070201 控制保存年限選項
	    fnSetKeepYear(false);
	    
	    
	}
}
//1050125 Cloud [1040846] (MERGE)增加fn設定基本資條件範圍設定
function SetInfoText(argNoUse) {
    document.all["txYearS"].disabled = argNoUse;
    document.all["txYearE"].disabled = argNoUse;
    document.all["txClsS"].disabled = argNoUse;
    document.all["txClsE"].disabled = argNoUse;
    document.all["txCaseS"].disabled = argNoUse;
    document.all["txCaseE"].disabled = argNoUse;
    document.all["txVolS"].disabled = argNoUse;
    document.all["txVolE"].disabled = argNoUse;
    // 2019.06.06   Cloud   1080454 修改僅降解密可使用承辦單位條件
    //document.all["dlDept"].disabled = argNoUse;
    document.all["txKeepYearS"].disabled = argNoUse;
    document.all["txKeepYearE"].disabled = argNoUse;
    document.all["txStockNoS"].disabled = argNoUse;
    document.all["txStockNoE"].disabled = argNoUse;
    document.all["txStoreNo"].disabled = argNoUse;
    document.all["rbSecNo_0"].disabled = argNoUse;
    document.all["rbSecNo_1"].disabled = argNoUse;
    document.all["rbSecNo_2"].disabled = argNoUse;
    document.all["rbSecNo_3"].disabled = argNoUse;
    document.all["rbSecNo_4"].disabled = argNoUse;
    document.all["rbSecNo_5"].disabled = argNoUse;
    document.all["rbDocFileType_0"].disabled = argNoUse;
    document.all["rbDocFileType_1"].disabled = argNoUse;
    document.all["rbDocFileType_2"].disabled = argNoUse;
    document.all["rbDocFileType_3"].disabled = argNoUse;
    document.all["txSourceOrgName"].disabled = argNoUse;
    document.all["txCrtDateS"].disabled = argNoUse;
    document.all["txCrtDateE"].disabled = argNoUse;
}

//判斷檔號起訖的合理性
function CheckFileNoRange(argStr)
{
	var JCls	= 0;	//0:兩者為空,1:其中一個為空,2:不相等,3:相等
	var JCase	= 0;
	var JVol	= 0;
	var JSeq	= 0;
	var jBool	= true;
	
	
	/*if(document.all["txSeqS"].value != "" && document.all["txSeqE"].value != "")
	{
		if(document.all["txSeqS"].value != document.all["txSeqE"].value )
			JSeq = 2;
		else
			JSeq = 3;
	}
	else if(document.all["txSeqS"].value != "" || document.all["txSeqE"].value != "")
		JSeq = 1;*/
	//////////////////////////////////////////目次
	if(document.all["txVolS"].value != "" && document.all["txVolE"].value != "")
	{
		if(document.all["txVolS"].value != document.all["txVolE"].value )
			JVol = 2;
		else
			JVol = 3;
	}
	else if(document.all["txVolS"].value != "" || document.all["txVolE"].value != "")
		JVol = 1;
	//////////////////////////////////////////卷次
	if(document.all["txCaseS"].value != "" && document.all["txCaseE"].value != "")
	{
		if(document.all["txCaseS"].value != document.all["txCaseE"].value )
			JCase = 2;
		else
			JCase = 3;
	}
	else if(document.all["txCaseS"].value != "" || document.all["txCaseE"].value != "")
		JCase = 1;
	/////////////////////////////////////////案次
	if(document.all["txClsS"].value != "" && document.all["txClsE"].value != "")
	{
		if(document.all["txClsS"].value != document.all["txClsE"].value )
			JCls = 2;
		else
			JCls = 3;
	}
	else if(document.all["txClsS"].value != "" || document.all["txClsE"].value != "")
		JCls = 1;
	/////////////////////////////////////////分類
	
	if(JSeq == 1)	//只有其中一項，視為錯誤
	{
		argStr += "目次範圍起迄值有誤\n";
		return argStr;
	}
	
	if(JVol == 1)	//只有其中一項，視為錯誤
	{
		argStr += "卷次範圍起迄值有誤\n";
		return argStr;
	}
	
	if(JCase == 1)	//只有其中一項，視為錯誤
	{
		argStr += "案次號範圍起迄值有誤\n";
		return argStr;
	}
	
	if(JCls == 1)	//只有其中一項，視為錯誤
	{
		argStr += "分類號範圍起迄值有誤\n";
		return argStr;
	}
	
	/////////////////////////////////////95.08.15
	//1141013	Cloud	1141137	外貿條件特殊，修改查詢前檢核條件
	if (document.all["OrgNickName"].value == "TAITRA") {
		if (document.all["txCountryCodeS"].value + document.all["txOfficeCodeS"].value + document.all["txProductCodeS"].value != "" &&
			document.all["txCountryCodeE"].value + document.all["txOfficeCodeE"].value + document.all["txProductCodeE"].value != "" && (document.all["txVolS"].value == "" || document.all["txVolE"].value == "")) {
			argStr += "進行起訖查詢時，卷次號不可為空白。\n";
			jBool = true;
			return argStr;
		}
	}
	else {
		if (JSeq == 2)	//目次不相等
		{
			jBool = false;
			if (JVol != 3)	//若卷次不為相等的情況則提示錯誤訊息
			{
				argStr += "卷次號範圍需相同\n";
				jBool = true;
				return argStr;
			}

			if (JCase != 3)	//若案次不為相等的情況則提示錯誤訊息
			{
				argStr += "案次號範圍需相同\n";
				jBool = true;
				return argStr;
			}

			if (JCls != 3) {
				argStr += "分類號範圍需相同\n";
				jBool = true;
				return argStr;
			}

			/*if(!jBool)
			{
				argStr += "目次號範圍需相同\n";			
				return argStr;						
			}*/
		}

		if (JSeq == 0 || JSeq == 3)	//目次為空白，則往上檢查卷次號
		{
			if (JVol == 2)	//卷次不相等
			{
				jBool = false;
				if (JCase != 3)	//若案次不為相等的情況則提示錯誤訊息
				{
					argStr += "案次號範圍需相同\n";
					jBool = true;
					return argStr;
				}

				if (JCls != 3) {
					argStr += "分類號範圍需相同\n";
					jBool = true;
					return argStr;
				}

				if (!jBool && JSeq != 0) {
					argStr += "卷次號範圍需相同\n";
					return argStr;
				}
			}

			if (JVol == 0)	//若卷次為空白，則往上檢查案次號
			{
				if (JCase == 2)	//若案次不相等，則往上檢查分類號
				{
					jBool = false;
					if (JCls != 3) {
						argStr += "分類號範圍需相同\n";
						jBool = true;
						return argStr;
					}

					if (jBool) {
						argStr += "案次號範圍需相同\n";
						return argStr;
					}
				}
			}

			if (JVol == 3)	//卷次相等，往上檢核案次以及分類是否相等
			{
				if (JCase != 3) {
					argStr += "案次號範圍需相同\n";
					return argStr;
				}

				if (JCls != 3) {
					argStr += "分類號範圍需相同\n";
					return argStr;
				}
			}
		}
	}
	
	return argStr;
}

function CallPadFunc(strObjName)
{	
	switch(strObjName)
	{		
		case "txYearS":						
		case "txYearE":
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,3,"0");
			break;		
	}	
}

function CheckPlanNo()
{
	if(!jf_CheckDataExist("") && document.all["txPlanNo"].value != "")
	{		
		Page_BlockSubmit = false;
		alert("此清理批號不存在");	
		//1060602	Kevin_C	1050087	升二代
		//document.all["txPlanNo"].focus();
		$('txPlanNo').focus();
	}
}

function GetStoreNoFromDL()
{
	var DLcount = document.all["dlStoreNo"].length;
	var tempStr = "";
	
	for(i=0;i<DLcount;i++)
	{
		tempStr += document.all["dlStoreNo"].options[i].value;	
		tempStr += ";";	
	}
//jj 庫房名稱 已帶入 此行無效。
// 	document.all["txStoreNo"].value = tempStr;
}

function CheckBeforeSave()
{
	var OKCount = 0;
	if(document.all["txPlanNo"].value != "")
		OKCount++;
	if(document.all["txPlanDesc"].value != "")
		OKCount++;
	if(document.all["txYearS"].value != "")
		OKCount++;
	if(document.all["txYearE"].value != "")
		OKCount++;
	if(document.all["txClsS"].value != "")
		OKCount++;
	if(document.all["txClsE"].value != "")
		OKCount++;
	if(document.all["txCaseS"].value != "")
		OKCount++;
	if(document.all["txCaseE"].value != "")
		OKCount++;
	if(document.all["txVolS"].value != "")
		OKCount++;
	if(document.all["txVolE"].value != "")
		OKCount++;
	if(document.all["txKeepYearS"].value != "")
		OKCount++;
	if(document.all["txKeepYearE"].value != "")
		OKCount++;
	if(document.all["txSourceOrgName"].value != "")
		OKCount++;	
		
	if(document.all["txCrtDateS"].value != "")
		OKCount++;	
	if(document.all["txCrtDateE"].value != "")
		OKCount++;	
	if(document.all["txDBaseDate0"].value != "")
		OKCount++;	
	if(document.all["txDBaseDate"].value != "")
		OKCount++;	
	if(document.all["txDBaseDate2"].value != "")
		OKCount++;
	
	if(OKCount == 0)
	{
		alert("未輸入明細資料，請確認");
		return false;
	}
	else
	 return true;
}

var ws_OrgID = "";
function CheckOrgNo()
{	
	var param = new Array(2);
	param[0] = document.all["txOrgNo"].value;
	param[1] = document.all["txSourceOrgName"].value;
	if(param[1] != "")
	{
		var callObj_Org = jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, param); //使用WebService前必須先呼叫一次
		ws_OrgID = callObj_Org.id;
		OnWSResult(callObj_Org);
	}
	else
		document.all["txSourceOrgName"].value = "";
}

// jj 960117 輸入庫房代碼時 帶出庫房名稱

function GetStroeName()
{	
	var EmptyMsg = "";
	document.all["txStoreName"].value = "";
	
	if(document.all["txStoreNo"].value != "")
	{
	    //* 2019.08.14  Cloud   1080623     修改ws_GetStoreInfo增加支援傳入帳號調整訊息
	    //var param = new Array(2);
	    var param = new Array(3);
		var tempstr = document.all.txStoreNo.value.split(";");
		
		for(var i = 0 ; i < tempstr.length ; i++)
		{
			if (tempstr[i] == "")
				continue;
			param[0] = document.all["txOrgNo"].value;
			param[1] = tempstr[i];
		    //* 2019.08.14  Cloud   1080623     修改ws_GetStoreInfo增加支援傳入帳號調整訊息
		    //var callObj_Store = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetStoreInfo", false, param);
			param[2] = document.all["h_username"].value;

			var callObj_Store = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetStoreInfobyUser", false, param);
		
			if(callObj_Store.value.RtnField0 != "")
			{
				if(document.all["txStoreName"].value == "")
					document.all["txStoreName"].value = callObj_Store.value.RtnField0 ;
				else
					document.all["txStoreName"].value += ";" + callObj_Store.value.RtnField0 ;
			}
			else
			{
				if(EmptyMsg == "")
					EmptyMsg = tempstr[i] ;
				else	
					EmptyMsg += ";" + tempstr[i] ;
			}
		}
	}
	else
		document.all["txStoreName"].value = "";
		
	if(EmptyMsg != "" )
	{
		//1060602	Kevin_C	1050087	升二代
		//document.all["txStoreNo"].focus();
		$('txStoreNo').focus();
		document.all["txStoreName"].value = "";
	    //* 2019.08.14  Cloud   1080623     修改ws_GetStoreInfo增加支援傳入帳號調整訊息以及清除
		//alert("該庫房代碼不存在 ：" + EmptyMsg );
		document.all["txStoreNo"].value = "";
	    alert("該庫房代碼不存在或無管理權限 ：" + EmptyMsg );
	}
}
//* 1111215      Cloud   1110860 修改個人檔不支援使用-s
function CheckCLS(argID)
{
    if (document.all[argID].value == "11") {
        alert('個人檔資料無法使用年度作業，請重新輸入分類號。');
        document.all[argID].value = "";
    }
}
//* 1111215      Cloud   1110860 修改個人檔不支援使用-e
// 2023.03.07   Cloud      1070201 新增支援單文銷毀功能-S
function fnSetKeepYear(argType) {
    var Mode = document.all["dlDestroyUnit"].options[document.all["dlDestroyUnit"].selectedIndex].value;
    if (document.all["rbPlanType_5"].checked)//鑑定時不可選擇件
    {
        if (Mode == '3')
        {
            alert('僅制定銷毀計畫時，銷毀單位可選擇[件]。');
            document.all["dlDestroyUnit"].selectedIndex = 0;
            return;
        }
    }
    if (Mode != '3' || argType==false)
    {
        document.all["ckY1"].disabled = true;
        document.all["ckY3"].disabled = true;
        document.all["ckY5"].disabled = true;
        document.all["ckY20"].disabled = true;
        document.all["ckY15"].disabled = true;
        document.all["ckY25"].disabled = true;
        document.all["ckY30"].disabled = true;
        document.all["ckY10"].disabled = true;
        document.all["ckY25"].checked = false;
        document.all["ckY15"].checked = false;
        document.all["ckY20"].checked = false;
        document.all["ckY5"].checked = false;
        document.all["ckY3"].checked = false;
        document.all["ckY1"].checked = false;
        document.all["ckY10"].checked = false;
		if(argType==false)
        document.all["dlDestroyUnit"].selectedIndex = 0;
    }
    else
    {
        document.all["ckY1"].disabled = false;
        document.all["ckY3"].disabled = false;
        document.all["ckY5"].disabled = false;
        document.all["ckY20"].disabled = false;
        document.all["ckY15"].disabled = false;
        document.all["ckY25"].disabled = false;
        document.all["ckY30"].disabled = false;
        document.all["ckY10"].disabled = false;
    }
}
// 2023.03.07   Cloud      1070201 新增支援單文銷毀功能-E
//* 2025.10.13	Cloud	1141137	修改支援外貿三欄位
function TbOnBlur(argTb) {

	//國別
	if (argTb == "txCountryCodeS") {
		if (jf_Trim(document.all["txCountryCodeS"].value) == "")
			return;
		else
			document.all["txCountryCodeS"].value = jf_PADR(document.all["txCountryCodeS"].value, 3, '0');
	}
	if (argTb == "txCountryCodeE") {
		if (jf_Trim(document.all["txCountryCodeE"].value) == "")
			return;
		else
			document.all["txCountryCodeE"].value = jf_PADR(document.all["txCountryCodeE"].value, 3, '0');
	}
	//處別
	if (argTb == "txOfficeCodeS") {
		if (jf_Trim(document.all["txOfficeCodeS"].value) == "")
			return;
		else
			document.all["txOfficeCodeS"].value = jf_PADL(document.all["txOfficeCodeS"].value, 3, '0');
	}
	if (argTb == "txOfficeCodeE") {
		if (jf_Trim(document.all["txOfficeCodeE"].value) == "")
			return;
		else
			document.all["txOfficeCodeE"].value = jf_PADL(document.all["txOfficeCodeE"].value, 3, '0');
	}
	//細目號/產品別
	if (argTb == "txProductCodeS") {
		if (jf_Trim(document.all["txProductCodeS"].value) == "")
			return;
		else
			document.all["txProductCodeS"].value = jf_PADR(document.all["txProductCodeS"].value, 3, '0');
	}
	if (argTb == "txProductCodeE") {
		if (jf_Trim(document.all["txProductCodeE"].value) == "")
			return;
		else
			document.all["txProductCodeE"].value = jf_PADR(document.all["txProductCodeE"].value, 3, '0');
	}
	

}