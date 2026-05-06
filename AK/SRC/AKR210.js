/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2008.09.08	Cola	0970895	畫面新增查詢條件區間：稽催日期、逾期天數，稽催清單新增承辦人小計
 * 2011.11.16	Debra	0990486 增加查詢條件增加密等&辦畢日期 並在報表上顯示密等
 * 2012.09.18	Jagle	1010618	勾選"檔管局建議報表格式"時，稽催單分頁方式選項應DISABLED
 * 2014.05.23   Eileen  1030226 增加Excel檢核
 * 2017.02.20   Justin  1050087 二代公文修改
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
 
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060220  Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060220  Justin [1050087] 二代公文修改
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
	//[0970895]Add by Cola 新增日期區間	
	/*1060220  Justin [1050087] 二代公文修改
		case 'btCalendar':
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["tbDATES"], event.screenX, event.screenY);
			break;
		case 'btCalendar2':
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["tbDATEE"], event.screenX, event.screenY);
			break;
	//2011.11.16	Debra	0990486 增加查詢條件增加密等&辦畢日期 並在報表上顯示密等  [0991116]Add by Debra 辦畢日期區間			
		case 'btCloseSCalendar':
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txCloseSDate"], event.screenX, event.screenY);
			break;
		case 'btCloseECalendar':
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txCloseEDate"], event.screenX, event.screenY);
			break;
	*/
	//[0991116]end --Debra
	}	
}

//1060220  Justin [1050087] 二代公文修改 
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
	
    //1060220  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	    //2014.05.23 Eileen [1030226] 增加Excel檢核 -- START
		/*case "btPrint":
		if(CheckBeforeSearch())
		 {
		  if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit();
		 }
			break;
		case "btPreview":
		if(CheckBeforeSearch())
		 {
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit();
		 }
		break;*/
	    case "btPrint":
	    case "btPreview":
	    case "btExcel":
	        if (CheckBeforeSearch())
	            Page_BlockSubmit = false;
	        else
	            Page_BlockSubmit = true;
	        //1060220  Justin [1050087] 二代公文修改 
	        //jf_ToolBarSubmit();
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    //2014.05.23 Eileen [1030226] 增加Excel功能 -- END

	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	//2012.09.18	Jagle	1010618	勾選"檔管局建議報表格式"時，稽催單分頁方式選項應DISABLED
	jf_CheckcbFM();		
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
    //1060220  Justin [1050087] 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
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
	var bRtnBool;
	bRtnBool = true;
	return bRtnBool;
}
//[0970895]Add by Cola 新增日期檢核
function jf_CheckDate(obj,argFieldName)
{
	if(obj.value != "")
	{
		obj.value = jf_PADL(obj.value,7,"0");

		if (!jf_CheckCDATE(obj.value))
		{
			alert(argFieldName+"格式有誤");
			obj.value = "";
		    //1060220  Justin [1050087] 二代公文修改
		    //obj.focus();
			$('#' + obj.id).focus();
		}
	}
}

//2011.11.16	Debra	0990486 增加查詢條件增加密等&辦畢日期 並在報表上顯示密等 0991117 Debra for 日期確認
var CheckedDate = false;
var ObjName = "";
var strBDate = "";
function CheckDATE(argObj,strMsg,argIsCheckDone)
{
	if(ObjName != argObj)
		CheckedDate = false;
	ObjName = argObj;
	
	var strDate = document.all[argObj].value;
	
		
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}

		if(strBDate != strDate)
			CheckedDate = false;	
		
		strBDate = strDate;

		if(CheckedDate)
		{
			CheckedDate = false;
			return true;
		}
		if(argIsCheckDone)
			CheckedDate = true;

		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    //1060220  Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
			$('#'+argObj).focus();
			CheckedDate = false;
			return false;
		}
		else
			return true;
	}
	else
		return true;
}

function CheckBeforeSearch()
{
	var strDateS = document.all.txCloseSDate.value;
	var strDateE = document.all.txCloseEDate.value;
	if(strDateS =="" && strDateE != "")
		document.all.txCloseSDate.value = strDateE;
	if(strDateE =="" && strDateS != "")
		document.all.txCloseEDate.value = strDateS;
		
	if(strDateS != "" && strDateE != "" && strDateS > strDateE)
	{
		document.all.txCloseSDate.value = strDateE;
		document.all.txCloseEDate.value = strDateS;
	}
	if(!CheckDATE("txCloseSDate","辦畢日期(起)",true))
		return false;
	if(!CheckDATE("txCloseEDate","辦畢日期(迄)",true))
		return false;
	return true;
}

//2012.09.18	Jagle	1010618	勾選"檔管局建議報表格式"時，稽催單分頁方式選項應DISABLED
function jf_CheckcbFM()
{
	if(document.all.cbFM.checked == true)
	{
		document.all.rbDept.disabled = true;
		document.all.rbSect.disabled = true;
		document.all.rbUser.disabled = true;
	}
	else
	{
		document.all.rbDept.disabled = false;
		document.all.rbSect.disabled = false;
		document.all.rbUser.disabled = false;

		if(document.all.rbDept.checked == false && document.all.rbSect.checked == false && document.all.rbUser.checked == false)
			document.all.rbDept.checked = true;
	}
}
/*************************************************
		測試程式
**************************************************/
function akjf_DeptCheck()
{}