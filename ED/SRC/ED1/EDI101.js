/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 0960125	Stella	David	955245		掛號號碼使用SYSTEM_SET控制是否顯示
 * 1040511	David	Kenny	1040295		增加登錄日期欄位後小日曆按鍵
 * 1050407	David	Joe 	1050087		二代公文修改
 * 1050511	David	Kevin_C	1050055		新增時間檢核
 * 1051019  Leslie  Kenny   1050087     二代公文修改
 * 1090317  Kevin   Zen     1090093     修改登錄日期為必要欄位
 * 1090924  Zen     Zen     1090687     單位異動後更新承辦人選單之行為改於Client端執行避免頻繁PostBack
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050407 Joe 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
    //96.01.25 955245 David
    DgHeaderSet();

    //1090924 Zen 1090687 單位異動後更新承辦人選單之行為改於Client端執行避免頻繁PostBack    document.all["H_Dept"].value = '';    var strEmpName = document.all["H_User"].value;    dlDept_Text_onblur();
    document.all["H_User"].value = strEmpName;
    document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    document.all['dlUser'].value = document.all["H_User_Value"].value;
    document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e) {
    //1051019   Kenny   [1050087]   二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        //1040511	Kenny	 1040295	增加登錄日期欄位後小日曆按鍵
        //1050308 	Joe		 1050087	二代公文修改，刪除小日曆處理
        /*
		case "tbSDate":
	        Page_BlockSubmit = true;
	        jf_CallCalendar(document.all.txRcvdateS, event.screenX, event.screenY);
	        break;
	    case "tbEDate":
	        Page_BlockSubmit = true;
	        jf_CallCalendar(document.all.txRcvdateE, event.screenX, event.screenY);
	        break;
		*/
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050407 Joe 1050087 二代公文修改
function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    //1050407 Joe 1050087 二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btSearch":
            Page_BlockSubmit = !(fnCheckBeforeSubmit() && jf_CheckKeyObject());
            //1050407 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            Page_BlockSubmit = !(fnCheckBeforeSubmit() && jf_CheckKeyObject());
            //1050407 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !(fnCheckBeforeSubmit() && jf_CheckKeyObject());
            //1050407 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function fnCheckBeforeSubmit() {
    if (!CheckCDATE("txRcvdateS", "登錄日期(起)") || !CheckCDATE("txRcvdateE", "登錄日期(訖)"))
        return false;
    //1050511   Kevin_C   1050055   新增時間檢核
    if (!CheckTime("txRcvTimeS", "登錄時間(起)") || !CheckTime("txRcvTimeE", "登錄時間(訖)"))
        return false;

    //1090317 Zen 1090093 修改登錄日期為必要欄位
    if (document.all['txRcvdateS'].value == '' && document.all['txRcvdateE'].value == '') {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["登錄日期起訖不可皆為空"])), "");
        return false;
    }

    return true;
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//組出回傳值
function ReturnValue(argMailNo) {
    try {
        opener.document.all.lbReturnValue.length = 1;
        opener.document.all.lbReturnValue.options[0].value = argMailNo;
        opener.window.CallBack("EDI101");
        close();
    }
    catch (e) { }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function fnUserOnChange() {
    //1090924 Zen 1090687 單位異動後更新承辦人選單之行為改於Client端執行避免頻繁PostBack    var strEmpName = document.all.dlUser.options[document.all.dlUser.selectedIndex].text;    if (strEmpName != document.all["H_User"].value) {
        document.all.txUser.value = document.all.dlUser.options[document.all.dlUser.selectedIndex].text;
        //呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
        document.all["H_User"].value = document.all.txUser.value;
        document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    }
    document.all.txUser.value = strEmpName;
}

//96.01.25 955245 David
function DgHeaderSet() {
    if (document.all["dg1"] != null) {
        var sysMail = document.all["txSysMail"].value;
        if (sysMail == "Y") {
            document.all["dg1__ctl1_dglbMail"].innerText = "郵件號碼";
        }
        else {
            document.all["dg1__ctl1_dglbMail"].innerText = "掛號號碼";
        }
    }
}
//1050511   Kevin_C   1050055   新增時間檢核
var bHasCheck = false;
function CheckTime(argId, argMsg) {
    if (bHasCheck) {
        bHasCheck = false;
        return;
    }
    bHasCheck = true;
    var strTime = document.all[argId].value;
    if (strTime != "") {
        if (strTime.length < 4) {
            strTime = jf_PADL(strTime, 4, '0');
            document.all[argId].value = strTime;
        }
        var strHour = strTime.substr(0, 2);
        var strMinute = strTime.substr(2, 2);
        if (strHour < "00" || strHour > "23" || strMinute < "00" || strMinute > "59") {
            document.all[argId].focus();
            jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])), "");
            bHasCheck = false;
            return false;
        }
    }
    bHasCheck = false;
    return true;
}

//1090924 Zen 1090687 單位異動後更新承辦人選單之行為改於Client端執行避免頻繁PostBackfunction dlDept_Text_onblur() {
    var strDeptName = document.all.dlDept.options[document.all.dlDept.selectedIndex].text;
    if (strDeptName != document.all["H_Dept"].value) {
        //呼叫ED_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單

        document.all.txDept.value = strDeptName;
        //存ComboBox_Text的value
        document.all["H_Dept"].value = document.all.txDept.value;
        //存所選擇的ComboBox項目的value
        document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

        var valUser = new Array(3);
        valUser[0] = encodeURI(dlDept.value);
        valUser[1] = '';
        valUser[2] = true;
        var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);

        var resultObj = null;
        if (jf_IsWebServiceSuccess(callObj)) {
            resultObj = callObj.value;
        }

        //清空選項
        while (dlUser.length > 0)
            dlUser.remove(0);

        //重新新增選項
        len = resultObj.UserName.length;
        dlUser.options.add(new Option("", ""));
        for (i = 0 ; i < len ; i++) {
            //項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
            var objOption = new Option(resultObj.EmpName[i], resultObj.UserName[i])
            dlUser.options.add(objOption);
        }

        document.all["H_User"].value = document.all["dlUser"].value;
        document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
        //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
        document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

    }
}