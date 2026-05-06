<%@ Page Language="c#" CodeBehind="EDR364_EXAM.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR364_EXAM" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR364 個人專區及電子郵件狀態查詢列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDR364_EXAM" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label1" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" class="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txDateE" class="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:TextBox ID="txDocNoS" runat="server" Width="8em" MaxLength="15"></asp:TextBox>－
						<asp:TextBox ID="txDocNoE" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label3" runat="server">發文方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlIssueType" runat="server" Width="6.5em">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="Personal">個人專區</asp:ListItem>
                            <asp:ListItem Value="Mail">電子郵件</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label4" runat="server">電子郵件寄送狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSendWait" runat="server" Text="待寄送"></asp:CheckBox>
                        <asp:CheckBox ID="cbSendFailed" runat="server" Text="寄送失敗"></asp:CheckBox>
                        <asp:CheckBox ID="cbSendSuccess" runat="server" Text="寄送成功"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label5" runat="server">受文者：</asp:Label>
                    </div>
                    <div class="dTD">
						<asp:TextBox ID="txOrgName" runat="server" Width="10em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label6" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbIssueDate" runat="server" Text="發文日期" GroupName="Order"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrgName" runat="server" Text="受文者" GroupName="Order"></asp:RadioButton>
                        <asp:RadioButton ID="rbDocNo" runat="server" Text="公文文號" GroupName="Order"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label7" runat="server">排序說明：</asp:Label>
                    </div>
					<div class="dTD">
						<div class="dTR">
							<div class="dTD" style="width: 2em">
								<asp:Label ID="Label8" runat="server">(1)</asp:Label>
							</div>
							<div class="dTD" style="width: 30em">
								<asp:Label ID="Label9" runat="server">依「發文日期」排序：主要依發文日期由新到舊排，次依公文文號由小到大排，再依公文上受文者設定的順序排列；如有相同文號重發，則該件公文文號內的清單紀錄須再依登載/發送時間新到舊排列。</asp:Label>
							</div>
						</div>
						<div class="dTR">
							<div class="dTD" style="width: 2em">
								<asp:Label ID="Label10" runat="server">(2)</asp:Label>
							</div>
							<div class="dTD" style="width: 30em">
								<asp:Label ID="Label11" runat="server">依「受文者」排序：主要依受文者字數短到長、筆畫少到多排列，次依發文日期由新到舊排，再依公文文號由小到大排序；如有相同文號重發，則該件公文文號內的清單紀錄須再依登載/發送時間新到舊排列。</asp:Label>
							</div>
						</div>
						<div class="dTR">
							<div class="dTD" style="width: 2em">
								<asp:Label ID="Label12" runat="server">(3)</asp:Label>
							</div>
							<div class="dTD" style="width: 30em">
								<asp:Label ID="Label13" runat="server">依「公文文號」排序：主要依公文文號由小到大排序，次依公文上受文者設定的順序排列；如有相同文號重發，則該件公文文號內的清單紀錄須再依登載/發送時間新到舊排列。</asp:Label>
							</div>
						</div>
						<div class="dTR">
							<div class="dTD" style="width: 2em">
								<asp:Label ID="Label14" runat="server">(4)</asp:Label>
							</div>
							<div class="dTD" style="width: 30em">
								<asp:Label ID="Label15" runat="server">電郵發文如重發，僅保留最新一筆寄送紀錄。</asp:Label>
							</div>
						</div>
					</div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Text="匯出Excel(O)" DefaultStyle="newmode:block;modifymode:block;" ID="btExcel" AccessKey="O" Title="匯出Excel(ALT+O)"></asp:Button>
            <asp:Button runat="server" Text="匯出ODS(C)" DefaultStyle="newmode:block;modifymode:block;" ID="btODS" AccessKey="C" Title="匯出ODS(ALT+C)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
