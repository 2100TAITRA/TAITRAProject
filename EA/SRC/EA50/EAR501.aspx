<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR501.aspx.cs" AutoEventWireup="false" Inherits="EA50.EAR501" EnableEventValidation="false" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR501檔案銷毀目錄列印作業</title>
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
    <form id="EAR501" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="OrgNickName" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Dept" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Text" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Text" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_User_Text" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Sect_AllValue" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_User_AllValue" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server" Width="5.5em" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:TextBox ID="txPlanNo" TabIndex="4" runat="server" Width="4.5em" CssClass="RequireField" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label1" runat="server" Width="5.5em">計畫說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanName" TabIndex="4" runat="server" Width="15.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 4.5em">&nbsp;</div>
                    <div class="dTD">
                        <asp:TextBox ID="TextBox1" TabIndex="-1" runat="server" Width="4em" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                        <fieldset style="width: 20em; height: 5.5em">
                            <legend align="left">列印內容</legend>
                            <div class="dTD">
                                <asp:CheckBox ID="cbPrint1" TabIndex="10" runat="server" Width="15em" Text="屆保存年限銷毀檔案" Checked="True"></asp:CheckBox><br>
                                <asp:CheckBox ID="cbPrint2" TabIndex="10" runat="server" Text="經微縮、電子儲存，提前銷毀原檔案" Checked="True"></asp:CheckBox><br>
                                <asp:CheckBox ID="cbPrint3" TabIndex="10" runat="server" Text="毀損無法修復檔案" Checked="True"></asp:CheckBox>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">報表格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbType1" TabIndex="15" runat="server" Width="4.5em" Text="案件" Checked="True" GroupName="g1"></asp:RadioButton>
                        <asp:RadioButton ID="rbType2" TabIndex="15" runat="server" Width="4.5em" Text="案卷" GroupName="g1"></asp:RadioButton>
                        <asp:RadioButton ID="rbTypeStat" TabIndex="15" runat="server" Width="4.5em" CssClass="hide" Text="統計" GroupName="g1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbFM" TabIndex="20" runat="server" Width="15.5em" Text="依檔管局建議的報表格式輸出"></asp:CheckBox>
                        <asp:CheckBox ID="cbLine" TabIndex="25" runat="server" Width="17em" CssClass="hide" Text="列印橫線"></asp:CheckBox>
                        <asp:CheckBox ID="cbPM" TabIndex="20" runat="server" Width="15.5em" Text="擬銷毀檔案目錄"></asp:CheckBox><br>
                        <asp:CheckBox Style="z-index: 0" ID="cbNCHU" TabIndex="20" runat="server" Width="15.5em" Text="依中興大學建議報表格式"></asp:CheckBox>
                        <asp:CheckBox Style="z-index: 0" ID="cbHasCom" TabIndex="20" runat="server" Width="8.5em" Text="有相關案件跳頁"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">註記：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDESC" TabIndex="0" runat="server" Width="28em" MaxLength="20" Font-Names="細明體" TextMode="MultiLine" Font-Size="Small"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div id="hgcOrderTitle" runat="server" class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server">排序：</asp:Label>
                    </div>
                    <div id="hgcOrderCond" runat="server" class="dTD" style="width: 14em">
                        <div class="dTR">
                            <asp:RadioButton ID="rbOrder1" runat="server" Text="依檔號" GroupName="g2"></asp:RadioButton>
                            <div id="Order2">
                                <asp:RadioButton Style="z-index: 0" ID="rbOrder2" runat="server" Text="依承辦單位" GroupName="g2"></asp:RadioButton>
                            </div>
                            <div id="DocNo">
                                <asp:RadioButton Style="z-index: 0" ID="rbDocNo" runat="server" Text="依文號" GroupName="g2"></asp:RadioButton>
                            </div>
                            <div id="User">
                                <asp:RadioButton Style="z-index: 0" ID="rbUser" runat="server" Width="13em" Text="依承辦人(含一、二級單位)" GroupName="g2"></asp:RadioButton>
                            </div>
                            <asp:RadioButton Style="z-index: 0" ID="rbStock" runat="server" Text="依櫥位號" GroupName="g2"></asp:RadioButton>
                            <asp:TextBox ID="txStock" runat="server" CssClass="hide"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTD">
                        <div class="dTDTitle" style="width: 6.5em">
                            <asp:Label ID="Label2" runat="server" Width="5.5em">列印單位：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList ID="ddldept" runat="server" Width="8.5em"></asp:DropDownList>
                            <asp:DropDownList Style="z-index: 0" ID="ddlSect" runat="server" Width="9.5em"></asp:DropDownList>
                            <asp:DropDownList Style="z-index: 0" ID="ddlUser" runat="server" Width="7em" Rows="8"></asp:DropDownList>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
