/*
DATE	SA		PRG		MGR_NO			DESC
1070822	Cloud	Joe		1050087			二代系統升級
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1070822	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;


//1070822	Joe	1050087	二代系統升級
// if (document.all["ValidationSummary1"].textContent != "")
	// alert(document.all["ValidationSummary1"].textContent);
jf_ShowValidator();	

//1070822	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1070822	Joe	1050087	二代系統升級
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		
	}	
}

//1070822	Joe	1050087	二代系統升級，傳入參數event
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1070822	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btSearch":
			BringOut();
			//1070822	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			BringOut();
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1070822	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			BringOut();
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1070822	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	
}

function ClientOnLoad()
{
	//1070822	Joe	1050087	二代系統升級
	// jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
	//jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,null);
	//1070822	Joe	1050087	二代系統升級
	// jf_CallWS("AKM399.asmx","btGetStockNo",false,null);
}

function OnWSResult(argResult)
{
    if(argResult.id == ws_CallStockID1)
    {
		if(argResult.value.Succes)
		{
			var BEG_STOCK_NO = argResult.value.BEG_STOCK_NO;
			var END_STOCK_NO = argResult.value.END_STOCK_NO;			
			
			document.all["txUsedStockSS"].value = BEG_STOCK_NO;
			document.all["txUsedStockSE"].value = END_STOCK_NO;
		}
		else
		{
			document.all["txUsedStockSS"].value = "";
			document.all["txUsedStockSE"].value = "";
		}
    }
    
    if(argResult.id == ws_CallStockID2)
    {
		if(argResult.value.Succes)
		{
			var BEG_STOCK_NO = argResult.value.BEG_STOCK_NO;
			var END_STOCK_NO = argResult.value.END_STOCK_NO;			
			
			document.all["txUsedStockES"].value = BEG_STOCK_NO;
			document.all["txUsedStockEE"].value = END_STOCK_NO;
		}
		else
		{
			document.all["txUsedStockES"].value = "";
			document.all["txUsedStockEE"].value = "";
		}
    }
}



function ReturnValue(STOCK_NO_1,STOCK_NO_2,BEG_STOCK_NO,END_STOCK_NO)
{
	opener.document.all.lbReturnValue.length = 4;
    opener.document.all.lbReturnValue.options[0].text  = STOCK_NO_1;
    opener.document.all.lbReturnValue.options[0].value = STOCK_NO_1;
    opener.document.all.lbReturnValue.options[1].text  = STOCK_NO_2;
    opener.document.all.lbReturnValue.options[1].value = STOCK_NO_2;
    opener.document.all.lbReturnValue.options[2].text  = BEG_STOCK_NO;
    opener.document.all.lbReturnValue.options[2].value = BEG_STOCK_NO;
    opener.document.all.lbReturnValue.options[3].text  = END_STOCK_NO;
    opener.document.all.lbReturnValue.options[3].value = END_STOCK_NO;
    opener.window.CallBack("AKM399C1");
    close();
   
}

function BringOut()
{
	var txStockNo1SS = jf_Trim(document.all["txStockNo1SS"].value);
	var txStockNo2SE = jf_Trim(document.all["txStockNo2SE"].value);
	var txStockNo1ES = jf_Trim(document.all["txStockNo1ES"].value);
	var txStockNo2EE = jf_Trim(document.all["txStockNo2EE"].value);
		
	//自動補滿查詢欄位
	if(txStockNo1SS != "" && txStockNo1ES == "")
	{
		document.all["txStockNo1ES"].value = txStockNo1SS;
	}
	if(txStockNo1ES != "" && txStockNo1SS == "")
	{
		document.all["txStockNo1SS"].value = txStockNo1ES;
	}
	if(txStockNo2SE != "" && txStockNo2EE == "")
	{		
		document.all["txStockNo2EE"].value = txStockNo2SE;
	}	
	if(txStockNo2EE != "" && txStockNo2SE == "")
	{		
		document.all["txStockNo2SE"].value = txStockNo2EE;
	}
	
	//比較大小→調換欄位
	var itxStockNo1SS = parseInt(txStockNo1SS,10);
	var itxStockNo1ES = parseInt(txStockNo1ES,10);
	
	if(itxStockNo1SS > itxStockNo1ES)
	{
		document.all["txStockNo1SS"].value = itxStockNo1ES;
		CallPadFunc("txStockNo1SS");
		document.all["txStockNo1ES"].value = itxStockNo1SS;
		CallPadFunc("txStockNo1ES");
	}
		
	BringOutDL("ALL");
}

function BringOutDL(argID)
{
	var Index1 = document.all["dlCLS_S"].selectedIndex;
	var Index2 = document.all["dlCLS_E"].selectedIndex;
	var Index3 = document.all["dlFileUser"].selectedIndex;
	var Index4 = document.all["dlStockState"].selectedIndex;
	
	if(argID == "dlCLS_S")
	{
		var temp1 = document.all["dlCLS_S"].options(Index1).value;
		document.all["txClsS"].value = temp1;
	}
	else if(argID == "dlCLS_E")
	{
		var temp2 = document.all["dlCLS_E"].options(Index2).value;
		document.all["txClsE"].value = temp2;
	}
	else if(argID == "dlFileUser")
	{
		var temp3 = document.all["dlFileUser"].options(Index3).value;
		document.all["txUser"].value = temp3;
	}
	else if(argID == "dlStockState")
	{
		var temp4 = document.all["dlStockState"].options(Index4).value;		
		document.all["txStockState"].value = temp4;
	}
	else if(argID == "ALL")
	{
		if(Index1 != "0" && Index2 == "0")
		{
			document.all["dlCLS_S"].selectedIndex = Index1;
			document.all["dlCLS_E"].selectedIndex = Index1;
			Index2 = Index1;
		}
		else if(Index2 != "0" && Index1 == "0")
		{
			document.all["dlCLS_S"].selectedIndex = Index2;
			document.all["dlCLS_E"].selectedIndex = Index2;
			Index1 = Index2;
		}
		
		var iIndex1 = parseInt(Index1,10);
		var iIndex2 = parseInt(Index2,10);
		if(iIndex1 > iIndex2)
		{
			document.all["dlCLS_S"].selectedIndex = Index2;
			document.all["dlCLS_E"].selectedIndex = Index1;
			
			var temp1 = document.all["dlCLS_S"].options(Index2).value;
			document.all["txClsS"].value = temp1;
			var temp2 = document.all["dlCLS_E"].options(Index1).value;
			document.all["txClsE"].value = temp2;
		}
	}
}

function CallPadFunc(strObjName)
{	
	switch(strObjName)
	{		
		case "txStockNo1SS":								
		case "txStockNo1ES":								
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,3,"0");
			break;		
	}	
}

var ws_CallStockID1 = "";
var ws_CallStockID2 = "";
function BringOutStockInfo(argID)
{
	var STOCK_NO_11 = jf_Trim(document.all["txStockNo1SS"].value);
	var STOCK_NO_21 = jf_Trim(document.all["txStockNo2SE"].value);
	var STOCK_NO_12 = jf_Trim(document.all["txStockNo1ES"].value);
	var STOCK_NO_22 = jf_Trim(document.all["txStockNo2EE"].value);
	
	var OrgNo = jf_Trim(document.all["txOrgNo"].value);
	var Param1 = new Array(3);	
	
	if(argID == "txStockNo2SE" && STOCK_NO_11 != "")
	{
		Param1[0] = OrgNo;
		Param1[1] = STOCK_NO_11;
		Param1[2] = STOCK_NO_21;
		
		callObj = jf_CallWS("AKM399.asmx","StockMainSearcher",false,Param1);
		ws_CallStockID1 = callObj.id;
		OnWSResult(callObj);
	}
	
	if(argID == "txStockNo2EE" && STOCK_NO_12 != "")
	{
		Param1[0] = OrgNo;
		Param1[1] = STOCK_NO_12;
		Param1[2] = STOCK_NO_22;
		
		callObj = jf_CallWS("AKM399.asmx","StockMainSearcher",false,Param1);
		ws_CallStockID2 = callObj.id;
		OnWSResult(callObj);
	}
}