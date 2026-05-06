<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDT245C1.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT245C1" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE id="TitleCtrl">EDT245C1 內部行文查詢子視窗</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
		<!--#include file="/STDN/Lib/Script.shtml"-->
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDT245C1" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> 
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:textbox id="H_Status" tabIndex="-1" runat="server" Width="20px" CssClass="" ></asp:textbox><asp:textbox id="H_ApplyNo" tabIndex="-1" runat="server" Width="20px" CssClass=""></asp:textbox><asp:textbox id="H_DeptNo" tabIndex="-1" runat="server" Width="20px"></asp:textbox><asp:listbox id="lbDept" tabIndex="-1" runat="server" Width="20px" CssClass="" Enabled="False"
					Height="22px"></asp:listbox><asp:dropdownlist id="H_dlOD12" runat="server"></asp:dropdownlist><asp:dropdownlist id="H_dlOD07" runat="server"></asp:dropdownlist></DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class = "GridDiv" style="HEIGHT: 129px;">
								<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1" EnableViewState="False">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="來文文號">
											<ItemTemplate>
												<asp:HyperLink id="hlFromNo" runat="server"></asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="來文日期">
											<ItemTemplate>
												<asp:Label id="lbFromDate" runat="server"></asp:Label>
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
