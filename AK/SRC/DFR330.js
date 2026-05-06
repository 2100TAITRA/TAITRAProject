/*
DATE 	SA		PRG		MGR_NO		DESC
1060426	Cloud	Joe		1050087 	二代系統升級
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060426	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1060426	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].innerText != "")
		// alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();	
}

//1060426	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060426	Joe	1050087	二代系統升級
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

//1060426	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060426	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		
		case "btPrint":
		case "btPreview":
		    if(document.all.txVolumeS.value =="" && document.all.txVolumeE.value=="")
		    {
			Page_BlockSubmit = true;
			alert("電子媒體編號起始欄位和訖止欄位至少輸入一項!!");
			//1060426	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txVolumeS.focus();
			$('#' + document.all.txVolumeS.id).focus();
			}else
			{
			Page_BlockSubmit = false;
			}
			//1060426	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
	}
}

function CallBack(argCallerId)
{

}
function CheckVolume()
{
 if(document.all.txVolumeS.value !="" && document.all.txVolumeE.value=="")
 {
   document.all.txVolumeE.value=document.all.txVolumeS.value;
 }
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
	//1060426	Joe	1050087	二代系統升級
	// document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

