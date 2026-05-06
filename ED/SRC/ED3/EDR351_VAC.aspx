<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR351_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR351_VAC" %>

<!DOCTYPE HTML >
<html>
<head>
    <title>EDR351_VAC 發文件數統計表列印作業</title>
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
    <form id="EDR351" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px" CssClass="hidden"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="lbDate" runat="server" CssClass="RequireField">發文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em;">
                        <asp:textbox id="txPstDateStart" runat="server" Width="4em" CssClass="DatePicker RequireField" MaxLength="7"></asp:textbox>
						~
						<asp:textbox id="txPstDateEnd" runat="server" Width="4em" CssClass="DatePicker RequireField" MaxLength="7"></asp:textbox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="lbMethod" runat="server">簽核方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em;">
                        <asp:RadioButton  ID="rbAll" runat="server" Text="全部" GroupName="rb1" Checked="True" Value="0"></asp:RadioButton>
                        <asp:RadioButton  ID="rbPrinted" runat="server" Text="紙本" GroupName="rb1" Value="1"></asp:RadioButton>
                        <asp:RadioButton  ID="rbDigital" runat="server" Text="線上" GroupName="rb1" Value="2"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" AccessKey="P" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ></asp:Button>
			<asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
