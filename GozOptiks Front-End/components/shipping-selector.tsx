"use client";

import { store } from "@/data/store";
import { formatPrice } from "@/lib/format";

export function ShippingSelector({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <fieldset style={{ border: 0, padding: 0 }}>
      <legend className="kicker">Shipping</legend>
      {store.shippingMethods.map((method) => (
        <label key={method.id} className="ship-option">
          <input
            type="radio"
            name="shipping"
            value={method.id}
            checked={value === method.id}
            onChange={() => onChange(method.id)}
          />
          <span>
            <strong style={{ fontWeight: 500 }}>{method.name}</strong>
            <span className="small" style={{ display: "block" }}>
              {method.description}
            </span>
          </span>
          <span>{formatPrice(method.fee)}</span>
        </label>
      ))}
      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
