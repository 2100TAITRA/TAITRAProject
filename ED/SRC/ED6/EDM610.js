/*
DATE	SA		PRG		MGR_NO		DESC
1050407	Kevin   Justin	1050087	    二代公文修改
1051019 Leslie  Kenny   1050087     二代公文修改
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

//1050407 Justin 1050087 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050407 Justin 1050087 二代公文修改
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
	
    //1050407 Justin 1050087 二代公文修改 
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
		    Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050407 Justin 1050087 二代公文修改 
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
				Page_BlockSubmit = true;
		    //1050407 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050407 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050407 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    /*1050505 Justin 1050087 二代公文修改
			document.all["txSuppCode"].focus();*/
			$('#txSuppCode').focus();
			break;
		case "btSearch":
		    Page_BlockSubmit = true;
			var strUrl = "";
			var strKeyCol = escape(jf_Trim(document.all["txSuppCode"].value));   //用網址傳中文時，要先用escape()轉碼
			var strMainTableCol1 = escape(jf_Trim(document.all["txSuppNotes"].value));   //用網址傳中文時，要先用escape()轉碼
			strUrl = "EDM610C1.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1;
			jf_OpenChildWin(strUrl, "EDM610C1", 800, 600 );
			
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
	
	if (document.all["txSuppCode"].value == "")
	{
	    strErrMsg += "補件原因代碼欄位不可空白\n";
	    /*1050505 Justin 1050087 二代公文修改
		document.all["txSuppCode"].focus();*/
	    $('#txSuppCode').focus();
	}
	
	if (document.all["txSuppNotes"].value == "")
	{
	    strErrMsg += "補件原因說明欄位不可空白\n";
	    /*1050505 Justin 1050087 二代公文修改
		document.all["txSuppNotes"].focus();*/
	    $('#txSuppNotes').focus();
	}
	else if (txSuppNotesContentIsNullChar(document.all["txSuppNotes"].value))//不允許輸入SUPP_NOTES的內容含有空白
	{
	    strErrMsg += "補件原因說明欄位不可空白\n";
	    /*1050505 Justin 1050087 二代公文修改
	    document.all["txSuppNotes"].focus();*/
	    $('#txSuppNotes').focus();
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
			document.all["txSuppCode"].value = jf_Trim(argResult.value.RtnStr);
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
	
	if(argCallerId == "EDM610C1")
	{
		document.all["txSuppCode"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txSuppNotes"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		if(document.all["txSuppCode"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	    /*1050505 Justin 1050087 二代公文修改
		document.all["txSuppCode"].focus();*/
		$('#txSuppCode').focus();
	}
	
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//檢查輸入的『補件原因說明』欄位內容是否是空白字元的function -Bill
function txSuppNotesContentIsNullChar()
{
    var l = document.all.txSuppNotes.value;
    var bRtn = false;
    for(i=0; i<l.length; i++)
    {
        var isNull = document.all.txSuppNotes.value.substr(i, 1);
        if(isNull == " " || isNull == "　")
            bRtn = true;
        else
            bRtn = false;
    }
    return bRtn;
}
