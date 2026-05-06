/*	DATE	SA		PRG		MGR_NO		DESC
 * 1020523	Leslie	Cloud	1020016		修改取得可用程式選單方式，改由呼叫Authws的GetUserPrograms
 * 1050523	Kevin	Kevin_C	1050315		使用標準程序在AJAX內取得Session
 * 1050616	Kevin	Joe		1050087		變更組織樹寫法
 * 1141014	Zen		Andy	1131229		組織樹重構，改以JSON字串紀錄
 * */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050616	Joe		變更組織樹寫法，沒用到Ajax--START--
/*
//2014.12.05	Cloud	新版AJAX非同步時會有TIMEOUT異常，增加此段避開異常-S
AjaxPro.Request.prototype.timeout = function ()
{
	try
	{
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false)
		{
			this.abort();
		}
		else
		{
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error)
	{

	}
	finally
	{

	}
}
//2014.12.05	Cloud	新版AJAX非同步時會有TIMEOUT異常，增加此段避開異常-E
*/
//1050616	Joe		變更組織樹寫法，沒用到Ajax--START--

//1050616	Joe		變更組織樹寫法--START--
/*
//NodeInfo物件宣告
function NodeInfo()
{
	this.type = "";
	this.name = "";
	this.path = "";
}

//此Func的功能在設定Tree中的根節點與其子節點的資料
function fnSetFirstLevelOfTree()
{
	var path = "";

	if (document.all["dlAppInfo"] && document.all["dlAppInfo"].options.length > 0)
	{
		var arrInfo = document.all["dlAppInfo"].options[0].value;//.split(SPLIT);
		if (arrInfo != null && arrInfo.length >= 2)
			path = arrInfo[1];
	}
	foldersTree = gFld("<i>應用程式選單</i>", "", false, "", "");
	var nodeInfoObj = new NodeInfo();
	nodeInfoObj.type = "appset";

	nodeInfoObj.path = path;
	foldersTree.nodeInfo = nodeInfoObj;

	SetAppInfo();
}

function fnQueryForChildNode(argFolderId)
{
	//取得父節點
	var ParentFolderObj = findObj(argFolderId);
	var path = ParentFolderObj.nodeInfo.path;

	//1020523	Cloud	[1020016]	修改取得程式清單方式
	//var result = IFC050.GetPartOfAppset(path);
	// 1020523	Leslie	Cloud	1020016		修改取得可用程式選單方式，改由呼叫Authws的GetUserPrograms
	//var result = IFC050.GetPartOfAppset(path,document.all.txArtifa.value);
	//1050523	Kevin_C	1050315	使用標準程序在AJAX內取得Session
	//var result = IF1.IFC050.GetPartOfAppset(path,document.all.txArtifa.value);
	var result = IF1.IFC050.GetPartOfAppset(jf_GetSessionID(), path, document.all.txArtifa.value);

	if (result.value != null)
	{
		var IsLastnode = 0;

		var rtn = result.value;
		for (var i = 0; i < rtn.length; i++)
		{
			//1020523	Cloud	[1020016] 判斷回傳值是否為null
			if (rtn[i][0] != null)
			{
				if (i == rtn.length - 1)
					IsLastnode = 1;

				var nodeInfoObj = new NodeInfo();
				nodeInfoObj.type = "app";
				if (rtn[i][0] == "appset")
					nodeInfoObj.type = "appset";

				//改變節點圖示
				var ImgFileName = "";
				if (nodeInfoObj.type == "app")
					ImgFileName = "icon_exefile.gif";

				//產生子節點並加入父節點中
				var childObj = insFld(ParentFolderObj, gFld(rtn[i][1], "", true, ImgFileName, ImgFileName));
				nodeInfoObj.name = rtn[i][1];
				nodeInfoObj.path = rtn[i][2];
				childObj.nodeInfo = nodeInfoObj;
				//紀錄子節點其子節點數(用於顯示圖形之用)
				childObj.preGetChildrenCount = rtn[i][3];
				childObj.initialize(ParentFolderObj.level + 1, IsLastnode, fnGetChildLeftSide(ParentFolderObj));
			}
		}
	}
	else
		alert(result.error);
}
*/

//1050616	Joe		變更組織樹寫法--END--
/*****************************************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	if (document.all["ValidationSummary1"].textContent != "")
		alert(document.all["ValidationSummary1"].textContent);
}

function ClientButtonControl()
{
	Page_BlockSubmit = true;
}

function ClientOnLoad()
{

	var nHeight = window.document.body.clientHeight - window.document.all['tbMain'].offsetHeight;
	window.document.all['TheGreatTV'].style.height = nHeight;
	//fnResizeTreeView();
	if (document.all["AlertMsgForNonePriv"])
		if (document.all["AlertMsgForNonePriv"].value == "1")
			CloseWin("您沒有足夠權限");
	//ShowMsg();

	//BuildTreeView();
	/*if(document.all["DefaultOrgNo"])
		jf_SaveCookie("ckOrgNo", document.all["DefaultOrgNo"].value);*/
	//1141014	Andy	1131229	調整組織樹寫法改以JSON組合
	var setting = {
		data: {
			simpleData: {
				enable: true
			}
		},
		view: {
		},
		callback: {
			onClick: RtnValue
		}
	};

	if (document.all['H_JsonData000'])
		document.all['H_JsonData'].value = document.all['H_JsonData000'].value;

	if (document.all.H_JsonData.value != "" && document.all['H_JsonData000']) {

		document.all.H_JsonData.value = document.all.H_JsonData.value.replace(/&quot;/g, "\"");
		var zNodes = JSON.parse('[' + document.all.H_JsonData.value + ']');

		var nJsonDataCnt = document.all['H_JsonDataCnt'].value;
		for (let i = 1; i <= nJsonDataCnt; i++) {
			let idx = jf_PADL(i + '', 3, '0');

			document.all['H_JsonData' + idx].value = document.all['H_JsonData' + idx].value.replace(/&quot;/g, "\"");
			zNodes = zNodes.concat(JSON.parse('[' + document.all['H_JsonData' + idx].value + ']'));
		}

		$.fn.zTree.init($("#Classtree"), setting, zNodes);
	}
}

function HighlightNode(argPath, argName, argType)
{
	//只能選擇應用程式類別
	if (argType == 'APP')
	{
		DlgCallBack(argPath, argName);
		DlgClose();
	}
	else
	{
		alert('請選擇應用程式');
	}
}

//1141014	Andy	1131229	調整組織樹寫法改以JSON組合
function RtnValue(event, treeId, treeNode) {
	HighlightNode(treeNode.id, treeNode.name, treeNode.type);
}

//1050616	Joe		變更組織樹寫法--START--
/*
function BuildTreeView()
{
	fnSetFirstLevelOfTree(); //設定TreeView第一層資料
}

function OnWSResult(argResult)
{
	if (argResult.error)
	{
		alert(argResult.errorDetail.string);
		return;
	}
}

//1020523	Cloud	[1020016] 修正呼叫位置
//var result = IFC050.GetPartOfAppset(document.all["txAppSetRootPath"].value);

function SetAppInfo()
{
	document.all.TheGreatTV.innerHTML = "";
	//1020523	Cloud	[1020016] 修正呼叫位置
	//1050523	Kevin_C	1050315	使用標準程序在AJAX內取得Session
	//var result = IF1.IFC050.GetPartOfAppset(document.all["txAppSetRootPath"].value,document.all.txArtifa.value);
	var result = IF1.IFC050.GetPartOfAppset(jf_GetSessionID(), document.all["txAppSetRootPath"].value, document.all.txArtifa.value);

	if (result.value != null)
	{

		var ParentFolderObj = findObj(0);
		var rtn = result.value;
		for (var i = 0; i < rtn.length; i++)
		{
			//1020523	Cloud	[1020016] 判斷回傳值是否為null
			if (rtn[i][0] != null)
			{
				var nodeInfoObj = new NodeInfo();
				nodeInfoObj.type = "app";
				if (rtn[i][0] == "appset")
					nodeInfoObj.type = "appset";
				//改變節點圖示
				var ImgFileName = "";
				if (nodeInfoObj.type == "app")
					ImgFileName = "icon_exefile.gif";
				//產生子節點並加入父節點中
				var childObj = insFld(foldersTree, gFld(rtn[i][1], "", true, ImgFileName, ImgFileName));
				nodeInfoObj.name = rtn[i][1];
				nodeInfoObj.path = rtn[i][2];
				childObj.nodeInfo = nodeInfoObj;
				//設定此子節點的子節點數
				childObj.preGetChildrenCount = rtn[i][3];
			}
		}
	}
	else
	{
		alert(result.error);
		return;
	}
	GenTree(); //產生TreeView
}
*/
//因為沒有Toolbar
function jf_MenuInit() { }

//1050616	Joe		變更組織樹寫法--START--
/*
function fnResizeTreeView()
{
	var nHeight = window.document.body.clientHeight - window.document.all['tbMain'].offsetHeight;
	window.document.all['divForTreeView'].style.height = nHeight;
}

function fnRefreshChildNodes()
{
	fnRefreshClickedFolder();//呼叫ftiens4.js中函式
}

function CloseWin(argMsg)
{
	parent.CloseWin(argMsg);
}

//Start	回傳物件的宣告	
function CApp()
{
	this.Name = "";
	this.Path = "";
}

//此Func的功能在處理"按到節點的圖片或文字時要做的事"
function fnOhHeClickTheFolder(argFolderId)
{
	var folderObj = findObj(argFolderId);
	var AdPath = folderObj.nodeInfo.path;

	if (folderObj.nodeInfo.type == "app")
	{
		var retApp = new CApp();
		retApp.Name = folderObj.nodeInfo.name;
		retApp.Path = folderObj.nodeInfo.path;
		if (IsFrame())
		{
			//frames
			if (window.parent.parent.fnAddTarget)
				window.parent.parent.fnAddTarget(retApp);
		}
		else
		{
			returnValue = retApp;
			window.opener = window.parent;
			window.close();
			return;
		}
	}
	else
	{
		alert("請選擇應用程式。");
	}
}

function IsFrame()
{
	if (window.parent.parent != window.parent)
		return true;
	return false;
}

function findObj(id)
{
	var i = 0;
	var nodeObj;
	if (typeof foldersTree.xID != "undefined")
	{
		nodeObj = indexOfEntries[i];
		for (i = 0; i < nEntries && indexOfEntries[i].xID != id; i++) //may need optimization
			;
		id = i
	}
	if (id >= nEntries)
		return null; //example: node removed in DB
	else
		return indexOfEntries[id];
}

function GenTree()
{
	//產生TreeView
	initializeDocument();
}
*/