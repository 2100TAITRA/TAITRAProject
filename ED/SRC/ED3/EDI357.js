/*
DATE	SA		PRG		MGR_NO		DESC 
1030113	David	David	1021077		新增程式
1060803 David   Justin  1050087     二代公文修改
*/

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060803 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
//1060803 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
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
	    /*1060803 Justin [1050087] 二代公文修改
		case "btSignTime":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txSignTime"], event.screenX, event.screenY);
			break;
		case "btTxTime":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txTxTime"], event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060803 Justin [1050087] 二代公文修改 
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

    //1060803 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1060803 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1060803 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1060803 Justin [1050087] 二代公文修改 
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
		    document.all[argObj].value = "";
		    //1060803 Justin [1050087] 二代公文修改
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			return false;
		}
	}
	return true;
}

function CheckBeforeSearch()
{
	var strSignTime	=	jf_Trim(document.all.txSignTime.value);
	var strTxTime	=	jf_Trim(document.all.txTxTime.value);
	if(strSignTime == "" || strTxTime == "")
	{
		alert("簽收日期或送出日期不可為空白");
		return false;
	}
	if(!CheckCDATE("txSignTime","簽收日期"))
		return false;
	if(!CheckCDATE("txTxTime","送出日期"))
		return false;

	return true;
}