export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          account_type: "bireysel" | "kurumsal";
          full_name: string;
          phone: string | null;
          phone_visible: boolean;
          email_visible: boolean;
          avatar_url: string | null;
          tc_kimlik: string | null;
          vergi_no: string | null;
          address: string | null;
          city: string | null;
          district: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          account_type: "bireysel" | "kurumsal";
          full_name: string;
          phone?: string | null;
          phone_visible?: boolean;
          email_visible?: boolean;
          avatar_url?: string | null;
          tc_kimlik?: string | null;
          vergi_no?: string | null;
          address?: string | null;
          city?: string | null;
          district?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          account_type?: "bireysel" | "kurumsal";
          full_name?: string;
          phone?: string | null;
          phone_visible?: boolean;
          email_visible?: boolean;
          avatar_url?: string | null;
          tc_kimlik?: string | null;
          vergi_no?: string | null;
          address?: string | null;
          city?: string | null;
          district?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      stores: {
        Row: {
          id: string;
          profile_id: string;
          store_name: string;
          description: string | null;
          logo_url: string | null;
          working_hours: string | null;
          license_number: string | null;
          latitude: number | null;
          longitude: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          store_name: string;
          description?: string | null;
          logo_url?: string | null;
          working_hours?: string | null;
          license_number?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          store_name?: string;
          description?: string | null;
          logo_url?: string | null;
          working_hours?: string | null;
          license_number?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          parent_id: string | null;
          metadata_schema: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          parent_id?: string | null;
          metadata_schema?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          parent_id?: string | null;
          metadata_schema?: Json;
          created_at?: string;
        };
      };
      listings: {
        Row: {
          id: string;
          user_id: string;
          category_id: string;
          title: string;
          description: string;
          price: number;
          currency: "TL" | "EUR" | "USD";
          city: string;
          district: string;
          neighborhood: string | null;
          latitude: number | null;
          longitude: number | null;
          status: "active" | "passive" | "pending" | "sold";
          views: number;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id: string;
          title: string;
          description: string;
          price: number;
          currency?: "TL" | "EUR" | "USD";
          city: string;
          district: string;
          neighborhood?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          status?: "active" | "passive" | "pending" | "sold";
          views?: number;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string;
          title?: string;
          description?: string;
          price?: number;
          currency?: "TL" | "EUR" | "USD";
          city?: string;
          district?: string;
          neighborhood?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          status?: "active" | "passive" | "pending" | "sold";
          views?: number;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      listing_images: {
        Row: {
          id: string;
          listing_id: string;
          url: string;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          url: string;
          order: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          url?: string;
          order?: number;
          created_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          listing_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          listing_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          listing_id?: string;
          created_at?: string;
        };
      };
      doping_types: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          price: number;
          duration_days: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          price: number;
          duration_days: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          price?: number;
          duration_days?: number;
          created_at?: string;
        };
      };
      listing_dopings: {
        Row: {
          id: string;
          listing_id: string;
          doping_type_id: string;
          start_date: string;
          end_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          doping_type_id: string;
          start_date: string;
          end_date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          doping_type_id?: string;
          start_date?: string;
          end_date?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      account_type: "bireysel" | "kurumsal";
      listing_status: "active" | "passive" | "pending" | "sold";
      currency: "TL" | "EUR" | "USD";
    };
  };
}
