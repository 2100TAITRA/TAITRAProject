/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1061011   Justin   1050087     二代公文修改
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID = null;

//指定DataGrid欄位
var strTableFields = new Array("_hlBatchNo","_lbSendDate","_lbFromUser");
//1061011 Justin [1050087] 二代公文修改
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
//1061011 Justin [1050087] 二代公文修改
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
	    /*1061011 Justin [1050087] 二代公文修改
		case "btCalS":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txDateS"], event.screenX, event.screenY);
			break;
		case "btCalE":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txDateE"], event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1061011 Justin [1050087] 二代公文修改 
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
	
    //1061011 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1061011 Justin [1050087] 二代公文修改 
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

//組出回傳值
function ReturnValue(argLink)
{
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.window.CallBack("EDI355");
	    close();
	}
	catch (e) {}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckCDATE(argObj,strMsg)
{
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
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			document.all[argObj].value = "";
		    //1061011 Justin [1050087] 二代公文修改
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}

function CheckBeforeSearch()
{
	var bRtn = true;
	
	var strSDate	=	jf_Trim(document.all.txDateS.value);
	var strEDate	=	jf_Trim(document.all.txDateE.value);
	if(strSDate == "" && strEDate == "")
	{
	    //1061011 Justin [1050087] 二代公文修改
	    //document.all.txDateS.focus();
	    $('#txDateS').focus();
		alert("發文日期不可為空白");
		bRtn = false;
	}
	if(!CheckCDATE("txDateS","發文日期(起)"))
		bRtn = false;
	if(!CheckCDATE("txDateE","發文日期(訖)"))
		bRtn = false;
		
	if (strSDate != "" && strEDate != "")
	{
		try
		{
			var nSDate = parseFloat(jf_Trim(document.all.txDateS.value));
			var nEDate = parseFloat(jf_Trim(document.all.txDateE.value));
			if(nEDate < nSDate)
			{
			    //1061011 Justin [1050087] 二代公文修改
			    //document.all["txDateS"].focus();
			    $('#txDateS').focus();
				alert("發文日期(起)值不可大於迄值");
				bRtn = false;
			}
		}
		catch(e)
		{
		    //1061011 Justin [1050087] 二代公文修改
		    //document.all["txDateS"].focus();
		    $('#txDateS').focus();
			alert("發文日期起迄值輸入有誤，僅可輸入數字");
			bRtn = false;
		}
	}
	if(bRtn)
	{
		if(strSDate == "")
			document.all.txDateS.value = strEDate;
		if(strEDate == "")
			document.all.txDateE.value = strSDate;
		//預設帶入發文時間欄位
		if(jf_Trim(document.all.txTimeS.value) =="")
			document.all.txTimeS.value = "0600";
		else
			document.all.txTimeS.value =jf_PADL(document.all.txTimeS.value,4,'0');
		if(jf_Trim(document.all.txTimeE.value) =="")
			document.all.txTimeE.value = "2200";
		else
			document.all.txTimeE.value = jf_PADL(document.all.txTimeE.value,4,'0');
	}
	return bRtn;
}
