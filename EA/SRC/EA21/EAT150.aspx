<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAT150.aspx.cs" AutoEventWireup="false" Inherits="EA21.EAT150" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT150 附件抽存歸檔註記作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT150" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5em; "><asp:label id="Label1" runat="server" CssClass="KeyField" >公文文號：</asp:label></DIV>
						<DIV class="dTD" style="width: 29em; ">
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txDocNo" tabIndex="1" runat="server" Width="8.5em" MaxLength="10" ForeColor="Red"></asp:textbox>
							<asp:button id="btCheckDocNo" tabIndex="2" runat="server" Text="帶出公文基資"></asp:button>
							<asp:dropdownlist id="dlMediaType" runat="server" CssClass="hide"></asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5em; "><asp:label id="Label9" runat="server" >主旨：</asp:label></DIV>
						<DIV class="dTD" style="width: 29em; "><asp:textbox id="txFromSubject" tabIndex="0" runat="server" Width="28.5em" CssClass="DisplayOnly" MaxLength="300" ></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5em; "><asp:label id="Label2" runat="server" >承辦單位：</asp:label></DIV>
						<DIV class="dTD" style="width: 29em; ">
							<asp:textbox id="txDeptName" runat="server" Width="11.5em" CssClass="DisplayOnly" MaxLength="20" ></asp:textbox>
							<asp:textbox id="txHiddenTemp" runat="server" Width="6.5em" CssClass="hide" ></asp:textbox>
							<asp:checkbox id="cbDesFlag" tabIndex="7" runat="server" CssClass="hide" Text="已遺失"></asp:checkbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5em; "><asp:label id="Label3" runat="server" Width="8.5em" >承辦人：</asp:label></DIV>
						<DIV class="dTD" style="width: 19em; "><asp:textbox id="txEmpName" runat="server" Width="11.5em" CssClass="DisplayOnly" MaxLength="20" ></asp:textbox><asp:textbox id="txTempDate" runat="server" Width="5.5em" CssClass="hide"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width: 5em; "><asp:label id="Label6" runat="server" Width="6.5em" >結案日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 5em; "><asp:textbox id="txCloseDate" tabIndex="0" runat="server" Width="4.5em" CssClass="DisplayOnly" MaxLength="7" ></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5em; "><asp:label id="Label8" runat="server" >備註：</asp:label></DIV>
						<DIV class="dTD" style="width: 29em; "><asp:textbox id="txTxDesc" tabIndex="8" runat="server" Width="28.5em" MaxLength="30"></asp:textbox></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class = "GridDiv" style="HEIGHT: 157px;">
								<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server" Width="22px" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="歸檔">
											<ItemTemplate>
												<asp:CheckBox id="cb1" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="遺失">
											<ItemTemplate>
												<asp:CheckBox id="cb2" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="歸檔日期">
											<ItemTemplate>
												<asp:TextBox id="txFDate" runat="server" Width="4.5em" CssClass="DatePicker"></asp:TextBox>
												<asp:TextBox id="H_txFDate" runat="server" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="預計歸檔日期">
											<ItemTemplate>
												<asp:TextBox id="txDgExtFileDate" runat="server" Width="4.5em" CssClass="DatePicker"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="附件名稱">
											<ItemTemplate>
												<asp:Label id="lbFileDesc" runat="server" Width="150px" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="媒體形式">
											<ItemTemplate>
												<asp:Label id="lbMediaType" runat="server" Width="80px"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="數量">
											<ItemTemplate>
												<asp:Label id="lbFileCnt" runat="server" Width="50px" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="單位">
											<ItemTemplate>
												<asp:Label id="lbFileUnit" runat="server" Width="50px"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="歸檔否">
											<ItemTemplate>
												<asp:Label id="lbIsend" runat="server" Width="50px"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
