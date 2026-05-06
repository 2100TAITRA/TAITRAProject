<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODI260.aspx.cs" AutoEventWireup="false" Inherits="OD.ODI260" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODI260</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <!--#include file="/STDN/Lib/Script.shtml"-->
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODI260" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; left: 1px; position: absolute; top: 1px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Button ID="btPreview" runat="server" Text="預覽"></asp:Button>
                        <asp:Button ID="btPrint" runat="server" Text="列印" class="hide"></asp:Button>
                        <asp:Button ID="btNotify" runat="server" Text="線上申請簽核流程" UseSubmitBehavior="false"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:Label ID="lbDocNo" runat="server" Width="5.5em">公文文號：</asp:Label>
                        <asp:TextBox ID="txDocNo" runat="server" Width="5.5em" ReadOnly="True"></asp:TextBox>
                        <asp:Button ID="btOtherFlow" runat="server" Text="會簽流程" UseSubmitBehavior="false"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:TextBox ID="txTitle" runat="server" CssClass="hidden" Width="12.5em">舊系統流程：(不允許刪除)</asp:TextBox>
                    </div>
                </div>
                <div class="GridDiv" data-fixed='true'>
                    <asp:DataGrid ID="dg2" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4" PageSize="50">
                        <Columns>
                            <asp:BoundColumn DataField="PROC_SEQ" HeaderText="辦理序"></asp:BoundColumn>
                            <asp:BoundColumn DataField="TX_TIME" HeaderText="異動時間"></asp:BoundColumn>
                            <asp:BoundColumn DataField="TX_CODE" HeaderText="異動別"></asp:BoundColumn>
                            <asp:BoundColumn DataField="DEPT_NO_1" HeaderText="異動組室"></asp:BoundColumn>
                            <asp:BoundColumn DataField="DEPT_NO_2" HeaderText="相關組室"></asp:BoundColumn>
                            <asp:BoundColumn DataField="TX_REASON" HeaderText="異動原因"></asp:BoundColumn>
                            <asp:BoundColumn DataField="ENTRY_BY" HeaderText="異動者"></asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
                <div class="GridDiv" style="height: 300px">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4" PageSize="50">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                    <asp:Label ID="lbODT210Seq" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbOwnOuid" runat="server" CssClass="hide"></asp:Label>
                                    <asp:TextBox ID="txApplyRecoverSeqInfo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:Label ID="h_txMsgID" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="H_lbDetailInfo" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:BoundColumn DataField="SUBFOLDER" HeaderText="公文狀態"></asp:BoundColumn>
                            <asp:BoundColumn DataField="OWN_OU_NAME" HeaderText="作業單位"></asp:BoundColumn>
                            <asp:BoundColumn DataField="OWN_USER_NAME" HeaderText="負責人員" ItemStyle-CssClass="PopUpDetailInfo"></asp:BoundColumn>
                            <asp:BoundColumn DataField="USER_NAME" HeaderText="主會辦人"></asp:BoundColumn>
                            <asp:BoundColumn DataField="SIGN_TIME" HeaderText="公文<br>接收時間"></asp:BoundColumn>
                            <asp:BoundColumn DataField="TX_TIME" HeaderText="公文<br>送出時間"></asp:BoundColumn>
                            <asp:BoundColumn DataField="HANDLE_TIME" HeaderText="公文處理時間"></asp:BoundColumn>
                            <asp:BoundColumn DataField="TX_NAME" HeaderText="異動別"></asp:BoundColumn>
                            <asp:BoundColumn DataField="TMP_CER" HeaderText="使用<br>臨時憑證"></asp:BoundColumn>
                            <asp:TemplateColumn HeaderText="核決者">
                                <ItemTemplate>
                                    <asp:Label ID="lbExaminer" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:BoundColumn DataField="TX_REASON" HeaderText="原因註記"></asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <asp:TextBox ID="h_TxDocNo" runat="server" CssClass="hidden"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar hidden"></asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <div id="dlgASPXPage" style="display: none; width: 99%; height: 99%; padding: 0px;">
            <div class="pane" style="width: 101%; height: 101%; overflow-y: hidden; overflow-x: hidden; -webkit-overflow-scrolling: touch;">
                <iframe class="aspx_page_content" style="width: 99%; height: 99%;"></iframe>
            </div>
            <a class="closeBtn" style="display: none"></a>
            <asp:TextBox class="InputFieldNumeric" ID="txSeqNo" TabIndex="2" runat="server" Width="2em"></asp:TextBox>
            <asp:TextBox class="InputFieldNumeric" ID="h_TxCanDelSeqNo" TabIndex="2" runat="server" Width="2em"></asp:TextBox>
        </div>
        <div id="divDetailInfo" style="white-space: pre-line; z-index: 200; border: 1px solid black; background-color: rgb(255, 255, 255); position: absolute;"></div>
        <div id="divCover" style="z-index: 150; background-color: black; opacity: 0.5; display: none; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px"></div>
    </form>
</body>
</html>
