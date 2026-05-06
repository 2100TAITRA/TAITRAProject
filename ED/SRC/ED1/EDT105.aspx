<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT105.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDT105" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT105 郵件批次登錄作業</title>
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
    <form id="EDT105" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">收件單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDept" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="50"></asp:TextBox>
                        <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">郵件類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlMailType" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromOrg" TabIndex="0" runat="server" Width="15.5em" MaxLength="30"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">掛號號碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRegNo" TabIndex="0" runat="server" Width="15.5em" MaxLength="30"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="dTR">
                    <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                        <asp:Button ID="btSelectAll" runat="server" Text="全部選取" />
                        <asp:Button ID="btSelectInverse" runat="server" Text="反向選取" />
                        <asp:Button ID="btSelectClear" runat="server" Text="清除選取" />
                        <asp:Button ID="btDeleteSelected" runat="server" Text="刪除選取" />
                        <asp:Button ID="btUpdateSelected" runat="server" Text="批次修正" />
                    </asp:Panel>
                </div>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
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
                            <asp:TemplateColumn HeaderText="登錄時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server" Width="5em"></asp:Label>
                                    <asp:Label ID="lbRcvTime" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDept" runat="server" Width="5.5em" CssClass="PopUp"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件人">
                                <ItemTemplate>
                                    <asp:TextBox ID="txRcvName" TabIndex="0" runat="server" Width="3.5em" MaxLength="20"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵件</br>類別">
                                <ItemTemplate>
                                    <asp:Label ID="lbMailType" Style="overflow: hidden" runat="server" Width="5.5em"></asp:Label>
                                    <asp:TextBox ID="txMailTypeNo" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="掛號號碼">
                                <ItemTemplate>
                                    <asp:Label ID="lbRegNo" runat="server" Width="15.5em" CssClass="PopUp"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="備註(來文機關)">
                                <ItemTemplate>
                                    <asp:TextBox ID="txFromOrg" TabIndex="0" runat="server" Width="16.5em" MaxLength="200"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
