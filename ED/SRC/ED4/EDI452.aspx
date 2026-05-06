<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI452.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDI452" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDI452 公文列管查詢作業</title>
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
    <form id="EDI452" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox Style="z-index: 0" ID="H_dlDept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_User" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_Privilege" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
						<asp:dropdownlist id="dlDocType" runat="server">
							<asp:ListItem Value="1" Selected="True">公文文號</asp:ListItem>
							<asp:ListItem Value="2">結案文號</asp:ListItem>
						</asp:dropdownlist>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" TabIndex="0" runat="server" Width="8em" MaxLength="15"></asp:TextBox>～
                        <asp:TextBox ID="txDocNoE" TabIndex="0" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
						<asp:dropdownlist id="dlDate" runat="server">
							<asp:ListItem Value="1" Selected="True">收(創)文日期</asp:ListItem>
							<asp:ListItem Value="2">續辦到期日</asp:ListItem>
						</asp:dropdownlist>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" TabIndex="0" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>～
                        <asp:TextBox ID="txDateE" TabIndex="0" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19em">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 7.5em">
						<asp:label id="Label7" runat="server">是否結案：</asp:label></div>
					<div class="dTD" style="WIDTH: 19em">
                        <asp:RadioButton ID="rbCloseAll" runat="server" GroupName="IsClose" Text="全部"></asp:RadioButton>
                        <asp:RadioButton ID="rbCloseY" runat="server" GroupName="IsClose" Text="是"></asp:RadioButton>
                        <asp:RadioButton ID="rbCloseN" runat="server" GroupName="IsClose" Text="否"></asp:RadioButton>
					</div>
                    <div class="dTDTitle" style="WIDTH: 7.5em">
						<asp:label id="Label10" runat="server">辦理狀態：</asp:label>
					</div>
					<div class="dTD">
                        <asp:RadioButton ID="rbOverAll" runat="server" GroupName="IsOver" Text="全部"></asp:RadioButton>
                        <asp:RadioButton ID="rbOverNone" runat="server" GroupName="IsOver" Text="未逾期"></asp:RadioButton>
                        <asp:RadioButton ID="rbOverComing" runat="server" GroupName="IsOver" Text="將到期"></asp:RadioButton>
                        <asp:RadioButton ID="rbOverAlready" runat="server" GroupName="IsOver" Text="已逾期"></asp:RadioButton>
					</div>
				</div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
						<asp:label id="Label3" runat="server">主旨：</asp:label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" TabIndex="0" runat="server" TextMode="MultiLine" Width="34em"></asp:TextBox>
                    </div>
                </div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 7.5em">
						<asp:label id="Label4" runat="server">排序方式：</asp:label></div>
					<div class="dTD">
                        <asp:RadioButton ID="rbOrderDocNo" runat="server" GroupName="Order" Text="公文文號"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderRcvDate" runat="server" GroupName="Order" Text="收(創)文日期"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderDueDate" runat="server" GroupName="Order" Text="續辦到期日"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderAlertDate" runat="server" GroupName="Order" Text="到期提醒日"></asp:RadioButton>
					</div>
				</div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 16.5em; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="lbDocNo" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收(創)文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="續辦到期日">
                                <ItemTemplate>
                                    <asp:Label ID="lbDueDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="到期提醒日">
                                <ItemTemplate>
                                    <asp:Label ID="lbAlertDays" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbAlertDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDept" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbUser" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="進度說明">
                                <ItemTemplate>
                                    <asp:Label ID="lbAuditDesc" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="是否結案&lt;BR&gt;結案文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbIsClosed" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbCloseNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <asp:TextBox ID="h_DeptInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_SectInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_UserInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="SectList" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="UserList" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_workTypeIndex" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_workTypeValue" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_workTypeText" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Text="匯出Excel(O)" DefaultStyle="newmode:block;modifymode:none;" AccessKey="O" Title="匯出Excel(ALT+O)" ID="btExcel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
