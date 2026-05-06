/*
DATE 	    SA		PRG		MGR_NO		DESC
1060405     David   Zen     1050802     新增EDM021 單位檔號維護作業
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

    switch (xObjectName)
    {
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
            if (jf_CheckDataGridDuplicate("dg1", "txOuStoreNo", "檔號", true) && CheckData()) //檢核檔號是否重複及檔號有值檔名為空
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
            Page_BlockSubmit = !confirm('是否要刪除單位檔號資料');
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CheckData()
{
    for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
        if (document.all["dg1__ctl" + iRow + "_txOuStoreNo"].value != '' && document.all["dg1__ctl" + iRow + "_txOuStoreName"].value == '')
        {
            alert('檔號欄位有值則檔案名稱欄位不可為空');
            $('#dg1__ctl' + iRow + '_txOuStoreName').focus();
            return false;
        }

    return true;
}