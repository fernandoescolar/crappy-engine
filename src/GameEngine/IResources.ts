import { INamedCollection } from './Utilities/INamedCollection';

export interface IResources {
    images: INamedCollection<HTMLImageElement>;
    audios: INamedCollection<HTMLAudioElement>;
    onlyOneAudio: boolean;

    loadImage(id: string, imageSource: string): void;
    loadAudio(id: string, audioSource: string): void;

    playAudio(id: string): void;
    playAudioLoop(id: string): void;
    stopAudioLoop(id: string): void;

    preload(onPreloaded: () => void): void;
}
