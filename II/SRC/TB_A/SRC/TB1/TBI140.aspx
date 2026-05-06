<%@ Page Language="c#" CodeBehind="TBI140.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBI140" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>TBI140</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <!--#include file="/STDN/Lib/Script.shtml"-->
</head>
<body style="background-color: #a6e2ff" ms_positioning="GridLayout">
    <form id="TBI140" onkeyup="jf_CheckFull();" method="post" runat="server">
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" style="width: 90%">
                <div class="dTD" style="width: 18%">
                    <div class="GridDiv" id="DivBulletin">
                        <div class="dTR" style="width: 50%">
                            <div class="dTD" style="width: 7.5em">
                                <div style="background-image: url(../image/BulletinId.gif); width: 4.5em; color: white">公告編號</div>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTD" style="width: 7.5em">
                                <asp:Label ID="lbBulletinId" runat="server" BackColor="#a6e2ff"></asp:Label>
                                <asp:TextBox ID="txSourceOrgno" runat="server" CssClass="hide"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTD" style="width: 100%">
                                <asp:Image ID="AttachImage" runat="server" Width="112px" ImageUrl="../image/icon_downloud-orange.gif"></asp:Image>
                                <div style="width: 100%; overflow: auto" class="GridDiv" data-fixed="true">
                                    <asp:DataGrid ID="dg1" runat="server" Width="150px" Height="1px" BackColor="White" ForeColor="Black"
                                        ShowHeader="False" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0"
                                        BorderWidth="1px" BorderColor="#DEDFDE" BorderStyle="None">
                                        <Columns>
                                            <asp:TemplateColumn HeaderText="選">
                                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                                <ItemTemplate>
                                                    <asp:TextBox ID="H_FileName" runat="server" CssClass="hide"></asp:TextBox>
                                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="鏈結欄位">
                                                <ItemTemplate>
                                                    <asp:CheckBox ID="cbSelect2" TabIndex="0" runat="server" CssClass="hide"></asp:CheckBox>
                                                    <asp:HyperLink ID="hlLink" TabIndex="0" runat="server" CssClass="InputFieldLabel" style="word-break:break-all"></asp:HyperLink>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="類型">
                                                <HeaderStyle Wrap="False" HorizontalAlign="Center" CssClass="hide"></HeaderStyle>
                                                <ItemStyle Wrap="False" HorizontalAlign="Center" CssClass="hide"></ItemStyle>
                                                <ItemTemplate>
                                                    <asp:Label ID="lbFileType" runat="server" CssClass="hide"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                        </Columns>
                                    </asp:DataGrid>
                                </div>
                            </div>
                        </div>
                        <div class="dTR" style="height: 23px; width: 100%;">
                            <div class="dTD">
                                <div id="divDownload" style="width: 112px; height: 23px">
                                    <asp:ImageButton ID="btdownload" CssClass="" runat="server" BackColor="#99CCFF" ImageUrl="../IMAGE/bt_07-04.gif"></asp:ImageButton>
                                </div>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTR">
                                <div class="">
                                    <asp:ImageButton ID="ImbtPreviewDI" CssClass="" runat="server" ImageUrl="../image/DocPreview.gif" BackColor="#99CCFF"></asp:ImageButton>
                                </div>
                            </div>
                            <div class="hide">
                                <div class="hide">
                                    <asp:ImageButton ID="ImbtPrintDI" CssClass="" runat="server" ImageUrl="../image/DocPrint.gif" BackColor="#99CCFF"></asp:ImageButton>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:ImageButton ID="ImbtPrintPDF" CssClass="" runat="server" ImageUrl="../image/AttachPrint.gif" BackColor="#99CCFF"></asp:ImageButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dTD" style="border-width: 3px; border-style: solid; border-color: black; padding: 5px;">
                    <div class="dTR">
                        <div class="dTD DgSelectToolBar" id="tbSelect" style="background-color: #99ccff; width: 100%">
                            <asp:ImageButton runat="server" Text="第一筆" ImageUrl="../IMAGE/BtnE_FirstPage.gif" ID="btFirst" ToolTip="第一筆" DefaultStyle="cursor:hand;border-color:#99ccff"></asp:ImageButton>
                            <asp:ImageButton runat="server" Text="上一筆" ImageUrl="../IMAGE/BtnE_PrevPage.gif" ID="btPreview" ToolTip="上一筆" DefaultStyle="cursor:hand;border-color:#99ccff"></asp:ImageButton>
                            <asp:ImageButton runat="server" Text="下一筆" ImageUrl="../IMAGE/BtnE_NextPage.gif" ID="btNext" ToolTip="下一筆" DefaultStyle="cursor:hand;border-color:#99ccff"></asp:ImageButton>
                            <asp:ImageButton runat="server" Text="最後一筆" ImageUrl="../IMAGE/BtnE_LastPage.gif" ID="btLast" ToolTip="最後一筆" DefaultStyle="cursor:hand;border-color:#99ccff"></asp:ImageButton>
                            <asp:Label runat="server" Text="第" DefaultStyle="border-color:#99ccff"></asp:Label>
                            <asp:TextBox runat="server" Width="30px" Style="text-align: right;" MaxLength="3" ID="txViewPage" DefaultStyle="border-color:#99ccff"></asp:TextBox>
                            <asp:Label runat="server" Text="頁／共" DefaultStyle="border-color:#99ccff"></asp:Label>
                            <asp:TextBox runat="server" Width="30px" DefaultStyle="border-color:#99ccff" TabIndex="-1" Style="text-align: right;"
                                MaxLength="3" ID="txTotalPage" BackColor="Gainsboro" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                            <asp:Label runat="server" Text="頁" DefaultStyle="border-color:#99ccff"></asp:Label>
                            <asp:ImageButton runat="server" ImageUrl="../IMAGE/icon_ChangePage.gif" ID="btChangePage" ToolTip="到指定的頁面" DefaultStyle="cursor:hand;border-color:#99ccff"></asp:ImageButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTR">
                            <div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 120px;">
                                <asp:Label ID="Label7" runat="server" CssClass="InputFieldLabel" BackColor="#A7D4EB">類　　別：</asp:Label>
                            </div>
                            <div class="dTD" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 550px; background-color: white; height: 3%;">
                                <asp:Label ID="lbCategory" runat="server" Width="100%" Height="3%" BackColor="White"></asp:Label>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 120px;">
                                <asp:Label ID="Label2" runat="server" CssClass="InputFieldLabel" BackColor="#A7D4EB">公告日期：</asp:Label>
                            </div>
                            <div class="dTD" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 550px; background-color: white; height: 3%;">
                                <asp:Label ID="lbPasteDate" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF"></asp:Label>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 120px;">
                                <asp:Label ID="Label4" runat="server" CssClass="InputFieldLabel" BackColor="#A7D4EB">公告期限：</asp:Label>
                            </div>
                            <div class="dTD" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 550px; background-color: white; height: 3%;">
                                <asp:Label ID="lbExpireDate" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF"></asp:Label>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 120px;">
                                <asp:Label ID="Label1" runat="server" CssClass="InputFieldLabel" BackColor="#A7D4EB">發布單位：</asp:Label>
                            </div>
                            <div class="dTD" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 550px; background-color: white; height: 3%;">
                                <asp:Label ID="lbPaster" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF"></asp:Label>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 120px;">
                                <asp:Label ID="Label6" runat="server" CssClass="InputFieldLabel" BackColor="#A7D4EB">發布人員：</asp:Label>
                            </div>
                            <div class="dTD" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 550px; background-color: white; height: 3%;">
                                <asp:Label ID="lbPasterName" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF"></asp:Label>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 120px;">
                                <asp:Label ID="Label60" runat="server" CssClass="InputFieldLabel" BackColor="#A7D4EB">公告對象：</asp:Label>
                            </div>
                            <div class="dTD" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 550px; background-color: white; height: 3%;">
                                <asp:Label ID="lbAllow" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF"></asp:Label>
                            </div>
                        </div>
                        <div id="htrFounderDept" runat="server" class="hide dTR">
                            <div class="dTDTitle">
                                <asp:Label ID="Label8" runat="server" CssClass="InputFieldLabel" BackColor="#A7D4EB">承辦單位：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:Label ID="lbFounderDept" runat="server"></asp:Label>
                            </div>
                        </div>
                        <div id="htrAccount" runat="server" class="hide dTR">
                            <div class="dTDTitle">
                                <asp:Label ID="Label10" runat="server" CssClass="InputFieldLabel" BackColor="#A7D4EB">承辦人：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:Label ID="lbAccount" runat="server"></asp:Label>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 120px;">
                                <asp:Label ID="Label3" runat="server" CssClass="InputFieldLabel" BackColor="#A7D4EB">來文機關：</asp:Label>
                            </div>
                            <div class="dTD" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 550px; background-color: white; height: 3%;">
                                <asp:Label ID="lbFromOrgName" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF"> </asp:Label>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 120px;">
                                <asp:Label ID="Label5" runat="server" CssClass="InputFieldLabel" BackColor="#A7D4EB">主　　旨：</asp:Label>
                            </div>
                            <div class="dTD" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 550px; background-color: white; height: 3%;">
                                <asp:Label ID="lbSubject" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF"></asp:Label>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 120px; height: 153px">
                                <asp:Label ID="lbContentField" runat="server" Height="100%" CssClass="InputFieldLabel" BackColor="#A7D4EB">說　　明：</asp:Label>
                            </div>
                            <div class="dTD" style="border-width: 1px; border-style: solid; border-color: black; padding: 5px; width: 550px; background-color: white; height: 153px; overflow: hidden">
                                <asp:TextBox ID="lbContent" runat="server" Width="547px" Height="150px" BackColor="#FFFFFF" TextMode="MultiLine" Style="resize: none" ReadOnly="true"></asp:TextBox>
                            </div>
                        </div>
                    </div>
                    <div id="dlgASPXPage" style="display: none; width: 99%; height: 99%; padding: 0px;">
                        <div class="pane" style="width: 101%; height: 101%; overflow-y: hidden; overflow-x: hidden; -webkit-overflow-scrolling: touch;">
                            <iframe class="aspx_page_content" style="width: 99%; height: 99%;"></iframe>
                        </div>
                        <a class="closeBtn" style="display: none"></a>
                    </div>
                    <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 120px; position: absolute; top: 0px; height: 1px">
                        <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
                        <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
                        <asp:ListBox ID="lbReturnValue" runat="server" Width="22px" Height="2px"></asp:ListBox>
                        <asp:TextBox ID="txDownload" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
                        <asp:TextBox ID="H_Di" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
                        <asp:TextBox ID="H_Pdf" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
                        <asp:Label ID="H_TBWS" runat="server" Width="23px"></asp:Label>
                        <asp:Label ID="H_lbDi" runat="server" Width="23px"></asp:Label>
                        <asp:Label ID="H_lbPdf" runat="server" Width="14px"></asp:Label>
                        <asp:Label ID="H_lbAllowName" runat="server" Width="14px"></asp:Label>
                        <asp:Label ID="H_lbPlugInSource" runat="server" Width="14px"></asp:Label>
                        <asp:CustomValidator ID="Customvalidator1" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
                        <asp:ValidationSummary ID="Validationsummary2" runat="server"></asp:ValidationSummary>
                        <asp:ListBox ID="Listbox1" runat="server" Width="80px" Height="8px"></asp:ListBox>
                        <asp:TextBox ID="txBusinessType" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txOrgNo" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txUserId" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txSourceSw" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txInspGcd" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txMainUserId" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txMainUserName" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txInspCd" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txDoseCd" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txUserName" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txDeptNo" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txCoWorkType" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txMainOuId" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txModify" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txCaseNoH" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txCaseClose" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txRole" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txWebService" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txApWebService" runat="server" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="txStartPath" runat="server" Width="26px"></asp:TextBox>
                        <asp:ListBox ID="lbPrintXSLPath" runat="server" CssClass="hidden"></asp:ListBox>
                        <asp:TextBox ID="H_txWebService" runat="server"></asp:TextBox>
                        <asp:TextBox ID="H_txTBSrvName" runat="server"></asp:TextBox>
                        <asp:TextBox ID="H_txLogin" runat="server"></asp:TextBox>
                        <asp:TextBox ID="H_Artifact" runat="server"></asp:TextBox>
                        <asp:TextBox ID="H_SeqNo" runat="server"></asp:TextBox>
                        <asp:TextBox ID="H_BulletinId" runat="server"></asp:TextBox>
                        <asp:TextBox ID="H_BulletinNum" runat="server"></asp:TextBox>
                        <asp:TextBox ID="H_FileType" runat="server"></asp:TextBox>
                        <asp:TextBox ID="H_txDocNo" runat="server"></asp:TextBox>
                        <asp:TextBox ID="H_WORKSTURL" runat="server"></asp:TextBox>
                        <asp:TextBox ID="H_WORKSTPATH" runat="server"></asp:TextBox>
                    </div>
                </div>
            </div>
    </form>
</body>
</html>
