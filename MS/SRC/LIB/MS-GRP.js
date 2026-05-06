// 群組編輯子視窗功能模組(桌機版)
//	
/*DATE 		SA		PG		MGR_NO		DESC	
  1060117	Cloud	Cloud	1050376		姓名、正副本稱謂限制增加60字
  1060906 	Cloud	Cloud	1060763		增加有異動時，異動主視窗異動變數
  1070529	Cloud	Cloud	1070183		新增附件分繕功能
  1071203	David	Joe		--			修正群組報表漏傳姓名的問題
  1080312	David	David	1080089		分繕表新增紀錄受文者全銜、姓名、編號資訊，調整程式邏輯
  1080903	Kevin	Joe		1080339		jQuery升級2.2.4
  1081008	Kevin	Joe		1080339		jQuery升級3.4.1
  1090529	David	Joe		1090362		修正附件分繕取得資訊語法，避免IE不支援造成異常
  1100128	David	Joe		1090608		修正郵遞區號為6碼
  1100309	David	David	1090610		新增群組受文者分頁功能
  1100817	David	David	1090610		1.修正批次設定異常問題。2.新增參數控制是否啟用分頁功能
  1110225	David	David	1101481		新增個人專區發文方式、考試院客製化人工傳遞處理、發文方式UI調整
  1110517	David	David	1101455		(考試院現場反應)儲存時附件不一致會解除時顯示提示訊息
  1110816	David	Joe		--			修正批次修改發文方式異常的問題
  1110901	David	Joe		1110615		受文者編輯相關UI調整
  1111102	David	Joe		--			修正Tag名稱錯誤的問題
  1140728	David	David	1140381		新增附件分繕異動旗標判斷處理
  1141110	David	David	1141112		海外發文支援外貿使用，調整文字
  1141202	David	David	1141306		新增依Data檔設定進行郵遞區號、地址檢核
  1141229	David	David	1141432		1.新增外貿客製化欄位處理。2.外貿不提供單筆修正視窗
*/	
var gGrpDeptNode;
var gindexOfGrp;
var strDoctype;
var grptheuserinfo;
var gactiveDept;
var gGrpSso;
var gGrpWebServices;
var gGrpOsendWays;
var gGrpcolWidths = [];
var grpaddressWidth;
var gGrpCount;
//1070529	Cloud	1070183		新增附件分繕功能
//1080312 David 1080089 調整紀錄方式
//var gGepDeptName = "";
var gGrpMailMergeModify = [];
//1100309 David 1090610 紀錄群組受文者數及分頁數
var iGrpIssueCount = 0;
var iGrpPage = 0;
var bGrpPage = false;

//1110225 David 1101481 調整發文方式選單處理邏輯
//function fnOpenModeGrp(argID,argactiveDept,$dlg,argDocType,sendWays,argtheuserinfo,argtheWebServices,argSsoConfig)
function fnOpenModeGrp(argID,argactiveDept,$dlg,argDocType,argtheuserinfo,argtheWebServices,argSsoConfig)
{
	grptheuserinfo = argtheuserinfo;//全域USERINFO物件
	gGrpWebServices = argtheWebServices;//全域WEBSERVICE物件
	gactiveDept = activeDept;
	strDoctype = (argDocType=="開會通知單") ? "<option value='主持人'>主持人</option><option value='出席者'>出席者</option><option value='列席者'>列席者</option>" : "";
	gGrpSso = argSsoConfig;
	gGrpOsendWays = "<option value=''></option>";
	gindexOfGrp = argID.split("_")[2];
	gindexOfGrp++;//id數字是從0開始，所以需+1
	//gGrpDeptNode = activeDept.find("[序='"+gindexOfGrp+"']").clone();//複製出程式要異動的節點
	gGrpDeptNode = argactiveDept;//activeDept子視窗開啟前已經切為群組物件
	/*$("#receiverSetting").find(".ui-slide-pane-left").removeClass("ui-slide-pane-active");//隱藏受文者編輯子視窗
	$("#receiverSetting").find(".ui-slide-pane-GRP").addClass("ui-slide-pane-active");//顯示群組編輯子視窗*/
	gGrpCount = 1;
	//1110225 David 1101481 考試院使用時調整發文方式顯示長度
	if(strOrgNickName == "EXAM")
	{
		$('#DEPT_GrpIssueTitle').css("width","11%");
		$('#DEPT_GrpAddress').css("width","20%");
	}
	//1141229 David 1141432 新增外貿客製化欄位
	if(strOrgNickName == "TAITRA")
	{
		$('#DEPT_GrpIssueTitle').css("width","6.5%");
		$('#DEPT_GrpAddress').css("width","14%");
		$('#Grp_Emiailtile').css("width","10%");
		$('#Grp_DeptOrgName').css("width","12%");
		$('#Grp_DeptOrgTitle').css("width","12%");
	}
	else
	{
		$("#Grp_NameAddress").css("display","none");
		$("#Grp_JobTitle").css("display","none");
		$("#Grp_FaxNo").css("display","none");
	}

	//進行群組編輯子視窗的初始化
	if(gGrpcolWidths.length==0)
		$dlg.find(".ui-table-header-PC-GRP .ui-table-column-header").each(function(i, elem) {gGrpcolWidths.push($(elem).css("width"));});

	if(strOdSupportEmail=="N")
	{
		grpaddressWidth = parseInt(gGrpcolWidths[9].substring(0,gGrpcolWidths[9].length-2))+parseInt(gGrpcolWidths[10].substring(0,gGrpcolWidths[10].length-2));
		grpaddressWidth+"px";
	}
	else
		grpaddressWidth = gGrpcolWidths[9];
	//1080312 David 1080089 初始處理
	gGrpMailMergeModify = [];
	//初始化
	if(strOdSupportEmail=="N")
		$("#Grp_Emiailtile").css("display","none");

	//1100309 David 1090610 紀錄受文者數及頁數
	iGrpIssueCount = gGrpDeptNode.find("全銜").length;
	//1100817 David 1090610 新增參數控制是否啟用分頁功能
	//if(iGrpIssueCount > 100)
	if(theSSO.User.SystemSets.get("WE_GRP_USE_PAGE") == "Y" && iGrpIssueCount > 100)
	{
		bGrpPage = true;
		iGrpPage = Math.ceil(iGrpIssueCount/100);
		$("#GrpPagr_txPageNow").val("1");
		$("#GrpPagr_txPageAll").val(iGrpPage);
		$("#GrpPagr_txPageTo").val("");
		$("#GrpHeader").height("120px");
		$("#divGrpPage").show();
	}

	//1100309 David 1090610 支援分頁功能，調整呼叫方法，將產生畫面一行資料行為獨立
	//gGrpDeptNode.children("已刪除,受文者").each(doPopulateForGrp);//取得受文者編輯子視窗清單
	gGrpDeptNode.children("已刪除,受文者").each(SetNodeToPageInit);//取得受文者編輯子視窗清單

	//1100309 David 1090610 支援分頁功能，新增初始化設定受文者資料功能
	function SetNodeToPageInit(i, node){ //產生節點並放入畫面

		//需分頁時，初始化先顯示前100筆
		if(bGrpPage && i > 99)
			return false;

		doPopulateForGrp(i, node);
	}

	function doPopulateForGrp(i, node){ //產生節點並放入畫面

		//1110830	Joe		1110615		調整畫面UI--S
		/*
		var $list = $dlg.find("#receiverList-GRP");//取得TABLE 畫面要放入區塊

		var $li = $("<li class='ui-table-item-PC'><div class='ui-table-column-item' ></div></li>").find('div');
		var seq= i+ 1;		
		node.setAttribute("序",gindexOfGrp+"_"+seq);

		fnsetGrpTablaColumn($("<label>").appendTo($li),gGrpcolWidths[0],seq,"","序");

		//選
		fnsetGrpTablaColumn($("<input type='checkbox'>").appendTo($li),gGrpcolWidths[1],"","Grp_cbSel_"+gindexOfGrp+"_"+i,"選");

		if(node.tagName == "受文者") //刪除紐不CHECKED
		{
			fnsetGrpTablaColumn($("<input type='checkbox'>").appendTo($li),gGrpcolWidths[2],"","Grp_cbDel_"+gindexOfGrp+"_"+i,"受");
		}
		else if(node.tagName == "已刪除") 
		{
			//刪
			fnsetGrpTablaColumn($("<input type='checkbox'>").appendTo($li),gGrpcolWidths[2],"","Grp_cbDel_"+gindexOfGrp+"_"+i,"刪");
		}
		//啟動追蹤修訂時，增加建立者、刪除者資訊
		var strCreateName="";
		var strDeleteName="";
		if(strDLGUseTrace=="Y")
		{
			strCreateName = fnGetSnName($(node),"CreateSN");//用來顯示在TOOTIP的資訊
			strDeleteName = fnGetSnName($(node),"DeleteSN");
		}

		fnsetGrpTablaColumn($("<input style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;'></div>").appendTo($li),gGrpcolWidths[3],$(node).find("正式名稱").text()+"|"+strCreateName+"|"+strDeleteName,"Grp_lbOrgnameGrp_"+gindexOfGrp+"_"+i,"正式名稱");
		//1060117	Cloud	1050376		姓名、正副本稱謂限制增加60字	
		//fnsetGrpTablaColumn($("<input>").appendTo($li),gGrpcolWidths[4],$(node).find("姓名").text(),"Grp_txEmpNameGrp_"+gindexOfGrp+"_"+i,"姓名");
		fnsetGrpTablaColumn($("<input maxlength=60>").appendTo($li),gGrpcolWidths[4],$(node).find("姓名").text(),"Grp_txEmpNameGrp_"+gindexOfGrp+"_"+i,"姓名");
		//1060117	Cloud	1050376		姓名、正副本稱謂限制增加60字	
		//fnsetGrpTablaColumn($("<input>").appendTo($li),gGrpcolWidths[5],$(node).find("全銜").text(),"Grp_txOrgFullNameGrp_"+gindexOfGrp+"_"+i,"全銜");
		fnsetGrpTablaColumn($("<input maxlength=60>").appendTo($li),gGrpcolWidths[5],$(node).find("全銜").text(),"Grp_txOrgFullNameGrp_"+gindexOfGrp+"_"+i,"全銜");

		fnsetGrpTablaColumn($("<input type='button' ></input>").appendTo($li),gGrpcolWidths[6],$(node).find("含附件").text(),"Grp_dlGrpAttch_"+gindexOfGrp+"_"+i,"含附件");

		//1110225 David 1101481 調整發文方式UI
		$("<div style='display: inline-block' id='Dept_GrpIssueTypeList_"+gindexOfGrp+"_"+i+"'></div>").appendTo($li);//放動態選單
		fnsetGrpTablaColumn($("<input type='button' ></input>").appendTo($li),gGrpcolWidths[7],$(node).find("發文方式").text(),"Grp_dldocissuetypeGrp_"+gindexOfGrp+"_"+i,"發文方式");

		fnsetGrpTablaColumn($("<input>").appendTo($li),gGrpcolWidths[8],$(node).find("郵遞區號").text(),"Grp_txPostNoGrp_"+gindexOfGrp+"_"+i,"郵遞區號");

		fnsetGrpTablaColumn($("<input>").appendTo($li),grpaddressWidth,$(node).find("地址").text(),"Grp_txAddressGrp_"+gindexOfGrp+"_"+i,"地址");

		if(strOdSupportEmail!="N")
			fnsetGrpTablaColumn($("<input>").appendTo($li),gGrpcolWidths[10],$(node).find("Email").text(),"Grp_txEmailGrp_"+gindexOfGrp+"_"+i,"Email");

		$li.parent().appendTo($list);

		if(node.tagName == "已刪除") 
		{
			fngrpSetColumn("Grp_cbDel_"+gindexOfGrp+"_"+i,i,"Readonly");
		}*/
		
		var InputAttr = theSSO.User.SystemSets.get("DEPT_SHOW_FULLDATA") == "Y" ? "textarea style='resize:none;overflow:hidden'" : "input";
		
		var $list = $dlg.find("#receiverList-GRP");//取得TABLE 畫面要放入區塊

		var $li;
		
		if(theSSO.User.SystemSets.get("DEPT_SHOW_FULLDATA") == "Y")
			$li = $("<li class='ui-table-item-PC'><div class='ui-table-column-item' style='height:" + fnGetReceiverHeight(node) + "'></div></li>").find('div');
		else
			$li = $("<li class='ui-table-item-PC'><div class='ui-table-column-item' ></div></li>").find('div');
		var seq= i+ 1;		
		node.setAttribute("序",gindexOfGrp+"_"+seq);

		fnsetGrpTablaColumn($("<label>").appendTo($li),gGrpcolWidths[0],seq,"","序");

		//選
		fnsetGrpTablaColumn($("<input type='checkbox'>").appendTo($li),gGrpcolWidths[1],"","Grp_cbSel_"+gindexOfGrp+"_"+i,"選");

		if(node.tagName == "受文者") //刪除紐不CHECKED
		{
			fnsetGrpTablaColumn($("<input type='checkbox'>").appendTo($li),gGrpcolWidths[2],"","Grp_cbDel_"+gindexOfGrp+"_"+i,"受");
		}
		else if(node.tagName == "已刪除") 
		{
			//刪
			fnsetGrpTablaColumn($("<input type='checkbox'>").appendTo($li),gGrpcolWidths[2],"","Grp_cbDel_"+gindexOfGrp+"_"+i,"刪");
		}
		//啟動追蹤修訂時，增加建立者、刪除者資訊
		var strCreateName="";
		var strDeleteName="";
		if(strDLGUseTrace=="Y")
		{
			strCreateName = fnGetSnName($(node),"CreateSN");//用來顯示在TOOTIP的資訊
			strDeleteName = fnGetSnName($(node),"DeleteSN");
		}

		if(theSSO.User.SystemSets.get("DEPT_SHOW_FULLDATA") == "Y" )
			//1111102	Joe		--		修正Tag名稱錯誤的問題
			// fnsetGrpTablaColumn($("<textarea style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;resize:none;overflow:hidden'></div>").appendTo($li),gGrpcolWidths[3],$(node).find("正式名稱").text()+"|"+strCreateName+"|"+strDeleteName,"Grp_lbOrgnameGrp_"+gindexOfGrp+"_"+i,"正式名稱");
			fnsetGrpTablaColumn($("<textarea style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;resize:none;overflow:hidden'></textarea>").appendTo($li),gGrpcolWidths[3],$(node).find("正式名稱").text()+"|"+strCreateName+"|"+strDeleteName,"Grp_lbOrgnameGrp_"+gindexOfGrp+"_"+i,"正式名稱");
		else
			//1111102	Joe		--		修正Tag名稱錯誤的問題
			// fnsetGrpTablaColumn($("<input style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;'></div>").appendTo($li),gGrpcolWidths[3],$(node).find("正式名稱").text()+"|"+strCreateName+"|"+strDeleteName,"Grp_lbOrgnameGrp_"+gindexOfGrp+"_"+i,"正式名稱");
			fnsetGrpTablaColumn($("<input style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;'>").appendTo($li),gGrpcolWidths[3],$(node).find("正式名稱").text()+"|"+strCreateName+"|"+strDeleteName,"Grp_lbOrgnameGrp_"+gindexOfGrp+"_"+i,"正式名稱");
		//1060117	Cloud	1050376		姓名、正副本稱謂限制增加60字	
		//fnsetGrpTablaColumn($("<input>").appendTo($li),gGrpcolWidths[4],$(node).find("姓名").text(),"Grp_txEmpNameGrp_"+gindexOfGrp+"_"+i,"姓名");
		fnsetGrpTablaColumn($("<" + InputAttr + ">").appendTo($li),gGrpcolWidths[4],$(node).find("姓名").text(),"Grp_txEmpNameGrp_"+gindexOfGrp+"_"+i,"姓名");
		//1060117	Cloud	1050376		姓名、正副本稱謂限制增加60字	
		//fnsetGrpTablaColumn($("<input>").appendTo($li),gGrpcolWidths[5],$(node).find("全銜").text(),"Grp_txOrgFullNameGrp_"+gindexOfGrp+"_"+i,"全銜");
		fnsetGrpTablaColumn($("<" + InputAttr + ">").appendTo($li),gGrpcolWidths[5],$(node).find("全銜").text(),"Grp_txOrgFullNameGrp_"+gindexOfGrp+"_"+i,"全銜");

		fnsetGrpTablaColumn($("<input type='button' ></input>").appendTo($li),gGrpcolWidths[6],$(node).find("含附件").text(),"Grp_dlGrpAttch_"+gindexOfGrp+"_"+i,"含附件");

		//1110225 David 1101481 調整發文方式UI
		$("<div style='display: inline-block' id='Dept_GrpIssueTypeList_"+gindexOfGrp+"_"+i+"'></div>").appendTo($li);//放動態選單
		fnsetGrpTablaColumn($("<input type='button' ></input>").appendTo($li),gGrpcolWidths[7],$(node).find("發文方式").text(),"Grp_dldocissuetypeGrp_"+gindexOfGrp+"_"+i,"發文方式");

		fnsetGrpTablaColumn($("<" + InputAttr + ">").appendTo($li),gGrpcolWidths[8],$(node).find("郵遞區號").text(),"Grp_txPostNoGrp_"+gindexOfGrp+"_"+i,"郵遞區號");

		fnsetGrpTablaColumn($("<" + InputAttr + ">").appendTo($li),grpaddressWidth,$(node).find("地址").text(),"Grp_txAddressGrp_"+gindexOfGrp+"_"+i,"地址");

		if(strOdSupportEmail!="N")
			fnsetGrpTablaColumn($("<input>").appendTo($li),gGrpcolWidths[10],$(node).find("Email").text(),"Grp_txEmailGrp_"+gindexOfGrp+"_"+i,"Email");

		//1141229 David 1141432 新增外貿客製化欄位
		if(strOrgNickName == "TAITRA")
		{
			fnsetGrpTablaColumn($("<input>").appendTo($li),gGrpcolWidths[11],$(node).find("名址條名稱").text(),"Grp_txNameAddress_"+gindexOfGrp+"_"+i,"名址條名稱");
			fnsetGrpTablaColumn($("<input>").appendTo($li),gGrpcolWidths[12],$(node).find("職稱").text(),"Grp_txJobTitle_"+gindexOfGrp+"_"+i,"職稱");
			fnsetGrpTablaColumn($("<input>").appendTo($li),gGrpcolWidths[13],$(node).find("傳真").text(),"Grp_txFaxNo_"+gindexOfGrp+"_"+i,"傳真");
		}

		$li.parent().appendTo($list);

		if(node.tagName == "已刪除") 
		{
			fngrpSetColumn("Grp_cbDel_"+gindexOfGrp+"_"+i,i,"Readonly");
		}
	}
	function fnGetReceiverHeight(node)
	{
		var Height=0;
		var ruler = document.getElementById("receiverTemp");
		ruler.rows = 1;
		ruler.style.display = '';
		ruler.style.width = gGrpcolWidths[3];
	　  ruler.textContent = $(node).find("正式名稱").text();
		Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
		
		ruler.style.width = gGrpcolWidths[4];
	　  ruler.textContent = $(node).find("姓名").text();
		Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
		
		ruler.style.width = gGrpcolWidths[5];
	　  ruler.textContent = $(node).find("全銜").text();
		Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
		
		ruler.style.width = grpaddressWidth;
	　  ruler.textContent = $(node).find("地址").text();
		Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
		
		ruler.style.width = gGrpcolWidths[10];
	　  ruler.textContent = $(node).find("Email").text();
		Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
		ruler.style.display ='none';
	　  return Height + 'px';
	}
	//1110830	Joe		1110615		調整畫面UI--E
	//************************************************************註冊事件****************************************************//
	if(gGrpBInit==false)
	{
		//儲存
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Grp_btGrpSave").click(function() {
		$("#Grp_btGrpSave").on("click", function() {
			if(fnGrpCheckBeforeSave())
			{
				var bSave = true;
				let Expend = false;//1110517 David 1101455 調整宣告時機
				if(gGrpCount!=1)//有異動過則需詢問
				{
					//1110517 David 1101455 調整判斷位置
					if(gGrpDeptNode.find("受文者").find("含附件:contains('是')").length!=0 && gGrpDeptNode.find("受文者").find("含附件:contains('否')").length!=0)
						Expend = true;

					//1110517 David 1101455 儲存時附件不一致會解除時顯示提示訊息，調整訊息內容
					//if(!confirm('您是否要儲存目前畫面中的受文者資訊內容？'))
						//bSave = false;

					//1110517 David 1101455 儲存時附件不一致會解除時顯示提示訊息
					let strCheckSaveMsg = "您是否要儲存目前畫面中的受文者資訊內容？";
					if(Expend)
						strCheckSaveMsg = "目前群組內受文者含附件狀況不一致，儲存後會自動解除群組，" + strCheckSaveMsg;
					if(!confirm(strCheckSaveMsg))
						bSave = false;
				}	
				if(bSave)
				{
					if(gWeViewDeleteGrp=="Y")//修改全銜顯示
					{	
						var word = gGrpDeptNode.find("文字").text();
						var EndIndex = gGrpDeptNode.find("文字").text().lastIndexOf("(");
						var AllDeleteObj =gGrpDeptNode.find("已刪除");
						var AllDeleteName ="";
						if(AllDeleteObj.length !=0)
						{
							for(var i=0;i<AllDeleteObj.length;i++)
							{
								if(i==0)
									AllDeleteName+=AllDeleteObj.eq(i).find("全銜").text();
								else
									AllDeleteName+=","+AllDeleteObj.eq(i).find("全銜").text();
							}
							if(word.indexOf("除外)") != -1)
							{
								var OldTitle = word.substr(0,EndIndex)
								//1050818	Leslie	協助修改IE支援問題
								//gGrpDeptNode.find("文字").text(OldTitle + "("+AllDeleteName+"除外)");
								fnSetTextOfElement(gGrpDeptNode.find("文字"),OldTitle + "("+AllDeleteName+"除外)");
								gGrpDeptNode.attr("全銜",OldTitle + "("+AllDeleteName+"除外)");
							}
							else
							{
								var ChangeTitle = word + "("+AllDeleteName+"除外)";
								//1050818	Leslie	協助修改IE支援問題
								//gGrpDeptNode.find("文字").text(ChangeTitle);
								fnSetTextOfElement(gGrpDeptNode.find("文字"),ChangeTitle);
								gGrpDeptNode.attr("全銜",ChangeTitle);
							}
						}
						else
						{
							if(word.indexOf("除外)") != -1)
							{
								if(EndIndex != -1)
								{
									//1050818	Leslie	協助修改IE支援問題
									//gGrpDeptNode.find("文字").text(word.substr(0,EndIndex));
									fnSetTextOfElement(gGrpDeptNode.find("文字"),word.substr(0,EndIndex));
									gGrpDeptNode.attr("全銜",word.substr(0,EndIndex));
								}
							}
						}
					}
					//1110517 David 1101455 儲存時附件不一致會解除時顯示提示訊息，調整位置
					//var Expend = false;
					//判斷當群組內含附件不是完全相同時 將群組解開
					//1050818	Leslie	一併修掉Bug
					/*if(gGrpDeptNode.find("受文者").find("含附件:contains('是')").length!=0 &&
						gGrpDeptNode.find("受文者").find("含附件:contains('是')").length!=gGrpDeptNode.children("已刪除,受文者").length)*/
					//if(gGrpDeptNode.find("受文者").find("含附件:contains('是')").length!=0 && gGrpDeptNode.find("受文者").find("含附件:contains('否')").length!=0)
						//Expend = true;

					//1080312 David 1080089 儲存時，將需要異動分繕表資訊的群組受文者資訊，更新至母視窗物件中
					if(gGrpMailMergeModify.length > 0)
					{
						for(var iModify = 0 ; iModify < gGrpMailMergeModify.length ; iModify++)
						{
							//判斷母視窗物件是否有一樣的更新類型
							//1090529	Joe		1090362		因IE不支援.find()，修改使用For迴圈處理--S
							// var HasObj = gMailMergeModify.find(function(item){
								// return (item.Type == gGrpMailMergeModify[iModify].Type && item.MailMergeIndex == gGrpMailMergeModify[iModify].MailMergeIndex);
							// });
							var HasObj = arrayFind(gMailMergeModify, function(item) {
								return (item.Type == gGrpMailMergeModify[iModify].Type && item.MailMergeIndex == gGrpMailMergeModify[iModify].MailMergeIndex);
							});
							//1090529	Joe		1090362		因IE不支援.find()，修改使用For迴圈處理--E

							if(HasObj == undefined)//不存在時新增至母視窗物件中
								gMailMergeModify.push(gGrpMailMergeModify[iModify]);
						}
					}

					gactiveDept.find("[序='"+gindexOfGrp+"']").replaceWith(gGrpDeptNode);//將異動完的節點回寫
					$dlg.find("#receiverList-GRP").children().remove();//清空畫面
					fnCallbackDept(Expend,gindexOfGrp);
				}
			}
		});
		//離開
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Grp_btGrpExit").click(function() {
		$("#Grp_btGrpExit").on("click", function() {
			$("#receiverSetting").find(".ui-slide-pane-GRP").removeClass("ui-slide-pane-active");//隱藏受文者編輯子視窗
			$("#receiverSetting").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");//顯示群組編輯子視窗
			$dlg.find("#receiverList-GRP").children().remove();//清空畫面
		});
		
		//全選
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Grp_btGrpCheckAll").click(function() {
		$("#Grp_btGrpCheckAll").on("click", function() {
			var icheckboxlength = $("#receiverList-GRP").find("input[id^='Grp_cbSel']").length;
			for(var i=0;i<icheckboxlength;i++)
			{
				if($("#receiverList-GRP").find("input[id^='Grp_cbDel']")[i].checked)//勾選刪除則略過不管
					continue;
				$("#receiverList-GRP").find("input[id^='Grp_cbSel']").eq(i).prop("checked",true);
			}
			
		});
		
		//反向選取
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Grp_btGrpReverse").click(function() {
		$("#Grp_btGrpReverse").on("click", function() {
			var icheckboxlength = $("#receiverList-GRP").find("input[id^='Grp_cbSel']").length;
			for(var i=0;i<icheckboxlength;i++)
			{
				if($("#receiverList-GRP").find("input[id^='Grp_cbDel']")[i].checked)//勾選刪除則略過不管
					continue;
				if($("#receiverList-GRP").find("input[id^='Grp_cbSel']")[i].checked)
					$("#receiverList-GRP").find("input[id^='Grp_cbSel']").eq(i).prop("checked",false);
				else
					$("#receiverList-GRP").find("input[id^='Grp_cbSel']").eq(i).prop("checked",true);
			}
		});
		//批次修正
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Grp_btGrpFixBatch").click(function() 
		$("#Grp_btGrpFixBatch").on("click", function() 
		{
			//joetest
			var a = new Date();
			console.log("All Start:"+a.getMinutes()+":"+a.getSeconds()+"."+a.getMilliseconds());
			var icheckboxlength = $("#receiverList-GRP").find("input[id^='Grp_cbSel']").length;

			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#receiverList-GRP").find("input[id^='Grp_cbSel']")[i].checked)
					arCheckedIdx[arCheckedIdx.length] = i+1;//此處儲存XML的INDEX
			}
			if(arCheckedIdx.length==0)
			{
				alert('請至少勾選一筆資料進行修改！');
				return;
			}
			var strxmlIssue = $("#Grp_dlGrpIssueType").val();
			var strIssue = $("#Grp_dlGrpIssueType option:selected").text();
			var strxmlAttch = $("#Grp_dlGrpIsAttch").val();
			var strAttch = $("#Grp_dlGrpIsAttch option:selected").text();

			if(jf_DeptTrim(strIssue+strAttch) == "")
			{
				alert("請至少選擇一修改項目！");
				return;
			}
			//修正發文方式轉換BUG
			if(strIssue!="")
				//1110816	Joe		--		修正批次修改發文方式異常的問題
				// strIssue = fnchangeIssueButton(strIssue);
				strIssue = fnchangeIssueButton(strxmlIssue);
			for(var item=0;item<arCheckedIdx.length;item++)
			{
				if(strIssue!="")
				{
					//設定畫面
					$("#receiverList-GRP").find("input[id^='Grp_dldocissuetypeGrp_']").eq(arCheckedIdx[item]-1).val(strIssue);
					//設定XML
					//1050818	Leslie	協助修改IE支援問題
					//gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+arCheckedIdx[item]+"']").find("發文方式").text(strxmlIssue);
					//1100817 David 1090610 修正批次設定異常問題
					//fnSetTextOfElement(gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+arCheckedIdx[item]+"']").find("發文方式"),strxmlIssue);
					var XmlSeq = arCheckedIdx[item];
					if(bGrpPage)
					{
						var iPageNow = parseInt($("#GrpPagr_txPageNow").val());
						if(iPageNow > 1)
							XmlSeq = (iPageNow-1)*100 + parseInt(arCheckedIdx[item]) + "";
					}
					fnSetTextOfElement(gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+XmlSeq+"']").find("發文方式"),strxmlIssue);
				}
				if(strAttch!="")
				{
					//設定畫面
					$("#receiverList-GRP").find("input[id^='Grp_dlGrpAttch_']").eq(arCheckedIdx[item]-1).val(strAttch);
					//設定XML
					//1050818	Leslie	協助修改IE支援問題
					//gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+arCheckedIdx[item]+"']").find("含附件").text(strxmlAttch);
					//1100817 David 1090610 修正批次設定異常問題
					//fnSetTextOfElement(gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+arCheckedIdx[item]+"']").find("含附件"),strxmlAttch);
					var XmlSeq = arCheckedIdx[item];
					if(bGrpPage)
					{
						var iPageNow = parseInt($("#GrpPagr_txPageNow").val());
						if(iPageNow > 1)
							XmlSeq = (iPageNow-1)*100 + parseInt(arCheckedIdx[item]) + "";
					}
					fnSetTextOfElement(gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+XmlSeq+"']").find("含附件"),strxmlAttch);

					//1070529	Cloud	1070183		新增附件分繕功能-異動過清除群組內受文者分繕表
					//1080312 David 1080089 調整紀錄異動的資料邏輯
					//g_arrmailMergeClearDept.push(gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+arCheckedIdx[item]+"']").find("正式名稱").text());
					var GrpDeptOrderNo = gindexOfGrp + "_" + arCheckedIdx[item];
					var pDeptDullName = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").find("全銜").text();
					var pDeptName = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").find("正式名稱").text();
					var pDeptEmpName = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").find("姓名").text();
					var pDeptSeqNo = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").attr("編號");

					setGrpMailMergeModify("1", pDeptSeqNo, pDeptDullName, pDeptName, pDeptEmpName);

					//1140728 David 1140381 異動既有受文者是否含附件時，設定附件分繕異動旗標
					gdmObj.needSaveDispatchAtt(true);
				}
			}
			
			$("#receiverList-GRP").find("input[id^='Grp_cbSel']").prop("checked",false);
			$("#Grp_dlGrpIssueType").val("");
			$("#Grp_dlGrpIsAttch").val("");
			gGrpCount++;
			//1060906 	Cloud	1060763		增加有異動時，異動主視窗異動變數
			gChangeCnt++;
			//joetest
			a = new Date();
			console.log("All End:"+a.getMinutes()+":"+a.getSeconds()+"."+a.getMilliseconds());
		});
		
		//郵遞區號
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Grp_btZip").click(function() {
		$("#Grp_btZip").on("click", function() {
			window.open("http://www.post.gov.tw/post/internet/f_searchzone/index.jsp?ID=190102");
		});
		//列印群組編輯子視窗
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $("#Grp_btGrpPrint").click(function() {
		$("#Grp_btGrpPrint").on("click", function() {
			fnPrintGrpList();
		});
		//1100309 David 1090610 新增上下頁及跳至功能
		//下頁
		$("#Grp_btPageNext").on("click", function() {
			var iPageNow = parseInt($("#GrpPagr_txPageNow").val());
			var iPageAll = parseInt($("#GrpPagr_txPageAll").val());
			//檢核是否已最末頁
			if(iPageNow == iPageAll)
			{
				alert("已無下一頁");
				return;
			}
			var iNextPage = iPageNow+1;

			$("#GrpPagr_txPageNow").val(iNextPage);
			//設定本頁範圍
			var iStart = iPageNow*100;
			var iEnd = iNextPage*100;
			if(iEnd+1 > iGrpIssueCount)
				iEnd = iGrpIssueCount

			$dlg.find("#receiverList-GRP").children().remove();//清空畫面
			//從對應筆數開始設定至畫面上

			for(var i = iStart ; i < iEnd ; i++)
			{
				var nTarget = gGrpDeptNode.children("已刪除,受文者")[i];
				doPopulateForGrp(i, nTarget);
			}
			
			$("#GrpDiv").scrollTop(0);//將捲動拉至最上面
		});
		//上頁
		$("#Grp_btPagePrev").on("click", function() {
			var iPageNow = parseInt($("#GrpPagr_txPageNow").val());
			//檢核是否為第一頁
			if($("#GrpPagr_txPageNow").val() == 1)
			{
				alert("已至第一頁");
				return;
			}
			var iPrevPage = iPageNow-1;

			$("#GrpPagr_txPageNow").val(iPrevPage);
			//設定本頁範圍
			var iEnd = iPrevPage*100;
			var iStart = 0;
			if(iPrevPage > 1)
				iStart = (iPrevPage-1)*100;

			$dlg.find("#receiverList-GRP").children().remove();//清空畫面
			//從對應筆數開始設定至畫面上
			for(var i = iStart ; i < iEnd ; i++)
			{
				var nTarget = gGrpDeptNode.children("已刪除,受文者")[i];
				doPopulateForGrp(i, nTarget);
			}
			$("#GrpDiv").scrollTop(0);//將捲動拉至最上面
		});
		//跳至
		$("#Grp_btPageTo").on("click", function() {
			var r = /^[0-9]*[1-9][0-9]*$/;//正整數
			if(!r.test($("#GrpPagr_txPageTo").val()))
			{
				alert("請輸入有效數頁數");
				$("#GrpPagr_txPageTo").val("");
				return;
			}
			var iPageTo = parseInt($("#GrpPagr_txPageTo").val());
			var iPageNow = parseInt($("#GrpPagr_txPageNow").val());
			var iPageAll = parseInt($("#GrpPagr_txPageAll").val());
			if(iPageTo == iPageNow)
			{
				alert("目前已為第" + iPageTo + "頁");
				$("#GrpPagr_txPageTo").val("");
				return;
			}
			else if(iPageTo > iPageAll)
			{
				alert("請輸入有效數頁數");
				$("#GrpPagr_txPageTo").val("");
				return;
			}
			$("#GrpPagr_txPageNow").val(iPageTo);//設定目前頁數

			//設定本頁範圍
			var iEnd = iPageTo*100;
			if(iEnd+1 > iGrpIssueCount)
				iEnd = iGrpIssueCount
			var iStart = 0;
			if(iPageTo > 1)
				iStart = (iPageTo-1)*100;

			$dlg.find("#receiverList-GRP").children().remove();//清空畫面
			//從對應筆數開始設定至畫面上
			for(var i = iStart ; i < iEnd ; i++)
			{
				var nTarget = gGrpDeptNode.children("已刪除,受文者")[i];
				doPopulateForGrp(i, nTarget);
			}
			$("#GrpPagr_txPageTo").val("");
			$("#GrpDiv").scrollTop(0);//將捲動拉至最上面
		});
		//************************************************************註冊事件****************************************************//
		gGrpBInit = true;
	}
	//建立群組子視窗上方的發文選單
	//1110225 David 1101481 調整發文方式選單處理邏輯
	/*$("#Grp_dlGrpIssueType").children().remove();
	$("#Grp_dlGrpIssueType").append("<OPTION value=''></OPTION>"+sendWays);*/
	fngolSetGrpdlDocIssueType("Grp","","","","","Grp_dlGrpIssueType");
	//1110816	Joe		--		修正空白選單順序
	//$("#Grp_dlGrpIssueType").append("<OPTION value=''></OPTION>");
	$("#Grp_dlGrpIssueType").prepend("<OPTION value=''></OPTION>");
	$("#Grp_dlGrpIssueType")[0].selectedIndex = 0;
}
		
//初始設定畫面
function fnsetGrpTablaColumn(argobj,argWith,argval,argId,argTagName)
{
	//1080312 David 1080089 新增姓名及全銜欄位事件註冊處理
	if(argTagName=="全銜" || argTagName=="姓名")
	{
		if(g_mailMergeCont!=0 )//有分繕表，才觸發處理
		{
			//1081008	Joe		1080339		jQuery升級3.4.1
			// argobj.bind("change",function(envnt) {
			argobj.on("change",function(envnt) {
				var arrEventId = event.target.id.split('_');
				var GrpDeptOrderNo = arrEventId[2] + "_" + (parseInt(arrEventId[3])+1).toString();
				var pDeptDullName = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").find("全銜").text();
				var pDeptName = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").find("正式名稱").text();
				var pDeptEmpName = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").find("姓名").text();
				var pDeptSeqNo = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").attr("編號");

				setGrpMailMergeModify("2", pDeptSeqNo, pDeptDullName, pDeptName, pDeptEmpName);
			});
		}
	}

	if(argTagName=="正式名稱")
	{
		var Title="";
		if(strDLGUseTrace=="Y")
		{
			var TitleInfo =argval.split('|');
			Title = argval = TitleInfo[0];
			if(TitleInfo[1]!="")
				Title += " 建立者："+TitleInfo[1];
			if(TitleInfo[2]!="")
				Title += " 刪除者："+TitleInfo[2];
		}
		else
		{
			Title = argval = argval.split('|')[0];
		}

		argobj.css("width", argWith).val(argval).attr("id",argId).attr('title',Title)
		//1081008	Joe		1080339		jQuery升級3.4.1
		// .bind("click",function(envnt) {fnGrpOpenModifyWin(event.target.id,"1");});
		.on("click",function(envnt) {fnGrpOpenModifyWin(event.target.id,"1");});
		//1070529 Cloud 107183 新增分繕
	//1080312 David 1080089 調整邏輯
	//gGepDeptName = argval;
	}
	else if(argTagName=="選" || argTagName=="刪" || argTagName=="受")
	{
		//選為群組子視窗選CHECCKBOX / 刪為群組內已被刪除受文者，要設定刪CHECKED /受為 不設定CHECKED
		var cObj = argobj.css("width", argWith).val(argval).attr("id",argId);
		if(argTagName=="刪")
			//1081008	Joe		1080339		jQuery升級3.4.1
			// cObj.prop("checked",true).bind("click",function(envnt) {fnGrpDelCheck(event.target.id);});
			cObj.prop("checked",true).on("click",function(envnt) {fnGrpDelCheck(event.target.id);});
		else if(argTagName=="受")
			//1081008	Joe		1080339		jQuery升級3.4.1
			// cObj.bind("click",function(envnt) {fnGrpDelCheck(event.target.id);});
			cObj.on("click",function(envnt) {fnGrpDelCheck(event.target.id);});
	}
	else
	{
		if(argTagName=="序")
			argobj.css("width", argWith).text(argval).attr("id",argId);
		else
		{
			//1110225 David 1101481 修改發文方式UI，調整邏輯
			//if(argTagName=="發文方式" ||argTagName=="含附件")
			if(argTagName=="含附件")
			{
				var obj = gIsAttch;
				var objValue = gIsAttch;

				//1110225 David 1101481 修改發文方式UI，調整邏輯
				/*if(argTagName=="發文方式")
				{
					argval = fnchangeIssueButton(argval);
					obj = gIssueBt;
					objValue = gIssueTypeSort;
				}*/
				//1070529 Cloud 1070183 分繕顯示附件摘要屬性-S
				if(g_mailMergeCont!=0 && argTagName=="含附件")//附件有分繕
				{
					var dept_AttDescList = "";
					//取得受文者是第幾個
					//1080312 David 1080089 調整判斷方式
					//var AttDescIndex = g_mailMerge.find("受文者",gGepDeptName);
					var arrEventId = argId.split('_');
					var GrpDeptOrderNo = arrEventId[2] + "_" + (parseInt(arrEventId[3])+1).toString();
					var pDeptDullName = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").find("全銜").text();
					var pDeptName = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").find("正式名稱").text();
					var pDeptEmpName = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").find("姓名").text();
					var pDeptSeqNo = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").attr("編號");
					g_mailMergeDept ={
						"name": pDeptDullName
						,"fullName": pDeptName
						,"userName": pDeptEmpName
						,"sn": pDeptSeqNo
					}
					var AttDescIndex = g_mailMerge.find2("受文者",g_mailMergeDept);

					if(AttDescIndex!=-1)//取得附件分繕資訊
					{
						var arrAttDescList = g_mailMerge.getAtt(AttDescIndex);//取得受文者所有分繕附件
						if(arrAttDescList != null){	
							for(var ai = 0;ai < arrAttDescList.length;ai++){
								if(ai==0)
									dept_AttDescList += arrAttDescList[ai].desc;
								else
									dept_AttDescList += "、"+arrAttDescList[ai].desc;
							}
							argobj.attr("title",dept_AttDescList);
						}
					}
				}
				//1070529 Cloud 1070183 分繕顯示附件摘要屬性-E
				argobj.css("width", argWith).val(argval).attr("id",argId)
				//1081008	Joe		1080339		jQuery升級3.4.1
				// .css("background-color", "hsla(0, 0%, 0%, 0)").bind("click",function(envnt) {fnGrpSetDocSendWay(obj,objValue,event.target.id,argTagName);});
				.css("background-color", "hsla(0, 0%, 0%, 0)").on("click",function(envnt) {fnGrpSetDocSendWay(obj,objValue,event.target.id,argTagName);});
			}
			//1110225 David 1101481 修改發文方式UI，調整邏輯
			else if(argTagName=="發文方式")
			{
				argval = fnchangeIssueButton(argval);
				obj = gIssueBt;
				objValue = gIssueTypeSort;

				argobj.css("width", argWith).val(argval).attr("id",argId).css("background-color", "hsla(0, 0%, 0%, 0)")
				.on("click",function(envnt) {fnSetGrpIssueList(obj,objValue,event.target.id,argTagName);});
			}

			//1100128	Joe		1090608		修正郵遞區號為6碼--S
			if(argTagName=="郵遞區號")
				argobj.attr('maxlength','6');
			//1100128	Joe		1090608		修正郵遞區號為6碼--E
			argobj.css("width", argWith).val(argval).attr("id",argId)
			//1081008	Joe		1080339		jQuery升級3.4.1
			// .bind("change",function(envnt) {fnSetGrpDeptInfo(event.target.id,argTagName,event.target.value);});
			.on("change",function(envnt) {fnSetGrpDeptInfo(event.target.id,argTagName,event.target.value);});
		}
	}
}
//開啟修改子視窗
function fnGrpOpenModifyWin(argID,argMode)
{
	//1141229 David 1141432 外貿不提供單筆修正視窗
	if(strOrgNickName == "TAITRA")
		return;
	fnOpenModeOrg(argID,argMode,gGrpDeptNode,grptheuserinfo,gGrpWebServices,gGrpSso,"Org");//傳入參數argMode判斷是由群組還是單編輯子視窗開啟
}
//將畫面異動資訊設定至XML物件
function fnSetGrpDeptInfo(argId,argTagName,argVal)
{
	//1050818	Leslie	修改有已刪除的bug
	//var index = argId.split("_")[3];//使用eq尋找是0開始，因此不用++直接就是XML內對應的序
	var sTmp = argId.split("_");
	var sFindNum = sTmp[2]+"_"+(parseInt(sTmp[3])+1);
	
	//1050818	Leslie	協助修改IE支援問題，一併修掉Bug
	//gGrpDeptNode.find(">受文者").eq(index).children(argTagName).text(jf_DeptTrim(argVal));
	fnSetTextOfElement(gGrpDeptNode.find(">受文者[序='"+sFindNum+"']").children(argTagName),jf_DeptTrim(argVal));
	gGrpCount++;
	//1060906 	Cloud	1060763		增加有異動時，異動主視窗異動變數
	gChangeCnt++;
}
//勾選刪除
function fnGrpDelCheck(argEventId)
{
	var index = argEventId.split("_")[3];//畫面
	var xmlseq = index;
	xmlseq++;
	if($("input#"+argEventId).prop("checked"))//勾選刪除
	{
		//1050818	Leslie	協助修改IE支援問題
		//gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+xmlseq+"']").wrap("<已刪除 序='"+gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+xmlseq+"']").attr("序")+"' 本別='"+gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+xmlseq+"']").attr("本別")+"' ></已刪除>");//於受文者建立<已刪除></已刪除>節點
		//gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+xmlseq+"']").children().unwrap();//再把<受文者></受文者>移除
		fnWrap(gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+xmlseq+"']"),"已刪除");
		//1050818	Leslie	協助修改IE支援問題	--END--
		$("input#Grp_cbSel_"+argEventId.split("_")[2]+"_"+index).prop("checked",false);//取消勾選
		fngrpSetColumn(argEventId,index,"Readonly");
	}
	else//取消刪除
	{
		//1050818	Leslie	協助修改IE支援問題
		//gGrpDeptNode.find("已刪除[序='"+gindexOfGrp+"_"+xmlseq+"']").wrap("<受文者 序='"+gGrpDeptNode.find("已刪除[序='"+gindexOfGrp+"_"+xmlseq+"']").attr("序")+"' 本別='"+gGrpDeptNode.find("已刪除[序='"+gindexOfGrp+"_"+xmlseq+"']").attr("本別")+"' ></受文者>");//於受文者建立<已刪除></已刪除>節點
		//gGrpDeptNode.find("已刪除[序='"+gindexOfGrp+"_"+xmlseq+"']").children().unwrap();//再把<已刪除></已刪除>移除
		fnWrap(gGrpDeptNode.find("已刪除[序='"+gindexOfGrp+"_"+xmlseq+"']"),"受文者");
		//1050818	Leslie	協助修改IE支援問題	--END--
		fngrpSetColumn(argEventId,index,"Nomal");
	}
}
//受文者修改子視窗回傳
function fnRestGrpDept(argSeq,argXmlDom)
{
	$("#receiverSetting").find(".ui-slide-pane-ModeOrg").removeClass("ui-slide-pane-active");//隱藏修改子視窗
	$("#receiverSetting").find(".ui-slide-pane-ModeOrg").css("width","100%");//隱藏修改子視窗
	$("#receiverSetting").find(".ui-slide-pane-GRP").css("opacity","");//隱藏原主子視窗
	if(argSeq!=null && argXmlDom!=null)
	{
		$("#Grp_lbOrgnameGrp_"+argSeq).val(argXmlDom.find("正式名稱").text());
		$("#Grp_txEmpNameGrp_"+argSeq).val(argXmlDom.find("姓名").text());
		$("#Grp_txOrgFullNameGrp_"+argSeq).val(argXmlDom.find("全銜").text());
		$("#Grp_dlGrpAttch_"+argSeq).val(argXmlDom.find("含附件").text());
		$("#Grp_dldocissuetypeGrp_"+argSeq).val(fnchangeIssueButton(argXmlDom.find("發文方式").text()));
		$("#Grp_txPostNoGrp_"+argSeq).val(argXmlDom.find("郵遞區號").text());
		$("#Grp_txAddressGrp_"+argSeq).val(argXmlDom.find("地址").text());
		$("#Grp_txEmailGrp_"+argSeq).val(argXmlDom.find("Email").text());
		gGrpCount++;
		//1060906 	Cloud	1060763		增加有異動時，異動主視窗異動變數
		gChangeCnt++;
	}
}
//以受文者狀態設定畫面
function fngrpSetColumn(argCbID,argIndex,argMode)
{
	//1100309 David 1090610 如啟用分頁功能，argIndex需調整為畫面對應序號
	if(bGrpPage)
	{
		var iPageNow = parseInt($("#GrpPagr_txPageNow").val());
		if(iPageNow > 1)
			argIndex = argIndex - ((iPageNow-1)*100);
	}

	if(argMode=="Readonly")
	{	
		//1080903	Joe		1080339		jQuery升級2.2.4
		// $("#receiverList-GRP").find("li.ui-table-item-PC").eq(argIndex).find("INPUT[id!='"+argCbID+"']").attr("Readonly",true).css("opacity","0.4").css('pointer-events', 'none');
		$("#receiverList-GRP").find("li.ui-table-item-PC").eq(argIndex).find("INPUT[id!='"+argCbID+"']").prop("Readonly",true).css("opacity","0.4").css('pointer-events', 'none');
		//$("#receiverList-GRP").find("li.ui-table-item-PC").eq(argIndex).find("SELECT").attr("disabled",true).css("opacity","0.4");
	}
	else
	{
		//1080903	Joe		1080339		jQuery升級2.2.4
		// $("#receiverList-GRP").find("li.ui-table-item-PC").eq(argIndex).find("INPUT[id!='"+argCbID+"']").attr("Readonly",false).css("opacity","").css('pointer-events', '');
		$("#receiverList-GRP").find("li.ui-table-item-PC").eq(argIndex).find("INPUT[id!='"+argCbID+"']").prop("Readonly",false).css("opacity","").css('pointer-events', '');
		//$("#receiverList-GRP").find("li.ui-table-item-PC").eq(argIndex).find("SELECT").attr("disabled",false).css("opacity","");
	}
	gGrpCount++;
	//1060906 	Cloud	1060763		增加有異動時，異動主視窗異動變數
	gChangeCnt++;
}
function fnGrpCheckBeforeSave()
{
	if(gGrpDeptNode.find("受文者").length == 0)
	{
		alert("您最多只能將 "+($("#receiverList-GRP").find("li.ui-table-item-PC").length-1)+" 筆資料設定為刪除");
		return false;
	}
	var strErr="";
	var node;
	var Name;
	var IssueType;
	for(var nNode=0;nNode<gGrpDeptNode.find("受文者").length;nNode++)
	{
		node = gGrpDeptNode.find("受文者").eq(nNode);
		IssueType = node.find("發文方式").text();
		Name = node.find("正式名稱").text();
		var Seq = node.attr("序").split('_')[1];//1100309 David 1090610 紀錄序號
		Name = "序" + Seq + " " +  Name;
		
		if(IssueType == "電子交換" && node.find("機關代碼").text().length!=10)
			strErr +=  Name+ ' 無交換代碼 發文方式不可為電子交換\n';
		if(strOdSupportEmail != "N")
		{
			if(IssueType== '電子郵件')	
			{
				if(strOdSupportEmail == "I" && node.find("內部").text() == "N")
					strErr += "目前僅提供內部受文者使用電子郵件發文，請修正"+Name+ " 的發文方式 \n";
				else if(strOdSupportEmail == "O" && node.find("內部").text() == "Y")
					strErr += "目前僅提供外部受文者使用電子郵件發文，請修正"+Name+ " 的發文方式 \n";
				else if(jf_DeptTrim(node.find("Email").text()) == "")
					strErr += Name+ ' 發文方式為電郵，電子郵件不可空白 \n';
			}
		}

		//1141202 David 1141306 新增依Data檔設定進行郵遞區號檢核
		let PostNo = node.find("郵遞區號").text();
		if (PostNo == '')
		{
			if((IssueType == '人工傳遞' || IssueType == '機關間人工交換' || IssueType == '機關內函件傳遞') && gCheckPostNo[0])
				strErr += Name + ' 郵遞區號不可為空白 \n';
			else if(IssueType == '郵寄' && gCheckPostNo[1])
				strErr += Name + ' 郵遞區號不可為空白 \n';
			else if(IssueType == '電子交換' && gCheckPostNo[2])
				strErr += Name + ' 郵遞區號不可為空白 \n';
		}

		//1141202 David 1141306 新增依Data檔設定進行地址檢核
		//if (IssueType == '郵寄' && node.find("地址").text()== '')
			//strErr += Name + ' 發文方式為郵寄 地址不可空白 \n';
		let Address = node.find("地址").text();
		if (Address == '')
		{
			if((IssueType == '人工傳遞' || IssueType == '機關間人工交換' || IssueType == '機關內函件傳遞') && gCheckAddress[0])
				strErr += Name + ' 地址不可為空白 \n';
			else if(IssueType == '紙本' && gCheckAddress[1])
				strErr += Name + ' 地址不可為空白 \n';
			else if(IssueType == '電子交換' && gCheckAddress[2])
				strErr += Name + ' 地址不可為空白 \n';
		}

		if(gHasOs)
		{
			if(IssueType == '海外發文' && node.find("海外單位").text() == "0")
			{
				//1141110 David 1141112 海外發文支援外貿使用，調整文字
				//strErr += Name + " 不為海外單位，不可使用海外發文 \n";
				strErr += Name + " 不為" + gOsIssueBtName + "單位，不可使用" + gOsIssueTypeSort + " \n";
			}
		}
		//1110225 David 1101481 新增個人專區檢核
		if(bUsePersonal)
		{
			if(IssueType== '個人專區' && node.find("內部").text() == "N" && node.find("內部").text() == "否")
				strErr += "目前僅提供內部受文者使用個人專區發文，請修正"+Name+ " 的發文方式 \n";
		}
	}
	if (strErr != "")
	{
		alert("群組內 受文者資訊有下列錯誤 請修正\n"+strErr);
		return false;
	}
	return true;
}
function fnGrpSetDocSendWay(argObj,argValueObj,argID,argTagName)
{
	var argIdx = argID.split("_")[3];
	argIdx++;
	argIdx = argID.split("_")[2]+"_"+argIdx;

	var strDisWord = "";
	var value = $("#"+argID).val();

	//1110225 David 1101481 發文方式獨立處理，移除fngolGetDocSendWay內切換發文方式邏輯
	/*//取得是否為內部單位or人員
	var IsInside = gGrpDeptNode.find("受文者[序='"+argIdx+"']").find("內部").text();

	if (strHasTB != 1)
	{
		strDisWord += "內部";
	}
	
	//支援電子郵件發文 
	if(strOdSupportEmail=="N" || (strOdSupportEmail == "I" && IsInside == "N") || (strOdSupportEmail == "O" && IsInside == "Y"))
		strDisWord += "電郵";

	if(pSendType=="紙本公文")
	{
		for(var iType=0;iType<gIssueBt.length;iType++)
		{
			if(gIssueSendType[iType] != "紙本")
				strDisWord += gIssueBt[iType]
		}
	}
	if(IsInside == "N")
		strDisWord += "內部";

	if(gHasOs!="Y")
		strDisWord += "海外";
	else
	{
		var IsOverSea = gGrpDeptNode.find("受文者[序='"+argIdx+"']").find("海外單位").text();
		if(IsOverSea == "0" || IsOverSea == "")
			strDisWord += "海外";
	}
	if(gGrpDeptNode.find("受文者[序='"+argIdx+"']").find("機關代碼").text()=="")
		strDisWord += "電子";*/
	
	var j=0,k=0;
	for(var i=0;i<argObj.length;i++)
	{
		var tmp = argObj[i];
		//重新循環
		j=(i==argObj.length-1)?0:i+1;

		//先找到目前的是哪一個
		if (value == tmp)
		{
			//取得下一個選項且為可用的
			//若j+k超過index大小，要重新循環
			//1110225 David 1101481 發文方式獨立處理，移除fngolGetDocSendWay內切換發文方式邏輯
			/*while(strDisWord.indexOf(argObj[j+k]) != -1 && strDisWord != "")
			{
				k++;
				//若j+k超過index大小，要重新循環
				if (j+k > argObj.length-1)
					k = 0-j;
			}*/
			//若j+k超過index大小，要重新循環
			if (j+k > argObj.length-1)
				k = 0-j;	
			$("#"+argID).val(argObj[j+k]);
			//設定至XML物件內
			//1050818	Leslie	協助修改IE支援問題
			//gGrpDeptNode.find("受文者[序='"+argIdx+"']").find(argTagName).text(argValueObj[j+k]);
			fnSetTextOfElement(gGrpDeptNode.find("受文者[序='"+argIdx+"']").find(argTagName),argValueObj[j+k]);
			gGrpCount++;
			//1060906 	Cloud	1060763		增加有異動時，異動主視窗異動變數
			gChangeCnt++;
			//1070529 Cloud 1070183 新增附件分繕功能-不管是否皆清除分繕表-S
			if(argTagName=="含附件")
			{
				//1080312 David 1080089 調整紀錄異動的資料邏輯
				//g_arrmailMergeClearDept.push(document.all["Grp_lbOrgnameGrp_"+argID.split('_')[2]].value);
				var arrEventId = argID.split('_');
				var GrpShowDeptOrderNo = arrEventId[2] + "_" + arrEventId[3];
				var GrpDeptOrderNo = arrEventId[2] + "_" + (parseInt(arrEventId[3])+1).toString();

				var pDeptDullName = document.all["Grp_txOrgFullNameGrp_"+GrpShowDeptOrderNo].value;
				var pDeptName = document.all["Grp_lbOrgnameGrp_"+GrpShowDeptOrderNo].value;
				var pDeptEmpName = document.all["Grp_txEmpNameGrp_"+GrpShowDeptOrderNo].value;
				var pDeptSeqNo = gGrpDeptNode.find("受文者[序='"+GrpDeptOrderNo+"']").attr("編號");

				setGrpMailMergeModify("1", pDeptSeqNo, pDeptDullName, pDeptName, pDeptEmpName);
				//1140728 David 1140381 異動既有受文者是否含附件時，設定附件分繕異動旗標
				gdmObj.needSaveDispatchAtt(true);
			}
			//1070529 Cloud 1070183 新增附件分繕功能-不管是否皆清除分繕表-E
			break;
		}
	}	
}
//列印群組清單
function fnPrintGrpList()
{
	var ndOrgList = gGrpDeptNode.find("受文者");
	var arPageparam = new Array();
	var ParaIdx = 0;
	
	for (var i = 0 ; i < ndOrgList.length ; i++)
	{
		var pFullName	= ndOrgList.eq(i).find("正式名稱").text();
		var pZip		= ndOrgList.eq(i).find("郵遞區號").text();
		var pAddress	= ndOrgList.eq(i).find("地址").text();
		var pIssueType	= ndOrgList.eq(i).find("發文方式").text();
		var pAttch		= ndOrgList.eq(i).find("含附件").text();
		var pEmpName	= ndOrgList.eq(i).find("姓名").text();
		
		arPara = new Array(6);
		arPara[0] = pFullName;
		arPara[1] = pZip;
		arPara[2] =	pAddress;
		arPara[3] = pIssueType;
		arPara[4] = pAttch;
		//1071203	Joe		--		修正群組報表漏傳姓名的問題
		arPara[5] = pEmpName;
		arPageparam[ParaIdx++] = arPara;
	}
	var params = new SOAPClientParameters();
	params.add('argPageString',arPageparam);
	params.add('argArtifact', grptheuserinfo.Artifact);
	params.add('argMode', "Dlg_Grp");
	SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "PrintGrpList", params, false,function(r)
	{
		if(r.value.ErrorClass.IsErr==false)
		{
			window.open(r.value.Url);
		}
		else
		{
			alert('產生群組清單發生異常：'+r.value.ErrorClass.StackTrace);
		}
	});
}

//1050818	Leslie	協助修改IE支援問題
function fnWrap(objElement, newNodeName)
{
	//gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+xmlseq+"']").wrap("<已刪除 序='"+gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+xmlseq+"']").attr("序")+"' 本別='"+gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+xmlseq+"']").attr("本別")+"' ></已刪除>");//於受文者建立<已刪除></已刪除>節點
	//gGrpDeptNode.find("受文者[序='"+gindexOfGrp+"_"+xmlseq+"']").children().unwrap();//再把<受文者></受文者>移除
	
	var docElement = gGrpDeptNode.get(0).ownerDocument;
	var newNode = docElement.createElement(newNodeName);
	var domElement = objElement.get(0);
	
	//copy 所有Attribute
	for(var i=0,maxAttrIdx = domElement.attributes.length;i<maxAttrIdx;i++){
		newNode.setAttribute(domElement.attributes[i].name,domElement.attributes[i].value);
	}
	
	//copy 所有的子節點
	var cloneNodeList = objElement.children().clone();
	for(var i=0,maxIdx = cloneNodeList.length;i<maxIdx;i++)
		$(newNode).append(cloneNodeList[i]);
	//新建立的Node，塞在自己的前面
	domElement.parentNode.insertBefore(newNode,domElement);
	//再把自己砍了~~
	$(domElement).remove();
	gGrpCount++;
	//1060906 	Cloud	1060763		增加有異動時，異動主視窗異動變數
	gChangeCnt++;
}

function fnSetTextOfElement(objElement,textValue)
{
	for(var i=0,maxIdx = objElement.length;i<maxIdx;i++){
		var u = objElement.get(i);
		if("text" in u)
			u.text = textValue;
		else
			u.textContent = textValue;
	}
	return objElement;	//把傳進來的物件再回傳出去，方便再接著呼叫其他JQuery功能
}

//1080312 David 1080089 新增群組異動分繕表資訊記錄物件處理
function setGrpMailMergeModify(argType, argDeptSeqNo, argDeptFullName, argDeptName, argDeptEmpName)
{
	/*
	argType = 1：清除附件分繕資訊
	argType = 2：異動分繕表受文者姓名或全銜
	*/
	var AnotherType = "1";
	if(argType == "1")
		AnotherType = "2";

	//1090529	Joe		1090362		因IE不支援.find()，修改使用For迴圈處理--S
	// var HasTargetObj = gGrpMailMergeModify.find(function(item){
		// return (item.Type == argType && item.DeptSeqNo == argDeptSeqNo);
	// });
	var HasTargetObj = arrayFind(gGrpMailMergeModify, function(item) {
		return (item.Type == argType && item.DeptSeqNo == argDeptSeqNo);
	});
	//1090529	Joe		1090362		因IE不支援.find()，修改使用For迴圈處理--E

	if(HasTargetObj == undefined)//未紀錄過要清除或異動時，才進行紀錄
	{
		//1090529	Joe		1090362		因IE不支援.find()，修改使用For迴圈處理--S
		// var HasAnotherObj = gGrpMailMergeModify.find(function(item){
			// return (item.Type == AnotherType && item.DeptSeqNo == argDeptSeqNo);
		// });
		var HasAnotherObj = arrayFind(gGrpMailMergeModify, function(item) {
			return (item.Type == AnotherType && item.DeptSeqNo == argDeptSeqNo);
		});
		//1090529	Joe		1090362		因IE不支援.find()，修改使用For迴圈處理--E

		if(HasAnotherObj != undefined)//另一類型有記錄過時，依該紀錄的分繕INDEX紀錄
		{
			var MailMergeObj ={
				"Type": argType
				,"DeptSeqNo": argDeptSeqNo
				,"MailMergeIndex": HasAnotherObj.MailMergeIndex
			}

			gGrpMailMergeModify.push(MailMergeObj);
		}
		else
		{
			//未記錄過要異動時，至分繕表取得的INDEX紀錄
			var ChangeNameObj ={
				"name": argDeptFullName
				,"fullName": argDeptName
				,"userName": argDeptEmpName
				,"sn": argDeptSeqNo
			}
			var ChangeIndex = g_mailMerge.find2("受文者", ChangeNameObj);
			if(ChangeIndex != -1)
			{
				var MailMergeObj = {
					"Type" : argType
					,"DeptSeqNo" : argDeptSeqNo
					,"MailMergeIndex" : ChangeIndex
				}

				gGrpMailMergeModify.push(MailMergeObj);
			}
		}
	}
}

//1090529	Joe		1090362		因IE不支援.find()，修改使用For迴圈處理--S
function arrayFind(arr, callback) {
	for (var i = 0; i < arr.length; i++)
	{
		var match = callback(arr[i]);
		if (match)
			return arr[i];
	}
}
//1090529	Joe		1090362		因IE不支援.find()，修改使用For迴圈處理--E

//1110225 David 1101481 新增發文方式選單內容
function fnSetGrpIssueList(argObj,argValueObj,argID,argTagName)
{
	var arrIssueList = new Array();
	for(let i = 0 ; i < argObj.length ; i++)
	{
		let strIssueType = argObj[i] + " ";//選單內容後面+空白，方便autocomplete可帶出所有選項
		if(!arrIssueList.includes(strIssueType))
			arrIssueList.push(strIssueType);
	}

	var argIdx = argID.split("_")[3];
	let strlistAreaId = "#Dept_GrpIssueTypeList_" + argID.split("_")[2]+"_"+ argIdx;
	argIdx++;
	argIdx = argID.split("_")[2]+"_"+argIdx;

	var strDisWord = "";
	var value = $("#"+argID).val();

	//取得是否為內部單位or人員
	var IsInside = activeDept.find("受文者[序='"+argIdx+"']").find("內部").text();

	if(strOrgNickName != "EXAM" && (strHasTB != 1 || IsInside != "Y"))
		strDisWord += "公布欄 ";

	//支援電子郵件發文 
	if(strOdSupportEmail=="N" || (strOdSupportEmail == "I" && IsInside == "N") || (strOdSupportEmail == "O" && IsInside == "Y"))
		strDisWord += "電子郵件 ";

	if(pSendType=="紙本公文")
	{
		for(var iType=0;iType<gIssueBt.length;iType++)
		{
			if(gIssueSendType[iType] != "紙本")
				strDisWord += gIssueBt[iType] + " ";
		}
	}

	if(gHasOs!="Y")
	{
		//1141110 David 1141112 海外發文支援外貿使用，調整文字
		//strDisWord += "海外 ";
		strDisWord += gOsIssueBtName + " ";
	}
	else
	{
		var IsOverSea = activeDept.find("受文者[序='"+argIdx+"']").find("海外單位").text();
		if(IsOverSea == "0" || IsOverSea == "")
		{
			//1141110 David 1141112 海外發文支援外貿使用，調整文字
			//strDisWord += "海外 ";
			strDisWord += gOsIssueBtName + " ";
		}
	}
	if(activeDept.find("受文者[序='"+argIdx+"']").find("機關代碼").text()=="")
	{
		strDisWord += "電子交換 ";
	}

	//新增依電子交換現況判斷能否使用電子發文方式
	if(activeDept.find("受文者[序='"+argIdx+"']").find("電子交換現況").length != 0 && activeDept.find("受文者[序='"+argIdx+"']").find("電子交換現況").text() != "T")
		strDisWord += "電子交換 ";

	//依參數及受文者內部單位代碼判斷能否使用個人專區發文方式
	if(!bUsePersonal || activeDept.find("受文者[序='"+argIdx+"']").find("內部單位代碼").text() == "")
		strDisWord += "個人專區 ";

	//過濾不可用的選項
	for( let i = arrIssueList.length-1; i >= 0; i--){ 
		if (strDisWord.indexOf(arrIssueList[i]) !== -1)
			arrIssueList.splice(i, 1);
	}

	//設定動態選單
	$("#" + argID).autocomplete({
		source:arrIssueList
		,appendTo:strlistAreaId
		,select: function(event,ui){
			ui.item.value = jf_DeptTrim(ui.item.value);
			fnSetTextOfElement(gGrpDeptNode.find("受文者[序='"+argIdx+"']").find(argTagName),fnChangeIssusTypeShowToXML(ui.item.value));
			gGrpCount++;
			gChangeCnt++;
		}
	}).autocomplete( "search", " " );
	
	$(strlistAreaId).find('ul').css("overflow","hidden");
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-GRP.js").finish();
})();
