/*
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 96.08.29 Zoey    001448  承辦人下拉選單空白
 * 96.03.15	Shelly	960069	修改逾期天數的輸入方式
 * 97.04.03 Iris    000985  新增稽催日期查詢
 * 98.09.28 Iris    0980391 查詢條件支援二層式架構
 *100.10.03 Ken     1000600 新增匯出Excel
 *105.05.23	JOE		1050087	二代系統升級
 *110.02.26 Joe		--		修正升二代漏Mark的無用呼叫
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050523	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050523	Joe	1050087	二代系統升級
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
		//1050523	Joe	1050087	二代系統升級
		/*
		case "ibDue1":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
			break;
		}		
		case "ibDue2":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
			break;
		}
		*/
		/*
		case "":
			break;
		*/
	}	
}

//1050523	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1050523	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckBeforeSearch();
			//1050523	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			if(UnEmpty())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
			adjust();
			//1050523	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		//100.10.03   Ken   1000600 新增匯出Excel功能
		case "btExcel":
			if(UnEmpty())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			adjust();
			//1050523	Joe	1050087	二代系統升級
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
	//1100226	Joe		--		修正升二代漏Mark的無用呼叫
	// jf_CallWS("lib/OD_LIB.asmx","HelloWorld",false,null);
	// jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, null);
	//0980928 David 0980391 初始時先儲存下拉式選單的Text、Value、所有選項Value
	//oTimerId = setInterval("fnInitUser()",50);//Zoey [001448,96/08/28]承辦人下拉選單空白
	document.all["H_Dept_Text"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect_Text"].value = document.all["dlSect_Text"].value;
	document.all["H_User_Text"].value = document.all["dlUser_Text"].value;
	document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept_Text"].value);
	document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Text"].value);
	document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User_Text"].value);
	document.all["H_Sect_AllValue"].value = odjf_SaveCurrDL(document.all["dlSect"]);
	document.all["H_User_AllValue"].value = odjf_SaveCurrDL(document.all["dlUser"]);
	//無值不顯示
	jf_HandleComboxStatus("dlSect");
}

function fnInitUser()
{
	clearInterval(oTimerId); //clear	
	akjf_DeptCheck('dlDept','dlUser');
	document.all["H_Value"].value = document.all["dlDept_Text"].value ;
}
function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
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
		//1050523	Joe	1050087	二代系統升級，調整focus寫法
		//document.all[id].focus();
		$('#' + id).focus();
	}
}
function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
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

//0980928 David 0980391 查詢條件支援二層式架構
/*function dlDEPT_Text_onblur()
{
	if (odjf_CheckComboBox("dlDept"))
	{
		//值若變更時，觸動TextChange事件
		if (document.all["dlDept_Text"].value != document.all["H_Value"].value)
		{
			akjf_DeptCheck('dlDept','dlUser');
		}
	}
	
	document.all["H_Value"].value = document.all["dlDept_Text"].value ;
}*/
function dlDept_Text_onblur()
{
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept_Text"].value)
	{
		//呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept_Text"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept_Text"].value);
			
			var bSubTree = true;
			if(document.all["H_OD_FLOW_TYPE"].value == "2")
				bSubTree = false;
			odjf_SetdlDept("dlDept","dlSect","dlUser","",bSubTree,true);	//初始dlSect、dlUser的處理

			document.all["H_Sect_Text"].value = document.all["dlSect_Text"].value;
			document.all["H_User_Text"].value = document.all["dlUser_Text"].value;
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Text"].value);
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User_Text"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_Sect_AllValue"].value = odjf_SaveCurrDL(document.all["dlSect"]);
			document.all["H_User_AllValue"].value = odjf_SaveCurrDL(document.all["dlUser"]);
			
			//依選項多寡固定下拉式選單可見長度
			if(document.all["dlSect"].options.length > 10)
				document.all["dlSect"].size = 10;
			else if(document.all["dlSect"].options.length ==1)
				document.all["dlSect"].size = 2;
			else
				document.all["dlSect"].size = document.all["dlSect"].options.length;
				
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
			
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
	if (document.all["dlSect_Text"].value != document.all["H_Sect_Text"].value)
	{
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect_Text"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Text"].value);
			
			odjf_SetdlSect("dlDept","dlSect","dlUser","",false,true);
							
			document.all["H_User_Text"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User_Text"].value);
			document.all["H_User_AllValue"].value = odjf_SaveCurrDL(document.all["dlUser"]);
			
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlUser_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlUser_Text"].value != document.all["H_User_Text"].value)
	{
		//呼叫OD_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlUser", "承辦人"))
		{
			document.all["H_User_Text"].value = document.all["dlUser_Text"].value;
			
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User_Text"].value);
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
		//1050523	Joe		1050087		二代系統升級
		//document.all[argComboxID+"_Container"].className = "InputFieldText";
		document.all[argComboxID+"_Container"].className = "custom-combobox";
}

//查詢前檢查
function jf_CheckBeforeSearch()
{
	if(!dlDept_Text_onblur(true))
		return false;

	if(!dlSect_Text_onblur(true))
		return false;

	if(!dlUser_Text_onblur(true))
		return false;

    return true;
}

//問題單號：950307(N) 次數：1 修改人：FERDY 日期：950516 區塊編號：01 END
//內容：1.逾期天數不可皆為空白
function UnEmpty()
{	
	//0980929	David	0980391	檢核選單內容
	if(!jf_CheckBeforeSearch())
		return false;
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
			//1050523	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txSDay"].focus();
			$('#txSDay').focus();
		else
			//1050523	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txBehind"].focus();
			$('#txBehind').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["逾期天數不可為空白"])),"");
		return false;
	}
	
	return true;
}
function adjust()
{
	var strS = jf_Trim(document.all.txSDate.value);
	var strE = jf_Trim(document.all.txEDate.value);
	if(strS != "" && strE == "")
		document.all.txEDate.value = strS;
	else if(strS == "" && strE != "")
		document.all.txSDate.value = strE;
	else if(strS > strE)
	{
		document.all.txSDate.value = strE;
		document.all.txEDate.value = strS;
	}
	
}