/*
 * 1050601 Kevin    Zen     1050087	二代公文修改
 * 1060518 Leslie  Zen     1060215  innerText相關修改 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050601 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050601 Zen 1050087 二代公文修改--begin
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
    //1050601 Zen 1050087 二代公文修改--end
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
//1050601 Zen 1050087 二代公文修改
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
	
    //1050601 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":  //執行統計
			var xUrl = "ODP420.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"ODP420",760,500);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
		case "btPreview":
			Page_BlockSubmit = !CheckBeforePrint();
		    //1050601 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId=="ODP420")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
			if (strMaxUseDate == "")
			{
			    //1060518 Zen 1060215 innerText相關修正			    //document.all["lbMaxYear"].innerText = "您尚未執行過統計作業";
			    document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			}
			else
			{
			    //1060518 Zen 1060215 innerText相關修正			    //document.all["lbMaxYear"].innerText = "目前統計最大年月：" +
			    document.all["lbMaxYear"].textContent = "目前統計最大年月：" +
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
				//iris 修改檢核列印月份不可大於目前統計月份之欄位
			    //1060518 Zen 1060215 innerText相關修正			    //document.all["h_txYM"].innerText = strMaxUseDate;
			    document.all["h_txYM"].value = strMaxUseDate;
			}
		}
	}
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

function CheckBeforePrint()
{
	var bRtn = true;
	var strSMon = jf_Trim(document.all["txSMon"].value);
	var strEMon = jf_Trim(document.all["txEMon"].value);
	if (strSMon + strEMon == "")
	{
		bRtn = false;
	    //1050601 Zen 1050087 二代公文修改
		//document.all["txSMon"].focus();
		$('#txSMon').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["列印月份不可皆為空白"])),"");
	}
	return bRtn;
}

//###########################################################################################
//				其		他		共		用		function
//###########################################################################################
//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 5)
		{
			strDate = jf_PADL(strDate,5,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate + "01"))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    //1050601 Zen 1050087 二代公文修改
			//document.all[argObj].focus();
			$('#'+argObj).focus();
		}
	}
}