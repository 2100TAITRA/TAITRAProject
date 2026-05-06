/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.10.16
 * -------------------------------------------------------------------------------------------------
 * 日期		    修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2009.07.27	Howard	0980402	修正案由欄位檢核使用字數計算
 * 1060413      Zen     1050087 二代升級
 * 2022.08.26   Cloud   1110875 儲存後先將主旨回寫至母視窗隱藏欄位，避免akm330 儲存時誤判
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060413 Zen 1050087 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

function ShowMsg()
{
    //1060413 Zen 1050087 二代升級    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060413 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060413 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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

//1060413 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060413 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSave":
            if ((document.all["tbAPP"].value == "") && (document.all["tbOTHER"].value == ""))
            {
                alert("請先輸入資料");
                //1060413 Zen 1050087 二代升級                //document.all("tbAPP").focus();
                $('#tbAPP').focus();
                Page_BlockSubmit = true;
            }
            else if (!jf_CheckBeforSave())
            {
                Page_BlockSubmit = true;
            }
            else
            {
                Page_BlockSubmit = false;
            }
            //1060413 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1060413 Zen 1050087 二代升級        //case "btPrint":
        //    Page_BlockSubmit = !jf_ConfirmPrint();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btPreview":
        //    Page_BlockSubmit = !jf_ConfirmPreview();
        //    jf_ToolBarSubmit();
        //    break;
    }
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strMsg = "";

    //0950504 Charles 檢查案由是否超過最大字元數
    var iMaxSubLen = parseInt(document.all["txMaxSubLen"].value);
    var iCurrSubLen = 0;
    var strAppSubject = document.all["tbAPP"].value;
    var strOtherSubject = document.all["tbOTHER"].value;
    if (iMaxSubLen > 0)
    {
        //0980727	Howard	0980402	修正案由欄位檢核使用字數計算
        //for(var i=0; i<strAppSubject.length; i++)
        //strAppSubject.charCodeAt(i)<256?iCurrSubLen++:iCurrSubLen+=2;
        iCurrSubLen = strAppSubject.length;
        if (iCurrSubLen > iMaxSubLen)
        {
            //0980727	Howard	0980402	修正案由欄位檢核使用字數計算
            //strMsg += "並列案由可輸入最大長度為" + iMaxSubLen + "字元，目前輸入長度為" + iCurrSubLen + "字元，請修正後再重新儲存。\n";
            strMsg += "並列案由可輸入最大字數為" + iMaxSubLen + "字，目前輸入字數為" + iCurrSubLen + "字，請修正後再重新儲存。\n";
            if (bRtnbool)
            {
                //1060413 Zen 1050087 二代升級                //document.all["tbAPP"].focus();
                $('#tbAPP').focus();
                bRtnbool = false;
            }
        }
        //0980727	Howard	0980402	修正案由欄位檢核使用字數計算
        //iCurrSubLen = 0;
        //for(var i=0; i<strOtherSubject.length; i++)
        //strOtherSubject.charCodeAt(i)<256?iCurrSubLen++:iCurrSubLen+=2;
        iCurrSubLen = strOtherSubject.length;
        if (iCurrSubLen > iMaxSubLen)
        {
            //0980727	Howard	0980402	修正案由欄位檢核使用字數計算
            //strMsg += "其他案由可輸入最大長度為" + iMaxSubLen + "字元，目前輸入長度為" + iCurrSubLen + "字元，請修正後再重新儲存。\n";
            strMsg += "其他案由可輸入最大字數為" + iMaxSubLen + "字，目前輸入字數為" + iCurrSubLen + "字，請修正後再重新儲存。\n";
            if (bRtnbool)
            {
                //1060413 Zen 1050087 二代升級                //document.all["tbOTHER"].focus();
                $('#tbOTHER').focus();
                bRtnbool = false;
            }
        }
    }

    if (strMsg != "")
        alert(strMsg);

    return bRtnbool;
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    //* 2022.08.26   Cloud   1110875 儲存後回寫母視窗隱藏欄位，供AKM330儲存時判斷，此處儲存過就不再儲存
    if (document.all.CLOSE)
    {
        if (document.all.CLOSE.value == "Y")
        {
            opener.document.all.H_BAKM332SAVE.value = "Y";
            jf_CloseSelf("");
        }
    }
    ShowMsg();
}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}


//1060413 Zen 1050087 二代升級//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
//{
//    var index = document.all[argDDLId].selectedIndex;
//    var obj = document.all[argDDLId].options[index];

//    document.all[argTextBoxId].value = obj.text;
//    document.all[argLabelId].innerText = obj.value;
//}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}
