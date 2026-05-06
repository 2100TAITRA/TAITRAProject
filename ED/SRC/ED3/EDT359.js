/*
DATE	SA		PRG		MGR_NO		DESC
1030804	David	Kenny	1030621		新增程式
1070126 David   Justin  1050087     二代公文修改
1070830 Kevin   Justin  1070678     弱掃AJAX修改
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
//1070126 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1070830 Justin [1070678]弱掃AJAX修改
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1070126 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	var btHelp;
	
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
//1070126 Justin [1050087] 二代公文修改 
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
	
    //1070126 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if ( jf_CheckBeforeOpen() )
			{
				Page_BlockSubmit = false;
			    //1070126 Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
		    //1070126 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClose":
			Page_BlockSubmit = false ;
		    //1070126 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancelClose":
			Page_BlockSubmit = !jf_ConfirmCancelClose();
		    //1070126 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1070126 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

// 開啟前之欄位檢查
function jf_CheckBeforeOpen()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txDocNo"].value == "")
	{
	    strErrMsg += "公文文號不可空白";
	    //1070126 Justin [1050087] 二代公文修改
	    //document.all["txDocNo"].focus();
	    $('#txDocNo').focus();
	}
	else
	{
		var strDocNo = document.all["txDocNo"].value ;
		var strOrgNo = document.all["H_txOrgNo"].value ;
	    //1070830 Justin [1070678]弱掃AJAX修改
		//var rtnObj = EDT359.CheckAATA03TB(strDocNo, strOrgNo).value;
		var rtnObj = ED3.EDT359.CheckAATA03TB(strDocNo, strOrgNo).value;
		if(rtnObj.bSuccess)
		{
			if ( rtnObj.strStatus == "1" )
				strErrMsg += "本公文屬於訴願案件尚未辦結，請至訴願系統中確認";
			else if ( rtnObj.strStatus == "2" )
				strErrMsg += "本公文屬於訴願案件已經處理過全案辦結，無法開啟";
			else if ( rtnObj.strStatus == "3" )
				strErrMsg += "公文文號 " + rtnObj.strDocNoList + " 目前流程不在訴願會內，請相關承辦人將公文流程傳送後再進行全案辦結";
			else
			{
				document.all["H_txCASNUM"].value = rtnObj.strCASNUM;
				document.all["H_txCLSDAY"].value = rtnObj.strCLSDAY;
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

function jf_ConfirmCancelClose()
{
	
	var bRtnbool = false ;
	var strErrMsg= "";
	var rtnString = "" ;
	var strAlert = "" ;
	
	var strOrgNo = document.all["H_txOrgNo"].value ;
	var strCaseNo = document.all["H_txCASNUM"].value ;
	
    //1070830 Justin [1070678]弱掃AJAX修改
	//rtnString = EDT359.CheckDocState(strOrgNo, strCaseNo).value;
	rtnString = ED3.EDT359.CheckDocState(strOrgNo, strCaseNo).value;
	document.all["H_txCancelDocList"].value = rtnString ;
	
	if( rtnString != "" )
	{
		strAlert = "公文文號 " + rtnString + " 狀態為已歸檔，如要執行取消辦結功能可能會導致檔管資訊不正確，請問是否執行";
		if ( window.confirm(strAlert) )
			bRtnbool = true;
	}
	
	return bRtnbool ;
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
