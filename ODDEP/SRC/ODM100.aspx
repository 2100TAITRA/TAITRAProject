<%@ Page Language="c#" CodeBehind="ODM100.aspx.cs" AutoEventWireup="false" Inherits="OD.ODM100" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>ODM100 來文機關預設資訊維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <link href="Template/Lib/SYS.css" type="text/css" rel="stylesheet">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODM100" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 22em">
                        <asp:Label class="KeyField" ID="Label1" runat="server" CssClass="KeyField">機關代號或名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromOrgNo" TabIndex="10" runat="server" CssClass="KeyField" Width="9em" MaxLength="60"></asp:TextBox>
                        <asp:ImageButton ID="btFromPrompt" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txFromOrgName" TabIndex="-1" runat="server" CssClass="TextLabel" Width="15em" MaxLength="15" ReadOnly="True"></asp:TextBox>
                        <asp:TextBox Style="z-index: 0" ID="h_OrgID" TabIndex="-1" runat="server" CssClass="hidden" MaxLength="60"></asp:TextBox>
                    </div>
                </div>
                <asp:TextBox ID="h_OrgNo" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="h_DeptNo" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="h_UserId" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
            </div>
            <div class="DivTable">
                <asp:Label ID="Label4" runat="server">預設來文字：</asp:Label>
                <div class="GridDiv" style="height: 10em" data-fixed ="true">
                    <asp:DataGrid ID="dg2" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文字">
                                <ItemTemplate>
                                    <asp:TextBox ID="txFromWord" runat="server" MaxLength="15" Width="14.5em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <div id="Table1" class="DivTable">
                <asp:Label ID="Label3" runat="server">預設主旨：</asp:Label>
                <div class="GridDiv" style="height: 10em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="2" GridLines="Vertical">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="代碼">
                                <ItemTemplate>
                                    <asp:TextBox ID="txSubNo" runat="server" MaxLength="4" Width="2.5em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="預設主旨內容">
                                <ItemTemplate>
                                    <asp:TextBox ID="txSubject" runat="server" MaxLength="300" Width="12em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
