<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="TBR154.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBR154" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>TBR154 查詢特定公告之查閱與未查閱人員</title>
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
    <form id="TBR154" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../TBLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="txNotify" TabIndex="0" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <fieldset>
                <legend>搜尋條件</legend>
                <div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 12em">
                            <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" CssClass="RequireFieldNumeric" MaxLength="10"></asp:TextBox>
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
                            <asp:Label ID="Label1" runat="server">公告編號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 12em">
                            <asp:TextBox ID="txBulletinId" TabIndex="0" runat="server" Width="5.5em" CssClass="RequireFieldNumeric" MaxLength="8"></asp:TextBox>
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
                <asp:Button ID="btNotify" runat="server" Width="9.5em" Text="通知未點閱人員"></asp:Button>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="1.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公告編號">
                                <ItemTemplate>
                                    <asp:Label ID="lbBulletinId" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公告日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbPasteDate" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發布單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbPasteUnit" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發布&lt;BR&gt;人員">
                                <ItemTemplate>
                                    <asp:Label ID="lbPasterName" runat="server" Width="4em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server" Width="12.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發布對象">
                                <HeaderStyle Width="9.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSignTargetUnit" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbSignTargetName" runat="server"></asp:Label>
                                    <asp:Label ID="lbSignTargetAccount" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="點閱時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbSignDate" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="代理&lt;BR&gt;簽收">
                                <ItemTemplate>
                                    <asp:Label ID="lbProxyName" runat="server" Width="4em"></asp:Label>
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
