/*
DATE	    SA		PRG		MSG_NO		DESC
1130320		David	ClouD	1120976		新增本作業
1130415		David	Cloud	1120976		修改支援設定至二級單位
1130418		David	Cloud	1120976		修改全選部分單位會未存到問題
1131007     Kevin   Jason   1130941     航港局弱掃復掃修正Client Potential XSS
1131016		Kevin   Jason   1130941     弱掃修正Client Potential XSS
1140717	    Zen     Joeko	1141011		弱掃修正Client Potential XSS
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
//1130415	Cloud	1120976		修改支援設定至二級單位
var arrSpreadDept = "";//紀錄是否有單位須展開-該分層代碼僅設定給二級時，須展開，除了展示議題外也方便程式處理
AjaxPro.Request.prototype.timeout = function () {
	try {
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false) {
			this.abort();
		} else {
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error) {

	}
	finally {

	}
}




/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	
	if (document.all["SHOWDG"]) {
		document.all["dgDeptTR"].className = "dTR";
		InitDeptDg();
	}
	else
		document.all["dgDeptTR"].className = "hide";
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
		case "btSelectAll":
			Page_BlockSubmit = true;
			//1130415		Cloud	1120976		修改支援設定至二級單位
			//jf_SelectAll("dg1", "_cbSelect");
			SelectAll();
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			//1130415		Cloud	1120976		修改支援設定至二級單位
			//jf_SelectInverse("dg1", "_cbSelect");
			SelectInverse();
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			//1130415		Cloud	1120976		修改支援設定至二級單位
			//jf_SelectClear("dg1", "_cbSelect");
			SelectClear();
			break;
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
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	xObjectName = event.target.id;
	
	switch (xObjectName) {
		case "btOpen":
			if (document.all["txRespNo"].value == "") {
				alert("分層負責代碼不可空白");
				Page_BlockSubmit = true;
			}
			else {
				Page_BlockSubmit = false;
			}
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if (jf_CheckBeforSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			if (document.all["OPENBYEDM024"] && document.all["OPENBYEDM024"].value == "Y") {
				jf_CloseSelf();
			}
			else {
				Page_BlockSubmit = !jf_ConfirmCancel()
				jf_ToolBarSubmit(xObjectName);
			}
			break;
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
	}
}
//儲存前之欄位檢查
function jf_CheckBeforSave() {
	var bRtnbool = true;
	if (document.all.txRespNo.value == "") {
		alert('分層負責代碼不可為空白');
		bRtnbool = false;
	}
	if (!jf_CheckBlankAndAlert()) {
		alert('至少需勾選一筆單位。');
		bRtnbool = false;
	}
	return bRtnbool;
}
function jf_CheckBlankAndAlert() {
	var bckeck = false;
	//1130415 Cloud	1120976		修改支援設定至二級單位
	//for (var i = 2; i <= document.all.dg1.rows.length; i++) {
	//	//至少需勾選一筆
	//	if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
	//		bckeck = true;
	//		break;
	//	}
	//}
	//至少需勾選一筆 -且取得設定單位代碼
	//1130418		Cloud	1120976		修改全選部分單位會未存到問題
	const arrayDept = [];
	for (var i = 1; i < document.all.dgDept.rows.length; i++) {
		if (document.all["cbCheck" + i].checked == true) {
			bckeck = true;
			//1130418		Cloud	1120976		修改全選部分單位會未存到問題
			//if (document.all["h_txSaveDeptList"].value.indexOf(document.all["txOuId" + i].value) == -1) {
			if(!arrayDept.includes(document.all["txOuId" + i].value)){
				if (document.all["h_txSaveDeptList"].value != "")
					document.all["h_txSaveDeptList"].value += "|";
				document.all["h_txSaveDeptList"].value += document.all["txOuId" + i].value;
				arrayDept.push(document.all["txOuId" + i].value);
			}
			if (document.all["txOuId" + i].value.length == 2)//一級單位時取得所有二級單位一併寫入
			{
				for (var iDept = 0; iDept < document.all["dlAllDeptList"].length; iDept++) {
					var SectNo = document.all["dlAllDeptList"].options[iDept].value;
					//1130418		Cloud	1120976		修改全選部分單位會未存到問題
					//if (SectNo.length == 3 && SectNo.substring(0, 2) == document.all["txOuId" + i].value && document.all["h_txSaveDeptList"].value.indexOf(SectNo) == -1) {
					if (SectNo.length == 3 && SectNo.substring(0, 2) == document.all["txOuId" + i].value && !arrayDept.includes(document.all["txOuId" + i].value)) {
						if (document.all["h_txSaveDeptList"].value != "")
							document.all["h_txSaveDeptList"].value += "|";
						document.all["h_txSaveDeptList"].value += SectNo;
						arrayDept.push(SectNo);
					}
				}
			}
		}
	}
	return bckeck;
}
function CallBack(argCallerId) {

	if (argCallerId == "EDC024") {
		if (document.all["txRespNo"] != null) {
			document.all["txRespNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		}
	}	
	//清空lbReturnValue物件
	if (document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
	if (document.all["txRespNo"].value != "") { Page_BlockSubmit = false; jf_ToolBarSubmit("btOpen");}
		

}
function btResNo_Onclick() {
	var strRespNo = jf_Trim(document.all["txRespNo"].value);
	Page_BlockSubmit = true;
	var strUrl = "EDC024.aspx?rtnObj=lbReturnValue&nFrom=EDM026&MODE=1&argRespNo=" + strRespNo;
	jf_OpenChildWin(strUrl, "EDC024", 1360, 768);
}
//1130415	Cloud	1120976		修改支援設定至二級單位-S
var nDeptMaxRow = 1;
var nDeptInsertRow = 1;
var showName = "";
function InitDeptDg() {
	for (var i = document.all.dgDept.rows.length - 1; i > 0; i--)//刪除流程時要由大到小逐一刪除
	{
		document.all.dgDept.deleteRow(i);
	}
	for (var iDept = 0; iDept < document.all["dlDeptList"].length; iDept++) {
		//1131007   Jason	1130941 航港局弱掃復掃修正Client Potential XSS
		//AddDept(document.all["dlDeptList"].options[iDept].value, document.all["dlDeptList"].options[iDept].text, "D");
		//1131016    Jason   1130941     弱掃修正Client Potential XSS
		//AddDept(document.all["dlDeptList"].options[iDept].value, HtmlEncode(document.all["dlDeptList"].options[iDept].text), "D");
		AddDept(HtmlEncode(document.all["dlDeptList"].options[iDept].value), HtmlEncode(document.all["dlDeptList"].options[iDept].text), "D");
	}
	var speardList = arrSpreadDept.split('|');
	for (var iSpeard = 0; iSpeard < speardList.length; iSpeard++) {
		if (speardList[iSpeard] != "") {
			fnSpread(speardList[iSpeard]);
		}
	}
}
function AddDept(argOuId, argOuName, argType) {
	var InsertIndex = nDeptInsertRow;
	var NewRow = document.all.dgDept.insertRow(InsertIndex);

	for (var j = 0; j < 2; j++)
		document.all.dgDept.rows[InsertIndex].insertCell(j);

	//隱藏欄位
	//1131016    Jason   1130941     弱掃修正Client Potential XSS
	//strInnerHtml = "<INPUT id=\"txOuId" + nDeptMaxRow + "\" type=\"hidden\" name=\"txOuId" + nDeptMaxRow + "\" value=\"" + argOuId + "\">";
	strInnerHtml = "<INPUT id=\"txOuId" + nDeptMaxRow + "\" type=\"hidden\" name=\"txOuId" + nDeptMaxRow + "\" value=\"" + HtmlEncode(argOuId) + "\">";
	strInnerHtml += "<INPUT id=\"txSpread" + nDeptMaxRow + "\" type=\"hidden\" name=\"txSpread" + nDeptMaxRow + "\" value=\"N\">";

	//選+隱藏欄位-判斷是否勾選
	//判斷單位是否存在有用隱藏欄位裡
	var DeptList = document.all["h_txOpenDeptList"].value.split('|');
	var bCheck = "";
	for (var iDept = 0; iDept < DeptList.length; iDept++) {
		if (DeptList[iDept] != "") {
			//相同則勾選
			if (argOuId == DeptList[iDept] ) {
				bCheck = "checked='checked'";
			}
			//有設定二級的單位則紀錄須展開
			if (argType == "D" && DeptList[iDept].length==3 && argOuId == DeptList[iDept].substring(0, 2)) {
				if (arrSpreadDept != "")
					arrSpreadDept += "|";
				arrSpreadDept += nDeptMaxRow.toString();
				break;
			}
		}
	}
	document.all.dgDept.rows[nDeptInsertRow].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nDeptMaxRow + "\" type=\"checkbox\" " + bCheck+" >" + strInnerHtml;

	if (argType == "S")
		argOuName = "&nbsp;&nbsp;" + argOuName;
	if (argType == "D")//一級單位才要提供超連結
	{
		//1131016    Jason   1130941     弱掃修正Client Potential XSS
		//document.all.dgDept.rows[nDeptInsertRow].cells[1].innerHTML = "<a href=\"javascript:fnSpread('" + nDeptMaxRow + "')\">" + argOuName + "</a>";
		document.all.dgDept.rows[nDeptInsertRow].cells[1].innerHTML = "<a href=\"javascript:fnSpread('" + nDeptMaxRow + "')\">" + HtmlEncode(argOuName) + "</a>";
	}
	else
		//1140717    Joeko	1141011		弱掃修正Client Potential XSS
		/*document.all.dgDept.rows[nDeptInsertRow].cells[1].innerHTML = argOuName;*/
		document.all.dgDept.rows[nDeptInsertRow].cells[1].innerHTML = HtmlEncode(argOuName);

	$(NewRow).attr('style', 'text-align:left');
	nDeptMaxRow++;
	nDeptInsertRow++;
}

function fnGetDgDpetInsertRowIndex(argMastRowId) {
	var nDeptInsertRow = 1;
	for (var i = 1; i < document.all.dgDept.rows.length; i++) {
		if (document.all.dgDept.rows[i].cells[0].childNodes[0].id == "cbCheck" + argMastRowId) {
			nDeptInsertRow = i + 1;
			break;
		}
	}
	return nDeptInsertRow;
}
function fnSpread(argRowId) {
	//單位已展開
	if (document.all["txSpread" + argRowId].value == "Y") {
		fnClosed(argRowId);
		return;
	}
	nDeptInsertRow = fnGetDgDpetInsertRowIndex(argRowId);
	document.all["txSpread" + argRowId].value = "Y";
	//1131007   Jason	1130941 航港局弱掃復掃修正Client Potential XSS
	//var SpreadList = ED0.EDM026.GetSectInfo(document.all.OrgNo.value, document.all["txOuId" + argRowId].value).value;
	//1131016    Jason   1130941     弱掃修正Client Potential XSS
	//var SpreadList = ED0.EDM026.GetSectInfo(HtmlEncode(document.all.OrgNo.value), HtmlEncode(document.all["txOuId" + argRowId].value)).value;
	var SpreadList = ED0.EDM026.GetSectInfo(document.all.OrgNo.value, document.all["txOuId" + argRowId].value).value;
	if (SpreadList) {
		if (SpreadList.bSuccess) {
			if (SpreadList.DeptInfo.length > 0) {
				for (var iDept = 0; iDept < SpreadList.DeptInfo.length; iDept++) {
					var strDept = SpreadList.DeptInfo[iDept];
						AddDept(strDept.split('|')[0], strDept.split('|')[1], "S");
				}
			}
		}
		else {
			alert(SpreadList.ErrMsg);
		}
	}
	nDeptInsertRow = 0;
}

//展開後收起功能
function fnClosed(argRowId) {
	var DeptNo = document.all["txOuId" + argRowId].value;

	for (var i = document.all.dgDept.children[0].children.length - 1; i > 0; i--) {
		//同單位科別的資料刪除
		if (document.all.dgDept.children[0].children[i].children[0].children[1].value.length == 3 && document.all.dgDept.children[0].children[i].children[0].children[1].value.substring(0, 2) == DeptNo)
			document.all.dgDept.children[0].children[i].remove();
	}
	document.all["txSpread" + argRowId].value = 'N';
}
//全部選取
function SelectAll() {
	if (document.all["dgDept"] == null)
		return;

	var len = document.all["dgDept"].rows.length;
	for (i = 1; i < len; i++) {
		var obj = document.all["cbCheck" + i];
		if (obj.disabled == false)
			obj.checked = true;
	}
}

//反向選取
function SelectInverse() {
	if (document.all["dgDept"] == null)
		return;

	var len = document.all["dgDept"].rows.length ;
	for (i = 1; i < len; i++) {
		var obj = document.all["cbCheck" + i];
		if (obj.disabled == false) {
			if (obj.checked)
				obj.checked = false;
			else
				obj.checked = true;
		}
	}
}

//清除選取
function SelectClear() {
	if (document.all["dgDept"] == null)
		return;

	var len = document.all["dgDept"].rows.length;
	for (i = 1; i < len; i++) {
		var obj = document.all["cbCheck" + i];
		if (obj.disabled == false)
			obj.checked = false;
	}
}
//1130415	Cloud	1120976		修改支援設定至二級單位-E

//1131007   Jason	1130941 航港局弱掃復掃修正Client Potential XSS
function HtmlEncode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}

