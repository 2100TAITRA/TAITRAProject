<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAR810.aspx.cs" AutoEventWireup="false" Inherits="EA80.EAR810" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR810 檢調應用紀錄查詢列印作業</TITLE>
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
		<FORM id="EAR810" onkeyup="jf_CheckFull();" method="post" runat="server">
            <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericSearch.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 11em;">
                            <asp:label id="Label1" runat="server" CssClass="KeyField">公文文號：</asp:label>
                        </div>
                        <div class="dTD" style="WIDTH: 14em;">
                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txDocNo" tabIndex="0" runat="server" Width="5.5em"
                                CssClass="KeyUpperField" MaxLength="10"></asp:textbox>
                        </div>
                        <div class="dTDTitle" style="WIDTH: 6em;">
                            <asp:Label id="Label5" runat="server" >檔號：</asp:Label></div>
                        <div class="dTD">
                            <asp:TextBox onkeypress="jf_InpNumOnly()" id="txYear" runat="server" Width="2em" 
                                MaxLength="3"></asp:TextBox>－
                            <asp:TextBox onkeypress="jf_UPPERCASE()" id="txCls" runat="server" Width="6.5em" 
                                MaxLength="12"></asp:TextBox>－
                            <asp:TextBox onkeypress="jf_UPPERCASE()" id="txCase" runat="server" Width="7em"></asp:TextBox>－
                            <asp:TextBox onkeypress="jf_UPPERCASE()" id="txVol" runat="server" Width="2.5em"></asp:TextBox>－
                            <asp:TextBox onkeypress="jf_InpNumOnly()" id="txSeq" runat="server" Width="2.5em"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 11em;">
                            <asp:label id="Label2" runat="server">承辦單位：</asp:label></div>
                        <div class="dTD" style="WIDTH: 14em;">
                            <asp:DropDownList id="dlDept" runat="server" Width="8em"></asp:DropDownList></div>
                        <div class="dTDTitle" style="WIDTH: 6em;">
                            <asp:Label id="Label6" runat="server" >承辦人：</asp:Label></div>
                        <div class="dTD">
                            <asp:DropDownList id="dlUser" runat="server"></asp:DropDownList>
                            <asp:TextBox id="H_txUser" runat="server" CssClass="hide"></asp:TextBox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em;">
                            <asp:CheckBox id="cb1" runat="server" Text="檢調"></asp:CheckBox></div>
                        <div class="dTD"></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em;">&nbsp;</div>
                        <div class="dTD" style="WIDTH: 19em;">
                            <asp:label id="Label3" runat="server">調案日期：</asp:label>
                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txBorDateS" tabIndex="0" runat="server" 
                                CssClass="DatePicker" Width="4em" MaxLength="7"></asp:textbox>～
                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txBorDateE" tabIndex="0" runat="server" 
                                CssClass="DatePicker" Width="4em" MaxLength="7"></asp:textbox>
                        </div>
                        <div class="dTDTitle" style="WIDTH: 6em;">
                            <asp:label id="Label7" runat="server">調案單號：</asp:label></div>
                        <div class="dTD">
                            <asp:TextBox onkeypress="jf_InpNumOnly()" id="txBorNo" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                            <asp:imagebutton id="btHelp1" tabIndex="15" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:imagebutton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">&nbsp;</div>
                        <div class="dTD" style="WIDTH: 19em">
                            <asp:label id="Label4" runat="server">調案單位：</asp:label>
                            <asp:DropDownList id="dlBorDept" runat="server"></asp:DropDownList></div>
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:label id="Label8" runat="server">調案人：</asp:label></div>
                        <div class="dTD">
                            <asp:DropDownList id="dlBorUser" runat="server"></asp:DropDownList></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">&nbsp;</div>
                        <div class="dTD" style="WIDTH: 15em">
                            <asp:CheckBox id="cbAll" runat="server" Text="含線上調檔"></asp:CheckBox>
                            <asp:TextBox id="H_txBorUser" runat="server" CssClass="hide"></asp:TextBox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:CheckBox id="cb2" runat="server" Text="應用"></asp:CheckBox></div>
                        <div class="dTD">&nbsp;</div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 6em">&nbsp;</div>
                        <div class="dTD" style="WIDTH: 19em">
                            <asp:label id="Label9" runat="server">申請日期：</asp:label>
                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txAppDateS" tabIndex="0" runat="server" Width="4em"
                                CssClass="DatePicker" MaxLength="7"></asp:textbox>～
                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txAppDateE" tabIndex="0" runat="server" Width="4em"
                                CssClass="DatePicker" MaxLength="7"></asp:textbox>
                        </div>
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:label id="Label10" runat="server">申請書號：</asp:label></div>
                        <div class="dTD">
                            <asp:TextBox onkeypress="jf_InpNumOnly()" id="txAppNo" runat="server" MaxLength="10"></asp:TextBox>
                            <asp:imagebutton id="btHelp2" tabIndex="15" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:imagebutton></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">&nbsp;</div>
                        <div class="dTD" style="WIDTH: 18em">
                            <asp:label id="Label11" runat="server">申請人：</asp:label>
                            <asp:textbox id="txAppUser" tabIndex="0" runat="server" Width="10em" MaxLength="20"></asp:textbox></div>
                        <div class="dTDTitle" style="WIDTH: 6em">
                            <asp:label style="Z-INDEX: 0" id="Label12" runat="server">受理單位：</asp:label></div>
                        <div class="dTD">
                            <asp:DropDownList style="Z-INDEX: 0" id="dlRcvDept" runat="server"></asp:DropDownList></div>
                    </div>
                </div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
