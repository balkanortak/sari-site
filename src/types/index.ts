export type { Database, Json } from "./database";

export type ListingMetadata = {
  [key: string]: string | number | boolean | null | string[] | undefined;
};

export interface EmlakMetadata extends ListingMetadata {
  property_type: "daire" | "villa" | "mustakil" | "isyeri" | "arsa" | "proje";
  gross_area: number;
  net_area: number;
  room_count: string;
  building_age: number;
  floor: number;
  total_floors: number;
  heating_type: string;
  bathroom_count: number;
  balcony: boolean;
  credit_eligible: boolean;
  exchangeable: boolean;
  seller_type: "sahibinden" | "bankadan" | "insaat" | "emlakofisi";
  has_pool: boolean;
  has_security: boolean;
  has_parking: boolean;
}

export interface VasitaMetadata extends ListingMetadata {
  brand: string;
  model: string;
  series: string;
  year: number;
  fuel_type: "benzin" | "dizel" | "hibrit" | "elektrik";
  transmission: "manuel" | "otomatik";
  kilometer: number;
  engine_cc: number;
  engine_hp: number;
  traction: string;
  color: string;
  has_damage_record: boolean;
  damage_record_amount: number | null;
  painted_parts: string[];
  replaced_parts: string[];
}

export interface AlisverisMetadata extends ListingMetadata {
  product_condition: "sifir" | "ikinciel" | "yenilenmis";
  brand: string;
  weight_kg: number;
  cargo_available: boolean;
  secure_payment: boolean;
}
