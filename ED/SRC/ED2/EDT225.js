/*
DATE	SA		PRG		MGR_NO			DESC
1140722	David	Joe		1140865			新增本作業(Merge屏東版)
1141022	Joe		Joe		自測修正		調整回傳資料排除空格
1141117	David	David	序373			修正初始化會稿單位清單邏輯，避免重複加入會辦詞彙
1141224	David	David	1141509			修正開啟會稿單位設定視窗資料傳遞方式，改由母視窗變數取得
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

//紀錄目前ID最大值，for新增DG資料用
var nTableRowMax;
var bChange;
var dgColumnLength = 2;
var SeqCustom = 0;
var uDoubleRowColor = "#C9F5F3";//雙數列底色
var uSingleRowColor = "#FFFFFF";//單數列底色
//樹、root變數
var zTree;
var root;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	initTree();
	nTableRowMax = document.all.dg1.rows.length;
	SetDg();
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
		case "btAddDept":
			Page_BlockSubmit = true;
			fnAddDept();
			bChange = true;//紀錄是否有異動
			break;
		case "btAddCustom":
			Page_BlockSubmit = true;
			if (document.all.txCustom.value == "")
				alert('請於「自行輸入」欄位填寫會稿單位名稱');
			else
			{
				AddDatagrid(SeqCustom + 10000, document.all.txCustom.value, "", "", "")
				SeqCustom++;
				document.all.txCustom.value = '';
				bChange = true;//紀錄是否有異動
			}
			break;
		case "btDgSelectAll":
			Page_BlockSubmit = true;
			fnSelectAll();
			break;
		case "btDgInverse":
			Page_BlockSubmit = true;
			fnSelectInverse();
			break;
		case "btDgDelete":
			Page_BlockSubmit = true;
			fnDelete();
			break;
		case "btDgMoveUp":
			Page_BlockSubmit = true;
			fnMoveUp();
			break;
		case "btDgMoveDown":
			Page_BlockSubmit = true;
			fnMoveDown();
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
	{
		Page_BlockSubmit = true;
		return;
	}
	
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
			CallEdit();
			break;
		case "btCancel":
			Page_BlockSubmit = true;
			if(!bChange)
				parent.$('#simplemodal-container a.simplemodal-close').trigger('click');
			else if(window.confirm("您已修改過內容,確定要取消嗎?"))
				parent.$('#simplemodal-container a.simplemodal-close').trigger('click');
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
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

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function initTree()
{
	BuildTree("Classtree", "H_JsonData");
}

function BuildTree(treeId, DataKey)
{
	var setting = {
		data: {
			simpleData: {
				enable: true
			}
		},
		view: {
		},
		callback: {
			onClick: SetCheck
		},
		check: {
			enable: true,
			chkboxType: { "Y": "", "N": "" }
		}
	};

	if (document.all[DataKey + '000'])
		document.all[DataKey].value = document.all[DataKey + '000'].value;

	if (document.all[DataKey].value != "" && document.all[DataKey + '000']) {

		document.all[DataKey].value = document.all[DataKey].value.replace(/&quot;/g, "\"");
		var zNodes = JSON.parse('[' + document.all[DataKey].value + ']');

		var nJsonDataCnt = document.all[DataKey + 'Cnt'].value;
		for (let i = 1; i <= nJsonDataCnt; i++) {
			let idx = jf_PADL(i + '', 3, '0');

			document.all[DataKey + idx].value = document.all[DataKey + idx].value.replace(/&quot;/g, "\"");
			zNodes = zNodes.concat(JSON.parse('[' + document.all[DataKey + idx].value + ']'));
		}

		$.fn.zTree.init($("#" + treeId), setting, zNodes);

		zTree = $.fn.zTree.getZTreeObj(treeId);
		if (treeId == "Classtree")
		{
			root = zTree.getNodes()[0];
			root.nocheck = true;
			zTree.expandNode(root, true, false, false, false)
		}
		else{
			root = zTree.getNodes()[0];
			if(root.id == document.all.PTHG_ORGNO.value)
				root.nocheck = true;
		}
		zTree.refresh();
	}
}

function fnAddDept() {
	var rootList = zTree.getNodes();
	for(var i = 0; i < rootList.length;i++)
	{
		root = rootList[i];
		fnAddToGrid(root);
	}
	zTree.checkAllNodes(false);
}
function fnAddToGrid(node)
{
	if (node.checked)
		AddDatagrid(node.id, node.name, node.deptname, node.sectname, "");

	if (node.children)
	{
		for (var j = 0; j < node.children.length; j++)
			fnAddToGrid(node.children[j]);
	}
}

function AddDatagrid(DeptNo , Showname, deptname, sectname, Type)
{
	var CoworkText = document.all.dlCoworkWord.selectedOptions[0].text
	//1141117 David 序373 修正初始化會稿單位清單邏輯，避免重複加入會辦詞彙
	if(Showname.indexOf('-') == -1)
		Showname = CoworkText != "" ? CoworkText + " - " + Showname : Showname;
	var InsertIndex = document.all.dg1.rows.length;
	var NewRow = document.all.dg1.insertRow(InsertIndex);
	for (var j = 0; j < 2; j++)
		document.all.dg1.rows[InsertIndex].insertCell(j);
	nTableRowMax++;

	var strInnerHtml = "";
	strInnerHtml += "<INPUT id=\"txDept" + nTableRowMax + "\" type=\"hidden\" name=\"txDept" + nTableRowMax + "\" value=\"" + DeptNo + "\">";
	strInnerHtml += "<INPUT id=\"txDeptName" + nTableRowMax + "\" type=\"hidden\" name=\"txDeptName" + nTableRowMax + "\" value=\"" + deptname + "\">";
	strInnerHtml += "<INPUT id=\"txSectName" + nTableRowMax + "\" type=\"hidden\" name=\"txSectName" + nTableRowMax + "\" value=\"" + sectname + "\">";

	//選+隱藏欄位
	document.all.dg1.rows[InsertIndex].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\">" + strInnerHtml;
	//單位
	document.all.dg1.rows[InsertIndex].cells[1].innerHTML = htmlencode(Showname);

	$(NewRow).attr('style', 'text-align:center');
}

function htmlencode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}

//全選的FUNCTION
function fnSelectAll() {
	for (var i = 1; i < document.all.dg1.rows.length; i++) {
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if (cbCheckObj && !cbCheckObj.disabled)
			cbCheckObj.checked = true;
	}
}

//反向的FUNCTION
function fnSelectInverse() {
	var len = document.all.dg1.rows.length;
	for (var i = 1; i < len; i++) {
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if (cbCheckObj && !cbCheckObj.disabled)
			cbCheckObj.checked = !cbCheckObj.checked;
	}
}

//刪除
function fnDelete() {
	if (!IsRowSelected())
		return;

	for (var i = document.all.dg1.rows.length - 1; i > 0; i--)//刪除時要由大到小逐一刪除
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if (cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked) {
			document.all.dg1.deleteRow(i);
		}
	}
	bChange = true;//紀錄是否有異動
}

function CheckTop(argIndex) {
	if (argIndex == 1)
		return true;

	var cbCheckObj = document.all.dg1.rows[argIndex - 1].cells[0].childNodes[0];
	if (cbCheckObj && cbCheckObj.disabled)
		return true;

	return false;
}

function fnMoveUp() {
	if (!IsRowSelected()) return;

	var nRowSelectedIndex = GetelectedIndex();

	if (CheckTop(nRowSelectedIndex[0])) {
		alert('已至最上筆');
		return;
	}

	var len = nRowSelectedIndex.length;
	for (var i = 0; i < len; i++)//由小到大移動
	{
		var idx = nRowSelectedIndex[i];
		fnExchangeTableRow(idx, idx - 1);
		nRowSelectedIndex[i] = idx - 1;
	}
	bChange = true;//紀錄是否有異動
}

function fnExchangeTableRow(nRowIdxSelected, nRowIdxNext) {
	var pTmpAry = Array()
	var bNowItemChecked = false;//紀錄原本的"選"是否勾選
	var bNextItemChecked = false;//紀錄要被交換的"選"是否勾選

	//keep target row(nRowIdxNext) value
	for (var i = 0; i < dgColumnLength; i++) {
		pTmpAry[i] = document.all.dg1.rows[nRowIdxNext].cells[i].innerHTML;
		if (i == 0)//紀錄原本的"選"是否勾選
		{
			var cbNextSelectCheckObj = document.all.dg1.rows[nRowIdxNext].cells[0].childNodes[0];
			bNextItemChecked = cbNextSelectCheckObj.checked;
		}
	}
	//Set Target row value = selected row value
	for (var i = 0; i < dgColumnLength; i++) {
		if (i == 0)//紀錄要被交換的"選"是否勾選
		{
			var cbNowSelectCheckObj = document.all.dg1.rows[nRowIdxSelected].cells[0].childNodes[0];
			bNowItemChecked = cbNowSelectCheckObj.checked;
		}

		document.all.dg1.rows[nRowIdxNext].cells[i].innerHTML = document.all.dg1.rows[nRowIdxSelected].cells[i].innerHTML;

		if (i == 0) {
			var cbNowSelectCheckObj = document.all.dg1.rows[nRowIdxNext].cells[0].childNodes[0];
			cbNowSelectCheckObj.checked = bNowItemChecked;
		}
	}

	//Set source row = target row old value
	for (var i = 0; i < dgColumnLength; i++) {
		document.all.dg1.rows[nRowIdxSelected].cells[i].innerHTML = pTmpAry[i];
		if (i == 0) {
			var cbNextSelectCheckObj = document.all.dg1.rows[nRowIdxSelected].cells[0].childNodes[0];
			cbNextSelectCheckObj.checked = bNextItemChecked;
		}
	}
}

function fnMoveDown() {
	if (!IsRowSelected()) return;

	var nRowSelectedIndex = GetelectedIndex();

	var endIdx = nRowSelectedIndex[nRowSelectedIndex.length - 1];
	if (endIdx == document.all.dg1.rows.length - 1) {
		alert('已至最末筆');
		return;
	}

	var len = nRowSelectedIndex.length - 1;
	for (var i = len; i > -1; i--)//由大到小移動
	{
		var idx = nRowSelectedIndex[i];
		fnExchangeTableRow(idx, idx + 1);
		nRowSelectedIndex[i] = idx + 1;
	}
	bChange = true;//紀錄是否有異動
}

function GetelectedIndex() {
	var rtnArr = new Array();
	for (var i = 1; i < document.all.dg1.rows.length; i++) {
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if (cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked)
			rtnArr.push(i);
	}
	return rtnArr;
}


//判斷是否選取
function IsRowSelected() {
	var bSelect = false;
	for (var i = 1; i < document.all.dg1.rows.length; i++) {
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if (cbCheckObj.checked) {
			bSelect = true;
			break;
		}
	}

	if (!bSelect) {
		alert("請先選擇會稿單位");
		return false;
	}
	return true;
}

function SetDg() {
	var MaxCustom = 10000;
	//1141224 David 1141509 修正開啟會稿單位設定視窗資料傳遞方式，改由母視窗變數取得
	//if (document.all.CoworkList.value != "") {
		//var Coworklist = document.all.CoworkList.value.split('|');
	if (parent.sConUnits != "") {
		var Coworklist = parent.sConUnits.split('|');
		for (var i = 0; i < Coworklist.length; i++) {
			var CoworkInfo = Coworklist[i].split(';');
			if (CoworkInfo.length != 5)
				continue;

			//1141022	Joe		自測修正		調整回傳資料排除空格
			// AddDatagrid(CoworkInfo[1], CoworkInfo[0] != "" ? CoworkInfo[0] + "-" + CoworkInfo[2] : CoworkInfo[2] , CoworkInfo[3], CoworkInfo[4], CoworkInfo[0]);
			AddDatagrid(CoworkInfo[1], CoworkInfo[0] != "" ? CoworkInfo[0] + " - " + CoworkInfo[2] : CoworkInfo[2] , CoworkInfo[3], CoworkInfo[4], CoworkInfo[0]);
			
			if(CoworkInfo[1].length == 5){
				if(parseInt(CoworkInfo[1]) >= MaxCustom)
					MaxCustom = parseInt(CoworkInfo[1]) + 1;
			}
		}
    }
	//流水號從最大號+1開始編
	if(MaxCustom > 10000)
		SeqCustom = MaxCustom - 10000;
}

//回傳物件
function CallEdit() {
	var CoworkList = new Array();
	for (var i = 1; i < document.all.dg1.rows.length; i++) {
		//1141022	Joe		自測修正		調整回傳資料排除空格
		// var TypeAndDept = document.all.dg1.rows[i].cells[1].textContent.split('-');
		var TypeAndDept = document.all.dg1.rows[i].cells[1].textContent.replaceAll(' ','').split('-');
		if (TypeAndDept.length == 2) {
			CoworkList.push(TypeAndDept[0] + ';' + document.all.dg1.rows[i].cells[0].children[1].value + ';' + TypeAndDept[1]+ ';' + document.all.dg1.rows[i].cells[0].children[2].value + ';' + document.all.dg1.rows[i].cells[0].children[3].value);
		}
		else {
			CoworkList.push(';' + document.all.dg1.rows[i].cells[0].children[1].value + ';' + TypeAndDept[0] + ';' + document.all.dg1.rows[i].cells[0].children[2].value + ';' + document.all.dg1.rows[i].cells[0].children[3].value);
        }
	}
	var rtnobj =
	{
		CoworkList,
	};
	parent.$("#extdlg_close_btn").trigger("click", rtnobj);
}

function SetCheck(event, treeId, treeNode) {
	zTree.checkNode(treeNode, !treeNode.checked, false);
}