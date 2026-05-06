<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODM510.aspx.cs" AutoEventWireup="false" Inherits="OD.ODM510" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODM510 線上簽核回閱設定檔</title>
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
		<form id="ODM500" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 101; POSITION: absolute; TOP: 102px; LEFT: 10px"
				runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
                <div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTD">
                            <asp:Label id="Label1" runat="server">線上簽核回閱設定</asp:Label>
                        </div>
                    </div>
                </div>
                <div class="DivTable">
                    <div class="dTR">
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 380px;">
                                <asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical"
                                    CellPadding="2" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSeq" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="簽辦公文類型">
                                            <ItemTemplate>
                                                <asp:Label id="lbFolderSubfolder" runat="server"></asp:Label>
                                                <asp:TextBox id="txFolder" tabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                                <asp:TextBox id="txSUbFolder" tabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="回閱">
                                            <ItemTemplate>
                                                <asp:RadioButton id="rbResignY" runat="server" GroupName="RESIGN_SET" Text="勾選"></asp:RadioButton>
                                                <asp:RadioButton id="rbResignN" runat="server" GroupName="RESIGN_SET" Text="不勾選"></asp:RadioButton>
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
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<DIV id="lbToolTip" style="Z-INDEX: 105; BORDER-BOTTOM: black 1px solid; POSITION: absolute; BORDER-LEFT: black 1px solid; PADDING-BOTTOM: 1px; BACKGROUND-COLOR: infobackground; PADDING-LEFT: 1px; WIDTH: 40px; PADDING-RIGHT: 1px; DISPLAY: none; HEIGHT: 22px; FONT-SIZE: x-small; BORDER-TOP: black 1px solid; TOP: 75px; BORDER-RIGHT: black 1px solid; PADDING-TOP: 1px; LEFT: 10px"
				ms_positioning="FlowLayout"></DIV>
			<asp:customvalidator id="Validator" style="Z-INDEX: 103; POSITION: absolute; TOP: 218px; LEFT: 12px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
            <asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 104; POSITION: absolute; TOP: 252px; LEFT: 12px"
				runat="server" CssClass="hidden"></asp:validationsummary>
        </form>
	</body>
</HTML>
