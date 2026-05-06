/*
DATE	SA	    PRG	    MGR_NO	DESC
1011228	Leslie	Leslie	1011138	因應個資法，以身份證字號為帳號之機關，新增依設定決定帳號欄位是否顯示
1040402	Kevin	Kenny	1030930	使用者為單位管理人時，組織樹顯示範圍只限於其管理單位
1040413	Kevin	Kevin_C	1040190	修改呼叫Template函式的位置，避免產生在註冊之前呼叫函式的錯誤
1050615	Kevin	Joe		1050087	升級二代系統並修改組織樹
1070803	Kevin	Joe		1070678	修正弱掃Client Cookies Inspection
1070905	Kevin	Joe		1070678	修正弱掃Client Cookies Inspection
1080312	Kevin	Joe		1080253	修正行動平台組織樹未設定高度導致無法下拉的問題
1120310	Joe		Joe		1111153 組織數重構，改以JSON字串紀錄
*/

//1040413	Kevin_C	1040190	修改呼叫Template函式的位置，避免產生在註冊之前呼叫函式的錯誤
//var StrctureType = jf_ReadCookie("iic021StrctureType");
var StrctureType;

//若有值, 則只顯示特定的機關資訊
//1040413	Kevin_C	1040190	修改呼叫Template函式的位置，避免產生在註冊之前呼叫函式的錯誤
//var SpecificOrgNo = jf_ReadCookie("iic021OrgNo");
var SpecificOrgNo;

var FirstCallId = null;

//1050615	Joe		1050087		修改組織樹寫法--START--
/*
//此Func的功能在設定Tree中的根節點與其子節點的資料
function fnSetFirstLevelOfTree()
{
	var path = document.all.txRootPath.value;
	foldersTree = gFld("<i>機關組織</i>", "", false, "", "");
	foldersTree.nodeInfo = null;

	SetOrgInfo();
	//FirstCallId = fnCallWS(document.all.txAuthWS.value, "GetAllOrgInfo", "", path, true);
}
var str = "";
for(o in document.all.dlOrgInfo)
	str += o + ", ";
//alert(str);
function fnAfterSetFirstLevelOfTree()
{
	var folderObj = findObj(1);
	if(folderObj != null)
		clickOnNode(1);
}

//此Func的功能在處理"按到節點的圖片或文字時要做的事"
function fnOhHeClickTheFolder(argFolderId)
{
	var folderObj = findObj(argFolderId);
	var CInfo = folderObj.nodeInfo;
	if(CInfo != null)
	{
		var sSelectType = unescape(jf_ReadCookie("iic021SelectType"));
		//sSelectType is a string, it may be: 'Org','Unit','Role','Account'
		//so, it means user can select Org, Unit, Role and Account

		if(CInfo.InfoType == "Account" && sSelectType.indexOf("'Account'") == -1)
		{
			alert(GenMsgOfType(sSelectType));
			return;
		}
		else if(CInfo.InfoType == "Role" && sSelectType.indexOf("'Role'") == -1)
		{
			alert(GenMsgOfType(sSelectType));
			return;
		}
		else if(CInfo.InfoType == "Unit" && sSelectType.indexOf("'Unit'") == -1)
		{
			alert(GenMsgOfType(sSelectType));
			return;
		}
		else if(CInfo.InfoType == "Org" && sSelectType.indexOf("'Org'") == -1)
		{
			alert(GenMsgOfType(sSelectType));
			return;
		}
		if(CInfo.InfoType == "Account")
		{
			var RoleInfo = folderObj.parentObj.nodeInfo;//Role
			var UnitInfo = folderObj.parentObj.parentObj.nodeInfo;//Unit

			var OrgObj = folderObj.parentObj.parentObj.parentObj;
			for(var i=0; i<2; i++)
			{
				if(OrgObj.nodeInfo.InfoType == "Org")
				{
					CInfo.SourceOrgNo	= OrgObj.nodeInfo.Code;
					CInfo.SourceOrgName	= OrgObj.nodeInfo.Name;
					break;
				}
				OrgObj = OrgObj.parentObj;
			}
			CInfo.RoleCode = RoleInfo.Code;
			CInfo.RoleName = RoleInfo.Name;
			CInfo.UnitCode = UnitInfo.Code;
			CInfo.UnitName = UnitInfo.Name;
			BuildRet(CInfo);
		}
		else
			BuildRet(CInfo);
	}
}

function GenMsgOfType(argType)
{
	var strType = "";
	if(argType.indexOf("'Org'") != -1)
		strType += "機關、";
	if(argType.indexOf("'Unit'") != -1)
		strType += "單位、";
	if(argType.indexOf("'Role'") != -1)
		strType += "角色、";
	if(argType.indexOf("'Account'") != -1)
		strType += "帳號、";

	if(strType == "")
		return "系統參數錯誤";
	return "請選擇" + strType.substring(0, strType.length-1) + "類型的資料．";
}

function fnQueryForChildNode(argFolderId)
{
	//取得父節點物件
	var ParentFolderObj = findObj(argFolderId);
	var CInfo = ParentFolderObj.nodeInfo;

	//呼叫WS，詢問是否有子節點
	var result = "";
	
	//if(CInfo.InfoType == "Org" || CInfo.InfoType == "Unit")
	//	result = fnCallWS(document.all.txAuthWS.value, OrgStrctureFunc, "", CInfo.Path, false);
	//else if(CInfo.InfoType == "Role")
	//	result = fnCallWS(document.all.txAuthWS.value, "GetRoleOccupantInfo", "", CInfo.Path, false);
	//else
	//	return;

	if(CInfo.InfoType == "Org" || CInfo.InfoType == "Unit")
	{
		if(StrctureType == "1")
			result = IFC021.GetSimpleInfoUnderUnit("", CInfo.Path);
		else
			//1040402	Kenny	[1030930]	增加傳入紀錄單位管理人所屬單位參數，以調整組織樹可視範圍
			//result = IFC021.GetNextLevelInfoOfUnit("", CInfo.Path);
			result = IFC021.GetNextLevelInfoOfUnit("", CInfo.Path, document.all.DeptNo.value);
	}
	else if(CInfo.InfoType == "Role")
		result = IFC021.GetRoleOccupantInfo("", CInfo.Path);
	else
		return;

	if(result.value != null)
	{
		var IsLastnode = 0;

		var rtn = result.value;
		for(var i=0; i<rtn.length; i++)
		{
			var CInfo = rtn[i];
			if(i == rtn.length-1)
				IsLastnode = 1;

			//改變節點圖示
			var ImgFileName = "";
			if(CInfo.InfoType == "Org")
				ImgFileName = "ICON_ORG.gif";
			else if(CInfo.InfoType == "Unit")
			{
				ImgFileName = "ICON_DEP.gif";
				if(CInfo.UnitType == "2")//虛擬
					ImgFileName = "ICON_VIR.gif";
				else if(CInfo.UnitType == "3")
					ImgFileName = "ICON_SUP.gif";
				else if(CInfo.UnitType == "6")
					ImgFileName = "ICON_SUP.gif";
				//停用的單位略過
				if(CInfo.UnitMode == "1")
					continue;
			}
			else if(CInfo.InfoType == "Role")
				ImgFileName = "ICON_ROL.gif";
			else if(CInfo.InfoType == "Account")
				ImgFileName = "ICON_PPL.gif";

			//產生子節點並加入父節點中
			var displayName = CInfo.Name;
			//1011228	Leslie	依參數決定是否顯示帳號
			//if(CInfo.InfoType == "Account")
			if(CInfo.InfoType == "Account" && !document.all["AOL_COVER_EMPNO"])
				displayName += "(" + CInfo.Code + ")"
			var childObj = insFld(ParentFolderObj, gFld(displayName, "", true, ImgFileName, ImgFileName));
			childObj.nodeInfo = CInfo;
			//紀錄子節點其子節點數(用於顯示圖形之用)
			if(CInfo.InfoType == "Account")
				childObj.preGetChildrenCount = 0;
			else
				childObj.preGetChildrenCount = CInfo.ChildCount;
			childObj.initialize(ParentFolderObj.level+1, IsLastnode, fnGetChildLeftSide(ParentFolderObj));
		}
	}
	else
		alert(result.error);
}

function fnCallWS(argWS, argFuncName, argParam1, argParam2, argAsync)
{
    var callObj = new Object();
    callObj.funcName = argFuncName;      // Name of the remote function.
    callObj.async = argAsync;         // A Boolean that specifies the type of call
    callObj.timeout = 20;         // Timeout value for the method call (seconds)
    // SOAP header information
    callObj.SOAPHeader = "<SOAP-ENV:Header>";
    callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
    callObj.SOAPHeader += 5;
    callObj.SOAPHeader += "</t:Transaction>";  
    callObj.SOAPHeader += "</SOAP-ENV:Header>";  

	service.useService(argWS + "?WSDL", "f1");
    return service.f1.callService(callObj, argParam1, argParam2);
}
*/
//1050615	Joe		1050087		修改組織樹寫法--END--

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

function jf_ToolBarHandle()
{
}

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
	//1050615	Joe		1050087		修改組織樹寫法--START--
	/*
	//fnCallWS(document.all.txAuthWS.value, "GetAllOrgInfo", null, null);
	fnCallWS(document.all.txAuthWS.value, "GetNextLevelInfoOfUnit", "", null, false);
	fnCallWS(document.all.txAuthWS.value, "GetSimpleInfoUnderUnit", "", null, false);
	fnCallWS(document.all.txAuthWS.value, "GetRoleOccupantInfo", "", null, false);
	*/
	//1050615	Joe		1050087		修改組織樹寫法--END--
	//fnResizeTreeView();
	//ShowMsg();
	//setTimeout("BuildTreeView()", 300);
	//1050615	Joe		1050087		修改組織樹寫法
	//BuildTreeView();
	//1040413	Kevin_C	1040190	修改呼叫Template函式的位置，避免產生在註冊之前呼叫函式的錯誤
	//1070905	Joe		1070678	修正弱掃Client Cookies Inspection--S
	// StrctureType = jf_ReadCookie("iic021StrctureType");
	// SpecificOrgNo = jf_ReadCookie("iic021OrgNo");
	//1070905	Joe		1070678	修正弱掃Client Cookies Inspection--E
	document.getElementsByClassName('footStatus')[0].hidden = true;
	document.all["SetupBtn"].hidden = true;
	//1080312	Joe		1080253		修正行動平台組織樹未設定高度導致無法下拉的問題
	//1120309	Joe		1111153		調整組織樹寫法改以JSON組合--S
	//document.all["divForTreeView"].style.height = (window.innerHeight * 0.95) + "px";
	
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
	//1120309	Joe		1111153		調整組織樹寫法改以JSON組合--E
}

/*function HighlightNode(argText, argUserName) {
	
	DlgCallBack(argText, argUserName);
	DlgClose();
}*/
function HighlightNode(argRtnCode, argType, argRtnName, argRtnPath, argRtnRoleCode, argRtnRoleName, argRtnSourceOrgName, argRtnSourceOrgno, argRtnUnitNo, argRtnUnitName) {
	var strType='';
	switch (argType) {
		case '0':
			strType = 'Org';
			break;
		case '1':
		case '2':
		case '3':
			strType = 'Unit';
			break;
		case '4':
			strType = 'Role';
			break;
		case '5':
			strType = 'Account';
			break;
	}
	if(CheckBeforeCallBack(strType))
	{
		DlgCallBack(argRtnCode, strType, argRtnName, argRtnPath, argRtnRoleCode, argRtnRoleName, argRtnSourceOrgName, argRtnSourceOrgno, argRtnUnitNo, argRtnUnitName);
		DlgClose();		
	}
}
function CheckBeforeCallBack(argType)
{	
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	//var sSelectType = unescape(jf_ReadCookie("iic021SelectType"));
	var sSelectType = document.all.iic021SelectType.value;
	//sSelectType is a string, it may be: 'Org','Unit','Role','Account'
	//so, it means user can select Org, Unit, Role and Account

	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	//if (argType == "Account" && sSelectType.indexOf("'Account'") == -1)
	if (argType == "Account" && sSelectType.indexOf("Account") == -1)
	{
		alert(GenMsgOfType(sSelectType));
		return false;
	}
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	//else if(argType == "Role" && sSelectType.indexOf("'Role'") == -1)
	else if (argType == "Role" && sSelectType.indexOf("Role") == -1)
	{
		alert(GenMsgOfType(sSelectType));
		return false;
	}
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	//else if(argType == "Unit" && sSelectType.indexOf("'Unit'") == -1)
	else if (argType == "Unit" && sSelectType.indexOf("Unit") == -1)
	{
		alert(GenMsgOfType(sSelectType));
		return false;
	}
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	//else if(argType == "Org" && sSelectType.indexOf("'Org'") == -1)
	else if (argType == "Org" && sSelectType.indexOf("Org") == -1)
	{
		alert(GenMsgOfType(sSelectType));
		return false;
	}
	return true;
}
function GenMsgOfType(argType)
{
	var strType = "";
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	//if(argType.indexOf("'Org'") != -1)
	if (argType.indexOf("Org") != -1)
		strType += "機關、";
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	//if(argType.indexOf("'Unit'") != -1)
	if (argType.indexOf("Unit") != -1)
		strType += "單位、";
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	//if (argType.indexOf("'Role'") != -1)
	if (argType.indexOf("Role") != -1)
		strType += "角色、";
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	//if(argType.indexOf("'Account'") != -1)
	if (argType.indexOf("Account") != -1)
		strType += "帳號、";

	if(strType == "")
		return "系統參數錯誤";
	return "請選擇" + strType.substring(0, strType.length-1) + "類型的資料．";
}
//1050615	Joe		1050087		修改組織樹寫法--START--
/*
function BuildTreeView()
{
	fnSetFirstLevelOfTree(); //設定TreeView第一層資料
}
function OnWSResult(argResult)
{
	if(argResult.error == false)
	{
		if(argResult.id == FirstCallId)
		{
			document.all.TheGreatTV.innerHTML = "";
			var rtn = argResult.value;
			for(var i=0; i<rtn.length; i++)
			{
				var CInfo = rtn[i];
				if(SpecificOrgNo && SpecificOrgNo != "")
				{
					if(SpecificOrgNo != CInfo.Code)
						continue;
				}
				//改變節點圖示
				var ImgFileName = "";
				if(CInfo.InfoType == "Org")
					ImgFileName = "ICON_ORG.gif";
				else
					ImgFileName = "ICON_DEP.gif";
				//產生子節點並加入父節點中
				var childObj = insFld(foldersTree, gFld(CInfo.Name, "", true, ImgFileName, ImgFileName));
				childObj.nodeInfo = CInfo;
				//設定此子節點的子節點數
				childObj.preGetChildrenCount = CInfo.ChildCount;
			}
			GenTree(); //產生TreeView
		}
	}
	else
		alert(argResult.errorDetail.string);
}

function CInfo()
{
	this.InfoType = "";
	this.Code = "";
	this.Name = "";
	this.Path = "";
	this.ChildCount = 0;
}
function SetOrgInfo()
{
	document.all.TheGreatTV.innerHTML = "";
	for(var i=0; i<document.all.dlOrgInfo.options.length; i++)
	{
		var strInfo = document.all.dlOrgInfo.options[i].text;
		var arrInfo = strInfo.split("|");//Code|Name|Path|ChildCount
		//alert(arrInfo.length);
		var ci = new CInfo();
		ci.InfoType = "Org";
		ci.SourceOrgNo = arrInfo[0];
		ci.Code = arrInfo[0];
		ci.Name = arrInfo[1];
		ci.Path = arrInfo[2];
		ci.ChildCount = parseInt(arrInfo[3]);
		//alert(ci.Name);
		//節點圖示
		var ImgFileName = "ICON_ORG.gif";
		
		//產生子節點並加入父節點中
		var childObj = insFld(foldersTree, gFld(ci.Name, "", true, ImgFileName, ImgFileName));
		childObj.nodeInfo = ci;
		//設定此子節點的子節點數
		childObj.preGetChildrenCount = ci.ChildCount;
	}
	GenTree(); //產生TreeView
}

//因為沒有Toolbar
function jf_MenuInit(){}

function fnResizeTreeView()
{
	var nHeight = window.document.body.clientHeight - window.document.all['tbMain'].offsetHeight;
	window.document.all['divForTreeView'].style.height = nHeight;
}

function BuildRet(argCInfo)
{
	Page_BlockSubmit = true;
	if(IsFrame())
	{
		//frames
		if(window.parent.parent.fnAddOrgTarget)
			window.parent.parent.fnAddOrgTarget(argCInfo);
	}
	else
	{
		returnValue = argCInfo;
		window.opener = window.parent;
		window.close();
	}
	return;
}

function IsFrame()
{
	if(window.parent.parent != window.parent)
		return true;
	return false;
}
*/

//1050615	Joe		1050087		修改組織樹寫法--END--

//1120309	Joe		1111153		調整組織樹寫法改以JSON組合--S
function RtnValue(event, treeId, treeNode) {
	HighlightNode(treeNode.username, treeNode.Type, treeNode.empname, treeNode.identity, treeNode.roleno, treeNode.rolename, treeNode.orgname, treeNode.orgno, treeNode.deptno, treeNode.deptname);
}
//1120309	Joe		1111153		調整組織樹寫法改以JSON組合--E