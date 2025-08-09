import { supabase } from '../supabase';
import type { Product } from '../../data/products';

function humanizeHarvestedAt(createdAt?: string | null): string {
  if (!createdAt) return 'Today';
  try {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  } catch {
    return 'Today';
  }
}

type ProductImageRow = { url: string; position?: number | null };
type VendorRow = { farm_name?: string | null; location?: string | null };
type CategoryRow = { name?: string | null };
type ProductRow = {
  id: string;
  name: string;
  price: number | string | null;
  stock?: number | null;
  created_at?: string | null;
  is_active?: boolean | null;
  vendors?: VendorRow | null;
  product_images?: ProductImageRow[] | null;
  categories?: CategoryRow | null;
};

export async function listProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      price,
      stock,
      created_at,
      is_active,
      vendors:vendors ( farm_name, location ),
      product_images ( url, position ),
      categories ( name )
    `)
    .eq('is_active', true)
    .limit(200);

  if (error) throw error;

  const rows = (data as ProductRow[]) || [];
  return rows.map((row) => {
    const images = (row.product_images || []) as ProductImageRow[];
    const sorted = [...images].sort((a, b) => ((a.position ?? 0) - (b.position ?? 0)));
    const image = sorted[0]?.url || images[0]?.url || '';
    const farm = row.vendors?.farm_name ?? 'Farm';
    const location = row.vendors?.location ?? 'Unknown';
    const harvestedAt = humanizeHarvestedAt(row.created_at ?? undefined);
    const quantity = typeof row.stock === 'number' ? row.stock! : 0;
    const category = row.categories?.name ?? '';
    const product: Product = {
      id: row.id,
      image,
      name: row.name,
      price: Number(row.price ?? 0),
      farm,
      location,
      harvestedAt,
      organic: false,
      quantity,
      category,
      season: 'All Season',
    };
    return product;
  });
}
