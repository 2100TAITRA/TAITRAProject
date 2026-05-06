<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR378.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR378" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR378 代辦部稿查詢作業</TITLE>
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
		<FORM id="EDR378" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
                <asp:listbox id="lbDept" runat="server" Width="56px" Height="8px"></asp:listbox>
			</DIV>			
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label9" runat="server" EnableViewState="False">公文文號：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 22em">
							<asp:textbox id="txDocS" tabIndex="1" runat="server" Width="6em" MaxLength="10"></asp:textbox>
							<asp:label id="Label10" runat="server">－</asp:label>
							<asp:textbox id="txDocE" tabIndex="2" runat="server" Width="6em" MaxLength="10"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="lbDeptName" runat="server" EnableViewState="False">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 22em">
							<cc1:combobox id="dlDept" tabIndex="11" runat="server" Width="8.5em" CssClass="comboBox"></cc1:combobox>
							<cc1:combobox id="dlSect" tabIndex="12" runat="server" Width="8.5em" CssClass="comboBox"></cc1:combobox>
						</DIV>
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label6" runat="server" EnableViewState="False">承辦人：</asp:label>
						</DIV>
						<DIV class="dTD">
							<cc1:combobox id="dlUser" tabIndex="13" runat="server" Width="7.5em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label19" runat="server">收創日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 22em">
							<asp:textbox id="txRcvS" tabIndex="21" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
							<asp:label id="Label20" runat="server">－</asp:label>
							<asp:textbox id="txRcvE" tabIndex="22" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
						</DIV>
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label1" runat="server">發文日期：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txIssueDateS" tabIndex="23" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							<asp:label id="Label5" runat="server">－</asp:label>
							<asp:textbox id="txIssueDateE" tabIndex="24" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6em">
                            <asp:Label ID="Label13" runat="server">公文性質：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 22em">
                            <asp:DropDownList ID="dlProperty" TabIndex="31" runat="server" Width="9.5em"></asp:DropDownList>
                        </div>
                        <div class="dTDTitle" style="width: 6em">
                            <asp:Label ID="Label21" runat="server">業務類別：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList ID="dlBTypeNo" TabIndex="32" runat="server" Width="9.5em"></asp:DropDownList>
                        </div>
                    </div>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label2" runat="server">主旨：</asp:label>
						</DIV>
						<DIV class="dTD"">
							<asp:textbox id="txSubject" tabIndex="41" runat="server" Width="35em"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em"></DIV>
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
                            <asp:TextBox ID="h_workTypeIndex" runat="server" CssClass="hide"></asp:TextBox>
                            <asp:TextBox ID="h_workTypeValue" runat="server" CssClass="hide"></asp:TextBox>
                            <asp:TextBox ID="h_workTypeText" runat="server" CssClass="hide"></asp:TextBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label7" runat="server">代辦類別：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbTypeAll" tabIndex="51" runat="server"  Text="全部" GroupName="type"></asp:radiobutton>
							<asp:radiobutton id="rbType1" tabIndex="52" runat="server"  Text="代辦部稿批示單" GroupName="type"></asp:radiobutton>
							<asp:radiobutton id="rbType2" tabIndex="53" runat="server" Text="陳部簽批示單" GroupName="type"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label3" runat="server">歸檔否：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbFileAll" tabIndex="61" runat="server"  Text="全部" GroupName="FileStatus"></asp:radiobutton>
							<asp:radiobutton id="rbFileStored" tabIndex="62" runat="server"  Text="已送歸檔並完成點收" GroupName="FileStatus"></asp:radiobutton>
							<asp:radiobutton id="rbFileNStored" tabIndex="63" runat="server" Text="未歸檔或已送歸檔未點收" GroupName="FileStatus"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label8" runat="server">排序：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:radiobutton id="rbSortDocNo" tabIndex="71" runat="server" Text="公文文號"	GroupName="sort"></asp:radiobutton>
							<asp:radiobutton id="rbSortRcvDate" tabIndex="72" runat="server" Text="收創日期" GroupName="sort"></asp:radiobutton>
							<asp:radiobutton id="rbSortDept" tabIndex="73" runat="server"  Text="承辦單位" GroupName="sort"></asp:radiobutton>
							<asp:radiobutton id="rbSortUser" tabIndex="74" runat="server"  Text="承辦人" GroupName="sort"></asp:radiobutton>
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
										<asp:HyperLink id="hlDOC_NO" runat="server"></asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:Label id="lbFROM_SUBJECT" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="收創日期&lt;BR&gt;限辦日期">
									<ItemTemplate>
										<asp:Label id="lbRCV_DATE" runat="server"></asp:Label><br/>
										<asp:Label id="lbDUE_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="核決日期&lt;BR&gt;發文日期">
									<ItemTemplate>
										<asp:Label id="lbAPP_DATE" runat="server"></asp:Label><br/>
										<asp:Label id="lbISSUE_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="目前所在位置">
									<ItemTemplate>
										<asp:Label id="lbCURR_LOCATION" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦單位&lt;BR&gt;承辦人">
									<ItemTemplate>
										<asp:Label id="lbDEPT_NAME" runat="server"></asp:Label><br/>
										<asp:Label id="lbEMP_NAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
