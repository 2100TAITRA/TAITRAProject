<%@ Page language="c#" Codebehind="EDR461.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR461" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR461</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR461" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="h_txYM" runat="server" Width="3em"></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" ><asp:label id="Label3" runat="server" CssClass="KeyField"  >る</asp:label></DIV>
						<DIV  class="dTD"><asp:textbox id="txYearMonth" tabIndex="0" runat="server" Width="3em" CssClass="KeyUpperFieldNumeric"
								   MaxLength="5"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" ><asp:label id="Label1" runat="server"  
								>ヘ玡参璸程る</asp:label></DIV>
						<DIV class="dTD"><asp:label id="lbMaxYearMonth" runat="server" Width="7.5em"  
								></asp:label></DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV style="HEIGHT: 12em">
						<asp:datagrid id="dg1" runat="server" PageSize="30" AutoGenerateColumns="False"	GridLines="Vertical" CellPadding="0">
							<Columns>
								<asp:TemplateColumn HeaderText="">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"  ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="虫">
									<ItemTemplate>
										<asp:Label id="lbUnite" runat="server" Width="5.5em"  ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="セる穝Μ">
									<ItemTemplate>
										<asp:textbox id="txInput1" tabIndex="0" runat="server" Width="3.5em"  class="InputFieldNumeric" MaxLength="6" ></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="る快">
									<ItemTemplate>
										<asp:textbox id="txInput2" tabIndex="0" runat="server" Width="3.5em"  class="InputFieldNumeric"  MaxLength="6" ></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="セる承絑">
									<ItemTemplate>
										<asp:textbox id="txInput3" tabIndex="0" runat="server" Width="3.5em"  class="InputFieldNumeric"  MaxLength="6" ></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="祇ゅせらず快挡">									
									<ItemTemplate>
										<asp:textbox id="txInput4" tabIndex="0" runat="server" Width="3.5em"  class="InputFieldNumeric"  MaxLength="6" ></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="祇ゅせら快挡">									
									<ItemTemplate>
										<asp:textbox id="txInput5" tabIndex="0" runat="server" Width="3.5em"  class="InputFieldNumeric"  MaxLength="6" ></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="祇ゅら快挡">									
									<ItemTemplate>
										<asp:textbox id="txInput6" tabIndex="0" runat="server" Width="3.5em"  class="InputFieldNumeric" MaxLength="6" ></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="琩">									
									<ItemTemplate>
										<asp:textbox id="txInput7" tabIndex="0" runat="server" Width="3.5em" class="InputFieldNumeric"   MaxLength="6" ></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="祇ゅキАら计">
									<ItemTemplate>
										<asp:textbox id="txInput8" tabIndex="0" runat="server" Width="3.5em" class="InputFieldNumeric"   MaxLength="6" ></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="快そゅ">									
									<ItemTemplate>
										<asp:textbox id="txInput9" tabIndex="0" runat="server" Width="3.5em" class="InputFieldNumeric"   MaxLength="6" ></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="ゼ筄戳ン计">									
									<ItemTemplate>
										<asp:textbox id="txInput10" tabIndex="0" runat="server" Width="3.5em"   class="InputFieldNumeric" MaxLength="6" ></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="筄戳ン计">									
									<ItemTemplate>
										<asp:textbox id="txInput11" tabIndex="0" runat="server" Width="3.5em" class="InputFieldNumeric"   MaxLength="6" ></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="秨币" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="箇凝" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="" CssClass="hide" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
