/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人  單號		概要
 * -------------------------------------------------------------------------------------------------
 * 1100323      CLOUD   1100199     新增批號查詢子視窗
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	if (document.all["HideDept"] != undefined)
	{
		document.all["trDeptinfo"].className = "hide";
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
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	strBtId = xObjectName;
	
	switch (xObjectName)
	{
	    case 'btHelpS':
	    case 'btHelpE':
	        Page_BlockSubmit = true;
	        var strUrl = "/AK/AKS502.aspx?rtnObj=lbReturnValue&k1=0&SAMLart=" + jf_GetArtifact();
	        jf_OpenChildWin(strUrl, "AKS502", 800, 600);
	        break;
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
			jf_ToolBarSubmit(xObjectName);
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
var strBtId = '';
function CallBack(argCallerId)
{
    if (argCallerId == "AKS502") {
        if (strBtId == "btHelpS")
            document.all["txBorNoS"].value = document.all["lbReturnValue"].options[0].value;
        else
            document.all["txBorNoE"].value = document.all["lbReturnValue"].options[0].value;
    }
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{    
	try
	{
		opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].text = argLink;
		opener.document.all.lbReturnValue.options[0].value = argLink;
		opener.window.CallBack("EAR816C1");
		close();
	}
	catch (e) {}
    
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function CheckDateRange(xObjectName)
{
	var strMsg		= "日期格式不正確，請檢查\n";
	if(document.all[xObjectName].value != "")
	{
		if(!jf_CheckCDATE(document.all[xObjectName].value))
		{
			alert(strMsg);
			$('#' + xObjectName).focus();
		}
	}
}

function OnblurCallCalendar(argObj)
{
	Page_BlockSubmit=true;
	jf_CallCalendar(document.all[argObj], event.screenX, event.screenY);	
}
