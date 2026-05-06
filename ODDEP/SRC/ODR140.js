/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1000926      Kevin   1000820 日期欄位新增小月曆功能
 * 1050412      Justin  1050087 二代公文修改
 * 1100702      Zen     1100566 (高雄大學)新增匯出Excel功能
 * 1140313      Zen     1131185 新增公文文號、銷號原因查詢條件
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050412 Justin 1050087 二代公文修改--Start-- 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1050412 Justin 1050087 二代公文修改-End--

//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    /*switch (xObjectName)
    {
        //0990923 David 0990434 新增小日曆
        case "btRcvDateS":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
            break;
        case "btRcvDateE":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
            break;
        case "btCalDateS":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txCalDateS, event.screenX, event.screenY);
            break;
        case "btCalDateE":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txCalDateE, event.screenX, event.screenY);
            break;
    }*/
}

//1050412 Justin 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
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

    //1050412 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
        case "btPrint":
        case "btPreview":
        //1100702 Zen 1100566 (高雄大學)新增匯出Excel功能
        case "btExcel": CheckBeforeSearch
            //1140313 Zen 1131185 新增公文文號、銷號原因查詢條件
            //if (document.all.txRcvDateS.value == "" && document.all.txRcvDateE.value == "" && document.all.txCalDateS.value == "" && document.all.txCalDateE.value == "")
            //{
            //    //1140313 Zen 1131185 新增公文文號、銷號原因查詢條件
            //    //alert("收(創)文日期、銷號日期起訖不可均為空白!!");
            //    alert("公文文號、收(創)文日期、銷號日期起訖不可均為空白!!");
            //    document.all.txRcvDateS.focus();
            //    Page_BlockSubmit = true;

            //}
            //else
            //{
            //    Page_BlockSubmit = false;
            //}
            Page_BlockSubmit = !CheckBeforeSearch();

            //1050412 Justin 1050087 二代公文修改 
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

}

//1140313 Zen 1131185 新增公文文號、銷號原因查詢條件，改寫檢核方式
//function CheckDateS()
//{
//    var strDateValue;
//    strDateValue = document.all.txRcvDateS.value;
//    if (strDateValue == "")
//    {
//        return;
//    }

//    strDateValue = jf_PADL(strDateValue, 7, "0");
//    document.all.txRcvDateS.value = strDateValue;
//    if (!jf_CheckCDATE(strDateValue))
//    {
//        jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["收文日期"])), "");
//        document.all.txRcvDateS.focus();
//    }
//}
//function CheckDateE()
//{
//    var strDateValue;
//    strDateValue = document.all.txRcvDateE.value;
//    if (strDateValue == "")
//    {
//        return;
//    }

//    strDateValue = jf_PADL(strDateValue, 7, "0");
//    document.all.txRcvDateE.value = strDateValue;
//    if (!jf_CheckCDATE(strDateValue))
//    {
//        jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["收文日期"])), "");
//        document.all.txRcvDateE.focus();
//    }
//}
//function CheckCalDateS()
//{
//    var strDateValue;
//    strDateValue = document.all.txCalDateS.value;
//    if (strDateValue == "")
//    {
//        return;
//    }

//    strDateValue = jf_PADL(strDateValue, 7, "0");
//    document.all.txCalDateS.value = strDateValue;
//    if (!jf_CheckCDATE(strDateValue))
//    {
//        jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["銷號日期"])), "");
//        document.all.txCalDateS.focus();
//    }
//}
//function CheckCalDateE()
//{
//    var strDateValue;
//    strDateValue = document.all.txCalDateE.value;
//    if (strDateValue == "")
//    {
//        return;
//    }

//    strDateValue = jf_PADL(strDateValue, 7, "0");
//    document.all.txCalDateE.value = strDateValue;
//    if (!jf_CheckCDATE(strDateValue))
//    {
//        jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["銷號日期"])), "");
//        document.all.txCalDateE.focus();
//    }
//}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050419 Justin 1050087 二代公文修改 
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

//1140313 Zen 1131185 新增公文文號、銷號原因查詢條件，改寫檢核方式
function CheckBeforeSearch()
{
    let strErrMsg = '';

    let strDocNoS = $('#txDocNoS').val();
    let strDocNoE = $('#txDocNoE').val();
    let strRcvDateS = $('#txRcvDateS').val();
    let strRcvDateE = $('#txRcvDateE').val();
    let strCalDateS = $('#txCalDateS').val();
    let strCalDateE = $('#txCalDateE').val();

    if (strDocNoS + strDocNoE + strRcvDateS + strRcvDateE + strCalDateS + strCalDateE  == '')
        strErrMsg += '公文文號、收(創)文日期、銷號日期起訖不可均為空白。\n';

    if (strDocNoS == '' && strDocNoE != '')
        $('#txDocNoS').val(strDocNoE);
    else if (strDocNoS != '' && strDocNoE == '')
        $('#txDocNoE').val(strDocNoS);
    else if (Number(strDocNoS) > (Number(strDocNoE))) 
    {
        $('#txDocNoS').val(strDocNoE);
        $('#txDocNoE').val(strDocNoS);
    }

    if (strRcvDateS == '' && strRcvDateE != '')
        $('#txRcvDateS').val(strRcvDateE);
    else if (strRcvDateS != '' && strRcvDateE == '')
        $('#txRcvDateE').val(strRcvDateS);
    else if (Number(strRcvDateS) > (Number(strRcvDateE))) 
    {
        $('#txRcvDateS').val(strRcvDateE);
        $('#txRcvDateE').val(strRcvDateS);
    }

    strErrMsg += CheckDate('txRcvDateS', '收文日期(起)', true, 7);
    strErrMsg += CheckDate('txRcvDateE', '收文日期(訖)', true, 7);

    if (strCalDateS == '' && strCalDateE != '')
        $('#txCalDateS').val(strCalDateE);
    else if (strCalDateS != '' && strCalDateE == '')
        $('#txCalDateE').val(strCalDateS);
    else if (Number(strCalDateS) > (Number(strCalDateE))) 
    {
        $('#txCalDateS').val(strCalDateE);
        $('#txCalDateE').val(strCalDateS);
    }

    strErrMsg += CheckDate('txCalDateS', '銷號日期(起)', true, 7);
    strErrMsg += CheckDate('txCalDateE', '銷號日期(訖)', true, 7);

    strErrMsg = strErrMsg.slice(0, -1);

    if (strErrMsg != '')
    {
        alert(strErrMsg);
        return false;
    }

    return true;
}

function CheckDate(argObj, argMsg, argFromTbtool, argLength) 
{
    var strErrMsg = '';
    var strDate = $('#' + argObj).val();
    if (strDate != '')
    {
        if (strDate.length < argLength) 
        {
            strDate = jf_PADL(strDate, argLength, '0');//YYYMMDD
            $('#' + argObj).val(strDate);
        }

        if (!jf_CheckCDATE(strDate)) 
        {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            if (argFromTbtool == false)
                jf_ShowMsg(strErrMsg, '');
        }
    }
    return strErrMsg;
}