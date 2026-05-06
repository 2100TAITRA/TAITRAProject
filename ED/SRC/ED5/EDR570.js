/*
DATE		SA			PRG			MGR_NO		DESC
0961107		Stella		Yvonne		001573		將地址DECODE BASE64
1031028		Leslie		Kenny		1030836		配合SSL修改傳入元件之URL
1040617		Leslie 		Gabby		1040324		增加WebFileIO錯誤訊息處理
1050715		David		Joe			1050087		二代系統修改  
1050803		David		Joe			1050087		修改子視窗大小
1051019     Leslie      Kenny       1050087     二代公文修改
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

//1050715 Joe 1050087 二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1050715 Joe 1050087 二代公文修改
	// jf_CallWS("../../../ODDEP/lib/WEOrgInfo.asmx", "GetOrgInfo", false, null);
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
		case "btHelp":
			//1050715 Joe 1050087 二代公文修改，修正開啟WEM010C1方法--S
			strOrgID = document.all.H_OrgNo.value;
			var path = document.all.H_Wed010C1Path.value;
			//1050715 Joe 1050087 二代公文修改，修正開啟WEM010C1方法--E
			var strUrl = "";
			//1050715 Joe 1050087 二代公文修改，修正開啟WEM010C1方法
			//strUrl = "../../../ODDEP/WEM010C1.aspx?OrgID="+document.all.h_OrgNo.value+"&K1=Dlg_Dept&Search="+document.all.txOrgNo.value;
			strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + strOrgID + "&K1=WEM010";
			//1050803	Joe		1050087		修正子視窗大小
			// jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			jf_OpenChildWin(strUrl, "WEM010C1", 800, 600 );
			Page_BlockSubmit=true;
			break;
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
		case "btClean":
			Page_BlockSubmit = true;
			jf_SaveHideValue();			
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			if (document.all["txOrgNo"].value == "" && document.all["txOrgName"].value == "")
			{
				var strErrMsg = "受文機關不可空白\n";
				//1050715	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txOrgNo"].focus();
				$('#txOrgNo').focus();	
				jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
				Page_BlockSubmit = true;
			}							
			//1050715 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
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
		if(jf_IsWebServiceSuccess(argResult))
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
	if (argCallerId == "WEM010C1")
	{
		var DeptInfo = document.all["lbReturnValue"].options[0].value;
		//1050715	Joe		修改WEM010C1回傳值處理方式
		//var DeptArray = DeptInfo.split(',');
		var DeptArray = DeptInfo.split('^');
		if(DeptArray.length > 0)
		{
			document.all["txOrgName"].value = jf_Trim(DeptArray[1]);
			document.all["txOrgNo"].value = jf_Trim(DeptArray[2]);
			document.all["txPostCode"].value = jf_Trim(DeptArray[6]);
			document.all["txAddress"].value = utf8to16(base64decode(jf_Trim(DeptArray[7])));
			
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
/***********************************
*
* 清除前儲存隱藏欄位
*
************************************/
function jf_SaveHideValue()
{
	var strOrgno = jf_Trim( document.all.h_OrgNo.value );
	var strDeptno = jf_Trim( document.all.h_DeptNo.value );
	var strUserid = jf_Trim( document.all.h_UserId.value );	
	jf_ConfirmClean(true);
	document.all.h_OrgNo.value = strOrgno;
	document.all.h_DeptNo.value = strDeptno;
	document.all.h_UserId.value = strUserid;	
	//1050715	Joe	1050087	二代系統升級，調整focus寫法
	//document.all["txOrgNo"].focus();
	$('#txOrgNo').focus();	
}
/***********************************
*
*  於clientonload下載txt和bat並執行bat
*
************************************/
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
			var serviceURL = document.all["AP_FILEIO_WS"].value ;
			if ( document.all.II_USE_SSL != null )
			{
				if ( document.all.II_USE_SSL.value == "Y" )
					serviceURL = serviceURL.replace("http://", "https://") ;
			}
			soap.Init(serviceURL);
			
			soap.AddFile(strPathServer, strFileName);
			soap.Download(document.all["SsoArtifact"].value, true, strPath);
		}
		catch(e)
		{
			//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
			//alert("下載檔案" + strFileName + "失敗，錯誤訊息：" + e.message);
			alert("連接伺服器"+serviceURL+"下載檔案" + strFileName + "失敗，錯誤訊息：" + e.message+soap.ErrorMessage);
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
			alert("連接伺服器"+serviceURL+"下載檔案" + strBatFileName + "失敗，錯誤訊息：" + e.message+soap.ErrorMessage);
		}
		
		var objShell = new ActiveXObject("Shell.Application");
                objShell.ShellExecute(strPath + strBatFileName, "", "", "open", 0);
	}
}
/**************************
*
*  受文機關Onblur呼叫函式
*
***************************/
function CheckOrgNo()
{
	var strOrgNo = jf_Trim(document.all["txOrgNo"].value);
	if (strOrgNo=="")
	{
		document.all["txOrgNo"].value = "" ;
		document.all["txOrgName"].value = "";
		return ;
	}
	var wsParam = new Array();
	wsParam[0] = strOrgNo;
	wsParam[1] = document.all.h_OrgNo.value;
	wsParam[2] = document.all.h_DeptNo.value;
	wsParam[3] = document.all.h_UserId.value;
	
	CallWsObj = jf_CallWS("../../../ODDEP/lib/WEOrgInfo.asmx","GetOrgInfo",false,wsParam);	
	
	//檢查執行是否成功
	if(jf_IsWebServiceSuccess(CallWsObj))
	{		
		if(!CallWsObj.value.ErrorClass.IsErr)
		{
			if(CallWsObj.value.Count > 0)
			{
				if(jf_Trim(CallWsObj.value.OrgID[0])!="")
					document.all.txOrgNo.value = jf_Trim(CallWsObj.value.OrgID[0]);
				document.all.txOrgName.value = jf_Trim(CallWsObj.value.OrgName[0]);
				document.all.txPostCode.value = jf_Trim(CallWsObj.value.PostNo[0]);
				document.all.txAddress.value = jf_Trim(CallWsObj.value.Address[0]);
			}		
			else
			{
				/*檢查是否輸入英數 英數秀錯誤訊息
				jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["無此機關代碼"]) ), "" );*/
				document.all.txOrgName.value = "";				
			}
		}
	}

}

//decode base64
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	/* c1 */
	do {
	    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c1 == -1);
	if(c1 == -1)
	    break;

	/* c2 */
	do {
	    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c2 == -1);
	if(c2 == -1)
	    break;

	out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

	/* c3 */
	do {
	    c3 = str.charCodeAt(i++) & 0xff;
	    if(c3 == 61)
		return out;
	    c3 = base64DecodeChars[c3];
	} while(i < len && c3 == -1);
	if(c3 == -1)
	    break;

	out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

	/* c4 */
	do {
	    c4 = str.charCodeAt(i++) & 0xff;
	    if(c4 == 61)
		return out;
	    c4 = base64DecodeChars[c4];
	} while(i < len && c4 == -1);
	if(c4 == -1)
	    break;
	out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }

    return out;

}



function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
	c = str.charCodeAt(i++);
	switch(c >> 4)
	{ 
	  case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
	    // 0xxxxxxx
	    out += str.charAt(i-1);
	    break;
	  case 12: case 13:
	    // 110x xxxx   10xx xxxx
	    char2 = str.charCodeAt(i++);
	    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
	    break;
	  case 14:
	    // 1110 xxxx  10xx xxxx  10xx xxxx
	    char2 = str.charCodeAt(i++);
	    char3 = str.charCodeAt(i++);
	    out += String.fromCharCode( ((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) |  ((char3 & 0x3F) << 0));
	    break;
	}
    }

    return out;
}