/*
DATE	SA		PRG		MGR_NO			DESC
1060425	Cloud	Joe		1050087			二代系統升級
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060425	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1060425	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].innerText != "")
		// alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();	
}

//1060425	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060425	Joe	1050087	二代系統升級
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

//1060425	Joe	1050087	二代系統升級，傳入參數event
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

	//1060425	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			break;
		case "btSearch":
		case "btPrint":
		case "btPreview":
		if(document.all.txEntryDateS.value==""&& document.all.txEntryDateE.value=="")
		{
		  alert("異動日期不可為空白!!");Page_BlockSubmit = true;
			//1060425	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txEntryDateS.focus();
			$('#' + document.all.txEntryDateS.id).focus();
		}else
		{
		Page_BlockSubmit = false;
		}
		//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);	
			break;
	}
}
function CheckDateS()
{
	var strDateValue ;
	strDateValue = document.all.txEntryDateS.value;
	if (strDateValue == "")
	{  
	return;
	}
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all.txEntryDateS.value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["異動日期"])),"");
		//1060425	Joe	1050087	二代系統升級，調整focus寫法
		//document.all.txEntryDateS.focus();
		$('#' + document.all.txEntryDateS.id).focus();
	}
}
function CheckDateE()
{
	var strDateValue ;
	strDateValue = document.all.txEntryDateE.value;
	if (strDateValue == "")
	{  
	return;
	}
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all.txEntryDateE.value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["異動日期"])),"");
		//1060425	Joe	1050087	二代系統升級，調整focus寫法
		//document.all.txEntryDateE.focus();
		$('#' + document.all.txEntryDateE.id).focus();
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


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1060425	Joe	1050087	二代系統升級
	// document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

