/*
DATE	SA		PRG		MGR_NO			DESC
1111207	Joe		Joe		1110828			新增程式
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

//記錄母視窗資料是哪一筆
var RowNum;
//紀錄是否有刪除欄位
var bChange = false;
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	RowNum = document.all.iParentRow.value
	document.all.lbIssueOrgName.textContent = parent.document.all["dg1__ctl" + RowNum + "_lbdgOrgName"].textContent;
	if (parent.document.all["dg1__ctl" + RowNum + "_txdgSourceType"].value == "1")
		document.all.lbIssueNo.textContent = parent.document.all["dg1__ctl" + RowNum + "_txdgDocNo"].value;
	
	jf_BuildDataGrid();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
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
		
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event)
{
	var xObjectName;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit = true;
			jf_Save();
			break;
		case "btDelete":
			Page_BlockSubmit = true;
			jf_deleteRow();
			break;
		case "btCancel":
			Page_BlockSubmit = true;
			if (!bChange)
				DlgClose();
			else if (window.confirm("您已修改過內容,確定要取消嗎?"))
				DlgClose();
			break;
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_BuildDataGrid() {
	if (parent.document.all["dg1__ctl" + RowNum + "_txdgCombineData"].value != "")
	{
		var CombineData = parent.document.all["dg1__ctl" + RowNum + "_txdgCombineData"].value.split('|');
		for(var iRow = 0 ; iRow < CombineData.length; iRow++){			
			var NewRow = document.all.dg1.insertRow(iRow+1);
			$(NewRow).attr('style', 'text-align:center');
			for (var j = 0; j < 4; j++)
				document.all.dg1.rows[iRow + 1].insertCell(j);
			document.all.dg1.rows[iRow + 1].cells[0].innerHTML = "<INPUT type=\"checkbox\" id=\"dg1__ctl" + (iRow + 2) + "_cbSelect\" \>";
			document.all.dg1.rows[iRow + 1].cells[1].innerHTML = iRow + 1;
			document.all.dg1.rows[iRow + 1].cells[2].innerHTML = CombineData[iRow].split('、')[0];
			document.all.dg1.rows[iRow + 1].cells[3].innerHTML = CombineData[iRow].split('、')[1];
		}
	}
	else
	{
		alert('無併封資料。');
		DlgClose();
	}
}

function jf_deleteRow() {
	var bDelete=false;
	for (var iRow = document.all.dg1.rows.length -1 ; iRow > 0 ; iRow--) {
		if (document.all.dg1.rows[iRow].cells[0].childNodes[0].checked) {
			bDelete = true;
			document.all.dg1.deleteRow(iRow);
			bChange = true;
		}
	}
	if (bDelete)
		jf_ResetSeq();
	else
		alert('請至少勾選一筆資料。');
}

function jf_ResetSeq() {
	for (var iRow = 0 ; iRow < document.all.dg1.rows.length; iRow++) {
		document.all.dg1.rows[iRow].cells[1].innerHTML = iRow;
	}
}

function jf_Save() {

	var OldCombineData = parent.document.all["dg1__ctl" + RowNum + "_txdgCombineData"].value.split('|');
	var NewCombineData = "";
	var NowRow = 0;
	for (var iData = 0 ; iData < OldCombineData.length; iData++) {
		for (var iRow = NowRow ; iRow < document.all.dg1.rows.length; iRow++) {
			if (OldCombineData[iData].split('、')[0] == document.all.dg1.rows[iRow].cells[2].innerHTML && OldCombineData[iData].split('、')[1] == document.all.dg1.rows[iRow].cells[3].innerHTML)
			{
				NewCombineData += OldCombineData[iData] + "|";
				NowRow++;
				break;
			}
		}
	}

	if (NewCombineData != "")
		NewCombineData = NewCombineData.substring(0, NewCombineData.length - 1);

	parent.document.all["dg1__ctl" + RowNum + "_txdgCombineData"].value = NewCombineData;
	DlgCallBack();
	DlgClose();
}