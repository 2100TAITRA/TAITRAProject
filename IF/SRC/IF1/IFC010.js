/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1050530	Kevin	Joe 	1050087		二代公文修改
 * 1050805	Kevin	Joe		1050087		修改子視窗回傳方式
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
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

//1050530 Joe 1050087 二代公文修改
/*
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
*/
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
//1050530 Joe 1050087 二代公文修改，傳入event參數
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
	
	//1050530 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":		
			//1050530 Joe 1050087 二代公文修改
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

function BuildRet(argCN, argDisplayName, argPath)
{
	//1050805	Joe		1050087		修改子視窗回傳方式--S
	/*
	Page_BlockSubmit = true;
	var value = new Array(3);
	value[0] = argCN;
	value[1] = argDisplayName;
	value[2] = argPath;
	returnValue = BuildRetString(value);
	close();
	*/
	DlgCallBack(argCN, argDisplayName, argPath);
	DlgClose();
}
/*
//資訊基礎建設共用函式
function BuildRetString(argArr)
{
	var i;
	var ret="";
	var SPLIT= '|';
	for(i=0;i<argArr.length-1;i++)
	   ret+=argArr[i]+SPLIT;
	ret+=argArr[i];   
	return ret;
}
*/
//1050805	Joe		1050087		修改子視窗回傳方式--E
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
