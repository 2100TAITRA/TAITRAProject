/*****************************************************************************************************
   程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2016.06.07	Kenny		1050087	二代公文系統相關修改
 1051019		Joe		1050087		二代修改配合行動平台
 ****************************************************************************************************/
 
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050607	Kenny   [1050087]	二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

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
	
	switch (xObjectName)
	{
		/*
		case "":
			break;
		*/
	}	
}

//1050607	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050607	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		
		case "btSave":
			Page_BlockSubmit = !jf_CheckKeyObject();
			Trim();
			//1050607	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
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
	//1050607	Kenny   [1050087]	二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
function Trim()
{	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		jf_Trim(document.all["dg1__ctl" + i + "_txKey"].value); 
	
		jf_Trim(document.all["dg1__ctl" + i + "_txDesc"].value);
	}	
}

