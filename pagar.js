const boton = document.querySelector("#boton").addEventListener("click", () =>{

    
(async () => {     
    const response = await fetch('http://localhost:3000/create-payment', 
                                 {method: 'POST', mode: 'cors', 
                                  headers:{
                                      'Content-Type': 'application/json'
                                  },redirect: 'follow',referrerPolicy: 'origin-when-cross-origin'});
    const resp = await response.json()
        .catch(() => { throw new NotAcceptableException(console.log('Error')); });
        
        let w = 900;
        let h = 500;
        
        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = (screen.width/2)-(w/2);
        var top = (screen.height/2)-(h/2);
        window.open(resp.data.links[1].href, "hola", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    })();
});