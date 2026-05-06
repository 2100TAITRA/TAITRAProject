/* DATE		SA		PRG		MGR_NO			DESC
 * 1030910  Kevin	Hank	1030712			IIM905 to IFM905: 由Template V2 轉換至 V3 版本 
 * 1050812	Kevin	Kevin_C	1050087			升二代
 * 1051019	Leslie	Joe		1050087			二代修改配合行動平台
 * 1070830	Kevin	Joe		1070678			配合內政部IIS環境設定改為使用AjaxPro
 * 1071026	Kevin	Joe		1070678			錯誤修正
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

//1050812	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--S
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
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--E

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
		case btHelp:
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050812	Kevin_C	1050087	升二代
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
	
	//1050812	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName=event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050812	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
			{
				Page_BlockSubmit = true;
			}
			//1050812	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	return jf_CheckBeforSave();
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	//檢查第二組欄位 若其他欄位有值 則發行者也必須有值 Start
	var bGroup2Check = false;
	if(jf_Trim(document.all["txRootCA2"].value) != "")
		bGroup2Check = true;
	if(jf_Trim(document.all["txRelayCA2"].value) != "")
		bGroup2Check = true;
	if(jf_Trim(document.all["txCA2"].value) != "")
		bGroup2Check = true;
	if(jf_Trim(document.all["txCARL2"].value) != "")
		bGroup2Check = true;
	if(jf_Trim(document.all["txCRL2"].value) != "")
		bGroup2Check = true;
	if(jf_Trim(document.all["txRmk2"].value) != "")
		bGroup2Check = true;
		
	if(bGroup2Check && (jf_Trim(document.all["txIssuer2"].value) == ""))
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(UnAllowEmpty), new Array(["第二組發行者"]) ), "" );
		return bRtnbool;
	}
	//End

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
		}
		else
		{
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

//1011105 配合新增CA更換金鑰及升級演算法，一併修正欄位檢核邏輯(增加Client端之檢核)
function jf_CheckFileExist(argMsg,argValue,argIssueColumn)
{
	if(jf_Trim(argValue) == "")
		return;
	
	if(!argIssueColumn)
	{
		//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
		// var rtn = IFM905.CheckCAName(argValue,"").value;
		//1071026	Joe		1070678		錯誤修正
		// var rtn = IF.IFM905.CheckCAName(argValue,"").value;
		var rtn = IF1.IFM905.CheckCAName(argValue,"").value;
		if(rtn != "")
		{
			alert(argMsg+rtn);
			event.srcElement.focus();
		}
	}
	else
	{
		//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
		// var rtn = IFM905.CheckCAName(argValue,document.all[argIssueColumn].value).value;
		//1071026	Joe		1070678		錯誤修正
		// var rtn = IF.IFM905.CheckCAName(argValue,document.all[argIssueColumn].value).value;
		var rtn = IF1.IFM905.CheckCAName(argValue,document.all[argIssueColumn].value).value;
		if(rtn != "")
		{
			if(rtn.indexOf("CA名稱") != -1)
			{
				if(window.confirm(argMsg+rtn+"\n是否以目前CA名稱進行設定？"))
				{
					var tmp = rtn.substring(rtn.indexOf("[")+1,rtn.length);
					tmp = tmp.substring(0,tmp.indexOf("]"));
					document.all[argIssueColumn].value = tmp;
				}
				else
					//1050812	Kevin_C	1050087	升二代
					//document.all[argIssueColumn].focus();
					$('#'+argIssueColumn).focus();
			}
			else
			{
				alert(argMsg+rtn);
				event.srcElement.focus();
			}
		}
	}
}


function jf_CheckDgFileExist(argValue,bCheckIssue)
{
	var xObjectName = event.srcElement.id;
	
	if(jf_Trim(argValue) == "")
		return;
	
	if(!bCheckIssue)
	{
		//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
		// var rtn = IFM905.CheckCAName(argValue,"").value;
		//1071026	Joe		1070678		錯誤修正
		// var rtn = IF.IFM905.CheckCAName(argValue,"").value;
		var rtn = IF1.IFM905.CheckCAName(argValue,"").value;
		if(rtn != "")
		{
			alert(rtn);
			event.srcElement.focus();
		}
	}
	else
	{
		var IssueColumn = xObjectName.replace('txRootCAidv','txIdvIssuer').replace('txCAidv','txIdvIssuer');
		//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
		// var rtn = IFM905.CheckCAName(argValue,document.all[IssueColumn].value).value;
		//1071026	Joe		1070678		錯誤修正
		//var rtn = IF.IFM905.CheckCAName(argValue,document.all[IssueColumn].value).value;
		var rtn = IF1.IFM905.CheckCAName(argValue,document.all[IssueColumn].value).value;
		
		if(rtn != "")
		{
			if(rtn.indexOf("CA名稱") != -1)
			{
				if(window.confirm(rtn+"\n是否以目前CA名稱進行設定？"))
				{
					var tmp = rtn.substring(rtn.indexOf("[")+1,rtn.length);
					tmp = tmp.substring(0,tmp.indexOf("]"));
					document.all[IssueColumn].value = tmp;
				}
				else
					//1050812	Kevin_C	1050087	升二代
					//document.all[argIssueColumn].focus();
					$('#'+argIssueColumn).focus();
			}
			else
			{
				alert(rtn);
				event.srcElement.focus();
			}
		}
	}
		
}

function jf_CheckIssue(argCaColumn)
{
	if(jf_Trim(event.srcElement.value) != '')
		document.all[argCaColumn].onblur();
}

function jf_CheckDgIssue()
{
	var xObjectName = event.srcElement.id;
	var CaColumn = xObjectName.replace('txIdvIssuer','txCAidv');
	if(jf_Trim(event.srcElement.value) != '')
		document.all[CaColumn].onblur();
}
