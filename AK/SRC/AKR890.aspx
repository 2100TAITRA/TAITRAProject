<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKR890.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR890" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKR890 だ摸秸计秖参璸穨</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKR890" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label2" runat="server">参璸</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear" TabIndex="10" runat="server" Width="2em" MaxLength="3" CssClass="RequireFieldNumeric"></asp:TextBox>
                    </div>
                </div>
                <fieldset style="width: 13em; height: 4em">
                    <legend>程参璸虫</legend>
                    <div id="Table2" class="DivTable">
                        <div class="dTR">
                            <div class="dTD">
                                <asp:RadioButton ID="rb1" runat="server" GroupName="GN" Text="摸"></asp:RadioButton>
                                <asp:RadioButton ID="rb2" runat="server" GroupName="GN" Text="乎"></asp:RadioButton>
                                <asp:RadioButton ID="rb3" runat="server" GroupName="GN" Text="ヘ"></asp:RadioButton>
                                <asp:RadioButton ID="rb4" runat="server" GroupName="GN" Text="竊"></asp:RadioButton>
                                <asp:RadioButton ID="rb5" runat="server" GroupName="GN" Text="兜"></asp:RadioButton>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label1" runat="server" Width="5.5em"></asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMaxUseDate" TabIndex="-1" runat="server" CssClass="TextLabel" Width="20.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="50"></asp:DataGrid>
                    <asp:TextBox ID="H_VerNo" runat="server" CssClass="hidden" Width="1.5em" TabIndex="-1"></asp:TextBox>
                </div>
            </div>
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
