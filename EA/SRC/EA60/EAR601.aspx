<%@ Page Language="c#" CodeBehind="EAR601.aspx.cs" AutoEventWireup="false" Inherits="EA60.EAR601" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR601檔案移轉目錄列印作業</title>
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
    <form id="EAR601" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label2" TabIndex="-1" runat="server" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField" ID="txPlanNo" TabIndex="10" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="15" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" TabIndex="-1" runat="server">計畫說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDesc" TabIndex="-1" runat="server" Width="10em" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label4" TabIndex="-1" runat="server">批號別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="PlanType" runat="server" Width="7.5em" CssClass="displayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">報表格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb1" TabIndex="20" runat="server" Text="案件" GroupName="GN1"></asp:RadioButton>
                        <asp:RadioButton ID="rb2" TabIndex="23" runat="server" Text="案卷" GroupName="GN1"></asp:RadioButton>
                        <asp:RadioButton ID="rbStat" TabIndex="23" runat="server" Text="統計表" GroupName="GN1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR" id="hgcOrderBy" runat="server">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbFile" TabIndex="20" runat="server" GroupName="GN2" Text="依檔號"></asp:RadioButton>
                        <asp:RadioButton ID="rbDept" TabIndex="23" runat="server" GroupName="GN2" Text="依承辦單位"></asp:RadioButton>
                        <asp:RadioButton ID="rbStock" runat="server" Text="依櫥位號" GroupName="GN2" TabIndex="24"></asp:RadioButton>
                    </div>
                    <asp:TextBox ID="txStock" runat="server" CssClass="hide"></asp:TextBox>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label6" runat="server">列印單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="ddldept" runat="server" Width="8.5em"></asp:DropDownList>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="列印" CssClass="hide" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="匯出Excel(O)" AccessKey="O" Title="匯出Excel(ALT+O)" DefaultStyle="newmode:block;modifymode:none;" ID="btExcel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="匯出ODS" CssClass="" ID="btODS" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
