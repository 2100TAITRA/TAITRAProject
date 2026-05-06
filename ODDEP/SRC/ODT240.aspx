<%@ Page language="c#" Codebehind="ODT240.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT240" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>ODT240 併案公文批次設定作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body class="hidden" MS_POSITIONING="GridLayout">
		<form id="ODT240" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:textbox id="txHComInfo" runat="server" EnableViewState="False"></asp:textbox><asp:textbox id="txHRemoveCom" runat="server" EnableViewState="False"></asp:textbox><asp:textbox id="H_RcvProperty" runat="server" EnableViewState="False"></asp:textbox><asp:textbox id="H_IssueProperty" runat="server" EnableViewState="False"></asp:textbox><asp:textbox id="H_RtnRcvProperty" runat="server"  EnableViewState="False"></asp:textbox><asp:textbox id="H_RtnIssueProperty" runat="server" EnableViewState="False"></asp:textbox></DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em" colSpan="1" rowSpan="1"><asp:label class="KeyField" id="Label1" runat="server" EnableViewState="False">母文號:</asp:label></div>
						<div class="dTD" style="WIDTH: 21em"><asp:textbox class="KeyUpperField" id="txDocNo" tabIndex="10" runat="server" Width="7.5em" EnableViewState="False" MaxLength="15"> 123456789012345</asp:textbox></div>
						<div class="dTDTitle" style="WIDTH: 7em"><asp:label class="RequireField" id="Label4" style="DISPLAY: none" runat="server" EnableViewState="False">併案關係:</asp:label></div>
						<div class="dTD" style="WIDTH: 17em">
							<asp:dropdownlist id="dlCombineType" style="DISPLAY: none" tabIndex="20" runat="server" EnableViewState="False">
								<asp:ListItem Selected="True"></asp:ListItem>
								<asp:ListItem Value="1">併辦</asp:ListItem>
								<asp:ListItem Value="2">彙辦</asp:ListItem>
								<asp:ListItem Value="3">併案陳核</asp:ListItem>
							</asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em"><asp:label class="RequireField" id="Label2" runat="server" EnableViewState="False">分類號:</asp:label></div>
						<div class="dTD" style="WIDTH: 21em">
							<asp:textbox class="RequireField" id="txClsNo" tabIndex="30" runat="server" Width="7.5em" EnableViewState="False" MaxLength="20"></asp:textbox>
							<asp:textbox id="txClsName" tabIndex="-1" runat="server" Width="9.5em" CssClass="TextLabel"></asp:textbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 7em"><asp:label class="RequireField" id="Label5" runat="server">保存年限:</asp:label></div>
						<div class="dTD" style="WIDTH: 17em">
							<asp:textbox class="RequireField" id="txKeepYear" tabIndex="40" runat="server" Width="2em" EnableViewState="False" MaxLength="3"></asp:textbox>
							<asp:label class="RequireField" id="Label6" runat="server" EnableViewState="False">年</asp:label>
							&nbsp;
							<asp:label class="RequireField" id="Label7" runat="server" EnableViewState="False">數量:</asp:label>
							<asp:textbox class="RequireFieldNumeric" id="txDocFileCnt" tabIndex="50" runat="server" Width="2em" EnableViewState="False" MaxLength="3"></asp:textbox>
							<asp:dropdownlist id="dlFileUnitM" runat="server" CssClass="RequireField" EnableViewState="False">
								<asp:ListItem Selected="True" Value="頁">頁</asp:ListItem>
								<asp:ListItem Value="件">件</asp:ListItem>
							</asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em"><asp:label  id="Label3" runat="server" EnableViewState="False">母文主旨:</asp:label></div>
						<div class="dTD" colSpan="3"><asp:label id="txSubject" tabIndex="-1" runat="server" Width="36.5em"></asp:label></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle"style="WIDTH: 6em" align="right"><asp:label class="KeyField" id="Label8" runat="server" EnableViewState="False">子文號:</asp:label></div>
						<div class="dTD" style="WIDTH: 21em">
							<asp:textbox class="KeyUpperField" id="txComNo" tabIndex="70" runat="server" Width="7.5em" EnableViewState="False" MaxLength="15">123456789012345</asp:textbox>
							<asp:label class="RequireField" id="Label9" runat="server" EnableViewState="False">數量:</asp:label>
							<asp:textbox class="RequireFieldNumeric" id="txComFileCnt" runat="server" Width="2em" EnableViewState="False" MaxLength="3"></asp:textbox>
							<asp:dropdownlist id="dlFileUnitS" runat="server" CssClass="RequireField" EnableViewState="False">
								<asp:ListItem Value="頁" Selected="True">頁</asp:ListItem>
								<asp:ListItem Value="件">件</asp:ListItem>
							</asp:dropdownlist>
							<asp:button id="btAddNew" accessKey="A" runat="server" EnableViewState="False" Text="加入(A)"></asp:button>
						</div>
						<div class="dTDTitle" style="WIDTH: 7em" align="right"></div>
						<div class="dTD" style="WIDTH: 17em"></div>
					</div>
				</div>
				<div class="DivTable">
					<asp:panel id="plComDetail" runat="server">
						<div class="dTR">
							<div class="dTD">
								<asp:Button id="btSelectAll" runat="server" EnableViewState="False" Text="全選"></asp:Button>
								<asp:Button id="btReverse" runat="server" EnableViewState="False" Text="反向"></asp:Button>
							</div>
						</div>
						<div class="dTR">
							<div class="dTD">
								<div class="GridDiv" style="HEIGHT: 240px">
									<asp:datagrid id="dg1" runat="server" EnableViewState="False" AutoGenerateColumns="False"
										GridLines="Vertical" CellPadding="2" PageSize="50">
										<Columns>
											<asp:TemplateColumn HeaderText="序">
												<ItemTemplate>
													<asp:Label id="lbSeq" runat="server" EnableViewState="False"></asp:Label>
												</ItemTemplate>
											</asp:TemplateColumn>
											<asp:TemplateColumn HeaderText="取消">
												<ItemTemplate>
													<asp:CheckBox id="cbunSelect" runat="server"></asp:CheckBox>
												</ItemTemplate>
											</asp:TemplateColumn>
											<asp:TemplateColumn HeaderText="子文號">
											</asp:TemplateColumn>
											<asp:TemplateColumn HeaderText="來文機關">
											</asp:TemplateColumn>
											<asp:TemplateColumn HeaderText="主旨">
											</asp:TemplateColumn>
											<asp:TemplateColumn HeaderText="數量">
												<ItemTemplate>
													<asp:textbox class="InputFieldNumeric" id="txComCnt" runat="server" Width="2em" MaxLength="3"></asp:textbox>
													<asp:dropdownlist id="dlFileUnit" runat="server" EnableViewState="False">
														<asp:ListItem Value="頁" Selected="True">頁</asp:ListItem>
														<asp:ListItem Value="件">件</asp:ListItem>
													</asp:dropdownlist>
												</ItemTemplate>
											</asp:TemplateColumn>
										</Columns>
									</asp:datagrid>
								</DIV>
							</div>
						</div>
					</asp:panel>
				</div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V2_GenericBannerToolBar" runat="server">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</form>
	</body>
</HTML>
