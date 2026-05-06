<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="DFT400_NCUT.aspx.cs" AutoEventWireup="false" Inherits="AK.DFT400_NCUT" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>DFT400_NCUT 公文批次移交作業</title>
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
    <form id="DFT400_NCUT" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTD" style="width: 29em">
                        <fieldset >
                            <legend>移交範圍</legend>
                            <div id="Table5" class="DivTable">
                                <asp:Label ID="lbImportCount" TabIndex="-1" runat="server"  ></asp:Label>
                            </div>
                            <div id="Table2" class="DivTable">
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 7.5em">
                                        &nbsp;&nbsp;
										<asp:Label ID="Label8" TabIndex="-1" runat="server" Width="3em" CssClass="hidden"></asp:Label>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 7.5em">
                                        <asp:Label ID="Label1" class="RequireField" TabIndex="-1" runat="server">原負責人：</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <asp:TextBox ID="txUserId" class="RequireField" TabIndex="10" runat="server" MaxLength="20" Width="10.5em"></asp:TextBox>
                                        <asp:ImageButton ID="btUser" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif" CssClass="hide"></asp:ImageButton>    
                                    </div>
                                    <div class="dTD">
                                        <asp:Label ID="txUserName" TabIndex="-1" runat="server" MaxLength="20" Width="6.5em" class=""></asp:Label>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 7.5em">
                                        <asp:Label ID="Label2" TabIndex="-1" runat="server">年度：</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <asp:TextBox ID="txYear" TabIndex="20" runat="server" MaxLength="3" Width="2em" CssClass="InputFieldNumeric"></asp:TextBox>－
								        <asp:TextBox ID="txYear2" TabIndex="20" runat="server" MaxLength="3" Width="2em" CssClass="InputFieldNumeric"></asp:TextBox>
                                        <asp:Label ID="lbHid" runat="server"></asp:Label>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 7.5em">
                                        <asp:Label ID="Label3" TabIndex="-1" runat="server">分類號：</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <asp:TextBox ID="txCls" TabIndex="30" runat="server" MaxLength="20" Width="10.5em"></asp:TextBox>
                                        <asp:ImageButton ID="btCls" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 7.5em">
                                        <asp:Label ID="Label4" TabIndex="-1" runat="server">案次號：</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <asp:TextBox ID="txCase" TabIndex="40" runat="server" MaxLength="12" Width="6.5em"></asp:TextBox>
                                        <asp:ImageButton ID="btCase" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 7.5em">
                                        <asp:Label ID="Label6" runat="server" Width="7.5em">一級承辦單位：</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <cc1:ComboBox ID="dlDept" TabIndex="240" runat="server" CssClass="comboBox" Width="10em" ></cc1:ComboBox>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 7.5em">
                                        <asp:Label ID="Label7" runat="server" Width="7.5em">二級承辦單位：</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <cc1:ComboBox ID="dlSect" TabIndex="220" runat="server" CssClass="comboBox"></cc1:ComboBox>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 7.5em">
                                        &nbsp;&nbsp;
										<asp:Label ID="lbCount" TabIndex="-1" runat="server" Width="3em" CssClass="hidden"></asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <asp:CheckBox ID="cbDetail" TabIndex="50" runat="server" Text="顯示移交公文明細"></asp:CheckBox>
                                    </div>
                                </div>
                            </div>
                            <asp:TextBox Style="z-index: 0" ID="H_dlDept_Value" runat="server" CssClass="hide"></asp:TextBox>
                            <asp:TextBox Style="z-index: 0" ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
                            <asp:TextBox Style="z-index: 0" ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
                            <asp:TextBox Style="z-index: 0" ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
                            <asp:TextBox Style="z-index: 0" ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
                            <asp:TextBox Style="z-index: 0" ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
							<asp:textbox style="Z-INDEX: 0" id="H_SOURCEORGNO" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox style="Z-INDEX: 0" id="H_SelectDpet" runat="server" CssClass="hide"></asp:textbox>
                            <asp:textbox style="Z-INDEX: 0" id="H_Dept_Name" runat="server" CssClass="hide"></asp:textbox>
                            <asp:textbox style="Z-INDEX: 0" id="H_Sect_Name" runat="server" CssClass="hide"></asp:textbox>
                            <asp:textbox style="Z-INDEX: 0" id="H_Emp_Name" runat="server" CssClass="hide"></asp:textbox>
                            <asp:TextBox Style="z-index: 0" ID="H_dlEmp_Value" runat="server" CssClass="hide"></asp:TextBox>
                            <input ID="h_CsvFilePath" type="File" runat="server" style="DISPLAY: NONE;"/>
                            <asp:textbox id="h_SerWorkPath" runat="server" CssClass="hide"></asp:textbox>
                            <asp:textbox id="h_SerWorkFile" runat="server" CssClass="hide"></asp:textbox>
                            <asp:textbox id="h_SerErrFilePath" runat="server" CssClass="hide"></asp:textbox>
                            <asp:textbox id="h_SetRpsByPieces" runat="server" CssClass="hide"></asp:textbox>
                        </fieldset>
                    </div>
                    <div class="dTD">
                        <fieldset style="width: 25em;">
                            <legend>接收單位及人員設定</legend>
                            <div id="Table3" class="DivTable">
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 8em">
                                        <asp:Label ID="Label5" TabIndex="-1" runat="server" CssClass="RequireField">新負責人：</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <asp:TextBox ID="txTranId" TabIndex="60" runat="server" MaxLength="20" Width="10.5em" CssClass="RequireField"></asp:TextBox>
                                        <asp:ImageButton ID="btTran" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif" CssClass="hide"></asp:ImageButton>
                                        <asp:Label ID="txTranName" TabIndex="-1" runat="server" MaxLength="20" Width="6.5em"></asp:Label>
                                    </div>
								</div>
								<div class="dTR">
									<div class="dTDTitle" style="width: 8em">
                                        <asp:Label ID="lbDoc199" TabIndex="-1" runat="server" CssClass="RequireField">角色所屬單位：</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <asp:DropDownList id="dlRoleDeptSect" runat="server" CssClass="RequireField"></asp:DropDownList>
                                    </div>
                                </div>
                                <div class="hide">
                                    <div class="dTDTitle" style="width: 8em">
                                        <asp:Label ID="Label9" runat="server"  class="RequireField"  Width="6.5em">一級承辦單位：</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <cc1:ComboBox ID="NewdlDept" TabIndex="240" runat="server" CssClass="comboBox" Width="10em" ></cc1:ComboBox>
                                        <asp:TextBox ID="H_NewDept_Name" CssClass="hide" TabIndex="60" runat="server" MaxLength="20" Width="5.5em" ></asp:TextBox>
                                        <asp:TextBox ID="H_NewDept_value" CssClass="hide" TabIndex="60" runat="server" MaxLength="20" Width="5.5em" ></asp:TextBox>
                                        <asp:TextBox ID="H_NewDept_Selectvalue" CssClass="hide" TabIndex="60" runat="server" MaxLength="20" Width="5.5em" ></asp:TextBox>
                                    </div>
                                </div>
                                <div class="hide">
                                    <div class="dTDTitle" style="width: 8em">
                                        <asp:Label ID="Label10" runat="server" Width="6.5em">二級承辦單位：</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <cc1:ComboBox ID="NewdlSect" TabIndex="220" runat="server" CssClass="comboBox"></cc1:ComboBox>
                                        <asp:TextBox ID="H_NewSect_Name" CssClass="hide" TabIndex="60" runat="server" MaxLength="20" Width="5.5em" ></asp:TextBox>
                                        <asp:TextBox ID="H_NewSect_value" CssClass="hide" TabIndex="60" runat="server" MaxLength="20" Width="5.5em" ></asp:TextBox>
                                        <asp:TextBox ID="H_NewSect_Selectvalue" CssClass="hide" TabIndex="60" runat="server" MaxLength="20" Width="5.5em" ></asp:TextBox>
                                    </div>
                                </div>
                                <div class="hide">
                                    <div class="dTDTitle" style="width: 8em">
                                        <asp:Label ID="Label11" runat="server" Width="6.5em">新負責人：</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <cc1:ComboBox ID="NewdlEmp" TabIndex="220" runat="server" CssClass="comboBox"></cc1:ComboBox>
                                        <asp:TextBox ID="H_NewEmp_Name" CssClass="hide" TabIndex="60" runat="server" MaxLength="20" Width="5.5em" ></asp:TextBox>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 7em">
                                        <asp:Label ID="lbDoc1" TabIndex="-1" runat="server" Width="6.5em"> 移交公文數： </asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <asp:Label ID="txCount" runat="server"></asp:Label>
                                        <asp:Label ID="lbDoc2" TabIndex="-1" runat="server" Width="4.5em"> 份公文</asp:Label>
                                        <asp:Button ID="btSetNrps" runat="server" Text="設定"/>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <asp:Panel ID="pTitle" runat="server" align="midden">
                    <div class="GridDiv">
                        <asp:Panel ID="Panel2" runat="server" align="left" HorizontalAlign="Center">
                            <asp:Button ID="btSelectDG" TabIndex="-1" runat="server" Width="3.5em" Text="全選"></asp:Button>
                            <asp:Button ID="btClearDG" TabIndex="-1" runat="server" Width="3.5em" Text="清除"></asp:Button>
                            <asp:Button ID="btChangeDG" TabIndex="-1" runat="server" Width="3.5em" Text="反向"></asp:Button>
                            <asp:Button ID="btClearnNrps" TabIndex="-1" runat="server" Width="10em" Text="清除新承辦單位、人"></asp:Button>
                            <div id="Table4" class="DivTable" style="BORDER-BOTTOM: #dedfde 1px; BORDER-LEFT: #dedfde 1px; BACKGROUND-COLOR: #6b696b; BORDER-COLLAPSE: collapse; COLOR: white; BORDER-TOP: #dedfde 1px; BORDER-RIGHT: #dedfde 1px;">
                                <div class="dTR">
                                    <div class="dTD" style="width: 2em; height: 2em; text-align: center">選取</div>
                                    <div class="dTD" style="width: 2em; height: 2em; text-align: center">序</div>
                                    <div class="dTD" style="width: 9em; height: 2em; text-align: center">
                                        <a onclick="jf_sortCol('DOC_NO')"><u onmouseover="this.style.cursor='hand'">公文文號</u></a>
                                    </div>
                                    <div class="dTD" style="width: 11em; height: 2em; text-align: center">檔號</div>
                                    <div class="dTD" style="width: 4.5em; height: 2em; text-align: center">
                                        <a onclick="jf_sortCol('EMP_NAME')"><u onmouseover="this.style.cursor='hand'">原負責人</u></a>
                                    </div>
                                    <div class="dTD" style="width: 11em; height: 2em; text-align: center">主旨</div>
                                    <div class="dTD" style="width: 11em; height: 2em; text-align: center">新負責單位</div>
                                    <div class="dTD" style="width: 6.5em; height: 2em; text-align: center">新負責人</div>
                                </div>
                            </div>
                        </asp:Panel>
                        <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="50" HorizontalAlign="Center" AutoGenerateColumns="False" ShowHeader="False">
                            <Columns>
                                <asp:TemplateColumn HeaderText="選取">
                                    <ItemStyle HorizontalAlign="Center" Width="2em"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbSelect" onclick="cbSelectClick();" runat="server" Checked="True"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemStyle Width="2em"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbNo" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="公文文號">
                                    <ItemStyle Width="10.5em"></ItemStyle>
                                    <HeaderTemplate>
                                        <a onclick="jf_sortCol('DOC_NO')"><u onmouseover="this.style.cursor='hand'">公文文號</u></a>
                                    </HeaderTemplate>
                                    <ItemTemplate>
                                        <asp:Label ID="txDoc" TabIndex="-1" runat="server" Width="8em" ReadOnly="True"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="檔號">
                                    <ItemStyle Width="13em"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbFile" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="原負責人">
                                    <ItemStyle Width="5em"></ItemStyle>
                                    <HeaderTemplate>
                                        <a onclick="jf_sortCol('EMP_NAME')"><u onmouseover="this.style.cursor='hand'">原負責人</u></a>
                                    </HeaderTemplate>
                                    <ItemTemplate>
                                        <asp:Label ID="lbEmp" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="主旨">
                                    <ItemStyle Width="13em"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="新負責單位">
                                    <ItemStyle Width="13em"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbNrpsDept" runat="server"></asp:Label>
                                        <asp:TextBox ID="txNrpsDeptName" runat="server" CssClass="hide"></asp:TextBox>
                                        <asp:TextBox ID="txNrpsDeptNo" runat="server" CssClass="hide"></asp:TextBox>
                                        <asp:TextBox ID="txNrpsSectNo" runat="server" CssClass="hide"></asp:TextBox>
                                        <asp:TextBox ID="txNrpsSectName" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="新負責人">
                                    <ItemStyle Width="8.5em"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbNrpsUserName" runat="server" ></asp:Label>
                                        <asp:TextBox ID="txNrpsUserName" runat="server" CssClass="hide"></asp:TextBox>
                                        <asp:TextBox ID="txNrpsEmpName" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </asp:Panel>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btImport" runat="server" Text="批次匯入" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDownLoadErr" runat="server" Text="下載匯入異常明細"  DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="移交(S)" Accesskey = "S" Title = "移交(ALT+S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            
        </asp:Panel>
        <asp:Panel Style="z-index: 102; position: absolute; top: 272px; left: 729px" ID="Panel1" runat="server" Width="178px" CssClass="hide" Height="177px">
            <asp:ValidationSummary ID="ValidationSummary1" runat="server" DESIGNTIMEDRAGDROP="85"></asp:ValidationSummary>
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ListBox ID="lbReturnValue" runat="server" CssClass="" DESIGNTIMEDRAGDROP="213"></asp:ListBox>
            <asp:TextBox ID="txClsName" TabIndex="-1" runat="server" Width="6.5em" MaxLength="100"></asp:TextBox>
            <asp:DropDownList ID="dlVersion" TabIndex="-1" runat="server"></asp:DropDownList>
            <asp:TextBox ID="txCaseName" TabIndex="-1" runat="server" Width="110px" DESIGNTIMEDRAGDROP="769"></asp:TextBox>
            <asp:TextBox ID="hDgSortCmd" runat="server"></asp:TextBox>
            <asp:Button ID="btSortOrder" runat="server" Width="100px" Text=""></asp:Button>
            <cc1:ComboBox style="width: 4.5em" ID="dlEmp" TabIndex="115" CssClass="hide" runat="server" MaxLength="40"></cc1:ComboBox>
        </asp:Panel>
    </form>
</body>
</html>
