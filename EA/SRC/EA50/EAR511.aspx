<%@ Page Language="c#" CodeBehind="EAR511.aspx.cs" AutoEventWireup="false" Inherits="EA50.EAR511" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>EAR511 單位庫房公文(擬)銷毀清單列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAR511" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">銷毀批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7.5em;">
                        <asp:TextBox ID="txPlanNo" TabIndex="4" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="8"></asp:TextBox><asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ToolTip="提示計畫批號" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label1" runat="server" >計畫說明：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <asp:TextBox ID="txPlanName" TabIndex="4" runat="server"  CssClass="displayOnly" MaxLength="8"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="laSourceOrgName" runat="server">列印機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <asp:DropDownList ID="dlSourcelist" runat="server"></asp:DropDownList>
                        <asp:TextBox ID="H_SOURCENO" TabIndex="30" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_PLANNO" TabIndex="30" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label21" runat="server"> 列印單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <select name="ddl" id="dlDept" runat="server"></select>
                        <asp:TextBox ID="H_DEPTNO" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_DETPNOLIST" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label8" runat="server">分頁方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em;">
                        <asp:RadioButton ID="rbOrder1" runat="server" Checked="True" Text="依機關及單位(組室+科別)" GroupName="g2"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrder2" runat="server" Text="依機關及單位(組室+科別)及承辦人" GroupName="g2"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" AccessKey="P" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btExcel" runat="server" AccessKey="O" Text="匯出Excel" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" AccessKey="Z" Text="清除" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
