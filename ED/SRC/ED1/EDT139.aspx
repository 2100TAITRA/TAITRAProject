<%@ Page language="c#" Codebehind="EDT139.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDT139" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDT139 來文參考檔案上傳作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="/STDN/Lib/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDT139" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:TextBox id="txWS" runat="server" Width="8px" Height="1px"></asp:TextBox><asp:TextBox id="txFilePath" runat="server" Width="8px" Height="1px"></asp:TextBox><asp:TextBox id="txFileName" runat="server" Width="8px" Height="1px"></asp:TextBox>
				<asp:TextBox id="txPath" runat="server" Width="8px" Height="2px"></asp:TextBox>
				<asp:TextBox id="txDelSeq" runat="server" Width="8px" Height="2px"></asp:TextBox></DIV>
				<asp:TextBox ID="H_AttachDel" runat="server" CssClass="hide"></asp:TextBox>
				<asp:TextBox ID="H_AttachInf" runat="server" CssClass="hide"></asp:TextBox>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="width: 6em;"><asp:label id="lbDocNo" runat="server" CssClass="KeyField">公文文號：</asp:label></DIV>
						<div class="dTD" style="width: 30em;"><asp:textbox id="txDocNo" style="IME-MODE: disabled" tabIndex="0" runat="server" Width="6em"
								CssClass="KeyUpperField" MaxLength="10"></asp:textbox></DIV>
					</DIV>
					<div class="dTR" id="rowFilePath" runat="server">
						<div class="dTDTitle" style="width: 6em;"><asp:label id="lbAttach" runat="server" >檔案路徑：</asp:label></DIV>
						<div class="dTD" style="width: 30em;">
							<input type="file" id="txAttach" Width="18em"/>
							<asp:button id="btUpLoad" runat="server" Text="上傳檔案" Enabled="False"></asp:button>
						</DIV>
					</DIV>
					<div class="dTR" id="rowFileDesc" runat="server">
						<div class="dTDTitle" style="width: 6em;"><asp:label id="lbAttachDesc" runat="server" >檔案說明：</asp:label></DIV>
						<div class="dTD" style="width: 30em;"><asp:textbox id="txAttachDesc" tabIndex="0" runat="server" Width="18em" 
								CssClass="DisplayOnly" MaxLength="50" ReadOnly="True"></asp:textbox></DIV>
					</DIV>
				</DIV>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<asp:label id="lbAttList" runat="server" CssClass="hide">上傳附件如下：</asp:label>
						</DIV>
					</DIV>
					<div class="dTR">
						<div class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 279px">
								<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="刪">
											<ItemStyle HorizontalAlign="Center"></ItemStyle>
											<ItemTemplate>
												<asp:Button id="btDgdel" runat="server" Text="刪除" onClientclick="fnDeleteAttachItem()" ></asp:Button>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="檔案名稱">
											<ItemTemplate>
												<asp:HyperLink id="lbFileName" runat="server" ></asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="檔案說明">
											<ItemTemplate>
												<asp:Label id="lbAttDesc" runat="server" ></asp:Label>
												<asp:Label id="lbSEQ" runat="server" CssClass="hide" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="加入人員">
											<ItemTemplate>
												<asp:Label id="lbUpdUser" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="加入時間">
											<ItemTemplate>
												<asp:Label id="lbUpdTime" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="確認" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
