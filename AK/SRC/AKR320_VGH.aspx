<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKR320_VGH.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR320_VGH" %>
<%@ Register assembly="Microsoft.Web.UI.WebControls" namespace="Microsoft.Web.UI.WebControls" tagprefix="iewc" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>AKR320_VGH 案卷標籤及目次表列印作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	    <style type="text/css">
            .auto-style1 {
                width: 5.5em;
                height: 1px;
            }
            .auto-style2 {
                height: 1px;
            }
        </style>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKR320_VGH" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 101; POSITION: absolute; TOP: 102px; LEFT: 10px"
				runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label id="Label8" runat="server">版本別：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox onkeypress="jf_InpNumOnly();" id="tbVerNo" tabIndex="1" runat="server" 
									MaxLength="3" Width="2em"></asp:textbox></DIV>
					</DIV>
                    <DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label id="Label1" runat="server">年度號：</asp:label></DIV>
						<DIV><asp:textbox CssClass="InputFieldNumeric" id="tbFILE_YEAR" tabIndex="1" runat="server" 
									MaxLength="3" Width="2em">100</asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label id="Label2" runat="server">分類號(起)：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox onkeypress="jf_UPPERCASE();" id="tbFILE_CLS1" tabIndex="2" runat="server" 
									MaxLength="20" Width="9.5em"></asp:textbox>
                                    <asp:label onkeypress="jf_UPPERCASE();" id="lbFILE_CLS1" tabIndex="-1" runat="server"
									MaxLength="20" Width="16em" ForeColor="Navy"></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label id="Label9" runat="server" >分類號(訖)：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox onkeypress="jf_UPPERCASE();" id="tbFILE_CLS2" tabIndex="2" runat="server" 
									MaxLength="20" Width="9.5em"></asp:textbox>
								    <asp:label onkeypress="jf_UPPERCASE();" id="lbFILE_CLS2" tabIndex="-1" runat="server"  
									Width="16em" MaxLength="20" ForeColor="Navy"></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label id="Label3" runat="server">案次號(起)：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox onkeypress="jf_UPPERCASE();" id="tbFILE_CASE1" tabIndex="3" runat="server" 
									MaxLength="12" Width="7em"></asp:textbox><asp:imagebutton id="btClass" runat="server" Width="1.5em" ImageUrl="template/images/HELPWIN_E.gif"
									Visible="False"></asp:imagebutton>&nbsp;<asp:label onkeypress="jf_UPPERCASE();" id="lbFILE_CASE1" tabIndex="-1" runat="server" 
									MaxLength="20" Width="16em" ForeColor="Navy" ></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label7" runat="server">案次號(訖)：</asp:label></DIV>
						<DIV class="dTD">
								<asp:textbox onkeypress="jf_UPPERCASE();" id="tbFILE_CASE2" tabIndex="3" runat="server" 
									Width="7em" MaxLength="12"></asp:textbox>
								<asp:label onkeypress="jf_UPPERCASE();" id="lbFILE_CASE2" tabIndex="-1" runat="server" 
									Width="16em" MaxLength="20" ForeColor="Navy"></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label id="Label4" runat="server">卷次號：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="tbFILE_VOL1" tabIndex="4" runat="server" OnKeyPress="jf_UPPERCASE();" CssClass="InputEnOnlyUpperField"
									MaxLength="4" Width="2.5em"></asp:textbox><asp:label id="Label5" runat="server">－</asp:label><asp:textbox id="tbFILE_VOL2" tabIndex="5" runat="server" onkeypress="jf_UPPERCASE();" CssClass="InputEnOnlyUpperField"
									MaxLength="4" Width="2.5em"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD"><asp:label id="Label6" runat="server" Width="6.5em"></asp:label><asp:checkbox id="cbPrePrint" runat="server" Width="10.5em" Text="預印案卷標籤及封面"
								Checked="True"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD"><asp:label id="Label10" runat="server" Width="6.5em"></asp:label><asp:checkbox id="cbIsRcvfile" runat="server" Width="18.5em" Checked="True"
								Text="列印紙本來文併同歸檔案件目次表"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<FIELDSET style="WIDTH: 14em; HEIGHT: 9em"><legend>列印報表</legend>
								<DIV class="MainTable" id="Table1" style="WIDTH: 224px; HEIGHT: 85px">
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD" style="width:15em">
											<asp:radiobutton id="rbL" runat="server" Text="案卷標籤　起始位置：" GroupName="a"></asp:radiobutton>
											<asp:textbox id="txPos" tabIndex="10" runat="server" MaxLength="2" Width="2em"></asp:textbox>
										</DIV>
									</DIV>
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD">
												<asp:radiobutton style="Z-INDEX: 0" id="rbL3" runat="server" Text="3公分案卷標籤"
													GroupName="a" Visible="False"></asp:radiobutton></DIV>
									</DIV>
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD">
											<asp:radiobutton style="Z-INDEX: 0" id="rbL6" runat="server" Text="6公分案卷標籤"
												GroupName="a" Visible="False"></asp:radiobutton></DIV>
									</DIV>
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD"><asp:label id="lb1" runat="server" Width="1.5em"></asp:label><asp:checkbox id="cbBarCode" runat="server" Text="是否列印條碼"></asp:checkbox></DIV>
									</DIV>
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD"><asp:radiobutton id="rbCover" runat="server" CssClass="hide" Text="案卷封面" GroupName="a"></asp:radiobutton></DIV>
									</DIV>
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD"><asp:radiobutton id="rbV_SEQ" runat="server" Width="10em" Text="直式案卷目次表"
													Checked="True" GroupName="a"></asp:radiobutton></DIV>
									</DIV>
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD"><asp:radiobutton id="rb2" runat="server" Width="11em" Text="橫式案卷目次表" GroupName="a"></asp:radiobutton></DIV>
									</DIV>
								</DIV>
							</FIELDSET>
							<asp:radiobutton id="rbL_C" runat="server" CssClass="hide" Width="13em" Text="案卷標籤(大) + 封面" GroupName="a"></asp:radiobutton><asp:radiobutton id="rbM_C" runat="server" CssClass="hide" Width="13em" Text="案卷標籤(中) + 封面" GroupName="a"></asp:radiobutton><asp:radiobutton id="rbM" runat="server" CssClass="hide" Text="案卷標籤(中)" GroupName="a"></asp:radiobutton>
						</DIV>
						<DIV class="dTD">	
							<FIELDSET style="WIDTH: 7em; HEIGHT: 6em"><legend>案卷名稱列印項目</legend>
								<DIV class="MainTable" id="Table2" style="WIDTH: 12em; HEIGHT: 5em">
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD"><asp:radiobutton id="rbCls_Case" runat="server" Text="分類+案名" Checked="True"
													GroupName="b"></asp:radiobutton></DIV>
									</DIV>
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD"><asp:radiobutton id="rbCls" runat="server" Text="分類名" GroupName="b"></asp:radiobutton></DIV>
									</DIV>
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD"><asp:radiobutton id="rbCase" runat="server" Text="案名" GroupName="b"></asp:radiobutton></DIV>
									</DIV>
								</DIV>
							</FIELDSET>
							<FIELDSET style="WIDTH: 13em; HEIGHT: 6em" id="fsWidth" runat="server"><legend>卷夾寬度</legend>
								<DIV style="WIDTH: 12em; HEIGHT: 4em" id="Table50" class="MainTable">
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD"><asp:radiobutton id="rbVgh" runat="server" Text="總院" Checked="True"
													GroupName="c"></asp:radiobutton></DIV>
									</DIV>
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD"><asp:radiobutton id="rbWidth2" runat="server" Text="分院(2公分)"
													GroupName="c"></asp:radiobutton></DIV>
									</DIV>
									<DIV class="dTR">
										<DIV class="dTDTitle"></DIV>
										<DIV class="dTD"><asp:radiobutton id="rbWidth3" runat="server" Text="分院(3公分)" GroupName="c"></asp:radiobutton></DIV>
									</DIV>
								</DIV>
								<FONT face="Times New Roman">
							</FIELDSET>	
						</DIV>
					</DIV>
				</DIV>
				<DIV id="Table3" class="DivTable">
					<DIV class="dTR">
						<DIV style="WIDTH: 8em"></DIV>
						<DIV class="dTR">
								<asp:CheckBox id="cbFM" runat="server" Text="依檔管局建議的報表格式輸出"></asp:CheckBox><BR>
								<asp:CheckBox id="cbLine" runat="server" Text="列印案卷目次表框線"></asp:CheckBox><BR>
								<asp:CheckBox id="cbShowPage" runat="server" Text="案卷目次表顯示頁碼"></asp:CheckBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 8em"><asp:label id="lbDesc" runat="server">功能說明：</asp:label></DIV>
						<DIV class="dTR"><asp:label id="lbDetail" runat="server">案卷標籤列印起始位置。請依目前標籤紙列印位置輸入</asp:label></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btRpt" runat="server" Text="報表" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:DropDownList ID="ddRptName" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:none;">
					<asp:ListItem Value="人員薪資單" Selected="True">人員薪資單</asp:ListItem>
					<asp:ListItem Value="中檢資訊">中檢資訊</asp:ListItem>
					<asp:ListItem Value="預設">預設</asp:ListItem>
				</asp:DropDownList>
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			
			<asp:customvalidator id="Validator" style="Z-INDEX: 103; POSITION: absolute; TOP: 410px; LEFT: 1px" runat="server"
				CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 104; POSITION: absolute; TOP: 212px; LEFT: 650px"
				runat="server" CssClass="hidden" Width="27px"></asp:validationsummary>
       </form>
	</body>
</HTML>
