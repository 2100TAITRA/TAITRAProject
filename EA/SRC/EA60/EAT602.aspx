<%@ Page language="c#" Codebehind="EAT602.aspx.cs" AutoEventWireup="false" Inherits="EA60.EAT602" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT602 移轉(交)計畫維護作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT602" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:textbox id="txFileName" runat="server"></asp:textbox>
				<input type="file" id="fileInput" onchange="fnRegPostBack();"/>  
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">	
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em" ><asp:label id="Label1" runat="server"  Class="RequireField">移轉(交)計畫編號：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txTPlan" tabIndex="0" runat="server" Width="4.5em"  CssClass="RequireField"
								MaxLength="8"></asp:textbox>&nbsp;&nbsp;
							<asp:label id="Label5" runat="server"  >計畫別：</asp:label>
							<asp:dropdownlist id="dlPlanType" runat="server" ></asp:dropdownlist>&nbsp;
							<asp:label id="Label6" runat="server"  >接管機關：</asp:label>
							<asp:textbox id="txOrg" runat="server" Width="5.5em"  ></asp:textbox>
							<asp:imagebutton id="btHelp" tabIndex="15" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:imagebutton>
							<asp:textbox id="txSourceOrgName" tabIndex="-1" runat="server" Width="15em" CssClass="TextLabel"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em" ><asp:label id="Label2" runat="server"  Class="RequireField">發文字號：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txWord" tabIndex="0" runat="server" Width="4em"  CssClass="RequireField" MaxLength="20"></asp:textbox>
							<asp:label id="Label7" runat="server" CssClass="RequireField" >字第</asp:label>
							<asp:textbox id="txNumber" runat="server" CssClass="RequireField" ></asp:textbox>
							<asp:label id="Label8" runat="server" CssClass="RequireField" >號</asp:label>
							<asp:TextBox id="txOrgNo" runat="server" CssClass="hide"></asp:TextBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em" ><asp:label id="Label10" runat="server" >總箱數：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox CssClass="InputFieldNumeric" id="txBoxNum" tabIndex="0" runat="server" Width="4em" MaxLength="20"></asp:textbox>
							<asp:label id="Label9" runat="server"  >箱</asp:label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;							
							<asp:label id="Label3" runat="server"  >移轉(交)檔案數量：</asp:label>
							<asp:textbox CssClass="InputFieldNumeric" id="txFileNum" runat="server" Width="5.5em" ></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em" ><asp:label id="Label4" runat="server"  Class="RequireField">移轉(交)日期：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txTDate" runat="server" Width="4em"  MaxLength="7" CssClass="DatePicker"
								></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em" ><asp:label id="Label14" runat="server"  >備註：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txRemark" runat="server" Width="520px" TextMode="MultiLine" ></asp:textbox></DIV>
					</DIV>
				</DIV>
				<BR />
                <DIV class="DivTable">
                    <DIV class="dTD">
			            <FIELDSET style="WIDTH: 19.5em; HEIGHT: 8em"><LEGEND >移轉(交)機關</LEGEND>
				            <DIV id="Table3">
					            <DIV class="dTR">							
						            <DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label11" runat="server"  >點交人員：</asp:label></DIV>
						            <DIV class="dTD"><asp:textbox id="tx1" runat="server" Width="8em"  MaxLength="7" ></asp:textbox></DIV>
					            </DIV>
					            <DIV class="dTR">							
						            <DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label12" runat="server"  >經辦人員：</asp:label></DIV>
						            <DIV class="dTD"><asp:textbox id="tx2" runat="server" Width="8em"  MaxLength="7" ></asp:textbox></DIV>
					            </DIV>
					            <DIV class="dTR">							
						            <DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label13" runat="server"  
								            Width="112px">業務單位主管：</asp:label></DIV>
						            <DIV class="dTD"><asp:textbox id="tx3" runat="server" Width="8em"  MaxLength="7" ></asp:textbox></DIV>
					            </DIV>
					            <DIV class="dTR">							
						            <DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label15" runat="server"  >機關首長：</asp:label></DIV>
						            <DIV class="dTD"><asp:textbox id="tx4" runat="server" Width="8em"  MaxLength="7" ></asp:textbox></DIV>
					            </DIV>
				            </DIV>
			            </FIELDSET>		
				    </DIV>		
                    <DIV class="dTD">
			            <FIELDSET style="WIDTH: 19.5em; HEIGHT: 8em"><LEGEND >接管機關</LEGEND>
				            <DIV id="Table1">
					            <DIV class="dTR">							
						            <DIV class="dTDTitle" style="WIDTH: 7.5em" ><asp:label id="Label19" runat="server"  >點交人員：</asp:label></DIV>
						            <DIV class="dTD"><asp:textbox id="tx5" runat="server" Width="8em"  MaxLength="7" ></asp:textbox></DIV>
					            </DIV>
					            <DIV class="dTR">							
						            <DIV class="dTDTitle" style="WIDTH: 7.5em" ><asp:label id="Label18" runat="server"  >經辦人員：</asp:label></DIV>
						            <DIV class="dTD"><asp:textbox id="tx6" runat="server" Width="8em"  MaxLength="7" ></asp:textbox></DIV>
					            </DIV>
					            <DIV class="dTR">							
						            <DIV class="dTDTitle" style="WIDTH: 7.5em" ><asp:label id="Label17" runat="server"  
								            Width="112px">業務單位主管：</asp:label></DIV>
						            <DIV class="dTD"><asp:textbox id="tx7" runat="server" Width="8em"  MaxLength="7" ></asp:textbox></DIV>
					            </DIV>
					            <DIV class="dTR">							
						            <DIV class="dTDTitle" style="WIDTH: 7.5em" ><asp:label id="Label16" runat="server"  >機關首長：</asp:label></DIV>
						            <DIV class="dTD"><asp:textbox id="tx8" runat="server" Width="8em"  MaxLength="7" ></asp:textbox></DIV>
					            </DIV>
				            </DIV>
			            </FIELDSET>
				    </DIV>		
                </DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV class="dTR">
						<DIV><asp:label id="Label21" runat="server" >包含清理批號：</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV>
							<asp:label id="Label20" runat="server"  >批號：</asp:label>
							<asp:textbox id="txPlanNo" runat="server" Width="4.5em"  MaxLength="8"></asp:textbox>
							<asp:imagebutton id="btKeyHelp" tabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:imagebutton>&nbsp;&nbsp;&nbsp; 
							<asp:button id="btAdd" runat="server" Text="加入"></asp:button>&nbsp;&nbsp;							
							<asp:Label id="Label22" runat="server"  >計</asp:Label>
							<asp:TextBox id="txCaseCnt" runat="server" Width="2.5em" CssClass="TextLabel" ></asp:TextBox>
							<asp:Label id="Label24" runat="server"  >案</asp:Label>
							<asp:TextBox id="txVolCnt" runat="server" Width="2.5em" CssClass="TextLabel" ></asp:TextBox>
							<asp:Label id="Label26" runat="server"  >卷</asp:Label>
							<asp:TextBox id="txSeqCnt" runat="server" Width="2.5em" CssClass="TextLabel" ></asp:TextBox>
							<asp:Label id="Label28" runat="server"  >件</asp:Label>
						</DIV>
					</DIV>					
					<DIV class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="dTD DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全部選取"></asp:Button>
							<asp:Button ID="btSelectInverse" runat="server" Text="反向選取"></asp:Button>
							<asp:Button ID="btSelectClear" runat="server" Text="清除選取"></asp:Button>
							<asp:Button ID="btDeleteSelected" runat="server" Text="刪除選取"></asp:Button>
						</asp:Panel>
					</DIV>
					<DIV class="GridTable" style="HEIGHT: 10em">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server" ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="選">
									<ItemTemplate>
										<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="批號">
									<ItemTemplate>
										<asp:Label id="lbPlanNum" runat="server" ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="制定日">
									<ItemTemplate>
										<asp:Label id="lbDate" runat="server" ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="說明">
									<ItemTemplate>
										<asp:Label id="lbDesc" runat="server" ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
					<asp:TextBox id="TextBox1" runat="server" CssClass="hide"></asp:TextBox>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btReg" runat="server" Text="憑證登錄" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btView" runat="server" Text="憑證檢視" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
