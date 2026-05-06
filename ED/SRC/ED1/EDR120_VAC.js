/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1140422	David	Cloud	1131297	新增本作業
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;



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
			Page_BlockSubmit = !(jf_ConfirmPrint());
			ChangeDate("txSendDateS", "txSendDateE");
			if (document.all["txSendDateS"].value == "" && document.all["txSendDateS"].value == "") {
				alert("送發日期不可皆為空白。");
				Page_BlockSubmit = true;
				break;
			}
			if (!CheckDate("txSendDateS", "送發日期(起)")) {
				Page_BlockSubmit = true;
				break;
			}
			if (!CheckDate("txSendDateE", "送發日期(迄)")) {
				Page_BlockSubmit = true;
				break;
			}
			if (!Page_BlockSubmit)
				jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			//確認是否有勾選資料
			Page_BlockSubmit = true;
			var bcheck = false;
			for (var i = 2; i <= document.all['dg1'].rows.length; i++) {
				if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
					bcheck = true;
					break;
				}
			}

			if (!bcheck) {
				alert('至少需勾選一筆資料。');
			}
			else { Page_BlockSubmit = false; jf_ToolBarSubmit(xObjectName); }
			break;
		//以下屬於DataGrid ToolBar
		case "btAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btChange":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

var bHasCheck = false;
function CheckDate(argObj, strMsg) {
	if (bHasCheck) {
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 7) {
			strDate = jf_PADL(strDate, 7, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate)) {
			$('#' + argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
function ChangeDate(argOobjs, argOobje) {

	var strDateS = jf_Trim(document.all[argOobjs].value);//
	var strDateE = jf_Trim(document.all[argOobje].value);//
	if (strDateS == "" && strDateE != "") {
		document.all[argOobjs].value = strDateE;
	}
	if (strDateS != "" && strDateE == "") {
		document.all[argOobje].value = strDateS;
	}
	if (strDateS != "" && strDateE != "" && strDateS > strDateE) {
		document.all[argOobje].value = strDateS;
		document.all[argOobjs].value = strDateE;
	}
}





