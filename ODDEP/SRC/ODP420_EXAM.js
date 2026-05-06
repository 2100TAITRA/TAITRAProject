/* DATE		SA			PRG		MGR_NO	DESC
 * 1010921	Kevin		Kevin	1010387 1.新增週時效統計2.新增依發文方式計算逾期件數3.新增紀錄展期相關欄位
 * 1050422	Kevin		Joe		1050087 二代系統升級
 * 1050520	KEVIN		JOE		1050087	二代系統升級，調整focus寫法
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050422	Joe	1050087	二代系統升級
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
window.onunload = jf_WindowOnUnLoad;

//1050422	Joe	1050087	二代系統升級
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();	

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
		//1050422	Joe	1050087	二代系統升級
		//1010921 Kevin 1010387 新增週時效統計
		/*case "btDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txDateE, event.screenX, event.screenY);
			break;
		*/
	}	
}


//1050422	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1050422	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		    if(jf_PrintCheck())
				//1050422	Joe	1050087	二代系統升級
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			//1050502	Joe	1050087	檢核沒過阻擋PostBack
			else
				Page_BlockSubmit=true;
			break;
		//1010921 Kevin 1010387 新增週時效統計
		case "btWeek":
			if(jf_BeforeWeek())
				//1050422	Joe	1050087	二代系統升級
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			//1050502	Joe	1050087	檢核沒過阻擋PostBack
			else
				Page_BlockSubmit=true;
			break;
	}
}

function CallBack(argCallerId)
{

}
function  jf_PrintCheck()
{
		if( document.all.txYearMonth.value == "" )
		{
			alert("請輸入統計月份．");
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txYearMonth.focus();
			$('#' + document.all.txYearMonth.id).focus();
			return false;
		}
		if( jf_CheckCDATE(document.all.txYearMonth.value + "01") == false )
		{
			alert("統計月份之格式不正確．(YYYMM)");
			Page_BlockSubmit = true;
			return false;
		}
		else	//0950606 Charles 進行可否統計檢核
		{
			if(document.all.hMaxMonth.value != "")
			{
				var year1 = parseInt(document.all.txYearMonth.value.substr(0,3));
				if(year1 == 0)
					year1 = parseInt(document.all.txYearMonth.value.substr(1,2));
				var month1 = parseInt(document.all.txYearMonth.value.substr(3,2));
				if(month1 == 0)
					month1 = parseInt(document.all.txYearMonth.value.substr(4,1));
				var year2 = parseInt(document.all.hMaxMonth.value.substr(0,3));
				if(year2 == 0)
					year2 = parseInt(document.all.hMaxMonth.value.substr(1,2));
				var month2 = parseInt(document.all.hMaxMonth.value.substr(3,2));
				if(month2 == 0)
					month2 = parseInt(document.all.hMaxMonth.value.substr(4,1));
					
				if(year1==year2 && month1==month2)
				{
					alert("欲進行統計月份已進行統計，請解除鎖定此月份資料後重新統計。");
					//1050520	Joe	1050087	二代系統升級，調整focus寫法
					//document.all.txYearMonth.focus();
					$('#' + document.all.txYearMonth.id).focus();
					return false;
				}
				if(year1<year2 || (year1==year2 && month1<month2))
				{
					alert("目前系統已統計至"+year2+"年"+month2+"月，歷史統計資料均已鎖定，無法進行重新統計。");
					//1050520	Joe	1050087	二代系統升級，調整focus寫法
					//document.all.txYearMonth.focus();
					$('#' + document.all.txYearMonth.id).focus();
					return false;
				}
				if(year1>year2 || (year1==year2 && month1>month2))
				{
					if(((year1-year2)*12-month2+month1)>1)
					{
						if(document.all.hMultiMonth==null)
						{
							alert("目前系統僅統計至"+year2+"年"+month2+"月，無法直接進行"+year1+"年"+month1+"月份之統計。");
							//1050520	Joe	1050087	二代系統升級，調整focus寫法
							//document.all.txYearMonth.focus();
							$('#' + document.all.txYearMonth.id).focus();
							return false;
						}
					}
				}
			}
		}
	return true;
}
function ClientOnLoad()
{
	//1050520	Joe	1050087	二代系統升級，調整focus寫法
	//document.all.txYearMonth.focus();
	$('#' + document.all.txYearMonth.id).focus();
	if(document.all.hDoIt.value == "ask")
	{
		var ans = window.confirm("您所設定之統計月份已執行過統計作業，重新設定將會\n影響" + document.all.txYearMonth.value + "及其後月份之統計記錄，是否確定要執行呢？");
		if(ans == true)
		{
			document.all.hDoIt.value = "DoIt";
			var o = document.all.tbTool.getItem(0);
			o.click();
		}
	}	
}

/*
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
*/

function ReturnValue()
{
    if (document.all["txMode"].value == "EXEC")
	{    
		opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].text = document.all["hMaxMonth"].value;
	    opener.document.all.lbReturnValue.options[0].value = document.all["hMaxMonth"].value;
	    opener.window.CallBack("ODP420");
	}
}

function jf_WindowOnUnLoad()
{
	ReturnValue();
}

//1010921 Kevin 1010387 新增週時效統計
function jf_BeforeWeek()
{
	if(document.all["txDateS"].value =="")
	{	
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["週統計日期(起)不可空白"]) ), "" );
		return false;
	}
	
	if(document.all["txDateE"].value =="")
	{	
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["週統計日期(迄)不可空白"]) ), "" );
		return false;
	}

	if(!CheckCDATE("txDateS","週統計日期(起)"))
		return false
	if(!CheckCDATE("txDateE","週統計日期(迄)"))
		return false
	
	if(document.all["txDateS"].value >= document.all["txDateE"].value)
	{	
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["週統計日期(迄)需大於起日"]) ), "" );
		return false;
	}

	return true;
}

//1010921 Kevin 1010387 新增週時效統計-檢核日期格式
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if(!jf_CheckCDATE(strDate))
		{
			if(strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");

			document.all[argObj].value = "";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}