/*
DATE	SA		PRG		MGR_NO		DESC
0951022	Stella	Zoey	950838		當讀入的文號尚未送達時出現本份公文以點收之錯誤訊息
1000216	Zola	Linda	1000153		新增ODI110可用公文號區間查詢（調整相關有呼叫之程式修改畫面大小）
1050718 David   Zen     1050087     二代公文修改
1050818 Kevin   Zen     1050700     弱掃XSS修正
 */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050718 Zen 1050087  二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg() {
    //1050718 Zen 1050087  二代公文修改
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e) {
    //var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        //查詢子視窗
        case "btHelp":
            var strUrl = "";
            strUrl = "ODI110.aspx?rtnObj=lbReturnValue&argMode=2";
            //1000216	Linda	[1000153]	新增ODI110可用公文號區間查詢（調整相關有呼叫之程式修改畫面大小）	
            //jf_OpenChildWin(strUrl, "ODI110", 600, 400 );
            jf_OpenChildWin(strUrl, "ODI110", 900, 400);
            Page_BlockSubmit = true;
            break;
            //讀入文號條碼
        case "btInsert":
            if (document.all["txDocNo"].value == "") {
                //1050718 Zen 1050087  二代公文修改
                //document.all["txDocNo"].focus();
                $('#txDocNo').focus();
                jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["讀入文號條碼"])), "");
            }
            else
                CheckDocNo();
            Page_BlockSubmit = true;
            break;
            //全部選取
        case "btSelect":
            if (document.all["dg1"] != null) {
                for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++) {
                    if (document.all["dg1__ctl" + iRow + "_cb1"].checked == false)
                        document.all["dg1__ctl" + iRow + "_cb1"].checked = true;
                }
            }
            Page_BlockSubmit = true;
            break;
            //反向選取
        case "btChange":
            if (document.all["dg1"] != null) {
                for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++) {
                    if (document.all["dg1__ctl" + iRow + "_cb1"].checked == false)
                        document.all["dg1__ctl" + iRow + "_cb1"].checked = true;
                    else
                        document.all["dg1__ctl" + iRow + "_cb1"].checked = false;
                }
            }
            Page_BlockSubmit = true;
            break;
            //清除選取
        case "btRemove":
            if (document.all["dg1"] != null)
                btRemoveClick();
            Page_BlockSubmit = true;
            break;
            //確認文號
        case "btConfirm":
            if (document.all["dg1"] != null)
                ItemChecked();
            else
                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請先建立資料"])), "");
            Page_BlockSubmit = true;
            break;
            //若focus在txDocNo但按下btInsert會使得document.activeElement.id=="txDocNo"
        case "txDocNo":
            Page_BlockSubmit = true;
            break;
    }
}

//1050718 Zen 1050087  二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    //1050718 Zen 1050087  二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btSearch":
            Page_BlockSubmit = !ConfirmSearch();
            //1050718 Zen 1050087  二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            Page_BlockSubmit = !jf_ConfirmSave();
            //1050718 Zen 1050087  二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId) {
    if (argCallerId == "ODI110") {
        document.all["txBatchNo"].value = document.all.lbReturnValue.options[0].value;
        document.all.ToolBarSenderID.value = "btSearch";
        IsServerHandling = true;
        jf_ShowWaitState();
        //__doPostBack("tbTool",0);
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad() {
    jf_CallWS("lib/OD_LIB.asmx", "CheckDocExist", false, null);
    jf_CallWS("lib/OD_LIB.asmx", "CheckDocToBeSign", false, null);
    if (document.all["rbBatch"].checked)
        RadioButton_OnClick("rbBatch", false);
    else if (document.all["rbDept"].checked)
        RadioButton_OnClick("rbDept", false);
    else if (document.all["rbDoc"].checked)
        RadioButton_OnClick("rbDoc", false);

    jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, null);
    //[需求單955106] 初始時先儲存下拉式選單的Text、Value、所有選項Value  Charles 0951019
    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_Sect"].value = document.all["dlSect_Text"].value;
    document.all["H_User"].value = document.all["dlUser_Text"].value;
    document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
    document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
    document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);

    if (document.all["H_OD_FLOW_TYPE"].value == "0") {
        document.all["dlSect_Container"].className = "hide";
        //1050718 Zen 1050087  二代公文修改
        //document.all["dlUser_Container"].className = "InputFieldText";
        document.all["dlUser_Container"].className = "custom-combobox";
    }
    else if (document.all["H_OD_FLOW_TYPE"].value == "1") {
        document.all["dlSect_Container"].className = "hide";
        document.all["dlUser_Container"].className = "hide";
    }
    else if (document.all["H_OD_FLOW_TYPE"].value == "2") {
        //1050718 Zen 1050087  二代公文修改
        //document.all["dlSect_Container"].className = "InputFieldText";
        document.all["dlSect_Container"].className = "custom-combobox";
        document.all["dlUser_Container"].className = "hide";
    }

    //無值不顯示
    jf_HandleComboxStatus("dlSect");
    jf_HandleComboxStatus("dlUser");

    //顯示錯誤訊息
    ShowMsg();

    //1050718 Zen 1050087  二代公文修改
    if (!document.all.dg1)
        document.all.tbSelect.style.display = "none";
    else {
        document.all.tbSelect.style.display = "";
        document.all.dg1.style.display = "";
        document.all.dg1head.style.display = "";
    }
}

function OnWSResult(argResult) {
    var bExist = false;
    if (argResult.id == wsCheckDocID) {
        if (!argResult.error) {
            if (argResult.value.DocNo != "") {
                //1050718 Zen 1050087  二代公文修改
                document.all.tbSelect.style.display = "";

                if (document.all["dg1"] == null)
                    CreateDataGrid(argResult.value);
                else {
                    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++) {	//檢查是否存在
                        //1050718 Zen 1050087  二代公文修改
                        //if (document.all["dg1__ctl" + iRow + "_H_Msg"].innerText == argResult.value.MsgID)
                        if (document.all["dg1__ctl" + iRow + "_H_Msg"].innerHTML == argResult.value.MsgID) {
                            bExist = true;
                            break;
                        }
                    }
                    if (bExist)
                        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公文文號已存在"])), "");
                    else
                        InsertRows(argResult.value);
                }
            }
            else {
                //zoey [950838, date:951019]
                if (argResult.value.Subject != "")
                    alert(argResult.value.Subject);
                else
                    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前非本單位之公文"])), "");
            }
        }
    }
}

//新增一筆Row
function InsertRows(argObj) {
    var InsertRow;
    var len;

    InsertRow = document.all["dg1"].insertRow();
    len = document.all["dg1"].rows.length;	//先Insert so長度已+1

    //ID整除==單數序
    //0960130 Stella 調整DataGrid美工
    if (len % 2 == 0)
        //InsertRow.style.backgroundColor = "#F7F7DE";
        InsertRow.className = "DgItemStyle";
    else
        InsertRow.className = "DgAlternating";
    //置中
    InsertRow.style.textAlign = "Center";

    //序
    var lbNo = document.createElement("span");
    lbNo.setAttribute("id", "dg1__ctl" + len + "_lbNo");

    //1050718 Zen 1050087  二代公文修改
    //lbNo.setAttribute("innerText", len - 1);
    lbNo.innerHTML = len - 1;

    InsertRow.insertCell(0).appendChild(lbNo);
    lbNo.style.color = "Black";

    //訊息代號(hide)
    var lbMsg = document.createElement("span");
    lbMsg.setAttribute("id", "dg1__ctl" + len + "_H_Msg");

    //1050718 Zen 1050087  二代公文修改
    //lbMsg.setAttribute("innerText", argObj.MsgID);
	//1120915	Joe		1120709		弱掃修正Client Potential XSS
    // lbMsg.innerHTML = argObj.MsgID;
    lbMsg.innerHTML = htmlencode(argObj.MsgID);

    lbMsg.setAttribute("className", "hide");
    InsertRow.cells[0].appendChild(lbMsg);
    lbMsg.style.color = "Black";
    lbMsg.className = "hide";

    //選取
    var cb1 = document.createElement("input");
    cb1.setAttribute("type", "checkbox");
    cb1.setAttribute("id", "dg1__ctl" + len + "_cb1");
    InsertRow.insertCell(1).appendChild(cb1);
    cb1.style.color = "Black";

    //公文文號
    var txDoc = document.createElement("input");
    txDoc.setAttribute("type", "text");
    txDoc.setAttribute("value", argObj.DocNo);
    txDoc.setAttribute("id", "dg1__ctl" + len + "_txDoc");
    InsertRow.insertCell(2).appendChild(txDoc);
    txDoc.style.width = "100px";
    txDoc.style.color = "Black";
    txDoc.className = "TextLabel";
    txDoc.tabIndex = -1;
    txDoc.readOnly = true;

    //送文單位
    var lbIssueDept = document.createElement("span");
    lbIssueDept.setAttribute("id", "dg1__ctl" + len + "_lbIssueDept");
    //1050718 Zen 1050087  二代公文修改
    //lbIssueDept.setAttribute("innerText", argObj.DeptName);
	//1120915	Joe		1120709		弱掃修正Client Potential XSS
    // lbIssueDept.innerHTML = argObj.DeptName;
    lbIssueDept.innerHTML = htmlencode(argObj.DeptName);
    InsertRow.insertCell(3).appendChild(lbIssueDept);
    lbIssueDept.style.color = "Black";

    //送文別
    var lbType = document.createElement("span");
    lbType.setAttribute("id", "dg1__ctl" + len + "_lbType");
    //1050718 Zen 1050087  二代公文修改
    //lbType.setAttribute("innerText", argObj.TxName);
	//1120915	Joe		1120709		弱掃修正Client Potential XSS
    // lbType.innerHTML = argObj.TxName;
    lbType.innerHTML = htmlencode(argObj.TxName);
    InsertRow.insertCell(4).appendChild(lbType);
    lbType.style.color = "Black";

    //承辦單位
    var lbDept = document.createElement("span");
    lbDept.setAttribute("id", "dg1__ctl" + len + "_lbDept");
    //1050718 Zen 1050087  二代公文修改
    //lbDept.setAttribute("innerText", argObj.DeptName);
	//1120915	Joe		1120709		弱掃修正Client Potential XSS
    // lbDept.innerHTML = argObj.DeptName;
    lbDept.innerHTML = htmlencode(argObj.DeptName);
    InsertRow.insertCell(5).appendChild(lbDept);
    lbDept.style.color = "Black";

    //主旨
    var txSubject = document.createElement("input");
    txSubject.setAttribute("type", "text");
    txSubject.setAttribute("value", argObj.Subject);
    txSubject.setAttribute("id", "dg1__ctl" + len + "_txSubject");
    InsertRow.insertCell(6).appendChild(txSubject);
    txSubject.style.width = "150px";
    txSubject.style.color = "Black";
    txSubject.className = "TextLabel";
    txSubject.tabIndex = -1;
    txSubject.readOnly = true;
}

//create 一個dg1的Title
function CreateDataGrid(argObj) {
    var oTable = document.createElement("table");
    oTable.setAttribute("id", "dg1");
    oTable.setAttribute("border", "1");
    oTable.setAttribute("cellSpacing", "0");
    oTable.setAttribute("cellPadding", "4");
    oTable.setAttribute("rules", "cols");
    document.all["DIV1"].appendChild(oTable);
    oTable.style.color = "White";
    oTable.style.backgroundColor = "White";
    oTable.style.borderColor = "#DEDFDE";
    oTable.style.borderWidth = "1px";
    oTable.style.borderStyle = "None";
    oTable.style.height = "12px";
    oTable.style.width = "624px";
    oTable.style.borderCollapse = "collapse";

    var InsertRow;
    InsertRow = document.all["dg1"].insertRow();
    //0960130 Stella 調整DataGrid美工
    //InsertRow.style.backgroundColor = "#6B696B";
    InsertRow.className = "DgHeader";
    //1050722 Zen 1050087  二代公文修改
    InsertRow.setAttribute("align", "Center");

    //序
    var lbNo = document.createElement("tHead");
    //1050718 Zen 1050087  二代公文修改
    //lbNo.setAttribute("innerText", "序");
    lbNo.innerHTML = "序";
    lbNo.setAttribute("align", "Center");
    InsertRow.insertCell(0).appendChild(lbNo);
    lbNo.style.width = "15px";
    lbNo.style.fontWeight = "bold";

    //選取
    var cb1 = document.createElement("tHead");
    //1050718 Zen 1050087  二代公文修改
    //cb1.setAttribute("innerText", "選取");
    cb1.innerHTML = "選取";
    cb1.setAttribute("align", "Center");
    InsertRow.insertCell(1).appendChild(cb1);
    cb1.style.fontWeight = "bold";

    //公文文號
    var txDoc = document.createElement("tHead");
    //1050718 Zen 1050087  二代公文修改
    //txDoc.setAttribute("innerText", "公文文號");
    txDoc.innerHTML = "公文文號";
    txDoc.setAttribute("align", "Center");
    InsertRow.insertCell(2).appendChild(txDoc);
    txDoc.style.fontWeight = "bold";

    //送文單位
    var lbIssueDept = document.createElement("tHead");
    //1050718 Zen 1050087  二代公文修改
    //lbIssueDept.setAttribute("innerText", "送文單位");
    lbIssueDept.setAttribute("align", "Center");
    lbIssueDept.innerHTML = "送文單位";
    InsertRow.insertCell(3).appendChild(lbIssueDept);
    lbIssueDept.style.fontWeight = "bold";

    //送文別
    var lbType = document.createElement("tHead");
    //1050718 Zen 1050087  二代公文修改
    //lbType.setAttribute("innerText", "送文別");
    lbType.innerHTML = "送文別";
    lbType.setAttribute("align", "Center");
    InsertRow.insertCell(4).appendChild(lbType);
    lbType.style.fontWeight = "bold";

    //承辦單位
    var lbDept = document.createElement("tHead");
    //1050718 Zen 1050087  二代公文修改
    //lbDept.setAttribute("innerText", "承辦單位");
    lbDept.innerHTML = "承辦單位";
    lbDept.setAttribute("align", "Center");
    InsertRow.insertCell(5).appendChild(lbDept);
    lbDept.style.fontWeight = "bold";

    //主旨
    var lbSubject = document.createElement("tHead");
    //1050718 Zen 1050087  二代公文修改
    //lbSubject.setAttribute("innerText", "主旨");
    lbSubject.innerHTML = "主旨";
    lbSubject.setAttribute("align", "Center");
    InsertRow.insertCell(6).appendChild(lbSubject);
    lbSubject.style.fontWeight = "bold";

    //Insert Rows
    InsertRows(argObj);
}

//1050718 Zen 1050087  二代公文修改
//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
//{
//	var index	= document.all[argDDLId].selectedIndex;
//	var obj		= document.all[argDDLId].options[index];

//	document.all[argTextBoxId].value = obj.text;
//	document.all[argLabelId].innerText = obj.value;
//}

function ReturnValue() {
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

//argType:是否要confirm訊息
function RadioButton_OnClick(argCheck, argType) {
    var srcElementID;
    //取出前次的RadioButton
    if (document.all["txBatchNo"].readOnly == false) srcElementID = "rbBatch";
    else if (document.all["txSDate"].readOnly == false) srcElementID = "rbDept";
    else if (document.all["txDocNo"].readOnly == false) srcElementID = "rbDoc";

    if (argType) {
        if (srcElementID != argCheck)	//點到不同才confirm
        {
            argType = window.confirm("切換模式將會把待點收公文捲動區中資料清空，是否要繼續?");
            if (argType) {
                if (document.all["dg1"] != null) {
                    var len = document.all["dg1"].rows.length;
                    for (var iRow = 0; iRow < len - 1; iRow++)
                        document.all["dg1"].deleteRow(1);
                }
            }
            else {
                event.returnValue = false;
                document.all[srcElementID].checked = true;
                return;
            }
        }
    }
    switch (argCheck) {
        case "rbBatch":
            //送文批號
            document.all["txBatchNo"].readOnly = false;
            document.all["txBatchNo"].style.backgroundColor = "";
            document.all["btHelp"].disabled = false;
            //送文單位

            //1050722 Zen 1050087  二代公文修改
            //document.all["dlDept_Container"].disabled = true;
            //document.all["dlDept_Container"].Text.readOnly = true;
            //document.all["dlDept_Container"].Text.style.backgroundColor = "LightGrey";
            $('#dlDept').combobox('setDisable');

            document.all["txSDate"].readOnly = true;
            document.all["txSDate"].style.backgroundColor = "LightGrey";
            document.all["txEDate"].readOnly = true;
            document.all["txEDate"].style.backgroundColor = "LightGrey";
            //文號
            document.all["txDocNo"].readOnly = true;
            document.all["txDocNo"].style.backgroundColor = "LightGrey";
            document.all["btInsert"].disabled = true;
            //focus
            document.all["txBatchNo"].focus();
            break;
        case "rbDept":
            //送文批號
            document.all["txBatchNo"].readOnly = true;
            document.all["txBatchNo"].style.backgroundColor = "LightGrey";
            document.all["btHelp"].disabled = true;
            //送文單位

            //1050722 Zen 1050087  二代公文修改
            //document.all["dlDept_Container"].disabled = false;
            //document.all["dlDept_Container"].Text.readOnly = false;
            //document.all["dlDept_Container"].Text.style.backgroundColor = "";
            $('#dlDept').combobox('setEnable');

            document.all["txSDate"].readOnly = false;
            document.all["txSDate"].style.backgroundColor = "";
            document.all["txEDate"].readOnly = false;
            document.all["txEDate"].style.backgroundColor = "";
            //文號
            document.all["txDocNo"].readOnly = true;
            document.all["txDocNo"].style.backgroundColor = "LightGrey";
            document.all["btInsert"].disabled = true;
            //focus
            document.all["dlDept_Text"].focus();
            break;
        case "rbDoc":
            //送文批號
            document.all["txBatchNo"].readOnly = true;
            document.all["txBatchNo"].style.backgroundColor = "LightGrey";
            document.all["btHelp"].disabled = true;
            //送文單位

            //1050722 Zen 1050087  二代公文修改
            //document.all["dlDept_Container"].disabled = true;
            //document.all["dlDept_Container"].Text.readOnly = true;
            //document.all["dlDept_Container"].Text.style.backgroundColor = "LightGrey";
            $('#dlDept').combobox('setDisable');

            document.all["txSDate"].readOnly = true;
            document.all["txSDate"].style.backgroundColor = "LightGrey";
            document.all["txEDate"].readOnly = true;
            document.all["txEDate"].style.backgroundColor = "LightGrey";
            //文號
            document.all["txDocNo"].readOnly = false;
            document.all["txDocNo"].style.backgroundColor = "";
            document.all["btInsert"].disabled = false;
            //focus
            document.all["txDocNo"].focus();
            break;
    }

    //1050718 Zen 1050087  二代公文修改
    document.all.tbSelect.style.display = "none";
    if (document.all.dg1) {
        document.all.dg1.style.display = "none";
        document.all.dg1head.style.display = "none";
    }
}

var wsCheckDocID;
function CheckDocNo()
{
    //1050818 Zen 1050700 弱掃XSS修正
    //var strDocNo = jf_Trim(document.all["txDocNo"].value);
    var strDocNo = encodeURI(jf_Trim(document.all["txDocNo"].value));
	if (strDocNo != "")
	{
        var arWSParam = new Array(1);
        arWSParam[0] = strDocNo;
        callObj = jf_CallWS("lib/OD_LIB.asmx", "CheckDocExist", false, arWSParam);
        if (!callObj.error) {
            if (callObj.value != "-1") {
                var argWSParam = new Array(1);
                argWSParam[0] = strDocNo;
                callObj = jf_CallWS("lib/OD_LIB.asmx", "CheckDocToBeSign", false, argWSParam);
                wsCheckDocID = callObj.id;
                OnWSResult(callObj);
            }
            else
                alert("查無此公文文號");
            //jf_ShowMeg(FormatStr(jf_GetErrMsg(NoData)),"");
        }
        document.all["txDocNo"].value = "";
        //1050718 Zen 1050087  二代公文修改
        //document.all["txDocNo"].focus();
        $('#txDocNo').focus();
    }
}

function ItemChecked() {
    var strSeq = "";
    var strRow = "";
    var argSeq = new Array(2);
    var argRow = new Array(2);
    var strBuffer = "";
    var strMsg = "";
    var strDocNo = jf_Trim(document.all["txConfirm"].value);
    document.all["txConfirm"].value = "";
    //1050718 Zen 1050087  二代公文修改
    //document.all["txConfirm"].focus();
    $('#txConfirm').focus();
    if (strDocNo == "") {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請輸入文號"])), "");
        return;
    }

    for (var iRow = 2; iRow < (document.all["dg1"].rows.length + 1) ; iRow++) {
        if (document.all["dg1__ctl" + iRow + "_txDoc"].value == strDocNo) {
            document.all["dg1__ctl" + iRow + "_cb1"].checked = true;
            //1050718 Zen 1050087  二代公文修改
            //strSeq += strBuffer + document.all["dg1__ctl" + iRow + "_lbNo"].innerText + ":" + iRow;
            strSeq += strBuffer + document.all["dg1__ctl" + iRow + "_lbNo"].innerHTML + ":" + iRow;
            strBuffer = "^";
        }
    }
    strBuffer = "";
    if (strSeq == "")
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["無此文號：" + strDocNo])), "");
    else {
        if (strSeq.indexOf('^') > 0) {
            argSeq = strSeq.split('^');
            for (var iArr = 0; iArr < argSeq.length; iArr++) {
                //多筆資料則不勾
                strRow = argSeq[iArr];
                argRow = strRow.split(':');
                document.all["dg1__ctl" + argRow[1] + "_cb1"].checked = false;
                //序
                strMsg += strBuffer + argRow[0];
                strBuffer = ",";
            }
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號：" + strMsg + "皆屬於文號" + strDocNo + "，請自行確認要點入哪一筆"])), "");
        }
    }
}

/*******************************************************************************************
								function	Click
********************************************************************************************/
function ConfirmSearch() {
    var bRtnBool = true;
    var strErrMsg = "";
    if (document.all["rbBatch"].checked) {
        if (document.all["txBatchNo"].value == "") {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["送文批號"])), "");
            bRtnBool = false;
        }
    }
    else if (document.all["rbDept"].checked) {
        if (document.all["txEDate"].value == "") {
            strErrMsg = "送文日期(迄)不可空白\n" + strErrMsg;
            //1050718 Zen 1050087  二代公文修改
            //document.all["txEDate"].focus();
            $('#txEDate').focus();
        }
        if (document.all["txSDate"].value == "") {
            strErrMsg = "送文日期(起)不可空白\n" + strErrMsg;
            //1050718 Zen 1050087  二代公文修改
            //document.all["txSDate"].focus();
            $('#txSDate').focus();
        }
        if (strErrMsg != "") {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
            bRtnBool = false;
        }

        //[需求單955106] 搜尋前檢查 Charles 0951019
        if (!dlDept_Text_onblur(true))
            bRtnBool = false;

        if (document.all["H_OD_FLOW_TYPE"].value == "0") {
            if (!dlUser_Text_onblur(true))
                bRtnBool = false;
        }
        if (document.all["H_OD_FLOW_TYPE"].value == "2") {
            if (!dlSect_Text_onblur(true))
                bRtnBool = false;
        }
    }
    else if (document.all["rbDoc"].checked)
        bRtnBool = false;

    return bRtnBool;
}

//儲存前client檢查
function jf_ConfirmSave() {
    var bRtnBool = false
    var strMsgID = "";
    var strBuffer = "";
    if (document.all["dg1"] == null) {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["尚未透過搜詢取得待點收公文, 無法進行點收"])), "");
        bRtnBool = false;
        return bRtnBool;
    }
    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++) {
        if (document.all["dg1__ctl" + iRow + "_cb1"].checked == true) {
            bRtnBool = true;
            //1050718 Zen 1050087  二代公文修改
            //strMsgID += strBuffer + document.all["dg1__ctl" + iRow + "_H_Msg"].innerText;
            strMsgID += strBuffer + document.all["dg1__ctl" + iRow + "_H_Msg"].innerHTML;
            strBuffer = "^";
        }
    }
    document.all["H_MSGID"].value = strMsgID;
    if (!bRtnBool) {
        //1050718 Zen 1050087  二代公文修改
        //document.all["txConfirm"].focus();
        $('#txConfirm').focus();
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])), "");
    }
    return bRtnBool;
}

//清除勾選的row
function btRemoveClick() {
    var len = document.all["dg1"].rows.length;
    var iCount = 0;
    //若有勾選則將下一筆value寫入上一筆
    for (var iCheck = 2; iCheck < len + 1; iCheck++) {
        if (iCheck > iCheck - iCount) {
            //1050718 Zen 1050087  二代公文修改--begin
            //document.all["dg1__ctl" + (iCheck - iCount) + "_H_Msg"].innerText = document.all["dg1__ctl" + iCheck + "_H_Msg"].innerText;
            //document.all["dg1__ctl"+(iCheck-iCount)+"_txDoc"].value    = document.all["dg1__ctl"+iCheck+"_txDoc"].value;
            //document.all["dg1__ctl"+(iCheck-iCount)+"_lbIssueDept"].innerText = document.all["dg1__ctl"+iCheck+"_lbIssueDept"].innerText;
            //document.all["dg1__ctl"+(iCheck-iCount)+"_lbType"].innerText= document.all["dg1__ctl"+iCheck+"_lbType"].innerText;
            //document.all["dg1__ctl"+(iCheck-iCount)+"_lbDept"].innerText= document.all["dg1__ctl"+iCheck+"_lbDept"].innerText;
            document.all["dg1__ctl" + (iCheck - iCount) + "_H_Msg"].innerHTML = document.all["dg1__ctl" + iCheck + "_H_Msg"].innerHTML;
            document.all["dg1__ctl" + (iCheck - iCount) + "_txDoc"].value = document.all["dg1__ctl" + iCheck + "_txDoc"].value;
            document.all["dg1__ctl" + (iCheck - iCount) + "_lbIssueDept"].innerHTML = document.all["dg1__ctl" + iCheck + "_lbIssueDept"].innerHTML;
            document.all["dg1__ctl" + (iCheck - iCount) + "_lbType"].innerHTML = document.all["dg1__ctl" + iCheck + "_lbType"].innerHTML;
            document.all["dg1__ctl" + (iCheck - iCount) + "_lbDept"].innerHTML = document.all["dg1__ctl" + iCheck + "_lbDept"].innerHTML;
            //1050718 Zen 1050087  二代公文修改--end
            document.all["dg1__ctl" + (iCheck - iCount) + "_txSubject"].value = document.all["dg1__ctl" + iCheck + "_txSubject"].value;
        }
        if (document.all["dg1__ctl" + iCheck + "_cb1"].checked)
            iCount++;
    }
    //清空CheckBox
    for (var iRow = 2; iRow < document.all["dg1"].rows.length; iRow++) {
        if (document.all["dg1__ctl" + iRow + "_cb1"].checked)
            document.all["dg1__ctl" + iRow + "_cb1"].checked = false;
    }
    //剩下最後的iCount筆刪掉
    for (var iDel = 1; iDel <= iCount; iDel++) {
        document.all["dg1"].deleteRow(len - iDel);
    }
}

function fnBatchNoOnBlur() {
    if (OriginalKeyCode == 13) {
        OriginalKeyCode = 0;
        Page_BlockSubmit = !ConfirmSearch();
        document.all.ToolBarSenderID.value = "btSearch";

        if (Page_BlockSubmit == false) {
            IsServerHandling = true;
            jf_ShowWaitState();
            __doPostBack("tbTool", 0);
        }
    }
}

function fnConfirmOnBlur() {
    if (OriginalKeyCode == 13) {
        OriginalKeyCode = 0;
        if (document.all["dg1"] != null)
            ItemChecked();
        else
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請先建立資料"])), "");
        Page_BlockSubmit = true;
        //1050718 Zen 1050087  二代公文修改
        //document.all["txConfirm"].focus();
        $('#txConfirm').focus();
    }
}

//[需求單955106] 下拉選單檢查 Charles 0951019 ↓
function dlDept_Text_onblur(argIsCheckDone) {
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value) {
        //呼叫OD_LIB.js，檢查dlDept_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlDept", "承辦單位")) {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

            if (document.all["H_OD_FLOW_TYPE"].value == "0") {
                //設定承辦人的下拉選單
                odjf_SetdlDept("dlDept", "", "dlUser", "OD99", true);
                //存ComboBox_Text的value
                document.all["H_User"].value = document.all["dlUser_Text"].value;
                //存所選擇的ComboBox項目的value
                document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
                //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlFmSubDept的處理
                document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);
                //依選項多寡固定下拉式選單可見長度
                if (document.all["dlUser"].options.length > 10)
                    document.all["dlUser"].size = 10;
                else if (document.all["dlUser"].options.length == 1)
                    document.all["dlUser"].size = 2;
                else
                    document.all["dlUser"].size = document.all["dlUser"].options.length;
                //無值不顯示
                jf_HandleComboxStatus("dlUser");
            }
            else if (document.all["H_OD_FLOW_TYPE"].value == "2") {
                //設定承辦科別的下拉選單
                odjf_SetdlDept("dlDept", "dlSect", "", "", false);
                //存ComboBox_Text的value
                document.all["H_Sect"].value = document.all["dlSect_Text"].value;
                //存所選擇的ComboBox項目的value
                document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
                //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlFmSubDept的處理
                document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
                //依選項多寡固定下拉式選單可見長度
                if (document.all["dlSect"].options.length > 10)
                    document.all["dlSect"].size = 10;
                else if (document.all["dlSect"].options.length == 1)
                    document.all["dlSect"].size = 2;
                else
                    document.all["dlSect"].size = document.all["dlSect"].options.length;
                //無值不顯示
                jf_HandleComboxStatus("dlSect");
            }
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function dlSect_Text_onblur(argIsCheckDone) {
    var bCheckOK = true;
    if (document.all["dlSect_Text"].value != document.all["H_Sect"].value) {
        //呼叫OD_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlSect", "承辦人")) {
            //存ComboBox_Text的value
            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function dlUser_Text_onblur() {
    var bCheckOK = true;
    if (document.all["dlUser_Text"].value != document.all["H_User"].value) {
        //呼叫OD_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlUser", "承辦人")) {
            //存ComboBox_Text的value
            document.all["H_User"].value = document.all["dlUser_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID) {
    if (document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
        //1050718 Zen 1050087  二代公文修改
        //document.all[argComboxID + "_Container"].className = "InputFieldText";
        document.all[argComboxID + "_Container"].className = "custom-combobox";
}
//[需求單955106] 下拉選單檢查 Charles 0951019 ↑

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
function CheckCDATE(argObj, strMsg) {
    var strDate = document.all[argObj].value;
    if (strDate != "") {
        if (strDate.length < 7) {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate)) {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1050718 Zen 1050087  二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
        }
    }
}

//1120915	Joe		1120709		弱掃修正Client Potential XSS
function htmlencode(s){
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}