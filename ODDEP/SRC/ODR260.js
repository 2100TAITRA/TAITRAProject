/*
DATE	SA		PRG		MGR_NO		DESC
0980928	Stella	David	0980391		查詢條件及報表支援二層級架構
1050426	Kevin	Joe		1050087 	二代系統升級
1050520	KEVIN	JOE		1050087		二代系統升級，調整focus寫法
1110222	David	Joe		1110027		新增日期欄位為必要條件
1120828	David	Joe     1110716     聯合客製化功能，新增核決者條件
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050426	Joe	1050087	二代系統升級
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050426	Joe	1050087	二代系統升級
//if (document.all["ValidationSummary1"].textContent != "")
//	alert(document.all["ValidationSummary1"].textContent);
jf_ShowValidator();	

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
		//1050426	Joe	1050087	二代系統升級
		/*
		case "btCalendar1":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
			break;
		case "btCalendar2":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
			break;
		*/
	}	
}

//1050426	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1050426	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btSearch":
		case "btPrint":
		case "btPreview":
			//1071029
		case "btExcel":
			Page_BlockSubmit = !jf_CheckBeforeSearch();
			//1050426	Joe	1050087	二代系統升級
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
	//0980928 David 0980391 初始時先儲存下拉式選單的Text、Value、所有選項Value
	document.all["H_Dept_Text"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect_Text"].value = document.all["dlSect_Text"].value;
	document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept_Text"].value);
	document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Text"].value);
	document.all["H_Sect_AllValue"].value = odjf_SaveCurrDL(document.all["dlSect"]);
	
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
//0980928 David 0980391 查詢前檢查
function jf_CheckBeforeSearch()
{
	//1110222	Joe		1110027		新增日期欄位為必要條件--S
	if(document.all.txSDate.value == "" && document.all.txEDate.value == ""){
		alert('請輸入日期條件');
		return false;
	}
	//1110222	Joe		1110027		新增日期欄位為必要條件--E
	
	if(!dlDept_onblur(true))
		return false;

	if(!dlSect_onblur(true))
		return false;

    return true;
}

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
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
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
			odjf_SetdlDept("dlDept","dlSect","","",bSubTree,true);	//初始dlSect的處理
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
				
			//無值不顯示
			jf_HandleComboxStatus("dlSect");
		}
		else
			bCheckOK = false;

		//1120828	Joe     1110716     聯合客製化功能，新增核決者條件
		if (document.all["OrgName"].value == "NUU")
			GetAppUser();
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
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Text"].value);
		}
		else
			bCheckOK = false;
		//1120828	Joe     1110716     聯合客製化功能，新增核決者條件
		if (document.all["OrgName"].value == "NUU")
			GetAppUser();
	}
	return bCheckOK;
}


//0980928	David	0980391 無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
		//1050502	Joe	1050087	二代系統升級
		//document.all[argComboxID+"_Container"].className = "InputFieldText";
		document.all[argComboxID+"_Container"].className = "custom-combobox";
}

//1120828	Joe     1110716     聯合客製化功能，新增核決者條件
function GetAppUser() {
	//清空選項
	while (document.all["dlAppUser"].length > 0)
		document.all["dlAppUser"].remove(0);
	document.all["dlAppUser_Text"].value = "";
	document.all["txAppUser"].value = "";
	document.all["txAppUserList"].value = "";

	var DeptNo = "", SectNo = "";
	if (document.all["H_Dept_Value"].value != "")
		DeptNo = document.all["H_Dept_Value"].value.split(':')[0];
	if (document.all["H_Sect_Value"].value != "")
		SectNo = document.all["H_Sect_Value"].value.split(':')[2];
	else if (document.all["H_Sect_Text"].value != "")
		SectNo = "OnlyDept";
	var Type = "";
	if (document.all.rb1.checked)
		Type = "1";
	else if (document.all.rb2.checked)
		Type = "2";
	else if (document.all.rb3.checked)
		Type = "3";
	else
		Type = "ALL";
	var AppUserList = OD.ODR260.GetAppUser(document.all.H_OrgNo.value, DeptNo, SectNo, Type).value
	if (!AppUserList.bSuccess) {
		alert(AppUserList.ErrMessage);
	}
	else {
		document.all["dlAppUser"].options.add(new Option("", ""));
		for (var i = 0; i < AppUserList.AppUser.length; i++) {
			document.all["dlAppUser"].options.add(new Option(AppUserList.AppUser[i], AppUserList.AppUser[i]));
			document.all["txAppUserList"].value += ";" + AppUserList.AppUser[i];
        }
    }
}

function dlAppUser_onblur() {
	document.all["txAppUser"].value = document.all["dlAppUser"].value;
}