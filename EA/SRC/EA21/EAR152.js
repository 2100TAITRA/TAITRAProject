/*
DATE	SA		PRG		MGR_NO				DESC
1060718	Cloud	Justin	1060422				新增程式
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
    var ddlDept = document.all["ddldept"];
    var SelectItem = ddlDept.options[ddlDept.selectedIndex];
    var strDeptValue = SelectItem.value;
    var strDeptNo = strDeptValue;

    if (document.all["ddlSect"]) {
        if (document.all["ddlSect"].selectedIndex == 0 || document.all["ddlSect"].selectedIndex == -1)
            eajf_SetdlSectByUnitCode(strDeptNo, "ddlSect", false);
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
		case "btPrint":
		case "btPreview":
		case "btExcel":
			Page_BlockSubmit = !jf_CheckBeforSave();
			jf_ToolBarSubmit(xObjectName);
			break;
	    case "btClean":
	        Page_BlockSubmit = false;
	        if (jf_ConfirmClean(true)) {
	            jf_ToolBarSubmit(xObjectName);
	        }
	        break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    CheckBeforeSearch(document.all.txYearS, document.all.txYearE);

    if (document.all.txYearS.value == "" && document.all["ddldept"].selectedIndex == 0)
	{
		alert("請至少輸入一項條件！");
		return false;
    }

	if (document.all["ddlSect"].selectedIndex != 0 && document.all["ddlSect"].selectedIndex != -1) {
	    var SectItem = document.all["ddlSect"].options[document.all["ddlSect"].selectedIndex];
	    if (SectItem.value != "")
	        document.all["H_Sect_Value"].value = SectItem.value.split(':')[2];
	    else
	        document.all["H_Sect_Value"].value = "";
	    document.all["H_Sect_Text"].value = SectItem.text;
		document.all["H_Sect_AllValue"].value = edjf_SaveCurrDL(document.all["ddlSect"]);
	}
	else {
	    document.all["H_Sect_Value"].value = "";
	    document.all["H_Sect_Text"].value = "";
	    document.all["H_Sect_AllValue"].value = "";
	}
	if (document.all["ddldept"].selectedIndex != 0 && document.all["ddldept"].selectedIndex != -1) {
	    var DeptItem = document.all["ddldept"].options[document.all["ddldept"].selectedIndex];
	    document.all["H_Dept_Value"].value = DeptItem.value;
	    document.all["H_Dept_Text"].value = DeptItem.text;
	}
	else {
	    document.all["H_Dept_Value"].value = "";
	    document.all["H_Dept_Text"].value = "";
	}

	return true;
}

function CheckBeforeSearch(argObjS, argObjE) {
    var strS = argObjS.value;
    var strE = argObjE.value;

    if (strS == "" && strE != "")
        argObjS.value = strE;
    if (strE == "" && strS != "")
        argObjE.value = strS;

    if (strS != "" && strE != "" && strS > strE) {
        argObjS.value = strE;
        argObjE.value = strS;
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function dlDept_Text_onblur() {
    var bCheckOK = true;

    var ddlDept = document.all["ddldept"];
    var SelectItem = ddlDept.options[ddlDept.selectedIndex];
    var strDeptValue = SelectItem.value;
    var strDeptNo = strDeptValue;

    eajf_SetdlSectByUnitCode(strDeptNo, "ddlSect", false);

    return bCheckOK;
}

//將下拉選單裡的options轉成字串相加再回傳，格式： [項目Text;項目Value|項目Text;項目Value|...]
function edjf_SaveCurrDL(argSource)
{
	var strTemp = "";
	for(var i=0 ; i < argSource.options.length ; i++ )
	{
		strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
	}
	return strTemp.substr(0,strTemp.length-1);
}