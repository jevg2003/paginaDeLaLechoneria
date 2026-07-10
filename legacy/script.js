


//para el carrusel---------------------------------------------------------------------------------------------

//para el fixed--------------------------------------------------------------------------------------------
var linea = document.getElementById("fixer");
var scrollPos = 0;

window.addEventListener("scroll", function() {
  var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollPos > scrollPos) {
    // Scrolling hacia abajo
    linea.classList.add("hidden");
  } else {
    // Scrolling hacia arriba
    linea.classList.remove("hidden");
  }

  scrollPos = currentScrollPos;
});

function toggleDropdown() {
    var dropdown = document.getElementById('dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function closeDropdown() {
    var dropdown = document.getElementById('dropdown');
    dropdown.style.display = 'none';
}


  //mensajeria de la lechoneria-----------------------------------------------------------------------------------------------

  // document.addEventListener('click', function (event) {
  //   var target = event.target;
  //   var dropdown = document.getElementById('dropdown');
  //   var selectImg = document.querySelector('.select-img img'); // Modificado

  //   // Comprobar si el clic ocurrió dentro o fuera de la lista desplegable
  //   if (target !== dropdown && !dropdown.contains(target) && target !== selectImg) { // Modificado
  //     dropdown.style.display = 'none';
  //   }
  // });

  // document.getElementById("myForm").addEventListener("submit", function(event) {
  //   event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
  //   var name = document.getElementById("name").value;
  //   var phone = document.getElementById("phone").value;
  //   var message = document.getElementById("message").value;
  
  //   if (message.length > 200) {
  //     alert("Tienes más de 200 caracteres");
  //     return;
  //   }
  
  //   // Realiza una petición AJAX para guardar los datos en la base de datos
  //   var xhr = new XMLHttpRequest();
  //   xhr.open("POST", "save_task.php", true);
  //   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //   xhr.onreadystatechange = function() {
  //     if (xhr.readyState === XMLHttpRequest.DONE) {
  //       if (xhr.status === 200) {
  //         alert("Datos guardados correctamente");
  //         // Restablecer los campos del formulario
  //         document.getElementById("name").value = "";
  //         document.getElementById("phone").value = "";
  //         document.getElementById("message").value = "";
  //       } else {
  //         alert("Error al guardar los datos");
  //       }
  //     }
  //   };
  //   var data = "name=" + encodeURIComponent(name) +
  //              "&phone=" + encodeURIComponent(phone) +
  //              "&message=" + encodeURIComponent(message);
  //   xhr.send(data);
  // });

  //sobre las pantallas de mas info!!

  const cartas = document.querySelectorAll('.carta');
  const ventanaEmergente = document.getElementById('ventana-emergente');
  const tituloProducto = document.getElementById('titulo-producto');
  const descripcionProducto = document.getElementById('descripcion-producto');
  const cerrarVentana = document.getElementById('cerrar-ventana');
  const whatsappButton = document.getElementById('whatsapp-button');
  
  cartas.forEach((carta, index) => {
    const botonMasInfo = carta.querySelector('.mas-info');
    const titulo = carta.querySelector('h3').textContent;
    const descripcion = carta.querySelector('p').textContent;
  
    botonMasInfo.addEventListener('click', () => {
      ventanaEmergente.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Añade esta línea
      tituloProducto.textContent = titulo;
      descripcionProducto.textContent = descripcion;
  
      // Realiza acciones específicas según el botón presionado
      if (index === 0) {
        // Acciones para el primer botón "Mas info!"
        console.log("Acciones para el primer botón");
      } else if (index === 1) {
        // Acciones para el segundo botón "Mas info!"
        console.log("Acciones para el segundo botón");
      } else if (index === 2) {
        // Acciones para el tercer botón "Mas info!"
        console.log("Acciones para el tercer botón");
      }
    });
  });
  
  cerrarVentana.addEventListener('click', () => {
    ventanaEmergente.style.display = 'none';
    document.body.style.overflow = 'auto'; // Añade esta línea
  });
  
  whatsappButton.addEventListener('click', () => {
    window.open('https://wa.me/3128839301/?text=Hola,%20estoy%20interesado%20en%20averiguar%20sobre%20su%20producto.', '_blank');
});

// hiden

const seccionesOcultas = document.querySelectorAll('.hidden');


/* El Observer*/
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        entry.target.classList.toggle('mostrar', entry.isIntersecting);
        // if(entry.isIntersecting) observer.unobserve(entry.target);        
    });
},
{threshold: 0.3}
);
seccionesOcultas.forEach((seccion)=>observer.observe(seccion));
