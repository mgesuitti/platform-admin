import { IEntityDTO } from './IEntity.DTO';

export class AddresseesDTO implements IEntityDTO {

   todaLaNomina = false;
   personalLegajos: number[];
   areas: number[];
   sectores: number[];
   id = 0;
   cacheStamp = 0;
   roles: number[];

   constructor() {
      this.personalLegajos = [];
      this.areas = [];
      this.sectores = [];
      this.roles = [];
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj === null) { return; }
      if (jsonObj.todaLaNomina != null) { this.todaLaNomina = jsonObj.todaLaNomina; }
      if (jsonObj.personalLegajos != null) { this.personalLegajos = jsonObj.personalLegajos; }
      if (jsonObj.areas != null) { this.areas = jsonObj.areas; }
      if (jsonObj.sectores != null) { this.sectores = jsonObj.sectores; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.roles != null) { this.roles = jsonObj.roles; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
