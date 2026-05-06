<%@ Page Language="c#" CodeBehind="AKS502_SMEG.aspx.cs" AutoEventWireup="false" Inherits="AK.AKS502_SMEG" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>AKS502_SMEG 調案查詢</title>
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
    <form id="AKS502_SMEG" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">調案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="dateBegin" runat="server" Width="4em" MaxLength="7" TabIndex="10"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server">至</asp:Label>
                        <asp:TextBox ID="dateEnd" runat="server" Width="4em" MaxLength="7" TabIndex="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em;">
                        <asp:Label ID="Label1" runat="server">調案單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="OrgName" runat="server" Width="11em" TabIndex="30" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em;">
                        <asp:Label ID="Label4" runat="server">調案人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="OrderPerson" runat="server" Width="6em" TabIndex="40" CssClass="comboBox"></cc1:ComboBox>
                        <asp:TextBox ID="txUserValue" runat="server" CssClass="hidden" Width="46px" Height="16px" TabIndex="-1"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em;">
                        <asp:Label ID="Label10" runat="server">專案卡號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em;">
                        <asp:TextBox ID="txClientCardNo" runat="server" Width="4.5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label11" runat="server">列管編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txManageBankNo" runat="server" Width="2em"></asp:TextBox>
                        <asp:TextBox ID="txManageCaseNo" runat="server" Width="3.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server">調案方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOrderMethod" runat="server" Width="6em" TabIndex="50">
                            <asp:ListItem Value="0" Selected="True">全部</asp:ListItem>
                            <asp:ListItem Value="1">檔案原件</asp:ListItem>
                            <asp:ListItem Value="2">線上調檔</asp:ListItem>
                            <asp:ListItem Value="3">檔案複製品</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">歸還狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbRegist" TabIndex="70" runat="server" Text="未登錄" GroupName="retStat"></asp:RadioButton>
                        <asp:RadioButton ID="rbNotRtn" runat="server" Checked="True" GroupName="retStat" Text="未歸還" TabIndex="70"></asp:RadioButton>
                        <asp:RadioButton ID="rbReject" runat="server" GroupName="retStat" Text="已駁回" TabIndex="70"></asp:RadioButton>
                        <asp:RadioButton ID="rbRtn" runat="server" GroupName="retStat" Text="已歸還" TabIndex="71"></asp:RadioButton>
                        <asp:RadioButton ID="rbAll" runat="server" GroupName="retStat" Text="全部" TabIndex="72"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbBorNo" runat="server" GroupName="orderBy" Text="調案單號" ForeColor="Navy"></asp:RadioButton>
                        <asp:RadioButton ID="rbBorDate" runat="server" GroupName="orderBy" Text="調案日期" ForeColor="Navy"></asp:RadioButton>
                        <asp:RadioButton ID="rbFileType" runat="server" GroupName="orderBy" Text="檔案類別(檔號)"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 150px">
                            <asp:DataGrid ID="dg2" runat="server" GridLines="Vertical" CellPadding="4" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White" AutoGenerateColumns="False" PageSize="50">
                                <Columns>
                                    <asp:HyperLinkColumn DataNavigateUrlField="BOR_NO" DataNavigateUrlFormatString="javascript:ReturnValue(&quot;{0}&quot;)" DataTextField="BOR_NO" HeaderText="調案單號"></asp:HyperLinkColumn>
                                    <asp:BoundColumn DataField="DEPT_NAME" HeaderText="調案單位"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="FILE_TYPE" HeaderText="檔案類別(檔號)"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="FILE_NAME" HeaderText="案由"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="EMP_NAME" HeaderText="調案人"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="BOR_TYPE" HeaderText="調案方式"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="STATUS" HeaderText="狀態"></asp:BoundColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
