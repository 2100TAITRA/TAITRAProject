/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	 單號       概要
 * -------------------------------------------------------------------------------------------------
 * 1040804	Kenny   1040606		新增支援動態加入資料及DataGrid ToolBar功能
 * 1040806	Kenny   1040606		紀錄被刪除資料的index
 * 1051004	Kenny   1050313		調整叫用CheckCaseMain檢核案次號時增加傳入版本別參數
 * 1060215	Joe		1050087		二代系統升級
 * 1060925	Joe		1060867		修正因升級呼叫WEBWERVICE方法不同導致分類號檢核有誤
 * 1080528	Kevin_C	 1080359	客委會增加匯出EXCEL功能
 * 1110318	Zen		1101550		(考試院)新增客製化另存附件清單
 * 1110722	Joe		1110097		修正欄位名稱
 * 1140508	Andy	1140210		新增查詢條件，新增退輔會客製化報表，檢核失敗時取消postback
 * 1140829  Daniel  1141137		(外貿)修改案次號欄位與呈現畫面以符合外貿協會現行檔號邏輯
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;
//1140508 Andy 1140210 新增查詢條件-點收日期核理性檢核
var alertTitle = "您輸入之資料有誤，明細如下，請更正後重試";

	//1060215	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1040804   Kenny   [1040606]   新增DataGrid 全選、反選、清除選取、刪除選取功能
//1060215	Joe	1050087	二代系統升級
// if (document.all.dg1)
    // document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//指定DataGrid欄位
var strTableFields = new Array("_lbDocNo", "_lbFileNo", "_lbRemark", "_lbAttLocation");

function ShowMsg()
{
	//1060215	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	
}

//1060215	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060215	Joe	1050087	二代系統升級
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1040804   Kenny   [1040606]   新增支援動態加入資料--Start--
	switch (xObjectName)
	{
	    case "btAddRemark": //依照儲位條碼號加入
	        //檢核儲位條碼號不可空白
	        if (jf_Trim(document.all["txRemarkS"].value) == "" && jf_Trim(document.all["txRemarkE"].value) == "")
		    {
				//1110722	Joe		1110097		修正欄位名稱
	            // alert("請輸入儲位條碼號");
	            alert("請輸入另存附件條碼號");
				//1060215	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txRemarkS"].focus();
				$('#txRemarkS').focus();
			    Page_BlockSubmit=true;
		    }
		    else
		    {
			    Page_BlockSubmit = false;				
				//1060215	Joe	1050087	二代系統升級--S
			    IsServerHandling = true;
				__doPostBack(xObjectName, event.flatIndex);			
				//1060215	Joe	1050087	二代系統升級--E
		    }
		    break;
	    case "btAddDocNo": //依照公文文號加入
	        //檢核公文文號不可空白
	        if (jf_Trim(document.all["txDocNoS"].value) == "" && jf_Trim(document.all["txDocNoE"].value) == "")
	        {
	            alert("請輸入公文文號");
				//1060215	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txDocNoS"].focus();
				$('#txDocNoS').focus();
	            Page_BlockSubmit = true;
	        }
	        else
	        {
	            Page_BlockSubmit = false;
				//1060215	Joe	1050087	二代系統升級--S
			    IsServerHandling = true;
				__doPostBack(xObjectName, event.flatIndex);		
				//1060215	Joe	1050087	二代系統升級--E
	        }
	        break;
	    case "btAddFileNo": //依照檔號加入
	        //檢核檔號
	        if (jf_Trim(document.all["txFileYearS"].value) == "" && jf_Trim(document.all["txFileClsS"].value) == "" && jf_Trim(document.all["txFileCaseS"].value) == ""
                && jf_Trim(document.all["txFileVolS"].value) == "" && jf_Trim(document.all["txFileSeqS"].value) == "" && jf_Trim(document.all["txFileYearE"].value) == ""
                && jf_Trim(document.all["txFileClsE"].value) == "" && jf_Trim(document.all["txFileCaseE"].value) == "" && jf_Trim(document.all["txFileVolE"].value) == ""
                && jf_Trim(document.all["txFileSeqE"].value) == "") {
                alert("請輸入檔號");
				//1060215	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txFileYearS"].focus();
				$('#txFileYearS').focus();
	            Page_BlockSubmit = true;
	        }
	        else
	        {
                //1051004   Kenny   [1050313]   增加檢核版別是否有輸入
                if( jf_Trim(document.all["txVerNo"].value) == "" )
                {
                    alert("請輸入版本別");
					//1060215	Joe	1050087	二代系統升級，調整focus寫法
					//document.all["txVerNo"].focus();
					$('#txVerNo').focus();
                    Page_BlockSubmit = true;
                }
                else
                {
                    SetFileNo();
                    Page_BlockSubmit = false;
					//1060215	Joe	1050087	二代系統升級--S
					IsServerHandling = true;
					__doPostBack(xObjectName, event.flatIndex);			
					//1060215	Joe	1050087	二代系統升級--E
                }
	        }
	        break;
	}
    //1040804   Kenny   [1040606]   新增支援動態加入資料--End--
}

//1060215	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060215	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060215	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060215	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060215	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060215	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			break;
	    case "btSearch":
	        //1040804   Kenny   [1040606]   將搜索功能鍵檢核功能獨立--Start--
	        if ((jf_Trim(document.all.txRemarkS.value) == "")
                 && (jf_Trim(document.all.txRemarkE.value) == "") && (jf_Trim(document.all.txFileYearS.value) == "")
				//1140508 Andy 1140210 新增查詢條件-更新查詢前檢核條件
                //&& (jf_Trim(document.all.txFileYearE.value) == "") && (jf_Trim(document.all.txDocNoS.value) == "") && (jf_Trim(document.all.txDocNoE.value) == "")) {
				&& (jf_Trim(document.all.txFileYearE.value) == "") && (jf_Trim(document.all.txDocNoS.value) == "") && (jf_Trim(document.all.txDocNoE.value) == "")
				&& (jf_Trim(document.all.txDATES.value) == "") && (jf_Trim(document.all.txDATEE.value) == ""))	{
				//1110722	Joe		1110097		修正欄位名稱
	            // alert('儲位條碼號、公文文號、檔號至少需輸入一項');
				//1140508 Andy 1140210 新增查詢條件-更新查詢前檢核條件
				//alert('另存附件條碼號、公文文號、檔號至少需輸入一項');
	            alert('另存附件條碼號、公文文號、檔號、點收日期至少需輸入一項');
				//1060215	Joe	1050087	二代系統升級，調整focus寫法
				//document.all.txRemarkS.focus();
				$('#' + txRemarkS.id).focus();
				//1140512	Andy	1140210	檢核失敗時，取消postback
				Page_BlockSubmit = true
	            return;
	        }
			if ((jf_Trim(document.all.txFileYearS.value) != "") || (jf_Trim(document.all.txFileYearE.value) != "")) {
				//1140829  Daniel  1141137(外貿)用國別、處別、細目別取代案次號，並將值塞入原來的案次號欄位以進行檢核
				if (document.all['HtxOrgNickName'].value == 'TAITRA') {
					if (txCountryNoS.value + txDivisionNoS.value + txProductNoS.value + txFileVolS.value + txFileSeqS.value != "")//若分類號後任一欄位有值，則以(國別)(處別)(細目號/產品別)組成值
						txFileCaseS.value = txCountryNoS.value + '-' + txDivisionNoS.value + '-' + txProductNoS.value;
					else//若分類號後欄位皆無值則案次號(國別處別細目號)為空
						txFileCaseS.value = "";
					if (txCountryNoE.value + txDivisionNoE.value + txProductNoE.value + txFileVolE.value + txFileSeqE.value != "")//若分類號後任一欄位有值，則以(國別)(處別)(細目號/產品別)組成值
						txFileCaseE.value = txCountryNoE.value + '-' + txDivisionNoE.value + '-' + txProductNoE.value;
					else//若分類號後欄位皆無值則案次號(國別處別細目號)為空
						txFileCaseE.value = "";
				}
	            if (!CheckFileNo("txFileYearS", "txFileClsS", "txFileCaseS", "txFileVolS", "txFileSeqS")) {
	                Page_BlockSubmit = true;
	                return;
	            }
	            if (!CheckFileNo("txFileYearE", "txFileClsE", "txFileCaseE", "txFileVolE", "txFileSeqE")) {
	                Page_BlockSubmit = true;
	                return;
	            }
	            if (!CheckFileNoMatch("txFileYearS", "txFileClsS", "txFileCaseS", "txFileVolS", "txFileSeqS", "txFileYearE", "txFileClsE", "txFileCaseE", "txFileVolE", "txFileSeqE")) {
	                Page_BlockSubmit = true;
	                return;
	            }
	        }
			//1140508 Andy 1140210 新增查詢條件-檢核點收日期正確性
			Check_Date_Seq();
	        SetFileNo();
	        Page_BlockSubmit = false;
			//1060215	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
	        break;
	        //1040804   Kenny   [1040606]   將搜索功能鍵檢核功能獨立--End--
	    case "btPrint":
	    case "btPreview":
		case "btPreviewAttTag":
		//1140508 Andy 1140210 新增客製化報表-增加匯出ODS功能
		case "btODS":
		//1080528	Kevin_C	1080359	客委會增加匯出EXCEL功能
		case "btExcel":
		//1110318 Zen 1101550 (考試院)新增客製化另存附件清單
		case "btPreviewDetail":
			//1040804   Kenny   [1040606]   新增檢核文號是否勾選功能並增加if/else判斷式(原程式行為置於else)：
            //若已顯示DataGrid(已查詢或已動態加入資料)，不檢核畫面是否輸入查詢條件
	        if (document.all.H_txShowDg.value == "1")
	        {
	            if (!CheckSelect())
                {
	                Page_BlockSubmit = true;
	                return;
	            }
	            Page_BlockSubmit = false;
			//1060215	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
	            break;
	        }
	        else
	        {
	            if ((jf_Trim(document.all.txRemarkS.value) == "")
                 && (jf_Trim(document.all.txRemarkE.value) == "") && (jf_Trim(document.all.txFileYearS.value) == "")
				 //1140508 Andy 1140210 新增查詢條件-更新查詢前檢核條件
				 //&& (jf_Trim(document.all.txFileYearE.value) == "") && (jf_Trim(document.all.txDocNoS.value) == "") && (jf_Trim(document.all.txDocNoE.value) == "")) {
				 && (jf_Trim(document.all.txFileYearE.value) == "") && (jf_Trim(document.all.txDocNoS.value) == "") && (jf_Trim(document.all.txDocNoE.value) == "")
				 && (jf_Trim(document.all.txDATES.value) == "") && (jf_Trim(document.all.txDATEE.value) == "")) {
					 //1110722	Joe		1110097		修正欄位名稱
	                // alert('儲位條碼號、公文文號、檔號至少需輸入一項');
					//1140508 Andy 1140210 新增查詢條件-更新查詢前檢核條件
	                //alert('另存附件條碼號、公文文號、檔號至少需輸入一項');
					alert('另存附件條碼號、公文文號、檔號、點收日期至少需輸入一項');
					//1060215	Joe	1050087	二代系統升級，調整focus寫法
					//document.all.txRemarkS.focus();
					$('#' + txRemarkS.id).focus();
					//1140512	Andy	1140210	檢核失敗時，取消postback
					Page_BlockSubmit = true
	                return;
	            }
	            if ((jf_Trim(document.all.txFileYearS.value) != "") || (jf_Trim(document.all.txFileYearE.value) != "")) {
	                if (!CheckFileNo("txFileYearS", "txFileClsS", "txFileCaseS", "txFileVolS", "txFileSeqS")) {
	                    Page_BlockSubmit = true;
	                    return;
	                }
	                if (!CheckFileNo("txFileYearE", "txFileClsE", "txFileCaseE", "txFileVolE", "txFileSeqE")) {
	                    Page_BlockSubmit = true;
	                    return;
	                }
	                if (!CheckFileNoMatch("txFileYearS", "txFileClsS", "txFileCaseS", "txFileVolS", "txFileSeqS", "txFileYearE", "txFileClsE", "txFileCaseE", "txFileVolE", "txFileSeqE")) {
	                    Page_BlockSubmit = true;
	                    return;
	                }
	            }
				//1140508 Andy 1140210 新增查詢條件-檢核點收日期正確性
				Check_Date_Seq();
	            //1040804   Kenny   [1040606]   增加當檔號只有起值或訖值時處理
	            SetFileNo();
	            Page_BlockSubmit = false;
				//1060215	Joe	1050087	二代系統升級
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
	            break;
	        }
		//1040804   Kenny   [1040606]   新增DataGrid 全選、反選、清除選取、刪除選取功能
		//以下屬於DataGrid ToolBar
	    case "btSelectAll":
	        Page_BlockSubmit = true;
	        SelectAll("dg1", "_cbSelect");
	        break;
	    case "btSelectInverse":
	        Page_BlockSubmit = true;
	        SelectInverse("dg1", "_cbSelect");
	        break;
	    case "btSelectClear":
	        Page_BlockSubmit = true;
	        SelectClear("dg1", "_cbSelect");
	        break;
	    case "btDeleteSelect":
	        Page_BlockSubmit = !DeleteSelected("dg1", "_cbSelect", strTableFields);	
			//1060215	Joe		1050087   二代系統升級，因應tbselect換型態，無法使用getItem--S		
	        //SelectBarSubmit();
			document.all.ToolBarSenderID.value = "btDeleteSelect";
			IsServerHandling = true;
			__doPostBack("tbSelect", event.flatIndex);			
			//1060215	Joe		1050087   二代系統升級，因應tbselect換型態，無法使用getItem--E
	        break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    //1051004   Kenny   [1050313]   一併移除無用CODE
	//jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,null);
	//jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
	
	//1060215	Joe		1050087   二代系統升級，修改公文文號寬度由js處理--S
	document.all.txDocNoS.style.width = document.all.H_txDocWidth.value;
	document.all.txDocNoE.style.width = document.all.H_txDocWidth.value;
	//1060215	Joe		1050087   二代系統升級，修改公文文號寬度由js處理--E
		//1140829  Daniel  1141137		(外貿)外貿目次號改為四碼
	if (document.all['HtxOrgNickName'].value == 'TAITRA') {
		txFileSeqS.setAttribute("maxlength", "4");
		txFileSeqS.style.width = "2.5em";
		txFileSeqE.setAttribute("maxlength", "4");
		txFileSeqE.style.width = "2.5em";
    }
}


function TbOnBlur(argTextBox)
{
	var xObjectName = "";
	if(document.activeElement!=null)
		xObjectName = document.activeElement.id;
		
	if ((xObjectName == "btExit") || (xObjectName == "btExitImg") || (xObjectName == "btCancelImg") || (xObjectName == "btCancel"))
		return;
	
	//年度號
	if (argTextBox=="txFileYearS")
	{
		if (document.all["txFileYearS"].value=="")
		{return;}
		else
		{
			document.all["txFileYearS"].value=jf_PADL(document.all["txFileYearS"].value,3,"0");
		}
	}
	
	//分類號
	if (argTextBox=="txFileClsS")
	{
		if (document.all["txFileClsS"].value=="")
		{
			return;
		}
		//1060925	Joe		1060867		分類號檢核修正--S
		// var KeyValue1 = new Array(1);
		// KeyValue1[0] = document.all["txFileClsS"].value;
		//1060925	Joe		1060867		分類號檢核修正--E
		var param1 = new Array(1);
		//1060925	Joe		1060867		分類號檢核修正
		// param1[0] = KeyValue1;
		param1[0] = document.all["txFileClsS"].value;
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,param1);
		iCallID_CLS = RtnObj.id;
		OnWSResult(RtnObj);
	}
	
	//案次號
	if (argTextBox=="txFileCaseS")
	{
		if (document.all["txFileCaseS"].value=="")
		{
			//document.all["txCaseName"].textContent = "";
			return;
		}
        
        //1051004   Kenny   [1050313]   增加檢核版本別是否輸入
        if ( document.all["txVerNo"].value=="" )
        {
            alert("請輸入版本別");
            document.all["txFileCaseS"].value = "" ;
			//1060215	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txVerNo"].focus();
			$('#txVerNo').focus();
            return;
        }
		
		if (document.all["txFileClsS"].value!="")
		{
            //1051004   Kenny   [1050313]   增加傳入版本別資訊
			//var param = new Array(4);
            var param = new Array(5);
			param[0] = document.all["txFileYearS"].value;
			param[1] = document.all["txFileClsS"].value;
			param[2] = document.all["txFileCaseS"].value;
			param[3] = "";
            //1051004   Kenny   [1050313]   增加傳入版本別資訊
            param[4] = document.all["txVerNo"].value;
			
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
			iCallID_CASE = RtnObj.id;
			OnWSResult(RtnObj);
		}
	}
	
	//卷次號
	if (argTextBox=="txFileVolS")
	{
		if (document.all["txFileVolS"].value=="")
		{return;}
		else
		{
			document.all["txFileVolS"].value=jf_PADL(document.all["txFileVolS"].value,4,'0');
		}
	}
	
	//目次號
	if (argTextBox=="txFileSeqS")
	{
		if (document.all["txFileSeqS"].value=="")
		{return;}
		else
		{
			document.all["txFileSeqS"].value=jf_PADL(document.all["txFileSeqS"].value,3,'0');
		}
	}

	//起始位址
	if (argTextBox=="txStartPos")
	{
		if (document.all["txStartPos"].value=="")
		{
			document.all["txStartPos"].value = "1";
		}
		else if (document.all["txStartPos"].value!="1" && document.all["txStartPos"].value!="2" && document.all["txStartPos"].value!="3" && document.all["txStartPos"].value!="4")
		{
			document.all["txStartPos"].value = "1";
		}
	}
	//1140829  Daniel  1141137	(外貿)以國別、處別、細目號/產品別欄位取代案次號
	if (argTextBox == "txCountryNoS" || argTextBox == "txDivisionNoS" || argTextBox == "txProductNoS") {
		var strTarget = document.all[argTextBox].value;
		if (strTarget != "") {
			if (strTarget.length < 3) {
				if (argTextBox == "txDivisionNoS")
					strTarget = jf_PADL(strTarget, 3, '0');
				else
					strTarget = jf_PADR(strTarget, 3, '0');
				document.all[argTextBox].value = strTarget;
			}
		}
	}
}

function TbOnBlur2(argTextBox)
{
	var xObjectName = "";
	if(document.activeElement!=null)
		xObjectName = document.activeElement.id;
		
	if ((xObjectName == "btExit") || (xObjectName == "btExitImg") || (xObjectName == "btCancelImg") || (xObjectName == "btCancel"))
		return;

	//年度號
	if (argTextBox=="txFileYearE")
	{
		if (document.all["txFileYearE"].value=="")
		{return;}
		else
		{
			document.all["txFileYearE"].value=jf_PADL(document.all["txFileYearE"].value,3,"0");
		}
	}
	
	//分類號
	if (argTextBox=="txFileClsE")
	{
		if (document.all["txFileClsE"].value=="")
		{
			return;
		}
		var KeyValue1 = new Array(1);
		//1060925	Joe		1060867		分類號檢核修正
		// KeyValue1[0] = document.all["txFileClsE"].value;
		var param1 = new Array(1);
		//1060925	Joe		1060867		分類號檢核修正
		// param1[0] = KeyValue1;
		param1[0] = document.all["txFileClsE"].value;
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,param1);
		iCallID_CLS2 = RtnObj.id;
		OnWSResult(RtnObj);
	}
	
	//案次號
	if (argTextBox=="txFileCaseE")
	{
		if (document.all["txFileCaseE"].value=="")
		{
			return;
		}
        
        //1051004   Kenny   [1050313]   增加檢核版本別是否輸入
        if ( document.all["txVerNo"].value=="" )
        {
            alert("請輸入版本別");
            document.all["txFileClsE"].value = "" ;
			//1060215	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txVerNo"].focus();
			$('#txVerNo').focus();
            return;
        }
		
		if (document.all["txFileClsE"].value!="")
		{
			//1051004   Kenny   [1050313]   增加傳入版本別資訊
			//var param = new Array(4);
            var param = new Array(5);
			param[0] = document.all["txFileYearE"].value;
			param[1] = document.all["txFileClsE"].value;
			param[2] = document.all["txFileCaseE"].value;
			param[3] = "";
            //1051004   Kenny   [1050313]   增加傳入版本別資訊
            param[4] = document.all["txVerNo"].value;
			
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
			iCallID_CASE2 = RtnObj.id;
			OnWSResult(RtnObj);
		}
	}
	
	//卷次號
	if (argTextBox=="txFileVolE")
	{
		if (document.all["txFileVolE"].value=="")
		{return;}
		else
		{
			document.all["txFileVolE"].value=jf_PADL(document.all["txFileVolE"].value,4,'0');
		}
	}
	
	//目次號
	if (argTextBox=="txFileSeqE")
	{
		if (document.all["txFileSeqE"].value=="")
		{return;}
		else
		{
			document.all["txFileSeqE"].value=jf_PADL(document.all["txFileSeqE"].value,3,'0');
		}
	}
	//1140829  Daniel  1141137	(外貿)以國別、處別、細目號/產品別欄位取代案次號
	if (argTextBox == "txCountryNoE" || argTextBox == "txDivisionNoE" || argTextBox == "txProductNoE")
	{
		var strTarget = document.all[argTextBox].value;
		if (strTarget != "") {
			if (strTarget.length < 3) {
				if (argTextBox == "txDivisionNoE")
					strTarget = jf_PADL(strTarget, 3, '0');
				else
					strTarget = jf_PADR(strTarget, 3, '0');
				document.all[argTextBox].value = strTarget;
			}
		}
	}


}

//1140508 Andy 1140210 新增查詢條件-點收日期起迄合理檢核
function Check_DATE(argid, focus_obj) {
	{
		var obj = document.all[argid];
		if (obj.value != "")
			obj.value = jf_PADL(obj.value, 7, "0");
		else
			return;
		if (!jf_CheckCDATE(obj.value)) {
			jf_ShowMeg("輸入的日期不合法,請重新輸入", alertTitle);
			obj.focus();
			Page_BlockSubmit = true;
		}
		else {
			if (focus_obj != null) {
				focus_obj.focus();
			}
		}
	}
}
//1140508 Andy 1140210 新增查詢條件-點收日期起迄合理檢核
function Check_Date_Seq(){
	var strS = jf_Trim(document.all.txDATES.value);
	var strE = jf_Trim(document.all.txDATEE.value);
	if (strS != "" && strE == "")
		document.all.txDATEE.value = strS;
	else if (strS == "" && strE != "")
		document.all.txDATES.value = strE;
	else if (strS > strE) {
		document.all.txDATES.value = strE;
		document.all.txDATEE.value = strS;
	}
}

var iCallID_CLS ;
var iCallID_CLS2 ;
var iCallID_CASE ;
var iCallID_CASE2 ;
function OnWSResult(argResult)
{
    var WSResult;
	var ErrMsg = "";

    if(argResult.id == iCallID_CLS)  //分類號 onblur
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			document.all["htxClsKey"].value = WSResult.CLS_KEY;
		}
		else
		{
			//1060215	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txFileClsS"].focus();
			$('#txFileClsS').focus();
		}
    }

    if(argResult.id == iCallID_CASE) //案次號 onblur
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length!=0)  //有err
			{
				alert("輸入的案次號不存在!!")
				//1060215	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txFileCaseS"].focus();
				$('#txFileCaseS').focus();
			}
			else
			{
				//帶出案名
				document.all.htxCaseKey.value = WSResult.Key;
			}
		}
    }
    
    if(argResult.id == iCallID_CLS2)  //分類號 onblur
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			document.all["htxClsKey2"].value = WSResult.CLS_KEY;
		}
		else
		{
			//1060215	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txFileClsE"].focus();
			$('#txFileClsE').focus();
		}
    }

    if(argResult.id == iCallID_CASE2) //案次號 onblur
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true)
		{
			if (WSResult.ErrorClass.ErrMessage.length!=0)  //有err
			{
				alert("輸入的案次號不存在!!")
				//1060215	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txFileCaseE"].focus();
				$('#txFileCaseE').focus();
			}
			else
			{
				//帶出案名
				document.all.htxCaseKey2.value = WSResult.Key;
			}
		}
    }
        
    argResult = null;
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].textContent = obj.value;
}

//1040804   Kenny   [1040606]   新增DataGrid 全選、反選、清除選取、刪除選取功能--Start--
//全選
function SelectAll(argTableName, argCheckBoxName) {
    var i, j;

    if (document.all[argTableName] == null)
        return;

    var len = document.all[argTableName].rows.length + 1;
    for (i = 2; i < len; i++) {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (!obj.checked)
            obj.checked = true;
    }
}

//反選
function SelectInverse(argTableName, argCheckBoxName) {
    var i, j;

    if (document.all[argTableName] == null)
        return;

    var len = document.all[argTableName].rows.length + 1;
    for (i = 2; i < len; i++) {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.checked)
            obj.checked = false;
        else
            obj.checked = true;
    }
}

//清除選取
function SelectClear(argTableName, argCheckBoxName) {
    var i, j;

    if (document.all[argTableName] == null)
        return;

    var len = document.all[argTableName].rows.length + 1;
    for (i = 2; i < len; i++) {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.checked)
            obj.checked = false;
    }
}

//刪除選取
function DeleteSelected(argTableName, argCheckBoxName, argTableFields) {
    var i, j;

    if (document.all[argTableName] == null)
        return;

    var nChecked = 0;
    var strLeftDocList = "";
    var len = document.all[argTableName].rows.length + 1;
    for (i = 2; i < len; i++) {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.checked) {
            obj.checked = false;
            var len2 = argTableFields.length;
            for (j = 0; j < len2; j++) {
                var tmpObj = document.all[argTableName + "__ctl" + i + argTableFields[j]];
                if (tmpObj.type == "text") //TextBox
                {
                    tmpObj.value = "";
                }
                else if (tmpObj.type == "textarea") //TextArea
                {
                    tmpObj.value = "";
                }
                else if (tmpObj.type == "checkbox") //CheckBox
                {
                    tmpObj.checked = false;
                }
                else if (tmpObj.type == "radio") //RadioButton
                {
                    tmpObj.checked = false;
                }
                else if (tmpObj.type == "select-one") //DropDownList
                {
                    tmpObj.selectedIndex = 0;
                }
                else if (tmpObj.nodeName == "SPAN") //Label
                {
                    tmpObj.textContent = "";
                }
            }
            nChecked = 1;

            //1040806   Kenny   [1040606]   紀錄被刪除資料的index
            if (strLeftDocList != "")
                strLeftDocList += ",";
            strLeftDocList += i.toString();
        }
        //1040806   Kenny   [1040606]   調整為紀錄被刪除資料的index，MARK此部分處理
        //else  // 紀錄未勾選文號
        //{
        //    if (strLeftDocList != "")
        //        strLeftDocList += "','";
        //    strLeftDocList += document.all["dg1__ctl" + i + "_lbDocNo"].textContent;
        //}
    }
    document.all.H_txLeftDocList.value = strLeftDocList;

    if (nChecked == 0)
        return false;
    else
        return true;
}

//1060215	Joe		1050087   二代系統升級，因應tbselect換型態，無法使用getItem--S	
// function SelectBarSubmit() {
    // var o = document.all.tbSelect.getItem(event.flatIndex);
    // document.all.ToolBarSenderID.value = o.getAttribute("ID");

    // if (Page_BlockSubmit == false) {
        // IsServerHandling = true;
        // jf_ShowWaitState();
        // __doPostBack("tbSelect", event.flatIndex);
    // }
// }
//1060215	Joe		1050087   二代系統升級，因應tbselect換型態，無法使用getItem--E

function CheckSelect()
{
    var lines = document.all.dg1.rows.length;
    var rtnDocList = "";
    var blSelect = false;
    for (var i = 2 ; i < lines+1 ; i++)
    {
        if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
        {
            blSelect = true;
            if ( jf_Trim(rtnDocList) != "" )
                rtnDocList+= "','" ;
            rtnDocList += document.all["dg1__ctl" + i + "_lbDocNo"].textContent;
        }
    }

    if (!blSelect)
    {
        alert("至少需勾選一筆文號");
        return false;
    }
    else
    {
        document.all.H_txDocList.value = rtnDocList;
        return true;
    }

}

//1040806   Kenny   [1040606]   取消同步勾選相同文號
//function SelectSameDocNo()
//{
//    var strDocNo1 = "";
//    var strDocNo2 = "";
//    for (var iRow = 2 ; iRow < document.all["dg1"].rows.length + 1 ; iRow++) {
//        if (document.all["dg1__ctl" + iRow + "_cbSelect"].checked ) {
//            for (var iRow2 = 2 ; iRow2 < document.all["dg1"].rows.length + 1 ; iRow2++)
//            {
//                strDocNo1 = document.all["dg1__ctl" + iRow + "_lbDocNo"].textContent;
//                strDocNo2 = document.all["dg1__ctl" + iRow2 + "_lbDocNo"].textContent;
//                if (strDocNo1 == strDocNo2)
//                    document.all["dg1__ctl" + iRow2 + "_cbSelect"].checked = true;
//            }
//        }
//    }
//}

function SetFileNo()
{
    var strYearS = jf_Trim(document.all["txFileYearS"].value);
    var strYearE = jf_Trim(document.all["txFileYearE"].value);
    if (strYearS != "" && strYearE == "")  // 檔號只有起值
    {
        document.all["txFileYearE"].value = jf_Trim(document.all["txFileYearS"].value)
        document.all["txFileClsE"].value = jf_Trim(document.all["txFileClsS"].value)
        document.all["txFileCaseE"].value = jf_Trim(document.all["txFileCaseS"].value)
        document.all["txFileVolE"].value = jf_Trim(document.all["txFileVolS"].value)
        document.all["txFileSeqE"].value = jf_Trim(document.all["txFileSeqS"].value)
    }
    else if (strYearS == "" && strYearE != "")  // 檔號只有訖值
    {
        document.all["txFileYearS"].value = jf_Trim(document.all["txFileYearE"].value)
        document.all["txFileClsS"].value = jf_Trim(document.all["txFileClsE"].value)
        document.all["txFileCaseS"].value = jf_Trim(document.all["txFileCaseE"].value)
        document.all["txFileVolS"].value = jf_Trim(document.all["txFileVolE"].value)
        document.all["txFileSeqS"].value = jf_Trim(document.all["txFileSeqE"].value)
    }
}
//1040804   Kenny   [1040606]   新增DataGrid 全選、反選、清除選取、刪除選取功能--End--