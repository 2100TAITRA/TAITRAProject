
/*
DATE	SA		PRG		MGR_NO	DESC
1010103 David	kevin	1000976	新增EDR231 人民陳情案件回覆內容查詢作業 - 標檢局專用
1020828	Kevin	Erin	1020658	新增查詢條件：公文文號、收創文日、承辦單位、錄存續辦/結案，新增報表EDR231L2(報表類型為案件明細)，新增匯出excel功能(報表類型為案件明細時才可選)
1030515	David	David	1030333	新增查詢條件：錄存續辦排除已結案案件
1040316 David	Eric	1030899 新增rbDealOnblur處理日期欄位
1051227 Kevin   Zen     1051296 修正網址無法顯示問題
1120322 --      Cloud   1120211 升級二代
*/

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");
//1120322 --      Cloud   1120211 升級二代
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/


document.all.rbSave.onclick = cbExcliudCloseCtrl;
document.all.rbClose.onclick = cbExcliudCloseCtrl;
document.all.rbAllType.onclick = cbExcliudCloseCtrl;
//1040316 Eric 1030899 新增rbDeal處理日期欄位
document.all.rbDeal.onclick = cbExcliudCloseCtrl;
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	//1020828 Erin [1020658] 新增記錄combobox值 --start
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
	document.all["H_Dept"].value = "";
	document.all["H_Dept_Value"].value = "";
	dlDept_Text_onblur();
	if(document.all["H_Dept_Value"].value != "")
	{
		edjf_SetdlDept("dlDept","dlSect","","",false,false);	//初始dlSect、dlUser的處理
		//依選項多寡固定下拉式選單可見長度
		if(document.all["dlSect"].options.length > 10)
			document.all["dlSect"].size = 10;
		else if(document.all["dlSect"].options.length ==1)
			document.all["dlSect"].size = 2;
		else
			document.all["dlSect"].size = document.all["dlSect"].options.length;
	}
	dlSect_Text_onblur();
	jf_HandleComboxStatus("dlSect"); //無值不顯示
	//1020828 Erin [1020658] 新增記錄combobox值 --end
	//1021024 Erin
	rbRptType_onclick();

	//1030515 David 1030333 新增錄存續辦「排除已結案案件」控制
	cbExcliudCloseCtrl();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl()
{
    //1120322 --      Cloud   1120211 升級二代
    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btView"));
	
	var btView;
	if(xObjectName.indexOf("_btView") != "-1")
	{
		pNo = xObjectName.substring(8, xObjectName.indexOf("_btView"));	
		
		if(document.all["dg1__ctl"+pNo+"_btView"] != null)
		{
			btView = document.all["dg1__ctl"+pNo+"_btView"].id;
		}	
	}
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
	    //1120322 --      Cloud   1120211 升級二代
		//case "ibReplyDateS":
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all["txReplyDateS"], event.screenX, event.screenY);
		//	break;
		//case "ibReplyDateE":
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all["txReplyDateE"], event.screenX, event.screenY);
		//	break;
		////1020828 Erin [1020658] 新增收創文日
		//case "ibRcvDateS":
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all["txRcvDateS"], event.screenX, event.screenY);
		//	break;
		//case "ibRcvDateE":
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all["txRcvDateE"], event.screenX, event.screenY);
		//	break;
		case btView:
			Page_BlockSubmit=true;
			var strUrl = "../EDLIB/View.htm?MainName="+"dg1__ctl"+pNo+"_txReplyContent";
            //1051227 Zen 1051296 修正網址無法顯示問題，移除超連結
            var txReplyContent = document.all["dg1__ctl" + pNo + "_txReplyContent"];
            document.all["dg1__ctl" + pNo + "_txReplyContent"].value = jf_RemoveHyperlinkTag(txReplyContent.value);
			jf_OpenChildWin(strUrl, "View", 800, 600 );
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1120322 --      Cloud   1120211 升級二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;

	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
    //1120322 --      Cloud   1120211 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		case "btPrint":
		case "btPreview":
		case "btExcel":
			//1020828 Erin [1020658]
			dlDept_Text_onblur();
			dlSect_Text_onblur();
		    //1120322 --      Cloud   1120211 升級二代
		    //Page_BlockSubmit = !jf_ConfirmPrint();
			//jf_ToolBarSubmit();
		    Page_BlockSubmit = !ConfirmPrint();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/

//組出回傳值
function ReturnValue(argLink)
{
	/*
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.window.CallBack("EDR231");
	    close();
	}
	catch (e) {}
	*/
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1120322 --      Cloud   1120211 升級二代
//function jf_ConfirmPrint()
function ConfirmPrint()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if(document.all.txSuggestNoS.value=="" && document.all.txSuggestNoE.value=="") 
	{
		if(document.all.txReplyDateS.value=="" && document.all.txReplyDateE.value=="")
		{
			//jf_ShowMeg("欄位不可皆為空白。","");
			//document.all.txReplyDateS.focus();
			//return false;
			//1020903 Erin [1020658] 新增條件
			if(document.all["dlDept_Text"].value=="" && document.all["dlSect_Text"].value=="")
			{
				if(document.all["txDocNoS"].value=="" && document.all["txDocNoE"].value=="")
				{
					if(document.all["txRcvDateS"].value=="" && document.all["txRcvDateE"].value=="")
					{
						jf_ShowMeg("欄位不可皆為空白。","");
						document.all.txReplyDateS.focus();
						return false;
					}
				}
			}
		}
	}
	
	if(!jf_CheckMonth("txReplyDateS"))
		return false;
	if(!jf_CheckMonth("txReplyDateE"))
		return false;
	//1020903 Erin [1020658] 新增檢查收創文日期
	if(!jf_CheckMonth("txRcvDateS"))
		return false;
	if(!jf_CheckMonth("txRcvDateE"))
		return false;
		
	return bRtnbool;
}

//列印月份欄位Onblur時，自動補0以及檢查列印月份欄位是否符合格式
function jf_CheckMonth(argDate)
{
	var bCheckD = true;
	var strDate = jf_Trim(document.all[argDate].value);
	if(strDate != "")
	{
		if(strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,"0");
			document.all[argDate].value = strDate;
		}
		if(!jf_CheckCDATE(strDate))
		{
			document.all[argDate].value = "";
			document.all[argDate].focus();
			bCheckD = false;
			alert("輸入的日期格式錯誤，請重新輸入");
		}
	}
	return bCheckD;
}
//1020828 Erin [1020658] 新增以下function for combobox --start
function dlDept_Text_onblur()
{
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
	{
		//呼叫ED_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
			
			var bSubTree = true;
			if(document.all["H_OD_FLOW_TYPE"].value == "2")
				bSubTree = false;
			//先顯示二級單位選項 避免隱藏不調整
			document.all["dlSect_Container"].className = "InputFieldText";
			edjf_SetdlDept("dlDept","dlSect","","",false,false);	//初始dlSect、dlUser的處理

			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
			
			//依選項多寡固定下拉式選單可見長度
			if(document.all["dlSect"].options.length > 10)
				document.all["dlSect"].size = 10;
			else if(document.all["dlSect"].options.length ==1)
				document.all["dlSect"].size = 2;
			else
				document.all["dlSect"].size = document.all["dlSect"].options.length;
				
			//無值不顯示
			jf_HandleComboxStatus("dlSect");
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}
function dlSect_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
	{
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}
//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
		document.all[argComboxID+"_Container"].className = "InputFieldText";
}
//1020828 Erin [1020658] 新增以下function for combobox --end
//1020904 Erin [1020658] 處理radio button onchange
function rbRptType_onclick()
{	
	if(document.all["rbNew"].checked)
	{
		for(var i = 0; i <document.all["tbTool"].numItems;i++) //選擇新報表，可匯出excel
		{
			if(document.all.tbTool.getItem(i).getAttribute("ID") == "btExcel")
				document.all.tbTool.getItem(i).setAttribute("disabled",false);
		}
	}
	if(document.all["rbOrg"].checked)
	{
		for(var i = 0; i <document.all["tbTool"].numItems;i++)
		{
			if(document.all.tbTool.getItem(i).getAttribute("ID") == "btExcel")
				document.all.tbTool.getItem(i).setAttribute("disabled",true);
		}
	}
}

//1030515 David 1030333 新增錄存續辦「排除已結案案件」控制
function cbExcliudCloseCtrl()
{
	if(document.all.rbSave.checked == true)
	{
		document.all.cbExcludeClose.disabled = false;
	}
	else
	{
		document.all.cbExcludeClose.checked = false;
		document.all.cbExcludeClose.disabled = true;
	}
	//1040316 Eric 1030899 新增rbDeal處理日期欄位
	if(document.all["rbDeal"].checked)
	{
		document.all["txReplyDateS"].disabled = true;
		document.all["txReplyDateE"].disabled = true;
	}
	else
	{
		document.all["txReplyDateS"].disabled = false;
		document.all["txReplyDateE"].disabled = false;
	}
}

//1051227 Zen 1051296 修正網址無法顯示問題，移除超連結
function jf_RemoveHyperlinkTag(argReplyContent)
{
    var nBegin = argReplyContent.indexOf('<A');
    var nEnd = argReplyContent.indexOf('>', nBegin);

    argReplyContent = argReplyContent.substring(0, nBegin) + argReplyContent.substring(nEnd + 1, argReplyContent.length);

    if (argReplyContent.indexOf('<A') != -1)
        argReplyContent = jf_RemoveHyperlinkTag(argReplyContent);

    return argReplyContent.replace(/\<\/A\>/g, '');
}