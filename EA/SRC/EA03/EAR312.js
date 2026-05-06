/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* 程式修改歷程 
* -------------------------------------------------------------------------------------------------
* 日期			系統分析師	修改人	單號			概要
* -------------------------------------------------------------------------------------------------
* 1030626		Cloud		Eric	1030340			新增程式
* 1031112	    Leslie		Kevin_C	1020726			於__doPostBack前加上IsServerHandling=true,避免重複執行
* 1060215       Cloud       Justin  1050087         二代公文修改 * 1100204      Leslie      Zen     1090927         取消使用document.activeElement
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");
//1060215  Justin [1050087] 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	document.all["empUserId"].value = "";
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060215  Justin [1050087] 二代公文修改
//function ClientButtonControl()
//1100204 Zen 1090927 取消使用document.activeElementvar strBtId = '';
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

    //1100204 Zen 1090927 取消使用document.activeElement	strBtId = xObjectName;
	switch (xObjectName)
	{
		case 'btBorNoS':
			Page_BlockSubmit=true;
			var k1 = document.all["dlBorType"].value;
			if(k1=="")
				k1="0";
			var strUrl = "../../../AK/AKS502.aspx?rtnObj=lbReturnValue&k1=" + k1+"&SAMLart="+GetParam("SAMLart");//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			jf_OpenChildWin(strUrl, "AKS502_customwindow", 700, 500 );
			break;
		case 'btBorNoE':
			Page_BlockSubmit=true;
			var k1 = document.all["dlBorType"].value;
			if(k1=="")
				k1=0;
			var strUrl = "../../../AK/AKS502.aspx?rtnObj=lbReturnValue&k1=" + k1+"&SAMLart="+GetParam("SAMLart");//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			jf_OpenChildWin(strUrl, "AKS502_customwindow", 700, 500 );
			break;
		case "btCls":   //分類號子視窗
		    var pUrl = "";
		    //1060215  Justin [1050087] 二代公文修改
		    //pUrl = "../../EA/EA01/EAC005.aspx?nFrom=EAR312&MODE=1&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txYEAR.value) + "&FILE_CLS=" + jf_Trim(document.all.txCLS.value) + "&SAMLart=" + GetParam("SAMLart");
		    pUrl = "../../EA01/EAC005.aspx?nFrom=EAR312&MODE=1&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txYEAR.value) + "&FILE_CLS=" + jf_Trim(document.all.txCLS.value) + "&SAMLart=" + GetParam("SAMLart");
			jf_OpenChildWin(pUrl,"EAC005",750,550);
			ActiveBtn="btCls";
			Page_BlockSubmit = true;
			break;
		case "btCase": //案次號子視窗
		    var pUrl = "";
		    //1060215  Justin [1050087] 二代公文修改
		    //pUrl = "../../EA/EA01/EAC005.aspx?nFrom=EAR312&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txYEAR.value) + "&FILE_CLS=" + jf_Trim(document.all.txCLS.value) + "&SAMLart=" + GetParam("SAMLart");
		    pUrl = "../../EA01/EAC005.aspx?nFrom=EAR312&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txYEAR.value) + "&FILE_CLS=" + jf_Trim(document.all.txCLS.value) + "&SAMLart=" + GetParam("SAMLart");
			jf_OpenChildWin(pUrl,"EAC005",750,550);
			ActiveBtn="btCase";
			Page_BlockSubmit = true;
			break;
		    /*1060215  Justin [1050087] 二代公文修改
		case "btBorDate":
			Page_BlockSubmit=true; 
			jf_CallCalendar(document.all["txDateS"], event.screenX, event.screenY);
		    break;
		case "btBorDateE":
			Page_BlockSubmit=true; 
			jf_CallCalendar(document.all["txDateE"], event.screenX, event.screenY);
		    break;*/
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060215  Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1060215  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	    case "btSearch":
	        //1060215  Justin [1050087] 二代公文修改
	        //CheckSearch();
	        CheckSearch(xObjectName);
			break;
	    case "btPrint":
	        //1060215  Justin [1050087] 二代公文修改
	        //CheckPrint();
	        CheckPrint(xObjectName);
			break;
	    case "btPreview":
	        //1060215  Justin [1050087] 二代公文修改
	        //CheckPrint();
	        CheckPrint(xObjectName);
			break;
		
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
	}
}



/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	if (argCallerId=="EAC005")
	{
		if(ActiveBtn == "btCls" || ActiveBtn == "btCase") 
		{
			document.all.txCLS.value   = document.all.lbReturnValue.options[1].value ;
			document.all.txCASE.value = document.all.lbReturnValue.options[2].value ;
			if ( document.all.lbReturnValue.options[0].value != "" )
				document.all.txYEAR.value = document.all.lbReturnValue.options[0].value ;
		}
	}
	else if (argCallerId == "AKS502")
	{
	    //1100204 Zen 1090927 取消使用document.activeElement	    //if (document.activeElement.id == "btBorNoS")
	    if (strBtId == "btBorNoS")
		{
			document.all["txBorNoS"].value = document.all["lbReturnValue"].options[0].value;
		}
		else
		{
			document.all["txBorNoE"].value = document.all["lbReturnValue"].options[0].value;
		}
	    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
		IsServerHandling = true;
		__doPostBack("", ""); 
	}
	

	if(document.all.lbReturnValue.options != null)//清空lbReturnValue物件
		document.all.lbReturnValue.options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1060215  Justin [1050087] 二代公文修改
//function CheckSearch()
function CheckSearch(xObjectName)
{
	if(jf_Trim(document.all.txBorNoS.value)==""&&jf_Trim(document.all.txBorNoE.value) == ""&&
	jf_Trim(document.all.txDateS.value)==""&&jf_Trim(document.all.txDateE.value)== ""&&
	jf_Trim(document.all.txDOC_NOS.value)==""&&jf_Trim(document.all.txDOC_NOE.value)== ""&&
	jf_Trim(document.all.txYEAR.value)==""&&jf_Trim(document.all.txCLS.value)== ""&&
	jf_Trim(document.all.txCASE.value)==""&&jf_Trim(document.all.txVOL.value)== ""&&
	jf_Trim(document.all.txSEQ.value)==""&&jf_Trim(document.all.dlDEPT.value)== ""&&
	jf_Trim(document.all.dlUser.value)==""&&jf_Trim(document.all.dlBorType.value)== ""
	)
	{
	    alert("請至少輸入一項條件");
        //1060215  Justin [1050087] 二代公文修改
	    //document.all["txBorNoS"].focus();
	    $('#txBorNoS').focus();
		 return;
	}
	if(!CheckDATE("txDateS","調案核可日期(起)"))
	{  
			return;
	}
	if(!CheckDATE("txDateE","調案核可日期(迄)"))
	{	 		
			return;
	}
	if(jf_Trim(document.all.txSEQ.value)!="")
	{
		if(jf_Trim(document.all.txYEAR.value)==""||jf_Trim(document.all.txCLS.value)== ""||
			jf_Trim(document.all.txCASE.value)==""||jf_Trim(document.all.txVOL.value)== "")
		{
		    if (jf_Trim(document.all.txVOL.value) == "")
		        //1060215  Justin [1050087] 二代公文修改
		        //document.all["txCASE"].focus();
		        $('#txVOL').focus();
			if(jf_Trim(document.all.txCASE.value)=="")
			    //document.all["txCASE"].focus();
			    $('#txCASE').focus();
			if(jf_Trim(document.all.txCLS.value)=="")
			    //document.all["txCLS"].focus();
			    $('#txCLS').focus();
			if(jf_Trim(document.all.txYEAR.value)=="")
			    //document.all["txYEAR"].focus();
			    $('#txYEAR').focus();
		    //1060215  Justin [1050087] 二代公文修改
			alert("請輸入完整檔號");
		}
	}
	else if(jf_Trim(document.all.txVOL.value)!="")
	{
		if(jf_Trim(document.all.txYEAR.value)==""||jf_Trim(document.all.txCLS.value)== ""||
			jf_Trim(document.all.txCASE.value)=="")
		{
		    if (jf_Trim(document.all.txCASE.value) == "")
		        //1060215  Justin [1050087] 二代公文修改
		        //document.all["txCASE"].focus();
		        $('#txCASE').focus();
			if(jf_Trim(document.all.txCLS.value)=="")
			    //document.all["txCLS"].focus();
			    $('#txCLS').focus();
			if(jf_Trim(document.all.txYEAR.value)=="")
			    //document.all["txYEAR"].focus();
			    $('#txYEAR').focus();
		    //1060215  Justin [1050087] 二代公文修改
			alert("請輸入完整檔號");
		}
	}
	else if(jf_Trim(document.all.txCASE.value)!="")
	{
		if(jf_Trim(document.all.txYEAR.value)==""||jf_Trim(document.all.txCLS.value)== "")
		{
		    if (jf_Trim(document.all.txCLS.value) == "")
		        //1060215  Justin [1050087] 二代公文修改
		        //document.all["txCLS"].focus();
		        $('#txCLS').focus();
			if(jf_Trim(document.all.txYEAR.value)=="")
			    //document.all["txYEAR"].focus();
			    $('#txYEAR').focus();
		    //1060215  Justin [1050087] 二代公文修改
			alert("請輸入完整檔號");
		}
	}
	else if(jf_Trim(document.all.txCLS.value)!="")
	{
		if(jf_Trim(document.all.txYEAR.value)=="")
		{
		    //1060215  Justin [1050087] 二代公文修改
		    //document.all["txYEAR"].focus();
		    $('#txYEAR').focus();
			alert("請輸入完整檔號");
		}
	}
	else
	{
		
		//檢查起訖年月是否正確
		if(jf_Trim(document.all.txDateS.value) != "" && jf_Trim(document.all.txDateE.value) != "")
		{
			if(jf_Trim(document.all.txDateS.value)  > jf_Trim(document.all.txDateE.value))
			{
				var temp = jf_Trim(document.all.txDateS.value);
				document.all.txDateS.value = jf_Trim(document.all.txDateE.value);
				document.all.txDateE.value = temp ;
			}
		}
		//檢查起訖文號是否正確
		if(jf_Trim(document.all.txDOC_NOS.value) != "" && jf_Trim(document.all.txDOC_NOE.value) != "")
		{
			if(jf_Trim(document.all.txDOC_NOS.value)  > jf_Trim(document.all.txDOC_NOE.value))
			{
				var temp = jf_Trim(document.all.txDOC_NOS.value);
				document.all.txDOC_NOS.value = jf_Trim(document.all.txDOC_NOE.value);
				document.all.txDOC_NOE.value = temp ;
			}
		}
		Page_BlockSubmit = false;
	    //1060215  Justin [1050087] 二代公文修改 
	    //jf_ToolBarSubmit();
		jf_ToolBarSubmit(xObjectName);
	}			
}

//1060215  Justin [1050087] 二代公文修改
//function CheckPrint()
function CheckPrint(xObjectName)
{
	if(jf_Trim(document.all.txBorNoS.value)==""&&jf_Trim(document.all.txBorNoE.value) == ""&&
	jf_Trim(document.all.txDateS.value)==""&&jf_Trim(document.all.txDateE.value)== ""&&
	jf_Trim(document.all.txDOC_NOS.value)==""&&jf_Trim(document.all.txDOC_NOE.value)== ""&&
	jf_Trim(document.all.txYEAR.value)==""&&jf_Trim(document.all.txCLS.value)== ""&&
	jf_Trim(document.all.txCASE.value)==""&&jf_Trim(document.all.txVOL.value)== ""&&
	jf_Trim(document.all.txSEQ.value)==""&&jf_Trim(document.all.dlDEPT.value)== ""&&
	jf_Trim(document.all.dlUser.value)==""&&jf_Trim(document.all.dlBorType.value)== ""
	)
	{
	    alert("請至少輸入一項條件");
	    //1060215  Justin [1050087] 二代公文修改
	    //document.all["txBorNoS"].focus();
	    $('#txBorNoS').focus();
		 return;
	}
	if(!CheckDATE("txDateS","調案核可日期(起)"))
	{  
			return;
	}
	if(!CheckDATE("txDateE","調案核可日期(迄)"))
	{	 		
			return;
	}
	/*
	else if(jf_Trim(document.all.txSEQ.value)!="")
	{
		if(jf_Trim(document.all.txYEAR.value)==""||jf_Trim(document.all.txCLS.value)== ""||
			jf_Trim(document.all.txCASE.value)==""||jf_Trim(document.all.txVOL.value)== "")
			alert("請輸入完整檔號")
	}
	else if(jf_Trim(document.all.txVOL.value)!="")
	{
		if(jf_Trim(document.all.txYEAR.value)==""||jf_Trim(document.all.txCLS.value)== ""||
			jf_Trim(document.all.txCASE.value)=="")
			alert("請輸入完整檔號")
	}
	else if(jf_Trim(document.all.txCASE.value)!="")
	{
		if(jf_Trim(document.all.txYEAR.value)==""||jf_Trim(document.all.txCLS.value)== "")
			alert("請輸入完整檔號")
	}
	else if(jf_Trim(document.all.txCLS.value)!="")
	{
		if(jf_Trim(document.all.txYEAR.value)=="")
			alert("請輸入完整檔號")
	}
	*/
	if(jf_Trim(document.all.txSEQ.value)!="")
	{
		if(jf_Trim(document.all.txYEAR.value)==""||jf_Trim(document.all.txCLS.value)== ""||
			jf_Trim(document.all.txCASE.value)==""||jf_Trim(document.all.txVOL.value)== "")
		{
		    if (jf_Trim(document.all.txVOL.value) == "")
		        //1060215  Justin [1050087] 二代公文修改
		        //document.all["txCASE"].focus();
		        $('#txVOL').focus();
			if(jf_Trim(document.all.txCASE.value)=="")
			    //document.all["txCASE"].focus();
			    $('#txCASE').focus();
			if(jf_Trim(document.all.txCLS.value)=="")
			    //document.all["txCLS"].focus();
			    $('#txCLS').focus();
			if(jf_Trim(document.all.txYEAR.value)=="")
			    //document.all["txYEAR"].focus();
			    $('#txYEAR').focus();
		    //1060215  Justin [1050087] 二代公文修改
			alert("請輸入完整檔號");
		}
	}
	else if(jf_Trim(document.all.txVOL.value)!="")
	{
		if(jf_Trim(document.all.txYEAR.value)==""||jf_Trim(document.all.txCLS.value)== ""||
			jf_Trim(document.all.txCASE.value)=="")
		{
		    if (jf_Trim(document.all.txCASE.value) == "")
		        //1060215  Justin [1050087] 二代公文修改
		        //document.all["txCASE"].focus();
		        $('#txCASE').focus();
			if(jf_Trim(document.all.txCLS.value)=="")
			    //document.all["txCLS"].focus();
			    $('#txCLS').focus();
			if(jf_Trim(document.all.txYEAR.value)=="")
			    //document.all["txYEAR"].focus();
			    $('#txYEAR').focus();
		    //1060215  Justin [1050087] 二代公文修改
			alert("請輸入完整檔號");
		}
	}
	else if(jf_Trim(document.all.txCASE.value)!="")
	{
		if(jf_Trim(document.all.txYEAR.value)==""||jf_Trim(document.all.txCLS.value)== "")
		{
		    if (jf_Trim(document.all.txCLS.value) == "")
		        //1060215  Justin [1050087] 二代公文修改
		        //document.all["txCLS"].focus();
		        $('#txCLS').focus();
			if(jf_Trim(document.all.txYEAR.value)=="")
			    //document.all["txYEAR"].focus();
			    $('#txYEAR').focus();
		    //1060215  Justin [1050087] 二代公文修改
			alert("請輸入完整檔號");
		}
	}
	else if(jf_Trim(document.all.txCLS.value)!="")
	{
		if(jf_Trim(document.all.txYEAR.value)=="")
		{
		    //1060215  Justin [1050087] 二代公文修改
		    //document.all["txYEAR"].focus();
		    $('#txYEAR').focus();
			alert("請輸入完整檔號");
		}
	}
	else if(jf_Trim(document.all.txSearch.value)=="1")
	{
		var chbox = 0 ;
		for(var i = 2; i <= document.all.dg1.rows.length; i++)
		{
			if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
			{
				chbox=1;
			}
		}
		if(chbox==1)
		{
			//檢查起訖年月是否正確
			if(jf_Trim(document.all.txDateS.value) != "" && jf_Trim(document.all.txDateE.value) != "")
			{
				if(jf_Trim(document.all.txDateS.value)  > jf_Trim(document.all.txDateE.value))
				{
					var temp = jf_Trim(document.all.txDateS.value);
					document.all.txDateS.value = jf_Trim(document.all.txDateE.value);
					document.all.txDateE.value = temp ;
				}
			}
			//檢查起訖文號是否正確
			if(jf_Trim(document.all.txDOC_NOS.value) != "" && jf_Trim(document.all.txDOC_NOE.value) != "")
			{
				if(jf_Trim(document.all.txDOC_NOS.value)  > jf_Trim(document.all.txDOC_NOE.value))
				{
					var temp = jf_Trim(document.all.txDOC_NOS.value);
					document.all.txDOC_NOS.value = jf_Trim(document.all.txDOC_NOE.value);
					document.all.txDOC_NOE.value = temp ;
				}
			}
			Page_BlockSubmit = false;
		    //1060215  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
		}
		else
		{
			alert("請至少勾選一筆資料")
		}
	}
	else
	{
		//檢查起訖年月是否正確
		if(jf_Trim(document.all.txDateS.value) != "" && jf_Trim(document.all.txDateE.value) != "")
		{
			if(jf_Trim(document.all.txDateS.value)  > jf_Trim(document.all.txDateE.value))
			{
				var temp = jf_Trim(document.all.txDateS.value);
				document.all.txDateS.value = jf_Trim(document.all.txDateE.value);
				document.all.txDateE.value = temp ;
			}
		}
		//檢查起訖文號是否正確
		if(jf_Trim(document.all.txDOC_NOS.value) != "" && jf_Trim(document.all.txDOC_NOE.value) != "")
		{
			if(jf_Trim(document.all.txDOC_NOS.value)  > jf_Trim(document.all.txDOC_NOE.value))
			{
				var temp = jf_Trim(document.all.txDOC_NOS.value);
				document.all.txDOC_NOS.value = jf_Trim(document.all.txDOC_NOE.value);
				document.all.txDOC_NOE.value = temp ;
			}
		}
		Page_BlockSubmit = false;
	    //1060215  Justin [1050087] 二代公文修改 
	    //jf_ToolBarSubmit();
		jf_ToolBarSubmit(xObjectName);
	}			
}
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
function PADZERO(obj,num)
{
	if(obj.value!="")
	{
		obj.value = jf_PADL(obj.value,num,"0");
	}
}
//1030707	Cloud	修改日期檢核邏輯
/*function CheckDATE()
{
	if(document.all.txDateS.value!=""||document.all.txDateE.value!="")
	{
		if (!jf_CheckCDATE(document.all.txDateS.value)||!jf_CheckCDATE(document.all.txDateE.value))
		{			
			if(document.all.txDateS.value!="")
			{
				if (!jf_CheckCDATE(document.all.txDateS.value))
				{
					document.all.txDateS.value = "";
					alert("(起始)日期格式輸入錯誤");
					document.all.txDateS.focus();	
				}
			}	
			if(document.all.txDateE.value!="")
			{
				if (!jf_CheckCDATE(document.all.txDateE.value))
				{
					document.all.txDateE.value = "";
					alert("(起始)日期格式輸入錯誤");
					document.all.txDateE.focus();	
				}
			}
		}
	}
}*/
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
		    //1060215  Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
		    $('#' + argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
//紀錄Client端所選擇之UserID
function jf_dlUserChange()
{
	var empUserInfo = document.all["dlUser"].options(document.all["dlUser"].selectedIndex).value;
	var tempstr = empUserInfo.split(":");
	document.all["empUserId"].value = tempstr[2];	
	document.all["empUserIndex"].value = document.all["dlUser"].selectedIndex;
	//var empUserInfo = document.all["dlUser"].options(document.all["dlUser"].selectedIndex).text;
	//document.all["empUserName"].value =empUserInfo;	
}
function InitUserList()
{
	akjf_DeptCheck2("dlDEPT","dlUser");
	document.all["empUserInfo"].value="";
	document.all["empUserInfo2"].value="";
	
	if(document.all["dlUser"].options.length!=0)
	{
		for(var i =0 ;i<document.all["dlUser"].options.length;i++)
		{
			//1030707	Cloud	修改重建承辦人選單邏輯
			/*if(i==0)
			{
				document.all["empUserInfo"].value+=document.all["dlUser"].options(i).text+";";
				document.all["empUserInfo2"].value+=""+";";
			}
			else
			{
				document.all["empUserInfo"].value+=document.all["dlUser"].options(i).text+";";
				var empUser = document.all["dlUser"].options(i).value;
				var temp = empUser.split(":");
				document.all["empUserInfo2"].value+=temp[2]+";";
			}*/
			if(document.all["dlUser"].options(i).text!=="" && document.all["dlUser"].options(i).value.split(":")[2]!="")
			document.all["empUserInfo"].value+=document.all["dlUser"].options(i).text+";"+document.all["dlUser"].options(i).value.split(":")[2]+"|";
		}	
	}
	if(document.all["dlDEPT"].options(document.all["dlDEPT"].selectedIndex).text=="")
	{
		for(var i=0 ; i<document.all.dlUser.length;i++ )
		{
			document.all.dlUser.remove(0);
		}
		document.all.dlUser.length = 0;
		document.all["empUserId"].value = "";
		document.all["empUserIndex"].value = "";
	}
}
