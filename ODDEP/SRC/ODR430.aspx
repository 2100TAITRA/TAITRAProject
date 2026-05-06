<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODR430.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR430" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR430 公文時效統計查詢列印</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="ODR430" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox style="Z-INDEX: 102; POSITION: absolute; TOP: 102px; LEFT: 10px" id="lbReturnValue" runat="server" CssClass="hide"></asp:listbox>
            <asp:customvalidator style="Z-INDEX: 103; POSITION: absolute; TOP: 218px; LEFT: 12px" id="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary style="Z-INDEX: 104; POSITION: absolute; TOP: 252px; LEFT: 12px" id="ValidationSummary1" runat="server" CssClass="hidden"></asp:validationsummary>
			<asp:TextBox style="Z-INDEX: 105; POSITION: absolute; TOP: 616px; LEFT: 464px" id="txODPrivilege" runat="server" CssClass="hide"></asp:TextBox>
			<cc1:combobox id="lbDept" runat="server" CssClass="hide" Width="95px"></cc1:combobox>
			<asp:textbox id="H_dlSect_Value" runat="server" CssClass="hide" Width="19px"></asp:textbox>
			<asp:textbox id="H_dlSect_Text" runat="server" CssClass="hide" Width="19px"></asp:textbox>
			<asp:textbox id="h_txYM" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_txOrgno" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_txOrgName" runat="server" CssClass="hide"></asp:textbox>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MTable1" class="DivTable">
					<DIV class="dTR">
						<DIV style="WIDTH: 6em" class="dTDTitle">
							<asp:label id="Label1" class="KeyField" runat="server" CssClass="RequireField">列印月份：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txSMon" class="KeyUpperField" tabIndex="10" runat="server" CssClass="RequireFieldNumeric"	Width="3em" MaxLength="5"></asp:textbox>－
							<asp:textbox id="txEMon" class="KeyUpperField" tabIndex="15" runat="server" CssClass="RequireFieldNumeric"	Width="3em" MaxLength="5"></asp:textbox>&nbsp;&nbsp;&nbsp;&nbsp;
							<asp:checkbox id="cbInterval" tabIndex="59" runat="server" Text="區間列印"></asp:checkbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 6em" class="dTDTitle">
							<asp:label id="Label2" runat="server">列印單位：</asp:label>
						</DIV>
						<DIV class="dTD">
							<cc1:combobox id="dlDept" runat="server" Width="6em" CssClass="comboBox"></cc1:combobox>
							<cc1:combobox id="dlSect" tabIndex="45" runat="server" Width="7em" MaxLength="0" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 6em" class="dTDTitle">
							<asp:label id="Label5" runat="server">公文性質：</asp:label>
						</DIV>
						<DIV class="dTD">
							<DIV class="dTR">
								<asp:dropdownlist id="ddlProperty" tabIndex="80" runat="server" Width="8.5em"></asp:dropdownlist>
							</DIV>
							<DIV class="dTR">
								<asp:checkbox id="cbSubOu" runat="server"></asp:checkbox>
							    <asp:label id="lbSubOu" runat="server">含二級單位</asp:label>
							</DIV>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<asp:label id="lbMaxYear" runat="server">目前統計最大年月：888年88月</asp:label>
						</DIV>
					</DIV>		
					<DIV id="rptTypeRRB"  class="dTR">
						<DIV style="WIDTH: 6em" class="dTDTitle"><asp:label id="Label6" runat="server" CssClass="InputFieldText">報表種類：</asp:label></DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbTypeRRB1" tabIndex="60" runat="server" Text="綜合格式"	GroupName="RptTypeRRB"></asp:radiobutton><br/>
							<asp:radiobutton id="rbTypeRRB2" tabIndex="60" runat="server" Text="各單位以案管制統計表"	GroupName="RptTypeRRB"></asp:radiobutton><br/>
							<asp:radiobutton id="rbTypeRRB3" tabIndex="60" runat="server" Text="公文處理績優人員推薦表"	GroupName="RptTypeRRB"></asp:radiobutton>
						</DIV>
					</DIV>					
				    <DIV class="dTR" id="dvRptType" runat="server">
					    <DIV style="WIDTH: 6em" class="dTDTitle">
						    <asp:label id="Label3" runat="server">報表種類：</asp:label>
					    </DIV>
					    <DIV style="WIDTH: 25em" class="dTD">
						    <DIV class="dTR"><asp:radiobutton id="rbType1" tabIndex="60" runat="server" Text="依6日、30日辦結區分" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbType1_SaveDay" tabIndex="60" runat="server" Text="依6日、30日辦結區分(含存查天數欄位)" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbType2" tabIndex="60" runat="server" Text="依3日、6日、15日、30日辦結區分" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbUser" tabIndex="60" runat="server" Text="承辦人格式" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbType3" tabIndex="60" runat="server" Text="依6日、15日、30日辦結區分" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbType9" tabIndex="60" runat="server" Text="依6日、15日、30日辦結區分(含其他公文性質)" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbType4" tabIndex="60" runat="server" Text="依6日、30日辦結區分(含存查平均日數欄位)" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbType10" tabIndex="60" runat="server" Text="依6日、30日辦結區分(含已逾限率及未逾限率欄位)" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbType8" tabIndex="60" runat="server" Text="依6日、30日辦結區分(含受理會稿平均日數)" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbTypeCom" tabIndex="60" runat="server" Text="綜合格式(含會辦公文統計資料)" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbType7" tabIndex="60" runat="server" Text="一般公文時效分析比較表" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbType5" tabIndex="60" runat="server" Text="當月公文未結案統計表" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbType6" tabIndex="60" runat="server" Text="當月及上月公文時效辦結率統計比較表" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbTypeVGH" tabIndex="60" runat="server" Text="公文處理速度統計表" GroupName="RptType"></asp:radiobutton></DIV>
						    <DIV class="dTR"><asp:radiobutton id="rbType1VGH" tabIndex="60" runat="server" Text="公文處理統計分析表" GroupName="RptType"></asp:radiobutton></DIV>
					    </DIV>
				    </DIV>
				</DIV>	
			</DIV>			
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btStatic" runat="server" Text="統計" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btShowDiffList" runat="server" Text="瀏覽鎖定欄位異動清單" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" AccessKey="C" Title="匯出ODS(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btWord" runat="server" Text="匯出Word" Title="匯出WORD" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>	

		</form>
	</body>
</HTML>
