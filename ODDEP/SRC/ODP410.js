/* DATE		SA			PRG		MGR_NO	DESC
 * 0960829				Zoey	001448 	承辦人下拉選單空白
 * 0970403				Iris	000985 	新增稽催日期查詢
 * 0991029				Johnny	0990631	修正併無判斷登記桌錯誤
 * 0960829 				Zoey    001448  承辦人下拉選單空白
 * 1020618				Jagle	1011215	增加二級單位下拉選單(MERGE至需求版)
 * 1020815				Erin	1020100	點選按鈕時應觸發onblur
 * 1050520	KEVIN		JOE		1050087	二代系統升級
 * 1090331  Leslie      Zen     1081155 修正因jQuery升級衍生之cobobox無法自行觸發onblur之問題
 * 1100226	KEVIN		Joe		--		修正升二代漏Mark的無用呼叫
 * 1110103  Kevin       Zen     1101292 修正多次點擊重複PostBack之問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050422	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050422	Joe	1050087	二代系統升級
    // if (document.all["ValidationSummary1"].textContent != "")
    // alert(document.all["ValidationSummary1"].textContent);
    jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        //1050422	Joe	1050087	二代系統升級
        /* 		case "ibDue1":
                {
                    Page_BlockSubmit=true;
                    jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
                    break;
                }		
                case "ibDue2":
                {
                    Page_BlockSubmit=true;
                    jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
                    break;
                } */
        /*
		case "":
			break;
		*/
    }
}

//1050422	Joe	1050087	二代系統升級，傳入參數event
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050422	Joe	1050087	二代系統升級
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btPush":
            if (document.all.cbRcv.checked == false && document.all.cbDraft.checked == false)
            {
                alert('請至少勾選一種稽核公文類型');
                return;
            }
            Page_BlockSubmit = false;
            //1050422	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
        case "btPrintList":
        case "btPrintNotify":
            if (document.all.cbCoworkMain && document.all.cbCoworkHelp)
            {
                if (document.all.cbCoworkMain.checked == false && document.all.cbCoworkHelp.checked == false)
                {
                    alert('請至少勾選主辦或會辦之稽核公文類型');
                    return;
                }
            }
            //1020815 Erin [1020100] 點選按鈕時應onblur
            //1090331 Zen 1081155 修正因jQuery升級衍生之cobobox無法自行觸發onblur之問題
            //if (!document.all.dlDept_Text.onblur())
            if (!dlDEPT_Text_onblur())
                Page_BlockSubmit = true;
            //1090331 Zen 1081155 修正因jQuery升級衍生之cobobox無法自行觸發onblur之問題
            //if (!document.all.dlSect_Text.onblur())
            if (!dlSect_Text_onblur())
                Page_BlockSubmit = true;
            Page_BlockSubmit = false;

            //1050422	Joe	1050087	二代系統升級
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
    ShowMsg();
	//1100226	Joe		--		修正升二代漏Mark的無用呼叫
    // jf_CallWS("lib/OD_LIB.asmx", "HelloWorld", false, null);
    // jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, null);
    oTimerId = setInterval("fnInitUser()", 50);//Zoey [001448,96/08/28]承辦人下拉選單空白
    //0991029 修正併無判斷登記桌錯誤[0990631] Johnny
    if (document.all["Close"] && document.all["Close"].value == "Y")
        close();

}

function fnInitUser()
{
    clearInterval(oTimerId); //clear	
    akjf_DeptCheck('dlDept', 'dlUser');
    document.all["H_Value"].value = document.all["dlDept_Text"].value;
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

function dlDEPT_Text_onblur()
{
    if (odjf_CheckComboBox("dlDept"))
    {
        //值若變更時，觸動TextChange事件
        if (document.all["dlDept_Text"].value != document.all["H_Value"].value)
        {
            akjf_DeptCheck('dlDept', 'dlUser');
            //1020618	Jagle	[1011215]	增加二級單位下拉選單，需紀錄承辦人及二級單位資料
            odjf_SetdlDept("dlDept", "dlSect", "", "", true);	//初始dlSect、dlUser的處理
            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
            document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);

            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
            document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
            document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);

            //依選項多寡固定下拉式選單可見長度
            if (document.all["dlSect"].options.length > 10)
                document.all["dlSect"].size = 10;
            else if (document.all["dlSect"].options.length == 1)
                document.all["dlSect"].size = 2;
            else
                document.all["dlSect"].size = document.all["dlSect"].options.length;

            if (document.all["dlUser"].options.length > 10)
                document.all["dlUser"].size = 10;
            else if (document.all["dlUser"].options.length == 1)
                document.all["dlUser"].size = 2;
            else
                document.all["dlUser"].size = document.all["dlUser"].options.length;
        }
    }

    document.all["H_Value"].value = document.all["dlDept_Text"].value;
}
function adjust()
{
    var strS = jf_Trim(document.all.txSDate.value);
    var strE = jf_Trim(document.all.txEDate.value);
    if (strS != "" && strE == "")
        document.all.txEDate.value = strS;
    else if (strS == "" && strE != "")
        document.all.txSDate.value = strE;
    else if (strS > strE)
    {
        document.all.txSDate.value = strE;
        document.all.txEDate.value = strS;
    }

}

//1020618	Jagle	[1011215]	增加二級單位下拉選單變動時的處理
function dlSect_Text_onblur()
{
    var bCheckOK = true;
    //值若變更時作處理
    if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
    {
        //呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlSect", "承辦科別"))
        {
            //存ComboBox_Text的value
            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);

            if (document.all["dlSect_Text"].value == "")
                akjf_DeptCheck('dlDept', 'dlUser');
            else
                odjf_SetdlSect("dlDept", "dlSect", "dlUser", "", true);	//初始化承辦人選單

            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
            document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);

            if (document.all["dlUser"].options.length > 10)
                document.all["dlUser"].size = 10;
            else if (document.all["dlUser"].options.length == 1)
                document.all["dlUser"].size = 2;
            else
                document.all["dlUser"].size = document.all["dlUser"].options.length;
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}