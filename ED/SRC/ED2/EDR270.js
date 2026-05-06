/*
DATE	SA		PRG		MGR_NO		DESC
1030108	David	David	1020963		新增程式(由EDR370複製後進行修改，因EDR370為CDC客製化，故新增EDR270 for 共通版使用)
1051128 David   Zen     1050087     二代公文修改
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

//1051128 Zen 1050087 二代公文修改
//if (document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
//1051128 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051128 Zen 1050087 二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

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
//1051128 Zen 1050087 二代公文修改
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

    //1051128 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            if (jf_Trim(document.all["dlFolder"].options[document.all["dlFolder"].selectedIndex].text) == "")
            {
                alert("資料夾名稱不可為空白");
                //1051128 Zen 1050087 二代公文修改
                //document.all["dlFolder"].focus();
                $('#dlFolder').focus();
            }
            else
            {
                Page_BlockSubmit = !jf_CheckKeyObject();
                //1051128 Zen 1050087 二代公文修改
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btExcel":
            if (document.all.dg1)
            {
                Page_BlockSubmit = false;
                //1051128 Zen 1050087 二代公文修改
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
            {
                Page_BlockSubmit = true;
                alert("請先載入公文清單後再執行");
            }
            break;
    }
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
        { }
        else
        { }
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
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_sortCol(argColName)
{
    //指令排序要用哪個column

    //	0 代表 DEPT_NAME DESC
    //	1 代表 DEPT_NAME ASC
    //  2 代表 DOC_MAIN ASC
    //  3 代表 DOC_NAME DESC

    switch (argColName)
    {
        case "DOC_NO":
            if (document.all.hDgSortCmd.value == "3")
                document.all.hDgSortCmd.value = "2";
            else
                document.all.hDgSortCmd.value = "3";
            break;
        case "DEPT_NAME":
            if (document.all.hDgSortCmd.value == "1")
                document.all.hDgSortCmd.value = "0";
            else
                document.all.hDgSortCmd.value = "1";
            break;
        default:
            break;
    }

    IsServerHandling = true;

    __doPostBack('btSort', '');
}

function DocNoCheck()
{
    var DocNo = jf_Trim(document.all.txDocNo.value);
    var Same = false;
    if (DocNo != "")
    {
        for (var i = 2; i <= document.all.dg1.rows.length; i++)
        {
            //1051128 Zen 1050087 二代公文修改
            //if (document.all["dg1__ctl" + i + "_lbRead"].innerText == DocNo)
            if (document.all["dg1__ctl" + i + "_lbRead"].textContent == DocNo)
            {
                //1051128 Zen 1050087 二代公文修改
                //document.all.lbCheck.innerText = "公文文號" + DocNo + "存在於資料夾中";
                document.all.lbCheck.textContent = "公文文號" + DocNo + "存在於資料夾中";
                Same = true;
                break;
            }
        }
        document.all.txDocNo.value = "";
        //1051128 Zen 1050087 二代公文修改
        //document.all.txDocNo.focus();
        $('#txDocNo').focus();
        if (!Same)
        {
            //1051128 Zen 1050087 二代公文修改
            //document.all.lbCheck.innerText = "";
            document.all.lbCheck.textContent = "";
            alert("此公文文號不存在於資料夾中");
        }
    }
}