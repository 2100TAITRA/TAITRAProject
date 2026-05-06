/*if(document.all["StartField"] != null)
		jf_OpenSumDocWin(document.all["StartField"].value);*/
		
window.onload = Login;

function Login()
{
	if(document.all["StartField"] != null)
	{
		//alert(document.all["StartField"].value);
		//jf_OpenWindow(document.all["StartField"].value,"AutoLoginByType.aspx","toolbar=no");
	}
}


function jf_OpenWindow(argUrl, argWinName, argOption)
{
	gWindowID = open(argUrl);
	gWindowID.focus();
	return gWindowID;
}