<%@ Page Language="c#" CodeBehind="SYC290.aspx.cs" AutoEventWireup="false" Inherits="AK.SYC290" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>SYC290 編目人名提示子視窗</title>
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
    <form id="SYC290" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:ListBox ID="lbTemp" Style="display: none; z-index: 108; left: 10px; position: absolute; top: 8px" runat="server" CssClass="hidden" Width="1px" Height="25px"></asp:ListBox>
        <asp:CustomValidator ID="CustomValidatorCommon" Style="z-index: 107; left: 788px; position: absolute; top: 282px" runat="server" ErrorMessage="請輸入搜尋條件" Display="None"></asp:CustomValidator>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" Style="z-index: 106; left: 855px; position: absolute; top: 185px" runat="server" ErrorMessage="新增人名代碼不可為空白" Display="None" ControlToValidate="tbPSN_NO">X</asp:RequiredFieldValidator>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" Style="z-index: 105; left: 443px; position: absolute; top: 445px" runat="server" ErrorMessage="新增人名名稱不可為空白" Display="None" ControlToValidate="tbPSN_NAME">X</asp:RequiredFieldValidator>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="重新搜尋(F)" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch" AccessKey="F" Title="重新搜尋(ALT+F)"></asp:Button>
            <asp:Button runat="server" Text="預覽列印(E)" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview" AccessKey="E" Title="預覽列印(ALT+E)"></asp:Button>
            <asp:Button runat="server" Text="新增(S)" DefaultStyle="newmode:block;modifymode:block;" ID="btSave" AccessKey="S" Title="新增(ALT+S)"></asp:Button>
            <asp:Button runat="server" Text="刪除" DefaultStyle="newmode:block;modifymode:block;" ID="btDelete"></asp:Button>
        </asp:Panel>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">搜尋條件：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbNo" TabIndex="1" runat="server" CssClass="InputUpperFieldText" MaxLength="10" Width="18.5em"></asp:TextBox>
                    </div>
                </div>
                <fieldset style="width: 25em; height: 4.5em">
                    <legend id="lbnewsub">新增人名</legend>
                    <div class="DivTable" id="Table1">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 3.5em">
                                <asp:Label ID="lbPSN_NO" runat="server">代碼：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="tbPSN_NO" TabIndex="2" runat="server" MaxLength="6" Width="3.5em"></asp:TextBox>
                                <asp:Label ID="lbAutono" runat="server">自動編號</asp:Label>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 3.5em">
                                <asp:Label ID="lbPSN_NAME" runat="server">名稱：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="tbPSN_NAME" TabIndex="3" runat="server" MaxLength="20" Width="18.5em"></asp:TextBox>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset style="width: 25em; height: 4.5em">
                    <legend id="lbdelsub">刪除人名</legend>
                    <div class="DivTable" id="Table2">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 3.5em">
                                <asp:Label ID="Label3" runat="server">代碼：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 18.5em; min-height:1px">
                                <asp:TextBox ID="tbPSN_NO2" runat="server" MaxLength="6" Width="3.5em"></asp:TextBox>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:HyperLinkColumn DataNavigateUrlField="PSN_NO" DataNavigateUrlFormatString="javascript:RetSelected(&quot;{0}&quot;)" DataTextField="PSN_NO" HeaderText="代碼"></asp:HyperLinkColumn>
                            <asp:BoundColumn DataField="PSN_NAME" HeaderText="人名"></asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <asp:ListBox ID="Listbox1" Style="z-index: 109; left: 895px; position: absolute; top: 227px" runat="server" Width="70px" Height="33px" CssClass="hide"></asp:ListBox>
    </form>
</body>
</html>
