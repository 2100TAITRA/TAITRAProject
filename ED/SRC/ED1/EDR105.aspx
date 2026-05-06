<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR105.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR105" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR105 待簽收公文查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDR105" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbSendUnit" runat="server">送件單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em">
                        <cc1:ComboBox ID="dlSendUnit" TabIndex="10" runat="server" Width="10.5em" CssClass="comboBox" AutoPostBack="True"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="lbSendUser" runat="server" Width="4em">送件人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlSendUser" TabIndex="10" runat="server" Width="7em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbReceive" runat="server">收件單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em">
                        <cc1:ComboBox ID="dlRcvUnit" TabIndex="10" runat="server" Width="10.5em" CssClass="comboBox" AutoPostBack="True"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server" Width="4em">收件人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlRcvUser" TabIndex="10" runat="server" Width="7em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbDeptName" runat="server">承辦組室：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" Width="10.5em" CssClass="comboBox" AutoPostBack="True"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                   <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">傳送日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>&nbsp;─
						<asp:TextBox ID="txDateE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">傳送時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTimeS" TabIndex="0" runat="server" Width="3em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>&nbsp;─
						<asp:TextBox ID="txTimeE" TabIndex="0" runat="server" Width="3em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>&nbsp;
                        <asp:DropDownList ID="dlTime" runat="server" Width="9em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">簽核類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbTypeP" runat="server" Text="紙本簽核" GroupName="group1"></asp:RadioButton>
                        <asp:RadioButton ID="rbTypeE" runat="server" Text="線上簽核" GroupName="group1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:Label ID="Label5" runat="server" Width="1em">&nbsp;&nbsp;</asp:Label>
                        <asp:CheckBox ID="cbOnlyRcv" runat="server" Width="20em" Text="僅列出目前停留收件單位收件人之公文"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbSort" runat="server">排　　序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDocNo" runat="server" Text="公文文號" GroupName="GroupSort"></asp:RadioButton>
                        <asp:RadioButton ID="rbSendUnit" runat="server" Text="送件單位" GroupName="GroupSort"></asp:RadioButton>
                        <asp:RadioButton ID="rbRcvUnit" runat="server" Text="收件單位" GroupName="GroupSort"></asp:RadioButton>
                        <asp:RadioButton ID="rbTime" runat="server" Text="傳送時間" GroupName="GroupSort"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">報表類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbRptSend" runat="server" Text="依送件單位換頁" GroupName="rptType"></asp:RadioButton>
                        <asp:RadioButton ID="rbRptRcv" runat="server" Text="依收件單位換頁" GroupName="rptType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbRptTxer" runat="server" Text="依送件人換頁" GroupName="rptType"></asp:RadioButton>
                        <asp:RadioButton ID="rbRptRcver" runat="server" Text="依收件人換頁" GroupName="rptType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbRptTime" runat="server" Text="依傳送日期換頁" GroupName="rptType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbRptNo" runat="server" Text="不換頁" GroupName="rptType"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="1.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送件者">
                                <ItemTemplate>
                                    <asp:Label ID="lbSUnit" runat="server" Width="6em"></asp:Label><br>
                                    <asp:Label ID="lbSUser" runat="server" Width="6em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件者">
                                <ItemTemplate>
                                    <asp:Label ID="lbRUnit" runat="server" Width="6em"></asp:Label><br>
                                    <asp:Label ID="lbRUser" runat="server" Width="6em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送文別">
                                <ItemTemplate>
                                    <asp:Label ID="lbTxName" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送件者傳送時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbTxTime" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件者簽收時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbSignTime" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件者傳送時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbNTxTime" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="停留天數">
                                <ItemTemplate>
                                    <asp:Label ID="lbStayDays" runat="server" Width="2.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" Style="overflow: hidden" runat="server" Width="20em" Height="2.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
