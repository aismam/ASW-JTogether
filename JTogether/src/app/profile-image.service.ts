import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  imageList = ['https://images.wallpaperscraft.com/image/astronaut_spacesuit_reflection_144426_1280x720.jpg',
    'https://images.wallpaperscraft.com/image/city_vector_panorama_119914_2560x1080.jpg',
    'https://images.wallpaperscraft.com/image/minimalism_origami_japan_rising_sun_wave_74405_2560x1080.jpg',
    'https://images.wallpaperscraft.com/image/parrot_vector_drawing_bright_color_95908_2560x1080.jpg',
    'https://images.wallpaperscraft.com/image/cat_art_tree_vector_118866_2048x1152.jpg',
    'https://images.wallpaperscraft.com/image/deer_minimalism_camera_record_audio_cassette_yo_yo_vector_retro_99248_1680x1050.jpg',
    'https://images.wallpaperscraft.com/image/cloud_unicorn_rainbow_139591_2560x1080.jpg',
    'https://images.wallpaperscraft.com/image/owl_art_minimalism_vector_97418_1920x1200.jpg',
    'https://images.wallpaperscraft.com/image/kittens_printer_much_happiness_85662_1680x1050.jpg'
  ];
  /* astronaut = 'https://images.wallpaperscraft.com/image/astronaut_spacesuit_reflection_144426_1280x720.jpg';
  cityNight = 'https://images.wallpaperscraft.com/image/city_vector_panorama_119914_2560x1080.jpg';
  japan = 'https://images.wallpaperscraft.com/image/minimalism_origami_japan_rising_sun_wave_74405_2560x1080.jpg';
  parrot = 'https://images.wallpaperscraft.com/image/parrot_vector_drawing_bright_color_95908_2560x1080.jpg';
  nightTree = 'https://images.wallpaperscraft.com/image/cat_art_tree_vector_118866_2048x1152.jpg';
  deer = 'https://images.wallpaperscraft.com/image/deer_minimalism_camera_record_audio_cassette_yo_yo_vector_retro_99248_1680x1050.jpg';
  rainbow = 'https://images.wallpaperscraft.com/image/cloud_unicorn_rainbow_139591_2560x1080.jpg';
  owl = 'https://images.wallpaperscraft.com/image/owl_art_minimalism_vector_97418_1920x1200.jpg';
  cats = 'https://images.wallpaperscraft.com/image/kittens_printer_much_happiness_85662_1680x1050.jpg'; */

  getRandomImage(): string {
    return this.imageList[Math.floor(Math.random() * 8) + 1];
  }
}

