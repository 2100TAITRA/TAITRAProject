<%@ Page language="c#" Codebehind="EDT360.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDT360" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDT360 待電郵發文公文確認及寄送作業</TITLE>
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
		<FORM id="EDT360" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="txhidden" runat="server" Width="80px" AutoPostBack="True" EnableViewState="False"></asp:textbox>
				<asp:TextBox id="H_txWebService" runat="server"></asp:TextBox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						 <DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="lbDate" runat="server" >發文日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 15em">
							<asp:textbox id="txIssueDateS" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
							－
							<asp:textbox id="txIssueDateE" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="lbDocNo" runat="server">發文文號：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 15em">
							<asp:textbox id="txIssueNoS" runat="server" Width="6em" MaxLength="15"></asp:textbox>
							－
							<asp:textbox id="txIssueNoE" runat="server" Width="6em" MaxLength="15"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="lbNo" runat="server">排序：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 15em">
							<asp:RadioButton id="rbDocNo" runat="server" GroupName="order" Text="發文文號" ></asp:RadioButton>
							<asp:RadioButton id="rbIssueDate" runat="server" GroupName="order" Text="發文日期"></asp:RadioButton>
						</DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectClear" runat="server" Text="清除" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
						</asp:Panel>
					</DIV>
					<DIV class="GridDiv">
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
								<asp:TemplateColumn HeaderText="文號">
									<ItemTemplate>
										<asp:Label id="lbDocNo" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="發文日期">
									<ItemTemplate>
										<asp:Label id="lbIssueDate" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="受文者">
									<ItemTemplate>
										<asp:Label id="lbOrgName" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:Label id="lbSubject" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="預覽">
									<ItemTemplate>
										<asp:Button id="btPreview" runat="server" Text="預覽"></asp:Button>
										<asp:Label id="H_OrgId" runat="server" CssClass="hide"></asp:Label>
										<asp:Label id="H_PdfDir" runat="server" CssClass="hide"></asp:Label>
										<asp:Label id="H_Email" runat="server" CssClass="hide"></asp:Label>
										<asp:Label id="H_SubNo" runat="server" CssClass="hide"></asp:Label>
										<asp:Label id="H_IssueWord" runat="server" CssClass="hide"></asp:Label>
										<asp:Label id="H_IssueNo" runat="server" CssClass="hide"></asp:Label>
										<asp:Label id="H_Status" runat="server" CssClass="hide"></asp:Label>
										<asp:Label id="H_MailTimes" runat="server" CssClass="hide"></asp:Label>
										<asp:Label id="H_DraftNo" runat="server" CssClass="hide"></asp:Label>
										<asp:Label id="H_HasAttach" runat="server" CssClass="hide"></asp:Label>
										<asp:Label id="H_AdditiveEmail" runat="server" CssClass="hide"></asp:Label>
										<asp:Label id="H_DocType" runat="server" CssClass="hide"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btSend" runat="server" Text="確認寄送" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btReGenPdf" runat="server" Text="重新轉出" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>		
	</BODY>
</HTML>
