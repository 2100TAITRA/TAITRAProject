<%@ Page Language="c#" CodeBehind="AKI811.aspx.cs" AutoEventWireup="false" Inherits="AK.AKI811" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>AKI811 檔案目錄併案摘要瀏覽</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="LIB/AK.css" type="text/css" rel="stylesheet">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
</head>
<body ms_positioning="GridLayout">
    <form id="AKI811" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericSearch.htm"-->
		<!-- 2016.8 - Leslie 補上報表顯示所需要的框架DIV -->
		<div id="dlgASPXPage" style="display:none;width:99%;height:99%;padding:0px;">
			<div class="pane" style="width:101%;height:101%;overflow-y: hidden;overflow-x:hidden; -webkit-overflow-scrolling:touch;">
			  <iframe class="aspx_page_content" style="width:99%;height:99%;"></iframe>
			</div>
			<a class="closeBtn" style="display:none"></a>
		</div><!-- <div id="dlgASPXPage" ... -->
        <div class="BaseTable">
            <div class="GridDiv" id="SumTable">
                    <asp:DataGrid ID="dgDETAIL" runat="server" CellPadding="3" GridLines="Horizontal" AutoGenerateColumns="False" Width="99%">
                        <Columns>
                            <asp:TemplateColumn HeaderText="選">
                                <HeaderTemplate>
                                    <asp:Label ID="lbSELECT" runat="server">選</asp:Label>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSELECT" onclick="SelectItem('COM_CHECK')" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlSEQ_NO" title="" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="lkDOC_NO" title="本筆公文明細資料" runat="server"></asp:HyperLink>&nbsp;
									<asp:Label ID="lbCaseNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <ItemTemplate>
                                    <asp:HyperLink ID="lkProcess" runat="server" Font-Size="Smaller">流程</asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔號(年-分類-案-卷-目)">
                                <ItemTemplate>
                                    <asp:HyperLink ID="lkFILE_NO" runat="server" Font-Size="Smaller"></asp:HyperLink>
                                    <asp:Label ID="lbFILE_NO" runat="server" CssClass="hide" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="產生日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbCRT_DATE" runat="server" Text=""></asp:Label>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox1" runat="server" Text=""></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="電子檔">
                                <ItemTemplate>
                                    <asp:HyperLink ID="lbVOLUME1" runat="server" ForeColor="Blue">有</asp:HyperLink>
                                    <asp:Label ID="lbVOLUME0" runat="server" ForeColor="Black">無</asp:Label>
									<asp:Label ID="lbSignType" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="併案情形">
                                <ItemTemplate>
                                    <asp:Label ID="lbComType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="併案類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbCombineType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="併件">
                                <ItemTemplate>
                                    <asp:Label ID="lbComStatus" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                             <asp:TemplateColumn HeaderText="借出">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorrow" runat="server" ToolTip="" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨摘要">
                                <ItemTemplate>
                                    <asp:Label ID="txFROM_SUBJECT" style="overflow: hidden; display:inline-block; height: 1.4em" runat="server" CssClass="PopUp">
                                    </asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
				 <div id="lbToolTip" style="border-right: black 1px solid; padding-right: 1px; border-top: black 1px solid; display: none; padding-left: 1px; font-size: x-small; z-index: 104; left: 783px; padding-bottom: 1px; border-left: black 1px solid; padding-top: 1px; border-bottom: black 1px solid; position: absolute; top: 221px; background-color: infobackground" ms_positioning="FlowLayout"></div>
            </div>
        </div>
        <div style="display: none; z-index: 100; left: 779px; overflow: auto; width: 122px; position: absolute; top: 13px; height: 195px">
            <asp:ValidationSummary ID="ValidationSummary1" runat="server" Height="25px" Width="175px"></asp:ValidationSummary>
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator" CssClass="hidden"></asp:CustomValidator>
            <asp:ListBox ID="lbReturnValue" runat="server" Height="33px" Width="46px" CssClass="hidden"></asp:ListBox>
            <asp:TextBox ID="txUnvFile" runat="server" Width="43px"></asp:TextBox>
            <asp:TextBox ID="txWebWorkPath" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="txServerName" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="txServerPort" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="txUnvFileLocal" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="DOC_CHECK" runat="server" Width="97px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="COM_CHECK" runat="server" Width="105px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_txAKT800DgSize" Style="z-index: 105; left: 8px; position: absolute; top: 8px" runat="server" Width="4px" Height="8px" CssClass="hidden"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Label runat="server" ForeColor="Black" Font-Size="Smaller">併案文號</asp:Label>
            <asp:TextBox ID="txComNo" runat="server" Width="7.5em"  BackColor="LightGray" Text="12345678901234" ReadOnly="True"></asp:TextBox>
            <asp:Button ID="btDETAIL1" runat="server" Text="明細(L)" accessKey="L" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSELECTALL1" runat="server" Text="全選(Y)"  AccessKey="Y" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btUNSELECT1" runat="server" Text="取消(C)" AccessKey="C" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:TextBox ID="txPage1" BackColor="LightGray" Text="1/10" ReadOnly="True" runat="server" Width="2.5em"></asp:TextBox>
            <asp:Button ID="btFIRSTPAGE1" runat="server" Text="第一頁(G)" AccessKey="G" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPRIORPAGE1" runat="server" Text="上頁(P)" AccessKey="P" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btNEXTPAGE1" runat="server" Text="下頁(N)" AccessKey="N" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btLASTPAGE1" runat="server" Text="最末頁(L)"  AccessKey="L" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btIMAGE1" runat="server" Text="線上瀏覽(U)" AccessKey="U" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:CheckBox ID="cbKeepOldImageList" runat="server" Text="(保留)" Checked="True"></asp:CheckBox>
            <asp:Button ID="btAPPLY1" runat="server" Text="申請調檔(I)" AccessKey="I" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btEXIT1" runat="server" Text="離開(Y)" AccessKey="Y" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
