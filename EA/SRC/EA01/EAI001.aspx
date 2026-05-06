<%@ Page Language="c#" CodeBehind="EAI001.aspx.cs" AutoEventWireup="false" Inherits="EA01.EAI001" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>EAI001 公文所屬批號查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAC001" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericChild.htm"-->
        <div id="hiddenDiv" style="height: 100px; width: 100px; position: absolute; left: 0px; z-index: -100; top: 0px; visibility: hidden">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label5" runat="server" CssClass="RequireField">制定年度：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em;">
                        <asp:TextBox ID="txYearS" runat="server" Width="2em" CssClass="RequireFieldNumeric" MaxLength="3"></asp:TextBox>－
                        <asp:TextBox ID="txYearE" runat="server" Width="2em" CssClass="RequireFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label1" runat="server">清理別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em;">
                        <asp:DropDownList ID="dlPlanType" runat="server" Width="7.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="100000">清查</asp:ListItem>
                            <asp:ListItem Value="010000">降解密</asp:ListItem>
                            <asp:ListItem Value="001000">銷毀</asp:ListItem>
                            <asp:ListItem Value="000100">移轉</asp:ListItem>
                            <asp:ListItem Value="000010">移交</asp:ListItem>
                            <asp:ListItem Value="000001">鑑定</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em;">
                        <asp:TextBox ID="txDocNo" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <div id="GridTable" class="DivTable">
            <div class="dTR">
                <div class="GridDiv" style="overflow: auto; height: 221px">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4">
                        <Columns>
                            <asp:TemplateColumn HeaderText="清理別">
                                <ItemTemplate>
                                    <asp:Label ID="lbPlanType" runat="server" Width="3.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="清理批號">
                                <ItemTemplate>
                                    <asp:Label ID="lbPlanNo" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbPlanStatus" runat="server" Width="15.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="批號說明">
                                <ItemTemplate>
                                    <asp:Label ID="lbPlanDesc" runat="server" Width="10.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="清理範圍">
                                <ItemTemplate>
                                    <asp:Label ID="lbPlanRange" runat="server" Width="24em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>

                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" AccessKey="Q" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" AccessKey="Z" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
