import { IEntityDTO } from './IEntity.DTO';

export class PaisDTO implements IEntityDTO {

   nombre = '';
   nacionalidad = '';
   iso = '';
   id = 0;
   cacheStamp = 0;

   public PrepareDTO(jsonObj : any): void {
      if (jsonObj === null) { return; }
      if (jsonObj.nombre != null) { this.nombre = jsonObj.nombre; }
      if (jsonObj.nacionalidad != null) { this.nacionalidad = jsonObj.nacionalidad; }
      if (jsonObj.iso != null) { this.iso = jsonObj.iso; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
