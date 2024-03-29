import { IEntityDTO } from './IEntity.DTO';
import { ProvinciaDTO } from './provincia.DTO';


export class LocalidadDTO implements IEntityDTO {

   nombre = '';
   codigoPostal = '';
   provincia: ProvinciaDTO;
   id = 0;
   cacheStamp = 0;

   constructor() {
      this.provincia = new ProvinciaDTO();
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj === null) { return; }
      if (jsonObj.nombre != null) { this.nombre = jsonObj.nombre; }
      if (jsonObj.codigoPostal != null) { this.codigoPostal = jsonObj.codigoPostal; }
      if (jsonObj.provincia != null) { this.provincia.PrepareDTO(jsonObj.provincia); }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
