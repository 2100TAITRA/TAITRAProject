<%@ Page Language="c#" CodeBehind="EDT405.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT405" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head runat="server">
    <title>EDT405 改分銷號審核作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <object id="ocx" style="display: none" classid="CLSID:58278908-D252-46FC-90BE-831E3B9ACB88"
        viewastext>
    </object>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT405" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="h_Rolename" TabIndex="-1" runat="server" Width="20px" CssClass=""></asp:TextBox><asp:TextBox ID="H_ApplyNo" TabIndex="-1" runat="server" Width="20px" CssClass=""></asp:TextBox><asp:TextBox ID="H_SignType" TabIndex="-1" runat="server" Width="20px"></asp:TextBox><asp:TextBox ID="H_MsgId" TabIndex="-1" runat="server" Width="20px"></asp:TextBox><asp:TextBox ID="H_EmpName" TabIndex="-1" runat="server" Width="20px"></asp:TextBox><asp:TextBox ID="H_UserName" TabIndex="-1" runat="server" Width="20px"></asp:TextBox><asp:TextBox ID="H_DeptNo" TabIndex="-1" runat="server" Width="20px"></asp:TextBox><asp:ListBox ID="lbDept" TabIndex="-1" runat="server" Width="20px" CssClass=""></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" Width="5.5em" CssClass="KeyField" MaxLength="10"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label11" runat="server">申請單單號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyNo" TabIndex="-1" runat="server" Width="4.5em" CssClass="DisplayOnly"
                            ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20.5em">
                        <asp:TextBox ID="txDept" TabIndex="-1" runat="server" Width="17.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:Label ID="Label4" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUser" TabIndex="-1" runat="server" Width="7.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" Width="32.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy" TextMode="MultiLine" Rows="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
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
                <div class="dTR">
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
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label14" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromOrg" TabIndex="-1" runat="server" Width="32.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label12" runat="server">申請別：</asp:Label>
                    </div>
                    <div class="dTD" id="testTD" style="width: 6.5em">
                        <asp:DropDownList ID="dlApplyType" runat="server" Width="4.5em" CssClass="DisplayOnly" Enabled="False"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label9" runat="server">建議改分單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dListDeptNo" runat="server"></asp:DropDownList>
						<asp:DropDownList id="dlAssignOrg" runat="server"></asp:DropDownList>
                        <asp:DropDownList ID="dltempDept" runat="server" CssClass="hide"></asp:DropDownList>
                        <asp:TextBox ID="txTempBox" runat="server" Width="3.5em" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txSignType" runat="server" Width="3em" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server">變更原因：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txReason" runat="server" Width="32.5em" ReadOnly="True" CssClass="DisplayOnly"
                            MaxLength="300" ForeColor="Navy" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label17" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbStatus" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label10" runat="server">審核意見：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlPhraseNo" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:TextBox ID="txDesc" runat="server" Width="32.5em" MaxLength="200"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="AttachTable" runat="server">
				<div class="dTR">
					<div class="dTD">
						<asp:TextBox ID="H_WS" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox ID="H_StartPath" runat="server" CssClass="hide"></asp:TextBox>
					</div>
				</div>
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
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2">
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
   			<asp:Button ID="btTransfer"  Accesskey="R" title="線上簽核傳送(ALT+R)" runat="server" Text="線上簽核傳送(R)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
   			<asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
			<asp:Button ID="btApprove"  Accesskey="G" title="核准(ALT+G)" runat="server" Text="核准(G)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
   			<asp:Button ID="btReject" Accesskey="B" title="退回(ALT+B)" runat="server" Text="退回(B)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />			
			<asp:Button ID="btPreview" Accesskey="U" title="線上瀏覽(ALT+U)" runat="server" Text="線上瀏覽(U)" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSearch" Accesskey="I" title="流程資訊(ALT+I)" runat="server" Text="流程資訊(I)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		</asp:Panel>
    </form>
</body>
</html>
