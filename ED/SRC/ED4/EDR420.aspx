<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR420.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR420" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR420 自動稽催查詢列印作業</TITLE>
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
		<FORM id="EDR420" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
                <asp:listbox id="lbDept" runat="server" Width="56px" Height="8px"></asp:listbox>
			</DIV>			
			<DIV class="DivBaseTable" id="BaseTable">
				<asp:TextBox id="tx_flow_type_1" runat="server" Width="0px" Height="0px" CssClass="hide"></asp:TextBox>
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">&nbsp;
							<asp:label id="Label1" runat="server" CssClass="RequireField">稽催期間：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:textbox id="txDateS" tabIndex="1" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:textbox>
							<asp:label id="Label5" runat="server">－</asp:label>
							<asp:textbox id="txDateE" tabIndex="2" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label2" runat="server" CssClass="RequireField" EnableViewState="False">稽催類別：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:dropdownlist id="CbInspType" runat="server" Width="19em" CssClass="RequireField"></asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label9" runat="server" EnableViewState="False">公文文號：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:textbox id="txDocS" tabIndex="4" runat="server" Width="6em" MaxLength="10"></asp:textbox>
							<asp:label id="Label10" runat="server">－</asp:label>
							<asp:textbox id="txDocE" tabIndex="5" runat="server" Width="6em" MaxLength="10"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="lbDeptName" runat="server" EnableViewState="False">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<cc1:combobox id="dlDept" tabIndex="6" runat="server" Width="9.5em" CssClass="comboBox"></cc1:combobox>
							<cc1:combobox id="dlSect" tabIndex="7" runat="server" Width="9.5em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label6" runat="server" EnableViewState="False">承辦人：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<cc1:combobox id="dlUser" tabIndex="8" runat="server" Width="7.5em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label19" runat="server">收創文日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:textbox id="txRcvS" tabIndex="9" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
							<asp:label id="Label20" runat="server">－</asp:label>
							<asp:textbox id="txRcvE" tabIndex="10" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label17" runat="server">期限：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
                            <DIV class="dTR">
							    <asp:textbox id="txDueS" tabIndex="11" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
							    <asp:label id="Label18" runat="server">－</asp:label>
							    <asp:textbox id="txDueE" tabIndex="12" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
						    </DIV>                            
                            <DIV class="dTR">
                                <asp:label id="Label12" runat="server" Width="18.5em">(表逾期公文之限辦日期、辦畢未歸檔公文<br/>及調閱未歸還公文之應歸日期)</asp:label>
                            </DIV>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label11" runat="server">逾期天數：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<DIV class="" id="divBehind1">
								<asp:label id="Label4" runat="server">自</asp:label>
								<asp:textbox id="txSDay" style="TEXT-ALIGN: right" tabIndex="13" runat="server" Width="1.5em" MaxLength="2" CssClass="InputFieldNumeric"></asp:textbox>
								<asp:label id="Label16" runat="server">天至</asp:label>
								<asp:textbox id="txEDay" style="TEXT-ALIGN: right" tabIndex="14" runat="server" Width="1.5em" MaxLength="2" CssClass="InputFieldNumeric"></asp:textbox>
								<asp:label id="Label15" runat="server">天</asp:label>
							</DIV>
							<DIV class="hide" id="divBehind2">
								<asp:label id="Label14" runat="server">逾</asp:label>
								<asp:textbox id="txDelay" style="TEXT-ALIGN: right" tabIndex="15" runat="server" Width="1.5em" MaxLength="2" CssClass="InputFieldNumeric"></asp:textbox>
								<asp:label id="Label3" runat="server">天以上</asp:label>
							</DIV>									
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em"></DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_OD_FLOW_TYPE" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_Sect" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_User" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_Sect_Value" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_User_Value" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_dlSect_Value" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_dlUser_Value" runat="server" CssClass="hide"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label7" runat="server">列印設定：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:radiobutton id="rbOU_ID" tabIndex="16" runat="server" Checked="True" Text="依組室換頁" GroupName="print"></asp:radiobutton>
							<asp:radiobutton id="rbEMP" tabIndex="17" runat="server" Text="依承辦人換頁" GroupName="print"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label8" runat="server">排序方式：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:radiobutton id="rbSort_Dept" tabIndex="18" runat="server" Text="承辦單位"	GroupName="sort"></asp:radiobutton>
							<asp:radiobutton id="rbSort_DocNo" tabIndex="19" runat="server" Checked="True" Text="公文文號" GroupName="sort"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:checkbox id="cbLatest" tabIndex="59" runat="server" Text="僅列印公文最新稽催紀錄"></asp:checkbox>
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
								<asp:TemplateColumn HeaderText="期限">
									<ItemTemplate>
										<asp:Label id="lbDUE_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="送歸檔(成批)日期">
									<ItemTemplate>
										<asp:Label id="lbFILE_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:Label id="lbFROM_SUBJECT" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦單位">
									<ItemTemplate>
										<asp:Label id="lbDEPT_NAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦人">
									<ItemTemplate>
										<asp:Label id="lbEMP_NAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="展期&lt;BR&gt;次數">
									<ItemTemplate>
										<asp:Label id="lbSEXT_DAY" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="稽催&lt;BR&gt;次數">
									<ItemTemplate>
										<asp:Label id="lbSPROCESS_AUDIT" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="逾期&lt;BR&gt;天數">
									<ItemTemplate>
										<asp:Label id="lbDELAY_DAYS" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="稽催日期">
									<ItemTemplate>
										<asp:Label id="lbAUDIT_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="通知方式">
									<ItemTemplate>
										<asp:Label id="lbINSPECT_TYPE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
