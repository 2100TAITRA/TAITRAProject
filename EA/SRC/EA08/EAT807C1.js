/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			SA	 	修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1060427		Cloud	Kevin_C	1050784	新增程式
 * 1100204      Leslie  Zen     1090927 取消使用document.activeElement
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
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100204 Zen 1090927 取消使用document.activeElement//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;

	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
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
	
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			if (document.all["txClsNo"].value == "" && document.getElementById("dlUseDept").options[document.getElementById("dlUseDept").selectedIndex].value == "")
			{
				alert("至少需輸入一項條件");
				$('#txClsNo').focus();
				Page_BlockSubmit = true;
			}
			else
			{
				Page_BlockSubmit = false;
			}
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if (document.all["txClsNo"].value == "" && document.getElementById("dlUseDept").options[document.getElementById("dlUseDept").selectedIndex].value == "")
			{
				alert("至少需輸入一項條件");
				$('#txClsNo').focus();
				Page_BlockSubmit = true;
			}
			else {
				Page_BlockSubmit = false;
			}
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btExcel":
			if (document.all["txClsNo"].value == "" && document.getElementById("dlUseDept").options[document.getElementById("dlUseDept").selectedIndex].value == "") {
				alert("至少需輸入一項條件");
				$('#txClsNo').focus();
				Page_BlockSubmit = true;
			}
			else {
				Page_BlockSubmit = false;
			}
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
	if (argResult.id == wsGetClsID)
    {
		if (jf_IsWebServiceSuccess(argResult))
		{
			if (argResult.value.IS_LOWEST != 1) {
				alert("請輸入最底層分類號");
				document.all["h_ClsKey"].value = "";
				document.all["txClsNo"].value = "";
				$('#txClsNo').focus();
			}
			else
			{
				document.all["txVerNo"].value = argResult.value.VerNo;
				document.all["h_ClsKey"].value = argResult.value.ClsKey;
				document.all["lbClsName"].value = argResult.value.ClsName;
			}
		}
		else
		{
			document.all["h_ClsKey"].value = "";
			document.all["txClsNo"].value = "";
			$('#txClsNo').focus();
		}
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//組出回傳值
function ReturnValue(argLink) {
	try {
		opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].value = argLink;
		opener.window.CallBack("EAT807C1");
		close();
	}
	catch (e) { }

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var wsGetClsID;
function ClsNoOnBlur()
{
	if(document.all["txClsNo"].value != "")
	{
		var arWSParam = new Array(4);
		arWSParam[0] = document.all["h_OrgNo"].value;
		arWSParam[1] = document.all["txVerNo"].value;
		arWSParam[2] = document.all["txClsNo"].value;
		arWSParam[3] = "";
		callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, arWSParam);

		wsGetClsID = callObj.id;
		OnWSResult(callObj);
	}
}