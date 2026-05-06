/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1000718	Jeff	1000568	配合檔管局驗證專案，修改無法依照應用申請人條件搜尋出資料。另外一併修改相關bug：
 *                         (1)承辦人、調案人下拉選單同時出現ID與姓名
 *                         (2)以承辦人、調案人條件作為搜索時無法取得下拉選單的值。
 *                         (3)清除模式失效。
 * 1050905	Kenny	1050087	二代公文系統相關修改
 //	1051019	Joe		1050087	二代修改配合行動平台 * 1100204  Zen     1090927 取消使用document.activeElement
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050905	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1000718	Jeff	1000568	清空欄位
	document.all["H_txUser"].value="";
	document.all["H_txBorUser"].value="";
    //1050905	Kenny   [1050087]	二代公文系統相關修改；一併移除無用CODE
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, null);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
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
        //1050905	Kenny   [1050087]	二代公文系統相關修改，以JQueryUI取代--Start--
		//case "ib1":
		//	//1000718	Jeff	修正日曆失效---------start---------
		//	Page_BlockSubmit=true;
		//    jf_CallCalendar(document.all.txBorDateS, event.screenX, event.screenY);
		//	break;
		//case "ib2":
		//	Page_BlockSubmit=true;
		//    jf_CallCalendar(document.all.txBorDateE, event.screenX, event.screenY);
		//	break;
		//case "ib3":
		//	Page_BlockSubmit=true;
		//    jf_CallCalendar(document.all.txAppDateS, event.screenX, event.screenY);
		//	break;
		//case "ib4":
		//	Page_BlockSubmit=true;
		//    //jf_CallCalendar(document.all[xObjectName], event.screenX, event.screenY);
		//    jf_CallCalendar(document.all.txAppDateE, event.screenX, event.screenY);
		//	break;
		//	//--------------------------------------end------------
		//1050905	Kenny   [1050087]	二代公文系統相關修改，以JQueryUI取代--End--	
		case "btHelp1":
			Page_BlockSubmit=true;
		    var pUrl = "";
			//1000718	Jeff	1000568		修正連結，並傳入權仗、網此參數k1=1 預設調案方式為檔案原件
		    //pUrl = "../../../AKD/AKS502.aspx";
 			pUrl = "../../../AK/AKS502.aspx?rtnObj=lbReturnValue&SAMLart="+document.all.SsoArtifact.value+"&k1=1";
            //1050905	Kenny   [1050087]	二代公文系統相關修改；調整開啟視窗大小
			//jf_OpenChildWin(pUrl, "AKS502", 750, 500);
            jf_OpenChildWin(pUrl, "AKS502", 800, 600);
			break;
		case "btHelp2":
			Page_BlockSubmit=true;
		    var pUrl = "";
			//1000718	Jeff	1000568		修正連結，並傳入權仗
		    //pUrl = "../../../AKD/AKS501.aspx";
 			pUrl = "../../../AK/AKS501.aspx?rtnObj=lbReturnValue&SAMLart="+document.all.SsoArtifact.value;
            //1050905	Kenny   [1050087]	二代公文系統相關修改；調整開啟視窗大小
			//jf_OpenChildWin(pUrl, "AKS501", 750, 500);
            jf_OpenChildWin(pUrl, "AKS501", 800, 600);
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050905	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050905	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
        //1050905	Kenny   [1050087]	二代公文系統相關修改；一併移除無用CODE--Start--
		//case "btOpen":
		//	Page_BlockSubmit = !jf_CheckKeyObject();
		//	jf_ToolBarSubmit();
		//	break;
		//case "btSave":
		//	if(jf_ConfirmSave()) //是否通過儲存前必要檢查
		//	{
		//		IsServerHandling = true;
		//		jf_ShowWaitState();	
		//		Page_BlockSubmit = false;
		//	}
		//	else
		//		Page_BlockSubmit = true;
		//	jf_ToolBarSubmit();	
		//	break;
		//case "btDelete":
		//	Page_BlockSubmit = !jf_ConfirmDelete();
		//	jf_ToolBarSubmit();
		//	break;
		//case "btCancel":
		//	Page_BlockSubmit = !jf_ConfirmCancel();
		//	jf_ToolBarSubmit();
		//	break;
        //1050905	Kenny   [1050087]	二代公文系統相關修改；一併移除無用CODE--End--
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
            //1050905	Kenny   [1050087]	二代公文系統相關修改
			//document.all["txDocNo"].focus();
            $('#txDocNo').focus();
			InitObj();
			break;
        //1050905	Kenny   [1050087]	二代公文系統相關修改；一併移除無用CODE
		//case "btSearch":
			/*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			*/
        //1050905	Kenny   [1050087]	二代公文系統相關修改；一併移除無用CODE
		//	break;
		case "btPrint":
			if(!CheckBeforePrint())
			{
				Page_BlockSubmit = true;				
			}
			else
				Page_BlockSubmit = false;
			//1050905	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(!CheckBeforePrint())
			{
				Page_BlockSubmit = true;				
			}
			else
				Page_BlockSubmit = false;
			//1050905	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
//1050905	Kenny   [1050087]	二代公文系統相關修改；一併移除無用CODE--Start--
//function jf_ConfirmSave()
//{
//	var bRtnbool = false;
	
//	if (jf_CheckBeforSave())
//	{
//		// 新增模式需檢查鍵值是否已存在
//		if (jf_GetActionMode()==LayoutModeNew)
//		{
//			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
//			{
//				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
//					bRtnbool = true;
//			}
//			else
//				bRtnbool = true;
//		}
//		else
//			bRtnbool = true;
//	}
		
//	return bRtnbool;
//}

////儲存前之欄位檢查
//function jf_CheckBeforSave()
//{
//	var bRtnbool = true;
//	var strErrMsg= "";
//	var Count = -1;
	
//	if(document.all["txDocNo"].value == "" && document.all["txYear"].value == "" && document.all["txCls"].value=="" && document.all["txCase"].value=="" && document.all["txVol"].value=="" && document.all["txSeq"].value=="" && document.all["txBorDateS"].value=="" && document.all["txBorDateE"].value=="" && document.all["txBorNo"].value=="" && document.all["txAppDateS"].value=="" && document.all["txAppDateE"].value=="" && document.all["txAppNo"].value=="" && document.all["txAppUser"].value=="")
//	{		
//		if(document.all["dlDept"].selectedIndex != 0)
//		{
//			Count++;
//		}		
//		if(document.all["dlBorDept"].selectedIndex != 0)
//		{
//			Count++;
//		}
	
//		if(document.all["dlUser"].selectedIndex != -1)
//		{
//			Count++;
//		}
	
//		if(document.all["dlBorUser"].selectedIndex != -1)
//		{
//			Count++;
//		}		
		
//		if(Count == -1)
//			strErrMsg += "請至少填寫一項條件以便查詢\n";		
//	} 
		
//	if (strErrMsg != "")
//	{
//		bRtnbool = false;
//		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
//	}
	
//	return bRtnbool;
//}
//1050905	Kenny   [1050087]	二代公文系統相關修改；一併移除無用CODE--End--

//1000718	Jeff	1000568		紀錄選單至隱藏欄位
function setValue()
{
	
	if(document.all["dlUser"].selectedIndex != -1)
	{
		document.all["H_txUser"].value=document.all["dlUser"].options[(document.all["dlUser"].selectedIndex)].value;
	}		
	if(document.all["dlBorUser"].selectedIndex != -1)
	{
		document.all["H_txBorUser"].value=document.all["dlBorUser"].options[(document.all["dlBorUser"].selectedIndex)].value;
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
    if(argResult.id == ws_DeptID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
			AccessDDL(argResult,"dlUser");			
		}
		else
		{
			//document.all["txReadOnly"].value = "";
			alert("取得WebSerVice服務失敗");
		}		
    }
    if(argResult.id == ws_BorID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
			AccessDDL(argResult,"dlBorUser");
		}
		else
		{
			//document.all["txReadOnly"].value = "";
			alert("取得WebSerVice服務失敗");
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
	
	if (argCallerId == "AKS502")
	{
		document.all["txBorNo"].value = document.all["lbReturnValue"].options[0].value;
        //1050905	Kenny   [1050087]	二代公文系統相關修改
        //document.all["txBorNo"].focus();
        $('#txBorNo').focus();
	}
	if (argCallerId == "AKS501")
	{
		//1000718	Jeff	1000568		修正傳回錯誤的數值
		//document.all["txAppNo"].value = document.all["lbReturnValue"].options[0].value;
		document.all["txAppNo"].value = document.all["lbReturnValue"].options[0].text;
        //1050905	Kenny   [1050087]	二代公文系統相關修改
        //document.all["txAppNo"].focus();
        $('#txAppNo').focus();
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

//補0
function CallPadFunc(strObjName,argCount)
{		
	switch(strObjName)
	{		
		case "txBorDateS":
		case "txBorDateE":
		case "txAppDateS":
		case "txAppDateE":
		{
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,argCount,"0");			
			if(!jf_CheckCDATE(document.all[strObjName].value) &&jf_Trim(document.all[strObjName].value) != "")
			{
				alert("輸入日期格式不正確，請檢查");
				document.all[strObjName].value = "";			
			}
			break;					
		}
		case "txYear":
		case "txSeq":		
		{
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,argCount,"0");				
		}
		break;		
		case "txVol":
		{
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,argCount,"0");				
		}
		break;		
	}
}

var ws_DeptID="";
var ws_BorID="";
function SyncDeptUser()
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;
	var DeptNo = document.all[xObjectName].selectedIndex;	
	DeptNo = document.all[xObjectName].options[DeptNo].value;
	var subArr = new Array();
	subArr = DeptNo.split(':');
	
	var param = new Array(1);		
	param[0] = subArr[0];
	
	if(xObjectName == "dlDept")
	{
		var CallObj_1 = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, param);
		ws_DeptID = CallObj_1.id;
		OnWSResult(CallObj_1);		
	}
	if(xObjectName == "dlBorDept")
	{
		var CallObj_2 = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, param);
		ws_BorID = CallObj_2.id;
		OnWSResult(CallObj_2);		
	}
}

function AccessDDL(argCallObj,DestinationObj)
{
	var UserArr = new Array();				
	UserArr = argCallObj.value.UserName;				
    //1050905	Kenny   [1050087]	二代公文系統相關修改；一併修正當「承辦/調案單位」選回空白選項時自動將「承辦/調案人」選項清空
	//var nCount = UserArr.length;
	
	var DropListChild = document.createElement("OPTION");
	while(document.all[DestinationObj].options[0] != null)
	{
		document.all[DestinationObj].options[0]=null;
		document.all[DestinationObj].options[0]=null;
	}
	//於dListEmpName的第一個增加一個空白的選項
	DropListChild.text = "";
	DropListChild.value = "";
	document.all[DestinationObj].options.add(DropListChild);
	
    //1050905	Kenny   [1050087]	二代公文系統相關修改；一併修正當「承辦/調案單位」選回空白選項時自動將「承辦/調案人」選項清空
    //                              當回傳物件有值時才設定下拉選單
    if ( UserArr.length != null )
    {
        //1050905	Kenny   [1050087]	二代公文系統相關修改；一併修正當「承辦/調案單位」選回空白選項時自動將「承辦/調案人」選項清空
        //                              取回傳物件長度移至此
        var nCount = UserArr.length;
        
        for(var i=0;i<nCount;i++)
        {
            var deptDropListChild = document.createElement("OPTION");
            //1000718	Jeff	1000568		修正下拉選單出現ID的錯誤
            //deptDropListChild.text = argCallObj.value.EmpName[i];
            //deptDropListChild.value = argCallObj.value.EmpName[i];
            //document.all[DestinationObj].options.add(deptDropListChild);
            //var empDropListChild = document.createElement("OPTION");
            //empDropListChild.text = argCallObj.value.UserName[i];
            //empDropListChild.value = argCallObj.value.UserName[i];
            //document.all[DestinationObj].options.add(empDropListChild);
            deptDropListChild.text = argCallObj.value.EmpName[i];
            deptDropListChild.value = argCallObj.value.UserName[i];
            document.all[DestinationObj].options.add(deptDropListChild);
        }
    }	
}

function CheckBeforePrint()
{
	var recordCount = 0;
	if(document.all["cb1"].checked)
		recordCount++;
	if(document.all["cb2"].checked)
		recordCount++;
		
	if(recordCount == 0)
	{
		alert("請選擇一項應用類別");
		return false;
	}
	else
		return true;
		
}

function InitObj()
{
	document.all["cb1"].checked = true;
	document.all["cb2"].checked = true;
	document.all["cbAll"].checked = true;	
}