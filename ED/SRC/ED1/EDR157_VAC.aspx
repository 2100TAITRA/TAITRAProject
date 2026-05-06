<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR157_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR157_VAC" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR157_VAC ┯快そゅ罿ぱ计灿穨</title>
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
    <form id="EDR157_VAC" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">Μゅら戳</asp:Label> 
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txRcvDateS" CssClass="RequireField DatePicker" TabIndex="10" runat="server" Width="4em" MaxLength="7"></asp:TextBox>⌒
						<asp:TextBox ID="txRcvDateE" CssClass="RequireField DatePicker" TabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:TextBox>                        
                    </div>
                </div>
                <div class="dTR">
                     <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">ㄓ方</asp:Label> 
                    </div>
                    <div class="dTD">
						<asp:RadioButton id="rbAll" tabIndex="30"  Checked="True" Text="场" GroupName="RcvType" runat="server" Width="7em" ></asp:RadioButton>
                        <asp:RadioButton id="rbE" tabIndex="40"  Checked="True" Text="筿ユ传" GroupName="RcvType" runat="server" Width="7em" ></asp:RadioButton>
                        <asp:RadioButton id="rbP" tabIndex="50"  Checked="True" Text="セㄓゅ" GroupName="RcvType" runat="server" Width="7em" ></asp:RadioButton>
                        <asp:RadioButton id="rbC" tabIndex="60"  Checked="True" Text="チ種獺絚" GroupName="RcvType" runat="server" Width="7em" ></asp:RadioButton>
					</div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="箇凝" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>                        
			<asp:Button runat="server" Text="蹲Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btExcel"></asp:Button>
            <asp:Button runat="server" Text="蹲ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btODS"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
