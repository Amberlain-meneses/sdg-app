const url = 'http://127.0.0.1:8000/api/v1/listRouters'
const apiUrl = 'http://127.0.0.1:8000/api/v1'

export const getRouters = async () => {
    const response = await fetch(url);
    const getDataRouteros = response.json();
    console.log(getDataRouteros);
    
    return getDataRouteros;

} 


export const handleDelete = async (id) => {
    const response = await fetch(`${apiUrl}/delete/${id}`, {
      method: 'DELETE',
    });
    if(!response.ok){
      throw new Error(`HTTP error! stust: ${response.status}`);
    }
    const data = await response.json();
  
    if(data.success){
      //console.log(data.message)
      return Promise.resolve();
    }else{
      console.error('Error eliminando el router:', data.message);
      return Promise.reject();
    }
  }