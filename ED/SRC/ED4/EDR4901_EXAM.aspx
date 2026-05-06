<%@ Page Language="c#" CodeBehind="EDR4901_EXAM.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4901_EXAM" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR4901_EXAM 考試院各類案件辦理情形統計表列印作業</title>
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
    <form id="EDR4901_EXAM" onkeyup="jf_CheckFull();" method="post" runat="server">
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
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label ID="Label1" runat="server">列印單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:DropDownList ID="dlDept" runat="server" Width="5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label ID="Label2" runat="server">報表種類：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbRptMonth" runat="server" Text="按年月別" GroupName="gpRpt"></asp:RadioButton>
                        <asp:TextBox ID="txRptMonth" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:TextBox>
                        
                    </div>
                </div>
                 <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        &nbsp
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbRptDay" runat="server" Text="按年月日別" GroupName="gpRpt"></asp:RadioButton>
                        <asp:TextBox ID="txRptDay" runat="server" Width="3em" MaxLength="5" CssClass="InputFieldNumeric"></asp:TextBox>
                    </div>
                </div>
                 <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        &nbsp
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbRptOrg" runat="server" Text="按機關別" GroupName="gpRpt"></asp:RadioButton>
                        <asp:TextBox ID="txRptOrg" runat="server" Width="3em" MaxLength="5" CssClass="InputFieldNumeric"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label ID="Label5" runat="server">轉出資料檔(Excel)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txExcel" runat="server" Width="3em" MaxLength="5" CssClass="InputFieldNumeric"></asp:TextBox>
						<asp:Button ID="btExcel" runat="server" Text="轉出" />
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
