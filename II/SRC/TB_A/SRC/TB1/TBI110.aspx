<%@ Page Language="c#" CodeBehind="TBI110.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBI110" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
	<title>TBI110</title>
	<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
	<meta content="C#" name="CODE_LANGUAGE">
	<meta content="JavaScript" name="vs_defaultClientScript">
	<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	<link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
	<!--#include file="/STDN/Lib/Script.shtml"-->
	<style>
		.Bold {
			FONT-WEIGHT: bold;
		}
	</style>
</head>
<body background="../image/obj_04.gif" ms_positioning="GridLayout" style="width: 340px">
	<form id="TBI110" method="post" runat="server" style="width: 340px">
		<!--Template V3 Generated WebForm-->
		<div class="DivTable" id="MainTable">
			<div class="dTR">
				<div class="dTD" style="width: 7.5em">
					<asp:ImageButton ID="btSimple" runat="server" Height="26px" ImageUrl="../IMAGE/icon-2 copy.gif"></asp:ImageButton>
				</div>
				<div class="dTD" style="width: 7.5em">
					<asp:ImageButton ID="btAdvance" runat="server" Height="26px" ImageUrl="../IMAGE/icon-3 copy.gif"></asp:ImageButton>
				</div>
			</div>
			<div id="divAdvance" class="hide" style="width: 270px">
				<div id="trDate1" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond.gif"><asp:Image ID="Image1" runat="server" ImageUrl="../image/menu_icon-01-1.gif"></asp:Image>
					</div>
				</div>
				<div id="trDate2" class="dTR">
					<div class="dTD">
						<asp:TextBox ID="txDateS" runat="server" Width="4.5em" MaxLength="7" Text="" CssClass="DatePicker"></asp:TextBox>
						－
						<asp:TextBox ID="txDateE" runat="server" Width="4.5em" MaxLength="7" Text="" CssClass="DatePicker"></asp:TextBox>
					</div>
				</div>
				<div id="trDocNo1" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond.gif"><asp:Image ID="Image2" runat="server" ImageUrl="../image/menu_icon-02-1.gif"></asp:Image>
					</div>
				</div>
				<div id="trDocNo2" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond2.gif"><asp:TextBox ID="txDocNo" runat="server" Width="80px" MaxLength="15" Text=""></asp:TextBox>
					</div>
				</div>
				<div id="trBulletinNo1" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond.gif"><asp:Image ID="Image3" runat="server" ImageUrl="../image/menu_icon-03-1.gif"></asp:Image>
					</div>
				</div>
				<div id="trBulletinNo2" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond2.gif"></img><asp:TextBox ID="txBulletinNo" runat="server" Width="80px" MaxLength="8" Text="" CssClass="InputFieldText"></asp:TextBox>
					</div>
				</div>
				<div id="trDept1" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond.gif"><asp:Image ID="Image5" runat="server" ImageUrl="../image/menu_icon-04-1.gif"></asp:Image>
					</div>
				</div>
				<div id="trDept2" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond2.gif"></img><asp:DropDownList ID="dlDept" runat="server" CssClass="InputFieldText" Width='160'></asp:DropDownList>
					</div>
				</div>
				<div id="trCategory1" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond.gif"><asp:Image ID="Image6" runat="server" ImageUrl="../image/menu_icon-05-1.gif"></asp:Image>
					</div>
				</div>
				<div id="trCategory2" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond2.gif"><asp:DropDownList ID="dlCategory" runat="server" CssClass="InputFieldText"></asp:DropDownList>
					</div>
				</div>
				<div id="trSubject1" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond.gif"><asp:Image ID="Image7" runat="server" ImageUrl="../image/menu_icon-06-1.gif"></asp:Image>
					</div>
				</div>
				<div id="trSubject2" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond2.gif"></img><asp:TextBox ID="txSubject" runat="server" Width="90px" Text="" CssClass="InputFieldText"></asp:TextBox>
					</div>
				</div>
				<div id="trAccount1" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond.gif"><asp:Image ID="Image10" runat="server" ImageUrl="../image/menu_icon-11-1.gif"></asp:Image>
					</div>
				</div>
				<div id="trAccount2" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond2.gif"></img><asp:TextBox ID="txAccount" runat="server" Width="60px" CssClass="InputFieldText" Text="" MaxLength="20"></asp:TextBox>
						<asp:ImageButton ID="btAccount" runat="server" ImageUrl="../IMAGE/HELPFILE_E.gif"></asp:ImageButton><asp:TextBox ID="txName" TabIndex="0" runat="server" Width="80px" MaxLength="20" BorderColor="#ACD2F7"
							BorderStyle="None" BackColor="#ACD2F7" ReadOnly="True"></asp:TextBox>
					</div>
				</div>
				<div id="trRpsDept1" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond.gif"><asp:Image ID="Image11" runat="server" ImageUrl="../image/menu_icon-12-1.gif"></asp:Image>
					</div>
				</div>
				<div id="trRpsDept2" class="dTR">
					<div class="dTD">
						<img src="../image/left_cond2.gif"></img><asp:DropDownList ID="dlRpsDept" runat="server" CssClass="InputFieldText" Width='160'></asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTD">
						<asp:Image ID="Image8" runat="server" ImageUrl="../image/menu_icon-07-1.gif"></asp:Image>
					</div>
				</div>
				<div class="dTR">
					<div class="dTD">
						<asp:DropDownList ID="dlRank" runat="server" CssClass="InputFieldText">
							<asp:ListItem Value="0">日期</asp:ListItem>
							<asp:ListItem Value="1">類別</asp:ListItem>
							<asp:ListItem Value="2">日期,類別</asp:ListItem>
							<asp:ListItem Value="3">類別,日期</asp:ListItem>
						</asp:DropDownList><asp:RadioButton ID="rbASC" runat="server" GroupName="sort" Text="升冪" /><asp:RadioButton ID="rbDESC" runat="server" GroupName="sort" Text="降冪" Checked="true" />
					</div>
				</div>
				<div class="dTR">
					<div class="dTD">
						<asp:ImageButton ID="ImgbtSearch" runat="server" ImageUrl="../IMAGE/menu_icon-09.gif"></asp:ImageButton>
					</div>
					<div class="dTD">
						<asp:ImageButton ID="ImbtClear" runat="server" ImageUrl="../IMAGE/menu_icon-10.gif"></asp:ImageButton>
					</div>
				</div>
			</div>
			<div class="dTR">
				<div class="dTR">
					<div class="dTD">
						<asp:CheckBox ID="cbShowNoRead" runat="server" BackColor="#ADD3F7" Text="只顯示尚未查閱公告" Checked="True"></asp:CheckBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTD">
						<asp:CheckBox ID="cbRemoveProxyRead" runat="server" Text="排除代理人查閱" BackColor="#ADD3F7"></asp:CheckBox><br>
					</div>
				</div>
				<div id="divAdvance2" class="hide">
					<div class="dTR" >
						<div class="dTD">
							<asp:CheckBox ID="cbSearchExpire" runat="server" BackColor="#ADD3F7" Text="含已逾期限公告" ></asp:CheckBox>
						</div>
					</div>
				</div>
				<div class="dTR">
					<div class="dTD">
						<asp:Image ID="Image4" runat="server" ImageUrl="../image/menu_icon-08-1.gif"></asp:Image><asp:TextBox ID="txCount" runat="server" Width="1.5em" MaxLength="2" Text="" CssClass="InputFieldText"></asp:TextBox>
					</div>
					<div class="dTD">
						<asp:Button ID="btRefresh" runat="server" Text="更新" />
					</div>
				</div>
			</div>
			<div class="dTR">
				<div id="divSimple" style="width: 200px; height: 400px; overflow: auto" class="GridDiv">
					<asp:DataGrid ID="datagrid1" runat="server" Width="200px" BorderStyle="None" BorderColor="White" ForeColor="Black"
						BorderWidth="0px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" Height="204px" PageSize="1" ShowHeader="False">
						<Columns>
							<asp:BoundColumn HeaderImageUrl="../image/icon_pink_button.gif"></asp:BoundColumn>
							<asp:TemplateColumn ItemStyle-BackColor="#ADD3F7">
								<ItemTemplate>
									<table cellspacing="0" cellpadding="0" border="0">
										<div class="dTR">
											<div class="dTD">
												<asp:Image ID="Image9" runat="server" ImageUrl="../image/icon_pink_button.gif"></asp:Image>
												<asp:Label ID="lbCategory" runat="server" Visible="False"></asp:Label>
											</div>
											<div class="dTD">
												<asp:HyperLink ID="hlCategory" runat="server"></asp:HyperLink>
											</div>
										</div>
									</table>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
			<div id="dlgASPXPage" style="display: none; width: 99%; height: 99%; padding: 0px;">
				<div class="pane" style="width: 101%; height: 101%; overflow-y: hidden; overflow-x: hidden; -webkit-overflow-scrolling: touch;">
					<iframe class="aspx_page_content" style="width: 340px; height: 600px;"></iframe>
				</div>
				<a class="closeBtn" style="display: none"></a>
			</div>
			<div id="hiddenDiv" style="z-index: -100; width: 1px; height: 1px; visibility: hidden" class="hide">
				<iewc:Toolbar ID="tbTool" Style="display: none" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False" Font-Size="X-Small"></iewc:Toolbar>
				<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
				<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
				<asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
				<asp:TextBox ID="h_LastClick" runat="server"></asp:TextBox>
				<asp:TextBox ID="txIsAdvanceSearch" runat="server"></asp:TextBox>
			</div>
		</div>
	</form>
</body>
</html>
