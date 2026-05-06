/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.08.24
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 103.11.12	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 105.11.10	Joe		1051136	新增櫥位號欄位預覽前檢查
 * 106.02.07    Justin  1050087 二代公文修改
 * 109.04.16	Kevin_C	1090037	增加排序連動
 * 109.10.26    Leslie  1090561 信保基金客製化功能調整
 * 110.04.14	Cloud	1100142	新增信保客製化AKS502
 * 1110811		Joe		1110407	新增可自行輸入調案人選項
 * 1140708		Andy	1140238	新增分頁方式：未勾選檔管局格式才啟用
 * 1140903		Daniel  1141137		(外貿)修改案次號欄位與呈現畫面以符合外貿協會現行檔號邏輯
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060207  Justin [1050087] 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060207  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060207  Justin [1050087] 二代公文修改
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
		case 'btKeyHelp':
		var k1 = 0; // document.all["dlBorType"].value;

			// xOldKey = document.all["TextBox2"].value;
			
		var strUrl = "AKS502.aspx?rtnObj=lbReturnValue&k1=" + k1;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			//1100325 Cloud 1100142 一並修改新增信保AKS502
		if (document.all["OrgNickName"].value == "SMEG")
			strUrl = "AKS502_SMEG.aspx?rtnObj=lbReturnValue&k1=1";
		jf_OpenChildWin(strUrl, "AKS502_customwindow", 700, 500 );
		break;
		/*
		case "":
			break;
		*/
		/*1060207  Justin [1050087] 二代公文修改
		case "btCalendarS":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txDateBegin, event.screenX, event.screenY);
            break;
		case "btCalendarE":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txDateEnd, event.screenX, event.screenY);
            break;
            case "Imagebutton1":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txRetDateS, event.screenX, event.screenY);
            break;
		case "Imagebutton2":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txRetDateE, event.screenX, event.screenY);
            break;
        */
	}	
}

function jf_checkNullNo()	// 至少一個不為空就傳回 false
{
	if (document.all["txDocNo"].value != "")
		return false;
	if (document.all["txBorNo"].value != "")
		return false;
	if (document.all["txDateBegin"].value != "" || document.all["txDateEnd"].value != "")
		return false;
	//1140903		Daniel  1141137(外貿)修改案次號欄位與呈現畫面以符合外貿協會現行檔號邏輯
	var strFileCase = "";
	if (document.all["OrgNickName"].value == "TAITRA")
		strFileCase = document.all["txCountryNo"].value + document.all["txDivisionNo"].value + document.all["txProductNo"].value;
	else
		strFileCase = document.all["txFileCase"].value;
	//if (document.all["txFileYr"].value != "" && document.all["txFileCls"].value != "" && document.all["txFileCase"].value != "" && document.all["txFileVol"].value != "" && document.all["txFileSeq"].value != "")
	if (document.all["txFileYr"].value != "" && document.all["txFileCls"].value != "" && strFileCase != "" && document.all["txFileVol"].value != "" && document.all["txFileSeq"].value != "")
		return false;
		if (document.all["txRetDateS"].value != "" || document.all["txRetDateE"].value != "")
		return false;
		if (document.all["OrgNickName"])
		{
			if (document.all["OrgNickName"].value == "MOTC")
			{
				if (document.all["txStockNoS"].value != "" || document.all["txStockNoE"].value != "")
					return false;
			}

		}
	//1110811	Joe		1110407		當狀態選未歸還且調案人/年度號不為空，則不檢核其他條件
	if((document.all.ComboBoxEmp_Text.value != "" || document.all.txFileYr.value != "") && document.all.rbRtnN.checked == true)
		return false;

	document.all["txDocNo"].focus();
	
	return true;		// 大家都空就傳回 true
}

//1060207  Justin [1050087] 二代公文修改 
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
	//取得今天日期
	var now = new Date();
	var strToday = ((now.getFullYear()-1911 < 100 ) ? ('0'+(now.getFullYear()-1911)) : ((now.getFullYear()-1911)+'') +'')+
		((now.getMonth()+1) < 10 ? ('0'+(now.getMonth()+1)) : ((now.getMonth()+1) +''))+
		(now.getDate() < 10 ? ('0'+now.getDate()) : now.getDate());
	if (jf_Trim(document.all["txDateBegin"].value) != '' || jf_Trim(document.all["txDateEnd"].value) != '')
	{
		if (jf_Trim(document.all["txDateBegin"].value) != '' && jf_Trim(document.all["txDateEnd"].value) == '')
			document.all["txDateEnd"].value = strToday;
		if (jf_Trim(document.all["txDateBegin"].value) == '' && jf_Trim(document.all["txDateEnd"].value) != '')
			document.all["txDateBegin"].value = strToday;
		if (document.all["txDateBegin"].value > document.all["txDateEnd"].value)
		{
			var tmp = document.all["txDateEnd"].value;
			document.all["txDateEnd"].value =  document.all["txDateBegin"].value
			document.all["txDateBegin"].value = tmp;
		}
	}
    //1060207  Justin [1050087] 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			break;
		//1091026	Leslie[1090561]	信保基金客製化功能調整
		case "btSMEGBorList":
		//1090416	Kevin_C	1090037	增加匯出ODS
		case "btODS":
		//1110819	Joe		1110407	新增匯出Excel功能
		case "btExcel":
		case "btPrint":
		case "btPreview":
			//1110811	Joe		1110407		調整觸發時機，已便併入檢核判斷
			UserOnBlur(document.all.ComboBoxEmp);
			if (jf_checkNullNo() == true)
			{
				alert("文號、調案單號、調案日期及歸還日期至少輸入一條件");
				Page_BlockSubmit = true;
			}
			//1140708	Andy	1140238	增加檢核未勾選調案方式時跳出提示訊息
			else if (CbBorrowCheck() == false) {
				alert("至少需選擇一種調案方式");
				Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = false;
			//0950305 CAESAR 940952[觀光局]
			//切換combobox後,立刻點選btPrint,btPreview將導致
			//ComboBoxEmp的onblur事件未被正確觸發
			//1110811	Joe		1110407		調整觸發時機，已便併入檢核判斷
			//UserOnBlur(document.all.ComboBoxEmp);		
			//1051110	Joe		1051136		檢查櫥位號欄位起訖
			fnCheckStockNo();
		    //1060207  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

//1051110	Joe		1051136		檢查櫥位號欄位起訖--S
function fnCheckStockNo()
{
	var StockS = document.all.txStockNoS;
	var StockE = document.all.txStockNoE;
	var temp;
	
	if(StockS.value != "" && StockE.value != "" && StockS.value > StockE.value)
	{
		temp = StockS.value;
		StockS.value = StockE.value;
		StockE.value = temp;
	}
	else if(StockS.value != "" && StockE.value == "")
		StockE.value = StockS.value;
	else if(StockE.value != "" && StockS.value == "")
		StockS.value = StockE.value;
}
//1051110	Joe		1051136		檢查櫥位號欄位起訖--E

function CallBack(argCallerId)
{
	if (argCallerId == "AKS502")
	{
		document.all["txBorNo"].value = document.all["lbReturnValue"].options[0].value;
		document.all["autoPB"].value = "1";
	    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
		IsServerHandling = true;
		__doPostBack("", ""); //for .NET Framework 1.1
	}
	//清空lbReturnValue物件
	
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	
}

function ClientOnLoad()
{
	//1090416	Kevin_C	1090037		設定預設值
	if (document.all["OrgNickName"].value == "NCHU")
	{
		if (document.all.cbFM.checked) {
			document.all.rbFileNo.disabled = true;
			document.all.rbBorNo.disabled = true;
		}
		else {
			document.all.rbFileNo.disabled = false;
			document.all.rbBorNo.disabled = false;
		}
	}
	//1140829  Daniel  1141137		(外貿)外貿目次號改為四碼
	if (document.all['OrgNickName'].value == 'TAITRA') {
		txFileSeq.setAttribute("maxlength", "4");
		txFileSeq.style.width = "2.5em";

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
    //1060207  Justin [1050087] 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function UserOnBlur(Userobj)
{
	//1110811	Joe		1110407		新增可自行輸入調案人選項--S
	/*
	if(Userobj.options == null)
		return;
	if(Userobj.options.length == 0)
		return;
	var index = Userobj.selectedIndex;
	if(index == -1)
		return;
	document.all["txUserValue"].value =  Userobj.options[index].value;
	*/
	var EmpName = document.all.ComboBoxEmp_Text.value;
	var bEmp = false;
	if(EmpName != "")
		bEmp = true;
	else
		document.all["txEmpName"].value = "";
	if(Userobj.options == null && !bEmp)
		return;
	if(Userobj.options.length == 0 && !bEmp)
		return;
	var index = Userobj.selectedIndex;
	if(index == -1 && !bEmp)
		return;
	if(EmpName != ""){
		if(index != -1 && index != 0)
		{
			document.all["txUserValue"].value =  Userobj.options[index].value;
			document.all["txEmpName"].value = "";
		}
		else
		{
			document.all["txEmpName"].value = EmpName;
		}
	}
	else
	{
		document.all["txUserValue"].value = "";
		document.all["txEmpName"].value = "";
	}
	//1110811	Joe		1110407		新增可自行輸入調案人選項--E
}
//1090416	Kevin_C	1090037	增加排序連動
function CbOnClick()
{
	if(document.all.cbFM.checked)
	{
		document.all.rbBorNo.checked = true;
		document.all.rbFileNo.disabled = true;
		document.all.rbBorNo.disabled = true;
		//1140707	Andy	1140238	新增分頁方式：未勾選檔管局格式才啟用
		document.all.rbChangePageNone.checked = true;
		document.all.rbChangePageDept.disabled = true;
		document.all.rbChangePageUser.disabled = true;
		document.all.rbChangePageNone.disabled = true;
	}
	else
	{
		document.all.rbFileNo.checked = true;
		document.all.rbFileNo.disabled = false;
		document.all.rbBorNo.disabled = false;
		//1140707	Andy	1140238	新增分頁方式：未勾選檔管局格式才啟用
		document.all.rbChangePageDept.disabled = false;
		document.all.rbChangePageUser.disabled = false;
		document.all.rbChangePageNone.disabled = false;
	}
}
//1140708	Andy	1140238	增加檢核未勾選調案方式時跳出提示訊息
function CbBorrowCheck() {
	if (document.all.cbOriginBorrow.checked == false && document.all.cbOnlineBorrow.checked == false && document.all.cbCopyBorrow.checked == false)
		return false;

	return true;
}
//1140903  Daniel  1141137	(外貿)以國別、處別、細目號/產品別欄位取代案次號
function TbOnBlur(argTextBox) {
	if (argTextBox == "txCountryNo" || argTextBox == "txDivisionNo" || argTextBox == "txProductNo") {
		var strTarget = document.all[argTextBox].value;
		if (strTarget != "") {
			if (strTarget.length < 3) {
				if (argTextBox == "txDivisionNo")
					strTarget = jf_PADL(strTarget, 3, '0');
				else
					strTarget = jf_PADR(strTarget, 3, '0');
				document.all[argTextBox].value = strTarget;
			}
		}
	}
}