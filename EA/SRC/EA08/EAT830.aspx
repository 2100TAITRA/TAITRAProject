<%@ Page Language="c#" CodeBehind="EAT830.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT830" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT830 批次調案作業</title>
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
    <form id="EAT830" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">調案單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox ID="txBorNoS" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">(起)～</asp:Label>
                        <asp:TextBox ID="txBorNoE" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">(迄)</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyDate" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">調案單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox ID="txBorDept" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" Width="75px">調案人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBorUser" TabIndex="0" runat="server" Width="5.5em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">分　　機：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox ID="txExtPhone" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">調案方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlBorType" runat="server">
                            <asp:ListItem Value="1" Selected="True">檔案原件</asp:ListItem>
                            <asp:ListItem Value="2">線上調檔</asp:ListItem>
                            <asp:ListItem Value="3">檔案複製品</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" id="MainDGTable" style="height: 18.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                    <asp:Label ID="lbBorNo" runat="server"></asp:Label>
                                    <asp:TextBox ID="txBorNo" runat="server" CssClass="hide"></asp:TextBox><br>
                                    <asp:Button ID="btDelRow" runat="server" CssClass="hide" Text="刪除"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文號/檔號">
                                <ItemTemplate>
                                    <asp:Label ID="Label9" runat="server">文號 </asp:Label>
                                    <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" onblur="queryBorrowDetail(this.value)" MaxLength="15"></asp:TextBox>
                                    <asp:CheckBox ID="cbAllStock" runat="server" Text="整櫥"></asp:CheckBox><br>
                                    <asp:Label ID="Label10" runat="server">檔號 </asp:Label>
                                    <asp:TextBox ID="txFileNo" TabIndex="0" runat="server" Width="18.5em" onblur="queryBorrowDetail(this.value)" MaxLength="42"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="櫥位號">
                                <ItemTemplate>
                                    <asp:TextBox ID="txStockNo" runat="server" Width="6.5em" CssClass="TextLabel"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案由(或案名)">
                                <ItemTemplate>
                                    <asp:TextBox ID="txSubject" runat="server" CssClass="PopUp" Width="9.5em" ForeColor="Navy"></asp:TextBox>
                                    <asp:TextBox ID="lbFileExist" runat="server" CssClass="hide" MaxLength="1"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案原因">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlReason" runat="server" Width="10.5em" onchange="DLLPhraseNoChanged()"></asp:DropDownList><br>
                                    <asp:TextBox ID="txReason" TabIndex="0" runat="server" Width="10.5em" MaxLength="100"></asp:TextBox>
                                    <asp:TextBox ID="txSEC_NO" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Text="預覽" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="列印" DefaultStyle="newmode:none;modifymode:block;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Text="調案單總表(A)" DefaultStyle="newmode:none;modifymode:block;" ID="btPreviewList" AccessKey="A" Title="調案單總表(ALT+A)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
