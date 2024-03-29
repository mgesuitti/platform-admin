import { IEntityDTO } from './IEntity.DTO';
import { PaisDTO } from './pais.DTO';

export class AdminCompanyDTO implements IEntityDTO {

   pais: PaisDTO;
   name = '';
   telefono = '';
   artPoliza = '';
   artNombre = '';
   artPrivado = '';
   artPublico = '';
   razonSocial = '';
   identificadorFiscal = '';
   sucursal = 0;
   image = '';
   tenant = '';
   id = 0;
   cacheStamp = 0;

   constructor() {
      this.pais = new PaisDTO();
   }

   public PrepareDTO(jsonObj : any): void {
      if (jsonObj === null) { return; }
      if (jsonObj.pais != null) { this.pais.PrepareDTO(jsonObj.pais); }
      if (jsonObj.name != null) { this.name = jsonObj.name; }
      if (jsonObj.telefono != null) { this.telefono = jsonObj.telefono; }
      if (jsonObj.artPoliza != null) { this.artPoliza = jsonObj.artPoliza; }
      if (jsonObj.artNombre != null) { this.artNombre = jsonObj.artNombre; }
      if (jsonObj.artPrivado != null) { this.artPrivado = jsonObj.artPrivado; }
      if (jsonObj.artPublico != null) { this.artPublico = jsonObj.artPublico; }
      if (jsonObj.razonSocial != null) { this.razonSocial = jsonObj.razonSocial; }
      if (jsonObj.identificadorFiscal != null) { this.identificadorFiscal = jsonObj.identificadorFiscal; }
      if (jsonObj.tenant != null) { this.tenant = jsonObj.tenant; }
      if (jsonObj.sucursal != null) { this.sucursal = jsonObj.sucursal; }
      if (jsonObj.image != null) { this.image = jsonObj.image; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
