/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2007.04.11
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2009.08.11	Howard	0980391	新增sync()，由一級單位選擇完後，自動帶出二級單位
 * 2010.06.30	Leslie	0990356	當使用者選擇"明細表"時，將報表的分頁及排序選項Disable
 * 2017.01.24	Kenny	1050087 二代公文系統相關修改
 * 2020.03.04	Kevin_C	1081156 修正POSTBACK後未連動帶出二級單位選單的問題
 * 2025.04.02	Daniel	1140132 增加匯出Excel與ODS按鈕
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060125	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060125	Kenny	[1050087]   二代公文系統相關修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060125	Kenny	[1050087]   二代公文系統相關修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060125	Kenny	[1050087]   二代公文系統相關修改
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
		/*
		case "":
			break;
		*/
	}	
}

//1060125	Kenny	[1050087]   二代公文系統相關修改
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
	
	//1060125	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
			//1060125	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		//1140402	1140132		Daniel	增加匯出Excel與ODS按鈕
		case "btOds" :
		case "btExcel" :
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			//1060125	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	if(document.all.OdFlowType)
	{
		if(document.all.OdFlowType.value =="2")
			CheckddlIsPostBack();
	}	
	if(document.all["rbDetail"].checked == true)
		setReportStatus(true);
}

function OnWSResult(argResult)
{
    //0980812	0980391	Howard	初始化承辦單位二級科室
	if(argResult.id == CallWS_ID_SECT)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{			
			WSResult = argResult.value;		
			
            //1060125	Kenny	[1050087]   二代公文系統相關修改
			//document.all["dlSect_Container"].className = "";
            document.all["dlSect_Container"].className = "custom-combobox";
			document.all["dlSect"].className = "";
			document.all["dlSect_Text"].className = "";
			
			document.all["dlSect_Text"].value = "";
			
			while(document.all.dlSect.options[0] != null)
			{
				document.all.dlSect.options[0]=null;				
			}
			
			if(WSResult.SecNo.length != 0)
			{
				//清除二級單位下拉選單的值
				ClearDL(document.all["dlSect"]);			
				//判斷一級單位欄位是否有選取值
				if(document.all["dlRcvNo"].value != "")
				{
					var Blank_Data = document.createElement("OPTION");
					Blank_Data.text = "(僅含一級單位)";
					Blank_Data.value = document.all["dlRcvNo"].options[document.all["dlRcvNo"].selectedIndex].value;				
					document.all.dlSect.options.add(Blank_Data);
											
					for(var i=0;i<WSResult.SecNo.length;i++)
					{
						var SectDropListChild = document.createElement("OPTION");
						SectDropListChild.text = WSResult.SecName[i];
						SectDropListChild.value = WSResult.SecNo[i];
						document.all.dlSect.options.add(SectDropListChild);
					}
					//0980924 設定下拉選單長度[0980457]-Jane
					if(document.all["dlSect"].options.length > 10)
						document.all["dlSect"].size = 10;
					else if(document.all["dlSect"].options.length ==1)
						document.all["dlSect"].size = 2;
					else
						document.all["dlSect"].size = document.all["dlSect"].options.length;
					/*if(document.all["dlSect"].options.length > 10)
					{
						document.all["dlSect"].size = 10;
					}*/
				}
			}
			else
			{				
				while(document.all.dlSect.options[0] != null)
				{
					document.all.dlSect.options[0]=null;				
				}	
			}
		}				
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1060125	Kenny	[1050087]   二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function CheckBeforePrint()
{
	var strSTime;
	var strETime;
	var strSHour;
	var strEHour;
	var strErrMsg="";
	var strBuffer="";
	var bRtnBool;
	
	if (document.all["rbDetail"].checked)
	{
		if (document.all["txSDate"].value + document.all["txEDate"].value == "")
		{
			bRtnBool = false;
			//1060125	Kenny	[1050087]   二代公文系統相關修改
            //document.all["txSDate"].focus();
            $('#txSDate').focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["退文日期起訖不可皆為空白"])),"");
		}
		else
			bRtnBool = true;
	}
	else if (document.all["rbTicket"].checked)
	{
		strSTime = document.all["txSTime"].value;
		strETime = document.all["txETime"].value;
		strSHour = document.all["txSHour"].value;
		strEHour = document.all["txEHour"].value;
		if (strEHour == "")
		{
			//1060125	Kenny	[1050087]   二代公文系統相關修改
            //document.all["txEHour"].focus();
            $('#txEHour').focus();
			strErrMsg = "迄止時間不可空白" + "\n" + strErrMsg;
		}
		if (strSHour == "")
		{
			//1060125	Kenny	[1050087]   二代公文系統相關修改
            //document.all["txSHour"].focus();
            $('#txSHour').focus();
			strErrMsg = "起始時間不可空白" + "\n" + strErrMsg;
		}
		if (strETime == "")
		{
			//1060125	Kenny	[1050087]   二代公文系統相關修改
            //document.all["txETime"].focus();
            $('#txETime').focus();
			strErrMsg = "迄止日期不可空白" + "\n" + strErrMsg;
		}
		if (strSTime == "")
		{
			//1060125	Kenny	[1050087]   二代公文系統相關修改
            //document.all["txSTime"].focus();
            $('#txSTime').focus();
			strErrMsg = "起始日期不可空白" + "\n" + strErrMsg;
		}
		if (strErrMsg != "")
		{
			bRtnBool = false;
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		}
		else
			bRtnBool = true;
	}
	
	return bRtnBool;
}

/*****************************************************************************************
							其	他	共	用	function
******************************************************************************************/
//日期onblur
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
			//1060125	Kenny	[1050087]   二代公文系統相關修改
            //document.all[argObj].focus();
            $('#'+argObj).focus();
		}
	}
}
//HH 時間檢查
function CheckTicketTime(argObj,strMsg)
{
	var strTime = document.all[argObj].value;
	if (strTime != "")
	{
		strTime = jf_PADL(strTime,2,'0');
		document.all[argObj].value = strTime;
		if(parseInt(strTime) > 24 || parseInt(argObj.value) < 0)
		{
			//1060125	Kenny	[1050087]   二代公文系統相關修改
            //document.all[argObj].focus();
            $('#'+argObj).focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		}
	}
}
//0980812	0980391	HOWARD 修正可支援查詢二級單位之退文單--START
//取得二級單位
var CallWS_ID_SECT;
function SyncDL(argDLObj)
{	
	var bAction = true;
	var strDept = new Array();
	var argObjText = argDLObj+"_Text";
	var bDept = false;
	var bSect = false;
	
	for ( var i = 0 ; i < document.all[argDLObj].length ; i++)
	{	
		//判斷使用者輸入之單位代碼是否存在
		if(document.all[argDLObj].options[i].text == document.all[argObjText].value )
		{
			document.all[argDLObj].selectedIndex = i;
			bDept = true;
			break;
		}
	}
	if (!bDept)
	{
		document.all[argDLObj].selectedIndex = -1;
	}
	if(document.all[argDLObj].selectedIndex == -1)
	{	
		//若不存在，則清空二級單位下拉選單
		if (document.all[argObjText].value !="")
		{
			ClearDL(document.all.dlSect);
			return;
		}
	}
	if(argDLObj == "dlRcvNo" )
	{	//若為一級單位下拉選單
		if(document.all["dlRcvNo"].selectedIndex != -1)
		{
			strDept = document.all["dlRcvNo"].options[document.all["dlRcvNo"].selectedIndex].value.split(':');	
			document.all["H_dlSect_Value"].value = "";
			document.all["H_dlSect_Text"].value = "";
		}
		else
			bAction = false;
	}
	if(argDLObj == "dlSect")	
	{	
		//若為二級單位下拉選單
		if(document.all["dlSect"].selectedIndex != -1 && jf_Trim(document.all["dlSect_Text"].value) != "" )
		{	
			document.all["H_dlSect_Value"].value = jf_Trim(document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value);
			document.all["H_dlSect_Text"].value  = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].text;		
		}
		else if(jf_Trim(document.all["dlSect_Text"].value) == "")
		{
			document.all["H_dlSect_Value"].value = "";
			document.all["H_dlSect_Text"].value  = "";
		}
		return;
	}

	//取二級單位用
	var param1 = new Array(3);
	param1[0] = false;
	param1[1] = true;
	param1[2] = jf_Trim(strDept[0]);
	
	var RtnObjSect;	
	if(argDLObj == "dlRcvNo" && bAction)
	{	
		RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDepts",false,param1);
		CallWS_ID_SECT = RtnObjSect.id;
		OnWSResult(RtnObjSect);
	}
}

function CheckddlIsPostBack()
{
	var arrSect = new Array(2);
	//判斷承辦單位二級單位下拉選單

	if(document.all["H_dlSect_Text"].value !="")
	{	
		arrSect[0] = jf_Trim(document.all["H_dlSect_Text"].value);
		arrSect[1] = jf_Trim(document.all["H_dlSect_Value"].value);
		SyncDL("dlRcvNo");
		document.all["dlSect_Text"].value		= arrSect[0];
		document.all["H_dlSect_Text"].value		= arrSect[0];
		document.all["H_dlSect_Value"].value	= arrSect[1];
	}
	//1090304	Kevin_C	1081156 就算沒選二級單位也要重建選單
	else
		SyncDL("dlRcvNo");
}
//將DropDownList裡的item清除
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	return;
}

//0980812	0980391	HOWARD 修正可支援查詢二級單位之退文單--END

//0990630	Leslie[0990356]	增加UI控制，於選擇"明細表"時，報表選項則一律Disable	==START==
var lastChoice = "rbDetail";
function fnGNonchange(argValue)
{
	if(argValue == lastChoice)
		return;
	lastChoice = argValue;
	if(argValue == "rbDetail")
		setReportStatus(true);
	else
		setReportStatus(false);	
}

function setReportStatus(argType)
{
	document.all["rbByDept"].disabled = argType;
	document.all["rbByUserName"].disabled = argType;
	document.all["rbNo"].disabled = argType;
}
//0990630	Leslie[0990356]	增加UI控制，於選擇"明細表"時，報表選項則一律Disable	==END==

/*************************************************
		測試程式
**************************************************/
function akjf_DeptCheck()
{}