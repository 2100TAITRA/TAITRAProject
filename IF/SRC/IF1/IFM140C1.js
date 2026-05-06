/*	DATE 	SA			PRG			MGR_NO	DESC
 *	1050606	Kevin		Joe 		1050087	二代公文修改
 *	1051019	Leslie		Joe			1050087	二代修改配合行動平台
 *	1051101	Kevin		Joe			1050087	修正無用function
 *	1141015	Zen			Andy		1131229	組織樹重構，改以JSON字串紀錄
 */
var ClickedFolderId	= "";
var ClickedPath		= "";
var IsServerHandling = new Boolean();
IsServerHandling = false;

//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//document.all.txAppName.focus();

//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btSave":
			if(document.all.nCreateKey.value == "")
			{
				Page_BlockSubmit=true;
				alert("請先選擇位置!!");
				return;
			}
			if(document.all.txAppName.value == "")
			{
				Page_BlockSubmit=true;
				alert("請輸入名稱!");
				return;
			}

			//檢查名字是否重複
			//if(IsExistTheSameName(document.all.txAppName.value))
			//{
				//Page_BlockSubmit=true;
				//alert("您輸入的名稱已存在");
				//return;
			//}
			//檢查位置是否合法
			if (document.all.nCreateKey.value == 'ThisIsExe')
			{
				Page_BlockSubmit=true;
				alert("您所擇的位置不正確");
				return;
			}
			Page_BlockSubmit = false;

			//var apptype = AP_SCHEMA;
			//if( document.all.rbAppSet.checked )
			//apptype = APS_SCHEMA;
			//1050607	Joe		1050087		二代系統更新
			//document.all.nCreate.value = ClickedPath;
			document.all.strCreateName.value = document.all.txAppName.value; //+ SPLIT + apptype + SPLIT + document.all.txAppName.value;//回傳艦值；型態；名稱
			if(Page_BlockSubmit==false)
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				//1051101	Joe		1050087		重新使用dopostback
				//__doPostBack("btSave",event.flatIndex);		//1000816	Leslie	莫名奇妙變得需要傳"btSave"才會動....
				__doPostBack("btSave",event.flatIndex);
			}
			break;
		case "btCancel":
			Page_BlockSubmit=true;
			//1050628	Joe		修正showModalDialog問題
			//window.close();
			DlgClose();
			break;
		
	}	
}

//1050606 Joe 1050087 二代公文修改，傳入參數event
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050606 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		/*
		case "btSave":
			break;
		*/
	}
}

function CallBack(argCallerId)
{

}


function ClientOnLoad()
{
	// document.getElementsByClassName('footStatus')[0].hidden = true;
	// document.all["SetupBtn"].className = "hide";
	//setTimeout("BuildTreeView()", 300);
	//BuildTreeView();

	//1141215	Andy	1131229	調整組織樹寫法改以JSON組合
	var setting = {
		data: {
			simpleData: {
				enable: true
			}
		},
		view: {
		},
		callback: {
			onClick: function (event, treeId, treeNode) {
				if (treeNode.type === "APPSET") {
					fnOhHeClickTheFolder(treeNode.id, treeNode.tId);
				} else if (treeNode.type === "APP") {
					fnOhHeClickTheExeFile(treeNode.tId);
				}
				return false;
			}
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
}

function BuildTreeView()
{
	fnSetFirstLevelOfTree(); //設定TreeView第一層資料
	//GenTree(); //產生TreeView
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}



/**************************************************************************************************
Name : IsExistTheSameName
Desc : 傳入欲新增之DirectoryEntry的Name與放置的Path。
Parm : argName : string, 名稱(DirectoryEntry CN)
       argPath : string, 欲放置的位置(DirectoryEntry Path)
Return: bool, 若存在相同的名稱則回傳true
**************************************************************************************************/
/*function IsExistTheSameName(argName)
{
	argName = jf_Trim(argName);
	var folderObj = findObj(ClickedFolderId);
	for(var i=0 ; i<folderObj.children.length ; i++)
		if(folderObj.children[i].desc == argName)
			return true;
	return false;
}*/

/**************************************************************************************************
Name : IsLocationOK
Desc : 檢查選擇放置的位置是否為程式集。
Parm : argPath : string, 欲放置的位置(DirectoryEntry Path)
Return: bool, 若是則回傳true
**************************************************************************************************/
function IsLocationOK()
{
	var folderObj = findObj(ClickedFolderId);
	if(folderObj.nodeInfo.type == "appset")
		return true;
	return false;
}
/**************************************************************************************************
TreeView
**************************************************************************************************/
//1050606	Joe		1050087		二代系統升級，修改組織樹寫法--START--
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
	//var path = document.all["txAppSetRootPath"].value;
	var path = document.all["txAppSetRootPath"].value;
	foldersTree = gFld("<i>應用程式選單</i>", "", false, "", "");
	var nodeInfoObj = new NodeInfo();
	nodeInfoObj.type = "appset";
	nodeInfoObj.path = path;
	foldersTree.nodeInfo = nodeInfoObj;
	
	SetAppInfo();
}
*/
//此Func的功能在處理"按到節點的圖片或文字時要做的事"
function fnOhHeClickTheFolder(argFolderId, argNodeID)
{
	document.all.nCreateKey.value = argFolderId;
	jf_SetTreeViewMode(argNodeID);
}
function fnOhHeClickTheExeFile(argNodeID) {
	document.all.nCreateKey.value = 'ThisIsExe';
	jf_SetTreeViewMode(argNodeID);
}
/*
function fnQueryForChildNode(argFolderId)
{
	//取得父節點物件
	var ParentFolderObj = findObj(argFolderId);
	var path = ParentFolderObj.nodeInfo.path;

	//詢問是否有子節點
	var result = IFM140C1.GetPartOfAppset(path);
	

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

function SetAppInfo()
{
	document.all.TheGreatTV.innerHTML = "";
	var result = IFM140C1.GetPartOfAppset(document.all["txAppSetRootPath"].value);
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
} */
//1051101	Joe		1050087		改為呼叫共用function
/*
function jf_ShowWaitState()
{
	if(Page_IsValid==true)
	{
		for(var i=0;i<document.all.length;i++)
		{		
			document.all[i].style.cursor = "wait";
		}
	
		for(var i=0;i<document.all.tags("input").length;i++)
		{
			if(document.all.tags("input")[i].type == "text")
				document.all.tags("input")[i].readOnly = true;
		}
		window.status = "處理中,請稍候!!";
	}
}
*/
/* 
function GenTree()
{
	//產生TreeView
	initializeDocument();
} */

//1050606	Joe		1050087		二代系統升級，修改組織樹寫法--END--