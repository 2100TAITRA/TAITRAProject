/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 日期		SA      PG      單號        概要
 * 0980916 Stella   Jane    0980454     新增查詢條件"分類號"
 * 1020320 David    Jagle   1020182     增加匯出EXCEL功能
 * 1031022 ----		Cloud   1030824     新增科別及點收人員條件
 * 1060512 Cloud    Justin  1050087     二代公文修改
 * 1070511 Cloud	Justin	1070304		[客委會]查詢結果不限制筆數，及產出報表PDF、ODS
 * 1111027 Cloud	Cloud	1110899		[銓敘部]隱藏歸檔日期條件
 * 1111208 Cloud    Cloud   1110860     [銓敘部]因銓敘部開啟前有跳出詢問訊息，透過子窗帶回會因active不在akm330而被吃掉，故以settimeot延遲執行
 * 1120413 Cloud 	Cloud	1120064、1120065 修改支援查詢可透過檔號已編目公文，查詢結果增加主旨
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060512 Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1060512 Justin [1050087] 二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060512 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
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
		case "btAll"://全選
			Page_BlockSubmit = true;
			var strObjName = "";
			var pDg1Len = document.all.dg1.rows.length+1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			for (i=2;i<pDg1Len;i++)
			{
				strObjName = "dg1__ctl"+i+"_cbSelect";
				document.all[strObjName].checked=true;
			}
			break;
		case "btClear"://清除
			Page_BlockSubmit = true;
			var strObjName = "";
			var pDg1Len = document.all.dg1.rows.length+1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			for (i=2;i<pDg1Len;i++)
			{
				strObjName = "dg1__ctl"+i+"_cbSelect";
				if (document.all[strObjName].isDisabled) continue;
				document.all[strObjName].checked=false;
			}
			break;
		case "btRever"://反向
			Page_BlockSubmit = true;
			var strObjName = "";
			var pDg1Len = document.all.dg1.rows.length+1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			for (i=2;i<pDg1Len;i++)
			{
				strObjName = "dg1__ctl"+i+"_cbSelect";
				if (document.all[strObjName].isDisabled) continue;
				if (document.all[strObjName].checked)
					document.all[strObjName].checked=false;
				else
					document.all[strObjName].checked=true;
			}
			break;
		//0980916 開啟分類號選取視窗[0980454]-Jane
		case "btFileCls":
			var pUrl = "";
			pUrl = "../../EA/EA01/EAC005.aspx?FILE_CLS="+jf_Trim(document.all["txFileCls"].value)+"&MODE=1&nFrom=AKM330C2&SAMLart="+GetParam("SAMLart");
		    //jf_OpenChildWin(pUrl,"EAC005",750,500);
		    //1060512 Justin [1050087] 二代公文修改 
			jf_OpenChildWin(pUrl, "EAC005", 800, 600);
			Page_BlockSubmit = true;
			break;
	}	
}

//1060512 Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	var strDocNoList = "";
	var intCount=0;
	var pDg1Len
	var pAllowBtnAction=true;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1060512 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	    case "btSearch":
	        //1120420 Cloud 1120064、1120065  修正檢核不過還會postback問題
	        Page_BlockSubmit = true;
		    //不可空白檢查
			pAllowBtnAction = Check_NOT_Allow_Empty_Field();  
			//欄位輸入合理性檢查
			if (pAllowBtnAction) CheckCDATE("txACP_DATES",  "點收日期(起)");
			if (pAllowBtnAction) CheckCDATE("txACP_DATEE",  "點收日期(訖)");
			if (pAllowBtnAction) CheckCDATE("txFILE_DATES", "歸檔日期(起)");
			if (pAllowBtnAction) CheckCDATE("txFILE_DATEE", "歸檔日期(訖)");
			//1120414	Cloud 1120064、1120065	 增加編目日期
			if (pAllowBtnAction) CheckCDATE("txInpFileDateS", "編目日期(起)");
			if (pAllowBtnAction) CheckCDATE("txInpFileDateE", "編目日期(訖)");
			//1031030	Cloud	[1030824]-postback之前檢查隱藏欄位值是否與當前所選相同，不同的重建選單
			//會有不同的情況表示使用下拉後，再用KEY的或是直接用KEY的-總之就是換單位-重建
			if(document.all.H_DeptNo.value != document.all["dlDept1"].value.split(":")[0])//單位
				dlDeptOnChange("dlDept1","dlSect");
			//科別輸入的值不為空-則進行比對與隱藏欄位是否相同不同則重取值
			if(document.all["dlSect_Text"].value!= document.all.H_dlSectText.value)
				dlSectOnblur("dlSect");
				
				
				
			//0980916 分類號合理性檢查[0980454]-Jane
			if (pAllowBtnAction) fnClsNoOnblur();
			
			//檢查均正確 執行Server端處理
			if (pAllowBtnAction) {
			    //1060512 Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
			    //1120420 Cloud 1120064、1120065  修正檢核不過還會postback問題
			    Page_BlockSubmit = false;
			    jf_ToolBarSubmit(xObjectName);
			    
			}
			//1120420 Cloud 1120064、1120065  修正檢核不過還會postback問題
			else
			    Page_BlockSubmit = true;
			
			break;
			
		case "btSave":
			if(opener.document.all.lbReturnValue.length !=0)
			{
				var oldlength = opener.document.all.lbReturnValue.length;
				for(i=0;i<oldlength;i++)
				{
					opener.document.all.lbReturnValue.remove(0);
				}
			}

			if (document.all.dg1 == null)
			{
				alert("請先執行搜索鍵!");
				IsServerHandling = false;
				return;
			}
			
			pDg1Len = document.all.dg1.rows.length+1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			for (i=2;i<pDg1Len;i++)
			{
				if (document.all["dg1__ctl"+i+"_cbSelect"].checked)
				{
				    //1060512 Justin [1050087] 二代公文修改 
				    //strDOC_NO = document.all["dg1__ctl"+i+"_hlDocNo"].innerText;
				    strDOC_NO = document.all["dg1__ctl" + i + "_hlDocNo"].textContent;
					opener.document.all.lbReturnValue.length = intCount+1;
					opener.document.all.lbReturnValue.options[intCount].text  = strDOC_NO;
					opener.document.all.lbReturnValue.options[intCount].value = strDOC_NO;
					intCount++;
				}
			}
			if (intCount==0)
			{
				alert("請勾選資料帶回!");
				IsServerHandling = false;
				return;
			}
			else
			{
			    //* 1111208 Cloud    Cloud   1110860     [銓敘部]因銓敘部開啟前有跳出詢問訊息，透過子窗帶回會因active不在akm330而被吃掉，故以settimeot延遲執行			
			    if (document.all.OrgnickName.value == "MOCS")
			        window.setTimeout(function () { opener.window.CallBack("AKM330C2") }, 1);
			    else
			        opener.window.CallBack("AKM330C2");
				close();			
			}
			
			Page_BlockSubmit = true;
			break;
		
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1060512 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		    /*1070511 Justin [1070304]新增產出報表PDF、ODS
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1060512 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;*/
	    case "btODS":
		//1020320	Jagle	[1020182]	增加匯出EXCEL功能
		case "btExcel":
		    //不可空白檢查
			pAllowBtnAction = Check_NOT_Allow_Empty_Field();  
			//欄位輸入合理性檢查
			if (pAllowBtnAction) CheckCDATE("txACP_DATES",  "點收日期(起)");
			if (pAllowBtnAction) CheckCDATE("txACP_DATEE",  "點收日期(訖)");
			if (pAllowBtnAction) CheckCDATE("txFILE_DATES", "歸檔日期(起)");
			if (pAllowBtnAction) CheckCDATE("txFILE_DATEE", "歸檔日期(訖)");
			if (pAllowBtnAction) fnClsNoOnblur();
			//檢查均正確 執行Server端處理
			if (pAllowBtnAction)
			    //1060512 Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
			    jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if(argCallerId=="EAC005")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			document.all["txFileCls"].value=document.all["lbReturnValue"].options[1].value;
			fnClsNoOnblur();
		}
	}
}

function ClientOnLoad()
{
	if (document.all.rbACP_DATE.checked)
		RadioDateDoClick("rbACP_DATE");
	else
		RadioDateDoClick("rbFILE_DATE");
		
	ShowMsg();
	//* 1111027 Cloud	Cloud	1110899[銓敘部]隱藏歸檔日期條件
	if (document.all.OrgnickName.value == "MOCS") {
		document.all.FileDate.className = "hide";
	}
    //1120413   Cloud   1120064、1120065 修改支援查詢可透過檔號已編目公文，查詢結果增加主旨
	RadioFileDoClick();
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060512 Justin [1050087] 二代公文修改
    //document.all[argLabelId].innerText = obj.value;
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

function RadioDateDoClick(argColName)
{
	if(argColName == "rbACP_DATE")
	{
	    //點收項目
	    //1120414 Cloud 1120064、1120065一併修正 修正小日曆消失問題
	    //document.all.txACP_DATES.className="";	
	    document.all.txACP_DATES.className = "DatePicker";
	    document.all.txACP_DATES.disabled = false;
	    //1120414 Cloud 1120064、1120065一併修正 修正小日曆消失問題
	    //document.all.txACP_DATEE.className="";	
	    document.all.txACP_DATEE.className = "DatePicker";
		document.all.txACP_DATEE.disabled=false;	
		document.all.txRdDateCaption.value = "依點收日期";
	    //1060512 Justin [1050087] 二代公文修改
	    //document.all.txACP_DATES.focus();
		$('#txACP_DATES').focus();
		
	    //歸檔項目
	    //1120414 Cloud 1120064、1120065一併修正 修正小日曆消失問題
		//document.all.txFILE_DATES.className="DisplayOnly";	
		document.all.txFILE_DATES.disabled = true;
	    //1120414 Cloud 1120064、1120065一併修正 修正小日曆消失問題
		//document.all.txFILE_DATEE.className="DisplayOnly";	
		document.all.txFILE_DATEE.disabled = true;
	}
	else if (argColName == "rbFILE_DATE")
	{
	    //點收項目
		document.all.txACP_DATES.className="DisplayOnly";	
		document.all.txACP_DATES.disabled=true;	
		document.all.txACP_DATEE.className="DisplayOnly";	
		document.all.txACP_DATEE.disabled=true;	
		
	    //歸檔項目
	    //1120414 Cloud 1120064、1120065一併修正 修正小日曆消失問題
	    //document.all.txFILE_DATES.className="";	
		document.all.txFILE_DATES.className = "DatePicker";
		document.all.txFILE_DATES.disabled = false;
	    //1120414 Cloud 1120064、1120065一併修正 修正小日曆消失問題
	    //document.all.txFILE_DATEE.className="";	
		document.all.txFILE_DATEE.className = "DatePicker";
		document.all.txFILE_DATEE.disabled = false;
		document.all.txRdDateCaption.value = "依歸檔日期";
	    //1060512 Justin [1050087] 二代公文修改
	    //document.all.txFILE_DATES.focus();
		$('#txFILE_DATES').focus();

	}
}

function Check_NOT_Allow_Empty_Field()
{
    var pErrStr = "";
    var pIsValid = true;
    //1120414 Cloud 1120064、1120065增加修改提供依檔號查詢已編目公文功能
    if (document.all.rbWaitInp.checked) {
        if (document.all.rbACP_DATE.checked) {
            if ((document.all.txACP_DATES.value == "") && (document.all.txACP_DATEE.value == "")) {
                pErrStr = pErrStr + "點收日期起訖不可均為空白\n";
                pIsValid = false;
                if (!pIsValid)
                    //1060512 Justin [1050087] 二代公文修改
                    //document.all.txACP_DATES.focus();
                    $('#txACP_DATES').focus();
            }
        }
        else if (document.all.rbFILE_DATE.checked) {
            if ((document.all.txFILE_DATES.value == "") && (document.all.txFILE_DATEE.value == "")) {
                pErrStr = pErrStr + "歸檔日期起訖不可均為空白\n";
                pIsValid = false;
                if (!pIsValid)
                    //1060512 Justin [1050087] 二代公文修改
                    //document.all.txFILE_DATES.focus();
                    $('#txFILE_DATES').focus();
            }
        }
    }
    //1120414 Cloud 1120064、1120065增加修改提供依檔號查詢已編目公文功能-S
    else {
        if (document.all.rbInpFileDate.checked) {
            if ((document.all.txInpFileDateS.value == "") && (document.all.txInpFileDateE.value == "")) {
                pErrStr = pErrStr + "編目日期起訖不可均為空白\n";
                pIsValid = false;
                if (!pIsValid)
                    $('#txACP_DATES').focus();
            }
        }
        else if (document.all.rbFileNo.checked) {
            if (document.all.txYEAR.value == "" || document.all.txFileCls.value == "" && (document.all.txCASES.value == "" || document.all.txCASEE.value == "")) {
                pErrStr = pErrStr + "檔號至少需輸入至案次號\n";
                pIsValid = false;
                if (!pIsValid) {
                    if (document.all.txYEAR.value == "")
                        $('#tbYEAR').focus();
                    else if (document.all.txFileCls.value == "")
                        $('#txFileCls').focus();
                    else if (document.all.txCASES.value == "")
                        $('#tbCASES').focus();
                    else if (document.all.txCASEE.value == "")
                        $('#tbCASEE').focus();
                }
            }
        }
    }
    //1120414 Cloud 1120064、1120065增加修改提供依檔號查詢已編目公文功能-E

	if (pErrStr != "")
		alert(pErrStr);
		
	return pIsValid;
}


//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	var pIsValid = true;
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
		    //1060512 Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
			$('#' + argObj).focus();
			pIsValid = false;
		}
	}
	return pIsValid;
}

//0980916 分類號onblur處理[0980454]-Jane
function fnClsNoOnblur()
{
	if (jf_Trim(document.all["txFileCls"].value) =="")
	{
	    //1060512 Justin [1050087] 二代公文修改
	    //document.all["lbFileCls"].value = "";
	    document.all["lbFileCls"].textContent = "";
		return true;
	}
	
	var arWSParam = new Array(1);
	arWSParam[0] = jf_Trim(document.all["txFileCls"].value);
	
	callObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA", false, arWSParam);

	//檢查執行是否成功
	if(jf_IsWebServiceSuccess(callObj))
	{
		if(callObj.value.ErrorClass.ErrMessage.length ==0)
		{
		    //1060512 Justin [1050087] 二代公文修改
		    //document.all["lbFileCls"].value = callObj.value.ClsName;
		    document.all["lbFileCls"].textContent = callObj.value.ClsName;
			return true;
		}
		else
		{
		    //1060512 Justin [1050087] 二代公文修改
		    //document.all["lbFileCls"].value = "";
		    document.all["lbFileCls"].textContent = "";
			document.all["txFileCls"].value ="";
		    //1060512 Justin [1050087] 二代公文修改
			//document.all["txFileCls"].focus();
			$('#txFileCls').focus();
			return false;	
		}
	}
	else
	{
	    //1060512 Justin [1050087] 二代公文修改
	    //document.all["lbFileCls"].value = "";
	    document.all["lbFileCls"].textContent = "";
		document.all["txFileCls"].value = "";
	    //1060512 Justin [1050087] 二代公文修改
		//document.all["txFileCls"].focus();
		$('#txFileCls').focus();
		return false;	
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
// 1031022 Cloud 1030824	新增科別及點收人員條件-S
function GetText(argDeptObj,argSectObj)
{
	//一級單位輸入文字。尋找選單內對應的值
	var IsExist = false;
	if(document.all[argDeptObj+"_Text"].value=="")
		return;
	for(var i=0;i<document.all[argDeptObj].options.length;i++)
	{
		if(document.all[argDeptObj+"_Text"].value == document.all[argDeptObj].options[i].text)
		{
			document.all[argDeptObj].selectedIndex = i;
			IsExist = true;
			break;
		}
	}
	//單位連動建立二級單位選單
	if(IsExist)
	{
		akjf_SetdlDept(argDeptObj,argSectObj,"","",false,false);
		document.all.H_dlSectInfo.value = akjf_SaveCurrDL(document.all[argSectObj]);
	}
}
function dlDeptOnChange(argDeptObj,argSectObj)
{
	document.all.H_dlSectSelectValue.value ="";//清空因選單異動儲存的VALUE
	document.all.H_dlSectText.value = "";//
	//單位連動建立二級單位選單
	//1031030	Cloud	取得當前所選(所key)value放入隱藏欄位-用於搜尋前比對是否需要重建二級選單
	document.all.H_DeptNo.value = document.all[argDeptObj].value.split(":")[0];
	var IsExist = false;
	for(var i=0;i<document.all[argDeptObj].options.length;i++)//設定前檢察是否存在
	{
		if(document.all[argDeptObj+"_Text"].value == document.all[argDeptObj].options[i].text)
		{
			document.all[argDeptObj].selectedIndex = i;
			IsExist = true;
			break;
		}
	}
	if(IsExist)
	{
		akjf_SetdlDept(argDeptObj,argSectObj,"","",false,false);
		//取得科別選單內的值放入隱藏欄位再次建立用
		document.all.H_dlSectInfo.value = akjf_SaveCurrDL(document.all[argSectObj]);
	}
	else
	{
		document.all.H_dlSectInfo.value ="";
		document.all.H_DeptNo.value = "";
	}
		
}
//取得選擇科別的值
function dlSectOnChange(argSectObj)
{
	document.all.H_dlSectSelectValue.value = document.all[argSectObj].options[document.all[argSectObj].selectedIndex].value.split(':')[2];
}
//ONBLUR 比對輸入的值設定對應VALUE
function dlSectOnblur(argSectObj)
{
	document.all.H_dlSectSelectValue.value ="";//清空因選單異動儲存的VALUE
	document.all.H_dlSectText.value = document.all[argSectObj+"_Text"].value;//儲存輸入名稱
	if(document.all[argSectObj+"_Text"].value!="")
	{
		for(var i=0;i<document.all[argSectObj].options.length;i++)
		{
			if(document.all[argSectObj+"_Text"].value == document.all[argSectObj].options[i].text)//選單內有與輸入名稱相同的文字時取得值放入
			{
				document.all[argSectObj].selectedIndex = i;
				document.all.H_dlSectSelectValue.value = document.all[argSectObj].options[i].value.split(':')[2];
				break;
			}
		}
	}
	
}
// 1031022 Cloud 1030824	新增科別及點收人員條件-E
// 1120413 Cloud 	Cloud	1120064、1120065 修改支援查詢可透過檔號已編目公文，查詢結果增加主旨
function RadioFileDoClick(argRbid) {
    if (document.all["rbWaitInp"].checked)//待編目條件
	{
		document.all["AcpDate"].className = "dTR";
		document.all["FileDate"].className = "dTR";
		document.all["DeptEmp"].className = "dTR";
		document.all["InpFileTitle"].className = "hide";
		document.all["divrbFileNo"].className = "hide";
		document.all["lbClsdTD"].className = "";
		document.all["tdFileYear"].className = "hide";
		document.all["divCaseVol"].className = "hide";
		document.all["InpFileDate"].className = "hide";
		document.all["AcpEmp"].className = "";
		document.all["divOrderInp"].className = "hide";
		document.all["divOrderWaitInp"].className = "dTD";
		document.all["divOrderWaitInp2"].className = "dTD";
		document.all["divrbcbLike"].className = "dTD";
        //從已編目切回未編目 設定排序
		if (document.all["rbOrderFileNo"].checked == true || document.all["rbOrderFileNo"].checked == true)
		    document.all["rbOrderDate"].checked = true;
		document.all["btPreview"].className = "";
		document.all["btExcel"].className = "";
		document.all["btODS"].className = "";
	}
	else//已編目條件
	{
		document.all["AcpDate"].className = "hide";
			document.all["FileDate"].className = "hide";
		document.all["DeptEmp"].className = "hide";
		document.all["InpFileTitle"].className = "dTR";
		document.all["divrbFileNo"].className = "";
		document.all["lbClsdTD"].className = "hide";
		document.all["tdFileYear"].className = "dTD";
		document.all["divCaseVol"].className = "dTD";
		document.all["InpFileDate"].className = "";
		document.all["AcpEmp"].className = "hide";
		document.all["divOrderInp"].className = "dTD";
		document.all["divOrderWaitInp"].className = "hide";
		document.all["divOrderWaitInp2"].className = "hide";
		document.all["divrbcbLike"].className = "hide";
		document.all["rbOrderFileNo"].checked = true;
		document.all["btPreview"].className = "hide";
		document.all["btExcel"].className = "hide";
		document.all["btODS"].className = "hide";

	}
	if (document.all.OrgnickName.value == "MOCS")
		document.all["FileDate"].className = "hide";
}
