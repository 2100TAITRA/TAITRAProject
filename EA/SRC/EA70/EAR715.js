 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1090408      Kevin_C	1090035 新增程式
 * 1130514      Jason   1130244 交通部新增EXCEL
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//避免PostBack後，人員選單被清空
	akjf_DeptCheck2('dlDept', 'dlUser');
	if (document.all["empUserId"].value != "")
	{
		for (var i = 0; i < dlUser.options.length; i++)
		{
			var strUserName = dlUser.options[i].value;
			if (strUserName != "")
				strUserName = strUserName.split(":")[2];
			if (strUserName == document.all["empUserId"].value)
				document.all.dlUser.selectedIndex = i;
		}
	}
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
		case "btHelpS":
			strClickBtn = "btHelpS";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAT361&MODE=1&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txFileYearS.value) + "&FILE_CLS=" + jf_Trim(document.all.txClsNoS.value) + "&SAMLart=" + document.all.SsoArtifact.value;
			jf_OpenChildWin(strUrl, "EAC005", 750, 550);
			Page_BlockSubmit = true;
			break;
		case "btHelpS2":
			strClickBtn = "btHelpS2";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAT361&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txFileYearS.value) + "&FILE_CLS=" + jf_Trim(document.all.txClsNoS.value) + "&FILE_CASE=" + jf_Trim(document.all.txCaseNoS.value) + "&SAMLart=" + document.all.SsoArtifact.value;
			jf_OpenChildWin(strUrl, "EAC005", 750, 550);
			Page_BlockSubmit = true;
			break;
		case "btHelpE":
			strClickBtn = "btHelpE";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAT361&MODE=1&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txFileYearE.value) + "&FILE_CLS=" + jf_Trim(document.all.txClsNoE.value) + "&SAMLart=" + document.all.SsoArtifact.value;
			jf_OpenChildWin(strUrl, "EAC005", 750, 550);
			Page_BlockSubmit = true;
			break;
		case "btHelpE2":
			strClickBtn = "btHelpE2";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAT361&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txFileYearE.value) + "&FILE_CLS=" + jf_Trim(document.all.txClsNoE.value) + "&FILE_CASE=" + jf_Trim(document.all.txCaseNoE.value) + "&SAMLart=" + document.all.SsoArtifact.value;
			jf_OpenChildWin(strUrl, "EAC005", 750, 550);
			Page_BlockSubmit = true;
			break;
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
		
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			$('#txRmvSecDateS').focus();
			//清除後預設勾選之值			
			document.all["rbFileNo"].checked = true;	
			break;
		case "btPreview":
		case "btODS":
		//1130514      Jason   1130244 交通部新增EXCEL
		case "btExcel":
			if (document.all.txRmvSecDateS.value == "" && document.all.txRmvSecDateE.value == "")
			{
				Page_BlockSubmit=true;
				alert("執行降解密日期不可為空");
			}
			else
				Page_BlockSubmit = false;
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
	if (argCallerId == "EAC005")
	{
		if (document.all.lbReturnValue.length > 0)
		{
			if (strClickBtn == "btHelpS")
			{
				document.all.txClsNoS.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyS.value = document.all.lbReturnValue.options[4].value;

			}
			else if (strClickBtn == "btHelpS2")
			{
				document.all.txFileYearS.value = document.all.lbReturnValue.options[0].value;
				document.all.txClsNoS.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyS.value = document.all.lbReturnValue.options[4].value;
				document.all.txCaseNoS.value = document.all.lbReturnValue.options[2].value;

			}
			else if (strClickBtn == "btHelpE")
			{
				document.all.txClsNoE.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyE.value = document.all.lbReturnValue.options[4].value;

			}
			else if (strClickBtn == "btHelpE2")
			{
				document.all.txFileYearE.value = document.all.lbReturnValue.options[0].value;
				document.all.txClsNoE.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyE.value = document.all.lbReturnValue.options[4].value;
				document.all.txCaseNoE.value = document.all.lbReturnValue.options[2].value;
			}
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
//紀錄Client端所選擇之UserID
function jf_dlUserChange()
{
	var empUserInfo = document.all["dlUser"].options[document.all["dlUser"].selectedIndex].value;
	if (empUserInfo == "")
	{
		document.all["empUserId"].value = "";
		return;
	}
	var tempstr = empUserInfo.split(":");
	document.all["empUserId"].value = tempstr[2];
}
//檢核日期格式
function CheckDate(argId, argText)
{
	document.all[argId].value = jf_Trim(document.all[argId].value);
	if (document.all[argId].value != "")
	{
		document.all[argId].value = jf_PADL(document.all[argId].value, 7, "0");
		if (!jf_CheckCDATE(document.all[argId].value))
		{
			alert(argText + '格式不正確');
			$('#' + argId).focus();
			return false;
		}
	}
	return true;
}
function ClearUser()
{
	if(document.all.dlDept.selectedIndex == 0)
	{
		document.all["empUserId"].value = "";
		var UserObj = document.all["dlUser"];
		len = UserObj.length;
		for (i = 0 ; i < len ; i++)
			UserObj.remove(0);
	}
}