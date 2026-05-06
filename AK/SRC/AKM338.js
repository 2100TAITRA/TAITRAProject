/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 日期			修改人	單號	概要
 * 1060512      Justin  1050087 二代公文修改 * 1110103		Zen     1101292	修正多次點擊重複PostBack之問題
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
	if(!IsServerHandling)
	{ 
	    //var xObjectName = document.activeElement.id;
	    var xObjectName = e.target.id;
		//var objSAVE = document.all["btSearch"];
		var ret;
		var pNo = xObjectName.substring(8,xObjectName.indexOf("_ibt"));
		pImgBtNAME = "dg1__ctl"+pNo+"_ibt";
		/*if ((xObjectName != "btExit") && (xObjectName != "btExitImg"))
		{
			if(jf_IsTimeOut())
			{
				Page_BlockSubmit=true;
				return;
			}		
		}
		
		var ret;
		*/
		switch (xObjectName)
		{
			case pImgBtNAME:
				//if(!objSAVE.disabled)
			    //1100204 Zen 1090927 取消使用document.activeElement			    //{ Get_Data(); }
			    { Get_Data(xObjectName); }
			    Page_BlockSubmit = true;
				break;
			case "btSearch":			//儲存
			case "btSearchImg":
				//IsServerHandling = true;
				break;
			case "btPrint":
			case "btPrintImg":
				Page_BlockSubmit = true;
				close();
				break;		
		}	}
	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題	else		Page_BlockSubmit = true;
}
var O=document.all;
//1060512 Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題	if (IsServerHandling)	{		Page_BlockSubmit = true;		return;	}
	
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
		case "btSave":
			CheckFileValueProcess();	
			var ptbNO="";
			var pdlType="";
			var ptbName="";
			var pMsg="";
			var IsFocus=true;
			for(var i=2;i<=document.all["dg1"].rows.length;i++)
			{
				ptbNO ="dg1__ctl"+i+"_tbNO";
				pdlType="dg1__ctl"+i+"_dlTYPE";
				ptbName="dg1__ctl"+i+"_tbNAME";
				if (O[pdlType].value == "")
					continue;
				if (jf_Trim(O[ptbName].value)!="")
					continue;
				pMsg+="序號"+(i-1)+"，主題內容欄位不可空白\n";
				if (IsFocus)
				{
				    //1060512 Justin [1050087] 二代公文修改
				    //O[ptbName].focus();
				    $('#ptbName').focus();
					IsFocus = false;
				}
				/*
				if ((O[pdlType].value=="" || jf_Trim(O[ptbNO].value)=="" || jf_Trim(O[ptbName].value)=="") 
				&& (O[pdlType].value !="" || jf_Trim(O[ptbNO].value) !="" || jf_Trim(O[ptbName].value) !="") )
				{
					if (O[pdlType].value =="")
					{
						pMsg+="序號"+(i-1);
						pMsg+="，編目項欄位";
						
						if (IsFocus)
						{O[pdlType].focus();}
						
						IsFocus=false;
					}
						
					if (jf_Trim(O[ptbNO].value)=="" || jf_Trim(O[ptbName].value)=="" )
					{
						if ( O[pdlType].value =="F" && jf_Trim(O[ptbName].value)!="" )
							continue;
						pMsg+="序號"+(i-1);
						pMsg+="，主題內容欄位";
						
						if (IsFocus)
						{O[ptbNO].focus();}
						
						IsFocus=false;
					}
					
					pMsg+="不可空白\n";
				}*/
			}
			
			if (pMsg!="")
			{
				alert(pMsg);
				Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = false;
		    //1060512 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1060512 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1060512 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId=="SYC270" || argCallerId=="SYC280" || argCallerId=="SYC290" || argCallerId=="SYC300")
	{
		if (O["lbReturnValue"].length > 0 )
		{
			if (uOldKey != O["lbReturnValue"].options[0].value)
			{
				if (O["lbReturnValue"].options[0].value != "")
				{
					O[objtbNO].value=O["lbReturnValue"].options[0].value;
					O[objtbNAME].value=O["lbReturnValue"].options[1].value;
				}
				
				O["lbReturnValue"].options[0].value ="";
				O["lbReturnValue"].options[0].text  ="";
				O["lbReturnValue"].options[1].value ="";
				O["lbReturnValue"].options[1].text  ="";
				
			}
		}
	}

}

function ClientOnLoad()
{
	ShowMsg();
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
	document.all[argLabelId].innerText = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

//主題提示子視窗------------------------------------------------------------------------------
var uOldKey;
var objtbNO;   
var objtbNAME; 



//1100204 Zen 1090927 取消使用document.activeElement//function Get_Data()
function Get_Data(argId)
{
	var pUrl = "";
	var pKeyValue ="";
    //1100204 Zen 1090927 取消使用document.activeElement	//var xObjectName = document.activeElement.id   //document.activeElement.id=dg1_ctrl3_dlSTATUS
	var xObjectName = argId;
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_ibt"))

	var objtbTYPE = "dg1__ctl" + pNo + "_dlTYPE"
	objtbNO   = "dg1__ctl" + pNo + "_tbNO"
	objtbNAME = "dg1__ctl" + pNo + "_tbNAME"
	
	var pSubType = O[objtbTYPE].options[O[objtbTYPE].selectedIndex].value;
	pKeyValue = escape(O[objtbNO].value);
	if (pSubType=="A")//主題
	{
		pUrl = "SYC270.aspx?rtnObj=lbReturnValue&m=p&cond="+pKeyValue+"&add=1";
	}
	else if (pSubType=="C")//機關
	{
		pUrl = "SYC280.aspx?rtnObj=lbReturnValue&m=p&cond="+pKeyValue+"&add=1";
	}
	else if (pSubType=="B")//人名
	{
		pUrl = "SYC290.aspx?rtnObj=lbReturnValue&m=p&cond="+pKeyValue+"&add=1";
	}
	else if (pSubType=="E")//地點
	{
		pUrl = "SYC300.aspx?rtnObj=lbReturnValue&m=p&cond="+pKeyValue+"&add=1";
	}
	else if (pSubType=="D")//團體
	{
		pUrl = "SYC280.aspx?rtnObj=lbReturnValue&m=p&cond="+pKeyValue+"&add=1";
	}


	
	if (pUrl!="")
		OpenWindow(pUrl);
	//uTimerID = setInterval("WaitClose();",500);
	Page_BlockSubmit = true;

}

function OpenWindow(argUrl)
{
	jf_OpenChildWin(argUrl,(argUrl.substring(0,argUrl.indexOf(".aspx"))));
	//jf_OpenChildWin(argUrl);
}


function tbNOBlur(argTextBox)
{
	/*
	var strtbNAME=argTextBox.replace(/tbNO/,"tbNAME");
	if (O[argTextBox].value=="")
	{
		O[strtbNAME].value=""
		return;
	}
	var stribt=argTextBox.replace(/tbNO/,"ibt");
	var strdlType=argTextBox.replace(/tbNO/,"dlTYPE");
	var xObjectName = document.activeElement.id;
	if ((xObjectName == stribt) || (xObjectName == strdlType))
	{return;}
	if (O[argTextBox].value=="")
	{return;}
	else
	{
		var pSubType = O[strdlType].options[O[strdlType].selectedIndex].value;
		var strTable="";
		var strKeyName="";
		var strRtnName="";
		if (pSubType=="A")//主題
		{
			strTable="REL_SUBJECT_M";
			strKeyName="SUB_NO";
			strRtnName="SUB_NAME";
		}
		else if (pSubType=="C")//機關
		{
			strTable="REL_ORG_M";
			strKeyName="ORG_NO";
			strRtnName="ORG_NAME";
		}
		else if (pSubType=="B")//人名
		{
			strTable="REL_PERSON_M";
			strKeyName="PSN_NO";
			strRtnName="PSN_NAME";
		}
		else if (pSubType=="E")//地點
		{
			strTable="REL_LOCATE";
			strKeyName="LOC_NO";
			strRtnName="LOC_NAME";
		}
		
		if (strTable=="")
		{return;}
		else
		{
			var KeyName = new Array(2)
			KeyName[0] = "SOURCE_ORGNO";
			KeyName[1] = strKeyName;

			var KeyValue = new Array(2);
			KeyValue[0] = O["tbOrgNo"].value;
			KeyValue[1] = O[argTextBox].value;

			var RtnFldName = new Array(1);
			RtnFldName[0] = strRtnName;
			var OrdFldName = new Array(1);
			OrdFldName[0] = "";	
			
			var param = new Array(5);
			param[0] = strTable;
			param[1] = KeyName;
			param[2] = KeyValue;
			param[3] = RtnFldName;
			param[4] = OrdFldName;		
			
			RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,param);
			iCallID_Rel = RtnObj.id;
			OnWSResult(RtnObj);
		}
	}*/
}

var wsGetNAMEID;
function OnWSResult(argResult)
{
    var strErrMsg = "";
    var srcE = event.srcElement;
   	var nFrontStr = srcE.id.indexOf("ctl")+3;//xxx__ctl的長度
	var pNo = srcE.id.substring(nFrontStr,srcE.id.indexOf("_",nFrontStr));
	var objtbTYPE = "dg1__ctl" + pNo + "_dlTYPE";

    //回傳NAME
    if(argResult.id == wsGetNAMEID)    
	{
			if(argResult.error || argResult.value.ErrorClass.IsErr)
			{
				strErrMsg += FormatStr(jf_GetErrMsg(CodeErr),new Array([O[objtbTYPE].options[O[objtbTYPE].selectedIndex].text+"代碼"],["[ "+srcE.value+" ]"],["請重新輸入"]))+"\n";
				jf_ShowMeg(strErrMsg,"");
			    srcE.focus();
			}
			else
			{
				O[objtbNAME].value=argResult.value.RtnField0[0];
			}
    }
}
//mickey 03/09/27 新增 未完成
//名稱jf_dlTypeOnChanged()
//作用：1.編目項改變時，代碼、說明清空
//		2.當編目項選擇「時間」時，將主題代碼tx及imgbutton disable,主題說明enable
//		
function jf_dlTypeOnChanged()
{
    //1060512 Justin [1050087] 二代公文修改
    //var pNo = document.activeElement.id.substring(8, document.activeElement.id.indexOf("_dlTYPE"));
    var pNo = event.srcElement.parentElement.id.substring(8, event.srcElement.parentElement.id.indexOf("_dlTYPE"));
	var option1 = "dg1__ctl" + pNo + "_tbNO";
	var option2 = "dg1__ctl" + pNo + "_ibt";
	var option3 = "dg1__ctl" + pNo + "_tbNAME";
    //1060512 Justin [1050087] 二代公文修改
    //var option4 = jf_Trim(document.all[document.activeElement.id+"_Text"].value).substring(0,1);
    //if(jf_Trim(document.all[document.activeElement.id].value) == "F")
	var option4 = jf_Trim(document.all["dg1__ctl" + pNo + "_dlTYPE_Text"].value).substring(0, 1);
	if (jf_Trim(document.all["dg1__ctl" + pNo + "_dlTYPE"].value) == "F")
	{
		document.all[option1].value="";
		document.all[option1].disabled=true;
		document.all[option1].style.backgroundColor = "#E0E0E0" ;
		document.all[option2].disabled=true;
	}
	else
	{
		document.all[option1].disabled=false;
		document.all[option1].style.backgroundColor = "white" ;
		document.all[option2].disabled=false;	
	}
    //1060512 Justin [1050087] 二代公文修改
    //if(option4 != jf_Trim(document.all[document.activeElement.id].value))
	if (option4 != jf_Trim(document.all["dg1__ctl" + pNo + "_dlTYPE"].value))
	{
		document.all[option1].value="";
		document.all[option3].value="";
	}
}
//mickey 03/09/27 新增
//名稱jf_dlTypeOnChanged()
//作用：1.取出編目日期
//		
function CheckFileValueProcess()
{
	var KeyName = new Array(2);
	KeyName[0] = "SOURCE_ORGNO";
	KeyName[1] = "DOC_NO";
	var KeyValue = new Array(2);
	KeyValue[0] = document.all["tbOrgNo"].value;
	KeyValue[1] = document.all["tbDocNo"].value;
	var RtnFld = new Array(1);
	RtnFld[0] = "INPFILE_DATE";
	var OrdFldName = new Array(1);
	OrdFldName[0] = "DOC_NO";
	var param = new Array(5);
	param[0] = "DOC_MAIN";
	param[1] = KeyName;
	param[2] = KeyValue;
	param[3] = RtnFld;
	param[4] = OrdFldName;
	RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,param);
	document.all["tbInpFileDate"].innerText = RtnObj.value.RtnField0[0] ;
}
//bob 03/04/24 新增
//名稱jf_dlTypeChanged()
//作用：1.編目項改變時，代碼、說明清空
//		2.當編目項選擇「時間」時，將主題代碼tx及imgbutton disable,主題說明enable
//		
function jf_dlTypeChanged()
{
    //1100204 Zen 1090927 取消使用document.activeElement--begin    //var xObject = document.activeElement;
    //var xObjectName = document.activeElement.id;   //document.activeElement.id=dg1_ctrl3_dlSTATUS
    var xObject = event.target;
    var xObjectName = event.target.id;   //document.activeElement.id=dg1_ctrl3_dlSTATUS
    //1100204 Zen 1090927 取消使用document.activeElement--end    var pNo = xObjectName.substring(8, xObjectName.indexOf("_dlTYPE"));
    objtbNO	= "dg1__ctl" + pNo + "_tbNO";
	var objtbTYPE = "dg1__ctl" + pNo + "_dlTYPE";
	objtbNAME = "dg1__ctl" + pNo + "_tbNAME";
	var objibt = "dg1__ctl" + pNo + "_ibt";
	O[objtbNO].value ="";
	O[objtbNAME].value ="";
	if (xObject.options.value == "F")
	{
		O[objtbNAME].readOnly = false;
		O[objtbNAME].style.backgroundColor = "white" ;
		O[objtbNO].readOnly =true;
		O[objtbNO].style.backgroundColor = "#E0E0E0" ;
		O[objtbNO].disable = true;
		O[objibt].disable = true;
	}
	else 
	{
		O[objtbNAME].readOnly = true;
		O[objtbNAME].style.backgroundColor = "#E0E0E0";
		O[objtbNO].readOnly = false;
		O[objtbNO].style.backgroundColor = "white";
		O[objtbNO].disable = false;
		O[objibt].disable = false;
	}
}


//檢查代碼或說明是否有值
//		代碼或說明是否正確並帶回相對值
function jf_IsExistNAME()
{
	var srcE = event.srcElement;
    //1100204 Zen 1090927 取消使用document.activeElement	//var actE = document.activeElement;
	var actE = event.target;
	var nFrontStr = srcE.id.indexOf("ctl")+3;//xxx__ctl的長度
	var pNo = srcE.id.substring(nFrontStr,srcE.id.indexOf("_",nFrontStr));
	objtbNAME = "dg1__ctl"+pNo+"_tbNAME";
	objtbNO	= "dg1__ctl" + pNo + "_tbNO";
	var objtbTYPE = "dg1__ctl" + pNo + "_dlTYPE";
	var objibt = "dg1__ctl" + pNo + "_ibt";
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	if (actE != null)
	if ( (actE.id == "btExit") || (actE.id == "btCancel") || (actE.id == objibt)) return;
	if(jf_Trim(srcE.value) == "" && srcE.id == objtbNO)
	{
		O[objtbNAME].value = "";
		O[objtbNO].value = "";
	}
	else
	{
		var i=0;
		for (i=0;i<jf_Trim(srcE.value).length;i++)
		{
			if (jf_Trim(srcE.value).charCodeAt(i)>128)
				return;
		}
		if (srcE.id == objtbNO && document.all[objtbNAME].value=="")
		{
			var KeyTable ="";//查詢Table名稱
			var KeyName =new Array(2);//where條件句
			var KeyValue =new  Array(2);//where條件句的欄位值
			var RtnFldName =new Array(1);//回傳欄位名稱
			var OrdFldName = new Array(1);//資料排序欄位，可空白
			KeyName[0]	= "THEME_TYPE";
			KeyName[1]	= "THEME_NO";
			RtnFldName[0] = "THEME_DESC";				
			switch (O[objtbTYPE].options.value)
			{
				case "A":				//主題
					KeyValue[0]	= "1";
					break;
				case "B":				//人名
					KeyValue[0]	= "2";
					break;
				case "C":				//機關
				case "D":				//團體
					KeyValue[0]	= "3";
					break;
				case "E":				//地點
					KeyValue[0]	= "4";
					break;
				case "F":
					return;
			}
			KeyValue[1]	= srcE.value;
			OrdFldName[0] = RtnFldName[0];
			var param = new Array("THEME_MAIN",KeyName,KeyValue,RtnFldName,OrdFldName);//GetFieldValue的參數
			callObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,param);
			if(callObj.error)
			{
				alert(callObj.errorDetail.string);
			}
			else
			{
				wsGetNAMEID = callObj.id;
				OnWSResult(callObj);
			}
		}
	}
}

