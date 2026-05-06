/*
DATE 	    SA		PRG		MGR_NO      DESC
1060424     Cloud   Zen     1050087     二代公文修改
1060518     Leslie  Zen     1060215     innerText相關修正1100204     Leslie  Zen     1090927     取消使用document.activeElement
*/
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
        //1060424 Zen 1050087 二代升級        //case "btSearch":
        //    jf_ToolBarSubmit();
        //    break;
        case "btPrint":
            //1060424 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            //1060424 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
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


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].innerText = obj.value;
}
//1100204 Zen 1090927 取消使用document.activeElement//function ReturnValue()
function ReturnValue(argChargeNo)
{
    opener.document.all.lbReturnValue.length = 1;
    //1060518 Zen 1060215 innerText相關修正--begin    //opener.document.all.lbReturnValue.options[0].text = document.activeElement.innerText;
    //opener.document.all.lbReturnValue.options[0].value = document.activeElement.innerText;
    //1100204 Zen 1090927 取消使用document.activeElement--begin    //opener.document.all.lbReturnValue.options[0].text = document.activeElement.textContent;
    //opener.document.all.lbReturnValue.options[0].value = document.activeElement.textContent;
    opener.document.all.lbReturnValue.options[0].text = argChargeNo;
    opener.document.all.lbReturnValue.options[0].value = argChargeNo;
    //1100204 Zen 1090927 取消使用document.activeElement--end    //1060518 Zen 1060215 innerText相關修正--end    opener.window.CallBack("AKM860C1");
    close();
}
