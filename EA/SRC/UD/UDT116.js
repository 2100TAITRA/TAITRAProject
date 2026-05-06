/*
 * DATE		PRG		MGR_NO		DESC
 * 1060523	Justin	1060400     二代公文修改
 * 1110103	Zen     1101292     修正多次點擊重複PostBack之問題
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

//指定DataGrid欄位
var strTableFields = new Array("_lbWorkType","_lbItemNo","_lbSignType","_lbDept","_lbMedia","_lbMark");
//1060523 Justin [1060400] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060523 Justin [1060400] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060523 Justin [1060400] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btAdd":
		    Page_BlockSubmit = !jf_ConfirmAdd("txItemNo");
		    //1060523  Justin [1060400] 二代公文修改:加入IsServerHandling設定及__doPostBack功能
		    IsServerHandling = true;
		    __doPostBack("btAdd", "");
			break;
		case "btAddBatch":
			if(document.all["lboxItemNo"].options.length > 0)
			{
				var ret = window.confirm("使用[帶出待點收]會先清空下方資料，建議先點收目前資料再繼續，\n請確認是否要繼續?");
				if(!ret)
					Page_BlockSubmit = true;
				//1000930 Davy 應檔管局要求，提供不選單位，撈出所有待點收功能，取消判斷是否有選承辦單位
				//else
				//	Page_BlockSubmit = !jf_ConfirmAdd("dlDept_Text");
			}
		    //1060523  Justin [1060400] 二代公文修改:加入IsServerHandling設定及__doPostBack功能
			IsServerHandling = true;
			__doPostBack("btAddBatch", "");
			break;
		case "btChange":
		    Page_BlockSubmit = !jf_ConfirmChange();
		    //1060523  Justin [1060400] 二代公文修改:加入IsServerHandling設定及__doPostBack功能
		    IsServerHandling = true;
		    __doPostBack("btChange", "");
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060523 Justin [1060400] 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1060523 Justin [1060400] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1060523 Justin [1060400] 二代公文修改 
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
		    //1060523 Justin [1060400] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			jf_ConfirmClean(true);
			//document.all["txItemNo"].focus();
			Page_BlockSubmit = false;
		    //1060523 Justin [1060400] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
			/*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			*/
			break;
		
		//以下屬於DataGrid ToolBar
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
		case "btDeleteSelected":
			//Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
		    Page_BlockSubmit = false;
		    //1060523 Justin [1060400] 二代公文修改 
		    //jf_SelectBarSubmit();
		    jf_SelectBarSubmit(xObjectName);
			break;
		case "btUp":
			Page_BlockSubmit = true;
			jf_RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			jf_RowDown("dg1", "_cbSelect", strTableFields);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
function jf_ConfirmAdd(objTextBox)
{
	var bRtnbool = true;
	var strErrMsg= "";

	if (document.all[objTextBox].value == "")
	{
		if(objTextBox == "txItemNo")
			strErrMsg += "請輸入媒體編號";
		else
		    strErrMsg += "請選擇承辦單位";
	    //1060523 Justin [1060400] 二代公文修改
		//document.all[objTextBox].focus();
		$('#' + objTextBox).focus();
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	if (bRtnbool)
		bRtnbool = jf_ConfirmChange();
		
	return bRtnbool;
}

function jf_ConfirmChange()
{
	var bRtnbool = true;
	var strErrMsg= "";

	if(document.all.rbRejectDoc.checked)
	{
		if (document.all["dlReject"].value == "")
		{
		    strErrMsg += "請選擇退件原因";
		    //1060523 Justin [1060400] 二代公文修改
		    //document.all["dlReject"].focus();
		    $('#dlReject').focus();
		}
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}

	return bRtnbool;
}

//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;

	if(document.all["lboxItemNo"].options.length == 0)
	{
		alert("您尚未輸入點收資料");
	}
	else
		bRtnbool = true;

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
//1000821 Davy 調整檢核邏輯
function jf_DeptCheck(argDeptComboBoxID)
{
	/*** 離開欄位時檢查代碼或名稱是否存在 ***/
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];

	if(DeptComboBoxTextObj.value == "")
		return;

	var i, j, len;
	var checkOK = false;
	for( i=0 ; i<DeptComboBoxObj.options.length ; i++ )
	{
		if( checkOK ) break;
		var arr = DeptComboBoxObj.options[i].value.split(":");
		for(j=3 ; j>=0 ; j--)
		{
			if( arr[j] == DeptComboBoxTextObj.value)
			{
				checkOK = true;
				DeptComboBoxObj.selectedIndex = i;
				DeptComboBoxTextObj.value = DeptComboBoxObj.options[i].value.split(":")[1];
				break;
			}
		}
	}
	if( !checkOK )
	{
		DeptComboBoxTextObj.value = "";
		return;
	}
	/*** END ***/
}

function jf_dlRejectOnChange()
{
	if (document.all["dlReject"].value == "")
	{
		document.all.rbAcceptDoc.checked = true;
		document.all.rbRejectDoc.checked = false;
	}
	else
	{
		document.all.rbAcceptDoc.checked = false;
		document.all.rbRejectDoc.checked = true;
	}
}