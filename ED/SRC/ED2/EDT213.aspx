<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT213.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT213" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT213 紙本公文轉線上簽核作業</title>
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
    <form id="EDT213" onkeyup="jf_CheckFull();" method="post" runat="server" enctype="multipart/form-data">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txElecSysId" runat="server"></asp:TextBox>
            <asp:TextBox ID="txRcvScanSysId" runat="server"></asp:TextBox>
            <asp:TextBox ID="txNewByOu" runat="server"></asp:TextBox>
            <asp:TextBox ID="txRcvNotScanSysId" runat="server"></asp:TextBox>
            <asp:TextBox ID="txMsgId" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txNeedUpload" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txIsReuploadE" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="6em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbFilePath" runat="server" CssClass="hide">掃描影像路徑：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFilePath" runat="server" CssClass="hide" Height="1.7em" type="file" multiple="true" accept=".pdf, .tif, .tiff"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div style="height: 31.5em" class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeqNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbStatus" runat="server"></asp:Label>
                                    <asp:TextBox ID="txMsgId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txFromMsgId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txThread" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txFromThreadMsgId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txOwnOuId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txOwnRoleId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txOwnUserId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txTxFlag" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="作業單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbOwnOuName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="負責人員">
                                <ItemTemplate>
                                    <asp:Label ID="lbOwnUserName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="接收時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbSignDate" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbSignTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送出時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbTxDate" runat="server"></asp:Label>
                                    <asp:Label ID="lbTxTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文處理<br>時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbHandleTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="異動別">
                                <ItemTemplate>
                                    <asp:Label ID="lbTxName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="是否使用<br>臨時憑證">
                                <ItemTemplate>
                                    <asp:Label ID="lbTmpCer" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="核決者">
                                <ItemTemplate>
                                    <asp:Label ID="lbAppUserName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="轉線上簽核(S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消(X)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
