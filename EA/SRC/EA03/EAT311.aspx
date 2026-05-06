<%@ Page language="c#" Codebehind="EAT311.aspx.cs" AutoEventWireup="false" Inherits="EA03.EAT311" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT311 調案展期審核作業</TITLE>
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
		<FORM id="EAT311" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
            <asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label1" runat="server">調案單號：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txBorNo" tabIndex="0" runat="server" Width="5.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label12" runat="server">申請單單號：</asp:label></div>
                        <div class="dTD" style="WIDTH: 13em">
                            <asp:textbox id="txApplyNo" runat="server" Width="5.5em" CssClass="DisplayOnly"></asp:textbox></div>
                        <div class="dTDTitle">
                            <asp:label id="Label5" runat="server">申請日期：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txApplyDate" tabIndex="0" runat="server" Width="4em" CssClass="DisplayOnly"
                                ReadOnly="True"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label2" runat="server">調案日期：</asp:label></div>
                        <div class="dTD" style="WIDTH: 13em">
                            <asp:textbox id="txBorDate" tabIndex="0" runat="server" Width="4em" CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></div>
                        <div class="dTDTitle">
                            <asp:label id="Label6" runat="server">調案期限：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txBorDueDate" tabIndex="0" runat="server" Width="4em" CssClass="DisplayOnly"
                                ReadOnly="True"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label3" runat="server">調案單位：</asp:label></div>
                        <div class="dTD" style="WIDTH: 13.5em">
                            <asp:textbox id="txDeptName" tabIndex="0" runat="server" Width="10em" CssClass="DisplayOnly"
                                ReadOnly="True"></asp:textbox></div>
                        <div class="dTDTitle">
                            <asp:label id="Label7" runat="server">調 案 人：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txEmpName" tabIndex="0" runat="server" Width="5em" CssClass="DisplayOnly"
                                ReadOnly="True"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label4" runat="server">調案明細：</asp:label></div>
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 120px" data-fixed="true">
                                <asp:datagrid id="dg1" runat="server" PageSize="5" AutoGenerateColumns="False"
                                    GridLines="Vertical" CellPadding="0" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="文　　號">
                                            <ItemTemplate>
                                                <asp:Label id="lbDOC_NO" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="主　　旨">
                                            <ItemTemplate>
                                                <asp:Label id="lbSUBJECT" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:datagrid>
                            </DIV>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label9" runat="server">預計歸還日：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txApplyData" tabIndex="0" runat="server" Width="4em" CssClass="DisplayOnly"
                                ReadOnly="True"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label8" runat="server">展期原因：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txApplyReason" tabIndex="0" runat="server" Width="25em" 
                                ReadOnly="True" Height="75px" BackColor="Gainsboro" TextMode="MultiLine"
                                MaxLength="100"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label10" runat="server">目前狀態：</asp:label></div>
                        <div class="dTD">
                            <asp:label id="lbStatus" runat="server"></asp:label></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label id="Label11" runat="server">審核意見：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlPhraseNo" runat="server" Width="8em"></asp:dropdownlist></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            &nbsp;&nbsp;<asp:label id="Label13" runat="server">備註意見：</asp:label>
                        </div>
                        <div class="dTD">
                            <asp:textbox id="txReborCode" tabIndex="0" runat="server" Width="25em" Height="75px" TextMode="MultiLine" MaxLength="100"></asp:textbox></div>
                    </div>
                </div>
                <div class="DivTable">
                    <div class="dTR">
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 120px">
                                <asp:datagrid id="dg2" runat="server" Height="40px" PageSize="5" AutoGenerateColumns="False"
                                    GridLines="Vertical" CellPadding="0" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSeqNo" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="審核時間">
                                            <ItemTemplate>
                                                <asp:Label id="lbEntryDateTime" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="審核主管">
                                            <ItemTemplate>
                                                <asp:Label id="lbDirectorName" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="審核意見">
                                            <ItemTemplate>
                                                <asp:Label id="lbReborCode" runat="server" ></asp:Label>
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
				<asp:Button ID="btBack" runat="server" Text="退回" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btCommit" runat="server" Text="核可" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btSave" runat="server" Text="線上簽核傳送" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"></asp:DropDownList>
				<asp:Button ID="btSearchFlow" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
        </FORM>
	</BODY>
</HTML>
