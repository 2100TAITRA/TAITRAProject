<%@ Page Language="c#" CodeBehind="AKI808.aspx.cs" AutoEventWireup="false" Inherits="AK.AKI808" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKI808 公文基本資料</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="AKI808" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label5" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em; min-height: 1px">
                        <asp:Label ID="lbDOC_NO" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label2" runat="server">收(創)文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbRCV_DATE" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label3" runat="server">來文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbFromOrg" runat="server" Width="17.5em"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label6" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em; min-height: 1px">
                        <asp:Label ID="lbFROMORG_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label7" runat="server">來文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbFromNo" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label12" runat="server" Width="120px">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbSUBJECT" runat="server" Width="40em"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label4" runat="server">承辦單位擬簽：</asp:Label>
                    </div>
                    <div>
                        <asp:Label ID="lbOpinion" runat="server" Width="40em"></asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div id="GridTable" style="height: 13em" class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0" PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="單位角色">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server" Width="100px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="簽核者">
                                <ItemTemplate>
                                    <asp:Label ID="lbSender" runat="server" Width="80px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbCdateTime" runat="server" Width="90px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="異動別">
                                <ItemTemplate>
                                    <asp:Label ID="lbTxName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="簽核意見">
                                <ItemTemplate>
                                    <asp:Label ID="lbComment" runat="server" Width="103px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btFromDoc" AccessKey="E" ToolTip="來文預覽(ALT+E)" runat="server" Text="來文預覽(E)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btIssueDoc" AccessKey="V" ToolTip="發文預覽(ALT+V)" runat="server" Text="發文預覽(V)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btDownFromAtt" AccessKey="A" ToolTip="來文附件檔下載(ALT+A)" runat="server" Text="來文附件檔下載(A)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDownIssueAtt" AccessKey="D" ToolTip="發文附件檔下載(ALT+D)" runat="server" Text="發文附件檔下載(D)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExit" AccessKey="C" ToolTip="離開(ALT+C)" runat="server" Text="離開(C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
