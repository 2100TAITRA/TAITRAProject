<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKI807.aspx.cs" AutoEventWireup="false" Inherits="AK.AKI807" ValidateRequest="false" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>AKI807 已銷毀公文明細瀏覽</title>
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
	<body MS_POSITIONING="GridLayout" oncontextmenu="event.returnValue=false">
		<form id="AKI807" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<DIV style="Z-INDEX: 101; POSITION: absolute; WIDTH: 122px; DISPLAY: none; HEIGHT: 195px; OVERFLOW: auto; TOP: 13px; LEFT: 779px"><asp:validationsummary id="ValidationSummary1" runat="server" Height="25px" Width="175px"></asp:validationsummary><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator" CssClass="hidden"></asp:customvalidator><asp:listbox id="lbReturnValue" runat="server" Height="33px" Width="46px" CssClass="Hidden"></asp:listbox><asp:textbox id="txUnvFile" runat="server" Width="43px"></asp:textbox><asp:textbox id="txWebWorkPath" tabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:textbox><asp:textbox id="txServerName" tabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:textbox><asp:textbox id="txServerPort" tabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:textbox><asp:textbox id="txRoleNo" runat="server" CssClass="hidden"></asp:textbox><asp:textbox id="txUnvFileLocal" tabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:textbox><asp:textbox id="DOC_CHECK" runat="server" Width="97px" CssClass="hidden"></asp:textbox><asp:textbox id="COM_CHECK" runat="server" Width="105px" CssClass="hidden"></asp:textbox></DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="SumTable">
					<div class="dTR" vAlign="top">
						<div class="dTD">
							<asp:Label id="Label1" runat="server" Width="53em">註：檔號僅列至案次號，因在制定計畫時，僅會記錄到案次號。</asp:Label><BR>
							<asp:Label style="Z-INDEX: 0" id="Label2" runat="server" Width="53em" CssClass="hide">註：檔號僅列至案次號，因在制定計畫時，僅會記錄到案次號，如需詳細資料，請至檔案科調閱。</asp:Label><BR>
							<div class="GridDiv" style="HEIGHT: 440px;">
								<asp:datagrid id="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="1" AutoGenerateColumns="False">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="公文文號">
											<ItemTemplate>
												<asp:Label id="lbDOC_NO" runat="server"></asp:Label>
												<asp:HyperLink id="hlDocSeq" runat="server">HyperLink</asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="銷毀批號">
											<ItemTemplate>
												<asp:Label id="lbPLAN_NO" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="案由">
											<ItemTemplate>
												<asp:Label id="lbFROM_SUBJECT" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="核准文號&lt;br&gt;銷毀日期">
											<ItemTemplate>
												<asp:Label id="lbDESTROY_NO" runat="server"></asp:Label><BR>
												<asp:Label id="lbDESTROY_DATE" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="檔號&lt;br&gt;(年度-分類-案)">
											<ItemTemplate>
												<asp:Label id="lbFILE_NO" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="備註">
											<ItemTemplate>
												<asp:Label id="lbTYPE" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
								<asp:TextBox id="txRecCtn" runat="server" CssClass="hidden"></asp:TextBox>
							</DIV>
						</div>
					</div>
					<asp:TextBox ID="txFlag" Runat="server" CssClass="hide"></asp:TextBox>
				</div>
			</div>
		</form>
	</body>
</HTML>
