/*
DATE	SA		PRG		MGR_NO	DESC
1001129 Yvonne	Kevin	1000868	公文業務類別案件統計明細表
1120315 Leslie  Cloud   1120211 升級二代
*/

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1120315   Cloud   1120211 升級二代
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	rb_Detail_Stat_onclick();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1120315		Cloud	1120211		升級二代
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1120315		Cloud	1120211		升級二代
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

	if(IsServerHandling)
	   return;

	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	switch (xObjectName)
	{
	    //1120315   Cloud   1120211 升級二代
		/*case "btRcvDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txRcvDateS"], event.screenX, event.screenY);
			break;
		case "btRcvDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txRcvDateE"], event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1120315   Cloud   1120211 升級二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
    //1120315   Cloud   1120211 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
		    Page_BlockSubmit = !jf_ConfirmPrint();
		    //1120315   Cloud   1120211 升級二代
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function jf_ConfirmPrint()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if(jf_Trim(document.all.txYearMonthS.value)==""&&jf_Trim(document.all.txYearMonthE.value)=="")
	{
		jf_ShowMeg("列印月份欄位不可皆為空白。","");
		document.all.txYearMonthS.focus();
		return false;
	}
	
	if(!jf_CheckMonth("txYearMonthS"))
		return false;
	if(!jf_CheckMonth("txYearMonthE"))
		return false;
	if(!jf_CheckDate("txRcvDateS"))
		return false;
	if(!jf_CheckDate("txRcvDateE"))
		return false;

	document.all["H_BType"].value = jf_GetDLValue(document.all["dlBType"]);

	return bRtnbool;
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function jf_GetDLValue(argDLObj)
{
	if(argDLObj.selectedIndex == -1)
		return "";
	return argDLObj.options[argDLObj.selectedIndex].value;	
}

function dlDocPropertyOnChange()
{
	var strDPno = jf_GetDLValue(document.all["dlDocProperty"]);
	
	//清空業務類別選項
	document.all["dlBType"].options.length = 0;
	
	var optn = document.createElement("option");
	optn.text = "";
	optn.value = "";
	document.all["dlBType"].options.add(optn);
				
	if (strDPno != "")
	{
		//重新業務類別選項
		for(var i = 0; i < document.all["H_dlBTypeAll"].length; i++)
		{
			var strBTno = document.all["H_dlBTypeAll"].options[i].value.split("|");
			
			if (strDPno == strBTno[0])
			{
				var opt = document.createElement("option");
				opt.text = document.all["H_dlBTypeAll"].options[i].text;
				opt.value = strBTno[1];
				document.all["dlBType"].options.add(opt);
			}
		}
	}
}

//列印月份欄位Onblur時，自動補0以及檢查列印月份欄位是否符合格式
function jf_CheckMonth(argMonth)
{
	var bCheckM = true;
	var strMonth = jf_Trim(document.all[argMonth].value);
	if(strMonth != "")
	{
		if(strMonth.length < 5)
		{
			strMonth = jf_PADL(strMonth,5,"0");
			document.all[argMonth].value = strMonth;
		}
		if(strMonth>document.all["H_YearMonth"].value)
		{
			document.all[argMonth].value = "";
			document.all[argMonth].focus();
			bCheckM = false;
			alert("輸入的月份大於最大統計月份，請重新輸入");
		}
		if(!jf_CheckCDATE(strMonth + "01"))
		{
			document.all[argMonth].value = "";
			document.all[argMonth].focus();
			bCheckM = false;
			alert("輸入的月份格式錯誤，請重新輸入");
		}
	}
	return bCheckM;
}

//檢核日期
function jf_CheckDate(argDate)
{
	var bCheckM = true;
	var strDate = jf_Trim(document.all[argDate].value);
	if(strDate != "")
	{
		if(strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,"0");
			document.all[argDate].value = strDate;
		}
		if(!jf_CheckCDATE(strDate))
		{
			document.all[argDate].value = "";
			document.all[argDate].focus();
			bCheckM = false;
			alert("輸入的日期格式錯誤，請重新輸入");
		}
	}
	return bCheckM;
}

function rb_Detail_Stat_onclick()
{
	if(document.all.rbStat.checked)
	{
	    //1120315   Cloud   1120211 升級二代
		/*document.all["LabelRcvDate"].disabled = true;
		document.all["LabelRcvDate2"].disabled = true;
		document.all["txRcvDateS"].disabled = true;
		document.all["txRcvDateE"].disabled = true;
		
		document.all["LabelRcvDate"].className = "hide";
		document.all["LabelRcvDate2"].className = "hide";
		document.all["txRcvDateS"].className = "hide";
		document.all["txRcvDateE"].className = "hide";
		document.all["btRcvDateS"].className = "hide";
		document.all["btRcvDateE"].className = "hide";*/
	    document.all["dTDTitlecvDate"].className = "hide";
	    
	    document.all["txRcvDateS"].value = "";
	    document.all["txRcvDateE"].value = "";
	    
	}
	if(document.all.rbDetail.checked)
	{
		/*document.all["LabelRcvDate"].disabled = false;
		document.all["LabelRcvDate2"].disabled = false;
		document.all["txRcvDateS"].disabled = false;
		document.all["txRcvDateE"].disabled = false;
		
		document.all["LabelRcvDate"].className = "InputFieldText";
		document.all["LabelRcvDate2"].className = "InputFieldText";
		document.all["txRcvDateS"].className = "InputFieldNumeric";
		document.all["txRcvDateE"].className = "InputFieldNumeric";
		document.all["btRcvDateS"].className = "";
		document.all["btRcvDateE"].className = "";*/
	    document.all["dTDTitlecvDate"].className = "dTR";
	}
}
