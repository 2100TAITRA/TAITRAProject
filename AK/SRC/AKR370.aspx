<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKR370.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR370" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKR370 檔案保管數量統計表列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body class="hidden">
    <form id="AKR370" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericSearch.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField" Width="5.5em">統計月份：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" TabIndex="10" runat="server" Width="3em" CssClass="RequireUpperField" MaxLength="5"></asp:TextBox>－
                        <asp:TextBox ID="txDateE" TabIndex="11" runat="server" Width="3em" CssClass="RequireUpperField" MaxLength="5"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="" Width="5.5em">報表種類：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb1" runat="server" Width="11em" Text="依分類及媒體型式" GroupName="GP1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb2" runat="server" Width="11em" Text="依分類及保存狀況" GroupName="GP1"></asp:RadioButton>&nbsp;
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb3" runat="server" Width="12.5em" Text="依保存年限及媒體型式" GroupName="GP1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb4" runat="server" Width="12.5em" Text="依保存年限及保存狀況" GroupName="GP1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb5" runat="server" Width="12.5em" CssClass="hide" Text="依保存年限及簽核類型" GroupName="GP1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lbMax" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4" PageSize="50"></asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
   			<asp:Button ID="btStatic" runat="server" Text="統計(S)" Accesskey = "S" Title = "統計(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
   			<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />			
			<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ></asp:Button>
            <asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ></asp:Button>
		</asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
