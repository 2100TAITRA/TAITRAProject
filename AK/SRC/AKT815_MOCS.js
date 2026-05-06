/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2022.12.20	Cloud	序58 	修改預設勾選
 * 2024.01.17   Cloud   1130015 修改個人檔支援單項歸還-增加回傳流水序號
 * 2024.11.15	Cloud   1131024 依「加入方式」不同-判定選項是否勾選
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

jf_ShowValidator();
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}



function ClientButtonControl(e)
{
	
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	switch (xObjectName)
	{
	    case "btCleanDg"://清除
	    case "btCleanDg1"://清除
		    Page_BlockSubmit = true;
		    if (document.all["rbOrg"].checked) {
		        if (document.all["dg1"] != null) {
		            for (var iRow = 1; iRow < document.all["dg1"].rows.length; iRow++) {
		                if (document.all["dg1__ctl" + iRow + "_cbSelect"].checked == true)
		                    document.all["dg1__ctl" + iRow + "_cbSelect"].checked = false;
		            }
		        }
		    }
		    else {
		        if (document.all["dg2"] != null) {
		            for (var iRow = 1; iRow < document.all["dg2"].rows.length; iRow++) {
		                if (document.all["dg2__ctl" + iRow + "_cbSelect"].checked == true)
		                    document.all["dg2__ctl" + iRow + "_cbSelect"].checked = false;
		            }
		        }

		    }
			break;
	    case "btAll"://全選
	    case "btAll1"://全選
		    Page_BlockSubmit = true;
		    if (document.all["rbOrg"].checked) {
		        if (document.all["dg1"] != null) {
		            for (var iRow = 1; iRow < document.all["dg1"].rows.length ; iRow++) {
		                if (document.all["dg1__ctl" + iRow + "_cbSelect"].checked == false)
		                    document.all["dg1__ctl" + iRow + "_cbSelect"].checked = true;
		            }
		        }
		    }
		    else {
		        if (document.all["dg2"] != null) {
		            for (var iRow = 1; iRow < document.all["dg2"].rows.length ; iRow++) {
		                if (document.all["dg2__ctl" + iRow + "_cbSelect"].checked == false)
		                    document.all["dg2__ctl" + iRow + "_cbSelect"].checked = true;
		            }
		        }
		    }
			break;
	    case "btChange"://反向
	    case "btChange1"://反向
		    Page_BlockSubmit = true;
		    if (document.all["rbOrg"].checked) {
		        if (document.all["dg1"] != null) {
		            for (var iRow = 1; iRow < document.all["dg1"].rows.length; iRow++) {
		                if (document.all["dg1__ctl" + iRow + "_cbSelect"].checked)
		                    document.all["dg1__ctl" + iRow + "_cbSelect"].checked = false;
		                else
		                    document.all["dg1__ctl" + iRow + "_cbSelect"].checked = true;
		            }
		        }
		    }
		    else
		    {
		        if (document.all["dg2"] != null) {
		            for (var iRow = 1; iRow < document.all["dg2"].rows.length; iRow++) {
		                if (document.all["dg2__ctl" + iRow + "_cbSelect"].checked)
		                    document.all["dg2__ctl" + iRow + "_cbSelect"].checked = false;
		                else
		                    document.all["dg2__ctl" + iRow + "_cbSelect"].checked = true;
		            }
		        }

		    }
			break;
		case "btConfirm"://確定
		    Page_BlockSubmit = true;
		    if (document.all["rbOrg"].checked) {
		        if (document.all["txDocNo"].value == "") {
		            $('#txDocNo').focus();
		            jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["公文文號"])), "");
		        }
		        else {
		            DocNo_Onblur(); //改成DocNo_Onblur統一處理 #2007.04.02 Andy
		        }
		    }
		    else {
		        if (document.all["txPerID"].value == "") {
		            $('#txPerID').focus();
		            jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["身分證號"])), "");
		        }
		        else {
		            txPerID_Onblur(); //改成DocNo_Onblur統一處理 #2007.04.02 Andy
		        }
		    }
			break;
		case "btQuit"://取消
			Page_BlockSubmit = true;
			var strSysDate = document.all["H_Date"].value;
			document.all["rbRet"].checked = true;
			rb_OnClick("rbRet");
			document.all["txDocNo"].value= "";
			document.all["txDate"].value = strSysDate;
			break;
		//若focus在文號欄位按下toolbar會導致xObjectName=txDocNo
		case "txDocNo":
			Page_BlockSubmit = true;
			break;
		    //1120215  CLOUD 銓敘部序31 增加查詢功能-S
	    case "btSearch":
	        Page_BlockSubmit = true;
	        if (document.all["H_Dept_Value"].value == "" || document.all["H_User_Value"].value == "")
	        { alert("調案單位、人員不可為空白。"); return; }
	        //查詢前檢查是否已有資料，有則提醒
	        var strBorFlag = "0";
	        var strBodydg = "dg1";
	        if (document.all["rbPer"].checked) {
	            strBorFlag = "1";
	            strBodydg = "dg2";
	        }
	        if (document.all[strBodydg].childNodes[1].childNodes.length > 2) {
	            if (!window.confirm("已有查詢資訊，是否確定清空並重新查詢?"))
	                return;
                else
	            {
	                for (var i = document.all[strBodydg].childNodes[1].childNodes.length-1 ; i > 1; --i)
	                {
	                    //document.all[strBodydg + "Data" + i.toString()].remove();
	                    document.all[strBodydg].childNodes[1].childNodes[i].remove();
	                }
	            }
	        }
	            
	        var rtn = AK.AKT815_MOCS.GetBorinfo(document.all["nSourceOrgno"].value, "", "", document.all["H_Dept_Value"].value, document.all["H_Sect_Value"].value, document.all["H_User_Value"].value, strBorFlag).value;
	        if (rtn.strErrMsg != "")
	        { alert(rtn.strErrMsg); }
	        else
	        {
	            if (document.all["rbPer"].checked) {
	                for (var i = 0; i < rtn.Info.length; i++) {
						//1130118	Cloud	1130015	配合支援個人檔可單項歸還，調整是否存在以單號+序號
	                    //if (!CheckExist(rtn.Info[i].BorNo, "dg2"))
						if (!CheckExist(rtn.Info[i].BorNo, "dg2", rtn.Info[i].strSeq))
	                        fnAddDgRow(rtn.Info[i], "dg2");
	                }
	            }
	            else {
	                for (var i = 0; i < rtn.Info.length; i++) {
						//1130118	Cloud	1130015	配合支援個人檔可單項歸還，調整是否存在以單號+序號
	                    //if (!CheckExist(rtn.Info[i].BorNo, "dg1"))
						if (!CheckExist(rtn.Info[i].BorNo, "dg1", rtn.Info[i].strSeq))
	                        fnAddDgRow(rtn.Info[i], "dg1");
	                }
	            }
	            
	        }
	        break;
	        //1120215  CLOUD 銓敘部序31 增加查詢功能-E
	}	
}
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	xObjectName = event.target.id
	bUserExit = false;
	
	switch (xObjectName)
	{
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			var strSysDate = document.all["H_Date"].value;
			jf_ConfirmClean();
			document.all["rbRet"].checked = true;
			document.all["rbOrg"].checked = true;
			rb_OnClick("rbRet");
			document.all["txDate"].value = strSysDate;
			$('#txDocNo').focus();
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	if (document.all["H_Save"].value != "")
	{
		document.all["rbRet"].checked= true;
		document.all["H_Save"].value = ""
		alert('歸還完畢。');
	}
	
	if (document.all["rbRet"].checked)
		rb_OnClick("rbRet");
	else
	    rb_OnClick("rbBor");
	showInputItem();
	showAddMode();
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050624	Kenny	[1050087]   二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//############################################################################################
//								ButtonClick		function
//############################################################################################
//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if (document.all["rbOrg"].checked) {
	    if (document.all["dg1"] == null) {
	        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少要有一筆資料"])), "");
	        return bRtnbool;
	    }

	    for (var iRow = 1; iRow < document.all["dg1"].rows.length ; iRow++) {
	        if (document.all["dg1__ctl" + iRow + "_cbSelect"].checked == true) {
	            bRtnbool = true;
	            break;
	        }
	    }
	}
	else {
	    if (document.all["dg2"] == null) {
	        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少要有一筆資料"])), "");
	        return bRtnbool;
	    }

	    for (var iRow = 1; iRow < document.all["dg2"].rows.length; iRow++) {
	        if (document.all["dg2__ctl" + iRow + "_cbSelect"].checked == true) {
	            bRtnbool = true;
	            break;
	        }
	    }
	}
	if (bRtnbool) {
	    if (document.all["rbOrg"].checked)
	        SaveHiddenValue("dg1");
	    else
	        SaveHiddenValue("dg2");
	}
	else {
	    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少要勾選一筆資料"])), "");
	}
	return bRtnbool;
}

//同步化處理
function SaveHiddenValue(argID)
{
    var str1 = ":";
    var str2 = "|";
    var strBuffer = "";
    var strValue = "";
    var strBorNo;
	var strDesc;
	//* 2024.01.17   Cloud   1130015 修改個人檔支援單項歸還-增加回傳序號
	var strSeq;
	for (var iRow = 1; iRow < document.all[argID].rows.length; iRow++) {
		//* 2024.01.17   Cloud   1130015 修改個人檔支援單項歸還-判斷狀態為隱藏的資料不做回傳
        //if (document.all[argID + "__ctl" + iRow + "_cbSelect"].checked == true) {
		if (document.all[argID + "__ctl" + iRow + "_cbSelect"].className!="hide" &&  document.all[argID + "__ctl" + iRow + "_cbSelect"].checked == true) {
            strBorNo = document.all[argID+"__ctl" + iRow + "_lbBorNo"].textContent;
            strDesc = document.all[argID+"__ctl" + iRow + "_lbBorDesc"].textContent;
            //* 2024.01.17   Cloud   1130015 修改個人檔支援單項歸還-增加回傳序號
            //strValue += strBuffer + strBorNo + str1 + strDesc ;
			strSeq = document.all[argID + "__ctl" + iRow + "_lbSeq"].textContent;
			strValue += strBuffer + strBorNo + str1 + strDesc + str1 + strSeq;
            strBuffer = str2;
        }
    }
    document.all["H_Value"].value = strValue;
}

//############################################################################################
//								Event		function
//############################################################################################



function CheckType()
{
	var bRtn = false;
	var strErrMsg = "";
	var strDate = document.all["txDate"].value;
	
	if (document.all["rbRet"].checked)
	{
		//若為空白則帶入系統日
		if (strDate == "")
			document.all["txDate"].value = document.all["H_Date"].value;
			
		if(document.all["dlKeepNo"].selectedIndex == "0")
		{
			strErrMsg += "保存狀況";
			$('#dlKeepNo').focus();
		}
			
		if(strErrMsg != "")
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array([strErrMsg])),"");
			bRtn = false;
		}
		else
			bRtn = true;
	}
	else if (document.all["rbBor"].checked)
	{
		//若為空白則帶入系統日
		if (strDate == "")
			document.all["txDate"].value = document.all["H_Date"].value;
			
		if (document.all["dlReason"].selectedIndex == 0)
		{
			strErrMsg += "展期原因";
			$('#dlReason').focus();
		}
		
		if(document.all["txDesc"].value == "")
		{
			if(strErrMsg != "")
				strErrMsg += "、";
			strErrMsg += "原因說明";
			$('#txDesc').focus();
		}
		
		if(strErrMsg != "")
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array([strErrMsg])),"");
			bRtn = false;
		}
		else
			bRtn = true;
	}
	return bRtn;
}

//檢查公文文號是否已存在於dg1中
function CheckDocNoExist(argDocNo)
{
	if (document.all["dg1"] == null)
		return false;
	if (document.all["dg1"].rows.length == 1)
		return false;
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl" + iRow + "_hlDocNo"].textContent == argDocNo)
			return true;
	}
	return false;
}

//取出DropDownList的index
function GetIndex(argValue)
{
	for (var iItem=0;iItem<document.all["dlReason"].options.length;iItem++)
	{
		if (document.all["dlReason"].options[iItem].text == argValue)
			return iItem;
	}
	return 0;
}

function rb_OnClick(srcElementID)
{
	//歸還
	if (srcElementID == "rbRet")
	{
		document.all["lbDate"].textContent = "歸還日期：";
		document.all["lbReason"].className = "hide";
		document.all["dlReason"].className = "hide";
		document.all["lbDesc"].className = "hide";
		document.all["txDesc"].className = "hide";
		document.all["dlReason"].value = "";
		document.all["txDesc"].value = "";
		//David 95.09.14
		document.all["dlKeepNo"].className = "";
		document.all["Label3"].className = "";		
	}
	//展期
	else if (srcElementID == "rbBor")
	{
		document.all["lbDate"].textContent = "展期日期：";
		document.all["lbReason"].className = "";
		document.all["dlReason"].className = "";
		document.all["lbDesc"].className = "";
		document.all["txDesc"].className = "";
		//David 95.09.14
		document.all["dlKeepNo"].className = "hide";
		document.all["Label3"].className = "hide";		
	}
}

//############################################################################################
//					其		他		共		用		function
//############################################################################################
//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			$('#'+argObj).focus();
		}
	}
}

//取出字串中所有的數字
function fnGetNumber(argStr)
{ 
	var StrLen    = argStr.length;
	var NumStr   = "";
	var returnStr = "";

	for (i = 0; i < StrLen ; i++) 
	{ 
		NumStr = argStr.substring(i,i+1);
		if (fnIsNum(NumStr))
			returnStr = returnStr + NumStr;
	}
	return  returnStr;
}

function fnIsNum(s)
{
	switch (s)
	{
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			return true;
			break;
	}
	return false;	
}

//日期格式轉換
function GetFormat(argDate)
{
	if (argDate.length == 7)
		return argDate.substring(0,3) + "/" + argDate.substring(3,5) + "/" + argDate.substring(5,7);
	return argDate;
}

//David 95.09.14 
function GetKeepState()
{
	var rtnValue = "";
	var SelectIndex = document.all["dlKeepNo"].selectedIndex;
	var SelectValue = document.all["dlKeepNo"].options[SelectIndex].textContent;
	return SelectValue;
}

function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}
function showInputItem()
{
    if (document.all["rbOrg"].checked)
    {
        document.all["lbDocNo"].className = "";
        document.all["lbPerID"].className = "hide";
        document.all["txDocNo"].className = "";
        document.all["txPerID"].className = "hide";
        document.all["PerDiv"].className = "hide";
        document.all["OrgDiv"].className = "DivTable";
    }
    else
    {
        document.all["lbPerID"].className = "";
        document.all["txPerID"].className = "";
        document.all["txDocNo"].className = "hide";
        document.all["lbDocNo"].className = "hide";
        document.all["OrgDiv"].className = "hide";
        document.all["PerDiv"].className = "DivTable";
    }
}
function DocNo_Onblur() {
    if (document.all["txDocNo"].value == "")
        return;
    if (document.all["txDate"].value == "")
    { alert('歸還日期不可為空。'); return; }
    //1120215  CLOUD 銓敘部序31 增加查詢功能
    //var rtn = AK.AKT815_MOCS.GetBorinfo(document.all["nSourceOrgno"].value, document.all["txDocNo"].value, "").value;
	//* 2024.01.17   Cloud   1130015 修改個人檔支援單項歸還 - 增加回傳流水序號-增加傳入借調類型
    //var rtn = AK.AKT815_MOCS.GetBorinfo(document.all["nSourceOrgno"].value, document.all["txDocNo"].value, "", "", "", "", "").value;
	var rtn = AK.AKT815_MOCS.GetBorinfo(document.all["nSourceOrgno"].value, document.all["txDocNo"].value, "", "", "", "", "0").value;
    if (rtn.strErrMsg != "")
    { alert(rtn.strErrMsg); }
    else
    {
        for (var i = 0; i < rtn.Info.length; i++) {
			//1130118	Cloud	1130015	配合支援個人檔可單項歸還，調整是否存在以單號+序號
            //if (!CheckExist(rtn.Info[i].BorNo, "dg1"))
			if (!CheckExist(rtn.Info[i].BorNo, "dg1", rtn.Info[i].strSeq))
                fnAddDgRow(rtn.Info[i], "dg1");
        }
        document.all["txDocNo"].value = "";
    }
	//補回到輸入欄位
	document.all["txDocNo"].focus();
}
//檢查單號是否已存在於dg1中
//1130118	Cloud	1130015	配合支援個人檔可單項歸還，調整是否存在以單號+序號
//function CheckExist(argBorNo,argID) {
function CheckExist(argBorNo,argID,argSeq) {
    if (document.all[argID] == null)
        return false;
    if (document.all[argID].rows.length == 1)
        return false;
	for (var iRow = 1; iRow < document.all[argID].rows.length; iRow++) {
		//1130118	Cloud	1130015	配合支援個人檔可單項歸還，調整是否存在以單號+序號
        //if (document.all[argID + "__ctl" + iRow + "_lbBorNo"].textContent == argBorNo)
		if (document.all[argID + "__ctl" + iRow + "_lbBorNo"].textContent == argBorNo && document.all[argID + "__ctl" + iRow + "_lbSeq"].textContent == argSeq)
            return true;
    }
    return false;
}
function txPerID_Onblur() {
    if (document.all["txPerID"].value == "")
        return;
    if (document.all["txDate"].value == "")
    { alert('歸還日期不可為空。'); return; }
    //1120215  CLOUD 銓敘部序31 增加查詢功能
    //var rtn = AK.AKT815_MOCS.GetBorinfo(document.all["nSourceOrgno"].value, "", document.all["txPerID"].value).value;
	//* 2024.01.17   Cloud   1130015 修改個人檔支援單項歸還 - 增加回傳流水序號-增加傳入借調類型
    //var rtn = AK.AKT815_MOCS.GetBorinfo(document.all["nSourceOrgno"].value, "", document.all["txPerID"].value, "", "", "", "").value;
	var rtn = AK.AKT815_MOCS.GetBorinfo(document.all["nSourceOrgno"].value, "", document.all["txPerID"].value, "", "", "", "1").value;
    if (rtn.strErrMsg != "")
    { alert(rtn.strErrMsg); }
    else
    {
        for (var i = 0; i < rtn.Info.length; i++) {
			//1130118	Cloud	1130015	配合個人檔支援單項歸還
            //if (!CheckExist(rtn.Info[i].BorNo, "dg2"))
			if (!CheckExist(rtn.Info[i].BorNo, "dg2", rtn.Info[i].strSeq))
                fnAddDgRow(rtn.Info[i], "dg2");
        }
        document.all["txPerID"].value = "";
    }
	//補回到輸入欄位
	document.all["txPerID"].focus();
}
function fnAddDgRow(argObj,arfDGid,argDesc) {
    var rowCnt = document.all[arfDGid].rows.length;
    //設定row的背景色
    //create row
    var row = document.createElement("TR");
    row.id = arfDGid+"Data" + rowCnt.toString();
    //create column
    //序
    var colSeq = document.createElement("TD");
    colSeq.setAttribute("align", "middle");
    colSeq.setAttribute("nowrap", "nowrap");
    colSeq.style.width = "1.5em";
	colSeq.className = "InputFieldLabel";
	
    colSeq.innerText = rowCnt;
    //選
    var cselect = document.createElement("TD");
    cselect.setAttribute("align", "middle");
    cselect.setAttribute("nowrap", "nowrap");
    //* 2024.01.17   Cloud   1130015 修改個人檔支援單項歸還-配合調大
    if (argObj.borFlag == "0")
        cselect.style.width = "1.5em";
    else
        cselect.style.width = "3.5em";

    var cspelect = document.createElement("INPUT");
    cspelect.id = arfDGid+"__ctl" + htmlencode((document.all[arfDGid].rows.length).toString()) + "_cbSelect";
    cspelect.setAttribute("type", "checkbox");
	//* 2022.12.20	Cloud	序58 	修改預設勾選
	//1131115	Cloud 1131024 依不同加入方式，判斷是否勾選
	if(!document.all["rbSearch"].checked)
		cspelect.setAttribute("checked", "true");
	//* 2024.01.17   Cloud   1130015 修改個人檔支援單項歸還 - 如為已歸還，不顯示選項
	if (argObj.bRet == "1")
		cspelect.className = "hide";
	cselect.appendChild(cspelect);
	//* 2024.01.17   Cloud   1130015 修改個人檔支援單項歸還 - 如為已歸還，顯示已歸還-S
	if (argObj.bRet == "1") {
		var csShow = document.createElement("SPAN");
		csShow.id = arfDGid + "__ctl" + htmlencode((document.all[arfDGid].rows.length).toString()) + "_cbShow";
		csShow.textContent = "已歸還";
		csShow.className = "InputFieldLabel";
		cselect.appendChild(csShow);
	}
	//* 2024.01.17   Cloud   1130015 修改個人檔支援單項歸還 - 如為已歸還，顯示已歸還-E

    //文冊號
    var cFromSubject = document.createElement("TD");
    cFromSubject.setAttribute("align", "middle");
    cFromSubject.setAttribute("nowrap", "nowrap");
    cFromSubject.style.width = "15em";
    if (argObj.BookMark.length > 25)
        cFromSubject.style.height = "5em";

    //
    var spanFromSubject = document.createElement("textarea");
    spanFromSubject.id = arfDGid + "__ctl" + htmlencode((document.all[arfDGid].rows.length).toString()) + "_hlDocNo";
    spanFromSubject.value = htmlencode(argObj.BookMark);
    spanFromSubject.style.height = "inherit";
    spanFromSubject.style.width = "95%";
    spanFromSubject.className = "PopUp";
    cFromSubject.appendChild(spanFromSubject);

    //身分證號
    if (argObj.borFlag == "1")
    {
        var colid = document.createElement("TD");
        colid.setAttribute("align", "middle");
        colid.setAttribute("nowrap", "nowrap");
        colid.style.width = "8.5em";
        var cspanid = document.createElement("SPAN");
        cspanid.id = arfDGid+"__ctl" + htmlencode((document.all[arfDGid].rows.length).toString()) + "_lbPerID";
        cspanid.textContent = argObj.PerID;
        cspanid.className = "InputFieldLabel";
        colid.appendChild(cspanid);
    }
    //單號
    var colbORno = document.createElement("TD");
    colbORno.setAttribute("align", "middle");
    colbORno.setAttribute("nowrap", "nowrap");
    colbORno.style.width = "8.5em";
    var cspanbORno = document.createElement("SPAN");
    cspanbORno.id = arfDGid+"__ctl" + htmlencode((document.all[arfDGid].rows.length).toString()) + "_lbBorNo";
    cspanbORno.textContent = argObj.BorNo;
    cspanbORno.className = "InputFieldLabel";
    colbORno.appendChild(cspanbORno);

    //調案日期
    var colbORnoDate = document.createElement("TD");
    colbORnoDate.setAttribute("align", "middle");
    colbORnoDate.setAttribute("nowrap", "nowrap");
    colbORnoDate.style.width = "8.5em";
    var cspanbORnoDate = document.createElement("SPAN");
    cspanbORnoDate.id = arfDGid+"__ctl" + htmlencode((document.all[arfDGid].rows.length).toString()) + "_lbBorDate";
    cspanbORnoDate.textContent = argObj.BorDate;
    cspanbORnoDate.className = "InputFieldLabel";
    colbORnoDate.appendChild(cspanbORnoDate);

    //應歸日期
    var colbODueDate = document.createElement("TD");
    colbODueDate.setAttribute("align", "middle");
    colbODueDate.setAttribute("nowrap", "nowrap");
    colbODueDate.style.width = "8.5em";
    var cspanbDueDate = document.createElement("SPAN");
    cspanbDueDate.id = arfDGid+"__ctl" + htmlencode((document.all[arfDGid].rows.length).toString()) + "_lbDueDate";
    cspanbDueDate.textContent = argObj.DueDATE;
    cspanbDueDate.className = "InputFieldLabel";
    colbODueDate.appendChild(cspanbDueDate);

    //應歸日期
    var colbODesc = document.createElement("TD");
    colbODesc.setAttribute("align", "middle");
    colbODesc.setAttribute("nowrap", "nowrap");
    colbODesc.style.width = "8.5em";
    var cspanDesc = document.createElement("SPAN");
    cspanDesc.id = arfDGid+"__ctl" + htmlencode((document.all[arfDGid].rows.length).toString()) + "_lbBorDesc";
    cspanDesc.textContent = "歸還日期：" + document.all["txDate"].value.substring(0, 3) + "/" + document.all["txDate"].value.substring(3,5)+"/"+document.all["txDate"].value.substring(5,7);
    cspanDesc.className = "InputFieldLabel";
	colbODesc.appendChild(cspanDesc);
	//* 2024.01.17   Cloud   1130015 修改個人檔支援單項歸還 - 增加調案序號
	var cspanSeq = document.createElement("SPAN");
	cspanSeq.id = arfDGid + "__ctl" + htmlencode((document.all[arfDGid].rows.length).toString()) + "_lbSeq";
	cspanSeq.textContent = argObj.strSeq;
	cspanSeq.className = "hide";
	colbODesc.appendChild(cspanSeq);
	
    
    row.appendChild(colSeq);//序
    row.appendChild(cselect);//選
    //row.appendChild(colDoc);//文號
    row.appendChild(cFromSubject);//文號
    
    if (argObj.borFlag == "1")
        row.appendChild(colid);
    row.appendChild(colbORno);
    row.appendChild(colbORnoDate);
    row.appendChild(colbODueDate);
    row.appendChild(colbODesc);
    
    document.all[arfDGid].children[0].appendChild(row);

}
function htmlencode(s) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}
//1120215 Cloud 銓敘部序31 增加以調案單位、調案人查詢方式
function dlDept_Text_onblur() {
    var bCheckOK = true;
    if (document.all["dlDept"].value != document.all["H_Dept"].value) {

        document.all["H_Dept"].value = document.all["dlDept"].value;

        if (document.all["H_Dept"].value == "") {
            document.all["H_Dept_Value"].value = "";
            
        }
        else {
            var arr = document.all["H_Dept"].value.split(":");
            document.all["H_Dept_Value"].value = arr[0];
        }

        akjf_SetdlDropDownListDept(document.all["H_Dept_Value"].value, "dlSect", false, false);	//初始dlSect、dlUser的處理

        document.all["H_Sect"].value = "";
        document.all["H_Sect_Value"].value = "";
        document.all["H_dlSect_Value"].value = SaveCurrDL(document.all["dlSect"]);

        akjf_DeptUser("dlDept", "dlUser");
        document.all["H_User"].value = "";
        document.all["H_dlUser_Value"].value = SaveCurrDL(document.all["dlUser"]);

    }
    if (document.all["dlSect"].options.length <= 1) {
        document.all["dlSect"].disabled = true;
    }
    else
        document.all["dlSect"].disabled = false;
    return bCheckOK;
}

function dlSect_Text_onblur() {
    var bCheckOK = true;
    var Inx = document.all["dlSect"].selectedIndex;
    var strSectText = document.all["dlSect"].options[Inx].text;
    //值若變更時作處理
    if (strSectText == "") {
        document.all["H_Sect"].value = "";
        document.all["H_Sect_Value"].value = "";
        akjf_DeptUser("dlDept", "dlUser");
        document.all["H_User"].value = "";
        document.all["H_dlUser_Value"].value = SaveCurrDL(document.all["dlUser"]);
    }
    if (document.all["dlSect"].value != document.all["H_Sect"].value) {
        //存ComboBox_Text的value
        document.all["H_Sect"].value = document.all["dlSect"].value;
        //存所選擇的ComboBox項目的value
        document.all["H_Sect_Value"].value = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value;
        akjf_DeptUser("dlSect","dlUser");
        document.all["H_User"].value = "";
        document.all["H_dlUser_Value"].value = SaveCurrDL(document.all["dlUser"]);
    }
    return bCheckOK;
}
function dlUser_onblur() {
    var bCheckOK = true;
    var Inx = document.all["dlUser"].selectedIndex;
    var strSectText = document.all["dlUser"].options[Inx].text;
    //值若變更時作處理
    if (strSectText == "") {
        document.all["H_User"].value = "";
        document.all["H_User_Value"].value = "";
    }
    else {
        document.all["H_User"].value = document.all["dlUser"].options[Inx].value;
        document.all["H_User_Value"].value = document.all["dlUser"].options[Inx].value.split(':')[2];
    }
    return bCheckOK;
}
//將下拉選單裡的options轉成字串相加再回傳，格式： [項目Text;項目Value|項目Text;項目Value|...]
function SaveCurrDL(argSource) {
    var strTemp = "";
    for (var i = 0 ; i < argSource.options.length ; i++) {
        if (argSource.options[i].text != "") {
            //僅含一級單位選項無value值，故在此另外判斷並加入隱藏dropdownlist，避免postback後無法將值keep在畫面上
            if (argSource.options[i].text.indexOf("僅含一級單位") == 1)
                strTemp += argSource.options[i].text + ";" + "(僅含一級單位)|";
            else
                strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
        }
    }

    return strTemp.substr(0, strTemp.length - 1);
}
function showAddMode() {
    if (document.all["rbSearch"].checked) {
        document.all["DivSearch"].className = "dTR";
        document.all["DivScan"].className = "hide";
    }
    else {
        document.all["DivScan"].className = "dTR";
        document.all["DivSearch"].className = "hide";
    }
}