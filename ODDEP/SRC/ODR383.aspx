<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODR383.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR383" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR383 地址標籤列印作業</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<LINK href="LIB/AK.css" type="text/css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
        <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="ODR383" method="post" runat="server" onkeyup="jf_CheckFull();">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 101; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
                <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
                <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
			<div class="DivBaseTable" id="BaseTable">
                <div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:Label id="Label3" runat="server" CssClass="RequireField">郵寄批號：</asp:Label></div>
                        <div class="dTD">
                            <asp:TextBox id="txPostSeq" runat="server" CssClass="RequireField" Width="5.5em" MaxLength="10"></asp:TextBox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:Label id="Label1" runat="server" CssClass="RequireField">郵寄日期：</asp:Label></div>
                        <div class="dTD">
                            <asp:TextBox id="txPostDate" runat="server" CssClass="RequireField" Width="4em" MaxLength="7" tabIndex="10"></asp:TextBox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:label id="Label7" runat="server"  Width="80px">郵寄時間：</asp:label></div>
                        <div class="dTD">
                            <asp:TextBox id="txSTime" tabIndex="10" runat="server"  MaxLength="4" Width="2.5em"></asp:TextBox>
                            <asp:label id="Label6" runat="server" >－</asp:label>
                            <asp:TextBox id="txETime" tabIndex="10" runat="server"  MaxLength="4" Width="2.5em"></asp:TextBox>
                            <asp:DropDownList id="dlTime" tabIndex="10" runat="server"  Width="8em"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:Label id="Label2" runat="server">報表格式：</asp:Label></div>
                        <div class="dTD">
                            <asp:RadioButton id="rb1" runat="server" Text="直式" GroupName="gn"></asp:RadioButton>
                            <asp:RadioButton id="rb2" runat="server" Text="橫式" GroupName="gn"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">&nbsp;</div>
                        <div class="dTD">由<asp:TextBox id="txPositionNo" runat="server" Width="1.5em" MaxLength="2" tabIndex="20"></asp:TextBox>號位置起</div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:Label id="lbRange" runat="server">列印範圍：</asp:Label></div>
                        <div class="dTD">
                            <asp:RadioButton id="rbAll" runat="server" GroupName="PrintRange" Text="全部"></asp:RadioButton></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">&nbsp;</div>
                        <div class="dTD">
                            <asp:RadioButton id="rbUser" runat="server" GroupName="PrintRange" Text="指定彙整人"></asp:RadioButton>&nbsp;&nbsp;
                            <asp:TextBox id="txUser" runat="server" Width="5em"></asp:TextBox></div>
                    </div>
                </div>
                <div class="DivTable">
                    <div class="dTR">
                        <div class="dTD">
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:button id="btSelectAll" tabIndex="30" runat="server" Text=" 全選 "></asp:button></div>
                                <div class="dTD">
                                    <asp:button id="btReverse" tabIndex="40" runat="server" Text=" 反向 "></asp:button></div>
                            </div>
                            <DIV class="GridDiv" style="HEIGHT: 330px">
                                <asp:datagrid id="dg1" runat="server" GridLines="Vertical" CellPadding="4" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White" PageSize="20" AutoGenerateColumns="False" Height="2px">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSeq" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="註">
                                            <ItemTemplate>
                                                <asp:CheckBox id="ck1" runat="server"></asp:CheckBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="受文機關<BR>郵遞區號／地址">
                                            <ItemTemplate>
                                                <asp:TextBox id="txOrgId" runat="server" CssClass="TextLabel" Width="5.5em"></asp:TextBox>
                                                <asp:TextBox id="txOrgName" runat="server" CssClass="TextLabel"></asp:TextBox><BR>
                                                <asp:TextBox id="txPostCode" runat="server" CssClass="TextLabel" Width="4em"></asp:TextBox>
                                                <asp:TextBox id="txAddress" runat="server" CssClass="TextLabel" Width="24em"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="郵寄方式">
                                            <ItemTemplate>
                                                <asp:TextBox id="txPostName" runat="server" CssClass="TextLabel"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="公文文號或非公文郵寄項目編號">
                                            <ItemTemplate>
                                                <asp:TextBox id="txDocNo" runat="server" CssClass="PopUp"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:datagrid>
                            </DIV>
                        </div>
                    </div>
                </div>
			</div>
			<DIV id="lbToolTip" style="BORDER-RIGHT: black 1px solid; PADDING-RIGHT: 1px; BORDER-TOP: black 1px solid; DISPLAY: none; PADDING-LEFT: 1px; FONT-SIZE: x-small; Z-INDEX: 300; LEFT: 10px; PADDING-BOTTOM: 1px; BORDER-LEFT: black 1px solid; WIDTH: 40px; PADDING-TOP: 1px; BORDER-BOTTOM: black 1px solid; POSITION: absolute; TOP: 75px; HEIGHT: 22px; BACKGROUND-COLOR: infobackground" ms_positioning="FlowLayout"></DIV>
			<asp:customvalidator id="Validator" style="Z-INDEX: 103; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
        </form>
	</body>
</HTML>
