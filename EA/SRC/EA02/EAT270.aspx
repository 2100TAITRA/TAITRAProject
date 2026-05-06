<%@ Page language="c#" Codebehind="EAT270.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAT270" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT270 批次編目作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT270" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:dropdownlist id="dlSec" runat="server" Width="30px"></asp:dropdownlist><asp:textbox id="H_No" tabIndex="-1" runat="server" Width="20px"></asp:textbox><asp:textbox id="H_DocType" tabIndex="-1" runat="server" Width="20px" ></asp:textbox>
				<asp:textbox id="txDocInfo" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="H_DATA" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:TextBox id="H_CrtDate" tabIndex="-1" runat="server" Width="20px"></asp:TextBox>
				<asp:TextBox id="H_INPFILE_DATE" tabIndex="-1" runat="server" Width="20px"></asp:TextBox>
				<asp:TextBox id="txComInfo" tabIndex="-1" runat="server" Width="20px"></asp:TextBox>
				<asp:TextBox id="H_VolMaxPage" tabIndex="-1" runat="server" Width="20px"></asp:TextBox>
				<asp:TextBox id="H_Tolerance" tabIndex="-1" runat="server" Width="20px"></asp:TextBox>
				<asp:TextBox id="H_DefPage" tabIndex="-1" runat="server" Width="20px"></asp:TextBox>
				<asp:TextBox id="H_ClsKey" tabIndex="-1" runat="server" Width="20px"></asp:TextBox>
				<asp:TextBox id="H_CaseKey" tabIndex="-1" runat="server" Width="20px"></asp:TextBox>
			</DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label1" runat="server" >公文文號：</asp:label></DIV>
						<DIV class="dTD" style="width: 40em; ">
							<asp:textbox id="txDocNo" tabIndex="0" runat="server" Width="6.5em" MaxLength="10" ></asp:textbox>
							<asp:button id="btConfirm" runat="server" Text="確認"></asp:button>
							<asp:checkbox id="cbAutoAdd" runat="server" Text="讀取後自動加入"></asp:checkbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label2" runat="server" >相關文號：</asp:label></DIV>
						<DIV class="dTD" style="width: 10em; ">
							<asp:textbox id="txComNo" tabIndex="0" runat="server" Width="6.5em" MaxLength="10" ></asp:textbox>
							<asp:checkbox id="cbIsCom" runat="server" Text="併件"></asp:checkbox>
						</DIV>
						<DIV class="dTDTitle" style="width: 4em; "><asp:label id="Label4" runat="server" >密等：</asp:label></DIV>
						<DIV class="dTD" style="width: 6em; "><asp:label id="lbSecNm" runat="server" Width="5.5em" ></asp:label>&nbsp</DIV>
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label5" runat="server" >密等流水號：</asp:label></DIV>
						<DIV class="dTD" style="width: 6em; "><asp:textbox id="txSecSeq" tabIndex="0" runat="server" Width="5.5em" MaxLength="8"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; ">&nbsp</DIV>
						<DIV class="dTD" style="width: 9em; "><asp:label id="Label13" runat="server" >年度號</asp:label></DIV>
						<DIV class="dTD" style="width: 11em; "><asp:label id="Label14" runat="server" >分類號</asp:label></DIV>
						<DIV class="dTD" style="width: 7em; "><asp:label id="Label15" runat="server" >案次號</asp:label></DIV>
						<DIV class="dTD" style="width: 5em; "><asp:label id="Label16" runat="server" >卷次號</asp:label></DIV>
						<DIV class="dTD" style="width: 6em; "><asp:label id="Label17" runat="server" >目次號</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label3" runat="server" >檔　　號：</asp:label></DIV>
						<DIV class="dTD" style="width: 40em; ">
							<asp:textbox id="txFileYear" tabIndex="0" runat="server" Width="2.5em" MaxLength="3" ></asp:textbox>
							<asp:label id="Label6" runat="server" >－</asp:label>
							<asp:textbox id="txFileCls" tabIndex="0" runat="server" Width="11.5em" MaxLength="20" ></asp:textbox>
							<asp:imagebutton id="btHelpCls" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif" Visible="False"></asp:imagebutton>
							<asp:label id="Label7" runat="server" >－</asp:label>
							<asp:textbox id="txFileCase" tabIndex="0" runat="server" Width="7.5em" MaxLength="12" ></asp:textbox>
							<asp:imagebutton id="btHelpCase" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif" Visible="False"></asp:imagebutton>
							<asp:label id="Label8" runat="server" >－</asp:label>
							<asp:textbox id="txFileVol" tabIndex="0" runat="server" Width="3.5em" MaxLength="4" ></asp:textbox>
							<asp:label id="Label9" runat="server" >－</asp:label>
							<asp:textbox id="txFileSeq" tabIndex="0" runat="server" Width="2.5em" MaxLength="3" ></asp:textbox>
							<asp:Button id="btAccess" runat="server" Text="套用"></asp:Button>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:checkbox id="cbAutoVol" runat="server" Text="自動換卷"></asp:checkbox></DIV>
						<DIV class="dTD" style="width: 40em; ">
							<asp:label id="Label10" runat="server" >,每卷最大頁：</asp:label>
							<asp:textbox id="txVolMaxPage" tabIndex="0" runat="server" Width="3.5em" MaxLength="4"></asp:textbox>
							<asp:label id="Label11" runat="server" >,寬限值：</asp:label>
							<asp:textbox id="txTolerance" tabIndex="0" runat="server" Width="2.5em" MaxLength="3"></asp:textbox>
							<asp:label id="Label12" runat="server" >,公文預設頁數：</asp:label>
							<asp:textbox id="txDefPage" tabIndex="0" runat="server" Width="2.5em" MaxLength="3"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label20" runat="server" >本次新增：</asp:label></DIV>
						<DIV id="dvNewValue" style="WIDTH: 40em; HEIGHT: 50px; OVERFLOW: auto"></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
								<asp:Button ID="btSelectAll" runat="server" Text="全選" />
								<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
								<asp:Button ID="btSelectClear" runat="server" Text="清除" />
								<asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
							</asp:Panel>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class = "GridDiv" style="HEIGHT: 239px;">
								<asp:datagrid id="dg1" runat="server" PageSize="15" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="公文文號">
											<ItemTemplate>
												<asp:HyperLink id="hlDocNo" tabIndex="0" runat="server" 
													></asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="相關文號">
											<ItemTemplate>
												<asp:Label id="lbComNo" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="併">
											<ItemTemplate>
												<asp:Label id="lbIsComNo" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="密等">
											<ItemTemplate>
												<asp:Label id="lbSecName" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="密件流水號">
											<HeaderTemplate>
												<asp:Label id="Label18" runat="server">密件</asp:Label><BR>
												<asp:Label id="Label19" runat="server">流水號</asp:Label>
											</HeaderTemplate>
											<ItemTemplate>
												<asp:Label id="lbSecSeq" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="年-分類-案-卷-號">
											<ItemTemplate>
												<asp:Label id="lbFileNo" runat="server" ></asp:Label>
												<asp:Label id="lbDocType" runat="server" CssClass="hide"></asp:Label>
												<asp:Label id="lbCrtDate" runat="server" CssClass="hide"></asp:Label>
												<asp:Label id="lbClsCaseKey" runat="server" CssClass="hide"></asp:Label>
												<asp:Label ID="lbInpFileDate" runat="server" CssClass="hide"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="檔案<BR>數量">
											<ItemTemplate>
												<asp:TextBox id="txFILE_CNT" runat="server" Width="3.5em"></asp:TextBox>
												<asp:DropDownList ID="dlFILE_UNIT" Runat="server" Width="3.5em"></asp:DropDownList>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="附件<BR>資訊">
											<ItemTemplate>
												<asp:Label id="lbFILE_Attach" runat="server" ></asp:Label>
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
				<asp:Button ID="btSave" runat="server" Text="批次編目" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
