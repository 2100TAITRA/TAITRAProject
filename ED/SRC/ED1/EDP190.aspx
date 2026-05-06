<%@ Page Language="c#" CodeBehind="EDP190.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDP190" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDP190 總收建議分文正確率統計作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="/STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDP190" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
            <asp:DropDownList ID="dlAssign" runat="server"></asp:DropDownList>
            <asp:TextBox ID="h_maxPreviewYM" runat="server"></asp:TextBox>
            <asp:TextBox ID="h_maxStaticYM" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div style="text-align:center">
                    <asp:Label ID="lbMaxMonth" runat="server">目前最大統計年月</asp:Label>
                </div>
                <fieldset id="Fieldset1" align="top"  style="border-color: gray; min-width: 40em">
                    <legend>統計</legend>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 18em">
                            <asp:Label ID="Label1" runat="server" CssClass="RequireField">統計月份：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txStaticMonth" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:TextBox>
                           <asp:Button ID="btStatic" runat="server" Text="統計"></asp:Button>
                        </div>
                    </div>
                </fieldset>
                <fieldset id="Fieldset2" align="top" style="border-color: gray; min-width: 40em"">
                    <legend>預覽</legend>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 18em">
                            <asp:Label ID="Label2" runat="server" CssClass="RequireField">列印月份：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txPreviewMonthS" CssClass="RequireFieldNumeric" runat="server" Width="3em" MaxLength="5"></asp:TextBox> - 
                            <asp:TextBox ID="txPreviewMonthE" CssClass="RequireFieldNumeric" runat="server" Width="3em" MaxLength="5"></asp:TextBox>
                            <asp:Button ID="btPreview" runat="server" Text="預覽"></asp:Button>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 18em">
                            <asp:Label ID="Label5" runat="server">報表種類：</asp:Label>
                        </div>
                        <div class="dTD">
							<asp:RadioButton id="rbStaticMonth" Text="依月份統計" GroupName="RptType" runat="server"></asp:RadioButton><br>
							<asp:RadioButton id="rbStaticConfidence" Text="依月份及信心水準統計" GroupName="RptType" runat="server"></asp:RadioButton><br>
							<asp:RadioButton id="rbStaticDept" Text="依月份及單位統計" GroupName="RptType" runat="server"></asp:RadioButton>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
        </asp:Panel>
    </form>
</body>
</html>
