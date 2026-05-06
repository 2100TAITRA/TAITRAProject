/*
DATE	SA		PRG		MGR_NO	DESC
0960912 Stella	Leo		001252	新增檢核來文字號、關鍵字、署收件號、承辦單位
0990125 Stella  Jane    0990006 配合FDA已案管制功能,於畫面上新增"收文性質"及"發文性質"欄位供使用者設定
0990303 Stella  Jane    0990123 1.數字欄位後面加上單位2.利用環境變數OD_ODC010_CHECK_COM_NO_CLS來判斷是否要檢核母文及子文分類號
0990413 Stella  Jane    0990213 新增一權限OD_ODT240_CHANGEPTY,若有此權限的人才可針對已結案之子文的收發文性質做異動
0990923			Johnny	0990118	配合人民申請案件取消單號0990006及0990213之修改
1050808	Kevin	Kevin_C	1050087	升二代
1050818 Kevin   Zen     1050700 弱掃XSS修正
1060124	Kevin	Kevin_C	1050087	修正focus寫法(輸入重複的併案子文號，會不斷跳出提示訊息)
1060613 Kevin	Justin	1060456	弱掃Client Potential Code Injection修正
1061130 David	Justin	1061180	修改保存年限檢核邏輯
1080118 Kevin	Zen     1080049 弱掃Reflected XSS Specific Clients修正
1080214 Kevin	Joe     1080179 弱掃修正Client Potential XSS
1100201	Leslie	Joe		1090927	取消使用document.activeElement
1100922	Kevin	Joe		1100991	弱掃修正Client Potential XSS
1131008 Kevin   Jason   1130941 弱掃復掃修正Client Potential XSS
1131016	Kevin   Jason   1130941 弱掃修正Client Potential XSS
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050808	Kevin_C	1050087	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050808	Kevin_C	1050087	升二代
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

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
	Page_BlockSubmit=true;
	switch (xObjectName)
	{
		case "btAddNew"://加入鍵
			fnAddNew();
			break;
		case "btSelectAll"://全選鍵
			fnSelectAll();
			break;
		case "btReverse"://反向鍵
			fnReverse();
			break;
	}	
}

//1050808	Kevin_C	1050087	升二代
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
	
	//1050808	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050808	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				//0990413 多顯示訊息告知使用者要重取代辦事項,以避免資料有誤[0990213]-Jane
				if(window.confirm("設定完併案關係後，請重取代辦事項，以避免資料有誤。"))
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = true;
			//1050808	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050808	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
    //1080118 Zen 1080049 弱掃Reflected XSS Specific Clients修正
	//1080214 Joe         1080179 弱掃修正Client Potential XSS
    //document.all['txSubject'].value = HtmlDecode(document.all['txSubject'].value);

	ShowMsg();
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	/*1060613 Justin [1060456] 一併移除無用CODE
	jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
	jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, null);
	jf_CallWS("lib/OD_LIB.asmx","ws_CheckDeptNoAndFromNo",false,null);*/
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult)
{
    //檢查回傳的webserverID
    if(argResult.id == iCallID_Cls)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			document.all["txClsName"].value = argResult.value.ClsName;
			document.all["txKeepYear"].value = argResult.value.KeepYear;
		}
		else
		{
			document.all["txClsNo"].select();
			document.all["txClsName"].value = "";
			document.all["txKeepYear"].value = "";
		}
		/*
			if (argResult.value.ErrorClass.ErrMessage[0].text==jf_GetErrMsg(NoData))
				alert("無此分類代號");
			else
			{
				document.all["txClsNo"].select();
				document.all["txClsName"].value = "";
				document.all["txKeepYear"].value = "";
				alert(argResult.value.ErrorClass.ErrMessage[0].text);
			}
		}
		else
		{
			if(argResult.value.ClsName == "")
			{
				document.all["txClsNo"].select();
				document.all["txClsName"].value = "";
				document.all["txKeepYear"].value = "";
				alert("無此分類代號");
			}
		}
		*/
    }
	
}
function CheckBeforeOpen()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist())//檢查鍵值是否已存在
			{
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

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
		{
			if (fnGetComValue())	
				return true;
		}
		
	}
	return bRtnbool;
}
function fnGetComValue()
{
	var pComInfo = '';
	var pRemoveCom = '';
	var dg1 = document.all["dg1"];
	var len = document.all["dg1"].rows.length;
	//0990923 取消單號[0990006]及[0990213]之修改 0990118 Johnny
	//0990125 記錄收發文性質[0990006]-Jane
	//var strRcvProperty = "";
	//var strIssueProperty = "";
	if (len < 2)
	{
		alert("請設定併案子文後再儲存。");
		return false;
	}
	for (var iRow=1;iRow<len;iRow++)
	{
		//1050808	Kevin_C	1050087	升二代
		//if (dg1.rows(iRow).cells(2).innerText != "")
		if (dg1.rows[iRow].cells[2].textContent != "")
		{
			//0990303 取得目前子文所選擇的數量單位[0990123]-Jane
			var i = document.all["dg1__ctl"+(iRow+1)+"_dlFileUnit"].selectedIndex;
			if (!document.all["dg1__ctl"+(iRow+1)+"_cbunSelect"].checked)
				//0990303 多傳送子文所選擇的數量單位[0990123]-Jane
				//1050808	Kevin_C	1050087	升二代
				//pComInfo += dg1.rows(iRow).cells(2).innerText+"#"+document.all["dg1__ctl"+(iRow+1)+"_txComCnt"].value+"#"+
				pComInfo += dg1.rows[iRow].cells[2].textContent+"#"+document.all["dg1__ctl"+(iRow+1)+"_txComCnt"].value+"#"+
								document.all["dg1__ctl"+(iRow+1)+"_dlFileUnit"].options[i].value+"^";
				//pComInfo += dg1.rows(iRow).cells(2).innerText+"#"+document.all["dg1__ctl"+(iRow+1)+"_txComCnt"].value+"^";
			else
				//0990303 多傳送子文所選擇的數量單位[0990123]-Jane
				//1050808	Kevin_C	1050087	升二代
				//pRemoveCom += dg1.rows(iRow).cells(2).innerText+"#"+document.all["dg1__ctl"+(iRow+1)+"_txComCnt"].value+"#"+
				pRemoveCom += dg1.rows[iRow].cells[2].textContent+"#"+document.all["dg1__ctl"+(iRow+1)+"_txComCnt"].value+"#"+
								document.all["dg1__ctl"+(iRow+1)+"_dlFileUnit"].options[i].value+"^";
				//pRemoveCom += dg1.rows(iRow).cells(2).innerText+"#"+document.all["dg1__ctl"+(iRow+1)+"_txComCnt"].value+"^";
		}
		//0990923 取消單號[0990006]及[0990213]之修改 0990118 Johnny --start
		//0990125 取得收文性質[0990006]-Jane
		/*if(!document.all["dg1__ctl"+(iRow+1)+"_dlRcvProperty"].disabled)
		{
			var i = document.all["dg1__ctl"+(iRow+1)+"_dlRcvProperty"].selectedIndex;
			strRcvProperty +=document.all["dg1__ctl"+(iRow+1)+"_dlRcvProperty"].options[i].value+":";
		}
		else//0990413 若不能改,則傳回N表示無法update[0990213]-Jane
			strRcvProperty +="N:";
			//strRcvProperty +=":";
		//0990125 取得發文性質[0990006]-Jane
		if(!document.all["dg1__ctl"+(iRow+1)+"_dlIssueProperty"].disabled)
		{
			var i = document.all["dg1__ctl"+(iRow+1)+"_dlIssueProperty"].selectedIndex;
			strIssueProperty +=document.all["dg1__ctl"+(iRow+1)+"_dlIssueProperty"].options[i].value+":";
		}
		else//0990413 若不能改,則傳回N表示無法update[0990213]-Jane
			strIssueProperty +="N:";
			//strIssueProperty +=":";*/
		//0990923 取消單號[0990006]及[0990213]之修改 0990118 Johnny --end
	}
	if (pComInfo == "" && pRemoveCom =="")
	{
		alert("請設定併案子文後再儲存。");
		return false;
	}
	
	document.all.txHComInfo.value = pComInfo;
	document.all.txHRemoveCom.value = pRemoveCom;
	//0990923 取消單號[0990006]及[0990213]之修改 0990118 Johnny
	//0990125 將取得的發文性質及收文性質的值存到隱藏欄位中[0990006]-Jane
	//document.all.H_RtnRcvProperty.value = strRcvProperty;
	//document.all.H_RtnIssueProperty.value = strIssueProperty;
	return true;
}
//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	var bRtnbool = false;
	var pClsNo = jf_Trim(document.all.txClsNo.value);
	var pKeepYear = jf_Trim(document.all.txKeepYear.value);
	var nDocFileCnt = Math.ceil(document.all["txDocFileCnt"].value);
	if (pClsNo == "")
	{
		//1060124	Kevin_C	1050087	修正focus寫法
		//document.all.txClsNo.focus();
		$('txClsNo').focus();
		alert("分類號不可為空白。")
		return false;
	}
	if (pKeepYear == "")
	{
		//1060124	Kevin_C	1050087	修正focus寫法
		//document.all.txKeepYear.focus();
		$('txKeepYear').focus();
		alert("保存年限不可為空白。");
		return false;
	}
	else
	{
		/*1061130 Justin [1061180] 修改保存年限檢核邏輯
		if (pKeepYear != "1" && pKeepYear != "3" && pKeepYear != "5" && pKeepYear != "10" 
			&& pKeepYear != "15" && pKeepYear != "20" && pKeepYear != "25" 
			&& pKeepYear != "30" && pKeepYear != "99" )
			{
				//1060124	Kevin_C	1050087	修正focus寫法
				//document.all.txKeepYear.focus();
				$('txKeepYear').focus();
				alert("保存年限不正確。");
				return false;
			}*/
		var strLocation = document.all["H_WSLocation"].value;
		var paramCheckKeepYear = new Array(3);
		paramCheckKeepYear[0] = encodeURI(document.all.txOrgNo.value);
		paramCheckKeepYear[1] = pClsNo;
		paramCheckKeepYear[2] = pKeepYear;
		callObj = jf_CallWS(strLocation + "lib/OD_LIB.asmx", "CheckKeepYear", false, paramCheckKeepYear);
		if (callObj.value != "")
		{
			alert(callObj.value);
			return false;
		}
	}
	if (nDocFileCnt == NaN || nDocFileCnt < 1)
	{
		//1060124	Kevin_C	1050087	修正focus寫法
		//document.all.txDocFileCnt.focus();
		$('txDocFileCnt').focus();
		alert("母文數量不正確。")
		return false;
	}
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		if (!(document.all["dg1__ctl"+iRow+"_cbunSelect"].checked))
		{
			var nFileCnt = Math.ceil(document.all["dg1__ctl"+iRow+"_txComCnt"].value);
			if (nFileCnt == NaN || nFileCnt < 1)
			{
				//1060124	Kevin_C	1050087	修正focus寫法
				//document.all["dg1__ctl"+iRow+"_txComCnt"].focus();
				$('dg1__ctl'+iRow+'_txComCnt').focus();
				alert("子文數量不正確。")
				return false;
			}
		}
	}
	//併案關係不可空白
	if (document.all["dlCombineType"].selectedIndex == -1 || document.all["dlCombineType"].selectedIndex == 0)
	{
		//1060124	Kevin_C	1050087	修正focus寫法
		//document.all["dlCombineType"].focus();
		$('dlCombineType').focus();
		alert("併案關係不可為空白。")
		return false;
	}
	return true;
}

var iCallID_Cls = null;
function jf_ClsNoOnblur(argTb)
{	
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	//1100201	Joe		1090927		取消使用document.activeElement
	// if ((document.activeElement.id == "btCancel") ) return;
	if ((event.target.id == "btCancel") ) return;
	
	//分類代碼
	if (argTb=="txClsNo")
	{
		if (jf_Trim(document.all["txClsNo"].value)=="")
		{
			document.all["txClsName"].value="";
			return;
		}
		else
		{
			var param1 = new Array(1);
			//1060613 Justin [1060456] 弱掃Client Potential Code Injection修正
			//param1[0] = document.all["txClsNo"].value;
            param1[0] = encodeURI(document.all["txClsNo"].value);
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,param1);
			iCallID_Cls = RtnObj.id;
			OnWSResult(RtnObj);
		}
	}
}
var wsGetComInfoID = null;
function fnGetComInfo(pComNo,nComFileCnt)
{
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		if (pComNo != "")
		{
			Page_BlockSubmit=true;
			
			arKeyName[0]    = "DOC_NO";
			arKeyValue[0]   = pComNo;
			arRtnFldName[0] = "DOC_NO";
			arRtnFldName[1] = "COM_NO";
			arRtnFldName[2] = "FROM_SUBJECT";
			arOrdFldName[0] = "";

			var arWSParam = new Array(5);
			arWSParam[0] = "DOC_MAIN";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
			wsGetComInfoID = callObj.id;

			var argResult = callObj;
			if(jf_IsWebServiceSuccess(argResult))
			{
				//RtnField0 DOC_NO RtnField1 COM_NO RtnField2 主旨 RtnFiled3 DOC_STATE
				if (argResult.value.RtnField0[0] != "" && argResult.value.RtnField1[0] == "")
				{//未併案
					argResult.value.RtnField2[0]
				}
					
				else if (argResult.value.RtnField1[0] != "")
				{
					if (argResult.value.RtnField0[0] == argResult.value.RtnField1[0])
					{
						//1060124	Kevin_C	1050087	修正focus寫法
						//document.all["txComNo"].focus();
						$('txComNo').focus();
						alert("本份公文即為併案之母文，不允許再設定併案關係。")
						return false;
					}
					if (argResult.value.RtnField1[0] != jf_Trim(document.all.txDocNo.value))
					{
						//1060124	Kevin_C	1050087	修正focus寫法
						//document.all["txComNo"].focus();
						$('txComNo').focus();
						alert("本份公文已與"+argResult.value.RtnField1[0]+"號公文併案，不允許再設定併案關係。")
						return false;
					}
					return true;
				}
				else
					return false;
			}
			else
				return false;
			}
	}
}

//加入鍵
function fnAddNew()
{
	//justin 0930921 修改：離開子文號就insert到dg且不卡子文號數量
	var pFromOrgName = "";
	var pFromSubject = "";
	var pComNo = jf_Trim(document.all["txComNo"].value);
	var nComCnt = 0;
	if (pComNo == "")
	{
		//alert("子文號不可為空白。")
		//document.all["txComNo"].focus();
		return;
	}
	/*
	var nComFileCnt = Math.ceil(document.all["txComFileCnt"].value);
	if (jf_Trim(document.all["txComFileCnt"].value) == "" || nComFileCnt == NaN || nComFileCnt < 1)
	{
		alert("子文數量不正確。");
		document.all["txComFileCnt"].select();
		return;
	}*/
	if (pComNo == jf_Trim(document.all["txDocNo"].value))
	{
		alert("本份公文即為併案之母文，不允許再設定併案關係。");
		return;
	}
	for (var iRow=1;iRow<document.all["dg1"].rows.length;iRow++)
	{
		//1050808	Kevin_C	1050087	升二代
		//if (document.all["dg1"].rows(iRow).cells(2).innerText == pComNo)
		if (document.all["dg1"].rows[iRow].cells[2].textContent == pComNo)
		{
			//1060124	Kevin_C	1050087	修正focus寫法
			//document.all["txComNo"].focus();
			$('txComNo').focus()
			alert("子文號已在併案列表中，不允許再設定併案關係。");
			return;
		}
	}
	
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	//0990413 多取得子文CLOSE_DATE資訊[0990213]-Jane
	//var arRtnFldName = new Array(7);
	var arRtnFldName = new Array(8);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		arKeyName[0]    = "DOC_NO";
		arKeyValue[0]   = pComNo;
		arRtnFldName[0] = "DOC_NO";
		arRtnFldName[1] = "COM_NO";
		arRtnFldName[2] = "FROMORG_NAME";
		arRtnFldName[3] = "FILE_CNT"; 
		arRtnFldName[4] = "FROM_SUBJECT"; 
		arRtnFldName[5] = "SOURCE_ORGNO"; 
		arRtnFldName[6] = "FILE_CLS"; 
		//0990413 多取得子文CLOSE_DATE資訊[0990213]-Jane
		arRtnFldName[7] = "CLOSE_DATE"; 
		arOrdFldName[0] = "";

		var arWSParam = new Array(5);
		arWSParam[0] = "DOC_MAIN";
		arWSParam[1] = arKeyName;
		arWSParam[2] = arKeyValue;
		arWSParam[3] = arRtnFldName;
		arWSParam[4] = arOrdFldName;
		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
		wsGetComInfoID = callObj.id;
		//return OnWSResult(callObj);
		var argResult = callObj;
		//0990413 紀錄子文CLOSE_DATE資訊[0990213]-Jane
		var strCloseDate = "";
		if(jf_IsWebServiceSuccess(argResult))
		{
			//RtnField0:DOC_NO；RtnField1:COM_NO；RtnField2:來文機關；RtnField3:數量；RtnField4:主旨
			if (argResult.value.RtnField0[0] != "" && argResult.value.RtnField1[0] == "")
			{
				//未併案
				pFromOrgName = argResult.value.RtnField2[0];
				nComCnt = argResult.value.RtnField3[0];
				pFromSubject = argResult.value.RtnField4[0];
			}
			else if (argResult.value.RtnField1[0] != "")
			{
				if (argResult.value.RtnField0[0] == argResult.value.RtnField1[0])
				{
					//1060124	Kevin_C	1050087	修正focus寫法
					//document.all["txComNo"].focus();
					$('txComNo').focus();
					alert("本份公文即為併案之母文，不允許再設定併案關係。")
					return;
				}
				if (argResult.value.RtnField1[0] != jf_Trim(document.all.txDocNo.value))
				{
					//1060124	Kevin_C	1050087	修正focus寫法
					//document.all["txComNo"].focus();
					$('txComNo').focus();
					alert("本份公文已與"+argResult.value.RtnField1[0]+"號公文併案，不允許再設定併案關係。")
					return;
				}
			}
			//0990413 取得子文CLOSE_DATE資訊[0990213]-Jane
			strCloseDate = argResult.value.RtnField7[0];
			
			//0990303 若環境變數OD_ODC010_CHECK_COM_CLS_NO為Y才進行檢核[0990123]-Jane
			if(document.all["txCheckClsNo"].value=="Y")
			{
				//0961011 Leo 增加分類號不同之檢核
				if(argResult.value.RtnField6[0] != "" && argResult.value.RtnField6[0] != jf_Trim(document.all["txClsNo"].value) && jf_Trim(document.all["txClsNo"].value) != "")
				{	
					//0961112 Stella 修改顯示訊息
					//if(!alert("公文文號["+document.all.txDocNo.value+"]之分類號與母文不同，是確定要進行併案?"))
					if(!alert("與相關併案分類號"+document.all["txClsNo"].value+"不同，不允許併案"))
						return;
				}
			}
			if(jf_Trim(document.all["txClsNo"].value) == "")
			{
				var param = new Array(3);
			    //1050818 Kevin   Zen     1050700 弱掃XSS修正--begin
				//param[0] = document.all.txOrgNo.value;
			    //param[1] = document.all.txDocNo.value;
			    param[0] = encodeURI(document.all.txOrgNo.value);
			    param[1] = encodeURI(document.all.txDocNo.value);
			    //1050818 Kevin   Zen     1050700 弱掃XSS修正--end
				param[2] = argResult.value.RtnField6[0];
				callObj = jf_CallWS("lib/OD_LIB.asmx","ws_ComNoClsNo",false,param);
				var argCheck = callObj;
				if(!argCheck.error && argCheck.value != "")
				{
					if(!alert(argCheck.value))
						return false;		
				}
			}
			
			//0960912 Leo 001252 新增檢核來文字號、關鍵字、署收件號、承辦單位
			var param = new Array(2);
			param[0] = argResult.value.RtnField5[0];
			//1060613 Justin [1060456] 弱掃Client Potential Code Injection修正
			//param[1] = jf_Trim(document.all["txDocNo"].value);
            //param[2] = pComNo;
            param[1] = encodeURI(jf_Trim(document.all["txDocNo"].value));
			param[2] = encodeURI(pComNo);
			callObj = jf_CallWS("lib/OD_LIB.asmx","ws_CheckDeptNoAndFromNo",false,param);
			var argCheck = callObj;
			if(!argCheck.error && argCheck.value != "")
			{
				var aryMsg	= argCheck.value.split("|");
				if(aryMsg.length)
				{
					for( i = 0 ; i < aryMsg.length ; i++)
					{
						if(!confirm(aryMsg[i]))
							return false;	
					}
				}
				else
				{
					if(!confirm(aryMsg))
						return false;		
				}
				
			}	
		}
		else
			return;
	}
	else
		return;
		
	//0990125 多取得DOC_EXTRA中相關資訊[0990006]-Jane
	var arrName = new Array(2);
	var arrValue = new Array(2);
	var arrRtnName = new Array(3);
	var arrOrdName = new Array(1);
	
	arrName[0]    = "DOC_NO";
	arrName[1]    = "SOURCE_ORGNO";
	arrValue[0]   = pComNo;
	arrValue[1]	  = document.all.txOrgNo.value;
	arrRtnName[0] = "NEW_BY_OU";
	arrRtnName[1] = "ISSUE_PROPERTY";
	arrRtnName[2] = "RCV_PROPERTY";
	arrOrdName[0] = "";

	var arWSParamE = new Array(5);
	arWSParamE[0] = "DOC_EXTRA";
	arWSParamE[1] = arrName;
	arWSParamE[2] = arrValue;
	arWSParamE[3] = arrRtnName;
	arWSParamE[4] = arrOrdName;
	var callObjE = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParamE);
	
	var wsGetExtraInfoID = callObjE.id;
	
	var argResultE = callObjE;
	var strNewByOu = "";
	var strRcvProperty="";
	var strIssueProperty="";
	if(jf_IsWebServiceSuccess(argResultE))
	{
		strNewByOu = argResultE.value.RtnField0[0];
		if(strNewByOu=="Y")//創稿公文
			strIssueProperty = argResultE.value.RtnField1[0];
		else
			strRcvProperty = argResultE.value.RtnField2[0];
	}
	
	//1050808	Kevin_C	1050087	升二代
	//if (document.all["dg1"].rows(1).cells(2).innerText == "")
	//1051124	Kevin_C	1050087	修正加入第一筆子文時，DG第一行為空的問題
	//if (document.all["dg1"].rows[1].cells[2].textContent == "")
	if (document.all["dg1"].rows[1].cells[2].textContent.trim() == "")
		document.all["dg1"].deleteRow(1);
	
	var InsertRow = document.all["dg1"].insertRow();
	var len = document.all["dg1"].rows.length;	//先Insert so長度已+1;
	//置中
	//1050808	Kevin_C	1050087	升二代 -S
	//InsertRow.style.textAlign = "Center";
	////ID整除==單數序
	// if (len % 2==0)
		// InsertRow.style.backgroundColor = "#F7F7DE";
	// else
		// InsertRow.style.backgroundColor = "white";
	//1050808	Kevin_C	1050087	升二代 -E
	//序
	var lbNo = document.createElement("span");
	//1100922	Joe		1100991		弱掃修正Client Potential XSS
	// lbNo.setAttribute("id","dg1__ctl"+len+"_lbSeq");
	lbNo.setAttribute("id","dg1__ctl"+htmlencode(len)+"_lbSeq");
	//1050808	Kevin_C	1050087	升二代
	//lbNo.setAttribute("innerText",len-1);
	lbNo.textContent=len-1;
	InsertRow.insertCell(0).appendChild(lbNo);
	
	//選
	var cb1 = document.createElement("input");
	cb1.setAttribute("type","checkbox");
	//1100922	Joe		1100991		弱掃修正Client Potential XSS
	// cb1.setAttribute("id","dg1__ctl"+len+"_cbunSelect");
	cb1.setAttribute("id","dg1__ctl"+htmlencode(len)+"_cbunSelect");
	InsertRow.insertCell(1).appendChild(cb1);
	
	//子文號
	//1050808	Kevin_C	1050087	升二代
	//InsertRow.insertCell(2).innerText = jf_Trim(document.all["txComNo"].value);
	//InsertRow.cells[2].setAttribute("align","left");
	InsertRow.insertCell(2).textContent = jf_Trim(document.all["txComNo"].value);
	
	//來文機關
	//1050808	Kevin_C	1050087	升二代
	//InsertRow.insertCell(3).innerText = pFromOrgName;
	//InsertRow.cells[3].setAttribute("align","left");
	InsertRow.insertCell(3).textContent = pFromOrgName;
	
	//主旨
	//1050808	Kevin_C	1050087	升二代
	//InsertRow.insertCell(4).innerText = pFromSubject;
	//InsertRow.cells[4].setAttribute("align","left");
	InsertRow.insertCell(4).textContent = pFromSubject;
	
	
	//數量
	var txComCnt = document.createElement("input");
	txComCnt.setAttribute("type","text");
	txComCnt.setAttribute("value",document.all["txComFileCnt"].value);
	//1100922	Joe		1100991		弱掃修正Client Potential XSS
	// txComCnt.setAttribute("id","dg1__ctl"+len+"_txComCnt");
	txComCnt.setAttribute("id","dg1__ctl"+htmlencode(len)+"_txComCnt");
	//txComCnt.setAttribute("readOnly","readOnly");
	InsertRow.insertCell(5).appendChild(txComCnt);
	//1050808	Kevin_C	1050087	升二代
	//txComCnt.style.width = "29px";
	txComCnt.style.width = "2em";
	
	//0990303 多加單位下拉選單[0990123]-Jane
	var txUnit = document.createElement("select");
	//1100922	Joe		1100991		弱掃修正Client Potential XSS
	// txUnit.setAttribute("id","dg1__ctl"+len+"_dlFileUnit");
	txUnit.setAttribute("id","dg1__ctl"+htmlencode(len)+"_dlFileUnit");
	txUnit.length = 2;
	//1131016    Jason   1130941     弱掃修正Client Potential XSS
	//txUnit.options[0].value="頁";
	txUnit.options[0].value = htmlencode("頁");
	txUnit.options[0].text = "頁";
	//1131016    Jason   1130941     弱掃修正Client Potential XSS
	//txUnit.options[1].value="件";
	txUnit.options[1].value = htmlencode("件");
	txUnit.options[1].text = "件";

	SelectedDl(txUnit,document.all["dlFileUnitS"].value);
	InsertRow.cells[5].appendChild(txUnit);
	
	//0990923 取消單號[0990006]及[0990213]之修改 0990118 Johnny --start
	//0990125 收文性質[0990006]-Jane
	/*var txRcv = document.createElement("select");
	txRcv.setAttribute("id","dg1__ctl"+len+"_dlRcvProperty");
	
	var strRcvP = document.all["H_RcvProperty"].value;
	var arrRcv = strRcvP.split(';');
	txRcv.length=arrRcv.length+1;
	txRcv.options[0].value="";
	txRcv.options[0].text="		";
	for(var i=0;i<arrRcv.length;i++)
	{
		var arrValue = arrRcv[i].split(':');
		txRcv.options[i+1].value=arrValue[0];
		txRcv.options[i+1].text=arrValue[1];
	}	
	
	InsertRow.insertCell(6).appendChild(txRcv);
	InsertRow.cells(6).setAttribute("align","left");*/
		//0990413 有權限的人才可維護已結案子文,沒有權限的人-創稿:維護發文性質;收文:維護收發文性質[0990213]-Jane
		/*if(strNewByOu!="N")
			txRcv.disabled=true;
		else
		{
			if(strRcvProperty!=null)
				SelectedDl(txRcv,strRcvProperty);
		}*/
	/*if(strRcvProperty!=null)
			SelectedDl(txRcv,strRcvProperty);
	if(document.all["txPTY"].value=="Y")//有權限的人
	{
		if(strNewByOu!="N")//創稿不可以維護收文性質
			txRcv.disabled=true;
	}
	else//沒有權限的人
	{
		if(strCloseDate=="")//子文未結案
		{
			if(strNewByOu!="N")//創稿不可以維護收文性質
				txRcv.disabled=true;
		}
		else//已結案
			txRcv.disabled=true;
	}
	
	//0990125 發文性質[0990006]-Jane
	var txIssue = document.createElement("select");
	txIssue.setAttribute("id","dg1__ctl"+len+"_dlIssueProperty");
	
	var strIssueP = document.all["H_IssueProperty"].value;
	var arrIssue = strIssueP.split(';');
	txIssue.length=arrIssue.length+1;
	txIssue.options[0].value="";
	txIssue.options[0].text="		";
	for(var i=0;i<arrIssue.length;i++)
	{
		var arrValue = arrIssue[i].split(':');
		txIssue.options[i+1].value=arrValue[0];
		txIssue.options[i+1].text=arrValue[1];
	}	

	InsertRow.insertCell(7).appendChild(txIssue);
	InsertRow.cells(7).setAttribute("align","left");*/
		//0990413 有權限的人才可維護已結案子文,沒有權限的人-創稿:維護發文性質;收文:維護收發文性質[0990213]-Jane
		/*if(strNewByOu!="Y")
			txIssue.disabled=true;
		else
		{
			if(strIssueProperty!=null)
				SelectedDl(txIssue,strIssueProperty);
		}*/
	/*if(strIssueProperty!=null)
			SelectedDl(txIssue,strIssueProperty);
	if(document.all["txPTY"].value!="Y")//沒有權限的人
	{
		if(strCloseDate!="")//子文已結案
			txIssue.disabled=true;
	}*/
	//0990923 取消單號[0990006]及[0990213]之修改 0990118 Johnny --end
	
	//document.all["txComNo"].value = "";
	document.all["txComFileCnt"].value = "";
	//0990303 將單位下拉選單的值恢復為初始值[0990123]-Jane
	document.all["dlFileUnitS"].selectedIndex=0;
	document.all["txComNo"].select();
}
//0990125 選擇下拉選單選項[0990006]-Jane
function SelectedDl(arrDl,arrValue)
{
	for(var i=0;i<arrDl.length;i++)
	{
		if(arrDl.options[i].value==arrValue)
		{
			arrDl.selectedIndex=i;
			return;
		}
	}
}

//全選
function fnSelectAll()
{
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		document.all["dg1__ctl"+iRow+"_cbunSelect"].checked = true;
	}
}
//反向
function fnReverse()
{
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		document.all["dg1__ctl"+iRow+"_cbunSelect"].checked = !(document.all["dg1__ctl"+iRow+"_cbunSelect"].checked)
	}		
}

function txComNo_onblur()
{
	if(OriginalKeyCode==13) //輸入enter時
		fnAddNew();
}

//1080118 Zen 1080049 弱掃Reflected XSS Specific Clients修正
//1080214 Joe         1080179 弱掃修正Client Potential XSS--S
// function HtmlDecode(s)
// {
    // var div = document.createElement('div');
    // div.innerHTML = s;
    // return div.textContent;
// }
//1080214 Joe         1080179 弱掃修正Client Potential XSS--E
//1100922	Joe		1100991		弱掃修正Client Potential XSS
function htmlencode(s){
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}