/*
DATE	SA		PRG		MGR_NO	DESC
1060428 Cloud	Cloud	1050784 新增分類號批次設定作業
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

function ClientButtonControl(e)
{
	var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));	

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
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
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
	
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if (document.all["txFileCls"].value == "")
			{
				alert("分類號欄位不可空白");
				Page_BlockSubmit = true;
			}
			else
			{
				Page_BlockSubmit = false;
			}
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
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
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

	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = true;
	
	if (!jf_CheckBeforSave())
	{
	    bRtnbool = false;
			}
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
    if (document.all.txFileCls.value == "")
    {
        alert('分類號不可為空白');
        bRtnbool = false;
    }
    if (!jf_CheckBlankAndAlert())
    {
        alert('至少需勾選一筆單位。');
        bRtnbool = false;
    }
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var bckeck = false;
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
        //至少需勾選一筆
	    if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
			{
	        bckeck = true;
	        break;
		}
	}
	return bckeck;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/



/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
		
	if(argCallerId == "EAC005")
	{		
		if ( document.all["txFileCls"] != null )		
			document.all["txFileCls"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		if ( document.all["txVerNo"] != null )			
			document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[5].value);				
		txFileClsOnBlur();
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

function ibCls_Onclick()
{
	var strVerNo = document.all["txVerNo"].value;

	Page_BlockSubmit=true;			
	var strUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAT808" + "&VER_NO=" + strVerNo+"&MODE=1";
	jf_OpenChildWin(strUrl, "EAC005", 700, 500);
}
var ws_ClsID_DG = null;
function txFileClsOnBlur() {
    //分類號 & 版本別	
    var param1 = new Array(4);
    param1[0] = document.all["txOrgNo"].value;
    param1[1] = document.all["txVerNo"].value;
    param1[2] = document.all["txFileCls"].value;
    param1[3] = "";
    if (jf_Trim(param1[1]) != "" && jf_Trim(param1[2]) != "") {
        RtnObj = jf_CallWS("../ealib/ea_LIB.asmx", "ws_GetCls", false, param1);
        ws_ClsID_DG = RtnObj.id;
        OnWSResult(RtnObj);
    }
}
function OnWSResult(argResult) {
    if (argResult.id == ws_ClsID_DG) {
        if (argResult.value.ClsKey == "") {
        	alert('分類號不存在，請重新輸入');
        	document.all["H_CLSKEY"].value = "";
        	document.all["H_CLSLV"].value = "";
        	document.all["lbClassName"].textContent = "";
        	document.all["H_ISLOWEST"].value = "";
        	document.all["txFileCls"].value = "";
        	document.all["H_CLSNAME"].value = "";
        }
        else {
        document.all["H_CLSKEY"].value = argResult.value.ClsKey;
        document.all["H_CLSLV"].value = argResult.value.ClsLvl;
        document.all["lbClassName"].textContent = argResult.value.ClsName;
        document.all["H_ISLOWEST"].value = argResult.value.IS_LOWEST;
        document.all["H_CLSNAME"].value = argResult.value.ClsName;
        
        }
    }
}