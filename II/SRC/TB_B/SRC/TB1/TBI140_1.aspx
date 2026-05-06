<%@ Page Language="c#" CodeBehind="TBI140_1.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBI140_1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>TBI140_1</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STD/LIB/SYS.css">
</head>
<body style="background-color: #a6e2ff" ms_positioning="GridLayout">
    <form id="TBI140_1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <div style="behavior: url(../../../STD/LIB/webservice.htc)" id="service"></div>
        <div style="z-index: -100; position: absolute; width: 100px; height: 1px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Height="2px" Width="22px"></asp:ListBox>
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
            <asp:ListBox ID="Listbox1" runat="server" Height="8px" Width="80px"></asp:ListBox>
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
        </div>
        <object style="z-index: 102; position: absolute; top: 2px; left: 41px" id="exp" classid="CLSID:210FF79A-A4A1-429F-BABC-0B0A574B8748"
            data="data:application/x-oleobject;base64,mvcPIaGkn0K6vAsKV0uHSAADAAAaAAAAGgAAAA=="
            width="1" height="1" viewastext>
        </object>
        <table id="BaseTable">
            <tr>
                <td style="width: 122px" bgcolor="#a6e2ff" valign="top" align="left">
                    <div style="width: 176px; height: 422px; overflow: auto" id="DivBulletin" align="center">
                        <table style="width: 122px; height: 192px" id="MainTable" class="MainTable" cellspacing="0"
                            cellpadding="0" width="122" bgcolor="#a6e2ff" height="100%">
                            <tr>
                                <td align="center">
                                    <div style="background-image: url(../image/BulletinId.gif); width: 80px; color: white">公告編號</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="LeftCol" valign="top" align="center">
                                    <asp:Label ID="lbBulletinId" runat="server" BackColor="#a6e2ff" Font-Size="Small" Font-Names="細明體"></asp:Label></td>
                            </tr>
                            <tr>
                                <td class="LeftCol" valign="top" align="center">
                                    <asp:Image ID="AttachImage" runat="server" Width="112px" ImageUrl="../image/icon_downloud-orange.gif"></asp:Image>
                                    <asp:DataGrid ID="dg1" runat="server" Height="1px" Width="150px" BackColor="White" BorderStyle="None"
                                        BorderColor="#DEDFDE" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30" ShowHeader="False" ForeColor="Black">
                                        <FooterStyle BackColor="#CCCC99"></FooterStyle>
                                        <SelectedItemStyle Font-Bold="True" ForeColor="White" BackColor="#CE5D5A"></SelectedItemStyle>
                                        <AlternatingItemStyle BackColor="White"></AlternatingItemStyle>
                                        <ItemStyle BackColor="#F7F7DE"></ItemStyle>
                                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" ForeColor="White" BackColor="#6B696B"></HeaderStyle>
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
                                                    <asp:HyperLink ID="hlLink" TabIndex="0" runat="server" Font-Size="Smaller" Font-Names="細明體" CssClass="InputFieldLabel"></asp:HyperLink>
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
                                        <PagerStyle HorizontalAlign="Right" ForeColor="Black" BackColor="#F7F7DE" Mode="NumericPages"></PagerStyle>
                                    </asp:DataGrid></td>
                            </tr>
                            <tr height="23">
                                <td align="center">
                                    <div id="divDownload" style="width: 112px; height: 23px">
                                        <asp:ImageButton ID="btdownload" runat="server" BackColor="#99CCFF" ImageUrl="../IMAGE/bt_07-04.gif"></asp:ImageButton>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td align="center"><font face="新細明體"></font></td>
                            </tr>
                        </table>
                        <div><font face="新細明體"></font>&nbsp;</div>
                        <div><font face="新細明體"></font>&nbsp;</div>
                        <div><font face="新細明體"></font>&nbsp;</div>
                    </div>
                    </FONT></td>
                <td style="width: 100%" bgcolor="#a6e2ff" valign="top" align="center"><font face="新細明體">
                    <table style="width: 100%" border="1" cellspacing="0" bordercolorlight="#003333" bordercolordark="#f0f0f0"
                        cellpadding="0" bgcolor="#a6e2ff" align="center">
                        <tr>
                            <td style="height: 10px" align="center"></td>
                        </tr>
                        <tr>
                            <td>
                                <table id="Table1" class="MainTable" border="1" cellspacing="0" cellpadding="1" width="100%"
                                    align="center" height="100%" border-color="#000066">
                                    <tr>
                                        <td class="LeftCol" bgcolor="#a7d4eb" width="100" align="right">
                                            <asp:Label ID="Label7" runat="server" Width="90px" CssClass="InputFieldLabel" BackColor="#A7D4EB"
                                                Font-Size="Small" Font-Names="細明體">類　　別：</asp:Label></td>
                                        <td bgcolor="white" colspan="5">
                                            <asp:Label ID="lbCategory" runat="server" Height="100%" Width="100%" BackColor="#FFFFFF" Font-Size="Small"
                                                Font-Names="細明體"></asp:Label></td>
                                    </tr>
                                    <tr>
                                        <td class="LeftCol" bgcolor="#a7d4eb" align="right">
                                            <asp:Label ID="Label2" runat="server" Width="90px" CssClass="InputFieldLabel" BackColor="#A7D4EB"
                                                Font-Size="Small" Font-Names="細明體">公告日期：</asp:Label></td>
                                        <td bgcolor="white">
                                            <asp:Label ID="lbPasteDate" runat="server" Height="100%" Width="100%" BackColor="#FFFFFF" Font-Size="Small"
                                                Font-Names="細明體"></asp:Label></td>
                                    </tr>
                                    <tr>
                                        <td class="LeftCol" bgcolor="#a7d4eb" align="right">
                                            <asp:Label ID="Label4" runat="server" Width="90px" CssClass="InputFieldLabel" BackColor="#A7D4EB"
                                                Font-Size="Small" Font-Names="細明體">公告期限：</asp:Label></td>
                                        <td bgcolor="white">
                                            <asp:Label ID="lbExpireDate" runat="server" Height="100%" Width="100%" BackColor="#FFFFFF"
                                                Font-Size="Small" Font-Names="細明體"></asp:Label></td>
                                    </tr>
                                    <tr>
                                        <td class="LeftCol" bgcolor="#a7d4eb" align="right">
                                            <asp:Label ID="Label1" runat="server" Width="90px" CssClass="InputFieldLabel" BackColor="#A7D4EB"
                                                Font-Size="Small" Font-Names="細明體">發布單位：</asp:Label></td>
                                        <td bgcolor="white">
                                            <asp:Label ID="lbPaster" runat="server" Height="100%" Width="100%" BackColor="#FFFFFF" Font-Size="Small"
                                                Font-Names="細明體"></asp:Label></td>
                                    </tr>
                                    <tr>
                                        <td style="height: 20px" class="LeftCol" bgcolor="#a7d4eb" align="right">
                                            <asp:Label ID="Label6" runat="server" Width="90px" CssClass="InputFieldLabel" BackColor="#A7D4EB"
                                                Font-Size="Small" Font-Names="細明體">發布人員：</asp:Label></td>
                                        <td style="height: 20px" bgcolor="white">
                                            <asp:Label ID="lbPasterName" runat="server" Height="100%" Width="100%" BackColor="#FFFFFF"
                                                Font-Size="Small" Font-Names="細明體"></asp:Label></td>
                                    </tr>
                                    <tr>
                                        <td class="LeftCol" bgcolor="#a7d4eb" align="right">
                                            <asp:Label ID="Label3" runat="server" Width="90px" CssClass="InputFieldLabel" BackColor="#A7D4EB"
                                                Font-Size="Small" Font-Names="細明體">來文機關：</asp:Label></td>
                                        <td bgcolor="white">
                                            <asp:Label ID="lbFromOrgName" runat="server" Height="100%" Width="100%" BackColor="#FFFFFF"
                                                Font-Size="Small" Font-Names="細明體"></asp:Label></td>
                                    </tr>
                                    <tr>
                                        <td class="LeftCol" bgcolor="#a7d4eb" align="right">
                                            <asp:Label ID="Label5" runat="server" Width="90px" CssClass="InputFieldLabel" BackColor="#A7D4EB"
                                                Font-Size="Small" Font-Names="細明體">主　　旨：</asp:Label></td>
                                        <td bgcolor="white" colspan="5">
                                            <asp:Label ID="lbSubject" runat="server" Height="100%" Width="100%" BackColor="#FFFFFF" Font-Size="Small"
                                                Font-Names="細明體"></asp:Label></td>
                                    </tr>
                                    <tr>
                                        <td style="height: 153px" class="LeftCol" bgcolor="#a7d4eb" valign="top" align="right">
                                            <asp:Label ID="lbContentField" runat="server" Height="100%" Width="90px" CssClass="InputFieldLabel"
                                                BackColor="#A7D4EB" Font-Size="Small" Font-Names="細明體">說　　明：</asp:Label></td>
                                        <td style="height: 153px" bgcolor="white" valign="top" colspan="5">
                                            <asp:Label ID="lbContent" oncontextmenu="fnContextMenu()" runat="server" Height="100%" Width="100%"
                                                BackColor="#FFFFFF" Font-Size="Small" Font-Names="細明體"></asp:Label></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </font>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
