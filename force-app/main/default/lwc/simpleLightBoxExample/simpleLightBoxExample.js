import { LightningElement } from 'lwc';
import SL from '@salesforce/resourceUrl/simpleLightbox';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';

export default class SimpleLightBoxExample extends LightningElement {

    slLoaded = false;
    // We can modify DOM only in renderedCallback, after UI is rendered
    renderedCallback() {
        if (!this.slLoaded) {
            Promise.all([
                loadStyle(this, SL+'/simpleLightbox-master/dist/simpleLightbox.css'),
                loadScript(this, SL+'/simpleLightbox-master/dist/simpleLightbox.js'),
            ])
            .then(() => {
                this.slLoaded = true;
            })
            .catch(error => {
                console.log('Could not initialize libraries from static resource simpleLightbox: ', error);
            });
        }
    }

    openGalleryHandler() {
        SimpleLightbox.open({
            items: ['/resource/Cats/1.jpg', '/resource/Cats/2.jpg', '/resource/Cats/3.jpg']
        });
    }
}