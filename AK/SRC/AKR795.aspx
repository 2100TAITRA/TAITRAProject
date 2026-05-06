<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKR795.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR795" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKR795 歸檔案件統計月報表</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="AKR795" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 18.5em">
                        <asp:RadioButton ID="rb1" runat="server" Text="歸檔案件統計月報表：" Checked="True" GroupName="rb"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMonthS" runat="server" CssClass="inputFieldNumeric" Width="3em" MaxLength="5"></asp:TextBox>
                        <asp:Label ID="Label3" runat="server">月</asp:Label>－
						<asp:TextBox ID="txMonthE" runat="server" CssClass="inputFieldNumeric" Width="3em" MaxLength="5"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server">月</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 18.5em">
                        <asp:RadioButton ID="rb2" runat="server" Text="歸檔案件統計年報表：" GroupName="rb"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear" runat="server" CssClass="inputFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">年</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 18.5em">
                        <asp:RadioButton ID="rb3" runat="server" Text="歸檔案件統計年報表(含增減率分析)：" GroupName="rb"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear2" runat="server" CssClass="inputFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">年</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 18.5em">
                        <asp:RadioButton ID="rb5" runat="server" GroupName="rb" Text="外勞申請案件歸檔及調檔統計年報表："></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMonthS_2" runat="server" CssClass="inputFieldNumeric" MaxLength="5" Width="3em"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">月</asp:Label>－
						<asp:TextBox ID="txMonthE_2" runat="server" CssClass="inputFieldNumeric" MaxLength="5" Width="3em"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">月</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 18.5em">
                        <asp:RadioButton ID="rb4" runat="server" Text="外勞申請案件歸檔及調檔統計年報表：" GroupName="rb"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear3" runat="server" CssClass="inputFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server">年</asp:Label>
                    </div>
                </div>
            <asp:Label ID="Label1" runat="server" BackColor="Info" ForeColor="Black">[ 列印報表前請先確認是否已執行過維護作業 ]</asp:Label>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="列印" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Text="維護(M)" ID="btMaintain" AccessKey="M" ToolTip="維護(ALT+M)"></asp:Button>
            <asp:Button runat="server" Text="維護外勞(N)" ID="btMaintain_N" AccessKey="N" ToolTip="維護外勞(ALT+N)"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
