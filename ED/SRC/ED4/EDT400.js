/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 95.11.13		David	940821	日期補七碼，檢核日期格式，結案日期更新至Dg中
 * 103.11.12	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 1050525		Joe 	1050087	二代公文修改
 * 1051019      Kenny   1050087 二代公文修改
 * 1051102      Joe		1050087 修正會不停onblur的BUG
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
 
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
var strTableFields = new Array("_lbDocNo","_txCloseDate","_lbTitle");
//1050525 Joe 1050087 二代公文修改
/* 
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
 */
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051102	Joe		--		修正會不停onblur的BUG--S
	if (document.all["dg1"].rows[1].cells[2].textContent.trim() == "")
	{
		document.all["dg1head"].className = "hide";
		document.all["dg1"].className = "hide";
	}
    //1051102	Joe		--		修正會不停onblur的BUG--E
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
		case "btConfirm":
			if(jf_Trim(document.all.txDocNo.value) == "")
			{
				Page_BlockSubmit=true;
				alert("公文文號不可空白");
			}
			else
			{
				Page_BlockSubmit=true;
				btConfirmProc();
			}
			break;
		case "txDocNo":
			Page_BlockSubmit=true;
			break;
//1050525 Joe 1050087 二代公文修改
/* 
		case "ibIssueDateS":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txIssueDateS, event.screenX, event.screenY);
			break;
		}
		case "ibIssueDateE":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txIssueDateE, event.screenX, event.screenY);
			break;
		}
		case "ibCloseDateS":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txCloseDateS, event.screenX, event.screenY);
			break;
		}
		case "ibCloseDateE":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txCloseDateE, event.screenX, event.screenY);
			break;
		}
		case "ibUpdateCloseDate":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txUpdateCloseDate, event.screenX, event.screenY);
			break;
		}
		 */
		case "btConfirmUpdate":	//David	95.05.05
		{
			if (jf_Trim(document.all.txUpdateCloseDate.value) == "")
			{
				Page_BlockSubmit=true;
				alert("更新結案日期欄位不可空白\n");
			}
			else
			{
				Page_BlockSubmit=true;
				UpdDataGridDate();
				//Page_BlockSubmit = !jf_CheckBlankAndAlert();
			}
			break;
		}
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050525 Joe 1050087 二代公文修改，傳入event參數
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
	
	//1050525 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			if (fnCheckBeforeSearch())
			{
				Page_BlockSubmit = !jf_CheckKeyObject();
				//1050525 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
			break;
		case "btSave":
			Page_BlockSubmit = !jf_CheckBlankAndAlert();
			//1050525 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			if(jf_ConfirmClean(true))
			{				
				Page_BlockSubmit = false;
				//1050525 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);	
			}
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
			Page_BlockSubmit = !CheckBeforeDeleteSelected("dg1", "_cbSelect");
			//1050525 Joe 1050087 二代公文修改
			//jf_SelectBarSubmit();
			jf_SelectBarSubmit(xObjectName);
			break;
	}
}

function fnCheckBeforeSearch()
{
	if (!CheckCDATE("txIssueDateS", "發文日期(起)") || !CheckCDATE("txIssueDateE", "發文日期(訖)") || !CheckCDATE("txCloseDateS", "結案日期(起)") || !CheckCDATE("txCloseDateE", "結案日期(訖)"))
		return false;
	if (!jf_Trim(document.all.txIssueDateS.value) && !jf_Trim(document.all.txIssueDateE.value) && !jf_Trim(document.all.txCloseDateS.value) && !jf_Trim(document.all.txCloseDateE.value))
	{
		//1050525	Joe	1050087	二代系統升級，調整focus寫法
		//document.all.txIssueDateS.focus();
		$('#' + document.all.txIssueDateS.id).focus();		
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["請至少輸入一個查詢條件。"]) ), "" );
		return false;
	}
	return true;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢查DataGrid資料列是否至少有一筆資料
function jf_CheckBlankAndAlert()
{
	var intCount=0;
	var isEmptyCount=0;
	var HasChecked = true;
	for (var i=2; i < document.all.dg1.rows.length+1 ; i++)
	{
		if (document.all["dg1__ctl"+i+"_cbSelect"].checked)				
		{	
			if(document.getElementById("dg1__ctl" + i + "_lbDocNo").textContent != "")
			{
				if(document.all["dg1__ctl" + i + "_txCloseDate"].value == "")
				{
					jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+(i-1)+"結案日期不可為空白"])),"");
					HasChecked = false;
				}				
				intCount++;
			}
		}
		if (document.getElementById("dg1__ctl" + i + "_lbDocNo").textContent == "")
		{
			isEmptyCount++;
		}
	}
	if (isEmptyCount==30)	//David	95.05.05
	{
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請先執行查詢功能"])),"");
		HasChecked = false;
	}
	
	if (intCount==0 && isEmptyCount != 30)
	{ 
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆明細資料以更新結案日期"])),"");
		HasChecked = false;
	}
	return HasChecked;
}
function txDocNo_onblur()
{
	var strDocNo = jf_Trim(document.all["txDocNo"].value);
	
	if (strDocNo != "")
	{
		if (document.all["cbAdd"].checked == true)
		{	
			if(CheckDocNoExist(strDocNo) == false)
			{
			    document.all["txhidden"].value = "1";
			    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			    IsServerHandling = true;
				__doPostBack('txhidden','');
			}
		}
	
	}
}

/*檢查文號是否已存在*/
function CheckDocNoExist(strDocNo)
{
	if (document.all.dg1.rows.length == 0)
		return false;
	if (document.all.dg1 == null)
		return false;
	for (var RowCount=2 ; RowCount<document.all.dg1.rows.length+1; RowCount++)
	{
		if (document.all["dg1__ctl"+RowCount+"_lbDocNo"].textContent == strDocNo)
		{
			jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號："+strDocNo+"已存在於捲動區中，不允許再加入"])),"");
			return true;
		}
	}
	return false;
}
/*確認鍵*/
function btConfirmProc()
{
	var strDocNo = jf_Trim(document.all["txDocNo"].value);
	if (strDocNo != "")
	{
		if (document.all["cbAdd"].checked == false)
		{
			if(CheckDocNoExist(strDocNo) == false)
			{
			    document.all["txhidden"].value = "1";
			    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			    IsServerHandling = true;
				__doPostBack('txhidden','');
				//Page_BlockSubmit=false;	
			}
		}
	
	}
}
function CheckBeforeDeleteSelected(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return false;

	//至少要勾選一筆才return true
	for (iRow=2;iRow<document.all[argTableName].rows.length+1;iRow++)
	{
		if (document.all[argTableName + "__ctl" + iRow + argCheckBoxName].checked)
			return true;
	}
	return false;
}
//95.11.13 940821 David
//補0
function CallPadFunc(strObjName)
{	
	switch(strObjName)
	{		
		case "txIssueDateS":						
		case "txIssueDateE":		
		case "txCloseDateS":
		case "txCloseDateE":
		case "txUpdateCloseDate":
			if(document.all[strObjName].value != "")
			{				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,7,"0");				
			}
			break;					
	}	
}
//95.11.13 940821 David
function UpdDataGridDate()
{
	var CurrCount = document.all.dg1.rows.length;
	for(i=2;i<CurrCount+1;i++)
	{
		if(document.all["dg1__ctl"+i+"_cbSelect"].checked)
			document.all["dg1__ctl"+i+"_txCloseDate"].value = document.all["txUpdateCloseDate"].value;
	}
}