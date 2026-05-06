<%@ Page Language="c#" CodeBehind="EDR341.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR341" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>EDR341 上級機關來文辦理情形公文清單查詢列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR341" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:DropDownList ID="ddlDateSource" runat="server" CssClass="RequireField">
                            <asp:ListItem Value="0">結案日期</asp:ListItem>
                            <asp:ListItem Value="1">收文日期</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txDateS" TabIndex="1" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>～
                            <asp:TextBox ID="txDateE" TabIndex="2" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
			<div class="dTR">
                <div class="GridDiv" style="HEIGHT: 213px; OVERFLOW: auto; WORD-BREAK: break-all">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="1.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="部收文號&lt;br&gt;局收文號">
                                <HeaderTemplate>
                                    <asp:Label ID="Label1" runat="server" Width="20em" >部收文號</asp:Label><br>
                                    <asp:Label ID="Label2" runat="server" Width="20em" >局收文號</asp:Label>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Label ID="lbSrcRcvNo" runat="server" Width="20em" ></asp:Label><br>
                                    <asp:Label ID="lbDocNo" runat="server" Width="20em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server" Width="6.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="結案日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbCloseDate" runat="server" Width="6.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbOuName" runat="server" Width="10em" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server" Width="30em" CssClass="InputFieldText"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <HeaderTemplate>
                                    <asp:Label ID="Label7" runat="server" Width="7.5em" >結案方式</asp:Label><br>
                                    <asp:Label ID="Label8" runat="server" Width="7.5em" >(繕發/存查)</asp:Label>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Label ID="lbCloseType" runat="server" Width="7.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <HeaderTemplate>
                                    <asp:Label ID="Label10" runat="server" Width="4.5em" >發文</asp:Label><br>
                                    <asp:Label ID="Label11" runat="server" Width="4.5em" >使用日數</asp:Label>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Label ID="lbUseDays" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
				</div>
            </div>
        </div>
         <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" AccessKey="Q" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" AccessKey="P" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
             <asp:Button ID="btExcel" runat="server" Text="匯出Excel" AccessKey="O" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
