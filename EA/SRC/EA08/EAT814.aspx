<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAT814.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT814" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT814 移交登錄作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY>
		<FORM id="EAT814" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:TextBox ID="authWS" runat="server"></asp:TextBox>
				<asp:TextBox ID="txOuId_A" runat="server"></asp:TextBox>
				<asp:TextBox ID="txOuId_T" runat="server"></asp:TextBox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label1" runat="server">申請單號：</asp:label></div>
                        <div class="dTD" style="WIDTH: 14em">
                            <asp:textbox id="txApplyNo" runat="server" tabIndex="1" Width="4.5em" MaxLength="8" ></asp:textbox>
                        </div>
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:label id="Label2" runat="server">申請日期：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txApplyDate" tabIndex="-1" runat="server" Width="5em"></asp:textbox>
                        </div>
                    </div>
                    <DIV class="dTR">
                        <DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label3" runat="server">承辦人：</asp:label>
                          </DIV>
                          <DIV class="dTD">
							<asp:textbox id="txDept_A" tabIndex="-1" runat="server" Width="8.5em"></asp:textbox>&nbsp;
							<asp:textbox id="txUserName_A" tabIndex="-1" runat="server" Width="5.5em"></asp:textbox>&nbsp;
							<asp:textbox id="txEmpName_A" tabIndex="-1" runat="server" Width="5.5em"></asp:textbox>
                        </DIV>
					</DIV>
                    <DIV class="dTR">
                        <DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label4" runat="server">接管人：</asp:label>
                          </DIV>
                          <DIV class="dTD">
							<asp:textbox id="txDept_T" tabIndex="-1" runat="server" Width="8.5em"></asp:textbox>&nbsp;
							<asp:textbox id="txUserName_T" tabIndex="-1" runat="server" Width="5.5em"></asp:textbox>&nbsp;
							<asp:textbox id="txEmpName_T" tabIndex="-1" runat="server" Width="5.5em"></asp:textbox>
                        </DIV>
					</DIV>
                    <DIV class="dTR">
                        <DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label5" runat="server">申請說明：</asp:label>
                          </DIV>
                          <DIV class="dTD">
							<asp:textbox id="txAppReason" tabIndex="-1" runat="server" Width="40.5em" TextMode="MultiLine"></asp:textbox>
                        </DIV>
					</DIV>
                    <DIV class="dTR">
                        <DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label6" runat="server">簽核者：</asp:label>
                          </DIV>
                          <DIV class="dTD">
							<asp:textbox id="txUserName_S" runat="server" Width="5.5em"></asp:textbox>&nbsp;
							<asp:textbox id="txEmpName_S" tabIndex="-1" runat="server" Width="5.5em"></asp:textbox>&nbsp;
							<asp:imagebutton id="ibHelp" tabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:imagebutton>
                        </DIV>
					</DIV>
                    <DIV class="dTR">
                        <DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label7" runat="server">簽核意見：</asp:label>
                          </DIV>
                          <DIV class="dTD">
							<asp:textbox id="txSignReason" runat="server" Width="40.5em" MaxLength="200"></asp:textbox>
                        </DIV>
					</DIV>
                </DIV>
            </DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
