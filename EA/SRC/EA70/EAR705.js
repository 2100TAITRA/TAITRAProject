/*
 * DATE     PRG	    MGR_NO	    DESC
 * 1060315  Justin  1050087     二代公文修改
 * 1060517  Justin  1050087	    修正檢核未過需阻止POSTBACK
 * 1060724  Zen     1060424     (內政部)新增查詢條件、客製化報表、匯出Excel功能
 * 1060912  Zen     1060870     (內政部)新增二級單位選單
 * 1061207  Cloud   1061192     (中興大學)增加簡要案由查詢欄位、排序增加文號/檔號，增加EXCEL功能
 * 1070913  Cloud   1070786     (中興大學)增加案由查詢欄位
 * 1090917  Zen     1090571     (信保)調整目次號欄位長度為6碼
 * 1140904	Daniel  1141137		(外貿)修改案次號欄位與呈現畫面以符合外貿協會現行檔號邏輯
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");
//1060315  Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
    /*1060315  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次

	jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmp", false, null); //使用WebService前必須先呼叫一次*/


    //1060912 Zen 1060870 (內政部)新增二級單位選單查詢條件
    SyncDL();
    //1140904  Daniel  1141137		(外貿)外貿目次號改為四碼並修改案次號提示欄位的長度
    if (document.all['OrgNickName'].value == 'TAITRA') {
        txSeq.setAttribute("maxlength", "4");
        txSeq.style.width = "2.5em";
        dCaseSize.style.width = "10.75em";

    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060315  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e) {
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null) {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
            /*1060315  Justin [1050087] 二代公文修改
			//小月曆功能
		case "btSDate":	
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txRMVSEC_DATES , event.screenX-0, event.screenY-0);
			break;	
		case "btEDate":	
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txRMVSEC_DATEE , event.screenX-0, event.screenY-0);
			break;	
		case "ImACPS":	
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txACP_DATES , event.screenX-0, event.screenY-0);
			break;	
		case "ImACPE":	
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txACP_DATEE , event.screenX-0, event.screenY-0);
			break;
		case "ImCLOSES":	
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txCLOSE_DATES , event.screenX-0, event.screenY-0);
			break;	
		case "ImCLOSEE":	
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txCLOSE_DATEE , event.screenX-0, event.screenY-0);
			break;	*/
        case "btHelpCls":
            var strUrl = "";
            ActiveBtn = "btHelpCls";
            strUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAR705&MODE=1&FILE_CLS=" + document.all["txCls"].value;
            //1060315  Justin [1050087] 二代公文修改
            //jf_OpenChildWin(strUrl, "EAC005", 750, 550);
            jf_OpenChildWin(strUrl, "EAC005", 800, 600);
            Page_BlockSubmit = true;
            break;
        case "btHelpCase":
            var strUrl = "";
            ActiveBtn = "btHelpCase";
            strUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAR705&MODE=2&FILE_CASE=" + document.all["txCase"].value;
            //1060315  Justin [1050087] 二代公文修改
            //jf_OpenChildWin(strUrl, "EAC005", 750, 550);
            jf_OpenChildWin(strUrl, "EAC005", 800, 600);
            Page_BlockSubmit = true;
            break;
        //1140904  Daniel  1141137	(外貿)增加國別查詢子視窗
        case "btHelpCountry":
            var strUrl = "";
            ActiveBtn = "btHelpCountry";
            strUrl = "../EA01/EAI014.aspx";
            jf_OpenChildWin(strUrl, "EAI014", 800, 600);
            Page_BlockSubmit = true;
            break;
        case "btHelpProduct":
            var strUrl = "";
            ActiveBtn = "btHelpProduct";
            strUrl = "../EA01/EAI015.aspx";
            jf_OpenChildWin(strUrl, "EAI015", 800, 600);
            Page_BlockSubmit = true;
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060315  Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
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

    //1060315  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btSearch":
            //1060724 Zen 1060424 移至外部涵式
            //if (document.all["txDOC_NOS"].value == "" && document.all["txDOC_NOE"].value == "")
            //{
            //    if (document.all["txYear"].value == "" && document.all["txCls"].value == "" && document.all["txCase"].value == "" && document.all["txVol"].value == "" && document.all["txSeq"].value == "")
            //    {
            //        if (document.all["txSEC_SEQS"].value == "" && document.all["txSEC_SEQE"].value == "" && document.all["txRMVSEC_DATES"].value == "" && document.all["txRMVSEC_DATEE"].value == "")
            //        {
            //            if (document.all["txACP_DATES"].value == "" && document.all["txACP_DATEE"].value == "" && document.all["txCLOSE_DATES"].value == "" && document.all["txCLOSE_DATEE"].value == "")
            //            {
            //                if (document.all["dlDept_Text"].value == "" && document.all["dlUser_Text"].value == "")
            //                {
            //                    alert('請至少輸入一個條件以增快查詢速度。');
            //                    //1060724 Zen 1060424 修正檢核未過需阻止POSTBACK
            //                    Page_BlockSubmit = true;
            //                    return;
            //                }
            //            }
            //        }
            //    }
            //}

            //1060912 Zen 1060870 (內政部)新增二級單位選單查詢條件
            SyncDL();

            dlUser_onblur();

            if (GetDeptTextExist())
                document.all["txDL"].value = collectDL();
            else
                document.all["txDL"].value = "";

            //1060724 Zen 1060424 postback前檢核欄位不可皆為空
            //Page_BlockSubmit = false;
            Page_BlockSubmit = !CheckBeforeSearch();

            //1060315  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            //1060724 Zen 1060424 (內政部)紀錄機關別名
            var strOrgNickName = document.all.H_OrgNickName.value;
            jf_ConfirmClean(true);
            //1060315 Justin [1050087] 二代公文修改
            //document.all["txDOC_NOS"].focus();
            $('#txDOC_NOS').focus();
            //1060724 Zen 1060424 (內政部)紀錄機關別名並還原預設值
            document.all.H_OrgNickName.value = strOrgNickName;

            //1060724 Zen 1060424 (內政部)還原預設值
            if (strOrgNickName == "MOI")
                document.all.rbFileYear.checked = true;
            break;
        case "btPrint":
            //1060724 Zen 1060424 移至外部涵式
            //if (document.all["txDOC_NOS"].value == "" && document.all["txDOC_NOE"].value == "")
            //{
            //    if (document.all["txYear"].value == "" && document.all["txCls"].value == "" && document.all["txCase"].value == "" && document.all["txVol"].value == "" && document.all["txSeq"].value == "")
            //    {
            //        if (document.all["txSEC_SEQS"].value == "" && document.all["txSEC_SEQE"].value == "" && document.all["txRMVSEC_DATES"].value == "" && document.all["txRMVSEC_DATEE"].value == "")
            //        {
            //            if (document.all["txACP_DATES"].value == "" && document.all["txACP_DATEE"].value == "" && document.all["txCLOSE_DATES"].value == "" && document.all["txCLOSE_DATEE"].value == "")
            //            {
            //                if (document.all["dlDept_Text"].value == "" && document.all["dlUser_Text"].value == "")
            //                {
            //                    alert('請至少輸入一個條件以增快查詢速度。');
            //                    //1060724 Zen 1060424 修正檢核未過需阻止POSTBACK
            //                    Page_BlockSubmit = true;
            //                    return;
            //                }
            //            }
            //        }
            //    }
            //}

            //1060912 Zen 1060870 (內政部)新增二級單位選單查詢條件
            SyncDL();

            dlUser_onblur();

            if (GetDeptTextExist())
                document.all["txDL"].value = collectDL();
            else
                document.all["txDL"].value = "";

            //1060724 Zen 1060424 postback前檢核欄位不可皆為空
            //Page_BlockSubmit = false;
            Page_BlockSubmit = !CheckBeforeSearch();

            //1060315  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            //1060724 Zen 1060424 移至外部涵式
            //if (document.all["txDOC_NOS"].value == "" && document.all["txDOC_NOE"].value == "")
            //{
            //    if (document.all["txYear"].value == "" && document.all["txCls"].value == "" && document.all["txCase"].value == "" && document.all["txVol"].value == "" && document.all["txSeq"].value == "")
            //    {
            //        if (document.all["txSEC_SEQS"].value == "" && document.all["txSEC_SEQE"].value == "" && document.all["txRMVSEC_DATES"].value == "" && document.all["txRMVSEC_DATEE"].value == "")
            //        {
            //            if (document.all["txACP_DATES"].value == "" && document.all["txACP_DATEE"].value == "" && document.all["txCLOSE_DATES"].value == "" && document.all["txCLOSE_DATEE"].value == "")
            //            {
            //                if (document.all["dlDept_Text"].value == "" && document.all["dlUser_Text"].value == "")
            //                {
            //                    alert('請至少輸入一個條件以增快查詢速度。');
            //                    //1060724 Zen 1060424 修正檢核未過需阻止POSTBACK
            //                    Page_BlockSubmit = true;
            //                    return;
            //                }
            //            }
            //        }
            //    }
            //}

            //1060912 Zen 1060870 (內政部)新增二級單位選單查詢條件
            SyncDL();

            dlUser_onblur();

            if (GetDeptTextExist())
                document.all["txDL"].value = collectDL();
            else
                document.all["txDL"].value = "";

            //1060724 Zen 1060424 postback前檢核欄位不可皆為空
            //Page_BlockSubmit = false;
            Page_BlockSubmit = !CheckBeforeSearch();

            Page_BlockSubmit = false;
            //1060315  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1060724 Zen 1060424 (內政部)新增匯出Excel功能
        case "btExcel":
            dlUser_onblur();

            if (GetDeptTextExist())
                document.all["txDL"].value = collectDL();
            else
                document.all["txDL"].value = "";

            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult) {
    //1060912 Zen 1060870 (內政部)新增二級單位選單查詢條件
    if (argResult.id == CallWS_ID_SECT) {
        if (jf_IsWebServiceSuccess(argResult)) {
            WSResult = argResult.value;

            while (document.all.dlSect.options[0] != null) {
                document.all.dlSect.options[0] = null;
            }

            var DropListChild = document.createElement("OPTION");
            DropListChild.text = "";
            DropListChild.value = "";
            document.all.dlSect.options.add(DropListChild);

            if (WSResult.SecNo.length != 0 && document.all["H_OrgNickName"].value == 'MOI') {

                ClearDL(document.all["dlSect"]);

                var Blank_Data = document.createElement("OPTION");
                Blank_Data.text = "";
                Blank_Data.value = ":";
                document.all.dlSect.options.add(Blank_Data);

                for (var i = 0; i < WSResult.SecNo.length; i++) {
                    var SectDropListChild = document.createElement("OPTION");
                    SectDropListChild.text = WSResult.SecName[i];
                    //為了與EA_LIB.CS中Function組出元素相同，額外新增兩欄位
                    SectDropListChild.value = WSResult.DeptNo[i] + ":" + WSResult.DeptName[i] + ":" + WSResult.SecNo[i] + ":" + WSResult.SecName[i];
                    document.all.dlSect.options.add(SectDropListChild);
                }
                if (document.all["dlSect"].options.length > 10) {
                    document.all["dlSect"].size = 10;
                }
                else
                    document.all["dlSect"].size = document.all["dlSect"].options.length;

                document.all["dlSect_Container"].className = 'custom-combobox';
            }
            else
                document.all["dlSect_Container"].className = 'hide';
        }
    }
}
/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId) {
    if (argCallerId == "EAC005") {
        if (ActiveBtn == "btHelpCls") {
            if (document.all["lbReturnValue"].length > 0) {
                document.all["txCls"].value = document.all["lbReturnValue"].options[1].value;
            }
        }
        if (ActiveBtn == "btHelpCase") {
            if (document.all["lbReturnValue"].length > 0) {
                document.all["txCase"].value = document.all["lbReturnValue"].options[2].value;
            }
        }
        //1140904  Daniel  1141137	(外貿)處理國別查詢子視窗回傳值
    }
    if (argCallerId == "EAI014") {
        if (ActiveBtn == "btHelpCountry") {
            if (document.all["lbReturnValue"].length > 0) {
                document.all["txCountryNo"].value = document.all["lbReturnValue"].options[0].value;
            }
        }
    }
    if (argCallerId == "EAI015") {
        if (ActiveBtn == "btHelpProduct") {
            if (document.all["lbReturnValue"].length > 0) {
                document.all["txProductNo"].value = document.all["lbReturnValue"].options[0].value;
            }
        }
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//紀錄Client端所選擇之UserID
function jf_dlUserChange() {
    //alert(document.all["dlUser"].options(document.all["dlUser"].selectedIndex).value)
    var empUserInfo = document.all["dlUser"].options(document.all["dlUser"].selectedIndex).value;
    var tempstr = empUserInfo.split(":");
    document.all["empUserId"].value = tempstr[2];

}
function CheckDate(id, str) {
    var strDateValue;
    strDateValue = document.all[id].value;
    if (strDateValue == "") {
        return;
    }

    strDateValue = jf_PADL(strDateValue, 7, "0");
    document.all[id].value = strDateValue;
    if (!jf_CheckCDATE(strDateValue)) {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([str])), "");
        //1060315 Justin [1050087] 二代公文修改
        //document.all[id].focus();
        $('#' + id).focus();
        document.all[id].value = "";
    }
}
function jf_Add(id) {
    if (document.all[id].value != "") {
        var tmp;
        tmp = document.all[id].value;
        tmp = jf_PADL(tmp, 4, "0");
        document.all[id].value = tmp;
    }
}
function jf_Add_2(id) {
    //1090917 Zen 1090571 (信保)調整目次號欄位長度為6碼
    var nFileSeqLength = 3;
    if (document.all['H_OrgNickName'].value == 'SMEG')
        nFileSeqLength = 6;

    if (document.all[id].value != "") {
        var tmp;
        tmp = document.all[id].value;
        //1090917 Zen 1090571 (信保)調整目次號欄位長度為6碼
        //tmp = jf_PADL(tmp, 3, "0");
        tmp = jf_PADL(tmp, nFileSeqLength, "0");
        document.all[id].value = tmp;
    }
}
//取得ComboBox中，與目前ComboBox_Text相對應的值
function jf_GetSelectValue() {
    var RtnValue = "";
    for (var i = 0; i < argSelect.options.length; i++) {
        if (argSelect.options[i].value == argText) {
            RtnValue = argSelect.options[i].value;
            break;
        }
    }
    return RtnValue;
}
function collectDL() {
    var str = "";
    for (var i = 0; i < document.all["dlUser"].options.length; i++) {
        //1060315  Justin [1050087] 二代公文修改
        //str += document.all["dlUser"].options(i).text + "," + document.all["dlUser"].options(i).value +","
        str += document.all["dlUser"].options[i].text + "," + document.all["dlUser"].options[i].value + ",";
    }
    return str;
}
function dlUser_onblur() {
    var checker = false;
    if (document.all["dlUser_Text"].value == "") {
        checker = true;
        document.all["empUserId"].value = "";
    }
    else {

        for (var i = 0; i < document.all["dlUser"].options.length; i++) {
            if (document.all["dlUser"].options[i].text == document.all["dlUser_Text"].value) {
                checker = true;
                //1060912 Zen 1060870 Bug修正
                //document.all["empUserId"].value = document.all["dlUser"].options(i).value.split(":")[2];
                document.all["empUserId"].value = document.all["dlUser"].options[i].value.split(":")[2];
            }
        }
    }

    if (!checker) {
        document.all["empUserId"].value = document.all["dlUser_Text"].value;
    }

    return checker;
}

/**********************************************************************************************
  Name : function akjf_DeptCheck()
  Desc : 離開部門欄位的合理性檢查與人員欄位的連動處理
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
         argUserComboBoxID      : string 人員Combobox 物件 ID
  Rtn  : none
 **********************************************************************************************/
//1060912 Zen 1060870 (內政部)新增二級單位選單查詢條件，改寫相關邏輯
//function jf_DeptCheck(argDeptComboBoxID, argUserComboBoxID)
//{
//    /*** 離開欄位時檢查代碼或名稱是否存在 ***/
//    var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
//    var DeptComboBoxObj = document.all[argDeptComboBoxID];
//    var i, j, len;
//    var checkOK = false;
//    for (i = 0 ; i < DeptComboBoxObj.options.length ; i++)
//    {
//        if (checkOK) break;
//        var arr = DeptComboBoxObj.options[i].value.split(":");
//        for (j = 3 ; j >= 0 ; j--)
//        {
//            if (arr[j] == DeptComboBoxTextObj.value)
//            {
//                checkOK = true;
//                DeptComboBoxObj.selectedIndex = i;
//                break;
//            }
//        }
//    }
//    if (!checkOK)
//    {
//        ClearDL(document.all.dlUser);
//        document.all["dlUser_Text"].value = "";
//        document.all["txDL"].value = "";

//        //alert("單位輸入錯誤");
//        return;
//    }
//    /*** END ***/

//    var val = DeptComboBoxObj.value;
//    var arr = val.split(":");

//    if (arr.length != 4) return;

//    if (arr[2] == "") val = arr[0];
//    else val = arr[2];

//    callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, val);

//    var resultObj = null;
//    if (callObj.error)
//    {
//        alert(callObj.errorDetail.string);
//    }
//    else
//    {
//        if (jf_IsWebServiceSuccess(callObj))
//            resultObj = callObj.value;
//    }

//    var UserComboBoxObj = document.all[argUserComboBoxID];
//    var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
//    var UserNameMem = DeptComboBoxTextObj.value;

//    //clear the ComboBox of User
//    len = UserComboBoxObj.length;
//    for (i = 0 ; i < len ; i++)
//        UserComboBoxObj.remove(0);

//    //add new data into the ComboBox of User
//    len = resultObj.UserName.length;
//    UserComboBoxObj.options.add(new Option("", ""));
//    for (i = 0 ; i < len ; i++)
//    {
//        var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i])
//        UserComboBoxObj.options.add(objOption);
//    }

//    //clear the data of ComboBox of User and reset it.
//    UserComboBoxTextObj.value = "";
//    UserComboBoxObj.selectedIndex = -1;
//    for (i = 0 ; i < len ; i++)
//    {
//        if (UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i])
//        {
//            UserComboBoxTextObj.value = resultObj.EmpName[i];
//            UserComboBoxObj.selectedIndex = i;
//            break;
//        }
//    }
//}

//1060912 Zen 1060870 (內政部)新增二級單位選單查詢條件
function jf_SectCheck(argSectComboBoxID, argUserComboBoxID) {
    /*** 離開欄位時檢查代碼或名稱是否存在 ***/

    var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
    var SectComboBoxObj = document.all[argSectComboBoxID];

    var UserComboBoxObj = document.all[argUserComboBoxID];
    var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
    var UserNameMem = SectComboBoxTextObj.value;

    var val = SectComboBoxObj.value;
    var arr = val.split(":");
    if (arr[2] == "") val = arr[0];
    else val = arr[2];

    //二級欄位為空則取一級
    if (SectComboBoxTextObj.value == "") {
        val = document.all["dlDept"].value.split(":")[0];
    }
    callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, val);
    CallWS_ID_USER = callObj.id;

    var resultObj = null;
    if (callObj.error) {
        alert(callObj.errorDetail.string);
    }
    else {
        if (jf_IsWebServiceSuccess(callObj))
            resultObj = callObj.value;
    }

    //clear the ComboBox of User
    len = UserComboBoxObj.length;
    for (i = 0 ; i < len ; i++)
        UserComboBoxObj.remove(0);

    //add new data into the ComboBox of User
    len = resultObj.UserName != null ? resultObj.UserName.length : 0;
    UserComboBoxObj.size = len > 0 ? (len + 1) : 2;
    UserComboBoxObj.options.add(new Option("", ""));
    for (i = 0 ; i < len ; i++) {
        var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i] + ":" + resultObj.EmpName[i])
        UserComboBoxObj.options.add(objOption);
    }
    //clear the data of ComboBox of User and reset it.
    UserComboBoxObj.selectedIndex = -1;
    for (i = 0 ; i < len ; i++) {
        if (UserComboBoxTextObj.value == resultObj.EmpName[i] || UserComboBoxTextObj.value == resultObj.UserName[i]) {
            UserComboBoxTextObj.value = resultObj.EmpName[i];
            UserComboBoxObj.selectedIndex = i;
            break;
        }
    }
}

//將DropDownList裡的item清除
function ClearDL(argObj) {
    for (var i = 0 ; i < argObj.length; i++)
        argObj.remove(0);

    argObj.length = 0;
    return;
}
//取得dldept有無存在於下方ddl中
function GetDeptTextExist() {
    var checker = false;

    for (var i = 0; i < document.all["dlDept"].options.length; i++) {
        if (document.all["dlDept"].options[i].text == document.all["dlDept_Text"].value) {
            checker = true;
        }
    }
    return checker;

}

//1060724 Zen 1060424 查詢前檢核涵式
function CheckBeforeSearch() {
    if (document.all.H_OrgNickName.value == 'MOI') {
        var strFileYearS = document.all.txFileYearS.value;
        var strFileYearE = document.all.txFileYearE.value;

        if (strFileYearS == '' && strFileYearE != '')
            document.all.txFileYearS.value = strFileYearE
        else if (strFileYearS != '' && strFileYearE == '')
            document.all.txFileYearE.value = strFileYearS
        else if (strFileYearS.localeCompare(strFileYearE) > 0) {
            document.all.txFileYearS.value = strFileYearE
            document.all.txFileYearE.value = strFileYearS
        }
    }

    if (document.all["txDOC_NOS"].value == "" && document.all["txDOC_NOE"].value == "") {
        if (document.all["txYear"].value == "" && document.all["txCls"].value == "" && document.all["txCase"].value == "" && document.all["txVol"].value == "" && document.all["txSeq"].value == "") {
            if (document.all["txSEC_SEQS"].value == "" && document.all["txSEC_SEQE"].value == "" && document.all["txRMVSEC_DATES"].value == "" && document.all["txRMVSEC_DATEE"].value == "") {
                if (document.all["txACP_DATES"].value == "" && document.all["txACP_DATEE"].value == "" && document.all["txCLOSE_DATES"].value == "" && document.all["txCLOSE_DATEE"].value == "") {
                    if (document.all["dlDept_Text"].value == "" && document.all["dlUser_Text"].value == "") {
                        //1061207 Cloud 1061192 修正，非內政部條件檢核會異常的bug
                        //if (document.all["txFileYearS"].value == "" && document.all["txFileYearE"].value == "")
                        if (document.all.H_OrgNickName.value == 'MOI') {
                            if (document.all["txFileYearS"].value == "" && document.all["txFileYearE"].value == "") {
                                alert('請至少輸入一個條件以增快查詢速度。');
                                return false;
                            }
                        }
                        else if (document.all.H_OrgNickName.value == 'NCHU') {
                            //1061207   Cloud    1061192 (中興大學)增加簡要案由查詢欄位
                            //1070913   Cloud	  1070786     (中興大學)增加案由查詢欄位
                            //if (document.all["txbriefsubject"].value == "")
                            if (document.all["txbriefsubject"].value == "" && document.all["txSubject"].value == "") {
                                alert('請至少輸入一個條件以增快查詢速度。');
                                return false;
                            }
                        }
                        else {
                            alert('請至少輸入一個條件以增快查詢速度。');
                            return false;

                        }
                    }
                }
            }
        }
    }

    return true;;
}

//1060912 Zen 1060870 (內政部)新增二級單位選單查詢條件，dlDept下拉選單連動
var CallWS_ID_SECT;
function SyncDL() {
    document.all["H_Dept_Value"].value = '';
    document.all["H_Sect_Value"].value = '';

    if (document.all["dlDept_Text"].value != "") {
        var dlDept = document.all['dlDept'];
        if (dlDept.selectedIndex != -1)
            document.all["H_Dept_Value"].value = dlDept.options[dlDept.selectedIndex].value;

        var strArr1 = new Array();
        var strArr2 = new Array();
        var bAction = true;
        var bDept = false;
        var bSect = false;

        document.all["dlDept"].selectedIndex = -1;
        for (var i = 0 ; i < document.all["dlDept"].length ; i++) {
            if (document.all["dlDept"].options[i].text == document.all["dlDept_Text"].value) {
                document.all["dlDept"].selectedIndex = i;
                bDept = true;
                break;
            }
        }

        if (document.all["dlDept"].selectedIndex != -1) {
            strArr1 = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');
        }
        else
            bAction = false;

        //取二級單位用
        var param1 = new Array(3);
        param1[0] = false;
        param1[1] = true;
        param1[2] = strArr1[0];

        var callObj;

        if (bAction && param1[2] != '') {
            callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDepts", false, param1);
            CallWS_ID_SECT = callObj.id;
            OnWSResult(callObj);
            SyncSc();
        }
        else {
            ClearDL(document.all["dlSect"]);
            document.all["dlSect_Container"].className = 'hide';
        }
    }
    else {
        ClearDL(document.all["dlSect"]);
        document.all["dlSect_Container"].className = 'hide';
    }
}

//1060912 Zen 1060870 (內政部)新增二級單位選單查詢條件，dlSect下拉選單連動
function SyncSc() {
    if (document.all["dlDept_Text"].value != "") {
        var dlSect = document.all['dlSect'];
        if (dlSect.selectedIndex != -1)
            document.all["H_Sect_Value"].value = dlSect.options[dlSect.selectedIndex].value;

        document.all["dlSect"].selectedIndex = -1;
        for (var i = 0 ; i < document.all["dlSect"].length ; i++) {
            if (document.all["dlSect"].options[i].text == document.all["dlSect_Text"].value) {
                document.all["dlSect"].selectedIndex = i;
                break;
            }
        }
    }

    jf_SectCheck('dlSect', 'dlUser');
}
//1140904  Daniel  1141137	(外貿)以國別、處別、細目號/產品別欄位取代案次號
function TbOnBlur(argTextBox) {
    if (argTextBox == "txCountryNo" || argTextBox == "txDivisionNo" || argTextBox == "txProductNo") {
        var strTarget = document.all[argTextBox].value;
        if (strTarget != "") {
            if (strTarget.length < 3) {
                if (argTextBox == "txDivisionNo")
                    strTarget = jf_PADL(strTarget, 3, '0');
                else
                    strTarget = jf_PADR(strTarget, 3, '0');
                document.all[argTextBox].value = strTarget;
            }
        }
    }
}