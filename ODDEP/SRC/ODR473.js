/*
DATE	SA		PRG		MGR_NO			DESC
0961001	Stella	Matte	001248			藥檢局新增查詢條件
1050519	Kevin	Joe		1050087 		二代系統升級
1050520	KEVIN	JOE		1050087			二代系統升級，調整focus寫法
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050519	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050519	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
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
		//1050519	Joe	1050087	二代系統升級
		/* 
		case "btFromDateS":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txDateS, event.screenX, event.screenY);
			break;
		case "btFromDateE":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txDateE, event.screenX, event.screenY);
			break;
		*/
	}	
}

//1050519	Joe	1050087	二代系統升級，傳入參數event
function jf_ToolBarHandle(event)
{
	//1050520	Joe	1050087	二代系統升級，調整focus寫法
	//document.all.tbTool.focus();
	$('#' + tbTool.id).focus();
	if(document.all.h_searchtype.value == '1')//Matte 0961001 001248
	{
		if (!CheckMonth("txMonth"))
			return;
	}
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050519	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btPrint":
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
			//1050519	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			//1050519	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function ClientOnLoad()
{
	ShowMsg();
	/*if(document.all.h_searchtype.value == "1")//Matte 0961001 001248
		document.getElementById("TDDate").style.display="none";
	else 
		document.getElementById("TDMon").style.display="none";*/
		
}

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
function CheckMonth(argObj, strMsg)
{
	var strMon = document.all[argObj].value;
	if (strMon != "")
	{
		if (strMon.length < 5)
		{
			strMon = jf_PADL(strMon,5,'0');
			document.all[argObj].value = strMon;
		}
		var mon = parseInt(strMon.substr(3,2), 10);
		if ( mon < 1 || mon > 12 )
		{
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
				
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}

//列印前檢查
function CheckBeforePrint()
{
	if(document.all.h_searchtype.value == '1')//Matte 0961001 001248
	{
		var strMonth = jf_Trim(document.all.txMonth.value);
		if (strMonth == "")
		{
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txMonth.focus();
			$('#' + txMonth.id).focus();			
			alert("列印月份不可為空白。");
			return false;
		}
	}
	else
	{
		//Matte 0961001 001248 START
		var strDateS = jf_Trim(document.all.txDateS.value); 
		if (strDateS == "")
		{
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txDateS.focus();
			$('#' + txDateS.id).focus();
			alert("列印日期起不可為空白。");
			return false;
		}
		var strDateE = jf_Trim(document.all.txDateE.value);
		if (strDateE == "")
		{
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txDateE.focus();
			$('#' + txDateE.id).focus();
			alert("列印日期迄不可為空白。");
			return false;
		}
		if(strDateS >  strDateE)
		{
			document.all.txDateE.value = strDateS;
			document.all.txDateS.value = strDateE;
		}//Matte 0961001 001248 END
	}
	
	return true;
}

//檢查日期格式,並顯示訊息 Matte 0961001 001248
function CheckDate(argObj,argObjName)
{
	if(document.all[argObj].value != "")
	{
		jf_PADCHAR(document.all[argObj],7,'0');
		if(!jf_CheckCDATE(document.all[argObj].value))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName+"格式不正確"])),"");		
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}


