<%@ Page Language="c#" CodeBehind="ODT130C2.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT130C2" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT130C2 任審資訊設定子視窗</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT130C2" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                  <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label2" runat="server" CssClass="InputFieldText">身分證號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPERSON_ID" runat="server" MaxLength="10" Width="6em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label1" runat="server" CssClass="InputFieldText">姓名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPERSON_FULL_NAME"  runat="server" MaxLength="100" Width="10em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label3" runat="server" CssClass="InputFieldText">任職機關代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txJOB_ORGNO" runat="server" MaxLength="9" Width="10em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label4" runat="server" CssClass="InputFieldText">任職機關名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txJOB_ORGNAME" runat="server" MaxLength="30" Width="10em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label5" runat="server" CssClass="InputFieldText">職務編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txJOB_NO" runat="server" MaxLength="10" Width="6em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label6" runat="server" CssClass="InputFieldText">職稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txJOB_TITLE_NO" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txJOB_TITLE" runat="server" MaxLength="10" Width="6em"></asp:TextBox>
                    </div>
                </div>
            </div>

        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" Text="儲存" ID="btSave" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" ID="btClean" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
