<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT272_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT272_MOCS" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT272_MOCS 公文分派作業</title>
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
    <form id="EDT272_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="h_DeptInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_SectInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_UserInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="SectList" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="UserList" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MTable1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server">傳送對象：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="dTR" id="dTRTransferRcv">
                           <asp:RadioButton ID="rbTransferRcv" runat="server" Text="總收文" GroupName="TransferType"></asp:RadioButton>
                        </div>
                        <div class="dTR" id="dTRTransferDeptOri">
                            <asp:RadioButton ID="rbTransferDeptOri" runat="server" Text="原承辦單位/承辦人" GroupName="TransferType"></asp:RadioButton>
                        </div>
                        <div class="dTR">
                            <asp:RadioButton ID="rbTransferDeptOther" runat="server" Text="單位：" GroupName="TransferType"></asp:RadioButton>
                            <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
                            <asp:DropDownList ID="dlSect" runat="server"></asp:DropDownList>
                            <asp:Label ID="Label2" runat="server">人員：</asp:Label>
                            <asp:DropDownList ID="dlUser" runat="server"></asp:DropDownList>
                        </div>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <asp:Panel class="dTR DgSelectToolBar" id ="tbSelect" runat="server" >
                    <asp:Button ID="btSelectAll" runat="server" Text="全選"></asp:Button>
                    <asp:Button ID="btSelectClear" runat="server" Text="清除"></asp:Button>
                    <asp:Button ID="btSelectInverse" runat="server" Text="反向"></asp:Button>
                    <asp:Label ID="Label14" runat="server">公文文號：</asp:Label>
                    <asp:TextBox Style="z-index: 0" ID="txDocNo2" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    <asp:Label ID="Label15" runat="server">勾選筆數：</asp:Label>
                    <asp:Label ID="CheckSendCount" runat="server"></asp:Label>
                    <asp:Label ID="Label12" runat="server">筆</asp:Label>
                </asp:Panel>
                <div class="dTR">
                    <div class="GridDiv">
                        <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="選">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="速<br>別">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
										<asp:Image ID="imgSpd" runat="server"></asp:Image>
										<asp:TextBox ID="hSpdNo" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="燈<br>號">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
										<asp:Image ID="imgLight" runat="server"></asp:Image>
										<asp:TextBox ID="hMsgOutLmt" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hMsgAlmLmt" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hAlarmTime" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="密<br>等">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
										<asp:Image ID="imgSec" runat="server"></asp:Image>
										<asp:TextBox ID="hSecNo" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="類<br>型">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
										<asp:Image ID="imgSignType" runat="server"></asp:Image>
										<asp:TextBox ID="hSignType" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="文號">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:HyperLink ID="lbdgDocNo" runat="server"></asp:HyperLink><br>
										<asp:HyperLink ID="lbFlow" runat="server">流程</asp:HyperLink>
										<asp:TextBox ID="hMsgId" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hNewByOu" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hWebService" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hStoragePath" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hSubDir" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="來文機關">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgFromOrg" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="主旨">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgSubject" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="收文日期">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgRcvDate" runat="server"></asp:Label>
										<asp:TextBox ID="hRcvDate" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="限辦日期">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgDueDate" runat="server"></asp:Label>
										<asp:TextBox ID="hDueDate" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="送方資訊">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgFromInfo" runat="server"></asp:Label><br>
										<asp:Label ID="lbdgNewTime" runat="server"></asp:Label>
										<asp:TextBox ID="hFromOu" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hFromUser" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hNewTime" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="報送<br>案別">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgTAType" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="承辦資訊">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgDeptEmp" runat="server"></asp:Label>
										<asp:TextBox ID="hDeptNo" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hDeptName" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hInChargeOuId" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hInChargeOuName" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hInChargeUserId" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hInChargeEmpName" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="列管<br>類別">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgMOCSPtyNo" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSubFolder" runat="server" Text="文件盒" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:DropDownList ID="ddlSubFolder" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btTransfer" runat="server" Text="傳送" title="傳送" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
