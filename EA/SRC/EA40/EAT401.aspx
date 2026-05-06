<%@ Page language="c#" Codebehind="EAT401.aspx.cs" AutoEventWireup="false" Inherits="EA40.EAT401" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT401清理範圍調整作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT401" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV style="HEIGHT: 100px; WIDTH: 100px; POSITION: absolute; LEFT: 0px; Z-INDEX: -100; TOP: 0px; VISIBILITY: hidden"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5.5em; "><asp:label id="Label1" runat="server" CssClass="RequireField">清理批號：</asp:label></DIV>
						<DIV class="dTD" style="width: 8em; ">
							<asp:textbox id="txPlanNo" tabIndex="10" onkeypress="jf_UPPERCASE()" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="8"></asp:textbox>
							<asp:imagebutton id="btKeyHelp" tabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:imagebutton>
							<asp:textbox id="txOrgNo" runat="server" CssClass="hide"></asp:textbox>
						</DIV>
						<DIV class="dTDTitle" style="width: 5.5em; "><asp:label id="Label3" runat="server" >計畫狀態 ：</asp:label></DIV>
						<DIV class="dTD" style="width: 15em; ">
							<asp:dropdownlist id="dlStatus" tabIndex="20" runat="server" >
								<asp:ListItem Value="0" Selected="True">清理範圍設定中</asp:ListItem>
								<asp:ListItem Value="1">產生明細待修正</asp:ListItem>
								<asp:ListItem Value="2">清理中</asp:ListItem>
								<asp:ListItem Value="3">紙質檔案完成數位內容待處理</asp:ListItem>
								<asp:ListItem Value="4">清理完成</asp:ListItem>
							</asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5.5em; "><asp:label id="Label2" runat="server" >計畫說明：</asp:label></DIV>
						<DIV class="dTD" style="width: 26em; "><asp:textbox id="txPlanDesc" tabIndex="-1" runat="server" Width="25.5em" CssClass="displayonly" ReadOnly="True" ForeColor="Navy"></asp:textbox></DIV></DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5.5em; "><asp:label id="Label5" runat="server" >檔號範圍：</asp:label></DIV>
						<DIV class="dTD" style="width: 26em; "><asp:textbox id="txFileRange" tabIndex="-1" runat="server" Width="25.5em" CssClass="displayonly" ReadOnly="True" ForeColor="Navy"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5.5em; ">
							<asp:label style="Z-INDEX: 0" id="lbDbaseUnit" runat="server" CssClass="hide">銷毀單位：</asp:label></DIV>
						<DIV class="dTD" style="width: 25em; ">
							<asp:textbox style="Z-INDEX: 0" id="txDbaseUnit" tabIndex="-1" runat="server" Width="2.5em" CssClass="hide" ReadOnly="True" ForeColor="Navy"></asp:textbox>
							&nbsp;
							<asp:button id="btChange" runat="server" Width="9.5em" CssClass="hide" Text='調整銷毀單位為"卷"' style="Z-INDEX: 0"></asp:button>
						</DIV>
					</DIV>
					<FIELDSET id="AdjustCondition" style=" WIDTH: 40em"><LEGEND >調整條件</LEGEND>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="width: 5.5em; "><asp:label id="lbDocNo" runat="server" Width="4.5em" >文號：</asp:label></DIV>
							<DIV class="dTD" style="width: 20em; "><asp:textbox id="txDocNO" tabIndex="30" onkeypress="jf_InpNumOnly()" runat="server" Width="6.5em" MaxLength="10"></asp:textbox></DIV>	
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="width: 5.5em; "><asp:label id="Label6" runat="server" Width="4.5em" >卷號起：</asp:label></DIV>
							<DIV class="dTD" style="width: 32em; ">
								<asp:textbox id="txYearS" tabIndex="30" onkeypress="jf_InpNumOnly()" runat="server" Width="2.5em" MaxLength="3"></asp:textbox>－
								<asp:textbox id="txClsS" tabIndex="35" onkeypress="jf_UPPERCASE()" runat="server" Width="10.5em" MaxLength="20"></asp:textbox>－
								<asp:textbox id="txCaseS" tabIndex="40" onkeypress="jf_UPPERCASE()" runat="server" Width="7em" MaxLength="12"></asp:textbox>－
								<asp:textbox id="txVolS" tabIndex="45" onkeypress="jf_UPPERCASE()" runat="server" Width="3.5em" MaxLength="4"></asp:textbox>－
								<asp:textbox id="txSeqS" tabIndex="50" onkeypress="jf_InpNumOnly()" runat="server" Width="2.5em" MaxLength="3"></asp:textbox>
							</DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="width: 5.5em; "><asp:label id="Label7" runat="server" Width="5.5em" >卷號訖：</asp:label></DIV>
							<DIV class="dTD" style="width: 32em; "><asp:textbox id="txYearE" tabIndex="55" onkeypress="jf_InpNumOnly()" runat="server" Width="2.5em" MaxLength="3"></asp:textbox>－
								<asp:textbox id="txClsE" tabIndex="60" onkeypress="jf_UPPERCASE()" runat="server" Width="10.5em" MaxLength="20"></asp:textbox>－
								<asp:textbox id="txCaseE" tabIndex="65" onkeypress="jf_UPPERCASE()" runat="server" Width="7em" MaxLength="12"></asp:textbox>－
								<asp:textbox id="txVolE" tabIndex="70" onkeypress="jf_UPPERCASE()" runat="server" Width="3.5em" MaxLength="4"></asp:textbox>－
								<asp:textbox id="txSeqE" tabIndex="70" onkeypress="jf_InpNumOnly()" runat="server" Width="2.5em" MaxLength="3"></asp:textbox>
							</DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="width: 5.5em; "><asp:label id="Label9" runat="server" >庫房別：</asp:label></DIV>
							<DIV class="dTD" style="width: 25em; ">
								<asp:DropDownList id="dlStoreNo" runat="server" Width="14.5em"></asp:DropDownList>
							</DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="width: 5.5em; "><asp:label id="Label18" runat="server" >櫥位號：</asp:label></DIV>
							<DIV class="dTD" style="width: 32em; ">
								<asp:textbox id="txStockNoS" tabIndex="75" onkeypress="jf_UPPERCASE()" runat="server" Width="7.5em" MaxLength="11"></asp:textbox>
								<asp:label id="Label19" runat="server">－</asp:label>
								<asp:textbox id="txStockNoE" tabIndex="80" onkeypress="jf_UPPERCASE()" runat="server" Width="7.5em" MaxLength="11"></asp:textbox>
							</DIV>
						</DIV>
						<asp:TextBox ID="h_txEUNRECOVERY" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox ID="h_searchmode" runat="server" CssClass="hide"></asp:TextBox>
					</FIELDSET>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5.5em; "><asp:label id="Label4" runat="server" Width="80px" >資料顯示：</asp:label></DIV>
						<DIV class="dTD" style="width: 25em; ">
							<asp:radiobutton id="rbVol" runat="server" GroupName="DataShow" Text="以卷為單位" Checked="True"></asp:radiobutton>
							<asp:radiobutton id="rbItem" runat="server" GroupName="DataShow" Text="以件為單位"></asp:radiobutton>
						</DIV>
					</DIV>
				</DIV>	
				<DIV class="DivTable">	
					<asp:panel id="Page1" runat="server" Width="33.5em" CssClass="hide">						
						<DIV class="dTR">
							<DIV class="dTD" style="width: Bem; ">&nbsp;&nbsp;&nbsp;&nbsp; 
								<asp:button id="btClearGrid" accessKey="C" runat="server" Width="4.5em" Text="清除(C) "></asp:button>
								<asp:button id="btSelectAll" accessKey="A" runat="server" Width="4.5em" Text="全選(A) "></asp:button>
								<asp:button id="btReverse" accessKey="N" runat="server" Width="4.5em" Text="反向(N)"></asp:button>
							</DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="width: Aem; ">&nbsp;&nbsp;&nbsp;&nbsp; 
								<asp:label id="Label11" runat="server" Width="5.5em" >案卷數：</asp:label>
								<asp:textbox tabIndex="1" id="txVolCnt" runat="server" Width="3.5em" MaxLength="5" 
									ReadOnly="True" BackColor="LightGray"></asp:textbox>
								<asp:label id="Label10" runat="server" >總件數：</asp:label>
								<asp:textbox tabIndex="-1" id="txDocCnt" runat="server" Width="3.5em" ReadOnly="True"
									BackColor="#E0E0E0"></asp:textbox>
								<asp:label id="Label8" runat="server" >另存附件件數：</asp:label>
								<asp:textbox tabIndex="-1" id="txAttCnt" runat="server" Width="4.5em" ReadOnly="True"
									BackColor="LightGray"></asp:textbox>
							</DIV>
						</DIV>
						<asp:panel id="DIVPanel1" runat="server" CssClass="hide" HorizontalAlign="LEFT">
							<DIV class = "GridDiv" id="DIV1" style="OVERFLOW: auto; HEIGHT: 275px">
								<asp:datagrid id="dg1" runat="server" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1" >
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server" Width="2.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cb1" runat="server" Checked="True"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="卷號">
											<ItemTemplate>
												<asp:Label id="lbVol" runat="server" Width="12.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="目次號起訖">
											<ItemTemplate>
												<asp:Label id="lbItem" runat="server" Width="7.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="櫥位號">
											<ItemTemplate>
												<asp:Label id="lbStock" runat="server" Width="7.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="案件數">
											<ItemTemplate>
												<asp:Label id="lbPaperItem" runat="server" Width="6.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="另存附件件數">
											<ItemTemplate>
												<asp:Label id="lbOther" runat="server" Width="7.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="庫房">
											<ItemTemplate>
												<asp:Label id="lbStoreName" runat="server" Width="7.5em" ></asp:Label>
												<asp:TextBox id="h_StoreNo" runat="server" Width="0.5em" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</asp:panel>
						<asp:panel id="DIVPanel2" runat="server" CssClass="hide" HorizontalAlign="LEFT">
							<DIV class = "GridDiv" id="DIV2" style="OVERFLOW: auto; HEIGHT: 299px">
								<asp:datagrid id="dg2" runat="server" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1" >
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq2" runat="server" Width="2.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cb2" runat="server" Checked="True"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="卷號">
											<ItemTemplate>
												<asp:Label id="lbVol2" runat="server" Width="12.5em"></asp:Label>
												<asp:TextBox id="txDocInfo" runat="server" Width="12.5em" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="目次號">
											<ItemTemplate>
												<asp:Label id="lbItem2" runat="server" Width="7.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="櫥位號">
											<ItemTemplate>
												<asp:Label id="lbStock2" runat="server" Width="7.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="公文文號">
											<ItemTemplate>
												<asp:Label id="lbDocNo2" runat="server" Width="7.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="另存附件件數">
											<ItemTemplate>
												<asp:Label id="lbOther2" runat="server" Width="7.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="庫房">
											<ItemTemplate>
												<asp:Label id="lbStoreName2" runat="server" Width="7.5em" ></asp:Label>
												<asp:TextBox id="h_StoreNo2" runat="server" Width="0.5em" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</asp:panel>
					</asp:panel>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="加入計畫" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btDelete" runat="server" Text="由計畫中刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
