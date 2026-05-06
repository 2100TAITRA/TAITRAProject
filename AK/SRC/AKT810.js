/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.08.24
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 103.11.12	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 105.04.19	Kenny	1050087 二代公文系統相關修改
 * 105.06.01	Kenny	1050289	一併調整開啟AKT810C1時的視窗大小，避免dataGrid資料筆數較多時下方資訊被截斷
 * 1051019      Joe		1050087	二代修正配合行動平台
 * 1051208      Kenny   1050087 調整由子視窗帶回調案單號後doPostBack前行為
 * 108.06.13	Cloud	1080373	新增支援密件、特殊調卷展期
 * 109.10.21	Leslie	1090561	信保基金客製化功能調整
 * 110.03.25    Cloud   1100199 (信保)新增以還卷批號批次歸還功能
 * 110.05.13	Cloud	1100199	(信保)新增以還卷批號批次歸還功能-dg提供功能紐
 * 114.10.01	Cloud	1141137	配合外貿需求，調整開啟子視窗大小
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050419	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050419	Kenny	[1050087]   二代公文系統相關修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1091021	Leslie[1090561]	信保基金客製化功能調整
var u_SMEG_NICK_NAME = "SMEG";

//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
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
		case "btHelp":
			
			var strUrl = "AKS502.aspx?rtnObj=lbReturnValue&k1=1";
			//1100325 Cloud 1100142 一並修改新增信保AKS502
			if (document.all["OrgNickName"].value == "SMEG")
				strUrl = "AKS502_SMEG.aspx?rtnObj=lbReturnValue&k1=1";
			jf_OpenChildWin(strUrl,"AKS502",700,500);
			Page_BlockSubmit = true;
			break;
		//1080613 Cloud 1080373 增加提供歸還日期輸入欄位-s
		case 'btLawDueDate':
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txLawDueDate"], event.screenX, event.screenY);
			break;
		    //1080613 Cloud 1080373 增加提供歸還日期輸入欄位-e
		    //* 110.03.25    Cloud   1100199 (信保)新增以還卷批號批次歸還功能-s
	    case 'IborBatch':
	        Page_BlockSubmit = true;
	        var strUrl = "/EA/EA80/EAR816C1.aspx?rtnObj=lbReturnValue&SAMLart=" + jf_GetArtifact();
	        jf_OpenChildWin(strUrl, "AKT810", 800, 600);
	        break;

	    	//* 110.03.25    Cloud   1100199 (信保)新增以還卷批號批次歸還功能-e
	    	//* 110.05.13	Cloud	1100199	(信保)新增以還卷批號批次歸還功能-dg提供功能紐-s
	    	//以下屬於DataGrid ToolBar
		case "btDgAll":
			Page_BlockSubmit = true;
			SelectAll("dg2", "_cbSelect");
			break;
		case "btDgInverse":
			Page_BlockSubmit = true;
			SelectInverse("dg2", "_cbSelect");
			break;
		case "btDgClear":
			Page_BlockSubmit = true;
			SelectClear("dg2", "_cbSelect");
			break;
			//* 110.05.13	Cloud	1100199	(信保)新增以還卷批號批次歸還功能-dg提供功能紐-sw

	}	
}

//1050419	Kenny	[1050087]   二代公文系統相關修改
//function jf_ToolBarHandle()
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
	
	//1050419	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
			//1050419	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
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
			//1050419	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050419	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	
	}
}

function CallBack(argCallerId)
{
	if (argCallerId == "AKS502")
	{
		document.all["txBorNo"].value = document.all["lbReturnValue"].options[0].value;
		document.all["txBorNo1"].value = document.all["txBorNo"].value;
		//回傳值為鍵值時，觸動TextChange事件
	    //__doPostBack();//for .NET Framework 1.0
	    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
		IsServerHandling = true;
        //1051208   Kenny   [1050087]   修改doPostBack前行為
        Page_BlockSubmit = false;
		__doPostBack("","");//for .NET Framework 1.1
	}
    //* 110.03.25    Cloud   1100199 (信保)新增以還卷批號批次歸還功能-S
	if (argCallerId == "EAR816C1") {
	    document.all["txBatchNo"].value = document.all["lbReturnValue"].options[0].value;
	    IsServerHandling = true;
	    Page_BlockSubmit = false;
	    __doPostBack("", "");
	}
    //* 110.03.25    Cloud   1100199 (信保)新增以還卷批號批次歸還功能-E

	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	
}

function ReturnValue(argBorNo,argReBorCount)
{
	var strUrl = "";
	strUrl = "AKT810C1.aspx?rtnObj=lbReturnValue&k1="+argBorNo+"&ReBorCount="+argReBorCount;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
	//1000317 Howard	修正開啟子視窗之大小
	//jf_OpenChildWin(strUrl, "AKT810C1", 750, 500 );
	//1050601	Kenny	[1050289]	一併調整開啟的子視窗大小
	//jf_OpenChildWin(strUrl, "AKT810C1", 850, 500);
	//114.10.01	Cloud	1141137	配合外貿需求，調整開啟子視窗大小
	//jf_OpenChildWin(strUrl, "AKT810C1", 850, 600 );
	jf_OpenChildWin(strUrl, "AKT810C1", 1024, 768 );
}

function ClientOnLoad()
{
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	//* 110.03.25    Cloud   1100199 (信保)新增以還卷批號批次歸還功能
	if (document.all["OrgNickName"].value != "SMEG")
		document.all["trBatch"].className = "hide";

}

function OnWSResult(argResult)
{}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050419	Kenny	[1050087]   二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
		bRtnbool = CheckBeforSave();
	return bRtnbool;
}

//儲存前key值外之欄位檢查
//檢查成功回值true
function CheckBeforSave()
{
	var bRtnbool = false;
	var ErrMsg = "";
	//David 95.09.14
	//配合保存現況第一筆空白取消	Leslie
	//if(document.all["dlKeepNo"].selectedIndex == "0" && document.all["dlKeepNo"].className != "Hide")
	//{
	//	ErrMsg = "請選擇保存現況\n";				
	//}
	//else
	//	bRtnbool = true;
		
	if (document.all["txDate"].value != "")
		bRtnbool = CheckDetail();
	else
	{
		//1050419	Kenny	[1050087]   二代公文系統相關修改
		//document.all["txDate"].focus();		
		$('#txDate').focus();
		ErrMsg += "異動日期不可為空白\n";
		bRtnbool = false;
		//jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["異動日期"])),"");
	}
	
	if(ErrMsg != "")
	{
		bRtnbool = false;
		alert(ErrMsg);
	}
		
	return bRtnbool;
}

function CheckDetail()
{
	var bRtnBool = true;
	var bLeast   = false;
	var bUnEmpty = true;
	var bOrgno   = true;
	var strReason= "";
	var strOrgno = "";
    //1100325 Cloud 1100199 (信保)新增批次歸還功能
	if (document.all["dg2"] && document.all["dg2"].className != "hide")
	{
	    for (var iRow = 2; iRow < document.all.dg2.rows.length + 1; iRow++) {
	    	if (document.all["dg2__ctl" + iRow + "_cbSelect"].checked == true)
	        {
	            bLeast = true;
	            break;
	        }
	    }
	    //至少要有一筆明細資料
	    if (!bLeast) {
	        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少要勾選一筆"])), "");
	        bRtnBool = false;
	    }
	}
	else
	{
	    for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++) {
	        if ((document.all["dg1__ctl" + iRow + "_dlBorType1"].selectedIndex != 0) && (bLeast == false))
	            bLeast = true;
	        if ((document.all["dg1__ctl" + iRow + "_dlBorType1"].selectedIndex == 2) && (bUnEmpty == true))
	            bUnEmpty = false;
	        if (document.all["dg1__ctl" + iRow + "_dlBorType1"].selectedIndex == 2) {
	            //1050419	Kenny	[1050087]   二代公文系統相關修改
	            //if ((document.all["dg1__ctl"+iRow+"_lbHidOrgno"].innerText != "") && (bOrgno==true))
	            if ((document.all["dg1__ctl" + iRow + "_lbHidOrgno"].textContent != "") && (bOrgno == true))
	                bOrgno = false;
	        }
	    }
	    //至少要有一筆明細資料
	    if (!bLeast) {
	        //1050419	Kenny	[1050087]   二代公文系統相關修改
	        //document.all["dg1__ctl2_dlBorType1"].focus();
	        $('#dg1__ctl2_dlBorType1').focus();
	        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少要變更一筆"])), "");
	        bRtnBool = false;
	    }
	    else {
	        //異動別有展期，展期原因 & 原因說明 不可空白
	        if (!bUnEmpty) {
	            if (jf_Trim(document.all["txDesc"].value) == "") {
	                strReason = "原因說明 不可為空白" + "\n" + strReason;
	                //1050419	Kenny	[1050087]   二代公文系統相關修改
	                //document.all["txDesc"].focus();
	                $('#txDesc').focus();
	            }
	            if (document.all["dlReason"].selectedIndex == 0) {
	                strReason = "展期原因 不可為空白" + "\n" + strReason;
	                //1050419	Kenny	[1050087]   二代公文系統相關修改
	                //document.all["dlReason"].focus();
	                $('#dlReason').focus();
	            }
	            //1080613 Cloud	1080373 檢查是否為依法調用-並檢核歸還日期-
	            for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++) {
	                if (document.all["dg1__ctl" + iRow + "_dlBorType1"].selectedIndex == 2 && document.all["dg1__ctl" + iRow + "_txIsLawBor"].value == "Y") {
	                    if (document.all["txLawDueDate"].value == "") {
	                        strReason = "展期依法調用調案單，需輸入歸還日期。" + "\n" + strReason;
	                        $('#txLawDueDate').focus();
	                        break;
	                    }
	                    if (document.all["txLawDueDate"].value < document.all["H_SYSDATE"].value) {
	                        strReason = "展期依法調用調案單，歸還日期應大於系統日。" + "\n" + strReason;
	                        $('#txLawDueDate').focus();
	                        break;
	                    }
	                    if (document.all["dg1__ctl" + iRow + "_lbDueDate"].textContent.split(document.all["H_Sign"].value)[0] > document.all["txLawDueDate"].value) {
	                        strReason = "展期依法調用調案單，歸還日期至少需大於案卷原應歸還日：" + document.all["dg1__ctl" + iRow + "_lbDueDate"].textContent.split(document.all["H_Sign"].value)[0] + "。" + "\n" + strReason;
	                        $('#txLawDueDate').focus();
	                        break;
	                    }
	                }
	            }
	            //1080613 Cloud	1080373 檢查展期原因是否為依法調用-並檢核歸還日期-E
	            if (strReason != "") {
	                strReason = "異動別有展期，" + "\n" + strReason;
	                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strReason])), "");
	                return false;
	            }
	            //展期的項目有外機關調案資料時，文號 & 調案期限 不可為空白
	            if (!bOrgno) {
	                if (jf_Trim(document.all["txLimit"].value) == "") {
	                    strOrgno = "展期期限 不可為空白" + "\n" + strOrgno;
	                    //1050419	Kenny	[1050087]   二代公文系統相關修改
	                    //document.all["txLimit"].focus();
	                    $('#txLimit').focus();
	                }
	                if (jf_Trim(document.all["txDocNo"].value) == "") {
	                    strOrgno = "文　　號 不可為空白" + "\n" + strOrgno;
	                    //1050419	Kenny	[1050087]   二代公文系統相關修改
	                    //document.all["txDocNo"].focus();
	                    $('#txDocNo').focus();
	                }
	                if (strOrgno != "") {
	                    strOrgno = "展期的項目有外機關資料時，" + "\n" + strOrgno;
	                    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strOrgno])), "");
	                    bRtnBool = false;
	                }
	            }
	        }
	    }
	}
	return bRtnBool;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = false;
	
	return bRtnbool;
}

function CheckBeforeSearch()
{
    var strErrMsg = "";
    //1100325 Cloud 1100199 (信保)新增還卷批號
    //if(document.all["txBorNo"].value == "" && document.all["dlName_Text"].value == "" && document.all["dlUnit_Text"].value == "")
    if (document.all["txBorNo"].value == "" && document.all["dlName_Text"].value == "" && document.all["dlUnit_Text"].value == "" && document.all["txBatchNo"].value == "")
    {
        //1100325 Cloud 1100199 (信保)新增還卷批號檢合
        if (document.all["OrgNickName"].value=="SMEG")
            alert("請至少輸入還卷批號、調案單號或是承辦單位、承辦人條件");
        else
		    alert("請至少輸入調案單號或是承辦單位、承辦人條件");
		return false
    }
    //1100325 Cloud 1100199 (信保)新增還卷批號檢核
    //if(document.all["txBorNo"].value == "")
    if (document.all["txBorNo"].value == "" && document.all["txBatchNo"].value == "")
	{
		if (document.all["dlName_Text"].value == "")
		{
			//1050419	Kenny	[1050087]   二代公文系統相關修改
			//document.all["dlName_Text"].focus();
			$('#dlName_Text').focus();
			strErrMsg = "承辦人不可空白" + "\n" + strErrMsg;
			
		}
		if (document.all["dlUnit_Text"].value == "")
		{
			//1050419	Kenny	[1050087]   二代公文系統相關修改
			//document.all["dlUnit_Text"].focus();
			$('#dlUnit_Text').focus();
			strErrMsg = "承辦單位不可空白" + "\n" + strErrMsg;
			
		}		
		if (strErrMsg != "")
		{
			alert(strErrMsg);
			return false;
		}
		else
			return true;
	}
	else
		return true;
}

//調案期限日期格式檢查
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
			//1050419	Kenny	[1050087]   二代公文系統相關修改
			//document.all[argObj].focus();
			$('#'+argObj).focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		}
	}
}

function UserOnBlur(Userobj)
{
	if(Userobj.options == null)
	{
		document.all["txUserValue"].value = "";
		return;
	}
	if(Userobj.options.length == 0)
	{
		document.all["txUserValue"].value = "";
		return;
	}
	var index = Userobj.selectedIndex;
	if(index == -1)
	{
		document.all["txUserValue"].value = "";
		return;
	}
	document.all["txUserValue"].value =  Userobj.options[index].value;
}

function dlBorType1OnChange(obj,dgRowCount)
{	
	var ReBorCount_ID = jf_Assemble(obj,"dlBorType1","lbReBorCnt");
	
	//1050419	Kenny	[1050087]   二代公文系統相關修改
	//var temp = parseInt(document.all["dg1__ctl"+dgRowCount+"_lbReBorCnt"].innerText);
	var temp = parseInt(document.all["dg1__ctl"+dgRowCount+"_lbReBorCnt"].textContent);
	
	//1091021	Leslie[1090561]	信保基金客製化功能調整
	var m_OrgNickName = $('#H_OrgNickName').val();
	if(u_SMEG_NICK_NAME == m_OrgNickName)
	{
		let _strBorSet = $('#dg1__ctl'+dgRowCount+'_lbReBorLimit').text();
		let _arBorSet = _strBorSet.split($('#H_Sign').val())[0];
		let _ReborLimit = parseInt(_arBorSet[0]);
		if(document.all["dg1__ctl"+dgRowCount+"_dlBorType1"].selectedIndex==2 && temp >= _ReborLimit)
		{
			alert("本調案單展期次數已達 "+_ReborLimit+" 次，不允許再次展期");
			document.all["dg1__ctl"+dgRowCount+"_dlBorType1"].selectedIndex = 0;
			$('#dg1__ctl'+dgRowCount+'_dlBorType1').focus();
		}
	}
	else	//1091021	Leslie[1090561]	信保基金客製化功能調整	--END--
	if(document.all["dg1__ctl"+dgRowCount+"_dlBorType1"].selectedIndex==2 && temp >= 3)
	{
		alert("本調案單展期次數已達三次，不允許再次展期");
		document.all["dg1__ctl"+dgRowCount+"_dlBorType1"].selectedIndex = 0;
		//1050419	Kenny	[1050087]   二代公文系統相關修改
		//document.all["dg1__ctl"+dgRowCount+"_dlBorType1"].focus();
		$('#dg1__ctl'+dgRowCount+'_dlBorType1').focus();
	}
}

function BorTypeOnChange(objName,Count,TargetDg)
{	
	if(document.all[objName].selectedIndex == "1")
	{	
		//1050419	Kenny	[1050087]   二代公文系統相關修改，hide屬性需為小寫才會作用--Start--
		//document.all["Label3"].className = "Hide";
		//document.all["dlReason"].className = "Hide";
		//document.all["Label5"].className = "Hide";
		//document.all["Label7"].className = "Hide";
		//document.all["txDesc"].className = "Hide";		
		
		document.all["Label3"].className = "hide";
		document.all["dlReason"].className = "hide";
		document.all["Label5"].className = "hide";
		document.all["Label7"].className = "hide";
		document.all["txDesc"].className = "hide";
		//1050419	Kenny	[1050087]   二代公文系統相關修改，hide屬性需為小寫才會作用--End--
		
		document.all["Label11"].className = "";
		document.all["Label12"].className = "";
		document.all["dlKeepNo"].className = "";		
		//1080613 Cloud 1080373 增加判斷是否為展期 是則顯示應歸還日期
		document.all["trLawDueDate"].className = "hide";
		
		
	}
	if(document.all[objName].selectedIndex == "2")
	{
		document.all["Label3"].className = "";
		document.all["dlReason"].className = "";
		document.all["Label5"].className = "";
		document.all["Label7"].className = "";
		document.all["txDesc"].className = "";		
		
		//1050419	Kenny	[1050087]   二代公文系統相關修改，hide屬性需為小寫才會作用--Start--
		//document.all["Label11"].className = "Hide";
		//document.all["Label12"].className = "Hide";
		//document.all["dlKeepNo"].className = "Hide";				
		
		document.all["Label11"].className = "hide";
		document.all["Label12"].className = "hide";
		document.all["dlKeepNo"].className = "hide";
		//1050419	Kenny	[1050087]   二代公文系統相關修改，hide屬性需為小寫才會作用--End--
		//1080613 Cloud 1080373 增加判斷是否為法院借調 是則顯示應歸還日期-S
		if (document.all["dg1__ctl" + Count + "_txIsLawBor"].value == "Y")
		{ document.all["trLawDueDate"].className = "dTR"; }
		else
		{
			document.all["txLawDueDate"].value = "";//清掉應歸還日期
			document.all["trLawDueDate"].className = "hide";
		}
		//1080613 Cloud 1080373 增加判斷是否為法院借調 是則顯示應歸還日期-E
	}	
	dlBorType1OnChange(objName,Count);
}
InitObj();
function InitObj()
{
	//1050419	Kenny	[1050087]   二代公文系統相關修改，hide屬性需為小寫才會作用--Start--
	//document.all["Label3"].className = "Hide";
	//document.all["dlReason"].className = "Hide";
	//document.all["Label5"].className = "Hide";
	//document.all["Label7"].className = "Hide";
	//document.all["txDesc"].className = "Hide";

	document.all["Label3"].className = "hide";
	document.all["dlReason"].className = "hide";
	document.all["Label5"].className = "hide";
	document.all["Label7"].className = "hide";
	document.all["txDesc"].className = "hide";	
	//1050419	Kenny	[1050087]   二代公文系統相關修改，hide屬性需為小寫才會作用--End--
		
	document.all["Label11"].className = "";
	document.all["Label12"].className = "";
	document.all["dlKeepNo"].className = "";			
}
function SelectAll(argTableName, argCheckBoxName)
{
	var i, j;

	if (document.all[argTableName] == null)
		return;

	var len = document.all[argTableName].rows.length + 1;
	for (i = 2; i < len; i++)
	{
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		if (!obj.checked)
			obj.checked = true;
	}
}

//反選
function SelectInverse(argTableName, argCheckBoxName)
{
	var i, j;

	if (document.all[argTableName] == null)
		return;

	var len = document.all[argTableName].rows.length + 1;
	for (i = 2; i < len; i++)
	{
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		if (obj.checked)
			obj.checked = false;
		else
			obj.checked = true;
	}
}

//清除選取
function SelectClear(argTableName, argCheckBoxName)
{
	var i, j;

	if (document.all[argTableName] == null)
		return;

	var len = document.all[argTableName].rows.length + 1;
	for (i = 2; i < len; i++)
	{
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		if (obj.checked)
			obj.checked = false;
	}
}