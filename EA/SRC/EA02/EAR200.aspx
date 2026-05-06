<%@ Page Language="c#" CodeBehind="EAR200.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR200" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR200 待點收公文文號條碼標籤列印作業</title>
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
    <form id="EAR200" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbCode1" runat="server">條碼標籤：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbCode2" runat="server">於</asp:Label>
                        <asp:TextBox ID="txPos" TabIndex="90" runat="server" Width="1.5em" MaxLength="2" CssClass="InputFieldNumeric"></asp:TextBox>
                        <asp:Label ID="lbCode3" runat="server">號位置印出</asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar" EnableViewState="False">
                    <asp:Button runat="server" Text="全部" ID="btSelectAll" ToolTip="勾選所有的CheckBox"></asp:Button>
                    <asp:Button runat="server" Text="反向" ID="btSelectInverse" ToolTip="反向勾選所有的CheckBox"></asp:Button>
                    <asp:Button runat="server" Text="清除" ID="btSelectClear" ToolTip="清除勾選所有的CheckBox"></asp:Button>
                </asp:Panel>
                <div class="dTR">
                    <div class="GridDiv" style="height: 32.5em">
                        <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="選">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="歸檔批號">
                                    <ItemTemplate>
                                        <asp:Label ID="lbLotNo" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="列印條碼標籤(E)" ID="btPreview" AccessKey="E" Title="列印條碼標籤(ALT+E)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
