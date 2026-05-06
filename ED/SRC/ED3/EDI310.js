/*
DATE	SA		PRG		MSG_NO		DESC
1050322 --      Cloud   1050087     升級二代
1051019 Leslie  Kenny   1050087     二代公文修改
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050322  Cloud   1050087     升級二代
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

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
		/*
		case "":
			break;
		*/
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
	//1050322   Cloud   [1050087]   升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		    Page_BlockSubmit = !jf_CheckSearchObject();
		    //1050322   Cloud   [1050087]   升級二代
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		    Page_BlockSubmit = !jf_CheckSearchObject();
		    //1050322   Cloud   [1050087]   升級二代
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		    Page_BlockSubmit = !jf_CheckSearchObject();
		    //1050322   Cloud   [1050087]   升級二代
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
function jf_CheckSearchObject()
{
	if (!CheckCDATE("txDateS", "發文日期(起)") || !CheckCDATE("txDateE", "發文日期(訖)"))
	{
		return false;
	}
	
	var strMsg="";
	var strDays = jf_Trim(document.all["txDays"].value);
	if(document.all["rbLimitY"].checked == true)
	{
		if(strDays == "")
		{	
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["請輸入限制天數。"]) ), "" );
			document.all["txDays"].focus();
			return false;
		}
		else
			return true;
	}
	else 
		return true;
}

function jf_RbChecked()
{
	document.all.rbLimitY.checked = true;
}