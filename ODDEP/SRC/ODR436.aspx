<%@ Page Language="c#" CodeBehind="ODR436.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR436" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR436 穦快そゅ参璸穨</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR436" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label1" class="KeyField" style="ime-mode:disabled" runat="server" CssClass="RequireField">る</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSMon" TabIndex="1" runat="server" CssClass="RequireFieldNumeric" Width="3em" MaxLength="5"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label4" runat="server">虫</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="9em" Rows="8" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label3" class="KeyField" runat="server">厨贺摸</asp:Label></div>
                    <div class="dTD">
                        <asp:RadioButton ID="RadioButton1" TabIndex="2" runat="server" GroupName="report" Text="穦快そゅ参璸" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="RadioButton2" TabIndex="3" runat="server" GroupName="report" Text="穦快筄戳そゅ灿"></asp:RadioButton>
                        <asp:RadioButton ID="RadioButton3" TabIndex="3" runat="server" GroupName="report" Text="穦快筄戳そゅ灿(穦快瑈祘)"></asp:RadioButton>
                    </div>
                </div>
 				<div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
					</div>
                    <div class="dTD">
                        <asp:radiobutton id="RadioButton4" tabIndex="4" runat="server" GroupName="report" Text="穦そゅ灿"></asp:radiobutton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">&nbsp</div>
                    <div class="dTD">
                        <asp:Label ID="lbMaxYear" runat="server">ヘ玡参璸程る88888る</asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" PageSize="50" Visible="False"></asp:DataGrid>
                    <asp:TextBox ID="h_txYM" class="KeyUpperField" TabIndex="15" runat="server" CssClass="hidden" Width="45px" MaxLength="5"></asp:TextBox>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="参璸" ID="btStatic"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="箇凝" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" CssClass="hide" Text="" ID="btPrint"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 104; position: absolute; top: 218px; left: 12px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 105; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
