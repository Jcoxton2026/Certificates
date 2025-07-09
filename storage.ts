import { certificateTemplates, certificates, type CertificateTemplate, type InsertCertificateTemplate, type Certificate, type InsertCertificate } from "@shared/schema";

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
