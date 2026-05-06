/*
DATE	SA		PRG		MGR_NO			DESC
1120407 Leslie  Zen		屏東縣序24	    修正ASP架構下儲存錯誤之問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060502 Zen 1050087 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1060502 Zen 1050087 二代升級//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060502 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060502 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = document.target.id;

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

//1060502 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060502 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            //1060502 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1060502 Zen 1050087 二代升級        //case "btPrint":
        //    Page_BlockSubmit = !jf_ConfirmPrint();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btPreview":
        //    Page_BlockSubmit = !jf_ConfirmPreview();
        //    jf_ToolBarSubmit();
        //    break;
    }
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{

}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}


//1060502 Zen 1050087 二代升級//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
//{
//    var index = document.all[argDDLId].selectedIndex;
//    var obj = document.all[argDDLId].options[index];

//    document.all[argTextBoxId].value = obj.text;
//    document.all[argLabelId].innerText = obj.value;
//}

//1120407 Zen 屏東縣序24 修正ASP架構下儲存錯誤之問題，額外串入使用機關代碼
//function ReturnValue(argWgrpNo, argWgrpName)
function ReturnValue(argWgrpNo, argWgrpName, argSourceOrgno)
{
    //1120407 Zen 屏東縣序24 修正ASP架構下儲存錯誤之問題，額外串入使用機關代碼
    //opener.document.all.lbReturnValue.length = 1;
    opener.document.all.lbReturnValue.length = 2;
    opener.document.all.lbReturnValue.options[0].text = argWgrpNo;
    opener.document.all.lbReturnValue.options[0].value = argWgrpName;
    //1120407 Zen 屏東縣序24 修正ASP架構下儲存錯誤之問題，額外串入使用機關代碼
    opener.document.all.lbReturnValue.options[1].value = argSourceOrgno;
    opener.window.CallBack("DFM300C1");
    close();
}