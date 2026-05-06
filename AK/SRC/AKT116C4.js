/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2016.08.15	Kevin_C	1050087	升二代
 * 2016.10.19	Joe		1050087	二代修正配合行動平台
 * 2024.09.30   Jason   1130941 航港局弱掃修正Reflected XSS Specific Clients
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050815	Kevin_C	1050087	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050815	Kevin_C	1050087	升二代
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();


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

//1050815	Kevin_C	1050087	升二代
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
	
	//1050815	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btDelete":
			//1050815	Kevin_C	1050087	升二代
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
	if (document.all["H_IsClose"].value != "")
	{
		document.all["H_IsClose"].value = "";
		//關閉視窗
		window.opener = parent;
		window.close();
	}
	//1130930   Jason   1130941     航港局弱掃修正Reflected XSS Specific Clients
	jf_SetDataMainDecode();
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
	//1050815	Kevin_C	1050087	升二代
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}
//1130930   Jason   1130941     航港局弱掃修正Reflected XSS Specific Clients--S
function jf_SetDataMainDecode() {
	var strTempTx = new Array("txReason", "txUser", "txDesc")
	for (var itx = 0; itx < strTempTx.length; itx++) {
		jf_htmlDecode(strTempTx[itx]);
	}
}
function jf_htmlDecode(argId) {
	var tempVal = document.all[argId].value;
	if (tempVal != "") {
		var div = document.createElement('div');
		div.innerHTML = tempVal;
		document.all[argId].value = div.textContent;
	}
}
//1130930   Jason   1130941     航港局弱掃修正Reflected XSS Specific Clients--S