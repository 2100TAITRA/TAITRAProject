/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.10.16
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2006.10.03	Whay	950871	AKC320回傳AKM320帶回版本別
 * 2008.05.21	Cola	0960038	按下搜索帶出之子視窗改為EAC005
 * 2008.7.30	Cola	0970679	開啟EAC005時，網址參數必需額外傳入SamLart(權仗)
 * 2016.06.16	Kenny	1050463	增加隱藏欄位紀錄分類名並調整寫入XML的分類名資料來源
 * 2017.02.07   Justin  1050087 二代公文修改
 * 2017.05.05   Justin  1050087 二代公文修改-修正錯誤訊息顯示問題
 * 2017.11.23	Kevin_C	1061115	儲存前檢核，因弱掃對Table名稱進行檢核不能有等號，故改用AJAX進行檢核
 * 1070830      Zen     1070678 弱掃Ajax修正
 * 2020.03.04	Cloud	1081109	修改，分類號空白時，年度/版本onblur時進行互轉
 * 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況
 * 1101122		Joe		1101248	修正案名不可輸入Json格式跳脫字元
 * 1110103		Zen     1101292	修正多次點擊重複PostBack之問題
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060207  Justin [1050087] 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

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

//1060207  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060207  Justin [1050087] 二代公文修改
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

//1060207  Justin [1050087] 二代公文修改 
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
	
    //1060207  Justin [1050087] 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			if(document.all.txCaseNo.value=="")
			{ 
			   alert("案次號不可為空白!") ;Page_BlockSubmit=true;
			}else Page_BlockSubmit=false;
		    //1060207  Justin [1050087] 二代公文修改 
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
		    //1060207  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1060207  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1060207  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			var Ver_No = document.all["txVerNo"].value;
			jf_ConfirmClean();
		    //1060207  Justin [1050087] 二代公文修改 
			//document.all["lbClsName"].innerText = "";
			document.all["lbClsName"].textContent = "";
			//1050616	Kenny	[1050463]	增加設定分類名隱藏欄位
			document.all.txClsName.value ="";
			document.all["txVerNo"].value = Ver_No;
			document.all.txCaseNo.value ="";
			document.all.txCaseNo.disabled = false;
		    //1060207  Justin [1050087] 二代公文修改
		    //document.all.txCaseNo.style.backgroundColor = "FFFFFF";
			document.all.txCaseNo.style.backgroundColor = "";
            document.all.txCaseNo.className="KeyUpperField";
			document.all["txClsNo"].focus();
			break;
		case "btSearch":
			var strUrl = "";
			//xOldKey = document.all["txClsNo"].value;
			//strUrl = "AKC320.aspx?rtnObj=lbReturnValue&k1="+xOldKey;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			//[0960038]Modify by Cola 改為開啟EAC005
			//[0970679]Add by Cola 因為是由AK開啟EA，因此必需額外傳入SamLart，EA才可正確取得userInfo資訊
			//1090306 Cloud	[1081109] 增加檢核，判斷分類號不為空白時，版本、年度不可為空白-S
			if (document.all["txClsNo"].value != "" && (document.all["txVerNo"].value == "" && document.all["txCaseYear"].value == ""))
			{
				alert('分類號有值時，版本別、年度號不可皆為空白，請至少輸入一項。');
				return;
			}
			//1090306 Cloud	[1081109] 增加檢核，判斷分類號不為空白時，版本、年度不可為空白-e
			strUrl = "../../EA/EA01/EAC005.aspx?FILE_CLS="+document.all["txClsNo"].value+"&FILE_YEAR="+document.all["txCaseYear"].value+"&MODE=2&nFrom=AKM320&VER_NO="+document.all["txVerNo"].value+"&SAMLart="+GetParam("SAMLart");
			//jf_OpenChildWin(strUrl, "AKC320", 700, 500 );
			jf_OpenChildWin(strUrl, "EAC005", 700, 500 );
			break;
	}
}

function CallBack(argCallerId)
{
	//[0960038]Modify by Cola 改為開啟EAC005
	if(argCallerId=="EAC005")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			document.all["txCaseNo"].value=document.all["lbReturnValue"].options[2].value;
			document.all["txClsNo"].value = document.all["lbReturnValue"].options[1].value;
			
			if(document.all["lbReturnValue"].options[0].value!="")
				document.all["txCaseYear"].value=document.all["lbReturnValue"].options[0].value;
			//document.all["htxCaseKey"].value=document.all["lbReturnValue"].options[3].value;
			document.all["txVerNo"].value = document.all["lbReturnValue"].options[5].value;
			jf_OpenButtonSubmit(); //帶回後執行btopen
		}		
	}	
	/*if (argCallerId=="AKC320")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			document.all["txClsNo"].value=document.all["lbReturnValue"].options[0].value;
			document.all["txCaseNo"].value=document.all["lbReturnValue"].options[0].text;
			document.all["txCaseYear"].value=document.all["lbReturnValue"].options[1].text;
			//950871 AKC320回傳AKM320帶回版本別  by whay 0951003
			document.all["txVerNo"].value=document.all["lbReturnValue"].options[2].value;
			if (document.all["txCaseNo"].value!="" && document.all["txClsNo"].value!="")
			{
				document.all["txCaseNoChange"].value=document.all["txCaseNo"].value;
				__doPostBack("","");
				//document.activeElement.id = document.all.btOpen.id;
				//document.activeElement.click();
				//document.AKM320.btOpen.click();
			}
		}
	}*/
}
function Ck1OnClick()
{
	if(document.all.ck1.checked)
	{
		document.all.txCaseNo.value="";
		//document.all.txCaseNo.className="TextLabel";
		document.all.txCaseNo.disabled=true;
		document.all.txCaseNo.style.backgroundColor = "LightGrey";
	}
	else
	{
	    document.all.txCaseNo.disabled = false;
	    //1060207  Justin [1050087] 二代公文修改
		//document.all.txCaseNo.style.backgroundColor = "FFFFFF";
	    //document.all.txCaseNo.className="";
	    document.all.txCaseNo.style.backgroundColor = "";
	    document.all.txCaseNo.className = "KeyUpperField";
	}
}
function ClientOnLoad()
{
    //1060207  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	//jf_CallWS("lib/AK_LIB.asmx","GetCLS",false,null);	
}

var iCallID_Cls;
//* 2020.03.04	Cloud	1081109	修改，分類號空白時，年度/版本onblur時進行互轉
var iCallID_YearVerNo;
function OnWSResult(argResult)
{
	if(argResult.id == iCallID_Cls)
    {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsErr)
		{
		    document.all[CurrentObjId].focus();
		    //1060207  Justin [1050087] 二代公文修改 
		    //document.all["lbClsName"].innerText = "";
		    document.all["lbClsName"].textContent = "";
			//1050616	Kenny	[1050463]	增加設定分類名隱藏欄位
			document.all.txClsName.value ="";
			document.all["txCaseNo"].value  = "";//找不到分類號->清空案次號
			document.all["txCaseName"].value  = "";//找不到分類號->清空案次號
			document.all["H_LastYear"].value  = "";
			document.all["H_LastVerNo"].value = "";
			document.all["H_LastClsNo"].value = "";
//			if (WSResult.ErrorClass.ErrMessage[0].text==jf_GetErrMsg(NoData))
//				alert("無此分類代號");
//			else
				//1060505  Justin [1050087] 二代公文修改-修正錯誤訊息顯示問題
				//alert(WSResult.ErrorClass.ErrMessage[0].text);
			alert(WSResult.ErrorClass.ErrMessage[0]);
			document.all["txClsNo"].value= "";
		}
		else
		{
		    //1060207  Justin [1050087] 二代公文修改 
		    //document.all["lbClsName"].innerText = WSResult.ClsName;
		    document.all["lbClsName"].textContent = WSResult.ClsName;
			//1050616	Kenny	[1050463]	增加設定分類名隱藏欄位
			document.all.txClsName.value =WSResult.ClsName;
			document.all["txVerNo"].value = WSResult.VerNo;
			document.all["H_ClsKey"].value = WSResult.CLS_KEY;
			//紀錄本次資料以供下次呼叫時判斷之用
			document.all["H_LastYear"].value  = document.all["txCaseYear"].value;
			document.all["H_LastVerNo"].value = document.all["txVerNo"].value;
			document.all["H_LastClsNo"].value = document.all["txClsNo"].value;
		}
	}
	//1061123	Kevin_C	1061115	因弱掃對Table名稱進行檢核不能有等號，故改用AJAX進行檢核
    //else if (argResult.id == iCallID_CheckDup)
    //{
	//	if(jf_IsWebServiceSuccess(argResult))
	//	{
	//		WSResult = argResult.value;
	//		return WSResult.RtnBool;
	//	}
	//}
	else if (argResult.id == iCallID_YearVerNo)//
	{
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsErr)
		{
			//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息
			//alert(WSResult.ErrorClass.ErrMessage[0]);
			var bAlert = true;
			if (WSResult.ErrorClass.ErrMessage[0].indexOf("輸入區間含有多個版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
			{
				//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-e
				
				if(document.all["txVerNo"].value!="")
				{
					var checkmsg = WSResult.ErrorClass.ErrMessage[0].split('版本')
					for(var i=0 ;i<checkmsg.length;i++)
					{
						if(checkmsg[i].indexOf("啟用區間為")!=-1)
						{
							if(checkmsg[i].split('啟用區間為')[0]==document.all["txVerNo"].value)
							{
								bAlert = false;
								break;
							}
						}
					}
				}
				if(bAlert)
				{
					document.all["H_LastYear"].value = document.all["txCaseYear"].value;
					document.all["H_LastVerNo"].value = document.all["txVerNo"].value = "";
					document.all["txVerNo"].focus();
					alert(WSResult.ErrorClass.ErrMessage[0]);
				}
				
			}
			else
			{
				document.all[CurrentObjId].value = "";
				document.all["H_LastYear"].value = "";
				document.all["H_LastVerNo"].value = "";
				//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息
				alert(WSResult.ErrorClass.ErrMessage[0]);
			}
		}
		else
		{
			if (CurrentObjId == "txCaseYear")//年度號ONLBUR-帶回版本別一律設定
			{
				document.all["txVerNo"].value = WSResult.strVerNo;
			}
			else//版本別onblur
			{
				var dt = new Date();
				var strSysYear = dt.getFullYear() - 1911;
				if (WSResult.strEdate == "" || WSResult.strEdate >= strSysYear)//啟用中-無停用日或是停用日大於等於系統日
				{
					if (document.all["txCaseYear"].value == "" || document.all["txCaseYear"].value < WSResult.strSdate)//年度為空或是輸入年度小於起日則跳出訊息後直接帶入
					{
						if (document.all["txCaseYear"].value != "")//不為空再跳提醒
						alert("該版本啟用中，系統將預設帶入系統年。");
						document.all["txCaseYear"].value = strSysYear;
					}
				}
				else//停用版本
				{

					//年度為空白或是輸入年度不合理(小於起日或是大於停止日)則跳出訊息預設代最大
					if (document.all["txCaseYear"].value == "" || document.all["txCaseYear"].value< WSResult.strSdate ||  document.all["txCaseYear"].value > WSResult.strEdate)
					{
						if (document.all["txCaseYear"].value != "")//不為空再跳提醒
						{
							if (WSResult.strSdate != WSResult.strEdate)
								alert("該版本使用於：" + WSResult.strSdate + "~" + WSResult.strEdate + "年，系統將預設帶入最大年度。");
							else
								alert("該版本使用於：" + WSResult.strSdate + "年，系統將預設帶入。");
						}
						document.all["txCaseYear"].value = WSResult.strEdate;
					}
				}

			}
			document.all["H_LastYear"].value = document.all["txCaseYear"].value;
			document.all["H_LastVerNo"].value = document.all["txVerNo"].value;
		}

	}
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060207  Justin [1050087] 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
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
				/*
				var arKeyName = new Array(3);
				arKeyName[0] = "CASE_YEAR";
				arKeyName[1] = "CLS_NO";
				arKeyName[2] = "CASE_NO";
				var arKeyValue = new Array(3);
				arKeyValue[0] = document.all["txCaseYear"].value;
				arKeyValue[1] = document.all["txClsNo"].value;
				arKeyValue[2] = document.all["txCaseNo"].value;
				if (CheckDup(arKeyName,arKeyValue,"CASE_MAIN"))
				{
					if (window.confirm(jf_GetErrMsg(KeyExist)))
						bRtnbool = true;
					else
						bRtnbool = false;
				}
				else
					bRtnbool = true;
				*/
				//多增加版本別條件判斷是否已存在於資料庫 #2006.03.05 Andy
				//1061123	Kevin_C	1061115	因弱掃對Table名稱進行檢核不能有等號，故改用AJAX進行檢核 -S
				// var arKeyName = new Array(5);
				// arKeyName[0] = "A.SOURCE_ORGNO";
				// arKeyName[1] = "A.CASE_YEAR";
				// arKeyName[2] = "A.CLS_NO";
				// arKeyName[3] = "A.CASE_NO";
				// arKeyName[4] = "B.VER_NO";
				// var arKeyValue = new Array(5);
				// arKeyValue[0] = document.all["tbOrgNo"].value;
				// arKeyValue[1] = document.all["txCaseYear"].value;
				// arKeyValue[2] = document.all["txClsNo"].value;
				// arKeyValue[3] = document.all["txCaseNo"].value;
				// arKeyValue[4] = document.all["txVerNo"].value;
				// var strTableNamePlusJoin = " CASE_MAIN A JOIN CLASS_MAIN B ON A.SOURCE_ORGNO = B.SOURCE_ORGNO AND A.CLS_KEY = B.PRIMARY_KEY ";
				// if (CheckDup(arKeyName,arKeyValue,strTableNamePlusJoin))
                //1070830 Zen 1070678 弱掃Ajax修正
                //var rtnObj = AKM320.CheckDup(document.all["tbOrgNo"].value, document.all["txCaseYear"].value, document.all["txClsNo"].value, document.all["txCaseNo"].value, document.all["txVerNo"].value).value;
                var rtnObj = AK.AKM320.CheckDup(document.all["tbOrgNo"].value, document.all["txCaseYear"].value, document.all["txClsNo"].value, document.all["txCaseNo"].value, document.all["txVerNo"].value).value;
				if(rtnObj.bSuccess!=true)
				{
					alert(rtnObj.ErrMsg);
					return false;
				}
				if(rtnObj.bExist == true)
				//1061123	Kevin_C	1061115	因弱掃檢核Table名稱不能有等號，故改用AJAX進行檢核 -E
				{
					if (window.confirm(jf_GetErrMsg(KeyExist)))
						bRtnbool = true;
					else
						bRtnbool = false;
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
	bRtnbool = CheckEmpty();
	
	//1101122	Joe		1101248	修正案名不可輸入Json格式跳脫字元--S
	if(bRtnbool && document.all["txCaseName"].value.indexOf('\\') != -1)
	{
		alert('儲存檢核未通過：案名含有特殊符號\\');
		bRtnbool = false;
	}
	//1101122	Joe		1101248	修正案名不可輸入Json格式跳脫字元--E
	return bRtnbool;
}

//不可空白欄位檢查
function CheckEmpty()
{
	if (document.all["ck1"].checked == false && document.all["txCaseNo"].value == "")
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["案次號"])),"");
		return false;
	}
	if (document.all["txCaseName"].value == "")
	{
		//document.all["txCaseNo"].focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["案名"])),"");
		document.all["txCaseName"].focus();
		return false;
	}
	if((document.all["txCaseNo"].value != "" && document.all["txCaseName"].value != "") || (document.all["ck1"].checked == true && document.all["txCaseName"].value != ""))
		return true;
}

var CurrentObjId;
var IsCls  = true;
var IsYear = true;
var IsVer  = true;
function TbOnBlur(argTb)
{


	CurrentObjId = argTb;
	//分類代碼
	if (argTb=="txClsNo")
	{
		ResetTag();
		if (IsCls)
		{
			GetClsName();
			IsVer = false;
			IsYear = false;
		}
		else
			IsCls = true;
	}
	else if (argTb=="txCaseYear")//年度
	{
		jf_txCaseYear_Onblur();

		ResetTag();
		//* 2020.03.04	Cloud	1081109	修改年度/版本onblur時進行互轉
		jf_GetClassVer("Year");
		if (IsYear)
		{
			GetClsName();
			IsCls = false;
			IsVer = false;
		}
		else
			IsYear = true;
	}
	else if (argTb == "txVerNo")//版本
	{
		ResetTag();
		//* 2020.03.04	Cloud	1081109	修改年度/版本onblur時進行互轉
		jf_GetClassVer("VerNo");
		if (IsVer)
		{
			GetClsName();
			IsCls = false;
			IsYear = false;
		}
		else
			IsVer = true;
	}
}

function GetClsName()
{
	var strYear  = document.all["txCaseYear"].value;
	var strVerNo = document.all["txVerNo"].value;
	var strClsNo = document.all["txClsNo"].value;
	if (strClsNo=="")
	{
	    //1060207  Justin [1050087] 二代公文修改
	    //document.all["lbClsName"].innerText = "";
	    document.all["lbClsName"].textContent = "";
		//1050616	Kenny	[1050463]	增加設定分類名隱藏欄位
		document.all.txClsName.value ="";
		document.all["H_LastYear"].value   = strYear;
		document.all["H_LastVerNo"].value  = strVerNo;
		document.all["H_LastClsNo"].value  = strClsNo;
		return;
	}
	//是否觸發ws
	if (!IsFireOnblur(strYear, strVerNo, strClsNo))
		return;

	var param1 = new Array(3);
	param1[0] = strVerNo;
	param1[1] = strClsNo;
	param1[2] = strYear;
	RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCLS",false,param1);
	//alert(RtnObj.ClsName)
	iCallID_Cls = RtnObj.id;
	OnWSResult(RtnObj);
}

//若點到其他欄位就reset
function ResetTag()
{
	if (document.activeElement.id == "txClsNo")
		return false;
	if (document.activeElement.id == "txCaseYear")
		return false;
	if (document.activeElement.id == "txVerNo")
		return false;
	IsVer = true;
	IsCls = true;
	IsYear= true;
	return true;
}
//1061123	Kevin_C	1061115	因弱掃對Table名稱進行檢核不能有等號，故改用AJAX進行檢核
//var iCallID_CheckDup;
//function CheckDup(argKeyName,argKeyValue,argKeyTable)
//{
//	var arWSParam = new Array(3);
//	arWSParam[0] = argKeyTable;
//	arWSParam[1] = argKeyName;
//	arWSParam[2] = argKeyValue;
	
//	RtnObj = jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
//	iCallID_CheckDup = RtnObj.id;
//	return OnWSResult(RtnObj);
//}

//判斷是否觸發onblur
function IsFireOnblur(argYear, argVerNo, argClsNo)
{
	//若有一個不同則觸發
	if (argYear != document.all["H_LastYear"].value)
		return true;
	if (argVerNo != document.all["H_LastVerNo"].value)
		return true;
	if (argClsNo != document.all["H_LastClsNo"].value)
		return true;
	return false;
}

function jf_txCaseYear_Onblur()
{	
	var txObj = jf_Trim(document.all["txCaseYear"].value) ;
	if ( txObj.length > 0 && txObj.length < 3 )
	{
		document.all["txCaseYear"].value = jf_PADL(txObj, 3, "0");
	}
}
//[0970679]Add by Cola 為了取得SamLart
//與網址參數的處理有關函式*************start
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
//與網址參數的處理有關函式************* end
//Cola -- end --
//* 2020.03.04	Cloud	1081109	修改，分類號空白時，年度/版本onblur時進行互轉
function jf_GetClassVer(argCallFrom)
{
	var strYear = document.all["txCaseYear"].value;
	var strVerNo = document.all["txVerNo"].value;
	//是否觸發ws
	if (!IsFireOnblur(strYear, strVerNo))
		return;
	if ((strYear == "" && argCallFrom == "Year") || (strVerNo == "" && argCallFrom == "VerNo"))
		return;
	var param1 = new Array(3);
	param1[0] = strYear;
	param1[1] = strVerNo;
	param1[2] = argCallFrom;
	RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetVerYear", false, param1);
	iCallID_YearVerNo = RtnObj.id;
	OnWSResult(RtnObj);
}
