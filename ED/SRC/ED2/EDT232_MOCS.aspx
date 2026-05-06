<%@ Page Language="c#" CodeBehind="EDT232_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT232_MOCS" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT232 銓敘公文登錄作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="../EDLIB/EDLIB.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDT232_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
			<asp:TextBox ID="hRoleNo" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="hRoleOuId" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="hTaType" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="hIsPersonTA" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="hProxyAccount" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">公文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txDocNo" runat="server" Width="6em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                    </div>
					<div class="dTDTitle" style="width: 4em">
                        <asp:Label ID="Label2" runat="server" CssClass="InputFieldLabel">&nbsp;</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:CheckBox ID="cbIsOnLine" runat="server" Text="線上簽核公文" CssClass="InputFieldLabel" />
                    </div>
					<div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">文別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:DropDownList ID="ddlCategory" TabIndex="50" runat="server" Width="8em"></asp:DropDownList>
                    </div>
                </div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server" CssClass="InputFieldLabel">速別：</asp:Label>
                    </div>
					<div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="ddlSpeed" TabIndex="60" runat="server" Width="6em"></asp:DropDownList>
                    </div>
					 <div class="dTDTitle" style="width: 4em">
                        <asp:Label ID="Label6" runat="server">密等：</asp:Label>
                    </div>
					<div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="ddlSec" TabIndex="40" runat="server" Width="5em"></asp:DropDownList>
                    </div>
					<div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">解密條件：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <cc1:ComboBox ID="dlRmvSecCond" TabIndex="45" runat="server" MaxLength="40" CssClass="comboBox">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="(本件至 年 月 日解密)">(本件至 年 月 日解密)</asp:ListItem>
                            <asp:ListItem Value="(本件於公布時解密)">(本件於公布時解密)</asp:ListItem>
                            <asp:ListItem Value="(其他(其他特別條件或另行檢討後辦理解密))">(其他(其他特別條件或另行檢討後辦理解密))</asp:ListItem>
                        </cc1:ComboBox>
                    </div>
				</div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label8" runat="server" CssClass="RequireField">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
						<asp:TextBox ID="txSubject" TabIndex="200" runat="server" Width="36em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv" style="height:10em">
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="登錄(S)" AccessKey="S" ToolTip="登錄(ALT+S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
