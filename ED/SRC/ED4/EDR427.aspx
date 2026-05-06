<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR427.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR427" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR427 ┯快そゅ矪瞶睲虫穨</TITLE>
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
		<FORM id="EDR427" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="H_Dept" runat="server"></asp:textbox>
				<asp:textbox id="H_Dept_Value" runat="server"></asp:textbox>
				<asp:textbox id="H_Sect" runat="server"></asp:textbox>
				<asp:textbox id="H_Sect_Value" runat="server"></asp:textbox>
				<asp:textbox id="H_dlSect_Value" runat="server"></asp:textbox>
				<asp:textbox id="H_YearMonth" runat="server"></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label1" runat="server" CssClass="RequireField">参璸る</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:TextBox id="txYearMonthS" runat="server" Width="3em" CssClass="RequireFieldNumeric" 
								MaxLength="5"></asp:TextBox>
							<asp:label id="Label5" runat="server"></asp:label>
							<asp:TextBox id="txYearMonthE" runat="server" Width="3em" CssClass="RequireFieldNumeric" 
								MaxLength="5"></asp:TextBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label2" runat="server">┯快虫</asp:label>
						</DIV>
						<DIV class="dTD">
							<cc1:combobox style="Z-INDEX: 0" id="dlDept" tabIndex="30" runat="server" Width="8em" CssClass="comboBox"
								></cc1:combobox>
							<cc1:combobox style="Z-INDEX: 0" id="dlSect" tabIndex="40" runat="server" Width="8em" CssClass="comboBox"
								></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label3" runat="server">そゅ摸</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:DropDownList id="dlDocProperty" runat="server"></asp:DropDownList>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label4" runat="server">厨摸</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:RadioButton id="rbLvl" runat="server" GroupName="Type" Text="そゅ矪瞶计秖の∕︽糷Ω睲虫" 
								Checked="True"></asp:RadioButton><br>
							<asp:RadioButton id="rbUdIssue" runat="server" GroupName="Type" Text="そゅ矪瞶计秖の祇ゅぱ计睲虫" 
								></asp:RadioButton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:0.5em">&nbsp;</DIV>
						<DIV class="dTD">
							<asp:label id="lbMaxYear" runat="server">ヘ玡程参璸る</asp:label>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btStatic" runat="server" Text="参璸" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="箇凝" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
