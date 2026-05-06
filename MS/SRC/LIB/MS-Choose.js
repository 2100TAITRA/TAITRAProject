// 機關選擇子視窗功能模組(桌機版)
/* DATE		MGRNO		SA		PG		Desc
   1081008	1080339		Kevin	Joe		jQuery升級3.4.1
   1100506	1100473		Kevin	David	弱掃修正Client Potential XSS
*/

var gRtnObj;
var gMode="Org";//Org:機關/單位 Emp:人員
var gOpenMode="";//由修改子視窗開啟或是受文者編輯子視窗開啟
//增加ARRAY 當有多筆受文者重複時，紀錄對應資訊
var gDeptList = new Array();
var gActiveMp;
var gActiveConut=0;


function fnOpenWinChoose(argActiveObj,argMode,$dlg,argOepnMode,argWaitSeq)
{
	gOpenMode = argOepnMode;
	gActiveConut++;
	
	$("#receiverSetting").find(".ui-slide-pane-left").css("opacity","0.4");//隱藏原主子視窗
	/*$("#receiverSetting").find(".ui-slide-pane-Choose-Org").css("margin-left","20%");//顯示選擇子視窗
	$("#receiverSetting").find(".ui-slide-pane-Choose-Org").addClass("ui-slide-pane-active");//顯示選擇子視窗*/
	//複製選擇視窗，之後運行都用複製出來的運行
	var baseMp = $("#receiverSetting").find("#ui-slide-pane-Choose-Org");
	//1100506 David 1100473 弱掃修正Client Potential XSS
	//var NewMp = baseMp.clone().attr("id","ui-slide-pane-Choose-Org_"+argWaitSeq).insertBefore(baseMp);
	var NewMp = baseMp.clone().attr("id","ui-slide-pane-Choose-Org_"+htmlencode(argWaitSeq)).insertBefore(baseMp);
	NewMp.css("margin-left","20%").addClass("ui-slide-pane-active");
	gRtnObj = argActiveObj;
	//將現在的待選物件放入ARRAY中
	gDeptList[argWaitSeq] = argActiveObj;
	
	if(argMode=="Org")
	{
		gMode = "Org";
		//$("#Cho_lbInfo").text("受文者名稱["+gRtnObj.value.OrgName[0]+"]於資料庫中有重覆，請選擇正確之受文者");
		NewMp.find("#Cho_lbInfo").text("受文者名稱["+gRtnObj.value.OrgName[0]+"]於資料庫中有重覆，請選擇正確之受文者");
		
		//$("div#receiverTable-Choose-Emp").css("display","none");//隱藏人員table
		NewMp.find("div#receiverTable-Choose-Emp").css("display","none");//隱藏人員table
		//進行選擇子視窗的初始化
		var colWidths = [];
		$dlg.find(".ui-table-header-PC-Choose-Org .ui-table-column-header").each(function(i, elem) {
			colWidths.push($(elem).css("width"));
		});
		//初始化
		for(var iDept=0;iDept<gRtnObj.value.Count;iDept++)
		{
			//var $list = $dlg.find("#receiverList-Choose-Org");//取得TABLE 畫面要放入區塊
			var $list = NewMp.find("#receiverList-Choose-Org");//取得TABLE 畫面要放入區塊
			var $li = $("<li class='ui-table-item-PC'></li>");//取得第一個位置
			var seq= iDept+ 1;
			fnsetChoTablaColumn($("<div class='ui-table-column-item'><label></div>").appendTo($li).find("label"),colWidths[0],seq,"Cho_org_seq_"+iDept+"_"+argWaitSeq,"序");//增加argWaitSeq為待選物件ARRAY中位置
			fnsetChoTablaColumn($("<div class='ui-table-column-item'><label></div>").appendTo($li).find("label"),colWidths[1],gRtnObj.value.OrgName[iDept]+"("+gRtnObj.value.Owner[iDept]+")","Cho_org_Orgname_"+iDept+"_"+argWaitSeq,"受文者");
			fnsetChoTablaColumn($("<div class='ui-table-column-item'><label></div>").appendTo($li).find("label"),colWidths[2],gRtnObj.value.PostNo[iDept]+"/"+gRtnObj.value.Address[iDept],"Cho_org_Address_"+iDept+"_"+argWaitSeq,"地址");
			$li.appendTo($list);
		}
	}
	else//人員選擇模式
	{
		gMode = "Emp";
		//$("#Cho_lbInfo").text("受文者名稱["+gRtnObj.value.OrgName[0]+"]的姓名於資料庫中有重覆，請選擇正確之受文者信箱");
		NewMp.find("#Cho_lbInfo").text("受文者名稱["+gRtnObj.value.OrgName[0]+"]的姓名於資料庫中有重覆，請選擇正確之受文者信箱");
		//$("div#receiverTable-Choose-Emp").css("display","");//顯示人員table
		//1051215 Cloud	修正藏錯table問題
		//NewMp.find("div#receiverTable-Choose-Emp").css("display","none");//隱藏人員table
		NewMp.find("div#receiverTable-Choose-Org").css("display","none");//隱藏機關table
		
		//$("div#receiverTable-Choose-Org").css("display","none");//
		//進行選擇子視窗的初始化
		var colWidths = [];
		$dlg.find(".ui-table-header-PC-Choose-Emp .ui-table-column-header").each(function(i, elem) {
			colWidths.push($(elem).css("width"));
		});
		//初始化
		var EmpInfoList = gRtnObj.value.DeptNo[0].split(';');
		var EmpInfo = "";
		//var $list = $dlg.find("#receiverList-Choose-Emp");//取得TABLE 畫面要放入區塊
		var $list = NewMp.find("#receiverList-Choose-Emp");//取得TABLE 畫面要放入區塊
		var $li;
		for(var iEmpList=0;iEmpList<EmpInfoList.length;iEmpList++)
		{
			if(EmpInfoList[iEmpList]=="")
				continue;
			EmpInfo = EmpInfoList[iEmpList].split('|');
			
			$li = $("<li class='ui-table-item-PC'></li>");//取得現有資料
			var seq= iEmpList+ 1;
			fnsetChoTablaColumn($("<div class='ui-table-column-item'><label></div>").appendTo($li).find("label"),colWidths[0],seq,"Cho_emp_seq_"+iEmpList+"_"+argWaitSeq,"序");
			fnsetChoTablaColumn($("<div class='ui-table-column-item'><label></div>").appendTo($li).find("label"),colWidths[1],EmpInfo[0],"Cho_emp_Dept_"+iEmpList+"_"+argWaitSeq,"單位");
			fnsetChoTablaColumn($("<div class='ui-table-column-item'><label></div>").appendTo($li).find("label"),colWidths[2],gRtnObj.value.OrgName[0],"Cho_emp_Name_"+iEmpList+"_"+argWaitSeq,"姓名");
			fnsetChoTablaColumn($("<div class='ui-table-column-item'><label></div>").appendTo($li).find("label"),colWidths[3],EmpInfo[1],"Cho_emp_Email_"+iEmpList+"_"+argWaitSeq,"電子信箱");
			$li.appendTo($list);
		}
	}
	
	//************************************************************註冊事件****************************************************//
}
		
//初始設定畫面
function fnsetChoTablaColumn(argobj,argWith,argval,argId,argTagName)
{
		argobj.parent().css("width", argWith);//為外層DIV增加寬度
		argobj.css("width", "100%").text(argval).attr("id",argId);
		if(argTagName=="受文者" || argTagName=="單位")
			//1081008	Joe		1080339		jQuery升級3.4.1
			// argobj.click(function (event)
			argobj.on("click",function (event)
		{
			//$("#receiverSetting").find(".ui-slide-pane-Choose-Org").css("margin-left","40%");//隱藏選擇子視窗
			//$("#receiverSetting").find(".ui-slide-pane-Choose-Org").removeClass("ui-slide-pane-active");//顯示選擇子視窗
			var workMpSeq = event.target.id.split('_')[4];//現在WORK的頁面的序
			var workWindow = $("#receiverSetting").find("#ui-slide-pane-Choose-Org_"+workMpSeq);
			workWindow.css("margin-left","40%");//隱藏選擇子視窗
			workWindow.removeClass("ui-slide-pane-active");//顯示受文者子視窗
			if(gMode=="Org")
			{
				//$("#receiverList-Choose-Org").children().remove();//清空畫面
			}
			else
			{
				//$("#receiverList-Choose-Emp").children().remove();//清空畫面
			}
			var bClose = false;
			gActiveConut--;
			if(gActiveConut==0)//表示只剩一筆需處理
				bClose = true;
				
			if(gOpenMode=="Modi")
				//fnReturnValueFromChooseToModi(event.target.id,gRtnObj.value,gMode);
				fnReturnValueFromChooseToModi(event.target.id,gDeptList[workMpSeq].value,gMode);
			else
				//fnReturnValueFromChoose(event.target.id,gRtnObj,gMode);//修改回傳物件
				fnReturnValueFromChoose(event.target.id,gDeptList[workMpSeq],gMode,bClose);
		});
}

//1100506 David 1100473 弱掃修正
function htmlencode(s){
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-Choose.js").finish();
})();
