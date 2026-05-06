//  2007.05.10   Cola	000260  新增原承辦人欄位，且可針對承辦人或公文文號做排序
//  2008.04.07	 Cola	0970245	修正Label 元素數值取法-應取innerText、修正跳出詢問視窗時，點選取消後，不會再post back回server端
//	2009.08.14	Albert	0980429	增加檢查年度訖止值
//  2010.06.29   Hank	1000450 修正輸入帳號沒有設定角色時應該要有的正確的錯誤訊息,並以alert方式顯示
//	2014.03.28	Eileen	1030182	清查將原使用AKC320分類號查詢改使用EAC005
//  2014.11.06  Gabby	1030742 增加一級單位與二級單位下拉式選單使移交公文搜尋範圍縮小
//	2014.11.21	Gabby	-------	如有二級單位選單，修改成須顯示(僅含一級單位)
//	2016.08.11	Justin	1050700	弱掃Client Potential Code Injection修正
//  1060414     Justin  1050087 二代公文修改
//  1060824     Zen     1060673 修正移交公文計數錯誤
//	1080619		Kevin_C	1080494	修正用分類號右邊的按鈕開EAC005查詢時，因年度、案號必定傳回空值而把原資料清空的問題
//	1090331		Kevin_C	1090207	MERGE[1070946]至二代，一併修正該單遇到有-的帳號會出錯的問題
//	1110818  	Cloud 	1110415 查詢即設定時改為支援使用輸入名字
//  1130926		Cloud	1130764	新增批次匯入及單鍵設定負責單位、人員功能
//  1131113		Cloud	勤益序52 勤益常態性的使用帳號查詢，故修改使用帳號查詢
var IsServerHandling = new Boolean();
IsServerHandling = false;

var wsCheckUserID;
var wsCheckTranID;
var wsCheckClassID;
var wsCheckCaseID;

var bClsSuccess  = true;
var bCaseSuccess = true;
var strUrl="";
//1060414 Justin [1050087] 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);

//1060824 Zen 1060673 補上jf_ShowValidator()避免無alert
jf_ShowValidator();
//  1130926		Cloud	1130764	新增批次匯入及單鍵設定負責單位、人員功能-S
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
//  1130926		Cloud	1130764	新增批次匯入及單鍵設定負責單位、人員功能-E

//1060414 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
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
		case "btUser"://負責人
		    strUrl = "http://" + document.all["SSOServer"].value + "/II/IIC020.aspx";
		    //1060414 Justin [1050087] 二代公文修改 
		    //jf_OpenChildWin(strUrl,"IIC020",500,500);
		    jf_OpenChildWin(strUrl, "IIC020", 800, 600);
			Page_BlockSubmit = true;
			break;
		case "btCls"://分類號
			//1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
			/*strUrl = "AKC320.aspx?rtnObj=lbReturnValue&k1="+document.all.txCls.value;
			jf_OpenChildWin(strUrl,"AKC320",700,500);*/
			strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=DFT400&MODE=1&SHOWALL=1&FILE_CLS="+jf_Trim(document.all.txCls.value)+"&SAMLart="+GetParam("SAMLart");
		    //1060414 Justin [1050087] 二代公文修改 
		    //jf_OpenChildWin(strUrl, "EAC005", 700, 500);
			jf_OpenChildWin(strUrl, "EAC005", 800, 600);
			//Eileen -- end
			Page_BlockSubmit = true;
			break;
		case "btCase"://案次號
			//1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
			/*strUrl = "AKC320.aspx?rtnObj=lbReturnValue&k1="+document.all.txCls.value;
			jf_OpenChildWin(strUrl,"AKC320",700,500);*/
			strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=DFT400&MODE=2&SHOWALL=1&FILE_CLS="+jf_Trim(document.all.txCls.value)+"&SAMLart="+GetParam("SAMLart");
		    //1060414 Justin [1050087] 二代公文修改 
		    //jf_OpenChildWin(strUrl, "EAC005", 700, 500);
			jf_OpenChildWin(strUrl, "EAC005", 800, 600);
			//Eileen -- end
			Page_BlockSubmit = true;
			break;
		case "btTran"://移交人
			strUrl = "http://" + document.all["SSOServer"].value + "/II/IIC020.aspx";
		    //1060414 Justin [1050087] 二代公文修改 
		    //jf_OpenChildWin(strUrl, "SYM020C1", 700, 500);
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
		//1130927	Cloud	1130764	增加清除新負責單位、人資料功能
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
//Cola 000260 --end--
//1060414 Justin [1050087] 二代公文修改 
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
	
	//Hank 1000450 點查詢後游標回到txTranId引發Onblur事件
    //1060414 Justin [1050087] 二代公文修改 
    //document.all.tbTool.focus();
    //xObjectName= window.event.srcNode.getAttribute("ID");
	$('#tbTool').focus();
	xObjectName = event.target.id;
	
    //1100204 Zen 1090927 取消使用document.activeElement
	strBtId = xObjectName;

	switch (xObjectName)
	{
		case "btOpen":
		    //Cola 000260 check for textbox. -- start --
		    //1110818 Cloud 1110415 -勾選修正91年前公文時限制年度迄為090
            //取得承辦單位承辦人
		    GetSearchValue();
			//1111003 Cloud 調整成先補上
			CheckYearYear2();
		    if (document.all["cbFix91Doc"].checked == true) {
		        if ((document.all.txUserId.value == "" && document.all.H_Emp_Name.value == "") && (document.all["dlDept"].value == "" && document.all["H_Dept_Name"].value == "")) {
		            alert("原負責人或單位欄位不能為空白");
					Page_BlockSubmit = true;
		            return;
		        }
		        //檢核年度起不可大於90 且差距不可超過5年
				//1110930 改成僅預帶不鎖死，因可能會需要僅查詢80~85之類的-故起迄都要檢查
				if (document.all.txYear.value == '' || document.all.txYear2.value == '')	
		        {
		            alert("年度起訖不可皆為空白。");
					Page_BlockSubmit = true;
		            return;
		        }
				
		        //if (document.all.txYear.value > '090' )
				if (document.all.txYear.value > '090' || document.all.txYear2.value > '090')	
		        {
		            alert("輸入年度不可超過90年。");
					Page_BlockSubmit = true;
		            return;
		        }
				if(document.all.txYear.value=="")
					document.all.txYear.value = document.all.txYear2.value;
		        if (document.all.txYear2.value-document.all.txYear.value >5) {
		            alert("輸入年度差距不可超過5年。");
					Page_BlockSubmit = true;
		            return;
		        }
		    }
		    else {
                //1110818 Cloud 1110415 擴充可僅輸入名字查詢
		        //if (document.all.txUserId.value == "")
		        //alert("原承辦人欄位不能為空白");
                //1110923 Cloud 1110415 檔管人員反映希望開放皆可透過年度+單位查詢，經協調開放92年後可變更3年
		        //if (document.all.txUserId.value == "" && document.all.H_Emp_Name.value == "") {
		        //alert("原負責人欄位不能為空白");
		        if (document.all.txUserId.value == "" && document.all.H_Emp_Name.value == "") 
				{
					if((document.all["dlDept"].value == "" && document.all["H_Dept_Name"].value == "") || (document.all.txYear.value == "" && document.all.txYear2.value=="") )
					{
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
		    }
			//1111003 Cloud 調整成先補上
			//CheckYearYear2();
			
			//Cola 000260 -- end --
			//0980814 Albert 0980429 查詢前要判斷年度號起訖值
			CheckYearSeq();
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1060414 Justin [1050087] 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			//[0970245]Add by Cola 補執行CheckTranId，避免使用者輸入新負責人後直接點選移交時，出現訊息錯誤
			//CheckTranId();		
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				if(jf_ConfirmChange())
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				//[0970245]Add by Cola 若選擇取消時，不post back回server端 -- start --
				else
					Page_BlockSubmit = true;
				//Cola -- end --
			}
			else
				Page_BlockSubmit = true;
		    //1060414 Justin [1050087] 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1060414 Justin [1050087] 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1060414 Justin [1050087] 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			//1090331	Kevin_C	1090207	保留隱藏欄位值
			var tempOrgno = document.all.H_SOURCEORGNO.value;
			jf_ConfirmClean();
			//1090331	Kevin_C	1090207	保留隱藏欄位值
			document.all.H_SOURCEORGNO.value = tempOrgno;
		    //1060414 Justin [1050087] 二代公文修改
		    //document.all["txUserId"].focus();
			document.all.txUserName.textContent = "";
			document.all.txTranName.textContent = "";
			$('#txUserId').focus();
			break;
		case "btSearch":
			//SAMPLE CODE
			/*
			var strUrl = "";
			xOldKey = document.all["txUserName"].value;
			strUrl = "SYM020C1.aspx?rtnObj=lbReturnValue&m=p&kv1="+xOldKey;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			jf_OpenChildWin(strUrl, "子視窗名稱", 700, 500 );
			*/
			break;
		case "btPrint":
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
			    Page_BlockSubmit = true;
		    //1060414 Justin [1050087] 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
			    Page_BlockSubmit = true;
		    //1060414 Justin [1050087] 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//  1130926		Cloud	1130764	新增批次匯入及單鍵設定負責單位、人員功能
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
//1100204 Zen 1090927 取消使用document.activeElement
var strBtId = '';
function CallBack(argCallerId)
{
    //1100204 Zen 1090927 取消使用document.activeElement
    //var xObjectName = document.activeElement.id;
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
	//1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
	/*//分類號
	if ((argCallerId=="AKC320") && (xObjectName == "btCls"))
	{
		if(document.all.lbReturnValue.options[1].text!="")
			document.all.txYear.value = document.all.lbReturnValue.options[1].text;
		document.all.txCls.value  = document.all.lbReturnValue.options[0].value;
		document.all.txCase.value = document.all.lbReturnValue.options[0].text;
	}
	
	//案次號
	if ((argCallerId=="AKC320") && (xObjectName == "btCase"))
	{
		if(document.all.lbReturnValue.options[1].text!="")
			document.all.txYear.value = document.all.lbReturnValue.options[1].text;
		document.all.txCls.value  = document.all.lbReturnValue.options[0].value;
		document.all.txCase.value = document.all.lbReturnValue.options[0].text;
	}*/
	//lbReturnValue[0]=年度號
	//lbReturnValue[1]=分類號
	//lbReturnValue[2]=案次號
	//lbReturnValue[3]=案次號鍵值case_key
	//lbReturnValue[4]=分類號鍵值cls_key
	//lbReturnValue[5]=版本別
	//lbReturnValue[6]=分類號名稱
	if ( argCallerId == "EAC005" )
	{
		//1080619	Kevin_C	1080494	修正用分類號右邊的按鈕開EAC005查詢時，因年度、案號必定傳回空值而把原資料清空的問題(點在資料夾圖案上會回傳undefined)
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

function ClientOnLoad()
{
    /*1060414 Justin [1050087] 二代公文修改 移除無用jf_CallWS
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要*/
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	
	//1031106 Gabby 增加單位下拉式選單相關處理函式
	document.all["H_Dept"].value = document.all["dlDept"].value;
	document.all["H_Sect"].value = document.all["dlSect"].value;
	document.all["H_Dept_Value"].value = akjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = akjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_dlSect_Value"].value = akjf_SaveCurrDL(document.all["dlSect"]);
	//Gabby--END
    //1060414 Justin [1050087] 二代公文修改
    //1110819 Cloud 1110415 不需要Check了改用combobox-原僅是為了帶出姓名
	/*if(document.all["txUserId"].value != "")
		CheckUserId();
	if(document.all["txTranId"].value != "")
	    CheckTranId();*/
    //1110818 Cloud 1110415 交通部增加客製化按鈕
	if (document.all["ORGNICKNANE"].value == "MOTC")
	    setFileyear();
	else
		document.all["cbFix91Doc"].checked = false;
	//1130926 Cloud	1130764 修改判斷新增模式隱藏資料-S
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
	//1130926 Cloud	1130764 修改判斷新增模式隱藏資料-E
	//  1131113		Cloud	勤益序52 勤益常態性的使用帳號查詢，故修改使用帳號查詢
	if (document.all["txUserId"].value != "" && document.all["ORGNICKNANE"].value =="NCUT")
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
				//  1131113		Cloud	勤益序52 勤益常態性的使用帳號查詢，故修改使用帳號查詢-不做重新放入-避免拉選單時被置換
			    //document.all.txUserId.value = argResult.value.EmpNo;
			    //1060414 Justin [1050087] 二代公文修改
			    //document.all.txUserName.value = argResult.value.EmpName;
				//  1131113		Cloud	勤益序52 勤益常態性的使用帳號查詢，故修改使用帳號查詢-會被選單擋到加個全形空白
			    //document.all.txUserName.textContent = argResult.value.EmpName;
				document.all.txUserName.textContent = "　"+argResult.value.EmpName;
			}
			else
			{
			    //1060414 Justin [1050087] 二代公文修改
			    //document.all.txUserName.value = "";
			    document.all.txUserName.textContent = "";
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["人員不存在"])),"");			
			    //1060414 Justin [1050087] 二代公文修改
				//document.all.txUserId.focus();
				$('#txUserId').focus();
			}
		}
		else
		{
		    //1060414 Justin [1050087] 二代公文修改
		    //document.all.txUserName.value = "";
		    //document.all.txUserId.focus();
		    document.all.txUserName.textContent = "";
			$('#txUserId').focus();
			Page_BlockSubmit = true;
			
		}
	}
	
	//移交人
	if (argResult.id == wsCheckTranID)
	{
		//if(jf_IsWebServiceSuccess(argResult))	//Hank 1000450 因為自己設計了一個函式所以隱藏
		if(fnIsWebServiceSuccess(argResult,argByToolBar))
		{
			if (argResult.value.EmpNo != "")
			{
				document.all.txTranId.value   = argResult.value.EmpNo;
			    //1060414 Justin [1050087] 二代公文修改
			    //document.all.txTranName.value = argResult.value.EmpName;
				document.all.txTranName.textContent = argResult.value.EmpName;
				return true;
			}
			else
			{
			    //1060414 Justin [1050087] 二代公文修改
			    //document.all.txTranName.value = "";
			    document.all.txTranName.textContent = "";
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["人員不存在"])), "");
			    //1060414 Justin [1050087] 二代公文修改
			    //document.all.txTranId.focus();
				$('#txTranId').focus();
				return false ;
			}
		}
		else
		{
		    //1060414 Justin [1050087] 二代公文修改
		    //document.all.txTranName.value = "";
		    //document.all.txTranId.focus();//會focus回txTranId欄位	
		    document.all.txTranName.textContent = "";
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
					//組dlVersion的集合字串,供server同步處理
					//document.all.lbHid.value = "";
					CheckCase();
				}
			}
		}
		else
		{
			bClsSuccess = false;			//分類號失敗
			document.all.txClsName.value = "";
		    //1060414 Justin [1050087] 二代公文修改
		    //document.all.txCls.focus();	
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
		    //1060414 Justin [1050087] 二代公文修改
			//document.all.txCase.focus();	
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
    //1060414 Justin [1050087] 二代公文修改
    //document.all[argLabelId].innerText = obj.value;
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
		//1130927	Cloud	1130764 僅逐件設定時不檢核各件是否設定對象-移交前再多檢查，將取值跟檢核分開
		//bRtnbool = CheckBeforSave();
		GetSaveValue();
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
				//(nSetByPiecelist.length)為0表示全資料都有設定-直接做移交
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
//1130930 Cloud 1130764 補強註解，此函示用途改為，單件設定前儲存改至ConfirmSave進行：
//1.整批移交(未顯示明細)、明細不做單件設定對象時，檢核整批移交對象資訊
//2.明細單件設定對象時檢核對象資訊。
function CheckBeforSave()
{
	//移交人不可空白檢查
	//1110819 Cloud 1110415整個改為使用combobox-如非修正91年前資料，則須新對象須選到承辦人
	//if (document.all.txTranId.value == "")
	//1130927 Cloud	1130764 將取值跟檢核分開-並調整勾選檢核-逐漸移交模式先檢核明細是否有設定
	//if (!GetSaveValue()) {
		//return false;
	//}
	
	if (document.all.txTranId.value == "" && document.all.cbFix91Doc.checked != true) {
		//1110819 Cloud 110415 配合修改名稱
		//jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["移交人"])),"");
		jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["新負責人"])), "");
		//1060414 Justin [1050087] 二代公文修改
		//document.all.txTranId.focus();
		//1110819 Cloud 1110415 修改使用combobox
		//$('#txTranId').focus();
		$('#NewdlEmp').focus();
		return false;
	}
	else
	{
        //移交人與負責人不可相同
        //1110819 Cloud 1110415  擴充以單位搜尋，先檢查是否空白
        //if (document.all.txUserId.value == document.all.txTranId.value)
		//  1130926		Cloud	1130764	新增批次匯入及單鍵設定負責單位、人員功能-匯入不檢核原負責人
        //if (document.all.txUserId.value == document.all.txTranId.value && document.all.txUserId.value != "" && document.all.txTranId.value!="")
		if (document.all.h_SerWorkPath.value=="" && document.all.h_SerWorkFile.value=="" && document.all.txUserId.value == document.all.txTranId.value && document.all.txUserId.value != "" && document.all.txTranId.value!="")
		{
		    //1110819 Cloud 110415 配合修改名稱
		    //jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["負責人跟移交人不可相同"])),"");
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["原負責人跟新負責人不可相同"])), "");
		    //1060414 Justin [1050087] 二代公文修改
		    //document.all.txTranId.focus();
		    //1110819 Cloud 1110415 修改使用combobox
		    //$('#txTranId').focus();
			$('#NewdlEmp').focus();
			return false;
		}
		else
		{
            //1110819 Cloud 1110415 修改使用combobox以下不需要了-增加取的新負責人帳號/姓名/單位，並檢核 非修正歷史資料時，必須選擇人-S
			/*if(!CheckTranId(true))//Hank 1000450 檢查新負責人是否有設定角色
				return false;
			//1090331	Kevin_C	1090207	新增角色所屬單位選單-S
			if (document.all.H_SelectDpet.value == "")
			{
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["未選擇角色單位所屬單位。"])), "");
			    return false;
			}*/
		    //1090331	Kevin_C	1090207	新增角色所屬單位選單-E
		    //檢核單位不可為空白
			//1130927 Cloud 1130764 將須設定為現存人員檢核移到這
			if (document.all["cbFixHDept"].checked != true && !bEmp) {
				alert("非修正承辦單位時，新負責單位需選擇現存單位、人，以免年度相關作業無法控管。");
				return false;
			}
            if (document.all["NewdlDept_Text"].value == "" && document.all["H_NewDept_Selectvalue"].value == "") {

		        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["新負責單位不可為空白。"])), "");
		        $('#NewdlEmp').focus();
		        return false;
		    }
		   
		    
		    //1110819 Cloud 1110415 修改使用combobox以下不需要了-增加取的新負責人帳號/姓名/單位，並檢核 非修正歷史資料時，必須選擇人-E
			//至少勾選一份公文檢查
			////1130927	Cloud	1130764 修改提前檢核
			//if (document.all.cbDetail.checked)
			//{
			//	
			//	var bSelect = false;
			//	for(i=2;i<document.all.dg1.rows.length+2;i++)
			//	{
			//		if (document.all["dg1__ctl"+i+"_cbSelect"].checked)
			//		{
			//			bSelect = true; 
			//			break;
			//		}
			//	}
			//	if (!bSelect)
			//	{
			//		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一份公文"])),"");
			//		return false;
			//	}
			//	else
			//		return true;
			//}
			//else
			//	return true;
			return true;
		}
	}
}

//移交詢問
function jf_ConfirmChange()
{
    //[0970245]Modify by Cola Label 元素應取innerText
    //1060414 Justin [1050087] 二代公文修改
    //var strCount    = document.all.txCount.innerText;
    //var strTran     = document.all.txTranName.value;
    var strCount    = document.all.txCount.textContent;
    var strTran = document.all.txTranName.textContent;
    var intTran = strTran.indexOf(')');
    //1110819 Cloud 1110415 修改使用combobox
    //var strTranName = strTran.substring(intTran+1,strTran.length);
    var strTranName = document.all["NewdlDept_Text"].value;
    if (document.all["NewdlSect_Text"].value != "")
        strTranName += "-" + document.all["NewdlSect_Text"].value;
    if (document.all["NewdlEmp_Text"].value != "")
        strTranName += "-" + document.all["NewdlEmp_Text"].value;
	//1130927	Cloud	1130764 判斷是否為單筆設定移交-則不跳人名
	if (bTranForRpss)
		return window.confirm("確定將 " + strCount + " 份公文移交? ");
	else
		return window.confirm("確定將 " + strCount + " 份公文移交給 " + strTranName + " ?");
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = false;
	
	return bRtnbool;
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

//原負責人
function CheckUserId()
{
	//  1131113		Cloud	勤益序52 勤益常態性的使用帳號查詢，故修改使用帳號查詢
	//if (document.all.txUserId.value == "")
	if (document.all.dlEmp_Text.value == "")
	{
	    //1060414 Justin [1050087] 二代公文修改
	    //document.all.txUserName.value = "";
	    document.all.txUserName.textContent = "";
		return;
	}
	else
	{
		//call web service
		var param = new Array(1);
		//1050811 Justin 1050700 弱掃Client Potential Code Injection修正
		//param[0] = jf_Trim(document.all.txUserId.value);
		//  1131113		Cloud	勤益序52 勤益常態性的使用帳號查詢，故修改使用帳號查詢
		//param[0] = encodeURI(jf_Trim(document.all.txUserId.value));
		param[0] = encodeURI(jf_Trim(document.all.dlEmp_Text.value));
		CallObj = jf_CallWS("LIB/AK_LIB.asmx","GetUserInfo",false,param);
		wsCheckUserID = CallObj.id;
		OnWSResult(CallObj);
	
	}
}

//新負責人
//1090331	Kevin_C	1090207	新增角色所屬單位選單
var bBulidlist = false;
function CheckTranId(argByToolBar)//Hank 1000450 宣告一個新的變數
{
	if (document.all.txTranId.value == "")
	{
	    //1060414 Justin [1050087] 二代公文修改
	    //document.all.txTranName.value = "";
	    document.all.txTranName.textContent = "";
		return;
	}
	else
	{
		if (argByToolBar == null)//Hank 1000450 設定當argByToolBar為空時預設為false
			//1090331	Kevin_C	1090207	新增角色所屬單位選單-檢核改為AJAX檢核
			//argByToolBar = false;
			bBulidlist = false;
		//call web service
		var param = new Array(1);
		//1050811 Justin 1050700 弱掃Client Potential Code Injection修正
		//param[0] = jf_Trim(document.all.txTranId.value);
		//1090331	Kevin_C	1090207	新增角色所屬單位選單-S-檢核改為AJAX檢核
		/*param[0] = encodeURI(jf_Trim(document.all.txTranId.value));
		CallObj = jf_CallWS("LIB/AK_LIB.asmx","GetUserInfo",false,param);
		wsCheckTranID = CallObj.id;
		return OnWSResult(CallObj,argByToolBar);*/
		var TEMPTINFO = AK.DFT400.GetDeptId(jf_Trim(document.all.txTranId.value), jf_Trim(document.all.H_SOURCEORGNO.value)).value;
		if (TEMPTINFO.ErrMsg != "")
		{
		    alert(TEMPTINFO.ErrMsg);
		    document.all.txTranId.value = "";
		    document.all.txTranName.textContent = "";
		    document.all.H_SelectDpet.value = "";
		    return false;
		}
		else
		{
			if (!bBulidlist)
			{
				var userinfo = TEMPTINFO.EmpName.split('|');
				document.all.txTranName.textContent = userinfo[1];
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
					//strDeptNo + ";" + strDeptName + ";" + strSectNo + ";" + strSeCTName
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
//分類號
function CheckCls()
{
	var strCls  = jf_Trim(document.all.txCls.value);
	var param       = new Array(5);
	var argKeyName  = new Array(1);
	var argKeyValue = new Array(1);
	var argRtnValue = new Array(1);
	var argRtnOrder = new Array(1);

	if (strCls == "")
		document.all.txClsName.value = "";
	else
	{
		if (bCaseSuccess)		//案次號成功才執行
		{/*
			argKeyName[0]  = "CLS_NO";
			argKeyValue[0] = jf_Trim(document.all.txCls.value);
			argRtnValue[0] = "CLS_NAME";
			argRtnOrder[0] = "CLS_NAME";
		
			param[0] = "CLASS_MAIN";
			param[1] = argKeyName;
			param[2] = argKeyValue;
			param[3] = argRtnValue;
			param[4] = argRtnOrder;
			CallObj = jf_CallWS("LIB/AK_LIB.asmx","GetFieldValue",false,param);
			wsCheckClassID = CallObj.id
			OnWSResult(CallObj);*/
		}
	}
}

//案次號
function CheckCase()
{
	var strCls  = jf_Trim(document.all.txCls.value);
	var strCase = jf_Trim(document.all.txCase.value);
	var	param   = new Array(3);
	var argYear = new Array(1);
	var argCls  = new Array(1);
	var argCase = new Array(1);
	var argKey  = new Array(1);
	
	if (strCase == "")
		document.all.txCaseName.value = "";
	else
	{
		if ((bClsSuccess) && (strCls != ""))		//分類號成功才執行
		{/*
			argYear[0] = jf_Trim(document.all.txYear.value);
			argCls[0]  = jf_Trim(document.all.txCls.value);
			argCase[0] = jf_Trim(document.all.txCase.value);
			argKey[0]  = "";
	
			param[0] = argYear;
			param[1] = argCls;
			param[2] = argCase;
			param[3] = argKey;
			CallObj = jf_CallWS("LIB/AK_LIB.asmx","CheckCaseMain",false,param);	
			wsCheckCaseID = CallObj.id;
			OnWSResult(CallObj);*/
		}
	}
}

//清除
function btClearDGClick()
{
	for (i=2;i<document.all.dg1.rows.length+2;i++)
	{
		document.all["dg1__ctl"+i+"_cbSelect"].checked = false;
	}
    //[0970245]Modify by Cola Label 元素應取innerText
    //1060414 Justin [1050087] 二代公文修改
	//document.all.txCount.innerText = 0;
	document.all.txCount.textContent = 0;
}

//全選
function btSelectDGClick()
{
	for (i=2;i<document.all.dg1.rows.length+2;i++)
	{
		document.all["dg1__ctl"+i+"_cbSelect"].checked = true;
	}
    //[0970245]Modify by Cola Label 元素應取innerText
    //1060414 Justin [1050087] 二代公文修改
	//document.all.txCount.innerText = Number(document.all.lbCount.innerText);
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
    //[0970245]Modify by Cola Label 元素應取innerText
    //1060414 Justin [1050087] 二代公文修改
	//document.all.txCount.innerText = Number(document.all.lbCount.innerText) - Number(document.all.txCount.innerText);
	document.all.txCount.textContent = Number(document.all.lbCount.textContent) - Number(document.all.txCount.textContent);
}

//cbSelect onclick()事件
function cbSelectClick()
{
    //1060414 Justin [1050087] 二代公文修改
    //var xObjectName = document.activeElement.id;
    //1060824 Zen 1060673 修正移交公文計數錯誤
    //var xObjectName = e.target.id;
    //1100204 Zen 1090927 取消使用document.activeElement
    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;
    var pNo = xObjectName.substring(8, xObjectName.indexOf("_cbSelect"));
	var pNoSelect   = "dg1__ctl"+pNo+"_cbSelect";
    //[0970245]Modify by Cola Label 元素應取innerText
    //1060414 Justin [1050087] 二代公文修改
    //var iCount      = Number(document.all.txCount.innerText);
	//1130927	Cloud	1130764	配合設定鈕，調整計算方式
	//var iCount = Number(document.all.txCount.textContent);
	//if (document.all[pNoSelect].checked)
	//	iCount += 1;
	//else
	//	iCount -= 1;
	var iCount = 0;
	for (i = 2; i < document.all.dg1.rows.length + 2; i++) {
		if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
			iCount++;
	}
    //[0970245]Modify by Cola Label 元素應取innerText
    //1060414 Justin [1050087] 二代公文修改
    //document.all.txCount.innerText = iCount;
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
			        //1060414 Justin [1050087] 二代公文修改
			        //alert( obj.ErrorClass.ErrMessage[0].text);
			        alert(obj.ErrorClass.ErrMessage[0]);
			}
						
			return false;
		}
	}
	
	return true;
	
}
//1030328 Eileen [1030182] 取得SAMLart網址參數
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
		    //1060414 Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
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
        //1110818 Cloud 1110415 修改改為使用combobox並增加判斷是否存在再作連動
	    //akjf_SetdlDropDownListDept(document.all["H_Dept_Value"].value,"dlSect",false,true);	//初始dlSect、dlUser的處理
	    //function akjf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
        
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
		    //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
		    document.all["H_dlSect_Value"].value = SaveCurrDL(document.all["dlSect"]);
		    //1110819 Cloud 1110415 增加紀錄承辦人
		    document.all["H_dlEmp_Value"].value = SaveCurrDL(document.all["dlEmp"]);
		}
		else     
		    ClearDL("dlSect", "dlEmp");

	}
	if(document.all["dlSect"].options.length <=1)
	{
	    //1110818 Cloud 1110415 修改改為使用combobox
	    //document.all["dlSect"].disabled=true;
	    document.all["dlSect_Container"].disabled = true;
	}
	else
	    //1110818 Cloud 1110415 修改改為使用combobox
	    //document.all["dlSect"].disabled=false;
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
//1110818 Cloud 1110415 -勾選修正91年前公文時限制年度迄為090-S
function setFileyear()
{
    if (document.all["cbFix91Doc"].checked == true) {
		if(document.all["txYear2"].value=="")
			document.all["txYear2"].value = "090";
		//1110930 改成僅預帶不鎖死，因可能會需要僅查詢80~85之類的
        //document.all["txYear2"].disabled = true;
    }
    else {
        //1110930 改成僅預帶不鎖死，因可能會需要僅查詢80~85之類的
        //document.all["txYear2"].value = "";
        //document.all["txYear2"].disabled = false;
    }
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
            //不須重建-此段可能不需要
            //document.all["H_dlSect_Value"].value = SaveCurrDL(document.all["NewdlSect"]);
            //document.all["H_dlEmp_Value"].value = SaveCurrDL(document.all["dlEmp"]);
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
            //不須重建-此段可能不需要
            //document.all["H_dlEmp_Value"].value = SaveCurrDL(document.all["dlEmp"]);
        }
        else {
            ClearDL("NewdlSect", "");
        }
    }
    else if (strSectText.indexOf("僅含一級單位") != -1) {
        document.all["H_NewSect_value"].value = strSectText;
        document.all["H_NewSect_Selectvalue"].value = akjf_GetSelectValue(document.all["NewdlSect"], document.all["H_NewSect_value"].value);
        //1110819 Cloud 1110415 連動承辦人
        akjf_SetdlSect("NewdlDept", "NewdlSect", "NewdlEmp", "OD99", false, false);
    }

    return bCheckOK;
}

//1130927	Cloud	1130764 -將取值與檢核拆開
var bDept = false;
var bSect = false;
var bEmp = false;
function GetSaveValue() {
	
	//1130927	Cloud	1130764 -將取值與檢核拆開
    //var bDept = false;
    //var bSect = false;
    //var bEmp = false;
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
	//1130927	Cloud	1130764 把檢核跟取值拆開方便逐件設定取值
	//if (document.all["cbFixHDept"].checked != true && !bEmp) {
	//	alert("非修正承辦單位時，新負責單位需選擇現存單位、人，以免年度相關作業無法控管。");
	//	return false;
	//}
	//else {

	//	return true;
	//}
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
	GetSaveValue();
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
		//1131004 Cloud	1130764 -增加清空記錄到的選得值，避免切換再次選同科時不會更新選單
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
		NDeptName = document.all["H_NewDept_Name"].value;
		NDeptNo = document.all["H_NewDept_Selectvalue"].value;
		NSeCtName = document.all["H_NewSect_Name"].value;
		NSeCtNo = document.all["H_NewSect_Selectvalue"].value;
		if (document.all["NewdlEmp"].selectedIndex != -1) {
			NRpsUser = document.all["NewdlEmp"].options[document.all["NewdlEmp"].selectedIndex].value;
			NRpsEmpname = NRpsUser.split(':')[3];
		}
		else
			NRpsEmpname = document.all["H_NewEmp_Name"].value;
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
	if (document.all["NewdlEmp"].selectedIndex != -1) {
		document.all["dg1__ctl" + argIndex + "_lbNrpsUserName"].textContent = NRpsEmpname;
		document.all["dg1__ctl" + argIndex + "_txNrpsUserName"].value = NRpsUser;
	}
	else {
		document.all["dg1__ctl" + argIndex + "_lbNrpsUserName"].textContent = NRpsEmpname;
		document.all["dg1__ctl" + argIndex + "_txNrpsUserName"].value = NRpsEmpname;
	}
	//設定完取消勾選
	document.all["dg1__ctl" + argIndex + "_cbSelect"].checked = false;

}
////1130927	Cloud	1130764	增加清除新負責單位、人資料功能
