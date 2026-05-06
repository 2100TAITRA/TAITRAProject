/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060224   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060224  Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060224  Justin [1050087] 二代公文修改
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

//1060224  Justin [1050087] 二代公文修改 
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
	
    //1060224  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":
			var xUrl = "AKP210.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"AKP210",760,500);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
		case "btPreview":
			Page_BlockSubmit = !CheckBeforePrint();
		    //1060224  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
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
  			    //1060224  Justin [1050087] 二代公文修改
			    //document.all["lbMaxYear"].innerText = "您尚未執行過統計作業";
  			    document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			else
			    //document.all["lbMaxYear"].innerText = "目前統計最大年月：" + 
  			    document.all["lbMaxYear"].textContent = "目前統計最大年月：" +
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
    //1060224  Justin [1050087] 二代公文修改
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

/*=========================================================================
			Function Click
=========================================================================*/
function CheckBeforePrint()
{
	var bRtn = true;
	if (document.all["txYear"].value == "")
	{
		bRtn = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["統計年度"])),"");
		document.all["txYear"].focus();
	}
	return bRtn;
}