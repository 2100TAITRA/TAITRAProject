/*
DATE	SA  	PRG     MGR_NO	DESC
0970212 Stella  Iris    0950305 新增搜尋功能
1050523 David   Zen     1050087 二代公文修改
1060518 Leslie  Zen     1060215 innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050523 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050523 Zen 1050087 二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
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

//1050523 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1050523 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if (jf_ConfirmOpen())
			{
				Page_BlockSubmit = !jf_CheckKeyObject();
			    //1050523 Zen 1050087 二代公文修改
				//jf_ToolBarSubmit(xObjectName);
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btSave":
			if(jf_ConfirmSave())
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050523 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit(xObjectName);
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050523 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit(xObjectName);
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050523 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit(xObjectName);
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(xObjectName);
			break;
		case "btSearch"://IRIS 
		    //1050523 Zen 1050087 二代公文修改
		    Page_BlockSubmit = true;
		    var strUrl = "ODM050C1.aspx?rtnObj=lbReturnValue";
			jf_OpenChildWin(strUrl, "ODM050C1", 700, 500 );
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	ShowMsg();
}

function OnWSResult(argResult)
{
    
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}


/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		//alert(document.all.TemplateMode.value);
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
	
	if (jf_Trim(document.all["txInsNo"].value) == "")
	{
		strErrMsg += "稽催代碼欄位不可空白!!\n";
		document.all["txInsNo"].value = "";
	    //1050523 Zen 1050087 二代公文修改
		//document.all["txInsNo"].focus();
		$('#txInsNo').focus();
	}
	
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		alert(strErrMsg);
	}
	
	return bRtnbool;
}
/********** 以下為按下開啟鍵後相關處理 **********/
//開啟前檢查
function jf_ConfirmOpen()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txInsNo"].value == "")
	{
		strErrMsg += "稽催代碼欄位不可空白!! \n";
	    //1050523 Zen 1050087 二代公文修改
		//document.all["txInsNo"].focus();
		$('#txInsNo').focus();
	}
						
	if (strErrMsg != "")
	{
		bRtnbool = false;
		alert(strErrMsg);
	}
	
	return bRtnbool;
}
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	ShowMsg();
    //1050523 Zen 1050087 二代公文修改
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

function jf_ConfirmCancel()
{
	if(jf_IsModified())
		return window.confirm("您已修改過內容,確定要取消嗎?");
	else
		return window.confirm("確定要取消嗎?");
}
//IRIS
/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	
	if(argCallerId == "ODM050C1")
	{
		document.all["txInsNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);

		if(document.all["txInsNo"].value != "")
		{	
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();

		}
	    //1050523 Zen 1050087 二代公文修改
		//document.all["txInsNo"].focus();
		$('#txInsNo').focus();
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}