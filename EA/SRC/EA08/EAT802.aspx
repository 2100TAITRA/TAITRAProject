<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAT802.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT802" %> 
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT802 申請查詢作業</TITLE>
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
		<FORM id="EAT802" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
                <div class="DivTable" id="Table1">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:label id="Label11" runat="server"  >申請單號：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txAppBegin" runat="server" Width="5.5em" MaxLength="10" ></asp:textbox>
                            <asp:label id="Label5" runat="server" >～</asp:label>
                            <asp:textbox id="txAppEnd" runat="server" Width="5.5em" MaxLength="10" ></asp:textbox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:label id="Label10" runat="server" >申請日期：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="dateBegin" runat="server" Width="4em" MaxLength="7" ></asp:textbox>
                            <asp:label id="Label6" runat="server" >至</asp:label>
                            <asp:textbox id="dateEnd" runat="server" Width="4em" MaxLength="7" ></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:label id="Label9" runat="server" >申請單位：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlDept" runat="server" AutoPostBack="True" ></asp:dropdownlist></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:label id="Label8" runat="server" >申請人：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlAccount" runat="server"  Width="5em"></asp:dropdownlist></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:label id="Label1" runat="server" >申請類別：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlapptype" runat="server" ></asp:dropdownlist></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:label id="Label7" runat="server" >狀態：</asp:label></div>
                        <div class="dTD">
                            <asp:checkbox id="cb1" runat="server" Text="審核中" ></asp:checkbox>
                            <asp:checkbox id="cb2" runat="server" Text="待登錄" ></asp:checkbox>
                            <asp:checkbox id="cb3" runat="server" Text="已登錄" ></asp:checkbox>
                            <asp:checkbox id="cb4" runat="server" Text="退回" ></asp:checkbox>
                        </div>
                    </div>
                </div>
                <div class="DivTable" id="GridTable">
                    <div class="dTR">
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 270px">
                                <asp:datagrid id="dg1" runat="server" Height="1px" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="15" EnableViewState="False">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSEQ_NO" runat="server" ></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="申請單號">
                                            <ItemTemplate>
                                                <asp:HyperLink id="hlLink" tabIndex="0" runat="server"></asp:HyperLink>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="申請單位">
                                            <ItemTemplate>
                                                <asp:Label id="lbRead1" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="申請人">
                                            <ItemTemplate>
                                                <asp:Label id="lbRead2" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="申請類別">
                                            <ItemTemplate>
                                                <asp:Label id="lbRead3" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="狀態">
                                            <ItemTemplate>
                                                <asp:Label id="lbRead4" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="目前所在流程">
                                            <ItemTemplate>
                                                <asp:Label id="lbRead5" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="簽核歷程">
                                            <ItemTemplate>
                                                <asp:Button id="btopen" runat="server" Width="3em" Text="瀏覽"></asp:Button>
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
				<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
        </FORM>
	</BODY>
</HTML>
