<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODR420.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR420" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR420 稽催公文清單列印</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body class="hidden" MS_POSITIONING="GridLayout">
		<form id="ODR420" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:textbox id="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_Sect_Text" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_Dept_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_Dept_Text" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_Sect_AllValue" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<asp:textbox id="H_User" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_User_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_dlUser_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em">
							<asp:label class="KeyField" id="lbPrint" runat="server" CssClass="hide">列印模式：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbDept" tabIndex="45" runat="server" Text="單位" GroupName="RptType" CssClass="hide"></asp:radiobutton>
							<asp:radiobutton id="rbUser" tabIndex="48" runat="server" Text="個人" GroupName="RptType" CssClass="hide"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em">
							<asp:label class="KeyField" id="Label1" runat="server">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD">
							<cc1:combobox id="dlDept" runat="server" Rows="8" Width="7em" CssClass="comboBox"></cc1:combobox>
							<cc1:combobox id="dlSect" runat="server" Width="7em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em">
							<asp:label id="lbUser" runat="server">承辦人：</asp:label>
						</DIV>
						<DIV class="dTD">
							<cc1:combobox id="dlUser" runat="server" Rows="8" Width="7em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em">
							<asp:label class="KeyField" id="Label2" runat="server">限辦日期：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txSDate" CssClass="DatePicker" tabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:textbox>－
							<asp:textbox id="txEDate" CssClass="DatePicker" tabIndex="25" runat="server" Width="4em" MaxLength="7"></asp:textbox>
							<asp:textbox id="H_Value" tabIndex="-1" runat="server" CssClass="hide" Width="10.5em"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 8.5em" class="dTDTitle">
							<asp:label class="RequireField" id="lbCoworkType" runat="server" Width="7.5em">稽催公文類型：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:checkbox id="cbCoworkMain" runat="server" Text="主辦" Checked="True" ></asp:checkbox>
							<asp:checkbox id="cbCoworkHelp" runat="server" Text="會辦" Checked="True" ></asp:checkbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 8.5em" class="dTDTitle">
							<asp:label id="Label3" runat="server">逾期天數：</asp:label>
						</DIV>
						<DIV class="dTD">
							<DIV class="" id="divBehind1">
								<asp:label id="Label4" runat="server">自</asp:label>
								<asp:textbox id="txSDay" style="TEXT-ALIGN: right" runat="server" Width="2em" MaxLength="3"></asp:textbox>
								<asp:label id="Label5" runat="server">天至</asp:label>
								<asp:textbox id="txEDay" style="TEXT-ALIGN: right" runat="server" Width="2em" MaxLength="3"></asp:textbox>
								<asp:label id="Label6" runat="server">天</asp:label>
							</DIV>
							<DIV class="hide" id="divBehind2">
								<asp:label id="Label7" runat="server">逾</asp:label>
								<asp:textbox id="txBehind" style="TEXT-ALIGN: right" runat="server" Width="2em" MaxLength="3"></asp:textbox>
								<asp:label id="Label8" runat="server">天以上</asp:label>
							</DIV>
						</DIV>
					</DIV>
					<DIV class="dTR hide">
						<DIV style="WIDTH: 8.5em" class="dTDTitle">
							<asp:label id="Label9" runat="server">依稽催日期查詢：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txSDate1" tabIndex="20" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>－							
							<asp:textbox id="txEDate1" tabIndex="25" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR" id="SecDiv" runat="server">
						<DIV style="WIDTH: 3.5em" class="dTDTitle">&nbsp;
						</DIV>
						<DIV class="dTD">
							<asp:CheckBox id="cbShowSecSubj" runat="server" Text="密件公文列印主旨"></asp:CheckBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 3.5em" class="dTDTitle">&nbsp;
						</DIV>
						<DIV class="dTD">
							<asp:CheckBox id="cbNoNewPage" runat="server" Text="報表不分頁"></asp:CheckBox>
						</DIV>
					</DIV>
				</DIV>
				<DIV style="HEIGHT: 12.5em">
						<asp:datagrid id="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="50"></asp:datagrid>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator style="Z-INDEX: 102; POSITION: absolute; TOP: 218px; LEFT: 12px" id="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary style="Z-INDEX: 103; POSITION: absolute; TOP: 252px; LEFT: 12px" id="ValidationSummary1"	runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
