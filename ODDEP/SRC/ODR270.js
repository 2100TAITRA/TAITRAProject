/*
DATE 	    SA		PRG		MGR_NO		DESC
1060927     David   Zen     1050087     二代升級
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060927 1050087 Zen 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

function ShowMsg()
{
    //1060927 1050087 Zen 二代升級    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060927 1050087 Zen 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060927 1050087 Zen 二代升級    //var xObjectName = document.activeElement.id;
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

//1060927 1050087 Zen 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
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

    //1060927 1050087 Zen 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btPrint":
            if (fnCheckBeforePrint())
                Page_BlockSubmit = !jf_ConfirmPrint();
            else
                Page_BlockSubmit = true;
            //1060927 1050087 Zen 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            if (fnCheckBeforePrint())
                Page_BlockSubmit = !jf_ConfirmPreview();
            else
                Page_BlockSubmit = true;
            //1060927 1050087 Zen 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
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

function fnCheckBeforePrint()
{
    var strYear = jf_Trim(document.all.txYear.value);
    if (strYear != "")
        return true;
    //1060927 1050087 Zen 二代升級    //document.all.txYear.focus();
    $('#txYear').focus();
    alert("年度不可空白。");
    return false;
}