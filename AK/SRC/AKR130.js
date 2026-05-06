/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 102.06.05	Jagle	1020275	增加簽核類型及庫房別條件、增加匯出EXCEL功能(1020332併本單一起處理)
 * 102.08.13	SKY		1020643	[台北大學]新增承辦單位二級單位下拉式選單
 * 106.02.06    Joe		1050087 二代系統升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050206	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050206	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	
}

//1050206	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1050206	Joe	1050087	二代系統升級
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
		//1050206	Joe	1050087	二代系統升級--S
		// case 'btCalendar':
			// Page_BlockSubmit=true;
			// jf_CallCalendar(document.all["txSDate"], event.screenX, event.screenY);
			// break;
		// case 'btCalendar2':
			// Page_BlockSubmit=true;
			// jf_CallCalendar(document.all["txEDate"], event.screenX, event.screenY);
			// break;
		//1050206	Joe	1050087	二代系統升級--E
	}	
}

//1050206	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1050206	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	dlSect_Text_onblur();//102.08.13	SKY		1020643	選完二級單位直接按TOOLBAR會沒有把值存到隱藏欄位，在這邊多做一次存值
	switch (xObjectName)
	{
		case "btPrint":
			CheckDate();
			if (CheckEmpty())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
			//1050206	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			CheckDate();
			if (CheckEmpty())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			//1050206	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1020606	Jagle	[1020275]	增加匯出EXCEL功能
		case "btExcel":
			CheckDate();
			if (CheckEmpty())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			//1050206	Joe	1050087	二代系統升級
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
	//102.08.13	SKY		1020643	[台北大學]新增承辦單位二級單位下拉式選單
	document.all["H_Dept"].value = document.all["dlUnit_Text"].value;
	document.all["H_Sect"].value = document.all["dlUnit_Sect_Text"].value;
	document.all["H_Dept_Value"].value = akjf_GetSelectValue(document.all["dlUnit"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = akjf_GetSelectValue(document.all["dlUnit_Sect"],document.all["H_Sect"].value);
	document.all["H_dlSect_Value"].value = akjf_SaveCurrDL(document.all["dlUnit_Sect"]);
	//102.08.13	SKY		1020643	[台北大學]新增承辦單位二級單位下拉式選單
	dlDept_Text_onblur();//重刷頁面都會再帶回二級單位的下拉選單
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

function CheckDate()
{
	var temp;
	if((parseFloat(document.all.txSDate.value)) > (parseFloat(document.all.txEDate.value)))
	{
		temp = document.all.txSDate.value;
		document.all.txSDate.value = document.all.txEDate.value;
		document.all.txEDate.value = temp;
	}
	if(document.all.txSDate.value == document.all.txEDate.value )
	{	
		if((parseFloat(document.all.txSHour.value)) > (parseFloat(document.all.txEHour.value)))
		{
			temp = document.all.txSHour.value;
			document.all.txSHour.value = document.all.txEHour.value;
			document.all.txEHour.value = temp;
		}
	}
}

function CheckEmpty()
{
	var IsValid   = true;
	var strErrMsg = "";
	
	if (document.all["txSDate"].value=="" || document.all["txEDate"].value=="")
	{
		strErrMsg += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["歸檔日期"]))+"\n";
		IsValid = false;
		if(document.all["txEDate"].value=="")
		{
			//1050206	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txEDate"].focus();
			$('#txEDate').focus();
		}
		if(document.all["txSDate"].value=="")
		{
			//1050206	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txSDate"].focus();
			$('#txSDate').focus();
		}
	}
	
	if (!IsValid)
	{
		jf_ShowMeg(strErrMsg,"");
	}
	return  IsValid;
}
/*****************************************************************************************
							其	他	共	用	function
******************************************************************************************/
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
			//1050206	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}
//HH 時間檢查
function CheckTicketTime(argObj,strMsg)
{
	var strTime = document.all[argObj].value;
	if (strTime != "")
	{
		strTime = jf_PADL(strTime,2,'0');
		document.all[argObj].value = strTime;
		if(parseInt(strTime) > 24 || parseInt(argObj.value) < 0)
		{
			//1050206	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		}
	}
}
/*************************************************
		測試程式
**************************************************/
function akjf_DeptCheck()
{}
function CheckCombobox()
{}
//102.08.13	SKY		1020643	無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
		//1050206	Joe	1050087	二代系統升級
		// document.all[argComboxID+"_Container"].className = "InputFieldText";
		document.all[argComboxID+"_Container"].className = "custom-combobox";
}
//102.08.13	SKY		1020643	dlDept onblur
function dlDept_Text_onblur()
{
	var bCheckOK = true;
	//存ComboBox_Text的value
	document.all["H_Dept"].value = document.all["dlUnit_Text"].value;
	//存所選擇的ComboBox項目的value
	document.all["H_Dept_Value"].value = akjf_GetSelectValue(document.all["dlUnit"],document.all["H_Dept"].value);
	//初始dlSect、dlUser的處理
	akjf_SetdlDept("dlUnit","dlUnit_Sect","","",false,false);
	//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
	document.all["H_dlSect_Value"].value = akjf_SaveCurrDL(document.all["dlUnit_Sect"]);
	//document.all["H_dlUser_Value"].value = akjf_SaveCurrDL(document.all["dlEmp"]);
	//依選項多寡固定下拉式選單可見長度
	SetdlLenth(document.all["dlUnit_Sect"]);
	//SetdlLenth(document.all["dlEmp"]);
	//無值不顯示
	jf_HandleComboxStatus("dlUnit_Sect");

	return bCheckOK;
}
//102.08.13	SKY		1020643	dlSect onblur
function dlSect_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理

	//存ComboBox_Text的value
	document.all["H_Sect"].value = document.all["dlUnit_Sect_Text"].value;
	//存所選擇的ComboBox項目的value
	document.all["H_Sect_Value"].value = akjf_GetSelectValue(document.all["dlUnit_Sect"],document.all["H_Sect"].value);

	return bCheckOK;
}
//102.08.13	SKY		1020643	調整COMBO BOX寬度
function SetdlLenth(argDLObj)
{
	if(argDLObj.options.length > 10)
		argDLObj.size = 10;
	else if(argDLObj.options.length ==1)
		argDLObj.size = 2;
	else
		argDLObj.size = argDLObj.options.length;
}