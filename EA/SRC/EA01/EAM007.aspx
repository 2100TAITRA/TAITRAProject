<%@ Page Language="c#" CodeBehind="EAM007.aspx.cs" AutoEventWireup="false" Inherits="EA01.EAM007" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAM007 歸檔人員維護作業</title>
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
    <form id="EAM007" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
            <asp:TextBox ID="H_DATA" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="txPerid" TabIndex="-1" runat="server" ></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">帳號：</asp:Label></div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlMgrUserName" runat="server" Width="9.5em" CssClass="KeyUpperField"></asp:DropDownList>
                        <asp:TextBox ID="txAcc" TabIndex="1" runat="server" Width="10.5em"
                            CssClass="hide" MaxLength="20" ></asp:TextBox><asp:TextBox ID="txOrgNo" CssClass="hide" runat="server"></asp:TextBox>
                        <asp:Label ID="lbEmp" runat="server" Width="8.5em" CssClass="hide"></asp:Label>
                    </div>
                </div>
                <div class="dTR" id="divOfficeState">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">任職狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOnOffice" runat="server" Text="在職" GroupName="btoffice" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbOffOffice" runat="server" Text="調職或離職" GroupName="btoffice"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR" id="divFile">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">匯入檔案：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOrgFile" runat="server" Text="機關檔" GroupName="btGroup" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbPerFile" runat="server" Text="個人檔" GroupName="btGroup"></asp:RadioButton>
                        <input id="txFilePath" type="File" runat="server" width="12.5em" accept=".csv" />
                        <asp:TextBox ID="txServerPath" TabIndex="2" runat="server" CssClass="hide" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="divCls">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">分類號：</asp:Label></div>
                    <div class="dTD">
                        <asp:Label ID="Label5" runat="server">版本別</asp:Label>
                        <asp:TextBox ID="txVerNo" TabIndex="2" runat="server" Width="2em" CssClass="RequireFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:ImageButton ID="ibVer" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label6" runat="server">分類號</asp:Label>
                        <asp:TextBox ID="txFileCls" TabIndex="3" runat="server" Width="10.5em" CssClass="RequireField" Style="ime-mode: disabled" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="ibCls" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
							<asp:Button ID="btAdd" runat="server" Text="加入" TabIndex="4"></asp:Button>
                    </div>
                </div>
                <div class="dTR" id="divFirstName">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">姓氏：</asp:Label></div>
                    <div class="dTD">
                        <asp:TextBox ID="txFirstName" TabIndex="4" runat="server" Width="1.5em" CssClass="RequireField" MaxLength="1"></asp:TextBox>
                        <asp:Button ID="btAdd2" runat="server" Text="加入" TabIndex="4"></asp:Button>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="dTR">
                    <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                        <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                        <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
                        <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                        <asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
                    </asp:Panel>
                </div>
                <div style="height: 23em" class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="9">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <HeaderStyle Width="1.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <HeaderStyle Width="1.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                    <asp:TextBox ID="NewData" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn ItemStyle-HorizontalAlign="Center" HeaderText="版別-分類號/姓氏">
                                <HeaderStyle Width="10em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="txVerCls" runat="server" CssClass="TextLabel"  Width="10em"></asp:TextBox>
                                    <asp:TextBox ID="txClsKey" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn ItemStyle-HorizontalAlign="Center" HeaderText="類別">
                                <HeaderStyle Width="4.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="txMrgTypeName" runat="server" CssClass="TextLabel"  Width="4.5em"></asp:TextBox>
                                    <asp:TextBox ID="MgrTypeNo" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn ItemStyle-HorizontalAlign="Center" HeaderText="分類名">
                                <HeaderStyle Width="10em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="txVerClsName" runat="server" CssClass="TextLabel" Width="8.5em" ></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btTran" runat="server" Text="移交" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btInput" runat="server" Text="匯入" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消(X)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
