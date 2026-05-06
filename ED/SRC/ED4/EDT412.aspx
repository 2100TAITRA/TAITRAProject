<%@ Page Language="c#" CodeBehind="EDT412.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT412" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT412 公文解除列管作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT412" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_SignType" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server">目前列管狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAuditStatus" TabIndex="0" runat="server" Width="5.5em" CssClass="DisplayOnly" MaxLength="15" ReadOnly="True">從未列管過</asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">解除列管日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDeAuditDate" TabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">解除列管原因：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDeAuditReason" runat="server" Width="12.5em" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em">
                        <asp:Label ID="Label4" runat="server">備註：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDeAuditRemark" TabIndex="0" runat="server" Width="30.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em">
                        <asp:Label ID="Label11" runat="server">收文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txRcvDate" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label13" runat="server">案件編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCaseNo" TabIndex="0" runat="server" Width="5.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em">
                        <asp:Label ID="Label6" runat="server">公文結案日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txCloseDate" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label8" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDeptName" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label9" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txEmpName" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em">
                        <asp:Label ID="Label7" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromSubjuct" TabIndex="0" runat="server" Width="48.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em">
                        <asp:Label ID="Label10" runat="server">續辦文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFurtherDocno" runat="server" Width="5.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" id="DivForDg1" style="height: 12.5em; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="列管異動">
                                <ItemTemplate>
                                    <asp:Label ID="lbAuditSatus" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="異動日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbAuditDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="原因/備註">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeRsnRmk" runat="server" Width="300px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                    <asp:Label ID="Label12" runat="server">請完成實質回覆後再解除列管</asp:Label>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" AccessKey="C" Title="確認(ALT+C)" Style="display: none" Text="確認(C)" DefaultStyle="newmode:none;modifymode:none;" ID="btCheck"></asp:Button>
            <asp:Button runat="server" AccessKey="U" Title="線上瀏覽(ALT+U)" Style="display: none" Text="線上瀏覽(U)" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
