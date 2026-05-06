<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="AKI801.aspx.cs" AutoEventWireup="false" Inherits="AK.AKI801" ValidateRequest="false" Trace="false" %>
<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKI801 檔案目錄摘要瀏覽</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <link rel="stylesheet" type="text/css" href="LIB/AK.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server" EnableViewState="False"></asp:Literal>
    <style>
        .ButBorder {
            BORDER-BOTTOM: gray 1px solid;
            BORDER-LEFT: gray 1px solid;
            BORDER-TOP: gray 1px;
            BORDER-RIGHT: gray 1px;
        }

        A.SortLinkTitle {
            COLOR: #206eb1;
        }
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
</head>
<body onkeydown="KeyDown()" oncontextmenu="event.returnValue=false" ms_positioning="GridLayout">
    <form id="AKI801" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
		<!-- 2016.8 - Leslie 補上報表顯示所需要的框架DIV -->
		<div id="dlgASPXPage" style="display:none;width:99%;height:99%;padding:0px;">
			<div class="pane" style="width:101%;height:101%;overflow-y: hidden;overflow-x:hidden; -webkit-overflow-scrolling:touch;">
			  <iframe class="aspx_page_content" style="width:99%;height:99%;"></iframe>
			</div>
		</div><!-- <div id="dlgASPXPage" ... -->
        <div class="BaseTable">
            <div class="GridDiv" id="SumTable">
                <asp:DataGrid ID="dgDETAILV2" runat="server" PageSize="50" CellPadding="2" Width="99%" GridLines="Vertical" AutoGenerateColumns="False" DataSource="<%# DataSetMain %>" DataMember="DOC_MAIN" Style="BACKGROUND-COLOR:white">
                    <Columns>
                        <asp:TemplateColumn HeaderText="選">
                            <ItemTemplate>
                                <asp:CheckBox ID="cbSELECT" onclick="SelectItem('DOC_CHECK')" runat="server"></asp:CheckBox>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="序">
                            <ItemTemplate>
                                <asp:HyperLink ID="hlSEQ_NO" title="" runat="server" Width="3.5em"></asp:HyperLink>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="文(編)號">
							<HeaderTemplate>
                                <asp:HyperLink ID="hlDocNoTitle" runat="server" NavigateUrl="javascript:void(0)" CssClass="SortLinkTitle">文(編)號</asp:HyperLink>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:HyperLink ID="lkDOC_NO" title="本筆公文明細資料" runat="server"></asp:HyperLink>&nbsp;
								<asp:Label ID="lbCaseNo" runat="server"></asp:Label>
													<asp:Label ID="lbCOM_NO" runat="server" Visible="False">●</asp:Label>
                                <asp:Label ID="lbSOURCE_ORGNO" runat="server" Visible="False">●</asp:Label>
                                <asp:Label ID="lbRPS_USER" runat="server" Visible="False">●</asp:Label>
                                <asp:Label ID="lbRPSDEPT_NO" runat="server" Visible="False">●</asp:Label>
                                <asp:Label ID="lbRPSSECT_NO" runat="server" Visible="False">●</asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:HyperLink ID="lkProcess" runat="server"  >流程</asp:HyperLink>
                                <asp:Label ID="lbRFI_NO" runat="server"   CssClass="hide" Width="15em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="來文字號&lt;br&gt;發文字號">
						<HeaderTemplate>
							<asp:Label id="Label1" runat="server">來文字號<br>發文字號</asp:Label>
						</HeaderTemplate>
                            <ItemTemplate>
                                <asp:Label ID="lbFromWord" runat="server"   Width="12.5em"></asp:Label><br>
                                <asp:Label ID="lbIssueWord" runat="server"   Width="12.5em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="來文日期">
                            <HeaderTemplate>
                                <asp:HyperLink Style="z-index: 0" ID="hlFromDateTitle" runat="server" NavigateUrl="javascript:void(0)"
                                    CssClass="SortLinkTitle">來文日期</asp:HyperLink><br>
                                <asp:HyperLink Style="z-index: 0" ID="hlNewByOuTitle" runat="server" NavigateUrl="javascript:void(0)"
                                    CssClass="SortLinkTitle">收創文別</asp:HyperLink>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:Label Style="z-index: 0" ID="lbFROM_DATE" runat="server" Width="6.5em" ></asp:Label><br>
                                <asp:Label Style="z-index: 0" ID="lbNewByOu" runat="server" Width="6.5em" ></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <%-- 1090304    Leslie[1081107] 新增客製化欄位 --%>
                        <asp:TemplateColumn HeaderText="收創文日期" >
                            <HeaderTemplate>
                                <asp:Label Style="z-index: 0" ID="lbRcvDateTitle" runat="server">收創文日期</asp:Label><br>
                                <asp:Label Style="z-index: 0" ID="lbCloseDateTitle" runat="server">結案日期</asp:Label>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:Label Style="z-index: 0" ID="lbRCV_DATE" runat="server" Width="6.5em" ></asp:Label><br>
                                <asp:Label Style="z-index: 0" ID="lbCLOSE_DATE" runat="server" Width="6.5em" ></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="承辦人">
                            <HeaderTemplate>
                                <asp:HyperLink ID="hlDeptTitle" runat="server" NavigateUrl="javascript:void(0)" CssClass="SortLinkTitle">承辦單位</asp:HyperLink>、
													<asp:HyperLink ID="hlEmpNameTitle" runat="server" NavigateUrl="javascript:void(0)" CssClass="SortLinkTitle">人</asp:HyperLink><br>
                                <asp:Label ID="Label2" runat="server">目前位置</asp:Label>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:Label ID="lbDeptName" runat="server" Width="10em" ></asp:Label>
                                <asp:Label Style="z-index: 0" ID="lbEMP_NAME" runat="server" Width="8em" ></asp:Label><br>
                                <asp:Label Style="z-index: 0" ID="lbCURR_LOCATOIN" runat="server" Width="20em" ></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="檔號(年-分類-案-卷-目)">
                            <HeaderTemplate>
                                <asp:HyperLink ID="hlFileNoTitle" runat="server" NavigateUrl="javascript:void(0)" CssClass="SortLinkTitle">檔號(年-分類-案-卷-目)</asp:HyperLink>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:HyperLink ID="lkFILE_NO" runat="server" Width="20em" ></asp:HyperLink>
                                <asp:Label ID="lbFILE_NO" runat="server" Width="20em" CssClass="hide"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="來文&lt;br&gt;機關">
                            <ItemTemplate>
                                <asp:TextBox Style="border-bottom: 0px; border-left: 0px; overflow-x: hidden; overflow-y: hidden; border-top: 0px; border-right: 0px"
                                    ID="txFROM_ORGNAME" TabIndex="-1" runat="server" Width="100%" CssClass="PopUp" Text='' TextMode="MultiLine"
                                    Rows="3" ReadOnly="True"></asp:TextBox>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="借出">
                            <ItemTemplate>
                                <asp:Label ID="lbBorrow" runat="server" ToolTip="" ></asp:Label>
                                <asp:TextBox ID="H_txBorrowInfo" CssClass="hide" runat="server"></asp:TextBox>
                                <font color="blue"><u><asp:HyperLink id="hlBorrow" Runat="server" ToolTip="" ></asp:HyperLink></u>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="相關&lt;br&gt;電子檔">
                            <HeaderTemplate>
                                <asp:HyperLink ID="lbVulomnTitle" runat="server" NavigateUrl="javascript:void(0)" CssClass="SortLinkTitle">相關<br>電子檔</asp:HyperLink>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:HyperLink ID="lbVOLUME1" runat="server"  ForeColor="Blue"></asp:HyperLink>
                                <asp:Label ID="lbVOLUME0" runat="server"  ForeColor="Black"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="檢視&lt;br&gt;公文" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                            <ItemTemplate>
                                <asp:Button ID="btOpenUniView" Text="檢視" runat="server" CssClass="hide"></asp:Button>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="相關案件">
                            <HeaderTemplate>
                                <asp:HyperLink ID="hlComTitle" NavigateUrl="javascript:void(0)" CssClass="SortLinkTitle" runat="server">相關<br>案件</asp:HyperLink>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <%-- <asp:LinkButton ID="lkCOMBINE" title="本筆併案公文資料" OnClick="lkCOMBINE_Click" runat="server" 
                                    CausesValidation="False">無</asp:LinkButton>--%>
								<asp:HyperLink ID="lkCOMBINE" runat="server" ToolTip="本筆併案公文資料">無</asp:HyperLink>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="主旨摘要">
                            <HeaderTemplate>
                                <asp:HyperLink ID="hlSubjectTitle" runat="server" NavigateUrl="javascript:void(0)" CssClass="SortLinkTitle">主旨摘要</asp:HyperLink>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:Label ID="lbFROM_SUBJECT" runat="server" CssClass="hide" Visible="False" Text='<%# DataBinder.Eval(Container, "DataItem.FROM_SUBJECT") %>'>
                                </asp:Label>
                                <asp:Label Style="border-bottom: 0px; border-left: 0px; overflow-x: hidden; overflow-y: hidden; border-top: 0px; border-right: 0px" ID="txFROM_SUBJECT" TabIndex="-1" runat="server" CssClass="PopUp" Width="100%" Text='<%# DataBinder.Eval(Container, "DataItem.FROM_SUBJECT") %>' TextMode="MultiLine" Rows="3" ReadOnly="True">
                                </asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="公文&lt;br&gt;狀態">
                            <HeaderTemplate>
                                <asp:HyperLink ID="hlDocState" runat="server" NavigateUrl="javascript:void(0)" CssClass="SortLinkTitle">公文<br>狀態</asp:HyperLink>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:Label ID="lbDocState" runat="server" Width="4.5em" Height="16px" ></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <%-- 1090304    Leslie[1081107] 新增客製化欄位 --%>
                        <asp:TemplateColumn HeaderText="密等">
                            <HeaderTemplate>
                                <asp:Label ID="lbDocSecTitle" runat="server" >密等</asp:Label>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:Label ID="lbDocSec" runat="server" Width="4.5em" Height="16px" ></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                    </Columns>
                </asp:DataGrid>
                <asp:DataGrid ID="dgDETAILV1" runat="server" PageSize="50" CellPadding="2" Width="99%" GridLines="Vertical" AutoGenerateColumns="False" DataSource="<%# DataSetMain %>" DataMember="DOC_MAIN">
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
						<%-- 1110419    Leslie[1110064] 新增客製化欄位 --%>
                        <asp:TemplateColumn HeaderText="收創文日期">
                            <HeaderTemplate>
                                <asp:Label Style="z-index: 0" ID="lbRcvDateTitle" runat="server">收創文日期</asp:Label><br>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:Label Style="z-index: 0" ID="lbRCV_DATE" runat="server" Width="6.5em" ></asp:Label><br>
                            </ItemTemplate>
                        </asp:TemplateColumn>
						<%-- 1131120	Leslie[1131026]	新增客製化欄位 --%>
						<asp:TemplateColumn HeaderText="來文者" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                            <ItemTemplate>
                                <asp:TextBox Style="border-bottom: 0px; border-left: 0px; overflow-x: hidden; overflow-y: hidden; border-top: 0px; border-right: 0px"
                                    ID="txFROM_ORGNAME2" TabIndex="-1" runat="server"  CssClass="PopUp" Text='' TextMode="MultiLine"
                                    Rows="1" ReadOnly="True"></asp:TextBox>
                            </ItemTemplate>
                        </asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="簽核&lt;br&gt;類型" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                            <ItemTemplate>
                                <asp:Label Style="z-index: 0" ID="lbSIGN_TYPE" runat="server" Width="6.5em" ></asp:Label><br>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="文(編)號">
                            <ItemTemplate>
                                <asp:HyperLink ID="lkDOC_NO" title="本筆公文明細資料" runat="server"></asp:HyperLink>&nbsp;
								<asp:Label ID="lbCaseNo" runat="server"></asp:Label>
													<asp:Label ID="lbCOM_NO" runat="server" Visible="False">●</asp:Label>
                                <asp:Label ID="lbSOURCE_ORGNO" runat="server" Visible="False">●</asp:Label>
                                <asp:Label ID="lbRPS_USER" runat="server" Visible="False">●</asp:Label>
                                <asp:Label ID="lbRPSDEPT_NO" runat="server" Visible="False">●</asp:Label>
                                <asp:Label ID="lbRPSSECT_NO" runat="server" Visible="False">●</asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderStyle-HorizontalAlign="Center">
                            <ItemTemplate >
                                <asp:HyperLink ID="lkProcess" runat="server"  >流程</asp:HyperLink>
                                <asp:Label ID="lbRFI_NO" runat="server"  CssClass="hide"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
						<%-- 1131120	Leslie[1131026]	新增客製化欄位 --%>
						<asp:TemplateColumn HeaderText="承辦單位" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                            <ItemTemplate>
                                <asp:Label Style="z-index: 0" ID="lbDEPT_NAME2" runat="server" Width="6.5em" ></asp:Label><br>
                            </ItemTemplate>
                        </asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="承辦人" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                            <ItemTemplate>
                                <asp:Label Style="z-index: 0" ID="lbEMP_NAME2" runat="server" Width="6.5em" ></asp:Label><br>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="檔號(年-分類-案-卷-目)">
                            <HeaderTemplate>
                                <asp:Label Style="z-index: 0" ID="Label1" runat="server" >檔號(年-分類-案-卷-目)</asp:Label>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:HyperLink ID="lkFILE_NO" runat="server"  ></asp:HyperLink>
                                <asp:Label ID="lbFILE_NO" runat="server" CssClass="hide" ></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="承辦人">
                            <ItemTemplate>
                                <asp:Label ID="lbEMP_NAME" runat="server"  ></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="來文&lt;br&gt;日期">
                            <ItemTemplate>
                                <asp:Label ID="lbFROM_DATE" runat="server"  ></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="來文&lt;br&gt;機關">
                            <ItemTemplate>
                                <asp:TextBox Style="border-bottom: 0px; border-left: 0px; overflow-x: hidden; overflow-y: hidden; border-top: 0px; border-right: 0px"
                                    ID="txFROM_ORGNAME" TabIndex="-1" runat="server"  CssClass="PopUp" Text='' TextMode="MultiLine"
                                    Rows="1" ReadOnly="True"></asp:TextBox>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="目前&lt;br&gt;位置">
                            <ItemTemplate>
                                <asp:Label ID="lbCURR_LOCATOIN"  runat="server" ></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="借出">
                            <ItemTemplate>
                                <asp:Label ID="lbBorrow" runat="server" ToolTip="" ></asp:Label>
                                <asp:TextBox ID="H_txBorrowInfo" CssClass="hide" runat="server"></asp:TextBox>
                                <font color="blue"><u><asp:HyperLink id="hlBorrow" Runat="server" ToolTip="" ></asp:HyperLink></u>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="相關&lt;br&gt;電子檔">
                            <ItemTemplate>
                                <asp:HyperLink ID="lbVOLUME1" runat="server" ForeColor="Blue" ></asp:HyperLink>
                                <asp:Label ID="lbVOLUME0" runat="server" ForeColor="Black" ></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="檢視&lt;br&gt;公文" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                            <ItemTemplate>
                                <asp:Button ID="btOpenUniView" Text="檢視" runat="server" CssClass="hide"></asp:Button>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="相關案件">
                            <ItemTemplate>
                                <%--<asp:LinkButton ID="lkCOMBINE" title="本筆併案公文資料" OnClick="lkCOMBINE_Click" runat="server" CausesValidation="False"
                                    >無</asp:LinkButton>--%>
								<asp:HyperLink ID="lkCOMBINE" runat="server" ToolTip="本筆併案公文資料">無</asp:HyperLink>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="主旨摘要">
                            <ItemTemplate>
                                <asp:Label ID="lbFROM_SUBJECT" runat="server" CssClass="hide" Text='<%# DataBinder.Eval(Container, "DataItem.FROM_SUBJECT") %>' Width="100%"></asp:Label>
                                <asp:Label ID="txFROM_SUBJECT" style="overflow: hidden; display:inline-block; height: 1.4em" TabIndex="-1" runat="server" CssClass="PopUp" Text='<%# DataBinder.Eval(Container, "DataItem.FROM_SUBJECT") %>' ReadOnly="True" Wrap="False" Width="100%">
                                </asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                    </Columns>
                </asp:DataGrid>
				<!--DIV style="Z-INDEX: 104; BORDER-BOTTOM: black 1px solid; POSITION: absolute; BORDER-LEFT: black 1px solid; PADDING-BOTTOM: 1px; BACKGROUND-COLOR: infobackground; PADDING-LEFT: 1px; PADDING-RIGHT: 1px; DISPLAY: none; FONT-SIZE: small; BORDER-TOP: black 1px solid; TOP: 221px; BORDER-RIGHT: black 1px solid; PADDING-TOP: 1px; LEFT: 783px"
				id="lbToolTip" ms_positioning="FlowLayout"></DIV-->
            </div>
            <div style="z-index: 101; position: absolute; display: none; overflow: auto; ">
                <asp:ValidationSummary ID="ValidationSummary1" runat="server" ></asp:ValidationSummary>
                <asp:CustomValidator ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
                <asp:ListBox ID="lbReturnValue" runat="server"  CssClass="hidden"></asp:ListBox>
                <asp:TextBox ID="txUnvFile" runat="server" ></asp:TextBox>
                <asp:TextBox ID="txWebWorkPath" TabIndex="26" runat="server"  MaxLength="16"></asp:TextBox>
                <asp:TextBox ID="txServerName" TabIndex="26" runat="server"  MaxLength="16"></asp:TextBox>
                <asp:TextBox ID="txServerPort" TabIndex="26" runat="server"  MaxLength="16"></asp:TextBox>
                <asp:TextBox ID="txRoleNo" runat="server" CssClass="hidden"></asp:TextBox>
                <asp:TextBox ID="txUnvFileLocal" TabIndex="26" runat="server"  MaxLength="16"></asp:TextBox>
                <asp:TextBox ID="DOC_CHECK" runat="server"  CssClass="hidden"></asp:TextBox>
                <asp:TextBox ID="COM_CHECK" runat="server"  CssClass="hidden"></asp:TextBox>
                <asp:TextBox ID="txComNo" runat="server"></asp:TextBox>
                <asp:TextBox Style="z-index: 105; position: absolute; top: 8px; left: 8px" ID="H_txAKT800DgSize" runat="server" CssClass="hidden"></asp:TextBox>
                <asp:TextBox ID="txFlag" CssClass="hide" runat="server"></asp:TextBox>
                <asp:TextBox ID="txSortBy" CssClass="hide" runat="server"></asp:TextBox>
                <asp:TextBox ID="txLastSort" CssClass="hide" runat="server"></asp:TextBox>
				<asp:TextBox ID="H_txShowDG" CssClass="hide" runat="server"></asp:TextBox>
            </div>
            <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
                <asp:Label ID="lbPAGE" runat="server" ForeColor="Black" >頁數</asp:Label>
                <asp:TextBox runat="server" Width="4.5em" ID="txPage1" BackColor="LightGray" Text="1/10" ReadOnly="True"></asp:TextBox>
                <asp:Label ID="Label3" runat="server" ForeColor="Black" >筆數</asp:Label>
                <asp:TextBox runat="server" Width="3.5em" ID="txTotCount" BackColor="LightGray" ReadOnly="True"></asp:TextBox>
                <asp:Button ID="btDETAIL1" runat="server" Text="明細(L)" AccessKey="L" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btSELECTALL1" runat="server" Text="全選(Y)" AccessKey="Y" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btUNSELECT1" runat="server" Text="取消(C)" AccessKey="C" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btFIRSTPAGE1" runat="server" Text="第一頁(G)" AccessKey="G" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btPRIORPAGE1" runat="server" Text="上頁(P)" AccessKey="P" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btNEXTPAGE1" runat="server" Text="下頁(N)" AccessKey="N" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btLASTPAGE1" runat="server" Text="最末頁(L)" AccessKey="L" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btSELECTPAGE" runat="server" Text="跳至(J)" AccessKey="J" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:TextBox runat="server" Width="2em" ID="txSelectNumber" ></asp:TextBox>
                <asp:Button ID="btIMAGE1" runat="server" Text="線上瀏覽(U)"  AccessKey="U" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:CheckBox ID="cbKeepOldImageList" runat="server" Text="(保留)" Checked="True"></asp:CheckBox>
                <asp:Button ID="btPRINTDETAIL" runat="server" Text="明細預覽(X)" AccessKey="X" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btPRINTLIST" runat="server" Text="清單預覽(R)" AccessKey="R" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btAPPLY1" runat="server" Text="申請調檔(I)" AccessKey="I" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btEXTENT" runat="server" Text="展期資訊(K)" AccessKey="K" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btCOND" runat="server" Text="條件列印(W)" AccessKey="W" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="Excel(O)" AccessKey="O" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btExcel2" runat="server" Text="已歸公文移交檔" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            </asp:Panel>
        </div>
    </form>
</body>
</html>
