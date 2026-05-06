<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAT221.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAT221" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT221 批次併件設定作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
<meta name="format - detection" content="telephone = no">
<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT221" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:textbox id="h_txComNo" runat="server" Width="86px"></asp:textbox>
				<asp:textbox id="h_txDocNo" runat="server" Width="86px"></asp:textbox><asp:textbox id="h_txFileNo" runat="server" Width="86px"></asp:textbox></DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5em; ">
							<asp:label id="Label3" runat="server" >待併文號：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 15em; ">
							<asp:textbox id="txWitNo" runat="server" Width="6.5em" MaxLength="10"></asp:textbox>(如：0950022334)
						</DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD" id="tdSelNo" style="width: 20em;">尚未選取</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class = "GridDiv" style="HEIGHT: 390px;">
								<asp:datagrid id="dg1" runat="server" PageSize="5" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0" >
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server" Width="30px" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="主號">
											<ItemStyle HorizontalAlign="Center"></ItemStyle>
											<ItemTemplate>
												<asp:RadioButton id="rbMainNo" tabIndex="0" Width="38px" Runat="server" GroupName="Main"></asp:RadioButton>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="併入">
											<ItemStyle HorizontalAlign="Center"></ItemStyle>
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" tabIndex="0" runat="server" onclick="jf_cbSel(this)"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="公文文號">
											<ItemTemplate>
												<asp:HyperLink id="hlDocNo" tabIndex="0" runat="server"></asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="主旨">
											<ItemTemplate>
												<asp:Label id="lbSub" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="檔號">
											<ItemTemplate>
												<asp:Label id="lbFileNo" runat="server"></asp:Label><BR>
												<asp:Label id="lbFileVS" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="承辦資訊">
											<ItemTemplate>
												<asp:Label id="lbDept" runat="server" ></asp:Label>
												<asp:Label id="h_lbDeptNo" runat="server" CssClass="hide"></asp:Label><BR>
												<asp:Label id="lbUser" runat="server" ></asp:Label>
												<asp:Label id="h_lbUserId" runat="server" CssClass="hide"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="確定併案" accesskey="S" title="確定併案(Alt+S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清畫面" accesskey="C" title="清畫面(Alt+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
