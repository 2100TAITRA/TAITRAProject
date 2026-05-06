/*
DATE	SA	    PRG	    MGR_NO	DESC
1030423	Kevin	Kevin	1010629	新增程式
1031028	Leslie	Kenny	1030836	配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324	增加WebFileIO錯誤訊息處理
1051109 Kevin   Kevin   1050087 二代升級，並更改為申請並直接啟用
1080125	Kevin	Joe		1080049	弱掃修正XSS
1091103 Kevin 	Joe	 	1090762 補上啟用臨時憑證功能
1110103	Kevin   Zen     1101292	修正多次點擊重複PostBack之問題
1130222	Joe		Joe		1120882	UI調整
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

//1051109
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
	
    //1051109
	//if(document.all["H_txDownloadPfx"] && document.all["H_txDownloadPfx"].value == "Y")
	//{
	//	fnDownloadPfx();
	//}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051109
//function ClientButtonControl()
//{
//	var xObjectName = document.activeElement.id;
//	
//	if(IsServerHandling)
//	   return;
//	
//	//檢查是否TimeOut
//	if(jf_IsTimeOut())
//	{
//		Page_BlockSubmit=true;
//		return;
//	}
//	
//	switch (xObjectName)
//	{
//		/*
//		case "":
//			break;
//		*/
//	}
//}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051109
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1051109
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btApply":
			if(jf_ConfirmApply()) //是否通過儲存前必要檢查
			{
				//1080125	Joe		1080049		弱掃修正XSS
				document.all["txApplyReason"].value = document.all["txApplyReason"].value.substring(0,50);
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
			    Page_BlockSubmit = true;
            //1051109
		    //jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);
			break;
		//1091103 	Joe	 	1090762 補上啟用臨時憑證功能
		case "btGet":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
		    Page_BlockSubmit = !jf_ConfirmDelete2();
            //1051109
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			document.all["txApplyReason"].value = "";
			document.all["txPincode"].value = "";
			document.all["txPincode"].focus();
			break;
		//1130222	Joe		1120882		啟用取消功能
		case "btChangePin":
			Page_BlockSubmit = !CheckBeforeCheckPin();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/

//儲存前之欄位檢查
function jf_ConfirmApply()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txPincode"].value == "")
	{
		strErrMsg += "憑證密碼不可空白\n";
		document.all["txPincode"].focus();
	}
	
	if (document.all["txApplyReason"].value == "")
	{
		strErrMsg += "申請原因不可空白\n";
		document.all["txApplyReason"].focus();
	}
	
	if (document.all["txApplyReason"].value.length > 50)
	{
		strErrMsg += "申請原因不可超過50字\n";
		document.all["txApplyReason"].focus();
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

function jf_ConfirmDelete2()
{
	return window.confirm("刪除憑證僅作為忘記憑證密碼時，重新申請用。\n若要暫時停用憑證請至 IFT940 臨時憑證公文補簽停用作業。\n確認刪除？");
}

//1051109
//function jf_ConfirmGet()
//{
//	return true;
//}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1051109
//function fnDownloadPfx()
//{
//	var ErrMassage = "";
//	try
//	{
//		var soap = new ActiveXObject("WSWrapper.WebFileIO");
//
//		//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//		//soap.Init(document.all["H_txApFileWs"].value);
//		var ApURL = document.all["H_txApFileWs"].value ;
//		if ( document.all.II_USE_SSL != null )
//		{
//			if ( document.all.II_USE_SSL.value == "Y" )
//				ApURL = ApURL.replace("http://", "https://") ;
//		}
//		soap.Init(ApURL);
//		
//		soap.AddFile(document.all["H_txApFilePath"].value, document.all["H_txFileName"].value);
//		soap.Download(document.all["H_txArtifact"].value, false, document.all["H_txClientFilePath"].value);
//		
//		if(soap.hasError)
//			ErrMassage += soap.ErrorMessage;
//	}
//	catch(e)
//	{
//		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
//		//ErrMassage += e.message;
//		var strErrMsg = e.message;		
//		if (soap.hasError)
//			strErrMsg += soap.ErrorMessage;
//		ErrMassage += "連接伺服器"+ApURL+"下載檔案發生錯誤，錯誤訊息為:"+strErrMsg;
//		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
//	}
//	
//	if(ErrMassage!="")
//		alert(ErrMassage);
//	else
//		fnInstallPfx();
//}

//1051109
//function fnInstallPfx()
//{
//	try
//	{
//		var myFile = new ActiveXObject('Scripting.FileSystemObject');
//		
//		if(myFile.FileExists(document.all["H_txClientFilePath"].value + document.all["H_txFileName"].value))
//		{
//			var sPW = window.prompt("請輸入數位憑證密碼。", "");
//			
//			if(sPW==null)
//				return;
//		
//			var MyStore = new ActiveXObject('EnvelopedCOM.EnvelopedCOMCtrl');
//	           
//			var rtnString = MyStore.ImportCertificateFromPFX(document.all["H_txClientFilePath"].value + document.all["H_txFileName"].value, sPW, 0);
//					
//			if(rtnString.indexOf(document.all["lbEmpName"].innerText)<0)
//			{
//				alert('數位憑證檔安裝失敗，請自' + document.all["H_txClientFilePath"].value + document.all["H_txFileName"].value + '手動安裝憑證，並請重登系統。');
//			}
//			else
//			{
//				alert('數位憑證安裝成功，發行對象：' + rtnString.split(";")[1] + '，請重登系統。');
//			}
//			//var f = myFile.GetFile(document.all["H_txClientFilePath"].value + document.all["H_txFileName"].value);
//			//f.Delete();
//		}
//		else
//		{
//			alert("數位憑證檔不存在，請重新下載安裝。");
//		}
//	}
//	catch(e)
//	{
//		var ErrorMessage = e.message;
//		alert(ErrorMessage);
//	}
//}

//1130222	Joe		1120882		新增管理員可維護多人憑證--S
function CheckBeforeCheckPin()
{
	if ($('#txNewPin').val() == "" || $('#txOldPin').val() == "")
	{
		alert('新軟體憑證密碼及舊軟體憑證密碼不可為空')
		return false;
	}
	else
		return true;
}
function CheckUsername()
{
	if ($('#txUserName').val() == "")
	{
		$('#H_txEmpName').val('');
		$('#lbEmpName').text('');
		return;
	}

	var DefCardInfo = IF1.IFT930.CheckCert(jf_GetArtifact() ,document.all.OrgNo.value, document.all.txUserName.value).value;
	if (!DefCardInfo.bSuccess) {
		//表管理員開啟自己的憑證維護
		if (document.all.txUserName.value == document.all.OwnId.value)
			jf_ToolBarSubmit('btOpen');
		else {
			alert(DefCardInfo.ErrMsg);
			$('#txUserName').val('');
			$('#txUserName').focus();
		}
	}
	else{
		$('#txPincode').val(DefCardInfo.PinCode);
		$('#txApplyReason').val(DefCardInfo.Reason);
		$('#lbEmpName').text(DefCardInfo.Name);
		$('#H_txEmpName').val(DefCardInfo.Name);
	}
}
//1130222	Joe		1120882		新增管理員可維護多人憑證--E
