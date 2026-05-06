/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		 SA           PG           單號	     概要
 * -------------------------------------------------------------------------------------------------
 * 1000825	 David	      Kevin 	   1000713	 新增郵件清單列印作業
 * 1030501	 David		  Eric		   1030136	 新增DG設定按鈕
 * 1070111   David        Justin       1050087   二代公文修改
 * 1091211	 Kevin		  Joe		   1090891	 修改滲透測試，路徑資訊不經由Client端
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
//1070111 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1030501	 Eric	1030136	新增DG設定按鈕
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1070111 Justin [1050087] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	
	jf_HandleComboxStatus("dlSect");
	
	dlClassNoOnChange();
	
	for(var i = 0; i < document.all["dlSubclassNo"].length; i++)
	{
		if (document.all["H_SubNo"].value == document.all["dlSubclassNo"].options[i].value)
		{
			document.all["dlSubclassNo"].selectedIndex = i ;
		}
	}
	
	//1091211	Joe		1090891		修改滲透測試，路徑資訊不經由Client端，調整Excel下載方式
	// if(document.all["H_Url"].value != "")
	// {
		// window.open(document.all["H_Url"].value);		
		// document.all["H_Url"].value = "";
	// }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1070111 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
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
	    /*1070111 Justin [1050087] 二代公文修改
		case "btSendDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txSendDateS"], event.screenX, event.screenY);
			break;
		case "btSendDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txSendDateE"], event.screenX, event.screenY);
			break;*/
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1070111 Justin [1050087] 二代公文修改 
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
	
    //1070111 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	if(!jf_ConfireSearch())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1070111 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1070111 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1070111 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btExcel":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1070111 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1030501	 Eric	1030136	新增DG設定按鈕
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
	}
}

function jf_ConfireSearch()
{
	if(document.all["txSendDateS"].value =="" && document.all["txSendDateE"].value =="")
	{	
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["郵寄日期(起)、(迄)不可皆為空白"]) ), "" );
		return false;
	}
	
	if(!CheckDate("txSendDateS","郵寄日期(起)","BS"))
		return false
	if(!CheckDate("txSendDateE","郵寄日期(迄)","BS"))
		return false
		
	if(!CheckTime("txSendTimeS","郵寄時間(起)","BS"))
		return false
	if(!CheckTime("txSendTimeE","郵寄時間(迄)","BS"))
		return false

	if(!dlDept_Text_onblur())
		return false
	if(!dlSect_Text_onblur())
		return false
	
	document.all["H_SubNo"].value =jf_GetDLValue(document.all["dlSubclassNo"]);
	
	return true;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var LastCallid = "";
function CheckDate(argObj,strMsg,callid)
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
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if(!jf_IsNum(strDate))
		{
			if(strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    //1070111 Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;
		}
		if (!jf_CheckCDATE(strDate))
		{
			if(strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    //1070111 Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}

function CheckTime(argObj,strMsg,callid)
{
	if(callid=="OB" && LastCallid=="BS")
	{
		LastCallid = callid;
		return;
	}
	LastCallid = callid;
	
	var strTime = document.all[argObj].value;
	if (strTime != "")
	{
		if(strTime.length < 4)
		{
			strTime = jf_PADL(strTime,4,'0');
			document.all[argObj].value = strTime;
		}
		if(!jf_IsNum(strTime))
		{
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    //1070111 Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;
		}
		if(strTime.substring(0,2) > 23 || strTime.substring(2,4) > 60 )
		{
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    //1070111 Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
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
		    //1070111 Justin [1050087] 二代公文修改
			//document.all["dlSect_Container"].className = "InputFieldText";
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
	    //1070111 Justin [1050087] 二代公文修改
	    //document.all[argComboxID+"_Container"].className = "InputFieldText";
	    document.all[argComboxID + "_Container"].className = "custom-combobox";
}


function jf_GetDLValue(argDLObj)
{
	if(argDLObj.selectedIndex == -1)
		return "";
	return argDLObj.options[argDLObj.selectedIndex].value;	
}

function dlClassNoOnChange()
{
	var strAccM = jf_GetDLValue(document.all["dlClassNo"]);
	
	//清空郵寄小類選項
	document.all["dlSubclassNo"].options.length = 0;
	document.all["dlSubclassNo"].options[0] = new Option("","");
	if (strAccM != "")
	{
		//重新設定郵寄小類選項
		for(var i = 0; i < document.all["H_dlSubclassNo"].length; i++)
		{
			var strAccNo = document.all["H_dlSubclassNo"].options[i].value.split("|");
			
			if (strAccM == strAccNo[0])
			{
				var opt = document.createElement("option");
				opt.text = document.all["H_dlSubclassNo"].options[i].text;
				opt.value = strAccNo[1];
				document.all["dlSubclassNo"].options.add(opt);
			}
		}
	}
}