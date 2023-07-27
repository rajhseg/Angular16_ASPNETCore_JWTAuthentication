import { InjectionToken } from "@angular/core";

const ENV_SERVER_URL: InjectionToken<string> = new InjectionToken<string>('ServerUrl');

export { ENV_SERVER_URL };
