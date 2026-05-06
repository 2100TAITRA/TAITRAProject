<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKR889.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR889" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKR889 檔案申請人次統計表</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout" class="hidden">
    <form id="AKR889" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="Table1">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label class="RequireField" ID="Label1" runat="server">統計年度 ：</asp:Label>
                        <asp:TextBox class="RequireField" ID="txYear" TabIndex="10" runat="server" Width="31px" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <fieldset style="width: 9.5em; height: 2em">
                            <legend>最小統計單位</legend>
                                <asp:RadioButton ID="rb1" TabIndex="20" runat="server" CssClass="InputFieldText" Text="一級單位" GroupName="Grp" Checked="True"></asp:RadioButton>
                                <asp:RadioButton ID="rb2" TabIndex="30" runat="server" CssClass="InputFieldText" Text="二級單位" GroupName="Grp"></asp:RadioButton>
                        </fieldset>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lbMaxYear" runat="server" CssClass="InputFieldLabel">目前最大統計年度：888年</asp:Label>

                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:CheckBox ID="cbFM" runat="server" CssClass="InputFieldLabel" Text="依檔管局建議的報表格式輸出"></asp:CheckBox>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Text="統計(S)" DefaultStyle="newmode:block;modifymode:block;" ID="btStatic" AccessKey="S" ToolTip="執行統計(ALT+S)"></asp:Button>
            <asp:Button runat="server" Text="預覽" ID="btPreview" AccessKey="E" ToolTip="預覽(ALT+E)"></asp:Button>
            <asp:Button runat="server" Text="列印" CssClass="hide" ID="btPrint" AccessKey="P" ToolTip="列印(ALT+P)"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
