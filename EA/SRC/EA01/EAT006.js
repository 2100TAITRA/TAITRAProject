/*
日期	SA		PG		單號		DESC
0980918	--		Leslie	0980455		修正呼叫WebFileIO之參數，傳入正確之Artifact
1000728	Zola	Jeff	1000571		新增下載紀錄無法順利匯入分類號的Log檔
1030718	--		Cloud	1030397		增加檢核路徑是否為C:\\temp
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1040609	Cloud	Gabby	1040380		增加匯出版本選項
1040617	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
1060503 Cloud   Zen     1050087     二代升級1091207 Kevin   Zen     1090891     修正弱掃網頁接露本地端資訊1110103 Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
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

//1060503 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060503 Zen 1050087 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

    //1060503 Zen 1050087 二代升級    //if (jf_Trim(document.all.XmlFilePath.value) != "")
    //{
    //    DownloadFile(document.all.XmlFilePath.value);
    //}

    //1000728	Jeff	新增下載log
    //1060503 Zen 1050087 二代升級    //if (jf_Trim(document.all.txLog.value) != "")
    //{
    //    DownloadLog(document.all.txLog.value);
    //}

    Import_Click();
    Export_Click();


}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060503 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060503 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題    if (IsServerHandling)    {        Page_BlockSubmit = true;        return;    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        //1060503 Zen 1050087 二代升級        //case "btFileButton":
        //    Page_BlockSubmit = true;
        //    //Modify by Cola 依據匯入/匯出決定呼叫FileBrowser 還是 FolderBrowser
        //    //匯入, 應使用FileBrowser
        //    if (document.all["rbImport"].checked)
        //    {
        //        document.all["BF"].Title = "請選擇欲匯入之檔案路徑";
        //        if (document.all["BF"].ShowDialog(0) != 0)
        //        {
        //            document.all["txFilePath"].value = document.all["BF"].Path;
        //        }
        //    }
        //    else
        //    {
        //        document.all["BF2"].Title = "請選擇欲匯出之路徑";
        //        if (document.all["BF2"].ShowDialog(0) != 0)
        //        {
        //            document.all["txFilePath"].value = document.all["BF2"].Path;
        //        }

        //    }
        //    break;
            //[0970891]Add by Cola 版本別查詢
        case "ibVer":
            Page_BlockSubmit = true;
            var strUrl = "EAC004.aspx";
            jf_OpenChildWin(strUrl, "EAT009", 700, 500);
            break;

    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060503 Zen 1050087 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題    if (IsServerHandling)    {        Page_BlockSubmit = true;        return;    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1060503 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        //1060503 Zen 1050087 二代升級        //case "btOpen":
        //    Page_BlockSubmit = !jf_CheckKeyObject();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btSave":
        //    if (jf_ConfirmSave()) //是否通過儲存前必要檢查
        //    {
        //        IsServerHandling = true;
        //        jf_ShowWaitState();
        //        Page_BlockSubmit = false;
        //    }
        //    else
        //        Page_BlockSubmit = true;
        //    jf_ToolBarSubmit();
        //    break;
        //case "btDelete":
        //    Page_BlockSubmit = !jf_ConfirmDelete();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btCancel":
        //    Page_BlockSubmit = !jf_ConfirmCancel();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btClean":
        //    Page_BlockSubmit = true;
        //    jf_ConfirmClean(true);
        //    //document.all["txKeyFld"].focus();
        //    break;
        //case "btSearch":
        //    /*
		//	var strUrl = "";
		//	var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
		//	var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
		//	var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
		//	var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
		//	strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
		//	jf_OpenChildWin(strUrl, "SII020", 700, 500 );
		//	*/
        //    break;
        //case "btPrint":
        //    Page_BlockSubmit = !jf_ConfirmPrint();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btPreview":
        //    Page_BlockSubmit = !jf_ConfirmPreview();
        //    jf_ToolBarSubmit();
        case "btExecute":
            PageBlockSubmit = true;
            //[0970891]Modify by Cola 新增判斷版本別有無輸入
            var strErrMsg = "";

            if (jf_Trim(document.all.txVerNo.value) == "")
            {
                strErrMsg += "必須輸入版本別\n";
                //1060503 Zen 1050087 二代升級                //document.all.txVerNo.focus();
                $('#txVerNo').focus();
            }

            //1060503 Zen 1050087 二代升級，僅於匯入時檢核            //if (jf_Trim(document.all.txFilePath.value) == "")
            if ( document.all.rbImport.checked == true && jf_Trim(document.all.txFilePath.value) == "")
            {
                strErrMsg += "必須輸入檔案路徑\n";
                //1060503 Zen 1050087 二代升級                //document.all.txFilePath.focus();
                $('#txFilePath').focus();
            }
            //1030718	--		Cloud	1030397		增加檢核路徑是否為C:\\temp	

            //1060503 Zen 1050087 二代升級，取消此檢核
            //if (document.all.txFilePath.value.toUpperCase().indexOf("C:\\TEMP"))
            //{
            //    var strMode = "輸出";
            //    if (document.all.rbImport.checked)
            //        strMode = "輸入";

            //    if (!window.confirm(strMode + "路徑非C:\\TEMP，是否繼續？"))
            //    {
            //        return;
            //    }

            //}
            if (strErrMsg != "")
            {
                bRtnbool = false;
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
                return;
            }

            /*if (jf_Trim(document.all.txFilePath.value)=="")
			{	
				alert("必須輸入檔案路徑");
				return;
			}*/

            if (document.all.rbImport.checked)
            {
                UploadFile();
            }

            Page_BlockSumit = false; 
            //1060503 Zen 1050087 二代升級            //jf_ToolBarSubmit();
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
        if (jf_GetActionMode() == LayoutModeNew)
        {
            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
            {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
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
    var strErrMsg = "";


    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
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
        if (jf_IsWebServiceSuccess(argResult))
        {
            //document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
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
    //[0970891]Add by Cola, 對應版本查詢子視窗
    if (argCallerId == "EAC004")
    {
        document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        //1060503 Zen 1050087 二代升級        //document.all["txVerNo"].focus();
        $('#txVerNo').focus();
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1060503 Zen 1050087 二代升級function UploadFile()
{
    //上傳檔案至server
    var strFullPath = document.all.txFilePath.value;
    var strFileName, strClientPath;

    var start = strFullPath.lastIndexOf("\\");

    if (start != -1)
    {
        strFileName = strFullPath.substring(start + 1);
        strClientPath = strFullPath.substring(0, start);
    }
    else
    {
        return;
    }

    //1060503 Zen 1050087 二代升級，取消元件相關邏輯    //var soap = new ActiveXObject("WSWrapper.WebFileIO");
    ////1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
    ////soap.Init(document.all["AP_FILEIO_WS"].value);	
    //var serviceURL = document.all["AP_FILEIO_WS"].value;
    //if (document.all.II_USE_SSL != null)
    //{
    //    if (document.all.II_USE_SSL.value == "Y")
    //        serviceURL = serviceURL.replace("http://", "https://");
    //}
    //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
    //soap.Init(serviceURL);		

    try
    {
        //1060503 Zen 1050087 二代升級，取消元件相關邏輯        ////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        //soap.Init(serviceURL);
        //soap.AddFile(document.all["AP_WORK_PATH"].value, strFileName, strClientPath); //指定郵件檔上傳資訊
        ////0980918	Leslie	0980455	修改WebFileIO之參數，必需傳入Artifact
        ////soap.Upload(jf_GetSessionID(), true);
        //soap.Upload(document.all["SsoArtifact"].value, true);
        //1091207 Zen  1090891 修正弱掃網頁接露本地端資訊        //document.all.txServerPath.value = document.all["AP_WORK_PATH"].value + "\\" + strFileName;
        document.all.txServerPath.value = "\\" + strFileName;
    }
    catch (e)
    {
        //1060503 Zen 1050087 二代升級，取消元件相關邏輯        ////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
        ////alert(e.message);
        //var ErrorMessage = e.message;
        //if (soap.hasError)
        //    ErrorMessage += soap.ErrorMessage;
        //alert("連接伺服器" + serviceURL + "上傳檔案至AP伺服器失敗，錯誤訊息為:" + ErrorMessage);
        ////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
        //return;
    }
}

//1060503 Zen 1050087 二代升級，改於server端下載檔案//function DownloadFile(argFileName)
//{
//    //下載檔案至Client端
//    //上傳檔案至server
//    var strFullPath = document.all.txFilePath.value;
//    var strClientPath, strClientFileName;

//    if (strFullPath.lastIndexOf("\\") + 1 != strFullPath.length)
//        strFullPath += "\\";

//    var start = strFullPath.lastIndexOf("\\");

//    if (start != -1)
//    {
//        strClientPath = strFullPath.substring(0, start);
//        strClientFileName = strFullPath.substring(start + 1);
//    }
//    else
//    {
//        strClientPath = "C:\\TEMP";
//    }

//    var soap = new ActiveXObject("WSWrapper.WebFileIO");
//    //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//    //soap.Init(document.all["AP_FILEIO_WS"].value);
//    var serviceURL = document.all["AP_FILEIO_WS"].value;
//    if (document.all.II_USE_SSL != null)
//    {
//        if (document.all.II_USE_SSL.value == "Y")
//            serviceURL = serviceURL.replace("http://", "https://");
//    }
//    //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
//    try
//    {
//        soap.Init(serviceURL);

//        soap.AddFile(document.all["AP_WORK_PATH"].value, argFileName);

//        var fso = new ActiveXObject("Scripting.FileSystemObject");
//        if (!fso.FolderExists(strClientPath)) //下載目的資料夾不存在時建立資料夾
//            fso.CreateFolder(strClientPath);
//        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理		
//        //try
//        //{
//        //0980918	Leslie	0980455	修改WebFileIO之參數，必需傳入Artifact
//        //soap.Download(jf_GetSessionID(), true, strClientPath);				
//        soap.Download(document.all["SsoArtifact"].value, true, strClientPath);

//        alert("匯出檔案路徑為" + strClientPath + "\\" + argFileName);

//    }
//    catch (e)
//    {
//        var strErrMsg = e.message;
//        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
//        if (soap.hasError)
//            strErrMsg += soap.ErrorMessage;
//        alert("連接伺服器" + serviceURL + "下載檔案發生錯誤，錯誤訊息為:" + strErrMsg);
//        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
//    }

//}

//1060503 Zen 1050087 二代升級，改於server端下載檔案////1000728	Jeff		下載log
//function DownloadLog(argFileName)
//{
//    //下載檔案至Client端
//    var strFullPath = document.all.txFilePath.value;
//    var strClientPath;

//    var end = strFullPath.lastIndexOf("\\");

//    strClientPath = strFullPath.substring(0, end);

//    var soap = new ActiveXObject("WSWrapper.WebFileIO");
//    //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//    //soap.Init(document.all["AP_FILEIO_WS"].value);
//    var serviceURL = document.all["AP_FILEIO_WS"].value;
//    if (document.all.II_USE_SSL != null)
//    {
//        if (document.all.II_USE_SSL.value == "Y")
//            serviceURL = serviceURL.replace("http://", "https://");
//    }
//    //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
//    try
//    {
//        soap.Init(serviceURL);

//        soap.AddFile(document.all["AP_WORK_PATH"].value, argFileName);

//        var fso = new ActiveXObject("Scripting.FileSystemObject");
//        if (!fso.FolderExists(strClientPath)) //下載目的資料夾不存在時建立資料夾
//            fso.CreateFolder(strClientPath);
//        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
//        //try
//        //{       			
//        soap.Download(document.all["SsoArtifact"].value, true, strClientPath);

//    }
//    catch (e)
//    {
//        var strErrMsg = e.message;
//        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
//        if (soap.hasError)
//            strErrMsg += soap.ErrorMessage;
//        alert("連接伺服器" + serviceURL + "下載檔案發生錯誤，錯誤訊息為:" + strErrMsg);
//        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
//    }

//}

function Import_Click()
{
    //[0970891]Add by Cola 若點選匯入時，強制格式必需為XML
    if (document.all["rbImport"].checked)
    {
        document.all["rb_XML"].checked = true;
        document.all["rb_EXCEL"].checked = false;
        document.all["rb_EXCEL"].disabled = true;
        //1040609 Gabby[1040380]增加匯出版本選項--START
        document.all["dlVersion"].className = "hidden";
        document.all["lbVersion"].className = "hidden";
        //1040609 Gabby[1040380]增加匯出版本選項--END

        //1060503 Zen 1050087 二代升級，匯出時顯示路徑欄位        document.all.divDirection.className = "";
    }
}
function Export_Click()
{
    //[0970891]Add by Cola 若點選匯出時，取消格式disabled
    if (document.all["rbExport"].checked)
    {
        document.all["rb_EXCEL"].disabled = false;
        //1040609 Gabby[1040380]增加匯出版本選項--START
        document.all["dlVersion"].className = "InputFieldLabel";
        document.all["lbVersion"].className = "InputFieldLabel";
        //1040609 Gabby[1040380]增加匯出版本選項--END

        //1060503 Zen 1050087 二代升級，匯出時隱藏路徑欄位        document.all.divDirection.className = "hidden";
    }
}