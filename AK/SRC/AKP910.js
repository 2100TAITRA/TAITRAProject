/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1070818  Cloud   Zen     1050087     二代升級
 */
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
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            if (!ChkDate(document.all.txYear.value))
            {
                //1070918 Zen 1050087 二代升級                //document.all.txYear.focus();
                $('#txYear').focus();
                Page_BlockSubmit = true;
                return;
            }

            var DateString = document.all.txYear.value + "年";
            //1070918 Zen 1050087 二代升級            //if (document.all.laMaxYearNow.innerText == "")
            if (document.all.laMaxYearNow.textContent == "")
            {
                jf_SetStatusMsg(DateString + "資料統計中");
            }
            else
            {
                //1070918 Zen 1050087 二代升級                //if (document.all.txYear.value >= document.all.laMaxYearNow.innerText)
                if (document.all.txYear.value >= document.all.laMaxYearNow.textContent)
                    jf_SetStatusMsg(DateString + "資料統計中");
                else
                    //1070918 Zen 1050087 二代升級                    //jf_SetStatusMsg(DateString + "至" + document.all.laMaxYearNow.innerText + "年資料統計中");
                    jf_SetStatusMsg(DateString + "至" + document.all.laMaxYearNow.textContent + "年資料統計中");
            }

            jf_ShowWaitState();
            IsServerHandling = true;
            //1070918 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1070918 Zen 1050087 二代升級        //case "btSave":
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
        //case "btClean":
        //    Page_BlockSubmit = true;
        //    jf_ConfirmClean();
        //    break;
        //case "btSearch":
        //    break;
        //case "btPrint":
        //    Page_BlockSubmit = jf_ConfirmPrint();
        //    break;
        //case "btPreview":
        //    Page_BlockSubmit = true;
        //    jf_OpenChildWin("AKP910C1.aspx", "AKP910C1", 800, 600);
        //    break;
    }
}

function CallBack(argCallerId)
{

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

/**********************************onblur Function****************************************************/
function txYearExit()
{
    if (document.all.txYear.value == "") return;
    document.all.txYear.value = jf_PADL(document.all.txYear.value, 3, "0");
    var InputDate = document.all.txYear.value + "0101";
    if (!jf_CheckCDATE(InputDate))
    {
        jf_ShowMeg("請輸入正確日期範圍(000-999)", "輸入格式錯誤");
        //1070918 Zen 1050087 二代升級        //document.all.txYear.focus();
        $('#txYear').focus();
    }
}


function ChkDate(argYear)
{
    if (argYear == "")
    {
        jf_ShowMeg("年度不可空白!", "輸入年度有誤");
        return false;
    }

    var strYear = jf_PADL(argYear, 3, "0");

    //年度不可小於最小可統計年度
    //1070918 Zen 1050087 二代升級    //if (strYear < document.all.laMinCalcYear.innerText)
    if (strYear < document.all.laMinCalcYear.textContent)
    {
        //1070918 Zen 1050087 二代升級        //jf_ShowMeg("年度不可小於最小可統計年度(" + document.all.laMinCalcYear.innerText + ")!", "輸入年度有誤");
        jf_ShowMeg("年度不可小於最小可統計年度(" + document.all.laMinCalcYear.textContent + ")!", "輸入年度有誤");
        return false;
    }

    //年度不可大於目前最大統計年度
    //1070918 Zen 1050087 二代升級    //if (document.all.laMaxYearNow.innerText != "")
    if (document.all.laMaxYearNow.textContent != "")
    {
        var intYear = parseFloat(document.all.txYear.value);
        //1070918 Zen 1050087 二代升級        //var intMaxYearPlusOne = parseFloat(document.all.laMaxYearNow.innerText) + 1;
        var intMaxYearPlusOne = parseFloat(document.all.laMaxYearNow.textContent) + 1;
        if (intYear > intMaxYearPlusOne)
        {
            jf_ShowMeg("年度不可大於 " + intMaxYearPlusOne + " (目前最大統計年度+1)", "輸入年度有誤");
            return false;
        }
    }
    return true;
}
