<%@ Page Language="c#" CodeBehind="AKR321C1.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR321C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR321C1 案卷封面列印作業(單筆)</title>
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
    <form id="AKR320" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVerNo" TabIndex="1" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server">年度號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFILE_YEAR" TabIndex="1" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFILE_CLS1" TabIndex="2" runat="server" Width="9.5em" CssClass="InputUpperField" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="btCls" runat="server" Visible="False" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="lbFILE_CLS2" TabIndex="-1" runat="server" Width="10.5em" CssClass="TextLabel" MaxLength="20" ReadOnly="true" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">案次號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFILE_CASE1" TabIndex="3" runat="server" Width="9.5em" CssClass="InputUpperField" MaxLength="12"></asp:TextBox>
                        <asp:ImageButton ID="btClass" runat="server" Visible="False" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="lbFILE_CASE2" TabIndex="-1" runat="server" Width="10.5em" CssClass="TextLabel" MaxLength="20" ReadOnly="true" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR hide">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">案次號(訖)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFILE_CASE2" TabIndex="3" runat="server" Width="9.5em" CssClass="InputUpperField" MaxLength="12"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">卷次號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="InputEnOnlyUpperField" ID="tbFILE_VOL1" TabIndex="4" runat="server" Width="2.5em" CssClass="hide" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server" CssClass="hide">－</asp:Label>
                        <asp:TextBox class="InputEnOnlyUpperField" ID="tbFILE_VOL2" TabIndex="5" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="lbDeptName" runat="server">單位名稱：</asp:Label>
                        <asp:TextBox ID="txDeptName" TabIndex="4" runat="server" Width="2.5em" MaxLength="2">台南</asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label10" runat="server">目次號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="InputNumeric" ID="txSeqNoS" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server">－</asp:Label>
                        <asp:TextBox class="InputNumeric" ID="txSeqNoE" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label12" runat="server">保存年限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="InputNumeric" ID="txKeepYear" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label13" runat="server">案名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCaseName" runat="server" Width="9.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR hide">
                    <div class="dTDTitle" style="width: 6.5em; min-height: 1px"></div>
                    <div class="dTD">
                        <asp:Label ID="Label6" runat="server" Width=""></asp:Label>
                        <asp:CheckBox ID="cbPrePrint" runat="server" Width="" Checked="True" Text="預印案卷標籤及封面"></asp:CheckBox>
                        <asp:CheckBox ID="cbDisplay" runat="server" Checked="True" Text="顯示續本"></asp:CheckBox>
                    </div>
                </div>
			</div>
			<div class="DivTable">
				<div class="dTR">
					<div class="dTD">
						<asp:Label ID="Label9" runat="server" CssClass="hide">封面標籤 起始位置：</asp:Label>
						<asp:TextBox ID="txPos" TabIndex="10" runat="server" Width="1.5em" CssClass="hide" MaxLength="2"></asp:TextBox>
						<fieldset style="width: 8.5em; height: 4.5em" class="hide">
							<legend>報表格式</legend>
							<div class="dTR">
								<div class="dTD">
									<asp:RadioButton ID="rbOldType" runat="server" Text="舊格式" GroupName="gn"></asp:RadioButton>
								</div>
							</div>
							<div class="dTR">
								<div class="dTD">
									<asp:RadioButton ID="rbNew" runat="server" Text="新格式" GroupName="gn"></asp:RadioButton>
									<asp:RadioButton ID="rbVgh" runat="server" CssClass="hide" Text="總院" GroupName="gn"></asp:RadioButton>
									<asp:RadioButton ID="rbTvgh" runat="server" CssClass="hide" Text="分院" GroupName="gn"></asp:RadioButton>
									<asp:RadioButton ID="rbA4" runat="server" CssClass="hide" Text="A4格式" GroupName="gn"></asp:RadioButton>
									<asp:RadioButton ID="rbB5" runat="server" CssClass="hide" Text="B5格式" GroupName="gn"></asp:RadioButton>
								</div>
							</div>
							<div class="dTR">
								<div class="dTD">
									<asp:RadioButton ID="rbFileNewType" runat="server" Text="檔管局建議格式" GroupName="gn"></asp:RadioButton>
								</div>
							</div>
						</fieldset>
					</div>
					<div class="dTD hide">
						<fieldset  style="width: 8.5em; height: 4.5em">
							<legend>案卷名稱列印項目</legend>
							<div class="dTD">
								<asp:RadioButton ID="rbCls_Case" runat="server" Text="分類+案名" GroupName="b"></asp:RadioButton><br>
								<asp:RadioButton ID="rbCls" runat="server" Checked="True" Text="分類名" GroupName="b"></asp:RadioButton><br>
								<asp:RadioButton ID="rbCase" runat="server" Text="案名" GroupName="b"></asp:RadioButton><br>
							</div>
						</fieldset>
					</div>
				</div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" ID="btPreview" Text="預覽" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" ID="btPrint" Text="列印" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
            <asp:Button runat="server" Style="display: none" ID="btClean" Text="清除" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
        </asp:Panel>

    </form>
</body>
</html>
