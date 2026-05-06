<%@ Page Language="c#" CodeBehind="EAR212.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAR212" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR212 公文櫃位清單預覽列印作業</title>
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
    <form id="EAR212" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px">
                    </div>
                    <div class="dTD" style="width: 2.5em">
                        <asp:Label ID="Label9" runat="server" CssClass="RequireField">年度</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:Label ID="Label10" runat="server" CssClass="RequireField">分類</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:Label ID="Label14" runat="server" CssClass="RequireField">案次號</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label20" runat="server" CssClass="RequireField">卷次號</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label21" runat="server" CssClass="RequireField">檔號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onblur="PadLeftWithZero(3)" ID="txFileYear" TabIndex="30" runat="server" Width="2em" CssClass="RequireField" MaxLength="3"></asp:TextBox>
                        <asp:TextBox ID="txFileCls" TabIndex="40" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="20"></asp:TextBox>
                        <asp:TextBox ID="txFileCase" TabIndex="50" runat="server" Width="6.5em" CssClass="RequireField" MaxLength="12"></asp:TextBox>
                        <asp:TextBox ID="txFileVol" TabIndex="60" runat="server" Width="2.5em" CssClass="RequireField" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label22" runat="server" Width="84px" CssClass="RequireField" Height="22px">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo1" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>～
						<asp:TextBox ID="txDocNo2" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server" Width="150px" CssClass="RequireField" Height="22px">存放位置：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txLocation1" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="8"></asp:TextBox>～
						<asp:TextBox ID="txLocation2" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="8"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px">
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOrderFileNo" runat="server" CssClass="RequireField" Checked="True" GroupName="Order" Text="以檔號排序"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderCls" runat="server" CssClass="RequireField" GroupName="Order" Text="以分類號排序"></asp:RadioButton>
                    </div>
                </div>

            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
