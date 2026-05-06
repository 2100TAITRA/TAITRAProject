/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1060321 	Cloud 	Joe		1050087 	二代系統升級
 */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060321	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060321	Joe	1050087	二代系統升級
var bChooseTab1 = new Boolean();
bChooseTab1 = true;

document.all["tbPort"].onkeydown = port_keydown;

function port_keydown()
{
	if(event.keyCode<48 || event.keyCode>57)
		event.returnValue='';
}

function ShowMsg()
{
	//1060321	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	
}


//1060321	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060321	Joe	1050087	二代系統升級
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

//1060321	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060321	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	Page_BlockSubmit = true;
	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit = false;
			//alert("程式名稱路徑不可空白!!");
			//1060321	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		/*
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit();
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit();
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit();
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			break;
		case "btSearch":
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			break;
		*/
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
	//1060321	Joe	1050087	二代系統升級
	// document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
//1060321	Joe	1050087	二代系統升級--S
///<summary>
///圖片切換 
///bChooseTab1：是否選擇Tab1
///<summary>
function Tab1onMouseMove()
{	
	if(!bChooseTab1)
		document.all.Tab1.src = "images/DFM100_IPara_h.gif";
}
function Tab2onMouseMove()
{	
	if(bChooseTab1)
		document.all.Tab2.src = "images/DFM100_OPara_h.gif";
}
function Tab1onMouseLeave()
{
	if(bChooseTab1)
		document.all.Tab1.src = "images/DFM100_IPara_p.gif";
	else
		document.all.Tab1.src = "images/DFM100_IPara_o.gif";
}
function Tab2onMouseLeave()
{
	if(!bChooseTab1)
		document.all.Tab2.src = "images/DFM100_OPara_p.gif";
	else
		document.all.Tab2.src = "images/DFM100_OPara_o.gif";
}
function Tab1onClick()
{
	document.all.Tab1.src = "images/DFM100_IPara_p.gif";
	document.all.Tab2.src = "images/DFM100_OPara_o.gif";
	document.all.Page1.className = "";
	document.all.Page2.className = "hide";
	bChooseTab1 = true;
}
function Tab2onClick()
{
	document.all.Tab1.src = "images/DFM100_IPara_o.gif";
	document.all.Tab2.src = "images/DFM100_OPara_p.gif";
	document.all.Page1.className = "hide";
	document.all.Page2.className = "";
	bChooseTab1 = false;
}
//1060321	Joe	1050087	二代系統升級--E

