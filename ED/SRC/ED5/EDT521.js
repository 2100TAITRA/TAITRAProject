 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		 SA           PG           單號	     概要
 * -------------------------------------------------------------------------------------------------
 * 1000825	David		Kevi		1000713		新增公文郵件郵寄方式登錄作業
 * 1001019	Yvonne		Jeff		1000849		新增郵寄大類與小類批次設定功能
 * 1060818	David		Kevin_C		1050087		升二代
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060818	Kevin_C	1050087	升二代
//if(document.all.tbTool)
	//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1001019	Jeff	1000849		增加DataGrid用toolbar
if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060818	Kevin_C	1050087	升二代
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//1001019	Jeff	1000849	初始化大小類下拉選單
	dlOnChange();
	if(document.all["H_txSubNo"].value!="")
	{
		for(var i=0;i<document.all["dlSubclassNo"].length;i++)
		{
			if((document.all["dlSubclassNo"].options[i].value) == document.all["H_txSubNo"].value)
			{
				document.all["dlSubclassNo"].selectedIndex = i;
				break;
			}
		}	
	}
}
/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1001019	Jeff	1000849		增加按鈕處理
//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl()
function ClientButtonControl(event)
{
	// var xObjectName = document.activeElement.id;
	var xObjectName = event.target.id;
	
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
		case "btSetDgDl":
		{
			Page_BlockSubmit=true;
			dgdlClassSet();
			break;
		}
		//1060818	Kevin_C	1050087	升二代 -S
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
		//1060818	Kevin_C	1050087	升二代 -E
	}
}
/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060818	Kevin_C	1050087	升二代
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
	
	//1060818	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060818	Kevin_C	1050087	升二代
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
			//1060818	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060818	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1060818	Kevin_C	1050087	升二代
			//document.all["txDocNo"].focus();
			$('#txDocNo').focus();
			break;
		case "btSearch":
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txDocNo"].value);
			strUrl = "EDI521.aspx?rtnObj=lbReturnValue&argDocNo="+strKeyCol;
			jf_OpenChildWin(strUrl, "EDI521", 700, 500 );
			//1060818	Kevin_C	1050087	升二代
			Page_BlockSubmit = true;
			break;
		//1001019	Jeff	1000849		增加dg用Toolbar
		//以下屬於DataGrid ToolBar
		//1060818	Kevin_C	1050087	升二代 -S
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
		//1060818	Kevin_C	1050087	升二代 -E
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		bRtnbool = true;
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if(!jf_CheckBlankAndAlert())
	{
		bRtnbool = false;
		strErrMsg += "請選擇郵寄小類";
	}

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
	var strSubClassValue = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		strSubClassValue = jf_GetDLValue(document.all["dg1__ctl" + i + "_dlPostSubclass"])
		if( strSubClassValue == "")
			return false;
		document.all["dg1__ctl" + i + "_H_txSubclassNo"].value = strSubClassValue;
	}
	return true;
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	if(argCallerId == "EDI521")
	{
		document.all["txDocNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txDocNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		//1060818	Kevin_C	1050087	升二代
		//document.all["txDocNo"].focus();
		$('#txDocNo').focus();
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
function jf_GetDLValue(argDLObj)
{
	if(argDLObj.selectedIndex == -1)
		return "";
	return argDLObj.options[argDLObj.selectedIndex].value;	
}

function dlClassNoOnChange(argID)
{
	var pNo = argID.substring(8,argID.indexOf("_dlPostClass"));
	var Orglist = document.all["dg1__ctl" + pNo + "_dlPostSubclass"];
	
	//清空郵寄小類選項
	Orglist.options.length = 0;

	//重新設定郵寄小類選項
	for(var i = 0; i < document.all["H_ALL_dlSubclassNo"].length; i++)
	{
		var strAccNo = document.all["H_ALL_dlSubclassNo"].options[i].value.split("|");
		
		if (jf_GetDLValue(document.all[argID]) == strAccNo[0])
		{
			var opt = document.createElement("option");
			opt.text = document.all["H_ALL_dlSubclassNo"].options[i].text;
			opt.value = strAccNo[1];
			Orglist.options.add(opt);
		}
	}
}
//1001019	Jeff	1000849		郵寄大類選單連動
function dlOnChange()
{
	var Orglist = document.all["dlSubclassNo"];
	
	//清空郵寄小類選項
	Orglist.options.length = 0;
	
	//重新設定郵寄小類選項
	for(var i = 0; i < document.all["H_ALL_dlSubclassNo"].length; i++)
	{
		var strAccNo = document.all["H_ALL_dlSubclassNo"].options[i].value.split("|");	
		if (jf_GetDLValue(document.all["dlClassNo"]) == strAccNo[0])
		{
			var opt = document.createElement("option");
			opt.text = document.all["H_ALL_dlSubclassNo"].options[i].text;
			opt.value = strAccNo[1];
			Orglist.options.add(opt);
		}
	}
}
//1001019	Jeff	1000849		郵寄小類選單連動
function dlSubOnChange()
{
	document.all["H_txSubNo"].value = jf_GetDLValue(document.all["dlSubclassNo"]);
}
//1001019	Jeff	1000849		批次設定
function dgdlClassSet()
{
	if(document.all.dg1==null)
		return;
	var Changed = false;
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
		{
			//設定郵寄大類
			SetDlValue("dlClassNo","dg1__ctl" + i + "_dlPostClass");
			//初始化郵寄小類
			dlClassNoOnChange("dg1__ctl" + i + "_dlPostClass");
			//設定郵寄小類
			SetDlValue("dlSubclassNo","dg1__ctl" + i + "_dlPostSubclass");
			Changed = true;
		}		
	}
	if(!Changed)
		alert("如要批次設定請至少勾選一筆");
}
//1001019	Jeff	1000849		設定dl選項
function SetDlValue(argOgject,argID)
{
	for(var i=0;i<document.all[argID].length;i++)
	{
		if((document.all[argID].options[i].value) == jf_GetDLValue(document.all[argOgject]))
		{
			document.all[argID].selectedIndex = i;
			break;
		}
	}
}

