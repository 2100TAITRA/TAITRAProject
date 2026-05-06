/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2016.02.16   Joe		1050087 二代系統升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060215	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1060215	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	
}

//1060215	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060215	Joe	1050087	二代系統升級
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

//1060215	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060215	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			//1060215	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1060215	Joe	1050087	二代系統升級，移除無用CASE--S
		// case "btPrint":
			// Page_BlockSubmit = !jf_ConfirmPrint();
			// jf_ToolBarSubmit();
			// break;
		// case "btPreview":
			// Page_BlockSubmit = !jf_ConfirmPreview();
			// jf_ToolBarSubmit();
			// break;
		//1060215	Joe	1050087	二代系統升級，移除無用CASE--E
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
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue(argStoreNo,argStoreName)
{
    opener.document.all.lbReturnValue.length = 1;
    opener.document.all.lbReturnValue.options[0].text = argStoreName;
    opener.document.all.lbReturnValue.options[0].value =argStoreNo;
    opener.window.CallBack("AKM102C1");
    close();
}
