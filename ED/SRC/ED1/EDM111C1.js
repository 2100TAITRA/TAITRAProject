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
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    /*1060808 Justin [1050087] 二代公文修改
	jf_CallWS("../EDLIB/EDWS.asmx", "GetSubRole", false, null);
	jf_CallWS("../EDLIB/EDWS.asmx", "GetAllUsersOfRole", false, null);*/
	
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
		case "btFindOu":
		    var strUrl = "EDM113C1.aspx?rtnObj=lbReturnValue&TYPE=M1";
		    //1060808 Justin [1050087] 二代公文修改
		    //jf_OpenChildWin(strUrl, "EDM113C1", 700, 500);
		    jf_OpenChildWin(strUrl, "EDM113C1", 800, 600);
			break;
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
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1060808 Justin [1050087] 二代公文修改 
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
		document.all["txNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
    
	try
	{
	    opener.document.all.lbReturnValue.length = 3;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.document.all.lbReturnValue.options[1].value = argRead1;
	    opener.document.all.lbReturnValue.options[2].value = argRead2;
	    opener.window.CallBack("EDM111C1");
	    close();
	}
	catch (e) {}
    
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

// 傳送角色變動時 變動傳送人員
function RoleChang()
{
	var argDept = document.all.dlDept.options[document.all.dlDept.selectedIndex].value ;
	var argRole = document.all.dlRole.options[document.all.dlRole.selectedIndex].value ;
	
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
		for(var i =0 ; i< CallWsObj.value.UserName.length ; i ++)
		{	
			var oOption = document.createElement("OPTION");
			document.all.dlUser.options.add(oOption);
			oOption.text = CallWsObj.value.EmpName[i];
			oOption.value = CallWsObj.value.UserName[i];
		}   
	}
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

