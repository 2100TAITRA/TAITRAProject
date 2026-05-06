//1131127      Cloud   1131150 以DFT400為底新增勤益專用DFT400_NCUT
var IsServerHandling = new Boolean();
IsServerHandling = false;

var wsCheckUserID;
var wsCheckTranID;
var wsCheckClassID;
var wsCheckCaseID;
var bClsSuccess  = true;
var bCaseSuccess = true;
var strUrl="";
jf_ShowValidator();
const fileInput = document.getElementById('h_CsvFilePath');
fileInput.addEventListener('change', function (event) {
	const file = event.target.files[0];
	if (file) {
		if (file.type == "text/csv") {
			IsServerHandling = true;
			Page_BlockSubmit = false;
			var start = document.all.h_CsvFilePath.value.lastIndexOf("\\");
			if (start != -1) {
				document.all["h_SerWorkFile"].value ="\\"+document.all.h_CsvFilePath.value.substring(start + 1);
			}
			jf_ToolBarSubmit("btImport");
		}
		else {
			Page_BlockSubmit = true;
			alert("僅能匯入CSV檔。");
			document.all["h_CsvFilePath"].value = "";
		}
	}
});
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
		case "btUser"://負責人
		    strUrl = "http://" + document.all["SSOServer"].value + "/II/IIC020.aspx";
		    jf_OpenChildWin(strUrl, "IIC020", 800, 600);
			Page_BlockSubmit = true;
			break;
		case "btCls"://分類號
			strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=DFT400&MODE=1&SHOWALL=1&FILE_CLS="+jf_Trim(document.all.txCls.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl, "EAC005", 800, 600);
			Page_BlockSubmit = true;
			break;
		case "btCase"://案次號
			strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=DFT400&MODE=2&SHOWALL=1&FILE_CLS="+jf_Trim(document.all.txCls.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl, "EAC005", 800, 600);
			//Eileen -- end
			Page_BlockSubmit = true;
			break;
		case "btTran"://移交人
			strUrl = "http://" + document.all["SSOServer"].value + "/II/IIC020.aspx";
			jf_OpenChildWin(strUrl, "SYM020C1", 800, 600);
			Page_BlockSubmit = true;
			break;
		case "btClearDG":
			btClearDGClick();
			Page_BlockSubmit = true;
			break;
		case "btSelectDG":
			btSelectDGClick();
			Page_BlockSubmit = true;
			break;
		case "btChangeDG":
			btChangeDGClick();
			Page_BlockSubmit = true;
			break;
		case "btClearnNrps":
			Page_BlockSubmit = true;
			if (CheckbSelected()) {
				for (i = 2; i < document.all.dg1.rows.length + 2; i++) {
					if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
						setDgRpsInfo(i, "CLEARN");
					}
				}
			}
		break;
		
	}	
}
//Cola 000260 設定排序方式 -- start --
function jf_sortCol(argColName)
{
	//指令排序要用哪個column
	
//	0 代表 EMP_NAME DESC
//	1 代表 EMP_NAME ASC
//  2 代表 DOC_MAIN ASC
//  3 代表 DOC_NAME DESC
	
	switch (argColName)
	{
	
		case "DOC_NO":
			if (document.all.hDgSortCmd.value == "3")
				document.all.hDgSortCmd.value = "2";
			else
				document.all.hDgSortCmd.value = "3";
			break;
		case "EMP_NAME":

			if (document.all.hDgSortCmd.value == "1")
				document.all.hDgSortCmd.value = "0";
			else
				document.all.hDgSortCmd.value = "1";
			break;
		default:
			break;
	}
	
	IsServerHandling = true;
	
	__doPostBack('btSortOrder','');
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
	
	$('#tbTool').focus();
	xObjectName = event.target.id;
	
	strBtId = xObjectName;

	switch (xObjectName) {
		case "btOpen":
			GetSearchValue();
			CheckYearYear2();
			if (document.all.txUserId.value == "" && document.all.H_Emp_Name.value == "") {
				if ((document.all["dlDept"].value == "" && document.all["H_Dept_Name"].value == "") || (document.all.txYear.value == "" && document.all.txYear2.value == "")) {
					alert("原負責人為空時，必須輸入單位及年度欄位。");
					Page_BlockSubmit = true;
					return;
				}
			}
			if (document.all.txYear.value == "")
				document.all.txYear.value = document.all.txYear2.value;
			if (document.all.txYear2.value - document.all.txYear.value > 3) {
				alert("輸入年度差距不可超過3年。");
				Page_BlockSubmit = true;
				return;
			}

			CheckYearSeq();
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			GetSearchValue();
			if (ConfirmSave())//是否通過儲存前必要檢查
			{
				if (jf_ConfirmChange()) {
					IsServerHandling = true;
					jf_ShowWaitState();
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
				//Cola -- end --
			}
			else
				Page_BlockSubmit = true;
			
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			var tempOrgno = document.all.H_SOURCEORGNO.value;
			jf_ConfirmClean();
			document.all.H_SOURCEORGNO.value = tempOrgno;
			document.all.txUserName.textContent = "";
			document.all.txTranName.textContent = "";
			document.all.H_NewEmp_Name.value = "";
			$('#txUserId').focus();
			break;
		//批次匯入及單鍵設定負責單位、人員功能
		case "btImport":
			document.all["h_CsvFilePath"].click();
			Page_BlockSubmit = true;
			break;
		case "btDownLoadErr":
			Page_BlockSubmit = true;
			openDlg(document.all["h_SerErrFilePath"].value, jf_GetArtifact(), '0', 'ExportFormatType.Excel');
			break;
	}
}
function CheckYearYear2()
{
	if(document.all.txYear.value=="" && document.all.txYear2.value != ""){
		document.all.txYear.value = document.all.txYear2.value;}
		
		if(document.all.txYear2.value=="" && document.all.txYear.value != ""){
					document.all.txYear2.value = document.all.txYear.value;}
		if(document.all.txYear2.value!="" && document.all.txYear.value != ""){
			if(document.all.txYear.value>document.all.txYear2.value)
			{
				var temp = document.all.txYear2.value;
				document.all.txYear2.value = document.all.txYear.value;
				document.all.txYear.value =temp;
			}
			}
	
}

var strBtId = '';
function CallBack(argCallerId)
{
    
    var xObjectName = strBtId;
	//負責人
	if ((argCallerId=="IIC020") && (xObjectName == "btUser"))
	{
		document.all.txUserId.value  = document.all.lbReturnValue.options[0].value;
		CheckUser();
	}
	
	//移交人 
	if ((argCallerId=="IIC020") && (xObjectName == "btTran"))
	{
		document.all.txTranId.value  = document.all.lbReturnValue.options[0].value;
		CheckTran();
	}
	
	//lbReturnValue[0]=年度號
	//lbReturnValue[1]=分類號
	//lbReturnValue[2]=案次號
	//lbReturnValue[3]=案次號鍵值case_key
	//lbReturnValue[4]=分類號鍵值cls_key
	//lbReturnValue[5]=版本別
	//lbReturnValue[6]=分類號名稱
	if ( argCallerId == "EAC005" )
	{
		if(document.all.lbReturnValue.options[0].value!="undefined" && document.all.lbReturnValue.options[0].value != "")
			document.all.txYear.value = document.all.lbReturnValue.options[0].value;
		if(document.all.lbReturnValue.options[1].value!="undefined" && document.all.lbReturnValue.options[1].value != "")
			document.all.txCls.value = document.all.lbReturnValue.options[1].value;
		if(document.all.lbReturnValue.options[2].value!="undefined" && document.all.lbReturnValue.options[2].value != "")
			document.all.txCase.value = document.all.lbReturnValue.options[2].value;
	}
	//Eileen -- end
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	

}

function ClientOnLoad() {

	document.all["H_Dept"].value = document.all["dlDept"].value;
	document.all["H_Sect"].value = document.all["dlSect"].value;
	document.all["H_Dept_Value"].value = akjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = akjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
	document.all["H_dlSect_Value"].value = akjf_SaveCurrDL(document.all["dlSect"]);
	if (jf_GetActionMode() == LayoutModeNew) {
		document.all["Table5"].className = "hide";
		document.all["Table2"].className = "DivTable";
		document.all["btDownLoadErr"].disabled = true;
		if (document.all["h_SerErrFilePath"].value != "")
			document.all["btDownLoadErr"].disabled = false;
		document.all["btSetNrps"].className = "hide";
	}
	else {
		if (document.all["showCsvInfo"]) {
			document.all["Table5"].className = "DivTable";
			document.all["Table2"].className = "hide";
		}
		//顯示移交明細才提供
		if (document.all.cbDetail.checked) {
			document.all["btSetNrps"].className = "";
		}
		else
			document.all["btSetNrps"].className = "hide";
	}

	CheckUserId();
}

function OnWSResult(argResult,argByToolBar)	//Hank 1000450 因CheckTranId函式有宣告argByToolBar故這裡也要寫 
{
	//負責人員
	if (argResult.id == wsCheckUserID)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (argResult.value.EmpNo!="") 
			{
				document.all.txUserName.textContent = argResult.value.EmpName;
			}
			else
			{
			    
			    document.all.txUserName.textContent = "";
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["人員不存在"])),"");			
			    
				$('#txUserId').focus();
			}
		}
		else
		{
		    
		    document.all.txUserName.textContent = "";
			$('#txUserId').focus();
			Page_BlockSubmit = true;
			
		}
	}
	
	//移交人
	if (argResult.id == wsCheckTranID)
	{		
		if(fnIsWebServiceSuccess(argResult,argByToolBar))
		{
			if (argResult.value.EmpNo != "")
			{
				document.all.txTranId.value   = argResult.value.EmpNo;
			    
				document.all.txTranName.textContent = argResult.value.EmpName;
				document.all.H_NewEmp_Name.value = argResult.value.EmpName;
				
				return true;
			}
			else
			{
			    
				document.all.txTranName.textContent = "";
				document.all.H_NewEmp_Name.value = "";
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["人員不存在"])), "");
			    
				$('#txTranId').focus();
				return false ;
			}
		}
		else
		{
			document.all.txTranName.textContent = "";
			document.all.H_NewEmp_Name.value = "";
			$('#txTranId').focus();
			Page_BlockSubmit = true;
			return false ;//Hank 1000450 給函式回傳值來判定檢查是否成功		
		}
	}
	
	//分類號
	if (argResult.id == wsCheckClassID)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (!CallObj.value.ErrorClass.IsErr)
			{
				document.all.txClsName.value = argResult.value.RtnField0;
				//案次號有值才檢查
				if (jf_Trim(document.all.txCase.value) != "")
				{
					bClsSuccess = true;		//分類號成功
				}
			}
		}
		else
		{
			bClsSuccess = false;			//分類號失敗
			document.all.txClsName.value = "";
			$('#txCls').focus();
			Page_BlockSubmit  = true;	
		}
	}
	
	//案次號
	if (argResult.id == wsCheckCaseID)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (!CallObj.value.ErrorClass.IsErr)
			{
				document.all.txCaseName.value = argResult.value.CaseName;
				bCaseSuccess = true;		//案次號成功
			}
		}
		else
		{
			bCaseSuccess = false;			//案次號失敗
			document.all.txCaseName.value = "";
			$('#txCase').focus();
			Page_BlockSubmit = true;	
		}
	}
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
//1130927	Cloud	1130764 判斷是否為多對象移交
var bTranForRpss = false;
function ConfirmSave()
{
	var bRtnbool = false;
	//1130927	Cloud	1130764 判斷是否為多對象移交
	bTranForRpss = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		
		var bSetByPiece = false;
		if (document.all.cbDetail.checked) {
			//逐件移交模式檢核
			document.all.txCount.textContent = iCount;

			var nSetByPiecelist = [];
			var nTranCount = 0;
			for (i = 2; i < document.all.dg1.rows.length + 2; i++) {
				if (document.all["dg1__ctl" + i + "_txNrpsDeptNo"].value != "") {
					bSetByPiece = true;
					nTranCount++;
					bTranForRpss = true;
				}
				else {
					nSetByPiecelist[nSetByPiecelist.length] = document.all["dg1__ctl" + i + "_txDoc"].textContent;
				}
			}
			//有設定才做部分資料是否設定 及有沒有選了人沒設定的情況
			if (bSetByPiece) {
				var bPassSetValue = false;
				document.all.txCount.textContent = nTranCount;//實際有設定移交筆數
				//已經設定了部分公文，但移交設定仍有選值未設定
				if (document.all["NewdlDept_Text"].value != "" || document.all["NewdlSect_Text"].value != "" || document.all["NewdlEmp_Text"].value != "") {
					if (window.confirm("移交設定已有選擇負責單位、負責人但尚未設定，系統將移交已有設定新負責單位、人公文，是否繼續執行?")) {
						bPassSetValue = true;
					}
					return false;
				}
				//僅部分有設定的話 於跳出提示訊息確認後直接做移交
				if (nSetByPiecelist.length != 0) {
					var strShowMsg = "以下文號未設定新負責單位、人 ，是否略過移交處理?";

					for (var i = 0; i < nSetByPiecelist.length; i++) {
						if (strShowMsg != "")
							strShowMsg += "、";
						strShowMsg += nSetByPiecelist[i];
					}
					if (window.confirm(strShowMsg)) {
						document.all["h_SetRpsByPieces"].value = "TRUE";
						return true;
					}
					else//取消則啥都不做
						return false;
				}
				else {
					document.all["h_SetRpsByPieces"].value = "TRUE";
					return true;
				}
			}
			//全部資料都未設定
			else {
				//比照原行為，要檢核有勾選的才做移交
				if (CheckbSelected()) {
					var iCount = 0;
					for (i = 2; i < document.all.dg1.rows.length + 2; i++) {
						if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
							iCount++;
					}
					document.all.txCount.textContent = iCount;
				}
				else
					return false;
			}
		}
		if (!bSetByPiece)//未依設單件時，檢核整體資料是否設定
			bRtnbool = CheckBeforSave();
		else
			bRtnbool = true;
	}
	return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
	
	
	if (document.all.txTranId.value == "") {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["新負責人"])), "");
		$('#txTranId').focus();
		return false;
	}
	else
	{
        //移交人與負責人不可相同
		//新增批次匯入及單鍵設定負責單位、人員功能-匯入不檢核原負責人
		if (document.all.h_SerWorkPath.value == "" && document.all.h_SerWorkFile.value == "" && document.all.txUserId.value != "" && document.all.txTranId.value != ""  && document.all.txUserId.value == document.all.txTranId.value )
		{
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["原負責人跟新負責人不可相同"])), "");
			$('#txTranId').focus();
			return false;
		}
		if (document.all.H_SelectDpet.value == "")
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["未選擇角色單位所屬單位。"])), "");
			return false;
		}
		else
			return true;
	}
}

//移交詢問
function jf_ConfirmChange()
{

    var strCount    = document.all.txCount.textContent;
    var strTran = document.all.txTranName.textContent;
    var intTran = strTran.indexOf(')');    
    var strTranName = strTran.substring(intTran+1,strTran.length);
	
	if (bTranForRpss)
		return window.confirm("確定將 " + strCount + " 份公文移交? ");
	else
		return window.confirm("確定將 " + strCount + " 份公文移交給 " + strTranName + " ?");
}

//原負責人
function CheckUserId()
{
	if (document.all.txUserId.value == "")
	{
	    document.all.txUserName.textContent = "";
		return;
	}
	else
	{
		//call web service
		var param = new Array(1);
		param[0] = encodeURI(jf_Trim(document.all.txUserId.value));
		CallObj = jf_CallWS("LIB/AK_LIB.asmx","GetUserInfo",false,param);
		wsCheckUserID = CallObj.id;
		OnWSResult(CallObj);
	
	}
}

//新負責人
var bBulidlist = false;
function CheckTranId(argByToolBar)//Hank 1000450 宣告一個新的變數
{
	if (document.all.txTranId.value == "")
	{
		document.all.txTranName.textContent = "";
		document.all.H_NewEmp_Name.value = "";
		return;
	}
	else
	{
		if (argByToolBar == null)//Hank 1000450 設定當argByToolBar為空時預設為false
			bBulidlist = false;
		//call web service
		var param = new Array(1);
		
		var TEMPTINFO = AK.DFT400_NCUT.GetDeptId(jf_Trim(document.all.txTranId.value), jf_Trim(document.all.H_SOURCEORGNO.value)).value;
		if (TEMPTINFO.ErrMsg != "")
		{
		    alert(TEMPTINFO.ErrMsg);
		    document.all.txTranId.value = "";
			document.all.txTranName.textContent = "";
			document.all.H_NewEmp_Name.value = "";
		    document.all.H_SelectDpet.value = "";
		    return false;
		}
		else
		{
			if (!bBulidlist)
			{
				var userinfo = TEMPTINFO.EmpName.split('|');
				document.all.txTranName.textContent = userinfo[1];
				document.all.H_NewEmp_Name.value = userinfo[1];
				var arrDeptinfo = TEMPTINFO.DeptInfoList.split('|');
				document.all.H_SelectDpet.value = "";
				for( i=document.all.dlRoleDeptSect.length ; i>-1 ; i--)
					document.all.dlRoleDeptSect.remove(0);

				if (TEMPTINFO.DeptInfoList.indexOf('|') != -1)//兩個以上承辦人角色，增加空白
					document.all.dlRoleDeptSect.options.add(new Option("", ""));

				var Deptinfo;
				var DeptName = "";
				var DeptValue = "";
				for (i = 0 ; i < arrDeptinfo.length ; i++)
				{
					if (arrDeptinfo[i] == "")
						continue;
					Deptinfo = arrDeptinfo[i].split(';');
					if (Deptinfo[2] != "")
					{
						DeptName = Deptinfo[1] + "-" + Deptinfo[3];
						DeptValue = Deptinfo[0] + "-" + Deptinfo[2];
					}
					else
					{
						DeptName = Deptinfo[1];
						DeptValue = Deptinfo[0];
					}
					var objOption = new Option(DeptName, DeptValue);
					document.all.dlRoleDeptSect.options.add(objOption);
				}
				if (TEMPTINFO.DeptInfoList.indexOf('|') == -1)//單一承辦人角色，單位代碼直接放入隱藏欄位
					document.all.H_SelectDpet.value = DeptName + "|" + DeptValue;
				bBulidlist = true;
			}
			return true;
		}
	    //1071023   Cloud   1070946 新增角色所屬選單-E
	}
}

//年度
function CheckYear()
{
	//空白不檢查
	if (document.all.txYear.value == "")
		return;
	var strResult = jf_PADL(document.all.txYear.value,3,"0");
	document.all.txYear.value = strResult;
	
	if ((document.all.txCls.value != "") && (document.all.txCase.value != ""))
	{
		/*uncomplete
		CheckClass();
		*/	
	}
}
//0980814 Albert 0980429 增加檢查年度訖止值
function CheckYear2()
{
	//空白不檢查
	if (document.all.txYear2.value == "")
		return;
	var strResult = jf_PADL(document.all.txYear2.value,3,"0");
	document.all.txYear2.value = strResult;
}
//0980814 Albert 0980429 增加查詢前判定與修正年度號起訖值
function CheckYearSeq()
{
	if(document.all.txYear.value > document.all.txYear2.value)
	{
		var tmp = document.all.txYear.value
		document.all.txYear.value = document.all.txYear2.value;
		document.all.txYear2.value = tmp;
	}
}

//清除
function btClearDGClick()
{
	for (i=2;i<document.all.dg1.rows.length+2;i++)
	{
		document.all["dg1__ctl"+i+"_cbSelect"].checked = false;
	}
	document.all.txCount.textContent = 0;
}

//全選
function btSelectDGClick()
{
	for (i=2;i<document.all.dg1.rows.length+2;i++)
	{
		document.all["dg1__ctl"+i+"_cbSelect"].checked = true;
	}
	document.all.txCount.textContent = Number(document.all.lbCount.textContent);
}

//反向
function btChangeDGClick()
{
	for (i=2;i<document.all.dg1.rows.length+2;i++)
	{
		if (document.all["dg1__ctl"+i+"_cbSelect"].checked)
			document.all["dg1__ctl"+i+"_cbSelect"].checked = false;
		else
			document.all["dg1__ctl"+i+"_cbSelect"].checked = true;
	}
	document.all.txCount.textContent = Number(document.all.lbCount.textContent) - Number(document.all.txCount.textContent);
}

//cbSelect onclick()事件
function cbSelectClick()
{
    var xObjectName = event.target.id;
    var pNo = xObjectName.substring(8, xObjectName.indexOf("_cbSelect"));
	var pNoSelect   = "dg1__ctl"+pNo+"_cbSelect";   
	var iCount = 0;
	for (i = 2; i < document.all.dg1.rows.length + 2; i++) {
		if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
			iCount++;
	}
	document.all.txCount.textContent = iCount;
}

//1000450設計一個函式讓argByToolBar值為true時不顯示alert,false時顯示alert,為了修正錯誤訊訊息會顯示兩次的BUG 
function fnIsWebServiceSuccess(argResult,argByToolBar)
{
	if(argResult.error)
	{
	    alert(argResult.errorDetail.string);
	    return false;
	}
	else
	{
		obj = argResult.value;
		if(obj.ErrorClass.IsErr)
		{
			if( obj.ErrorClass.IsRedirect)
			{
			   jf_RedirectToCustomErrPage();
			}
			else
			{
			    if (!argByToolBar)
			        alert(obj.ErrorClass.ErrMessage[0]);
			}
						
			return false;
		}
	}
	
	return true;
	
}
function GetParam(p)
{
	var strUrl = document.location.toString();
	strUrl = unescape(strUrl);
	var rg_szItems = strUrl.split("?");
	if(rg_szItems.length==2)
	{
		var rg_szItems2 = rg_szItems[1].split("&");
		for(var i=0; i<rg_szItems2.length; i++)
		{
			var rg_items = rg_szItems2[i].split("=");
			if(rg_items[0] == "SAMLart")
				return rg_items[1];
		}
	}
}

//1031106 Gabby 增加單位下拉式選單相關處理函式

//記錄是否已檢核過有註冊onblur事件的欄位的值(通常發生在輸入完後直接按下儲存件時)
var bHasCheck = false;
function CheckDATE(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
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
		    $('#'+ argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
//DropDownList 處理

function dlDept_Text_onblur()
{
	var bCheckOK = false;
	if (document.all["dlDept"].value != document.all["H_Dept"].value)
	{
		//存ComboBox_Text的value
		document.all["H_Dept"].value = document.all["dlDept"].value;
		//存所選擇的ComboBox項目的value
		var arr=document.all["H_Dept"].value.split(":");
		document.all["H_Dept_Value"].value = arr[0];
		
	    //1031121 Gabby 如有二級單位選單，修改成須顯示(僅含一級單位)
        
		for (var i = 0; i < document.all["dlDept"].options.length; i++) {
		    if (document.all["dlDept_Text"].value == document.all["dlDept"].options[i].text) {
		        document.all["dlDept"].selectedIndex = i;
		        bCheckOK = true;
		        break;
		    }
		}
		if (bCheckOK) {
		    akjf_SetdlDept("dlDept", "dlSect", "dlEmp", "", false, true);
		    document.all["H_Sect"].value = document.all["dlSect"].value;
		    arr = document.all["H_Dept"].value.split(":");
		    document.all["H_Sect_Value"].value = arr[1];
		    document.all["H_dlSect_Value"].value = SaveCurrDL(document.all["dlSect"]);
		    document.all["H_dlEmp_Value"].value = SaveCurrDL(document.all["dlEmp"]);
		}
		else     
		    ClearDL("dlSect", "dlEmp");

	}
	if(document.all["dlSect"].options.length <=1)
	{
	    document.all["dlSect_Container"].disabled = true;
	}
	else
	    document.all["dlSect_Container"].disabled = false;
	return bCheckOK;
}

function dlSect_Text_onblur()
{
    var bCheckOK = false;
	var Inx = document.all["dlSect"].selectedIndex;
	//1131113	Cloud	測到bug一起修 
	if (Inx == 'undefined' || Inx == -1)
		return;


	var strSectText=document.all["dlSect"].options[Inx].text;
	//值若變更時作處理
	if (document.all["dlSect"].value != document.all["H_Sect"].value&&strSectText.indexOf("僅含一級單位")==-1)
	{
	    //1110819 Cloud 1110415 改用combobox
	    for (var i = 0; i < document.all["dlSect"].options.length; i++) {
	        if (document.all["dlSect_Text"].value == document.all["dlSect"].options[i].text) {
	            document.all["dlSect"].selectedIndex = i;
	            bCheckOK = true;
	            break;
	        }
	    }
	    if (bCheckOK) {
	        //存ComboBox_Text的value
	        document.all["H_Sect"].value = document.all["dlSect"].value;
	        //存所選擇的ComboBox項目的value
	        document.all["H_Sect_Value"].value = akjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
	        //1110818 Cloud 1110415 增加連動承辦人選單
	        akjf_SetdlSect("dlDept", "dlSect", "dlEmp", "", true, false);
	        //1110819 Cloud 1110415 增加紀錄承辦人
	        document.all["H_dlEmp_Value"].value = SaveCurrDL(document.all["dlEmp"]);
	    }
	    else {
	        ClearDL("dlSect", "");
	    }
	}
	else if(strSectText.indexOf("僅含一級單位")!=-1)
	{
		document.all["H_Sect"].value = strSectText;
		document.all["H_Sect_Value"].value = akjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
	    //1110818 Cloud 1110415 增加連動承辦人選單
		akjf_SetdlSect("dlDept", "dlSect", "dlEmp", "", false, false);
	}
		
	return bCheckOK;
}
//1031121 Gabby 將下拉選單裡的options轉成字串相加再回傳，格式： [項目Text;項目Value|項目Text;項目Value|...]
function SaveCurrDL(argSource)
{
	var strTemp = "";
	for(var i=0 ; i < argSource.options.length ; i++ )
	{
		if(argSource.options[i].text!="")
		{
			//僅含一級單位選項無value值，故在此另外判斷並加入隱藏dropdownlist，避免postback後無法將值keep在畫面上
			if(argSource.options[i].text.indexOf("僅含一級單位")==1)
				strTemp += argSource.options[i].text + ";"+"(僅含一級單位)|";
			else
				strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
		}
	}
	
	return strTemp.substr(0,strTemp.length-1);
}
//1031106 Gabby 增加單位下拉式選單相關處理函式----END
//1090331	Kevin_C	1090207	新增角色所屬單位選單
function dlRoleDeptSectonblur()
{
	document.all.H_SelectDpet.value = document.all.dlRoleDeptSect.options[document.all.dlRoleDeptSect.selectedIndex].text+"|"+document.all.dlRoleDeptSect.options[document.all.dlRoleDeptSect.selectedIndex].value;
}

//1110818 Cloud 1110415 -勾選修正91年前公文時限制年度迄為090-E
//1110818  Cloud 1110415 改為使用Combobox-S查詢前取得單位、人
function GetSearchValue() {
    var bDept = false;
    var bSect = false;
    var bEmp = false;

    for (var i = 0 ; i < document.all["dlDept"].length ; i++) {
        if (document.all["dlDept"].options[i].text == document.all["dlDept_Text"].value && document.all["dlDept_Text"].value != "") {
            document.all["dlDept"].selectedIndex = i;
            document.all["H_Dept"].value = document.all["dlDept"].options[i].value.split(':')[0];
            bDept = true;
            break;
        }
    }
    for (var i = 0 ; i < document.all["dlSect"].length ; i++) {
        if (document.all["dlSect"].options[i].text == document.all["dlSect_Text"].value && document.all["dlSect_Text"].value != "") {
            document.all["dlSect"].selectedIndex = i;
            //1110819 Cloud 1110415 增加判斷是否為僅含一級單位
            if (document.all["dlSect"].options[i].value!="")
                document.all["H_Sect"].value = document.all["dlSect"].options[i].value.split(':')[2];
            bSect = true;
            break;
        }
    }
    for (var i = 0 ; i < document.all["dlEmp"].length ; i++) {
        if (document.all["dlEmp"].options[i].text == document.all["dlEmp_Text"].value && document.all["dlEmp_Text"].value != "") {
            bEmp = true;
            break;
        }
    }
    
    if (!bDept) {
        document.all["dlDept"].selectedIndex = -1;
        document.all["H_Dept"].value = "";
        document.all["H_Dept_Name"].value = document.all["dlDept_Text"].value;
    }
    if (!bSect) {
        document.all["dlSect"].selectedIndex = -1;
        document.all["H_Sect"].value = "";
        document.all["H_Sect_Name"].value = document.all["dlSect_Text"].value;
        
        
	}
	/*
    if (!bEmp) {
		if(document.all["dlEmp"])
			document.all["dlEmp"].selectedIndex = -1;
        document.all["txUserId"].value = "";
        document.all["H_Emp_Name"].value = document.all["dlEmp_Text"].value;
    }
    else {
        if (document.all["dlEmp"] && document.all["dlEmp"].selectedIndex != -1)
            document.all["txUserId"].value = document.all["dlEmp"].options[document.all["dlEmp"].selectedIndex].value;
        else
            document.all["txUserId"].value = "";
    }
	*/
}
function NewdlDept_Text_onblur() {
    var bCheckOK = false;
    if (document.all["NewdlDept"].value != document.all["H_NewDept_value"].value) {
        //存ComboBox_Text的value
        document.all["H_NewDept_value"].value = document.all["NewdlDept"].value;
        //存所選擇的ComboBox項目的value
        var arr = document.all["H_NewDept_value"].value.split(":");
        document.all["H_NewDept_Selectvalue"].value = arr[0];

        for (var i = 0; i < document.all["NewdlDept"].options.length; i++) {
            if (document.all["NewdlDept_Text"].value == document.all["NewdlDept"].options[i].text) {
                document.all["NewdlDept"].selectedIndex = i;
                bCheckOK = true;
                break;
            }
        }
        if (bCheckOK) {
            akjf_SetdlDept("NewdlDept", "NewdlSect", "NewdlEmp", "OD99", false, false);
            document.all["H_NewDept_value"].value = "";
            document.all["H_Sect_Value"].value = "";
        }
        else
            ClearDL("NewdlSect", "NewdlEmp");

    }
    if (document.all["NewdlSect"].options.length <= 1) {
        document.all["NewdlSect_Container"].disabled = true;
    }
    else
        document.all["NewdlSect_Container"].disabled = false;
    return bCheckOK;
}

function NewdlSect_Text_onblur() {
    var bCheckOK = false;
    var Inx = document.all["NewdlSect"].selectedIndex;
    var strSectText = document.all["NewdlSect"].options[Inx].text;
    //值若變更時作處理
    if (document.all["NewdlSect"].value != document.all["H_NewSect_value"].value && strSectText.indexOf("僅含一級單位") == -1) {
        for (var i = 0; i < document.all["NewdlSect"].options.length; i++) {
            if (document.all["NewdlSect_Text"].value == document.all["NewdlSect"].options[i].text) {
                document.all["NewdlSect"].selectedIndex = i;
                bCheckOK = true;
                break;
            }
        }
        if (bCheckOK) {
            //存ComboBox_Text的value
            document.all["H_NewSect_value"].value = document.all["NewdlSect"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_NewSect_Selectvalue"].value = akjf_GetSelectValue(document.all["NewdlSect"], document.all["H_NewSect_value"].value);
            //增加連動承辦人選單
            akjf_SetdlSect("NewdlDept", "NewdlSect", "NewdlEmp", "OD99", false, false);
            
        }
        else {
            ClearDL("NewdlSect", "");
        }
    }
    else if (strSectText.indexOf("僅含一級單位") != -1) {
        document.all["H_NewSect_value"].value = strSectText;
        document.all["H_NewSect_Selectvalue"].value = akjf_GetSelectValue(document.all["NewdlSect"], document.all["H_NewSect_value"].value);
        akjf_SetdlSect("NewdlDept", "NewdlSect", "NewdlEmp", "OD99", false, false);
    }

    return bCheckOK;
}
var bDept = false;
var bSect = false;
var bEmp = false;
function GetSaveValue() {
	
	
	bDept = false;
    bSect = false;
    bEmp = false;

    for (var i = 0 ; i < document.all["NewdlDept"].length ; i++) {
        if (document.all["NewdlDept"].options[i].text == document.all["NewdlDept_Text"].value && document.all["NewdlDept_Text"].value != "") {
            document.all["NewdlDept"].selectedIndex = i;
            document.all["H_NewDept_Selectvalue"].value = document.all["dlDept"].options[i].value.split(':')[0];
            document.all["H_NewDept_Name"].value = document.all["NewdlDept_Text"].value;
            bDept = true;
            break;
        }
    }
    for (var i = 0 ; i < document.all["NewdlSect"].length ; i++) {
        if (document.all["NewdlSect"].options[i].text == document.all["NewdlSect_Text"].value && document.all["NewdlSect_Text"].value != "") {
            document.all["NewdlSect"].selectedIndex = i;
            document.all["H_NewSect_Selectvalue"].value = document.all["NewdlSect"].options[i].value.split(':')[2];
            document.all["H_NewSect_Name"].value = document.all["NewdlSect_Text"].value;
            bSect = true;
            break;
        }
    }
    for (var i = 0 ; i < document.all["NewdlEmp"].length ; i++) {
        if (document.all["NewdlEmp"].options[i].text == document.all["NewdlEmp_Text"].value && document.all["NewdlEmp_Text"].value != "") {
            bEmp = true;
            break;
        }
    }

    if (!bDept) {
        document.all["NewdlDept"].selectedIndex = -1;
        document.all["H_NewDept_Selectvalue"].value = "";
        document.all["H_NewDept_Name"].value = document.all["NewdlDept_Text"].value;
    }
    if (!bSect) {
        document.all["NewdlSect"].selectedIndex = -1;
        document.all["H_NewSect_Selectvalue"].value = "";
        document.all["H_NewSect_Name"].value = document.all["NewdlSect_Text"].value;
    }
    if (!bEmp) {
        if (document.all["NewdlEmp"])
            document.all["NewdlEmp"].selectedIndex = -1;
        document.all["txTranId"].value = "";
        document.all["H_NewEmp_Name"].value = document.all["NewdlEmp_Text"].value;
    }
    else {
        if (document.all["NewdlEmp"] && document.all["NewdlEmp"].selectedIndex != -1)
            document.all["txTranId"].value = document.all["NewdlEmp"].options[document.all["NewdlEmp"].selectedIndex].value;
        else
            document.all["txTranId"].value = "";
	}
}
//1110819 Cloud 增加函式清空選單
function ClearDL(argSectID, argEmpID)
{
    //清空
    var SectComboBoxObj = document.all[argSectID];
    var SectComboBoxTextObj = document.all[argSectID+"_Text"];
    var UserComboBoxObj = document.all[argEmpID];
    var UserComboBoxTextObj = document.all[argEmpID+"_Text"];
    if (SectComboBoxObj != null && SectComboBoxTextObj != null) {
        while (SectComboBoxObj.length > 0)
            SectComboBoxObj.remove(0);
        SectComboBoxObj.size = 2;
        SectComboBoxObj.options.add(new Option("", ""));
        SectComboBoxTextObj.value = "";
    }

    if (UserComboBoxObj != null && UserComboBoxTextObj != null) {
        while (UserComboBoxObj.length > 0)
            UserComboBoxObj.remove(0);
        UserComboBoxObj.size = 2;
        UserComboBoxObj.options.add(new Option("", ""));
        UserComboBoxTextObj.value = "";
    }
    return;

}
//1130927   Cloud   1130764 新增逐件設定鈕
function setNRps() {
	//檢核是否有勾選公文
	if (!CheckbSelected())
		return;
	//取得所選值
	//GetSaveValue();
	if (CheckBeforSave()) {
		var strHasRps = [];
		var strShowHasRps = [];
		
		for (i = 2; i < document.all.dg1.rows.length + 2; i++) {
			if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
				if (document.all["dg1__ctl" + i + "_txNrpsDeptNo"].value != "") {
						strHasRps[strHasRps.length] = i.toString();
						strShowHasRps[strShowHasRps.length] = document.all["dg1__ctl" + i + "_lbNo"].textContent;
				}
				else {
					setDgRpsInfo(i,"SET");
					
				}
			}
		}
		if (strHasRps.length != 0) {
			var strShowMsg = "";
			for (var i = 0; i < strShowHasRps.length; i++) {
				if (strShowMsg != "")
					strShowMsg += "、";
				strShowMsg += strShowHasRps[i];
			}
			strShowMsg = "序" + strShowMsg;
			strShowMsg += "，已有設定新負責單位、人，是否確定覆蓋?";
			if (window.confirm(strShowMsg)) {
				for (var i = 0; i < strHasRps.length; i++) {
					setDgRpsInfo(strHasRps[i],"SET");
				}
			}
		}
		document.all["NewdlDept"].selectedIndex = -1;
		document.all["NewdlSect"].selectedIndex = -1;
		document.all["NewdlEmp"].selectedIndex = -1;
		document.all["NewdlDept_Text"].value = "";
		document.all["NewdlSect_Text"].value = "";
		document.all["NewdlEmp_Text"].value = "";
		document.all["H_NewSect_value"].value = "";
		document.all["H_NewDept_value"].value = "";
		
	}

}
function CheckbSelected() {

	var bSelect = false;
	for (i = 2; i < document.all.dg1.rows.length + 2; i++) {
		if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
			bSelect = true;
			break;
		}
	}
	if (!bSelect)
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一份公文"])),"");
	return bSelect;
}
function setDgRpsInfo(argIndex,argMode) {

	var NDeptName = "";
	var NDeptNo = "";
	var NSeCtName = "";
	var NSeCtNo = "";
	var NRpsUser = "";
	var NRpsEmpname = "";
	//設定新選的人
	//單位
	if (argMode == "SET") {
		//單位
		NDeptName = document.all["dlRoleDeptSect"].item(document.all["dlRoleDeptSect"].selectedIndex).text.split('-')[0];
		NDeptNo = document.all["dlRoleDeptSect"].item(document.all["dlRoleDeptSect"].selectedIndex).value.split('-')[0];
		
		//科別
		if(document.all["dlRoleDeptSect"].item(document.all["dlRoleDeptSect"].selectedIndex).text.indexOf('-')!=-1)
			NSeCtName = document.all["dlRoleDeptSect"].item(document.all["dlRoleDeptSect"].selectedIndex).text.split('-')[1];
		if(document.all["dlRoleDeptSect"].item(document.all["dlRoleDeptSect"].selectedIndex).value.indexOf('-')!=-1)
			NSeCtNo = document.all["dlRoleDeptSect"].item(document.all["dlRoleDeptSect"].selectedIndex).value.split('-')[1];
		
		//人員
		NRpsUser = document.all["txTranId"].value;
		NRpsEmpname = document.all["txTranName"].textContent;
	}
	document.all["dg1__ctl" + argIndex + "_lbNrpsDept"].textContent = NDeptName;
	document.all["dg1__ctl" + argIndex + "_txNrpsDeptNo"].value = NDeptNo;
	document.all["dg1__ctl" + argIndex + "_txNrpsDeptName"].value = NDeptName;
	//科別
	if (NSeCtNo != "" || NSeCtName!="")
		document.all["dg1__ctl" + argIndex + "_lbNrpsDept"].textContent += "-" + NSeCtName;
	document.all["dg1__ctl" + argIndex + "_txNrpsSectNo"].value = NSeCtNo;
	document.all["dg1__ctl" + argIndex + "_txNrpsSectName"].value = NSeCtName;
	//人
	
		document.all["dg1__ctl" + argIndex + "_lbNrpsUserName"].textContent = NRpsEmpname;
	document.all["dg1__ctl" + argIndex + "_txNrpsUserName"].value = NRpsUser + ":" + NRpsEmpname;
	//設定完取消勾選
	document.all["dg1__ctl" + argIndex + "_cbSelect"].checked = false;

}
////1130927	Cloud	1130764	增加清除新負責單位、人資料功能
