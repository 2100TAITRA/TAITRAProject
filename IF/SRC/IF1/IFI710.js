/* *
 * Date		SA			PG			MGR_NO		DESC
 * 1040204	Cloud		Gabby		1030930		(榮總)新增IFI710
 * 1051012  Kevin       Justin      1050087     二代公文修改
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
 * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
var oChildWindowIds="";

//紀錄Call WebService物件的id
var wsDuplicateID;
//1051012 Justin 1050087 二代公文修改
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
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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
	    /*1051012 Justin 1050087 二代公文修改
		case "btDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txDateS"], event.screenX, event.screenY);
			break;
		case "btDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txDateE"], event.screenX, event.screenY);
			break;*/
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051012 Justin 1050087 二代公文修改 
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
	
    //1051012 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1051012 Justin 1050087 二代公文修改
			//document.all["rbAll"].focus();
			$('#rbAll').focus();
			document.all["rbAll"].checked=true;
			break;
		case "btSearch":
			Page_BlockSubmit=false;
			if(!CheckBeforeSearch())
				Page_BlockSubmit=true;
		    //1051012 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
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
function CheckBeforeSearch()
{
	var strSDate	=	jf_Trim(document.all.txDateS.value);//發布日期起
	var strEDate	=	jf_Trim(document.all.txDateE.value);//發布日期迄
	var strDocNo	=	jf_Trim(document.all.txDocNo.value);//相關文號
	var bRtnbool = true;
	if(document.all.rbDec.checked==false)
	{
		if(strSDate == "" && strEDate == "" &&strDocNo=="")
		{
			jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["發佈日期、相關文號請至少輸入一個條件"])),"");
		    //1051012 Justin 1050087 二代公文修改
			//document.all["txDateS"].focus();
			$('#txDateS').focus();
			bRtnbool = false;
			return bRtnbool;
		}
	}
	else
	{
		if(strSDate == "" && strEDate == "")
		{
		    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["發佈日期(起)、(迄)不可為空白"])), "");
		    //1051012 Justin 1050087 二代公文修改
		    //document.all["txDateS"].focus();
		    $('#txDateS').focus();
			bRtnbool = false;
			return bRtnbool;
		}		
	}
	if(!CheckDATE("txDateS","發布日期(起)"))
	{  
	   bRtnbool = false;
	   return bRtnbool;
	}
	
	if(!CheckDATE("txDateE","發布日期(迄)"))
	{ 
		bRtnbool = false;
		return bRtnbool;
	}
	if(strSDate == "" && strEDate != "")
	{ 
	document.all.txDateS.value = strEDate;
	
	}
	if(strSDate != "" && strEDate == "")
	{ 
	document.all.txDateE.value = strSDate;
	}
	return bRtnbool;
}
//記錄是否已檢核過有註冊onblur事件的欄位的值(通常發生在輸入完後直接按下儲存件時)
var bHasCheck = false;
function CheckDATE(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
		    //1051012 Justin 1050087 二代公文修改
		    //document.all[argObj].focus();
		    $('#' + argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
function HideDocNo()
{
	if(document.all["rbDec"].checked==true)
	{
		document.all["lbDocNo"].className='hide';
		document.all["txDocNo"].className='hide';
		document.all["lbNotice"].className='hide';
		document.all["txDocNo"].value = "";
	    //1040904   CLOUD [1040679] 隱藏公告類型及承辦單位選單 -S
		document.all["lbType"].className = "hide";
		document.all["ddlType"].className = "hide";
		document.all["lbTypeNotice"].className = "hide";
		document.all["lbDept"].className = "hide";
		document.all["ddlDept"].className = "hide";
		document.all["lbDeptNotice"].className = "hide";
	    //1040904   CLOUD [1040679] 隱藏公告類型及承辦單位選單 -E
	}
	else
	{
	    //1051012 Justin 1050087 二代公文修改，移除無用CLASS-S
		//document.all["lbDocNo"].className='InputFieldLabel';
		//document.all["txDocNo"].className = 'InputFieldText';
		document.all["lbDocNo"].className = '';
		document.all["txDocNo"].className = 'InputFieldNumeric';
		if (document.all["rbAll"].checked == true)
		    //document.all["lbNotice"].className = 'InputFieldLabel';
		    document.all["lbNotice"].className = '';
	    //1040904   CLOUD [1040679] 顯示公告類型及承辦單位選單 -S
		//document.all["lbType"].className = "InputFieldLabel";
	    //document.all["ddlType"].className = "InputFieldLabel";
	    //document.all["lbDept"].className = "InputFieldLabel";
	    //document.all["ddlDept"].className = "InputFieldLabel";
		document.all["lbType"].className = "";
		document.all["ddlType"].className = "";
		document.all["lbDept"].className = "";
		document.all["ddlDept"].className = "";
		if (document.all["rbAll"].checked == true)
		{
		    //document.all["lbDeptNotice"].className = "InputFieldLabel";
		    //document.all["lbTypeNotice"].className = "InputFieldLabel";
		    document.all["lbDeptNotice"].className = "";
		    document.all["lbTypeNotice"].className = "";
		    //1051012 Justin 1050087 二代公文修改，移除無用CLASS-E
		}
	    //1040904   CLOUD [1040679] 顯示公告類型及承辦單位選單 -E
	}
}
function storeCookie(argType,argPath)
{
	var strArtifact=document.all["H_Artifact"].value;
	if(argType=="公佈欄")
	{
		var strParam = GetAllParamStr();
		if(strParam == "")
			strParam = "?";
		var strUrl = "../../../TB_A/TB1/TBI130_1.htm" + strParam + "&rtnObj=lbReturnValue&BulletinId=" + argPath + "&SAMLart=" + strArtifact;
	    //1051012 Justin 1050087 二代公文修改
		//var ret = jf_OpenChildWin(strUrl, "TBI130_1", 755, 500);
		var ret = jf_OpenChildWin(strUrl, "TBI130_1", 800, 600);
		oChildWindowIds = ret;
	}
	else
	{
	    //var ret = jf_ShowModal("IFI700C1_1.htm?SAMLart="+strArtifact+"&BulletinId="+argPath,700,600);	
	    //1051012 Justin 1050087 二代公文修改
	    //var ret = jf_OpenChildWin("IFI700C1_1.htm?SAMLart=" + strArtifact + "&BulletinId=" + argPath, 700, 600);
	    var ret = jf_OpenChildWin("IFI700C1_1.htm?SAMLart=" + strArtifact + "&BulletinId=" + argPath, 800, 600);
	}
}
var flag = 0;
function fnShowMsgAndClose(Msg)
{
	if (flag == 0)
	{
		flag = 1;
		alert(Msg);
	}
}