<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EDI352_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDI352_MOCS" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDI352_MOCS 銓審公文發文整合狀態查詢作業</title>
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
    <form id="EDI352_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="h_LastDocNo" runat="server" Width="80px"></asp:TextBox>
            <asp:TextBox ID="h_LastGuid" runat="server" Width="80px"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" Style="z-index: 0">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txIuuseDateS" TabIndex="0" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server">－</asp:Label>
                        <asp:TextBox ID="txIuuseDateE" TabIndex="0" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">－</asp:Label>
                        <asp:TextBox ID="txDocNoE" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label5" runat="server">結轉狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="Status"></asp:RadioButton>
                        <asp:RadioButton ID="rbStatusSuccess" runat="server" Text="處理成功" GroupName="Status"></asp:RadioButton>
                        <asp:RadioButton ID="rbStatusFail" runat="server" Text="處理異常" GroupName="Status"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                    <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                    <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                    <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
                </asp:Panel>
                <div class="GridDiv" style="height: 50vh;" data-fixed="true">
                    <asp:DataGrid ID="dgMain" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="2em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlDocNo" TabIndex="0" runat="server" Width="1.5em"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueDate" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server" Width="23.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="結轉狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbStatus" runat="server" Width="4em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦資訊">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptEmp" runat="server" Width="4em"></asp:Label>
                                    <asp:TextBox ID="h_username" runat="server" Width="4em" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="簽核類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbSignType" runat="server" Width="4em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="異常訊息">
                                <ItemTemplate>
                                    <asp:Label ID="lbErrMsg" runat="server" Width="4em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
		<DIV class="DivTable">
			<DIV id="DivDetail" class="hide" style="width: 800px" runat="server">
				<DIV class="dTR">
					<SPAN id="spanDocNo" style="BORDER-BOTTOM-STYLE: outset; TEXT-ALIGN: center; BORDER-RIGHT-STYLE: outset; BACKGROUND-COLOR: #5f9cc5; WIDTH: 147px; BORDER-TOP-STYLE: outset; HEIGHT: 25px; COLOR: aliceblue; BORDER-LEFT-STYLE: outset; color:Navy" runat="server"></SPAN>
					<SPAN id="spanDetail" onmouseover="this.style.cursor = 'hand'" style="BORDER-BOTTOM-STYLE: outset; TEXT-ALIGN: center; BORDER-RIGHT-STYLE: outset; BACKGROUND-COLOR: darkblue; WIDTH: 147px; BORDER-TOP-STYLE: outset; HEIGHT: 25px; COLOR: aliceblue; BORDER-LEFT-STYLE: outset"
						onmouseout="this.style.cursor='default'">受文者明細</SPAN>
				</DIV>
                <fieldset style="height: 25vh;">
				    <DIV class="DivTable">
						<div class="GridDiv" style="height: 20vh;" data-fixed="true">
							<asp:DataGrid ID="dgDetail" runat="server" CellPadding="0" PageSize="1" AutoGenerateColumns="False">
								<Columns>
									<asp:TemplateColumn HeaderText="序">
										<ItemTemplate>
											<asp:Label ID="lbDetailSeq" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="發文號">
										<ItemTemplate>
											<asp:Label ID="lbDetailIssueNo" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="支號">
										<ItemTemplate>
											<asp:Label ID="lbDetailSubNo" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="受文機關">
										<ItemTemplate>
											<asp:Label ID="lbDetailOrgName" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="受文者">
										<ItemTemplate>
											<asp:Label ID="lbDetailOrgDetail" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
							</asp:DataGrid>
						</div>
					</div>
                </fieldset>
			</DIV>
		</DIV>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btResend" runat="server" Text="重新發文結轉" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
