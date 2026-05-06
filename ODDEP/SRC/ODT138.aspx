<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT138.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT138" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODT138 待登錄陳核會稿公文查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT138" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="h_OrgNo" Width="50" runat="server"></asp:TextBox>
        </div>
        <div id="DivBaseTable" class="BaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">收文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" class="DatePicker" TabIndex="2" onkeypress="jf_InpNumOnly()" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txDateE" class="DatePicker" TabIndex="2" onkeypress="jf_InpNumOnly()" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">速別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlSpeed" TabIndex="30" runat="server" Width="7em"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <asp:Panel ID="dgtool" runat="server" CssClass="dTD DgSelectToolBar">
                        <asp:Button ID="btSelectAll" runat="server" CausesValidation="False" Text="全選"></asp:Button>
                        <asp:Button ID="btClear" runat="server" Text="清除"></asp:Button>
                        <asp:Button ID="btReverse" runat="server" Text="反向"></asp:Button>
                    </asp:Panel>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 12em">
                            <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" PageSize="30" AutoGenerateColumns="False" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:HyperLink ID="hlSeqNo" runat="server"></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="刪">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" runat="server" AutoPostBack="False"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="收文時間">
                                        <ItemTemplate>
                                            <asp:Label ID="lbRcvDate" runat="server" CssClass="PopUp"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="陳/會">
                                        <ItemTemplate>
                                            <asp:TextBox ID="H_txSysId" runat="server" Width="1px" Height="1px" CssClass="hidden"></asp:TextBox>
                                            <asp:Label ID="lbComeOthers" runat="server" CssClass="PopUp"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="來文日期">
                                        <ItemTemplate>
                                            <asp:Label ID="lbFromDate" runat="server" CssClass="PopUp"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="來文機關">
                                        <ItemTemplate>
                                            <asp:Label ID="lbOrgOthers" runat="server" CssClass="PopUp"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="陳核會稿文號">
                                        <ItemTemplate>
                                            <asp:HyperLink ID="hlOthersDocNo" runat="server"></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSubjectMain" runat="server" CssClass="PopUp"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="搜尋" ID="btSearch" TabIndex="1" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" ID="btDelete" DefaultStyle="newmode:none;modifymode:block;"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" ID="btClean" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
