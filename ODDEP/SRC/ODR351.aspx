<%@ Page Language="c#" CodeBehind="ODR351.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR351M" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>ODR351 電子發文狀態查詢列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODR351M" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox Style="z-index: 100; position: absolute; top: 102px; left: 10px" ID="lbReturnValue"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <DIV class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDate" TabIndex="10" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server">－</asp:Label>
                        <asp:TextBox ID="txEDate" TabIndex="10" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <DIV class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label4" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" TabIndex="20" runat="server" CssClass="InputFieldNumeric" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">－</asp:Label>
                        <asp:TextBox ID="txDocNoE" TabIndex="20" runat="server" CssClass="InputFieldNumeric" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <DIV class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label6" runat="server">電子檔轉出狀況：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlTranType" runat="server">
							<asp:ListItem Value=""></asp:ListItem>
							<asp:ListItem Value="1">已轉出</asp:ListItem>
                            <asp:ListItem Value="2">未轉出</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <DIV class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label3" runat="server">電子交換處理狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlEType" runat="server">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">已處理</asp:ListItem>
                            <asp:ListItem Value="2">未處理</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 300px; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="4" GridLines="Vertical">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server" Width="1em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文<br>日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueDate" runat="server" Width="4em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="傳送日期<br>傳送時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbSendDate" runat="server" Width="4em"></asp:Label>
									<br>
									<asp:Label ID="lbSendTime" runat="server" Width="4em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlDocNo" runat="server" Width="5em"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server" Width="9em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦<br>單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDept" runat="server" Width="4em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbUser" runat="server" Width="3.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="電子檔<br>是否轉出">
                                <ItemTemplate>
                                    <asp:Label ID="lbTranType" runat="server" Width="1.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
							 <asp:TemplateColumn HeaderText="電子交換處理狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbStatus" runat="server" Width="9em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 102; position: absolute; top: 218px; left: 12px" ID="Validator"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 103; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
