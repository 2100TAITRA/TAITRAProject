<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT402.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT402" %>

<!DOCTYPE HTML >
<html>
<head>
    <title>EDT402 速別變更申請作業</title>
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
    <form id="EDT402" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_RpsDeptNo" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_Status" TabIndex="-1" runat="server" Width="20px" CssClass=""></asp:TextBox>
            <asp:TextBox ID="H_ApplyNo" TabIndex="-1" runat="server" Width="20px" CssClass=""></asp:TextBox>
            <asp:TextBox ID="H_OD_OFC_HOUR_S" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_OD_OFC_HOUR_E" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_ODMSSP" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_OSpdNo" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_DueDate" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:ListBox ID="lbDept" TabIndex="-1" runat="server" Width="20px" CssClass="" Height="22px" Enabled="False"></asp:ListBox>
            <asp:DropDownList ID="dlProperty" TabIndex="-1" runat="server" Width="30px" CssClass="" Enabled="False"></asp:DropDownList>
            <asp:DropDownList ID="dlSecNo" TabIndex="-1" runat="server" Width="30px" CssClass="" Enabled="False"></asp:DropDownList>
            <asp:DropDownList ID="dlProcessDay" TabIndex="-1" runat="server" Width="30px" CssClass="" Enabled="False"></asp:DropDownList>
            <asp:TextBox ID="H_ShowDecList"  TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <DIV class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <DIV class="dTD" style="width: 6.5em">
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" Width="6em" CssClass="KeyEnUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                    <DIV class="dTDTitle" style="width: 18.5em">
                        <asp:Label ID="Label9" runat="server">原速別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOSpdNm" TabIndex="-1" runat="server" Width="3.5em" ReadOnly="True" CssClass="DisplayOnly" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <DIV class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label10" runat="server">申請單單號：</asp:Label>
                    </div>
                    <DIV class="dTD" style="width: 6.5em">
                        <asp:TextBox ID="txApplyNo" TabIndex="-1" runat="server" Width="4.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <DIV class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">承辦單位：</asp:Label>
                    </div>
                    <DIV class="dTD" style="width: 20.5em">
                        <asp:TextBox ID="txDept" TabIndex="-1" runat="server" Width="18em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:Label ID="Label4" runat="server">承辦人：</asp:Label>
                    </div>
                    <DIV class="dTD">
                        <asp:TextBox ID="txUser" TabIndex="-1" runat="server" Width="7.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <DIV class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">主　　旨：</asp:Label>
                    </div>
                    <DIV class="dTD">
                        <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" Width="32.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <DIV class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:TextBox ID="txRcvDate" TabIndex="-1" runat="server" Width="4em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5.5em">
                        <asp:TextBox ID="txODueDate" TabIndex="-1" runat="server" Width="4em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txProperty" TabIndex="-1" runat="server" Width="7.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <DIV class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label15" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:TextBox ID="txFromOrgDate" TabIndex="-1" runat="server" Width="4em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label16" runat="server">來文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromNo" TabIndex="-1" runat="server" Width="18.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <DIV class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label14" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromOrg" TabIndex="-1" runat="server" Width="32.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <DIV class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label12" runat="server">新速別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:DropDownList ID="dlSpdNo" runat="server" Width="4.5em" CssClass="DisplayOnly" Enabled="False"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label11" runat="server">新限辦日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txNDueDate" TabIndex="-1" runat="server" Width="4em" CssClass="DisplayOnly InputFieldNumeric"></asp:TextBox>
                    </div>
                </div>
                <DIV class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server">原因分析：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlPhraseNo" runat="server" Width="9.5em" CssClass="DisplayOnly" Enabled="False"></asp:DropDownList>
                    </div>
                </div>
                <DIV class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 36em">
                        <asp:TextBox ID="txReason" runat="server" Width="32.5em" CssClass="DisplayOnly" MaxLength="300" TextMode="MultiLine" onblur="isMaxLength(this,'原因分析','300')"></asp:TextBox>
                    </div>
                </div>
                <DIV class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label17" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbStatus" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR" id="divDescList">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbTitleDesc" runat="server" CssClass="hide">說　　明：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 33.8em">
                        <asp:Label ID="lbDesc" runat="server" CssClass="hide"></asp:Label>
                    </div>
                </div>
                <div class="dTR" id="divDescList2">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 2.33em">
                            <asp:Label ID="lbDesList1" runat="server" CssClass ="hide">1.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 37em">
                            <asp:Label class="InputFieldLabel" ID="DescList1" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 2.33em">
                            <asp:Label ID="lbDesList2" runat="server" CssClass ="hide">2.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 37em">
                            <asp:Label class="InputFieldLabel" ID="DescList2" runat="server" CssClass ="hide" ></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 2.33em">
                            <asp:Label ID="lbDesList3" runat="server" CssClass ="hide">3.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 37em">
                            <asp:Label class="InputFieldLabel" ID="DescList3" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 2.33em">
                            <asp:Label ID="lbDesList4" runat="server" CssClass ="hide">4.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 37em">
                            <asp:Label class="InputFieldLabel" ID="DescList4" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 2.33em">
                            <asp:Label ID="lbDesList5" runat="server" CssClass ="hide">5.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 37em">
                            <asp:Label class="InputFieldLabel" ID="DescList5" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                </div>
                <div class="dTR">
					<div class="dTD">
						<asp:Button ID="btAddFile" runat="server" Text="加入附件"></asp:Button>
						<input type="file" id="fileInput" style="display: none" onchange="fnAddFile()" />
						<asp:TextBox ID="H_AttachFromDB" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox ID="H_AttachInf" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox ID="H_AttachDel" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox ID="H_WS" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox ID="H_StartPath" runat="server" CssClass="hide"></asp:TextBox>
					</div>
				</div>
            </div>
            <div id="AttachTable" class="DivTable" runat="server">
				<div class="dTR">
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
										<asp:TextBox ID="txFileDesc" runat="server" Visible="True"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="執行">
									<ItemTemplate>
										<asp:Button ID="btDelete" runat="server" Text="刪除"></asp:Button>
										<asp:Button ID="btOpenFile" runat="server" Text="瀏覽"></asp:Button>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:DataGrid>
					</div>
				</div>
			</div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 8em; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False" PageSize="50">
                        <Columns>
                            <asp:BoundColumn DataField="SEQ_NO" HeaderText="序"></asp:BoundColumn>
                            <asp:BoundColumn DataField="ENTRY_DATETIME" HeaderText="審核時間"></asp:BoundColumn>
                            <asp:BoundColumn DataField="TITLE" HeaderText="審核流程"></asp:BoundColumn>
                            <asp:BoundColumn DataField="TITLE_NAME" HeaderText="實際簽核主管"></asp:BoundColumn>
                            <asp:BoundColumn DataField="REBOR_CODE" HeaderText="審核意見"></asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送(R)" Accesskey = "R" Title = "線上簽核傳送(ALT+R)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btApprove" runat="server" Text="核准(G)" Accesskey = "G" Title = "核准(ALT+G)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCheck" runat="server" Text="確認(C)" Accesskey = "C" Title = "確認(ALT+C)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="流程資訊(I)" Accesskey = "I" Title = "流程資訊(ALT+I)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btBack" runat="server" Text="撤回(B)" AccessKey="B" Style="display: none" DefaultStyle="newmode:none;modifymode:block" />
        </asp:Panel>
    </form>
</body>
</html>
