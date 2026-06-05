<%@ Page Language="c#" CodeBehind="OMI100.aspx.cs" AutoEventWireup="false" Inherits="OM1.OMI100" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>OMI100 駐外收文查詢作業</title>
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
    <form id="OMI100" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../OMLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
            <asp:TextBox ID="txApWebFileio" TabIndex="1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txApWorkPath" TabIndex="1" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server" CssClass="RequireField">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="RequireField DatePicker" ID="txIssueDateS" TabIndex="10" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>-
                        <asp:TextBox CssClass="RequireField DatePicker" ID="txIssueDateE" TabIndex="10" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" TabIndex="10" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="">發文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txIssueNo" TabIndex="1" runat="server" Width="7.5em" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
                
            </div>
			<div class="DivTable" id="GridTable">
                    <div class="dTR">
                        <div class="GridDiv" data-fixed="true">
                            <asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="發文字號">
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:HyperLink ID="hyIssueNo" runat="server" CssClass="InputFieldLabel"></asp:HyperLink>
                                            <asp:TextBox ID="txSysid" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="承辦單位">
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbOuName" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSubject" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="發文日期">
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbIssueDate" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="下載日期">
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbDlDate" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
