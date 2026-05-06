/*
DATE	SA		PRG		MGR_NO			DESC
1051021	David	David	1050087			新增PinCode輸入視窗
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

function ShowMsg()
{
	jf_ShowValidator();
}

function ClientButtonControl(e)
{
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
		case "btSave":
			Page_BlockSubmit = true;
			DlgCallBack("1", document.all.txPinCode.value);
			DlgClose();	
			break;
		case "btCancel":
			Page_BlockSubmit = true;
			DlgCallBack("0", "");
			DlgClose();	
			break;
	}	
}

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

	xObjectName = event.target.id;

	switch (xObjectName)
	{
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
	document.all[argLabelId].innerText = obj.value;
}

function ReturnValue(argBTypeNo, argBTypeName)
{
    opener.document.all.lbReturnValue.length = 2;
    opener.document.all.lbReturnValue.options[0].text = argBTypeNo;
    opener.document.all.lbReturnValue.options[1].text = argBTypeName;
    opener.window.CallBack("ODI310");
    opener.window.focus();
    close();
}
