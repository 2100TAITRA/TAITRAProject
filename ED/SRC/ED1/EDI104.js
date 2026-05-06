/*
DATE		SA		PRG		MGR_NO		DESC
1040112	    Kevin	Kevin_C	1030976		新增程式
1050802     David   Justin  1050087     二代公文修改
1051019     Leslie  Kenny   1050087     二代公文修改
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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1050802 Justin 1050087 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
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
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
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
	    /*1050729 Justin 1050087 二代公文修改，刪除小日曆處理--START
		case "btRcvDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
			break;
		case "btRcvDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
			break;
		case "btCloseDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txCloseDateS, event.screenX, event.screenY);
			break;
		case "btCloseDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txCloseDateE, event.screenX, event.screenY);
			break;
		case "btMailSendDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txMailSendDateS, event.screenX, event.screenY);
			break;
		case "btMailSendDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txMailSendDateE, event.screenX, event.screenY);
			break;*/
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050802 Justin 1050087 二代公文修改 
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
	
    //1050802 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1050802 Justin 1050087 二代公文修改 
			//document.all["txMailSeqS"].focus();
			$('#txMailSeqS').focus();
			break;
		case "btSearch":
			Page_BlockSubmit = !ColumnHandle();
			if(!Page_BlockSubmit)
				Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050802 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;	
		case "btPrint":
			Page_BlockSubmit = !ColumnHandle();
			if(!Page_BlockSubmit)
				Page_BlockSubmit = !jf_ConfirmPrint();
		    //1050802 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !ColumnHandle();
			if(!Page_BlockSubmit)
				Page_BlockSubmit = !jf_ConfirmPreview();
		    //1050802 Justin 1050087 二代公文修改 
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
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
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
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.window.CallBack("EDI104");
	    close();
	}
	catch (e) {}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//post back前處理
function ColumnHandle()
{
	var bRtnbool = true;
	if(!CheckDATE(document.all["txRcvDateS"]))
		bRtnbool=false;
	if(!CheckDATE(document.all["txRcvDateE"]))
		bRtnbool=false;
	if(!CheckDATE(document.all["txCloseDateS"]))
		bRtnbool=false;
	if(!CheckDATE(document.all["txCloseDateE"]))
		bRtnbool=false;
	if(!CheckDATE(document.all["txMailSendDateS"]))
		bRtnbool=false;
	if(!CheckDATE(document.all["txMailSendDateE"]))
		bRtnbool=false;
	document.all["txWorkDesc"].value = jf_Trim(document.all["txWorkDesc"].value);
	CheckMailSeq(document.all["txMailSeqS"]);
	CheckMailSeq(document.all["txMailSeqE"]);
	
	//檢核至少輸入一筆資料作為查詢條件 -S
	var bIsTXhaveValue = true;
	var bIsDLhaveValue = true;
	if(document.all["txMailSeqS"].value=="" && document.all["txMailSeqE"].value=="" && document.all["txRcvDateS"].value=="" 
	&& document.all["txRcvDateE"].value=="" && document.all["txCloseDateS"].value=="" && document.all["txCloseDateE"].value==""
	&& document.all["txMailSendDateS"].value=="" && document.all["txMailSendDateE"].value=="" && document.all["txWorkDesc"].value==""
	&& document.all["H_Dept"].value=="")
		bIsTXhaveValue = false;
		
	var checkMailType;
	if(document.getElementById("dlMailType").selectedIndex==-1)
		checkMailType="";
	else
		checkMailType = jf_Trim(document.getElementById("dlMailType").options[document.getElementById("dlMailType").selectedIndex].value);
	if (checkMailType == "" || checkMailType == "undefined")
		bIsDLhaveValue = false;
	
	if(bIsTXhaveValue==false && bIsDLhaveValue == false)
	{
		bRtnbool=false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["請至少輸入一筆資料作為查詢條件"]) ), "" );
	}
	//檢核至少輸入一筆資料作為查詢條件 -E
	return bRtnbool;
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
			if(document.all["H_OD_FLOW_TYPE"].value == "2")
				bSubTree = false;
		    //先顯示二級單位選項 避免隱藏不調整
			//1050802 Justin 1050087 二代公文修改
			//document.all["dlSect_Container"].className = "InputFieldText";
            document.all["dlSect_Container"].className = "custom-combobox";
			edjf_SetdlDept("dlDept","dlSect","dlUser","",false,true);	//初始dlSect、dlUser的處理

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
			
			edjf_SetdlSect("dlDept","dlSect","dlUser","",false);	//初始化承辦人選單
				
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
	    //1050802 Justin 1050087 二代公文修改
	    //document.all[argComboxID+"_Container"].className = "InputFieldText";
	    document.all[argComboxID + "_Container"].className = "custom-combobox";
}
function ddlWorkTypeChange()
{
	var select = document.getElementById("ddlWorkType");
	var n = select.selectedIndex;
	document.getElementById("txWorkDesc").value = select.options[n].text;
}
//檢核日期格式
var bHasCheck = false;
function CheckDATE(argObj)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strDate = jf_Trim(argObj.value);
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			argObj.value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			if(argObj.id=="txRcvDateS" || argObj.id=="txRcvDateE")
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收件日期格式不正確"])),"");
			if(argObj.id=="txCloseDateS" || argObj.id=="txCloseDateE")
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["結案日期格式不正確"])),"");
			if(argObj.id=="txMailSendDateS" || argObj.id=="txMailSendDateE")
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["發信日期格式不正確"])), "");
		    //1050802 Justin 1050087 二代公文修改 
			//argObj.focus();
			$('#' + argObj.id).focus();
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
function CheckMailSeq(argObj)
{
	var strDate = jf_Trim(argObj.value);
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			argObj.value = strDate;
		}
	}
}