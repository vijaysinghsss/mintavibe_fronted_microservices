import { Link, NavLink, useNavigate } from "react-router-dom";

export const HomeSlider = [
    {
      
      image :'/images/nft-img.jpg',
      text: "Curated NFTs"  ,
      id: "curatedSection"

    },
    {  
        image: '/images/sunflower.jpeg',       
        text: "Trending NFTs",
        id: "trendingSection"
    },
    {
        image: '/images/Biopic.png',
        text: "By BIPOC Creators",
        id: "bipocSection"
    },
    {
        image: '/images/Female.png',
        text: "By Female Creators",
        id: "femaleSection"
    },
    {
        image: '/images/LGBTQ.png',
        text: "By LGBTQ+ Creators",
        id: "lgbtSection"
    }

];




// $(document).on('ready', function () {
//     onClick={()=> window.open("top", "_blank")}
//     $(".top").on('click', function (e) {
//       e.preventDefault();
//       var target = $(this).attr('to');
//       $('html, body').animate({
//         scrollTop: (550)
//       }, 0);
//     });
// }