<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="TBI120.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBI120" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>TBI120</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <!--#include file="/STDN/Lib/Script.shtml"-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
    <style type="text/css">
        P.big {
            LINE-HEIGHT: 1.65;
        }
    </style>
</head>
<body style="background-color: #99ccff; margin: 0px">
    <form id="TBI120" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" style="width: 100%">
                <div class="dTR">
                    <div class="dTD DgSelectToolBar" id="tbSelect" style="background-color: #99ccff; width: 100%">
                        <asp:ImageButton ID="ImgbtSearch" runat="server" ImageUrl="../IMAGE/menu_icon-09.gif" CssClass="hide"></asp:ImageButton>
                        <asp:ImageButton runat="server" Text="第一頁" ImageUrl="../IMAGE/BtnE_FirstPage.gif" ID="btFirst" ToolTip="第一頁" DefaultStyle="cursor:hand;border-color:#99ccff"></asp:ImageButton>
                        <asp:ImageButton runat="server" Text="上一頁" ImageUrl="../IMAGE/BtnE_PrevPage.gif" ID="btPreview" ToolTip="上一頁" DefaultStyle="cursor:hand;border-color:#99ccff"></asp:ImageButton>
                        <asp:ImageButton runat="server" Text="下一頁" ImageUrl="../IMAGE/BtnE_NextPage.gif" ID="btNext" ToolTip="下一頁" DefaultStyle="cursor:hand;border-color:#99ccff"></asp:ImageButton>
                        <asp:ImageButton runat="server" Text="最後一頁" ImageUrl="../IMAGE/BtnE_LastPage.gif" ID="btLast" ToolTip="最後一頁" DefaultStyle="cursor:hand;border-color:#99ccff"></asp:ImageButton>
                        <asp:Label runat="server" Text="第" DefaultStyle="border-color:#99ccff"></asp:Label>
                        <asp:TextBox runat="server" Width="30px" Style="text-align: right;" MaxLength="3" ID="txViewPage" DefaultStyle="border-color:#99ccff"></asp:TextBox>
                        <asp:Label runat="server" Text="頁／共" DefaultStyle="border-color:#99ccff"></asp:Label>
                        <asp:TextBox runat="server" Width="30px" DefaultStyle="border-color:#99ccff" TabIndex="-1" Style="text-align: right;" MaxLength="3" ID="txTotalPage" BackColor="Gainsboro" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                        <asp:Label runat="server" Text="頁" DefaultStyle="border-color:#99ccff"></asp:Label>
                        <asp:ImageButton runat="server" ImageUrl="../IMAGE/icon_ChangePage.gif" ID="btChangePage" ToolTip="到指定的頁面" DefaultStyle="cursor:hand;border-color:#99ccff"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD DgSelectToolBar" id="tbSelect2" style="background-color: #99ccff; width: 100%">
                        <asp:ImageButton runat="server" ImageUrl="../IMAGE/bt_01-1.gif" DefaultStyle="cursor:hand;border-color:#99ccff;" ID="btSelectAll" ToolTip="勾選所有的選項"></asp:ImageButton>
                        <asp:ImageButton runat="server" ImageUrl="../IMAGE/bt_02-1.gif" DefaultStyle="cursor:hand;border-color:#99ccff;" ID="btSelectInverse" ToolTip="反向選取"></asp:ImageButton>
                        <asp:ImageButton runat="server" ImageUrl="../IMAGE/bt_03-1.gif" DefaultStyle="cursor:hand;border-color:#99ccff;" ID="btSelectClear" ToolTip="清除勾選所有的選項"></asp:ImageButton>
                        <asp:ImageButton runat="server" ImageUrl="../IMAGE/bt_07-04.gif" DefaultStyle="cursor:hand;border-color:#99ccff;" ID="btDownLoad" AccessKey="D" ToolTip="下載勾選的公告(ALT+D)"></asp:ImageButton>
                        <asp:ImageButton runat="server" ImageUrl="../IMAGE/bt_05-1.gif" DefaultStyle="cursor:hand;border-color:#99ccff;" ID="btView" AccessKey="V" ToolTip="檢視第一筆明細(ALT+V)"></asp:ImageButton>
                        <asp:ImageButton runat="server" ImageUrl="../IMAGE/bt_07-1.gif" CssClass="hide" ID="btTranToOD" ToolTip="轉入公文系統"></asp:ImageButton>
                        <asp:ImageButton runat="server" ImageUrl="../IMAGE/bt_07-03.gif" DefaultStyle="cursor:hand;border-color:#99ccff;" ID="btReLoad" AccessKey="F" ToolTip="重新整理(ALT+F)"></asp:ImageButton>
                        <asp:ImageButton runat="server" ImageUrl="../IMAGE/bt_08-1.gif" DefaultStyle="cursor:hand;border-color:#99ccff;" ID="btPrint" AccessKey="P" ToolTip="公布清單預覽(ALT+P)"></asp:ImageButton>
                        <asp:ImageButton runat="server" ImageUrl="../IMAGE/bt_07-05.gif" DefaultStyle="cursor:hand;border-color:#99ccff;" ID="btSetTbReaded" AccessKey="R" ToolTip="設為已讀(ALT+R)"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <asp:Label ID="lbMessage" runat="server" CssClass="hide" Font-Names="細明體"></asp:Label>
                    <div class="GridDiv">
                        <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BackColor="White">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                        <asp:Label ID="H_BulletinId" runat="server" CssClass="hide"></asp:Label>
                                        <asp:Label ID="H_FileName" runat="server" CssClass="hide"></asp:Label>
                                        <asp:Label ID="H_SubDir" runat="server" CssClass="hide"></asp:Label>
                                        <asp:Label ID="H_diFileName" runat="server" CssClass="hide"></asp:Label>
                                        <asp:Label ID="H_Attach" runat="server" CssClass="hide"></asp:Label>
                                        <asp:TextBox ID="BulletinId" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="選">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderImageUrl="../IMAGE/Fox_01.gif">
                                    <ItemTemplate>
                                        <asp:ImageButton ID="imgAttach" runat="server" Style="cursor: pointer" ImageUrl="../IMAGE/Fox_01.gif" Visible="False"></asp:ImageButton>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="公告編號">
                                    <ItemTemplate>
                                        <asp:Label ID="lbBulletinId" runat="server"></asp:Label>
                                        <asp:TextBox ID="txSourceOrgno" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="來文機關">
                                    <ItemTemplate>
                                        <asp:Label ID="lbFromOrgName" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="公告主旨">
                                    <ItemTemplate>
                                        <div class="big">
                                            <asp:HyperLink ID="hlSubject" TabIndex="0" runat="server"></asp:HyperLink>
                                        </div>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="發布單位">
                                    <ItemTemplate>
                                        <asp:Label ID="lbUnitName" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="承辦單位">
                                    <ItemTemplate>
                                        <asp:Label ID="lbRpsDept" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="承辦人">
                                    <ItemTemplate>
                                        <asp:Label ID="lbAccount" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="公布日期">
                                    <ItemTemplate>
                                        <asp:Label ID="lbPasteDate" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="公文文號">
                                    <ItemTemplate>
                                        <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="公告對象">
                                    <ItemTemplate>
                                        <asp:Label ID="lbAllow" runat="server"></asp:Label>
                                        <asp:HyperLink ID="hlAllow" runat="server" Text="其它"></asp:HyperLink>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <span runat="server">電子公布欄系統</span>
        </asp:Panel>
        <!-- 2015.1 - Eric Peng, ASPX網頁程式dlg框架 -->
        <div id="dlgASPXPage" style="display: none; width: 99%; height: 99%; padding: 0px;">
            <div class="pane" style="width: 101%; height: 101%; overflow-y: hidden; overflow-x: hidden; -webkit-overflow-scrolling: touch;">
                <iframe class="aspx_page_content" style="width: 99%; height: 99%;"></iframe>
            </div>
            <a class="closeBtn" style="display: none"></a>
        </div>
        <!-- <div id="dlgASPXPage" ... -->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 1px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
            <asp:TextBox Style="z-index: 0" ID="H_txBulletinIdList" runat="server"></asp:TextBox>
            <asp:TextBox ID="PageCnt" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="BulletinNum" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txDownloadIds" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txPageNum" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txPageCount" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txSearchMode" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txCategory" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txPasteDateStart" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txPasteDateEnd" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txDocNo" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txBulletinId" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txUnitCode" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txSubject" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txRank" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txShowNoRead" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txRemoveProxyRead" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txSearchProc" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txAccount" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txRpsDeptNo" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txSortWay" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txIsAdvanceSearch" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="txSearchExpire" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:DropDownList ID="dlBulletinId" runat="server"></asp:DropDownList>
        </div>
    </form>
</body>
</html>
