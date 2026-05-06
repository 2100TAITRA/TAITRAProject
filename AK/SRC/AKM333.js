/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2008.4.08	Cola	0970324	記錄母視窗來文字號/發文字號資訊，以利insert deliv_unit 
 * 2013.4.26	Jagle	1020325	DATAGRID增加清除、全選、反向、刪除受文者的按鈕
 * 1060413      Zen     1050087 二代升級
 * 1060814      Zen     1060699 修正不展開細目無法儲存資料之問題 * 1100204      Zen     1090927 取消使用document.activeElement
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060413 Zen 1050087 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1060413 Zen 1050087 二代升級//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060413 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
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
        case "btDetail":
            DisplayForm();
            //1060413 Zen 1050087 二代升級            $(window).trigger('resize');
            Page_BlockSubmit = true;
            break;
            //1020426	Jagle	[1020325]	增加按鈕
        case "btAll"://全選
            Page_BlockSubmit = true;
            var strObjName = "";
            var pDg1Len = document.all.dg1.rows.length + 1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
            for (i = 2; i < pDg1Len; i++)
            {
                strObjName = "dg1__ctl" + i + "_cbSelect";
                if (document.all[strObjName].isDisabled)
                    continue;
                document.all[strObjName].checked = true;
            }
            break;
        case "btClear"://清除
            Page_BlockSubmit = true;
            var strObjName = "";
            var pDg1Len = document.all.dg1.rows.length + 1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
            for (i = 2; i < pDg1Len; i++)
            {
                strObjName = "dg1__ctl" + i + "_cbSelect";
                if (document.all[strObjName].isDisabled)
                    continue;
                document.all[strObjName].checked = false;
            }
            break;
        case "btRever"://反向
            Page_BlockSubmit = true;
            var strObjName = "";
            var pDg1Len = document.all.dg1.rows.length + 1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
            for (i = 2; i < pDg1Len; i++)
            {
                strObjName = "dg1__ctl" + i + "_cbSelect";
                if (document.all[strObjName].checked)
                    document.all[strObjName].checked = false;
                else
                    document.all[strObjName].checked = true;
            }
            break;
        case "btDeleteData"://刪除受文者
            Page_BlockSubmit = true;
            var strObjName = "";
            var strRcvName = "";
            var pDg1Len = document.all.dg1.rows.length + 1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
            for (i = 2; i < pDg1Len; i++)
            {
                strObjName = "dg1__ctl" + i + "_cbSelect";
                strRcvName = "dg1__ctl" + i + "_txRcvName";
                if (document.all[strObjName].checked)
                    document.all[strRcvName].value = "";
            }
            break;
    }
}

//1060413 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060413 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        //1060413 Zen 1050087 二代升級        //case "btOpen":
        //    Page_BlockSubmit = !jf_CheckKeyObject();
        //    jf_ToolBarSubmit();
        //    break;
        case "btSave":
            //take value to form
            TakeValToForm();

            var pMsg = "";
            var IsFocus = true;
            if (document.all["tbFNAME"].value == "")//來文檢查
            {
                if (document.all["tbFNAME2"].value != "" || document.all["tbFNAME3"].value != "")
                {
                    //alert("主要來文者欄位空白，次要來文者或補正欄位不允許有值");
                    pMsg += "主要來文者欄位空白，次要來文者或補正欄位不允許有值\n";
                    if (IsFocus)
                        //1060413 Zen 1050087 二代升級                        //document.all["tbFNAME"].focus();
                        $('#tbFNAME').focus();

                    IsFocus = false;
                }
            }

            if (document.all["tbINAME"].value == "")//發文檢查
            {
                if (document.all["tbINAME2"].value != "" || document.all["tbINAME3"].value != "")
                {
                    //alert("主要發文者欄位空白，次要發文者或補正欄位不允許有值");
                    pMsg += "主要發文者欄位空白，次要發文者或補正欄位不允許有值\n";
                    if (IsFocus)
                        //1060413 Zen 1050087 二代升級                        //document.all["tbINAME"].focus();
                        $('#tbINAME').focus();

                    IsFocus = false;
                }
            }
            //檢查來、發文者是否全為空白
            if (document.all["tbFNAME"].value == "" && document.all["tbFNAME2"].value == "" && document.all["tbFNAME3"].value == "" && document.all["tbINAME"].value == "" && document.all["tbINAME2"].value == "" && document.all["tbINAME3"].value == "")
            {
                //alert("主要來、發文者欄位至少要有一欄位不為空白");
                pMsg += "主要來、發文者欄位至少要有一欄位不為空白\n";
                if (IsFocus)
                    //1060413 Zen 1050087 二代升級                    //document.all["tbFNAME"].focus();
                    $('#tbFNAME').focus();

                IsFocus = false;
            }
            /*var ptbType="";
			var ptbRName="";			
			for(var i=2;i<52;i++)
			{
				ptbType ="dg1__ctl"+i+"_tbType";
				ptbRName="dg1__ctl"+i+"_txRcvName";
				if ((document.all[ptbType].value=="" || document.all[ptbRName].value=="") && (document.all[ptbType].value!="" || document.all[ptbRName].value!=""))
				{
					pMsg+="受文者明細，序號"+(i-1);
					if (document.all[ptbType].value=="")
					{
						pMsg+="，本別欄位";
						
						if (IsFocus)
						{document.all[pdlType].focus();}
						
						IsFocus=false;
					}
						
					if (document.all[ptbRName].value=="")
					{
						pMsg+="，受文者欄位";
						
						if (IsFocus)
						{document.all[ptbRName].focus();}
						
						IsFocus=false;
					}
					
					pMsg+="不可空白\n";
				}
			}*/

            if (pMsg != "")
            {
                alert(pMsg);
                Page_BlockSubmit = true;
            }
            else
            {
                opener.document.all["tbFNAME"].value = document.all["tbFNAME"].value;
                opener.document.all["tbINAME"].value = document.all["tbINAME"].value;
                opener.document.all["tbRCVNAME"].value = document.all["dg1__ctl2_txRcvName"].value;
                //[0970324]Add by Cola 記錄母視窗來文字號發文字號資訊 -- start --
                document.all["txFromNoWord"].value = opener.document.all["txFromNoWord"].value;
                document.all["tbFNO"].value = opener.document.all["tbFNO"].value;
                document.all["dllIssueNoWord"].value = opener.document.all["dllIssueNoWord_Text"].value;
                document.all["tbINO"].value = opener.document.all["tbINO"].value;
                //Cola -- end --
                Page_BlockSubmit = false;
            }

            //1060413 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1060413 Zen 1050087 二代升級        //case "btDelete":
        //    Page_BlockSubmit = !jf_ConfirmDelete();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btCancel":
        //    Page_BlockSubmit = !jf_ConfirmCancel();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btClean":
        //    Page_BlockSubmit = true;
        //    jf_ConfirmClean();
        //    break;
        //case "btSearch":
        //    break;
        //case "btPrint":
        //    Page_BlockSubmit = !jf_ConfirmPrint();
        //    break;
        //case "btPreview":
        //    Page_BlockSubmit = !jf_ConfirmPreview();
        //    break;
    }
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{    //document.all["divDG"].className = "hide";
    //document.all["divTB"].className = "";
}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}


//1060413 Zen 1050087 二代升級//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
//{
//    var index = document.all[argDDLId].selectedIndex;
//    var obj = document.all[argDDLId].options[index];

//    document.all[argTextBoxId].value = obj.text;
//    document.all[argLabelId].innerText = obj.value;
//}

function DisplayForm()
{
    //1060413 Zen 1050087 二代升級    //document.all["divDG"].className = "";
    document.all["divDG"].className = "DivTable";
    //1020426	Jagle	[1020325]	增加DAGRID按鈕
    //1060413 Zen 1050087 二代升級，將按鈕和datagrid整合    //document.all["DgButton"].className = "";
    document.all["divTB"].className = "hide";
    document.all["dg1__ctl2_txRcvName"].value = document.all.txRcv1.value;
    document.all["dg1__ctl3_txRcvName"].value = document.all.txRcv2.value;
    document.all["dg1__ctl4_txRcvName"].value = document.all.txRcv3.value;

    //1020426	Jagle	[1020325]	有資料時自動選取
    var strObjName = "";
    var strRcvName = "";
    var pDg1Len = document.all.dg1.rows.length + 1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
    for (i = 2; i < pDg1Len; i++)
    {
        strObjName = "dg1__ctl" + i + "_cbSelect";
        strRcvName = "dg1__ctl" + i + "_txRcvName";
        if (document.all[strRcvName].value != "")
            document.all[strObjName].checked = true;
        else
            document.all[strObjName].checked = false;
    }
}

function TakeValToForm()
{
    /*
	if(document.all.txRcv1.value != "")
		document.all["dg1__ctl2_txRcvName"].value = document.all.txRcv1.value;
	if(document.all.txRcv2.value != "")
		document.all["dg1__ctl3_txRcvName"].value = document.all.txRcv2.value;
	if(document.all.txRcv3.value != "")
		document.all["dg1__ctl4_txRcvName"].value = document.all.txRcv3.value;
	*/
    //0950119 Stella修改必須先點選『等..』這個按鈕才能刪除不要的受文者問題
    //1060814 Zen 1060699 修正不展開細目無法儲存資料之問題    //if (document.all["divDG"].className == "hide")
    if (document.all["divDG"].className.indexOf('hide') != -1)
    {
        document.all["dg1__ctl2_txRcvName"].value = document.all.txRcv1.value;
        document.all["dg1__ctl3_txRcvName"].value = document.all.txRcv2.value;
        document.all["dg1__ctl4_txRcvName"].value = document.all.txRcv3.value;
    }
}
