<%@ Page Language="c#" CodeBehind="EDT404.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT404" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head runat="server">
    <title >EDT404 改分銷號申請作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT404" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Status" TabIndex="-1" runat="server" Width="20px" ReadOnly="True" CssClass=""></asp:TextBox>
            <asp:TextBox ID="H_ApplyNo" TabIndex="-1" runat="server" Width="20px" ReadOnly="True" CssClass=""></asp:TextBox>
            <asp:TextBox ID="H_DeptNo" TabIndex="-1" runat="server" Width="20px" ReadOnly="True"></asp:TextBox>
            <asp:ListBox ID="lbDept" TabIndex="-1" runat="server" Width="20px" CssClass="" Height="22px"
                Enabled="False"></asp:ListBox><asp:DropDownList ID="H_dlOD06" runat="server"></asp:DropDownList>
            <asp:DropDownList ID="H_dlOD07" runat="server"></asp:DropDownList>
            <asp:DropDownList ID="H_dlOD10" runat="server"></asp:DropDownList>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" Width="5.5em" CssClass="KeyEnUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label10" runat="server">申請單單號：</asp:Label>
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
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox ID="txDept" TabIndex="-1" runat="server" Width="17.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
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
                    <div class="dTD" style="width: 8em">
                        <asp:TextBox ID="txRcvDate" TabIndex="-1" runat="server" Width="4em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5.5em">
                        <asp:TextBox ID="txODueDate" TabIndex="-1" runat="server" Width="4em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
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
                    <div class="dTD" style="width: 8em">
                        <asp:TextBox ID="txFromOrgDate" TabIndex="-1" runat="server" Width="4em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label16" runat="server">來文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromNo" TabIndex="-1" runat="server" Width="19em" ReadOnly="True" CssClass="DisplayOnly"
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
                    <div class="dTD" style="width: 5.5em">
                        <asp:DropDownList ID="dlApplyType" runat="server" Width="4.5em" CssClass="DisplayOnly" Enabled="False"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label9" runat="server">建議改分單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:DropDownList ID="dListDeptNo" runat="server"></asp:DropDownList>
                        <asp:DropDownList ID="dlAssignOrg" runat="server"></asp:DropDownList>
                        <asp:DropDownList ID="dltempDept" runat="server" CssClass="hide"></asp:DropDownList>
                        <asp:TextBox ID="txTempBox" runat="server" Width="3em" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txSignType" runat="server" Width="3em" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server">變更原因：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlPhraseNo" runat="server" Width="10em" CssClass="DisplayOnly" Enabled="False"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:TextBox ID="txReason" runat="server" Width="32.5em" ReadOnly="True" CssClass="DisplayOnly" MaxLength="300" ForeColor="Navy" TextMode="MultiLine" onblur="isMaxLength(this,'變更原因','300')"></asp:TextBox>
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
                    <div class="dTD">
                        <asp:Label ID="lbTranDesc" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;</div>
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
            <div class="DivTable" id="AttachTable" runat="server">
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
                                        <asp:TextBox ID="txFileDesc" runat="server" Visible="True" Width="14em"></asp:TextBox>
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
            <div class="DivTable" id="dg1div">
                <div class="GridDiv" style="height: 140px;" data-fixed="true">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False" PageSize="50">
                        <Columns>
                            <asp:BoundColumn DataField="SEQ_NO" HeaderText="序"></asp:BoundColumn>
                            <asp:BoundColumn DataField="ENTRY_DATETIME" HeaderText="審核時間"></asp:BoundColumn>
                            <asp:BoundColumn DataField="TITLE" HeaderText="審核流程"></asp:BoundColumn>
                            <asp:BoundColumn DataField="TITLE_NAME" HeaderText="實際審核主管"></asp:BoundColumn>
                            <asp:BoundColumn DataField="REBOR_CODE" HeaderText="審核意見"></asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送(R)" AccessKey="R" Title="線上簽核傳送(ALT+R)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btApprove" runat="server" Text="核准(G)" AccessKey="G" Title="核准(ALT+G)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCheck" runat="server" Text="確認(C)" AccessKey="C" Title="確認(ALT+C)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="流程資訊(I)" AccessKey="I" Title="流程資訊(ALT+I)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreviewOnline" runat="server" Text="線上瀏覽(V)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btBack" runat="server" Text="撤回(B)" AccessKey="B" Style="display: none" DefaultStyle="newmode:none;modifymode:block" />
        </asp:Panel>
    </form>
</body>
</html>
