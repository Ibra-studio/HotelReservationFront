import jsPDF from "jspdf"
import { Reservation } from "@/types/Reservation"

export function generateFacturePdf(reservation: Reservation): void {
  const { facture } = reservation
  if (!facture) return

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 20

  // ── En-tête ──
  doc.setFontSize(22)
  doc.setFont("helvetica", "bold")
  doc.text("FACTURE", pageWidth / 2, y, { align: "center" })
  y += 10

  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")
  doc.text(`N° Facture : ${facture.id.slice(0, 8).toUpperCase()}`, pageWidth / 2, y, { align: "center" })
  y += 6
  doc.text(
    `Date d'émission : ${new Date(facture.dateEmission).toLocaleDateString("fr-FR")}`,
    pageWidth / 2, y, { align: "center" }
  )
  y += 15

  // ── Ligne de séparation ──
  doc.setDrawColor(200)
  doc.line(14, y, pageWidth - 14, y)
  y += 10

  // ── Infos réservation ──
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Détails de la réservation", 14, y)
  y += 8

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)

  const infos = [
    ["Réservation ID", reservation.id.slice(0, 8).toUpperCase()],
    ["Date d'arrivée", new Date(reservation.dateArrivee).toLocaleDateString("fr-FR")],
    ["Date de départ", new Date(reservation.dateDepart).toLocaleDateString("fr-FR")],
    ["Nombre de personnes", String(reservation.nombrePersonnes)],
  ]

  infos.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold")
    doc.text(`${label} :`, 14, y)
    doc.setFont("helvetica", "normal")
    doc.text(value, 80, y)
    y += 7
  })

  y += 5
  doc.line(14, y, pageWidth - 14, y)
  y += 10

  // ── Lignes de facture ──
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Lignes de facturation", 14, y)
  y += 8

  // En-têtes tableau
  doc.setFontSize(10)
  doc.setFillColor(240, 240, 240)
  doc.rect(14, y - 5, pageWidth - 28, 8, "F")
  doc.text("Description", 16, y)
  doc.text("Qté", 120, y)
  doc.text("Prix unitaire", 140, y)
  doc.text("Montant", 175, y)
  y += 8

  // Lignes
  doc.setFont("helvetica", "normal")
  facture.lignesFacture?.forEach((ligne) => {
    doc.text(ligne.description, 16, y)
    doc.text(String(ligne.quantite), 120, y)
    doc.text(`${ligne.prixUnitaire} MAD`, 140, y)
    doc.text(`${ligne.montant} MAD`, 175, y)
    y += 7
  })

  y += 5
  doc.line(14, y, pageWidth - 14, y)
  y += 10

  // ── Totaux ──
  doc.setFontSize(10)
  const totaux = [
    ["Montant nuitées", `${facture.montantNuitee} MAD`],
    ["Remise", `- ${facture.montantRemise} MAD`],
    ["Pénalité annulation", `${facture.montantPenalitee} MAD`],
    ["Services", `${facture.montantServices} MAD`],
  ]

  totaux.forEach(([label, value]) => {
    doc.setFont("helvetica", "normal")
    doc.text(label, 130, y)
    doc.text(value, 175, y)
    y += 7
  })

  y += 3
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text("TOTAL", 130, y)
  doc.text(`${facture.montantTotal} MAD`, 175, y)

  // ── Ouvre le PDF dans un nouvel onglet ──
  const pdfBlob = doc.output("blob")
  const url = URL.createObjectURL(pdfBlob)
  window.open(url, "_blank")
}