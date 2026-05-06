/*
DATE	SA		PRG		MGR_NO				DESC
1030820	Kevin   Kevin   1030484             新增程式
1061108	Kevin	Joe		1050087				二代升級
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

//1061108	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1061108	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1061108	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1061108 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1061108 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":  //執行統計
			var xUrl = "../../../ODDEP/ODP420.aspx?nMode=EXEC&SAMLart=" + document.all.H_Artifact.value;
			jf_OpenChildWin(xUrl,"ODP420",760,500);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
			if(CheckBeforePrint())
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
				//1061108 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
			{
				Page_BlockSubmit = true;
			}
			break;
		case "btPreview":
			if(CheckBeforePrint())
			{
				Page_BlockSubmit = !jf_ConfirmPreview();
				//1061108 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
			{
				Page_BlockSubmit = true;
			}
			break;
	}
}

function CheckBeforePrint()
{
	if(!dlDept_Text_onblur())
		return false;
	if(!dlSect_Text_onblur())
		return false;
		
	document.all["txYearMonthS"].value = jf_Trim(document.all["txYearMonthS"].value);
	document.all["txYearMonthE"].value = jf_Trim(document.all["txYearMonthE"].value);
	
	if(document.all["txYearMonthS"].value=="" && document.all["txYearMonthE"].value=="")
	{
		alert("統計年月(起)、(迄)不可皆為空白。")
		//1061108	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txYearMonthS"].focus();
		$('#txYearMonthS').focus();
		return false;
	}
	
	if(!CheckDate("txYearMonthS","統計年月(起)","BS"))
		return false;
	if(!CheckDate("txYearMonthE","統計年月(迄)","BS"))
		return false;
		
	if(document.all["txYearMonthS"].value>document.all["H_YearMonth"].value)
	{
		strErrMsg = "統計年月(起)不可大於目前統計最大月份\n";
		//1061108	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txYearMonthS"].focus();
		$('#txYearMonthS').focus();
		jf_ShowMeg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		return false;
	}
	if(document.all["txYearMonthE"].value>document.all["H_YearMonth"].value)
	{
		strErrMsg = "統計年月(迄)不可大於目前統計最大月份\n";
		//1061108	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txYearMonthE"].focus();
		$('#txYearMonthE').focus();
		
		jf_ShowMeg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		return false;
	}
		
	return true;
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var LastCallid = "";
function CheckDate(argObj, strMsg, callid)
{
	if(callid=="OB" && LastCallid=="BS")
	{
		LastCallid = callid;
		return;
	}
	LastCallid = callid;

	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 5)
		{
			strDate = jf_PADL(strDate, 5, '0');
			document.all[argObj].value = strDate;
		}
		if(!jf_IsNum(strDate))
		{
			if(strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1061108	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;
		}
		if (!jf_CheckCDATE(strDate + "01"))
		{
			if(strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1061108	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}

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
			//先顯示二級單位選項 避免隱藏不調整			
			//1061108	Joe	1050087	二代系統升級
			// document.all["dlSect_Container"].className = "InputFieldText";
			document.all["dlSect_Container"].className = "custom-combobox";
			edjf_SetdlDept("dlDept","dlSect","dlUser","",false,false);	//初始dlSect、dlUser的處理

			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);

			//依選項多寡固定下拉式選單可見長度
			SetdlLenth(document.all["dlSect"]);

			//無值不顯示
			jf_HandleComboxStatus("dlSect");
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function SetdlLenth(argDLObj)
{
	if(argDLObj.options.length > 10)
		argDLObj.size = 10;
	else if(argDLObj.options.length ==1)
		argDLObj.size = 2;
	else
		argDLObj.size = argDLObj.options.length;
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
		//1061108	Joe	1050087	二代系統升級
		// document.all[argComboxID+"_Container"].className = "InputFieldText";
		document.all[argComboxID+"_Container"].className = "custom-combobox";
}


function jf_GetDLValue(argDLObj)
{
	if(argDLObj.selectedIndex == -1)
		return "";
	return argDLObj.options[argDLObj.selectedIndex].value;	
}
