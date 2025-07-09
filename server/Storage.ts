import { certificateTemplates, certificates, type CertificateTemplate, type InsertCertificateTemplate, type Certificate, type InsertCertificate } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  getCertificateTemplates(): Promise<CertificateTemplate[]>;
  getCertificateTemplate(id: number): Promise<CertificateTemplate | undefined>;
  createCertificateTemplate(template: InsertCertificateTemplate): Promise<CertificateTemplate>;
  
  getCertificates(): Promise<Certificate[]>;
  getCertificate(id: number): Promise<Certificate | undefined>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  updateCertificate(id: number, certificate: Partial<InsertCertificate>): Promise<Certificate>;
  deleteCertificate(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<any | undefined> {
    // User functionality not implemented yet
    return undefined;
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    // User functionality not implemented yet
    return undefined;
  }

  async createUser(insertUser: any): Promise<any> {
    // User functionality not implemented yet
    throw new Error("User functionality not implemented");
  }

  async getCertificateTemplates(): Promise<CertificateTemplate[]> {
    const templates = await db.select().from(certificateTemplates);
    return templates;
  }

  async getCertificateTemplate(id: number): Promise<CertificateTemplate | undefined> {
    const [template] = await db.select().from(certificateTemplates).where(eq(certificateTemplates.id, id));
    return template || undefined;
  }

  async createCertificateTemplate(template: InsertCertificateTemplate): Promise<CertificateTemplate> {
    const [newTemplate] = await db
      .insert(certificateTemplates)
      .values(template)
      .returning();
    return newTemplate;
  }

  async getCertificates(): Promise<Certificate[]> {
    const certs = await db.select().from(certificates);
    return certs;
  }

  async getCertificate(id: number): Promise<Certificate | undefined> {
    const [certificate] = await db.select().from(certificates).where(eq(certificates.id, id));
    return certificate || undefined;
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const [newCertificate] = await db
      .insert(certificates)
      .values(certificate)
      .returning();
    return newCertificate;
  }

  async updateCertificate(id: number, updates: Partial<InsertCertificate>): Promise<Certificate> {
    const [updated] = await db
      .update(certificates)
      .set(updates)
      .where(eq(certificates.id, id))
      .returning();
    
    if (!updated) {
      throw new Error(`Certificate with id ${id} not found`);
    }
    
    return updated;
  }

  async deleteCertificate(id: number): Promise<void> {
    await db.delete(certificates).where(eq(certificates.id, id));
  }
}

export const storage = new DatabaseStorage();
