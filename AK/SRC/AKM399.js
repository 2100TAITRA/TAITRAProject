/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號			概要
 * -------------------------------------------------------------------------------------------------
 * 103.11.12	Kevin_C	1020726			於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 107.08.22	Joe		1050087			二代系統升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1070822	Joe	1050087	二代系統升級
// if (document.all["ValidationSummary1"].textContent != "")
	// alert(document.all["ValidationSummary1"].textContent);

//指定DataGrid欄位
var strTableFields = new Array("_lbSEQ_NO","_lbDocNo","_lbMsg");

function ShowMsg()
{
	//1070822	Joe	1050087	二代系統升級
	jf_ShowValidator();
}

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
		case "btOpen":
			Page_BlockSubmit = CheckBeforeOpen();
			//1070822	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(CheckField())
			{
				Page_BlockSubmit = CheckStockMain();
				//1070822	Joe	1050087	二代系統升級
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			//1070822	Joe	1050087	二代系統升級--S
			else
				Page_BlockSubmit = true;
			//1070822	Joe	1050087	二代系統升級--E
			break;
		case "btClean":
			if(window.confirm("確定要清除嗎?"))
				Page_BlockSubmit = false;
			else
				Page_BlockSubmit = true;
			//1070822	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			if(window.confirm("確定要刪除嗎?"))
				Page_BlockSubmit = false;
			else
				Page_BlockSubmit = true;
			//1070822	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			if(window.confirm("確定要取消嗎?"))
				Page_BlockSubmit = false;
			else
				Page_BlockSubmit = true;
			//1070822	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "AKM399C1.aspx";
			jf_OpenChildWin(pUrl, "AKM399C1", 800, 500);
			break;
			
	}
}

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
	
	if (argCallerId == "AKM399C1")
	{
		document.all["txStockNo1"].value = document.all["lbReturnValue"].options[0].value;
		document.all["txStockNo2"].value = document.all["lbReturnValue"].options[1].value;
		if(jf_Trim(document.all["txStockNo1"].value) != "" && jf_Trim(document.all["txStockNo2"].value) != "")
		{
			Page_BlockSubmit=false;
			document.all.ToolBarSenderID.value = "btOpen";	
			if(Page_BlockSubmit==false)
			{
				IsServerHandling = true;
				jf_ShowWaitState();
			    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
				IsServerHandling = true;
				__doPostBack("tbTool",0);
			}
		}		
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}


function ClientOnLoad()
{
	ShowMsg();
	//1070822	Joe	1050087	二代系統升級
	//jf_CallWS("AKM399.asmx", "StockMainSearcher", false, null);
}

var pFocusTimes = 0;
function OnWSResult(argResult)
{
	if (argResult.id == WS_CHECK_STOCK_ID)
    {
		if(argResult.value.Succes == true)
		{
			if(window.confirm("資料已存在，確定覆蓋嗎?"))
				return false;
			else
				return true;
		}
		else
			return false;
    } 
    if(argResult.id == ws_CallStockID)
    {
		if(argResult.value.Succes == true)
		{
			var BEG_STOCK_NO = argResult.value.BEG_STOCK_NO;
			var END_STOCK_NO = argResult.value.END_STOCK_NO;	
			var USED_STOCK_NO = argResult.value.USED_STOCK_NO;	
			var STOCK_STATE = argResult.value.STOCK_STATE;
			var CLS_NO_CLS = argResult.value.CLS_NO_CLS;
			var FILE_USERNAME = argResult.value.FILE_USERNAME;
			var STOCK_REMARK = argResult.value.STOCK_REMARK;
			
			document.all["txUsedStockNoS"].value = BEG_STOCK_NO;
			document.all["txUsedStockNoE"].value = END_STOCK_NO;
			document.all["txUsedStockNo"].value = USED_STOCK_NO;
			
			if(STOCK_STATE == "0")
				document.all["txStockState"].value = "未使用";
			else if(STOCK_STATE == "1")
				document.all["txStockState"].value = "使用中";
			else if(STOCK_STATE == "2")
				document.all["txStockState"].value = "已滿";
				
			for(var i=0;i<document.all["dlClsNoCls"].length;i++)
			{
				if(CLS_NO_CLS == document.all["dlClsNoCls"].options(i).value)
				{
					document.all["dlClsNoCls"].selectedIndex = i;
					document.all["txCls"].value = CLS_NO_CLS;
				}
			}
			
			for(var i=0;i<document.all["dlFileUsername"].length;i++)
			{
				if(FILE_USERNAME == document.all["dlFileUsername"].options(i).value)
				{
					document.all["dlFileUsername"].selectedIndex = i;
					document.all["txUser"].value = FILE_USERNAME;
				}
			}
			
			document.all["txRemark"].value = STOCK_REMARK;
		}
    }
}

function CallPadFunc(strObjName)
{	
	switch(strObjName)
	{		
		case "txStockNo1":								
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,3,"0");
			break;		
	}	
}

function CheckBeforeOpen()
{
	var StockNo1 = jf_Trim(document.all["txStockNo1"].value);
	var StockNo2 = jf_Trim(document.all["txStockNo2"].value);
	var ErrMsg = "";
	if(StockNo1 == "" || StockNo2 == "")
		ErrMsg = "櫥位號不可空白";
	
	if(ErrMsg != "")
	{
		alert(ErrMsg);
		return true;
	}
	return false;
}

var WS_CHECK_STOCK_ID = "";
function CheckStockMain()
{
	var StockNo1 = jf_Trim(document.all["txStockNo1"].value);
	var StockNo2 = jf_Trim(document.all["txStockNo2"].value);
	var OrgNo = jf_Trim(document.all["txOrgNo"].value);
	
	var arr1 = new Array(3);
	arr1[0] = OrgNo;
	arr1[1] = StockNo1;
	arr1[2] = StockNo2;
	
	callObj = jf_CallWS("AKM399.asmx", "StockMainSearcher", false, arr1);
	WS_CHECK_STOCK_ID = callObj.id;
	return OnWSResult(callObj);
}

function CheckField()
{
	var Index1 = document.all["dlClsNoCls"].selectedIndex;
	var Index2 = document.all["dlFileUsername"].selectedIndex;
	var ErrMsg = "";
	
	if(Index1 == "0")
		ErrMsg = "分類選項不可空白\n";
	if(Index2 == "0")
		ErrMsg+= "編目人員選項不可空白\n";
	if(jf_Trim(ErrMsg) != "")
	{
		alert(ErrMsg);
		return false;
	}
	return true;
}

function SaveSelectValue(argID)
{
	var Index = document.all[argID].selectedIndex;
	var Value = document.all[argID].options[Index].value;
	
	if(argID == "dlClsNoCls")
		document.all["txCls"].value = Value;
	if(argID == "dlFileUsername")
		document.all["txUser"].value = Value;
}

var ws_CallStockID = "";
function BringOutStockInfo(argID)
{
	var STOCK_NO_1 = jf_Trim(document.all["txStockNo1"].value);
	var STOCK_NO_2 = jf_Trim(document.all["txStockNo2"].value);
	
	var OrgNo = jf_Trim(document.all["txOrgNo"].value);
	var Param1 = new Array(3);	
	
	if(argID == "txStockNo2" && STOCK_NO_1 != "")
	{
		Param1[0] = OrgNo;
		Param1[1] = STOCK_NO_1;
		Param1[2] = STOCK_NO_2;
		
		callObj2 = jf_CallWS("AKM399.asmx","StockMainSearcher",false,Param1);
		ws_CallStockID = callObj2.id;
		OnWSResult(callObj2);
	}
}