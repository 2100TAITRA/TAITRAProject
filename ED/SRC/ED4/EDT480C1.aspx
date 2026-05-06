<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT480C1.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT480C1" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT480C1 ㄖ糵某∕﹚快挡ン计琩高穨</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT480C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:TextBox ID="H_txSect" TabIndex="0" runat="server" Width="88px" CssClass="RequireField" MaxLength="20"></asp:TextBox>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">参璸る</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYearMonth" TabIndex="0" runat="server" Width="3em" CssClass="InputFieldText" MaxLength="5"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" Width="90px">参璸虫</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" TabIndex="0" runat="server" CssClass="InputFieldText" Width="7.5em"></asp:DropDownList>
                        <asp:DropDownList ID="dlSect" TabIndex="0" runat="server" CssClass="InputFieldText" Width="7.5em"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv" style="height: 14.5em; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="参璸る">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlYearMonth" TabIndex="0" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="参璸虫絏">
                                <ItemTemplate>
                                    <asp:Label ID="lbOuId" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="参璸虫嘿">
                                <ItemTemplate>
                                    <asp:Label ID="lbOuName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="ㄖ糵某∕﹚快挡ン计">
                                <ItemTemplate>
                                    <asp:Label ID="lbMergeCloseCnt" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="穓碝" ID="btSearch" Title="穓碝(ALT+F)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
