/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060411   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060411 Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg() {
    //1060411 Justin [1050087] 二代公文修改 
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060411 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
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

//1060411 Justin [1050087] 二代公文修改 
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

    //1060411 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060411 Justin [1050087] 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060411 Justin [1050087] 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060411 Justin [1050087] 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060411 Justin [1050087] 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            document.all.rbStaticUnit.checked = true;
            break;

        case "btSearch":
            break;
        case "btPrint":
            if (checkBeforRpt()) {
                jf_ShowWaitState();
                IsServerHandling = true;
            }
            else {
                Page_BlockSubmit = true;
            }
            //1060411 Justin [1050087] 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btPreview":
            if (checkBeforRpt()) {
                jf_ShowWaitState();
                IsServerHandling = true;
            }
            else {
                Page_BlockSubmit = true;
            }
            //1060411 Justin [1050087] 二代公文修改
            //jf_ToolBarSubmit();
            //	break;
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId) {

}

function ClientOnLoad() {
    ShowMsg();
}

function OnWSResult(argResult) {
    if (jf_IsWebServiceSuccess(argResult)) {
    }
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId) {
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060411 Justin [1050087] 二代公文修改
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}
function FileYearOnBlur(argFieldName) {
    if (document.all[argFieldName].value != "")
        document.all[argFieldName].value = jf_PADL(document.all[argFieldName].value, 3, "0");
}

function checkBeforRpt() {
    if (document.all.txFileYear.value == "") {
        jf_ShowMeg("年度號欄位不可為空白", "");
        //1060411 Justin [1050087] 二代公文修改
        //document.all.txFileYear.focus();
        $('#txFileYear').focus();
        return false;
    }
    return true;
}

