<%@ Page Language="c#" CodeBehind="WEM070.aspx.cs" AutoEventWireup="false" Inherits="WebEditWs.WEM070" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>WEM070 範本分享作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <link href="/STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="WEM070" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable">
            <div class="hide" id="MainTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:TextBox ID="h_webfileio" TabIndex="-1" runat="server" CssClass="TextLabel" Width="15em" MaxLength="15" ReadOnly="True"></asp:TextBox>
                        <asp:TextBox Style="z-index: 0" ID="h_filepath" TabIndex="-1" runat="server" CssClass="hidden" MaxLength="60"></asp:TextBox>
                    </div>
                </div>
                <asp:TextBox ID="h_OrgNo" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="h_DeptNo" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="h_UserId" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
            </div>
            <div class="DivTable">
                <div class="GridDiv" >
                    <asp:DataGrid ID="dg2" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2">
                        <Columns>
                            <asp:TemplateColumn HeaderText="對象">
                                <ItemTemplate>
                                    <asp:LABEL ID="lbPerSonUserName" runat="server" MaxLength="20" Width="5em"></asp:LABEL>
                                    <asp:TextBox ID="txHpersoninfo" runat="server" MaxLength="20" Width="5em" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="分享對象設定">
                                <ItemTemplate>
                                    <asp:Button id="btSet" runat="server" Text="設定"></asp:Button>
                                    <asp:Button id="btDel" runat="server" Text="清除"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選擇範本">
                                <ItemTemplate>
                                    <asp:Button id="btSetSample" runat="server" Text="選擇"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="分享範本清單">
                                <ItemTemplate>
                                    <asp:Label ID="lbSampleList" runat="server" MaxLength="15" Width="14.5em"></asp:Label>
                                    <asp:TextBox ID="h_idlist" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="h_filenamelist" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />            
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
