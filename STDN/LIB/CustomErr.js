var IsServerHandling = new Boolean();
IsServerHandling = false;

function ClientButtonControl()
{
	var xObjectName = document.activeElement.id;
	
	if(IsServerHandling)
	   return;
	    
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btClose":
			Page_BlockSubmit=true;
			window.close();
			break;
	}
}

function ProjectOnLoad()
{
}

function ClientOnLoad()
{
}