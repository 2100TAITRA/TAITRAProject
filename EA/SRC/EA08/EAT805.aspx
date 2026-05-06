<%@ Page language="c#" Codebehind="EAT805.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT805" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 
<HTML>
	<HEAD>
		<TITLE>EAT805 調檔權限依分類號設定作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT805" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:listbox id="lboxClsNoList" runat="server"></asp:listbox><asp:listbox id="lboxClsKeyList" runat="server"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
                <div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label1" runat="server" CssClass="KeyField">調案權限分隔年度：</asp:label>
                            <asp:textbox id="txYear" tabIndex="0" runat="server" Width="2em" CssClass="KeyUpperField" MaxLength="3"></asp:textbox>
                            <asp:label style="Z-INDEX: 0" id="Label5" runat="server" CssClass="KeyField">年</asp:label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label style="Z-INDEX: 0" id="Label6" runat="server">1.本年度前(含)依分類號管制權限</asp:label></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label style="Z-INDEX: 0" id="Label7" runat="server">2.本年度後依承辦組室管制權限</asp:label></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label style="Z-INDEX: 0" id="Label8" runat="server">3.例外分類號（不論年度一律採用分類號判斷）</asp:label></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label2" runat="server">分類號資訊：</asp:label></div>
                        <div class="dTD">
                            <asp:label id="Label9" runat="server">版本別</asp:label>
                            <asp:textbox style="IME-MODE: disabled" id="txVerNo" onkeypress="jf_InpNumOnly();" runat="server" Width="2em" MaxLength="3"></asp:textbox>
                            <asp:imagebutton id="ibVer" tabIndex="-1" runat="server" ImageUrl="template/images/HELPWIN_E.gif"></asp:imagebutton>
                            <asp:label id="Label10" runat="server">分類號</asp:label>
                            <asp:textbox style="IME-MODE: disabled" id="txFileCls" runat="server" Width="6em"></asp:textbox>
                            <asp:imagebutton id="ibCls" tabIndex="-1" runat="server" ImageUrl="template/images/HELPWIN_E.gif"></asp:imagebutton>
                            <asp:button id="btAdd" runat="server" Text="加入"></asp:button>
                        </div>
                    </div>
                </div>
                <div class="DivTable" id="GridTable">
                    <div class="dTR">
                        <div class="dTD">
                            <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                                <asp:Button ID="btSelectAll" runat="server" Text="全選"  />
                                <asp:Button ID="btSelectInverse" runat="server" Text="反向"  />
                                <asp:Button ID="btSelectClear" runat="server" Text="清除"  />
                                <asp:Button ID="btDeleteSelected" runat="server" Text="刪除"  />
                            </asp:Panel>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 357px">
                                <asp:datagrid id="dg1" runat="server" BackColor="White" BorderStyle="None"
                                    BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="5">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="選">
                                            <ItemTemplate>
                                                <asp:CheckBox id="cbSelect" runat="server"></asp:CheckBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="版別-分類號(含下層分類號)">
                                            <ItemTemplate>
                                                <asp:Label ID="lbVerCls" Runat="server" CssClass="TextLabel" Width="15em"></asp:Label>
                                                <asp:Label ID="lbClsKey" Runat="server" CssClass="hide"></asp:Label>
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
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			</asp:Panel>
        </FORM>
	</BODY>
</HTML>
