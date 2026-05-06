/*
*0980403    Jane    0980129 依業務類別計算限辦日期是否包含假日
*1030627	Eric	1030365	新增取得BUSINESS_TYPE.DUE_RULE欄位以及是否使用GetUnHoliday函式
*1040212	Gabby	1040075	因應AKT116須跳出公文展期資訊，增加核可時EXTENT儲存核決者
*1041210	Kenny	1040946	儲存時更新EXTENT增加寫入NEWDUE_DATE(新限辦日期)欄位
*1050429    Cloud   1050087 升級二代
*1050505	Kevin	1030623	限辦日期增加支援單位放假
*1050613	Cloud	1040946 (merge)修正輸入展期天數後直接點擊儲存導致新限辦日期未寫入問題
*1051031    Zen     1050087 修正修改二代行動平台之衍生問題
*1051205	Cloud	1051181	配合鐵改專案性質使用細項擬訂作業時程
*1070717	Joe		1070678	弱掃修正Client Potential XSS
*1100201	Joe		1090927	取消使用document.activeElement
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

InitReasonTable();
//1050429    Cloud   1050087 升級二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050429 Cloud [1050087]   升級二代
	//if (document.all["ValidationSummary1"].innerText != "")
    //alert(document.all["ValidationSummary1"].innerText);
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
		/*
		case "":
			break;
		*/
	}	
}

//1050407 Cloud   1050087     升級二代
//function jf_ToolBarHandle(event)
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
    //1050429    Cloud   1050087 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if (fnCheckBeforeOpen())
			{
			    Page_BlockSubmit = !jf_CheckKeyObject();
			    //1050429    Cloud   1050087 升級二代
			    //jf_ToolBarSubmit();
			    jf_ToolBarSubmit(xObjectName);
			}
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
			GetExtReason();
			//1050613	Cloud	1040946 (merge)修正輸入展期天數後直接點擊儲存導致新限辦日期未寫入問題
			GetNDueDate();
		    //1050429    Cloud   1050087 升級二代
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050429    Cloud   1050087 升級二代
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050429    Cloud   1050087 升級二代
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btRecent":
			if (fnCheckBeforeOpen())
			{	
			    //1050429    Cloud   1050087 升級二代
			    //jf_ToolBarSubmit();
			    jf_ToolBarSubmit(xObjectName);
				GetExtReason();
			}
			else {
				Page_BlockSubmit = true;

			}
			break;
			/*
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			document.all["txDocNo"].focus();
			break;
		case "btSearch":
			var strUrl = "";
			strUrl = "IIC100.aspx";//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			jf_OpenChildWin(strUrl, "IIC100", 250, 560 );
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
			jf_ToolBarSubmit();
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
			jf_ToolBarSubmit();
			break;
			*/
	}
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
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	//檢查本次申請展期天數不能為空白
	if(!CheckNotEmptyAndAlert("txCurrExDays","本次申請展期天數"))
		return false;

	//0980406-檢核展期天數是否為數字格式-Jane
	if(isNaN(jf_Trim(document.all.txCurrExDays.value)) && document.all.txCurrExDays.value != "?")
	{
		//1050613	Cloud	1040946 (merge)修正輸入展期天數後直接點擊儲存導致新限辦日期未寫入問題
		document.all.txCurrExDays.value ="";
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["展期天數欄位請輸入半形數字!!"])),"");
		return false;
	}
	
	//0950620 Charles 如果本次申請展期天數填的是0，則顯示錯誤訊息
	if(parseInt(document.all["txCurrExDays"].value) == 0)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["本次申請展期天數需大於 0 !!"])),"");
		return false;
	}	

	//0950421 Charles 如果展期預設最大天數不為0，表示需要檢查申請展期天數是否超過預設最大天數
	if(document.all["txDefaultExDays"].value != "0")
	{
		if(parseInt(document.all["txCurrExDays"].value) > parseInt(document.all["txDefaultExDays"].value))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["本次申請展期天數超過預設最大天數，預設最大天數為：" + document.all["txDefaultExDays"].value + "天"])),"");
			document.all["txCurrExDays"].focus();
			document.all["txCurrExDays"].select();
			return false;
		}
	}
	
	if(document.all["ApplyType"].value == "E")
		return window.confirm("本公文已提出線上申請公文展期，請確認是否要進行\n紙本登錄作業(執行完成本登錄後，線上申請將被取消)");
		
	//1040212 Gabby [1040075]因應AKT116須跳出公文展期資訊，增加核可時EXTENT儲存核決者
	if(document.all["H_AppUser"].value=="Y")
	{
		if(document.all["ddlApprove"].selectedIndex==0)
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["簽核者欄位不可為空白"])),"");
			return false;
		}
	}
    //1051201 Cloud [1051181] 增加檢核細項作業時程
	if (document.all.nOrgNickName.value == "RRB") {
	    if (document.all.DocProtity) {
	        if (document.all.DocProtity.value == "3")//專案性質公文-檢核擬訂作業細項
	        {
	            return CheckDetial();
	        }
	    }
	}
	return true;
}
/*
//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = false;
	
	return bRtnbool;
}
*/

//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
    ShowMsg();
    //1050429 Cloud [升級二代] 已不需要-mark
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("lib/OD_LIB.asmx", "GetWorkDate", false, null);
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	if(!document.all.cbreason_else.checked)
	{
		document.all.txExReason.readOnly = "readonly";
		document.all.txExReason.className = "DisplayOnly";
		document.all.txExReason.style.backgroundColor = "LightGrey";
	}
	//1051129 Cloud [1051181] 鐵改局且為專案性質公文時顯示特定欄位及細項
	document.all["TrDgSche"].style.display = "none";//隱藏資訊
	document.all["divforCaseAppDate"].style.display = "none";//隱藏資訊
	
	if (document.all.nOrgNickName.value == "RRB") {
	    if (document.all.DocProtity) {
	        if (document.all.DocProtity.value == "3")//專案性質公文DgNoData-不存在表示有細項資料，否則顯示原TEXTBOX
	        {
	        	document.all["divforCaseApp"].style.display = "block";//顯示資訊
	        	document.all["divforCaseAppDate"].style.display = "block";//隱藏資訊
	            if (!document.all.DetailNoData) {
	                document.all["TrDgSche"].style.display = "block";//顯示資訊
	                document.all["TrTxSche"].style.display = "none";//顯示資訊
	                document.all["DivDgSche"].style.height = "150px"
	            }
	            else {
	                document.all["TrTxSche"].style.display = "block";//顯示資訊
	                document.all["DivDgSche"].style.height = "0px"
	            }
	        }
	        else
	        {
	        	if (document.all.DocProtity.value == "2")
	        		document.all["divforCaseApp"].style.display = "block";//顯示資訊
				else
	            document.all["divforCaseApp"].style.display = "none";//隱藏資訊
	            document.all["TrTxSche"].style.display = "block";//顯示資訊
	            document.all["DivDgSche"].style.height = "0px"
	        }
	    }

	}
}

function OnWSResult(argResult)
{
	if (argResult.id == wsGetWorkDateID)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
		    //1050429 Cloud [1050087]   升級二代
		    //document.all.lbNDueDate.innerText = DateFormat(argResult.value.RtnWorkDate);
		    document.all.lbNDueDate.textContent = DateFormat(argResult.value.RtnWorkDate);
			//1041210	Kenny	[1040946]	增加紀錄onBlur後日期至隱藏欄位
			document.all.H_txNDueDate.value = argResult.value.RtnWorkDate;
		}
	}
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050429 Cloud [1050087]   升級二代
    //document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//###############################################################################
//						Server端Register之Function
//###############################################################################
function fnCheckBeforeOpen()
{
	if (jf_Trim(document.all.txDocNo.value) == "")
	{
		document.all.txDocNo.focus();
		alert("請先輸入公文文號");	
		return false;
	}
	return true;
}

/*
//檢查日期格式並Alert訊息
function txTxDate_onblur()
{
	if(!CheckDate(document.all.txTxDate,"申請日期"))
		FocusAt(document.all.txTxDate);
}
*/

var wsGetWorkDateID=null;
function GetNDueDate()
{
	var strExDays = document.all["txCurrExDays"].value;
	if (strExDays == "") return;
	//0980406-檢核展期天數是否為數字格式-Jane
	if(isNaN(jf_Trim(document.all.txCurrExDays.value)) && document.all.txCurrExDays.value != "?")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["展期天數欄位請輸入半形數字!!"])),"");
		return false;
	}
	var wsParam = new Array();
	wsParam[0] = document.all["txLimitDate"].value;
	wsParam[1] = strExDays;
	wsParam[2] = "2";//不含假日
	//0980129 依業務類別計算限辦日期是否包含假日 START
	if(document.all.H_txLtIncHd!=null)
	{
		if(document.all.H_txLtIncHd.value=="Y")
			wsParam[2] ="1";
		//0991124	Howard	0990695	修正配合人民申請案件，修改展期天數判斷條件，加入連休假日
		else if(document.all.H_txIncHd.value=="H")
			wsParam[2] ="3";
	}
	//0980129 END
	//1050505 Kevin 1030623 限辦日期增加支援單位放假 Start
	wsParam[3] = document.all.H_txDueRule.value;
	wsParam[4] = "";
	wsParam[5] = "";
	wsParam[6] = document.all["txDocNo"].value;
	CallWsObj = jf_CallWS("lib/OD_LIB.asmx", "GetLastDueDate", false, wsParam);
	////1030627 Eric 1030365	判斷DUE_RULE是否使用GetUnHoliday函式
	////var CallWsObj = jf_CallWS("lib/OD_LIB.asmx","GetWorkDate",false,wsParam);
	//if(document.all.H_txDueRule.value == "Y")
	//	CallWsObj = jf_CallWS("lib/OD_LIB.asmx","GetUnHoliday" ,false, wsParam);  
	//else
	//	CallWsObj = jf_CallWS("lib/OD_LIB.asmx","GetWorkDate" ,false, wsParam);
	//1050505 Kevin 1030623 End

	wsGetWorkDateID = CallWsObj.id;
	OnWSResult(CallWsObj);
}

function dlReason_Onchange()
{
	var index = document.all["dlReason"].selectedIndex;
	if (index != 0)
	{
		document.all["txExReason"].value = document.all["dlReason"].options[index].text;
	}
}

//###############################################################################
//						private Function
//###############################################################################
function SetControlDisable(argControlName)
{	
	document.all[argControlName].disabled  = true;
	if(document.all[argControlName].type == "text")
		document.all[argControlName].style.backgroundColor = "LightGrey";
}

function SetControlEnable(argControlName)
{
	document.all[argControlName].disabled  = false;
	if(document.all[argControlName].type == "text")
		document.all[argControlName].style.backgroundColor = "";
}

function SetControlDisplay(argControlName)
{
	document.all[argControlName].style.display = "block";
}
function SetControlHidden(argControlName)
{
	document.all[argControlName].style.display = "none";
}
function SetCombBoxDisable(argControlName)
{
	SetControlDisable(argControlName+"_Text");
	SetControlDisable(argControlName);
}
 
function SetCombBoxEnable(argControlName)
{
	SetControlEnable(argControlName+"_Text");
	SetControlEnable(argControlName);
}

function FocusAt(argObj)
{
	if(!argObj.disabled)
		argObj.focus();
}


//比較數字大小
//如果argNum1 > argNum2則回傳true
//如果argNum1 <= argNum2則回傳true
function CompareNumber(argNum1,argNum2)
{
	if(argNum1 == Math.min(argNum1,argNum2))
		return false;
	else
		return true;
}
//去除0取得真正的數字
function StringGetInt(argNumStr)
{
	var num = argNumStr;
	
	if(num.length > 0)
	{
		if(argNumStr.charAt(0) == "0")
			num = argNumStr.substr(1,argNumStr.length-1);
		if(num.charAt(0) == "0" )
			num = StringGetInt(num)
	}
	return num;
}

//透過Value值選取DropDownList中的Item
function SetDDlSelectByValue(argSelectId,argSelectValue)
{
	if(argSelectValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		//有可能Value的形式為 v1,v2,v3
		if(GetValueFromValueArray(document.all[argSelectId].options[i].value) == argSelectValue)
		{
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}

//會取得 "t1,t2,t3"結構中的第argIndex個值
function GetValueFromValueArray(argValueArray,argIndex)
{
	var RtnValueArray = argValueArray.split(",");
	return RtnValueArray[argIndex];
}

//透過Text值選取DropDownList中的Item
function SetDDlSelectByText(argSelectId,argSelectText)
{
	if(argSelectValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		if(document.all[argSelectId].options[i].Text == argSelectText)
		{
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName,argFieldName)
{
	if(document.all[argObjName].value == "")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName+"不可為空白"])),"");						
		FocusAt(document.all[argObjName]);
		return false;
	}
	return true;
}

//取得在Datagrid中動作時之Control Row index
function getRowIndex()
{
   //return intRowIndex = event.srcElement.parentElement.rowIndex;   
	var xObjectName = event.srcElement.id;
	return xObjectName.substring(8,xObjectName.indexOf("_",8));   
}

//依照ID取得Toolbar物件
//用法：
//var TxDocNoObj =  getToolBarItemObjById("btOpen");
//TxDocNoObj.setAttribute("Text","TTT");
function getToolBarItemObjById(argId)
{
	for(var i=0;i<document.all.tbTool.numItems;i++)
	{
		if(document.all.tbTool.getItem(i).getAttribute("ID") == argId)
			return document.all.tbTool.getItem(i);		
	}
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

//取消TextBox中enter的功能
function fnHandleTextarea()
{
	if(event.keyCode==13)
		event.cancelBubble = true;
		
    //zoey [95/10/30]
    //var xObjectName = document.activeElement.id;
	//1051031 Zen 1050087 修正修改二代行動平台之衍生問題
    //var xObjectName = e.target.id;
	var xObjectName = document.activeElement.id;
		
    if(xObjectName =="txExReason" && document.all["txExReason"].value.length >=100)
    {
        if(event.keyCode!=8)
        {     alert("最多僅能輸入100字");
              event.returnValue = false;
        }
    }
    else if(xObjectName =="txSchedule" && document.all["txSchedule"].value.length >=400)
    {
          if(event.keyCode!=8)
        {     alert("最多僅能輸入400字");
              event.returnValue = false;
        }
    }
}

function cbReasonOnClick()
{
	if(document.all.cbreason_else.checked)
	{
		document.all.txExReason.readOnly = "";
		document.all.txExReason.className = "InputFieldText";
		document.all.txExReason.style.backgroundColor = "white";
	}
	else
	{
		document.all.txExReason.readOnly = "readonly";
		document.all.txExReason.className = "DisplayOnly";
		document.all.txExReason.style.backgroundColor = "LightGrey";
	}
}
/************************************
*		InitReasonTable
*		初始化展期理由checkBox
*		David 95.05.11
*************************************/
var signValue;	//紀錄innertext為'其他'的變數

function InitReasonTable()
{
	var nCount = document.all["dlPhraseDesp"].length;
	var DATA = new Array(nCount);
	for(i=0;i<nCount;i++)
	{
		DATA[i] = document.all["dlPhraseDesp"].options[i].value;
	}
	var InsertContentBegin	="";
	var InsertContentEnd	="";
	var InsertContent = "";
    //1050428 Cloud	[1050087] 升級二代-長度以最長字元長度放入
	var dtLeftLenght = 0;
	var dtRightLenght = 0;
	var drS = ""
	var drE = ""
	for(i=0;i<nCount;i++)
	{
	    var j = i;
	    //1050428 Cloud	[1050087] 升級二代-S
	    if (i == 0)
	        dtLeftLenght = DATA[i].length;
	    else {
	        if (DATA[i].length > DATA[i - 1].length)
	            dtLeftLenght = DATA[i].length;
	    }
	    //1050428 Cloud	[1050087] 升級二代
		/*InsertContent += "<TR><TD style='WIDTH: 147px' align='right'></TD>"+
							 "<TD style='WIDTH: 250px'>"+
								 "<input id='rReason_"+ i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=GetExtReason() /><FONT color='darkblue' >" + DATA[i] +"</FONT>"+
							 "</TD>"+
							 "<TD style='WIDTH: 60px' align='right'></TD>";*/
	    InsertContent += "<div class='dTR'><div class='dTDTitle' style='width: 9.5em'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>" +
							 "<div class='dTD' style='width: @LeftLenght'>" +
									//1070717	Joe		1070678		弱掃修正Client Potential XSS
								 // "<input id='rReason_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick='GetExtReason()' /><Label color='darkblue'>" + DATA[i] + "</Label>" +
								 //1100201	Joe		1090927		取消使用document.activeElement
								 "<input id='rReason_" + i + "' type='checkbox' name='rReason_" + htmlencode(i) + "' GroupName='Reason' onclick='GetExtReason()' /><Label color='darkblue'>" + htmlencode(DATA[i]) + "</Label>" +
							 "</div>" +
							 "<div class='dTDTitle' style='width: 10em'></div>";
		i++;

		if (i<nCount)
		{
		    //1050428 Cloud	[1050087] 升級二代-S
		    if (i == 0)
		        dtRightLenght = DATA[i].length;
		    else {
		        if (DATA[i].length > DATA[i - 1].length)
		            dtRightLenght = DATA[i].length;
		    }
		    //1050428 Cloud	[1050087] 升級二代-E
		    //1050428 Cloud	[1050087] 升級二代
			/*InsertContent +=	 "<TD>"+
						   			 "<input id='rReason_"+ i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=GetExtReason() /><FONT color='darkblue' >" + DATA[i] +"</FONT>"+
								 "</TD></TR>";*/
		    InsertContent += "<div class='dTD' style='width: @RightLenght'>" +
									//1070717	Joe		1070678		弱掃修正Client Potential XSS
						   			"<input id='rReason_" + i + "' type='checkbox' name='rReason_" + htmlencode(i) + "'  GroupName='Reason' onclick='GetExtReason()'  /><Label color='darkblue'>" + htmlencode(DATA[i]) + "</Label>" +
								 "</div></div>";
		}
	}
	
	//1050429 Cloud	[1050087] 升級二代
	//var oldHTML = "<TABLE id='TEST' style='HEIGHT: 1px' cellSpacing='0' cellPadding='0' width=714px border='0'><TBODY>";//width原本是91%
	dtLeftLenght = dtLeftLenght + 0.5 + "em";
	dtRightLenght = dtRightLenght + 0.5 + "em";
	InsertContent = InsertContent.replace(/@LeftLenght/g, dtLeftLenght);//所有變數轉換以//g包裹被替換字串
	InsertContent = InsertContent.replace(/@RightLenght/g, dtRightLenght);
	var newHTML = "";

	//1050429 Cloud	[1050087] 升級二代
	//newHTML = oldHTML + InsertContent + "</TBODY></TABLE>";
	newHTML = InsertContent;
	//1050429 Cloud	[1050087] 升級二代
	//document.all["TEST"].outerHTML = newHTML;
	document.all["ReasonTable"].outerHTML = newHTML;
	
	var signReasonValue;
	var InitReasonArray = new Array(nCount);
	InitReasonArray = document.all["txReasonNo"].value.split(",");

	for(i=0;i<nCount;i++)
	{
		if(InitReasonArray[i] == "1")
		{
			document.all["rReason_"+i].checked = true;
		}
		if(InitReasonArray[nCount] == "1")
		{
			document.all["cbreason_else"].checked = true;
			document.all.txExReason.readOnly = "";
			document.all.txExReason.className = "InputFieldText";
			document.all.txExReason.style.backgroundColor = "white";
		}
		else
		{
			document.all.txExReason.readOnly = "readonly";
			document.all.txExReason.className = "DisplayOnly";
			document.all.txExReason.style.backgroundColor = "LightGrey";
		}
			
		
	}
	
}
/***********************************************
*		GetExtReason
*		取得checkBox innerText 中的展期理由
*		David	95.05.11
************************************************/
var addReason;
//var reasonNoArray = new Array(8);		//用來暫存被選擇展期理由的編號
var reasonNoArray = new Array(document.all["dlPhraseDesp"].length);		//用來暫存被選擇展期理由的編號
//var reasonNo;
function GetExtReason()
{
	var nCount = document.all["dlPhraseDesp"].length;
	//var xObjectName = document.activeElement.id;
    //1051031 Zen 1050087 修正修改二代行動平台之衍生問題
	//var xObjectName = e.target.id;		//作用的物件名稱
	//1100201	Joe		1090927		取消使用document.activeElement
	// var xObjectName = document.activeElement.id;
	var xObjectName = event.target.id;
	var rowNO = xObjectName.substring(8,xObjectName.length);	//作用物件名稱去除前兩個字
	var activeReason = "";
	
	//檢查cb中哪些被選取
	for(i=0;i<nCount;i++)
	{
		if (document.all["rReason_"+i].checked == true)
			reasonNoArray[i] = "1";
		else
			reasonNoArray[i] = "0";
	}
	
	if(document.all["cbreason_else"].checked == true)
		reasonNoArray[nCount] = "1";
	else
	{
		reasonNoArray[nCount] = "0";
		document.all["txExReason"].value = "";
	}
	
	//如果展期原因不足八個,則對其他強制補零
	/*if(nCount < 8)
	{
		for(i=nCount;i<8;i++)
		{
			if(reasonNoArray[i] == null)
			{
				reasonNoArray[i] = "0";
			}
		}
	}*/
		
	//activeReason = document.all.dlPhraseDesp.options[rowNO].value;
	document.all.txTempPhraseDesp.value = reasonNoArray;
	//控制其他欄位的唯讀與否
	//if (document.all["rReason_"+signValue].checked)
	
	if (document.all["cbreason_else"].checked)
	{
		document.all.txExReason.readOnly = "";
		document.all.txExReason.className = "InputFieldText";
		document.all.txExReason.style.backgroundColor = "white";
	}
	else
	{
		document.all.txExReason.readOnly = "readonly";
		document.all.txExReason.className = "DisplayOnly";
		document.all.txExReason.style.backgroundColor = "LightGrey";
	}
	var ReasonText = new Array(nCount);
	
	for(i=0;i<nCount;i++)
	{
		if (document.all["rReason_"+i].checked)
			ReasonText[i]=1;
		else
			ReasonText[i]=0;
	}
		
}
//1051201 Cloud	1051181 增加檢核擬定作業事項-s
function CheckDetial() {
    var blEmptyRow = false;  // 紀錄空白列；只要資料列輸入完整，輸入時穿插空白列仍須能儲存
    var strTargetId = "";
    var strEmptyText = "";
    var strTmp = "";
    var bcheck = false;
    for (var iRow = 2; iRow < document.all["dgSchedule"].rows.length; iRow++) {
        strEmptyText = "";
        if (document.all["dgSchedule__ctl" + iRow + "_txPlan"].value != "" && document.all["dgSchedule__ctl" + iRow + "_txDateS"].value != "" && document.all["dgSchedule__ctl" + iRow + "_txDateE"].value != "") {
            bcheck = true;
            document.all["dgSchedule__ctl" + iRow + "_txDateS"].value = jf_PADL(document.all["dgSchedule__ctl" + iRow + "_txDateS"].value, 7, "0");
            document.all["dgSchedule__ctl" + iRow + "_txDateE"].value = jf_PADL(document.all["dgSchedule__ctl" + iRow + "_txDateE"].value, 7, "0");
            if (document.all["dgSchedule__ctl" + iRow + "_txDateS"].value > document.all["dgSchedule__ctl" + iRow + "_txDateE"].value) {
                strTmp = document.all["dgSchedule__ctl" + iRow + "_txDateS"].value;
                document.all["dgSchedule__ctl" + iRow + "_txDateS"].value = document.all["dgSchedule__ctl" + iRow + "_txDateE"].value;
                document.all["dgSchedule__ctl" + iRow + "_txDateE"].value = strTmp;
            }
        }
        else if (document.all["dgSchedule__ctl" + iRow + "_txPlan"].value == "" && document.all["dgSchedule__ctl" + iRow + "_txDateS"].value == "" && document.all["dgSchedule__ctl" + iRow + "_txDateE"].value == "") {
            blEmptyRow = true;
            if (iRow == (document.all["dgSchedule"].rows.length - 1)) {
                if (blEmptyRow && !bcheck)
                    bcheck = CheckNotEmptyAndAlert("dgSchedule__ctl2_txPlan", "預定作業事項");
            }
        }
        else {
            if (document.all["dgSchedule__ctl" + iRow + "_txDateE"].value == "") {
                strTargetId = "dgSchedule__ctl" + iRow + "_txDateE";
                strEmptyText = "進度訖";
            }
            if (document.all["dgSchedule__ctl" + iRow + "_txDateS"].value == "") {
                strTargetId = "dgSchedule__ctl" + iRow + "_txDateS";
                if (strEmptyText != "")
                    strEmptyText = "、" + strEmptyText;
                strEmptyText = "進度起" + strEmptyText;
            }
            if (document.all["dgSchedule__ctl" + iRow + "_txPlan"].value == "") {
                strTargetId = "dgSchedule__ctl" + iRow + "_txPlan";
                if (strEmptyText != "")
                    strEmptyText = "、" + strEmptyText;
                strEmptyText = "預定作業事項" + strEmptyText;
            }
            bcheck = CheckNotEmptyAndAlert(strTargetId, strEmptyText);
            break;
        }
    }
    return bcheck;
}
function CheckNotEmptyAndAlert(argObjName, argFieldName) {
    if (document.all[argObjName].value == "") {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName + "不可為空白"])), "");
        $('#' + argObjName).focus();
        return false;
    }
    return true;
}
function CheckDate(argObj, argObjName) {
    var Obj = document.all[argObj];
    if (Obj.value != "") {
        jf_PADCHAR(Obj, 7, '0');
        if (!jf_CheckCDATE(Obj.value)) {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
            $('#' + argObj).focus();
            return false;
        }
    }
    return true;
}
//1051201 Cloud	1051181 增加檢核擬定作業事項-e
//1070717	Joe		1070678		弱掃修正Client Potential XSS--S
function htmlencode(s){
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}
//1070717	Joe		1070678		弱掃修正Client Potential XSS--E