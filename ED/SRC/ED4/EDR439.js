/*
DATE	SA		PRG		MGR_NO				DESC
1060315 Kevin   Joe		1060076             新增程式
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
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
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
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
	
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":
			var xUrl = "../../../ODDEP/ODP420.aspx?nMode=EXEC&SAMLart="+document.all.H_Artifact.value;
			jf_OpenChildWin(xUrl,"ODP420",800,600);
			Page_BlockSubmit = true;
			break;
		case "btExcel":
			fnSetDateBeforeCheck();
			if(Check_CDATE("txDateS","列印日期") && Check_CDATE("txDateE","列印日期"))
			{
				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
			}
			break;
	}
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//日期onblur
function jf_OnBlur(argDate)
{
	if (!Check_CDATE(argDate.id, "列印日期"))
		$('#'+argDate).focus();
}

function Check_CDATE(argObj , strMsg )
{
	var strDate = document.all[argObj].value;

	if (strDate != "")
	{
		if (strDate.length < 5)
		{
			strDate = jf_PADL(strDate,5,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_Check_CDATE(strDate , 5))
		{
			//1050315	Kenny   [1050087]	二代公文系統相關修改
			//document.all[argObj].focus();
			$('#'+argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			return false;
		}
	}
	return true;
}
function jf_Check_CDATE(argStr , arglength) 
{
	// adapting for other layouts should be easy
	if (argStr.length < arglength)
		{argStr = jf_PADL(argStr,arglength,'0');}
	var pYear,pMonth,pDay;
	pYear=parseInt(argStr.substring(0,3),10)+1911;
	pMonth=parseInt(argStr.substring(3,5),10);
	pDay = arglength ;
	if (!jf_validDate(pYear, pMonth-1, pDay)) 
		{return false}
	else 
		{return true}
	
	bHasCheck = false;
	return true;
}
function jf_validDate(y, m, d) // m = 0..11
 { with (new Date(y, m, d)) return ((getMonth()==m)) }
//調整日期起迄，若為空則補值
function fnSetDateBeforeCheck()
{
	var DateS = document.all.txDateS;
	var DateE = document.all.txDateE;
	var strTemp;
	
	if(DateS.value == "")
	{
		DateS.value = DateE.value;
	}		
	else if(DateE.value == "")
	{
		DateE.value = DateS.value;
	}		
	else if(DateS.value > DateE.value)
	{
		strTemp = DateS.value;
		DateS.value = DateE.value;
		DateE.value = strTemp;
	}	
}