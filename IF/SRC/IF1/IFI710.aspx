<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFI710.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFI710" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>IFI710 公佈欄及公告查詢程式</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="INDEX" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <asp:TextBox ID="txHDeptNo" TabIndex="-1" runat="server" CssClass="hidden"></asp:TextBox><asp:TextBox ID="H_Artifact" runat="server" CssClass="hidden"></asp:TextBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">查詢類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbBulletin" runat="server" Text="公佈欄" GroupName="type"></asp:RadioButton>
                        <asp:RadioButton ID="rbDec" runat="server" Text="公告" GroupName="type"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbAll" runat="server" Text="全部" GroupName="type" Checked="True"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">發佈日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label Style="z-index: 0" ID="Label5" runat="server">－</asp:Label>
                        <asp:TextBox Style="z-index: 0" ID="txDateE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbType" runat="server">公布類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlType" runat="server" Style="width: 9.5em"></asp:DropDownList>
                        <asp:Label Style="z-index: 0" ID="lbTypeNotice" runat="server">(僅支援公佈欄)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbDocNo" runat="server">相關文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>
                        <asp:Label Style="z-index: 0" ID="lbNotice" runat="server">(僅支援公佈欄)</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbDept" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlDept" runat="server" Style="width: 9.5em"></asp:DropDownList>
                        <asp:Label Style="z-index: 0" ID="lbDeptNotice" runat="server">(僅支援公佈欄)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label8" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txSubject" TabIndex="0" runat="server" Width="32.5em" Height="4em" MaxLength="10" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="1.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發佈類別">
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueType" runat="server" Width="6.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="編號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="lbdgDocNo" runat="server" Width="6.5em"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server" Width="25em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發佈日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbPublishDate" runat="server" Width="6.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="相關文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbComDocNo" runat="server" Width="6.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>