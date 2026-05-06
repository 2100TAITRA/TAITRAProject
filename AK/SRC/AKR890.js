/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060220   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060220  Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060220  Justin [1050087] 二代公文修改
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

//1060220  Justin [1050087] 二代公文修改 
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
	
    //1060220  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
			if (CheckBeforePrint())
				Page_BlockSubmit = false;
			else
				Page_BlockSubmit = true;
		    //1060220  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btStatic":  //執行統計
			var xUrl = "AKP210.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"AKP210",760,500);
			Page_BlockSubmit = true;
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId=="AKP210")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
			if (strMaxUseDate == "")
				document.all["txMaxUseDate"].value = "您尚未執行過統計作業";			
			else
				document.all["txMaxUseDate"].value = "目前統計最大年月：" + 
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
		}
	}
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
    //1060220  Justin [1050087] 二代公文修改 
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

function CheckBeforePrint()
{
	var bRtnBool = false;
	bRtnBool = UnEmpty()
	return bRtnBool;
}

function UnEmpty()
{
	var oYear = document.all["txYear"];
	if (oYear.value == "")
	{
	    //1060220  Justin [1050087] 二代公文修改
	    //oYear.focus();
	    $('#' + oYear.id).focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["統計年度"])),"");
		return false;
	}
	return true;
}

function CheckYear()
{
	var strMaxYear = document.all["txMaxYear"].value;
	var strYear = document.all["txYear"].value;
	
	if (strYear > strMaxYear)
	{
	    //1060220  Justin [1050087] 二代公文修改
	    //document.all["txYear"].focus();
	    $('#txYear').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["統計年度不可大於最大統計年度"])),"");
		return false;
	}
	return true;
}