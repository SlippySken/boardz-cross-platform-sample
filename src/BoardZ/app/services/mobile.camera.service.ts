import {Observable} from 'rxjs/Observable';
import {ICameraService} from './camera.service';

export class MobileCameraService implements ICameraService {
    public getPhoto(): Observable<string> {
        // TODO: Code me
        return Observable.of('Code me!');
    }
}
