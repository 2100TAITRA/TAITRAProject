<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKT210.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT210" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKT210 公文延後歸檔登錄作業</title>
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
		<form id="AKT210" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; POSITION: absolute; TOP: 102px; LEFT: 10px"
				runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label id="lbApplyNo" runat="server" >申請單號：</asp:label></DIV>
						<DIV class="dTD" style="width: 24em; ">
							<asp:textbox onkeypress="jf_InpNumOnly()" id="txApplyNo" tabIndex="5" runat="server" Width="5.5em" MaxLength="8" ReadOnly="True" BackColor="LightGray"></asp:textbox>
							<asp:TextBox id="txUpdateF" runat="server" CssClass="hide"></asp:TextBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label class="KeyField" id="Label1" runat="server">公文文號：</asp:label></DIV>
						<DIV class="dTD" style="width: 24em; ">
							<asp:textbox class="KeyUpperField" onkeypress="jf_UPPERCASE()" id="tbDocNo" tabIndex="10" runat="server" Width="8.5em" MaxLength="15"></asp:textbox>
							<asp:label id="H_lbORGDate" runat="server" CssClass="hidden"></asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label id="Label2" runat="server">結案日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 24em; "><asp:label id="lbCLOSE_DATE" runat="server"></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label id="Label4" runat="server">應歸檔日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 24em; "><asp:label id="lbEXTFILE_DATE" runat="server"></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label id="Label6" runat="server">預計歸檔日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 24em; ">
							<asp:textbox CssClass="DatePicker" id="tbExtDate" tabIndex="20" runat="server" MaxLength="7" Width="4.5em"></asp:textbox>
							<asp:label id="H_lbRPS_USER" runat="server" CssClass="hidden" Width="4.5em"></asp:label><asp:label id="H_lbRPSDEPT_NO" runat="server" CssClass="hidden"></asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label class="RequireField" id="Label7" runat="server">延後歸檔原因：</asp:label></DIV>
						<DIV class="dTD" style="width: 24em; ">
							<asp:dropdownlist class="RequireField" id="ddDelayReason" tabIndex="30" runat="server" Width="10.5em"></asp:dropdownlist>
							<asp:label id="H_lbRPSSECT_NO" runat="server" CssClass="hidden"></asp:label>
							<asp:label id="H_lbToday" runat="server" CssClass="hidden" Width="1.5em"></asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label id="Label8" runat="server">延後歸檔說明：</asp:label></DIV>
						<DIV class="dTD" style="width: 24em; "><asp:textbox id="tbDelayDESP" tabIndex="40" runat="server" Width="23.5em" TextMode="MultiLine" Height="45px" ></asp:textbox></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class="dTD" style="width: 32em; "><asp:label id="Label3" runat="server" Width="518px">歷次展期記錄 : </asp:label></DIV>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class = "GridDiv" style="HEIGHT: 195px;">
								<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" PageSize="10" CellPadding="2" GridLines="Vertical">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="登記日期">
											<ItemTemplate>
												<asp:Label id="lbExtDate" runat="server" Width="110px"></asp:Label>
												<asp:TextBox id="txExtDate" runat="server" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="申請單號">
											<ItemTemplate>
												<asp:Label id="lbExtNo" runat="server" Width="110px"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="原應歸檔日期">
											<ItemTemplate>
												<asp:Label id="lbOrgFileDate" runat="server" Width="110px"></asp:Label>
												<asp:TextBox id="txOrgFileDate" runat="server" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="預計歸檔日期">
											<ItemTemplate>
												<asp:Label id="lbFileDate" runat="server" Width="110px"></asp:Label>
												<asp:TextBox id="txFileDate" runat="server" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; POSITION: absolute; TOP: 218px; LEFT: 12px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; POSITION: absolute; TOP: 252px; LEFT: 12px"
				runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
