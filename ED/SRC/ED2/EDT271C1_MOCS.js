/*
DATE	SA		PRG		MGR_NO		DESC
1111130	David	David	1110881		新增程式
1120417	David	David	-------		(銓敘部問題彙整表序236(現場序105))新增判斷核決者選項是不需異動、取消核決還是設定核決者
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

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
function ClientButtonControl(e)
{
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
		/*case "":
			Page_BlockSubmit = true;
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
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

	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit = true;
			if(fnCheckBrforeReturn())
			{
				ReturnValue();
				window.close();
			}
			break;
		case "btCancel":
			Page_BlockSubmit = true;
			window.close();
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
//組出回傳值
function ReturnValue()
{
	try
	{
		let strIssueType = "";
		if($("#rbOrg")[0].checked)
			strIssueType = "1";
		else if($("#rbUnit")[0].checked)
			strIssueType = "2";
		else if($("#rbSave")[0].checked)
			strIssueType = "3";

		let strStoreType = "";
		if($("#rbOrgStore")[0].checked)
			strStoreType = "1";
		else if($("#rbUnitStore")[0].checked)
			strStoreType = "2";

		let strFileCnt = "";
		let strFileUnit = "";
		if($("#txFileCnt").val() != "")
		{
			strFileCnt = $("#txFileCnt").val();
			strFileUnit = jf_Trim($("#dlFileUnit option:selected").val());
		}

		let strFullApprovedTime = "";
		//有核決者時一併回傳核決時間，並補足13碼
		if($("#txAppRoleId").val() != "")
			strFullApprovedTime = $("#txAppDate").val() + $("#txAppTime").val() + "59";

		//1120417 David 新增判斷是不需異動、取消核決還是設定核決者
		let strAppSelectType = $("#txAppSelectType").val();
		//if(strIssueType == "" && strStoreType == "" && strFileCnt == "" && $("#txAppRoleId").val() == "")
		if(strIssueType == "" && strStoreType == "" && strFileCnt == "" && $("#txAppRoleId").val() == "" && strAppSelectType == "0")
		{
			if (window.confirm("未設定任何資料，請問是否取消？"))
				window.close();
		}
		else
		{
			opener.document.all.lbReturnValue.length = 9;
			opener.document.all.lbReturnValue.options[0].value = $("#txAppUserId").val();
			opener.document.all.lbReturnValue.options[1].value = $("#txAppRoleId").val();
			opener.document.all.lbReturnValue.options[2].value = $("#txAppName").val();
			opener.document.all.lbReturnValue.options[3].value = strFullApprovedTime;
			opener.document.all.lbReturnValue.options[4].value = strIssueType;
			opener.document.all.lbReturnValue.options[5].value = strStoreType;
			opener.document.all.lbReturnValue.options[6].value = strFileCnt;
			opener.document.all.lbReturnValue.options[7].value = strFileUnit;
			//1120417 David 新增判斷是不需異動、取消核決還是設定核決者
			opener.document.all.lbReturnValue.options[8].value = strAppSelectType;

			opener.window.CallBack("EDT271C1");
			window.close();
		}
	}
	catch (e) {}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function fnApplyDDLChange()
{
	var appText = jf_Trim($("#ddlApply option:selected").text());
	var appVal = jf_Trim($("#ddlApply option:selected").val());

	var appAcc = "";
	var appRole	= "";
	var appName	= "";

	//1120417 David 新增判斷是不需異動、取消核決還是設定核決者
	if(appVal == "")
		$("#txAppSelectType").val("0");
	else if(appVal == "取消核決")
	{
		$("#txAppSelectType").val("1");
	}
	else
	{
		$("#txAppSelectType").val("2");
		if ($('#ApproveType').val() == "ROLE")
		{
			appAcc 	= "";
			appRole	= GetSplitStr(appVal, "|", 1);
			appName	= appText;
		}
		else if ($('#ApproveType').val() == "ALL")
		{
			appAcc 	= GetSplitStr(appVal, "|", 0);
			appRole	= GetSplitStr(appVal, "|", 1);
			appName	= GetSplitStr(appText, "-", 1);
		}
		else
		{
			appAcc 	= GetSplitStr(appVal, "|", 0);
			appRole	= GetSplitStr(appVal, "|", 1);
			appName	= appText;
		}
	}

	$("#txAppUserId").val(appAcc);
	$("#txAppRoleId").val(appRole);
	$("#txAppName").val(appName);
}

function GetSplitStr(argStr,argSep,argIdx)
{
	var rg_szItems = argStr.split(argSep);
	if(argIdx < rg_szItems.length)
		return rg_szItems[argIdx];
	return ""; 
}

var bDateCheck = false;
function CheckCDATE(argObj, strMsg) {
	if (bDateCheck) {
		bDateCheck = false;
		return;
	}
	bDateCheck = true;
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 7) {
			strDate = jf_PADL(strDate, 7, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate)) {
			$('#' + argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			bDateCheck = false;
			return false;
		}
	}
	bDateCheck = false;
	return true;
}

//檢核時間格式
var bTimeCheck = false;
function CheckCTime(argObj, strMsg) {
	if (bTimeCheck) {
		bTimeCheck = false;
		return;
	}
	bTimeCheck = true;
	var strTime = document.all[argObj].value;
	if (strTime != "") {
		if (strTime.length < 4) {
			strTime = jf_PADL(strTime, 4, '0');
			document.all[argObj].value = strTime;
		}
		var strH = strTime.substr(0, 2);
		var strM = strTime.substr(2, 2);
		if ((strH == "24" && strM != "00") || ((strH != "24" && strH > 23) || strM > 59)) {
			$('#' + argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			bTimeCheck = false;
			return false;
		}
	}
	bTimeCheck = false;
	return true;
}

function fnCheckBrforeReturn()
{
	if($("#txAppRoleId").val() != "")
	{
		if($("#txAppDate").val() == "" || $("#txAppDate").val() == "")
		{
			alert("設定核決者時，核決時間欄位不可為空");
			return false;
		}
	}
	return true;
}