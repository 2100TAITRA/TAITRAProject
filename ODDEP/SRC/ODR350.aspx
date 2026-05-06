<%@ Page Language="c#" CodeBehind="ODR350.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR350M" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR350 發文清單列印作業</title>
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
    <form id="ODR350M" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericSearch.htm"-->
        <div style="width: 1208px; display: none; height: 42px; visibility: hidden" id="hiddenDiv">
            <asp:TextBox ID="H_Dept" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
        </div>
        <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:TextBox ID="H_OdExecCheckPriv" runat="server" CssClass="hidden"></asp:TextBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:TextBox ID="txSDocNo" TabIndex="5" runat="server" Width="8em" MaxLength="15"></asp:TextBox>(起)－
						<asp:TextBox ID="txEDocNo" TabIndex="10" runat="server" Width="8em" MaxLength="15"></asp:TextBox>(迄)
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDate" class="InputFieldNumeric DatePicker" TabIndex="15" runat="server" Width="4em" MaxLength="7">8888888</asp:TextBox>－
						<asp:TextBox ID="txEDate" class="InputFieldNumeric DatePicker" TabIndex="20" runat="server" Width="4em" MaxLength="7">8888888</asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" Width="10em" CssClass="comboBox"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" TabIndex="10" runat="server" Width="7em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">發文方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlActualIssue" TabIndex="30" runat="server" Width="4.5em">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="1">紙本</asp:ListItem>
                            <asp:ListItem Value="2">電子交換</asp:ListItem>
                            <asp:ListItem Value="3">其他</asp:ListItem>
                        </asp:DropDownList>
                        <asp:CheckBox ID="cbProxy" runat="server" Text="含代擬不代判公文"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="min-height: 1px; width: 7.5em">
                        <asp:Label ID="lbIssueUser" runat="server">發文人員：</asp:Label>
                    </div>
                    <div class="dTD" style="min-height: 1px; width: 22em">
                        <asp:DropDownList ID="ddlIssueByPriv" runat="server" Width="6.5em"></asp:DropDownList>
                        <asp:DropDownList ID="ddlIssueUser" runat="server" Width="6.5em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">密　　等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbCommon" TabIndex="160" runat="server" Text="普通" GroupName="gp"></asp:RadioButton>
                        <asp:RadioButton ID="rbSec" TabIndex="160" runat="server" Text="機密等級公文" GroupName="gp"></asp:RadioButton>
                        <asp:RadioButton ID="rbSecAll" TabIndex="160" runat="server" Text="全部" GroupName="gp"></asp:RadioButton>
                    </div>
                </div>
				<DIV class="dTR">
					<DIV class="dTDTitle" style="width: 7.5em; ">
						<asp:label id="lbMOCS_TAIssue" runat="server" CssClass="requirefield">發文類型：</asp:label>
					</DIV>
					<DIV class="dTD">
						<asp:RadioButton ID="rbMOCS_ALL" runat="server" Text="全部" GroupName="MOCS_ISSUETYPE"></asp:RadioButton>
						<asp:RadioButton ID="rbMOCS_NORMAL" runat="server" Text="一般發文" GroupName="MOCS_ISSUETYPE"></asp:RadioButton>
						<asp:RadioButton ID="rbMOCS_TA" runat="server" Text="銓審發文" GroupName="MOCS_ISSUETYPE"></asp:RadioButton>
					</DIV>
				</DIV>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbSignType" runat="server">簽核類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:DropDownList ID="ddlSignType" runat="server" Width="4.5em">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="E">線上簽核</asp:ListItem>
                            <asp:ListItem Value="P">紙本簽核</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px;">
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSubject" TabIndex="170" runat="server" Text="密件公文列印主旨"></asp:CheckBox>
                    </div>
                </div>
				<div class="dTR" id="divRowRRB" runat="server">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:DropDownList ID="ddlProperty" TabIndex="30" runat="server" ></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label10" runat="server">文別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDocCategory" TabIndex="30" runat="server" ></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">列印內容：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:RadioButton ID="rbAllPrint" TabIndex="160" runat="server" Text="不區分" GroupName="Print"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbDeptPrint" TabIndex="160" runat="server" Text="依組室區分不換頁" GroupName="Print"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbDeptPrintPage" TabIndex="160" runat="server" Text="依組室區分自動換頁" GroupName="Print"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbIssuePrint" TabIndex="160" runat="server" Text="依發文人員區分自動換頁" GroupName="Print"></asp:RadioButton>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbIssueDate" TabIndex="160" runat="server" Text="發文日期、公文文號" GroupName="OrderBy"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbCloseDate" TabIndex="160" runat="server" Text="發文時間" GroupName="OrderBy"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbDocNo" TabIndex="160" runat="server" Text="公文文號" GroupName="OrderBy"></asp:RadioButton><br>
                        <asp:CheckBox ID="cbTotal" TabIndex="170" runat="server" Text="顯示合計件數"></asp:CheckBox>&nbsp;								
                        <asp:CheckBox ID="cbShowAttInfo" TabIndex="170" runat="server" Text="顯示附件隨文資訊"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label8" runat="server" CssClass="hidden">報表欄位選擇：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:DropDownList ID="dlReprotSelect" runat="server" Width="10.5em" CssClass="hidden">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="2">只顯示主旨</asp:ListItem>
                            <asp:ListItem Value="3">只顯示密等、解密條件</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
            <div class="DivTable">
                <div class="GridDiv" style="height: 17em; overflow: auto" id="div">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" TabIndex="-1" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位<br>承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbOuName" Style="overflow: hidden" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="簽核類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbSignTypeDg" Style="overflow: hidden" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="密等">
                                <ItemTemplate>
                                    <asp:Label ID="lbSec" Style="overflow: hidden" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文方式">
                                <ItemTemplate>
                                    <asp:Label ID="lbActualIssue" Style="overflow: hidden" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="重複發文">
                                <ItemTemplate>
                                    <asp:Button ID="btDuplicateIssue" Style="overflow: hidden" runat="server" CssClass="hide" UseSubmitBehavior="FALSE" Text="資訊"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="開啟電子檔">
                                <ItemTemplate>
                                    <asp:Button ID="btDocView" runat="server" Text="檢視"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="查詢" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" Text="列印" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="匯出Excel" ID="btExcel"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="匯出ODS" ID="btODS"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator Style="z-index: 104; position: absolute; top: 218px; left: 12px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 105; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
