/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 0960125	Stella	David	955245		掛號號碼使用SYSTEM_SET控制是否顯示
 * 1001020	David	Kevin	1000769		新增來文機關、密件收文
 * 1020104	David	David	1011167		收件單位、收件人欄為改為ComboBox
 * 1120627	Zen		Zen		1011167		二代升級至共通版
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1120627 Zen 1011167 二代升級至共通版
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //96.01.25 955245 David
    DgHeaderSet();

    //1020104 David 1011167 收件單位、收件人欄為改為ComboBox
    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_Sect"].value = document.all["dlSect_Text"].value;
    document.all["H_User"].value = document.all["dlUser_Text"].value;
    document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
    document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
    document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

    //無值不顯示
    jf_HandleComboxStatus("dlSect");
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1120627 Zen 1011167 二代升級至共通版
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1120627 Zen 1011167 二代升級至共通版
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1120627 Zen 1011167 二代升級至共通版
//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1120627 Zen 1011167 二代升級至共通版
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !(fnCheckBeforeSubmit() && jf_CheckKeyObject());
            //1120627 Zen 1011167 二代升級至共通版
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            Page_BlockSubmit = !(fnCheckBeforeSubmit() && jf_CheckKeyObject());
            //1120627 Zen 1011167 二代升級至共通版
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !(fnCheckBeforeSubmit() && jf_CheckKeyObject());
            //1120627 Zen 1011167 二代升級至共通版
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function fnCheckBeforeSubmit()
{
    //1001020 Kevin [1000769] 新增檢核
    fnSecNoOnChange();

    if (!CheckCDATE("txRcvdateS", "登錄日期(起)") || !CheckCDATE("txRcvdateE", "登錄日期(訖)"))
        return false;
    return true;
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//組出回傳值
function ReturnValue(argMailNo)
{
    try
    {
        opener.document.all.lbReturnValue.length = 1;
        opener.document.all.lbReturnValue.options[0].value = argMailNo;
        opener.window.CallBack("EDI101_BSMI");
        close();
    }
    catch (e) { }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1020104 David 1011167 收件單位、收件人欄為改為ComboBox，下列處理不需要
/*function fnUserOnChange()
{
    document.all.txUser.value = document.all.dlUser.options[document.all.dlUser.selectedIndex].text;
}*/

//1001020 Kevin [1000769] 新增密件收文
function fnSecNoOnChange()
{
    document.all.H_txSecNo.value = document.all.dlSecNo.options[document.all.dlSecNo.selectedIndex].value;
}

//96.01.25 955245 David
function DgHeaderSet()
{
    if (document.all["dg1"] != null)
    {
        var sysMail = document.all["txSysMail"].value;
        if (sysMail == "Y")
        {
            document.all["dg1__ctl1_dglbMail"].innerText = "郵件號碼";
        }
        else
        {
            document.all["dg1__ctl1_dglbMail"].innerText = "掛號號碼";
        }
    }
}

//1020104 David 1011167 收件單位、收件人欄為改為ComboBox，新增相關函式

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
    if (document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
        //1120627 Zen 1011167 二代升級至共通版
        //document.all[argComboxID + "_Container"].className = "InputFieldText";
        document.all[argComboxID + "_Container"].className = "custom-combobox";
}

function dlDept_Text_onblur()
{
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
    {
        //檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dlDept", "承辦單位"))
        {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

            edjf_SetdlDept("dlDept", "dlSect", "dlUser", "", false, true);	//初始dlSect、dlUser的處理

            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
            document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
            document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

            //依選項多寡固定下拉式選單可見長度
            if (document.all["dlSect"].options.length > 10)
                document.all["dlSect"].size = 10;
            else if (document.all["dlSect"].options.length == 1)
                document.all["dlSect"].size = 2;
            else
                document.all["dlSect"].size = document.all["dlSect"].options.length;

            if (document.all["dlUser"].options.length > 10)
                document.all["dlUser"].size = 10;
            else if (document.all["dlUser"].options.length == 1)
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
    //值若變更時作處理
    if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
    {
        //呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dlSect", "承辦科別"))
        {
            //存ComboBox_Text的value
            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);

            odjf_SetdlSect("dlDept", "dlSect", "dlUser", "", false);	//初始化承辦人選單

            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
            document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

            if (document.all["dlUser"].options.length > 10)
                document.all["dlUser"].size = 10;
            else if (document.all["dlUser"].options.length == 1)
                document.all["dlUser"].size = 2;
            else
                document.all["dlUser"].size = document.all["dlUser"].options.length;
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function dlUser_Text_onblur()
{
    var bCheckOK = true;
    //值若變更時作處理
    if (document.all["dlUser_Text"].value != document.all["H_User"].value)
    {
        //呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dlUser", "承辦人"))
        {
            document.all["H_User"].value = document.all["dlUser_Text"].value;

            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

/**********************************************************************************************
  Name : function odjf_SetdlSect()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
         argSectComboBoxID		: string 二級單位Combobox 物件 ID
         argUserComboBoxID      : string 人員Combobox 物件 ID
         argRoleNo				: string 指定之角色
         argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlSect(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
{
    //取得Combo物件
    var DeptComboBoxObj = document.all[argDeptComboBoxID];
    var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
    var SectComboBoxObj = document.all[argSectComboBoxID];
    var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
    var UserComboBoxObj = document.all[argUserComboBoxID];
    var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

    //如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
    if (DeptComboBoxTextObj.value == "")
    {
        if (SectComboBoxObj != null && SectComboBoxTextObj != null)
        {
            while (SectComboBoxObj.length > 0)
                SectComboBoxObj.remove(0);
            SectComboBoxObj.size = 2;
            SectComboBoxObj.options.add(new Option("", ""));
            SectComboBoxTextObj.value = "";
        }

        if (UserComboBoxObj != null && UserComboBoxTextObj != null)
        {
            while (UserComboBoxObj.length > 0)
                UserComboBoxObj.remove(0);
            UserComboBoxObj.size = 2;
            UserComboBoxObj.options.add(new Option("", ""));
            UserComboBoxTextObj.value = "";
        }
        return;
    }

    if (UserComboBoxObj != null && UserComboBoxTextObj != null)
    {
        var valUser = new Array(3);
        if (SectComboBoxObj.value == "")
            valUser[0] = DeptComboBoxObj.value.split(":")[0];
        else
            valUser[0] = SectComboBoxObj.value.split(":")[2];

        valUser[1] = argRoleNo;
        valUser[2] = argSubTree;

        callObj = jf_CallWS("../ED4/EDR402.asmx", "GetUnitAllUsers", false, valUser);

        resultObj = null;
        if (callObj.error)
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])), "");
        else
        {
            if (jf_IsWebServiceSuccess(callObj))
                resultObj = callObj.value;
        }

        var UserNameMem = UserComboBoxTextObj.value;

        //清空選項
        while (UserComboBoxObj.length > 0)
            UserComboBoxObj.remove(0);

        //重新新增選項
        len = resultObj.UserName.length;
        UserComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
        UserComboBoxObj.options.add(new Option("", ""));
        for (i = 0; i < len; i++)
        {
            //項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
            var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i] + ":" + resultObj.EmpName[i])
            UserComboBoxObj.options.add(objOption);
        }

        //清空顯示的Text，以及重設選擇
        UserComboBoxTextObj.value = "";
        UserComboBoxObj.selectedIndex = -1;
        for (i = 0; i < len; i++)
        {
            if (UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i])
            {
                UserComboBoxTextObj.value = resultObj.EmpName[i];
                UserComboBoxObj.selectedIndex = i;
                break;
            }
        }
    }
}