<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFC020.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFC020" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>IFC020 人員共用子視窗</title>
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
    <form id="IFC020" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label3" runat="server">搜尋條件：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSearch" runat="server" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label1" runat="server">帳號狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbSearchEnable" runat="server" Checked="True" GroupName="AD" Text="啟用"></asp:RadioButton><asp:RadioButton ID="rbSearchDisable" runat="server" GroupName="AD" Text="停用"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label2" runat="server">所屬主要單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server" Width="9em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:CheckBox ID="cbRecentModify" runat="server" Text="近期異動人員"></asp:CheckBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="Height:20em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4" PageSize="50">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label Style="word-break: break-all" ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="帳號">
                                <ItemTemplate>
                                    <asp:HyperLink Style="word-break: break-all" ID="hlAccount" runat="server" Width="6.5em"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="姓名">
                                <ItemTemplate>
                                    <asp:Label Style="word-break: break-all" ID="lbName" runat="server"></asp:Label>
                                    <asp:HyperLink Style="word-break: break-all" ID="hlAccount2" runat="server" Width="6.5em"></asp:HyperLink>
                                    <asp:Label Style="word-break: normal" ID="lbDept" runat="server" Width="12em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="狀態">
                                <ItemTemplate>
                                    <asp:Label Style="word-break: break-all" ID="lbStatus" runat="server" Width="2.5em"></asp:Label>
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
        <asp:TextBox Style="z-index: 102; position: absolute; top: 448px; left: 336px" ID="htxOrgNo"
            runat="server" CssClass="hide"></asp:TextBox>
    </form>
</body>
</html>
