/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1070307   Justin   1050087     二代公文修改
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
//1070307 Justin [1050087] 二代公文修改
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
//1070307 Justin [1050087] 二代公文修改
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
//1070307 Justin [1050087] 二代公文修改 
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
	
    //1070307 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
			if(jf_Trim(document.all.txMonthS.value)=="" && jf_Trim(document.all.txMonthE.value)!="")
				document.all.txMonthS.value = document.all.txMonthE.value;
			if(jf_Trim(document.all.txMonthS.value)=="")
		    {
			    alert("查詢區間不可為空白!!");
			    //1070307 Justin [1050087] 二代公文修改
			    //document.all.txMonthS.focus();
			    $('#txMonthS').focus();
				Page_BlockSubmit = true;
		    }
		    else
		    {
				if(jf_CheckYearMonth("txMonthS","查詢區間(起)"))
				{
					if(jf_CheckYearMonth("txMonthE","查詢區間(迄)"))
						Page_BlockSubmit = false;
					else
						Page_BlockSubmit = true;
				}
				else
					Page_BlockSubmit = true;
			}
			if(jf_Trim(document.all.txMonthE.value)=="")
				document.all.txMonthE.value = document.all.txMonthS.value;
		    //1070307 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
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
function jf_CheckYearMonth(obj,objName)
{
	if(jf_Trim(document.all[obj].value) != "")
	{
		var strDate = jf_Trim(document.all[obj].value);
		strDate = jf_PADL(strDate,7,"0");
		
		if (!jf_CheckCDATE(strDate))
		{
			document.all[obj].value = "";
			alert(objName+"欄位月份格式有誤，請重新輸入");
		    //1070307 Justin [1050087] 二代公文修改
		    //document.all[obj].focus();
			$('#' + obj).focus();
			return false;
		}
		else return true;
	}
	else return true;
}