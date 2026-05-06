<%@ Page Language="c#" CodeBehind="EDR270.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR270" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR270 資料夾公文清單資訊查詢作業</title>
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
    <form id="EDR270" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:Button Style="z-index: 0" ID="btSort" runat="server" Text="btSort"></asp:Button>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server" Width="99px" CssClass="RequireField">資料夾名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlFolder" runat="server" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="88px" Height="25px" MaxLength="15"></asp:TextBox>
                        <asp:Label Style="z-index: 0" ID="lbCheck" runat="server" Width="425px" CssClass="KeyField" Height="17px"></asp:Label>
                    </div>
                </div>
            </div>
            <asp:TextBox ID="hDgSortCmd" runat="server" CssClass="hide"></asp:TextBox>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 19.5em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <HeaderTemplate>
                                    <a onclick="jf_sortCol('DOC_NO')"><u onmouseover="this.style.cursor='hand'">公文文號</u></a>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Label ID="lbRead" runat="server" Width="88px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <HeaderTemplate>
                                    <a onclick="jf_sortCol('DEPT_NAME')"><u onmouseover="this.style.cursor='hand'">承辦單位</u></a>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Label ID="lbDept" runat="server" Width="63px" Height="16px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemStyle HorizontalAlign="Left"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server" Height="16px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="限辦日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbDueDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="密等">
                                <ItemTemplate>
                                    <asp:Label ID="lbSecName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="速別">
                                <ItemTemplate>
                                    <asp:Label ID="lbSpdName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="簽收狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbSignStatus" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="簽核類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="決行層級">
                                <ItemTemplate>
                                    <asp:Label ID="lbAppLvl" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="核決者">
                                <ItemTemplate>
                                    <asp:Label ID="lbAppUserName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="重新載入(M)" AccessKey="M" title="重新載入(ALT+O)" DefaultStyle="newmode:block;modifymode:block;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="匯出Excel(O)" AccessKey="O" title="匯出Excel(ALT+O)" DefaultStyle="newmode:block;modifymode:block;" ID="btExcel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
