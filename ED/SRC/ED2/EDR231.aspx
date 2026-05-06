<%@ Page Language="c#" CodeBehind="EDR231.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR231"%>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>EDR231 人民陳情案件回覆內容查詢作業 - 標檢局專用</title>
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
    <form id="EDR231" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="H_Dept_Value" runat="server" CssClass=""></asp:TextBox><asp:TextBox ID="H_OD_FLOW_TYPE" runat="server" CssClass=""></asp:TextBox><asp:TextBox ID="H_Sect" runat="server" CssClass=""></asp:TextBox><asp:TextBox ID="H_Sect_Value" runat="server" CssClass=""></asp:TextBox><asp:TextBox ID="H_dlSect_Value" runat="server" CssClass=""></asp:TextBox><asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_ACC" runat="server" CssClass=""></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label1" runat="server">郵件編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txSuggestNoS" TabIndex="0" runat="server" Width="13em" MaxLength="13"></asp:TextBox>～
									<asp:TextBox ID="txSuggestNoE" TabIndex="0" runat="server" Width="13em" MaxLength="13"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label7" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txDocNoS" TabIndex="0" runat="server" Width="5.5em" MaxLength="15"></asp:TextBox>～
                        <asp:TextBox ID="txDocNoE" TabIndex="0" runat="server" Width="5.5em" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label8" runat="server">收(創)文日：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txRcvDateS" TabIndex="1" runat="server" Width="4.5em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>～
                        <asp:TextBox ID="txRcvDateE" TabIndex="2" runat="server" Width="4.5em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label9" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em;">
                        <cc1:ComboBox ID="dlDept"  runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect"  runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label2" runat="server">回覆日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txReplyDateS"  runat="server" Width="4.5em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>～
                        <asp:TextBox ID="txReplyDateE" runat="server" Width="4.5em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label10" runat="server">結案別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:RadioButton ID="rbAllType" runat="server" GroupName="Type" Text="全部"></asp:RadioButton>&nbsp;
                            <asp:RadioButton ID="rbDeal" runat="server" GroupName="Type" Text="處理中"></asp:RadioButton><asp:RadioButton ID="rbClose" runat="server" GroupName="Type" Text="結案"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbSave" runat="server" GroupName="Type" Text="錄存續辦"></asp:RadioButton><asp:CheckBox ID="cbExcludeClose" runat="server" Text="排除已結案案件"></asp:CheckBox>
                    </div>
                </div>

                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label11" runat="server">報表類型：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:RadioButton ID="rbOrg" runat="server" GroupName="RptType" Text="回覆內容明細"></asp:RadioButton>&nbsp;
										<asp:RadioButton ID="rbNew" runat="server" GroupName="RptType" Text="案件明細"></asp:RadioButton>
                    </div>
                </div>
            </div>
			<div id="GridTable" class="DivTable">
		<div class="dTR">
            <div class="GridDiv" style="OVERFLOW: auto; HEIGHT: 257px">
                <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                    <Columns>
                        <asp:TemplateColumn HeaderText="序">
                            <ItemTemplate>
                                <asp:Label ID="lbSEQ_NO" runat="server" Width="1.5em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="郵件編號">
                            <ItemTemplate>
                                <asp:Label ID="lbSuggestNo" runat="server" Width="15em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="承辦單位<br>承辦人">
                            <ItemTemplate>
                                <asp:Label ID="lbOuName" runat="server" Width="10em"></asp:Label><br>
                                <asp:Label ID="lbEmpName" runat="server" Width="4.5em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="回覆日期<br>回覆類型">
                            <ItemTemplate>
                                <asp:Label ID="lbReplyDate" runat="server" Width="10em"></asp:Label><br>
                                <asp:Label ID="lbReplyType" runat="server" Width="10em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="回覆主旨">
                            <ItemTemplate>
                                <asp:Label ID="lbReplySubject" runat="server" Width="25em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="回覆<br>內容">
                            <ItemTemplate>
                                <asp:Button ID="btView" runat="server" Text="檢視" Width="2.5em"></asp:Button>
                                <asp:TextBox ID="txReplyContent" runat="server" CssClass="hide"></asp:TextBox>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="回覆對象EMAIL">
                            <ItemTemplate>
                                <asp:Label ID="lbReplyEmail" runat="server" Width="20em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                    </Columns>
                </asp:DataGrid>
            </div>
			</div>
        </div>
        </div>
        
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" AccessKey="Q" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" AccessKey="P" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" AccessKey="S" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btExcel" runat="server" AccessKey="O" Text="匯出EXCEL檔" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
