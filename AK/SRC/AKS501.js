/*
DATE    SA		PRG		MGR_NO	        DESC
1060420	Cloud   Zen	    1050087	        二代升級修改
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1060420 Zen 1050087 二代升級//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060420 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060420 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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

//1060420 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060420 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = false;
            if (jf_Trim(document.all.txApplyDateS.value) == "" &&
			   jf_Trim(document.all.txApplyDateS.value) == "" &&
			   jf_Trim(document.all.txApplyNoS.value) == "" &&
			   jf_Trim(document.all.txApplyNoS.value) == "")
            {
                alert('申請日期、申請書號不可皆為空白');
                //1060420 Zen 1050087 二代升級                //document.all.txApplyDateS.focus();
                $('#txApplyDateS').focus();
                Page_BlockSubmit = true;
            }
            //1060420 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            //var pVal1,pVal2;
            //pVal1 = document.all.txDateS.value;
            //pVal2 = document.all.txDateE.value;
            jf_ConfirmClean();
            //document.all.txDateS.value = pVal1;
            //document.all.txDateE.value = pVal2;
            //document.all.txApplyDateS.value = pVal1;
            //document.all.txApplyDateE.value = pVal2;
            //1060420 Zen 1050087 二代升級            //document.all.txApplyDateS.focus();
            $('#txApplyDateS').focus();
            break;
        //1060420 Zen 1050087 二代升級        //case "btPrint":
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


//1060420 Zen 1050087 二代升級//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
//{
//    var index = document.all[argDDLId].selectedIndex;
//    var obj = document.all[argDDLId].options[index];

//    document.all[argTextBoxId].value = obj.text;
//    document.all[argLabelId].innerText = obj.value;
//}

//1100204 Zen 1090927 取消使用document.activeElement//function ReturnValue()
function ReturnValue(argId)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
    var xObjectName = argId;
    var rowstr = xObjectName.substring(0, xObjectName.indexOf("hlApplyNo"));
    if (opener != null)
    {
        opener.document.all(document.all("_rtnObj").value).length = 1;
        //1060420 Zen 1050087 二代升級--begin        //opener.document.all(document.all("_rtnObj").value).options[0].value = document.all(rowstr + "lbPubName").innerText;
        //opener.document.all(document.all("_rtnObj").value).options[0].text = document.all(rowstr + "hlApplyNo").innerText;
        opener.document.all(document.all("_rtnObj").value).options[0].value = document.all(rowstr + "lbPubName").textContent;
        opener.document.all(document.all("_rtnObj").value).options[0].text = document.all(rowstr + "hlApplyNo").textContent;
        //1060420 Zen 1050087 二代升級--end        opener.window.CallBack("AKS501");
        close();
    }
}

function TbOnBlur(strObjName)
{
    var pIsValid = true;
    var pStr = "";

    if (strObjName == "txApplyDateS" || strObjName == "txPubBirth" || strObjName == "txApplyDateE")
    {
        pVal1 = jf_Trim(document.all[strObjName].value);
        if (pVal1 != "")
        {
            if (!jf_CheckCDATE(pVal1))
            {
                pStr = pStr + "日期格式錯誤：" + pVal1 + "\n\r";
                if (pIsValid) document.all[strObjName].focus();
                pIsValid = false;
            }
        }
    }

    if (pStr != "")
    {
        alert(pStr);
    }
    return pIsValid;
}

function UserOnBlur(Userobj)
{
    if (Userobj.options == null)
    {
        document.all["txUserValue"].value = "";
        return;
    }
    if (Userobj.options.length == 0)
    {
        document.all["txUserValue"].value = "";
        return;
    }
    var index = Userobj.selectedIndex;
    if (index == -1)
    {
        document.all["txUserValue"].value = "";
        return;
    }
    document.all["txUserValue"].value = Userobj.options[index].value;
}
