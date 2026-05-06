<%@ Page language="c#" Codebehind="EDT400.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT400" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDT400 結案日期批次更新作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDT400" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="txhidden" runat="server" Width="80px" AutoPostBack="True" EnableViewState="False"></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em">
							<asp:label id="lbIssueDate" runat="server">發文日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 30em">
							<asp:textbox id="txIssueDateS" tabIndex="1" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							<asp:label id="lbline1" runat="server">～</asp:label>
							<asp:textbox id="txIssueDateE" tabIndex="2" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							<asp:checkbox id="cbClean" tabIndex="13" runat="server" Width="9.5em" Text="不清除捲動區資料" Checked="True"></asp:checkbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em">
							<asp:label id="lbCloseDate" runat="server">結案日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 30em">
							<asp:textbox id="txCloseDateS" tabIndex="3" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							<asp:label id="lbline2" runat="server">～</asp:label>
							<asp:textbox id="txCloseDateE" tabIndex="4" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 38.5em">
								<HR style="WIDTH: 38.5em">
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em">
							<asp:label id="lbNo" runat="server">公文文號：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 30em">
							<asp:textbox id="txDocNo" tabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:textbox>
							<asp:button id="btConfirm" runat="server" Text="確認"></asp:button>
							<asp:checkbox id="cbAdd" tabIndex="16" runat="server" Width="12.5em" Text="讀取後自動加入捲動區" Checked="True"></asp:checkbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 38.5em">
								<HR style="WIDTH: 38.5em">
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em">
							<asp:label id="Label1" runat="server">更新結案日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 30em">
							<asp:textbox id="txUpdateCloseDate" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							<asp:button id="btConfirmUpdate" runat="server" Text="確認"></asp:button>
						</DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
							<asp:Button ID="btSelectClear" runat="server" Text="清除" />
							<asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
						</asp:Panel>
					</DIV>
					<DIV class="GridDiv" style="HEIGHT: 16.5em">
						<asp:datagrid id="dg1" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="選">
									<ItemTemplate>
										<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="公文文號">
									<ItemTemplate>
										<asp:Label id="lbDocNo" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="結案日期">
									<ItemTemplate>
										<asp:TextBox id="txCloseDate" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:Label id="lbTitle" runat="server" CssClass="PopUp" Style="overflow:hidden"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btSave" runat="server" Text="更新結案日" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>		
	</BODY>
</HTML>
