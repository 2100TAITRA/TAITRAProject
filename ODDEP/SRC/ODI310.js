/*
DATE 	SA		PRG		MGR_NO	DESC
1050413	David	Joe		1050087 二代系統升級
//1050413	Joe	1050087	二代系統升級
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050413	Joe	1050087	二代系統升級
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050413	Joe	1050087	二代系統升級
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
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

//1050413	Joe	1050087	二代系統升級，傳入參數event
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

	//1050413	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id

	switch (xObjectName)
	{
		case "btSearch":
			//1050413	Joe	1050087	二代系統升級
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

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].innerText = obj.value;
}

function ReturnValue(argBTypeNo, argBTypeName)
{
    opener.document.all.lbReturnValue.length = 2;
    opener.document.all.lbReturnValue.options[0].text = argBTypeNo;
    opener.document.all.lbReturnValue.options[1].text = argBTypeName;
    opener.window.CallBack("ODI310");
    opener.window.focus();
    close();
}
