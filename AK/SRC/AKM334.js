/*
DATE	SA		PRG		MGR_NO			DESC
1040416	--		Cloud	1000575		    因應驗證需求,依據系統參數'AK_AK334_REVISE'行調整dg1是否可以編輯(MERGE)
1060414 Cloud   Zen     1050087         二代升級
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060414 Zen 1050087 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

function ShowMsg()
{
    //1060414 Zen 1050087 二代升級    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060414 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060414 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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

//1060414 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060414 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        //1040416	Cloud	1000575	因應驗證需求,新增 btSave 事件 -START
        case "btSave":
            Page_BlockSubmit = false;
            //1060414 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1040416	Cloud	1000575	因應驗證需求,新增 btSave 事件 -END
        //1060414 Zen 1050087 二代升級        //case "btSearch":
        //    jf_ToolBarSubmit();
        //    break;
        //case "btPrint":
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
    ShowMsg();
}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}


//1060414 Zen 1050087 二代升級//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
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

