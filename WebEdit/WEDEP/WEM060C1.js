/*
DATE	SA		PRG		MGR_NO	DESC
0970923	Stella	Yvonne	---		新增程式FOR檔管局
1100201	Leslie	Joe		1090927	取消使用document.activeElement
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060815	Kevin_C	1050087	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1060815	Kevin_C	1050087	升二代 -S
	//if (document.all["ValidationSummary1"].innerText != "")
		//alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
	//1060815	Kevin_C	1050087	升二代 -E
}

//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl()
function ClientButtonControl(e)
{
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	switch (xObjectName)
	{
		//1060815	Kevin_C	1050087	升二代 -S
		//case "btSDate":
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all["txUpdDateS"], event.screenX, event.screenY);
		//	break;
		//case "btEDate":
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all["txUpdDateE"], event.screenX, event.screenY);
		//	break;
		//1060815	Kevin_C	1050087	升二代 -E
	}	
}

//1060815	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;

	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1060815	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btPreview":
			Page_BlockSubmit = !jf_CheckBeforeSearch();
			//1060815	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();			
			jf_ToolBarSubmit(xObjectName);			
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_CheckBeforeSearch();
			//1060815	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();			
			jf_ToolBarSubmit(xObjectName);			
			break;
	}
}

function CallBack(argCallerId)
{
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
	ShowMsg();
}

function OnWSResult(argResult)
{
    //webserver回傳後動作
    //檢查回傳的webserverID
    /*//範例
    if (argResult.id == wsGetGrpNameID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			document.all["txGrp_Name"].value = argResult.value.RtnField0[0];
		}
		else
		{
			document.all["txGrp_Name"].value = "";
			//1060815	Kevin_C	1050087	升二代
			//document.all["txGrp_No"].focus();
			$('txGrp_No').focus();
		}
	}
	*/
}
function jf_CheckBeforeSearch()
{
	if (document.all.txUpdDateS.value=="" && document.all.txUpdDateE.value=="")
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["更新日期不可為空白"])),"");
			//1060815	Kevin_C	1050087	升二代
			//document.all.txUpdDateS.focus();
			$('#txUpdDateS').focus();
			return false;
		}
	else
		return true;
}


function txUpdDate_onblur(strObjName)
{	
	var strSDate = document.all.txUpdDateS.value;
	var strEDate = document.all.txUpdDateE.value;
	if(strSDate != "")
	{
		if (strSDate.length < 7)
		{	
			strSDate = jf_PADL(strSDate,7,'0');
			document.all.txUpdDateS.value = strSDate;
		}	
		if(!jf_CheckCDATE(strSDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["更新日期(起) 格式不正確"])),"");
			//1060815	Kevin_C	1050087	升二代
			//document.all.txUpdDateS.focus();
			$('#txUpdDateS').focus();
		}
	}
	if(strEDate != "")
	{
		if (strEDate.length < 7)
		{
			strEDate = jf_PADL(strEDate,7,'0');
			document.all.txUpdDateE.value = strEDate
		}
		if(!jf_CheckCDATE(strEDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["更新日期(迄) 格式不正確"])),"");
			//1060815	Kevin_C	1050087	升二代
			//document.all.txUpdDateE.focus();
			$('#txUpdDateE').focus();
		}
	}
}
/**********************************************************************************************
 Name : function jf_CallCalendar(argShowObj, argX, argY)
 Desc : 顯示小月曆，並將選取的日期顯示在argShowObj上
 Parm : argShowObj	: text element object
        argX		: string X軸位置
        argY		: string Y軸位置
 Rtn  : none
***********************************************************************************************/
function jf_CallCalendar(argShowObj, argX, argY)
{
	//1060815	Kevin_C	1050087	升二代
	//var sPath = "../../../STD/LIB/calendar.htm";
	var sPath = "../../../STDN/LIB/calendar.htm";
	strFeatures = "dialogWidth=337px;dialogHeight=330px;center=yes;help=no;status=no;dialogLeft=" + argX + ";dialogTop=" + argY;
	var st = argShowObj.value;
	var sDate = "";
	sDate = showModalDialog(sPath, st, strFeatures);

	if( typeof(sDate) == "undefined" )
		sDate = "";

	st = formatDate(sDate, 0);

	if(st != "")
		argShowObj.value = st;
}
