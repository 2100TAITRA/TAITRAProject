/*
DATE		SA		PRG		MGR_NO		DESC
1030905		David	David	1030401		新增程式
1050826		Kevin	Joe		1050087		二代升級
1051019     Leslie  Kenny   1050087     二代公文修改
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

//指定DataGrid欄位
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");

//1050826 Joe 1050087 二代公文修改--S
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1050826 Joe 1050087 二代公文修改--E
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
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
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
		//1050826 Joe 1050087 二代公文修改--S
		/* 
		case "btRcvDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
			break;
		case "btRcvDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
			break;
		 */
		//1050826 Joe 1050087 二代公文修改--S
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050826 Joe 1050087 二代公文修改，參數多加event
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
	//1050826 Joe 1050087 二代公文修改
	// xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
			//1050826 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !CheckBeforeSearch();
			//1050826 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !CheckBeforeSearch();
			//1050826 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btExcel":
			Page_BlockSubmit = !CheckBeforeSearch();
			//1050826 Joe 1050087 二代公文修改
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

function CheckBeforeSearch()
{
	if(document.all.txRcvDateS.value == "" && document.all.txRcvDateE.value == "")
	{
		alert("收創日期起迄欄位不能皆為空");
		return false;
	}
	var strDateS = document.all.txRcvDateS.value;
	var strDateE = document.all.txRcvDateE.value;
	if(strDateS != "" && strDateE != "" && strDateS > strDateE)
	{
		document.all.txRcvDateS.value = strDateE;
		document.all.txRcvDateE.value = strDateS;
	}
	if(!CheckDATE("txRcvDateS","收創日期(起)",true))
		return false;
	if(!CheckDATE("txRcvDateE","收創日期(訖)",true))
		return false;

	if(strDateS == "" || strDateE == "")
	{
		if(strDateS == "")
			document.all.txRcvDateS.value = strDateE;
		else
			document.all.txRcvDateE.value = strDateS;
	}
	return true;
}

//日期檢核
var CheckedDate = false;
var ObjName = "";
var strBDate = "";
function CheckDATE(argObj,strMsg,argIsCheckDone)
{
	if(ObjName != argObj)
		CheckedDate = false;
	ObjName = argObj;
	
	var strDate = document.all[argObj].value;
	
		
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}

		if(strBDate != strDate)
			CheckedDate = false;	
		
		strBDate = strDate;

		if(CheckedDate)
		{
			CheckedDate = false;
			return true;
		}
		if(argIsCheckDone)
			CheckedDate = true;

		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1050826	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[argObj].focus();
			$('#'+argObj).focus();
			CheckedDate = false;
			return false;
		}
		else
			return true;
	}
	else
		return true;
}