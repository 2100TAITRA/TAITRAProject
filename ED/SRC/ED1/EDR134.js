/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		 SA           PG           單號	     概要
 * -------------------------------------------------------------------------------------------------
 * 1000906	 David	      Kevin		   1000564	 新增收文工作統計表列印作業
 * 1050309	 David		  Kevin_C	   1050087	 二代系統修改
 * 1051019   Leslie       Kenny        1050087   二代公文修改
 * 1121213   Joe		  Joe     	   1110031   修正Excel下載方式
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050309	Kevin_C	1050087	二代系統修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1121213   Joe     1110031     修正Excel下載方式--S
	/*
	if(document.all["H_Url"].value != "")
	{
	    //1050520 Zen 1050087 二代公文修改
	    //window.open(document.all["H_Url"].value);
	    openDlg(document.all["H_Url"].value, '0', 'EXCEL');
		document.all["H_Url"].value = "";
	}
	*/
    //1121213   Joe     1110031     修正Excel下載方式--E
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
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
		//1050309	Kevin_C	1050087	二代系統修改 -S
		//case "btRcvDateS":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
		//	break;
		//case "btRcvDateE":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
		//	break;
		//1050309	Kevin_C	1050087	二代系統修改 -E
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050309	Kevin_C	1050087	二代系統修改
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
	
	//1050309	Kevin_C	1050087	二代系統修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btPreview":
			if(jf_ConfirmPreview()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050309	Kevin_C	1050087	二代系統修改
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);	
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_ConfirmPreview()
{
	if(document.all["txRcvDateS"].value =="" && document.all["txRcvDateE"].value =="")
	{	
	    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收文日期(起)、(迄)不可皆為空白"])), "");
	    //1050606 Zen 1050087 二代公文修改
	    //document.all["txRcvDateS"].focus();
	    $('#txRcvDateS').focus();
		return false;
	}

	if(!CheckCDATE("txRcvDateS","收文日期(起)"))
		return false
	if(!CheckCDATE("txRcvDateE","收文日期(迄)"))
		return false

	return true;
}

//檢核日期格式
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
		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    //1050606 Zen 1050087 二代公文修改
			//document.all[argObj].focus();
			$('#'+argObj).focus();
			return false;
		}
	}
	return false;
}