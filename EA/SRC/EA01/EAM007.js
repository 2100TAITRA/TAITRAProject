/*
DATE		SA			PRG		MGR_NO			DESC
1111021		Cloud		Cloud	1110899			新增歸檔人員維護作業
1120323     Cloud       Zen     銓敘部序164     支援切換負責歸檔人員之功能
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
var strTableFields = new Array("_txVerCls");


AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    if (jf_GetActionMode() == LayoutModeNew)
    {
        document.all["divFile"].className = "hide";
        document.all["divCls"].className = "hide";
        document.all["divFirstName"].className = "hide";
        document.all["GridTable"].className = "hide";
        document.all["divOfficeState"].className = "hide";

    }
    else
    {
        document.all["divFile"].className = "dTR";
        document.all["divCls"].className = "dTR";
        document.all["divFirstName"].className = "dTR";
        document.all["GridTable"].className = "DivTable";
        document.all["divOfficeState"].className = "dTR";
    }

}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/

function ClientButtonControl(e)
{
    //1060301	joe		1050087		二代修改配合行動平台
    // var xObjectName = document.activeElement.id;
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


    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();

            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            document.all["txAcc"].value = document.all["dlMgrUserName"].options[document.all["dlMgrUserName"].selectedIndex].value;
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
            $('#txKeyFld').focus();
            break;
        case "btTran":
            Page_BlockSubmit = true;
            if (CheckBeforTran())
            {
                var strUrl = "EAM007C1.aspx?rtnObj=lbReturnValue&nFrom=EAM007" + "&argUser=" + document.all["txPerid"].value;
                jf_OpenChildWin(strUrl, "EAM007C1", 700, 200);
            }
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();

            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();

            jf_ToolBarSubmit(xObjectName);
            break;
        case "btInput":
            Page_BlockSubmit = !jf_ConfirmbtInput();
            jf_ToolBarSubmit(xObjectName);
            break;


        //以下屬於DataGrid ToolBar
        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dg1", "_cbSelect");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dg1", "_cbSelect");
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_SelectClear("dg1", "_cbSelect");
            break;
        case "btDeleteSelected":
            Page_BlockSubmit = true;
            DeleteSelected();
            jf_SelectBarSubmit();
            break;
        case "btUp":
            Page_BlockSubmit = true;
            jf_RowUp("dg1", "_cbSelect", strTableFields);
            break;
        case "btDown":
            Page_BlockSubmit = true;
            jf_RowDown("dg1", "_cbSelect", strTableFields);
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
            if (jf_CheckDataExist(document.all["txOrgNo"].value))//檢查鍵值是否已存在
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

    if (document.all["txAcc"].value == "")
    {
        strErrMsg += "帳號欄位不可空白\n";
        $('#txAcc').focus();

    }

    if (document.all.dg1.rows.length == "1")
    {
        strErrMsg += "資料顯示區中必須至少要有一筆資料\n";
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    //1111130 Cloud 11110861 增加檢核離職是否還有資料
    if (document.all["rbOffOffice"].checked && document.all.dg1.rows.length > 1)
    {
        if (!window.confirm("尚有未移交資料，是否確定儲存?"))
        { bRtnbool = false; }
    }
    if (bRtnbool)
    {
        //放入隱藏TextBox 供server端取用 -- start --
        var buf = "";
        document.all["H_DATA"].value = "";
        for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
        {
            var strClsKey = document.all["dg1__ctl" + iRow + "_txClsKey"].value;
            var strType = document.all["dg1__ctl" + iRow + "_MgrTypeNo"].value;
            var strClsName = document.all["dg1__ctl" + iRow + "_txVerClsName"].value;
            var strClsNo = document.all["dg1__ctl" + iRow + "_txVerCls"].value;
            var strNewData = document.all["dg1__ctl" + iRow + "_NewData"].value;

            if (document.all["H_DATA"].value != "")
                document.all["H_DATA"].value += "," + strClsKey + "|" + strType + "|" + strClsName + "|" + strClsNo + "|" + strNewData;
            else
                document.all["H_DATA"].value += strClsKey + "|" + strType + "|" + strClsName + "|" + strClsNo + "|" + strNewData;
        }
    }
    //Cola -- end --

    return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
    var InValidName = "";
    var InValidControlName = "";

    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        //txInput1不為空白時
        if (document.all["dg1__ctl" + i + "_txInput1"].value != "")
        {
            //txInput2不可空白
            if (document.all["dg1__ctl" + i + "_txInput2"].value == "")
            {
                InValidName += ",Input2不可空白";
                InValidControlName = "dg1__ctl" + i + "_txInput2";
            }

            if (InValidName != "")
            {
                InValidName = InValidName.substr(1, InValidName.length);
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
                $('#' + InValidControlName).focus();
                return false;
            }
        }
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
    if (argCallerId == "EAC004")
    {
        document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        txVeronBlur();
    }

    if (argCallerId == "EAC005")
    {
        if (document.all["txFileCls"] != null)
            document.all["txFileCls"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        if (document.all["txVerNo"] != null)
            document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[5].value);
        txFileClsOnBlur();

    }
    if (argCallerId == "EAM007C1")
    {
        Page_BlockSubmit = false;
        jf_OpenButtonSubmit();
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
function CheckAccount()
{
    document.all["txAcc"].value = document.all["dlMgrUserName"].options[document.all["dlMgrUserName"].selectedIndex].value;
    /*if (document.all["txAcc"].value !="")
    {
        var RtnVale = EA01.EAM007.CheckAccExist(document.all["txAcc"].value, document.all["txOrgNo"].value).value;
        if (RtnVale.split(',')[0] == "0")
        {
            alert("人員不存在。");
            document.all["txAcc"].value = "";
            document.all["lbEmp"].textContent = "";		
        	
            $('#txAcc').focus();	
        }
        else
        {
            document.all["lbEmp"].textContent = RtnVale.split(',')[1];
        }
    }*/
}
function txVeronBlur()
{
    if (document.all["txVerNo"].value != "")
    {
        if (document.all["txFileCls"].value == "")
        {
            var CheckResult = EA01.EAM007.CheckVer(document.all["txVerNo"].value, document.all["txOrgNo"].value, "").value;
            if (CheckResult.split(',')[0] == "false")
            {
                document.all["txVerNo"].value = "";
                alert(CheckResult.split(',')[1]);
                $('#txVerNo').focus();
            }
        }
        else
        {

            var CheckResult = EA01.EAM007.CheckVer(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
            if (CheckResult.split(',')[0] == "false")
            {
                document.all["txVerNo"].value = "";
                alert(CheckResult.split(',')[1]);

                $('#txVerNo').focus();
            }
        }
    }
}
function txFileClsOnBlur()
{
    if (document.all["txFileCls"].value != "")
    {
        if (document.all["txVerNo"].value == "")
        {
            var CheckResult = EA01.EAM007.CheckCls(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
            if (CheckResult.split(',')[0] == "false")
            {
                if (CheckResult.split(',')[1] == "無此分類號，請重新輸入，或點選查詢子視窗查詢分類號。")
                {
                    document.all["txFileCls"].value = "";
                    alert(CheckResult.split(',')[1]);

                    $('#txFileCls').focus();
                }
                else
                {
                    alert(CheckResult.split(',')[1]);
                    $('#txVerNo').focus();
                }
                return false;
            }
            else
            {
                document.all["txVerNo"].value = CheckResult.split(',')[3];//帶出版別
                //1120323 Zen 銓敘部序164 支援切換負責歸檔人員之功能，帶出版別後須再次檢核
                //return true;
            }
        }
        //1120323 Zen 銓敘部序164 支援切換負責歸檔人員之功能，取得版本號後再次檢核是否已有管理人
        //else
        {
            var CheckResult = EA01.EAM007.CheckCls(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
            if (CheckResult.split(',')[0] == "false")
            {
                //1120323 Zen 銓敘部序164 支援切換負責歸檔人員之功能
                let strMsg = CheckResult.split(',')[1];
                if (strMsg.indexOf('目前管理人員為') != -1)
                    if (confirm(strMsg))
                        return true;

                document.all["txFileCls"].value = "";
                //1120323 Zen 銓敘部序164 支援切換負責歸檔人員之功能，僅其餘訊息需再alert
                //alert(CheckResult.split(',')[1]);
                if (strMsg.indexOf('目前管理人員為') == -1)
                    alert(strMsg);
                $('#txFileCls').focus();
                return false;
            }
            else
                return true;
        }
    }
    else
        return true;
}

function txFirstNameonBlur()
{
    if (document.all["txFirstName"].value != "")
    {
        var CheckResult = EA01.EAM007.GetFirstName(document.all["txOrgNo"].value, document.all["txFirstName"].value).value;
        if (CheckResult.split(',')[0] == "false")
        {
            //1120323 Zen 銓敘部序164 支援切換負責歸檔人員之功能
            let strMsg = CheckResult.split(',')[1];
            if (strMsg.indexOf('目前管理人員為') != -1)
                if (confirm(strMsg))
                    return true;

            //1120323 Zen 銓敘部序164 支援切換負責歸檔人員之功能，僅其餘訊息需再alert
            if (strMsg.indexOf('目前管理人員為') == -1)
                alert(CheckResult.split(',')[1]);
            $('#txFirstName').focus();
            return false;
        }
        else
            return true;
    }
    else
        return true;
}
function ibCls_Onclick()
{
    var strVerNo = document.all["txVerNo"].value;

    Page_BlockSubmit = true;
    var strUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAM007" + "&VER_NO=" + strVerNo + "&MODE=EAM005SearchCls";
    jf_OpenChildWin(strUrl, "EAM007", 700, 500);
}
function ibVer_Onclick()
{
    Page_BlockSubmit = true;
    var strUrl = "../EA01/EAC004.aspx";
    jf_OpenChildWin(strUrl, "EAM007", 700, 500);
}
function btAdd_Onclick()
{
    Page_BlockSubmit = true;
    if (!txFileClsOnBlur())
    {
        return;
    }
    if (document.all["txVerNo"].value != "" && document.all["txFileCls"].value != "")
    {
        if (IsDocNoExist())
            return;
        var InsertRow = document.all["dg1"].insertRow();
        var len = document.all["dg1"].rows.length;	//先Insert so長度已+1

        //ID整除==單數序
        var rowBgColor = (len % 2) ? "#E1F0F8" : "White";
        InsertRow.style.backgroundColor = rowBgColor;
        //置中
        InsertRow.style.textAlign = "left";

        //序
        var lbSEQ_NO = document.createElement("span");
        lbSEQ_NO.setAttribute("id", "dg1__ctl" + len + "_lbSEQ_NO");
        lbSEQ_NO.textContent = len - 1;
        InsertRow.insertCell(0).appendChild(lbSEQ_NO);

        //選取
        var cbSelect = document.createElement("input");
        cbSelect.setAttribute("type", "checkbox");
        cbSelect.setAttribute("id", "dg1__ctl" + len + "_cbSelect");
        InsertRow.insertCell(1).appendChild(cbSelect);
        cbSelect.style.color = "Navy";
        var txNewData = document.createElement("input");
        txNewData.setAttribute("id", "dg1__ctl" + len + "_NewData");
        txNewData.setAttribute("value", "1");
        txNewData.setAttribute("class", "hide");
        InsertRow.cells[1].appendChild(txNewData);
        txNewData.style.color = "Navy";

        //版別-類別
        var txVerCls = document.createElement("input");
        txVerCls.setAttribute("id", "dg1__ctl" + len + "_txVerCls");
        txVerCls.setAttribute("value", document.all["txVerNo"].value + "-" + document.all["txFileCls"].value);

        txVerCls.setAttribute("class", "TextLabel");
        txVerCls.style.width = "10em";
        InsertRow.insertCell(2).appendChild(txVerCls);
        txVerCls.style.color = "Navy";

        //分類號鍵值
        var clsInfo = EA01.EAM007.GetClsKey(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
        var txClsKey = document.createElement("input");
        txClsKey.setAttribute("id", "dg1__ctl" + len + "_txClsKey");
        txClsKey.setAttribute("value", clsInfo.split('|')[0]);
        txClsKey.setAttribute("class", "hide");
        txClsKey.style.width = "20em";
        InsertRow.cells[2].appendChild(txClsKey);
        txClsKey.style.color = "Navy";


        //類型
        var lbMGR_TYPE = document.createElement("input");
        lbMGR_TYPE.setAttribute("id", "dg1__ctl" + len + "_lbMgrType");
        lbMGR_TYPE.setAttribute("value", "機關檔");
        lbMGR_TYPE.setAttribute("class", "TextLabel");
        lbMGR_TYPE.style.width = "4em";
        InsertRow.insertCell(3).appendChild(lbMGR_TYPE);
        lbMGR_TYPE.style.color = "Navy";


        //類型代碼
        var txMgrType = document.createElement("input");
        txMgrType.setAttribute("id", "dg1__ctl" + len + "_MgrTypeNo");
        txMgrType.setAttribute("value", "0");
        txMgrType.setAttribute("class", "hide");
        txMgrType.style.width = "1em";
        InsertRow.cells[3].appendChild(txMgrType);
        txMgrType.style.color = "Navy";


        //分類名
        var lbClsName = document.createElement("input");
        lbClsName.setAttribute("id", "dg1__ctl" + len + "_txVerClsName");
        lbClsName.setAttribute("value", clsInfo.split('|')[1]);
        lbClsName.setAttribute("class", "TextLabel");
        lbClsName.style.width = "8.5em";
        InsertRow.insertCell(4).appendChild(lbClsName);
        lbClsName.style.color = "Navy";
        //document.all["txVerNo"].value = "";
        document.all["txFileCls"].value = "";
    }
    else
        alert('請先輸入版本別及分類號後，再按下加入鈕。');
}
function btAdd2_Onclick()
{
    Page_BlockSubmit = true;
    if (!txFirstNameonBlur())
    { return; }
    if (document.all["txFirstName"].value != "")
    {
        if (IsDocNoExist())
            return;
        var InsertRow = document.all["dg1"].insertRow();
        var len = document.all["dg1"].rows.length;	//先Insert so長度已+1

        //ID整除==單數序
        var rowBgColor = (len % 2) ? "#E1F0F8" : "White";
        InsertRow.style.backgroundColor = rowBgColor;
        //置中
        InsertRow.style.textAlign = "left";

        //序
        var lbSEQ_NO = document.createElement("span");
        lbSEQ_NO.setAttribute("id", "dg1__ctl" + len + "_lbSEQ_NO");
        lbSEQ_NO.textContent = len - 1;
        InsertRow.insertCell(0).appendChild(lbSEQ_NO);

        //選取
        var cbSelect = document.createElement("input");
        cbSelect.setAttribute("type", "checkbox");
        cbSelect.setAttribute("id", "dg1__ctl" + len + "_cbSelect");
        InsertRow.insertCell(1).appendChild(cbSelect);
        cbSelect.style.color = "Navy";
        var txNewData = document.createElement("input");
        txNewData.setAttribute("id", "dg1__ctl" + len + "_NewData");
        txNewData.setAttribute("value", "1");
        txNewData.setAttribute("class", "hide");
        InsertRow.cells[1].appendChild(txNewData);
        txNewData.style.color = "Navy";

        //姓氏
        var txVerCls = document.createElement("input");
        txVerCls.setAttribute("id", "dg1__ctl" + len + "_txVerCls");
        txVerCls.setAttribute("value", document.all["txFirstName"].value);

        txVerCls.setAttribute("class", "TextLabel");
        txVerCls.style.width = "10em";
        InsertRow.insertCell(2).appendChild(txVerCls);
        txVerCls.style.color = "Navy";

        //姓氏

        var txClsKey = document.createElement("input");
        txClsKey.setAttribute("id", "dg1__ctl" + len + "_txClsKey");
        txClsKey.setAttribute("value", document.all["txFirstName"].value);
        txClsKey.setAttribute("class", "hide");
        txClsKey.style.width = "20em";
        InsertRow.cells[2].appendChild(txClsKey);
        txClsKey.style.color = "Navy";


        //類型
        var lbMGR_TYPE = document.createElement("input");
        lbMGR_TYPE.setAttribute("id", "dg1__ctl" + len + "_lbMgrType");
        lbMGR_TYPE.setAttribute("value", "個人檔");
        lbMGR_TYPE.setAttribute("class", "TextLabel");
        lbMGR_TYPE.style.width = "4em";
        InsertRow.insertCell(3).appendChild(lbMGR_TYPE);
        lbMGR_TYPE.style.color = "Navy";


        //類型代碼
        var txMgrType = document.createElement("input");
        txMgrType.setAttribute("id", "dg1__ctl" + len + "_MgrTypeNo");
        txMgrType.setAttribute("value", "1");
        txMgrType.setAttribute("class", "hide");
        txMgrType.style.width = "1em";
        InsertRow.cells[3].appendChild(txMgrType);
        txMgrType.style.color = "Navy";


        //分類名
        var lbClsName = document.createElement("input");
        lbClsName.setAttribute("id", "dg1__ctl" + len + "_txVerClsName");
        lbClsName.setAttribute("value", "");
        lbClsName.setAttribute("class", "TextLabel");
        lbClsName.style.width = "8.5em";
        InsertRow.insertCell(4).appendChild(lbClsName);
        lbClsName.style.color = "Navy";
        document.all["txFirstName"].value = "";
    }
    else
        alert('請先輸入姓氏後，再按下加入鈕。');
}
//清除勾選的row
function DeleteSelected()
{
    var len = document.all["dg1"].rows.length;
    var iCount = 0;
    //若有勾選則將下一筆value寫入上一筆
    for (var iCheck = 2; iCheck < len + 1; iCheck++)
    {
        if (iCheck > iCheck - iCount)
        {
            document.all["dg1__ctl" + (iCheck - iCount) + "_txVerCls"].value = document.all["dg1__ctl" + iCheck + "_txVerCls"].value;
            document.all["dg1__ctl" + (iCheck - iCount) + "_txClsKey"].value = document.all["dg1__ctl" + iCheck + "_txClsKey"].value;
            //以下為本次增加
            document.all["dg1__ctl" + (iCheck - iCount) + "_txMrgTypeName"].value = document.all["dg1__ctl" + iCheck + "_txMrgTypeName"].value;
            document.all["dg1__ctl" + (iCheck - iCount) + "_MgrTypeNo"].value = document.all["dg1__ctl" + iCheck + "_MgrTypeNo"].value;
            document.all["dg1__ctl" + (iCheck - iCount) + "_txVerClsName"].value = document.all["dg1__ctl" + iCheck + "_txVerClsName"].value;
        }
        if (document.all["dg1__ctl" + iCheck + "_cbSelect"].checked)
            iCount++;
    }
    //清空CheckBox
    for (var iRow = 2; iRow < document.all["dg1"].rows.length; iRow++)
    {
        if (document.all["dg1__ctl" + iRow + "_cbSelect"].checked)
            document.all["dg1__ctl" + iRow + "_cbSelect"].checked = false;
    }

    //剩下最後的iCount筆刪掉
    for (var iDel = 1; iDel <= iCount; iDel++)
    {
        document.all["dg1"].deleteRow(len - iDel);
    }
}
function IsDocNoExist()
{
    if (document.all.dg1 == null)
        return false;
    if (document.all.dg1.rows.length == 0)
        return false;

    var strData = document.all["txVerNo"].value + "-" + document.all["txFileCls"].value;
    for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
    {
        if (document.all["dg1__ctl" + iRow + "_txVerCls"].value == strData)
        {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["版別-分類號/姓氏：" + strData + "已存在於資料顯示區中，不允許再加入"])), "");
            return true;
        }
    }
    return false;
}
function jf_ConfirmbtInput()
{
    if (jf_Trim(document.all.txFilePath.value) == "")
    {
        strErrMsg += "必須選擇檔案\n";
        $('#txFilePath').focus();
        return false;
    }
    else
    {
        var strFullPath = document.all.txFilePath.value;
        var strFileName, strClientPath;

        var start = strFullPath.lastIndexOf("\\");

        if (start != -1)
        {
            strFileName = strFullPath.substring(start + 1);
            strClientPath = strFullPath.substring(0, start);

        }
        else
        {
            return false;
        }
        try
        {
            document.all.txServerPath.value = strFileName;
            //放入隱藏TextBox 供server端取用 -- start --
            var buf = "";
            document.all["H_DATA"].value = "";
            for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
            {
                var strClsKey = document.all["dg1__ctl" + iRow + "_txClsKey"].value;
                var strType = document.all["dg1__ctl" + iRow + "_MgrTypeNo"].value;
                var strClsName = document.all["dg1__ctl" + iRow + "_txVerClsName"].value;
                var strClsNo = document.all["dg1__ctl" + iRow + "_txVerCls"].value;
                var strNewData = document.all["dg1__ctl" + iRow + "_NewData"].value;

                if (document.all["H_DATA"].value != "")
                    document.all["H_DATA"].value += "," + strClsKey + "|" + strType + "|" + strClsName + "|" + strClsNo + "|" + strNewData;
                else
                    document.all["H_DATA"].value += strClsKey + "|" + strType + "|" + strClsName + "|" + strClsNo + "|" + strNewData;
            }
            //Cola -- end --
            return true;
        }
        catch (e)
        {
        }
    }
}
function CheckBeforTran()
{
    //檢核是否有勾選資料、是否有勾到新增資料
    var buf = "";
    var saveKey = "";
    var saveNewData = "";
    var bTran = false;


    for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
    {
        if (document.all["dg1__ctl" + iRow + "_cbSelect"].checked)
        {
            var strClsKey = document.all["dg1__ctl" + iRow + "_txClsKey"].value;

            if (saveKey != "")
                saveKey += "," + strClsKey;
            else
                saveKey += strClsKey;
            if (document.all["dg1__ctl" + iRow + "_NewData"].value == "1")
            {

                if (saveNewData != "")
                    saveNewData += ",序" + document.all["dg1__ctl" + iRow + "_lbSEQ_NO"].textContent;
                else
                    saveNewData += "序" + document.all["dg1__ctl" + iRow + "_lbSEQ_NO"].textContent;
            }
        }

    }
    if (saveKey == "")
    {
        if (window.confirm("尚未勾選任何資料，是否為全部移交"))
        {
            for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
            {
                document.all["dg1__ctl" + iRow + "_cbSelect"].checked = true;
                var strClsKey = document.all["dg1__ctl" + iRow + "_txClsKey"].value;
                if (saveKey != "")
                    saveKey += "," + strClsKey;
                else
                    saveKey += strClsKey;
            }
            bTran = true;
        }
        else
            bTran = false;

    }
    else
        bTran = true;
    if (saveNewData != "")
    {
        if (window.confirm(saveNewData + "，為新設定資料是否確定進行移交?"))
            bTran = true;
        else
            bTran = false;
    }
    if (bTran)
    { //設定資料
        var Rtn = EA01.EAM007.SaveKeyList(saveKey, jf_GetSessionID()).value;
        if (Rtn != "")
        {
            alert("開啟移交視窗異常，" + Rtn);
            bTran = false;
        }
    }
    return bTran;
}
function rbOffice()
{
    if (document.all["rbOnOffice"].checked)
    {
        document.all["btInput"].disabled = false;
        document.all["btAdd"].disabled = false;
        document.all["btAdd2"].disabled = false;
        document.all["txFilePath"].disabled = false;
    }
    else
    {
        document.all["btInput"].disabled = true;
        document.all["btAdd"].disabled = true;
        document.all["btAdd2"].disabled = true;
        document.all["txFilePath"].disabled = true;
    }
}

