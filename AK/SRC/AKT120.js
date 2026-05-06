/*
 *  2008.09.24	Cola	0970650 (交通部)退文客製化
 *  2008.10.27	Cola	0970973	修正AKT120警示訊息
 *	2008.11.28	Leslie	0970265	[0971090]領務局需求，已掃描公文可退文
 *  2009.10.09  Jane    0980443 線上簽核公文經過AKP360點收加簽產生副版後,應不允許退文(因加簽過後,公文無法再於系統中執行任何異動)
 * 	2009.11.11	Howard	0980587	配合藥檢局四局合一修改依庫房管理模式ChkUserDocPriv()新增公文文號之參數並調整退文訊息
 *  2010.06.30	Leslie	0990357	修改程式UI控制，於輸入線上簽核公文時，將"歸檔單位"選項Disable
 *	2012.05.08	Cloud	1010368 領務局增加公文退文前檢查是否有完整檔號，並跳出[公文已編目，是否要退文?]訊息
 *  2012.08.30	Jagle	(工單)	配合領務局組改更改機關代碼(303030000B改為A03010000B)
 *  2012.05.30	Cloud	1000751	修改以機關別稱判斷使用機關
 *	2014.03.26	Eric	1030177	新增傳入DOC_NO到ChkUserDocPriv
 *	2015.03.30	Cloud	1040185	(中榮)修改電子公文可退回歸檔單位，修改退回歸檔單位為退回總發
 *  2015.07.07  Kenny   1040504 輸入文號後Onblur行為增加取得主旨欄位資訊並顯示；增加顯示退文後負責單位資訊
 *  2015.08.18  Kenny   1040650 修正清除功能不清除帳號隱藏欄位；調整確認刪除邏輯避免點選不清除時仍清除欄位
 *	2016.08.15	Kevin_C	1050087	升二代
 * 2016.10.19	Joe		1050087	二代修正配合行動平台
 *  2017.02.07	Joe		鐵改144	(Merge1000186)可支援已掃描後公文之退文作業
 * 2017.10.27   Cloud   1061030 修改，增加檢核COMBINE_TYPE為1 or 2時，如當前公文為子文，則不可退文
 * 1070830      Zen     1070678 弱掃Ajax修正
 * 2020.01.14	Kevin_C	1081139	修正已點收公文不會設定基資，清除後主旨無法設定，以及換下一筆公文時承辦單位不會更新等問題
 * 1110103		Zen     1101292	修正多次點擊重複PostBack之問題
 * 1110907		Joe		1110400	修正交通部母子文一併退文時，需跳出提示訊息通知使用者
 * 1121116      Clloud  1120791 字型120時畫面無法顯示10字，改為紀錄長度，由client端給予em
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//2012.05.08	Cloud	1010368 領務局增加公文退文前檢查是否有完整檔號，並跳出[公文已編目，是否要退文?]訊息
var hasAllFileSeq = new Boolean();
hasAllFileSeq = false;

//1070830 Zen 1070678 弱掃Ajax修正
AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}

//1050815	Kevin_C	1050087	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050815	Kevin_C	1050087	升二代
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}


//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
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
		case "":
			break;
		*/
	}	
}

//1050815	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	var strErr = "";

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
	
	//1050815	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		//[0970650]Add by Cola 新增取消退文功能鍵
		case "btCancelOpen":
	
			if (document.all["txDocNo"].value=="" || document.all["txDocNo"].value == null)
			{
				strErr+="\n請輸入欲取消退文之文號";				
				IsInput = false;
			}
			if (strErr != "")
			{ 
				Page_BlockSubmit = true;				
				alert(strErr);				
			}	
			else
			{
                //1070830 Zen 1070678 弱掃Ajax修正
                //var CheckResult = AKT120.CheckDoc(document.all["txDocNo"].value, document.all["txOrgNo"].value).value;
                var CheckResult = AK.AKT120.CheckDoc(document.all["txDocNo"].value, document.all["txOrgNo"].value).value;
			
				if (CheckResult != "")
				{
					alert(CheckResult);
					Page_BlockSubmit = true;	
				}
				else
					Page_BlockSubmit = false;	
			}
			//1050815	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();						
			jf_ToolBarSubmit(xObjectName);
			break;
			//Cola -- end --
		case "btOpen":			
			//Ericks start 2005/10/12
			Page_BlockSubmit = true;
			var IsInput = true;
			if ( document.all["dlReject"].value == "" || document.all["dlReject"].value == null)
			{
				strErr="請輸入退文原因";				
				IsInput = false;
			}
			if (document.all["txDocNo"].value=="" || document.all["txDocNo"].value == null)
			{
				strErr+="\n請輸入退文文號";				
				IsInput = false;
			}
			if (!IsInput)
			{ 
				Page_BlockSubmit = true;				
				alert(strErr);				
			}
			else
			{
				if(TbOnBlur("txDocNo"))
				{						
					if (TbOnBlur("txReject"))
					{
						//[0970650]Add by Cola 退文時先跳出訊息詢問是否確定
						var tmp = "";
						if(document.all["rbListReturn_0"].checked)
							//1040330	Cloud	[1040185]	(中榮)修改電子公文可退回歸檔單位，並且修改退回歸檔單位為退回總發
						    //tmp = "承辦單位";
							//1050815	Kevin_C	1050087	升二代
							//tmp = document.all.tags("Label")[0].innerText;	
							tmp = document.all.rtnType0.textContent;
						else if(document.all["rbListReturn_1"].checked)
							//1040330	Cloud	[1040185]	(中榮)修改電子公文可退回歸檔單位，並且修改退回歸檔單位為退回總發
							//tmp = "歸檔單位";
							//1050815	Kevin_C	1050087	升二代
							//tmp = document.all.tags("Label")[1].innerText;
							tmp = document.all.rtnType1.textContent;
						//1110907	Joe		1110400		修正交通部母子文一併退文時，需跳出提示訊息通知使用者--S
						var CombineMsg="";
						var bCombineComfirm = true;
						if(document.all["txOrgNickName"].value == "MOTC"){
							var CheckResult = AK.AKT120.GetComNo(document.all["txOrgNo"].value, document.all["txDocNo"].value).value;
							//表示有彙併辦子文
							if(CheckResult.length > 1){
								var bMultiChild = false;
								for(var i=0;i<CheckResult.length;i++){
									if(i == 0)
										CombineMsg += "本文號包含下列彙併辦文號， 將一併執行退文：\n母文號：" + CheckResult[i] + "、子文號：";
									else if(!bMultiChild)
									{
										CombineMsg += CheckResult[i];
										bMultiChild = true;
									}
									else
										CombineMsg += "、" + CheckResult[i];
								}
								CombineMsg += "\n確定要退至"+tmp+"？"
							}
						}
						//1110907	Joe		1110400		修正交通部母子文一併退文時，需跳出提示訊息通知使用者--E
						//2012.05.08	Cloud	1010368 領務局增加公文退文前檢查是否有完整檔號，並跳出[公文已編目，是否要退文?]訊息
						if(document.all.H_CheckAllFileSeq && document.all.H_CheckAllFileSeq.value == "Y"　&& hasAllFileSeq) 
						{
							if(window.confirm("公文已編目，是否要退文？"))
							{
								if(window.confirm("確定要將"+document.all["txDocNo"].value+"退至"+tmp+"？"))
								{
									Page_BlockSubmit = false;
								}					
								else
									Page_BlockSubmit = true;
							}					
							//1110907	Joe		1110400		修正交通部母子文一併退文時，需跳出提示訊息通知使用者--S
							else if(CombineMsg != "")
							{
								if(window.confirm(CombineMsg))
								{
									Page_BlockSubmit = false;
								}					
								else
									Page_BlockSubmit = true;
							}
							//1110907	Joe		1110400		修正交通部母子文一併退文時，需跳出提示訊息通知使用者--E
							else
								Page_BlockSubmit = true;
						}
						//1110907	Joe		1110400		修正交通部母子文一併退文時，需跳出提示訊息通知使用者--S
						else if(CombineMsg != "")
						{
							if(window.confirm(CombineMsg))
							{
								Page_BlockSubmit = false;
							}					
							else
								Page_BlockSubmit = true;
						}
						//1110907	Joe		1110400		修正交通部母子文一併退文時，需跳出提示訊息通知使用者--E
						else
						{
							if(window.confirm("確定要將"+document.all["txDocNo"].value+"退至"+tmp+"？"))
							{
								Page_BlockSubmit = false;
							}					
							else
								Page_BlockSubmit = true;
						}
						//Cola -- end --
					}
					else
					{
						Page_BlockSubmit = true;	
					}					
				}
				else {Page_BlockSubmit = true;}				
			}			
			//Ericks end  2005/10/12		
			//1050815	Kevin_C	1050087	升二代			
			//jf_ToolBarSubmit();						
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			var strOrgNo = document.all["txOrgNo"].value;//[---]Modify by Cola 清除時不清空機關代碼
			var strUserID = document.all["H_UserId"].value;//1040818	Kenny	[1040650]	不能清除帳號
			//1090114	Kevin_C	1081139	不清除系統參數
			var strDocRtn = document.all["txDocReturn"].value;
			//1040818	Kenny	[1040650]	調整確認清除至條件中避免點選不清除時仍清除欄位
			//jf_ConfirmClean();
			if(jf_ConfirmClean())
			{	
				//2008.10.27 Add by Cola 清除後預設為點選承辦單位
				document.all["rbListReturn_0"].checked = true;
				document.all["txOrgNo"].value = strOrgNo;
				//1050815	Kevin_C	1050087	升二代
				//document.all["txDocNo"].focus(); //增加focus #2007.02.27 Andy	
				$('#txDocNo').focus();
				//2012.05.11 CLOUD 清除公文狀態欄位
				//1050815	Kevin_C	1050087	升二代
				//document.all["lbDocState"].innerText = "";
				document.all["lbDocState"].textContent = "";
			    //1040707   Kenny   [1040504]   清除新增之主旨欄位
				//1050815	Kevin_C	1050087	升二代
				//document.all["txSubject"].innerText = "";
				document.all["txSubject"].textContent = "";
				//1040818	Kenny	[1040650]	不能清除帳號
				document.all["H_UserId"].value = strUserID;
				//1050815	Kevin_C	1050087	升二代
				//document.all.tags("Label")[0].innerText = document.all.tags("Label")[0].innerText.split('：')[0];
				//1090114	Kevin_C	1081139	修正無法清除承辦單位的問題
				//document.all.tags("Label")[0].textContent = document.all.tags("Label")[0].textContent.split('：')[0];
				document.all["rbListReturn"][1].parentElement.childNodes[1].textContent = document.all["rbListReturn"][1].parentElement.childNodes[1].textContent.split('：')[0];
				//1090114	Kevin_C	1081139	不清除系統參數
				document.all["txDocReturn"].value = strDocRtn;
			}
			break;
	}
}

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
    //* 1121116      Clloud  1120791 ---二代不需要 一併mark
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,null);
	ShowMsg();
    //* 1121116      Clloud  1120791 字型120時畫面無法顯示10字，改為紀錄長度，由client端給予em
	var len = document.all["txDocLen"].value + ".5em";
	$("#txDocNo").css("width", len);
}

function OnWSResult(argResult)
{

}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050815	Kevin_C	1050087	升二代
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function TbOnBlur(argTextBox) 
{
	//退文原因
	
	if (argTextBox=="txReject")
	{	
		//Ericks start 2005/10/12		
		Page_BlockSubmit = true;	
		if ( document.all["dlReject"].value == "" || document.all["dlReject"].value == null)
		{			
			//ErrMsg = "請輸入退文原因";
			//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([ErrMsg])),"");												
			return false;
		}
		
		//Ericks end 2005/10/12
		if (document.all["txReject"].value=="")
		{
			document.all["dlReject"].selectedIndex=0;			
			return false;
		}
		var IsExist=false;
		for(var i=0;i<document.all["dlReject"].length;i++)
		{
			if (document.all["dlReject"].options[i].value==document.all["txReject"].value)
			{
				document.all["dlReject"].selectedIndex=i;
				IsExist=true;				
			}
		}
		if (!IsExist)
		{
			alert("無此退文代碼");
			return false;
		}
		return true;
	}
	
	//公文文號
	
	if (argTextBox=="txDocNo")
	{
		Page_BlockSubmit = true;	
		var strDocNo=document.all["txDocNo"].value;
		if (strDocNo=="")
		{
			//1050815	Kevin_C	1050087	升二代
			//document.all["lbDocState"].innerText = "";			
			document.all["lbDocState"].textContent = "";			
			return false;
		}
		//###################justin 093/02/06 修改#######################################
		//1.先取出該公文文號之負責人單位代碼 & 名稱
		//2.call ChkUserDocPriv 檢查該公文是否為系統使用者所負責之公文
		//3.判斷公文狀態 
		//	3.1 公文狀態<20 且 TOBESIGN有資料 則允許退文
		//	3.2 公文狀態=20 且 IS_CREATE_COPY_FILE=0 則允許退文
		//###############################################################################
		var KeyName = new Array(2)
		var KeyValue = new Array(2);
		var RtnFldName = new Array(4);
		var OrdFldName = new Array(1);
		
		KeyName[0] = "SOURCE_ORGNO";
		KeyName[1] = "DOC_NO";
		KeyValue[0] = document.all["txOrgNo"].value;
		KeyValue[1] = strDocNo;
		RtnFldName[0] = "RPSDEPT_NO";
		RtnFldName[1] = "RPSDEPT_NAME";
		RtnFldName[2] = "DOC_STATE";
		RtnFldName[3] = "EXTFILE_DATE";
		RtnFldName[4] = "IS_CREATE_COPY_FILE";
		//  2012.05.08	Cloud	1010368 領務局增加取得公文年度號，卷次號，案次號，分類號，目次號
		RtnFldName[5] = "FILE_YEAR";
		RtnFldName[6] = "FILE_CASE";
		RtnFldName[7] = "FILE_CLS";
		RtnFldName[8] = "FILE_SEQ";
		RtnFldName[9] = "FILE_VOL";
	    //1040707   Kenny   [1040504]   增加取得主旨欄位資訊
		RtnFldName[10] = "FROM_SUBJECT";
	    //* 2017.10.27   Cloud   1061030 修改，增加檢核COMBINE_TYPE為1 or 2時，如當前公文為子文，則不可退文
		RtnFldName[11] = "COM_NO";
		//  2012.05.08	Cloud	1010368 領務局增加取得公文年度號，卷次號，案次號，分類號，目次號
		OrdFldName[0] = "";
		
		var param = new Array(5);
		param[0] = "DOC_MAIN";
		param[1] = KeyName;
		param[2] = KeyValue;
		param[3] = RtnFldName;
		param[4] = OrdFldName;	

		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,param);
		
		if (RtnObj.value.ErrorClass.IsErr)
		{
			ErrMsg = "無此公文文號資料";
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([ErrMsg])),"");			
			return false;
		}
		
		var strRpsDeptNo  = RtnObj.value.RtnField0[0];	//負責單位代碼
		var strRpsDeptName= RtnObj.value.RtnField1[0];	//負責單位名稱
		var strStateNo = RtnObj.value.RtnField2[0];		//公文狀態代碼
		var strFileDate= RtnObj.value.RtnField3[0];		//應歸檔日期
		var strIsCopy  = RtnObj.value.RtnField4[0];		//點收已加簽及產生副版影像
		//  2012.05.08	Cloud	1010368 領務局增加取得公文年度號，卷次號，案次號，分類號，目次號
		var strFileYear  =	RtnObj.value.RtnField5[0];	//負責單位代碼
		var strFileCase	 =	RtnObj.value.RtnField6[0];	//負責單位名稱
		var strFileCls   =	RtnObj.value.RtnField7[0];		//公文狀態代碼
		var strFileSeq   =	RtnObj.value.RtnField8[0];		//應歸檔日期
		var strFileVol = RtnObj.value.RtnField9[0];		//點收已加簽及產生副版影像
	    //1040707   Kenny   [1040504]   增加取得主旨欄位資訊
		var steSubject = RtnObj.value.RtnField10[0];
	    //  2012.05.08	Cloud	1010368 領務局增加取得公文年度號，卷次號，案次號，分類號，目次號
	    //* 2017.10.27   Cloud   1061030 修改，增加檢核COMBINE_TYPE為1 or 2時，如當前公文為子文，則不可退文
		var strComNo = RtnObj.value.RtnField11[0];
		
		//0981111	Howard	0980587	ChkUserDocPriv()新增公文文號之參數
		//var arrParam = new Array(2);
		var arrParam = new Array(3);
		arrParam[0] = strRpsDeptNo;						//公文負責單位
		arrParam[1] = document.all["H_UserId"].value;	//系統使用者帳號
		arrParam[2]	= strDocNo;
		
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","ChkUserDocPriv",false,arrParam);
		var ErrMsg = "";
		if (RtnObj.value.RtnStr == "" || RtnObj.value.RtnStr == null)
		{
			//0981111	Howard	0980587	判斷目前庫房管理模式調整顯示訊息
			if(document.all.h_StoreMode && document.all.h_StoreMode.value == "1") 
			{		
				//依據公文歸檔庫房
                //1070830 Zen 1070678 弱掃Ajax修正
                //var StoreName = AKT120.GetStoreName(document.all["txOrgNo"].value, strDocNo).value;
                var StoreName = AK.AKT120.GetStoreName(document.all["txOrgNo"].value, strDocNo).value;
				ErrMsg="抱歉!!公文文號:"+strDocNo+" 歸檔庫房為"+StoreName+ " 非您所管理歸檔庫房公文，系統不允許您執行退文。";
			}
			else
			{
				//檢查公文是否為該系統使用者可處理之公文
				ErrMsg = "抱歉!!公文文號：" + strDocNo + " 承辦單位為 " + strRpsDeptName + " 非您所管理承辦單位公文，系統不允許您執行退文";
			}
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([ErrMsg])),"");
			return false;
		}
		else
		{
			//檢查公文狀態判斷是否可執行退文
			//只有公文狀態=20 且 IS_CREATE_COPY_FILE=0 才可執行退文
			//若公文狀態<20 且TOBESIGN有資料 也可以執行退文(justin 093/02/06 新增"未點收公文退文"功能)
			
			//Ericks start 2005/10/12
			/*
			if ((strStateNo == "20" && (strIsCopy == "0") || strIsCopy == "") || ((strStateNo < "20") && (CheckToBeSign())))
			{					
				alert("strStateNo="+strStateNo+"strIsCopy="+strIsCopy+"CheckToBeSign()="+CheckToBeSign());
				Page_BlockSubmit = false;
			}
			*/
			//1010830	Jagle	(工單)	配合領務局組改更改機關代碼(303030000B改為A03010000B)
			//0971128	Leslie[0970265]	領務局需求，已掃描公文可退文
			//if(document.all["txOrgNo"].value == "303030000B")
			//2012.05.30	Cloud	1000751	修改以機關別稱判斷使用機關
			//if(document.all["txOrgNo"].value == "A03010000B")
			// 1060207	Joe		鐵改144	(Merge1000186)可支援已掃描後公文之退文作業
		    // if(document.all["txOrgNickName"].value == "BOCA")
		    //* 2017.10.27   Cloud   1061030 修改，增加檢核COMBINE_TYPE為1 or 2時，如當前公文為子文，則不可退文
		    if (strComNo != "" && strDocNo != strComNo)
		    {
		        var EXKeyName = new Array(2)
		        var EXKeyValue = new Array(2);
		        var EXRtnFldName = new Array(1);
		        var EXOrdFldName = new Array(1);

		        EXKeyName[0] = "SOURCE_ORGNO";
		        EXKeyName[1] = "DOC_NO";
		        EXKeyValue[0] = document.all["txOrgNo"].value;
		        EXKeyValue[1] = strDocNo;
		        EXRtnFldName[0] = "COMBINE_TYPE";
		        EXOrdFldName[0] = "";
		        var param = new Array(5);
		        param[0] = "DOC_EXTRA";
		        param[1] = EXKeyName;
		        param[2] = EXKeyValue;
		        param[3] = EXRtnFldName;
		        param[4] = EXOrdFldName;

		        var EXRtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, param);
		        if (EXRtnObj.value.RtnField0[0] == "1" || EXRtnObj.value.RtnField0[0] == "2")
		        {
		            alert(strDocNo + '為子文，不可單獨退文。母文文號：' + strComNo);
		            return false;
		        }
		    }
			//1090114	Kevin_C	1081139	此處不可直接return，需執行後面的公文基資設定
			var bIsReject = false;
			if(document.all["txDocReturn"].value == "Y" || document.all["txOrgNickName"].value == "BOCA")
			{
				if ( strStateNo == "25")
				{
					//1050815	Kevin_C	1050087	升二代
					//document.all["lbDocState"].innerText = "";				
					document.all["lbDocState"].textContent = "";				
					//1090114	Kevin_C	1081139	此處不可直接return，需執行後面的公文基資設定
					//return true;					
					bIsReject = true;
				}
			}
			//1090114	Kevin_C	1081139	增加已掃描不可退文之訊息
			else if(strStateNo=="25")
			{
				alert(strDocNo + '為已掃描無法再執行退文作業');
				return true;
			}
				
			//1090114	Kevin_C	1081139	已判斷為可退文的情況不用進行點收加簽檢核
			if(!bIsReject)
			{
				//0981009 線上簽核公文經過AKP360點收加簽產生副版後,應不允許退文(因加簽過後,公文無法再於系統中執行任何異動)[0980443]-Jane
				//檢核tran_d中是否有tx_code='26'的紀錄,若有紀錄表示為線上簽核公文且已進行加簽,故不可允許執行退文作業
				var strName = new Array(3)
				var strValue = new Array(3);
				var strRtnFldName = new Array(1);
				var strOrdFldName = new Array(1);
				
				strName[0] = "SOURCE_ORGNO";
				strName[1] = "DOC_NO";
				strName[2] = "TX_CODE";
				strValue[0] = document.all["txOrgNo"].value;
				strValue[1] = strDocNo;
				strValue[2] = "26";
				strRtnFldName[0] = "DOC_NO";
				strOrdFldName[0] = "";
				
				var argParam = new Array(5);
				argParam[0] = "TRAN_D";
				argParam[1] = strName;
				argParam[2] = strValue;
				argParam[3] = strRtnFldName;
				argParam[4] = strOrdFldName;	
	
				RtnObjTrand = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,argParam);
				
				if(RtnObjTrand.value.ErrorClass.IsErr == false)//已點收
				{
					Page_BlockSubmit = true;
					var strStateDesc = GetDocStateDesc(strStateNo);
					ErrMsg = "公文文號：" + strDocNo + " " + strStateDesc + "\n" + "無法再執行退文作業"
					jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([ErrMsg])),"");
					//1050815	Kevin_C	1050087	升二代
					//document.all["lbDocState"].innerText = strStateDesc;			
					document.all["lbDocState"].textContent = strStateDesc;			
					return false;
				}
			}
			//Jane---End
			//1090114	Kevin_C	1081139	已判斷為可退文時需設定公文基資
			//if ( strStateNo =="13" || strStateNo =="20")
			if ( strStateNo =="13" || strStateNo =="20" || bIsReject)
			{	
				//2008.10.27 Modify by Cola 當可退文時，將後方錯誤訊息清除	
				//1050815	Kevin_C	1050087	升二代				
				//document.all["lbDocState"].innerText = "";				
				document.all["lbDocState"].textContent = "";
				
				//0990630	Leslie[0990357]	增加檢核公文簽核類型
				//1040330	Cloud	[1040185]	修改電子可退回歸檔單位
				//CheckDocSignType();
				//2012.05.08	Cloud	1010368 return true 改為檢核完是否有完整檔號後
			    //return true;
			    //1040707   Kenny   [1040504]   當可退文時增加將負責單位資訊串於承辦單位後
				//1050815	Kevin_C	1050087	升二代	
				//var strOldText = document.all["rbListReturn"][1].parentElement.childNodes[1].innerText;
				var strOldText = document.all["rbListReturn"][1].parentElement.childNodes[1].textContent;
				//1090114	Kevin_C	1081139	修正換下一筆公文時承辦單位不會更新的問題
				//if (strOldText.indexOf("：")<0)  // 未處理過才增加處理承辦單位，避免輸入文號號直接點選退文鍵會觸發兩次Onblur行為而串入兩次
				strOldText = strOldText.split("：")[0];
					//1050815	Kevin_C	1050087	升二代
				    //document.all["rbListReturn"][1].parentElement.childNodes[1].innerText = strOldText + "：" + strRpsDeptName;
					document.all["rbListReturn"][1].parentElement.childNodes[1].textContent = strOldText + "：" + strRpsDeptName;
				//1050815	Kevin_C	1050087	升二代
				//document.all["txSubject"].innerText = steSubject;
				//1090114	Kevin_C	1081139	改用value避免清除後無法設定主旨
				//document.all["txSubject"].textContent = steSubject;
				document.all["txSubject"].value = steSubject;

			}	
			//Ericks end 2005/10/12
			else
			{
				Page_BlockSubmit = true;
				var strStateDesc = GetDocStateDesc(strStateNo);									
				ErrMsg = "公文文號：" + strDocNo + " " + strStateDesc + "\n" + "無法再執行退文作業"
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([ErrMsg])),"");
				//1050815	Kevin_C	1050087	升二代
				//document.all["lbDocState"].innerText = strStateDesc;			
				document.all["lbDocState"].textContent = strStateDesc;
				return false;
			}
			//2012.05.08	Cloud	1010368 領務局增加公文退文前檢查是否有完整檔號，並跳出[公文已編目，是否要退文?]訊息
			if(strFileYear!=""&& strFileCase!="" && strFileCls!="" && strFileSeq!="" && strFileVol!="")
			{
				hasAllFileSeq=true;
				//1050815	Kevin_C	1050087	升二代
				//document.all["lbDocState"].innerText = "※公文已編目";	
				document.all["lbDocState"].textContent = "※公文已編目";	
				document.all["lbDocState"].className = "KeyUpperField";	
			}
			else
			{
				hasAllFileSeq=false;
				document.all["lbDocState"].className = "hide";	
			}
		
		}
		return true;
	}
	//[0970650]Add by Cola 因應現在增加取消退文之功能，因此公文文號onblur之檢核需修正，因此額外新增一類別for公文文號onblur時呼叫
	if (argTextBox=="txDocNo_No")
	{
		Page_BlockSubmit = true;	
		var strDocNo=document.all["txDocNo"].value;
		if (strDocNo=="")
		{
			//1050815	Kevin_C	1050087	升二代
			//document.all["lbDocState"].innerText = "";			
			document.all["lbDocState"].textContent = "";
			return false;
		}
		//###################justin 093/02/06 修改#######################################
		//1.先取出該公文文號之負責人單位代碼 & 名稱
		//2.call ChkUserDocPriv 檢查該公文是否為系統使用者所負責之公文
		//3.判斷公文狀態 
		//	3.1 公文狀態<20 且 TOBESIGN有資料 則允許退文
		//	3.2 公文狀態=20 且 IS_CREATE_COPY_FILE=0 則允許退文
		//###############################################################################
		var KeyName = new Array(2)
		var KeyValue = new Array(2);
		var RtnFldName = new Array(4);
		var OrdFldName = new Array(1);
		
		KeyName[0] = "SOURCE_ORGNO";
		KeyName[1] = "DOC_NO";
		KeyValue[0] = document.all["txOrgNo"].value;
		KeyValue[1] = strDocNo;
		RtnFldName[0] = "RPSDEPT_NO";
		RtnFldName[1] = "RPSDEPT_NAME";
		RtnFldName[2] = "DOC_STATE";
		RtnFldName[3] = "EXTFILE_DATE";
		RtnFldName[4] = "IS_CREATE_COPY_FILE";
	    //1040707   Kenny   [1040504]   增加取得主旨欄位資訊
		RtnFldName[5] = "FROM_SUBJECT";
		OrdFldName[0] = "";
		
		var param = new Array(5);
		param[0] = "DOC_MAIN";
		param[1] = KeyName;
		param[2] = KeyValue;
		param[3] = RtnFldName;
		param[4] = OrdFldName;	

		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,param);
		
		if (RtnObj.value.ErrorClass.IsErr)
		{
			ErrMsg = "無此公文文號資料";
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([ErrMsg])),"");			
			return false;
		}
		
		var strRpsDeptNo  = RtnObj.value.RtnField0[0];	//負責單位代碼
		var strRpsDeptName= RtnObj.value.RtnField1[0];	//負責單位名稱
		var strStateNo = RtnObj.value.RtnField2[0];		//公文狀態代碼
		var strFileDate= RtnObj.value.RtnField3[0];		//應歸檔日期
		var strIsCopy = RtnObj.value.RtnField4[0];		//點收已加簽及產生副版影像
	    //1040707   Kenny   [1040504]   增加取得主旨欄位資訊
		var steSubject = RtnObj.value.RtnField5[0];
		//1030326	Eric 1030177 新增傳入DOC_NO到ChkUserDocPriv
		//var arrParam = new Array(2);
		var arrParam = new Array(3);
		arrParam[0] = strRpsDeptNo;						//公文負責單位
		arrParam[1] = document.all["H_UserId"].value;	//系統使用者帳號
		//1030326	Eric 1030177 新增傳入DOC_NO到ChkUserDocPriv
		arrParam[2]	= strDocNo;
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","ChkUserDocPriv",false,arrParam);
		var ErrMsg = "";
		if (RtnObj.value.RtnStr == "" || RtnObj.value.RtnStr == null)
		{
			//檢查公文是否為該系統使用者可處理之公文
			ErrMsg = "抱歉!!公文文號：" + strDocNo + " 承辦單位為 " + strRpsDeptName + " 非您所管理承辦單位公文，系統不允許您執行相關作業";
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([ErrMsg])),"");
			return false;
		}
		else
		{
			//檢查公文狀態判斷是否可執行退文
			//只有公文狀態=20 且 IS_CREATE_COPY_FILE=0 才可執行退文
			//若公文狀態<20 且TOBESIGN有資料 也可以執行退文(justin 093/02/06 新增"未點收公文退文"功能)
			
			//Ericks start 2005/10/12
			/*
			if ((strStateNo == "20" && (strIsCopy == "0") || strIsCopy == "") || ((strStateNo < "20") && (CheckToBeSign())))
			{					
				alert("strStateNo="+strStateNo+"strIsCopy="+strIsCopy+"CheckToBeSign()="+CheckToBeSign());
				Page_BlockSubmit = false;
			}
			*/
			if ( strStateNo =="13" || strStateNo =="20" || strStateNo =="15")
			{	
				//1050815	Kevin_C	1050087	升二代
				//document.all["lbDocState"].innerText = "";	
				document.all["lbDocState"].textContent = "";
				
				//0990630	Leslie[0990357]	增加檢核公文簽核類型
				//1040330	Cloud	[1040185]	修改電子可退回歸檔單位
			    //CheckDocSignType();

			    //1040707   Kenny   [1040504]   當可退文時增加將負責單位資訊串於承辦單位後
				//1050815	Kevin_C	1050087	升二代 -S
				// var strOldText = document.all["rbListReturn"][1].parentElement.childNodes[1].innerText;
				// document.all["rbListReturn"][1].parentElement.childNodes[1].innerText = strOldText + "：" + strRpsDeptName;
				// document.all["txSubject"].innerText = steSubject;
				var strOldText = document.all["rbListReturn"][1].parentElement.childNodes[1].textContent;
				document.all["rbListReturn"][1].parentElement.childNodes[1].textContent = strOldText + "：" + strRpsDeptName;
				document.all["txSubject"].textContent = steSubject;
				//1050815	Kevin_C	1050087	升二代 -E
				return true;
			}	
			//Ericks end 2005/10/12
			else
			{
				Page_BlockSubmit = true;
				var strStateDesc = GetDocStateDesc_Motc(strStateNo);									
				ErrMsg = "公文文號：" + strDocNo + " " + strStateDesc + "\n" + "無法再執行相關作業"
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([ErrMsg])),"");
				//1050815	Kevin_C	1050087	升二代
				//document.all["lbDocState"].innerText = strStateDesc;			
				document.all["lbDocState"].textContent = strStateDesc;
				return false;
			}
		}		
		return true;
	}	
	
}

//檢查公文文號是否存在於TOBESIGN
function CheckToBeSign()
{
	var KeyName = new Array(2)
	var KeyValue = new Array(2);
	
	KeyName[0] = "SOURCE_ORGNO";
	KeyName[1] = "DOC_NO";
	KeyValue[0] = document.all["txOrgNo"].value;
	KeyValue[1] = document.all["txDocNo"].value;
	var arParam = new Array(3);
	arParam[0] = "TOBESIGN";
	arParam[1] = KeyName;
	arParam[2] = KeyValue;
	RtnObj = jf_CallWS("template/lib/sys.asmx","CheckDataKeyDuplicate",false,arParam);
	return RtnObj.value.RtnBool;
}

function DlOnBlur(argDl)
{
	//退文原因
	if (argDl=="dlReject")
	{
		document.all["txReject"].value=document.all["dlReject"].options[document.all["dlReject"].selectedIndex].value;
	}
}

function GetDocStateDesc(argDocState)
{
	switch (argDocState)
	{
		//2008.10.27 Modify by Cola 狀態為09之公文應回傳續辦中, 同時新增設定01、02、10
		case "01":
			return "未辦畢";
		case "02":
			return "已銷號";					
		case "09":
			return "續辦中";
		case "10":
			return "結案未歸檔";			
		case "15":
			return "已退文";
		case "20":
			return "已點收確認";
		case "25":
			return "已掃描";
		case "30":
			return "已銷毀";
		case "35":
			return "已提供文史機關使用";
		case "40":  
			return "已移轉";
		case "50":  
			return "已移交";
	}
	//2008.10.27 Marked by Cola 因目前已修改可涵蓋所有狀態，因此不需再判斷是否<20
	/*if (argDocState < 20)
		return "未辦畢無法執行退文作業";*/
	return "未知";	
}

function GetDocStateDesc_Motc(argDocState)
{
	switch (argDocState)
	{
		case "20":
			return "已點收確認";
		case "25":
			return "已掃描";
		case "30":
			return "已銷毀";
		case "35":
			return "已提供文史機關使用";
		case "40":  
			return "已移轉";
		case "50":  
			return "已移交";
	}
	if (argDocState < 20)
		return "未辦畢";
	return "未知";	
}

//0990630	Leslie[0990357]	增加取得公文之簽核類型，以決定"歸檔單位"是否Disable
function CheckDocSignType()
{
	if(document.all["rbListReturn"].className == "hide")	//系統參數RTN_RCVDEPT設為"3,4,5"時，才需進行下列設定
		return;
	var strDocNo=document.all["txDocNo"].value;
	var strMDCEName = new Array(2)
	var strMDCEValue = new Array(2);
	var strMDCERtnFldName = new Array(1);
	var strMDCEOrdFldName = new Array(1);
	
	strMDCEName[0] = "SOURCE_ORGNO";
	strMDCEName[1] = "DOC_NO";
	strMDCEValue[0] = document.all["txOrgNo"].value;
	strMDCEValue[1] = strDocNo;
	strMDCERtnFldName[0] = "SIGN_TYPE";
	strMDCEOrdFldName[0] = "";
	
	var argMDCEParam = new Array(5);
	argMDCEParam[0] = "DOC_EXTRA";
	argMDCEParam[1] = strMDCEName;
	argMDCEParam[2] = strMDCEValue;
	argMDCEParam[3] = strMDCERtnFldName;
	argMDCEParam[4] = strMDCEOrdFldName;	

	RtnObjMDCE = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,argMDCEParam);
	
	var strSignType = RtnObjMDCE.value.RtnField0[0];	//SIGN_TYPE
	if(strSignType == "E")
	{
		document.all["rbListReturn_1"].disabled = true;
		document.all["rbListReturn_0"].click();
	}
	else
	{
		document.all["rbListReturn_1"].disabled = false;
	}
}