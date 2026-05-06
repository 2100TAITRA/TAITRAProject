<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAC005.aspx.cs" AutoEventWireup="false" Inherits="EA01.EAC005" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>EAC005 分類號及已立案案件查詢視窗</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<link rel="stylesheet" href="../EALIB/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAC005" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericChild.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:textbox id="txOrgNo" runat="server" Width="32px"></asp:textbox><asp:textbox id="txFullText" runat="server" Width="24px"></asp:textbox><asp:textbox id="txClsLvl" runat="server" Width="24px"></asp:textbox><asp:textbox id="txSClsLvl" runat="server" Width="24px"></asp:textbox><asp:textbox id="H_IsPAD" runat="server" Width="24px"></asp:textbox><asp:textbox id="H_Selected" runat="server" Width="24px"></asp:textbox>
				<asp:textbox id="H_txMode" runat="server"></asp:textbox>
				<asp:textbox id="H_txNFROM" runat="server"></asp:textbox>
				<asp:textbox id="H_txVerNo" runat="server"></asp:textbox>
				<asp:textbox id="H_txFileYear" runat="server"></asp:textbox>
				<asp:textbox id="H_txFileCls" runat="server"></asp:textbox>
				<asp:textbox id="H_txDeptNo" runat="server"></asp:textbox>
				<asp:textbox id="H_txShowAll" runat="server"></asp:textbox>
				<asp:textbox id="H_SelectedValue" tabIndex="-1" runat="server" CssClass="hide"></asp:textbox>
                <asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
				<asp:textbox id="H_PerSonClass" runat="server"></asp:textbox>
				<asp:textbox id="H_ActiveWorkMode" runat="server"></asp:textbox>
			</DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div id="tbver">
					<div class="dTR">
						<div class="dTDTitle" style="width: 7.5em;"><asp:label id="Label7" runat="server">版本別：</asp:label></div>
						<div class="dTD"><asp:textbox CssClass="InputFieldNumeric" id="txVerNo" tabIndex="10" runat="server" Width="2.5em" MaxLength="3"></asp:textbox></div>
					</div>
					<div class="dTR" id="HideTR_1">
						<div class="dTDTitle" style="width: 7.5em;"><asp:label id="Label5" runat="server">年度號：</asp:label></div>
						<div class="dTD"><asp:textbox CssClass="InputFieldNumeric" id="txYear" tabIndex="20" runat="server" Width="2.5em" MaxLength="3" ></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 7.5em;"><asp:label id="Label1" runat="server">分類號：</asp:label></div>
						<div class="dTD">
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txClsNo" tabIndex="30" runat="server" Width="10.5em" MaxLength="20" ></asp:textbox>
						</div>
					</div>
					<div class="dTR" id="HideTR_2">
						<div class="dTDTitle" style="width: 7.5em;"><asp:label id="Label2" runat="server">案次號：</asp:label></div>
						<div class="dTD"><asp:textbox onkeypress="jf_UPPERCASE()" id="txCaseNo" tabIndex="40" runat="server" Width="7em" MaxLength="12" ></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 7.5em;"><asp:label id="lbNames" runat="server">類目名稱/案名：</asp:label></div>
						<div class="dTD"><asp:textbox id="txClsCaseName" tabIndex="50" runat="server" Width="20.5em" MaxLength="100" ></asp:textbox></div>
					</div>
						</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 7.5em;"><asp:label id="Label3" runat="server">名稱/編號查詢：</asp:label></div>
						<div class="dTD"><asp:textbox id="txSearchData" tabIndex="50" runat="server" Width="20.5em" MaxLength="100" ></asp:textbox></div>
					</div>
				</div>
				<div class="DivTable">
					<div id="userclasstr" style="overflow: auto;">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="9" CssClass="hide">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn ItemStyle-HorizontalAlign="Center" HeaderText="常用分類號">
									<ItemTemplate>
										<asp:HyperLink id="hlClsNo" tabIndex="0" runat="server"></asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
			 </div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD" id="Data">
							<div class="GridDiv" style="Height:300px">
								<ul id="Classtree" class="ztree"></ul>
							</DIV>
						</DIV>
					</DIV>
					</div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:none;"/>
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;"/>
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass = "hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;"/>
				<asp:Button ID="btPreview2" runat="server" Text="分類表(S)" AccessKey="S" Style="display: none" DefaultStyle="newmode:block;modifymode:none;"/>
				<asp:Button ID="btExcel" runat="server" Text="匯出分類表EXCEL" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;"/>
				<asp:Button ID="btODS" runat="server" Text="匯出分類表ODS" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;"/>
			</asp:Panel>
		</FORM>
	</BODY>
	<script type="text/javascript" src="../EALIB/jquery.ztree.core-3.5.js"></script>
	<script type="text/javascript" src="../EALIB/jquery.ztree.exhide-3.5.js"></script>
</HTML>
