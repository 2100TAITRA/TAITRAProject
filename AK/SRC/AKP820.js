/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1060307		Kevin_C	1050087	升二代
 * 1090429      Cloud   1080479 新增調案公文急用催還通知及待稽催公文清單及匯出excel功能 * 1100204      Zen     1090927 取消使用document.activeElement
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060306	Kevin_C	1050087	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060306	Kevin_C	1050087	升二代
//if (document.all["ValidationSummary1"].innerText != "")
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
        //1090429      Cloud   1080479 新增調案公文急用催還通知及待稽催公文清單，按鈕移至toolBar
        //case "btRun":
        //	Page_BlockSubmit = !CheckBeforeRun();							
        //	break;
        //case "btExit":
        //	window.close();
        //	Page_BlockSubmit=true;
        //	break;		
    }

    //1090429      Cloud   1080479 新增調案公文急用催還通知及待稽催公文清單，按鈕移至toolBar
    //if (!Page_BlockSubmit)
    //{
    //	IsServerHandling = true;
    //	jf_ShowWaitState();
    //	__doPostBack("btRun", "");
    //}
}

//1060306	Kevin_C	1050087	升二代
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
	
	//1060306	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
        //1090429      Cloud   1080479 新增調案公文急用催還通知及待稽催公文清單及匯出excel功能
        //case "btSearch":
        //	//1060306	Kevin_C	1050087	升二代
        //	//jf_ToolBarSubmit();
        //	jf_ToolBarSubmit(xObjectName);
        //	break;
        //case "btPrint":
        //	Page_BlockSubmit = !jf_ConfirmPrint();
        //	//1060306	Kevin_C	1050087	升二代
        //	//jf_ToolBarSubmit();
        //	jf_ToolBarSubmit(xObjectName);
        //	break;
        case "btExecute":
		case "btPreview":
        case "btExcel":
            Page_BlockSubmit = !CheckBeforeRun();
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
	document.all[argLabelId].innerText = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function CheckBeforeRun()
{
    //1090429      Cloud   1080479 新增調案公文急用催還通知
    //if ((!document.all.cbInspFile.checked) && (!document.all.cbInspRtn.checked) && (!document.all.cbInspAtt.checked))//[950754]Add by Cola 新增稽催
    if ((!document.all.cbInspFile.checked) && (!document.all.cbInspRtn.checked) && (!document.all.cbInspAtt.checked) && (!document.all['cbNotifyRtn'].checked))
	{
		//1060306	Kevin_C	1050087	升二代
		//document.all.cbInspFile.focus();
		$('cbInspFile').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少需選擇一個稽催對象"])),"");		
		return false;
	}
	
	
	if(document.all.cbInspFile.checked)
	{
		if(document.all.txInspFile.value == "")
		{
			//1060306	Kevin_C	1050087	升二代
			//document.all.txInspFile.focus();
			$('txInspFile').focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["逾期天數"])),"");
			return false;
		}		
	}
	
	if(document.all.cbInspRtn.checked)
	{
		if(document.all.txInspRtn.value == "")
		{
			//1060306	Kevin_C	1050087	升二代
			//document.all.txInspRtn.focus();
			$('txInspRtn').focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["逾期天數"])),"");
			return false;
		}		
	}
	
	if(document.all.cbInspAtt.checked)
	{
		if(document.all.txInspAtt.value == "")
		{
			//1060306	Kevin_C	1050087	升二代
			//document.all.txInspAtt.focus();
			$('txInspAtt').focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["逾期天數"])),"");
			return false;
		}		
	}	
	
    //1090429      Cloud   1080479 新增調案公文急用催還通知及待稽催公文清單
    if (document.all['cbNotifyRtn'].checked && document.all['txNotifyDocNo'].value == '')
    {
        $('txNotifyDocNo').focus();
        jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["公文文號"])), "");
        return false;
    }


	return true;	
}


//0990429	Leslie[0990196]	增加畫面控制
function jf_cbInspFileClick(obj)
{
	if(document.all["cbWithSendOU"])
	{
		var cbWithSend = document.all["cbWithSendOU"];
		if(obj.checked)
		{
			cbWithSend.disabled = false;
		}
		else
		{
			cbWithSend.checked = false;
			cbWithSend.disabled = true;			
		}
	}
}