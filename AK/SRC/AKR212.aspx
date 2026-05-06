
<%@ Page language="c#" Codebehind="AKR212.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR212" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>AKR212 已(將)逾期未歸檔公文提醒視窗</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<LINK href="LIB/AK.css" type="text/css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKR212" method="post" runat="server" onkeyup="jf_CheckFull();">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericSearch.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label1" runat="server" >承辦單位：</asp:label></div>
                        <div class="dTD" style="WIDTH: 10em">
                            <cc1:combobox id="dlDept" tabIndex="10" runat="server"  Width="7em" CssClass="comboBox"></cc1:combobox>
                            <asp:textbox id="H_Change" tabIndex="-1" runat="server" CssClass="hide" Width="16px"></asp:textbox></div>
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:label id="Label2" runat="server"  EnableViewState="False">承辦人：</asp:label></div>
                        <div class="dTD">
                            <cc1:combobox id="dlUser" tabIndex="15" runat="server"  Width="7em" CssClass="comboBox"></cc1:combobox>
                            <asp:textbox id="H_Value" tabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label3" runat="server" >應歸檔日期：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txSDate" CssClass="DatePicker" tabIndex="45" runat="server"  Width="4em" MaxLength="7"></asp:textbox>－ 
                            <asp:textbox id="txEDate" CssClass="DatePicker" tabIndex="55" runat="server"  Width="4em" MaxLength="7"></asp:textbox>
                            <asp:textbox id="H_Date" tabIndex="-1" runat="server" CssClass="hide" Width="27px"></asp:textbox>
                        </div>
                    </div>
                </div>
                <asp:listbox id="lbDept" runat="server" CssClass="hide"></asp:listbox>
                <div class="DivTable">
                    <div class="dTR">
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 289px">
                                <asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2" 
                                    BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White" PageSize="50">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="承辦單位">
                                            <ItemTemplate>
                                                <asp:Label id="lbDgDept" runat="server">Label</asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="承辦人">
                                            <ItemTemplate>
                                                <asp:Label id="lbEmpName" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="公文文號">
                                            <ItemTemplate>
                                                <asp:HyperLink id="hlDocNo" runat="server"></asp:HyperLink>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="應歸檔日期">
                                            <ItemTemplate>
                                                <asp:Label id="lbDueDate" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="目前所在位置">
                                            <ItemTemplate>
                                                <asp:Label id="lbPosition" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="主旨">
                                            <ItemTemplate>
                                                <asp:Label id="lbSubject" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:datagrid>
                            </DIV>
                        </div>
                    </div>
                </div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPush" runat="server" Text="進行稽催" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			</asp:Panel>
			<DIV id="lbToolTip" style="BORDER-RIGHT: black 1px solid; PADDING-RIGHT: 1px; BORDER-TOP: black 1px solid; DISPLAY: none; PADDING-LEFT: 1px; FONT-SIZE: x-small; Z-INDEX: 300; LEFT: 10px; PADDING-BOTTOM: 1px; BORDER-LEFT: black 1px solid; WIDTH: 40px; PADDING-TOP: 1px; BORDER-BOTTOM: black 1px solid; POSITION: absolute; TOP: 75px; HEIGHT: 22px; BACKGROUND-COLOR: infobackground" ms_positioning="FlowLayout"></DIV>
            <asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 520px" runat="server" CssClass="hidden"></asp:validationsummary>
        </form>
	</body>
</HTML>
