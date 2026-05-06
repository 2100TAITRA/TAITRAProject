<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR506.aspx.cs" AutoEventWireup="false" Inherits="EA50.EAR506" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR506銷毀目錄裝箱標籤列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <style>
        .tr01 {
            BACKGROUND-COLOR: white;
        }

        .tr02 {
            BACKGROUND-COLOR: #f7f7de;
        }
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAR506" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="H_VolumeNum" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">銷毀計畫編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDPlan" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label3" runat="server">銷毀機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgNo" TabIndex="0" runat="server" Width="20.5em" CssClass="DisplayOnly" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label2" runat="server">層轉機關來文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txWord" TabIndex="0" runat="server" Width="4.5em" CssClass="DisplayOnly" MaxLength="20"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server" CssClass="RequireField">字第</asp:Label>
                        <asp:TextBox ID="txNumber" runat="server" CssClass="DisplayOnly" Width="8em"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server" CssClass="RequireField">號</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label5" runat="server">總冊數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txNum1" TabIndex="0" runat="server" Width="2.5em" CssClass="DisplayOnly" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">總箱數：</asp:Label>
                        <asp:TextBox ID="txNum2" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>箱 
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label6" runat="server">備註：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRemark" TabIndex="0" runat="server" Width="23.5em" MaxLength="20" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label4" runat="server">列印範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb1" runat="server" Checked="True" GroupName="g1" Text="全部"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb2" runat="server" GroupName="g1" Text="部份"></asp:RadioButton>
                        <asp:TextBox ID="txRange" runat="server" Width="7em"></asp:TextBox>(ex:  1-3, 5, 7 )
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 4.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        皆<asp:TextBox ID="txNum3" TabIndex="0" runat="server" Width="3em" CssClass="InputFieldNumeric" MaxLength="5"></asp:TextBox>冊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:Button ID="btSelectAll" runat="server" Text="設定"></asp:Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:Button ID="btSelectClear" runat="server" Text="全部清除"></asp:Button>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv" style="Width: 10em">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="5" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="箱號">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbRead" runat="server" Width="8em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="冊數">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="txInput1" TabIndex="0" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                    總冊數為<asp:Label ID="lbCurrVolNum" runat="server" Width="2em">0</asp:Label>冊
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
