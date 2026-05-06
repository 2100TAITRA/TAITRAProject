/*
DATE	SA		PRG		MGR_NO	DESC
110325  Cloud   Cloud   1100199 新增調案批次核可作業
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



/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    
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
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
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
    	    Page_BlockSubmit = !jf_ConfirmSave();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            document.all["rbAll"].checked = true;
            document.all["rbBortAll"].checked = true;
            document.all["H_userID"].value = "";
            document.all["H_UerInfo"].value = "";
            document.all["H_txDeptNo"].value = "";
            break;
      

    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
    {
        bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (!jf_CheckBlankAndAlert())
        bRtnbool = false;

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
    
    var bHasRecord = false;
    var bHasCheck = false;
    if (document.all["dg1"] == null || document.all["dg1"].rows.length < 2) {
        alert("沒有調案資料可供執行作業。");
        return false;
    }
    else {
        for (i = 2; i <= document.all["dg1"].rows.length; i++) {
            if (document.all['dg1__ctl' + i + '_cbSelect'].checked) {
                bHasCheck = true;
                break;
            }
        }
    }
    
    if (bHasCheck == false)
    {
        alert("至少勾選一筆資料。");
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



function jf_dlUserChange() {
    document.all["H_userID"].value = document.all.dlUser.options[document.all.dlUser.selectedIndex].value;
}
function InitUserList() {
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