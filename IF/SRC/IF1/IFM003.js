/*
DATE	SA	    PRG	     MGR_NO		    DESC
1001025	Leslie	Ivory	 1000539		新增程式
1010216 Leslie  Cloud    1010139        修正當只有單一機關時，沒有帶出所屬單位的BUG
1050419 Kevin   Justin   1050087        二代公文修改
1051019	Leslie	Joe		 1050087		二代修改配合行動平台
1070830	Kevin	Joe		 1070678		配合內政部IIS環境設定改為使用AjaxPro
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

//1050419 Justin 1050087 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--S
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--E

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	SourceOnChange();
	for( var i  = 0; i < document.all["dlDept"].options.length; i++ )
    {
		if( document.all["H_dlDept_Value"].value == jf_Trim(document.all["dlDept"].options[i].value) )
		{
			document.all["dlDept"].selectedIndex = i ;
			break;
		}
	}
	

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
//1050419 Justin 1050087 二代公文修改 
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
	
    //1050419 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !CheckBefore("Open");;
		    //1050419 Justin 1050087 二代公文修改 
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
		    //1050419 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050419 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050419 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (CheckBefore("Save"))
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
//TooBar前之欄位檢查
function CheckBefore( argType )
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (jf_Trim(document.all["dlOrgno"].value) == "")
		strErrMsg += "請選擇隸屬機關\n";
	
	if (jf_Trim(document.all["dlDept"].value) == "")
		strErrMsg += "請選擇隸屬單位\n";
		
	if (jf_Trim(document.all["txRoleNo"].value) == "")
	{
		strErrMsg += "角色代碼欄位不可空白\n";
		document.all["txRoleNo"].focus();
	}
	
	if (jf_Trim(document.all["txRoleName"].value) == "" && argType == "Save")
	{
		strErrMsg += "角色名稱欄位不可空白\n";
		document.all["txRoleName"].focus();
	}
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

function SourceOnChange()
{	
    var dlDept = document.all["dlDept"];
    fnClearDropDownList(dlDept);
	//if(document.all["dlOrgno"].selectedIndex > 0)
	//1010216 Leslie  Cloud    1010139        修正當只有單一機關時，沒有帶出所屬單位的BUG
	if(document.all["dlOrgno"].value!="")
	{
		//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
		// var vaDept = IFM003.GetDept(document.all["dlOrgno"].value).value;
		var vaDept = IF1.IFM003.GetDept(document.all["dlOrgno"].value).value;
		
			if(vaDept.length>0)
			{	
				dlDept.options.add(new Option("",""));
				for(var j=0;j<vaDept.length;j++)
				{
					var strUser = vaDept[j];
					dlDept.options.add(new Option(strUser.split('|')[1],strUser.split('|')[0]));//將name和value分別存入dlDept中
				}
					
			}
			else
			{
				fnClearDropDownList(dlDept);
			}
	}
	else
	{
		fnClearDropDownList(dlDept);
	}
	
	

}
function DeptOnChange()
{	  
	document.all["H_dlDept_Value"].value = jf_Trim(document.all["dlDept"].value) ;
}
function fnClearDropDownList(obj)//專用呼叫清空控制項
{
	while(obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
		obj.options.remove(0);			
}
