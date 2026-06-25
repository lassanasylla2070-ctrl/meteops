import { AppModule } from '../../src/app.module';

const getCurrentModules = () => {
  return Reflect.getOwnMetadata('imports', AppModule);
};

export const initAppModule = (dynamicModules: any[]) => {
  Reflect.defineMetadata('imports', [...getCurrentModules(), ...dynamicModules], AppModule);

  return AppModule;
};
