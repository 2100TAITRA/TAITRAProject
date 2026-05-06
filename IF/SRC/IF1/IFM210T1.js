/*
單號		DATE	SA		PRG		DESC
1030900		1031225	---		Kevin_C	依組織架構及權利判斷應顯示的機關
1050087		1050616	Kevin	Kevin_C	升級二代公文系統
1070678		1070906	Kevin	Justin	弱掃修正CookieHttpOnly
1090885		1091119	Leslie	Leslie	取消網址列權杖
1100991		1100818	Kevin	Joe  	弱掃修正Client DOM XSS
1110718		1110629 Kevin  	Kevin	調整TemplateUI
1131229		1150102	Zen		Andy	組織樹重構，改以JSON字串紀錄
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


//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1050616	Kevin_C	1050087 升級二代公文系統
	//var nHeight = window.document.body.clientHeight - window.document.all['tbMain'].offsetHeight;
	//window.document.all['divForTreeView'].style.height = nHeight;
	//1110718 Kevin 1110629 調整TemplateUI
	//var nHeight = window.document.documentElement.clientHeight - window.document.all['tbMain'].offsetHeight;
	//window.document.all['divForTreeView'].style.height = nHeight+"px";
	/*1070906 Justin [1070678]此段無效並會造成錯誤
	if(document.all["AlertMsgForNonePriv"])
		if(document.all["AlertMsgForNonePriv"].value == "1")*/
			//1031225	Kevin_C	1030900 此段無效並會造成錯誤
			//CloseWin("您沒有足夠的權限");
	/*1070906 Justin [1070678]弱掃修正CookieHttpOnly
	if(document.all["DefaultOrgNo"])
		jf_SaveCookie("ckOrgNo", document.all["DefaultOrgNo"].value);*/
	//1150102	Andy	1131229	組織樹重構，改以JSON字串紀錄
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

//1110718 Kevin 1110629 調整TemplateUI
function jf_ToolBarHandle()
{
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function HighlightNode(argPage,argNodeID,argNodeKey,argPath, argOrgNo)
{
	//1070906 Justin [1070678]弱掃修正CookieHttpOnly
	//jf_SaveCookie("nObject",argPath);
	//jf_SaveCookie("ckOrgNo", argOrgNo);
	jf_SetTreeViewMode(argNodeID);
	//1070906 Justin [1070678]弱掃修正CookieHttpOnly
	//parent.viewer.location = argPage + GetAllParamStr();
	var param = ReplaceParamStr(GetAllParamStr(), "nObject", argPath);
	//1100818	Joe		1100991		弱掃修正Client DOM XSS
	// parent.viewer.location = argPage + param;
	parent.viewer.location = encodeURI(argPage + param);
}

function GetAllParamStr()
{
	var strParam = "";
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i = pUrl.indexOf("?");
		if(i != -1)
			strParam = pUrl.substr(i); 
	}
	return strParam;
}
//1070906 Justin [1070678]弱掃修正CookieHttpOnly
function ReplaceParamStr(argParamStr, argKey, argValue)
{
	if(argParamStr == "")
	//1091119	Leslie[1090885]	改掉無權杖時的判斷錯誤
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
//1150201	Andy		1131229		調整組織樹寫法改以JSON組合
function RtnValue(event, treeId, treeNode) {
	if (treeNode.Type == "4")
		HighlightNode('IFM210_1.aspx', treeNode.tId, treeNode.id, treeNode.id, treeNode.strMissionOrgno);
	else if (treeNode.Type == "0")
		HighlightNode('IFM210.aspx', treeNode.tId, treeNode.id, treeNode.identity, treeNode.strMissionOrgno);
	else
		HighlightNode('IFM210.aspx', treeNode.tId, treeNode.id, treeNode.id, treeNode.strMissionOrgno);
}
//1150201	Andy		1131229		調整組織樹寫法改以JSON組合
function jf_SetTreeViewMode(nNodeID) {
	if (document.getElementById(nNodeID + "_span").style.backgroundColor == '#ccccff')
		document.getElementById(nNodeID + "_span").style.backgroundColor = '';
	else
		document.getElementById(nNodeID + "_span").style.backgroundColor = '#ccccff';

	if (argPrevId)
		document.getElementById(argPrevId + "_span").style.backgroundColor = '';
	argPrevId = nNodeID;
}