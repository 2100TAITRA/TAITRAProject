/*	DATE 	SA			PRG			MGR_NO	DESC
 *	1060125	Cloud		Joe 		1050087	二代公文修改 * 1100204  Leslie      Zen         1090927 取消使用document.activeElement
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

//1060125	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
	
InitObj();

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060125	Joe		1050087		二代公文修改
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060125	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060125	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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
			jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060125 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060125 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
		
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060125 Joe 1050087 二代公文修改
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
			//1060125 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060125 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060125 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1060125	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txKeyFld"].focus();
			$('#txKeyFld').focus();
			InitObj();
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
			if(!jf_CheckBeforSave())
			{
				Page_BlockSubmit = false;
				
			}
			else
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
				//1060125 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btPreview":
			if(!jf_CheckBeforSave())
			{
				Page_BlockSubmit = false;
				
			}
			else
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
				//1060125 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	/*if (jf_CheckBeforSave())
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
	}*/
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	/*if (document.all["txPlanNo"].value == "")
	{
		strErrMsg += "鍵值欄位不可空白\n";
		document.all["txPlanNo"].focus();
	}*/	
	
	strErrMsg = CheckFileNoRange(strErrMsg);
		
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
	
	if (argCallerId == "EAT400C1")
	{
		document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
		//1060125	Joe	1050087	二代系統升級，調整focus寫法
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
function CheckPlanNo()
{
	if(!jf_CheckDataExist("") && document.all["txPlanNo"].value != "")
	{		
		Page_BlockSubmit = false;
		alert("此清理批號不存在");	
		//1060125	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txPlanNo"].focus();
		$('#txPlanNo').focus();
	}	
}

//補0
function CallPadFunc(strObjName)
{	
	switch(strObjName)
	{		
		case "txYearS":						
		case "txYearE":
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,3,"0");
			break;		
	}	
}

//檢查畫面上列印起始值是否介於1~16
function CheckEmpty()
{
	var bRtnBool = true;
	var strNum="";	
	if (document.all["rbVol"].checked)
	{
		strNum = document.all["txVolNum"].value;
		if (strNum != "")
		{
			if ((strNum == "0") || (Number(strNum) > 16))
			{
				bRtnBool = false;
				//1060125	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txVolNum"].focus();
				$('#txVolNum').focus();
			}
		}
	}
	else if (document.all["rbDoc"].checked)
	{
		strNum = document.all["txDocNum"].value;
		if ((document.all["rb1"].checked) && (strNum != ""))
		{
			if ((strNum == "0") || (Number(strNum) > 16))
			{
				bRtnBool = false;
				//1060125	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txDocNum"].focus();
				$('#txDocNum').focus();
			}
		}
	}
	else if (document.all["rbAtt"].checked)
	{
		strNum = document.all["txAttNum"].value;
		if (strNum != "")
		{
			if ((strNum == "0") || (Number(strNum) > 16))
			{
				bRtnBool = false;
				//1060125	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txAttNum"].focus();
				$('#txAttNum').focus();	
			}
		}
	}
	if (!bRtnBool)
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["起始位置要是介於 1 ~ 16 的數字"])),"");
	return bRtnBool;
}

//判斷檔號起訖的合理性
function CheckFileNoRange(argStr)
{
	var JCls	= 0;	//0:兩者為空,1:其中一個為空,2:不相等,3:相等
	var JCase	= 0;
	var JVol	= 0;
	var JSeq	= 0;
	var jBool	= true;
	
	
	if(document.all["txSeqS"].value != "" && document.all["txSeqE"].value != "")
	{
		if(document.all["txSeqS"].value != document.all["txSeqE"].value )
			JSeq = 2;
		else
			JSeq = 3;
	}
	else if(document.all["txSeqS"].value != "" || document.all["txSeqE"].value != "")
		JSeq = 1;
	//////////////////////////////////////////目次
	if(document.all["txVolS"].value != "" && document.all["txVolE"].value != "")
	{
		if(document.all["txVolS"].value != document.all["txVolE"].value )
			JVol = 2;
		else
			JVol = 3;
	}
	else if(document.all["txVolS"].value != "" || document.all["txVolE"].value != "")
		JVol = 1;
	//////////////////////////////////////////卷次
	if(document.all["txCaseS"].value != "" && document.all["txCaseE"].value != "")
	{
		if(document.all["txCaseS"].value != document.all["txCaseE"].value )
			JCase = 2;
		else
			JCase = 3;
	}
	else if(document.all["txCaseS"].value != "" || document.all["txCaseE"].value != "")
		JCase = 1;
	/////////////////////////////////////////案次
	if(document.all["txClsS"].value != "" && document.all["txClsE"].value != "")
	{
		if(document.all["txClsS"].value != document.all["txClsE"].value )
			JCls = 2;
		else
			JCls = 3;
	}
	else if(document.all["txClsS"].value != "" || document.all["txClsE"].value != "")
		JCls = 1;
	/////////////////////////////////////////分類
	
	if(JSeq == 1)	//只有其中一項，視為錯誤
	{
		argStr += "目次範圍起迄值有誤\n";
		return argStr;
	}
	
	if(JVol == 1)	//只有其中一項，視為錯誤
	{
		argStr += "卷次範圍起迄值有誤\n";
		return argStr;
	}
	
	if(JCase == 1)	//只有其中一項，視為錯誤
	{
		argStr += "案次號範圍起迄值有誤\n";
		return argStr;
	}
	
	if(JCls == 1)	//只有其中一項，視為錯誤
	{
		argStr += "分類號範圍起迄值有誤\n";
		return argStr;
	}
	
	/////////////////////////////////////95.08.15
	if(JSeq == 2)	//目次不相等
	{
		jBool = false;
		if(JVol != 3)	//若卷次不為相等的情況則提示錯誤訊息
		{
			argStr += "卷次號範圍需相同\n";
			jBool = true;
			return argStr;			
		}
		
		if(JCase != 3)	//若案次不為相等的情況則提示錯誤訊息
		{
			argStr += "案次號範圍需相同\n";
			jBool = true;
			return argStr;			
		}		
		
		if(JCls != 3)
		{
			argStr += "分類號範圍需相同\n";
			jBool = true;
			return argStr;			
		}		
		
		/*if(!jBool)
		{
			argStr += "目次號範圍需相同\n";			
			return argStr;						
		}*/
	}
	
	if(JSeq == 0 || JSeq == 3)	//目次為空白，則往上檢查卷次號
	{
		if(JVol == 2)	//卷次不相等
		{			
			jBool = false;
			if(JCase != 3)	//若案次不為相等的情況則提示錯誤訊息
			{
				argStr += "案次號範圍需相同\n";
				jBool = true;
				return argStr;			
			}		
		
			if(JCls != 3)
			{
				argStr += "分類號範圍需相同\n";
				jBool = true;
				return argStr;			
			}		
			
			if(!jBool && JSeq != 0)
			{
				argStr += "卷次號範圍需相同\n";				
				return argStr;				
			}
		}		
		
		if(JVol == 0)	//若卷次為空白，則往上檢查案次號
		{
			if(JCase == 2)	//若案次不相等，則往上檢查分類號
			{
				jBool = false;
				if(JCls != 3)
				{
					argStr += "分類號範圍需相同\n";
					jBool = true;
					return argStr;			
				}				
				
				if(jBool)
				{
					argStr += "案次號範圍需相同\n";				
					return argStr;						
				}
			}			
		}
		
		if(JVol == 3)	//卷次相等，往上檢核案次以及分類是否相等
		{
			if(JCase != 3)
			{
				argStr += "案次號範圍需相同\n";
				return argStr;				
			}
			
			if(JCls != 3)
			{
				argStr += "分類號範圍需相同\n";
				return argStr;					
			}
		}		
	}				
	
	return argStr;
}

//依據畫面上的列印類型，初始化原件
function CleanWhenOnBlur()
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var ActiveObjName = document.activeElement.id;
    var ActiveObjName = event.target.id;
	
	switch(ActiveObjName)
	{
		case "rbVol":
		{
			document.all["txDocNum"].value = "";
			document.all["txAttNum"].value = "";
			break;
		}
		case "rbDoc":
		{
			document.all["txVolNum"].value = "";
			document.all["txAttNum"].value = "";
			document.all["cbComNoAll"].checked = false;
			document.all["rb1"].checked = true;
			document.all["rb2"].checked = false;
			break;			
		}
		case "rbAtt":
		{
			document.all["txDocNum"].value = "";
			document.all["txVolNum"].value = "";
			break;
		}
	}
	
}

function InitObj()
{
	document.all["rbVol"].checked = true;
	document.all["rb1"].checked = true;
	document.all["rbAll"].checked = true;
}