/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1050928   Justin   1050087     二代公文修改
1051019	Leslie	Joe			1050087		二代修改配合行動平台
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//指定DataGrid欄位
//1050928 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
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
//1050928 Justin 1050087 二代公文修改 
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
	
    //1050928 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050928 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	//1.公告預設刊登天數不可為空白且必須為正整數
	var strDays = jf_Trim(document.all.txDays.value);
	if (strDays == "")
	{
	    //1050928 Justin 1050087 二代公文修改
	    //document.all.txDays.focus();
	    $('#txDays').focus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公告預設刊登天數不可為空白。"])),"");
		return false;
	}
	if (strDays == "0" || parseInt(strDays,10) != strDays)
	{
	    //1050928 Justin 1050087 二代公文修改
	    //document.all.txDays.focus();
	    $('#txDays').focus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公告預設刊登天數必須為正整數。"])),"");
		return false;
	}
	
	//2.內部AP Server的TBWS伺服器網址不可為空白
	if (jf_Trim(document.all.txInsideWS.value) == "")
	{
	    //1050928 Justin 1050087 二代公文修改
	    //document.all.txInsideWS.focus();
	    $('#txInsideWS').focus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["內部AP Server的TBWS伺服器網址不可為空白。"])),"");
		return false;
	}
	
	//3.若檔案大小上限不為空白，則必須為正整數
	var strSize = jf_Trim(document.all.txFileSize.value);
	if (strSize == "0" || (strSize != "" && parseInt(strSize,10) != strSize))
	{
	    //1050928 Justin 1050087 二代公文修改
	    //document.all.txFileSize.focus();
	    $('#txFileSize').focus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["檔案大小限制必須為正整數。"])),"");
		return false;
	}
	
	//4.如果選擇有外部伺服器，則必須設定外部AP Server的TBWS伺服器網址
	if (document.all.rbYes.checked && jf_Trim(document.all.txOutsideWS.value) == "")
	{
	    //1050928 Justin 1050087 二代公文修改
	    //document.all.txOutsideWS.focus();
	    $('#txOutsideWS').focus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["外部AP Server的TBWS伺服器網址不可為空白。"])),"");
		return false;
	}
	
	if(checkMail(document.all.txSenderMail.value) == false)
	{
	    //1050928 Justin 1050087 二代公文修改
	    //document.all.txSenderMail.focus();
	    $('#txSenderMail').focus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["郵件位址格式不正確。"])),"");
		return false;
	}
	
	return true;

}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
