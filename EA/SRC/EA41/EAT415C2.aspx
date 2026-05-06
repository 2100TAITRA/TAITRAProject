<%@ Page Language="c#" CodeBehind="EAT415C2.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAT415C2" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT415C2 抽樣結果子視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
    <style>
        .HandCurs {
            CURSOR: hand;
        }
    </style>
</head>
<body ms_positioning="GridLayout">
    <form id="EAT415C2" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericChild.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="DOC_CHECK" runat="server" Width="97px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txFlag" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txClose" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txClientDLPath" runat="server" CssClass="hidden" Width="7px"></asp:TextBox>
            <asp:TextBox ID="txZipFile" runat="server" CssClass="hidden" Width="7px"></asp:TextBox>
            <asp:TextBox ID="AP_FILEIO_WS" Style="z-index: 102; left: 249px; position: absolute; top: 257px" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="AP_WORK_PATH" Style="z-index: 102; left: 315px; position: absolute; top: 256px" runat="server" CssClass="hidden"></asp:TextBox>
        </div>
        <div class="BaseTable" id="BaseTable">
            <div class="DivTable" id="GridTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Panel ID="tbSelect" runat="server" EnableViewState="False">
                            <asp:Button runat="server" Text="全部選取" ID="btSelectAll" Title="勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="反向選取" ID="btSelectInverse" Title="反向勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="清除選取" ID="btSelectClear" Title="清除勾選所有的CheckBox"></asp:Button>
                        </asp:Panel>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div style="overflow: auto; height: 17em">
                            <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                            <asp:Label ID="lbRealSEQ_NO" runat="server" CssClass="hide"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSELECT" TabIndex="0" onclick="SelectItem('DOC_CHECK')" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="抽樣結果">
                                        <HeaderTemplate>
                                            <asp:Label ID="dglb1" runat="server" CssClass="">抽樣結果</asp:Label>
                                        </HeaderTemplate>
                                        <ItemTemplate>
                                            <asp:Image ID="btResult" runat="server" Style="cursor: pointer" ImageUrl="../../../STDN/IMAGE/CAMERA_T.gif"></asp:Image>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="檢視數位內容">
                                        <ItemTemplate>
                                            <asp:Button ID="btViewDoc" runat="server" Text="檢視" />
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDOC_NO" TabIndex="0" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="檔號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbFILENO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="承辦單位">
                                        <ItemTemplate>
                                            <asp:Label ID="lbRPSDEPT_NO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="lbFROM_SUBJECT" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar InputFieldNumeric" EnableViewState="False">
            <asp:Label runat="server" Text="頁數"></asp:Label>
            <asp:TextBox runat="server" Width="2em" ID="txPage1" BackColor="LightGray" Text="1/10"></asp:TextBox>
            <asp:Label runat="server" Text="筆數"></asp:Label>
            <asp:TextBox runat="server" Width="2em" ID="txTotCount" BackColor="LightGray"></asp:TextBox>
            <asp:Button runat="server" Text="第一頁" ID="btFIRSTPAGE1" AccessKey="F" Title="第一頁(ALT+F)"></asp:Button>
            <asp:Button runat="server" Text="上一頁" ID="btPRIORPAGE1" AccessKey="P" Title="上一頁(ALT+P)"></asp:Button>
            <asp:Button runat="server" Text="下一頁" ID="btNEXTPAGE1" AccessKey="N" Title="下一頁(ALT+N)"></asp:Button>
            <asp:Button runat="server" Text="最末頁" ID="btLASTPAGE1" AccessKey="L" Title="最末頁(ALT+L)"></asp:Button>
            <asp:Label runat="server" Text="跳至第"></asp:Label>
            <asp:TextBox runat="server" Width="2em" ID="txSelectNumber"></asp:TextBox>
            <asp:Label runat="server" Text="頁"></asp:Label>
            <asp:Button runat="server" Text="Go" ID="btSELECTPAGE" AccessKey="T" Title="跳至頁數(ALT+T)"></asp:Button>
            <asp:Button runat="server" Text="刪除" ID="btDelete" AccessKey="D" Title="刪除(ALT+D) 刪除此次抽樣結果"></asp:Button>
            <asp:Button runat="server" Text="檢視公文基資" ID="btPRINTDETAIL" AccessKey="X" Title="檢視公文基資(ALT+X)"></asp:Button>
            <asp:Button runat="server" Text="檢視數位內容" ID="btIMAGE1" AccessKey="V" Title="檢視數位內容(ALT+V)" CssClass ="hide"></asp:Button>
            <asp:Button runat="server" Text="下載檔案" ID="btDOWNLOAD" AccessKey="O" Title="下載檔案(ALT+O)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
