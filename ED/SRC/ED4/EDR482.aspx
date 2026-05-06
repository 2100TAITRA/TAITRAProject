<%@ Page Language="c#" CodeBehind="EDR482.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR482" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR482 公文線上申請相關資訊查詢作業</title>
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
    <form id="EDR482" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_txUserName" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR" id="trDocNo">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoStar" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server">～</asp:Label>
                        <asp:TextBox ID="txDocNoEnd" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label11" runat="server">申請單號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppBegin" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">～</asp:Label>
                        <asp:TextBox ID="txAppEnd" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label10" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="dateBegin" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server">～</asp:Label>
                        <asp:TextBox ID="dateEnd" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server">申請單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txUserValue" TabIndex="-1" runat="server" Width="3em" CssClass="hidden"></asp:TextBox>
                        <cc1:ComboBox ID="dlDept" TabIndex="30" runat="server" CssClass="comboBox"></cc1:ComboBox>
                        <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
                        <cc1:ComboBox ID="dlSect" TabIndex="30" runat="server" CssClass="comboBox"></cc1:ComboBox>
                        <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label8" runat="server">申請人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <cc1:ComboBox ID="dlUser" TabIndex="50" runat="server" CssClass="comboBox" LBCssClass="InputFieldText"></cc1:ComboBox>
                        <asp:TextBox ID="H_User" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
                        
                    </div>
					<div class="dTD" >
						<asp:CheckBox ID="ckInProxy" TabIndex="160" runat="server" Text="含現代理" data-CN="含現代理"></asp:CheckBox>
					</div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">申請類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlApplyType" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
					<div style="WIDTH: 5.5em" class="dTDTitle">
						<asp:label id="Label4" runat="server">查詢模式：</asp:label>
					</div>
					<div class="dTD">
						<asp:RadioButton id="rbSearch1" runat="server" Text="陳核中表單" Checked="True" GroupName="SearchGroup"></asp:RadioButton>
						<asp:RadioButton id="rbSearch2" runat="server" Text="待核批表單" GroupName="SearchGroup"></asp:RadioButton>
					</div>
				</div>
                <div id="RStatus">
                    <div class="dTR">
					    <div style="WIDTH: 5.5em" class="dTDTitle">
						    <asp:label id="Label7" runat="server">申請狀態：</asp:label>
					    </div>
					    <div class="dTD">
						    <asp:RadioButton id="rbStatus1" runat="server" Text="審核中" Checked="True" GroupName="StatusGroup"></asp:RadioButton>
						    <asp:RadioButton id="rbStatus2" runat="server" Text="已核可" GroupName="StatusGroup"></asp:RadioButton>
                            <asp:RadioButton id="rbStatus3" runat="server" Text="已退回" GroupName="StatusGroup"></asp:RadioButton>
					    </div>
				    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" EnableViewState="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="1.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請單號">
                                <ItemTemplate>
                                    <asp:Label ID="lbApplyNo" runat="server"></asp:Label>
                                    <asp:Label ID="lbApplyDate" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" runat="server" Width="10.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDept" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請人">
                                <ItemTemplate>
                                    <asp:Label ID="lbUser" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請類別">
                                <ItemTemplate>
                                    <asp:Label ID="lbApplyType" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目前位置">
                                <ItemTemplate>
                                    <asp:Label ID="lbCurrLocat" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="單位改分理由">
                                <ItemTemplate>
                                    <asp:Label ID="lbReason" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="長官核示">
                                <ItemTemplate>
                                    <asp:Label ID="lbApprove" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請單資訊">
                                <ItemTemplate>
                                    <asp:Button ID="btopen" runat="server" Width="3em" Text="瀏覽"></asp:Button>
                                    <asp:Label ID="txURL" CssClass="hide" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
