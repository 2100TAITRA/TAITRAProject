/*
 * 修改日期		SA		PG		單號		DESC
 * 1040811		Cloud	Kevin_C	1040582		新增程式
 * 1040818		Cloud	Kevin_C	1040582		修正畫面日期起迄與搜尋結果不同
 * 1050818	    Cloud   Kenny	1050087	    二代公文系統相關修改
 //	1051019		Leslie	Joe		1050087		二代修改配合行動平台
 
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

//1050818	Kenny   [1050087]	二代公文系統相關修改
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
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHandle"));
    var btHandle;
    var lbBorNo;
    var lbStatus;
	
    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_lbBorNo"] != null) {
	    
	    btHandle = document.all["dg1__ctl" + pNo + "_btHandle"].id;
        //1050818	Kenny   [1050087]	二代公文系統相關修改--Start--
	    //lbBorNo = document.all["dg1__ctl" + pNo + "_lbBorNo"].innerText;
	    //lbStatus = document.all["dg1__ctl" + pNo + "_lbStatus"].innerText;
        lbBorNo = document.all["dg1__ctl" + pNo + "_lbBorNo"].textContent;
	    lbStatus = document.all["dg1__ctl" + pNo + "_lbStatus"].textContent;
        //1050818	Kenny   [1050087]	二代公文系統相關修改--End--
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
	    case btHandle:
			Page_BlockSubmit=true;
			var strURL = "../../../AK/AKT811.aspx?K1=" + lbBorNo + "&argBorStatus=" + lbStatus + "&SAMLart=" + document.all.SsoArtifact.value;
			jf_OpenChildWin(strURL, "AKT800", 1000, 723);
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050818	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050818	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = CheckSearch();
			//1050818	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			jf_ConfirmClean(true);
			Page_BlockSubmit = true;
			//1050818	Kenny   [1050087]	二代公文系統相關修改
            //document.all["txBorDateS"].focus();
            $('#txBorDateS').focus();
			document.all["rbOriFile"].checked = true;
			document.all["rbUnReturn"].checked = true;
			document.all["rbDate"].checked = true;
			//1050818	Kenny   [1050087]	二代公文系統相關修改
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
function CheckSearch()
{
	if(jf_Trim(document.all.txBorDateS.value)==""&&jf_Trim(document.all.txBorDateE.value) == ""&&
	jf_Trim(document.all.txReturnDateS.value)==""&&jf_Trim(document.all.txReturnDateE.value)== ""&&
	document.all.dlBorDept.selectedIndex==0&&jf_Trim(document.all.txDocNo.value)== ""&&
	jf_Trim(document.all.txFromNo.value)=="")
	{
		alert("請至少輸入一項條件");
        //1050818	Kenny   [1050087]	二代公文系統相關修改
        //document.all["txBorDateS"].focus();
        $('#txBorDateS').focus();
		 return true;
	}
	if(!CheckDATE("txBorDateS","調案日期(起)"))
	{  
			return true;
	}
	if(!CheckDATE("txBorDateE","調案日期(迄)"))
	{	 		
			return true;
	}
	if(!CheckDATE("txReturnDateS","應歸日期(起)"))
	{  
			return true;
	}
	if(!CheckDATE("txReturnDateE","應歸日期(迄)"))
	{	 		
			return true;
	}
	return false;
}
var bHasCheck = false;
function CheckDATE(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
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
            //1050818	Kenny   [1050087]	二代公文系統相關修改
            //document.all[argObj].focus();
            $('#'+argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
    //日期起迄值交換
	var strBorDateS = document.all.txBorDateS.value;
	var strBorDateE = document.all.txBorDateE.value;
	if (strBorDateS == "")  document.all.txBorDateS.value = strBorDateE;
	if (strBorDateE == "")  document.all.txBorDateE.value = strBorDateS;
	if (strBorDateS != "" && strBorDateE != "" && strBorDateS > strBorDateE) {
	    document.all.txBorDateS.value = strBorDateE;
	    document.all.txBorDateE.value = strBorDateS;
	}
	var strReturnDateS = document.all.txReturnDateS.value;
	var strReturnDateE = document.all.txReturnDateE.value;
	if (strReturnDateS == "")  document.all.txReturnDateS.value = strReturnDateE;
	if (strReturnDateE == "")  document.all.txReturnDateE.value = strReturnDateS;
	if (strReturnDateS != "" && strReturnDateE != "" && strReturnDateS > strReturnDateE) {
	    document.all.txReturnDateS.value = strReturnDateE;
	    document.all.txReturnDateE.value = strReturnDateS;
	}
	bHasCheck = false;
	return true;
}