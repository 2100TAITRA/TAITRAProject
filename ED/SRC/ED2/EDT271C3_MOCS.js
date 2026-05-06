/*
DATE	SA		PRG		MGR_NO		DESC
1120407	David	David	-------		(銓敘部問題彙整表序207(需求序2))新增程式
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
		case "btSet":
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
		let strDeptNo = $("#ddlDept option:selected").val();
		let strDeptName = $("#ddlDept option:selected").text();
		let strTxName = "順會";
		if(strDeptNo.indexOf('9') == 0)//9開頭單位為一層決行，設定異動別為送請簽核
			strTxName = "送請簽核";

		opener.document.all.lbReturnValue.length = 3;
		opener.document.all.lbReturnValue.options[0].value = strDeptNo;
		opener.document.all.lbReturnValue.options[1].value = strDeptName;
		opener.document.all.lbReturnValue.options[2].value = strTxName;

		opener.window.CallBack("EDT271C3");
		window.close();
	}
	catch (e) {}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function fnCheckBrforeReturn()
{
	if($("#ddlDept")[0].selectedIndex == 0)
	{
		alert("請選擇傳送單位");
		return false;
	}
	return true;
}