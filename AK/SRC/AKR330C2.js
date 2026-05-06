/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		 修改人	 單號       概要
 * -------------------------------------------------------------------------------------------------
 * 1060324   Joe	 1050087 	二代系統升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

document.all["btCalendarS"].disabled = false;
document.all["btCalendarE"].disabled = false;
document.all.txDate1.disabled = false;
document.all.txDate2.disabled = false;

//1060324	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1060324	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	
}

//1060324	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060324	Joe	1050087	二代系統升級
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
			//1060324	Joe	1050087	二代系統升級--S
			// case 'btCalendarS':
				// Page_BlockSubmit=true;
				// jf_CallCalendar(document.all["txDate1"], event.screenX, event.screenY);
				// break;
			// case 'btCalendarE':
				// Page_BlockSubmit=true;
				// jf_CallCalendar(document.all["txDate2"], event.screenX, event.screenY);
				// break;
			//1060324	Joe	1050087	二代系統升級--E
	}	
}

//1060324	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060324	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			setDefault();
			break;
		case "btSearch":
			if(!FormValid())
				Page_BlockSubmit = true;
			else
			{
				jf_ShowWaitState();
				IsServerHandling = true;
				Page_BlockSubmit = false;
			}
			//1060324	Joe	1050087	二代系統升級
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
	document.all[argLabelId].textContent = obj.value;
}
//1100204 Zen 1090927 取消使用document.activeElement//function ReturnValue()
function ReturnValue(argValue)
{
    if(opener.document.all.lbReturnValue.length !=0)
	{
		var oldlength = opener.document.all.lbReturnValue.length;
		for(i=0;i<oldlength;i++)
		{
			opener.document.all.lbReturnValue.remove(0);
		}
	}
    opener.document.all.lbReturnValue.length = 1;
    opener.document.all.lbReturnValue.options[0].text = "1";
    //1100204 Zen 1090927 取消使用document.activeElement    //opener.document.all.lbReturnValue.options[0].value = document.activeElement.textContent;
    opener.document.all.lbReturnValue.options[0].value = argValue;
    opener.window.CallBack("AKR330C2");
    close();
}

function CheckDate(obj)
{
	if(obj.value=="")
		return;
		
	var strDate = obj.value;
	 if (strDate!="")
	 {
	  if (strDate.length < 7)
	  {
		strDate = jf_PADL(strDate,7,'0');
		obj.value = strDate;
	  }
	  if(!jf_CheckCDATE(obj.value))
	  {
		var ErrName = new Array(1);
		ErrName[0] = "日期";
		alert(FormatStr(jf_GetErrMsg(InFormatErr2),ErrName));	
		//1060324	Joe	1050087	二代系統升級，調整focus寫法
		//obj.focus();
		$('#' + obj.id).focus();
	  }
	}
}

function FormValid()
{
	var fr = document.AKR330C2;
	var pRtnValue = true;
	if(fr.txDate1.value=="" && fr.txDate2.value=="")
	{
		pRtnValue = false;
		alert("點收日期不可為空白");
		//1060324	Joe	1050087	二代系統升級，調整focus寫法
		//fr.txDate1.focus();
		$('#' + fr.txDate1.id).focus();	
	}
	
	if(fr.txDate1.value!="" && fr.txDate2.value!="")
	{
		if(parseInt(fr.txDate1.value,10)>parseInt(fr.txDate2.value,10))
		{
			pRtnValue = false;
			alert("點收日期起不可以大於迄");
			//1060324	Joe	1050087	二代系統升級，調整focus寫法
			//fr.txDate1.focus();
			$('#' + fr.txDate1.id).focus();	
		}	
	}

	return pRtnValue;
}

function setDefault()
{
	var fr = document.AKR330C2;
	fr.txDate1.value = fr.Date1.value;
	fr.txDate2.value = fr.Date2.value;
	fr.all["dgDIV"].style.visibility = "hidden";
	//1060324	Joe	1050087	二代系統升級，調整focus寫法
	//fr.txDate1.focus();
	$('#' + fr.txDate1.id).focus();	
}

