<%@ Page language="c#" Codebehind="AKS502_MOCS.aspx.cs" AutoEventWireup="false" Inherits="AK.AKS502_MOCS" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>AKS502 調案查詢</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKS502_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label8" runat="server" >申請日期：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txApplyDates" runat="server" Width="4em" MaxLength="7" tabIndex="10" CssClass="DatePicker" ></asp:textbox>
                            <asp:textbox id="txApplyTimes" runat="server" Width="2.5em" MaxLength="4" tabIndex="10" ></asp:textbox>
							<asp:label id="Label9" runat="server" >至</asp:label>
							<asp:textbox id="txApplyDatee" runat="server" Width="4em" MaxLength="7" tabIndex="20" CssClass="DatePicker" ></asp:textbox>
                            <asp:textbox id="txApplyTimee" runat="server" Width="2.5em" MaxLength="4" tabIndex="10" ></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label2" runat="server" >調案日期：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="dateBegin" runat="server" Width="4em" MaxLength="7" tabIndex="10" CssClass="DatePicker" ></asp:textbox>
							<asp:label id="Label6" runat="server" >至</asp:label>
							<asp:textbox id="dateEnd" runat="server" Width="4em" MaxLength="7" tabIndex="20" CssClass="DatePicker" ></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em;">
							<asp:label id="Label1" runat="server" >調案單位：</asp:label></div>
						<div class="dTD" style="WIDTH: 12em;">
							<cc1:combobox id="OrgName" runat="server" Width="11em" tabIndex="30" CssClass="comboBox"></cc1:combobox>
						</div>
                        <div class="dTDTitle" style="WIDTH: 6.5em;">
							<asp:label id="Label4" runat="server" >調案人：</asp:label></div>
						<div class="dTD">
							<cc1:combobox id="OrderPerson" runat="server" Width="6em" tabIndex="40" CssClass="comboBox"></cc1:combobox>
							<asp:TextBox id="txUserValue" runat="server" CssClass="hidden" Width="46px" Height="16px" tabIndex="-1"></asp:TextBox>
							<asp:TextBox id="txEmpName" runat="server" CssClass="hide" Width="46px" Height="16px" tabIndex="-1"></asp:TextBox>
						</div>
					</div>
					<div class="hide">
						<div class="dTDTitle" style="WIDTH: 6.5em" >
							<asp:label id="Label5" runat="server">調案方式：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist id="dlOrderMethod" runat="server" Width="6em" tabIndex="50">
								<asp:ListItem Value="0" Selected="True">全部</asp:ListItem>
								<asp:ListItem Value="1">檔案原件</asp:ListItem>
								<asp:ListItem Value="2">線上調檔</asp:ListItem>
								<asp:ListItem Value="3">檔案複製品</asp:ListItem>
							</asp:dropdownlist>
						</div>
					</div>
                    <div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em;">
							<asp:label id="Label10" runat="server" >歸檔人員：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist id="dlMgrUser" runat="server" Width="6em" tabIndex="50"></asp:dropdownlist>
						</div>
                        <div class="dTDTitle" style="WIDTH: 12.5em;">
							<asp:label id="Label11" runat="server" >登錄人員：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist id="dlEntryUser" runat="server" Width="6em" tabIndex="50"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label3" runat="server" >調案狀態：</asp:label></div>
						<div class="dTD">
							<asp:radiobutton id="rbRegist" tabIndex="70" runat="server" Text="申請中" GroupName="retStat"></asp:radiobutton>
							<asp:radiobutton id="rbNotRtn" runat="server"  GroupName="retStat" Text="已登錄待歸還" tabIndex="70"></asp:radiobutton>
                            <asp:radiobutton id="rbReject" runat="server" GroupName="retStat" Text="已駁回" tabIndex="70" CssClass="hide"></asp:radiobutton>
							<asp:radiobutton id="rbRtn" runat="server" GroupName="retStat" Text="已歸還" tabIndex="71" CssClass="hide"></asp:radiobutton>
							<asp:radiobutton id="rbAll" runat="server" Checked="True" GroupName="retStat" Text="全部" tabIndex="72" ></asp:radiobutton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label7" runat="server" >排序：</asp:label></div>
						<div class="dTD">
							<asp:RadioButton id="rbBorNo" runat="server" GroupName="orderBy" Text="調案單號" ForeColor="Navy"></asp:RadioButton>
							<asp:RadioButton id="rbBorDate" runat="server" GroupName="orderBy" Text="調案日期" ForeColor="Navy"></asp:RadioButton>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 150px">
								<asp:datagrid id="dg2" runat="server" GridLines="Vertical" CellPadding="4" BorderWidth="1px"
									ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White" AutoGenerateColumns="False"
									PageSize="50">
									<Columns>
										<asp:BoundColumn DataField="BOR_NO" HeaderText="調案單號"></asp:BoundColumn>
                                        <asp:BoundColumn DataField="DOC_NO" HeaderText="公文文號/身分證號"></asp:BoundColumn>
										<asp:BoundColumn DataField="DEPT_NAME" HeaderText="調案單位">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="EMP_NAME" HeaderText="調案人">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="MGRUSER" HeaderText="檔管人員">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="STATUS" HeaderText="狀態"></asp:BoundColumn>
                                        <asp:BoundColumn DataField="ENTRYEMPNAME" HeaderText="登錄人員"></asp:BoundColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
			</div>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</form>
	</body>
</HTML>
