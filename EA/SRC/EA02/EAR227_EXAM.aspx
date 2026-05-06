<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR227_EXAM.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR227_EXAM" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR227_EXAM 光碟及大型附件標籤列印作業</title>
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
    <form id="EAR227_EXAM" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">另存附件編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_UPPERCASE()" ID="txRemarkS" TabIndex="1" runat="server" Width="5.5em" MaxLength="30"></asp:TextBox>－
							<asp:TextBox onkeypress="jf_UPPERCASE()" ID="txRemarkE" TabIndex="2" runat="server" Width="5.5em" MaxLength="30"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
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
                        <asp:Label ID="Label4" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_UPPERCASE()" ID="txDocNo" TabIndex="12" runat="server" Width="5.5em" MaxLength="30"></asp:TextBox>
						<asp:button id="btAddDocNo" tabIndex="-1" runat="server" Text="加入"></asp:button>
                    </div>
                </div>
                <div class="dTR">
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
                        <asp:Button ID="btSelectAll" TabIndex="-1" runat="server" Text="全選"  Height="36px" ></asp:Button>
                    </div>
                    <div class="dTD" >
                        <asp:Button  ID="btSelectInverse" TabIndex="-1" runat="server" Text="反向" Height="36px" ></asp:Button>
                    </div>
                    <div class="dTD" >
                        <asp:Button  ID="btSelectClear" TabIndex="-1" runat="server" Text="清除"  Height="36px" ></asp:Button>
                    </div>
                    <div class="dTD" >
                        <asp:Button runat="server" Text="刪除" TabIndex="-1" ID="btDeleteErrDoc" Height="36px" CssClass="hide" ></asp:Button>
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
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="案由">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txSubject" runat="server"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="檔號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbFileNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="保存<br>年限">
                                        <ItemTemplate>
                                            <asp:Label ID="lbKeepYear" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="編號/內容摘要">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDesc" runat="server"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn>
                                        <ItemTemplate>
                                            <asp:Button ID="btCopy" runat="server"></asp:Button>
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
            <asp:Button ID="btOpen" runat="server" Text="查詢(Q)" AccessKey="Q" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽(P)" AccessKey="S" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除(Z)" AccessKey="E" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
