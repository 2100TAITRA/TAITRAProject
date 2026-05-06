<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAT808.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT808" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT808 批次分類號使用單位設定作業</TITLE>
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
		<FORM id="EAT808" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="H_ISLOWEST" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
                <asp:textbox id="H_CLSKEY" style="IME-MODE: disabled" tabIndex="3" runat="server" ></asp:textbox>
                <asp:textbox id="H_CLSLV" style="IME-MODE: disabled" tabIndex="3" runat="server" ></asp:textbox>
				<asp:textbox id="txOrgNo" style="IME-MODE: disabled" tabIndex="3" runat="server" ></asp:textbox>
				<asp:textbox id="H_CLSNAME" style="IME-MODE: disabled" tabIndex="3" runat="server" ></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
                    <DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label id="Label5" runat="server">版本別：</asp:label>
                        </DIV>
                        <DIV class="dTD">
							<asp:textbox id="txVerNo" tabIndex="2" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="3" ReadOnly="true"></asp:textbox>
                        </DIV>
                        <DIV class="dTDTitle">
                            <asp:label id="Label3" runat="server">啟用日期：</asp:label>
                        </DIV>
                        <DIV class="dTD">
                            <asp:textbox id="txStartDate" tabIndex="2" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="3" ReadOnly="true"></asp:textbox>
                        </DIV>
                     </DIV>
                      <DIV class="dTR">
                          <DIV class="dTDTitle">
							<asp:label id="Label6" runat="server">分類號：</asp:label>
                          </DIV>
                          <DIV class="dTD">
							<asp:textbox id="txFileCls" tabIndex="3" runat="server" Width="10.5em" MaxLength="20"></asp:textbox>
							<asp:imagebutton id="ibCls" tabIndex="-1" runat="server" CssClass="hide" ImageUrl="template/images/HELPWIN_E.gif"></asp:imagebutton>
                          </DIV>
					</DIV>
					  <DIV class="dTR">
                          <DIV class="dTDTitle">
							<asp:label id="Label1" runat="server">類目名：</asp:label>
                          </DIV>
                          <DIV class="dTD">
							<asp:label id="lbClassName" Width="10em" runat="server"></asp:label>
                          </DIV>
					</DIV>
                </DIV>
				<DIV id="GridTable" class="DivTable">
                    <DIV class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
							<asp:Button ID="btSelectClear" runat="server" Text="清除" />
						</asp:Panel>
					</DIV>
					<DIV style="HEIGHT: 30em;" class="GridDiv">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="9">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="選">
													<ItemTemplate>
														<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
                                                        <asp:textbox id="H_txDeptno" CssClass="hide" Width="2em" tabIndex="0" runat="server"></asp:textbox>
													</ItemTemplate>
												</asp:TemplateColumn>
								<asp:TemplateColumn ItemStyle-HorizontalAlign="Center" HeaderText="單位名稱">
									<ItemTemplate>
										<asp:label id="lableUnit" runat="server"></asp:label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
                </DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="批次設定" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
