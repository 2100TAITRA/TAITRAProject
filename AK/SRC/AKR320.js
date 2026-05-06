// Andy	Cola	000970
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.11.09
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1031216      Cloud   --      增加欄位檢核，至少需輸入案次號
 * 1041221      Kenny   1040969 修正選取檔管局建議格式時，直/橫式報表格式選項邏輯
 * 1051004      Kenny   1050313 調整叫用CheckCaseMain檢核案次號時增加傳入版本別參數
 * 106.02.06    Joe		1050087 二代系統升級
 * 1060314      Zen     1060102 修改鐵改局預設欄位
 * 1090214		Kevin_C 1081173 增加系統參數決定是否可使用分類號迄值，以及增加檢核最底層分類號功能
 * 1090310		Cloud	1081109	修改支援年度onblur取得版本
 * 1090401		Cloud	1090208	考量啟用分類號可輸起訖功能時，檢核案次號起迄以及顯示案名已無意義，故判斷啟用輸入起訖功能時，不做顯示案名及檢核行為。
 * 1100204      Zen     1090927 取消使用document.activeElement
 * 1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況
 * 1111206		Zen		1110890	(銓敘部)新增直式目次表
 * 1121121		Cloud	1120761	修正不斷重複檢核問題
 * 1131111      Jason   1131017 修正當按下預覽時畫面預設值跑掉問題   
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050207	Joe	1050087	二代系統升級--S
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

// if (document.all["ValidationSummary1"].textContent != "")
	// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	
//1050207	Joe	1050087	二代系統升級--E

//1050207	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1050207	Joe	1050087	二代系統升級
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
		/*
		case "":
			break;
		*/
	}	
}

//1050207	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1050207	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
/*		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit();
			break;
		case "btSave":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit();
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit();
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit();
			break;
		case "btSearch":
			break;*/

		case "btClean":
			Page_BlockSubmit = true;
			if (jf_ConfirmClean())
			{
				document.all.cbPrePrint.checked = true;
				//1111206 Zen 1110890 (銓敘部)新增直式目次表，比照預設值調整
				//document.all.rbV_SEQ.checked = true;

                //1060313 Zen 1060102 修改鐵改局預設欄位
                if (document.all["H_OrgNickName"].value == "RRB")
                    document.all.rbCase.checked = true;
                else
				document.all.rbCls_Case.checked = true;

				document.all["lbDesc"].className = "hidden";
				document.all["lbDetail"].className = "hidden";
				document.all["cbBarCode"].checked = true;
			}
			break;
		case "btPrint":
		case "btPreview":
		//1140416 Daniel    1140264     新增匯出Excel、ODS按鈕
		case "btOds":
		case "btExcel":
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
			//1050207	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}
function Check_Form_IsValid()
{
	var fr        = document.AKR320;
	var pNotAllowNull = false;
	var pBuf      = "";  
	var pValid = "true";
	var pFileVol="";
	// 1031216      Cloud     增加欄位檢核，至少需輸入案次號
    //if ( (fr.tbFILE_YEAR.value == "") && (fr.tbFILE_CLS1.value == "") && (fr.tbFILE_CASE1.value == "") && (fr.tbFILE_VOL1.value == "") )
	if ((fr.tbFILE_YEAR.value == "") || (fr.tbFILE_CLS1.value == "") || (fr.tbFILE_CASE1.value == ""))
    {
        // 1031216      Cloud     增加欄位檢核，至少需輸入案次號
        //alert("請至少輸入年度條件");
	    alert("至少需輸入年度號、分類號、案次號條件");
	    if (fr.tbFILE_YEAR.value == "")
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
			//fr.tbFILE_YEAR.focus();
			$('#'+tbFILE_YEAR.id).focus();
	    if (fr.tbFILE_CLS1.value == "")
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
			//fr.tbFILE_CLS1.focus();
			$('#'+tbFILE_CLS1.id).focus();
	    if (fr.tbFILE_CASE1.value == "")
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
			//fr.tbFILE_CASE1.focus();
			$('#'+tbFILE_CASE1.id).focus();
		return false;
	}

	if ((fr.tbFILE_VOL1.value != "") && (fr.tbFILE_VOL2.value != ""))		 
	{
		if (fr.tbFILE_VOL1.value > fr.tbFILE_VOL2.value )		
		{
			pFileVol =  "卷次起不可大於迄 \n\n";
			if (pValid) 				
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//fr.tbFILE_VOL1.focus();
				$('#'+tbFILE_VOL1.id).focus();
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//fr.tbFILE_CASE1.focus();
				$('#'+tbFILE_CASE1.id).focus();	
			pValid = false;
		}
	}
	else pNotAllowNull = true;
	//* 1090401	Cloud	1090208	考量啟用分類號可輸起訖功能-空白檢核如有啟用起迄應檢核其中一個有值即可
	//if (fr.tbFILE_CLS1.value == "")
    if ((document.all["AKR320_SUPPORT_CLSE_KEYIN"].value == "N" && fr.tbFILE_CLS1.value == ""
		|| document.all["AKR320_SUPPORT_CLSE_KEYIN"].value == "Y" && fr.tbFILE_CLS1.value == "" && fr.tbFILE_CLS2.value == ""))
	{
　　	if (pNotAllowNull) 
　　	{
　　		pBuf = pBuf + "分類號 \n ";
　　		if (pValid)
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//fr.tbFILE_CLS1.focus();
				$('#'+tbFILE_CLS1.id).focus();	 
			pValid = false;
		} 
	}
    else
    {
    	pNotAllowNull = true;
    	//* 1090401	Cloud	1090208	考量啟用分類號可輸起訖功能-空白檢核如有啟用起迄應檢核其中一個有值即可-S
    	if (document.all["AKR320_SUPPORT_CLSE_KEYIN"].value == "Y")
    	{
    		if (fr.tbFILE_CLS1.value == "" && fr.tbFILE_CLS2.value != "")
			{
    			fr.tbFILE_CLS2.value = fr.tbFILE_CLS1.value;
				document.all["lbFILE_CLS"].innerText = document.all["lbFILE_CLS2"].innerText;
			}
    		else if(fr.tbFILE_CLS1.value != "" && fr.tbFILE_CLS2.value == "")
			{
    			fr.tbFILE_CLS1.value = fr.tbFILE_CLS2.value;
				document.all["lbFILE_CLS2"].innerText = document.all["lbFILE_CLS"].innerText;
			}
    	}
    	//* 1090401	Cloud	1090208	考量啟用分類號可輸起訖功能-空白檢核如有啟用起迄應檢核其中一個有值即可-E
    }
	
	if(fr.tbVerNo.value == "")
	{
　　	if (pNotAllowNull) 
　　	{
　　		pBuf = pBuf + "版本別 \n ";
　　		if (pValid) 
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//fr.tbVerNo.focus();
				$('#'+tbVerNo.id).focus();
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//fr.tbFILE_YEAR.focus();
				$('#'+tbFILE_YEAR.id).focus();
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
	var fr = document.AKR320;
	var errMsg = "";
	
	if(fr.tbFILE_YEAR.value == "")
		errMsg += "年度\n";
	if(fr.tbFILE_CLS1.value == "")
		errMsg += "分類號\n";
	if(fr.tbVerNo.value == "")
		errMsg += "版本別\n";
	//提供可僅列分類號起訖條件 #2007.01.17 Andy
	/*
	if(fr.tbFILE_CASE1.value == "")
		errMsg += "案次號\n";
	if(fr.tbFILE_VOL2.value == "")
		errMsg += "迄卷次\n";
	*/
	if((fr.txPos.value == "") && (fr.rbL.checked==true))
		errMsg += "案卷標籤起始位置\n";
	if(errMsg!="")
	{
		errMsg = "以下欄位不可為空白：\n"+errMsg;
		if(fr.tbFILE_YEAR.value == "")
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
			//fr.tbFILE_YEAR.focus();
			$('#'+tbFILE_YEAR.id).focus();
		else if(fr.tbFILE_CLS1.value == "")
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
			//fr.tbFILE_CLS1.focus();
			$('#'+tbFILE_CLS1.id).focus();
		else if(fr.tbVerNo.value == "")
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
			//fr.tbVerNo.focus();
			$('#'+tbVerNo.id).focus();
		else if(fr.tbFILE_CASE1.value == "")
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
			//fr.tbFILE_CASE1.focus();
			$('#'+tbFILE_CASE1.id).focus();
		else if (fr.tbFILE_VOL2.value == "")
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
			//fr.tbFILE_VOL2.focus();
			$('#'+tbFILE_VOL2.id).focus();
		else
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
			//fr.txPos.focus();
			$('#'+txPos.id).focus();
		alert(errMsg);
		return false;
	}

	if ((fr.tbFILE_VOL1.value != "") && (fr.tbFILE_VOL2.value != ""))		 
	{
		if (fr.tbFILE_VOL1.value > fr.tbFILE_VOL2.value )		
		{
			alert("卷次起不可大於迄");
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
			//fr.tbFILE_VOL1.focus();
			$('#'+tbFILE_VOL1.id).focus();
			return false;			
		} 
	}
	//justin 093/02/06 新增
	/*justin 0931215 配合高港消格式:不顯示訊息,直接在server端處理
	if (((fr.txPos.value == "0" ) || (Number(fr.txPos.value) > 10)) && (fr.rbL.checked==true))
	{
		fr.txPos.focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["案卷標籤起始位置不可小於 1 或大於 10"])),"");
		return false;
	}
	*/
	return true;
}

function CallBack(argCallerId)
{
}

//1121121		Cloud	1120761	修正不斷重複檢核問題-案次號起訖重複檢核
var bClearFlsByPg = false;
var relatedTargetID ="" ;//目標物件
var currentTargetID ="" ;//目前物件
function TbOnBlur(argTextBox)
{
	//1090310 Cloud 1081109 修該支援輸入年度/版本互轉
	CurrentObjId = argTextBox;
	var xObjectName = document.activeElement.id;
	//1121121		Cloud	1120761	修正不斷重複檢核問題-每個欄位觸發TbOnBlur都會傳入argTextBox，-S
	//當因focus觸發時document.activeElement.id會有值故判斷document.activeElement.id有值時不繼續檢核
	//if ((xObjectName == "btExit") || (xObjectName == "btExitImg"))
	if ((xObjectName == "btExit") || (xObjectName == "btExitImg") || (xObjectName != ""))
		return;
	//1121121		Cloud	1120761	修正不斷重複檢核問題-案次號起訖重複檢核
	if(event.relatedTarget)
		relatedTargetID = event.relatedTarget.id;
	if(event.currentTarget)
		currentTargetID = event.currentTarget.id;
		
	//console.log("argTextBox="+argTextBox+"xObjectName="+xObjectName+"bCheckCls="+bCheckCls+"event.relatedTarget="+relatedTargetID+"event.currentTarget="+currentTargetID);
	//1121121		Cloud	1120761	修正不斷重複檢核問題-每個欄位觸發TbOnBlur都會傳入argTextBox-E
	
	//分類號(起)
	if (argTextBox=="tbFILE_CLS1" || argTextBox=="tbVerNo")
	{
		//1090310 Cloud 1081109 修該支援輸入年度/版本互轉
		if (argTextBox == "tbVerNo")
			jf_GetClassVer("VerNo");
	    if (document.all["tbFILE_CLS1"].value == "") {
	        document.all["lbFILE_CLS1"].textContent = "";
	        return;
	    }
	        //1031216   Cloud   配合隱藏分類號迄增加有值放入訖欄位
		//1090214 Kevin_C 1081173 增加系統參數決定是否可使用分類號迄值
	    //else
		else if(document.all["AKR320_SUPPORT_CLSE_KEYIN"].value == "N")
	    {
	        document.all["tbFILE_CLS2"].value = document.all["tbFILE_CLS1"].value;
   	    }
		if (bMsg)
		{
			//1090310 Cloud 1081109 修該支援輸入年度/版本互轉-整合叫用GETCLS
			/*var param = new Array(2);
			param[0] = document.all["tbFILE_CLS1"].value;
			param[1] = document.all["tbVerNo"].value;
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA_V",false,param); //新增輸入版本別 #2006.02.09 Andy*/
			var param = new Array(3);
			param[0] = document.all["tbVerNo"].value;
			param[1] = document.all["tbFILE_CLS1"].value;
			param[2] = document.all["tbFILE_YEAR"].value;
			RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCLS", false, param);
			iCallID_CLS = RtnObj.id;
		    //1100204 Zen 1090927 取消使用document.activeElement
			OnWSResult(RtnObj);
		}
		else
			bMsg = true;
	}
	//Cola 000970 新增分類號(訖)欄位Onblur時帶出相關資訊
	//分類號(訖)
	if (argTextBox=="tbFILE_CLS2")
	{
		if (document.all["tbFILE_CLS2"].value=="")
		{
			//1090310 Cloud 1081109 修該支援輸入年度/版本互轉-BUG 一併修正
			//document.all["tbFILE_CLS2"].textContent = "";
			document.all["lbFILE_CLS2"].textContent = "";
			return;
		}
		if (bMsg)
		{
			//1090310 Cloud 1081109 修該支援輸入年度/版本互轉-整合叫用GETCLS
			/*var param = new Array(2);
			param[0] = document.all["tbFILE_CLS2"].value;
			param[1] = document.all["tbVerNo"].value;
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA_V",false,param); //新增輸入版本別 #2006.02.09 Andy*/
			var param = new Array(3);
			param[0] = document.all["tbVerNo"].value;
			param[1] = document.all["tbFILE_CLS2"].value;
			param[2] = document.all["tbFILE_YEAR"].value;
			RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCLS", false, param); //新增輸入版本別 #2006.02.09 Andy
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
			document.all["lbFILE_CASE1"].textContent = "";
			return;
		}
		else
		{
			
			
        	//* 1090401	Cloud	1090208	考量啟用分類號可輸起訖功能時，檢核案次號起迄以及顯示案名已無意義，故判斷啟用輸入起訖功能時，不做顯示案名及檢核行為。
        	//-分類號啟用起訖功能時僅輸入起值則於預覽前將起值補入，此時檢核起或迄有值即可
        	//if (document.all["tbFILE_CLS1"].value == "")
        	if ((document.all["AKR320_SUPPORT_CLSE_KEYIN"].value == "N" && document.all["tbFILE_CLS1"].value == "") ||
				(document.all["AKR320_SUPPORT_CLSE_KEYIN"].value == "Y" && document.all["tbFILE_CLS1"].value == "" && document.all["tbFILE_CLS2"].value == ""))
			{
				//1121121		Cloud	1120761	修正不斷重複檢核問題-案次號起訖重複檢核-一併調整訊息
				//alert("請輸入分類號(起)");
				if(!bClearFlsByPg)
				{
						alert("請輸入分類號");
				}
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["tbFILE_CLS1"].focus();
				$('#tbFILE_CLS1').focus();
				//1121121		Cloud	1120761	修正不斷重複檢核問題-案次號起訖重複檢核-一併調整訊息
				bClearFlsByPg = false; 
				return;
			}
		}
		if (bMsg)
		{
			//* 1090401	Cloud	1090208	考量啟用分類號可輸起訖功能時，檢核案次號起迄以及顯示案名已無意義，故判斷啟用輸入起訖功能時，不做顯示案名及檢核行為。
        	if (document.all["AKR320_SUPPORT_CLSE_KEYIN"].value == "N")
        	{
				//1060208	Joe		1050087		改為直接傳字串--S
				// var KeyValue = new Array(1)
				// KeyValue[0] = document.all["tbFILE_CLS1"].value;
				var KeyValue = document.all["tbFILE_CLS1"].value;
				// var KeyValue1 = new Array(1)
				// KeyValue1[0] = document.all["tbFILE_CASE1"].value;
				var KeyValue1 = document.all["tbFILE_CASE1"].value;
				//1060208	Joe		1050087		改為直接傳字串--E
				//1051004   Kenny   [1050313]   增加傳入版本別資訊
			    //var param = new Array(4);
	            var param = new Array(5);
				param[0] = document.all["tbFILE_YEAR"].value;
				param[1] = KeyValue;
				param[2] = KeyValue1;
				param[3] = "";
	            //1051004   Kenny   [1050313]   增加傳入版本別資訊
	            param[4] = document.all["tbVerNo"].value;
				
				RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
				iCallID_CASE = RtnObj.id;
				OnWSResult(RtnObj);
			}
		}
		else
			bMsg = true;
	}
	//Cola 000970 新增案次號(訖)欄位Onblur時帶出相關資訊	
	//案次號(訖)
	if (argTextBox=="tbFILE_CASE2")
	{
		if (document.all["tbFILE_CASE2"].value=="")
		{
			document.all["lbFILE_CASE2"].textContent = "";
			return;
		}
		else //#2006.06.19 Andy
		{
        	//* 1090401	Cloud	1090208	考量啟用分類號可輸起訖功能時，檢核案次號起迄以及顯示案名已無意義，故判斷啟用輸入起訖功能時，不做顯示案名及檢核行為。
			//-分類號啟用起訖功能時僅輸入起值則於預覽前將起值補入，此時檢核起或迄有值即可
            /*if (document.all["tbFILE_CLS2"].value == "")
			{
				alert("請輸入分類號(訖)");
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["tbFILE_CLS2"].focus();
				$('#tbFILE_CLS2').focus();
				return;
			}*/
        	if ((document.all["AKR320_SUPPORT_CLSE_KEYIN"].value == "N" && document.all["tbFILE_CLS1"].value == "") ||
				(document.all["AKR320_SUPPORT_CLSE_KEYIN"].value == "Y" && document.all["tbFILE_CLS1"].value == "" && document.all["tbFILE_CLS2"].value == ""))
        	{
				//1121121		Cloud	1120761	修正不斷重複檢核問題-案次號起訖重複檢核
        		//alert("請輸入分類號(起)");
				if(!bClearFlsByPg)
				{
						alert("請輸入分類號");
				}
        		$('#tbFILE_CLS1').focus();
        		//1121121		Cloud	1120761	修正不斷重複檢核問題-案次號起訖重複檢核
				bClearFlsByPg = false; 
				return;
			}
		}
		if (bMsg)
		{
			//* 1090401	Cloud	1090208	考量啟用分類號可輸起訖功能時，檢核案次號起迄以及顯示案名已無意義，故判斷啟用輸入起訖功能時，不做顯示案名及檢核行為。
        	if (document.all["AKR320_SUPPORT_CLSE_KEYIN"].value == "N")
        	{
				//1060208	Joe		1050087		改為直接傳字串
				// var KeyValue = new Array(1);
				var KeyValue = "";
	
				if (document.all["tbFILE_CLS2"].value=="")
				{
					//Cola 000970 -- 若分類號(訖) 為空，則以分類號(起)為主-
					//1060208	Joe		1050087		改為直接傳字串
					// KeyValue[0] = document.all["tbFILE_CLS1"].value;
					KeyValue = document.all["tbFILE_CLS1"].value;
				}
				else
				{	
					//Cola 000970 -- 反之, 若有值, 則以分類號(訖)為主-
					//1060208	Joe		1050087		改為直接傳字串
					// KeyValue[0] = document.all["tbFILE_CLS2"].value;
					KeyValue = document.all["tbFILE_CLS2"].value;
				}
				//1060208	Joe		1050087		改為直接傳字串--S
				// var KeyValue1 = new Array(1)
				// KeyValue1[0] = document.all["tbFILE_CASE2"].value;
				var KeyValue1 = document.all["tbFILE_CASE2"].value;
				//1060208	Joe		1050087		改為直接傳字串--S
				//1051004   Kenny   [1050313]   增加傳入版本別資訊
			    //var param = new Array(4);
	            var param = new Array(5);
				param[0] = document.all["tbFILE_YEAR"].value;
				param[1] = KeyValue;
				param[2] = KeyValue1;
				param[3] = "";
	            //1051004   Kenny   [1050313]   增加傳入版本別資訊
	            param[4] = document.all["tbVerNo"].value;
				
				RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
				iCallID_CASE_2 = RtnObj.id;
				OnWSResult(RtnObj);
			}
		}
		else
			bMsg = true;
	}
	//* 1090310		Cloud	1081109	修改支援年度onblur取得版本
	if (argTextBox == "tbFILE_YEAR")//年度號
	{
		PADZERO(document.all["tbFILE_YEAR"], 3);
		jf_GetClassVer("Year");
	}

}

var bMsg = true;
var iCallID_CLS=null;
var iCallID_CASE=null;
var iCallID_CLS_2=null;
var iCallID_CASE_2 = null;
//* 1090310		Cloud	1081109	修改支援年度onblur取得版本
var iCallID_YearVerNo = null;
var CurrentObjId;
function OnWSResult(argResult)
{
    if(argResult.id == iCallID_CLS)
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length==0)
			{
				//1090214 Kevin_C 1081173 增加檢核是否為最底層分類號
				if(WSResult.IS_LOWEST != "1")
				{
					alert("請輸入最底層分類號");
					document.all["lbFILE_CLS1"].textContent = "";
					document.all["tbFILE_CLS1"].value = "";
					document.all["tbFILE_CLS1"].focus();
				}
				else
				{
					document.all["lbFILE_CLS1"].textContent = WSResult.ClsName;
					document.all["tbVerNo"].value = WSResult.VerNo; //多增加帶入版本別值 #2006.02.09 Andy
					bMsg = true;
				}
			}
			else
			{
			    //1100204 Zen 1090927 取消使用document.activeElement
			    //if (document.activeElement.id == "tbFILE_CASE1")
			    if (CurrentObjId == "tbFILE_CASE1")
			        bMsg = false;
				//1121121		Cloud	1120761	修正不斷重複檢核問題-案次號起訖重複檢核
				//alert("無此分類號(起)");
				alert("無此分類號");
				document.all["lbFILE_CLS1"].textContent = "";
				document.all["tbFILE_CLS1"].value = "";
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["tbFILE_CLS1"].focus();
				//1121201 Cloud	1120761	修正訊息不斷問題
				if((currentTargetID == "tbFILE_CLS1" || currentTargetID == "tbFILE_CLS2") && relatedTargetID=="tbFILE_CASE1" )
					bClearFlsByPg = true;
				$('#tbFILE_CLS1').focus();
				
			}
		}
	}
	//Cola 000970 新增分類號(訖)欄位Onblur時 呼叫之webservice
    if(argResult.id == iCallID_CLS_2)
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length==0)
			{
				//1090214 Kevin_C 1081173 增加檢核是否為最底層分類號
				if(WSResult.IS_LOWEST != "1")
				{
					alert("請輸入最底層分類號");
					document.all["lbFILE_CLS2"].textContent = "";
					document.all["tbFILE_CLS2"].value = "";	
					document.all["tbFILE_CLS2"].focus();
				}
				else
				{
					document.all["lbFILE_CLS2"].textContent = WSResult.ClsName;
					document.all["tbVerNo"].value = WSResult.VerNo; //多增加帶入版本別值 #2006.02.09 Andy
					bMsg = true;
				}
			}
			else
			{
			    //1100204 Zen 1090927 取消使用document.activeElement
			    //if (document.activeElement.id == "tbFILE_CASE2")
			    if (CurrentObjId == "tbFILE_CASE2")
			        bMsg = false;
				alert("無此分類號(訖)");
				document.all["lbFILE_CLS2"].textContent = "";
				document.all["tbFILE_CLS2"].value = "";		
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["tbFILE_CLS2"].focus();
				//1121201 Cloud	1120761	修正訊息不斷問題
				if((currentTargetID == "tbFILE_CLS1" || currentTargetID == "tbFILE_CLS2") && relatedTargetID=="tbFILE_CASE1" )
					bClearFlsByPg = true;
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
				document.all["lbFILE_CASE1"].textContent = WSResult.CaseName;
			}
			else
			{
				alert("無此案次號(起)");
				document.all["lbFILE_CASE1"].textContent = "";
				document.all["tbFILE_CASE1"].value = "";		
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["tbFILE_CASE1"].focus();
				$('#tbFILE_CASE1').focus();		
			}
		}
	}
	//Cola 000970 新增案次號(訖)欄位Onblur時 呼叫之webservice	
	if(argResult.id == iCallID_CASE_2)
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length==0)
			{
				document.all["lbFILE_CASE2"].textContent = WSResult.CaseName;
			}
			else
			{
				alert("無此案次號(訖)");
				document.all["lbFILE_CASE2"].textContent = "";
				document.all["tbFILE_CASE2"].value = "";	
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["tbFILE_CASE2"].focus();
				$('#tbFILE_CASE2').focus();			
			}
		}
	}
	//* 1090310		Cloud	1081109	修改支援年度onblur取得版本-S
	if (argResult.id == iCallID_YearVerNo)//
	{
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsErr)
		{
			//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息
			//alert(WSResult.ErrorClass.ErrMessage[0]);
			var bAlert = true;
			if (WSResult.ErrorClass.ErrMessage[0].indexOf("輸入區間含有多個版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
			{
				//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-s
				if(document.all["tbVerNo"].value!="")
				{
					var checkmsg = WSResult.ErrorClass.ErrMessage[0].split('版本')
					for(var i=0 ;i<checkmsg.length;i++)
					{
						if(checkmsg[i].indexOf("啟用區間為")!=-1)
						{
							if(checkmsg[i].split('啟用區間為')[0]==document.all["tbVerNo"].value)
							{
								bAlert = false;
								break;
							}
						}
					}

				}
				if(bAlert)
				{
					document.all["tbVerNo"].value = "";
					document.all["tbVerNo"].focus();
					alert(WSResult.ErrorClass.ErrMessage[0]);
				}
			}
			else
			{
				document.all[CurrentObjId].value = "";
				alert(WSResult.ErrorClass.ErrMessage[0]);
			}
		}
		else
		{
			if (CurrentObjId == "tbFILE_YEAR")//年度號ONLBUR-帶回版本別一律設定
			{
				document.all["tbVerNo"].value = WSResult.strVerNo;
			}
			else//版本別onblur
			{
				var dt = new Date();
				var strSysYear = dt.getFullYear() - 1911;
				if (WSResult.strEdate == "" || WSResult.strEdate >= strSysYear)//啟用中-無停用日或是停用日大於等於系統日
				{
					if (document.all["tbFILE_YEAR"].value == "" || document.all["tbFILE_YEAR"].value < WSResult.strSdate)//年度為空或是輸入年度小於起日則跳出訊息後直接帶入
					{
						if (document.all["tbFILE_YEAR"].value != "")//不為空再跳提醒
							alert("該版本啟用中，系統將預設帶入系統年。");
						document.all["tbFILE_YEAR"].value = strSysYear;
					}
				}
				else//停用版本
				{
					//年度為空白或是輸入年度不合理(小於起日或是大於停止日)則跳出訊息預設代最大
					if (document.all["tbFILE_YEAR"].value == "" || document.all["tbFILE_YEAR"].value < WSResult.strSdate || document.all["tbFILE_YEAR"].value > WSResult.strEdate)
					{
						if (document.all["tbFILE_YEAR"].value != "")//不為空再跳提醒
						{
							if (WSResult.strSdate != WSResult.strEdate)
								alert("該版本使用於：" + WSResult.strSdate + "~" + WSResult.strEdate + "年，系統將預設帶入最大年度。");
							else
								alert("該版本使用於：" + WSResult.strSdate + "年，系統將預設帶入。");
						}
						document.all["tbFILE_YEAR"].value = WSResult.strEdate;
					}
				}

			}
		}
	}
	//* 1090310		Cloud	1081109	修改支援年度onblur取得版本-E
}

function ClientOnLoad()
{
    //1051004   Kenny   [1050313]   一併移除無用CODE 
    //jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
    //jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,null);
	//1131111      Jason   1131017 修正當按下預覽時畫面預設值跑掉問題
    //FMCheckBox_onClick();	
	//1090214 Kevin_C 1081173 增加系統參數決定是否可使用分類號迄值
	if(document.all["AKR320_SUPPORT_CLSE_KEYIN"].value == "Y")
	{
		document.all["Label9"].className = "";
		document.all["tbFILE_CLS2"].className = "";
		document.all["lbFILE_CLS2"].className = "TextLabel";
		document.all["Label2"].innerText = "分類號(起)：";
	}
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].textContent = obj.value;
}

function RedioButton_onclick()
{
	if (document.all["rbL"].checked)
	{
		document.all["lbDesc"].className = "InputFieldText";
		document.all["lbDetail"].className = "InputFieldText";
		//1050207	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txPos"].focus();
		$('#txPos').focus();			
	}
	else
	{
		document.all["lbDesc"].className = "hidden";
		document.all["lbDetail"].className = "hidden";
	}

}
	////1140416 Daniel    1140264    隱藏Excel、ODS按鈕
function setExcelButtionHiden()
{
	if (document.all["rb2"].checked)
	{
		document.all["btExcel"].disabled  = false;
		document.all["btOds"].disabled  = false;
		//1050207	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txPos"].focus();	
	}
	else
	{
		
		document.all["btExcel"].disabled = true;
		document.all["btOds"].disabled = true;
	}
}

function FMCheckBox_onClick()
{
	if (document.all["cbFM"].checked)
	{
        //1041221   Kenny   [1040969]   修正控制項邏輯，因檔管局建議格式報表為橫式，應將現行直/橫式邏輯互換，勾選時應選定橫式報表並disable直式報表選項
		//document.all["rbV_SEQ"].checked=true;
	    //document.all.rb2.disabled=true;
	    //1111206 Zen 1110890 (銓敘部)新增直式目次表，取消停用直式選項
		//document.all["rbV_SEQ"].disabled = true;
		document.all.rb2.checked = true;
		////1140416 Daniel    1140264    隱藏Excel、ODS按鈕
		setExcelButtionHiden();

	}
	else
	{
	    document.all["rbV_SEQ"].checked = true;
	    //1041221   Kenny   [1040969]   修正控制項邏輯，配合勾選檔管局建議格式調整修改，取消勾選時應是將直式報表disable取消
	    //document.all.rb2.disabled=false;
	    //1111206 Zen 1110890 (銓敘部)新增直式目次表，取消停用直式選項
		//document.all.rbV_SEQ.disabled = false;
		////1140416 Daniel    1140264    隱藏Excel、ODS按鈕
		setExcelButtionHiden();
	}
}

//檢核輸入檔號起訖值格式正確性 #2007.06.19 Andy
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//document.all[argClsS].focus();
				$('#' + argClsS).focus();
				alert("分類號起值不可以大於訖值");
				return false;
			}
		}
		else if(strClsS != "")
		{
			strClsE = strClsS;
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argClsE].focus();
			$('#' + argClsE).focus();
		}
		else if(strClsE != "")
		{
			strClsS = strClsE;
			document.all[argClsS].value = strClsE;
		}
		else
		{
			if((strYearS == "" && strYearE == "") || strCaseS != "" || strCaseE != "" || strVolS != "" || strVolE != "" || strSeqS != "" || strSeqE != "")
			{
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//document.all[argCaseS].focus();
				$('#' + argCaseS).focus();
				alert("案次號不可為空白");
				return false;
			}
		}
		//1090214		Kevin_C 1081173 以下邏輯在無分類號迄值時無作用，而分類號起迄不同時時會變成只能查單案，故移除(.net1.1版時案次號非必要欄位，故當時使用以下檢核不會有問題)
		//if(strCaseS != "" || strCaseE != "")
		//{
		//	if(strClsS != strClsE || (strYearS != strYearE && strCaseS != strCaseE))
		//	{
		//		//1050207	Joe	1050087	二代系統升級，調整focus寫法
		//		//document.all[argClsS].focus();
		//		$('#' + argClsS).focus();
		//		alert("指定案次號起訖時年度號-分類號必須相同");
		//		return false;
		//	}
		//}
	}
	else if(argCaseS != "")
	{
		strCaseE = strCaseS;
		if(strCaseS == "" && (strVolS != "" || strVolE != "" || strSeqS != "" || strSeqE != ""))
		{
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
			//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
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
				//1050207	Joe	1050087	二代系統升級，調整focus寫法
				//document.all[argVolS].focus();
				$('#' + argVolS).focus();
				alert("指定目次號起訖時年度號-分類號-案次號-卷次號必須相同");
				return false;
			}
		}
	}
	
	return true;
}
//* 2020.03.08	Cloud	1081109	修改，分類號空白時，年度/版本onblur時進行互轉
function jf_GetClassVer(argCallFrom)
{
	var strYear = document.all["tbFILE_YEAR"].value;
	var strVerNo = document.all["tbVerNo"].value;
	var param1 = new Array(3);
	if ((strYear == "" && argCallFrom == "Year") || (strVerNo == "" && argCallFrom == "VerNo"))
		return;
	param1[0] = strYear;
	param1[1] = strVerNo;
	param1[2] = argCallFrom;
	RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetVerYear", false, param1);
	iCallID_YearVerNo = RtnObj.id;
	OnWSResult(RtnObj);
}