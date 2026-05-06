<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAT807.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT807" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT807 分類號使用單位設定作業</TITLE>
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
		<FORM id="EAT807" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
                <asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
                <asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
                <asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="h_OrgNo" runat="server" CssClass="hide" ></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label id="Label1" runat="server">版本別：</asp:label></DIV>
						<DIV class="dTD" style="width: 12em; ">
							<asp:textbox id="txVerNo" runat="server" Width="2em" MaxLength="3" CssClass="DisplayOnly" ReadOnly="true"></asp:textbox>
						</DIV>
                        <DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label2" runat="server" >啟用日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 22em; ">
							<asp:textbox id="txStartDate" runat="server" Width="4.5em" MaxLength="7" CssClass="DisplayOnly" ReadOnly="true"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label id="Label3" runat="server" >最底層分類號：</asp:label></DIV>
						<DIV class="dTD" style="width: 40em; ">
                            <asp:textbox id="txClsNo" runat="server" Width="12.5em" MaxLength="20" ></asp:textbox>
							<asp:textbox id="h_ClsKey" runat="server" CssClass="hide" ></asp:textbox>
							<asp:textbox id="h_ClsLvl" runat="server" CssClass="hide" ></asp:textbox>
                            <asp:label id="lbClsName" runat="server" ></asp:label>
						</DIV>
					</DIV>
                    <DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label id="Label5" runat="server" >上層分類號：</asp:label></DIV>
						<DIV class="dTD" style="width: 12em; ">
                            <asp:label id="lbUpperClsNo" runat="server" ></asp:label>&nbsp;
							<asp:textbox id="txUpperClsLvlKey" runat="server" class="hide"></asp:textbox>
						</DIV>
                        <DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label7" runat="server">名稱：</asp:label></DIV>
						<DIV class="dTD" style="width: 22em; ">
							<asp:label id="lbUpperClsName" runat="server" ></asp:label>&nbsp;
						</DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
							<asp:Button ID="btSelectClear" runat="server" Text="清除" />
						</asp:Panel>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class = "GridDiv" style="HEIGHT: 156px;">
								<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="99">
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
										<asp:TemplateColumn HeaderText="使用單位">
											<ItemTemplate>
												<asp:Label id="lbDeptName" runat="server"></asp:Label>
												<asp:textbox id="h_DeptNo" CssClass="hide" runat="server"></asp:textbox>
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
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
                <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
