<%@ Page Language="c#" CodeBehind="EDM090.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM090" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDM090 機關別維護作業</title>
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
    <form id="EDM090" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_OrgNo" runat="server" CssClass="Hide"></asp:TextBox>
            <asp:TextBox ID="H_DeptNo" runat="server" CssClass="Hide"></asp:TextBox>
            <asp:TextBox ID="H_UserId" runat="server" CssClass="Hide"></asp:TextBox>
            <asp:TextBox ID="H_Location" runat="server" CssClass="Hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">機關別代號：</asp:Label></div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgtype_No" TabIndex="0" runat="server" Width="2.5em" CssClass="KeyFieldNumeric" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:6.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">機關別名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrg_Name" TabIndex="0" runat="server" Width="20.5em" CssClass="RequireField" MaxLength="40"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" EnableViewState="False" CssClass="DgSelectToolBar">
                    <asp:Button runat="server" Text="全部選取" ID="btSelectAll"></asp:Button>
                    <asp:Button runat="server" Text="反向選取" ID="btSelectInverse"></asp:Button>
                    <asp:Button runat="server" Text="清除選取" ID="btSelectClear"></asp:Button>
                    <asp:Button runat="server" Text="刪除選取" ID="btDeleteSelected"></asp:Button>
                    <asp:Button runat="server" Text="↑" ID="btUp"></asp:Button>
                    <asp:Button runat="server" Text="↓" ID="btDown"></asp:Button>
                </asp:Panel>
                <div class="GridDiv" style="height: 18.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="機關代碼">
                                <ItemTemplate>
                                    <asp:TextBox ID="txOrgtypeNo" TabIndex="0" runat="server" Width="9em" CssClass="InputFieldText" MaxLength="17"></asp:TextBox>
                                    <asp:ImageButton ID="btHelp" TabIndex="0" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="機關名稱">
                                <ItemTemplate>
                                    <asp:TextBox ID="txOrgName" TabIndex="0" runat="server" Width="22em" CssClass="PopUp" MaxLength="60"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave" ></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean" ></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
