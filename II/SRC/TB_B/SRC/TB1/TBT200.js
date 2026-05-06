/*
 * DATE     PRG	    MGR_NO	    DESC
 * 1050928   Justin   1050087     二代公文修改
1051019	Leslie	Joe			1050087		二代修改配合行動平台 * 1091207  Zen     1090891     修正弱掃網頁接露本地端資訊
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
//1050928 Justin 1050087 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    /*1050928 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次*/
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
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
//1050928 Justin 1050087 二代公文修改 
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
    //1050928 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btConvert":
			Page_BlockSubmit = ! DlBulletinAtt();
		    //1050928 Justin 1050087 二代公文修改 
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
		    //1050928 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050928 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050928 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1050928 Justin 1050087 二代公文修改
			//document.all["txbulid"].focus();
			$('#txbulid').focus();
			break;
		case "btSearch":
			var strUrl = "";
			var strBulletinId = jf_Trim(document.all.txbulid.value);
			strUrl = "TBC200.aspx?rtnObj=lbReturnValue&nSearch="+strBulletinId;
			jf_OpenChildWin(strUrl, "TBT200", 700, 500 );
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1050928 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1050928 Justin 1050087 二代公文修改 
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
	
	if (document.all["txbulid"].value == "")
	{
		strErrMsg += "鍵值欄位不可空白\n";
	    //1050928 Justin 1050087 二代公文修改
	    //document.all["txbulid"].focus();
		$('#txbulid').focus();
	}
	
	if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
	    //1050928 Justin 1050087 二代公文修改
	    //document.all["txRequireFld"].focus();
		$('#txRequireFld').focus();
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
			//document.all["txbulid"].value = jf_Trim(argResult.value.RtnStr);
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
	if(argCallerId == "TBC200")
	{
		document.all.txbulid.value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all.txbulid.value != "")
		{
			Page_BlockSubmit = false;
			jf_OpenButtonSubmit();
		}
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

function CreateAllFolder(argPath)
{
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if(argPath.lastIndexOf("\\") != argPath.length - 1)
		argPath += "\\";
	var idx = argPath.indexOf("\\");
	idx = argPath.indexOf("\\", idx + 1);
	while(idx != -1)
	{
		var subPath = argPath.substring(0, idx);
		if(fso.FolderExists(subPath) == false)
			fso.CreateFolder(subPath);
		idx = argPath.indexOf("\\", idx + 1);
	}
}

//下載公告di及附件
function DlBulletinAtt()
{
	var HSDI = true;
	var rtn = true;
	var iMainDiIdx	= document.all["txbulid"].value;
	//var objDoc	= RtnBulletin.Documents;
	var serviceURL	= document.all["h_webservice"].value;
	var serverDI	= document.all["h_startpath"].value+"\\TB\\"+iMainDiIdx;
	//var serverAtt	= document.all["h_startpath"].value;
    //1091207 Zen  1090891 修正弱掃網頁接露本地端資訊	//var localPathForDI = document.all["workpath"].value;
	var strErrMsg = "";
	
	if (document.all["txbulid"].value == "")
	{
		strErrMsg += "公告編號不可空白\n";
	    //1050928 Justin 1050087 二代公文修改
	    //document.all["txbulid"].focus();
		$('#txbulid').focus();
	}
	
	if (document.all["dlDept"].value == "")
	{
		strErrMsg += "請選擇收文單位\n";
	    //1050928 Justin 1050087 二代公文修改
	    //document.all["dlDept"].focus();
		$('#dlDept').focus();
	}

	/*
	var temp = TBT200.GetDIInfo(document.all["h_sourceorgno"].value, document.all["txbulid"].value);
	document.all["h_DIFILENAME"].value = temp.value ;
	if(temp.value == "" || temp.value == null)
		HSDI = false;	
	try
	{	
		if(HSDI)
		{

			//建立工作暫存區
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			CreateAllFolder(localPathForDI);	//for DI檔	

			//下載檔案至Client端

				//下載DI檔
				var soap = new ActiveXObject("WSWrapper.WebFileIO");
				soap.Init(serviceURL);
				if (document.all["h_DIFILENAME"].value != "")
					soap.AddFile(serverDI, document.all["h_DIFILENAME"].value);

				soap.Download("", false, localPathForDI);
				if (soap.hasError)
				{
					strErrMsg += "DI檔案下載失敗，錯誤訊息為：' + soap.ErrorMessage + '請稍後再試！\n";
				}
				soap = null;
		}
	}
	catch(e)
	{
		var ErrorMessage = e.message;
		strErrMsg += " 檔案下載失敗，錯誤訊息為："+ErrorMessage+"請稍後再試！";
	}
	finally
	{
		if(strErrMsg != "")
		{alert(strErrMsg); rtn = false;}
		return rtn;
	}*/
	if(strErrMsg != "")
	{alert(strErrMsg); rtn = false;}
	return rtn;
}