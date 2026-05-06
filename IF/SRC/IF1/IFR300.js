/*
DATE		SA		PGR		MGR_NO		DESC
1100725		Joe		Joe		1100749		新增程式
1100908	    Joe		Joe     1100821		For航港局架構，因上線時間與特休撞期，無法追查原因，故先改為自行呼叫EDWS。
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
		case "btSearch":
		case "btPreview":
		//1100901	Joe		1100821		新增匯出Excel功能
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
			//1100908	Joe		1100821		For航港局架構，先自行呼叫並傳入EDWS網址
            // ifjf_SetdlDept("dlDept", "dlSect", "", "", false, true);	//初始dlSect、dlUser的處理
            jf_SetdlDept("dlDept", "dlSect", "", "", false, true);	//初始dlSect、dlUser的處理

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

//1100908	Joe		1100821		For航港局架構，因上線時間與特休撞期，無法追查原因，故先改為自行呼叫EDWS。
function jf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree, argDeptOnly)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

	//如果一級單位目前所選為空值，則將二級單位及人員設定為無選項且顯示為空值
	if(DeptComboBoxTextObj.value == "")
	{
		if (SectComboBoxObj != null && SectComboBoxTextObj != null)
		{
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);
			SectComboBoxObj.size = 2;
			SectComboBoxObj.options.add(new Option("",""));
			SectComboBoxTextObj.value = "";
		}
		
		if (UserComboBoxObj != null && UserComboBoxTextObj != null)
		{
			while(UserComboBoxObj.length > 0)
				UserComboBoxObj.remove(0);
			UserComboBoxObj.size = 2;
			UserComboBoxObj.options.add(new Option("",""));
			UserComboBoxTextObj.value = "";
		}
		return;
	}
	
	if (SectComboBoxObj != null && SectComboBoxTextObj != null)
	{
		//承辦科別下拉選單不為隱藏才初始
		if(SectComboBoxTextObj.className != "hide")
		{
			var val = DeptComboBoxObj.value.split(":")[0];

			var callObj = jf_CallWS(document.all.H_EDWS.value, "GetSubUnit", false, val);
			
			var resultObj = null;
			if( jf_IsWebServiceSuccess(callObj) )
			{
					resultObj = callObj.value;
			}
			
			var SectNameMem = SectComboBoxTextObj.value;

			//清空選項
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.SectName.length;
			SectComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			SectComboBoxObj.options.add(new Option("",""));
			if(len > 0 && argDeptOnly)//若有二級單位,且要顯示"(僅含一級單位)"的選項
				SectComboBoxObj.options.add(new Option("(僅含一級單位)",""));
				
			for( i=0 ; i<len ; i++ )
			{
				//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
				var objOption = new Option(resultObj.SectName[i], resultObj.SecNo[i]+":"+resultObj.SectName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SectName[i])
				SectComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			SectComboBoxTextObj.value = "";
			SectComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				if( SectNameMem == resultObj.SectName[i] || SectNameMem == resultObj.SecNo[i] )
				{
					SectComboBoxTextObj.value = resultObj.SectName[i];
					SectComboBoxObj.selectedIndex = i;+1
					break;
				}
			}
		}
	}

	if (UserComboBoxObj != null && UserComboBoxTextObj != null)
	{
		//承辦人下拉選單不為隱藏才初始
		if(UserComboBoxTextObj.className != "hide")
		{
			var valUser = new Array(3);
			if(SectComboBoxObj == null)
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
			else if(SectComboBoxObj.selectedIndex == -1)	//如果承辦科別有選擇就以承辦科別為單位代碼參數
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
			else
				valUser[0] = SectComboBoxObj.value.split(":")[2];
			valUser[1] = argRoleNo;
			valUser[2] = argSubTree;

			valUser[0] = encodeURI(valUser[0]);
			valUser[1] = encodeURI(valUser[1]);	
			valUser[2] = encodeURI(valUser[2]);	
			var callObj = jf_CallWS(document.all.H_EDWS.value, "GetUnitAllUsers", false, valUser);
			
			var resultObj = null;
			if( jf_IsWebServiceSuccess(callObj) )
			{
					resultObj = callObj.value;
					//return;
			}
			
			var UserNameMem = UserComboBoxTextObj.value;

			//清空選項
			while(UserComboBoxObj.length > 0)
				UserComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.UserName.length;
			UserComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			UserComboBoxObj.options.add(new Option("",""));
			for( i=0 ; i<len ; i++ )
			{
				//項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
				var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i]+":"+resultObj.SectNo[i]+":"+resultObj.UserName[i]+":"+resultObj.EmpName[i])
				UserComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			UserComboBoxTextObj.value = "";
			UserComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				if( UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i] )
				{
					UserComboBoxTextObj.value = resultObj.EmpName[i];
					//UserComboBoxObj.selectedIndex = i;
					UserComboBoxObj.selectedIndex = i+1;
					break;
				}
			}
		}
	}
}