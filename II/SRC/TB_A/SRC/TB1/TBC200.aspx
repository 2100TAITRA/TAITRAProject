<%@ Page Language="c#" CodeBehind="TBC200.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBC200" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>TBC200 公告提示子視窗</title>
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
    <form id="TBC200" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include File="../TBLIB/GenericChild.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">公告編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txNoS" TabIndex="0" runat="server" Width="4.5em" CssClass="InputUpperFieldText " MaxLength="8"></asp:TextBox>－
						<asp:TextBox ID="txNoE" TabIndex="0" runat="server" Width="4.5em" CssClass="InputUpperFieldText " MaxLength="8"></asp:TextBox>
                    </div>
                </div>
                <asp:Panel runat="server" ID="trDocNo">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txDocNoS" TabIndex="0" runat="server" Width="5.5em" CssClass="InputUpperFieldText " MaxLength="10"></asp:TextBox>－
						<asp:TextBox ID="txDocNoE" TabIndex="0" runat="server" Width="5.5em" CssClass="InputUpperFieldText " MaxLength="10"></asp:TextBox>
                        </div>
                    </div>
                </asp:Panel>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">公告日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>－
                        <asp:TextBox ID="txDateE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlCategory" runat="server"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv" style="height: 16em">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="2em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公告編號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlNo" TabIndex="0" runat="server" Width="4.5em"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公告日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbDate" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="類別">
                                <ItemTemplate>
                                    <asp:Label ID="lbCategory" runat="server" Width="9em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:TextBox ID="lbSubject" runat="server" CssClass="PopUp" Width="16em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
