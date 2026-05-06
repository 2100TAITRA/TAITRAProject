/*
DATE 	    SA		PRG		MGR_NO		DESC
1050624     David   Zen     1050087     二代公文修改
1060518     Leslie  Zen     1060215     innerText相關修改*/

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
var strTableFields = new Array("_txOrgtypeNo","_txOrgName");

//1050624 Zen 1050087 二代公文修改
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
    //1050624 Zen 1050087 二代公文修改
    //jf_CallWS("../../../ODDEP/lib/WEOrgInfo.asmx", "GetOrgInfo", false, null);
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl()
{
/*
	var xObjectName = document.activeElement.id;
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btHelp"] != null)
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
		case btHelp:
		
			Page_BlockSubmit=true;
			strUrl = document.all["H_Location"].value +"WEM010C1.aspx?OrgID=" + document.all["H_OrgNo"].value + "&K1=D1g_Dept" ;
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			break;
	}	
*/
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050624 Zen 1050087 二代公文修改
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
	
    //1050624 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050624 Zen 1050087 二代公文修改
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
		    //1050624 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050624 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050624 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
		
			var strH_OrgNo	=	document.all["H_OrgNo"].value	;
			var strH_DeptNo	=	document.all["H_DeptNo"].value	;
			var strH_UserId	=	document.all["H_UserId"].value	;
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all["H_OrgNo"].value	=	strH_OrgNo	;
			document.all["H_DeptNo"].value	=	strH_DeptNo	;
			document.all["H_UserId"].value	=	strH_UserId	;
		    //1050624 Zen 1050087 二代公文修改
			//document.all["txOrgtype_No"].focus();
			$('#txOrgtype_No').focus();
			break;
		case "btSearch":
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txOrgtype_No"].value);
			var strMainTableCol1 = jf_Trim(document.all["txOrg_Name"].value);
			strUrl = "EDM090C1.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1;
			jf_OpenChildWin(strUrl, "EDM090C1", 800, 600 );
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1050624 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1050624 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteSelected":
			Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
		    //1050624 Zen 1050087 二代公文修改
			//jf_SelectBarSubmit();
			jf_SelectBarSubmit(xObjectName);
			break;
		case "btUp":
			Page_BlockSubmit = true;
			jf_RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			jf_RowDown("dg1", "_cbSelect", strTableFields);
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
	
	if (document.all["txOrgtype_No"].value == "")
	{
		strErrMsg += "機關別代號欄位不可空白\n";
	    //1050624 Zen 1050087 二代公文修改
		//document.all["txOrgtype_No"].focus();
		$('#txOrgtype_No').focus();
	}
	
	if (document.all["txOrg_Name"].value == "")
	{
		strErrMsg += "機關別名稱欄位不可空白\n";
	    //1050624 Zen 1050087 二代公文修改
		//document.all["txOrg_Name"].focus();
		$('#txOrg_Name').focus();
	}
	
	//if(!jf_CheckBlankAndAlert())
	//	bRtnbool = false;
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	if(!fnCheckDataGrid())
		bRtnbool = false;
		
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{

	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if(document.all["dg1__ctl" + i + "_txOrgtypeNo"].value != "")
		{
			if(document.all["dg1__ctl" + i + "_txOrgName"].value == "")
			{
				InValidName += ",機關名稱不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txOrgName";
			}
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
			    //1060518 Zen 1060215 innerText相關修正				//jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
			    //1050624 Zen 1050087 二代公文修改
				//document.all[InValidControlName].focus();
				$('#'+InValidControlName).focus();
				return false;
			}
		}
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
		}
		else
		{
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
	if(argCallerId == "EDM090C1")
	{
		document.all["txOrgtype_No"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txOrgtype_No"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	    //1050624 Zen 1050087 二代公文修改
		//document.all["txOrgtype_No"].focus();
		$('#txOrgtype_No').focus();
	}
	
	if(argCallerId == "WEM010C1")
	{
	    var DeptInfo = document.all["lbReturnValue"].options[0].value;
	    //1050714 Zen 1050087 WEM010C1子視窗修改
	    //var DeptArray = DeptInfo.split(',');
	    var DeptArray = DeptInfo.split('^');
		if(DeptArray.length > 0)  
		{   
			document.all[uOrgName_ID].value = jf_Trim(DeptArray[1]);
			document.all[uOrgNo_ID].value = jf_Trim(DeptArray[2]);  
		}
		uOrgNo_ID = null;
		uOrgName_ID = null;
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
var bHasCheck = false;

function fnCheckOrgNo(argOrgtypeNo ,argOrgName)
{

	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	var OrgtypeNo =	jf_Trim(document.all[argOrgtypeNo].value);
	var OrgNo	  = document.all["H_OrgNo"].value ;
	var DeptNo	  = document.all["H_DeptNo"].value ;
	var UserID	  = document.all["H_UserId"].value ;
	if(OrgtypeNo == "")
	{
		document.all[argOrgtypeNo].value	=	""	;
		document.all[argOrgName].value	=	""	;
		return;
	}
	
	var arWSParam = new Array(4);
	
	arWSParam[0] = OrgtypeNo ;
	arWSParam[1] = OrgNo ;
	arWSParam[2] = DeptNo ;
	arWSParam[3] = UserID ;
	
	CallWsObj = jf_CallWS("../../../ODDEP/lib/WEOrgInfo.asmx", "GetOrgInfo", false, arWSParam);
	if(jf_IsWebServiceSuccess(CallWsObj))
	{
		if(!CallWsObj.value.ErrorClass.IsErr)
		{
			if(CallWsObj.value.Count > 0)
			{
				if(jf_Trim(CallWsObj.value.OrgID[0]) != "" || jf_Trim(CallWsObj.value.OrgName[0]) != "")
				{
					document.all[argOrgtypeNo].value = CallWsObj.value.OrgID[0];
					document.all[argOrgName].value= CallWsObj.value.OrgName[0];
				}
			}
			else
			{
				jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["無此機關代碼"]) ), "" );
			    //1050624 Zen 1050087 二代公文修改
				//document.all[argOrgtypeNo].focus();
				$('#'+argOrgtypeNo).focus();
			}
		}
	}
	else
	{
		return;
	}
}

function fnQueryOrgNo(argOrgNo_ID, argOrgName_ID)
{
	Page_BlockSubmit = true;
	if (!document.all[argOrgNo_ID])
  		return;
  	uOrgNo_ID = argOrgNo_ID;
    uOrgName_ID = argOrgName_ID;

    //1050714 Zen 1050087 WEM010C1子視窗修改--begin
    //var strUrl = "../../../ODDEP/WEM010C1.aspx?OrgID=" + document.all.H_OrgNo.value + "&amp;K1=WEM010&amp;Search=" + document.all[argOrgNo_ID].value;
    var path = document.all.H_Wed010C1Path.value;
    var strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.H_OrgNo.value + "&K1=WEM010";
    //1050714 Zen 1050087 WEM010C1子視窗修改--end

jf_OpenChildWin(strUrl, "EDM090", 700, 500);
}

//檢查DataGrid資料列是否填完整
function fnCheckDataGrid()
{
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		var strOrgtypeNo_ID	=	"dg1__ctl" + i + "_txOrgtypeNo"	;
		var strOrgName_ID	=	"dg1__ctl" + i + "_txOrgName"	;
		var strOrgtypeNo	=	jf_Trim(document.all[strOrgtypeNo_ID].value);
		var	strOrgName		=	jf_Trim(document.all[strOrgName_ID].value)	;
		if(strOrgtypeNo != "")
		{
			bHasCheck = true;
			var arWSParam = new Array(4);
			var OrgNo	  = document.all["H_OrgNo"].value ;
			var DeptNo	  = document.all["H_DeptNo"].value ;
			var UserID	  = document.all["H_UserId"].value ;
			arWSParam[0] = strOrgtypeNo ;
			arWSParam[1] = OrgNo ;
			arWSParam[2] = DeptNo ;
			arWSParam[3] = UserID ;
			CallWsObj = jf_CallWS("../../../ODDEP/lib/WEOrgInfo.asmx", "GetOrgInfo", false, arWSParam);
			if(jf_IsWebServiceSuccess(CallWsObj))
			{
				if(!CallWsObj.value.ErrorClass.IsErr)
				{
					if(CallWsObj.value.Count > 0)
					{
						if(jf_Trim(CallWsObj.value.OrgID[0]) != "")
						{
							document.all[strOrgtypeNo_ID].value = CallWsObj.value.OrgID[0];
							document.all[strOrgName_ID].value= CallWsObj.value.OrgName[0];
						}
					}
					else
					{
						jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["無此機關代碼"]) ), "" );
						return false ;
					}
				}
			}
		}
		bHasCheck = true;
	}
	return true;
}
