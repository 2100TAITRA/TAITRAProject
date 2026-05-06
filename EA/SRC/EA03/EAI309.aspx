<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAI309.aspx.cs" AutoEventWireup="false" Inherits="EA03.EAI309" %>
<!DOCTYPE HTML>
<HTML>
  <HEAD>
		<TITLE>EAI309 調案處理查詢作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
  </HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAI309" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label1" runat="server">調案日期：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txBorDateS" tabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric"
                                MaxLength="7"></asp:textbox>--
                            <asp:textbox id="txBorDateE" tabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric"
                                MaxLength="7"></asp:textbox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label2" runat="server">應歸日期：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txReturnDateS" tabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric"
                                MaxLength="7"></asp:textbox>--
                            <asp:textbox id="txReturnDateE" tabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric"
                                MaxLength="7"></asp:textbox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label3" runat="server">調案單位：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlBorDept" runat="server" ></asp:dropdownlist></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label4" runat="server">公文文號：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txDocNo" tabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label5" runat="server">來文文號：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txFromNo" tabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label6" runat="server">調案方式：</asp:label></div>
                        <div class="dTD">
                            <asp:radiobutton id="rbOriFile" runat="server" Checked="true" Text="檔案原件" groupname="GetWay"></asp:radiobutton>
                            <asp:radiobutton id="rbCopyFile" runat="server" Text="檔案複製品" groupname="GetWay"></asp:radiobutton>
                            <asp:radiobutton id="rbOnlineFile" runat="server" Text="線上調檔" groupname="GetWay"></asp:radiobutton>
                            <asp:radiobutton id="rbAllFile" runat="server" Text="全部" groupname="GetWay"></asp:radiobutton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label7" runat="server">歸還狀態：</asp:label></div>
                        <div class="dTD">
                            <asp:radiobutton id="rbUnRecord" runat="server" Text="未登錄" groupname="ReturnStatus"></asp:radiobutton>
                            <asp:radiobutton id="rbUnReturn" runat="server" Checked="true" Text="未歸還" groupname="ReturnStatus"></asp:radiobutton>
                            <asp:radiobutton id="rbReturn" runat="server" Text="已歸還" groupname="ReturnStatus"></asp:radiobutton>
                            <asp:radiobutton id="rbAllStatus" runat="server" Text="全部" groupname="ReturnStatus"></asp:radiobutton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label8" runat="server">排序：</asp:label></div>
                        <div class="dTD">
                            <asp:radiobutton id="rbDate" runat="server" Checked="true" Text="調案日期" groupname="SortWay"></asp:radiobutton>
                            <asp:radiobutton id="rbDocNo" runat="server" Text="調案單號" groupname="SortWay"></asp:radiobutton></div>
                    </div>
                </div>
                <div class="DivTable" id="GridTable">
                    <div class="dTR">
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 288px; ">
                                <asp:datagrid id="dg1" runat="server" PageSize="30" AutoGenerateColumns="False"
                                    GridLines="Vertical" CellPadding="0" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSEQ_NO" runat="server" ></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="處理">
                                            <ItemTemplate>
                                                <asp:Button id="btHandle" runat="server" Visible="false"></asp:Button>
                                                <asp:Label id="lbHandle" runat="server" ></asp:Label>
                                                <asp:Label id="lbStatus" runat="server" CssClass="hide"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="調案日期">
                                            <ItemTemplate>
                                                <asp:Label id="lbBorDate" runat="server" ></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="應歸還日期">
                                            <ItemTemplate>
                                                <asp:Label id="lbReturnDate" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="調案單號">
                                            <ItemTemplate>
                                                <asp:Label id="lbBorNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="公文文號">
                                            <ItemTemplate>
                                                <asp:Label id="lbDocNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="檔號">
                                            <ItemTemplate>
                                                <asp:Label id="lbFileNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="調案單位">
                                            <ItemTemplate>
                                                <asp:Label id="lbBorDept" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="調案人">
                                            <ItemTemplate>
                                                <asp:Label id="lbBorName" runat="server"></asp:Label>
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
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
        </FORM>
	</BODY>
</HTML>
