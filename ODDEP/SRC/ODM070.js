/*
DATE 	SA		PRG		MGR_NO	DESC
1050414	David	Joe		1050087 二代系統升級
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050414	Joe	1050087	二代系統升級
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050414	Joe	1050087	二代系統升級
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

//1050414	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1050414	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050414	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			IsServerHandling = true;
			jf_ShowWaitState();	
			Page_BlockSubmit = false;
			//1050414	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050414	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050414	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function ClientOnLoad()
{
	ShowMsg();
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
}
