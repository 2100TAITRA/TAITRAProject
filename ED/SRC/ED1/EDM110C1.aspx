<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDM110C1.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDM110C1" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDM110C1 公文流程文件盒查詢子視窗</TITLE>
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
		<FORM id="EDM110C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:textbox id="SectCode" tabIndex="-1" runat="server" Width="20px" ></asp:textbox><asp:textbox id="HaveSubUnit" tabIndex="-1" runat="server" Width="20px" ></asp:textbox><asp:textbox id="FlowType" tabIndex="-1" runat="server" Width="20px" ></asp:textbox><asp:textbox id="FolderBox" tabIndex="-1" runat="server" Width="20px" ></asp:textbox><asp:textbox id="SubFolderBox" tabIndex="-1" runat="server" Width="20px" ></asp:textbox><asp:textbox id="TxRuleBox" tabIndex="-1" runat="server" Width="20px" ></asp:textbox><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label1" runat="server">簽核類型：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlSignType" runat="server">
                                <asp:ListItem></asp:ListItem>
                                <asp:ListItem Value="P">紙本簽核</asp:ListItem>
                                <asp:ListItem Value="E">線上簽核</asp:ListItem>
                            </asp:dropdownlist>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label2" runat="server">主文件盒：</asp:label></div>
                        <div class="dTD" style="WIDTH: 17em">
                            <cc1:combobox id="cbFolder" runat="server" CssClass="comboBox" Width="6em"></cc1:combobox></div>
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label5" runat="server">子文件盒：</asp:label></div>
                        <div class="dTD" style="WIDTH: 10em">
                            <cc1:combobox id="cbSubFolder" runat="server" CssClass="comboBox" Width="7.5em"></cc1:combobox></div>
                        <div class="dTDTitle" style="WIDTH: 4.5em">
                            <asp:label id="Label6" runat="server">異動別：</asp:label></div>
                        <div class="dTD" style="WIDTH: 7em">
                            <cc1:combobox id="cbTxname" runat="server" CssClass="comboBox" Width="6em"></cc1:combobox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label3" runat="server">傳送對象：</asp:label></div>
                        <div class="dTD" style="WIDTH: 17em">
                            <asp:textbox id="txToOu" tabIndex="0" runat="server" MaxLength="4"></asp:textbox>
                            <asp:imagebutton id="btFindOu" tabIndex="0" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:imagebutton></div>
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label7" runat="server">啟用狀態：</asp:label></div>
                        <div class="dTD">
                            <asp:radiobuttonlist id="rlStartState" runat="server" RepeatDirection="Horizontal">
                                <asp:ListItem Value="2" Selected="True">全部</asp:ListItem>
                                <asp:ListItem Value="1">啟用</asp:ListItem>
                                <asp:ListItem Value="0">停用</asp:ListItem>
                            </asp:radiobuttonlist>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label4" runat="server">適用類型：</asp:label></div>
                        <div class="dTD" style="WIDTH: 17em">
                            <asp:dropdownlist id="dlRuleType" runat="server" Width="16em"></asp:dropdownlist></div>
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label9" runat="server">適用單位：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlOwnDept" runat="server" Width="9em"></asp:dropdownlist>
                            <asp:dropdownlist id="dlOwnSect" runat="server" Width="9em"></asp:dropdownlist></div>
                    </div>
                </div>
                <div class="DivTable" id="GridTable">
                    <div class="dTR">
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 221px">
                                <asp:datagrid id="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="簽核類型">
                                            <ItemTemplate>
                                                <asp:Label id="lbSignType" runat="server" Width="5.5em"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="主文件盒">
                                            <ItemTemplate>
                                                <asp:HyperLink id="hlFolder" tabIndex="0" runat="server" Width="5.5em"></asp:HyperLink>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="子文件盒">
                                            <ItemTemplate>
                                                <asp:Label id="lbSubFolder" runat="server" Width="5.5em"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="異動別">
                                            <ItemTemplate>
                                                <asp:Label id="lbTxName" runat="server" Width="5.5em"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="傳送對象">
                                            <ItemTemplate>
                                                <asp:Label id="lbTOOUID" runat="server" Width="10em"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="適用類型">
                                            <ItemTemplate>
                                                <asp:Label id="lbRuleType" runat="server" Width="5.5em"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="適用單位">
                                            <ItemTemplate>
                                                <asp:Label id="lbOwnOu" runat="server" Width="5.5em"></asp:Label>
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
				<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
        </FORM>
	</BODY>
</HTML>
