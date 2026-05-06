/*
DATE		SA		PRG		MGR_NO		DESC
1040106	    Kevin	Kevin_C	1030976		新增程式
1051118	    David   Kenny	1050087	    二代公文系統相關修改
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


//1051118	Kenny   [1050087]	二代公文系統相關修改
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
//1051118   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051118   Kenny   [1050087]   二代公文修改
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
//1051118	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1051118	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1051118	Kenny   [1050087]	二代公文系統相關修改
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
			//1051118	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1051118	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1051118	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1051118	Kenny   [1050087]	二代公文系統相關修改
            //document.all["txMailName"].focus();
            $('#txMailName').focus(); 
			break;
		case "btSearch":
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txCodeNo"].value);
			strUrl = "EDC041.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol;
            //1051118	Kenny   [1050087]	二代公文系統相關修改；調整開啟子視窗大小
			//jf_OpenChildWin(strUrl, "EDC041", 700, 500 );
            jf_OpenChildWin(strUrl, "EDC041", 800, 600 );
			break;
        //1051118	Kenny   [1050087]	二代公文系統相關修改；無此功能鍵，移除--Start--
		//case "btPrint":
		//	Page_BlockSubmit = !jf_ConfirmPrint();
		//	jf_ToolBarSubmit();
		//	break;
		//case "btPreview":
		//	Page_BlockSubmit = !jf_ConfirmPreview();
		//	jf_ToolBarSubmit();
		//	break;
        //1051118	Kenny   [1050087]	二代公文系統相關修改；無此功能鍵，移除--End--
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
	
	if (jf_Trim(document.all["txMailName"].value)== "")
	{
		strErrMsg += "信箱名稱不可空白\n";
        //1051118	Kenny   [1050087]	二代公文系統相關修改
		//document.all["txMailName"].focus();
        $('#txMailName').focus(); 
	}
	var isSelected=false;
	var table = document.getElementById("rblCount");
	for(i=0;i<table.rows.length;i++)
     if(table.rows[i].cells[0].childNodes[0].checked == true)
      isSelected = true;
      
    if(isSelected==false)
	{
		strErrMsg += "需選取時效計算方式\n";
		table.rows[0].cells[0].childNodes[0].focus();
	}
	
	isSelected=false;
	table = document.getElementById("rblDay");
	for(i=0;i<table.rows.length;i++)
     if(table.rows[i].cells[0].childNodes[0].checked == true)
      isSelected = true;
      
    if(isSelected==false)
	{
		strErrMsg += "需選取預定結案日計算方式\n";
		table.rows[0].cells[0].childNodes[0].focus();
	}
	
	strErrMsg=strErrMsg.substring(0,strErrMsg.length-1);
	
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
			//document.all["txCodeNo"].value = jf_Trim(argResult.value.RtnStr);
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
	
	if(argCallerId == "EDC041")
	{
		document.all["txCodeNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txCodeNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
        //1051118	Kenny   [1050087]	二代公文系統相關修改
		//document.all["txCodeNo"].focus();
        $('#txCodeNo').focus(); 
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
