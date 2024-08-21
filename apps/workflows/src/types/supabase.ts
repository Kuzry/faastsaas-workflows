export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      credentials: {
        Row: {
          app: string;
          created_at: string;
          data: string | null;
          id: string;
          name: string;
          status: Json;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          app: string;
          created_at?: string;
          data?: string | null;
          id?: string;
          name: string;
          status: Json;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          app?: string;
          created_at?: string;
          data?: string | null;
          id?: string;
          name?: string;
          status?: Json;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "credentials_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      plan_rules: {
        Row: {
          id: number;
          name: string;
          name_id: string;
          plan_id: number;
          value: string;
        };
        Insert: {
          id?: number;
          name: string;
          name_id: string;
          plan_id: number;
          value: string;
        };
        Update: {
          id?: number;
          name?: string;
          name_id?: string;
          plan_id?: number;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: "plan_rules_plan_id_fkey";
            columns: ["plan_id"];
            isOneToOne: false;
            referencedRelation: "plans";
            referencedColumns: ["id"];
          },
        ];
      };
      plans: {
        Row: {
          id: number;
          price: string;
          product_id: number | null;
          product_name: string | null;
          sort: number;
          variant_id: number | null;
          variant_name: string | null;
        };
        Insert: {
          id?: number;
          price: string;
          product_id?: number | null;
          product_name?: string | null;
          sort: number;
          variant_id?: number | null;
          variant_name?: string | null;
        };
        Update: {
          id?: number;
          price?: string;
          product_id?: number | null;
          product_name?: string | null;
          sort?: number;
          variant_id?: number | null;
          variant_name?: string | null;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          customer_email: string;
          customer_id: string;
          customer_name: string;
          ends_at: string | null;
          external_id: string;
          id: number;
          is_paused: boolean | null;
          is_usage_based: boolean | null;
          item_id: string;
          order_id: string;
          plan_id: number;
          price: string;
          renews_at: string;
          status: string;
          trial_ends_at: string | null;
          user_id: string;
        };
        Insert: {
          customer_email: string;
          customer_id: string;
          customer_name: string;
          ends_at?: string | null;
          external_id: string;
          id?: number;
          is_paused?: boolean | null;
          is_usage_based?: boolean | null;
          item_id: string;
          order_id: string;
          plan_id: number;
          price: string;
          renews_at: string;
          status: string;
          trial_ends_at?: string | null;
          user_id: string;
        };
        Update: {
          customer_email?: string;
          customer_id?: string;
          customer_name?: string;
          ends_at?: string | null;
          external_id?: string;
          id?: number;
          is_paused?: boolean | null;
          is_usage_based?: boolean | null;
          item_id?: string;
          order_id?: string;
          plan_id?: number;
          price?: string;
          renews_at?: string;
          status?: string;
          trial_ends_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey";
            columns: ["plan_id"];
            isOneToOne: false;
            referencedRelation: "plans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          consent: boolean | null;
          email: string;
          name: string | null;
          user_id: string;
        };
        Insert: {
          consent?: boolean | null;
          email: string;
          name?: string | null;
          user_id: string;
        };
        Update: {
          consent?: boolean | null;
          email?: string;
          name?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      webhooks_lemon_squeezy: {
        Row: {
          body: Json;
          created_at: string;
          error: string | null;
          event_name: string;
          id: number;
          processed: boolean;
        };
        Insert: {
          body: Json;
          created_at?: string;
          error?: string | null;
          event_name: string;
          id?: number;
          processed?: boolean;
        };
        Update: {
          body?: Json;
          created_at?: string;
          error?: string | null;
          event_name?: string;
          id?: number;
          processed?: boolean;
        };
        Relationships: [];
      };
      workflows: {
        Row: {
          created_at: string;
          data: Json;
          id: string;
          name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          data: Json;
          id?: string;
          name: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          data?: Json;
          id?: string;
          name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workflows_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
