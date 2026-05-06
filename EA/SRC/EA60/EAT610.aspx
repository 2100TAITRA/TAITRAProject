<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAT610.aspx.cs" AutoEventWireup="false" Inherits="EA60.EAT610" %>
<!DOCTYPE HTML  >
<HTML>
	<HEAD>
		<TITLE>EAT610 已歸檔公文移交申請作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STD/LIB/SYS.css">
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT610" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV style="BEHAVIOR: url(../../../STD/LIB/webservice.htc)" id="service"></DIV>
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<TABLE style="WIDTH: 896px; HEIGHT: 549px; TOP: 88px; LEFT: 16px" id="BaseTable" class="BaseTable">
				<TR>
					<TD style="HEIGHT: 191px" vAlign="top" colSpan="3" align="center">
						<TABLE style="WIDTH: 880px; HEIGHT: 480px" id="Table1" class="MainTable" align="center">
							<TBODY>
								<TR>
									<TD style="WIDTH: 400px; HEIGHT: 76px">&nbsp;
										<TABLE style="Z-INDEX: 0; WIDTH: 841px; HEIGHT: 56px" id="Table3" class="MainTable">
											<TR>
												<TD style="WIDTH: 129px; HEIGHT: 1px" class="LeftCol" align="right"><FONT face="新細明體"><asp:label id="Label5" class="RequireField" tabIndex="-1" runat="server" Width="120px">移交單號：</asp:label></FONT></TD>
												<TD style="WIDTH: 202px; HEIGHT: 1px"><FONT face="新細明體"><asp:textbox id="txApplyNo" runat="server"></asp:textbox><asp:imagebutton id="Imagebutton2" tabIndex="-1" runat="server" Width="20px" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"
															Height="20px"></asp:imagebutton></FONT></TD>
												<TD style="WIDTH: 21px; HEIGHT: 1px" align="right"><FONT face="新細明體"><asp:label style="Z-INDEX: 0" id="Label20" class="RequireField" tabIndex="-1" runat="server"
															Width="86px" Height="17px">申請日期：</asp:label></FONT></TD>
												<TD style="WIDTH: 16px; HEIGHT: 1px"><asp:textbox style="Z-INDEX: 0" id="ApplyDate" runat="server"></asp:textbox></TD>
												<TD style="WIDTH: 8px; HEIGHT: 1px"><FONT face="新細明體"><asp:label style="Z-INDEX: 0" id="Label18" class="RequireField" tabIndex="-1" runat="server"
															Width="76px" Height="17px">狀態：</asp:label></FONT></TD>
												<TD style="WIDTH: 202px; HEIGHT: 1px"><FONT face="新細明體"><asp:label style="Z-INDEX: 0" id="Label19" runat="server">Label</asp:label></FONT></TD>
											</TR>
											<TR>
												<TD style="WIDTH: 129px; HEIGHT: 7px" class="LeftCol" align="right"></TD>
												<TD style="WIDTH: 202px; HEIGHT: 7px"><asp:label style="Z-INDEX: 0" id="Label17" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel"
														Font-Size="Smaller" ForeColor="Red">新增申請單不需鍵入</asp:label></TD>
												<TD style="WIDTH: 21px; HEIGHT: 7px"></TD>
												<TD style="WIDTH: 16px; HEIGHT: 7px"></TD>
												<TD style="WIDTH: 8px; HEIGHT: 7px"><FONT face="新細明體"></FONT></TD>
												<TD style="WIDTH: 202px; HEIGHT: 7px"></TD>
											</TR>
										</TABLE>
									</TD>
						</FONT></TD>
				</TR>
				<TR>
					<TD style="WIDTH: 400px">
						<TABLE style="Z-INDEX: 0; WIDTH: 784px; HEIGHT: 143px" id="Table1" class="MainTable">
							<TR>
								<TD style="WIDTH: 482px">
									<FIELDSET style="WIDTH: 495px; HEIGHT: 88px" vAlign="top"><LEGEND class="InputFieldLabel">移交範圍</LEGEND>
										<TABLE style="Z-INDEX: 0; WIDTH: 480px; HEIGHT: 87px" id="Table2" class="MainTable">
											<TR>
												<TD style="WIDTH: 108px; HEIGHT: 21px" class="LeftCol" align="right"><FONT face="新細明體"><asp:label id="Label21" class="RequireField" tabIndex="-1" runat="server">原負責單位：</asp:label></FONT></TD>
												<TD style="WIDTH: 118px; HEIGHT: 21px"><FONT face="新細明體"><asp:dropdownlist id="dlDeptOld" runat="server" Width="112px" Height="23px"></asp:dropdownlist></FONT></TD>
												<TD style="WIDTH: 108px" class="LeftCol" align="right"><FONT face="新細明體"><asp:label id="Label2" tabIndex="-1" runat="server" CssClass="InputFieldLabel">年度：</asp:label></FONT></TD>
												<TD><FONT face="新細明體"><asp:textbox id="txYearS" tabIndex="20" runat="server" Width="28px" CssClass="InputFieldText"
															MaxLength="3"></asp:textbox>－
														<asp:textbox id="txYearE" tabIndex="20" runat="server" Width="28px" CssClass="InputFieldText"
															MaxLength="3"></asp:textbox><asp:label id="lbHid" runat="server"></asp:label></FONT></TD>
											</TR>
											<TR>
												<TD style="WIDTH: 108px; HEIGHT: 21px" class="LeftCol" align="right"><FONT face="新細明體"><asp:label id="Label1" class="RequireField" tabIndex="-1" runat="server">原負責科別：</asp:label></FONT></TD>
												<TD style="WIDTH: 118px; HEIGHT: 21px"><FONT face="新細明體"><asp:dropdownlist id="dlSectOld" runat="server" Width="112px" Height="23px"></asp:dropdownlist></FONT></TD>
												<TD style="WIDTH: 108px" class="LeftCol" align="right"><FONT face="新細明體"><asp:label id="Label3" tabIndex="-1" runat="server" CssClass="InputFieldLabel">分類號：</asp:label></FONT></TD>
												<TD><FONT face="新細明體"><asp:textbox id="txCls" tabIndex="30" runat="server" Width="147px" CssClass="InputFieldText"
															MaxLength="20"></asp:textbox></FONT></TD>
											</TR>
											<TR>
												<TD style="WIDTH: 108px; HEIGHT: 21px" class="LeftCol" align="right"><FONT face="新細明體"><asp:label id="Label22" class="RequireField" tabIndex="-1" runat="server">原負責人：</asp:label></FONT></TD>
												<TD style="WIDTH: 118px; HEIGHT: 21px"><FONT face="新細明體"><asp:dropdownlist id="dlUserOld" runat="server" Width="112px" Height="23px"></asp:dropdownlist></FONT></TD>
												<TD style="WIDTH: 108px" class="LeftCol" align="right"><FONT face="新細明體"><asp:label id="Label4" tabIndex="-1" runat="server" CssClass="InputFieldLabel">案次號：</asp:label></FONT></TD>
												<TD><FONT face="新細明體"><asp:textbox id="txCase" tabIndex="40" runat="server" Width="91px" CssClass="InputFieldText"
															MaxLength="12"></asp:textbox></FONT></TD>
											</TR>
										</TABLE>
									</FIELDSET>
								</TD>
								<TD vAlign="top"><FONT face="新細明體">
										<FIELDSET style="WIDTH: 272px; HEIGHT: 136px" vAlign="top"><LEGEND class="InputFieldLabel">移交設定</LEGEND>
											<TABLE style="WIDTH: 260px; HEIGHT: 101px" id="Table3" class="MainTable">
												<TR>
													<TD style="WIDTH: 108px; HEIGHT: 21px" class="LeftCol" align="right"><FONT face="新細明體"><asp:label id="Label9" class="RequireField" tabIndex="-1" runat="server">新負責單位：</asp:label></FONT></TD>
													<TD style="WIDTH: 118px; HEIGHT: 21px"><FONT face="新細明體"><asp:dropdownlist id="dlDeptNew" runat="server" Width="112px" Height="23px"></asp:dropdownlist></FONT></TD>
												</TR>
												<TR>
													<TD style="WIDTH: 108px; HEIGHT: 21px" class="LeftCol" align="right"><FONT face="新細明體"><asp:label id="Label25" class="RequireField" tabIndex="-1" runat="server">新負責科別：</asp:label></FONT></TD>
													<TD style="WIDTH: 118px; HEIGHT: 21px"><FONT face="新細明體"><asp:dropdownlist id="dlSectNew" runat="server" Width="112px" Height="23px"></asp:dropdownlist></FONT></TD>
												</TR>
												<TR>
													<TD style="WIDTH: 108px; HEIGHT: 21px" class="LeftCol" align="right"><FONT face="新細明體"><asp:label id="Label27" class="RequireField" tabIndex="-1" runat="server">新負責人：</asp:label></FONT></TD>
													<TD style="WIDTH: 118px; HEIGHT: 21px"><FONT face="新細明體"><asp:dropdownlist id="dlUserNew" runat="server" Width="112px" Height="23px"></asp:dropdownlist></FONT></TD>
												</TR>
												<TR>
													<TD style="WIDTH: 106px" class="LeftCol" align="right"><asp:label id="Label10" tabIndex="-1" runat="server" Width="105px" CssClass="InputFieldText"> 移交公文數： </asp:label></TD>
													<TD><asp:label id="Label11" runat="server"></asp:label><asp:label id="Label12" tabIndex="-1" runat="server" Width="70px" CssClass="InputFieldText"> 份公文</asp:label></TD>
												</TR>
											</TABLE>
										</FIELDSET>
									</FONT>
								</TD>
							</TR>
						</TABLE>
				<TR>
					<TD style="WIDTH: 565px"><iewc:toolbar id="tbSelect" runat="server" Width="228px" Font-Size="X-Small" EnableViewState="False">
							<iewc:ToolbarButton Text="全部選取" ImageUrl="../../../STD/IMAGE/SELECTALL_E.gif" ID="btSelectAll" ToolTip="勾選所有的CheckBox"></iewc:ToolbarButton>
							<iewc:ToolbarButton Text="反向選取" ImageUrl="../../../STD/IMAGE/INVERSE_E.gif" ID="btSelectInverse" ToolTip="反向勾選所有的CheckBox"></iewc:ToolbarButton>
							<iewc:ToolbarButton Text="清除選取" ImageUrl="../../../STD/IMAGE/SELECTALL_D.gif" ID="btSelectClear" ToolTip="清除勾選所有的CheckBox"></iewc:ToolbarButton>
						</iewc:toolbar></TD>
				</TR>
				</TD></TR>
				<TR>
					<TD colSpan="2"><asp:datagrid style="Z-INDEX: 0" id="dg1" runat="server" Width="872px" Height="8px" ForeColor="Black"
							BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" BorderWidth="1px" CellPadding="4" GridLines="Vertical"
							AutoGenerateColumns="False">
							<FooterStyle BackColor="#CCCC99"></FooterStyle>
							<SelectedItemStyle Font-Bold="True" ForeColor="White" BackColor="#CE5D5A"></SelectedItemStyle>
							<AlternatingItemStyle BackColor="White"></AlternatingItemStyle>
							<ItemStyle BackColor="#F7F7DE"></ItemStyle>
							<HeaderStyle Font-Bold="True" Wrap="False" HorizontalAlign="Center" ForeColor="White" BackColor="#6B696B"></HeaderStyle>
							<Columns>
								<asp:TemplateColumn HeaderText="選">
									<HeaderStyle Font-Size="Smaller" Wrap="False" Width="3pt"></HeaderStyle>
									<HeaderTemplate>
										<asp:Label id="Label6" runat="server">選</asp:Label>
									</HeaderTemplate>
									<ItemTemplate>
										<asp:CheckBox id="Checkbox1" onclick="SelectItem('DOC_CHECK')" runat="server"></asp:CheckBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="序">
									<HeaderStyle Wrap="False" Width="60px"></HeaderStyle>
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
									<ItemTemplate>
										<asp:Label id="Label8" runat="server" Width="60px" CssClass=""></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="文(編)號">
									<HeaderStyle Wrap="False"></HeaderStyle>
									<ItemTemplate>
										<asp:Label id="lbDocNo" runat="server" Width="88" CssClass=""></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="檔號(年-分類-案-卷-目)">
									<HeaderStyle></HeaderStyle>
									<HeaderTemplate>
										<asp:Label style="Z-INDEX: 0" id="ldFileNo" runat="server">檔號(年-分類-案-卷-目)</asp:Label>
									</HeaderTemplate>
									<ItemTemplate>
										<asp:Label id="Label14" runat="server" CssClass="hide" Width="176px"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨摘要">
									<HeaderStyle Wrap="False"></HeaderStyle>
									<ItemTemplate>
										<asp:Label id="lbSubject" runat="server" Width="200px" Font-Size="Smaller"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
							<PagerStyle HorizontalAlign="Right" ForeColor="Black" BackColor="#F7F7DE" Mode="NumericPages"></PagerStyle>
						</asp:datagrid></TD>
				</TR>
			</TABLE>
			</TD></TR>
			<TR>
				<TD style="WIDTH: 10%"></TD>
				<TD style="WIDTH: 80%" vAlign="top" align="center"><FONT face="新細明體"></FONT></TD>
				<TD style="WIDTH: 10%"></TD>
			</TR>
			</TBODY></TABLE><iewc:toolbar id="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" Font-Size="X-Small"
				EnableViewState="False">
				<iewc:ToolbarButton Text="開啟(O)" ImageUrl="../../../STD/IMAGE/MODIFY_E.gif" DefaultStyle="newmode:block;modifymode:none;"
					ID="btOpen" AccessKey="O" ToolTip="查詢(ALT+F)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="搜尋可移交公文(F)" ImageUrl="../../../STD/IMAGE/Search_E.gif" DefaultStyle="newmode:block;modifymode:none;"
					ID="btSearch" AccessKey="F" ToolTip="查詢(ALT+F)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="建立移交批號(S)" ImageUrl="../../../STD/IMAGE/Save_E.gif" DefaultStyle="newmode:block;modifymode:none;"
					ID="btSave" AccessKey="F" ToolTip="儲存(ALT+S)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="儲存(M)" ImageUrl="../../../STD/IMAGE/Save_E.gif" DefaultStyle="newmode:block;modifymode:none;"
					ID="btUpdate" AccessKey="M" ToolTip="儲存(ALT+M)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="刪除(D)" ImageUrl="../../../STD/IMAGE/Delete_E.gif" DefaultStyle="newmode:block;modifymode:none;"
					ID="btDelete" AccessKey="F" ToolTip="刪除(ALT+d)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="登錄(U)" ImageUrl="../../../STD/IMAGE/Save_E.gif" DefaultStyle="newmode:block;modifymode:none;"
					ID="btUpdateDocMain" AccessKey="U" ToolTip="登錄(ALT+U)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:block;modifymode:none;"></iewc:ToolbarSeparator>
				<iewc:ToolbarButton Text="預覽待移交公文清單" ImageUrl="../../../STD/IMAGE/PRINT_E.gif" ID="btPRVIEWLIST" AccessKey="R"
					ToolTip="清單預覽(ALT+X)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="線上簽核傳送:" ImageUrl="../../../STD/IMAGE/REFRESH_E.gif" DefaultStyle="newmode:none;modifymode:block;"
					ID="btTransfer" AccessKey="T" ToolTip="線上簽核傳送："></iewc:ToolbarButton>
				<iewc:ToolbarDropDownList ID="ddlNextUser" DefaultStyle="newmode:none;modifymode:block;"></iewc:ToolbarDropDownList>
			</iewc:toolbar></FORM>
	</BODY>
</HTML>
