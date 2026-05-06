/*
DATE	SA		PRG		MGR_NO		DESC
1060420	Cloud	Joe		1050087		二代系統升級
1110923	Zen		Zen		1111016		修正取得基礎項目名稱錯誤之問題
1141119	Zen		Andy	1131229		組織樹重構，改以JSON字串紀錄
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

var strTableFields = new Array("_lbTypes","_hlLink","_lbTheme");

//1060420	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
	/*
if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
	
	*/

//1110923 Zen 1111016 修正取得基礎項目名稱錯誤之問題
AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

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
	//1060420	Joe		1050087		二代公文修改
	// jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, null);	
	//1141118	Andy	1131229	調整組織樹寫法改以JSON組合
	var setting = {
		data: {
			simpleData: {
				enable: true
			}
		},
		view: {
		},
		callback: {
			beforeClick: function (treeId, treeNode) {
				return !treeNode.isParent;
			},
			onClick: function (event, treeId, treeNode) {
				if (!treeNode.isParent) {
					ReturnValue(treeNode.id);
				}
			}
		}
	};

	if (document.all['H_JsonData000'])
		document.all['H_JsonData'].value = document.all['H_JsonData000'].value;

	if (document.all.H_JsonData.value != "" && document.all['H_JsonData000']) {

		document.all.H_JsonData.value = document.all.H_JsonData.value.replace(/&quot;/g, "\"");
		var zNodes = JSON.parse('[' + document.all.H_JsonData.value + ']');

		var nJsonDataCnt = document.all['H_JsonDataCnt'].value;
		for (let i = 1; i <= nJsonDataCnt; i++) {
			let idx = jf_PADL(i + '', 3, '0');

			document.all['H_JsonData' + idx].value = document.all['H_JsonData' + idx].value.replace(/&quot;/g, "\"");
			zNodes = zNodes.concat(JSON.parse('[' + document.all['H_JsonData' + idx].value + ']'));
		}

		$.fn.zTree.init($("#Classtree"), setting, zNodes);
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060420	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060420	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060420 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060420 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			jf_txTheme_No_Onblur();
			jf_txType_No_Onblur();
			Page_BlockSubmit = !jf_CheckKeyObject();
			Page_BlockSubmit = !jf_CheckBeforSearch();
			//1060420 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			jf_txTheme_No_Onblur();
			jf_txType_No_Onblur();
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1060420 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			jf_txTheme_No_Onblur();
			jf_txType_No_Onblur();
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1060420 Joe 1050087 二代公文修改
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
			Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
			jf_SelectBarSubmit();
			break;
		case "btUp":
			Page_BlockSubmit = true;
			jf_RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			jf_RowDown("dg1", "_cbSelect", strTableFields);
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
    //1110923 Zen 1111016 修正取得基礎項目名稱錯誤之問題
    //if (jf_IsWebServiceSuccess(argResult))
    if (argResult.value.bError == false)
    {
        document.all["txReadOnly"].value = jf_Trim(argResult.value.strTypeName);
		}
		else
		{
			document.all["txReadOnly"].value = "";
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

//組出回傳值
function ReturnValue(argLink)
{    
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argLink;	    
	    opener.window.CallBack("EAC002");
	    close();
	}
	catch (e) {}
    
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function jf_txType_No_Onblur()
{	
	var txObj = jf_Trim(document.all["txType_No"].value) ;
	if ( txObj.length > 0 && txObj.length < 2 )
	{
		document.all["txType_No"].value = jf_PADL(txObj, 2, "0");
	}				
	
	if ( jf_Trim(document.all["txType_No"].value) != "" )
	{		
        //1110923 Zen 1111016 修正取得基礎項目名稱錯誤之問題
        //var arKeyName = new Array("TYPE_NO");
        //var arKeyValue = new Array(jf_Trim(document.all["txType_No"].value));
        //var arRtnFldName = new Array("TYPE_NAME");
        //var arOrdFldName = new Array("TYPE_NO");

        //var argWSParam = new Array(5);
        //argWSParam[0] = "BASIC_TYPE";
        //argWSParam[1] = arKeyName;
        //argWSParam[2] = arKeyValue;
        //argWSParam[3] = arRtnFldName;
        //argWSParam[4] = arOrdFldName;
				
        //var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, argWSParam);
        var callObj = EA01.EAC002.GetTypeName(document.all["txType_No"].value);
		OnWSResult(callObj);									
	}	
	else 
	{
		document.all["txReadOnly"].value = "";
	}	

}

function jf_txTheme_No_Onblur()
{	
	var txObj = jf_Trim(document.all["txTheme_No"].value) ;
	if ( txObj.length > 0 && txObj.length < 4 )
	{
		document.all["txTheme_No"].value = jf_PADL(txObj, 4, "0");
	}
}


//查詢前之欄位檢查
function jf_CheckBeforSearch()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (jf_Trim(document.all["txType_No"].value) != "")
	{
		if ( document.all["txType_No"].value.length > 2 )
		{
			strErrMsg += "類別編號字元個數不可超過2\n";
		}
	}
	
	if (jf_Trim(document.all["txTheme_No"].value) != "")
	{
		if ( document.all["txTheme_No"].value.length > 4 )
		{
			strErrMsg += "主題編號字元個數不可超過4\n";
		}
	}
	
	if (jf_Trim(document.all["txTheme"].value) != "")
	{
		if ( document.all["txTheme"].value.length > 20 )
		{
			strErrMsg += "主題名稱字元個數不可超過20\n";
		}
	}	

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}
ChangeView();
//95.09.27 David
function ChangeView()
{
	if(document.all.rbDataGrid.checked)
	{
		document.all.Data1.style.display = "none";
		document.all.Data2.style.display = "";
	}
	else if(document.all.rbTreeView.checked)
	{
		document.all.Data1.style.display = "";
		document.all.Data2.style.display = "none";
	}
}