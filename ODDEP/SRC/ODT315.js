/* DATE 	SA		PRG		MGR_NO		DESC
1040728	    Leslie	Leslie	1040141		修正SQL Injection的弱點
1050715     David   Zen     1050087     二代公文修改
1050087 	Leslie	Zen		1050087 	修正client button 無法postback之錯誤
1060518     Leslie  Zen     1060215     innerText相關修改
1100201		Leslie	Joe		1090927		取消使用document.activeElement*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050715 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg() {
    //1050715 Zen 1050087 二代公文修改
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
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

        case "Button1":
            if (document.all.txDocNo.value != "" && document.all.dlOwnUserId2.selectedIndex != 0 && document.all.dlOwnUserId2.selectedIndex != -1)
            {
                Page_BlockSubmit = false;
				//1051102 Zen 1050087 修正client button 無法postback之錯誤
                __doPostBack(xObjectName, event.flatIndex);
            }
            else
            {
                alert("公文文號及改分配給的欄位必須均有值!!");
                //1050715 Zen 1050087 二代公文修改
                //document.all.dlOwnUserId2.focus();
                $('#dlOwnUserId2').focus();
                Page_BlockSubmit = true;
            }
            break;
        case "Button2":
            Page_BlockSubmit = true;
            document.all.txDocNo.value = "";
            document.all.dlOwnUserId2.selectedIndex = -1;
            break;

    }
}

//1050715 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050715 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            if (document.all.dlOwnUserId.selectedIndex != 0 && document.all.dlOwnUserId.selectedIndex != -1)
            {
                Page_BlockSubmit = false;
            }
            else
            {
                alert("請選擇繕印人員欄位!!");
                //1050715 Zen 1050087 二代公文修改
                //document.all.dlOwnUserId.focus();
                $('#dlOwnUserId').focus();
                Page_BlockSubmit = true;
            }
            //1050715 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1050715 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1050715 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{

}
//1100201	Joe		1090927		取消使用document.activeElement
function ReturnValue(argDocNo)
{
    //1060518 Zen 1060215 innerText相關修正    //document.all.txDocNo.value = document.activeElement.innerText;
	//1100201	Joe		1090927		取消使用document.activeElement
    // document.all.txDocNo.value = document.activeElement.textContent;
	document.all.txDocNo.value = argDocNo;
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


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

