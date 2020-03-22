
var $ = el => document.querySelector(el);
document.addEventListener("DOMContentLoaded",event=>{
    let mostrarVista = document.querySelector("[class*='mostrar']");
    let mostrarVista = $("[class*='mostrar']");
    mostrarVista.addEventListener('click',e=>{
        e.preventDefault();
        e.stopPropagation();

        let modulo = e.toElement.dataset.modulo;

        fetch('public/vistas/alumnos/alumnos.html').then( resp=>resp.text() ).then(resp=>{
            $(`#vistas-${modulo}`).innerHTML = resp;

            let btnCerrar = $(".close");
            btnCerrar.addEventListener("click",event=>{
                $(`#vistas-${modulo}`).innerHTML = "";
            });

            let cuerpo = $("body"),
                script = document.createElement("script");
            script.src = `public/vistas/${modulo}/${modulo}.js`;
            cuerpo.appendChild(script);
        });
    });
});