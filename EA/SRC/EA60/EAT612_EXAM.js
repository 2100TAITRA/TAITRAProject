/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號			概要
 * -------------------------------------------------------------------------------------------------
 *111.04.06		Cloud	1101536			新增此作業
 *111.04.12		Cloud	序40			修正儲存時選在移轉上仍可選擇不移轉
 ***************************************************************************************************

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
var gDgInit = true;

//指定DataGrid欄位
var EAT612_CaseList = new Object();
EAT612_CaseList.Info = new Array();
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


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//*111.04.12		Cloud	序40			修正儲存時選在移轉上仍可選擇不移轉
	SetRbType();

    if (gDgInit) {
        if (document.all.dg1) {
            document.all.dg1.children[0].childNodes[0].style.backgroundColor = "#5f9cc5";
            document.all.dg1.children[0].childNodes[0].style.textAlign = "center";
            document.all.dg1.children[0].childNodes[0].style.border = "1";
            document.all.dg1.children[0].childNodes[0].setAttribute("rules", "col");
            document.all.dg1.children[0].childNodes[1].remove();
            gDgInit = false;
        }
        if (document.all.tbSelect)
            document.all["tbSelect"].className = "hide";
    }
    // 新增模式調整文字顏色
	if (jf_GetActionMode() == LayoutModeNew) {
		document.all.Label5.style.color = "gray"
		document.all.Label1.style.color = "gray"
	}
	else {
		document.all.Label5.style.color = "Navy"
		document.all.Label1.style.color = "Navy"
		//取得註記過的資訊
		if (document.all["HASBEENTRY"] && document.all["HASBEENTRY"].value == "1") {
			var SearchParam = new Array(5);
			SearchParam[0] = document.all["SourceNo"].value;
			SearchParam[1] = document.all["txPlanNo"].value;
			//透過AJAX 建立畫面
			if (EAT612_CaseList.Info.length == 0) {
				EAT612_CaseList = EA60.EAT612_EXAM.SearchDeatilData(SearchParam, "Search","").value;
				if (EAT612_CaseList.strErrMsg != "")
					alert(EAT612_CaseList.strErrMsg);
				else {
					if (EAT612_CaseList.bHasData == true) {
						document.all.dg1.className = "";
						document.all.tbSelect.className = "";
						fnbulideDG();
					}
					else {
						if (document.all.dg1.rows.length == 1) {
							document.all.dg1.className = "hide";
							document.all.tbSelect.className = "hide";
						}
					}
				}
			}
		}
	}

}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/

function ClientButtonControl(e)
{
    
    var xObjectName = e.target.id;
	
	
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btHelp": //計畫批號提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "../EA40/EAT400C1.aspx";
			jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
			break;
	    case "btSet":
	        Page_BlockSubmit = true;
		    if (CheckAddFieldEmpty(xObjectName))
		    {
		        var SearchParam = new Array(5);
				SearchParam[0] = document.all["SourceNo"].value;
				SearchParam[1] = document.all["txPlanNo"].value;
		        SearchParam[2] = document.all["txYearS"].value;
		        SearchParam[3] = document.all["txClsS"].value;
		        SearchParam[4] = document.all["txCaseS"].value;
				SearchParam[5] = document.all["txCaseE"].value;
				        //透過AJAX 建立畫面
				if (EAT612_CaseList.Info!= undefined && EAT612_CaseList.Info.length == 0) {
				    EAT612_CaseList = EA60.EAT612_EXAM.SearchProcData(SearchParam).value;
				    if (EAT612_CaseList.strErrMsg != "")
				        alert(EAT612_CaseList.strErrMsg);
				    else {
				        if (EAT612_CaseList.bHasData == true) {
				            if (!CheckCaseNoExist(EAT612_CaseList)) {
				                document.all.dg1.className = "";
				                document.all.tbSelect.className = "";
				                fnbulideDG();
				            }
				        }
				        else {
				            if (document.all.dg1.rows.length == 1) {
				                document.all.dg1.className = "hide";
				                document.all.tbSelect.className = "hide";
				            }
				            alert("案次號不存在或不存在該批號下。");
				        }
				    }
				}
				else {
				    var AddObj = EA60.EAT612_EXAM.SearchProcData(SearchParam).value;
				    if (AddObj.strErrMsg != "") {
				        alert(AddObj.strErrMsg);
				        return;
				    }
				    else {
				        if (AddObj.bHasData == true) {
							if (!CheckCaseNoExist(AddObj)) {
								for (var iCase = 0; iCase < AddObj.Info.length; iCase++) {
									var bEx = false;
									//檢查是否為重複的
									for (var i = 0; i < strMarkArray.length; i++) {
										if (strMarkArray[i] == AddObj.Info[iCase].File_NO)
											bEx = true;
									}
									if (!bEx)
										EAT612_CaseList.Info[EAT612_CaseList.Info.length] = AddObj.Info[iCase];
								}
								document.all.dg1.className = "";
								document.all.tbSelect.className = "";
								fnbulideDG();
							}
				            
				        }
				        else {
				            alert("案次號不存在或不存在該批號下。");
				        }
				    }
				}
		    }
			break;
		
	    case "btSelectAll":
	        SelectAll("dg1", "_cbSelect");
	        break;
	    case "btSelectInverse":
	        SelectInverse("dg1", "_cbSelect");
	        break;
	    case "btSelectClear":
	        SelectClear("dg1", "_cbSelect");
	        break;
	    case "btSetPatch":
	        Page_BlockSubmit = true;
	        var hasKeepData = false;
	        if (CheckDgCBox()) {
	            if (window.confirm("批次設定會將勾選案設定為所選鑑定結果，是否確定更改?")) {
	                var strAdvReasult = "列為國家檔案";
	                for (var i = 1; i < document.all.dg1.rows.length; i++) {
	                    if (document.all["dg1__ctl" + i + "_cbSelect"].checked == true) {

	                        if (document.all.rbTran.checked)//移轉
	                        {
	                            EAT612_CaseList.Info[i - 1].AdvSuesstNo = "6";
	                            EAT612_CaseList.Info[i - 1].NewKeepYear = "";//新保存年限
	                        }
	                        else//不移轉
	                        {
	                            if (document.all.rbNotTran1.checked)//定期保存
	                            {
	                                EAT612_CaseList.Info[i - 1].AdvSuesstNo = "4";
	                                EAT612_CaseList.Info[i - 1].NewKeepYear = document.all["txNewKeepYear"].value;//新保存年限
	                                strAdvReasult = "機關定期保存，調整後保存年限：" + document.all["txNewKeepYear"].value + "年";
	                            }
	                            else//永久保存
	                            {
	                                EAT612_CaseList.Info[i - 1].AdvSuesstNo = "5";
	                                EAT612_CaseList.Info[i - 1].NewKeepYear = "";//新保存年限
	                                strAdvReasult = "機關永久保存";
	                            }
	                        }
	                        EAT612_CaseList.Info[i - 1].AdvSuesst = strAdvReasult;
	                    }

	                }
	                fnbulideDG();
	            }
	        }
	        break;
        //-功能保留以防擴充
	    case "btDeleteCase":
	        //檢核至少需勾選一個
	        Page_BlockSubmit = true;
	        var hasKeepData = false;
	        if (CheckDgCBox()) {
	            for (var i = 1; i < document.all.dg1.rows.length; i++) {
	                //將保留資訊Keep至物件
	                if (document.all["dg1__ctl" + i + "_cbSelect"].checked != true) {
	                    hasKeepData = true;
	                }
	                else//刪除物件
	                {
	                    EAT116_CaseList.Info[i - 1] = undefined;
	                }
	            }
	            //更新物件
	            DeleteRow();
	            //畫面整個刪除
	            $("#dg1").find("tr[Id*=Data]").remove();
	            if (hasKeepData) {
	                fnbulideDG();
	            }
	            else {
	                document.all.dg1.className = "hide";
	                document.all.tbSelect.className = "hide";
	            }

	        }
	        break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/

function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    
	xObjectName = event.target.id;
	switch (xObjectName) {
	    case "btOpen":
	        if (jf_Trim(document.all["txPlanNo"].value) != "")
	            Page_BlockSubmit = false;
	        else {
	            alert("移轉批號不可為空白");
	            Page_BlockSubmit = true;
	            $('#txPlanNo').focus();
	        }

	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btCancel":
	    case "btClean":
	        Page_BlockSubmit = false;
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btSave":
	        if (jf_CheckBeforSave()) //是否通過儲存前必要檢查
	        {
	            if (window.confirm("儲存將依登錄之鑑定結果更新公文保存年限、屆移轉日期，是否確定儲存?")) {
	                document.all["txSaveInfo"].value = JSON.stringify(EAT612_CaseList);
	                IsServerHandling = true;
	                jf_ShowWaitState();
	                Page_BlockSubmit = false;
					//*111.04.12		Cloud	序40			修正儲存時選在移轉上仍可選擇不移轉
					document.all["rbNotTran1"].disabled = false;
					document.all["rbNotTran2"].disabled = false;
					document.all["txNewKeepYear"].disabled = false;
	            }
	            else {
	                Page_BlockSubmit = true;
	            }
	        }
	        else
	            Page_BlockSubmit = true;
	        jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = true;
			var SearchParam = new Array(5);
			SearchParam[0] = document.all["SourceNo"].value;
			SearchParam[1] = document.all["txPlanNo"].value;
			EAT612_CaseList = EA60.EAT612_EXAM.SearchDeatilData(SearchParam, "Excel", document.all.h_OrgName.value).value;
			if (EAT612_CaseList.strErrMsg != "")
				alert(EAT612_CaseList.strErrMsg);
			else {
			    if (EAT612_CaseList.bHasData == true) {
			        var strPath = EAT612_CaseList.strOutPutExcel.split('|');
			        openDlg(strPath[0], strPath[1], strPath[2]);
			    }
			    else
			        alert("尚無已完成登錄之案卷。");
			}
			break;
	}
}


//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txPlanNo"].value == "")
	{
	    strErrMsg += "移轉批號不可空白\n";
	    
	    $('#txPlanNo').focus();
	}
	if (document.all.dg1 && document.all.dg1.rows.length == 1)
	{
	    strErrMsg += "登錄區至少須有一筆資料\n";
	}
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
   var strErrMsg;
	//檢查是否為移交
	if (argResult.id == wsCheckPlanID)
	{		
		if (argResult.value.UtyRtn.m_bSuccess)
		{
		    document.all.txPlanType.value = argResult.value.PlanType;
		    if (document.all.txPlanType.value != "000100")
		    {
		        Page_BlockSubmit = true;
		        strErrMsg = "非移轉批號。";
		        $('#txPlanNo').focus();
		        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
		    }
			
		}
    }
    
    //清理計畫是否有將'清查'納入
   /* if (argResult.id == wsGetTypeID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (argResult.value.RtnField0[0].substr(0,1) != "1")
			{
			}
			else 
			{  
				document.all["txDesc"].value = argResult.value.RtnField1;
				CheckPlanStatus();
			}
			
				
		}
    }*/
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	
	if (argCallerId == "EAT400C1")
	{
		document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
		if(document.all["txPlanNo"].value != "")
		{
			Page_BlockSubmit=false;
			document.all.ToolBarSenderID.value = "btOpen";	
			if(Page_BlockSubmit==false)
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				__doPostBack("tbTool",0);
			}
		}
		$('#txPlanNo').focus();
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var strMarkArray = new Array();
function CheckCaseNoExist(argCallBackOjg) {

    if (!document.all.dg1)
        return false;

    var objDgName = "dg1";

    var pDgLen = document.all[objDgName].rows.length;  //有header,筆數為實際筆數+1			
    var strObjName = "";	//First Compare
	var strErrMsg = "";		//ErrMsg		
	strMarkArray.length = 0;

    if (pDgLen == 1) {
        return false;
    }
    
    for (var i = 1; i < pDgLen; i++) {
        strObjName = objDgName + "__ctl" + i + "_lbFileNo";
        for (var iCase = 0; iCase < argCallBackOjg.Info.length; iCase++) {

            if (argCallBackOjg.Info[iCase].File_NO == document.all[strObjName].textContent)
                strMarkArray[strMarkArray.length] = argCallBackOjg.Info[iCase].File_NO;
        }
    }
    var ErrMsgFooter = "以下案號已存在登錄區，是否確定覆蓋?\n";
    for (var i = 0; i < strMarkArray.length ; i++) {
        if (strErrMsg != "")
            strErrMsg += "\n";
        strErrMsg += strMarkArray[i];
    }
    

    if (strErrMsg != "") {
        if (window.confirm(ErrMsgFooter+strErrMsg))//確定覆蓋即視為不存在
        {
            //更新物件內容
			for (var i = 0; i < strMarkArray.length; i++) {
				for (var iCase = 0; iCase < EAT612_CaseList.Info.length; iCase++) {
					var strAdvReasult = "列為國家檔案";
					if (strMarkArray[i] == EAT612_CaseList.Info[iCase].File_NO) {

						if (document.all.rbTran.checked)//移轉
						{
							EAT612_CaseList.Info[iCase].AdvSuesstNo = "6";
							EAT612_CaseList.Info[iCase].NewKeepYear = "";//新保存年限
						}
						else//不移轉
						{
							if (document.all.rbNotTran1.checked)//定期保存
							{
								EAT612_CaseList.Info[iCase].AdvSuesstNo = "4";
								EAT612_CaseList.Info[iCase].NewKeepYear = document.all["txNewKeepYear"].value;//新保存年限
								strAdvReasult = "機關定期保存，調整後保存年限：" + document.all["txNewKeepYear"].value + "年";
							}
							else//永久保存
							{
								EAT612_CaseList.Info[iCase].AdvSuesstNo = "5";
								EAT612_CaseList.Info[iCase].NewKeepYear = "";//新保存年限
								strAdvReasult = "機關永久保存";
							}
						}
						EAT612_CaseList.Info[iCase].AdvSuesst = strAdvReasult;
					}
				}
			}
			fnbulideDG();
            return false;
        }
        else
            return true;
    }
    else
        return false;

}
function htmlencode(s) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

//補0
function CallPadFunc(strObjName,argCount)
{	
	switch(strObjName)
	{					
		case "txYearS":						
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,3,"0");
			break;		
	}
}

function CheckAddFieldEmpty(activeObjName)
{
	var actionJudge = true;
	var strErrMsg = "";
	
	if(document.all["txPlanNo"].value == "")
	{
		actionJudge = false;
		strErrMsg += "移轉批號不可空白\n";
	}
	if (!document.all.rbTran.checked && document.all.rbNotTran1.checked && document.all["txNewKeepYear"].value == "")
	{
	    actionJudge = false;
	    strErrMsg += "選擇定期保存時，保存年限不可為空白。\n";
	}
	
	switch (activeObjName) {


	    case "btSet":
	        {
	            if (CheckFileNoRange(strErrMsg) != "") {
	                strErrMsg = CheckFileNoRange(strErrMsg);
	                actionJudge = false;
	            }
	            break;
	        }
	}
	
	if(strErrMsg != "")
		alert(strErrMsg);
		
	return actionJudge;
}

//判斷檔號起訖的合理性
function CheckFileNoRange(argStr)
{
	var JCls	= 0;	//0:兩者為空,1:其中一個為空,2:不相等,3:相等
	var JCase	= 0;
	var jBool = true;
	if (document.all["txYearS"].value == "" || document.all["txClsS"].value == "" || document.all["txCaseS"].value == "") {
		argStr += "需輸入至案次號。";
	}
	else {

		if (document.all["txCaseS"].value == "" && document.all["txCaseE"].value == "") {
			argStr += "案次號起訖不可皆為空白。";
		}
	}
	return argStr;
}



var wsCheckPlanID;
function txPlanNo_onblur()
{
	if (!IsServerHandling)
	{
		if (document.all["txPlanNo"].value != "")
		{
			Page_BlockSubmit = true;
			
			var arWSParam = new Array(1);
			arWSParam[0] = document.all["txPlanNo"].value;
			callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ChkPlan", false, arWSParam);
			wsCheckPlanID = callObj.id;
			OnWSResult(callObj);
		}
	}
}
function fnbulideDG() {
	$("#dg1").find("tr[Id*=Data]").remove();
	for (var iCase = 0; iCase < EAT612_CaseList.Info.length; iCase++) {
	    fnAddDgRow(EAT612_CaseList.Info[iCase]);
	}
	document.all["txYearS"].value = "";
	document.all["txClsS"].value = "";
	document.all["txCaseS"].value = "";
	document.all["txCaseE"].value = "";
	if (document.all["rbNotTran1"].checked)
	    document.all["txNewKeepYear"].value = "";
	
}

function CheckDgCBox() {
	var bSelect = false;
	var strErrMsg = "";
	if (document.all.dg1.rows.length > 1) {
		for (var i = 1; i < document.all.dg1.rows.length; i++) {
			if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
				bSelect = true;
				break;
			}
		}
		if (!bSelect)
			strErrMsg += "至少勾選一筆資料\n";
	}
	else {
		strErrMsg += "登錄區無資料，請先加入資料\n";
	}
	if (strErrMsg != "")
		alert(strErrMsg);

	return bSelect;
}
function SetRbType(argType) {
    if (document.all["rbNotTran"].checked) {
        document.all["rbNotTran1"].disabled = false;
        document.all["rbNotTran2"].disabled = false;
		//*111.04.12		Cloud	序40			修正儲存時選在移轉上仍可選擇不移轉
		document.all["txNewKeepYear"].disabled = false;
    }
    else {
        document.all["rbNotTran1"].disabled = true;
        document.all["rbNotTran2"].disabled = true;
		//*111.04.12		Cloud	序40			修正儲存時選在移轉上仍可選擇不移轉
		document.all["txNewKeepYear"].disabled = true;
		
    }
}
function fnAddDgRow(argObj, argAdjReaslt) {
    var rowCnt = document.all.dg1.rows.length;
    //設定row的背景色
    //create row
    var row = document.createElement("TR");
    row.id = "Data" + rowCnt.toString();
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
    cselect.style.width = "1.5em";

    var cspelect = document.createElement("INPUT");
    cspelect.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_cbSelect";
    cspelect.setAttribute("type", "checkbox");
    cselect.appendChild(cspelect);

    //檔號
    var colFileNo = document.createElement("TD");
    colFileNo.setAttribute("align", "middle");
    colFileNo.style.width = "12em";
    var cspanFileNo = document.createElement("SPAN");
	cspanFileNo.style['word-break'] = 'break-all';
    cspanFileNo.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_lbFileNo";
    cspanFileNo.textContent = argObj.File_NO;
    cspanFileNo.className = "InputFieldLabel";
    colFileNo.appendChild(cspanFileNo);

    //案名
    var colCaseName = document.createElement("TD");
    colCaseName.setAttribute("align", "left");
    colCaseName.style.width = "20em";
    var cspanCaseName = document.createElement("SPAN");
	cspanCaseName.style['word-break'] = 'break-all';
    cspanCaseName.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_lbCaseName";
    cspanCaseName.textContent = argObj.CaseName;
    cspanCaseName.className = "InputFieldLabel";
    colCaseName.appendChild(cspanCaseName);

    //鑑定結果-畫面
    var strAdvReasult = "列為國家檔案";
    var colAdvReasult = document.createElement("TD");
    colAdvReasult.setAttribute("align", "left");
    colAdvReasult.setAttribute("nowrap", "nowrap");
    colAdvReasult.style.width = "15em";
    var cspanAdvReasult = document.createElement("SPAN");
    cspanAdvReasult.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_lAdvReasult";
    //鑑定結果-物件argObj-未設定過使用畫面
    if (argObj.AdvSuesstNo == "") {
        if (document.all.rbTran.checked)//移轉
            argObj.AdvSuesstNo = "6";
        else//不移轉
        {
            if (document.all.rbNotTran1.checked)//定期保存
            {
                argObj.AdvSuesstNo = "4";
                argObj.NewKeepYear = document.all["txNewKeepYear"].value;//新保存年限
                strAdvReasult = "機關定期保存，調整後保存年限：" + document.all["txNewKeepYear"].value + "年";
            }
            else//永久保存
            {
                argObj.AdvSuesstNo = "5";
                strAdvReasult = "機關永久保存";
            }
        }
        argObj.AdvSuesst = strAdvReasult;
        cspanAdvReasult.textContent = strAdvReasult;
    }
    else//設定過不動-
        cspanAdvReasult.textContent = argObj.AdvSuesst;
    cspanAdvReasult.className = "InputFieldLabel";
    colAdvReasult.appendChild(cspanAdvReasult);
    /*-按鈕-S
    var cCopyinfo = document.createElement("TD");
    cCopyinfo.setAttribute("align", "middle");
    cCopyinfo.setAttribute("nowrap", "nowrap");
    cCopyinfo.style.width = "3em";
    cCopyinfo.innerHTML = "<input type=\"submit\" value=\"複製\" onclick=\"javascript:CopyRow() \" language=\"javascript\" id=\"dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_btCopy\">";
    var spanCopyinfo = document.createElement("SPAN");
    spanCopyinfo.className = "InputFieldLabel";
    cCopyinfo.appendChild(spanCopyinfo);
    //-按鈕-E*/
    row.appendChild(colSeq);//序
    row.appendChild(cselect);//選
    row.appendChild(colFileNo);//案號
    row.appendChild(colCaseName);//案名
    row.appendChild(colAdvReasult);//鑑定結果
    document.all.dg1.children[0].appendChild(row);
}
//全部選取
function SelectAll(argTableName, argCheckBoxName) {
    if (document.all[argTableName] == null)
        return;

    for (i = 1; i < document.all[argTableName].rows.length; i++) {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        obj.checked = true;
    }
}

//反向選取
function SelectInverse(argTableName, argCheckBoxName) {
    if (document.all[argTableName] == null)
        return;

    for (i = 1; i < document.all[argTableName].rows.length; i++) {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.disabled == false) {
            if (obj.checked) {
                obj.checked = false;
                
            }
            else {
                obj.checked = true;
            }
        }
    }
}

//清除選取
function SelectClear(argTableName, argCheckBoxName) {
    if (document.all[argTableName] == null)
        return;

    for (i = 1; i < document.all[argTableName].rows.length; i++) {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        obj.checked = false;
    }
}
//刪除功能鈕
function DeleteRow() {
    var TempEAT612_CaseList = new Object();
    TempEAT612_CaseList.Info = new Array();
    var TempObjInx = 0;
    for (i = 0; i < EAT612_CaseList.Info.length; i++) {
        if (EAT612_CaseList.Info[i] != undefined) {
            TempEAT612_CaseList.Info[TempObjInx] = EAT612_CaseList.Info[i];
            TempObjInx++;
        }
    }
    EAT612_CaseList = TempEAT612_CaseList;
}
//檢查清理計畫是否有將'移轉'納入
/*var wsGetTypeID;
function CheckIsTransfer()
{
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(2);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		if (document.all["txPlanNo"].value != "")
		{
			Page_BlockSubmit = true;
		
			arKeyName[0]    = "PLAN_NO";
			arKeyValue[0]   = document.all["txPlanNo"].value;
			arRtnFldName[0] = "PLAN_TYPE";
			arRtnFldName[1] = "PLAN_DESC";
			arOrdFldName[0] = "PLAN_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "PLAN_MAIN";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, arWSParam);
		
			wsGetTypeID = callObj.id;
			OnWSResult(callObj);
		}
	}
}*/

/*var wsGetTypeID2;
function CheckPlanStatus()
{
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		if (document.all["txPlanNo"].value != "")
		{
			Page_BlockSubmit = true;
		
			arKeyName[0]    = "PLAN_NO";
			arKeyValue[0]   = document.all["txPlanNo"].value;
			arRtnFldName[0] = "PLAN_STATUS";
			arOrdFldName[0] = "PLAN_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "PLAN_MAIN";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, arWSParam);
			wsGetTypeID2 = callObj.id;
			OnWSResult(callObj);
		}
	}
}*/