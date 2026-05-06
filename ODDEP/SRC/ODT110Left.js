/*
DATE 		SA		PRG		MGR_NO		DESC
1141125		Zen		Andy	1131229		組織樹重構，改以JSON字串紀錄
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
	var setting = {
		data: {
			simpleData: {
				enable: true
			},
			key: {
				title: "title"
			}
		},
		view: {
			addDiyDom: addDiyDom
		},
		callback: {
			beforeClick: function (treeId, treeNode) {
				return !treeNode.isParent;
			},
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

		var treeObj = $.fn.zTree.init($("#Classtree"), setting, zNodes);
		treeObj.expandAll(true);
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event) {
}






/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult) {
	//webserver回傳後動作
	if (argResult.id == wsDuplicateID) {
		if (jf_IsWebServiceSuccess(argResult)) {
		}
		else {
		}
	}
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function addDiyDom(treeId, treeNode) {
	if (treeNode.id != "00" && treeNode.pId != "00") {
		var aObj = $("#" + treeNode.tId + "_a");

		var herf = "ODT110Right.aspx?rtnObj=lbReturnValue&status=" + treeNode.useStatus + "&year=" + treeNode.pId + "&startno=" + treeNode.docStart + "&strDeptNo=" + treeNode.id;	//增加回傳DeptNo by Shelly

		aObj.attr("href", herf);

		aObj.attr("target", "windowRight");
    }
}