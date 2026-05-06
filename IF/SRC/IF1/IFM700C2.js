/*
Date		SA		PRG		MGR_NO		DESC	
1001123 			Ivory	1000539		新增公告附件檔案設定程式
1031112		Leslie	Kevin_C	1020726		於__doPostBack前加上IsServerHandling=true,避免重複執行
1031113		Kevin	Kenny	1030868		增加以WebFileIO上傳附件功能
1040617		Leslie	Gabby	1040324		增加WebFileIO錯誤訊息處理
1050718		Kevin	Kevin_C	1050087		升二代
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
 1120313	Joe		Joe		序78		修正上傳成功前就Postback的問題，避免檔案過大導致上傳尚未完成Server就先要檔案
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

//1050718	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1110630	Joe		--		修正DG寬度顯示
	$(window).trigger('resize');
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
		case "btAddFile":
			if( jf_Trim(document.all.txFilePath.value) == "")
			{
				//event.cancelBubble = true;
				Page_BlockSubmit=true;
				alert("請選擇檔案");
				return;
			}
			if( jf_Trim(document.all.txDesc.value) == "")
			{
				//event.cancelBubble = true;
				Page_BlockSubmit=true;
				alert("請輸入說明");
				return;
			}
			//1050718	Kevin_C	1050087	升二代，調順序
			IsServerHandling = true;
			jf_ShowWaitState();
			//1031113	Kenny	[1030868]	增加以WebFileIO上傳附件功能
			fnOnUpload();
			
			//1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			//1050718	Kevin_C	1050087	升二代，調順序
			//IsServerHandling = true;
			//1120313	Joe		序78	修正上傳成功前就Postback的問題，避免檔案過大導致上傳尚未完成Server就先要檔案
			//__doPostBack("btAddFile", "");
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050718	Kevin_C	1050087	升二代
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
	
	//1050718	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			jf_ToolBarSubmit();
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			jf_ToolBarSubmit();
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			jf_ToolBarSubmit();
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

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050718	Kevin_C	1050087	升二代
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function fnDelFile(lbNameID, Ind)
{
	//儲存DelFilename以供Server端作刪除之用
	//1050718	Kevin_C	1050087	升二代
	//document.all.hDelFilename.value = document.all[lbNameID].innerText;
	document.all.hDelFilename.value = document.all[lbNameID].textContent;
	//消除DataGrid上的該筆資料
	//1050718	Kevin_C	1050087	升二代，此為沒必要程序，且會讓FireFox找不到按鈕，而使PostBack失效
	//document.all.dg1.deleteRow(Ind+1);
	//1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
	IsServerHandling = true;
	__doPostBack("", "");
}

function fnHandleTextarea()
{
	if(event.keyCode==13)
		event.cancelBubble = true;
}

//1031113	Kenny	[1030868]	增加以WebFileIO上傳附件功能
function fnOnUpload()
{
	//1050718	Kevin_C	1050087	升二代 -s
	//var strFullFileName = document.all.txFilePath.value;
	//var strFileName = jf_Trim(strFullFileName.substr(strFullFileName.lastIndexOf('\\')+1));
	//1050718	Kevin_C	1050087	升二代 -E
	var strFileIOWS = document.all["H_FileIOWS"].value;
	var strStorePath= document.all["H_StorePath"].value;
	//1050718	Kevin_C	1050087	升二代 -s
	//strFullFileName = strFullFileName.substr(0,strFullFileName.lastIndexOf('\\')+1);
	//strFullFileName = strFullFileName.replace(/\\/g,"\\\\");
	var strUploadFile = [$('#txFilePath')[0].files[0]];
	//1050718	Kevin_C	1050087	升二代 -E
	
	//1050718	Kevin_C	1050087	升二代
	//var soap = new ActiveXObject("WSWrapper.WebFileIO");	
	if ( document.all.II_USE_SSL != null )
	{
		if ( document.all.II_USE_SSL.value == "Y" )
			strFileIOWS = strFileIOWS.replace("http://", "https://") ;
	}
	//1050718	Kevin_C	1050087	升二代 -S
	////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
	//try
	//{	
		//soap.Init(strFileIOWS);
		//soap.AddFile(strStorePath, strFileName, strFullFileName);  // AddFile(上傳後存檔路徑, 上傳的檔案的檔名, 上傳檔案的所在路徑)
		//// 取得權杖，並於呼叫WebFileIO元件時傳入以便WebFileIO進行使用者身份判斷
		//var strArtifact = document.all.SsoArtifact.value;
		//soap.Upload(strArtifact, true);
		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
		//if( soap.hasError )
		//{
		//	alert("上傳發生錯誤，錯誤訊息："+soap.ErrorMessage);
		//	return;
		//}
	//}
	//catch(e)
	//{
	//	var strErrMsg = e.message;		
	//	if (soap.hasError)
	//		strErrMsg += soap.ErrorMessage;
	//	alert("連接伺服器"+strFileIOWS+"上傳檔案至AP伺服器失敗，錯誤訊息為:"+strErrMsg);	
	//	return;
	//}
	//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
	var strArtifact = document.all.SsoArtifact.value;
	var ioWS = new WebFileIO(strFileIOWS, strArtifact);
	ioWS.upload(strStorePath, strUploadFile, UploadCallBack);
	//1050718	Kevin_C	1050087	升二代 -E
}
function UploadCallBack(result) {
    if (result.hasError) {
        alert(result.ErrorMessage)
    }
	//1120313	Joe		序78	修正上傳成功前就Postback的問題，避免檔案過大導致上傳尚未完成Server就先要檔案
	else{
		__doPostBack("btAddFile", "");
	}
}
