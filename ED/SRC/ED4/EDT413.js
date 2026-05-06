/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1010919	Kevin	1010861	(國健局)新增結案日期批次更新作業(仿EDT400)
 * 1070917  Zen     1050087 二代升級 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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
var strTableFields = new Array("_lbDocNo", "_txCloseDate", "_lbTitle");

//1070917 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if (document.all.dg1)
//    document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

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
//1070917 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1070917 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
        //1070917 Zen 1050087 二代升級        //case "ibCloseDateS":
        //    {
        //        Page_BlockSubmit = true;
        //        jf_CallCalendar(document.all.txCloseDateS, event.screenX, event.screenY);
        //        break;
        //    }
        //case "ibCloseDateE":
        //    {
        //        Page_BlockSubmit = true;
        //        jf_CallCalendar(document.all.txCloseDateE, event.screenX, event.screenY);
        //        break;
        //    }
        //case "ibUpdateCloseDate":
        //    {
        //        Page_BlockSubmit = true;
        //        jf_CallCalendar(document.all.txUpdateCloseDate, event.screenX, event.screenY);
        //        break;
        //    }
        case "btConfirmUpdate":
            {
                if (jf_Trim(document.all.txUpdateCloseDate.value) == "")
                {
                    Page_BlockSubmit = true;
                    alert("更新結案日期欄位不可空白\n");
                }
                else
                {
                    Page_BlockSubmit = true;
                    UpdDataGridDate();
                }
                break;
            }
        //1070917 Zen 1050087 二代升級        case "btSelectAll":
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
            Page_BlockSubmit = !CheckBeforeDeleteSelected("dg1", "_cbSelect");
            jf_SelectBarSubmit(xObjectName);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1070917 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1070917 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            if (fnCheckBeforeSearch())
            {
                Page_BlockSubmit = !jf_CheckKeyObject();
                //1070917 Zen 1050087 二代升級                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
                Page_BlockSubmit = true;
            break;
        case "btSave":
            Page_BlockSubmit = !jf_CheckBlankAndAlert();
            //1070917 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            if (jf_ConfirmClean(true))
            {
                Page_BlockSubmit = false;
                //1070917 Zen 1050087 二代升級                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;

        //1070917 Zen 1050087 二代升級        ////以下屬於DataGrid ToolBar
        //case "btSelectAll":
        //    Page_BlockSubmit = true;
        //    jf_SelectAll("dg1", "_cbSelect");
        //    break;
        //case "btSelectInverse":
        //    Page_BlockSubmit = true;
        //    jf_SelectInverse("dg1", "_cbSelect");
        //    break;
        //case "btSelectClear":
        //    Page_BlockSubmit = true;
        //    jf_SelectClear("dg1", "_cbSelect");
        //    break;
        //case "btDeleteSelected":
        //    Page_BlockSubmit = !CheckBeforeDeleteSelected("dg1", "_cbSelect");
        //    jf_SelectBarSubmit();
        //    break;
    }
}

function fnCheckBeforeSearch()
{
    if (!jf_CheckDate("txCloseDateS") || !jf_CheckDate("txCloseDateE"))
        return false;
    if (!jf_Trim(document.all.txDocNoS.value) && !jf_Trim(document.all.txDocNoE.value) && !jf_Trim(document.all.txCloseDateS.value) && !jf_Trim(document.all.txCloseDateE.value))
    {
        //1070917 Zen 1050087 二代升級        //document.all.txIssueDateS.focus();
        $('#txIssueDateS').focus();
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請至少輸入一個查詢條件。"])), "");
        return false;
    }
    return true;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢查DataGrid資料列是否至少有一筆資料
function jf_CheckBlankAndAlert()
{
    var intCount = 0;
    var isEmptyCount = 0;
    var HasChecked = true;
    for (var i = 2; i < document.all.dg1.rows.length + 1 ; i++)
    {
        if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
        {
            //1070917 Zen 1050087 二代升級            //if (document.getElementById("dg1__ctl" + i + "_lbDocNo").innerText != "")
            if (document.getElementById("dg1__ctl" + i + "_lbDocNo").textContent != "")
            {
                if (document.all["dg1__ctl" + i + "_txCloseDate"].value == "")
                {
                    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + (i - 1) + "結案日期不可為空白"])), "");
                    HasChecked = false;
                }
                intCount++;
            }
        }

        //1070917 Zen 1050087 二代升級        //if (document.getElementById("dg1__ctl" + i + "_lbDocNo").innerText == "")
        if (document.getElementById("dg1__ctl" + i + "_lbDocNo").textContent == "")
        {
            isEmptyCount++;
        }
    }
    if (isEmptyCount == 30)
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請先執行查詢功能"])), "");
        HasChecked = false;
    }
    if (intCount == 0 && isEmptyCount != 30)
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆明細資料以更新結案日期"])), "");
        HasChecked = false;
    }
    return HasChecked;
}

function CheckBeforeDeleteSelected(argTableName, argCheckBoxName)
{
    if (document.all[argTableName] == null)
        return false;

    //至少要勾選一筆才return true
    for (iRow = 2; iRow < document.all[argTableName].rows.length + 1; iRow++)
    {
        if (document.all[argTableName + "__ctl" + iRow + argCheckBoxName].checked)
            return true;
    }
    return false;
}

function CallPadFunc(strObjName)
{
    switch (strObjName)
    {
        case "txCloseDateS":
        case "txCloseDateE":
        case "txUpdateCloseDate":
            if (document.all[strObjName].value != "")
            {
                document.all[strObjName].value = jf_PADL(document.all[strObjName].value, 7, "0");
            }
            break;
    }
    jf_CheckDate(strObjName);
}

function jf_CheckDate(strObjName)
{
    var bCheckM = true;
    var Date = jf_Trim(document.all[strObjName].value);
    if (Date != "")
    {
        if (!jf_CheckCDATE(Date))
        {
            alert('日期格式不正確');
            document.all[strObjName].value = "";
            //1070917 Zen 1050087 二代升級            //document.all[strObjName].focus();
            $('#' + strObjName).focus();
            bCheckM = false;
        }
    }
    return bCheckM;
}

function UpdDataGridDate()
{
    var CurrCount = document.all.dg1.rows.length;
    for (i = 2; i < CurrCount + 1; i++)
    {
        if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
            document.all["dg1__ctl" + i + "_txCloseDate"].value = document.all["txUpdateCloseDate"].value;
    }
}