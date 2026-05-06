/* DATE		SA			PRG		MGR_NO	DESC
 * 1070917  Kevin   	Joe     1050087 二代升級
 */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1070917	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1070917	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();		
}

//1070917	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1070917	Joe	1050087	二代系統升級
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

//1070917	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1070917	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
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
			//1070917	Joe	1050087	二代系統升級
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
				document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			}
			else
			{
				document.all["lbMaxYear"].textContent = "目前統計最大年月："+
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
				//iris 修改檢核列印月份不可大於目前統計月份之欄位
				document.all["h_txYM"].textContent =strMaxUseDate;
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
	var strMax = jf_Trim(document.all["txYearMonth"].value);
	if (strSMon + strEMon == "")
	{
		bRtn = false;
		//1070917	Joe	1050087	二代系統升級
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
			//1070917	Joe	1050087	二代系統升級
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}