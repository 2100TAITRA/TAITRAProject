/*
DATE 	SA		PRG		MGR_NO	DESC
0951017	Stella	Charles	955102	二層式登記桌修改
0991005			Johnny			二級下拉選單應為可見
0991025			Johnny			加上小日曆功能
1000216	Zola	Linda	1000153	文號(起)onblur時自動帶入文號(迄)
1010321	David	ivory	1010231	修改查詢前二級單位取值,去除OD_FLOW_TYPE之判斷
1010815	David	Chris	1010537	新增承辦人下拉選單，並以其為查詢條件。
1011123	David	David	-------	修正[1010537]BUG
1050323	David	Kenny	1050087 二代公文系統相關修改
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050323	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050323	Kenny	[1050087]   二代公文系統相關修改--Start--
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1050323	Kenny	[1050087]   二代公文系統相關修改--End--

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
		//1050323	Kenny	[1050087]   二代公文系統相關修改，以JQueryUI取代--Start--
		//case "btSDate":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
		//	break;
		//case "btEDate":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
		//	break;
		//1050323	Kenny	[1050087]   二代公文系統相關修改，以JQueryUI取代--End--
	}	
}

//1050323	Kenny	[1050087]   二代公文系統相關修改
//function jf_ToolBarHandle()
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
	
	//1050323	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			if(jf_CheckBeforeSearch())	//[需求單955102] 查詢前檢查 Charles 0951018
			{
				Page_BlockSubmit=false;
				//1050323	Kenny	[1050087]   二代公文系統相關修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit=true;
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			//1050323	Kenny	[1050087]   二代公文系統相關修改
			//document.all["txSNo"].focus();
			$('#txSNo').focus();
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, null);
	//[需求單955102] 初始時先儲存二級單位下拉式選單的Text、Value、所有選項Value  Charles 0951018
	document.all["H_FmDept"].value = document.all["dlFmDept_Text"].value ;
	document.all["H_ToDept"].value = document.all["dlToDept_Text"].value ;
	document.all["H_FmSubDept"].value = document.all["dlFmSubDept_Text"].value ;
	document.all["H_ToSubDept"].value = document.all["dlToSubDept_Text"].value ;
	document.all["H_FmSubDept_Value"].value = odjf_GetSelectValue(document.all["dlFmSubDept"],document.all["H_FmSubDept"].value);
	document.all["H_ToSubDept_Value"].value = odjf_GetSelectValue(document.all["dlToSubDept"],document.all["H_ToSubDept"].value);
	document.all["H_dlFmSubDept_Value"].value = odjf_SaveCurrDL(document.all["dlFmSubDept"]);
	document.all["H_dlToSubDept_Value"].value = odjf_SaveCurrDL(document.all["dlToSubDept"]);

	//1010815	Chris	1010537	初始承辦人下拉選單的Text、Value、所有選項Value。
	document.all["H_User"].value = document.all["dlUser_Text"].value;
	document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
	document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);	

	//無值不顯示
	jf_HandleComboxStatus("dlFmSubDept");
	jf_HandleComboxStatus("dlToSubDept");
}

//[需求單955102] 查詢前檢查 Charles 0951018
function jf_CheckBeforeSearch()
{
	if(!dlFmDept_Text_onblur(true))
		return false;

	if(!dlToDept_Text_onblur(true))
		return false;
	//1010321	ivory	1010231	修改查詢前二級單位取值,去除OD_FLOW_TYPE之判斷	
    //if(document.all["H_OD_FLOW_TYPE"].value == "2")
    //{
		if(!dlFmSubDept_Text_onblur(true))
			return false;

		if(!dlToSubDept_Text_onblur(true))
			return false;
    //}
    return true;
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
	//1050323	Kenny	[1050087]   二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue(argBatchNo)
{
    opener.document.all.lbReturnValue.length = 1;
    opener.document.all.lbReturnValue.options[0].value = argBatchNo;
    opener.window.CallBack("ODI110");
    close();
}

//[需求單955102] 下拉選單檢查 Charles 0951017 ↓
function dlFmDept_Text_onblur(argIsCheckDone)
{
	var bCheckOK = true;
	if (document.all["dlFmDept_Text"].value != document.all["H_FmDept"].value)
	{
		//呼叫OD_LIB.js，檢查dlFmDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlFmDept", "送文單位"))
		{
			//存ComboBox_Text的value
			document.all["H_FmDept"].value = document.all["dlFmDept_Text"].value;
			//0991005			Johnny			二級下拉選單應為可見
			//if(document.all["H_OD_FLOW_TYPE"].value == "2")
			//{
				//設定送文科別的下拉選單
				//1010815	David	Chris	1010537	多設定承辦人下拉選單。
				//odjf_SetdlDept("dlFmDept","dlFmSubDept","","",false);
				odjf_SetdlDept("dlFmDept","dlFmSubDept","dlUser","",false);	//初始dlFmSubDept、dlUser的處理

				//存ComboBox_Text的value
				document.all["H_FmSubDept"].value = document.all["dlFmSubDept_Text"].value;
				//存所選擇的ComboBox項目的value
				document.all["H_FmSubDept_Value"].value = odjf_GetSelectValue(document.all["dlFmSubDept"],document.all["H_FmSubDept"].value);
				//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlFmSubDept的處理
				document.all["H_dlFmSubDept_Value"].value = odjf_SaveCurrDL(document.all["dlFmSubDept"]);

				//依選項多寡固定下拉式選單可見長度
				if(document.all["dlFmSubDept"].options.length > 10)
					document.all["dlFmSubDept"].size = 10;
				else if(document.all["dlFmSubDept"].options.length ==1)
					document.all["dlFmSubDept"].size = 2;
				else
					document.all["dlFmSubDept"].size = document.all["dlFmSubDept"].options.length;

				//1010815	David	Chris	1010537	新增承辦人下拉選單，並以其為查詢條件。-Start
				//存ComboBox_Text的value
				document.all["H_User"].value = document.all["dlUser_Text"].value;
				//存所選擇的ComboBox項目的value
				document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
				//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlUser的處理
				document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);	
				//依選項多寡固定下拉式選單可見長度
				if(document.all["dlUser"].options.length > 10)
					document.all["dlUser"].size = 10;
				else if(document.all["dlUser"].options.length ==1)
					document.all["dlUser"].size = 2;
				else
					document.all["dlUser"].size = document.all["dlUser"].options.length;
				//1010815	David	Chris	1010537	新增承辦人下拉選單，並以其為查詢條件。-End	

				//無值不顯示
				jf_HandleComboxStatus("dlFmSubDept");
			//}
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlToDept_Text_onblur(argIsCheckDone)
{
	var bCheckOK = true;
	if (document.all["dlToDept_Text"].value != document.all["H_ToDept"].value)
	{
		//呼叫OD_LIB.js，檢查dlFmDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlToDept", "收文單位"))
		{
			//存ComboBox_Text的value
			document.all["H_ToDept"].value = document.all["dlToDept_Text"].value;
			//0991005			Johnny			二級下拉選單應為可見
			//if(document.all["H_OD_FLOW_TYPE"].value == "2")
			//{
				//設定收文科別的下拉選單
				odjf_SetdlDept("dlToDept","dlToSubDept","","",false);
				//存ComboBox_Text的value
				document.all["H_ToSubDept"].value = document.all["dlToSubDept_Text"].value;
				//存所選擇的ComboBox項目的value
				document.all["H_ToSubDept_Value"].value = odjf_GetSelectValue(document.all["dlToSubDept"],document.all["H_ToSubDept"].value);
				//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlFmSubDept的處理
				document.all["H_dlToSubDept_Value"].value = odjf_SaveCurrDL(document.all["dlToSubDept"]);
				//依選項多寡固定下拉式選單可見長度
				if(document.all["dlToSubDept"].options.length > 10)
					document.all["dlToSubDept"].size = 10;
				else if(document.all["dlToSubDept"].options.length ==1)
					document.all["dlToSubDept"].size = 2;
				else
					document.all["dlToSubDept"].size = document.all["dlToSubDept"].options.length;
				//無值不顯示
				jf_HandleComboxStatus("dlToSubDept");
			//}
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlFmSubDept_Text_onblur(argIsCheckDone)
{
	var bCheckOK = true;
	if (document.all["dlFmSubDept_Text"].value != document.all["H_FmSubDept"].value)
	{
		//呼叫OD_LIB.js，檢查dlFmDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlFmSubDept", "送文科別"))
		{
			//存ComboBox_Text的value
			document.all["H_FmSubDept"].value = document.all["dlFmSubDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_FmSubDept_Value"].value = odjf_GetSelectValue(document.all["dlFmSubDept"],document.all["H_FmSubDept"].value);

			//1010815	David	Chris	1010537	新增承辦人下拉選單，並以其為查詢條件。-Start
			//設定送文科別及承辦人下拉選單。
			//1011123 David 二級選單OnBlur函式錯誤
			//odjf_SetdlDept("dlFmDept","dlFmSubDept","dlUser","",false)
			odjf_SetdlSect("dlFmDept","dlFmSubDept","dlUser","",false);
			//存ComboBox_Text的value
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlUser的處理
			document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);
			//依選項多寡固定下拉式選單可見長度。
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
			//1010815	David	Chris	1010537	新增承辦人下拉選單，並以其為查詢條件。-End
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlToSubDept_Text_onblur(argIsCheckDone)
{
	var bCheckOK = true;
	if (document.all["dlToSubDept_Text"].value != document.all["H_ToSubDept"].value)
	{
		//呼叫OD_LIB.js，檢查dlFmDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlToSubDept", "收文科別"))
		{
			//存ComboBox_Text的value
			document.all["H_ToSubDept"].value = document.all["dlToSubDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_ToSubDept_Value"].value = odjf_GetSelectValue(document.all["dlToSubDept"],document.all["H_ToSubDept"].value);
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
		//1050323	Kenny	[1050087]   二代公文系統相關修改
		//document.all[argComboxID+"_Container"].className = "InputFieldText";
		document.all[argComboxID+"_Container"].className = "custom-combobox";
}
//[需求單955102] 下拉選單檢查 Charles 0951017 ↑

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1050323	Kenny	[1050087]   二代公文系統相關修改
			//document.all[argObj].focus();
			$('#'+argObj).focus();
		}
	}
}
function DocNoOnBlur()
{
	if(document.all["txDocNo"].value != "" && document.all["txDocNoE"].value == "")
		document.all["txDocNoE"].value = document.all["txDocNo"].value;
}

//1010815	David	Chris	1010537	for 承辦人下拉選單onblur & onchange。
function dlUser_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlUser_Text"].value != document.all["H_User"].value)
	{
		//呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlUser", "承辦人"))
		{
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}