/*
DATE	SA		PRG		MGR_NO			DESC
0960814	Stella	Cola	001435			新增清除鍵
0961204	Stella	Yvonne	001642			來文機關可用關鍵字的方式進行查詢
1000216	------	Bill	1000158			為避免造成DB負擔，部份欄位改成與其他欄位複合查詢，不可單獨查詢
1011218	------	Jagle	1010976			增加簽核類型條件、增加傳送時間條件、增加排序方式(依承辦單位+公文文號)、增加依承辦單位分頁選項
1050415	David	Zen		1050087			二代公文修改
1060524	David	David	1060109			新增來源註記查詢欄位
1070928	David	Kevin_C	1070898			報表增加顯示查詢條件
1071017 Kevin   Zen     1070678         弱掃Client Potential XSS修正
1100702 Kevin   Zen     1100561         (高雄大學)新增匯出Excel功能
1140612 Zen     Joeko   1140075         新增辦理情形結案別、匯出ODS功能，退輔會客製化報表
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050415 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

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
		case "btHelp":
			var strUrl = "";
			var CurrOrgNameObj = document.all["txOrgno"].value;
		    //1050714 Zen 1050087 WEM010C1子視窗修改--begin
		    //strUrl = "WEM010C1.aspx?OrgID=" + document.all["H_Orgno"].value + "&K1=Dlg_Dept&Search=" + escape(CurrOrgNameObj);//Yvonne 避免亂碼情況發生
			var path = document.all.H_Wed010C1Path.value;
			strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.H_Orgno.value + "&K1=WEM010";
		    //1050714 Zen 1050087 WEM010C1子視窗修改--end
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
			Page_BlockSubmit=true;
			break;
		//1050415 Zen 1050087 二代公文修改
        /*
		case "btRcvDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
			break;
		case "btRcvDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
			break;
		case "btFromDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txFromDateS, event.screenX, event.screenY);
			break;
		case "btFromDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txFromDateE, event.screenX, event.screenY);
			break;
		case "btSrcRcvDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSrcRcvDateS, event.screenX, event.screenY);
			break;
		case "btSrcRcvDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSrcRcvDateE, event.screenX, event.screenY);
			break;
		*/
	}	
}
//1050415 Zen 1050087 二代公文修改
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
    //function jf_ToolBarHandle()
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			if (document.all.dg1)
			{
				document.all.dg1.outerHTML = "";
			}
			//Page_BlockSubmit = false;
			//Yvnne 001642---查詢、預覽、列印的檢查動作應一致
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1050415 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
			//Cola 001435 新增 清除 鍵 -- start --
		case "btClean":
			Page_BlockSubmit = true;
			/*document.all.rb1.readOnly = true;
			document.all.rb2.readOnly = true;
			document.all.rb3.readOnly = true;
			document.all.rb4.readOnly = true;*/
			document.all.rbCommon.readOnly = true;
			document.all.rbSec.readOnly = true;
			document.all.rbSecAll.readOnly = true;
			jf_ConfirmClean();
			/*document.all.rb1.readOnly = false;
			document.all.rb2.readOnly = false;
			document.all.rb3.readOnly = false;
			document.all.rb4.readOnly = false;*/
			document.all.rbCommon.readOnly = false;
			document.all.rbSec.readOnly = false;
			document.all.rbSecAll.readOnly = false;	
			document.all.rbSecAll.checked = true;	
			//document.all.rb1.checked = true;
			//0961008 Stella 修正清除時下拉選單會清空且來文機關沒清到
			document.all.dlDocSource.selectedIndex = 1;
			document.all.txOrgName.value = "";
		    //1050603 Zen 1050087 二代公文修改
			//document.all["txDocNoS"].focus();
			$('#txDocNoS').focus();
			break;			
			//Cola -- end --
		case "btPrint":
        case "btPreview":
        //1100702 Zen 1100561 (高雄大學)新增匯出Excel功能
		case "btExcel":
		//1140612  Joeko   1140075   新增匯出ODS功能
		case "btODS":
			bMsg = true;
			Page_BlockSubmit = !CheckBeforeSearch();
			/*
			if (CheckOrgno())
				Page_BlockSubmit = !CheckBeforeSearch();
			else
				Page_BlockSubmit = true;
			*/
		    //1050415 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

var argCallerId;
function CallBack(argCallerId)
{
	if (argCallerId == "WEM010C1")
	{
		var DeptInfo = document.all["lbReturnValue"].options[0].value;
	    //1050714 Zen 1050087 WEM010C1子視窗修改
		//var DeptArray = DeptInfo.split(',');
		var DeptArray = DeptInfo.split('^');
		document.all["txOrgno"].value  = DeptArray[2];
		document.all["txOrgName"].value= DeptArray[1];
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

var bMsg = true;
var wsGetOrgNameID;//宣告webserver回傳值id
function CheckOrgno()
{
	var bRtn = true;
	var strOrgno = jf_Trim(document.all["txOrgno"].value);
	if (strOrgno != "")
	{
		if (bMsg)
		{
			var arWSParam = new Array(4);
			arWSParam[0] = strOrgno;
			arWSParam[1] = document.all["H_Orgno"].value;
			arWSParam[2] = document.all["H_DeptNo"].value;
			arWSParam[3] = document.all["H_UserId"].value;
			callObj = jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, arWSParam);
			wsGetOrgNameID = callObj.id;
			bRtn = OnWSResult(callObj);
		}
		else
			bMsg = true;
	}
	else
		document.all["txOrgName"].value = "";
	return bRtn;
}

function OnWSResult(argResult)
{
	var bWSRtn = false;
    if (argResult.id == wsGetOrgNameID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			if(!argResult.value.ErrorClass.IsErr)
			{
				if(argResult.value.Count > 0)
				{
					bWSRtn = true;
					document.all["txOrgno"].value = jf_Trim(argResult.value.OrgID[0]);
					document.all["txOrgName"].value = jf_Trim(argResult.value.OrgName[0]);
				}
				else
				{
					bWSRtn = false;
					if (event.type == "buttonclick")
						bMsg = false;//不再show第二次訊息
					//Yvonne 001642
					//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["無此機關代碼"])),"");
					document.all["txOrgName"].value="";
					//document.all["txOrgno"].focus();
				}
			}
			else
			{
				bWSRtn = false;
				alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
			    //1050603 Zen 1050087 二代公文修改
				//document.all["txOrgno"].focus();
				$('#txOrgno').focus();
			}
		}
	}
	return bWSRtn;
}

function ClientOnLoad()
{
    //1050418 Zen 1050087 二代公文修改
	//jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, null);
	//1011218	Jagle	[1010976]	設定依承辦單位分頁選項是否啟用
	OrderChange(document.all.ddlOrder.selectedIndex);

	//1060524 David 1060109 新增來源註記查詢欄位，新增對應event
	ddlSource_onchange(true);
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050415 Zen 1050087 二代公文修改
    //document.all[argLabelId].innerText = obj.value;
    //1071017 Zen 1070678 弱掃Client Potential XSS修正
	//document.all[argLabelId].innerHTML = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function CheckBeforeSearch()
{
	var bRtnBool = true;
	var strSDoc     = document.all.txDocNoS.value;
	var strEDoc     = document.all.txDocNoE.value
	var strSRcvDate = document.all.txRcvDateS.value;
	var strERcvDate = document.all.txRcvDateE.value;
	var strSFromDate= document.all.txFromDateS.value;
	var strEFromDate= document.all.txFromDateE.value;
	var strDept     = document.all["dlDept_Text"].value;
	var strOrgno    = document.all["txOrgno"].value;
	var strFromNo   = document.all["txFromNo"].value;
	//2004-06-18 add
	var strSrcRcvDateS   = document.all["txSrcRcvDateS"].value;
	var strSrcRcvDateE   = document.all["txSrcRcvDateE"].value;
	var strSrcRcvNoS   = document.all["txSrcRcvNoS"].value;
	var strSrcRcvNoE   = document.all["txSrcRcvNoE"].value;
	
	//Yvonne 001642---start
	var strOrgName = document.all.txOrgName.value;
	var objPattern = /\*/;
	var objPattern2 = /[^a-zA-Z0-9]/;

	//來文機關不建於ORGMAIN中 檢查是否含有*
	if (objPattern.test(strOrgno))//有*
	{
		if (strSDoc+strEDoc+strSRcvDate+strERcvDate+strSFromDate+strEFromDate+strDept=="")
		{
			bRtnBool = false;
			jf_ShowMeg("請增加查詢條件！","")
		}
	}

	//來文機關不建於ORGMAIN中且欄位值僅有英文或數字
	if (!objPattern2.test(strOrgno) && strOrgno!="" && strOrgName=="")//代碼
	{
		bRtnBool = false;
		jf_ShowMeg("查無符合資料。\n若您輸入的是來文機關代碼，請先至機關查詢子視窗中查詢對應的機關名稱後，\n再進行本作業。\n\n本作業不提供以機關代碼為關鍵字的查詢功能。","")
	}
	//Yvonne 001642---end
	
	//1000216	[1000158]	Bill	為避免造成DB負擔，部份欄位改成與其他欄位複合查詢，不可單獨查詢
	//-----start-----
	//來源收文文號+收文日期=>當成複合查詢條件，以縮小查詢資料回覆量
	if (strSDoc+strEDoc+strSRcvDate+strERcvDate+strSFromDate+strEFromDate+strDept+strOrgno+strFromNo+strSrcRcvDateS+strSrcRcvDateE=="")
	{
		if(strSrcRcvNoS+strSrcRcvNoE!="")
		{
			bRtnBool = false;
		    //1050603 Zen 1050087 二代公文修改
			//document.all.txSrcRcvNoS.focus();
			$('#txSrcRcvNoS').focus();
			var strErrMsg = "為避免影響他人作業，請至少輸入『來源收文文號』與『收文日期』以縮小查詢範圍!!";
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		}
	}
	//來源收文日期+來文機關 or 來源收文日期+來源機關=>當成複合查詢條件，以縮小查詢資料回覆量
	if (strSDoc+strEDoc+strSRcvDate+strERcvDate+strSFromDate+strEFromDate+strDept+strOrgno+strFromNo+strSrcRcvNoS+strSrcRcvNoE=="")
	{
		if(strSrcRcvDateS+strSrcRcvDateE!="")
		{
			bRtnBool = false;
		    //1050603 Zen 1050087 二代公文修改
			//document.all.txSrcRcvDateS.focus();
			$('#txSrcRcvDateS').focus();
			var strErrMsg = "為避免影響他人作業，請至少輸入『來源收文日期』與『來文機關』，或是『來源收文日期』與『收文日期』以縮小查詢範圍!!";
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		}
	}
	//來文機關+收文日期=>當成複合查詢條件，以縮小查詢資料回覆量
	if (strSDoc+strEDoc+strSRcvDate+strERcvDate+strSFromDate+strEFromDate+strDept+strFromNo+strSrcRcvDateS+strSrcRcvDateE+strSrcRcvNoS+strSrcRcvNoE=="")
	{
		if(strOrgno!="")
		{
			bRtnBool = false;
		    //1050603 Zen 1050087 二代公文修改
			//document.all.txRcvDateS.focus();
			$('#txRcvDateS').focus();
			var strErrMsg = "為避免影響他人作業，請至少輸入『來文機關』與『收文日期』以縮小查詢範圍!!";
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		}
	}
	//來文日期+收文日期=>當成複合查詢條件，以縮小查詢資料回覆量
	if (strSDoc+strEDoc+strSRcvDate+strERcvDate+strDept+strOrgno+strFromNo+strSrcRcvDateS+strSrcRcvDateE+strSrcRcvNoS+strSrcRcvNoE=="")
	{
		if(strSFromDate+strEFromDate!="")
		{
			bRtnBool = false;
		    //1050603 Zen 1050087 二代公文修改
			//document.all.txFromDateS.focus();
			$('#txFromDateS').focus();
			var strErrMsg = "為避免影響他人作業，請至少輸入『來文日期』與『收文日期』以縮小查詢範圍!!";
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		}
	}
	//------end------

	if (strSDoc+strEDoc+strSRcvDate+strERcvDate+strSFromDate+strEFromDate+strDept+strOrgno+strFromNo+strSrcRcvDateS+strSrcRcvDateE+strSrcRcvNoS+strSrcRcvNoE=="")
	{
		bRtnBool = false;
	    //1050603 Zen 1050087 二代公文修改
		//document.all.txRcvDateS.focus();
		$('#txRcvDateS').focus();
		var strErrMsg = "公文文號、收文日期、來文日期、來源收文文號、來源收文日期、分文單位、來文機關及來文字號至少要輸入一組資料!!";
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
	}
	return bRtnBool;
}

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
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
		    //1050603 Zen 1050087 二代公文修改
			//document.all[argObj].focus();
			$('#'+argObj).focus();
		}
	}
}

//1011218	Jagle	[1010976]	傳送時間下拉選單OnChange
function TimeChange(argValue)
{
	if(argValue==1)
	{
		document.all.txSendTimeS.value="0700";
		document.all.txSendTimeE.value="1300";
	}
	else if(argValue==2)
	{
		document.all.txSendTimeS.value="1301";
		document.all.txSendTimeE.value="2200";
	}
	else
	{
		document.all.txSendTimeS.value="";
		document.all.txSendTimeE.value="";
	}
}

//1011218	Jagle	[1010976]	檢核時間格式
function checkTime(argName)
{
	if(document.all[argName].value.length == 3)
		document.all[argName].value="0"+document.all[argName].value;
	if(document.all[argName].value.length != 4 && document.all[argName].value.length > 0)
	{
		alert("時間格式不正確");
	    //1050603 Zen 1050087 二代公文修改
		//document.all[argName].focus();
		$('#'+argName).focus();
		return false;
	}
	var time1=document.all[argName].value.substr(0,2);
	var time2=document.all[argName].value.substr(2,2);
	if(time1 != "")
		if(time1<"00" || time1>"23")
		{
			alert("時間格式不正確");
		    //1050603 Zen 1050087 二代公文修改
		    //document.all[argName].focus();
			$('#' + argName).focus();
			return false;
		}
		
	if(time2 != "")
		if(time2<"00" || time2>"59")
		{
			alert("時間格式不正確");
		    //1050603 Zen 1050087 二代公文修改
		    //document.all[argName].focus();
			$('#' + argName).focus();
			return false;
		}
}

//1011218	Jagle	[1010976]	排序方式OnChange
function OrderChange(argValue)
{
	if (argValue == 3)
	//1140612     Joeko   1140075      若排序選擇承辦單位，自動勾選依承辦單位跳頁
	{
		document.all.cbPagedBy.disabled = false;
		document.all.cbPagedBy.checked = true;
	}
	else
	{
		document.all.cbPagedBy.checked=false;
		document.all.cbPagedBy.disabled=true;
	}
}

//1060524 David 1060109 新增來源註記查詢欄位，新增對應event
function ddlSource_onblur()
{
	ddlSource_onchange();
}

//1060524 David 1060109 新增來源註記查詢欄位，新增對應event
function ddlSource_onchange(argInit)
{
	document.all["dlRcvtypeDesc"].options.length = 0;
	document.all["dlRcvtypeDesc"].options.add(new Option("",""));

	if(!argInit)
		document.all.H_txRcvTyprDescNo.value = "";

	if(GetDDLValue(document.all.ddlSource,0) == "")
	{
		document.all["H_dlAllRcvtypeDesc"].selectedIndex = 0;
	}
	else
	{
		for(var i = 0; i < document.all["H_dlAllRcvtypeDesc"].length; i++)
		{
			if (GetValueFromValueArray(document.all["H_dlAllRcvtypeDesc"].options[i].value,0) == document.all.ddlSource.options[document.all.ddlSource.selectedIndex].value)
			{
				var strRcvTypeDescNo = document.all["H_dlAllRcvtypeDesc"].options[i].value.split(",")[1];

				var opt = document.createElement("option");
				opt.text = document.all["H_dlAllRcvtypeDesc"].options[i].text;
				opt.value = strRcvTypeDescNo;
				document.all["dlRcvtypeDesc"].options.add(opt);
			}
		}

		if(argInit && document.all.H_txRcvTyprDescNo.value != "")
		{
			for(var i = 0; i < document.all["dlRcvtypeDesc"].length; i++)
			{
				if(document.all.H_txRcvTyprDescNo.value == document.all["dlRcvtypeDesc"].options[i].value)
				{
					document.all["dlRcvtypeDesc"].selectedIndex = i;
					break;
				}
			}
		}
	}
}

//1060524 David 1060109 新增來源註記查詢欄位
function dlRcvtypeDesc_onblur()
{
	dlRcvtypeDesc_onchange();
}

//1060524 David 1060109 新增來源註記查詢欄位
function dlRcvtypeDesc_onchange()
{
	document.all.H_txRcvTyprDescNo.value = GetDDLValue(document.all.dlRcvtypeDesc, 0);
	//1070928	Kevin_C	1070898			報表增加顯示查詢條件
	document.all.H_txRcvTyprDesc.value = document.all.dlRcvtypeDesc.options[document.all.dlRcvtypeDesc.selectedIndex].text;
}

//取得DropDownList中的Value
function GetDDLValue(argObj,argIndex)
{
	return GetValueFromValueArray(argObj.options[argObj.selectedIndex].value,argIndex);
}

function GetValueFromValueArray(argValueArray,argIndex)
{
	var RtnValueArray = argValueArray.split(",");
	return RtnValueArray[argIndex];
}

function GetDDLText(argObj,argIndex)
{
	return argObj.options[argObj.selectedIndex].text;
}