<%@ Page Language="c#" CodeBehind="EDI104.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDI104" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDI104 郵件查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDI104" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="H_Dept" runat="server" Width="80px"></asp:TextBox><asp:TextBox ID="H_Sect_Value" runat="server"></asp:TextBox><asp:TextBox ID="H_dlSect_Value" runat="server"></asp:TextBox><asp:TextBox ID="H_Sect" runat="server"></asp:TextBox><asp:TextBox ID="H_User_Value" runat="server"></asp:TextBox><asp:TextBox ID="H_dlUser_Value" runat="server"></asp:TextBox><asp:TextBox ID="H_User" runat="server" Width="80px"></asp:TextBox><asp:TextBox ID="H_Dept_Value" runat="server"></asp:TextBox><asp:TextBox ID="H_OD_FLOW_TYPE" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">郵件編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12.5em">
                        <asp:TextBox ID="txMailSeqS" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txMailSeqE" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">郵件類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12.5em">
                        <asp:DropDownList ID="dlMailType" runat="server" Width="13em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">收件日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12.5em">
                        <asp:TextBox ID="txRcvDateS" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="20"></asp:TextBox>－
                        <asp:TextBox ID="txRcvDateE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="20"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">處理情形：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12.5em">
                        <asp:DropDownList ID="ddlWorkType" runat="server" Width="7em"></asp:DropDownList>
                        <asp:TextBox ID="txWorkDesc" TabIndex="0" runat="server" Width="6.5em" MaxLength="80"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">發信日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12.5em">
                        <asp:TextBox ID="txMailSendDateS" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="20"></asp:TextBox>－
                        <asp:TextBox ID="txMailSendDateE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="20"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <cc1:ComboBox Style="z-index: 0" ID="dlDept" runat="server" CssClass="comboBox" Width="7.5em"></cc1:ComboBox>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <cc1:ComboBox Style="z-index: 0" ID="dlSect" TabIndex="40" runat="server" CssClass="comboBox" Width="7.5em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">結案日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12.5em">
                        <asp:TextBox ID="txCloseDateS" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="20"></asp:TextBox>－
                        <asp:TextBox ID="txCloseDateE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="20"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox Style="z-index: 0" ID="dlUser" runat="server" CssClass="comboBox" Width="7em"></cc1:ComboBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵件</br>編號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlLink" TabIndex="0" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件日期</br>發信日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server" Width="8em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="預定結案日期</br>實際結案日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbPlanCloseDate" runat="server" Width="8em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發信人</br>電子郵件">
                                <ItemTemplate>
                                    <asp:Label ID="lbMailSenderAddress" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案由">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位</br>承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptUser" runat="server" Width="6.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="處理情形">
                                <ItemTemplate>
                                    <asp:Label ID="lbWorkDesc" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="展延理由">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeleyReason" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="備註">
                                <ItemTemplate>
                                    <asp:Label ID="lbMailDesc" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
