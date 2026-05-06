/*	DATE 	SA			PRG			MGR_NO	DESC
 *	1050602	Kevin		Joe 		1050087	二代公文修改
 *	1070906	Kevin		Justin		1070678	弱掃修正CookieHttpOnly
 *  1091124	Leslie		Leslie		1090885	取消網址列權杖
 *  1141015	Zen			Andy		1131229	組織樹重構，改以JSON字串紀錄
 */
//1050602	Joe		1050087		變更組織樹寫法--S
/*
//NodeInfo物件宣告
function NodeInfo()
{
	this.type	= "";
	this.path	= "";
}

//此Func的功能在設定Tree中的根節點與其子節點的資料
function fnSetFirstLevelOfTree()
{
	var path = "";
	if(document.all["dlAppInfo"] && document.all["dlAppInfo"].options.length > 0)
	{
		var arrInfo = document.all["dlAppInfo"].options[0].value.split(SPLIT);
		if(arrInfo != null && arrInfo.length >=2)
			path = arrInfo[1];
	}
	foldersTree = gFld("<i>應用程式選單</i>", "", false, "", "");
	var nodeInfoObj = new NodeInfo();
	nodeInfoObj.type = "appset";

	nodeInfoObj.path = path;
	foldersTree.nodeInfo = nodeInfoObj;

	SetAppInfo();
}

//此Func的功能在處理"按到節點的圖片或文字時要做的事"
function fnOhHeClickTheFolder(argFolderId)
{
	//if(argFolderId == 0)
		//return;
	var folderObj = findObj(argFolderId);
	var AdPath = folderObj.nodeInfo.path;

	var strPage = "IFM140.aspx";
	if(folderObj.nodeInfo.type == "appset")
		strPage = "IFM140_1.aspx";
	jf_SaveCookie("nObject", AdPath);
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), document.all["dlOrg"].value);
	ViewerReload(strPage + param);//II_LIB.js, 要求viewer reload
}


function fnQueryForChildNode(argFolderId)
{
	//取得父節點物件
	var ParentFolderObj = findObj(argFolderId);
	var path = ParentFolderObj.nodeInfo.path;

	var result = IFM140T1.GetPartOfAppset(path);

	if(result.value != null)
	{
		var IsLastnode = 0;

		var rtn = result.value;
		for(var i=0; i<rtn.length; i++)
		{
			if(i == rtn.length-1)
				IsLastnode = 1;

			var nodeInfoObj = new NodeInfo();
			nodeInfoObj.type = "app";
			if(rtn[i][0] == "appset")
				nodeInfoObj.type = "appset";

			//改變節點圖示
			var ImgFileName = "";
			if(nodeInfoObj.type == "app")
				ImgFileName = "icon_exefile.gif";

			//產生子節點並加入父節點中
			var childObj = insFld(ParentFolderObj, gFld(rtn[i][1], "", true, ImgFileName, ImgFileName));
			nodeInfoObj.path = rtn[i][2];
			childObj.nodeInfo = nodeInfoObj;
			//紀錄子節點其子節點數(用於顯示圖形之用)
			childObj.preGetChildrenCount = rtn[i][3];
			childObj.initialize(ParentFolderObj.level+1, IsLastnode, fnGetChildLeftSide(ParentFolderObj));
		}
	}
	else
		alert(result.error);
}
*/
//1050602	Joe		1050087		二代公文修改，變更組織樹寫法--E
/*****************************************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050602 Joe 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;


function ShowMsg()
{
	//1050602 Joe 1050087 二代公文修改
	// if (document.all["ValidationSummary1"].innerText != "")
		// alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

function ClientButtonControl()
{
	Page_BlockSubmit = true;
}
//1050602	Joe		1050087		二代公文修改，變更組織樹寫法--S
function HighlightNode(argPage, argNodeID, argNodeKey, argPath, argOrgNo)
{
	//1070906 Justin [1070678]弱掃修正CookieHttpOnly
	//jf_SaveCookie("nObject", argPath);
	//jf_SaveCookie("ckOrgNo", argOrgNo);
	jf_SetTreeViewMode(argNodeID);
	//1070906 Justin [1070678]弱掃修正CookieHttpOnly
	//parent.viewer.location = argPage + GetAllParamStr();
	var param = ReplaceParamStr(GetAllParamStr(), "nObject", argPath);
	parent.viewer.location = argPage + param;
}
//1050602	Joe		1050087		二代公文修改，變更組織樹寫法--E
//1070906 Justin [1070678]弱掃修正CookieHttpOnly
function ReplaceParamStr(argParamStr, argKey, argValue)
{
	if(argParamStr == "")
		//1091124	Leslie[1090885]	改掉無權杖時的判斷錯誤
		//return "";
		return "?" + argKey + "=" + argValue;
	if(typeof(argValue) == "undefined" || argValue == "")
		return argParamStr;

	var ret = "";
	var bStartWithQ = argParamStr.indexOf("?") == 0;
	if(bStartWithQ)
		argParamStr = argParamStr.replace("?", "");
	if(bStartWithQ)
		ret = "?";
		
	var bHasKeyParam = false;
	var arrPara = argParamStr.split("&");
	for(var i=0; i<arrPara.length; i++)
	{
		var arrOnePara = arrPara[i].split("=");
		if(arrOnePara[0].toUpperCase() == argKey.toUpperCase())
		{
			arrOnePara[1] = argValue;
			bHasKeyParam = true;
		}
		if(i != 0)
			ret += "&";
		ret += arrOnePara[0] + "=" + arrOnePara[1];
	}
	if(bHasKeyParam == false)
		ret += "&" + argKey + "=" + argValue;
	return ret;
}

function ClientOnLoad()
{	
	//1050602 Joe 1050087 二代公文修改
	//var nHeight = window.document.body.clientHeight - window.document.all['tbMain'].offsetHeight;
	var nHeight = window.document.documentElement.clientHeight - window.document.all['tbMain'].offsetHeight;
	//1050602 Joe 1050087 二代公文修改
	//window.document.all['TheGreatTV'].style.height = nHeight;
	window.document.all['divForTreeView'].style.height = nHeight+"px";
	//fnResizeTreeView();
	if(document.all["AlertMsgForNonePriv"])
		if(document.all["AlertMsgForNonePriv"].value == "1")
			CloseWin("您沒有足夠的權限");
	ShowMsg();	
	//1050602 Joe 1050087 二代公文修改
	//BuildTreeView();
	/*1070906 Justin [1070678]弱掃修正CookieHttpOnly
	if(document.all["DefaultOrgNo"])
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

		$.fn.zTree.init($("#tv"), setting, zNodes);
	}

	document.getElementById('TheGreatTV').textContent = "";		
}

//1141014	Andy	1131229	調整組織樹寫法改以JSON組合
function RtnValue(event, treeId, treeNode) {
	if (treeNode.type == "APP")
		HighlightNode('IFM140.aspx', treeNode.tId, treeNode.id, treeNode.id, '');
	else if (treeNode.type == "APPSET")
		HighlightNode('IFM140_1.aspx', treeNode.tId, treeNode.id, treeNode.id, '');

}

var argPrevId = null;
function jf_SetTreeViewMode(nNodeID) {
	if (document.getElementById(nNodeID + "_span").style.backgroundColor == '#ccccff')
		document.getElementById(nNodeID + "_span").style.backgroundColor = '';
	else
		document.getElementById(nNodeID + "_span").style.backgroundColor = '#ccccff';

	if (argPrevId)
		document.getElementById(argPrevId + "_span").style.backgroundColor = '';
}

//1050602 Joe 1050087 二代公文修改--S
/*
function BuildTreeView()
{
	fnSetFirstLevelOfTree(); //設定TreeView第一層資料
}
*/
//1050602 Joe 1050087 二代公文修改--E
function OnWSResult(argResult)
{
	if(argResult.error)
	{
		alert(argResult.errorDetail.string);
		return;
	}
}
//1050602 Joe 1050087 二代公文修改--S
/*
function SetAppInfo()
{
	document.all.TheGreatTV.innerHTML = "";
	var result = IFM140T1.GetPartOfAppset(document.all["txAppSetRootPath"].value);

	if(result.value != null)
	{
		var ParentFolderObj = findObj(0);
		var rtn = result.value;
		for(var i=0; i<rtn.length; i++)
		{
			var nodeInfoObj = new NodeInfo();
			nodeInfoObj.type = "app";
			if(rtn[i][0] == "appset")
				nodeInfoObj.type = "appset";
			//改變節點圖示
			var ImgFileName = "";
			if(nodeInfoObj.type == "app")
				ImgFileName = "icon_exefile.gif";
			//產生子節點並加入父節點中
			var childObj = insFld(foldersTree, gFld(rtn[i][1], "", true, ImgFileName, ImgFileName));
			nodeInfoObj.path = rtn[i][2];
			childObj.nodeInfo = nodeInfoObj;
			//設定此子節點的子節點數
			childObj.preGetChildrenCount = rtn[i][3];
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
//1050602 Joe 1050087 二代公文修改--E
//因為沒有Toolbar
function jf_MenuInit(){}

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