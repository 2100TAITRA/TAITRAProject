/*	===============================================================================
 *	Date	SA		PG		Merge	Desc
 *	===============================================================================
 *	1001129			CLOUD   1000539 新增程式
 *  1031028	Leslie  Kenny	1030836	配合SSL修改傳入元件之URL
 *  1040617	Leslie  Gabby	1040324	增加WebFileIO錯誤訊息處理
 *	1050418	Cloud	Kevin_C	1050054	新增群組類型選項及DG2紀錄群組類型為單位的資料
 *	1050729	Kevin	Kevin_C	1050087	升二代
 *	1050812 Kevin	Justin	1050700 弱掃Client Potential Code Injection修正
 *  1051019	Leslie	Joe		1050087	二代修改配合行動平台
 *  1051108 Kevin   Kenny   1051150 修改弱掃Client Potential Code Injection
 *  1070803	Kevin	Joe		1070678	修正弱掃Client Cookies Inspection
 *  1070830	Kevin	Joe		1070678	配合內政部IIS環境設定改為使用AjaxPro
 *  1070904 Kevin	Justin	1070678	弱掃修正CookieHttpOnly
 *	1080816 Kevin	Joe		1080628	修正開啟子視窗前需進行編碼
 *	1150206	Zen		Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
 *	===============================================================================
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
var strTableFields = new Array("_txUserId","_txUserName");

//1050729	Kevin_C	1050087	升二代 -S
// if(document.all.tbTool)
// {
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
// }
// if(document.all.dg1)
	// document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//1050729	Kevin_C	1050087	升二代 -E
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--S
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
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--E

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051108   Kenny   [1051150]   一併移除無用CODE
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
//	jf_CallWA(document.all.hAuthWS.value, "GetAccountName", false, null);
	//1050729	Kevin_C	1050087	升二代 -S
	//var sAuthws = document.all.authWS.value;
	//fnCallW(sAuthws, "GetAccountNameWithOrgNo", null);
	//1050729	Kevin_C	1050087	升二代 -E
	
	//0970035	Leslie	設定RadioButton的選取值
	document.all["RBGRP"].value = document.all["txRadioValue"].value;
	document.all[document.all["txRadioValue"].value].checked = "checked";
	fnRBGRP_Change(document.all[document.all["txRadioValue"].value]);
    //1050418 Kevin_C	1050054	新增群組類型RadioButton的初始值
	if (document.all["rbTypeDept"].checked == true) {
	    document.all["rbTypeDept"].checked = "checked";
	    RbTypeChange(document.all["rbTypeDept"]);
	}
	else {
	    document.all["rbTypeAcc"].checked = "checked";
	    RbTypeChange(document.all["rbTypeAcc"]);
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1050729	Kevin_C	1050087	升二代，讓CALLBACK函式知道要設定DG的哪一列
var pNo = "";
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	//1050729	Kevin_C	1050087	升二代，讓CALLBACK函式知道要設定DG的哪一列
	//var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;

	if (document.all["dg1__ctl"+pNo+"_btHelp"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrUserId = document.all["dg1__ctl" + pNo + "_txUserId"].id;
		CurrUserNm = document.all["dg1__ctl" + pNo + "_txUserName"].id;
	}
	//1050418 Kevin_C	1050054	開啟IFC021 組織人員提示視窗 -S
	var btSetting;
	pNo = xObjectName.substring(8, xObjectName.indexOf("_btSetting"));
	if (document.all["dg2__ctl"+pNo+"_btSetting"] != null)
	{
		btSetting = document.all["dg2__ctl" + pNo + "_btSetting"].id;
	}
	//1050412	Kevin_C	1050054	開啟IFC021 組織人員提示視窗 -E

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
		case btHelp:
			fnQueryUser(CurrUserId, CurrUserNm);
			break;
		case "btChange":
			Page_BlockSubmit=!CheckChange();
			//1050729	Kevin_C	1050087	升二代
			jf_ToolBarSubmit(xObjectName);
			break;
		//1050418 Kevin_C	1050054	開啟IFC021 組織人員提示視窗
		case btSetting:
			Page_BlockSubmit = true;
			//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
			// jf_SaveCookie("iic021SelectType"	, "'Unit'");
			//1050729	Kevin_C	1050087	升二代 -S
			// var ret= fnOpen("IFC021.htm","288","470");
			// if(ret!=null)
			// {
			    // var bIsSameDept = "";
			    // for (var iRow = 2; iRow < document.all.dg2.rows.length + 1; iRow++) {
			        // if (document.all["dg2__ctl" + iRow + "_txDeptNo"].value == ret.Code)
			            // bIsSameDept = (iRow - 1).toString();
			    // }
			    // if (bIsSameDept != "")
			        // alert("選取之單位，與第" + bIsSameDept + "筆重覆。");
			    // else {
			        // document.all["dg2__ctl" + pNo + "_txDeptNo"].value = ret.Code;
			        // document.all["dg2__ctl" + pNo + "_txDeptName"].value = ret.FullName;
			    // }
			// }
			//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
			// jf_ShowModal("IFC021.htm","288","470");
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//jf_ShowModal("IFC021.aspx?iic021SelectType=Unit","288","470");
			jf_ShowModal("IFC021.aspx?iic021SelectType=Unit");
			//1050729	Kevin_C	1050087	升二代 -E
			break;
		//1050729	Kevin_C	1050087	升二代
		case "btUpLoad":
			Page_BlockSubmit = true;
			if(!$('#txFilePath')[0].files[0])
			{
				alert("請選擇要匯入的檔案");
				break;
			}
			else
			{
				var strName = $('#txFilePath')[0].files[0].name.split(".");
				if(strName[strName.length-1].toLowerCase() == "csv" || strName[strName.length-1].toLowerCase() == "txt")
					Page_BlockSubmit = false;
				else
				{
					alert("請選擇附檔名為csv或txt的檔案");
					break;
				}
			}
			IsServerHandling = true;
			jf_ShowWaitState();
			fnOnUpload();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050729	Kevin_C	1050087	升二代
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

	//1050729	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName=event.target.id;

	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050729	Kevin_C	1050087	升二代
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
			//1050729	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050729	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050729	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			//Leslie	增加清除後，欄位預設值的設定	Start
			var tmpName = document.all["txPrivate"].value;
			jf_ConfirmClean(true);
			document.all["txPrivate"].value = tmpName;
			var rbName = "rbOrg";
			if(!document.all[rbName])
				rbName = "rbDept";
			document.all[rbName].checked = "checked";
			document.all["txRadioValue"].value = rbName;
			document.all["RBGRP"].value = rbName;
			fnRBGRP_Change(document.all[rbName]);
		    //1050418 Kevin_C	1050054	新增群組類型RadioButton的初始值
			document.all["rbTypeAcc"].checked = "checked";
			RbTypeChange(document.all["rbTypeAcc"]);
			//Leslie	增加清除後，欄位預設值的設定	End		
			//1050729	Kevin_C	1050087	升二代			
			//document.all["txNo"].focus();
			$('#txNo').focus();
			break;
		case "btSearch":
			//1050729	Kevin_C	1050087	升二代	
			Page_BlockSubmit = true;
			var strGrpNo = jf_Trim(document.all["txNo"].value);
			strUrl = "IFM020C1.aspx?rtnObj=lbReturnValue&argGrpNo="+strGrpNo;
			jf_OpenChildWin(strUrl, "IFM020C1", 480, 400 );
			break;
		//1050729	Kevin_C	1050087	升二代	
		// case "btUpLoad":	//add by Leslie	0970035	匯入功能鍵
			// if(document.all["BF"].ShowDialog(0) !="")
			// {
				// fnOnUpload();
			// }
			// else
				// Page_BlockSubmit = true;
			//jf_ToolBarSubmit();
			// break;
		case "btDownLoad":	//add by Leslie 0970035下載範本檔
			Page_BlockSubmit = false;
			//1050729	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			IsServerHandling =false;
			for(var i=0;i<document.all.length;i++)
			{		
				document.all[i].style.cursor = "";
			}
	
			for(var i=0;i<document.all.tags("input").length;i++)
			{
				if(document.all.tags("input")[i].type == "text")
					document.all.tags("input")[i].readOnly = false;
			}
			if(document.all["txPrivate"])
				document.all["txPrivate"].readOnly = true;
			window.status = "";
			break;
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			//1050418 Kevin_C	1050054	讓DataGrid ToolBar可用於DG2
		    if (document.all["rbTypeDept"].checked == true) {
		        jf_SelectAll("dg2", "_cbSelect");
		        break;
		    }
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			//1050418 Kevin_C	1050054	讓DataGrid ToolBar可用於DG2
		    if (document.all["rbTypeDept"].checked == true) {
		        jf_SelectInverse("dg2", "_cbSelect");
		        break;
		    }
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			//1050418 Kevin_C	1050054	讓DataGrid ToolBar可用於DG2
		    if (document.all["rbTypeDept"].checked == true) {
		        jf_SelectClear("dg2", "_cbSelect");
		        break;
		    }
			jf_SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteSelected":
			//1050418 Kevin_C	1050054	讓DataGrid ToolBar可用於DG2
	        if (document.all["rbTypeDept"].checked == true) {
	            Page_BlockSubmit = !jf_DeleteSelected("dg2", "_cbSelect", new Array("_txDeptName", "_txDeptNo"));
	            break;
	        }
			Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
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
		//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
		// if(IFM020.CheckDataExist(jf_Trim(document.all["txNo"].value)).value)
		if(IF1.IFM020.CheckDataExist(jf_Trim(document.all["txNo"].value)).value)
		{
			if ( window.confirm("此群組已存在，是否覆蓋就有資料"))//提醒是否覆蓋存檔
				bRtnbool = true;
			else
				bRtnbool = false;
		}
		else
			bRtnbool = true;
	}
	else
		bRtnbool = false;

	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";

	if (jf_Trim(document.all["txNo"].value) == "")
	{
		strErrMsg += "群組編號欄位不可空白";
		//1050729	Kevin_C	1050087	升二代
		//document.all["txNo"].focus();
		$('#txNo').focus();
	}
	if (jf_Trim(document.all["txName"].value) == "")
	{
		if (strErrMsg != "") strErrMsg += "\n";
		strErrMsg += "群組名稱欄位不可空白";
		//1050729	Kevin_C	1050087	升二代
		//document.all["txName"].focus();
		$('#txName').focus();
	}

	//1050418 Kevin_C	1050054	新增DG2檢核
	if (document.all["rbTypeDept"].checked == true) {
	    var bIsBlank = true;
	    for (var iRow = 2; iRow < document.all.dg2.rows.length + 1; iRow++) {
	        if (document.all["dg2__ctl" + iRow + "_txDeptName"].value != "")
	            bIsBlank = false;
	    }
	    if(bIsBlank)
	    {
	        if (strErrMsg != "") strErrMsg += "\n";
	        strErrMsg += "至少要有一個單位";
			//1050729	Kevin_C	1050087	升二代
	        //document.all["dg2__ctl2_txDeptName"].focus();
			$('#dg2__ctl2_txDeptName').focus();
	    }
	}
	else
	if (!jf_CheckBlankAndAlert()) {
	    if (strErrMsg != "") strErrMsg += "\n";
	    strErrMsg += "至少要有一個使用者";
		//1050729	Kevin_C	1050087	升二代
	    //document.all["dg1__ctl2_txUserId"].focus();
		$('#dg1__ctl2_txUserId').focus();
	}
	if(document.all["ddlDept"].value == "" && document.all["txRadioValue"].value == "rbDept")
	{
		if (strErrMsg != "") strErrMsg += "\n";
		strErrMsg += "群組層級為\"單位\"時，所屬單位不可空白";
		//1050729	Kevin_C	1050087	升二代
		//document.all["ddlDept"].focus();	
		$('#ddlDept').focus();
	}
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		alert(strErrMsg);
	}
	
	if(!jf_CheckBlankAndAlert1())
		//bRtnbool = false;
		return false;

	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_txUserName"].value != "")
			return true;
	}
	return false;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert1()
{
	var InValidName = "";
	//var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		for (var j = 2; j <= document.all.dg1.rows.length; j++)
		{
			if(document.all["dg1__ctl" + i + "_txUserId"].value == document.all["dg1__ctl" + j + "_txUserId"].value && i != j && jf_Trim(document.all["dg1__ctl" + i + "_txUserId"].value) != "" && jf_Trim(document.all["dg1__ctl" + j + "_txUserId"].value) != "")
			{					
				//if(InValidName != "")
				//{
				//	InValidName = InValidName.substr(1,InValidName.length);
					alert("序"+(i-1)+"與序"+(j-1)+"值重覆");	
					//1050729	Kevin_C	1050087	升二代					
					//document.all["dg1__ctl" + i + "_txUserId"].focus();
					$('#dg1__ctl' + i + '_txUserId').focus();
					return false;
				//}
			}
		}
		//add by Leslie	儲存時提示使用者錯誤的帳號資料
		if(!CheckAccountWithOrgNo("dg1__ctl"+i+"_txUserId","dg1__ctl"+i+"_txUserName"))
		{
			alert("使用者[" + document.all["dg1__ctl" + i + "_txUserId"].value + "]的資料錯誤。");
			return false;
		}
	}
	return true;
}

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
	if(argCallerId == "IFM020C1")
	{
		document.all["txNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	}
	//1050729	Kevin_C	1050087	升二代 -S
	else if(argCallerId == "IFC020")
	{
		if(document.all.lbReturnValue.options[0])
		{
			document.all[strUserId].value = GetElement(document.all.lbReturnValue.options[0].value, 0);
			document.all[strUserName].value = GetElement(document.all.lbReturnValue.options[0].value, 1);
		}
	}
	else if(argCallerId == "IFC021")
	{
		var bIsSameDept = "";
		for (var iRow = 2; iRow < document.all.dg2.rows.length + 1; iRow++) {
			if (document.all["dg2__ctl" + iRow + "_txDeptNo"].value == document.all.lbReturnValue.options[8].value)
				bIsSameDept = (iRow - 1).toString();
		}
		if (bIsSameDept != "")
			alert("選取之單位，與第" + bIsSameDept + "筆重覆。");
		else {
			document.all["dg2__ctl" + pNo + "_txDeptNo"].value = document.all.lbReturnValue.options[8].value;
			document.all["dg2__ctl" + pNo + "_txDeptName"].value = document.all.lbReturnValue.options[9].value;
		}
	}
	//1050729	Kevin_C	1050087	升二代 -E

	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckChange()
{
	if (document.all["txCnt"].value == "")
	{
		//1050729	Kevin_C	1050087	升二代
		//document.all["txCnt"].focus();
		$('#txCnt').focus();
		alert("請輸入調整筆數");
		return false;
	}
	var iCnt = document.all["txCnt"].value;
	//1050418 Kevin_C	1050054	若群組類型選擇單位，檢核DG2
	if (document.all["rbTypeDept"].checked == true)
	{
		if (iCnt < document.all.dg2.rows.length)
	{
		//1050729	Kevin_C	1050087	升二代
		//document.all["txCnt"].focus();
		$('#txCnt').focus();
		alert("請輸入大於現有筆數的數字");
		return false;
	}
	}
	else
	if (iCnt < document.all.dg1.rows.length)
	{
		//1050729	Kevin_C	1050087	升二代
		//document.all["txCnt"].focus();
		$('#txCnt').focus();
		alert("請輸入大於現有筆數的數字");
		return false;
	}
	return true;
}

function txUserId_onblur()
{
	var xObjectName = event.srcElement.id;
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_txUserId"));
	if(!CheckAccountWithOrgNo("dg1__ctl"+pNo+"_txUserId","dg1__ctl"+pNo+"_txUserName"))
	//1050729	Kevin_C	1050087	升二代
	//{alert("帳號不存在，請重新輸入。");document.all["dg1__ctl"+pNo+"_txUserId"].focus();}
	{alert("帳號不存在，請重新輸入。");$('#dg1__ctl'+pNo+'_txUserId').focus();}
}

//0970035	Leslie	處理上傳檔案函式
function fnOnUpload()
{
		//1050729	Kevin_C	1050087	升二代 -S
		//var strFullFileName = document.all["BF"].Path;
		//var strFileName = jf_Trim(strFullFileName.substr(strFullFileName.lastIndexOf('\\')+1));
		//1050729	Kevin_C	1050087	升二代 -E
		var FileIOWS = document.all["htxFileIOWS"].value;
		var strWorkPath = document.all["htxWorkPath"].value;
		//1050729	Kevin_C	1050087	升二代 -S
		// strFullFileName = strFullFileName.substr(0,strFullFileName.lastIndexOf('\\')+1);
		// strFullFileName = strFullFileName.replace(/\\/g,"\\\\");
		//var subFileName = strFileName.substr(strFileName.lastIndexOf('.')+1).toUpperCase();
		
		// if( subFileName != "TXT" && subFileName != "CSV")
		// {
			// alert("您所選取之檔案格式不正確！僅可匯入純文字檔(*.TXT或*.CSV)。");
			// Page_BlockSubmit = true;
			// return;
		// }
		var strFullFileName = $('#txFilePath')[0].files;
		//1050729	Kevin_C	1050087	升二代 -E
		
		//1050729	Kevin_C	1050087	升二代
		//var soap = new ActiveXObject("WSWrapper.WebFileIO");	
		//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
		if ( document.all.II_USE_SSL != null )
		{
			if ( document.all.II_USE_SSL.value == "Y" )
				FileIOWS = FileIOWS.replace("http://", "https://") ;
		}
		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
		//1050729	Kevin_C	1050087	升二代 -S
		// try
		// {
			// soap.Init(FileIOWS);
			// soap.AddFile(strWorkPath,strFileName,strFullFileName);//AddFile(上傳後存檔路徑,上傳的檔案的檔名,上傳檔案的所在路徑)
			////0980922 多取得權杖,並於呼叫WebFileIO元件時傳入,以便WebFileIO處進行使用者身份判斷[0980455]-Jane
			// var strArtifact = document.all.SsoArtifact.value;
			////soap.Upload("",true);
			// soap.Upload(strArtifact,true);
			// document.all.txFileFullName.value = strWorkPath+strFileName; //紀錄上傳後的檔案路徑
		////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
		// }
		// catch(e)
		// {
			// var strErrMsg = e.message;		
			// if (soap.hasError)
				// strErrMsg += soap.ErrorMessage;
			// alert("連接伺服器"+FileIOWS+"上傳檔案至AP伺服器失敗，錯誤訊息為:"+strErrMsg);		
		// }
		var strArtifact = document.all.SsoArtifact.value;
		var ioWS = new WebFileIO(FileIOWS, strArtifact);
		ioWS.upload(strWorkPath, strFullFileName, UploadCallBack);
		document.all.txFileFullName.value = strWorkPath+strFullFileName[0].name;
		//1050729	Kevin_C	1050087	升二代 -E
		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
}
//1050729	Kevin_C	1050087	升二代
function UploadCallBack(result) {
    if (result.hasError) {
        alert(result.ErrorMessage)
    }
}
//0970035	Leslie	處理畫面Event
function fnRBGRP_Change(argObj)
{
	document.all["txRadioValue"].value = argObj.id;
	var DeptCss;
	var PrivateCss;
	if(argObj.id == "rbDept")
	{
		DeptCss = "";
		//1050729	Kevin_C	1050087	升二代
		//PrivateCss = "Hide"	
		PrivateCss = "hide";
	}
	else if(argObj.id == "rbPrivate")
	{
		//1050729	Kevin_C	1050087	升二代
		//DeptCss = "Hide";
		DeptCss = "hide";
		PrivateCss = "DisplayOnly"	
	}
	else
	{
		//1050729	Kevin_C	1050087	升二代 -S
		//DeptCss = "Hide";
		//PrivateCss = "Hide"	
		DeptCss = "hide";
		PrivateCss = "hide";
		//1050729	Kevin_C	1050087	升二代 -E
	}
	trDept.className = DeptCss;
	if(document.all["txPrivate"])
	{
		document.all["txPrivate"].className = PrivateCss;
	}
}
//1050418 Kevin_C	1050054	切換顯示DG
function RbTypeChange(argObj) {
    if (argObj.id == "rbTypeDept") {
		//1050729	Kevin_C	1050087	升二代
        //document.all.trDg1.className = "Hide";
		document.all.trDg1.className = "hide";
        document.all.trDg2.className = "";
    }
    else if (argObj.id == "rbTypeAcc") {
        document.all.trDg1.className = "";
		//1050729	Kevin_C	1050087	升二代
        //document.all.trDg2.className = "Hide";
		document.all.trDg2.className = "hide";
    }
	//1050729	Kevin_C	1050087	升二代，避免DG2的上層GRIDDIV高度為0
	$(window).resize();
}

//開啟人員帳號子視窗
//1050729	Kevin_C	1050087	升二代，CALLBACK用 -S
var strUserId = "";
var strUserName = "";
//1050729	Kevin_C	1050087	升二代，CALLBACK用 -E
function fnQueryUser(argUserId_ID, argUserName_ID)
{
	Page_BlockSubmit = true;
	//1050729	Kevin_C	1050087	升二代 -S
	// var ret = jf_ShowPersonDialog("");
	// if(ret)
	// {
		////回傳格式=代碼,名稱,DN
		// document.all[argUserId_ID].value = GetElement(ret, 0);
		// document.all[argUserName_ID].value = GetElement(ret, 1);
	// }
	strUserId = argUserId_ID;
	strUserName = argUserName_ID;
	jf_ShowPersonDialog("");
	//1050729	Kevin_C	1050087	升二代 -E
}

/********** 以下為DataGrid ToolBar處理區 **********/
var i,j;

//全部選取
function jf_SelectAll(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
	
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
			obj.checked = true;	
	}
}

//反向選取
function jf_SelectInverse(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
		
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
		{
			if(obj.checked)
				obj.checked = false;
			else
				obj.checked = true;
		}
	}
}

//清除選取
function jf_SelectClear(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
		
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
			obj.checked = false;
	}
}

//刪除選取
function jf_DeleteSelected(argTableName, argCheckBoxName, argTableFields)
{
	if(document.all[argTableName] == null)
		return;
		
	var nChecked = 0;
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.checked)
		{
			obj.checked = false;
			var len2 = argTableFields.length;
			for(j = 0; j < len2; j++)
			{
				var tmpObj = document.all[argTableName+"__ctl"+ i + argTableFields[j]];
				if(tmpObj.type == "text") //TextBox
				{
					tmpObj.value = "";
				}
				else if(tmpObj.type == "textarea") //TextArea
				{
					tmpObj.value = "";
				}
				else if(tmpObj.type == "checkbox") //CheckBox
				{
					tmpObj.checked = false;
				}
				else if(tmpObj.type == "radio") //RadioButton
				{
					tmpObj.checked = false;
				}
				else if(tmpObj.type == "select-one") //DropDownList
				{
					tmpObj.selectedIndex = 0;
				}
				else if(tmpObj.nodeName == "SPAN") //Label
				{
					//1050729	Kevin_C	1050087	升二代
					//tmpObj.innerText = "";
					tmpObj.textContent = "";
				}
			}
			nChecked = 1;
		}
	}
	
	if(nChecked == 0)
		return false
	else
		return true
}
//1050729	Kevin_C	1050087	升二代 -S
// function fnCallW(argWS, argFuncName, argParam)
// {
	// var callObj = new Object();
	// callObj.funcName = argFuncName;      // Name of the remote function.
	// callObj.async = false;         // A Boolean that specifies the type of call
	// callObj.timeout = 20;         // Timeout value for the method call (seconds)
	////SOAP header information
	// callObj.SOAPHeader = "<SOAP-ENV:Header>";
	// callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
	// callObj.SOAPHeader += 5;
	// callObj.SOAPHeader += "</t:Transaction>";  
	// callObj.SOAPHeader += "</SOAP-ENV:Header>";  

	// service.useService(argWS + "?WSDL", "Serv");
	
	// if(argParam == null || argParam.length == 0)
		// return service.Serv.callService(callObj, argParam);
	// else
	// {
		// var s = "service.Serv.callService(callObj ";
		// for(var i=0; i<argParam.length; i++)
			// s += ", argParam[" + i + "]";
		// s += ");";
		// callID = eval(s);
	// }
	// return callID;
// }
//1050729	Kevin_C	1050087	升二代 -E
function CheckAccountWithOrgNo(argCodeId, argNameId)
{
	var oCode = document.all[argCodeId];
	var oName = document.all[argNameId];
	var oOrgNo = document.all["txActiveOrgNo"];
	oCode.value = jf_Trim(oCode.value);

	if (oCode.value == "")
	{
		oName.value = "";
		return true;
	}
	
    //1051108   Kenny   [1051150]   修改Client Potential Code Injection
	//var sAuthws = document.all.authWS.value;
    var sAuthws = encodeURI(document.all.authWS.value);
	//1050729	Kevin_C	1050087	升二代 -S
	// var argWSParam = new Array(2);
	// argWSParam[0] = document.all.SsoArtifact.value;
	// argWSParam[1] = oCode.value;
	// argWSParam[2] = oOrgNo.value;
	// var CallWsObj = fnCallW(sAuthws, "GetAccountNameWithOrgNo", argWSParam);
	var argWSParam = new Array(1);
	/*1050812 Justin 1050700 弱掃Client Potential Code Injection修正
	argWSParam[0] = oCode.value;
	argWSParam[1] = oOrgNo.value;*/
	argWSParam[0] = encodeURI(oCode.value);
	argWSParam[1] = encodeURI(oOrgNo.value);
	var CallWsObj = jf_CallWS(sAuthws, "GetAccountNameWithOrgNo", false, argWSParam);
	//1050729	Kevin_C	1050087	升二代 -E

	if(!CallWsObj.error && CallWsObj.value && CallWsObj.value != "")
	{
		if(oName.tagName.toUpperCase() == "INPUT")
			oName.value = jf_Trim(CallWsObj.value);
		else if(oName.tagName.toUpperCase() == "SPAN")
			//1050729	Kevin_C	1050087	升二代
			//oName.innerText = jf_Trim(CallWsObj.value);
			oName.textContent = jf_Trim(CallWsObj.value);
		else
			oName.value = jf_Trim(CallWsObj.value);
		return true;
	}
	else
	{
		//alert("找不到使用者[" + oCode.value + "]的資料，請重新輸入。");
		//oCode.focus();
		if(oName.tagName.toUpperCase() == "INPUT")
			oName.value = "";
		else if(oName.tagName.toUpperCase() == "SPAN")
			//1050729	Kevin_C	1050087	升二代
			//oName.innerText = "";
			oName.textContent = "";
		else
			oName.value = "";
		return false;
	}
}
function jf_ShowPersonDialog(argParam, argOrgNo)
{
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly
	//jf_SaveCookie("nSearch",argParam);
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	//1050729	Kevin_C	1050087	升二代 -S
	//var ret= fnOpen("IFC020.htm" + param,"480","370"); //回傳值：CN, displayName, Path
	//return ret;
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly
	//jf_ShowModal("IFC020.htm" + param,"480","370")
	//1080816	Joe		1080628		新增開啟子視窗前轉碼
	// jf_ShowModal("IFC020.htm" + param + "&nSearch=" +argParam,"480","370")
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFC020.htm" + param + "&nSearch=" +encodeURIComponent(argParam),"480","370")
	jf_ShowModal("IFC020.htm" + param + "&nSearch=" + encodeURIComponent(argParam))
	//1050729	Kevin_C	1050087	升二代 -E
}

/*function fnOpen(arg,argW,argH)
{
   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
   var ret = window.showModalDialog(arg, "", sFeatures);
   return ret;
}*/

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

