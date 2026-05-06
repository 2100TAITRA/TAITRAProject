/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060619   Justin   1050087     二代公文修改
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
/*1060619 Justin [1050087] 二代公文修改
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060619 Justin [1050087] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060619 Justin [1050087] 二代公文修改
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
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060619 Justin [1050087] 二代公文修改 
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

    //1060619 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btOpen":
			//	Page_BlockSubmit = !jf_CheckKeyObject();
			Page_BlockSubmit = false;
		    //1060619 Justin [1050087] 二代公文修改 
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
		    //1060619 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1060619 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1060619 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			var strName = document.all["ddlOuid_Text"].value;
			jf_ConfirmClean(true);
			document.all["ddlOuid_Text"].value = strName;
		    //1060619 Justin [1050087] 二代公文修改
			//document.all["ddlOuid_Text"].focus();
			$('#ddlOuid_Text').focus();
			break;
		case "btSearch":
			var strUrl = "EAC280.aspx?rtnObj=lbReturnValue";
			jf_OpenChildWin(strUrl, "EAC280", 660, 450 );
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
			if(jf_CheckDataExist_Self(document.all["H_Source"].value))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
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

	var buf="";
	if (document.all["txDfcaseNameFld"].value == "")
	{
		if (strErrMsg != "") buf="\n";
		strErrMsg = "預設案名不可空白" + buf + strErrMsg;
	    //1060619 Justin [1050087] 二代公文修改
		//document.all["txDfcaseNameFld"].focus();
		$('#txDfcaseNameFld').focus();
	}
	if (document.all["txDfcaseNoFld"].value == "")
	{
		if (strErrMsg != "") buf="\n";
		strErrMsg = "預設案次號不可空白" + buf + strErrMsg;
	    //1060619 Justin [1050087] 二代公文修改
		//document.all["txDfcaseNoFld"].focus();
		$('#txDfcaseNoFld').focus();
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
	
	if(argCallerId == "EAC280")
	{
		document.all["ddlOuid_Text"].value = document.all.lbReturnValue.options[1].value;
		Page_BlockSubmit=false;
		jf_OpenButtonSubmit();
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
//若資料存在時，顯示警告訊息(Template已有此功能)由於此次使用ComboBox所以作特別處理
function jf_CheckDataExist_Self(argOrgNo)
{
	var arrValue=new Array(KeyObjectArr.length);
	var arrFieldName=new Array(KeyObjectArr.length);
	
	for(var i=0; i < KeyObjectArr.length;i++)
	{
		arrValue[i]=jf_Trim(document.all[KeyObjectArr[i]].value).split(":")[0];
		arrFieldName[i]=FieldNameArr[i];
	}
	
	if (argOrgNo!="")
	{
		arrFieldName[arrFieldName.length]="SOURCE_ORGNO"
		arrValue[arrValue.length]=argOrgNo;
	}
	
	var arWSParam = new Array(3);
	
	arWSParam[0] = document.all["KeyTableName"].value;//"EMPLOYEE";
	arWSParam[1] = arrFieldName;
	arWSParam[2] = arrValue;
				
	callObj = jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, arWSParam);
	
	if(jf_IsWebServiceSuccess(callObj))
	{
		if(callObj.value.RtnBool == true)
			return true;
		
		return false;
	}
	else
		return false;
}