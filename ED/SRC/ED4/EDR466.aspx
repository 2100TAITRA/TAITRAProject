<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR466.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR466" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR466 會辦公文時效統計列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
</head>
<body ms_positioning="GridLayout">
    <form id="EDR466" onkeyup="jf_CheckFull();" method="post" runat="server">
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
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">列印區間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppDateS" TabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label1" runat="server" Width="1em" CssClass="RequireField">－</asp:Label>
                        <asp:TextBox ID="txAppDateE" TabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label3" runat="server">列印單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="9em" CssClass="comboBox" Rows="10"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" runat="server" Width="9em" CssClass="comboBox" Rows="10"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label4" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="ddlProperty" runat="server" Width="10.5em" CssClass="comboBox" Rows="10"></cc1:ComboBox>
                    </div>
                </div>
            </div>
            <asp:TextBox ID="H_dlDept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" style="display:none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" style="display:none" DefaultStyle="newmode:block;modifymode:block;" Cssclass="hide" Text="列印" ID="btPrint"></asp:Button>
            <asp:Button runat="server" style="display:none" DefaultStyle="newmode:block;modifymode:block;" Text="匯出Excel" ID="btExcel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
