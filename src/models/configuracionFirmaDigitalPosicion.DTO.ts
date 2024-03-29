import { IEntityDTO } from "./IEntity.DTO";

export class ConfiguracionFirmaDigitalPosicionDTO implements IEntityDTO {

   nombre = '';
   incluirFoto?: boolean;
   hojaAparte?: boolean;
   posicionX = 0;
   posicionY = 0;
   escala = 0;
   id = 0;
   cacheStamp = 0;

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj === null) { return; }
      if (jsonObj.nombre != null) { this.nombre = jsonObj.nombre; }
      if (jsonObj.incluirFoto != null) { this.incluirFoto = jsonObj.incluirFoto; }
      if (jsonObj.hojaAparte != null) { this.hojaAparte = jsonObj.hojaAparte; }
      if (jsonObj.posicionX != null) { this.posicionX = jsonObj.posicionX; }
      if (jsonObj.posicionY != null) { this.posicionY = jsonObj.posicionY; }
      if (jsonObj.escala != null) { this.escala = jsonObj.escala; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
