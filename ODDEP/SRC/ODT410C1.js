/*
DATE		SA		PRG		MGR_NO	DESC
1031112	    Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1050825		Kevin	Joe		1050087	二代系統升級
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050825	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050825	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].innerText != "")
		// alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
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

//1050825	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1050825	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckCondition();
			//1050825	Joe	1050087	二代系統升級
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
}

function ReturnValue(argDocNo)
{
	try
	{
		opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].text = argDocNo;
		opener.window.CallBack("ODT410C1");
		close();
	}
	catch (e) {}
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
			//1050825	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();			
		}
	}
}

function dlDept_Onblur()
{
	if (odjf_CheckComboBox("dlDept"))
	{
		//值若變更時，觸動TextChange事件
		if (document.all["dlDept_Text"].value != document.all["H_Value"].value)
		{
			document.all["H_Change"].value = document.all["dlDept_Text"].value;
		    //__doPostBack();//for .NET Framework 1.0
		    //1031112    Kevin_C[1020726]   IsServerHandling = true;放在__doPostBack下面無效，交換順序
			IsServerHandling = true;
			jf_ShowWaitState();
			__doPostBack("", "");//for .NET Framework 1.1
		}
	} 
}

function CheckCondition()
{
	var strDept		= jf_Trim(document.all["dlDept_Text"].value);
	var strUser		= jf_Trim(document.all["dlUser_Text"].value);
	var strSDate	= jf_Trim(document.all["txSDate"].value);
	var strEDate	= jf_Trim(document.all["txEDate"].value);
	var strProp		= document.all["dlProperty"].options[document.all["dlProperty"].selectedIndex].text;
	var strWorkDays	= jf_Trim(document.all["txCount"].value);
	//if (strDept + strUser + strSDate + strEDate + strSubject + strProp + strWorkDays == "")
	if (strDept + strUser + strSDate + strEDate + strProp + strWorkDays == "")
	{
		//1050825	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txSDate"].focus();
		$('#txSDate').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少輸入一個條件"])),"");
		return false;
	}
	return true;
}

