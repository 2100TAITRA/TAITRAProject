<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKI930.aspx.cs" AutoEventWireup="false" Inherits="AK.AKI930" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKI930 檔案稽核記錄查詢作業</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKI930" method="post" runat="server">
			<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator" CssClass="hidden"></asp:customvalidator>
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox style="Z-INDEX: 101; POSITION: absolute; TOP: 102px; LEFT: 10px" id="lbReturnValue"
				runat="server" CssClass="hidden"></asp:listbox>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV style="WIDTH: 7em" class="dTDTitle"><asp:label id="Label1" class="KeyField" runat="server">公文文號：</asp:label></DIV>
						<DIV style="WIDTH: 14em" class="dTD"><asp:textbox id="txDocNo" class="KeyUpperField" tabIndex="10" runat="server" Width="6em" MaxLength="15"> 13241</asp:textbox></DIV>
						<DIV style="WIDTH: 5.5em" class="dTDTitle"><asp:label id="Label4" runat="server">異動日期:</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txEntryDate1" tabIndex="20" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox><asp:label id="Label5" runat="server">－</asp:label><asp:textbox id="txEntryDate2" tabIndex="30" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 7em" class="dTDTitle"><asp:label id="Label2" runat="server">檔號(起)：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txFileYearS" tabIndex="40" onkeypress="jf_InpNumOnly();" runat="server" Width="2em"
									MaxLength="3"></asp:textbox><asp:label id="Label7" runat="server">－</asp:label><asp:textbox id="txFileClsS" tabIndex="50" runat="server" Width="9.5em" MaxLength="20"></asp:textbox><asp:imagebutton id="btCLS" tabIndex="60" runat="server" ImageUrl="Template/images/HELP.gif"></asp:imagebutton><asp:label id="Label6" runat="server">－</asp:label><asp:textbox id="txFileCaseS" tabIndex="-1" runat="server" Width="7em" MaxLength="12"></asp:textbox><asp:imagebutton id="btCASE" tabIndex="70" runat="server" ImageUrl="Template/images/HELP.gif"></asp:imagebutton><asp:label id="Label9" runat="server">－</asp:label><asp:textbox id="txFileVolS" tabIndex="80" onkeypress="jf_UPPERCASE();" runat="server" CssClass="InputEnOnlyUpperField"
									Width="2.5em" MaxLength="4"></asp:textbox><asp:label id="Label8" runat="server">－</asp:label><asp:textbox id="txFileSeqS" tabIndex="90" onkeypress="jf_UPPERCASE();" runat="server" CssClass="InputEnOnlyUpperField"
									Width="2em" MaxLength="3"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 7em" class="dTDTitle"><asp:label id="Label10" runat="server">檔號(訖)：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txFileYearE" tabIndex="100" onkeypress="jf_InpNumOnly();" runat="server" Width="2em"
									MaxLength="3"></asp:textbox><asp:label id="Label11" runat="server">－</asp:label><asp:textbox id="txFileClsE" tabIndex="110" runat="server" Width="9.5em" MaxLength="20"></asp:textbox><asp:imagebutton id="btCLS2" tabIndex="115" runat="server" ImageUrl="Template/images/HELP.gif"></asp:imagebutton><asp:label id="Label12" runat="server">－</asp:label><asp:textbox id="txFileCaseE" tabIndex="120" runat="server" Width="7em" MaxLength="12"></asp:textbox><asp:imagebutton id="btCASE2" tabIndex="125" runat="server" ImageUrl="Template/images/HELP.gif"></asp:imagebutton><asp:label id="Label13" runat="server">－</asp:label><asp:textbox id="txFileVolE" tabIndex="130" onkeypress="jf_UPPERCASE();" runat="server" CssClass="InputEnOnlyUpperField"
									Width="2.5em" MaxLength="4"></asp:textbox><asp:label id="Label14" runat="server">－</asp:label><asp:textbox id="txFileSeqE" tabIndex="140" onkeypress="jf_UPPERCASE();" runat="server" CssClass="InputEnOnlyUpperField"
									Width="2em" MaxLength="3"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em"><asp:label id="Label3" runat="server">　　作業項目：</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:checkbox id="ck1" tabIndex="150" runat="server" Width="10em" Text="點收確認"></asp:checkbox></DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:checkbox id="ck2" tabIndex="160" runat="server" Width="10em" Text="詮釋資料異動"></asp:checkbox></DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:checkbox id="ck3" tabIndex="170" runat="server" Width="10em" Text="使用權限異動"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:checkbox id="ck4" tabIndex="180" runat="server" Width="10em" Text="更新轉置保管作業"></asp:checkbox></DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:checkbox id="ck5" tabIndex="190" runat="server" Width="10em" Text="銷毀及移轉作業"></asp:checkbox></DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:checkbox id="ck6" tabIndex="200" runat="server" Width="10em" Text="非法存取"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:checkbox id="ckPrint" tabIndex="180" runat="server" Width="10em" Text="數位內容列印紀錄"></asp:checkbox></DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:checkbox id="ckSaveAs" tabIndex="180" runat="server" Width="10em" Text="數位內容另存紀錄">	</asp:checkbox></DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:checkbox id="ckSecNo" tabIndex="180" runat="server" Width="10em" Text="降解密作業"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:checkbox id="ckScan" tabIndex="180" runat="server"  Text="紙本掃描上傳"></asp:checkbox></DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:checkbox id="ckMove" tabIndex="180" runat="server"  Text="封裝搬移"></asp:checkbox></DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:checkbox style="Z-INDEX: 0" id="ckFileCheck" tabIndex="180" runat="server"  Text="清查註記"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em"><asp:label id="Label17" runat="server">　　排序方式：</asp:label></DIV>
						<DIV class="dTD"><asp:radiobutton id="or1" tabIndex="210" runat="server" Text="依公文文號" GroupName="rb"></asp:radiobutton><asp:radiobutton id="or2" tabIndex="220" runat="server" Text="依檔號" GroupName="rb"></asp:radiobutton><asp:radiobutton id="or3" tabIndex="230" runat="server" Text="依異動日期" GroupName="rb"></asp:radiobutton></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV style="HEIGHT: 13em" class="GridDiv">
						<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="4" GridLines="Vertical">
							<Columns>
								<asp:TemplateColumn HeaderText="公文文號">
									<ItemTemplate>
										<asp:TextBox id="lbDocNo" runat="server" CssClass="DisplayOnly" Width="5.5em"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="檔號">
									<ItemTemplate>
										<asp:TextBox id="lbFileNo" runat="server" CssClass="DisplayOnly" Width="10em"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="異動日期">
									<ItemTemplate>
										<asp:TextBox id="lbEntryDate" runat="server" CssClass="DisplayOnly" Width="5.5em"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="作業項目">
									<ItemTemplate>
										<asp:TextBox id="lbTxCode" runat="server" CssClass="DisplayOnly" Width="8em"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="異動者">
									<ItemTemplate>
										<asp:TextBox id="lbEntryUser" runat="server" CssClass="DisplayOnly" Width="5.5em"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="異動內容">
									<ItemTemplate>
										<asp:TextBox id="lbTxDesc" runat="server" CssClass="DisplayOnly" Width="13.5em"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:validationsummary style="Z-INDEX: 103; POSITION: absolute; TOP: 616px; LEFT: 24px" id="ValidationSummary1"
				runat="server" CssClass="hidden"></asp:validationsummary><asp:dropdownlist style="Z-INDEX: 104; POSITION: absolute; TOP: 584px; LEFT: 40px" id="dlSecNo" runat="server"
				CssClass="hide"></asp:dropdownlist>
		</form>
	</body>
</HTML>
