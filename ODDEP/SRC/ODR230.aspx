<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODR230.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR230" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR230 延後歸檔公文查詢列印作業</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <link rel="stylesheet" type="text/css" href="LIB/AK.css">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR230" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue"
            runat="server" CssClass="hidden"></asp:ListBox>
        <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbDept"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyDateS" TabIndex="1" CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txApplyDateE" TabIndex="2" CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" ID="AppTr">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">判核日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppDateS" TabIndex="9" CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txAppDateE" TabIndex="10" CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">結案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txClsDateS" TabIndex="3" CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txClsDateE" TabIndex="4" CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" ID="DocTr">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDoc" TabIndex="5" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>(起)－
						<asp:TextBox ID="txEDoc" TabIndex="6" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>(迄)
                    </div>
                </div>
                <div class="dTR" ID="RcvDateTr">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDateS" TabIndex="7" CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txRcvDateE" TabIndex="8" CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server">承辦單位：</asp:Label>
					</div>
                    <div class="dTD">
						<div class="dTR">
							<asp:DropDownList ID="dlDept" runat="server" Width="11em"></asp:DropDownList>
						</div>
						<div class="dTR">
							<asp:DropDownList ID="dlSect" runat="server" Width="11em"></asp:DropDownList>
						</div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label6" runat="server">承辦人：</asp:Label>
					</div>
                    <div class="dTD">
						<asp:DropDownList ID="dlUser" runat="server" Width="11em"></asp:DropDownList>
					</div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label39" runat="server">分頁方式：</asp:Label>
                    </div>
						<div class="dTD" style="width: 13em">
                        <asp:RadioButton ID="rbSpiltPerson" runat="server" Text="依申請人員" GroupName="rbSearch" data-CN="依申請人員"></asp:RadioButton>
                        <asp:RadioButton ID="rbSpiltDept" runat="server" Text="依申請單位" GroupName="rbSearch" data-CN="依申請單位"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable">
				<div class="GridDiv" style="height: 16.5em">
					<asp:DataGrid ID="dg1" runat="server" ShowHeader="True"	GridLines="Vertical" CellPadding="2" PageSize="30" AutoGenerateColumns="False" HorizontalAlign="Left">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label ID="lbNo" runat="server"  ></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="公文文號">
								<ItemTemplate>
									<asp:Label ID="lbDocNo" runat="server"  ></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="收(創)文日期">
								<ItemTemplate>
									<asp:Label ID="lbRcvDate" runat="server"  ></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="申請日期">
								<ItemTemplate>
									<asp:Label ID="lbApplyDate" runat="server"  ></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="結案日期">
								<ItemTemplate>
									<asp:Label ID="lbClsDate" runat="server"  ></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="承辦單位">
								<ItemTemplate>
									<asp:Label ID="lbDeptName" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="承辦人">
								<ItemTemplate>
									<asp:Label ID="lbUserName" runat="server" Width="5.5em"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="主旨">
								<ItemTemplate>
									<asp:Label ID="lbSubject" runat="server" Width="13em"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
            </div>
        </div>
		<div style="width: 708px; display: none; height: 42px; visibility: hidden" id="hiddenDiv">
			<asp:TextBox ID="H_Sect_Index" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
			<asp:TextBox ID="H_User_Index" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
			<asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
			<asp:TextBox ID="H_User_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Artifact" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
		</div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 104; position: absolute; top: 218px; left: 12px" ID="Validator"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 105; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
