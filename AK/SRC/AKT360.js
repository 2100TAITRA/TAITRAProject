/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1030328	Eileen	1030182	清查將原使用AKC320分類號查詢改使用EAC005
 * 1060220  Joe	 	1050087 二代系統升級
 * 1060413	Kevin_C	1050781	新增檔號起迄條件
 * 1060925  Joe	 	1060867 二代升級修正
 * 1090318	Cloud	1081109	修改年度支援轉版本
 * 1140430　Levi　　1140264 新增Excel、ODS匯出
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060220	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060220	Joe	1050087	二代系統升級
// if (document.all["ValidationSummary1"].textContent != "")
	// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	

//1060413	Kevin_C	1050781	新增檔號起迄條件，修改子視窗開啟部分，紀錄點選按鍵
var strClickBtn = "";
//1060220	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060220	Joe	1050087	二代系統升級
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
		//1060413	Kevin_C	1050781	新增檔號起迄條件，修改子視窗開啟部分
		//case "btHelp":
		case "btHelpS":
			strClickBtn = "btHelpS";
			var strUrl = "";
			//1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
			/*
			strUrl = "AKC320.aspx?rtnObj=lbReturnValue&k1="+document.all["txClsNo"].value;
			jf_OpenChildWin(strUrl,"AKC320",750,550);
			*/
			//1060413	Kevin_C	1050781	新增檔號起迄條件，修改子視窗開啟部分
			//strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKT360&MODE=1&SHOWALL=1&FILE_CLS="+jf_Trim(document.all.txClsNo.value)+"&SAMLart="+GetParam("SAMLart");
			strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKT360&MODE=1&SHOWALL=1&VER_NO="+jf_Trim(document.all.txVerNo.value)+"&FILE_YEAR="+jf_Trim(document.all.txFileYearS.value)+"&FILE_CLS="+jf_Trim(document.all.txClsNoS.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl,"EAC005",750,550);
			//Eileen -- end
			Page_BlockSubmit = true;
			break;
		//1060413	Kevin_C	1050781	新增檔號起迄條件，修改子視窗開啟部分 -S
		case "btHelpS2":
			strClickBtn = "btHelpS2";
			var strUrl = "";
			strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKT360&MODE=2&SHOWALL=1&VER_NO="+jf_Trim(document.all.txVerNo.value)+"&FILE_YEAR="+jf_Trim(document.all.txFileYearS.value)+"&FILE_CLS="+jf_Trim(document.all.txClsNoS.value)+"&FILE_CASE="+jf_Trim(document.all.txCaseNoS.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl,"EAC005",750,550);
			//Eileen -- end
			Page_BlockSubmit = true;
			break;
		case "btHelpE":
			strClickBtn = "btHelpE";
			var strUrl = "";
			strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKT360&MODE=1&SHOWALL=1&VER_NO="+jf_Trim(document.all.txVerNo.value)+"&FILE_YEAR="+jf_Trim(document.all.txFileYearE.value)+"&FILE_CLS="+jf_Trim(document.all.txClsNoE.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl,"EAC005",750,550);
			//Eileen -- end
			Page_BlockSubmit = true;
			break;
		case "btHelpE2":
			strClickBtn = "btHelpE2";
			var strUrl = "";
			strUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKT360&MODE=2&SHOWALL=1&VER_NO="+jf_Trim(document.all.txVerNo.value)+"&FILE_YEAR="+jf_Trim(document.all.txFileYearE.value)+"&FILE_CLS="+jf_Trim(document.all.txClsNoE.value)+"&FILE_CASE="+jf_Trim(document.all.txCaseNoE.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl,"EAC005",750,550);
			//Eileen -- end
			Page_BlockSubmit = true;
			break;
		//1060413	Kevin_C	1050781	新增案號條件起迄，修改子視窗開啟部分 -E
	}	
}

//1060220	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060220	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
		//1140430　　  Levi　　1140264 新增Excel、ODS匯出
		case "btExcel":
		case "btODS":
			Page_BlockSubmit = !UnEmpty();
			//1060220	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	//1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
	/*if (argCallerId=="AKC320")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			document.all["txClsNo"].value =document.all["lbReturnValue"].options[0].value;
			CLSNO_Onblur();
		}
	}*/
	//lbReturnValue[0]=年度號
	//lbReturnValue[1]=分類號
	//lbReturnValue[2]=案次號
	//lbReturnValue[3]=案次號鍵值case_key
	//lbReturnValue[4]=分類號鍵值cls_key
	//lbReturnValue[5]=版本別
	//lbReturnValue[6]=分類號名稱
	if (argCallerId=="EAC005")
	{
		if ( document.all.lbReturnValue.length > 0 )
		{
			//1060413	Kevin_C	1050781	新增檔號起迄條件，修改子視窗回傳邏輯
			//document.all.txClsNo.value = document.all.lbReturnValue.options[1].value;
			//CLSNO_Onblur();
			document.all.txVerNo.value = document.all.lbReturnValue.options[5].value;
			if(strClickBtn == "btHelpS")
			{
				document.all.txClsNoS.value = document.all.lbReturnValue.options[1].value;
				CLSNO_Onblur(document.all.txClsNoS);
			}
			else if( strClickBtn == "btHelpS2")
			{
				document.all.txFileYearS.value = document.all.lbReturnValue.options[0].value;
				document.all.txClsNoS.value = document.all.lbReturnValue.options[1].value;
				document.all.txCaseNoS.value = document.all.lbReturnValue.options[2].value;
				CheckCaseNo(document.all.txCaseNoS);
			}
			else if(strClickBtn == "btHelpE")
			{
				document.all.txClsNoE.value = document.all.lbReturnValue.options[1].value;
				CLSNO_Onblur(document.all.txClsNoE);
			}
			else if(strClickBtn == "btHelpE2")
			{
				document.all.txFileYearE.value = document.all.lbReturnValue.options[0].value;
				document.all.txClsNoE.value = document.all.lbReturnValue.options[1].value;
				document.all.txCaseNoE.value = document.all.lbReturnValue.options[2].value;
				CheckCaseNo(document.all.txCaseNoE);
			}
		}
	}
	if(document.all.lbReturnValue.options != null)//清空lbReturnValue物件
		document.all.lbReturnValue.options.length = 0;
	//Eileen -- end
}

function ClientOnLoad()
{
	//1060925	Joe		1060867		二代升級修正
	// jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
}

function OnWSResult(argResult)
{
    if(argResult.id == wsCheckClsID)
	{
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsErr)
		{
			//1060220	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txClsNo"].focus();
			//1060413	Kevin_C	1050781	因分類號改為起迄值，修改ID
			//$('#txClsNo').focus();
			$('#'+strOblurID).focus();
			if (WSResult.ErrorClass.ErrMessage[0]==jf_GetErrMsg(NoData))
				//1060413	Kevin_C	1050781	修改提示訊息
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["此分類號不存在請重新輸入"])),"");
			else
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([WSResult.ErrorClass.ErrMessage[0]])),"");
		}
		//1060413	Kevin_C	1050781	新增檢核是否為最底層分類號
		else if(WSResult.IS_LOWEST!="1")
		{
			$('#'+strOblurID).focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請輸入最底層分類號"])),"");
		}
		else
		{
			//1060413	Kevin_C	1050781	因檢核邏輯修改，移除txClsName及H_ClsKey -S
			//document.all["txClsName"].value = WSResult.ClsName;
			//document.all["H_ClsKey"].value = WSResult.CLS_KEY;
			//1060413	Kevin_C	1050781	因檢核邏輯修改，移除txClsName及H_ClsKey -E
			//1090318 Cloud 1081109 增加設定版號
			document.all["txVerNo"].value = WSResult.VerNo;

		}
	}
	//1060413	Kevin_C	1050781	新增案次號條件檢核
	if(argResult.id == wsCheckCaseID)
	{
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsErr)
		{
			$('#'+strOblurID).focus();
			if (WSResult.ErrorClass.ErrMessage[0].text==jf_GetErrMsg(NoData))
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["此案次號不存在請重新輸入"])),"");
			else
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([WSResult.ErrorClass.ErrMessage[0]])),"");
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
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

var wsCheckClsID;
//1060413	Kevin_C	1050781	傳入參數確定是起值或迄值
var strOblurID = "";
function CLSNO_Onblur(argObj)
{
	//1060413	Kevin_C	1050781	傳入參數確定是起值或迄值
	//var strClsNo = document.all["txClsNo"].value;
	var strClsNo = argObj.value;
	//1060413	Kevin_C	1050781	取得ID供OnWSResult使用
	strOblurID = argObj.id;
	if (strClsNo == "")
	{
		//1060413	Kevin_C	1050781	傳入參數確定是起值或迄值
		//document.all["txClsName"].value = "";
		return;
	}
	
	//* 1090318	Cloud	1081109	修改年度支援轉版本-改為叫用GETCLS
		/*var param = new Array(2);
		param[0] = strClsNo;
		param[1] = document.all["txVerNo"].value;
		//1060413	Kevin_C	1050781	修改檢核WS
		//RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,param);
		RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA_V", false, param);*/
	var param1 = new Array(3);
	param1[0] = encodeURI(document.all["txVerNo"].value);
	param1[1] = encodeURI(strClsNo);
	if (strOblurID == "txClsNoS")
		param1[2] = encodeURI(document.all["txFileYearS"].value);
	else
		param1[2] = encodeURI(document.all["txFileYearE"].value);
	RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCLS", false, param1);
	
	wsCheckClsID = RtnObj.id;
	OnWSResult(RtnObj);
}
//1060413	Kevin_C	1050781	新增案次號條件檢核
var wsCheckCaseID;
function CheckCaseNo(argObj)
{
	var strCaseNo = argObj.value;
	strOblurID = argObj.id;
	if (strCaseNo == "")
		return;
		
	var param = new Array(5);
	if(strOblurID == "txCaseNoS")
	{
		param[0] = document.all["txFileYearS"].value;
		param[1] = document.all["txClsNoS"].value;
		param[2] = strCaseNo;
		param[3] = "";
		
	}
	else if(strOblurID == "txCaseNoE")
	{
		param[0] = document.all["txFileYearS"].value;
		param[1] = document.all["txClsNoS"].value;
		param[2] = strCaseNo;
		param[3] = "";
	}
	param[4] = document.all["txVerNo"].value;
	
	RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
	wsCheckCaseID = RtnObj.id;
	OnWSResult(RtnObj);
}

function UnEmpty()
{
	//1060413	Kevin_C	1050781	修改檢核方式
	var strErrMsg = "";
	var strSDate = document.all["txSDate"].value;
	var strEDate = document.all["txEDate"].value;
	if (strSDate + strEDate == "")
	{
		//1060220	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txSDate"].focus();
		$('#txSDate').focus();
		//1060413	Kevin_C	1050781	修改檢核方式
		//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["編目日期不可皆為空白"])),"");
		strErrMsg +=  "編目日期不可皆為空白\n"
		//1060413	Kevin_C	1050781	修改檢核方式
		//return false;
	}
	//1060413	Kevin_C	1050781	新增檢核有輸入案次號時，年度及分類號起迄需一致 -S
	if(document.all["txCaseNoS"].value != "" || document.all["txCaseNoS"].value != "")
	{
		if(document.all["txClsNoS"].value != document.all["txClsNoE"].value)
			strErrMsg += "有輸入案次號時，分類號起迄需一致\n";
		if(document.all["txFileYearS"].value != document.all["txFileYearE"].value)
			strErrMsg += "有輸入案次號時，年度號起迄需一致\n";
	}
	if(strErrMsg != "")
	{
		strErrMsg = strErrMsg.substring(0,strErrMsg.length-1);
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		return false;
	}
	//1060413	Kevin_C	1050781	新增檢核有輸入案次號時，年度及分類號起迄需一致 -E
	return true;
}
//############################################################################################
//					其		他		共		用		function
//############################################################################################
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
			//1060220	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
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