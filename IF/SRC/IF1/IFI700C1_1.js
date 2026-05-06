/* *
 * Date		SA			PG			MGR_NO		DESC
 * 1040204	Cloud		Gabby		1030930		(榮總)新增IFI700C1_1
 * 1051012  Kevin       Justin      1050087     二代公文修改
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
	1130716	Joe			Joe			序142		移除不使用之Resize
 * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
window.onunload = fnWinCloseProc;



//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	Page_BlockSubmit=true;
	switch (xObjectName)
	{
	}	
}

//1051012 Justin 1050087 二代公文修改 
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
	
    //1051012 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		    //1051012 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1051012 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1051012 Justin 1050087 二代公文修改 
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
	if( document.all.fileCount.value != "0")
	    document.all.fieldsetAtt.className = "";
    //1051012 Justin 1050087 二代公文修改
	//1130716	Joe		序142		移除不使用之Resize
	// $(window).trigger('resize');
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
    //1051012 Justin 1050087 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
}

function fnWinCloseProc()
{
	jf_SaveCookie("nIFI700C1_1", "");
}