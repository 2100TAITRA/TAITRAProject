/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 祘Αэ菌祘 
 * -------------------------------------------------------------------------------------------------
 * ら戳		э	虫腹	阀璶
 * -------------------------------------------------------------------------------------------------
 * 1060615	Joe		1050087	ど
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060615	Joe	1050087	╰参ど--S
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

// if (document.all["ValidationSummary1"].innerText != "")
	// alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1060615	Joe	1050087	╰参ど--E

//1060615	Joe	1050087	╰参ど
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060615	Joe	1050087	╰参ど
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

//1060615	Joe	1050087	╰参ど肚把计event
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
	
	//1060615	Joe	1050087	╰参ど
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			//1060615	Joe	1050087	╰参ど
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1060615	Joe	1050087	╰参ど
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1060615	Joe	1050087	╰参ど
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
	//1060615	Joe	1050087	╰参ど
	// document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function ReturnValue(argRptNo)
{
    opener.document.all.lbReturnValue.length = 1;
    opener.document.all.lbReturnValue.options[0].text = argRptNo;
    opener.document.all.lbReturnValue.options[0].value = "";
    opener.window.CallBack("AKT900C3");
    close();
}

//############################################################################################
//					ㄤ						ノ		function
//############################################################################################
//ら戳onblur
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
			//1060615	Joe	1050087	╰参ど
			//document.all[argObj].focus();
			$('#' + argObj).focus();			
		}
	}
}