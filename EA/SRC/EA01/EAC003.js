/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人  單號	 概要
 * -------------------------------------------------------------------------------------------------
 * 95.12.14		whay	  951265	 EAM005儲存分類號前檢核保存年限與基準項目的年限
 * 106.03.10    Justin   1050087     二代公文修改
 * 114.11.18	Andy	1131229		組織樹重構，改以JSON字串紀錄
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");
//1060310  Justin [1050087] 二代公文修改
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
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//1141118	Andy	1131229	調整組織樹寫法改以JSON組合
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
			},
			onClick: function (event, treeId, treeNode) {
				if (!treeNode.isParent && treeNode.strnFrom == "EAM003") {
					RtnItemInfo(treeNode.id);
				}
				else if (!treeNode.isParent && treeNode.strnFrom == "EAM005") {
					RtnItemInfo2(treeNode.strSearch1, treeNode.strSearch2, treeNode.itemname, treeNode.id, treeNode.keepyear,);
                }
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

		$.fn.zTree.init($("#Classtree"), setting, zNodes);
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060310  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
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
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060310  Justin [1050087] 二代公文修改 
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
	
    //1060310  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			//Page_BlockSubmit = !jf_CheckKeyObject();
			//jf_ToolBarSubmit();			
			document.EAC003.action="EAC003.aspx";						
			IsServerHandling = true;
			Page_BlockSubmit = false;
		    //1060310  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1060310  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1060310  Justin [1050087] 二代公文修改 
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
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
    /*
	try
	{
	    opener.document.all.lbReturnValue.length = 3;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.document.all.lbReturnValue.options[1].value = argRead1;
	    opener.document.all.lbReturnValue.options[2].value = argRead2;
	    opener.window.CallBack("SII020");
	    close();
	}
	catch (e) {}
    */
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function RtnItemInfo( argITEM_NO )
{   				
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argITEM_NO;
	    opener.window.CallBack("EAC003");
	    close();
	}
	catch (e) {}
   
}
//951263 多回傳保存年限至EAM005 by whay 0951214
function RtnItemInfo2( argTextId, argLbId, argITEM_NAME, argITEM_NO, argKEEP_YEAR)
{   				
	try
	{
	    opener.document.all.lbReturnValue.length = 5;
	    opener.document.all.lbReturnValue.options[0].value = argTextId;
	    opener.document.all.lbReturnValue.options[1].value = argLbId;
	    opener.document.all.lbReturnValue.options[2].value = argITEM_NAME;
	    opener.document.all.lbReturnValue.options[3].value = argITEM_NO;	    
	    opener.document.all.lbReturnValue.options[4].value = argKEEP_YEAR;
	    opener.window.CallBack("EAC003");
	    close();
	}
	catch (e) {alert(e.Message+", e.id:"+e.id);}
   
}
