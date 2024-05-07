async function ejecutarLogin(event, objeto){
    event.preventDefault();
    const usu = document.getElementById("usu_email").value;
    const pass = document.getElementById("usu_password").value;
    const obj = {usu_email:usu, usu_password:pass};
    let respuesta = await fetch(Urls.login,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    });
    if (respuesta.ok){
        window.location.replace(Urls.index);
    }else{
        let texto = await respuesta.text();
        alert(texto);
    }
}

const btn = document.getElementById("btn_ingresar");
btn.addEventListener("click",ejecutarLogin);

