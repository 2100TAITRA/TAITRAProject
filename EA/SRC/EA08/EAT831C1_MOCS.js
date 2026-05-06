/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2007.04.09
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 //1120411      Cloud   序34    修改刷入文號自動加入
 * -------------------------------------------------------------------------------------------------
 
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
//1120411      Cloud   序34    修改刷入文號自動加入
document.all.txDocNo.onkeydown = jf_CheckEnterPress;
var bODT130txDocNoCheckFull = false;
var strDocNoLastLen = document.all.txDocNo.value.length;
var strDocNoLastKey = "-1";

//指定DataGrid欄位
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");
var EAT831_BorList = new Object();
EAT831_BorList.Info = new Array();
var EAT831_DocInfoList = new Object();
var gDgInit = true;

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

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	
	if (gDgInit) {
		document.all.dg1.children[0].childNodes[0].style.backgroundColor = "#5f9cc5";
		document.all.dg1.children[0].childNodes[0].style.textAlign = "center";
		document.all.dg1.children[0].childNodes[0].style.border = "1";
		document.all.dg1.children[0].childNodes[0].setAttribute("rules", "col");
		document.all.dg1.children[0].childNodes[1].remove();
		gDgInit = false;
		document.all["tbSelect"].className = "hide";
        //強制登錄時不會有單號-
		if (document.all["h_BorNo"].value != "NONE") {
		    var SearchParam = new Array(2);
		    SearchParam[0] = document.all["SourceNo"].value;
		    SearchParam[1] = document.all["h_BorNo"].value;
		    //透過AJAX 建立畫面

		    EAT831_BorList = EA08.EAT831C1_MOCS.SearchProcDatabyBorNo(SearchParam).value;
		    if (EAT831_BorList.strErrMsg != "")
		        alert(EAT831_BorList.strErrMsg);
		    else {
		        if (EAT831_BorList.bHasData == true) {
		            document.all.dg1.className = "";
		            document.all.tbSelect.className = "";
		            fnbulideDG();
		        }
		        else
		            EAT831_BorList.Info = new Array();
		    }
		}
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/

function ClientButtonControl(event)
{
  
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	Page_BlockSubmit = true;
	xObjectName = event.target.id;
	switch (xObjectName)
	{
		case "btAddDocNo":
			//檢核公文不可為空
			if (document.all["txDocNo"].value == "") {
				alert('文/冊號不可為空。');
				return;
			}
			//檢核公文是否存在
			var DgLength = document.all.dg1.rows.length;
			for (var j = 1; j < DgLength; j++) {
			    if (document.all["dg1__ctl" + j + "_lbDocNo"] && document.all["dg1__ctl" + j + "_lbDocNo"].textContent == document.all["txDocNo"].value) {
				    alert('文/冊號已存在於下方捲動區，不可加入。');
					return;
				}
			}
			var SearchParam = new Array(2);
			//new string[7] { u_UserInfo.SOURCE_ORGNO, txDateS.Text, txDateE.Text, txDocNo.Text, txRemarkS.Text, txRemarkE.Text, strAttType };strAttType0:光碟、1:大附
			SearchParam[0] = document.all["SourceNo"].value;
			SearchParam[1] = document.all["txDocNo"].value;
			var AddObj = EA08.EAT831C1_MOCS.SearchProcData(SearchParam).value;
			if (AddObj.strErrMsg != "")
			    alert(AddObj.strErrMsg);
			else {
			    document.all.dg1.className = "";
			    document.all.tbSelect.className = "";
			    EAT831_DocInfoList = AddObj;
			    EAT831_BorList.Info[EAT831_BorList.Info.length] = EAT831_DocInfoList;
			    document.all["txDocNo"].value = "";
			    fnbulideDG();
			}
			document.all["txDocNo"].focus();


			break;
		case "btSelectAll":
			SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteErrDoc":
			//檢核至少需勾選一個
			Page_BlockSubmit = true;
			var hasKeepData = false;
			if (CheckDgCBox()) {
				for (var i = 1; i < document.all.dg1.rows.length; i++) {
					//將保留資訊Keep至物件
					if (document.all["dg1__ctl" + i + "_cbSelect"].checked != true) {
						hasKeepData = true;
					}
					else//刪除物件
					{
						EAT831_BorList.Info[i - 1] = undefined;
					}
				}
				//更新物件
				DeleteRow();
				//畫面整個刪除
				$("#dg1").find("tr[Id*=Data]").remove();
				if (hasKeepData) {
					fnbulideDG();
				}
				else {
					document.all.dg1.className = "hide";
					document.all.tbSelect.className = "hide";
				}
				
			}
			break;
	}	
}
//全部選取
function SelectAll(argTableName, argCheckBoxName) {
	if (document.all[argTableName] == null)
		return;

	for (i = 1; i < document.all[argTableName].rows.length; i++) {
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		obj.checked = true;
		EAT831_BorList.Info[i - 1].Print = "1"
	}
}

//反向選取
function SelectInverse(argTableName, argCheckBoxName) {
	if (document.all[argTableName] == null)
		return;

	for (i = 1; i < document.all[argTableName].rows.length; i++) {
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		if (obj.disabled == false) {
			if (obj.checked) {
				obj.checked = false;
				EAT831_BorList.Info[i - 1].Print = "0"
			}
			else {
				obj.checked = true;
				EAT831_BorList.Info[i - 1].Print = "1"
			}
		}
	}
}

//清除選取
function SelectClear(argTableName, argCheckBoxName) {
	if (document.all[argTableName] == null)
		return;

	for (i = 1; i < document.all[argTableName].rows.length; i++) {
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		obj.checked = false;
		EAT831_BorList.Info[i - 1].Print = "0"
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
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
	xObjectName= event.target.id;
	
	switch (xObjectName) {
		case "btOpen":
			Page_BlockSubmit = true;
			break;
	    case "btSave":
			Page_BlockSubmit = true;

			if (CheckDgCBox()) {
			    //整理實際上需要儲存的資料物件
			    //計算是否全都消除
			    var DeleteCount = 0;
			    var BorInfo = "";
			    var BorSaveInfo = "";
			    for (var i = 1; i < document.all.dg1.rows.length; i++) {
			        //將資訊清除不存
			        if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
			            EAT831_BorList.Info[i - 1].BookMark = "";
			            DeleteCount++;
			        }
			        else {

			            if (BorInfo != "")
			                BorInfo += "、";
			            BorInfo += EAT831_BorList.Info[i - 1].BookMark;
			            if (BorSaveInfo != "")
			                BorSaveInfo += "|";
			            BorSaveInfo += EAT831_BorList.Info[i - 1].BookMark;

			        }
			    }
			    if (DeleteCount == EAT831_BorList.Info.length) {
			        alert("無資料不可儲存。");
			        return;
			    }
			    //強制登錄時不會有單號-
			    //回寫主畫面欄位
			    var id_nowDataGrid = document.all["h_MitemId"].value;
			    var id_secs = new Array(4);
			    id_secs = id_nowDataGrid.split("_", 4);
			    document.body.style.cursor = "wait";
			    window.status = "處理中,請稍候!!";
			    if (document.all["h_BorNo"].value == "NONE")//直接登錄模式增加取得姓名、身分證號、四角號碼
			    {
			        var param = new Array(3);
			        var idTxValue = id_secs[0] + "__" + id_secs[2] + "_txFullID";
			        var nameTxValue = id_secs[0] + "__" + id_secs[2] + "_txFullName";
			        var FourValue = id_secs[0] + "__" + id_secs[2] + "_h_txFourNo";
			        param[0] = opener.document.all[idTxValue].value;
			        param[1] = opener.document.all[nameTxValue].value;
			        param[2] = opener.document.all[FourValue].value;
			    }
			    var strRtn = EA08.EAT831C1_MOCS.SAVE(EAT831_BorList, document.all["SourceNo"].value, document.all["h_BorNo"].value, param).value;
			    if (strRtn.indexOf("ERR-") == -1) {
			        alert('儲存完畢。');
			        var idTxid = id_secs[0] + "__" + id_secs[2] + "_lbBorDetailInfo";
			        opener.document.all[idTxid].textContent = BorInfo;
			        if (document.all["h_BorNo"].value == "NONE")//直接登錄模式須回傳單號
			        {
			            var idTxValue = id_secs[0] + "__" + id_secs[2] + "_H_BorNo";
			            opener.document.all[idTxValue].value = strRtn;
			        }
			        close();
			    }
			    else {
			        alert(strRtn.split('-')[1]);
			        document.body.style.cursor = "default";
			    }
			}
			break;
	    case "btClose":
	        close();
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave()) {
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
	
	
	if(document.all["dg1"])
	{
		
		var DgLength = document.all.dg1.rows.length;
		var Count = 0;
		for(var j=1;j<DgLength;j++)
		{
			if (document.all["dg1__ctl" + j +"_cbSelect"].checked)
			{
				Count++;
				break;
			}
		}
		if (Count == 0)
			strErrMsg += "至少勾選一筆公文。";

	}
	else
		strErrMsg += "無可供預覽資料。";
	

	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	return bRtnbool;
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//建立畫面
function fnbulideDG()
{
	$("#dg1").find("tr[Id*=Data]").remove();
	for (var iDoc = 0; iDoc < EAT831_BorList.Info.length; iDoc++) {
		fnAddDgRow(EAT831_BorList.Info[iDoc]);
	}
	document.all["txDocNo"].focus();
}

function TbOnBlur(strObjName) {
    if (jf_Trim(document.all[strObjName].value) != "") {
        document.all[strObjName].value = jf_PADL(jf_Trim(document.all[strObjName].value), 7, "0");
		if (!jf_CheckCDATE(document.all[strObjName].value)) {
			if(strObjName == "txDateS")
				alert("編目日期(起)格式不正確");
			else
				alert("編目日期(迄)格式不正確");
			document.all[strObjName].focus();
		}
	}
}
function CheckDgCBox() {
	var bSelect = false;
	var strErrMsg = "";
	if (document.all.dg1.rows.length > 1) {
	}
	else {
		strErrMsg += "無資料，不可儲存。";
	}
	if (strErrMsg != "")
	    alert(strErrMsg);
	else
	    bSelect = true;

	return bSelect;
}

function fnAddDgRow(argObj,argRow) {
	var rowCnt = document.all.dg1.rows.length;
	//設定row的背景色
	//create row
	var row = document.createElement("TR");
	row.id = "Data" + rowCnt.toString();
	//create column
	//序
	var colSeq = document.createElement("TD");
	colSeq.setAttribute("align", "middle");
	colSeq.setAttribute("nowrap", "nowrap");
	colSeq.style.width = "1.5em";
	colSeq.className = "InputFieldLabel";
	colSeq.innerText = rowCnt;
	//選
	var cselect = document.createElement("TD");
	cselect.setAttribute("align", "middle");
	cselect.setAttribute("nowrap", "nowrap");
	cselect.style.width = "1.5em";

	var cspelect = document.createElement("INPUT");
	cspelect.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_cbSelect";
	cspelect.setAttribute("type", "checkbox");
	cspelect.setAttribute("onclick", "javascript:SetPrint()");
	if (argObj.Print == "1")
		cspelect.setAttribute("checked", "true");
	cselect.appendChild(cspelect);

	//文/冊號
	var colDoc = document.createElement("TD");
	colDoc.setAttribute("align", "middle");
	colDoc.setAttribute("nowrap", "nowrap");
	colDoc.style.width = "15em";
	var cspanDoc = document.createElement("SPAN");
	cspanDoc.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_lbDocNo";
	cspanDoc.textContent = argObj.BookMark;
	cspanDoc.className = "InputFieldLabel";
	colDoc.appendChild(cspanDoc);
	
	
	//-案由
	/*var cFromSubject = document.createElement("TD");
	cFromSubject.setAttribute("align", "middle");
	cFromSubject.setAttribute("nowrap", "nowrap");
	cFromSubject.style.width = "25em";
	
	//
	var spanFromSubject = document.createElement("SPAN");
	spanFromSubject.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_lbSubject";
	spanFromSubject.textContent = htmlencode(argObj.Subject);
	spanFromSubject.style.width = "95%";
	cFromSubject.appendChild(spanFromSubject);*/

	var cFromSubject = document.createElement("TD");
	cFromSubject.setAttribute("align", "middle");
	cFromSubject.setAttribute("nowrap", "nowrap");
	cFromSubject.style.width = "25em";
	if (argObj.Subject.length > 25)
	    cFromSubject.style.height = "4em";

    //
	var spanFromSubject = document.createElement("textarea");
	spanFromSubject.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_txSubject";
	spanFromSubject.value = htmlencode(argObj.Subject);
	spanFromSubject.style.height = "inherit";
	spanFromSubject.style.width = "95%";
	spanFromSubject.className = "PopUp";
	cFromSubject.appendChild(spanFromSubject);
	
	
	row.appendChild(colSeq);//序
	row.appendChild(cselect);//選
	row.appendChild(colDoc);//文號
	row.appendChild(cFromSubject);//案由
	if (argRow != undefined)
	{
		document.all.dg1.children[0].children[argRow].after(row);
	}
	else
		document.all.dg1.children[0].appendChild(row);
	
}
function htmlencode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}
function SetFromInfo() {
	Page_BlockSubmit = true;
	var xObjectName = event.target.id;
	var btSubjectIndex = xObjectName.substring(8, xObjectName.indexOf("_txSubject"));
	EAT831_BorList.Info[btSubjectIndex - 1].Subject = document.all[xObjectName].value;
}
function SetDescInfo() {
	Page_BlockSubmit = true;
	var xObjectName = event.target.id;
	var bttxDescIndex = xObjectName.substring(8, xObjectName.indexOf("_txDesc"));
	EAT831_BorList.Info[bttxDescIndex - 1].Desc = document.all[xObjectName].value;
}
function SetPrint() {
	Page_BlockSubmit = true;
	var xObjectName = event.target.id;
	var cSelectIndex = xObjectName.substring(8, xObjectName.indexOf("_cbSelect"));
	if (document.all[xObjectName].checked)
		EAT831_BorList.Info[cSelectIndex - 1].Print = "1";
	else
		EAT831_BorList.Info[cSelectIndex - 1].Print = "0";
}

function AddCopyNewRow(argTargetRow,argCopyObj) {

	var TempEAT831_BorList = new Object();
	TempEAT831_BorList.Info = new Array();
	var NewRowCount = EAT831_BorList.Info.length+1;

	for (i = 0; i < NewRowCount; i++) {

		if (i < argTargetRow) {
			TempEAT831_BorList.Info[i] = EAT831_BorList.Info[i]; /*迴圈變數i小於插入值位置Index時,每一個元素所放的位置不變*/
		}
		else if (i == argTargetRow) {
			TempEAT831_BorList.Info[i] = argCopyObj; //i等於Index時,將插入值賦給陣列b
		}
		else {
			TempEAT831_BorList.Info[i] = EAT831_BorList.Info[i - 1]; /*因為插入了一個新的元素,所以插入位置後的每一個元素所存放的位置都要向後移一位*/
		}

	}
	EAT831_BorList = TempEAT831_BorList;
}
//function DeleteRow(argTargetRow) {
//刪除功能鈕
function DeleteRow() {
	var TempEAT831_BorList = new Object();
	TempEAT831_BorList.Info = new Array();
	/*var NewRowCount = EAT831_BorList.Info.length - 1;

	for (i = 0; i < NewRowCount; i++) {

		if (i < argTargetRow) {
			TempEAT831_BorList.Info[i] = EAT831_BorList.Info[i];
		}
		else {
			TempEAT831_BorList.Info[i] = EAT831_BorList.Info[i + 1];
		}
	}*/
	var TempObjInx = 0;
	for (i = 0; i < EAT831_BorList.Info.length; i++) {
		if (EAT831_BorList.Info[i] != undefined) {
			TempEAT831_BorList.Info[TempObjInx] = EAT831_BorList.Info[i];
			TempObjInx++;
		}
	}
	EAT831_BorList = TempEAT831_BorList;
}
//1120411      Cloud   序34    修改刷入文號自動加入-S
function jf_CheckEnterPress() {
    if (event.keyCode == 13)
        txDocNo_onkeydown();
}
function txDocNo_onkeydown() {

    console.log('txDocNo keydown 現行長度:' + document.all.txDocNo.value.length + '|原始長度:' + strDocNoLastLen + '|' + document.all.txDocNo.value);
    strDocNoLastLen = jf_Trim(document.all.txDocNo.value).length;
    if (strDocNoLastLen < 10) {
        document.all["txDocNo"].focus();
        return;
    }
    //1071121 Kevin	支援非英數輸入法支援條碼
    if (event.keyCode == "229" && document.all.txDocNo.value.length < document.all.txDocNo.maxLength) {

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

    var strCheckDocNo = jf_Trim(document.all["txDocNo"].value);
    var bIsDocNoExist = false;
    if (document.all.dg1)
        for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++) {
            if (document.all["dg1__ctl" + iRow + "_lbDocNo"] && document.all["dg1__ctl" + iRow + "_lbDocNo"].textContent == strCheckDocNo) {
                bIsDocNoExist = true;
                break;
            }
        }
    if (!bIsDocNoExist) {
        if (bODT130txDocNoCheckFull) {
            console.log('bODT130txDocNoCheckFull=false');
            bODT130txDocNoCheckFull = false;
            return;
        }
        Page_BlockSubmit = false;
        var SearchParam = new Array(2);
        SearchParam[0] = document.all["SourceNo"].value;
        SearchParam[1] = document.all["txDocNo"].value;
        var AddObj = EA08.EAT831C1_MOCS.SearchProcData(SearchParam).value;
        if (AddObj.strErrMsg != "")
            alert(AddObj.strErrMsg);
        else {
            document.all.dg1.className = "";
            document.all.tbSelect.className = "";
            EAT831_DocInfoList = AddObj;
            EAT831_BorList.Info[EAT831_BorList.Info.length] = EAT831_DocInfoList;
            document.all["txDocNo"].value = "";
            fnbulideDG();
        }
    }
    else {
        alert("公文文號已存在，無法加入");
        document.all["txDocNo"].value = "";        
    }
    if (event.keyCode == 13) {
        document.all["txDocNo"].focus();
        event.keyCode = 9;
    }
	//1120413 Cloud template也會註冊js keyperss事件，會造成被抓走故延後focus
	window.setTimeout(function () { document.all["txDocNo"].focus() }, 1);
    
}
//1120411      Cloud   序34    修改刷入文號自動加入-E



	


