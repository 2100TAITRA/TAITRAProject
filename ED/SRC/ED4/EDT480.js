/*	DATE 	SA      PRG     MGR_NO  DESC
 *	1070830 Kevin   Justin  1070678 弱掃AJAX修改
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

//1060906 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1070830 Justin [1070678]弱掃AJAX修改
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
    //dlDeptOnblur();

    if (document.all.H_txSect.value != "")	//如果隱藏欄位二級機關有值，把對應的欄位值加上	
    {
        var dlSect = document.all["dlSect"];
        var strSect = document.all.H_txSect.value;
        edjf_SetDDLByText(dlSect, strSect);
    }

    if (document.all["H_txMaxMonth"].value != "")
        document.all["txMaxMonth"].value = document.all["H_txMaxMonth"].value;

    //1060906 Zen 1050087 二代升級
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060906 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060906 Zen 1050087 二代升級
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
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

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060906 Zen 1050087 二代升級
//function jf_ToolBarHandle()
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

    //1060906 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            if (document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value == "")
            {
                Page_BlockSubmit = true;
                jf_ShowMsg("", "統計單位不可不選");
            }
            else
            {
                Page_BlockSubmit = false;
                //dlDeptOnblur();
                //dlSectOnchange();
            }
            //1060906 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
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
            //1060906 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060906 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060906 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            var MaxMonth = document.all["txMaxMonth"].value;
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            document.all["txMaxMonth"].value = MaxMonth;
            //1060906 Zen 1050087 二代升級
            //document.all["txMergeCloseCnt"].focus();
            $('#txMergeCloseCnt').focus();
            break;
        case "btSearch":
            //1060906 Zen 1050087 二代升級
            Page_BlockSubmit = true;
            var strUrl = "";
            strUrl = "EDT480C1.aspx?rtnObj=lbReturnValue";
            jf_OpenChildWin(strUrl, "EDT480", 750, 500);
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
            if (fnCheckDataExist())//檢查鍵值是否已存在
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

    if (document.all["txMergeCloseCnt"].value == "")
    {
        strErrMsg += "合併審議決定辦結案件數欄位不可空白\n";
        //1060906 Zen 1050087 二代升級
        //document.all["txMergeCloseCnt"].focus();
        $('#txMergeCloseCnt').focus();
    }

    if (document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value == "")
    {
        strErrMsg += "統計單位不可不選\n";
    }

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
            //document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
        }
        else
        {
            //document.all["txReadOnly"].value = "";
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

    if (argCallerId == "EDT480C1")
    {
        var dlSect = document.all["dlSect"];
        var dlDept = document.all["dlDept"];

        document.all["txMaxMonth"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        var OuId = jf_Trim(document.all.lbReturnValue.options[1].value);

        if (OuId.length == 3)
        {
            for (var k = 0 ; k < dlDept.options.length ; k++)
            {
                if (dlDept.options[k].value == OuId.substr(0, 2))
                {
                    dlDept.selectedIndex = k;
                    //document.all["dlDept_Text"].value = document.all["dlDept"].options[k].text;
                    dlDeptOnblur();
                }
            }

            for (var j = 0 ; j < dlSect.options.length ; j++)
            {
                if (dlSect.options[j].value == OuId)
                {
                    dlSect.selectedIndex = j;
                    //document.all["dlSect_Text"].value = document.all["dlSect"].options[j].text;
                    dlSectOnchange();
                }
            }
        }
        else if (OuId.length == 2)
        {
            for (var i = 0 ; i < dlDept.options.length ; i++)
            {
                if (dlDept.options[i].value == OuId.substr(0, 2))
                {
                    dlDept.selectedIndex = i;
                    //document.all["dlDept_Text"].value = document.all["dlDept"].options[i].text;
                }
            }
        }

        document.all["txMergeCloseCnt"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
        if (document.all["dlDept"].selectedindex != 0)
        {
            //dlDeptOnblur();
            //dlSectOnchange();
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
        //1060906 Zen 1050087 二代升級
        //document.all["txMergeCloseCnt"].focus();
        $('#txMergeCloseCnt').focus();
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
function dlDeptOnblur()
{
    document.all["H_txSect"].value = "";
    document.all["H_SectName"].value = "";
    var dlSect = document.all["dlSect"];//必宣告，每次"."都會耗費時間，只做一次比較看不出影響
    var str = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;//使用者點選選單，選到的是哪個index值

    fnClearDropDownList(dlSect);
    dlSect.options.add(new Option("", "0"));//DropDownList新增一個空白

    if (document.all["dlDept"].selectedIndex > 0)//index有可能是0"空白"的情況
    {
        //1070830 Justin [1070678]弱掃AJAX修改
        //var value = EDT480.GetSub(document.all["SsoArtifact"].value, str).value;
        var value = ED4.EDT480.GetSub(document.all["SsoArtifact"].value, str).value;

        //document.all["dlSect_Text"].value = "";
        if (value.length > 0)
        {
            for (var i = 0; i < value.length; i++)
            {
                var strSect = value[i];
                dlSect.options.add(new Option(strSect.split('|')[0], strSect.split('|')[1]));//將name和value分別存入strSect中
            }
        }
    }
    else
    {
        fnClearDropDownList(dlSect);
    }
}

function fnClearDropDownList(obj)//專用呼叫清空
{
    while (obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
        obj.options.remove(0);
}
function dlSectOnchange()
{
    document.all["H_txSect"].value = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value;
    document.all["H_SectName"].value = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].text;
}
function fnCheckDataExist()
{
    var strSect = "";
    if (document.all["dlSect"].selectedIndex != "-1")
        strSect = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value;

    var strDept = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;
    var strOuId = "";

    if (strSect != "")
        strOuId = strSect;
    else
        strOuId = strDept;

    var Rtn = false;

    //1070830 Justin [1070678]弱掃AJAX修改
    //Rtn = EDT480.CheckExsit(document.all["H_SourceOrgno"].value, document.all["txMaxMonth"].value, strOuId).value;
    Rtn = ED4.EDT480.CheckExsit(document.all["H_SourceOrgno"].value, document.all["txMaxMonth"].value, strOuId).value;

    return Rtn;
}