<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="TBT170.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBT170" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>TBT170 轉入公告失敗張貼作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="TBT170" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../TBLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:TextBox id="txBulletinIdForAction" runat="server" Width="80px"></asp:TextBox>
				<asp:TextBox id="txActionType" runat="server" Width="80px"></asp:TextBox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
                    <div class="DivTable" id="MainTable">
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 6em">
                                <asp:label id="Label5" runat="server">轉入日期：</asp:label></div>
                            <div class="dTD">
                                <asp:textbox id="txTranindates" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
                                <asp:textbox id="txTranindatee" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 6em">
                                <asp:label id="Label1" runat="server">公告登載日：</asp:label></div>
                            <div class="dTD">
                                <asp:textbox id="txPasteDates" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
                                <asp:textbox id="txPasteDatee" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 6em">
                                <asp:label id="Label3" runat="server">狀態：</asp:label></div>
                            <div class="dTD" style="WIDTH: 15em">
								<asp:RadioButton ID="rbTranFail" runat="server" Text="轉入失敗" GroupName="rbBoardSide" ></asp:RadioButton>
								<asp:RadioButton ID="rbPasteFail" runat="server" Text="發布失敗" GroupName="rbBoardSide" ></asp:RadioButton>
                                <asp:RadioButton ID="rbBoth" runat="server" Text="全部" GroupName="rbBoardSide" ></asp:RadioButton>
                            </div>
                        </div>
                    </div>
                <div class="DivTable" id="GridTable">
                    <div class="dTR">
                        <div class="dTD" align="center" colspan="3">
                            <DIV class="GridDiv" style="HEIGHT: 310px">
                                <asp:datagrid id="dg1" runat="server" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE"
                                    ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False"
                                    Height="1px" PageSize="30">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="選">
                                            <ItemTemplate>
                                                <asp:CheckBox id="ckBox" runat="server"></asp:CheckBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="公告登載日">
                                            <ItemTemplate>
                                                <asp:Label id="lbPasteDate" runat="server"></asp:Label>
                                                <asp:Label id="hlbPasteDate" runat="server" CssClass="hide"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="公告發文字號">
                                            <ItemTemplate>
                                                <asp:Label id="lbSenNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="主旨">
                                            <ItemTemplate>
                                                <asp:Label id="lbsubject" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="異常原因">
                                            <ItemTemplate>
                                                <asp:Label id="lberrreason" runat="server"></asp:Label>
                                                <asp:Label id="hlbservername" runat="server" CssClass="hide"></asp:Label>
                                                <asp:Label id="hlstastus" runat="server" CssClass="hide"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:datagrid>
                            </DIV>
                        </div>
                    </div>
                </div>
			</div>
            <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜尋" AccessKey="P" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btSave" runat="server" Text="張貼" AccessKey="S" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btUpdate" runat="server" AccessKey="L" Text="註記已張貼" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
        </FORM>
	</BODY>
</HTML>
