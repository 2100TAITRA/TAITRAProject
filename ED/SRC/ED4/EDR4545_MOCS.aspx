<%@ Page Language="c#" CodeBehind="EDR4545_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4545_MOCS" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR4545_MOCS 公文時效分析表列印作業</title>
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
    <form id="EDR4545_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                  <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">統計月份：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txMonth" runat="server" Width="3em" MaxLength="5" CssClass="RequireFieldNumeric"></asp:TextBox>
                    </div>
                </div>
                <div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label2" runat="server">報表類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbRptAnalyze" runat="server" Text="公文時效分析表" GroupName="gpRpt"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbRptDeptStatic" runat="server" Text="單位別公文處理時效表" GroupName="gpRpt"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbRptUserRcvClose" runat="server" Text="承辦員別收文及辦結公文統計表" GroupName="gpRpt"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbRptOverDue31" runat="server" Text="各單位逾31日始辦結公文統計表" GroupName="gpRpt"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbRptCheck" runat="server" Text="公文時效檢查表" GroupName="gpRpt"></asp:RadioButton>
                    </div>
                </div>
				<DIV class="dTR">
					<DIV class="dTDTitle" style="WIDTH: 10em">
						<asp:Label id="Label3" runat="server">目前最大統計年月：</asp:Label>
					</DIV>
					<DIV class="dTD">
						<asp:Label id="lbMaxYearMonth" runat="server">Label</asp:Label>
					</DIV>
				</DIV>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
