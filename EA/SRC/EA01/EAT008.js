/*
日期	SA		PG		單號		DESC
0980918	--		Leslie	0980455		修正呼叫WebFileIO之參數，傳入正確之Artifact
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
1060503 Cloud   Zen     1050087     二代升級*/

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//檔案系統物件
//1060503 Zen 1050087 二代升級//var fso = new ActiveXObject("Scripting.FileSystemObject");

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
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btFileButton":
            Page_BlockSubmit = true;
            document.all["BF"].Title = "請選擇欲匯入匯出之檔案路徑";
            if (document.all["BF"].ShowDialog(0) != 0)
            {
                document.all["txFilePath"].value = document.all["BF"].Path;
            }
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
    var evBtn;

    if (IsServerHandling)
        return;

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
            Page_BlockSubmit = true;
            if (jf_Trim(document.all.txFilePath.value) == "")
            {
                alert("必須輸入檔案路徑");
                return;
            }
            jf_fnGetErrInfo();
            //1060503 Zen 1050087 二代升級            //Page_BlockSumit = false;
            //jf_ToolBarSubmit();
            break;
    }
}
function jf_fnGetErrInfo()
{
    document.all["txFilePath_SV"].value = "";

    var clientPath = document.all.txFilePath.value;
    var serName = document.all["AP_WORK_PATH"].value;

    var filepath_sv = new Array();
    //1060503 Zen 1050087 二代升級，改為使用WebFileIO--begin    //var i = 0;

    //var HasFile = false;
    //if (!fso.FolderExists(clientPath))
    //{
    //    fsoxml = null;
    //    return false;
    //}
    if ($('#txFilePath')[0].files.length == 0)
    {
        return false;
    }
    //1060503 Zen 1050087 二代升級，改為使用WebFileIO--end    else
    {
        //1060503 Zen 1050087 二代升級，改為使用WebFileIO        //var soap = new ActiveXObject("WSWrapper.WebFileIO");
        //var serviceURL=document.all.nServer.value;
        var serviceURL = document.all["AP_FILEIO_WS"].value;
        //1060503 Zen 1050087 二代升級，改為使用WebFileIO        var strArtifact = jf_GetArtifact();

        //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
        if (document.all.II_USE_SSL != null)
        {
            if (document.all.II_USE_SSL.value == "Y")
                serviceURL = serviceURL.replace("http://", "https://");
        }
        
        //1060503 Zen 1050087 二代升級，改為使用WebFileIO        var ioWS = new WebFileIO(serviceURL, strArtifact);

        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        try
        {
            //1060503 Zen 1050087 二代升級，改為使用WebFileIO--begin            //soap.Init(serviceURL);

            //var f, strFileName, fc1;
            //var f = fso.GetFolder(clientPath);
            //var fc1 = new Enumerator(f.files);
            //for (; !fc1.atEnd() ; fc1.moveNext())
            //{
            //    //取得檔案名稱
            //    objFile = fc1.item();
            //    strFileName = objFile.Path;
            //    strFileName = strFileName.substr(strFileName.lastIndexOf("\\") + 1)
            //    soap.AddFile(serName, strFileName, clientPath);
            //    HasFile = true;
            //    filepath_sv[i] = serName + "\\" + strFileName;
            //    i++;
            //}
            //if (HasFile)
            //    //0980918	Leslie	0980455	修改WebFileIO之參數，必需傳入Artifact
            //    //soap.Upload("",true);
            //    soap.Upload(document.all["SsoArtifact"].value, true);
            var AllFiles = [];
            AllFiles.push($('#txFilePath')[0].files[0]);

            document.all["txFilePath_SV"].value = $('#txFilePath')[0].files[0].name;

            ioWS.upload(serName, AllFiles, UploadCallBack);
            //1060503 Zen 1050087 二代升級，改為使用WebFileIO--end            //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
        }
        catch (e)
        {
            var strErrMsg = e.message;
            //1060503 Zen 1050087 二代升級，改為使用WebFileIO            //if (soap.hasError)
            //    strErrMsg += soap.ErrorMessage;
            alert("連接伺服器" + serviceURL + "上傳檔案至AP伺服器失敗，錯誤訊息為:" + strErrMsg);
        }
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
    }

    //1060503 Zen 1050087 二代升級    //var newdata = "";
    //
    //for (var j = 0 ; j < filepath_sv.length ; j++)
    //{
    //    newdata += filepath_sv[j];
    //
    //    if (j != filepath_sv.length - 1)
    //        newdata += ",";
    //}
    ////alert(newdata);
    //document.all["txFilePath_SV"].value = newdata;
}

//1060503 Zen 1050087 二代升級--beginfunction UploadCallBack(result)
{
    if (result.hasError)
    {
        alert(result.ErrorMessage)
        Page_BlockSubmit = true;
    }
    else
    {
        IsServerHandling = true;
        Page_BlockSubmit = false;
        jf_ToolBarSubmit('btExecute');
    }
}
//1060503 Zen 1050087 二代升級--end
//拆解檔名
function Get_FileName(argStr)
{
    var tmpStr = argStr;
    var sPOS;

    sPOS = tmpStr.indexOf("\\", 0)
    if (sPOS == -1) tmpStr = "";
    while (sPOS != -1)
    {
        sPOS = tmpStr.indexOf("\\", 0);
        if (sPOS == -1) break;
        tmpStr = tmpStr.substring(sPOS + 1, argStr.length);
    }
    return tmpStr;
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
//1060503 Zen 1050087 二代升級//function jf_ConfirmSave()
//{
//    var bRtnbool = false;
//
//    if (jf_CheckBeforSave())
//    {
//        // 新增模式需檢查鍵值是否已存在
//        if (jf_GetActionMode() == LayoutModeNew)
//        {
//            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
//            {
//                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
//                    bRtnbool = true;
//            }
//            else
//                bRtnbool = true;
//        }
//        else
//            bRtnbool = true;
//    }
//
//    return bRtnbool;
//}


//1060503 Zen 1050087 二代升級////儲存前之欄位檢查
//function jf_CheckBeforSave()
//{
//    var bRtnbool = true;
//    var strErrMsg = "";
//
//
//    if (strErrMsg != "")
//    {
//        bRtnbool = false;
//        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
//    }
//
//    return bRtnbool;
//}

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
    /*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1060503 Zen 1050087 二代升級//function UploadFile()
//{
//    //上傳檔案至server
//    var strFullPath = document.all.txFilePath.value;
//    var strFileName, strClientPath;
//
//    var start = strFullPath.lastIndexOf("\\");
//
//    if (start != -1)
//    {
//        strFileName = strFullPath.substring(start + 1);
//        strClientPath = strFullPath.substring(0, start);
//    }
//    else
//    {
//        return;
//    }
//
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
//    //soap.Init(serviceURL);		
//
//    try
//    {
//        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
//        soap.Init(serviceURL);
//        soap.AddFile(document.all["AP_WORK_PATH"].value, strFileName, strClientPath); //指定郵件檔上傳資訊
//        //0980918	Leslie	0980455	修改WebFileIO之參數，必需傳入Artifact
//        //soap.Upload(jf_GetSessionID(), true);
//        soap.Upload(document.all["SsoArtifact"].value, true);
//        document.all.txServerPath.value = document.all["AP_WORK_PATH"].value + "\\" + strFileName;
//    }
//    catch (e)
//    {
//        //alert(e.message);
//        var ErrorMessage = e.message;
//        if (soap.hasError)
//            ErrorMessage += soap.ErrorMessage;
//        alert("連接伺服器" + serviceURL + "上傳檔案至AP伺服器失敗，錯誤訊息為:" + ErrorMessage);
//        return;
//    }
//}

//1060503 Zen 1050087 二代升級
//function DownloadFile(argFileName)
//{
//    //下載檔案至Client端
//    //上傳檔案至server
//    var strFullPath = document.all.txFilePath.value;
//    var strClientPath, strClientFileName;
//
//    var start = strFullPath.lastIndexOf("\\");
//
//    if (start != -1)
//    {
//        strClientPath = strFullPath.substring(0, start);
//        strClientFileName = strFullPath.substring(start + 1);
//    }
//    else
//    {
//        strClientPath = "C:\\TEMP";
//    }
//
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
//
//        soap.AddFile(document.all["AP_WORK_PATH"].value, argFileName);
//
//        var fso = new ActiveXObject("Scripting.FileSystemObject");
//        if (!fso.FolderExists(strClientPath)) //下載目的資料夾不存在時建立資料夾
//            fso.CreateFolder(strClientPath);
//        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理		
//        //try
//        //{
//        //0980918	Leslie	0980455	修改WebFileIO之參數，必需傳入Artifact
//        //soap.Download(jf_GetSessionID(), true, strClientPath);				
//        soap.Download(document.all["SsoArtifact"].value, true, strClientPath);
//
//        alert("匯出檔案路徑為" + strClientPath + "\\" + argFileName);
//
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
//
//}
