<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="SYC270.aspx.cs" AutoEventWireup="false" Inherits="AK.SYC270" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>SYC270 編目事件代碼提示子視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="SYC270" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hide"></asp:ListBox>
        <asp:ListBox ID="lbTemp" Style="z-index: 105; left: 871px; position: absolute; top: 154px" runat="server" Height="0px" Width="0px"></asp:ListBox>
        <asp:CustomValidator ID="CustomValidator" Style="z-index: 104; left: 346px; position: absolute; top: 398px" runat="server" ClientValidationFunction="CustomValidatortbDept_ClientValidate" Display="None"></asp:CustomValidator>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="lab" Width="87px">搜尋條件：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbSEARCH" TabIndex="20" runat="server" CssClass="InputUpperFieldText" MaxLength="30" Width="18.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <fieldset style="width: 25.5em; height: 4.5em">
                        <legend id="lbnewsub">新增主題</legend>
                        <div class="DivTable" id="Table1">
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Label5" runat="server">代碼：</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="tbSUB_NO" runat="server" MaxLength="6" Width="3.5em"></asp:TextBox>
                                    <asp:Label ID="lbMESSAGE" runat="server">自動編碼</asp:Label>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Label2" runat="server">名稱：</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="tbSUB_NAME" runat="server" MaxLength="30" Width="18.5em"></asp:TextBox>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="dTR">
                    <fieldset style="width: 25.5em; height: 4.5em">
                        <legend id="lbdelsub">刪除主題</legend>
                        <div class="DivTable" id="Table2">
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Label3" runat="server">代碼：</asp:Label>
                                </div>
                                <div class="dTD" style="width: 18.5em; min-height: 1px">
                                    <asp:TextBox ID="tbSUB_NO2" runat="server" MaxLength="6" Width="3.5em"></asp:TextBox>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div class="DivTable">
                <asp:Panel ID="pn1" runat="server">
                    <div class="GridDiv" id="DetailSection">
                        <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                            <Columns>
                                <asp:HyperLinkColumn DataNavigateUrlField="SUB_NO" DataNavigateUrlFormatString="javascript:RetSelected(&quot;{0}&quot;)" DataTextField="SUB_NO" HeaderText="代碼"></asp:HyperLinkColumn>
                                <asp:BoundColumn DataField="SUB_NAME" HeaderText="主題"></asp:BoundColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </asp:Panel>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Text="重新搜尋(Q)" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch" accesskey="Q" Title="重新搜尋(ALT+Q)"></asp:Button>
            <asp:Button runat="server" Text="預覽列印(P)" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview" accesskey="P" Title="預覽列印(ALT+P)"></asp:Button>
            <asp:Button runat="server" Text="新增(S)" DefaultStyle="newmode:block;modifymode:block;" ID="btSave" accesskey="Q" Title="新增(ALT+S)"></asp:Button>
            <asp:Button runat="server" Text="刪除" DefaultStyle="newmode:block;modifymode:block;" ID="btDelete"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 102; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 103; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
