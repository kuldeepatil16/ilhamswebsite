import { Resend } from "resend";
import type { ContactFormData, QuoteFormData, ServiceRequestFormData } from "@/types";

const FROM_EMAIL = "Vereen Electro Froid <onboarding@resend.dev>";
const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "vereenelectrofroid@gmail.com";

function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

async function sendEmail(subject: string, html: string) {
  const resend = getResendClient();
  if (!resend) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFICATION_EMAIL,
    subject,
    html,
  });
}

export async function sendContactNotification(data: ContactFormData) {
  await sendEmail(
    `[Vereen] Nouveau message de ${data.name}`,
    `
      <h2>Nouveau message de contact</h2>
      <table>
        <tr><td><strong>Nom:</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Téléphone:</strong></td><td>${data.phone}</td></tr>
        ${data.email ? `<tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>` : ""}
        ${data.service_type ? `<tr><td><strong>Service:</strong></td><td>${data.service_type}</td></tr>` : ""}
        ${data.message ? `<tr><td><strong>Message:</strong></td><td>${data.message}</td></tr>` : ""}
      </table>
    `
  );
}

export async function sendServiceRequestNotification(data: ServiceRequestFormData) {
  await sendEmail(
    `[Vereen] Nouvelle demande de service - ${data.service_type}`,
    `
      <h2>Nouvelle demande de service</h2>
      <table>
        <tr><td><strong>Nom:</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Téléphone:</strong></td><td>${data.phone}</td></tr>
        ${data.email ? `<tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>` : ""}
        <tr><td><strong>Service:</strong></td><td>${data.service_type}</td></tr>
        ${data.city ? `<tr><td><strong>Ville:</strong></td><td>${data.city}</td></tr>` : ""}
        ${data.appliance_brand ? `<tr><td><strong>Marque:</strong></td><td>${data.appliance_brand}</td></tr>` : ""}
        ${data.appliance_model ? `<tr><td><strong>Modèle:</strong></td><td>${data.appliance_model}</td></tr>` : ""}
        ${data.problem_description ? `<tr><td><strong>Problème:</strong></td><td>${data.problem_description}</td></tr>` : ""}
      </table>
    `
  );
}

export async function sendQuoteNotification(data: QuoteFormData) {
  const itemsHtml = data.items
    .map((item) => `<tr><td>${item.name}</td><td>${item.quantity}</td><td>${item.notes || ""}</td></tr>`)
    .join("");

  await sendEmail(
    `[Vereen] Nouvelle demande de devis de ${data.name}`,
    `
      <h2>Nouvelle demande de devis</h2>
      <table>
        <tr><td><strong>Nom:</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Téléphone:</strong></td><td>${data.phone}</td></tr>
        ${data.email ? `<tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>` : ""}
        ${data.company_name ? `<tr><td><strong>Entreprise:</strong></td><td>${data.company_name}</td></tr>` : ""}
      </table>
      <h3>Articles demandés</h3>
      <table border="1" cellpadding="8">
        <thead><tr><th>Article</th><th>Quantité</th><th>Notes</th></tr></thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ""}
    `
  );
}
