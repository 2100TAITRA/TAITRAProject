<%@ Page Language="c#" CodeBehind="ODM060.aspx.cs" AutoEventWireup="false" Inherits="OD.ODM060" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODM060 非預期假日維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODM060" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">年　　度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear" runat="server" CssClass="KeyUpperField KeyFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:TextBox ID="txSelectedIndex" TabIndex="-1" runat="server" CssClass="hide" Width="20px"></asp:TextBox>
                    </div>
                </div>
            </div>
            <asp:Panel ID="P1" runat="server">
                <div class="DivTable" id="Table1">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label2" runat="server">假日類別：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList ID="dlType" runat="server" Width="5.5em"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label3" runat="server" CssClass="RequireField">日　　期：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txDate" runat="server" CssClass="RequireFieldNumeric DatePicker" MaxLength="7" Width="8em"></asp:TextBox>
                            <asp:Button ID="btAddDate" runat="server" Text="加入"></asp:Button>
                            <asp:Button ID="btSaveDate" runat="server" Text="儲存"></asp:Button>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label4" runat="server">適用單位：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbSource" runat="server" Text="全機關" GroupName="gn"></asp:RadioButton><br>
                            <asp:RadioButton ID="rbDept" runat="server" GroupName="gn"></asp:RadioButton>
                            <cc1:ComboBox ID="dlDept" runat="server" CssClass="comboBox" Width="10em"></cc1:ComboBox>
                        </div>
                    </div>
                </div>
            </asp:Panel>
            <div class="DivTable">
                <div class="GridDiv" style="overflow: auto; height: 19em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeqNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="假日類別">
                                <ItemTemplate>
                                    <asp:Label ID="lbType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="使用單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbOuName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="維護">
                                <ItemTemplate>
                                    <asp:Button ID="btDeleteRow" runat="server" Text="刪除"></asp:Button>
                                    <asp:Button ID="btModify" runat="server" Text="維護"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="維護" DefaultStyle="newmode:none;modifymode:none;" ID="btnModify"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:none;" ID="btnDeleteRow"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
