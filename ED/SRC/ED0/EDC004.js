/*
DATE 		SA		PRG		MGR_NO		DESC
1031013		--		Cloud	1030659		新增核決層級查詢程式
1050711     Cloud	Kevin_C   1050087     升級二代
1050815     Cloud	--		1050087		升級修改支援二代公文製作模組回傳
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

//指定DataGrid欄位
//1050711	Kevin_C   1050087     升級二代
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1141125	Andy	1131229	調整組織樹寫法改以JSON組合
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
		},
		callback: {
			beforeClick: function (treeId, treeNode) {
				return !treeNode.isParent;
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

		var treeObj = $.fn.zTree.init($("#Classtree"), setting, zNodes);
		treeObj.expandAll(true);
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050711	Kevin_C	1050087	升級二代
//function jf_ToolBarHandle()
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
	//1050711	Kevin_C	1050087	升級二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			document.EDC004.action="EDC004.aspx";
			IsServerHandling = true;
			Page_BlockSubmit = false;
			//1050711	Kevin_C	1050087	升級二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}






/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
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
function ProxyNoRtnValue(argLvlNo,argProxyNo)
{
	//1050711	Kevin_C   1050087     升級二代
    //fnSetMsg("LVL_NO", argLvlNo);
    //fnSetMsg("PROXY_NO", argProxyNo);
    //close();	
	var rtnobj = 
	{
		"argLvlNo":argLvlNo,
		"argProxyNo":argProxyNo,
	};
	parent.$("#extdlg_close_btn").trigger("click",rtnobj);
	
}
//1050815     Cloud	1050087		升級修改支援二代公文製作模組回傳-無用MARK
/*function fnSetMsg(argName,argValue)
{
	var artifact = fnGetArtifact();
	if(!document.all.IEControl.SetTargetUser(artifact))
	{
		alert("無此對應之使用者");
		return false;	
	}
	document.all.IEControl.SetMsg(argName,argValue)
	return true;
}

var SAMLartStr;
function fnGetArtifact()
{
	return document.all.SsoArtifact.value;
	return;
}*/

