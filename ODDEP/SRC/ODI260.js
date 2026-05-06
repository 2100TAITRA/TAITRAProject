/*
0961229	Leslie	增加公文電子表單之簽核流程查詢
0980417 Jassie  0971121 修正於AOL開啟流程明細時，流程明細子視窗中的ODI260會偏一邊
0981203	Albert	0980336	修改不再自網址參數取得Artifact
1020320	Kevin	1020040 支援MP畫面右鍵開啟
1031112	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1050331	David	1050087	二代公文修改
//1060407	Kevin_C	1050087	修正報表無法開啟的問題
1100727	Cloud	[1100823]	odt210開啟時增加設定預設可刪序號
1100907 David   Cloud   1090859 修改支援公文會簽所屬機關流程
1130102	Cloud	Cloud	1120848	配合修正回閱不可單獨刪除
1130227 Zen     Zen     1120884 支援點擊負責人員後顯示分機、Email等細部資訊
1130827	Cloud	Cloud   1130874 修正連續撤銷會異常的問題連續異動撤銷-一併修正含分會時，序號顯示錯誤問題
*/

//1130227 Zen 1120884 支援點擊負責人員後顯示分機、Email等細部資訊
document.addEventListener("DOMContentLoaded", function ()
{
    $(".PopUpDetailInfo").click(function (e)
    {
        HandlePopUp(e);
        $('#divCover')[0].style.display = "";
    });

    $("#divCover").click(function (e)
    {
        $('#divDetailInfo')[0].style.display = "none";
        $('#divCover')[0].style.display = "none";
    });
});

function HandlePopUp(e)
{
    $('#divDetailInfo')[0].style.display = "none";
    element = e.target;

    
    let strDttailInfoArr = element.parentElement.cells[0].children[5].textContent.split('|')
    let nWisth = (strDttailInfoArr[1].length * 8 + 56) * 1.4;

    let Msg = '分機：' + strDttailInfoArr[0] + '\n信箱：' + strDttailInfoArr[1];
    if (jf_Trim(Msg) == "")
        return;

    ShowPopUp(element.ownerDocument.all["divDetailInfo"], Msg, nWisth);
    $('#divCover')[0].style.display = "";
}

function ShowPopUp(Obj, argMessage, argWidth)
{
    Obj.innerHTML = HtmlEncode(argMessage);
    Obj.style.width = argWidth + 'px';
    Obj.style.pisition = "absolute";

    var oPosition = $(element).offset();
    if ((oPosition.top + parseInt(element.offsetHeight)) > parseInt(screen.height))
        Obj.style.top = oPosition.top - (parseInt(element.offsetHeight) + 16) + "px";
    else
        Obj.style.top = oPosition.top + parseInt(element.offsetHeight) + 8 + "px";
    Obj.style.left = oPosition.left + 10 + "px";

    Obj.style.display = "";
}

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050331 David 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
document.all.btNotify.onclick = btNotify_Click;
//1100907 David   Cloud   1090859 修改支援公文會簽所屬機關流程
document.all.btOtherFlow.onclick = btOtherFlow_Click;

function ShowMsg()
{
    //1050331 David 1050087 二代公文修改
    /*if (document.all["ValidationSummary1"].innerText != "")
        alert(document.all["ValidationSummary1"].innerText);*/
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
        /*
        case "":
            break;
        */
        //1060407	Kevin_C	1050087	修正報表無法開啟的問題
        case "btPreview":
            IsServerHandling = true;
            jf_ShowWaitState();
            Page_BlockSubmit = false;
            __doPostBack("btPreview", "");
            break;
    }
}

//1050331 David 1050087 二代公文修改
//function jf_ToolBarHandle()
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

    //1050331 David 1050087 二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        //1050331 David 1050087 二代公文修改
        //case "btOpen":
        //	Page_BlockSubmit = !jf_CheckKeyObject();
        //	jf_ToolBarSubmit();			
        //	break;
        //case "btSave":
        //	if(ConfirmSave())//是否通過儲存前必要檢查
        //	{
        //		IsServerHandling = true;
        //		jf_ShowWaitState();	
        //		Page_BlockSubmit = false;
        //	}
        //	else
        //		Page_BlockSubmit = true;
        //	jf_ToolBarSubmit();	
        //	break;
        //case "btDelete":
        //	Page_BlockSubmit = !jf_ConfirmDelete();
        //	jf_ToolBarSubmit();
        //	break;
        //case "btCancel":
        //	Page_BlockSubmit = !jf_ConfirmCancel();
        //	jf_ToolBarSubmit();
        //	break;
        //case "btClean":
        //	Page_BlockSubmit = true;
        //	jf_ConfirmClean();
        //	document.all["txDocNo"].focus();
        //	break;
        //case "btSearch":
        //	//SAMPLE CODE
        //	/*
        //	var strUrl = "";
        //	xOldKey = document.all["txUserName"].value;
        //	strUrl = "SYM020C1.aspx?rtnObj=lbReturnValue&m=p&kv1="+xOldKey;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
        //	jf_OpenChildWin(strUrl, "子視窗名稱", 700, 500 );
        //	*/
        //	break;
        //case "btPrint":
        //	if(CheckBeforPrint())
        //	{
        //		if(jf_ConfirmPrint())
        //		{
        //			IsServerHandling = true;
        //			jf_ShowWaitState();	
        //			Page_BlockSubmit = false;
        //		}
        //		else
        //			Page_BlockSubmit = true;
        //	}
        //	else
        //		Page_BlockSubmit = true;
        //	jf_ToolBarSubmit();
        //	break;
        //case "btPreview":
        //	if(CheckBeforPrint())
        //	{
        //		if(jf_ConfirmPrint())
        //		{
        //			IsServerHandling = true;
        //			jf_ShowWaitState();	
        //			Page_BlockSubmit = false;
        //		}
        //		else
        //			Page_BlockSubmit = true;
        //	}
        //	else
        //		Page_BlockSubmit = true;
        //	jf_ToolBarSubmit();
        //	break;
    }
}

//###############################################################################
//							Button Click Function
//###############################################################################

//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
    {
        if (CheckBeforSave())
        {
            // 新增模式需檢查鍵值是否已存在
            if (jf_GetActionMode() == LayoutModeNew)
            {
                if (jf_CheckDataExist())//檢查鍵值是否已存在
                {
                    //所顯示訊息請各自系統自行規劃
                    //以下訊息以檔管系統範例
                    //  
                    //	if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
                    //	bRtnbool = true;
                    //
                }
                else
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
    }
    return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
    var bRtnbool = false;

    return bRtnbool;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
    var bRtnbool = false;

    return bRtnbool;
}


//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################

function CallBack(argCallerId)
{
    /*
    //將lbReturnValue的資料帶入適當的欄位
    if (argCallerId == "SYM020C1")
    {
        document.all["txUserName"].value = document.all["lbReturnValue"].options[0].value;
        document.all["txUserNameTxChange"].value = document.all["txUserName"].value;
        //回傳值為鍵值時，觸動TextChange事件
        //__doPostBack();//for .NET Framework 1.0
        __doPostBack("","");//for .NET Framework 1.1
    }
    //清空lbReturnValue物件
    if(document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;	
    */

}

function ClientOnLoad()
{
    ShowMsg();
    //1050331 David 1050087 二代公文修改
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
    //0970884 iris 取得OD_FLOW_SIZE_H及OD_FLOW_SIZE_W之值變更視窗大小

    setwin(document.all.OD_FLOW_PAGE_SIZE_W.value, document.all.OD_FLOW_PAGE_SIZE_H.value);
    //1100727	Cloud	[1100823]	odt210開啟時增加設定預設可刪序號-顯示是否可進行撤銷-s
    if (document.all["WhoCallMe"] && (document.all["WhoCallMe"].value == "ODT210" || document.all["WhoCallMe"].value == "EDT222"))
    {
        //申請作業不做預設值
        if (document.all["WhoCallMe"].value == "ODT210")
        {
            //實際刪除序
            if (parent.odt210main.document.all["txSeqNo"])
            {
                if (parent.odt210main.document.all["txSeqNo"].value == "")
                    parent.odt210main.document.all["txSeqNo"].value = document.all["txSeqNo"].value;
            }
            //顯示序
            if (parent.odt210main.document.all["txShowSeqNo"])
            {
                if (parent.odt210main.document.all["txShowSeqNo"].value == "")
                {
                    if (document.all.h_TxCanDelSeqNo.value != "0")//有可異動流程-帶入最後序
                    {
                        //1130102	Cloud	1120848	配合修正回閱不可單獨刪除
                        //parent.odt210main.document.all["txShowSeqNo"].value = document.all["dg1__ctl" + document.all["dg1"].rows.length + "_lbSeq"].innerText;
						//1130827	Cloud   1130874     修正連續撤銷會異常的問題連續異動撤銷-一併修正含分會時，序號顯示錯誤問題
                        //parent.odt210main.document.all["txShowSeqNo"].value = document.all.txSeqNo.value;
						parent.odt210main.document.all["txShowSeqNo"].value = document.all["dg1__ctl" + document.all["dg1"].rows.length + "_lbSeq"].innerText;
                    }
                    else
                        parent.odt210main.document.all["txShowSeqNo"].value = "0"
                }
            }
            //無異動流程則顯示無異動權限
            if (document.all.h_TxCanDelSeqNo.value == "0")
            {
                parent.odt210main.document.all["lbNo"].className = "";
            }
            else
                parent.odt210main.document.all["lbNo"].className = "hide";
        }
        if (parent.odt210main && parent.odt210main.document.all["h_TxCanDelSeqNo"])
            parent.odt210main.document.all["h_TxCanDelSeqNo"].value = document.all["h_TxCanDelSeqNo"].value;


    }
    //1100727	Cloud	[1100823]	odt210開啟時增加設定預設可刪序號-顯示是否可進行撤銷-e

}

function OnWSResult(argResult)
{

    //webserver回傳後動作
    //檢查回傳的webserverID
    /*//範例
    if (argResult.id == wsGetGrpNameID)
    {
    //檢查執行是否成功
    if(jf_IsWebServiceSuccess(argResult))
    {
        document.all["txGrp_Name"].value = argResult.value.RtnField0[0];
    }
    else
    {
        document.all["txGrp_Name"].value = "";
        document.all["txGrp_No"].focus();
    }
}
*/
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050331 David 1050087 二代公文修改
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}


//###############################################################################
//						Server端Register之Function
//###############################################################################

//Client端物件onblur事項檢查範例
/*//範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
    // 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
    if ( (document.activeElement.id == "btCancel") ) return;
	
    var arKeyName = new Array(1);
    var arKeyValue = new Array(1);
    var arRtnFldName = new Array(1);
    var arOrdFldName = new Array(1);

    if (!IsServerHandling)
    {
        if (document.all["txGrp_No"].value != "")
        {
            Page_BlockSubmit=true;
        	
            arKeyName[0]    = "GRP_NO";
            arKeyValue[0]   = document.all["txGrp_No"].value;
            arRtnFldName[0] = "GRP_NAME";
            arOrdFldName[0] = "GRP_NO";

            var arWSParam = new Array(5);
            arWSParam[0] = "GRP_HEADER";
            arWSParam[1] = arKeyName;
            arWSParam[2] = arKeyValue;
            arWSParam[3] = arRtnFldName;
            arWSParam[4] = arOrdFldName;
            callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
            wsGetGrpNameID = callObj.id;
            OnWSResult(callObj);
        }
    }
}
*/
/*
//檢查日期格式並Alert訊息
function txPostDate_onblur()
{
    if(!CheckDate(document.all.txPostDate,"郵寄日期"))
        FocusAt(document.all.txPostDate);
}
*/


//###############################################################################
//						private Function
//###############################################################################
//Ericks start 2005/10/14
function GetNonDelSeq()
{
    alert(document.all["NonDelSeq"].value);
}
//Ericks end 2005/10/14
function SetControlDisable(argControlName)
{
    document.all[argControlName].disabled = true;
    if (document.all[argControlName].type == "text")
        document.all[argControlName].style.backgroundColor = "LightGrey";
}

function SetControlEnable(argControlName)
{
    document.all[argControlName].disabled = false;
    if (document.all[argControlName].type == "text")
        document.all[argControlName].style.backgroundColor = "";
}

function SetControlDisplay(argControlName)
{
    document.all[argControlName].style.display = "block";
}
function SetControlHidden(argControlName)
{
    document.all[argControlName].style.display = "none";
}
function SetCombBoxDisable(argControlName)
{
    SetControlDisable(argControlName + "_Text");
    SetControlDisable(argControlName);
}

function SetCombBoxEnable(argControlName)
{
    SetControlEnable(argControlName + "_Text");
    SetControlEnable(argControlName);
}



function FocusAt(argObj)
{
    if (!argObj.disabled)
        argObj.focus();
}

//檢查日期格式,並顯示訊息
function CheckDate(argObj, argObjName)
{
    if (argObj.value != "")
    {
        jf_PADCHAR(argObj, 7, '0');
        if (!jf_CheckCDATE(argObj.value))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
            //FocusAt(argObj);
            return false;
        }
    }
    return true;
}

//比較數字大小
//如果argNum1 > argNum2則回傳true
//如果argNum1 <= argNum2則回傳true
function CompareNumber(argNum1, argNum2)
{
    if (argNum1 == Math.min(argNum1, argNum2))
        return false;
    else
        return true;
}
//去除0取得真正的數字
function StringGetInt(argNumStr)
{
    var num = argNumStr;

    if (num.length > 0)
    {
        if (argNumStr.charAt(0) == "0")
            num = argNumStr.substr(1, argNumStr.length - 1);
        if (num.charAt(0) == "0")
            num = StringGetInt(num)
    }
    return num;
}

//透過Value值選取DropDownList中的Item
function SetDDlSelectByValue(argSelectId, argSelectValue)
{
    if (argSelectValue == "")
        return;
    for (var i = 0; i < document.all[argSelectId].length; i++)
    {
        //有可能Value的形式為 v1,v2,v3
        if (GetValueFromValueArray(document.all[argSelectId].options[i].value) == argSelectValue)
        {
            document.all[argSelectId].selectedIndex = i;
            break;
        }
    }
}

//會取得 "t1,t2,t3"結構中的第argIndex個值
function GetValueFromValueArray(argValueArray, argIndex)
{
    var RtnValueArray = argValueArray.split(",");
    return RtnValueArray[argIndex];
}

//透過Text值選取DropDownList中的Item
function SetDDlSelectByText(argSelectId, argSelectText)
{
    if (argSelectValue == "")
        return;
    for (var i = 0; i < document.all[argSelectId].length; i++)
    {
        if (document.all[argSelectId].options[i].Text == argSelectText)
        {
            document.all[argSelectId].selectedIndex = i;
            break;
        }
    }
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName, argFieldName)
{
    if (document.all[argObjName].value == "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName + "不可為空白"])), "");
        FocusAt(document.all[argObjName]);
        return false;
    }
    return true;
}

//取得在Datagrid中動作時之Control Row index
function getRowIndex()
{
    //return intRowIndex = event.srcElement.parentElement.rowIndex;   
    var xObjectName = event.srcElement.id;
    return xObjectName.substring(8, xObjectName.indexOf("_", 8));
}

//依照ID取得Toolbar物件
//用法：
//var TxDocNoObj =  getToolBarItemObjById("btOpen");
//TxDocNoObj.setAttribute("Text","TTT");
function getToolBarItemObjById(argId)
{
    for (var i = 0; i < document.all.tbTool.numItems; i++)
    {
        if (document.all.tbTool.getItem(i).getAttribute("ID") == argId)
            return document.all.tbTool.getItem(i);
    }
}

function handlePrompt()
{
    var RtnMsg = window.prompt("請輸入公文文號", "");
    if (RtnMsg == "" || RtnMsg == null)//若取消或不輸入值,則關閉視窗
    {
        //1050331 David 1050087 二代公文修改
        //window.close();
        jf_CloseSelf();
    }
    else
    {
        document.all.h_TxDocNo.value = RtnMsg;
        //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
        IsServerHandling = true;
        __doPostBack("", "");
    }
}

function btNotify_Click()
{
    var strDocNo = "";
    if (document.all["txDocNo"] != null)
        strDocNo = document.all["txDocNo"].value;
    else
    {
        strDocNo = location.href.substr(location.href.indexOf("pDocNo=") + 7, 10);	//由網址列取得公文文號

        //1020320 Kevin 1020040 支援MP畫面右鍵開啟
        if (strDocNo == null || strDocNo == "")
            strDocNo = location.href.substr(location.href.indexOf("argDocNo=") + 9, 10);
    }
    var strSourceOrgno = document.all.H_txOrgNo.value;
    //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
    var strArtifact = fnGetArtifact();
    var strUrl = "../../ED/ED2/EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
    jf_OpenChildWin(strUrl, "EDI200", 700, 500);
}
//1100907   Cloud   1090859 修改支援公文會簽所屬機關流程-S
function btOtherFlow_Click()
{
    var strDocNo = "";
    if (document.all["txDocNo"] != null)
        strDocNo = document.all["txDocNo"].value;
    else
    {
        strDocNo = location.href.substr(location.href.indexOf("pDocNo=") + 7, 10);	//由網址列取得公文文號
    }

    var strArtifact = fnGetArtifact();
    var strUrl = "../../ED/ED2/EDI262.aspx?SOURCE_ORGNO=" + document.all["OthetOrgNo"].value + "&pDocNo=" + document.all["OthetOrgDocNo"].value + "&MainDocNo=" + strDocNo + "&SAMLart=" + strArtifact;
    jf_OpenChildWin(strUrl, "EDI262", 700, 500);
}
//1100907   Cloud   1090859 修改支援公文會簽所屬機關流程-E

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
//0970884 IRIS
//視窗縮放控制函數
function setwin(width, height)
{
    if (width != "" && height != "")
    {
        //0980417 Jassie  0971121 若由AOL開啟維持原行為，不依照環境變數設定值調整流程明細視窗大小
        if (opener == null)
            return;
        //0971121 jassie end
        if (width > screen.width || height > screen.height)
        {
            resizeTo(screen.width, screen.height);
            moveTo(0, 0);
        }
        else
        {
            resizeTo(width, height);
            //視窗置中
            var winl = (screen.width - width) / 2;
            var wint = (screen.height - height) / 2;
            if (winl < 0) winl = 0;
            if (wint < 0) wint = 0;

            moveTo(winl, wint);

        }
    }
}