export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cron_interval: {
        Row: {
          created_at: string | null
          id: number
          name: string
          time_count: number
          time_interval: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          time_count: number
          time_interval: number
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          time_count?: number
          time_interval?: number
        }
        Relationships: [
          {
            foreignKeyName: "cron_interval_time_interval_fkey"
            columns: ["time_interval"]
            referencedRelation: "time_interval"
            referencedColumns: ["id"]
          }
        ]
      }
      monitors: {
        Row: {
          created_at: string | null
          cron_interval_ir: number
          hostname: string
          id: number
          name: string
          status_code: number | null
        }
        Insert: {
          created_at?: string | null
          cron_interval_ir: number
          hostname: string
          id?: number
          name: string
          status_code?: number | null
        }
        Update: {
          created_at?: string | null
          cron_interval_ir?: number
          hostname?: string
          id?: number
          name?: string
          status_code?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "monitors_cron_interval_ir_fkey"
            columns: ["cron_interval_ir"]
            referencedRelation: "cron_interval"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitors_status_code_fkey"
            columns: ["status_code"]
            referencedRelation: "status"
            referencedColumns: ["code"]
          }
        ]
      }
      status: {
        Row: {
          code: number
          created_at: string
          id: number
          name: string
        }
        Insert: {
          code: number
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          code?: number
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      time_interval: {
        Row: {
          created_at: string | null
          enum: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          enum: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          enum?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
