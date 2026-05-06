/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1070921  Zen     1050087 二代升級 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1070918 Zen 1050087 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

function ShowMsg()
{
    //1070918 Zen 1050087 二代升級    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1070918 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1070918 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
//cola 註冊 onchange 事件用以算出未上架.. 等欄位
function file_onchange(w, x, y, z, id)
{
    if (document.all[x].value == "")
        document.all[x].value = "0";
    if (document.all[y].value == "")
        document.all[y].value = "0";
    //alert(parseInt(document.all[w].innerText) + parseInt(document.all[x].value) - parseInt(document.all[y].value));
    //1070918 Zen 1050087 二代升級    //if ((parseInt(document.all[w].innerText) + parseInt(document.all[x].value) - parseInt(document.all[y].value)) < 0)
    if ((parseInt(document.all[w].textContent) + parseInt(document.all[x].value) - parseInt(document.all[y].value)) < 0)
    {
        alert('輸入數值有誤，將造成資料錯誤，請重新輸入。');
        document.all[id].value = "0";
        return;
    }

    //1070918 Zen 1050087 二代升級    //document.all[z].value = parseInt(document.all[w].innerText) + parseInt(document.all[x].value) - parseInt(document.all[y].value);
    document.all[z].value = parseInt(document.all[w].textContent) + parseInt(document.all[x].value) - parseInt(document.all[y].value);
}
//1070918 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1070918 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !CheckBeforeOpen();
            //1070918 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //1070918 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btCancel":
            Page_BlockSubmit = false;
            //1070918 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btPrint":
        case "btPreview":
            if (document.all.txYear.value == "")
            {
                alert("統計年度不可為空白!!");
                //1070918 Zen 1050087 二代升級                //document.all.txYear.focus();
                $('#txYear').focus();
                Page_BlockSubmit = true;

            } else
            {
                Page_BlockSubmit = false;
            }
            //1070918 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}
function CheckBeforeOpen()
{
    if (document.all.txYear.value.length != 5)
    {
        alert('格式輸入錯誤，請重新輸入(輸入格式為YYYMM)');
        return false;
    }
    return true;
}
function CallBack(argCallerId)
{

}
function CheckYear()
{
    var strValue;
    strValue = document.all.txYear.value;
    if (strValue == "")
        return;
    else
        document.all.txYear.value = jf_PADL(strValue, 3, "0");

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


//1070918 Zen 1050087 二代升級//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
//{
//    var index = document.all[argDDLId].selectedIndex;
//    var obj = document.all[argDDLId].options[index];

//    document.all[argTextBoxId].value = obj.text;
//    document.all[argLabelId].innerText = obj.value;
//}
