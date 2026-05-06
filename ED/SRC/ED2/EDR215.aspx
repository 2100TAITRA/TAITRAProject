<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR215.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR215" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR215 承辦公文績效天數明細表列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR215" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_dlDept_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Dept" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">收文日期：</asp:Label> 
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txRcvDateS" CssClass="RequireField DatePicker" TabIndex="10" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txRcvDateE" CssClass="RequireField DatePicker" TabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:TextBox>                        
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12.5em">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>　
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>　
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label5" runat="server">辦理天數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlWorkDay" runat="server" Width="5.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1-6">1-5.5</asp:ListItem>
                            <asp:ListItem Value="6-12">6-11.5</asp:ListItem>
                            <asp:ListItem Value="12-18">12-17.5</asp:ListItem>
                            <asp:ListItem Value="18-30">18-29.5</asp:ListItem>
                            <asp:ListItem Value="30-42">30-41.5</asp:ListItem>
                            <asp:ListItem Value="42">>=42</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width:12.5em">
                        <asp:Label ID="Label4" runat="server">辦畢方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlCloseType" runat="server" Width="5.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">發文</asp:ListItem>
                            <asp:ListItem Value="2">存查</asp:ListItem>
                            <asp:ListItem Value="3">單位發</asp:ListItem>
                            <asp:ListItem Value="4">單位存</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>                        
			<asp:Button runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btExcel"></asp:Button>
            <asp:Button runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btODS"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
