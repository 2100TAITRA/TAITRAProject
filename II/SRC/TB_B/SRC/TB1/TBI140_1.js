/* *
 * Date		SA			PG			MGR_NO		DESC
 * 1040204	Cloud		Gabby		1030930		(榮總)新增TBI140_1
 * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//紀錄Call WebService物件的id
var wsDuplicateID;
var txViewPage_index=8;
var txTotalPage_index=10;
var tbws = "";
try
{
	tbws = document.all.H_TBWS.innerText;
	if(typeof(tbws) == "undefined")
		tbws = document.all.H_TBWS.textContent;
}
catch(e)
{
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//fnCheckAlertMsg(); //檢查是否alert訊息
	fnCheckDisplayDiv(); //檢查是否顯示DIV內容

	document.all["txDownload"].value = ""; //清空紀錄是否下載檔案之欄位值
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl()
function ClientButtonControl(e)
{
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btdownload":
			document.all["txDownload"].value = "Download";
			if(!fnDownload())
				Page_BlockSubmit = true;			
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
		if(jf_IsWebServiceSuccess(CallWsObj))
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

//組出回傳值
function ReturnValue(argLink)
{
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢查是否alert訊息
function fnCheckAlertMsg()
{
	if(document.all["AlertMsg"] == null)
		return;
		
	var strAlertMsg = document.all["AlertMsg"].value;
	if(strAlertMsg != "")
		parent.fnShowMsgAndClose(strAlertMsg); //呼叫母視窗顯示訊息並關閉視窗
}

//檢查是否顯示DIV內容
function fnCheckDisplayDiv()
{
	if(document.all["DisplayDiv"] == null)
		return;
	
	var strDisplayDiv = document.all["DisplayDiv"].value;
	if(strDisplayDiv == "true")
	{
		document.all["DivBulletin"].style.display = "block";
	}
	else
	{
		document.all["DivBulletin"].style.display = "none";
	}
}

//傳回電子檔數目
function fnGetFileCount()
{
	if(document.all["ListNum"] == null)
		return;
		
	return document.all["ListNum"].value;
}

//下載勾選電子檔
function fnDownload()
{
	var bChecked = false;
	
	//檢查CheckBox是否被勾選
	for(var i = 2; i < document.all["dg1"].rows.length+2; i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect2"].checked)
			bChecked = true;
	}
	
	//沒有任何CheckBox被勾選時
	if(bChecked == false)
	{
		jf_ShowMsg("請至少勾選一個電子檔", "");
	}
	else
	{
		document.all["txDownload"].value = "Download"; //設定值告知Server需下載檔案
		IsServerHandling = true;
		jf_ShowWaitState();
		__doPostBack("txDownload", ""); //PostBack回Server
	}
	return bChecked;
}

//按下連結時開啟子視窗
function fnHyperLink(argBulletinId, argFileType, argSeqNo, argSAMLart, argbsStrusername)
{
	var strUrl = "TBI200.aspx?rtnObj=lbReturnValue&BulletinId=" + argBulletinId + "&FileType=" + argFileType;
	if(argSeqNo != "") //有附件檔時設定附件檔序號
	{
		strUrl += "&SeqNo=" + argSeqNo;
	}
	//開啟附件時若需身分驗證才需傳SAMLart
	if(argbsStrusername != "")
	{
	strUrl += "&KStr=" + argbsStrusername + "&OpenType=2";
	}
	else
	{
	strUrl += "&SAMLart=" + argSAMLart + "&OpenType=1";
	}
	
	jf_OpenChildWin(strUrl, "");
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle()
{
	var xObjectName;
		
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	xObjectName= window.event.srcNode.getAttribute("ID");
	
	switch (xObjectName)
	{
	}
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)--檔案下載功能
* 
*****************************************************************************/
function fnContextMenu()
{
	if(document.selection.type == "Text")
		event.cancelBubble = true;
}
function fnCheckAttItem(strCheckId)
{
	var Row = strCheckId.id.substr(0,strCheckId.id.lastIndexOf("_")+1);
	var lbFileType = Row+"lbFileType";
	var FileType = document.all[lbFileType].innerText;
	if(FileType == "AttTitle" || FileType == "FromAttTitle")
	{
		var type = "1";
		if(FileType == "FromAttTitle")
			type = "4";
		for(var i = 2; i < document.all["dg1"].rows.length+2; i++)
		{
			if(document.all["dg1__ctl" + i + "_lbFileType"].innerText == type)
			{
				if(document.all[Row+"cbSelect"].checked)
					document.all["dg1__ctl" + i + "_cbSelect2"].checked = true;
				else
					document.all["dg1__ctl" + i + "_cbSelect2"].checked = false;
			}
		}
	}
	else if(FileType == "1" || FileType == "4")
	{
		var AllCkeck = true;
		for(var i = 2; i < document.all["dg1"].rows.length+2; i++)
		{
			if(document.all["dg1__ctl" + i + "_lbFileType"].innerText == FileType)
			{
				if(!document.all["dg1__ctl" + i + "_cbSelect2"].checked)
				{
					AllCkeck = false;
					break;
				}
			}
		}
		var Title = "AttTitle";
		if(FileType == "4")
			Title = "FromAttTitle";
		
		for(var i = 2; i < document.all["dg1"].rows.length+2; i++)
		{
			if(document.all["dg1__ctl" + i + "_lbFileType"].innerText == Title)
			{
				if(AllCkeck)
					document.all["dg1__ctl" + i + "_cbSelect"].checked = true;
				else
					document.all["dg1__ctl" + i + "_cbSelect"].checked = false;
				break;
			}
		}
	}
	else
	{
		if(document.all[Row+"cbSelect"].checked)
			document.all[Row+"cbSelect2"].checked = true;
		else
			document.all[Row+"cbSelect2"].checked = false;
	}
}