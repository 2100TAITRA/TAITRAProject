/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1060908      Zen     1050087 二代升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1060908 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
//1060908 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060908 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
        case "ImDateS":
            {
                Page_BlockSubmit = true;
                jf_CallCalendar(document.all.txFILE_DATES, event.screenX, event.screenY);
                break;
            }
        case "ImDateE":
            {
                Page_BlockSubmit = true;
                jf_CallCalendar(document.all.txFILE_DATEE, event.screenX, event.screenY);
                break;
            }
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060908 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060908 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btPreview":
        case "btPrint":
            if (document.all["txFILE_DATES"].value == "" && document.all["txFILE_DATEE"].value == "")
            {
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請輸入歸檔日期區間"])), "");
                Page_BlockSubmit = true;
                document.all["txFILE_DATES"].focus();
            }
            else
                Page_BlockSubmit = false;
            //1060908 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function Check_DATE(obj, field_name)
{
    if (obj.value != "")
    {
        obj.value = jf_PADL(obj.value, 7, "0");

        if (!jf_CheckCDATE(obj.value))
        {
            alert(field_name + "格式有誤");
            obj.value = "";
            //1060908 Zen 1050087 二代升級            //obj.focus();
            $('#' + obj.id).focus();
        }
    }
}
