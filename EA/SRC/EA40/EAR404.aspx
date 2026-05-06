<%@ Page Language="c#" CodeBehind="EAR404.aspx.cs" AutoEventWireup="false" Inherits="EA40.EAR404" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE >
<html>
<head>
    <title>EAR404 附件櫥位號抽件清單列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAR404" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hide" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFrom" runat="server" Width="4.5em" MaxLength="8" CssClass="RequireField"></asp:TextBox>
                        <asp:ImageButton ID="btPLAN_S" TabIndex="-1" runat="server" ToolTip="提示計畫批號" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label8" runat="server" Width="16px" CssClass="InputFieldText">─</asp:Label>
                        <asp:TextBox ID="txTo" runat="server" Width="4.5em" MaxLength="8" CssClass="RequireField"></asp:TextBox>
                        <asp:ImageButton ID="btPLAN_E" TabIndex="-1" runat="server" ToolTip="提示計畫批號" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="InputFieldLabel" >計畫別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb1" runat="server" CssClass="InputFieldLabel" Text="清查" GroupName="PlanType"
                            Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rb2" runat="server" CssClass="InputFieldLabel" Text="降解密" GroupName="PlanType"></asp:RadioButton>
                        <asp:RadioButton ID="rb3" runat="server" CssClass="InputFieldLabel" Text="銷毀" GroupName="PlanType"></asp:RadioButton>
                        <asp:RadioButton ID="rb4" runat="server" CssClass="InputFieldLabel" Text="移轉" GroupName="PlanType"></asp:RadioButton>
                        <asp:RadioButton ID="rb5" runat="server" CssClass="InputFieldLabel" Text="移交" GroupName="PlanType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="InputFieldLabel">核准資訊：</asp:Label>
                    </div>
                    <div class="dTD" valign="top">
                        <asp:TextBox ID="txDESC" TabIndex="0" runat="server" Width="25em" CssClass="InputFieldText" MaxLength="20" Height="96px" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
