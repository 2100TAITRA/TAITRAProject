<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDM026.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM026" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDM026 分層負責代碼使用單位維護作業</title>
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
    <form id="EDM026" onkeyup="jf_CheckFull();" method="post" runat="server">
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
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbType" runat="server" CssClass="KeyField">分層負責代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRespNo" runat="server" Width="4em" CssClass="ED_KeyField"></asp:TextBox>
                        <asp:ImageButton ID="btResNo" TabIndex="-1" runat="server" ToolTip="上層負責代碼：" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="h_txRespNoCount" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:DropDownList ID="dlDeptList" runat="server" CssClass="hide"></asp:DropDownList>
                        <asp:DropDownList ID="dlAllDeptList" runat="server" CssClass="hide"></asp:DropDownList>
                        <asp:TextBox ID="h_txSaveDeptList" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">業務內容：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRespContent" runat="server" Width="20.5em" TextMode="MultiLine" Height="5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="dTR">
                    <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                        <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                        <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
                        <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                        <asp:TextBox ID="h_txOpenDeptList" runat="server" CssClass="hide"></asp:TextBox>
                    </asp:Panel>
                </div>
                 <div class="dTR" id="dgDeptTR">
                    <div class="GridDiv" style="overflow: auto; height: 30em" data-fixed="true">
                        <table id="dgDept" border="1" runat="server" autogeneratecolumns="False" gridlines="Vertical" headerstyle-horizontalalign="Center" itemstyle-horizontalalign="Center"
                            style="color: Black; background-color: White; border-color: #DEDFDE; border-width: 1px; border-style: None; border-collapse: collapse;">
                            <tbody>
                                <tr>
                                    <td style="width: 1.5em">選</td>
                                    <td style="width: 20.5em">單位名稱</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style="height: 30em;" class="hide">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="9">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn ItemStyle-HorizontalAlign="Center" HeaderText="單位名稱">
                                <ItemTemplate>
                                    <asp:Label ID="lableUnit" runat="server"></asp:Label>
                                    <asp:TextBox ID="H_txDeptno" CssClass="hide" Width="2em" TabIndex="0" runat="server"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
               
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
