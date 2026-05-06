/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 96.01.04		David	000141	仿照ODR130，新增程式
 * 1050831      David	1050087 二代公文修改
 * 1051019      Kenny   1050087 二代公文修改
 * 1060518      Zen     1060215 innerText相關修改 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050831 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

document.all["ddlReportType"].onchange = ChangeReportType;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050831 Zen 1050087 二代公文修改
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../EDLIB/WEOrgInfo.asmx", "GetOrgInfo", false, null); //使用WebService前必須先呼叫一次
	ChangeReportType();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
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
		case "btHelp":
			var strUrl = "";
			CurrOrgIdObj = document.all.txOrgno;
			CurrOrgNameObj = document.all.txOrgName;
			var WebServerName = jf_Trim(document.all.H_WebServer.value);
			var strUrl = "";
			//1021024 Erin 修改網址路徑
			//strUrl = "http://"+WebServerName+"/ODDEPD/WEM010C1.aspx?OrgID="+document.all.h_OrgNo.value+"&K1=Dlg_Dept&Search="+CurrOrgIdObj.value;
			strUrl = "http://"+WebServerName+"/WEDEP/WEM010C1.aspx?OrgID="+document.all.h_OrgNo.value+"&K1=Dlg_Dept&Search="+CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
			Page_BlockSubmit=true;
			break;
		case "tbSDate":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txSDate"], event.screenX, event.screenY);
			break;
		case "tbEDate":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txEDate"], event.screenX, event.screenY);
			break;				
		case "tbFromSDate":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txFromDateS"], event.screenX, event.screenY);
			break;		
		case "tbFromEDate":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txFromDateE"], event.screenX, event.screenY);
			break;				
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050831 Zen 1050087 二代公文修改
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
	
    //1050831 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = false;
		    //1050831 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
			if (CheckOrgno())
				Page_BlockSubmit = !CheckBeforeSearch();
			else
				Page_BlockSubmit = true;
		    //1050831 Zen 1050087 二代公文修改
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
	    //1050831 Zen 1050087 二代公文修改
		//document.all["txKeyFld"].focus();
		$('#txKeyFld').focus();
	}
	
	if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
	    //1050831 Zen 1050087 二代公文修改
		document.all["txRequireFld"].focus();
		$('#txRequireFld').focus();
    }
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
		
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
    var bWSRtn = false;
    if (argResult.id == wsGetOrgNameID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			if(!argResult.value.ErrorClass.IsErr)
			{
				if(argResult.value.Count > 0)
				{
					bWSRtn = true;
					document.all["txOrgno"].value = jf_Trim(argResult.value.OrgID[0]);
					document.all["txOrgName"].value = jf_Trim(argResult.value.OrgName[0]);
				}
				else
				{
					bWSRtn = false;
					if (event.type == "buttonclick")
						bMsg = false;//不再show第二次訊息
					jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["無此機關代碼"])),"");
					document.all["txOrgName"].value="";
				    //1050831 Zen 1050087 二代公文修改
					//document.all["txOrgno"].focus();
					$('#txOrgno').focus();
				}
			}
			else
			{
				bWSRtn = false;
				alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
			    //1050831 Zen 1050087 二代公文修改
				document.all["txOrgno"].focus();
				$('#txOrgno').focus();
            }
		}
	}
	return bWSRtn;
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
    //1050831 Zen 1050087 二代公文修改--begin
    if (argCallerId == "WEM010C1")
    {
        var DeptInfo = document.all["lbReturnValue"].options[0].value;
        var DeptArray = DeptInfo.split('^');

        document.all.txOrgno.value = DeptArray[0];
        document.all.txOrgName.value = DeptArray[1];
    }
    //1050831 Zen 1050087 二代公文修改-end

	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

var bMsg = true;
var wsGetOrgNameID;//宣告webserver回傳值id
function CheckOrgno()
{
	var bRtn = true;
	var strOrgno = jf_Trim(document.all["txOrgno"].value);
	if (strOrgno != "")
	{
		if (bMsg)
		{
			var arWSParam = new Array(4);
			arWSParam[0] = strOrgno;
			arWSParam[1] = document.all["h_OrgNo"].value;
			arWSParam[2] = document.all["h_DeptNo"].value;
			arWSParam[3] = document.all["h_UserId"].value;
			callObj = jf_CallWS("../EDLIB/WEOrgInfo.asmx", "GetOrgInfo", false, arWSParam);
			wsGetOrgNameID = callObj.id;
			bRtn = OnWSResult(callObj);
		}
		else
			bMsg = true;
	}
	else
		document.all["txOrgName"].value = "";
	return bRtn;
}

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
		    //1050831 Zen 1050087 二代公文修改
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}

function CheckBeforeSearch()
{
	return true;
	var bRtnBool = true;
	var strSDoc     = document.all.txDocNoS.value;
	var strEDoc     = document.all.txDocNoE.value
	var strSRcvDate = document.all.txRcvDateS.value;
	var strERcvDate = document.all.txRcvDateE.value;
	var strSFromDate= document.all.txFromDateS.value;
	var strEFromDate= document.all.txFromDateE.value;
	var strDept     = document.all["dlDept_Text"].value;
	var strOrgno    = document.all["txOrgno"].value;
	var strFromNo   = document.all["txFromNo"].value;
	//2004-06-18 add
	var strSrcRcvDateS   = document.all["txSrcRcvDateS"].value;
	var strSrcRcvDateE   = document.all["txSrcRcvDateE"].value;
	var strSrcRcvNoS   = document.all["txSrcRcvNoS"].value;
	var strSrcRcvNoE   = document.all["txSrcRcvNoE"].value;
	
	if (strSDoc+strEDoc+strSRcvDate+strERcvDate+strSFromDate+strEFromDate+strDept+strOrgno+strFromNo+strSrcRcvDateS+strSrcRcvDateE+strSrcRcvNoS+strSrcRcvNoE=="")
	{
		bRtnBool = false;
	    //1050831 Zen 1050087 二代公文修改
		//document.all.txRcvDateS.focus();
		$('#txRcvDateS').focus();
		var strErrMsg = "公文文號、收文日期、來文日期、來源收文文號、來源收文日期、分文單位、來文機關及來文字號至少要輸入一組資料!!";
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
	}
	return bRtnBool;
}


function ChangeReportType()
{
	if(document.all["ddlReportType"].value == "RCV")
	{
		for(var i=1; i<=6; i++)
		{
		    var o = eval("document.all['tr0" + i + "']");
		    //1050831 Zen 1050087 二代公文修改
		    //o.className = "";
		    o.className = "dTR";
		}
	    //1060518 Zen 1060215 innerText相關修正--begin		//document.all["lbNo"].innerText = "總收文號：";
	    //document.all["lbDate"].innerText = "收文時間：";
		document.all["lbNo"].textContent = "總收文號：";
		document.all["lbDate"].textContent = "收文時間：";
	    //1060518 Zen 1060215 innerText相關修正--end	}
	else
	{
		for(var i=1; i<=6; i++)
		{
			var o = eval("document.all['tr0" + i + "']");
			o.className = "hide";
		}
	    //1060518 Zen 1060215 innerText相關修正--begin		//document.all["lbNo"].innerText = "總發文號：";
	    //document.all["lbDate"].innerText = "發文時間：";
		document.all["lbNo"].textContent = "總發文號：";
		document.all["lbDate"].textContent = "發文時間：";
	    //1060518 Zen 1060215 innerText相關修正--end	}
}