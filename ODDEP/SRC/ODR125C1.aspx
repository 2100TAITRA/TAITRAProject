<%@ Page Language="c#" CodeBehind="ODR125C1.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR125C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR125C1 送件單查詢子視窗</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR125C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div style="z-index: 101" id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label Style="z-index: 0" ID="Label9" runat="server">分文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txSendDate" TabIndex="-1" runat="server" MaxLength="7" Width="4em" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txSendDateS" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label10" runat="server">時　　間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txSendTimeS" TabIndex="-1" runat="server" MaxLength="4" Width="2.5em" CssClass="InputFieldNumeric"></asp:TextBox>~
                        <asp:TextBox Style="z-index: 0" ID="txSendTimeE" TabIndex="-1" runat="server" MaxLength="4" Width="2.5em" CssClass="InputFieldNumeric"></asp:TextBox>
                        <asp:DropDownList class="hide" ID="dlTime" runat="server">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="1">上午 07:00~13:00</asp:ListItem>
                            <asp:ListItem Value="2">下午 13:01~22:00</asp:ListItem>
                        </asp:DropDownList>
                        <asp:Button ID="btGetBatchNo" class="hide" runat="server" Text="帶出批號"></asp:Button>
                    </div>
                </div>
                <div class="hide">
                    <div style="width: 6.5em" class="dTDTitle">
                        <asp:Label ID="Label1" class="KeyField" runat="server">送文批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBatchNoS" TabIndex="-1" runat="server" MaxLength="8" Width="4.5em"></asp:TextBox>
                        <asp:ImageButton ID="btBatchNoS" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>～
						<asp:TextBox ID="txBatchNoE" TabIndex="-1" runat="server" MaxLength="8" Width="4.5em"></asp:TextBox>
                        <asp:ImageButton ID="btBatchNoE" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="hide">
                    <div style="width: 6.5em" class="dTDTitle">
                        <asp:Label ID="Label6" class="InputFieldLabel" runat="server">收文對象：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbSendTarget" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="其他單位" Selected="True">其他單位</asp:ListItem>
                            <asp:ListItem Value="所屬單位">所屬單位</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR" id="trRcvDept">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" class="InputFieldLabel" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="txRcvDept" TabIndex="-1" runat="server" Width="9em" CssClass="comboBox"></cc1:ComboBox>
                        <span id="spanSpace"></span>
                        <cc1:ComboBox ID="dlSubDept" TabIndex="-1" runat="server" Width="9em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="hide" id="trPrintFormat">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbPrintFormat" runat="server">列印格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlPrintFormat" runat="server">
                            <asp:ListItem Value="1">送件單</asp:ListItem>
                            <asp:ListItem Value="2">簡易版送件單</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR" id="trRcvEmp">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">收文者姓名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="txRcvEmp" TabIndex="-1" runat="server" Width="9em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbSendDate1" runat="server">送文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        
                        <asp:Label ID="lbSendDate2" runat="server">～</asp:Label>
                        <asp:TextBox ID="txSendDateE" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">密　　等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbCommon" TabIndex="-1" runat="server" Text="普通" GroupName="gp"></asp:RadioButton>
                        <asp:RadioButton ID="rbSec" TabIndex="-1" runat="server" Text="機密等級公文" GroupName="gp"></asp:RadioButton>
                        <asp:RadioButton ID="rbSecAll" TabIndex="-1" runat="server" Text="全部" GroupName="gp"></asp:RadioButton>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSubject" TabIndex="-1" runat="server" Text="密件公文列印主旨"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server">排　　序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlSortType" runat="server" Width="9.5em">
                            <asp:ListItem Value="0" Selected="True">傳送分文時間</asp:ListItem>
                            <asp:ListItem Value="1">公文文號</asp:ListItem>
                        </asp:DropDownList>
                        <asp:CheckBox ID="cbIsPageByDeptNo" class="hide" runat="server" Text="報表不分頁且依單位排序"></asp:CheckBox>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbPersonOnly" runat="server" Text="僅列出個人待送公文"></asp:CheckBox>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbPageByDocState" runat="server" Text="以公文狀態分頁"></asp:CheckBox>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbNonSend" runat="server" CssClass="hide" Text="僅列印未發文送文單" ForeColor="Navy"></asp:CheckBox>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="InputFieldText">列印張數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbPage" TabIndex="-1" onkeypress="jf_InpNumOnly()" runat="server" MaxLength="1" Width="1em"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server" CssClass="InputFieldText">張</asp:Label>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
						<asp:Panel runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btAll" runat="server" Text="全部選取"></asp:Button>
							<asp:Button ID="btClear" runat="server" Text="清除選取"></asp:Button>
							<asp:Button ID="btChange" runat="server" Text="反向選取"></asp:Button>
						</asp:Panel>
                        <div class="GridDiv" style="height: 280px; overflow: auto" id="DIV1">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="4" GridLines="Vertical">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選取">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cb1" runat="server" Checked="True"></asp:CheckBox>
                                            <asp:TextBox ID="H_MsgID" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn>
                                        <HeaderTemplate>
                                            <asp:Label ID="Label11" runat="server">收文單位</asp:Label><br>
                                            <asp:Label ID="Label12" runat="server">(收文者)</asp:Label>
                                        </HeaderTemplate>
                                        <ItemTemplate>
                                            <asp:Label ID="DGRcvDept" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo" runat="server" CssClass="hide"></asp:Label>
                                            <asp:HyperLink ID="hlDocNo" runat="server"></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="送文別">
                                        <ItemTemplate>
                                            <asp:Label ID="lbType" runat="server"></asp:Label>
                                            <asp:Label ID="lbMsgType" runat="server" CssClass="hide"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="txSubject" runat="server" Width="15.5em" ReadOnly="True"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="來文者">
                                        <ItemTemplate>
                                            <asp:Label ID="lbFromOrgName" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="來文字號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbFromNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                        <div class="GridDiv" style="height: 280px; overflow: auto" id="DIV2">
                            <asp:DataGrid ID="dg2" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="4" GridLines="Vertical">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="批號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbBatchNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn>
                                        <HeaderTemplate>
                                            <asp:Label ID="Label13" runat="server">收文單位</asp:Label><br>
                                            <asp:Label ID="Label14" runat="server">(收文者)</asp:Label>
                                        </HeaderTemplate>
                                        <ItemTemplate>
                                            <asp:Label ID="DGRcvDept" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo" runat="server" CssClass="hide"></asp:Label>
                                            <asp:HyperLink ID="hlDocNo" runat="server"></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="送文別">
                                        <ItemTemplate>
                                            <asp:Label ID="lbType" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="TextLabel PopUp" Width="15.5em" ReadOnly="True"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="來文者">
                                        <ItemTemplate>
                                            <asp:Label ID="lbFromOrgName" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="來文字號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbFromNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="display: none; height: 42px; visibility: hidden" id="hiddenDiv">
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_DeptNo_Value" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_SectNo_Value" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_UserNo_Value" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txAutoOpen" runat="server" CssClass="hidden"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" AccessKey="S" title="成批(ALT+S)" runat="server" Text="成批(S)" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSearch" Accesskey="Q" title="查詢(ALT+Q)" runat="server" Text="待送公文查詢(Q)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" CssClass="hide" />
            <asp:Button ID="btConfirm" AccessKey="S" runat="server" Text="確定(S)" DefaultStyle="newmode:block;modifymode:none;"  />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
