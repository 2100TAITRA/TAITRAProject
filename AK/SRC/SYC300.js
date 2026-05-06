/*
DATE 	    SA		PRG		MGR_NO		DESC
1070815     Cloud   Zen     1070773     二代公文修改
1100204     Leslie  Zen     1090927     取消使用document.activeElement
1110103     Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1070815 Zen 1070073 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

function ShowMsg()
{
    //1070815 Zen 1070073 二代升級    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1070815 Zen 1070073 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1070815 Zen 1070073 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題    if (IsServerHandling)    {        Page_BlockSubmit = true;        return;    }

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

//1070815 Zen 1070073 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
{
    var xObjectName;
    var evBtn;    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題    if (IsServerHandling)    {        Page_BlockSubmit = true;        return;    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1070815 Zen 1070073 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        //1070815 Zen 1070073 二代升級        //case "btOpen":
        //    Page_BlockSubmit = !jf_CheckKeyObject();
        //    jf_ToolBarSubmit();
        //    break;
        case "btSave":
            if (document.all("tbLOC_NO").disabled == false)
            {
                if (jf_Trim(document.all("tbLOC_NO").value) == "")
                {
                    alert("地點代碼不可為空白");
                    Page_BlockSubmit = true
                }
            }
            if (jf_Trim(document.all("tbLOC_NAME").value) == "")
            {
                alert("地點名稱不可為空白");
                Page_BlockSubmit = true
            }
            else
                Page_BlockSubmit = false;

            if (Page_BlockSubmit == false)
            {
                if (jf_CheckDataExist(document.all["SourceOrgNo"].value))
                {
                    alert("欲新增值已存在於資料庫");
                    Page_BlockSubmit = true;
                }
                else
                    Page_BlockSubmit = false;
            }
            //1070815 Zen 1070073 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            if (jf_Trim(document.all["tbLOC_NO2"].value) == "")
            {
                alert("欲刪除地點代碼不可空白!!");
                //1070815 Zen 1070073 二代升級                //document.all["tbLOC_NO2"].focus();
                $('#tbLOC_NO2').focus();
                Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = false;
            //1070815 Zen 1070073 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1070815 Zen 1070073 二代升級            //case "btCancel":
            //    Page_BlockSubmit = !jf_ConfirmCancel();
            //    jf_ToolBarSubmit();
            //    break;
            //case "btClean":
            //    Page_BlockSubmit = true;
            //    jf_ConfirmClean();
            //    break;


        case "btSearch":
            /*
		    if(jf_Trim(document.all("tbNo").value)=="")
		    {
				jf_ShowMeg("請先輸入條件後再搜尋資料","");
				document.all["tbNo"].focus();
				Page_BlockSubmit = true;
			}
			else
			{
			     Page_BlockSubmit = false;    
    			jf_ShowWaitState();
				IsServerHandling = true;
			}
			*/
            Page_BlockSubmit = false;
            jf_ShowWaitState();
            IsServerHandling = true;
            //1070815 Zen 1070073 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btPreview":
            /*
    		if(jf_Trim(document.all("tbNo").value)=="")
    		{
   				jf_ShowMeg("搜尋條件不可為空白","");
   				document.all("tbNo").focus();
   				Page_BlockSubmit = true;    		
    		}
    		else
    		{
    		    Page_BlockSubmit = false;    
				jf_ShowWaitState();
				IsServerHandling = true;
    		}
    		*/
            Page_BlockSubmit = false;
            jf_ShowWaitState();
            IsServerHandling = true;
            //1070815 Zen 1070073 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    ShowMsg();
}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1070815 Zen 1070073 二代升級    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}
//1100204 Zen 1090927 取消使用document.activeElement//function RetSelected()
function RetSelected(argValue)
{
    var pLOC_NO, pLOC_NAME, pCount;
    pCount = parseInt(document.all("lbTemp").options[0].value) + 1;
    //1070815 Zen 1070073 二代升級    //pLOC_NO = document.activeElement.innerText;
    //1100204 Zen 1090927 取消使用document.activeElement    //pLOC_NO = document.activeElement.textContent;
    pLOC_NO = argValue;
    for (var i = 1; i < pCount; i++)
    {
        if (pLOC_NO == document.all("lbTemp").options[i].value)
            //1070815 Zen 1070073 二代升級            //pLOC_NAME = document.all("lbTemp").options[i].innerText;
            pLOC_NAME = document.all("lbTemp").options[i].textContent;
    }
    opener.document.all(document.all("_rtnObj").value).length = 4;

    //1070815 Zen 1070073 二代升級    //opener.document.all(document.all("_rtnObj").value).options[0].value = document.activeElement.innerText;
    //1100204 Zen 1090927 取消使用document.activeElement    //opener.document.all(document.all("_rtnObj").value).options[0].value = document.activeElement.textContent;
    opener.document.all(document.all("_rtnObj").value).options[0].value = argValue;
    opener.document.all(document.all("_rtnObj").value).options[0].text = "LOC_NO";
    opener.document.all(document.all("_rtnObj").value).options[1].value = pLOC_NAME;
    opener.document.all(document.all("_rtnObj").value).options[1].text = "LOC_NAME";
    opener.window.CallBack("SYC300");

    close();
}
