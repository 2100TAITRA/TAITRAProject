/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060808   Justin   1050087     二代公文修改
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
//1060808 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    /*1060808 Justin [1050087] 二代公文修改
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
//	jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	jf_CallWS("../EDLIB/EDWS.asmx", "GetSubRole", false, null);
	jf_CallWS("../EDLIB/EDWS.asmx", "GetAllUsersOfRole", false, null);*/
    //1060808 Justin [1050087] 修正原程式BUG-避免開啟後直接存成空值
    document.all.RoleCode.value = document.all.dlRole.options[document.all.dlRole.selectedIndex].value;
    document.all.UserCode.value = document.all.dlUser.options[document.all.dlUser.selectedIndex].value;
    //1060808 Justin [1050087] 修正原程式BUG-用隱藏欄位記住 單位
    document.all.DeptCode.value = document.all.dlDept.options[document.all.dlUser.selectedIndex].value;
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060808 Justin [1050087] 二代公文修改
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
//1060808 Justin [1050087] 二代公文修改 
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
	
    //1060808 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1060808 Justin [1050087] 二代公文修改 
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
		    //1060808 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1060808 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1060808 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all["txOrder"].value = "1";
			document.all["rlOrder_0"].checked = true ;
		    //1060808 Justin [1050087] 二代公文修改
		    //document.all["txNo"].focus();
			$('#txNo').focus();
			break;
		case "btSearch":
			var strUrl = "EDM111C1.aspx?rtnObj=lbReturnValue";
		    //1060808 Justin [1050087] 二代公文修改
			Page_BlockSubmit = true;
		    //jf_OpenChildWin(strUrl, "EDM111C1", 700, 500);
			jf_OpenChildWin(strUrl, "EDM111C1", 800, 600);
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
	
	if (document.all["txNo"].value == "")
	{
		strErrMsg += "傳送對象代碼不可空白\n";
	    //1060808 Justin [1050087] 二代公文修改
	    //document.all["txOrder"].focus();
		$('#txOrder').focus();
	}
	
	if (document.all["dlDept"].selectedIndex == 0)
	{
		strErrMsg += "請選擇傳送單位\n";
	}
	
	if (document.all["dlRole"].selectedIndex == 0)
	{
		strErrMsg += "請選擇傳送角色\n";
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
			//document.all["txNo"].value = jf_Trim(argResult.value.RtnStr);
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
	
	if(argCallerId == "EDM111C1")
	{
		document.all["txNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txOrder"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		
		for(var i = 0 ; i < document.all.dlSignType.options.length ; i++)
		{
		    //1060808 Justin [1050087] 修正原程式BUG
		    //if(document.all.dlSignType.options[i].value == jf_Trim(document.all.lbReturnValue.options[2].value))
		    if (document.all.dlSignType.options[i].text == jf_Trim(document.all.lbReturnValue.options[2].value))
			{
				document.all["dlSignType"].selectedIndex = i;
				break;
			}
		}
		if(document.all["txNo"].value != "" && document.all["txOrder"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	    //1060808 Justin [1050087] 二代公文修改
	    //document.all["txNo"].focus();
		$('#txNo').focus();
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

//傳送單位onchange時變動傳送角色
function DeptChang()
{
	
	var argDept = document.all.dlDept.options[document.all.dlDept.selectedIndex].value ;
    //1060808 Justin [1050087] 修正原程式BUG-避免選項未更動卻重製下層selectedIndex
	var strRoleIndex = document.all.dlRole.selectedIndex;

	if(argDept == "")
		return;
		
	var arWSParam = new Array(1);
	arWSParam[0] = argDept;
	var CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetSubRole", false, arWSParam);
	if (!CallWsObj)
	{
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["找不到單位下角色資訊。"])),"");
		return;
	}
	else
	{
		var dlLen = document.all.dlRole.options.length ;
		for(var j =1 ; j< dlLen ; j++)
		{
			document.all.dlRole.options.remove(1);
		}
		for(var i =0 ; i< CallWsObj.value.RoleNo.length ; i ++)
		{	
			var oOption = document.createElement("OPTION");
			document.all.dlRole.options.add(oOption);
			oOption.text = CallWsObj.value.RoleName[i];
			oOption.value = CallWsObj.value.RoleNo[i];
		}
	}
    //1060808 Justin [1050087] 修正原程式BUG-避免選項未更動卻重製下層selectedIndex
	if (argDept == document.all.DeptCode.value)
	    document.all.dlRole.selectedIndex = strRoleIndex;
	else
	    document.all.dlRole.selectedIndex = 0;
    // 用隱藏欄位記住 單位
	document.all.DeptCode.value = argDept;
    //1060808 Justin [1050087] 修正原程式BUG-傳送人員選單
	RoleChang();
}

// 傳送角色變動時 變動傳送人員
function RoleChang()
{
	var argDept = document.all.dlDept.options[document.all.dlDept.selectedIndex].value ;
	var argRole = document.all.dlRole.options[document.all.dlRole.selectedIndex].value ;
    //1060808 Justin [1050087] 修正原程式BUG-避免選項未更動卻重製下層selectedIndex
	var strUserIndex = document.all.dlUser.selectedIndex;

	if(argDept == "")
		return;
		
	var arWSParam = new Array(2);
	arWSParam[0] = argDept;
	arWSParam[1] = argRole;
	var CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetAllUsersOfRole", false, arWSParam);
	if (!CallWsObj)
	{
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["找不到單位角色下帳號資訊。"])),"");
		return;
	}
	else
	{
		var dlLen = document.all.dlUser.options.length ;
		for(var j =1 ; j< dlLen ; j++)
		{
			document.all.dlUser.options.remove(1);
		}
		for(var i =0 ; i< CallWsObj.value.EmpName.length ; i ++)
		{	
			var oOption = document.createElement("OPTION");
			document.all.dlUser.options.add(oOption);
			oOption.text = CallWsObj.value.EmpName[i];
			oOption.value = CallWsObj.value.UserName[i];
		}   
	}
    //1060808 Justin [1050087] 修正原程式BUG-避免選項未更動卻重製下層selectedIndex
	if (argRole == document.all.RoleCode.value)
	    document.all.dlUser.selectedIndex = strUserIndex;
	else
	    document.all.dlUser.selectedIndex = 0;
	// 用隱藏欄位記住 角色
	document.all.RoleCode.value = argRole ;
}

// 傳送人員變動時，用隱藏欄位記住人員
function UserChang()
{
	var argUser = document.all.dlUser.options[document.all.dlUser.selectedIndex].value ;
	document.all.UserCode.value = argUser ;
}
