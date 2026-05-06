<%@ Page language="c#" Codebehind="IFM700C2.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM700C2" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>IFM700C2 公告附件檔案設定程式</TITLE>
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
		<FORM id="IFM700C2" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 3.5em"><asp:label id="Label1" runat="server">檔案：</asp:label></DIV>
						<DIV class="dTD" ><INPUT id="txFilePath" type="file" style="WIDTH: 11em;" tabIndex="1" size="9" name="txFilePath" runat="server"></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 3.5em"><asp:label id="Label2" runat="server">說明：</asp:label></DIV>
						<DIV class="dTD" ><asp:textbox class="RequireField" id="txDesc" tabIndex="2" runat="server" Width="11em" Height="42px" TextMode="MultiLine"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 3.5em"><asp:label id="Label3" runat="server">執行：</asp:label></DIV>
						<DIV class="dTD" ><asp:button id="btAddFile" tabIndex="3" runat="server" Width="11em" Text="加入至下列清單"></asp:button></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<asp:label id="Label34" runat="server" BackColor="DimGray" ForeColor="White" width="100%">公告附件檔案清單</asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 221px;">
								<asp:datagrid id="dg1" runat="server" PageSize="50" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="檔名">
											<ItemTemplate>
												<asp:Label id="lbFilename" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="說明">
											<ItemTemplate>
												<asp:Label id="lbDescription" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText=" 執行">
											<ItemTemplate>
												<asp:Button id="btDel" runat="server" Text="刪除"></asp:Button>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
		</FORM>
	</BODY>
</HTML>
