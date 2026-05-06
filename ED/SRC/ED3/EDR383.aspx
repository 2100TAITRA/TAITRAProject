<%@ Page Language="c#" CodeBehind="EDR383.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR383" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR383 地址標籤列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDR383" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:TextBox ID="H_CheckData" runat="server" Width="3.5em"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" TabIndex="-1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Button ID="btAdd" runat="server" Font-Size="Smaller" Text="加入"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" TabIndex="-1" runat="server">標籤格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label11" TabIndex="-1" runat="server">由</asp:Label>
                        <asp:TextBox ID="txPositionNo" class="KeyUpperField" runat="server" Width="1.5em" CssClass="InputFieldNumeric" MaxLength="2"></asp:TextBox>
                        <asp:Label ID="Label12" TabIndex="-1" runat="server">號位置起</asp:Label>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
	                <asp:Button ID="btSelectAll" runat="server" Text="全選" />
	                <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
	                <asp:Button ID="btSelectClear" runat="server" Text="清除" />
	                <asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
	                <asp:Button ID="btUp" runat="server" Text="↑" />
	                <asp:Button ID="btDown" runat="server" Text="↓" />
                </asp:Panel>
                <div class="GridDiv" data-fixed="true">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Center" Width="2em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemStyle HorizontalAlign="Center" Width="2em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <HeaderStyle HorizontalAlign="Center" Width="7.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" Width="6.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <HeaderStyle HorizontalAlign="Center" Width="2.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <HeaderTemplate>
                                    <asp:Label ID="Label8" runat="server">受文者</asp:Label><br>
                                    <asp:Label ID="Label9" runat="server">郵遞區號/住址</asp:Label>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:TextBox ID="txIssueOrgName" runat="server" Width="22.5em" MaxLength="40"></asp:TextBox><br>
                                    <asp:TextBox ID="txPostCode" runat="server" Width="4em" MaxLength="6"></asp:TextBox>
                                    <asp:TextBox ID="txAddress" runat="server" Width="18em" MaxLength="60"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="地址標籤預覽(P)" Accesskey = "P" Title = "地址標籤預覽(ALT+P)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="地址標籤列印(O)" Accesskey = "O" Title = "地址標籤列印(ALT+O)" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
