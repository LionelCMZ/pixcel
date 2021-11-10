import {db,ref,set,get,child,onChildAdded} from "../js/connection-firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
   
const auth = getAuth();
var inputs = document.querySelectorAll('.seccion-input input');

const expresiones = {
    nombre: /^\s*[a-zA-Z\s]{3,40}\s*$/,
    correo: /^\s*[a-zA-Z0-9\-\_]+@[a-zA-Z0-9\-\_]+\.com+\s*$/,
    contrasena: /^.{8,25}$/
}


agregarEventoBotonRegistrar();
agregarEventsInputs();
inciarBotonOjo();

function agregarEventoBotonRegistrar(){
      var boton = document.querySelector('#formulario');
   
      boton.addEventListener('submit',(e) =>{
        var hayError = 0;
          e.preventDefault();
          inputs.forEach(element =>{
            hayError += comprobarCampos(element);
          });

          if(hayError == 0){
            var nombreR = document.querySelector(".input-nombre");
            var correoR = document.querySelector(".input-correo");
            var contrasenaR = document.querySelector(".input-contrasena");
            var usuario= {
                nombre: nombreR.value,
                correo: correoR.value,
                contrasena: contrasenaR.value
            };
            insertarDatos(usuario);
          }
          console.log('registro enviado')
          console.log(hayError);

      });
}

function insertarDatos(usuario) {
    set(ref(db, "Usuarios/" + usuario.nombre), usuario);
        //.then(() => {
        //    alert("Datos registrados correctamente");
        //})
        //.catch((error) => {
        //    alert("unsucessfull, error" + error);
        //});
}



function inciarBotonOjo(){
    var boton = document.querySelector(".boton-ojo");
    boton.addEventListener("click", ()=>{
     
        var inputContrasena = document.querySelector(".input-contrasena");
        if(inputContrasena.type == "password"){
            inputContrasena.type = "text";
            boton.classList.add("mostrar-contrasena");
            boton.classList.remove("ocultar-contrasena");


        }else{
            inputContrasena.type = "password";
            boton.classList.remove("mostrar-contrasena");
            boton.classList.add("ocultar-contrasena");

        }
    });
}

function agregarEventsInputs(){
    inputs.forEach(element => {

        element.addEventListener('keyup',(e)=>{
            comprobarCampos(e.target);
        } );
        
        element.addEventListener('blur',(e)=>{
            comprobarCampos(e.target);
        } );
    });

}

function motrarMensajeErrorInput(nombreInput,mensaje){
    var aux= document.querySelector('.'+nombreInput);
    aux.textContent = mensaje;

}

function borrarMensajeErrorInput(nombreInput){
    var aux= document.querySelector('.'+nombreInput);
    aux.textContent = '';

}


function comprobarCampos(e){
    switch(e.classList[0]){
        case "input-nombre":
          if(expresiones.nombre.test(e.value.trim())){
              borrarMensajeErrorInput('m-nombre');
              return 0;
          }else{
               motrarMensajeErrorInput('m-nombre','El nombre debe tener de 3 a 40 caracteres sin contener números o símbolos.');
               return 1;
          }
        break;
        case "input-correo":
            if(expresiones.correo.test(e.value)){
                borrarMensajeErrorInput('m-correo');
                return 0;
            }else{
                motrarMensajeErrorInput('m-correo','El correo debe seguir el formato user@example.com');
                return 1;
            }
        break;
        case "input-contrasena":
            if(expresiones.contrasena.test(e.value)){
                borrarMensajeErrorInput('m-contrasena');
                return 0;
            }else{
                motrarMensajeErrorInput('m-contrasena','La contraseña tiene que estar entre 8 y 25 caracteres');
                return 1;
            }
        break;
    } 
}




