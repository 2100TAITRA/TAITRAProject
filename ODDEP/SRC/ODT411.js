/*
DATE	SA		PRG		MGR_NO		DESC
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
0981203			Albert	0980336		修改不再自網址參數取得Artifact
1050308	David	David	1050087		二代公文修改
1061103 Kevin   Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050308 David 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050308 David 1050087 二代公文修改
/*if (document.all["ValidationSummary1"].innerText != "")
	alert(document.all["ValidationSummary1"].innerText);*/
jf_ShowValidator();

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
        /*
		case "":
			break;
		*/
    }
}

//1050308 David 1050087 二代公文修改
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

    //1050308 David 1050087 二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btTransfer":
            //1050308 David 1050087 二代公文修改
            /*var ddlIdx=1;
			var nextOpt = GetToolbarCtrl(ddlIdx);
			var aOptions = nextOpt.getOptions();
			document.all.SelectedUser.value = aOptions.value;
			document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;*/
            document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
            Page_BlockSubmit = !CheckUnAllowEmpty();
            //1050308 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btApprove":
            Page_BlockSubmit = !CheckUnAllowEmpty();
            //1050308 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btReject":
            Page_BlockSubmit = !CheckUnAllowEmpty();
            //1050308 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
            //Leslie	增加查詢該申請的簽核流程
        case "btSearchFlow":
            Page_BlockSubmit = true;
            if (jf_CheckKeyObject())
            {
                var strDocNo = document.all["txDocNo"].value;
                var strSourceOrgno = document.all.H_txOrgNo.value;
                //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
                var strArtifact = fnGetArtifact();
                var strUrl = "../../ED/ED2/EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argMsgFrom=ODT410&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
                jf_OpenChildWin(strUrl, "EDI200", 700, 500);
            }
            //1050308 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
    //1050308 David 1050087 二代公文修改
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult)
{
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050308 David 1050087 二代公文修改
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

function CheckUnAllowEmpty()
{
    var bRtnbool = true;
    var strErrMsg = "";
    //if (document.all["txDesc"].value == "")	//Leslie	線上申請之簽核作業統一不強制要求輸入簽核意見
    //{
    //	strErrMsg = "審核意見不可為空白";
    //	document.all["txDesc"].focus();
    //}
    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}

function GetToolbarCtrl(argId)
{
    return document.all.tbTool.getItem(argId);
    for (var i = 0; i < 20; i++)
    {
        var o = document.all.tbTool.getItem(i);
        if (o != null)
        {
            alert(o.getAttribute("ID"));
            if (o.getAttribute("ID") == argId)
                return o;
        }
    }
    return null;
}

//常用申請理由
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050308 David 1050087 二代公文修改
    //var val		= document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["txDesc"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    document.all["txDesc"].focus();
}

//取得網址列中的Artifact
function fnGetArtifact()
{
    //0981203 Albert 0980336 修改不再自網址參數取得Artifact
    /*
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
	*/
    SAMLartStr = document.all.SsoArtifact.value;
    return SAMLartStr;
}
