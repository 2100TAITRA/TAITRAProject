/*
DATE	SA		PRG		MGR_NO		DESC
1300428	David	David	1030181		新增EDT419程式
1031112	Leslie	Kevin_C	1020726		於__doPostBack前加上IsServerHandling=true,避免重複執行
1050823 David	Zen     1050087     二代公文修改
1051019 Leslie  Kenny   1050087     二代公文修改
1060518 Leslie  Zen     1060215     innerText相關修改*/

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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1050823 Zen 1050087 二代公文修改
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
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}
	
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
		case "btAdd"://加入功能鍵
			if(jf_CheckBeforeAdd())
			{
			    Page_BlockSubmit = false;
			    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			    IsServerHandling = true;
				__doPostBack("btAdd","");
			}
			else
				Page_BlockSubmit = true;
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050823 Zen 1050087 二代公文修改
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
	
    //1050823 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
		    Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050823 Zen 1050087 二代公文修改
		    //CheckOpen();
		    CheckOpen("btOpen");
			break;
		case "btSave":
			if(jf_CheckBeforSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050823 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_CheckBeforDelete()
		    //1050823 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050823 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//1050823 Zen 1050087 二代公文修改
//function CheckOpen()
function CheckOpen(xObjectName)
{
	if(document.all["txDocNo"].value=="")
	{
		alert("請輸入公文文號")
	}
	else
	{
	    //1050823 Zen 1050087 二代公文修改
	    //jf_ToolBarSubmit();
	    jf_ToolBarSubmit(xObjectName);
	}			
}

function dlChange()
{
	if(document.all.dlAuditDoc.selectedIndex != 0)
	{	
	    //1060518 Zen 1060215 innerText相關修正	    //document.all.lbSubjectText.innerText = document.getElementById("dlAuditDoc").options[document.all.dlAuditDoc.selectedIndex].value
	    document.all.lbSubjectText.textContent = document.getElementById("dlAuditDoc").options[document.all.dlAuditDoc.selectedIndex].value
	}
}

/*加入公文文號前檢查*/
function jf_CheckBeforeAdd()
{
	var DocNo = document.getElementById("dlAuditDoc").options[document.all.dlAuditDoc.selectedIndex].text;
	var strMsg = "";
	var bChecked = true;
	if(DocNo == "")
	{
		strMsg = "請選擇公文後加入";
	}
	else if(CheckDocNoExist(DocNo))
	{
		strMsg = "文號："+DocNo+"已存在列管公文清單中，不允許再加入";
	}

	if(strMsg != "")
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strMsg]) ), "" );	
		bChecked = false;
	    //1050823 Zen 1050087 二代公文修改
		//document.all.txDocNo.focus();
		$('#txDocNo').focus();
	}

	return bChecked;
}

/*檢查文號是否已存在*/
function CheckDocNoExist(strDocNo)
{
	if (document.all.dg1.rows.length == 0)
		return false;
	if (document.all.dg1 == null)
		return false;
	for (var RowCount=2 ; RowCount < document.all.dg1.rows.length+1; RowCount++)
	{
	    //1060518 Zen 1060215 innerText相關修正	    //if (document.all["dg1__ctl" + RowCount + "_lbDocNo"].innerText == strDocNo)
	    if (document.all["dg1__ctl" + RowCount + "_lbDocNo"].textContent == strDocNo)
	        return true;
	}
	return false;
}

function jf_CheckBeforSave()
{
	var bChecked = true;
	var strMsg = "";
	if(!document.all.dg1)
	{
		alert("請至少加入一筆列管公文至清單中");
		return false;
	}
	if(document.all.dg1.rows.length == 0)
	{
		alert("請至少加入一筆列管公文至清單中");
		return false;
	}

	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		var strAuditReasonValue = jf_GetDLValue(document.all["dg1__ctl" + i + "_dlAuditReason"])
		if( strAuditReasonValue == "")
		{
			strMsg += "\n序"+(i-1)+"的解除列管原因不可為空";
		}
	}

	if(strMsg != "")
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strMsg]) ), "" );	
		bChecked = false;
	    //1050823 Zen 1050087 二代公文修改
		//document.all.txDocNo.focus();
		$('#txDocNo').focus();
	}
	return bChecked;
}

function jf_GetDLValue(argDLObj)
{
	if(argDLObj.selectedIndex == -1)
		return "";
	return argDLObj.options[argDLObj.selectedIndex].value;	
}

function jf_CheckBeforDelete()
{
	if(document.all.dg1==null)
	{
		alert("目前無資料可供刪除");
		return false
	}

	var Changed = false;

	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
			Changed = true;		
	}
	
	if(!Changed)
		alert("請至少勾選一筆");
	else
		return true;
}