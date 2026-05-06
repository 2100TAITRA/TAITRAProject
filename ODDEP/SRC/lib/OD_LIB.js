/*
DATE	SA		PRG		MSG_NO		DESC	
0950919	Stella	Charles	955079		二層式登記桌架構修改
0970320	Stella	Yvonne	0970295		一層式登記桌承辦科別為隱藏，亦須設定為無選項且顯示為空值
0980814 Stella  Jane    0980391     二層式登記桌架構,將odjf_SetdlSectByUnitCode()及odjf_SetdlDept()改為多載方式
                                    多傳入一參數判斷承辦科別下拉選單是否顯示"(僅含一級單位)"的選項
0980824	Stella	David	0980391		二層式登記桌架構,將odjf_SetdlSect()新增一多載方式
									多傳入一參數判斷承辦人選單是否適用新帶出規則
1020207	Kevin	Kevin	1020028		移除電子磅秤相關處裡
1020329	David	Kevin 	1011032		修正ODT130傳送後承辦單位為空白問題
1040310	Cloud	Gabby	1040109		新增DropDownList用共用函式
1040602	Cloud	Gabby	-------		修正共用函式名稱相同問題
1070720 David   Zen     1070661 	修正onblur檢核後不斷alert之問題
1111102	Kevin	Joe		--			新增支援ODR240~242不顯示登記桌
*/
function AddDirSlash(argDir)
{
	if(argDir == "" || argDir == undefined) return "";
	if(argDir.substring(argDir.length-1, argDir.length) !='\\')
		return argDir + "\\";
	else	
		return argDir;
}


//
 /**********************************************************************************************
 Name : function LoadXmlToDL(argXmlSrc, argDLObjName, argAddEmpty, argTextFld, argValueFld)
 Desc : 從XML檔案裡面讀取資料，塞到DropDownList
 Param: argXmlSrc : XML來源檔全徑名 (必要)
        argDLObjName : 待塞入資料的DropDownList (必要)
        argAddEmpty  : 第1筆空白 (非必要,預設false)
        argTextFld   : XML檔中塞入DropDownList text 的 TAG名稱(非必要，預設 text)
        argValueFld  : XML檔中塞入DropDownList value 的 TAG名稱(非必要，預設 value)
 Rtn  : true/false
 **********************************************************************************************/ 
function LoadXmlToDL(argXmlSrc, argDLObjName, argAddEmpty, argTextFld, argValueFld)
{
	//Valid check ******* START
	if(argXmlSrc == undefined || argXmlSrc == "") return false;
	var fsoxml = new ActiveXObject("Scripting.FileSystemObject");
	if(!fsoxml.FileExists(argXmlSrc)) 
	{
		fsoxml = null;
		return false;
	}
	if(argDLObjName == undefined || argDLObjName == "") return false;
	//Valid check ******* END

	var xdoc = new ActiveXObject("MSXML2.DOMDocument");
	xdoc.load(argXmlSrc);
	var nodelist;
	var node;
	var strTextFld, strValueFld;
	var nDLIdx=0;

	if(argAddEmpty == undefined) 
		argAddEmpty = false;
	if(argTextFld == undefined || argTextFld =="") 
		argTextFld = "text";
	if(argValueFld == undefined || argValueFld =="") 
		argValueFld = "value";
	
	nodelist = xdoc.selectNodes("//"+argTextFld);
	if(argAddEmpty)
	{
		document.all[argDLObjName].length = nodelist.length+1;
		document.all[argDLObjName].options[nDLIdx].value = "";
		document.all[argDLObjName].options[nDLIdx].text = "";
		nDLIdx++;
	}
	else	
		document.all[argDLObjName].length = nodelist.length;
	for(var i=0;i<nodelist.length;i++)
	{
		node = nodelist.item(i);
		document.all[argDLObjName].options[nDLIdx].text = node.text;
		nDLIdx++;
	}
	
	if(argAddEmpty)
		nDLIdx=1;
	else
		nDLIdx=0;
	nodelist = xdoc.selectNodes("//"+argValueFld);
	for(var i=0;i<nodelist.length;i++)
	{
		node = nodelist.item(i);
		document.all[argDLObjName].options[nDLIdx].value = node.text;
		nDLIdx++;
	}
	
	xdoc=null;
	fsoxml = null;
	return true;
}

//取得今日日期：0920101
function GetDate()
{
	var today=new Date();
	var pYear=parseInt(today.getYear())-1911;
	var strYear = jf_PADL(""+pYear,3,'0');
	var pMonth = today.getMonth() +1;
	var strMonth = jf_PADL("" + pMonth, 2, '0');
	var pDate = today.getDate();
	var strDate = jf_PADL("" + pDate, 2, '0');
	return strYear + strMonth + strDate;
	
}

//產生Client端目錄，可多層，如 C:\temp\od
function CreateClientFolder( argPath )
{
	if(argPath == "") return;
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var strClientPath = "";
	var strDirToCreate = "";
	var strDirTemp = argPath.split('\\');

	/*
	if(!fso.FolderExists(argPath))
	{
		fso.CreateFolder(argPath);
	}
	*/
	
	for(var j=0;j<strDirTemp.length;j++)
	{
		if(strDirTemp[j] != "")
		{
			strDirToCreate = "";
			for(var k=0;k<=j;k++)
			{
				strDirToCreate += strDirTemp[k] + "\\";
			}
			strClientPath = strDirToCreate;
			if(!fso.FolderExists(strClientPath))
			{
				fso.CreateFolder(strClientPath);
			}
		}
	}

}

function formatDate2(sDate, type)
{	//轉換日期的格式
	//11/02/2003 --> 中華民國九十二年二月十一日
	//checkDate
	if(sDate=="")	return "";
	var arrayDate = sDate.split("/");
	iDay = parseInt(arrayDate[0]);
	iMon = parseInt(arrayDate[1]);
	iYea = parseInt(arrayDate[2]) - 1911;
	return "中華民國" + TranferNumType(iYea,true) + "年" + TranferNumType(iMon,false) + "月" + TranferNumType(iDay,false) + "日";
}


function TranferNumType(num, keepMode)
{
	//轉換阿拉伯數字為國字
	//
	var snum = String(num);
	var len = snum.length;
	var arrayOfNum = Array("","一","二","三","四","五","六","七","八","九");
	var arrayOfLevel = Array("十","百","千");
	var s = "";
	var d = len;
	var onenum;
	for(i=0 ; i<len ; i++)
	{
		onenum = arrayOfNum[parseInt(snum.charAt(i))];
		s += onenum;
		if(--d!=0)
		{
			if(keepMode==false && arrayOfLevel[d-1] == "十" && snum.charAt(i) == "1")
				s = s.substr(0,s.length-1);
			if(onenum)
				s += arrayOfLevel[d-1];
		}
	}
	return s;
}

//與網址參數的處理有關函式*************start
function GetParamArray()
{
	var arrayOfParamLen = 0;
	var arrayOfParam = new Array(0);
	
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i,j,k;
		i = pUrl.indexOf("?");
		var paramStr = pUrl.substr(i+1); 
		var arr = paramStr.split("&");
		for(j=0 ; j<arr.length ; j++)
		{
			
			k = arr[j].indexOf("=");
			if( k != -1 )
			{
				arrayOfParam[arrayOfParamLen] = new Array(2);
				arrayOfParam[arrayOfParamLen][0] = arr[j].substr(0,k);
				arrayOfParam[arrayOfParamLen][1] = arr[j].substr(k+1);
				arrayOfParamLen++;
			}
		}
	}
	return arrayOfParam;
}

//取得參數值
function GetParam(p)
{
	var arr = this.GetParamArray();
	if( p == "" )	return "";
	for(var i=0 ; i<arr.length ; i++)
		if( arr[i][0] == p )
			return arr[i][1];
	return "";		
}

//與網址參數的處理有關函式************* end

function SetToolBarBtnDisable(argBtnName, argEnable)
{
	for(var i=0;i<10;i++)
	{
		var oBtn = document.all.tbTool.getItem(i);
		if(oBtn == null) return;

		if(oBtn.getAttribute("id") == argBtnName)
		{
			oBtn.setAttribute("disabled",argEnable);
			return;
		}
	}
}
/**********************************************************************************************
  Name : function odjf_CheckComboBox()
  Desc : 離開部門欄位的合理性檢查
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
  Rtn  : none
 **********************************************************************************************/
function odjf_CheckComboBox(argDeptComboBoxID)
{
	var bRtnBool = false;
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	
	if (DeptComboBoxTextObj == null || DeptComboBoxObj == null)
		return;
	if (DeptComboBoxTextObj.value != "")
	{
		for( i=0 ; i<DeptComboBoxObj.options.length ; i++ )
		{
			if (DeptComboBoxTextObj.value == DeptComboBoxObj.options[i].text)
			{
				bRtnBool = true;
				break;
			}
		}
		if (!bRtnBool)
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入資料不存在"])),"");
			DeptComboBoxTextObj.focus();
		}
	}
	return bRtnBool;
}

 /**********************************************************************************************
 Name : function odjf_Post_GreaterThenZeroOnly(colName)
 Desc : 判斷欄位值是否大於或等於零，否的話顯示警示訊息並要求修改。
 Param: colName  :所要顯示的欄位值名稱
 Rtn  : none
 **********************************************************************************************/ 
 function odjf_Post_GreaterThenZeroOnly(colName)
{
	if (event.srcElement.value)
	{
		var str = event.srcElement.value;
		if (str == "")
			return;
		var num = parseFloat(str);
		if ( num != str )
		{
			alert(colName + "必須為數字。");
			event.srcElement.focus();
		}
		if ( num < 0 )
		{
			alert(colName + "必須大於零。");
			event.srcElement.focus();
		}
	}
	else
		return;
}

function fnGetData()
{
	var data=document.all.m_Comm.GetData();
	if(data!="")
	{
		while(true)
		{
			if(data.substring(0,1)=="0")
				data = data.substring(1);
			else
				break;
		}
		var val = parseInt(data);
		val = val/10;
		fnSetPostCost(val.toString());
	}
}

function odjf_InitPostMachine() 
{
	//1020207 Kevin 1020028 移除電子磅秤相關處裡
	//document.all.m_Comm.Init();
	//setInterval(fnGetData,100);
}

/**********************************************************************************************
  Name : function odjf_ComboBoxCheck()
  Desc : 離開ComboBox欄位的合理性檢查與人員欄位的連動處理		Charles 0950921
  Parm : argComboBoxID      : string 部門Combobox 物件 ID
		 argKeyMsg			: string 錯誤時顯示的ComboBox名稱
  Rtn  : none
 **********************************************************************************************/
function odjf_ComboBoxCheck(argComboBoxID, argKeyMsg)
{
	var bRtnBool = false;
	var ComboBoxObj     = document.all[argComboBoxID];
	var ComboBoxTextObj = document.all[argComboBoxID + "_Text"];
	
	var i, j;
	if (ComboBoxObj == null || ComboBoxTextObj == null)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["["+argComboBoxID+"]下拉選單不存在"])),"");
		return bRtnBool;
	}

	for( i=0 ; i<ComboBoxObj.options.length ; i++ )
	{
		if (ComboBoxTextObj.value == ComboBoxObj.options[i].text)
		{
			bRtnBool = true;
			break;
		}
	}
	
	if (!bRtnBool)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入的"+argKeyMsg+"不在選單當中"])),"");
		//1070720 Zen 1070661 修正onblur檢核後不斷alert之問題
		//ComboBoxTextObj.focus();
		//ComboBoxTextObj.select();
	}
	return bRtnBool;
}

/**********************************************************************************************
  Name : function odjf_SetdlDept()
  Desc : 承辦單位下拉式選單變動時，連動變動承辦科別及承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
	if(DeptComboBoxTextObj.value == "")
	{
		//Yvonne 0970295 0970320承辦科別為隱藏時，亦須設定為無選項且顯示為空值
		if (SectComboBoxObj != null && SectComboBoxTextObj != null && SectComboBoxTextObj.className != "hide")
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

			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetSubUnit", false, val);
			
			var resultObj = null;
			if( callObj.error )
				alert(callObj.errorDetail.string);
			else
			{
				if( jf_IsWebServiceSuccess(callObj) )
					resultObj = callObj.value;
			}
			
			var SectNameMem = SectComboBoxTextObj.value;

			//清空選項
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.SecName.length;
			SectComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			SectComboBoxObj.options.add(new Option("",""));
			for( i=0 ; i<len ; i++ )
			{
				//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
				var objOption = new Option(resultObj.SecName[i], resultObj.DeptNo[i]+":"+resultObj.DeptName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SecName[i])
				SectComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			SectComboBoxTextObj.value = "";
			SectComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				if( SectNameMem == resultObj.SecName[i] || SectNameMem == resultObj.SecNo[i] )
				{
					SectComboBoxTextObj.value = resultObj.SecName[i];
					SectComboBoxObj.selectedIndex = i;
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

			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
			
			resultObj = null;
			if( callObj.error )
				alert(callObj.errorDetail.string);
			else
			{
				if( jf_IsWebServiceSuccess(callObj) )
					resultObj = callObj.value;
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
					UserComboBoxObj.selectedIndex = i;
					break;
				}
			}
		}
	}
}
//0980814 odjf_SetdlDept()多傳入一參數argDeptOnly，用來判斷承辦科別下拉選單是否顯示"(僅含一級單位)"的選項[0980391]-Jane
/**********************************************************************************************
  Name : function odjf_SetdlDept()
  Desc : 承辦單位下拉式選單變動時，連動變動承辦科別及承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
		 argDeptOnly            : bool   承辦科別下拉選單是否顯示"(僅含一級單位)"的選項
		                          (true:顯示;false:不顯示)
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree, argDeptOnly)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
	if(DeptComboBoxTextObj.value == "")
	{
		//Yvonne 0970295 0970320承辦科別為隱藏時，亦須設定為無選項且顯示為空值
		if (SectComboBoxObj != null && SectComboBoxTextObj != null && SectComboBoxTextObj.className != "hide")
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

			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetSubUnit", false, val);
			
			var resultObj = null;
			//1020329 Kevin 1011032 改由jf_IsWebServiceSuccess處理
			//if( callObj.error )
			//	alert(callObj.errorDetail.string);
			//else
			{
				if( jf_IsWebServiceSuccess(callObj) )
					resultObj = callObj.value;
				//1020329 Kevin 1011032 新增return
				else
					return;
			}
			
			var SectNameMem = SectComboBoxTextObj.value;

			//清空選項
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.SecName.length;
			SectComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			
			//0980814 檢核是否加入"(僅含一級單位)"的選項[0980391]-Jane
			if(len > 0 && argDeptOnly)//若有二級單位,且要顯示"(僅含一級單位)"的選項
			{
				SectComboBoxObj.options.add(new Option("",""));//David 第一筆空白
				SectComboBoxObj.options.add(new Option("(僅含一級單位)",""));
			}
			else
				SectComboBoxObj.options.add(new Option("",""));

			for( i=0 ; i<len ; i++ )
			{
				//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
				var objOption = new Option(resultObj.SecName[i], resultObj.DeptNo[i]+":"+resultObj.DeptName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SecName[i])
				SectComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			SectComboBoxTextObj.value = "";
			SectComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				if( SectNameMem == resultObj.SecName[i] || SectNameMem == resultObj.SecNo[i] )
				{
					SectComboBoxTextObj.value = resultObj.SecName[i];
					SectComboBoxObj.selectedIndex = i;
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
			//0980824	David	0980391	修改承辦人初始規則，說明請看odjf_SetdlSect()函式
			else if(SectComboBoxObj != null && SectComboBoxTextObj.value == "" && SectComboBoxObj.value =="")
			{
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
				valUser[2] = true;
			}
			else if(SectComboBoxObj != null && SectComboBoxTextObj.value != "" && SectComboBoxObj.value =="")
			{
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
				valUser[2] = argSubTree;
			}
			else
			{
				valUser[0] = SectComboBoxObj.value.split(":")[2];
				valUser[2] = argSubTree;
			}
			valUser[1] = argRoleNo;
			//valUser[2] = argSubTree;

			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
			
			resultObj = null;
			//1020329 Kevin 1011032 改由jf_IsWebServiceSuccess處理
			//if( callObj.error )
			//	alert(callObj.errorDetail.string);
			//else
			{
				if( jf_IsWebServiceSuccess(callObj) )
					resultObj = callObj.value;
				//1020329 Kevin 1011032 新增return
				else
					return;
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
					UserComboBoxObj.selectedIndex = i;
					break;
				}
			}
		}
	}
}
//1111102	Joe		--		新增支援ODR240~242不顯示登記桌--S
/**********************************************************************************************
  Name : function odjf_SetdlDept()
  Desc : 承辦單位下拉式選單變動時，連動變動承辦科別及承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
		 argDeptOnly            : bool   承辦科別下拉選單是否顯示"(僅含一級單位)"的選項
		                          (true:顯示;false:不顯示)
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlDeptWithoutOD17(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree, argDeptOnly)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
	if(DeptComboBoxTextObj.value == "")
	{
		//Yvonne 0970295 0970320承辦科別為隱藏時，亦須設定為無選項且顯示為空值
		if (SectComboBoxObj != null && SectComboBoxTextObj != null && SectComboBoxTextObj.className != "hide")
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

			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetSubUnit", false, val);
			
			var resultObj = null;
			//1020329 Kevin 1011032 改由jf_IsWebServiceSuccess處理
			//if( callObj.error )
			//	alert(callObj.errorDetail.string);
			//else
			{
				if( jf_IsWebServiceSuccess(callObj) )
					resultObj = callObj.value;
				//1020329 Kevin 1011032 新增return
				else
					return;
			}
			
			var SectNameMem = SectComboBoxTextObj.value;

			//清空選項
			while(SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.SecName.length;
			SectComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			
			//0980814 檢核是否加入"(僅含一級單位)"的選項[0980391]-Jane
			if(len > 0 && argDeptOnly)//若有二級單位,且要顯示"(僅含一級單位)"的選項
			{
				SectComboBoxObj.options.add(new Option("",""));//David 第一筆空白
				SectComboBoxObj.options.add(new Option("(僅含一級單位)",""));
			}
			else
				SectComboBoxObj.options.add(new Option("",""));

			for( i=0 ; i<len ; i++ )
			{
				//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
				var objOption = new Option(resultObj.SecName[i], resultObj.DeptNo[i]+":"+resultObj.DeptName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SecName[i])
				SectComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			SectComboBoxTextObj.value = "";
			SectComboBoxObj.selectedIndex = -1;
			for( i=0 ; i<len ; i++ )
			{
				if( SectNameMem == resultObj.SecName[i] || SectNameMem == resultObj.SecNo[i] )
				{
					SectComboBoxTextObj.value = resultObj.SecName[i];
					SectComboBoxObj.selectedIndex = i;
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
			//0980824	David	0980391	修改承辦人初始規則，說明請看odjf_SetdlSect()函式
			else if(SectComboBoxObj != null && SectComboBoxTextObj.value == "" && SectComboBoxObj.value =="")
			{
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
				valUser[2] = true;
			}
			else if(SectComboBoxObj != null && SectComboBoxTextObj.value != "" && SectComboBoxObj.value =="")
			{
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
				valUser[2] = argSubTree;
			}
			else
			{
				valUser[0] = SectComboBoxObj.value.split(":")[2];
				valUser[2] = argSubTree;
			}
			valUser[1] = argRoleNo;
			//valUser[2] = argSubTree;

			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsersWithoutOD17", false, valUser);
			
			resultObj = null;
			//1020329 Kevin 1011032 改由jf_IsWebServiceSuccess處理
			//if( callObj.error )
			//	alert(callObj.errorDetail.string);
			//else
			{
				if( jf_IsWebServiceSuccess(callObj) )
					resultObj = callObj.value;
				//1020329 Kevin 1011032 新增return
				else
					return;
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
					UserComboBoxObj.selectedIndex = i;
					break;
				}
			}
		}
	}
}
//1111102	Joe		--		新增支援ODR240~242不顯示登記桌--E
/**********************************************************************************************
  Name : function odjf_SetdlSect()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單	Charles 0950921
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
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	
	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
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
	
	if (UserComboBoxObj != null && UserComboBoxTextObj != null)
	{
		var valUser = new Array(3);
		if(SectComboBoxObj.value == "")
			valUser[0] = DeptComboBoxObj.value.split(":")[0];
		else
			valUser[0] = SectComboBoxObj.value.split(":")[2];
		
		valUser[1] = argRoleNo;
		valUser[2] = argSubTree;

		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
		
		resultObj = null;
		if( callObj.error )
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])),"");
		else
		{
			if( jf_IsWebServiceSuccess(callObj) )
				resultObj = callObj.value;
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
				UserComboBoxObj.selectedIndex = i;
				break;
			}
		}
	}
}

/**********************************************************************************************
  0980824	David	0980391	二層式登記桌架構,將odjf_SetdlSect()新增一多載方式
																多傳入一參數判斷承辦人選單是否適用新規則
 原規則：
 1.一級單位有值，二級單位為空：帶出該單位所有承辦人(包含一二級)
 2.一級單位有值，二級單位為其他二級單位：帶出該二級單位所有承辦人
 新規則：
 1.一級單位有值，二級單位為空：帶出該單位所有承辦人(包含一二級)
 2.一級單位有值，二級單位為(僅含一級單位)：帶出該單位承辦人(不包含二級)
 3.一級單位有值，二級單位為其他二級單位：帶出該二級單位所有承辦人
 
  Name : function odjf_SetdlSect()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
		 argNewRow			: string 是否適用因連動規則
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlSect(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree,argNewRow)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	
	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
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
	
	if (UserComboBoxObj != null && UserComboBoxTextObj != null)
	{
		var valUser = new Array(3);
		//0980824	David	0980391	依新帶出規則判斷
		if(!argNewRow)
		{
			if(SectComboBoxObj.value == "")
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
			else
				valUser[0] = SectComboBoxObj.value.split(":")[2];
			valUser[2] = argSubTree;
		}
		else
		{
			if(SectComboBoxTextObj.value == "" && SectComboBoxObj.value == "")//二級單位下拉選單為空
			{
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
				valUser[2] = true;
			}
			else if(SectComboBoxTextObj.value != "" && SectComboBoxObj.value == "")//二級單位為僅含一級單位
			{
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
				valUser[2] = argSubTree;
			}
			else//其他二級單位
			{
				valUser[0] = SectComboBoxObj.value.split(":")[2];
				valUser[2] = argSubTree;
			}
		}
		valUser[1] = argRoleNo;

		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
		
		resultObj = null;
		if( callObj.error )
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])),"");
		else
		{
			if( jf_IsWebServiceSuccess(callObj) )
				resultObj = callObj.value;
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
				UserComboBoxObj.selectedIndex = i;
				break;
			}
		}
	}
}

//1111102	Joe		--		新增支援ODR240~242不顯示登記桌--S
/**********************************************************************************************
  0980824	David	0980391	二層式登記桌架構,將odjf_SetdlSect()新增一多載方式
																多傳入一參數判斷承辦人選單是否適用新規則
 原規則：
 1.一級單位有值，二級單位為空：帶出該單位所有承辦人(包含一二級)
 2.一級單位有值，二級單位為其他二級單位：帶出該二級單位所有承辦人
 新規則：
 1.一級單位有值，二級單位為空：帶出該單位所有承辦人(包含一二級)
 2.一級單位有值，二級單位為(僅含一級單位)：帶出該單位承辦人(不包含二級)
 3.一級單位有值，二級單位為其他二級單位：帶出該二級單位所有承辦人
 
  Name : function odjf_SetdlSect()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
		 argNewRow			: string 是否適用因連動規則
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlSectWithoutOD17(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree,argNewRow)
{
	//取得Combo物件
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	
	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
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
	
	if (UserComboBoxObj != null && UserComboBoxTextObj != null)
	{
		var valUser = new Array(3);
		//0980824	David	0980391	依新帶出規則判斷
		if(!argNewRow)
		{
			if(SectComboBoxObj.value == "")
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
			else
				valUser[0] = SectComboBoxObj.value.split(":")[2];
			valUser[2] = argSubTree;
		}
		else
		{
			if(SectComboBoxTextObj.value == "" && SectComboBoxObj.value == "")//二級單位下拉選單為空
			{
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
				valUser[2] = true;
			}
			else if(SectComboBoxTextObj.value != "" && SectComboBoxObj.value == "")//二級單位為僅含一級單位
			{
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
				valUser[2] = argSubTree;
			}
			else//其他二級單位
			{
				valUser[0] = SectComboBoxObj.value.split(":")[2];
				valUser[2] = argSubTree;
			}
		}
		valUser[1] = argRoleNo;

		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsersWithoutOD17", false, valUser);
		
		resultObj = null;
		if( callObj.error )
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])),"");
		else
		{
			if( jf_IsWebServiceSuccess(callObj) )
				resultObj = callObj.value;
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
				UserComboBoxObj.selectedIndex = i;
				break;
			}
		}
	}
}
//1111102	Joe		--		新增支援ODR240~242不顯示登記桌--E
//1040310 Gabby[1040109]新增DropDownList用共用函式
/**********************************************************************************************
  二層式登記桌架構,將odjf_SetdlSect()新增一多載方式，多傳入一參數判斷承辦人選單是否適用新規則
 原規則：
 1.一級單位有值，二級單位為空：帶出該單位所有承辦人(包含一二級)
 2.一級單位有值，二級單位為其他二級單位：帶出該二級單位所有承辦人
 新規則：
 1.一級單位有值，二級單位為空：帶出該單位所有承辦人(包含一二級)
 2.一級單位有值，二級單位為(僅含一級單位)：帶出該單位承辦人(不包含二級)
 3.一級單位有值，二級單位為其他二級單位：帶出該二級單位所有承辦人
 
  Name : function odjf_SetdlSectDropDownList()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單	Charles 0950921
  Parm : argDeptDropDownListID      : string 部門Combobox 物件 ID
		 argSectDropDownListID		: string 二級單位Combobox 物件 ID
		 argUserDropDownListID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
		 argNewRow			: string 是否適用因連動規則
  Rtn  : none
 **********************************************************************************************/
 //1040602 Gabby修正共用函式名稱相同問題
//function odjf_SetdlSect(argDeptDropDownListID, argSectDropDownListID, argUserDropDownListID, argRoleNo, argSubTree,argNewRow)
function odjf_SetdlSectDropDownList(argDeptDropDownListID, argSectDropDownListID, argUserDropDownListID, argRoleNo, argSubTree,argNewRow)
{
	//取得Combo物件
	var DeptDropDownListObj     = document.all[argDeptDropDownListID];
	var SectDropDownListObj     = document.all[argSectDropDownListID];
	var UserDropDownListObj     = document.all[argUserDropDownListID];
	
	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
	if(DeptDropDownListObj.selectedIndex==-1)
	{
		if (SectDropDownListObj != null)
		{
			while(SectDropDownListObj.length > 0)
				SectDropDownListObj.remove(0);
			SectDropDownListObj.options.add(new Option("",""));
		}
		if (UserDropDownListObj != null)
		{
			while(UserDropDownListObj.length > 0)
				UserDropDownListObj.remove(0);
			UserDropDownListObj.options.add(new Option("",""));
		}
		return;
	}
	
	if (UserDropDownListObj != null)
	{
		var valUser = new Array(3);
		//依新帶出規則判斷
		var DeptselectItem=DeptDropDownListObj.options[DeptDropDownListObj.selectedIndex];
		if(!argNewRow)
		{
			//1040602 Gabby修正沒有指定參數的問題
			//if(selectItem.value == "")
			if(DeptselectItem.value == "")
				valUser[0] = DeptselectItem.value.split(":")[0];
			else
				//1040602 Gabby修正沒有指定參數的問題
				//valUser[0] = DeptselectItem.value.split(":")[2];
				valUser[0] = "";
			valUser[2] = argSubTree;
		}
		else
		{
			var SectselectItem="";
			if(SectDropDownListObj.selectedIndex!=-1 && SectDropDownListObj.selectedIndex!=0)
				SectselectItem=SectDropDownListObj.options[SectDropDownListObj.selectedIndex];
			if(SectDropDownListObj.selectedIndex==-1 || SectDropDownListObj.selectedIndex==0)//二級單位下拉選單為空
			{
				valUser[0] = DeptselectItem.value.split(":")[0];
				valUser[2] = true;
			}
			else if(SectselectItem.text != "" && SectselectItem.value == "")//二級單位為僅含一級單位
			{
				valUser[0] = DeptselectItem.value.split(":")[0];
				valUser[2] = argSubTree;
			}
			else//其他二級單位
			{
				valUser[0] = SectselectItem.value.split(":")[2];
				valUser[2] = argSubTree;
			}
		}
		valUser[1] = argRoleNo;

		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
		
		resultObj = null;
		if( callObj.error )
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])),"");
		else
		{
			if( jf_IsWebServiceSuccess(callObj) )
				resultObj = callObj.value;
		}

		//清空選項
		while(UserDropDownListObj.length > 0)
			UserDropDownListObj.remove(0);

		//重新新增選項
		len = resultObj.UserName.length;
		UserDropDownListObj.options.add(new Option("",""));
		for( i=0 ; i<len ; i++ )
		{
			//項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
			var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i]+":"+resultObj.SectNo[i]+":"+resultObj.UserName[i]+":"+resultObj.EmpName[i])
			UserDropDownListObj.options.add(objOption);
		}

		//清空顯示的Text，以及重設選擇
		UserDropDownListObj.selectedIndex = -1;

	}
}
/**********************************************************************************************
  Name : function odjf_SetdlSectByUnitCode()
  Desc : 根據單位代碼初始承辦科別下拉選單	Charles 0951020
  Parm : argDeptNo		        : string 一級單位代碼
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlSectByUnitCode(argDeptNo, argSectComboBoxID)
{
	//取得Combo物件
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	
	if (SectComboBoxObj == null || SectComboBoxTextObj == null)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["["+argUserComboBoxID+"]下拉選單不存在"])),"");
	}
	else
	{
			//單位代碼為空值，則將承辦科別設定為無選項且顯示為空值
		if(argDeptNo == "" || argDeptNo == null || argDeptNo == "undefined")
		{
			if (SectComboBoxObj != null && SectComboBoxTextObj != null)
			{
				while(SectComboBoxObj.length > 0)
					SectComboBoxObj.remove(0);
				SectComboBoxObj.size = 2;
				SectComboBoxObj.options.add(new Option("",""));
				SectComboBoxTextObj.value = "";
			}
			return;
		}
	
		var val = argDeptNo;
		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetSubUnit", false, val);
		
		var resultObj = null;
		if( callObj.error )
			alert(callObj.errorDetail.string);
		else
		{
			if( jf_IsWebServiceSuccess(callObj) )
				resultObj = callObj.value;
		}
		
		var SectNameMem = SectComboBoxTextObj.value;

		//清空選項
		while(SectComboBoxObj.length > 0)
			SectComboBoxObj.remove(0);

		//重新新增選項
		len = resultObj.SecName.length;
		SectComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
		SectComboBoxObj.options.add(new Option("",""));
		for( i=0 ; i<len ; i++ )
		{
			//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
			var objOption = new Option(resultObj.SecName[i], resultObj.DeptNo[i]+":"+resultObj.DeptName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SecName[i])
			SectComboBoxObj.options.add(objOption);
		}

		//清空顯示的Text，以及重設選擇
		SectComboBoxTextObj.value = "";
		SectComboBoxObj.selectedIndex = -1;
		for( i=0 ; i<len ; i++ )
		{
			if( SectNameMem == resultObj.SecName[i] || SectNameMem == resultObj.SecNo[i] )
			{
				SectComboBoxTextObj.value = resultObj.SecName[i];
				SectComboBoxObj.selectedIndex = i;
				break;
			}
		}
	}
}

//0980814 odjf_SetdlSectByUnitCode()多傳入一參數argDeptOnly，用來判斷承辦科別下拉選單是否顯示"(僅含一級單位)"的選項[0980391]-Jane
/**********************************************************************************************
  Name : function odjf_SetdlSectByUnitCode()
  Desc : 根據單位代碼初始承辦科別下拉選單	Charles 0951020
  Parm : argDeptNo		        : string 一級單位代碼
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argDeptOnly            : bool   承辦科別下拉選單是否顯示"(僅含一級單位)"的選項
		                          (true:顯示;false:不顯示)
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlSectByUnitCode(argDeptNo, argSectComboBoxID, argDeptOnly)
{
	//取得Combo物件
	var SectComboBoxObj     = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	
	if (SectComboBoxObj == null || SectComboBoxTextObj == null)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["["+argUserComboBoxID+"]下拉選單不存在"])),"");
	}
	else
	{
			//單位代碼為空值，則將承辦科別設定為無選項且顯示為空值
		if(argDeptNo == "" || argDeptNo == null || argDeptNo == "undefined")
		{
			if (SectComboBoxObj != null && SectComboBoxTextObj != null)
			{
				while(SectComboBoxObj.length > 0)
					SectComboBoxObj.remove(0);
				SectComboBoxObj.size = 2;
				SectComboBoxObj.options.add(new Option("",""));
				SectComboBoxTextObj.value = "";
			}
			return;
		}
	
		var val = argDeptNo;
		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetSubUnit", false, val);
		
		var resultObj = null;
		if( callObj.error )
			alert(callObj.errorDetail.string);
		else
		{
			if( jf_IsWebServiceSuccess(callObj) )
				resultObj = callObj.value;
		}
		
		var SectNameMem = SectComboBoxTextObj.value;

		//清空選項
		while(SectComboBoxObj.length > 0)
			SectComboBoxObj.remove(0);

		//重新新增選項
		len = resultObj.SecName.length;
		SectComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
		
		//0980814 檢核是否加入"(僅含一級單位)"的選項[0980391]-Jane
		if(len > 0 && argDeptOnly)//若有二級單位,且要顯示"(僅含一級單位)"的選項
			SectComboBoxObj.options.add(new Option("(僅含一級單位)",""));
		else
			SectComboBoxObj.options.add(new Option("",""));
		
		for( i=0 ; i<len ; i++ )
		{
			//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
			var objOption = new Option(resultObj.SecName[i], resultObj.DeptNo[i]+":"+resultObj.DeptName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SecName[i])
			SectComboBoxObj.options.add(objOption);
		}

		//清空顯示的Text，以及重設選擇
		SectComboBoxTextObj.value = "";
		SectComboBoxObj.selectedIndex = -1;
		for( i=0 ; i<len ; i++ )
		{
			if( SectNameMem == resultObj.SecName[i] || SectNameMem == resultObj.SecNo[i] )
			{
				SectComboBoxTextObj.value = resultObj.SecName[i];
				SectComboBoxObj.selectedIndex = i;
				break;
			}
		}
	}
}
//1040310 Gabby[1040109]新增DropDownList用共用函式
/**********************************************************************************************
  Name : function odjf_SetdlSectByUnitCodeDropDownList()
  Desc : 根據單位代碼初始承辦科別下拉選單
  Parm : argDeptNo		        : string 一級單位代碼
		 argSectDropDownListID	: string 二級單位DropDownList 物件 ID
		 argDeptOnly            : bool   承辦科別下拉選單是否顯示"(僅含一級單位)"的選項
		                          (true:顯示;false:不顯示)
  Rtn  : none
 **********************************************************************************************/
 //1040602 Gabby修正共用函式名稱相同問題
//function odjf_SetdlSectByUnitCode(argDeptNo, argSectDropDownListID, argDeptOnly)
function odjf_SetdlSectByUnitCodeDropDownList(argDeptNo, argSectDropDownListID, argDeptOnly)
{
	//取得DropDownList物件
	var obj=document.all[argSectDropDownListID]
	
	if (obj == null || obj == null)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["["+argSectDropDownListID+"]下拉選單不存在"])),"");
	}
	else
	{
			//單位代碼為空值，則將承辦科別設定為無選項且顯示為空值
		if(argDeptNo == "" || argDeptNo == null || argDeptNo == "undefined")
		{
			if (obj != null)
			{
				while(obj.length > 0)
					obj.remove(0);
				obj.options.add(new Option("",""));
			}
			return;
		}
	
		var val = argDeptNo;
		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetSubUnit", false, val);
		
		var resultObj = null;
		if( callObj.error )
			alert(callObj.errorDetail.string);
		else
		{
			if( jf_IsWebServiceSuccess(callObj) )
				resultObj = callObj.value;
		}

		//清空選項
		while(obj.length > 0)
			obj.remove(0);

		//重新新增選項
		len = resultObj.SecName.length;
		
		//檢核是否加入"(僅含一級單位)"的選項
		if(len > 0 && argDeptOnly)//若有二級單位,且要顯示"(僅含一級單位)"的選項
		{
			obj.options.add(new Option("",""));
			obj.options.add(new Option("(僅含一級單位)",""));
		}
		else
			obj.options.add(new Option("",""));
		
		for( i=0 ; i<len ; i++ )
		{
			//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
			var objOption = new Option(resultObj.SecName[i], resultObj.DeptNo[i]+":"+resultObj.DeptName[i]+":"+resultObj.SecNo[i]+":"+resultObj.SecName[i])
			obj.options.add(objOption);
		}

		//清空顯示的Text，以及重設選擇
		obj.selectedIndex = -1;
	}
}
/**********************************************************************************************
  Name : function odjf_SetdlUserByUnitCode()
  Desc : 設定人員下拉選單	Charles 0951020
  Parm : argDeptNo		        : string 單位代碼
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlUserByUnitCode(argDeptNo, argUserComboBoxID, argRoleNo, argSubTree)
{
	//取得Combo物件
	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	
	if (UserComboBoxObj == null || UserComboBoxTextObj == null)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["["+argUserComboBoxID+"]下拉選單不存在"])),"");
	}
	else
	{
		//單位代碼為空值，則將承辦人設定為無選項且顯示為空值
		if(argDeptNo == "" || argDeptNo == null || argDeptNo == "undefined")
		{
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
	
		var valUser = new Array(3);
		valUser[0] = argDeptNo;
		valUser[1] = argRoleNo;
		valUser[2] = argSubTree;

		callObj = jf_CallWS("lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
		
		resultObj = null;
		if( callObj.error )
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])),"");
		else
		{
			if( jf_IsWebServiceSuccess(callObj) )
				resultObj = callObj.value;
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
				UserComboBoxObj.selectedIndex = i;
				break;
			}
		}
	}
}

//根據所指定的Text值，設定下拉選單物件的選擇
function odjf_SetDDLByText(argSelect, argText)
{
	for(var i = 0; i < argSelect.options.length; i++)
	{
		if(argSelect.options[i].text == argText)
		{
			argSelect.selectedIndex = i;
			break;
		}
	}
}

//根據所指定的Value值，設定下拉選單物件的選擇
//至於 argCompart, argIdx 兩參數意義分別為 下拉選單選項值以何分隔符號分隔, split之後以第幾個為比對標準
function odjf_SetDDLByValue(argSelect, argValue, argCompart, argIdx)
{
	var RtnValue = "";
	for(var i = 0; i < argSelect.options.length; i++)
	{
		if(argCompart != "")	//下拉選單之選項是許多值以分隔符號分隔組合而成
		{
			var tempArr = argSelect.options[i].value.split(argCompart);
			
			if(argIdx != "")	//有指定比對標的索引
			{
				if(tempArr[argIdx] == argValue)
				{
					argSelect.selectedIndex = i;
					break;
				}
			}
			else				//未指定比對標的索引
			{
				var bSetOK = false;
				for(var j = 0; j < tempArr.length; j++)
				{
					if(tempArr[j] == argValue)
					{
						argSelect.selectedIndex = i;
						bSetOK = true;
						break;
					}
				}
				if(bSetOK)
					break;
			}
		}
		else					//下拉選單之選項是單一值
		{
			if(argSelect.options[i].value == argValue)
			{
				argSelect.selectedIndex = i;
				break;
			}
		}
	}
	return RtnValue;
}

//取得下拉選單物件中，與指定Text相對應的值
function odjf_GetSelectValue(argSelect, argText)
{
	var RtnValue = "";
	for(var i = 0; i < argSelect.options.length; i++)
	{
		if(argSelect.options[i].text == argText)
		{
			RtnValue = argSelect.options[i].value;
			break;
		}
	}
	return RtnValue;
}

//將下拉選單裡的options轉成字串相加再回傳，格式： [項目Text;項目Value|項目Text;項目Value|...]
function odjf_SaveCurrDL(argSource)
{
	var strTemp = "";
	for(var i=0 ; i < argSource.options.length ; i++ )
	{
		strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
	}
	return strTemp.substr(0,strTemp.length-1);
}