<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="TBR151.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBR151" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>TBR151 查詢特定公告之查閱與未查閱人員</TITLE>
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
		<FORM id="TBR151" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../TBLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:TextBox id="txBulletinIdForAction" runat="server" Width="80px"></asp:TextBox>
				<asp:TextBox id="txActionType" runat="server" Width="80px"></asp:TextBox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
                <fieldset>
                    <legend>搜尋條件</legend>
                    <div class="DivTable" id="MainTable">
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 5em">
                                <asp:label id="Label2" runat="server">公文文號：</asp:label></div>
                            <div class="dTD" style="WIDTH: 11em">
                                <asp:textbox id="txDocNo" tabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:textbox></div>
                            <div class="dTDTitle" style="WIDTH: 5em">
                                <asp:label id="Label5" runat="server">公告日期：</asp:label></div>
                            <div class="dTD">
                                <asp:textbox id="txStartDate" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
                                <asp:label id="Label4" runat="server" >至</asp:label>
                                <asp:textbox id="txEndDate" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 5em">
                                <asp:label id="Label1" runat="server">公告編號：</asp:label></div>
                            <div class="dTD" style="WIDTH: 11em">
                                <asp:textbox id="txBulletinId" tabIndex="0" runat="server" Width="5.5em" MaxLength="8"></asp:textbox></div>
                            <div class="dTDTitle" style="WIDTH: 5em">
                                <asp:label id="Label6" runat="server">公告主旨：</asp:label></div>
                            <div class="dTD">
                                <asp:textbox id="txSubject" tabIndex="0" runat="server" Width="12em"></asp:textbox></div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 5em">
                                <asp:label id="Label3" runat="server">發布單位：</asp:label></div>
                            <div class="dTD" style="WIDTH: 11em">
                                <asp:dropdownlist id="dlPasteUnit" runat="server" Width="9em"></asp:dropdownlist></div>
                            <div class="dTDTitle" style="WIDTH: 5em">
                                <asp:label id="Label7" runat="server">發布人員：</asp:label></div>
                            <div class="dTD">
                                <asp:textbox id="txAccount" tabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:textbox>
                                <asp:imagebutton id="btUser" tabIndex="0" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:imagebutton>
                                <asp:textbox id="txAccountName" tabIndex="0" runat="server" Width="5.5em" CssClass="DisplayOnly"></asp:textbox></div>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>瀏覽報表時的篩選條件</legend>
                    <div class="DivTable">
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 5em">
                                <asp:label id="Label9" runat="server">公告對象：</asp:label>
                            </div>
                            <div class="dTD" style="WIDTH: 15em">
                                <asp:RadioButton id="rbAll" runat="server" Text="全部" GroupName="g1" Checked="True"></asp:RadioButton>
                                <asp:RadioButton id="rbMail" runat="server" Text="輔以E-Mail通知之對象" GroupName="g1"></asp:RadioButton>
                            </div>
                            <div class="dTDTitle" style="WIDTH: 14.5em">
                                <asp:label id="Label10" runat="server">&nbsp;</asp:label>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 5em">
                                <asp:label id="Label8" runat="server">是否點閱：</asp:label>
                            </div>
                            <div class="dTD" style="WIDTH: 15m">
                                <asp:dropdownlist id="dlSignStatus" runat="server">
                                    <asp:ListItem></asp:ListItem>
                                    <asp:ListItem Value="Y">是</asp:ListItem>
                                    <asp:ListItem Value="N">否</asp:ListItem>
                                </asp:dropdownlist>
                            </div>
                            <div class="dTDTitle" style="WIDTH: 14.5em">
                                <asp:label id="Label11" runat="server">&nbsp;</asp:label>
                            </div>
                        </div>
                    </div>
                </fieldset>
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
                                        <asp:TemplateColumn HeaderText="公告編號">
                                            <ItemTemplate>
                                                <asp:Label id="lbBulletinId" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="公告日期">
                                            <ItemTemplate>
                                                <asp:Label id="lbPasteDate" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="公文文號">
                                            <ItemTemplate>
                                                <asp:Label id="lbDocNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="發布單位">
                                            <ItemTemplate>
                                                <asp:Label id="lbPasteUnit" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="發布人員">
                                            <ItemTemplate>
                                                <asp:Label id="lbPasterName" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="主旨">
                                            <ItemTemplate>
                                                <asp:Label id="lbSubject" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="報表">
                                            <ItemTemplate>
                                                <asp:Button id="btReport" runat="server" Text="瀏覽"></asp:Button>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="通知未點<br>閱人員">
                                            <ItemTemplate>
                                                <asp:Button id="btNotify" runat="server" Text="通知"></asp:Button>
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
			</asp:Panel>
        </FORM>
	</BODY>
</HTML>
