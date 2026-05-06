<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EDR355.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR355" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR355 待郵寄公文清單列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDR355" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBatNoS" TabIndex="5" runat="server" Width="5.5em" CssClass="KeyFieldNumeric" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btBatchNoS" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label10" runat="server">－</asp:Label>
                        <asp:TextBox ID="txBatNoE" TabIndex="10" runat="server" Width="5.5em" CssClass="KeyFieldNumeric" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btBatchNoE" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" TabIndex="15" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox class="KeyUpperField" ID="txTimeS" TabIndex="20" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label3" runat="server">－</asp:Label>
                        <asp:TextBox ID="txDateE" TabIndex="25" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txTimeE" TabIndex="30" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                    <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                    <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
                    <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                </asp:Panel>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <HeaderStyle HorizontalAlign="Center" Width="2%"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <HeaderStyle Width="2%"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <HeaderStyle HorizontalAlign="Center" Width="8%"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <HeaderStyle HorizontalAlign="Center" Width="50%"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Left"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btBatch" runat="server" Text="成批" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
