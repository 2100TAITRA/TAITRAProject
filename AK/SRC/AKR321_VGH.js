/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.08.01
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1030708		Cloud	1030423	[內政部]不檢核卷次號迄值
 * 1081128		Kevin_C	1081056	改用IS_LOWEST判斷是否為最底層分類號
 * 1130215      Jason   1120589 中榮1升2
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1130215      Jason   1120589 中榮1升2
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1130215      Jason   1120589 中榮1升2
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1130215      Jason   1120589 中榮1升2
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1130215      Jason   1120589 中榮1升2
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
//1130215      Jason   1120589 中榮1升2
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

	//1130215      Jason   1120589 中榮1升2
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			if (jf_ConfirmClean())
			{
				document.all.cbPrePrint.checked = true;
				document.all.rbCls.checked = true;
				document.all.cbDisplay.checked = true;
				//document.all.rbL.checked = true;
				//0981030	Howard	0980479	修正點選淸除，一併清除畫面上分類別名稱及案次號名稱
				document.all.rbNew.checked = true;
				//1130215      Jason   1120589 中榮1升2
				//document.all["lbFILE_CLS2"].innerText = "";
				document.all["lbFILE_CLS1"].textContent = "";
				//1130215      Jason   1120589 中榮1升2
				//document.all["lbFILE_CASE2"].innerText = "";
				document.all["lbFILE_CASE1"].textContent = "";
				//1130215      Jason   1120589 中榮1升2
				//document.all["lbFILE_CLS2"].innerText = "";
				document.all["lbFILE_CLS2"].textContent = "";
				//1130215      Jason   1120589 中榮1升2
				//document.all["lbFILE_CASE2"].innerText = "";
				document.all["lbFILE_CASE2"].textContent = "";

				//1130215      Jason   1120589 中榮1升2
				//document.all.txVerNo.focus();
				$('#txVerNo').focus();
			}
			break;
		case "btPrint":
		case "btPreview":
			if(document.all["cbPrePrint"].checked)
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
			//1130215      Jason   1120589 中榮1升2
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}
function Check_Form_IsValid()
{
	var fr        = document.all;
	var pNotAllowNull = false;
	var pBuf      = "";  
	var pValid = "true";
	var pFileVol="";
	
	if ( (fr.tbFILE_YEAR.value == "") && (fr.tbFILE_CLS1.value == "") && (fr.tbFILE_CASE1.value == "") && (fr.tbFILE_VOL1.value == "") )
	{
		alert("請至少輸入年度條件");
		//1130215      Jason   1120589 中榮1升2
		//fr.tbFILE_YEAR.focus();
		$('#' + fr.tbFILE_YEAR.id).focus();
		return false;
	}

	if ((fr.tbFILE_VOL1.value != "") && (fr.tbFILE_VOL2.value != ""))		 
	{
		if (fr.tbFILE_VOL1.value > fr.tbFILE_VOL2.value )		
		{
			pFileVol =  "卷次起不可大於迄 \n\n";
			if (pValid)
				//1130215      Jason   1120589 中榮1升2
				//fr.tbFILE_VOL1.focus();
				$('#' + fr.tbFILE_VOL1.id).focus();
			pValid = false;
		}
	}
	//0981030	Howard	0980479		修改取僅輸入卷次號訖時，將該值帶入卷次號起值
	else if(fr.tbFILE_VOL1.value != "")
	{
		 fr.tbFILE_VOL2.value = fr.tbFILE_VOL1.value;
	}
	else if(fr.tbFILE_VOL2.value != "")
	{
		fr.tbFILE_VOL1.value = fr.tbFILE_VOL2.value;
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
				//1130215      Jason   1120589 中榮1升2
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
				//1130215      Jason   1120589 中榮1升2
				//fr.tbFILE_CLS1.focus();
				$('#' + fr.tbFILE_CLS1.id).focus();
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
				//1130215      Jason   1120589 中榮1升2
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
	var fr = document.all;
	var errMsg = "";
	
	//0981030	Howard	0980479	新增版本別欄位
	if(fr.txVerNo.value == "")
		errMsg += "版本別\n";
	if(fr.tbFILE_YEAR.value == "")
		errMsg += "年度\n";
	if(fr.tbFILE_CLS1.value == "" && fr.tbFILE_CLS2.value == "")
		errMsg += "分類號\n";
	if(fr.tbFILE_CASE1.value == "")
		errMsg += "案次號\n";
	// 1030708		Cloud	1030423	[內政部]不檢核卷次號迄值
	if(fr.OrgNickName.value!="MOI")
	{
		if(fr.tbFILE_VOL2.value == "")
			errMsg += "迄卷次\n";
	}
	if(errMsg!="")
	{
		errMsg = "以下欄位不可為空白：\n"+errMsg;
		//0981030	Howard	0980479	新增版本別欄位
		if (fr.txVerNo.value == "")
			//1130215      Jason   1120589 中榮1升2
			//fr.txVerNo.focus();
			$('#' + fr.txVerNo.id).focus();
		else if (fr.tbFILE_YEAR.value == "")
			//1130215      Jason   1120589 中榮1升2
			//fr.tbFILE_YEAR.focus();
			$('#' + fr.tbFILE_YEAR.id).focus();
		else if (fr.tbFILE_CLS1.value == "")
			//1130215      Jason   1120589 中榮1升2
			//fr.tbFILE_CLS1.focus();
			$('#' + fr.tbFILE_CLS1.id).focus();
		else if (fr.tbFILE_CASE1.value == "")
			//1130215      Jason   1120589 中榮1升2
			//fr.tbFILE_CASE1.focus();
			$('#' + fr.tbFILE_CASE1.id).focus();
		else if (fr.tbFILE_VOL2.value == "")
			//1130215      Jason   1120589 中榮1升2
			//fr.tbFILE_VOL2.focus();
			$('#' + fr.tbFILE_VOL2.id).focus();
		alert(errMsg);
		return false;
	}

	if ((fr.tbFILE_VOL1.value != "") && (fr.tbFILE_VOL2.value != ""))		 
	{
		if (fr.tbFILE_VOL1.value > fr.tbFILE_VOL2.value )		
		{
			alert("卷次起不可大於迄");
			//1130215      Jason   1120589 中榮1升2
			//fr.tbFILE_VOL1.focus();
			$('#' + fr.tbFILE_VOL1.id).focus();
			return false;			
		} 
	}
	//0981030	Howard	0980479	修改取僅輸入卷次號訖時，將該值帶入卷次號起值
	else if(fr.tbFILE_VOL1.value != "")
	{
		 fr.tbFILE_VOL2.value = fr.tbFILE_VOL1.value;
	}
	else if(fr.tbFILE_VOL2.value != "")
	{
		fr.tbFILE_VOL1.value = fr.tbFILE_VOL2.value;
	}

	return true;
}

function CallBack(argCallerId)
{
}


function TbOnBlur(argTextBox)
{
	var xObjectName = document.activeElement.id;
		
	if ((xObjectName == "btExit") || (xObjectName == "btExitImg"))
		return;
	
	//分類號
	//0981030	Howard	0980479	新增版本別欄位
	//if (argTextBox=="tbFILE_CLS1")
	if (argTextBox=="tbFILE_CLS1" || argTextBox=="txVerNo")
	{
		if (document.all["tbFILE_CLS1"].value=="")
		{
			//1130215      Jason   1120589 中榮1升2
			//document.all["lbFILE_CLS1"].innerText = "";
			document.all["lbFILE_CLS1"].textContent = "";
			return;
		}
		if (bMsg)
		{
			//1130215      Jason   1120589 中榮1升2 呼叫WS傳出錯誤訊息 --S
			//var KeyValue = new Array(1);
			//KeyValue[0] = document.all["tbFILE_CLS1"].value;
			var param = new Array(2);
			//param[0] = KeyValue;
			param[0] = document.all["tbFILE_CLS1"].value;
			param[1] =document.all["txVerNo"].value;
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA_V",false,param);
			iCallID_CLS = RtnObj.id;
			OnWSResult(RtnObj);
			//1130215      Jason   1120589 中榮1升2 呼叫WS傳出錯誤訊息 --E
		}
		else
			bMsg = true;
	}
	//分類號(訖)
	if (argTextBox=="tbFILE_CLS2")
	{
		if (document.all["tbFILE_CLS2"].value=="")
		{
			//1130215      Jason   1120589 中榮1升2
			//document.all["tbFILE_CLS2"].innerText = "";
			document.all["tbFILE_CLS2"].value = "";
			return;
		}
		if (bMsg)
		{
			var param = new Array(2);
			param[0] = document.all["tbFILE_CLS2"].value;
			param[1] = document.all["txVerNo"].value;
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA_V",false,param);
			iCallID_CLS_2 = RtnObj.id;
			OnWSResult(RtnObj);
		}
		else
			bMsg = true;
	}
	//案次號(起)
	if (argTextBox=="tbFILE_CASE1")
	{
		if (document.all["tbFILE_CASE1"].value=="")
		{
			//1130215      Jason   1120589 中榮1升2
			//document.all["lbFILE_CASE1"].innerText = "";
			document.all["lbFILE_CASE1"].textContent = "";
			return;
		}
		else
		{
			if (document.all["tbFILE_CLS1"].value=="")
			{
				alert("請輸入分類號(起)");
				//1130215      Jason   1120589 中榮1升2
				//document.all["tbFILE_CLS1"].focus();
				$('#tbFILE_CLS1').focus();
				return;
			}
		}
		if (bMsg)
		{
			//1130215      Jason   1120589 中榮1升2 呼叫WS傳出錯誤訊息 --S
			//var KeyValue = new Array(1)
			//KeyValue[0] = document.all["tbFILE_CLS1"].value;
			//var KeyValue1 = new Array(1)
			//KeyValue1[0] = document.all["tbFILE_CASE1"].value;
			var param = new Array(5);
			param[0] = document.all["tbFILE_YEAR"].value;
			//param[1] = KeyValue;
			param[1] = document.all["tbFILE_CLS1"].value
			//param[2] = KeyValue1;
			param[2] = document.all["tbFILE_CASE1"].value
			param[3] = "";
			param[4] = document.all["txVerNo"].value;
			//1130215      Jason   1120589 中榮1升2 呼叫WS傳出錯誤訊息 --E
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
			iCallID_CASE = RtnObj.id;
			OnWSResult(RtnObj);
		}
		else
			bMsg = true;
	}
	//案次號(訖)
	if (argTextBox=="tbFILE_CASE2")
	{
		if (document.all["tbFILE_CASE2"].value=="")
		{
			//1130215      Jason   1120589 中榮1升2
			//document.all["lbFILE_CASE2"].innerText = "";
			document.all["lbFILE_CASE2"].textContent = "";
			return;
		}
		else
		{
            
			if (document.all["tbFILE_CLS2"].value=="")
			{
				alert("請輸入分類號(訖)");
				//1130215      Jason   1120589 中榮1升2
				//document.all["tbFILE_CLS2"].focus();
				$('#tbFILE_CLS2').focus();
				return;
			}
		}
		if (bMsg)
		{
			//1130215      Jason   1120589 中榮1升2 呼叫WS傳出錯誤訊息 --S
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
			var KeyValue = "";
			if (document.all["tbFILE_CLS2"].value == "") {
				//若分類號(訖) 為空，則以分類號(起)為主-
				KeyValue= document.all["tbFILE_CLS1"].value;
			}
			else {
				//反之, 若有值, 則以分類號(訖)為主-
				KeyValue= document.all["tbFILE_CLS2"].value;
			}
			//var KeyValue1 = new Array(1)
			//KeyValue1[0] = document.all["tbFILE_CASE2"].value;
			var param = new Array(5);
			param[0] = document.all["tbFILE_YEAR"].value;
			param[1] = KeyValue;
			//param[2] = KeyValue1;	
			param[2] = document.all["tbFILE_CASE2"].value
			param[3] = "";
			param[4] = document.all["txVerNo"].value;
			//1130215      Jason   1120589 中榮1升2 呼叫WS傳出錯誤訊息 --E
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
			iCallID_CASE_2 = RtnObj.id;
			OnWSResult(RtnObj);
		}
		else
			bMsg = true;
	}
}

var bMsg = true;
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
				//1081128		Kevin_C	1081056	改用IS_LOWEST判斷是否為最底層分類號
				//if(WSResult.ClsLvl != "4")
				//1130215      Jason   1120589 中榮1升2
				//if(WSResult.IsLowest != "1")
				if (WSResult.IS_LOWEST != "1")
				{
					alert("請輸入最底層分類號");
					//1130215      Jason   1120589 中榮1升2
					//document.all["lbFILE_CLS1"].innerText = "";
					document.all["lbFILE_CLS1"].textContent = "";
					document.all["tbFILE_CLS1"].value = "";
					//1130215      Jason   1120589 中榮1升2
					//document.all["tbFILE_CLS1"].focus();
					$('#tbFILE_CLS1').focus();
				}
				else
				{
					//1130215      Jason   1120589 中榮1升2
					//document.all["lbFILE_CLS1"].innerText = WSResult.ClsName;
					document.all["lbFILE_CLS1"].textContent = WSResult.ClsName;
					//版本別欄位
					document.all["txVerNo"].value = WSResult.VerNo;
					//分類號起值有值則放入分類號訖欄位
					document.all["tbFILE_CLS2"].value = document.all["tbFILE_CLS1"].value;
					//1130215      Jason   1120589 中榮1升2
					//document.all["tbFILE_CLS2"].focus();
					$('#tbFILE_CLS2').focus();
				}
			}
			else
			{
				alert("無此分類號");
				//1130215      Jason   1120589 中榮1升2
				//document.all["lbFILE_CLS1"].innerText = "";
				document.all["lbFILE_CLS1"].textContent = "";
				//1130215      Jason   1120589 中榮1升2
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
				//1081128		Kevin_C	1081056	改用IS_LOWEST判斷是否為最底層分類號
				//if(WSResult.ClsLvl != "4")
				//1130215      Jason   1120589 中榮1升2
				//if (WSResult.IsLowest != "1")
				if (WSResult.IS_LOWEST != "1")
				{
					alert("請輸入最底層分類號");
					//1130215      Jason   1120589 中榮1升2
					//document.all["lbFILE_CLS2"].innerText = "";
					document.all["lbFILE_CLS2"].textContent = "";
					document.all["tbFILE_CLS2"].value = "";
					//1130215      Jason   1120589 中榮1升2
					//document.all["tbFILE_CLS2"].focus();
					$('#tbFILE_CLS2').focus();
				}
				else
				{
					//1130215      Jason   1120589 中榮1升2
					//document.all["lbFILE_CLS2"].innerText = WSResult.ClsName;
					document.all["lbFILE_CLS2"].textContent = WSResult.ClsName;
					//1130215      Jason   1120589 中榮1升2
					//document.all["tbVerNo"].value = WSResult.VerNo;
					document.all["txVerNo"].value = WSResult.VerNo;
				}
			}
			else
			{
				alert("無此分類號(訖)");
				//1130215      Jason   1120589 中榮1升2
				//document.all["lbFILE_CLS2"].innerText = "";
				document.all["lbFILE_CLS2"].textContent = "";
				document.all["tbFILE_CLS2"].value = "";
				//1130215      Jason   1120589 中榮1升2
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
				//1130215      Jason   1120589 中榮1升2
				//document.all["lbFILE_CASE1"].innerText = WSResult.CaseName;
				document.all["lbFILE_CASE1"].textContent = WSResult.CaseName;
			}
			else
			{
				alert("無此案次號");
				//1130215      Jason   1120589 中榮1升2
				//document.all["lbFILE_CASE1"].innerText = "";
				document.all["lbFILE_CASE1"].textContent = "";
				//1130215      Jason   1120589 中榮1升2
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
				//1130215      Jason   1120589 中榮1升2
				//document.all["lbFILE_CASE2"].innerText = WSResult.CaseName;
				document.all["lbFILE_CASE2"].textContent = WSResult.CaseName;
			}
			else
			{
				alert("無此案次號(訖)");
				//1130215      Jason   1120589 中榮1升2
				//document.all["lbFILE_CASE2"].innerText = "";
				document.all["lbFILE_CASE2"].textContent = "";
				document.all["tbFILE_CASE2"].value = "";
				//1130215      Jason   1120589 中榮1升2
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
   //1030708	Cloud	[1030423]	非內政隱藏單位名稱欄位
   if(document.all.OrgNickName.value!="MOI")
   {
		document.all["lbDeptName"].style.display = "none";
		document.all["txDeptName"].style.display = "none";   
   }
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1130215      Jason   1120589 中榮1升2
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].value = obj.value;
}