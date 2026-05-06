<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAT501C1.aspx.cs" AutoEventWireup="false" Inherits="EA50.EAT501C1" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAT501C1銷毀計畫查詢子視窗</title>
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
    <form id="EAT501C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="BaseTable" id="BaseTable">
            <div class="MainTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label6" runat="server">銷毀計畫：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDPlanS" runat="server" CssClass="InputFieldNumeric" Width="5.5em" MaxLength="8"></asp:TextBox>～ 
                        <asp:TextBox ID="txDPlanE" runat="server" CssClass="InputFieldNumeric" Width="5.5em" MaxLength="8"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label5" runat="server">計畫別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlPlanType" runat="server" Width="10em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label4" runat="server">機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrg" runat="server" Width="14em" MaxLength="60"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label1" runat="server">檔案年度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYearS" runat="server" CssClass="InputFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>～ 
                        <asp:TextBox ID="txYearE" runat="server" CssClass="InputFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label2" runat="server">擬銷毀時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTimeS" runat="server" CssClass="InputFieldNumeric" Width="4em" MaxLength="7"></asp:TextBox>～ 
                        <asp:TextBox ID="txTimeE" runat="server" CssClass="InputFieldNumeric" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label3" runat="server">包含作業批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanNo" TabIndex="0" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label7" runat="server">文史機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txHistoryOrg" TabIndex="0" runat="server" Width="14em" MaxLength="60"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv" style="overflow: auto; width: 40em; height: 12em">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="銷毀計畫編號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlLink" TabIndex="0" runat="server" Width="1.5em"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="計畫別">
                                <ItemTemplate>
                                    <asp:Label ID="lbRead1" runat="server" Width="7em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="機關">
                                <ItemTemplate>
                                    <asp:Label ID="lbRead2" runat="server" Width="7.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔案年度">
                                <ItemTemplate>
                                    <asp:Label ID="lbRead3" runat="server" Width="8.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="擬銷毀時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbRead4" runat="server" Width="8em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
