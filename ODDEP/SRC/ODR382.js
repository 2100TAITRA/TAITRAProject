/*
DATE	SA		PRG		MGR_NO			DESC
1010427	Kevin	Ivory	1010164			新增依公文文號列印大宗郵件清單
1010824	Kevin	Kevin	1010164			FDA隱藏文號列印
1050606 David   Justin  1050087         二代公文修改
1071001	Leslie	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
1110103	Kevin   Zen     1101292			修正多次點擊重複PostBack之問題
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
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

/*1050606 Justin 1050087 二代公文修改 
document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
if (document.all["ValidationSummary1"].innerText != "")
	alert(document.all["ValidationSummary1"].innerText);*/
jf_ShowValidator();
var xDoc=document.all;

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
	/*
		case "btCalculate":
		if (jf_Trim(document.all.txPostDate.value) == "")
		{
			alert("郵寄日期必須輸入。");
			Page_BlockSubmit=true;
			break;
		}
		if (document.all.dlBulk.selectedIndex == 0 || document.all.dlBulk.selectedIndex == -1)
		{
			alert("大宗掛號單別必須選擇。")
			Page_BlockSubmit=true;
			break;
		}
		Page_BlockSubmit=false;
		break;
		*/
	}	
}

//1050606 Justin 1050087 二代公文修改 
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
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1050606 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		    //1050606 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview": 
			if ( jf_CheckObjectValue() )
			{
			/*
				var arWSParam = new Array();
				var WhereCondition ="";
				if(document.all.txPostDate.value !="" )
					WhereCondition +="  AND A.POST_DATE ='"+document.all.txPostDate.value+"' " ;
				if(document.all.dlBulk.selectedIndex !=-1 && document.all.dlBulk.selectedIndex !=0)
					WhereCondition +="  AND P.DEFAULT_BULK ='"+document.all['dlBulk'].options[document.all['dlBulk'].selectedIndex].value+"'";

				arWSParam[0] = "SELECT A.ORG_NAME,A.POST_CODE,A.ADDRESS,B.POST_COST "
							+	"FROM MAIL_COLLECT A,MAIL_DETAIL B, POST_MAIN P "
							+	"WHERE A.SOURCE_ORGNO= '"+document.all['lbOrgNo'].innerText+"' "
							+	"AND A.SOURCE_ORGNO=B.SOURCE_ORGNO AND A.POST_DATE=B.POST_DATE AND A.SEQ_NO=B.SEQ_NO "
							+	"AND B.SOURCE_ORGNO=P.SOURCE_ORGNO AND B.POST_NO=P.POST_NO "
							+	WhereCondition;

				callObj= jf_CallWS("lib/od_lib.asmx", "CountDataRow", false, arWSParam);
				if(callObj.error)
					alert(callObj.errorDetail.string);
				else
				{
					wsCheckUserID2 = callObj.id;
					OnWSResult(callObj);
				}
				*/
				//1010514	Ivory	1010164	新增預覽列印前檢核
				if( jf_Trim(document.all["txDocNo"].value) != "" && document.all["H_txBatchSum"].value == "" )
					Page_BlockSubmit = !txDocNo_onchange() ;
				else	
					Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050606 Justin 1050087 二代公文修改 
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
    /*1050606 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("lib/od_lib.asmx", "CountDataRow", false, null);*/

	//1010824 Kevin 1010164 FDA隱藏文號列印	
	if(document.all["H_IsHideDiv"].value=="Y")
		document.all["DivDoc"].style.display="none";
}

var wsCheckUserID2;
var Num =0;
function OnWSResult(argResult)
{
    if(argResult.id == wsCheckUserID2)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (argResult.value.RtnNum > 0)
			{
				//計算可用號碼數
				var strS1 = document.all.txNum1S.value;
				var strE1 = document.all.txNum1E.value;
				var strS2 = document.all.txNum2S.value;
				var strE2 = document.all.txNum2E.value;
				var strS3 = document.all.txNum3S.value;
				var strE3 = document.all.txNum3E.value;
				var intS1 = 0;
				var intE1 = 0;
				var intS2 = 0;
				var intE2 = 0;
				var intS3 = 0;
				var intE3 = 0;
				var count = 0;
				if (strS1 != "")
				{
					intS1 = parseInt(strS1,10);
					if (strE1 != "")
						intE1 = parseInt(strE1,10);
					else
						intE1 = 999999;
					count += (intE1-intS1+1);
				}
				if (strS2 != "")
				{
					intS2 = parseInt(strS2,10);
					if (strE2 != "")
						intE2 = parseInt(strE2,10);
					else
						intE2 = 999999;
					count += (intE2-intS2+1);
				}
				if (strS3 != "")
				{
					intS3 = parseInt(strS3,10);
					if (strE3 != "")
						intE3 = parseInt(strE3,10);
					else
						intE3 = 999999;
					count += (intE3-intS3+1);
				}
				if (intS2 != 0)
				{
					if (intS2 == intE1)
						count--;
				}
				if (intS3 != 0)
				{
					if (intS3 == intE2)
						count--;
				}
				if(argResult.value.RtnNum > count)
			    {
					if ( window.confirm("可用號碼小於本次遞送的郵件數，是否繼續列印?") == false)
					{
					    Page_BlockSubmit = true;
					    /*1050606 Justin 1050087 二代公文修改
						document.all.txNum1S.focus();*/
						$('#txNum1S').focus();
					}
					else
						Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = false;				
				/* 
			     if(document.all.txNum1S.value !="" && document.all.txNum1E.value !="")
			     {
			     var count1S=0;
			     for(var i=0;i< document.all.txNum1S.value.toString().length;i++)
			     {
			        if(document.all.txNum1S.value.toString().substr(i,1)==0)
			        {
			        count1S++;
			        }
			        else if(document.all.txNum1S.value.toString().substr(i,1)!=0)
			        {
			         break;
			        }
			     }
			      var count1E=0;
			     for(var i=0;i< document.all.txNum1E.value.toString().length;i++)
			     {
			        if(document.all.txNum1E.value.toString().substr(i,1)==0)
			        {
			        count1E++;
			        }
			        else if(document.all.txNum1E.value.toString().substr(i,1)!=0)
			        {
			         break;
			        }
			     }
			     
			     Num = parseInt(document.all.txNum1E.value.toString().substr(count1E,document.all.txNum1E.value.toString().Length))-parseInt(document.all.txNum1S.value.toString().substr(count1S,document.all.txNum1S.value.toString().Length))+1;
			     }
			     
			    if(document.all.txNum2S.value !="" && document.all.txNum2E.value !="")
			    {
			     var count2S=0;
			     for(var i=0;i< document.all.txNum2S.value.toString().length;i++)
			     {
			        if(document.all.txNum2S.value.toString().substr(i,1)==0)
			        {
			        count2S++;
			        }
			        else if(document.all.txNum2S.value.toString().substr(i,1)!=0)
			        {
			         break;
			        }
			     }
			      var count2E=0;
			     for(var i=0;i< document.all.txNum2E.value.toString().length;i++)
			     {
			        if(document.all.txNum2E.value.toString().substr(i,1)==0)
			        {
			        count2E++;
			        }
			        else if(document.all.txNum2E.value.toString().substr(i,1)!=0)
			        {
			         break;
			        }
			     }
			     Num = Num+parseInt(document.all.txNum2E.value.toString().substr(count2E,document.all.txNum2E.value.toString().Length))-parseInt(document.all.txNum2S.value.toString().substr(count2S,document.all.txNum2S.value.toString().Length))+1;
			     }
			     if(argResult.value.RtnNum >Num)
			     {
				 if ( window.confirm("可用號碼小於本次遞送的郵件數，是否繼續列印?") == false)
				 {
				    Page_BlockSubmit = true;
					document.all.txNum1S.focus();
				 }else Page_BlockSubmit = false;
				 }else Page_BlockSubmit = false;
				 */
			}
			else 
			{
			    Page_BlockSubmit = true;
			    alert("無符合條件資料!!");
			    /*1050606 Justin 1050087 二代公文修改
			    document.all.txPostDate.focus();*/
			    $('#txPostDate').focus();
			 }
		}
		else 
		{
		    Page_BlockSubmit = true;
		}
	}
}

function jf_CheckObjectValue()
{
	var strErr = "";
	var xFocusObj;
	
	//1010427	Ivory	1010164 新增公文文號判斷
	if( jf_Trim(document.all.txDocNo.value)+jf_Trim(document.all.txPostDate.value) == "" )//郵寄日期,公文文號皆為空
	{
		strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "至少必須擇一輸入郵寄日期或公文文號。"]));
		if (xFocusObj == null)
		    /*1050606 Justin 1050087 二代公文修改
			xFocusObj = xDoc.txPostDate;*/
		    xFocusObj = "txPostDate";
	}
	else if( jf_Trim(document.all.txDocNo.value) == "" && jf_Trim(document.all.txPostDate.value) != "" )//公文文號為空,郵寄日期不為空
	{
		//if (jf_Trim(document.all.txPostDate.value) == "" )
		//{
		//	strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["郵寄日期"]));
		//	if (xFocusObj == null)
		//		xFocusObj = xDoc.txPostDate;
		//}
		//if ((document.all.dlBulk.selectedIndex == 0 || document.all.dlBulk.selectedIndex == -1) && xFocusObj == null)
		if ((document.all.dlBulk.selectedIndex == 0 || document.all.dlBulk.selectedIndex == -1) && xFocusObj == null)
		{
			strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["大宗掛號單別"]));
			if (xFocusObj == null)
			    /*1050606 Justin 1050087 二代公文修改
				xFocusObj = xDoc.dlBulk;*/	
			    xFocusObj = "dlBulk";
		}
	}
	
	else if( jf_Trim(document.all.txDocNo.value) != "" )//公文文號不為空時，若郵遞方式未選擇需至ODT380設定
	{
		if ( document.all["dlBatchSendType"].options[document.all["dlBatchSendType"].options.selectedIndex].value == "" && xFocusObj == null )
		{
			strErr += FormatStr(jf_GetErrMsg(CustErr), new Array(["該公文之郵遞方式、郵資、重量未設定，請先進行設定。"]));
			if (xFocusObj == null)
			    /*1050606 Justin 1050087 二代公文修改
				xFocusObj = xDoc.dlBatchSendType;*/	
			    xFocusObj = "dlBatchSendType";
		}		
	}
	var strNum1S = document.all.txNum1S.value;
	var strNum1E = document.all.txNum1E.value;
	var strNum2S = document.all.txNum2S.value;
	var strNum2E = document.all.txNum2E.value;
	var strNum3S = document.all.txNum3S.value;
	var strNum3E = document.all.txNum3E.value;
	var strNum1 = strNum1S+strNum1E;
	var strNum2 = strNum2S+strNum2E;
	var strNum3 = strNum3S+strNum3E;
	var nNum1S = parseInt(strNum1S, 10);
	var nNum1E = parseInt(strNum1E, 10);
	var nNum2S = parseInt(strNum2S, 10);
	var nNum2E = parseInt(strNum2E, 10);
	var nNum3S = parseInt(strNum3S, 10);
	var nNum3E = parseInt(strNum3E, 10);
	//if (xFocusObj == null) 
	if (xFocusObj == null && document.all.rbNo.checked == false )//新增選項[不編制] 略過掛號編制
	{
		if (strNum1+strNum2+strNum3 == "" )
		{
			strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間至少必須輸入一組。"]));
		    /*1050606 Justin 1050087 二代公文修改
			xFocusObj = xDoc.txNum1S;*/
			xFocusObj = "txNum1S";
		}
		else
		{
			if (strNum1 != "")
			{
				if (strNum1S == "")
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間(起)不可為空白。"]));
				    /*1050606 Justin 1050087 二代公文修改
					xFocusObj = xDoc.txNum1S;*/
					xFocusObj = "txNum1S";
				}
				else if (strNum1E == "")
				{
					nNum1E = 999999;
					/*
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間必須同時輸入起訖。"]));
					xFocusObj = xDoc.txNum1E;
					*/
				}
				else if ( nNum1S > nNum1E )
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間起必須小於等於訖。"]));
				    /*1050606 Justin 1050087 二代公文修改
					xFocusObj = xDoc.txNum1S;*/
					xFocusObj = "txNum1S";
				}
			}
			if (strNum2 != "" && xFocusObj == null)
			{
				if (strNum2S == "")
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間(起)不可為空白。"]));
				    /*1050606 Justin 1050087 二代公文修改
					xFocusObj = xDoc.txNum2S;*/
					xFocusObj = "txNum2S";
				}
				else if (strNum2E == "")
				{
					nNum2E = 999999;
					/*
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間必須同時輸入起訖。"]));
					xFocusObj = xDoc.txNum2E;
					*/
				}
				else if ( nNum2S > nNum2E )
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間起必須小於等於訖。"]));
				    /*1050606 Justin 1050087 二代公文修改
					xFocusObj = xDoc.txNum2S;*/
					xFocusObj = "txNum2S";
				}
			}
			if (strNum3 != "" && xFocusObj == null)
			{
				if (strNum3S == "")
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間(起)不可為空白。"]));
				    /*1050606 Justin 1050087 二代公文修改
					xFocusObj = xDoc.txNum3S;*/
					xFocusObj = "txNum3S";
				}
				else if (strNum3E == "")
				{
					nNum3E = 999999;
					/*
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間必須同時輸入起訖。"]));
					xFocusObj = xDoc.txNum3E;
					*/
				}
				else if ( nNum3S > nNum3E )
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間起必須小於等於訖。"]));
				    /*1050606 Justin 1050087 二代公文修改
					xFocusObj = xDoc.txNum3S;*/
					xFocusObj = "txNum3S";
				}
			}
			if ( strNum1 != "" && strNum2 != "" && xFocusObj == null )
			{
				if ( nNum2S < nNum1E )
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間不可重疊。"]));
				    /*1050606 Justin 1050087 二代公文修改
					xFocusObj = xDoc.txNum2S;*/
					xFocusObj = "txNum2S";
				}
			}
			if ( strNum1 != "" && strNum3 != "" && xFocusObj == null )
			{
				if ( nNum3S < nNum1E )
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間不可重疊。"]));
				    /*1050606 Justin 1050087 二代公文修改
					xFocusObj = xDoc.txNum3S;*/
					xFocusObj = "txNum3S";
				}
			}
			if ( strNum2 != "" && strNum3 != "" && xFocusObj == null )
			{
				if ( nNum3S < nNum2E )
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "掛號號碼使用空間不可重疊。"]));
				    /*1050606 Justin 1050087 二代公文修改
					xFocusObj = xDoc.txNum3S;*/
					xFocusObj = "txNum3S";
				}
			}
			if (strNum1 != "" && xFocusObj == null)
			{
				if ( nNum1S <= 0)
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "起始號碼必須大於0。"]));
				    /*1050606 Justin 1050087 二代公文修改
					xFocusObj = xDoc.txNum1S;*/
					xFocusObj = "txNum1S";
				}
			}
			if (strNum2 != "" && xFocusObj == null)
			{
				if ( nNum2S <= 0)
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "起始號碼必須大於0。"]));
				    /*1050606 Justin 1050087 二代公文修改
					xFocusObj = xDoc.txNum2S;*/
					xFocusObj = "txNum2S";
				}
			}
			if (strNum3 != "" && xFocusObj == null)
			{
				if ( nNum3S <= 0)
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array([ "起始號碼必須大於0。"]));
				    /*1050606 Justin 1050087 二代公文修改
					xFocusObj = xDoc.txNum3S;*/
					xFocusObj = "txNum3S";
				}
			}
		}
	}

	if (strErr !="")
	{
		jf_ShowMeg(strErr,"");
	    /*1050606 Justin 1050087 二代公文修改
		xFocusObj.focus();*/
		$('#' + xFocusObj).focus();
		return false;
	}
	return true;
}

function CheckDateS()
{
	var strDateValue ;
	strDateValue = document.all.txPostDate.value;
	if (strDateValue == "")
		return;

	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all.txPostDate.value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["遞送日期"])),"");
	    //1050606 Justin 1050087 二代公文修改
		//document.all.txPostDate.focus();
		$('#txPostDate').focus();
	}
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050606 Justin 1050087 二代公文修改 
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

function dlTime_onchange()
{
	var index = document.all["dlTime"].selectedIndex;
	var obj = document.all["dlTime"].options[index];

	if (obj.value == "") 
	{
		document.all["txSTime"].value = "";
		document.all["txETime"].value = "";
	}
	else
	{
		var argValue = obj.value.split(":");
		document.all["txSTime"].value = argValue[0];
		document.all["txETime"].value = argValue[1];
	}
}
//1010427	Ivory	1010164	檢核公文文號是否已彙整
function txDocNo_onchange(type)
{
	var strErr = "";
	var xFocusObj;
	var ArrBatchInfo = new Array(4);
	if( jf_Trim(document.all["txDocNo"].value) != "" )
	{
		//1070830	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
		//ArrBatchInfo=ODR382.GetBatchInfo(document.all["H_SourceOrgno"].value,jf_Trim(document.all["txDocNo"].value)).value;
		ArrBatchInfo=OD.ODR382.GetBatchInfo(document.all["H_SourceOrgno"].value,jf_Trim(document.all["txDocNo"].value)).value;
		if( parseInt(ArrBatchInfo[0]) == 2  )//多筆彙整	
		{
			strErr += FormatStr(jf_GetErrMsg(CustErr), new Array(["公文文號:"+jf_Trim(document.all["txDocNo"].value)+"，已同其他文彙整，無法單獨開啟"]));
			if (xFocusObj == null)
			    /*1050606 Justin 1050087 二代公文修改
				xFocusObj = xDoc.txDocNo;*/
			    xFocusObj = "txDocNo";
		}
		else if( parseInt(ArrBatchInfo[0]) == 1 )//單筆彙整 帶出上次之彙整資訊郵遞方式、重量、郵資
		{
			for( var i = 0; i < document.all["dlBatchSendType"].options.length; i++ )
			{
				if ( ArrBatchInfo[1] == document.all["dlBatchSendType"].options[i].value )
					document.all["dlBatchSendType"].options.selectedIndex = i ;
			}
			document.all["txBatchWeight"].value = ArrBatchInfo[2] ;		
			document.all["txBatchCost"].value = ArrBatchInfo[3] ;	
			document.all["H_txBatchSum"].value = "1" ;	
		}
		else if( parseInt(ArrBatchInfo[0]) == 3 || parseInt(ArrBatchInfo[0]) == 4 )//無彙整過OR單筆彙整，但各受文者郵遞方式設定不同(多組設定)
		{
			strErr += FormatStr(jf_GetErrMsg(CustErr), new Array(["公文文號:"+jf_Trim(document.all["txDocNo"].value)+"，提醒此公文各受文者郵遞方式、郵資、重量設定不同"]));
			if (xFocusObj == null)
			    /*1050606 Justin 1050087 二代公文修改
				xFocusObj = xDoc.txDocNo;*/
			    xFocusObj = "txDocNo";
			if( parseInt(ArrBatchInfo[0]) == 3 )	
				document.all["H_txBatchSum"].value = "3" ;
					
			jf_ShowMeg(strErr,"");		
			return true ;	
		}
		else
		{
			document.all["H_txBatchSum"].value = "0" ;
			if( ArrBatchInfo[1] != "" )
			{
				for( var i = 0; i < document.all["dlBatchSendType"].options.length; i++ )
				{
					if ( ArrBatchInfo[1] == document.all["dlBatchSendType"].options[i].value )
						document.all["dlBatchSendType"].options.selectedIndex = i ;
				}
				document.all["txBatchWeight"].value = ArrBatchInfo[2] ;		
				document.all["txBatchCost"].value = ArrBatchInfo[3] ;			
			}
			
				if( document.all["dlBatchSendType"].options[document.all["dlBatchSendType"].options.selectedIndex].value == "" )
				{
					strErr += FormatStr(jf_GetErrMsg(CustErr), new Array(["公文文號:"+jf_Trim(document.all["txDocNo"].value)+"，請先至ODT380發文寄送維護作業進行公文郵遞設定後，再進行此作業"]));
					if (xFocusObj == null)
					    /*1050606 Justin 1050087 二代公文修改
						xFocusObj = xDoc.txDocNo;*/
					    xFocusObj = "txDocNo";
				}			
		}
			
		if (strErr !="" )
		{
		    jf_ShowMeg(strErr, "");
		    /*1050606 Justin 1050087 二代公文修改
			xFocusObj.focus();
			xFocusObj.value = "" ;*/
		    $('#' + xFocusObj).focus();
		    $('#' + xFocusObj).value = "";
		}
	}
	return true ;
}

//1010427	Ivory	1010164	設定欄位郵資計算
function fnGetPostCostBatch()
{
	var PostNO = document.all["dlBatchSendType"].options[document.all["dlBatchSendType"].selectedIndex].value;
	var Weight = document.all["txBatchWeight"].value;
	var	arWSParam = new Array(2);
	arWSParam[0] = PostNO;
	arWSParam[1] = Weight;
	
	if (PostNO == null || PostNO == "")
	{
		return;
	}

	callObj = jf_CallWS("lib/OD_LIB.asmx", "GetPostCost", false, arWSParam);
	if(!callObj.error)
	{
		var cost = callObj.value.RtnStr;
		if (cost != null && cost != "")
			document.all["txBatchCost"].value = cost;
	}
	
}
/*
function ExecPage(argNumber)
{
	var strSNum = document.all["txNum"+argNumber+"S"].value;
	var strENum = document.all["txNum"+argNumber+"E"].value;
	if (strSNum == "")
		return;
	if (strENum == "")
		return;
	//起訖交換
	if (Number(strSNum) > Number(strENum))
	{
		var strBuf = strSNum;
		strSNum = strENum;
		strENum = strBuf;
	}
	document.all["txNum"+argNumber+"S"].value = strSNum;
	document.all["txNum"+argNumber+"E"].value = strENum;
	document.all["txNum"+argNumber].value = Number(strENum)-Number(strSNum)+1;
}

//由張數計算起訖值
function ExecNum(argNumber)
{
	var strNum = document.all["txNum"+argNumber].value;
	if (strNum == "")
		return;
	var strSNum = document.all["txNum"+argNumber+"S"].value;
	var strENum = document.all["txNum"+argNumber+"E"].value;
	if (strSNum+strENum == "")
		return;
	//若起值空白，則透過 張數 & 訖值 算起值
	if (strSNum == "")
		document.all["txNum"+argNumber+"S"].value = Number(strENum)-Number(strNum)-1;
	else
		document.all["txNum"+argNumber+"E"].value = Number(strSNum)+Number(strNum)-1;
}
*/