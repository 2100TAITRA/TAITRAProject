/*
DATE	SA		PRG		MGR_NO		DESC
1060317	David	David	1040839		(Merge)新增程式
1060327	David	Joe		1050087		二代系統升級
1110103	Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
1111027 Kevin	Zen		1110832		支援總收登記桌可於分辦流程上傳公文頁面轉線上簽核
1120719 Kevin   Zen     1120068     支援剛轉線上之線上公文可再次開啟並重新上傳來文頁面
1141223 Leslie  Daniel  1141162     修改增加檔案上傳時檢核檔案類型與大小
1150122	Leslie  Daniel  問題序29    取消檢核上傳檔案大小
1150205 Zen     Daniel  線上序57    Merge單號1140243
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

//1060327	Joe		1050087		二代公文修改--S
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1060327	Joe		1050087		二代公文修改--E

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	if(document.all.TranSuccess)
		alert("公文" + document.all.TranSuccess.value + "轉線上簽核完成");
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060327	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060327	joe		1050087		二代修改配合行動平台
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
	
	switch (xObjectName)
	{
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060327 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060327 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060327 Joe 1050087 二代公文修改
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
			//1060327 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060327 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1060327	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txKeyFld"].focus();
			$('#txKeyFld').focus();	
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;

	//1111027 Zen 1110832 支援總收登記桌可於分辦流程上傳公文頁面轉線上簽核，檢核未經掃描之公文轉紙本前須上傳頁面檔
	//for (var nFile = 0; nFile < $('#txFilePath')[0].files.length; nFile++)
	//{
	//	arrLegalFile.push($('#txFilePath')[0].files[nFile]);
	//}

	if ($('#H_txNeedUpload').val() == 'Y' && $('#txFilePath')[0].files.length == 0)
	{
		alert('因此公文尚未執行掃描，請上傳紙本公文影像後再轉線上簽核。');
		return false;
	}

	//1120719 Zen 1120068 支援剛轉線上之線上公文可再次開啟並重新上傳來文頁面
	//1150205 Daniel  線上序57    Merge單號1140243
	//let strConfirmMsg = '請問是否進行轉線上處理';
	let strConfirmMsg = '轉線上後既有簽核意見、文稿附件都將被清除，請問是否確定執行轉線上處理';
	if (document.all['H_txIsReuploadE'].value == 'Y')
		strConfirmMsg = '原有公文相關資料都會刪除無法復原，請確認是否要重新轉線上簽核？';
	//1141222     Daniel   1141162         修改增加檔案上傳時檢核檔案類型與大小
	//取得副檔名檢核-
	var fileInput = document.querySelector('input[type="file"][id$="txFilePath"]');
	//1150122  Daniel  問題序29    取消檢核上傳檔案大小
	//var intLimitFileSize = document.all["H_txFILE_SIZE_LIMIT"].value * 1024 * 1024;
	var intFileIze = 0;
	for (var i = 0; i < fileInput.files.length; i++){
		var currentFile = fileInput.files[i];
		intFileIze += currentFile.size;
		var strFileName = currentFile.name;
		if (document.all["WE_ATTACH_CHECK"].value != "") {
			var strWhiteList = document.all["WE_ATTACH_CHECK"].value.split(";");
			var bIsInWhiteList = false;
			var strFileExt = strFileName.split(".")[1].toUpperCase();
			var arrTempFileExt = strFileName.split(".");
			var strFileExt = arrTempFileExt[arrTempFileExt.length - 1].toUpperCase();
			for (var nList = 0; nList < strWhiteList.length; nList++)
				if (strFileExt == strWhiteList[nList].toUpperCase()) {
					bIsInWhiteList = true;
					break;
				}
			//若副檔名不在白名單中
			if (!bIsInWhiteList) {
				alert("非准許夾帶上傳的檔案類型。");
				bRtnbool = false;
				return bRtnbool;
			}
		}
	}
	//1150122  Daniel  問題序29    取消檢核上傳檔案大小
	//if (intFileIze > intLimitFileSize) {
	//	alert("附件總大小已超過檔案大小上限[" + document.all["H_txFILE_SIZE_LIMIT"].value + "MB]\n故無法選擇此檔。");
	//	return false;
    //}
	//1120719 Zen 1120068 支援剛轉線上之線上公文可再次開啟並重新上傳來文頁面
	//if (window.confirm("請問是否進行轉線上處理"))//提醒是否覆蓋存檔
	if (window.confirm(strConfirmMsg))
		bRtnbool = true;
	else
		bRtnbool = false;
	return bRtnbool;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
