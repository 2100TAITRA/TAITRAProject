/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060411   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060411 Justin [1050087] 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1060411 Justin [1050087] 二代公文修改 
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060411 Justin [1050087] 二代公文修改
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

//1060411 Justin [1050087] 二代公文修改 
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
	
    //1060411 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	
		case "btPrint":
		    Page_BlockSubmit = false;
		    //1060411 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = false;
		    //1060411 Justin [1050087] 二代公文修改 
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
    //1060411 Justin [1050087] 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

