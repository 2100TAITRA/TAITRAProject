/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號		概要
 * -------------------------------------------------------------------------------------------------
 * 1140513		Cloud	1140070		新增
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");



/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	handledlWorkType();
}

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
	
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			break;
		case "btPreview":
		case "btExcel":
		case "btODS":

			var bRtn = true;
			//檢核空白
			if (document.all.txRcvDateS.value == "" && document.all.txRcvDateE.value == "" ) {
				bRtn = false;
				alert("收創文日期不可皆為空。");

			}
			//先檢核格式
			if (!CheckDate("txRcvDateS", "收創文日期(起)")) {
				bRtn = false;
				$('#txRcvDateS').focus();

			}
			if (!CheckDate("txRcvDateE", "收創文日期(迄)")) {
				bRtn = false;
				$('#txRcvDateE').focus();

			}
			//做大小交換-併檢核一個月

			if (!ChangeDate("txRcvDateS", "txRcvDateE", "收創文日期")) {
				bRtn = false;
				$('#txRcvDateS').focus();
			}
			if (bRtn) {
				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
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
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function dlDeptOnChange() {
	var str = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;
	var dlUser = document.all["dlUser"];
	document.all["H_Dept_Value"].value = str;
	document.all["H_User_Value"].value = "";
	document.all["H_dlUser_Value"].value = "";
	fnClearDropDownList(dlUser);
	if (document.all["dlDept"].selectedIndex > 0)//index有可能是0"空白"的情況
	{
		dlUser.options.add(new Option("", ""));//DropDownList新增一個空白
		var Uservalue = ED4.EDR4024.GetUser(document.all["SsoArtifact"].value, str).value;
		if (Uservalue.length > 0) {
			for (var i = 0; i < Uservalue.length; i++) {
				var strUser = Uservalue[i];
				dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
				document.all["H_dlUser_Value"].value += strUser.split('|')[0] + "|" + strUser.split('|')[1]+";";
			}
		}
	}
}
function fnClearDropDownList(obj)//專用呼叫清空
{
	while (obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
		obj.options.remove(0);
}
function dlUserOnChange() {
	var str = document.all["dlUser"].options[document.all["dlUser"].selectedIndex].value;
	document.all["H_User_Value"].value = str;
}

var bHasCheck = false;
function CheckDate(argObj, strMsg) {
	if (bHasCheck) {
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
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
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
function ChangeDate(argOobjs, argOobje, argMsg) {

	var strDateS = jf_Trim(document.all[argOobjs].value);//
	var strDateE = jf_Trim(document.all[argOobje].value);//
	if (strDateS == "" && strDateE != "") {
		document.all[argOobjs].value = strDateE;
	}
	if (strDateS != "" && strDateE == "") {
		document.all[argOobje].value = strDateS;
	}
	if (strDateS != "" && strDateE != "" && strDateS > strDateE) {
		document.all[argOobje].value = strDateS;
		document.all[argOobjs].value = strDateE;
	}
	const startYear = parseInt(document.all[argOobjs].value.substr(0, 3), 10) + 1911;
	const startMonth = parseInt(document.all[argOobjs].value.substr(3, 2), 10);
	const startDay = parseInt(document.all[argOobjs].value.substr(5, 2), 10);

	const endYear = parseInt(document.all[argOobje].value.substr(0, 3), 10) + 1911;
	const endMonth = parseInt(document.all[argOobje].value.substr(3, 2), 10);
	const endDay = parseInt(document.all[argOobje].value.substr(5, 2), 10);

	const startDate = new Date(startYear, startMonth, startDay);
	const endDate = new Date(endYear, endMonth, endDay);

	const maxEndDate = new Date(startDate);
	maxEndDate.setMonth(maxEndDate.getMonth() + 1);

	if (endDate > maxEndDate) {
		alert(argMsg + "區間不可超過1個月！");
		return false;
	}
	else
		return true;
}
function handledlWorkType() {
	if (document.getElementById('dlWorkType').value === "2") {

		document.getElementById('dlCloseType').value = "";
		document.getElementById('dlCloseType').disabled = true;
	}
	else {
		document.getElementById('dlCloseType').disabled = false;
	}
}

