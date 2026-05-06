/*
DATE 	SA		PRG		MGR_NO	DESC
0990114 Stella  Jane    0980664 新增"僅列出個人待送公文"checkbox選項
1050330	David	Kenny	1050087 二代公文系統相關修改
1051215 David   Kenny   修正取得傳送時間下拉選單語法，否則僅支援IE
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050330	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050330	Kenny	[1050087]   二代公文系統相關修改
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

var LayoutModeNew		= 0;
var LayoutModeModify	= 1;
var WorkBatchID;
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
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
		case "btAll":
			for (var iRow=2;iRow<document.all.dg1.rows.length+2;iRow++)
			{
				if (document.all["dg1__ctl"+iRow+"_cb1"].checked == false)
					document.all["dg1__ctl"+iRow+"_cb1"].checked = true;
			}
			Page_BlockSubmit = true;
			break;
		case "btClear":
			for (var iRow=2;iRow<document.all.dg1.rows.length+2;iRow++)
			{
				if (document.all["dg1__ctl"+iRow+"_cb1"].checked == true)
					document.all["dg1__ctl"+iRow+"_cb1"].checked = false;
			}
			Page_BlockSubmit = true;
			break;
		case "btChange":
			for (var iRow=2;iRow<document.all.dg1.rows.length+2;iRow++)
			{
				if (document.all["dg1__ctl"+iRow+"_cb1"].checked)
					document.all["dg1__ctl"+iRow+"_cb1"].checked = false;
				else
					document.all["dg1__ctl"+iRow+"_cb1"].checked = true;
			}
			Page_BlockSubmit = true;
			break;
		//1050330	Kenny	[1050087]   二代公文系統相關修改
		//case "ibTransDateS":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txTransDateS, event.screenX, event.screenY);
		//	break;
		//case "ibTransDateE":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txTransDateE, event.screenX, event.screenY);
		//	break;
	}
}

//1050330	Kenny	[1050087]   二代公文系統相關修改
//function jf_ToolBarHandle()
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
	
	//1050330	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050330	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		/*case "btClean":			
			Page_BlockSubmit = false;
			jf_ConfirmClean();
			document.all["txBatchNo"].focus();
			//回Server清除DataGrid
			jf_ToolBarSubmit();
			break;*/
		case "btSearch2":
			IsServerHandling = true;
			jf_ShowWaitState();
			Page_BlockSubmit = false;
			//1050330	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
			//0990114 要先執行搜尋才可執行送文單列印,不然會搜尋不到東西[0980664]-Jane
			if(document.all["dg1"])
			{
				if(CheckBeforPrint(xObjectName))
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
			{
				Page_BlockSubmit = true;
				alert("請先執行搜尋再執行送文單預覽列印。");
			}
			//1050330	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function ClientOnLoad()
{
	//1050330   Kenny   [1050087]   取消無用code
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	if (jf_GetActionMode()==LayoutModeNew)
	{
		document.all["DIV1"].className = "hide";
		//1050330   Kenny   [1050087]   二代公文系統相關修改，標頭不另外設定
		//document.all["dtHead1"].className = "hide";
	}
	else
	{
		//1050330   Kenny   [1050087]   二代公文系統相關修改，標頭不另外設定
		//document.all["DIV1"].className = "";
		//document.all["dtHead1"].className = "";
		document.all["DIV1"].className = "GridDiv";
	}
	if(document.all["dg1"] == null)
	{
		document.all["DIV1"].className = "hide";
		//1050330   Kenny   [1050087]   二代公文系統相關修改，標頭不另外設定
		//document.all["dtHead1"].className = "hide";
		
	}
	ShowMsg();

	//caesar 0940215 列印張數
	var nPage = parseInt(document.all.tbPage.value);
	for(var i=0;i<(nPage-1);i++)
		jf_PrintFile();

}

function OnWSResult(argResult)
{
    
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050330	Kenny	[1050087]   二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//預覽/列印前欄位檢查
function CheckBeforPrint(argObjectName)
{
	if(document.all.tbPage.value=="")
		document.all.tbPage.value="1";
	return true;
}

function CheckDataGrid()
{
	var bRtn = false;
	for (var iRow=2;iRow<document.all.dg1.rows.length+2;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cb1"].checked)
		{
			bRtn = true;break;
		}
	}
	if (!bRtn)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])),"");
	}
	return bRtn;
}
//Client端物件OnExit事項檢查範例
/*//範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btCancel") ) return;
	
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		if (document.all["txGrp_No"].value != "")
		{
			Page_BlockSubmit=true;
			
			arKeyName[0]    = "GRP_NO";
			arKeyValue[0]   = document.all["txGrp_No"].value;
			arRtnFldName[0] = "GRP_NAME";
			arOrdFldName[0] = "GRP_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "GRP_HEADER";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
			wsGetGrpNameID = callObj.id;
			OnWSResult(callObj);
		}
	}
}
*/

//FERDY 問題單 950517 #2006.06.15
//將dlAssignTime的值帶入txAssignTime
function jf_FillAssignTime()
{
	var strIndex = document.all["dlAssignTime"].selectedIndex;
    //1051215   Kenny   修正取得傳送時間下拉選單語法，否則僅支援IE
	//var strValue = document.all["dlAssignTime"].options(strIndex).value;
    var strValue = document.all["dlAssignTime"].options[strIndex].value;
	var arrValue = strValue.split(":");
	if( strIndex != 0 )
	{
		document.all["txAssignTimeS"].value =  arrValue[0];
		document.all["txAssignTimeE"].value =  arrValue[1];
	}
	else
	{
		document.all["txAssignTimeS"].value =  "";
		document.all["txAssignTimeE"].value =  "";
	}
}