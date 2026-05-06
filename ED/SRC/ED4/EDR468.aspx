<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR468.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR468" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR468 會辦稽催明細列印作業</TITLE>
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
		<FORM id="EDR468" onkeyup="jf_CheckFull();" method="post" runat="server">
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
							<asp:label id="Label1" CssClass="RequireField" runat="server">稽催期間：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">
							<asp:textbox id="txDateS" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker RequireFieldNumeric" MaxLength="7"></asp:textbox>
							&nbsp;─
							<asp:textbox id="txDateE" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker RequireFieldNumeric" MaxLength="7"></asp:textbox>
						</DIV>										
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label2" runat="server">逾期天數：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">
							自<asp:textbox id="txDayS" tabIndex="0" runat="server" Width="1.5em" MaxLength="3" CssClass="InputFieldNumeric"></asp:textbox>天
                            <asp:label id="Label13" runat="server">至</asp:label>
							<asp:textbox id="txDayE" tabIndex="0" runat="server" Width="1.5em" MaxLength="3" CssClass="InputFieldNumeric"></asp:textbox>
                            <asp:label id="Label14" runat="server">天</asp:label>
						</DIV>										
					</DIV>					
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label3" runat="server">公文文號：</asp:label>
						</DIV>
						<DIV class="dTD" style="width:17em">
							<asp:textbox id="txSDocNo" runat="server" Width="7.5em" MaxLength="15" CssClass="InputFieldNumeric"></asp:textbox>－
							<asp:textbox id="txEDocNo" runat="server" Width="7.5em" MaxLength="15" CssClass="InputFieldNumeric"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label4" runat="server">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">
							<DIV class="dTR">
								<cc1:comboBox id="dlDept" style="Z-INDEX: 0" runat="server" Width="10em" Rows="10" CssClass="comboBox"></cc1:comboBox>
							</DIV>
							<DIV class="dTR">
								<cc1:comboBox id="dlSect" style="Z-INDEX: 0" runat="server" Width="10em" Rows="10" CssClass="comboBox"></cc1:comboBox>
							</DIV>
						</DIV>		
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label5" runat="server">會辦單位：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">
							<DIV class="dTR">
								<cc1:comboBox id="dlCoWDept" style="Z-INDEX: 0" runat="server" Width="10em" Rows="10" CssClass="comboBox"></cc1:comboBox>
							</DIV>
							<DIV class="dTR">
								<cc1:comboBox id="dlCoWSect" style="Z-INDEX: 0" runat="server" Width="10em" Rows="10" CssClass="comboBox"></cc1:comboBox>
							</DIV>
						</DIV>	
					</DIV>						
					<DIV class="dTR">	
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label6" runat="server">承辦人：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">	
							<cc1:comboBox id="dlUser" style="Z-INDEX: 0" runat="server" Width="10em" Rows="10" CssClass="comboBox"></cc1:comboBox>
						</DIV>
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label7" runat="server">會辦人：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">	
							<cc1:comboBox id="dlCoWUser" style="Z-INDEX: 0" runat="server" Width="10em" Rows="10" CssClass="comboBox"></cc1:comboBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label8" runat="server">收創文日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">
							<asp:textbox id="txRcvDateS" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							&nbsp;─
							<asp:textbox id="txRcvDateE" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</DIV>										
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label9" runat="server">會辦日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">
							<asp:textbox id="txCoWDateS" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							&nbsp;─
							<asp:textbox id="txCoWDateE" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</DIV>										
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label10" runat="server">速別：</asp:label>
						</DIV>
						<DIV class="dTD" style="width:16em">
							<asp:dropdownlist id="dlSpeed" runat="server" Width="6em"></asp:dropdownlist>
						</DIV>
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label11" runat="server">類別：</asp:label>
						</DIV>
						<DIV class="dTD" style="width:16em">
							<asp:radiobutton id="rbType1" runat="server" GroupName="rbType" Text="一般公文"></asp:radiobutton>
							<asp:radiobutton id="rbType2" runat="server" GroupName="rbType" Text="預算書"></asp:radiobutton>
							<asp:radiobutton id="rbType3" runat="server" GroupName="rbType" Text="全部"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label12" runat="server">列印設定：</asp:label>
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
								<asp:TemplateColumn HeaderText="會辦單位">
									<ItemTemplate>
										<asp:Label id="lbDEPT_FNAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="會辦人">
									<ItemTemplate>
										<asp:Label id="lbCOWEMP_NAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="會辦開始日期">
									<ItemTemplate>
										<asp:Label id="lbRCV_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="會辦天數">
									<ItemTemplate>
										<asp:Label id="lbWORK_DAYS" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="速別">
									<ItemTemplate>
										<asp:Label id="lbSPD_NAME" runat="server"></asp:Label>
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
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
