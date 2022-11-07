import React from 'react'
import img1 from '../../Helpers/img/recital.png';
import img2 from '../../Helpers/img/poesia.png';
import img3 from '../../Helpers/img/poe.png';
import NavBar from '../NavBar/NavBar';

const Home = () => {
  return (
    <div>
        <NavBar />
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" data-interva='10000'>
    <div class="carousel-item active">
      <img src={img3} class="d-block w-100" />
    </div>
    <div class="carousel-item">
      <img src={img2}/>
    </div>
    <div class="carousel-item">
      <img src={img1} class="d-block w-100" />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default Home