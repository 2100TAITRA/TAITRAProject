/*
DATE	 SA	      PRG	 MGR_NO		DESC
0951211  Stella   Whay   950721     新增[流程資訊]按鈕
0991124	 Zola	  Howard 0990695	因應人民申請案件(綠標)，修改辨理天數計算若為包含工作天時，應再判斷是否為連休假日
1010731	 Kevin	  Ken	 1010671    新增專案管制公文性質
1030627	 Kevin	  Eric	 1030365	新增取得BUSINESS_TYPE.DUE_RULE欄位以及是否使用GetUnHoliday函式
1050517  Cloud    Justin 1050087    二代公文修改
1050816  Cloud	  Justin 1050700	弱掃Client Potential Code Injection修正
1060510  Cloud	  Justin 1060215	INNERTEXT修正
1061101  Kevin	  Justin 1061070	弱掃Client Potential Code Injection修正
1101021	 Cloud	  Joe	 1100325	修改為當申請天數超過180天時，訊息詢問使用者是否繼續執行
1101209	 Kevin	  Kevin	 1100324 	修正調整檢核訊息、業務類別記錄錯誤問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

/*1050517 Justin 1050087 二代公文修改
document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
if (document.all["ValidationSummary1"].innerText != "")
	alert(document.all["ValidationSummary1"].innerText);*/
jf_ShowValidator();

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

//1050517 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
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
	
	//1050517 Justin 1050087 二代公文修改 
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if (jf_CheckKeyObject())
				SetCanSubmit();
			else
				SetCanNotSubmit();
			//1050517 Justin 1050087 二代公文修改 
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			//1010671	Ken	 101/07/31	儲存前檢查申請日期
			if(ChkApplyDay())
			{
				if(ConfirmSave())//是否通過儲存前必要檢查
					SetCanSubmit();
				else
					SetCanNotSubmit();
			}
			else
				SetCanNotSubmit();
			//1050517 Justin 1050087 二代公文修改 
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			if(jf_ConfirmDelete())
				SetCanSubmit();
			else
				SetCanNotSubmit();
			//1050517 Justin 1050087 二代公文修改 
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			if (jf_ConfirmCancel())
				SetCanSubmit();
			else
				SetCanNotSubmit();
			//1050517 Justin 1050087 二代公文修改 
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
    /*1050517 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	jf_CallWS("lib/OD_LIB.asmx","GetWorkDate" ,false, null);
	jf_CallWS("lib/TIME_LIB.asmx","GetBTypeNo" ,false, null);
	jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false, null);
	jf_CallWS("lib/OD_LIB.asmx","GetUnHoliday", false,null);*/
	
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
			//1050517 Justin 1050087 二代公文修改
			//document.all["txApplyDay"].focus();
			$('#txApplyDay').focus();
		}
	}
	else if(argResult.id == wsGetFieldValue)  //由業務類別判斷辦理天數是否含假日
	{
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		//1030627 Eric	1030365		新增回傳H_DueRule隱藏欄位欄位
		{
			/*1050517 Justin 1050087 二代公文修改 
			document.all["H_txIncHd"].innerText = argResult.value.RtnField0[0];
			document.all["H_txDueRule"].innerText = argResult.value.RtnField1[0];*/
			//1060510 Justin [1060215] INNERTEXT修正
			//document.all["H_txIncHd"].textContent = argResult.value.RtnField0[0];
			//document.all["H_txDueRule"].textContent = argResult.value.RtnField1[0];
			document.all["H_txIncHd"].value = argResult.value.RtnField0[0];
			document.all["H_txDueRule"].value = argResult.value.RtnField1[0];
		}
		else
		{
			/*1050517 Justin 1050087 二代公文修改 
			document.all["H_txIncHd"].innerText = "";
			document.all["H_txDueRule"].innerText = "";*/
			//1060510 Justin [1060215] INNERTEXT修正
			//document.all["H_txIncHd"].textContent = "";
			//document.all["H_txDueRule"].textContent = "";
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
	//1050517 Justin 1050087 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
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
	//檢查本次申請展期天數不能為空白
	//1010671	Ken	 101/07/31	已於公文性質檢查時檢查過天數及名稱
	//if(!CheckNotEmptyAndAlert("txApplyDay","本專案申請天數"))
	//	return false;
	//if(!CheckNotEmptyAndAlert("txCaseName","專案名稱"))
	//	return false;
	if(!CheckNotEmptyAndAlert("txReason","申請理由"))
		return false;

	//紀錄Client端所選的業務類別
	document.all["H_WorkType"].value = document.all["dlWorkType"].options[document.all["dlWorkType"].selectedIndex].value;
	if(document.all["ApplyType"].value == "E")
		//1101209 Kevin 1100324 調整文字
		//return window.confirm("本公文已提出線上申請成立專案，請確認是否要進行紙本登錄專案作業\n(執行完成本登錄後，線上申請將被取消)");
		return window.confirm("本公文已提出線上申請，請確認是否要進行紙本登錄作業\n(執行完成本登錄後，線上申請將被取消)");
	
	return true;
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName,argFieldName)
{
	if(jf_Trim(document.all[argObjName].value) == "")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName + "不可為空白"])), "");
		//1050517 Justin 1050087 二代公文修改
		//document.all[argObjName].focus();
		$('#' + argObjName).focus();
		return false;
	}
	return true;
}

//1010671	Ken	 101/07/31	根據公文性質檢查申請天數
function ChkApplyDay()
{
	var strProperty = document.all["dlProperty"].value;

	if(!CheckNotEmptyAndAlert("txApplyDay","本次專案申請天數"))
		return false;

	if( strProperty == "3" )//專案管制
	{
		if(!CheckNotEmptyAndAlert("txCaseName","專案名稱"))
			return false;

		if(parseInt(document.all["txApplyDay"].value) < 30)
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["依文書流程管理作業規範第七章規定專案申請天數需30日以上"])),"");						
			//1050517 Justin 1050087 二代公文修改
			//document.all["txApplyDay"].focus();
			$('#txApplyDay').focus();
			return false;
		}
	}
	else if ( strProperty == "9" )//特殊性案件申請天數限制為7~29天且不用檢查專案名稱
	{
		if(parseInt(document.all["txApplyDay"].value) > 29 || parseInt(document.all["txApplyDay"].value) < 7 )
		{
            //1101209 Kevin 1100324 調整文字
		    //jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["特殊性案件申請天數為7~29日"])),"");						
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["依文書流程管理作業規範第五十七點規定，特殊性案件處理時限為超過6日且未達30日。"])), "");
			//1050517 Justin 1050087 二代公文修改
			//document.all["txApplyDay"].focus();
			$('#txApplyDay').focus();
			return false;
		}
	}
	return true;
}

//###############################################################################
//						Server端Register之Function
//###############################################################################

//常用申請理由
function dlPhraseNo_onchange()
{
	var index = document.all["dlPhraseNo"].selectedIndex;
	//1050517 Justin 1050087 二代公文修改 
	//var val		= document.all["dlPhraseNo"].options[index].innerText;
	var val = document.all["dlPhraseNo"].options[index].textContent;
	if (document.all["txReason"].value != "")
		val = "，"+val;
	document.all["txReason"].value += val;
	document.all["dlPhraseNo"].options[0].selected = true;
	//1050517 Justin 1050087 二代公文修改
	//document.all["txReason"].focus();
	$('#txReason').focus();
}

var wsGetWorkDateID;//宣告webserver回傳值id
var wsGetFieldValue;//宣告webserver回傳值id

function txApplyDay_Onblur()
{
	//1101021	Joe		1100325		修改為當申請天數超過180天時，訊息詢問使用者是否繼續執行--S
    if (parseInt(document.all["txApplyDay"].value) > 180)
    {
		if(!window.confirm("申請專案管制案件之處理時限最長不得超過6個月。但屬行政調查權之調查事項且有法規依據者，不受申請專案管制案件之處理時限不得超過6個月之限制，且於提出申請時應併同敘明法規名稱及條文內容。是否繼續？"))
		{
			document.all["txApplyDay"].value= "";
			$('#txApplyDay').focus();
			return;
		}
    }
	//1101021	Joe		1100325		修改為當申請天數超過180天時，訊息詢問使用者是否繼續執行--E
	//1050517 Justin 1050087 二代公文修改 
	//if(document.all["lbStatus"].innerText == "已核可")
	if (document.all["lbStatus"].textContent == "已核可")
		return;
	var index	= document.all["dlWorkType"].selectedIndex;
	var obj = document.all["dlWorkType"].options[index];

    //1101209 Kevin 1100324 修正業務類別記錄錯誤問題
	document.all["txNewBtypeNo"].value = obj.value;

	var wsAKParam = new Array(5);
	var KeyName   = new Array(2);
	var KeyValue  = new Array(2);
	//1030627 Eric	1030365	修改宣告空間
	//var RtnFldName = new Array(1);
	var RtnFldName = new Array(2);
	var OrdFldName = new Array(1);
	
	KeyName[0]   = "SOURCE_ORG";
	KeyName[1]   = "B_TYPE_NO"; 
	//1061101 Justin [1061070] 弱掃Client Potential Code Injection修正
	//KeyValue[0]  = document.all.H_txSourceOrgNo.value;
	//KeyValue[1]  = obj.value;
	KeyValue[0]  = encodeURI(document.all.H_txSourceOrgNo.value);
	KeyValue[1]  = encodeURI(obj.value);
	RtnFldName[0]= "LT_INC_HD";
	//1030627 Eric	1030365	新增回傳值DUE_RULE
	RtnFldName[1]= "DUE_RULE";
		
	OrdFldName[0] = "";
	wsAKParam[0] = "BUSINESS_TYPE";
	wsAKParam[1] = KeyName;
	wsAKParam[2] = KeyValue;
	wsAKParam[3] = RtnFldName;
	wsAKParam[4] = OrdFldName;
	//根據BUSINESS_TYPE中LT_INC_HD決定計算辦理天數是否包含假日  stella 0941129
	callObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,wsAKParam);
	wsGetFieldValue = callObj.id;
	OnWSResult(callObj);
				
	var strDay = document.all["txApplyDay"].value;
	if (strDay == "")
	{
		//1050517 Justin 1050087 二代公文修改 
		//document.all["txNDueDate"].innerText = "";
		//1060510 Justin [1060215] INNERTEXT修正
		//document.all["txNDueDate"].textContent = "";
		document.all["txNDueDate"].value = "";
		return;
	}
	else
	{
		var wsParam = new Array(3);
		//1050816 Justin 1050700 弱掃Client Potential Code Injection修正
		//wsParam[0] = document.all["H_txStartDate"].value; //zoey [950817]  95/10/04 原本是 "txDueDate"
		wsParam[0] = encodeURI(document.all["H_txStartDate"].value);
		wsParam[1] = Number(strDay)-1;
		if(document.all.H_txIncHd.value == "Y")
			wsParam[2] = "1";
		//0991124	Howard	0990695	因應人民申請案件(綠標)，修改辨理天數計算若為包含工作天時，應再判斷是否為連休假日
		else if(document.all.H_txIncHd.value == "H")
			wsParam[2] = "3";
		else
			wsParam[2] = "2";
		//callObj = jf_CallWS("lib/OD_LIB.asmx","GetWorkDate" ,false, wsParam);	
		//1030627 Eric 1030365	判斷DUE_RULE是否使用GetUnHoliday函式
		//callObj = jf_CallWS("lib/OD_LIB.asmx","GetUnHoliday" ,false, wsParam);  //zoey [950817]  95/10/04
		if(document.all.H_txDueRule.value == "Y")
			callObj = jf_CallWS("lib/OD_LIB.asmx","GetUnHoliday" ,false, wsParam);  
		else
			callObj = jf_CallWS("lib/OD_LIB.asmx","GetWorkDate" ,false, wsParam);
		wsGetWorkDateID = callObj.id;
		OnWSResult(callObj);
	}
}


function dlProperty_onchange()
{
	//1010671	Ken		101/08/03 onchang設定預設天數
	var index	= document.all["dlProperty"].selectedIndex;
	var obj		= document.all["dlProperty"].options[index];
	
	if (obj.value == "9")
        //1101209 Kevin 1100324 特殊性案件改為15天
	    //document.all.txApplyDay.value = "7";
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

function cbReasonOnClick()
{
	if(document.all.cbReason8.checked)
	{
		document.all.txReason.readOnly = "";
		document.all.txReason.className = "";
	}
	else
	{
		document.all.txReason.readOnly = "readonly";
		document.all.txReason.className = "DisplayOnly";
	}
}
