<%@ Page Language="c#" CodeBehind="ODT221.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT221" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<html>
<head>
	<title>ODT221 公文展期審核作業</title>
	<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
	<meta content="C#" name="CODE_LANGUAGE">
	<meta content="JavaScript" name="vs_defaultClientScript">
	<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	<link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
	<object id="ocx" style="display: none" classid="CLSID:58278908-D252-46FC-90BE-831E3B9ACB88"
		viewastext>
	</object>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
	<form id="ODT221" method="post" runat="server">
		<!--Template V2 Generated WebForm-->
		<!--#include file="Template/Res/GenericBanner.htm"-->
		<div class="DivBaseTable">
			<div class="DivTable" id="MTable1">
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label1" runat="server">公文文號：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txDocNo" TabIndex="10" runat="server" MaxLength="15" CssClass="DisplayOnly" ReadOnly="True" Width="5.5em"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label15" runat="server">申請日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 6em">
						<asp:TextBox ID="txTxDate" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="4em"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label20" runat="server">申請單號：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txExtNo" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4.5em"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label34" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
					</div>
				</div>
                <div id="divforCaseApp" style="display: none">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label25" runat="server">案件編號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:TextBox CssClass="DisplayOnly" ReadOnly="True" ID="txCaseNo" TabIndex="10" runat="server" MaxLength="8" Width="5.5em"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label26" runat="server">案件名稱：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 28em">
                            <asp:TextBox ID="txCaseName" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="30em"></asp:TextBox>
                        </div>
                    </div>
				</div>
				<div id="divforCaseAppDate" style="display: none">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label27" runat="server">公文原始限辦日：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 8em">
                            <asp:TextBox CssClass="DisplayOnly" ReadOnly="True" ID="txPdaudate" TabIndex="10" runat="server" MaxLength="10" Width="4em"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 11.5em">
                            <asp:Label ID="Label28" runat="server">原專案管制申請限辦日：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 6em">
                            <asp:TextBox ID="txdaudate" TabIndex="20" runat="server" CssClass="DisplayOnly" MaxLength="7" ReadOnly="True" Width="4em"></asp:TextBox>
                        </div>
                    </div>
                </div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label4" runat="server">主　　旨：</asp:Label>
					</div>
					<div class="dTD" style="width: 28em">
						<asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="30em" TextMode="MultiLine" Rows="3"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txRpsDept" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label5" runat="server">承辦人：</asp:Label>
					</div>
					<div class="dTD" style="width: 6em">
						<asp:TextBox ID="txRpsUser" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4em"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label6" runat="server">收創文日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txRcvDate" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4em"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label7" runat="server">速　　別：</asp:Label>
					</div>
					<div class="dTD" style="width: 6em">
						<asp:TextBox ID="txSpeed" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4em"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label21" runat="server" DESIGNTIMEDRAGDROP="182">來文機關：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txFromOrgNm" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="30em"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label22" runat="server" Width="96px">來文字號：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txFromNo" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="30em"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label8" runat="server">辦理時限：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txLimitDate" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4em"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label9" runat="server">已展期天數：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txHaveExDays" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="1em"></asp:TextBox><asp:Label ID="Label10" runat="server">天</asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label11" runat="server">本次申請展期天數：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txCurrExDays" runat="server" ReadOnly="True" Width="1.5em" CssClass="DisplayOnly"></asp:TextBox><asp:Label ID="Label12" runat="server">天</asp:Label>
					</div>
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label17" runat="server">申請展延次別：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:Label ID="Label18" runat="server">第</asp:Label><asp:TextBox ID="txTimes" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="1em"></asp:TextBox><asp:Label ID="Label2" runat="server">次</asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label23" runat="server">申請後限辦日：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:Label ID="lbNDueDate" runat="server"></asp:Label>
					</div>
					<div class="dTDTitle" style="width: 9.5em"><asp:label id="lbPtyName" runat="server" CssClass="hide">公文性質：</asp:label></div>
					<div class="dTD" style="width: 10em"><asp:textbox id="txPtyName" tabIndex="20" runat="server" CssClass="hide"
								Width="132px" BackColor="LightGray"></asp:textbox></div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label13" runat="server">展期理由：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txExReason" TabIndex="20" runat="server" CssClass="DisplayOnly" ReadOnly="True" TextMode="MultiLine" Height="60px" Width="35em"></asp:TextBox>
					</div>
				</div>
                <div class="dTR" id="TrTxSche">
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label16" runat="server">擬定作業時程：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txSchedule" runat="server" BackColor="LightGray" ReadOnly="True" TextMode="MultiLine" Width="35em" Height="60px" Rows="3"></asp:TextBox>
					</div>
				</div>
                </div>
                <div class="dTR" id="TrDgSche">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label29" runat="server" Width="7.5em">預定作業事項：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="DivTable">
                            <div class="GridDiv" style="height: 90px; overflow: auto" id="DivDgSche">
                                <asp:DataGrid ID="dgSchedule" runat="server" CssClass="DisplayOnly" PageSize="50" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="編號">
                                            <ItemTemplate>
                                                <asp:Label ID="lbSeqWork" runat="server" readonly="readonly" Width="2.5em"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="預　定　作　業　事　項">
                                            <ItemTemplate>
                                                <asp:TextBox ID="txPlan" runat="server" ReadOnly="True" Width="22em" BackColor="LightGray"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="進度起">
                                            <ItemTemplate>
                                                <asp:TextBox ID="txDateS" runat="server" ReadOnly="True" Width="4em" BackColor="LightGray"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="進度迄">
                                            <ItemTemplate>
                                                <asp:TextBox ID="txDateE" runat="server" ReadOnly="True" Width="4em" BackColor="LightGray"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:DataGrid>
                            </div>
                        </div>
                    </div>
                </div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label14" runat="server">目前狀態：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:Label ID="lbCurrStatus" runat="server" Width="30em"></asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label19" runat="server">審核意見：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="dlPhraseNo" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        &nbsp;&nbsp;<asp:label ID="Label24" runat="server">備註意見：</asp:label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txAuditMsg" TabIndex="20" runat="server" Width="35em" MaxLength="200" TextMode="MultiLine" Height="60px"></asp:TextBox>
                    </div>
                </div>
				 <div class="dTR" id="divDesc">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="txAppOnlineMode1" runat="server">說　　明：</asp:Label>
					</div>
					<div class="dTD" style="width: 35em">
						<asp:Label ID="txAppOnlineMode" runat="server" ></asp:Label>
					</div>
				</div>
                </div>
                <div id="divDescList">
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
                            <asp:Label class="InputFieldLabel" ID="Label30" runat="server">說　　明：</asp:Label>
					</div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label31" runat="server">一、</asp:Label>
                        </div>
                        <div class="dTD" style="width: 35em">
                            <asp:Label class="InputFieldLabel" ID="DescList1" runat="server"></asp:Label>
					</div>
				</div>
				<div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label32" runat="server">二、</asp:Label>
                        </div>
                        <div class="dTD" style="width: 35em">
                            <asp:Label class="InputFieldLabel" ID="DescList2" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label33" runat="server">三、</asp:Label>
                        </div>
                        <div class="dTD" style="width: 35em">
                            <asp:Label class="InputFieldLabel" ID="DescList3" runat="server"></asp:Label>
                        </div>
					</div>
				</div>
				<div id="divDescList2">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.33em">
                            <asp:Label ID="lbDesList2_1" runat="server" CssClass ="hide">1.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 39em">
                            <asp:Label class="InputFieldLabel" ID="DescList2_1" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.33em">
                            <asp:Label ID="lbDesList2_2" runat="server" CssClass ="hide">2.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 39em">
                            <asp:Label class="InputFieldLabel" ID="DescList2_2" runat="server" CssClass ="hide" ></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.33em">
                            <asp:Label ID="lbDesList2_3" runat="server" CssClass ="hide">3.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 39em">
                            <asp:Label class="InputFieldLabel" ID="DescList2_3" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.33em">
                            <asp:Label ID="lbDesList2_4" runat="server" CssClass ="hide">4.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 39em">
                            <asp:Label class="InputFieldLabel" ID="DescList2_4" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.33em">
                            <asp:Label ID="lbDesList2_5" runat="server" CssClass ="hide">5.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 39em">
                            <asp:Label class="InputFieldLabel" ID="DescList2_5" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                </div>
			</div>
            <div class="DivTable" id="dvAttach" runat="server">
				<div class="dTR">
				    <div class="GridDiv" style="height: 120px;" data-fixed="true">
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
									    <asp:TextBox ID="txFileDesc" runat="server" Visible="True"></asp:TextBox>
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
			<div class="DivTable" id="dg1div">
				<div class="dTR">
					<div class="GridDiv" style="height: 120px">
						<asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label ID="lbSeq" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="審核時間">
									<ItemTemplate>
										<asp:Label ID="lbAuditTime" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="審核主管">
									<ItemTemplate>
										<asp:Label ID="lbAuditor" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="審核意見">
									<ItemTemplate>
										<asp:Label ID="lbAuditMsg" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:DataGrid>
					</div>
				</div>
			</div>
		</div>
		<div>
			<asp:CustomValidator ID="Validator" runat="server" CssClass="hide" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="hide"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" CssClass="hide"></asp:ListBox>
			<asp:TextBox ID="H_LAST_UPDATE_PROG" CssClass="hide" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_LAST_UPDATE_TIME" CssClass="hide" runat="server"></asp:TextBox>
			<asp:TextBox ID="txTxTime" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="H_WS" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="H_StartPath" runat="server" CssClass="hide"></asp:TextBox>
			<asp:DropDownList ID="dlPhraseDesp" runat="server" CssClass="hide" Width="120px"></asp:DropDownList>
			<asp:TextBox ID="H_ShowDecList2" runat="server" CssClass="hide"></asp:TextBox>
		</div>
		<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btBack" AccessKey="B" title="退回(ALT+B)" runat="server" Text="退回(B)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCommit" AccessKey="G" title="核可(ALT+G)" runat="server" Text="核可(G)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" AccessKey="R" title="線上簽核傳送(ALT+R)" runat="server" Text="線上簽核傳送(R)：" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btSearchFlow" AccessKey="I" title="流程資訊(ALT+I)" runat="server" Text="流程資訊(I)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" AccessKey="U" title="線上瀏覽(ALT+U)" runat="server" Text="線上瀏覽(U)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		</asp:Panel>
	</form>
</body>
</html>
