/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號		概要
 * -------------------------------------------------------------------------------------------------
 * 1060111      Kenny   1051234     新增程式
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
			{
                if ( document.all["rbReRecord"].checked )
                    Page_BlockSubmit = !window.confirm("執行後會更新批示錄案追蹤限辦日期，請問是否繼續執行？");
                else
                    Page_BlockSubmit = !window.confirm("執行後會更新批示錄案追蹤狀態為解除追蹤，請問是否繼續執行？");    
                jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
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
	
    if( document.all["rbReRecord"].checked )
        if (document.all["txNewRecordDueDate"].value == "")
            strErrMsg += "請輸入新批示限辦日期欄位\n";
    
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
    
	var strNewRecordDueDate = document.all.txNewRecordDueDate.value;
    var strOldRecordDueDate = document.all.txRecordDueDate.value;
	if( document.all["rbReRecord"].checked && strNewRecordDueDate != "")
	{
		if(strNewRecordDueDate.length < 7)
		{
			strNewRecordDueDate = jf_PADL(strNewRecordDueDate,7,"0");
			document.all.txNewRecordDueDate.value = strNewRecordDueDate;
		}

		if(!jf_CheckCDATE(strNewRecordDueDate))
		{
            strErrMsg += "輸入的新批示限辦日期格式不正確，請重新輸入";
		}
        else if(parseInt(strOldRecordDueDate, 10) > parseInt(strNewRecordDueDate, 10))
		{
            strErrMsg += "新批示限辦日期不可比原設定之日期早，請重新設定";
		}
        
        if (strErrMsg != "")
        {
            jf_ShowMsg( strErrMsg, "" );
            document.all.txNewRecordDueDate.value = "";
            $('#txNewRecordDueDate').focus();
        }
	}
}