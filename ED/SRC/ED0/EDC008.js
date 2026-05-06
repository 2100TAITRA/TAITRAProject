/*
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1050616	Justin	1050391	新增EDC008分層決行共用項目查詢子視窗
 * 1050624  Justin  1050087 二代公文修改
 * 1051019  Kenny   1050087 二代公文修改
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
var strTableFields = new Array("_lbDefaultNo","_hlPostNo","_lbPostName");
/*1050624 Justin 1050087 二代公文修改 
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

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
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050624 Justin 1050087 二代公文修改 
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
	
    //1050624 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	    case "btSearch":
	        CheckLength("txPINo");
			Page_BlockSubmit = !jf_CheckKeyObject();
	        //1050624 Justin 1050087 二代公文修改 
	        //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CheckLength(id) {
    var strValue;
    strValue = document.all[id].value;
    if (strValue == "") {
        return;
    }
    strValue = jf_PADL(strValue, 4, "0");
    document.all[id].value = strValue;
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
function ReturnValue(argLink, argRead1, argRead2)
{    
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.window.CallBack("EDC008");
	    close();
	}
	catch (e) {}   
}
