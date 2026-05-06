/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.11.09
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1051004      Kenny   1050313 調整叫用CheckCaseMain檢核案次號時增加傳入版本別參數
 * 1110602  Cloud  1110371 二代系統升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;
//1110602  Cloud  1110371	二代系統升級--S
/*document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

if (document.all["ValidationSummary1"].innerText != "")
	alert(document.all["ValidationSummary1"].innerText);*/

//1110602  Cloud  1110371	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1110602  Cloud  1110371	二代系統升級
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

//1110602  Cloud  1110371	二代系統升級，傳入參數event
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
	
    //1110602  Cloud  1110371	二代系統升級
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
                document.all.rbV_SEQ.checked = true;
                document.all.rbCls_Case.checked = true;
                document.all["lbDesc"].className = "hidden";
                document.all["lbDetail"].className = "hidden";
                document.all["cbBarCode"].checked = true;
            }
            break;
        case "btPrint":
        case "btPreview":
		  
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
            //1110602  Cloud  1110371	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function Check_Form_IsValid()
{
	var fr        = document.AKR320_315000000H;
	var pNotAllowNull = false;
	var pBuf      = "";  
	var pValid = "true";
	var pFileVol="";
	
	//配合交通部需求增加櫥位號條件 #2007.06.28 Andy
	if ( (fr.tbSTOCK_NO1.value != "") || (fr.tbSTOCK_NO2.value != ""))
	{
		if ( (fr.tbVerNo.value + fr.tbFILE_YEAR.value + fr.tbFILE_CLS1.value + fr.tbFILE_CLS2.value + fr.tbFILE_CASE1.value + fr.tbFILE_CASE2.value  + fr.tbFILE_VOL1.value  + fr.tbFILE_VOL2.value != ""))
		{
			if(window.confirm("使用櫥位號條件查詢時為避免影響查詢結果，其他條件會自動忽略，是否仍繼續查詢？"))
				return true;
			else
				return false;
		}
		else
			return true;
	}
	
	if ( (fr.tbFILE_YEAR.value == "") && (fr.tbFILE_CLS1.value == "") && (fr.tbFILE_CASE1.value == "") && (fr.tbFILE_VOL1.value == "") )
	{
		alert("請至少輸入年度條件");
		//1110602  Cloud  1110371	二代系統升級，調整focus寫法
		//fr.tbFILE_YEAR.focus();
		$('#'+tbFILE_YEAR.id).focus();
		return false;
	}

	if ((fr.tbFILE_VOL1.value != "") && (fr.tbFILE_VOL2.value != ""))		 
	{
		if (fr.tbFILE_VOL1.value > fr.tbFILE_VOL2.value )		
		{
			pFileVol =  "卷次起不可大於迄 \n\n";
			if (pValid) 				
				//1110602  Cloud  1110371	二代系統升級，調整focus寫法
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
				//1110602  Cloud  1110371	二代系統升級，調整focus寫法
				//fr.tbFILE_CASE1.focus();
				$('#'+tbFILE_CASE1.id).focus();	
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
				//1110602  Cloud  1110371	二代系統升級，調整focus寫法
				//fr.tbFILE_CLS1.focus();
				$('#'+tbFILE_CLS1.id).focus();	 
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
				//1110602  Cloud  1110371	二代系統升級，調整focus寫法
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
				//1110602  Cloud  1110371	二代系統升級，調整focus寫法
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
	var fr = document.AKR320_315000000H;
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
			//1110602  Cloud  1110371	二代系統升級，調整focus寫法
			//fr.tbFILE_YEAR.focus();
			$('#'+tbFILE_YEAR.id).focus();
		else if(fr.tbFILE_CLS1.value == "")
			//1110602  Cloud  1110371	二代系統升級，調整focus寫法
			//fr.tbFILE_CLS1.focus();
			$('#'+tbFILE_CLS1.id).focus();
		else if(fr.tbVerNo.value == "")
			//1110602  Cloud  1110371	二代系統升級，調整focus寫法
			//fr.tbVerNo.focus();
			$('#'+tbVerNo.id).focus();
		else if(fr.tbFILE_CASE1.value == "")
			//1110602  Cloud  1110371	二代系統升級，調整focus寫法
			//fr.tbFILE_CASE1.focus();
			$('#'+tbFILE_CASE1.id).focus();
		else if (fr.tbFILE_VOL2.value == "")
			//1110602  Cloud  1110371	二代系統升級，調整focus寫法
			//fr.tbFILE_VOL2.focus();
			$('#'+tbFILE_VOL2.id).focus();
		else
			//1110602  Cloud  1110371	二代系統升級，調整focus寫法
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
			//1110602  Cloud  1110371	二代系統升級，調整focus寫法
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

//1110602 Cloud 1110371 二代修改不使用activeElment
var CurrentObjId;
function TbOnBlur(argTextBox)
{
	//1110602 Cloud 1110371 二代修改不使用activeElment
	CurrentObjId = argTextBox;
	var xObjectName = document.activeElement.id;
		
	if ((xObjectName == "btExit") || (xObjectName == "btExitImg"))
		return;
	
	//分類號
	if (argTextBox=="tbFILE_CLS1" || argTextBox=="tbVerNo")
	{
		if (document.all["tbFILE_CLS1"].value=="")
		{
			//1110602 Cloud 1110371 升級二代textContent
			//document.all["lbFILE_CLS2"].innerText = "";
			document.all["lbFILE_CLS2"].textContent = "";
			return;
		}
		if (bMsg)
		{
			var param = new Array(2);
			param[0] = document.all["tbFILE_CLS1"].value;
			param[1] = document.all["tbVerNo"].value;
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA_V",false,param); //新增輸入版本別 #2006.02.09 Andy
			iCallID_CLS = RtnObj.id;
			OnWSResult(RtnObj);
		}
		else
			bMsg = true;
	}
	//案次號
	if (argTextBox=="tbFILE_CASE1")
	{
		if (document.all["tbFILE_CASE1"].value=="")
		{
			//1110602 Cloud 1110371 升級二代textContent
			//document.all["lbFILE_CASE2"].innerText = "";
			document.all["lbFILE_CASE2"].textContent = "";
			return;
		}
		else
		{
			if (document.all["tbFILE_CLS1"].value=="")
			{
				alert("請輸入分類號");
				//1110602  Cloud  1110371	二代系統升級，調整focus寫法
				//document.all["tbFILE_CLS1"].focus();
				$('#tbFILE_CLS1').focus();
				return;
			}
		}
		if (bMsg)
		{
			//* 1110602  Cloud  1110371 二代系統升級
			/*var KeyValue = new Array(1)
			KeyValue[0] = document.all["tbFILE_CLS1"].value;
			var KeyValue1 = new Array(1)
			KeyValue1[0] = document.all["tbFILE_CASE1"].value;*/
			//1051004   Kenny   [1050313]   增加傳入版本別資訊
		    //var param = new Array(4);
            var param = new Array(5);
			param[0] = document.all["tbFILE_YEAR"].value;
			//* 1110602  Cloud  1110371 二代系統升級
			/*param[1] = KeyValue;
			param[2] = KeyValue1;*/
			param[1] = document.all["tbFILE_CLS1"].value;
			param[2] = document.all["tbFILE_CASE1"].value;
			param[3] = "";
            //1051004   Kenny   [1050313]   增加傳入版本別資訊
            param[4] = document.all["tbVerNo"].value;
			
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
			iCallID_CASE = RtnObj.id;
			OnWSResult(RtnObj);
		}
		else
			bMsg = true;
	}
}

var bMsg = true;
var iCallID_CLS=null;
var iCallID_CASE=null;
function OnWSResult(argResult)
{
    if(argResult.id == iCallID_CLS)
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length==0)
			{
				//1110602 Cloud 1110371 升級二代textContent
				//document.all["lbFILE_CLS2"].innerText = WSResult.ClsName;
				document.all["lbFILE_CLS2"].textContent = WSResult.ClsName;
				document.all["tbVerNo"].value = WSResult.VerNo; //多增加帶入版本別值 #2006.02.09 Andy
				bMsg = true;
			}
			else
			{
				//1110602 Cloud 1110371 二代修改不使用activeElment
				//if (document.activeElement.id == "tbFILE_CASE1")
				if (CurrentObjId == "tbFILE_CASE1")
					bMsg = false;
				alert("無此分類號");
				//1110602  Cloud  1110371	二代系統升級，調整focus寫法
				//document.all["lbFILE_CLS2"].innerText = "";
				//document.all["tbFILE_CLS1"].focus();
				document.all["lbFILE_CLS2"].textContent = "";
				$('#tbFILE_CLS1').focus();
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
				//1110602 Cloud 1110371 升級二代
				//document.all["lbFILE_CASE2"].innerText = WSResult.CaseName;
				document.all["lbFILE_CASE2"].textContent = WSResult.CaseName;
			}
			else
			{
				alert("無此案次號");
				//1110602 Cloud 1110371 升級二代
				/*document.all["lbFILE_CASE2"].innerText = "";
				document.all["tbFILE_CASE1"].focus();*/
				document.all["lbFILE_CASE2"].textContent = "";
				$('#tbFILE_CASE1').focus();
				
			}
		}
	}
}

function ClientOnLoad()
{
    //1051004   Kenny   [1050313]   一併移除無用CODE 
    //jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
    //jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,null);
    FMCheckBox_onClick();	
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1110602 Cloud 1110371 升級二代textContent
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function RedioButton_onclick()
{
	if (document.all["rbL"].checked)
	{
		document.all["lbDesc"].className = "InputFieldText";
		document.all["lbDetail"].className = "InputFieldText";
		//1110602  Cloud  1110371	二代系統升級，調整focus寫法
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