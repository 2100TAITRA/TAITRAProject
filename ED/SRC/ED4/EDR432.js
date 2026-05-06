/*
DATE	SA		PRG		MGR_NO				DESC
1010831 Kevin   Jagle   1010387             新增程式
1050421	Kevin	Joe 	1050087				二代公文修改
1050803	Kevin	Joe		1050087				修改子視窗大小
1051019 Leslie  Kenny   1050087             二代公文修改
1060509	Kevin	Joe		1060215				調整控制項取值方式
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

//1050421 Joe 1050087 二代公文修改
/*
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1050803	Joe		1050087		二代公文修改
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
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
		//1050803	Joe		1050087		二代公文修改--S
		// case "tbDate":
			// Page_BlockSubmit=true;
			// jf_CallCalendar(document.all["txDate"], event.screenX, event.screenY);
			// CheckCDATE("txDate","列印日期");
			// break;
		//1050803	Joe		1050087		二代公文修改--E
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050421 Joe 1050087 二代公文修改，傳入event參數
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
	
	//1050421 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":
			var xUrl = "../../../ODDEP/ODP420.aspx?nMode=EXEC&SAMLart="+document.all.H_Artifact.value;
			//1050803	Joe		1050087		修正子視窗大小
			// jf_OpenChildWin(xUrl,"ODP420",760,500);
			jf_OpenChildWin(xUrl,"ODP420",800,600);
			Page_BlockSubmit = true;
			break;
		case "btExcel":
			if(CheckCDATE("txDate","列印日期"))
			{
				Page_BlockSubmit = false;
				//1050421 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
	}
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//日期onblur
var bDateCheck = false;
function CheckCDATE(argObj,strMsg)
{
	if (bDateCheck)
	{
		bDateCheck = false;
		return;
	}
	bDateCheck = true;
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
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bDateCheck = false;
			return false;
		}
		//1060509	Joe	1060215	調整控制項取值方式
		// if(strDate > document.all.H_StaticDate.innerText)
		if(strDate > document.all.H_StaticDate.textContent)
		{
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			alert("列印日期不可超過最大統計日");
		}
	}
	bDateCheck = false;
	return true;
}