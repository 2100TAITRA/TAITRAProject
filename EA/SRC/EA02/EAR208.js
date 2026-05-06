/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1070124   Justin   1050087     二代公文修改
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
//1070124 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

var LastPage = "Page1";
	
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1070124 Justin [1050087] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1070124 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	//var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	//var btHelp;
	
	//取得確實按下的是哪個？鍵
	/*if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}*/
	
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
		//case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
		//	break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1070124 Justin [1050087] 二代公文修改 
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
	
	var dgIdx = "1";
	
	//指定DataGrid欄位
	var strTableFields = new Array("_txVer"+dgIdx,"_txYear"+dgIdx,"_txCls"+dgIdx,"_txCase"+dgIdx,"_txVol"+dgIdx);
	
    //1070124 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = !jf_CheckBeforSave();
		    //1070124 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_CheckBeforSave();
		    //1070124 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			if (jf_ConfirmClean(false))
			{
				document.all["rblClsCaseName"][1].checked = true;
			}
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
	//先進行ONBLUR
	for(var i = 3;i<document.all["dg1"].rows.length;i++)
	{
		OnblurSetData("txYear1",i);
		OnblurSetData("txCls1",i);
		OnblurSetData("txCase1",i);
		OnblurSetData("txVol1",i);
	}
	var bRtnbool = true;
	var strErrMsg= "";
	
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
		/*
	if(!jf_CheckBlankAndAlert("1"))
		bRtnbool = false;
	else if(!jf_CheckBlankAndAlert("2"))
		bRtnbool = false;
	else if(!jf_CheckBlankAndAlert("3"))
		bRtnbool = false;
	else if(!jf_CheckBlankAndAlert("4"))
		bRtnbool = false;*/
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{ 
	var InValidName = "";
	var TotalInValidName = "";
	var InValidControlName = "";
	var obj;
	var InvalidControlPage = "";
	var nBlankCnt = 0;

	obj = document.all["dg1"];
	InValidName = "";
	for(var i = 2; i <= obj.rows.length; i++)
	{
		var strVer = document.all["dg1__ctl" + i + "_txVer1"].value.replace(/(^[\s]*)|([\s]*$)/g, "");
		var strYear = document.all["dg1__ctl" + i + "_txYear1"].value.replace(/(^[\s]*)|([\s]*$)/g, "");
		var strCls = document.all["dg1__ctl" + i + "_txCls1"].value.replace(/(^[\s]*)|([\s]*$)/g, "");
		var strCase = document.all["dg1__ctl" + i + "_txCase1"].value.replace(/(^[\s]*)|([\s]*$)/g, "");
		var strVol = document.all["dg1__ctl" + i + "_txVol1"].value.replace(/(^[\s]*)|([\s]*$)/g, "");

		if(strYear != "" || strCls != "" ||	strCase != "" || strVol != "")
		{
			if(strVer == "")
			{
				InValidName += ",版本別不可空白";		
				if(InValidControlName == "")	
				{
					InvalidControlPage = "Page1";
					InValidControlName = "dg1__ctl" + i + "_txVer1";
				}
			}			
			
			if(strYear == "")
			{
				InValidName += ",年度號不可空白";		
				if(InValidControlName == "")	
				{
					InvalidControlPage = "Page1";
					InValidControlName = "dg1__ctl" + i + "_txCls1";
				}
			}			
			if(strCls == "")
			{
				InValidName += ",分類號不可空白";			
				if(InValidControlName == "")
				{
					InvalidControlPage = "Page1";
					InValidControlName = "dg1__ctl" + i + "_txCls1";
				}
			}
			if(strCase == "")
			{
				InValidName += ",案次號不可空白";			
				if(InValidControlName == "")
				{
					InvalidControlPage = "Page1";
					InValidControlName = "dg1__ctl" + i + "_txCase1";
				}
			}
			if(strVol == "")
			{
				InValidName += ",卷次號不可空白";			
				if(InValidControlName == "")
				{
					InvalidControlPage = "Page1";
					InValidControlName = "dg1__ctl" + i + "_txVol1";
				}
			}
							
			if(InValidName != "")
			{
			    InValidName = InValidName.substr(1, InValidName.length);
			    //1070124 Justin [1050087] 二代公文修改
			    //TotalInValidName += "序"+document.all["dg1__ctl" + i + "_lbSEQ_NO1"].innerText+"之列中,"+InValidName+"\n";
			    TotalInValidName += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO1"].textContent + "之列中," + InValidName + "\n";
				InValidName = "";
			}
		}
		else
		{
			nBlankCnt++;
		}
	}
	if(TotalInValidName != "")
	{
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([TotalInValidName])),"");
		SetPageStyle(InvalidControlPage);
	    //1070124 Justin [1050087] 二代公文修改
		//document.all[InValidControlName].focus();
		$('#' + InValidControlName).focus();
		return false;
	}
	if(nBlankCnt == 8)
	{
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請至少輸入一筆案卷資料。"])),"");
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

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function SetPageStyle(argPage)
{
	if(LastPage == argPage)
		return;
	document.all[argPage].className = "";
	document.all[LastPage].className = "hide";
	document.all["bt"+argPage].disabled = true;
	document.all["bt"+LastPage].disabled = false;
	LastPage = argPage;
}

function OnblurSetData(argObj,argSEQ)
{
	var obj;
	obj = document.all["dg1"];

	var strVer = document.all["dg1__ctl" + argSEQ + "_txVer1"].value.replace(/(^[\s]*)|([\s]*$)/g, "");
	var strYear = document.all["dg1__ctl" + argSEQ + "_txYear1"].value.replace(/(^[\s]*)|([\s]*$)/g, "");
	var strCls = document.all["dg1__ctl" + argSEQ + "_txCls1"].value.replace(/(^[\s]*)|([\s]*$)/g, "");
	var strCase = document.all["dg1__ctl" + argSEQ + "_txCase1"].value.replace(/(^[\s]*)|([\s]*$)/g, "");
	var strVol = document.all["dg1__ctl" + argSEQ + "_txVol1"].value.replace(/(^[\s]*)|([\s]*$)/g, "");
	
	var CheckVer = 0;
	var CheckYear = 0;
	var CheckCls = 0;
	var CheckCase = 0;
	
	switch(argObj)
	{
		case "txYear1":
			CheckVer = 1;
			break;
		case "txCls1":
			CheckVer = 1;
			CheckYear = 1;
			break;
		case "txCase1":
			CheckVer = 1;
			CheckYear = 1;
			CheckCls = 1;
			break;
		case "txVol1":
			CheckVer = 1;
			CheckYear = 1;
			CheckCls = 1;
			CheckCase = 1;
			break;
	}
		
	if(strYear != "" || strCls != "" || strCase != "" || strVol != "")
	{
		if(strCase == "" && CheckCase == 1 && strVol != "")
		{
			for(var j = argSEQ-1 ; j >= 2 ; j--)
			{
				var strCheck = document.all["dg1__ctl" + j + "_txCase1"].value;
				if(strCase == "")
				{
					if(strCheck != "")
					{
						document.all["dg1__ctl" + argSEQ + "_txCase1"].value = strCheck;
						strCase = strCheck;
					}
				}
			}
		}
		if(strCls == "" && CheckCls == 1 && strCase != "")
		{
			for(var j = argSEQ-1 ; j >= 2 ; j--)
			{
				var strCheck = document.all["dg1__ctl" + j + "_txCls1"].value;
				if(strCls == "")
				{
					if(strCheck != "")
					{
						document.all["dg1__ctl" + argSEQ + "_txCls1"].value = strCheck;
						strCls = strCheck;
					}
				}
			}
		}
		if(strYear == "" && CheckYear == 1 && strCls != "")
		{
			for(var j = argSEQ-1 ; j >= 2 ; j--)
			{
				var strCheck = document.all["dg1__ctl" + j + "_txYear1"].value;
				if(strYear == "")
				{
					if(strCheck != "")
					{
						document.all["dg1__ctl" + argSEQ + "_txYear1"].value = strCheck;
						strYear = strCheck;
					}
				}
			}
				
		}
		if(strVer == "" && CheckVer == 1 && strYear != "")
		{
			for(var j = argSEQ-1 ; j >= 2 ; j--)
			{
				var strCheck = document.all["dg1__ctl" + j + "_txVer1"].value;
				if(strVer == "")
				{
					if(strCheck != "")
					{
						document.all["dg1__ctl" + argSEQ + "_txVer1"].value = strCheck;
						strVer = strCheck;
					}
				}
			}
		}
	}
}