/*****************************************************************************
*  DATE			SA		PRG		MGR_NO		DESC
*  2011.09.22	--		Ivory		1000612		新增分類號及案次號查詢功能按鈕,以及列印案卷封面時,依照所輸入分類號(目+節)的中文名稱當作封面的名稱
*	2014.03.31	Cloud	Eileen		1030182		清查將原使用AKC320分類號查詢改使用EAC005
*   2017.02.07  Cloud   Justin      1050087     二代公文修改
*  1070830      Kevin   Zen     1070678     弱掃Ajax修正 * 1100204      Ledlie  Zen     1090927     取消使用document.activeElement
*****************************************************************************/

// Andy	Cola	000970
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060207  Justin [1050087] 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1070830 Zen 1070678 弱掃Ajax修正
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

//1060207  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060207  Justin [1050087] 二代公文修改
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
		case "btCls":	//分類號
		case "btCls2":
			var strUrl = "../../../EA/EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=AKR320" + "&VER_NO=" + document.all["tbVerNo"].value + "&MODE=1&SHOWALL=1";	
			jf_OpenChildWin(strUrl, "AKR320", 750, 500 );	
			if( xObjectName == "btCls" )
				ActiveBtn="btCls";
			else
				ActiveBtn="btCls2";
			Page_BlockSubmit = true;
			break;

		case "btClass":	//案次號(起)
		case "btClass2": //案次號(迄)
			var alertmsg = "" ;
			if( document.all["tbFILE_YEAR"].value == "" )
			{
				alertmsg  = "請先輸入年度號" ;
			}
			if( document.all["tbFILE_CLS1"].value == ""  )
			{
				if( xObjectName == "btClass" )		
				{	
					if( alertmsg == "" )
						alertmsg += "請先輸入分類號(起)\n" ;	
					else
						alertmsg += ",分類號(起)" ;
				}			
			}	
			if( document.all["tbFILE_CLS2"].value == ""  )
			{
				if( xObjectName == "btClass2" )			
				{	
					if( alertmsg == "" )
						alertmsg += "請先輸入分類號(訖)\n" ;	
					else
						alertmsg += ",分類號(訖)" ;
				}					
			}	
			if( alertmsg != "" )
				alert(alertmsg) ;
			else
			{
				//1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
				/*var strUrl = "AKC320.aspx?rtnObj=lbReturnValue&nFrom=AKR320" ;  
				if( xObjectName == "btClass" )
				{
					if( document.all["tbFILE_CLS1"].value != "" )
						strUrl += "&k1=" + document.all["tbFILE_CLS1"].value ;
				}
				else if ( xObjectName == "btClass2" )
				{
					if( document.all["tbFILE_CLS2"].value != "" )
						strUrl += "&k1=" + document.all["tbFILE_CLS2"].value ;
				}
				if(document.all["tbFILE_YEAR"].value != "" )
					strUrl += "&argYear="+ document.all["tbFILE_YEAR"].value;	
				jf_OpenChildWin(strUrl,"AKC32",750,500);*/
				
				var strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKR323&MODE=2&SHOWALL=1&VER_NO="+jf_Trim(document.all.tbVerNo.value)+"&FILE_YEAR="+jf_Trim(document.all.tbFILE_YEAR.value);
				if (xObjectName=="btClass")
					strUrl +=	"&FILE_CLS="+jf_Trim(document.all.tbFILE_CLS1.value);
				else if (xObjectName=="btClass2")
					strUrl +=	"&FILE_CLS="+jf_Trim(document.all.tbFILE_CLS2.value);
				strUrl += "&SAMLart="+GetParam("SAMLart");
				jf_OpenChildWin(strUrl,"EAC005",750,500);
				//Eileen -- end
				
				if( xObjectName == "btClass" )			
					ActiveBtn="btClass";
				else 
					ActiveBtn="btClass2";	
				Page_BlockSubmit = true;
				break;
			}
	}	
}

//1060207  Justin [1050087] 二代公文修改 
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
	
    //1060207  Justin [1050087] 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
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
		    //1060207  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}
function Check_Form_IsValid()
{
	var fr        = document.AKR323;
	var pNotAllowNull = false;
	var pBuf      = "";  
	var pValid = "true";
	var pFileVol="";
	
	if ( (fr.tbFILE_YEAR.value == "") && (fr.tbFILE_CLS1.value == "") && (fr.tbFILE_CASE1.value == "") && (fr.tbFILE_VOL1.value == "") )
	{
		alert("請至少輸入年度條件");
		fr.tbFILE_YEAR.focus();
		return false;
	}

	if ((fr.tbFILE_VOL1.value != "") && (fr.tbFILE_VOL2.value != ""))		 
	{
		if (fr.tbFILE_VOL1.value > fr.tbFILE_VOL2.value )		
		{
			pFileVol =  "卷次起不可大於迄 \n\n";
			if (pValid) fr.tbFILE_VOL1.focus();
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
			if (pValid)  fr.tbFILE_CASE1.focus();
			pValid = false;
		}
	}
	else pNotAllowNull = true;

	if(fr.tbFILE_CLS1.value == "")
	{
　　	if (pNotAllowNull) 
　　	{
　　		pBuf = pBuf + "分類號 \n ";
　　		if (pValid) fr.tbFILE_CLS1.focus();
			pValid = false;
		} 
	}
	else pNotAllowNull = true;
	
	if(fr.tbVerNo.value == "")
	{
　　	if (pNotAllowNull) 
　　	{
　　		pBuf = pBuf + "版本別 \n ";
　　		if (pValid) fr.tbVerNo.focus();
			pValid = false;
		} 
	}
	else pNotAllowNull = true;
		    	
	if(fr.tbFILE_YEAR.value == "")
	{
		if (pNotAllowNull)
		{
			pBuf = pBuf + "年度 \n ";
			if (pValid) fr.tbFILE_YEAR.focus();
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
	var fr = document.AKR323;
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
			fr.tbFILE_YEAR.focus();
		else if(fr.tbFILE_CLS1.value == "")
			fr.tbFILE_CLS1.focus();
		else if(fr.tbVerNo.value == "")
			fr.tbVerNo.focus();
		else if(fr.tbFILE_CASE1.value == "")
			fr.tbFILE_CASE1.focus();
		else if (fr.tbFILE_VOL2.value == "")
			fr.tbFILE_VOL2.focus();
		else
			fr.txPos.focus();
		alert(errMsg);
		return false;
	}

	if ((fr.tbFILE_VOL1.value != "") && (fr.tbFILE_VOL2.value != ""))		 
	{
		if (fr.tbFILE_VOL1.value > fr.tbFILE_VOL2.value )		
		{
			alert("卷次起不可大於迄");
			fr.tbFILE_VOL1.focus();
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


function TbOnBlur(argTextBox)
{
	var xObjectName = document.activeElement.id;
		
	if ((xObjectName == "btExit") || (xObjectName == "btExitImg"))
		return;
	
	//分類號(起)
	if (argTextBox=="tbFILE_CLS1" || argTextBox=="tbVerNo")
	{
		if (document.all["tbFILE_CLS1"].value=="")
		{
		    //1060207  Justin [1050087] 二代公文修改 
		    //document.all["lbFILE_CLS1"].innerText = "";
		    document.all["lbFILE_CLS1"].value = "";
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
	//Cola 000970 新增分類號(訖)欄位Onblur時帶出相關資訊
	//分類號(訖)
	if (argTextBox=="tbFILE_CLS2")
	{
		if (document.all["tbFILE_CLS2"].value=="")
		{
		    //1060207  Justin [1050087] 二代公文修改 
		    //document.all["lbFILE_CLS2"].innerText = "";
		    document.all["lbFILE_CLS2"].value = "";
			return;
		}
		if (bMsg)
		{
			var param = new Array(2);
			param[0] = document.all["tbFILE_CLS2"].value;
			param[1] = document.all["tbVerNo"].value;
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA_V",false,param); //新增輸入版本別 #2006.02.09 Andy
			iCallID_CLS_2 = RtnObj.id;
			OnWSResult(RtnObj);
		}
		else
			bMsg = true;
	}
	//1001004	Ivory	1000612		案次號檢核	---start----
	//案次號(起)
	if (argTextBox=="tbFILE_CASE1")
	{
		var VerNo = jf_Trim(document.all.tbVerNo.value);
		//1001004	Ivory	空白檢核判斷
		//if (document.all["tbFILE_CASE1"].value=="")
		if (jf_Trim(document.all["tbFILE_CASE1"].value)=="")
		{
		    //1060207  Justin [1050087] 二代公文修改 
		    //document.all["lbFILE_CASE1"].innerText = "";
		    document.all["lbFILE_CASE1"].value = "";
			return;
		}
		else
		{
			//1001004	Ivory	空白檢核判斷
			//if (document.all["tbFILE_CLS1"].value=="")
			if (jf_Trim(document.all["tbFILE_CLS1"].value)=="")
			{
				alert("請輸入分類號(起)");
				document.all["tbFILE_CLS1"].focus();
				return;
			}
		}
		if (bMsg)
		{
			//1001004	Ivory	1000612		案次號檢核
			/*
			var KeyValue = new Array(1)
			KeyValue[0] = document.all["tbFILE_CLS1"].value;
			var KeyValue1 = new Array(1)
			KeyValue1[0] = document.all["tbFILE_CASE1"].value;
			var param = new Array(4);
			param[0] = document.all["tbFILE_YEAR"].value;
			param[1] = KeyValue;
			param[2] = KeyValue1;
			param[3] = "";
			
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
			iCallID_CASE = RtnObj.id;
			OnWSResult(RtnObj);
			*/
			var KeyValue = new Array(2);
			KeyValue[0] = jf_Trim(document.all["tbFILE_CLS1"].value);
			KeyValue[1]= jf_Trim(document.all["tbFILE_CASE1"].value);
			var CheckResult=";";
            //1070830 Zen 1070678 弱掃Ajax修正
            //CheckResult = AKR323.CheckCase(document.all.OrgNo.value, document.all["tbFILE_YEAR"].value, KeyValue[0], KeyValue[1], VerNo).value;
            CheckResult = AK.AKR323.CheckCase(document.all.OrgNo.value, document.all["tbFILE_YEAR"].value, KeyValue[0], KeyValue[1], VerNo).value;
			if (CheckResult.split(';')[0] == "false")
			{
				alert(CheckResult.split(';')[1]+"(起)");
				document.all["tbFILE_CASE1"].value="";
				document.all["lbFILE_CASE1"].value="";
				document.all["tbFILE_CASE1"].focus();	
			}		
			else
			{
				document.all["tbFILE_CASE1"].value=CheckResult.split(';')[2];
				document.all["lbFILE_CASE1"].value=CheckResult.split(';')[3];
			}
		}
		else
			bMsg = true;
	}
	//Cola 000970 新增案次號(訖)欄位Onblur時帶出相關資訊	
	//案次號(訖)
	if (argTextBox=="tbFILE_CASE2")
	{
		var VerNo = jf_Trim(document.all.tbVerNo.value);
		//1001004	Ivory	空白檢核判斷
		//if (document.all["tbFILE_CASE2"].value=="")
		if (jf_Trim(document.all["tbFILE_CASE2"].value)=="")
		{
		    //1060207  Justin [1050087] 二代公文修改 
		    //document.all["lbFILE_CASE2"].innerText = "";
		    document.all["lbFILE_CASE2"].value = "";
			return;
		}
		else //#2006.06.19 Andy
		{
			//1001004	Ivory	空白檢核判斷
			//if (document.all["tbFILE_CLS2"].value=="")
			if (jf_Trim(document.all["tbFILE_CLS2"].value)=="")
			{
				alert("請輸入分類號(訖)");
				document.all["tbFILE_CLS2"].focus();
				return;
			}
		}
		if (bMsg)
		{
			//1001004	Ivory	1000612		案次號檢核
			/*
			var KeyValue = new Array(1)
			if (document.all["tbFILE_CLS2"].value=="")
			{
				//Cola 000970 -- 若分類號(訖) 為空，則以分類號(起)為主-
				KeyValue[0] = document.all["tbFILE_CLS1"].value;
			}
			else
			{	
				//Cola 000970 -- 反之, 若有值, 則以分類號(訖)為主-
				KeyValue[0] = document.all["tbFILE_CLS2"].value;
			}
			var KeyValue1 = new Array(1)
			KeyValue1[0] = document.all["tbFILE_CASE2"].value;
			var param = new Array(4);
			param[0] = document.all["tbFILE_YEAR"].value;
			param[1] = KeyValue;
			param[2] = KeyValue1;
			param[3] = "";
			
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
			iCallID_CASE_2 = RtnObj.id;
			OnWSResult(RtnObj);
			*/
			var KeyValue = new Array(2);
			if (jf_Trim(document.all["tbFILE_CLS2"].value)=="")
				KeyValue[0] = jf_Trim(document.all["tbFILE_CLS1"].value);
			else
				KeyValue[0] = jf_Trim(document.all["tbFILE_CLS2"].value);
			KeyValue[1]= jf_Trim(document.all["tbFILE_CASE2"].value);
			var CheckResult=";";
            //1070830 Zen 1070678 弱掃Ajax修正
            //CheckResult = AKR323.CheckCase(document.all.OrgNo.value, document.all["tbFILE_YEAR"].value, KeyValue[0], KeyValue[1], VerNo).value;
            CheckResult = AK.AKR323.CheckCase(document.all.OrgNo.value, document.all["tbFILE_YEAR"].value, KeyValue[0], KeyValue[1], VerNo).value;
			if (CheckResult.split(';')[0] == "false")
			{
				alert(CheckResult.split(';')[1]+"(訖)");
				document.all["tbFILE_CASE2"].value="";
				document.all["lbFILE_CASE2"].value="";
				document.all["tbFILE_CASE2"].focus();	
			}		
			else
			{
				document.all["tbFILE_CASE2"].value=CheckResult.split(';')[2];
				document.all["lbFILE_CASE2"].value=CheckResult.split(';')[3];
			}
		}
		else
			bMsg = true;
	}
	//----end----	
}

var bMsg = true;
var iCallID_CLS=null;
var iCallID_CASE=null;
var iCallID_CLS_2=null;
var iCallID_CASE_2=null;
//1100204 Zen 1090927 取消使用document.activeElementvar CurrentObjId;
function OnWSResult(argResult)
{
    if(argResult.id == iCallID_CLS)
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length==0)
			{
			    //1060207  Justin [1050087] 二代公文修改 
			    //document.all["lbFILE_CLS1"].innerText = WSResult.ClsName;
			    document.all["lbFILE_CLS1"].value = WSResult.ClsName;
				document.all["tbVerNo"].value = WSResult.VerNo; //多增加帶入版本別值 #2006.02.09 Andy
				bMsg = true;
			}
			else
			{
			    //1100204 Zen 1090927 取消使用document.activeElement			    //if (document.activeElement.id == "tbFILE_CASE1")
			    if (CurrentObjId == "tbFILE_CASE1")
					bMsg = false;
				alert("無此分類號(起)");
			    //1060207  Justin [1050087] 二代公文修改 
				//document.all["lbFILE_CLS1"].innerText = "";
				document.all["lbFILE_CLS1"].value = "";
				document.all["tbFILE_CLS1"].value = "";
				document.all["tbFILE_CLS1"].focus();
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
			    //1060207  Justin [1050087] 二代公文修改 
			    //document.all["lbFILE_CLS2"].innerText = WSResult.ClsName;
			    document.all["lbFILE_CLS2"].value = WSResult.ClsName;
				document.all["tbVerNo"].value = WSResult.VerNo; //多增加帶入版本別值 #2006.02.09 Andy
				bMsg = true;
			}
			else
			{
			    //1100204 Zen 1090927 取消使用document.activeElement			    //if (document.activeElement.id == "tbFILE_CASE2")
			    if (CurrentObjId == "tbFILE_CASE2")
			        bMsg = false;
				alert("無此分類號(訖)");
			    //1060207  Justin [1050087] 二代公文修改 
				//document.all["lbFILE_CLS2"].innerText = "";
				document.all["lbFILE_CLS2"].value = "";
				document.all["tbFILE_CLS2"].value = "";				
				document.all["tbFILE_CLS2"].focus();
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
			    //1060207  Justin [1050087] 二代公文修改 
			    //document.all["lbFILE_CASE1"].innerText = WSResult.CaseName;
			    document.all["lbFILE_CASE1"].value = WSResult.CaseName;
			}
			else
			{
			    alert("無此案次號(起)");
			    //1060207  Justin [1050087] 二代公文修改 
			    //document.all["lbFILE_CASE1"].innerText = "";
			    document.all["lbFILE_CASE1"].value = "";
				document.all["tbFILE_CASE1"].value = "";				
				document.all["tbFILE_CASE1"].focus();
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
			    //1060207  Justin [1050087] 二代公文修改 
			    //document.all["lbFILE_CASE2"].innerText = WSResult.CaseName;
			    document.all["lbFILE_CASE2"].value = WSResult.CaseName;
			}
			else
			{
			    alert("無此案次號(訖)");
			    //1060207  Justin [1050087] 二代公文修改 
			    //document.all["lbFILE_CASE2"].innerText = "";
			    document.all["lbFILE_CASE2"].value = "";
				document.all["tbFILE_CASE2"].value = "";				
				document.all["tbFILE_CASE2"].focus();
			}
		}
	}	
}

function ClientOnLoad()
{
   //1060207  Justin [1050087] 二代公文修改 移除無用jf_CallWS
   //jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
   //jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,null);
   FMCheckBox_onClick();	
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060207  Justin [1050087] 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function RedioButton_onclick()
{
	if (document.all["rbL"].checked)
	{
		document.all["lbDesc"].className = "InputFieldText";
		document.all["lbDetail"].className = "InputFieldText";
		document.all["txPos"].focus();
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
				document.all[argYearS].focus();
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
				document.all[argYearS].focus();
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
			document.all[argYearS].focus();
			alert("年度號不可為空白");
			return false;
		}
	}
	else if(argYearE != "")
	{
		strYearS = strYearE;
		if(strYearE == "" && (strClsS == "" && strClsE == ""))
		{
			document.all[argYearE].focus();
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
				document.all[argClsS].focus();
				alert("分類號起值不可以大於訖值");
				return false;
			}
		}
		else if(strClsS != "")
		{
			strClsE = strClsS;
			document.all[argClsE].value = strClsS;
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
				document.all[argClsS].focus();
				alert("分類號不可為空白");
				return false;
			}
		}
		
		if(strClsS != "" || strClsE != "")
		{
			if(strYearS != strYearE && strClsS != strClsE)
			{
				document.all[argYearS].focus();
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
			document.all[argClsS].focus();
			alert("分類號不可為空白");
			return false;
		}
	}
	else if(argClsE != "")
	{
		strClsS = strClsE;
		if(strClsE == "" && ((strYearS == "" && strYearE == "") || strCaseS != "" || strCaseE != "" || strVolS != "" || strVolE != "" || strSeqS != "" || strSeqE != ""))
		{
			document.all[argClsE].focus();
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
				document.all[argCaseS].focus();
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
				document.all[argCaseS].focus();
				alert("案次號不可為空白");
				return false;
			}
		}
		
		if(strCaseS != "" || strCaseE != "")
		{
			if(strClsS != strClsE || (strYearS != strYearE && strCaseS != strCaseE))
			{
				document.all[argClsS].focus();
				alert("指定案次號起訖時年度號-分類號必須相同");
				return false;
			}
		}
	}
	else if(argCaseS != "")
	{
		strCaseE = strCaseS;
		if(strCaseS == "" && (strVolS != "" || strVolE != "" || strSeqS != "" || strSeqE != ""))
		{
			document.all[argCaseS].focus();
			alert("案次號不可為空白");
			return false;
		}
	}
	else if(argCaseE != "")
	{
		strCaseS = strCaseE;
		if(strCaseE == "" && (strVolS != "" || strVolE != "" || strSeqS != "" || strSeqE != ""))
		{
			document.all[argCaseE].focus();
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
				document.all[argVolS].focus();
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
				document.all[argVolS].focus();
				alert("卷次號不可為空白");
				return false;
			}
		}
		
		if(strVolS != "" || strVolE != "")
		{
			if(strCaseS != strCaseE || (strYearS != strYearE && strVolS != strVolE))
			{
				document.all[argCaseS].focus();
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
			document.all[argVolS].focus();
			alert("卷次號不可為空白");
			return false;
		}
	}
	else if(argVolE != "")
	{
		strVolS = strVolE;
		if(strVolE == "" && (strSeqS != "" || strSeqE != ""))
		{
			document.all[argVolE].focus();
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
				document.all[argSeqS].focus();
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
				document.all[argVolS].focus();
				alert("指定目次號起訖時年度號-分類號-案次號-卷次號必須相同");
				return false;
			}
		}
	}
	
	return true;
}

//1000923	Ivory [1000612] 新增分類號起迄,案次號起迄查詢鈕
//1000923	Ivory [1000612] 分類號(起/迄)傳入EAC005為 1.若版本別或年度號有值則傳入版本別,年度號 MODE=2 以帶入的值展開
//                                                    2.若版本別或年度號皆沒值, MODE = 1 預設為版本別52展開

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值

function CallBack(argCallerId)
{
	//1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
	/*//1000923	Ivory [1000612] 分類號(起/訖)帶回版本別及分類號(起/訖) 
	if(argCallerId == "EAC005" )
	{		
		if(ActiveBtn == "btCls" )
		{
			if ( document.all.lbReturnValue.options[1].value!= null )		
				document.all["tbFILE_CLS1"].value = jf_Trim(document.all.lbReturnValue.options[1].value);		
		}
		else 
		{
			if ( document.all.lbReturnValue.options[1].value!= null )		
				document.all["tbFILE_CLS2"].value = jf_Trim(document.all.lbReturnValue.options[1].value);			
		}
		if ( document.all.lbReturnValue.options[5].value != null )			
			document.all["tbVerNo"].value = jf_Trim(document.all.lbReturnValue.options[5].value);	
		var param = new Array(2);
		if( ActiveBtn == "btCls" )
			param[0] = document.all["tbFILE_CLS1"].value;
		else
			param[0] = document.all["tbFILE_CLS2"].value;
		param[1] = document.all["tbVerNo"].value;
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA_V",false,param); //新增輸入版本別 #2006.02.09 Andy
		if( ActiveBtn == "btCls" )
			iCallID_CLS = RtnObj.id;
		else
			iCallID_CLS_2 = RtnObj.id;
		OnWSResult(RtnObj);

	}
	//1000923	Ivory [1000612] 案次號(起/訖)帶回版本別及分類號(起/迄)及案次號(起/訖)
	if( argCallerId == "AKC320" )
	{
		//1001004	Ivory [1000612]	先判斷版本別，符合之後在往下判斷
		var VerNo = jf_Trim(document.all.tbVerNo.value);
		if(VerNo != jf_Trim(document.all.lbReturnValue.options[2].value))
		{
			alert("案次號與版本別不符");
			return;
		}
		if(ActiveBtn == "btClass" )
		{
			if ( document.all.lbReturnValue.options[0].text != null )		
				document.all["tbFILE_CASE1"].value = jf_Trim(document.all.lbReturnValue.options[0].text);
				
		}
		else if(ActiveBtn == "btClass2" )
		{
			if ( document.all.lbReturnValue.options[0].text != null )		
				document.all["tbFILE_CASE2"].value = jf_Trim(document.all.lbReturnValue.options[0].text);
		}	
		var KeyValue = new Array(2)
		if( ActiveBtn == "btClass" )
		{
			KeyValue[0] = jf_Trim(document.all["tbFILE_CLS1"].value);
			KeyValue[1]= jf_Trim(document.all["tbFILE_CASE1"].value);
		}
		else
		{
			KeyValue[0] = jf_Trim(document.all["tbFILE_CLS2"].value);
			KeyValue[1]=jf_Trim(document.all["tbFILE_CASE2"].value);	
		}
		var CheckResult=";";
		CheckResult = AKR323.CheckCase(document.all.OrgNo.value,document.all["tbFILE_YEAR"].value,KeyValue[0],KeyValue[1],VerNo).value;
		if (CheckResult.split(';')[0] == "false")
		{
			if( ActiveBtn == "btClass" )
			{
				alert(CheckResult.split(';')[1]+"(起)");
				document.all["tbFILE_CASE1"].value="";
				document.all["tbFILE_CASE1"].focus();
			}
			else
			{
				alert(CheckResult.split(';')[1]+"(訖)");
				document.all["tbFILE_CASE2"].value="";
				document.all["tbFILE_CASE2"].focus();		
			}		
		}
		else
		{
			if( ActiveBtn == "btClass" )
			{
				document.all["tbFILE_CASE1"].value=CheckResult.split(';')[2];
				document.all["lbFILE_CASE1"].value=CheckResult.split(';')[3];
			}
			else
			{
				document.all["tbFILE_CASE2"].value=CheckResult.split(';')[2];
				document.all["lbFILE_CASE2"].value=CheckResult.split(';')[3];	
			}	
		}	
	}*/
	//lbReturnValue[0]=年度號
	//lbReturnValue[1]=分類號
	//lbReturnValue[2]=案次號
	//lbReturnValue[3]=案次號鍵值case_key
	//lbReturnValue[4]=分類號鍵值cls_key
	//lbReturnValue[5]=版本別
	//lbReturnValue[6]=分類號名稱
	if(argCallerId == "EAC005" )
	{
		if ( document.all.lbReturnValue.length > 0 )
		{
			var param = new Array(2);
			var RtnObj ;
			if ( ActiveBtn == "btCls" || ActiveBtn == "btCls2" )
			{
				document.all.tbVerNo.value = document.all.lbReturnValue.options[5].value;//版本別
				document.all.tbFILE_YEAR.value = document.all.lbReturnValue.options[0].value;//年度號
				if(ActiveBtn == "btCls")//分類起
					document.all.tbFILE_CLS1.value = document.all.lbReturnValue.options[1].value;
				else if (ActiveBtn == "btCls2")//分類迄
					document.all.tbFILE_CLS2.value = document.all.lbReturnValue.options[1].value;
				
				param[0] = document.all.lbReturnValue.options[1].value;
				param[1] = document.all.lbReturnValue.options[5].value;
				RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA_V", false, param);
				if(ActiveBtn == "btCls")
					iCallID_CLS = RtnObj.id;
				else if (ActiveBtn == "btCls2")
					iCallID_CLS_2 = RtnObj.id;
				OnWSResult(RtnObj);
			}
			else if ( ActiveBtn=="btClass" || ActiveBtn=="btClass2" )
			{
				var strVerNo = jf_Trim(document.all.tbVerNo.value) ;
				if ( strVerNo != jf_Trim(document.all.lbReturnValue.options[5].value) )
				{
					alert("案次號與版本別不符");
					return;
				}
				if(ActiveBtn == "btClass")//案次起
				{
					document.all.tbFILE_CASE1.value = document.all.lbReturnValue.options[2].value;
					param[0] = document.all.tbFILE_CLS1.value;
					param[1] = document.all.tbFILE_CASE1.value;
				}
				else if (ActiveBtn == "btClass2")//案次迄
				{
					document.all.tbFILE_CASE2.value = document.all.lbReturnValue.options[2].value;
					param[0] = document.all.tbFILE_CLS2.value;
					param[1] = document.all.tbFILE_CASE2.value;
				}
                //1070830 Zen 1070678 弱掃Ajax修正
                //var CheckResult = AKR323.CheckCase(document.all.OrgNo.value, document.all.tbFILE_YEAR.value, param[0], param[1], strVerNo).value;
                var CheckResult = AK.AKR323.CheckCase(document.all.OrgNo.value, document.all.tbFILE_YEAR.value, param[0], param[1], strVerNo).value;
				if (CheckResult.split(';')[0] == "false")
				{
					if( ActiveBtn == "btClass" )
					{
						alert(CheckResult.split(';')[1]+"(起)");
						document.all.tbFILE_CASE1.value="";
						document.all.tbFILE_CASE1.focus();
					}
					else if (ActiveBtn == "btClass2")
					{
						alert(CheckResult.split(';')[1]+"(訖)");
						document.all.tbFILE_CASE2.value="";
						document.all.tbFILE_CASE2.focus();		
					}		
				}
				else
				{
					if( ActiveBtn == "btClass" )
					{
						document.all.tbFILE_CASE1.value=CheckResult.split(';')[2];
						document.all.lbFILE_CASE1.value=CheckResult.split(';')[3];
					}
					else if (ActiveBtn == "btClass2")
					{
						document.all.tbFILE_CASE2.value=CheckResult.split(';')[2];
						document.all.lbFILE_CASE2.value=CheckResult.split(';')[3];	
					}	
				}	
			}
		}
	}
	//Eileen -- end
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
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



