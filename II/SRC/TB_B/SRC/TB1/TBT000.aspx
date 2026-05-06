<%@ Page Language="c#" CodeBehind="TBT000.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBT000" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>TBT000</title>
    <meta content="Microsoft Visual Studio 7.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STD/LIB/SYS.css" type="text/css" rel="stylesheet">
    <script language="JavaScript" type="text/JavaScript">
<!--
    function MM_reloadPage(init)
    {  //reloads the window if Nav4 resized
        if (init == true) with (navigator)
            {
            if ((appName == "Netscape") && (parseInt(appVersion) == 4))
            {
                document.MM_pgW = innerWidth; document.MM_pgH = innerHeight; onresize = MM_reloadPage;
            }
        }
        else if (innerWidth != document.MM_pgW || innerHeight != document.MM_pgH) location.reload();
    }
    MM_reloadPage(true);
    //-->
    </script>
</head>
<body background="../image/BG800-600-.jpg" ms_positioning="GridLayout">
    <div id="Layer1" style="z-index: 102; left: 32%; width: 180px; position: absolute; top: 0px; height: 292px">
        <asp:Image ID="Image1" runat="server" ImageUrl="../image/BGmiddle.gif"></asp:Image>
    </div>
    <form id="TBT000" method="post" runat="server">
        <table width="338" border="0" cellpadding="0" cellspacing="0" background="../image/insert.gif" id="Table1" style="z-index: 103; left: 33%; width: 338px; position: absolute; top: 182px; height: 211px" name="Table1">
            <tbody>
                <tr>
                    <td style="height: 52px"><font face="·s²Ó©úÅé"></font></td>
                    <td style="height: 52px"></td>
                </tr>
                <tr>
                    <td align="right">
                        <img alt="" src="../image/account.gif"></td>
                    <td style="width: 160px; height: 24px">
                        <asp:TextBox ID="tbUserId" runat="server" BackColor="#C0FFFF" Width="126px" MaxLength="10"></asp:TextBox></td>
                </tr>
                <tr>
                    <td style="height: 24px" align="right">
                        <img alt="" src="../image/password.gif"></td>
                    <td style="width: 160px; height: 24px">
                        <asp:TextBox ID="tbMima" runat="server" BackColor="#C0FFFF" Width="126px" MaxLength="10" TextMode="Password"></asp:TextBox></td>
                </tr>
                <tr>
                    <td style="width: 339px" align="middle" colspan="2">
                        <table id="Table2" style="width: 273px; height: 21px" cellspacing="0" cellpadding="0" width="273" border="0">
                            <tr align="middle">
                                <td>
                                    <asp:ImageButton ID="Imglogin" runat="server" ImageUrl="../IMAGE/button01-01.gif"></asp:ImageButton></td>
                                <td>
                                    <asp:ImageButton ID="ImgClear" runat="server" ImageUrl="../IMAGE/button02-01.gif"></asp:ImageButton></td>
                                <td style="width: 109px">
                                    <asp:ImageButton ID="ImgPeoplelogin" runat="server" ImageUrl="../IMAGE/button03-01.gif"></asp:ImageButton></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <asp:TextBox ID="H_ButtonType" runat="server" Width="15px" CssClass="hide" AutoPostBack="True"></asp:TextBox>
        <asp:TextBox ID="H_FailCount" runat="server" Width="15px" CssClass="hide"></asp:TextBox>
        <asp:CustomValidator ID="CustomValidator1" Style="z-index: 102; left: 58px; position: absolute; top: 46px" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
    </form>
</body>
</html>
