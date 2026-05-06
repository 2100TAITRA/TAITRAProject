/*
DATE	SA		PRG		MGR_NO      DESC
1130328 David   Zen     1120976     新增EDM025 分層負責管理人員維護作業
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

    for (let i = 2; i < document.all['dg1'].rows.length + 1; i++)
        DeptOnchange(i);

    for (let i = 2; i < document.all['dg1'].rows.length + 1; i++)
        if (document.all['dg1__ctl' + i + '_H_txManageUsername'].value != '')
            document.all['dg1__ctl' + i + '_dlUser'].value = document.all['dg1__ctl' + i + '_H_txManageUsername'].value;
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
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {

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
    {
        Page_BlockSubmit = true;
        return;
    }

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
            Page_BlockSubmit = !jf_ConfirmDelete();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            var strUrl = "EDC024.aspx?nFrom=EDM025&Mode=2";
            jf_OpenChildWin(strUrl, "EDC024", 1024, 768);
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
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew)
        {
            //因無新增模式儲存之行為一律設為flase
            if (jf_CheckDataExist(""))
            {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
        else
            bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";



    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {

        }
        else
        {

        }
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
    if (argCallerId == "EDC024")
    {
        document.all["txRespNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        jf_OpenButtonSubmit();

        $('#txRespNo').focus();
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
function DeptOnchange(argIndex)
{
    let strDeptNo = document.all['dg1__ctl' + argIndex + '_dlDept'].value;
    if (strDeptNo == '')
        return;

    let arWSParam = new Array(2);
    arWSParam[0] = strDeptNo;
    arWSParam[1] = '';
    let CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetAllUsersOfRole", false, arWSParam);

    let strUsernameArr = CallWsObj.value.UserName;
    let strEmpnameArr = CallWsObj.value.EmpName;

    let dlUser = document.all['dg1__ctl' + argIndex + '_dlUser'];
    while (dlUser.length > 0)
        dlUser.remove(0);

    dlUser.add(new Option('', ''));
    for (var j = 0; j < strUsernameArr.length; j++)
        dlUser.add(new Option(strEmpnameArr[j], strUsernameArr[j]));

    //document.all['dg1__ctl' + argIndex + '_H_txManageUsername'].value = '';
}

function UserOnchange(argIndex)
{
    document.all['dg1__ctl' + argIndex + '_H_txManageUsername'].value = document.all['dg1__ctl' + argIndex + '_dlUser'].value;
}