/*
DATE	SA		PRG		MGR_NO		DESC
* 2020.10.31	CLOUD	1090561	新增信保客製化審核作業
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

jf_ShowValidator();



function ClientButtonControl(e)
{
    
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;
    

    switch (xObjectName)
    {
        /*
		case "":
			break;
		*/
    }
}


function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    xObjectName = event.target.id;
    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btTransfer":
           
            Page_BlockSubmit = false;
            document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;

            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            //}
            break;
        case "btApprove":
            
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btReject":
            
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            var strBorNo = document.all.txBorNo.value;
            var strHttp = document.all.nHttp.value;
            var strSourceOrgno = document.all.nSourceOrgno.value;
            
            var strArtifact = document.all.SsoArtifact.value;
            var strUrl = strHttp + "EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argMsgFrom=AKT800&argMsgFromId=" + strBorNo + "&SAMLart=" + strArtifact;
            jf_OpenChildWin(strUrl, "EDI200", 700, 500);
            
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function ApproveCheck()
{
    var VerifyResult = "";
    
    if (window.event.srcNode.getAttribute("ID") == "btApprove")
        return true;
    return true;
}

function ClientOnLoad()
{
    if (document.all.HasBeModify != null)
    {
        alert('本調案申請單已被處理完成，視窗即將關閉。');
        open(location, '_self').close();
    }
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
    document.all[argLabelId].innerText = obj.value;
}

//常用審核意見
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["tbOpinion"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    
    $("tbOpinion").focus();
}

