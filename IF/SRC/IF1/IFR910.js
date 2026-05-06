/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號		概要
 * -------------------------------------------------------------------------------------------------
 * 1021011	Eric	1020742	    臨時憑證紀錄查詢作業
 * 1051201  Justin  1050087     二代公文修改
 * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
//1051201 Justin [1050087] 二代公文修改
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
//1051201 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
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
		    break;
		/*1051201 Justin [1050087] 二代公文修改
		case "btBorrowDate":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txBorrowDate"], event.screenX, event.screenY);
		    break;
		case "btBorrowDateE":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txBorrowDateE"], event.screenX, event.screenY);
		    break;*/
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051201 Justin [1050087] 二代公文修改 
//function CheckText()
function CheckText(xObjectName)
{
	if(jf_Trim(document.all.txBorrowDate.value)!=""||jf_Trim(document.all.txBorrowDateE.value) != "")
	{
	    if(jf_Trim(document.all.txUserName.value)!=""||jf_Trim(document.all.txCardId.value) != "")
	    {
	    Page_BlockSubmit = false;
	    //1051201 Justin [1050087] 二代公文修改 
	    //jf_ToolBarSubmit();
	    jf_ToolBarSubmit(xObjectName);
	    }
	    else
	    {
	    alert("請輸入承辦人帳號或卡號")
	    }
	}
	else
	{
        alert("請輸入借卡日期")
    }
					
}

//1051201 Justin [1050087] 二代公文修改 
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
	
    //1051201 Justin [1050087] 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	    case "btSearch":
	        //1051201 Justin [1050087] 二代公文修改	        
	        //CheckText();
	        //document.all["txBorrowDate"].focus();
	        CheckText(xObjectName);
	        $('#txBorrowDate').focus();
	        break;
	    case "btPrint":
	        //Page_BlockSubmit = !jf_ConfirmPrint();
	        //jf_ToolBarSubmit();
	        //1051201 Justin [1050087] 二代公文修改	        
	        //CheckText();
	        //document.all["txBorrowDate"].focus();
	        CheckText(xObjectName);
	        $('#txBorrowDate').focus();
	        break;
	    case "btPreview":
	        //Page_BlockSubmit = !jf_ConfirmPreview();
	        //jf_ToolBarSubmit();
	        //1051201 Justin [1050087] 二代公文修改	        
	        //CheckText();
	        //document.all["txBorrowDate"].focus();
	        CheckText(xObjectName);
	        $('#txBorrowDate').focus();
	        break;
	    case "btExcel":
	        //Page_BlockSubmit = !jf_ConfirmPrint();
			//jf_ToolBarSubmit();
	        //1051201 Justin [1050087] 二代公文修改	        
	        //CheckText();
	        //document.all["txBorrowDate"].focus();
	        CheckText(xObjectName);
	        $('#txBorrowDate').focus();
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function BorrowDateOnblur(strDate)
{
	var strBorrowDate = document.all[strDate].value
	if(strBorrowDate =="")
			return;	

	if (strBorrowDate.length < 7)
	{
		strBorrowDate = jf_PADL(strBorrowDate,7,'0');
		document.all[strDate].value = strBorrowDate;
	}
	if (!jf_CheckCDATE(document.all[strDate].value))
	{
	    alert("日期格式錯誤!");
	    //1051201 Justin [1050087] 二代公文修改
	    //document.all[strDate].focus();
	    $('#' + strDate).focus();
	}
}

var CheckedDate = false;
function CheckDATE(argObj,strMsg,argIsCheckDone)
{
	var strDate = document.all[argObj].value;

	if (strDate != "")
	{
		if(CheckedDate)
		{
			CheckedDate = false;
			return true;
		}
		if(argIsCheckDone)
			CheckedDate = true;

		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
			
		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    //1051201 Justin [1050087] 二代公文修改
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			CheckedDate = false;
			return false;
		}
		else
			return true;
	}
	else
		return true;
}
