import { IEntityDTO } from './IEntity.DTO';
import { TipoCategoriaDocumento } from './tipoCategoriaDocumento.ENUM';


export class CategoriaInformacionDTO implements IEntityDTO {

   nombre = '';
   descripcion = '';
   visualizacion?: TipoCategoriaDocumento;
   id = 0;
   cacheStamp = 0;

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj === null) { return; }
      if (jsonObj.nombre != null) { this.nombre = jsonObj.nombre; }
      if (jsonObj.descripcion != null) { this.descripcion = jsonObj.descripcion; }
      if (jsonObj.visualizacion != null) { this.visualizacion = jsonObj.visualizacion as TipoCategoriaDocumento; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
