/*
DATE		SA			PRG		MGR_NO			DESC
1060301		Cloud		Joe		1050087			二代系統升級
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsGetClsID;
var wsGetClsCaseID;
var bIsDoubleMsg = false;
var bIsDoubleMsg2 = false;
var strMode="";
var pNo3 = "";

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1060301	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060301	Joe		1050087		二代公文修改--S
	// jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, null);
	// jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckCase", false, null);
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//1060301	Joe		1050087		二代公文修改--E
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060301	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060301	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

	var pNo1 = xObjectName.substring(8, xObjectName.indexOf("_btClsHelp"));
	var pNo2 = xObjectName.substring(8, xObjectName.indexOf("_btCaseHelp"));
	var btClsHelp;
	var btCaseHelp;
	var ClsIdObj;
	var CaseIdObj;
	var strYear="";
	var strVerNo = document.all["H_VerNo"].value;

	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo1+"_btClsHelp"] != null)
	{
		btClsHelp = document.all["dg1__ctl" + pNo1 + "_btClsHelp"].id;
		ClsIdObj = document.all["dg1__ctl" + pNo1 + "_txCls"];
		strYear = document.all["dg1__ctl" + pNo1 + "_txYear"].value;
		pNo3 = pNo1;
	}
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo2+"_btCaseHelp"] != null)
	{
		btCaseHelp = document.all["dg1__ctl" + pNo2 + "_btCaseHelp"].id;
		ClsIdObj = document.all["dg1__ctl" + pNo2 + "_txCls"];
		CaseIdObj = document.all["dg1__ctl" + pNo2 + "_txCase"];
		strYear = document.all["dg1__ctl" + pNo2 + "_txYear"].value;
		pNo3 = pNo2;
	}

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
		case btClsHelp:
			Page_BlockSubmit=true;
			strMode = "1";
			strUrl = "../EA01/EAC005.aspx?MODE="+strMode+"&VER_NO="+strVerNo+"&DEPT_NO=&FILE_YEAR=" + strYear + "&FILE_CLS=" + ClsIdObj.value + "&nFrom=EAC005";
			jf_OpenChildWin(strUrl, "EAC005", 700, 500 );
			break;
		case btCaseHelp:
			Page_BlockSubmit=true;
			strMode = "2";
			strUrl = "../EA01/EAC005.aspx?MODE="+strMode+"&VER_NO="+strVerNo+"&DEPT_NO=&FILE_YEAR=" + strYear + "&FILE_CLS=" + ClsIdObj.value + "&nFrom=EAC005";
			jf_OpenChildWin(strUrl, "EAC005", 700, 500 );
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060301 Joe 1050087 二代公文修改，傳入參數event
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

	//1060301 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1060301 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(false);
			for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
			{
				document.all["dg1__ctl"+iRow+"_lbCaseName"].textContent = "";
				document.all["dg1__ctl"+iRow+"_H_dgCaseKey"].value = "";
				document.all["dg1__ctl"+iRow+"_H_dgClsKey"].value = "";
			}
			break;
		case "btExit":
			close();
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;

	if (jf_CheckBeforSave())
		bRtnbool = true;

	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";

	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)	
	{
		if (document.all["dg1__ctl"+iRow+"_H_dgCaseKey"].value == document.all["H_CaseKey"].value)
		{
			strErrMsg = "相關案件不可與原案件相同";
			//1060301	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["dg1__ctl"+iRow+"_txCase"].focus();
			$('#dg1__ctl' + iRow + '_txCase').focus();
			break;
		}
	}

	if(!CheckDuplicate())
		bRtnbool = false;

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}

	return bRtnbool;
}

//不可重複檢查
function CheckDuplicate()
{
	var strErrMsg= "";
	for(var iRow = 2; iRow <= document.all.dg1.rows.length; iRow++)
	{
		var strCaseKey1 = document.all["dg1__ctl" + iRow + "_H_dgCaseKey"].value;
		if (strCaseKey1 == "") continue;
		for(var iCol = iRow+1; iCol <= document.all.dg1.rows.length; iCol++)
		{
			var strCaseKey2 = document.all["dg1__ctl" + iCol + "_H_dgCaseKey"].value;
			if (strCaseKey2 == "") continue;
			if (strCaseKey1 == strCaseKey2)
			{
				strErrMsg= "相關案卷不可重複";
				//1060301	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["dg1__ctl"+iCol+"_txCase"].focus();
				$('#dg1__ctl' + iCol + '_txCase').focus();
				break;
			}
		}
		if (strErrMsg != "") break;
	}

	if (strErrMsg != "")
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		return false;
	}
	return true;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult, pNo)
{
    //webserver回傳後動作
    if (argResult.id == wsGetClsID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			document.all["dg1__ctl"+pNo+"_H_dgClsKey"].value = argResult.value.ClsKey;
			//改變分類號->清空案次號
			document.all["dg1__ctl"+pNo+"_H_dgCaseKey"].value = "";
			document.all["dg1__ctl"+pNo+"_txCase"].value = "";
			document.all["dg1__ctl"+pNo+"_lbCaseName"].textContent = "";
		}
		else
		{
			document.all["dg1__ctl"+pNo+"_H_dgClsKey"].value = "";
			document.all["dg1__ctl"+pNo+"_txCase"].value = "";
			document.all["dg1__ctl"+pNo+"_H_dgCaseKey"].value = "";
			if(argResult.value.m_strErrMsg.substring(0,3)=="年度號")
				//1060301	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["dg1__ctl"+pNo+"_txYear"].focus();
				$('#dg1__ctl' + pNo + '_txYear').focus();
			else
				//1060301	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["dg1__ctl"+pNo+"_txCls"].focus();
				$('#dg1__ctl' + pNo + '_txCls').focus();
		}
    }
    else if (argResult.id == wsGetClsCaseID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (argResult.value.CaseYear != "")
				document.all["dg1__ctl"+pNo+"_txYear"].value = argResult.value.CaseYear;
			document.all["dg1__ctl"+pNo+"_H_dgCaseKey"].value = argResult.value.CaseKey;
			document.all["dg1__ctl"+pNo+"_lbCaseName"].textContent = argResult.value.CaseName;
		}
		else
		{
			document.all["dg1__ctl"+pNo+"_H_dgCaseKey"].value = "";
			if (argResult.value.m_strErrMsg.indexOf("、")>=0)
				//1060301	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["dg1__ctl"+pNo+"_txYear"].focus();
				$('#dg1__ctl' + pNo + '_txYear').focus();
			else
				//1060301	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["dg1__ctl"+pNo+"_txCase"].focus();
				$('#dg1__ctl' + pNo + '_txCase').focus();
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
	if(argCallerId == "EAC005")
	{
		document.all["dg1__ctl"+pNo3+"_txYear"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["dg1__ctl"+pNo3+"_txCls"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["dg1__ctl"+pNo3+"_txCase"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		if (document.all.lbReturnValue.options.length >= 4)
			document.all["dg1__ctl"+pNo3+"_H_dgCaseKey"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if (document.all.lbReturnValue.options.length >= 5)
			document.all["dg1__ctl"+pNo3+"_H_dgClsKey"].value = jf_Trim(document.all.lbReturnValue.options[4].value);
		if (strMode == "1")
			//1060301	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["dg1__ctl"+pNo3+"_txCls"].focus();
			$('#dg1__ctl' + pNo3 + '_txCls').focus();
		else
			//1060301	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["dg1__ctl"+pNo3+"_txCase"].focus();
			$('#dg1__ctl' + pNo3 + '_txCase').focus();
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
function txOnblur(objId)
{
	var xObjectName = event.srcElement.id;
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_"+objId));
	var strYear = document.all["dg1__ctl"+pNo+"_txYear"].value;

	if (objId == "txYear")
	{
		if (strYear != "")
		{
			strYear = jf_PADL(strYear, 3, '0');
			document.all["dg1__ctl"+pNo+"_txYear"].value = strYear;
		}
		fnCase_onblur(pNo);
	}
	else if (objId == "txCase")
	{
		fnCase_onblur(pNo);
	}
	else if (objId == "txCls")
	{
		fnCls_onblur(pNo);
	}
}

function fnCls_onblur(pNo)
{
/*
	if (bIsDoubleMsg == true)
	{
		bIsDoubleMsg = false;
		return;
	}
	var actElementId = document.activeElement.id;
	var srcElementId = event.srcElement.id;
	if ((actElementId.indexOf("_txCls") >= 0 && srcElementId.indexOf("_txCls") >= 0 == "") || (actElementId == "txVerNo" && srcElementId == "txFileCls"))
		bIsDoubleMsg = true;*/

	if (document.all["dg1__ctl"+pNo+"_txCls"].value == "")
	{
		document.all["dg1__ctl"+pNo+"_H_dgClsKey"].value = "";
		return;
	}
	var arWSParam = new Array(3);
	arWSParam[0] = document.all["H_Source"].value;
	arWSParam[1] = document.all["H_VerNo"].value;
	arWSParam[2] = document.all["dg1__ctl"+pNo+"_txCls"].value;
	arWSParam[3] = document.all["dg1__ctl"+pNo+"_txYear"].value;
	callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, arWSParam);

	wsGetClsID = callObj.id;
	OnWSResult(callObj, pNo);
}

function fnCase_onblur(pNo)
{
	if (bIsDoubleMsg2 == true)
	{
		bIsDoubleMsg2 = false;
		return;
	}
	var actElementId = document.activeElement.id;
	var srcElementId = event.srcElement.id;
	if ((actElementId.indexOf("_txCase") > 0 && srcElementId.indexOf("_txYear") > 0) || (actElementId.indexOf("_txYear") > 0 && srcElementId.indexOf("_txCase") > 0))
		bIsDoubleMsg2 = true;

	if (document.all["dg1__ctl"+pNo+"_txCase"].value=="")
	{
		document.all["dg1__ctl"+pNo+"_H_dgCaseKey"].value = "";
		document.all["dg1__ctl"+pNo+"_lbCaseName"].textContent = "";
		return;
	}

	var arWSParam = new Array(4);
	arWSParam[0] = document.all["H_Source"].value;
	arWSParam[1] = document.all["dg1__ctl"+pNo+"_txYear"].value;
	arWSParam[2] = document.all["dg1__ctl"+pNo+"_H_dgClsKey"].value;
	arWSParam[3] = document.all["dg1__ctl"+pNo+"_txCase"].value;
	var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckCase", false, arWSParam);
	wsGetClsCaseID = callObj.id;
	OnWSResult(callObj, pNo);
}