/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號		概要
 * -------------------------------------------------------------------------------------------------
 * 1060110      Kenny   1051234     新增程式
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
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
	
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btOpen":
            Page_BlockSubmit = !jf_CheckBeforOpen();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_CheckBeforSave())
				Page_BlockSubmit = false;
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !window.confirm("執行後會將所有錄案追蹤批示及辦理情形資料刪除，請問是否繼續？");
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCheck":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

//開啟前檢核
function jf_CheckBeforOpen()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txDocNo"].value == "")
	{
		strErrMsg += "公文文號欄位不可空白";
		$('#txDocNo').focus();
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//儲存前檢核
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
    if (dlRecorder.options[dlRecorder.selectedIndex].value == "")
	{
		strErrMsg += "批示長官欄位不可空白\n";
        $('#dlRecorder').focus();
	}
	if (document.all["txRecordDueDate"].value == "")
		strErrMsg += "批示限辦日期欄位不可空白\n";
    if (document.all["txRecordDesc"].value == "")
		strErrMsg += "批示內容欄位不可空白\n";
    
    strErrMsg = strErrMsg.substring(0, strErrMsg.length - 1);
    
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
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
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckDate()
{
	var strErrMsg= "";
    
    var strRecordDueDate = document.all.txRecordDueDate.value;
	if(strRecordDueDate != "")
	{
		if(strRecordDueDate.length < 7)
		{
			strRecordDueDate = jf_PADL(strRecordDueDate,7,"0");
			document.all.txRecordDueDate.value = strRecordDueDate;
		}

		if(!jf_CheckCDATE(strRecordDueDate))
		{
            strErrMsg += "輸入的批示限辦日期不存在，請重新輸入";
		}
        
        if (strErrMsg != "")
        {
            jf_ShowMsg( strErrMsg, "" );        
            document.all.txRecordDueDate.value = "";
            $('#txRecordDueDate').focus();
        }
	}
}