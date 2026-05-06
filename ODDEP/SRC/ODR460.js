/*
DATE 	SA		PRG		MGR_NO	DESC
0980318 Stella  Iris    0980045 配合時效計算標準以發文資料更新時間點為主,修改日期ONBLUR訊息內容
0980929 Stella  David   0980391 支援二層式架構
1050526 Kevin   Zen     1050087 二代公文修改
1060518 Leslie  Zen     1060215 innerText相關修改
1110311	Kevin	Joe		1101572	新增承辦人選單
1110816	Kevin	Joe		1110634	新增起算日期條件*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050527 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

function ShowMsg()
{
    //1050527 Zen 1050087 二代公文修改--begin
	//if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
    //1050527 Zen 1050087 二代公文修改--end
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
		/*
		case "":
			break;
		*/
	}	
}
//1050527 Zen 1050087 二代公文修改
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
	
    //1050527 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
			if (UnEmpty())
				Page_BlockSubmit = !CheckBeforePrint();
			else
				Page_BlockSubmit = true;
		    //1050527 Zen 1050087 二代公文修改
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
	//1110311	Joe		1101572		新增承辦人選單
	document.all["H_User"].value = document.all["dlUser_Text"].value;
	document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
	document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);	
	
	//無值不顯示
	jf_HandleComboxStatus("dlSect");
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
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
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

function cb1_OnClick()
{
    //1050607 Zen 1050087 二代公文修改
    //document.all["txNumber"].focus();
    $('#txNumber').focus();
}

function UnEmpty()
{
	var strErrMsg="";
	if ((document.all["cb1"].checked==true) && (document.all["txNumber"].value==""))
	{
		strErrMsg = "發文使用日逾期天數不可空白\n" + strErrMsg;
	    //1050607 Zen 1050087 二代公文修改
		//document.all["txNumber"].focus();
		$('#txNumber').focus();
	}
    //1110311   Joe     1101572     修正查詢前檢核
	//if (document.all["txDate"].value== "")
	//1110816	Joe		1110634		新增起算日期條件
	// if (document.all["txCloseDateS"].value + document.all["txCloseDateE"].value + document.all["txRcvDateS"].value + document.all["txRcvDateE"].value == "")
	if (document.all["txCloseDateS"].value + document.all["txCloseDateE"].value + document.all["txRcvDateS"].value + document.all["txRcvDateE"].value + document.all["txStartDateS"].value + document.all["txStartDateE"].value == "")
	{
	    // Iris    0980045 配合時效計算標準以發文資料更新時間點為主,修改日期ONBLUR訊息內容
	    //1110311   Joe     1101572     修正查詢前檢核
	    //strErrMsg = "結案日期不可空白\n" + strErrMsg;
	    strErrMsg = "起算、結案、收創日期不可皆為空白\n" + strErrMsg;
	    //1050607 Zen 1050087 二代公文修改
	    //document.all["txDate"].focus();
	    //1110311   Joe     1101572     修正查詢前檢核
	    //$('#txDate').focus();
	    $('#txCloseDateS').focus();
	}
	if (strErrMsg != "")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		return false;
	}
	
	//1110311	Joe		1101572		補上日期起訖處理
	if(document.all["txCloseDateS"].value == "" && document.all["txCloseDateE"].value != "")
		document.all["txCloseDateS"].value = document.all["txCloseDateE"].value;
	else if(document.all["txCloseDateS"].value != "" && document.all["txCloseDateE"].value == "")
		document.all["txCloseDateE"].value = document.all["txCloseDateS"].value;
	else if(document.all["txCloseDateS"].value > document.all["txCloseDateE"].value){
		var Temp = document.all["txCloseDateS"].value;
		document.all["txCloseDateS"].value = document.all["txCloseDateE"].value;
		document.all["txCloseDateE"].value = Temp;
	}
	if(document.all["txRcvDateS"].value == "" && document.all["txRcvDateE"].value != "")
		document.all["txRcvDateS"].value = document.all["txRcvDateE"].value;
	else if(document.all["txRcvDateS"].value != "" && document.all["txRcvDateE"].value == "")
		document.all["txRcvDateE"].value = document.all["txRcvDateS"].value;
	else if(document.all["txRcvDateS"].value > document.all["txRcvDateE"].value){
		var Temp = document.all["txRcvDateS"].value;
		document.all["txRcvDateS"].value = document.all["txRcvDateE"].value;
		document.all["txRcvDateE"].value = Temp;
	}
	//1110816	Joe		1110634		新增起算日期條件--S
	if(document.all["txStartDateS"].value == "" && document.all["txStartDateE"].value != "")
		document.all["txStartDateS"].value = document.all["txStartDateE"].value;
	else if(document.all["txStartDateS"].value != "" && document.all["txStartDateE"].value == "")
		document.all["txStartDateE"].value = document.all["txStartDateS"].value;
	else if(document.all["txStartDateS"].value > document.all["txStartDateE"].value){
		var Temp = document.all["txStartDateS"].value;
		document.all["txStartDateS"].value = document.all["txStartDateE"].value;
		document.all["txStartDateE"].value = Temp;
	}
	//1110816	Joe		1110634		新增起算日期條件--E
	
	if(!jf_CheckBeforeSearch())
		return false;
	return true;
}

function CheckBeforePrint()
{
	if (document.all["cb1"].checked==false)
		return true;
		
	var iNumber = Number(document.all["txNumber"].value);
	if (iNumber <= 0)
	{
	    //1050607 Zen 1050087 二代公文修改
	    //document.all["txNumber"].focus();
	    $('#txNumber').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["發文使用日數必須要大於 0 的整數"])),"");
		return false;
	}
	return true;
}

//0980928 David 0980391 查詢前檢查
function jf_CheckBeforeSearch()
{
	if(!dlDept_onblur())
		return false;

	if(!dlSect_onblur())
		return false;
	
    return true;
}

//0980928 David 0980391 設定二級單位下拉選單
function dlDept_onblur()
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
			//1110311	Joe		1101572		新增承辦人選單
			// odjf_SetdlDept("dlDept","dlSect","","",bSubTree,true);	//初始dlSect的處理
			odjf_SetdlDept("dlDept","dlSect","dlUser","",bSubTree,true);	//初始dlSect的處理
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
				
			//1110311	Joe		1101572		新增承辦人選單--S
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
			//1110311	Joe		1101572		新增承辦人選單--E
				
			//無值不顯示
			jf_HandleComboxStatus("dlSect");
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//0980928	David	0980391 二級單位下拉選單onBlur
function dlSect_onblur()
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
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Text"].value);
			
			
			//1110311	Joe		1101572		新增承辦人選單--S
			//設定送文科別及承辦人下拉選單。
			odjf_SetdlSect("dlDept","dlSect","dlUser","",false);
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
			//1110311	Joe		1101572		新增承辦人選單--E
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
	    //1050527 Zen 1050087 二代公文修改
		//document.all[argComboxID+"_Container"].className = "InputFieldText";
	    document.all[argComboxID + "_Container"].className = "custom-combobox";
}

//############################################################################################
//					其		他		共		用		function
//############################################################################################
//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
        //1110311   Joe     1101572     修正日期檢核輸入為7碼
	    //if (strDate.length < 5)
	    if (strDate.length < 7)
	    {
	        //1110311   Joe     1101572     修正日期檢核輸入為7碼
	        //strDate = jf_PADL(strDate,5,'0');
	        strDate = jf_PADL(strDate, 7, '0');
			document.all[argObj].value = strDate;
	    }
	    //1110311   Joe     1101572     修正日期檢核輸入為7碼
	    //if (!jf_CheckCDATE(strDate+"01"))
	    if (!jf_CheckCDATE(strDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    //1050607 Zen 1050087 二代公文修改
			//document.all[argObj].focus();
			$('#'+argObj).focus();
		}
	}
}

//1110311	Joe		1101572		新增承辦人選單--S
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
//1110311	Joe		1101572		新增承辦人選單--E