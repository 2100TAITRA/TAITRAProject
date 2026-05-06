<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IIX940.aspx.cs" AutoEventWireup="false" Inherits="IIWS.IIX940" ValidateRequest="false" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>IIX940 線上人員管理作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="IIX9400" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="BaseTable" id="BaseTable">
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label class="KeyField" ID="lbOrg" runat="server" CssClass="hide">所屬機關：</asp:Label>
                        <!--0980209 Leo 0980006 公文系統不再提供變更密碼功能 -->
                        <asp:Label ID="Label1" runat="server" Style="display: none">帳號：</asp:Label>
                        <asp:TextBox ID="tbAccount" runat="server" Style="display: none"></asp:TextBox>
                        <asp:Button ID="Button1" Width="240px" runat="server" Text="設定使用者下次需修改密碼" disabled="true" Style="display: none"></asp:Button>
                        <asp:Button ID="Button2" Width="240px" runat="server" Text="清除使用者歷史密碼記錄" disabled="true" Style="display: none"></asp:Button>
                        <asp:Label ID="Label2" runat="server" Style="display: none">西元：</asp:Label>
                        <asp:TextBox ID="tbExpire" runat="server" Style="display: none">20040216</asp:TextBox>
                        <asp:Button ID="Button3" Width="240px" runat="server" Text="設定所有使用者需重新修改密碼之日期" disabled="true" Style="display: none"></asp:Button>
                        <asp:TextBox ID="hMsg" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div align="center">
                    <asp:DropDownList ID="dlOrg" runat="server" CssClass="" AutoPostBack="True"></asp:DropDownList>
                </div>
                <br>
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:Label ID="Label3" runat="server">　訊息：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMsg" runat="server" Width="40em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選擇">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="登入人員">
                                <ItemTemplate>
                                    <asp:Label ID="lbAccount" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="登入權杖">
                                <ItemTemplate>
                                    <asp:TextBox ID="lbArtifact" runat="server" Width="82px"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來源">
                                <ItemTemplate>
                                    <asp:Label ID="lbSrc" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="登入時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="執行程式">
                                <ItemTemplate>
                                    <asp:Label ID="lbTarget" runat="server" Width="337px"></asp:Label>
                                    <asp:Label ID="lbUserOrg" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbMachineType" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" Text="重新載入(M)" AccessKey="M" Title="重新載入(ALT+M)" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="傳訊(S)" AccessKey="S" Title="傳訊(ALT+S)" DefaultStyle="newmode:block;modifymode:none;" ID="btSendOne" TabIndex="2"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="傳訊給所有線上人員(Z)" AccessKey="Z" Title="傳訊給所有線上人員(ALT+Z)" DefaultStyle="newmode:block;modifymode:none;" ID="btSendAll" TabIndex="3"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="強制登出(L)" AccessKey="L" Title="強制登出(ALT+L)" DefaultStyle="newmode:block;modifymode:none;" ID="btForceLogout" TabIndex="4"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="匯出所有線上人員資訊(P)" AccessKey="P" Title="匯出所有線上人員資訊(ALT+P)" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview" TabIndex="5"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="離開(X)" AccessKey="X" Title="離開(ALT+X)" DefaultStyle="newmode:block;modifymode:none;" ID="btExit" TabIndex="6"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <asp:TextBox ID="SystemWS" Style="z-index: 102; left: 10px; position: absolute; top: 270px" runat="server" CssClass="hidden" Width="30px"></asp:TextBox>
        <asp:TextBox ID="IsAliveFuncName" Style="z-index: 102; left: 10px; position: absolute; top: 290px" runat="server" CssClass="hidden" Width="30px"></asp:TextBox>
    </form>
</body>
</html>
