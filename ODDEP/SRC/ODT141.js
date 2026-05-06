/*
DATE 	    SA		PRG		MGR_NO		DESC
1110923		Kevin	Zen     1110840		新增ODT141 已分文未簽收查詢作業
*/


var IsServerHandling = new Boolean();
IsServerHandling = false;

jf_ShowValidator();

function ClientOnLoad()
{

}

function ClientButtonControl(e)
{
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
}

//1050412 Justin 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling) {
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
        case "btRerurn":
        case "btWithDraw":
            if (!CheckBeforeSearch())
                Page_BlockSubmit = true;
            else
            {
                Page_BlockSubmit = false;
                jf_ToolBarSubmit(xObjectName);
            }

            break;
    }
}

function CheckBeforeSearch()
{
    var strErrMsg = '';
    var strFromOrgDateS = $('#txFromOrgDateS').val();
    var strFromOrgDateE = $('#txFromOrgDateE').val();

    //if (strFromOrgDateS + strFromOrgDateE == '')
    //    strErrMsg += '來文日期不可為空。\n';

    if (strFromOrgDateS == '' && strFromOrgDateE != '')
        $('#txFromOrgDateS').val(strFromOrgDateE);
    else if (strFromOrgDateS != '' && strFromOrgDateE == '')
        $('#txFromOrgDateE').val(strFromOrgDateS);
    else if (Number(strFromOrgDateS) > (Number(strFromOrgDateE))) 
    {
        $('#txFromOrgDateS').val(strFromOrgDateE);
        $('#txFromOrgDateE').val(strFromOrgDateS);
    }

    strErrMsg += CheckDate('txFromOrgDateS', '來文日期(起)', true, 7);
    strErrMsg += CheckDate('txFromOrgDateE', '來文日期(訖)', true, 7);

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
