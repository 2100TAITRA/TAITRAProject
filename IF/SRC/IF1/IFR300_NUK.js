/*
DATE		SA		PGR		MGR_NO		DESC
1100727		Joe		Joe		1100634		新增程式
 */

var IsServerHandling = new Boolean();
IsServerHandling = false;

function ClientButtonControl(e)
{
	var xObjectName = e.target.id;

	if(IsServerHandling)
	   return;

	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	switch (xObjectName)
	{
	}
}

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

	xObjectName = event.target.id;

	switch (xObjectName)
	{
        case "btExcel":
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}


function ClientOnLoad()
{
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_Dept_Value"].value = ifjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = ifjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
    document.all["H_dlSect_Value"].value = ifjf_SaveCurrDL(document.all["dlSect"]);
    jf_HandleComboxStatus("dlSect");
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function CallBack(argCallerId) {
}

function ReturnValue()
{    
}

function dlDept_Text_onblur()
{
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
    {
        //呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
        if (ifjf_ComboBoxCheck("dlDept", "承辦單位"))
        {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Dept_Value"].value = ifjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

            //先顯示二級單位選項 避免隱藏不調整
            document.all["dlSect_Container"].className = "InputFieldText";
            ifjf_SetdlDept("dlDept", "dlSect", "", "", false, true);	//初始dlSect、dlUser的處理

            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            document.all["H_Sect_Value"].value = ifjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
            document.all["H_dlSect_Value"].value = ifjf_SaveCurrDL(document.all["dlSect"]);

            //依選項多寡固定下拉式選單可見長度
            if (document.all["dlSect"].options.length > 10)
                document.all["dlSect"].size = 10;
            else if (document.all["dlSect"].options.length == 1)
                document.all["dlSect"].size = 2;
            else
                document.all["dlSect"].size = document.all["dlSect"].options.length;

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
    //值若變更時作處理
    if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
    {
        //呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
        if (ifjf_ComboBoxCheck("dlSect", "承辦科別"))
        {
            //存ComboBox_Text的value
            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Sect_Value"].value = ifjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);

            ifjf_SetdlSect("dlDept", "dlSect", "", "", false);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID) {
    if (document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
        document.all[argComboxID + "_Container"].className = "custom-combobox";
}