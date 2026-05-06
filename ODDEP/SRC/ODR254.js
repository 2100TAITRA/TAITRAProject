/*
DATE 	SA	    PRG	    MGR_NO	DESC
1110926 Cloud   Cloud   1110875
1130416 Cloud   Jason   1130089 新增查詢模式
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050322 David 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
document.all.txCheckDocNo.onkeydown = jf_CheckEnterPress;
var bODT130txDocNoCheckFull = false;
var strDocNoLastLen = document.all.txCheckDocNo.value.length;
var strDocNoLastKey = "-1";
function ShowMsg()
{
	//1050322 David 1050087 二代公文修改
	/*if (document.all["ValidationSummary1"].innerText != "")
		alert(document.all["ValidationSummary1"].innerText);*/
	jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btBatchNo":   //送文批號子視窗
		    var pUrl = "";
		    //1110902 Cloud   Cloud   1110987 修改ODR250開啟ODI110時收文單位預設為檔案室
		    //pUrl = "ODI110.aspx?argMode=1";
		    pUrl = "ODI110.aspx?argMode=1&argFrom=ODR250";
			//1000216	Linda	[1000153]	新增ODI110可用公文號區間查詢（調整相關有呼叫之程式修改畫面大小）	
			//jf_OpenChildWin(pUrl,"ODI110",580,420);
			jf_OpenChildWin(pUrl,"ODI110",900,600);
			Page_BlockSubmit = true;
			break;
		case "btSelectAll":
			Page_BlockSubmit = true;			
			SelectAll();
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			SelectInverse();
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			SelectClear();
			break;
		case "btEnter":
			Page_BlockSubmit = true;
			txDocNo_onkeydown();
			break;
	}	
}

//1050322 David 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	{
		//1110317	Cloud	Cloud	1110267	修正重複點擊造成重複postback問題
		Page_BlockSubmit = true;
	   return;
	}
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	//1050322 David 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
    //1110705 Cloud    1110646 依postback前紀錄的狀態 重勾CheckBox-S
	var strStatus = "";
	if (document.all["cbSignP"].checked)
	    strStatus += "1";
	else
	    strStatus += "0";
	if (document.all["cbSignE"].checked)
	    strStatus += ";1";
	else
	    strStatus += ";0";
	if (document.all["cbSignERcvP"].checked)
	    strStatus += ";1";
	else
	    strStatus += ";0";

	document.all["h_txCheckBoxStatus"].value = strStatus;
    //1110705 Cloud    1110646 依postback前紀錄的狀態 重勾CheckBox-E
	
	switch (xObjectName)
	{
		case "btOpen":
			if(CheckBeforeOpen())
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050322 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if (CheckBoforeSave())
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050322 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050322 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
			//1020423	Jagle	[1020233]	確認隱藏欄位紀錄的是正確的VALUE值
			/*ddlUserOnchange();
			Page_BlockSubmit = false;
			//1050322 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);*/
			//1130416 Cloud   Jason   1130089 新增查詢模式--S
		    /*Page_BlockSubmit = true;
		    var strUrl = "ODR254C1.aspx?rtnObj=lbReturnValue";
			jf_OpenChildWin(strUrl, "ODR254C1", 700, 500);*/
			IsServerHandling = true;
			jf_ShowWaitState();
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			//1130416 Cloud   Jason   1130089 新增查詢模式--E
			break;
		case "btPrint":
			blPrint = true;
		case "btPreview":
			if(CheckBeforPrint(xObjectName))
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050322 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if(argCallerId == "ODI110")
	{
		document.all.txBatchNo.value = document.all["lbReturnValue"].options[0].value;
		jf_OpenButtonSubmit();
	}
	else if (argCallerId == "ODR254C1") {
	    var strDocNo = "";
	    for (var ndocNum = 0; ndocNum < document.all["lbReturnValue"].options.length; ndocNum++) {
	        //已存在DG的公文不處理
	        if (document.all.dg2) {
	            var bIsDocExist = false;
	            for (var iRow = 2; iRow < document.all.dg2.rows.length + 1; iRow++) {
	                if (document.all["lbReturnValue"].options[ndocNum].value == document.all["dg2__ctl" + iRow + "_lbDocNo"].textContent) {
	                    bIsDocExist = true;
	                    break;
	                }
	            }
	            if (bIsDocExist)
	                continue;
	        }
	        if (strDocNo != "")
	            strDocNo += ","
	        strDocNo += document.all["lbReturnValue"].options[ndocNum].value;
	    }
	    if (strDocNo != "") {
	        Page_BlockSubmit = false;
	        __doPostBack("InsertDataGrid", strDocNo);
	    }
	}
}

function ClientOnLoad()
{
	ShowMsg();
	//jeff 0950530 列印張數
	var nPage = parseInt(document.all.txPage.value);
	for(var i=0;i<(nPage-1);i++)
		jf_PrintFile();		
		
	//1020423	Jagle	[1020233]	判斷有無選擇承辦人
	if(document.all.H_UserValue.value != "")
	{
		for(var i = 0 ; i < document.all.ddlUser.length ; i++)
		{
			if(document.all.H_UserValue.value == document.all.ddlUser.options[i].value)
				document.all.ddlUser.selectedIndex = i;
		}
	}
	//1100125 Cloud   Cloud   1101552 修改是否包含密件公文為選項控制，並依環境變數[OD_ELEC_NEED_RPT] 控制預設值。
	jf_EnableSecrb();
    //1110705 Cloud    1110646 增加線上簽核選項與紙本來文轉線上簽核公文
	if (document.all["uOrgNickName"].value == "EXAM") {
	    document.all["chESign"].className = "hide"
	    document.all["chSignType"].className = "dTR"
	    if (document.all["Init"] && document.all["Init"].value == "TRUE")
	        jf_EnablecbRcvE();
        else
	        jf_SetCheckBox();
	}
	document.all["chSignType"].className = "hide";
	//1130416 Cloud   Jason   1130089 新增查詢模式
	if (document.all["h_hidefliter"]) {
		document.all["SearchInfo"].className = "hide";
		document.all["DocMode"].className = "hide";
		document.all["trFilter"].className = "hide";
	}
	else {
		document.all["trFilter"].className = "dTR";
		jf_SetSearchMode();
	}
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050322 David 1050087 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function CheckBeforeOpen()
{
	if(!CheckUnEmpty("txBatchNo","請輸入送文批號後再開啟"))
		return false;
	return true;
}

function CheckBoforeSave()
{
	var bRtn = false;
	
	if( document.all.dg2 != null ) //ferdy no.950360 #95.08.22
	{
		for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
		{
			if (document.all["dg2__ctl"+iRow+"_cb1"].checked)
			{
				bRtn = true;break;
			}
		}
		if (!bRtn)
		{
			document.all["dg2__ctl2_cb1"].focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])),"");
		}
	}
	else
	{
		for (var iRow=2;iRow<document.all.dg3.rows.length+1;iRow++)
		{
			if (document.all["dg3__ctl"+iRow+"_cb13"].checked)
			{
				bRtn = true;break;
			}
		}
		if (!bRtn)
		{
			document.all["dg3__ctl2_cb13"].focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])),"");
		}
	}

	return bRtn;
}

function CheckUnEmpty(argFieldName,argErrMsg)
{
	if(document.all[argFieldName].value == "")
	{
		document.all[argFieldName].focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argErrMsg])),"");		
		return false;
	}
	return true;
}

//預覽/列印前欄位檢查
function CheckBeforPrint(argObjectName)
{
	var Msg = "";
	if(argObjectName == "btPrint")
		Msg = "列印";
	else
		Msg = "預覽";
	if(!CheckUnEmpty("txBatchNo","請輸入送文批號後再"+Msg))
		return false;
	return true;
}

//全選
function SelectAll()
{
	if( document.all.dg2 != null ) //ferdy no.950360 與dg3共用
	{
		for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
		{
			document.all["dg2__ctl"+iRow+"_cb1"].checked = true;
		}
	}
	else
	{
		for (var iRow=2;iRow<document.all.dg3.rows.length+1;iRow++)
		{
			document.all["dg3__ctl"+iRow+"_cb13"].checked = true;
		}
	}
		
		
}
//反向
function SelectInverse()
{
	if( document.all.dg2 != null ) //ferdy no.950360 與dg3共用
	{
		for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
		{
			if (document.all["dg2__ctl"+iRow+"_cb1"].checked)
				document.all["dg2__ctl"+iRow+"_cb1"].checked = false;
			else
				document.all["dg2__ctl"+iRow+"_cb1"].checked = true;
		}
	}
	else
	{
		for (var iRow=2;iRow<document.all.dg3.rows.length+1;iRow++)
		{
			if (document.all["dg3__ctl"+iRow+"_cb13"].checked)
				document.all["dg3__ctl"+iRow+"_cb13"].checked = false;
			else
				document.all["dg3__ctl"+iRow+"_cb13"].checked = true;
		}
	}
}
//取消
function SelectClear()
{
	if( document.all.dg2 != null ) //ferdy no.950360 與dg3共用
	{
		for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
		{
			document.all["dg2__ctl"+iRow+"_cb1"].checked = false;
		}
	}
	else
	{
		for (var iRow=2;iRow<document.all.dg3.rows.length+1;iRow++)
		{
			document.all["dg3__ctl"+iRow+"_cb13"].checked = false;
		}
	}
}

//檢查是否按下Enter鍵,是則呼叫jf_btEnter()
function jf_CheckEnterPress()
{
	if(event.keyCode == 13)
	    txDocNo_onkeydown();
}

//按下確認鍵後將輸入文號勾選
/*function jf_btEnter()
{
	var strCheckDocNo = jf_Trim(document.all["txCheckDocNo"].value);
    var bIsDocNoExist = false;
    if (document.all.dg2)
        for (var iRow = 2; iRow < document.all.dg2.rows.length + 1; iRow++) {
            if (document.all["dg2__ctl" + iRow + "_lbDocNo"].textContent == strCheckDocNo) {
                bIsDocNoExist = true;
                break;
            }
        }
    if (!bIsDocNoExist) {
        Page_BlockSubmit = false;
        __doPostBack("InsertDataGrid", 0);
    }
    else {
        alert("公文文號已存在，無法加入");
        document.all["txCheckDocNo"].value = "";
        $('#txCheckDocNo').focus();
    }
    

    //Cola 修正當用掃瞄機掃入, 會自動focus 回公文文號之欄位 -- start -- 2007/05/28
    if (event.keyCode == 13) {
        document.all["btSelectClear"].focus();
        event.keyCode = 9;
    }
    //Cola -- end --
}*/

//1020423	Jagle	[1020233]	承辦人下拉選單ONCHANGE事件
function ddlUserOnchange()
{
	document.all.H_UserValue.value = document.all.ddlUser.value;
}
//1100125 Cloud     1101552 修改是否包含密件公文為選項控制，並依環境變數[OD_ELEC_NEED_RPT] 控制預設值。-s
function jf_EnableSecrb() {
    if (document.all.cbIncludeSecDoc.checked)
    {
        document.all.rbIncludeSecAll.disabled = false;
        document.all.rbIncludeSecRcvP.disabled = false;
    }
    else
    {
        document.all.rbIncludeSecAll.disabled = true;
        document.all.rbIncludeSecRcvP.disabled = true;
    }
}
//1100125 Cloud     1101552 修改是否包含密件公文為選項控制，並依環境變數[OD_ELEC_NEED_RPT] 控制預設值。-e
//1110705 Cloud    1110646 增加線上簽核選項與紙本來文轉線上簽核公文連動-S
function jf_EnablecbRcvE() {
    if (document.all.cbSignE.checked) {
        document.all.cbSignERcvP.disabled = true;
        document.all.cbSignERcvP.checked = true;
    }
    else {
        document.all.cbSignERcvP.disabled = false;
        document.all.cbSignERcvP.checked = false;
    }
}
//1110705 Cloud   Cloud   1110646 增加線上簽核選項與紙本來文轉線上簽核公文連動-E
//1110705 Cloud    1110646 依postback前紀錄的狀態 重勾CheckBox-S
function jf_SetCheckBox() {
    var statusList = document.all["h_txCheckBoxStatus"].value.split(';');
    if (statusList[0] == "1")
        document.all["cbSignP"].checked = true;
    else
        document.all["cbSignP"].checked = false;
    if (statusList[1] == "1")
        document.all["cbSignE"].checked = true;
    else
        document.all["cbSignE"].checked = false;
    if (statusList[2] == "1")
        document.all["cbSignERcvP"].checked = true;
    else
        document.all["cbSignERcvP"].checked = false;
    if (document.all.cbSignE.checked) {
        document.all.cbSignERcvP.disabled = true;
        document.all.cbSignERcvP.checked = true;
    }
}
//1110705 Cloud    1110646 依postback前紀錄的狀態 重勾CheckBox-E
function txDocNo_onkeydown() {

    console.log('txDocNo keydown 現行長度:' + document.all.txCheckDocNo.value.length + '|原始長度:' + strDocNoLastLen + '|' + document.all.txCheckDocNo.value);
    strDocNoLastLen = jf_Trim(document.all.txCheckDocNo.value).length;
    if (strDocNoLastLen < 10)
        return;
    //1071121 Kevin	支援非英數輸入法支援條碼
    if (event.keyCode == "229" && document.all.txCheckDocNo.value.length < document.all.txCheckDocNo.maxLength) {

        if (event.code == "Digit0")
            strDocNoLastKey = "0";
        if (event.code == "Digit1")
            strDocNoLastKey = "1";
        if (event.code == "Digit2")
            strDocNoLastKey = "2";
        if (event.code == "Digit3")
            strDocNoLastKey = "3";
        if (event.code == "Digit4")
            strDocNoLastKey = "4";
        if (event.code == "Digit5")
            strDocNoLastKey = "5";
        if (event.code == "Digit6")
            strDocNoLastKey = "6";
        if (event.code == "Digit7")
            strDocNoLastKey = "7";
        if (event.code == "Digit8")
            strDocNoLastKey = "8";
        if (event.code == "Digit9")
            strDocNoLastKey = "9";

        console.log('strDocNoLastKey:' + strDocNoLastKey);
    }

    var strCheckDocNo = jf_Trim(document.all["txCheckDocNo"].value);
    var bIsDocNoExist = false;
    if (document.all.dg1)
        for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++) {
            if (document.all["dg1__ctl" + iRow + "_lbDocNo"].textContent == strCheckDocNo) {
                bIsDocNoExist = true;
                break;
            }
        }
    if (!bIsDocNoExist) {
        //1071008 David 二代ODT130文號欄位使用條碼，會同時觸發jf_CheckFull跟txDocNo_onkeydown，新增控制避免同時觸發
        if (bODT130txDocNoCheckFull) {
            console.log('bODT130txDocNoCheckFull=false');
            bODT130txDocNoCheckFull = false;
            return;
        }
        Page_BlockSubmit = false;
        __doPostBack("InsertDataGrid", 0);
    }
    else {
        alert("公文文號已存在，無法加入");
        document.all["txCheckDocNo"].value = "";
        $('#txCheckDocNo').focus();
    }

    if (event.keyCode == 13) {
        document.all["btClear"].focus();
        event.keyCode = 9;
    }

}

//1130416 Cloud   Jason   1130089 新增查詢模式
function jf_SetSearchMode() {
	if (document.all["rbBatchMode_1"].checked) {
		document.all["SearchInfo"].className = "hide";
		document.all["DocMode"].className = "dTR";
		document.all["btSearch"].disabled = true;
		if (document.all.dg2 && document.all.dg2.rows.length >= 2 && document.all["H_txWorkMode"].value != "1") {
			if (window.confirm("當前已有資料，切換成批模式後後將清空畫面，是否確定切換?")) {
				Page_BlockSubmit = false;
				document.all["H_txWorkMode"].value = "1";
				jf_ToolBarSubmit("btCancel");
			}
			else {
				document.all["rbBatchMode_0"].checked = true;
				document.all["SearchInfo"].className = "";
				document.all["DocMode"].className = "hide";
				document.all["btSearch"].disabled = false;
				document.all["H_txWorkMode"].value = "0";
			}
		}
		else
			document.all["H_txWorkMode"].value = "1";
	}
	else {
		document.all["SearchInfo"].className = "";
		document.all["DocMode"].className = "hide";
		document.all["btSearch"].disabled = false;
		if (document.all.dg2 && document.all.dg2.rows.length >= 2 && document.all["rbBatchMode_0"].checked && document.all["H_txWorkMode"].value != "0") {
			if (window.confirm("當前已有資料，切換成批模式後後將清空畫面，是否確定切換?")) {
				Page_BlockSubmit = false;
				document.all["H_txWorkMode"].value = "0";
				jf_ToolBarSubmit("btCancel");
			}
			else {
				document.all["rbBatchMode_1"].checked = true;
				document.all["SearchInfo"].className = "hide";
				document.all["DocMode"].className = "dTR";
				document.all["btSearch"].disabled = true;
				document.all["H_txWorkMode"].value = "1";
			}
		}
		else
			document.all["H_txWorkMode"].value = "0";
	}

}