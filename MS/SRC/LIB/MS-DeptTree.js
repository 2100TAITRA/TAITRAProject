/************************************************************************************************
DATE		SA			PRG			MGR_NO		DESC
1050822		Cloud		Cloud		1050087		升級二代
1051019		Cloud		Cloud		1050087		配合pad環境原select物件僅能顯示一筆，配合改用u|，
                                                調整回寫及開啟邏輯
1051104		Cloud		Cloud		1050087		無詞彙不給-
1081008		Kevin		Joe			1080339		jQuery升級3.4.1
1100510		Kevin		David		1100221		支援jQuery3.5.1，調整jQuery.trim用法
1110329		Kevin		David		1110164		弱掃調整click、blur、change事件不可寫在html內，改由JS註冊
1120901 	Kevin		Joe 		1120709 	弱掃修正Client Potential XSS
*************************************************************************************************/

 /**********************************************************************************************
 Name : function jf_DeptOnLoad()
 Desc : 開啟分會單位設定子視窗時進行功能鍵初始化處理
 Param: 無
 Rtn  : 無
 **********************************************************************************************/ 
 document.onreadystatechange=jf_DeptOnLoad;
function jf_DeptOnLoad()
{
	//1110329 David 1110164 調整OnLoad時機，避免重複處理
	if(document.readyState !== "complete")
		return;

	var DeptList = parent.$("#list2").children();
	var deptno = "";
	
	for(var iDept=0;iDept<DeptList.length;iDept++)
	{
		//1051019 Cloud	配合pad環境，調整編輯區使用物件，調整程式邏輯
		//deptno = DeptList.eq(iDept).attr("value");
		deptno = DeptList.eq(iDept).attr("data-value");
		$('#divForTreeView').find("input[OuId='"+deptno+"']").prop("checked",true);
	}

	//1110329 David 1110164 弱掃調整click、blur、change事件不可寫在html內，改由JS註冊
	AddEventInit();
}

//1110329 David 1110164 弱掃調整click、blur、change事件不可寫在html內，改由JS註冊
function AddEventInit()
{
	$("#btSave").on("click", jf_SaveDept);
	$("#btCancel").on("click", jf_Cancel);

	//因移除TreeView物件自動產生的onclick=ExpCol()，改由對應js註冊
	$('A').on("click", function(){
		ExpCol(this,'Template/TreeViewImages/','dotsbt','ICON_ORG.gif','','')
	});
}

 /**********************************************************************************************
 Name : function jf_ConfirmCancel()
 Desc : 使用者點選取消鍵時，提供警示訊息詢問是確認要關閉視窗
 Param: 無
 Rtn  : 無
 **********************************************************************************************/ 
function jf_Cancel()
{
	if(window.confirm("是否確認要關閉批次設定子視窗?"))
		//1081008	Joe		1080339		jQuery升級3.4.1
		// parent.$("#extdlg_close_btn").click();
		parent.$("#extdlg_close_btn").trigger("click");
}

 /**********************************************************************************************
 Name : function jf_SaveDept()
 Desc : 將勾選單位資訊回傳
 Param: 無
 Rtn  : true/false
 **********************************************************************************************/ 
function jf_SaveDept()
{
	//1050822	Cloud 1050087		升級二代
	var checknode = $('#divForTreeView').find("input[id^='tv_chk_node']");
	//1051104		Cloud		Cloud		1050087		無詞彙不給-
	//var Word = parent.$('#wordlist option:selected').val();
	//1100510 David 1100221 移除jQuery.trim()
	//var Word = jQuery.trim(parent.$('#wordlist option:selected').val());
	var Word = jf_Trim(parent.$('#wordlist option:selected').val());
	//1110929 David 修正可依詞彙過濾單位功能設定時，取得的資料會有特殊符號問題
	if(Word.indexOf('|')!=-1)
		Word = Word.split('|')[0];
	parent.$("#list2").children().remove();
	/*<option value="99" type="敬會">敬會-署長室</option>*/
	for(var inode=0;inode<checknode.length;inode++)
	{
		var sep = "";
		if(Word!="" && Word!="　")
			sep = "-";
		else//1110825 David 修正誤加入全形空白問題
			Word = "";
		if(checknode.eq(inode).prop("checked"))
			//1051019 Cloud	配合pad環境，調整編輯區使用物件，調整程式邏輯
			//parent.$("#list2").append("<option value='"+checknode.eq(inode).attr("OuId")+"' type='"+Word+"'>"+Word+"-"+checknode.eq(inode).attr("OuName")+"</option>");
			//1051104		Cloud		Cloud		1050087		無詞彙不給-
			//$("<li data-type='" + Word + "' data-value='" + checknode.eq(inode).attr("OuId") + "'>" + Word + "-" + checknode.eq(inode).attr("OuName") + "</li>").appendTo(parent.$("#list2"));
			//1110825 David 修正加入後無法選取問題
			//$("<li data-type='" + Word + "' data-value='" + checknode.eq(inode).attr("OuId") + "'>" + Word + sep + checknode.eq(inode).attr("OuName") + "</li>").appendTo(parent.$("#list2"));
			//1120901 Joe 1120709 弱掃修正Client Potential XSS
			// $("<li data-type='" + Word + "' data-value='" + checknode.eq(inode).attr("OuId") + "'>" + Word + sep + checknode.eq(inode).attr("OuName") + "</li>").appendTo(parent.$("#list2"))
			$("<li data-type='" + HtmlEncode(Word) + "' data-value='" + HtmlEncode(checknode.eq(inode).attr("OuId")) + "'>" + HtmlEncode(Word) + HtmlEncode(sep) + HtmlEncode(checknode.eq(inode).attr("OuName")) + "</li>").appendTo(parent.$("#list2"))
			.on('click', function(evt) {
				parent.$("#list2").find("li").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
			});
	}
	// 1070921 Raymond 1070997 新增參數表示使用者點擊"Save"
	//parent.$("#extdlg_close_btn").click();
	parent.$("#extdlg_close_btn").trigger("click", true);
	//1051019 Cloud	配合pad環境，調整編輯區使用物件，調整程式邏輯-refresh使資料有畫面效果
	parent.$("#list2").listview("refresh");
	
}

//1120901 Joe 1120709 弱掃修正Client Potential XSS
function HtmlEncode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}
