<%@ Page Language="c#" CodeBehind="AKR897.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR897" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR897 郎ビ叫Ωの糵琩キА穨ぱ计参璸</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body class="hidden">
    <form id="AKR897" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="Table1" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label CssClass="RequireField" ID="Label1" runat="server">参璸</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="RequireFieldNumeric" ID="txYear" TabIndex="10" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <fieldset style="width: 13.5em; height: 3em">
                    <legend>程参璸虫</legend>
                    <div id="Table2" class="DivTable">
                        <div class="dTR">
                            <div class="dTD">
                                <asp:RadioButton ID="rb1" TabIndex="20" runat="server" Width="6em" Text="虫" GroupName="Grp" Checked="True"></asp:RadioButton>
                                <asp:RadioButton ID="rb2" TabIndex="30" runat="server" Width="6em" Text="虫" GroupName="Grp"></asp:RadioButton>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lbMaxYear" runat="server">ヘ玡参璸程888</asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" Width="28em" GridLines="Vertical" CellPadding="4" PageSize="50"></asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btStatic" runat="server" Text="参璸(S)" Accesskey = "S" Title = "参璸(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="箇凝" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
