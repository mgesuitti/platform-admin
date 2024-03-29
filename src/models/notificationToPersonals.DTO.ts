import { IEntityDTO } from './IEntity.DTO';
import { AddresseesDTO } from './addressees.DTO';
import { CategoriaInformacionDTO } from './categoriaInformacion.DTO';
import { ConfiguracionFirmaDigitalPosicionDTO } from './configuracionFirmaDigitalPosicion.DTO';
import { NotificationPriority } from './notificationPriority.ENUM';
import { NotificationState } from './notificationState.ENUM';


export class NotificationToPersonalsDTO implements IEntityDTO {

   destinatarios: AddresseesDTO;
   carpeta: CategoriaInformacionDTO;
   solicitarFirma?: boolean;
   firmarAhora?: boolean;
   notificarFirma?: boolean;
   posicionFirmaColaborador: ConfiguracionFirmaDigitalPosicionDTO;
   posicionFirmaEmpresa: ConfiguracionFirmaDigitalPosicionDTO;
   userName = '';
   priority?: NotificationPriority;
   notificationType = 0;
   state?: NotificationState;
   creationDateTime?: Date;
   openDateTime?: Date;
   readDateTime?: Date;
   disableUnderstanding?: boolean;
   understoodDateTime?: Date;
   notUnderstood?: boolean;
   title = '';
   notShowInMenu?: boolean;
   details = '';
   serviceNotify = '';
   service = '';
   serviceId = 0;
   serviceId2 = 0;
   id = 0;
   cacheStamp = 0;

   constructor() {
      this.destinatarios = new AddresseesDTO();
      this.carpeta = new CategoriaInformacionDTO();
      this.posicionFirmaColaborador = new ConfiguracionFirmaDigitalPosicionDTO();
      this.posicionFirmaEmpresa = new ConfiguracionFirmaDigitalPosicionDTO();
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj === null) { return; }
      if (jsonObj.destinatarios != null) { this.destinatarios.PrepareDTO(jsonObj.destinatarios); }
      if (jsonObj.carpeta != null) { this.carpeta.PrepareDTO(jsonObj.carpeta); }
      if (jsonObj.solicitarFirma != null) { this.solicitarFirma = jsonObj.solicitarFirma; }
      if (jsonObj.firmarAhora != null) { this.firmarAhora = jsonObj.firmarAhora; }
      if (jsonObj.notificarFirma != null) { this.notificarFirma = jsonObj.notificarFirma; }
      if (jsonObj.posicionFirmaColaborador != null) { this.posicionFirmaColaborador.PrepareDTO(jsonObj.posicionFirmaColaborador); }
      if (jsonObj.posicionFirmaEmpresa != null) { this.posicionFirmaEmpresa.PrepareDTO(jsonObj.posicionFirmaEmpresa); }
      if (jsonObj.userName != null) { this.userName = jsonObj.userName; }
      if (jsonObj.priority != null) { this.priority = jsonObj.priority as NotificationPriority; }
      if (jsonObj.notificationType != null) { this.notificationType = jsonObj.notificationType; }
      if (jsonObj.state != null) { this.state = jsonObj.state as NotificationState; }
      if (jsonObj.creationDateTime != null) { this.creationDateTime = new Date(jsonObj.creationDateTime); }
      if (jsonObj.openDateTime != null) { this.openDateTime = new Date(jsonObj.openDateTime); }
      if (jsonObj.readDateTime != null) { this.readDateTime = new Date(jsonObj.readDateTime); }
      if (jsonObj.disableUnderstanding != null) { this.disableUnderstanding = jsonObj.disableUnderstanding; }
      if (jsonObj.understoodDateTime != null) { this.understoodDateTime = new Date(jsonObj.understoodDateTime); }
      if (jsonObj.notUnderstood != null) { this.notUnderstood = jsonObj.notUnderstood; }
      if (jsonObj.title != null) { this.title = jsonObj.title; }
      if (jsonObj.notShowInMenu != null) { this.notShowInMenu = jsonObj.notShowInMenu; }
      if (jsonObj.details != null) { this.details = jsonObj.details; }
      if (jsonObj.serviceNotify != null) { this.serviceNotify = jsonObj.serviceNotify; }
      if (jsonObj.service != null) { this.service = jsonObj.service; }
      if (jsonObj.serviceId != null) { this.serviceId = jsonObj.serviceId; }
      if (jsonObj.serviceId2 != null) { this.serviceId2 = jsonObj.serviceId2; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
