<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR190.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR190" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR190 總收建議分文查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="/STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR190" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server" Cssclass="RequireField">收文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDateS" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txRcvDateE" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" runat="server" Cssclass="RequireField">信心水準：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
						<asp:checkbox id="cbConfidenceH" runat="server" Text="高"></asp:checkbox>
						<asp:checkbox id="cbConfidenceM" runat="server" Text="中"></asp:checkbox>
						<asp:checkbox id="cbConfidenceL" runat="server" Text="低"></asp:checkbox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label5" runat="server">辦文單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
						<asp:RadioButton id="rbDept" runat="server" Text="承辦單位" GroupName="DeptOrg"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server">傳送方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 21em">
                        <asp:DropDownList ID="dlAiAutoSend" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTD" style="width: 6em">
						<asp:RadioButton id="rbAssign" runat="server" Text="移轉文" GroupName="DeptOrg"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlAssign" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label4" runat="server">預測結果：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlPredResult" runat="server"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 17.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="信心水準">
                                <ItemTemplate>
                                    <asp:Label ID="lbConfidence" runat="server" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="傳送方式">
                                <ItemTemplate>
                                    <asp:Label ID="lbSendType" runat="server" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="預測結果">
                                <ItemTemplate>
                                    <asp:Label ID="lbPredResult" runat="server" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="辦文單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="預測單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbAIPredDept" runat="server" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="總收分文單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvSendDept" runat="server" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" runat="server" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="匯出Excel" DefaultStyle="newmode:block;modifymode:none;" ID="btExcel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
