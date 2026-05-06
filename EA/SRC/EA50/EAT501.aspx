<%@ Page Language="c#" CodeBehind="EAT501.aspx.cs" AutoEventWireup="false" Inherits="EA50.EAT501" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT501銷毀計畫維護作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
    <style>
        .tr01 {
            BACKGROUND-COLOR: white;
        }

        .tr02 {
            BACKGROUND-COLOR: #f7f7de;
        }
    </style>
</head>
<body>
    <form id="EAT501" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txBatchContent" runat="server" Width="3px" CssClass="hidden" Height="4px"></asp:TextBox>
            <asp:TextBox ID="txHistoryContent" runat="server" Width="3px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_OrgNo" runat="server" Width="6px" CssClass="hidden"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField" onChange="jf_ChangePlanType()">銷毀計畫：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:TextBox ID="txDPlan" TabIndex="2" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">計畫別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlPlanType" TabIndex="4" runat="server" Width="8.5em">
                            <asp:ListItem Value="0">未銷毀</asp:ListItem>
                            <asp:ListItem Value="1">銷毀</asp:ListItem>
                        </asp:DropDownList>
                        <asp:Label ID="Label6" runat="server" CssClass="RequireField">機關：</asp:Label>
                        <asp:TextBox ID="txOrg" TabIndex="6" runat="server" Width="13.5em" CssClass="RequireField"></asp:TextBox>
                        <asp:TextBox ID="txOrgNo" runat="server" Width="3.5em" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label2" runat="server">層轉機關來文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txWord" TabIndex="8" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">字第</asp:Label>
                        <asp:TextBox ID="txNumber" TabIndex="10" runat="server" Width="9em" MaxLength="15"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">號</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label3" runat="server">銷毀目錄送核冊數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:TextBox ID="txBooknum" TabIndex="20" runat="server" CssClass="InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server" Width="1.5em">冊</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label10" runat="server" Width="4em">總箱數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBoxnum" TabIndex="22" runat="server" CssClass="InputFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server">箱</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label4" runat="server">檔案年度：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:TextBox ID="txYear" TabIndex="30" runat="server" Width="2em" MaxLength="3"></asp:TextBox>─
                        <asp:TextBox ID="txEYear" TabIndex="30" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label15" runat="server">檔案數量：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em">
                        <asp:TextBox ID="txNum" TabIndex="35" runat="server" Width="8em" MaxLength="16"></asp:TextBox>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label ID="Label17" runat="server">存放地點：</asp:Label>
                        <asp:TextBox ID="txStore" TabIndex="40" runat="server"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label12" runat="server">擬銷毀時間：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:TextBox ID="txTime" TabIndex="45" runat="server" Width="7em" MaxLength="30"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label16" runat="server">地點：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:TextBox ID="txPlace" TabIndex="50" runat="server" Width="10em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label ID="Label18" runat="server">方式：</asp:Label>
                        <asp:TextBox ID="txMethod" TabIndex="55" runat="server"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label13" runat="server">符合基準情形：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCond" TabIndex="60" runat="server" Width="32.5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label14" runat="server">備註：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRemark" TabIndex="65" runat="server" Width="32.5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbPrintType" runat="server" Width="13.5em" Checked="True" Text="依檔管局建議報表格式輸出"></asp:CheckBox>
                        <asp:TextBox ID="txSourceOrgName" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txOrgIndex" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label19" runat="server">史政機關檢選狀況：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em">
                        <asp:Button ID="btAdd1" TabIndex="70" runat="server" Text="增加" CausesValidation="False"></asp:Button>
                        <asp:TextBox ID="txDeleteDg2" runat="server" Width="1em" CssClass="hidden"></asp:TextBox>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label ID="Label21" runat="server">包含作業批號：</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 17em">
                        <div class="GridDiv">
                            <asp:DataGrid ID="dg1" TabIndex="75" runat="server" PageSize="5" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="機關">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txInput1" TabIndex="0" runat="server" Width="9.5em" MaxLength="10"></asp:TextBox>
                                            <asp:TextBox ID="tx_OrgNo_H" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="數量">
                                        <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:TextBox ID="txCaseCnt" TabIndex="0" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                                            <asp:Label Style="z-index: 0" ID="Label25" runat="server">案</asp:Label>
                                            <asp:TextBox ID="txVolCnt" runat="server" Width="2em"></asp:TextBox>
                                            <asp:Label ID="Label23" runat="server">卷</asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="ORGNAME" Visible="False">
                                        <ItemTemplate>
                                            <asp:Label ID="lbOrgName" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label20" runat="server">批號：</asp:Label>
                        <asp:TextBox ID="txPlanNo" TabIndex="80" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>&nbsp; &nbsp;&nbsp; 
						<asp:Button ID="btAdd2" TabIndex="85" runat="server" Text="加入" CausesValidation="False"></asp:Button>&nbsp;&nbsp;&nbsp;&nbsp;
						<asp:Label ID="Label22" runat="server" Width="1.5em">計</asp:Label>
                        <asp:Label Style="text-align: right" ID="tc" runat="server" Width="2.5em">0</asp:Label>
                        <asp:Label ID="Label24" runat="server" Width="1.5em">案</asp:Label>
                        <asp:Label Style="text-align: right" ID="tv" runat="server" Width="2.5em">0</asp:Label>
                        <asp:Label ID="Label26" runat="server" Width="1.5em">卷</asp:Label>
                        <asp:Label Style="text-align: right" ID="ts" runat="server" Width="2.5em">0</asp:Label>
                        <asp:Label ID="Label28" runat="server" Width="1.5em">件</asp:Label>
                        <div class="DivTable">
                            <div class="dTR">
                                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
	                                <asp:Button ID="btSelectAll" runat="server" Text="全選" />
	                                <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
	                                <asp:Button ID="btSelectClear" runat="server" Text="清除" />
	                                <asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
                                </asp:Panel>
                            </div>
                            <div class="GridDiv" style="width: 31.5em; height: 8.5em; overflow: auto">
                                <asp:DataGrid ID="dg2" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemStyle HorizontalAlign="Center" Width="2em"></ItemStyle>
                                            <ItemTemplate>
                                                <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="選">
                                            <ItemStyle HorizontalAlign="Center" Width="2em"></ItemStyle>
                                            <ItemTemplate>
                                                <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="批號">
                                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                            <ItemTemplate>
                                                <asp:TextBox ID="txPlanNum" runat="server" Width="5em"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="制定日">
                                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                            <ItemTemplate>
                                                <asp:Label ID="lbDate" runat="server" Width="5em"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="說明">
                                            <ItemTemplate>
                                                <asp:Label ID="lbDesc" runat="server" Width="17em"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:DataGrid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
