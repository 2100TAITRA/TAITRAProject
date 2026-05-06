<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="TBR120.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBR120" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>TBR120 單位同仁簽收統計表列印作業</TITLE>
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
		<FORM id="TBR120" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../TBLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
                <div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em;">
                            <asp:label id="Label3" runat="server">統計單位：</asp:label>
                        </div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlDept" runat="server" Width="9em"></asp:dropdownlist>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em;">
                                <asp:label id="Label2" runat="server" CssClass="RequireField">統計日期：</asp:label>
                        </div>
                        <div class="dTD">
                            <asp:textbox id="txStartDate" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker RequireField" MaxLength="7"></asp:textbox>&nbsp;
                            <asp:label id="Label1" runat="server" CssClass="RequireField">至</asp:label>&nbsp;
                            <asp:textbox id="txEndDate" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker RequireField" MaxLength="7"></asp:textbox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em;">
                            <asp:label id="Label4" runat="server" CssClass="hide">統計格式：</asp:label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbSelectUser" runat="server"  Text="人員" GroupName="rbGSelect" CssClass="hide"></asp:RadioButton>
							<asp:RadioButton ID="rbSelectDept" runat="server"  Text="單位" GroupName="rbGSelect" CssClass="hide"></asp:RadioButton>
                        </div>
                    </div>
                </div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
                <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
