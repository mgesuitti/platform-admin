import { IEntityDTO } from './IEntity.DTO';
import { PaisDTO } from './pais.DTO';


export class ProvinciaDTO implements IEntityDTO {

   nombre = '';
   pais: PaisDTO;
   id = 0;
   cacheStamp = 0;

   constructor() {
      this.pais = new PaisDTO();
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj === null) { return; }
      if (jsonObj.nombre != null) { this.nombre = jsonObj.nombre; }
      if (jsonObj.pais != null) { this.pais.PrepareDTO(jsonObj.pais); }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
