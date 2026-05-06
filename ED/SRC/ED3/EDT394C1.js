/*
DATE	SA		PRG		MGR_NO			DESC
1111207	Joe		Joe		1110828			新增程式
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

//指定DataGrid欄位
var strTableFields = new Array("_lbDocNo","_txCloseDate","_lbTitle");
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
		case "btSearch":
			if (fnCheckBeforeSearch())
			{
				Page_BlockSubmit = !jf_CheckKeyObject();
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
			break;
	    case "btClean":
	        Page_BlockSubmit = true;
	        jf_ConfirmClean(true);
	        document.all["txMailDateS"].focus();
	        break;
	}
}

function fnCheckBeforeSearch()
{
	var ErrMsg = "";
	if (document.all.txMailDateS.value == "" && document.all.txMailDateE.value == "")
	{
		ErrMsg += "郵寄日期不可為空\n";
		$('#txMailDateS').focus();
	}
	if (document.all.txDocNo.value != "" && document.all.txNoneDocNo.value != "")
	{
		ErrMsg += "公文文號、非公文類受文者不可同時有值\n";
		$('#txDocNo').focus();
	}
	if (ErrMsg != "")
	{
		alert(ErrMsg);
		return false;
	}
	return true;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢核日期格式
var bHasCheck = false;
function CheckDate(argId,argText) {
	if (bHasCheck) {
		bHasCheck = false;
		return true;
	}
	bHasCheck = true;
	document.all[argId].value = jf_Trim(document.all[argId].value);
	if (document.all[argId].value != "") {
		document.all[argId].value = jf_PADL(document.all[argId].value, 7, "0");
		if (!jf_CheckCDATE(document.all[argId].value)) {
			alert(argText+'格式不正確');
			$('#' + argId).focus();
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}

function ReturnValue(argLink) {
    try {
        opener.document.all.lbReturnValue.length = 1;
        opener.document.all.lbReturnValue.options[0].value = argLink;
        opener.window.CallBack("EDT394C1");
        opener.window.focus();
        close();
    }
    catch (e) {
        alert(e);
    }
}