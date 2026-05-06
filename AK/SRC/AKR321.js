/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.08.01
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1030708		Cloud	1030423	[內政部]不檢核卷次號迄值
 * 1051004      Kenny   1050313 調整叫用CheckCaseMain檢核案次號時增加傳入版本別參數
 * 1060608      Zen     1050087 二代升級
 * 1080313		Cloud	1081109	修改支援年度/版本互轉 * 1100204      Zen     1090927 取消使用document.activeElement
 * 1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況
 * 1110315      Zen     1101545 (考試院)以AKR321為基底新增AKR321C1
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060608 Zen 1050087 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1060608 Zen 1050087 二代升級//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060608 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060608 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
    }
}

//1060608 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060608 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btClean":
            Page_BlockSubmit = true;
            if (jf_ConfirmClean())
            {
                document.all.cbPrePrint.checked = true;
                document.all.rbCls.checked = true;
                document.all.cbDisplay.checked = true;
                //document.all.rbL.checked = true;
                //0981030	Howard	0980479	修正點選淸除，一併清除畫面上分類別名稱及案次號名稱
                document.all.rbNew.checked = true;
                //1060608 Zen 1050087 二代升級--begin                //document.all["lbFILE_CLS2"].innerText = "";
                //document.all["lbFILE_CASE2"].innerText = "";
                document.all["lbFILE_CLS2"].value = "";
                document.all["lbFILE_CASE2"].value = "";
                //1060608 Zen 1050087 二代升級--end
                //1060608 Zen 1050087 二代升級                //document.all.txVerNo.focus();
                $('#txVerNo').focus();
            }
            break;
        case "btPrint":
        case "btPreview":
            if (document.all["cbPrePrint"].checked)
            {
                if (!Check_Required_Field())
                    Page_BlockSubmit = true;
                else
                    Page_BlockSubmit = false;
            }
            else
            {
                if (!Check_Form_IsValid())
                    Page_BlockSubmit = true;
                else
                    Page_BlockSubmit = false;
            }
            //1060608 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1110315 Zen 1101545 (考試院)以AKR321為基底新增AKR321C1        case "btPreviewOne":
            Page_BlockSubmit = true;
            let strPrintType = 'rbCls_Case';
            if (document.all['rbCls'].checked)
                strPrintType = 'rbCls';
            if (document.all['rbCase'].checked)
                strPrintType = 'rbCase';

            let strUrl = 'AKR321C1.aspx?argVerNo=' + document.all['txVerNo'].value + '&argFileYear=' + document.all['tbFILE_YEAR'].value + '&argFileCls=' + document.all['tbFILE_CLS1'].value
                + '&arrFileCase=' + document.all['tbFILE_CASE1'].value + '&argFileVol=' + document.all['tbFILE_VOL2'].value + '&argPrintType=' + strPrintType;
            jf_OpenChildWin(strUrl, "AKR321C1", 800, 600);
            break;
    }
}
function Check_Form_IsValid()
{
    var fr = document.all;
    var pNotAllowNull = false;
    var pBuf = "";
    var pValid = "true";
    var pFileVol = "";

    if ((fr.tbFILE_YEAR.value == "") && (fr.tbFILE_CLS1.value == "") && (fr.tbFILE_CASE1.value == "") && (fr.tbFILE_VOL1.value == ""))
    {
        alert("請至少輸入年度條件");
        //1060608 Zen 1050087 二代升級        //fr.tbFILE_YEAR.focus();
        $('#tbFILE_YEAR').focus();
        return false;
    }

    if ((fr.tbFILE_VOL1.value != "") && (fr.tbFILE_VOL2.value != ""))
    {
        if (fr.tbFILE_VOL1.value > fr.tbFILE_VOL2.value)
        {
            pFileVol = "卷次起不可大於迄 \n\n";
            if (pValid)
                //1060608 Zen 1050087 二代升級                //fr.tbFILE_VOL1.focus();
                $('#tbFILE_VOL1').focus();
            pValid = false;
        }
    }
        //0981030	Howard	0980479		修改取僅輸入卷次號訖時，將該值帶入卷次號起值
    else if (fr.tbFILE_VOL1.value != "")
    {
        fr.tbFILE_VOL2.value = fr.tbFILE_VOL1.value;
    }
    else if (fr.tbFILE_VOL2.value != "")
    {
        fr.tbFILE_VOL1.value = fr.tbFILE_VOL2.value;
    }

    if ((fr.tbFILE_VOL1.value != "") || (fr.tbFILE_VOL2.value != ""))
    {
        pNotAllowNull = true;
    }

    if (fr.tbFILE_CASE1.value == "")
    {
        if (pNotAllowNull)
        {
            pBuf = pBuf + "案次號 \n ";
            if (pValid)
                //1060608 Zen 1050087 二代升級                //fr.tbFILE_CASE1.focus();
                $('#tbFILE_CASE1').focus();
            pValid = false;
        }
    }
    else pNotAllowNull = true;

    if (fr.tbFILE_CLS1.value == "")
    {
        if (pNotAllowNull)
        {
            pBuf = pBuf + "分類號 \n ";
            if (pValid)
                //1060608 Zen 1050087 二代升級                //fr.tbFILE_CLS1.focus();
                $('#tbFILE_CLS1').focus();
            pValid = false;
        }
    }
    else pNotAllowNull = true;

    if (fr.tbFILE_YEAR.value == "")
    {
        if (pNotAllowNull)
        {
            pBuf = pBuf + "年度 \n ";
            if (pValid)
                //1060608 Zen 1050087 二代升級                //fr.tbFILE_YEAR.focus();
                $('#tbFILE_YEAR').focus();
            pValid = false;
        }
    }

    if (!pValid)
    {
        if (pBuf == "")
            alert(pFileVol);
        else
            alert(pFileVol + "以下欄位不可為空白：\n" + pBuf);
    }

    return pValid;
}

function PADZERO(obj, num)
{
    if (obj.value != "")
    {
        obj.value = jf_PADL(obj.value, num, "0");
    }
}

function Check_Required_Field()
{
    var fr = document.all;
    var errMsg = "";

    //0981030	Howard	0980479	新增版本別欄位
    if (fr.txVerNo.value == "")
        errMsg += "版本別\n";
    if (fr.tbFILE_YEAR.value == "")
        errMsg += "年度\n";
    if (fr.tbFILE_CLS1.value == "")
        errMsg += "分類號\n";
    if (fr.tbFILE_CASE1.value == "")
        errMsg += "案次號\n";
    // 1030708		Cloud	1030423	[內政部]不檢核卷次號迄值
    if (fr.OrgNickName.value != "MOI")
    {
        if (fr.tbFILE_VOL2.value == "")
            errMsg += "迄卷次\n";
    }
    if (errMsg != "")
    {
        errMsg = "以下欄位不可為空白：\n" + errMsg;
        //0981030	Howard	0980479	新增版本別欄位
        if (fr.txVerNo.value == "")
            //1060608 Zen 1050087 二代升級            //fr.txVerNo.focus();
            $('#txVerNo').focus();
        else if (fr.tbFILE_YEAR.value == "")
            //1060608 Zen 1050087 二代升級            //fr.tbFILE_YEAR.focus();
            $('#tbFILE_YEAR').focus();
        else if (fr.tbFILE_CLS1.value == "")
            //1060608 Zen 1050087 二代升級            //fr.tbFILE_CLS1.focus();
            $('#tbFILE_CLS1').focus();
        else if (fr.tbFILE_CASE1.value == "")
            //1060608 Zen 1050087 二代升級            //fr.tbFILE_CASE1.focus();
            $('#tbFILE_CASE1').focus();
        else if (fr.tbFILE_VOL2.value == "")
            //1060608 Zen 1050087 二代升級            //fr.tbFILE_VOL2.focus();
            $('#tbFILE_VOL2').focus();
        alert(errMsg);
        return false;
    }

    if ((fr.tbFILE_VOL1.value != "") && (fr.tbFILE_VOL2.value != ""))
    {
        if (fr.tbFILE_VOL1.value > fr.tbFILE_VOL2.value)
        {
            alert("卷次起不可大於迄");
            //1060608 Zen 1050087 二代升級            //fr.tbFILE_VOL1.focus();
            $('#tbFILE_VOL1').focus();
            return false;
        }
    }
        //0981030	Howard	0980479	修改取僅輸入卷次號訖時，將該值帶入卷次號起值
    else if (fr.tbFILE_VOL1.value != "")
    {
        fr.tbFILE_VOL2.value = fr.tbFILE_VOL1.value;
    }
    else if (fr.tbFILE_VOL2.value != "")
    {
        fr.tbFILE_VOL1.value = fr.tbFILE_VOL2.value;
    }

    return true;
}

function CallBack(argCallerId)
{
}


function TbOnBlur(argTextBox)
{
	//1090310 Cloud 1081109 修該支援輸入年度/版本互轉
	CurrentObjId = argTextBox;
    var xObjectName = document.activeElement.id;

    if ((xObjectName == "btExit") || (xObjectName == "btExitImg"))
        return;

    //分類號
    //0981030	Howard	0980479	新增版本別欄位
    //if (argTextBox=="tbFILE_CLS1")
    if (argTextBox == "tbFILE_CLS1" || argTextBox == "txVerNo")
    {
    	//1090313 Cloud 1081109 修該支援輸入年度/版本互轉
    	if (argTextBox == "txVerNo")
    		jf_GetClassVer("VerNo");
        if (document.all["tbFILE_CLS1"].value == "")
        {
            //1060608 Zen 1050087 二代升級            //document.all["lbFILE_CLS2"].innerText = "";
            document.all["lbFILE_CLS2"].value = "";
            return;
        }
        if (bMsg)
        {
            var KeyValue = new Array(1);
            KeyValue[0] = document.all["tbFILE_CLS1"].value;
            //0981030	Howard	0980479	新增版本別欄位
            //var param = new Array(1);
            var param = new Array(2);
            //1060608 Zen 1050087 二代升級            //param[0] = KeyValue;
            param[0] = KeyValue[0];
            param[1] = document.all["txVerNo"].value;
            //0981030	Howard	0980479	新增版本別欄位
            //RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,param);
            RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA_V", false, param);
            iCallID_CLS = RtnObj.id;
            OnWSResult(RtnObj);
        }
        else
            bMsg = true;
    }
    //案次號
    if (argTextBox == "tbFILE_CASE1")
    {
        if (document.all["tbFILE_CASE1"].value == "")
        {
            //1060608 Zen 1050087 二代升級            //document.all["lbFILE_CASE2"].innerText = "";
            document.all["lbFILE_CASE2"].value = "";
            return;
        }
        else
        {
            if (document.all["tbFILE_CLS1"].value == "")
            {
                alert("請輸入分類號");
                //1060608 Zen 1050087 二代升級                //document.all["tbFILE_CLS1"].focus();
                $('#tbFILE_CLS1').focus();
                return;
            }
        }
        if (bMsg)
        {
            var KeyValue = new Array(1)
            KeyValue[0] = document.all["tbFILE_CLS1"].value;
            var KeyValue1 = new Array(1)
            KeyValue1[0] = document.all["tbFILE_CASE1"].value;
            //1051004   Kenny   [1050313]   增加傳入版本別資訊
            //var param = new Array(4);
            var param = new Array(5);
            param[0] = document.all["tbFILE_YEAR"].value;
            //1060608 Zen 1050087 二代升級--begin            //param[1] = KeyValue;
            //param[2] = KeyValue1;
            param[1] = KeyValue[0];
            param[2] = KeyValue1[0];
            //1060608 Zen 1050087 二代升級--end            param[3] = "";
            //1051004   Kenny   [1050313]   增加傳入版本別資訊
            param[4] = document.all["txVerNo"].value;

            RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckCaseMain", false, param);
            iCallID_CASE = RtnObj.id;
            OnWSResult(RtnObj);
        }
        else
            bMsg = true;
    }
	//* 1090313		Cloud	1081109	修改支援年度onblur取得版本
    if (argTextBox == "tbFILE_YEAR")//年度號
    {
    	PADZERO(document.all["tbFILE_YEAR"], 3);
    	jf_GetClassVer("Year");
    }
}

var bMsg = true;
var iCallID_CLS = null;
var iCallID_CASE = null;
//* 1090313		Cloud	1081109	修改支援年度onblur取得版本
var iCallID_YearVerNo = null;
var CurrentObjId;
function OnWSResult(argResult)
{

    if (argResult.id == iCallID_CLS)
    {
        WSResult = argResult.value;
        if (WSResult.ErrorClass.IsRedirect != true)
        {
            if (WSResult.ErrorClass.ErrMessage.length == 0)
            {
                //1060608 Zen 1050087 二代升級                //document.all["lbFILE_CLS2"].innerText = WSResult.ClsName;
                document.all["lbFILE_CLS2"].value = WSResult.ClsName;
                //0981030	Howard	0980479	新增版本別欄位
                document.all["txVerNo"].value = WSResult.VerNo;
                bMsg = true;
            }
            else
            {
                //1100204 Zen 1090927 取消使用document.activeElement                //if (document.activeElement.id == "tbFILE_CASE1")
                if (CurrentObjId == "tbFILE_CASE1")
                    bMsg = false;
                alert("無此分類號");
                //1060608 Zen 1050087 二代升級                //document.all["lbFILE_CLS2"].innerText = "";
                document.all["lbFILE_CLS2"].value = "";
                //1060608 Zen 1050087 二代升級                //document.all["tbFILE_CLS1"].focus();
                $('#tbFILE_CLS1').focus();
            }
        }
    }
    if (argResult.id == iCallID_CASE)
    {
        WSResult = argResult.value;
        if (WSResult.ErrorClass.IsRedirect != true)
        {
            if (WSResult.ErrorClass.ErrMessage.length == 0)
            {
                //1060608 Zen 1050087 二代升級                //document.all["lbFILE_CASE2"].innerText = WSResult.CaseName;
                document.all["lbFILE_CASE2"].value = WSResult.CaseName;
            }
            else
            {
                alert("無此案次號");
                //1060608 Zen 1050087 二代升級                //document.all["lbFILE_CASE2"].innerText = "";
                document.all["lbFILE_CASE2"].value = "";
                //1060608 Zen 1050087 二代升級                //document.all["tbFILE_CASE1"].focus();
                $('#tbFILE_CASE1').focus();
            }
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
				//* 2021.03.16	Cloud	1100273
				//修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-E
    			
    		}
    		else
    		{
				//* 2021.03.16	Cloud	1100273
				//修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-E
				alert(WSResult.ErrorClass.ErrMessage[0]);
    			document.all[CurrentObjId].value = "";
    		}
    	}
    	else
    	{
    		if (CurrentObjId == "tbFILE_YEAR")//年度號ONLBUR-帶回版本別一律設定
    		{
    			document.all["txVerNo"].value = WSResult.strVerNo;
    		}
    		else//版本別onblur
    		{
    			var dt = new Date();
    			var strSysYear = dt.getFullYear() - 1911;
    			if (WSResult.strEdate == "" || WSResult.strEdate >= strSysYear)//啟用中-無停用日或是停用日大於等於系統日
    			{
    				if (document.all["tbFILE_YEAR"].value == "" || document.all["tbFILE_YEAR"].value < WSResult.strSdate)//年度為空或是輸入年度小於起日則跳出訊息後直接帶入
    				{
    					if (document.all["tbFILE_YEAR"].value != "")//不為空再跳提醒
    						alert("該版本啟用中，系統將預設帶入系統年。");
    					document.all["tbFILE_YEAR"].value = strSysYear;
    				}
    			}
    			else//停用版本
    			{
    				//年度為空白或是輸入年度不合理(小於起日或是大於停止日)則跳出訊息預設代最大
    				if (document.all["tbFILE_YEAR"].value == "" || document.all["tbFILE_YEAR"].value < WSResult.strSdate || document.all["tbFILE_YEAR"].value > WSResult.strEdate)
    				{
    					if (document.all["tbFILE_YEAR"].value != "")//不為空再跳提醒
    					{
    						if (WSResult.strSdate != WSResult.strEdate)
    							alert("該版本使用於：" + WSResult.strSdate + "~" + WSResult.strEdate + "年，系統將預設帶入最大年度。");
    						else
    							alert("該版本使用於：" + WSResult.strSdate + "年，系統將預設帶入。");
    					}
    					document.all["tbFILE_YEAR"].value = WSResult.strEdate;
    				}
    			}

    		}
    	}
    }
	//* 1090313		Cloud	1081109	修改支援年度onblur取得版本-E
}

function ClientOnLoad()
{
    //1051004   Kenny   [1050313]   一併移除無用CODE 
    //jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
    //jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,null);
    //1030708	Cloud	[1030423]	非內政隱藏單位名稱欄位
    if (document.all.OrgNickName.value != "MOI")
    {
        document.all["lbDeptName"].style.display = "none";
        document.all["txDeptName"].style.display = "none";
    }
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060608 Zen 1050087 二代升級    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}
//* 2020.03.13	Cloud	1081109	修改，分類號空白時，年度/版本onblur時進行互轉
function jf_GetClassVer(argCallFrom)
{
	var strYear = document.all["tbFILE_YEAR"].value;
	var strVerNo = document.all["txVerNo"].value;
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