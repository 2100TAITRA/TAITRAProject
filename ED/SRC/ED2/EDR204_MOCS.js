/*
DATE	SA	    PRG	    MGR_NO	DESC
1111116 Kevin	Joe		1110853	新增程式
1111221	Kevin	Joe		序64	新增自行輸入逾期天數選項
1111227	Kevin	Joe		序64	修正逾期天數判斷
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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1111221	Joe		序64	新增自行輸入逾期天數選項
	fndlOverdueChange();
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
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}
	
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
		case "btPreview":
			Page_BlockSubmit = !CheckBeforeSearch();
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

function CheckBeforeSearch()
{
	var ReturnValue = true;
	if (document.all.txRcvDateS.value == "" && document.all.txRcvDateE.value == "") {
		alert('請輸入收文日期。');
		ReturnValue = false;
    }
		
	if (document.all.txRcvDateS.value == "" && document.all.txRcvDateE.value != "")
		document.all.txRcvDateS.value = document.all.txRcvDateE.value;
	else if (document.all.txRcvDateS.value != "" && document.all.txRcvDateE.value == "")
		document.all.txRcvDateE.value = document.all.txRcvDateS.value;
	else if (document.all.txRcvDateS.value > document.all.txRcvDateE.value) {
		var tmp = document.all.txRcvDateS.value;
		document.all.txRcvDateS.value = document.all.txRcvDateE.value;
		document.all.txRcvDateE.value = tmp;
	}
	
	//1111221	Joe		序64	新增自行輸入逾期天數選項
	if(document.all.dlOverdue.selectedOptions[0].value == "other"){
		if (document.all.txOverdueS.value == "" && document.all.txOverdueE.value == "") {
			alert('請輸入逾期天數。');
			ReturnValue = false;
		}
		//1111227	Joe		序64	修正逾期天數判斷--S
		var OverdueS = parseInt(document.all.txOverdueS.value);
		var OverdueE = parseInt(document.all.txOverdueE.value);
		if(!isNaN(OverdueS) && !isNaN(OverdueE) && OverdueS > OverdueE){
			document.all.txOverdueS.value = OverdueE;
			document.all.txOverdueE.value = OverdueS;
		}
		/*
		if (document.all.txOverdueS.value > document.all.txOverdueE.value && document.all.txOverdueS.value != "" && document.all.txOverdueE.value != "") {
			var tmp = document.all.txOverdueS.value;
			document.all.txOverdueS.value = document.all.txOverdueE.value;
			document.all.txOverdueE.value = tmp;
		}*/
		//1111227	Joe		序64	修正逾期天數判斷--E
	}

	return ReturnValue;
}

//檢核日期格式
function CheckCDATE(argObj, strMsg) {
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 7) {
			strDate = jf_PADL(strDate, 7, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate)) {
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			$('#' + argObj).focus();
			return false;
		}
	}
	return false;
}

//1111221	Joe		序64	新增自行輸入逾期天數選項
function fndlOverdueChange(){
	if(document.all.dlOverdue.selectedOptions[0].value == "other")
		document.all.dTROverdue.className = "dTR";
	else
		document.all.dTROverdue.className = "hide";
}