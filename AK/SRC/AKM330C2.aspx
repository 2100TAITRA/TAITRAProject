<%@ Page Language="c#" CodeBehind="AKM330C2.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM330C2" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKM330C2 待編目案件查詢子視窗</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="WebForm2" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label2" runat="server" Width="16em">公文狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbWaitInp" runat="server" Text="待編目" GroupName="rbInpType" data-CN="待編目"></asp:RadioButton>
                        <asp:RadioButton ID="rbInpEd" runat="server" Text="已編目" GroupName="rbInpType" data-CN="已編目"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR" id="AcpDate">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:RadioButton ID="rbACP_DATE"  runat="server" Text="點收日期：" Checked="True" GroupName="G2"></asp:RadioButton>
                        <asp:Label ID="lbacpDate" runat="server" Width="16em">點收日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txACP_DATES"  CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txACP_DATEE"  CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="FileDate">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:RadioButton ID="rbFILE_DATE"  runat="server" Text="歸檔日期：" Checked="True" GroupName="G2"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFILE_DATES"  runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txFILE_DATEE"  runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="InpFileTitle">
                    <div class="dTDTitle" style="width: 8em">
                        <span id="Label199" style="height: 11px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </div>
                    <div class="dTD" style="width: 3em">
                        <span id="laFileYear" class="" style="font-size: X-Small;">年度號</span>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <span id="laFileCls" class="" style="font-size: X-Small;">分類號</span>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <span id="laFileCaseS" class="" style="font-size: X-Small;">案次號起</span>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <span id="laFileCaseE" class="" style="font-size: X-Small;">案次號迄</span>
                    </div>
                    <div class="dTD" style="width: 4.5em">
                        <span id="laFileVolS" class="" style="font-size: X-Small;">卷次號起</span>
                    </div>
                    <div class="dTD" style="width: 3.5em">
                        <span id="laFileVolE" class="" style="font-size: X-Small;">卷次號迄</span>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="lbClsdTD" runat="server">分類號：</asp:Label>
                        <div id="divrbFileNo">
                            <asp:RadioButton ID="rbFileNo" runat="server" Text="檔　　號：" GroupName="rbInpFileType" Checked="True"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTD" id="tdFileYear">
                        <asp:TextBox ID="txYEAR"  runat="server" Width="2.5em" MaxLength="3"></asp:TextBox>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCls"  CssClass="InputUpperFieldText" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                    </div>
                    <div id="divrbcbLike" class="dTD">
                        <asp:ImageButton ID="btFileCls" TabIndex="-1" runat="server" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                        <asp:Label ID="lbFileCls" TabIndex="-1" runat="server" Width="11.5em" MaxLength="20" ReadOnly="True"></asp:Label>
                        <asp:CheckBox ID="cbLike" runat="server" Text="模糊查詢"></asp:CheckBox>
                    </div>
                    <div id="divCaseVol">
                        <div class="dTD">
                            <asp:TextBox ID="txCASES" runat="server" Width="5.5em" ></asp:TextBox>－
                        <asp:TextBox ID="txCASEE" runat="server" Width="5.5em" ></asp:TextBox>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txVolS" runat="server" Width="3em"></asp:TextBox>－
                        <asp:TextBox ID="txVolE" runat="server" Width="3em"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div class="dTR" id="DeptEmp">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept1" CssClass="comboBox" TabIndex="-1" runat="server" Width="11.5em"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">承辦科別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlSect" CssClass="comboBox" TabIndex="-1" runat="server" Width="11.5em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR" id="InpFileDate">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:RadioButton ID="rbInpFileDate"  runat="server" Text="編目日期：" GroupName="rbInpFileType"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txInpFileDateS"  runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txInpFileDateE"  runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="AcpEmp">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label8" runat="server">點收人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlAcpUser" runat="server" Width="9em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 10.75em">
                        <asp:Label ID="lbMgrUser" runat="server">歸檔人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlMgrUser" runat="server" Width="9em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label4" runat="server">歸檔類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="ddlSignType" CssClass="comboBox" TabIndex="-1" runat="server" Width="5.5em">
                            <asp:ListItem Value="valSignTypeE">線上簽核</asp:ListItem>
                            <asp:ListItem Value="valSignTypeP">紙本簽核</asp:ListItem>
                            <asp:ListItem Value="valSignTypeS">特殊媒體</asp:ListItem>
                            <asp:ListItem Value="valAll" Selected="True">全部</asp:ListItem>
                        </cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="laDocSec" runat="server">密等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSECRET" runat="server"></asp:DropDownList>
                    </div>
                </div>

                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label6" runat="server">庫房別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlStoreNo" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTD">
                        <asp:Label ID="Label3" runat="server" Width="1em">2.</asp:Label>
                        <asp:CheckBox ID="cbINPFILE_DATE"  runat="server" Text="含已編目案件"></asp:CheckBox>
                        <asp:RadioButton ID="rbFILE_DATE2"  runat="server" CssClass="hidden" Width="6.5em" Text="依歸檔日期" Checked="True" GroupName="G1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label9" runat="server" Width="8em">資料排序方式：</asp:Label>
                    </div>
                    <div class="dTD" id="divOrderInp">
                        <asp:RadioButton ID="rbOrderFileNo"  runat="server" Width="6.5em" Text="依檔號" GroupName="G1"></asp:RadioButton>
                    </div>
                    <div class="dTD" id="divOrderWaitInp">
                        <asp:RadioButton ID="rbOrderDate"  runat="server" Text=" " Checked="True" GroupName="G1"></asp:RadioButton>
                        <asp:TextBox ID="txRdDateCaption" runat="server" CssClass="TextLabel" Width="5em" ReadOnly="True">依點收日期</asp:TextBox>
                        <asp:RadioButton ID="rbCrtDate"  runat="server" Width="6.5em" Text="依文件產生日期" GroupName="G1"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderDeptNo"  runat="server" Width="6.5em" Text="依承辦單位" GroupName="G1"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOrderSignType"  runat="server" Width="6.5em" Text="依簽核類型" GroupName="G1"></asp:RadioButton>
                    </div>
                    <div class="dTD" id="divOrderWaitInp2">
                        <asp:RadioButton ID="rbOrderFileCls"  runat="server" Width="6.5em" Text="依分類號" GroupName="G1"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <asp:TextBox ID="H_dlSectSelectValue" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlSectInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlSectText" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_DeptNo" runat="server" CssClass="hide"></asp:TextBox>
            <div class="DivTable">
                <asp:Panel ID="Page1" runat="server">
                    <div style="overflow: auto">
                        <asp:Button AccessKey="C" ID="btClear" runat="server" Width="4.5em" Text="清除(C)" ToolTip="清除(Alt+C)"></asp:Button>
                        <asp:Button AccessKey="A" ID="btAll" runat="server" Width="4.5em" Text="全選(A)" ToolTip="全選(Alt+A)"></asp:Button>
                        <asp:Button AccessKey="N" ID="btRever" runat="server" Width="4.5em" Text="反向(N)" ToolTip="反向(Alt+N)"></asp:Button>
                        <asp:Label ID="Label11" runat="server" Width="13.5em" ForeColor="#8080FF">(*最多顯示200筆待編目案件)</asp:Label>
                    </div>
                    <div class="GridDiv">
                        <asp:DataGrid ID="dg1"  runat="server" CellPadding="1" GridLines="Vertical" AutoGenerateColumns="False">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <HeaderStyle Width="2em"></HeaderStyle>
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbSeqNo" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="選取">
                                    <HeaderStyle Width="2em"></HeaderStyle>
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbSelect" runat="server" Checked="True" Text=" "></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="文(編)號">
                                    <HeaderStyle Width="7.5em"></HeaderStyle>
                                    <ItemTemplate>
                                        <asp:HyperLink ID="hlDocNo" runat="server">0920000001</asp:HyperLink>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="簽核類型">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSignType" runat="server">Label</asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="承辦單位">
                                    <HeaderStyle Width="7.5em"></HeaderStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="歸檔日期">
                                    <HeaderStyle Width="4.5em"></HeaderStyle>
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbFILE_DATE" runat="server">Label</asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="點收日期">
                                    <HeaderStyle Width="4.5em"></HeaderStyle>
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbACP_DATE" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="分類號">
                                    <ItemTemplate>
                                        <asp:Label ID="lbFileClsD" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="庫房別">
                                    <ItemTemplate>
                                        <asp:Label ID="lbStoreName" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="主旨">
                                    <ItemTemplate>
                                        <asp:Label ID="lbFromSubject" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </asp:Panel>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSave" runat="server" Text="確定(S)" AccessKey="S" Title="確定(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出EXCEL(O)" AccessKey="O" Title="匯出EXCEL(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" AccessKey="C" Title="匯出ODS(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 104; position: absolute; top: 3px; left: 8px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 105; position: absolute; top: 410px; left: 0px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
