/*
DATE	SA		PRG		MGR_NO		DESC
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
0981203	--		Albert	0980336		不再自網址參數取得Artifact
1050513 Leslie  Cloud   1050087     升級二代
1051019 Leslie  Joe		1050087		二代修正配合行動平台
1060522	Cloud	Cloud	1060390		配合修改，調整已處理過關閉視窗方式
1061103 Kevin   Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
1140919 Leslie  Cloud   1141137     外貿檔號拆開顯示配合調整title
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1050513 Cloud   1050087     升級二代
/*if (document.all["ValidationSummary1"].innerText != "")
	alert(document.all["ValidationSummary1"].innerText);*/
jf_ShowValidator();


//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019	Joe		1050087		配合行動平台進行修正
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;
    /*
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}*/

    switch (xObjectName)
    {
        /*
		case "":
			break;
		*/
    }
}

//1050518 Cloud	1050087 升級二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
    {
        //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    //1050513 Cloud   1050087     升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;
    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050513 Cloud   1050087     升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050513 Cloud   1050087     升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btTransfer":
            //1050513 Cloud 1050087 ApproveCheck都是回傳true...不需要使用函式以及判斷了
            //Page_BlockSubmit = !ApproveCheck();
            //if(Page_BlockSubmit == false)
            //{
            //以下為原本程式
            /*
            var strUrl = "AKT800C1.aspx?BOR_NO=" + document.all.txBorNo.value+"&USER=" + document.all["USER"].value;
            jf_OpenChildWin(strUrl, "", 400, 250 );
            //jf_ToolBarSubmit();
            */
            Page_BlockSubmit = false;
            //1050513 Cloud 1050087 升級二代
            /*var ddlIdx = 4;
            var nextOpt = GetToolbarCtrl(ddlIdx);
            if(nextOpt==null)
                alert('null');*/
            //CAESAR DEBUGGING CODE
            /*
            var aOptions = nextOpt.getOptions();	
                alert(aOptions.value);
                alert(aOptions.selectedIndex);
                if(aOptions!=null)
                {
                    alert(aOptions[0].innerText);
                    alert(aOptions[0].value);
                }
            }
            */
            /*var aOptions = nextOpt.getOptions();	
            document.all.SelectedUser.value = aOptions.value;
            document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;*/
            //jf_ToolBarSubmit();
            document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;

            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            //}
            break;
        case "btApprove":
            //1050513 Cloud 1050087 ApproveCheck都是回傳true...不需要使用函式以及判斷了
            /*Page_BlockSubmit = !ApproveCheck();
			if(Page_BlockSubmit == false)
			    //jf_ToolBarSubmit();*/
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btReject":
            //1050513 Cloud 1050087 ApproveCheck都是回傳true...不需要使用函式以及判斷了
            /*Page_BlockSubmit = !ApproveCheck();
			if(Page_BlockSubmit == false)
			    jf_ToolBarSubmit();*/
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            var strBorNo = document.all.txBorNo.value;
            var strHttp = document.all.nHttp.value;
            var strSourceOrgno = document.all.nSourceOrgno.value;
            //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
            //0981203	Albert	0980336	不再自網址參數取得Artifact
            //var strArtifact = fnGetArtifact();
            var strArtifact = document.all.SsoArtifact.value;
            var strUrl = strHttp + "EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argMsgFrom=AKT800&argMsgFromId=" + strBorNo + "&SAMLart=" + strArtifact;
            jf_OpenChildWin(strUrl, "EDI200", 700, 500);
            //1050513 Cloud   1050087     升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function ApproveCheck()
{
    var VerifyResult = "";
    //David 審核結果不需卡意見,因此DropDownList已拿掉,所以無作用
    /*if(document.all.ddlVerifyResult.selectedIndex != -1)
		VerifyResult = document.all.ddlVerifyResult.options[document.all.ddlVerifyResult.selectedIndex].text;*/
    //核可不需輸入簽核意見(0941001 justin)
    if (window.event.srcNode.getAttribute("ID") == "btApprove")
        return true;
    /*if(VerifyResult == "" && document.all.tbOpinion.value == "")
	{
		alert("請輸入簽核意見");
		document.all.tbOpinion.focus();
		return false;
	}
	else*/
    return true;
}
//1050513 Cloud 1050087 升級二代-此段無用 markAKT800C1 已廢除
/*
function CallBack(argCallerId)
{

	if (argCallerId == "AKT800C1")
	{
		//如果傳送失敗的話，則刪除審核意見
		if( document.all["lbReturnValue"].options[0].value == "0" || document.all["lbReturnValue"].options[0].value == "2")
		{
		}
		else
		{
			alert("傳送成功");
			//document.all.ToolBarSenderID.value = "btTransfer";
			if(Page_BlockSubmit==false)
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				__doPostBack("tbTool",1);
			}
		}
	}
}
*/
function ClientOnLoad()
{
    //1060522	Cloud	1060390		配合修改，調整已處理過關閉視窗方式
    if (document.all.HasBeModify != null)
    {
        alert('本調案申請單已被處理完成，視窗即將關閉。');
        open(location, '_self').close();
    }
    //1140919  Cloud   1141137     外貿檔號拆開顯示配合調整title
    //* 1140919      Cloud   1141137 外貿檔號拆開顯示
    if (document.all["OrgNickName"].value == "TAITRA") {
        document.all["colNameHeader"][0].textContent = "文號";
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
//1050513 Cloud 升級二代-無用 mark
/*function GetToolbarCtrl(argId)
{
	return document.all.tbTool.getItem(argId);
	for(var i=0;i<20;i++)
	{
		var o=document.all.tbTool.getItem(i);
		if(o!=null)
		{
			alert(o.getAttribute("ID"));
			if(o.getAttribute("ID")==argId)
				return o;
		}
	}
	return null;
}*/
//常用審核意見
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050513 Cloud 升級二代
    //var val		= document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["tbOpinion"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    //1050513 Cloud 升級二代
    //document.all["tbOpinion"].focus();
    $("tbOpinion").focus();
}

//0981203 Albert 0980336 以下fn已不使用
/*
//取得網址列中的Artifact
function fnGetArtifact()
{
	var str = document.location.href;	
	var SAMLartStr = "";
	if (str.indexOf("?") != -1)
	{	
		var arr = str.split("?");
		str = arr[arr.length-1];
		var idx = str.indexOf("SAMLart=");


		var endx = str.lastIndexOf("#")
		if(endx==-1)
			str = str.substring(idx, str.length).replace("SAMLart=", "");
		else
			str = str.substring(idx,endx).replace("SAMLart=", "");
		idx = str.indexOf("&");
		if (idx == -1)
			idx = str.length;
		str = str.substring(0, idx);
		SAMLartStr = str;
	}
   return SAMLartStr;
}
*/