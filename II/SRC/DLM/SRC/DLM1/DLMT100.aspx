<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="DLMT100.aspx.cs" AutoEventWireup="false" Inherits="DLM1.DLMT100" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>DLMT100 附件上載或修正作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="DLMT100" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../DLMLIB/GenericBanner.htm"-->
        <div style="z-index: -100; left: 0px; visibility: hidden; width: 160px; position: absolute; top: 0px; height: 312px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txFileSizeLimit" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txManager" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txDLWS" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txFileLocation" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txDelFileNames" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txAddFileNames" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txAddFileSizes" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_FileInfo_Id" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_OdWsLocation" runat="server" Width="21px"></asp:TextBox>
            <asp:TextBox ID="H_DocHash" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_DefaultDept" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_OrgNo" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_Dept" runat="server" Width="8px"></asp:TextBox>
            <asp:TextBox ID="H_DL_AP_WEBFILEWS" runat="server" ></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="DivTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label2" runat="server">發文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <asp:TextBox ID="tbIssueNo" TabIndex="0" runat="server" Width="6.5em" CssClass="InputFieldNumeric" MaxLength="12"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbIssueDate" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label5" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbSubject" TabIndex="0" runat="server" Width="26em" MaxLength="300"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label3" runat="server">卸載日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <asp:TextBox ID="tbExpireDate" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">發布單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlDept" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label6" runat="server">檔案：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <input type="button" value="加入附件" onclick="document.getElementById('fileInput').click();" />
                        <input type="file" id="fileInput" style="display:none" multiple="true" onchange="fnAddFile()"/>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">識別碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbIdentifyCode" runat="server" Width="4.5em" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="overflow: auto;height: 17em">
                    <asp:DataGrid ID="dgAttach" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔名">
                                <ItemTemplate>
                                    <asp:Label ID="lbFileName" runat="server"></asp:Label>
                                    <asp:Label ID="lbFilePath" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbFileSize" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="執行">
                                <ItemTemplate>
                                    <asp:Button ID="btdgDelete" runat="server" Text="刪除"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" style="display:none" Text="開啟" DefaultStyle="newmode:none;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="異動紀錄" DefaultStyle="newmode:none;modifymode:none;" ID="btRecord"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="下載紀錄" DefaultStyle="newmode:none;modifymode:none;" ID="btDownload"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
