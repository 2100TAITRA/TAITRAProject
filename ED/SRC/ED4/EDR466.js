/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* 程式修改歷程 
* -------------------------------------------------------------------------------------------------
* 日期	    SA	     	PM          單號	    概要
* -------------------------------------------------------------------------------------------------
* 1031023   Kevin       Gabby       1030654     新增EDR466會辦公文時效統計列印作業
* 1050524   Kevin       Zen         1050087     二代公文修改
* 1051019   Leslie      Kenny       1050087     二代公文修改
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
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
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
		case "btRcvDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txAppDateS"], event.screenX, event.screenY);
			break;
		case "btRcvDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txAppDateE"], event.screenX, event.screenY);
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
			if(!CheckBeforeSearch())
				Page_BlockSubmit=true;
		    //1050524 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			if(!CheckBeforeSearch())
				Page_BlockSubmit=true;
		    //1050524 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btExcel":
			if(!CheckBeforeSearch())
				Page_BlockSubmit=true;
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
function CheckBeforeSearch()
{
	var strSDate	=	jf_Trim(document.all.txAppDateS.value);//用印日期起
	var strEDate	=	jf_Trim(document.all.txAppDateE.value);//用印日期迄
	var bRtnbool = true;
	if(strSDate == "" && strEDate == "")
	{
	   jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["列印區間(起)、(迄)不可皆為空白"])),"");
	   bRtnbool = false;
	   return bRtnbool;
	}
	if(!CheckDATE("txAppDateS","列印區間(起)"))
	{  
	   bRtnbool = false;
	   return bRtnbool;
	}
	
	if(!CheckDATE("txAppDateE","列印區間(迄)"))
	{ 
		bRtnbool = false;
		return bRtnbool;
	}
	if(strSDate == "" && strEDate != "")
	{ 
	document.all.txAppDateS.value = strEDate;
	
	}
	if(strSDate != "" && strEDate == "")
	{ 
	document.all.txAppDateE.value = strSDate;
	}
	return bRtnbool;
}
//記錄是否已檢核過有註冊onblur事件的欄位的值(通常發生在輸入完後直接按下儲存件時)
var bHasCheck = false;
function CheckDATE(argObj,strMsg)
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
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
//ComboBox 處理

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
			
			edjf_SetdlDept("dlDept","dlSect","","",false,true);	//初始dlSect、dlUser的處理

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
function ComboBoxCheck(argComboBoxID, argKeyMsg)
{
	var bRtnBool = false;
	var ComboBoxObj     = document.all[argComboBoxID];
	var ComboBoxTextObj = document.all[argComboBoxID + "_Text"];
	
	var i, j;
	if (ComboBoxObj == null || ComboBoxTextObj == null)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["["+argComboBoxID+"]下拉選單不存在"])),"");
		return bRtnBool;
	}

	for( i=0 ; i<ComboBoxObj.options.length ; i++ )
	{
		if (ComboBoxTextObj.value == ComboBoxObj.options[i].text)
		{
			bRtnBool = true;
			break;
		}
	}
	
	if (!bRtnBool)
	{
	    //1050524 Zen 1050087 二代公文修改
	    //ComboBoxTextObj.focus();
	    $('#' + ComboBoxTextObj).focus();
		ComboBoxTextObj.select();
	}
	return bRtnBool;
}
