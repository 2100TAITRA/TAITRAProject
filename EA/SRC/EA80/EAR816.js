/*
DATE		SA		PRG		    MGR_NO			DESC
1090930     Cloud   Zen		    1090574         新增EAR816 還卷清單列印作業1100204     Leslie  Zen         1090927         取消使用document.activeElement
1100318		Cloud	Cloud		1100199			新增成批功能以及查詢條件
1100414		Cloud	Cloud		1100142			配合新增AKS502_SMEG 調整程式
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

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e) {
    var xObjectName = e.target.id;

    if (IsServerHandling) {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    //1100204 Zen 1090927 取消使用document.activeElement    strBtId = xObjectName;

    switch (xObjectName) {
        case 'btDgClear':
            Page_BlockSubmit = true;
            jf_SelectClear('dg1', '_cbSelect')
            break;
        case 'btDgAll':
            Page_BlockSubmit = true;
            jf_SelectAll('dg1', '_cbSelect')
            break;
        case 'btDgInverse':
            Page_BlockSubmit = true;
            jf_SelectInverse('dg1', '_cbSelect')
            break;
        case 'btHelpS':
        case 'btHelpE':
        	Page_BlockSubmit = true;
        	//1100414		Cloud	1100142			配合新增AKS502_SMEG 調整程式名稱
        	//var strUrl = "/AK/AKS502.aspx?rtnObj=lbReturnValue&k1=0&SAMLart=" + jf_GetArtifact();
        	var strUrl = "/AK/AKS502_SMEG.aspx?rtnObj=lbReturnValue&k1=0&SAMLart=" + jf_GetArtifact();
            jf_OpenChildWin(strUrl, "AKS502", 800, 600);
            break;
            //1100318		Cloud	Cloud		1100199			新增成批功能以及查詢條件-S
        case 'IBatchNo':
            Page_BlockSubmit = true;
            var strUrl = "EAR816C1.aspx?rtnObj=lbReturnValue&argDeptNo=" + document.all["H_txDeptNo"].value + "&SAMLart=" + jf_GetArtifact();
            jf_OpenChildWin(strUrl, "EAR816", 800, 600);
            break;
            //1100318		Cloud	Cloud		1100199			新增成批功能以及查詢條件-E
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event) {
    var xObjectName;

    if (IsServerHandling) {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btSearch":
            Page_BlockSubmit = true;
            if (CheckBeforeSearch()) {
                Page_BlockSubmit = false;
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btPreview":
            Page_BlockSubmit = true;

            var dg1 = document.all['dg1'];
        	//1100318		Cloud	1100199			新增成批功能以及查詢條件-s
            //if (dg1 == undefined || dg1.getAttribute('class') == 'hide' || CheckDgSelect())
        	//alert('請於執行搜尋後並至少勾選一筆資料再執行預覽功能。');
            if (document.all["txBatchNo"].value == "")
            	alert('批號不可空白。');
            else
            {
                Page_BlockSubmit = false;
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            document.all['rbAll'].checked = true;
        //1100318		Cloud	1100199			新增成批功能以及查詢條件-s
            break;
        case "btOpen":
            Page_BlockSubmit = true;
            if (document.all["txBatchNo"].value!="") {
                Page_BlockSubmit = false;
                jf_ToolBarSubmit(xObjectName);
            }
            else
                alert('批號不可空白。');
            break;
        case "btSave":
            Page_BlockSubmit = true;
            if (document.all["dg1"] == undefined || document.all["dg1"].getAttribute('class') == 'hide' || CheckDgSelect())
                alert('請至少勾選一筆資料再執行成批功能。');
            else {
                Page_BlockSubmit = false;
                jf_ToolBarSubmit(xObjectName);
            }
            break;
    	case "btCancel":
    		Page_BlockSubmit = !jf_ConfirmCancel();
    		jf_ToolBarSubmit(xObjectName);
    		break;
         //1100318		Cloud	Cloud		1100199			新增成批功能以及查詢條件-e
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
//1100204 Zen 1090927 取消使用document.activeElementvar strBtId = '';
function CallBack(argCallerId) {
    if (argCallerId == "AKS502") {
        //1100204 Zen 1090927 取消使用document.activeElement        //if (document.activeElement.id == "btHelpS")
        if (strBtId == "btHelpS")
            document.all["txBorNoS"].value = document.all["lbReturnValue"].options[0].value;
        else
            document.all["txBorNoE"].value = document.all["lbReturnValue"].options[0].value;
    }
    //1100318		Cloud	Cloud		1100199			新增成批功能以及查詢條件
    if (argCallerId == "EAR816C1") {
        document.all["txBatchNo"].value = document.all["lbReturnValue"].options[0].value;
    }


    if (document.all.lbReturnValue.options != null)//清空lbReturnValue物件
        document.all.lbReturnValue.options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch() {
    var strErrMsg = '';
    var strDocNoS = $('#txDocNoS').val();
    var strDocNoE = $('#txDocNoE').val();
    var strBorNoS = $('#txBorNoS').val();
    var strBorNoE = $('#txBorNoE').val();
    var strBorDateS = $('#txBorDateS').val();
    var strBorDateE = $('#txBorDateE').val();
    var strUser = $('#dlUser').val();

    if (strDocNoS == '' && strDocNoE != '')
        $('#txDocNoS').val(strDocNoE);
    else if (strDocNoS != '' && strDocNoE == '')
        $('#txDocNoE').val(strDocNoS);
    else if (Number(strDocNoS) > (Number(strDocNoE))) {
        $('#txDocNoS').val(strDocNoE);
        $('#txDocNoE').val(strDocNoS);
    }
    if (strBorNoS == '' && strBorNoE != '')
        $('#txBorNoS').val(strBorNoE);
    else if (strBorNoS != '' && strBorNoE == '')
        $('#txBorNoE').val(strBorNoS);
    else if (Number(strBorNoS) > (Number(strBorNoE))) {
        $('#txBorNoS').val(strBorNoE);
        $('#txBorNoE').val(strBorNoS);
    }

    if (strBorDateS == '' && strBorDateE != '')
        $('#txBorDateS').val(strBorDateE);
    else if (strBorDateS != '' && strBorDateE == '')
        $('#txBorDateE').val(strBorDateS);
    else if (Number(strBorDateS) > (Number(strBorDateE))) {
        $('#txBorDateS').val(strBorDateE);
        $('#txBorDateE').val(strBorDateS);
    }
	//1100318		Cloud	1100199			新增成批功能以及查詢條件-至少會有調閱單位條件-移除此檢核
    /*if (strDocNoS + strDocNoE + strBorNoS + strBorNoE + strBorDateS + strBorDateE + strUser == '')
        strErrMsg += '公文文號、調案單號、調案日期、調案人至少需輸入一項。\n';*/

    strErrMsg += CheckDate('txBorDateS', '調案日期(起)', true, 7);
    strErrMsg += CheckDate('txBorDateE', '調案日期(訖)', true, 7);

    if (strErrMsg != '') {
        alert(strErrMsg);
        return false;
    }

    return true;
}

function CheckDate(argObj, argMsg, argFromTbtool, argLength) {
    var strErrMsg = '';
    var strDate = $('#' + argObj).val();
    if (strDate != '') {
        if (strDate.length < argLength) {
            strDate = jf_PADL(strDate, argLength, '0');//YYYMMDD
            $('#' + argObj).val(strDate);
        }

        if (!jf_CheckCDATE(strDate)) {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            if (argFromTbtool == false)
                jf_ShowMsg(strErrMsg, '');
        }
    }
    return strErrMsg;
}

function CheckDgSelect() {
    var bUnSelected = true;
    var dg1 = document.all['dg1'];
    for(var i = 2 ; i <= dg1.rows.length; i++)
        if (document.all['dg1__ctl' + i + '_cbSelect'].checked)
        {
            bUnSelected = false;
            return bUnSelected;
        }

    return bUnSelected;
}
//1100318		Cloud	1100199			新增成批功能以及查詢條件-s
function jf_dlUserChange() {
    document.all["H_userID"].value = document.all.dlUser.options[document.all.dlUser.selectedIndex].value;
}
function InitUserList() {
    SetUserByDept("dlDept", "dlUser");
    document.all["H_txDeptNo"].value = document.all.dlDept.options[document.all.dlDept.selectedIndex].value;
    document.all["H_userID"].value = "";
    document.all["H_UerInfo"].value = "";
    if (document.all["dlUser"].options.length != 0) {
        for (var i = 0 ; i < document.all["dlUser"].options.length; i++) {
            if (document.all["dlUser"].options[i].text !== "" && document.all["dlUser"].options[i].value.split(":")[2] != "")
                document.all["H_UerInfo"].value += document.all["dlUser"].options[i].text + ";" + document.all["dlUser"].options[i].value + "|";
        }
    }
}
function SetUserByDept(argDeptObjID, argUserObjID) {
    var DeptObj = document.all[argDeptObjID];
    var i, j, len;
    var val = DeptObj.options[DeptObj.selectedIndex].value;
    
    callObj =  jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, val);
    
    var resultObj = null;
    if (callObj.error) {
        alert(callObj.errorDetail.string);
    }
    else {
        if (jf_IsWebServiceSuccess(callObj))
            resultObj = callObj.value;
    }

    var UserObj = document.all[argUserObjID];
    var UserNameMem = DeptObj.options[DeptObj.selectedIndex].text;

    //clear
    len = UserObj.length;
    for (i = 0 ; i < len ; i++)
        UserObj.remove(0);

    //add new data
    len = resultObj.UserName.length;
    UserObj.options.add(new Option("", ""));
    for (i = 0 ; i < len ; i++) {
        var objOption = new Option(resultObj.EmpName[i],resultObj.UserName[i])
        UserObj.options.add(objOption);
    }

    UserObj.selectedIndex = -1;
    for (i = 0 ; i < len ; i++) {
        if (UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i]) {
            UserObj.selectedIndex = i;
            break;
        }
    }
}
//1100318		Cloud	1100199			新增成批功能以及查詢條件-e