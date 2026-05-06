<%@ Page language="c#" Codebehind="EDT136.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDT136" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDT136 RPD21異常中止通知作業</TITLE>
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
		<FORM id="EDT136" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:TextBox id="txWS" runat="server" Width="8px" Height="1px"></asp:TextBox><asp:TextBox id="txFilePath" runat="server" Width="8px" Height="1px"></asp:TextBox>
				<asp:TextBox id="txPath" runat="server" Width="8px" Height="2px"></asp:TextBox><asp:TextBox id="txDelSeq" runat="server" Width="8px" Height="2px"></asp:TextBox></DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="width: 6em;"><asp:label id="lbFileName" runat="server">檔案名稱：</asp:label></div>
						<div class="dTD"><asp:textbox id="txFileName" tabIndex="0" runat="server" Width="30.5em" 
								CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 6em;"><asp:label id="lbFromOrgName" runat="server">來文機關：</asp:label></div>
						<div class="dTD"><asp:textbox id="txFromOrgName" tabIndex="0" runat="server" Width="30.5em" 
								CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 6em;"><asp:label id="lbFromNo" runat="server">來文字號：</asp:label></div>
						<div class="dTD"><asp:textbox id="txFromNo" tabIndex="0" runat="server" Width="30.5em" 
								CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 6em;"><asp:label id="lbErrTime" runat="server">異常時間：</asp:label></div>
						<div class="dTD"><asp:textbox id="txErrTime" tabIndex="0" runat="server" Width="30.5em" 
								CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 6em;"><asp:label id="lbErrReason" runat="server">錯誤原因：</asp:label></div>
						<div class="dTD"><asp:textbox id="txErrReason" tabIndex="0" runat="server" Width="30.5em" 
								CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 6em;"><asp:label id="lbErrMsg" runat="server">錯誤訊息：</asp:label></div>
						<div class="dTD"><asp:textbox id="txErrMsg" tabIndex="0" runat="server" Width="30.5em" 
								CssClass="DisplayOnly" Height="75px" ReadOnly="True" TextMode="MultiLine"></asp:textbox></div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btConfirm" runat="server" Accesskey="Z" title="確認(ALT+Z)" Text="確認(Z)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
