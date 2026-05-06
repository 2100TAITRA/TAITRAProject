/*
DATE	SA		PRG		MGR_NO			DESC
1060321 Cloud   Zen     1050087         二代公文修改1100204 Leslie  Zen     1090927         取消使用document.activeElement*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060321 Zen 1050087 二代公文修改//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1060321 Zen 1050087 二代公文修改//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1100204 Zen 1090927 取消使用document.activeElement//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;

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

//1060321 Zen 1050087 二代公文修改//function jf_ToolBarHandle()
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
	
    //1060321 Zen 1050087 二代公文修改	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		    //1060321 Zen 1050087 二代公文修改		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1060321 Zen 1050087 二代公文修改		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1060321 Zen 1050087 二代公文修改		    //jf_ToolBarSubmit();
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


//1060321 Zen 1050087 二代公文修改//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
//{
//	var index	= document.all[argDDLId].selectedIndex;
//	var obj		= document.all[argDDLId].options[index];
	
//	document.all[argTextBoxId].value = obj.text;
//	document.all[argLabelId].innerText = obj.value;
//}
function ReturnValue(strServerNo,strServerName,strCpuName,strIP)
{
    opener.document.all.lbReturnValue.length = 2;
    opener.document.all.lbReturnValue.options[0].text  = strServerNo;
    opener.document.all.lbReturnValue.options[0].value = strServerName;
    //opener.document.all.lbReturnValue.options[1].text  = strCpuName;
    //opener.document.all.lbReturnValue.options[1].value = strIP;
    opener.window.CallBack("DFM310C1");
    window.close();
}
