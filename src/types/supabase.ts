export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
        };
        Relationships: [];
      };
      articles: {
        Row: {
          category: string;
          created_at: string | null;
          date: string | null;
          excerpt: string | null;
          featured: boolean;
          id: number;
          image: string | null;
          read_time: string | null;
          sort_order: number;
          title: string;
        };
        Insert: {
          category?: string;
          created_at?: string | null;
          date?: string | null;
          excerpt?: string | null;
          featured?: boolean;
          id?: number;
          image?: string | null;
          read_time?: string | null;
          sort_order?: number;
          title: string;
        };
        Update: {
          category?: string;
          created_at?: string | null;
          date?: string | null;
          excerpt?: string | null;
          featured?: boolean;
          id?: number;
          image?: string | null;
          read_time?: string | null;
          sort_order?: number;
          title?: string;
        };
        Relationships: [];
      };
      backpack_sections: {
        Row: {
          color: string;
          description: string;
          emoji: string;
          id: string;
          label: string;
          slug: string;
          sort_order: number;
          tagline: string;
          type: string;
        };
        Insert: {
          color?: string;
          description?: string;
          emoji?: string;
          id?: string;
          label: string;
          slug: string;
          sort_order?: number;
          tagline?: string;
          type?: string;
        };
        Update: {
          color?: string;
          description?: string;
          emoji?: string;
          id?: string;
          label?: string;
          slug?: string;
          sort_order?: number;
          tagline?: string;
          type?: string;
        };
        Relationships: [];
      };
      episodes: {
        Row: {
          created_at: string | null;
          date: string | null;
          description: string | null;
          duration: string | null;
          id: number;
          num: string;
          sort_order: number;
          thumbnail: string | null;
          title: string;
          youtube_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          date?: string | null;
          description?: string | null;
          duration?: string | null;
          id?: number;
          num: string;
          sort_order?: number;
          thumbnail?: string | null;
          title: string;
          youtube_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          date?: string | null;
          description?: string | null;
          duration?: string | null;
          id?: number;
          num?: string;
          sort_order?: number;
          thumbnail?: string | null;
          title?: string;
          youtube_id?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          age: number | null;
          avatar_id: string | null;
          bio: string | null;
          blocked_at: string | null;
          created_at: string | null;
          divorced: string | null;
          education: string | null;
          email: string;
          first_name: string | null;
          home_paid_off: string | null;
          id: string;
          interests: string[] | null;
          kids: string | null;
          last_login: string | null;
          last_name: string | null;
          location: string | null;
          mantra: string | null;
          marital_status: string | null;
          net_worth: string | null;
          occupation: string | null;
          oqrc_response: string | null;
          retired: string | null;
          retirement_date: string | null;
          unsubscribed_at: string | null;
          updated_at: string | null;
          username: string | null;
          working_income: string | null;
          years_in_occupation: number | null;
        };
        Insert: {
          age?: number | null;
          avatar_id?: string | null;
          bio?: string | null;
          created_at?: string | null;
          divorced?: string | null;
          education?: string | null;
          email: string;
          first_name?: string | null;
          home_paid_off?: string | null;
          id: string;
          interests?: string[] | null;
          kids?: string | null;
          last_login?: string | null;
          last_name?: string | null;
          location?: string | null;
          mantra?: string | null;
          marital_status?: string | null;
          net_worth?: string | null;
          occupation?: string | null;
          oqrc_response?: string | null;
          retired?: string | null;
          retirement_date?: string | null;
          unsubscribed_at?: string | null;
          updated_at?: string | null;
          username?: string | null;
          working_income?: string | null;
          years_in_occupation?: number | null;
        };
        Update: {
          age?: number | null;
          avatar_id?: string | null;
          bio?: string | null;
          created_at?: string | null;
          divorced?: string | null;
          education?: string | null;
          email?: string;
          first_name?: string | null;
          home_paid_off?: string | null;
          id?: string;
          interests?: string[] | null;
          kids?: string | null;
          last_login?: string | null;
          last_name?: string | null;
          location?: string | null;
          mantra?: string | null;
          marital_status?: string | null;
          net_worth?: string | null;
          occupation?: string | null;
          oqrc_response?: string | null;
          retired?: string | null;
          retirement_date?: string | null;
          unsubscribed_at?: string | null;
          updated_at?: string | null;
          username?: string | null;
          working_income?: string | null;
          years_in_occupation?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      admin_age_distribution: {
        Args: never;
        Returns: {
          count: number;
          label: string;
        }[];
      };
      admin_field_distribution: {
        Args: { p_field: string };
        Returns: {
          count: number;
          label: string;
        }[];
      };
      admin_location_distribution: {
        Args: never;
        Returns: {
          city: string;
          count: number;
        }[];
      };
      admin_overview_stats: { Args: never; Returns: Json };
      admin_signup_trend: {
        Args: never;
        Returns: {
          count: number;
          month: string;
        }[];
      };
      is_admin: { Args: { user_id: string }; Returns: boolean };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
