/* DATE		SA		PRG		MGR_NO			DESC
 * 1031127  Kevin	Kevin_C 1030833			新增EDR478
 * 1070131  Kevin   Justin  1050087         二代公文修改
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
//1070131 Justin [1050087] 二代公文修改
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
//1070131 Justin [1050087] 二代公文修改
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
//1070131 Justin [1050087] 二代公文修改 
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
	
    //1070131 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			if(jf_Trim(document.all.txPrintYear.value)=="")
			{
				jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["列印年度不可為空白"]) ), "" );
			    //1070131 Justin [1050087] 二代公文修改
				//document.all.txPrintYear.focus();
				$('#txPrintYear').focus();
				break;
			}
			if(!CheckYearMonth(document.all.txPrintYear))
			{
				break;
			}
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1070131 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(jf_Trim(document.all.txPrintYear.value)=="")
			{
				jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["列印年度不可為空白"]) ), "" );
			    //1070131 Justin [1050087] 二代公文修改
				//document.all.txPrintYear.focus();
				$('#txPrintYear').focus();
				break;
			}
			if(!CheckYearMonth(document.all.txPrintYear))
			{
				break;
			}
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1070131 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var bHasCheck = false;
function CheckYearMonth(argObj)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strErrMsg="";
	if(argObj.value=="")
	{
		bHasCheck = false;
		return false;
	}
	var strDate = argObj.value;
	if (strDate.length < 5)
	{
		strDate = jf_PADL(strDate,5,'0');
		argObj.value = strDate;
	}
	if(!jf_CheckCDATE(argObj.value+"01"))
	{
		strErrMsg += "日期格式不正確";
	}
	//1070131 Justin [1050087] 二代公文修改
    //else if(document.all.lbMaxYear.innerText=="您尚未執行過統計作業")
	else if (document.all.lbMaxYear.textContent == "您尚未執行過統計作業")
	{
		strErrMsg +="您尚未執行過統計作業";
	}
	//1070131 Justin [1050087] 二代公文修改
    //else if(document.all.lbMaxYear.innerText=="")
	else if (document.all.lbMaxYear.textContent == "")
	{
		strErrMsg+="目前統計最大月份有誤"
	}
	//1070131 Justin [1050087] 二代公文修改
    //else if(parseInt(document.all.lbMaxYear.innerText.split("：")[1],10)<parseInt(document.all.txPrintYear.value,10))
	else if (parseInt(document.all.lbMaxYear.textContent.split("：")[1], 10) < parseInt(document.all.txPrintYear.value, 10))
	{
		strErrMsg+="列印年度超過最大統計月份";
	}
	if(strErrMsg!="")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		argObj.value = "";
	    //1070131 Justin [1050087] 二代公文修改
		//argObj.focus();
		$('#' + argObj.id).focus();
		bHasCheck = false;
		return false;
	}
	bHasCheck = false;
	return true
}
