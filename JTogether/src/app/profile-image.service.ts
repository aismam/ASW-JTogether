import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  // https://it.freepik.com/
  // https://wallpaperscraft.com/

  /*imageList = ['',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];*/

  // rand
  /*imageList = ['https://images.wallpaperscraft.com/image/astronaut_spacesuit_reflection_144426_1280x720.jpg',
    'https://images.wallpaperscraft.com/image/city_vector_panorama_119914_2560x1080.jpg',
    'https://images.wallpaperscraft.com/image/minimalism_origami_japan_rising_sun_wave_74405_2560x1080.jpg',
    'https://images.wallpaperscraft.com/image/parrot_vector_drawing_bright_color_95908_2560x1080.jpg',
    'https://images.wallpaperscraft.com/image/cat_art_tree_vector_118866_2048x1152.jpg',
    'https://images.wallpaperscraft.com/image/deer_minimalism_camera_record_audio_cassette_yo_yo_vector_retro_99248_1680x1050.jpg',
    'https://images.wallpaperscraft.com/image/cloud_unicorn_rainbow_139591_2560x1080.jpg',
    'https://images.wallpaperscraft.com/image/owl_art_minimalism_vector_97418_1920x1200.jpg',
    'https://images.wallpaperscraft.com/image/kittens_printer_much_happiness_85662_1680x1050.jpg'
  ];*/

  // fiori
  /*imageList = ['https://image.freepik.com/free-vector/flat-simple-geometric-elements_52683-56064.jpg',
    'https://image.freepik.com/free-vector/geometric-mural-wallpaper_52683-48279.jpg',
    'https://image.freepik.com/free-vector/flat-simple-geometric-elements_52683-56063.jpg',
    'https://image.freepik.com/free-vector/geometric-groovy-pattern_52683-55782.jpg',
    'https://image.freepik.com/free-vector/geometric-groovy-pattern_23-2148858302.jpg',
    'https://image.freepik.com/free-vector/geometric-circular-groovy-seamless-pattern_23-2148825766.jpg',
    'https://img.freepik.com/premium-vector/memphis-seamless-pattern-consisting-color-shapes-dark_111651-204.jpg?size=338&ext=jpg',
    'https://image.freepik.com/free-vector/vintage-lines-geometric-groovy-seamless-pattern_23-2148837554.jpg',
    'https://image.freepik.com/free-vector/hand-drawn-groovy-floral-pattern_23-2148836900.jpg',
  ];*/

  // prof pic
  imageList = ['https://image.flaticon.com/icons/png/512/1018/1018961.png',
    'https://image.flaticon.com/icons/png/512/1018/1018973.png',
    'https://image.flaticon.com/icons/png/512/1176/1176205.png',
    'https://image.flaticon.com/icons/png/512/1176/1176206.png',
    'https://image.flaticon.com/icons/png/512/1176/1176207.png',
    'https://image.flaticon.com/icons/png/512/1176/1176208.png',
    'https://image.flaticon.com/icons/png/512/1018/1018979.png',
    'https://image.flaticon.com/icons/png/512/1018/1018980.png',
    'https://image.flaticon.com/icons/png/512/1019/1019128.png',
  ];

  getRandomImage(): string {
    return this.imageList[Math.floor(Math.random() * 8) + 1];
  }
}

