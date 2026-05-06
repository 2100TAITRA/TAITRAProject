/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 95.11.13		David	950755	呼叫WS帶出使用者輸入分類號版本別
 * 99.08.09		Leslie	0990499	異動前增加檢核公文狀態是否不為"已銷毀"或"已移轉(交)"(DOC_STATE < 30)
 * 101.07.31	Jagle	1010729	桃園機場增加預立新卷功能
 * 1040917		Kenny	1040704	修改卷次號處理，避免因卷次號含非數字分併卷時出現錯誤
 * 1051004      Kenny   1050313 調整叫用CheckCaseMain檢核案次號時增加傳入版本別參數
 * 1060315      Zen     1050087 二代公文修改
 * 1070830      Zen     1070678 弱掃Ajax修正
 * 1090313		Cloud	1081109 修改支援版本/年度互轉
 * 1091231      Zen     1090571 修正專案、列管卷查詢時仍檢核年度號不為空之問題
 * 1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況
 * 1110216      Cloud   1101503 補強勾選一筆之後disabled其他勾選框，避免使用者以為可跳號勾選，勾選重排序號則清除勾選，增加目次號重排功能
 * 1140417      Cloud   1140511 執行前檢查，如果為分一部分至下一卷，檢查欲分出數量+下卷已有數量是否超過上限(999)
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060315 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*dd
if (document.all["ValidationSummary1"].innerText != "")
	alert(document.all["ValidationSummary1"].innerText);
*/

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

function ShowMsg()
{
    //1060315 Zen 1050087 二代公文修改
    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}


//1060315 Zen   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060315 Zen 1050087 二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
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

//1060315 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1060315 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !FormValidforOpen();
            //1060315 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //101.07.31		Jagle	1010729		判斷是否為預立新卷
            if (document.all["H_NEWVOL"].value == "1")
            {
                if (document.all["txVol"].value == "")
                {
                    alert("卷次號不可為空。");
                    //1060315 Zen 1050087 二代公文修改
                    //document.all["txVol"].focus();
                    $('#txVol').focus();
                    Page_BlockSubmit = true;
                }
                else
                    Page_BlockSubmit = false;
            }
            else
            {
                if (ConfirmSave())//是否通過儲存前必要檢查
                {
                    IsServerHandling = true;
                    jf_ShowWaitState();
                    Page_BlockSubmit = false;
                }
                else
                    Page_BlockSubmit = true;
            }
            //1060315 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060315 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            //1060315 Zen 1050087 二代公文修改
            //document.all["txYear"].focus();
            $('#txYear').focus();
            document.all["rbSplit"].checked = true;
            document.all["rbReset"].checked = true;
            break;
            //101.07.31		Jagle	1010729	桃園機場增加預立新卷功能
        case "btNewVol":
            document.all["txVol"].value = "";
            if (FormValidforNewVol())
            {
                GetNewVol();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060315 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{ }

function ClientOnLoad()
{
    //1051004   Kenny   [1050313]   一併移除無用CODE 
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
    //jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,null);
    //jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
    //1060315 Zen 1050087 二代公文修改
    //if (jf_GetActionMode() == LayoutModeNew)
    //    document.all['dtHead'].style.visibility = 'hidden';
    //else
    //    document.all['dtHead'].style.visibility = 'visible';
    ShowMsg();

    //101.07.31		Jagle	1010729		預立新卷成功跳出提示訊息
    if (document.all['H_NEWVOL'].value == "true")
    {
        alert("預立案卷成功。");
        document.all['H_NEWVOL'].value = "";
    }
}

function OnWSResult(argResult)
{
    if (argResult.id == iCallID_CLS)
    {
        if (!jf_IsWebServiceSuccess(argResult))
        {
            //950755 95.10.18 David 修改找不到符合資料時，清空該欄位
            document.all["txCls"].value = "";
            //1060315 Zen 1050087 二代公文修改
            //document.all["txCls"].focus();
            $('#txCls').focus();
        }
        else
        {
            //950755 95.10.19 David 若搜尋成功則帶出版本別於畫面上
            document.all["txVerNo"].value = argResult.value.VerNo;
        }
    }
    if (argResult.id == iCallID_CLS_VER)
    {
        if (!jf_IsWebServiceSuccess(argResult))
        {
            //950755 95.10.18 David 修改找不到符合資料時，清空該欄位
            document.all["txCls"].value = "";
            //1060315 Zen 1050087 二代公文修改
            //document.all["txCls"].focus();
            $('#txCls').focus();
        }
    }
    else if (argResult.id == iCallID_CASE)
    {
        if (!jf_IsWebServiceSuccess(argResult))
            //1060315 Zen 1050087 二代公文修改
            //document.all["txCase"].focus();
            $('#txCase').focus();
    }
    else if (argResult.id == wsDuplicateID)
    {
        if (!argResult.value.RtnBool)
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您輸入的檔號為該案的第一卷，無上一案卷可併入。"])), "");
    }

    //101.07.31		Jagle	1010729	增加取得CLS_KEY    
    if (argResult.id == iCallID_CLSKEY)
    {
        if (!jf_IsWebServiceSuccess(argResult))
        {
            document.all["txCls"].value = "";
            //1060315 Zen 1050087 二代公文修改
            //document.all["txCls"].focus();
            $('#txCls').focus();
        }
        else
        {
            var WSResult;
            WSResult = argResult.value;
            document.all["H_CLSKEY"].value = WSResult.CLS_KEY;
        	//1090313 Cloud 1081109  整合叫用getcls 一併設定版號
            document.all["txVerNo"].value = WSResult.VerNo;
        }
    }
    //101.07.31		Jagle	1010729	取得最大卷次號+1帶回 
    if (argResult.id == iCallID_Vol)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            var WSResult;
            WSResult = argResult.value;
            var strVol = parseInt(WSResult.VolNo, 10) + 1;
            document.all["txVol"].value = jf_PADL(strVol.toString(), 4, "0");
        }
    }
	//* 1090313		Cloud	1081109	修改支援年度onblur取得版本-S
    if (argResult.id == iCallID_YearVerNo)//
    {
    	WSResult = argResult.value;
    	if (WSResult.ErrorClass.IsErr)
    	{
    		//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息
			//alert(WSResult.ErrorClass.ErrMessage[0]);
			var bAlert = true;
    		if (WSResult.ErrorClass.ErrMessage[0].indexOf("輸入區間含有多個版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
    		{
				//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-s
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
					document.all["txVerNo"].value = "";
					document.all["txVerNo"].focus();
					alert(WSResult.ErrorClass.ErrMessage[0]);
				}
				//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-e
    		}
    		else
    		{
    			document.all[CurrentObjId].value = "";
				alert(WSResult.ErrorClass.ErrMessage[0]);
    		}
    	}
    	else
    	{
    		if (CurrentObjId == "txYear")//年度號ONLBUR-帶回版本別一律設定
    		{
    			document.all["txVerNo"].value = WSResult.strVerNo;
    		}
    		else//版本別onblur
    		{
    			var dt = new Date();
    			var strSysYear = dt.getFullYear() - 1911;
    			if (WSResult.strEdate == "" || WSResult.strEdate >= strSysYear)//啟用中-無停用日或是停用日大於等於系統日
    			{
    				if (document.all["txYear"].value == "" || document.all["txYear"].value < WSResult.strSdate)//年度為空或是輸入年度小於起日則跳出訊息後直接帶入
    				{
    					if (document.all["txYear"].value != "")//不為空再跳提醒
    						alert("該版本啟用中，系統將預設帶入系統年。");
    					document.all["txYear"].value = strSysYear;
    				}
    			}
    			else//停用版本
    			{
    				//年度為空白或是輸入年度不合理(小於起日或是大於停止日)則跳出訊息預設代最大
    				if (document.all["txYear"].value == "" || document.all["txYear"].value < WSResult.strSdate || document.all["txYear"].value > WSResult.strEdate)
    				{
    					if (document.all["txYear"].value != "")//不為空再跳提醒
    					{
    						if (WSResult.strSdate != WSResult.strEdate)
    							alert("該版本使用於：" + WSResult.strSdate + "~" + WSResult.strEdate + "年，系統將預設帶入最大年度。");
    						else
    							alert("該版本使用於：" + WSResult.strSdate + "年，系統將預設帶入。");
    					}
    					document.all["txYear"].value = WSResult.strEdate;
    				}
    			}
    		}
    	}
    }
	//* 1090313		Cloud	1081109	修改支援年度onblur取得版本-E
}

//1060315 Zen 1050087 二代公文修改
//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
//{
//    var index = document.all[argDDLId].selectedIndex;
//    var obj = document.all[argDDLId].options[index];

//    document.all[argTextBoxId].value = obj.text;
//    document.all[argLabelId].innerText = obj.value;
//}

//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
        bRtnbool = CheckBeforSave();
    return bRtnbool;
}

//儲存前key值外之欄位檢查
//檢查成功回值true
var wsDuplicateID;
function CheckBeforSave()
{
    var bRtnbool = true;
    //1040917	Kenny	[1040704]	修改卷次號處理--Start--
    //var strOldVol = Number(document.all["txVol"].value)-1
    //strOldVol = jf_PADL(String(strOldVol), 4, '0');
    var strOldVol = "";
    var nVolNum = "";
    var strEFileVolNo = document.all["H_strEFileVolNo"].value;
    var nEFileVolNoLength = strEFileVolNo.length;
    if (document.all["txVol"].value.substr(0, nEFileVolNoLength) != strEFileVolNo)
    {
        strOldVol = Number(document.all["txVol"].value) - 1;
        strOldVol = jf_PADL(String(strOldVol), 4, '0');
    }
    else
    {
        nVolNum = Number(document.all["txVol"].value.substr(strEFileVolNo.length, (4 - nEFileVolNoLength))) - 1;
        strOldVol = strEFileVolNo + jf_PADL(String(nVolNum), (4 - nEFileVolNoLength), '0');
    }
    //1040917	Kenny	[1040704]	修改卷次號處理--End--

    if (document.all["rbMerge"].checked)
    {
        var argKeyName = new Array(4);
        var argKeyValue = new Array(4);

        argKeyName[0] = "FILE_YEAR";
        argKeyName[1] = "FILE_CLS";
        argKeyName[2] = "FILE_CASE";
        argKeyName[3] = "FILE_VOL";
        argKeyValue[0] = document.all["txYear"].value;
        argKeyValue[1] = document.all["txCls"].value;
        argKeyValue[2] = document.all["txCase"].value;
        argKeyValue[3] = strOldVol;

        var arWSParam = new Array(3);
        arWSParam[0] = "DOC_MAIN";
        arWSParam[1] = argKeyName;
        arWSParam[2] = argKeyValue;
        callObj = jf_CallWS("Template/lib/SYS.asmx", "CheckDataKeyDuplicate", false, arWSParam);
        wsDuplicateID = callObj.id;
        OnWSResult(callObj);
        bRtnbool = callObj.value.RtnBool;
    }

    //0990809	Leslie[0990499]	分併卷之檢核	--START--
    if (bRtnbool)	//前面的檢核通過，才做這裡的檢核
    {
        var strType = "";
        //* 1140417      Cloud   1140511 執行前檢查，如果為分一部分至下一卷，檢查欲分出數量 + 下卷已有數量是否超過上限(999)
        var iFirstSeq = 0;
        var iLastSeq = 0;
        var iAllCount = 0;
        if (document.all["rbMerge"].checked)			//併入前一卷的末端(僅影响本卷檔號)
        //* 1140417      Cloud   1140511 執行前檢查，如果為分一部分至上一卷，檢查欲分出數量 + 上卷已有數量是否超過上限(999)
        {
            for (var i = 2; i <= document.all["dg1"].rows.length; i++) {
                if (document.all["dg1__ctl" + i + "_cbChangeVol"].checked) {
                    iLastSeq = document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent;
                    break;
                }
            }
            iFirstSeq = document.all["dg1__ctl2_lbSEQ_NO"].textContent;
            iAllCount = (iLastSeq - iFirstSeq) + 1;//-避免只勾選一筆所以+1
            var rtn = AK.AKT330.CheckVolCount(document.all["h_SourceOrgno"].value, document.all["txYear"].value, document.all.H_CLSKEY.value, document.all.H_CASEKEY.value, document.all.txVol.value, iAllCount.toString(), "rbMerge").value;
            if (rtn != "") {
                alert(rtn);
                return false;
            }
            strType = "0";
        }
        else if (document.all["rbInsert"].checked)	//分為獨立一卷(影响本卷含以後所有卷)
            strType = "3";
        else
        {
			//* 1140417      Cloud   1140511 執行前檢查，如果為分一部分至下一卷，檢查欲分出數量 + 下卷已有數量是否超過上限(999)
			//取得要加入的筆數
            for (var i = 2; i <= document.all["dg1"].rows.length; i++) {
				if (document.all["dg1__ctl" + i + "_cbChangeVol"].checked) {
                    iFirstSeq = document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent;
					break;
				}
			}
            iLastSeq = document.all["dg1__ctl" + (document.all["dg1"].rows.length) + "_lbSEQ_NO"].textContent;
            iAllCount = (iLastSeq - iFirstSeq) + 1;//-避免只勾選一筆所以+1
            var rtn = AK.AKT330.CheckVolCount(document.all["h_SourceOrgno"].value, document.all["txYear"].value, document.all.H_CLSKEY.value, document.all.H_CASEKEY.value, document.all.txVol.value, iAllCount.toString(),"rbSplit").value;
			if (rtn != "") {
				alert(rtn);
				return false;
			}
            if (document.all["rbMax"].checked)		//併入後一卷的末端(僅影响本卷檔號)
                strType = "1";
            else {
                //併入後一卷的前端(影响本卷檔號及下一卷)
                strType = "2";
            }
        }

        var strFileNo = "";
        //* 1110216      Cloud   1101503 增加目次號重排功能
        if (!document.all["rbReSortSeq"].checked) {

            for (var i = 2; i <= document.all["dg1"].rows.length + 1; i++) {
                if (document.all["dg1__ctl" + i + "_cbChangeVol"].checked) {
                    //1060315 Zen 1050087 二代公文修改
                    //strFileNo = document.all["dg1__ctl" + i + "_lbYear"].innerText;
                    strFileNo = document.all["dg1__ctl" + i + "_lbYear"].textContent;
                    break;
                }
            }
            //1070830 Zen 1070678 弱掃Ajax修正
            //var value = AKT330.CheckVolStatus(document.all["h_SourceOrgno"].value, strFileNo, strType).value;
            var value = AK.AKT330.CheckVolStatus(document.all["h_SourceOrgno"].value, strFileNo, strType).value;
            if (value != "") {
                alert(value);
                bRtnbool = false;
            }
        }
        else
            bRtnbool = true;
    }
    return bRtnbool;
}
//1090313 CLOUD 1081109 以下根本沒人呼叫-MARK
//預覽/列印前欄位檢查
/*function CheckBeforPrint()
{
    var bRtnbool = false;
    return bRtnbool;
}*/

// 分類號欄位檢查 分類/案
function txClsOnBlur()
{
    CheckClsNo();
}
//案次號欄位檢查 案
function txCaseOnBlur()
{
    CheckCaseNo("txCase");
}

//檢查分類號正確性
var iCallID_CLS = null;

//101.07.31		Jagle	1010729	增加取得CLS_KEY
var iCallID_CLSKEY = null;
//101.07.31		Jagle	1010729	取得目前最大卷次號
var iCallID_Vol = null;

//95.10.17 950755 David 增加版本別判斷
var iCallID_CLS_VER = null;

function CheckClsNo()
{
    var strCLS = document.all["txCls"].value;
    //95.10.17 950755 David 增加版本別判斷
    var strVER = document.all["txVerNo"].value;
    /*
	if(strCLS != "")
	{
		var param = new Array(1);
		param[0] = strCLS;
	
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,param);
		iCallID_CLS = RtnObj.id;
		OnWSResult(RtnObj);
	}
	*/
    //95.10.17 950755 David 增加版本別判斷
    if (strCLS != "")
    {
    	//1090313 CLOUD	整合叫用GetCLS
    	/*
        if (jf_Trim(strVER) != "")
        {
            var param1 = new Array(2);
            param1[0] = strCLS;
            param1[1] = strVER;

            RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA_V", false, param1);
            iCallID_CLS_VER = RtnObj.id;
            OnWSResult(RtnObj);

            //101.07.31		Jagle	1010729	增加取得CLS_KEY
            if (document.all["txCls"].value != "")
            {
                var param1 = new Array(3);
                param1[0] = document.all["txVerNo"].value;
                param1[1] = document.all["txCls"].value;
                param1[2] = document.all["txYear"].value;
                RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCLS", false, param1);

                iCallID_CLSKEY = RtnObj.id;
                OnWSResult(RtnObj);
            }
        }
        else
        {
            var param2 = new Array(1);
            param2[0] = strCLS;

            RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA", false, param2);
            iCallID_CLS = RtnObj.id;
            OnWSResult(RtnObj);
        }*/

    	var param1 = new Array(3);
    	param1[0] = document.all["txVerNo"].value;
    	param1[1] = document.all["txCls"].value;
    	param1[2] = document.all["txYear"].value;
    	RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCLS", false, param1);

    	iCallID_CLSKEY = RtnObj.id;
    	OnWSResult(RtnObj);
    }
}

//檢查案次號正確性
//var CaseCheck_activeElement = null;
var iCallID_CASE = null;
function CheckCaseNo(activeElementId)
{
    var strCLS = document.all["txCls"].value;
    var strCASE = document.all["txCase"].value;
    var strYEAR = document.all["txYear"].value;
    //1051004   Kenny   [1050313]   增加傳入版本別資訊
    var strVERNO = document.all["txVerNo"].value;

    if (strCLS != "" && strCASE != "")
    {
        CaseCheck_activeElement = activeElementId;
        //1051004   Kenny   [1050313]   增加傳入版本別資訊
        //var param = new Array(4);
        var param = new Array(5);
        param[0] = strYEAR;
        param[1] = strCLS;
        param[2] = strCASE;
        param[3] = "";
        //1051004   Kenny   [1050313]   增加傳入版本別資訊
        param[4] = strVERNO;

        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckCaseMain", false, param);
        //1051004   Kenny   [1050313]   增加紀錄檢核回傳值中的CASE_MAIN.PRIMARY_KEY於隱藏欄位
        document.all.H_CASEKEY.value = RtnObj.value.Key;
        iCallID_CASE = RtnObj.id;
        OnWSResult(RtnObj);
    }
}

//搜尋前檢查
function FormValidforOpen()
{
    var fr = document.AKT330;
    var pRtnValue = true;
    //1091231 Zen 1090571 修正專案、列管卷查詢時仍檢核年度號不為空之問題
    //if (fr.txYear.value == "" || fr.txCls.value == "" || fr.txCase.value == "" || fr.txVol.value == "")
    if ((!(fr.txCls.value == 'AA' || fr.txCls.value == 'BB') && fr.txYear.value == "") || fr.txCls.value == "" || fr.txCase.value == "" || fr.txVol.value == "")
    {
        pRtnValue = false;
        var ErrMsg = "";
        var focusAt = null;
        if (fr.txVol.value == "")
        {
            ErrMsg = "、卷次號";
            focusAt = fr.txVol;
        }
        if (fr.txCase.value == "")
        {
            ErrMsg = "、案次號" + ErrMsg;
            focusAt = fr.txCase;
        }
        if (fr.txCls.value == "")
        {
            ErrMsg = "、分類號" + ErrMsg;
            focusAt = fr.txCls;
        }
        //1091231 Zen 1090571 修正專案、列管卷查詢時仍檢核年度號不為空之問題
        //if (fr.txYear.value == "")
        if ( !(fr.txCls.value == 'AA' || fr.txCls.value == 'BB') && fr.txYear.value == "")
        {
            ErrMsg = "、年度" + ErrMsg;
            focusAt = fr.txYear;
        }
        ErrMsg = ErrMsg.substr(1, ErrMsg.length);

        var ErrName = new Array(1);
        ErrName[0] = ErrMsg;
        alert(FormatStr(jf_GetErrMsg(UnAllowEmpty), ErrName));
        //1060315 Zen 1050087 二代公文修改
        //focusAt.focus();
        $('#' + focusAt.id).focus();
    }
    return pRtnValue;
}

//101.07.31		Jagle	1010729	桃園機場增加預立新卷功能
//預立新卷前檢查
function FormValidforNewVol()
{
    var fr = document.AKT330;
    var pRtnValue = true;
    if (fr.txYear.value == "" || fr.txCls.value == "" || fr.txCase.value == "")
    {
        pRtnValue = false;
        var ErrMsg = "";
        var focusAt = null;
        if (fr.txCase.value == "")
        {
            ErrMsg = "、案次號" + ErrMsg;
            focusAt = fr.txCase;
        }
        if (fr.txCls.value == "")
        {
            ErrMsg = "、分類號" + ErrMsg;
            focusAt = fr.txCls;
        }
        if (fr.txYear.value == "")
        {
            ErrMsg = "、年度" + ErrMsg;
            focusAt = fr.txYear;
        }
        ErrMsg = ErrMsg.substr(1, ErrMsg.length);

        var ErrName = new Array(1);
        ErrName[0] = ErrMsg;
        alert(FormatStr(jf_GetErrMsg(UnAllowEmpty), ErrName));
        //1060315 Zen 1050087 二代公文修改
        //focusAt.focus();
        $('#' + focusAt.id).focus();
    }
    return pRtnValue;
}

//101.07.31		Jagle	1010729	桃園機場增加預立新卷功能
//帶出最大卷次號+1
function GetNewVol()
{
    //1060315 Zen 1050087 二代公文修改--begin
    //var KeyValue2 = new Array(1);
    //KeyValue2[0] = document.all["txYear"].value;

    //var KeyValue3 = new Array(1);
    //KeyValue3[0] = document.all["H_CLSKEY"].value;

    //var KeyValue4 = new Array(1);
    //KeyValue4[0] = document.all["txCase"].value;

    //var KeyValue5 = new Array(1);
    //KeyValue5[0] = document.all["txVol"].value;

    //var KeyValue6 = new Array(1);
    //KeyValue6[0] = "1";

    //var KeyValue7 = new Array(1);
    //KeyValue7[0] = "0";

    //var KeyValue8 = new Array(1);
    //KeyValue8[0] = "";
    var KeyValue2 = document.all["txYear"].value;

    var KeyValue3 = document.all["H_CLSKEY"].value;

    var KeyValue4 = document.all["txCase"].value;

    var KeyValue5 = document.all["txVol"].value;

    var KeyValue6 = "1";

    var KeyValue7 = "0";

    var KeyValue8 = "";
    //1060315 Zen 1050087 二代公文修改--end

    var param2 = new Array(7);
    param2[0] = KeyValue2;
    param2[1] = KeyValue3;
    param2[2] = KeyValue4;
    param2[3] = KeyValue5;
    param2[4] = KeyValue6;
    param2[5] = KeyValue7;
    param2[6] = KeyValue8;
    RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetMaxVolSeq", false, param2);
    iCallID_Vol = RtnObj.id;
    OnWSResult(RtnObj);
}
//* 2020.03.08	Cloud	1081109	修改，分類號空白時，年度/版本onblur時進行互轉
var iCallID_YearVerNo = null;
var CurrentObjId;
function txonblur(argTextBox)
{
	CurrentObjId = argTextBox;
	//年度號
	if (argTextBox == "txYear")
	{
		if (document.all["txYear"].value == "")
		{ return; }
		else
		{
			document.all["txYear"].value = jf_PADL(document.all["txYear"].value, 3, "0");
			jf_GetClassVer("Year");
		}
	}

	if (argTextBox == "txVerNo")
	{
		if (document.all["txVerNo"].value == "")
		{ return; }
		else
			jf_GetClassVer("VerNo");
		if (document.all["txVerNo"].value !== "")
		{
			CheckClsNo();
		}
	}
}
function jf_GetClassVer(argCallFrom)
{
	var strYear = document.all["txYear"].value;
	var strVerNo = document.all["txVerNo"].value;
	var param1 = new Array(3);
	if ((strYear == "" && argCallFrom == "Year") || (strVerNo == "" && argCallFrom == "VerNo"))
		return;
	param1[0] = strYear;
	param1[1] = strVerNo;
	param1[2] = argCallFrom;
	RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetVerYear", false, param1);
	iCallID_YearVerNo = RtnObj.id;
	OnWSResult(RtnObj);
}
// 1110216      Cloud   1101503 補強勾選一筆之後disabled其他勾選框，避免使用者以為可跳號勾選，勾選重排序號則清除勾選-s
function DisAbledCheckBox(e, argMode) {

    if (argMode == "RadioButtoWork") {
        if ($(e.target)[0].id == "rbReSortSeq") {
            $('input[name*=\"cbChangeVol\"]').prop("checked", false);
            $('input[name*=\"cbChangeVol\"]').css("opacity", "0.4").prop('disabled', true);
        }
        else {
            $('input[name*=\"cbChangeVol\"]').css("opacity", "").prop('disabled', false);
        }
    }
    else {
        if (document.all[$(e.target)[0].id].checked == true) {
            $('input[name*=\"cbChangeVol\"]').css("opacity", "0.4").prop('disabled', true);
            $(e.target).css("opacity", "").prop('disabled', false);
            //一併將相同號者打勾
            var strFileNo = "";
            //1140417   Cloud 1131087 一併修正-超出數量異常問題
            //for (var i = 2; i <= document.all["dg1"].rows.length + 1; i++) {
            for (var i = 2; i <= document.all["dg1"].rows.length; i++) {
                if (document.all["dg1__ctl" + i + "_cbChangeVol"].checked) {
                    strFileNo = document.all["dg1__ctl" + i + "_lbYear"].textContent;
                    break;
                }
            }
            //1140417   Cloud 1131087 一併修正-超出數量異常問題
            //for (var i = 2; i <= document.all["dg1"].rows.length + 1; i++) {
            for (var i = 2; i <= document.all["dg1"].rows.length; i++) {
                if (!document.all["dg1__ctl" + i + "_cbChangeVol"].checked && document.all["dg1__ctl" + i + "_lbYear"].textContent==strFileNo) {
                    document.all["dg1__ctl" + i + "_cbChangeVol"].checked = true;
                }
            }

        }
        else {
            $('input[name*=\"cbChangeVol\"]').css("opacity", "").prop('disabled', false);
            $('input[name*=\"cbChangeVol\"]').prop("checked", false);
        }
    }
}
// 1110216      Cloud   1101503 補強勾選一筆之後disabled其他勾選框，避免使用者以為可跳號勾選，勾選重排序號則清除勾選-e
