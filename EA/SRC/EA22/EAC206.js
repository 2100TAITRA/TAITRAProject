/*
DATE		SA			PRG		MGR_NO			DESC
1060301		Cloud		Joe		1050087			二代系統升級
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

//全域變數，案情摘要長度上限(法規規定，300字)
var TextAreaLimit = 300;

//1060301	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060301	Joe		1050087		二代公文修改
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	var oSummary = opener.document.all["txSummary"];
	if(oSummary &&  document.all["h_isOpen"] != null)	//取得EAM200畫面上的案情摘要欄位內容
	{
		document.all["dg1__ctl2_txSummary"].value = oSummary.value;
	}
	else												//把畫面上的第一個案情摘要內容，設定到母視窗中
	{
		if(document.all["h_SummaryCnt"] != null)
		{
			oSummary.value = document.all["dg1__ctl2_txSummary"].value;
			var cSummaryCnt = document.all["h_SummaryCnt"].value;
			opener.document.all["txSummaryCount"].value = cSummaryCnt;
			
			if(parseInt(cSummaryCnt) > 1)
			{
				//1060301	Joe		1050087		二代公文修改
				// opener.document.all["lbSummaryMsg"].className = "InputFieldLabel";
				opener.document.all["lbSummaryMsg"].className = "";
				oSummary.readOnly = true;
				oSummary.style.backgroundColor = "LightGrey";
			}
			else
			{
				opener.document.all["lbSummaryMsg"].className = "hide";
				oSummary.readOnly = false;
				oSummary.style.backgroundColor = "White";
			}
		}
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060301	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060301	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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
		case "btSetGrid":
			if(document.all["txRecordCount"].value != "")
			{
				var DgSize = document.all["dg1"].rows.length-1;
				var newSize = parseInt(document.all["txRecordCount"].value);
				
				if(newSize > DgSize)
				{
					document.all.ToolBarSenderID.value = "btSetGrid";
					IsServerHandling = true;
					jf_ShowWaitState();
					__doPostBack("",0);
				}
				else
				{
					Page_BlockSubmit = true;
					alert("請輸入大於目前資料列筆數之數字！");
					document.all["txRecordCount"].value = DgSize;
				}
			}
			break;
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060301 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060301 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1060301 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClose":
			Page_BlockSubmit = true;
			jf_ConfirmExit();
			break;
		/*case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all["txKeyFld"].focus();
			break;*/
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
			bRtnbool = true;
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	var dg1Len = document.all["dg1"].rows.length;
	for(var i=2;i<=dg1Len;i++)
	{
		var tmp = document.all["dg1__ctl"+i+"_txSummary"].value;
		if(tmp.length > TextAreaLimit/2)
		{		
			if(jf_CheckCharLength(document.all["dg1__ctl"+i+"_txSummary"].value) > TextAreaLimit)
			{
				//1060301	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["dg1__ctl"+i+"_txSummary"].focus();
				$('#dg1__ctl' + i + '_txSummary').focus();
				strErrMsg = "序號["+(i-1)+"]案情摘要長度不可大於"+TextAreaLimit+"字元(150個中文字)";
			}
		}
	}
	
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
function fnHandleTextarea()
{
    var xObject = document.activeElement;
    var tmp = xObject.value;
    if(tmp.length > TextAreaLimit/2)
	{
		if(jf_CheckCharLength(tmp) >= TextAreaLimit)
    {
		event.returnValue = false;
    }
	}
}

//檢核貼上的資料，是否超過最大字元數
function fnCheckTextarea()
{
	var obj = document.activeElement;
	var objCopyVal = window.clipboardData.getData("Text");
	var objVal = obj.value;
	if((objVal.length + objCopyVal.length) > TextAreaLimit/2)
	{
		if(jf_CheckCharLength(objVal+objCopyVal) > TextAreaLimit)
	{
			obj.value = jf_GetCharByLength(objVal + objCopyVal);
		event.returnValue = false;
		}
	}
}

//計算傳入的字串中，共計多少字元數(中文字為2字元)
function jf_CheckCharLength(strSummary)
{
	var len = strSummary.length;
	var toLen = 0;
	for(var idx=0;idx<len;idx++)
	{
		if(strSummary.charCodeAt(idx) > 255)
			toLen += 2;
		else
			toLen++;
	}
	return toLen;
}

//回傳符合最大長度(字元)的字串
function jf_GetCharByLength(strSummary)
{
	var len = strSummary.length;
	var toLen = TextAreaLimit;
	for(var idx=0;idx<len;idx++)
	{
		if(strSummary.charCodeAt(idx) > 255)
			toLen -= 2;
		else
			toLen--;
		if(toLen == 0)
			return strSummary.substring(0,idx+1);
		else if(toLen < 0)
			return strSummary.substring(0,idx);
	}
}