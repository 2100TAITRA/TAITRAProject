/*
0980525 Albert 0980263 修正判斷變數錯字，當輸入查詢條件到案次號時strFileYearS誤植為StrFileYearS
1020321	Leslie 1010779 修改畫面檔號條件判斷，由可輸入年度或分類號，改為至少必需輸入年度號
1050125 Cloud  1040846 新增可撈取註記為電子檔案異常，無法修復銷毀公文
1050304	Kevin_C	1050066	顯示加入計劃失敗訊息
1060712	Kevin_C	1050087	升二代
1070830 Zen     1070678 弱掃Ajax修正
1080429	Kevin_C	1080301	一併修正有文號條件時，調整條件的框框太小的問題1100204 Zen     1090927 取消使用document.activeElement
1120308 Cloud 1120063 支援以件銷毀，不可異動
*/
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
var strTableFields = new Array("_cb1");

//1060712	Kevin_C	1050087	升二代
//if(document.all.tbTool)
	//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
	//document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

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

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060712	Kevin_C	1050087	升二代 -S
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, null);
	//1060712	Kevin_C	1050087	升二代 -E
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//1050125 Cloud [1040846]   增加判斷如果為電子無法修復銷毀 不顯示總卷數、不可選擇以卷查詢
	if (document.all["h_txEUNRECOVERY"].value == "1") {
	//1060712	Kevin_C	1050087	升二代 -S
	    //document.all["txVolCnt"].className = "HIDE";
	    //document.all["Label11"].className = "HIDE";
	    document.all["txVolCnt"].className = "hide";
	    document.all["Label11"].className = "hide";
	//1060712	Kevin_C	1050087	升二代 -E
	    document.all["lbDocNo"].className = "InputFieldLabel";
	    document.all["txDocNO"].className = "InputFieldLabel";
		//1080429	Kevin_C	1080301	一併修正有文號條件時，調整條件的框框太小的問題
		document.all["AdjustCondition"].style.height = "140px";
	    document.all["rbItem"].checked = true;
	    document.all["rbVol"].checked = false;
	    document.all["rbVol"].disabled = true;//特殊銷毀設定為停用
	    
	}
	else {
	//1060712	Kevin_C	1050087	升二代 -S
	    //document.all["lbDocNo"].className = "HIDE";
	    //document.all["txDocNO"].className = "HIDE";
	    document.all["lbDocNo"].className = "hide";
	    document.all["txDocNO"].className = "hide";
	//1060712	Kevin_C	1050087	升二代 -E
	}
	//1050304	Kevin_C	1050066	顯示加入計劃失敗訊息
	if(document.all["FailDocNoMsg"] && document.all["FailDocNoMsg"]!="")
	{
		alert(document.all["FailDocNoMsg"].value);
		document.all["FailDocNoMsg"].value = "";
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100204 Zen 1090927 取消使用document.activeElement//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;

	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}	
	switch (xObjectName)
	{
		case "btKeyHelp": //計畫批號提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "EAT400C1.aspx";
			jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
			break;
			
		case "btSelectAll":
		    Page_BlockSubmit=true;
			if(document.all.rbVol.checked)
		    {   try
		        {		        
					SelectAllCb("dg1");
				}
				catch(e){}
			}else
			{   
				try
		        {
					SelectAllCb("dg2");
			    }
			    catch(e){}
			}
			break;
		case "btReverse":
		    Page_BlockSubmit=true;
			if(document.all.rbVol.checked)
		    {   
		        try
		        {
					ReverseChecked("dg1");
				}catch(e){}
			}else
			{
			    try
		        {
					ReverseChecked("dg2");
			    }catch(e){}
				
			}
			
				break;
		case "btClearGrid":
			Page_BlockSubmit=true;
		    if(document.all.rbVol.checked)
		    {
		        try
		        {
				DelDataFromTable("dg1");
				}catch(e){}
				
				
			}else
			{
			    try
		        {
			    DelDataFromTable("dg2");
			    }catch(e){}
				
			}
				break;
		//0991109	Leslie[0990663]	增加"銷毀單位"之異動處理
		case "btChange":
			Page_BlockSubmit=true;
			if(window.confirm("是否確定要異動銷毀單位為「卷」，異動後將無法復原銷毀單位為「案」？"))
			{
				var strPlanNo = document.all["txPlanNo"].value;
				var strOrgNo  = document.all["txOrgNo"].value;
                //1070830 Zen 1070678 弱掃Ajax修正
                //var ret = EAT401.UpdateDbaceUnit(strOrgNo, strPlanNo).value;
                var ret = EA40.EAT401.UpdateDbaceUnit(strOrgNo, strPlanNo).value;
				if(ret == "")
				{
					alert("清理批號["+strPlanNo+"]其銷毀單位異動為「卷」完成。");
					document.all["btChange"].disabled = true;
					document.all["txDbaseUnit"].value = "卷";
				}
				else
					alert(ret);
			}
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060712	Kevin_C	1050087	升二代
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
	
	//1060712	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":	
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1060712	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);	
			break;
			
		case "btDelete":
			if(CheckDetail())
			{
			  Page_BlockSubmit = false;
			}
			else
			{
			   Page_BlockSubmit = true;
			   return;
			}
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060712	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
			
		case "btSearch":
			AutoBringOut();
			if(jf_CheckBeforSearch())
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
			{
				Page_BlockSubmit = true;				
			}
			//1060712	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;					
	}
}

//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSearch())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSearch()
{
	var bRtnbool = true;
	var strErrMsg= "";
		
	if (document.all["txPlanNo"].value == "")
	{
		strErrMsg += "清理批號不可空白\n";
		//1060712	Kevin_C	1050087	升二代
		//document.all["txPlanNo"].focus();
		$('txPlanNo').focus();
	}
	
	//[0970649]Modify by Cola 修正原本檢核邏輯
	
	if (document.all["USE_STOCK"].value != "1")
	{
		strErrMsg = CheckFileNo1(strErrMsg,"0");
	
		/*if (document.all["txYearS"].value == "" || document.all["txYearE"].value == "")
		{
			strErrMsg += "年度號起訖不可空白\n";
			document.all["txPlanNo"].focus();
		}
		
		if (document.all["txClsS"].value == "" || document.all["txClsE"].value == "")
		{
			strErrMsg += "分類號起訖不可空白\n";
			document.all["txClsS"].focus();
		}
		
		strErrMsg = CheckFileNoRange(strErrMsg);*/
	}
	else
	{
		if (document.all["txStockNoS"].value == "" && document.all["txStockNoE"].value == "" 
		&& document.all["txYearS"].value == "" && document.all["txYearE"].value == ""
		&& document.all["txClsS"].value == "" && document.all["txClsE"].value == ""
		&& document.all["txCaseS"].value == "" && document.all["txCaseE"].value == ""
		&& document.all["txVolS"].value == "" && document.all["txVolE"].value == ""
		&& document.all["txSeqS"].value == "" && document.all["txSeqE"].value == ""
		)	
		{
			//1050125 Cloud  1040846 新增可撈取註記為電子檔案異常，無法修復銷毀公文-特殊銷毀時增加判斷文號
		    if (document.all["h_txEUNRECOVERY"].value == "1")
		    {
		        if (document.all["txDocNO"].value == "")
		            strErrMsg += "檔號、櫥位號、文號必需擇一輸入\n";
		    }
		    else
		    {
		        strErrMsg += "檔號與櫥位號部份必需擇一輸入\n";
		    }
		}
		else if (document.all["txStockNoS"].value != "" || document.all["txStockNoE"].value != "")//有輸入櫥位號
		{
			strErrMsg = CheckFileNo1(strErrMsg,"1");//不檢核是否至少輸入檔號
		}
		else
		{
			strErrMsg = CheckFileNo1(strErrMsg,"0");
		}

	}
			
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		//1060712	Kevin_C	1050087	升二代
		//document.all.txClsS.focus();
		$('txClsS').focus();
	}

	return bRtnbool;
}

//[0970649]Add by Cola 新增一function 用來比對檔號 (原本檢核邏輯不合理) (Type 1 表不檢核有無輸入)
function CheckFileNo1(strErrMsg,Type)
{
	var strFileYearS = jf_Trim(document.all.txYearS.value);
	var strFileYearE = jf_Trim(document.all.txYearE.value);
	var strFileClsS = jf_Trim(document.all.txClsS.value);
	var strFileClsE = jf_Trim(document.all.txClsE.value);
	var strFileCaseS = jf_Trim(document.all.txCaseS.value);
	var strFileCaseE = jf_Trim(document.all.txCaseE.value);
	var strFileVolS = jf_Trim(document.all.txVolS.value);
	var strFileVolE = jf_Trim(document.all.txVolE.value);
	var strFileSeqS = jf_Trim(document.all.txSeqS.value);
	var strFileSeqE = jf_Trim(document.all.txSeqE.value);
	
	if ((strFileYearE=="")&&(strFileClsE=="")&&(strFileCaseE=="")&&(strFileVolE=="")&&(strFileSeqE==""))
	{
		if ((strFileYearS=="")&&(strFileClsS=="")&&(strFileCaseS=="")&&(strFileVolS=="")&&(strFileSeqS==""))
		{
			if (Type == "0")
			{
				//1050125	Cloud	[1040846]	修該支援特殊銷毀
				if (document.all["h_txEUNRECOVERY"].value == "1")
			    {
			        if (document.all["txDocNO"].value == "")
			            strErrMsg += "請輸入年度、分類號或文號條件\n";
                }
			    else
			    {
			        //1020321	Leslie[1010779] 修改畫面檔號條件判斷，由可輸入年度或分類號，改為至少必需輸入年度號
					//strErrMsg +="請輸入年度或分類號條件\n";
					strErrMsg +="請至少輸入年度號條件\n";
			    }
				return strErrMsg;
			}
			//return;
		}
		else
		{
			document.all.txYearE.value = strFileYearS;
			document.all.txClsE.value = strFileClsS;
			document.all.txCaseE.value = strFileCaseS;
			document.all.txVolE.value = strFileVolS;
			document.all.txSeqE.value = strFileSeqS;
			
			document.all.strYearE.value = strFileYearS;
			document.all.strClsE.value = strFileClsS;
			document.all.strCaseE.value = strFileCaseS;
			document.all.strVolE.value = strFileVolS;
			document.all.strSeqE.value = strFileSeqS;
		}
	}
	
	//檢查目次號兩者其中之一是否有輸入，有表示分類號、案次號、卷次號需相同
	if ((strFileSeqS!="") || (strFileSeqE!=""))    
	{
		if ((strFileVolE==strFileVolS)&&(strFileCaseE==strFileCaseS)&&(strFileClsE==strFileClsS))
		{
			//子檢查 1. 起必須小於迄
			if (strFileSeqS > strFileSeqE)
			{
				strErrMsg += "目次號起必須小於迄，請重新輸入\n";
				return strErrMsg;
			}	
			//子檢查 2. 以上層級不能為空白
			if ((strFileVolS == "")||(strFileCaseS=="")||(strFileClsS==""))
			{
				strErrMsg += "目次號以上之層級不能為空白但不能為空白\n";
				return strErrMsg;
			}
			//子檢查3. 案次號以下層級，則年度號必須有值，且除非四個都一樣，否則年度號都要一樣
			if ((strFileYearS=="") && (strFileYearE==""))
			{
				//1020321	Leslie[1010779] 修改畫面檔號條件判斷，由可輸入年度或分類號，改為至少必需輸入年度號
				//strErrMsg += "輸入到案次號以下層級，年度號必須有值\n";
				strErrMsg += "年度號必須有值\n";
				return strErrMsg;
			}
			else
			{
				if (strFileSeqS != strFileSeqE)
				{
					if (strFileYearS!=strFileYearE)
					{
						strErrMsg += "不同檔號之年度號必須相等\n";
						return strErrMsg;
					}
				}
				else
				{
					//相同檔號只需檢核年度號起必須小於迄
					if (strFileYearS > strFileYearE)
					{
						strErrMsg += "年度號起必須小於迄，請重新輸入\n";
						return strErrMsg;
					}	
				}
			}
		}
		else
		{
			strErrMsg += "目次號以上之層級必須相同但不能為空白\n";
			return strErrMsg;
		}
	}
	else if ((strFileVolS!="")||(strFileVolE!=""))
	{
		if ((strFileCaseE==strFileCaseS)&&(strFileClsE==strFileClsS))
		{
			//子檢查 1. 起必須小於迄
			if (strFileVolS > strFileVolE)
			{
				strErrMsg += "卷次號起必須小於迄，請重新輸入\n";
				return strErrMsg;
			}
			//子檢查 2. 以上層級不能為空白
			if ((strFileCaseS == "")||(strFileClsS==""))
			{
				strErrMsg += "卷次號以上之層級必須相同但不能為空白\n";
				return strErrMsg;
			}			
			//子檢查3. File_Year有值則檢核年度號是否相同
			if ((strFileYearS =="") && (strFileYearE==""))
			{
				//1020321	Leslie[1010779] 修改畫面檔號條件判斷，由可輸入年度或分類號，改為至少必需輸入年度號
				strErrMsg += "年度號必須有值\n";
				return strErrMsg;
			}
			else
			{	
				if (strFileYearS != strFileYearE)
				{
					//1020321	Leslie[1010779] 修改畫面檔號條件判斷，由可輸入年度或分類號，改為至少必需輸入年度號
					//strErrMsg += "年度號起迄必須相同或兩者為空白\n";
					strErrMsg += "年度號起迄必須相同\n";
					return strErrMsg;
				}
			}			
		}
		else
		{
			strErrMsg += "卷次號以上之層級必須相同但不能為空白\n";
			return strErrMsg;
		}
	}
	else if ((strFileCaseE!="")||(strFileCaseS!=""))
	{
		if (strFileClsE==strFileClsS)
		{
			//0980525 Albert 0980263 修正顛倒的起迄判斷
			//子檢查 1. 起必須小於迄
			//if (strFileCaseE > strFileCaseS)
			if (strFileCaseS > strFileCaseE)
			{
				strErrMsg += "案次號起必須小於迄，請重新輸入\n";
				return strErrMsg;
			}	
			//子檢查 2. 以上層級不能為空白
			if (strFileCaseS == "")
			{
				strErrMsg += "案次號以上之層級必須相同但不能為空白\n";
				return strErrMsg;
			}
			//子檢查3. File_Year有值則檢核年度號是否相同
			if ((strFileYearS =="") && (strFileYearE==""))
			{
				//1020321	Leslie[1010779] 修改畫面檔號條件判斷，由可輸入年度或分類號，改為至少必需輸入年度號
				strErrMsg += "年度號必須有值\n";
				return strErrMsg;
			}
			else
			{	
				//0980525 Albert 0980263 修正判斷變數錯字
				//if (StrFileYearS != strFileYearE)
				if (strFileYearS != strFileYearE)
				{
					//1020321	Leslie[1010779] 修改畫面檔號條件判斷，由可輸入年度或分類號，改為至少必需輸入年度號
					//strErrMsg += "年度號起迄必須相同或兩者為空白\n";
					strErrMsg += "案次號以上之層級必須相同\n";
					return strErrMsg;
				}
			}								
		}
		else
		{
			strErrMsg += "案次號以上之層級必須相同但不能為空白\n";
			return strErrMsg;
		}	
	}
	//0980604 Albert 0980263 新增分類號輸入值檢核
	else if ((strFileClsE!="")||(strFileClsS!=""))
	{
		if (strFileYearE==strFileYearS)
		{
			if (strFileClsS > strFileClsE)
			{
				strErrMsg += "分類號起必須小於迄，請重新輸入\n";
				return strErrMsg;
			}
			
			//1020321	Leslie[1010779] 修改畫面檔號條件判斷，由可輸入年度或分類號，改為至少必需輸入年度號
			if ((strFileYearS =="") && (strFileYearE==""))
			{
				strErrMsg += "年度號必須有值\n";
				return strErrMsg;
			}
		}
		else
		{
			strErrMsg += "分類號以上之層級必須相同\n";
			return strErrMsg;
		}
	}
	//0980604 Albert 0980263 新增年度號輸入值檢核
	else if ((strFileYearS!="")||(strFileYearE!=""))
	{
		if (strFileYearS > strFileYearE)
		{
			strErrMsg += "年度號起必須小於迄，請重新輸入\n";
			return strErrMsg;
		}
	}
	return strErrMsg;

}

//判斷檔號起訖的合理性
function CheckFileNoRange(argStr)
{
	var JCls	= 0;	//0:兩者為空,1:其中一個為空,2:不相等,3:相等
	var JCase	= 0;
	var JVol	= 0;
	var JSeq	= 0;
	var jBool	= true;
	
	
	if(document.all["txSeqS"].value != "" && document.all["txSeqE"].value != "")
	{
		if(document.all["txSeqS"].value != document.all["txSeqE"].value )
			JSeq = 2;
		else
			JSeq = 3;
	}
	else if(document.all["txSeqS"].value != "" || document.all["txSeqE"].value != "")
		JSeq = 1;
	//////////////////////////////////////////目次
	if(document.all["txVolS"].value != "" && document.all["txVolE"].value != "")
	{
		if(document.all["txVolS"].value != document.all["txVolE"].value )
			JVol = 2;
		else
			JVol = 3;
	}
	else if(document.all["txVolS"].value != "" || document.all["txVolE"].value != "")
		JVol = 1;
	//////////////////////////////////////////卷次
	if(document.all["txCaseS"].value != "" && document.all["txCaseE"].value != "")
	{
		if(document.all["txCaseS"].value != document.all["txCaseE"].value )
			JCase = 2;
		else
			JCase = 3;
	}
	else if(document.all["txCaseS"].value != "" || document.all["txCaseE"].value != "")
		JCase = 1;
	/////////////////////////////////////////案次
	if(document.all["txClsS"].value != "" && document.all["txClsE"].value != "")
	{
		if(document.all["txClsS"].value != document.all["txClsE"].value )
			JCls = 2;
		else
			JCls = 3;
	}
	else if(document.all["txClsS"].value != "" || document.all["txClsE"].value != "")
		JCls = 1;
	/////////////////////////////////////////分類
	
	if(JSeq == 1)	//只有其中一項，視為錯誤
	{
		argStr += "目次範圍起迄值有誤\n";
		return argStr;
	}
	
	if(JVol == 1)	//只有其中一項，視為錯誤
	{
		argStr += "卷次範圍起迄值有誤\n";
		return argStr;
	}
	
	if(JCase == 1)	//只有其中一項，視為錯誤
	{
		argStr += "案次號範圍起迄值有誤\n";
		return argStr;
	}
	
	if(JCls == 1)	//只有其中一項，視為錯誤
	{
		argStr += "分類號範圍起迄值有誤\n";
		return argStr;
	}
	
	/////////////////////////////////////95.08.15
	if(JSeq == 2)	//目次不相等
	{
		jBool = false;
		if(JVol != 3)	//若卷次不為相等的情況則提示錯誤訊息
		{
			argStr += "卷次號範圍需相同\n";
			jBool = true;
			return argStr;			
		}
		
		if(JCase != 3)	//若案次不為相等的情況則提示錯誤訊息
		{
			argStr += "案次號範圍需相同\n";
			jBool = true;
			return argStr;			
		}		
		
		if(JCls != 3)
		{
			argStr += "分類號範圍需相同\n";
			jBool = true;
			return argStr;			
		}		
		
		/*if(!jBool)
		{
			argStr += "目次號範圍需相同\n";			
			return argStr;						
		}*/
	}
	
	if(JSeq == 0 || JSeq == 3)	//目次為空白，則往上檢查卷次號
	{
		if(JVol == 2)	//卷次不相等
		{			
			jBool = false;
			if(JCase != 3)	//若案次不為相等的情況則提示錯誤訊息
			{
				argStr += "案次號範圍需相同\n";
				jBool = true;
				return argStr;			
			}		
		
			if(JCls != 3)
			{
				argStr += "分類號範圍需相同\n";
				jBool = true;
				return argStr;			
			}		
			
			if(!jBool && JSeq != 0)
			{
				argStr += "卷次號範圍需相同\n";				
				return argStr;				
			}
		}		
		
		if(JVol == 0)	//若卷次為空白，則往上檢查案次號
		{
			if(JCase == 2)	//若案次不相等，則往上檢查分類號
			{
				jBool = false;
				if(JCls != 3)
				{
					argStr += "分類號範圍需相同\n";
					jBool = true;
					return argStr;			
				}				
				
				if(jBool)
				{
					argStr += "案次號範圍需相同\n";				
					return argStr;						
				}
			}			
		}
		
		if(JVol == 3)	//卷次相等，往上檢核案次以及分類是否相等
		{
			if(JCase != 3)
			{
				argStr += "案次號範圍需相同\n";
				return argStr;				
			}
			
			if(JCls != 3)
			{
				argStr += "分類號範圍需相同\n";
				return argStr;					
			}
		}		
	}				
	
	return argStr;
}




//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	/*var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			//txInput2不可空白
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
				document.all[InValidControlName].focus();
				return false;
			}
		}
	}*/
	return true;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
			
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
    }
    if(argResult.id = iCallID_txPlanNo)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
			document.all.txPlanDesc.value = argResult.value.RtnField1;
			var FileRange = 
				argResult.value.RtnField2+"-"+
				argResult.value.RtnField3+"-"+
				argResult.value.RtnField4+"-"+
				argResult.value.RtnField5+"- ~ "+
				argResult.value.RtnField6+"-"+
				argResult.value.RtnField7+"-"+
				argResult.value.RtnField8+"-"+
				argResult.value.RtnField9;
			document.all["txFileRange"].value = FileRange;
			var PlanType = argResult.value.RtnField0;
			for(i=0;i<document.all["dlStatus"].length;i++)
			{
				//1080429	Kevin_C	1080301	一併修正options(i)會壞掉的問題
				//if(PlanType == document.all["dlStatus"].options(i).value)
				if(PlanType == document.all["dlStatus"].options[i].value)
				{
					document.all["dlStatus"].selectedIndex = i;
					break;
				}
			}
			
			//1041222 Cloud [1040846]   非電子特殊銷毀依原邏輯行為-先設為啟用-非特殊銷毀不提供文號查詢
			document.all["rbVol"].disabled = false;
			document.all["h_txEUNRECOVERY"].value = argResult.value.RtnField12;
			if (argResult.value.RtnField12 != "1") {
			//1060712	Kevin_C	1050087	升二代 -S
			    //document.all["lbDocNo"].className = "HIDE";
			    //document.all["txDocNO"].className = "HIDE";
			    document.all["lbDocNo"].className = "hide";
			    document.all["txDocNO"].className = "hide";
			//1060712	Kevin_C	1050087	升二代 -E
			}
			//0991109	Leslie[0990663]	於計畫別為"銷毀"時，顯示"調整銷毀單位"功能鍵
			//1041222 Cloud [1040846]   非電子特殊銷毀依原邏輯行為-增加鑑定後，應該會變成001000
		    //if(argResult.value.RtnField10 == "00100")	//計畫別為"銷毀"，且銷毀單位為"案"
			if (argResult.value.RtnField10 == "001000")	
			{
				if (argResult.value.RtnField12 == "1")
			    {
			        //提供依公文查詢功能、僅能選擇使用以件為單位
			        document.all["rbItem"].checked = true;
			        document.all["rbVol"].checked = false;
			        document.all["rbVol"].disabled = true;//特殊銷毀設定為停用
			        document.all["lbDocNo"].className = "InputFieldLabel";
			        document.all["txDocNO"].className = "InputFieldLabel";
					//1080429	Kevin_C	1080301	一併修正有文號條件時，調整條件的框框太小的問題
					document.all["AdjustCondition"].style.height = "140px";
			        //onblur 計畫批號如果是特殊銷時增加判斷是否有非特殊銷毀批號時進行過查詢，有的話隱藏DG
			        if (document.all["h_searchmode"].value != "")
			        {
			            alert('此批號為電子檔案，無法修復銷毀用，請重新查詢。');
						//1060712	Kevin_C	1050087	升二代 -S
			            //document.all["dg2"].className = "HIDE";
			            //document.all["dg1"].className = "HIDE";
			            //document.all["Label11"].className = "HIDE";
			            //document.all["txVolCnt"].className = "HIDE";
			            //document.all["Label10"].className = "HIDE";
			            //document.all["txDocCnt"].className = "HIDE";
			            //document.all["Label8"].className = "HIDE";
			            //document.all["txAttCnt"].className = "HIDE";
			            document.all["dg2"].className = "hide";
			            document.all["dg1"].className = "hide";
			            document.all["Label11"].className = "hide";
			            document.all["txVolCnt"].className = "hide";
			            document.all["Label10"].className = "hide";
			            document.all["txDocCnt"].className = "hide";
			            document.all["Label8"].className = "hide";
			            document.all["txAttCnt"].className = "hide";
						//1060712	Kevin_C	1050087	升二代 -E
			        }
			    }
			    else
			    {
					document.all["btChange"].className = "";
					document.all["lbDbaseUnit"].className = "InputFieldLabel";
					document.all["txDbaseUnit"].className = "displayonly";
					if(argResult.value.RtnField11 == "2")
					{
						document.all["btChange"].disabled = true;
						document.all["txDbaseUnit"].value = "卷";
					}
					else
					{
					    //1120308 Cloud 1120063 支援以件銷毀，不可異動
					    if (argResult.value.RtnField11 == "3") {
					        document.all["btChange"].disabled = true;
					        document.all["txDbaseUnit"].value = "件";
					    }
					    else {
						document.all["btChange"].disabled = false;				
						document.all["txDbaseUnit"].value = "案";
					}
				}	
			}
			}
			else
			{
				document.all["btChange"].className = "hide";
				document.all["lbDbaseUnit"].className = "hide";
				document.all["txDbaseUnit"].className = "hide";				
			}
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
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
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
	if (argCallerId == "EAT400C1")
	{
		document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
		//1060712	Kevin_C	1050087	升二代
		//document.all["txPlanNo"].focus();
		$('txPlanNo').focus();
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function DivChange()
{
	if(document.all.rbVol.checked)
	{
    	document.all["DIVPanel1"].className = "";
		document.all["DIVPanel2"].className = "hide";
	}
	else
	{
        document.all["DIVPanel1"].className = "hide";
		document.all["DIVPanel2"].className = "";
	}
}

var StartRow = 2;
/// <summary>
/// 按全選button選取所有之CheckBox
/// <summary>
function SelectAllCb(argTableName)
{	
	for(i= StartRow;i<document.all[argTableName].rows.length+1;i++)
	{
		if(argTableName == "dg1")
			document.all[argTableName+"__ctl"+i+"_cb1"].checked = true;		
		else
			document.all[argTableName+"__ctl"+i+"_cb2"].checked = true;				
	}
}
/// <summary>
/// 按反向將CheckBox之Checked屬性反向
/// <summary>
function ReverseChecked(argTableName)
{
	for(i= StartRow;i<document.all[argTableName].rows.length+1;i++)
	{
		if(argTableName == "dg1")
		{
			if(document.all[argTableName+"__ctl"+i+"_cb1"].checked)
				document.all[argTableName+"__ctl"+i+"_cb1"].checked = false;
			else
				document.all[argTableName+"__ctl"+i+"_cb1"].checked = true;
		}
		else
		{
			if(document.all[argTableName+"__ctl"+i+"_cb2"].checked)
				document.all[argTableName+"__ctl"+i+"_cb2"].checked = false;
			else
				document.all[argTableName+"__ctl"+i+"_cb2"].checked = true;			
		}
	}
}
/// <summary>
/// 按清除將被選取之資料列刪除
/// <summary>
function DelDataFromTable(argTableName)
{
	for(i= StartRow;i<document.all[argTableName].rows.length+1;i++)
	{
		if(argTableName == "dg1")
			document.all[argTableName+"__ctl"+i+"_cb1"].checked = false;
		else
			document.all[argTableName+"__ctl"+i+"_cb2"].checked = false;
	}
}

//刪除前檢查
function CheckDetail()
{
    var iRow ;
	var strMsg = "";
	var check = false;
	
	if(document.all.rbVol.checked)
	{
		for (iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
		{
			if(document.all["dg1__ctl"+iRow+"_cb1"].checked)
			{ check=true; break;} 
		
	}
		
	if (!check)
	{
		strMsg = "明細資料至少選取一項";
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])),"");
		//1060712	Kevin_C	1050087	升二代
		//document.all["dg1__ctl2_cb1"].focus();
		$('dg1__ctl2_cb1').focus();
		return false;
	}
	else
		return true;
	}
	else
	{
	for (iRow=2;iRow<document.all.dg2.rows.length+1;iRow++)
	{
		if(document.all["dg2__ctl"+iRow+"_cb2"].checked)
		{ check=true; break;} 
		
	}
	
	if (!check)
	{
		strMsg = "明細資料至少選取一項";
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])),"");
		//1060712	Kevin_C	1050087	升二代
		//document.all["dg2__ctl2_cb2"].focus();
		$('dg2__ctl2_cb2').focus();
		Page_BlockSubmit = true;
		return false;
	}
	else
		return true;
	}
	
}

function CheckKeyExist()
{
	var arWSParam = new Array(2);
	arWSParam[0] = document.all["txPlanNo"].value;
	arWSParam[1] = document.all["txOrgNo"].value;
	
	if(arWSParam[0] != "" && arWSParam[1] != "")
	{		
		//1060712	Kevin_C	1050087	升二代
		//callObj = jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, arWSParam);	
		callObj = jf_CallWS("../../../STDN/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, arWSParam);	
		
		if(jf_IsWebServiceSuccess(callObj))
		{	
			if (callObj.value.RtnBool==false)
			{
				strErrMsg += "版本編號不合法\n";
				if (firstFocus==false)
				{
					//1060712	Kevin_C	1050087	升二代
					//document.all["txCurrVer"].focus();
					$('txCurrVer').focus();
					firstFocus=true;
				}
			}
		}
		else
		{	
			strErrMsg += "呼叫WS檢查欄位失敗\n";	
			if (firstFocus==false)
			{
				//1060712	Kevin_C	1050087	升二代
				//document.all["txCurrVer"].focus();
				$('txCurrVer').focus();
				firstFocus=true;
			}						
		}		
	}	
}
function CallPadFunc(strObjName)
{	
	switch(strObjName)
	{		
		case "txYearS":						
		case "txYearE":
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,3,"0");
			break;		
	}	
}

var iCallID_txPlanNo = "";
function CheckPlanNo()
{
	/*if(!jf_CheckDataExist("") && document.all["txPlanNo"].value != "")
	{		
		Page_BlockSubmit = false;
		alert("此清理批號不存在");	
		document.all["txPlanNo"].focus();
	}*/
	/*
	if(document.all.txPlanNo.value != "")
	{
		var param = new Array(1);
		param[0] = document.all.txPlanNo.value;
		var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, param);
		iCallID_txPlanNo = callObj.id;
		OnWSResult(callObj);
	}*/
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	//0991109	Leslie[0990663]	增加取得計畫別及銷毀單位，以判斷是否顯示或啟用"調整銷毀單位"功能鍵
	var arRtnFldName = new Array(12)//(10);
	var arOrdFldName = new Array(1);
	
	if (!IsServerHandling)
	{
		if (document.all["txPlanNo"].value != "")
		{
			Page_BlockSubmit = true;
			
			arKeyName[0]    = "PLAN_NO";
			arKeyValue[0]   = document.all["txPlanNo"].value;
			arRtnFldName[0] = "PLAN_STATUS";
			arRtnFldName[1] = "PLAN_DESC";
			
			arRtnFldName[2] = "BEG_FILE_YEAR";
			arRtnFldName[3] = "BEG_FILE_CLS";
			arRtnFldName[4] = "BEG_FILE_CASE";
			arRtnFldName[5] = "BEG_FILE_VOL";
			
			arRtnFldName[6] = "END_FILE_YEAR";
			arRtnFldName[7] = "END_FILE_CLS";
			arRtnFldName[8] = "END_FILE_CASE";
			arRtnFldName[9] = "END_FILE_VOL"; 
			
			//0991109	Leslie[0990663]	增加取得計畫別及銷毀單位，以判斷是否顯示或啟用"調整銷毀單位"功能鍵
			arRtnFldName[10] = "PLAN_TYPE"; 
			arRtnFldName[11] = "DBASE_UNIT"; 
			//1050125 Cloud  1040846 新增可撈取註記為電子檔案異常，無法修復銷毀公文-增加取得IS_E_UNRECOVERY 判斷是否為特殊銷毀
			arRtnFldName[12] = "IS_E_UNRECOVERY";
			
			arOrdFldName[0] = "PLAN_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "PLAN_MAIN";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;			
			callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, arWSParam);	
			
			iCallID_txPlanNo = callObj.id;
			OnWSResult(callObj);
		}
	}
}

function AutoBringOut()
{
	if(document.all["txYearE"].value == "" && document.all["txClsE"].value == "" && document.all["txCaseE"].value == "" && document.all["txVolE"].value == "" && document.all["txSeqE"].value == "")
	{		
		document.all["txYearE"].value = document.all["txYearS"].value;
		document.all["txClsE"].value = document.all["txClsS"].value;
		document.all["txCaseE"].value = document.all["txCaseS"].value;
		document.all["txVolE"].value = document.all["txVolS"].value;
		document.all["txSeqE"].value = document.all["txSeqS"].value;
	}
	
}
//* 1111215      Cloud   1110860 修改個人檔不支援使用-s
function CheckCLS(argID) {
    if (document.all[argID].value == "11") {
        alert('個人檔資料無法使用年度作業，請重新輸入分類號。');
        document.all[argID].value = "";
    }
}
//* 1111215      Cloud   1110860 修改個人檔不支援使用-e

