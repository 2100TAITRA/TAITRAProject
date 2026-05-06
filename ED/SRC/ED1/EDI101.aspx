<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI101.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDI101" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDI101 郵件查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDI101" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; visibility: hidden;">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5.5em"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" Width="80px"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" Width="80px"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField" Width="5.5em">登錄日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvdateS" TabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txRcvTimeS" TabIndex="0" runat="server" Width="2.5em" MaxLength="4" CssClass="InputFieldNumeric"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">～</asp:Label>
                        <asp:TextBox ID="txRcvdateE" TabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txRcvTimeE" TabIndex="0" runat="server" Width="2.5em" MaxLength="4" CssClass="InputFieldNumeric"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label2" runat="server" Width="5.5em">收件單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDept" TabIndex="0" runat="server" Width="10.5em" MaxLength="60"></asp:TextBox>
                        <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div style="width: 8.5em" class="dTDTitle">
                        <asp:Label Style="z-index: 0" ID="lbRcvArea" runat="server" CssClass="hide">收件地區：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlRcv" runat="server" CssClass="hide"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label3" runat="server" Width="5.5em">收件人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUser" TabIndex="0" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:DropDownList ID="dlUser" runat="server" Width="5.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label4" runat="server" Width="5.5em">郵件類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBoxList ID="cblMailType" runat="server" RepeatDirection="Horizontal"></asp:CheckBoxList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label5" runat="server" Width="5.5em">掛號號碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRegNo" TabIndex="0" runat="server" Width="15.5em" MaxLength="30"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label6" runat="server" Width="5.5em">郵件編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMailNoS" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">～</asp:Label>
                        <asp:TextBox ID="txMailNoE" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:TextBox ID="txSysMail" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label9" runat="server" Width="8.5em">備註(來文機關)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDesc" TabIndex="0" runat="server" Width="20.5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv" style="height: 266px">
                    <asp:DataGrid ID="dg1" runat="server" Height="1px" EnableViewState="False" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵件編號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlMailNo" TabIndex="0" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="登錄日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDept" Style="overflow: hidden" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件地區">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcArEA" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件人">
                                <ItemTemplate>
                                    <asp:Label ID="lbUser" Style="overflow: hidden" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵件類別">
                                <ItemTemplate>
                                    <asp:Label ID="lbMailType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="掛號號碼">
                                <HeaderTemplate>
                                    <asp:Label ID="dglbMail" runat="server">掛號號碼</asp:Label>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Label ID="lbRegNo" Style="overflow: hidden" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="備註(來文機關)">
                                <ItemTemplate>
                                    <asp:Label ID="lbDesc" Style="overflow: hidden" runat="server" CssClass="PopUp"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
