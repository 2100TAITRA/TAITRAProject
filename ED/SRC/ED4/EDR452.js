/*
DATE		SA		PRG		MGR_NO		DESC
1040108	    Kevin	Kevin_C	1030976		新增程式
1041119		Kevin	Kenny	1040634		修正檢核月份合理性資料處理
1070301     Kevin   Justin  1050087     二代公文修改
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
//1070301 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
//1070301 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
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
//1070301 Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
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
	
    //1070301 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			if(!Page_BlockSubmit)
				Page_BlockSubmit=!jf_CheckBeforPrint();
		    //1070301 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			if(!Page_BlockSubmit)
				Page_BlockSubmit=!jf_CheckBeforPrint();
		    //1070301 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

//欄位檢查
function jf_CheckBeforPrint()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if(!CheckCDATEYM(document.all["txCountYM"]))
	{
	    //1070301 Justin [1050087] 二代公文修改
	    //document.all["txCountYM"].focus();
	    $('#txCountYM').focus();
		return false;
	}
	if (document.all["txCountYM"].value == "")
	{
	    strErrMsg += "統計年月不可空白\n";
	    //1070301 Justin [1050087] 二代公文修改
	    //document.all["txCountYM"].focus();
	    $('#txCountYM').focus();
	}
	var checkMailType;
	if(document.getElementById("ddlMailType").selectedIndex==-1)
		checkMailType="";
	else
		checkMailType = jf_Trim(document.getElementById("ddlMailType").options[document.getElementById("ddlMailType").selectedIndex].value);
	if (checkMailType == "" || checkMailType== "undefined")
	{
	    strErrMsg += "郵件類型不可空白\n";
	    document.getElementById("ddlMailType").focus();
	}
	
	var isSelected=false;
	var table = document.getElementById("rblRptType");
	for(i=0;i<table.rows.length;i++)
     if(table.rows[i].cells[0].childNodes[0].checked == true)
      isSelected = true;
      
    if(isSelected==false)
	{
        strErrMsg += "需選取報表類型\n";
        table.rows[0].cells[0].childNodes[0].focus();
	}
	
	strErrMsg=strErrMsg.substring(0,strErrMsg.length-1);
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
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
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢核日期格式
var bHasCheck = false;
function CheckCDATEYM(argObj)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strDate = jf_Trim(argObj.value);
	if (strDate != "")
	{
		if (strDate.length < 5)
		{
			strDate = jf_PADL(strDate,5,'0');
			argObj.value = strDate;
		}
		var strMonth = strDate.substring(3, 5);
		var strYear = strDate.substring(0, 3);
		//1041119	Kenny	[1040634]	修正parseInt，使用時給予要使用的進位法，此處應使用10進位，避免判斷08、09月時出現錯誤
		//if (isNaN(parseInt(strMonth)) || parseInt(strMonth)<1 || parseInt(strMonth)>12 || isNaN(parseInt(strYear)) || parseInt(strYear)<0)
		if (isNaN(parseInt(strMonth,10)) || parseInt(strMonth,10)<1 || parseInt(strMonth,10)>12 || isNaN(parseInt(strYear)) || parseInt(strYear)<0)
		{
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["日期格式不正確"])), "");
		    //1070301 Justin [1050087] 二代公文修改
		    //argObj.focus();
		    $('#' + argObj.id).focus();
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
