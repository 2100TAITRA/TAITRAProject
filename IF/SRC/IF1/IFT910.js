/* DATE		SA		PRG		MGR_NO			DESC
 * 1030909	Kevin	Gabby 	1030711			IIT910修改為IFT910(V2改V3)
 * 1051109 Kevin 1050087 二代系統升級
 * 1070803	Kevin	Joe		1070678		修正弱掃Client Cookies Inspection
 * 1070830	Kevin	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
 * 1070905	Kevin	Joe		1070678		修正弱掃Client Cookies Inspection
 * 1150206	Zem		Andy	序63	    修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
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
var strTableFields = new Array("lbSEQ_NO", "lbCardID", "lbExpDate", "lbEntryDate", "lbEntryUser", "lbStatus", "lbBorrowUser");

//1051109 Kevin 1050087 二代系統升級
//if (document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if (document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
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
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051109 Kevin 1050087 二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051109 Kevin 1050087 二代系統升級
    //var xObjectName = document.activeElement.id;
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
		case "btHelp":
			Page_BlockSubmit = true;
			//1051109 Kevin 1050087 二代系統升級
			//var ret = jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			//if (ret)
			//{
			//	document.all.txName.value = ret.Name;
			//	document.all.hAccount.value = ret.Code;
			//}
			jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			break;
		case "btReadCard":
			Page_BlockSubmit = true;
			//1051109 Kevin 1050087 二代系統升級
			//if (!jf_GetCertInfo(true))
			//	return;
			//var ddlCardOption = document.all["ddlCardId"].options;
			//for (var i = 0; i < ddlCardOption.length; i++)
			//{
			//	if (ddlCardOption[i].text == checkCert)
			//	{
			//		ddlCardOption[i].selected = true;
			//	}
			//}
			fnReadCard();
			//1051109 Kevin 1050087 二代系統升級
			break;
	}
}

//1051109 Kevin 1050087 二代系統升級
function fnReadCard()
{
	var sc = new SmartCard();
	sc.getCert().then(function (rslt)
	{
		sc.reset();
		if (rslt.success)
		{
			//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
			// var checkCert = IFT910.fnCheckCertExist(rslt.cert.certb64).value;
			var checkCert = IF1.IFT910.fnCheckCertExist(rslt.cert.certb64).value;
			if (checkCert != "")
			{
				if (checkCert.indexOf("ERR-") != -1)
					alert("檢核臨時憑證時發生錯誤：" + checkCert.substring(4));
				else
				{
					var ddlCardOption = document.all["ddlCardId"].options;
					for (var i = 0; i < ddlCardOption.length; i++)
					{
						if (ddlCardOption[i].text == checkCert)
						{
							ddlCardOption[i].selected = true;
						}
					}
				}
			}
			else
			{
				alert('此卡片尚未登錄。');
			}
		}
		else if (!!rslt.errMsg)
		{
			alert(rslt.errMsg);
		}
	})
	.fail(function (rslt)
	{
		sc.reset();
		alert(rslt.errMsg);
	});
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051109 Kevin 1050087 二代系統升級
//function jf_ToolBarHandle()
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
	//1051109 Kevin 1050087 二代系統升級
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSave":

			if (jf_Trim(document.all.hAccount.value) == "")
			{
				alert("尚未選取借卡人");
				return;
			}
			Page_BlockSubmit = !jf_CheckKeyObject();
			if (Page_BlockSubmit) return;
			if (jf_Trim(document.all.ddlCardId.value) == "")
			{
				alert("尚未選取臨時卡");
				return;
			}
			//1051109 Kevin 1050087 二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all.ddlDays.selectedIndex = 2;
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
		case "btRegistCert":
			Page_BlockSubmit = true;
			//1051109 Kevin 1050087 二代系統升級
			//if (!jf_GetCertInfo())
			//	return;
			//document.all.txCardInfo.value = cert;
			//Page_BlockSubmit = false;
			//jf_SelectBarSubmit();
			fnRegistCert(xObjectName);
			//1051109 Kevin 1050087 二代系統升級
			break;
		case "btModifyStatus":
			Page_BlockSubmit = true;
			//1051109 Kevin 1050087 二代系統升級
			//var ddlIndex = 4;
			//var ddlStatus = GetSelectbarCtrl(ddlIndex);
			//if (ddlStatus == null)
			//	alert("");
			//var arrOptions = ddlStatus.getOptions();
			//if (arrOptions.value == "")
			if (ddlStatus.options[ddlStatus.selectedIndex].value == "")
			//1051109 Kevin 1050087 二代系統升級
			{
				alert("請選擇異動狀態。");
				return;
			}
			if (!fnCheckDGSelect("dg1", "_cbSelect"))
			{
				alert("至少需勾選一筆待異動憑證。");
				return;
			}
			//1051109 Kevin 1050087 二代系統升級
			//Page_BlockSubmit = !window.confirm("是否確定將勾選之憑證註記為[" + arrOptions[arrOptions.selectedIndex].text + "]");
			Page_BlockSubmit = !window.confirm("是否確定將勾選之憑證註記為[" + ddlStatus.options[ddlStatus.selectedIndex].text + "]");
		    //jf_SelectBarSubmit();
			jf_SelectBarSubmit(xObjectName);
			break;
	}
}

//1051109 Kevin 1050087 二代系統升級
function fnRegistCert(xObjectName)
{
	var sc = new SmartCard();
	sc.getCert().then(function (rslt)
	{
		sc.reset();
		if (rslt.success)
		{
			// var checkCert = IFT910.fnCheckCertExist(rslt.cert.certb64).value;
			var checkCert = IF1.IFT910.fnCheckCertExist(rslt.cert.certb64).value;
			if (checkCert != "")
			{
				if (checkCert.indexOf("ERR-") != -1)
					alert("檢核臨時憑證時發生錯誤：" + checkCert.substring(4));
				else if (!argCheckType)
					alert("本卡片已登錄為[" + checkCert + "]號臨時卡。");
			}
			else
			{
				document.all.txCardInfo.value = rslt.cert.certb64;
				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
			}
		}
		else if (!!rslt.errMsg)
		{
			alert(rslt.errMsg);
		}
	})
	.fail(function (rslt)
	{
		sc.reset();
		alert(rslt.errMsg);
	});
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
		}
		else
		{
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
	if (argCallerId == "IFC021")
	{
		//1051109 Kevin 1050087 二代系統升級
		//document.all["txName"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all.hAccount.value = document.all.lbReturnValue.options[0].value;
		document.all.txName.value = document.all.lbReturnValue.options[2].value;

		document.all["txReason"].focus();
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
//全部選取
function jf_SelectAll(argTableName, argCheckBoxName)
{
	if (document.all[argTableName] == null)
		return;

	var len = document.all[argTableName].rows.length + 1;
	for (i = 2; i < len; i++)
	{
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		if (obj.disabled == false)
			obj.checked = true;
	}
}

//反向選取
function jf_SelectInverse(argTableName, argCheckBoxName)
{
	if (document.all[argTableName] == null)
		return;

	var len = document.all[argTableName].rows.length + 1;
	for (i = 2; i < len; i++)
	{
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		if (obj.disabled == false)
		{
			if (obj.checked)
				obj.checked = false;
			else
				obj.checked = true;
		}
	}
}

//清除選取
function jf_SelectClear(argTableName, argCheckBoxName)
{
	if (document.all[argTableName] == null)
		return;

	var len = document.all[argTableName].rows.length + 1;
	for (i = 2; i < len; i++)
	{
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		if (obj.disabled == false)
			obj.checked = false;
	}
}

////把憑證檢核及取得憑證資訊的功能寫成function
//function jf_GetCertInfo(argCheckType)
//{
//	var ret = document.all.ocx.Init("");
//	if (ret == false)
//	{
//		alert("封裝元件初始化失敗,無法讀取憑證資訊");
//		return false;
//	}
//	document.all.ocx.SetUIMode(false);
//	ret = document.all.ocx.IsSmartCardAvailable(2 + 0x1000);
//	//GCA =0;
//	//MOICA =1;
//	//Temp =2;
//	//GCA	=0; 機關(副卡)憑證
//	//MOICA	=1; 個人憑證
//	//Temp	=2; 臨時憑證
//	// 0x1000 -> 允許使用臨時卡
//	if (ret == false)
//	{
//		alert("請先插入智慧卡!!");
//		Page_BlockSubmit = true;
//		return false;
//	}
//
//	ret = document.all.ocx.SetMode(4);
//	//SERVER_HSM =0;
//	//SERVER_CERTSTORE =1;
//	//CLIENT_GCA =2;
//	//CLIENT_MOICA =3;
//	//CLIENT_TEMP =4;
//	//CLIENT_CERTSTORE =5;
//	//CLIENT_JOB =6;
//	
//	cert = document.all.ocx.GetSignerBase64Cert();
//	
//	checkCert = IFT910.fnCheckCertExist(cert).value	//回傳值若不為空，且非ERR開頭時，則為卡片序號[SERIAL_ID]
//	if (checkCert != "")
//	{
//		if (checkCert.indexOf("ERR-") != -1)
//			alert("檢核臨時憑證時發生錯誤：" + checkCert.substring(4));
//		else if (!argCheckType)	//已存在，做錯誤處理
//			alert("本卡片已登錄為[" + checkCert + "]號臨時卡。");
//		if (!argCheckType)
//			return false;
//	}
//	return true;
//}

function GetSelectbarCtrl(argId)
{
	return document.all.tbSelect.getItem(argId);
	for (var i = 0; i < 20; i++)
	{
		var o = document.all.tbSelect.getItem(i);
		if (o != null)
		{
			alert(o.getAttribute("ID"));
			if (o.getAttribute("ID") == argId)
				return o;
		}
	}
	return null;
}

function fnCheckDGSelect(argTableName, argCheckBoxName)
{
	if (document.all[argTableName] == null)
		return;

	var len = document.all[argTableName].rows.length + 1;
	for (i = 2; i < len; i++)
	{
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		if (obj.disabled == false && obj.checked)
			return true;
	}
}

//開啟子視窗功能
function jf_ShowOrgDialogForPersonWithOrgNo(argOrgNo)
{
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";
	var ret = jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
	return ret;
}

function jf_ShowOrgDialogByLevel(argParam, argSelectType, argOrgNo)
{
	var sSelectType = "";
	for (var i = 0; i < argSelectType.length; i++)
	{
		if (i != 0)
			sSelectType += ",";
		//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
        // sSelectType += "'" + argSelectType[i] + "'";
        sSelectType += argSelectType[i];
	}
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--S
	// jf_SaveCookie("iic021StrctureType", argParam);
	// jf_SaveCookie("iic021SelectType", sSelectType);
	// if (argOrgNo)
		// jf_SaveCookie("iic021OrgNo", argOrgNo);
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--E

	//1051109 Kevin 1050087 二代系統升級
	//var ret= fnOpen("IFC021.htm","288","470");
	////清除Cookie
	//if(argOrgNo)
	//	jf_SaveCookie("iic021OrgNo"	, "");
	//return ret;
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	// jf_ShowModal("IFC021.htm", "288", "470");
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--S
	if (argOrgNo)
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "288", "470");
		jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo);
	else
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--E
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType, "288", "470");
		jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType);
	//1051109 Kevin 1050087 二代系統升級
}

//1051109 Kevin 1050087 二代系統升級
//function fnOpen(arg, argW, argH)
//{
//	var sFeatures = "dialogWidth: " + argW + "px;dialogHeight:" + argH + "px";
//	var ret = window.showModalDialog(arg, "", sFeatures);
//	return ret;
//}

//1051109 Kevin 1050087 二代系統升級
//function gFld(description, hreference, argIsJ, argImgOpen, argImgClosed)
//{
//	folder = new Folder(description, hreference, argIsJ, argImgOpen, argImgClosed);
//	return folder;
//}