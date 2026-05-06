/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1050712	Kevin	Kevin_C	1050087		升二代
 * 1051019	Leslie	Joe		1050087		二代修改配合行動平台
 * 1051110	Kevin	Kevin_C	1051094		修正子視窗改為非獨占導致清空Cookie後，子視窗無法取得Cookie的問題
 * 1071001  Kevin   Joe     1070678 	修正弱掃cookie
 * 1080816	Kevin	Joe		1080628		修正開啟子視窗前需進行編碼
 * 1130215	Joe		Joe		1121022		新增記錄排序
 * 1150206	Zen		Andy	序63        修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
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
//1130215	Joe		1121022		新增記錄排序
//var strTableFields = new Array("_lbRead","_txInput1","_txInput2");
var strTableFields = new Array("_hlKey", "_lbType", "_lbPath", "_hlOpenUrl", "_h_KeyName");

//1050712	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


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
		case "btUp":
			Page_BlockSubmit = true;
			RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			RowDown("dg1", "_cbSelect", strTableFields);
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050712	Kevin_C	1050087	升二代
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
	
	//1050712	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = true;
			//1050712	Kevin_C	1050087	升二代 -S
			//1071001	Joe		1070678		弱掃修正cookie--S
			// jf_SaveCookie("nIFM610C1Orgno", "");
			// jf_SaveCookie("nIFM610C1UserName", "");
			// jf_SaveCookie("nIFM610C1CutName", "");	
			// jf_SaveCookie("nIFM610C1Mode", "");
			//1071001	Joe		1070678		弱掃修正cookie--E
			//1050712	Kevin_C	1050087	升二代 -E
			//1071001	Joe		1070678		弱掃修正cookie
			//jf_SaveCookie("nIFM610C1Mode", document.all.nMode.value);	//Charles 紀錄目前維護模式 0960308
			//1050712	Kevin_C	1050087	升二代 -S
		    //var ret = jf_ShowModal("IFM610C1.htm",600,400);
			//if( typeof(ret) == "boolean" && ret == true)
			//	window.location.reload();
			//1071001	Joe		1070678		弱掃修正cookie--S
			// jf_ShowModal("IFM610C1.htm",700,450);
			//1080816	Joe		1080628		新增開啟子視窗前轉碼
			// jf_ShowModal("IFM610C1.aspx?nIFM610C1Mode=" + document.all.nMode.value,700,450);
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//jf_ShowModal("IFM610C1.aspx?nIFM610C1Mode=" + encodeURIComponent(document.all.nMode.value),700,450);
			jf_ShowModal("IFM610C1.aspx?nIFM610C1Mode=" + encodeURIComponent(document.all.nMode.value));
			//1071001	Joe		1070678		弱掃修正cookie--E
			//1050712	Kevin_C	1050087	升二代 -E
			
			//1051110	Kevin_C	1051094	修正子視窗改為非獨占導致此處清空Cookie後，子視窗無法取得Cookie的問題
			//jf_SaveCookie("nIFM610C1Mode", "");	//Charles 清空Cookie 0960308
			break;
		//1130215	Joe		1121022		新增記錄排序
		case "btSave":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
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
	//1050712	Kevin_C	1050087	升二代 -S
	if(argCallerId == "IFM610C1")
	{
		if( document.all.lbReturnValue.options[0].value == "true")
			window.location.reload();
	}
	//1050712	Kevin_C	1050087	升二代 -E
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/


function fnOpenCWin(argOrgno,argUserName,argCutName)
{
	//1071001	Joe		1070678		弱掃修正cookie--S
	// jf_SaveCookie("nIFM610C1Orgno", argOrgno);
	// jf_SaveCookie("nIFM610C1UserName", argUserName);
	// jf_SaveCookie("nIFM610C1CutName", argCutName);		
	// jf_SaveCookie("nIFM610C1Mode", document.all.nMode.value);	//紀錄目前維護模式
	//1071001	Joe		1070678		弱掃修正cookie--E
	//1050712	Kevin_C	1050087	升二代 -S
	//var ret = jf_ShowModal("IFM610C1.htm",600,400);
	//if( typeof(ret) == "boolean" && ret == true)
	//	window.location.reload();
	////清空Cookie
	//jf_SaveCookie("nIFM610C1Orgno", "");
	//jf_SaveCookie("nIFM610C1UserName", "");
	//jf_SaveCookie("nIFM610C1CutName", "");	
	//jf_SaveCookie("nIFM610C1Mode", "");	//清空Cookie
	//1071001	Joe		1070678		弱掃修正cookie
	// jf_ShowModal("IFM610C1.htm",700,450);
	//1080816	Joe		1080628		新增開啟子視窗前轉碼
	// jf_ShowModal("IFM610C1.aspx?nIFM610C1Orgno=" + argOrgno + "&nIFM610C1UserName=" + argUserName + "&nIFM610C1CutName=" + argCutName + "&nIFM610C1Mode=" + document.all.nMode.value ,700,450);
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFM610C1.aspx?nIFM610C1Orgno=" + argOrgno + "&nIFM610C1UserName=" + argUserName + "&nIFM610C1CutName=" + encodeURIComponent(argCutName) + "&nIFM610C1Mode=" + encodeURIComponent(document.all.nMode.value), 700, 450);
	jf_ShowModal("IFM610C1.aspx?nIFM610C1Orgno=" + argOrgno + "&nIFM610C1UserName=" + argUserName + "&nIFM610C1CutName=" + encodeURIComponent(argCutName) + "&nIFM610C1Mode=" + encodeURIComponent(document.all.nMode.value));
	//1050712	Kevin_C	1050087	升二代 -E
}

//開啟捷徑函式
function fnOpenShortCut(argValue,argType)
{
	if(argType == "local")
	{
		//1071001	Joe		--		升二代移除本機應用程式功能--S
		// var oShell = new ActiveXObject("Shell.Application");
		// oShell.Open(argValue);
		//1071001	Joe		--		升二代移除本機應用程式功能--E
	}
	else
	{
		//打開以全營幕開啓
		var ret = jf_OpenChildWin(argValue,"",screen.height,screen.width);
	}
}

//向上移動
//1130215	Joe		1121022		新增記錄排序
function RowUp(argTableName, argCheckBoxName, argTableFields) {
	if (document.all[argTableName] == null)
		return;

	var strTemp = new Array();
	var nChecked = 0;
	var nCount = 0;

	var len = document.all[argTableName].rows.length + 1;
	for (i = 2; i < len; i++) {
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		if (obj.checked) {
			if (nCount == 0) {
				var len2 = argTableFields.length;
				for (j = 0; j < len2; j++) {
					var tmpObj = document.all[argTableName + "__ctl" + i + argTableFields[j]];
					if (tmpObj.type == "text") //TextBox
					{
						strTemp[j] = tmpObj.value;
					}
					else if (tmpObj.nodeName == "SPAN") //Label
					{
						strTemp[j] = tmpObj.innerText;
					}
					else if (tmpObj.type == "checkbox") //CheckBox 0960604 Leo
					{
						strTemp[j] = tmpObj.checked;
					}
					else if (tmpObj.nodeName == "A") //Hyperlink
					{
						let tmpArr = new Array();
						tmpArr.push(tmpObj.href);
						tmpArr.push(tmpObj.innerText);
						strTemp[j] = tmpArr;
					}
				}
				nChecked = i;
				nCount += 1;
			}
			else {
				alert("一次只能移動一筆資料");
				return;
			}
		}
	}

	//單一選取且不為第一筆
	var bChange = true;
	if (nCount == 1 && nChecked != 2) {
		document.all[argTableName + "__ctl" + nChecked + argCheckBoxName].checked = false;
		var nTmp = nChecked - 1;
		while (document.all[argTableName + "__ctl" + nTmp + argCheckBoxName].disabled == true) {
			if (nTmp > 2)
				nTmp--;
			else {
				bChange = false;
				break;
			}
		}

		if (bChange) {
			document.all[argTableName + "__ctl" + nTmp + argCheckBoxName].checked = true;

			var len3 = argTableFields.length;
			for (j = 0; j < len3; j++) {
				var ChangedObj = document.all[argTableName + "__ctl" + nChecked + argTableFields[j]];
				var tmpObj = document.all[argTableName + "__ctl" + nTmp + argTableFields[j]];
				if (tmpObj.type == "text") //TextBox
				{
					ChangedObj.value = tmpObj.value;
					tmpObj.value = strTemp[j];
				}
				else if (tmpObj.nodeName == "SPAN") //Label
				{
					ChangedObj.innerText = tmpObj.innerText;
					tmpObj.innerText = strTemp[j];
				}
				else if (tmpObj.type == "checkbox") //CheckBox 0960604 Leo
				{
					ChangedObj.checked = tmpObj.checked;
					tmpObj.checked = strTemp[j];
				}
				else if (tmpObj.nodeName == "A") //Hyperlink
				{
					ChangedObj.href = tmpObj.href;
					ChangedObj.innerText = tmpObj.innerText;
					tmpObj.href = strTemp[j][0];
					tmpObj.innerText = strTemp[j][1];
				}

			}
		}
	}
}

//向下移動
function RowDown(argTableName, argCheckBoxName, argTableFields) {
	if (document.all[argTableName] == null)
		return;

	var strTemp = new Array();
	var nChecked = 0;
	var nCount = 0;

	var len = document.all[argTableName].rows.length + 1;
	for (i = 2; i < len; i++) {
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		if (obj.checked) {
			if (nCount == 0) {
				var len2 = argTableFields.length;
				for (j = 0; j < len2; j++) {
					var tmpObj = document.all[argTableName + "__ctl" + i + argTableFields[j]];
					if (tmpObj.type == "text") //TextBox
					{
						strTemp[j] = tmpObj.value;
					}
					else if (tmpObj.nodeName == "SPAN") //Label
					{
						strTemp[j] = tmpObj.innerText;
					}
					else if (tmpObj.type == "checkbox") //CheckBox 0960604 Leo
					{
						strTemp[j] = tmpObj.checked;
					}
					else if (tmpObj.nodeName == "A") //Hyperlink
					{
						let tmpArr = new Array();
						tmpArr.push(tmpObj.href);
						tmpArr.push(tmpObj.innerText);
						strTemp[j] = tmpArr;
					}
				}
				nChecked = i;
				nCount += 1;
			}
			else {
				alert("一次只能移動一筆資料");
				return;
			}
		}
	}

	//單一選取且不為最後一筆
	var bChange = true;
	var nLast = document.all[argTableName].rows.length;
	if (nCount == 1 && nChecked != nLast) {
		document.all[argTableName + "__ctl" + nChecked + argCheckBoxName].checked = false;
		var nTmp = nChecked + 1;
		while (document.all[argTableName + "__ctl" + nTmp + argCheckBoxName].disabled == true) {
			if (nTmp < nLast)
				nTmp++;
			else {
				bChange = false;
				break;
			}
		}

		if (bChange) {
			document.all[argTableName + "__ctl" + nTmp + argCheckBoxName].checked = true;

			var len3 = argTableFields.length;
			for (j = 0; j < len3; j++) {
				var ChangedObj = document.all[argTableName + "__ctl" + nChecked + argTableFields[j]];
				var tmpObj = document.all[argTableName + "__ctl" + nTmp + argTableFields[j]];
				if (tmpObj.type == "text") //TextBox
				{
					ChangedObj.value = tmpObj.value;
					tmpObj.value = strTemp[j];
				}
				else if (tmpObj.nodeName == "SPAN") //Label
				{
					ChangedObj.innerText = tmpObj.innerText;
					tmpObj.innerText = strTemp[j];
				}
				else if (tmpObj.type == "checkbox") //CheckBox 0960604 Leo
				{
					ChangedObj.checked = tmpObj.checked;
					tmpObj.checked = strTemp[j];
				}
				else if (tmpObj.nodeName == "A") //Hyperlink
				{
					ChangedObj.href = tmpObj.href;
					ChangedObj.innerText = tmpObj.innerText;
					tmpObj.href = strTemp[j][0];
					tmpObj.innerText = strTemp[j][1];
				}
			}
		}
	}
}