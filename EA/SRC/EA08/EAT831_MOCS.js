/*
DATE	SA		PRG		MGR_NO	DESC
1111122 Cloud   Cloud   1110861 新增調案批次登錄作業
1111221 Cloud   Cloud   序76    取消原因增加條件選單
1120412 Cloud   Cloud   --      配合身分證資訊並非完全有轉入DB，修改不以身分證帶資訊-所需資訊   
1120629 Cloud   Cloud   序312   補強輸入不可調案公文清除該欄畫面
1120727 Cloud   Cloud   銓敘部上線報修問題_序394     補強已登錄待歸檔，不可取消調案
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
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}



/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    if (document.all["rbSearchMode"].checked)
    {
        SowDg("rbSearchMode");
    }
    else
    {
        SowDg("rbEntryMode");
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/

function ClientButtonControl(e)
{
    
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    strBtId = xObjectName;
    switch (xObjectName)
    {
        case 'btHelpS':
        case 'btHelpE':
            Page_BlockSubmit = true;
            var strUrl = "/AK/AKS502_SMEG.aspx?rtnObj=lbReturnValue&k1=0&SAMLart=" + jf_GetArtifact();
            jf_OpenChildWin(strUrl, "AKS502", 800, 600);
            break;
        	//以下屬於DataGrid ToolBar
    	case 'btDgClear':
    		Page_BlockSubmit = true;
    		jf_SelectClear('dg1', '_cbSelect')
    		break;
    	case 'btDgAll':
    		Page_BlockSubmit = true;
    		jf_SelectAll('dg1', '_cbSelect')
    		break;
    	case 'btDgInverse':
    		Page_BlockSubmit = true;
    		jf_SelectInverse('dg1', '_cbSelect')
    		break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/

function jf_ToolBarHandle(e)
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
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //*1120418      Cloud--           修正使用文號條件子文會被排除問題-一併增加日期條件
            if (document.all["rbMode"].checked && document.all["txappltDates"].value == "" && document.all["txappltDatee"].value == "")
            {
                Page_BlockSubmit = true;
                alert("申請日期起訖不可皆為空白。");
                return;
            }
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave("btSave")) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            jf_ToolBarSubmit(xObjectName);
            break;
    	case "btDelete":
    	    Page_BlockSubmit = !jf_ConfirmSave("btDelete");
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmSave("btPreview");
            if(!Page_BlockSubmit)
            {
                if (document.all["rbSearchMode"].checked)
                    jf_ToolBarSubmit(xObjectName);
                else
                {
                    Page_BlockSubmit = true;
                    //整理實際上需要印出的資料物件
                    var EAT831Print_List = new Object();
                    EAT831Print_List.Info = new Array();
                    var PrtObjInx = 0;
                    for (i = 2; i <= document.all["dg2"].rows.length; i++) {
                        //先檢核是否有調案單位、人
                        if (document.all['dg2__ctl' + i + '_dg2H_txDeptNo'].value == "" || document.all['dg2__ctl' + i + '_dg2H_userID'].value == "")
                            continue;

                        EAT831Print_List.Info[PrtObjInx] = EA08.EAT831_MOCS.NEWOBJ().value;
                        //EAT831Print_List.Info[PrtObjInx] = EAT831_MOCS_BorInfo();
                        
                        
                        EAT831Print_List.Info[PrtObjInx].BORDEPTNAME = document.all['dg2__ctl' + i + '_dg2H_txDeptName'].value;
                        EAT831Print_List.Info[PrtObjInx].BOREMPNAME = document.all['dg2__ctl' + i + '_dg2H_txuserName'].value;
                        EAT831Print_List.Info[PrtObjInx].MGRNAME = document.all['dg2__ctl' + i + '_h_MgrUser'].value;
                        EAT831Print_List.Info[PrtObjInx].Subject = document.all['dg2__ctl' + i + '_txSubject'].value;
                        
                        if (document.all['dg2__ctl' + i + '_rbOrgType'].checked) {
                            if (document.all['dg2__ctl' + i + '_txDocNo'].value != "") {
                                //將DG資料記錄至物件
                                EAT831Print_List.Info[PrtObjInx].ApplyType = "0";
                                EAT831Print_List.Info[PrtObjInx].DocNo = document.all['dg2__ctl' + i + '_txDocNo'].value;
                                EAT831Print_List.Info[PrtObjInx].FileDate = document.all['dg2__ctl' + i + '_txCloseDate'].value;
                                EAT831Print_List.Info[PrtObjInx].FileNo = document.all['dg2__ctl' + i + '_txFileNo'].value;
                                EAT831Print_List.Info[PrtObjInx].DocPage = document.all['dg2__ctl' + i + '_H_DOCCNT'].value;
                                EAT831Print_List.Info[PrtObjInx].DocList = document.all['dg2__ctl' + i + '_tx_DocLIst'].value;
                            }
                        }
                        else {
                            if (document.all['dg2__ctl' + i + '_txFullID'].value != "" && document.all['dg2__ctl' + i + '_txFullName'].value != "") {
                                EAT831Print_List.Info[PrtObjInx].ApplyType = "1";
                                EAT831Print_List.Info[PrtObjInx].FourNo = document.all['dg2__ctl' + i + '_h_txFourNo'].value;
                                EAT831Print_List.Info[PrtObjInx].strID = document.all['dg2__ctl' + i + '_txFullID'].value;
                                EAT831Print_List.Info[PrtObjInx].strName = document.all['dg2__ctl' + i + '_txFullName'].value;
                            }
                        }
                        PrtObjInx++
                    }
                    var strRtn = EA08.EAT831_MOCS.PrintApplyRpt(EAT831Print_List, document.all["nSourceOrgno"].value, document.all["nSourceName"].value, document.all["nEmpName"].value).value;
                    if (strRtn.indexOf("ERR-") == -1) {
                        var strPath = strRtn.split('|');
                        openDlg(strPath[0], strPath[1], strPath[2]);
                        document.body.style.cursor = "default";
                    }
                    else {
                        alert(strRtn.split('-')[1]);
                        document.body.style.cursor = "default";
                    }
                }
            }
            break;
        case "btPreview2":
            Page_BlockSubmit = !jf_ConfirmSave("btPreview2");
            jf_ToolBarSubmit(xObjectName);
            break;
      

    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave(argMode)
{
    var bRtnbool = false;

    if (jf_CheckBeforSave(argMode))
    {
        bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave(argMode)
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (!jf_CheckBlankAndAlert(argMode))
        bRtnbool = false;

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert(argMode) {
    
    var bHasRecord = false;
    var bHasCheck = false;
    var PerSonNoSet = "";
    //1120727   Cloud   銓敘部上線報修問題_序394     補強已登錄待歸檔，不可取消調案
    var DeCkBorStatus = "";
    if (document.all["rbSearchMode"].checked) {
        
        if (document.all["dg1"] == null || document.all["dg1"].rows.length < 2) {
            alert("沒有調案資料可供執行作業。");
            return false;
        }
        else {
            for (i = 2; i <= document.all["dg1"].rows.length; i++) {
                if (document.all['dg1__ctl' + i + '_cbSelect'].checked) {
                    bHasCheck = true;
                    if (argMode == "btSave") {
                        if (document.all['dg1__ctl' + i + '_lbborflag'].innerText == "個人檔") {
                            if (document.all['dg1__ctl' + i + '_lbBorDetailInfo'].innerText == "") {
                                if (PerSonNoSet != "")
                                    PerSonNoSet += "、";
                                PerSonNoSet += document.all['dg1__ctl' + i + '_lbSeqNo'].innerText;
                            }
                        }
                    }
                    if (argMode == "btDelete") {
                        if (document.all['dg1__ctl' + i + '_TxCanCelReason'].value == "") {
                            if (PerSonNoSet != "")
                                PerSonNoSet += "、";
                            PerSonNoSet += document.all['dg1__ctl' + i + '_lbSeqNo'].innerText;
                        }
                        //1120727   Cloud   銓敘部上線報修問題_序394     補強已登錄待歸檔，不可取消調案-S
                        if (document.all['dg1__ctl' + i + '_lbApplyStatus'].innerText == "已登錄待歸還") {
                            if (DeCkBorStatus != "")
                                DeCkBorStatus += "、";
                            DeCkBorStatus += document.all['dg1__ctl' + i + '_lbSeqNo'].innerText;
                        }
                        //1120727   Cloud   銓敘部上線報修問題_序394     補強已登錄待歸檔，不可取消調案-E
                    }
                }
            }
        }

        if (bHasCheck == false) {
            alert("至少勾選一筆資料。");
            return false;
        }
    }
    else {
        //直接登錄不會有取消調案-判斷取消調案檢核不進行
        if (argMode != "btDelete") {
            var bHasData = false;
            var bOrgDataMsg = "";
            var bPerDataMsg = "";
            for (i = 2; i <= document.all["dg2"].rows.length; i++) {
                //先檢核是否有調案單位、人
                if (document.all['dg2__ctl' + i + '_dg2H_txDeptNo'].value == "" || document.all['dg2__ctl' + i + '_dg2H_userID'].value == "")
                    continue;
                //機關檔檢核
                bHasCheck = true;
                if (document.all['dg2__ctl' + i + '_rbOrgType'].checked) {
                    if (document.all['dg2__ctl' + i + '_txDocNo'].value == "") {
                        if (bOrgDataMsg != "")
                            bOrgDataMsg += "、";
                        bOrgDataMsg += document.all['dg2__ctl' + i + '_lbSeqNo'].innerText;
                    }
                }
                else {
                    if (document.all['dg2__ctl' + i + '_txFullID'].value == "" || document.all['dg2__ctl' + i + '_txFullName'].value == "") {
                        if (bPerDataMsg != "")
                            bPerDataMsg += "、";
                        bPerDataMsg += document.all['dg2__ctl' + i + '_lbSeqNo'].innerText;
                    }
                    //個人檔檢核文冊註記-登陸才需要檢查
                    if (argMode == "btSave") {
                        if (document.all['dg2__ctl' + i + '_lbBorDetailInfo'].innerText == "") {
                            if (PerSonNoSet != "")
                                PerSonNoSet += "、";
                            PerSonNoSet += document.all['dg2__ctl' + i + '_lbSeqNo'].innerText;
                        }
                    }
                }
            }
            if (bHasCheck == false) {
                alert("至少輸入一筆調案內容(調案單位及調案人不可為空白)。");
                return false;
            }
            if (bOrgDataMsg != "") {
                if (argMode == "btSave")
                    alert("序" + bOrgDataMsg + " 尚未輸入文號，無法進行登錄。");
                else
                    alert("序" + bOrgDataMsg + " 尚未輸入文號，無法產生調案單。");
                return false;
            }
            if (bPerDataMsg != "") {
                if (argMode == "btSave")
                    alert("序" + bPerDataMsg + " 身分證及姓名皆須輸入，無法進行登錄。");
                else
                    alert("序" + bPerDataMsg + " 身分證及姓名皆須輸入，無法產生調案單。");
                return false;
            }
        }
    }
    //1120727   Cloud   銓敘部上線報修問題_序394     補強已登錄待歸檔，不可取消調案
    if (DeCkBorStatus != "") {
        alert("序[" + DeCkBorStatus + "] 狀態為[已登錄待歸還]，不可進行取消調案。");
        return false;
    }
    if (PerSonNoSet != "") {
        if (argMode == "btSave") {
            alert("序" + PerSonNoSet + " 尚未進行文冊註記，不可進行登錄。");
        }
        if (argMode == "btDelete") {
            alert("序" + PerSonNoSet + " 尚未輸入取消原因，不可進行取消調案。");
        }
        return false;
    }
    
    return true;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/

//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
   
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
var strBtId = '';
function CallBack(argCallerId)
{
    if (argCallerId == "AKS502") {
        if (strBtId == "btHelpS")
            document.all["txBorNoS"].value = document.all["lbReturnValue"].options[0].value;
        else
            document.all["txBorNoE"].value = document.all["lbReturnValue"].options[0].value;
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
var bHasCheck = false;
//檢查日期格式
/**********************************************
處理公文資訊的段落
**********************************************/



function jf_dlUserChange(argdlUserid, argUserid) {
    if (argdlUserid != undefined) {
        var id_secs = new Array(4);
        id_secs = argUserid.split("_", 4);
        var idH_userName = id_secs[0] + "__" + id_secs[2] + "_dg2H_txuserName";
        document.all[argUserid].value = document.all[argdlUserid].options[document.all[argdlUserid].selectedIndex].value;
        document.all[idH_userName].value = document.all[argdlUserid].options[document.all[argdlUserid].selectedIndex].text;
    }
    else {
        document.all["H_userID"].value = document.all.dlUser.options[document.all.dlUser.selectedIndex].value;
    }
}
function InitUserList(argDeptID, argUserid) {
    if (argDeptID == undefined) {
        SetUserByDept("dlDept", "dlUser");
        document.all["H_txDeptNo"].value = document.all.dlDept.options[document.all.dlDept.selectedIndex].value.split(':')[0];
        document.all["H_userID"].value = "";
        document.all["H_UerInfo"].value = "";
        if (document.all["dlUser"].options.length != 0) {
            for (var i = 0 ; i < document.all["dlUser"].options.length; i++) {
                if (document.all["dlUser"].options[i].text !== "" && document.all["dlUser"].options[i].value.split(":")[2] != "")
                    document.all["H_UerInfo"].value += document.all["dlUser"].options[i].text + ";" + document.all["dlUser"].options[i].value + "|";
            }
        }
    }
    else {
        SetUserByDept(argDeptID, argUserid);
        var id_secs = new Array(4);
        id_secs = argDeptID.split("_", 4);
        var idH_txDeptNo = id_secs[0] + "__" + id_secs[2] + "_dg2H_txDeptNo";
        var idH_userID = id_secs[0] + "__" + id_secs[2] + "_dg2H_userID";
        var idH_userName = id_secs[0] + "__" + id_secs[2] + "_dg2H_txuserName";
        var idH_DeptName = id_secs[0] + "__" + id_secs[2] + "_dg2H_txDeptName";
        document.all[idH_txDeptNo].value = document.all[argDeptID].options[document.all[argDeptID].selectedIndex].value.split(':')[0];
        document.all[idH_DeptName].value = document.all[argDeptID].options[document.all[argDeptID].selectedIndex].text;
        document.all[idH_userID].value = "";
        document.all[idH_userName].value = "";
    }
    
}
function SetUserByDept(argDeptObjID, argUserObjID) {
    var DeptObj = document.all[argDeptObjID];
    var i, j, len;
    var val = DeptObj.options[DeptObj.selectedIndex].value.split(':')[0];

    callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, val);

    var resultObj = null;
    if (callObj.error) {
        alert(callObj.errorDetail.string);
    }
    else {
    	if (jf_IsWebServiceSuccess(callObj))
    		resultObj = callObj.value;
    	else
    	{ return;}
    }

    var UserObj = document.all[argUserObjID];
    var UserNameMem = DeptObj.options[DeptObj.selectedIndex].text;

    //clear
    len = UserObj.length;
    for (i = 0 ; i < len ; i++)
        UserObj.remove(0);

    //add new data
    len = resultObj.UserName.length;
    UserObj.options.add(new Option("", ""));
    for (i = 0 ; i < len ; i++) {
        var objOption = new Option(resultObj.EmpName[i], resultObj.UserName[i])
        UserObj.options.add(objOption);
    }

    UserObj.selectedIndex = -1;
    for (i = 0 ; i < len ; i++) {
        if (UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i]) {
            UserObj.selectedIndex = i;
            break;
        }
    }
}
function OpenPersonDetailWindow(argID,areSeq,argValue)
{
    var pUrl = "";
    WorkID = argID;
    var id_nowDataGrid = argID;
    var id_secs = new Array(4);
    id_secs = id_nowDataGrid.split("_", 4);
    var idBorTxid = id_secs[0] + "__" + id_secs[2] + "_H_BorNo";
    var PerID = "";
    var PerName = "";
    var idNameid = id_secs[0] + "__" + id_secs[2] + "_txFullName";
    var idPidTxid = id_secs[0] + "__" + id_secs[2] + "_txFullID";
    if (document.all[idNameid] && document.all[idPidTxid]) {
        if (document.all[idNameid].value == "" || document.all[idPidTxid].value == "")
        { alert('請先輸入姓名及身分證號再進行文冊註記。'); return; }
        else
        {
            PerName = document.all[idNameid].value;
            PerID = document.all[idPidTxid].value;
        }
    }
    else {
        idNameid = id_secs[0] + "__" + id_secs[2] + "_lbPersonName";
        idPidTxid = id_secs[0] + "__" + id_secs[2] + "_lbPersonInfo";
        PerName = document.all[idNameid].textContent;
        PerID = document.all[idPidTxid].textContent;
    }
    
    strBorNO = document.all[idBorTxid].value;
    if (strBorNO == "")
        strBorNO = "NONE";
    var strUrl = "EAT831C1_MOCS.aspx?rtnObj=lbReturnValue" + "&SAMLart=" + jf_GetArtifact() + "&argID=" + argID + "&argBorNo=" + strBorNO + "&argName=" + PerName + "&argPerid=" + PerID
    jf_OpenChildWin(strUrl, "EAT831C1_MOCS", 700, 500);
    Page_BlockSubmit = true;

}
var WorkID = "";
function jf_SetPersonOfID(argID, argSeq) {
    var pUrl = "";
    WorkID = argID;
    var strUrl = "/AK/AKS801_MOCS.aspx?rtnObj=lbReturnValue" + "&SAMLart=" + jf_GetArtifact() + "&argID=" + argID;
    jf_OpenChildWin(strUrl, "AKS801_MOCS", 700, 500);
    Page_BlockSubmit = true;
}
function queryPersonDetail(id, event, argVal) {
    var id_nowDataGrid = id;
    var id_secs = new Array(4);
    id_secs = id_nowDataGrid.split("_", 4);
    var idTxSubject = id_secs[0] + "__" + id_secs[2] + "_txSubject";
    var idFullName = id_secs[0] + "__" + id_secs[2] + "_txFullName";
    var idFullID = id_secs[0] + "__" + id_secs[2] + "_txFullID";
    var idMgrKey = id_secs[0] + "__" + id_secs[2] + "_h_MgrKey";
    var idFourNo = id_secs[0] + "__" + id_secs[2] + "_h_txFourNo";
    var idMgrUser = id_secs[0] + "__" + id_secs[2] + "_h_MgrUser";
    var bisID = false;
    if (id.indexOf("txFullID") != -1)
        bisID = true;

    if (document.all[idFullName].value == "" && document.all[idFullID].value == "") {
        document.all[idMgrKey].value = "";
        document.all[idFourNo].value = "";
        document.all[idFullName].value = "";
        document.all[idTxSubject].value = "";
        document.all[idFullID].value = "";
        return;
    }
    if (!bisID && document.all[idFullName].value == "")
        return;
    if (bisID && document.all[idFullID].value == "")
        return;
    //判斷是姓名還是身分證


    if (bisID) {
        document.all[id].value = argVal.toUpperCase();
        var idCount = argVal.toUpperCase().match(/[A-Z]\d{9}/ig);
        if (idCount == undefined) {
            alert('請輸入正確格式身分證。');
            document.all[id].value = "";
            return;
        }
    }
    //檢核是否重複-身分證可能是假的-故要用身分證+姓名檢核
    var fullidName = "";
    var fullidName2 = "";
    for (i = 2; i <= document.all["dg2"].rows.length; i++) {
        fullidName = document.all["dg2__ctl" + i + "_txFullID"].value + "|" + document.all["dg2__ctl" + i + "_txFullName"].value;
        if (fullidName != "") {
            for (j = i; j <= document.all["dg2"].rows.length; j++) {
                fullidName2 = document.all["dg2__ctl" + j + "_txFullID"].value + "|" + document.all["dg2__ctl" + j + "_txFullName"].value;
                if (fullidName2 == "|")
                    continue;
                if (i == j)
                    continue;

                if (fullidName == fullidName2) {
                    alert("和第" + (j - 1) + "筆申請範圍重覆");
                    return;
                }
            }
        }
    }
    var perSonInfo;
    //1120412 Cloud    --      配合身分證資訊並非完全有轉入DB，修改不以身分證帶資訊-所需資訊
    /*if (bisID)
        perSonInfo = EA08.EAT831_MOCS.GetPersonInfo(document.all.nSourceOrgno.value, argVal, "").value;
    else*/
    if (!bisID) {
        perSonInfo = EA08.EAT831_MOCS.GetPersonInfo(document.all.nSourceOrgno.value, "", argVal).value;
        if (perSonInfo.indexOf("ERR") != -1)
        {
            //1120412 Cloud 序81輸入多身分證姓名時如已輸入身分證，不再跳訊息
            if (perSonInfo == "ERR-有多筆同名資料，請自行輸入身分證。") {
                if (document.all[idFullID].value == "")
                    alert(perSonInfo);
            }
            else
                alert(perSonInfo);
        }
        else
        {
            document.all[idMgrKey].value = perSonInfo.split('|')[0];
            document.all[idFourNo].value = perSonInfo.split('|')[2];

            if (bisID) {
                //1120321 Cloud 序81輸入不存在身分證，不帶姓名
                if (perSonInfo.split('|')[1] != undefined)
                    document.all[idFullName].value = perSonInfo.split('|')[1];
            }
            if (!bisID)//輸入姓名時身分證可能已經輸入假的，有值則不更動。
            {
                //1120412   Cloud   修正有值不取代
                //if (document.all[idFullID].value != "")
                if (document.all[idFullID].value == "")
                    document.all[idFullID].value = perSonInfo.split('|')[3];
            }
            //1120412 Cloud   Cloud   --      配合身分證資訊並非完全有轉入DB，修改不以身分證帶資訊-所需資訊
            /*document.all[idTxSubject].value = document.all[idFullName].value;
            if (document.all[idFullID].value.length = 10)
                document.all[idTxSubject].value += document.all[idFullID].value.substring(0, 1) + document.all[idFullID].value.substring(6);*/
            document.all[idMgrUser].value = perSonInfo.split('|')[4];
        }
    }
    //1120412 Cloud   Cloud   --      配合身分證資訊並非完全有轉入DB，修改不以身分證帶資訊-所需資訊-身分證或姓名異動調整主旨
    if (document.all[idFullName].value != "" && document.all[idFullID].value != "") {
        document.all[idTxSubject].value = document.all[idFullName].value;
        if (document.all[idFullID].value.length = 10)
            document.all[idTxSubject].value += document.all[idFullID].value.substring(0, 1) + document.all[idFullID].value.substring(6);
    }
}
function SowDg(argID) {
    if (argID == "rbEntryMode") {
        document.all["GridTable2"].className = "DivTable";
        document.all["GridTable"].className = "hide";
        document.all["btDelete"].disabled = true;
        document.all["btPreview2"].disabled = true;

    }
    else {
        //切換到查詢，檢查直接登錄的dg
        /*if (document.all["dg2"] != null && document.all["dg2"].rows.length > 2) {
            if (window.confirm("切換模式會將待登錄區資料清空，是否繼續?")) {
                document.all["dg1"].className = "";
                document.all["dg1head"].className = "";
                document.all["dg2"].className = "hide";
                document.all["dg2head"].className = "hide";
            }
        }*/
        document.all["GridTable2"].className = "hide";
        document.all["GridTable"].className = "DivTable";
        document.all["btDelete"].disabled = false;
        document.all["btPreview2"].disabled = false;
    }
}
function SetApplyMode(argID)
{
    var id_secs = new Array(4);
    id_secs = argID.split("_", 4);
    //輸入欄位一律清空
    var idlbDocNo = id_secs[0] + "__" + id_secs[2] + "_lbDocNo";
    var idDocNo = id_secs[0] + "__" + id_secs[2] + "_txDocNo";
    var idDocList = id_secs[0] + "__" + id_secs[2] + "_tx_DocLIst";
    var idFileNo = id_secs[0] + "__" + id_secs[2] + "_txFileNo";
    var idlbFileNo = id_secs[0] + "__" + id_secs[2] + "_lbFileNo";
    var idBorDetailInfo = id_secs[0] + "__" + id_secs[2] + "_lbBorDetailInfo";
    var idtxBorDetailInfo = id_secs[0] + "__" + id_secs[2] + "_txBorDetailInfo";
    var idlbfourno = id_secs[0] + "__" + id_secs[2] + "_lbfourno";
    var idbtSetDetail = id_secs[0] + "__" + id_secs[2] + "_btSetDetail";
    var idCloseDate = id_secs[0] + "__" + id_secs[2] + "_txCloseDate";
    var idH_DOCCNT = id_secs[0] + "__" + id_secs[2] + "_H_DOCCNT";
    var idtxFullID = id_secs[0] + "__" + id_secs[2] + "_txFullID";
    var idtxFullName = id_secs[0] + "__" + id_secs[2] + "_txFullName";
    var idbtSearchPser = id_secs[0] + "__" + id_secs[2] + "_btSearchPser";
    var idlbFileSubJect = id_secs[0] + "__" + id_secs[2] + "_txSubject";
    var idMgrUser = id_secs[0] + "__" + id_secs[2] + "_h_MgrUser";
    
    
    if (argID.indexOf("rbPerSonType") != -1)//申請個人檔
    {
        //顯示文冊註記-註記內容-啟用身分證號、姓名
        document.all[idlbDocNo].className = "hide";
        document.all[idDocNo].className = "hide";
        document.all[idDocNo].value = "";
        document.all[idDocList].value = "";
        document.all[idDocList].className = "hide";
        document.all[idlbFileNo].className = "hide";
        document.all[idFileNo].className = "hide";
        document.all[idCloseDate].className = "hide";
        document.all[idFileNo].value = "";
        document.all[idCloseDate].value = "";
        document.all[idH_DOCCNT].value = "";
        document.all[idlbFileSubJect].value = "";
        document.all[idMgrUser].value = "";
        //個人檔用
        document.all[idBorDetailInfo].className = "";
        document.all[idlbfourno].className = "";
        document.all[idbtSetDetail].className = "";
        document.all[idtxFullID].disabled = false;
        document.all[idtxFullName].disabled = false;
        document.all[idbtSearchPser].disabled = false;
    }
    else {
        //顯示文號檔號-停用身分證號、姓名
        //顯示文冊註記-註記內容-啟用身分證號、姓名
        document.all[idlbDocNo].className = "";
        document.all[idDocNo].className = "";
        document.all[idlbFileNo].className = "";
        document.all[idlbFileNo].className = "";
        document.all[idFileNo].className = "";
        document.all[idlbFileSubJect].value = "";
        document.all[idMgrUser].value = "";
        //個人檔用
        document.all[idBorDetailInfo].className = "hide";
        document.all[idBorDetailInfo].textContent = "";
        document.all[idlbfourno].className = "hide";
        document.all[idlbfourno].textContent = "";
        document.all[idbtSetDetail].className = "hide";
        document.all[idtxFullID].disabled = true;
        document.all[idtxFullID].value = "";
        document.all[idtxFullName].disabled = true;
        document.all[idtxFullName].value = "";
        document.all[idbtSearchPser].disabled = true;
        document.all[idtxBorDetailInfo].value = "";
    }

}
function queryBorrowDetail(event, file_no) {
    
    var param = new Array(6);
    var NoSecs = new Array(5);
    
    var id_nowDataGrid = event;
    var id_secs = new Array(4);
    id_secs = id_nowDataGrid.split("_", 4);
    var idTxSubject = id_secs[0] + "__" + id_secs[2] + "_txSubject";
    var idTxFileNo = id_secs[0] + "__" + id_secs[2] + "_txFileNo";
    var idtxCloseDate = id_secs[0] + "__" + id_secs[2] + "_txCloseDate";
    var idtx_DocLIst = id_secs[0] + "__" + id_secs[2] + "_tx_DocLIst";
    var idtx_MgrUser = id_secs[0] + "__" + id_secs[2] + "_h_MgrUser";

    if (file_no == "") {
        document.all[id_nowDataGrid].value = "";
        document.all[idTxSubject].value = "";
        document.all[idTxFileNo].value = "";
        document.all[idtxCloseDate].value = "";
        document.all[idtx_DocLIst].value = "";
        document.all[idtx_MgrUser].value = "";
        return;
    }
    else {
        var RtnObj = EA08.EAT831_MOCS.GetDocInfo(document.all.nSourceOrgno.value, file_no).value;
        if (RtnObj.strErrMsg.indexOf("ERR") != -1)
        {
            alert(RtnObj.strErrMsg);
            //1120629 Cloud      序312   補強輸入不可調案公文清除該欄畫面
            document.all[idTxSubject].value = "";
            document.all[idTxFileNo].value = "";
            document.all[idtxCloseDate].value = "";
            document.all[idtx_DocLIst].value = "";
            document.all[idtx_MgrUser].value = ""
        }
        else
        {
            document.all[idTxSubject].value = RtnObj.Subject;
            document.all[idTxFileNo].value = RtnObj.FileNo;
            document.all[idtxCloseDate].value = RtnObj.FileDate;
            document.all[idtx_DocLIst].value = RtnObj.DocList;
            document.all[idtx_MgrUser].value = RtnObj.MgrUser;
        }
    }

   
}


function EAT831_MOCS_BorInfo()
{
    this.ApplyType = "";
    this.BORDEPTNAME = "";
    this.BOREMPNAME = "";
    this.FileDate = "";
    this.MGRNAME = "";
    this.DocNo = "";
    this.Subject = "";
    this.FileNo = "";
    this.DocPage = "";
    this.DocList = "";
    this.FourNo = "";
    this.borNo = "";
    this.strID = "";
    this.strName = "";
    this.Desc = "";
    this.strErrMsg = "";
    this.bHasData = false;
}
//1111221   Cloud 序76 取消原因增加條件選單
function dlCancelReasonChanged(event) {
    
    id_nowDataGrid = event.target.id;
    var index = document.all[id_nowDataGrid].selectedIndex;
    
    var val = document.all[id_nowDataGrid].options[index].textContent;
    var id_secs = id_nowDataGrid.split("_", 4);
    var idTxReason = id_secs[0] + "__" + id_secs[2] + "_TxCanCelReason";
    document.all[idTxReason].value += val;
    document.all[id_nowDataGrid].options[0].selected = true;;
    $(idTxReason).focus();
}