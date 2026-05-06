<%@ Page Language="c#" CodeBehind="EAR401.aspx.cs" AutoEventWireup="false" Inherits="EA40.EAR401" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR401 檔案清理數量估算報表列印</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAR401" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanNo" TabIndex="10" runat="server" Width="4.5em" CssClass="RequireUpperField" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">計畫狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlStatus" TabIndex="20" runat="server" Width="12.5em">
                            <asp:ListItem Value="0" Selected="True">清理範圍設定中</asp:ListItem>
                            <asp:ListItem Value="1">產生明細待修正</asp:ListItem>
                            <asp:ListItem Value="2">清理中</asp:ListItem>
                            <asp:ListItem Value="3">紙質檔案完成數位內容待處理</asp:ListItem>
                            <asp:ListItem Value="4">清理完成</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">計畫說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanDesc" TabIndex="-1" runat="server" Width="24em" CssClass="displayonly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbStore" runat="server" Width="8em" Checked="True" Text="依庫房別統計"></asp:CheckBox>
                        <asp:TextBox ID="txOrgNo" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <fieldset style="width: 16em; height: 7.5em">
                            <legend>列印報表</legend>
                            <div id="Table2" class="DivTable">
                                <div class="dTR">
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbExamStat" runat="server" Text="檔案清理數量統計表" CssClass="hide" GroupName="ReportType"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTD">
                                        <asp:RadioButton ID="cbMain" runat="server" Text="估算彙總統計表" GroupName="ReportType"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTD">
                                        <asp:RadioButton ID="cbDetail" runat="server" Text="估算明細表" GroupName="ReportType"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 1em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCase" runat="server" Text="以案為單位" GroupName="gp"></asp:RadioButton>
                                        <asp:RadioButton ID="rbVol" runat="server" Text="以卷為單位" GroupName="gp"></asp:RadioButton>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" AccessKey="O" Title="匯出Excel(ALT+O)" CssClass="hide"/>
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
