<%@ Page Language="c#" CodeBehind="OMI200C2.aspx.cs" AutoEventWireup="false" Inherits="OM2.OMI200C2" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>OMI200C2 駐外發文公文流程子視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="OMI200C2" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../OMLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="">公文明細：</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="">收創日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbRcvDate" runat="server" CssClass="" ></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server" CssClass="">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbDocNo" runat="server" CssClass="" ></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbFromDate" runat="server" CssClass="" ></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="">來文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbFromNo" runat="server" CssClass=""></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server" CssClass="">速別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbSpdName" runat="server" CssClass="" ></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server" CssClass="">結案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbCloseDate" runat="server" CssClass=""></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label6" runat="server" CssClass="">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbDeptName" runat="server" CssClass="" style="width: 6.5em"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label10" runat="server" CssClass="">承辦人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbEmpName" runat="server" CssClass=""></asp:Label>
                    </div>
                </div>
                <div class="DivTable" id="GridTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6em">
                            <asp:Label ID="Label9" runat="server" CssClass="">簽辦流程：</asp:Label>
                        </div>
                    </div>
                    <div class="GridDiv" style="height: 20%">
                        <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSEQ_NO" runat="server">123</asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="簽收單位">
                                    <ItemTemplate>
                                        <asp:Label ID="lbOwnOuID" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="簽收日期">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSignTime" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="簽收人員">
                                    <ItemTemplate>
                                        <asp:Label ID="lbOwnUser" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="送出日期">
                                    <ItemTemplate>
                                        <asp:Label ID="lbTxTime" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="送出人員">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSendUser" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="關閉" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
