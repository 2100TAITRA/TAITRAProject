<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR4901_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4901_VAC" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR4901_VAC 民意信箱公文時效統計彙總表</title>
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
    <form id="EDR4901_VAC" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">列印月份：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txPrintMonth" runat="server" Width="3em" CssClass="RequireField" MaxLength="5"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label1" runat="server" EnableViewState="False">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <asp:DropDownList ID="dlDept" runat="server" Width="8em">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label8" runat="server">結案別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlFinishType" runat="server" Width="8em">
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label16" runat="server">辦畢方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="dlCloseType" runat="server" Width="8em">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label5" runat="server">辦理天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlHandlingDays" runat="server" Width="8em">
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label13" runat="server">併文別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="dlMergedType" runat="server" Width="8em">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label9" runat="server">專案別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlProjectType" runat="server" Width="8em">
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label14" runat="server">簽核方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlSignType" runat="server" Width="8em">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
					<div class="dTDTitle" style="WIDTH: 8em">
						<asp:label id="Label4" runat="server">報表類型：</asp:label>
					</div>
					<div class="dTD" style="width: 15em">
						<asp:RadioButton ID="rbSummary" runat="server" GroupName="rptType" Text="統計彙總表"></asp:RadioButton>
						<asp:RadioButton ID="rbAnalysis" runat="server" GroupName="rptType" Text="天數分析表"></asp:RadioButton>
					</div>
				</div>
                <div class="dTR">
					<div class="dTDTitle" style="WIDTH: 10em">
						<asp:label id="Label3" runat="server">目前統計最大年月：</asp:label>
					</div>
					<div class="dTD" style="width: 15em">
						<asp:label ID="lbMaxYM" runat="server"></asp:label>
						<asp:TextBox ID="HMaxYM" runat="server" CssClass="hide"></asp:TextBox>
					</div>
				</div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btOds" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:TextBox Style="z-index: 102; position: absolute; top: 368px; left: 488px" ID="hMaxMonth" runat="server" CssClass="hide"></asp:TextBox>
        <asp:DropDownList Style="z-index: 103; position: absolute; top: 384px; left: 616px" ID="dlOuId" runat="server" CssClass="hide"></asp:DropDownList>
    </form>
</body>
</html>
