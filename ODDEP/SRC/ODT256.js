/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1020731	Kevin	Kevin	1020437		自ODT250複製程式，新增ODT256 公文專案管制通案申請作業
 * 1030627	Kevin	Eric	1030365		新增取得BUSINESS_TYPE.DUE_RULE欄位以及是否使用GetUnHoliday函式
 * 1050510  Cloud   Justin  1050087     二代公文修改
 * 1050719 	Cloud	Cloud	1050772		配合msg_from增加odt256 修改相關邏輯
 * 1050816  Cloud	Justin	1050700		弱掃Client Potential Code Injection修正
 * 1050817  Cloud   Kenny   1050827     新增取得辦理天數範圍client端檢核邏輯
 * 1060307 	Cloud	Cloud	序-2854		修改增加IsServerHandling時，設定Page_BlockSubmit = true;
 * 1060413	Cloud	Cloud	--			修正升級二代，欄位屬性給錯，會造成申請後限辦日是否含假日計算方式錯誤bug
 * 1060510	Cloud	Justin	1060215		INNERTEXT修正
 * 1061101  Kevin	Justin	1061070		弱掃Client Potential Code Injection修正
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

/*1050510 Justin 1050087 二代公文修改
document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

if (document.all["ValidationSummary1"].innerText != "")
	alert(document.all["ValidationSummary1"].innerText);
*/
jf_ShowValidator();

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

//1050510 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	{
		//1060307 	Cloud	序-2854		修改增加IsServerHandling時，設定Page_BlockSubmit = true;
		SetCanNotSubmit();
	   return;
	}
	
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	
    //1050510 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	
	
	switch (xObjectName)
	{
		case "btCheck":
			Page_BlockSubmit=false;
		    //1050510 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btOpen":
			if (jf_CheckKeyObject())
				SetCanSubmit();
			else
				SetCanNotSubmit();
		    //1050510 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btTransfer":
			if(ConfirmSave())//是否通過儲存前必要檢查
				SetCanSubmit();
			else
				SetCanNotSubmit();
		    //1050510 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
				SetCanSubmit();
			else
				SetCanNotSubmit();
		    //1050510 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			if(jf_ConfirmDelete())
				SetCanSubmit();
			else
				SetCanNotSubmit();
		    //1050510 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			if (jf_ConfirmCancel())
				SetCanSubmit();
			else
				SetCanNotSubmit();
		    //1050510 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
			if(ConfirmSave())
				SetCanSubmit();
			else
				SetCanNotSubmit();
		    //1050510 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//950721 新增[流程資訊]按鈕 by whay
		case "btSearch":
			Page_BlockSubmit=true;
			if (jf_CheckKeyObject())
			{
				var strArtifact = document.all.nArtifact.value;
				var strDocNo = document.all["txDocNo"].value;
				var strSourceOrgno = document.all.nSourceOrgno.value;
				var strUrl = document.all.nHttp.value;
				//var strUrl ="ODI260.aspx?nFrom=ODT250&pDocNo="+strDocNo+"&SAMLart=" + strArtifact;
				//0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
				//1050719 	Cloud	Cloud	1050772		配合msg_from增加odt256 修改相關邏輯
				//var strUrl =strUrl+"/ED/ED2/EDI200.aspx?SOURCE_ORGNO="+strSourceOrgno+"&argMsgFrom=ODT250&argTargetNo="+strDocNo+"&SAMLart=" + strArtifact;
				var strUrl =strUrl+"/ED/ED2/EDI200.aspx?SOURCE_ORGNO="+strSourceOrgno+"&argMsgFrom=ODT256&argTargetNo="+strDocNo+"&SAMLart=" + strArtifact;
				jf_OpenChildWin(strUrl, "EDI200", 700, 500 );
			}
		    //1050510 Justin 1050087 二代公文修改 
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
    /*1050517 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	jf_CallWS("lib/OD_LIB.asmx","GetWorkDate" ,false, null);
	jf_CallWS("lib/TIME_LIB.asmx","GetBTypeNo" ,false, null);
	jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false, null);
	jf_CallWS("lib/OD_LIB.asmx","GetUnHoliday", false,null);*/
	
	//ZOEY [951034]
	if(document.all["dgSchedule"]==null)
    {
	    document.all.DivDgSche.outerHTML="";
	    document.all.Label17.outerHTML="";    
	}

	//1000422	Howard 1000346	修正開啟後，其申請後限辦日期為空之問題
	if(document.all.txApplyDay.value !=""&&  document.all.H_txStartDate.value != "" &&  document.all.txNDueDate.value == "")
		txApplyDay_Onblur();
}

function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsGetWorkDateID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["lbNDueDate"].innerText = DateFormat(argResult.value.RtnWorkDate);
              document.all.txNDueDate.value = argResult.value.RtnWorkDate;
		}
		else
		{
		    //document.all["lbNDueDate"].innerText = "";
		    /*1050510 Justin 1050087 二代公文修改
			document.all["txApplyDay"].focus();*/
		    $('#txApplyDay').focus();
		}
	}
	else if(argResult.id == wsGetFieldValue)  //由業務類別判斷辦理天數是否含假日
	{
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		//1030627 Eric	1030365		新增回傳H_DueRule隱藏欄位欄位
		{
		    /*1050510 Justin 1050087 二代公文修改
			document.all["H_txIncHd"].innerText = argResult.value.RtnField0[0];
			document.all["H_txDueRule"].innerText = argResult.value.RtnField1[0];*/
			//* 1060413	Cloud	修正升級二代，欄位屬性給錯，會造成申請後限辦日是否含假日計算方式錯誤bug
		    /*document.all["H_txIncHd"].textContent = argResult.value.RtnField0[0];
		    document.all["H_txDueRule"].textContent = argResult.value.RtnField1[0];*/
			document.all["H_txIncHd"].value = argResult.value.RtnField0[0];
		    document.all["H_txDueRule"].value = argResult.value.RtnField1[0];
		}
		else
		{
		    /*1050510 Justin 1050087 二代公文修改
			document.all["H_txIncHd"].innerText = "";
			document.all["H_txDueRule"].innerText = "";*/
			//* 1060413	Cloud	修正升級二代，欄位屬性給錯，會造成申請後限辦日是否含假日計算方式錯誤bug
		    /*document.all["H_txIncHd"].textContent = "";
		    document.all["H_txDueRule"].textContent = "";*/
			document.all["H_txIncHd"].value = "";
		    document.all["H_txDueRule"].value = "";
		}
	}
	else if(argResult.id == wsGetBTypeNo)  //由公文性質取得業務類別
	{
		if(jf_IsWebServiceSuccessNoAlert(argResult))
		{
			//clear 業務類別 dlWorkType
			ClearDL(document.all.dlWorkType);
			if(argResult.value.IsErr || argResult.value.RtnStr == "")
			{
				document.all.dlWorkType.disabled=true;
				document.all.dlWorkType.options.add(new Option("","")); //第一筆空白
				return false;	
			}

			if(argResult.value.RtnStr != "")
			{
				document.all.dlWorkType.disabled=false;
				var pTmpAry = argResult.value.RtnStr.split(":");
				
				//將值塞入 dlWorkType
				if(pTmpAry.length == 0)
				{
					document.all.dlWorkType.options.add(new Option("","")); //第一筆空白
					document.all.dlWorkType.selectedIndex = 0;
				}
				else
				{			
					for(var i=0;i< pTmpAry.length;i++)
					{
						var pTmpAry2 = pTmpAry[i].split(",");
						var objOption = new Option(pTmpAry2[1], pTmpAry2[0]);
						document.all.dlWorkType.options.add(objOption);
					}
					document.all.dlWorkType.selectedIndex = 0;
				}
			}
			else
			{
				document.all.dlWorkType.options.add(new Option("","")); //第一筆空白
				document.all.dlWorkType.selectedIndex = 0;
			}
		}
    }
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050510 Justin 1050087 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//###############################################################################
//							Button Click Function
//###############################################################################
//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = true;
	return bRtnbool;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
			bRtnbool = true;
		else
			bRtnbool = false;		
	}
	//alert(bRtnbool);
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	//1010423	ivory	1010174	新增公文性質為特殊性案件時申請天數限制為7~29天,專案名稱不需輸入、檢核
	var strProperty = document.all["dlProperty"].value;
	//檢查本次申請展期天數不能為空白
	if(!CheckNotEmptyAndAlert("txApplyDay","本次專案申請天數"))
		return false;
	//if(!CheckNotEmptyAndAlert("txCaseName","專案名稱"))
	//	return false;	
	if( strProperty == "3" )
	{
		if(!CheckNotEmptyAndAlert("txCaseName","專案名稱") )
			return false;
	}
//	if(document.all.cbReason8.checked)
//	{
	//	if(!CheckNotEmptyAndAlert("txReason","申請理由"))
	//		return false;
//	}
//	if((!document.all.cbReason1.checked)&&(!document.all.cbReason2.checked)&&(!document.all.cbReason3.checked)&&(!document.all.cbReason4.checked)&&
//	(!document.all.cbReason5.checked)&&(!document.all.cbReason6.checked)&&(!document.all.cbReason7.checked)&&(!document.all.cbReason8.checked))
//	{
//		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少要勾選一樣申請理由"])),"");	
//		return false;
//	}
//[1000117] 1000301 Davis 新增判斷申請天數若小於三十天，無法進行申請
//1010423	ivory	1010174	新增公文性質為特殊性案件時申請天數限制為7~29天
/*	if( strProperty == "3" )//專案管制
	{
		if(parseInt(document.all["txApplyDay"].value) < 30)
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["依文書流程管理作業規範第七章規定專案申請天數需30日以上"])),"");						
				document.all["txApplyDay"].focus();
			return false;
		}
	}
	else if ( strProperty == "9" )//特殊性案件申請天數限制為7~29天
	{*/
	//1020731
		if(parseInt(document.all["txApplyDay"].value) < 30 || parseInt(document.all["txApplyDay"].value) > 180 )
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["管制通案申請天數為30~180日。"])),"");						
		    /*1050510 Justin 1050087 二代公文修改
			document.all["txApplyDay"].focus();*/
			$('#txApplyDay').focus();
			return false;
		}		
	//}
	
			if( document.all["txSchedule"].value=="" )
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["擬定作業時程欄位不可空白。"])),"");						
			/*1050510 Justin 1050087 二代公文修改
			document.all["txSchedule"].focus();*/
			$('#txSchedule').focus();
			return false;
		}	
		
		document.all["txReason"].value="";
		
        //1050511 Justin 1050087 二代公文修改 cells(IE only)--> jQuery(ICEF)--Start--
		var cellscnt = $('#cblReason').children('tbody').children('tr').children('td').length;
        //if(document.all["cblReason"].cells.length > 0)
		if (cellscnt > 0)
		{
		    //for(var iRcv = 0 ; iRcv < document.all["cblReason"].cells.length ; iRcv++)
		    for (var iRcv = 0 ; iRcv < cellscnt ; iRcv++)
			{
				if(document.all["cblReason_"+iRcv].checked)
				{
				    //var val = document.all["cblReason"].cells[iRcv].innerText;
				    var val = $('#cblReason_'+iRcv+'+ label').text();
		//1050511 Justin 1050087 二代公文修改 cells(IE only)--> jQuery(ICEF)--End--
						if(document.all["txReason"].value != "")
							val = "，"+val;
							
						document.all["txReason"].value += val;
				}
			}
		}
		
		if( document.all["txReason"].value=="" )
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["申請理由不可空白。"])),"");						
			return false;
		}	
		
    /*1050510 Justin 1050087 二代公文修改	
	var ddlIdx=9;
	var nextOpt = GetToolbarCtrl(ddlIdx);
	if(nextOpt==null)
		alert('null');
	var aOptions = nextOpt.getOptions();
	document.all.SelectedUser.value = aOptions.value;*/
	document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
	//紀錄Client端所選的業務類別
	document.all["H_WorkType"].value = document.all["dlWorkType"].options[document.all["dlWorkType"].selectedIndex].value;
	return true;
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName,argFieldName)
{
	if(document.all[argObjName].value == "")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName+"不可為空白"])),"");						
	    /*1050510 Justin 1050087 二代公文修改
		document.all[argObjName].focus();*/
		$('#' + argObjName).focus();
		return false;
	}
	//1050817   Kenny   [1050827]   系統參數OD_ODT250_OPEN_PROPERTY有正確設定時增加檢核範圍邏輯--Start--
	else
	{
		if (argObjName == "txApplyDay")
		{
			var strApplyDayMin = document.all.argApplyDayMin.value;
			var strApplyDayMax = document.all.argApplyDayMax.value;
			var strApplyDay = document.all.txApplyDay.value;
			if (strApplyDay != "" && (strApplyDayMin != "" && strApplyDayMax != "" && (parseInt(strApplyDayMin, 10) < parseInt(strApplyDayMax, 10))))
			{
				if ((parseInt(strApplyDay, 10) < parseInt(strApplyDayMin, 10)) || (parseInt(strApplyDay, 10) > parseInt(strApplyDayMax, 10)))
				{
					jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["申請天數範圍為" + strApplyDayMin + "~" + strApplyDayMax + "天，請重新輸入"])), "");
					$('#' + argObjName).focus();
					return false;
				}
			}
		}
	}
	//1050817   Kenny   [1050827]   系統參數OD_ODT250_OPEN_PROPERTY有正確設定時增加檢核範圍邏輯--End--
	return true;
}
/*1050510 Justin 1050087 二代公文修改
function GetToolbarCtrl(argId)
{
	return document.all.tbTool.getItem(argId);
	for(var i=0;i<20;i++)
	{
		var o=document.all.tbTool.getItem(i);
		if(o!=null)
		{
			alert(o.getAttribute("ID"));
			if(o.getAttribute("ID")==argId)
				return o;
		}
	}
	return null;
}*/
//###############################################################################
//						Server端Register之Function
//###############################################################################
//function dlReason_Onchange()
//{
	//var index = document.all["dlReason"].selectedIndex;
	//if (index != 0)
	//{
	//	document.all["txReason"].value = document.all["dlReason"].options[index].text;
	//}
//}

//常用申請理由
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050510 Justin 1050087 二代公文修改
    //var val = document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
	if(document.all["txReason"].value != "")
		val = "，"+val;
	document.all["txReason"].value += val;
	document.all["dlPhraseNo"].options[0].selected = true;
	/*1050510 Justin 1050087 二代公文修改
	document.all["txReason"].focus();*/
	$('#txReason').focus();
}

var wsGetWorkDateID;//宣告webserver回傳值id
var wsGetFieldValue;//宣告webserver回傳值id

function txApplyDay_Onblur()
{
	var index	= document.all["dlWorkType"].selectedIndex;
	var obj	    = document.all["dlWorkType"].options[index];
	var wsAKParam = new Array(5);
	var KeyName   = new Array(2);
	var KeyValue  = new Array(2);
	//1030627 Eric	1030365	增加宣告空間
	//var RtnFldName = new Array(1);
	var RtnFldName = new Array(2);
	var OrdFldName = new Array(1);
	
	KeyName[0]   = "SOURCE_ORG";
	KeyName[1]   = "B_TYPE_NO"; 
	//1061101 Justin [1061070] 弱掃Client Potential Code Injection修正
	//KeyValue[0]  = document.all.H_txSourceOrgNo.value;
	//KeyValue[1]  = obj.value;
	KeyValue[0]  = encodeURI(document.all.H_txSourceOrgNo.value);
	KeyValue[1]  = encodeURI(obj.value);
	RtnFldName[0]= "LT_INC_HD";
	//1030627 Eric	1030365	新增回傳值DUE_RULE
	RtnFldName[1]= "DUE_RULE";
	
	OrdFldName[0] = "";
	wsAKParam[0] = "BUSINESS_TYPE";
	wsAKParam[1] = KeyName;
	wsAKParam[2] = KeyValue;
	wsAKParam[3] = RtnFldName;
	wsAKParam[4] = OrdFldName;
	//根據BUSINESS_TYPE中LT_INC_HD決定計算辦理天數是否包含假日  stella 0941129
	callObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,wsAKParam);
	wsGetFieldValue = callObj.id;
	OnWSResult(callObj);
				
	var strDay = document.all["txApplyDay"].value;
	if (strDay == "")
	{
	    //1050510 Justin 1050087 二代公文修改
	    //document.all["txNDueDate"].innerText = "";
	    //1060510 Justin [1060215] INNERTEXT修正
		//document.all["txNDueDate"].textContent = "";
		document.all["txNDueDate"].value = "";
		return;
	}
	else
	{
		var wsParam = new Array(3);
		//1050816 Justin 1050700 弱掃Client Potential Code Injection修正
		//wsParam[0] = document.all["H_txStartDate"].value; //zoey [950817]  95/10/04 原本是 "txDueDate"
		wsParam[0] = encodeURI(document.all["H_txStartDate"].value);
		wsParam[1] = Number(strDay)-1;
		if(document.all.H_txIncHd.value == "Y")
			wsParam[2] = "1";
		//0991124	Howard	0990695	因應人民申請案件(綠標)，修改辨理天數計算若為包含工作天時，應再判斷是否為連休假日
		else if(document.all.H_txIncHd.value == "H")
			wsParam[2] = "3";
		else
			wsParam[2] = "2";
		//callObj = jf_CallWS("lib/OD_LIB.asmx","GetWorkDate" ,false, wsParam);	
		//1030627 Eric 1030365	判斷DUE_RULE是否使用GetUnHoliday函式
		//callObj = jf_CallWS("lib/OD_LIB.asmx","GetUnHoliday" ,false, wsParam);  //zoey [950817]  95/10/04
		if(document.all.H_txDueRule.value == "Y")
			callObj = jf_CallWS("lib/OD_LIB.asmx","GetUnHoliday" ,false, wsParam);  //zoey [950817]  95/10/04
		else
			callObj = jf_CallWS("lib/OD_LIB.asmx","GetWorkDate" ,false, wsParam);
		wsGetWorkDateID = callObj.id;
		OnWSResult(callObj);
	}
}


function dlProperty_onchange()
{
	var index	= document.all["dlProperty"].selectedIndex;
	var obj		= document.all["dlProperty"].options[index];
	
	if(obj.value=="9")
		document.all.txApplyDay.value = "7";
	else
		document.all.txApplyDay.value = "30";
		
	//取得業務類別
	GetBTypeNo(obj.value);
	
	txApplyDay_Onblur();
}

//由公文性質取得業務類別
var wsGetBTypeNo=null;
function GetBTypeNo(strDocProperty)
{
	var param = new Array(1);
	param[0] = "";
	param[1] = strDocProperty;
	callObj = jf_CallWS("lib/TIME_LIB.asmx","GetBTypeNo" ,false, param);
	wsGetBTypeNo = callObj.id;
	OnWSResult(callObj);
}

function jf_IsWebServiceSuccessNoAlert(argResult)
{
	var L_NotReady_Text = "Service unavailable";
	
	if(argResult.error)
	{
		if(argResult.errorDetail.string == L_NotReady_Text)
		{
			//
		}
		else
		{
			alert(argResult.errorDetail.string);
		}
	    return false;
	}
	else
	{
		obj = argResult.value;
		if(obj.ErrorClass.IsErr)
		{
			if( obj.ErrorClass.IsRedirect)
			{
				jf_RedirectToCustomErrPage();
				return false;
			}
			else
				return true;
		}
	}
	return true;
}

//將DropDownList裡的item清除
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	return;

}
//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################
//取消TextBox中enter的功能
function fnHandleTextarea()
{
	if(event.keyCode==13)
		event.cancelBubble = true;
}

function SetCanSubmit()
{
	IsServerHandling = true;
	jf_ShowWaitState();	
	Page_BlockSubmit = false;
}

function SetCanNotSubmit()
{
	Page_BlockSubmit = true;
}

//日期格式轉換
function DateFormat(argDate)
{
	if (argDate.length == 7)
		return argDate.substring(0,3) + "/" + argDate.substring(3,5) + "/" + argDate.substring(5,7);
	if (argDate.length == 11)
		return argDate.substring(0,3) + "/" + argDate.substring(3,5) + "/" + argDate.substring(5,7) + " " + argDate.substring(9,2) + ":" + argDate.substring(11,2);
	return argDate;
}

function cbReasonOnClick()
{
	if(document.all.cbReason8.checked)
	{
		document.all.txReason.readOnly = "";
		document.all.txReason.className = "";
	}
	else
	{
		document.all.txReason.readOnly = "readonly";
		document.all.txReason.className = "DisplayOnly";
	}
}
