/*
DATE	 SA	      PRG	 MGR_NO		DESC
1140718  Cloud	  Andy	 1140389	新增程式
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

jf_ShowValidator();

AjaxPro.Request.prototype.timeout = function () {
	try {
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false) {
			this.abort();
		} else {
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error) {

	}
	finally {

	}
}

function jf_MenuInit() {
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
		/*
		case "":
			break;
		*/
	}	
}

function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if (jf_CheckKeyObject())
				SetCanSubmit();
			else
				SetCanNotSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if (ConfirmSave())//是否通過儲存前必要檢查
				SetCanSubmit();
			else
				SetCanNotSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			if(jf_ConfirmDelete())
				SetCanSubmit();
			else
				SetCanNotSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			if (jf_ConfirmCancel())
				SetCanSubmit();
			else
				SetCanNotSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
}

function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsGetWorkDateID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["lbNDueDate"].innerText = DateFormat(argResult.value.RtnWorkDate);
              document.all.txNDueDate.value = argResult.value.RtnWorkDate;
		}
		else
		{
			//document.all["lbNDueDate"].innerText = "";
			$('#txApplyDay').focus();
		}
	}
	else if(argResult.id == wsGetFieldValue)  //由業務類別判斷辦理天數是否含假日
	{
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			document.all["H_txIncHd"].value = argResult.value.RtnField0[0];
			document.all["H_txDueRule"].value = argResult.value.RtnField1[0];
		}
		else
		{
			document.all["H_txIncHd"].value = "";
			document.all["H_txDueRule"].value = "";
		}
	}
	else if(argResult.id == wsGetBTypeNo)  //由公文性質取得業務類別
	{
		if(jf_IsWebServiceSuccessNoAlert(argResult))
		{
			//clear 業務類別 dlWorkType
			ClearDL(document.all.dlWorkType);
			if(argResult.value.IsErr || argResult.value.RtnStr == "")
			{
				document.all.dlWorkType.disabled=true;
				document.all.dlWorkType.options.add(new Option("","")); //第一筆空白
				return false;	
			}

			if(argResult.value.RtnStr != "")
			{
				document.all.dlWorkType.disabled=false;
				var pTmpAry = argResult.value.RtnStr.split(":");
				
				//將值塞入 dlWorkType
				if(pTmpAry.length == 0)
				{
					document.all.dlWorkType.options.add(new Option("","")); //第一筆空白
					document.all.dlWorkType.selectedIndex = 0;
				}
				else
				{			
					for(var i=0;i< pTmpAry.length;i++)
					{
						var pTmpAry2 = pTmpAry[i].split(",");
						var objOption = new Option(pTmpAry2[1], pTmpAry2[0]);
						document.all.dlWorkType.options.add(objOption);
					}
					document.all.dlWorkType.selectedIndex = 0;
				}
			}
			else
			{
				document.all.dlWorkType.options.add(new Option("","")); //第一筆空白
				document.all.dlWorkType.selectedIndex = 0;
			}
		}
    }
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].textContent = obj.value;
}

//###############################################################################
//							Button Click Function
//###############################################################################

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
			bRtnbool = true;
		else
			bRtnbool = false;		
	}
//	alert(bRtnbool);
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	//儲存前再呼叫一次，重新計算預計辦結日
	txApplyDay_Onblur();

	//紀錄Client端所選的業務類別
	document.all["H_WorkType"].value = document.all["dlWorkType"].options[document.all["dlWorkType"].selectedIndex].value;
	if(document.all["ApplyType"].value == "E")
	//1140725 Cloud 依客服部確認內容補強調整
		//return window.confirm("本公文已提出線上申請，請確認是否要進行紙本登錄作業\n(執行完成本登錄後，線上申請將被取消)");
	{
		alert("該公文專案申請中，請將該申請作廢或執行完畢後方能使用本作業調整限辦日期。");
		return false;
	}
	else
		return true;
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName,argFieldName)
{
	if(jf_Trim(document.all[argObjName].value) == "")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName + "不可為空白"])), "");
		$('#' + argObjName).focus();
		return false;
	}
	return true;
}

function ChkApplyDay()
{
	var strProperty = document.all["dlProperty"].value;

	if(!CheckNotEmptyAndAlert("txApplyDay","本次專案申請天數"))
		return false;

	return true;
}

//###############################################################################
//						Server端Register之Function
//###############################################################################

var wsGetWorkDateID;//宣告webserver回傳值id
var wsGetFieldValue;//宣告webserver回傳值id

function txApplyDay_Onblur()
{
	var ExtDate = "ExtDate";
	var strNDueDate = jf_Trim(document.all["txNDueDate"].value);
	var strApplyDay = jf_Trim(document.all["txApplyDay"].value);
	if (parseInt(document.all["txApplyDay"].value) > 180) {
		if (!window.confirm("申請專案管制案件之處理時限最長不得超過6個月。但屬行政調查權之調查事項且有法規依據者，不受申請專案管制案件之處理時限不得超過6個月之限制，且於提出申請時應併同敘明法規名稱及條文內容。是否繼續？")) {
			document.all["txApplyDay"].value = "";
			$('#txApplyDay').focus();
			return;
		}
	}

	var index = document.all["dlWorkType"].selectedIndex;
	var obj = document.all["dlWorkType"].options[index];

	document.all["txNewBtypeNo"].value = obj.value;

	var wsAKParam = new Array(5);
	var KeyName = new Array(2);
	var KeyValue = new Array(2);
	var RtnFldName = new Array(2);
	var OrdFldName = new Array(1);

	KeyName[0] = "SOURCE_ORG";
	KeyName[1] = "B_TYPE_NO";
	KeyValue[0] = encodeURI(document.all.H_txSourceOrgNo.value);
	KeyValue[1] = encodeURI(obj.value);
	RtnFldName[0] = "LT_INC_HD";
	RtnFldName[1] = "DUE_RULE";

	OrdFldName[0] = "";
	wsAKParam[0] = "BUSINESS_TYPE";
	wsAKParam[1] = KeyName;
	wsAKParam[2] = KeyValue;
	wsAKParam[3] = RtnFldName;
	wsAKParam[4] = OrdFldName;
	callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, wsAKParam);
	wsGetFieldValue = callObj.id;
	OnWSResult(callObj);

	document.all.txNDueDate.value = "";
	if (strApplyDay == "")
		return false;

	
	var strRtn = OD.ODT255_HAC.txCurrExDaysChanged(document.all["txRcvDate"].value, document.all["txNDueDate"].value, document.all["txApplyDay"].value, document.all["H_txIncHd"].value, document.all.H_txSourceOrgNo.value, ExtDate).value;
	if (strRtn.startsWith("ERR-")) {
		alert(strRtn)
	}
	else {
		document.all.txNDueDate.value = strRtn;
    }

	if (strNDueDate !== "") {
		if (!CompareDate()) {
			$('#txApplyDay').focus();
			return false;
        }
	}
}


function dlProperty_onchange()
{
	var index	= document.all["dlProperty"].selectedIndex;
	var obj		= document.all["dlProperty"].options[index];
	
	if (obj.value == "9")
	    document.all.txApplyDay.value = "15";
	else
		document.all.txApplyDay.value = "30";
		
	//取得業務類別
	GetBTypeNo(obj.value);
	
	txApplyDay_Onblur();
}

//由公文性質取得業務類別
var wsGetBTypeNo=null;
function GetBTypeNo(strDocProperty)
{
	var param = new Array(1);
	param[0] = "";
	param[1] = strDocProperty;
	callObj = jf_CallWS("lib/TIME_LIB.asmx","GetBTypeNo" ,false, param);
	wsGetBTypeNo = callObj.id;
	OnWSResult(callObj);
}

function jf_IsWebServiceSuccessNoAlert(argResult)
{
	var L_NotReady_Text = "Service unavailable";
	
	if(argResult.error)
	{
		if(argResult.errorDetail.string == L_NotReady_Text)
		{
			//
		}
		else
		{
			alert(argResult.errorDetail.string);
		}
	    return false;
	}
	else
	{
		obj = argResult.value;
		if(obj.ErrorClass.IsErr)
		{
			if( obj.ErrorClass.IsRedirect)
			{
				jf_RedirectToCustomErrPage();
				return false;
			}
			else
				return true;
		}
	}
	return true;
}

//將DropDownList裡的item清除
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	return;

}
//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################
//取消TextBox中enter的功能
function fnHandleTextarea()
{
	if(event.keyCode==13)
		event.cancelBubble = true;
}

function SetCanSubmit()
{
	IsServerHandling = true;
	jf_ShowWaitState();	
	Page_BlockSubmit = false;
}

function SetCanNotSubmit()
{
	Page_BlockSubmit = true;
}

//日期格式轉換
function DateFormat(argDate)
{
	if (argDate.length == 7)
		return argDate.substring(0,3) + "/" + argDate.substring(3,5) + "/" + argDate.substring(5,7);
	if (argDate.length == 11)
		return argDate.substring(0,3) + "/" + argDate.substring(3,5) + "/" + argDate.substring(5,7) + " " + argDate.substring(9,2) + ":" + argDate.substring(11,2);
	return argDate;
}

//檢查日期格式,並顯示訊息
function CheckDate(argObj, argObjName) {
	if (argObj.value != "") {
		jf_PADCHAR(argObj, 7, '0');
		if (!jf_CheckCDATE(argObj.value)) {
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
			//FocusAt(argObj);
			return false;
		}
	}
	return true;
}

var IsCheck = false;

function CompareDate() {
	if (IsCheck) {
		IsCheck = false;
		return;
	}
	else
		IsCheck = true;

	var strNDueDays = jf_Trim(document.all["txNDueDate"].value);
	var strDueDate = document.all["txDueDate"].value;

	if (!CheckDate(document.all.txNDueDate, "申請後限辦日期")) {
		IsCheck = false;
		document.all.txApplyDay.value = "";
		document.all.txNDueDate.value = "";
		return false;
	}

	if (strDueDate >= strNDueDays) {
		alert("申請後限辦日期不可小(等)於申請前限辦日期!");
		IsCheck = false;
		document.all.txApplyDay.value = "";
		document.all.txNDueDate.value = "";

		return false;
	}
	IsCheck = false;
	return true;
}

function txNDueDate_Onblur() {
	var strNDueDays = jf_Trim(document.all["txNDueDate"].value);
	var strExtDays = "ExtDays";
	document.all.txApplyDay.value = "";

	if (strNDueDays == "")
		return false;

	//檢核展期天數是否為數字格式
	if (isNaN(strNDueDays)) {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["申請後限辦日期欄位只能輸入數字"])), "");
		return;
	}

	if (strNDueDays !== "") {
		if (!CompareDate()) {
			$('#txNDueDate').focus();
			return false;
        }
	}

	if (document.all["LastOnChangeDate"]) {
		if (document.all["LastOnChangeDate"].value !== "" && document.all["LastOnChangeDay"].value !== "") {
			if (strNDueDays == document.all["LastOnChangeDate"].value || document.all["LastOnChangeDate"].value == "")
				return true;
		}
	}

	var strRtn = OD.ODT255_HAC.txCurrExDaysChanged(document.all["txRcvDate"].value, document.all["txNDueDate"].value, document.all["txApplyDay"].value, document.all["H_txIncHd"].value, document.all.H_txSourceOrgNo.value, strExtDays).value;
	if (strRtn.startsWith("ERR-")) {
		alert(strRtn)
	}
	else {
		document.all.txApplyDay.value = strRtn;
	}


}