/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1050407	   Kenny	1050087	二代公文系統相關修改
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
 
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050407	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
	
//1050407	Kenny	[1050087]   二代公文系統相關修改--Start--
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1050407	Kenny	[1050087]   二代公文系統相關修改--End--

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

//1050407	Kenny	[1050087]   二代公文系統相關修改
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
	
	//1050407	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
			Page_BlockSubmit = !CheckBeforePrint();
			//1050407	Kenny	[1050087]   二代公文系統相關修改
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
	//1050407	Kenny	[1050087]   MARK無用CODE--Start--
	//jf_CallWS("lib/OD_LIB.asmx","HelloWorld",false,null);
	//jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, null);
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
	//1050520	Kenny	[1050087]	二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
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

function CheckBeforePrint()
{
	var bRtn = true;
	var strDocNo = jf_Trim(document.all["txDocNo"].value);
	var strSDate = jf_Trim(document.all["txSDate"].value);
	var strEDate = jf_Trim(document.all["txEDate"].value);
	
	if (strDocNo + strSDate + strEDate == "")
	{
		bRtn = false;
		//1050520	Kenny	[1050087]	二代公文系統相關修改，調整focus改用JQuery寫法
		//document.all["txDocNo"].focus();
		$('#txDocNo').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公文文號與登錄日期不可皆為空白"])),"");
	}
	return bRtn;
}

//###########################################################################################
//				其		他		共		用		function
//###########################################################################################
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
			//1050520	Kenny	[1050087]	二代公文系統相關修改，調整focus改用JQuery寫法
			//document.all[argObj].focus();
			$('#'+argObj).focus();
		}
	}
}

function dlDEPT_Text_onblur()
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
}
