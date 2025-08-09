import { supabase } from '../supabase';

export type AddressInput = {
  fullName: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
};

export type OrderItemInput = {
  productId: string;
  quantity: number;
  unitPrice: number;
};

export async function createAddress(profileId: string, addr: AddressInput) {
  const { data, error } = await supabase
    .from('addresses')
    .insert({
      profile_id: profileId,
      label: 'Shipping',
      full_name: addr.fullName,
      phone: addr.phone,
      street: addr.street,
      apartment: addr.apartment ?? null,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country ?? 'US',
      is_default: false,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id as string;
}

export async function createOrderWithItems(
  profileId: string,
  items: OrderItemInput[],
  addressId?: string
): Promise<{ orderId: string }>
{
  // Create order
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert({
      profile_id: profileId,
      status: 'pending',
      currency: 'USD',
      shipping_address_id: addressId ?? null,
    })
    .select('id')
    .single();

  if (orderErr) throw orderErr;

  // Create order items
  const orderItems = items.map((i) => ({
    order_id: order.id,
    product_id: i.productId,
    quantity: i.quantity,
    unit_price: i.unitPrice,
    total_price: i.quantity * i.unitPrice,
  }));

  const { error: itemsErr } = await supabase.from('order_items').insert(orderItems);
  if (itemsErr) throw itemsErr;

  return { orderId: order.id as string };
}
