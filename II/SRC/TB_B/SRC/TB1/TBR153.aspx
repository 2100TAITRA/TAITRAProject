<%@ Page Language="c#" CodeBehind="TBR153.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBR153" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>TBR153 公告點閱人數統計表</title>
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
    <form id="TBR153" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../TBLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <fieldset>
                <legend>搜尋條件</legend>
                <div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label1" runat="server">公告編號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 12em">
                            <asp:TextBox ID="txBulletinId" TabIndex="0" runat="server" Width="4.5em" CssClass="RequireField" MaxLength="8"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label5" runat="server">公告日期：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txStartDate" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                            <asp:Label ID="Label4" runat="server">至</asp:Label>
                            <asp:TextBox ID="txEndDate" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 12em">
                            <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label6" runat="server">公告主旨：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txSubject" TabIndex="0" runat="server" Width="11em" CssClass="RequireField" MaxLength="8"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label3" runat="server">發布單位：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 12em">
                            <asp:DropDownList ID="dlPasteUnit" runat="server"></asp:DropDownList>
                        </div>
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label7" runat="server">發布人員：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txAccount" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                            <asp:ImageButton ID="btUser" TabIndex="0" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:TextBox ID="txAccountName" TabIndex="0" runat="server" Width="5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="2em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發布單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbPasteUnit" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發布人員">
                                <ItemTemplate>
                                    <asp:Label ID="lbPasterName" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="點閱<br>總人數">
                                <ItemTemplate>
                                    <asp:Label ID="lbTotalNum" runat="server" Width="5em"></asp:Label>
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
        </asp:Panel>
    </form>
</body>
</html>
