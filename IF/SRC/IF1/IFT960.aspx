<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="IFT960.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFT960" %>

<!DOCTYPE HTML >
<html>
<head>
	<title>IFT960 軟體憑證審核作業(正式)</title>
	<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
	<meta name="CODE_LANGUAGE" content="C#">
	<meta name="vs_defaultClientScript" content="JavaScript">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
	<span id="httpObject" ></span>
	<form id="IFT960" method="post" runat="server">
		<asp:TextBox Style="z-index: 108; position: absolute; top: 373px; left: 12px" ID="hFlag" runat="server" CssClass="hidden"></asp:TextBox>
		<!--Template V3 Generated WebForm-->
		<!--#include file="../IFLIB/GenericBanner.htm"-->
		<div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:TextBox ID="hAccount" runat="server" CssClass="hidden">二一零零</asp:TextBox>
			<asp:TextBox ID="hDate" runat="server" CssClass="hidden"></asp:TextBox>
			<asp:TextBox ID="txActiveOrgNo" runat="server" CssClass="hidden"></asp:TextBox>
			<asp:TextBox ID="txCardInfo" runat="server" CssClass="hidden"></asp:TextBox>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="80px" CssClass="hidden"></asp:ListBox>
		</div>
		<div class="DivBaseTable">
			<div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 6.5em;">
						<asp:Label ID="Label1" runat="server">憑證編號：</asp:Label>
					</div>
					<div class="dTD" style="width: 30em;">
						<asp:Label ID="lbApplyNo" runat="server"></asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6.5em;">
						<asp:Label ID="Label9" runat="server">申請機關：</asp:Label>
					</div>
					<div class="dTD" style="width: 30em;">
						<asp:Label ID="lbOrgName" runat="server"></asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6.5em;">
						<asp:Label ID="Label2" runat="server">申請人：</asp:Label>
					</div>
					<div class="dTD" style="width: 30em;">
						<asp:Label ID="lbEmpName" runat="server"></asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6.5em;">
						<asp:Label ID="Label3" runat="server">申請類型：</asp:Label>
					</div>
					<div class="dTD" style="width: 30em;">
						<asp:Label ID="lbType" runat="server"></asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6.5em;">
						<asp:Label ID="Label4" runat="server">申請日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 30em;">
						<asp:Label ID="lbNewDate" runat="server"></asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6.5em;">
						<asp:Label ID="Label5" runat="server">申請原因：</asp:Label>
					</div>
					<div class="dTD" style="width: 30em;">
						<asp:Label ID="lbReason" runat="server"></asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6.5em;">
						<asp:Label ID="Label6" runat="server">前申請資訊：</asp:Label>
					</div>
					<div class="dTD" style="width: 30em;">
						<asp:Label ID="lbNone" runat="server" Text="無"></asp:Label>
						<asp:GridView ID="gvUserCert" runat="server" AutoGenerateColumns="False" >
							<Columns>
								<asp:BoundField HeaderText="憑證編號" DataField="APPLY_NO" ItemStyle-Width="4.5em" HeaderStyle-Width="4.5em"/>
								<asp:BoundField HeaderText="申請原因" DataField="REASON"  ItemStyle-Width="20em" HeaderStyle-Width="20em"/>
								<asp:BoundField HeaderText="憑證狀態" DataField="TX_STATUS"  ItemStyle-Width="5.5em" HeaderStyle-Width="5.5em"/>
							</Columns>
						</asp:GridView>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6.5em;">
						<asp:Label ID="Label7" runat="server">審核意見：</asp:Label>
					</div>
					<div class="dTD" style="width: 30em;">
						<asp:TextBox ID="txTxReason" runat="server" Width="25em"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6.5em;">
						<asp:Label ID="Label8" runat="server">憑證已發放：</asp:Label>
					</div>
					<div class="dTD" style="width: 30em;">
						<asp:Label ID="lbSCCnt" runat="server"></asp:Label>
					</div>
				</div>
			</div>
		</div>
		<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
			<asp:Button ID="btCommit" runat="server" Text="核可" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btCancel" runat="server" Text="退回" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		</asp:Panel>
	</form>
</body>
</html>
