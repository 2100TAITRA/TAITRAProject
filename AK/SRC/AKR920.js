/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1060317 	Cloud 	Joe		1050087 	二代系統升級
 */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060217	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060217	Joe	1050087	二代系統升級
// if (document.all["ValidationSummary1"].textContent != "")
	// alert(document.all["ValidationSummary1"].textContent);
jf_ShowValidator();	

//1060217	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060217	Joe	1050087	二代系統升級
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

//1060217	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060217	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
			if(!ChkDate(document.all.txYear.value))
			{
				Page_BlockSubmit = true;
				//1060217	Joe	1050087	二代系統升級，調整focus寫法
				//document.all.txYear.focus();
				$('#' + document.all.txYear.id).focus();
				return;
			}
			else
				Page_BlockSubmit = false;
			//1060217	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();	
			//1060217	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txYear"].focus();
			$('#txYear').focus();
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

function ChkDate(argYear)
{
	if( argYear == "")
	{
		jf_ShowMeg("年度不可空白!","輸入年度有誤");
		return false;
	}

	var strYear = jf_PADL(argYear,3,"0");
	
	//年度不可小於最小可統計年度
	if( strYear < document.all.laMinCalcYear.textContent )
	{
		jf_ShowMeg("年度不可小於最小可統計年度!","輸入年度有誤");
		return false;
	}
	
	//年度不可大於目前最大統計年度
	if( strYear > document.all.laMaxYearNow.textContent && document.all.laMaxYearNow.textContent != "")
	{
		jf_ShowMeg("尚未完成 "+ strYear + " 年度典藏量統計，無法列印 "+ strYear +" 年度之年度檔案數量分析表。請先執行檔案典藏數量統計作業。","輸入年度有誤");
		return false;
	}
	return true;	
}

//**********************OnBlur() Exit Trigger*****************************
function txYearExit()
{
	if(document.all.txYear.value=="") return;
	document.all.txYear.value = jf_PADL(document.all.txYear.value,3,"0");
	var InputDate=document.all.txYear.value+"0101";
    if(!jf_CheckCDATE(InputDate))
	{
		jf_ShowMeg("請輸入正確日期範圍(000-999)","輸入格式錯誤");
		//1060217	Joe	1050087	二代系統升級，調整focus寫法
		//document.all.txYear.focus();
		$('#' + document.all.txYear.id).focus();
	}	
}