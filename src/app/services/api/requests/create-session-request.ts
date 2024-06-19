/* tslint:disable:variable-name curly */

import { DeviceInfo } from '../models';
import { ModelProps } from '../types';

export interface CreateSessionRequest {
    device: ModelProps<DeviceInfo>;
}
