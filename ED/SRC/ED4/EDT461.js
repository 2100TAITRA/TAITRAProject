/*
DATE	SA		PRG		MGR_NO		DESC
1120316	Kevin	Kevin	序113		新增程式
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
		/*
		case "":
			break;
		*/
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
		case "btAdd":
			Page_BlockSubmit = true;
			if (CheckBeforeAdd())
			{
				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btSearch":
			Page_BlockSubmit = false;
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeAdd()
{
	let arrDoc = [];
	let arrErrDoc = [];

	for (var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		let arrErr = [];
		let strDocNo = document.all["dg1__ctl" + i + "_hldgDocNo"].textContent;

		if (!document.all["dg1__ctl" + i + "_cbSelect"].checked)
			continue;

		let strCnt = document.all["dg1__ctl" + i + "_txdgCnt"].value;
		if (strCnt == "" && strCloseType == "0")
			arrErr.push("請輸入頁數");

		//let strCloseType = document.all["dg1__ctl" + i + "_txdgFileCnt"].value;

		arrDoc.push(strDocNo)

		if (arrErr.length > 0)
		{
			let strDocErr = "文號[" + strDocNo + "]" + arrErr.join("、");
			arrErrDoc.push(strDocErr)
		}
	}

	if (arrErrDoc.length > 0)
	{
		alert("檢核異常：\n" + arrErrDoc.join("\n"));
		return false;
	}

	if (arrDoc.length > 1)
	{
		return true;
	}
	else
	{
		alert('請勾選2筆以上公文');
		return false;
	}
}

function if_CheckComStatus()
{
	var xObjectName = event.target.id;

	var pComStatusNo = xObjectName.substring(8, xObjectName.indexOf("_cbdgComStatus"));
	var pUpdateClsCaseNo = xObjectName.substring(8, xObjectName.indexOf("_cbdgUpdateClsCase"));
	var ComStatusObj;
	var UpdateClsCaseObj;

	if (document.all["dg1__ctl" + pComStatusNo + "_cbdgComStatus"] != null)
	{
		ComStatusObj = document.all["dg1__ctl" + pComStatusNo + "_cbdgComStatus"].id;
	}
	if (document.all["dg1__ctl" + pUpdateClsCaseNo + "_cbdgUpdateClsCase"] != null)
	{
		UpdateClsCaseObj = document.all["dg1__ctl" + pUpdateClsCaseNo + "_cbdgUpdateClsCase"].id;
	}

	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}

	switch (xObjectName)
	{
		case ComStatusObj:
			Page_BlockSubmit = true;
			if (document.all["dg1__ctl" + pComStatusNo + "_cbdgComStatus"].checked)
			{
				document.all["dg1__ctl" + pComStatusNo + "_cbdgUpdateClsCase"].checked = true;
			}
			break;
		case UpdateClsCaseObj:
			Page_BlockSubmit = true;
			if (document.all["dg1__ctl" + pUpdateClsCaseNo + "_cbdgComStatus"].checked && !document.all["dg1__ctl" + pUpdateClsCaseNo + "_cbdgUpdateClsCase"].checked)
			{
				alert("併件時子文分類案次號需與母文相同");
				document.all["dg1__ctl" + pUpdateClsCaseNo + "_cbdgUpdateClsCase"].checked = true;
			}
			break;
	}
}