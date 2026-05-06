<%@ Page Language="c#" CodeBehind="EAR372.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR372" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR372 檔案移交清冊列印作業</title>
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
    <form id="EAR372" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="GridTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
	                <asp:Button ID="btSelectAll" runat="server" Text="全選" />
	                <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
	                <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                </asp:Panel>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" EnableViewState="true">
                        <Columns>
                            <asp:TemplateColumn HeaderText="版本">
                                <ItemTemplate>
                                    <asp:Label ID="lbVerNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="最後統計日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbCalcDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選取">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="備註">
                                <ItemTemplate>
                                    <asp:Label ID="lbRemark" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" Text="匯出Excel(O)" DefaultStyle="newmode:block;modifymode:none;" AccessKey="O" Title="匯出Excel(ALT+O)" ID="btExcel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="統計(S)" DefaultStyle="newmode:block;modifymode:none;" AccessKey="S" Title="統計(ALT+S)" ID="btStatistic"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
