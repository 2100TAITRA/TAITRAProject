/*
DATE		SA		PRG		    MGR_NO			DESC
1110210     Cloud   Cloud		1101502         新增程式
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
	    case "btPreview":
	        Page_BlockSubmit = true;
		    if (document.all.txBorDateS.value == "" && document.all.txBorDateE.value == "") {
		        alert('借閱日期區間不可皆為空白');
		        $('#txBorDateS').focus();
		    }
		    else {
		        var strDateS = document.all.txBorDateS.value;
		        var strDateE = document.all.txBorDateE.value;

		        if (strDateS == '' && strDateE != '')
		            $('#txBorDateS').val(strDateE);
		        else if (strDateS != '' && strDateE == '')
		            $('#txBorDateE').val(strDateS);
		        else if (Number(strDateS) > (Number(strDateE))) {
		            $('#txBorDateS').val(strDateE);
		            $('#txBorDateE').val(strDateS);
		        }
		        Page_BlockSubmit = false;
		    }

			jf_ToolBarSubmit(xObjectName);
			break;
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
function CheckDate(argObj, argMsg, argFromTbtool, argLength) {
    var strErrMsg = '';
    var strDate = $('#' + argObj).val();
    if (strDate != '') {
        if (strDate.length < argLength) {
            strDate = jf_PADL(strDate, argLength, '0');//YYYMMDD
            $('#' + argObj).val(strDate);
        }

        if (strDate.length == 5)
            strDate += '01';

        if (!jf_CheckCDATE(strDate)) {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            if (argFromTbtool == false)
                jf_ShowMsg(strErrMsg, '');
        }
    }
    return strErrMsg;
}