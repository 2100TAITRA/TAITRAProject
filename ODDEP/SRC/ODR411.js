/*
DATE	SA		PRG		MGR_NO		DESC
0960129	Stella	Stella	000337		多傳入網址參數artifact，以避免ODI260預覽時會發生錯誤
0980928	Stella	David	0980391		查詢條件支援二層式架構
1010731	Kevin	Jagle	1010783		點選展期開啟ODT220再點選流程資訊時，會跳出無權杖錯誤
1050720	Kevin	Joe		1050087 	二代系統升級
1060726	Kevin	Joe		1060582 	新增鐵改使用參數TYPE
1070822 Kevin   Joe     1070671     修正ODR411查詢範圍權限
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050720	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
//1050720	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
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
	if(xObjectName.indexOf("btWrite")!=-1)
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

//1050720	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1050720	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckCondition();
			//1050720	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
			Page_BlockSubmit = !CheckCondition();
			//1050720	Joe	1050087	二代系統升級
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
	//document.all["H_Value"].value = document.all["dlDept_Text"].value;
	document.all["H_Change"].value = "";

	//1050720	Joe	1050087	二代系統升級--S
	/*if (document.all["dg1"] == null)
		document.all["dtHead"].className = "hide";
	else
		document.all["dtHead"].className = "";*/
	//1050720	Joe	1050087	二代系統升級--E
	ShowMsg();
	
	//0980930	David	0980391	紀錄各欄位Text、Value跟所有選項
	document.all["H_Dept_Text"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect_Text"].value = document.all["dlSect_Text"].value;
	document.all["H_User_Text"].value = document.all["dlUser_Text"].value;
	document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept_Text"].value);
	document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Text"].value);
	document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User_Text"].value);
	document.all["H_Sect_AllValue"].value = odjf_SaveCurrDL(document.all["dlSect"]);
	document.all["H_User_AllValue"].value = odjf_SaveCurrDL(document.all["dlUser"]);
	
	//無值不顯示
	jf_HandleComboxStatus("dlSect");
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

//0980928	David	0980391 支援二層級架構--Start
/*function dlDept_Onblur()
{
	if (odjf_CheckComboBox("dlDept"))
	{
		//值若變更時，觸動TextChange事件
		if (document.all["dlDept_Text"].value != document.all["H_Value"].value)
		{
			document.all["H_Change"].value = document.all["dlDept_Text"].value;
			//__doPostBack();//for .NET Framework 1.0
			__doPostBack("","");//for .NET Framework 1.1
			IsServerHandling = true;
			//jf_ShowWaitState();
		}
	} 
}*/
var ViewAll = false;
var CheckUserNo = "";
var strBuf = "";

function dlDept_Text_onblur()
{
	var PriNo = document.all["H_Privilege"].value;
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept_Text"].value)
	{
		//呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			ViewAll = false;
			//存ComboBox_Text的value
			document.all["H_Dept_Text"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept_Text"].value);
			
			var bSubTree = true;
			if(document.all["H_OD_FLOW_TYPE"].value == "2")
				bSubTree = false;
				
			//清空選項
			while(document.all["dlSect"].length > 0)
				document.all["dlSect"].remove(0);
			if(PriNo != "0001")
			{
				while(document.all["dlUser"].length > 0)
					document.all["dlUser"].remove(0);
				while(document.all["H_OldUser"].length > 0)
					document.all["H_OldUser"].remove(0);
			}
			
			if(document.all["H_Dept_Value"].value == "")//選擇空，清空所有
			{
				document.all["dlSect_Text"].value = "";
				if(PriNo != "0001")
				{
					document.all["dlUser_Text"].value = "";
					document.all["dlUser"].size = 2;
				}
				jf_HandleComboxStatus("dlSect");
				return bCheckOK;
			}
			
			//初始dlSect、dlUser
			//OD0003,OD0002權限可查全單位資訊，呼叫odjf_SetdlDept執行，其他權限取隱藏選單中紀錄之二級單位使用
		    //1070822 Kevin 1070671 修正ODR411查詢範圍權限
		    //if(PriNo == "0003" || PriNo == "0002")
			if (PriNo == "0003")
				odjf_SetdlDept("dlDept","dlSect","dlUser","",bSubTree,true);
			else
			{	
			    //1070822 Kevin 1070671 修正ODR411查詢範圍權限 Start
			    if (document.all["H_Dept_Value"].value.split(':').length == 6)
					{
			        while (document.all["dlUser"].length > 0)
			            document.all["dlUser"].remove(0);
			        document.all["dlUser"].options.add(new Option("", ""));
						}
			    else if (document.all["H_Dept_Value"].value.split(':').length == 2)
						{
			        SetUser(document.all["H_Dept_Value"].value.split(':')[0], true);
						}
				//1101012	JOE		1100330		修正二級單位選單
			    // else if (document.all["H_Dept_Value"].value.split(':').length == 2)
			    else if (document.all["H_Dept_Value"].value.split(':').length == 4)
								{
			        SetUser(document.all["H_Dept_Value"].value.split(':')[2], true);
				}
				//var OwnDeptNo = document.all["H_Dept_Value"].value.split(':')[0];//取得所選的一級單位代碼
				//var len = 0;
				//var SectList = new Array();
				//
				//for(var i = 0 ; i < document.all["H_AllSectNo"].options.length ; i++)
				//{
				//	var HadDeptNo = document.all["H_AllSectNo"].options[i].value.split(':');//取得隱藏選單中紀錄的單位代碼
				//
				//	if(PriNo == "0004" || HadDeptNo[0] == OwnDeptNo)//OD0004權限如有一級單位角色，可查詢全單位
				//	{
				//		ViewAll = true;
				//		break;
				//	}
			    //
				//	var SectNoName = new Array(2);
				//	if(HadDeptNo[0].substr(0,2) == OwnDeptNo)//若相同則紀錄起來
				//	{
				//		//有一級單位角色，二級選單加入「僅含一級單位」
				//		if(HadDeptNo[0].length == 2 && (HadDeptNo[2] == null || HadDeptNo[2] ==""))
				//		{
				//			SectNoName[0] = "僅含一級單位";
				//			SectNoName[1] = "";
				//			SectList[len] = SectNoName;
				//		}
				//		else//加入二級單位
				//		{
				//			SectNoName[0] = HadDeptNo[3];
				//			SectNoName[1] = HadDeptNo[0]+":"+HadDeptNo[1]+":"+HadDeptNo[2]+":"+HadDeptNo[3];
				//			SectList[len] = SectNoName;
				//		}
				//		len++;
				//	}
				//}
				//if(ViewAll)//可查詢全單位
				//	odjf_SetdlDept("dlDept","dlSect","dlUser","",true,true);
				//else
				//{
				//	if(SectList.length >0)//加入二級選單裡
				//	{
				//		document.all["dlSect"].options.add(new Option("",""));//第一筆空白
				//		var UserAllready = true;
				//		for(var iSect = 0 ; iSect < SectList.length ; iSect++)
				//		{
				//			var SectInfo = SectList[iSect];
				//			document.all["dlSect"].options.add(new Option(SectInfo[0],SectInfo[1]));
				//			//初始承辦人選單--Start
				//			if(PriNo != "0001")
				//			{
				//				if(iSect != 0)
				//					UserAllready = false;
				//			
				//				if(SectInfo[1] == "")
				//					SetUser(OwnDeptNo,UserAllready);
				//				else
				//				{
				//					var SectNo = SectInfo[1].split(':');
				//					SetUser(SectNo[2],UserAllready);
				//				}
				//			}
				//			//End
				//		}
				//		document.all["dlSect"].selectedIndex = -1;					
				//	}				
				//	document.all["dlSect_Text"].value = "";
			    //}
			    //1070822 Kevin 1070671 End
			}
			
			CheckUserNo = "";//清空已存在承辦人帳號，供下次連動時紀錄
			strBuf = "";
			
			document.all["H_Sect_Text"].value = document.all["dlSect_Text"].value;
			document.all["H_User_Text"].value = document.all["dlUser_Text"].value;
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Text"].value);
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User_Text"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_Sect_AllValue"].value = odjf_SaveCurrDL(document.all["dlSect"]);
			document.all["H_User_AllValue"].value = odjf_SaveCurrDL(document.all["dlUser"]);
			
			//依選項多寡固定下拉式選單可見長度
			if(document.all["dlSect"].options.length > 10)
				document.all["dlSect"].size = 10;
			else if(document.all["dlSect"].options.length ==1)
				document.all["dlSect"].size = 2;
			else
				document.all["dlSect"].size = document.all["dlSect"].options.length;
				
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
			
			//無值不顯示
			jf_HandleComboxStatus("dlSect");
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlSect_Text_onblur()
{
	var bCheckOK = true;
	var PriNo = document.all["H_Privilege"].value;
	//值若變更時作處理
	if (document.all["dlSect_Text"].value != document.all["H_Sect_Text"].value)
	{
		//呼叫OD_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect_Text"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect_Text"].value);
			
			if(!ViewAll && document.all["dlSect_Text"].value == "")//不可查詢全單位，取先前紀錄的承辦人組出選單內容
			{
				if(PriNo != "0001")
				{
					//清空選項
					while(document.all["dlUser"].length > 0)
						document.all["dlUser"].remove(0);
					document.all["dlUser"].options.add(new Option("",""));
					for(var i = 0 ; i < document.all["H_OldUser"].options.length ; i++)
					{
						var objOption = new Option(document.all["H_OldUser"].options[i].text,document.all["H_OldUser"].options[i].value)
						document.all["dlUser"].options.add(objOption);
					}
				}
			}
			else
				odjf_SetdlSect("dlDept","dlSect","dlUser","",false,true);
			
			
			document.all["H_User_Text"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User_Text"].value);
			document.all["H_User_AllValue"].value = odjf_SaveCurrDL(document.all["dlUser"]);
			
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function SetUser(argUnitNo,argSetAllready)
{
	var valUser = new Array(3);
	valUser[0] = argUnitNo;
	valUser[1] = "";
	valUser[2] = false;
	
	callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
	
	resultObj = null;
	if( callObj.error )
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])),"");
	else
	{
		if( jf_IsWebServiceSuccess(callObj) )
			resultObj = callObj.value;
	}
	
	var UserNameMem = document.all["dlUser_Text"].value;
	
	//清空選項
	if(argSetAllready)
	{
		while(document.all["dlUser"].length > 0)
			document.all["dlUser"].remove(0);
		document.all["dlUser"].options.add(new Option("",""));
	}
	
	//重新新增選項
	len = resultObj.UserName.length;
	
	for( i=0 ; i<len ; i++ )
	{
		if(CheckAdd(resultObj.UserName[i]))//檢查是否已加入
		{
			//項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
			var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i]+":"+resultObj.SectNo[i]+":"+resultObj.UserName[i]+":"+resultObj.EmpName[i])
			document.all["dlUser"].options.add(objOption);
			
			var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i]+":"+resultObj.SectNo[i]+":"+resultObj.UserName[i]+":"+resultObj.EmpName[i])
			document.all["H_OldUser"].options.add(objOption);
			
			CheckUserNo += strBuf + resultObj.UserName[i];
			strBuf = ":";
		}
	}
	
	//清空顯示的Text，以及重設選擇
	document.all["dlUser_Text"].value = "";
	document.all["dlUser"].selectedIndex = -1;
	for( i=0 ; i<len ; i++ )
	{
		if( UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i] )
		{
			UserComboBoxTextObj.value = resultObj.EmpName[i];
			document.all["dlUser"].selectedIndex = i;
			break;
		}
	}
}

//檢查是否加入
function CheckAdd(argUserNo)
{
	if(argUserNo == "")
		return false;
	if(CheckUserNo == "")
		return true;
	if(CheckUserNo.indexOf(argUserNo) != -1)
		return false;
	return true;
}

function dlUser_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlUser_Text"].value != document.all["H_User_Text"].value)
	{
		//呼叫OD_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlUser", "承辦人"))
		{
			document.all["H_User_Text"].value = document.all["dlUser_Text"].value;
			
			document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"],document.all["H_User_Text"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all["dlSect_Text"].value =="")
	{
		if(document.all[argComboxID].options.length <=1)
			document.all[argComboxID+"_Container"].className = "hide";
		else
			document.all[argComboxID+"_Container"].className = "custom-combobox";
	}
}

//查詢前檢查
function jf_CheckBeforeSearch()
{
	if(!dlDept_Text_onblur(true))
		return false;

	if(!dlSect_Text_onblur(true))
		return false;

	if(!dlUser_Text_onblur(true))
		return false;

    return true;
}
//End

function CheckCondition()
{
	var strDept = jf_Trim(document.all["dlDept_Text"].value);
	var strSect = jf_Trim(document.all["dlSect_Text"].value);
	var strUser = jf_Trim(document.all["dlUser_Text"].value);
	var strSDate= jf_Trim(document.all["txSDate"].value);
	var strEDate= jf_Trim(document.all["txEDate"].value);
	var index   = document.all["dlProperty"].selectedIndex;
	var strProp = document.all["dlProperty"].options[index].text;
	var strSubject=jf_Trim(document.all["txFromSubject"].value);
	if (strDept+strUser+strSDate+strEDate+strSubject+strProp == "")
	{
		//1050720	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["dlDept_Text"].focus();
		$('#dlDept_Text').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少輸入一個條件"])),"");
		return false;
	}
	
	//0980928	David 0980391 下拉選單檢核
	if(!jf_CheckBeforeSearch())
		return false;
	return true;
}

//展期申請
function DocExtend(argType, argDocNo, argUserId, argApplyDate, argSourceOrgNo)
{
	//1010731	Jagle	[1010783]		增加傳入權杖
	var strArtifact = document.all["H_Artifact"].value;
	var strLocation = document.all["H_WSLocation"].value;
	var strUrl = "";
	
	if (strLocation != "")
	{
		strUrl = "http://" + strLocation;
	}
	strUrl += "ODT220.aspx?rtnObj=lbReturnValue";
	strUrl += "&argDocNo="+argDocNo;
	strUrl += "&applyDate="+argApplyDate;
	if(argType == "True")
	{
		strUrl += "&ACC="+argUserId;
		strUrl += "&SOURCE_ORGNO="+argSourceOrgNo;
	}
	//1010731	Jagle	[1010783]		增加傳入權杖
	strUrl += "&SAMLart=" + strArtifact;
	jf_OpenChildWin(strUrl, "ODT220", 760, 520 );
}

//檢視公文流程
function DocFlowInfo(argDocNo, argUserId, argSourceOrgNo)
{
	var strPage  = document.all["H_Url"].value;
	if (strPage == "")
	{
		strPage = "ODI260.aspx";
	}
	var strWidth = document.all["H_Width"].value;
	var strHeight= document.all["H_Height"].value;
	var strDocNo = argDocNo;
	var strArtifact = document.all["H_Artifact"].value;
	//0960129 Stella [000337]多傳入網址參數artifact，以避免ODI260預覽時會發生錯誤
	var strUrl = strPage + "?pDocNo=" + strDocNo + "&ACC=" + argUserId + "&SOURCE_ORGNO=" + argSourceOrgNo + "&SAMLart=" + strArtifact;
	jf_OpenChildWin(strUrl, "FlowPage", strWidth, strHeight );
}

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
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
			//1050720	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}

function DocWritePaper(argType,argDocNo,argUserId,argOrgNo)
{
	var strLocation = document.all["H_WSLocation"].value;
	var strUrl = "";
	
	if (strLocation != "")
	{
		strUrl = "http://" + strLocation;
	}
	
	//1050720	Joe	1050087	二代系統升級
	//strUrl += "ODT410Main.aspx?rtnObj=lbReturnValue";
	strUrl += "ODT410.aspx?rtnObj=lbReturnValue";
	strUrl += "&argDocNo="+argDocNo;
	
	if(argType == "True")
	{
		strUrl += "&ACC="+argUserId;
		strUrl += "&SOURCE_ORGNO="+argOrgNo;
	}
	//1060726	JOE		1060582			新增鐵改使用參數TYPE--S
	if(document.all["OrgNickName"].value == "RRB")
		strUrl += "&TYPE=3";
	//1060726	JOE		1060582			新增鐵改使用參數TYPE--E
	
	//1050720	Joe	1050087	二代系統升級	
	var strArtifact = document.all["H_Artifact"].value;
	strUrl += "&SAMLart=" + strArtifact;
	//jf_OpenChildWin(strUrl, "", 760, 520 );
	jf_OpenChildWin(strUrl, "", 960, 720 );
}
