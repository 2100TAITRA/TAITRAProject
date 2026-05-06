/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期	    SA	     	PM          單號	    概要
 * -------------------------------------------------------------------------------------------------
 * 1031023  Kevin       Gabby       1030654     新增EDR467會辦明細表列印作業
 * 1040819	Kevin		Kevin		1040708		調整搜尋必要條件
 * 1050524  Kevin       Zen         1050087     二代公文修改
 * 1051019  Leslie      Kenny       1050087     二代公文修改
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
//1050524 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050524 Zen 1050087 二代公文修改
	//jf_CallWS("lib/ED_LIB.asmx", "GetDeptAllUsers", false, null);
	//初始時先儲存下拉式選單的Text、Value、所有選項Value
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_User"].value = document.all["dlUser_Text"].value;
	document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
	document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
	document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
	
	//無值不顯示
	jf_HandleComboxStatus("dlSect");
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
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
		case "btSDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txSDate"], event.screenX, event.screenY);
			break;
		case "btEDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txEDate"], event.screenX, event.screenY);
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050524 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1050524 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			if(!CheckCondition())
				Page_BlockSubmit=true;
		    //1050524 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			if(!CheckCondition())
				Page_BlockSubmit=true;
		    //1050524 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btExcel":
			Page_BlockSubmit = !CheckCondition();
		    //1050524 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
	}
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
		{}
		else
		{}
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//下拉選單onblur時的檢查
function dlDept_Text_onblur()
{
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
	{
		//呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
			
			var bSubTree = true;
			if(document.all["H_OD_FLOW_TYPE"].value == "2")
				bSubTree = false;
			//二級單位選單增加(僅含一級單位)選項
			edjf_SetdlDept("dlDept","dlSect","dlUser","",bSubTree,true);	//初始dlSect、dlUser的處理

			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
			document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
			
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
	if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
	{
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			
			//初始化承辦人選單
			edjf_SetdlSect("dlDept","dlSect","dlUser","",false,true);
							
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
			document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
			
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
	if (document.all["dlUser_Text"].value != document.all["H_User"].value)
	{
		//呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlUser", "承辦人"))
		{
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
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
	    //1050524 Zen 1050087 二代公文修改
	    //document.all[argComboxID + "_Container"].className = "InputFieldText";
        document.all[argComboxID + "_Container"].className = "custom-combobox";
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

function CheckCondition()
{
	var bIsOK = true;
	var strSDoc = jf_Trim(document.all["txSDoc"].value);
	var strEDoc = jf_Trim(document.all["txEDoc"].value);
	//1040819 Kevin	 1040708 調整搜尋必要條件
	//var strDept		= jf_Trim(document.all["dlDept_Text"].value);
	var strSDate = jf_Trim(document.all["txSDate"].value);
	var strEDate = jf_Trim(document.all["txEDate"].value);
	//1040819 Kevin	 1040708 調整搜尋必要條件
	//if (strSDoc+strEDoc+strDept+strSDate+strEDate== "")
	if (strSDoc + strEDoc + strSDate + strEDate == "" && !document.all["rbCurr"].checked)
	{
	    //document.all["dlDept_Text"].focus();
	    //1050524 Zen 1050087 二代公文修改
	    //document.all["txSDate"].focus();
	    $('#txSDate').focus();

		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公文文號、會辦單位、日期區間請至少輸入一個條件"])), "");
		bIsOK = false;
	}
		//1040819 Kevin	 1040708 調整搜尋必要條件
		//else
	else if (strSDate + strEDate != "")
	{
		//[收創文日起迄]欄位有值時才判斷日期合理性
		if (!CheckCDATE("txSDate", "日期欄位(起)") || !CheckCDATE("txEDate", "日期欄位(訖)"))
			bIsOK = false;
	}
	//下拉式選單檢查
	if (!jf_CheckBeforeSearch())
		bIsOK = false;

	return bIsOK;
}
//記錄是否已檢核過有註冊onblur事件的欄位的值(通常發生在輸入完後直接按下儲存件時)
var bHasCheck = false;

//檢查日期格式
function CheckCDATE(argObj,strMsg)
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
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
		    //1050524 Zen 1050087 二代公文修改
		    //document.all[argObj].focus();
		    $('#' + argObj).focus();
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}