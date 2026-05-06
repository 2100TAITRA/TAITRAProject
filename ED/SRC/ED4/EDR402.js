/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號		概要
 * -------------------------------------------------------------------------------------------------
 * 96.05.02	    Cola	000809      國合會- 新增"預覽展辦清單"功能鍵
 * 96.09.29		Cola	001249	    重修EDR402 - 新增展期件數明細表
 * 97.06.10		Leslie	0970550	    基港局需求(展期清單)，修改現有之件數明細表(增加申請日期、展期次數)，並將原有之系統參數"ED_EDR402_DETAIL"
 *								    取消，使程式直接可以看到三種報表
 * 1010419		ivory	1010245	    新增專案申請,特殊性案件申請之查詢 
 * 1050321	    Kenny   1050087	    二代公文系統相關修改
 * 1050830		Kenny   1050087		二代公文系統相關修改；隱藏/顯示設定
 * 1051019      Kenny   1050087     二代公文修改
 * 1061226		Justin	1061194		新增專案申請案件報表EDR402L4逐筆公文顯示
 * 1101021		Joe		1100325		修正申請類型選項切換後畫面顯示方式
 * 1140514		Andy	1140298		新增匯出EXCEL功能，切換申請類型時，反灰匯出EXCEL按鈕
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

//1050321	Kenny   [1050087]	二代公文系統相關修改
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
	//1050321   Kenny   [1050087]   取消無用Code
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	//1050321   Kenny   [1050087]   取消無用Code
	//jf_CallWS("EDR402.asmx", "GetDeptAllUsers", false, null);
	
	//alert(document.all["dlSect"].options["1"].value);
	
	//[需求單955091] 初始時先儲存下拉式選單的Text、Value、所有選項Value Charles 0951024
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_User"].value = document.all["dlUser_Text"].value;
	document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
	document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
	document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);

	//1010419	Ivory	1010245	依申請類型變更顯示欄位
	dlApplyType_onchange();
	/*
	if (document.all["H_ED_EDR402_DETAIL"].value=="Y")
	{
		document.all["DIV1"].className = "hide";
		document.all["DIV2"].className = "";
		document.all["H_TR"].className = "";
	}
	else
	{
		document.all["DIV1"].className = "";
		document.all["DIV2"].className = "hide";
		document.all["H_TR"].className = "hide";
	}
	*/

	if (document.all["AccLevel"].value == "1")
	{
		document.all["dlDept"].disabled = true;
		document.all["dlDept_Text"].disabled = true;
	
	}
	else if (document.all["AccLevel"].value == "2")
	{
		document.all["dlDept"].disabled = true;
		document.all["dlDept_Text"].disabled = true;
		document.all["dlSect"].disabled = true;
		document.all["dlSect_Text"].disabled = true;		
	
	}
	
	
	//無值不顯示
	//jf_HandleComboxStatus("dlSect");
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
		//1050321	Kenny   [1050087]	二代公文系統相關修改，以JQueryUI取代--Start--
		//case "ibRcvDateS":
		//{
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
		//	break;
		//}
		//case "ibRcvDateE":
		//{
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
		//	break;
		//}
		//case "ibTxDate":
		//{
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all.txTX_DATE, event.screenX, event.screenY);
		//	break;
		//}		
		//case "ibTxDateE":
		//{
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all.txTX_DATEE, event.screenX, event.screenY);
		//	break;
		//}
		//1050321	Kenny   [1050087]	二代公文系統相關修改，以JQueryUI取代--End--
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050321	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050321	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
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
			//1050321	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050321	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050321	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1050321	Kenny   [1050087]	二代公文系統相關修改
			//document.all["txKeyFld"].focus();
			$('#txKeyFld').focus();
			break;
		case "btSearch":
			Page_BlockSubmit = !ActBeforeSearch();
			//1050321	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;		
		//1140514	Andy	1140298	新增匯出EXCEL功能
		case "btExcel":
		case "btPrint":
		case "btPreview":
			/*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			*/
			//Page_BlockSubmit = CheckScreenValue();
			Page_BlockSubmit = !ActBeforeSearch();
			//1050321	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
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
			Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
			//1050321	Kenny   [1050087]	二代公文系統相關修改
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
		//1050321	Kenny   [1050087]	二代公文系統相關修改
		//document.all["txKeyFld"].focus();
		$('#txKeyFld').focus();
	}
	
	if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		//1050321	Kenny   [1050087]	二代公文系統相關修改
		//document.all["txRequireFld"].focus();
		$('#txRequireFld').focus();
	}
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
		
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
				//1050321	Kenny   [1050087]	二代公文系統相關修改
				//jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
				//document.all[InValidControlName].focus();
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent+"之列中,"+InValidName])),"");						
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
    if(argResult.id == iCallID_GetBTypeNo )  //由公文性質取得業務類別
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			//clear 業務類別 dlWorkType
			ClearDL(document.all.dlWorkType);
		
			//window.status  ="STEP:"+argResult.value.RtnStr;
			//alert("test RtnStr:"+argResult.value.RtnStr);
			if(argResult.value.IsErr || argResult.value.RtnStr == "")
			{
				/*document.all.dlStepName.disabled=true;
				document.all.dlStepName.options.add(new Option("","")); //第一筆空白*/

				document.all.dlWorkType.disabled=true;
				document.all.dlWorkType.options.add(new Option("","")); //第一筆空白
				
				return false;	
			}
			if(argResult.value.RtnStr != "")
			{
				document.all.dlWorkType.disabled=false;
				//document.all.dlStepName.disabled=false;
				
				var pTmpAry = argResult.value.RtnStr.split(":");
				
				//將值塞入 dlWorkType
				if(pTmpAry.length == 0)
				{
					document.all.dlWorkType.options.add(new Option("","")); //第一筆空白
					document.all.dlWorkType.selectedIndex = 0;
					//1010419	Ivory	1010245	修正業務類別搜尋條件取不到
					document.all["H_txBType"].value = "" ;					
				}
				else
				{			
					//2006.08.11 JEFF 單號950237 是否依照單位帶出業務類別		
					var pTmpAry3 = document.all.H_txUserDept.value.split(",");

					for(var i=0;i< pTmpAry.length;i++)
					{
						var pTmpAry2 = pTmpAry[i].split(",");
						//單位登記桌
						if ((document.all.H_txGetBType.value == "Y") && (pTmpAry3[0] == "N"))
						{
							if (pTmpAry2[2] == pTmpAry3[1])
							{
								var objOption = new Option(pTmpAry2[1], pTmpAry2[0]);
								document.all.dlWorkType.options.add(objOption);
							}
							else if (pTmpAry2[2] == document.all.SOURCE_ORGNO.value)
							{
								var objOption = new Option(pTmpAry2[1], pTmpAry2[0]);
								document.all.dlWorkType.options.add(objOption);
							}
						}
						else
						{
							var objOption = new Option(pTmpAry2[1], pTmpAry2[0]);
							document.all.dlWorkType.options.add(objOption);
						}
						//1010419	Ivory	1010245	修正業務類別搜尋條件取不到
						
						document.all["H_txBType"].value = pTmpAry[0].split(",")[0] ;
					}
					//2006.08.11 JEFF ---修改結束---
				
					document.all.dlWorkType.selectedIndex = 0;
				}
			}
			else
			{
				document.all.dlWorkType.options.add(new Option("","")); //第一筆空白
				document.all.dlWorkType.selectedIndex = 0;
				//1010419	Ivory	1010245	修正業務類別搜尋條件取不到				
				document.all["H_txBType"].value = "" ;
			}
			
			return true;
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
//[需求單955091] 下拉選單onblur時的檢查 Charles 0951024 ↓
function dlDept_Text_onblur()
{
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
	{
		//呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
			
			var bSubTree = true;
			if(document.all["H_OD_FLOW_TYPE"].value == "2")
				bSubTree = false;
			
			odjf_SetdlDept("dlDept","dlSect","dlUser","",false);	//初始dlSect、dlUser的處理

			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
			document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);
			
			//依選項多寡固定下拉式選單可見長度
			if(document.all["dlSect"].options.length > 10)
				document.all["dlSect"].size = 10;
			else if(document.all["dlSect"].options.length ==1)
				document.all["dlSect"].size = 2;
			else
				document.all["dlSect"].size = document.all["dlSect"].options.length;
				
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
			
			//無值不顯示
			//jf_HandleComboxStatus("dlSect");
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlSect_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
	{
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			
			odjf_SetdlSect("dlDept","dlSect","dlUser","",false);	//初始化承辦人選單
				
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
			document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);
			
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlUser_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlUser_Text"].value != document.all["H_User"].value)
	{
		//呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlUser", "承辦人"))
		{
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}
//[001249]點選查詢前將承辦資訊存入
function ActBeforeSearch()
{
	var bCheckOK = true;
	//1010419	Ivory	1010245	點選專案申請,特殊申請時 展期相關搜尋條件隱藏
	var type = document.all["dlApplyType"].value;
	//if (document.all["H_ED_EDR402_DETAIL"].value=="Y")
	if (document.all["H_ED_EDR402_DETAIL"].value=="Y" && type == "1" )
	{	
		if( document.all["txSDoc"].value == "" && document.all["txEDoc"].value == "")	//add by leslie
		{
			if(document.all["txTX_DATE"].value == "" && document.all["txTX_DATEE"].value == "" && document.all["txRcvDateS"].value == "" && document.all["txRcvDateE"].value == "" )
			{
				alert('收文日期或展期日期請擇一輸入，以加快查詢速度。');
				return false;
			}
		}
	}
	else
	{
		if( document.all["txSDoc"].value == "" && document.all["txEDoc"].value == "")
		{
			if( document.all["txRcvDateS"].value == "" && document.all["txRcvDateE"].value == "" )
			{
				alert('請輸入收文日期或公文文號，以加快查詢速度。');
				return false;
			}
		}
	}
	
	
	if (document.all["dlDept_Text"].value != "")
	{
		if(odjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);	
			
		}
		else
		{
			bCheckOK = false;	
		}
	}	
	else
	{
		document.all["H_Dept"].value = document.all["dlSect_Text"].value;
		document.all["H_Dept_Value"].value = "";
	}	
	if (document.all["dlSect_Text"].value != "")
	{	
		if(odjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
		}
		else
		{
			bCheckOK = false;	
		}
	}
	else
	{
		document.all["H_Sect"].value = document.all["dlSect_Text"].value;
		document.all["H_Sect_Value"].value = "";
	}
	
	if (document.all["dlUser_Text"].value != "")
	{	
		if(odjf_ComboBoxCheck("dlUser", "承辦人"))
		{
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
		}
		else
			bCheckOK = false;
	}
	else
	{
		document.all["H_User"].value = document.all["dlSect_Text"].value;
		document.all["H_User_Value"].value = "";
	}	
		
	return bCheckOK;
}

/**********************************************************************************************
  Name : function odjf_ComboBoxCheck()
  Desc : 離開ComboBox欄位的合理性檢查與人員欄位的連動處理		Charles 0950921
  Parm : argComboBoxID      : string 部門Combobox 物件 ID
		 argKeyMsg			: string 錯誤時顯示的ComboBox名稱
  Rtn  : none
 **********************************************************************************************/
function odjf_ComboBoxCheck(argComboBoxID, argKeyMsg)
{
	var bRtnBool = false;
	var ComboBoxObj     = document.all[argComboBoxID];
	var ComboBoxTextObj = document.all[argComboBoxID + "_Text"];
	
	var i, j;
	if (ComboBoxObj == null || ComboBoxTextObj == null)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["["+argComboBoxID+"]下拉選單不存在"])),"");
		return bRtnBool;
	}

	for( i=0 ; i<ComboBoxObj.options.length ; i++ )
	{
		if (ComboBoxTextObj.value == ComboBoxObj.options[i].text)
		{
			bRtnBool = true;
			break;
		}
	}
	
	if (!bRtnBool)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入的"+argKeyMsg+"不在選單當中"])),"");
		//1050321	Kenny   [1050087]	二代公文系統相關修改
		//ComboBoxTextObj.focus();
		$('#'+ComboBoxTextObj.id).focus();
		ComboBoxTextObj.select();
	}
	return bRtnBool;
}


//取得下拉選單物件中，與指定Text相對應的值
function odjf_GetSelectValue(argSelect, argText)
{
	var RtnValue = "";
	for(var i = 0; i < argSelect.options.length; i++)
	{
		if(argSelect.options[i].text == argText)
		{
			RtnValue = argSelect.options[i].value;
			break;
		}
	}
	return RtnValue;
}

/**********************************************************************************************
  Name : function odjf_SetdlDept()
  Desc : 承辦單位下拉式選單變動時，連動變動承辦科別及承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
	if(DeptComboBoxTextObj.value == "")
	{
		if (SectComboBoxObj != null && SectComboBoxTextObj != null)
		{
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);
			SectComboBoxObj.size = 2;
			SectComboBoxObj.options.add(new Option("",""));
			SectComboBoxTextObj.value = "";
		}
		
		if (UserComboBoxObj != null && UserComboBoxTextObj != null)
		{
			while(UserComboBoxObj.length > 0)
				UserComboBoxObj.remove(0);
			UserComboBoxObj.size = 2;
			UserComboBoxObj.options.add(new Option("",""));
			UserComboBoxTextObj.value = "";
		}
		return;
	}
	
	if (SectComboBoxObj != null && SectComboBoxTextObj != null)
	{
		//承辦科別下拉選單不為隱藏才初始
		if(SectComboBoxTextObj.className != "hide")
		{
			var val = DeptComboBoxObj.value.split(":")[0];

			callObj = jf_CallWS("EDR402.asmx", "GetSubUnit", false, val);
			
			var resultObj = null;
			if( callObj.error )
				alert(callObj.errorDetail.string);
			else
			{
				if( jf_IsWebServiceSuccess(callObj) )
					resultObj = callObj.value;
			}
			
			var SectNameMem = SectComboBoxTextObj.value;

			//清空選項
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.SecName.length;
			SectComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			SectComboBoxObj.options.add(new Option("",""));
			for( i=0 ; i<len ; i++ )
			{
				//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
				var objOption = new Option(resultObj.SecName[i], resultObj.DeptNo[i]+":"+resultObj.DeptName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SecName[i])
				SectComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			SectComboBoxTextObj.value = "";
			SectComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				if( SectNameMem == resultObj.SecName[i] || SectNameMem == resultObj.SecNo[i] )
				{
					SectComboBoxTextObj.value = resultObj.SecName[i];
					SectComboBoxObj.selectedIndex = i;
					break;
				}
			}
		}
	}

	if (UserComboBoxObj != null && UserComboBoxTextObj != null)
	{
		//承辦人下拉選單不為隱藏才初始
		if(UserComboBoxTextObj.className != "hide")
		{
			var valUser = new Array(3);
			if(SectComboBoxObj == null)
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
			else if(SectComboBoxObj.selectedIndex == -1)	//如果承辦科別有選擇就以承辦科別為單位代碼參數
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
			else
				valUser[0] = SectComboBoxObj.value.split(":")[2];
			valUser[1] = argRoleNo;
			valUser[2] = argSubTree;
			
			callObj = jf_CallWS("EDR402.asmx", "GetUnitAllUsers", false, valUser);
						
			resultObj = null;
			if( callObj.error )
				alert(callObj.errorDetail.string);
			else
			{
				if( jf_IsWebServiceSuccess(callObj) )
					resultObj = callObj.value;
			}
			
			var UserNameMem = UserComboBoxTextObj.value;

			//清空選項
			while(UserComboBoxObj.length > 0)
				UserComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.UserName.length;
			UserComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			UserComboBoxObj.options.add(new Option("",""));
			for( i=0 ; i<len ; i++ )
			{
				//項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
				var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i]+":"+resultObj.SectNo[i]+":"+resultObj.UserName[i]+":"+resultObj.EmpName[i])
				UserComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			UserComboBoxTextObj.value = "";
			UserComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				if( UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i] )
				{
					UserComboBoxTextObj.value = resultObj.EmpName[i];
					UserComboBoxObj.selectedIndex = i;
					break;
				}
			}
		}
	}
}

//將下拉選單裡的options轉成字串相加再回傳，格式： [項目Text;項目Value|項目Text;項目Value|...]
function odjf_SaveCurrDL(argSource)
{
	var strTemp = "";
	for(var i=0 ; i < argSource.options.length ; i++ )
		strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
	
	return strTemp.substr(0,strTemp.length-1);
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
		//1050321	Kenny   [1050087]	二代公文系統相關修改
		//document.all[argComboxID+"_Container"].className = "InputFieldText";
		document.all[argComboxID+"_Container"].className = "custom-combobox";
}

/**********************************************************************************************
  Name : function odjf_SetdlSect()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlSect(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	
	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
	if(DeptComboBoxTextObj.value == "")
	{
		if (SectComboBoxObj != null && SectComboBoxTextObj != null)
		{
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);
			SectComboBoxObj.size = 2;
			SectComboBoxObj.options.add(new Option("",""));
			SectComboBoxTextObj.value = "";
		}
		
		if (UserComboBoxObj != null && UserComboBoxTextObj != null)
		{
			while(UserComboBoxObj.length > 0)
				UserComboBoxObj.remove(0);
			UserComboBoxObj.size = 2;
			UserComboBoxObj.options.add(new Option("",""));
			UserComboBoxTextObj.value = "";
		}
		return;
	}
	
	if (UserComboBoxObj != null && UserComboBoxTextObj != null)
	{
		var valUser = new Array(3);
		if(SectComboBoxObj.value == "")
			valUser[0] = DeptComboBoxObj.value.split(":")[0];
		else
			valUser[0] = SectComboBoxObj.value.split(":")[2];
		valUser[1] = argRoleNo;
		valUser[2] = argSubTree;

		callObj = jf_CallWS("EDR402.asmx", "GetUnitAllUsers", false, valUser);
		//var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);
		
		resultObj = null;
		if( callObj.error )
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])),"");
		else
		{
			if( jf_IsWebServiceSuccess(callObj) )
				resultObj = callObj.value;
		}

		var UserNameMem = UserComboBoxTextObj.value;

		//清空選項
		while(UserComboBoxObj.length > 0)
			UserComboBoxObj.remove(0);

		//重新新增選項
		len = resultObj.UserName.length;
		UserComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
		UserComboBoxObj.options.add(new Option("",""));
		for( i=0 ; i<len ; i++ )
		{
			//項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
			var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i]+":"+resultObj.SectNo[i]+":"+resultObj.UserName[i]+":"+resultObj.EmpName[i])
			UserComboBoxObj.options.add(objOption);
		}

		//清空顯示的Text，以及重設選擇
		UserComboBoxTextObj.value = "";
		UserComboBoxObj.selectedIndex = -1;
		for( i=0 ; i<len ; i++ )
		{
			if( UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i] )
			{
				UserComboBoxTextObj.value = resultObj.EmpName[i];
				UserComboBoxObj.selectedIndex = i;
				break;
			}
		}
	}
}

var gCaseNoBeforeChange="";
function dlProperty_onchange()
{
	//var dlValue = document.all.dlProperty.options[document.all.dlProperty.selectedIndex].value;
	//VALUE:公文性質代碼,是否開放輸入限辦期限,是否開放選擇速別,是否以案管制
	//var dlValueArray = dlValue.split(",");
	//是否開放輸入限辦期限
	/* 2004-02-11 marked
	if(dlValueArray[1] == "1")
		SetControlEnable("txLimitDate");
	else
		SetControlDisable("txLimitDate");
	*/
	/*if(dlValueArray[0]=="8")
		document.all.btOpenEForm.disabled=false;
	else
		document.all.btOpenEForm.disabled=true;*/
	//是否開放輸入案件編號
	
	//Call Web Service 取得業務類別...
	
	GetBTypeNo();
}

function dlProperty_onblur()
{
	//ddlProperty_onchange();
}

var iCallID_GetBTypeNo = null;
//由公文性質取得業務類別
function GetBTypeNo()
{
	//InitTimeContrlFields();
	//1010419	Ivory	1010245	修正業務類別搜尋條件取不到
	document.all["H_txBType"].value = "" ;
	
	if(document.all.dlProperty.selectedIndex == -1) return;
	var dlValue = document.all.dlProperty.options[document.all.dlProperty.selectedIndex].value;
	//VALUE:公文性質代碼,是否開放輸入限辦期限,是否開放選擇速別,是否以案管制
	var dlValueArray = dlValue.split(",");
	//是否開放輸入限辦期限
	strDocProperty = dlValueArray[0];
	
	var param = new Array(4);
	var pTmpAry = document.all.H_txUserDept.value.split(",");
	param[0] = ""; //機關代碼
	param[1] = document.all.H_txGetBType.value;
	param[2] = pTmpAry[0];
	param[3] = strDocProperty; //本筆資料的Lead_time

	callObj = jf_CallWS("EDR402.asmx","GetBTypeNoByDeptNo" ,false, param);
	iCallID_GetBTypeNo = callObj.id;
	OnWSResult( callObj );
}

//將DropDownList裡的item清除
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	return;

}

function CheckScreenValue()
{
	var DocS = document.all["txSDoc"].value;
	var DocE = document.all["txEDoc"].value;
	var Dept_Index = document.all["dlDept"].selectedIndex;
	var Dept = document.all["dlDept_Text"].value;
	var Sect_Index = document.all["dlSect"].selectedIndex;
	var Sect = document.all["dlSect_Text"].value;
	var User_Index = document.all["dlUser"].selectedIndex;
	var User = document.all["dlUser_Text"].value;
	//dlProperty
	var Pro_Index = document.all["dlProperty"].selectedIndex;
	var Pro = document.all["dlProperty"].options(Pro_Index).value;
	//dlWorkType
	var Work_Index = document.all["dlWorkType"].selectedIndex;
	var Work = "";
	if(Work_Index != -1)
		Work = document.all["dlWorkType"].options(Work_Index).value;
	//txRcvDateS
	var DateS = document.all["txRcvDateS"].value;
	var DateE = document.all["txRcvDateE"].value;
	//txReborTimes
	var ReborTimes = document.all["txReborTimes"].value;
	var iReborTimes = 0;
	
	var ErrMsg = "";
	if(jf_Trim(ReborTimes) != "")
	{
		iReborTimes = parseInt(ReborTimes);
		if(iReborTimes <= 0)
		{
			ErrMsg += "展期次數不可為0\n"; 
			//1050321	Kenny   [1050087]	二代公文系統相關修改
			//document.all["txReborTimes"].focus();
			$('#txReborTimes').focus();
		}
	}
	else if(jf_Trim(ReborTimes) == "")
	{
		ErrMsg += "展期次數不可空白\n";
		//1050321	Kenny   [1050087]	二代公文系統相關修改
		//document.all["txReborTimes"].focus();
		$('#txReborTimes').focus();
	}
	
	if(jf_Trim(DocS) == "" && jf_Trim(DocE) == "")
	{
		if(jf_Trim(Dept) == "")
		{
			ErrMsg += "公文文號 或 承辦單位 需擇一輸入\n";
		}
		else
			//1050321	Kenny   [1050087]	二代公文系統相關修改
			//document.all["txSDoc"].focus();
			$('#txSDoc').focus();
	}
	
	if(ErrMsg != "")
	{
		alert(ErrMsg);
		return true;
	}
	return false;
	//alert("DocS:"+DocS+",DocE:"+DocE+",Dept:"+Dept+",Sect:"+Sect+",User:"+User+",Pro:"+Pro+",Work:"+Work+",DateS:"+DateS+",DateE:"+DateS+",ReborTimes:"+ReborTimes);
}
function CheckDate(id,str)
{
	var strDateValue ;
	strDateValue = document.all[id].value;
	if (strDateValue == "")
		return;
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all[id].value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([str])),"");
		//1050321	Kenny   [1050087]	二代公文系統相關修改
		//document.all[id].focus();
		$('#'+id).focus();
		document.all[id].value="";
	}
}

//1010419	Ivory	1010245	點選專案申請,特殊申請時 展期相關搜尋條件隱藏
function dlApplyType_onchange()
{
	var type = document.all["dlApplyType"].value;
	var strDocType = "";
	//1061226 Justin [1061194] 新增專案申請案件報表EDR402L4逐筆公文顯示
	if (type == "2")
		//1101021	Joe		1100325		修正Class應為dTR
		// document.all["H_TR3"].className = "";
		document.all["H_TR3"].className = "dTR";
	else
		document.all["H_TR3"].className = "hide";
	if( type == "2" || type == "3" )
	{
		document.all["H_TR"].className = "hide";	
		document.all["H_TR1"].className = "hide";	
		document.all["H_TR2"].className = "hide";
		document.all["rbREASON"].className = "hide";	
		document.all["rbREASON"].parentNode.className = "hide";
		document.all["DIV1"].className = "hide";
		//1050830 Kenny   [1050087] 二代公文系統相關修改；隱藏/顯示設定
		//document.all["DIV2"].className = "";
		document.all["DIV2"].className = "GridDiv";
		if(document.all["dg2"] != null)
			//1050321	Kenny   [1050087]	二代公文系統相關修改
			//document.all["dg2__ctl1_lbApplyReason"].innerText = "申請天數";	
			document.all["dg2__ctl1_lbApplyReason"].textContent = "申請天數";	
		if( type == "2" )
			strDocType = "專案管制" ;
		else
			//1100105 Kevin 1100324 調整文字
			//strDocType = "特殊案件" ;
			strDocType = "一般公文特殊案件" ;
		for( var i = 0; i < document.all["dlProperty"].length;i++ )
		{
			if( document.all["dlProperty"].options[i].text == strDocType )
			{
				document.all["dlProperty"].selectedIndex = i ;
				GetBTypeNo() ;
				break ;
			}			
		}
		document.all["dlProperty"].disabled = true;	
		//1140514	Andy	1140298	選擇非展期申請案件時，反灰匯出EXCEL按鈕
		document.all["btExcel"].disabled = true;
	}
	else
	{
		//1101021	Joe		1100325		修正Class應為dTR
		// document.all["H_TR"].className = "";	
		// document.all["H_TR1"].className = "";	
		// document.all["H_TR2"].className = "";	
		document.all["H_TR"].className = "dTR";	
		document.all["H_TR1"].className = "dTR";	
		document.all["H_TR2"].className = "dTR";	
		document.all["rbREASON"].className = "";	
		document.all["rbREASON"].parentNode.className = "InputFieldLabel";	
		document.all["H_txBType"].value = "" ;
		if (document.all["H_ED_EDR402_DETAIL"].value=="Y")
		{
			document.all["DIV1"].className = "hide";
			//1050830 Kenny   [1050087] 二代公文系統相關修改；隱藏/顯示設定
			//document.all["DIV2"].className = "";
			document.all["DIV2"].className = "GridDiv";
			document.all["H_TR"].className = "";
		}
		else
		{
			//1050830 Kenny   [1050087] 二代公文系統相關修改；隱藏/顯示設定
			//document.all["DIV1"].className = "";
			document.all["DIV1"].className = "GridDiv";
			document.all["DIV2"].className = "hide";
			document.all["H_TR"].className = "hide";
		}
		if(document.all["dg2"] != null)		
			//1050321	Kenny   [1050087]	二代公文系統相關修改
			//document.all["dg2__ctl1_lbApplyReason"].innerText = "申請理由";		
			document.all["dg2__ctl1_lbApplyReason"].textContent = "申請理由";		
		document.all["dlProperty"].disabled = false;								
		//1140514	Andy	1140298	選擇非展期申請案件時，反灰匯出EXCEL按鈕
		document.all["btExcel"].disabled = false;
	}

}
function dlWorkType_onchange()
{
	document.all["H_txBType"].value = document.all["dlWorkType"].options[document.all["dlWorkType"].selectedIndex].value ;
}