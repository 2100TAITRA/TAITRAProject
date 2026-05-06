/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * ------------------------------------------------------------------------------------------------- 
 * 97.07.29		Cola	0970671	呼叫WebService有錯時，清空相關欄位
 * 97.10.01		Cola	0970649	(交通部)新增櫥位號加入功能
 * 99.11.29     Davis   0990544 增加計畫存在檢核
 *100.02.23     Davis   0990662 增加小日曆 
 *100.02.23     Davis   0991036 新增搜尋計畫子視窗 
 *100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
 *1060323       Justin  1050087 二代公文修改
 *1060915		Justin	1050087	修正IsServerHandling
 *1080515		Kevin_C	--		內政部驗證問題序22，修正變數名稱錯誤的問題
 *1110103		Zen     1101292	修正多次點擊重複PostBack之問題
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
var iCallID_txReqOrgId;


//指定DataGrid欄位
var strTableFields = new Array("_lbDocNo");
//1060323  Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
	
document.all["rb1"].checked = true;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    /*1060323  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, null);
	jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromDESPLAN_MAIN", false, null);//[0990544]Davis新增WebService檢核計畫存在
	jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, null); //使用WebService前必須先呼叫一次*/
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060323  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	/*var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}*/

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
	    /*1060323  Justin [1050087] 二代公文修改
	    case "btDate":  //[0990662] davis   增加小日曆 
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txFromOrgDate, event.screenX, event.screenY);
			break;*/
		case "ibtSourceOrgNo": //產生機關提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "../EA40/EAT400C2.aspx";
		    //1060323  Justin [1050087] 二代公文修改
		    //jf_OpenChildWin(pUrl, "EAT400C2", 750, 500);
		    jf_OpenChildWin(pUrl, "EAT400C2", 800, 600);
			break;
		case "btKeyHelp": //計畫批號提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    if(document.all["dlChose"].options[document.all["dlChose"].selectedIndex].value=="1")
		    { 
		        pUrl = "../EA40/EAT400C1.aspx";
		        //1060323  Justin [1050087] 二代公文修改
		        //jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
		        jf_OpenChildWin(pUrl, "EAT400C1", 800, 600);
			}
			else
			{
		        pUrl = "../EA50/EAT501C1.aspx";//[0991036] davis 新增搜尋計畫子視窗
		        //1060323  Justin [1050087] 二代公文修改
		        //jf_OpenChildWin(pUrl, "EAT501C1", 750, 500);
		        jf_OpenChildWin(pUrl, "EAT501C1", 800, 600);
			}
			break;
		case "btFileAdd": //依照檔號加入
			//檢核規則：分類號、案次號、卷次號、項次號所組成的次序，重頭檢查到最後一個
			//除了最後一項有值的可不一樣之外，其他欄位必須相等。
			//此外，如果四項皆有值且相同，則允許年度號可填入不同的起迄年度
			//如果沒輸入滿，則只允許年度不填，或是填相同年度的值
			//STEP 1：檢核分類號、案次號、卷次號、項次號
			if(!CheckFileRangeIsEmpty())
			{
				Page_BlockSubmit=true;
				return;
			}
			AutoBringOut();
			Page_BlockSubmit = true;
			var strErrMsg="";
			var strFileYearS = document.all.txFileYearS.value;
			var strFileYearE = document.all.txFileYearE.value;
			var strFileClsS = document.all.txFileClsS.value;
			var strFileClsE = document.all.txFileClsE.value;
			var strFileCaseS = document.all.txFileCaseS.value;
			var strFileCaseE = document.all.txFileCaseE.value;
			var strFileVolS = document.all.txFileVolS.value;
			var strFileVolE = document.all.txFileVolE.value;
			var strFileSeqS = document.all.txFileSeqS.value;
			var strFileSeqE = document.all.txFileSeqE.value;
			
			//檢查項次號兩者其中之一是否有輸入，有表示分類號、案次號、卷次號需相同
			if ((strFileSeqS!="") || (strFileSeqE!=""))    
			{
				if ((strFileVolE==strFileVolS)&&(strFileCaseE==strFileCaseS)&&(strFileClsE==strFileClsS))
				{
					//子檢查 1. 起必須小於迄
					if (strFileSeqS > strFileSeqE)
					{
						strErrMsg += "項次號起必須小於迄，請重新輸入\n";
					}	
					//子檢查 2. 以上層級不能為空白
					if ((strFileVolS == "")||(strFileCaseS=="")||(strFileClsS==""))
					{
						strErrMsg += "項次號以上之層級必須相同但不能為空白\n";
					}
					//子檢查3. 案次號以下層級，則年度號必須有值，且除非四個都一樣，否則年度號都要一樣
					if ((strFileYearS=="") && (strFileYearE==""))
					{
						strErrMsg += "輸入到案次號以下層級，年度號必須有值\n";
					}
					else
					{
						if (strFileSeqS != strFileSeqE)
						{
							if (strFileYearS!=strFileYearE)
								strErrMsg += "不同檔號之年度號必須相等\n";
						}
						else
						{
							//相同檔號只需檢核年度號起必須小於迄
							if (strFileYearS > strFileYearE)
							{
								strErrMsg += "項次號起必須小於迄，請重新輸入\n";
							}	
						}
					}
				}
				else
				{
					strErrMsg += "項次號以上之層級必須相同但不能為空白\n";
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
					}
					//子檢查 2. 以上層級不能為空白
					if ((strFileCaseS == "")||(strFileClsS==""))
					{
						strErrMsg += "卷次號以上之層級必須相同但不能為空白\n";
					}			
					//子檢查3. File_Year有值則檢核年度號是否相同
					if ((strFileYearS =="") && (strFileYearE==""))
					{
					}
					else
					{	
						if (strFileYearS != strFileYearE)
							strErrMsg += "年度號起迄必須相同或兩者為空白\n";
					}			
				}
				else
				{
					strErrMsg += "卷次號以上之層級必須相同但不能為空白\n";
				}
			}
			else if ((strFileCaseE!="")||(strFileCaseS!=""))
			{
				if (strFileClsE==strFileClsS)
				{
					//子檢查 1. 起必須小於迄
					if (strFileCaseE > strFileCaseS)
					{
						strErrMsg += "案次號起必須小於迄，請重新輸入\n";
					}	
					//子檢查 2. 以上層級不能為空白
					if (strFileCaseS == "")
					{
						strErrMsg += "案次號以上之層級必須相同但不能為空白\n";
					}
					//子檢查3. File_Year有值則檢核年度號是否相同
					if ((strFileYearS =="") && (strFileYearE==""))
					{
					}
					else
					{	
						//1080515	Kevin_C	--	內政部驗證問題序22，修正變數名稱錯誤的問題
						//if (StrFileYearS != strFileYearE)
						if (strFileYearS != strFileYearE)
							strErrMsg += "年度號起迄必須相同或兩者為空白\n";
					}								
				}
				else
				{
					strErrMsg += "案次號以上之層級必須相同但不能為空白\n";
				}	
			}

			if (strErrMsg != "")
			{
			    alert(strErrMsg);
			    //1060323 Justin [1050087] 二代公文修改
			    //document.all.txFileClsS.focus();
			    $('#txFileClsS').focus();
			}
			/*else if (document.all["txPlanNo"].value=="")
			{
				alert("清理批號不可空白");	
				document.all["txPlanNo"].focus();
				Page_BlockSubmit=true;
			}*/
			else
			{				
				Page_BlockSubmit = false;
				//1060915  Justin [1050087] 修正IsServerHandling
			//}
				//1060323  Justin [1050087] 二代公文修改:加入IsServerHandling設定及__doPostBack功能
				IsServerHandling = true;
			}
			__doPostBack("btFileAdd", "");
			break;		
		case "btDocAdd":
			Page_BlockSubmit = true;
			var strErrMsg="";
			if (document.all.txPlanNo.value=="")		
				strErrMsg += "清理批號不可空白";
			//100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
			if (document.all.txDocNo.value=="")
			{
				if (strErrMsg!="")
					//strErrMsg += "\n公文文號不可空白";	
					strErrMsg += "\n文(編)號不可空白";
				else
					//strErrMsg += "公文文號不可空白";
					strErrMsg += "文(編)號不可空白";
			}
			if (strErrMsg != "")
			{
			    alert(strErrMsg);
			    //1060323 Justin [1050087] 二代公文修改
			    //document.all.txPlanNo.focus();
			    $('#txPlanNo').focus();
			}
			else
			{
			    Page_BlockSubmit = false;
				//1060323  Justin [1050087] 二代公文修改:加入IsServerHandling設定及__doPostBack功能
				IsServerHandling = true;
			}
			__doPostBack("btDocAdd", "");
			break;
		//[0970649]Add by Cola 新增櫥位號加入功能
		case "btAdd_Stock":
			if (document.all["txStockNoS"].value=="" && document.all["txStockNoE"].value=="")
			{
			    alert("櫥位號區間不可均為空白");
			    //1060323 Justin [1050087] 二代公文修改
			    //document.all["txStockNoS"].focus();
			    $('#txStockNoS').focus();
				Page_BlockSubmit = true;
			}
			else if (document.all["txPlanNo"].value=="")
			{
			    
			    alert("清理批號不可空白");
			    //1060323 Justin [1050087] 二代公文修改
			    //document.all["txPlanNo"].focus();
			    $('#txPlanNo').focus();
				Page_BlockSubmit=true;
			}
			else
			{
				Page_BlockSubmit = false;
				//1060915  Justin [1050087] 修正IsServerHandling
			//}
				//1060323  Justin [1050087] 二代公文修改:加入IsServerHandling設定及__doPostBack功能
				IsServerHandling = true;
			}
			__doPostBack("btAdd_Stock", "");
			break;				
		case "btAddAll":
			Page_BlockSubmit = true;
			var strErrMsg="";
			if (document.all.txPlanNo.value=="")		
				strErrMsg += "清理批號不可空白";
			if (strErrMsg != "")
			{
			    alert(strErrMsg);
			    //1060323 Justin [1050087] 二代公文修改
			    //document.all.txPlanNo.focus();
			    $('#txPlanNo').focus();
				return;
			}
			else
			{
				Page_BlockSubmit = false;
				//1060915  Justin [1050087] 修正IsServerHandling
				IsServerHandling = true;
			}	
			if(window.confirm("批號內所含公文可能過多，是否仍要加入?"))
			{
				Page_BlockSubmit = false;
				//1060915  Justin [1050087] 修正IsServerHandling
				IsServerHandling = true;
			}
			else
			{
				Page_BlockSubmit = true;
				return;
			}	
		    //1060323  Justin [1050087] 二代公文修改:加入IsServerHandling設定及__doPostBack功能
			//IsServerHandling = true;
			__doPostBack("btAddAll", "");
			break;
			
		case "btKeyWordAdd":
			Page_BlockSubmit = true;
			var strErrMsg="";
			if (document.all.txPlanNo.value=="")		
				strErrMsg += "清理批號不可空白";
			if (document.all.txKeyword.value=="")
			{
				if (strErrMsg!="")
					strErrMsg += "\n關鍵詞不可空白";	
				else
					strErrMsg += "關鍵詞不可空白";
			}
			if (strErrMsg != "")
			{
			    alert(strErrMsg);
			    //1060323 Justin [1050087] 二代公文修改
			    //document.all.txPlanNo.focus();
			    $('#txPlanNo').focus();
			}
			else
			{
			    Page_BlockSubmit = false;
				//1060323  Justin [1050087] 二代公文修改:加入IsServerHandling設定及__doPostBack功能
				IsServerHandling = true;
			}
			__doPostBack("btKeyWordAdd", "");
			break; 
		case "btSet":
			Page_BlockSubmit = true;
			var bJudge = false;
			
			/*if(jf_Trim(document.all["txReqOrgId"].value) == "" &&
			jf_Trim(document.all["txFromOrgDate"].value) == "" &&
			jf_Trim(document.all["txFromNoWord"].value) == "" &&
			jf_Trim(document.all["txRvisRemark"].value) == "")
				bJudge = true;*/
			if(jf_Trim(document.all["txReqOrgId"].value) != "" &&
			jf_Trim(document.all["txFromOrgDate"].value) != "" &&
			jf_Trim(document.all["txFromNoWord"].value) != "" &&
			jf_Trim(document.all["txRvisRemark"].value) != "")
				bJudge = true;
			else
			{
				bJudge = false;
				alert("註記欄位不可遺漏，請檢查");
			}
			if(bJudge)
			{
				
				var strErrMsg="";
				if (document.all.txPlanNo.value=="")		
					strErrMsg += "清理批號不可空白";
			
				var selectCnt=0;
				if (document.all.dg1)
				{
					for (var k=2;k<document.all.dg1.rows.length+1;k++)
					{	
						if (document.all["dg1__ctl"+k+"_cbSelect"].checked)
							selectCnt++;
					}
				}
				if (selectCnt==0)
				{
					if (strErrMsg!="")
						strErrMsg += "\n至少必須勾選一筆註記資料";	
					else
						strErrMsg += "至少必須勾選一筆註記資料";
				}

				if (strErrMsg != "")
				{
				    alert(strErrMsg);
				    //1060323 Justin [1050087] 二代公文修改
				    //document.all.txPlanNo.focus();
				    $('#txPlanNo').focus();
				}
				else
				{
					Page_BlockSubmit = false;	
					//1060915  Justin [1050087] 修正IsServerHandling
					IsServerHandling = true;					
				}					
			}
		    //1060323  Justin [1050087] 二代公文修改:加入IsServerHandling設定及__doPostBack功能
			//IsServerHandling = true;
			__doPostBack("btSet", "");
			break; 			
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060323  Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1060323  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	//95.11.13 955180 David
	var Index = ChooseType();
	switch (xObjectName)
	{		
		case "btOpen":
			if(jf_Trim(document.all["txPlanNo"].value) != "")
				Page_BlockSubmit = false;
			else
			{
				alert("清理批號不可為空白");
				Page_BlockSubmit = true;
			    //1060323 Justin [1050087] 二代公文修改
				//document.all["txPlanNo"].focus();
				$('#txPlanNo').focus();
			}
		    //1060323  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
		case "btClean":
			Page_BlockSubmit = false;
		    //1060323  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			Page_BlockSubmit = true;
			var strErrMsg="";
			if (document.all.txPlanNo.value=="")		
				strErrMsg += "清理批號不可空白";
			
			var selectCnt=0;
			if (document.all.dg1)
			{
				for (var k=2;k<document.all.dg1.rows.length+1;k++)
				{	
					//if (document.all["dg1__ctl"+k+"_cbSelect"].checked)
					if (document.all["dg1__ctl"+k+"_cbSelect2"].checked)
						selectCnt++;
					else
					{
						if (document.all["dg1__ctl"+k+"_cbSelect3"].checked)
							selectCnt++;						
					}
				}
			}
			if (selectCnt==0)
			{
				if (strErrMsg!="")
					strErrMsg += "\n至少必須勾選一筆註記資料";	
				else
					strErrMsg += "至少必須勾選一筆註記資料";
			}

			if (strErrMsg != "")
			{
			    alert(strErrMsg);
			    //1060323 Justin [1050087] 二代公文修改
			    //document.all.txPlanNo.focus();
			    $('#txPlanNo').focus();
			}
			else
			{
				Page_BlockSubmit = false;			
			    //1060323  Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btDelete":
			Page_BlockSubmit = true;
			var strErrMsg="";
			if (document.all.txPlanNo.value=="")		
				strErrMsg += "清理批號不可空白";
			
			var selectCnt=0;
			if (document.all.dg1)
			{
				for (var k=2;k<document.all.dg1.rows.length+1;k++)
				{	
					//if (document.all["dg1__ctl"+k+"_cbSelect"].checked)
					if (document.all["dg1__ctl"+k+"_cbSelect3"].checked)
						selectCnt++;
				}
			}
			if (selectCnt==0)
			{
				if (strErrMsg!="")
					strErrMsg += "\n至少必須勾選一筆註記資料";	
				else
					strErrMsg += "至少必須勾選一筆註記資料";
			}

			if (strErrMsg != "")
			{
			    alert(strErrMsg);
			    //1060323 Justin [1050087] 二代公文修改
			    //document.all.txPlanNo.focus();
			    $('#txPlanNo').focus();
			}
			else
			{
				Page_BlockSubmit = false;			
			    //1060323  Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;		
		case "btSearch":
			AutoBringOut();
			Page_BlockSubmit = true;
			var strErrMsg="";
			if (document.all.txPlanNo.value=="")		
				strErrMsg += "清理批號不可空白";
			
			if (strErrMsg != "")
			{
			    alert(strErrMsg);
			    //1060323 Justin [1050087] 二代公文修改
			    //document.all.txPlanNo.focus();
			    $('#txPlanNo').focus();
			}
			else
			{
				Page_BlockSubmit = false;			
			    //1060323  Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;		
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect"+Index);
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect"+Index);
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect"+Index);
			break;
		case "btDeleteSelected":
			Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect3", strTableFields);
		    //1060323  Justin [1050087] 二代公文修改
		    //jf_SelectBarSubmit();
			jf_SelectBarSubmit(xObjectName);
			break;		
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
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
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txPlanNo"].value == "")
	{
	    strErrMsg += "清理批號不可空白\n";
	    //1060323 Justin [1050087] 二代公文修改
	    //document.all["txPlanNo"].focus();
	    $('#txPlanNo').focus();
	}
	
	/*if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
	}
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
	*/	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
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
			    InValidName = InValidName.substr(1, InValidName.length);
			    //1060323  Justin [1050087] 二代公文修改
			    //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
			    //document.all[InValidControlName].focus();
			    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
			    $('#' + InValidControlName).focus();
				return false;
			}
		}
	}
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
    if (argResult.id == iCallID_txReqOrgId)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
		
			document.all.txReqOrgId.value = argResult.value.RtnField1[0];
			document.all.txReqOrgName.value = argResult.value.RtnField0[0];

		}
		else
		{
			//[0970671]Add by Cola 有錯時，清空相關欄位
			document.all.txReqOrgId.value = "";
			document.all.txReqOrgName.value = "";
			//document.all["txReadOnly"].value = "";
		}
    }
    
    if(argResult.id == ws_OrgID)
    {
		if(argResult.value.m_bSuccess)
		{
			var tempOrgName = argResult.value.RtnField0;
			//alert(tempOrgName);

			var tempOrgNo = jf_Trim(document.all["txReqOrgId"].value);
			//alert(tempOrgNo);
			document.all["txReqOrgId"].value = tempOrgName;
			document.all["txReqOrgName"].value = tempOrgNo;
		}
		else
		{
			//document.all["txSourceOrgName"].value = argResult.value.RtnField0;
			alert("所輸入的機關代碼不合法，請確認");			
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
	if (argCallerId == "EAT501C1")//[0991036] davis 新增搜尋計畫子視窗回傳值
	{
		document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
		if(document.all["txPlanNo"].value != "")
		{
			Page_BlockSubmit=false;
			document.all.ToolBarSenderID.value = "btOpen";	
			if(Page_BlockSubmit==false)
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				__doPostBack("tbTool",0);
			}
		}
	    //1060323  Justin [1050087] 二代公文修改
		//document.all["txPlanNo"].focus();
		$('#txPlanNo').focus();
	}
	
	if (argCallerId == "EAT400C1")
	{
		document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
		if(document.all["txPlanNo"].value != "")
		{
			Page_BlockSubmit=false;
			document.all.ToolBarSenderID.value = "btOpen";	
			if(Page_BlockSubmit==false)
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				__doPostBack("tbTool",0);
			}
		}
	    //1060323  Justin [1050087] 二代公文修改
		//document.all["txPlanNo"].focus();
		$('#txPlanNo').focus();
	}
	if (argCallerId == "EAT400C2")
	{			
		document.all["txReqOrgName"].value  = document.all["lbReturnValue"].options[0].text;
		document.all["txReqOrgId"].value = document.all["lbReturnValue"].options[0].value;
		//document.all["txReqOrgId"].focus();
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
function ObjOnBlur(argObjName)
{
	switch(argObjName)
	{
		case "txPlanNo": //清理批號檢查Plan_Main有無存在

			//if(document.all.txPlanNo.value != "") 清理批號依原程式行為，計畫編號檢核需要自已撰寫web service
			if(document.all.txPlanNo.value != "" )// Davis   [0990544] 增加計畫存在檢核
			{
			 if(document.all["dlChose"].options[document.all["dlChose"].selectedIndex].value=="1")
			 {
				var param = new Array(1);
				param[0] = document.all.txPlanNo.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, param);
				var iCallID_txPlanNo = callObj.id;
				if (callObj.value.RtnStr == "nodata")
				{
				    alert("無此清理批號，請重新輸入");
				    //1060323  Justin [1050087] 二代公文修改
				    //document.all.txPlanNo.focus();
				    $('#txPlanNo').focus();
				}
				else
					document.all.txPlanDesc.value = callObj.value.RtnStr;
			 }
			
			else
			{
			    var param = new Array(1);
				param[0] = document.all.txPlanNo.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromDESPLAN_MAIN", false, param);// Davis   [0990544]新增 檢核計畫存在
				var iCallID_txPlanNo = callObj.id;
				if (callObj.value.RtnStr == "nodata")
				{
				    alert("無此計畫編號，請重新輸入");
				    //1060323  Justin [1050087] 二代公文修改
				    //document.all.txPlanNo.focus();
				    $('#txPlanNo').focus();
				}
			}
		}
			break;
		case "txReqOrgId": //機關代碼Onblur	
			if (document.all.txReqOrgId.value != "")
			{
				var param = new Array(2);
				param[0] = jf_Trim(document.all.txOrgNo.value);
				param[1] = jf_Trim(document.all.txReqOrgId.value);
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_SearchOrgIdAndName", false , param);
				iCallID_txReqOrgId = callObj.id;
				OnWSResult(callObj);
			}
			
			break
		case "txFromOrgDate":
			if (document.all.txFromOrgDate.value != "")
			{
				CallPadFunc("txFromOrgDate");
				if (!jf_CheckCDATE(document.all.txFromOrgDate.value))
				{
				    alert("無效日期格式，請重新輸入");
				    //1060323  Justin [1050087] 二代公文修改
				    //document.all.txFromOrgDate.focus();
				    $('#txFromOrgDate').focus();
				}
			}
			break;
	}
}

//95.09.20 David Add 檢查機關名稱
var ws_OrgID = "";
function CheckOrgNo()
{	
	var param = new Array(2);
	param[0] = document.all["txOrgNo"].value;
	param[1] = document.all["txReqOrgId"].value;
	if(param[1] != "")
	{
		var callObj_Org = jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, param); //使用WebService前必須先呼叫一次
		ws_OrgID = callObj_Org.id;
		OnWSResult(callObj_Org);
	}
	else
		document.all["txReqOrgName"].value = "";
}

function CallPadFunc(strObjName)
{	
	switch(strObjName)
	{		
		case "txFileYearS":
		case "txFileYearE":
		case "txFileSeqS":
		case "txFileSeqE":
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,3,"0");
				break;
		case "txFileVolS":
		case "txFileVolE":
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,4,"0");
				break;
		case "txFromOrgDate":
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,7,"0");
			break;		
	}	
}

function AutoBringOut()
{
	if(document.all["txFileYearE"].value == "" && document.all["txFileClsE"].value == "" && document.all["txFileCaseE"].value == "" && document.all["txFileVolE"].value == "" && document.all["txFileSeqE"].value == "")
	{		
		document.all["txFileYearE"].value = document.all["txFileYearS"].value;
		document.all["txFileClsE"].value = document.all["txFileClsS"].value;
		document.all["txFileCaseE"].value = document.all["txFileCaseS"].value;
		document.all["txFileVolE"].value = document.all["txFileVolS"].value;
		document.all["txFileSeqE"].value = document.all["txFileSeqS"].value;
	}
}

function BringToNextCb(argStartIndex,argTargetIndex)
{
	var CurrCount = document.all.dg1.rows.length;
	for(m=2;m<CurrCount+1;m++)
	{		
		if(document.all["dg1__ctl"+m+"_cbSelect"+argStartIndex].checked)
		{
			document.all["dg1__ctl"+m+"_cbSelect"+argTargetIndex].checked
			document.all["dg1__ctl"+m+"_cbSelect"+argStartIndex].checked
		}
	}		
}

function ChooseType()
{
	if(document.all["rb1"].checked)
		return "";
	if(document.all["rb2"].checked)
		return "2";
	if(document.all["rb3"].checked)
		return "3";
}

function CheckFileRangeIsEmpty()
{
	var bEmtpy_Year = false;
	var bEmtpy_Cls = false;
	
	if(jf_Trim(document.all["txFileYearS"].value) != "")
	{
		bEmtpy_Year = true;
	}
	if(jf_Trim(document.all["txFileClsS"].value) != "")
	{
		bEmtpy_Cls = true;
	}
	if(!bEmtpy_Year && !bEmtpy_Cls)
	{
		alert("請輸入年度或分類號條件");
		return false;
	}
	return true;
}
function fnCalculateDays()
{
	//檢查日期格式
	var strSDate = document.all.txFromOrgDate.value;
	if (strSDate != "" && strSDate.length < 7)
	{
		strSDate = jf_PADL(strSDate,7,'0');
		document.all.txFromOrgDate.value = strSDate;
	}
	if (strSDate != "" && !jf_CheckCDATE(strSDate))
	{
	    //1060323  Justin [1050087] 二代公文修改
	    //document.all.txFromOrgDate.focus();
	    $('#txFromOrgDate').focus();
		jf_ShowMsg( FormatStr( jf_GetErrMsg(InFormatErr2), new Array(["來文日期"]) ), "" );
		return false;
	}

	else
		return true;	
}