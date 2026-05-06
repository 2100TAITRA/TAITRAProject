/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 96.06.28		MATTE	001102	新增點選確定後會檢查箱號欄位及各欄位資料
 * 97.08.26		Cola	0970672	修正部份邏輯
 * 1060613      Justin  1050087 二代公文修改
 * 1081219		Kevin_C	1081092	修正密等選全部時，設定箱號無效的問題
 * 1110103		Zen     1101292	修正多次點擊重複PostBack之問題
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");
//1060613 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060613 Justin [1050087] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060613 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	/*var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}*/

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{		
		case "btHelp":
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "../EA60/EAT602C1.aspx";
			jf_OpenChildWin(pUrl, "EAT602C1", 750, 500);
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060613 Justin [1050087] 二代公文修改 
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
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1060613 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen": //開啟
			Page_BlockSubmit = !jf_CheckBeforSave();
		    //1060613 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave": //確認
			//if(jf_CheckBeforSave()) //是否通過儲存前必要檢查
			if(CheckBeforeConfirm()&&CheckBeforeBox())//MATTE 0960628 001102 
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			    //1060613 Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
			
			break;
		case "btBox": //編箱 顯示datagrid
			if(CheckBeforeBox())
			{
				Page_BlockSubmit = false;//!jf_ConfirmDelete();
				//jf_ToolBarSubmit();
				BoxProcess();
			}
			else
				Page_BlockSubmit = true;//!jf_ConfirmDelete();
			break;
		case "btAbandon": //放棄
			//Page_BlockSubmit = !jf_ConfirmCancel();
			if(CheckBeforeCancel())
			{
				ReloadDgData();
			}			
			//jf_ToolBarSubmit();
			break;
		case "btCancel": //放棄
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1060613 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;

	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
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

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txTPlan"].value == "")
	{
	    strErrMsg += "移轉(交)計畫編號不可空白\n";
	    //1060613 Justin [1050087] 二代公文修改
	    //document.all["txTPlan"].focus();
	    $('#txTPlan').focus();
	}
	
	/*if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
	}

	*/

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			//txInput2不可空白
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
			    InValidName = InValidName.substr(1, InValidName.length);
			    //1060613 Justin [1050087] 二代公文修改
			    //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
			    //document.all[InValidControlName].focus();
			    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
			    $('#' + InValidControlName).focus();
				return false;
			}
		}
	}
	return true;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
    }
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
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	if (argCallerId == "EAT602C1")
	{
	    document.all["txTPlan"].value = document.all["lbReturnValue"].options[0].value;
	    //1060613 Justin [1050087] 二代公文修改
	    //document.all["txTPlan"].focus();
	    $('#txTPlan').focus();
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//檢核該清理批號是否存在
function CheckPlanNo()
{
	if(!jf_CheckDataExist("") && document.all["txTPlan"].value != "")
	{		
		Page_BlockSubmit = false;
		alert("此移轉(交)計畫編號不存在");
	    //1060613 Justin [1050087] 二代公文修改
		//document.all["txTPlan"].focus();
		$('#txTPlan').focus();
	}	
}

function CheckBeforeBox()
{
	var ErrMsg = "";
	if(document.all["txVol"].value == "")
		ErrMsg = "每箱卷數不可為空白\n";
	if(document.all["rb1"].checked)
	{
		var dgMaxBoxValue = document.all["dg1__ctl2_lbMaxBoxSeq"].innerHTML;
		if(document.all["txBoxNum"].value == "")
			ErrMsg += "箱號有誤\n";
			
		//[0970672]Modify by Cola 修正錯誤訊息方便使用者了解			
		if(parseInt(document.all["txBoxNum"].value) < parseInt(dgMaxBoxValue))
		{
			ErrMsg += "箱號範圍有誤，目前系統最大箱號為"+parseInt(dgMaxBoxValue)+"，請輸入至少大於該箱號之數值。\n";		
		}
			//ErrMsg += "箱號範圍有誤\n";		
	}

	var dgCount = document.all["dg1"].rows.length;//MATTE 0960628 001102 
	for(var i = 2;i<dgCount+1;i++)//MATTE 0960628 001102 
	{
		if(document.all["dg1__ctl"+i+"_txInput1"].value == "0")
		{
			ErrMsg += "箱號不可為0 \n";
		}
	}
	

	//[0970672]Marked by Cola 不應強制鎖死，且目前程式不會編入已使用箱號
	/*if(document.all["rbRange_2"].checked)
		ErrMsg += "可能造成自動編箱時編入已使用箱號，導致同一箱號內有過多卷數\n";*/
		
	if(ErrMsg != "")
	{
		alert(ErrMsg);
		return false;
	}
	else
		return true;
}

function BoxProcess()
{
	var MaxBoxValue = document.all["dg1__ctl2_lbMaxBoxSeq"].innerHTML;
	var StartBoxNum = document.all["txBoxNum"].value;	//最大編箱起始箱號
	var dgCount = document.all["dg1"].rows.length;		//Dg1含rows	
	var VolPerBox = document.all["txVol"].value;	//每箱卷數
	
	if(VolPerBox == "0")
	{
		alert("卷數設定有誤");
		return false;
	}

	if(StartBoxNum == "0")
	{
		alert("箱號不可為0");
		return false;
	}
		
	var iEnd = parseInt(dgCount / VolPerBox);
	var jEnd = (dgCount-1) - iEnd*VolPerBox;
	
	//alert(iEnd+","+jEnd);
	
	var rule1 = "";	//編箱範圍
	var rule2 = "";	//機密等級
	var rule3 = "";	//判斷範圍
	//編箱範圍
	if(document.all["rbRange_0"].checked)
		rule1 = "紙質";
	else if(document.all["rbRange_1"].checked)
		rule1 = "電子";
	else
		rule1 = "全部";
	//機密等級
	if(document.all["rbSec_0"].checked)
		rule2 = "普通";
	else if(document.all["rbSec_1"].checked)
		rule2 = "機密";
	else
		rule2 = "全部";
	//判斷範圍
	if(document.all["rbType_0"].checked)
		rule3 = "0";	//依案件
	else
		rule3 = "1";	//依案卷
			
	//[0970672]Modify by Cola 修正邏輯			
	if(document.all["rb1"].checked)	//最大箱號編箱
		StartBoxNum = document.all["txBoxNum"].value;
	else if (document.all["rb2"].checked) //重編
		StartBoxNum = 1;
		
	var iStart = 0;
	for(var i = 2;i<dgCount+1;i++)
	{				
		if (rule1 == "全部")
		{
			iStart++;
			
			if(rule3 == "0")
			{
				//依案件
				//1081219		Kevin_C	1081092	修正密等選全部時，設定箱號無效的問題
				//if(document.all["dg1__ctl"+i+"_lbSecCase"].innerHTML == rule2)
				if (document.all["dg1__ctl" + i + "_lbSecCase"].textContent == rule2 || rule2 == "全部")
				{
					//1081219		Kevin_C	1081092	修正密等選全部時，設定箱號無效的問題
					//if(rule2 == "機密")
					//	StartBoxNum++;																					
					document.all["dg1__ctl"+i+"_txInput1"].value = StartBoxNum;												
				}
			}
			if(rule3 == "1")
			{
				//依案卷
				//1081219		Kevin_C	1081092	修正密等選全部時，設定箱號無效的問題
				//if(document.all["dg1__ctl"+i+"_lbSecVol"].innerHTML == rule2)
				if (document.all["dg1__ctl" + i + "_lbSecVol"].textContent == rule2 || rule2 == "全部")
				{
					//1081219		Kevin_C	1081092	修正密等選全部時，設定箱號無效的問題
					//if(rule2 == "機密")
					//	StartBoxNum++;
					document.all["dg1__ctl"+i+"_txInput1"].value = StartBoxNum;							
				}					
			}				

			if(iStart == parseInt(VolPerBox))
			{
				StartBoxNum++;							
				iStart = 0;
			}	
		}
		else
		{
			//iStart++;//[0970672]Moved by Cola 應放在下面才合理
			//1081219		Kevin_C	1081092	修正密等選全部時，設定箱號無效的問題
			//if(document.all["dg1__ctl"+i+"_lbFileType"].innerHTML == rule1)
			if (document.all["dg1__ctl" + i + "_lbFileType"].textContent == rule1)
			{
				iStart++;
				
				if(rule3 == "0")
				{
					//依案件
					//1081219		Kevin_C	1081092	修正密等選全部時，設定箱號無效的問題
					//if(document.all["dg1__ctl"+i+"_lbSecCase"].innerHTML == rule2)
					if (document.all["dg1__ctl" + i + "_lbSecCase"].textContent == rule2 || rule2 == "全部")
					{
						//1081219		Kevin_C	1081092	修正密等選全部時，設定箱號無效的問題
						//if(rule2 == "機密")
						//	StartBoxNum++;																					
						document.all["dg1__ctl"+i+"_txInput1"].value = StartBoxNum;												
					}
				}
				if(rule3 == "1")
				{
					//依案卷
					//1081219		Kevin_C	1081092	修正密等選全部時，設定箱號無效的問題
					//if(document.all["dg1__ctl"+i+"_lbSecVol"].innerHTML == rule2)
					if (document.all["dg1__ctl" + i + "_lbSecVol"].textContent == rule2 || rule2 == "全部")
					{
						//1081219		Kevin_C	1081092	修正密等選全部時，設定箱號無效的問題
						//if(rule2 == "機密")
						//	StartBoxNum++;
						document.all["dg1__ctl"+i+"_txInput1"].value = StartBoxNum;							
					}					
				}				
			}
			if(iStart == parseInt(VolPerBox))
			{
				StartBoxNum++;							
				iStart = 0;
			}
		}
	//Cola -- end --
		
	}
	/*else	//重編
	{
		StartBoxNum = 1;
		var iStart = 0;
		for(var i = 2;i<dgCount+1;i++)
		{	
			iStart++;
			if(document.all["dg1__ctl"+i+"_lbFileType"].innerHTML == rule1)
			{
				if(rule3 == "0")
				{
					//依案件
					if(document.all["dg1__ctl"+i+"_lbSecCase"].innerHTML == rule2)
					{
						if(rule2 == "機密")
							StartBoxNum++;																					
						document.all["dg1__ctl"+i+"_txInput1"].value = StartBoxNum;												
					}
				}
				if(rule3 == "1")
				{
					//依案卷
					if(document.all["dg1__ctl"+i+"_lbSecVol"].innerHTML == rule2)
					{
						if(rule2 == "機密")
							StartBoxNum++;
						document.all["dg1__ctl"+i+"_txInput1"].value = StartBoxNum;							
					}					
				}				
			}
			if(iStart == parseInt(VolPerBox))
			{
				StartBoxNum++;							
				iStart = 0;
			}						
		}				
	}*/
	document.all["txBoxNum"].value = StartBoxNum;
}

function CheckBeforeConfirm()
{
	var dgCount = document.all["dg1"].rows.length;		//Dg1含rows	
	var ErrMsg = "";
	var Judgue = true;
	if(document.all["txVol"].value == "")
		ErrMsg += "卷數不可空白\n";
	for(var i=2;i<dgCount+1;i++)
	{
		if(document.all["dg1__ctl"+i+"_txInput1"].value == "")
			Judgue = false;
	}
	if(!CheckBoxNumLeagal())
		ErrMsg += "同一箱號卷數總和大於每箱最大編卷數\n";
	
	if(!CheckBeforeBox())//MATTE 0960628 001102
	{
		return false;
	}
	else
		return true;
		
	if(ErrMsg != "")
	{
		alert(ErrMsg);
		return false;
	}
	else
		return true;
}

function CheckBoxNumLeagal()
{
	var dgCount = document.all["dg1"].rows.length;		//Dg1含rows	
	var VolPerBox = document.all["txVol"].value;		//每箱卷數
	var Judgue = true;
	var Num_New = "";
	var Num_Old = "";
	var Count = 1;
	
	Num_Old = document.all["dg1__ctl2_txInput1"].value;
	
	for(var i=3;i<dgCount;i++)
	{
		Num_New = document.all["dg1__ctl"+i+"_txInput1"].value;
		if(Num_New == Num_Old)
			Count++;
		if(parseInt(VolPerBox) < Count)
			Judgue = false;			
	}
	
	return Judgue;	
}

function CheckBeforeCancel()
{
	Rtnbool = window.confirm("您已修改過內容,確定要取消嗎?");
	if (Rtnbool)		
	{
		jf_ReloadValue();
	}
	return Rtnbool;	
}

function ReloadDgData()
{
	var dgCount = document.all["dg1"].rows.length;		//Dg1含rows	
	
	for(var i=2;i<dgCount+1;i++)
	{
		document.all["dg1__ctl"+i+"_txInput1"].value = document.all["dg1__ctl"+i+"_lbBkBoxSeq"].innerHTML;		
	}
}