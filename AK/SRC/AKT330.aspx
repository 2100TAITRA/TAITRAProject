<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKT330.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT330" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKT330 分併卷作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="AKT330" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 100; position: absolute; top: 102px; left: 10px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:Label ID="Label1" runat="server">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVerNo" TabIndex="5" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:Label class="RequireField" ID="Label2" runat="server">檔號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireFieldNumeric" ID="txYear" TabIndex="10" runat="server" Width="2em" MaxLength="3"></asp:TextBox>－
						<asp:TextBox class="RequireField" ID="txCls" TabIndex="20" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>－
						<asp:TextBox class="RequireField" ID="txCase" TabIndex="30" runat="server" Width="7em" MaxLength="12"></asp:TextBox>－
						<asp:TextBox class="RequireEnOnlyUpperField" ID="txVol" TabIndex="40" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:RadioButton ID="rbSplit" TabIndex="50" runat="server" Width="20.5em" Text="分卷 選取公文(含)以後案件分到下一案卷" GroupName="GN"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 2em; min-height: 1px"></div>
                    <div class="dTD">
                        <asp:Label ID="lb1" runat="server"></asp:Label>
                        <asp:RadioButton ID="rbReset" TabIndex="52" runat="server" Text="依下卷目次號由1開始" GroupName="GP"></asp:RadioButton>
                        <asp:RadioButton ID="rbMax" TabIndex="54" runat="server" Text="依下卷最大目次續編" GroupName="GP"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:RadioButton ID="rbInsert" TabIndex="56" runat="server" Width="20.5em" Text="分卷 本卷以後各卷卷次號續編" GroupName="GN"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:RadioButton ID="rbMerge" TabIndex="60" runat="server" Width="20.5em" Text="併卷 選取公文(含)以前案件分到上一案卷" GroupName="GN"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:RadioButton ID="rbReSortSeq" TabIndex="60" runat="server" Width="20.5em" Text="目次號重新排序" GroupName="GN"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 17.5em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Text='<%# DataBinder.Eval(Container.DataItem,"SEQ_NO") %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDOC_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="併案文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbCOM_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔號">
                                <ItemTemplate>
                                    <asp:Label ID="lbYear" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="分併卷">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbChangeVol" TabIndex="50" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="搜索" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="執行(S)" DefaultStyle="newmode:none;modifymode:block;" ID="btSave" AccessKey="S" Title="執行(ALT+S)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預立新卷(N)" DefaultStyle="newmode:block;modifymode:none;" ID="btNewVol" AccessKey="N" Title="預立新卷(ALT+N)"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 102; position: absolute; top: 349px; left: -9px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 103; position: absolute; top: 127px; left: 11px" runat="server" CssClass="hide"></asp:ValidationSummary>
        <asp:TextBox ID="H_CLSKEY" CssClass="hide" runat="server"></asp:TextBox>
        <asp:TextBox ID="H_NEWVOL" CssClass="hide" runat="server"></asp:TextBox>
        <asp:TextBox ID="H_CASEKEY" CssClass="hide" runat="server"></asp:TextBox>
        <asp:TextBox ID="H_DOCFILETYPE" CssClass="hide" runat="server"></asp:TextBox>
    </form>
</body>
</html>
