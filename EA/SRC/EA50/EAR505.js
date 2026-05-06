/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060315   Justin   1050087     二代公文修改
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
	jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, null);
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次*/
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
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
		case "btOpen": //開啟
			Page_BlockSubmit = true;
			if (jf_Trim(document.all.txDPlan.value) == "")
			{
			    alert("銷毀計畫編號不可為空白");
			    //1060315  Justin [1050087] 二代公文修改
			    //document.all.txDPlan.focus();
			    $('#txDPlan').focus();
				return;
			}
			Page_BlockSubmit = false;
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
		
		case "btSearch": //查詢
			Page_BlockSubmit=true;
			var strUrl = "";
			strUrl = "EAT501C1.aspx";
		    //1060315  Justin [1050087] 二代公文修改
			//jf_OpenChildWin(strUrl, "EAT501C1", 700, 500);
			jf_OpenChildWin(strUrl, "EAT501C1", 800, 600);
			break;

		case "btPrint":
			Page_BlockSubmit = true;
		    //1060315  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
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
	if (argCallerId == "EAT501C1")
	{
		document.all["txDPlan"].value = document.all["lbReturnValue"].options[0].value;
		if(document.all["txDPlan"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	    //1060315  Justin [1050087] 二代公文修改
		//document.all["txDPlan"].focus();
		$('#txDPlan').focus();
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
function ObjOnBlur(argObjName)
{
	switch(argObjName)
	{
		case "txDPlan":
			if (document.all.txDPlan.value != "")
			{
				var param = new Array(1);
				param[0] = document.all.txDPlan.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckDPMByDPlanNo", false , param);
				var iCallID_txDPlan = callObj.id;
				if (callObj.value.RtnBool == false)
				{
				    alert("無此銷毀計畫編號，請重新輸入");
				    //1060315  Justin [1050087] 二代公文修改
				    //document.all.txDPlan.focus();
				    $('#txDPlan').focus();
				}
			}
			break;	
		case "txDate":
			if (document.all.txDate.value != "")
			{
				if (!jf_CheckCDATE(document.all.txDate.value))
				{
				    alert("非正確日期格式");
				    //1060315  Justin [1050087] 二代公文修改
				    //document.all.txDate.focus();
				    $('#txDate').focus();
				}
				else
				{
					if (document.all.txDate.value.length < 7)
						{document.all.txDate.value = jf_PADL(document.all.txDate.value,7,'0');}
				}
			}
			break;
		case "txRange":
			if (document.all.txRange.value != "" && document.all.txNum.value != "")
			{
				var param = new Array(2);
				param[0] = document.all.txRange.value;
				param[1] = document.all.txNum.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckPrintRangeWithMaxVal", false , param);
				var iCallID_txRange = callObj.id;
				if (callObj.value.RtnBool == false)
				{
				    alert("無效之列印範圍，請重新輸入");
				    //1060315  Justin [1050087] 二代公文修改
				    //document.all.txRange.focus();
				    $('#txRange').focus();
				}
			}
			break;
	}
}
