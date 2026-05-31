import { IdReservation } from "./Reservation"

export type Client = {
    id:string
    nom:string
    prenom:string
    numPieceIdentite:string
    numeroTelephone:string
    email:string
    adresse:string
    estActif:boolean
    reservations: IdReservation[]
}
