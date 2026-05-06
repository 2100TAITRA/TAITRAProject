<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT136.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT136" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODT136 已掃描待登錄公文查詢作業</title>
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
    <form id="ODT136" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="h_OrgNo" Width="50" runat="server"></asp:TextBox>
            <asp:TextBox ID="h_DeptNo" Width="50" runat="server"></asp:TextBox>
            <asp:TextBox ID="h_UserId" Width="50" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTR">
                        <asp:TextBox class="InputFieldNumeric" ID="txDocNoS" TabIndex="2" runat="server" Width="5.5em"></asp:TextBox>─
						<asp:TextBox class="InputFieldNumeric" ID="txDocNoE" TabIndex="2" runat="server" Width="5.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">掃描批號：</asp:Label>
                    </div>
                    <div class="dTR">
                        <asp:TextBox class="InputFieldNumeric" ID="txBatchNoS" TabIndex="2" runat="server" Width="5.5em"></asp:TextBox>─
						<asp:TextBox class="InputFieldNumeric" ID="txBatchNoE" TabIndex="2" runat="server" Width="5.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">掃瞄日期：</asp:Label>
                    </div>
                    <div class="dTR">
                        <asp:TextBox CssClass="DatePicker" ID="txScanDateS" TabIndex="2" runat="server" Width="4em"></asp:TextBox>─
						<asp:TextBox CssClass="DatePicker" ID="txScanDateE" TabIndex="2" runat="server" Width="4em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server" Visible="False">來文機關：</asp:Label>
                    </div>
                    <div class="dTR">
                        <asp:TextBox ID="txOrgName" runat="server" Width="8em" Visible="False" ForeColor="Navy"></asp:TextBox>
                        <asp:ImageButton ID="btFromPrompt" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif" Height="20px" Visible="False"></asp:ImageButton>
                        <asp:TextBox ID="txFromOrgName1" TabIndex="-1" runat="server" Width="14em" Visible="False" MaxLength="15" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <asp:Panel ID="dgTool" runat="server" CssClass="dTD DgSelectToolBar">
                        <asp:Button ID="btSelectAll" runat="server" Text="全選"></asp:Button>
                        <asp:Button ID="btClear" runat="server" Text="清除"></asp:Button>
                        <asp:Button ID="btReverse" runat="server" Text="反向"></asp:Button><br>
                    </asp:Panel>
                </div>
                <div class="GridDiv" style="height: 12em">
                    <asp:DataGrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlSeqNo" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server" AutoPostBack="False"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="掃描日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbScanDate" runat="server" ReadOnly="True" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlDocNo" runat="server"></asp:HyperLink>
                                    <asp:TextBox ID="H_txSysId" runat="server" Width="1px" Height="1px" CssClass="hidden"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文機關">
                                <ItemTemplate>
                                    <asp:TextBox ID="lbFromOrgName" runat="server" CssClass="PopUp TextLabel" Width="6.5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文字號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromWord" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:TextBox ID="lbSubject" runat="server" CssClass="PopUp TextLabel" Width="9.5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" Text="查詢" ID="btSearch" AccessKey="S" TabIndex="1" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" ID="btDelete" AccessKey="D" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" ID="btClean" AccessKey="Z" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
