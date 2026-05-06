<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR456.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR456" %>

<!DOCTYPE HTML >
<html>
<head>
    <title>EDR456 各類案件統計明細表</title>
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
    <form id="EDR456" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_BType" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_YearMonth" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em;">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireFieldNumeric">列印月份：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em;">
                        <asp:TextBox ID="txYearMonthS" TabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:TextBox>─
                        <asp:TextBox ID="txYearMonthE" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="dTDTitlecvDate">
                    <div class="dTDTitle" style="width: 9em;" >
                        <asp:Label ID="LabelRcvDate" runat="server">收文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;" >
                        <asp:TextBox ID="txRcvDateS" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>─
                        <asp:TextBox ID="txRcvDateE" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em;">
                        <asp:Label ID="Label2" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:DropDownList ID="dlDocProperty" TabIndex="80" runat="server" Width="10em">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em;">
                        <asp:Label ID="Label3" runat="server">業務類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:DropDownList ID="dlBType" runat="server"></asp:DropDownList>
                        <asp:DropDownList ID="H_dlBTypeAll" runat="server" CssClass="hide"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em;">
                        <asp:Label ID="Label4" runat="server">報表格式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:RadioButton ID="rbStat" runat="server" CssClass="InputFieldLabel" GroupName="rptType" Text="案件統計表"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 20em;">
                        <asp:RadioButton ID="rbDetail" runat="server" GroupName="rptType" Text="案件明細表"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em;">
                        <asp:Label ID="Label5" runat="server">目前最大統計年月：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:Label ID="lbMaxYearMonth" runat="server">Label</asp:Label>
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
