<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR413.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR413" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR413 結案公文嚴重逾期回報查詢作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR413" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				 <asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				 <asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				 <asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox> 
				 <asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_Sect" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_Sect_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_User" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_User_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_dlUser_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_dlSect_Value" runat="server" CssClass="hide"></asp:textbox>                
				 <asp:textbox id="H_CoWDept" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_CoWDept_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_CoWSect" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_CoWSect_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_CoWUser" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_CoWUser_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_dlCoWUser_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_dlCoWSect_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:listbox id="lbDept" runat="server" CssClass="hide"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">				
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label1" runat="server">公文文號：</asp:label>
						</DIV>
						<DIV class="dTD" style="width:20em">
							<asp:textbox id="txDocNoS" runat="server" Width="7.5em" MaxLength="15" CssClass="InputFieldNumeric"></asp:textbox>－
							<asp:textbox id="txDocNoE" runat="server" Width="7.5em" MaxLength="15" CssClass="InputFieldNumeric"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label2" runat="server">結案日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">
							<asp:textbox id="txDateS" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							&nbsp;─
							<asp:textbox id="txDateE" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</DIV>										
					</DIV>		
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label3" runat="server">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">
							<DIV class="dTR">
								<cc1:comboBox id="dlDept" style="Z-INDEX: 0" runat="server" Width="10em" Rows="10" CssClass="comboBox"></cc1:comboBox>
							</DIV>
							<DIV class="dTR">
								<cc1:comboBox id="dlSect" style="Z-INDEX: 0" runat="server" Width="10em" Rows="10" CssClass="comboBox"></cc1:comboBox>
							</DIV>
						</DIV>		
					</DIV>						
					<DIV class="dTR">	
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label4" runat="server">承辦人：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">	
							<cc1:comboBox id="dlUser" style="Z-INDEX: 0" runat="server" Width="10em" Rows="10" CssClass="comboBox"></cc1:comboBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label5" runat="server">公文類型：</asp:label>
						</DIV>
						<DIV class="dTD" style="width:16em">
							<asp:radiobutton id="rbType1" runat="server" GroupName="rbType" Text="全部"></asp:radiobutton>
							<asp:radiobutton id="rbType2" runat="server" GroupName="rbType" Text="來文"></asp:radiobutton>
							<asp:radiobutton id="rbType3" runat="server" GroupName="rbType" Text="創稿"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label6" runat="server">列印設定：</asp:label>
						</DIV>
						<DIV class="dTD" style="width:16em">
							<asp:radiobutton id="rbPrint1" runat="server" GroupName="rbPrint" Text="依組室換頁"></asp:radiobutton>
							<asp:radiobutton id="rbPrint2" runat="server" GroupName="rbPrint" Text="不換頁"></asp:radiobutton>
						</DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV class="GridDiv" style="HEIGHT: 14em">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="公文文號">
									<ItemTemplate>
										<asp:Label id="lbDOC_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦單位">
									<ItemTemplate>
										<asp:Label id="lbOU_NAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦人">
									<ItemTemplate>
										<asp:Label id="lbEMP_NAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="">
									<ItemTemplate>
										<asp:Button id="btFill" Text="填寫" runat="server"></asp:Button>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="總分文及移文">
									<ItemTemplate>
										<asp:Label id="lbNEW_BY_OU" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="單位簽辦時間">
									<ItemTemplate>
										<asp:Label id="lbSIGN" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="會辦時間">
									<ItemTemplate>
										<asp:Label id="lbCOWORK_SIGN" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="整體時程">
									<ItemTemplate>
										<asp:Label id="lbALL_TIMES" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="案由及檢討">
									<ItemTemplate>
										<asp:Label id="lbSUBJECT" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)"  Accesskey="O" Title="匯出Excel(O)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
