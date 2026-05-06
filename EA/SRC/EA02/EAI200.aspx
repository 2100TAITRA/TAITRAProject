<%@ Page Language="c#" CodeBehind="EAI200.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAI200" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAI200 檔案編目數量統計作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAI200" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label10" runat="server">編目日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCLOSE_DATES" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label15" runat="server">－</asp:Label>
                        <asp:TextBox ID="txCLOSE_DATEE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">清理別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" TabIndex="40" runat="server" Width="8.5em" CssClass="comboBox" Rows="10"></cc1:ComboBox>
                        <asp:DropDownList ID="ddlSecNo" runat="server">
                            <asp:ListItem Value="0" Selected="True">清查</asp:ListItem>
                            <asp:ListItem Value="1">降解密</asp:ListItem>
                            <asp:ListItem Value="2">銷毀</asp:ListItem>
                            <asp:ListItem Value="3">移轉</asp:ListItem>
                            <asp:ListItem Value="4">移交</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lbNUM_TEXT" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv">
                            <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemStyle HorizontalAlign="Center" Width="1.5em"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="承辦單位">
                                        <ItemStyle HorizontalAlign="Left" Width="5.5em"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbDEPT_NAME" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="檔號">
                                        <ItemStyle HorizontalAlign="Left" Width="18em"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbFILENO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="件數">
                                        <ItemStyle HorizontalAlign="Center" Width="2.5em"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbNUM" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
