/*
DATE	SA		PRG		MGR_NO			DESC
1140922 David   Joe     1140760         新增程式
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
//1050722 Zen 1050087  二代公文修改
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
	
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if ($('#h_DeptInfo').val() == "")
			{
				Page_BlockSubmit = true;
				alert('請選擇單位');
			}
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
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

function dlDeptOnChange() {
	var str = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;//使用者點選選單，選到的是哪個index值
	var dlSect = document.all["dlSect"];
	document.all["h_DeptInfo"].value = str;//將單位放入隱藏欄位
	document.all["h_SectInfo"].value = "";
	fnClearDropDownList(dlSect);
	document.all.SectList.value = "";
	if (document.all["dlDept"].selectedIndex > 0)//index有可能是0"空白"的情況
	{
		document.all["dlSect"].className = "KeyField";
		var Sectvalue = ED1.EDT146.GetSub(document.all["SsoArtifact"].value, str).value;
		if (Sectvalue.length > 0) {
			dlSect.options.add(new Option("", ""));//DropDownList新增一個空白
			for (var i = 0; i < Sectvalue.length; i++) {
				var strSect = Sectvalue[i];
				dlSect.options.add(new Option(strSect.split('|')[0], strSect.split('|')[1]));
				document.all.SectList.value += strSect + ";"
			}
		}
		else {
			fnClearDropDownList(dlSect);
			document.all["dlSect"].className = "hide";
		}
	}
	else {
		fnClearDropDownList(dlSect);
		document.all["dlSect"].className = "hide";
	}
}

function dlSectOnChange() {
	var str = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value;//使用者點選選單，選到的是哪個index值
	document.all["h_SectInfo"].value = str;//將科別放入隱藏欄位
}

function fnClearDropDownList(obj)//專用呼叫清空
{
	while (obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
		obj.options.remove(0);
}