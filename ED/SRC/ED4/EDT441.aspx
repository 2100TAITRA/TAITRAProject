<%@ Page language="c#" Codebehind="EDT441.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT441" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDT441 批示錄案追蹤辦理情形登錄作業</TITLE>
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
		<FORM id="EDT441" onkeyup="jf_CheckFull();" method="post" runat="server">
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
						<DIV class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbDocNo" runat="server"  CssClass="KeyField" >公文文號：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 30em">
							<asp:textbox id="txDocNo" runat="server" Width="5.5em" MaxLength="10"  CssClass="KeyField"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbRcvDate" runat="server">收創日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 11em">
							<asp:textbox id="txRcvDate" runat="server" Width="4em" MaxLength="7"></asp:textbox>
						</DIV>
						<DIV class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbDueDate" runat="server">限辦日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 11em">
							<asp:textbox id="txDueDate" runat="server" Width="4em" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbNo" runat="server">主旨：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 30em">
							<asp:textbox id="txSubject" runat="server" Width="29.5em" TextMode="MultiLine"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbInstructChief" runat="server">批示長官：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 11em">
							<asp:textbox id="txInstructChief" runat="server" Width="10.5em"></asp:textbox>
						</DIV>
						<DIV class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbInstructDueDate" runat="server">批示限辦日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 11em">
							<asp:textbox id="txInstructDueDate" runat="server" Width="4em" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbInstructDesc" runat="server">批示內容：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 30em">
							<asp:textbox id="txInstructDesc" runat="server" Width="29.5em" TextMode="MultiLine"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbDetailDate" runat="server">辦理日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 30em">
							<asp:textbox id="txDetailDate" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker" ></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbDetailDesc" runat="server">辦理情形：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 30em">
							<asp:textbox id="txDetailDesc" runat="server" Width="29.5em" TextMode="MultiLine" MaxLength="300" onkeyup="isMaxLength(this)"></asp:textbox>
						</DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
							<asp:Button ID="btSelectClear" runat="server" Text="清除" />
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
										<asp:CheckBox id="cbSelect" runat="server"></asp:CheckBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="辦理日期">
									<ItemTemplate>
										<asp:Label id="lbDetailDate" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="辦理情形">
									<ItemTemplate>
										<asp:Label id="lbDetailDesc" runat="server" style="word-break:normal" ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="新增辦理情形" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除辦理情形" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>		
	</BODY>
</HTML>
