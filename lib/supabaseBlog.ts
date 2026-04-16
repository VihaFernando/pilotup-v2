import { supabase } from "@/lib/supabase";

export type SupabaseBlogPost = {
    id: number;
    slug: string;
    title: string;
    content: string;
    summary?: string | null;
    cover_url?: string | null;
    created_at: string;
    updated_at?: string | null;
};

export async function fetchSupabaseBlogPosts(): Promise<SupabaseBlogPost[]> {
    const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as SupabaseBlogPost[];
}

export async function fetchSupabaseBlogPostBySlug(slug: string): Promise<SupabaseBlogPost | null> {
    const { data, error } = await supabase.from("blogs").select("*").eq("slug", slug).single();
    if (error) {
        if ((error as { code?: string }).code === "PGRST116") return null;
        throw error;
    }
    return data as SupabaseBlogPost;
}
