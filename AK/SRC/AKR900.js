/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2007.04.11
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1090326	Kevin_C	1090183	新增程式
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

jf_ShowValidator();

function ClientButtonControl(e)
{
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
	
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":  //執行統計
			var xUrl = "AKP210.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl, "AKP210", 760, 500);
			Page_BlockSubmit = true;
			break;
		case "btPreview":
		case "btExcel":
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
}

function OnWSResult(argResult)
{
    
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
	var strErrMsg = "";
	if (document.all["txYear"].value == "")
	{
		$('#txYear').focus();
		strErrMsg = "統計年度不可空白" + "\n" + strErrMsg;
	}
	if (strErrMsg != "")
	{
		bRtnBool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
	}
	else
		bRtnBool = true;

	return bRtnBool;
}

/*****************************************************************************************
							其	他	共	用	function
******************************************************************************************/
//日期onblur
function CheckYear(argObj, strMsg)
{
	var strYear = document.all[argObj].value;
	if (strYear != "")
	{
		if (strYear.length < 3)
		{
			strYear = jf_PADL(strYear, 3, '0');
			document.all[argObj].value = strYear;
		}
	}
}