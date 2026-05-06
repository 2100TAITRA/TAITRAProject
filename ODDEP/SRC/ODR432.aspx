<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODR432.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR432" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR432 結案資料庫清單列印作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="ODR430" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericSearch.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MTable1">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em" >
							<asp:label id="Label1" runat="server" CssClass="RequireField">列印月份：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txSMon" tabIndex="10" runat="server" CssClass="RequireFieldNumeric" MaxLength="5" Width="3em"></asp:textbox>－
							<asp:textbox id="txEMon" tabIndex="15" runat="server" CssClass="RequireFieldNumeric" MaxLength="5" Width="3em"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label2" runat="server" >列印單位：</asp:label>
						</DIV>
						<DIV class="dTD">
							<cc1:combobox id="dlDept" runat="server" Width="10em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label5" runat="server" >報表種類：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobuttonlist id="rbReport" runat="server">
								<asp:ListItem Value="1">一般公文(含一般公文限期辦畢)</asp:ListItem>
								<asp:ListItem Value="3">專案管制</asp:ListItem>
								<asp:ListItem Value="4">立委質詢案件</asp:ListItem>
								<asp:ListItem Value="5">人民申請案件</asp:ListItem>
								<asp:ListItem Value="6">人民陳情案件</asp:ListItem>
								<asp:ListItem Value="7">訴願案件</asp:ListItem>
								<asp:ListItem Value="9">特殊案件</asp:ListItem>
								<asp:ListItem Value="S">存查案件</asp:ListItem>
								<asp:ListItem Value="M">電子郵件</asp:ListItem>
							</asp:radiobuttonlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em"><asp:label id="Label3" runat="server" >辦理天數：</asp:label></DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbDateInterval" runat="server" GroupName="rbDayType"></asp:radiobutton>
							<asp:textbox id="txMinDay" runat="server" Width="2.5em" CssClass="InputFieldNumeric"></asp:textbox>
							<asp:label id="Label7" runat="server">天(含)－</asp:label>
							<asp:textbox id="txMaxDay" runat="server" Width="2.5em" CssClass="InputFieldNumeric"></asp:textbox>
							<asp:label id="Label8" runat="server">天(含)</asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">&nbsp;</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbDateOnly" runat="server" GroupName="rbDayType"></asp:radiobutton>
							<asp:textbox id="txDays" runat="server" Width="2.5em" CssClass="InputFieldNumeric"></asp:textbox>
							<asp:label id="Label6" runat="server">天以上</asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em"><asp:label id="Label4" runat="server">報表明細：</asp:label></DIV>
						<DIV class="dTD">
							<asp:radiobuttonlist id="rbPage" runat="server">
								<asp:ListItem Value="0">依單位換頁</asp:ListItem>
								<asp:ListItem Value="1">不依單位換頁</asp:ListItem>
							</asp:radiobuttonlist>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" class="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
