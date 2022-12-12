function editCarrApFaming(data){
  var dataForm = new FormData();
  dataForm.append("note", data );
  fetch("/cart/update.js", {
   method: "POST",
   body:dataForm   
  }).then(data => data.json()).then(data => {
      console.log(data)
  }).catch(e => {
      console.log(e)
  });
};

const sendTrakigDinamicData = async () => {
  try {
    let storageValidDinamic = localStorage.getItem('DTRK');
    if(storageValidDinamic != null) {
        let dataSend = {
          varibaleLocalStorage: JSON.parse(storageValidDinamic),
          urlActual: window.location.href
        };
      
        let formData = new FormData();
        formData.append('referidos',  JSON.stringify(dataSend));
        formData.append('ecommerce', 'shopify');
        
        await fetch('https://ares.flamingo.com.co:8100/api/v1/marcacion/ecommerce', {
           method: 'POST',
           body: formData
        })
        await editCarrApFaming(JSON.stringify(storageValidDinamic))
    }
  } catch (error) {
   console.log('trakingError ->', error) 
  }
}



( () => {
  let paramsUrlDinamic = window.location.search;
  let storageValidDinamic = localStorage.getItem('DTRK');
  let arrayListDinamic = [];
  
  if(paramsUrlDinamic != ''){
    const urlParams = new URLSearchParams(paramsUrlDinamic);
    let objDinamic = {
      ir: urlParams.get('ir'),
      em: urlParams.get('em'),
      ak: urlParams.get('ak'),
      tm: urlParams.get('tm'),
    };
    

    let validObjeList = Object.values(objDinamic).filter(i => i != null);

    if( validObjeList.length >= 3 ){

      if(storageValidDinamic != null ){
        let newarrayListDinamic = [...JSON.parse(storageValidDinamic)];
        const searcFilh = newarrayListDinamic.find(i => i.ir === objDinamic.ir);
        if(!searcFilh){ 
          newarrayListDinamic.push(objDinamic);
        }
        localStorage.setItem('DTRK', JSON.stringify(newarrayListDinamic) ); 
      }else{
        arrayListDinamic.push(objDinamic);
        localStorage.setItem('DTRK', JSON.stringify(arrayListDinamic) );
      }

    }
    let deleteId = urlParams.get('iddel');

    if(deleteId != null && storageValidDinamic != null ) {
        let newarrayListDinamic = [...JSON.parse(storageValidDinamic)];
        let filterArrNew = newarrayListDinamic.filter( i => i.ir !=  deleteId);
        localStorage.setItem('DTRK', JSON.stringify(filterArrNew) );
        return
    } 
  }

  sendTrakigDinamicData();
} )()
