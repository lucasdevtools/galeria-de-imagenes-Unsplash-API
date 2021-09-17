class web {
  images = [];
  gallery = document.querySelector(".gallery");
  query = "random";
  Access_Key = "sUMVpPCw7c4MoV1vgg9knX4w4r0y5nrQ2uBOgl3PCW8";
  button = document.querySelector(".buscar"); 
  number_img = "10";

  constructor(){
    this.search_images();
    this.render_web();
  }

  async render_web(){
    await this.getImages();//Llama a getImages y espera la respuesta
  }

//Establece los parametros de busqueda para la fusión getImages()
  search_images(){
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      this.query = document.querySelector(".input_search").value;
      this.number_img = document.querySelector(".input_number").value;
      this.images =[]
    //Elimina las imagenes anteriores para una nueva busqueda
      if (this.gallery.hasChildNodes()){
        while (this.gallery.childNodes.length >= 1){
          this.gallery.removeChild(this.gallery.firstChild);
        }
      }
      this.render_web()
    })
  }

  //Hace la peticion a la API
  async getImages(){
    try {
      let response = await fetch(`https://api.unsplash.com/search/photos?query=${this.query}&per_page=${this.number_img}&client_id=${this.Access_Key}`);
      let jsonResponse = await response.json();//convierte a formato json
      if (jsonResponse.results.length >= 1) {//pregunta si hay imagenes en la respuesta
        let imagesList = await jsonResponse.results;
        this.prosess_img(imagesList)// llama a prosess_img() con la lista de imagenes
      } else {
        throw new Error("Sin Resultados")
      } 
    } catch (error) {this.gallery.innerHTML = `<div>${error.message}</div>`;}
  }

//procesa las imagenes y las guarda en el Array
  prosess_img(imagesList){
    imagesList.forEach(item => {
      let img = item.urls.small;
      this.images.push(img);
    });
    this.render_img()//llama  render_img()
  }

//Toma las imagenes del array y las coloca en el DOM
  render_img(){
    let fragment = document.createDocumentFragment();

    this.images.forEach(img => {
      let divimg = document.createElement("img");
      divimg.classList.add("img-responsive");
      divimg.src = img;
      fragment.appendChild(divimg);
    });

    this.gallery.appendChild(fragment);
  }
}
let Web = new web();