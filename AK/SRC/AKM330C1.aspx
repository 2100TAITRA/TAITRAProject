<%@ Page Language="c#" CodeBehind="AKM330C1.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM330C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKM330C1 線上立案作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKM330C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <div id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
            <asp:TextBox ID="tbCase_year" runat="server" Width="40px"></asp:TextBox>
            <asp:TextBox ID="tbVer_no" runat="server" Width="40px"></asp:TextBox>
            <asp:TextBox ID="txCaseKey" runat="server" Width="40px"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">立案年度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputUpperFieldText" ID="txCaseYear" TabIndex="1" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:CheckBox ID="cbYear" runat="server" Text="使用年度號"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputUpperFieldText" ID="tbCls_no" TabIndex="2" runat="server" ReadOnly="True" MaxLength="20" Width="10.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">案次號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputUpperFieldText" ID="tbCase_no" TabIndex="3" runat="server" ReadOnly="True" Width="7.5em" MaxLength="12"></asp:TextBox>
                        <asp:CheckBox ID="ck1" runat="server" Text="系統自動編號" CssClass="hide"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">案名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbCase_name" TabIndex="4" runat="server" Width="25em" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">並列案名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbApp_subject" TabIndex="5" runat="server" Width="25em" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">其他案名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbOther_subject" TabIndex="6" runat="server" Width="25em" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" Width="28em" GridLines="Vertical" CellPadding="4" PageSize="50">
                        <Columns>
                            <asp:HyperLinkColumn DataNavigateUrlField="po_no" DataNavigateUrlFormatString="javascript:ReturnValue(&quot;{0}&quot;)"
                                DataTextField="po_no" HeaderText="test"></asp:HyperLinkColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="已立案查詢(Q)" AccessKey="Q" Title="已立案查詢(ALT+Q)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
