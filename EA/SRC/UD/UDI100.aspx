<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="UDI100.aspx.cs" AutoEventWireup="false" Inherits="UD.UDI100" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>UDI100 特殊媒體歸檔申請查詢及列印作業</title>
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
    <form id="UDI100" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" Width="8.5em" CssClass="comboBox" TabIndex="110" runat="server" MaxLength="40"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbSectName" runat="server">承辦科別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox Style="z-index: 0" ID="dlSectName" Width="8.5em" CssClass="comboBox" TabIndex="110" runat="server" MaxLength="40"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" Width="6.5em" CssClass="comboBox" TabIndex="110" runat="server" MaxLength="40"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">表單狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlType" runat="server">
                            <asp:ListItem Selected="True"></asp:ListItem>
                            <asp:ListItem Value="0">尚未送出</asp:ListItem>
                            <asp:ListItem Value="1">審核中</asp:ListItem>
                            <asp:ListItem Value="2">已核可</asp:ListItem>
                            <asp:ListItem Value="3">已退回</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSendS" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="lbline2" runat="server">～</asp:Label>
                        <asp:TextBox ID="txSendE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
            </div>
            <asp:TextBox ID="H_dlDept_Text" TabIndex="0" runat="server" Width="113px" CssClass="hide" MaxLength="7"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_txSectSelect" runat="server" Width="24px" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_txSectName" runat="server" Width="24px" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_txDept" runat="server" Width="24px" CssClass="hide"></asp:TextBox><br>
            <asp:TextBox ID="H_dlDept_Value" TabIndex="0" runat="server" Width="113px" CssClass="hide" MaxLength="7"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" TabIndex="0" runat="server" Width="117px" CssClass="hide" MaxLength="7"></asp:TextBox>
            <div class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                    <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                    <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
                    <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                </asp:Panel>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文(編)號">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlDocNo" runat="server" Width="4.5em"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請單號&lt;br&gt;申請方式">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemStyle Wrap="False"></ItemStyle>
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlAppNo" TabIndex="0" runat="server" Width="5.5em"></asp:HyperLink><br>
                                    <asp:Label ID="lbSiType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請日期&lt;br&gt;表單狀態">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbAppDate" runat="server" Width="5em"></asp:Label><br>
                                    <asp:Label ID="lbStatus" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="分類號&lt;br&gt;保存年限">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbCls" runat="server"></asp:Label><br>
                                    <asp:Label Style="z-index: 0" ID="lbKYear" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="媒體型式&lt;br&gt;媒體數量">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbMediaNo" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbFileCnt" runat="server"></asp:Label>
                                    <asp:Label ID="lbFileUnit" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="名稱&lt;br&gt;規格">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Left"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbItName" runat="server" Width="8em"></asp:Label><br>
                                    <asp:Label ID="lbItFormat" runat="server" Width="8em"></asp:Label>
                                    <asp:Label ID="lbItemDesc" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbItemMaker" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbCrtDate" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="項目表(E)" AccessKey="E" Title="確認(ALT+E)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
