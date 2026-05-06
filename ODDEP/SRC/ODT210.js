/*
DATE	SA		PRG		MGR_NO		DESC
0951229	Stella	Charles				取權杖隱藏欄位避免ODI260預覽列印自網址參數取無權杖造成GetFirstUnit錯誤
0961122	Stella	Stella				若未執行開啟動作(即ODI260未成功顯示時不允許執行刪除)
0980309	Stella	Yvonne	0980067		輸入文號後直接開啟，公文文號若不存在需有提示訊息
0980811 Stella  Jane    0980375     修改允許承辦人在下一流程點尚未開啟公文前,將創稿公文撤回至草稿資料夾
                                    (允許承辦人在傳送對象尚未讀取訊息前,可刪除創稿公文的第二個流程點)
1040925	David	Cloud	1040622		提供按鈕開啟EDT212
1050304	David	Kevin_C	1050048		將公文文號的空白去掉
1050817	David	David	1050087		二代公文修改
1080312 Cloud   Cloud   1080021     非管理員/承辦人時，不顯示流程
1090218	Cloud			1090140		修正開啟oidi260時未串入機關代碼，導致多機關使用的機關代碼錯誤問題
1100201	Leslie	Joe		1090927		取消使用document.activeElement
1100727 Cloud	Cloud	[1100823]	修改輸入欄位onblur再抓取實際執行序
1110622	Cloud	Cloud	1110335		新增異動撤銷紀錄
1110712 Cloud   Cloud	1110335		應取得odt210用的序來判斷
1110111	Cloud   Cloud	1110335		修改抓取隱藏欄位邏輯，避免再有增加時會發生抓錯資訊問題
1120112 Cloud   Cloud   1111316     增加判斷是否有document.all.bDocEmp 再串
1130827	Cloud   Cloud   1130874     修正連續撤銷會異常的問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
var CheckDocNoID;
//1050817 David 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//0980309	0980067	Yvonne	紀錄是否已檢核(避免跳兩次訊息)
var isCheck = false;
//1110622	Cloud	1110335		新增異動撤銷紀錄-S
AjaxPro.Request.prototype.timeout = function () {
	try {
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false) {
			this.abort();
		} else {
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error) {

	}
	finally {

	}
}
//1110622	Cloud	1110335		新增異動撤銷紀錄-E
function ShowMsg()
{
	//1050817 David 1050087 二代公文修改
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
	
	switch (xObjectName)
	{
		/*
		case "":
			break;
		*/
	}	
}

//1050817 David 1050087 二代公文修改
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
	
	//1050817 David 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !CheckBeforOpen();			
			//1050817 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050817 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !CheckBeforDel();
			if(!Page_BlockSubmit)
				ShowBottomEmpty();
			//1050817 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			//1110622	Cloud	1110335		新增異動撤銷紀錄-S
			if(!Page_BlockSubmit)
			{
				var ODT210TODO_LISTINFO = new Object();
				ODT210TODO_LISTINFO.Info = new Array();
				var objInedx = 0;
				 /*public string Seq_No;       //序
				public string SubFolder;       //公文狀態
				public string MsgID;       //流程序號
				public string DeptName;      //作業單位
				public string RpsEmpName;        //負責人員
				public string SingTime;        //接收時間
				public string TxTime;        //送出時間
				public string TxName;        //異動別
				public string AppName;        //核決者*/
				//取得dg 製作物件
				//1110111	Cloud   1110335		修改抓取隱藏欄位邏輯，避免再有增加時會發生抓錯資訊問題
				var iseq = 0;
				for (var i = 1; i < parent.bottom.document.all["dg1"].rows.length; i++) {
					ODT210TODO_LISTINFO.Info[objInedx] = new Object();
					iseq=i+1;
					//1110111	Cloud   1110335		修改抓取隱藏欄位邏輯，避免再有增加時會發生抓錯資訊問題
					//ODT210TODO_LISTINFO.Info[objInedx].Seq_No = parent.bottom.document.all["dg1"].rows[i].children[0].children[0].textContent.trim();
					//ODT210TODO_LISTINFO.Info[objInedx].MsgID = parent.bottom.document.all["dg1"].rows[i].children[0].children[4].textContent.trim();
					ODT210TODO_LISTINFO.Info[objInedx].Seq_No = parent.bottom.document.all["dg1__ctl"+iseq.toString()+"_lbSeq"].innerText;
					ODT210TODO_LISTINFO.Info[objInedx].MsgID = parent.bottom.document.all["dg1__ctl"+iseq.toString()+"_h_txMsgID"].innerText;
					ODT210TODO_LISTINFO.Info[objInedx].SubFolder = parent.bottom.document.all["dg1"].rows[i].children[1].textContent.trim();
					ODT210TODO_LISTINFO.Info[objInedx].DeptName = parent.bottom.document.all["dg1"].rows[i].children[2].textContent.trim();
					ODT210TODO_LISTINFO.Info[objInedx].RpsEmpName = parent.bottom.document.all["dg1"].rows[i].children[3].textContent.trim();
					ODT210TODO_LISTINFO.Info[objInedx].SingTime = parent.bottom.document.all["dg1"].rows[i].children[5].textContent.trim().replaceAll('/', '').replaceAll(':', '').replaceAll(' ', '');
					ODT210TODO_LISTINFO.Info[objInedx].TxTime = parent.bottom.document.all["dg1"].rows[i].children[6].textContent.trim().replaceAll('/', '').replaceAll(':', '').replaceAll(' ', '');
					ODT210TODO_LISTINFO.Info[objInedx].TxName = parent.bottom.document.all["dg1"].rows[i].children[8].textContent.trim();
					ODT210TODO_LISTINFO.Info[objInedx].AppName = parent.bottom.document.all["dg1"].rows[i].children[10].textContent.trim();
				    //1110712 Cloud   Cloud	1110335		應取得odt210用的序來判斷
					//1110111	Cloud   1110335		修改抓取隱藏欄位邏輯，避免再有增加時會發生抓錯資訊問題
					//ODT210TODO_LISTINFO.Info[objInedx].DelSeq_No = parent.bottom.document.all["dg1"].rows[i].children[0].children[1].textContent.trim();
					ODT210TODO_LISTINFO.Info[objInedx].DelSeq_No = parent.bottom.document.all["dg1__ctl"+iseq.toString()+"_lbODT210Seq"].innerText;
					objInedx++;
				}
				
				var strRtn = OD.ODT210.SaveData(ODT210TODO_LISTINFO, document.all["nSourceOrgno"].value, document.all.txDocNo.value, document.all.txSeqNo.value, document.all.txShowSeqNo.value).value;
				if (strRtn.strErrMsg.indexOf("Err-") == -1) {
					document.all["h_Guid"].value = strRtn.strGuid;
					jf_ToolBarSubmit(xObjectName);
				}
				else {
					//1111213	Cloud 修正錯誤訊息不完全問題
					//alert(strRtn.strErrMsg.split('-')[1]);
					alert(strRtn.strErrMsg);
				    Page_BlockSubmit = true;
				}
			}
			//1110622	Cloud	1110335		新增異動撤銷紀錄-E
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			if(!Page_BlockSubmit)
				ShowBottomEmpty();
			//1050817 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			document.all["txDocNo"].focus();
			break;
		case "btSearch":
			//SAMPLE CODE
			/*
			var strUrl = "";
			xOldKey = document.all["txUserName"].value;
			strUrl = "SYM020C1.aspx?rtnObj=lbReturnValue&m=p&kv1="+xOldKey;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			jf_OpenChildWin(strUrl, "子視窗名稱", 700, 500 );
			*/
			break;
		case "btPrint":
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
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
			//1050817 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
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
			//1050817 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1040925	Cloud	[1040622]	提供按鈕開啟EDT212
		case "btDeleteThread":
			Page_BlockSubmit = true;
			var strDocNo = document.all["txDocNo"].value;
			var strUrl = "../../ED/ED2/EDT212.aspx?SAMLart=" + document.all.nArtifact.value + "&argDocNo=" + strDocNo;
			jf_OpenChildWin(strUrl, "EDT212");
			break;
	}
}

//###############################################################################
//							Button Click Function
//###############################################################################
function CheckBeforOpen()
{
	
	/*if(jf_Trim(document.all.txDocNo.value) == "" )
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["開啟前請先指定公文文號"])),"");						
		return false;
	}*/
	//0980309	0980067	Yvonne	輸入文號後直接開啟，公文文號若不存在需有提示訊息
	if(txDocNo_onblur())
	{
		if(jf_CheckKeyObject())	
		{
			//Charles 取權杖隱藏欄位避免ODI260預覽列印自網址參數取無權杖造成GetFirstUnit錯誤 0951229
			//1080312 Cloud   1080021     非管理員/承辦人時，不顯示流程-調整為不先進行帶入
			//parent.bottom.location.href="ODI260.aspx?SAMLart="+document.all.nArtifact.value+"&pDocNo="+document.all.txDocNo.value+"&nFrom=ODT210";
			return true;
		}
		else
			return false;
	}
	else
		return false;
}
//刪除前檢查
function CheckBeforDel()
{
	//Ericks start 2005/10/14
	//0961122 Stella 若未執行開啟動作(即ODI260未成功顯示時不允許執行刪除)
	if(!parent.bottom.document.all["NonDelSeq"])
		return;
	//1100727 Cloud	[1100823]	檢核邏輯移至ODI260 增加取得不可銷序號
	document.all["h_TxCanDelSeqNo"].value = parent.bottom.document.all["h_TxCanDelSeqNo"].value;
	
	var strNonDelSeq = parent.bottom.document.all["NonDelSeq"].value;
	var SeqArray = strNonDelSeq.split(",");		
	var strlastSeq = SeqArray[SeqArray.length - 1];
	//1130827	Cloud   1130874     修正連續撤銷會異常的問題連續異動撤銷，補上重抓畫面序
	fnGetActiveSeq();
    
	if (  document.all["txSeqNo"].value*1 <= strlastSeq*1 )
	{
		//1100727 Cloud	[1100823]	修改輸入欄位onblur再抓取實際執行序-換為顯示序
		//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["流程序號" + document.all["txSeqNo"].value +"為檔案室退文之記錄，不允許透過本程式刪除之。請重新進行歸檔"])),"");	
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["流程序號" + document.all["txShowSeqNo"].value +"為檔案室退文之記錄，不允許透過本程式刪除之。請重新進行歸檔"])),"");
		return false;
	}	
	//Ericks end 2005/10/14
			
	if(document.all.h_TxCanDelSeqNo.value == "0")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您目前對此筆公文無刪除異動權限"])),"");	
		return false;
	}
	if(!CheckNotEmptyAndAlert("txSeqNo","刪除序號"))
		return false;
	//caesar 0940216
	// 如果是創稿,不允許刪除至原點
	//if(document.all.nNewByOu.value=="Y")
	//0980811 若為創稿,且無第二個流程點或已被讀取則不允許刪除至原點[0980375]-Jane
	if(document.all.nNewByOu.value=="Y" && document.all.nSignTime.value == "N")
	{
		if(StringGetInt(document.all.txSeqNo.value) <= 2)
		{
			//0980811 修改錯誤訊息,使其符合現行狀況[0980375]-Jane
			//1100727 Cloud	[1100823]	修改輸入欄位onblur再抓取實際執行序-換為顯示序
			//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公文目前已被讀取，無法撤銷序號"+StringGetInt(document.all.txSeqNo.value)+"的流程。"])),"");
			//FocusAt(document.all.txSeqNo);
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公文目前已被讀取，無法撤銷序號" + StringGetInt(document.all.txShowSeqNo.value)+"的流程。"])),"");
			//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前指定刪除之序"+StringGetInt(document.all.txSeqNo.value)+",已超出您被允許之處理範圍"])),"");						
			FocusAt(document.all.txShowSeqNo);
			return false;
		}
	}
	
	if(CompareNumber(StringGetInt(document.all.txSeqNo.value),StringGetInt(document.all.h_TxCanDelSeqNo.value)))
	{
		//1100727 Cloud	[1100823]	修改輸入欄位onblur再抓取實際執行序-換為顯示序
		//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前指定刪除之序"+StringGetInt(document.all.txSeqNo.value)+",已超出您被允許之處理範圍"])),"");						
		//FocusAt(document.all.txSeqNo);
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前指定刪除之序" + StringGetInt(document.all.txShowSeqNo.value)+",已超出您被允許之處理範圍"])),"");
		FocusAt(document.all.txShowSeqNo);
		return false;
	}
	if(StringGetInt(document.all.txSeqNo.value) == 0)
	{
		//1100727 Cloud	[1100823]	修改輸入欄位onblur再抓取實際執行序-換為顯示序
		//FocusAt(document.all.txSeqNo);	
		FocusAt(document.all.txShowSeqNo);
		return false;
	}
			
	return true;
	
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
		{
			// 新增模式需檢查鍵值是否已存在
			if (jf_GetActionMode()==LayoutModeNew)
			{
				if(jf_CheckDataExist())//檢查鍵值是否已存在
				{
					//所顯示訊息請各自系統自行規劃
					//以下訊息以檔管系統範例
					//  
					//	if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					//	bRtnbool = true;
					//
				}
				else
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
	}
	return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
	var bRtnbool = false;
	
	return bRtnbool;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = false;
	
	return bRtnbool;
}


//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################

function CallBack(argCallerId)
{
	/*
	//將lbReturnValue的資料帶入適當的欄位
	if (argCallerId == "SYM020C1")
	{
		document.all["txUserName"].value = document.all["lbReturnValue"].options[0].value;
		document.all["txUserNameTxChange"].value = document.all["txUserName"].value;
		//回傳值為鍵值時，觸動TextChange事件
		//__doPostBack();//for .NET Framework 1.0
		__doPostBack("","");//for .NET Framework 1.1
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	
	*/

}

function ClientOnLoad()
{
    //1100729 Cloud [1100647] 由通知開啟時撤銷完就關閉
    if (document.all.closewin) {
        ShowBottomEmpty();
        if (document.all.closewin.value != "") {
            alert(document.all.closewin.value);
        }
        parent.close();
    }
	$(".footStatus").hide();
	ShowMsg();
	//1050817 David 1050087 二代公文修改
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	if (document.all.nDelDocNo != null)
	{
		//Charles 取權杖隱藏欄位避免ODI260預覽列印自網址參數取無權杖造成GetFirstUnit錯誤 0951229
		//1100727 Cloud	[1100823]	修改輸入欄位onblur再抓取實際執行序 -增加傳入是否為承辦人，用於判斷是否啟用非承辦人/管理員不可撤銷時是否顯示流程
	    parent.bottom.location.href = "ODI260.aspx?SAMLart=" + document.all.nArtifact.value + "&pDocNo=" + document.all.nDelDocNo.value + "&nFrom=ODT210";
	    if (document.all.bDocEmp)
	        parent.bottom.location.href += "&bEmp=" + document.all.bDocEmp.value;
	}
	else
	{
		
		//1080312 Cloud   1080021     非管理員/承辦人時，不顯示流程
	    if (document.all.txDocNo.value != "") {
	        if (document.all.h_txShowOdi260.value == "N") {
	            alert('無本分公文異動撤銷權限，不進行開啟。');
	        }
	        else
	            //1090218	Cloud	1090140	修正開啟oidi260時未串入機關代碼，導致多機關使用的機關代碼錯誤問題
	            //parent.bottom.location.href = "ODI260.aspx?SAMLart=" + document.all.nArtifact.value + "&pDocNo=" + document.all.txDocNo.value + "&nFrom=ODT210";
	            //1100727 Cloud	[1100823]	修改輸入欄位onblur再抓取實際執行序 -增加傳入是否為承辦人，用於判斷是否啟用非承辦人/管理員不可撤銷時是否顯示流程
	            //parent.bottom.location.href = "ODI260.aspx?SAMLart=" + document.all.nArtifact.value + "&pDocNo=" + document.all.txDocNo.value + "&nFrom=ODT210&SOURCE_ORGNO=" + document.all["nSourceOrgno"].value;
	            //1120112   Cloud   1111316 增加判斷是否有document.all.bDocEmp 再串
	            //parent.bottom.location.href = "ODI260.aspx?SAMLart=" + document.all.nArtifact.value + "&pDocNo=" + document.all.txDocNo.value + "&nFrom=ODT210&SOURCE_ORGNO=" + document.all["nSourceOrgno"].value + "&bEmp=" + document.all.bDocEmp.value;
	            if (document.all.bDocEmp)
	                parent.bottom.location.href = "ODI260.aspx?SAMLart=" + document.all.nArtifact.value + "&pDocNo=" + document.all.txDocNo.value + "&nFrom=ODT210&SOURCE_ORGNO=" + document.all["nSourceOrgno"].value + "&bEmp=" + document.all.bDocEmp.value;
	            else
	                parent.bottom.location.href = "ODI260.aspx?SAMLart=" + document.all.nArtifact.value + "&pDocNo=" + document.all.txDocNo.value + "&nFrom=ODT210&SOURCE_ORGNO=" + document.all["nSourceOrgno"].value;
	    }

	}
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult)
{
    //webserver回傳後動作
    //檢查回傳的webserverID
    if (argResult.id == CheckDocNoID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			if(!argResult.value.RtnBool)
			{
				//0980309	0980067	Yvonne	調整執行順序，避免訊息跳兩次
				var strDocNo = document.all.txDocNo.value;
				document.all.txDocNo.value = "";
				FocusAt(document.all.txDocNo);
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入之文號"+strDocNo+"不存在"])),"");										
				
			}
			else
				isCheck = true;
		}
	}	
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].innerText = obj.value;
}


//###############################################################################
//						Server端Register之Function
//###############################################################################
function txDocNo_onblur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	//1100201	Joe		1090927		取消使用document.activeElement
	// if ( (document.activeElement.id == "btCancel") ) return;
	if ( (event.target.id == "btCancel") ) return;
	
	//1050304	Kevin_C	1050048	將公文文號的空白去掉
	document.all.txDocNo.value = jf_Trim(document.all.txDocNo.value);

	//0980813 Stella 取文號前需先使用Trim避免空白造成異常
	if(jf_Trim(document.all.txDocNo.value) == "")
	{
		//0980309	0980067	Yvonne	輸入文號後直接開啟，公文文號若不存在需有提示訊息
		isCheck = false;
		return false;
	}
	var arWSParam = new Array(3);
	arWSParam[0] = "TODO_LIST";
	var arFieldName = new Array(2);
	arFieldName[0] = "SOURCE_ORGNO";
	arFieldName[1] = "DOC_NO";
	arWSParam[1] = arFieldName;
	var arFieldValue = new Array(2);
	arFieldValue[0] = document.all.SourceOrgNo.value;
	////0980813 Stella 取文號前需先使用Trim避免空白造成異常
	arFieldValue[1] = jf_Trim(document.all.txDocNo.value);
	arWSParam[2] = arFieldValue;
	callObj = jf_CallWS("template/lib/sys.asmx","CheckDataKeyDuplicate",false,arWSParam);
	CheckDocNoID = callObj.id;
	OnWSResult(callObj);
	//0980309	0980067	Yvonne	輸入文號後直接開啟，公文文號若不存在需有提示訊息
	if(isCheck)
		return true;
}
//Client端物件onblur事項檢查範例
/*//範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btCancel") ) return;
	
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		if (document.all["txGrp_No"].value != "")
		{
			Page_BlockSubmit=true;
			
			arKeyName[0]    = "GRP_NO";
			arKeyValue[0]   = document.all["txGrp_No"].value;
			arRtnFldName[0] = "GRP_NAME";
			arOrdFldName[0] = "GRP_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "GRP_HEADER";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
			wsGetGrpNameID = callObj.id;
			OnWSResult(callObj);
		}
	}
}
*/
/*
//檢查日期格式並Alert訊息
function txPostDate_onblur()
{
	if(!CheckDate(document.all.txPostDate,"郵寄日期"))
		FocusAt(document.all.txPostDate);
}
*/


//###############################################################################
//						private Function
//###############################################################################
function SetControlDisable(argControlName)
{	
	document.all[argControlName].disabled  = true;
	if(document.all[argControlName].type == "text")
		document.all[argControlName].style.backgroundColor = "LightGrey";
}

function SetControlEnable(argControlName)
{
	document.all[argControlName].disabled  = false;
	if(document.all[argControlName].type == "text")
		document.all[argControlName].style.backgroundColor = "";
}

function SetControlDisplay(argControlName)
{
	document.all[argControlName].style.display = "block";
}
function SetControlHidden(argControlName)
{
	document.all[argControlName].style.display = "none";
}
function SetCombBoxDisable(argControlName)
{
	SetControlDisable(argControlName+"_Text");
	SetControlDisable(argControlName);
}
 
function SetCombBoxEnable(argControlName)
{
	SetControlEnable(argControlName+"_Text");
	SetControlEnable(argControlName);
}



function FocusAt(argObj)
{
	if(!argObj.disabled)
		argObj.focus();
}

//檢查日期格式,並顯示訊息
function CheckDate(argObj,argObjName)
{
	if(argObj.value != "")
	{
		jf_PADCHAR(argObj,7,'0');
		if(!jf_CheckCDATE(argObj.value))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName+"格式不正確"])),"");						
			//FocusAt(argObj);
			return false;
		}
	}
	return true;
}

//比較數字大小
//如果argNum1 < argNum2則回傳false
//如果argNum1 >= argNum2則回傳true
function CompareNumber(argNum1,argNum2)
{
	if(argNum1 == Math.max(argNum1,argNum2))
		return false;
	else
		return true;
}
//去除0取得真正的數字
function StringGetInt(argNumStr)
{
	var num = argNumStr;
	
	if(num.length > 0)
	{
		if(argNumStr.charAt(0) == "0")
			num = argNumStr.substr(1,argNumStr.length-1);
		if(num.charAt(0) == "0" )
			num = StringGetInt(num)
	}
	return num;
}

//透過Value值選取DropDownList中的Item
function SetDDlSelectByValue(argSelectId,argSelectValue)
{
	if(argSelectValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		//有可能Value的形式為 v1,v2,v3
		if(GetValueFromValueArray(document.all[argSelectId].options[i].value) == argSelectValue)
		{
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}

//會取得 "t1,t2,t3"結構中的第argIndex個值
function GetValueFromValueArray(argValueArray,argIndex)
{
	var RtnValueArray = argValueArray.split(",");
	return RtnValueArray[argIndex];
}

//透過Text值選取DropDownList中的Item
function SetDDlSelectByText(argSelectId,argSelectText)
{
	if(argSelectValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		if(document.all[argSelectId].options[i].Text == argSelectText)
		{
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName,argFieldName)
{
	if(document.all[argObjName].value == "")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName+"不可為空白"])),"");						
		FocusAt(document.all[argObjName]);
		return false;
	}
	return true;
}

//取得在Datagrid中動作時之Control Row index
function getRowIndex()
{
   //return intRowIndex = event.srcElement.parentElement.rowIndex;   
	var xObjectName = event.srcElement.id;
	return xObjectName.substring(8,xObjectName.indexOf("_",8));   
}

//依照ID取得Toolbar物件
//用法：
//var TxDocNoObj =  getToolBarItemObjById("btOpen");
//TxDocNoObj.setAttribute("Text","TTT");
function getToolBarItemObjById(argId)
{
	for(var i=0;i<document.all.tbTool.numItems;i++)
	{
		if(document.all.tbTool.getItem(i).getAttribute("ID") == argId)
			return document.all.tbTool.getItem(i);		
	}
}

function ShowBottomEmpty()
{
	parent.bottom.location.href="ODT210Bottom.htm";	
}
//1100727 Cloud	[1100823]	修改輸入欄位onblur再抓取實際執行序-S
function fnGetActiveSeq() {

    var bHasData = false;
	if (!parent.bottom.document.all["dg1"])
	    return;
	if (document.all["txShowSeqNo"].value == "")
	    document.all["txSeqNo"].value = "";
	for (var i = 2; i <= parent.bottom.document.all["dg1"].rows.length; i++) {
	    if (parent.bottom.document.all["dg1__ctl" + i + "_lbSeq"].innerText == document.all["txShowSeqNo"].value) {
	        bHasData = true;
		    document.all["txSeqNo"].value = parent.bottom.document.all["dg1__ctl" + i + "_lbODT210Seq"].innerText;
		}
	}
	if (!bHasData)
	    document.all["txSeqNo"].value = "99999";
}
//1100727 Cloud	[1100823]	修改輸入欄位onblur再抓取實際執行序-E