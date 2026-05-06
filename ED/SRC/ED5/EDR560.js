/*
DATE	SA		PRG		MGR_NO		DESC
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
1050715 David   Joe		1050087		二代系統修改 
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

//指定DataGrid欄位
var strTableFields = new Array("_lbOrgId","_lbOrgName","_lbPostName","_lbDocNo","_lbPostCode","_lbAddress");

//1050715 Joe 1050087 二代公文修改--S
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
// if(document.all.dg1)
	// document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

//1050715 Joe 1050087 二代公文修改--E
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	DownLoadPrintFile();
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
//1050715 Joe 1050087 二代公文修改，參數多加event
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
	
	//1050715 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050715 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		case "btPrint":
			if(!jf_CheckBlankAndAlert())
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
			//1050715 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
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
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function dlTime_onchange()
{
	var index = document.all["dlTime"].selectedIndex;
	var obj = document.all["dlTime"].options[index];

	if (obj.value == "") 
	{
		document.all["txSTime"].value = "";
		document.all["txETime"].value = "";
	}
	else
	{
		var argValue = obj.value.split(":");
		document.all["txSTime"].value = argValue[0];
		document.all["txETime"].value = argValue[1];
	}
}

//檢查DataGrid資料列是否至少有一筆資料
function jf_CheckBlankAndAlert()
{
	var InValid = false;
	var strErrMsg= "";
	var Cnt = 0;
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if (document.all["dg1__ctl"+i+"_cbSelect"].checked)				
		{
			Cnt ++;
		}
	}
	if(Cnt == 0)
	{
		strErrMsg = "至少勾選一筆明細資料\n";
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		InValid = true;
	}
	return InValid;
}

function DownLoadPrintFile()
{
	if(document.all["FILE_NAME"])
	{
		var strFileName = document.all["FILE_NAME"].value;
		var strBatFileName = document.all["BATCH_FILE_NAME"].value;
		var strPath = document.all["FILE_PATH"].value;
		var strPathServer = document.all["FILE_PATH_SERVER"].value;
		
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var soap = new ActiveXObject("WSWrapper.WebFileIO");
		try
		{
			if(!fso.FolderExists(strPath)) //下載目的資料夾不存在時建立資料夾
				fso.CreateFolder(strPath);
				
			//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
			//soap.Init(document.all["AP_FILEIO_WS"].value);
			var FileIOWS = document.all["AP_FILEIO_WS"].value ;
			if ( document.all.II_USE_SSL != null )
			{
				if ( document.all.II_USE_SSL.value == "Y" )
					FileIOWS = FileIOWS.replace("http://", "https://") ;
			}
			soap.Init(FileIOWS);
			
			soap.AddFile(strPathServer, strFileName);
			soap.Download(document.all["SsoArtifact"].value, true, strPath);
		}
		catch(e)
		{
			//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
			//alert("下載檔案" + strFileName + "失敗，錯誤訊息：" + e.message);
			alert("連接伺服器"+FileIOWS+"下載檔案" + strFileName + "失敗，錯誤訊息：" + e.message+soap.ErrorMessage);
		}
		try
		{
			soap.AddFile(strPathServer, strBatFileName);
			soap.Download(document.all["SsoArtifact"].value, true, strPath);
		}
		catch(e)
		{
			//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
			//alert("下載檔案" + strBatFileName + "失敗，錯誤訊息：" + e.message);
			alert("連接伺服器"+FileIOWS+"下載檔案" + strBatFileName + "失敗，錯誤訊息：" + e.message+soap.ErrorMessage);
		}
		
		var objShell = new ActiveXObject("Shell.Application");
                objShell.ShellExecute(strPath + strBatFileName, "", "", "open", 0);
	}
}