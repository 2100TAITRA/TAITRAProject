<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EAR213.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR213" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR213 掃描影像上傳作業紀錄查詢列印作業</title>
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
    <form id="EAR213" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="InputFieldLabel">上傳日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileDateS" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>～
						<asp:TextBox ID="txFileDateE" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="InputFieldLabel">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocnoS" runat="server" Width="5em" CssClass="InputFieldLabel" ></asp:TextBox>～
						<asp:TextBox ID="txDocnoE" runat="server" Width="5em" CssClass="InputFieldLabel" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">掃描人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlAcpUserName" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                </div>
                
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">上傳狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbUploadErr" runat="server" Text="上傳異常" GroupName="IsUpdate" Checked="true"></asp:RadioButton>
                        <asp:RadioButton ID="rbWaitUpload" runat="server" Text="待上傳" GroupName="IsUpdate"></asp:RadioButton>
                        <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="IsUpdate"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <DIV id="GridTable" class="DivTable">
					<DIV class="GridDiv">
						<asp:datagrid id="dg1" runat="server" PageSize="30" AutoGenerateColumns="False"	GridLines="Vertical" CellPadding="0" EnableViewState="False">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="工作站IP">
									<ItemTemplate>
										<asp:Label id="lbWorkIP" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="掃描人員">
									<ItemTemplate>
										<asp:Label id="lbScanUser" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="上傳日期">
									<ItemTemplate>
										<asp:Label id="lbUploadDate" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="掃描批號">
									<ItemTemplate>
										<asp:Label id="lbBaTchNo" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="文號">
									<ItemTemplate>
										<asp:Label id="lbDocNO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="頁數">
									<ItemTemplate>
										<asp:Label id="lbPageNo" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="上傳狀態">
									<ItemTemplate>
										<asp:Label id="lbStatus" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="異常原因">
									<ItemTemplate>
										<asp:Label id="lbErrReason" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="查詢" DefaultStyle="newmode:block;modifymode:block;" ID="btSearch"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
