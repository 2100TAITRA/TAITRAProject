<%@ Page Language="c#" CodeBehind="EAR202.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR202" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR202 案卷標籤批次列印作業</title>
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
    <form id="EAR202" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label1" runat="server" Width="8em">案卷名稱列印項：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rblClsCaseName" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="0" Selected="True">分類號+案名</asp:ListItem>
                            <asp:ListItem Value="1">分類名</asp:ListItem>
                            <asp:ListItem Value="2">案名</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                 <div class="dTR" id="Trrpttype">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label8" runat="server" Width="8em">報表格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbRptType" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="0" Selected="True">案卷卷脊</asp:ListItem>
                            <asp:ListItem Value="1">案卷封面</asp:ListItem>
                            <asp:ListItem Value="2">檔片用</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label2" runat="server">版本別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 2em">
                        <asp:TextBox ID="txVerNo" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">列印開始位置：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 1.5em">
                        <asp:TextBox ID="txPos" TabIndex="0" runat="server" Width="1.5em" CssClass="InputFieldNumeric" MaxLength="2"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:Label ID="Label4" runat="server">標籤數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRowNum" TabIndex="0" runat="server" Width="1.5em" CssClass="InputFieldNumeric" MaxLength="2"></asp:TextBox>
                        <asp:Button ID="btReset" runat="server" Text="重設"></asp:Button>
                    </div>
                </div>
                
            </div>
            <div id="GridTable" class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
	                <asp:Button ID="btSelectAll" runat="server" Text="全選" />
	                <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
	                <asp:Button ID="btSelectClear" runat="server" Text="清除" />
	                <asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
	                <asp:Button ID="btUp" runat="server" Text="↑" />
	                <asp:Button ID="btDown" runat="server" Text="↓" />
                </asp:Panel>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Right"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="卷號(年度號 － 分類號 － 案次號 － 卷次號)">
                                <ItemTemplate>
                                    <asp:TextBox onblur="PadLeftWithZero(3)" ID="txYear" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                    <asp:Label ID="Label5" runat="server">─</asp:Label>
                                    <asp:TextBox ID="txClass" TabIndex="0" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                    <asp:Label ID="Label6" runat="server">─</asp:Label>
                                    <asp:TextBox onblur="PadLeftWithZero2(3)" ID="txCase" TabIndex="0" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                    <asp:Label ID="Label7" runat="server">─</asp:Label>
                                    <asp:TextBox onblur="PadLeftWithZero(4)" ID="txVol" TabIndex="0" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                                    <asp:Label ID="lbSepEnd" runat="server">～</asp:Label>
                                    <asp:TextBox onblur="PadLeftWithZero(4)" ID="txVol2" TabIndex="0" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:TextBox Style="z-index: 102; position: absolute; top: 752px; left: 360px" ID="tx_H_OrgNickName" runat="server" CssClass="hide"></asp:TextBox>
    </form>
</body>
</html>
