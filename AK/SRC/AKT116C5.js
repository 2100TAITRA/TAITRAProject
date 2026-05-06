/*
Date	SA		PRG		MGR_NO		DESC	
1040212 Cloud	Gabby	1040075		因應AKT116點收時需顯示密等及展期資訊，新增AKT116C5
1130819 Cloud   Jason   中榮序74    升級二代
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
var IsRtnOpener=false;
//1130819   Jason   中榮序74    升級二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
window.onunload = jf_WindowOnUnLoad;


function ShowMsg()
{
	//1130819   Jason   中榮序74    升級二代
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator()
}
//1130819   Jason   中榮序74    升級二代
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
	//1130819   Jason   中榮序74    升級二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btCheck":
		window.close();
		break;
	}
}

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
	//1130819   Jason   中榮序74    升級二代
	if (!document.all["dg2"]) {
		document.all["MainTableDG2"].className = "hide";
	}
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function ReturnValue()
{

}

function jf_WindowOnUnLoad()
{

}
//1130819   Jason   中榮序74    升級二代
//function ClientButtonControl()
function ClientButtonControl(e)
{
	if(!IsServerHandling)
	{
		//1130819   Jason   中榮序74    升級二代
		//var xObjectName = document.activeElement.id;
		var xObjectName = e.target.id;

		switch (xObjectName)
		{
			//case "btPrint": 
		}
	}
}