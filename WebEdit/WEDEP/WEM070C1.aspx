<%@ Page Language="c#" CodeBehind="WEM070C1.aspx.cs" AutoEventWireup="false" Inherits="WebEditWs.WEM070C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>WEM070C1 範本查詢子視窗</title>
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
    <form id="WEM070C1" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable">
            <div class="hide" id="MainTable">
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
            <div class="dTR">
                <asp:Label ID="Label3" runat="server">範本清單：</asp:Label>
            </div>
                <div class="GridDiv" style="height: 10em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="2" GridLines="Vertical">
                        <Columns>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox id="cbFile" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="類別">
                                <ItemTemplate>
                                    <asp:Label ID="lbClass" runat="server" MaxLength="4" Width="2.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="名稱">
                                <ItemTemplate>
                                    <asp:Label ID="lbFileName" runat="server" MaxLength="300" Width="12em"></asp:Label>
                                    <asp:textbox ID="h_FileName" CssClass="hide" runat="server" Width="1em"></asp:textbox>
                                    <asp:textbox ID="h_id"  CssClass="hide" runat="server" Width="1em"></asp:textbox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="設定範本" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />            
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
