<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODI210.aspx.cs" AutoEventWireup="false" Inherits="OD.ODI210" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODI210 案件查詢作業</title>
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
    <form id="ODI210" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <object id="IEControl" style="display: none" codebase="VerifyOcx.ocx" classid="CLSID:58278908-D252-46FC-90BE-831E3B9ACB88" viewastext></object>
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute;" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">立案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDate" TabIndex="10" runat="server" MaxLength="7" Width="4em" CssClass="InputFieldNumeric"></asp:TextBox>－
						<asp:TextBox ID="txEDate" TabIndex="15" runat="server" MaxLength="7" Width="4em" CssClass="InputFieldNumeric"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">關鍵詞：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txWord" TabIndex="20" runat="server" Width="7em"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">(搜尋案名、相關機關、關鍵詞欄位)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="30" runat="server" Width="7em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb0" TabIndex="31" runat="server" Text="全部" GroupName="gn"></asp:RadioButton><br>
                        <asp:RadioButton ID="rb3" TabIndex="34" runat="server" Text="專案管制" GroupName="gn"></asp:RadioButton><br>
                        <asp:RadioButton ID="rb4" TabIndex="40" runat="server" Text="立委質詢" GroupName="gn"></asp:RadioButton><br>
                        <asp:RadioButton ID="rb5" TabIndex="45" runat="server" Text="人民申請" GroupName="gn"></asp:RadioButton><br>
                        <asp:RadioButton ID="rb6" TabIndex="47" runat="server" Text="人民陳情" GroupName="gn"></asp:RadioButton><br>
                        <asp:RadioButton ID="rb7" TabIndex="50" runat="server" Text="訴　　願" GroupName="gn"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable">
				<div class="dTR">
					<asp:Panel ID="dgTool" runat="server" CssClass="dTD DgSelectToolBar">
						<asp:Button ID="btAll" runat="server" Text="全選" />
						<asp:Button ID="btClear" runat="server" Text="清除" />
						<asp:Button ID="btChange" runat="server" Text="反向" />
					</asp:Panel>
				</div>
                <div class="GridDiv" style="height: 9em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="2" PageSize="50" AutoGenerateColumns="False">
                        <Columns>
                            <asp:BoundColumn DataField="SEQ" HeaderText="序"></asp:BoundColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cb1" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案件編號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hl1" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.CASE_NO") %>'></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:BoundColumn DataField="NEW_DATE" HeaderText="立案日期"></asp:BoundColumn>
                            <asp:BoundColumn DataField="TARGET_DATE" HeaderText="預結日期"></asp:BoundColumn>
                            <asp:BoundColumn DataField="CASE_NAME" HeaderText="案名"></asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="案件清冊" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCase" runat="server" Text="案件明細表" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
