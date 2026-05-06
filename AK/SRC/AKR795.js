/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.10.16
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	    概要
 * -------------------------------------------------------------------------------------------------
 * 1070921      Zen     1050087 二代升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1070918 Zen 1050087 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1070918 Zen 1050087 二代升級//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

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
        case "btStatic":
            var xUrl = "AKP210.aspx?nMode=EXEC";
            jf_OpenChildWin(xUrl, "AKP210", 800, 600);
            Page_BlockSubmit = true;
            break;
        case "btPrint":
        case "btPreview":
            Page_BlockSubmit = !CheckBeforePrint();
            //1070918 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btMaintain"://電子來文查詢
            var strUrl = "";
            strUrl = "AKR796.aspx";
            //Cola 000996 修正開啟之子視窗大小			
            jf_OpenChildWin(strUrl, "AKR796", 940, 470);
            Page_BlockSubmit = true;
            //1070918 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btMaintain_N"://電子來文查詢
            var strUrl = "";
            strUrl = "AKR797.aspx";
            //Cola 000996 修正開啟之子視窗大小			
            jf_OpenChildWin(strUrl, "AKR797", 800, 600);
            Page_BlockSubmit = true;
            //1070918 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{
    if (argCallerId == "AKP210")
    {
        if (document.all["lbReturnValue"].length == 1)
        {
            var strMaxUseDate = document.all["lbReturnValue"].options[0].value;
            if (strMaxUseDate == "")
                document.all["txMaxYear"].value = "";
            else
                document.all["txMaxYear"].value = strMaxUseDate.substr(0, 3);
        }
    }
}

function ClientOnLoad()
{

}

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
    //1070918 Zen 1050087 二代升級    //document.all[argLabelId].innerText = obj.value;
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

function CheckBeforePrint()
{
    var bRtnBool = false;
    if (document.all.rb1.checked)
    {
        if (document.all.txMonthS.value != "" && (document.all.txMonthS.value.substring(3) > "12" || document.all.txMonthS.value.substring(3) < "01"))
        {
            alert('月份輸入錯誤，請輸入1~12月份');
            return false;
        }
        if (document.all.txMonthE.value != "" && (document.all.txMonthE.value.substring(3) > "12" || document.all.txMonthE.value.substring(3) < "01"))
        {
            alert('月份輸入錯誤，請輸入1~12月份');
            return false;
        }
        if (document.all.txMonthS.value == "" && document.all.txMonthE.value == "")
        {
            alert('請至少輸入一個月份');
            return false;
        }
    }
    else if (document.all.rb5.checked)
    {
        if (document.all.txMonthS_2.value != "" && (document.all.txMonthS_2.value.substring(3) > "12" || document.all.txMonthS_2.value.substring(3) < "01"))
        {
            alert('月份輸入錯誤，請輸入1~12月份');
            return false;
        }
        if (document.all.txMonthE_2.value != "" && (document.all.txMonthE_2.value.substring(3) > "12" || document.all.txMonthE_2.value.substring(3) < "01"))
        {
            alert('月份輸入錯誤，請輸入1~12月份');
            return false;
        }
        if (document.all.txMonthS_2.value == "" && document.all.txMonthE_2.value == "")
        {
            alert('請至少輸入一個月份');
            return false;
        }
    }
    else if (document.all.rb2.checked)
    {
        if (document.all.txYear.value == "")
        {
            alert('請輸入正確年份');
            return false;
        }
    }
    else if (document.all.rb3.checked)
    {
        if (document.all.txYear2.value == "")
        {
            alert('請輸入正確年份');
            return false;
        }
    }
    else if (document.all.rb4.checked)
    {
        if (document.all.txYear3.value == "")
        {
            alert('請輸入正確年份');
            return false;
        }
    }

    return true;
}

function UnEmpty()
{
    var oYear = document.all["txYear"];
    if (oYear.value == "")
    {
        //1070918 Zen 1050087 二代升級        //oYear.focus();
        $('#' + oYear.id).focus();
        jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["統計年度"])), "");
        return false;
    }
    return true;
}

function CheckYear()
{
    var strMaxYear = document.all["txMaxYear"].value;
    var strYear = document.all["txYear"].value;

    if (strYear > strMaxYear)
    {
        //1070918 Zen 1050087 二代升級        //document.all["txYear"].focus();
        $('#txYear').focus();
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["統計年度不可大於最大統計年度"])), "");
        return false;
    }
    return true;
}