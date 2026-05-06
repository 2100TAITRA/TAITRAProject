/*
 * DATE		PRG		MGR_NO		DESC
 * 1060315	Justin	1050087		二代公文修改
 * 1110408	Zen		1101487		(考試院)新增檔案清理數量統計表並提供匯出Excel功能
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
//1060315  Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    /*1060315  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckPlanExist", false, null);*/

	//1110408 Zen 1101487 (考試院)新增檔案清理數量統計表並提供匯出Excel功能
	HandleButtonEnalbe();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060315  Justin [1050087] 二代公文修改
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
		case "btKeyHelp": //計畫批號提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "EAT400C1.aspx";
		    //1060315  Justin [1050087] 二代公文修改
		    //jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
		    jf_OpenChildWin(pUrl, "EAT400C1", 800, 600);
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060315  Justin [1050087] 二代公文修改 
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
	
    //1060315  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1060315  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1060315  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1060315  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1060315  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all["cbStore"].checked = true;
			document.all["cbMain"].checked = true;
			document.all["cbDetail"].checked = true;
			document.all["rbCase"].checked = true;
		    //1060315  Justin [1050087] 二代公文修改
			//document.all["txKeyFld"].focus();
			$('#txKeyFld').focus();
			break;
		case "btSearch":
			/*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			*/
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1060315  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		//1110408 Zen 1101487 (考試院)新增檔案清理數量統計表並提供匯出Excel功能
		case "btExcel":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1060315  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txKeyFld"].value == "")
	{
	    strErrMsg += "鍵值欄位不可空白\n";
	    //1060315  Justin [1050087] 二代公文修改
	    //document.all["txKeyFld"].focus();
	    $('#txKeyFld').focus();
	}
	
	if (document.all["txRequireFld"].value == "")
	{
	    strErrMsg += "必要欄位不可空白\n";
	    //1060315  Justin [1050087] 二代公文修改
	    //document.all["txRequireFld"].focus();
	    $('#txRequireFld').focus();
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
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
			
		}
		else
		{
		
		}
    }
    if(argResult.id = iCallID_txPlanNo)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
			document.all.txPlanDesc.value = argResult.value.RtnField1;
		/*	var FileRange = 
				argResult.value.RtnField2+"-"+
				argResult.value.RtnField3+"-"+
				argResult.value.RtnField4+"-"+
				argResult.value.RtnField5+"- ~ "+
				argResult.value.RtnField6+"-"+
				argResult.value.RtnField7+"-"+
				argResult.value.RtnField8+"-"+
				argResult.value.RtnField9;
			document.all["txFileRange"].value = FileRange;*/
			var PlanType = argResult.value.RtnField0;
			for(i=0;i<document.all["dlStatus"].length;i++)
			{
				if(PlanType == document.all["dlStatus"].options(i).value)
				{
					document.all["dlStatus"].selectedIndex = i;
					break;
				}
			}
			
		}
		else
		{
		    document.all["txPlanNo"].value = "";
		    //1060315  Justin [1050087] 二代公文修改
		    //document.all["txPlanNo"].focus();
		    $('#txPlanNo').focus();
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
	
	if (argCallerId == "EAT400")
	{
	    document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
	    //1060315  Justin [1050087] 二代公文修改
	    //document.all["txPlanNo"].focus();
	    $('#txPlanNo').focus();
	}

	
	if (argCallerId == "EAT400C1")
	{
	    document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
	    //1060315  Justin [1050087] 二代公文修改
	    //document.all["txPlanNo"].focus();
	    $('#txPlanNo').focus();
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢核該清理批號是否存在
var iCallID_txPlanNo = "";
function CheckPlanNo()
{
	/*if(!jf_CheckDataExist("") && document.all["txPlanNo"].value != "")
	{		
		Page_BlockSubmit = false;
		alert("此清理批號不存在");	
		document.all["txPlanNo"].focus();
	}
	if(jf_CheckDataExist("") && document.all["txPlanNo"].value != "")
	{
		CheckPlanStatus();
	}*/
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(2);
	var arOrdFldName = new Array(1);
	
	if (!IsServerHandling)
	{
		if (document.all["txPlanNo"].value != "")
		{
			Page_BlockSubmit = true;
			
			arKeyName[0]    = "PLAN_NO";
			arKeyValue[0]   = document.all["txPlanNo"].value;
			arRtnFldName[0] = "PLAN_STATUS";
			arRtnFldName[1] = "PLAN_DESC";
			/*
			arRtnFldName[2] = "BEG_FILE_YEAR";
			arRtnFldName[3] = "BEG_FILE_CLS";
			arRtnFldName[4] = "BEG_FILE_CASE";
			arRtnFldName[5] = "BEG_FILE_VOL";
			
			arRtnFldName[6] = "END_FILE_YEAR";
			arRtnFldName[7] = "END_FILE_CLS";
			arRtnFldName[8] = "END_FILE_CASE";
			arRtnFldName[9] = "END_FILE_VOL";
			*/
			arOrdFldName[0] = "PLAN_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "PLAN_MAIN";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;			
			callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, arWSParam);	
			
			iCallID_txPlanNo = callObj.id;
			OnWSResult(callObj);
		}
	}
}

//檢核清理批號狀態
function CheckPlanStatus()
{
	var arrPara = new Array(2);
	arrPara[0] = document.all["txOrgNo"].value;
	arrPara[1] = document.all["txPlanNo"].value;
	callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckPlanExist", false, arrPara);
	wsDuplicateID = callObj.id;
	if(!OnWSResult(callObj))
	{
	    //1060315  Justin [1050087] 二代公文修改
	    //document.all["txPlanNo"].focus();
	    $('#txPlanNo').focus();
	}
}

function InitObj()
{
	
}

//1110408 Zen 1101487 (考試院)新增檔案清理數量統計表並提供匯出Excel功能
function HandleButtonEnalbe()
{
	if (document.all['rbExamStat'].checked)
	{
		document.all['btExcel'].disabled = false;
		document.all['rbCase'].disabled = true;
		document.all['rbVol'].disabled = true;
	}
	else
	{
		document.all['btExcel'].disabled = true;
		document.all['rbCase'].disabled = false;
		document.all['rbVol'].disabled = false;
    }
}