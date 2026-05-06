<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR373.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR373" %>

<!DOCTYPE HTML  >
<html>
<head>
    <title>EDR373 發文人員工作量統計列印作業</title>
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
    <form id="EDR373" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">發文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txIssueDateS" runat="server" Width="4.5em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>─
                        <asp:TextBox ID="txIssueDateE" runat="server" Width="4.5em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">工作別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:RadioButton ID="rbRoleId1" runat="server" CssClass="RequireField" GroupName="ROLE" Text="繕印"></asp:RadioButton>
                        <asp:RadioButton ID="rbRoleId2" runat="server" CssClass="RequireField" GroupName="ROLE" Text="分校"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label3" runat="server">負責人員：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:DropDownList ID="dlUserOd92" runat="server"></asp:DropDownList>
                        <asp:DropDownList ID="dlUserOd93" runat="server"></asp:DropDownList>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" AccessKey="P" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
