/*
 * 1060421	Kevin	Kevin_C	1050087		升二代
 * 1090917  Cloud   Zen     1090559     新增二級單位選單並依OD_FLOW_TYPE顯示
 * 1100201	Leslie	Joe		1090927		取消使用document.activeElement
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060421	Kevin_C	1050087	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg() {
    //1060421	Kevin_C	1050087	升二代
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl() {
    // var xObjectName = document.activeElement.id;
function ClientButtonControl(e) {
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

//1060421	Kevin_C	1050087	升二代
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

    //1060421	Kevin_C	1050087	升二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060421	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (ConfirmSave())//是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060421	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();	
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060421	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId) {
    /*
	//將lbReturnValue的資料帶入適當的欄位
	if (argCallerId == "SYM020C1")
	{
		document.all["txUserName"].value = document.all["lbReturnValue"].options[0].value;
		document.all["txUserNameTxChange"].value = document.all["txUserName"].value;
		//回傳值為鍵值時，觸動TextChange事件
		//__doPostBack();//for .NET Framework 1.0
		__doPostBack("","");//for .NET Framework 1.1
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	
	*/

}

function ClientOnLoad() {
    //1090917 Zen 1090559 Bug修正    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//?梁function jf_CheckDataExist敹?
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);

    //1090917 Zen 1090559 新增二級單位選單並依OD_FLOW_TYPE顯示    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_Sect"].value = document.all["dlSect_Text"].value;
    document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
    document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);

    if (document.all["H_OD_FLOW_TYPE"].value == "2")
        document.all["dlSect_Container"].className = "custom-combobox";
    else
        document.all["dlSect_Container"].className = "hide";

    //無值不顯示
    jf_HandleComboxStatus("dlSect");

    ShowMsg();
}

function OnWSResult(argResult) {
}
//1060421	Kevin_C	1050087	升二代
// function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
// {
// var index	= document.all[argDDLId].selectedIndex;
// var obj		= document.all[argDDLId].options[index];

// document.all[argTextBoxId].value = obj.text;
// document.all[argLabelId].innerText = obj.value;
// }

//儲存前檢查
function ConfirmSave() {
    var bRtnbool = false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
        bRtnbool = CheckBeforSave();

    return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave() {
    var bRtnbool = true;
    var strErrMsg = "";
    var index;
    var strValue;
    var argValue;
    if (document.all["dlDept_Text"].value == "")
        strErrMsg = "接收單位不可空白";
    else {
        index = document.all["dlDept"].selectedIndex;
        strValue = document.all["dlDept"].options[index].value;
        argValue = strValue.split(':');

        if (document.all["H_DeptNo"].value == argValue[0])
            strErrMsg = "接收單位不可為使用者的隸屬單位";
    }

    //1090917 Zen 1090559 新增二級單位選單並依OD_FLOW_TYPE顯示
    if (!dlDept_Text_onblur(true))
        bRtnBool = false;

    if (document.all["H_OD_FLOW_TYPE"].value == "2") {
        if (!dlSect_Text_onblur(true))
            bRtnBool = false;
    }

    if (strErrMsg != "") {
        bRtnbool = false;
        //1060421	Kevin_C	1050087	升二代
        //document.all["dlDept_Text"].focus();
        $('dlDept_Text').focus();
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}


//1090917 Zen 1090559 新增二級單位選單並依OD_FLOW_TYPE顯示function dlDept_Text_onblur(argIsCheckDone) {
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value) {
        //呼叫OD_LIB.js，檢查dlDept_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlDept", "承辦單位")) {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

           if (document.all["H_OD_FLOW_TYPE"].value == "2") {
                //設定承辦科別的下拉選單
                odjf_SetdlDept("dlDept", "dlSect", "", "", false);
                //存ComboBox_Text的value
                document.all["H_Sect"].value = document.all["dlSect_Text"].value;
                //存所選擇的ComboBox項目的value
                document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
                //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlFmSubDept的處理
                document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
                //依選項多寡固定下拉式選單可見長度
                if (document.all["dlSect"].options.length > 10)
                    document.all["dlSect"].size = 10;
                else if (document.all["dlSect"].options.length == 1)
                    document.all["dlSect"].size = 2;
                else
                    document.all["dlSect"].size = document.all["dlSect"].options.length;
                //無值不顯示
                jf_HandleComboxStatus("dlSect");
            }
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function dlSect_Text_onblur(argIsCheckDone) {
    var bCheckOK = true;
    if (document.all["dlSect_Text"].value != document.all["H_Sect"].value) {
        //呼叫OD_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlSect", "承辦單位")) {
            //存ComboBox_Text的value
            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function jf_HandleComboxStatus(argComboxID) {
    if (document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
        document.all[argComboxID + "_Container"].className = "custom-combobox";
}