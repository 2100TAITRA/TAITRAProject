/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1020327  Leslie  Cloud   1020113		修正由搜尋帶回帳號開啟時不會建立暫存資料夾，以及子視窗搜尋易常的bug
 * 1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
 * 1040106  Cloud	Gabby	1030855		將所有產出之TIF檔轉為PNG
 * 1040210	Kevin	Kenny	1030930	    開啟IFC020前增加寫入Cookie資訊
  * 1040617	Leslie	Gabby	1040324		增加WebFileIO錯誤訊息處理
 * 1051014	Kevin	Kevin_C	1050087		升二代
 * 1051103	Kevin	Kevin_C	1050087		修子視窗不使用showModalDialog
 * 1051219  Kevin	Kevin_C	1050087		將職名章預設為紅色的邏輯取消，改用原始顏色
 * 1060117	Kevin	Kevin	--			新增支援PNG
 * 1060316	Kevin	Kevin	--			新增可設定顏色、尺寸、預設章
 * 1070103	Kevin	Kevin_C	1061269		預設章戳改為單選
 * 1070827	Kevin	Joe		1070678		弱掃修正Hardcoded Absolute Path
 * 1070904	Kevin	Justin	1070678		弱掃修正CookieHttpOnly
 * 1080510	Kevin	Joe		1080311		新增之章戳改以現在系統時間當檔名
 * 1080816	Kevin	Joe		1080628		修正開啟子視窗前需進行編碼
 * 1100319  Kevin	Joe		1090583     修改章戳產生方式，改由Server端產生
 * 1101111	Joe		Joe		1101258		修正Error Control判斷
 * 1130116	Leslie	Leslie	1130033		因使用端調整個人章戳下載行為，故改為使用者維護本人的章戳時，重置設以定觸發重新下載 
 * 1150206	Zen		Andy	序63        修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
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

//1051014	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


//可維護多個職名章
//檔案系統物件，用來讀取受文者檔案
var ForReading = 1,ForWriting = 2;
//1051014	Kevin_C	1050087	升二代
//1100319  Joe 1090583	停用ActiveXObject相關(本作業不再使用)
/*try
{
	var fso = new ActiveXObject("Scripting.FileSystemObject");
}
catch(e)
{
	var strErrMsg = e.message;
	if(strErrMsg.indexOf("ActiveXObject") != -1)
		jf_CloseSelf("本程式僅能於IE上執行，請改用IE開啟本程式。");
	else if(strErrMsg.indexOf("Automation 伺服程式無法產生物件") != -1)
		jf_CloseSelf("元件無法正常執行，請洽資訊人員調整IE安全性設定。");
	else
		alert(e.message);
}*/
//1100319  Joe 1090583	修改章戳產生方式，改由Server端產生
//var local="";	

//1100319  Joe 1090583	修改章戳產生方式，改由Server端產生，配合增加AjaxPro宣告
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1051014	Kevin_C	1050087	升二代
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
		//可維護多個職名章
	//1100319  Joe 1090583	修改章戳產生方式，改由Server端產生--S
/*
	if(document.all.dg1!=null)
	{
		if(jf_Trim(document.all.txAccount.value)!="")
		{
			//1070827	Joe		1070678		弱掃修正Hardcoded Absolute Path
			// local= "C:\\temp\\"+document.all.txAccount.value+"\\";
			//local= document.all.localPath.value;
			//jf_fnDownLoadTif();
		}
	}
*/
	$('#btNLoadNew').on('click',function(){$('#btFile').trigger('click');});
	$('#btFile').on('change',readFile);	
	//1100319  Joe 1090583	修改章戳產生方式，改由Server端產生--S
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051014	Kevin_C	1050087	升二代
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051014	Kevin_C	1050087	升二代
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}
	
	var btDeletSig,btViewSig;
	//1100319  Joe 1090583	配合調整章戳產生方式，本作業改為可支援跨平台
	if(xObjectName.indexOf("_btDeleteSig") != -1){
		pNo = xObjectName.substring(8, xObjectName.indexOf("_btDeleteSig"));
		btDeletSig = $('#'+xObjectName)[0].id;
	}
	else if (xObjectName.indexOf("_btViewSig") != -1){
		pNo = xObjectName.substring(8, xObjectName.indexOf("_btViewSig"));
		btViewSig = $('#'+xObjectName)[0].id;
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
		//1100319  Joe 1090583	配合調整章戳產生方式，本作業改為可支援跨平台--S
		case "btNNewSig":
			Page_BlockSubmit=true;
			jf_btNewSignet('Search');
			break;
		case btViewSig:
			jf_btViewSignet(pNo);
			break;
		case btDeletSig:
			jf_btDeleteSignet(pNo);
			break;
		//1100319  Joe 1090583	配合調整章戳產生方式，本作業改為可支援跨平台--E
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
//1051014	Kevin_C	1050087	升二代
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
	//1051014	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1100319  Joe 1090583	修改章戳產生方式，改由Server端產生
			//jf_fnCreateCFolder();
			//1051014	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			
			// 1130116 Leslie[1130033] 當開放使用者維護本人章戳時，儲存後即重置以觸發重新下載章戳
			var filter = document.all.txAccount.value;
			let ssoPage = GetSSOPage()
			if(GetSSOPage().theUserInfo.UserID == filter){
				if(typeof ssoPage.theAOL != 'undefined')
					ssoPage.theAOL.stampBoxInited = false;
			}
		
            //1080110   Joe[1071199] 所有章均已存於Server端，直接PostBack即可
			//jf_fnUpLoadTif();
			IsServerHandling = true;
			jf_ShowWaitState();	
			Page_BlockSubmit = false;
			//1051014	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1051014	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1051014	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			jf_ConfirmClean();
			Page_BlockSubmit = true;
			break;
		case "btSearch":
			var filter = document.all.txAccount.value;
			//1051103	Kevin_C	1050087	修子視窗不使用showModalDialog -S
			//var ret = jf_ShowPersonDialog(filter, document.all["dlOrg"].value);
			
			//if(ret!=null)
			//{
			//	//回傳格式=代碼,名稱,DN
			//	Page_BlockSubmit = false;
			//	document.all.txAccount.value=GetElement(ret,0);
			//	// 1020327   Cloud   1020113		修正由搜尋帶回帳號開啟時不會建立暫存資料夾，以及子視窗搜尋易常的bug
			//	jf_fnCreateCFolder();
			//	jf_OpenButtonSubmit();
			//}
			Page_BlockSubmit = true;
			jf_ShowPersonDialog(filter, document.all["dlOrg"].value);
			//1051103	Kevin_C	1050087	修子視窗不使用showModalDialog -E
			break;
		case "btRevSearch":
			Page_BlockSubmit = false;
			//1051014	Kevin_C	1050087	升二代
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
function CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg ="";
	
	
	if (jf_Trim(document.all.txPrivName.value)=='')
	{
		strErrMsg += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["權利名稱"]))+"\n";
		bRtnbool = false;
		//1051014	Kevin_C	1050087	升二代
		//document.all.txPrivName.focus();
		$('#txPrivName').focus();
	}

	if (!bRtnbool)
	{
		alert(strErrMsg,"");
	}	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
//1051014	Kevin_C	1050087	升二代
// function jf_CheckBlankAndAlert()
// {
	// var InValidName = "";
	// var InValidControlName = "";
	
	// for(var i = 2; i <= document.all.dg1.rows.length; i++)
	// {
		////txInput1不為空白時
		// if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		// {
			////txInput2不可空白
			// if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			// {
				// InValidName += ",Input2不可空白";			
				// InValidControlName = "dg1__ctl" + i + "_txInput2";
			// }
							
			// if(InValidName != "")
			// {
				// InValidName = InValidName.substr(1,InValidName.length);
				// jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
				// document.all[InValidControlName].focus();
				// return false;
			// }
		// }
	// }
	// return true;
// }

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	//1051103	Kevin_C	1050087	修子視窗 -S
	if(argCallerId == "IFC020")
	{
		if(document.all.lbReturnValue.options[0])
		{
			//回傳格式=代碼,名稱,DN
			Page_BlockSubmit = false;
			document.all.txAccount.value=GetElement(document.all.lbReturnValue.options[0].value,0);
			//1100319  Joe 1090583	修改章戳產生方式，改由Server端產生
			//jf_fnCreateCFolder();
			jf_OpenButtonSubmit();
		}
	}
	//1050729	Kevin_C	1050087	修子視窗 -E

	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1051014	Kevin_C	1050087	升二代
// function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
// {
	// var index	= document.all[argDDLId].selectedIndex;
	// var obj		= document.all[argDDLId].options[index];
	
	// document.all[argTextBoxId].value = obj.text;
	// document.all[argLabelId].innerText = obj.value;
// }

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = false;
	
	return bRtnbool;
}

//可維護多個職名章STATR
function jf_btNewSignet(rNo)
{
	var rowTag = "dg1__ctl"+rNo+"_";
	if(rNo == 'Search')//取得datagrid中未使用的row
	{
		for(var nidx= 2; nidx <document.all.dg1.rows.length+2 ; nidx++)
		{
			rNo = nidx;
			rowTag = "dg1__ctl"+rNo+"_";
		    //1100319  Joe 1090583 改為判斷ReadOnly，不然無法正確回傳至Server端
		    //if(document.all[rowTag+"txNameL"].disabled != true)
			if (document.all[rowTag + "txNameL"].readOnly != true)
				break;
		}	
	}
	
	Page_BlockSubmit=true;

	if((jf_Trim(document.all["txNFirst"].value)=="")&&(jf_Trim(document.all["txNSecond"].value)==""))
	{
		alert('尚未輸入職稱資訊,請輸入後再點選產生章戳');
		if(jf_Trim(document.all["txNFirst"].value)=="")
		{
			//1051014	Kevin_C	1050087	升二代
			//document.all["txNFirst"].focus();
			$('#txNFirst').focus();
			return;
		}
		if(jf_Trim(document.all["txNSecond"].value)=="")
		{
			//1051014	Kevin_C	1050087	升二代
			//document.all["txNSecond"].focus();
			$('#txNSecond').focus();
			return;
		}
		return;
	}
	if(jf_Trim(document.all["txNName"].value)=="")
	{
		alert('尚未輸姓名!');
		//1051014	Kevin_C	1050087	升二代
		//document.all["txNName"].focus();
		$('#txNName').focus();
		return;
	}
	if(jf_Trim(document.all["txNTitle"].value)=="")
	{
		alert('尚未輸入章戳名稱!');
		//1051014	Kevin_C	1050087	升二代
		//document.all["txNTitle"].focus();
		$('#txNTitle').focus();
		return;
	}
	//呼叫SfolderUtill
	var sDept	=document.all["txNFirst"].value;
	var sTitle	=document.all["txNSecond"].value;
	var sName	=document.all["txNName"].value;
	var vIdx=document.all["ddlNPattern"].selectedIndex;
	var vVal=document.all["ddlNPattern"].options[vIdx].value;
	var sArr=vVal.split('-');
	var sWidth	=sArr[0];
	var sHeight	=sArr[1];
	var sTitleLeng	=sArr[2];
	var sType	="0";
	var sOrient	="0";
	var vFontIdx=document.all["ddlNWord"].selectedIndex;
	var vFontVal=document.all["ddlNWord"].options[vFontIdx].text;
	var sFont	=vFontVal;
	var sNo = rNo - 1;
	//1100319  Joe 1090583	修改章戳產生方式，改由Server端產生
    /*
	//1080510	Joe		1080311		改取得現在時間當檔名--S
	//document.all[rowTag+"h_txFileName"].value= document.all.nNewTime.value+"_SignetL-"+""+"00"+sNo+".tif";
	var dtNow = new Date();
	var sSigName = (dtNow.getFullYear() - 1911) + '' + (dtNow.getMonth() + 1) + dtNow.getDate() + dtNow.getHours() + dtNow.getMinutes() + dtNow.getSeconds();
	document.all[rowTag + "h_txFileName"].value = "SignetL-" + sSigName + ".tif";
	//1080510	Joe		1080311		改取得現在時間當檔名--E
	var sOutput	=local+document.all[rowTag+"h_txFileName"].value;
	var sOutput = document.all["Gtf"].genTifSignet(
		sDept,
		sTitle,
		sName,
		sWidth,
		sHeight,
		sTitleLeng,
		sType,
		sOrient,
		sFont,
		sOutput);
	var oShell = new ActiveXObject("Shell.Application");
	var commandtoRun = local+document.all[rowTag+"h_txFileName"].value;
	oShell.ShellExecute(commandtoRun, "", "", "", "0");

	//1040106 Gabby[1030855] 將所有產出之TIF檔轉為PNG
	var o = new ActiveXObject("SFolderUtil.SignFolderUtil");
	if(o != null) 
	{
		// 參數1: 原始圖檔全路徑
		// 參數2: 要求轉換格式後儲存的子目錄路徑, 也可以直接設為含有檔名副檔名的全路徑
		// 參數3: 要求轉換儲存的格式, 此元件僅接受 21:JPG, 33:PNG, 40:TIF(G4) 三種格式代碼
		// 回傳值:成功轉換後儲存的本地端全路徑
		var f = o.Convert(commandtoRun, local, 33);
		//1080510	Joe		1080311		改取得現在時間當檔名
		//document.all[rowTag+"h_txFileName"].value=f.substring(f.lastIndexOf("\\"),f.length);
		document.all[rowTag + "h_txFileName"].value = f.substring(f.lastIndexOf("\\") +1, f.length);
	}
	//1040106 Gabby[1030855] END	*/
	var strArtifact = document.all.SsoArtifact.value;
	
	var sFileName = IF1.IFM390.BuitdStamp(strArtifact,sDept,sTitle,sName,vVal,sFont,sNo);
	document.all[rowTag+"h_txFileName"].value=sFileName.value;
	var viewUrl = IF1.IFM390.ViewStamp(strArtifact, sFileName.value);
	//1101111	Joe		1101258		修正Error Control判斷
	if (viewUrl.value.indexOf("ERR") != -1) {
		alert(viewUrl.value);
		return;
    }
	openDlg(viewUrl.value,strArtifact,'IMAGE');
	//1100319  Joe 1090583	修改章戳產生方式，改由Server端產生	--END--
	
	document.all[rowTag+"txNameL"].value = document.all["txNName"].value;
	document.all[rowTag+"txTitle"].value = document.all["txNTitle"].value
	document.all[rowTag+"btViewSig"].disabled = false;
    //1100319  Joe 1090583 改為設定ReadOnly，不然無法正確回傳至Server端
	//document.all[rowTag+"txNameL"].disabled =true;
    //document.all[rowTag+"txTitle"].disabled=true;
	document.all[rowTag + "txNameL"].readOnly = true;
	document.all[rowTag + "txTitle"].readOnly = true;
	document.all[rowTag + "txNameL"].className = "DisplayOnly";
	document.all[rowTag + "txTitle"].className = "DisplayOnly";
	//10201017	Cloud [1011050]增加放入機關名稱及代碼
	document.all[rowTag+"txOrgNo"].value=document.all.dlOrg.options[document.all.dlOrg.selectedIndex].value;
	//1051014	Kevin_C	1050087	升二代
	//document.all[rowTag+"lbOrgNo"].innerText=document.all.dlOrg.options[document.all.dlOrg.selectedIndex].text;
	document.all[rowTag + "lbOrgNo"].textContent = document.all.dlOrg.options[document.all.dlOrg.selectedIndex].text;
	//1060316 Kevin 新增可設定顏色、尺寸、預設章
	////1051220	Kevin_C	1050087	非新增圖檔章戳，應預設顏色為紅色
	//document.all[rowTag+"txColor"].value="255/0/0";
	document.all[rowTag + "dlColor"].selectedIndex = document.all["dlNColor"].selectedIndex;
	document.all[rowTag + "txSize"].value = document.all["txNSize"].value;
}

function jf_btViewSignet(rNo)
{
	Page_BlockSubmit=true;

    //1100319  Joe 1090583	修改章戳產生方式，改由Server端產生
	var sFileName = document.all["dg1__ctl"+rNo+"_h_txFileName"].value;
    var strArtifact = document.all.SsoArtifact.value;
	var viewUrl = IF1.IFM390.ViewStamp(strArtifact, sFileName);
	//1101111	Joe		1101258		修正Error Control判斷
	if (viewUrl.value.indexOf("ERR") != -1) {
		alert(viewUrl.value);
		return;
	}
    openDlg(viewUrl.value, strArtifact, 'IMAGE');

    /*
	var oShell = new ActiveXObject("Shell.Application");
	var commandtoRun = local+document.all["dg1__ctl"+rNo+"_h_txFileName"].value;
	oShell.ShellExecute(commandtoRun, "", "", "", "0");
	
	//1040106 Gabby[1030855] 將所有產出之TIF檔轉為PNG
	var o = new ActiveXObject("SFolderUtil.SignFolderUtil");
	if(o != null) 
	{
		// 參數1: 原始圖檔全路徑
		// 參數2: 要求轉換格式後儲存的子目錄路徑, 也可以直接設為含有檔名副檔名的全路徑
		// 參數3: 要求轉換儲存的格式, 此元件僅接受 21:JPG, 33:PNG, 40:TIF(G4) 三種格式代碼
		// 回傳值:成功轉換後儲存的本地端全路徑
		var f = o.Convert(commandtoRun, local, 33);
	}
	//1040106 Gabby[1030855] END	
    */
    //1100319  Joe 1090583	修改章戳產生方式，改由Server端產生	--END--
}
function jf_btDeleteSignet(rNo)
{
	Page_BlockSubmit=true;
	var rowTag = "dg1__ctl"+rNo+"_";
	
	//1110601	Joe		1090504		補註記，避免Merge發生錯誤
	/*
	if(jf_Trim(document.all[rowTag+"h_txFileName"].value)!="")
	{
		var fileName =local+jf_Trim(document.all[rowTag+"h_txFileName"].value);
		if(fso.FileExists(fileName))
			fso.DeleteFile(fileName,true);
	}*/

	document.all[rowTag+"h_txFileName"].value="";
	document.all[rowTag+"txTitle"].value="";
	document.all[rowTag+"txNameL"].value="";
	document.all[rowTag+"btViewSig"].disabled = true;
    //1100319  Joe 1090583 改為設定ReadOnly，不然無法正確回傳至Server端
	//document.all[rowTag+"txNameL"].disabled =false;
    //document.all[rowTag+"txTitle"].disabled=false;
	document.all[rowTag + "txNameL"].readOnly = false;
	document.all[rowTag + "txTitle"].readOnly = false;
	document.all[rowTag + "txNameL"].className = "";
	document.all[rowTag + "txTitle"].className = "";
	//1020117	Cloud	增加所屬機關
	document.all[rowTag+"txOrgNo"].value="";
	//1051014	Kevin_C	1050087	升二代
	//document.all[rowTag+"lbOrgNo"].innerText="";
	document.all[rowTag+"lbOrgNo"].textContent="";
	//1051219	Kevin_C	刪除時，新增的顏色紀錄欄位需清空
	//1060316 Kevin 新增可設定顏色、尺寸、預設章
	//document.all[rowTag+"txColor"].value="";
	document.all[rowTag + "dlColor"].selectedIndex = 0;
	document.all[rowTag + "txSize"].value = "";
	document.all[rowTag + "cbDefault"].checked = false;
}

//1100319  Joe 1090583	配合調整章戳產生方式，增加傳入已轉為Base64URL格式的章戳
//function jf_btLoadNew(rNo)
function jf_btLoadNew(rNo,sBase64Stamp)
{
	var rowTag = "dg1__ctl"+rNo+"_";
	if(rNo == 'Search')//取得datagrid中未使用的row
	{
		for(var nidx= 2; nidx <document.all.dg1.rows.length+2 ; nidx++)
		{
			rNo = nidx;
			rowTag = "dg1__ctl"+rNo+"_";
		    //1100319  Joe 1090583 改為判斷ReadOnly，不然無法正確回傳至Server端
		    //if(document.all[rowTag+"txNameL"].disabled != true)
			if (document.all[rowTag + "txNameL"].readOnly != true)
				break;
		}	
	}

	Page_BlockSubmit=true;

	if(jf_Trim(document.all.btFile.value)!="")
	{
		strFileName = document.all.btFile.value;
		//1060117 Kevin 新增支援PNG
		//if(strFileName.substr(strFileName.lastIndexOf("\.") + 1).toUpperCase() == "TIF")
		var extName = strFileName.substr(strFileName.lastIndexOf("\.") + 1).toUpperCase();
		if (extName == "TIF" || extName == "PNG")
		{
			//1100319  Joe 1090583	配合調整章戳產生方式--S
		    var strArtifact = document.all.SsoArtifact.value;
		    var stampFile = IF1.IFM390.UploadStamp(strArtifact, sBase64Stamp, rNo);
		    if (stampFile.value.indexOf('ERR-') != -1) {
		        alert(stampFile.value);
		        return;
		    }
		    document.all[rowTag + "h_txFileName"].value = stampFile.value;
			var viewUrl = IF1.IFM390.ViewStamp(strArtifact, stampFile.value);
			//1101111	Joe		1101258		修正Error Control判斷
			if (viewUrl.value.indexOf("ERR") != -1) {
				alert(viewUrl.value);
				return;
			}
			openDlg(viewUrl.value,strArtifact,'IMAGE');
			/*
			//1080510	Joe		1080311		改取得現在時間當檔名--S
			//document.all[rowTag+"h_txFileName"].value=document.all.nNewTime.value+"_SignetL-"+""+"00"+rNo+".tif"
			var dtNow = new Date();
			var sSigName = (dtNow.getFullYear() - 1911) + '' + (dtNow.getMonth() + 1) + dtNow.getDate() + dtNow.getHours() + dtNow.getMinutes() + dtNow.getSeconds();
			document.all[rowTag + "h_txFileName"].value = "SignetL-" + sSigName + ".tif";
			//1080510	Joe		1080311		改取得現在時間當檔名--E
			fso.CopyFile(strFileName,local+document.all[rowTag+"h_txFileName"].value,true);
			
			var oShell = new ActiveXObject("Shell.Application");
			var commandtoRun = local+document.all[rowTag+"h_txFileName"].value;
			oShell.ShellExecute(commandtoRun, "", "", "", "0");
		
			//1060117 Kevin 新增支援PNG
			if (extName == "TIF")
			{
				//1040106 Gabby[1030855] 將所有產出之TIF檔轉為PNG	
				var o = new ActiveXObject("SFolderUtil.SignFolderUtil");

				if (o != null)
				{
					// 參數1: 原始圖檔全路徑
					// 參數2: 要求轉換格式後儲存的子目錄路徑, 也可以直接設為含有檔名副檔名的全路徑
					// 參數3: 要求轉換儲存的格式, 此元件僅接受 21:JPG, 33:PNG, 40:TIF(G4) 三種格式代碼
					// 回傳值:成功轉換後儲存的本地端全路徑
					var f = o.Convert(commandtoRun, local, 33);
					//1080510	Joe		1080311		改取得現在時間當檔名
					//document.all[rowTag + "h_txFileName"].value = f.substring(f.lastIndexOf("\\"), f.length);
					document.all[rowTag + "h_txFileName"].value = f.substring(f.lastIndexOf("\\") +1, f.length);
				}
				//1040106 Gabby[1030855] END
			}*/	
			//1100319  Joe 1090583	配合調整章戳產生方式	--END--
			
			if(jf_Trim(document.all["txNTitle"].value)=="")
				document.all[rowTag+"txTitle"].value = strFileName.substr(strFileName.lastIndexOf("\\")+1,strFileName.lastIndexOf("\.")-strFileName.lastIndexOf("\\")-1);
			else
				document.all[rowTag+"txTitle"].value = document.all["txNTitle"].value;
			
			document.all[rowTag+"txNameL"].value = document.all["txNName"].value;
			document.all[rowTag+"btViewSig"].disabled = false;
		    //1100319  Joe 1090583 改為設定ReadOnly，不然無法正確回傳至Server端--S
		    //document.all[rowTag+"txNameL"].disabled =true;
		    //document.all[rowTag+"txTitle"].disabled=true;
			document.all[rowTag + "txNameL"].readOnly = true;
			document.all[rowTag + "txTitle"].readOnly = true;
			document.all[rowTag + "txNameL"].className = "DisplayOnly";
			document.all[rowTag + "txTitle"].className = "DisplayOnly";
		    //1100319  Joe 1090583 改為設定ReadOnly，不然無法正確回傳至Server端--E
			//1020319	Cloud	[1020098]	修改由影像檔新增時增加紀錄是由以建立的影像檔新增的，併處理前單1011050，使用由影像新增未放入機關的bug
			document.all[rowTag+"h_txAddByNLoadNew"].value="Y";
			document.all[rowTag+"txOrgNo"].value=document.all.dlOrg.options[document.all.dlOrg.selectedIndex].value;
			//1051014	Kevin_C	1050087	升二代
			//document.all[rowTag+"lbOrgNo"].innerText=document.all.dlOrg.options[document.all.dlOrg.selectedIndex].text;
			document.all[rowTag + "lbOrgNo"].textContent = document.all.dlOrg.options[document.all.dlOrg.selectedIndex].text;
			//1060316 Kevin 新增可設定顏色、尺寸、預設章
			document.all[rowTag + "dlColor"].selectedIndex = document.all["dlNColor"].selectedIndex;
			document.all[rowTag + "txSize"].value = document.all["txNSize"].value;
		}
		else
		{
			//1060117 Kevin 新增支援PNG
			//alert("僅允許設定TIF檔");
			alert("僅允許設定TIF,PNG檔");
		}
		//1051019	Kevin_C	1050087	升二代
		//document.all.td_btFile.innerHTML="<INPUT id='btFile' type='file' style='DISPLAY:none;WIDTH:10px'>";
		//1060117 Kevin 新增支援PNG
		//document.all.td_btFile.innerHTML = "<INPUT id='btFile' type='file' style='DISPLAY:none;WIDTH:10px' accept='.tif'>";
		document.all.td_btFile.innerHTML = "<INPUT id='btFile' type='file' style='DISPLAY:none;WIDTH:10px' accept='.tif,.png'>";
		$('#btFile').on('change',readFile);	//1100319  Joe 1090583	補註冊讀取檔案行為
	}
}

//1100319  Joe 1090583	修改章戳產生方式，改由Server端產生
/*
function jf_fnCreateCFolder()
{
	local= "C:\\temp\\"+document.all.txAccount.value+"\\";
	if(fso.FolderExists(local))
		fso.DeleteFile(local+"*",true);
	else
		fso.CreateFolder(local);
}*/

//1100319  Joe 1090583 所有章均已存於Server端，不再使用
/*function jf_fnUpLoadTif()
{
	var soap = new ActiveXObject("WSWrapper.WebFileIO");
	var serviceURL=document.all.nServer.value;
	//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
	if ( document.all.II_USE_SSL != null )
	{
		if ( document.all.II_USE_SSL.value == "Y" )
			serviceURL = serviceURL.replace("http://", "https://") ;
	}
	//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
	try
	{
		soap.Init(serviceURL);
		//var len = document.all["dg1"].rows.length + 2;
		var len = document.all["dg1"].rows.length + 1;
		var HasFile= false;
		var AllFiles = [];
		for(var i = 2; i < len; i++)
		{
			if(jf_Trim(document.all["dg1__ctl"+i+"_h_txFileName"].value)!="")
			{
				document.all["dg1__ctl"+i+"_txTitle"].disabled=false;
				soap.AddFile(document.all.txServerPath.value,document.all["dg1__ctl"+i+"_h_txFileName"].value,local);
				HasFile=true;
			}
		}
		//多取得權杖,並於呼叫WebFileIO元件時傳入,以便WebFileIO處進行使用者身份判斷
		var strArtifact = document.all.SsoArtifact.value;
		if(HasFile)
			soap.Upload(strArtifact,true);
	//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
	}
	catch(e)
	{
		var strErrMsg = e.message;		
		if (soap.hasError)
			strErrMsg += soap.ErrorMessage;
		alert("連接伺服器"+serviceURL+"上傳檔案至AP伺服器失敗，錯誤訊息為:"+strErrMsg);		
	}
	//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
}*/
//1100319  Joe 1090583	修改章戳產生方式，改由Server端產生，不再使用
/*
function jf_fnDownLoadTif()
{
	var soap = new ActiveXObject("WSWrapper.WebFileIO");
	var serviceURL=document.all.nServer.value;
	//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
	if ( document.all.II_USE_SSL != null )
	{
		if ( document.all.II_USE_SSL.value == "Y" )
			serviceURL = serviceURL.replace("http://", "https://") ;
	}
	//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
	try
	{
		soap.Init(serviceURL);
		
		//1051014	Kevin_C	1050087	升二代
		//var len = document.all["dg1"].rows.length + 2;
		var len = document.all["dg1"].rows.length + 1;
		var HasFile= false;
		for(var i = 2; i < len; i++)
		{
			if(jf_Trim(document.all["dg1__ctl"+i+"_h_txFileName"].value)!="")
			{	
				soap.AddFile(document.all.txServerPath.value,document.all["dg1__ctl"+i+"_h_txFileName"].value);
				HasFile=true;
			}
		}
		//多取得權杖,並於呼叫WebFileIO元件時傳入,以便WebFileIO處進行使用者身份判斷
		var strArtifact = document.all.SsoArtifact.value;
		if(HasFile)
		{
			soap.Download(strArtifact, false, local);
			//1040106 Gabby[1030855] 將所有產出之TIF檔轉為PNG
			//1051014	Kevin_C	1050087	升二代
			//var len = document.all["dg1"].rows.length + 2;
			var len = document.all["dg1"].rows.length + 1;
			var HasFile= false;
			for(var i = 2; i < len; i++)
			{
				if(jf_Trim(document.all["dg1__ctl"+i+"_h_txFileName"].value)!="")
				{
					if(document.all["dg1__ctl"+i+"_h_txFileName"].value.toUpperCase().indexOf("PNG")==-1)
					{
						var commandtoRun=document.all.txServerPath.value+document.all["dg1__ctl"+i+"_h_txFileName"].value;
						var o = new ActiveXObject("SFolderUtil.SignFolderUtil");
						if(o != null) 
						{
							// 參數1: 原始圖檔全路徑
							// 參數2: 要求轉換格式後儲存的子目錄路徑, 也可以直接設為含有檔名副檔名的全路徑
							// 參數3: 要求轉換儲存的格式, 此元件僅接受 21:JPG, 33:PNG, 40:TIF(G4) 三種格式代碼
							// 回傳值:成功轉換後儲存的本地端全路徑
							var f = o.Convert(commandtoRun, local, 33);
							if(fso.FileExists(commandtoRun))
								fso.DeleteFile(commandtoRun,true);
							document.all["dg1__ctl"+i+"_h_txFileName"].value=f.substring(f.lastIndexOf("\\"),f.length);
						}
					}
				}
			}
			//1040106 Gabby[1030855] END
		}
	//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
	}
	catch(e)
	{
		var strErrMsg = e.message;		
		if (soap.hasError)
			strErrMsg += soap.ErrorMessage;
		alert("連接伺服器"+serviceURL+"下載檔案發生錯誤，錯誤訊息為:"+strErrMsg);		
	}
	//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
}*/

//可維護多個職名章END
function jf_ShowPersonDialog(argParam, argOrgNo)
{
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
	//jf_SaveCookie("nSearch",argParam);
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	
	//1040210	Kenny	[1030930]	開啟IFC020前增加寫入Cookie資訊
	//jf_SaveCookie("PrivType", document.all.PrivType.value );
	
	// 1020327   Cloud   1020113		修正由搜尋帶回帳號開啟時不會建立暫存資料夾，以及子視窗搜尋易常的bug
	//var ret= fnOpen("IFC020.aspx" + param,"480","370"); //回傳值：CN, displayName, Path
	//1051103	Kevin_C	1050087		升級二代公文系統，不再使用showModalDialog -S
	//var ret= fnOpen("IFC020.htm" + param,"480","370"); //回傳值：CN, displayName, Path
	//return ret;
	//jf_ShowModal("IFC020.htm"+param, "480","370");
	//1080816	Joe		1080628		新增開啟子視窗前轉碼
	// jf_ShowModal("IFC020.htm"+param+ "&nSearch=" + argParam + "&PrivType=" + document.all.PrivType.value, "480","370");
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFC020.htm"+param+ "&nSearch=" + encodeURIComponent(argParam) + "&PrivType=" + document.all.PrivType.value, "480","370");
	jf_ShowModal("IFC020.htm" + param + "&nSearch=" + encodeURIComponent(argParam) + "&PrivType=" + document.all.PrivType.value);
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
	//1051103	Kevin_C	1050087		升級二代公文系統，不再使用showModalDialog -E
}

function ReplaceParamStrForOrgNo(argParamStr, argOrgNo)
{
	if(argParamStr == "")
		return "";
	if(typeof(argOrgNo) == "undefined" || argOrgNo == "")
		return argParamStr;

	var ret = "";
	var bStartWithQ = argParamStr.indexOf("?") == 0;
	if(bStartWithQ)
		argParamStr = argParamStr.replace("?", "");
	if(bStartWithQ)
		ret = "?";
		
	var bHasOrgNoParam = false;
	var arrPara = argParamStr.split("&");
	for(var i=0; i<arrPara.length; i++)
	{
		var arrOnePara = arrPara[i].split("=");
		if(arrOnePara[0].toUpperCase() == "nOrgNo".toUpperCase())
		{
			arrOnePara[1] = argOrgNo;
			bHasOrgNoParam = true;
		}
		if(i != 0)
			ret += "&";
		ret += arrOnePara[0] + "=" + arrOnePara[1];
	}
	if(bHasOrgNoParam == false)
		ret += "&nOrgNo=" + argOrgNo;
	return ret;
}

function GetAllParamStr()
{
	var strParam = "";
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i = pUrl.indexOf("?");
		if(i != -1)
			strParam = pUrl.substr(i); 
	}
	return strParam;
}

function GetElement(argStr,argIdx)
{
	var SPLIT = "|";
	var ss =argStr.split(SPLIT);
   	return ss[argIdx];
}

//1051103	Kevin_C	1050087	修子視窗不使用showModalDialog
// function fnOpen(arg,argW,argH)
// {
   // var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
   // var ret = window.showModalDialog(arg, "", sFeatures);
   // return ret;
// }
//1051020	Kevin_C	1050087	升二代
function UploadCallBack(result) {
    if (result.hasError) {
        alert(result.ErrorMessage)
    }
}
//1070103	Kevin_C	1061269	預設章戳改為單選
function ChooseOne(cbViewID)
{
	var pDg1Len = document.all.dg1.rows.length + 1;
	for (i = 2; i < pDg1Len; i++)
	{
		strObjName = "dg1__ctl" + i + "_cbDefault";
		if (document.all[strObjName].disabled) continue;
		if (cbViewID != strObjName)
			document.all[strObjName].checked = false;
	}
}
//1100319  Joe 1090583 調整圖檔讀入方式，新增本函式以轉換讀入檔案為Base64URL格式
function readFile() {
    if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function () {
            jf_btLoadNew('Search',this.result);
        }
        FR.readAsDataURL(this.files[0]);
    }
}