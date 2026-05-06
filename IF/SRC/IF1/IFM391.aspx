<%@ Page language="c#" Codebehind="IFM391.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM391" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>IFM391 個人章戳維護作業</TITLE>
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
		<FORM id="IFM391" onkeyup="jf_CheckFull();" method="post" runat="server">
			<OBJECT id="Gtf" style="DISPLAY: none" classid="CLSID:934ECA2D-3841-4A0C-9344-7906B979A4BE"
				VIEWASTEXT>
			</OBJECT>
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="h_txSignetBox" runat="server"></asp:textbox>
				<asp:textbox id="h_txDefSignetBox" runat="server"></asp:textbox>
				<asp:textbox id="h_txFilePath" runat="server"></asp:textbox>
				<asp:textbox id="h_FileIOWS" runat="server"></asp:textbox>
				<asp:textbox id="h_OrgNo" runat="server"></asp:textbox>
			</DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle"><asp:label id="Label1" runat="server">帳　　號：</asp:label></DIV>
						<div class="dTD" style ="Width:11em;"><asp:textbox id="txAccount" tabIndex="10" runat="server" Width="10.5em" CssClass="KeyUpperField"></asp:textbox></DIV>
						<div class="dTDTitle"><asp:label id="Label2" runat="server">預設職名章：</asp:label></DIV>
						<div class="dTD">
                            <asp:dropdownlist id="ddlSign" runat="server"></asp:dropdownlist>
                            <asp:CheckBox ID="cbBlankStamp" runat="server" Text="含空白職名章"></asp:CheckBox>
                        </DIV>
					</DIV>
					<div class="dTR">
						<div class="dTD">
							<asp:panel id="panel2" Runat="server">
								<FIELDSET id="newSignPlace" style="WIDTH: 45em;"><LEGEND>新增章戳區</LEGEND>
									<div class="DivTable">
										<div class="dTR">
											<div class="dTDTitle" style ="Width:5em;"><asp:label id="Label3" runat="server">群組名稱：</asp:label></div>
											<div class="dTD" style ="Width:8em;"><asp:textbox id="txGroupName" runat="server" Width="7.5em"></asp:textbox></DIV>
											<div class="dTDTitle" style ="Width:5em;"><asp:label id="Label4" runat="server">章戳名稱：</asp:label></DIV>
											<div class="dTD" style ="Width:8em;"><asp:textbox id="txStampName" runat="server" Width="7.5em"></asp:textbox></DIV>
											<div class="dTDTitle" style ="Width:5em;"><asp:label id="Label5" runat="server">關聯動作：</asp:label></DIV>
											<div class="dTD">
												<asp:dropdownlist id="ddlRelatedAct" runat="server" Width="13.5em">
													<asp:ListItem Value="無" Selected="True">無</asp:ListItem>
													<asp:ListItem Value="核決(存查)">核決(存查)</asp:ListItem>
													<asp:ListItem Value="核決(存查並發送電子郵件)">核決(存查並發送電子郵件)</asp:ListItem>
													<asp:ListItem Value="核決(機關發文)">核決(機關發文)</asp:ListItem>
													<asp:ListItem Value="核決(單位發文)">核決(單位發文)</asp:ListItem>
													<asp:ListItem Value="退文">退文</asp:ListItem>
												</asp:dropdownlist>
											</DIV>
										</DIV>
										<div class="dTR">
											<div class="dTD">
												<DIV class="dTD" ><INPUT id="txFilePath" accept=".png,.tif,.jpg,.bmp" type="file" style="WIDTH: 11em; HEIGHT:2em;" tabIndex="1" size="9" name="txFilePath" runat="server"></DIV>
												<asp:button id="btNLoadNew" runat="server" Text="由影像檔新增"></asp:button>
												<asp:button id="btNNewSig" runat="server" Text="產生並預覽"></asp:button>
											</DIV>
										</div>
										<div class="dTR">
											<div class="dTD" style ="Width:13em;">
												<div class="dTDTitle" style ="Width:5em;"><asp:label id="Label6" runat="server">章戳內容：</asp:label></DIV>
												<div class="dTD" style ="Width:8em;"><asp:textbox id="txStampContent" runat="server" Width="7.5em" TextMode="MultiLine" height="4em"></asp:textbox></DIV>
											</div>
											<div class="dTD">
												<div class="dTR">
													<div class="dTDTitle" style ="Width:5em;"><asp:label id="Label7" runat="server">字型：</asp:label></DIV>
													<div class="dTD" style ="Width:8em;">
														<asp:dropdownlist id="ddlWordType" runat="server" Width="5.5em">
															<asp:ListItem Value="標楷體" Selected="True">標楷體</asp:ListItem>
															<asp:ListItem Value="新細明體">新細明體</asp:ListItem>
															<asp:ListItem Value="細明體">細明體</asp:ListItem>
														</asp:dropdownlist>
													</DIV>
													<div class="dTDTitle" style ="Width:5em;"><asp:label id="Label8" runat="server">方向：</asp:label></DIV>
													<div class="dTD">
														<asp:dropdownlist id="ddlDirection" runat="server" Width="5.5em">
															<asp:ListItem Value="1" Selected="True">橫式章戳</asp:ListItem>
															<asp:ListItem Value="2">直式章戳</asp:ListItem>
														</asp:dropdownlist>
													</DIV>
												</DIV>
												<div class="dTR">
													<div class="dTDTitle" style ="Width:5em;"><asp:label id="Label10" runat="server">顏色：</asp:label></DIV>
													<div class="dTD" style ="Width:8em;">
														<asp:dropdownlist id="ddlColor" runat="server" Width="5.5em">
															<asp:ListItem Value="紅色" Selected="True">紅色</asp:ListItem>
															<asp:ListItem Value="藍色">藍色</asp:ListItem>
															<asp:ListItem Value="黑色">黑色</asp:ListItem>
														</asp:dropdownlist>
													</DIV>
													<div class="dTDTitle" style ="Width:5em;"><asp:label id="Label11" runat="server">大小：</asp:label></DIV>
													<div class="dTD">
														<asp:dropdownlist id="ddlSize" runat="server" Width="5.5em">
															<asp:ListItem Value="10" Selected="True">10</asp:ListItem>
															<asp:ListItem Value="12">12</asp:ListItem>
															<asp:ListItem Value="14">14</asp:ListItem>
															<asp:ListItem Value="16">16</asp:ListItem>
															<asp:ListItem Value="18">18</asp:ListItem>
															<asp:ListItem Value="20">20</asp:ListItem>
															<asp:ListItem Value="24">24</asp:ListItem>
															<asp:ListItem Value="28">28</asp:ListItem>
															<asp:ListItem Value="36">36</asp:ListItem>
														</asp:dropdownlist>
													</DIV>
												</DIV>
												<div class="dTR">
													<div class="dTDTitle" style ="Width:5em;"><asp:label id="Label13" runat="server">樣式：</asp:label></DIV>
													<div class="dTD" style ="Width:8em;">
														<asp:dropdownlist id="ddlStyle" runat="server" Width="5.5em">
															<asp:ListItem Value="普通" Selected="True">普通</asp:ListItem>
															<asp:ListItem Value="斜體">斜體</asp:ListItem>
															<asp:ListItem Value="粗體">粗體</asp:ListItem>
															<asp:ListItem Value="粗斜體">粗斜體</asp:ListItem>
														</asp:dropdownlist>
													</DIV>
												</DIV>
											</div>
										</div>
									</div>
								</FIELDSET>
							</asp:panel>
						</DIV>
					</DIV>
				</DIV>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<asp:Panel ID="dgTool" CssClass="DgSelectToolBar" runat="server">
								<asp:Button ID="btUp" runat="server" Text="上移"/>
								<asp:Button ID="btDown" runat="server" Text="下移"/>
							</asp:Panel>
						</div>
					</div>
					<div class="dTR">
						<div class="dTD">
							<div class="GridDiv" style="HEIGHT: 227px"><asp:datagrid id="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="50" AutoGenerateColumns="False">
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
										<asp:TemplateColumn HeaderText="群組">
											<ItemTemplate>
												<asp:Label id="lbGroupName" runat="server"></asp:Label>
												<asp:Label id="lbGroupID" runat="server" CssClass="hide"></asp:Label>
												<asp:TextBox id="H_txGroupID" runat="server" CssClass="hide"></asp:TextBox>
												<asp:TextBox id="H_txGroupName" runat="server" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="章戳名稱">
											<ItemTemplate>
												<asp:Label id="lbStampName" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="內容">
											<ItemTemplate>
												<asp:Label id="lbContent" runat="server"></asp:Label>
												<asp:TextBox id="h_Stamp" TextMode="MultiLine" runat="server" CssClass = "hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="關聯動作">
											<ItemTemplate>
												<asp:dropdownlist id="ddlRelatedAct" runat="server" Width="13.5em">
													<asp:ListItem Value="無" Selected="True">無</asp:ListItem>
													<asp:ListItem Value="核決(存查)">核決(存查)</asp:ListItem>
													<asp:ListItem Value="核決(存查並發送電子郵件)">核決(存查並發送電子郵件)</asp:ListItem>
													<asp:ListItem Value="核決(機關發文)">核決(機關發文)</asp:ListItem>
													<asp:ListItem Value="核決(單位發文)">核決(單位發文)</asp:ListItem>
													<asp:ListItem Value="退文">退文</asp:ListItem>
												</asp:dropdownlist>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="可用文別">
											<ItemTemplate>
												<asp:Button id="btSetCateList" runat="server" Text="設定"></asp:Button>
												<asp:TextBox id="h_CateList" runat="server" CssClass = "hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="預覽章戳">
											<ItemTemplate>
												<asp:Button id="btViewSig" runat="server" Text="預覽"></asp:Button>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="刪除章戳">
											<ItemTemplate>
												<asp:Button id="btDeleteSig" runat="server" Text="刪除"></asp:Button>
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
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
