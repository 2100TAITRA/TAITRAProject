<%@ Page Language="c#" CodeBehind="EDR362.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR362" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR362 發文方式統計表查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDR362" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
            <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" class="DatePicker" TabIndex="15" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txDateE" class="DatePicker" TabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" TabIndex="5" runat="server" Width="8em" MaxLength="15"></asp:TextBox>－
						<asp:TextBox ID="txDocNoE" TabIndex="10" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">發文方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbIssueType5" runat="server" Text="公布欄"></asp:CheckBox>
                        <asp:CheckBox ID="cbIssueType2" runat="server" Text="郵寄"></asp:CheckBox>
                        <asp:CheckBox ID="cbIssueType3" runat="server" Text="機關間人工交換"></asp:CheckBox>
                        <asp:CheckBox ID="cbIssueType8" runat="server" Text="機關內函件傳遞"></asp:CheckBox>
                        <asp:CheckBox ID="cbIssueType1" runat="server" Text="電子交換"></asp:CheckBox>
                        <asp:CheckBox ID="cbIssueType9" runat="server" Text="個人專區"></asp:CheckBox>
                        <asp:CheckBox ID="cbIssueType4" runat="server" Text="電子郵件"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">簽核類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlSignType" runat="server">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="E">線上簽核</asp:ListItem>
                            <asp:ListItem Value="P">紙本簽核</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server">報表格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbStaticDocNo" runat="server" Text="依公文文號統計" GroupName="Static"></asp:RadioButton>
                        <asp:RadioButton ID="rbStaticDept" runat="server" Text="依承辦單位統計" GroupName="Static"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="匯出Excel(O)" ID="btExcel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
