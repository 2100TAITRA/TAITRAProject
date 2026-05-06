<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT415.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT415" %>

<!DOCTYPE HTML>
<html>
<head>
    <title id="TitleCtrl">EDT415 分文請示申請作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT415" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="H_Status" TabIndex="-1" runat="server" Width="20px" CssClass=""></asp:TextBox><asp:TextBox ID="H_ApplyNo" TabIndex="-1" runat="server" Width="20px" CssClass=""></asp:TextBox><asp:TextBox ID="H_DeptNo" TabIndex="-1" runat="server" Width="20px"></asp:TextBox><asp:ListBox ID="lbDept" TabIndex="-1" runat="server" Width="20px" CssClass="" Enabled="False"
                Height="22px"></asp:ListBox><asp:DropDownList ID="H_dlOD12" runat="server"></asp:DropDownList><asp:DropDownList ID="H_dlOD07" runat="server"></asp:DropDownList>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em;">
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" Width="5.5em" CssClass="KeyEnUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label10" runat="server">申請單單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em;">
                        <asp:TextBox ID="txApplyNo" TabIndex="-1" runat="server" Width="5.5em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label2" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em;">
                        <asp:TextBox ID="txDept" TabIndex="-1" runat="server" Width="18.5em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label4" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em;">
                        <asp:TextBox ID="txUser" TabIndex="-1" runat="server" Width="8.5em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label7" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 34em;">
                        <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" Width="34em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy" TextMode="MultiLine" Rows="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label5" runat="server">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em;">
                        <asp:TextBox ID="txRcvDate" TabIndex="-1" runat="server" Width="4.5em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5em;">
                        <asp:Label ID="Label6" runat="server">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em;">
                        <asp:TextBox ID="txODueDate" TabIndex="-1" runat="server" Width="4.5em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label3" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em;">
                        <asp:TextBox ID="txProperty" TabIndex="-1" runat="server" Width="8.5em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label15" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em;">
                        <asp:TextBox ID="txFromOrgDate" TabIndex="-1" runat="server" Width="4.5em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5em;">
                        <asp:Label ID="Label16" runat="server">來文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20.5em;">
                        <asp:TextBox ID="txFromNo" TabIndex="-1" runat="server" Width="20.5em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label14" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 34em;">
                        <asp:TextBox ID="txFromOrg" TabIndex="-1" runat="server" Width="34em" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label12" runat="server">申請別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em;">
                        <asp:DropDownList ID="dlApplyType" runat="server" Width="5.5em" CssClass="DisplayOnly" Enabled="False"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label9" runat="server">建議改分單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em;">
                        <asp:DropDownList ID="dListDeptNo" runat="server"></asp:DropDownList>
                        <asp:DropDownList ID="dltempDept" runat="server" CssClass="hide"></asp:DropDownList>
                        <asp:TextBox ID="txTempBox" runat="server" Width="3.5em" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txSignType" runat="server" Width="3.5em" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label8" runat="server">說明：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em;">
                        <asp:DropDownList ID="dlPhraseNo" runat="server" Width="10.5em" CssClass="DisplayOnly" Enabled="False"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">&nbsp;</div>
                    <div class="dTD" style="width: 34em;">
                        <asp:TextBox ID="txReason" runat="server" Width="34em" Height="75px" CssClass="DisplayOnly" ReadOnly="True" MaxLength="300" ForeColor="Navy" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label17" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em;">
                        <asp:Label ID="lbStatus" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="dvfirst">
                <div class="dTR">
                    <div class="dTD" style="width: 9em;">
                        <asp:Label ID="Label18" runat="server" Font-Bold="True">前次改分申請資訊</asp:Label>
                    </div>
                    <div class="dTD" style="width: 3em;">
                        <asp:Button ID="btExpand" runat="server" Text="展開" OnClientClick ="ExpandDataGrid(); return false;"></asp:Button>
                    </div>
                    <div class="dTD" style="width: 45em;">
                        <asp:Button ID="btClose" runat="server" Text="收合" OnClientClick ="CloseDataGrid(); return false;"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" runat="server" id="DivDg0" style="height: 110px;" data-fixed="true">
                            <asp:DataGrid ID="dg0" runat="server" PageSize="50"
                                AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2">
                                <Columns>
                                    <asp:BoundColumn DataField="SEQ_NO" HeaderText="序"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="ENTRY_DATE" HeaderText="申請日期"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="DEPT_SNAME" HeaderText="承辦單位"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="EMP_NAME" HeaderText="承辦人"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="NLL_REASON" HeaderText="建議改分理由"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="SUGGEST_DEPT_NAME" HeaderText="建議改分單位"></asp:BoundColumn>
                                    <asp:TemplateColumn HeaderText="相關明細">
                                        <ItemTemplate>
                                            <asp:HyperLink ID="hyAppltDetail" runat="server" CssClass="InputFieldLabel"></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="dvAttach" runat="server">
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
                <div class="dTR">
                    <div class="GridDiv" style="height: 140px;width:520px" data-fixed="true">
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
        <div class="DivTable">
            <div class="dTR">
                <div class="dTD">
                    <asp:Label ID="lbNowFlow" runat="server" Width="144px" Height="24px" Font-Bold="True" CssClass="hide">本次改分申請流程</asp:Label>
                </div>
            </div>
            <div class="dTR">
                <div class="dTD">
                    <div class="GridDiv" style="height: 129px;">
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
        </div>
        </DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
                <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
                <asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送：" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
                <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                
                <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btPrint" runat="server" Text="列印" CssClass='hide' Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btCheck" runat="server" Text="確認(C)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btPreviewOnline" runat="server" Text="線上瀏覽(V)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btSearch" runat="server" Text="流程資訊(F)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            </asp:Panel>
        <asp:TextBox Style="z-index: 104; position: absolute; top: 704px; left: 560px" ID="htxshow" runat="server" Width="53px" CssClass="hide"></asp:TextBox>

    </form>
</body>
</html>
