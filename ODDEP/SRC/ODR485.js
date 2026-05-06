/*
 * DATE 	SA		PRG		MGR_NO	    DESC
 * 1050519  Kevin   Justin   1050087    二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050519 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    /*1050519 Justin 1050087 二代公文修改 
	if (document.all["ValidationSummary1"].innerText != "")
	    alert(document.all["ValidationSummary1"].innerText);*/
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

//1050519 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	document.all.tbTool.focus();
	if (!CheckCDATE("txSDate") || !CheckCDATE("txEDate"))
		return;

	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1050519 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
		    //1050519 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
		    //1050519 Justin 1050087 二代公文修改 
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

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function ReturnValue()
{
}

//列印前檢查
function CheckBeforePrint()
{
	var strSDate = jf_Trim(document.all.txSDate.value);
	var strEDate = jf_Trim(document.all.txEDate.value);
	if (strSDate == "" && strEDate == "")
	{
	    /*1050519 Justin 1050087 二代公文修改
	    document.all.txSDate.focus();*/
	    $('#txSDate').focus();
		alert("列印日期起訖不可同時為空白。");
		return false;
	}
	/*
	else
	{
		if (strSDate != "")
		{
			strSDate = jf_PADL(strSDate,7,'0');
			document.all.txSDate.value = strSDate;
			if (!jf_CheckCDATE(strSDate))
			{
				document.all.txSDate.focus();
				alert("列印日期(起)格式錯誤。");
				return false;
			}
		}
		if (strEDate != "")
		{
			strEDate = jf_PADL(strEDate,7,'0');
			document.all.txEDate.value = strEDate;
			if (!jf_CheckCDATE(strEDate))
			{
				document.all.txEDate.focus();
				alert("列印日期(訖)格式錯誤。");
				return false;
			}
		}
	}
	*/
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
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    /*1050519 Justin 1050087 二代公文修改
			document.all[argObj].focus();*/
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}
