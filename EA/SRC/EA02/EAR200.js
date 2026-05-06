/*
DATE 	    SA		PRG		MGR_NO		DESC
1071002     David   Zen     1050087     二代升級
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

//1071002 Zen 1050087 二代升級//if (document.all.tbTool)
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
//1071002 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1071002 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
        //1071002 Zen 1050087 二代升級        //以下屬於DataGrid ToolBar
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
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1071002 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1071002 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btPreview":
            var bCheckOne = false;
            for (var i = 2; i < document.all.dg1.rows.length + 1; i++)
            {
                if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
                {
                    bCheckOne = true;
                    break;
                }
            }
            if (!bCheckOne)
            {
                Page_BlockSubmit = true;
                alert("至少需勾選一筆歸檔批號");
            }
            else
                Page_BlockSubmit = false;
            //1071002 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        //1071002 Zen 1050087 二代升級        ////以下屬於DataGrid ToolBar
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
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
