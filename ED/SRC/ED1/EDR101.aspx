<%@ Page language="c#" Codebehind="EDR101.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR101" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR101 郵件送件單列印作業</TITLE>
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
		<FORM id="EDR101" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 6em;VISIBILITY: hidden">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="5.5em"></asp:listbox>
			</DIV>
			<div class="DivBaseTable" id="Basediv">
				<div class="DivTable" id="Maindiv" style="WIDTH: 32em">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label1" runat="server" >登錄時間：</asp:label>
						</div>
						<div>
							<asp:textbox id="txRcvDateTimeS" tabIndex="0" runat="server" Width="6em" CssClass="InputFieldNumeric" MaxLength="11"></asp:textbox>
							<asp:label id="Label4" runat="server">～</asp:label>
							<asp:textbox id="txRcvDateTimeE" tabIndex="0" runat="server" Width="6em" CssClass="InputFieldNumeric" MaxLength="11"></asp:textbox>
							<asp:label id="Label5" runat="server">(0940929或09409291430)</asp:label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label2" runat="server">收件單位：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txRcvDept" tabIndex="0" runat="server" Width="7em" MaxLength="20"></asp:textbox>
							<asp:DropDownList id="dlDept" runat="server"></asp:DropDownList>
						</div>
					</div>
					<div class="dTR">
						<div style="WIDTH: 5.5em" class="dTDTitle">
							<asp:label id="lbRcvArea" runat="server" CssClass="hide">收件地區：</asp:label>
						</div>
						<div class="dTD">
							<asp:dropdownlist style="Z-INDEX: 0" id="dlRcvArea" runat="server" CssClass="hide"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label3" runat="server">郵件類別：</asp:label>
						</div>
						<div class="dTD">
							<asp:checkboxlist id="cblMailType" runat="server" RepeatDirection="Horizontal"></asp:checkboxlist>
							<asp:checkbox id="cbNewPage" runat="server" Text="跨組室自動換頁"></asp:checkbox>
						</div>
					</div>
					<div class="dTR">
						<div style="WIDTH: 5.5em" class="dTDTitle">
							<asp:label id="Label6" runat="server">排序方式：</asp:label>
						</div>
						<div class="dTD">
							<asp:RadioButton id="rbOrder1" runat="server" Text="收件人姓名" Checked="True" GroupName="OrderGroup"></asp:RadioButton>
							<asp:RadioButton id="rbOrder2" runat="server" Text="郵件編號" GroupName="OrderGroup"></asp:RadioButton>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
