/*
DATE 	    SA		PRG		MGR_NO		DESC
1060427     Cloud   Zen     1050784     新增EAT806 常用分類號設定作業
1070830     Kevin   Zen     1070678     弱掃Ajax修正
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

var strClsKey;

//1070830 Zen 1070678 弱掃Ajax修正
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
    var dg1 = document.all.dg1;
    if (dg1.rows.length == 2 && dg1.rows[1].cells[2].children[1].textContent == '')
    {
        dg1.deleteRow(1);
        HideDatagrid();
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

    switch (xObjectName)
    {
        case "ibCls":
            Page_BlockSubmit = true;

            var strVerNo = document.all["txVerNo"].value;
            var strUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAT009" + "&VER_NO=" + strVerNo + "&MODE=1";
            jf_OpenChildWin(strUrl, "EAT806", 800, 600);
            break;
        case "btAdd":
            Page_BlockSubmit = true;
            if (txFileClsOnBlur() && CheckDuplicate())
                AddClsNo();
            break;
        case "btSelectAll":
            Page_BlockSubmit = true;
            SelectAll();
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            SelectInverse();
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            SelectClear();
            break;
        case "btDeleteSelected":
            Page_BlockSubmit = true;
            DeleteSelected();
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
        case "btSave":
            Page_BlockSubmit = false;
            PrepareData();
            jf_ToolBarSubmit(xObjectName);
            break;
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
        document.all.txFileCls.value = '';
    }

    if (argCallerId == "EAC005")
    {
        if (document.all["txFileCls"] != null)
            document.all["txFileCls"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        if (document.all["txVerNo"] != null)
            document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[5].value);
        txFileClsOnBlur();

    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function SelectAll()
{
    for (var i = 1; i < document.all.dg1.rows.length; i++)
        dg1.rows[i].cells[1].children[0].checked = true;
}

function SelectInverse()
{
    for (var i = 1; i < document.all.dg1.rows.length; i++)
        if (dg1.rows[i].cells[1].children[0].checked == true)
            dg1.rows[i].cells[1].children[0].checked = false;
        else
            dg1.rows[i].cells[1].children[0].checked = true;
}

function SelectClear()
{
    for (var i = 1; i < document.all.dg1.rows.length; i++)
        dg1.rows[i].cells[1].children[0].checked = false;
}

//清除勾選的row
function DeleteSelected()
{
    var dg1 = document.all.dg1;
    var nLength = dg1.rows.length;

    for (var nRows = nLength - 1 ; nRows > 0 ; nRows--)
        if (dg1.rows[nRows].cells[1].children[0].checked)//若CheckBox被勾選擇刪除該Row
            document.all.dg1.deleteRow(nRows);

    if (document.all.dg1.rows.length == 1)
        HideDatagrid();
    else//重新設序號
        for (var i = 1; i < document.all.dg1.rows.length; i++)
        {
            var row = document.all.dg1.rows[i];
            row.children[0].textContent = i;
        }
}

function txFileClsOnBlur()
{
    if (document.all["txFileCls"].value != "")
    {
        //1070830 Zen 1070678 弱掃Ajax修正
        //var CheckResult = EAT806.CheckCls(document.all["txVerNo"].value, document.all["H_txOrgNo"].value, document.all["txFileCls"].value).value;
        var CheckResult = EA08.EAT806.CheckCls(document.all["txVerNo"].value, document.all["H_txOrgNo"].value, document.all["txFileCls"].value).value;
        if (CheckResult.split(',')[0] == "false")
        {
            document.all["txFileCls"].value = "";
            alert(CheckResult.split(',')[1]);
            $('#txFileCls').focus();
        }
        else
        {
            strClsKey = CheckResult.split(',')[1];
            return true
        }
    }
    return false;
}

function CheckDuplicate()
{
    var dg1 = document.all.dg1;
    if (dg1.rows.length == 1)
        return true;

    for (var nRow = 1 ; nRow < dg1.rows.length ; nRow++)
        if (dg1.rows[nRow].cells[2].children[1].textContent == strClsKey)//比對是否和datagrid之鍵值重複
        {
            alert('已有相同的分類號存在。');
            return false;
        }
    return true;
}

function AddClsNo()//將資料加入datagrid
{
    var nCount = document.all.dg1.rows.length;

    var row = document.createElement("TR");

    var colSeqNo = document.createElement("TD");
    colSeqNo.setAttribute("align", "middle");
    colSeqNo.textContent = nCount;

    var colSelect = document.createElement("TD");
    colSelect.setAttribute("align", "middle");
    var cbSelect = document.createElement("input");
    cbSelect.setAttribute("type", "checkbox");
    colSelect.appendChild(cbSelect);

    var colVerCls = document.createElement("TD");
    colVerCls.setAttribute("align", "middle");
    var spVerCls = document.createElement("span");
    var strVerNo = document.all.txVerNo.value;
    var strFileNoSep = document.all.H_txFileNoSep.value;
    var strFileCls = document.all.txFileCls.value;
    spVerCls.textContent = strVerNo + strFileNoSep + strFileCls;
    var spClsKey = document.createElement("span");
    spClsKey.style.display = 'none';
    spClsKey.textContent = strClsKey;
    colVerCls.appendChild(spVerCls);
    colVerCls.appendChild(spClsKey);

    row.appendChild(colSeqNo);
    row.appendChild(colSelect);
    row.appendChild(colVerCls);

    document.all.dg1.children[0].appendChild(row);

    if (document.all.dg1.rows.length > 1)
    {
        document.all.tbSelect.style.display = '';
        document.all.dg1.style.display = '';
        document.all.dg1head.style.display = '';
    }
}

function PrepareData()
{
    var strClsKeys = strClsKeys;
    strClsKeys = '';

    for (var nRow = 1 ; nRow < dg1.rows.length ; nRow++)
        strClsKeys += dg1.rows[nRow].cells[2].children[1].textContent + ',';

    strClsKeys = strClsKeys.slice(0, -1);
    document.all.H_txClsKeys.value = strClsKeys;
}

function HideDatagrid()
{
    document.all.tbSelect.style.display = 'none';
    document.all.dg1.style.display = 'none';
    document.all.dg1head.style.display = 'none';
}