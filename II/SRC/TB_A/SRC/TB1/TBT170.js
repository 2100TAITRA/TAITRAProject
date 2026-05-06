/*
DATE	SA		PRG		MGR_NO			DESC
1070621 Leslie  Cloud   1070138         新增程式
1110103	Kevin   Zen     1101292			修正多次點擊重複PostBack之問題
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
    if(document.all.OK)
    {
        alert(document.all.OK.value);
    }
    
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/

function ClientButtonControl(e)
{
	var xObjectName = e.target.id;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
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

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	xObjectName = event.target.id
	Page_BlockSubmit = true;
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_Check();
			jf_ToolBarSubmit(xObjectName);
			break;
	    case "btSave":
	        Page_BlockSubmit = !CheckData("save");
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btUpdate":
	        if(window.confirm('註記已發布會將轉入紀錄皆改為已轉入，請確認勾選公告皆已發布。'))
	        {
	            Page_BlockSubmit = !CheckData();
	            jf_ToolBarSubmit(xObjectName);
	        }
	        break;
	}
}

//檢查
function jf_Check()
{
	var bRtnbool = true;
	var strErrMsg= "";
	var trandates	= jf_Trim(document.all.txTranindates.value);
	var trandatee = jf_Trim(document.all.txTranindatee.value);
	
	var temp = "";
	if(trandates=="" && trandatee!="")
	{
	    document.all.txTranindates.value = document.all.txTranindatee.value;
	}
	if (trandates != "" && trandatee == "")
	{
	    document.all.txTranindatee.value = document.all.txTranindates.value;
	}
	if(trandatee<trandates)
	{
	    temp = trandatee;
	    document.all.txTranindatee.value = trandates;
	    document.all.txTranindates.value = temp;
	}
	var Pastedates = jf_Trim(document.all.txPasteDates.value);
	var Pastedatee = jf_Trim(document.all.txPasteDatee.value);
	if(Pastedates=="" && Pastedatee!="")
	{
	    document.all.txPasteDates.value = document.all.txPasteDatee.value;
	}
	if (Pastedates != "" && Pastedatee == "")
	{
	    document.all.txPasteDatee.value = document.all.txPasteDates.value;
	}
	if(Pastedatee<Pastedates)
	{
	    temp = Pastedatee;
	    document.all.txPasteDatee.value = Pastedates;
	    document.all.txPasteDates.value = temp;
	}
	if (trandates + trandatee + Pastedates + Pastedatee=="")
	{
		strErrMsg += "請至少輸入一個搜尋日期。\n";
		objFocus = "txTranindates";
	}
	
	if (strErrMsg != "")
	{
        $('#'+objFocus).focus();
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	return bRtnbool;
}
function CheckData(argMode) {
    var bRtnbool = true;
    var strErrMsg = "";

    var dgCnt = document.all.dg1.rows.length
    var bcheck = false;
    
    for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++) {
        if (document.all["dg1__ctl" + iRow + "_ckBox"].checked)
        {
            bcheck = true;
            if (argMode == "save")//張貼檢查狀態是否為發布失敗
            {
                if (document.all["dg1__ctl" + iRow + "_hlstastus"].textContent == "0") {
                    alert('序' + document.all["dg1__ctl" + iRow + "_lbSEQ_NO"].textContent + '為轉入時失敗，無法直接張貼，請自行至網站下載相關檔案進行發布。');
                    return false;
                }

            }
        }
    }
    if (!bcheck)
        strErrMsg = "至少勾選一個選項。"
    

    if (strErrMsg != "") {
        $('#' + objFocus).focus();
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}
var bHasCheck = false;
function CheckDATE(argObj, strMsg) {
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

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

