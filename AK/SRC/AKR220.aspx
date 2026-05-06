<%@ Page Language="c#" CodeBehind="AKR220.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR220" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR220 耴郎计秖参璸穨</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKR220" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label1" runat="server"></asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="RequireFieldNumeric" ID="txYear" TabIndex="1" runat="server" Width="2em" MaxLength="3">123</asp:TextBox>
                        <asp:TextBox ID="txHideYear" runat="server" CssClass="hidden" Width="2em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">絛瞅</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dgDept" TabIndex="2" runat="server" CssClass="comboBox" Width="7em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">参璸よΑ</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb_level1" TabIndex="3" runat="server" Text="ㄌ舱" GroupName="calway" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rb_level2" TabIndex="4" runat="server" Text="ㄌ" GroupName="calway"></asp:RadioButton>
                        <asp:RadioButton ID="rb_personal" TabIndex="5" runat="server" Text="┯快" GroupName="calway"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" Width="1.5em"></asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="txMaxUseDate" TabIndex="-1" runat="server" Width="20em"></asp:Label>
                    </div>
                </div>
            </div>
            <cc1:ComboBox ID="dlDept" TabIndex="2" runat="server" CssClass="hide" Width="7em"></cc1:ComboBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btStatic" runat="server" Text="参璸(S)" AccessKey="S" Title="参璸(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="箇凝" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
