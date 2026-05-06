/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1050928   Justin   1050087     二代公文修改
1051019	Leslie	Joe			1050087		二代修改配合行動平台
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

//指定DataGrid欄位
//var strTableFields = new Array("_txFLD_NAME","_txFLD_CNAME","_txFLD_TYPE","_txFLD_LENGTH","_txFLD_DECIMAL","_txFLD_RMK");
//1050928 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    /*1050928 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次*/
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	/*var pNo = xObjectName.substring(8, xObjectName.indexOf("_btFLD_TYPE"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl"+pNo+"_btFLD_TYPE"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txFLD_TYPE"];
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
		/*case btHelp:
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search="+CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			break;*/
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050928 Justin 1050087 二代公文修改 
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
	
    //1050928 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050928 Justin 1050087 二代公文修改 
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
		    //1050928 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050928 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050928 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1050928 Justin 1050087 二代公文修改
		    //document.all["txId"].focus();
			$('#txId').focus();
			break;
		case "btSearch":
			//1050711 Justin 1050087 二代公文修改
			Page_BlockSubmit = true;
			var strUrl = "";
			var strCateGoryId = jf_Trim(document.all["txId"].value);
			var strSourceOrgno = jf_Trim(document.all["txId"].value);
			var strCateGoryName = jf_Trim(document.all["txName"].value);
			strUrl = "TBC100.aspx?rtnObj=lbReturnValue&argCateGoryId="+strCateGoryId+"&argSourceOrgno="+strSourceOrgno+"&argCateGoryName="+strCateGoryName;
			jf_OpenChildWin(strUrl, "TBC100", 700, 500 );
			break;
		/*case "btIndex":
			var strUrl = "";
			var strSysId = jf_Trim(document.all["txID"].value);
			var strTableName = jf_Trim(document.all["txTABLE_NAME"].value);
			strUrl = "http://ntx/SI/SIT023.aspx?rtnObj=lbReturnValue&valueSysNo="+strSysId+"&valueTableName="+strTableName;
			jf_OpenChildWin(strUrl, "SIT023", 700, 500 );
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
			Page_BlockSubmit = true;
			jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
			Page_BlockSubmit = false;
			jf_SelectBarSubmit();
			break;
		case "btUp":
			Page_BlockSubmit = true;
			jf_RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			jf_RowDown("dg1", "_cbSelect", strTableFields);
			break;*/
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

//儲存前Key值外之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (jf_Trim(document.all["txId"].value) == "")
	{
	    strErrMsg += "類別代碼不可空白\n";
	    //1050928 Justin 1050087 二代公文修改
	    //document.all["txId"].focus();
	    $('#txId').focus();
	}
	
	if (jf_Trim(document.all["txName"].value) == "")
	{
		strErrMsg += "類別名稱不可空白\n";
	    //1050928 Justin 1050087 二代公文修改
	    //document.all["txName"].focus();
		$('#txName').focus();
		//bRtnbool = false;
	}
	if (jf_Trim(document.all["txCateOrder"].value) == "")
	{
		strErrMsg += "類別順序不可空白\n";
	    //1050928 Justin 1050087 二代公文修改
	    //document.all["txCateOrder"].focus();
		$('#txCateOrder').focus();
		//bRtnbool = false;
	}
	
	/*if(!jf_CheckBlankAndAlert())
		bRtnbool = false;*/
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
/*function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txFLD_NAME不為空白時
		if(document.all["dg1__ctl" + i + "_txFLD_NAME"].value != "")
		{
			//txFLD_CNAME不可空白
			if(document.all["dg1__ctl" + i + "_txFLD_CNAME"].value == "")
			{
				InValidName += ",中文名稱不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txFLD_CNAME";
			}
			
			//txFLD_TYPE不可空白
			if(document.all["dg1__ctl" + i + "_txFLD_TYPE"].value == "")
			{
				InValidName += ",型別不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txFLD_TYPE";
			}
			
			//txFLD_LENGTH不可空白
			if(document.all["dg1__ctl" + i + "_txFLD_LENGTH"].value == "")
			{
				InValidName += ",長度不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txFLD_LENGTH";
			}
			
			//txFLD_DECIMAL不可空白
			if(document.all["dg1__ctl" + i + "_txFLD_DECIMAL"].value == "")
			{
				InValidName += ",小數不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txFLD_DECIMAL";
			}
						
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
				document.all[InValidControlName].focus();
				return false;
			}
		}
	}
	return true;
}*/

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
		if(jf_IsWebServiceSuccess(CallWsObj))
		{
			//document.all["txSYS_NAME"].value = jf_Trim(CallWsObj.value.RtnStr);
		}
		else
		{
			//document.all["txSYS_NAME"].value = "";
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
	if (argCallerId == "TBC100")
	{
		document.all["txId"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txName"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		/*document.all["txTABLE_NAME"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txTABLE_CNAME"].value = jf_Trim(document.all.lbReturnValue.options[3].value);*/
		if(document.all["txId"].value != "" && document.all["txName"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
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
