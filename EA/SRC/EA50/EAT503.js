/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號			概要
 * -------------------------------------------------------------------------------------------------
 * 96.11.15		Cola	000623			修改保存年限dropdownlist為textbox，並修改按下"設定"時，新保存年限必須>原本存年限
 * 97.07.04		Cola	0960052			新增變更檔號註記
 * 98.07.14		Leslie	0980283			取消修正檔號之註記
 *100.08.02		Jeff	1000631         配合公文文號改為文(編)號 警示訊息一併更動
 *103.01.06		Eileen	1021059			因dlReason無selected屬性，造成dlReason永遠不可能等於-1而通過檢核，因此修改下拉選單(調整原因)的檢核
 *1041120		Kenny	1040921			(Merge 1010877)配合法規新增清理處置項目，修改UI行為(清理處置不檢核原因)
 *1060323       Justin  1050087         二代公文修改
 *1060915		Justin	1050087			修正IsServerHandling
 *1140909       Daniel  1141137	(外貿)修改案次號欄位與呈現畫面以符合外貿協會現行檔號邏輯
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
var strTableFields = new Array("_lbDocNo","_lbFileNo","_lbOKeepyear","_lbNKeepyear","_lbReason","_lbDesc");
//1060323  Justin [1050087] 二代公文修改
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
    /*1060323  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, null);
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次*/
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//1140909  Daniel  1141137		(外貿)外貿目次號改為四碼並修改案次號提示欄位的長度
	if (document.all['HtxOrgNickName'].value == 'TAITRA') {
		txFileSeqS.setAttribute("maxlength", "4");
		txFileSeqS.style.width = "2.5em";
		txFileSeqE.setAttribute("maxlength", "4");
		txFileSeqE.style.width = "2.5em";


	}
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
		    pUrl = "../EA40/EAT400C1.aspx";
		    //1060323  Justin [1050087] 二代公文修改
		    //jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
		    jf_OpenChildWin(pUrl, "EAT400C1", 800, 600);
			break;
		case "btFileAdd": //依照檔號加入
			//檢核規則：分類號、案次號、卷次號、項次號所組成的次序，重頭檢查到最後一個
			//除了最後一項有值的可不一樣之外，其他欄位必須相等。
			//此外，如果四項皆有值且相同，則允許年度號可填入不同的起迄年度
			//如果沒輸入滿，則只允許年度不填，或是填相同年度的值
			//STEP 1：檢核分類號、案次號、卷次號、項次號
			Page_BlockSubmit = true;
			var strErrMsg="";
			var strFileYearS = jf_Trim(document.all.txFileYearS.value);
			var strFileYearE = jf_Trim(document.all.txFileYearE.value);
			var strFileClsS = jf_Trim(document.all.txFileClsS.value);
			var strFileClsE = jf_Trim(document.all.txFileClsE.value);
			var strFileCaseS = jf_Trim(document.all.txFileCaseS.value);
			var strFileCaseE = jf_Trim(document.all.txFileCaseE.value);
			var strFileVolS = jf_Trim(document.all.txFileVolS.value);
			var strFileVolE = jf_Trim(document.all.txFileVolE.value);
			var strFileSeqS = jf_Trim(document.all.txFileSeqS.value);
			var strFileSeqE = jf_Trim(document.all.txFileSeqE.value);
			
			if ((strFileYearE=="")&&(strFileClsE=="")&&(strFileCaseE=="")&&(strFileVolE=="")&&(strFileSeqE==""))
			{
				if ((strFileYearS=="")&&(strFileClsS=="")&&(strFileCaseS=="")&&(strFileVolS=="")&&(strFileSeqS==""))
				{
					alert("請輸入年度或分類號條件");
					return;
				}
				else
				{
					document.all.txFileYearE.value = strFileYearS;
					document.all.txFileClsE.value = strFileClsS;
					document.all.txFileCaseE.value = strFileCaseS;
					document.all.txFileVolE.value = strFileVolS;
					document.all.txFileSeqE.value = strFileSeqS;
					
					//2008.11.26 Marked by Cola 語法錯誤，且上面五行指令已將迄值設定成與起值相同
					
					/*document.all.strFileYearE.value = strFileYearS;
					document.all.strFileClsE.value = strFileClsS;
					document.all.strFileCaseE.value = strFileCaseS;
					document.all.strFileVolE.value = strFileVolS;
					document.all.strFileSeqE.value = strFileSeqS;*/
				}
			}
			
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
						//2008.11.26 Modify by Cola StrFileYearS應為strFileYearS
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
			    //1060323  Justin [1050087] 二代公文修改
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
			if (document.all.txDocNo.value=="")
			{
				//100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
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
			    //1060323  Justin [1050087] 二代公文修改
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
			    //1060323  Justin [1050087] 二代公文修改
			    //document.all["txStockNoS"].focus();
			    $('#txStockNoS').focus();
				Page_BlockSubmit = true;
			}
			else if (document.all["txPlanNo"].value=="")
			{
			    alert("清理批號不可空白");
			    //1060323  Justin [1050087] 二代公文修改
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
		case "btSet":
			Page_BlockSubmit = true;
			if(!CheckSetField())
				return;
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
			    //1060323  Justin [1050087] 二代公文修改
			    //document.all.txPlanNo.focus();
			    $('#txPlanNo').focus();
			}
			else
			{
				//[000623]Add by Cola檢核所有dg中之資料，若新保存年限<原保存年限，則不予設定 -- start --
				var tmpdata = "";
				for (var k=2;k<document.all.dg1.rows.length+1;k++)
				{	
					if (document.all["dg1__ctl"+k+"_cbSelect"].checked)
					{
						var tmpdata = "";
						var tmpyear = "";
						if (document.all["dg1__ctl"+k+"_lbOKeepyear"].value == "永久")
							tmpyear = "99";
						else 
							tmpyear = document.all["dg1__ctl"+k+"_lbOKeepyear"].value;
						//1041120	Kenny	[1040921]	(Merge 1010877)修改，若僅異動"清理處置"時，不執行保存年限之相關檢核	--Start--
						var tmpNClearProc = document.all["dlClearProc"].options[document.all["dlClearProc"].selectedIndex].value;	//先取得新的清理處置
						
						if(jf_Trim(document.all["txKeepYear"].value) != "")
						{
							if (parseInt(tmpyear) > parseInt(document.all["txKeepYear"].value))
							{
								//100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
								//tmpdata += "公文文號："+document.all["dg1__ctl"+k+"_lbDocNo"].value+" 原保存年限："+document.all["dg1__ctl"+k+"_lbOKeepyear"].value+" 新保存年限："+document.all["txKeepYear"].value+"\n";
								tmpdata += "文(編)號："+document.all["dg1__ctl"+k+"_lbDocNo"].value+" 原保存年限："+document.all["dg1__ctl"+k+"_lbOKeepyear"].value+" 新保存年限："+document.all["txKeepYear"].value+"\n";
								tmpdata += "                 新保存年限不應大於原保存年限，故本筆資料將不進行設定。\n";
								document.all["dg1__ctl"+k+"_cbSelect"].checked = false;
							}
						}
						else	//新增清理處置之檢核(僅需於單獨處理清理處置時檢核，其餘由Server自行處理
						{
							if(document.all["dg1__ctl"+k+"_lbOClearProc"].value == tmpNClearProc)
							{
								tmpdata += "文(編)號："+document.all["dg1__ctl"+k+"_lbDocNo"].value+" 原清理處置："+document.all["dg1__ctl"+k+"_lbOClearProc"].value+" 新清理處置："+tmpNClearProc+"\n";
								tmpdata += "                 新清理處置等於原清理處置，故本筆資料將不進行設定。\n";
							}
						}
						//1041120	Kenny	[1040921]	(Merge 1010877)修改，若僅異動"清理處置"時，不執行保存年限之相關檢核	--END--
					}	
				}
				if(tmpdata !="")
					alert(tmpdata);
				var tmpCnt = 0;
				for (var k=2;k<document.all.dg1.rows.length+1;k++)
				{	
					if (document.all["dg1__ctl"+k+"_cbSelect"].checked)
						tmpCnt++;
				}
				if (tmpCnt==0)
					Page_BlockSubmit = true;
				else
				{
					Page_BlockSubmit = false;
					//1060915  Justin [1050087] 修正IsServerHandling
					IsServerHandling = true;
				}
				//Cola -- end --
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
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1060323  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
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
			    //1060323  Justin [1050087] 二代公文修改
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
		case "btSave2":
			Page_BlockSubmit = true;
			var strErrMsg="";
			if (document.all.txPlanNo.value=="")		
				strErrMsg += "清理批號不可空白";
			
			var selectCnt=0;
			if (document.all.dg1)
			{
				for (var k=2;k<document.all.dg1.rows.length+1;k++)
				{	
					if (document.all["dg1__ctl"+k+"_cbSelect2"].checked)
						selectCnt++;
					else
					{
						if (document.all["dg1__ctl"+k+"_cbSelect3"].checked)
							selectCnt++;						
					}
				}
			}
			//alert(selectCnt);
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
			    //1060323  Justin [1050087] 二代公文修改
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
			    //1060323  Justin [1050087] 二代公文修改
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
			Page_BlockSubmit = true;
			var strErrMsg="";
			if (document.all.txPlanNo.value=="")		
				strErrMsg += "清理批號不可空白";
			
			if (strErrMsg != "")
			{
			    alert(strErrMsg);
			    //1060323  Justin [1050087] 二代公文修改
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
	    //1060323  Justin [1050087] 二代公文修改
	    //document.all["txPlanNo"].focus();
	    $('#txPlanNo').focus();
	}
	
	/*if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
	}
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;*/
		
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
			    //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");
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

			if(document.all.txPlanNo.value != "")
			{
				var param = new Array(1);
				param[0] = document.all.txPlanNo.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, param);
				var iCallID_txPlanNo = callObj.id;
				if (callObj.value.RtnStr == "nodata")
				{
				    alert("無此計畫編號，請重新輸入");
				    //1060323  Justin [1050087] 二代公文修改
				    //document.all.txPlanNo.focus();
				    $('#txPlanNo').focus();
				}
				else
					document.all.txPlanDesc.value = callObj.value.RtnStr;
			}
			break;
		case "txFileSeqS":

			if (document.all.txFileSeqS.value !="")
			{
				if (document.all.txFileSeqS.length != 3)
				{
					document.all.txFileSeqS.value = jf_PADL(document.all.txFileSeqS.value,3,'0');
				}	
			}
			break;
		case "txFileSeqE":
			if (document.all.txFileSeqE.value !="")
			{
				if (document.all.txFileSeqE.length != 3)
				{
					document.all.txFileSeqE.value = jf_PADL(document.all.txFileSeqE.value,3,'0');
				}	
			}
			break;
		case "txFileVolE":
			if (document.all.txFileVolE.value !="")
			{
				if (document.all.txFileVolE.length != 4)
				{
					document.all.txFileVolE.value = jf_PADL(document.all.txFileVolE.value,4,'0');
				}	
			}
			break;		
		case "txFileVolS":
			if (document.all.txFileVolS.value !="")
			{
				if (document.all.txFileVolS.length != 4)
				{
					document.all.txFileVolS.value = jf_PADL(document.all.txFileVolS.value,4,'0');
				}	
			}
			break;		
		case "txFileYearS":
			if (document.all.txFileYearS.value != "")
			{
				document.all.txFileYearS.value = jf_PADL(document.all.txFileYearS.value,3,'0');
				if (!jf_IsNum(document.all.txFileYearS.value))
				{	
				    alert("年度號(起)必須為數字格式，請重新輸入");
				    //1060323  Justin [1050087] 二代公文修改
				    //document.all.txFileYearS.focus();
				    $('#txFileYearS').focus();
				}
				else
				{
					document.all.txFileYearS.value = jf_PADL(document.all.txFileYearS.value,3,'0');
				}
			}
			break;
		case "txFileYearE":
			if (document.all.txFileYearE.value != "")
			{
				document.all.txFileYearE.value = jf_PADL(document.all.txFileYearE.value,3,'0');			
				if (!jf_IsNum(document.all.txFileYearE.value))
				{	
				    alert("年度號(迄)必須為數字格式，請重新輸入");
				    //1060323  Justin [1050087] 二代公文修改
				    //document.all.txFileYearE.focus();
				    $('#txFileYearE').focus();
				}
				else
				{
					
				}
			}
			break;
		//1140909      Daniel  1141137	(外貿)修改案次號欄位與呈現畫面以符合外貿協會現行檔號邏輯
		case "txCountryNoS":
		case "txDivisionNoS":
		case "txProductNoS":
		case "txCountryNoE":
		case "txDivisionNoE":
		case "txProductNoE":
			var strTarget = document.all[argObjName].value;
			if (strTarget != "") {
				if (strTarget.length < 3) {
					if (argObjName == "txDivisionNoS" || argObjName == "txDivisionNoE")
						strTarget = jf_PADL(strTarget, 3, '0');
					else
						strTarget = jf_PADR(strTarget, 3, '0');
					document.all[argObjName].value = strTarget;
				}
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
		alert("至少輸入年度或分類號條件");
		return false;
	}
	return true;
}

function CheckSetField()
{
	var FieldCnt = 0;
	//[000623]Modify By Cola dlKeepYear 更改為 txKeepYear 
	//if(document.all["dlKeepYear"].selected != -1)
	//0980714	Leslie[0980283]	取消註記修改檔號之功能
	//[0960052]Add by Cola 新增變更檔號 -- start --
	//if (document.all["rbY"].checked)
	
	//1041120	Kenny	[1040921]	(Merge 1010877)修改，若僅異動"清理處置"時，不執行保存年限之相關檢核--Start--
	if(jf_Trim(document.all["txKeepYear"].value) != "" )
	{
		if(jf_Trim(document.all["txKeepYear"].value) != "")
			FieldCnt++;
		
		//103.01.06 Eileen [1021059] 因dlReason無selected屬性，造成dlReason永遠不可能等於-1而通過條件檢核 --start
		/*
		if(document.all["dlReason"].selected != -1)
			FieldCnt++;
		*/
		if ( document.all["dlReason"].selectedIndex != 0 )
			FieldCnt++;
		//Eileen --end
		
		if(jf_Trim(document.all["txDesc"].value) != "")
			FieldCnt++;
		if(FieldCnt != 3)
		{
			alert("相關意見欄位不可空白");
			return false;
		}
	}
	else	//加上清理處置部分的檢核(至少需選擇一項)
	{
		if(document.all["dlClearProc"].selectedIndex == -1)
		{
			alert("至少需選擇一項設定項目");
			return false;
		}		
	}
	//1041120	Kenny	[1040921]	(Merge 1010877)修改，若僅異動"清理處置"時，不執行保存年限之相關檢核--End--
	/*
	else if (document.all["rbF"].checked)
	{
		if(jf_Trim(document.all["txDesc"].value) != "")
			FieldCnt++;
		if(FieldCnt != 1)
		{
			alert("說明欄位不可空白");
			return false;
		}
	}*/	
	//Cola -- end --
	//Leslie -- End --
	return true;
}
