<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI310.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDI310" %>

<!DOCTYPE HTML >
<html>
<head>
	<title>EDI310 繕校發文使用天數查詢作業</title>
	<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
	<meta content="C#" name="CODE_LANGUAGE">
	<meta content="JavaScript" name="vs_defaultClientScript">
	<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	<link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
	<form id="EDI310" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../EDLIB/GenericBanner.htm"-->
		<div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="80px" CssClass="hidden"></asp:ListBox>
		</div>
		<div class="DivBaseTable" id="BaseTable">
			<div class="DivTable" id="MainTable">
				<div class="dTDTitle" style="width: 6em;">
					<asp:Label ID="lbIssueDay" Width="5em" CssClass="RequireField" runat="server">發文日期：</asp:Label>
				</div>
				<div class="dTD">
					<asp:TextBox ID="txDateS" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker" ></asp:TextBox>－
									<asp:TextBox ID="txDateE" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="lbUseDay" runat="server">使用天數：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em;">
						<asp:RadioButton ID="rbLimitN" runat="server" Text="不限制" GroupName="Limit" Checked="True" CssClass="DatePicker"></asp:RadioButton>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">&nbsp;</div>
					<div class="dTD">
						<asp:RadioButton ID="rbLimitY" runat="server" Text="大於" GroupName="Limit"></asp:RadioButton>
						<asp:TextBox ID="txDays" runat="server" Width="1.5em" CssClass="InputFieldNumeric" MaxLength="2"></asp:TextBox>
						<asp:Label ID="lbDay" runat="server">天者</asp:Label>
					</div>
				</div>
			</div>
			<div class="DivTable" id="GridTable">
				<div class="dTR">
					<div class="dTD">
						<div class="GridDiv" style="height: 262px">
							<asp:DataGrid ID="dg1" runat="server" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" Height="1px" PageSize="30" EnableViewState="False">
								<Columns>
									<asp:TemplateColumn HeaderText="序">
										<ItemTemplate>
											<asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="公文文號">
										<ItemTemplate>
											<asp:Label ID="lbDocNo" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="送繕日期時間">
										<ItemTemplate>
											<asp:Label ID="lbNewTime" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="發文日期">
										<ItemTemplate>
											<asp:Label ID="lbIssueDate" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="使用天數">
										<ItemTemplate>
											<asp:Label ID="lbDayCount" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="主旨">
										<ItemTemplate>
											<asp:Label ID="txSubject" runat="server" ReadOnly="True"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
								<PagerStyle HorizontalAlign="Right" ForeColor="Black" BackColor="#F7F7DE" Mode="NumericPages"></PagerStyle>
							</asp:DataGrid>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="dTD" style="width: 10%"></div>
		</div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
			<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btPrint" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btPreview" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
		</asp:Panel>
	</form>
</body>
</html>
