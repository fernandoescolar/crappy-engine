import { IResources } from './IResources';
import { INamedCollection } from './Utilities/INamedCollection';
import { NamedCollection } from './Utilities/NamedCollection';

export class Resources implements IResources {
    public images: INamedCollection<HTMLImageElement>;
    public audios: INamedCollection<HTMLAudioElement>;
    public onlyOneAudio: boolean;

    private filesToLoad: number;
    private filesLoaded: number;
    private lastAudio!: HTMLAudioElement;

    constructor() {
        this.images = new NamedCollection<HTMLImageElement>();
        this.audios = new NamedCollection<HTMLAudioElement>();
        this.filesLoaded = 0;
        this.filesToLoad = 0;
        this.onlyOneAudio = false;
    }

    public loadImage(id: string, imageSource: string): void {
        this.filesToLoad++;

        const image: HTMLImageElement = <HTMLImageElement>document.createElement('img');
        const img: HTMLImageElement = new Image();
        img.onload = (ev: Event) => {
            image.width = img.width;
            image.height = img.height;
            (<any>image).innerImage = img;
            this.filesLoaded++;
        };
        image.src = imageSource;
        img.src = imageSource;

        this.images.add(id, image);
    }

    public loadAudio(id: string, audioSource: string): void {
        this.filesToLoad++;

        const audio: HTMLAudioElement = <HTMLAudioElement>document.createElement('audio');
        audio.preload = 'auto';
        audio.onload = (ev: Event) => { this.filesLoaded++; }; // it doesn't works!
        audio.addEventListener('canplaythrough', (ev: Event) => { this.filesLoaded++; }, false); // it works!!
        audio.src = audioSource;

        this.audios.add(id, audio);
    }

    public playAudio(id: string): void {
        try {
            if (this.onlyOneAudio && this.lastAudio) {
                try { this.lastAudio.pause(); } catch (ex) { console.log(ex); return; }
            }

            const audio: HTMLAudioElement = this.audios.get(id);
            audio.currentTime = 0;
            audio.play();

            if (this.onlyOneAudio) {
                this.lastAudio = audio;
            }
        } catch (ex) { console.log(ex); return; }
    }

    public playAudioLoop(id: string): void {
        try {
            const audio: HTMLAudioElement = this.audios.get(id);
            audio.loop = true;
            audio.currentTime = 0;
            audio.play();
        } catch (ex) { console.log(ex); return; }
    }

    public stopAudioLoop(id: string): void {
        try {
            const audio: HTMLAudioElement = this.audios.get(id);
            audio.loop = false;
            audio.pause();
        } catch (ex) { console.log(ex); return; }
    }

    public preload(onPreloaded: () => void): void {
        if (this.filesLoaded === this.filesToLoad) {
            onPreloaded();
        } else {
            setTimeout(() => { this.preload(onPreloaded); }, 200);
        }
    }
}
