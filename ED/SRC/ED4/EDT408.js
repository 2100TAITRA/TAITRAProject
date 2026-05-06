/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期	   SA	  修改人 	單號    概要
 * 1001205		   Jeff	1000937	  增加件數欄位，並限制申請事由為50字以內
 * 1080503 Cloud  Kevin_C	1071087	升二代
 * 1090806	Cloud	Cloud	序236		修正點擊核可多次會收到重複通知之問題
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

//1080503	Kevin_C	1071087	升二代
//if(document.all.tbTool)
	//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1080503	Kevin_C	1071087	升二代
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1080503	Kevin_C	1071087	升二代
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1080503	Kevin_C	1071087	升二代
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
//1080503	Kevin_C	1071087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	{
		// 1090806	Cloud	序236		修正點擊核可多次會收到重複通知之問題
		Page_BlockSubmit = true;
	   return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1080503	Kevin_C	1071087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1080503	Kevin_C	1071087	升二代
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
			//1080503	Kevin_C	1071087	升二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1080503	Kevin_C	1071087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1080503	Kevin_C	1071087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1080503	Kevin_C	1071087	升二代
			//document.all["txKeyFld"].focus();
			$('#txKeyFld').focus();
			break;
		case "btTransfer":
			//1080503	Kevin_C	1071087	升二代
			// var ddlIdx=2;
			// var nextOpt = GetToolbarCtrl(ddlIdx);
			// var aOptions = nextOpt.getOptions();
			// document.all.SelectedUser.value = aOptions.value;
			// document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;
			document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
		   	document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
			Page_BlockSubmit = !jf_CheckBeforSave();
			//1080503	Kevin_C	1071087	升二代
			//jf_ToolBarSubmit();
			// 1090806	Cloud	序236		修正點擊核可多次會收到重複通知之問題
			if(Page_BlockSubmit == false)
				IsServerHandling = true;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCheck":
			//1080503	Kevin_C	1071087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1080503	Kevin_C	1071087	升二代
			//document.all["txApplyNo"].focus();
			$('#txApplyNo').focus();
			break;
		case "btSearch":
			//1080503	Kevin_C	1071087	升二代
			Page_BlockSubmit = true;
			if(jf_CheckKeyObject())
			{
				var strArtifact = document.all.SsoArtifact.value;
				var strApplyNo = document.all["txStampNo"].value;
				var strHttp =document.all.nHttp.value;
				var strSourceOrgno = document.all.nSourceOrgno.value;
				var	strUrl = strHttp +"EDI200.aspx?SOURCE_ORGNO="+strSourceOrgno+"&argMsgFrom=EDT408&argMsgFromId="+strApplyNo+"&SAMLart=" + strArtifact;
				jf_OpenChildWin(strUrl, "EDI200", 700, 500 );
			}
			break;
		case "btPrint":
			if(jf_ConfirmSave() && jf_ConfirmPrint()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1080503	Kevin_C	1071087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(jf_ConfirmSave() && jf_ConfirmPreview()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1080503	Kevin_C	1071087	升二代
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
	if (jf_Trim(document.all["txCopies"].value) == "")
	{
		strErrMsg += "申請份數不可空白\n";
		//1080503	Kevin_C	1071087	升二代
		//document.all["txCopies"].focus();
		$('#txCopies').focus();
	}
	if (jf_Trim(document.all["txReasons"].value) == "")
	{
		strErrMsg += "申請原因不可為空白\n";
		//1080503	Kevin_C	1071087	升二代
		//document.all["txReasons"].focus();
		$('#txReasons').focus();
	}
	//1001205	Jeff	1000937		增加件數欄位
	if (jf_Trim(document.all["txPieces"].value) == "")
	{
		strErrMsg += "申請件數不可為空白\n";
		//1080503	Kevin_C	1071087	升二代
		//document.all["txPieces"].focus();
		$('#txPieces').focus();
	}
	if(jf_Trim(document.all["txReasons"].value).length>50)
	{
		strErrMsg += "申請事由不可超過50字\n";
		//1080503	Kevin_C	1071087	升二代
		//document.all["txReasons"].focus();
		$('#txReasons').focus();
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

/*取得tbTool的物件*/
function GetToolbarCtrl(argId)
{
	return document.all.tbTool.getItem(argId);
	for(var i=0;i<20;i++)
	{
		var o=document.all.tbTool.getItem(i);
		if(o!=null)
		{
			alert(o.getAttribute("ID"));
			if(o.getAttribute("ID")==argId)
				return o;
		}
	}
	return null;
}
