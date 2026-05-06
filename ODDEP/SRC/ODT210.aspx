<%@ Page Language="c#" CodeBehind="ODT210.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT210" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT210</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body class="hidden" ms_positioning="GridLayout">
    <form id="ODT210" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div id="service" style="behavior: url(Template/LIB/webservice.htc)"></div>
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label class="KeyField" ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="KeyUpperField" ID="txDocNo" TabIndex="1" runat="server" MaxLength="15" Width="6.7em"></asp:TextBox>
                        <asp:TextBox class="hide" ID="h_txShowOdi260" TabIndex="1" runat="server" MaxLength="15" Width="6.7em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:TextBox class="InputFieldNumeric" ID="h_TxCanDelSeqNo" TabIndex="-1" runat="server" CssClass="hidden" Width="30px"></asp:TextBox>
                        <asp:Label class="InputFieldLabel" ID="Label3" runat="server">刪除序號</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="InputFieldText" ID="txShowSeqNo" TabIndex="2" runat="server" Width="3em"></asp:TextBox>
                        <asp:TextBox class="InputFieldNumeric" ID="txSeqNo" runat="server" Width="2em" CssClass="hide"></asp:TextBox>
                        <asp:TextBox class="" ID="h_ApplyUser" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox class="" ID="h_ApplyNo" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox class="" ID="h_Guid" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:Label class="InputFieldLabel" ID="Label2" runat="server">之後(含)之異動</asp:Label>
                        <asp:Label ID="lbNo" runat="server" ForeColor="Red" CssClass="hide">！無刪除權限</asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" AccessKey="D" title="刪除異動(ALT+D)" runat="server" Text="刪除異動(D)" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btDeleteThread" AccessKey="S" ToolTip="分會異動撤銷(ALT+S)" runat="server" Text="分會異動撤銷(S)" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 18px; position: absolute; top: 118px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 20px; position: absolute; top: 99px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
