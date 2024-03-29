import { IEntityDTO} from './IEntity.DTO';

export class UsersStaticAdminCompanyDTO implements IEntityDTO {

   totalTeammates = 0;
   tenant = '';
   companyName = '';
   id = 0;
   cacheStamp = 0;

   public PrepareDTO(jsonObj : any): void {
      if (jsonObj === null) { return; }
      if (jsonObj.totalTeammates != null) { this.totalTeammates = jsonObj.totalTeammates; }
      if (jsonObj.tenant != null) { this.tenant = jsonObj.tenant; }
      if (jsonObj.companyName != null) { this.companyName = jsonObj.companyName; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
