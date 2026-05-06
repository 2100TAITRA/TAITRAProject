<%@ Page language="c#" Codebehind="EDM041.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM041" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDM041 電子信箱案件類別維護作業</TITLE>
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
		<FORM id="EDM041" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 11em;">
                            <asp:label id="Label1" runat="server" CssClass="KeyField">信箱代碼：</asp:label>
                        </div>
                        <div class="dTD">
                            <asp:textbox id="txCodeNo" tabIndex="-1" runat="server" Width="1.5em" CssClass="KeyUpperField" MaxLength="2"></asp:textbox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 11em;">
                            <asp:label id="Label2" runat="server" CssClass="RequireField">信箱名稱：</asp:label>
                        </div>
                        <div class="dTD">
                            <asp:textbox id="txMailName" tabIndex="0" runat="server" Width="20em" CssClass="RequireField" MaxLength="20"></asp:textbox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 11em;">
                            <asp:label id="Label3" runat="server" CssClass="RequireField">時效計算方式：</asp:label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButtonList id="rblCount" runat="server" Width="9em" CssClass="RequireField">
                                <asp:ListItem Value="1">每半日計算</asp:ListItem>
                                <asp:ListItem Value="2">依實際辦理時數</asp:ListItem>
                                <asp:ListItem Value="3">按一般公文計算</asp:ListItem>
                            </asp:RadioButtonList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 11em;">
                            <asp:label id="Label4" runat="server" CssClass="RequireField">預定結案日計算方式：</asp:label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButtonList id="rblDay" runat="server" Width="9em" CssClass="RequireField">
                                <asp:ListItem Value="1">0.5天</asp:ListItem>
                                <asp:ListItem Value="2">隔日起算3天</asp:ListItem>
                            </asp:RadioButtonList>
                        </div>
                    </div>
                </div>
			</div>
            <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
