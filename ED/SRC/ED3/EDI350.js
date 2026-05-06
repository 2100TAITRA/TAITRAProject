/*
DATE	SA		PRG		MSG_NO		DESC	
0960828	Stella	Cola	001540		修正WebService呼叫錯誤(ODDEPD改為ODDEP)
0960828	Stella	Cola	001543		新增讀取確認及刪除功能鍵
0981021	Stella	David	0980530	    1.寄送狀態修改為CheckBox，相關程式行為配合調整
                                    2.執行確認功能時，該筆「備註」欄位不能為空
0981222	Stella	David	0980646	    新增「刪除此筆訊息」及「刪除歷史訊息」功能鍵
1050413	David   Kenny	1050087	    二代公文系統相關修改
1051019 Leslie  Kenny   1050087     二代公文修改
1090721	David	David	1090220		調整文號OnBlur邏輯同AKI800，新增OnBlur事件
1110321	David	Joe		1101571		新增狀態寄送失敗
1131024 Joe     Jason   1130899     受文者查詢條件未正確執行
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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1050413	Kenny   [1050087]	二代公文系統相關修改
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
    //1050413	Kenny   [1050087]	取消無用code
	//jf_CallWS("../../../ODDEP/lib/WEOrgInfo.asmx","GetOrgInfo" ,false, null);
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//1131024     Jason   1130899     受文者查詢條件未正確執行--處理POSTBACK行為
	if (document.all.TextBox10.value != "")
		document.all.lbOrgName.textContent = document.all.TextBox10.value;
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
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			break;
		//1050413	Kenny   [1050087]	二代公文系統相關修改，以JQueryUI取代--Start--	
		////小月曆功能
		//case "btSDate":	
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all.txSDate , event.screenX-0, event.screenY-0);
		//	break;	
		//case "btEDate":	
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all.txEDate , event.screenX-0, event.screenY-0);
		//	break;	
		//1050413	Kenny   [1050087]	二代公文系統相關修改，以JQueryUI取代--End--	
		case "btSubjectDiv":
			if(document.all.btSubjectDiv.value == ">>")
			{
				document.all.divSubject.style.display="";
				document.all.btSubjectDiv.value = "<<";				
			}
			else
			{
				document.all.divSubject.style.display="none";
				document.all.btSubjectDiv.value = ">>";
			}
			Page_BlockSubmit=true;
			break;		
		case "Imagebutton2"://搜尋
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//var strUrl = "../../../WEDEP/WEM010C1.aspx?OrgId="+document.all.OrgNo_.value+"&K1=Dlg_Dept&Search="+escape(document.all.txORGNAME.value);//[001540]Cola 呼叫esacpe修正亂碼
			var strUrl = "../../../WEDEP/WEM010C1.aspx?OrgId="+document.all.OrgNo_.value+"&K1=Dlg_Dept&Search="+escape(document.all.txORGNAME.value);//[001540]Cola 呼叫esacpe修正亂碼

			jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			Page_BlockSubmit=true;			
			break;	
		//1050413	Kenny   [1050087]	二代公文系統相關修改，以下已不屬於toolBar改移至ClientButtonControl處理，並移除部分無用按鍵設定--Start--
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
		//1050413	Kenny   [1050087]	二代公文系統相關修改，以下已不屬於toolBar改移至ClientButtonControl處理，並移除部分無用按鍵設定--End--
		break;									
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050413	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050413	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit();
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//document.all["txKeyFld"].focus();
			$('#txKeyFld').focus();
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
			Page_BlockSubmit = !jf_checksearch();			
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);			
			break;
		case "btEmail":
			Page_BlockSubmit = !jf_checkdg();			
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);	
			break;		
		case "btTransfer":
			Page_BlockSubmit = !jf_checkdg2();			
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);	
			break;					
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_CheckPreview();
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//[001543]Cola 新增讀取確認及刪除功能鍵 -- start --
		case "btConfirm":
			Page_BlockSubmit = !Execute_Brfore_Confirm();
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;	
		case "btDeleteDoc":
			Page_BlockSubmit = true;
			if(Execute_Brfore_Delete())
			{
				var ret = window.confirm("確定要刪除嗎?");
				Page_BlockSubmit = !ret;
			}
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//Cola -- end --
		//0981222 David 0980646 新增「刪除此筆訊息」及「刪除歷史訊息」功能鍵--Start
		case "btDeleteSingleMsg":
			Page_BlockSubmit = true;
			var ret = window.confirm("確定要刪除嗎?");
			Page_BlockSubmit = !ret;
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDeleteAllMsg":
			Page_BlockSubmit = true;
			var ret = window.confirm("確定要刪除嗎?");
			Page_BlockSubmit = !ret;
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//End
		
		//1050413	Kenny   [1050087]	二代公文系統相關修改，以下已不屬於toolBar改移至ClientButtonControl處理--Start--
		//以下屬於DataGrid ToolBar
		//case "btSelectAll":
		//	Page_BlockSubmit = true;
		//	jf_SelectAll("dg1", "_cbSelect");
		//	break;
		//case "btSelectInverse":
		//	Page_BlockSubmit = true;
		//	jf_SelectInverse("dg1", "_cbSelect");
		//	break;
		//case "btSelectClear":
		//	Page_BlockSubmit = true;
		//	jf_SelectClear("dg1", "_cbSelect");
		//	break;
		//case "btDeleteSelected":
		//	Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
		//	jf_SelectBarSubmit();
		//	break;
		//case "btUp":
		//	Page_BlockSubmit = true;
		//	jf_RowUp("dg1", "_cbSelect", strTableFields);
		//	break;
		//case "btDown":
		//	Page_BlockSubmit = true;
		//	jf_RowDown("dg1", "_cbSelect", strTableFields);
		//	break;
		//1050413	Kenny   [1050087]	二代公文系統相關修改，以下已不屬於toolBar改移至ClientButtonControl處理--End--
	}
}
function jf_onblurgetorg()
{
	if (document.all.txORGNAME.value == "")
	{
		document.all.TextBox10.value = "";
		//1131024     Jason   1130899     受文者查詢條件未正確執行--更換顯示方式改用label
		document.all.lbOrgName.textContent = "";
		return;
	}

	document.all.txORGNAME.value =jf_Trim(document.all.txORGNAME.value);	
	var arWSparam = new Array(4);
	arWSparam[0] = document.all.txORGNAME.value;//全銜或正式名稱
	arWSparam[1] = document.all.OrgNo_.value;//使用者機關
	arWSparam[2] = document.all.DeptNo_.value;//使用者單位
	arWSparam[3] = document.all.UserId_.value;//使用者ID
	
    CallWsObj = jf_CallWS("../../../ODDEP/lib/WEOrgInfo.asmx","GetOrgInfo" ,false, arWSparam);
  

	if(jf_IsWebServiceSuccess(CallWsObj))
	{
		if(!CallWsObj.value.ErrorClass.IsErr)
		{
			if(CallWsObj.value.Count > 0)
			{
				if(jf_Trim(CallWsObj.value.OrgID[0]) != "" || jf_Trim(CallWsObj.value.OrgName[0]) != "")
				{
					if(CallWsObj.value.Count > 0)
					{
						document.all.TextBox10.value = jf_Trim(CallWsObj.value.OrgName[0]);
						document.all.txORGNAME.value = jf_Trim(CallWsObj.value.OrgID[0]);
						//1131024     Jason   1130899     受文者查詢條件未正確執行--更換顯示方式改用label
						document.all.lbOrgName.textContent = jf_Trim(CallWsObj.value.OrgName[0]);
					}
				}
			}
			else
			{
				//[001540]若無此機關代碼，不清空受文者欄位(直接取User輸入之受文者資料)
				//jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["無此機關代碼"]) ), "" );
				//document.all.txORGNAME.value = "";
				document.all.TextBox10.value = "";
				//document.all.txORGNAME.focus();
				//1131024     Jason   1130899     受文者查詢條件未正確執行--更換顯示方式改用label
				document.all.lbOrgName.textContent = "";
			}
		}
		else
		{
			alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
		}		
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
function jf_CheckPreview()
{
	//0981021 David 0980530 寄送狀態修改為CheckBox，檢核條件配合修改
	//if (document.all.txSDate.value == "" && document.all.txEDate.value == "" && document.all.txDocNoS.value == "" && document.all.txDocNoE.value == "" && document.all.DropDownList1.options.selectedIndex == "0")
	//1110321	Joe		1101571		新增狀態寄送失敗
	// if(document.all.txSDate.value == "" && document.all.txEDate.value == "" && document.all.txDocNoS.value == "" && document.all.txDocNoE.value == "" && document.all.cbConfirn.checked == false && 
	// document.all.cbNConfirn.checked == false && document.all.cbWSend.checked == false && document.all.cbTran.checked == false)
	if(document.all.txSDate.value == "" && document.all.txEDate.value == "" && document.all.txDocNoS.value == "" && document.all.txDocNoE.value == "" && document.all.cbConfirn.checked == false && 
	document.all.cbNConfirn.checked == false && document.all.cbWSend.checked == false && document.all.cbTran.checked == false && document.all.cbFail.checked == false)
	{
		alert('發文日期、寄送狀態、發文文號三個欄位，至少擇一輸入或勾選，以加快查詢速度');
		return false;
	}
	/*if (document.all.tx_TX_TIME.value =="" &&  document.all.txSDate.value == "" && document.all.txSDate.value == "" && document.all.DropDownList1.options.selectedIndex != "0")
	{
		alert('欲查尋之範圍過多，請增加輸入發文日期或寄送次數條件');
		return false;
	}
	if (document.all.tx_TX_TIME.value !="" &&  document.all.txSDate.value == "" && document.all.txSDate.value == "" && document.all.DropDownList1.options.selectedIndex == "0")
	{
		alert('欲查尋之範圍過多，請增加輸入發文日期或發文狀態條件');
		return false;
	}
	if (document.all.txORGNAME.value !="" &&  document.all.txSDate.value == "" && document.all.txSDate.value == "" && document.all.DropDownList1.options.selectedIndex == "0")
	{
		alert('欲查尋之範圍過多，請增加輸入發文日期或發文狀態條件');
		return false;
	}*/
	return true;//可以submit
}
//檢查dg中是否有資料且是否至少有勾選一筆資料
function jf_checkdg()
{
		if(document.all["txSearchResult"].value != "1")
		{
			alert("請先進行搜尋動作");
			return false;
		}
		var bAllOrgNotChecked = true;
		for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
		{
			if (document.all["dg1__ctl"+iRow+"_cbSelect"].checked) 
			{
				//Matte 0961210 0960197 email欄位不可為空白
				if (jf_Trim(document.all["dg1__ctl"+iRow+"_txEmail"].value) == '')
				{
					//1050413	Kenny   [1050087]	二代公文系統相關修改
					//alert("序"+document.all["dg1__ctl"+iRow+"_lbSeq"].innerText+"之公文["+document.all["dg1__ctl"+iRow+"_lbIssueNo"].innerText+"]：受文者["+document.all["dg1__ctl"+iRow+"_lbRcvUser"].innerText+"]之Email不可為空。");					
					alert("序"+document.all["dg1__ctl"+iRow+"_lbSeq"].textContent+"之公文["+document.all["dg1__ctl"+iRow+"_lbIssueNo"].textContent+"]：受文者["+document.all["dg1__ctl"+iRow+"_lbRcvUser"].textContent+"]之Email不可為空。");					
					return false;
				}
				//1050413	Kenny   [1050087]	二代公文系統相關修改
				//if (document.all["dg1__ctl"+iRow+"_lbStatus"].innerText == "已確認" || document.all["dg1__ctl"+iRow+"_lbStatus"].innerText == "轉紙本發文")
				if (document.all["dg1__ctl"+iRow+"_lbStatus"].textContent == "已確認" || document.all["dg1__ctl"+iRow+"_lbStatus"].textContent == "轉紙本發文")
				{
					//1050413	Kenny   [1050087]	二代公文系統相關修改
					//return window.confirm("序"+document.all["dg1__ctl"+iRow+"_lbSeq"].innerText+"之公文["+document.all["dg1__ctl"+iRow+"_lbIssueNo"].innerText+"]：受文者["+document.all["dg1__ctl"+iRow+"_lbRcvUser"].innerText+"]目前之發文狀態為["+document.all["dg1__ctl"+iRow+"_lbStatus"].innerText+"]，請確認是否要再次進行電子郵件發文？本次Email將不再更新寄送次數及Email狀態。");					
					return window.confirm("序"+document.all["dg1__ctl"+iRow+"_lbSeq"].textContent+"之公文["+document.all["dg1__ctl"+iRow+"_lbIssueNo"].textContent+"]：受文者["+document.all["dg1__ctl"+iRow+"_lbRcvUser"].textContent+"]目前之發文狀態為["+document.all["dg1__ctl"+iRow+"_lbStatus"].textContent+"]，請確認是否要再次進行電子郵件發文？本次Email將不再更新寄送次數及Email狀態。");					
				}
				bAllOrgNotChecked = false;
			}
		}
		if (bAllOrgNotChecked)
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["請至少勾選一筆資料進行E-Mail寄送"])),"");
			return false;
		}
		return true;
}
//檢查dg中是否有資料且是否至少有勾選一筆資料
function jf_checkdg2()
{
		if(document.all["txSearchResult"].value != "1")
		{
			alert("請先進行搜尋動作");
			return false;
		}
		var bAllOrgNotChecked = true;
		for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
		{
			if (document.all["dg1__ctl"+iRow+"_cbSelect"].checked) 
			{
				bAllOrgNotChecked = false;
			}
		}
		if (bAllOrgNotChecked)
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustMsg), new Array(["請至少勾選一筆資料進行改為紙本作業"])),"");
			return false;
		}
		return true;
}
function jf_checksearch()
{
	//0981021 David 0980530 寄送狀態修改為CheckBox，檢核條件配合修改
	//if(document.all.txSDate.value == "" && document.all.txEDate.value == "" && document.all.txDocNoS.value == "" && document.all.txDocNoE.value == "" && document.all.DropDownList1.options.selectedIndex == "0")
	//1110321	Joe		1101571		新增狀態寄送失敗
	// if(document.all.txSDate.value == "" && document.all.txEDate.value == "" && document.all.txDocNoS.value == "" && document.all.txDocNoE.value == "" && document.all.cbConfirn.checked == false && 
	// document.all.cbNConfirn.checked == false && document.all.cbWSend.checked == false && document.all.cbTran.checked == false)
	if(document.all.txSDate.value == "" && document.all.txEDate.value == "" && document.all.txDocNoS.value == "" && document.all.txDocNoE.value == "" && document.all.cbConfirn.checked == false && 
	document.all.cbNConfirn.checked == false && document.all.cbWSend.checked == false && document.all.cbTran.checked == false && document.all.cbFail.checked == false)
	{
		alert('發文日期、發文狀態、發文文號三個欄位，至少擇一輸入或勾選，以加快查詢速度');
		return false;
	}
	/*if (document.all.tx_TX_TIME.value =="" &&  document.all.txSDate.value == "" && document.all.txSDate.value == "" && document.all.DropDownList1.options.selectedIndex != "0")
	{
		alert('欲查尋之範圍過多，請增加輸入發文日期或寄送次數條件');
		return false;
	}
	if (document.all.tx_TX_TIME.value !="" &&  document.all.txSDate.value == "" && document.all.txSDate.value == "" && document.all.DropDownList1.options.selectedIndex == "0")
	{
		alert('欲查尋之範圍過多，請增加輸入發文日期或發文狀態條件');
		return false;
	}
	if (document.all.txORGNAME.value !="" &&  document.all.txSDate.value == "" && document.all.txSDate.value == "" && document.all.DropDownList1.options.selectedIndex == "0")
	{
		alert('欲查尋之範圍過多，請增加輸入發文日期或發文狀態條件');
		return false;
	}*/
	return true;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			//txInput2不可空白
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
				//1050413	Kenny   [1050087]	二代公文系統相關修改
				//jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent+"之列中,"+InValidName])),"");						
				//1050413	Kenny   [1050087]	二代公文系統相關修改
				//document.all[InValidControlName].focus();
				$('#'+InValidControlName).focus();
				return false;
			}
		}
	}
	return true;
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
	if(argCallerId == "WEM010C1")
	{

		var GrpInfo = document.all.lbReturnValue.options[0].value.split('^');
		document.all["txORGNAME"].value = GrpInfo[1];
		//1050413	Kenny   [1050087]	二代公文系統相關修改
		//document.all["txORGNAME"].focus();
		//document.all["txDocNoS"].focus();
		$('#txORGNAME').focus();
		$('#txDocNoS').focus();
//		document.all["txPRIV_NAME"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
//		document.all["txIN_USE"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
//		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
//		if(jf_Trim(document.all["txPRIV_NO"].value) != "")
//		{
//			Page_BlockSubmit=false;
//			jf_OpenButtonSubmit();
//		}
//		document.all["txPRIV_NO"].focus();
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
//[001543]Cola 新增讀取確認及刪除功能鍵 -- start --
function Execute_Brfore_Confirm()
{
	if(document.all["txSearchResult"].value != "1")
	{
		alert("請先進行搜尋動作");
		return false;
	}
	var bRtnbool = true;
	var Check = false;
	var strErrMsg= "";
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
		{
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//var DocNo = document.all["dg1__ctl" + i + "_lbIssueNo"].innerText;
			//if(document.all["dg1__ctl" + i + "_lbStatus"].innerText != "待確認")
			var DocNo = document.all["dg1__ctl" + i + "_lbIssueNo"].textContent;
			if(document.all["dg1__ctl" + i + "_lbStatus"].textContent != "待確認")
			{
				//0981021 David 0980530 增加檢核確認時備註欄位不可為空
				//strErrMsg += document.all["dg1__ctl" + i + "_lbIssueNo"].innerText+"\n";
				strErrMsg += "公文文號["+DocNo+"]之狀態不為『待確認』不允許進行讀取確認。\n";
			}
			else
			{
				//增加檢核確認時備註欄位不可為空
				if(document.all["dg1__ctl" + i + "_txDesc"].value == "")
				{
					strErrMsg += "公文文號["+DocNo+"]進行讀取確認時請於備註欄位註明原因。\n";
				}
				Check = true;
			}
		}
	}
	if(!Check)
	{
		bRtnbool = false;
		alert("請至少勾選一筆公文狀態為『待確認』");	
	}
	
	if (strErrMsg != "" && Check)
	{
		bRtnbool = false;
		//顯示提示訊息
		//alert("公文文號\n"+strErrMsg+"之狀態\n不為『待確認』\n不允許進行讀取確認");
		alert(strErrMsg);
	}
	
	return bRtnbool;
}

function Execute_Brfore_Delete()
{

	if(document.all["txSearchResult"].value != "1")
	{
		alert("請先進行搜尋動作");
		return false;
	}
	var bRtnbool = true;
	var Check = false;
	var strErrMsg= "";
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
		{
			//1050413	Kenny   [1050087]	二代公文系統相關修改
			//if(document.all["dg1__ctl" + i + "_lbStatus"].innerText != "待寄送" && document.all["dg1__ctl" + i + "_lbStatus"].innerText != "待確認")
			if(document.all["dg1__ctl" + i + "_lbStatus"].textContent != "待寄送" && document.all["dg1__ctl" + i + "_lbStatus"].textContent != "待確認")
			{
				//1050413	Kenny   [1050087]	二代公文系統相關修改
				//strErrMsg += document.all["dg1__ctl" + i + "_lbIssueNo"].innerText+"\n";
				strErrMsg += document.all["dg1__ctl" + i + "_lbIssueNo"].textContent+"\n";
			}
			else
			{
				Check = true;
			}
		}
	}
	if(!Check)
	{
		bRtnbool = false;
		alert("請至少勾選一筆公文狀態為『待寄送』或『待確認』");	
	}
	
	if (strErrMsg != "" && Check)
	{
		bRtnbool = false;
		alert("公文文號\n"+strErrMsg+"之狀態\n不為『待寄送』或『待確認』\n不允許進行刪除");
		
	}
	return bRtnbool;
}
//Cola -- end --

//1090721 David 1090220 新增文號OnBlur處理
function jf_DocNoOnBlur(argid)
{
	var obj = document.all[argid];
	if(obj.value=="")
		return;
	if (obj.id == "txDocNoS") {
		$('#txDocNoE').val(obj.value);
	}
}