import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Animal } from '../../models/animal.model';
import { Observable } from 'rxjs';
import { PigStatus } from '../../models/pig-status.model';

@Component({
  selector: 'app-animal-card',
  standalone: false,
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalCardComponent {
  @Input() animals!: Animal[];
  @Output() feedAnimal = new EventEmitter<number>();
  selectedId: number | null = null;
  pigStatusForselectedAnimal: PigStatus | undefined;

  private audioContext: AudioContext;
  private audioElement: HTMLAudioElement;

  constructor() {
    this.audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    this.audioElement = new Audio();
  }

  onButtonClick(id: number) {
    this.feedAnimal.emit(id);
  }

  toggleSelection(id: number, item:any): void {
    console.log(item.pigStatus)
    this.pigStatusForselectedAnimal = <PigStatus>{};
    this.stopMusic();
    if (this.selectedId === id) {
      this.selectedId = null;
      
    } else {
      this.selectedId = id;
      this.pigStatusForselectedAnimal = item.pigStatus;
    }
  }

  isSelected(id: number): boolean {
    return this.selectedId === id;
  }

  toggleImages() {
    this.stopMusic();
    let pigImage = document.getElementById('pigImage')!;
    let putinImage = document.getElementById('putinImage')!;

    if (pigImage.style.opacity !== '0') {
      pigImage.style.transform = 'scaleX(-1)';
      pigImage.style.opacity = '0';
      setTimeout(() => {
        pigImage.style.display = 'none';
        putinImage.style.display = 'block';
        putinImage.style.transform = 'scaleX(1)';
        putinImage.style.opacity = '1';
        this.playMusic('assets/audio/SovietAnthem.mp3');
      }, 2000);
    } else {
      putinImage.style.transform = 'scaleX(-1)';
      putinImage.style.opacity = '0';
      setTimeout(() => {
        putinImage.style.display = 'none';
        pigImage.style.display = 'block';
        pigImage.style.transform = 'scaleX(1)';
        pigImage.style.opacity = '1';
        this.playMusic('assets/audio/PigMusic.mp3');
      }, 2000);
    }
  }

  playMusic(audioElement: any) {
    this.audioElement = new Audio(audioElement);
    if (this.audioElement) {
      const source = this.audioContext.createMediaElementSource(
        this.audioElement,
      );
      source.connect(this.audioContext.destination);
      this.audioElement.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    } else {
      console.error('Audio element is not initialized.');
    }
  }

  stopMusic() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
  }
}
