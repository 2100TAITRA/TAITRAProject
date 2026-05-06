/*
DATE	SA		PRG		MGR_NO	DESC
1010103 David	kevin	1000976	新增EDT230 人民陳情案件回覆作業 - 標檢局專用
1010308 Kevin	Ivory	1000976	補齊Mail之通報資料
1010328	Yvonne	Yvonne	----	(標檢局)意見信箱整合機制調整
1010417	Kevin	Ivory	1010253	更動SUGGEST_WS定義新增一組設定是否傳入公文文號
1020308	Kevin	Kevin	--		修正Call AJAX發生錯誤的錯誤處理
1020902	Kevin	Erin	1020658	新增可回覆多筆(有設定彙併辦)意見信箱案件
1021014 --		Erin	1020658	修正call WS回傳的值為陣列
1040206 David	Eric	1030899	新增呼叫GIP系統WS多傳入單位代碼、名稱
1061003 David	Joe		1060284	升4.5新增ClientButtonControl
1110913 Kevin   Zen     1110981 GIP系統WS多傳入文號
1120322 --      Cloud   1120211 升級二代
1120428	--		Cloud	--		擴大子視窗預設大小
1130521 Zen		Alexander 1130464 新增全選、反選、清除功能
*/

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1120322 --      Cloud   11202111 升級二代
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

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

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1120322 --      Cloud   11202111 升級二代
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//1120322 Cloud 1120211 升級二代
	/*richedit.appendHTML(document.all.txContent.value); //顯示內文
	richedit.setFocus(); //設定focus到內文區
	RTELoaded(window.richedit);*/
    if (document.all["dg1"].className != "hide")
    { document.all["dgDiv"].className = ""; }
    else
        document.all["dgDiv"].className = "hide";
	
}
//1120322 --      Cloud   11202111 升級二代
//function RTELoaded(w)
//{
	//w.setToolbar("tbimage",false)
	//w.setSkin("#idToolbar {border: 1px black solid; background:#FFFFFF}")
	//if (document.composeform && document.composeform.RTEbgcolor.value != "")
		//window.richedit.setBGColor(document.composeform.RTEbgcolor.value);
//}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1061003	Joe		1060284		升4.5新增--S
function ClientButtonControl()
{
	
	var xObjectName = document.activeElement.id;
	
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
	}	
}
//1061003	Joe		1060284		升4.5新增--E
/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1120322 --      Cloud   11202111 升級二代
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
    //1120322 --      Cloud   11202111 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btOpen":
		    Page_BlockSubmit = !jf_CheckBeforOpen();
		    //1120322 --      Cloud   11202111 升級二代
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_CheckBeforSave()) //是否通過儲存前必要檢查
			{
				//1010328	Yvonne	對方狀態代碼為01(收件)、02(辦理中)、03(錄存續辦)、04(結案)
				//CallSuggestWS("02");				
				//CallSuggestWS("03");
				//1020308 Kevin 修正Call AJAX發生錯誤的錯誤處理
				var strRtn = CallSuggestWS("03");
				//1020308 Kevin 修正Call AJAX發生錯誤的錯誤處理
				//if (CallSuggestWS("03") == "true")
				//1021014 Erin [1020658] 修改傳回value
				//if (strRtn == "true")
				if (strRtn[0].value == "true")
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
				{
					//1020308 Kevin 修正Call AJAX發生錯誤的錯誤處理
					//1021014 Erin [1020658] 修改傳回value
					//alert(strRtn);
					alert(strRtn[0].value);
					Page_BlockSubmit = true;
				}
			}
			else
				Page_BlockSubmit = true;
		    //1120322 --      Cloud   11202111 升級二代
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClose":
			if(jf_CheckBeforSave()) //是否通過儲存前必要檢查
			{
				//1010328	Yvonne	對方狀態代碼為01(收件)、02(辦理中)、03(錄存續辦)、04(結案)
				//CallSuggestWS("03");
				//CallSuggestWS("04");
				//1020308
				var strRtn = CallSuggestWS("04");
				//if (CallSuggestWS("04") == "true")
				//1021028 Erin [1020658] 修改傳回value
				//if (strRtn == "true")
				if (strRtn[0].value == "true")
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
				{
					//1020308 Kevin 修正Call AJAX發生錯誤的錯誤處理
					//1021028 Erin [1020658] 修改傳回value
					//alert(strRtn);
					alert(strRtn[0].value);
					Page_BlockSubmit = true;
				}
			}
			else
				Page_BlockSubmit = true;
		    //1120322 --      Cloud   11202111 升級二代
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	    case "btCancel":
	        //1120428 --      Cloud   11202111 升級二代
			//richedit._initEditor();
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1120322 --      Cloud   11202111 升級二代
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
			var strUrl = "EDR231.aspx?rtnObj=lbReturnValue";
			//1120428	--		Cloud	--		擴大子視窗預設大小
			Page_BlockSubmit = true;
			//jf_OpenChildWin(strUrl, "EDR231",800 , 600 );
			jf_OpenChildWin(strUrl, "EDR231",1280 , 720 );
			break;
		//1130521 Alexander	1130464 新增全選、反選、清除功能
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbChoose");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbChoose");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbChoose");
			break;
	}
}

//開啟
function jf_CheckBeforOpen()
{
	if(document.all.txSuggestNo.value=="" && document.all.txDocNo.value=="") 
	{
		jf_ShowMeg("請輸入郵件編號或公文文號。","");
		document.all.txSuggestNo.focus();
		return false;
	}
	return true;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var strErrMsg= "";
    //1120322 --      Cloud   11202111 升級二代
	//document.all.txContent.value = richedit.getHTML();
	
	if (document.all["txContent"].value == "")
	{
		strErrMsg += "內容不可空白\n";
		document.all["txEmail"].focus();
	}
	
	if (document.all["txSubject"].value == "")
	{
		strErrMsg += "主旨不可空白\n";
		document.all["txEmail"].focus();
	}
	
	if (document.all["txEmail"].value == "")
	{
		strErrMsg += "收文者EMAIL不可空白\n";
		document.all["txEmail"].focus();
	}

	if (strErrMsg != "")
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		return false;
	}

	return jfSendMail();
}

function jfSendMail()
{
	var strEmail	= jf_Trim(document.all["txEmail"].value);
	var strOrgName	= jf_Trim(document.all["txOrgName"].value);
	var strSubject  = jf_Trim(document.all["txSubject"].value);
	var strContent  = jf_Trim(document.all["txContent"].value);
	//1010308 Ivory 1000976 多傳入機關代碼,郵件編號
	var strSuggest = new Array();
	strSuggest[0] = jf_Trim(document.all["H_SourceOrgno"].value);	
	strSuggest[1] = jf_Trim(document.all["txSuggestNo"].value);	
	
	var strEmailCcS = new Array();
	strEmailCcS[0] = jf_Trim(document.all["txEmailCc1"].value);
	strEmailCcS[1] = jf_Trim(document.all["txEmailCc2"].value);
	strEmailCcS[2] = jf_Trim(document.all["txEmailCc3"].value);
	strEmailCcS[3] = jf_Trim(document.all["txEmailCc4"].value);
	strEmailCcS[4] = jf_Trim(document.all["txEmailCc5"].value);
	//1010308 Ivory 1000976 多傳入郵件編號
	//var strResult = EDT230.SendMail(strEmail,strOrgName,strSubject,strContent,strEmailCcS);
	//1020902 Erin [1020658] for子文也有回傳值，將strResult改為array
	//var strResult = EDT230.SendMail(strEmail,strOrgName,strSubject,strContent,strEmailCcS,strSuggest);
	var strResult = new Array();
    //1120322 --      Cloud   11202111 升級二代
    //strResult[0] = EDT230.SendMail(strEmail,strOrgName,strSubject,strContent,strEmailCcS,strSuggest);
    strResult[0] = ED2.EDT230.SendMail(strEmail,strOrgName,strSubject,strContent,strEmailCcS,strSuggest);
	//if(strResult.value != "")//1020902 Erin [1020658] for子文，修改條件
	if(strResult[0].value != "")
	{
		//1021014 Erin [1020658] 修改傳回value
		//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strResult.value])),"");
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strResult[0].value])),"");
		return false;
	}
	//1020902 Erin [1020658] 回覆子文mail --start   主文寄送成功後，才做子文部分
	var strSuggCom = ""; var strDocCom = ""; var strSenderEmail=""; var strSubject2="";
	if(dg1.className != "hide")
	{
		for(var i = 0 ; i < dg1.rows.length-1 ; i++)
		{
			if(document.all["dg1__ctl"+(i+2)+"_cbChoose"].checked)
			{
				strSuggCom = "dg1__ctl"+(i+2)+"_lbSuggestNo";//從2開始--第一行(dg1__ctl2_lbSuggestNo)
				strDocCom = "dg1__ctl"+(i+2)+"_lbDocNo";
				strSenderEmail = "dg1__ctl"+(i+2)+"_lbSenderEMail";
				strSubject2 = "dg1__ctl"+(i+2)+"_lbSubject";
				strSuggest[1] = document.all[strSuggCom].innerText; 
				strEmail = document.all[strSenderEmail].innerText;
			    //1120322 --      Cloud   11202111 升級二代
			    //strResult[i+1] = EDT230.SendMail(strEmail,strOrgName,document.all[strSubject2].innerText,strContent,strEmailCcS,strSuggest);
			    strResult[i+1] = ED2.EDT230.SendMail(strEmail,strOrgName,document.all[strSubject2].innerText,strContent,strEmailCcS,strSuggest);
				if(strResult[i+1].value != "") //子文寄送錯誤
				{
					jf_ShowMeg("子文文號："+ document.all[strDocCom].innerText + " 郵件編號："+ document.all[strSuggCom].innerText +" 回覆email失敗!請另行寄送 \n"+
								FormatStr(jf_GetErrMsg(CustErr), new Array([strResult[i].value])),"");
				}
				if(i==0)//將狀態存到隱藏欄位，for有錯誤不update table
					document.all["H_RtnCom"].value += strResult[i+1].value;
				else
					document.all["H_RtnCom"].value += "|" + strResult[i+1].value;
			}
		}
	}
	//1020902 Erin [1020658] 回覆子文mail --end
	return true;
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
	if(argCallerId == "EDR231")
	{
		document.all["txSuggestNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txSuggestNo"].value != "")
		{
			document.all["txDocNo"].value = ""
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txSuggestNo"].focus();
	}

	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
	*/
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CallSuggestWS(argType)
{
	var strSuggestNo = document.all["txSuggestNo"].value;
		
	var RightNow = new Date();
	var time = (RightNow.getFullYear()-1911).toString()
		+jf_PADL((RightNow.getMonth()+1).toString(),2,'0')
		+jf_PADL(RightNow.getDate().toString(),2,'0')
		+jf_PADL(RightNow.getHours().toString(),2,'0')
		+jf_PADL(RightNow.getMinutes().toString(),2,'0');
	//1040206 Eric 1030899	新增呼叫GIP系統WS多傳入單位代碼、名稱
	var strDeptNo = document.all["H_DeptNo"].value;
	var strDeptName = document.all["H_DeptName"].value;

	//1110913 Zen 1110981 GIP系統WS多傳入文號
	var strDocNo = document.all["txDocNo"].value;
		
	//1010328	Yvonne	改為使用ajax叫用測試
	/*var arWSParam = new Array(3);
	arWSParam[0] = argType;
	arWSParam[1] = strSuggestNo;
	arWSParam[2] = time;
	
	if(document.all["SUGGEST_WS"].value!="")
		jf_CallW(document.all["SUGGEST_WS"].value,"modifyMailBoxStatus",false,arWSParam);
	*/
	//1010417 Ivory	1010253	更動SUGGEST_WS定義新增一組設定是否傳入公文文號
	var arrSuggestWs = new Array(2);
	arrSuggestWs[0] = document.all["SUGGEST_WS"].value.split("|")[0];
	//var Rtn = EDT230.CallLWService(document.all["SUGGEST_WS"].value,argType,strSuggestNo,time);
	//1020902 Erin [1020658] for子文也有回傳值，將Rtn改為array
	//var Rtn = EDT230.CallLWService(arrSuggestWs[0],argType,strSuggestNo,time);		
	var Rtn = new Array();
	//1040206 Eric 1030899	新增呼叫GIP系統WS多傳入單位代碼、名稱
	//Rtn[0] = EDT230.CallLWService(arrSuggestWs[0],argType,strSuggestNo,time);	
	//1110913 Zen 1110981 GIP系統WS多傳入文號
    //Rtn[0] = EDT230.CallLWService(arrSuggestWs[0],argType,strSuggestNo,time,strDeptNo,strDeptName);
    //1120322 --      Cloud   11202111 升級二代
    //Rtn[0] = EDT230.CallLWService(arrSuggestWs[0], argType, strSuggestNo, time, strDeptNo, strDeptName, strDocNo);
    Rtn[0] = ED2.EDT230.CallLWService(arrSuggestWs[0], argType, strSuggestNo, time, strDeptNo, strDeptName, strDocNo);
	//1020902 Erin [1020658] 子文call webservice --start 
	var strSuggCom = "";
	if(dg1.className != "hide")
	{
		for(var i = 0 ; i < dg1.rows.length-1 ; i++)
		{
			if(document.all["dg1__ctl"+(i+2)+"_cbChoose"].checked)
			{
				strSuggCom = "dg1__ctl"+(i+2)+"_lbSuggestNo";//從2開始--第一行(dg1__ctl2_lbSuggestNo)
				strSuggestNo = document.all[strSuggCom].innerText;
				//1040206 Eric 1030899	新增呼叫GIP系統WS多傳入單位代碼、名稱
				//Rtn[i+1] = EDT230.CallLWService(arrSuggestWs[0],argType,strSuggestNo,time);	
				//1110913 Zen 1110981 GIP系統WS多傳入文號
			    //Rtn[i + 1] = EDT230.CallLWService(arrSuggestWs[0],argType,strSuggestNo,time,strDeptNo,strDeptName);
			    //1120322 --      Cloud   11202111 升級二代
			    //Rtn[i + 1] = EDT230.CallLWService(arrSuggestWs[0], argType, strSuggestNo, time, strDeptNo, strDeptName, strDocNo);
			    Rtn[i + 1] = ED2.EDT230.CallLWService(arrSuggestWs[0], argType, strSuggestNo, time, strDeptNo, strDeptName, strDocNo);
				if(i==0)//將狀態存到隱藏欄位，for有錯誤不update table
					document.all["H_WSRtnCom"].value += Rtn[i+1].value;
				else
					document.all["H_WSRtnCom"].value += "|" + Rtn[i+1].value;
			}
		}
	}
	//1020902 Erin [1020658] 子文call webservice --end
	//1020308 Kevin 修正取得的回傳值
	//return Rtn;
	//1021014 Erin [1020658] 修改傳回value
	//return Rtn.value;
	return Rtn;
}