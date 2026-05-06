/*
Date        SA      PG      NO          DESC
1060814     David   Justin  1060378     二代公文修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//指定DataGrid欄位
var strTableFields = new Array("_txDeptNo", "_txDeptName");


function ShowMsg()
{
    jf_ShowValidator();
}

function ClientButtonControl(e)
{
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {        case "btSelectAll":
            Page_BlockSubmit = true;
            SelectAll();
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            SelectInverse();
            break;
        case "btSelectBack":
            SelectReturnValue();
            Page_BlockSubmit = false;
            break;
    }
}

function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    ShowMsg();
}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    document.all[argLabelId].textContent = obj.value;
}

//組出回傳值
function ReturnValue(argNo, argName)
{
    try
    {
        opener.document.all.lbReturnValue.length = 1;
        opener.document.all.lbReturnValue.options[0].value = argNo;
        opener.document.all.lbReturnValue.options[0].text = argName;
        opener.window.CallBack("EDM004C1");
        close();
    }
    catch (e) { }
}
function SelectReturnValue()
{
    var intCount = 0;
    for (var i = 2; i < document.all.dg1.rows.length + 1 ; i++)
    {
        if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
        {
            opener.document.all.lbReturnValue.length = intCount + 1;
            opener.document.all.lbReturnValue.options[intCount].value = document.all["dg1__ctl" + i + "_txDeptNo"].value;
            opener.document.all.lbReturnValue.options[intCount].text = document.all["dg1__ctl" + i + "_txDeptName"].value;
            intCount++;
        }
    }
    if (intCount == 0)
    {
        alert("至少勾選一筆明細資料");
        IsServerHandling = false;
        return;
    }
    else
    {
        opener.window.CallBack("EDM004C1");
        close();
    }
}

function SelectAll()
{
    if (document.all.dg1 != null)
    {
        for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
        {
            document.all["dg1__ctl" + iRow + "_cbSelect"].checked = true;
        }
    }
}

//反向
function SelectInverse()
{
    for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
    {
        if (document.all["dg1__ctl" + iRow + "_cbSelect"].checked)
            document.all["dg1__ctl" + iRow + "_cbSelect"].checked = false;
        else
            document.all["dg1__ctl" + iRow + "_cbSelect"].checked = true;
    }
}