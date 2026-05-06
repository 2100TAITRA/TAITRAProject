/*
DATE 	SA		PRG		MGR_NO	DESC
1050909	David	Kenny	1050087 二代公文系統相關修改
1110319	David	Joe		1101416	依系統參數修改回閱名稱
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050909	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050909	Kenny	[1050087]   二代公文系統相關修改
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

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

//1050909	Kenny	[1050087]   二代公文系統相關修改
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
	
	//1050909	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	switch (xObjectName)
	{
        //1050909	Kenny	[1050087]   二代公文系統相關修改；移除無用CODE--Start--
		//case "btSearch":
		//	Page_BlockSubmit = !CheckCondition();
		//	jf_ToolBarSubmit();
		//	break;
		//case "btPrint":
		//case "btPreview":
		//	Page_BlockSubmit = !CheckCondition();
		//	jf_ToolBarSubmit();
		//	break;
        //1050909	Kenny	[1050087]   二代公文系統相關修改；移除無用CODE--End--
		case "btSave":
			Page_BlockSubmit =  false;
			//1050909	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;

	}
}

//1050909	Kenny	[1050087]   二代公文系統相關修改；移除無用CODE--Start--
//function Inspect(argRecent,argDays)
//{
//	if(argRecent.checked)
//	{
//		var val = jf_Trim(argDays.value);
//		if(val=="")
//		{
//			if(Page_BlockSubmit==false)
//			{
//				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請先輸入天數設定值"])),"");	
//				argDays.focus();
//				Page_BlockSubmit =  true;
//			}
//		}
//	}	
//}
//1050909	Kenny	[1050087]   二代公文系統相關修改；移除無用CODE--End--


function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	ShowMsg();
	//1110319	Joe		1101416		依系統參數修改回閱名稱
	if (document.all.RESIGN_SUBFOLDER.value != "")
	{
		document.title = document.title.replace("回閱", document.all.RESIGN_SUBFOLDER.value);
		document.all.Label1.textContent = document.all.Label1.textContent.replace("回閱", document.all.RESIGN_SUBFOLDER.value);
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
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}


/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
//1050909	Kenny	[1050087]   二代公文系統相關修改；移除無用CODE--Start--
//function CheckCDATE(argObj,strMsg)
//{
//	var strDate = document.all[argObj].value;
//	if (strDate != "")
//	{
//		if (strDate.length < 7)
//		{
//			strDate = jf_PADL(strDate,7,'0');
//			document.all[argObj].value = strDate;
//		}
//		if (!jf_CheckCDATE(strDate))
//		{
//			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
//			document.all[argObj].focus();
//		}
//	}
//}
//1050909	Kenny	[1050087]   二代公文系統相關修改；移除無用CODE--End--