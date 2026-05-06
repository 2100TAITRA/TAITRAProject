<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKM338.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM338" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKM338 編目主題維護</title>
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
    <form id="AKM338" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" Width="44.5em" GridLines="Vertical" CellPadding="4">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="編目項">
                                <ItemTemplate>
                                    <cc1:ComboBox ID="dlTYPE" CssClass="comboBox" runat="server" Width="5.5em"></cc1:ComboBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主題內容">
                                <ItemTemplate>
                                    <asp:TextBox ID="tbNO" onblur="jf_IsExistNAME()" runat="server" Width="3em" MaxLength="6"></asp:TextBox>
                                    <asp:ImageButton ID="ibt" TabIndex="-1" runat="server" Width="1.5em" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                                    <asp:TextBox ID="tbNAME" onblur="jf_IsExistNAME()" TabIndex="-1" runat="server" Width="25.5em" MaxLength="50"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <div style="z-index: 103; left: 168px; visibility: hidden; overflow: auto; width: 506px; top: 202px">
                <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
                <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
                <asp:ListBox ID="lbReturnValue" runat="server" CssClass="hide"></asp:ListBox>
                <asp:TextBox ID="tbOrgNo" runat="server" Width="1.5em"></asp:TextBox>
                <asp:TextBox ID="tbDocNo" runat="server" Width="1.5em"></asp:TextBox>
                <asp:TextBox ID="tbInpFileDate" runat="server" Width="1.5em"></asp:TextBox>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
