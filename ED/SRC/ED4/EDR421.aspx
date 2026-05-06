<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR421.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR421" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR421 未結案公文逾期回報查詢作業</TITLE>
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
		<FORM id="EDR421" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				 <asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				 <asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				 <asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>                 
			     <asp:TextBox style="Z-INDEX: 105; POSITION: absolute; TOP: 616px; LEFT: 464px" id="txODPrivilege" runat="server" CssClass="hide"></asp:TextBox>
				 <asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_Sect" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_Sect_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_User" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_User_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_dlUser_Value" runat="server" CssClass="hide"></asp:textbox>
				 <asp:textbox id="H_dlSect_Value" runat="server" CssClass="hide"></asp:textbox>        
				 <asp:listbox id="lbDept" runat="server" CssClass="hide"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">			
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label1" runat="server">公文文號：</asp:label>
						</DIV>
						<DIV class="dTD" style="width:17em">
							<asp:textbox id="txSDocNo" runat="server" Width="7.5em" MaxLength="15" CssClass="InputFieldNumeric"></asp:textbox>－
							<asp:textbox id="txEDocNo" runat="server" Width="7.5em" MaxLength="15" CssClass="InputFieldNumeric"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label2" runat="server">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 26em">
								<cc1:comboBox id="dlDept" style="Z-INDEX: 0" runat="server" Width="9em" Rows="10" CssClass="comboBox"></cc1:comboBox>
								<cc1:comboBox id="dlSect" style="Z-INDEX: 0" runat="server" Width="9em" Rows="10" CssClass="comboBox"></cc1:comboBox>
						</DIV>		
					</DIV>
					<DIV class="dTR">	
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label3" runat="server">承辦人：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">	
							<cc1:comboBox id="dlUser" style="Z-INDEX: 0" runat="server" Width="9em" Rows="10" CssClass="comboBox"></cc1:comboBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label4" runat="server">限辦日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">
							<asp:textbox id="txDueDateS" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							&nbsp;─
							<asp:textbox id="txDueDateE" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</DIV>										
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label5" runat="server">收創文日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">
							<asp:textbox id="txRcvDateS" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							&nbsp;─
							<asp:textbox id="txRcvDateE" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</DIV>										
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label6" runat="server">稽催日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">
							<asp:textbox id="txInsDateS" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							&nbsp;─
							<asp:textbox id="txInsDateE" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</DIV>										
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label7" runat="server">逾期天數：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 16em">
							<asp:textbox id="txOverDayS" tabIndex="0" runat="server" Width="1.5em" MaxLength="3" CssClass="InputFieldNumeric"></asp:textbox>(起)—
							<asp:textbox id="txOverDayE" tabIndex="0" runat="server" Width="1.5em" MaxLength="3" CssClass="InputFieldNumeric"></asp:textbox>(迄)
						</DIV>										
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label9" runat="server">個案分析：</asp:label>
						</DIV>
						<DIV class="dTD" style="width:20em">
							<asp:radiobutton id="rbType1" runat="server" GroupName="rbType" Text="未回報"></asp:radiobutton>
							<asp:radiobutton id="rbType2" runat="server" GroupName="rbType" Text="未簽核"></asp:radiobutton>
							<asp:radiobutton id="rbType3" runat="server" GroupName="rbType" Text="已簽核"></asp:radiobutton>
							<asp:radiobutton id="rbType4" runat="server" GroupName="rbType" Text="全部"></asp:radiobutton>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)"  Accesskey="O" Title="匯出Excel(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
