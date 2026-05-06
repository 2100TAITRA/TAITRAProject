<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT352_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDT352_MOCS" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT352 銓審公文批次發文作業</title>
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
    <form id="EDT352_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txAddFlag" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <fieldset style="min-width: 45em">
                    <legend>
                        <asp:Label ID="Label1" runat="server">刷入條碼</asp:Label>
                    </legend>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6em">
                            <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txDocNo" runat="server" Width="5.5em"  MaxLength="10"></asp:TextBox>
                            <asp:Button ID="btAdd" runat="server" Text="確定"></asp:Button>
                        </div>
                    </div>
                </fieldset>
                <fieldset style="min-width: 45em">
                    <legend>
                        <asp:Label ID="Label3" runat="server">查詢條件</asp:Label>
                    </legend>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6em">
                            <asp:Label ID="Label4" runat="server">送發日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 15em">
                            <asp:TextBox ID="txSendDateS" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox> - 
                            <asp:TextBox ID="txSendDateE" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 6em">
                            <asp:Label ID="Label7" runat="server" >簽核類型：</asp:Label>
                        </div>
                        <div class="dTD">
							<asp:radiobutton id="rbSignTypeAll" runat="server" Text="全部" GroupName="SignType"></asp:radiobutton>
							<asp:radiobutton id="rbSignTypeP" runat="server" Text="紙本" GroupName="SignType"></asp:radiobutton>
							<asp:radiobutton id="rbSignTypeE" runat="server" Text="線上" GroupName="SignType"></asp:radiobutton>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="DivTable" id="GridTable">
				<div class="dTR">
					<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
						<asp:Button ID="btSelectAll" runat="server" Text="全選" />
                        <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
						<asp:Button ID="btSelectClear" runat="server" Text="清除" />
					</asp:Panel>
				</div>
                <div class="GridDiv" style="height: 18em">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
								<ItemTemplate>
									<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="歸">
								<ItemTemplate>
									<asp:CheckBox id="cbSend" tabIndex="0" runat="server"></asp:CheckBox>
								</ItemTemplate>
							</asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
									<asp:HyperLink ID="lbDocNo" runat="server"></asp:HyperLink>
									<br><asp:Label ID="lbShowCombine" runat="server"></asp:Label>
									<asp:TextBox ID="hMsgID" runat="server" CssClass="hide"></asp:TextBox>
									<asp:TextBox ID="hWebService" runat="server" CssClass="hide"></asp:TextBox>
									<asp:TextBox ID="hStoragePath" runat="server" CssClass="hide"></asp:TextBox>
									<asp:TextBox ID="hSubDir" runat="server" CssClass="hide"></asp:TextBox>
									<asp:TextBox ID="hDocState" runat="server" CssClass="hide"></asp:TextBox>
									<asp:TextBox ID="hCombineType" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="主旨" >
								<ItemStyle HorizontalAlign="Left"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="限辦日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbDuedate" runat="server"></asp:Label>
									<asp:TextBox ID="hDuedate" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="承辦資訊">
                                <ItemTemplate>
                                    <asp:Label ID="lbOuName" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label>
									<asp:TextBox ID="hDeptName" runat="server" CssClass="hide"></asp:TextBox>
									<asp:TextBox ID="hSectName" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="報送案別">
                                <ItemTemplate>
                                    <asp:Label ID="lbTaType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="簽核類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbSignType" runat="server"></asp:Label>
									<asp:TextBox ID="hSignType" runat="server" CssClass="hide"></asp:TextBox>									
                                </ItemTemplate>
                            </asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="發文結轉狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbTAStateDesc" runat="server"></asp:Label>
									<asp:TextBox ID="hTaState" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="搜索" DefaultStyle="newmode:block;modifymode:block;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="發文結轉" DefaultStyle="newmode:block;modifymode:block;" ID="btUpdate"></asp:Button>
			<asp:Button runat="server" Style="display: none" Text="歸檔傳送" DefaultStyle="newmode:block;modifymode:block;" ID="btArchive"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
