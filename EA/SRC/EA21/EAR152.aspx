<%@ Page Language="c#" CodeBehind="EAR152.aspx.cs" AutoEventWireup="false" Inherits="EA21.EAR152" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR152 另存附件查詢列印作業</title>
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
    <form id="EAR152" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:textbox id="OrgNickName" runat="server"></asp:textbox>
			<asp:textbox id="H_Dept" runat="server" Width="19px" CssClass="hidden"></asp:textbox>
			<asp:textbox id="H_Sect_Value" runat="server" Width="19px" CssClass="hidden"></asp:textbox>
			<asp:textbox id="H_Sect_Text" runat="server" Width="19px" CssClass="hidden"></asp:textbox>
			<asp:textbox id="H_Dept_Value" runat="server" Width="19px" CssClass="hidden"></asp:textbox>
			<asp:textbox id="H_Dept_Text" runat="server" Width="19px" CssClass="hidden"></asp:textbox>
			<asp:textbox id="H_User_Value" runat="server" Width="19px" CssClass="hidden"></asp:textbox>
			<asp:textbox id="H_User_Text" runat="server" Width="19px" CssClass="hidden"></asp:textbox>
			<asp:textbox id="H_Sect_AllValue" runat="server" Width="19px" CssClass="hidden"></asp:textbox>
			<asp:textbox id="H_User_AllValue" runat="server" Width="19px" CssClass="hidden"></asp:textbox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">年度號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYearS" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">~</asp:Label>
                        <asp:TextBox ID="txYearE" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:dropdownlist id="ddldept" runat="server" Width="8.5em"></asp:dropdownlist>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">承辦科室：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:dropdownlist style="Z-INDEX: 0" id="ddlSect" runat="server" Width="9.5em"></asp:dropdownlist>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="列印" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint"></asp:Button>
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button runat="server" Style="display: none" Text="匯出Excel(O)" DefaultStyle="newmode:block;modifymode:block;" ID="btExcel" AccessKey="O" Title="匯出Excel(ALT+O)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
