<%@ Page Language="c#" CodeBehind="EDI244.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDI244" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDI244 單位內待辦公文清冊</title>
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
    <form id="EDI244" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_OD_FLOW_PAGE" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Wed010C1Path" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_SourceOgrno" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
					<div class="dTD">
						<asp:Button ID="btMainWork" runat="server" Text="主辦未結"></asp:Button>
						<asp:Button ID="btCoWork" runat="server" Text="會辦未結"></asp:Button>
						<asp:Button ID="btOverDue" runat="server" Text="逾期案件"></asp:Button>
						<asp:Button ID="btWillOver" runat="server" Text="將逾期案件"></asp:Button>
						<asp:Button ID="btWill2Over" runat="server" Text="2天內即將逾期"></asp:Button>
					</div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 13.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" EnableViewState="False" HeaderStyle-HorizontalAlign="Center" >
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="燈號">
                                <ItemTemplate>
                                    <asp:Image ID="btImage" runat="server" ImageUrl="images\alert_yellow.gif"></asp:Image>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
									<asp:HyperLink id="hlApply" runat="server" CssClass="TextLabel">瀏覽</asp:HyperLink>&nbsp;
									<asp:HyperLink id="hlView" runat="server" CssClass="TextLabel">流程</asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收創別">
                                <ItemTemplate>
                                    <asp:Label ID="lbNewByOu" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" Style="overflow: hidden; display: inline-block; height: 1.3em" runat="server" CssClass="PopUp"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收(創)文日期<br>限辦日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server"></asp:Label>
                                    <asp:Label ID="lbDueDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目前所在位置<br>狀態">
								<ItemTemplate>
									<asp:Label ID="lbPosition" runat="server" CssClass="TextLabel" Width="5.5em"></asp:Label><br>
									<asp:Label ID="lbStatus" runat="server" CssClass="TextLabel" Width="5.5em"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主會辦別<br>承辦人">
								<ItemTemplate>
									<asp:Label ID="lbType" runat="server" CssClass="TextLabel" Width="4em"></asp:Label><br>
									<asp:Label ID="lbUserName" Style="overflow: hidden" runat="server" Width="4em"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
                    </div>
                </div>
            </div>
        </div>
<%--        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:none;modifymode:none;" ID="btSearch"></asp:Button>
        </asp:Panel>--%>
    </form>
</body>
</html>
