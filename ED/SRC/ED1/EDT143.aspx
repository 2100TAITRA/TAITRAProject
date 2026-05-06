<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDT143.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDT143" %>
<!DOCTYPE HTML >
<html>
	<head>
		<title>EDT143 改分銷號公文查詢處理作業</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</head>
	<body ms_positioning="GridLayout">
		<form id="EDT143" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
				<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
				<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
				<asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
				<asp:TextBox ID="H_Artifact" runat="server" Width="19px"></asp:TextBox>
				<asp:TextBox ID="H_OrgNo" runat="server" Width="19px"></asp:TextBox>
				<asp:TextBox ID="H_Http" runat="server" Width="19px"></asp:TextBox>
				<asp:TextBox ID="H_WS_Odmssp" runat="server" Width="19px"></asp:TextBox>
				<asp:TextBox ID="H_SendNo" runat="server" Width="19px"></asp:TextBox>
			 </div>

			<div class="DivBaseTable" id="BaseTable">
                <div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7em">
                            <asp:Label ID="Label1" runat="server">收(創)文日期：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlTempUnit" runat="server" CssClass="hide"></asp:dropdownlist>
                            <asp:TextBox ID="txRcvDateS" runat="server" Width="4.5em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                            <asp:Label ID="Label2" runat="server">～</asp:Label>
                            <asp:TextBox ID="txRcvDateE" runat="server" Width="4.5em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7em">
                            <asp:Label ID="Label3" runat="server">改分銷號日期：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txTxTimeS" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                            <asp:Label ID="Label4" runat="server">～</asp:Label>
                            <asp:TextBox ID="txTxTimeE" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7em">
                            <asp:Label ID="Label5" runat="server">處理狀態：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbAll" runat="server" GroupName="Deal" Text="全部"></asp:RadioButton>
                            <asp:RadioButton ID="rbDeal" runat="server" GroupName="Deal" Text="已處理"></asp:RadioButton>
                            <asp:RadioButton ID="rbNotDeal" runat="server" GroupName="Deal" Text="未處理"></asp:RadioButton>
                        </div>
                    </div>
                </div>
                <div class="DivTable" id="GridTable">
                    <div class="GridDiv">
                        <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="公文文號">
                                    <ItemTemplate>
                                        <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                        <asp:TextBox id="H_MsgId" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox id="H_SignType" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="收(創)日期">
                                    <ItemTemplate>
                                        <asp:Label ID="lbRcvDate" runat="server"></asp:Label>										  
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="主旨">				 
                                    <ItemTemplate>
                                        <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="類型">
                                    <ItemTemplate>
                                        <asp:dropdownlist id="dlType" runat="server">
											<asp:ListItem Value="0">改分</asp:ListItem>
											<asp:ListItem Value="1">銷號</asp:ListItem>
										</asp:dropdownlist>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="原因">			   
                                    <ItemTemplate>
                                        <asp:Label ID="lbReason" runat="server"></asp:Label>											  
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="流程">				 
                                    <ItemTemplate>
                                        <asp:Button id="btProcess" runat="server" Text="開啟"></asp:Button>
										<asp:TextBox id="H_DOCNO" tabIndex="-1" CssClass="hide" runat="server"></asp:TextBox>																
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="傳送">				 
                                    <ItemTemplate>
                                        <asp:dropdownlist id="dlUnit" runat="server"></asp:dropdownlist>
										<asp:Button id="btSend" runat="server" Text="傳送"></asp:Button>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>								  
                    </div>
                </div>
        </div>
			
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button runat="server" Style="display: none" Text="搜尋" ID="btSearch" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
			</asp:Panel>
        </form>
	</body>
</html>
