/*
DATE		SA		PRG		MGR_NO	DESC
0960215		Andy	David	960032	台科大修改項
0960312		Andy	David	960054	台科大新增卷次功能
0960312		Andy	David	960058	台科大搜尋失敗隱藏索引標籤
0960312		Andy	David	960059	台科大開啟前檢核
0960312		Andy	David	960057	案卷標籤樣式修改
0960312		Andy	David	960063	切換區間時，隱藏下方DataGrid
0960313		Andy	David	960061	AKM330更新後，回EAT220則同步刷新目次表
0960313		Andy	David	960060	新增fn_ScrollbarCtl，於ClientOnLoad設定每1000毫秒檢查一次
0960410		Andy	Jeff	960100	開啟EAT220時視窗調成640x480
0960417     Andy    Jeff    960100  自動立案功能
0960704		Charles	Charles	------	(台科大)修正「已開啟後變更條件時，按取消卻未回復查詢條件」問題
0960705		Charles	Charles	------	(台科大)移動捲軸到所點選的資料列
0960705		Charles	Charles	------	(台科大)修正「直接點選影像圖示，該筆資料列沒有記錄點亮效果」問題
0960705		Charles	Charles	------	(台科大)Client端為TR註冊onclick觸發fnMouseClickRow方法之程式改在CS作
0960705		Charles	Charles	------	(台科大)修正「若是點TD無法記錄點亮效果」問題
0960705		Charles	Charles	001150	(台科大)按開啟的話則清空預設卷次號，讓每次開啟都是停在最後一卷
1031003		Cloud	Gabby	1020634	將3.0.33.2台科大客製化功能Merge到版本3.0.44/45/46與4.0.0版
1031112	    Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1031120     Kevin   Kenny   1030836 配合SSL調整使用的網址協定
1090424		Cloud	Kevin_C	1090278	一併修升二代bug
1091203		Cloud	Cloud	1090891	修改路徑弱點-升級二代調整線上瀏覽方式1100204     Leslie  Zen     1090927 取消使用document.activeElement1110103     Kevin   Zen     1101292	修正多次點擊重複PostBack之問題
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var LayoutModeNew = 0;
var LayoutModeModify = 1;

var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1061027	Kevin_C	1050087	升二代
//if(document.all.tbTool)
	//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
	//document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
	
//96.03.12 960058 David 搜尋失敗，則於丟出錯誤訊息前，將索引標籤清空
var Mode = document.all["txMode"].value;
if(Mode == LayoutModeNew)
{
	document.all["TEST"].outerHTML = "<TABLE id=\"TEST\" style=\"HEIGHT: 1px\" cellSpacing=\"0\" cellPadding=\"0\" width=\"91%\" border=\"0\"></TABLE>";
}
else
	InitVolButton();
	
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1061027	Kevin_C	1050087	升二代
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	/*
	var Mode = document.all["txMode"].value;
	if(Mode == LayoutModeNew)
	{
		document.all["TEST"].outerHTML = "<TABLE id=\"TEST\" style=\"HEIGHT: 1px\" cellSpacing=\"0\" cellPadding=\"0\" width=\"91%\" border=\"0\"></TABLE>";
	}
	*/
	RowLight();
	dgComtype();
	
	buttonCtrl(0);
	document.all["txPreCls"].value = 	document.all["txCls"].value;
	document.all["txPreYear"].value = 	document.all["txYear"].value;
	document.all["txPreCase"].value = 	document.all["txCase"].value;	
	//96.03.13 960060 David 每1000毫秒檢查一次
	//window.setInterval("fn_ScrollbarCtl()", 1000);
	window.onresize = fn_ScrollbarCtl;	
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

	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題	if (IsServerHandling)	{		Page_BlockSubmit = true;		return;	}
	
	Page_BlockSubmit = true;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btRefile":
			Page_BlockSubmit=false;
			//document.all["txBegVol"].value = "";
			document.all["txCallBack_id"].value = "";
			//1061027	Kevin_C	1050087	升二代
			__doPostBack("btRefile", "");
			break;		
		case "btStart":
			Page_BlockSubmit=CheckBeforeOpen();
			//[問題單001150] Charles (台科大)按開啟的話則清空預設卷次號，讓每次開啟都是停在最後一卷 0960705
			document.all["txBegVol"].value = "";
			//96.03.13 960061 David 如為一般查詢，則需清空紀錄欄位
			document.all["txCallBack_id"].value = "";
			IsServerHandling = true;
			//1061027	Kevin_C	1050087	升二代
			__doPostBack("btStart", "");
			break;
		case "btMoveUp":
			//alert("UP");
			InitCheckBox();
			//Page_BlockSubmit=true;
			
			//96.03.16 960054 David 移至上下一卷也需清空隱藏欄位紀錄值
			document.all["txCallBack_id"].value = "";
			
			Page_BlockSubmit=BeforeAccess("UP");
			break;
		case "btMoveNext":
			//alert("NEXT");
			InitCheckBox();
			//Page_BlockSubmit=true;
			
			//96.03.16 960054 David 移至上下一卷也需清空隱藏欄位紀錄值
			document.all["txCallBack_id"].value = "";
			
			Page_BlockSubmit=BeforeAccess("NEXT");
			break;
		case "btPrint1":
			Page_BlockSubmit = false;
			//1061027	Kevin_C	1050087	升二代
			__doPostBack("btPrint1", "");
			break;
		case "ibtCLS":
			var pUrl = "";
			var pUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAI300&MODE=1&FILE_CLS="+document.all["txCls"].value+"&FILE_YEAR="+document.all["txYear"].value;
			//rtnObj=lbReturnValue&nFrom=EAI300&MODE=1&FILE_CLS=
			//open(pUrl);
			//alert(pUrl);
			jf_OpenChildWin(pUrl,"EAC005",900,768);
			Page_BlockSubmit = true;
			break;
			
		case "ibtCASE":
			var pUrl = "";
			pUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAI300&MODE=2&FILE_CASE="+document.all["txCase"].value+"&FILE_YEAR="+document.all["txYear"].value+"&FILE_CLS="+document.all["txCls"].value;
			jf_OpenChildWin(pUrl,"EAC005",900,768);
			Page_BlockSubmit = true;
			break;
		case "TestAction":
			Page_BlockSubmit=false;
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1061027	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題	if (IsServerHandling)	{		Page_BlockSubmit = true;		return;	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1061027	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		//1061027	Kevin_C	1050087	升二代 -S
		// case "btOpen":
			// Page_BlockSubmit = CheckBeforeOpen();
			// jf_ToolBarSubmit();
			// jf_ToolBarSubmit(xObjectName);
			// break;
		// case "btSave":
			// if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			// {
				// IsServerHandling = true;
				// jf_ShowWaitState();	
				// Page_BlockSubmit = false;
			// }
			// else
				// Page_BlockSubmit = true;
			// jf_ToolBarSubmit();	
			// jf_ToolBarSubmit(xObjectName);	
			// break;
		// case "btDelete":
			// Page_BlockSubmit = !jf_ConfirmDelete();
			// jf_ToolBarSubmit();
			// jf_ToolBarSubmit(xObjectName);
			// break;
		// case "btCancel":
			// Page_BlockSubmit = !jf_ConfirmCancel();
			// jf_ToolBarSubmit();
			// jf_ToolBarSubmit(xObjectName);
			// break;
		//1061027	Kevin_C	1050087	升二代 -E
		case "btClean":
			Page_BlockSubmit = false;
			//1061027	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1061027	Kevin_C	1050087	升二代
		//case "btSearch":
			/*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin_ForEAT220(strUrl, "SII020", 700, 500 );
			*/
		//1061027	Kevin_C	1050087	升二代 -S
			//break;
		// case "btPrint":
			// Page_BlockSubmit = !jf_ConfirmPrint();
			// jf_ToolBarSubmit();
			// jf_ToolBarSubmit(xObjectName);
			// break;
		// case "btPreview":
			// Page_BlockSubmit = !jf_ConfirmPreview();
			// jf_ToolBarSubmit();
			// jf_ToolBarSubmit(xObjectName);
			// break;
		
		////以下屬於DataGrid ToolBar
		// case "btSelectAll":
			// Page_BlockSubmit = true;
			// jf_SelectAll("dg1", "_cbSelect");
			// break;
		// case "btSelectInverse":
			// Page_BlockSubmit = true;
			// jf_SelectInverse("dg1", "_cbSelect");
			// break;
		// case "btSelectClear":
			// Page_BlockSubmit = true;
			// jf_SelectClear("dg1", "_cbSelect");
			// break;
		// case "btDeleteSelected":
			// Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
			// jf_SelectBarSubmit();
			// break;
		// case "btUp":
			// Page_BlockSubmit = true;
			// jf_RowUp("dg1", "_cbSelect", strTableFields);
			// break;
		// case "btDown":
			// Page_BlockSubmit = true;
			// jf_RowDown("dg1", "_cbSelect", strTableFields);
			// break;
		//1061027	Kevin_C	1050087	升二代 -E
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
{/*
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txKeyFld"].value == "")
	{
		strErrMsg += "鍵值欄位不可空白\n";
		document.all["txKeyFld"].focus();
	}
	
	if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
	}
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;*/
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{/*
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
				InValidName = InValidName.substr(1,InValidName.length);
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
				document.all[InValidControlName].focus();
				return false;
			}
		}
	}
	return true;*/
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
	if (argCallerId=="EAC005")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			document.all["txCls"].value=document.all["lbReturnValue"].options[1].value;
			document.all["txCase"].value=document.all["lbReturnValue"].options[2].value;
			if(document.all["lbReturnValue"].options[0].value!="")
				document.all["txYear"].value=document.all["lbReturnValue"].options[0].value;
		}
	}
	
	//96.03.13 960061 David 判斷為AKM330回傳時，則自動PostBack回Server
	if(argCallerId == "AKM330")
	{
	    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
	    IsServerHandling = true;
		__doPostBack("btStart","");
	}
	
	
	if(document.all["txPreCls"].value != document.all["txCls"].value)
		//1061027	Kevin_C	1050087	升二代
		//document.all["txCls"].focus();
		$('#txCls').focus();
	if(document.all["txPreCase"].value != document.all["txCase"].value)
		//1061027	Kevin_C	1050087	升二代
		//document.all["txCase"].focus();
		$('#txCase').focus();
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//產生分頁控制鈕
function InitVolButton()
{
	var VolArr = document.all["txVolArr"].value;
	if(VolArr != "")
	{
		var Page = document.all["txVolPage"].value;
		var nowVol = document.all["txBegVol"].value;
		var vol = VolArr.split(';');
		var InsertContentBegin	="";
		var InsertContentEnd	="";
		var InsertContent		="";
		var volName = document.all["txVolName"].value;
		var volArr = volName.split(';');
		InsertContent += "<TR>"+"<TD width=\"60px\">";
		var i = Page*7;
		var PageEnd = Page*7+7;
		if(PageEnd > vol.length)
			PageEnd = vol.length;
		
		InsertContent += "<input id='btToppage' type='submit' name='btToppage' onclick=ChangePage(\"T\") style=\"POSITION: relative; HEIGHT: 25px;TOP: 10px;\" value=\"|<\"/>";
		InsertContent += "<input id='btPrepage' type='submit' name='btPrepage' onclick=ChangePage(\"-\") style=\"POSITION: relative; HEIGHT: 25px;TOP: 10px;\" value=\"<<\"/></TD>";
		
		for(i;i<PageEnd;i++)
		{
			var j=0;
			var style = "";
			var bgFile = "";
			j = i%5;
			switch(j)
			{/*
				case 0:
					style = "tr01";
					break;
				case 1:
					style = "tr02";
					break;
				case 2:
					style = "tr03";
					break;
				case 3:
					style = "tr04";
					break;
				case 4:
					style = "tr05";
					break;*/
					/*
				case 0:
					//style = "tr01";
					bgFile = "../../../STD/IMAGE/標籤按鈕-白";
					break;
				case 1:
					style = "tr02";
					bgFile = "../../../STD/IMAGE/標籤按鈕-淡紅";
					break;
				case 2:
					style = "tr03";
					bgFile = "../../../STD/IMAGE/標籤按鈕-淡黃";
					break;
				case 3:
					style = "tr04";
					bgFile = "../../../STD/IMAGE/標籤按鈕-淡綠";
					break;
				case 4:
					style = "tr05";
					bgFile = "../../../STD/IMAGE/標籤按鈕-淡藍";
					break;*/
			}
			
			//96.03.12 960057 案卷標籤樣式修改
			//1061027	Kevin_C	1050087	升二代
			//bgFile = "../../../STD/IMAGE/EAT220_標籤按鈕";
			bgFile = "../../../STDN/IMAGE/EAT220_標籤按鈕";
			
			if(i==parseInt(nowVol,10)-1)
			{
				bgFile = bgFile+"2";
				InsertContent +=
				"<TD align=\"Center\" width=\"110px\" height=\"57px\" background=\""+bgFile+".gif\"><span id='btVol_"+(i+1)+"' style=\"POSITION: relative; HEIGHT: 50px;TOP: 10px;font-family:Arial Black;font-size:x-Small;\" class=HandCurs onclick=btVolCheck(\""+(i+1)+"\")>"+"第 "+ClearZero(volArr[i])+" 卷 <FONT face=\"細明體\">("+vol[i]+")</FONT>"+"</span></TD>";
				
				//96.03.12 960063 David 若使用者切回原頁，則顯示Dg
				//1061027	Kevin_C	1050087	升二代
				//document.all["dg1"].className = "dghead";
				document.all["dg1"].className = "";
			}
			else
			{
				InsertContent +=
				"<TD align=\"Center\" width=\"110px\" height=\"57px\" background=\""+bgFile+".gif\"><span id='btVol_"+(i+1)+"' style=\"POSITION: relative; HEIGHT: 45px;TOP: 12px;font-family:Arial Black;font-size:x-Small;color:gray\" class=HandCurs onclick=btVolCheck(\""+(i+1)+"\")>"+"第 "+ClearZero(volArr[i])+" 卷 <FONT face=\"細明體\">("+vol[i]+")</FONT>"+"</span></TD>";
			}
			
			/*InsertContent +=
				"<input id='btVol_"+ (i+1) + "' type='submit' name='btVol_" + (i+1) + "' onclick=btVolCheck(\""+(i+1)+"\") value=\"第"+(i+1)+"卷("+vol[i]+")\" class=\""+style+"\"/>";*/
			/*InsertContent +=
				"<TD align=\"Center\" width=\"110px\" height=\"41px\" background=\""+bgFile+".gif\"><span id='btVol_"+(i+1)+"' style=\"POSITION: relative; HEIGHT: 41px;TOP: 25px;font-family:細明體;font-size:x-Small;\" onclick=btVolCheck(\""+(i+1)+"\")>"+"第"+ClearZero(volArr[i])+"卷("+vol[i]+")"+"</span></TD>";*/
		}
		//InsertContent += "</TD>";
		InsertContent += "<TD><input id='btNextpage' type='submit' name='btNextpage' onclick=ChangePage(\"+\") style=\"POSITION: relative; HEIGHT: 25px;TOP: 10px;\" value=\">>\"/>";
		InsertContent += "<input id='btButtompage' type='submit' name='btButtompage' onclick=ChangePage(\"B\") style=\"POSITION: relative; HEIGHT: 25px;TOP: 10px;\" value=\">|\"/>";
		InsertContent += "</TD>"+"</TR>";
		var oldHTML = "<TABLE id='TEST' style='HEIGHT: 1px' cellSpacing='0' cellPadding='0' width='900px' border='0'><TBODY>";
		var newHTML = "";
		newHTML = oldHTML + InsertContent + "</TBODY></TABLE>";
		//alert(newHTML);
		document.all["TEST"].outerHTML = newHTML;
		
		PageControl();
	}
	
	var DgSize = 0;//document.all.dg1.rows.length;
	if(document.all["dg1"] != null)
		DgSize = document.all.dg1.rows.length;
	var iSeq = 0;
	//1061027	Kevin_C	1050087	升二代
	//var old_Seq = document.all["dg1__ctl2_lbSeq"].innerText;
	var old_Seq = document.all["dg1__ctl2_lbSeq"].textContent;
	for(var i=1;i<DgSize-1;i++)
	{
		//1061027	Kevin_C	1050087	升二代
		//var new_Seq = document.all["dg1__ctl"+(i+2)+"_lbSeq"].innerText;
		var new_Seq = document.all["dg1__ctl"+(i+2)+"_lbSeq"].textContent;
		if(new_Seq != old_Seq)
			iSeq++;
		old_Seq	= new_Seq;
		
	}
	
	ShowDgDetail(iSeq+1,0);
}

//去除卷號中的0
function ClearZero(argVol)
{//alert(argVol);
	var Vol = argVol.split('');
	var rtnVol = "";
	var StartFlag = -1;
	var EndFlag = -1;
	for(var i=0;i<Vol.length;i++)
	{
		if(i == 0 && Vol[0] == "0")
			StartFlag = 0;
		if(Vol[i] != "0")
		{
			EndFlag = i;
			break;
		}
	}
	//alert(StartFlag+","+EndFlag);
	if(StartFlag == 0)
	{
		var tempstr = "";
		for(var i=EndFlag;i<Vol.length;i++)
			tempstr += Vol[i];
		rtnVol = tempstr;
	}
	else
	{
		rtnVol = argVol;
	}
	//alert(rtnVol);
	return rtnVol;
}

//設定換頁參數
function ChangePage(argType)
{
	Page_BlockSubmit = true;
	var Page = document.all["txVolPage"].value;
	var VolArr = document.all["txVolArr"].value;
	var vol = VolArr.split(';');
	var TotalPage = (vol.length/7);
	
	if(argType == "+")
	{
		document.all["txVolPage"].value = parseInt(Page,10)+1;
		//96.03.12 960063 David 切換區間時，隱藏下方DataGrid以防使用者渾淆
		//1061027	Kevin_C	1050087	升二代
		//document.all["dg1"].className = "Hide";
		document.all["dg1"].className = "hide";
		//96.03.16 960062 David 改為個別呼叫切換區間函式
		InitVolButton();
	}
	if(argType == "-")
	{
		document.all["txVolPage"].value = parseInt(Page,10)-1;
		//96.03.12 960063 David 切換區間時，隱藏下方DataGrid以防使用者渾淆
		//1061027	Kevin_C	1050087	升二代
		//document.all["dg1"].className = "Hide";
		document.all["dg1"].className = "hide";
		//96.03.16 960062 David 改為個別呼叫切換區間函式
		InitVolButton();
	}
	if(argType == "T")
	{
		document.all["txVolPage"].value = "0";
		//96.03.12 960063 David 切換區間時，隱藏下方DataGrid以防使用者渾淆
		//1061027	Kevin_C	1050087	升二代
		//document.all["dg1"].className = "Hide";
		document.all["dg1"].className = "hide";
		btVolCheck(1);
	}
	if(argType == "B")
	{
		document.all["txVolPage"].value = TotalPage-1;
		//96.03.12 960063 David 切換區間時，隱藏下方DataGrid以防使用者渾淆
		//1061027	Kevin_C	1050087	升二代
		//document.all["dg1"].className = "Hide";
		document.all["dg1"].className = "hide";
		btVolCheck(vol.length);
	}
	
	//96.03.16 960062 David Marked 切換區間時，不同步更新標籤按鈕；待PageLoad時一併更新
	//InitVolButton();
}

//檢查目前為哪一頁並PostBack回Server
function btVolCheck(argIndex)
{
	Page_BlockSubmit = false;
	document.all["txBegVol"].value = argIndex;	
	
	//96.03.13 960061 David 更換頁面或重新查詢均需清空紀錄點亮欄位
	document.all["txCallBack_id"].value = "";
    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
	IsServerHandling = true;
	__doPostBack("btStart","");
}

//勾選全部
function cbAllOnclick()//zn
{
	var DgSize = 0;//document.all.dg1.rows.length;
	if(document.all["dg1"] != null)
		DgSize = document.all.dg1.rows.length;
		
	//1061027	Kevin_C	1050087	升二代
	//var isCheck = document.all["dg1__ctl1_cbHead"].checked;
	var isCheck = document.all["cbHead"].checked;
	
	for(var i=0;i<DgSize-1;i++)
	{
		document.all["dg1__ctl"+(i+2)+"_cbSelect"].checked = isCheck;
	}
	
	var iCnt = 0;
	for(var i=0;i<DgSize-1;i++)
	{
		var isCheck = document.all["dg1__ctl"+(i+2)+"_cbSelect"].checked;
		if(isCheck)
		{
			//2008.09.22 Modify by Cola 因應hlDocNo可能不僅僅顯示DOC_NO，因此必需額外判斷 -- start --
			//1061027	Kevin_C	1050087	升二代
			//var DocNo_Index = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText.indexOf("(");
			var DocNo_Index = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].textContent.indexOf("(");
			var DocNo = "";			
			if (DocNo_Index == -1)
				//1061027	Kevin_C	1050087	升二代
				//DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText;
				DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].textContent;
			else
				//1061027	Kevin_C	1050087	升二代
				//DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText.substring(0,DocNo_Index);
				DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].textContent.substring(0,DocNo_Index);
			//var DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText;
			//Cola -- end --
			//1061027	Kevin_C	1050087	升二代
			//var ComNo_N = document.all["dg1__ctl"+(i+2)+"_lbComNo"].innerText;
			var ComNo_N = document.all["dg1__ctl"+(i+2)+"_lbComNo"].textContent;
			
			if(jf_Trim(ComNo_N) == "")
				iCnt++;
			else
			{
				if(jf_Trim(ComNo_N) == jf_Trim(DocNo))
					iCnt++;
			}
		}
	}
	
	buttonCtrl(iCnt);
	
	var iSeq = 0;
	//1061027	Kevin_C	1050087	升二代
	//var old_Seq = document.all["dg1__ctl2_lbSeq"].innerText;
	var old_Seq = document.all["dg1__ctl2_lbSeq"].textContent;
	for(var i=1;i<DgSize-1;i++)
	{		
		//1061027	Kevin_C	1050087	升二代
		//var new_Seq = document.all["dg1__ctl"+(i+2)+"_lbSeq"].innerText;
		var new_Seq = document.all["dg1__ctl"+(i+2)+"_lbSeq"].textContent;
		if(jf_Trim(new_Seq) != jf_Trim(old_Seq))
			iSeq++;
		old_Seq	= new_Seq;
	}
	
	ShowDgDetail(iSeq+1,iCnt);
	//ShowDgDetail(DgSize-1,iCnt);
}

//控制換頁
function PageControl()
{	
	var NowPage = document.all["txVolPage"].value;
	var VolArr = document.all["txVolArr"].value;
	var vol = VolArr.split(';');
	var TotalPage = 0;//(parseInt(vol.length)/7);
	//alert(NowPage);
	
	if(vol.length < 7)
		TotalPage = 0;
	else
		TotalPage = (parseInt(vol.length)/7);
		
	//96.03.09 960062 David 修改最後一頁按鈕有時無法Disalbed問題
	var temp = parseInt(TotalPage);
	
	if((vol.length-temp*7) > 0)
		//alert(1);
		TotalPage = temp+1;
		
	/*alert(vol.length);
	alert(temp);
	alert(TotalPage);*/
	
	//alert(NowPage+","+TotalPage);
	if(NowPage == 0)
	{
		document.all["btPrepage"].disabled = true;
		document.all["btNextpage"].disabled = false;
		document.all["btToppage"].disabled = true;
	}
	//96.03.12 960062 David 頁面切換
	if(TotalPage == 1)
	{
		document.all["btPrepage"].disabled = true;
		document.all["btNextpage"].disabled = true;
		document.all["btToppage"].disabled = true;
		document.all["btButtompage"].disabled = true;
	}
	else
	{
		if(parseInt(NowPage,10)+1 == TotalPage)
		{
			document.all["btPrepage"].disabled = false;
			document.all["btNextpage"].disabled = true;
			document.all["btButtompage"].disabled = true;
		}
	}
	document.all["btMoveUp"].disabled = true;
	document.all["btMoveNext"].disabled = true;
	/*
	//移置上一卷控制
	if(document.all["txBegVol"].value == "1")
		document.all["btMoveUp"].disabled = true;
	else
		document.all["btMoveUp"].disabled = false;
	alert(vol.length);
	alert(document.all["txBegVol"].value);
	//移至下一卷控制
	if(vol.length == parseInt(document.all["txBegVol"].value,10))
		document.all["btMoveNext"].disabled = true;
	else
		document.all["btMoveNext"].disabled = false;
		*/
	//96.03.16 960062 David 按鍵控制
	//1061027	Kevin_C	1050087	升二代
	//if(document.all["dg1"].className == "Hide")
	if(document.all["dg1"].className == "hide")
	{
		document.all["btMoveUp"].disabled = true;
		document.all["btMoveNext"].disabled = true;
	}
}

//帶出AKM330
function BringOutAkm330(argDocNo)
{
	Page_BlockSubmit = true;
	var OrgNo = jf_Trim(document.all["txOrgNo"].value);
	var OrgName = jf_Trim(document.all["txOrgName"].value);
	var DeptNo = jf_Trim(document.all["txDeptNo"].value);
	var EmpName = jf_Trim(document.all["txEmpName"].value);
	var UserName = jf_Trim(document.all["txUserName"].value);
	
	var ServerName = document.all["txServerName"].value;
	//Cola 額外傳入Artifact
	var pUrl = "http:\\\\"+ServerName+"\\AK\\AKM330.aspx?argDocNo=" + argDocNo + "&argMode=m&ORG_NO="+OrgNo+"&DEPT_NO="+DeptNo+"&EMP_NAME="+escape(EmpName)+"&ORG_NAME="+escape(OrgName)+"&USERNAME="+UserName+"&CallerID=EAT220&SAMLart="+document.all["SsoArtifact"].value;
    //alert(pUrl);
    //1031120   Kenny   [1030836]   配合SSL調整使用的網址協定
	if (document.all.II_USE_SSL != null) {
	    if (document.all.II_USE_SSL.value == "Y")
	        pUrl = pUrl.replace("http:\\", "https:\\");
	}
	jf_OpenChildWin_ForEAT220(pUrl, "AKM330", 900, 768);
}

//排序設定
function fn_Order(argId)
{
	var PreOrder = document.all["txOrder"].value;
	if(PreOrder != "")
	{
		var tempArr = PreOrder.split(';');
		if(tempArr[0] == argId)
		{
			if(tempArr[1] == "+")
				document.all["txOrder"].value = argId+";"+"-";
			if(tempArr[1] == "-")
				document.all["txOrder"].value = argId+";"+"+";
		}
		else
		{
			document.all["txOrder"].value = argId+";"+"+";
		}
	}
	else
	{
		document.all["txOrder"].value = argId+";"+"+";
	}
    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
	IsServerHandling = true;
	__doPostBack("btStart","");
}

//影像產生
//1091203		Cloud	1090891	修改路徑弱點-升級二代調整線上瀏覽方式
//function ImageCreate(argDocNo)
function ImageCreate(argDocNo, argArt)
{
	//Charles (台科大)影像圖示onclick觸發此方法，而因事件冒泡機制會連續觸發TR的fnMouseClickRow
	//去記錄本筆資料列的index，但因為這裡就會先直接post回server，導致其實還沒記錄到本筆資料列的index，
	//結果回到Client端無法重新點亮該筆資料列，以及自動移至該列，所以這裡先取消事件冒泡
	//再幫TR呼叫fnMouseClickRow記錄本筆資料列的index	0960705
	event.cancelBubble = true;
	fnMouseClickRow();
	//1091203		Cloud	1090891	修改路徑弱點-升級二代調整線上瀏覽方式
	//Page_BlockSubmit = false;
	Page_BlockSubmit = true;
	//document.all["txImageDocNo"].value = argDocNo;
	//alert(argDocNo);
	//IsServerHandling = true;
	//__doPostBack("btImage","");
	DownloadDocument(argArt, argDocNo);
}
//1091203		Cloud	1090891	修改路徑弱點-升級二代調整線上瀏覽方式
function DownloadDocument(argArt,argDocNo)
{
	var artifact = argArt;
	var strDocNo = argDocNo;
	var strOrgNo = jf_Trim(document.all["txOrgNo"].value);
	var ret;

	try {
		var wsUrl = "";
		if(opener.theWebServices)
			wsUrl = opener.theWebServices.url('fileiows');
		else
			wsUrl = opener.opener.theWebServices.url('fileiows');
		var param = [];
		param[0] = encodeURI(artifact);
		param[1] = encodeURI(strDocNo);
		param[2] = encodeURI(strOrgNo);
		

		var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
		if (!rtnObj.error) {
			if (rtnObj.value.m_bSuccess) {
				var sUnvObj = rtnObj.value.RtnStr;
				if (sUnvObj !== "") {
					var UnvObj = JSON.parse(sUnvObj);
					var objViewDoc = {
						UNVObj: UnvObj,
						docInfoPage: "EAT220",
						openDocModule: 'AOL',
						signType: 'E',
						readOnlyMode: true
					};
					var $docId = jf_GetSessionID() + "_" + (+new Date());
					localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
					var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
					jf_OpenChildWin(unvUrl, "EAT220ViewDoc");
				}
			}
			else{
				alert(rtnObj.value.m_strErrMsg);
			}
		}
		else{
			alert(rtnObj.error.errorDetail.string)
		}
	} catch (e) {
		alert('開啟失敗');
	}
}


//檢核查詢欄位是否變動
function fn_Onblur(argId)
{
	var argId_Value = document.all[argId].value;
	var TargetID = "";
	
	switch(argId)
	{
		case "txYear":
			TargetID = "txPreYear";
			if(jf_Trim(argId_Value) != "")
				argId_Value = jf_PADL(argId_Value,3,"0");
			document.all["txYear"].value = argId_Value;
			for(var i=0;i<document.all["dlYear"].options.length;i++)
			{
				//1090424	Kevin_C	1090278	一併修升二代bug	
				//if(document.all["dlYear"].options(i).value == jf_PADL(argId_Value,3,"0"))
				if (document.all["dlYear"].options[i].value == jf_PADL(argId_Value, 3, "0"))
				{
					document.all["dlYear"].selectedIndex = i;
				}
			}
			//document.all[TargetID].value = argId_Value;
			break;
		case "txCls":
			TargetID = "txPreCls";
			break;
		case "txCase":
			TargetID = "txPreCase";
			if(jf_Trim(argId_Value) != "")
				argId_Value = jf_PADL(argId_Value,4,"0");
			document.all["txCase"].value = argId_Value;
			GetCaseName();
			break;
	}
	
	if(document.all[TargetID].value == "")
	{
		document.all[TargetID].value = argId_Value;
	}
	else
	{
		if(argId_Value == document.all[TargetID].value)
			return;
		else
			ChangeModeType(argId,TargetID);					
	}
}

//變更新增修改模式
function ChangeModeType(argId,TargetId)
{
	var Mode = document.all["txMode"].value;
	if(Mode == LayoutModeModify)
	{
		if(window.confirm("變更前述欄位將清除下方資料表,是否繼續執行?"))
		{
			document.all["TEST"].outerHTML = "<TABLE id=\"TEST\" style=\"HEIGHT: 1px\" cellSpacing=\"0\" cellPadding=\"0\" width=\"91%\" border=\"0\"></TABLE>";
			//[問題單] Charles (台科大)確定清除，則將此次輸入的值存入對應的預存欄位 0960704
			document.all[TargetId].value = document.all[argId].value;
			document.all["txCallBack_id"].value = "";
			document.all.txCase.value="";
			document.all.lbCaseName.value="";
			Page_BlockSubmit = true;
		    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			IsServerHandling = true;
			__doPostBack("btChangeMode","");
		}
		else
		{
			document.all[argId].value = document.all[TargetId].value;
			if(argId=="txYear")
			{
				var argId_Value =jf_PADL(document.all[argId].value,3,"0");
				for(var i=0;i<document.all["dlYear"].options.length;i++)
				{
					//1090424	Kevin_C	1090278	一併修升二代bug	
					//if(document.all["dlYear"].options(i).value == jf_PADL(argId_Value,3,"0"))
					if (document.all["dlYear"].options[i].value == jf_PADL(argId_Value, 3, "0"))
					{
						document.all["dlYear"].selectedIndex = i;
						break;
					}
				}					
			}
			return;
		}
	}
}

//組成處理公文號
function BeforeAccess(argType)
{
	var DgSize = document.all["dg1"].rows.length;
	var isWrong = true;
	var AssembleStr = "";
	for(var i=0;i<DgSize-1;i++)
	{
		var isCheck = document.all["dg1__ctl"+(i+2)+"_cbSelect"].checked;
		if(isCheck)
		{
			if(AssembleStr != "")
				AssembleStr+=",";
			//1061027	Kevin_C	1050087	升二代
			//AssembleStr += document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText;
			AssembleStr += document.all["dg1__ctl"+(i+2)+"_hlDocNo"].textContent;
		}
	}
	
	if(AssembleStr != "")
	{
		document.all["txMoveList"].value = AssembleStr;
		document.all["txMoveType"].value = argType;
		isWrong = false;
	}
	else
	{
		alert("請選擇欲分併卷文號");
		isWrong = true;
	}
	
	return isWrong;
}

//記錄勾選
function cbProc(argIndex)
{
	var isCheck = document.all["dg1__ctl"+argIndex+"_cbSelect"].checked;
	var DgSize = document.all["dg1"].rows.length;
	//alert(argIndex+","+isCheck+",length:"+DgSize);
	//1061027	Kevin_C	1050087	升二代 -S
	//var ComNo = document.all["dg1__ctl"+argIndex+"_lbComNo"].innerText;
	//var ComStatus = document.all["dg1__ctl"+argIndex+"_lbComStatus"].innerText;
	var ComNo = document.all["dg1__ctl"+argIndex+"_lbComNo"].textContent;
	var ComStatus = document.all["dg1__ctl"+argIndex+"_lbComStatus"].textContent;
	//1061027	Kevin_C	1050087	升二代 -E
	var allCheckCnt = 0;
	for(var i=0;i<DgSize-1;i++)
	{
		//1061027	Kevin_C	1050087	升二代 -S
		//var Compare_ComNo = document.all["dg1__ctl"+(i+2)+"_lbComNo"].innerText;
		//var Compare_Status = document.all["dg1__ctl"+(i+2)+"_lbComStatus"].innerText;
		//var DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText;
		var Compare_ComNo = document.all["dg1__ctl"+(i+2)+"_lbComNo"].textContent;
		var Compare_Status = document.all["dg1__ctl"+(i+2)+"_lbComStatus"].textContent;
		var DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].textContent;
		//1061027	Kevin_C	1050087	升二代 -E
		if(jf_Trim(ComNo) == jf_Trim(Compare_ComNo) && jf_Trim(ComNo) != "")
		{
			//if(Compare_Status == ComStatus && Compare_Status != "0" && ComStatus != "0")
				document.all["dg1__ctl"+(i+2)+"_cbSelect"].checked = isCheck;
				
				
				
				/*if(jf_Trim(Compare_ComNo) != jf_Trim(DocNo))
					document.all["dg1__ctl"+(i+2)+"_cbSelect"].disabled = isCheck;*/
		}
		/*if(!isCheck)
			document.all["dg1__ctl1_cbHead"].checked = isCheck;*/
		if(document.all["dg1__ctl"+(i+2)+"_cbSelect"].checked)
			allCheckCnt++;
	}
	if(allCheckCnt == DgSize-1)
		document.all["dg1__ctl1_cbHead"].checked = true;
	else
		document.all["dg1__ctl1_cbHead"].checked = false;
	
	var iCnt = 0;
	for(var i=0;i<DgSize-1;i++)
	{
		var isCheck = document.all["dg1__ctl"+(i+2)+"_cbSelect"].checked;
		if(isCheck)
		{
			//2008.09.22 Modify by Cola 因應hlDocNo可能不僅僅顯示DOC_NO，因此必需額外判斷 -- start --
			//1061027	Kevin_C	1050087	升二代
			//var DocNo_Index = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText.indexOf("(");
			var DocNo_Index = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].textContent.indexOf("(");
			var DocNo = "";			
			if (DocNo_Index == -1)
				//1061027	Kevin_C	1050087	升二代
				//DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText;
				DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].textContent;
			else
				//1061027	Kevin_C	1050087	升二代
				//DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText.substring(0,DocNo_Index);
				DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].textContent.substring(0,DocNo_Index);
			//var DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText;
			//Cola -- end --
			//1061027	Kevin_C	1050087	升二代
			//var ComNo_N = document.all["dg1__ctl"+(i+2)+"_lbComNo"].innerText;
			var ComNo_N = document.all["dg1__ctl"+(i+2)+"_lbComNo"].textContent;
			
			if(jf_Trim(ComNo_N) == "")
				iCnt++;
			else
			{
				if(jf_Trim(ComNo_N) == jf_Trim(DocNo))
					iCnt++;
			}
		}
	}
	
	buttonCtrl(iCnt);
	
	var iSeq = 0;
	//1061027	Kevin_C	1050087	升二代
	//var old_Seq = document.all["dg1__ctl2_lbSeq"].innerText;
	var old_Seq = document.all["dg1__ctl2_lbSeq"].textContent;
	for(var i=1;i<DgSize-1;i++)
	{		
		//1061027	Kevin_C	1050087	升二代
		//var new_Seq = document.all["dg1__ctl"+(i+2)+"_lbSeq"].innerText;
		var new_Seq = document.all["dg1__ctl"+(i+2)+"_lbSeq"].textContent;
		if(jf_Trim(new_Seq) != jf_Trim(old_Seq))
			iSeq++;
		old_Seq	= new_Seq;
	}
	
	ShowDgDetail(iSeq+1,iCnt);
	//ShowDgDetail(DgSize-1,iCnt);
}

function buttonCtrl(index)
{
	var VolArr = document.all["txVolArr"].value;
	var vol = VolArr.split(';');
	
	if(index != 0)
	{
		//移置上一卷控制
		if(document.all["txBegVol"].value == "1")
			document.all["btMoveUp"].disabled = true;
		else
			document.all["btMoveUp"].disabled = false;
	/*
		//移至下一卷控制
		if(vol.length == parseInt(document.all["txBegVol"].value,10))
			document.all["btMoveNext"].disabled = true;
		else
			document.all["btMoveNext"].disabled = false;
	*/
		//96.03.12 960054 David 修改移至下一卷功能		
		document.all["btMoveNext"].disabled = false;
		
		//96.03.12 960054 David	記錄Post回Server後應採用何種模式
		//1:採AKM330方式自動編卷;2:最後一卷再新增一卷
		if(vol.length == parseInt(document.all["txBegVol"].value,10))
			document.all["txBtNextVol"].value = "2";
		else
			document.all["txBtNextVol"].value = "1";
	}
	else
	{
		document.all["btMoveUp"].disabled = true;
		document.all["btMoveNext"].disabled = true;
		
		//96.03.12 960054 David 取消勾選則將模式欄位清空
		document.all["txBtNextVol"].value = "";
	}
}

//顯示選取明細
function ShowDgDetail(argDgSize,argCheckCnt)
{
	var Mode = document.all["txMode"].value;
	if(Mode == LayoutModeModify)
		//1061027	Kevin_C	1050087	升二代
		//document.all["lbSelectSeqCnt"].innerText = "本卷共"+argDgSize+"目，已選取"+argCheckCnt+"目";
		document.all["lbSelectSeqCnt"].textContent = "本卷共"+argDgSize+"目，已選取"+argCheckCnt+"目";
}

function SyncYear()
{
	var Index = document.all["dlYear"].selectedIndex;
	//1090424	Kevin_C	1090278	一併修升二代bug	
	//var Value = document.all["dlYear"].options(Index).value;
	var Value = document.all["dlYear"].options[Index].value;
	document.all["txYear"].value = Value;
	//1061027	Kevin_C	1050087	升二代
	//document.all["txCls"].focus();
	$('#txCls').focus();
	
	ChangeModeType("txYear","txPreYear");
}

function BringOutEAT220C1(argComNo)
{
	Page_BlockSubmit = true;
	var ServerName = document.all["txServerName"].value;
	var pUrl = "EAT220C1.aspx?Com_No=" + argComNo;
	//alert(pUrl);
	jf_OpenChildWin_ForEAT220(pUrl, "EAT220C1", 900, 480);
}

function dlYearOnblur()
{
	var Index = document.all["dlYear"].selectedIndex;
	//1090424	Kevin_C	1090278	一併修升二代bug	
	//var value = document.all["dlYear"].options(Index).value;
	var value = document.all["dlYear"].options[Index].value;
	document.all["txYear"].value = value;
}

function InitCheckBox()
{
	var DgSize = document.all["dg1"].rows.length;
	for(var i=0;i<DgSize-1;i++)
	{
		document.all["dg1__ctl"+(i+2)+"_cbSelect"].disabled = false;
	}
}

//DG中若併案文號與公文文號不同則使勾選項Disable
function dgComtype()
{
	var DgSize = document.all["dg1"].rows.length;
	for(var i=0;i<DgSize-1;i++)
	{
		//1061027	Kevin_C	1050087	升二代 -S
		//var DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText;
		//var ComNo = document.all["dg1__ctl"+(i+2)+"_lbComNo"].innerText;
		var DocNo = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].textContent;
		var ComNo = document.all["dg1__ctl"+(i+2)+"_lbComNo"].textContent;
		//1061027	Kevin_C	1050087	升二代 -E
		if(jf_Trim(ComNo) != "")
		{
			/*
			if(jf_Trim(DocNo) != jf_Trim(ComNo))
				document.all["dg1__ctl"+(i+2)+"_cbSelect"].disabled = true;
			else
				document.all["dg1__ctl"+(i+2)+"_cbSelect"].disabled = false;
			*/
			var s1=new String(DocNo);
			var s2=new String(ComNo);
			if(s1.indexOf(s2)==-1)
				document.all["dg1__ctl"+(i+2)+"_cbSelect"].disabled = true;
			else
				document.all["dg1__ctl"+(i+2)+"_cbSelect"].disabled = false;
		}
	}
}

////////////////////////////////////////////////////////////////
//
//以下為點選行列變色功能
//
////////////////////////////////////////////////////////////////

function RowLight()
{	
	var len = document.all["dg1"].rows.length;
	
	//Charles (台科大)每個資料列的onclick時觸發事件改由CS中設定 0960705
	/*for (i = 1; i < len ; i++)
	{
		document.all["dg1"].rows(i).attachEvent("onclick",fnMouseClickRow);
	}*/
	
	//96.03.13 960061 David 第幾行欲被點亮
	var PreLight_RowIndex = document.all["txCallBack_id"].value;
	if(PreLight_RowIndex != "")
		fn_RowLight_Custom(PreLight_RowIndex);
}

//設定觸發事件
function fnMouseClickRow()
{
	var e = window.event.srcElement;
	var ActiveID = e.id;

	//Charles (台科大)因為TD沒有id，所以就要再往上一層取得TR的id 0960705
	if(ActiveID == "")
		ActiveID = e.parentElement.id;

	//96.03.13 960061 David 紀錄第幾行被點亮
	fn_RecLightIndex(ActiveID);
	
	//AssignDgColor();
	
	while (true)
	{
		if (e.tagName == "TR")
		{
			var tempColor = e.style.background;
			AssignDgColor();
			
			if(tempColor != "yellow")
			{
				e.style.background = "yellow";
			}
			break;
		}
		e = e.parentElement;
	}
}

//96.03.13 960061 David 紀錄第幾行被點亮
function fn_RecLightIndex(argID)
{
	var preIndex = document.all["txCallBack_id"].value;
	var part1 = argID.split('_');
	var part2;
	
	if(part1.length != 1 && part1[0] != "")
		part2 = part1[2].split('ctl');
	
	if(part2)
	{
		//當長度大於2才進行記錄行為
		if(part2.length >= 2)
		{
			var ActiveIndex = part2[1];
	
			/*if(ActiveIndex == preIndex)
				document.all["txCallBack_id"].value = "";
			else*/
				document.all["txCallBack_id"].value = ActiveIndex;
		}
	}
}

//96.03.13 960061 David 改寫fnMouseClickRow
//傳入參數→第幾行欲被點亮
function fn_RowLight_Custom(argIndex)
{
	//[問題單] Charles (台科大)移動捲軸到所點選的資料列 0960705
	var obj = document.all["dg1__ctl"+argIndex];
	var tempColor = obj.background;
	AssignDgColor();
	
	if(tempColor != "yellow")
		obj.style.background = "yellow";

	//obj.scrollIntoView(true);
	var focusobj = obj;
	if(argIndex > 5)
	{	
		focusobj = document.all["dg1__ctl"+(argIndex-2)+"_lbSeq"];
		focusobj.scrollIntoView(true);
	}
	
	/*var obj = document.all["dg1__ctl"+argIndex+"_lbSeq"];
	
	while (true)
	{
		if (obj.tagName == "TR")
		{
			var tempColor = obj.background;
			AssignDgColor();
			
			if(tempColor != "yellow")
			{
				obj.style.background = "yellow";
			}
			break;
		}
		obj = obj.parentElement;
	}*/
}

//刷新DG畫面顏色
function AssignDgColor()
{
	var len = document.all["dg1"].rows.length;
	for(var i=1;i<len;i++)
	{
		if(i%2 != 0)
		{
			//1091203		Cloud	1090891	修改路徑弱點-升級二代調整線上瀏覽方式
			//document.all["dg1"].rows(i).style.background = "White";
			document.all["dg1"].rows[i].style.background = "White";
		}
		else
		{
			//document.all["dg1"].rows(i).style.background = "#EEFFDD";
			//1091203		Cloud	1090891	修改路徑弱點-升級二代調整線上瀏覽方式
			//document.all["dg1"].rows(i).style.background = "#91D062";
			document.all["dg1"].rows[i].style.background = "#91D062";
		}
	}
}

//Onblur取得案名
function GetCaseName()
{
	var Year = document.all["txYear"].value;
	var Cls = document.all["txCls"].value;
	var Case = document.all["txCase"].value;
	var OrgNo = document.all["txOrgNo"].value;
	
	
	var param = new Array(4);
	
	param[1] = Year;
	param[2] = Cls;
	param[3] = Case;
	param[0] = OrgNo;
	
	var callObj = jf_CallWS("EAT220WS.asmx","GetCaseName",false,param);

	//1061027	Kevin_C	1050087	升二代
	//lbCaseName.innerText = callObj.value;	
	lbCaseName.textContent = callObj.value;	
}

//帶出流程資訊
function BringOutODI260(argDocNo)
{
	Page_BlockSubmit = true;
	var ServerName = document.all["txServerName"].value;
	var UserId = document.all["txAcc"].value;
	var Artifact = document.all["SsoArtifact"].value;
	var OrgNo = document.all["txOrgNo"].value;
	var pUrl = "http:\\\\" + ServerName + "\\ODDEP\\ODI260.aspx?SAMLart=" + Artifact + "&pDocNo=" + argDocNo + "&ACC=" + UserId + "&SOURCE_ORGNO=" + OrgNo;
    //1031120   Kenny   [1030836]   配合SSL調整使用的網址協定
	if (document.all.II_USE_SSL != null) {
	    if (document.all.II_USE_SSL.value == "Y")
	        pUrl = pUrl.replace("http:\\", "https:\\");
	}
	jf_OpenChildWin_ForEAT220(pUrl, "ODI260", 900, 768);
	
}

//96.03.09 960059 David 開啟前檢核
function CheckBeforeOpen()
{
	var ClsNo = jf_Trim(document.all["txCls"].value);
	//0960417 Jeff  960100   自動立案功能 -- 檢核必須輸入年度號及分類號
	var YearNo = jf_Trim(document.all["txYear"].value);
	
	var ErrMsg = "";
	if (YearNo == "");
	{
	   ErrMsgg = "年度號";
	}
	
	if(ClsNo == "")
	{
	   if (ErrMsg=="")
	      ErrMsg += "分類號";
	   else
   		ErrMsg += "及分類號";
	}
	
	if (ErrMsg != "")
	{
	   ErrMsg += "不可為空白";
	}
	//0960417 Jeff  960100   自動立案功能 End
	

	if(ErrMsg != "")
	{
		alert(ErrMsg);
		return true;
	}
	return false;
}

//96.03.13 960060 David 檢察並刷新畫面上的捲軸顯示
function fn_ScrollbarCtl()
{
	document.all["Test1"].scroll = "no";
	var Availible_W = screen.availWidth;	//Window 可取得最大寬度
	var Client_W = top.document.body.offsetWidth;	//用戶目前視窗寬度

	if(Availible_W == Client_W)
		document.all["Test1"].scroll = "no";
	else
		document.all["Test1"].scroll = "yes";
}

function fn_ScrollbarCtl2()
{

	var Availible_W = screen.availWidth;	//Window 可取得最大寬度
	var Client_W = top.document.body.offsetWidth;	//用戶目前視窗寬度

	if(Availible_W == Client_W)
		document.all["Test1"].scroll = "no";
	else
		document.all["Test1"].scroll = "auto";
}


//欄位不可輸入中文字 fn_CheckInputText(物件id,欄位的中文名字)
function fn_CheckInputText(argId,argName)
{
	var texObj = eval("document.all."+argId);
	for(var i = 0 ; i < texObj.value.length ;i++)  //以迴圈方式一個字一個字的檢查
	{
		var ch = texObj.value.substring(i,i+1)
		if(escape(ch).length < 4)  //當不為英文數字時用escape轉出來的字串長度會大於4
		{ 
		continue;
		}
		else 
		{ 
			alert(argName+"不允許輸入中文字 !");
			texObj.focus();
			return false;
		} 
	} 
	return true;
}

//Charles (台科大)子視窗須有Scrollbar 0960531
function jf_OpenChildWin_ForEAT220(argUrl, argWinName, argWidth, argHeight)
{
	if(argWinName != "")
	{
		for(var i=0; i<arrWin.length; i++)
		{
			if(arrWin[i][0] == argWinName)
			{
				if(arrWin[i][1].closed)
					arrWin[i][0] = "";
				else
					arrWin[i][1].close();
			}
		}
	}
	
	var strWinStyle, strTop, strLeft;
	strWinStyle = "fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes,scrollbars=yes";
	if ( (argWidth != "") || (argWidth != "0") )
	{
	   strWinStyle = strWinStyle + ",width="+argWidth;		
	   strLeft = (screen.width-argWidth)/2;
	   strWinStyle = strWinStyle + ", left="+strLeft;
	}
	if ( (argHeight != "") || (argHeight != "0") )
	{
	   strWinStyle = strWinStyle + ",height="+argHeight;		
	   strTop = (screen.height-argHeight)/2-10;
	   strWinStyle = strWinStyle + ", top="+strTop;
	}
    //1031120   Kenny   [1030836]   配合SSL調整使用的網址協定
	if (document.all.II_USE_SSL != null) {
	    if (document.all.II_USE_SSL.value == "Y")
	        argUrl = argUrl.replace("http://", "https://");
	}

	gWindowID = window.open(argUrl, "", strWinStyle);
	gWindowID.focus();

	arrWin[arrWin.length] = new Array();
	arrWin[arrWin.length - 1][0] = argWinName;
	arrWin[arrWin.length - 1][1] = gWindowID;
	return gWindowID;
}
