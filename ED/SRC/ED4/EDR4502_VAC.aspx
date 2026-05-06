<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR4502_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4502_VAC" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR4502_VAC 承辦公文績效天數明細表列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR4502_VAC" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:TextBox id="h_MaxYearMonth" runat="server"></asp:TextBox>
            <asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="lbYearmonth" runat="server" CssClass="RequireField">列印月份：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
							<asp:TextBox ID="txYearmonthS" tabIndex="10" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:TextBox>
							<asp:Label ID="txYMSeparator" runat="server"> ~ </asp:Label>
							<asp:TextBox ID="txYearmonthE" tabIndex="20" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:TextBox>                        
                    </div>
                </div>
                <div class="dTR">
					<div class="dTDTitle" style="WIDTH: 8em;">
						<asp:label id="lbDept" runat="server"  EnableViewState="False">承辦單位：</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 15em;">
						<asp:dropdownlist id="dlDept" tabIndex="30" runat="server"></asp:dropdownlist>
					</div>
				</div>
                <div class="dTR">
					<div class="dTDTitle" style="WIDTH: 8em">
						<asp:label id="lbRpt" runat="server" >報表選項：</asp:label>
					</div>
					<div class="dTD" style="width: 15em">
						<asp:RadioButton id="rbRptL1" tabIndex="40"  Checked="True" Text="一般公文時效增減表" GroupName="RptMode" runat="server" Width="7em" ></asp:RadioButton>			                        
					</div>
				</div>
                <div class="dTR">
                    <div class="dTDTitle" style="WIDTH: 8em">&nbsp</div>
                    <div class="dTD" style="WIDTH: 15em">
                        <asp:RadioButton id="rbRptL2" tabIndex="50" runat="server" Text="公文承辦件數平均表" GroupName="RptMode" Width="7em" ></asp:RadioButton>
					</div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="WIDTH: 8em">&nbsp</div>
                    <div class="dTD" style="WIDTH: 15em">
                        <asp:RadioButton id="rbRptL3" tabIndex="60" runat="server" Text="稽催承辦件數月分析年報表" GroupName="RptMode" Width="7em" ></asp:RadioButton>
					</div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="WIDTH: 8em">&nbsp</div>
                    <div class="dTD" style="WIDTH: 20em">
                        <asp:RadioButton id="rbRptL4" tabIndex="70" runat="server" Text="監察、復審、申請、專案案件統計表" GroupName="RptMode" Width="7em" ></asp:RadioButton>
					</div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="WIDTH: 8em">&nbsp</div>
                    <div class="dTD" style="WIDTH: 20em">
                        <asp:RadioButton id="rbRptL5" tabIndex="80" runat="server" Text="國會、監察、陳情案件統計表" GroupName="RptMode" Width="7em" ></asp:RadioButton>
					</div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="WIDTH: 8em">&nbsp</div>
                    <div class="dTD" style="WIDTH: 20em">
                        <asp:RadioButton id="rbRptL6" tabIndex="90" runat="server" Text="公文處理速度統計表" GroupName="RptMode" Width="7em" ></asp:RadioButton>
					</div>
                </div>
                <div class="dTR">
					<div class="dTDTitle" style="WIDTH: 8em">
						<asp:label id="lbMax" runat="server" >最大統計年月：</asp:label>
					</div>
					<div class="dTD" style="width: 15em">
						<asp:label id="lbMaxYearMonth" runat="server" Width="7em"></asp:label>
					</div>
				</div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>                        
			<asp:Button runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btExcel"></asp:Button>
            <asp:Button runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btODS"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
