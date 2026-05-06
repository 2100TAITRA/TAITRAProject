//  --	   Cola   20070523  000919  修正當按下清除鍵時, radiobutton之設定不會被clear.
//	--	   Leslie 20080129	0970122 於.js中增加調調案人Combo Box 長度函式
//  David  Kenny  20160414  1050087	二代公文系統相關修改
//  Leslie  Joe	1051019		1050087		二代修正配合行動平台
//  1100420 Cloud   Zen     1100142     以AKS502為基底新增AKS502_SMEG供信保專用

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050414	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050414	Kenny	[1050087]   二代公文系統相關修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();


//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e) {
    //1051019	Joe		1050087		配合行動平台進行修正
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        /*
		case "":
			break;
		*/
    }
}

//1050414	Kenny	[1050087]   二代公文系統相關修改
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

    //1050414   Kenny	[1050087]   二代公文系統相關修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id

    switch (xObjectName) {
        case "btSearch":
            let strErrMsg = '';
            if (document.all["dateBegin"].value == "" || document.all["dateEnd"].value == "") {
                //1100420 Zen 1100142 新增客製化查詢條件                //alert("日期欄位不可為空");
                ////1050414	Kenny	[1050087]   二代公文系統相關修改
                ////document.all["dateBegin"].focus();
                //$('#dateBegin').focus();
                //Page_BlockSubmit = true;
                strErrMsg += '日期欄位不可為空\n';
                $('#dateBegin').focus();
            }
            if (document.all["dateBegin"].value > document.all["dateEnd"].value) {
                var tmp = document.all["dateEnd"].value;
                document.all["dateEnd"].value = document.all["dateBegin"].value
                document.all["dateBegin"].value = tmp;
            }

            //1100420 Zen 1100142 新增客製化查詢條件            let strClientCardNo = $('#txClientCardNo').val();            let strManageBankNo = $('#txManageBankNo').val();            let strManageCaseNo = $('#txManageCaseNo').val();            if (strClientCardNo != '' && strManageBankNo + strManageCaseNo != '') {
                strErrMsg += '專案卡號、列管編號不可皆有值\n';
                $('#txClientCardNo').focus();
            }            if (strManageBankNo == '' && strManageCaseNo != '' || strManageBankNo != '' && strManageCaseNo == '') {
                strErrMsg += '列管編號輸入不完整\n';
                $('#txManageBankNo').focus();
            }            if (strErrMsg != '') {
                alert(strErrMsg);
                Page_BlockSubmit = true;
            }
            //1050414	Kenny	[1050087]   二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //Cola 000919 -- start --修正當按下清除鍵時, radiobutton之設定不會被clear.
        case "btClean":
            //			Page_BlockSubmit = true;
            Page_BlockSubmit = false;
            jf_ConfirmClean();
            //1050414	Kenny	[1050087]   二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //Cola 000919 -- end --
    }
}

function CallBack(argCallerId) {

}

function ClientOnLoad() {

}

function OnWSResult(argResult) {
    if (jf_IsWebServiceSuccess(argResult)) {
    }
}

//Leslie	0970122	調整調案人Combo Box長度
function RefrashEmpName() {
    if (document.all["OrderPerson"].options.length > 10)
        document.all["OrderPerson"].size = 10;
    else if (document.all["OrderPerson"].options.length == 1)
        document.all["OrderPerson"].size = 2;
    else
        document.all["OrderPerson"].size = document.all["OrderPerson"].options.length;
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId) {
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050414	Kenny	[1050087]   二代公文系統相關修改
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

function ReturnValue(arg1) {
    opener.document.all.lbReturnValue.length = 1;
    opener.document.all["lbReturnValue"].options[0].text = "SeqNo";
    opener.document.all["lbReturnValue"].options[0].value = arg1;
    opener.window.CallBack("AKS502");
    close();
}

function UserOnBlur(Userobj) {
    if (Userobj.options == null) {
        document.all["txUserValue"].value = "";
        return;
    }
    if (Userobj.options.length == 0) {
        document.all["txUserValue"].value = "";
        return;
    }
    var index = Userobj.selectedIndex;
    if (index == -1) {
        document.all["txUserValue"].value = "";
        return;
    }
    document.all["txUserValue"].value = Userobj.options[index].value;
}

//1100420 Zen 1100142 新增客製化查詢條件function PadLeft(argId, argLength, argFillStr) {
    let strValue = $('#' + argId).val();
    if (strValue != '') {
        strValue = jf_PADL(strValue, argLength, argFillStr)
        $('#' + argId).val(strValue);
    }
}