/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2008.7.01	Cola	0970604	記錄機關代碼，幫助正確判斷鍵值是否重覆
 * 103.11.12	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 106.04.24    Zen     1050087 二代升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060424 Zen 1050087 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1060424 Zen 1050087 二代升級//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060424 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060424 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

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

//1060424 Zen 1050087 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;
    var ret;
    var AlertStr = "", FocusAt = "";

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1060424 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            if (document.all["tbNo"].value == "")
            {
                alert("項目代號不可空白!");
                //1060424 Zen 1050087 二代升級                //document.all["tbNo"].focus();
                $('#tbNo').focus();
                Page_BlockSubmit = true;
            }
            else
            { Page_BlockSubmit = false; }
            //1060424 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;


        case "btSave":
            if (document.all["tbNo"].value == "" || document.all["tbName"].value == "" || document.all["tbCalcUnit"].value == "" || (document.all["tbCharge"].value == "" && document.all["cbIsVariable"].checked == false))
            {

                if (document.all["tbNo"].value == "")
                {
                    AlertStr = AlertStr + "項目代號欄位不可空白!\n"
                    if (FocusAt == "") FocusAt = "tbNo";
                }
                if (document.all["tbName"].value == "")
                {
                    AlertStr = AlertStr + "項目名稱欄位不可空白!\n"
                    if (FocusAt == "") FocusAt = "tbName";
                }
                if (document.all["tbCalcUnit"].value == "")
                {
                    AlertStr = AlertStr + "計價單位欄位不可空白!\n"
                    if (FocusAt == "") FocusAt = "tbCalcUnit";
                }
                if (document.all["tbCharge"].value == "")
                {
                    AlertStr = AlertStr + "費用欄位不可空白!\n"
                    if (FocusAt == "")
                        FocusAt = "tbCharge";

                }
                alert(AlertStr);
                //1060424 Zen 1050087 二代升級                //document.all[FocusAt].focus();
                $('#' + FocusAt).focus();
                Page_BlockSubmit = true;
            }
            else
            {
                if (jf_GetActionMode() == LayoutModeNew)
                {

                    var arKeyName = new Array(1);
                    var arKeyValue = new Array(1);
                    if (document.all["tbNo"].value != "")
                    {
                        arKeyName[0] = "CHARGE_NO";
                        arKeyName[1] = "SOURCE_ORGNO";//[0970604]Add by Cola 新增傳入機關代碼
                        arKeyValue[0] = document.all["tbNo"].value;
                        arKeyValue[1] = document.all["txOrgNo"].value;//[0970604]Add by Cola 新增傳入機關代碼
                        var arWSParam = new Array(3);
                        arWSParam[0] = "CHARGE_MAIN";
                        arWSParam[1] = arKeyName;
                        arWSParam[2] = arKeyValue;
                        callObj = jf_CallWS("Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);

                        if (callObj.error)
                        {
                            alert(callObj.errorDetail.string);
                            Page_BlockSubmit = true;
                        }
                        if (callObj.value.RtnBool == true)
                        {
                            if (!confirm("此資料已存在，確定修改嗎 ? ")) Page_BlockSubmit = true;
                                //[0970604]Add by Cola若確定，設定Page_BlockSubmit為false
                            else
                                Page_BlockSubmit = false;
                        }
                    }
                } else
                { Page_BlockSubmit = false; }
            }

            //1060424 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060424 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060424 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            break;
        case "btSearch":
            //1060424 Zen 1050087 二代升級            //jf_OpenChildWin("AKM860C1.aspx", "AKM860C1", "700", "400");
            jf_OpenChildWin("AKM860C1.aspx", "AKM860C1", "800", "600");
            break;
        case "btPrint":
            Page_BlockSubmit = false;
            //1060424 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = false;
            //1060424 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{
    if (argCallerId == "AKM860C1")
    {
        document.all["tbNo"].value = document.all["lbReturnValue"].options[0].value;
        document.all["txUserNameTxChange"].value = document.all["tbNo"].value;
        //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
        IsServerHandling = true;
        __doPostBack("", "");
    }

}

function ClientOnLoad()
{
    //1060424 Zen 1050087 二代升級    //jf_CallWS("Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);
}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}


//1060424 Zen 1050087 二代升級//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
//{
//    var index = document.all[argDDLId].selectedIndex;
//    var obj = document.all[argDDLId].options[index];

//    document.all[argTextBoxId].value = obj.text;
//    document.all[argLabelId].innerText = obj.value;
//}

