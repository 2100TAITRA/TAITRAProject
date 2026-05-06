/*
DATE	SA	    PRG	    MGR_NO	DESC
0980820	Stella	David	0980391	查詢條件及產出報表支援二層級架構
1050322	--      Kenny	1050087	二代公文系統相關修改
1051019 Leslie  Kenny   1050087 二代公文修改
1100609	Cloud	Joe		1100633	新增改分日期條件、匯出Excel功能
1140512 Cloud   Daniel  1140255 新增退輔會專屬功能，明細表與統計表
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

//1050322	Kenny   [1050087]	二代公文系統相關修改
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
	//1050322	Kenny   [1050087]	取消無用code
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	//0980820	David	0980391	二級單位欄位初始
	dlOnChange("dl_Old_Dept","dl_Old_Sect");
	dlOnChange("dl_New_Dept","dl_New_Sect");
	SetIndex();
	//1140523	Daniel	1140255	清空承辦單位選項，RadioButton選項連動處理
	document.getElementById("dl_New_Dept").value = "";//由於不明原因在設定原承辦單位預設值時，會一起設定到承辦單位欄位，因此決定在OnLoad時清空該欄位中的預設值。
	let rbSummary= document.getElementById("rbSummary");
	if (rbSummary.checked) {
		document.getElementById('rbPaginated').disabled = true;
    }
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
		//1050322	Kenny   [1050087]	二代公文系統相關修改，以JQueryUI取代--Start--
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
		//1050322	Kenny   [1050087]	二代公文系統相關修改，以JQueryUI取代--End--
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050322	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050322	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			//Page_BlockSubmit = !jf_CheckKeyObject();
			AutoBringOut();
			Page_BlockSubmit = true;
			if(!CheckBeforeSearch())
				Page_BlockSubmit = false;
				
			//Page_BlockSubmit = CheckBeforeSearch();
			//1050322	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050322	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1050322	Kenny   [1050087]	二代公文系統相關修改
			//document.all["txKeyFld"].focus();
			$('#txKeyFld').focus();
			break;		
		case "btPrint":
			Page_BlockSubmit = CheckBeforeSearch();
			//1050322	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = CheckBeforeSearch();
			//1050322	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1100609	Joe		1100633		新增匯出Excel功能
		case "btExcel":
		//1140512	Daniel		1140255		新增匯出ODS功能
		case "btOds":
			Page_BlockSubmit = CheckBeforeSearch();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
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
				//1050322	Kenny   [1050087]	二代公文系統相關修改
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

function AutoBringOut()
{
	var txRcvDateS = jf_Trim(document.all["txRcvDateS"].value);
	var txRcvDateE = jf_Trim(document.all["txRcvDateE"].value);
	var ErrMsg = "";
	if(txRcvDateS == "" && txRcvDateE != "")
	{
		document.all["txRcvDateS"].value = document.all["txRcvDateE"].value;
		document.all["txRcvDateE"].value = "";
	}
}

function CallPadFunc(strObjName,argCount)
{
	switch(strObjName)
	{		
		case "txRcvDateS":
		case "txRcvDateE":
			//1100609	Joe		1090633		新增改分日期檢核
		case "txChgDateS":
		case "txChgDateE":
			if(document.all[strObjName].value != "")
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,argCount,"0");
			break;
	}
	
	if (strObjName == "txRcvDateS" || strObjName == "txRcvDateE" || strObjName == "txChgDateS" || strObjName == "txChgDateE")
	{
		if(!jf_CheckCDATE(document.all[strObjName].value) && jf_Trim(document.all[strObjName].value) != "")
		{
			//1100609	Joe		1090633		新增改分日期檢核--S
			//alert("輸入日期格式不正確，請檢查");
			switch(strObjName)
			{		
				case "txRcvDateS":
					$('#txRcvDateS').focus();
					alert('收(創)文日期(起)格式不正確，請檢查');
					break;
				case "txRcvDateE":
					$('#txRcvDateE').focus();
					alert('收(創)文日期(迄)格式不正確，請檢查');
					break;
				case "txChgDateS":
					$('#txChgDateS').focus();
					alert('改分日期(起)格式不正確，請檢查');
					break;
				case "txChgDateE":
					$('#txChgDateE').focus();
					alert('改分日期(迄)格式不正確，請檢查');
					break;
			}
			//1100609	Joe		1090633		新增改分日期檢核--E
			document.all[strObjName].value = "";
			//document.all[strObjName].focus();
			return false;
		}
	}
	return true;
}

function CheckBeforeSearch()
{
	KeepSectSelected();//0980820	David	0980391	紀錄二級單位SelectIndex
	
	var NotEmpty = false;
	var ReturnValue = true;
	
	if(jf_Trim(document.all["txRcvDateS"].value) != "")
		NotEmpty = true;
	if(jf_Trim(document.all["txRcvDateE"].value) != "")
		NotEmpty = true;
	if(document.all["dl_Old_Dept"].selectedIndex != "0" )
		NotEmpty = true;
	if(document.all["dl_New_Dept"].selectedIndex != "0" )
		NotEmpty = true;
	
	if(document.all["txRcvDateS"].value != "")
		document.all["txRcvDateS"].value = jf_PADL(document.all["txRcvDateS"].value,7,"0");
		
	if(document.all["txRcvDateE"].value != "")
		document.all["txRcvDateE"].value = jf_PADL(document.all["txRcvDateE"].value,7,"0");
		
	var ErrMsg = "";
	if(!jf_CheckCDATE(document.all["txRcvDateS"].value) && jf_Trim(document.all["txRcvDateS"].value) != "")
	{
		//1100609	Joe		1100633		調整錯誤說明、focus
		// ErrMsg = "輸入日期格式不正確，請檢查";
		$('#txRcvDateS').focus();
		ErrMsg = "收(創)文日期(起)格式不正確，請檢查";
		document.all["txRcvDateS"].value = "";
	}
	else if(!jf_CheckCDATE(document.all["txRcvDateE"].value) && jf_Trim(document.all["txRcvDateE"].value) != "")
	{
		//1100609	Joe		1100633		調整錯誤說明、focus
		// ErrMsg = "輸入日期格式不正確，請檢查";
		$('#txRcvDateE').focus();
		ErrMsg = "收(創)文日期(迄)格式不正確，請檢查";
		document.all["txRcvDateE"].value = "";
	}	
	
	//1100609	Joe		1100633		新增改分日期條件--S
	if(jf_Trim(document.all["txChgDateS"].value) != "")
		NotEmpty = true;
	if(jf_Trim(document.all["txChgDateE"].value) != "")
		NotEmpty = true;
	
	if(document.all["txChgDateS"].value != "")
		document.all["txChgDateS"].value = jf_PADL(document.all["txChgDateS"].value,7,"0");
		
	if(document.all["txChgDateE"].value != "")
		document.all["txChgDateE"].value = jf_PADL(document.all["txChgDateE"].value,7,"0");
		
	if(!jf_CheckCDATE(document.all["txChgDateS"].value) && jf_Trim(document.all["txChgDateS"].value) != "")
	{
		$('#txChgDateS').focus();
		ErrMsg = "改分日期(起)格式不正確，請檢查";
		document.all["txChgDateS"].value = "";
	}
	else if(!jf_CheckCDATE(document.all["txChgDateE"].value) && jf_Trim(document.all["txChgDateE"].value) != "")
	{
		$('#txChgDateE').focus();
		ErrMsg = "改分日期(迄)格式不正確，請檢查";
		document.all["txChgDateE"].value = "";
	}	
	//1100609	Joe		1100633		新增改分日期條件--E
	
	if(jf_Trim(ErrMsg) != "")
	{
		alert(ErrMsg);
		ReturnValue = true;			
	}
	else if(!NotEmpty)
	{
		/*if(window.confirm("未選擇任何條件，資料筆數可能過多"))
			ReturnValue = false;
		else
		{
			ReturnValue = true;
			document.all["txRcvDateS"].focus();
		}*/	
		
		alert("查詢條件不可皆為空白");
		ReturnValue = true;
	}
	else{
		ReturnValue = false;
		
		//1100609	Joe		1100633		檢核通過後調整日期欄位合理性--E
		if (document.all.txRcvDateS.value == "" && document.all.txRcvDateE.value != "")
			document.all.txRcvDateS.value = document.all.txRcvDateE.value;
		else if (document.all.txRcvDateS.value != "" && document.all.txRcvDateE.value == "")
			document.all.txRcvDateE.value = document.all.txRcvDateS.value;
		else if (document.all.txRcvDateS.value > document.all.txRcvDateE.value) {
			var tmp = document.all.txRcvDateS.value;
			document.all.txRcvDateS.value = document.all.txRcvDateE.value;
			document.all.txRcvDateE.value = tmp;
		}
		if (document.all.txChgDateS.value == "" && document.all.txChgDateE.value != "")
			document.all.txChgDateS.value = document.all.txChgDateE.value;
		else if (document.all.txChgDateS.value != "" && document.all.txChgDateE.value == "")
			document.all.txChgDateE.value = document.all.txChgDateS.value;
		else if (document.all.txChgDateS.value > document.all.txChgDateE.value) {
			var tmp = document.all.txChgDateS.value;
			document.all.txChgDateS.value = document.all.txChgDateE.value;
			document.all.txChgDateE.value = tmp;
		}
		//1100609	Joe		1100633		檢核通過後調整日期欄位合理性--E
	}
	//return true;
	return ReturnValue;
}
//0980820	David	0980391	一級單位選單連動二級單位選單
function dlOnChange(argDeptObj,argSectObj)
{	
	if(document.all.txOD_FLOW_TYPE.value != "2")
		return;
	
	var OnlyUnit = true;
	var strDeptNo = document.all[argDeptObj].options[document.all[argDeptObj].selectedIndex].value;
		
	//清空二級單位選單
	for(var i = document.all[argSectObj].length ; i > 0 ; i--)
		document.all[argSectObj].remove(i-1);
		
	document.all[argSectObj].options.add(new Option("",""));//第一筆空白
	
	//判斷是否為單純一級單位
	var UnitCount = 0;
	for(var i = 0 ; i < document.all.dlAllUnit.length ; i++)
	{
		var SectNo = document.all.dlAllUnit.options[i].value;
		if(strDeptNo == SectNo.substr(0,2))
			UnitCount++;
		if(UnitCount > 1)
			OnlyUnit = false;
	}
	
	if(!OnlyUnit)//不為單純一級單位，二級下拉選單需塞1.空白 2.僅含一級單位 3.其他的二級單位
	{
		document.all[argSectObj].className = "";
		for(var i = 0 ; i < document.all.dlAllUnit.length ; i++)
		{
			var NewText = document.all.dlAllUnit.options[i].text;
			var NewValue = document.all.dlAllUnit.options[i].value;
			if(strDeptNo == NewValue)
			{
				document.all[argSectObj].options.add(new Option("僅含一級單位",NewValue));
				continue;
			}
			if(strDeptNo == NewValue.substr(0,2))
			{
				document.all[argSectObj].options.add(new Option(NewText,NewValue));
				continue;
			}
		}
	}
	else//單純一級單位，二級下拉選單隱藏
	{
		document.all[argSectObj].className = "hide";
	}
}
//0980820	David	090391	紀錄二級單位Index、Value，供PostBack時使用
function KeepSectSelected()
{
	document.all.H_Old_Sect.value = document.all.dl_Old_Sect.selectedIndex;
	document.all.H_New_Sect.value = document.all.dl_New_Sect.selectedIndex;
	document.all.HOldSectNo.value = document.all.dl_Old_Sect.options[document.all.dl_Old_Sect.selectedIndex].value;
	document.all.HNewSectNo.value = document.all.dl_New_Sect.options[document.all.dl_New_Sect.selectedIndex].value;
}
//0980820	David	090391	ClientOnLoad時設定二級單位選項
function SetIndex()
{
	document.all.dl_Old_Sect.selectedIndex = document.all.H_Old_Sect.value;
	document.all.dl_New_Sect.selectedIndex = document.all.H_New_Sect.value;
}
//1140513	Daniel	1140255	RadioButton選項連動處理
function rbSummaryChecked() {
	document.getElementById("rbNoPaginated").checked = true;
	document.getElementById("rbPaginated").disabled = true;
}
function rbDetailChecked() {
	document.getElementById("rbPaginated").disabled = false;
}