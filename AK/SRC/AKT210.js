/*
DATE	SA		PRG		MGR_NO		DESC
1020806	David	David	1020595		修正刪除功能BUG，畫面DataGrid配合修改
1060316	Cloud	Kevin_C	1050087		升二代1100204 Leslie  Zen     1090927     取消使用document.activeElement1110103	Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060316	Kevin_C	1050087	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060316	Kevin_C	1050087	升二代
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1100204 Zen 1090927 取消使用document.activeElement//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
	var xObjectName = event.target.id;	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題	if (IsServerHandling)	{		Page_BlockSubmit = true;		return;	}

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

//1060316	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題	if (IsServerHandling)	{		Page_BlockSubmit = true;		return;	}
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	//1060316	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;

	switch (xObjectName)
	{
		case "btOpen":
			if (jf_CheckKeyObject())
			{
				//0970509	Leslie	改為開啟後再要號
				/*if (document.all["txApplyNo"].value == "" && document.all["lbDelay"].innerText == "0")
				{
					Page_BlockSubmit = true;
					document.all["txApplyNo"].focus();
					jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["申請單號"])),"");
				}
				else*/
					Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//Page_BlockSubmit = !jf_CheckKeyObject();
			//1060316	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1060316	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btDelete":
			//1020806 David 1020595 新增刪除前檢查
			//Page_BlockSubmit = !jf_ConfirmDelete();
			Page_BlockSubmit = !ConfirmDelete();
			//1060316	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060316	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			//1060316	Kevin_C	1050087	升二代
			//document.all["txDocNo"].focus();
			$('txDocNo').focus();
			break;
		case "btSearch":
			//SAMPLE CODE
			/*
			var strUrl = "";
			xOldKey = document.all["txUserName"].value;
			strUrl = "SYM020C1.aspx?rtnObj=lbReturnValue&m=p&kv1="+xOldKey;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			jf_OpenChildWin(strUrl, "子視窗名稱", 700, 500 );
			*/
			break;
		case "btPrint":
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = true;
			//1060316	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = true;
			//1060316	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	/*
	//將lbReturnValue的資料帶入適當的欄位
	if (argCallerId == "SYM020C1")
	{
		document.all["txUserName"].value = document.all["lbReturnValue"].options[0].value;
		document.all["txUserNameTxChange"].value = document.all["txUserName"].value;
		//回傳值為鍵值時，觸動TextChange事件
		//__doPostBack();//for .NET Framework 1.0
		__doPostBack("","");//for .NET Framework 1.1
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
	*/

}

function ClientOnLoad()
{
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult)
{
    	//webserver回傳後動作
    	//檢查回傳的webserverID
    	/*//範例
    	if (argResult.id == wsGetGrpNameID)
    	{
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			document.all["txGrp_Name"].value = argResult.value.RtnField0[0];
		}
		else
		{
			document.all["txGrp_Name"].value = "";
			//1060316	Kevin_C	1050087	升二代
			//document.all["txGrp_No"].focus();
			$('txGrp_No').focus();
		}
	}
	*/
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].innerText = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
		bRtnbool = CheckBeforSave();
	return bRtnbool;
}

//儲存前key值外之欄位檢查
//檢查成功回值true
function CheckBeforSave()
{
	var bRtnbool = true;
	var strFileDate = document.all["lbEXTFILE_DATE"].innerText.replace(/[\/]/g, "");
	if(document.all.tbExtDate.value!="")
	{
	   if(parseFloat(document.all.tbExtDate.value) < parseFloat(document.all.H_lbToday.innerText))
	   {
		  bRtnbool = false;
		//1060316	Kevin_C	1050087	升二代
		  //document.all.tbExtDate.focus();
		  $('tbExtDate').focus();
		  jf_ShowMeg("預計歸檔日期不得小於系統日期","");
	   }
	   else if(document.all.tbExtDate.value == strFileDate)
	   {
			bRtnbool = false;
			//1060316	Kevin_C	1050087	升二代
			//document.all.tbExtDate.focus();
			$('tbExtDate').focus();
			jf_ShowMeg("預計歸檔日期與應歸檔日期相同，請勿重覆設定!","");
	   }
	   else if(parseFloat(document.all.tbExtDate.value) < parseFloat(strFileDate))
	   {
			bRtnbool = false;
			//1060316	Kevin_C	1050087	升二代
			//document.all.tbExtDate.focus();
			$('tbExtDate').focus();
			jf_ShowMeg("預計歸檔日期小於應歸檔日期，無需進行展期!","");
	   }
	   else
			bRtnbool = true;
	}
	//1020806 David 1020595 檢查延後歸檔原因不能為空白
	if(document.all.tbDelayDESP.value == "")
	{
		bRtnbool = false;
		jf_ShowMeg("延後歸檔原因不能為空白!","");
	}
	return bRtnbool;
}

//Client端物件OnExit事項檢查範例
/*//範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btCancel") ) return;

	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		if (document.all["txGrp_No"].value != "")
		{
			Page_BlockSubmit=true;

			arKeyName[0]    = "GRP_NO";
			arKeyValue[0]   = document.all["txGrp_No"].value;
			arRtnFldName[0] = "GRP_NAME";
			arOrdFldName[0] = "GRP_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "GRP_HEADER";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
			wsGetGrpNameID = callObj.id;
			OnWSResult(callObj);
		}
	}
}
*/
/******************************    onblur Function     *******************************************/
function CheckExtDate(argField)
{
	if((!jf_CheckCDATE(document.all[argField].value) && document.all[argField].value.length!=0))
	{
		Page_BlockSubmit = true;
		//1060316	Kevin_C	1050087	升二代
		//document.all[argField].focus();
		$(argField).focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr1),new Array(["預計歸檔日期欄位"],[""])),"");
	}
}

//常用申請理由
function ddDelayReason_onchange()
{
	var index	= document.all["ddDelayReason"].selectedIndex;
	var val		= document.all["ddDelayReason"].options[index].innerText;
	document.all["tbDelayDESP"].value += val;
	document.all["ddDelayReason"].options[0].selected = true;
	//1060316	Kevin_C	1050087	升二代
	//document.all["tbDelayDESP"].focus();
	$('tbDelayDESP').focus();
}
/******************************    onblur Function     *******************************************/

//1020806 David 1020595 新增dg選取事件處理
function dgOnCheck()
{
	var bChecked = false;
	for(var i = 2 ; i < document.all["dg1"].rows.length+1 ; i++)
	{
		if(document.all["dg1__ctl"+i+"_cbSelect"].checked)
		{
			bChecked = true;
		}

		document.all["dg1__ctl"+i+"_cbSelect"].checked = bChecked;
	}
}

//1020806 David 1020595 新增刪除前檢查
function ConfirmDelete()
{
	var bRtn = false;

	if(document.all["dg1"])
	{
		for(var i = 2 ; i < document.all["dg1"].rows.length+1 ; i++)
		{
			if(document.all["dg1__ctl"+i+"_cbSelect"].checked)
			{
				bRtn = true;
				break;
			}
		}
		
		if(!bRtn)
		{
			alert("請選取欲刪除的延後歸檔紀錄");
			return false;
		}
	}

	if(document.all.txUpdateF.value == "0")
	{
		bRtn = window.confirm('目前正在申請中的延後歸檔紀錄會一併刪除，是否繼續？')
	}

	return bRtn;
}
