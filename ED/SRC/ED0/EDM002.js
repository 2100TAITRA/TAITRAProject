/*
DATE 		SA		PRG		MGR_NO		DESC
1050616     Cloud   Zen     1050391     分層決行增加，調整對應邏輯
1050922     David   Zen     1050087     二代公文修改
1051019     Leslie  Kenny   1050087     二代公文修改
1060731		Kevin_C	Kevin_C	1060555		移除ConfirmDelete
1070830     Kevin   Justin  1070678     弱掃AJAX修改
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

//1050922 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
    jf_CheckRB();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

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
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050922 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
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

    //1050922 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckBeforOpen();
            //1050922 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_CheckBeforSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050922 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            //1050922 Zen 1050087 刪除bug修正--begin
			//1060731	Kevin_C	1060555		移除無用的函式
            //Page_BlockSubmit = !ConfirmDelete();
            //1070830 Justin [1070678]弱掃AJAX修改
            //if (EDM002.CheckSubData(document.all.H_PK.value, document.all.H_OrgNo.value).value == true)
            if (ED0.EDM002.CheckSubData(document.all.H_PK.value, document.all.H_OrgNo.value).value == true)
                Page_BlockSubmit = !window.confirm("此類別底下尚有其他項目細目，是否一併刪除?");
            else
                Page_BlockSubmit = !jf_ConfirmDelete();
            //1050922 Zen 1050087 刪除bug修正--end
            //1050922 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050922 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1050922 Zen 1050087 二代公文修改--begin
            //document.all["txSn"].focus();
            //document.all["rbNodelv1"].checked = true;
            $('#txSn').focus();
            $('#rbNodelv1').focus();
            //1050922 Zen 1050087 二代公文修改--end
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            var strUrl = "";
            var argDept = jf_Trim(document.all["dlDept"].options[document.all.dlDept.selectedIndex].value);
            strUrl = "EDC002.aspx?rtnObj=lbReturnValue&argDeptNo=" + argDept;
            jf_OpenChildWin(strUrl, "EDC002", 800, 600);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//開啟前之欄位檢查
function jf_CheckBeforOpen()
{
    var bRtnbool = true;
    var strErrMsg = "";
    if (jf_Trim(document.all["txSn"].value) == "")
    {
        strErrMsg += "需輸入項目序號\n";
        //1050922 Zen 1050087 二代公文修改
        //document.all["txSn"].focus();
        $('#txSn').focus();
    }
    if (jf_Trim(document.all["txName"].value) == "")
    {
        strErrMsg += "需輸入項目名稱\n";
        //1050922 Zen 1050087 二代公文修改
        //document.all["txName"].focus();
        $('#txName').focus();
    }
    if (document.all.dlDept.selectedIndex == 0)
    {
        strErrMsg += "需輸入使用單位\n";
    }
    if (document.all["rbNodelv2"].checked == true)
    {
        if (jf_Trim(document.all["dlUpper"].options[document.all.dlUpper.selectedIndex].value) == "")
        {
            strErrMsg += "需輸入上級項目\n";
            //1050922 Zen 1050087 二代公文修改
            //document.all["dlUpper"].focus();
            $('#dlUpper').focus();
        }
    }
    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";
    if (jf_Trim(document.all["txSn"].value) == "")
    {
        strErrMsg += "需輸入項目序號\n";
        //1050922 Zen 1050087 二代公文修改
        //document.all["txSn"].focus();
        $('#txSn').focus();
    }
    if (jf_Trim(document.all["txName"].value) == "")
    {
        strErrMsg += "需輸入項目名稱\n";
        //1050922 Zen 1050087 二代公文修改
        //document.all["txName"].focus();
        $('#txName').focus();
    }
    if (document.all.dlDept.selectedIndex == 0)
    {
        strErrMsg += "需選擇使用單位\n";
    }
    if (document.all["rbNodelv2"].checked == true)
    {
        if (jf_Trim(document.all["dlUpper"].options[document.all.dlUpper.selectedIndex].value) == "")
        {
            strErrMsg += "需選擇上級項目\n";
        }
    }

    if (strErrMsg != "")
    {
        strErrMsg = "輸入資訊不完整\n" + strErrMsg;
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    if (bRtnbool)//通過檢核才進行以下行為
    {
        var strLevel = 1;
        var strValueU = "";
        if (document.all["rbNodelv2"].checked)
        {
            strLevel = 2;
            strValueU = document.all.dlUpper.options[document.all.dlUpper.selectedIndex].value
            document.all.H_txUpperKey.value = document.all.dlUpper.options[document.all.dlUpper.selectedIndex].value;//為避免選單沒異動

        }
        if (jf_GetActionMode() == 0)//0:新增模式 1:修改模式
        {
            //1070830 Justin [1070678]弱掃AJAX修改
            //if (EDM002.CheckExist(document.all.txSn.value, document.all.txName.value, document.all.dlDept.options[document.all.dlDept.selectedIndex].value, strLevel, strValueU, document.all.H_OrgNo.value).value == true)
            if (ED0.EDM002.CheckExist(document.all.txSn.value, document.all.txName.value, document.all.dlDept.options[document.all.dlDept.selectedIndex].value, strLevel, strValueU, document.all.H_OrgNo.value).value == true)
            {
                alert("您輸入的資料已存在，請開啟後使用修改。");
                bRtnbool = false;
            }
        }
    }
    return bRtnbool;
}


/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{

    if (argCallerId == "EDC002")
    {
        document.all["H_PK"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        if (document.all["H_PK"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
        //1050922 Zen 1050087 二代公文修改
        //document.all["txSn"].focus();
        $('#txSn').focus();
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
function jf_CheckRB()
{
    if (document.all["rbNodelv2"].checked)
    {
        document.all.lbUpper.className = "KeyField";
        document.all.dlUpper.className = "KeyField";
        jf_dlDept_onchange();
    }
    else
    {
        document.all.lbUpper.className = "hide";
        document.all.dlUpper.className = "hide";
        document.all.H_txUpperKey.value = "";
    }
}
function jf_dlDept_onchange()
{
    //1050616 Zen  1050391 分層決行增加，調整對應邏輯
    document.getElementById('dlUpper').disabled = false;

    document.all.H_UpperKeyInfo.value = "";
    document.all.dlUpper.options.length = 0;
    var strValue = document.all.dlDept.options[document.all.dlDept.selectedIndex].value;

    //1070830 Justin [1070678]弱掃AJAX修改
    //var strArrDept = EDM002.GetUpper(strValue, document.all.H_OrgNo.value).value;
    var strArrDept = ED0.EDM002.GetUpper(strValue, document.all.H_OrgNo.value).value;

    if (strArrDept.indexOf("ERR") != -1)
    {
        alert(strArrDept);
    }
    else
    {
        document.all.H_UpperKeyInfo.value = strArrDept;
        strArrDept = strArrDept.split(';')
        for (var i = 0; i < strArrDept.length; i++)
        {
            if (strArrDept[i] != "")
            {
                var strCut = strArrDept[i].split("|");
                var optAdd = document.createElement("option");
                optAdd.text = strCut[0];
                optAdd.value = strCut[1];
                document.all.dlUpper.options.add(optAdd);
            }

        }

        //1050616 Zen  1050391 分層決行增加，調整對應邏輯
        if (document.all["rbNodelv2"].checked && document.getElementById('dlUpper').options.length == 0)
        {
            alert('此使用單位無第一層節點');
            document.getElementById('dlUpper').disabled = true;
        }
    }
}

function jf_dlUpper_onchange()
{
    document.all.H_txUpperKey.value = document.all.dlUpper.options[document.all.dlUpper.selectedIndex].value;
}

//1050922 Zen 1050087 刪除bug修正
//function ConfirmDelete()
//{
//    if (EDM002.CheckSubData(document.all.H_PK.value, document.all.H_OrgNo.value).value == true)
//    {
//        Page_BlockSubmit = !window.confirm("此類別底下尚有其他項目細目，是否一併刪除?");
//    }
//    else
//    {
//        Page_BlockSubmit = !jf_ConfirmDelete();
//    }
//    jf_ToolBarSubmit();

//}

function jf_txSn_onBlur()
{
    if (document.all.txSn.value.length < 3 && document.all.txSn.value.length > 0)
    {
        var strSeq = document.all.txSn.value;
        strSeq = jf_PADL(strSeq, 3, '0');
        document.all.txSn.value = strSeq;
    }
}