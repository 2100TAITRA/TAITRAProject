/*
DATE 	SA		PRG		MGR_NO		DESC
1060105	David   Kenny	1050087	    二代公文系統相關修改
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

//1060105	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //1060105	Kenny   [1050087]	二代公文系統相關修改；移除無用CODE--Start--
	//jf_CallWS("../EDLIB/EDWS.asmx", "GetSubUnit", false, null);
	//jf_CallWS("../EDLIB/EDWS.asmx", "GetFolderInfo", false, null);
    //1060105	Kenny   [1050087]	二代公文系統相關修改；移除無用CODE--End--
	document.all.dlOwnSect.className = "hide";
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060105	Kenny   [1050087]	二代公文系統相關修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060105	Kenny   [1050087]	二代公文系統相關修改
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
            //1060105	Kenny   [1050087]	二代公文系統相關修改
			//jf_OpenChildWin(strUrl, "EDM113C1", 700, 500 );
            jf_OpenChildWin(strUrl, "EDM113C1", 800, 600 );
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060105	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1060105	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060105	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060105	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
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
	if(argCallerId == "EDM113C1")
	{
		document.all["txToOu"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
	}
	
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2, argRead3, argRead4)
{
    
	try
	{
	    opener.document.all.lbReturnValue.length = 5;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.document.all.lbReturnValue.options[1].value = argRead1;
	    opener.document.all.lbReturnValue.options[2].value = argRead2;
	    opener.document.all.lbReturnValue.options[3].value = argRead3;
	    opener.document.all.lbReturnValue.options[4].value = argRead4;
	    opener.window.CallBack("EDM110C1");
	    close();
	}
	catch (e) {}
    
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

// 單位異動時 帶出2級單位
function dlOwnDeptChang()
{
	var argDept = document.all.dlOwnDept.options[document.all.dlOwnDept.selectedIndex].value ;
	document.all.SectCode.value = argDept ;
	
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
	{
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
			document.all.HaveSubUnit.value = "N";
		}	
	}
	document.all.dlOwnSect.selectedIndex = 0;
}

// 選擇單位時，用隱藏欄位紀錄資訊
function SectChang()
{
	var argSectCode = document.all.dlOwnSect.options[document.all.dlOwnSect.selectedIndex].value ;
	document.all.SectCode.value = argSectCode ;
}	


// 簽核類型異動時，帶出不同的主文件盒、子文件盒、異動別
function dlSignTypeChang()
{
	var dlFolderLen = document.all.cbFolder.options.length ;
	for(var j =0 ; j< dlFolderLen ; j++)
	{
		document.all.cbFolder.options.remove(0);
	}
	document.all["cbFolder"].size = 2;
	var dlSubFolderLen = document.all.cbSubFolder.options.length ;
	for(var j =0 ; j< dlSubFolderLen ; j++)
	{
		document.all.cbSubFolder.options.remove(0);
	}
	document.all["cbSubFolder"].size = 2;
	var dlTxnameLen = document.all.cbTxname.options.length ;
	for(var j =0 ; j< dlTxnameLen ; j++)
	{
		document.all.cbTxname.options.remove(0);
	}
	document.all["cbTxname"].size = 2;
	
	document.all["cbFolder_Text"].value = "";
	document.all["cbSubFolder_Text"].value = "";
	document.all["cbTxname_Text"].value = "";
	
			
	var arWSParam = new Array(1);
	if(document.all.dlSignType.selectedIndex == 1)
	{
		arWSParam[0] = "MENU_RULE";	
	}
	else if(document.all.dlSignType.selectedIndex == 2)
	{
		arWSParam[0] = "MENU_RULE_AOL";
	}
	else
	{
		return;
	}
	var CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetFolderInfo", false, arWSParam);
	if (!CallWsObj)
	{
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["WebService 呼叫失敗"])),"");
		return;
	}
	else
	{	
		var LenFolder = CallWsObj.value.strFolder.length;
		var LenSubFolder = CallWsObj.value.strSubFolder.length;
		var LenTxname = CallWsObj.value.strTxname.length;

		for(var i = 0 ; i < LenFolder ; i ++)
		{
			var oOption = document.createElement("OPTION");
			document.all.cbFolder.options.add(oOption);
			oOption.text = CallWsObj.value.strFolder[i];
			oOption.value = i;
		}
		for(var i = 0 ; i< LenSubFolder ; i ++)
		{
			var oOption = document.createElement("OPTION");
			document.all.cbSubFolder.options.add(oOption);
			oOption.text = CallWsObj.value.strSubFolder[i];
			oOption.value = i;
		}
		for(var i = 0 ; i< LenTxname ; i ++)
		{
			var oOption = document.createElement("OPTION");
			document.all.cbTxname.options.add(oOption);
			oOption.text = CallWsObj.value.strTxname[i];
			oOption.value = i;
		}
		if(document.all["cbFolder"].options.length > 10)
			document.all["cbFolder"].size = 10;
		else if(document.all["cbFolder"].options.length ==1)
			document.all["cbFolder"].size = 2;
		else
			document.all["cbFolder"].size = document.all["cbFolder"].options.length;
			
		if(document.all["cbSubFolder"].options.length > 10)
			document.all["cbSubFolder"].size = 10;
		else if(document.all["cbSubFolder"].options.length ==1)
			document.all["cbSubFolder"].size = 2;
		else
			document.all["cbSubFolder"].size = document.all["cbSubFolder"].options.length;
			
		if(document.all["cbTxname"].options.length > 10)
			document.all["cbTxname"].size = 10;
		else if(document.all["cbTxname"].options.length ==1)
			document.all["cbTxname"].size = 2;
		else
			document.all["cbTxname"].size = document.all["cbTxname"].options.length;
	}
}

// 主文件盒異動時記下異動狀態
function FolderChang()
{
    //1060105	Kenny   [1050087]	二代公文系統相關修改
	//document.all.FolderBox.value = document.all.cbFolder.options[document.all.cbFolder.selectedIndex].innerText;
    document.all.FolderBox.value = document.all.cbFolder.options[document.all.cbFolder.selectedIndex].textContent;
}

// 子文件盒異動時記下異動狀態
function SubFolderChang()
{
    //1060105	Kenny   [1050087]	二代公文系統相關修改
	//document.all.SubFolderBox.value = document.all.cbSubFolder.options[document.all.cbSubFolder.selectedIndex].innerText ;
    document.all.SubFolderBox.value = document.all.cbSubFolder.options[document.all.cbSubFolder.selectedIndex].textContent ;
}

// 異動別時記下異動狀態
function TxRuleChang()
{
    //1060105	Kenny   [1050087]	二代公文系統相關修改
	//document.all.TxRuleBox.value = document.all.cbTxname.options[document.all.cbTxname.selectedIndex].innerText;
    document.all.TxRuleBox.value = document.all.cbTxname.options[document.all.cbTxname.selectedIndex].textContent;
}
	
