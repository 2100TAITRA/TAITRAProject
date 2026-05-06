<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR103.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR103" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR103 郵件登錄統計表</TITLE>
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
		<FORM id="EDR103" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 6.5em;VISIBILITY: hidden;">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="5.5em"></asp:listbox>	
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="width:5.5em">
							<asp:label id="Label5" runat="server" Width="5.5em" CssClass="RequireField">列印區間：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txDateS" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>－
							<asp:textbox id="txDateE" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>
							<asp:label id="Label1" runat="server" Width="3em" CssClass="RequireField">（09401）</asp:label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width:5.5em">
							<asp:label style="Z-INDEX: 0" id="Label2" runat="server" Width="5.5em" CssClass="RequireField">密等：</asp:label>
						</div>
						<div class="dTD">
								<asp:RadioButton id="rbAll" runat="server" CssClass="RequireField" Text="全部" GroupName="rb1" Checked="True"></asp:RadioButton>
								<asp:RadioButton style="Z-INDEX: 0" id="rbSec" runat="server" CssClass="RequireField" Text="機密等級以上公文" GroupName="rb1"></asp:RadioButton>
								<asp:RadioButton style="Z-INDEX: 0" id="rbNormal" runat="server" CssClass="RequireField" Text="普通" GroupName="rb1"></asp:RadioButton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width:5.5em">
							<asp:label style="Z-INDEX: 0" id="Label3" runat="server" Width="5.5em" CssClass="RequireField">統計方式：</asp:label>
						</div>
						<div class="dTD">
							<asp:RadioButton style="Z-INDEX: 0" id="rbNoDevide" runat="server" CssClass="RequireField" Text="不區分" GroupName="rb2"></asp:RadioButton>
                            <br/>
                            <asp:RadioButton style="Z-INDEX: 0" id="rbCount" runat="server" CssClass="RequireField" Text="依寄件方式區分" GroupName="rb2" Checked="True"></asp:RadioButton>
						    <br/>
                        	<asp:RadioButton style="Z-INDEX: 0" id="rbType" runat="server" CssClass="RequireField" Text="依收件單位區分" GroupName="rb2"></asp:RadioButton>
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
