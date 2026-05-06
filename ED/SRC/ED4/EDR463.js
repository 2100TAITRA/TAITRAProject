/*
DATE 	 SA     PRG	    MGR_NO		DESC
1060104  David  Zen     1050087     二代公文修改
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

//1060104 Zen 1050087 二代公文修改
//if (document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    rbLvCheck();
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060104 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1060104 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            var xUrl = "../../../ODDEP/ODP420.aspx?nMode=EXEC&SAMLart=" + document.all.H_Artifact.value;
            jf_OpenChildWin(xUrl, "ODP420", 760, 500);
            Page_BlockSubmit = true;
            break;
        case "btPrint":
            Page_BlockSubmit = !CheckBeforePrint();
            //1060104 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !CheckBeforePrint();
            //1060104 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforePrint()
{
    var strMonth = jf_Trim(document.all.txMonth.value);
    var strYear = jf_Trim(document.all.txYear.value);

    var bRtn = true;
    if (strMonth == "" && strYear == "")
    {
        alert("統計月份年份不能皆為空");
        if (document.all["rbMonth"].checked == true)
        {
            //1060104 Zen 1050087 二代公文修改
            //document.all["txMonth"].focus();
            $('#txMonth').focus();
        }
        else
        {
            //1060104 Zen 1050087 二代公文修改
            //document.all["txYear"].focus();
            $('#txYear').focus();
        }
        return false;
    }

    if (document.all["rbMonth"].checked == true)
    {
        if (!CheckCDATE2("txMonth", "統計月份"))
        {
            bRtn = false;
            return bRtn;
        }
        if (!ConfirmData())
        {
            bRtn = false;
            return bRtn;
        }
    }
    else
    {
        if (!CheckCDATE2("txYear", "統計年份"))
        {
            bRtn = false;
            return bRtn;
        }
        if (!ConfirmData())
        {
            bRtn = false;
            return bRtn;
        }
    }
    return bRtn;

}
var bHasCheck = false;
function CheckCDATE2(argObj, strMsg)
{
    if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
    bHasCheck = true;
    var strDate = document.all[argObj].value;
    if (strDate != "" && argObj == "txMonth")
    {
        if (strDate.length < 5)
        {
            strDate = jf_PADL(strDate, 5, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate + "01"))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1060104 Zen 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
            bHasCheck = false;
            return false;
        }
    }
    else if (strDate != "" && argObj == "txYear")
    {
        if (strDate.length < 3)
        {
            strDate = jf_PADL(strDate, 3, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate + "0101"))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1060104 Zen 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
            bHasCheck = false;
            return false;
        }
    }
    bHasCheck = false;
    return true;
}
function ConfirmData()
{
    var bRtnbool = true;
    var year1 = "";
    var month1 = "";
    var year2 = "";
    var month2 = "";
    if (document.all["rbMonth"].checked == true)
    {
        year1 = parseInt(document.all.txMonth.value.substr(0, 3));//取出輸入年份
        if (year1 == 0)
            year1 = parseInt(document.all.txMonth.value.substr(1, 2));
        month1 = parseInt(document.all.txMonth.value.substr(3, 2));//取出輸入月份
        if (month1 == 0)
            month1 = parseInt(document.all.txMonth.value.substr(4, 1));

        year2 = parseInt(document.all.h_txYM.value.substr(0, 3));
        if (year2 == 0)
            year2 = parseInt(document.all.h_txYM.value.substr(1, 2));
        month2 = parseInt(document.all.h_txYM.value.substr(3, 2));
        if (month2 == 0)
            month2 = parseInt(document.all.h_txYM.value.substr(4, 1));
        if (year1 > year2 || (year1 == year2 && month1 > month2))
        {
            strErrMsg = "列印月份不可大於目前最大月份\n";
            //1060104 Zen 1050087 二代公文修改
            //document.all["txMonth"].focus();
            $('#txMonth').focus();
            bRtnbool = false;
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        }
    }
    else
    {
        year1 = parseInt(document.all.txYear.value.substr(0, 3));//取出輸入年份
        if (year1 == 0)
            year1 = parseInt(document.all.txYear.value.substr(1, 2));
        year2 = parseInt(document.all.h_txYM.value.substr(0, 3));
        if (year2 == 0)
            year2 = parseInt(document.all.txYear.value.substr(1, 2));

        if (year1 > year2)
        {
            strErrMsg = "列印年份不可大於目前統計最大年份\n";
            //1060104 Zen 1050087 二代公文修改
            //document.all["txYear"].focus();
            $('#txYear').focus();
            bRtnbool = false;
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        }
    }
    return bRtnbool;
}
function rbLvCheck()
{
    if (document.all["rbMonth"].checked == true)
    {
        document.all["txYear"].readOnly = true;
        document.all["txMonth"].readOnly = false;
        document.all["txYear"].className = "displayonly";
        document.all["txMonth"].className = "RequireField";
        document.all["txYear"].value = "";
        //1060104 Zen 1050087 二代公文修改
        //document.all["txMonth"].focus();
        $('#txMonth').focus();
        document.all["txYear"].tabIndex = -1;


    }
    else
    {
        document.all["txMonth"].readOnly = true;
        document.all["txYear"].readOnly = false;
        document.all["txMonth"].className = "displayonly";
        document.all["txYear"].className = "RequireField";
        document.all["txMonth"].value = "";
        //1060104 Zen 1050087 二代公文修改
        //document.all["txYeavr"].focus();
        $('#txYear').focus();
        document.all["txMonth"].tabIndex = -1;
    }

}