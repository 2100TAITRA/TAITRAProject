<%@ Page language="c#" Codebehind="AKI850.aspx.cs" AutoEventWireup="false" Inherits="AK.AKI850" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKI850 檔案應用申請審核進度查詢</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKI850" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 100; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="width: 10em;">
							<asp:label id="Label3" runat="server" CssClass="RequireField">姓名：</asp:label>
						</div>
						<div class="dTD" style="width: 7em;">
							<asp:textbox id="txPubName"  runat="server" CssClass="RequireField" Width="6em" MaxLength="20">馬仔</asp:textbox>
						</div>
						<div class="dTDTitle" style="width: 6em;">
							<asp:label id="Label4" runat="server">申請書號：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txApplyNo" runat="server" Width="6em" MaxLength="8"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 10em;">
							<asp:label id="Label1" runat="server" CssClass="RequireField">出生年月日：</asp:label>
						</div>
						<div class="dTD" style="width: 7em;">
							<asp:textbox onkeypress="jf_InpNumOnly()" id="txPubBirth" runat="server" CssClass="RequireField" Width="4em" MaxLength="7">0920101</asp:textbox>
						</div>
						<div class="dTDTitle" style="width: 6em;">
							<asp:label id="Label5" runat="server" Width="100px">申請日期：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txApplyDateS" onkeypress="jf_InpNumOnly()" runat="server" Width="4em" MaxLength="7"></asp:textbox><asp:label id="Label7" runat="server" Width="100px">(起)</asp:label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 10em;">
							<asp:label id="Label6" runat="server" CssClass="RequireField">身分證明文件字號：</asp:label>
						</div>
						<div class="dTD" style="width: 7em;">
							<asp:textbox id="txPubId" runat="server" CssClass="RequireField" Width="6em" MaxLength="10">F101010101</asp:textbox>
						</div>
						<div class="dTDTitle" style="width: 6em;">
							<asp:label id="Label2" runat="server">申請日期：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txApplyDateE" onkeypress="jf_InpNumOnly()" runat="server" Width="4em" MaxLength="7"></asp:textbox><asp:label id="Label8" runat="server" Width="100px">(訖)</asp:label>
						</div>
					</div>
				</div>
			</div>
			<div class="DivTable" id="GridTable">
                <div class="GridDiv">
					<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4" PageSize="50">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label id="lbSeqNo" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="申請書號">
								<ItemTemplate>
									<asp:HyperLink id="hlBookNo" runat="server" target="_parent">HyperLink</asp:HyperLink>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="申請日期">
								<ItemTemplate>
									<asp:Label id="laApplyDate" runat="server">Label</asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="申請人">
								<ItemTemplate>
									<asp:Label id="laApplyUser" runat="server">Label</asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="代理人">
								<ItemTemplate>
									<asp:Label id="laAgent" runat="server">Label</asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="目前進度">
								<ItemTemplate>
									<asp:Label id="laStatus" runat="server">Label</asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:datagrid>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 103; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 104; LEFT: -8px; POSITION: absolute; TOP: 577px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
