<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR402.aspx.cs" AutoEventWireup="false" Inherits="EA40.EAR402" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR402待清理檔案借出明細表</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAR402" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label2" runat="server" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:TextBox ID="txPlanNo" TabIndex="10" runat="server" Width="4.5em" MaxLength="8" CssClass="RequireUpperField"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="13" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">庫房：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlStoreNo" TabIndex="15" runat="server" Width="5.5em"></asp:DropDownList>
                        <asp:TextBox ID="txOrgNo" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">檔號(起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txYearS" TabIndex="30" runat="server" Width="2em" MaxLength="3"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txClsS" TabIndex="35" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txCaseS" TabIndex="40" runat="server" Width="7em" MaxLength="12"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txVolS" TabIndex="45" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>－
						<asp:TextBox CssClass="InputFieldNumeric" ID="txSeqS" TabIndex="50" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">檔號(迄)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txYearE" TabIndex="55" runat="server" Width="2em" MaxLength="3"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txClsE" TabIndex="60" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txCaseE" TabIndex="65" runat="server" Width="7em" MaxLength="12"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txVolE" TabIndex="70" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>－
						<asp:TextBox CssClass="InputFieldNumeric" ID="txSeqE" TabIndex="75" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
