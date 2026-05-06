<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR208.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR208" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR208 案卷標籤列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAR206" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">案卷名稱列印：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rblClsCaseName" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="0">分類號+案名</asp:ListItem>
                            <asp:ListItem Value="1">分類名</asp:ListItem>
                            <asp:ListItem Value="2" Selected="True">案名</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">列印選項：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbPrePrint" runat="server" Text="預印(查無案卷資料時，仍印出檔號)"></asp:CheckBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div id="Page1" class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="8">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO1" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="卷號(版本─年度─分類─案─卷)">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="txVer1" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:TextBox>─
									<asp:TextBox ID="txYear1" TabIndex="0" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3"></asp:TextBox>─
									<asp:TextBox Style="z-index: 0" ID="txCls1" onkeypress="jf_UPPERCASE()" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>─
									<asp:TextBox Style="z-index: 0" ID="txCase1" onkeypress="jf_UPPERCASE()" runat="server" Width="7em" MaxLength="12"></asp:TextBox>─
									<asp:TextBox Style="z-index: 0" ID="txVol1" onkeypress="jf_UPPERCASE()" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>