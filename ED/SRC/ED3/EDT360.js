/* DATE		SA		PRG		MGR_NO			DESC
 * 1060109	David	Kevin_C	1051234			新增程式
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
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//程式開啟時錯誤訊息
	if (document.all.ClientStartErr && document.all.ClientStartErr.value != "") {
		alert(document.all.ClientStartErr.value);
		document.all.ClientStartErr.value = "";
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
	var strRow = "";
	if (xObjectName.indexOf("__ctl") != -1)
	{
		var strTemp = xObjectName.split("__ctl")[1];
		xObjectName = strTemp.split("_")[1];
		strRow = strTemp.split("_")[0];
	}
	switch (xObjectName)
	{
		//DG預覽
		case "btPreview":
			Page_BlockSubmit = true;
			//1091211	Joe		1090891		修正路徑不經過Client端
			// var arrRtn = ED3.EDT360.btPrview(document.all.SsoArtifact.value, document.all["H_txWebService"].value, document.all["dg1__ctl" + strRow + "_H_IssueNo"].innerText, document.all["dg1__ctl" + strRow + "_H_PdfDir"].innerText, document.all["H_TempPath"].value);
			var arrRtn = ED3.EDT360.btPrview(document.all.SsoArtifact.value, document.all["H_txWebService"].value, document.all["dg1__ctl" + strRow + "_H_IssueNo"].innerText, document.all["dg1__ctl" + strRow + "_H_PdfDir"].innerText, document.all["H_OrgNo"].value);
			if (arrRtn.value[1] != "")
			{
				alert("預覽失敗:" + arrRtn.value[1]);
			}
			else if (arrRtn.value[0] != "")
			{
				openDlg(arrRtn.value[0], "0", "PortableDocFormat");
			}
			else
				alert("預覽失敗:當案路徑為空值");
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
		case "btSearch":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSend":
			if (document.all.dg1.className != "")
			{
				Page_BlockSubmit = true;
				alert("請先進行查詢並勾選欲寄送資料");
			}
			else
			{
				var bIsCheck = false;
				for (var i = 2; i <= document.all.dg1.rows.length; i++)
				{
					if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
					{
						bIsCheck = true;
						break;
					}
				}
				if (bIsCheck)
					Page_BlockSubmit = false;
				else
				{
					Page_BlockSubmit = true;
					alert("請至少勾選一筆欲寄送資料");
				}
			}
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btReGenPdf":
			if (document.all.dg1.className != "") {
				Page_BlockSubmit = true;
				alert("請先進行查詢並勾選欲重新轉出的資料");
			}
			else {
				var bIsCheck = false;
				for (var i = 2; i <= document.all.dg1.rows.length; i++) {
					if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
						bIsCheck = true;
						break;
					}
				}
				if (bIsCheck)
					Page_BlockSubmit = false;
				else {
					Page_BlockSubmit = true;
					alert("請至少勾選一筆欲重新轉出的資料");
				}
			}
			jf_ToolBarSubmit(xObjectName);
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
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢核日期格式
var bHasCheck = false;
function CheckDate(argObj)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return true;
	}
	bHasCheck = true;
	argObj.value = jf_Trim(argObj.value);
	if (argObj.value != "")
	{
		argObj.value = jf_PADL(argObj.value,7,"0");	
		if (!jf_CheckCDATE(argObj.value))
		{
			alert('辦理日期格式不正確');
			$('#'+argObj.id).focus();
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}