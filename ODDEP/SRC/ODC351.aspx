<%@ Page Language="c#" CodeBehind="ODC351.aspx.cs" AutoEventWireup="false" Inherits="OD.ODC351M" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>ODC351 電子發文狀態明細查詢作業</title>
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
    <form id="ODC351" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox Style="z-index: 100; position: absolute; top: 102px; left: 10px" ID="lbReturnValue"
            runat="server" CssClass="hidden"></asp:ListBox>
        <asp:Panel ID="tbTool" runat="server" CssClass="">
        </asp:Panel>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" CssClass="DisplayOnly KeyField"
                            ForeColor="Navy" ReadOnly="True" MaxLength="15" Width="7.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <asp:TextBox ID="H_txSeqNo" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_txSeq" runat="server" CssClass="hidden"></asp:TextBox>
            <div class="DivTable">
                <div class="GridDiv" style="width: 748px; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False"
                        PageSize="50" CellPadding="4" GridLines="Vertical">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueDate" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="傳送日期<br>傳送時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbSendDate" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="受文機關名稱">
                                <ItemTemplate>
                                    <asp:Label ID="lbOrgName" runat="server" Width="17em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="受文者　接收日時">
                                <ItemTemplate>
                                    <asp:Label ID="lbRecvDate" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="交換中心接收日時">
                                <ItemTemplate>
                                    <asp:Label ID="lbXRecvDaTe" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="交換類型">
                                <ItemTemplate>
									<asp:Label ID="lbTranType" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="交換狀態">
                                <ItemTemplate>
									<asp:Label ID="lbTranStatus" runat="server" Width="7.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="改紙本發文">
                                <ItemTemplate>
                                    <asp:Button ID="btPaperIssue" runat="server" Text="註記"></asp:Button>
                                    <asp:Label ID="lbSeqNo" CssClass="hide" runat="server"></asp:Label>
                                    <asp:Label ID="lbGUID" CssClass="hide" runat="server"></asp:Label>
                                    <asp:Label ID="lbIdentity" CssClass="hide" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:CustomValidator Style="z-index: 102; position: absolute; top: 218px; left: 12px" ID="Validator"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 103; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
