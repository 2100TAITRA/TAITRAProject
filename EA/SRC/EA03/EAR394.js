/*
DATE	SA		PRG		MSG_NO		DESC
1070503	Cloud	Justin	1070343		新增程式
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
		case "btExcel":
		    Page_BlockSubmit = !jf_CheckSearchObject();
		    jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_CheckSearchObject()
{
    CheckBeforeSearch(document.all.txYearS, document.all.txYearE);
	if(document.all["txYearS"].value == "")
	{
	    alert("列印年份起訖不可皆為空白");
		return false;
	}
	else 
		return true;
}

function CheckBeforeSearch(argObjS, argObjE)
{
    var strS = argObjS.value;
    var strE = argObjE.value;

    if (strS == "" && strE != "")
        argObjS.value = strE;
    if (strE == "" && strS != "")
        argObjE.value = strS;

    if (strS != "" && strE != "" && strS > strE)
    {
        argObjS.value = strE;
        argObjE.value = strS;
    }
}

function CheckYear(obj,objName)
{
    if(jf_Trim(document.all[obj].value) != "")
    {
        var strDate = jf_Trim(document.all[obj].value);
        strDate += "0101";
        strDate = jf_PADL(strDate,7,"0");
        document.all[obj].value = strDate.substr(0,3);
		
        if (!jf_CheckCDATE(strDate))
        {
            document.all[obj].value = "";
            alert(objName+"欄位格式有誤，請重新輸入");
            $('#' + obj).focus();
            return false;
        }
        else return true;
    }
    else return true;
}