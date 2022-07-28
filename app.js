let first1 = prompt("Sabes como se llama el juego famoso de pelea en el que esta scorpion?");

  if (first1 == "si" || first1 == "Si" || first1 == "SI") {

    let name = prompt("Cual es?");

    for (let i = 0; i < 10; i++) {

      while (name != "X") {

        switch (name) {

          case "Mortal Kombat":
            alert("Exelente ese es!");
            
            let first2 = prompt("Y el de hielo se llama Sub-Zero?");

              if (first2 == "si" || first2 == "Si" || first2 == "SI") {
                alert("Muy bien sabes los personajes principales! Has finalizado!");
              } 
              
              else {
                alert("Respuesta final?");
              }
              
            break;

          case "Killer Instinct":
            alert("No, ese no es!");
            break;

          case "Street Fighter":
            alert("Ese juego no es!");
            break;

          default:
            alert("Nope, no es ese");
            break;
        }
        name = prompt("Ingresa el nombre del juego");    
      }
    }
  }
  
  else if (first1 == "no") {
    alert("Cuando lo sepas podes volver a intentarlo, intenta refrescar la pagina!");
  }