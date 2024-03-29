import { IEntityDTO} from './IEntity.DTO';

export class FilesStaticAdminCompanyDTO implements IEntityDTO {

   totalBytesSize = 0;
   totalFiles = 0;
   companyName = '';
   tenant = '';
   id = 0;
   cacheStamp = 0;

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj === null) { return; }
      if (jsonObj.totalBytesSize != null) { this.totalBytesSize = jsonObj.totalBytesSize; }
      if (jsonObj.totalFiles != null) { this.totalFiles = jsonObj.totalFiles; }
      if (jsonObj.companyName != null) { this.companyName = jsonObj.companyName; }
      if (jsonObj.tenant != null) { this.tenant = jsonObj.tenant; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
