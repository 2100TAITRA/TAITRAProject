/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2007.04.09
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 95.12.05		David	951268	達公文長度自動帶出公文基資、內容微調
 * 95.12.13		David	951103	漁業署新增 
 * 96.03.12		David	951270	附件抽存明細、格式錯誤訊息提示
 * 96.03.25		Andy	000303	考量修改模式下不應重新帶出公文基資,故按該按鈕及onblur皆不處理
 * 96.04.04		Andy	000301	只限定不可超過最大長度，小於則可允許
 * 96.05.08     Leo     000903  按下儲存時出現nChkSave.value是null
 * 96.12.12		Leo		951270  若勾選歸檔時不檢核預計歸檔日期
 * 103.11.12   	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 106.03.17	Kevin_C	1050087	升二代
 * 1100204      Zen     1090927 取消使用document.activeElement
 * 112.0.20     Cloud   1111459 修正儲存前檢核異常問題
 * 1131213		Cloud	1130983	啟用附件不歸檔註記時，如附件已歸檔，不檢核需有預計歸檔日期
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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

//1060317	Kevin_C	1050087	升二代 -S
//if(document.all.tbTool)
	//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
	//document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//1060317	Kevin_C	1050087	升二代 -E
	
InitObj();

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060317	Kevin_C	1050087	升二代
	//jf_CallWS("../../../STDN/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); 使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//1060317	Kevin_C	1050087	升二代
	//jf_CallWS("EAR151W.asmx", "checkDOC_LEN", false, null); //使用WebService前必須先呼叫一次
	//1060117	Kevin_C	1050087	升二代，為避免小日曆不顯示，將SERVER端小日曆欄位是否設為ReadOnly移至此處判斷
	for(var i=2;i<document.all.dg1.rows.length+1;i++)
	{
		if(document.all["dg1__ctl" + i + "_cb1"].checked == false)
		{
			document.all["dg1__ctl" + i + "_txFDate"].className = "DisplayOnly";
			document.all["dg1__ctl" + i + "_txFDate"].readOnly = true;
		}
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100204 Zen 1090927 取消使用document.activeElement
//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement
    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;
	
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
		//1060317	Kevin_C	1050087	升二代 -S
		// case "btExtfileDate":
		// {
			// Page_BlockSubmit=true;
			// jf_CallCalendar(document.all.txExtfileDate, event.screenX, event.screenY);
			// break;
		// }
		// case "btFileDate":
		// {
			// Page_BlockSubmit=true;
			// jf_CallCalendar(document.all.txFileDate, event.screenX, event.screenY);
			// break;
		// }
		//1060317	Kevin_C	1050087	升二代 -E
		case "btCheckDocNo":
		{
			//考量修改模式下不應重新帶出公文基資 #2007.03.25 Andy
			if(document.all["TemplateMode"].value == "1")
			{
				Page_BlockSubmit=true;
				return;
			}

			Page_BlockSubmit = false;
		    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			IsServerHandling = true;
			__doPostBack("btCheckDocNo","");
		}
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060317	Kevin_C	1050087	升二代
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
	
	//1060317	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if(document.all["txDocNo"].value == "")
			{
				alert("公文文號欄位不可空白");
				Page_BlockSubmit = true;
			}
			else
			{
				Page_BlockSubmit = false;
			}
			//1060317	Kevin_C	1050087	升二代
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
			//1060317	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060317	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060317	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1060317	Kevin_C	1050087	升二代
			//document.all["txDocNo"].focus();
			$('txDocNo').focus();
			break;
		case "btSearch":
			var strUrl = "EAR151.aspx?rtnObj=lbReturnValue&txHiddenBox=" + "123";
			var strKeyCol = jf_Trim(document.all["txDocNo"].value);
			jf_OpenChildWin(strUrl, "EAT150", 700, 500 );
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1060317	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1060317	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
		//以下屬於DataGrid ToolBar
		//1060317	Kevin_C	1050087	升二代 -S
		// case "btSelectAll":
			// Page_BlockSubmit = true;
			// jf_SelectAll("dg1", "_cbSelect");
			// break;
		// case "btSelectInverse":
			// Page_BlockSubmit = true;
			// jf_SelectInverse("dg1", "_cbSelect");
			// break;
		// case "btSelectClear":
			// Page_BlockSubmit = true;
			// jf_SelectClear("dg1", "_cbSelect");
			// break;
		// case "btDeleteSelected":
			// Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
			// jf_SelectBarSubmit();
			// break;
		// case "btUp":
			// Page_BlockSubmit = true;
			// jf_RowUp("dg1", "_cbSelect", strTableFields);
			// break;
		// case "btDown":
			// Page_BlockSubmit = true;
			// jf_RowDown("dg1", "_cbSelect", strTableFields);
			// break;
		//1060317	Kevin_C	1050087	升二代 -E
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
	var ErrMsgCount = 0;
	var DocLen = document.all.txHiddenTemp.value;
	
	if (document.all["txDocNo"].value == "")
	{
		ErrMsgCount++;
		strErrMsg += ErrMsgCount + ".公文文號欄位不可空白\n";
		//1060317	Kevin_C	1050087	升二代
		//document.all["txDocNo"].focus();
		$('txDocNo').focus();
	}
	
	//if (document.all.txDocNo.value.length < DocLen || document.all.txDocNo.value.length > DocLen)
	if (document.all.txDocNo.value.length > DocLen) //只限定不可超過最大長度，小於則可允許 #2007.04.04 Andy
	{
		ErrMsgCount++;
		strErrMsg += ErrMsgCount + ".公文文號長度不正確,應為"+DocLen+"碼\n";
		//1060317	Kevin_C	1050087	升二代
		//document.all["txDocNo"].focus();
		$('txDocNo').focus();
	}
	
	if (document.all["txFromSubject"].value == "" && document.all["txDeptName"].value == "" && document.all["txEmpName"].value == "")
	{
		ErrMsgCount++;
		strErrMsg += ErrMsgCount + ".請使用帶出公文基資按鈕,帶出公文資訊\n";
		//1060317	Kevin_C	1050087	升二代
		//document.all["btCheckDocNo"].focus();
		$('btCheckDocNo').focus();
	}

/*	
	var tempExtfileDate = "";
	tempExtfileDate = jf_PADL(document.all.txExtfileDate.value,7,0);
		
	if (!jf_CheckCDATE(tempExtfileDate))
	{
		if (document.all.txExtfileDate.value != "")
		{
			strErrMsg += ErrMsgCount + ".預計歸檔日期格式不正確\n";
			document.all["txExtfileDate"].focus();
		}
	}
	else
		document.all.txExtfileDate.value = tempExtfileDate;
	
	if (document.all["txExtfileDate"].value == "")
	{
		ErrMsgCount++;
		strErrMsg += ErrMsgCount + ".預計歸檔日期不可空白\n";
		document.all["txExtfileDate"].focus();
	}
	
	if (document.all["txExtfileDate"].value <= document.all["txCloseDate"].value)
	{
		if (document.all["txExtfileDate"].value != "")
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount + ".預計歸檔日期 不可小於 結案日期\n";
			document.all["txExtfileDate"].focus();
		}
	}
	
	if (document.all["txFileDate"].value < document.all["txCloseDate"].value)
	{
		if (document.all.txFileDate.value != "")
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount + ".實際歸檔日期 不可小於 結案日期\n";
			document.all["txExtfileDate"].focus();
		}
	}
*/
	//95.09.27 David
	/*
	if(document.all.cbDesFlag.checked == false)
	{
		if(document.all.txFileDate.value == "")
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount + ".實際歸檔日期不可空白\n";
			document.all["txFileDate"].focus();
		}
	}
	
	//95.12.29 951269 David
	if(!CallPadFunc2("txFileDate",7))
	{
		ErrMsgCount++;
		strErrMsg += ErrMsgCount+".輸入日期格式不正確，請檢查\n";
	}
	else if(!CallPadFunc2("txExtfileDate",7))
	{
		ErrMsgCount++;
		strErrMsg += ErrMsgCount+".輸入日期格式不正確，請檢查\n";
	}
	*/
	if (document.all["nChkSave"].value=="False")
	{
		ErrMsgCount++;
		strErrMsg += ErrMsgCount + ".本件公文無附件可進行附件抽存歸檔註記!\n";
		

	}
	else if(document.all["dg1"])
	{
		//95.12.28 951269 David 檢核DG中日期格式
		var DgLength = document.all.dg1.rows.length;
		var ErrCount = 0;
		
		//96.03.12 951270 David
		var ErrItem = "";
		
		for(var i=2;i<DgLength+1;i++)
		{
			if(!CallPadFunc2("dg1__ctl"+i+"_txFDate",7))
			{
				ErrCount++;
				
				//96.03.12 951270 David
				ErrItem = "歸檔日期";
				
				break;
			}
			if(!CallPadFunc2("dg1__ctl"+i+"_txDgExtFileDate",7))
			{
				ErrCount++;
				
				//96.03.12 951270 David
				ErrItem = "預計歸檔日期";
				
				break;
			}
		}
		if(ErrCount != 0)
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount+"."+ErrItem+"格式不正確，請檢查\n";
		}
		
		var ExtDateErr = 0;
		var FileDateErr = 0;
		var DgLength = document.all.dg1.rows.length;
		for(var j=2;j<DgLength+1;j++)
		{
			if(jf_Trim(document.all["dg1__ctl"+j+"_txDgExtFileDate"].value)=="" && !document.all["dg1__ctl"+j+"_cb1"].checked && !document.all["dg1__ctl"+j+"_cb2"].checked)//0961212 Leo 951270 若勾選歸檔時不檢核預計歸檔日期
			{
				//* 1131213		Cloud	1130983	啟用附件不歸檔註記時，如附件已歸檔，不檢核需有預計歸檔日期
				if (document.all["uEnbAttnote"] && document.all["uEnbAttnote"].value == "Y" && document.all["dg1__ctl" + j + "_lbIsend"].textContent == "已歸檔")
					continue;

				ExtDateErr++;
				//1060317	Kevin_C	1050087	升二代
			    //document.all["dg1__ctl"+j+"_txDgExtFileDate"].focus();
				//* 112.0.20     Cloud   1111459 修正儲存前檢核異常問題
			    //$('dg1__ctl"+j+"_txDgExtFileDate').focus();
				$("dg1__ctl" + j + "_txDgExtFileDate").focus();
				break;
			}			
			else if(document.all["dg1__ctl"+j+"_cb1"].checked)
			{
				if(jf_Trim(document.all["dg1__ctl"+j+"_txFDate"].value)=="")
				{
					FileDateErr++;
					//1060317	Kevin_C	1050087	升二代
				    //document.all["dg1__ctl"+j+"_txFDate"].focus();
				    //* 112.0.20     Cloud   1111459 修正儲存前檢核異常問題
				    //$('dg1__ctl"+j+"_txFDate').focus();
				    $("dg1__ctl"+j+"_txFDate").focus();
					break;
				}
			}
		}
		
		if(ExtDateErr != 0)
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount+".附件預計歸檔日期不可空白";
		}
		else if(FileDateErr != 0)
		{
			ErrMsgCount++;
			strErrMsg += ErrMsgCount+".附件歸檔日期不可空白";
		}
	}
	else
		strErrMsg += "請先加入資料";
	

	
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
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
				//1060317	Kevin_C	1050087	升二代
				//document.all[InValidControlName].focus();
				$(InValidControlName).focus();
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
	if(argCallerId == "EAR151")
	{
		document.all["txDocNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txDocNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		//1060317	Kevin_C	1050087	升二代
		//document.all["txDocNo"].focus();
		$('txDocNo').focus();
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
function StatusChange()
{/*
	if(document.all.cbDesFlag.checked == true)
	{
		document.all.txFileDate.value = "";
		document.all.txFileDate.readOnly = true;
		document.all.btFileDate.disabled = true;
		document.all.txFileDate.className = "displayOnly";
		//document.all.btFileDate.style.display = "none";		//這個也可以達成隱藏的目的
	}
	else
	{
		document.all.txFileDate.readOnly = false;
		document.all.btFileDate.disabled = false;
		document.all.txFileDate.className = "";
	}
	*/
}

function ChecktxFileDate()
{
	if (!jf_CheckCDATE(document.all.txFileDate.value))
	{
		if (document.all.txFileDate.value != "")
		{
			alert("實際歸檔日期格式不正確");
			//1060317	Kevin_C	1050087	升二代
			//document.all.txFileDate.focus();
			$('txFileDate').focus();
		}
	}
}

function ChecktxExtfileDate()
{
	if (!jf_CheckCDATE(document.all.txExtfileDate.value))
	{
		if (document.all.txExtfileDate.value != "")
		{
			alert("預計歸檔日期格式不正確");
			//1060317	Kevin_C	1050087	升二代
			//document.all["txExtfileDate"].focus();
			$('txExtfileDate').focus();
		}
	}
}

function CheckDocNo()
{
	if(document.all["txDocNo"].value == "")
	{
		alert("公文文號欄位不可空白");
		Page_BlockSubmit = true;
	}
	else
	{
		Page_BlockSubmit = false;
	}
}

//95.09.27 David
function InitObj()
{	
}

//95.12.05 951268 David
function BringInfo()
{
	//考量修改模式下不應重新帶出公文基資 #2007.03.25 Andy
	if(jf_Trim(document.all["txDocNo"].value) != "" && document.all["TemplateMode"].value == "0")
	{
		if(jf_Trim(document.all["txFromSubject"].value) != "" || 
			jf_Trim(document.all["txDeptName"].value) != "" ||
			jf_Trim(document.all["txEmpName"].value) != "" ||
			jf_Trim(document.all["txTxDesc"].value) != "" ||
			jf_Trim(document.all["txCloseDate"].value) != "")
		{
			if(window.confirm("畫面中已有資料，確定取代目前資料嗎"))
			{
				document.all["txFromSubject"].value = "";
				document.all["txDeptName"].value = "";
				document.all["txEmpName"].value = "";
				document.all["txTxDesc"].value = "";
				document.all["txCloseDate"].value = "";
				document.all["cbDesFlag"].checked = false;
				ClientButtonControl("btCheckDocNo");
			}
			else
				//1060317	Kevin_C	1050087	升二代
				//document.all["txDocNo"].focus();
				$('txDocNo').focus();
		}
		else
			ClientButtonControl("btCheckDocNo");
	}
}
//95.12.28 951269 David
//歸檔勾選控制
function JudgueFileDate(argId,Index,argDg)
{
	var Checked = document.all["dg1__ctl" + Index + "_cb1"].checked;
	if(Checked)
	{
		//1060317	Kevin_C	1050087	升二代
		//document.all["dg1__ctl" + Index + "_txFDate"].className = "";
		document.all["dg1__ctl" + Index + "_txFDate"].className = "DatePicker";
		document.all["dg1__ctl" + Index + "_txFDate"].readOnly = false;
		//若先前已有歸檔日期，則帶出先前歸檔日期
		if(jf_Trim(document.all["dg1__ctl"+Index+"_H_txFDate"].value) != "")
			document.all["dg1__ctl" + Index + "_txFDate"].value = document.all["dg1__ctl"+Index+"_H_txFDate"].value;
		else //若沒有則帶出今天日期
		    document.all["dg1__ctl" + Index + "_txFDate"].value = GetToady();
		document.all["dg1__ctl" + Index + "_cb2"].checked = false;
	}
	else
	{
		//1060317	Kevin_C	1050087	升二代
		//document.all["dg1__ctl" + Index + "_txFDate"].className = "displayOnly";
		document.all["dg1__ctl" + Index + "_txFDate"].className = "DisplayOnly";
		document.all["dg1__ctl" + Index + "_txFDate"].readOnly = true;
		document.all["dg1__ctl" + Index + "_txFDate"].value = "";
	}
}

//遺失勾選控制
function JudgueFileLost(argId,Index,argDg)
{
	var Checked = document.all["dg1__ctl" + Index + "_cb2"].checked;
	if(Checked)
	{
		//1060317	Kevin_C	1050087	升二代
		//document.all["dg1__ctl" + Index + "_txFDate"].className = "displayOnly";
		document.all["dg1__ctl" + Index + "_txFDate"].className = "DisplayOnly";
		/*document.all["dg1__ctl" + Index + "_txFDate"].readOnly = true;
		document.all["dg1__ctl" + Index + "_txFDate"].value = "";*/
		document.all["dg1__ctl" + Index + "_cb1"].checked = false;
	}
	else
	{
		//1060317	Kevin_C	1050087	升二代
		//document.all["dg1__ctl" + Index + "_txFDate"].className = "";
		document.all["dg1__ctl" + Index + "_txFDate"].className = "DatePicker";
		/*document.all["dg1__ctl" + Index + "_txFDate"].readOnly = false;
		document.all["dg1__ctl" + Index + "_txFDate"].value = "";*/
		//document.all["dg1__ctl" + Index + "_cb1"].checked = false;
	}
	JudgueFileDate(argId,Index,argDg);
}

//95.12.28 951269 David
//補0
function CallPadFunc(strObjName,argCount)
{		
	if(document.all[strObjName].value != "")				
		document.all[strObjName].value = jf_PADL(document.all[strObjName].value,argCount,"0");			
	if(!jf_CheckCDATE(document.all[strObjName].value) &&jf_Trim(document.all[strObjName].value) != "")
	{
		alert("輸入日期格式不正確，請檢查");
		document.all[strObjName].value = "";
		//1060317	Kevin_C	1050087	升二代
		//document.all[strObjName].focus();
		$(strObjName).focus();
	}
}
//95.12.28 951269 David
function CallPadFunc2(strObjName,argCount)
{		
	if(document.all[strObjName].value != "")				
		document.all[strObjName].value = jf_PADL(document.all[strObjName].value,argCount,"0");			
	if(!jf_CheckCDATE(document.all[strObjName].value) &&jf_Trim(document.all[strObjName].value) != "")
	{
		//document.all[strObjName].value = "";
		//1060317	Kevin_C	1050087	升二代
		//document.all[strObjName].focus();			
		$(strObjName).focus();			
		return false;
	}
	return true;
}
//1060317	Kevin_C	1050087	升二代 -S
// function DgDateButton(id,index)
// {
	// var TargetId;
	// switch(id)
	// {
		// case "ib1":
			// TargetId = "txFDate";
			// break;
		// case "ib2":
			// TargetId = "txDgExtFileDate";
			// break;
	// }
	
	// Page_BlockSubmit=true;
	// if(document.all["dg1__ctl"+index+"_"+TargetId].className != "displayOnly")
	// {
		// jf_CallCalendar(document.all.txTempDate, event.screenX, event.screenY);
		// var Date = document.all.txTempDate.value;
		// document.all["dg1__ctl"+index+"_"+TargetId].value = Date;
	// }
// }
//1060317	Kevin_C	1050087	升二代 -E
function GetToady()
{
	theDate = new Date();
	var strYear  = theDate.getFullYear();
	var strMonth = new String(theDate.getMonth()+1);
	var strDate  = new String(theDate.getDate());

	strYear = new String(strYear - 1911);
	if (strYear.length <= 2 )
		strYear = "0" + strYear;
	if (strMonth.length == 1 )
		strMonth = "0" + strMonth;
	if (strDate.length == 1 )
		strDate = "0" + strDate; 
		
	return strYear + strMonth + strDate ;
}
