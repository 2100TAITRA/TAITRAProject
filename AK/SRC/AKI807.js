/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1050629	Kevin	Kevin_C	1050087		升級二代公文系統
 * 1051019 Leslie  Joe		1050087		二代修正配合行動平台
*/
//1020524	Cloud	1020288	AKI807增加超連結可開啟AKI802
var IsServerHandling = new Boolean();
IsServerHandling = false;

function ShowMsg()
{
	//1050705	Kevin_C	1050087			升級二代公文系統
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}


//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
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

//1050705	Kevin_C	1050087			升級二代公文系統
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
	
	//1050705	Kevin_C	1050087			升級二代公文系統
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			//1050705	Kevin_C	1050087			升級二代公文系統
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1050705	Kevin_C	1050087			升級二代公文系統
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1050705	Kevin_C	1050087			升級二代公文系統
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

}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

//1050705	Kevin_C	1050087			升級二代公文系統
//function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
//{
//	var index	= document.all[argDDLId].selectedIndex;
//	var obj		= document.all[argDDLId].options[index];
//	document.all[argTextBoxId].value = obj.text;
//	document.all[argLabelId].innerText = obj.value;
//}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}
//1020524	Cloud	1020288	AKI807增加超連結可開啟AKI802-START
function jf_DETAIL(argSEQ_NO)
{
    jf_OpenDetDocWin("AKI802.ASPX?gRecNo="+String(argSEQ_NO)+"&argFrom=AKI807&DOC_CHECK=0&gRecCtn="+document.all.txRecCtn.value+"&gTotPage=1&gPageSize=1");
}
function jf_OpenDetDocWin(sUrl)
{
  DetDocWin = open(sUrl,"SumDocWin","fullscreen=no,Height="+String(window.screen.height-54)+",Width="+String(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
  DetDocWin.focus();
}
//1020524	Cloud	1020288	AKI807增加超連結可開啟AKI802-END

