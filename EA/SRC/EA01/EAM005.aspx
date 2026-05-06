<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAM005.aspx.cs" AutoEventWireup="false" Inherits="EA01.EAM005" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAM005 分類號維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAM005" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <asp:TextBox ID="txSource_No" runat="server" Width="22px" CssClass="hide" MaxLength="20"></asp:TextBox>
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <asp:TextBox ID="txApply_Limit" runat="server" Width="22px" CssClass="hide" MaxLength="20"></asp:TextBox>
            <asp:TextBox ID="txKeep_Year" runat="server" Width="22px" CssClass="hide" MaxLength="20"></asp:TextBox>
            <asp:TextBox ID="txEc_Keep_Year" runat="server" Width="22px" CssClass="hide" MaxLength="20"></asp:TextBox>
            <asp:TextBox ID="txDept_No" runat="server" Width="22px" CssClass="hide" MaxLength="20"></asp:TextBox>
            <asp:TextBox ID="txPrimary_Key" runat="server" Width="22px" CssClass="hide" MaxLength="20"></asp:TextBox>
            <asp:TextBox ID="txOrgNo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txSect_No" runat="server" Width="22px" CssClass="hide" MaxLength="20"></asp:TextBox>
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCls_No" onkeyup="jf_CheckFull()" runat="server" Width="10.5em" CssClass="KeyUpperField" MaxLength="20"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server"></asp:Label>
                        <asp:Label ID="Label5" runat="server" CssClass="KeyField">版本代號：</asp:Label>
                        <asp:TextBox ID="txVer_No" onkeyup="jf_CheckFull()" runat="server" Width="2em" CssClass="KeyFieldNumeric" MaxLength="3"></asp:TextBox>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:Label ID="Label9" runat="server">啟用日期：</asp:Label>
                        <asp:TextBox ID="txStartDate" runat="server" Width="4em" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">類目名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCls_Name" onkeyup="jf_CheckFull()" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em; min-height: 1px">
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbLOWEST" runat="server" Text="此分類號為最下層分類號"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label13" runat="server">上層分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUpper_Cls" onkeyup="jf_CheckFull()" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btUpper_Cls" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="lbUpperClsName" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label12" runat="server">保存年限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlKeep_Year" runat="server" Width="4em" CssClass="comboBox" Rows="20"></cc1:ComboBox>
                        <asp:Label ID="lb" runat="server"></asp:Label>
                        <asp:Label ID="Label17" runat="server">電子化後保存年限：</asp:Label>
                        <cc1:ComboBox ID="dlEc_Keep_Year" runat="server" Width="4em" CssClass="comboBox" Rows="20"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label7" runat="server">應用限制：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlApply_Limit" runat="server" Width="6.5em">
                            <asp:ListItem Selected="True"></asp:ListItem>
                            <asp:ListItem Value="Y">開放</asp:ListItem>
                            <asp:ListItem Value="N">不開放</asp:ListItem>
                            <asp:ListItem Value="R">限制開放</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR" ID="UseDept">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label15" runat="server">使用單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept_No" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>&nbsp;&nbsp;
                        <cc1:ComboBox ID="dlSect_No" runat="server" Width="7.5em" CssClass="hide"></cc1:ComboBox>&nbsp;&nbsp;
                        <asp:CheckBox ID="cbApply" runat="server" Text="下層分類號使用單位一併更新" Checked="True" CssClass="hide"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">編目原則：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbInd_GenCase" runat="server" Width="202px" Text="未指定案號公文納入通案"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <div id="ck1" style="overflow: auto">
                            <asp:Label ID="Label19" runat="server" Visible="False">稽催原則：</asp:Label>
                        </div>
                    </div>
                    <div class="dTD">
                        <div id="ck2" style="overflow: auto">
                            <asp:CheckBox ID="cbFile_Inspect" runat="server" Text="要進行歸檔稽催作業" Visible="False"></asp:CheckBox>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em; min-height: 1px"></div>
                    <div class="dTD">
                        <div style="overflow: auto" id="ck3">
                            <asp:CheckBox ID="cbBor_Inspect" runat="server" Text="要進行檢調稽催作業" Visible="False"></asp:CheckBox>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label11" runat="server">清理處置：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlClear" runat="server" CssClass="comboBox">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="1">列為國家檔案</asp:ListItem>
                            <asp:ListItem Value="2">機關永久保存</asp:ListItem>
                            <asp:ListItem Value="3">依規定程序銷毀</asp:ListItem>
                            <asp:ListItem Value="4">屆期後鑑定</asp:ListItem>
                        </cc1:ComboBox>
                        <asp:TextBox ID="txClear" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label10" runat="server">內容描述：</asp:Label>
                    </div>
                    <div class="dTD" style="height: 6.5em">
                        <asp:TextBox ID="txDesp" onkeydown="if(event.keyCode == 13) return false;" runat="server" MaxLength="120" Height="6em" Width="40.5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server">基準項目編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="GridDiv" style="height: 11em" data-fixed="true">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO1" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="基準項目編號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txItem_No1" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                                            <asp:ImageButton ID="bthelp1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="項目名稱">
                                        <ItemTemplate>
                                            <asp:Label ID="lbItem_Name1" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="保存年限">
                                        <ItemTemplate>
                                            <asp:Label ID="lbKeepYear" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label8" runat="server" Height="">舊分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="GridDiv" style="height: 11em" data-fixed="true">
                            <asp:DataGrid ID="dg2" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO2" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="版本">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txOldVer_No" runat="server" Width="2em" MaxLength="20"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="啟用日期">
                                        <ItemTemplate>
                                            <asp:Label ID="lbStartDate" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="分類號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txOldCls_No" runat="server" Width="5.5em" MaxLength="20"></asp:TextBox>
                                            <asp:ImageButton ID="bthelp2" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="類別名稱">
                                        <ItemTemplate>
                                            <asp:Label ID="lbOldCls_Name" runat="server"></asp:Label>
                                            <asp:TextBox ID="txPKey" runat="server" Width="5.5em" CssClass="hide" MaxLength="20"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label14" runat="server" Height="">分類號註記：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="GridDiv" style="height: 11em">
                            <asp:DataGrid ID="dg3" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO3" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="日期">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDate" runat="server" MaxLength="7" Width="4em"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="人員">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txUser" runat="server" MaxLength="20" Width="7.5em"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="註記內容">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txRemark" runat="server" MaxLength="100" Width="11.5em"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" DefaultStyle="newmode:none;modifymode:block;" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
