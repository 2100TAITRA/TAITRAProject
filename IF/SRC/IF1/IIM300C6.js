/*
DATE		SA		PRG		單號		DESC
1050726     Kevin   Kenny   1050087     二代公文系統相關修改
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050726	Kenny   [1050087]	二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050726	Kenny   [1050087]	二代公文系統相關修改--Start--
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
    //1050726	Kenny   [1050087]	二代公文系統相關修改--End--
}

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

//1050726	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050726	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
        //1050726	Kenny   [1050087]	二代公文系統相關修改；移除無用code--Start--
		//case "btSearch":
		//	jf_ToolBarSubmit();
		//	break;
		//case "btPrint":
		//	Page_BlockSubmit = !jf_ConfirmPrint();
		//	jf_ToolBarSubmit();
		//	break;
		//case "btPreview":
		//	Page_BlockSubmit = !jf_ConfirmPreview();
		//	jf_ToolBarSubmit();
		//	break;
        //1050726	Kenny   [1050087]	二代公文系統相關修改；移除無用code--End--
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			break;
		case "btSave":
			Page_BlockSubmit=false;
			//1050726	Kenny   [1050087]	二代公文系統相關修改
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

//1050726	Kenny   [1050087]	二代公文系統相關修改；移除無用code--Start--
//function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
//{
//	var index	= document.all[argDDLId].selectedIndex;
//	var obj		= document.all[argDDLId].options[index];
//	
//	document.all[argTextBoxId].value = obj.text;
//	document.all[argLabelId].innerText = obj.value;
//}
//1050726	Kenny   [1050087]	二代公文系統相關修改；移除無用code--End--

function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}


