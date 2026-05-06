/*****************************************************************************************************
   程式修改歷程
DATE	SA		PRG		MGR_NO			DESC
1140908	LESLIE	Cloud	1141137			新增作業
 ****************************************************************************************************/
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



/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{

}
var CallObjBT;
/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
	var xObjectName = e.target.id;
	
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
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			break;
		case "btCountryCodeS":
			var pUrl = "";
			pUrl = "../../EA/EA01/EAI014.aspx";
			jf_OpenChildWin(pUrl, "EAI014", 1024, 768);
			Page_BlockSubmit = true;
			CallObjBT = "btCountryCodeS";
			break;
		case "btCountryCodeE":
			var pUrl = "";
			pUrl = "../../EA/EA01/EAI014.aspx";
			jf_OpenChildWin(pUrl, "EAI014", 1024, 768);
			Page_BlockSubmit = true;
			CallObjBT = "btCountryCodeE";
			break;			
		case "btProductCodeS":
			var pUrl = "";
			pUrl = "../../EA/EA01/EAI015.aspx";
			jf_OpenChildWin(pUrl, "EAC015", 1024, 768);
			Page_BlockSubmit = true;
			CallObjBT = "btProductCodeS";
			break;
		case "btProductCodeE":
			var pUrl = "";
			pUrl = "../../EA/EA01/EAI015.aspx";
			jf_OpenChildWin(pUrl, "EAC015", 1024, 768);
			Page_BlockSubmit = true;
			CallObjBT = "btProductCodeE";
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
			//有輸入起訖時，卷次號不可為空白
			if (document.all["txCountryCodeS"].value + document.all["txOfficeCode"].value + document.all["txProductCodeS"].value != "" &&
				document.all["txCountryCodeE"].value + document.all["txOfficeCodeE"].value + document.all["txProductCodeE"].value != "" && (document.all["txVolNo"].value == "" || document.all["txVolNoE"].value == "")) {
				alert('進行起訖查詢時，卷次號不可為空白。')
				Page_BlockSubmit = true;
			}
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPrint();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}



//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
				$('#' + InValidControlName).focus();
				return false;
			}
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
	
	if (argCallerId == "EAI014") {
		if (document.all["lbReturnValue"].length > 0) {
			if (CallObjBT == "btCountryCodeS")
				document.all.txCountryCodeS.value = document.all.lbReturnValue.options[0].value;
			else
				document.all.txCountryCodeE.value = document.all.lbReturnValue.options[0].value;
		}
	}
	else if (argCallerId == "EAI015") {
		if (document.all["lbReturnValue"].length > 0) {
			if (CallObjBT == "btProductCodeS")
				document.all.txProductCodeS.value = document.all.lbReturnValue.options[0].value;
			else
				document.all.txProductCodeE.value = document.all.lbReturnValue.options[0].value;	
		}
	}
	
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}
function ReturnValue(argYear,argCls,argCase,argVol,argVer)
{
    
	try
	{
	    opener.document.all.lbReturnValue.length = 5;
		opener.document.all.lbReturnValue.options[0].value = argYear;
		opener.document.all.lbReturnValue.options[1].value = argCls;
		opener.document.all.lbReturnValue.options[2].value = argCase;
		opener.document.all.lbReturnValue.options[3].value = argVol;
		opener.document.all.lbReturnValue.options[4].value = argVer;
	    opener.window.CallBack("EAM012C1");
	    close();
	}
	catch (e) {}
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function TbOnBlur(argTb) {

	//國別
	if (argTb == "txCountryCodeS") {
		if (jf_Trim(document.all["txCountryCodeS"].value) == "")
			return;
		else
			document.all["txCountryCodeS"].value = jf_PADR(document.all["txCountryCodeS"].value, 3, '0');
	}
	if (argTb == "txCountryCodeE") {
		if (jf_Trim(document.all["txCountryCodeE"].value) == "")
			return;
		else
			document.all["txCountryCodeE"].value = jf_PADR(document.all["txCountryCodeE"].value, 3, '0');
	}
	//處別
	if (argTb == "txOfficeCode") {
		if (jf_Trim(document.all["txOfficeCode"].value) == "")
			return;
		else
			document.all["txOfficeCode"].value = jf_PADL(document.all["txOfficeCode"].value, 3, '0');
	}
	if (argTb == "txOfficeCodeE") {
		if (jf_Trim(document.all["txOfficeCodeE"].value) == "")
			return;
		else
			document.all["txOfficeCodeE"].value = jf_PADL(document.all["txOfficeCodeE"].value, 3, '0');
	}
	//細目號/產品別
	if (argTb == "txProductCodeS") {
		if (jf_Trim(document.all["txProductCodeS"].value) == "")
			return;
		else
			document.all["txProductCodeS"].value = jf_PADR(document.all["txProductCodeS"].value, 3, '0');
	}
	if (argTb == "txProductCodeE") {
		if (jf_Trim(document.all["txProductCodeE"].value) == "")
			return;
		else
			document.all["txProductCodeE"].value = jf_PADR(document.all["txProductCodeE"].value, 3, '0');
	}
	if (argTb == "txVolNo") {
		if (jf_Trim(document.all["txVolNo"].value)== "")
			return;
		else
			document.all["txVolNo"].value = jf_PADL(document.all["txVolNo"].value, 4, "0");
	}
	if (argTb == "txVolNoE") {
		if (jf_Trim(document.all["txVolNoE"].value) == "")
			return;
		else
			document.all["txVolNoE"].value = jf_PADL(document.all["txVolNoE"].value, 4, "0");
	}

}
