<%@ Page language="c#" Codebehind="EAR340.aspx.cs" AutoEventWireup="false" Inherits="EA03.EAR340" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR340 預約借檔清單列印作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAR340" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label1" runat="server">調案日期：</asp:label>
                        </div>
                        <div class="dTD">
                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txBorDateS" tabIndex="10" runat="server" Width="4em"
                                CssClass="DatePicker" MaxLength="7"></asp:textbox>～
                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txBorDateE" tabIndex="11" runat="server" Width="4em"
                                CssClass="DatePicker" MaxLength="7"></asp:textbox>
                        </div>
                    </div>
                </div>
                <div class="DivTable" id="GridTable">
                    <div class="dTR">
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 256px">
                                <asp:datagrid id="dg1" runat="server" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black" 
                                    BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" mPageSize="30">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="調案單號">
                                            <ItemTemplate>
                                                <asp:Label id="lbBorNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="文號">
                                            <ItemTemplate>
                                                <asp:Label id="lbDocNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="檔號">
                                            <ItemTemplate>
                                                <asp:Label id="lbFileNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="調案日期">
                                            <ItemTemplate>
                                                <asp:Label id="lbApplyDate" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="調案單位">
                                            <ItemTemplate>
                                                <asp:Label id="lbDept" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="調案人">
                                            <ItemTemplate>
                                                <asp:Label id="lbEmpName" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:datagrid>
                            </DIV>
                        </div>
                    </div>
                </div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
