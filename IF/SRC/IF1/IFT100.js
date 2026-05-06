/*
單號		SA		PRG		DATE		DESC
1050087		Kevin	Joe		1050822		二代升級
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

// 1050822 Joe 1050087 二代系統修改 --S
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

// if (document.all["ValidationSummary1"].innerText != "")
	// alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
// 1050822 Joe 1050087 二代系統修改 --E

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

// 1050822 Joe 1050087 二代系統修改，傳入參數event
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
	
	//1050822 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btUpdateOrgInfo":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050822 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	if(document.all.AlertMsg != null)
		alert(document.all.AlertMsg.value);
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}



