<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="IFM300C4.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM300C4" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>IFM300C4 特定調檔權限設定子視窗</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="IFM300C4" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label1" runat="server" >機關：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlOrgno" runat="server" Width="10em" AutoPostBack="True"></asp:dropdownlist></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label2" runat="server">可調閱單位：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlDept" runat="server" Width="10em" AutoPostBack="True"></asp:dropdownlist></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label3" runat="server">可調閱科別：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlSect" runat="server" Width="10em" AutoPostBack="True"></asp:dropdownlist></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label4" runat="server">可調閱人員：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlAccount" runat="server" Width="10em"></asp:dropdownlist>
                            <asp:button id="btjoin" runat="server" Text="加入"></asp:button></div>
                    </div>
                </div>
                <asp:textbox id="DGINDEX" runat="server" Width="1px" Height="1px" CssClass="hide"></asp:textbox>
                <div class="DivTable">
                    <div class="dTR">
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 195px">
                                <asp:datagrid id="dg1" runat="server" Height="20px" BackColor="White" BorderStyle="None"
                                    BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False" PageSize="50">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSeq" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="機關">
                                            <ItemTemplate>
                                                <asp:Label id="lbOrgNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="單位">
                                            <ItemTemplate>
                                                <asp:Label id="lbDeptNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="科別">
                                            <ItemTemplate>
                                                <asp:Label id="lbUnitNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="人員">
                                            <ItemTemplate>
                                                <asp:Label id="lbEmpNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="設定">
                                            <ItemTemplate>
                                                <asp:Button id="btdelete" runat="server" Text="刪除"></asp:Button>
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
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
                <asp:Button ID="btClose" runat="server" Text="關閉(C)" accesskey="C" title="關閉(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
			<asp:TextBox style="Z-INDEX: 102; LEFT: 528px; POSITION: absolute; TOP: 440px" id="H_UserName"
				runat="server" CssClass="hide"></asp:TextBox>
        </FORM>
	</BODY>
</HTML>
