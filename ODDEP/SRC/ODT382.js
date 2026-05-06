/*
DATE	SA 		PRG		MGR_NO			DESC
0970708--		Iris    0970520         修改若未有彙整之日期,提供輸入欄位
0991223	Yvonne	Jeffrey	0991015			調整彙整時判斷是否有資料的效能
1021204 Kevin	Erin	1020978			新增跳至功能
1050830 David	Zen     1050087         二代公文修改
1050087 Leslie	Zen		1050087 		修正client button 無法postback之錯誤
1060518 Leslie  Zen     1060215         innerText相關修改1100201	Leslie	Joe		1090927			取消使用document.activeElement1110103 Kevin   Zen     1101292         修正多次點擊重複PostBack之問題
1140718	Joe		Daniel	1140382			新增受文者查詢功能
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050830 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050830 Zen 1050087 二代公文修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題    if (IsServerHandling)    {        Page_BlockSubmit = true;        return;    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    switch (xObjectName)
    {
        case "btFirst":
        case "btPrev":
        case "btNext":
        case "btLast":
            if (ConfirmSave())//是否通過儲存前必要檢查
			//1051102 Zen 1050087 修正client button 無法postback之錯誤
			{
                Page_BlockSubmit = false;
				__doPostBack(xObjectName, event.flatIndex);
			}
            else
                Page_BlockSubmit = true;
            break;
            //1021204 Erin [1020978] 新增跳至功能
        case "btToSeq":
            if (ConfirmSave() && txSeqOnblur())
			//1051102 Zen 1050087 修正client button 無法postback之錯誤
			{
                Page_BlockSubmit = false;
				__doPostBack(xObjectName, event.flatIndex);
			}
            else
                Page_BlockSubmit = true;
            break;
        //1140718	Daniel	1140382			新增受文者查詢功能
        case "btToOrgName":
            Page_BlockSubmit = true;
            var strUrl = "";
            strUrl = `ODT382C1.aspx?Date=${document.all.txDate.value}&Time=${document.all.txETime.value}`;
            jf_OpenChildWin(strUrl, "ODT382C1", 700, 500);
            break;
    }
}

//1050830 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題    if (IsServerHandling)    {        Page_BlockSubmit = true;        return;    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050830 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !CheckDate();
            //1050830 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btOrder":
            if (fnCheckStartDate())
            {
                Page_BlockSubmit = !CheckDate();
                //1050830 Zen 1050087 二代公文修改
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
            {
                Page_BlockSubmit = true;
                //1050830 Zen 1050087 二代公文修改
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btSave":
            if (ConfirmSave())//是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050830 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050830 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050830 Zen 1050087 二代公文修改
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
    //1050830 Zen 1050087 二代公文修改
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    //jf_CallWS("lib/OD_LIB.asmx", "GetPostCost", false, null);
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	//1100201	Joe		1090927		參照單號1020028，OD_LIB.js已移除電子磅秤相關處裡
    //odjf_InitPostMachine();
    //95.07.28 David 修正於開啟彙整資料時，直接Focus於DataGrid金額欄位的需求
    if (document.all["dg1"] != null)
        FocusAt(document.all["dg1__ctl2_txCost"]);
}

function OnWSResult(argResult)
{
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
    if (!CheckEmpty())
        return false;
    if (!CheckPostCost())
        return false;
    return true;
}

//不可空白檢查
function CheckEmpty()
{
    var strErrMsg = "";

    //Zoey [000604, 96/04/12]中企不檢查地址
    if (document.all.h_OrgNo.value != "313050000G")
    {
        if (document.all["txAddr"].value == "")
        {
            strErrMsg = "住址不可空白\n" + strErrMsg;
            //1050830 Zen 1050087 二代公文修改
            //document.all["txAddr"].focus();
            $('#txAddr').focus();
        }
        if (document.all["txPostNo"].value == "")
        {
            strErrMsg = "郵遞區號不可空白\n" + strErrMsg;
            //1050830 Zen 1050087 二代公文修改
            //document.all["txPostNo"].focus();
            $('#txPostNo').focus();
        }
    }
    if (strErrMsg != "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        return false;
    }
    return true;
}

//郵資金額檢查
function CheckPostCost()
{
    var InValidName = "";
    var InValidControlName = "";
    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        var objCost = document.all["dg1__ctl" + i + "_txCost"];
        if (objCost.value != "")
        {
            var str = objCost.value;
            var num = parseFloat(str);
            if (num != str)
            {
                InValidName += ",郵資金額必須為數字。";
                InValidControlName = "dg1__ctl" + i + "_txCost";
            }
            else if (num <= 0)
            {
                InValidName += ",郵資金額必須大於零。";
                InValidControlName = "dg1__ctl" + i + "_txCost";
            }
            else if (num >= 100000)
            {
                InValidName += ",郵資金額必須小於100000。";
                InValidControlName = "dg1__ctl" + i + "_txCost";
            }
        }
        else
        {
            InValidName += ",郵資金額不可為空白。";
            InValidControlName = "dg1__ctl" + i + "_txCost";
        }

        if (InValidName != "")
        {
            InValidName = InValidName.substr(1, InValidName.length);
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([InValidName])), "");
            FocusAt(document.all[InValidControlName]);
            return false;
        }
    }
    return true;
}

//Client端物件OnExit事項檢查範例
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

function CheckDate()
{
    var bRtn = true;
    if (document.all["txDate"].value == "")
    {
        bRtn = false;
        //1050830 Zen 1050087 二代公文修改
        //document.all["txDate"].focus();
        $('#txDate').focus();
        jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["郵寄日期"])), "");
    }
    else//0991223 Jeffrey 判斷[啟始彙整日期]不可大於[郵寄日期]
    {
        var DateStart = document.all["txLatestcom"].value;
        var DateEnd = document.all["txDate"].value;
        if (DateStart > DateEnd)
        {
            alert("[啟始彙整日期]必須小於或等於[郵寄日期]。");
            bRtn = false;
        }
    }
    return bRtn;
}


/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
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
            //1050830 Zen 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
        }
    }
}

function FocusAt(argObj)
{
    if (!argObj.disabled)
        //1050830 Zen 1050087 二代公文修改
        //argObj.focus();
        $('#' + argObj.id).focus();
}

function fnGetPostCost()
{
    //取得DataGrid中作用之物件
    var RowNum = getRowIndex();
    //1060518 Zen 1060215 innerText相關修正    //var PostNO = document.all["dg1__ctl" + RowNum + "_lbPostNo"].innerText;
    var PostNO = document.all["dg1__ctl" + RowNum + "_lbPostNo"].textContent;
    var Weight = document.all["dg1__ctl" + RowNum + "_txWeight"].value;
    var arWSParam = new Array(2);
    arWSParam[0] = PostNO;
    arWSParam[1] = Weight;

    if (PostNO == null || PostNO == "")
    {
        return;
    }

    callObj = jf_CallWS("lib/OD_LIB.asmx", "GetPostCost", false, arWSParam);
    if (!callObj.error)
    {
        var cost = callObj.value.RtnStr;
        if (cost != null && cost != "")
            document.all["dg1__ctl" + RowNum + "_txCost"].value = cost;
    }
}

//取得在Datagrid中動作時之Control Row index
function getRowIndex()
{
    //return intRowIndex = event.srcElement.parentElement.rowIndex;   
    var xObjectName = event.srcElement.id;
    return xObjectName.substring(8, xObjectName.indexOf("_", 8));
}

function dlTime_onchange()
{
    var index = document.all["dlTime"].selectedIndex;
    var obj = document.all["dlTime"].options[index];

    if (obj.value == "")
    {
        document.all["txSTime"].value = "";
        document.all["txETime"].value = "";
    }
    else
    {
        var argValue = obj.value.split(":");
        document.all["txSTime"].value = argValue[0];
        document.all["txETime"].value = argValue[1];
    }
}

//1100201	Joe		1090927		參照單號1020028，OD_LIB.js已移除電子磅秤相關處裡--S
/*
function fnSetPostCost(argCost)
{
    if (document.activeElement != null)
    {
        var id = document.activeElement.id;
        if (id.indexOf("txCost") != -1)
        {
            document.all[id].value = argCost;
            var num = id.replace("dg1__ctl", "");
            num = num.replace("_txCost", "");
            var RowNum = num;
            //1060518 Zen 1060215 innerText相關修正            //var PostNO = document.all["dg1__ctl" + RowNum + "_lbPostNo"].innerText;
            var PostNO = document.all["dg1__ctl" + RowNum + "_lbPostNo"].textContent;
            var Cost = argCost;
            var arWSParam = new Array(2);
            arWSParam[0] = PostNO;
            arWSParam[1] = Cost;

            if (PostNO == null || PostNO == "")
            {
                return;
            }
            callObj = jf_CallWS("lib/OD_LIB.asmx", "GetPostWeight", false, arWSParam);
            if (!callObj.error)
            {
                if (callObj.value.ErrorClass.IsErr)
                {
                    alert(callObj.value.ErrorClass.ErrMessage[0].text);
                    return;
                }
                var weight = callObj.value.RtnStr;
                if (weight != null && weight != "")
                    document.all["dg1__ctl" + RowNum + "_txWeight"].value = weight;
            }
        }
    }
}
*/
//1100201	Joe		1090927		參照單號1020028，OD_LIB.js已移除電子磅秤相關處裡--E

function jf_ProcGetData(argbtGetId, argtxWeightId)
{
    Page_BlockSubmit = true;
    document.all[argtxWeightId].value = fnGetData();
}
//iris 0970520
//修改若未有彙整之日期,提供輸入欄位
function fnCheckStartDate()
{
    if (document.all["txLatestcom"])
    {
        var latestdate = document.all["txLatestcom"].value;
        if (latestdate == "")
        {
            alert("請於最近彙整日期欄位輸入彙整起始日期");
            //1050830 Zen 1050087 二代公文修改
            //document.all["txLatestcom"].focus();
            $('#txLatestcom').focus();
            return false;
        }
        else if (!jf_CheckCDATE(latestdate))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["彙整起始日期"])), "");
            //1050830 Zen 1050087 二代公文修改
            //document.all["txLatestcom"].focus();
            $('#txLatestcom').focus();
            return false;
        }
        else
        {
            return true;
        }
    }
    else
    {
        return true;
    }

}

//1021204 Erin [1020978] 跳至功能 txSeq onblur
function txSeqOnblur()
{
    var strSeq = document.all["txSeq"].value;
    //1060518 Zen 1060215 innerText相關修正    //var strTotal = document.all["lbTotal"].innerText;
    var strTotal = document.all["lbTotal"].textContent;
    if (strSeq != "" && strTotal != "")
    {
        var iSeq = parseInt(strSeq);
        var iTotal = parseInt(strTotal);
        if (iSeq > iTotal || iSeq < 1)
        {
            alert("請輸入位於1~" + strTotal + "間的序號！");
            document.all["txSeq"].value = "";
            //1050830 Zen 1050087 二代公文修改
            //document.all["txSeq"].focus();
            $('#txSeq').focus();
            return false;
        }
    }
    return true;
}
//1140718	Daniel	1140382			新增受文者查詢功能
function CallBack(argCallerId) {

    if (argCallerId == "ODT382C1") {
        document.all["txSeq"].value = jf_Trim(document.all.lbReturnValue.options[0].value);

        if (document.all["txSeq"].value != "") {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();

        }
        __doPostBack("btToSeq");
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}