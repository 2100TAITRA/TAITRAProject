/*
DATE	SA		PRG		MGR_NO		DESC
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
0981203			Albert	0980336		修改不再自網址參數取得Artifact
1020801 Kevin	Erin	1020537		修正確認後無法正常關閉問題(將onload時第一次call webservice mark掉)
1050308	David	David	1050087		二代公文修改
1061103 Kevin   Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
1080423	Cloud	Kevin_C	1080047		增加字數檢核
1110103 Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
1140630 Joe     Andy    1140550     修正錯誤視窗顯示的限制字數與資料庫設定不一致的況狀
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

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
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
        case "btOpen":
            if (jf_CheckKeyObject())
            {
                /*
                    var Acc	= document.all.nAcc.value;
                    var OrgNo	= document.all.nOrgNo.value;
                    if(document.all.nFromUrl!=null)
                        parent.bottom.location.href = "ODI260.aspx?pDocNo="+document.all["txDocNo"].value+"&ACC="+Acc+"&SOURCE_ORGNO="+OrgNo;
                    else
                        parent.bottom.location.href = "ODI260.aspx?pDocNo="+document.all["txDocNo"].value;
                        */
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050308 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (ConfirmSave())//是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
                //ShowBottomEmpty();
            }
            else
                Page_BlockSubmit = true;
            //1050308 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            if (jf_ConfirmDelete())
            {
                Page_BlockSubmit = false;
                //ShowBottomEmpty();
            }
            else
                Page_BlockSubmit = true;
            //1050308 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            if (jf_ConfirmCancel())
            {
                Page_BlockSubmit = false;
                //ShowBottomEmpty();
            }
            else
                Page_BlockSubmit = true;
            //1050308 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
        case "btPreview":
            if (CheckBeforPrint())
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050308 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btTransfer":
            //1050308 David 1050087 二代公文修改
            /*var ddlIdx=2;
			//var nextOpt = GetToolbarCtrl(ddlIdx);
			var aOptions = nextOpt.getOptions();
			document.all.SelectedUser.value = aOptions.value;
			document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;*/
            document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
            Page_BlockSubmit = !CheckBeforSave();
            //1050308 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
            //Leslie	增加查詢申請的"流程資訊"
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
        case "btCheck":
            Page_BlockSubmit = false;
            //1050308 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

            // 093/01/27修改：取消新增模式下"儲存鍵"及"清除鍵"功能
            /*
            case "btClean":
                Page_BlockSubmit = true;
                jf_ConfirmClean();
                document.all["txDept"].value = "";
                document.all["txUser"].value = "";
                document.all["txRcvDate"].value = "";
                document.all["txArmDate"].value = "";
                document.all["txSubject"].value = "";
                document.all["txDocNo"].focus();
                break;
            */
    }
}

function CallBack(argCallerId)
{
    if (argCallerId == "ODT410C1")
    {
        /*
            var strDocNo = document.all.lbReturnValue.options[0].text;
            document.all.txDocNo.value = strDocNo
            var Acc	= document.all.nAcc.value;
            var OrgNo = document.all.nOrgNo.value;
            if(document.all.nFromUrl != null)
                parent.bottom.location.href = "ODI260.aspx?pDocNo=" + strDocNo + "&ACC=" + Acc + "&SOURCE_ORGNO=" + OrgNo;
            else
                parent.bottom.location.href = "ODI260.aspx?pDocNo=" + strDocNo;
    
            window.focus();
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();*/
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    //1020801  Erin [1020537] mark掉第一次call webservice，避免影響window close無法正常關閉視窗
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
    /*
	if(document.all.OnLoadOpen!=null)
	{
		var Acc	= document.all.nAcc.value;
		var OrgNo	= document.all.nOrgNo.value;
		parent.bottom.location.href = "ODI260.aspx?pDocNo="+document.all["txDocNo"].value+"&ACC="+Acc+"&SOURCE_ORGNO="+OrgNo;
		jf_OpenButtonSubmit();
	}*/

    var strDocNo = GetParam("argDocNo");
    if (strDocNo != "")
        document.all.txDocNo.value = strDocNo;
}

function OnWSResult(argResult)
{ }

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050308 David 1050087 二代公文修改
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

//#############################################################################################
//							Button Click Function
//#############################################################################################
//儲存前檢查
function ConfirmSave()
{
	//1080423	Kevin_C	1080047	增加字數檢核
    //1140630   Andy    1140550 修正錯誤視窗顯示的限制字數與資料庫設定不一致的況狀
    //if (!isMaxLength(document.all.txReason,'申請理由','100'))
	if (!isMaxLength(document.all.txReason,'申請理由','300'))
        return false;
	
    var bRtnbool = false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
    {
        if (CheckBeforSave())
            bRtnbool = true;
    }
    return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
    var strErrMsg = "";
    var bRtnbool = true;
    var buf = "";
    var strReason = document.all["txReason"].value;

    if (strReason == "")
    {
        if (strErrMsg != "") buf = "\n";
        strErrMsg = "原因分析不可為空白" + buf + strErrMsg;
        document.all["txReason"].focus();
    }
    if (strReason.length > 300)
    {
        if (strErrMsg != "") buf = "\n";
        strErrMsg = "原因分析長度不可大於300個字" + buf + strErrMsg;
        document.all["txReason"].focus();
    }
    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}

function CheckBeforPrint()
{
    var bRtnbool = true;
    return bRtnbool;
}

function ShowBottomEmpty()
{
    parent.bottom.location.href = "ODT210Bottom.htm";
}
//#############################################################################################
//						其		他		共		用		function
//#############################################################################################
//日期onblur
function CheckCDATE(argObj, strMsg)
{
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            document.all[argObj].focus();
        }
    }
}

//取消TextBox中enter的功能
function fnHandleTextarea()
{
    if (event.keyCode == 13)
        event.cancelBubble = true;
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

//取得參數值
function GetParam(ParamName)
{
    var arr = this.GetParamArray();
    if (ParamName == "") return "";
    for (var i = 0 ; i < arr.length ; i++)
        if (arr[i][0] == ParamName)
            return arr[i][1];
    return "";
}

function GetParamArray()
{
    var arrayOfParamLen = 0;
    var arrayOfParam = new Array(0);

    var pUrl = unescape(parent.location);
    if (pUrl != -1)
    {
        var i, j, k;
        i = pUrl.indexOf("?");
        var paramStr = pUrl.substr(i + 1);
        var arr = paramStr.split("&");
        for (j = 0 ; j < arr.length ; j++)
        {

            k = arr[j].indexOf("=");
            if (k != -1)
            {
                arrayOfParam[arrayOfParamLen] = new Array(2);
                arrayOfParam[arrayOfParamLen][0] = arr[j].substr(0, k);
                arrayOfParam[arrayOfParamLen][1] = arr[j].substr(k + 1);
                arrayOfParamLen++;
            }
        }
    }
    return arrayOfParam;
}

//常用申請理由
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050308 David 1050087 二代公文修改
    //var val		= document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["txReason"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    document.all["txReason"].focus();
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
    var SAMLartStr = document.all.SsoArtifact.value;
    return SAMLartStr;
}
//1080423	Kevin_C	1080047	增加字數檢核
var bHasCheck = false;
function isMaxLength(obj,argText,argMaxNum)
{
	if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
	bHasCheck = true;
	var nMaxNum = parseInt(argMaxNum);
    if (obj.value.length == nMaxNum)
    {
		var nCode = parseInt(event.keyCode);
        if (nCode != 8 && nCode!=9 && nCode != 13 && nCode != 16 && nCode != 46 && (nCode < 33 || nCode > 40))
		{
            event.returnValue = false;
			jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
			bHasCheck = false;
			return false;
		}
    } else if (obj.value.length > nMaxNum)
    {
		event.returnValue = false;
        jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
		obj.value = obj.value.substring(0, nMaxNum);
		bHasCheck = false;
		return false;
    }
	bHasCheck = false;
	return true;
}