import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.component.html', 
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies = [
    {
      id: 1,
      title: '1+1 (2011)',
      description: 'After suffering an accident, wealthy aristocrat Philippe hires the man least suited for the job as his assistant: a young suburbanite named Driss, recently released from prison. Despite Philippe being confined to a wheelchair, Driss manages to bring a spirit of adventure into the aristocrats quiet life.',
      imageUrl: 'assets/1.webp',
      genre: { id: 1, name: 'Drama' },
      likes: 0
    },
    {
      id: 2,
      title: 'Interstellar (2014)',
      description: 'When drought, dust storms, and plant extinction leave humanity with a food crisis, a team of explorers and scientists travel through a wormhole (which supposedly connects regions of space-time across vast distances) on a journey to surpass previous limitations of human space travel and find a planet with suitable conditions for humanity.',
      imageUrl: 'assets/2.webp',
      genre: { id: 4, name: 'Fantasy' },
      likes: 0
    },
    {
      id: 3,
      title: 'The Shawshank Redemption (1994)',
      description: 'Accountant Andy Dufresne is accused of murdering his wife and her lover. Finding himself in a prison called Shawshank, he encounters the cruelty and lawlessness that reign on both sides of the bars. Anyone who gets into these walls becomes their slave for the rest of their lives. But Andy, with his quick mind and kind soul, finds an approach to both prisoners and guards, winning their special favor.',
      imageUrl: 'assets/3.webp',
      genre: { id: 3, name: 'Drama' },
      likes: 0
    },
    {
      id: 4,
      title: 'The Gentlemen (2019)',
      description: 'A savvy American has been dealing drugs since his student days, and now he has come up with a scheme for illegal enrichment using the estates of the impoverished English aristocracy, and has made a pretty penny from it. Another nosy journalist comes to Ray, the Americans right-hand man, and offers him a screenplay that details the crimes of his boss, with the participation of other representatives of the London criminal world - a Jewish partner, the Chinese diaspora, black athletes, and even a Russian oligarch.',
      imageUrl: 'assets/4.webp',
      genre: { id: 5, name: 'Crime' },
      likes: 0
    },
    {
      id: 5,
      title: 'Shitter Islind (2009)',
      description: 'Two American marshals are sent to an island in Massachusetts to investigate the disappearance of a patient at a hospital for the criminally insane. During their investigation, they must face a web of lies, a hurricane, and a deadly riot by the hospitals residents.',
      imageUrl: 'assets/5.webp',
      genre: { id: 1, name: 'Thriller' },
      likes: 0
    },
    {
      id: 6,
      title: 'The Green Mile (1999)',
      description: 'Paul Edgecomb is the warden of Death Row at Cold Mountain State Penitentiary, where every inmate must walk the "green mile" on their way to their execution. Paul has seen a lot of prisoners and guards during his time on the job. However, the giant John Coffey, accused of a terrible crime, is one of the most unusual residents of the block.',
      imageUrl: 'assets/6.webp',
      genre: { id: 3, name: 'Drama' },
      likes: 0
    },
    {
      id: 7,
      title: 'The Lord of the Rings: The Return of the King (2003)',
      description: 'Sauron, the lord of the forces of darkness, sends his countless army to the walls of Minas Tirith, the fortress of the Last Hope. He anticipates the imminent victory, but this is precisely what prevents him from noticing two tiny figures - hobbits approaching Mount Doom, where they will destroy the Ring of Power.',
      imageUrl: 'assets/7.webp',
      genre: { id: 4, name: 'Fantasy' },
      likes: 0
    },
    {
      id: 8,
      title: 'Forrest Gump (1994)',
      description: 'Sitting at a bus stop, Forrest Gump, a not very smart but kind and open guy, tells random people the story of his extraordinary life. From an early age, the boy suffered from a leg disease, the neighborhood boys teased him, but one day Forrest discovered incredible running abilities. Childhood friend Jenny always supported and protected him, but soon their paths diverged.',
      imageUrl: 'assets/8.webp',
      genre: { id: 3, name: 'Drama' },
      likes: 0
    },
    {
      id: 9,
      title: 'Fight Club (1999)',
      description: 'An insurance company employee suffers from chronic insomnia and is desperate to escape his excruciatingly boring life. One day, on a business trip, he meets a certain Tyler Durden, a charismatic soap salesman with a twisted philosophy. Tyler is sure that self-improvement is for the weak, and the only thing worth living for is self-destruction. A little time passes, and now new friends are beating each other up in the parking lot of a bar, and the cathartic fistfight gives them the highest bliss. Introducing other men to the simple joys of physical cruelty, they found a secret Fight Club, which begins to enjoy incredible popularity.',
      imageUrl: 'assets/9.webp',
      genre: { id: 1, name: 'Thriller' },
      likes: 0
    },
    {
      id: 10,
      title: 'Sen to Chihiro no kamikakushi (2001)',
      description: 'Chihiro moves to a new house with her mom and dad. Having lost their way, they find themselves in a strange deserted city, where a magnificent feast awaits them. The parents greedily pounce on the food and, to the horror of the girl, they turn into pigs, becoming prisoners of the evil sorceress Yubaba. Now, alone among magical creatures and mysterious visions, Chihiro must figure out how to free her parents from the spell of the wicked old woman.',
      imageUrl: 'assets/10.webp',
      genre: { id: 2, name: 'Anime' },
      likes: 0
    },
    
  ];

  genres = [
    { id: 1, name: 'Thriller' },
    { id: 2, name: 'Anime' },
    { id: 3, name: 'Drama' },
    { id: 4, name: 'Fantasy' },
    { id: 5, name: 'Crime' }
  ];

  selectedGenre = '';
  filteredMovies = [...this.movies]; 

  likeMovie(movie: any) {
    movie.likes++;
  }

  filterMovies() {
    if (this.selectedGenre === '') {
      this.filteredMovies = [...this.movies]; 
    } else {
      this.filteredMovies = this.movies.filter(
        movie => movie.genre.name === this.selectedGenre
      );
    }
  }

  constructor(private http: HttpClient) {} 

  saveMovieToBackend(movie: any): Promise<any> {
    const token = localStorage.getItem('authToken');
    return this.http.post('http://localhost:8000/api/movies/', {
      title: movie.title,
      description: movie.description,
      image_url: movie.imageUrl,
      genre_id: movie.genre.id,
      likes: movie.likes
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).toPromise();
  }
  
  async addToFavorites(movie: any) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Нет токена');
      return;
    }
  
    try {
      const savedMovie = await this.saveMovieToBackend(movie);
  
      await this.http.post('http://localhost:8000/api/favourites/', {
        movie_id: savedMovie.id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).toPromise();
  
      console.log('Movie added to favorites');
      alert('The film has been added to your favorites!');
    } catch (error) {
      console.error('Error adding to favorites', error);
      alert('Error adding to favorites');
    }
  }
}