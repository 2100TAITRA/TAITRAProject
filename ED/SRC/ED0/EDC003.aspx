<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDC003.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDC003" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDC003 分層決行細目查詢作業</title>
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
    <form id="EDC003" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">使用單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlUseDept" TabIndex="1" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">決行層級代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txProxyNo1" TabIndex="1" runat="server" Width="3em" MaxLength="5"></asp:TextBox>～
						<asp:TextBox ID="txProxyNo2" TabIndex="1" runat="server" Width="3em" MaxLength="5"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server">決行層級名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txProxyName" TabIndex="1" runat="server" Width="24.5em" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
            </div>
            <style type="text/css">
                .wordBreakFix
                {
                    word-break:break-all;
                }
            </style>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv" style="height: 15.5em;">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center" ItemStyle-CssClass="wordBreakFix">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="決行層級代碼">
                                <ItemTemplate>
                                    <asp:HyperLink ID="lbProxyNo" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="決行層級名稱">
                                <ItemTemplate>
                                    <asp:Label ID="lbProxyName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="使用單位&lt;BR&gt;決行層級">
                                <ItemTemplate>
                                    <asp:Label ID="lbUseDept" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbProxyLevel" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="節點">
                                <ItemTemplate>
                                    <asp:Label ID="lbNode1" runat="server"></asp:Label>
                                    <asp:Label ID="lbSplit" runat="server">-</asp:Label><br>
                                    <asp:Label ID="lbNode2" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="備註">
                                <ItemTemplate>
                                    <asp:Label ID="lbDesc" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
