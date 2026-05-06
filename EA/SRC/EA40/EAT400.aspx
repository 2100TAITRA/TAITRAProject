<%@ Page language="c#" Codebehind="EAT400.aspx.cs" AutoEventWireup="false" Inherits="EA40.EAT400" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT400 檔案清理範圍設定作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT400" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:DropDownList id="dlStoreNo" runat="server" CssClass="hide"></asp:DropDownList><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV class="DivBaseTable">
				<div id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label1" runat="server" CssClass="RequireField">清理批號：</asp:label></DIV>
						<DIV class="dTD" style="width: 30em; "><asp:textbox onkeypress="jf_UPPERCASE()" id="txPlanNo" tabIndex="1" runat="server" Width="5.5em" MaxLength="8" CssClass="RequireField" ></asp:textbox><asp:imagebutton id="btKeyHelp" tabIndex="-1" runat="server" ToolTip="提示計畫批號" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:imagebutton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<asp:label id="Label3" runat="server" >計畫狀態 ：</asp:label><asp:dropdownlist id="dlStatus" tabIndex="6" runat="server" >
								<asp:ListItem Value="0" Selected="True">清理範圍設定中</asp:ListItem>
								<asp:ListItem Value="1">產生明細待修正</asp:ListItem>
								<asp:ListItem Value="2">清理中</asp:ListItem>
								<asp:ListItem Value="3">紙質檔案完成數位內容待處理</asp:ListItem>
								<asp:ListItem Value="4">清理完成</asp:ListItem>
							</asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label2" runat="server" >批號說明：</asp:label></DIV>
						<DIV class="dTD" style="width: 16em; ">
							<asp:textbox id="txPlanDesc" tabIndex="11" runat="server" Width="20.5em"></asp:textbox>
						</DIV>
					</DIV>
					<FIELDSET style="WIDTH: 100%; HEIGHT: 100%"><LEGEND >清理工作內容</LEGEND>
						<DIV class="dTR">
							<DIV class="dTD">
								<asp:radiobuttonlist id="rbPlanType" runat="server" RepeatColumns="3" >
									<asp:ListItem Value="0" Selected="True">清查</asp:ListItem>
									<asp:ListItem Value="1">降解密</asp:ListItem>
									<asp:ListItem Value="2">銷毀</asp:ListItem>
									<asp:ListItem Value="3">移轉</asp:ListItem>
									<asp:ListItem Value="4">移交</asp:ListItem>
									<asp:ListItem Value="5">鑑定</asp:ListItem>
									<asp:ListItem Value="6">電子檔案，無法修復銷毀</asp:ListItem>
								</asp:radiobuttonlist>
							</DIV>
						</DIV>
					</FIELDSET>
					<FIELDSET style="WIDTH: 100%; HEIGHT: 100%"><LEGEND >清理範圍</LEGEND>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;"><asp:label id="Label6" runat="server" >年度：</asp:label></DIV>
							<DIV class="dTD">
								<asp:textbox onkeypress="jf_InpNumOnly()" id="txYearS" tabIndex="30" runat="server" Width="2em" MaxLength="3" ></asp:textbox>
								<asp:label id="Label4" runat="server" >至</asp:label>
								<asp:textbox onkeypress="jf_InpNumOnly()" id="txYearE" tabIndex="35" runat="server" Width="2em" MaxLength="3" ></asp:textbox>
							</DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;"><asp:label id="Label19" runat="server" >檔號 (起)：</asp:label></DIV>
							<DIV class="dTD">
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txClsS" tabIndex="35" runat="server" Width="8em"
									MaxLength="20" ></asp:textbox>－
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txCaseS" tabIndex="40" runat="server" Width="7.5em"
									MaxLength="12" ></asp:textbox>
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txCountryCodeS" tabIndex="41" runat="server" Width="2em"
									MaxLength="3" ></asp:textbox>
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txOfficeCodeS" tabIndex="42" runat="server" Width="2em"
									MaxLength="3" ></asp:textbox>
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txProductCodeS" tabIndex="43" runat="server" Width="2em"
									MaxLength="3" ></asp:textbox>－
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txVolS" tabIndex="45" runat="server" Width="2em"
									MaxLength="4" ></asp:textbox>
							</DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;"><asp:label id="Label20" runat="server" >檔號 (訖)：</asp:label></DIV>
							<DIV class="dTD">
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txClsE" tabIndex="60" runat="server" Width="8em"
									MaxLength="20" ></asp:textbox>－
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txCaseE" tabIndex="65" runat="server" Width="7.5em"
									MaxLength="12" ></asp:textbox>
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txCountryCodeE" tabIndex="66" runat="server" Width="2em"
									MaxLength="3" ></asp:textbox>
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txOfficeCodeE" tabIndex="67" runat="server" Width="2em"
									MaxLength="3" ></asp:textbox>
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txProductCodeE" tabIndex="68" runat="server" Width="2em"
									MaxLength="3" ></asp:textbox>－
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txVolE" tabIndex="70" runat="server" Width="2em"
									MaxLength="4" ></asp:textbox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">
								<asp:label id="lbStockText" runat="server" >櫥位號：</asp:label></DIV>
							<DIV class="dTD">
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txStockNoS" tabIndex="72" runat="server" Width="8em"
									 MaxLength="11"></asp:textbox>
								<asp:Label id="lbSeperate" runat="server">－ </asp:Label>
								<asp:textbox onkeypress="jf_UPPERCASE()" id="txStockNoE" tabIndex="73" runat="server" Width="8em"
									 MaxLength="11"></asp:textbox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">
								<asp:label id="Label21" runat="server" > 承辦單位：</asp:label></DIV>
							<DIV class="dTD">
								<asp:DropDownList id="dlDept" runat="server" ></asp:DropDownList></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;"><asp:label id="Label8" runat="server" Width="87px" >保存年限：</asp:label></DIV>
							<DIV class="dTD"><asp:textbox onkeypress="jf_InpNumOnly()" id="txKeepYearS" tabIndex="75" runat="server" Width="25px"
									MaxLength="2" ></asp:textbox><asp:label id="Label9" runat="server" >至</asp:label><asp:textbox onkeypress="jf_InpNumOnly()" id="txKeepYearE" tabIndex="80" runat="server" Width="25px"
									MaxLength="2" ></asp:textbox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;"><asp:label id="Label11" runat="server" >庫房代碼：</asp:label></DIV>
							<DIV class="dTD">
								<asp:textbox id="txStoreNo" tabIndex="85" runat="server" Width="8em" MaxLength="15" ></asp:textbox>
								<asp:imagebutton id="ibtStoreNo" tabIndex="-1" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"
									ToolTip="提示庫房代碼"></asp:imagebutton>
								<asp:TextBox id="txStoreName" runat="server" Width="18em" CssClass="DisplayOnly"></asp:TextBox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;"><asp:label id="Label10" runat="server" Width="89px" >機密等級：</asp:label></DIV>
							<DIV class="dTD"><asp:radiobuttonlist id="rbSecNo" runat="server" RepeatColumns="4"
									Height="6px" RepeatDirection="Horizontal">
									<asp:ListItem Value="1" Selected="True">普通</asp:ListItem>
									<asp:ListItem Value="2">密</asp:ListItem>
									<asp:ListItem Value="3">機密</asp:ListItem>
									<asp:ListItem Value="4">極機密</asp:ListItem>
									<asp:ListItem Value="5">絕對機密</asp:ListItem>
									<asp:ListItem Value="6">所有密件</asp:ListItem>
									<asp:ListItem Value="0">全部</asp:ListItem>
								</asp:radiobuttonlist>
							</DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;"><asp:label id="Label22" runat="server" Width="89px" >檔案種類：</asp:label></DIV>
							<DIV class="dTD"><asp:radiobuttonlist id="rbDocFileType" runat="server" RepeatColumns="5"
									Height="1px" RepeatDirection="Horizontal">
									<asp:ListItem Value="1" Selected="True">紙質類檔案</asp:ListItem>
									<asp:ListItem Value="2">掃瞄檔案</asp:ListItem>
									<asp:ListItem Value="3">電子檔案</asp:ListItem>
									<asp:ListItem Value="4">數位內容</asp:ListItem>
									<asp:ListItem Value="5">全部</asp:ListItem>
								</asp:radiobuttonlist>
							</DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">註：</DIV>
							<DIV class="dTD">
								<fieldset>
									紙質類檔案：包含已掃瞄及未掃瞄公文檔案<BR>
										&nbsp;&nbsp;&nbsp;&nbsp;掃瞄檔案：表示已掃瞄公文檔案<BR>
										&nbsp;&nbsp;&nbsp;&nbsp;電子檔案：表示線上簽核公文檔案<BR>
										&nbsp;&nbsp;&nbsp;&nbsp;數位內容：包含線上簽核公文電子檔案及紙本公文掃瞄檔案
								</fieldset>
							</DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;"><asp:label id="laSourceOrgName" runat="server" Width="114px" >檔案產生機關：</asp:label></DIV>
							<DIV class="dTD"><asp:textbox onkeypress="jf_UPPERCASE()" id="txSourceOrgName" tabIndex="95" runat="server" 
									 ></asp:textbox><asp:imagebutton id="ibtSourceOrgNo" tabIndex="-1" runat="server" ToolTip="提示檔案產生機關" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:imagebutton>
								<asp:TextBox id="txTempOrg" runat="server" Width="90px" CssClass="hide"></asp:TextBox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;"><asp:label id="Label16" runat="server" >其他條件：</asp:label></DIV>
							<DIV class="dTD"><asp:label id="Label14" runat="server" Width="114px" >文件產生日期：</asp:label><asp:textbox class="KeyUpperField" onkeypress="jf_InpNumOnly()" id="txCrtDateS" tabIndex="96"
									runat="server" Width="4em" MaxLength="7" Height="24px" ></asp:textbox><asp:label id="Label15" runat="server">－</asp:label><asp:textbox class="KeyUpperField" onkeypress="jf_InpNumOnly()" id="txCrtDateE" tabIndex="97"
									runat="server" Width="4em" MaxLength="7" Height="24px" ></asp:textbox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">&nbsp;</DIV>
							<DIV class="dTD"><asp:checkbox id="cbSec2" tabIndex="100" runat="server" Text="已屆降解密期限之案件"></asp:checkbox>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								
								<asp:label id="Label5" runat="server" Width="80px" >基準日期：</asp:label><asp:textbox onkeypress="jf_InpNumOnly()" id="txDBaseDate0" tabIndex="101" runat="server" Width="4em"
									MaxLength="7" ></asp:textbox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">&nbsp;</DIV>
							<DIV class="dTD">
								<asp:CheckBox id="cbSec3" runat="server" Text="無解密日期之案件"></asp:CheckBox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">&nbsp;</DIV>
							<DIV class="dTD"><asp:label id="Label18" runat="server" ForeColor="Linen" BorderColor="White"></asp:label><asp:checkbox id="cbNotifyUser" tabIndex="102" runat="server" Text="通知承辦人員及單位主管進行降解密作業"></asp:checkbox>&nbsp;&nbsp; 
								&nbsp;
								<asp:dropdownlist id="dlNotify" runat="server" >
									<asp:ListItem Value="0">不需通知主管</asp:ListItem>
									<asp:ListItem Value="1">通知至一級主管</asp:ListItem>
									<asp:ListItem Value="2">通知至二級主管</asp:ListItem>
								</asp:dropdownlist></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">&nbsp;</DIV>
							<DIV class="dTD"><asp:checkbox id="cbDestroy2" tabIndex="102" runat="server" Text="已屆銷毀年限之案卷(含經電子化後提前銷毀紙質原檔)"></asp:checkbox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">&nbsp;</DIV>
							<DIV class="dTD">&nbsp;&nbsp;&nbsp;&nbsp;
								<asp:label id="Label12" runat="server" Width="4.5em" >基準日期：</asp:label><asp:textbox onkeypress="jf_InpNumOnly()" id="txDBaseDate" tabIndex="103" runat="server" Width="4em"
									MaxLength="7" ></asp:textbox>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
								&nbsp;
								<asp:label id="Label13" runat="server" Width="4.5em" >銷毀單位：</asp:label><asp:dropdownlist id="dlDestroyUnit" tabIndex="104" runat="server" Width="2.5em" 
									>
									<asp:ListItem Value="2">卷</asp:ListItem>
									<asp:ListItem Value="1">案</asp:ListItem>
									<asp:ListItem Value="3">件</asp:ListItem>
								</asp:dropdownlist>&nbsp;&nbsp;
								<asp:checkbox id="cbClearProc" runat="server" Text="清理處置："></asp:checkbox><asp:dropdownlist id="dlClearProc" runat="server" >
									<asp:ListItem Value="3">依規定程序銷毀</asp:ListItem>
									<asp:ListItem Value="4">屆期後鑑定</asp:ListItem>
									<asp:ListItem Value="0">二定皆有</asp:ListItem>
								</asp:dropdownlist></DIV>
						</DIV>
						<div class="dTR">
                        <div class="dTDTitle" style="width: 8em;">&nbsp;</div>
							<div class="dTD">
								&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:Label ID="Label23" runat="server" Width="80px">保存年限：</asp:Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
									&nbsp;
										<asp:CheckBox ID="ckY1" runat="server" Text="1年"></asp:CheckBox>
										<asp:CheckBox ID="ckY3" runat="server" Text="3年"></asp:CheckBox>
										<asp:CheckBox ID="ckY5" runat="server" Text="5年"></asp:CheckBox>
                                        <asp:CheckBox ID="ckY10" runat="server" Text="10年"></asp:CheckBox>
										<asp:CheckBox ID="ckY15" runat="server" Text="15年"></asp:CheckBox>
										<asp:CheckBox ID="ckY20" runat="server" Text="20年"></asp:CheckBox>
										<asp:CheckBox ID="ckY25" runat="server" Text="25年"></asp:CheckBox>
										<asp:CheckBox ID="ckY30" runat="server" Text="30年"></asp:CheckBox>
							</div>
						</div>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">&nbsp;</DIV>
							<DIV class="dTD"><asp:checkbox id="cbTransfer2" tabIndex="106" runat="server" Text="已屆移轉年限之案卷"></asp:checkbox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">&nbsp;</DIV>
							<DIV class="dTD">&nbsp;&nbsp;&nbsp;&nbsp;
								<asp:label id="Label7" runat="server" Width="80px" >基準日期：</asp:label><asp:textbox onkeypress="jf_InpNumOnly()" id="txDBaseDate2" tabIndex="107" runat="server" Width="4em"
									MaxLength="7" ></asp:textbox>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<asp:label id="Label17" runat="server" Width="2em" >移轉單位：卷</asp:label></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">&nbsp;</DIV>
							<DIV class="dTD"><asp:checkbox id="cbTran" runat="server" Text="已屆銷毀或移轉年限之案卷不移交"></asp:checkbox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">&nbsp;</DIV>
							<DIV class="dTD"><asp:checkbox id="cbReposited2" tabIndex="108" runat="server" Width="246px" 
									Text="已屆清查頻率之案卷"></asp:checkbox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">&nbsp;</DIV>
							<DIV class="dTD"><asp:checkbox id="cbFileUpd" tabIndex="110" runat="server" Width="246px" 
									Text="上次清理至今，有被異動之案卷"></asp:checkbox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="WIDTH: 8em;">&nbsp;</DIV>
							<DIV class="dTD"><asp:checkbox id="cbUnRecovery" tabIndex="112" runat="server" Width="213px" 
									Text="已毀損無法修復之案件"></asp:checkbox></DIV>
						</DIV>
					</FIELDSET>
					<DIV style="WIDTH: 284px; DISPLAY: none; HEIGHT: 101px; OVERFLOW: auto"><asp:textbox id="h_username" runat="server" Width="31px"></asp:textbox><asp:textbox id="h_storenoList" runat="server" Width="31px"></asp:textbox><asp:textbox id="txFileNoSep" runat="server" Width="31px"></asp:textbox><asp:validationsummary id="Validationsummary2" runat="server" DESIGNTIMEDRAGDROP="147"></asp:validationsummary><asp:customvalidator id="Customvalidator1" runat="server" ErrorMessage="CustomValidator" DESIGNTIMEDRAGDROP="146"></asp:customvalidator><asp:listbox id="Listbox1" runat="server" Height="25px" DESIGNTIMEDRAGDROP="12"></asp:listbox><asp:textbox id="txOrgNo" runat="server" Width="31px"></asp:textbox><asp:textbox id="txOrgNoOri" runat="server" Width="31px"></asp:textbox><asp:textbox id="txSysDate" runat="server" Width="31px"></asp:textbox><asp:textbox id="txOrgNameOri" runat="server" Width="31px"></asp:textbox><asp:textbox id="txTransferToOrg" tabIndex="30" runat="server" Width="165px" ></asp:textbox><asp:checkbox id="cbTransferTo" tabIndex="22" runat="server" Text="移交至機關"></asp:checkbox></DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟(M)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存(S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除(Z)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除(D)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消(Z)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="估算表列印(P)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
