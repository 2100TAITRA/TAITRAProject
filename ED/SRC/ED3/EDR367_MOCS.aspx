<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR367_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR367_MOCS" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR367_MOCS 管制桌公文查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDR367_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">簽收/送出日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em">
                        <asp:TextBox ID="txSignDateS" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7" ></asp:TextBox>~
                        <asp:TextBox ID="txSignDateE" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>~
                        <asp:TextBox ID="txDocNoE" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em">
                        <asp:DropDownList id="dlDept" runat="server"  Width="9.5em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width:8em">
							<asp:label id="Label4" runat="server">公文類別：</asp:label>
					</div>
					<div class="dTD" style="width: 18em">
						<asp:DropDownList id="dlSendKind" runat="server"  Width="9.5em"></asp:DropDownList>
					</div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label5" runat="server">來文類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em">
                        <asp:RadioButton ID="rbControlDesk" runat="server" GroupName="RecordType" Text="管制桌簽收"></asp:RadioButton>
                        <asp:RadioButton ID="rbDept" runat="server" GroupName="RecordType" Text="退承辦單位"></asp:RadioButton>
                        <asp:RadioButton ID="rbFile" runat="server" GroupName="RecordType" Text="送檔案室"></asp:RadioButton>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label6" runat="server">簽核類型：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em">
                        <asp:RadioButton ID="rbSignTypeP" runat="server" GroupName="ReportType" Text="線上簽核"></asp:RadioButton>
                        <asp:RadioButton ID="rbSignTypeE" runat="server" GroupName="ReportType" Text="紙本簽核"></asp:RadioButton>
                        <asp:RadioButton ID="rbSignTypeAll" runat="server" GroupName="ReportType" Text="全部"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div style="text-align:right;">
                    <asp:Label ID="lbSignCountP" runat="server" CssClass="hide">線上簽核總件數：</asp:Label>
                    <asp:Label ID="lbSlash" runat="server" CssClass="hide">／</asp:Label>
                    <asp:Label ID="lbSignCountE" runat="server" CssClass="hide">紙本簽核總件數：</asp:Label>               
                </div>
                <DIV class="GridDiv" style="height: 24.5em; overflow:auto">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="0" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center"  PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
							</asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文類別">
                                <ItemTemplate>
                                    <asp:Label ID="lbSendKind" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文文號">
                                <ItemTemplate>
										<asp:HyperLink id="hlDocNo" runat="server"></asp:HyperLink>
									</ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主併文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbComNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="簽收/傳送日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbSignTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </DIV>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="查詢" DefaultStyle="newmode:block;modifymode:block;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
