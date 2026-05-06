<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDM023.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM023" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDM023 核決層級清單明細檔維護作業</title>
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
    <form id="EDM023" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:7em">
                        <asp:Label ID="lbList" runat="server">核決層級清單：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlList" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 18em">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="名稱">
                                <ItemTemplate>
                                    <asp:TextBox ID="txAppName" runat="server" Width="12em" MaxLength="12"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" style="display:none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave" ></asp:Button>
            <asp:Button runat="server" style="display:none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
