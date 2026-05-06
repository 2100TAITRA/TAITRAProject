/*
DATE 	SA		PRG		MGR_NO		DESC
1051229	David   Kenny	1050087	    二代公文系統相關修改
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

//1051229	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051229	Kenny   [1050087]	二代公文系統相關修改；移除無用CODE--Start--
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../EDLIB/EDWS.asmx", "GetSubRole", false, null);
	//jf_CallWS("../EDLIB/EDWS.asmx", "GetSubUnit", false, null);
    //1051229	Kenny   [1050087]	二代公文系統相關修改；移除無用CODE--End--
	
	if(document.all.OwnSectOpenStats.value != "")
	{
		document.all.OwnSectOpenStats.value == "";
	}
	else
	{
		document.all.dlOwnSect.className = "hide";
		document.all.HaveSubUnit.value = "N";
	}	
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051229	Kenny   [1050087]	二代公文系統相關修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051229	Kenny   [1050087]	二代公文系統相關修改
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
		case "btFindOu":
			var strUrl = "EDM113C1.aspx?rtnObj=lbReturnValue&TYPE=M1";
            //1051229	Kenny   [1050087]	二代公文系統相關修改
			//jf_OpenChildWin(strUrl, "EDM113C1", 700, 500 );
            jf_OpenChildWin(strUrl, "EDM113C1", 800, 600 );
			break;
		case "btSetFlow":
			var strUrl = "EDM111.aspx?rtnObj=lbReturnValue";
            //1051229	Kenny   [1050087]	二代公文系統相關修改
			//jf_OpenChildWin(strUrl, "EDM111", 700, 500 );
            jf_OpenChildWin(strUrl, "EDM111", 800, 600 );
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051229	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1051229	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1051229	Kenny   [1050087]	二代公文系統相關修改
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
			//1051229	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1051229	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1051229	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			var RA = document.all["FlowType"].value;
			var RB = document.all["OwnSectOpenStats"].value;
			var RC = document.all["HaveSubUnit"].value;
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all["FlowType"].value = RA;
			document.all["OwnSectOpenStats"].value = RB;
			document.all["HaveSubUnit"].value =RC ;
			document.all["rlStartState_0"].checked = true;
			document.all["rbIsReadOnly_0"].checked = true;
			break;
		case "btSearch":
			var strUrl = "EDM110C1.aspx?rtnObj=lbReturnValue";
            //1051229	Kenny   [1050087]	二代公文系統相關修改
			//jf_OpenChildWin(strUrl, "EDM110C1", 800, 500 );
            jf_OpenChildWin(strUrl, "EDM110C1", 800, 600 );
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
	
	if (document.all["dlSignType"].selectedIndex == 0)
	{
		strErrMsg += "請選擇簽核類型\n";
	}
	
	if (document.all["txFolder"].value == "")
	{
		strErrMsg += "主文件盒不可空白\n";
        //1051229	Kenny   [1050087]	二代公文系統相關修改
        //document.all["txFolder"].focus();
        $('#txFolder').focus();
	}
	
	if (document.all["txSubFolder"].value == "")
	{
		strErrMsg += "子文件盒不可空白\n";
		//1051229	Kenny   [1050087]	二代公文系統相關修改
        //document.all["txSubFolder"].focus();
        $('#txSubFolder').focus();
	}

	if (document.all["txName"].value == "")
	{
		strErrMsg += "異動別不可空白\n";
		//1051229	Kenny   [1050087]	二代公文系統相關修改
        //document.all["txName"].focus();
        $('#txName').focus();
	}
	
	if (document.all["txDisplay"].value == "")
	{
		strErrMsg += "異動別顯示名稱不可空白\n";
		//1051229	Kenny   [1050087]	二代公文系統相關修改
        //document.all["txDisplay"].focus();
        $('#txDisplay').focus();
	}
	if (document.all.dlSignType.selectedIndex == 2)
	{
		if (document.all["txToOu"].value == "")
		{
			strErrMsg += "傳送對象不可空白\n";
			//1051229	Kenny   [1050087]	二代公文系統相關修改
            //document.all["txToOu"].focus();
            $('#txToOu').focus();
		}
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
			//document.all["txFolder"].value = jf_Trim(argResult.value.RtnStr);
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
	if(argCallerId == "EDM113C1")
	{
		document.all["txToOu"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
	}
	
	if(argCallerId == "EDM110C1")
	{
		for(var i = 0 ; i < document.all.dlSignType.options.length ; i++)
		{
			if(document.all.dlSignType.options[i].value == jf_Trim(document.all.lbReturnValue.options[0].value))
			{
				document.all["dlSignType"].selectedIndex = i;
				break;
			}
		}
		
		document.all["txFolder"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txSubFolder"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txName"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		document.all["txToOu"].value = jf_Trim(document.all.lbReturnValue.options[4].value);
		
		if(document.all["txFolder"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		//1051229	Kenny   [1050087]	二代公文系統相關修改
        //document.all["txFolder"].focus();
        $('#txFolder').focus();
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

//單位名稱ONCHANGE時 帶出角色
function DeptChang()
{
	var argDept = document.all.dlDept.options[document.all.dlDept.selectedIndex].value ;
	
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
	document.all.dlRole.selectedIndex = 0;
}


// 角色被選的時候 用隱藏欄位記住相關資訊
function RoleChang()
{
	var argRoleCode = document.all.dlRole.options[document.all.dlRole.selectedIndex].value ;
	var argRoleName = document.all.dlRole.options[document.all.dlRole.selectedIndex].text ;
	document.all.RoleCode.value = argRoleCode ;
	document.all.RoleName.value = argRoleName ;
}


//適用單位ONCHANGE時帶出二級單位
function dlOwnDeptChang()
{
	var argDept = document.all.dlOwnDept.options[document.all.dlOwnDept.selectedIndex].value ;
	
	if(argDept == "")
	{
		document.all.dlOwnSect.className = "hide";
		document.all.HaveSubUnit.value = "N";
		return;
	}
	
	var arWSParam = new Array(1);
	arWSParam[0] = argDept;
	var CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetSubUnit", false, arWSParam);
	if (!CallWsObj)
	{
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["找不到單位下角色資訊。"])),"");
		return;
	}
	else
	{	//FlowType 從SystemSet中取得 是否有2級單位
		if(document.all.FlowType.value == "2")
		{
			var dlLen = document.all.dlOwnSect.options.length ;
			for(var j =0 ; j< dlLen ; j++)
			{
				document.all.dlOwnSect.options.remove(0);
			}
			var SecLen = CallWsObj.value.SecNo.length;
			if(SecLen > 0)
			{
				document.all.dlOwnSect.className = "";
				for(var i =0 ; i< SecLen ; i ++)
				{	
					var oOption = document.createElement("OPTION");
					document.all.dlOwnSect.options.add(oOption);
					oOption.text = CallWsObj.value.SectName[i];
					oOption.value = CallWsObj.value.SecNo[i];
				}
				document.all.dlOwnSect.className = "";
				document.all.HaveSubUnit.value = "Y";
			}
			else
			{	
				document.all.dlOwnSect.className = "hide";
				document.all.HaveSubUnit.value = "N";
			}
		}
		else
		{	
			document.all.dlOwnSect.className = "hide";
			document.all.HaveSubUnit.value = "N";
		}	
	}
	document.all.dlOwnSect.selectedIndex = 0;
	var argSectCode = document.all.dlOwnSect.options[document.all.dlOwnSect.selectedIndex].value ;
	// 用隱藏欄位記住單位資訊
	document.all.SectCode.value = argSectCode ;
}

//適用單位 onchange時 用隱藏欄位記住值
function SectChang()
{
	var argSectCode = document.all.dlOwnSect.options[document.all.dlOwnSect.selectedIndex].value ;
	document.all.SectCode.value = argSectCode ;
}	


//簽核類型不同 某些欄位enable
function dlSignTypeChang()
{
	if(document.all.dlSignType.selectedIndex == 1)
	{
		document.all.txRejectMark.disabled = true;
		document.all.dlWebPage.disabled = true;
		document.all.clButton.disabled = true;
		document.all.dlOptLvl.disabled = true;
		document.all.rbIsReadOnly_0.disabled = true;
		document.all.rbIsReadOnly_1.disabled = true;
	}
	else if(document.all.dlSignType.selectedIndex == 2)
	{
		document.all.txRejectMark.disabled = false;
		document.all.dlWebPage.disabled = false;
		document.all.clButton.disabled = false;
		document.all.dlOptLvl.disabled = false;
		document.all.rbIsReadOnly_0.disabled = false;
		document.all.rbIsReadOnly_1.disabled = false;
	}
}

// 刪除會核中主辦訊息 && 刪除會核中會辦訊息 只能選其中一個 
function CheckDelectFlagM()
{
	if(document.all.cbDelectFlagMain.checked ==true)
		document.all.cbDelectFlagSub.checked = false;
}
function CheckDelectFlagS()
{
	if(document.all.cbDelectFlagSub.checked ==true)
		document.all.cbDelectFlagMain.checked = false;
}

