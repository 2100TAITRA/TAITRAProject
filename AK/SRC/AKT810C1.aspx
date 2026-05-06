<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKT810C1.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT810C1" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKT810C1 調案歸還及展期登錄子視窗</title>
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
    <form id="AKT810C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" runat="server">調案單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txBorNo" TabIndex="-1" runat="server" CssClass="TextLabel" Width="6em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label5" runat="server">展期次數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txReBorCount" TabIndex="-1"
                            runat="server" CssClass="DisplayOnly" Width="1.5em"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server">次</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server">異動日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txDate" TabIndex="7" runat="server" Width="4.5em"></asp:TextBox>
                        <asp:Label ID="lbHidParam" runat="server" CssClass="hide"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label8" runat="server" BackColor="#E0E0E0">＊異動別為歸還需填寫保存狀況：</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label9" runat="server" ForeColor="Navy">保存現況：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlKeepNo" runat="server"></asp:DropDownList>
                        <asp:TextBox ID="txMode" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD" class="LeftCol" colspan="3">
                        <asp:Label ID="Label7" runat="server" BackColor="#E0E0E0">＊異動別為展期需填寫展期原因和展期說明：</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server">展期原因：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="dlReason" runat="server" Width="8em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label4" runat="server">原因說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDesc" runat="server" TextMode="MultiLine" Height="20px"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 294px">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False"
                                PageSize="50" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="4" GridLines="Vertical">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbNo" runat="server"></asp:Label>
                                            <asp:Label ID="lbSeq" runat="server" CssClass="hide"></asp:Label>
                                            <asp:Label ID="lbDueDate" runat="server" CssClass="hide"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="檔號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txFileNo" TabIndex="-1" runat="server" CssClass="TextLabel" Width="14em"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="年度號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="lbYear" TabIndex="-1" runat="server" Width="3.5em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="分類號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="lbCls" TabIndex="-1" runat="server" Width="10em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="國別">
                                        <ItemTemplate>
                                            <asp:TextBox ID="lbCountry" TabIndex="-1" runat="server" Width="3.5em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="處別">
                                        <ItemTemplate>
                                            <asp:TextBox ID="lbOffice" TabIndex="-1" runat="server" Width="3.5em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="細目/產品別">
                                        <ItemTemplate>
                                            <asp:TextBox ID="lbProduct" TabIndex="-1" runat="server" Width="6.5em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="卷次號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="lbVol" TabIndex="-1" runat="server" Width="4em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="件次號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="lbSeqNo" TabIndex="-1" runat="server" Width="4em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="文號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDocNo" TabIndex="-1" runat="server" CssClass="TextLabel" Width="5.5em"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="借調情形">
                                        <ItemTemplate>
                                            <asp:Label ID="lbRange" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="調案範圍">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cb1" runat="server" Text="整卷借出" Enabled="False"></asp:CheckBox><br>
                                            <asp:CheckBox ID="cb2" runat="server" Text="附件借出" Enabled="False"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="總件數／總頁數">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txCount" TabIndex="-1" runat="server" CssClass="TextLabel"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="異動別">
                                        <ItemTemplate>
                                            <asp:DropDownList ID="dlBorType" runat="server"></asp:DropDownList>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>

                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExit" runat="server" Text="放棄" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
