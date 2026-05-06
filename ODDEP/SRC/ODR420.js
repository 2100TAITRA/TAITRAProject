/*
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 96.03.15		Shelly	960069	修改逾期天數輸入
 * 97.01.07     Iris    --      公文類型至少勾選一種
 * 97.04.03  	Iris	000985	新增稽催日期查詢
 * 98.09.28  	David   0980391 查詢條件及報表支援二層級架構
 *100.10.03  	Ken     1000600 新增匯出Excel 
 *105.05.19		Joe		1050087	二代系統升級
 *1100723	    Joe		1100575	高雄大學新增列印模式
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050519	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050519	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
	// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		//1050519	Joe	1050087	二代系統升級
/* 		case "ibDue1":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txSDate1, event.screenX, event.screenY);
			break;
		}		
		case "ibDue2":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txEDate1, event.screenX, event.screenY);
			break;
		} */
		/*
		case "":
			break;
		*/
	}	
}

//1050519	Joe	1050087	二代系統升級，傳入參數event
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050519	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			if(UnEmpty())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
			if (document.all.cbCoworkMain && document.all.cbCoworkHelp)
			{
				if (document.all.cbCoworkMain.checked==false && document.all.cbCoworkHelp.checked==false)
				{
						alert('請至少勾選主辦或會辦之稽核公文類型');
						return;
				}
			}
			adjust();
			//1050519	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		//100.10.03   Ken   1000600 新增匯出Excel功能
		case "btExcel":
			if(UnEmpty())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
			if (document.all.cbCoworkMain && document.all.cbCoworkHelp)
			{
				if (document.all.cbCoworkMain.checked==false && document.all.cbCoworkHelp.checked==false)
				{
						alert('請至少勾選主辦或會辦之稽核公文類型');
						return;
				}
			}
			adjust();
			//1050519	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	ShowMsg();
	
	//0980928 David 0980391 初始時先儲存下拉式選單的Text、Value、所有選項Value
	document.all["H_Dept_Text"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect_Text"].value = document.all["dlSect_Text"].value;
	document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept_Text"].value);
	document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Text"].value);
	document.all["H_Sect_AllValue"].value = odjf_SaveCurrDL(document.all["dlSect"]);
	
	//無值不顯示
	jf_HandleComboxStatus("dlSect");
	//1100723   Joe 1100575   新增列印模式、承辦人選單
	RptTypeChg();
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].textContent = obj.value;
}

//問題單號：950307(N) 次數：1 修改人：FERDY 日期：950516 區塊編號：01 END
//內容：1.逾期天數不可皆為空白
function UnEmpty()
{	
	//1100723	Joe		1100575		新增承辦人選單檢核必須選承辦單位
	var strErr = "";
	var strSDay = "";
	var strEDay = "";
	if(jf_Trim(document.all["divBehind1"].className)=="")
	{
		strSDay = jf_Trim(document.all["txSDay"].value);
		strEDay = jf_Trim(document.all["txEDay"].value);
	}
	else
	{
		strSDay = jf_Trim(document.all["txBehind"].value);
	}
	
	if (strSDay + strEDay == "")
	{
		if(jf_Trim(document.all["divBehind1"].className)=="")
			//1050519	Joe	1050087	二代系統升級
			//document.all["txSDay"].focus();
			$('#txSDay').focus();
		else
			//1050519	Joe	1050087	二代系統升級
			//document.all["txBehind"].focus();
			$('#txBehind').focus();
		//1100723	Joe		1100575		新增承辦人選單檢核必須選承辦單位並調整錯誤訊息處理方式--S
		strErr += "逾期天數不可為空白\n";
		//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["逾期天數不可為空白"])),"");
		//return false;
	}

	if (document.all["rbUser"].checked == true && document.all["H_Dept_Value"].value == "")
		strErr += "承辦單位不可為空白\n"

	if (strErr != "") {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErr])),"");
		return false;
	}
	//1100723	Joe		1100575		新增承辦人選單檢核必須選承辦單位並調整錯誤訊息處理方式--E
	
	if(!jf_CheckBeforeSearch())
		return false;
	return true;
}
function CheckDate(id,str)
{
	var strDateValue ;
	strDateValue = document.all[id].value;
	if (strDateValue == "")
	{  
	return;
	}
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all[id].value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([str])),"");
		document.all[id].focus();
		//1050519	Joe	1050087	二代系統升級
		//document.all[id].focus();
		$('#' + id).focus();
	}
}
function adjust()
{
	var strS = jf_Trim(document.all.txSDate1.value);
	var strE = jf_Trim(document.all.txEDate1.value);
	if(strS != "" && strE == "")
		document.all.txEDate1.value = strS;
	else if(strS == "" && strE != "")
		document.all.txSDate1.value = strE;
	else if(strS > strE)
	{
		document.all.txSDate1.value = strE;
		document.all.txEDate1.value = strS;
	}
	
}

//0980928 David 0980391 查詢前檢查
function jf_CheckBeforeSearch()
{
	if(!dlDept_onblur(true))
		return false;

	if(!dlSect_onblur(true))
		return false;

    return true;
}

//0980928 David 0980391 設定二級單位下拉選單
function dlDept_onblur(argDLObj)
{	
	var bCheckOK = true;
	if(document.all["dlDept_Text"].value != document.all["H_Dept_Text"].value)
	{
		//呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept_Text"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept_Text"].value);
			
			var bSubTree = true;
			if(document.all["OdFlowType"].value == "2")
				bSubTree = false;
			//1100723		Joe			1100575		新增承辦人下拉選單
			//odjf_SetdlDept("dlDept","dlSect","","",bSubTree,true);	//初始dlSect的處理
			odjf_SetdlDept("dlDept", "dlSect", "dlUser", "", bSubTree, true);	//初始dlSect的處理
			document.all["H_Sect_Text"].value = document.all["dlSect_Text"].value;
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Text"].value);
			
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_Sect_AllValue"].value = odjf_SaveCurrDL(document.all["dlSect"]);
			
			
			//依選項多寡固定下拉式選單可見長度
			if(document.all["dlSect"].options.length > 10)
				document.all["dlSect"].size = 10;
			else if(document.all["dlSect"].options.length ==1)
				document.all["dlSect"].size = 2;
			else
				document.all["dlSect"].size = document.all["dlSect"].options.length;


			//1100723		Joe			1100575		新增承辦人下拉選單--S
			//存ComboBox_Text的value
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlUser的處理
			document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);
			//依選項多寡固定下拉式選單可見長度
			if (document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if (document.all["dlUser"].options.length == 1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
			//1100723		Joe			1100575		新增承辦人下拉選單--E

			//無值不顯示
			jf_HandleComboxStatus("dlSect");
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//0980928	David	0980391 二級單位下拉選單onBlur
function dlSect_onblur(argDLObj)
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlSect_Text"].value != document.all["H_Sect_Text"].value)
	{
		//呼叫OD_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect_Text"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect_Text"].value);


			//1100723		Joe			1100575		新增承辦人下拉選單--S
			odjf_SetdlSect("dlDept", "dlSect", "dlUser", "", false);
			//存ComboBox_Text的value
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlUser的處理
			document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);
			//依選項多寡固定下拉式選單可見長度。
			if (document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if (document.all["dlUser"].options.length == 1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
			//1100723		Joe			1100575		新增承辦人下拉選單--E
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}


//0980928	David	0980391 無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
		//1050519	Joe	1050087	二代系統升級
		//document.all[argComboxID+"_Container"].className = "InputFieldText";
		document.all[argComboxID+"_Container"].className = "custom-combobox";
}

//1100723   Joe 1100575   新增列印模式、承辦人選單
function RptTypeChg() {
	if (document.all.rbDept.checked){
		document.all["dlUser_Container"].className = "hide";
		document.all["lbUser"].className = "hide";
	}
	else{
		document.all["dlUser_Container"].className = "custom-combobox";
		document.all["lbUser"].className = "";
	}
}

function dlUser_Text_onblur() {
	var bCheckOK = true;
	if (document.all["dlUser_Text"].value != document.all["H_User"].value) {
		if (odjf_ComboBoxCheck("dlUser", "承辦人")) {
			document.all["H_User"].value = document.all["dlUser_Text"].value;

			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}