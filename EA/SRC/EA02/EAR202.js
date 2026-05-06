/*****************************************************************************************************
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號		概要
 * -------------------------------------------------------------------------------------------------
 *103.01.10		Kenny	1021080		新增高港警案卷標籤報表，及配合單位做UI介面調整
 *1060803       Justin  1050087     二代公文修改
 *111.06.13    Cloud    1110371     升級二代無法一次產出多組報表，調整交通部報表產生行為
 ****************************************************************************************************/

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
var strTableFields = new Array("_txYear","_txClass","_txCase","_txVol");
/*1060803 Justin [1050087] 二代公文修改
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //*111.06.13    Cloud    1110371     升級二代無法一次產出多組報表，調整交通部報表產生行為
    if (document.all["tx_H_OrgNickName"].value == "MOTC")
    { document.all["Trrpttype"].className = ""; }
    else
        document.all["Trrpttype"].className = "hide";
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060803 Justin [1050087] 二代公文修改
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
	    //1060803 Justin [1050087] 二代公文修改 
	    case "btReset":
	        Page_BlockSubmit = false;            IsServerHandling = true;            __doPostBack('btReset', '');
            break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060803 Justin [1050087] 二代公文修改 
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
	
    //1060803 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1060803 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1060803 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteSelected":
			Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
		    //1060803 Justin [1050087] 二代公文修改
		    //jf_SelectBarSubmit();
			jf_SelectBarSubmit(xObjectName);
			break;
		case "btUp":
			Page_BlockSubmit = true;
			jf_RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			jf_RowDown("dg1", "_cbSelect", strTableFields);
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function PadLeftWithZero(argLen)
{
	if(jf_Trim(event.srcElement.value) != "")
		event.srcElement.value = jf_PADL(event.srcElement.value, argLen, "0");
}

//1030110	Kenny	[1021080]	高港警案次號不足三碼補足三碼
function PadLeftWithZero2(argLen)
{
	if ( document.all["tx_H_OrgNickName"].value == "KHPB" )
	{
		if(jf_Trim(event.srcElement.value) != "")
			event.srcElement.value = jf_PADL(event.srcElement.value, argLen, "0");
	}
}