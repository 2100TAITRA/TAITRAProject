/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1030328	Eileen	1030182	清查將原使用AKC320分類號查詢改使用EAC005
 * 1051004  Kenny   1050313 1. 調整叫用CheckCaseMain檢核案次號時增加傳入版本別參數
                            2. 開啟EAC005子視窗查詢增加串入版本別資訊，使EAC005開啟時版本別預設值可以同母視窗
 * 1060317  Zen     1050087 二代公文修改
 * 1060518  Zen     1060215 innerText相關修正
 * 1070731  Zen     1070678 弱掃Client Password In Comment修正
 * 1080510	Zen		1050087	修正因升級呼叫WS方式改變衍生輸入分類號之錯誤
 * 1090313	Cloud	1081109	修改年度/版本互轉
 * 1091105	Cloud	1090763 增加處理併入檔號時，需撿核有無疏入版本別
 * 1100316	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;
var xDoc = document.all;
var c;


//1060317 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1060317 Zen 1050087 二代公文修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060317 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060317 Zen 1050087 二代公文修改
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
        case "btClsHelp":
    	case "btCaseHelp":
    		//* 1090313	Cloud	1081109	檢核分類號有值時，版本及年度不可皆為空白
    		if (jf_Trim(document.all.tbVERNO.value) == "" && jf_Trim(document.all.tbYEAR.value) == "" && jf_Trim(document.all.tbCLS.value) != "")
    		{
    			alert('分類號有值時，版本別及年度號不可皆為空白，請至少輸入一項。');
    			return;
    		}
            c = 1;
            var pUrl = "";
            //1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
            /*pUrl = "AKC320.aspx?k1="+document.all["tbCLS"].value;
			//open(pUrl);
			jf_OpenChildWin(pUrl,"AKC320",screen.Width-50,screen.Width-50);*/
            //1051004   Kenny   [1050313]   叫用EAC005查詢增加將版本別(VER_NO)資訊串入網址參數
            //pUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKT350&MODE=2&SHOWALL=1&FILE_YEAR="+jf_Trim(document.all.tbYEAR.value)+"&FILE_CLS="+jf_Trim(document.all.tbCLS.value)+"&SAMLart="+GetParam("SAMLart");
            pUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKT350&MODE=2&SHOWALL=1&VER_NO=" + jf_Trim(document.all.tbVERNO.value) + "&FILE_YEAR=" + jf_Trim(document.all.tbYEAR.value) + "&FILE_CLS=" + jf_Trim(document.all.tbCLS.value) + "&SAMLart=" + GetParam("SAMLart");
            //1060317 Zen 1050087 二代公文修改
            //jf_OpenChildWin(pUrl, "EAC005", 750, 500);
            jf_OpenChildWin(pUrl, "EAC005", 800, 600);
            //Eileen -- end
            Page_BlockSubmit = true;
            break;
        case "btClsHelp2":
    	case "btCaseHelp2":
    		//* 1090313	Cloud	1081109	檢核分類號有值時，版本及年度不可皆為空白
    		if (jf_Trim(document.all.tbVERNO.value) == "" && jf_Trim(document.all.tbYEAR2.value) == "" && jf_Trim(document.all.tbCLS.value) != "")
    		{
    			alert('分類號有值時，版本別及年度號不可皆為空白，請至少輸入一項。');
    			return;
    		}
            c = 2;
            var pUrl = "";
            //1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
            /*pUrl = "AKC320.aspx?k1="+document.all["tbCLS2"].value;
			//open(pUrl);
			jf_OpenChildWin(pUrl,"AKC320",screen.Width-50,screen.Width-50);*/
            //1051004   Kenny   [1050313]   叫用EAC005查詢增加將版本別(VER_NO)資訊串入網址參數
            //pUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKT350&MODE=2&SHOWALL=1&FILE_YEAR="+jf_Trim(document.all.tbYEAR2.value)+"&FILE_CLS="+jf_Trim(document.all.tbCLS2.value)+"&SAMLart="+GetParam("SAMLart");
            pUrl = "../../../EA/EA01/EAC005.aspx?nFrom=AKT350&MODE=2&SHOWALL=1&VER_NO=" + jf_Trim(document.all.tbVERNO.value) + "&FILE_YEAR=" + jf_Trim(document.all.tbYEAR2.value) + "&FILE_CLS=" + jf_Trim(document.all.tbCLS2.value) + "&SAMLart=" + GetParam("SAMLart");
            //1060317 Zen 1050087 二代公文修改
            //jf_OpenChildWin(pUrl, "EAC005", 750, 500);
            jf_OpenChildWin(pUrl, "EAC005", 800, 600);
            //Eileen -- end
            Page_BlockSubmit = true;
            break;
    }
}
//mickey 不輸入查詢條件提醒使用者 2005/10/13
function CheckKeyValue()
{
    var argDocNo = jf_Trim(document.all["txDocNo"].value);
    var argCLS = jf_Trim(document.all["tbCLS"].value);
    if (argDocNo == "" && argCLS == "")
    {
        alert("請輸入公文文號或完整檔號");
        return false;
    }
    else
        return true;
}

//1060317 Zen 1050087 二代公文修改
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

    //1060317 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            var checkKey = CheckKeyValue();
            if (UnAllowEmpty0() && UnAllowEmpty3() && checkKey)//if(UnAllowEmpty0())
            { Page_BlockSubmit = false; }
            else
            { Page_BlockSubmit = true; }
            //1060317 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = !jf_ConfirmClean();
            //1060317 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            jf_SetDefault();
            break;
        case "btPreview":
            Page_BlockSubmit = false;
            if (BeforeExecute())
            {
                if (document.all.rbCancel.checked && !(BeforeCancel()))
                { Page_BlockSubmit = true; }
                if (document.all.rbChange.checked && !(BeforeChange()))
                { Page_BlockSubmit = true; }
                if (document.all.rbChange.checked && document.all.txChangeDocNo.value == "")
                { alert("更換參照文號不可空白!!"); Page_BlockSubmit = true; }
                if (document.all.rbAdd.checked && !(BeforeAdd()))
                { Page_BlockSubmit = true; }
                if (document.all.rbAdd.checked && document.all.txAddDocNo.value == "")
                { alert("併入其他文號不可空白!!"); Page_BlockSubmit = true; }
                if (document.all.rbAdd2FileNo.checked && !(BeforeAdd()))
                { Page_BlockSubmit = true; }
                if (document.all.rbAdd2FileNo.checked && !(UnAllowEmpty2()))
                    //1051004   Kenny   [1050313]   輸入檔號，加入版本別檢核條件
                    //{alert("併入其他檔號,檔號其中一項不為空白,則另四項不可為空白!!");Page_BlockSubmit=true;}
                { alert("併入其他檔號,檔號其中一項不為空白,則另四項以及版本別皆不可為空白!!"); Page_BlockSubmit = true; }
            }
            else
            {
                alert("DataGrid 選取項至少選取一筆!!"); Page_BlockSubmit = true;
            }
            //1060317 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}
function UnAllowEmpty0()
{
    var empty = false;

    if (xDoc.tbYEAR.value == "" && xDoc.tbCLS.value == "" && xDoc.tbCASE.value == "" && xDoc.tbVOL.value == "" && xDoc.tbSEQ.value == "")
    { empty = true; }
    if (xDoc.txDocNo.value == "" && empty)
    { return false; }
    else
    { return true; }
}

function UnAllowEmpty3()
{
    var pass = false;
    if (xDoc.tbYEAR.value == "" && xDoc.tbCLS.value == "" && xDoc.tbCASE.value == "" && xDoc.tbVOL.value == "" && xDoc.tbSEQ.value == "")
    {
        pass = true;
    }
    else
    {
        //1051004   Kenny   [1050313]   輸入檔號，加入版本別檢核條件
        //if(xDoc.tbYEAR.value=="" || xDoc.tbCLS.value=="" || xDoc.tbCASE.value=="" || xDoc.tbVOL.value=="" || xDoc.tbSEQ.value=="")
        if (xDoc.tbYEAR.value == "" || xDoc.tbCLS.value == "" || xDoc.tbCASE.value == "" || xDoc.tbVOL.value == "" || xDoc.tbSEQ.value == "" || xDoc.tbVERNO.value == "")
        {
            //1051004   Kenny   [1050313]   調整檢核訊息
            alert("檔號其中一項不為空白,則另四項以及版本別皆不可為空白!!"); pass = false;
        }
        else
        {
            pass = true;
        }
    }
    return pass;
}

function UnAllowEmpty2()
{
    var pass = false;
    if (xDoc.tbYEAR2.value == "" && xDoc.tbCLS2.value == "" && xDoc.tbCASE2.value == "" && xDoc.tbVOL2.value == "" && xDoc.tbSEQ2.value == "")
    {
        pass = true;
    }
    else
    {
        //1051004   Kenny   [1050313]   輸入檔號，加入版本別檢核條件
        //if(xDoc.tbYEAR2.value=="" || xDoc.tbCLS2.value=="" || xDoc.tbCASE2.value=="" || xDoc.tbVOL2.value=="" || xDoc.tbSEQ2.value=="")
        if (xDoc.tbYEAR2.value == "" || xDoc.tbCLS2.value == "" || xDoc.tbCASE2.value == "" || xDoc.tbVOL2.value == "" || xDoc.tbSEQ2.value == "" || xDoc.tbVERNO.value == "")
        {
            //1051004   Kenny   [1050313]   調整檢核訊息；且將訊息統一於叫用檢核處alert，否則會出現兩次錯誤訊息
            pass = false;
        }
        else
        {
            pass = true;
        }
    }
    return pass;
}

function CallBack(argCallerId)
{
    //1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
    /*if(argCallerId=="AKC320")
	{
		if(document.all["lbReturnValue"].length>0)
		{
		    if(c==1)
		    {
			document.all["tbCLS"].value=document.all["lbReturnValue"].options[0].value;
			TbOnBlur("tbCLS");
			document.all["tbCASE"].value=document.all["lbReturnValue"].options[0].text;
			if(document.all["lbReturnValue"].options[1].text!="")
				document.all["tbYEAR"].value=document.all["lbReturnValue"].options[1].text;
			document.all["htxCaseKey"].value=document.all["lbReturnValue"].options[1].value;
			TbOnBlur("tbCASE");
			}
			if(c==2)
		    {
			document.all["tbCLS2"].value=document.all["lbReturnValue"].options[0].value;
			TbOnBlur2("tbCLS2");
			document.all["tbCASE2"].value=document.all["lbReturnValue"].options[0].text;
			if(document.all["lbReturnValue"].options[1].text!="")
				document.all["tbYEAR2"].value=document.all["lbReturnValue"].options[1].text;
			document.all["htxCaseKey2"].value=document.all["lbReturnValue"].options[1].value;
			TbOnBlur2("tbCASE2");
			}
		}
	}*/
    //lbReturnValue[0]=年度號
    //lbReturnValue[1]=分類號
    //lbReturnValue[2]=案次號
    //lbReturnValue[3]=案次號鍵值case_key
    //lbReturnValue[4]=分類號鍵值cls_key
    //lbReturnValue[5]=版本別
    //lbReturnValue[6]=分類號名稱
    if (argCallerId == "EAC005")
    {
        if (document.all.lbReturnValue.length > 0)
        {
            if (c == 1)
            {
            	//1090313	Cloud	1081109 增加設定版本別
            	document.all.tbVERNO.value = document.all.lbReturnValue.options[5].value;
                document.all.tbYEAR.value = document.all.lbReturnValue.options[0].value;
                document.all.tbCLS.value = document.all.lbReturnValue.options[1].value;
                TbOnBlur("tbCLS");
                document.all.tbCASE.value = document.all.lbReturnValue.options[2].value;
                document.all["htxCaseKey"].value = document.all.lbReturnValue.options[3].value;
                TbOnBlur("tbCASE");
            }
            else if (c == 2)
            {
                document.all.tbYEAR2.value = document.all.lbReturnValue.options[0].value;
                document.all.tbCLS2.value = document.all.lbReturnValue.options[1].value;
                TbOnBlur2("tbCLS2");
                document.all.tbCASE2.value = document.all.lbReturnValue.options[2].value;
                document.all["htxCaseKey2"].value = document.all.lbReturnValue.options[3].value;
                TbOnBlur2("tbCASE2");
            }
        }
    }

    if (document.all.lbReturnValue.options != null)//清空lbReturnValue物件
        document.all.lbReturnValue.options.length = 0;
    //Eileen -- end
}
function BeforeCancel()
{
    var pass = false;
    var notall = false;
    for (var i = 2 ; i < (document.all.dg1.rows.length + 1) ; i++)
    {
        if (document.all["dg1__ctl" + i + "_ck1"].checked == false)
        { notall = true; break; }
    }
    if (notall)
    {
        pass = true;
        for (var j = 2 ; j < (document.all.dg1.rows.length + 1) ; j++)
        {
            if (document.all["dg1__ctl" + j + "_txDoc"].value == document.all["dg1__ctl" + j + "_txComNo"].value && (document.all["dg1__ctl" + j + "_ck1"].checked))
            {
                alert("參照文號:" + document.all["dg1__ctl" + j + "_txComNo"].value + "有其他併件子文,不允許取消併件!!"); pass = false;
                break;

            }
        }
    } else
    { pass = true; }
    return pass;



}
function BeforeAdd()
{
    var pass = false;
    var notall = false;
    for (var i = 2 ; i < (document.all.dg1.rows.length + 1) ; i++)
    {
        if (document.all["dg1__ctl" + i + "_ck1"].checked == false)
        { notall = true; break; }
    }
    if (notall)
    {
        for (var j = 2 ; j < (document.all.dg1.rows.length + 1) ; j++)
        {
            if (document.all["dg1__ctl" + j + "_txDoc"].value == document.all["dg1__ctl" + j + "_txComNo"].value && (document.all["dg1__ctl" + j + "_ck1"].checked))
            {
                alert("參照文號:" + document.all["dg1__ctl" + j + "_txComNo"].value + "有其他併件子文,不允許併入其他公文!!"); break;
                pass = false;
            }
        }
    } else
    {
        pass = true;
    }
    return pass;

}
function BeforeExecute()
{
    var checked = false;
    for (var i = 2 ; i < (document.all.dg1.rows.length + 1) ; i++)
    {
        if (document.all["dg1__ctl" + i + "_ck1"].checked)
        {
            checked = true; break;
        }
    }
    return checked;
}
function BeforeChange()
{
    var exit = false;
    for (var i = 2 ; i < (document.all.dg1.rows.length + 1) ; i++)
    {
        if (document.all["dg1__ctl" + i + "_ck1"].checked && document.all["dg1__ctl" + i + "_txDoc"].value == document.all.txChangeDocNo.value)
        {
            exit = true; break;
        }
    }
    if (!exit) { alert('參照文號:' + document.all.txChangeDocNo.value + '不在選取資料範圍內!!') }
    return exit;
}

function ClientOnLoad()
{
    //1051004   Kenny   [1050313]   一併移除無用CODE 
    //jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,null);
    //jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
}


function TbOnBlur(argTextBox)
{
	//1090310 Cloud 1081109 修該支援輸入年度/版本互轉
	CurrentObjId = argTextBox;
    //alert(event.srcElement.id)
    var xObjectName = "";
    if (document.activeElement != null)
        xObjectName = document.activeElement.id;

    if ((xObjectName == "btExit") || (xObjectName == "btExitImg") || (xObjectName == "btCancelImg") || (xObjectName == "btCancel"))
        return;


    //年度號
    if (argTextBox == "tbYEAR")
    {
        if (document.all["tbYEAR"].value == "")
        { return; }
        else
        {
        	document.all["tbYEAR"].value = jf_PADL(document.all["tbYEAR"].value, 3, "0");
        	//1090313	Cloud	1081109	修改年度/版本互轉
        	jf_GetClassVer("Year");
        }
    }

    //分類號
    if (argTextBox == "tbCLS")
    {
        if (document.all["tbCLS"].value == "")
        {
            return;
        }
        //1080510 Zen 1050087 修正因升級呼叫WS方式改變衍生輸入分類號之錯誤
		//var KeyValue1 = new Array(1);
    	//KeyValue1[0] = document.all["tbCLS"].value;
		//1090313 CLOUD	1081109 整合為叫用GETCLS
		/*KeyValue1 = document.all["tbCLS"].value;
        var param1 = new Array(1);
        param1[0] = KeyValue1;
        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA", false, param1);*/
        var param1 = new Array(1);
        param1[0] = document.all["tbVERNO"].value;
        param1[1] = document.all["tbCLS"].value;
        param1[2] = document.all["tbYEAR"].value;
        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCLS", false, param1);
        iCallID_CLS = RtnObj.id;
        OnWSResult(RtnObj);

    }

    //案次號
    if (argTextBox == "tbCASE")
    {
        if (document.all["tbCASE"].value == "")
        {
            return;
        }

        if (document.all["tbCLS"].value != "")
        {
            //1051004   Kenny   [1050313]   增加傳入版本別資訊
            //var param = new Array(4);
            var param = new Array(5);
            param[0] = document.all["tbYEAR"].value;
            param[1] = document.all["tbCLS"].value;
            param[2] = document.all["tbCASE"].value;
            param[3] = "";
            //1051004   Kenny   [1050313]   增加傳入版本別資訊
            param[4] = document.all["tbVERNO"].value;

            RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckCaseMain", false, param);
            iCallID_CASE = RtnObj.id;
            OnWSResult(RtnObj);
        }
    }

    //卷次號
    if (argTextBox == "tbVOL")
    {
        if (document.all["tbVOL"].value == "")
        { return; }
        else
        {
            document.all["tbVOL"].value = jf_PADL(document.all["tbVOL"].value, 4, '0');
        }
    }

    //目次號
    if (argTextBox == "tbSEQ")
    {
        if (document.all["tbSEQ"].value == "")
        { return; }
        else
        {
            document.all["tbSEQ"].value = jf_PADL(document.all["tbSEQ"].value, 3, '0');
        }
    }
	//*109.03.13 Cloud   1081109 修改版本 / 年度互轉-版本別.
    if (argTextBox == "tbVERNO")
    {
    	if (document.all["tbVERNO"].value == "")
    	{ return; }
    	else
    		jf_GetClassVer("VerNo");
    }

    //1051004   Kenny   [1050313]   觸發onBlur的控制項id後方有2的(如tbYEAR2、tbCLS2等)觸發的會是TbOnBlur2函式，此處為TbOnBlur因此以下判斷皆不會執行到，MARK--Start--
    ////年度號
    //if (argTextBox=="tbYEAR2")
    //{
    //	if (document.all["tbYEAR2"].value=="")
    //	{return;}
    //	else
    //	{
    //		document.all["tbYEAR2"].value=jf_PADL(document.all["tbYEAR2"].value,3,"0");



    //	}
    //}

    ////分類號
    //if (argTextBox=="tbCLS2")
    //{
    //	if (document.all["tbCLS2"].value=="")
    //	{

    //		return;
    //	}
    //	var KeyValue1 = new Array(1);
    //	KeyValue1[0] = document.all["tbCLS2"].value;
    //	var param1 = new Array(1);
    //	param1[0] = KeyValue1;
    //	RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,param1);
    //	iCallID_CLS = RtnObj.id;
    //	OnWSResult(RtnObj);


    //}

    ////案次號
    //if (argTextBox=="tbCASE2")
    //{
    //	if (document.all["tbCASE2"].value=="")
    //	{
    //		return;
    //	}

    //	if (document.all["tbCLS2"].value!="")
    //	{
    //		var param = new Array(4);
    //		param[0] = document.all["tbYEAR"].value;
    //		param[1] = document.all["tbCLS"].value;
    //		param[2] = document.all["tbCASE"].value;
    //		param[3] = "";

    //		RtnObj = jf_CallWS("lib/AK_LIB.asmx","CheckCaseMain",false,param);
    //		iCallID_CASE = RtnObj.id;
    //		OnWSResult(RtnObj);
    //	}
    //}

    ////卷次號
    //if (argTextBox=="tbVOL2")
    //{
    //	if (document.all["tbVOL2"].value=="")
    //	{return;}
    //	else
    //	{
    //		document.all["tbVOL2"].value=jf_PADL(document.all["tbVOL2"].value,4,'0');
    //	}
    //}

    ////目次號
    //if (argTextBox=="tbSEQ2")
    //{
    //	if (document.all["tbSEQ2"].value=="")
    //	{return;}
    //	else
    //	{
    //		document.all["tbSEQ2"].value=jf_PADL(document.all["tbSEQ2"].value,3,'0');
    //	}
    //}
    //1051004   Kenny   [1050313]   觸發onBlur的控制項id後方有2的(如tbYEAR2、tbCLS2等)觸發的會是TbOnBlur2函式，此處為TbOnBlur因此以下判斷皆不會執行到，MARK--End--

}
function TbOnBlur2(argTextBox)
{
    //alert(event.srcElement.id)
    var xObjectName = "";
    if (document.activeElement != null)
        xObjectName = document.activeElement.id;

    if ((xObjectName == "btExit") || (xObjectName == "btExitImg") || (xObjectName == "btCancelImg") || (xObjectName == "btCancel"))
        return;



    //年度號
    if (argTextBox == "tbYEAR2")
    {
        if (document.all["tbYEAR2"].value == "")
        { return; }
        else
        {
            document.all["tbYEAR2"].value = jf_PADL(document.all["tbYEAR2"].value, 3, "0");


        }
    }

    //分類號
    if (argTextBox == "tbCLS2")
    {
        if (document.all["tbCLS2"].value == "")
        {

            return;
        }
        //1060317 Zen 1050087 二代公文修改
        //var KeyValue1 = new Array(1);
        //KeyValue1[0] = document.all["tbCLS2"].value;
        var KeyValue1 = document.all["tbCLS2"].value;

        var param1 = new Array(1);
        param1[0] = KeyValue1;
        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA", false, param1);
        iCallID_CLS2 = RtnObj.id;
        OnWSResult(RtnObj);


    }

    //案次號
    if (argTextBox == "tbCASE2")
    {
        if (document.all["tbCASE2"].value == "")
        {
            return;
        }

        if (document.all["tbCLS2"].value != "")
        {
			//* 1091105	Cloud	1090763 增加處理併入檔號時，需撿核有無疏入版本別
			if(document.all["tbVERNO"].value=="")
			{
				alert('未輸入版本別。');
				$("#tbVERNO").focus();
				return;
			}
            //1051004   Kenny   [1050313]   增加傳入版本別資訊
            //var param = new Array(4);
            var param = new Array(5);
            param[0] = document.all["tbYEAR2"].value;
            param[1] = document.all["tbCLS2"].value;
            param[2] = document.all["tbCASE2"].value;
            param[3] = "";
            //1051004   Kenny   [1050313]   增加傳入版本別資訊
            param[4] = document.all["tbVERNO"].value;

            RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckCaseMain", false, param);
            iCallID_CASE2 = RtnObj.id;
            OnWSResult(RtnObj);
        }
    }

    //卷次號
    if (argTextBox == "tbVOL2")
    {
        if (document.all["tbVOL2"].value == "")
        { return; }
        else
        {
            document.all["tbVOL2"].value = jf_PADL(document.all["tbVOL2"].value, 4, '0');
        }
    }

    //目次號
    if (argTextBox == "tbSEQ2")
    {
        if (document.all["tbSEQ2"].value == "")
        { return; }
        else
        {
            document.all["tbSEQ2"].value = jf_PADL(document.all["tbSEQ2"].value, 3, '0');
        }
    }
}

var iCallID_CLS;
var iCallID_CLS2;
var iCallID_CASE;
var iCallID_CASE2;
function OnWSResult(argResult)
{
    var WSResult;
    var ErrMsg = "";



    if (argResult.id == iCallID_CLS)  //分類號 onblur
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            WSResult = argResult.value;
            document.all["htxClsKey"].value = WSResult.CLS_KEY;

        }
        else
        {
            //1060317 Zen 1050087 二代公文修改
            //document.all["tbCLS"].focus();
            $('#tbCLS').focus();
        }
    }


    if (argResult.id == iCallID_CASE) //案次號 onblur
    {
        WSResult = argResult.value;
        if (WSResult.ErrorClass.IsRedirect != true)
        {
            if (WSResult.ErrorClass.ErrMessage.length != 0)  //有err
            {
                alert("輸入的案次號不存在!!")

                //1060317 Zen 1050087 二代公文修改
                //document.all["tbCASE"].focus();
                $('#tbCASE').focus();
            }
            else
            {
                //將CASE_KEY存入隱藏欄位
                document.all.htxCaseKey.value = WSResult.Key;
            }
        }
    }

    if (argResult.id == iCallID_CLS2)  //分類號 onblur
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            WSResult = argResult.value;
            document.all["htxClsKey2"].value = WSResult.CLS_KEY;

        }
        else
        {
            //1060317 Zen 1050087 二代公文修改
            //document.all["tbCLS2"].focus();
            $('#tbCLS2').focus();
        }
    }


    if (argResult.id == iCallID_CASE2) //案次號 onblur
    {
        WSResult = argResult.value;
        if (WSResult.ErrorClass.IsRedirect != true)
        {
            if (WSResult.ErrorClass.ErrMessage.length != 0)  //有err
            {
                alert("輸入的案次號不存在!!")

                //1060317 Zen 1050087 二代公文修改
                //document.all["tbCASE2"].focus();
                $('#tbCASE2').focus();
            }
            else
            {
                //將CASE_KEY存入隱藏欄位
                document.all.htxCaseKey2.value = WSResult.Key;
            }
        }
    }
	//* 1090310		Cloud	1081109	修改支援年度onblur取得版本-S
    if (argResult.id == iCallID_YearVerNo)//
    {
    	WSResult = argResult.value;
    	if (WSResult.ErrorClass.IsErr)
    	{
			//* 1100316	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況
    		//alert(WSResult.ErrorClass.ErrMessage[0]);
			var bAlert = true;
    		if (WSResult.ErrorClass.ErrMessage[0].indexOf("輸入區間含有多個版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
    		{
				//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-s
				if(document.all["tbVERNO"].value!="")
				{
					var checkmsg = WSResult.ErrorClass.ErrMessage[0].split('版本')
					for(var i=0 ;i<checkmsg.length;i++)
					{
						if(checkmsg[i].indexOf("啟用區間為")!=-1)
						{
							if(checkmsg[i].split('啟用區間為')[0]==document.all["tbVERNO"].value)
							{
								bAlert = false;
								break;
							}
						}
					}

				}
				if(bAlert)
				{
					document.all["tbVERNO"].value = "";
					document.all["tbVERNO"].focus();
					alert(WSResult.ErrorClass.ErrMessage[0]);
				}
    			//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-e
    		}
    		else
    		{
				//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息
				alert(WSResult.ErrorClass.ErrMessage[0]);
    			document.all[CurrentObjId].value = "";
    		}
    	}
    	else
    	{
    		if (CurrentObjId == "tbYEAR")//年度號ONLBUR-帶回版本別一律設定
    		{
    			document.all["tbVERNO"].value = WSResult.strVerNo;
    		}
    		else//版本別onblur
    		{
    			var dt = new Date();
    			var strSysYear = dt.getFullYear() - 1911;
    			if (WSResult.strEdate == "" || WSResult.strEdate >= strSysYear)//啟用中-無停用日或是停用日大於等於系統日
    			{
    				if (document.all["tbYEAR"].value == "" || document.all["tbYEAR"].value < WSResult.strSdate)//年度為空或是輸入年度小於起日則跳出訊息後直接帶入
    				{
    					if (document.all["tbYEAR"].value != "")//不為空再跳提醒
    						alert("該版本啟用中，系統將預設帶入系統年。");
    					document.all["tbYEAR"].value = strSysYear;
    				}
    			}
    			else//停用版本
    			{
    				//年度為空白或是輸入年度不合理(小於起日或是大於停止日)則跳出訊息預設代最大
    				if (document.all["tbYEAR"].value == "" || document.all["tbYEAR"].value < WSResult.strSdate || document.all["tbYEAR"].value > WSResult.strEdate)
    				{
    					if (document.all["tbYEAR"].value != "")//不為空再跳提醒
    					{
    						if (WSResult.strSdate != WSResult.strEdate)
    							alert("該版本使用於：" + WSResult.strSdate + "~" + WSResult.strEdate + "年，系統將預設帶入最大年度。");
    						else
    							alert("該版本使用於：" + WSResult.strSdate + "年，系統將預設帶入。");
    					}
    					document.all["tbYEAR"].value = WSResult.strEdate;
    				}
    			}
    		}
    	}
    }
	//* 1090310		Cloud	1081109	修改支援年度onblur取得版本-E

    argResult = null;
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正
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
function jf_ChangeRadioButton()
{
    //alert(event.srcElement.id);
    if (event.srcElement.id == "txChangeDocNo")
        document.all["rbChange"].checked = true;
    else if (event.srcElement.id == "txAddDocNo")
        document.all["rbAdd"].checked = true;
    else if (event.srcElement.id == "tbYEAR2")
        document.all["rbAdd2FileNo"].checked = true;
}
function jf_SetDefault()
{
    document.all.rbCancel.checked = true;
    //1060317 Zen 1050087 二代公文修改
    //document.all["txDocNo"].focus();
    $('#txDocNo').focus();
}
//1030328 Eileen [1030182] 取得SAMLart網址參數
function GetParam(p)
{
    var strUrl = document.location.toString();
    strUrl = unescape(strUrl);
    var rg_szItems = strUrl.split("?");
    if (rg_szItems.length == 2)
    {
        var rg_szItems2 = rg_szItems[1].split("&");
        for (var i = 0; i < rg_szItems2.length; i++)
        {
            var rg_items = rg_szItems2[i].split("=");
            if (rg_items[0] == "SAMLart")
                return rg_items[1];
        }
    }
}
//* 2020.03.08	Cloud	1081109	修改，分類號空白時，年度/版本onblur時進行互轉
var iCallID_YearVerNo = null;
var CurrentObjId;
function jf_GetClassVer(argCallFrom)
{
	var strYear = document.all["tbYEAR"].value;
	var strVerNo = document.all["tbVERNO"].value;
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