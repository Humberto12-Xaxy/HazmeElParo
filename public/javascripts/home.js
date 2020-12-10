const modal = () => {
    Swal.fire({
        title: 'Guardar nueva tarea',
        html:
        '<input type="text" id="name" class="swal2/input" placeholder="Nombre de la tarea" />' +
        '<br>'+
        '<br>'+
        '<textarea  id="description" placeholder="Instrucciones de la tarea"/>' ,
        confirmButtonText : 'Guardar',
        background: '#000',
    }).then(response =>{

        const name = document.getElementById('name');
        const description = document.getElementById('description');
        
        if(response.isConfirmed && name.value  && description.value){
            fetch('home/upload',{
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' :'application/json'
                },             
                body:JSON.stringify({name:name.value, description:description.value})
            })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: data.res,
                    background: '#000',
                }).then(response => {
                    window.location.reload();
                })
            })
            .catch(error => console.log(error))
              
        }else{
            Swal.fire({
                icon: 'error',
                title: 'No se añadir el paro',
                background: '#000',
            })
        }
    })
}

const modal2 = (id) => {

    Swal.fire({
        title: 'Editar paro',
        html:
        '<input type="text" id="name" class="swal2/input" placeholder="Nombre del paro" />' +
        '<br>'+
        '<br>'+
        '<textarea  id="description" placeholder="Instrucciones del paro"/>' ,
        confirmButtonText : 'Guardar',
        background: '#000'
     }).then((response) => {

        const nombre =  document.getElementById('name').value;
        const descripcion = document.getElementById('description').value;

        if(response.isConfirmed && nombre && descripcion){
            fetch('misparos/update',{
                method : 'PUT',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' :'application/json'
                },
                body: JSON.stringify({id:id, nombre:nombre, descripcion: descripcion})
            })
            .then(res => res.json()) 
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    background: '#000',
                }).then(response => {
                    window.location.reload();
                })
            })
            .catch(err => console.log(err))
        }else{
            Swal.fire({
                icon: 'error',
                title: 'No se pudo actualizar el paro',
                background: '#000',
            })
        }
    })
}

const realizado = (id) => {
    
    fetch('pendientes/completado',{
        method: 'POST',
        headers: {
                'Accept' : 'application/json',
                'Content-Type' :'application/json'
            },
        body: JSON.stringify({id:id})
        })
    .then(res => res.json())
        Swal.fire({
            icon: 'success',
            title: 'Paro completado'
        }).then(res => window.location.reload())

        
    
}

const work = document.getElementById('modal')

work.addEventListener('click',()=>{
    modal();
    console.log(content)
})