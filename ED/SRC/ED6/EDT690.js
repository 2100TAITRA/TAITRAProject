/*
DATE		SA		PRG			MGR_NO		DESC
0990923				Johnny		0990118		新增EDT690案件辦理情形維護作業
0991026				Bill		0990675		增加EDI610超連結到此頁面並開啟
1010919		Kevin	Kevin		1010307		新增人民申請案件外審單位登打機制
1030821		Kevin	Kevin		-------		調整由SVR取得資訊
1030905		Kevin	Kevin		-------		新增template_utf8_v3_EDT690.js，不使用w32
1040310		Kevin	Eric		1040108		增加判斷是否為FDA使用
1050415		Kevin	Kevin		1050087		二代公文系統升級
1050824     Kevin	Kevin		1050116		外審單位功能擴充[1050116]、新增初篩[1050117]
1051019     Leslie  Kenny       1050087     二代公文修改
1060804     Kevin   Kevin       1060550     清除錯誤資料避免重複迴圈
1061017     Kevin   Joe         1060882     新增再篩類別
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
var wsDocNo;
var wsSuppNotes;
var wsFlowName;
//1050824 Kevin 1050116 外審單位功能擴充
var wsOutName;
var wsOutCopyName;

//1050824 Kevin 1050116 調整子視窗架構
var childOutUserType;

//1050415 Kevin 1050087 二代公文系統升級
//if (document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1030821 Kevin 調整由SVR取得資訊
	dlChange();
	////1000119 Linda 由ODC010開啟時將子文文號帶入並Onblur
	//if(document.all.txDocNo.value != "")
	//	txDcoNoOnblur(false);
	//	
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	////jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

	//1050824 Kevin 1050116 配合二代升級不叫用
	////1030905 Kevin 預先呼叫WS
	//jf_CallWS("../EDLIB/EDWS.asmx", "GetCapplyFlow", false, null);
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
	if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}

	if (IsServerHandling)
		return;

	//檢查是否TimeOut
	if (jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}

    //1050824 Kevin 1050116 調整子視窗架構
	childOutUserType = xObjectName;

	switch (xObjectName)
	{
		//1050415 Kevin 1050087 二代公文系統升級
		//case "btNone":
		//	Page_BlockSubmit = true;
		//	break;
		case "ibFlow_Name":
			Page_BlockSubmit = true;
			strUrl = "EDC691.aspx?rtnObj=lbReturnValue";
			if (document.all["IsOutSide"].value == "Y")
				strUrl += "&argOutState=3"
			jf_OpenChildWin(strUrl, "EDC691", 700, 500);
			break;
		case "ibSuppNotes":
			Page_BlockSubmit = true;
			strUrl = "EDM610C1.aspx?rtnObj=lbReturnValue";
			jf_OpenChildWin(strUrl, "EDM610C1", 700, 500);
			break;
		    //1050824 Kevin 1050116 新增查詢子視窗 Start
		case "ibOutUser":
			Page_BlockSubmit = true;
			strUrl = "EDI693.aspx?rtnObj=lbReturnValue";
			jf_OpenChildWin(strUrl, "EDI693", 700, 500);
			break;
		case "ibOutCopyUser":
			Page_BlockSubmit = true;
			strUrl = "EDI693.aspx?rtnObj=lbReturnValue";
			jf_OpenChildWin(strUrl, "EDI693", 700, 500);
			break;
		case "ibScrEmail":
			Page_BlockSubmit = true;
			strUrl = "EDI694.aspx?rtnObj=lbReturnValue&argFrom=EDT690";
			jf_OpenChildWin(strUrl, "EDI694", 700, 500);
			break;
		    //1050824 Kevin 1050116 End
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050415 Kevin 1050087 二代公文系統升級
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	if (IsServerHandling)
		return;

	//檢查是否TimeOut
	if (jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}

	//1050415 Kevin 1050087 二代公文系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	document.all.H_Open.value = "N";
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050415 Kevin 1050087 二代公文系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName)
			break;
		case "btSave":
			if (CheckSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050415 Kevin 1050087 二代公文系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName)

			break;
		case "btDelete":
			Page_BlockSubmit = !jCheckDelete();
			//1050415 Kevin 1050087 二代公文系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName)
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050415 Kevin 1050087 二代公文系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName)
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all["txKeyFld"].focus();
			break;
		case "btSearch":
			//1050415 Kevin 1050087 二代公文系統升級
			Page_BlockSubmit = true;
			var sPara = location.search;
			var strUrl = "EDI620.aspx" + sPara + "&rtnObj=lbReturnValue";
			jf_OpenChildWin(strUrl, "EDI620", 800, 600);
			break;
			//1050824 Kevin 1050116 新增初篩通知 Start
		case "btSrcEmail":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName)
			break;
			//1050824 Kevin 1050116 End
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function CheckSave()
{
	var bRtnbool = false;

	if (jf_CheckBeforSave())
	{
		if (!txDcoNoOnblur(true))
			return false;

		if (!txFlowNameOnblur())
			return false;

		if (!txSuppNotesNoOnblur())
			return false;

		if (!CheckCDATE("txTaskDate", "辦理日期"))
		{
			//1060804 Kevin 1060550 清除錯誤資料避免重複迴圈
			document.all["txTaskDate"].value = '';
			return false;
		}

		bRtnbool = true;
	}

	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg = "";

	if (document.all["txFlowName"].value == "")
	{
		strErrMsg += "辦理情形不可空白\n";
		document.all["txFlowName"].focus();
	}
	//1040310 Eric 1040108 增加判斷是否為FDA使用
	if (document.all["bChkFDA"].value == "Y")
	{
		if (document.all["txPermitNo"].value == "" && document.all["txPermitMark"].value == "1")
		{
			strErrMsg += "許可證字號不可空白\n";
			document.all["txPermitNo"].focus();
		}
	}

	if (document.all["txTaskDate"].value != "" && document.all["txTaskDate"].value.length != 7)
	{
		strErrMsg += "請輸入7碼年月日\n";
		document.all["txTaskDate"].focus();
	}
	//1040310 Eric 1040108 增加判斷是否為FDA使用
	if (document.all["bChkFDA"].value == "Y")
	{
		if ((document.all["H_txOutState"].value == "1" || document.all["H_txOutState"].value == "2") && document.all["dlOutOu"].selectedIndex == 0)
		{
			strErrMsg += "請選擇外審單位\n";
			document.all["dlOutOu"].focus();
		}
	}
	//1040310 Eric 1040108 增加判斷是否為FDA使用
	if (document.all["bChkFDA"].value == "Y")
	{
		if (document.all["H_txOutState"].value == "3" && document.all["txOutUser"].value == "")
		{
			strErrMsg += "請輸入外審承辦人\n";
			document.all["txOutUser"].focus();
		}
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
	}

	return bRtnbool;
}

//檢查DataGrid資料列是否有勾選
function jCheckDelete()
{
	var bCbCheckedFlag = false;

	var bCheckFlag = true;

	for (var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if (document.all["dg1__ctl" + i + "_cbSelect"].checked == true)
			bCbCheckedFlag = true;

		if (bCbCheckedFlag && document.all["dg1__ctl" + i + "_cbSelect"].checked == false)
			bCheckFlag = false;
	}
	if (!bCbCheckedFlag)
	{
		alert("請至少選取一筆資料。");
		return false;
	}
	if (!bCheckFlag)
	{
		alert("辦理情形需從後方一併刪除。");
		return false;
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
    var bSuccess = false;

    //webserver回傳後動作
    if (argResult.id == wsDocNo) {
        if (argResult.value.m_bSuccess) {
            document.all.H_RcvDate.value = argResult.value.RtnStr.split(":")[0];
            document.all.H_IssueDate.value = argResult.value.RtnStr.split(":")[1];
            document.all.H_NewByOu.value = argResult.value.RtnStr.split(":")[2];
            bSuccess = true;
        }
        else {
            alert(argResult.value.m_strErrMsg);
            document.all.H_NewByOu.value = "";
            document.all.H_RcvDate.value = "";
            document.all.H_IssueDate.value = "";
			//1060804 Kevin 1060550 清除錯誤資料避免重複迴圈
			document.all.txDocNo.value = "";
            document.all.txDocNo.focus();
            bSuccess = false;
        }
    }
    else if (argResult.id == wsSuppNotes) {
        if (argResult.value.m_bSuccess) {
            document.all.txSuppNotesName.value = argResult.value.RtnStr;
            bSuccess = true;
        }
        else {
            alert(argResult.value.m_strErrMsg);
            document.all.txSuppNotesName.value = "";
			//1060804 Kevin 1060550 清除錯誤資料避免重複迴圈
			document.all.txSuppNotesNo.value = "";
            document.all.txSuppNotesNo.focus();
            bSuccess = false;
        }
    }
    else if (argResult.id == wsFlowName) {
        if (argResult.value.m_bSuccess) {
            document.all.lbFlow_Name.innerText = argResult.value.RtnStr.split(":")[0];
            document.all.txPermitMark.value = argResult.value.RtnStr.split(":")[1];
            document.all.txTimeCount.value = argResult.value.RtnStr.split(":")[2];
            document.all.txIsExtend.value = argResult.value.RtnStr.split(":")[3];
            document.all.H_txOutState.value = argResult.value.RtnStr.split(":")[4];
            //1050824 Kevin 1050116 新增帶回初篩類型
            document.all.txScrType.value = argResult.value.RtnStr.split(":")[5];

            //1040310 Eric 1040108 增加判斷是否為FDA使用
            if (document.all["bChkFDA"].value == "Y") {
                if (document.all["H_txOutState"].value == "1" || document.all["H_txOutState"].value == "2") {
                    document.all["dlOutOu"].disabled = false;
                }
                else {
                    document.all["dlOutOu"].selectedIndex = 0;
                    document.all["dlOutOu"].disabled = true;
                }
                //1050824 Kevin 1050116 新增處理初篩
				//1061017	Joe		1060882		新增再篩類別
                // if (document.all.txScrType.value == "1" || document.all.txScrType.value == "2") {
                if (document.all.txScrType.value == "1" || document.all.txScrType.value == "2" || document.all.txScrType.value == "3" || document.all.txScrType.value == "4") {
                    document.all["txScrOuName"].disabled = false;
                    document.all["txScrEmpName"].disabled = false;
                    document.all["txScrEmail"].disabled = false;
                }
                else {
                    document.all["txScrOuName"].disabled = true;
                    document.all["txScrEmpName"].disabled = true;
                    document.all["txScrEmail"].disabled = true;
                }
            }

            bSuccess = true;
        }
        else {
            alert(argResult.value.m_strErrMsg);
            document.all.lbFlow_Name.innerText = "";
            document.all.txPermitMark.value = "";
            document.all.txTimeCount.value = "";
            document.all.txIsExtend.value = "";
            document.all.H_txOutState.value = "";
			//1060804 Kevin 1060550 清除錯誤資料避免重複迴圈
			document.all.txFlowName.value = "";
            document.all.txFlowName.focus();
            bSuccess = false;
        }
    }
        //1050824 Kevin 1050116 新增外審單位
    else if (argResult.id == wsOutName) {
     
        document.all["txOutUser"].value = argResult.value[1];
        document.all["txOutUser"].focus();

    }
    else if (argResult.id == wsOutCopyName) {

        document.all["txOutCopyUser"].value = argResult.value[1];
        document.all["txOutCopyUser"].focus();
    }

    return bSuccess;
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	if (argCallerId == "EDC691")
	{
		document.all["txFlowName"].value = jf_Trim(document.all.lbReturnValue.options[0].value);

		if (document.all["txFlowName"].value != "")
		{
			txFlowNameOnblur();
		}
		document.all["txFlowName"].focus();
	}
	else if (argCallerId == "EDM610C1")
	{
		document.all["txSuppNotesNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);

		if (document.all["txSuppNotesNo"].value != "")
		{
			txSuppNotesNoOnblur();
		}
		document.all["txSuppNotesNo"].focus();
	}
	else if (argCallerId == "EDI620")
	{
		document.all["txComNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);

		if (document.all["txComNo"].value != "")
		{
			if (txDcoNoOnblur())
			{
				Page_BlockSubmit = false;
				jf_OpenButtonSubmit();
			}
		}
		document.all["txComNo"].focus();
	}
	    //1050824 Kevin 1050116 新增外審單位、初篩處理 Start
	else if (argCallerId == "EDI693") {
	    var param = new Array();
	    param[0] = document.all.H_OrgNo.value;
	    param[1] = jf_Trim(document.all.lbReturnValue.options[0].value);
	    param[2] = jf_Trim(document.all.lbReturnValue.options[1].value);
	    var CallID = jf_CallW("/EDT690WS.asmx", "GetOutName", false, param);

	    if (childOutUserType == "ibOutUser") {
	        document.all["txOutUserId"].value = jf_Trim(document.all.lbReturnValue.options[1].value);

	        wsOutName = CallID.id;
	        OnWSResult(CallID);

	        for (var i = 0; i < document.all.dlOutOu.options.length; i++) {
	            if (document.all.lbReturnValue.options[0].value == document.all.dlOutOu.options[i].value) {
	                document.all.dlOutOu.selectedIndex = i;
	                break;
	            }
	        }
	    }
	    else {
	        document.all["txOutCopyUserId"].value = jf_Trim(document.all.lbReturnValue.options[1].value);

	        wsOutCopyName = CallID.id;
	        OnWSResult(CallID);
	    }
	}
	else if (argCallerId == "EDI694") {
	    document.all["txScrOuName"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
	    document.all["txScrEmpName"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
	    document.all["txScrEmail"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
	    document.all["txScrEmpName"].focus();
	}
    //1050824 Kevin 1050116 End
	//清空lbReturnValue物件
	if (document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function txDcoNoOnblur(OnlyCheck)
{
	var bRet = true;
	if (document.all.txDocNo.value != "")
	{
		//使用web service取得收發文日期
		var param = new Array(1);
		param[0] = document.all.H_OrgNo.value;
		param[1] = document.all.txDocNo.value;
		param[2] = document.all.txComNo.value;
		var CallID = jf_CallWS("../EDLIB/EDWS.asmx", "GetRcvAndIssueDate", false, param);
		wsDocNo = CallID.id;
		bRet = OnWSResult(CallID);
	}
	else
	{
		document.all.H_NewByOu.value = "";
		document.all.H_RcvDate.value = "";
		document.all.H_IssueDate.value = "";
	}
	if (OnlyCheck == false)
	{
		if (document.all.H_NewByOu.value == "Y")//0991012 若為創稿公文預設帶發文日期 Johnny
			document.all.dlTaskDate.selectedIndex = 2;
		else if (document.all.H_RcvDate.value != "")
			document.all.dlTaskDate.selectedIndex = 1;
		else if (document.all.H_IssueDate.value != "")
			document.all.dlTaskDate.selectedIndex = 2;
		else
			document.all.dlTaskDate.selectedIndex = 0;
		dlChange();
	}
	return bRet;
}

function dlChange()
{
	if (document.all.dlTaskDate.selectedIndex == 0)
	{
		document.getElementById("txTaskDate").readOnly = false;
		document.all.txTaskDate.className = "InputFieldLabel";
		document.all.txTaskDate.value = "";
	}
	else
	{
		document.getElementById("txTaskDate").readOnly = true;
		document.all.txTaskDate.className = "DisplayOnly";
		if (document.all.dlTaskDate.selectedIndex == 1)
			document.all.txTaskDate.value = document.all.H_RcvDate.value;
		else
			document.all.txTaskDate.value = document.all.H_IssueDate.value;
	}
}

function txSuppNotesNoOnblur()
{
	var bRet = true;
	if (document.all.txSuppNotesNo.value != "")
	{
		if (document.all.txSuppNotesNo.value == "99")
		{
			document.getElementById("txSuppNotesName").readOnly = false;
			document.all.txSuppNotesName.className = "InputFieldLabel";
			document.all.txSuppNotesName.value = "";
			bRet = true;
		}
		else
		{
			document.getElementById("txSuppNotesName").readOnly = true;
			document.all.txSuppNotesName.className = "DisplayOnly";
			//使用web service取得收發文日期
			var param = new Array(1);
			param[0] = document.all.H_OrgNo.value;
			param[1] = document.all.txSuppNotesNo.value;
			var CallID = jf_CallWS("../EDLIB/EDWS.asmx", "GetSuppNotes", false, param);
			wsSuppNotes = CallID.id;
			bRet = OnWSResult(CallID);
		}
	}
	else
		document.all.txSuppNotesName.value = "";
	return bRet;
}

function txFlowNameOnblur()
{
	var bRet = true;
	if (document.all.txFlowName.value != "")
	{
		//使用web service取得辦理狀態
		var param = new Array(1);
		param[0] = document.all.H_OrgNo.value;
		param[1] = document.all.txFlowName.value;
		var CallID = jf_CallWS("../EDLIB/EDWS.asmx", "GetCapplyFlow", false, param);
		wsFlowName = CallID.id;
		bRet = OnWSResult(CallID);
	}
	else
	{
		document.all.lbFlow_Name.innerText = "";
		document.all.txPermitMark.value = "";
		document.all.txTimeCount.value = "";
		document.all.txIsExtend.value = "";
	}
	return bRet;
}