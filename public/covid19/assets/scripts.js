$('#js-form').submit(async (event) => {
    event.preventDefault();
    const email = document.getElementById('js-input-email').value;
    const password = document.getElementById('js-input-password').value;
    const JWT = await postData(email, password);  
    if (JWT) {
        const covid = await getCovid(JWT);
        const chileConfirmados=  await getChileConfirmados(JWT);
        const chileMuertos=  await getChileMuertos(JWT); 
        const ChileRecuperados=  await getChileRecuperados(JWT); 
        filtro(covid);
        mostrarGrafico(covid);  
        graficoChile(chileConfirmados,chileMuertos,ChileRecuperados)        
        toggleFormAndTable('inicioSesion', 'grafico','situacionChile','cerrarSesion');
    }else{
        alert('Ingresa bien el correo')
    }
   
      
});
//arreglo de paises que cumplen la condición
let paises = [];
//donde obtengo el eamil y clase para acceder
const postData = async (email, password) => {
    try {
    const response = await fetch('http://localhost:3000/api/login',
    {
    method:'POST',
    body: JSON.stringify({email:email,password:password})
    })
    const {token} = await response.json()
    localStorage.setItem("jwt",token)
    return token
    } catch (err) {
    console.error(`Error: ${err}`)
    }
    }
//donde obtengo la información de los paises con covid
const getCovid = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/total', {
            method: 'GET',
            headers: {Authorization: `Bearer ${jwt}`}
        })
        const {data} = await response.json();
        if (data) {
            return data           
        }
    } catch (error) {
        localStorage.clear()
        console.log(`Error: ${error}`)
    }
}

//situación Chile de confirmados.
const getChileConfirmados= async(jwt)=>{
    try {
        const response = await fetch('http://localhost:3000/api/confirmed', {
            method: 'GET',
            headers: {Authorization: `Bearer ${jwt}`}
        })
        const {data} = await response.json();
        if (data) {           
            return data            
        }else{
            console.log('error',data)
        }

    } catch (error) {       
        console.log(`Error: ${error}`)
    }
}
//situación Chile de muertos.
const getChileMuertos= async(jwt)=>{
    try {
        const response = await fetch('http://localhost:3000/api/deaths', {
            method: 'GET',
            headers: {Authorization: `Bearer ${jwt}`}
        })
        const {data} = await response.json();
        if (data) {           
            return data            
        }else{
            console.log('error',data)
        }

    } catch (error) {       
        console.log(`Error: ${error}`)
    }
}

//situación Chile de recuperados.
const getChileRecuperados= async(jwt)=>{
    try {
        const response = await fetch('http://localhost:3000/api/recovered', {
            method: 'GET',
            headers: {Authorization: `Bearer ${jwt}`}
        })
        const {data} = await response.json();
        if (data) {           
            return data            
        }else{
            console.log('error',data)
        }

    } catch (error) {       
        console.log(`Error: ${error}`)
    }
}

//donde genero el filtro de paises que cumplen con la condición de cierta cantidad de contagiados, en este caso 10.000
const filtro = (data) => {  
    let tabla = document.getElementById('js-table');
    let n = 0;
    let filtro = data.filter(caso => {
        return caso.active >  100000;
    });
    paises.push(filtro)   
    filtro.forEach((casos, i) => {
        n++
        tabla.innerHTML += ` 
        <tr>
        <td>${n} </td>
<td> ${casos.location} </td>
<td> <button type="button"  onclick=verDetalle(${i}) id="${i}" class="btn btn-info btn-lg" data-toggle="modal" data-target="#pais">Ver Detalle</button></td>
</tr>`
    })
   
}

//muestro el grafico de los paises contagiados de acuerdo al filtro.
const  mostrarGrafico=(data)=>{  
    let filtro = data.filter(caso => {
        return caso.active > 100000;
    });
   
   let activos=[];
   let muertos=[];
   let confirmados=[]
   let recuperados=[];
   let pais=[];
 
    for (let i = 0; i < filtro.length; i++) {
     activos.push(filtro[i].active)
     muertos.push(filtro[i].deaths)
     recuperados.push(filtro[i].recovered) 
     confirmados.push(filtro[i].confirmed)
     pais.push(filtro[i].location)        
    }

    var ctx = document.getElementById('myChart')
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: pais,
        datasets: [{
            label: 'Casos Activos',
            data: activos,
            backgroundColor: [
                'Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray',
                'Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray',
                 'Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray',
                 'Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray',
                 'Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray',
                 'Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray',
                 'Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray',
                 'Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray','Gray',                            
            ],         
            borderWidth: 1
        },
            {
            label: 'Casos confirmados',
            data: confirmados,
            backgroundColor: [
                'Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow',
                'Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow',
                'Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow',
                'Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow',
                'Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow',
                'Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow',
                'Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow','Yellow',
            ],         
            borderWidth: 1
        },{
            label: 'Muertos',
            data: muertos,
            backgroundColor: [
                'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red',
                'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 
                'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 
                'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 
                'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red',
                'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red',
                'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red',
            ],          
            borderWidth: 1
        },{
            label: 'Casos Recuperados',
            data: recuperados,
            backgroundColor: [
                'Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue',
                'Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue',
                'Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue',
                'Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue',
                'Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue',
                'Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue','Blue',
            ],           
        }]
    },
    options: {
        responsive: true,
        scales: {
            x:{
                display:true,
            },
            y: {       
                display:true,                    
                  min: 0,
                  max: 1000000,
                  ticks:{
                  stepSize: 8000,
                  }                               
            }       
          }
    }
});
    }
//genero el modal por cada uno de los países que filtre e ingrese en el arrays pais
function verDetalle(i) {
    let pais = paises[0][i];
 document.getElementById('titulo').textContent=`Resumen ${pais.location}`
    let modal = document.getElementById('datosPais')
    modal.innerHTML = `<p>Casos activos: ${pais.active}</p>
                <p>Casos confirmados: ${pais.confirmed}</p>
                <p>Muertos: ${pais.deaths}</p>
                <p>Recuperados: ${pais.recovered}</p>`

}

//grafico Chile.
const graficoChile=(data1,data2,data3)=>{
    let fecha=[]
     data1.forEach(confirmados=>{
        return fecha.push(confirmados.date);
    });
    let datosConfirmados=[]
     data1.forEach(confirmados=>{      
        return datosConfirmados.push(confirmados.total);
    });

    let datosMuertos=[]
    data2.forEach(muertos=>{
        return datosMuertos.push(muertos.total)
    });
 
    let datosRecuperados=[]
    data3.forEach(recuperados=>{
        return datosRecuperados.push(recuperados.total)
    }) 
    let chile= document.getElementById('myChart2')
    const labels = fecha;  
    var   chart= new Chart(chile,{
        type:'line',
        data: {
            labels: labels,
            datasets: [{
              label: 'Confirmados',
              data: datosConfirmados,
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor:'rgb(255, 99, 132)'
             },
             {
                label: 'Muertos',
                data: datosMuertos,
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)'
               },
               {
                label: 'Recuperados',
                data: datosRecuperados,
                fill: false,
                backgroundColor: 'rgb(255, 205, 86)',
                borderColor:'rgb(255, 205, 86)'
               }
            
            ]
          }
    })
   

}


//oculto las tablas y muestro en primera instancia el login
const toggleFormAndTable = (form, grafico,chile) => {
    $(`#${form}`).toggle()
    $(`#${grafico}`).toggle()
    $(`#${chile}`).toggle()

}

//cierro sesión
let cerrar = document.getElementById('cerrar');
cerrar.addEventListener('click', () => {
    localStorage.removeItem('jwt')
   /*  let btn = document.getElementById('cerrar')
    btn.setAttribute('style', "display: none"); */
    let sesion = document.getElementById('inicioSesion')
    sesion.setAttribute('style', "display: block");
    let grafico = document.getElementById('grafico')
    grafico.setAttribute('style', "display: none");
    let chile = document.getElementById('situacionChile')
    chile.setAttribute('style', "display: none");
    document.getElementById('js-input-email').value = ""
    document.getElementById('js-input-password').value = ""
 
})
//hago la persistencia de la sesión
const init = async() => {
    const token = localStorage.getItem('jwt')
    if (token) {
        const covid = await getCovid(token)
        const chileConfirmados=  await getChileConfirmados(token);
        const chileMuertos=  await getChileMuertos(token); 
        const ChileRecuperados=  await getChileRecuperados(token);
        filtro(covid);      
        mostrarGrafico(covid);  
        graficoChile(chileConfirmados,chileMuertos,ChileRecuperados)   
        toggleFormAndTable('inicioSesion', 'grafico','situacionChile');
    }
}
init()