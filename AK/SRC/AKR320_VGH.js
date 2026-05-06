/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1060220		Kevin_C	1050594	新增中榮客製化程式，複製AKR320
 * 1070911		Kevin_C	1070855	改用IS_LOWEST判斷是否為最底層分類號
 * 1130206      Jason   1120589 中榮一升二
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1130206      Jason   1120589 中榮一升二 --S
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1130206      Jason   1120589 中榮一升二 --E
//1130206    Jason   1120589 中榮一升二
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1130206    Jason   1120589 中榮一升二
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
	}
}

//1130206    Jason   1120589 中榮一升二
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

	//1130206    Jason   1120589 中榮一升二
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			if (jf_ConfirmClean())
			{
				document.all.cbPrePrint.checked = true;
				document.all.rbV_SEQ.checked = true;
				document.all.rbCls_Case.checked = true;
				document.all["lbDesc"].className = "hidden";
				document.all["lbDetail"].className = "hidden";
				document.all["cbBarCode"].checked = true;
			}
			break;
		case "btPrint":
		case "btPreview":
			if(!CheckFileNoRangeFormat("tbVerNo", "tbFILE_YEAR", "", "tbFILE_CLS1", "tbFILE_CLS2", "tbFILE_CASE1", "tbFILE_CASE2", "tbFILE_VOL1", "tbFILE_VOL2", "", ""))
				Page_BlockSubmit = true;
			else
			{
				if(document.all["cbPrePrint"].checked && (document.all["rbL"].checked || document.all["rbM"].checked || document.all["rbCover"].checked || document.all["rbL_C"].checked || document.all["rbM_C"].checked))
				{
					if (!Check_Required_Field())
						Page_BlockSubmit = true;
					else
						Page_BlockSubmit = false;
				}
				else
				{
					if ( !Check_Form_IsValid())
						Page_BlockSubmit = true;
					else
						Page_BlockSubmit = false;
				}
			}
			//1130206    Jason   1120589 中榮一升二
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}
function Check_Form_IsValid()
{
	var fr        = document.AKR320_VGH;
	var pNotAllowNull = false;
	var pBuf      = "";  
	var pValid = "true";
	var pFileVol="";
	//欄位檢核，至少需輸入案次號
	if ((fr.tbFILE_YEAR.value == "") || (fr.tbFILE_CLS1.value == "") || (fr.tbFILE_CASE1.value == ""))
    {
	    alert("至少需輸入年度號、分類號、案次號條件");
		if (fr.tbFILE_YEAR.value == "")
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//fr.tbFILE_YEAR.focus();
			$('#' + fr.tbFILE_YEAR.id).focus();
		if (fr.tbFILE_CLS1.value == "")
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
	        //fr.tbFILE_CLS1.focus();
			$('#' + fr.tbFILE_CLS1.id).focus();
		if (fr.tbFILE_CASE1.value == "")
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
	        //fr.tbFILE_CASE1.focus();
			$('#' + fr.tbFILE_CASE1.id).focus();
		return false;
	}

	if ((fr.tbFILE_VOL1.value != "") && (fr.tbFILE_VOL2.value != ""))		 
	{
		if (fr.tbFILE_VOL1.value > fr.tbFILE_VOL2.value )		
		{
			pFileVol =  "卷次起不可大於迄 \n\n";
			if (pValid)
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//fr.tbFILE_VOL1.focus();
				$('#' + fr.tbFILE_VOL1.id).focus();
			pValid = false;
		} 
	}

	if ((fr.tbFILE_VOL1.value != "") || (fr.tbFILE_VOL2.value != ""))
	{
		pNotAllowNull = true;
	}

	if(fr.tbFILE_CASE1.value == "")
	{
		if (pNotAllowNull)
		{ 
			pBuf = pBuf + "案次號 \n ";
			if (pValid)
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
			    //fr.tbFILE_CASE1.focus();
				$('#' + fr.tbFILE_CASE1.id).focus();
			pValid = false;
		}
	}
	else pNotAllowNull = true;

	if(fr.tbFILE_CLS1.value == "")
	{
　　	if (pNotAllowNull) 
　　	{
　　		pBuf = pBuf + "分類號 \n ";
			if (pValid)
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//fr.tbFILE_CLS1.focus();
				$('#' + fr.tbFILE_CLS1.id).focus();
			pValid = false;
		} 
	}
	else pNotAllowNull = true;
	
	if(fr.tbVerNo.value == "")
	{
　　	if (pNotAllowNull) 
　　	{
　　		pBuf = pBuf + "版本別 \n ";
			if (pValid)
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//fr.tbVerNo.focus();
				$('#' + fr.tbVerNo.id).focus();
			pValid = false;
		} 
	}
	else pNotAllowNull = true;
		    	
	if(fr.tbFILE_YEAR.value == "")
	{
		if (pNotAllowNull)
		{
			pBuf = pBuf + "年度 \n ";
			if (pValid)
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//fr.tbFILE_YEAR.focus();
				$('#' + fr.tbFILE_YEAR.id).focus();
			pValid = false;
		}
	}

	if (!pValid)
	{
		if(pBuf=="")
			alert(pFileVol);
		else
			alert(pFileVol+"以下欄位不可為空白：\n"+pBuf);
	}

	return pValid;
}

function PADZERO(obj,num)
{
	if(obj.value!="")
	{
		obj.value = jf_PADL(obj.value,num,"0");
	}
}

function Check_Required_Field()
{
	var fr = document.AKR320_VGH;
	var errMsg = "";
	
	if(fr.tbFILE_YEAR.value == "")
		errMsg += "年度\n";
	if(fr.tbFILE_CLS1.value == "")
		errMsg += "分類號\n";
	if(fr.tbVerNo.value == "")
		errMsg += "版本別\n";
	if((fr.txPos.value == "") && (fr.rbL.checked==true))
		errMsg += "案卷標籤起始位置\n";
	if(errMsg!="")
	{
		errMsg = "以下欄位不可為空白：\n"+errMsg;
		if (fr.tbFILE_YEAR.value == "")
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//fr.tbFILE_YEAR.focus();
			$('#' + fr.tbFILE_YEAR.id).focus();
		else if (fr.tbFILE_CLS1.value == "")
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//fr.tbFILE_CLS1.focus();
			$('#' + fr.tbFILE_CLS1.id).focus();
		else if(fr.tbVerNo.value == "")
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//fr.tbVerNo.focus();
			$('#' + fr.tbVerNo.id).focus();
		else if (fr.tbFILE_CASE1.value == "")
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//fr.tbFILE_CASE1.focus();
			$('#' + fr.tbFILE_CASE1.id).focus();
		else if (fr.tbFILE_VOL2.value == "")
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//fr.tbFILE_VOL2.focus();
			$('#' + fr.tbFILE_VOL2.id).focus();
		else
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//fr.txPos.focus();
			$('#' + fr.txPos.id).focus();
		alert(errMsg);
		return false;
	}

	if ((fr.tbFILE_VOL1.value != "") && (fr.tbFILE_VOL2.value != ""))		 
	{
		if (fr.tbFILE_VOL1.value > fr.tbFILE_VOL2.value )		
		{
			alert("卷次起不可大於迄");
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//fr.tbFILE_VOL1.focus();
			$('#' + fr.tbFILE_VOL1.id).focus();
			return false;			
		} 
	}
	return true;
}

function TbOnBlur(argTextBox)
{
	var xObjectName = document.activeElement.id;
		
	if ((xObjectName == "btExit") || (xObjectName == "btExitImg"))
		return;
	
	//分類號(起)
	if (argTextBox=="tbFILE_CLS1" || argTextBox=="tbVerNo")
	{
		if (document.all["tbFILE_CLS1"].value == "") {
			//1130206    Jason   1120589 中榮一升二
			//document.all["lbFILE_CLS1"].innerText = "";
			document.all["lbFILE_CLS1"].textContent = "";
	        return;
		}
		var param = new Array(2);
		param[0] = document.all["tbFILE_CLS1"].value;
		param[1] = document.all["tbVerNo"].value;
		RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA_V", false, param);
		iCallID_CLS = RtnObj.id;
		OnWSResult(RtnObj);
		
	}
	//分類號(訖)
	if (argTextBox=="tbFILE_CLS2")
	{
		if (document.all["tbFILE_CLS2"].value=="")
		{
			//1130206    Jason   1120589 中榮一升二
			//document.all["lbFILE_CLS2"].innerText = "";
			document.all["lbFILE_CLS2"].textContent = "";
			return;
		}
		var param = new Array(2);
		param[0] = document.all["tbFILE_CLS2"].value;
		param[1] = document.all["tbVerNo"].value;
		RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA_V", false, param);

		iCallID_CLS_2 = RtnObj.id;
		OnWSResult(RtnObj);
	}	
	//案次號(起)
	if (argTextBox=="tbFILE_CASE1")
	{
		if (document.all["tbFILE_CASE1"].value=="")
		{
			//1130206    Jason   1120589 中榮一升二
			//document.all["lbFILE_CASE1"].innerText = "";
			document.all["lbFILE_CASE1"].textContent = "";
			return;
		}
		else
		{
			if (document.all["tbFILE_CLS1"].value=="")
			{
				alert("請輸入分類號(起)");
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all["tbFILE_CLS1"].focus();
				$('#tbFILE_CLS1').focus();
				return;
			}
		}
		//1130206    Jason   1120589 中榮一升二 呼叫WS傳出錯誤訊息 --S
		//var KeyValue = new Array(1)
		//KeyValue[0] = document.all["tbFILE_CLS1"].value;
		//var KeyValue1 = new Array(1)
		//KeyValue1[0] = document.all["tbFILE_CASE1"].value;
		var param = new Array(5);
		param[0] = document.all["tbFILE_YEAR"].value;
		//param[1] = KeyValue;
		param[1] = document.all["tbFILE_CLS1"].value;
		//param[2] = KeyValue1;
		param[2] = document.all["tbFILE_CASE1"].value;
		param[3] = "";
		param[4] = document.all["tbVerNo"].value;
		//1130206    Jason   1120589 中榮一升二 呼叫WS傳出錯誤訊息 --E
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
		iCallID_CASE = RtnObj.id;
		OnWSResult(RtnObj);
	}	
	//案次號(訖)
	if (argTextBox=="tbFILE_CASE2")
	{
		if (document.all["tbFILE_CASE2"].value=="")
		{
			//1130206    Jason   1120589 中榮一升二
			//document.all["lbFILE_CASE2"].innerText = "";
			document.all["lbFILE_CASE2"].textContent = "";
			return;
		}
		else
		{
            
			if (document.all["tbFILE_CLS2"].value=="")
			{
				alert("請輸入分類號(訖)");
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all["tbFILE_CLS2"].focus();
				$('#tbFILE_CLS2').focus();
				return;
			}
		}
		//1130206    Jason   1120589 中榮一升二 呼叫WS傳出錯誤訊息 --S
		//var KeyValue = new Array(1)
		//if (document.all["tbFILE_CLS2"].value=="")
		//{
		//	//若分類號(訖) 為空，則以分類號(起)為主-
		//	KeyValue[0] = document.all["tbFILE_CLS1"].value;
		//}
		//else
		//{	
		//	//反之, 若有值, 則以分類號(訖)為主-
		//	KeyValue[0] = document.all["tbFILE_CLS2"].value;
		//}
		//var KeyValue1 = new Array(1)
		//KeyValue1[0] = document.all["tbFILE_CASE2"].value;
		var KeyValue = "";
		if (document.all["tbFILE_CLS2"].value == "")
		{
			//若分類號(訖) 為空，則以分類號(起)為主-
			KeyValue= document.all["tbFILE_CLS1"].value;
		}
		else
		{	
			//反之, 若有值, 則以分類號(訖)為主-
			KeyValue= document.all["tbFILE_CLS2"].value;
		}
		var param = new Array(5);
		param[0] = document.all["tbFILE_YEAR"].value;
		param[1] = KeyValue;
		param[2] = document.all["tbFILE_CASE2"].value;
		param[3] = "";
		param[4] = document.all["tbVerNo"].value;
		//1130206    Jason   1120589 中榮一升二 呼叫WS傳出錯誤訊息 --E
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
		iCallID_CASE_2 = RtnObj.id;
		OnWSResult(RtnObj);
	}	
}

var iCallID_CLS=null;
var iCallID_CASE=null;
var iCallID_CLS_2=null;
var iCallID_CASE_2=null;
function OnWSResult(argResult)
{
    if(argResult.id == iCallID_CLS)
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length==0)
			{
				//1070511	Kevin_C	1061317	[高榮] 中榮才需判斷最底層分類號，若無總院、分院選項，判斷不為中榮
				//if(WSResult.ClsLvl != "4")
				//1070911	Kevin_C	1070855	改用IS_LOWEST判斷是否為最底層分類號
				//if(WSResult.ClsLvl != "4" && document.all["fsWidth"] != null)
				//1130206    Jason   1120589 中榮一升二
				//if(WSResult.IsLowest != "1" && document.all["fsWidth"] != null)
				if (WSResult.IS_LOWEST != "1" && document.all["fsWidth"] != null)
				{
					alert("請輸入最底層分類號");
					//1130206    Jason   1120589 中榮一升二
					//document.all["lbFILE_CLS1"].innerText = "";
					document.all["lbFILE_CLS1"].textContent = "";
					document.all["tbFILE_CLS1"].value = "";
					//1130206    Jason   1120589 中榮一升二 調整focus寫法
					//document.all["tbFILE_CLS1"].focus();
					$('#tbFILE_CLS1').focus();
					
				}
				else
				{
					//1130206    Jason   1120589 中榮一升二
					//document.all["lbFILE_CLS1"].innerText = WSResult.ClsName;
					document.all["lbFILE_CLS1"].textContent = WSResult.ClsName;
					document.all["tbVerNo"].value = WSResult.VerNo; //帶入版本別值
					//分類號起值有值則放入分類號訖欄位
					document.all["tbFILE_CLS2"].value = document.all["tbFILE_CLS1"].value;
					//1130206    Jason   1120589 中榮一升二 調整focus寫法
					//document.all["tbFILE_CLS2"].focus();
					$('#tbFILE_CLS2').focus();
				}
			}
			else
			{
				alert("無此分類號(起)");
				//1130206    Jason   1120589 中榮一升二
				//document.all["lbFILE_CLS1"].innerText = "";
				document.all["lbFILE_CLS1"].textContent = "";
				document.all["tbFILE_CLS1"].value = "";
                //1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all["tbFILE_CLS1"].focus();
				$('#tbFILE_CLS1').focus();
			}
		}
	}
	//分類號(訖)欄位Onblur時 呼叫之webservice
    if(argResult.id == iCallID_CLS_2)
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length==0)
			{
				//1070511	Kevin_C	1061317	[高榮] 中榮才需判斷最底層分類號，若無總院、分院選項，判斷不為中榮
				//if(WSResult.ClsLvl != "4")
				//1070911	Kevin_C	1070855	改用IS_LOWEST判斷是否為最底層分類號
				//if(WSResult.ClsLvl != "4" && document.all["fsWidth"] != null)
				//1130206    Jason   1120589 中榮一升二
				//if (WSResult.IsLowest != "1" && document.all["fsWidth"] != null)
				if (WSResult.IS_LOWEST != "1" && document.all["fsWidth"] != null)
				{
					alert("請輸入最底層分類號");
					//1130206    Jason   1120589 中榮一升二
					//document.all["lbFILE_CLS2"].innerText = "";
					document.all["lbFILE_CLS2"].textContent = "";
					document.all["tbFILE_CLS2"].value = "";
					//1130206    Jason   1120589 中榮一升二 調整focus寫法
					//document.all["tbFILE_CLS2"].focus();
					$('#tbFILE_CLS2').focus();
				}
				else
				{
					//1130206    Jason   1120589 中榮一升二
					//document.all["lbFILE_CLS2"].innerText = WSResult.ClsName;
					document.all["lbFILE_CLS2"].textContent = WSResult.ClsName;
					document.all["tbVerNo"].value = WSResult.VerNo;
				}
			}
			else
			{
				alert("無此分類號(訖)");
				//1130206    Jason   1120589 中榮一升二
				//document.all["lbFILE_CLS2"].innerText = "";
				document.all["lbFILE_CLS2"].textContent = "";
				document.all["tbFILE_CLS2"].value = "";
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all["tbFILE_CLS2"].focus();
				$('#tbFILE_CLS2').focus();
			}
		}
	}	
	if(argResult.id == iCallID_CASE)
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length==0)
			{
				//1130206    Jason   1120589 中榮一升二
				//document.all["lbFILE_CASE1"].innerText = WSResult.CaseName;
				document.all["lbFILE_CASE1"].textContent = WSResult.CaseName;
			}
			else
			{
				alert("無此案次號(起)");
				//1130206    Jason   1120589 中榮一升二
				//document.all["lbFILE_CASE1"].innerText = "";
				document.all["lbFILE_CASE1"].textContent = "";
				document.all["tbFILE_CASE1"].value = "";
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all["tbFILE_CASE1"].focus();
				$('#tbFILE_CASE1').focus();
			}
		}
	}
	//案次號(訖)欄位Onblur時 呼叫之webservice	
	if(argResult.id == iCallID_CASE_2)
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length==0)
			{
				//1130206    Jason   1120589 中榮一升二
				//document.all["lbFILE_CASE2"].innerText = WSResult.CaseName;
				document.all["lbFILE_CASE2"].textContent = WSResult.CaseName;
			}
			else
			{
				alert("無此案次號(訖)");
				//1130206    Jason   1120589 中榮一升二
				//document.all["lbFILE_CASE2"].innerText = "";
				document.all["lbFILE_CASE2"].textContent = "";
				document.all["tbFILE_CASE2"].value = "";
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all["tbFILE_CASE2"].focus();
				$('#tbFILE_CASE2').focus();
			}
		}
	}	
}

function ClientOnLoad()
{
   jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
   jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,null);
   FMCheckBox_onClick();	
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1130206    Jason   1120589 中榮一升二
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function RedioButton_onclick()
{
	if (document.all["rbL"].checked)
	{
		document.all["lbDesc"].className = "InputFieldText";
		document.all["lbDetail"].className = "InputFieldText";
		//1130206    Jason   1120589 中榮一升二 調整focus寫法
		//document.all["txPos"].focus();
		$('#txPos').focus();
	}
	else
	{
		document.all["lbDesc"].className = "hidden";
		document.all["lbDetail"].className = "hidden";
	}
}

function FMCheckBox_onClick()
{
	if (document.all["cbFM"].checked)
	{
		document.all["rbV_SEQ"].checked=true;
		document.all.rb2.disabled=true;
	}
	else
	{
		document.all["rbV_SEQ"].checked=true;
		document.all.rb2.disabled=false;
	}
}

//檢核輸入檔號起訖值格式正確性
function CheckFileNoRangeFormat(argVerNo, argYearS, argYearE, argClsS, argClsE, argCaseS, argCaseE, argVolS, argVolE, argSeqS, argSeqE)
{
	var strVerNo = "";
	var strYearS = "";
	var strYearE = "";
	var strClsS = "";
	var strClsE = "";
	var strCaseS = "";
	var strCaseE = "";
	var strVolS = "";
	var strVolE = "";
	var strSeqS = "";
	var strSeqE = "";
	
	//取得各欄位輸入值
	if(argVerNo != "")
		strVerNo = jf_Trim(document.all[argVerNo].value);
	if(argYearS != "")
		strYearS = jf_Trim(document.all[argYearS].value);
	if(argYearE != "")
		strYearE = jf_Trim(document.all[argYearE].value);
	if(argClsS != "")
		strClsS = jf_Trim(document.all[argClsS].value);
	if(argClsE != "")
		strClsE = jf_Trim(document.all[argClsE].value);
	if(argCaseS != "")
		strCaseS = jf_Trim(document.all[argCaseS].value);
	if(argCaseE != "")
		strCaseE = jf_Trim(document.all[argCaseE].value);
	if(argVolS != "")
		strVolS = jf_Trim(document.all[argVolS].value);
	if(argVolE != "")
		strVolE = jf_Trim(document.all[argVolE].value);
	if(argSeqS != "")
		strSeqS = jf_Trim(document.all[argSeqS].value);
	if(argSeqE != "")
		strSeqE = jf_Trim(document.all[argSeqE].value);
		
	if(strVerNo + strYearS + strYearE + strClsS + strClsE + strCaseS + strCaseE + strVolS + strVolE + strSeqS + strSeqE == "")
	{
		alert("請至少輸入一項條件");
		return false;
	}
	
	//FILE_YEAR
	if(argYearS != "" && argYearE != "")
	{
		if(strYearS != "" && strYearE != "")
		{
			if(strYearS > strYearE)
			{
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
					//document.all[argYearS].focus();
				$('#' + argYearS).focus();
				alert("年度號起值不可以大於訖值");
				return false;
			}
		}
		else if(strYearS != "")
		{
			strYearE = strYearS;
			document.all[argYearE].value = strYearS;
		}
		else if(strYearE != "")
		{
			strYearS = strYearE;
			document.all[argYearS].value = strYearE;
		}
		else
		{
			if(strClsS == "" && strClsE == "")
			{
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all[argYearS].focus();
				$('#' + argYearS).focus();
				alert("年度號不可為空白");
				return false;
			}
		}
	}
	else if(argYearS != "")
	{
		strYearE = strYearS;
		if(strYearS == "" && (strClsS == "" && strClsE == ""))
		{
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//document.all[argYearS].focus();
			$('#' + argYearS).focus();
			alert("年度號不可為空白");
			return false;
		}
	}
	else if(argYearE != "")
	{
		strYearS = strYearE;
		if(strYearE == "" && (strClsS == "" && strClsE == ""))
		{
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//document.all[argYearE].focus();
			$('#' + argYearE).focus();
			alert("年度號不可為空白");
			return false;
		}
	}
	
	//FILE_CLS
	if(argClsS != "" && argClsE != "")
	{
		if(strClsS != "" && strClsE != "")
		{
			if(strClsS > strClsE)
			{
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all[argClsS].focus();
				$('#' + argClsS).focus();
				alert("分類號起值不可以大於訖值");
				return false;
			}
		}
		else
		{
			if((strYearS == "" && strYearE == "") || strCaseS != "" || strCaseE != "" || strVolS != "" || strVolE != "" || strSeqS != "" || strSeqE != "")
			{
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all[argClsS].focus();
				$('#' + argClsS).focus();
				alert("分類號不可為空白");
				return false;
			}
		}
		
		if(strClsS != "" || strClsE != "")
		{
			if(strYearS != strYearE && strClsS != strClsE)
			{
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all[argYearS].focus();
				$('#' + argYearS).focus();
				alert("指定分類號起訖時年度號必須相同");
				return false;
			}
		}
	}
	else if(argClsS != "")
	{
		strClsE = strClsS;
		if(strClsS == "" && ((strYearS == "" && strYearE == "") || strCaseS != "" || strCaseE != "" || strVolS != "" || strVolE != "" || strSeqS != "" || strSeqE != ""))
		{
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//document.all[argClsS].focus();
			$('#' + argClsS).focus();
			alert("分類號不可為空白");
			return false;
		}
	}
	else if(argClsE != "")
	{
		strClsS = strClsE;
		if(strClsE == "" && ((strYearS == "" && strYearE == "") || strCaseS != "" || strCaseE != "" || strVolS != "" || strVolE != "" || strSeqS != "" || strSeqE != ""))
		{
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//document.all[argClsE].focus();
			$('#' + argClsE).focus();
			alert("分類號不可為空白");
			return false;
		}
	}
	
	//FILE_CASE
	if(argCaseS != "" && argCaseE != "")
	{
		if(strCaseS != "" && strCaseE != "")
		{
			if(strCaseS > strCaseE)
			{
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all[argCaseS].focus();
				$('#' + argCaseS).focus();
				alert("案次號起值不可以大於訖值");
				return false;
			}
		}
		else if(strCaseS != "")
		{
			strCaseE = strCaseS;
			document.all[argCaseE].value = strCaseS;
		}
		else if(strCaseE != "")
		{
			strCaseS = strCaseE;
			document.all[argCaseS].value = strCaseE;
		}
		else
		{
			if(strVolS != "" || strVolE != "" || strSeqS != "" || strSeqE != "")
			{
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all[argCaseS].focus();
				$('#' + argCaseS).focus();
				alert("案次號不可為空白");
				return false;
			}
		}
	}
	else if(argCaseS != "")
	{
		strCaseE = strCaseS;
		if(strCaseS == "" && (strVolS != "" || strVolE != "" || strSeqS != "" || strSeqE != ""))
		{
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//document.all[argCaseS].focus();
			$('#' + argCaseS).focus();
			alert("案次號不可為空白");
			return false;
		}
	}
	else if(argCaseE != "")
	{
		strCaseS = strCaseE;
		if(strCaseE == "" && (strVolS != "" || strVolE != "" || strSeqS != "" || strSeqE != ""))
		{
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//document.all[argCaseE].focus();
			$('#' + argCaseE).focus();
			alert("案次號不可為空白");
			return false;
		}
	}
	
	//FILE_VOL
	if(argVolS != "" && argVolE != "")
	{
		if(strVolS != "" && strVolE != "")
		{
			if(strVolS > strVolE)
			{
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all[argVolS].focus();
				$('#' + argVolS).focus();
				alert("卷次號起值不可以大於訖值");
				return false;
			}
		}
		else if(strVolS != "")
		{
			strVolE = strVolS;
			document.all[argVolE].value = strVolS;
		}
		else if(strVolE != "")
		{
			strVolS = strVolE;
			document.all[argVolS].value = strVolE;
		}
		else
		{
			if(strSeqS != "" || strSeqE != "")
			{
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all[argVolS].focus();
				$('#' + argVolS).focus();
				alert("卷次號不可為空白");
				return false;
			}
		}
		
		if(strVolS != "" || strVolE != "")
		{
			if(strCaseS != strCaseE || (strYearS != strYearE && strVolS != strVolE))
			{
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all[argCaseS].focus();
				$('#' + argCaseS).focus();
				alert("指定卷次號起訖時年度號-分類號-案次號必須相同");
				return false;
			}
		}
	}
	else if(argVolS != "")
	{
		strVolE = strVolS;
		if(strVolS == "" && (strSeqS != "" || strSeqE != ""))
		{
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//document.all[argVolS].focus();
			$('#' + argVolS).focus();
			alert("卷次號不可為空白");
			return false;
		}
	}
	else if(argVolE != "")
	{
		strVolS = strVolE;
		if(strVolE == "" && (strSeqS != "" || strSeqE != ""))
		{
			//1130206    Jason   1120589 中榮一升二 調整focus寫法
			//document.all[argVolE].focus();
			$('#' + argVolE).focus();
			alert("卷次號不可為空白");
			return false;
		}
	}
	
	//FILE_SEQ
	if(argSeqS != "" && argSeqE != "")
	{
		if(strSeqS != "" && strSeqE != "")
		{
			if(strSeqS > strSeqE)
			{
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all[argSeqS].focus();
				$('#' + argSeqS).focus();
				alert("目次號起值不可以大於訖值");
				return false;
			}
		}
		else if(strSeqS != "")
		{
			strSeqE = strSeqS;
			document.all[argSeqE].value = strSeqS;
		}
		else if(strSeqE != "")
		{
			strSeqS = strSeqE;
			document.all[argSeqS].value = strSeqE;
		}
		
		if(strSeqS != "" || strSeqE != "")
		{	
			if(strVolS != strVolE || (strYearS != strYearE && strSeqS != strSeqE))
			{
				//1130206    Jason   1120589 中榮一升二 調整focus寫法
				//document.all[argVolS].focus();
				$('#' + argVolS).focus();
				alert("指定目次號起訖時年度號-分類號-案次號-卷次號必須相同");
				return false;
			}
		}
	}
	return true;
}