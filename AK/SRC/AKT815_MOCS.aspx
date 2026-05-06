<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKT815_MOCS.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT815_MOCS" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKT815 調案單歸還作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="AKT815_MOCS" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label4" runat="server">調案類型：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:RadioButton ID="rbOrg" TabIndex="13" runat="server" Text="機關檔" GroupName="BORTYPE"></asp:RadioButton>
                        <asp:RadioButton ID="rbPer" TabIndex="15" runat="server" Text="個人檔" GroupName="BORTYPE"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server">加入方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
                        <asp:RadioButton ID="rbSearch" TabIndex="13" runat="server" Text="查詢加入" GroupName="ADDTYPE"></asp:RadioButton>
                        <asp:RadioButton ID="rbScan" TabIndex="15" runat="server" Text="掃描加入" GroupName="ADDTYPE"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR" id="DivSearch">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label5" runat="server">調案單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server" Width="8.5em"></asp:DropDownList><br/>
						<asp:DropDownList ID="dlSect" runat="server" Width="8.5em"></asp:DropDownList>
                        <asp:TextBox Style="z-index: 0" ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox Style="z-index: 0" ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox Style="z-index: 0" ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox Style="z-index: 0" ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox Style="z-index: 0" ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox Style="z-index: 0" ID="H_User" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox Style="z-index: 0" ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox Style="z-index: 0" ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label6" runat="server">調案人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlUser" runat="server" Width="8.5em"></asp:DropDownList>
                        <asp:Button ID="btSearch" AccessKey="S" TabIndex="11" runat="server" Width="3.5em" Text="查詢"></asp:Button>&nbsp;
                    </div>
                </div>
                <div class="dTR" id="DivScan">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="lbDocNo" runat="server">文(編)號：</asp:Label>
                        <asp:Label ID="lbPerID" runat="server">身分證號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" Width="7em"></asp:TextBox>
                        <asp:TextBox ID="txPerID" TabIndex="10" runat="server" Width="10em"></asp:TextBox>&nbsp;
							<asp:Button ID="btConfirm" AccessKey="S" TabIndex="11" runat="server" Width="3.5em" Text="加入" CssClass="hide"></asp:Button>&nbsp;
							<asp:Button ID="btQuit" AccessKey="Q" TabIndex="12" runat="server" Width="3.5em" CssClass="hide" Text="取消"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="lbDate" runat="server">展期日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txDate" class="InputFieldNumeric" TabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="H_Save" TabIndex="-1" runat="server" CssClass="hide" Width="13px"></asp:TextBox>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server">異動別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:RadioButton ID="rbRet" TabIndex="13" runat="server" Text="歸還" GroupName="GN"></asp:RadioButton>
                        <asp:RadioButton ID="rbBor" TabIndex="15" runat="server" Text="展期" GroupName="GN"></asp:RadioButton>
                        <asp:TextBox ID="H_Date" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
                    </div>

                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="lbReason" runat="server">展期原因：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="dlReason" TabIndex="30" runat="server" Width="10em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="lbDesc" runat="server">原因說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDesc" TabIndex="40" runat="server" Width="15em" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" runat="server">保存狀況：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlKeepNo" runat="server"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <asp:TextBox ID="H_Value" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
            <div class="DivTable" id="OrgDiv">
                <div class="dTR">

                    <asp:Panel ID="dgTool" runat="server" CssClass="dTD DgSelectToolBar">
                        <asp:Button ID="btAll" runat="server" Text="全選"></asp:Button>
                        <asp:Button ID="btCleanDg" runat="server" Text="清除"></asp:Button>
                        <asp:Button ID="btChange" runat="server" Text="反向"></asp:Button>
                    </asp:Panel>
                </div>
                <div class="GridDiv" style="height: 194px">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2"
                        BorderWidth="1px" ForeColor="Black" BorderColor="White" BorderStyle="Double" BackColor="White" PageSize="50">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                    <asp:TextBox ID="H_Seq" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="-1" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文(編)號">
                                <ItemTemplate>
                                    <asp:Label ID="hlDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案單號">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="應歸日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbDueDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="說明">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorDesc" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>

            <div class="DivTable" id="PerDiv">
                <div class="dTR">
                    <asp:Panel ID="Panel1" runat="server" CssClass="dTD DgSelectToolBar">
                        <asp:Button ID="btAll1" runat="server" Text="全選"></asp:Button>
                        <asp:Button ID="btCleanDg1" runat="server" Text="清除"></asp:Button>
                        <asp:Button ID="btChange1" runat="server" Text="反向"></asp:Button>
                    </asp:Panel>
                </div>
                <div class="dTR">
                    <div class="GridDiv" style="height: 194px;">
                        <asp:DataGrid ID="dg2" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2"
                            BorderWidth="1px" ForeColor="Black" BorderColor="White" BorderStyle="Double" BackColor="White" PageSize="50">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        <asp:TextBox ID="H_Seq" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="選">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbSelect" TabIndex="-1" runat="server"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="文冊註記">
                                    <ItemTemplate>
                                        <asp:Label ID="hlDocNo" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="身分證號">
                                    <ItemTemplate>
                                        <asp:Label ID="lbPerID" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="調案單號">
                                    <ItemTemplate>
                                        <asp:Label ID="lbBorNo" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="調案日期">
                                    <ItemTemplate>
                                        <asp:Label ID="lbBorDate" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="應歸日期">
                                    <ItemTemplate>
                                        <asp:Label ID="lbDueDate" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="說明">
                                    <ItemTemplate>
                                        <asp:Label ID="lbBorDesc" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
