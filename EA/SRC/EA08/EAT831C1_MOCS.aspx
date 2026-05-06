<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAT831C1_MOCS.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT831C1_MOCS" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAT831C1_MOCS 文冊註記作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAT831C1_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="hide">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">另存附件編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_UPPERCASE()" ID="txRemarkS" TabIndex="1" runat="server" Width="5.5em" MaxLength="30"></asp:TextBox>－
							<asp:TextBox onkeypress="jf_UPPERCASE()" ID="txRemarkE" TabIndex="2" runat="server" Width="5.5em" MaxLength="30"></asp:TextBox>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 7.5em;">
                        <asp:Label ID="Label1" runat="server">編目日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <asp:TextBox CssClass="DatePicker" ID="txDateS" onkeyup="jf_CheckFull();" TabIndex="10" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                        －
							<asp:TextBox CssClass="DatePicker" ID="txDateE" onkeyup="jf_CheckFull();" TabIndex="11" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server">身分證號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbPerSonID" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server">姓名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbName" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">文/冊號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox  ID="h_BorNo"  runat="server" CssClass= "hide"></asp:TextBox>
                        <asp:TextBox  ID="h_MitemId"  runat="server" CssClass= "hide"></asp:TextBox>
                        <asp:TextBox  ID="txDocNo" TabIndex="12" runat="server" Width="15em" MaxLength="30"></asp:TextBox>
						<asp:button id="btAddDocNo" tabIndex="-1" runat="server" Text="加入"></asp:button>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">標籤形式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDisc" runat="server" Text="光碟" GroupName="grp1" TabIndex="13"></asp:RadioButton>
                        <asp:RadioButton ID="rbBigAtt" runat="server" Text="大型附件，起始位置" GroupName="grp1" TabIndex="14"></asp:RadioButton>
						<asp:TextBox onkeypress="jf_UPPERCASE()" ID="txStart" TabIndex="15" runat="server" Width="1.5em" MaxLength="1"></asp:TextBox>
                        <asp:TextBox  ID="SourceNo" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
            </div>
            
            <div class="DivTable">
                <div id="tbSelect">
                <div class="dTR" >
                    <div class="dTD" >
                        <asp:Button ID="btSelectAll" TabIndex="-1" runat="server" Text="全選" CssClass="hide"  Height="36px" ></asp:Button>
                    </div>
                    <div class="dTD" >
                        <asp:Button  ID="btSelectInverse" TabIndex="-1" runat="server" Text="反向" CssClass="hide" Height="36px" ></asp:Button>
                    </div>
                    <div class="dTD" >
                        <asp:Button  ID="btSelectClear" TabIndex="-1" runat="server" Text="清除" CssClass="hide"  Height="36px" ></asp:Button>
                    </div>
                    <div class="dTD" >
                        <asp:Button runat="server" Text="刪除" TabIndex="-1" ID="btDeleteErrDoc" CssClass="hide" Height="36px" ></asp:Button>
                    </div>
                </div>
             </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv">
                            <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server" Width="22px"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="刪">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="文/冊號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="查詢(Q)" AccessKey="Q" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" AccessKey="S" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClose" runat="server" Text="取消" AccessKey="E" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
