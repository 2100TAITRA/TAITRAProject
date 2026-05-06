/*
DATE 	SA		PRG		MGR_NO	DESC
0951020	Stella	Charles	955101	二層式架構修改
0960214	Stella	David	960027	台科大送文日期區間
0960810	Stella	Cola	001433	點選批號查詢後，自動帶出收文清單
0990707			Johnny	0990400 CDC新增，依選項帶出時間、時間格式檢查、帶出批號前檢查
0990720			Johnny	0990400 成批日期加上小日曆按鈕
0991103			David	0990786 修改子視窗開啟的大小
1000216	Zola	Linda	1000153	新增ODI110可用公文號區間查詢（調整相關有呼叫之程式修改畫面大小）	
1000221			Linda	-------	修正成批日期onblur時應先補0再做檢核	
1050318	David	Kevin_C	1050074	內政部才須顯示列印格式
1050401	David	David	1050087	二代公文修改
1080122 KEVIN   Cloud   1080049  修正弱掃Reflected XSS Specific Clients
1080128 KEVIN   Cloud   1080049  修正弱掃Reflected XSS Specific Clients
1110110	Cloud	Cloud	1101600	修改受文者姓名不移除自己
1110317	Cloud	Cloud	1110267	修正重複點擊造成重複postback問題
1140414 Cloud	Andy	1140264 新增匯出Excel功能
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050401 David 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050401 David 1050087 二代公文修改
	/*if (document.all["ValidationSummary1"].innerText != "")
		alert(document.all["ValidationSummary1"].innerText);*/
    jf_ShowValidator();
}

var LayoutModeNew		= 0;
var LayoutModeModify	= 1;
var WorkBatchID;
var intervalID;
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
		case "btBatchNoS":   //送文批號子視窗
			var pUrl = "";
			pUrl = "ODI110.aspx?argMode=1";
			WorkBatchID = "txBatchNoS";
			//1000216	Linda	[1000153]	新增ODI110可用公文號區間查詢（調整相關有呼叫之程式修改畫面大小）
			//0991103 David 0990786 修改子視窗開啟的大小
			//jf_OpenChildWin(pUrl,"ODI110",700,500);
			jf_OpenChildWin(pUrl,"ODI110",900,500);
			Page_BlockSubmit = true;
			break;
		case "btBatchNoE":   //送文批號子視窗
			var pUrl = "";
			WorkBatchID = "txBatchNoE";
			pUrl = "ODI110.aspx?argMode=1";
			//1000216	Linda	[1000153]	新增ODI110可用公文號區間查詢（調整相關有呼叫之程式修改畫面大小）
			//0991103 David 0990786 修改子視窗開啟的大小
			//jf_OpenChildWin(pUrl,"ODI110",580,420);
			//jf_OpenChildWin(pUrl,"ODI110",700,500);
			jf_OpenChildWin(pUrl,"ODI110",900,500);
			Page_BlockSubmit = true;
			break;
		case "btAll":
			//1050401 David 1050087 二代公文修改
			//for (var iRow=2;iRow<document.all.dg1.rows.length+2;iRow++)
			for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
			{
				if (document.all["dg1__ctl"+iRow+"_cb1"].checked == false)
					document.all["dg1__ctl"+iRow+"_cb1"].checked = true;
			}
			Page_BlockSubmit = true;
			break;
		case "btClear":
			//1050401 David 1050087 二代公文修改
			//for (var iRow=2;iRow<document.all.dg1.rows.length+2;iRow++)
			for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
			{
				if (document.all["dg1__ctl"+iRow+"_cb1"].checked == true)
					document.all["dg1__ctl"+iRow+"_cb1"].checked = false;
			}
			Page_BlockSubmit = true;
			break;
		case "btChange":
			//1050401 David 1050087 二代公文修改
			//for (var iRow=2;iRow<document.all.dg1.rows.length+2;iRow++)
			for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
			{
				if (document.all["dg1__ctl"+iRow+"_cb1"].checked)
					document.all["dg1__ctl"+iRow+"_cb1"].checked = false;
				else
					document.all["dg1__ctl"+iRow+"_cb1"].checked = true;
			}
			Page_BlockSubmit = true;
			break;
		//1050401 David 1050087 二代公文修改
		/*case "btSDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSendDateS, event.screenX, event.screenY);
			break;
		case "btEDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSendDateE, event.screenX, event.screenY);
			break;*/
		case "btGetBatchNo":   //取得送文批號前檢查
			if(!CheckBeforGetBatch())
			{
				alert("成批日期不可空白");
				Page_BlockSubmit = true;
			}
			else
			{
				Page_BlockSubmit = false;
				//1050401 David 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		//0990720 成批日期加上小日曆按鈕 [0990400] Johnny
		//1050401 David 1050087 二代公文修改
		/*case "btBatchDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSendDate, event.screenX, event.screenY);
			break;*/
	}
}

//1050401 David 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	if(IsServerHandling)
	{
		//1110317	Cloud	1110267	修正重複點擊造成重複postback問題
		Page_BlockSubmit=true;
	   return;
	}

	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

    //1050401 David 1050087 二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btOpen":
			if(CheckBeforeOpen())
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;

		    //1050401 David 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if (CheckDataGrid())
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050401 David 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050401 David 1050087 二代公文修改
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
		case "btSearch":
			if(jf_CheckBeforeSearch())
			{
				if(document.all["rbSendTarget_0"].checked)
				{
					IsServerHandling = true;
					jf_ShowWaitState();
					Page_BlockSubmit = false;
				    //1050401 David 1050087 二代公文修改
				    //jf_ToolBarSubmit();
					jf_ToolBarSubmit(xObjectName);
				}
				else//0950511 Charles 如果所屬單位無收文者選項時
				{
					if(document.all["txRcvEmp"].options.length > 1)
					{
						IsServerHandling = true;
						jf_ShowWaitState();
						Page_BlockSubmit = false;
					    //1050401 David 1050087 二代公文修改
					    //jf_ToolBarSubmit();
						jf_ToolBarSubmit(xObjectName);
					}
					else
					{
						Page_BlockSubmit = true;
						jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所屬單位下無可收文之對象"])),"");
					}
				}
			}
			break;
		case "btPrint":
		case "btPreview":
			if(CheckBeforPrint(xObjectName))
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050401 David 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1140414 Andy 1140264 新增匯出Excel.ods功能
		case "btODS":
		case "btExcel":
			if (CheckBeforPrint(xObjectName)) {
				IsServerHandling = true;
				jf_ShowWaitState();
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if(argCallerId == "ODI110")
	{
		document.all[WorkBatchID].value = document.all["lbReturnValue"].options[0].value;
		//[001433]Cola 點選批號查詢後，自動帶出收文清單 -- start --
		if (WorkBatchID == "txBatchNoS" && document.all[WorkBatchID].value !="" && document.all["txAutoOpen"].value == "Y")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		//Cola -- end --
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    //1050401 David 1050087 二代公文修改
	/*jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, null);*/
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	if (jf_GetActionMode()==LayoutModeNew)
	{
	    document.all["DIV1"].className = "hide";
	    //1050401 David 1050087 二代公文修改
	    //document.all["DIV2"].className = "";
	    document.all["DIV2"].className = "GridDiv";
		/*document.all["dtHead1"].className = "hide";
		if (document.all["dg2"]!=null)
			document.all["dtHead2"].className = "";
		else
			document.all["dtHead2"].className = "hide";*/
	}
	else
	{
	    //1050401 David 1050087 二代公文修改
	    //document.all["DIV1"].className = "";
	    document.all["DIV1"].className = "GridDiv";
		document.all["DIV2"].className = "hide";
		//document.all["dtHead1"].className = "";
		//document.all["dtHead2"].className = "hide";
		
		//1050401 David 1050087 二代公文修改
		if (document.all["H_OrgNickName"] && document.all["H_OrgNickName"].value == "MOI")
		{
			document.all["trPrintFormat"].className = "dTR";
		}
		else
			document.all["dlPrintFormat"].selectedIndex = 0;
		
	}
	ShowMsg();

	//1050401 David 1050087 二代公文修改，調整判斷位置
	/*//1050318	Kevin_C	1050074	內政部才須顯示列印格式
	if (document.all["H_OrgNickName"] && document.all["H_OrgNickName"].value == "MOI")
	{
	    //1050401 David 1050087 二代公文修改
	    //document.all["trPrintFormat"].className = "";
	    document.all["trPrintFormat"].className = "dTR";
	}
	else
	    document.all["dlPrintFormat"].selectedIndex = 0;*/

	//caesar 0940215 列印張數
	var nPage = parseInt(document.all.tbPage.value);
	for(var i=0;i<(nPage-1);i++)
		jf_PrintFile();

	//[需求單955101] 初始時先儲存下拉式選單的Text、Value、所有選項Value Charles 0951020
	document.all["H_Dept_Value"].value = document.all["txRcvDept_Text"].value;
	document.all["H_Sect_Value"].value = document.all["dlSubDept_Text"].value;
	document.all["H_User_Value"].value = document.all["txRcvEmp_Text"].value;
	document.all["H_DeptNo_Value"].value = odjf_GetSelectValue(document.all["txRcvDept"],document.all["H_Dept_Value"].value);
	document.all["H_SectNo_Value"].value = odjf_GetSelectValue(document.all["dlSubDept"],document.all["H_Sect_Value"].value);
	document.all["H_UserNo_Value"].value = odjf_GetSelectValue(document.all["txRcvEmp"],document.all["H_User_Value"].value);
	document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSubDept"]);
	document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["txRcvEmp"]);

	//0950511 Charles 由於ComboBox如果在Server端預設為hide，則其顯示區會一直被隱藏，所以在js作處理
	//[需求單955101] 根據系統流程架構設定下拉式選單 Charles 0951020
	//jf_RefreshRcvTR(false);
	intervalID = window.setInterval("jf_RefreshRcvTR()", 500);

	//無值不顯示
	jf_HandleComboxStatus("dlSubDept");
    //1080122 Cloud   1080049  修正弱掃Reflected XSS Specific Clients
	//1080128 Cloud   1080049  修正弱掃Reflected XSS Specific Clients
	/*if(document.all.dg1)
	{
		for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
		{
				document.all["dg1__ctl"+iRow+"_txSubject"].value = htmlDecode(document.all["dg1__ctl"+iRow+"_txSubject"].value);
		}
	}*/
}
function htmlDecode(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    return div.innerText || div.textContent;
}

function CheckBeforeOpen()
{
	if(!CheckUnEmpty())
		return false;
	return true;
}

function OnWSResult(argResult)
{
    	//webserver回傳後動作
    	//檢查回傳的webserverID
    	/*//範例
    	if (argResult.id == wsGetGrpNameID)
    	{
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			document.all["txGrp_Name"].value = argResult.value.RtnField0[0];
		}
		else
		{
			document.all["txGrp_Name"].value = "";
			document.all["txGrp_No"].focus();
		}
	}
	*/
	if(argResult.id == CheckBatchNoID)
	{
		if(!jf_IsWebServiceSuccess(argResult))
		{
			document.all.txBatchNo.value = "";
			document.all.txBatchNo.focus();
		}		
	}
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050401 David 1050087 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//預覽/列印前欄位檢查
function CheckBeforPrint(argObjectName)
{
	if(document.all.tbPage.value=="")
		document.all.tbPage.value="1";
	if(!CheckUnEmpty())
		return false;
	return true;
}

function CheckUnEmpty()
{
	if (jf_Trim(document.all["txBatchNoS"].value) + jf_Trim(document.all["txBatchNoE"].value) == "")
	{
		document.all["txBatchNoS"].focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["送文批號不可均為空白"])),"");		
		return false;
	}
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

var CheckBatchNoID;
function CheckBatchNoExist(argFieldName)
{
	if(document.all[argFieldName].value == "")
		return;
	var arWSParam = new Array(3);
	arWSParam[0] = "SEND_MAIN";
	var arFieldName = new Array(2);
	arFieldName[0] = "SOURCE_ORGNO";
	arFieldName[1] = "BATCH_NO";
	arWSParam[1] = arFieldName;
	var arFieldValue = new Array(2);
	arFieldValue[0] = document.all.SourceOrgNo.value;
	arFieldValue[1] = document.all[argFieldName].value;
	arWSParam[2] = arFieldValue;
	callObj = jf_CallWS("template/lib/sys.asmx","CheckDataKeyDuplicate",false,arWSParam);
	CheckBatchNoID = callObj.id;
	OnWSResult(callObj);	
}

/**********************************************************************************************
  Name : function jf_RefreshRcvTR()
  Desc : 當送文對象選擇[其他單位]時，顯示[收文單位]下拉式選單；選擇[所屬單位]則顯示[收文人員]下拉式選單
 **********************************************************************************************/
function jf_RefreshRcvTR()
{
	window.clearInterval(intervalID);
	
	if(document.all["H_OD_FLOW_TYPE"].value == "0")			//無登記桌架構
	{
		if (document.all["rbSendTarget_0"].checked)				//選擇其他單位時，承辦單位及承辦人下拉選單為可見
		{
			//1050401 David 1050087 二代公文修改
			//document.all["trRcvDept"].className	= "";
			document.all["trRcvDept"].className = "dTR";
			document.all["dlSubDept_Container"].className = "hide";
			//1050401 David 1050087 二代公文修改
			//document.all["trRcvEmp"].className	= "";
			document.all["trRcvEmp"].className = "dTR";
			
			//初始化單位及人員下拉選單
			document.all["txRcvDept_Text"].value = "";
			document.all["H_Dept_Value"].value = "";
			document.all["H_DeptNo_Value"].value = "";
			document.all["txRcvEmp_Text"].value = "";
			document.all["H_User_Value"].value = "";
			document.all["H_UserNo_Value"].value = "";
			odjf_SetdlDept("txRcvDept","","txRcvEmp",document.all["H_OD_ODR120_RCVROLE"].value,true);
			//1110110	Cloud		1101600	修改受文者姓名不移除自己
			//jf_RemoveSelfFromDL(document.all["txRcvEmp"],document.all["H_UserID"].value);
			//依選項多寡固定下拉式選單可見長度
			if(document.all["txRcvEmp"].options.length > 10)
				document.all["txRcvEmp"].size = 10;
			else if(document.all["txRcvEmp"].options.length ==1)
				document.all["txRcvEmp"].size = 2;
			else
				document.all["txRcvEmp"].size = document.all["txRcvEmp"].options.length;
		}
		else													//選擇所屬單位時，承辦人下拉選單為可見
		{
			document.all["trRcvDept"].className	= "hide";
			document.all["dlSubDept_Container"].className = "hide";
			//1050401 David 1050087 二代公文修改
			//document.all["trRcvEmp"].className	= "";
			document.all["trRcvEmp"].className = "dTR";
			
			//初始化人員下拉選單
			document.all["txRcvEmp_Text"].value = "";
			document.all["H_User_Value"].value = "";
			document.all["H_UserNo_Value"].value = "";
			odjf_SetdlUserByUnitCode(document.all["H_DeptNo"].value,"txRcvEmp",document.all["H_OD_ODR120_RCVROLE"].value,true);
			//1110110	Cloud		1101600	修改受文者姓名不移除自己
			//jf_RemoveSelfFromDL(document.all["txRcvEmp"],document.all["H_UserID"].value);
			//依選項多寡固定下拉式選單可見長度
			if(document.all["txRcvEmp"].options.length > 10)
				document.all["txRcvEmp"].size = 10;
			else if(document.all["txRcvEmp"].options.length ==1)
				document.all["txRcvEmp"].size = 2;
			else
				document.all["txRcvEmp"].size = document.all["txRcvEmp"].options.length;
		}
	}
	else if(document.all["H_OD_FLOW_TYPE"].value == "1")	//一層式登記桌架構
	{
		if (document.all["rbSendTarget_0"].checked)				//選擇其他單位時，承辦單位下拉選單為可見
		{
			//1050401 David 1050087 二代公文修改
			//document.all["trRcvDept"].className	= "";
			document.all["trRcvDept"].className	= "dTR";
			document.all["trRcvEmp"].className	= "hide";
		}
		else													//選擇所屬單位時，承辦人下拉選單為可見
		{
			document.all["trRcvDept"].className	= "hide";
			//1050401 David 1050087 二代公文修改
			//document.all["trRcvEmp"].className	= "";
			document.all["trRcvEmp"].className = "dTR";
			
			//Yvonne 955101---start---避免排除自己後多ㄧ個空白選項
			//初始化人員下拉選單
			document.all["txRcvEmp_Text"].value = "";
			document.all["H_User_Value"].value = "";
			document.all["H_UserNo_Value"].value = "";
			odjf_SetdlUserByUnitCode(document.all["H_DeptNo"].value,"txRcvEmp",document.all["H_OD_ODR120_RCVROLE"].value,true);
			//1110110	Cloud		1101600	修改受文者姓名不移除自己
			//jf_RemoveSelfFromDL(document.all["txRcvEmp"],document.all["H_UserID"].value);
			//依選項多寡固定下拉式選單可見長度
			if(document.all["txRcvEmp"].options.length > 10)
				document.all["txRcvEmp"].size = 10;
			else if(document.all["txRcvEmp"].options.length ==1)
				document.all["txRcvEmp"].size = 2;
			else
				document.all["txRcvEmp"].size = document.all["txRcvEmp"].options.length;
			//Yvonne 955101---end---
		}
		document.all["dlSubDept_Container"].className = "hide";
	}
	else if(document.all["H_OD_FLOW_TYPE"].value == "2")	//二層式登記桌架構
	{
		if (document.all["rbSendTarget_0"].checked)				//選擇其他單位時
		{
			//1050401 David 1050087 二代公文修改
			/*document.all["trRcvDept"].className	= "";
			document.all["txRcvDept_Container"].className = "InputFieldLabel";
			document.all["dlSubDept_Container"].className = "InputFieldLabel";*/
			document.all["trRcvDept"].className	= "dTR";
			document.all["txRcvDept_Container"].className = "custom-combobox";
			document.all["dlSubDept_Container"].className = "custom-combobox";
			document.all["trRcvEmp"].className	= "hide";
			
			odjf_SetdlDept("txRcvDept","dlSubDept","","",false);	//初始dlSubDept的處理
			
			if(document.all["dlSubDept"].options.length > 10)
				document.all["dlSubDept"].size = 10;
			else if(document.all["dlSubDept"].options.length ==1)
				document.all["dlSubDept"].size = 2;
			else
				document.all["dlSubDept"].size = document.all["dlSubDept"].options.length;
			//無值不顯示
			jf_HandleComboxStatus("dlSubDept");
		}
		else													//選擇所屬單位時，收文者姓名為可見
		{
			if(document.all["H_DeptNo"].value.length == 2)			//使用者所屬單位為一級單位，則承辦科別及承辦人下拉選單為可見
			{
				//1050401 David 1050087 二代公文修改
				//document.all["trRcvDept"].className	= "";
				document.all["trRcvDept"].className	= "dTR";
				document.all["txRcvDept_Container"].className = "hide";
				//1050401 David 1050087 二代公文修改
				//document.all["dlSubDept_Container"].className = "InputFieldLabel";
				document.all["dlSubDept_Container"].className = "custom-combobox";
				
				//初始化二級單位下拉選單
				document.all["dlSubDept_Text"].value = "";
				document.all["H_Sect_Value"].value = "";
				document.all["H_SectNo_Value"].value = "";
				odjf_SetdlSectByUnitCode(document.all["H_DeptNo"].value,"dlSubDept");
				
				if(document.all["dlSubDept"].options.length > 10)
					document.all["dlSubDept"].size = 10;
				else if(document.all["dlSubDept"].options.length ==1)
					document.all["dlSubDept"].size = 2;
				else
					document.all["dlSubDept"].size = document.all["dlSubDept"].options.length;
				
				//無值不顯示
				jf_HandleComboxStatus("dlSubDept");

				if(document.all["dlSubDept_Container"].className == "hide")
					document.all["trRcvDept"].className	= "hide";
				else
					document.all["spanSpace"].className	= "hide";
			}
			else													//使用者所屬單位為二級單位，則只見承辦人下拉選單
			{
				document.all["trRcvDept"].className	= "hide";
			}
			
			document.all["trRcvEmp"].className	= "";
			
			//初始化人員下拉選單
			document.all["txRcvEmp_Text"].value = "";
			document.all["H_User_Value"].value = "";
			document.all["H_UserNo_Value"].value = "";
			odjf_SetdlUserByUnitCode(document.all["H_DeptNo"].value,"txRcvEmp",document.all["H_OD_ODR120_RCVROLE"].value,false);
			//1110110	Cloud		1101600	修改受文者姓名不移除自己
			//jf_RemoveSelfFromDL(document.all["txRcvEmp"],document.all["H_UserID"].value);
			if(document.all["txRcvEmp"].options.length > 10)
				document.all["txRcvEmp"].size = 10;
			else if(document.all["txRcvEmp"].options.length ==1)
				document.all["txRcvEmp"].size = 2;
			else
				document.all["txRcvEmp"].size = document.all["txRcvEmp"].options.length;
		}
	}
}

//[二層式登記桌架構] 承辦單位下拉選單onblur時的檢查 Charles 0950921
var uDeptChecked = false;
function txRcvDept_Text_onblur(argIsCheckDone)
{
	if(uDeptChecked)
	{
		uDeptChecked = false;
		return;
	}
	if(argIsCheckDone)
		uDeptChecked = true;

	var bCheckOK = true;
	if (document.all["txRcvDept_Text"].value != document.all["H_Dept_Value"].value)
	{
		//呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("txRcvDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept_Value"].value = document.all["txRcvDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_DeptNo_Value"].value = odjf_GetSelectValue(document.all["txRcvDept"],document.all["H_Dept_Value"].value);
			
			if(document.all["H_OD_FLOW_TYPE"].value == "0")			//無登記桌，帶出收文單位下之承辦人，顯示於收文者姓名欄位
			{
				odjf_SetdlDept("txRcvDept","","txRcvEmp",document.all["H_OD_ODR120_RCVROLE"].value,true);	//初始txRcvEmp的處理

				document.all["H_User_Value"].value = document.all["txRcvEmp_Text"].value;
				document.all["H_UserNo_Value"].value = odjf_GetSelectValue(document.all["txRcvEmp"],document.all["H_User_Value"].value);
				//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
				document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["txRcvEmp"]);
				
				//依選項多寡固定下拉式選單可見長度
				if(document.all["txRcvEmp"].options.length > 10)
					document.all["txRcvEmp"].size = 10;
				else if(document.all["txRcvEmp"].options.length ==1)
					document.all["txRcvEmp"].size = 2;
				else
					document.all["txRcvEmp"].size = document.all["txRcvEmp"].options.length;

				//無值不顯示
				//Yvonne 955101 收文者無值仍顯示該欄位
				//jf_HandleComboxStatus("txRcvEmp");
			}
			else if(document.all["H_OD_FLOW_TYPE"].value == "2")	//二層式登記桌架構，帶出收文單位下之二級單位
			{
				odjf_SetdlDept("txRcvDept","dlSubDept","","",false);	//初始dlSubDept的處理

				document.all["H_Sect_Value"].value = document.all["dlSubDept_Text"].value;
				document.all["H_SectNo_Value"].value = odjf_GetSelectValue(document.all["dlSubDept"],document.all["H_Sect_Value"].value);
				
				document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSubDept"]);
				
				if(document.all["dlSubDept"].options.length > 10)
					document.all["dlSubDept"].size = 10;
				else if(document.all["dlSubDept"].options.length ==1)
					document.all["dlSubDept"].size = 2;
				else
					document.all["dlSubDept"].size = document.all["dlSubDept"].options.length;

				//無值不顯示
				jf_HandleComboxStatus("dlSubDept");
			}
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

var uSectChecked = false;
function dlSubDept_Text_onblur(argIsCheckDone)
{
	if(uSectChecked)
	{
		uSectChecked = false;
		return;
	}
	if(argIsCheckDone)
		uSectChecked = true;

	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlSubDept_Text"].value != document.all["H_Sect_Value"].value)
	{
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlSubDept", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect_Value"].value = document.all["dlSubDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_SectNo_Value"].value = odjf_GetSelectValue(document.all["dlSubDept"],document.all["H_Sect_Value"].value);
			
			document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSubDept"]);
			
			//二層式登記桌架構、使用者為一級單位且選擇所屬單位，才需在承辦科別下拉選單變動時連動處理承辦人下拉選單
			if(document.all["H_OD_FLOW_TYPE"].value == "2" && document.all["H_DeptNo"].value.length == 2 && document.all["rbSendTarget_1"].checked)
			{
				//初始txRcvEmp收文者姓名下拉式選單
				if(document.all["H_SectNo_Value"].value.split(":").length == 4)
				{
					var arrValue = document.all["H_SectNo_Value"].value.split(":");
					odjf_SetdlUserByUnitCode(arrValue[2],"txRcvEmp",document.all["H_OD_ODR120_RCVROLE"].value,false);
				}
				else
				{
					odjf_SetdlUserByUnitCode(document.all["H_DeptNo"].value,"txRcvEmp",document.all["H_OD_ODR120_RCVROLE"].value,false);
				}
				//1110110	Cloud		1101600	修改受文者姓名不移除自己
				//jf_RemoveSelfFromDL(document.all["txRcvEmp"],document.all["H_UserID"].value);
				
				document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["txRcvEmp"]);
				
				//依選項多寡固定下拉式選單可見長度
				if(document.all["txRcvEmp"].options.length > 10)
					document.all["txRcvEmp"].size = 10;
				else if(document.all["txRcvEmp"].options.length ==1)
					document.all["txRcvEmp"].size = 2;
				else
					document.all["txRcvEmp"].size = document.all["txRcvEmp"].options.length;

				//無值不顯示
				//Yvonne 955101 收文者姓名無值仍顯示該欄位
				//jf_HandleComboxStatus("txRcvEmp");
			}
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

var uUserChecked = false;
function txRcvEmp_Text_onblur(argIsCheckDone)
{
	if(uUserChecked)
	{
		uUserChecked = false;
		return;
	}
	if(argIsCheckDone)
		uUserChecked = true;

	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["txRcvEmp_Text"].value != document.all["H_User_Value"].value)
	{
		//呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("txRcvEmp", "承辦人"))
		{
			document.all["H_User_Value"].value = document.all["txRcvEmp_Text"].value;
			
			document.all["H_UserNo_Value"].value = odjf_GetSelectValue(document.all["txRcvEmp"],document.all["H_User_Value"].value);
			
			document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["txRcvEmp"]);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
    if(document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
    {
		//1050401 David 1050087 二代公文修改
        //document.all[argComboxID + "_Container"].className = "InputFieldText";
		document.all[argComboxID + "_Container"].className = "custom-combobox";
    }
}

//[需求單955101] 查詢前檢查 Charles 0951020
function jf_CheckBeforeSearch()
{
	//避免失敗時不會重複出現錯誤訊息的問題
	uDeptChecked = false;
	uSectChecked = false;
	uUserChecked = false;
	
	if(!txRcvDept_Text_onblur(true))
		return false;

	if(!dlSubDept_Text_onblur(true))
		return false;

	if(!txRcvEmp_Text_onblur(true))
		return false;

    return true;
}

//移除
function jf_RemoveSelfFromDL(argSource,argValue)
{
	var arrTemp = "";
	for(var i=0; i < argSource.options.length; i++)
	{
		if(argSource.options[i].value.split(':').length == 4)
		{
			arrTemp = argSource.options[i].value.split(':');
			if(arrTemp[2] == argValue)
			{
				argSource.remove(i);
				i = i - 1;
			}
		}
	}
}
//[需求單955101] 下拉選單檢查 Charles 0951020 ↑

//96.02.14 David 台科大送文日期區間
function CallPadFunc(strObjName)
{	
	switch(strObjName)
	{		
		case "txSendDateS":						
		case "txSendDateE":
			if(document.all[strObjName].value != "")				
			{
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,7,"0");
				if (!jf_CheckCDATE(document.all[strObjName].value))
				{
					alert("日期格式不正確");
					document.all[strObjName].focus();
					document.all[strObjName].value="";
				}
			}
			break;		
	}	
}

//0990400 CDC新增，依選項帶出時間、時間格式檢查、帶出批號前檢查 0990707 Johnny --start
function TimeChange(argValue)
{
	if(argValue==1)
	{
		document.all.txSendTimeS.value="0700";
		document.all.txSendTimeE.value="1300";
	}
	else if(argValue==2)
	{
		document.all.txSendTimeS.value="1301";
		document.all.txSendTimeE.value="2200";
	}
	else
	{
		document.all.txSendTimeS.value="";
		document.all.txSendTimeE.value="";
	}
}

function checkDate()
{
	if(document.all.txSendDate.value != "")
		if (!jf_CheckCDATE(document.all.txSendDate.value))
		{
			alert("成批日期格式不正確");
			document.all.txSendDate.focus();
		}
}

function checkTime(argName)
{
	if(document.all[argName].value.length == 3)
		document.all[argName].value="0"+document.all[argName].value;
	if(document.all[argName].value.length != 4 && document.all[argName].value.length > 0)
	{
		alert("時間格式不正確");
		document.all[argName].focus();
		return false;
	}
	var time1=document.all[argName].value.substr(0,2);
	var time2=document.all[argName].value.substr(2,2);
	if(time1 != "")
		if(time1<"00" || time1>"23")
		{
			alert("時間格式不正確");
			document.all[argName].focus();
			return false;
		}
		
	if(time2 != "")
		if(time2<"00" || time2>"59")
		{
			alert("時間格式不正確");
			document.all[argName].focus();
			return false;
		}
}

function CheckBeforGetBatch()
{
	if(document.all.txSendDate.value=="")
		return false;
	else
		return true;
}
// --end

//1000221 Linda 將CheckCDATE從ODI110取來用
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			document.all[argObj].focus();
		}
	}
}

//1140414 Cloud	Andy 1140264 勾選依標檢局原有格式列印無法匯出EXCEL、ODS
function BtExcelDisable()
{
	if (document.all["cbBSMIForm"].checked) {
		document.all["btExcel"].disabled = true;
		document.all["btODS"].disabled = true;
	}
	else {
		document.all["btExcel"].disabled = false;
		document.all["btODS"].disabled = false;
    }
}