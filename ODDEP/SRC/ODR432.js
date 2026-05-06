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
		//1070917	Joe	1050087	二代系統升級--S
		// case "btSDate":
			// Page_BlockSubmit = true;
			// jf_CallCalendar(document.all.txSMon, event.screenX, event.screenY);
			// if(document.all.txSMon.value.length>5)
				// document.all.txSMon.value = document.all.txSMon.value.substring(0,5);
			// break;
		// case "btEDate":
			// Page_BlockSubmit = true;
			// jf_CallCalendar(document.all.txEMon, event.screenX, event.screenY);
			// if(document.all.txEMon.value.length>5)
				// document.all.txEMon.value = document.all.txEMon.value.substring(0,5);
			// break;
		//1070917	Joe	1050087	二代系統升級--E
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
	//1070917	Joe	1050087	二代系統升級
	// document.all[argLabelId].innerText = obj.value;
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
		//1070917	Joe	1050087	二代系統升級
		// document.all["txSMon"].focus();
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
		}
		if(strDate.length > 5)
		{
		   strDate = strDate.substr(0,5);
		}
		if (!jf_CheckCDATE(strDate + "01"))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1070917	Joe	1050087	二代系統升級
			// document.all[argObj].focus();
			$('#' + argObj).focus();
		}
		document.all[argObj].value = strDate;
		
	}
}

function CheckDays(argObj)
{
   var strDays = document.all[argObj].value;
   var arDays = strDays.split(".");
   if(arDays[1] != "5" && arDays[1] != null){   
      jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["辦理天數格式不對，單位最小為半天(0.5)"])),"");
		//1070917	Joe	1050087	二代系統升級
      // document.all[argObj].focus();
		$('#' + argObj).focus();
   }
}

function FocusDay(argObj)
{
	if(argObj=="txMinDay"||argObj=="txMaxDay")
	{
		document.all["rbDateInterval"].checked = true;
		document.all["rbDateOnly"].checked = false;
	}
	else
	{
		document.all["rbDateInterval"].checked = false;
		document.all["rbDateOnly"].checked = true;
	}
}
