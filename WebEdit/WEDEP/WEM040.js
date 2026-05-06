/*
Date		SA		PRG		MGR_NO		DESC
0951012		Stella	Shelly	000157		針對符號表進行維護作業
1050524		Cloud	Joe		1050087		二代系統升級
1051031		Leslie	Joe		1050087		二代修改配合行動平台
1110413		Kevin	David	1110221		弱掃修正Stored XPath Injection
1120901 	Kevin	Joe 	1120709 	弱掃修正Client Potential XSS
1131011		Joe		Joe		1130941		調整弱掃修正方式
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
var strTableFields = new Array("_lbSign","_lbDesc");

//1050524	Joe	1050087	二代系統升級
/*
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
if(document.all.dg1)
{
	if(document.all.tbSelect)
		document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
}
*/
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

	//1110413 David 1110221 弱掃修正
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		//1120901 Joe 1120709 弱掃修正Client Potential XSS
		// document.all["dg1__ctl"+iRow+"_lbSign"].value = $(document.createElement('div')).html(document.all["dg1__ctl"+iRow+"_lbSign"].value).text();
		//1131011	Joe		1130941		調整弱掃修正方式，因Server端Encode，client端依照一般弱掃修正進行Decode就好，$().html會被XSS掃出
		// document.all["dg1__ctl"+iRow+"_lbSign"].textContent = $(document.createElement('div')).html(HtmlEncode(document.all["dg1__ctl"+iRow+"_lbSign"].textContent)).text();
		document.all["dg1__ctl"+iRow+"_lbSign"].textContent = htmlDecode(document.all["dg1__ctl"+iRow+"_lbSign"].textContent);
		document.all["dg1__ctl"+iRow+"_lbDesc"].textContent = htmlDecode(document.all["dg1__ctl"+iRow+"_lbDesc"].textContent);
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051031	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051031	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050524	Joe	1050087	二代系統升級，傳入參數event
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//1050524	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050524	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			Page_BlockSubmit = false;
			//1050524	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050524	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1050524	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			//1050524	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txSign"].focus();
			$('#txSign').focus();
			break;
		case "btSearch":
			/*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			*/
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1050524	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1050524	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteSelected":
			if(IsCheck())
			{
				Page_BlockSubmit = false;
			}
			else
			{
				alert("至少須勾選一筆!");
				Page_BlockSubmit = true;
			}
			//1050524	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btAddSelected":
			Page_BlockSubmit = !jf_CheckBeforAdd();
			//1050524	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txSign"].value == "")
	{
		strErrMsg += "鍵值欄位不可空白\n";
		//1050524	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txSign"].focus();
		$('#txSign').focus();
	}
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	return true;
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
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function IsCheck()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cbSelect"].checked)
			return true;
	}
	return false;
}

function jf_CheckBeforAdd()
{
	var bRtnbool = true;
	var strErrMsg= "";
	if (document.all["txSign"].value == "")
	{
		alert("符號欄位不可空白\n");
		bRtnbool = false;
		//1050524	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txSign"].focus();
		$('#txSign').focus();
	}
	return bRtnbool;
}

var i,j;

//全部選取
function jf_SelectAll(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
	
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
			obj.checked = true;	
	}
}

//反向選取
function jf_SelectInverse(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
		
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
		{
			if(obj.checked)
				obj.checked = false;
			else
				obj.checked = true;
		}
	}
}

//清除選取
function jf_SelectClear(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
		
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
			obj.checked = false;
	}
}

//刪除選取
function jf_DeleteSelected(argTableName, argCheckBoxName, argTableFields)
{
	if(document.all[argTableName] == null)
		return;
		
	var nChecked = 0;
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.checked)
		{
			obj.checked = false;
			var len2 = argTableFields.length;
			for(j = 0; j < len2; j++)
			{
				var tmpObj = document.all[argTableName+"__ctl"+ i + argTableFields[j]];
				if(tmpObj.type == "text") //TextBox
				{
					tmpObj.value = "";
				}
				else if(tmpObj.type == "textarea") //TextArea
				{
					tmpObj.value = "";
				}
				else if(tmpObj.type == "checkbox") //CheckBox
				{
					tmpObj.checked = false;
				}
				else if(tmpObj.type == "radio") //RadioButton
				{
					tmpObj.checked = false;
				}
				else if(tmpObj.type == "select-one") //DropDownList
				{
					tmpObj.selectedIndex = 0;
				}
				else if(tmpObj.nodeName == "SPAN") //Label
				{
					tmpObj.textContent = "";
				}
			}
			nChecked = 1;
		}
	}
	
	if(nChecked == 0)
		return false
	else
		return true
}

function jf_SelectBarSubmit()
{
	var o=document.all.tbSelect.getItem(event.flatIndex);
	document.all.ToolBarSenderID.value = o.getAttribute("ID");
	
	if(Page_BlockSubmit==false)
	{
		IsServerHandling = true;
		jf_ShowWaitState();
		__doPostBack("tbSelect",event.flatIndex);
	}
}
function fnEditValue(argSeq,argValue,argText)
{
	//1131011	Joe		1130941		調整弱掃修正方式
	// document.all.txSign.value = argValue;
	// document.all.txDesc.value = argText;
	// document.all.H_txSeq.value = argSeq;
	document.all.txSign.value = htmlDecode(argValue);
	document.all.txDesc.value = htmlDecode(argText);
	document.all.H_txSeq.value = htmlDecode(argSeq);
}

//1131011	Joe		1130941		調整弱掃修正方式
/*
//1120901 Joe 1120709 弱掃修正Client Potential XSS
function HtmlEncode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}
*/
function htmlDecode(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    return div.innerText || div.textContent;
}
