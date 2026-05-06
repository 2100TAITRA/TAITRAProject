<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI096.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDI096" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDI096 廠商送審附件類別查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server">
    </asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDI096" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator">
            </asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label1" runat="server">廠商送審附件類別代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txType" TabIndex="0" runat="server" Width="2em" MaxLength="3">
                        </asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label2" runat="server">附件所屬單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label3" runat="server">廠商送審附件類別名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTypeName" TabIndex="0" runat="server" Width="15.5em" MaxLength="30">
                        </asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv">
                    <div style="height: 20.5em; overflow: auto">
                        <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="廠商送審&lt;br&gt;附件所屬單位">
                                    <ItemTemplate>
                                        <asp:Label ID="lbDept" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="廠商送審&lt;br&gt;附件類別代碼">
                                    <ItemTemplate>
                                        <asp:HyperLink ID="hlType" TabIndex="0" runat="server"></asp:HyperLink>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="廠商送審&lt;br&gt;附件類別名稱">
                                    <ItemTemplate>
                                        <asp:Label ID="lbTypeName" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="搜尋" ID="btSearch"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
