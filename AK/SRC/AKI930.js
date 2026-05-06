/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2015.04.15	Cloud	Merge	[檔管驗證]增加"清查註記"選項
 * 2016.08.08   Zen     1050700 弱掃XSS修正
 * 1060425      Joe		1050087 二代升級
 * 1060925  	Joe	 	1060867 修正因升級呼叫WEBWERVICE方法不同導致分類號檢核有誤
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060425	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060425	Joe	1050087	二代系統升級
// if (document.all["ValidationSummary1"].innerText != "")
	// alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();	

//1060425	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060425	Joe	1050087	二代系統升級
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
		case "btCLS":
		case "btCASE":
				var pUrl = "";
				//pUrl = "EAC005.aspx?k1="+document.all["txFileClsS"].value;
				pUrl = "../../EA/EA01/EAC005.aspx?MODE=2&nFrom=ODC010&SAMLart="+document.all.txSAMLart.value;
				//open(pUrl);
				jf_OpenChildWin(pUrl,"EAC005",750,550);
				Page_BlockSubmit = true;
				break;
		case "btCLS2":
		case "btCASE2":
				var pUrl = "";
				//pUrl = "EAC005.aspx?k1="+document.all["txFileClsE"].value;
				pUrl = "../../EA/EA01/EAC005.aspx?MODE=2&nFrom=ODC010&SAMLart="+document.all.txSAMLart.value;
				//open(pUrl);
				jf_OpenChildWin(pUrl,"EAC005",750,550);
				Page_BlockSubmit = true;
				break;
	}	
}

//1060425	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060425	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			break;
		case "btSearch":
		    Page_BlockSubmit = false;
		    if(jf_Trim(document.all.txFileYearS.value) != "" && jf_Trim(document.all.txFileYearE.value) != "")
			{			
		    if(!CheckFileNo("txFileYearS","txFileClsS","txFileCaseS","txFileVolS","txFileSeqS"))
			{
				//1060425	Joe	1050087	二代系統升級，調整focus寫法
				//Page_BlockSubmit = true;document.all.txFileYearS.focus();
				Page_BlockSubmit = true;$('#' + document.all.txFileYearS.id).focus();
				return;
			}			
			if(!CheckFileNo("txFileYearE","txFileClsE","txFileCaseE","txFileVolE","txFileSeqE"))
			{
				//1060425	Joe	1050087	二代系統升級，調整focus寫法
				//Page_BlockSubmit = true;document.all.txFileYearE.focus();
				Page_BlockSubmit = true;$('#' + document.all.txFileYearE.id).focus();
				return;
			}
			
			//起訖項目需一致 起 S 訖 E
			if(!CheckFileNoMatch("txFileYearS","txFileClsS","txFileCaseS","txFileVolS","txFileSeqS","txFileYearE","txFileClsE","txFileCaseE","txFileVolE","txFileSeqE"))
			{
				//1060425	Joe	1050087	二代系統升級，調整focus寫法
				//Page_BlockSubmit = true;document.all.txFileYearS.focus();
				Page_BlockSubmit = true;$('#' + document.all.txFileYearS.id).focus();
				return;
			}
			}
			//1010444   Ken  101/06/05 增加降解密作業項目勾選條件
			// if(document.all.ck1.checked==false && document.all.ck2.checked==false && document.all.ck3.checked==false 
            //       && document.all.ck4.checked==false &&  document.all.ck5.checked==false &&  document.all.ck6.checked==false 
            //        && document.all.ckPrint.checked==false && document.all.ckSaveAs.checked==false 
            //        && document.all.ckScan.checked==false && document.all.ckMove.checked==false)
		    if(document.all.ck1.checked==false && document.all.ck2.checked==false && document.all.ck3.checked==false 
                    && document.all.ck4.checked==false &&  document.all.ck5.checked==false &&  document.all.ck6.checked==false 
                    && document.all.ckPrint.checked==false && document.all.ckSaveAs.checked==false
                    // 2015.04.15	Cloud	Merge	[檔管驗證]增加"清查註記"選項
                    //&& document.all.ckScan.checked==false && document.all.ckMove.checked==false && document.all.ckSecNo.checked==false)
                    && document.all.ckScan.checked==false && document.all.ckMove.checked==false && document.all.ckSecNo.checked==false && document.all.ckFileCheck.checked == false)
		    {
		    alert("作業項目請至少勾選一項!!");Page_BlockSubmit = true;return;
		    }		    
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = false;
		    if(jf_Trim(document.all.txFileYearS.value) != "" && jf_Trim(document.all.txFileYearE.value) != "")
			{			
		    if(!CheckFileNo("txFileYearS","txFileClsS","txFileCaseS","txFileVolS","txFileSeqS"))
			{
				//1060425	Joe	1050087	二代系統升級，調整focus寫法
				//Page_BlockSubmit = true;document.all.txFileYearS.focus();
				Page_BlockSubmit = true;$('#' + document.all.txFileYearS.id).focus();
				return;
			}			
			if(!CheckFileNo("txFileYearE","txFileClsE","txFileCaseE","txFileVolE","txFileSeqE"))
			{
				//1060425	Joe	1050087	二代系統升級，調整focus寫法
				//Page_BlockSubmit = true;document.all.txFileYearE.focus();
				Page_BlockSubmit = true;$('#' + document.all.txFileYearE.id).focus();
				return;
			}
			
			//起訖項目需一致 起 S 訖 E
			if(!CheckFileNoMatch("txFileYearS","txFileClsS","txFileCaseS","txFileVolS","txFileSeqS","txFileYearE","txFileClsE","txFileCaseE","txFileVolE","txFileSeqE"))
			{
				//1060425	Joe	1050087	二代系統升級，調整focus寫法
				//Page_BlockSubmit = true;document.all.txFileYearS.focus();
				Page_BlockSubmit = true;$('#' + document.all.txFileYearS.id).focus();
				return;
			}
			}
		    if(document.all.ck1.checked==false && document.all.ck2.checked==false && document.all.ck3.checked==false 
    		    && document.all.ck4.checked==false &&  document.all.ck5.checked==false &&  document.all.ck6.checked==false 
                    && document.all.ckPrint.checked==false && document.all.ckSaveAs.checked==false
		    //2015.04.15	Cloud	Merge增加"清查註記"選項
                    //&& document.all.ckScan.checked==false && document.all.ckMove.checked==false && document.all.ckSecNo.checked==false)
                    && document.all.ckScan.checked==false && document.all.ckMove.checked==false && document.all.ckSecNo.checked==false && document.all.ckFileCheck.checked == false)
		    {
		    alert("作業項目請至少勾選一項!!");Page_BlockSubmit = true;return;
		    }		    
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = false;
		    if(jf_Trim(document.all.txFileYearS.value) != "" && jf_Trim(document.all.txFileYearE.value) != "")
			{			
		    if(!CheckFileNo("txFileYearS","txFileClsS","txFileCaseS","txFileVolS","txFileSeqS"))
			{
				//1060425	Joe	1050087	二代系統升級，調整focus寫法
				//Page_BlockSubmit = true;document.all.txFileYearS.focus();
				Page_BlockSubmit = true;$('#' + document.all.txFileYearS.id).focus();
				return;
			}			
			if(!CheckFileNo("txFileYearE","txFileClsE","txFileCaseE","txFileVolE","txFileSeqE"))
			{
				//1060425	Joe	1050087	二代系統升級，調整focus寫法
				//Page_BlockSubmit = true;document.all.txFileYearE.focus();
				Page_BlockSubmit = true;$('#' + document.all.txFileYearE.id).focus();
				return;
			}
			
			//起訖項目需一致 起 S 訖 E
			if(!CheckFileNoMatch("txFileYearS","txFileClsS","txFileCaseS","txFileVolS","txFileSeqS","txFileYearE","txFileClsE","txFileCaseE","txFileVolE","txFileSeqE"))
			{
				
				//1060425	Joe	1050087	二代系統升級，調整focus寫法
				//Page_BlockSubmit = true;document.all.txFileYearS.focus();
				Page_BlockSubmit = true;$('#' + document.all.txFileYearS.id).focus();
				return;
			}
			}
		    if(document.all.ck1.checked==false && document.all.ck2.checked==false && document.all.ck3.checked==false 
    		    && document.all.ck4.checked==false &&  document.all.ck5.checked==false &&  document.all.ck6.checked==false 
                    && document.all.ckPrint.checked==false && document.all.ckSaveAs.checked==false
		    //2015.04.15	Cloud	Merge	[檔管驗證]增加"清查註記"選項
            //&& document.all.ckScan.checked==false && document.all.ckMove.checked==false && document.all.ckSecNo.checked==false)
            && document.all.ckScan.checked==false && document.all.ckMove.checked==false && document.all.ckSecNo.checked==false && document.all.ckFileCheck.checked == false)
		    {
		    alert("作業項目請至少勾選一項!!");Page_BlockSubmit = true;return;
		    }		    
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

var iCallID_CLS_BLUR = null;
var iCallID_CASE_CLS_BLUR = null;
var iCallID_CASE_BLUR=null;

function TbOnBlur(strObjName)
{
	var pVal1 = "";
	var pStr ="";
	var strExt = strObjName.substr(strObjName.length-1,1);
	
	if(strObjName == "txEntryDate1" || strObjName == "txEntryDate2")
	{
		pVal1=jf_Trim(document.all[strObjName].value);
		if(pVal1!="")
		{
			document.all[strObjName].value = jf_PADL(pVal1,7,"0");
			if (!jf_CheckCDATE(pVal1))
			{
				alert("日期格式錯誤："+pVal1);
				//1060425	Joe	1050087	二代系統升級，調整focus寫法
				//document.all[strObjName].focus();
				$('#' + strObjName).focus();
			}
		}
		return;
	}
	if (strObjName=="txFileClsS" || strObjName=="txFileClsE")
	{
		if (document.all[strObjName].value=="")	return;
		
		var strObjFileCase = "";

		//1060925	Joe		1060867		分類號檢核修正--S
		// var KeyValue1 = new Array(1);
		// KeyValue1[0] = document.all[strObjName].value;
		//1060925	Joe		1060867		分類號檢核修正--E

		var param1 = new Array(1);
		//1060925	Joe		1060867		分類號檢核修正
		// param1[0] = KeyValue1;
		param1[0] = document.all[strObjName].value;

	    //1050808 Zen 1050700 弱掃XSS修正
		param1[0] = encodeURI(param1[0]);

		RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA", false, param1);
		iCallID_CLS_BLUR = RtnObj.id;
		if(!OnWSResult(RtnObj))
		{
			alert('查無此分類號');
			//1060425	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[strObjName].focus();
			$('#' + strObjName).focus();
			return;
		}
		
		if(document.all["txFileCase"+strExt].value!="")
		{
			var param = new Array(4);
			param[0] = document.all["txFileYear"+strExt].value;
			param[1] = document.all[strObjName].value;
			param[2] = document.all["txFileCase" + strExt].value;

		    //1050808 Zen 1050700 弱掃XSS修正
			param[0] = encodeURI(param[0]);
			param[1] = encodeURI(param[1]);
			param[2] = encodeURI(param[2]);

			param[3] = "";
			
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
			iCallID_CASE_CLS_BLUR = RtnObj.id;
			if(!OnWSResult(RtnObj))
			{
				alert('查無此案次號');
				if(pFocusTimes < 2)
					//1060425	Joe	1050087	二代系統升級，調整focus寫法
					//document.all["txFileCase"+strExt].focus();
					$('#txFileCase' + strExt).focus();
				pFocusTimes++;	
			}
			return;
		}
	}
	if (strObjName=="txFileCaseS" || strObjName=="txFileCaseE")
	{
		if (document.all[strObjName].value=="")	return;
		
		var param = new Array(4);
		param[0] = document.all["txFileYear" + strExt].value;
		param[1] = document.all["txFileCls"+strExt].value;
		param[2] = document.all[strObjName].value;

	    //1050808 Zen 1050700 弱掃XSS修正
		param[0] = encodeURI(param[0]);
		param[1] = encodeURI(param[1]);
		param[2] = encodeURI(param[2]);

		param[3] = "";
		
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
		iCallID_CASE_BLUR = RtnObj.id;
		if(!OnWSResult(RtnObj))
		{
			alert('查無此案次號');
			if(pFocusTimes < 2)
				//1060425	Joe	1050087	二代系統升級，調整focus寫法
				//document.all[strObjName].focus();
				$('#' + strObjName).focus();
			pFocusTimes++;	
		}
		return;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	//1060425	Joe	1050087	二代系統升級--S
  // jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
  // jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,null);
	
	//1060425	Joe	1050087	二代系統升級--E
}

var pFocusTimes = 0;
function OnWSResult(argResult)
{
    if(argResult.id == iCallID_CLS_BLUR)
    {
		if(jf_IsWebServiceSuccessNoAlert(argResult))
		{
			if(argResult.value.ClsName != "")
				return true;
			else
				return false;
		}
    }

    
    if(argResult.id == iCallID_CASE_BLUR || argResult.id == iCallID_CASE_CLS_BLUR)
    {
		if(jf_IsWebServiceSuccessNoAlert(argResult))
		{
			if(argResult.value.CaseNo == "")
				return false;
			else	
				return true;
		}
    }
}
function jf_IsWebServiceSuccessNoAlert(argResult)
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
				return false;
			}
			else
				return true;
		}
	}
	return true;
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;	
	//1060425	Joe	1050087	二代系統升級
	// document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
