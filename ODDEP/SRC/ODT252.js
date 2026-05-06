/*
DATE	SA	    PRG		MGR_NO		DESC
0991124	Zola	Howard	0990695		因應人民申請案件(綠標)，修改辨理天數計算若為包含工作天時，應再判斷是否為連休假日
1031022	Cloud	Kevin_C	1030722		將V2.1.50.21 ODT252新增至共通版
1031222 Cloud	Kevin_C	1030722		onblur檢查修改
1050818 Kevin   Zen     1050700     弱掃XSS修正
1051013 Cloud   Justin  1050087     二代公文修改
1060510	Cloud	Justin	1060215		INNERTEXT修正
1060613 Kevin	Justin	1060456		弱掃Client Potential Code Injection修正
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1051013 Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1051013 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
    //取得確實按下的是哪個？鍵
	/*1051013 Justin [1050087] 二代公文修改
	var ibCals;
	var ibCalE;
	var ibFinD;
	if(xObjectName.indexOf("_ibCalS") != "-1")
	{
		pNo = xObjectName.substring(15, xObjectName.indexOf("_ibCalS"));	
		
		if(document.all["dgSchedule__ctl"+pNo+"_ibCalS"] != null)
		{
			ibCals = document.all["dgSchedule__ctl" + pNo + "_ibCalS"].id;
		}	
	}
	if(xObjectName.indexOf("_ibCalE") != "-1")
	{
		pNo = xObjectName.substring(15, xObjectName.indexOf("_ibCalE"));	
		
		if(document.all["dgSchedule__ctl"+pNo+"_ibCalE"] != null)
		{
			ibCalE = document.all["dgSchedule__ctl" + pNo + "_ibCalE"].id;
		}	
	}
	if(xObjectName.indexOf("_ibFinD") != "-1")
	{
		pNo = xObjectName.substring(15, xObjectName.indexOf("_ibFinD"));	
		
		if(document.all["dgSchedule__ctl"+pNo+"_ibFinD"] != null)
		{
			ibFinD = document.all["dgSchedule__ctl" + pNo + "_ibFinD"].id;
		}	
	}*/
	
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
	    /*1051013 Justin [1050087] 二代公文修改
		case ibCals:
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["dgSchedule__ctl"+pNo+"_txDateS"], event.screenX, event.screenY);
			break;
		case ibCalE:
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["dgSchedule__ctl"+pNo+"_txDateE"], event.screenX, event.screenY);
			break;
		case ibFinD:
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["dgSchedule__ctl"+pNo+"_txFinDate"], event.screenX, event.screenY);
			break;*/
	}
}

//1051013 Justin [1050087] 二代公文修改 
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
	
    //1051013 Justin [1050087] 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			SetCanSubmit();
		    //1051013 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
				SetCanSubmit();
			else
				SetCanNotSubmit();
		    //1051013 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			SetCanSubmit();
		    //1051013 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			//1031022	Kevin_C	1030722	檢查txDescAll欄位
			if(checkOnBlur(document.all["txDescAll"]))
				SetCanSubmit();
			else
				SetCanNotSubmit();				
		    //1051013 Justin [1050087] 二代公文修改 
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
    /*1051013 Justin [1050087] 二代公文修改 移除無用jf_CallWS
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
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
              document.all.txNDueDate.value = argResult.value.RtnWorkDate;
		}
		else
		{
		    //1051013 Justin [1050087] 二代公文修改
		    //document.all["txApplyDay"].focus();
		    $('#txApplyDay').focus();
		}
	}
	else if(argResult.id == wsGetFieldValue)  //由業務類別判斷辦理天數是否含假日
	{
		//檢查執行是否成功
	    if (jf_IsWebServiceSuccess(argResult))
	        //1051013 Justin [1050087] 二代公文修改
	        //document.all["H_txIncHd"].innerText = argResult.value.RtnField0[0];
			//1060510 Justin [1060215] INNERTEXT修正
	        //document.all["H_txIncHd"].textContent = argResult.value.RtnField0[0];
			document.all["H_txIncHd"].value = argResult.value.RtnField0[0];
		else
	        //document.all["H_txIncHd"].innerText = "";
			//1060510 Justin [1060215] INNERTEXT修正
	        //document.all["H_txIncHd"].textContent = "";
			document.all["H_txIncHd"].value = "";
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
    //1051013 Justin [1050087] 二代公文修改
    //document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//###############################################################################
//							Button Click Function
//###############################################################################
//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = true;
	return bRtnbool;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	//1031222	Kevin_C	1030722	onblur檢查修改
	if(!checkOnBlur(document.all["txDescAll"]))
		return false;
	//1031022	Kevin_C	1030722	onblur檢查
	//if(checkOnBlur(document.all["txDescAll"]))
	//	return true;
	//else
	//	return false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
			bRtnbool = true;
		else
			bRtnbool = false;		
	}
	return bRtnbool;
}
//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	//儲存前檢查進度起(訖)欄位
	if(!CheckDateRange())
		return false;
	
	return true;
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName,argFieldName)
{
	if(document.all[argObjName].value == "")
	{
	    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName + "不可為空白"])), "");
	    //1051013 Justin [1050087] 二代公文修改
	    //document.all[argObjName].focus();
	    $('#' + argObjName).focus();
		return false;
	}
	return true;
}

function GetToolbarCtrl(argId)
{
	return document.all.tbTool.getItem(argId);
	for(var i=0;i<20;i++)
	{
		var o=document.all.tbTool.getItem(i);
		if(o!=null)
		{
			alert(o.getAttribute("ID"));
			if(o.getAttribute("ID")==argId)
				return o;
		}
	}
	return null;
}
//###############################################################################
//						Server端Register之Function
//###############################################################################
//常用申請理由
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1051013 Justin [1050087] 二代公文修改
    //var val = document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
	if(document.all["txReason"].value != "")
		val = "，"+val;
	document.all["txReason"].value += val;
	document.all["dlPhraseNo"].options[0].selected = true;
    //1051013 Justin [1050087] 二代公文修改
	//document.all["txReason"].focus();
	$('#txReason').focus();
}

var wsGetWorkDateID;//宣告webserver回傳值id
var wsGetFieldValue;//宣告webserver回傳值id

function txApplyDay_Onblur()
{
	var index	= document.all["dlWorkType"].selectedIndex;
	var obj	    = document.all["dlWorkType"].options[index];
	var wsAKParam = new Array(5);
	var KeyName   = new Array(2);
	var KeyValue  = new Array(2);
	var RtnFldName = new Array(1);
	var OrdFldName = new Array(1);
	
	KeyName[0]   = "SOURCE_ORG";
	KeyName[1] = "B_TYPE_NO";

    //1050818 Zen 1050700 弱掃XSS修正--begin
	//KeyValue[0]  = document.all.H_txSourceOrgNo.value;
    //KeyValue[1]  = obj.value;
	KeyValue[0] = encodeURI(document.all.H_txSourceOrgNo.value);
	KeyValue[1] = encodeURI(obj.value);
    //1050818 Zen 1050700 弱掃XSS修正--end

	RtnFldName[0] = "LT_INC_HD";
	
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
	    //1051013 Justin [1050087] 二代公文修改
	    //document.all["txNDueDate"].innerText = "";
		//1060510 Justin [1060215] INNERTEXT修正
	    //document.all["txNDueDate"].textContent = "";
		document.all["txNDueDate"].value = "";
		return;
	}
	else
	{
	    var wsParam = new Array(3);
	    //1050818 Zen 1050700 弱掃XSS修正
	    //wsParam[0] = document.all["H_txStartDate"].value; //zoey [950817]  95/10/04 原本是 "txDueDate"
		//1060613 Justin [1060456] 弱掃Client Potential Code Injection修正
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
		callObj = jf_CallWS("lib/OD_LIB.asmx","GetUnHoliday" ,false, wsParam);  //zoey [950817]  95/10/04
		wsGetWorkDateID = callObj.id;
		OnWSResult(callObj);
	}
}


function dlProperty_onchange()
{
	var index	= document.all["dlProperty"].selectedIndex;
	var obj		= document.all["dlProperty"].options[index];
	//取得業務類別
	GetBTypeNo(obj.value);
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
	if(event.keyCode==13){
		event.cancelBubble = false;
	}
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
//新增檢核日期欄位
function CheckDate(argObj,argObjName)
{
	var dateObj = document.all[argObj] ;
	if(dateObj.value != "")
	{
		dateObj.value = jf_PADL(dateObj.value,7,'0');
		if(!jf_CheckCDATE(dateObj.value))
		{
			dateObj.value = "";	
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
		    //1051013 Justin [1050087] 二代公文修改
			//dateObj.focus();
			$('#' + argObj).focus();
		}
	}
}
//檢核日期起訖
function CheckDateRange()
{
	var InValidName = "";
	var InValidControlName = "";
	for(var i = 2; i <= document.all.dgSchedule.rows.length; i++)
	{
		//起訖日期不為空時
		if(jf_Trim(document.all["dgSchedule__ctl" + i + "_txDateS"].value) != "" && jf_Trim(document.all["dgSchedule__ctl" + i + "_txDateE"].value) != "")
		{			
			//起訖日期檢查
			try
			{
				if(document.all["dgSchedule__ctl" + i + "_txDateS"].value > document.all["dgSchedule__ctl" + i + "_txDateE"].value)
				{
					InValidName += ",進度起不可大於進度迄";
					InValidControlName = "dgSchedule__ctl" + i + "_txDateS";
				}
			}
			catch(e)
			{
				InValidName += e;
			}			
		}
		//0991117	Howard	[CDC]取消檢核實際完成日與進度迄
		/*
		if(jf_Trim(document.all["dgSchedule__ctl" + i + "_txDateE"].value) != "" && jf_Trim(document.all["dgSchedule__ctl" + i + "_txFinDate"].value) != "")
		{
			
			//實際完成日與進度迄之日期檢查
			try
			{
				if(document.all["dgSchedule__ctl" + i + "_txDateE"].value > document.all["dgSchedule__ctl" + i + "_txFinDate"].value)
				{
					InValidName += ",實際完成日不可大於進度迄";
					InValidControlName = "dgSchedule__ctl" + i + "_txDateE";
				}
			}
			catch(e)
			{
				InValidName += e;
			}			
		}
		*/
						
		if(InValidName != "")
		{
			InValidName = InValidName.substr(1,InValidName.length);
			//1060510 Justin [1060215] INNERTEXT修正
			//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號"+document.all["dgSchedule__ctl" + i + "_lbSeqWork"].innerText+"中"+InValidName])),"");						
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號"+document.all["dgSchedule__ctl" + i + "_lbSeqWork"].textContent+"中"+InValidName])),"");
			//1051013 Justin [1050087] 二代公文修改
			//document.all[InValidControlName].focus();
			$('#' + InValidControlName).focus();
			return false;
		}
	}
	return true;
}
//1031022	Kevin_C	1030722	新增檢核整體進度說明欄位
function isMaxLength(obj)
{
	fnHandleTextarea();
	if (obj.value.length==200)
	{
		if(event.keyCode !='8' && event.keyCode !='46' && event.keyCode !='37' && event.keyCode !='38' && event.keyCode !='39' && event.keyCode !='40' && event.keyCode !='16')
			if (document.selection != undefined){
				var sel = document.selection.createRange();
				selectedText = sel.text;
				if(selectedText == ""){
					event.returnValue = false;
					jf_ShowMsg("","備註長度不可超過200!");
				}
			}
			
	}else if(obj.value.length>200){
		event.returnValue = false;
		bHasCheck = true;
		jf_ShowMsg("","備註長度不可超過200!");
		bHasCheck = false;
		obj.value=obj.value.substring(0,200)
	}
}
var bHasCheck = false;
function checkOnBlur(obj){
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	if (obj.value.length>200)
	{
		jf_ShowMsg("","備註長度不可超過200!");
		obj.value=obj.value.substring(0,200)
		return false;
	}
	bHasCheck = false;
	return true;
}
