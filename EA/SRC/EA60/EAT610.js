
 //	1051019	Leslie		Joe			1050087	二代修改配合行動平台
 /*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	
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
function jf_ToolBarHandle()
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
	
	xObjectName= window.event.srcNode.getAttribute("ID");
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit();
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
			jf_ToolBarSubmit();	
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit();
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit();
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all["txKeyFld"].focus();
			break;
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
			jf_ToolBarSubmit();
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			jf_ToolBarSubmit();
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			jf_ToolBarSubmit();
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
		document.all["txKeyFld"].focus();
	}
	
	if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
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
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//單位、科別、人員選單連動-S
function dlDeptOnChange(argDeptObj,argSectObj,argUserObj)
{
	//單位連動建立二級單位選單
	eajf_GetSubUbit(argDeptObj,argSectObj);
	//單位連動建立承辦人選單
	akjf_DeptCheck2(argDeptObj,argUserObj);
	//取得科別選單內的值放入隱藏欄位再次建立用
	InitSectList(argSectObj);
	//取得承辦人選單內的值放入隱藏欄位再次建立用
	InitUserList(argUserObj);
}

function dlSectOnChange(argSectObj,argUserObj)
{
	var dlSectObj;
	if(argSectObj=="dlSectOld")
		dlSectObj = document.all["dlSectOld"];
	else
		dlSectObj = document.all["dlSectNew"];	
	//取值放入隱藏欄位-提供SEV端做條件用
	document.all["H_dlSectValue"].value = dlSectObj.options[dlSectObj.selectedIndex].text+"|"+dlSectObj.options[dlSectObj.selectedIndex].value;
	//單位連動建立承辦人選單
	akjf_DeptCheck2(argDeptObj,argUserObj);
	//取得承辦人選單內的值放入隱藏欄位再次建立用
	InitUserList(argUserObj);
	
}

function dlUserOnChange(argUserObj)
{
	var dlUserObj;
	if(argUserObj=="dlUserOld")
		dlUserObj = document.all["dlUserOld"];
	else
		dlUserObj = document.all["dlUserNew"];	
	//取值放入隱藏欄位-提供SEV端做條件用
	document.all["H_dlUserValue"].value = dlUserObj.options[dlUserObj.selectedIndex].text+"|"+dlUserObj.options[dlUserObj.selectedIndex].value;
	//單位連動建立承辦人選單
	akjf_DeptCheck2(argDeptObj,argUserObj);
	//取得承辦人選單內的值放入隱藏欄位再次建立用
	InitUserList(argUserObj);
	
}

function InitSectList(argSectObj)
{
	var activeSectObj;
	if(argSectObj=="dlSectOld")
		activeSectObj = document.all["H_SectInfo_Old"];
	else
		activeSectObj = document.all["H_SectInfo_New"];
		
	activeSectObj.value = "";
	
	if(document.all[argSectObj].options.length!=0)
	{
		for(var i =0 ;i<document.all[argSectObj].options.length;i++)
		{
			if(document.all[argSectObj].options(i).text!=="" && document.all[argSectObj].options(i).value!="")
				activeSectObj.value+=document.all[argSectObj].options(i).text+";"+document.all[argSectObj].options(i).value+"|";
		}	
	}
	
}

function InitUserList(argUserObj)
{
	var activeUserObj;
	if(argUserObj=="dlUserOld")
	{
		activeObj = document.all["H_UserInfo_Old"];
	}
	else
	{
		activeObj = document.all["H_UserInfo_New"];
	}
	activeObj.value = "";
	
	if(document.all[argUserObj].options.length!=0)
	{
		for(var i =0 ;i<document.all[argUserObj].options.length;i++)
		{
			if(document.all[argUserObj].options(i).text!=="" && document.all[argUserObj].options(i).value.split(":")[2]!="")
			activeObj.value+=document.all[argUserObj].options(i).text+";"+document.all[argUserObj].options(i).value.split(":")[2]+"|";
		}	
	}
	
}
//單位、科別、人員選單連動-E
//查詢前檢核
function CheckBeforeSearch()
{
	var bRtnbool = false;
		
	return bRtnbool;
}
