<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="TBT010.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBT010" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<TITLE>TBT010 公佈欄自動登入作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STD/LIB/SYS.css" type="text/css" rel="stylesheet">
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="TBT010" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../TBLIB/GenericBanner.htm"-->
			<DIV id="service" style="BEHAVIOR: url(../../../STD/LIB/webservice.htc)"></DIV>
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<TABLE class="BaseTable" id="BaseTable">
				<TR>
					<TD style="HEIGHT: 118px" vAlign="top" align="center" colSpan="3">
						<TABLE class="MainTable" id="MainTable" style="Z-INDEX: 101; WIDTH: 251px; HEIGHT: 23px"
							cellSpacing="0" cellPadding="0">
							<TR>
								<TD class="LeftCol" align="right">
									<asp:label id="Label1" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="KeyField">鍵值欄位：</asp:label>
								</TD>
								<TD>
									<asp:textbox id="txKeyFld" tabIndex="0" runat="server" Width="22px" Font-Names="細明體" Font-Size="Small"
										CssClass="KeyUpperField" MaxLength="2" Height="25px"></asp:textbox>
								</TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="right">
									<asp:label id="Label2" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="RequireField">必要欄位：</asp:label>
								</TD>
								<TD>
									<asp:textbox id="txRequireFld" tabIndex="0" runat="server" Width="166px" Font-Names="細明體" Font-Size="Small"
										CssClass="RequireField" MaxLength="20" Height="25px"></asp:textbox>
								</TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="right">
									<asp:label id="Label3" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="InputFieldLabel">一般欄位：</asp:label>
								</TD>
								<TD>
									<asp:textbox id="txNormalFld" tabIndex="0" runat="server" Width="166px" Font-Names="細明體" Font-Size="Small"
										CssClass="InputFieldText" MaxLength="20" Height="25px"></asp:textbox>
								</TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="right">
									<asp:label id="Label4" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="InputFieldLabel">唯讀欄位：</asp:label>
								</TD>
								<TD>
									<asp:textbox id="txReadOnly" tabIndex="0" runat="server" Width="166px" Font-Names="細明體" Font-Size="Small"
										CssClass="DisplayOnly" Height="25px" ReadOnly="True"></asp:textbox>
								</TD>
							</TR>
						</TABLE>
					</TD>
				</TR>
				<TR>
					<TD style="WIDTH: 10%"></TD>
					<TD style="WIDTH: 80%" vAlign="top" align="center">
						<TABLE id="GridTable" cellSpacing="0" cellPadding="0" height="1" width="1">
							<TR>
								<TD>
									<iewc:toolbar id="tbSelect" runat="server" Width="228px" Font-Size="X-Small" EnableViewState="False">
										<iewc:ToolbarButton Text="全部選取" ImageUrl="../../../STD/IMAGE/SELECTALL_E.gif" ID="btSelectAll" ToolTip="勾選所有的CheckBox"></iewc:ToolbarButton>
										<iewc:ToolbarButton Text="反向選取" ImageUrl="../../../STD/IMAGE/INVERSE_E.gif" ID="btSelectInverse" ToolTip="反向勾選所有的CheckBox"></iewc:ToolbarButton>
										<iewc:ToolbarButton Text="清除選取" ImageUrl="../../../STD/IMAGE/SELECTALL_D.gif" ID="btSelectClear" ToolTip="清除勾選所有的CheckBox"></iewc:ToolbarButton>
										<iewc:ToolbarSeparator></iewc:ToolbarSeparator>
										<iewc:ToolbarButton Text="刪除選取" ImageUrl="../../../STD/IMAGE/CANCEL_E.gif" ID="btDeleteSelected" ToolTip="將所勾選資料列刪除(可同時多筆)"></iewc:ToolbarButton>
										<iewc:ToolbarSeparator></iewc:ToolbarSeparator>
										<iewc:ToolbarButton ImageUrl="../../../STD/IMAGE/ARROW_Up.gif" ID="btUp" ToolTip="將所勾選資料列上移(一次一筆)"></iewc:ToolbarButton>
										<iewc:ToolbarButton ImageUrl="../../../STD/IMAGE/ARROW_Down.gif" ID="btDown" ToolTip="將所勾選資料列下移(一次一筆)"></iewc:ToolbarButton>
										<iewc:ToolbarSeparator></iewc:ToolbarSeparator>
									</iewc:toolbar>
								</TD>
							</TR>
							<TR>
								<TD>
									<DIV style="WIDTH: 489px; HEIGHT: 157px; OVERFLOW: auto">
										<asp:datagrid id="dg1" runat="server" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE"
											ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False"
											Height="142px" PageSize="30" Width="471px">
											<SelectedItemStyle Font-Bold="True" ForeColor="White" BackColor="#CE5D5A"></SelectedItemStyle>
											<AlternatingItemStyle BackColor="White"></AlternatingItemStyle>
											<ItemStyle BackColor="#F7F7DE"></ItemStyle>
											<HeaderStyle Font-Bold="True" HorizontalAlign="Center" ForeColor="White" BackColor="#6B696B"></HeaderStyle>
											<FooterStyle BackColor="#CCCC99"></FooterStyle>
											<Columns>
												<asp:TemplateColumn HeaderText="序">
													<ItemStyle HorizontalAlign="Right"></ItemStyle>
													<ItemTemplate>
														<asp:Label id="lbSEQ_NO" runat="server" Font-Size="Small" Font-Names="細明體"></asp:Label>
													</ItemTemplate>
												</asp:TemplateColumn>
												<asp:TemplateColumn HeaderText="選">
													<ItemStyle HorizontalAlign="Center"></ItemStyle>
													<ItemTemplate>
														<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
													</ItemTemplate>
												</asp:TemplateColumn>
												<asp:TemplateColumn HeaderText="唯讀欄位">
													<ItemTemplate>
														<asp:Label id="lbRead" runat="server" Width="22px" CssClass="InputFieldLabel" Font-Size="Small"
															Font-Names="細明體"></asp:Label>
													</ItemTemplate>
												</asp:TemplateColumn>
												<asp:TemplateColumn HeaderText="輸入欄位1">
													<ItemTemplate>
														<asp:textbox id="txInput1" tabIndex="0" runat="server" Width="166px" Font-Names="細明體" Font-Size="Small"
															CssClass="InputFieldText" MaxLength="20" Height="25px"></asp:textbox>
														<asp:imagebutton id="btHelp" tabIndex="0" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:imagebutton>
													</ItemTemplate>
												</asp:TemplateColumn>
												<asp:TemplateColumn HeaderText="輸入欄位2">
													<ItemTemplate>
														<asp:textbox id="txInput2" tabIndex="0" runat="server" Width="166px" Font-Names="細明體" Font-Size="Small"
															CssClass="InputFieldText" MaxLength="20" Height="25px" TextMode="MultiLine"></asp:textbox>
													</ItemTemplate>
												</asp:TemplateColumn>
											</Columns>
											<PagerStyle HorizontalAlign="Right" ForeColor="Black" BackColor="#F7F7DE" Mode="NumericPages"></PagerStyle>
										</asp:datagrid>
									</DIV>
								</TD>
							</TR>
						</TABLE>
					</TD>
					<TD style="WIDTH:10%"></TD>
				</TR>
			</TABLE>
			<iewc:toolbar id="tbTool" runat="server" Font-Size="X-Small" CssClass="V3_GenericBannerToolBar"
				EnableViewState="False">
				<iewc:ToolbarButton Text="開啟(M)" ImageUrl="../../../STD/IMAGE/MODIFY_E.gif" DefaultStyle="newmode:block;modifymode:none;"
					ID="btOpen" AccessKey="M" ToolTip="開啟舊檔(ALT+M)" TabIndex="1"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="儲存(S)" ImageUrl="../../../STD/IMAGE/Save_E.gif" DefaultStyle="newmode:block;modifymode:block;"
					ID="btSave" AccessKey="S" ToolTip="儲存(ALT+S)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:block;modifymode:none;"></iewc:ToolbarSeparator>
				<iewc:ToolbarButton Text="清除(Z)" ImageUrl="../../../STD/IMAGE/Cancel_E.gif" DefaultStyle="newmode:block;modifymode:none;"
					ID="btClean" AccessKey="Z" ToolTip="清除(ALT+Z)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:block;modifymode:none;"></iewc:ToolbarSeparator>
				<iewc:ToolbarButton Text="刪除(D)" ImageUrl="../../../STD/IMAGE/DELETE_E.gif" DefaultStyle="newmode:none;modifymode:block;"
					ID="btDelete" AccessKey="D" ToolTip="刪除(ALT+D)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="取消(Z)" ImageUrl="../../../STD/IMAGE/CANCEL_E.gif" DefaultStyle="newmode:none;modifymode:block;"
					ID="btCancel" AccessKey="Z" ToolTip="取消(ALT+Z)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:none;modifymode:block;"></iewc:ToolbarSeparator>
				<iewc:ToolbarButton Text="查詢(F)" ImageUrl="../../../STD/IMAGE/Search_E.gif" DefaultStyle="newmode:block;modifymode:none;"
					ID="btSearch" AccessKey="F" ToolTip="查詢(ALT+F)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:block;modifymode:none;"></iewc:ToolbarSeparator>
				<iewc:ToolbarButton Text="預覽(E)" ImageUrl="../../../STD/IMAGE/PREVIEW_E.gif" DefaultStyle="newmode:none;modifymode:block;"
					ID="btPreview" AccessKey="E" ToolTip="預覽(ALT+E)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="列印(P)" ImageUrl="../../../STD/IMAGE/PRINT_E.gif" DefaultStyle="newmode:none;modifymode:block;"
					ID="btPrint" AccessKey="P" ToolTip="列印(ALT+P)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:none;modifymode:block;"></iewc:ToolbarSeparator>
			</iewc:toolbar>
		</FORM>
	</BODY>
</HTML>
