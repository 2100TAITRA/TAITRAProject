<%@ Page language="c#" Codebehind="EDT416.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT416" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE id="TitleCtrl">EDT416 分文請示審核作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDT416" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:textbox id="H_ApplyNo" tabIndex="-1" runat="server" Width="20px" CssClass=""></asp:textbox><asp:textbox id="H_SignType" tabIndex="-1" runat="server" Width="20px"></asp:textbox><asp:textbox id="H_MsgId" tabIndex="-1" runat="server" Width="20px"></asp:textbox><asp:textbox id="H_EmpName" tabIndex="-1" runat="server" Width="20px"></asp:textbox><asp:textbox id="H_UserName" tabIndex="-1" runat="server" Width="20px"></asp:textbox><asp:textbox id="H_DeptNo" tabIndex="-1" runat="server" Width="20px"></asp:textbox><asp:listbox id="lbDept" tabIndex="-1" runat="server" Width="20px" CssClass="" Height="22px"></asp:listbox></DIV>
			<asp:textbox style="Z-INDEX: 101; POSITION: absolute; TOP: 736px; LEFT: 464px" id="htxshow" runat="server"
				Width="53px" CssClass="hide"></asp:textbox>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label1" runat="server" CssClass="KeyField">公文文號：</asp:label></DIV>
						<DIV class="dTD" style="width: 18.5em; "><asp:textbox id="txDocNo" tabIndex="10" runat="server" Width="5.5em" CssClass="KeyField" MaxLength="10"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label11" runat="server" >申請單單號：</asp:label></DIV>
						<DIV class="dTD" style="width: 8.5em; "><asp:textbox id="txApplyNo" tabIndex="-1" runat="server" Width="5.5em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label2" runat="server" >承辦單位：</asp:label></DIV>
						<DIV class="dTD" style="width: 18.5em; "><asp:textbox id="txDept" tabIndex="-1" runat="server" Width="18.5em" ReadOnly="True" CssClass="DisplayOnly"
							ForeColor="Navy"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label4" runat="server" >承辦人：</asp:label></DIV>
						<DIV class="dTD" style="width: 8.5em; "><asp:textbox id="txUser" tabIndex="-1" runat="server" Width="8.5em" ReadOnly="True" CssClass="DisplayOnly"
							ForeColor="Navy"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label7" runat="server" >主　　旨：</asp:label></DIV>
						<DIV class="dTD" style="width: 34em; "><asp:textbox id="txSubject" tabIndex="-1" runat="server" Width="34em" ReadOnly="True" CssClass="DisplayOnly"
							ForeColor="Navy" TextMode="MultiLine" Rows="3"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label5" runat="server" >收創文日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 8.5em; "><asp:textbox id="txRcvDate" tabIndex="-1" runat="server" Width="4.5em" ReadOnly="True" CssClass="DisplayOnly"
							ForeColor="Navy"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width: 5em; "><asp:label id="Label6" runat="server" >限辦日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 5em; "><asp:textbox id="txODueDate" tabIndex="-1" runat="server" Width="4.5em" ReadOnly="True" CssClass="DisplayOnly"
							ForeColor="Navy"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label3" runat="server" >公文性質：</asp:label></DIV>
						<DIV class="dTD" style="width: 8.5em; "><asp:textbox id="txProperty" tabIndex="-1" runat="server" Width="8.5em" ReadOnly="True" CssClass="DisplayOnly"
							ForeColor="Navy"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label15" runat="server" >來文日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 8.5em; "><asp:textbox id="txFromOrgDate" tabIndex="-1" runat="server" Width="4.5em" ReadOnly="True" CssClass="DisplayOnly"
							ForeColor="Navy"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width: 5em; "><asp:label id="Label16" runat="server" >來文字號：</asp:label></DIV>
						<DIV class="dTD" style="width: 20.5em; "><asp:textbox id="txFromNo" tabIndex="-1" runat="server" Width="20.5em" ReadOnly="True" CssClass="DisplayOnly"
							ForeColor="Navy"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label14" runat="server" >來文機關：</asp:label></DIV>
						<DIV class="dTD" style="width: 34em; "><asp:textbox id="txFromOrg" tabIndex="-1" runat="server" Width="34em" ReadOnly="True" CssClass="DisplayOnly"
							ForeColor="Navy"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label12" runat="server" >申請別：</asp:label></DIV>
						<DIV id="testTD" class="dTD" style="width: 8.5em; "><asp:dropdownlist id="dlApplyType" runat="server" Width="5.5em" CssClass="DisplayOnly" Enabled="False"></asp:dropdownlist></DIV>
						<DIV class="dTDTitle" style="width: 7em; "><asp:Label id="Label9" runat="server" >建議改分單位：</asp:Label></DIV>
						<DIV class="dTD" style="width: 8.5em; ">
							<asp:DropDownList id="dListDeptNo" runat="server"></asp:DropDownList>
							<asp:DropDownList id="dltempDept" runat="server" CssClass="hide"></asp:DropDownList>
							<asp:TextBox id="txTempBox" runat="server" Width="3.5em" CssClass="hide"></asp:TextBox>
							<asp:TextBox id="txSignType" runat="server" Width="3.5em" CssClass="hide"></asp:TextBox>
                            <asp:TextBox ID="h_Rolename" TabIndex="-1" runat="server" Width="20px" CssClass="hide"></asp:TextBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label8" runat="server" >說明：</asp:label></DIV>
						<DIV class="dTD" style="width: 34em; "><asp:textbox id="txReason" runat="server" Width="34em" Height="75px" ReadOnly="True" CssClass="DisplayOnly"
							MaxLength="300" ForeColor="Navy" TextMode="MultiLine"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label17" runat="server" >目前狀態：</asp:label></DIV>
						<DIV class="dTD" style="width: 8.5em; "><asp:label id="lbStatus" runat="server" ></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 7em; "><asp:label id="Label10" runat="server" >審核意見：</asp:label></DIV>
						<DIV class="dTD" style="width: 10.5em; ">
							<asp:dropdownlist id="dlPhraseNo" runat="server" Width="10.5em"></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 7em; ">&nbsp;</DIV>
						<DIV class="dTD" style="width: 34em; "><asp:textbox id="txDesc" runat="server" Width="34em" MaxLength="200"></asp:textbox></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable" id="dvfirst">
					<DIV class="dTR">
						<DIV class="dTD" style="width: 38em; ">
							<asp:label id="Label18" runat="server" Font-Bold="True">前次改分申請資訊</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 3em;">
						    <asp:Button ID="btExpand" runat="server" Text="展開" OnClientClick ="ExpandDataGrid(); return false;"></asp:Button>
						</DIV>
						<DIV class="dTD" style="width: 45em;">
						    <asp:Button ID="btClose" runat="server" Text="收合" OnClientClick ="CloseDataGrid(); return false;"></asp:Button>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class="GridDiv" runat="server" id="DivDg0" style="HEIGHT: 110px;" data-fixed="true">
								<asp:datagrid id="dg0" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2">
									<Columns>
										<asp:BoundColumn DataField="SEQ_NO" HeaderText="序">
										</asp:BoundColumn>
                                        <asp:BoundColumn DataField="ENTRY_DATE" HeaderText="申請日期">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="DEPT_SNAME" HeaderText="承辦單位">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="EMP_NAME" HeaderText="承辦人">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="NLL_REASON" HeaderText="建議改分原因"></asp:BoundColumn>
                                        <asp:BoundColumn DataField="SUGGEST_DEPT_NAME" HeaderText="建議改分單位"></asp:BoundColumn>
                                            <asp:TemplateColumn HeaderText="相關明細">
										<ItemTemplate>
											<asp:HyperLink ID="hyAppltDetail" runat="server" CssClass="InputFieldLabel"></asp:HyperLink>
										</ItemTemplate>
									</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
				<div class="DivTable" id="dvAttach" runat="server">                
					<div class="dTR">
						<div class="dTD">
							<asp:TextBox ID="H_WS" runat="server" CssClass="hide"></asp:TextBox>
							<asp:TextBox ID="H_StartPath" runat="server" CssClass="hide"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
							<asp:label id="lbAtt" runat="server" CssClass="hide">分文請示附件：</asp:label>
						<div class="GridDiv" style="height: 140px;" data-fixed="true">
							<asp:DataGrid ID="dgAttach" runat="server" PageSize="50" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
								<Columns>
									<asp:TemplateColumn HeaderText="序">
										<ItemTemplate>
											<asp:Label ID="lbAttSeq" runat="server" CssClass="InputFieldLabel"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="檔名">
										<ItemTemplate>
											<asp:Label ID="lbFileName" runat="server" CssClass="InputFieldLabel"></asp:Label>
											<asp:Label ID="lbFilePath" runat="server" CssClass="hidden"></asp:Label>
											<asp:Label ID="lbFileSize" runat="server" CssClass="hidden"></asp:Label>
											<asp:Label ID="lbFileDesc" runat="server" CssClass="InputFieldLabel"></asp:Label>
											<asp:Label ID="lbFileComeFrom" runat="server" CssClass="hidden"></asp:Label>
											<asp:Label ID="lbFileDraftSeq" runat="server" CssClass="hidden"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="附件描述">
										<ItemTemplate>
											<asp:Label ID="txFileDesc" runat="server" Visible="True"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="執行">
										<ItemTemplate>
											<asp:Button ID="btOpenFile" runat="server" Text="瀏覽"></asp:Button>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
							</asp:DataGrid>
						</div>
					</div>
				</div>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<asp:label id="lbNowFlow" runat="server" Font-Bold="True" CssClass="hide">本次改分申請流程</asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class="GridDiv">
								<asp:datagrid id="dg1" runat="server" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False" PageSize="50">
									<Columns>
										<asp:BoundColumn DataField="SEQ_NO" HeaderText="序">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="ENTRY_DATETIME" HeaderText="審核時間">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="TITLE" HeaderText="審核流程">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="TITLE_NAME" HeaderText="實際簽核主管">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="REBOR_CODE" HeaderText="審核意見"></asp:BoundColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>	
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送：" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
				<asp:Button ID="btApprove" runat="server" Text="核准(A)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btReject" runat="server" Text="退回(R)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="線上瀏覽(V)" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSearch" runat="server" Text="流程資訊(F)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
