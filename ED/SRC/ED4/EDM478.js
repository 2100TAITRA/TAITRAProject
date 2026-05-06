/* DATE		SA		PRG		MGR_NO			DESC
 * 1031127  Kevin	Kevin_C 1030833			新增EDM478
 * 1070316  Kevin   Justin  1050087         二代公文修改
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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");
//1070316 Justin [1050087] 二代公文修改
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
//1070316 Justin [1050087] 二代公文修改
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
//1070316 Justin [1050087] 二代公文修改 
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
	
    //1070316 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			if(jf_CheckBlankAndAlert())
			{
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1070316 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1070316 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1070316 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			var strUrl = "";
			strUrl = "EDR478.aspx?rtnObj=lbReturnValue";
		    //1070316 Justin [1050087] 二代公文修改
		    //jf_OpenChildWin(strUrl, "EDR478", 700, 500 );
			jf_OpenChildWin(strUrl, "EDR478", 800, 600);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
		if(!CheckPoint(document.all["dg1__ctl" + i + "_txStanderDays"]))
			return false;
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txStanderDays不可空白
		if(document.all["dg1__ctl" + i + "_txStanderDays"].value == "")
		{
			InValidName += ",標準使用日數不可空白";			
			InValidControlName = "dg1__ctl" + i + "_txStanderDays";
		}
						
		if(InValidName != "")
		{
		    InValidName = InValidName.substr(1, InValidName.length);
		    //1070316 Justin [1050087] 二代公文修改
		    //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
		    //document.all[InValidControlName].focus();
		    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
		    $('#' + InValidControlName).focus();
			return false;
		}
		
	}
	return true;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var bHasCheck = false;
function CheckPoint(argObj){
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck=true;
	if(argObj.value!="")
		if(argObj.value.indexOf(".")!=-1)
			if(argObj.value.split(".")[1].length>1)
			{
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["只接受輸入數字至小數點後1位"])),"");
			    //1070316 Justin [1050087] 二代公文修改
			    //argObj.focus();
				$('#' + argObj.id).focus();
				bHasCheck = false;
				return false;
			}
			else if(argObj.value.split(".")[1].length==0)
			{
				argObj.value = argObj.value.substr(0,argObj.value.length-1);
			}
	bHasCheck = false;
	return true;
}
function InpNumOnly()
{
	if(event.keyCode != 46)
		if ((event.keyCode < 48) || (event.keyCode > 57)) { event.returnValue = false }
}
