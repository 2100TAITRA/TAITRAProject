/*
DATE	SA		PRG		MGR_NO			DESC
1140717	Joe		Daniel	1140382			新增受文者查詢功能，新增子視窗
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
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e) {
	var xObjectName = e.target.id;
	if (IsServerHandling)
		return;

	//檢查是否TimeOut
	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}
	switch (xObjectName) {

	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event) {
	var xObjectName;
	var evBtn;

	if (IsServerHandling)
		return;

	//檢查是否TimeOut
	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}
	xObjectName = event.target.id;

	switch (xObjectName) {
		case "btSearch":
			Page_BlockSubmit = true;
			SearchDict();
			break;
	}
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function ReturnValue(argLink) {
	try {
		opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].value = argLink;
		opener.window.CallBack("ODT382C1");
		opener.window.focus();
		close();
	}
	catch (e) {
		alert(e);
	}
}
function SearchDict() {

	var dgRow = document.querySelectorAll('#dg1 tr');
	var DocNo = document.querySelectorAll('#dg1 tr td:nth-child(2)');
	var Dept = document.querySelectorAll('#dg1 tr td:nth-child(3)');
	var strDocNo = document.querySelector('input[name="txDocNo"]').value.trim();
	var strDept = document.querySelector('input[name="txSendDept"]').value.trim();
	var count = 1;

	for (var i = 1; i < dgRow.length; i++) {
		if ((strDocNo != "" && !DocNo[i].innerText.trim().includes(strDocNo)) || (strDept != "" && !Dept[i].innerText.trim().includes(strDept))) {
			dgRow[i].className = "hide";
			document.querySelectorAll(`#dg1__ctl${i}_lbSeqNo`).innerText = "";
		}
		else {
			dgRow[i].className = "visible";
			document.querySelectorAll(`#dg1__ctl${i}_lbSeqNo`).innerText = count.toString();
			count++;

			if (count % 2 === 0) {
				dgRow[i].style.backgroundColor = "#FFFFFF";
			} else {
				dgRow[i].style.backgroundColor = "#E1F0F8";
			}

		}
	}
}