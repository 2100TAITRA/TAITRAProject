<%@ Page Language="c#" CodeBehind="UDT250.aspx.cs" AutoEventWireup="false" Inherits="UD.UDT250" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>UDT250 特殊媒體歸檔清單列印作業</title>
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
    <form id="UDT250" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <asp:TextBox ID="txbOd99" runat="server" CssClass="hide"></asp:TextBox>
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">特殊媒體狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbEnd" runat="server" Text="已結案未歸檔(含退件)"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSend" runat="server" Width="7.5em" Text="已送歸未點收"></asp:CheckBox>
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
                    <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Right"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="特殊媒體編號">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbItemNo" runat="server"></asp:Label>
                                    <asp:Label Style="z-index: 0" ID="H_lbAppNo" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="單位/科別">
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbDept" runat="server"></asp:Label>
                                    <asp:Label Style="z-index: 0" ID="lbSect" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人&lt;br&gt;申請方式">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label><br>
                                    <asp:Label Style="z-index: 0" ID="lbSType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="媒體類型/數量/規格&lt;br&gt;名稱">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbMType" runat="server"></asp:Label>/
									<asp:Label Style="z-index: 0" ID="lbFileCnt" runat="server"></asp:Label>/
									<asp:Label Style="z-index: 0" ID="lbFileUnit" runat="server"></asp:Label><br>
                                    <asp:Label Style="z-index: 0" ID="lbItem_Name" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="核決日期">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbAPDate" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="待歸檔搜尋(Q)" AccessKey="Q" Title="確認(ALT+Q)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
