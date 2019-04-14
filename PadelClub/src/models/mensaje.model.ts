export interface MensajeService{
    key?: string;  //Manejara el id cuando se utiliza firebase
    origen: string;
    destinatario: string;
    contenido: string;

    
}