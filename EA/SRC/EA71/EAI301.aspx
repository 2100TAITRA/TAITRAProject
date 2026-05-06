<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAI301.aspx.cs" AutoEventWireup="false" Inherits="EA71.EAI301" ValidateRequest="false" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAI301 檔案目錄摘要瀏覽</title>
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
    <form id="EAI301" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txUnvFile" runat="server" Width="43px"></asp:TextBox>
            <asp:TextBox ID="txWebWorkPath" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="txServerName" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="txServerPort" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="txUnvFileLocal" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="DOC_CHECK" runat="server" Width="97px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="COM_CHECK" runat="server" Width="105px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="DETAIL_DATA_TYPE" runat="server" Width="105px" CssClass="hidden"></asp:TextBox>
            <asp:ListBox ID="lboxTheme" runat="server"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="GridTable">
                <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V3_GenericBannerToolBar">
                    <asp:Label runat="server" Text="頁數"></asp:Label>
                    <asp:TextBox runat="server" Width="4em" ID="txPage1" BackColor="LightGray"></asp:TextBox>
                    <asp:Label runat="server" Text="筆數"></asp:Label>
                    <asp:TextBox runat="server" Width="2.5em" ID="txTotCount" BackColor="LightGray"></asp:TextBox>
                    <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="明細" ID="btDETAIL1" AccessKey="D" Title="顯示明細(ALT+D)"></asp:Button>
                    <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="全選" ID="btSELECTALL1" AccessKey="S" Title="全部勾選(ALT+S)"></asp:Button>
                    <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="取消" ID="btUNSELECT1" AccessKey="U" Title="取消勾選(ALT+U)"></asp:Button>
                    <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="第一頁" ID="btFIRSTPAGE1" AccessKey="F" Title="第一頁(ALT+F)"></asp:Button>
                    <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="上一頁" ID="btPRIORPAGE1" AccessKey="P" Title="上一頁(ALT+P)"></asp:Button>
                    <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="下一頁" ID="btNEXTPAGE1" AccessKey="N" Title="下一頁(ALT+N)"></asp:Button>
                    <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="最末頁" ID="btLASTPAGE1" AccessKey="L" Title="最末頁(ALT+L)"></asp:Button>
                    <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="線上瀏覽" ID="btIMAGE1" AccessKey="V" Title="線上瀏覽(ALT+V)"></asp:Button>
                    <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="明細列印" ID="btPRINTDETAIL" AccessKey="X" Title="明細列印(ALT+X)"></asp:Button>
                    <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="清單列印" ID="btPRINTLIST" AccessKey="R" Title="清單列印(ALT+R)"></asp:Button>
                    <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="申請調檔" ID="btAPPLY1" AccessKey="A" Title="申請調檔(ALT+A)"></asp:Button>
                </asp:Panel>
                <div class="GridDiv" style="height: 32em">
                    <asp:DataGrid ID="dgDETAIL" runat="server" AutoGenerateColumns="False" GridLines="Horizontal" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSELECT" onclick="SelectItem('DOC_CHECK')" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlSEQ_NO" title="" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文號／案號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDATA_TYPE" runat="server" CssClass="hide">1</asp:Label>
                                    <asp:HyperLink ID="lkDOC_NO" title="本筆公文明細資料" runat="server" Width="6em"></asp:HyperLink>
                                    <asp:Label ID="lbCOM_NO" runat="server" Visible="False">●</asp:Label>
                                    <asp:Label ID="lbSOURCE_ORGNO" runat="server" Visible="False">●</asp:Label>
                                    <asp:Label ID="lbRPS_USER" runat="server" Visible="False">●</asp:Label>
                                    <asp:Label ID="lbRPSDEPT_NO" runat="server" Visible="False">●</asp:Label>
                                    <asp:Label ID="lbRPSSECT_NO" runat="server" Visible="False">●</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="櫥位號">
                                <ItemTemplate>
                                    <asp:Label ID="lbStockNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <ItemTemplate>
                                    <asp:HyperLink ID="lkProcess" runat="server" Width="2em">流程</asp:HyperLink>
                                    <asp:HyperLink ID="lkFILE_NO" runat="server" Width="3.5em">瀏覽全案</asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目前位置">
                                <ItemTemplate>
                                    <asp:Label ID="lbCURR_LOCATION" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="借出">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorrow" runat="server">否</asp:Label>
                                    <asp:HyperLink ID="hlBorrow" ForeColor="Blue" runat="server">是</asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="相關電子檔">
                                <ItemTemplate>
                                    <asp:Label ID="lbVOLUME0" runat="server">無</asp:Label>
                                    <asp:Label ID="lbVOLUME1" runat="server" ForeColor="Blue">有</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="相關案件(卷)">
                                <ItemTemplate>
                                    <asp:LinkButton ID="lkCOMBINE" title="本筆併案公文資料" OnClick="lkCOMBINE_Click" runat="server" CausesValidation="False">有</asp:LinkButton>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案由(主旨)／案名">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_SUBJECT" runat="server" CssClass="hide"></asp:Label>
                                    <asp:TextBox ID="txFROM_SUBJECT" TabIndex="-1" runat="server" Width="15em" CssClass="PopUp" Wrap="False" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
