<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT230.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT230" ValidateRequest="false" %>

<!DOCTYPE HTML >
<html>
<head>
    <title>EDT230 人民陳情案件回覆作業 - 標檢局專用</title>
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
    <form id="EDT230" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:TextBox Style="z-index: 0" ID="H_RtnCom" runat="server"></asp:TextBox><asp:TextBox Style="z-index: 0" ID="H_WSRtnCom" runat="server"></asp:TextBox><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="txOrgName" TabIndex="0" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">郵件編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width:15.5em;">
                        <asp:TextBox ID="txSuggestNo" TabIndex="0" runat="server" Width="7.5em" CssClass="KeyUpperField" MaxLength="13"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label5" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em;">
                        <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="dgDiv">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label199" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar" EnableViewState="False">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
							<asp:Button ID="btSelectClear" runat="server" Text="清除" />
					    </asp:Panel>
                        <div class="GridDiv" data-fixed="true">
                            <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">

                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server" Width="1.5em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbChoose" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號/　　郵件編號">

                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo" runat="server" Width="5.5em"></asp:Label>
                                            <asp:Label ID="lbSuggestNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="業務類別">
                                        <ItemTemplate>
                                            <asp:Label ID="lbBusinessType" runat="server" Width="10.5em"></asp:Label>&nbsp;
													<asp:Label ID="lbSenderEMail" runat="server" CssClass="hide"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSubject" runat="server" Width="20em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label4" runat="server">承辦單位：</asp:Label>
                    </div>
                <div class="dTD" style="width: 15.5em;">
                    <asp:TextBox ID="txOuName" TabIndex="0" runat="server" Width="10em" ReadOnly="True"></asp:TextBox>
                </div>
                <div class="dTDTitle" style="width: 6em;">
                    <asp:Label ID="Label2" runat="server">承辦人：</asp:Label></div>
                <div class="dTD" style="width: 5.5em;">
                    <asp:TextBox ID="txEmpName" TabIndex="0" runat="server" Width="5em" ReadOnly="True"></asp:TextBox>
                </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label3" runat="server">收文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em;">
                        <asp:TextBox ID="txRcvDate" TabIndex="0" runat="server" Width="4.5em" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label6" runat="server">結案日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5.5em;">
                        <asp:TextBox ID="txCloseDate" TabIndex="0" runat="server" Width="8.5em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label7" runat="server">收文者EMAIL：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txEmail" TabIndex="0" runat="server" Width="20em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label8" runat="server">副本收文者EMAIL：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txEmailCc1" TabIndex="0" runat="server" Width="20em" ReadOnly="false"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txEmailCc2" TabIndex="0" runat="server" Width="20em" ReadOnly="false"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txEmailCc3" TabIndex="0" runat="server" Width="20em" ReadOnly="false"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txEmailCc4" TabIndex="0" runat="server" Width="20em" ReadOnly="false"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txEmailCc5" TabIndex="0" runat="server" Width="20em" ReadOnly="false"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label9" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em;">
                        <asp:TextBox ID="txSubject" TabIndex="0" runat="server" Width="30em" MaxLength="300"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label10" runat="server">內容：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em;">
                        <asp:TextBox ID="txContent" TabIndex="0" runat="server" Width="30em" Height="20em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" AccessKey="M" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" AccessKey="Q" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="錄存續辦" AccessKey="S" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btClose" runat="server" AccessKey="D" Text="結案" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" AccessKey="Z" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
