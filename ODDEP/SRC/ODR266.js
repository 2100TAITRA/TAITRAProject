/*
DATE    SA		PRG		MGR_NO	DESC
1050526 Kevin   Zen     1050087 二代公文修改
1060518 Leslie  Zen     1060215 innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050526 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050526 Zen 1050087 二代公文修改--begin
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1050526 Zen 1050087 二代公文修改--end

//function ClientButtonControl()
function ClientButtonControl(e)
{
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
//1050526 Zen 1050087 二代公文修改
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

    //1050526 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1050526 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1050526 Zen 1050087 二代公文修改
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

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
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

//月份onblur
function CheckMonth(argObj,strMsg)
{
	var strMonth = document.all[argObj].value;
	if (strMonth != "")
	{
		if (strMonth.length < 5)
		{
			strMonth = jf_PADL(strMonth,5,'0');
			document.all[argObj].value = strMonth;
		}
		if (!jf_CheckCDATE(strMonth+"01"))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    //1050526 Zen 1050087 二代公文修改
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}