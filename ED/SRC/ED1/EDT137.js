/*
DATE	SA		PRG		MGR_NO		DESC
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
1051028	David	Kevin_C	1050087		升二代
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

//紀錄上傳附件的路徑
//1051028	Kevin_C	1050087	升二代 -S
// var fso = document.all["txAttach"].value;
// fso = new ActiveXObject("Scripting.FileSystemObject");

// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1051028	Kevin_C	1050087	升二代 -E


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS(document.all["txWS"].value, "WebFileIO", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051028	Kevin_C	1050087	升二代
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051028	Kevin_C	1050087	升二代
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	var pNo = xObjectName.substring(8,xObjectName.indexOf("_btDgdel"));
	var btDgdel;
	if (document.all["dg1__ctl"+pNo+"_btDgdel"] != null)
		btDgdel = document.all["dg1__ctl"+pNo+"_btDgdel"].id;
		
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
		//1051028	Kevin_C	1050087	升二代
		// case "btFolder":
			// try
			// {
				// document.all["BF"].Title = "請指定欲上傳的檔案";				
				// if(document.all["BF"].ShowDialog(0) !="")
					// document.all.txAttach.value = document.all["BF"].Path;
				// Page_BlockSubmit = true;
			// }
			// catch(e)
			// {}
			// break;
		case "btUpLoad":
			try
			{
				Page_BlockSubmit = !jf_CheckBeforUpload();
			}
			catch(e)
			{}
			//1051028	Kevin_C	1050087	升二代
			__doPostBack("btUpLoad", "");
			break;
		case btDgdel:
			//1051028	Kevin_C	1050087	升二代
			//document.all["txDelSeq"].value = document.all["dg1__ctl"+pNo+"_lbSEQ"].innerText;
			document.all["txDelSeq"].value = document.all["dg1__ctl"+pNo+"_lbSEQ"].textContent;
		/*
			var Seqno = document.all["dg1__ctl"+pNo+"_lbSEQ_NO"].innerText;
			var DelName = document.all["dg1__ctl"+pNo+"_lbAttName"].innerText;
			alert("刪除畫面第"+Seqno+"個附件，檔名"+DelName);			
			alert("刪除DB第"+document.all["txDelSeq"].value+"個附件");
		*/
			Page_BlockSubmit= false;
			//1051028	Kevin_C	1050087	升二代
			__doPostBack("btDgdel", "");
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051028	Kevin_C	1050087	升二代
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
	
	//1051028	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1051028	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel"://0970418 因QA提出行為模式怪怪的，和SA及RITA確認後改稱為"確認"
			Page_BlockSubmit = !jf_Test();
			//1051028	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1051028	Kevin_C	1050087	升二代
			//document.all["txDocNo"].focus();
			$('#txDocNo').focus();
			break;
	}
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//上傳附件
function jf_CheckBeforUpload()
{
	var bRtnbool = true;
	var strErrMsg= "";
	//1051028	Kevin_C	1050087	升二代 -S
	//var strFileName = document.all["txAttach"].value;
	// var strLocalFP = strFileName.substring(0, strFileName.lastIndexOf("\\"));//檔名前的路徑
	// strFileName =  strFileName.substr(strFileName.lastIndexOf("\\") + 1);//檔名

	//document.all["txFilePath"].value = strLocalFP;
	var strFileName = $('#txAttach')[0].files[0].name;
	//1051028	Kevin_C	1050087	升二代 -E
	document.all["txFileName"].value = strFileName;
	
	if (document.all["txAttach"].value == "")
		strErrMsg = "未設定上傳附件路徑";
	
	//檢查檔案是否存在
	//1051028	Kevin_C	1050087	升二代
	//if (strErrMsg == "" && !fso.FileExists(document.all["txAttach"].value))
	//	strErrMsg = "指定上傳附件不存在";
	
	//檢查上傳附件檔名是否dg檔名重複
	if (strErrMsg == "")
	{
		if (document.all.dg1)
		{
			//沒有dg1_ctl0_lbAttName、dg1_ctl1_lbAttName，所以i從2開始
			for(var i = 2; i <= document.all.dg1.rows.length; i++)
			{
				//1051028	Kevin_C	1050087	升二代
				//if (document.all["dg1__ctl" + i + "_lbAttName"].innerText.toUpperCase() == strFileName.toUpperCase())
				if (document.all["dg1__ctl" + i + "_lbAttName"].textContent.toUpperCase() == strFileName.toUpperCase())
					strErrMsg = "指定上傳檔案之檔名與目前上傳之附件電子檔檔名重複，請將檔案改名後重新選取上傳";
			}
		}
	}
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	else
	{
		//將檔案上傳到伺服器
		var strArtifact = jf_GetArtifact();
		//1051028	Kevin_C	1050087	升二代
		//var soap = new ActiveXObject("WSWrapper.WebFileIO")		
		var strWebService = document.all["txWS"].value;

		//目錄路徑原則：FILESRV_HEADER.START_PATH\STORAGE_MAIN.STORAGE_PATH\公文文號
		var strServerFP = document.all["txPath"].value +"\\"+ document.all["txDocNo"].value;

		//1051028	Kevin_C	1050087	升二代 -S
		// try
		// {
			////1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
			////soap.Init(document.all["txWS"].value);
			// if ( document.all.II_USE_SSL != null )
			// {
				// if ( document.all.II_USE_SSL.value == "Y" )
					// strWebService = strWebService.replace("http://", "https://") ;
			// }
			// soap.Init(strWebService);
			
			// soap.AddFile(strServerFP,strFileName,strLocalFP);
			// soap.Upload(strArtifact, true);
			
		// }
		// catch(e)
		// {
			// bRtnbool = false;
			////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
			////var ErrorMessage = "";
			// var ErrorMessage = e.message;
			// if (soap.hasError)
				// ErrorMessage += soap.ErrorMessage;
			////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
			////jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["上傳附件檔案至AP伺服器失敗，錯誤訊息為：" + ErrorMessage + ""]) ), "" )
			// jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["連接伺服器"+strWebService+"上傳附件檔案至AP伺服器失敗，錯誤訊息為：" + ErrorMessage + ""]) ), "" )

		// }
		if ( document.all.II_USE_SSL != null )
			{
				if ( document.all.II_USE_SSL.value == "Y" )
					strWebService = strWebService.replace("http://", "https://") ;
			}
		var ioWS = new WebFileIO(strWebService, strArtifact);
		var strUploadFile = [$('#txAttach')[0].files[0]];
		ioWS.upload(strServerFP, strUploadFile, UploadCallBack);
		//1051028	Kevin_C	1050087	升二代 -E
	}
	return bRtnbool;
}
//1051028	Kevin_C	1050087	升二代
function UploadCallBack(result) {
    if (result.hasError) {
        alert(result.ErrorMessage)
    }
}
function jf_Test()
{
	var Rtnbool = false;
	if(jf_IsModified())
	{
		Rtnbool = window.confirm("您已修改過內容,確定無其他來文電子附件檔需上傳嗎?");
		if (Rtnbool)		
			jf_ReloadValue();
	}
	else
		Rtnbool = window.confirm("確定無其他來文附件電子檔需上傳嗎?");
	return Rtnbool;	
}