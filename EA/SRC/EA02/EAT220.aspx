<%@ Page language="c#" Codebehind="EAT220.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAT220" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT220 檔案編目作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY id="Test1" scroll="yes" MS_POSITIONING="GridLayout">
		<FORM id="EAT220" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="txBegVol" runat="server" Width="4.5em" CssClass="hide"></asp:textbox><asp:textbox id="txVolArr" runat="server" Width="4.5em" CssClass="hide"></asp:textbox><asp:textbox id="txVolPage" runat="server" Width="3.5em" CssClass="hide"></asp:textbox><asp:textbox id="txVolName" runat="server" Width="3.5em" CssClass="hide"></asp:textbox><asp:textbox id="txServerName" runat="server" Width="4.5em" CssClass="hide"></asp:textbox><asp:textbox id="txOrgNo" runat="server" Width="3.5em" CssClass="hide"></asp:textbox><asp:textbox id="txOrgName" runat="server" Width="3.5em" CssClass="hide"></asp:textbox><asp:textbox id="txDeptNo" runat="server" Width="3.5em" CssClass="hide"></asp:textbox><asp:textbox id="txEmpName" runat="server" Width="3.5em" CssClass="hide"></asp:textbox><asp:textbox id="txUserName" runat="server" Width="3.5em" CssClass="hide"></asp:textbox><asp:textbox id="txBtNextVol" runat="server" CssClass="hide"></asp:textbox><asp:textbox id="txCallBack_id" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="txImageDocNo" runat="server" Width="78px" CssClass="hide"></asp:textbox><asp:button id="btImage" tabIndex="50" runat="server" CssClass="hide" Text="影像"></asp:button><asp:button id="btChangeMode" runat="server" CssClass="hide" Text="變更模式"></asp:button></DIV></DIV>
			</DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5em; "><asp:label id="Label1" runat="server" >年度號：</asp:label></DIV>
						<DIV class="dTD" style="width: 14em; ">
							<asp:textbox id="txYear" style="IME-MODE: disabled" tabIndex="10" runat="server" Width="2.5em"></asp:textbox>
							<asp:dropdownlist id="dlYear" tabIndex="11" runat="server"></asp:dropdownlist>
							<asp:textbox id="txPreYear" runat="server" Width="4.5em" CssClass="hide"></asp:textbox>
						</DIV>
						<DIV class="dTDTitle" style="width: 5em; "><asp:label id="Label3" runat="server" >案次號：</asp:label></DIV>
						<DIV class="dTD" style="width: 10em; ">
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txCase" style="IME-MODE: disabled" runat="server" Width="7.5em" MaxLength="12" ></asp:textbox>
							<asp:imagebutton id="ibtCASE" runat="server" ImageUrl="../../../STDN/IMAGE/HELPWIN_E.gif"></asp:imagebutton>
							<asp:textbox id="txPreCase" runat="server" Width="5.5em" CssClass="hide"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 5em; "><asp:label id="Label2" runat="server" >分類號：</asp:label></DIV>
						<DIV class="dTD" style="width: 14em; ">
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txCls" style="IME-MODE: disabled" tabIndex="21" runat="server" Width="11.5em" MaxLength="20" ></asp:textbox>
							<asp:imagebutton id="ibtCLS" tabIndex="20" runat="server" ImageUrl="../../../STDN/IMAGE/HELPWIN_E.gif"></asp:imagebutton><asp:textbox id="txPreCls" runat="server" Width="4.5em" CssClass="hide"></asp:textbox>
							<asp:dropdownlist id="dlDeptNo" runat="server" CssClass="hide"></asp:dropdownlist>
						</DIV>
						<DIV class="dTDTitle" style="width: 5em; ">&nbsp;<asp:label id="Label4" runat="server" >案&nbsp;&nbsp;&nbsp;&nbsp;名：</asp:label></DIV>
						<DIV class="dTD" style="width: 10em; "><asp:label id="lbCaseName" runat="server" Width="28.5em" ></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 34em; ">
							<asp:button id="btStart" accessKey="O" tabIndex="30" runat="server" Text="開啟(O)"></asp:button>
							<asp:textbox id="txOrder" runat="server" Width="3.5em" CssClass="hide"></asp:textbox>
							<asp:textbox id="txFilePath" runat="server" Width="3.5em" CssClass="hide"></asp:textbox>
							<asp:textbox id="txMode" runat="server" Width="3.5em" CssClass="hide"></asp:textbox>
							<asp:textbox id="txMoveList" runat="server" Width="8.5em" CssClass="hide"></asp:textbox>
							<asp:textbox id="txMoveType" runat="server" Width="4.5em" CssClass="hide"></asp:textbox>
							<asp:textbox id="txSAMLart" runat="server" Width="5.5em" CssClass="hide"></asp:textbox>
							<asp:textbox id="txAcc" runat="server" Width="5.5em" CssClass="hide"></asp:textbox>
							<asp:button id="TestAction" runat="server" CssClass="hide" Text="Button"></asp:button>
							<asp:button accessKey="O" style="Z-INDEX: 0" id="btRefile" tabIndex="30" runat="server" Text="本卷重新編目(R)"></asp:button>
						</DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<TABLE id="TEST" style="HEIGHT: 1px"></TABLE>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<asp:button id="btMoveUp" runat="server" Text="移至上一卷"></asp:button>
							<asp:button id="btMoveNext" runat="server" Text="移至下一卷"></asp:button>
							<asp:label id="lbSelectSeqCnt" runat="server" Width="610px"></asp:label>
							<asp:button id="btPrint1" accessKey="P" runat="server" Text="列印目次表(P)" ToolTip="列印目次表"></asp:button>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class = "GridDiv" style="HEIGHT: 293px;">
								<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
									<HeaderStyle HorizontalAlign="Center" ForeColor="White" BackColor="#5f9cc5"></HeaderStyle>
									<Columns>
										<asp:TemplateColumn HeaderText="<input type=checkbox id=cbHead onclick=cbAllOnclick() >">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="<span id=dglb1 onclick=fn_Order('VOLUME') >影像">
											<ItemTemplate>
												<asp:Label id="lbNoImg" runat="server" CssClass="hide"></asp:Label>
												<asp:Image id="ib1" runat="server" CssClass="HandCurs" ImageUrl="../../../STDN/IMAGE/CAMERA_T.gif"></asp:Image>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="<span id=dglb2 onclick=fn_Order('FILE_SEQ') >目次號">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server" Width="60px"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="<span id=dglb3 onclick=fn_Order('ID1') >本校文號">
											<ItemTemplate>
												<P>
													<asp:HyperLink id="hlDocNo" runat="server" Width="90px"></asp:HyperLink>
													<asp:Label id="lbComNo" runat="server" CssClass="hide"></asp:Label>
													<asp:Label id="lbComStatus" runat="server" CssClass="hide"></asp:Label></P>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="<span id=dglb4 onclick=fn_Order('COM_NO') >併文">
											<ItemTemplate>
												<asp:Label id="lbCom_N" runat="server"></asp:Label>
												<asp:HyperLink id="hlCom_Y" runat="server" Width="40px"></asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="<span id=dglb5 onclick=fn_Order('FROM_SUBJECT') >主旨">
											<ItemTemplate>
												<asp:Label id="lbSubject" runat="server" Width="330px"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="<span id=dglb6 onclick=fn_Order('FILE_CLS') >分類號<br>保存年限">
											<ItemTemplate>
												<asp:Label id="lbCls" runat="server" Width="80px"></asp:Label><BR>
												<asp:Label id="lbKeeyYear" runat="server" Width="80px"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="<span id=dglb7 onclick=fn_Order('DEPT_NAME,EMP_NAME') >承辦單位/承辦人">
											<ItemTemplate>
												<asp:Label id="lbDept" runat="server" Width="170px"></asp:Label>
												<asp:Label id="lbEmp" runat="server" Width="170px"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="<span id=dglb8 onclick=fn_Order('CURR_LOCATION') >現在位置">
											<ItemTemplate>
												<asp:HyperLink id="hlDept" runat="server" Width="100px"></asp:HyperLink>
												<asp:Label id="lbDeptNo" runat="server" CssClass="hide"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btClean" runat="server" Text="清畫面(C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
