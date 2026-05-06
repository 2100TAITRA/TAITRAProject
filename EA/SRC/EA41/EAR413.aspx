<%@ Page Language="c#" CodeBehind="EAR413.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAR413" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR413清查結果統計表列印作業</title>
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
    <form id="EAR413" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label1" runat="server" Width="6.5em" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em;">
                        <asp:TextBox onkeypress="jf_UPPERCASE()" ID="txPlanNo" TabIndex="10" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ToolTip="提示計畫批號" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txPlanDesc" runat="server" Width="4.5em" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txPlanBeg" runat="server" Width="4.5em" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txPlanEnd" runat="server" Width="4.5em" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                    </div>
                    <div class="dTD" style="width: 14em;">
                        <asp:CheckBox ID="cbUpdateStatus" runat="server" Checked="True" Text="計畫狀態更新為已完成清查"></asp:CheckBox>
                    </div>
                </div>
                <fieldset style="width: 300px; height: 6.5em">
                    <legend>列印報表</legend>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 2em;">&nbsp</div>
                        <div class="dTD" style="width: 13em">
                            <asp:RadioButton ID="cb1" runat="server" Text="清理結果統計表" GroupName="ReportType"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 2em;">&nbsp</div>
                        <div class="dTD" style="width: 13em">
                            <asp:RadioButton ID="cb2" runat="server" Text="清理結果明細表" GroupName="ReportType"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 2em;">&nbsp</div>
                        <div class="dTD" style="width: 13em">
                            <br>
                            <asp:RadioButton ID="rb1" runat="server" Checked="True" Text="以案為單位" GroupName="gp"></asp:RadioButton>
                            <asp:RadioButton ID="rb2" runat="server" Text="以卷為單位" GroupName="gp"></asp:RadioButton>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽(E)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" AccessKey="O" Title="匯出Excel(ALT+O)" />
            <asp:Button ID="btPrint" CssClass="hide" runat="server" Text="列印(P)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除(Z)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
