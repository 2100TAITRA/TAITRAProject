/*
 * DATE    SA	   PRG		MGR_NO		DESC
 * 1010330 Kevin   Ivory	1010130		新增公文文號欄位及發文單位校對清單報表
 * 1050414 David   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050414 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050414 Justin 1050087 二代公文修改 
	//if (document.all["ValidationSummary1"].innerText != "")
	//    alert(document.all["ValidationSummary1"].innerText);
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
	
    //1050414 Justin 1050087 二代公文修改 
	/*switch (xObjectName)
	{
		case "btSDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
			break;
		case "btEDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
			break;
	}*/	
}

//1050414 Justin 1050087 二代公文修改
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
    //1050414 Justin 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
			    Page_BlockSubmit = true;
		    //1050414 Justin 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
			    Page_BlockSubmit = true;
		    //1050414 Justin 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function ClientOnLoad()
{
	ShowMsg();
	rbReport_onclick();
}

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
//1010330	Ivory	1010130	日期ONBLUR檢核修正
//function CheckCDATE(argObj,strMsg)
bHasCheck = false;
function CheckDATE(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			document.all[argObj].focus();
			bHasCheck = false;
			return false;			
		}
	}
	bHasCheck = false;
	return true;	
}

function CheckBeforePrint()
{
	var strSDate	= jf_Trim(document.all["txSDate"].value);
	var strEDate	= jf_Trim(document.all["txEDate"].value);
	// 1010330	Ivory	1010130	新增公文文號欄位
	var strDocNo	= jf_Trim(document.all["txDocNo"].value);	
	//if (strSDate + strEDate == "")
	if (strSDate + strEDate + strDocNo == "")	
	{
		document.all["txSDate"].focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少輸入一個條件"])),"");
		return false;
	}
	//1010330	Ivory	1010130	日期檢核	
	if(!CheckDATE("txSDate","發文日期(起)",true))
		return false;
	if(!CheckDATE("txEDate","發文日期(訖)",true))
		return false;	
	return true;
}
function rbReport_onclick()
{
	if( document.all.rbReportA.checked )
	{
		document.all["rbSortA"].disabled = false ;
		document.all["rbSortB"].disabled = false ;		
	}
	else if ( document.all.rbReportB.checked )
	{
		document.all["rbSortA"].disabled = true ;
		document.all["rbSortB"].disabled = true ;		
	}
}