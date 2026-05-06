/*
DATE        SA      PRG     MGR_NO  DESC
1070918     Cloud   Zen     1050087 二代升級
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1070918 Zen 1050087 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1070918 Zen 1050087 二代升級//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);

//1070918 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1070918 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        /*
		case "":
			break;
		*/
        case "btClearSelect":
            Page_BlockSubmit = true;
            SelectCommand("ClearAll");
            break;
        case "btSelectAll":
            Page_BlockSubmit = true;
            SelectCommand("SelectAll");
            break;
        case "btReverse":
            Page_BlockSubmit = true;
            SelectCommand("Reverse");
            break;
    }
}

//1070918 Zen 1050087 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1070918 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {

        //1070918 Zen 1050087 二代升級        //case "btOpen":
        //    Page_BlockSubmit = !jf_CheckKeyObject();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btSave":
        //    Page_BlockSubmit = !jf_CheckKeyObject();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btDelete":
        //    Page_BlockSubmit = !jf_ConfirmDelete();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btCancel":
        //    Page_BlockSubmit = !jf_ConfirmCancel();
        //    jf_ToolBarSubmit();
        //    break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            setDefault();
            break;
        case "btSearch":
            if (!FormValid())
                Page_BlockSubmit = true;
            else
            {
                jf_ShowWaitState();
                IsServerHandling = true;
                Page_BlockSubmit = false;
            }
            //1070918 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
        case "btPreview":
            if (!PrintCheck())
                Page_BlockSubmit = true;
            else
            {
                jf_ShowWaitState();
                IsServerHandling = true;
                Page_BlockSubmit = false;
            }
            //1070918 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;


    }
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = document.activeElement.innerText;
    //opener.window.CallBack("AKR310");
    //close();
}






/************************************************************************************/
function CheckDate(obj)
{
    if (obj.value == "")
        return;
    if (!jf_CheckCDATE(obj.value))
    {
        var ErrName = new Array(1);
        ErrName[0] = "日期";
        alert(FormatStr(jf_GetErrMsg(InFormatErr2), ErrName));
        //1070918 Zen 1050087 二代升級        //obj.focus();
        $('#' + obj.id).focus();
    }
}
function FormValid()
{
    var fr = document.AKR310;
    var pRtnValue = true;
    if (fr.txChkNo1.value == "" && fr.txChkNo2.value == "" && fr.txDate1.value == "" && fr.txDate2.value == "")
    {
        pRtnValue = false;
        alert("批號和檢核日期不可皆為空白");
        //1070918 Zen 1050087 二代升級        //fr.txChkNo1.focus();
        $('#txChkNo1').focus();
    }

    if (fr.txChkNo1.value != "" && fr.txChkNo2.value != "")
    {
        if (parseInt(fr.txChkNo1.value, 10) > parseInt(fr.txChkNo2.value, 10))
        {
            pRtnValue = false;
            alert("批號起不可以大於迄");
            //1070918 Zen 1050087 二代升級            //fr.txChkNo1.focus();
            $('#txChkNo1').focus();
        }
    }

    if (fr.txDate1.value != "" && fr.txDate2.value != "")
    {
        if (parseInt(fr.txDate1.value, 10) > parseInt(fr.txDate2.value, 10))
        {
            pRtnValue = false;
            alert("檢核日期起不可以大於迄");
            //1070918 Zen 1050087 二代升級            //fr.txDate1.focus();
            $('#txDate1').focus();
        }
    }

    return pRtnValue;
}

function PrintCheck()
{
    var RtnValue = false;
    var fr = document.AKR310;
    var DataGridCnt = parseInt(fr.h_dgCnt.value, 10);
    for (i = 0; i < DataGridCnt; i++)
    {
        var pRowNo = i + 2;
        cbSelect_ID = "dg1__ctl" + pRowNo + "_cbSelect";
        if (document.all[cbSelect_ID].checked)
        {
            RtnValue = true;
            break;
        }
    }
    if (!RtnValue)
    {
        alert("請至少選取一筆資料");
    }
    return RtnValue;
}

function SelectCommand(command)
{
    var fr = document.AKR310;
    var DataGridCnt = parseInt(fr.h_dgCnt.value, 10);
    switch (command)
    {
        case "SelectAll":
            for (i = 0; i < DataGridCnt; i++)
            {
                var pRowNo = i + 2;
                cbSelect_ID = "dg1__ctl" + pRowNo + "_cbSelect";
                document.all[cbSelect_ID].checked = true;
            }
            break;
        case "Reverse":
            for (i = 0; i < DataGridCnt; i++)
            {
                var pRowNo = i + 2;
                cbSelect_ID = "dg1__ctl" + pRowNo + "_cbSelect";
                document.all[cbSelect_ID].checked = !document.all[cbSelect_ID].checked;
            }
            break;
        case "ClearAll":
            for (i = 0; i < DataGridCnt; i++)
            {
                var pRowNo = i + 2;
                cbSelect_ID = "dg1__ctl" + pRowNo + "_cbSelect";
                document.all[cbSelect_ID].checked = false;
            }
            break;

    }
}


function setDefault()
{
    var fr = document.AKR310;
    fr.txDate1.value = fr.Date1.value;
    fr.txDate2.value = fr.Date2.value;
    //fr.all["dg1"].style.visibility = "hidden";
    fr.all["dgDIV"].style.visibility = "hidden";
    if (fr.btSelectAll != null)
        fr.btSelectAll.style.visibility = "hidden";
    if (fr.btClearSelect != null)
        fr.btClearSelect.style.visibility = "hidden";
    if (fr.btReverse != null)
        fr.btReverse.style.visibility = "hidden";
    //fr.all["btPrintImg"].disabled = true;
    //fr.btPrint.disabled = true;
    //fr.all["btPreviewImg"].disabled = true;
    //fr.btPreview.disabled = true;
    //1070918 Zen 1050087 二代升級    //fr.txChkNo1.focus();
    $('#txChkNo1').focus();
}



function ClientOnLoad()
{

}



function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1070918 Zen 1050087 二代升級    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

