/*
DATE 	SA		PRG		MGR_NO		DESC
1060426	Cloud	Joe		1050087 	二代系統升級
1110406 Leslie  Zen     1101499		(考試院)新增匯出Excel功能
1110408 Leslie  Zen     1101453		(考試院)新增版本、年度、分類號查詢條件
1140521 Cloud   Joeko   1140120     增加查詢欄位，退輔會新增客製化報表、Excel，統一增加ODS
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060426	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1110408 Zen 1101453 (考試院)新增版本、年度、分類號查詢條件
AjaxPro.Request.prototype.timeout = function ()
{
	try
	{
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false)
		{
			this.abort();
		} else
		{
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error)
	{

	}
	finally
	{

	}
}

function ShowMsg()
{
	//1060426	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].innerText != "")
		// alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();	
}

//1060426	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060426	Joe	1050087	二代系統升級
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
		//1110408 Zen 1101453 (考試院)新增版本、年度、分類號查詢條件
			case "ibtCLS":
			let strVerNo = document.all['txVerNo'].value;
			let strFileCls = document.all['txFileCls'].value;
			let strUrl = '../../EA/EA01/EAC005.aspx?MODE=1&VER_NO=' + strVerNo + '&FILE_CLS=' + strFileCls;
			jf_OpenChildWin(strUrl, "EAC005", 800, 600);
			break;
		//1140521   Joeko   1140120  增加查詢欄位，退輔會新增客製化報表、Excel，統一增加ODS
		case "ibtAcp":
			Page_BlockSubmit = true;
			ActionWin = xObjectName;
			var xUrl = "AKR330C2.aspx";
			jf_OpenChildWin(xUrl, "AKR330C2", 560, 520);
			break;
	}	
}

//1060426	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060426	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
		//1110406 Zen 1101499 (考試院)新增匯出Excel功能
		case "btExcel":
		//1140521   Joeko   1140120  增加查詢欄位，退輔會新增客製化報表、Excel，統一增加ODS
		case "btODS":
			//1110408 Zen 1101453 (考試院)新增版本、年度、分類號查詢條件，邏輯重構--begin
			//var Sdate=document.all["txFileDateS"].value;
			//var Edate=document.all["txFileDateE"].value;
		
			//if(Sdate=="" || Edate=="")
			//{
			//	alert("請指定歸檔日期"); 
			//	Page_BlockSubmit = true;
			//	if(Sdate=="")
			//	//1060426	Joe	1050087	二代系統升級，調整focus寫法
			//	//document.all["txFileDateS"].focus();
			//	$('#txFileDateS').focus();
			//	else
			//	//1060426	Joe	1050087	二代系統升級，調整focus寫法
			//	//document.all["txFileDateE"].focus();
			//	$('#txFileDateE').focus();
			//}
			//else
			//{
			//	if(Sdate>Edate)
			//	{
			//		alert("歸檔日期起不可以大於迄");
			//		//1060426	Joe	1050087	二代系統升級，調整focus寫法
			//		//document.all["txFileDateS"].focus();
			//		$('#txFileDateS').focus();
			//		Page_BlockSubmit = true;
			//	}
			//}
			Page_BlockSubmit = !CheckBeforeSearch();
			//1110408 Zen 1101453 (考試院)新增版本、年度、分類號查詢條件，邏輯重構--end

			//1060426	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{   //1140521   Joeko   1140120  增加查詢欄位，退輔會新增客製化報表、Excel，統一增加ODS--S
	//1110408 Zen 1101453 (考試院)新增版本、年度、分類號查詢條件
	//if (argCallerId)
	//{
	//	document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[5].value);
	//	document.all["txFileCls"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
	//}

	//if (document.all["lbReturnValue"].options != null)
	//	document.all["lbReturnValue"].options.length = 0;
	var lb = document.all["lbReturnValue"];
	if (!lb || lb.length === 0) return;

	switch (argCallerId) {
		case "EAC005":
			if (lb.options.length > 5)
				document.all["txVerNo"].value = jf_Trim(lb.options[5].value);
			if (lb.options.length > 1)
				document.all["txFileCls"].value = jf_Trim(lb.options[1].value);
			break;

		case "AKR330C2":
			// 新增點收批號欄位，通常會是 options[0]
			document.all["txAcpNo"].value = lb.options[0].value;
			break;

		default:
			console.warn("未知來源子視窗：" + argCallerId);
	}
	lb.options.length = 0;
	//1140521   Joeko   1140120  增加查詢欄位，退輔會新增客製化報表、Excel，統一增加ODS--E
}

function ClientOnLoad()
{
	ShowMsg();
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1060426	Joe	1050087	二代系統升級
	// document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}


//1110408 Zen 1101453 (考試院)新增版本、年度、分類號查詢條件，邏輯重構--begin
//function CheckDate(obj)
//{	
//	//1060426	Joe	1050087	傳入參數改為控制項ID
//	// if(obj.value=="")
//	if(document.all[obj].value=="")
//		return;
//	//1060426	Joe	1050087	日期欄位補0
//	document.all[obj].value = jf_PADL(document.all[obj].value,7,'0');
//	//1060426	Joe	1050087	傳入參數改為控制項ID
//	// if(!jf_CheckCDATE(obj.value))
//	if(!jf_CheckCDATE(document.all[obj].value))
//	{
//		var ErrName = new Array(1);
//		ErrName[0] = "日期";
//		alert(FormatStr(jf_GetErrMsg(InFormatErr2),ErrName));
//		//1060426	Joe	1050087	二代系統升級，調整focus寫法
//		//obj.focus();
//		$('#' + obj).focus();
//	}
//}
function CheckDate(argObj, argMsg, argFromTbtool, argLength) 
{
	var strErrMsg = '';
	var strDate = $('#' + argObj).val();
	if (strDate != '')
	{
		if (strDate.length < argLength) 
		{
			strDate = jf_PADL(strDate, argLength, '0');//YYYMMDD
			$('#' + argObj).val(strDate);
		}

		if (!jf_CheckCDATE(strDate)) 
		{
			strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
			if (argFromTbtool == false)
				jf_ShowMsg(strErrMsg, '');
		}
	}
	return strErrMsg;
}
//1110408 Zen 1101453 (考試院)新增版本、年度、分類號查詢條件，邏輯重構--end

//1110408 Zen 1101453 (考試院)新增版本、年度、分類號查詢條件，檢核版本、分類號關係
function CheckClsNo()
{
	let strSourceOrgno = document.all['H_txSourceOrgno'].value;
	let strVerNo = document.all['txVerNo'].value;
	let strFileCls = document.all['txFileCls'].value;
	if (strFileCls == '')
		return;

	let rtnObj = AK.DFR230.CheckClsNo(strSourceOrgno, strVerNo, strFileCls);

	if (rtnObj.value.strRtnMsg != '')
		alert(rtnObj.value.strRtnMsg);

	if (!rtnObj.value.bSuccess)
		$('#txFileCls')[0].focus();

	if (rtnObj.value.strVerNo != '')
		document.all['txVerNo'].value = rtnObj.value.strVerNo;
}

function CheckBeforeSearch()
{
	var strErrMsg = '';
	var strFileDateS = $('#txFileDateS').val();
	var strFileDateE = $('#txFileDateE').val();

	//1140521   Joeko   1140120  增加查詢欄位，退輔會新增客製化報表、Excel，統一增加ODS
	/*if (document.all['txFileYear'].value + document.all['txFileCls'].value + strFileDateS + strFileDateE == '')*/
		/*strErrMsg += '年度號、分類號、歸檔日期不可皆為空';*/
	if(document.all['txFileYear'].value + document.all['txFileCls'].value + strFileDateS + strFileDateE + document.all['txAcpNo'].value == '')
		strErrMsg += '年度、分類號、歸檔日期、點收批號不可皆為空';

	if (strFileDateS == '' && strFileDateE != '')
		$('#txFileDateS').val(strFileDateE);
	else if (strFileDateS != '' && strFileDateE == '')
		$('#txFileDateE').val(strFileDateS);
	else if (Number(strFileDateS) > (Number(strFileDateE))) 
	{
		$('#txFileDateS').val(strFileDateE);
		$('#txFileDateE').val(strFileDateS);
	}

	strErrMsg += CheckDate('txFileDateS', '歸檔日期(起)', true);
	strErrMsg += CheckDate('txFileDateE', '歸檔日期(訖)', true);

	if (strErrMsg != '')
	{
		alert(strErrMsg);
		return false;
	}

	return true;
}
	