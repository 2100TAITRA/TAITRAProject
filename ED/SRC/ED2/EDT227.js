/*
DATE	SA		PRG		MGR_NO			DESC
1140722	David	Joe		1140865			新增本作業
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
	initSelect();
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
			parent.$("#PDoc_CoWWKFDialog #btn_PDocCoWWKFCancel").trigger('click');
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

var InitOuList;
function initSelect()
{
	InitOuList = document.all.OuList.value.split('|');
	var rootList = zTree.getNodes();
	for (var i = 0; i < rootList.length; i++) {
		root = rootList[i];
		fnGetSelectObj(root);
	}
}
function fnGetSelectObj(node) {
	let bSelect = InitOuList.includes(node.id);
	let bRtn = false;
	if (bSelect)
	{
		zTree.checkNode(node, true, false);
		bRtn = true;
	}

	if (node.children) {
		for (var j = 0; j < node.children.length; j++)
		{
			if(fnGetSelectObj(node.children[j]) == true)
				zTree.expandNode(node, true, false, false, false);
		}
	}
	
	return bRtn;
}

//回傳物件
var rtnOuList = '';
var rtnOuListStamp = '';
function CallEdit() {
	var rootList = zTree.getNodes();
	for (var i = 0; i < rootList.length; i++) {
		root = rootList[i];
		fnGetRtnObj(root);
	}

	window.localStorage.MsCoworkRtn = rtnOuList;
	parent.$("#PDoc_CoWWKFDialog #btn_PDocCoWWKFDOK").trigger('click');
}

//點選單位名稱等同勾選Checkbox
function SetCheck(event, treeId, treeNode) {
	zTree.checkNode(treeNode, !treeNode.checked, false);
}

function fnGetRtnObj(node) {
	if (node.checked)
	{
		rtnOuList += rtnOuListStamp + node.id + ";" + node.name;
		rtnOuListStamp = "|";
	}

	if (node.children) {
		for (var j = 0; j < node.children.length; j++)
			fnGetRtnObj(node.children[j]);
	}
}