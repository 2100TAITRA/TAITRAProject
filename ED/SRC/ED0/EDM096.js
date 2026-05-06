/*
DATE 		SA		PRG		MGR_NO		DESC
1020904		Yvonne	Eileen	1020438		新增程式(廠商送審附件類別維護作業)
1050719     David   Zen     1050087     二代公文修改
1051019     Leslie  Kenny   1050087     二代公文修改
*/

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050720 Zen 1050087  二代公文修改
//document.all.txType.focus();
$('#txType').focus();

// 10201004	Eileen	檢查是否有值，若有值則補零；若沒有值則不做任何事
document.all.txType.onblur = CheckValueLength ;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050720 Zen 1050087  二代公文修改
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
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019   Kenny   [1050087]   二代公文修改
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
//1050720 Zen 1050087  二代公文修改
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
	
    //1050720 Zen 1050087  二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();			
		    //1050720 Zen 1050087  二代公文修改
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
		    //1050720 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1050720 Zen 1050087  二代公文修改
			//document.all.txType.focus();
			$('#txType').focus();
			break;
		case "btSearch":
			var strUrl = "EDI096.aspx?rtnObj=lbReturnValue+&SAMLart=" + document.all["h_Artifact"].value ;
			jf_OpenChildWin(strUrl, "EDI096", 800, 500 );
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050720 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	if ( jf_CheckKeyObject() )  // 檢查key值欄位是否輸入
	{
		if (jf_CheckBeforSave())
		{
			// 新增模式需檢查鍵值是否已存在
			if ( jf_GetActionMode()==LayoutModeNew )
			{
				if( jf_CheckDataExist("") )//檢查鍵值是否已存在
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
	}	
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	// 1020904 Eileen 1020438 畫面上顯示大寫是效果，讓類別代碼實際的值變成大寫，順便去前後空白
	document.all.txType.value = jf_Trim(document.all.txType.value.toUpperCase());
	document.all.txTypeName.value = jf_Trim(document.all.txTypeName.value);
	
	// 各欄位去前、後空白的值
	var strType = jf_Trim( document.all.txType.value ); // 類別代碼
	var strTypeName = jf_Trim(document.all.txTypeName.value); // 類別名稱
	
	if ( strTypeName == "" )
	{
		strErrMsg += "廠商送審附件類別名稱欄位不可空白\n";
	    //1050720 Zen 1050087  二代公文修改
		//document.all.txTypeName.focus();
		$('#txTypeName').focus();
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
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	var dlDept = document.all["dlDept"] ;
	var strDept = jf_Trim(document.all.lbReturnValue.options[1].value);
	var strDeptNo ;
	
	if(argCallerId == "EDI096")
	{
		document.all["txType"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		
		for (var i = 0 ; i < dlDept.options.length ; i ++ ) 
		{
			strDeptNo = (dlDept.options[i].value).split( ':' );
			if ( strDeptNo[0] == strDept )
			{
				dlDept.selectedIndex = i ;
				break;
			}
		}
		
		if(document.all["txType"].value != "" && document.all["dlDept"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	    //1050720 Zen 1050087  二代公文修改
		//document.all["txType"].focus();
		$('#txType').focus();
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
// 10201004	Eileen	檢查代碼是否有值，若有值則補足三碼；若沒有值則不做任何事
function CheckValueLength()
{
	var strTypeValue = jf_Trim( document.all.txType.value ) ;
	if ( strTypeValue != "" && strTypeValue.length < 3 )
		document.all.txType.value = jf_PADL(strTypeValue, 3, "0");
}